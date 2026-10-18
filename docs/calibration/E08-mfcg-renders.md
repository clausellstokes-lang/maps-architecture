# E08 — MFCG street-edge recoverability, streetwall continuity and gross cover on the plain sweep (W-08)

Lane `m1/W-08`, 2026-10-04 03:08 – 04:15 EDT, on the owner's Mac (M0's build seats and the FTG recording seat running
beside it). This is a research-side record (`plat/CLEAN-ROOM.md` rule 2: implementer seats do not read it). It carries
numbers, metric ids and our own words only: no place name, colour value, font, identifier, word list or code of a
reference. The numbers are in the files below, all written by the tools named in section 1.

| file | what it holds | reader |
|---|---|---|
| `E08-mfcg-renders.json` (sha256 `692445ab…`) | the sample, the per-size summaries of every measure and companion, the checks, and every seed's record (scale, samples, failure counts, registration, the three measures, the PNG hashes) | W-15 |
| `E08-mfcg-renders.render-log.jsonl` (sha256 `db872595…`) | the render log: one line per browser session (4), with the switches, the page's request count, Chrome's NetLog counts and every render's SVG hash, outside references removed, size and PNG hash | W-08's checker; W-19 |
| `E08-mfcg-renders.control-log.jsonl` (sha256 `0307bbc3…`) | the instrument's positive control (one session; section 4) | — |
| `captures/mfcg/renders-w08-2026-10-04/` | the 30 kept rasters (R1, 11 MB) and a README | W-15 (provenance) |

**These are measured values, not rows.** W-15 is the sole writer of `rows.py`, and it forms the rows and their bands
(R-47 (a)). `fg.recoverability` and `fg.streetwall` are MFCG targets and `fg.coverWalled` is descriptive (plan §1 D10,
D12; `metrics.m-1.json`).

**Outcome.** `research/baselines/measure_mfcg_render.py` (sha256 `f79bb679…`) and its browser helper
`research/baselines/render_svg_offline.mjs` (sha256 `0ecd859f…`) are built and run on the 30 usable plain seeds of the M-1
sweep. **Every check of the W-08 row passes** (CONFIRMED, executed; 8 of 8 PASS, exit 0):

* **Two renders differ by less than 0.005.** R1 against R2, each from its own browser launch, on all 30 seeds. The
  largest difference is 0.000061.
* **The cover reproduces `stats.py`'s column.** The printed three decimals match on 30 of 30 seeds. Unrounded, the
  values are exactly equal on the 18 seeds whose `MeasureInput` merged no vertex. On the other 12 they lie within the 1 mm
  merge's own bound (largest relative difference 1.54e-9).
* **The render log shows 0 network requests.** It covers 4 sessions and 120 renders. The page made 0 requests. In
  Chrome's own NetLog there were 0 URL requests to any host other than loopback, 0 named host resolutions, 0 outside TCP
  connects and 0 bytes sent outside. One outside reference was removed per SVG, 120 in all, and no job was refused.

The five lane checks also pass: registration, the W-09 twin, the sample, the paper colour, and no label in the map-only
renders. A red run plants one fault per check, each in its own copy, and all 8 plants turn their own check red. A positive
control shows that the network counters do count a request when one is made (section 4).

The values per size, at MFCG's own default view (median [p10, p90], `type7`, n = 10):

| measure | TOWN (40) | CITY (80) | METROPOLIS (130) |
|---|---|---|---|
| `fg.recoverability` | 0.870 [0.847, 0.878] | 0.749 [0.707, 0.761] | 0.524 [0.499, 0.574] |
| `fg.streetwall` | 0.923 [0.919, 0.930] | 0.928 [0.924, 0.931] | 0.924 [0.921, 0.927] |
| `fg.coverWalled` (descriptive) | 0.605 [0.582, 0.624] | 0.624 [0.612, 0.643] | 0.623 [0.613, 0.637] |
| metres per pixel of the render | 1.20 [1.08, 1.27] | 2.09 [2.06, 2.33] | 3.23 [3.00, 3.36] |

Five findings are routed onward (section 8). None blocks this item. The two that matter for M1:

* **F1.** Recoverability depends strongly on the ground scale. At one fixed 0.8157 px per m for every size, the values
  are 0.864 / 0.829 / 0.770.
* **F2.** `fg.streetwall`'s 0.5 m raster twin reads about 0.026 below the same measure on a 0.25 m raster.

## 1 What was built and run

| file | what |
|---|---|
| `research/baselines/measure_mfcg_render.py` (new, our own code: the standard library and PIL) | the sample, the geometry phase (W-09's map rebuilt, the samples, the streetwall, the cover, cached in scratch under a key of the geometry code), the four render sessions, the measures, the summaries, the checks, `--red`, `--selftest`, `--only`, `--no-render`. It imports `derived_graph.py` (W-09: the map, the graph, the block rasters), `measure_mfcg.py` (the plan sample, V12 §3.5.1's estimators, `measure_extra`'s cover) and `measure_ftg.py` (geometry helpers), all unchanged |
| `research/baselines/render_svg_offline.mjs` (new, our own code; `puppeteer-core` from `profiler/node_modules`, already installed) | rasterises the SVGs of a job list in headless Chrome with the network disabled (section 2), writes the PNGs and one render-log line per session; `--control` adds the positive control |

The tool reads the sweep's SVG files, the `MeasureInput` files that `adapters/mfcg.py` wrote, `plan.json` and the sweep's
`export-check.json` (through `measure_mfcg.plan_families`), the sweep's `stats.json`, and E09's per-seed file. It never
opens a captured program bundle, touches no site, and writes nothing under `plat/`. It runs no benchmark, and no timing is
taken or claimed.

Runs, all on 2026-10-04 (project root; each at `nice 10`):

| run | command | result |
|---|---|---|
| final | `python3 research/baselines/measure_mfcg_render.py`, then `… --no-render` | the geometry of 30 seeds and the four sessions (03:57–03:58 EDT), then the measures and checks; 8 of 8 PASS, exit 0. The first pass reported K2 FAIL because the check compared values rounded to six decimals; the check was fixed and the run re-measured the same renders (section 4, K2) |
| red | `… --red` (reads the stored JSON and render log; writes nothing) | 8 of 8 plants turn their own check red; exit 1 |
| self-test | `… --selftest` | S1–S4 PASS: the marching-squares outline of a 20 × 10 block equals 2 × 19 + 2 × 9 + 4√0.5 cells; one square footprint walls 0.9915 of its outline and two footprints 4 m apart, bridged by the closing, 0.9085; a synthetic street reads 1.0 with both edges, 0.0 with one, 0.0 when closed; the labels and the grid lie after the map group in all 30 SVGs |
| reproduction | `… --only size40-plain-3,size80-plain-5,size130-plain-7 --scratch <a fresh folder>` | a fresh geometry and four fresh browser sessions. The streetwall, both steps, the cover and the sample counts are identical. Recoverability is within 0.000061 of the final run in every variant. Its render log also shows 0 network requests |
| positive control | `node research/baselines/render_svg_offline.mjs … --session C0-positive-control --control` | one image request to a reserved name was counted: 1 URL request, 1 named resolution, 0 outside TCP connects, 0 bytes out |
| raster-step check | a scratch script calling the tool's functions on `size40-plain-0` | `fg.streetwall` 0.9225 / 0.9506 / 0.9547 on block rasters at 0.5 / 0.25 / 0.125 m (F2) |

## 2 The renders — offline, and at which scale

**The network stays off (R-47 (c)).** Every SVG of the sweep carries one outside reference: a style rule that imports a
web font from a third-party host. Opened in a browser as stored, the SVG would fetch it, and that would be a contact plan
§5 does not list. The helper keeps the network off in five layers, and the render log records the result:

1. **The reference is removed** before the page is built (one removal per SVG, counted). The prepared markup is then
   scanned for any reference left: links, `url()`, imports, images, foreign objects, scripts, embeds, and any URL other
   than the SVG and XLink namespaces. A job with one left is refused, not rendered.
2. **No navigation.** The page is built with `setContent` on a blank page, so there is no navigation and no file load.
3. **Every request the page would make is aborted.** Interception aborts it, and the page is in offline mode.
4. **The browser itself is fenced in:**
   * a fresh scratch profile, over a pipe (no debugging port);
   * preferences that turn sign-in, Safe Browsing, suggestions, prediction and translation off;
   * background networking, component updates, sync, pings, field trials and a list of service features off;
   * every service address that has a switch pointed at a closed port on the loopback address;
   * every host name resolving to nothing, and every request routed through a proxy at that closed loopback port, so
     even an IP literal cannot leave the machine.
5. **Chrome's own NetLog** covers the whole browser process. It is parsed after the browser closes. It stays in scratch,
   because it holds the machine's own addresses; only its hash and counts reach the log.

Layer 4 exists because of a first probe. With the usual automation switches alone, the browser's own services asked, among others,
within ten seconds of launch for an account list, a search endpoint, a safe-browsing key, a component update and a
device check-in. The page itself asked for nothing. Each service was pointed at the closed loopback port or switched off,
and the probe was re-run after each change. In the final sessions, the only traces of those services are 4 requests per
session to the closed loopback port, and one UDP route probe per session. That probe connects a UDP socket to choose a
route and sends no datagram: the NetLog records 0 bytes sent outside.

**The four sessions (R1 to R4).** Each is one browser launch rendering all 30 SVGs.

| variant | what is drawn | scale | kept |
|---|---|---|---|
| R1 | the map only: labels and furniture off (V12 §3.9.2's panel convention). Every overlay is hidden (a coordinate grid, the scale and north marks, and all text) by one structural rule: every group drawn after the scaled map group | MFCG's own: the SVG at its own size, 1 SVG px = 1 CSS px, device pixel ratio 1 | the 30 rasters |
| R2 | as R1, in a second browser launch | as R1 | scratch (the determinism check) |
| R3 | as exported: furniture and labels on. The font is never fetched, so labels use a fallback face | as R1 | scratch (companion) |
| R4 | as R1 | a fixed 0.8157 px per m (ARCHITECTURE §8.3's matched scale, MFCG size 40; E07 §7), set through the device pixel ratio | scratch (companion) |

**The scale.** MFCG's export draws its map group at a scale that fits the city into the sweep's 1 100-pixel window
height, one map unit being 4 m (`stats.py`; E03). This gives 1.06–1.32 m per px at size 40, 1.96–2.42 at size 80 and
2.99–3.36 at size 130. Every one lies inside the city band: §8.8's stops 0–15 run from about 12 m to 0.89 m per CSS px. So
R1 is MFCG's default view at the city band, which is the view §8.5's metric line names ("city band, default view, every
rung"). §13.6 (3) matches our side to the reference's metres per pixel pair by pair. R4 holds one scale for all three sizes
(decision D1, section 7).

## 3 The three measures as built

### `fg.recoverability`

The measure is ARCHITECTURE §8.5's metric (V12's catalogue row reads "§8.5's metric on the city band at the matched
scale"). On MFCG it reads lanes, and MFCG exports none. So, by V12 §3.4.1, it reads the derived street graph: W-09's
graph (the declared twin, version 1.0.0, R-22). The graph is rebuilt here from the same `MeasureInput` and checked equal to
E09's per-seed file on every seed.

1. **Corridors.** The derived graph's edges inside the enclosure.
2. **Not street.** A sample under the drawn body of a wall or a tower is left out of the sampled length. That means within
   half the export's wall thickness of a curtain or castle wall line, or within the export's tower radius of a tower
   point. This removes 0.86 % of the graph's length at size 40, 0.44 % at 80 and 0.29 % at 130, reported per seed.
3. **Sampling.** Each edge of length L is cut into n = ⌈L ÷ 2 px⌉ equal parts. There is one sample at each part's
   midpoint, weighing L ÷ n. This is §8.5's "sampled every 2 px".
4. **The half-width, side by side.** At a sample, each side's half-width is the distance along the normal to the first
   cell outside the street space (W-09's 0.5 m raster, walked in 0.25 m steps). On a centred corridor the two sides are
   equal.
5. **Recoverable.** On both sides, the scan runs outward along the normal from the centre in 0.25-px steps, up to that
   side's half-width + 1 px. The sample is recoverable when, on both sides, a road pixel is followed by a non-road pixel:
   §8.5's "a road / non-road transition within (half-width + 1 px) on both sides".
6. **Pixel classes,** as `docs/validation/bench/mfcg_cover.py`. A pixel is paper when its L1 distance to the paper colour
   is at most 45; otherwise it is not road (that script's water, tree and figure classes together). MFCG's street voids
   are paper. The paper colour is read from each SVG's own background, in memory only. The script's own constant came
   from the app's screenshots, and the export's paper lies L1 112 away from it, so that constant could not be reused.
7. **The value** is the recoverable share of the sampled length, per seed. A family is summarised by V12 §3.5.1's
   estimator (`type7` at n = 10).

A companion reads both sides to the mean of the two half-widths + 1 px (decision D4).

### `fg.streetwall`

This is V12's catalogue row, on R-07's dense frontages (for MFCG, every intramural frontage). It runs over W-09's
intramural cluster blocks: the 0.5 m raster, the 3 m closing, holes filled, and intramural by the area-weighted centroid
of the footprints.

* The outline is traced by marching squares: segments between the midpoints of neighbouring cell centres that differ.
* A segment counts when its midpoint lies inside the enclosure.
* It is walled when that midpoint lies within 0.5 m of a footprint edge.
* The value is the walled share of the outline's length.

A companion runs the same on block rasters at a 0.25 m step, to measure the raster's own error against the 0.5 m
tolerance (F2).

### `fg.coverWalled`

This is V12's catalogue row, and the row is descriptive. The value is `measure_mfcg.measure_extra`'s, unchanged: the
footprints whose centroid lies inside the enclosure, their area over the enclosure's. Beside it, as information only, is
the not-road pixel share of R1 inside the enclosure.

## 4 The checker column (W-08 row) and the lane checks

| check | result |
|---|---|
| K1 — two renders of one SVG differ < 0.005 in the metric | R1 against R2, from two browser launches, on 30 of 30 seeds; largest difference 0.000061 (`size80-plain-5`). The PNGs are byte-identical on 11 of 30: the browser's rasteriser varies in low-order pixels on the larger SVGs. **PASS** |
| K2 — the cover reproduces `stats.py`'s column | stats.md's printed column matches on 30 of 30 seeds. Unrounded, the values are exactly equal on the 18 seeds whose `MeasureInput` merged no vertex. On the 12 with merged vertices (the adapter's 1 mm merge, V12 §3.2.2), every value lies within that merge's own bound, merges × 1 mm × the seed's largest footprint perimeter ÷ the covered area. The largest relative difference is 1.54e-9 (`size130-plain-0`: 4 merges, bound 7.8e-7). The first pass of this check failed, because it compared values already rounded to six decimals (a relative difference up to 8.6e-7). The fix compares the unrounded values, and the stored record now carries them. **PASS** |
| K3 — the render log shows 0 network requests | 4 sessions, 120 renders. Page requests: 0. In Chrome's NetLog, per session and in total: 0 URL requests to any host other than loopback, 0 named host resolutions, 0 TCP connects or attempts to any address other than loopback, 0 bytes sent outside. 120 outside references removed, 0 left, 0 jobs refused, every NetLog closed. Beside these: 16 service requests to the closed loopback port and 4 UDP route probes. **PASS** |
| L1 — registration | On every R1 render, every footprint interior point (at least 2 px inside its footprint) reads figure: 1.000 on all 30. Tower points reading figure: 997 of 999 (the adapter's tower list is derived, not MFCG's drawn list). The footprint mask overlaps the figure mask most at no shift on 22 seeds and at 1 px on 8. **PASS** |
| L2 — the W-09 twin | the derived graph's length and faces equal E09's per-seed file on 30 of 30 seeds. **PASS** |
| L3 — the sample | the three plain families' usable seeds, 10 / 10 / 10, all measured. Failed: `capture/MFCG/130/plain/8`, `no-export`. **PASS** |
| L4 — the paper colour | each R1 render's most frequent colour is the SVG's own paper exactly (L1 0). **PASS** |
| L5 — no label in the map-only renders | R1, R2 and R4 show 0 labels; R3 shows them all. **PASS** |
| red run | Eight plants, each in its own copy of the stored record: R2 off by 0.0051 on one seed; one unmerged seed's cover off by 1e-12 relative; one network request in one session; a 2-px best shift; one face too many; a family one seed short; a paper colour off by L1 9; three labels shown. Each turns its own check red. The short-family plant also turns K3 red, because the render log's jobs no longer equal the sample. 8 of 8. **PASS** |
| positive control | a separate session (`E08-mfcg-renders.control-log.jsonl`) asks, from a second page with interception off, for one image at a reserved name that can never resolve. The counters see it: 1 URL request, 1 named resolution, 0 outside TCP connects, 0 bytes out. So K3's zeros are a measurement, not a blind spot |

## 5 The values per size

Median [p10, p90] by `type7` at n = 10. The per-seed values are in the JSON (`perSeed`). The companions are information
for W-15 and M1, not rows.

| measure | TOWN (40) | CITY (80) | METROPOLIS (130) |
|---|---|---|---|
| `fg.recoverability` (R1) | 0.870 [0.847, 0.878] | 0.749 [0.707, 0.761] | 0.524 [0.499, 0.574] |
| R2 (the repeat) | 0.870 [0.847, 0.878] | 0.749 [0.707, 0.761] | 0.524 [0.499, 0.574] |
| R3 (as exported, labels and furniture on) | 0.843 [0.821, 0.855] | 0.714 [0.670, 0.729] | 0.500 [0.477, 0.553] |
| R4 (a fixed 0.8157 px per m) | 0.864 [0.851, 0.877] | 0.829 [0.816, 0.837] | 0.770 [0.759, 0.780] |
| R1 with the mean half-width on both sides | 0.812 [0.790, 0.819] | 0.729 [0.689, 0.740] | 0.520 [0.495, 0.563] |
| sampled length, km | 19.9 [19.0, 22.0] | 69.0 [65.5, 76.9] | 180.8 [170.3, 190.9] |
| `fg.streetwall` (the 0.5 m twin) | 0.923 [0.919, 0.930] | 0.928 [0.924, 0.931] | 0.924 [0.921, 0.927] |
| `fg.streetwall` on 0.25 m block rasters | 0.951 [0.943, 0.955] | 0.955 [0.952, 0.957] | 0.952 [0.946, 0.955] |
| `fg.coverWalled` | 0.605 [0.582, 0.624] | 0.624 [0.612, 0.643] | 0.623 [0.613, 0.637] |
| not-road pixel share inside the walls (R1, information) | 0.734 [0.720, 0.746] | 0.789 [0.773, 0.806] | 0.833 [0.825, 0.856] |
| metres per pixel of R1 | 1.20 [1.08, 1.27] | 2.09 [2.06, 2.33] | 3.23 [3.00, 3.36] |

The frontage `fg.streetwall` reads has a median of 34 / 124 / 331 km per seed.

## 6 What the values show

* **The failures are corridors whose own centre is not paper.** Pooled over each family's samples, the centre pixel is
  not road on 12.6 % of samples at size 40, 25.6 % at 80 and 46.2 % at 130. One side failing alone is rare: 0.70 %,
  0.08 % and 0.03 %. Both sides failing with a paper centre happens 0 times. The derived street space keeps every gap of
  1 m or more between clusters. MFCG draws each building as a dark base at the footprint, with the roof raised a pixel
  or two above it. At these scales, gaps of a few metres close in the render, so the corridor is not visible at all.
  Diagnostic overlays of `size40-plain-0` (scratch) show exactly this: red runs along narrow gaps between building rows,
  and green along the streets and through the open squares.
* **The scale decides most of the drop with size.** From size 40 to size 130, R1 falls from 0.870 to 0.524. The view
  also coarsens from 1.2 to 3.2 m per px. At one fixed scale (R4), the fall is from 0.864 to 0.770 (F1).
* **Labels and furniture cost about 0.03.** R3 is below R1 by 0.027, 0.037 and 0.024 (medians), because labels and grid
  lines lie over streets.
* **The streetwall is flat with size.** It is about 0.92–0.93 on the twin and about 0.95 at 0.25 m, at every size. At
  0.5 m the traced outline sits up to half a cell outside the footprint edges, against a tolerance of 0.5 m. So the twin
  under-counts walled frontage, by 0.026 on the median (F2).
* **The cover matches the design's descriptive range on the medians.** These are 0.605 / 0.624 / 0.623, inside §13.5's
  "0.60–0.64 at sizes 40–130". The seeds themselves spread from 0.561 to 0.653 (F4).

## 7 Decisions taken under the delegation (J122; each vetoable; none changes a design cell or a ruling)

* **D1 — the matched scale is MFCG's own default view (R1).** I chose this over one fixed metres-per-pixel for all sizes
  (R4). §8.5's metric line measures each rung at its default view, and §13.6 (3) puts our side at the reference's ground
  scale pair by pair. R4 is printed beside it on every seed. A veto makes R4 the value and R1 the companion.
* **D2 — labels and furniture off (R1).** I chose this over the SVG as exported (R3), following V12 §3.9.2's panel
  convention. The labels' font cannot be fetched offline, and grid lines and labels are overlays, not figure-ground. The
  rule is structural: every group after the scaled map group is hidden. All 30 SVGs carry the same structure (self-test
  S4).
* **D3 — the corridors are W-09's derived street graph,** not the exported roads. MFCG exports arterial roads only,
  and V12 §3.4.1 says a lane-reading metric on MFCG reads the derived graph.
* **D4 — the half-width is read per side.** Each side's scan reaches that side's distance to the street space's edge
  + 1 px. The alternative was one half-width for both sides (the mean of the two). At junctions and in squares the
  derived axis is not centred across the normal, so the mean fails samples whose edges are drawn exactly where they lie.
  At size 40 the mean variant reads 0.06 lower, and its failures are one-sided. The mean variant is printed beside the
  value.
* **D5 — samples under drawn walls and towers are left out:** within half the export's wall thickness of a wall line,
  or within its tower radius of a tower point. They are not street. The length left out is reported (0.3–0.9 % of the
  graph).
* **D6 — pixel classes.** These are `mfcg_cover.py`'s paper rule (L1 ≤ 45), with the paper colour read from each SVG.
  Every other class counts as not road.
* **D7 — the transition** is a road pixel followed by a non-road pixel within the window, scanned in 0.25-px steps.
* **D8 — the sampling** is n = ⌈L ÷ 2 px⌉ midpoint samples per edge, each weighing L ÷ n.
* **D9 — `fg.streetwall` reads W-09's 0.5 m block rasters,** the declared twin R-22 names for this row, traced by
  marching squares. The 0.25 m value is a companion (F2).
* **D10 — `fg.coverWalled` is `measure_mfcg.measure_extra`'s,** W-07b's function, unchanged.
* **D11 — what "0 network requests" counts.** The page's own requests count, and in the browser's NetLog: URL requests
  to any host but loopback, named host resolutions, TCP connects and attempts to any address but loopback, and bytes sent
  outside. The browser's own service attempts were switched off where a switch exists, and otherwise pointed at a closed
  loopback port. They are counted separately, as is the UDP route probe, which sends no datagram. The positive control
  proves the counters see a real request. The raw NetLogs stay in scratch.
* **D12 — two renders means two browser launches** (R1, R2), not two screenshots in one page.
* **D13 — registration** is tested by the footprints, the towers and the footprint mask's best shift. Paper at wide
  axis points would not be a fair test: it reads 0.909–0.975 because raised roofs and landmark symbols reach into the
  streets. That share is kept as information.

## 8 Findings (routed; none blocks this item)

* **F1 (for W-15, the digest seat and M1): recoverability depends strongly on the ground scale.** R1 against R4 is
  0.870 / 0.749 / 0.524 against 0.864 / 0.829 / 0.770. §8.5's bar, "≥ MFCG's value less 0.03", is therefore only
  meaningful when our render is at the same metres per pixel as MFCG's. That is §13.6 (3)'s matched-pair rule.
  Recommendation: W-15's row note names the scale (the R1 median per size, 1.20 / 2.09 / 3.23 m per px). The digest
  entry for the metric then tells M1 to render at that scale, or to read R4's value with R4's scale. CONFIRMED that the
  values differ; PLAUSIBLE that M1 would otherwise compare across scales.
* **F2 (for W-15, W-17 and the rulings round): `fg.streetwall`'s 0.5 m raster twin under-counts.** The tolerance is
  0.5 m, the same as the raster step. On `size40-plain-0` the value is 0.9225 at 0.5 m, 0.9506 at 0.25 m and 0.9547 at
  0.125 m, converging. Over the 30 seeds, the 0.25 m value is 0.023–0.031 higher. R-22 keeps the 0.5 m twin, so the row
  stays at 0.5 m here. Our side must then derive at the same step (R-20 (7)'s entry has to state it), or the rulings
  round moves the row to 0.25 m. CONFIRMED (measured).
* **F3 (for the digest seat W-17; R-20 has no entry for this metric).** M1 implements `fg.recoverability` and
  cross-checks it within 0.01 (§8.5). It can do that only if it measures the same way. R-20's nine entries do not cover
  the metric's MFCG derivation: the derived corridors, the per-side half-width, the wall and tower exclusion, the pixel
  classes and the matched scale. Recommendation: a tenth entry stating section 3 of this record in our own words.
  CONFIRMED by reading R-20.
* **F4 (information for W-15's descriptive row): the cover's spread.** §13.5 says "0.60–0.64 at sizes 40–130". The
  per-size medians agree (0.605 / 0.624 / 0.623), but single seeds run from 0.561 to 0.653. The row's note can carry the
  spread. No design change is asked.
* **F5 (information for any later render seat, e.g. the M1 panel's reference side): the browser contacts its own
  services.** Headless Chrome with the usual automation switches made five kinds of service request within seconds of
  launch, though the page asked for nothing. `render_svg_offline.mjs` is the tool that keeps a render offline and proves
  it.

## 9 Hand-offs

| reader | reads | from |
|---|---|---|
| W-15 | the three measures per seed and per size, the companions (R3, R4, the mean half-width, the 0.25 m streetwall), the scale per seed; F1, F2, F4 | `E08-mfcg-renders.json` (`perSeed`, `summaries`) |
| W-17 (digest) | the derivation of section 3 and the matched scale, for a digest entry (F3), and the streetwall's raster step (F2) | this record, sections 2–3 (restated in our own words) |
| W-19 (exit check) | that W-08 wrote nothing under `plat/` (no row needed) | this record |
| M1 | the cross-check within 0.01 needs our renders at R1's metres per pixel (F1) | through W-17's digest |

## 10 CONFIRMED versus PLAUSIBLE

* **CONFIRMED (executed).** Every number in sections 4–6. The final run, red run, self-test, three-seed reproduction,
  positive control and raster-step check produced them, and a scratch script printed the tables from the written JSON.
  Also confirmed:
  * the sample, read from `plan.json` and `export-check.json`;
  * the W-09 twin on 30 of 30 seeds;
  * the scale of each SVG, from its own map transform;
  * the furniture structure on 30 of 30 SVGs;
  * `plan.py --check`, which gives SAME (`plan.json` and `metrics.m-1.json`; nothing here writes either file);
  * the content scan of this record (section 11).
* **CONFIRMED (read).** §8.5's metric text, §8.8's stops, V12 §3.4.1, §3.9.2 and the three catalogue rows, R-07, R-20,
  R-22 and R-47 as cited.
* **PLAUSIBLE (reasoning only).**
  * That MFCG's export scale is the app's on-screen default view at the sweep's 1 100-pixel window height. The SVG and
    the screenshot share that height, but their scales were not compared pixel for pixel.
  * That the failures at the corridors' centres are the closed narrow gaps and raised roofs. This was read on overlays
    of one seed, not classified on all 30.
  * F1's and F3's consequences for M1.

## 11 Content scan of this record

`doc_checks.py --doc docs/calibration/E08-mfcg-renders.md --heads docs/ARCHITECTURE.md` gives C1 0, C2 0, C4 0, S1 0 and
S2 0, and C3 36 hits with 34 unreviewed. The research deny-list scan (`make_denylist.py scan`) of this record and
the rasters' README gives TOK, ID, COL, SET, PHR and FILE 0, and TRI 38 hits with 35 unreviewed. Every C3 and
TRI hit was read. They are common phrases of our own text ("restated in our own words", "up to half a cell") and digit
runs of our own numbers and section references. None is a reference word list, palette, grammar or identifier. One
enumeration of the reference's map overlays was reworded into our own terms before the final scan. This record is not in
the design set, so no allow rows are added (the precedent of the earlier M-1 records).
