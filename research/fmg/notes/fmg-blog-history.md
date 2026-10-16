# Azgaar's "Fantasy Maps for fun and glory" devlog (azgaar.wordpress.com), 2017–2018: post inventory, per-iteration methods, evolution

Research date: 2026-10-16. Researcher scope: the development blog only (not the wiki, Patreon, Reddit or current source, which other researchers cover).

Tag legend (binding): **[STATED]** author explains it in the post text; **[STATED-snippet]** author's own words but reached only through a search-engine excerpt (partial, possibly paraphrased by the search summariser); **[SHOWN-code]** visible in the author's dated demo code at the revision matching the post (primary artefact, but not the post's prose); **[INFERRED]** my reconstruction; **[NAMED-ONLY]** named without method; **[SECONDARY]** third-party description of a post.

---

## 1. Summary and read count against the total

### Takeaway
The blog has **16 enumerable posts** (15 confirmed by title + date + URL, 1 URL-only), all between 2017-03-30 and 2018-07-05; the author states on the About page that the blog is no longer updated. **0 of 16 posts could be read in full**: every route to wordpress.com, the Wayback Machine, archive.ph, Google/Bing caches, reader proxies, Common Crawl, Reddit, HN and third-party blogs is denied by this environment's network policy (see section 6). The method content below therefore comes from (a) search-engine excerpts of 14 posts, (b) the author's own demo code at the dated revisions of the gist that every 2017–2018 post linked to (full git history recovered: 113 revisions, 2017-03-17 to 2018-03-30), (c) the FMG repository history from 2017-10 onward, and (d) the FMG Changelog. This is a faithful reconstruction of *what the generator did at each post date*, but **the author's rationale is only available where a snippet preserved it**; nothing below should be cited as the author's words unless tagged [STATED-snippet].

### Cited Findings
- Blog identity: tagline "Fantasy Maps for fun and glory"; tags javascript, mapmaking, procedural generation; About page describes an amateur JavaScript developer and says the author is "not actively posting anymore, but plans to write new ProcGen articles at some point" [STATED-snippet] — [About](https://azgaar.wordpress.com/about/), [Home](https://azgaar.wordpress.com/).
- Third-party listing dates the blog "Azgaar, 2017-2018" — [rmarquis procgen links](https://github.com/rmarquis/rmarquis.github.io/blob/master/pages/pg.md) [SECONDARY].
- The FMG README calls it "my old blog" and says only "some details are covered" there — [FMG README](https://github.com/Azgaar/Fantasy-Map-Generator/blob/master/README.md).
- Categories observed in search results: `shape`, `rivers`, `routes`, `ui` — [category/shape](https://azgaar.wordpress.com/category/shape/), [category/rivers](https://azgaar.wordpress.com/category/rivers/), [category/routes](https://azgaar.wordpress.com/category/routes/), [category/ui](https://azgaar.wordpress.com/category/ui/).
- Monthly archive page confirmed to exist for July 2018 — [2018/07/](https://azgaar.wordpress.com/2018/07/).
- The generator demo every 2017–2018 post pointed to is the bl.ocks gist `b845ce22ea68090d43a4ecfb914f51bd`; the 2017-10-09 FMG repo index.md says "Check out the demo here [bl.ocks link]. Devlog is here [blog]" — local `reference/fmg-src` commit 41ebd237; gist: [gist.github.com/Azgaar/b845ce22…](https://gist.github.com/Azgaar/b845ce22ea68090d43a4ecfb914f51bd).

### Inferences
- The post list is probably complete for 2017-03 → 2018-07: the author page, four category pages, the 2017 and 2018 year queries, and 27 GitHub citations of the blog surface only these 16 URLs, and no 2019+ URL was ever cited anywhere (a 2019-02 image upload exists on the blog's media host, which is consistent with a header-image change, not a post).
- The URL `azgaar.wordpress.com/2017/02/06/coastline-generation/` cited by one repo (ncuskey/FWG4) predates the blog's first post (2017-03-30) and is almost certainly a fabricated citation; it is excluded from the count.

### Gaps
- Full text of all 16 posts (blocked). Rationale statements, parameter tables inside posts, admitted limitations in prose, post images, comment threads: unavailable except as fragments.
- The title of the 2017-12-29 post (slug `heightmap-generator`) is unconfirmed (one third-party citation only).

---

## 2. Chronological table of every post

Read-status column: **Snippet** = search excerpt obtained; **URL-only** = no content seen. Code column = nearest dated revision of the author's demo gist (bl.ocks) that I inspected; revision links are the Changelog's bl.ocks revision links for versioned releases.

| # | Date | Title | URL | Subsystem | Read status | Methods / rationale (tagged) | Parameters mentioned | Limitations admitted | Code/demo evidence |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 2017-03-30 | Introduction (slug `first-post`) | https://azgaar.wordpress.com/2017/03/30/first-post/ | Project | Snippet | Author says the project was inspired by Martin O'Leary's *Generating fantasy maps* [STATED-snippet]. Goal (from the 2018 README, same period): a plausible, fast, interactive map for a "Medieval Dynasty" simulator, ~200,000 km², room for ≥500 manors in 7 regions [STATED, README 0.54b in repo history]. | 500 manors, 7 regions, 200,000 km² (README) | — | Gist first revision 2017-03-17; 0.1b published 2017-03-20 |
| 2 | 2017-03-30 | Voronoi graph | https://azgaar.wordpress.com/2017/03/30/voronoi-graph/ | Graph | URL-only | [SHOWN-code 0.1b] 8,000 random sites, kept 5% away from the map border so the centre is denser, d3-voronoi diagram, **one** Lloyd relaxation (centroid re-seeding) with the comment that more iterations "didn't get much better result"; neighbours derived from half-edges. | 8000 sites; 1 relaxation | Comment: "set global variables (is it correct way?)"; pan/zoom library "should be replaced by native D3" [SHOWN-code] | gist 581c717 (0.1b) |
| 3 | 2017-04-01 | Heightmap | https://azgaar.wordpress.com/2017/04/01/heightmap/ | Heightmap | Snippet | Heights generated on the Voronoi graph; "the heightmap looks like a map even without coastline and rivers drawn" [STATED-snippet]. Method [SHOWN-code 0.1b]: one big "island" blob seeded near map centre with height 0.8–1.0, spread breadth-first to neighbours, each ring multiplied by 0.9 (island) / 0.99 (hills) and by a per-cell random modifier in [1.1−sharpness, 1.1] ("sharpness" option); then N small "hill" blobs (height 0.1–0.5) at random low cells away from borders; stop when increment < 0.01. Third parties summarise this as "particle deposition" / "spikey blob masks" [SECONDARY]. | sharpness slider; blob decay 0.9/0.99; hill height 0.1–0.5; stop <0.01 | "Please change to avoid 'while' loop!" (hill placement by rejection sampling) [SHOWN-code] | gist 581c717; cited by gnlow/awesome-procgen, Hengle/SeagullEngine |
| 4 | 2017-04-03 | Coastline | https://azgaar.wordpress.com/2017/04/03/coastline/ | Coastline | Snippet | Sea level fixed at height 0.2 "where the green color begins" in the Spectral colour scheme, because that scheme "already looks plausible"; draw only land polygons above it; proposes interpolated curves as clip paths but notes curves "complicate placing cities and river mouths on the shore" [STATED-snippet]. [SHOWN-code 0.1b]: coast = every Voronoi edge whose two cells straddle 0.2; edge midpoints stored as candidate manor sites; author's comment "Need help to implement function to get a single continuous line!". Continuous-line assembly (edge chaining by shared endpoints, then d3 curve) appears 2017-08-25 [SHOWN-code]. | sea level 0.2 | Curved coasts vs. placing objects exactly on the shore [STATED-snippet]; no continuous coastline yet [SHOWN-code] | gist 20ed35c/8c67c32 (2017-04-13/14); 4c169b7 (2017-08-25) |
| 5 | 2017-05-08 | River systems | https://azgaar.wordpress.com/2017/05/08/river-systems/ | Rivers | Snippet | Rivers "are not drawn as random strokes" but computed from precipitation drainage over the existing heightmap [STATED-snippet]. [SHOWN-code 0.1b/2017-06]: (1) depression filling: sort land by height, raise any cell not higher than its lowest neighbour to that neighbour+0.01, repeat until no depressions (comment: "0 to resolve all the depression, its slow, but allows good rivers"); (2) flux: every land cell starts with equal rain, cells processed highest-first pour their flux to the lowest neighbour; a river is "stated" when flux exceeds a threshold (0.03 in 0.1b; 0.85 after 2017-10 rescale); the downhill cell inherits the river id; (3) mouth handling: an ocean neighbour's shared-edge midpoint is the pour point; big flux with ≥2 ocean edges becomes a **delta** (one branch per ocean edge), otherwise an **estuary** point pushed slightly offshore; (4) rendering with Catmull-Rom curves. Third party summarises the post as wind-based precipitation with rain shadow + pit filling + flux to lowest neighbour + threshold + width by flux + lake evaporation [SECONDARY, CAU-8/B-PCG; may conflate the post with later code]. | river threshold 0.03 (later 0.85); +0.01 fill step; delta if flux>0.3 and ≥2 ocean edges | Full depression resolution "is slow" [SHOWN-code] | gist 581c717, abeef6d (2017-06-10) |
| 6 | 2017-05-27 | Confluences | https://azgaar.wordpress.com/2017/05/27/confluences/ | Rivers | URL-only | [SHOWN-code 2017-10 rev, present since mid-2017]: when a river reaches a cell already owning a river, the longer of the two (by point count) keeps the id and the shorter becomes a tributary; the join cell is flagged as a confluence with a count; at rendering, tributaries adopt the main stem's incoming angle so they merge tangentially instead of crossing; river width grows at confluences as a function of flux (width ∝ flux^0.9 at the join in 2017-10; later arctan of confluence count). | — | "if tributary rendered before main stem only" fallback [SHOWN-code] | gist abeef6d, a54e23a; cited by awesome-procgen, Red Blob Games' link list |
| 7 | 2017-06-17 | Heightmap rendering | https://azgaar.wordpress.com/2017/06/17/heightmap-rendering/ | Rendering | Snippet | Compares polygonal, "triangled" and contour rendering styles [STATED-snippet]. [SHOWN-code 2017-07]: d3 sequential Spectral scale over height; flux debug layer in Blues; a relief layer of procedurally drawn hill/mountain glyphs (two path strings + white shade paths) and forest/swamp glyphs sorted by y so nearer glyphs draw last; comment "Delete relief if you don't need it (not just hide as I want map to be fast and clear)". | — | relief "still in progress, need to create more beautiness" [SHOWN-code] | gist ad0dab4 (2017-07-23) |
| 8 | 2017-06-30 | Biomes generation and rendering | https://azgaar.wordpress.com/2017/06/30/biomes-generation-and-rendering/ | Climate/biomes | URL-only (widely cited) | Third parties describe it as a practical Whittaker (temperature × moisture) implementation with a biome palette, a wind/precipitation model (moisture seeded at sea, marched downwind, rained out, orographic uplift) and annual-mean temperature [SECONDARY: Ian-Tharp/CORE, Code-My-Spec/broken-oaths, AlfredHus/Fantasy_Map_Sandbox, Ploxel/the-marches]. **Not in the demo gist**: no temperature/biome code exists in any 2017–2018 revision; "precipitation" there is only a per-cell scalar that decays 3% per downhill step and feeds forest/swamp glyph density [SHOWN-code]. Biomes entered the released tool only in v0.7a (2019-04-14) [Changelog]. | — | [INFERRED] the post was an experiment on a separate demo, not merged for ~2 years | FMG Changelog 0.7a; gist a54e23a lines on `precipitation` |
| 9 | 2017-10-05 | Coastline extension and Heightmap templates | https://azgaar.wordpress.com/2017/10/05/templates/ | Graph/coast/heightmap | Snippet | "Defines a new set of points and computes a new Voronoi graph with more points along the coastline" to improve coastline fidelity; introduces heightmap templates "for more variety" beyond the volcanic island [STATED-snippet]. The current FMG docs call this step "repacking" and cite this post for it [STATED, data-model.md]. [SHOWN-code 2017-10-17]: points now Poisson-disc sampled (Bridson, from Bostock/Davies), with radius chosen to give ~8k cells; `reGraph` keeps coastal land and coastal water cells, inserts an extra point one third of the way toward each same-type coastal neighbour (with ±1 px jitter), keeps interior land, **drops deep ocean**, recomputes Voronoi and neighbours; ocean cells get a "distance from land" ring index for shallow/deep shading. | Poisson radius 5.9/graphSize ≈ 8k cells | — | gist a54e23a; [FMG data-model.md](https://github.com/Azgaar/Fantasy-Map-Generator/blob/master/docs/architecture/data-model.md) |
| 10 | 2017-11-21 | Settlements, Regions, Routes and Labels | https://azgaar.wordpress.com/2017/11/21/settlements/ | Settlements/states/routes/labels | Snippet (labels section truncated) | Four topics [STATED-snippet]. **Capitals**: "two custom parameters — disbalance and power. Each capital has unique attractiveness power, which is randomly assigned to it based on a disbalance value" [STATED, quoted in Flokey82/genworldvoronoi]. **Regions**: one region per capital, built from the towns; author first treated regions as areas of shared culture, then moved toward treating them as countries [STATED-snippet]. **Routes**: pathfinding weighing travel distance, elevation, existing roads, existing towns, region borders and rivers; a border "is treated as a new customs duty" [STATED-snippet]. [SHOWN-code 2017-11-23]: geography score = (1−height)·5, +harbour quality, +3 estuary, +flux/2 riverbank, +2 confluence; 80% of coastal "extension" cells ignored unless they hold a river; economy score adds road presence (capped) ×2 at crossroads, then ×(1+U[0,1)); capitals = best-scoring cells with spacing ≥ mapWidth/capitalsCount (relaxed by 1.2 on failure), snapped to the coast point if a harbour, nudged off river centrelines; capital power ~ 1+U·power/2; towns assigned to the capital minimising distance/power (×2 across water), else "neutral"; 7 random culture centres, culture = nearest centre; main roads = A* between all manor pairs on an island with cost 2·height, 0.15 on existing road, −0.1 river, ×0.3 coast, +distance/30, heuristic distance/15; secondary roads = Dijkstra; port roads capital→nearest port; ocean routes from the island's first port to other ports and to other islands; names = per-culture letter-bigram Markov chain trained on real town-name lists, ≤7 letters, max 2 consonants in a row; region label at the **pole of inaccessibility** (polylabel) of the region's largest contiguous piece; region name = 80% generated / 20% capital name, with an "-ia" suffix rule. | disbalance, power; 7 cultures; spacing = width/capitals; A* cost weights above | Comment: "Cannot place capitals with current spacing. Trying again with reduced spacing" [SHOWN-code] | gist 9e7bcac (2017-11-13), b4a29df (2017-11-23); quoted in [genworldvoronoi](https://github.com/Flokey82/genworldvoronoi/blob/master/civCulturesType.go) |
| 11 | 2017-12-29 | (title unknown; slug `heightmap-generator`) | https://azgaar.wordpress.com/2017/12/29/heightmap-generator/ | Heightmap | URL-only (unverified) | Cited once as the "heightmap blog" for plate/landmass templates [SECONDARY, letuhao/lore-weave]. [SHOWN-code 2017-12-21 → 2018-01-03]: cell/point arrays separated from polygons; save/load `.map` format; "Graph size" option; heights still from isle+hills. | — | — | gist 078643e, be7a5f7 (0.43b) |
| 12 | 2018-02-08 | Templates implementation and Heightmap editor UI | https://azgaar.wordpress.com/2018/02/08/templates-implementation-and-heightmap-editor-ui/ | Heightmap/UI | Snippet | Describes how templates were implemented and editor buttons that raise, lower or smooth the whole heightmap [STATED-snippet]. [SHOWN-code 0.50b, 2018-02-06]: a template is a short script of primitive operations — `addMountain` (one 0.9–1.0 blob near centre), `addHill(count, inset)` (0.1–0.5 blobs, rejected if the result would exceed 0.9), `addRange(±n)` (walk a noisy greedy path between two random points 180–400 px apart, then raise (or lower, for troughs) rings around it with decreasing increments), `addStrait(width)` (a north–south noisy path forced to 0.10–0.20), `addPit(n)` (ring-decreasing depressions), `modifyHeights(scope, add, mult|^2|^3)` and `smoothHeights` (mean of self+neighbours); named templates (Volcano, High Island, Low Island, Continents, Archipelago, Atoll) are fixed sequences of these; a text template editor lets users write their own. | per-template sequences (e.g. Continents: 24 hills, 2 ranges, 3 hills, ×0.7, 2–8 straits, smooth, 5 pits, 3 troughs) | — | gist 9ceb5b2 (0.50b); cited by olinkirkland/realms |
| 13 | 2018-02-12 | Polygonal rivers and river editor | https://azgaar.wordpress.com/2018/02/12/polygonal-rivers/ | Rivers/rendering | Snippet | "Consider rivers not as strokes, but as polygons filled with color"; in comments the author says river width is based mainly on river length [STATED-snippet]. [SHOWN-code 0.50b]: walk the river's curve at 1 px steps, offset perpendicular by atan(l/widening)+extra, extra grows by atan(confluenceCount/100) at confluences; join the left and reversed right offsets into one closed path. 0.54b (2018-03-30): "River rendering method is simplified, now it works much faster" [Changelog]; [SHOWN-code] offsets computed per control point instead of per pixel, width ∝ atan((cumulative length)²/widening) with widening = 1000+30·length. River Editor: drag red key points, add/remove, re-draw [STATED, wiki River-Editor]. | widening 200 (0.50b) → 1000+30L (0.54b) | per-pixel `getPointAtLength` was slow → simplified [Changelog] | gist 9ceb5b2, 70ab7ef |
| 14 | 2018-02-26 | Image to Heightmap converter | https://azgaar.wordpress.com/2018/02/26/image-converter/ | Heightmap/UI | Snippet | Load a raster image and convert to a heightmap by assigning heights to colours [STATED-snippet]. [SHOWN-code 0.52b]: sample the image colour at every cell site, quantise with MMCQ (median-cut) to N colours, show the quantised palette sorted by Lab b-channel, user clicks a colour swatch then a height on a 0–100 colour strip (auto-assign option by luminosity or hue), unassigned cells filled afterwards. 2022 comment points readers to the GitHub Pages tool and a video tutorial [STATED-snippet]. | N palette colours; 0–1 height strip | — | gist 187961a (0.52b) |
| 15 | 2018-05-06 | Styling the map | https://azgaar.wordpress.com/2018/05/06/styling-the-map/ | Rendering/UI | Snippet (comments only) | Comment thread: a requested feature "is only planned, not yet implemented"; users can name rivers/roads themselves via Labels, Markers or the Legend Editor [STATED-snippet]. Contemporary code [SHOWN-code 0.51b–0.56b]: Style Editor exposes per-layer stroke width/dash/linecap, label/burg size, culture colours, heightmap colour scheme, SVG filters (blur, shading); "active zooming" rescales labels and toggles the shade/blur filter on zoom [Changelog 0.51b/0.53b]. 0.56b "Performance improvement" [Changelog]. | — | — | local repo 11099bdd (0.56b) |
| 16 | 2018-07-05 | Map scale | https://azgaar.wordpress.com/2018/07/05/map-scale/ | Scale/measurement | Snippet | Scale = ratio between map distance and real-world distance; proposes a Scale Editor for units; suggests miles as default and a default of 3 miles per pixel [STATED-snippet]. [SHOWN-code 0.54b]: scale bar auto-rounded/auto-sized from `distanceScale`×`distanceUnit`; ruler and opisometer tools; areas as scale²; population = score × urbanization × populationRate × 1000; rural population from Σ(1−height)³·10 adjusted by 90/√cells. | 3 mi/px default; populationRate; urbanization | "FIX me!" on the widening formula [SHOWN-code] | gist 70ab7ef (0.54b); local repo 42cd291c (0.58b) |

Excluded: `2017/02/06/coastline-generation/` (cited by ncuskey/FWG4; predates the blog, no other trace — treated as a hallucinated citation).

---

## 3. Evolution of the core techniques across posts (and the code at each post date)

### 3.1 Spatial graph (Voronoi) and sampling
**Takeaway.** Random sites + one Lloyd pass (Mar 2017) → Poisson-disc sampling (Oct 2017) → coastal "re-graph"/packing (Oct 2017) → jittered square grid (Sep 2018, v0.59.12b) → Delaunator-based Voronoi (v0.8b, Apr 2019, then "Modernize voronoi" 2021); the author later published a side-by-side gist comparing the sampling methods (Oct 2019).

**Cited findings.**
- 0.1b: 8,000 uniformly random sites inset 5% from the border, one Lloyd relaxation, comment that more iterations did not help [SHOWN-code] — gist rev 581c717, [bl.ocks 0.1b](https://bl.ocks.org/Azgaar/b845ce22ea68090d43a4ecfb914f51bd/581c7172035ed41f0bcf2403943e6a1852683c6d).
- 2017-10-17: Bridson Poisson-disc sampler (credited to Bostock/Davies in comments) with radius tuned "to get 8k cells" [SHOWN-code] — gist rev a54e23a.
- 2017-10-17 `reGraph`: keep land + coastal cells, insert extra points at 1/3 toward same-type coastal neighbours, drop deep ocean, recompute Voronoi ("polygons compressed" logged) [SHOWN-code] — gist rev a54e23a; the post describing it is [Templates](https://azgaar.wordpress.com/2017/10/05/templates/) and the current docs still cite it for "repacking" — [data-model.md](https://github.com/Azgaar/Fantasy-Map-Generator/blob/master/docs/architecture/data-model.md).
- `getJitteredGrid` first appears 2018-09-05 (v0.59.12b) [SHOWN-code] — local repo commit b1309eae.
- 0.61b code comment: "Migrate from d3-voronoi to mapbox-delunator or d3-delaunay" [SHOWN-code] — local repo commit 987d9851; Delaunator first in tree at v0.8.0b (2019-04-21, commit 680044dd); "Modernize voronoi (#557)" 2021-02-04.
- 2019-10-25 gists "Voronoi Sampling methods comparison" (pure random; relaxed 1/5/10 iterations; Poisson disc; Poisson disc aligned) and "Voronoi Tessellation with Poisson Disc sampling" [SHOWN-code] — [gist 9f80391…](https://gist.github.com/Azgaar/9f803911c6850d45334f1a47205b7294), [gist 4904e89…](https://gist.github.com/Azgaar/4904e89c12c7347a9e1639edb7655e10).

**Inferences.** The jittered grid won because it gives near-uniform cell size (good for a per-cell "rain" model and for an image overlay) at trivial cost, while re-graphing restores coastal detail where it matters; this is the two-graph (`grid`/`pack`) architecture of FMG today.

### 3.2 Heightmap
**Takeaway.** Blob diffusion on the graph (island + hills with multiplicative decay and a "sharpness" random modifier) → template scripts of primitives (mountain, hill, range, trough, strait, pit, add/multiply, smooth) → image import; the paradigm (graph-based blob/range painting, no noise field) never changed through 2018.

**Cited findings.**
- 0.1b blob algorithm and parameters as in table row 3 [SHOWN-code] — gist rev 581c717.
- 2017-10-05: templates introduced "for more variety" beyond the volcanic island [STATED-snippet] — [Templates](https://azgaar.wordpress.com/2017/10/05/templates/).
- 0.50b template primitives and the six named templates [SHOWN-code] — gist rev 9ceb5b2, [bl.ocks 0.50b](http://bl.ocks.org/Azgaar/b845ce22ea68090d43a4ecfb914f51bd/9ceb5b2d3adc820b02831bdb3e35b3231650e0aa); post [Templates implementation](https://azgaar.wordpress.com/2018/02/08/templates-implementation-and-heightmap-editor-ui/) [STATED-snippet: raise/lower/smooth buttons].
- 0.52b MMCQ-quantised image converter [SHOWN-code] — gist rev 187961a; post [Image converter](https://azgaar.wordpress.com/2018/02/26/image-converter/).
- 0.53b: "Perspective view for Heightmap (looks weak, should I try real 3D?)" and "Heightmap Templates improvement"; 0.59b "New heightmap templates" (Mainland, Peninsulas in code) [STATED, Changelog] — [Changelog](https://github.com/Azgaar/Fantasy-Map-Generator/wiki/Changelog).

### 3.3 Coastline and features
**Takeaway.** Sea level is a fixed height threshold (0.2) chosen for the look of the colour scale; coast = straddling Voronoi edges, first as disconnected segments, later chained into continuous rings per feature (BFS flood-fill labels ocean/lakes/islands), then densified by re-graphing; the author explicitly weighed curved coastlines against the need to place ports/mouths exactly on the shore.

**Cited findings.**
- Sea level 0.2 "where the green color begins"; curves as clip paths complicate placing cities and river mouths [STATED-snippet] — [Coastline](https://azgaar.wordpress.com/2017/04/03/coastline/).
- 0.1b: "Need help to implement function to get a single continuous line!" [SHOWN-code] — gist rev 581c717.
- 2017-08-25: `markFeatures` BFS from the top-left cell (so the first water body is the Ocean), numbering islands and lakes; `getContinuousLine` chains edges by shared endpoints [SHOWN-code] — gist rev 4c169b7.
- 2017-10-17: coastal cells typed ±1, ocean ring distances ("Mark distances") for shallow/deep ocean layers; coast line drawn with an "indention/relax" randomisation per ring [SHOWN-code] — gist rev a54e23a; "Ocean layers selection" 0.49b [Changelog].
- 0.58b "Reworked lakes": lakes = depression pits flagged during filling, elevated temporarily to let water flux through, closed lakes near the ocean removed, lake cells set to 0.19 [SHOWN-code] — local repo commit 42cd291c; [Changelog 0.58b].

### 3.4 Rivers
**Takeaway.** The hydrology model was fixed in March 2017 and only refined: fill depressions → uniform rain → route flux to the lowest neighbour in descending height order → threshold → river ids with longest-wins confluences → deltas/estuaries at mouths; rendering evolved from stroked Catmull-Rom curves with meander jitter (2017) to filled polygons widened by arctan of length and confluence count (Feb 2018) to a cheaper per-vertex polygon (Mar 2018); depression filling split into primary (pre-regraph, 10 iterations) and secondary (post-regraph, 100 iterations) in mid-2018.

**Cited findings.**
- Rivers from precipitation drainage, not random strokes [STATED-snippet] — [River systems](https://azgaar.wordpress.com/2017/05/08/river-systems/).
- 0.1b flux/depression code and thresholds [SHOWN-code] — gist rev 581c717.
- 2017-10: river threshold 0.85 after rain rescaled (0.1 south half / 0.07 north half of the map — a crude latitude gradient); precipitation scalar decays ×0.97 downhill; delta if flux > 14 and ≥2 ocean edges and not a confluence; estuary point pushed 10% beyond the shore; meander jitter at 1/3 and 2/3 of each segment [SHOWN-code] — gist rev a54e23a.
- Confluence rule (longer river keeps id; tributary adopts main-stem angle) [SHOWN-code] — gist rev a54e23a; post [Confluences](https://azgaar.wordpress.com/2017/05/27/confluences/) [NAMED-ONLY for prose].
- Polygonal rivers: "polygons filled with color"; width "based mainly on river length" (author comment) [STATED-snippet] — [Polygonal rivers](https://azgaar.wordpress.com/2018/02/12/polygonal-rivers/); 0.50b and 0.54b implementations [SHOWN-code] — gist revs 9ceb5b2, 70ab7ef; "River rendering method is simplified, now it works much faster" [STATED, Changelog 0.54b].
- 0.58b: `resolveDepressionsPrimary` (limit 10 passes, skips border cells) and `resolveDepressionsSecondary` (limit 100, logs an error at the limit), `elevateLakes`, `addLakes` [SHOWN-code] — local repo commit 42cd291c.
- v0.7a (2019-04): temperature and precipitation layers, biomes, "reworked population model (now depends on biome)" [STATED, Changelog].

### 3.5 Climate and biomes
**Takeaway.** The 2017-06-30 biomes post is the most-cited post of the blog, but its method is only known second-hand (Whittaker-style temperature×moisture, wind-driven moisture with orographic rain) and it was not part of the shipped generator until v0.7a (April 2019).

**Cited findings.**
- Third-party descriptions of the post's model [SECONDARY] — [broken-oaths worldgen_frontier.md](https://github.com/Code-My-Spec/broken-oaths/blob/master/.code_my_spec/knowledge/worldgen_frontier.md), [Fantasy_Map_Sandbox temperature.gd](https://github.com/AlfredHus/Fantasy_Map_Sandbox/blob/master/classes/climate/temperature.gd), [the-marches research](https://github.com/Ploxel/the-marches) ("biome hex palette … may not match exact current version").
- No temperature/biome code in any gist revision 2017-03 → 2018-03 [SHOWN-code] — gist history scan; biomes layer first listed at 0.7a [STATED, Changelog].
- 0.54b code comment: population "cells score based on elevation (but should be biome)" [SHOWN-code] — gist rev 70ab7ef.

### 3.6 Settlements, cultures, states (regions)
**Takeaway.** Two-stage site scoring (geography then economy/roads), spaced capitals with a random "power", towns assigned by power-weighted distance with a "neutral" fallback, cultures as nearest-of-N random centres (N=7 in 2017; user-set with quadtree lookup and default culture sets in 0.58b); states started as "closest capital" Voronoi-like regions and only became expansion-based with the v0.7a rewrite (2019).

**Cited findings.**
- "disbalance and power … unique attractiveness power … randomly assigned … based on a disbalance value" [STATED, quoted verbatim in [genworldvoronoi](https://github.com/Flokey82/genworldvoronoi/blob/master/civCulturesType.go)] — [Settlements](https://azgaar.wordpress.com/2017/11/21/settlements/).
- Regions first as shared culture, then as countries [STATED-snippet] — same post.
- Scoring, spacing, power, neutral logic [SHOWN-code] — gist rev b4a29df.
- 0.54b population model and "Change population calculation logic" [SHOWN-code; Changelog].
- 0.58b: Cultures editor, Namesbase editor, `generateCultures` with quadtree centres; 0.61b `calculateRuralPopulation` "based on area + elevation (to be changed to biome)" [SHOWN-code] — local repo commits 42cd291c, 987d9851.
- v0.7a: "New states and cultures spread algorithm", "15 new cultures" [STATED, Changelog].

### 3.7 Routes
**Takeaway.** Graph pathfinding from the start: A* for main roads between manor pairs on an island, Dijkstra for secondary roads, capital→port roads, and ocean routes between ports; cost terms encode height, coast preference, river bonus, road reuse, and (in the Dijkstra variant) a +1 penalty per region border and for neutral land — the "customs duty" the post describes.

**Cited findings.**
- Weighs distance, elevation, existing roads, towns, region borders, rivers; border = customs duty [STATED-snippet] — [Settlements](https://azgaar.wordpress.com/2017/11/21/settlements/).
- Code cost weights (table row 10) [SHOWN-code] — gist rev b4a29df; "Dijkstra algorithm (not used now)" by 0.54b [SHOWN-code] — gist rev 70ab7ef.
- 0.56b Route editor; "No ports on island. Upgrading first burg to port" [SHOWN-code] — local repo commit 11099bdd.
- Much later (v1.99, 2024) the author replaced the chain-like network with an Urquhart-graph neighbourhood so each burg connects to most neighbours [STATED, Patreon post surfaced in search] — [Routes rework v1.99](https://www.patreon.com/azgaar/posts/update-routes-v1-110144946) (outside blog scope; shows the admitted weakness of the 2017 design).

### 3.8 Names and labels
**Takeaway.** Names: per-culture Markov chains over letter bigrams trained on real-world town-name lists (gist "Real-world English town names used as a training material for Markov chain", 2017-11-19), with length/consonant constraints and culture-specific suffix rules; region names derived from generated or capital names plus "-ia". Labels: region label at the pole of inaccessibility of the largest contiguous part; font size falls with region count; curved labels on paths from 0.60b.

**Cited findings.**
- Training-data gist [SHOWN-code] — [gist 7378421…](https://gist.github.com/Azgaar/73784217bcd8764005e33a14342e2d2e) (created 2017-11-19, two days before the Settlements post).
- `calculateChains`/`generateName`/`generateRegionName` with polylabel [SHOWN-code] — gist rev b4a29df; 0.58b namesbase editor with per-base "name, method, min length, max length, letters to allow duplication, multi-word name rate" [SHOWN-code] — local repo commit 42cd291c.
- "Curved Labels", "Legend Editor" 0.60b [STATED, Changelog].
- Labels section of the 2017-11-21 post truncated in the index: it "only announces that it will cover settlement and region names" [STATED-snippet].

### 3.9 Rendering, styling, scale
- Spectral sequential colour scale for height (sea level chosen where it turns green) [STATED-snippet; SHOWN-code].
- Relief glyphs as path data, y-sorted; "fast and clear" is the stated reason to delete rather than hide [SHOWN-code] — gist rev ad0dab4.
- Style editor layer parameters and SVG filters (0.51b), active zooming (0.53b) [STATED, Changelog]; post [Styling the map](https://azgaar.wordpress.com/2018/05/06/styling-the-map/) [NAMED-ONLY for body].
- Scale = map/real distance ratio, Scale Editor, miles default, 3 mi/px [STATED-snippet] — [Map scale](https://azgaar.wordpress.com/2018/07/05/map-scale/); 0.54b scale bar "auto-rounded and auto-sized", overlays hex/square grid, wind rose [STATED, Changelog].

### 3.10 Performance
- Every generation stage wrapped in `console.time` from 0.1b onward; comments flag the full depression fill and the while-loop hill placement as slow [SHOWN-code].
- Re-graph drops deep-ocean cells ("polygons compressed") → fewer cells for everything downstream [SHOWN-code] — gist rev a54e23a.
- 0.54b simplified river polygons "much faster"; 0.56b "Performance improvement"; 0.7a "Optimization (faster generation and smoother edit experience)" [STATED, Changelog].
- Save file size breakdown comment: "points = 6%, cells = 36%, manors and states = 2%, svg = 56%" [SHOWN-code] — gist rev 70ab7ef.

---

## 4. Author's stated philosophy and admitted limitations

### Takeaway
What survives of the author's own voice: plausibility judged by eye against a conventional colour scheme; prefer derived structure (rivers from drainage, roads from pathfinding with economic costs) over drawn decoration; keep the map "fast and clear"; iterate in public with explicit "please change / need help / FIX me" markers.

### Cited Findings
- Inspiration: Martin O'Leary's *Generating fantasy maps*; later Scott Turner's *Here Dragons Abound* [STATED-snippet] — [Introduction](https://azgaar.wordpress.com/2017/03/30/first-post/); README 0.54b also lists Amit Patel's *Polygonal Map Generation* [STATED] — local repo commit fa9ec736.
- Project goal: "interactive, scalable, fast and plausible" map for a Medieval Dynasty simulator with ≥500 manors in 7 regions over ~200,000 km² [STATED] — README at 0.54b (local repo fa9ec736); the Q&A wiki confirms the simulator is "on hold" [STATED] — [Q&A](https://github.com/Azgaar/Fantasy-Map-Generator/wiki/Q&A).
- Sea level set by visual plausibility of the Spectral scale [STATED-snippet] — [Coastline](https://azgaar.wordpress.com/2017/04/03/coastline/).
- Rivers "not drawn as random strokes" [STATED-snippet] — [River systems](https://azgaar.wordpress.com/2017/05/08/river-systems/).
- Borders as customs duties in route cost [STATED-snippet] — [Settlements](https://azgaar.wordpress.com/2017/11/21/settlements/).
- Relief deleted rather than hidden "as I want map to be fast and clear" [SHOWN-code comment] — gist rev 581c717.
- Admitted limits in code comments: global queue "Please change with a non-global variable!"; while-loop placement; "Cannot place capitals with current spacing"; "looks weak, should I try real 3D?" (0.53b); "FIX me!" on river widening; "should be biome" on population; "Dijkstra (not used now)"; "Error: resolveDepressions iteration limit" [SHOWN-code] — gist revs 581c717, b4a29df, 70ab7ef; Changelog 0.53b; local repo 42cd291c.
- Blog status: "not actively posting anymore, but plans to write new ProcGen articles at some point" [STATED-snippet] — [About](https://azgaar.wordpress.com/about/).
- A requested styling feature "only planned, not yet implemented" (2018 comment) [STATED-snippet] — [Styling the map](https://azgaar.wordpress.com/2018/05/06/styling-the-map/).

### Inferences
- The author optimises for the *look* of a hand-drawn fantasy map first and for simulation realism second; every "realism" step (drainage, pathfinding, scoring) exists to make the picture self-consistent, not to model physics.
- Sampling, re-graphing and polygon simplification choices are consistently driven by browser-frame-budget concerns on ~8k–10k cells.

### Gaps
- No full statement of "what is realistic enough" was recoverable; the posts' prose would hold it.

---

## 5. Implications for a native SettlementForge world regime

(Judgements are mine; evidence tags refer to sections above.)

**KEEP / GENERALIZE**
1. **Two-graph architecture (coarse uniform grid → repacked landmass graph)** [SHOWN-code, STATED-snippet]: generalise to "sample where information lives" — densify coasts, rivers and settlement zones, drop open ocean. Cheap, and it is the single idea the author still cites from the blog eight years later.
2. **Rivers as a derived property of the heightmap** (fill depressions, uniform rain, route to lowest neighbour, threshold, longest-wins confluence): keep the pipeline, but replace the O(passes×cells) iterative fill with Priority-Flood (the author's own code hit iteration limits) and keep lakes as first-class outputs of the fill rather than an afterthought (0.58b retrofit).
3. **Mouth typing (delta vs. estuary) from flux and coast geometry**: trivial and visually decisive; generalise to a small set of mouth archetypes.
4. **Two-stage settlement scoring (geographic suitability, then economic suitability after roads exist)**, with capitals chosen under a spacing constraint and towns attached by power-weighted distance: this is exactly the manor/settlement ranking SettlementForge needs; generalise the score terms into a data-driven table (harbour quality, estuary, riverbank, confluence, crossroads, biome).
5. **Route costs that encode politics** (border crossing = customs duty, neutral land penalty, coast preference, road reuse): keep as the cost-model vocabulary; add the author's later lesson (v1.99) of building the network on a neighbourhood graph (Urquhart/relative-neighbourhood) rather than all-pairs chains.
6. **Template scripts of heightmap primitives** (hill, range, trough, strait, pit, add/multiply, smooth) as a declarative, user-editable DSL: keep as the world-shape authoring layer; it is more controllable than noise for "I want two continents and a strait".
7. **Label placement at the pole of inaccessibility of the largest contiguous part of a region**: keep.
8. **Explicit scale layer (distance per cell, units, area, population rates) separate from geometry**: keep; the 3 mi/px default and population = score × urbanization × rate is a usable baseline.

**REJECT / REPLACE**
1. **Blob-diffusion heightmaps with multiplicative decay and a "sharpness" random modifier** [SHOWN-code]: visually dated and non-reproducible at other resolutions; replace with the template DSL driving a resolution-independent field (distance/falloff kernels or noise-modulated ranges), keeping the DSL semantics.
2. **Uniform rain with a hemisphere constant (0.1 south / 0.07 north)** and a precipitation scalar that merely decays downhill: replace with the wind-marched moisture + orographic model the biomes post is credited with (and that FMG shipped only in 2019).
3. **Per-pixel river polygon construction via `getPointAtLength`**: rejected by the author himself within seven weeks; emit widths per vertex from flux, not from length (length-based width was a stop-gap he acknowledged in comments).
4. **Cultures as nearest-of-N random centres and states as nearest-capital partitions** (2017–2018): replaced by expansion/competition models in v0.7a; do not adopt the 2017 version.
5. **Hard-coded sea level 0.2 chosen for a colour scheme**: keep a threshold, but make it a world parameter decoupled from palette.
6. **SVG-DOM rendering of every cell** (the "svg = 56% of save size" problem): SettlementForge should render from data, not store the drawing.

---

## 6. Access log (what worked, what was blocked)

| Route | Result |
|---|---|
| WebFetch `https://azgaar.wordpress.com/` (home, archives, posts) | **Blocked** — DNS `ENOTFOUND` (host not resolvable through the proxy). |
| WebFetch WordPress.com REST `public-api.wordpress.com/rest/v1.1/sites/azgaar.wordpress.com/posts/` | **Blocked** — `ENOTFOUND`. |
| WebFetch `/wp-json/wp/v2/posts`, `/feed/` | **Blocked** — same host. |
| curl via `$HTTPS_PROXY` to azgaar.wordpress.com, public-api.wordpress.com, azgaar.files.wordpress.com, i0.wp.com | **Blocked** — `CONNECT tunnel failed, response 403` (proxy status: "gateway answered 403 to CONNECT (policy denial)"). |
| Wayback Machine (`web.archive.org` page view, CDX API, `archive.org/wayback/available`), `arquivo.pt`, `archive-it.org`, `timetravel.mementoweb.org`, `archive.ph`, `ghostarchive.org`, `perma.cc`, `megalodon.jp`, `cachedview.nl`, Google cache, Common Crawl index | **Blocked** — WebFetch "unable to fetch"; curl 403/000. |
| Reader/translation proxies (`r.jina.ai`, allorigins, corsproxy, Google Translate) | **Blocked**. |
| Third-party pages that quote or review the blog (reddit, news.ycombinator.com, heredragonsabound.blogspot.com, bitsanddragons.wordpress.com, deepwiki.com, observablehq.com, medium, dev.to, itch.io, wikipedia, stackoverflow, bl.ocks.org, blocks.roadtolarissa.com, feed aggregators) | **Blocked** (000). |
| GitHub MCP `search_code` / `search_repositories` | **Worked** — enumerated every blog URL cited on GitHub (27 files for 2017 URLs, 1 for 2018, 0 for 2019+), found verbatim quotations. `get_file_contents` restricted to the session's own repo (denied for Azgaar/Azgaar). |
| `raw.githubusercontent.com` (any public repo, incl. `/wiki/` raw) via curl | **Worked**. |
| `gist.github.com` HTML pages and `git clone https://gist.github.com/<id>.git` | **Worked** — full 113-revision history of the demo gist recovered; `api.github.com` and `github.com` pages 403; `gist.githubusercontent.com` raw blocked. |
| WebSearch (cap 8, all used) | **Worked** — enumerated 16 posts and yielded excerpts for 14; queries: `site:azgaar.wordpress.com`; "2018 … blog post"; "2017 voronoi heightmap coastline rivers"; "settlements regions routes names labels"; "styling the map / map scale / polygonal rivers"; "2019 posts"; exact-URL OR query for the three unknown slugs; "Map scale OR Heightmap generator … 2018 2019". |
| Local: `reference/fmg-src` git history (2593 commits from 2017-06), `reference/fmg-wiki/Changelog.md`, `docs/architecture/data-model.md` | **Worked** — only one blog link in the FMG tree (`2017/10/05/templates`, cited for repacking) plus generic links in README/wiki Home/Q&A. |

**Count:** 16 posts found (15 verified title+date, 1 URL-only). **0 read in full.** 14 with partial author text via search excerpts; 2 (Voronoi graph; Confluences) with no author text at all; 1 (2017-12-29) unverified. Not counting any blocked route as "no posts".

Working files (scratchpad): cloned gist at `/tmp/claude-0/-home-user-maps-architecture/066c3e02-47d5-566f-a043-4b593d3898a3/scratchpad/gistrepo`, extracted revision sources under `.../scratchpad/code/`, secondary files under `.../scratchpad/sec/`.
