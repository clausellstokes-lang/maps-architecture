# Fable review — lane fable-review/main/evidence-captures (the 2026-09-25 Opus measurements and readings of the live generators)

Reviewer: Fable (claude-fable-5-1), 2026-09-27 21:2x–22:xx. Rows: every PENDING row of `docs/FABLE-REVIEW-QUEUE.md` whose id
is B01 … B17 or B20 — eighteen rows, listed by grep at the start; no further match existed. Method per row (the lane brief):
the addendum or README read whole and the tool change's code read whole; at least one load-bearing number per row re-derived
from the capture data with the scripts that exist (all re-runs redirected to the scratchpad, never printed whole); every
claim's evidence tag checked; the design's consumption checked by grep of `docs/ARCHITECTURE.md` (13 025 lines) and
`docs/CONFIDENCE.md` at the cited lines. Owner rules read first: `docs/OWNER-INSTRUCTIONS-2026-09-25.md` (every section),
`docs/DEFINITION.md`, and `docs/AMENDMENTS-2026-09-27c.md` §A–§F (items 32–62, to be applied by pass c) so that any current
design text these rows touch and pass c will change is named below as an impact, not re-blocked here.

**Outcome in one sentence.** All eighteen rows stand as measurements: every load-bearing number I re-derived reproduces
exactly (twenty-one independent re-derivations, four of them new checks the lanes did not make), no wrong number reached
the design, and the corrections are to readings (INFERRED mechanisms the 2026-09-27 code readings supersede), to three
README sentences already corrected by the styles addendum, to one unit statement, and to two counts that later lanes moved.
**Blocks written: 0** (J-Fev-3 below).

## PROGRESS

| row | planned | done |
|---|---|---|
| B01 | read addendum whole; re-derive gate rule from capture; check os-model §11/§14/§15 cross-reference; design consumption | done |
| B02 | read addendum whole; re-derive towers = 33 − N; single-stream hazard vs D-15 | done |
| B03 | read ST-0..ST-12 whole; retry-scope claim vs D-9/§5; tree pipeline; skeleton roofs; tints | done |
| B04 | read README + drive.mjs; which options driven; earlier captures untouched | done |
| B05 | read README + export.mjs; re-derive schema counts from the JSON/SVG; 43 vs 20 towers | done |
| B06 | read README + tsv + analyze.mjs; re-run the fix; which class tables shift | done |
| B07 | read addendum + record.mjs --detailed; re-derive 94 segments / 6–7 control points | done |
| B08 | read addendum; palisade-hull-before-roads; density; warp | done |
| B09 | read addendum; bend geometry; width law; the two corrections | done |
| B10 | read addendum; re-run the parent-face test script | done |
| B11 | read addendum; re-run the prediction test | done |
| B12 | read addendum; re-run the anchor test; N(0.5, 0.09); 66 %; design reflection | done |
| B13 | read README-vertices + instrument.js + paths_stats.py + bentcut_*.py; transforms; colour classes | done |
| B14 | read manor.md whole; five-layout grammar; inputs claim; adaptation; architects' consumption | done |
| B15 | read manor READMEs + common.mjs; re-derive frequencies from captures | done |
| B16 | read research/manor/README.md + scraper code; 31 of 54 selection | done |
| B17 | read roadlength100 README + Critic-2 addendum part 2; re-derive (L+0.5)/2 from payloads | done |
| B20 | read sweep README; re-derive per-size statistics; units; MFP-5 / J19 | done |
| blocks file, design impacts, LANDED | write; log | done |

## Verdict table

| row | verdict | one-line reason | corrections (where) |
|---|---|---|---|
| B01 | CONFIRMED | every count of the EG-1 accounting table re-derived from the twelve `calls.json` files; the Lehmer chain re-derived (555001 → 2029853968 in 585 steps; the canal retry 777001 → 2128702816 in 1 242 steps, inside EG-3's 1 239–1 248); the midpoint rule now exact from the export geometry (0.000–0.001 m at every gate); the design consumed it as keyed sub-streams (§6.1, D-15) and the §4.2 S3 (4) gate law | none to the text; three notes appended (label move after the label fix; the auto-count fit's range; the exact midpoint proof) |
| B02 | CONFIRMED | N0/N1/N4/N9 counts re-derived (drawGate N + 1, drawTower 33 − N, weighted N, splitFace 0/1/4/8, aStar 2N + 1, Random.float 38/43/69/113); nested gate sets and the invariant wall and castle re-derived from the exported rings (non-gate vertices identical to 0.000 m; gate vertices moved 1.2–14.1 m onto the chord); 2N + 1 checked by CONFIDENCE §0.2 #2 at the ancestor's source | none |
| B03 | CONFIRMED | all step identities re-derived from the 33 step files (fill = fillArea; validate = 140 × validateRect in 14/14; Hip run = drawRoof 9 222; addGables 7 133; crown library 20 = getCrown = bloat; getColor 83 = lerp; lerp = getColor + overlay 92 = 84 + 8; Color.scale 11 120; alleys drawOutline = drawRoad + 1; Complex 510; updateLots 1); the 128 / 46 / 19 headline reproduced; ST-8's three bad-poly restarts and twelve canal restarts re-counted in the session console; D-9 and §1.4 consume ST-8 correctly | none |
| B04 | CORRECTED | all fifteen options were driven as tabled (33 coverage steps in `steps.jsonl`); the tooling read (`drive.mjs --coverage/--draw/--marker`, `analyze.mjs`'s `steps/`→`session/network` lookup) changes no earlier capture; three README statements are superseded by the styles addendum's own ST-10 rows 10–12 and the README does not say so | appended: alleys hairline is drawn under the wards and road cores and only in the shanty-town sprawl; `Ward.getColor` = built-up wards and `Color.lerp` = `getColor` + `overlay`; `run` = `drawRoof` + ridges only while labels are Curved; the 1 544-label union is the pre-label-fix count |
| B05 | CORRECTED | `json_counts.py` and `gates_towers.py` re-run reproduce every "equal" row (gates 0/1/4/9/7, towers 33/32/29/24, buildings + prisms = roofs + solids in 5/5); the export tool read; the open 43-versus-20 tower gap is now explained from the same JSON | appended: the JSON's "world units" are metres (B20 and the scale-bar check below), so "a metre scale" is not missing; 24 of the 38 non-gate ring vertices of the 777001 city lie on the coastline stretch of the exported ring and one is the watergate — 13 land vertices + 2 shore-end posts + 5 castle = 20 (arithmetic CONFIRMED, the two end posts PLAUSIBLE) |
| B06 | CONFIRMED | before/after `calls.json` compared for all six generations: calls and bytes identical, rows 727/402/403/1051→1055/1058→1062/1441→1446, the class moves as tabled; the 321 tsv rows = 56 + 5 + 5 + 82 + 82 + 91; the rule read in `analyze.mjs` is the one described; its predictions confirmed by later captures (`Building.a` → `River.a`, `Elevation.g` → `Farmland.g` in profile-village N0) | none |
| B07 | CONFIRMED | build stamp 19365073 in `meta.json`; 94 segments = 1 540 096 ÷ 16 384; k = 7 knots (`getPos` = `get_tangent` 7, `length` 6, `Cubic.cubic` 42 = 7 × 6, `smoothOpen` 1), `calculateCurvature` 0, `Chaikin.render` 134; no `Random` label in any of the 31 constructor windows; `record.mjs --detailed` read: the three hazards are handled as stated | none |
| B08 | CONFIRMED | palisade identities re-derived on all three seeds (`blocks` = `endBridge` 213/303/230; `getClosestSeg` 15/19/15; `addGate` = `Gate.new` 3/4/3; `overlaps` = `BitMap.check` 1 626/1 134/1 587; `Cubic.cubic` 77/55/77); reproducibility of 19-03-50 against 10-14-02 exact apart from timer counts and the label moves; the stage-order claim is tagged INFERRED and the code reading (27c item 61) confirms it | none; one impact (CONFIDENCE G6's "untaken in 6/6" is superseded by N1's 1 of 19) |
| B09 | CORRECTED | `bentcut_geometry.py` re-run reproduces BG-1 (positions, arrivals ≥ 85° 200/206 …, JJ angles); the two corrections (model units; no ridge stroke) verified against `instrument.js` (raw `lineWidth` recorded, px = w·√|det CTM|); the INFERRED width law's free-end term and "no fillet predictor" are superseded by the code readings | appended: 27c item 40 (the free-end term is a drawing artefact: junction ends extend 0.3 × the crossed width) and item 38 (the fillet rule sin²(δ/2) + cos²(δ/2)·min(1, w/ℓ)); the measured statistics stay the §13.5 targets |
| B10 | CORRECTED | `bentcut_parent_face.py` re-run: 162 bounded, chord within 20° of the minor axis 137/162, corner at mid-course 99/120, discriminator 18 : 6, longest-edge rule 54/162 — refuted as stated; the OBB rule and the mid-course corner agree with the code reading | appended: the split parameter is not a clamped position (`MathUtils.gate`) but the mean of the centroid's fraction and a bell draw (27c item 35); the start side is deterministic (item 36), not a coin |
| B11 | CORRECTED | `bentcut_predict.py` re-run: L0 27 % / 36 %, L1 62 %, L2 88 %, N2 65 %, L3 80 %; the cross-reference to `ng-challenge-under.md` §4.1 holds (its "< 0.1, better side" column reads 101 / 35 / 56) | appended: verdict 3 ("a random draw, not a face property") is half right — the position averages the face centroid's fraction with a bell draw (item 35; 160/162 consistent); verdicts 4 and 5 are explained by the deterministic start (item 36) and the corner-first far side (item 37) |
| B12 | CORRECTED | `bentcut_anchor.py` re-run: f sd 0.099 against g sd 0.252; N(0.5, σ) AIC −301.1 with σ 0.088 (ring 0.098, plain 0.066); R1 107/162; R1 × proj 125 · 102; oracle 142 · 116; the design's §4.6 recipe now carries AN-6's numbers (the queue's "not yet reflected" is closed by MN-3) | appended: AN-6's draws 1–3 are outputs of NG's mechanism, not its mechanism (27c items 35–38); pass c replaces §4.6's generative text and keeps σ, the 53 % and the 66 % as measured targets (item 41) |
| B13 | CONFIRMED | `paths_stats.py --md` re-run: 36 of 36 table rows byte-identical to README-vertices; `instrument.js` applies the CTM current at each path call (`a·x + c·y + e`, `b·x + d·y + f`) and records raw `lineWidth` with the paint-time CTM, as documented; the colour classes are named for what they are (footprints, not lots) | none; one precision note (√|det| is exact for similarity CTMs, which NG's are) |
| B14 | CORRECTED | the four-class inventory, the five layouts, the facet and section identities, "no plot / scale / orientation input", the hand-off history and the lot-driven adaptation all stand and match the later frequencies run and the code reading (27c item 59); one INFERRED sentence is wrong | appended: §2.3 "when square its roof is a pyramid" — the code reading has hip blocks never pyramidal; the pyramids are square towers (as `README-frequencies.md` §2 already reads them); the INFERRED layout shapes are refined by the code (star-shaped closed plans, arcs of 2–7 equal chords, grid snakes) |
| B15 | CONFIRMED | `classify-frequencies.py` re-run on the 41 generations: layouts 8 / 7 / 8 / 9 / 9, towers 15 / 22 / 3 / 1, porches 17 / 14 / 9 / 1, roads 4 / 27 / 9 / 1, 15 buildings off the fixed 32/64 identity, 0 off the section identity, 41/41 sanity counts, dormers 306 (7.46 per building, 1.61 per wing); the `manor` target entry read in `common.mjs` | none |
| B16 | CONFIRMED | `selection.json`: 54 hits, 31 included, 24 excluded; the scraper code read: `archive()` and `archive_post()` return cached results when `post.md` / `post.json` exist, and both indexes merge, so re-runs alter no earlier archive; all five Patreon groups intact (`watabou-extra` 65 kept) | none to the text; two notes appended (the group now holds 33 posts — two Taverns posts added 2026-09-26 by the Dwellings lane; the deferred PM/Dwellings devlogs were archived at 06:42 the same day, index now 92 rows) |
| B17 | CONFIRMED | `length_precision.py` and `edge_modes.py` re-run on both payloads: outputs byte-identical to the stored `.out.txt` (Stage-2 streets 30.25 → 50.25 m, main roads 60.5 → 100.5 m, suburb 30.00 m unchanged); server time re-derived from both network indexes (PUT → layout OPTIONS 2.90 s on 09-25, 3.23 s on 09-21); the design consumes (L + 0.5)/2 at §4.4 and §13.5 and the seconds-scale time at §12 | none |
| B20 | CONFIRMED | `stats.py` re-run from a copy: every table row byte-identical; units settled by a new independent check — the SVG scale bar sits in a screen-space group, and bar px ÷ outer scale = 50.00 / 124.99 / 250.09 / 12.50 map units for 200 / 500 / 1 000 / 50 m, i.e. 4.000 ± 0.001 m per SVG unit, while JSON/SVG = 4.0 on both `roadWidth` and `wallThickness`, so the JSON is in metres (J19 confirmed, J-Fev-1); the design's 40 / 80 / 130 rungs, 1 475 / 5 242 / 13 091 buildings, 9 / 12 / 18 districts, 5 / 8 / 12 gates and 57 / 131 / 156 ms all match the table | none; two notes (the gate law's fit outside the three rungs; the restart census's composition) |

## What was re-derived, and how (the receipts)

Every command below ran in this seat on 2026-09-27; outputs are in the scratchpad `fable-review/` files named.

1. **MFCG call counts (B01, B02, B03).** `calls.json` is a list of `{label, calls, bytes}`; labels were summed per name
   over the twelve default-style and gates files and the 33 style steps (`b01-b02-rederive.txt`, `b03-rederive.txt`). Every
   EG-1 and EG2-1 value quoted in the addenda reproduces, including the secondary identities (`Topology.new` 2 in G0 against 3
   elsewhere; `GeomUtils.converge` 2 725; `Random.save` 3 / `restore` 46 / `float` 69; `Farm.new` 17/17/18/12; `Block.new`
   92/155/130/106). The style headline (128 new `com.watabou.*` labels in 46 classes, 19 classes wholly new) reproduces; the
   earlier-union label count reads 1 629 rather than the addendum's 1 544 only because the N9 capture was relabelled by the
   label fix after the addendum was written (the two `com.watabou.*` extras are `Castle.(anon@284885)` and
   `Markov.(anon@482404)`), which does not touch the headline.
2. **The seed chain (B01).** `s ← s·48271 mod (2³¹ − 1)` from 555001 reaches 2029853968 at k = 585 (EG-3's Enter step) and
   from 777001 reaches 2128702816 at k = 1 242 (the retry os-model §14 quotes as a "reseed"; EG-3 gives 1 239–1 248). The
   os-model rows 1050/1170/1201 are therefore superseded as EG-7 row 8 says; 27c item 51 re-words the design's citation.
3. **The gate midpoint rule and the invariant wall (B01, B02) — a new check.** From the four `s555001-size40-gates*.json`
   exports (`b01-midpoint-check.txt`): every city gate vertex lies 0.000–0.001 m from the midpoint of its two neighbours
   (chords 136–211 m), the castle gate 0.000 m; across N = 0/1/4/9 the non-gate ring vertices and the castle ring coincide to
   0.000 m while each gate vertex moved 1.2–14.1 m onto its chord. The pixel method's "± 1 px" becomes exact geometry.
4. **The restart census (B03, design §5.1 (1)).** Counting `-->> seed`, `Unable to build a canal` and `bad poly` in every
   MFCG `console.jsonl` (`mfcg-restarts.txt`): the design's "24 restarts in 58 recorded attempts", "21 canal restarts",
   "712 rejections" and "8 of 34 cities" reproduce exactly as the census of capture A's three passes (14 attempts, 2 canal
   restarts, 65 discards), capture B counted once (10, 7, 282), capture G's coverage pass (2, 0, 1) and the styles session
   (32 attempts, 12 canal + 3 bad-poly restarts, 364 discards): 58 attempts, 24 restarts, 712 discards, 34 cities. The three
   gates cold loads, the exports session (13 attempts, 2 restarts) and the size sweep session (114 attempts incl. the band
   probe's Enters, 25 restarts) are not in it; over everything recorded on 2026-09-25 the share is 51 of 193 attempts (26 %)
   with B deduplicated. The number is right for its date (J-Fev-2).
5. **The export cross-checks (B05).** `analysis/json_counts.py` and `gates_towers.py` re-run in the export folder
   (`b05-json_counts.txt`, `b05-gates_towers.txt`): identical to the README's rows, including 43 derived against 20 drawn
   towers for the 777001 city.
6. **The tower gap (B05) — a new check.** Point-in-polygon of the 777001 city's 38 non-gate, non-castle ring vertices
   against its `water` polygon (`b05-towers-water.txt`): vertices 18–41 (24 of them) lie exactly on the coastline (distance
   0.0 m to the sea boundary — the exported ring follows the shore, not a straight closure), vertex 9 is on the river
   centreline (the watergate; `drawGate` 9 = 7 + 1 + 1). Land candidates 13 + castle 5 = 18; with towers on the chain's two
   shore-end posts (vertices 18 and 41) 20 = `drawTower`. Arithmetic CONFIRMED; the end posts PLAUSIBLE (no pixel check).
7. **The label fix (B06).** Each `gen-N.calls.pre-labelfix.json` compared with its replacement (`b06-rederive.txt`): total
   calls and bytes equal in 6/6; row counts 727→727, 402→402, 403→403, 1 051→1 055, 1 058→1 062, 1 441→1 446; the class
   totals that moved match the README (`?` and `Date` to 0, `(unattributed)` 1 159 / 311 / 1 810 / 1 381 / 2 467 / 5 281;
   `WellView` 166→3, `Markov` 349→512, `BlockContent` 219→279, `Street` 556→496; `TextEngine` 5 678→7 898, `CloseButton` and
   `DropDownButton` 348→0). The tsv's 321 rows are per function (56 / 5 / 5 / 82 / 82 / 91).
8. **The river (B07).** `10-14-02/coverage/gen-0.calls.json` (`b07-b08-rederive.txt`): `Elevation.dist2segment2`
   1 540 096 = 94 × 16 384; `Cubic.cubic` 42, `smoothOpen` 1, `build` 1, `PathTracker.getPos` 7, `get_tangent` 7, `length` 6,
   `Chaikin.render` 134, `PolyUtils.resample` 36, `River.calculateCurvature` absent; gen-1 (no water) has none of them;
   `river-windows/River.new.seed3131.json` contains no `Random` label. `meta.json` baseUrl carries build 19365073.
9. **The palisade (B08).** `19-04-26/coverage/gen-{0,1,2}.calls.json`: every identity of N2's table reproduces (the receipts
   in the verdict table). 19-03-50 gen-0 against 10-14-02 gen-0: the only differing `village`/`geom`/`utils` labels are
   `Updater.fire` (75 vs 88) and the label-fix moves (`River.a` for `Building.a`; `Farmland.*` for `Elevation.g/(anon@…)`).
10. **The bent cut (B09–B12).** All four scripts re-run from `captures/neighbourhood/` (2.0 s, 3.3 s, 5.6 s, 17.4 s;
    `b09-12-*.txt`). Every headline number quoted in the four addenda reproduces (BG-1 per-map rows; PF-2's 162 / 137 / 99 /
    18 : 6 / 54 / 143; PP-2's 44 / 59 / 101 / 143 / 105 / 130; AN-2's sd 0.099 and the AIC table; AN-3's 107 / 67 / 76 /
    101; AN-5's 125 · 102 and 142 · 116). `bentcut_predict.py`'s L2 coin column reads 134 where the addendum prints 133.5
    (a half-count tie), immaterial.
11. **The vertex recorder (B13).** `python3 profiler/paths_stats.py <the four captures> --md` (`b13-paths_stats.md`): 36 of
    36 table rows appear verbatim in README-vertices.
12. **Fantasy Manor (B14, B15).** `classify-frequencies.py captures/manor/2026-09-25T11-25-38` (`b15-frequencies.txt`):
    N = 41; layouts arc 8 / closed 7 / rect 9 / ring 8 / snake 9; towers 15 / 22 / 3 / 1 and `Tower.new` 15 / 18 / 5 / 3;
    porches 17 / 14 / 9 / 1; roads 4 / 27 / 9 / 1; bays 28 / 13; blocks 16 / 20 / 3 / 2; 15 generations off the fixed 32/64
    facet identity and 0 off the section identity; `reset` = `getPoly` = `Manor.new` = `ManorView.new` = `weighted` = 1 in
    41/41; dormers 306 = 7.46 per building = 1.61 per wing. manor.md §2.3's 3 × 3 system and its five-building table stand.
13. **The manor archive (B16).** `selection.json`: hits 54, included 31, excluded 24, 10 locked posts in the campaign.
    The group directory now holds 33 posts: the 31 plus `158953060` (Taverns and quips, locked) and `159559624` (Taverns
    1.1.0), both written 2026-09-26 18:58 by the Dwellings lane, which also added `research/devlogs/taverns/`; the
    `procgen-mansion` (1 devlog) and `dwellings` (15 devlogs) directories date 2026-09-25 06:42, one minute after the
    README landed, so its "deliberately deferred" item is closed; `research/devlogs/index.json` has 92 rows = 73 + 15 + 1 + 3.
14. **FTG (B17).** `length_precision.py` and `edge_modes.py` on both payloads (`b17-*.txt`): byte-identical to the stored
    outputs. Network indexes: 2026-09-25 PUT → OPTIONS on the settlement at +2.90 s, layout GET at +3.72 s; 2026-09-21 (the
    PUT is in the 05-08-07 session's index) PUT → layout OPTIONS at +3.23 s, GET at +4.27 s.
15. **The size sweep (B20).** `stats.py` copied to the scratchpad and run on the sweep folder (so the capture's `stats.json`
    was not rewritten; mtime unchanged): the thirteen table rows byte-identical to `stats.md`. Units, a new check
    (`b20-units.txt` and the follow-up): the scale-bar path lives in `<g transform="translate(10 1090)">`, a screen-space
    overlay, so its 163.159 / 230.972 / 280.097 / 151.348 px for 200 / 500 / 1 000 / 50 m divided by the outer scale 3.263 /
    1.848 / 1.120 / 12.108 give 50.003 / 124.985 / 250.087 / 12.500 SVG map units — 3.9998 / 4.0005 / 3.9986 / 4.0001 m per
    unit (sizes 40 / 80 / 130 / 5; the 777001 city 3.9991). The JSON's `roadWidth` 8 and `wallThickness` 7.6 against the
    SVG's 2 and 1.9 give 4.0 twice. So 1 SVG unit = 4.00 m and 1 JSON unit = 1.00 m.
16. **The gate law (B20 → design §4.2 S3 (4)).** `docs/validation/bench/fixall_pipeline_mfcg_fits.out`:
    `round(1 + 0.47·√walled_ha)` reproduces 5 / 8 / 12 / 18 at sizes 40 / 80 / 130 / 200 and misses by one at 15, 24, 60,
    120 and 250 (2 vs 3, 3 vs 4, 6 vs 7, 11 vs 12, 22 vs 21). The design claims only the three rungs (true); impact 2 below.

## Row sections

### B01 — MFCG explicit-gates addendum, part 1 (CONFIRMED)

The addendum's evidence is the capture's own files and it says so; every count I checked reproduces (receipt 1), the seed
arithmetic reproduces (receipt 2), and the midpoint rule, which the addendum could measure only to ± 1 px on screenshots, is
exact in the export geometry (receipt 3). The three points the queue asked me to check first:

* **Gate rule.** `drawGate` = city gates + castle gate + watergates holds in the nine coverage runs (5 = 4 + 1 + 0 in G0;
  6 = 4 + 1 + 1 in A2; 9 = 7 + 1 + 1 in B0; 7 = 5 + 1 + 1 in G1c), and the road identity roads = city gates + (castle outside
  ? 1 : 0) holds in the seven runs whose streets succeeded. CONFIRMED.
* **"Retries continue the RNG stream" against os-model §11 / §14 / §15-8.** The retry transition os-model §14 quotes as a
  reseed is 1 242 Lehmer steps from the failed attempt's seed; EG-3's reading is right and os-model's three rows are
  superseded (they are not my files; 27c item 51 already re-words the design's citation and the code reading confirms one
  stream with a save/restore slot and per-cell seeds).
* **Tower-midpoint claim.** Exact (receipt 3). The design does not copy MFCG's midpoint move — its gates are the points where
  solved routes cross the boundary (§4.2 S3 (7)) — so nothing to change.

Consumption: §6.1 / D-15 (keyed sub-streams; "one global stream" rejected — the design took EG-3's hazard as its reason),
§4.2 S3 (4) (the gate law fitted on the sweep, J-P24; EG-1's `≈ 0.8·√size` was not used), §1.4 row "walls, gates, castle"
(`gates = N` exact; a tower on every non-gate vertex). Notes appended to the addendum: (1) after the label fix (B06) the
`Alleys.(anon@284885)` of EG-2's citadel signature reads `Castle.(anon@284885)`; (2) EG-8 (1)'s auto-count fit holds to
size 80 only (the sweep gives 12 at 130 and 18 at 200 where the fit gives 9 and 11; the coded law per 27c item 46 counts
mesh cells); (3) the exact midpoint proof.

### B02 — MFCG explicit-gates addendum, part 2 (CONFIRMED)

Receipts 1 and 3. `towers = 33 − N` is the JSON's 5 castle + (28 − N) city vertices (the export ring has 32 vertices of
which four are castle-shared; the screenshot count of 30 with two shared vertices is the same chain seen without the castle's
own two vertices — both conventions give 33 − N). "Everything after the gate step is re-rolled" is CONFIRMED by the run
data (districts 5/5/9/11, blocks 92/155/130/106, `Random.float` 38/43/69/113) and its mechanism reading is tagged INFERRED;
the design took the hazard into §6.1's per-entity streams (a New random on a block changes that block's plots and nothing
else) and D-15. The 2N + 1 split the addendum tagged INFERRED is the ancestor's arithmetic (CONFIDENCE §0.2 #2). Nothing to
correct.

### B03 — MFCG styles addendum ST-0..ST-12 (CONFIRMED)

Receipt 1 (the style steps) and receipt 4. The queue's four checks: (a) "a bad poly restarts the whole city" — three
`City.hx:156 … bad poly` restarts in the session console, each followed at once by a new attempt; consumed by §5.1 (1) /
D-9 (the restart path removed) and by §1.4's failure-policy row ("whole-city retry incl. wards and geometry (ST-8)"); the
code reading (27c item 51) confirms the retry wraps all nine stages. (b) Tree/forest pipeline — `PoissonPattern.fill` =
`Forester.fillArea` and `validate` = 140 × `validateRect` in every trees step; the design's §8.10 stamps a 140-point-class
tile and builds a crown library of 20 once per session, both from this addendum; 27c item 53 refines the sampler's annulus
and torus (a wrap, which agrees with profile-village N3's `warp` reading). (c) Skeleton roofs — `run` = `drawRoof` 9 222 with
Hip; `addGables` 7 133 of 7 139; the design's §3.8 straight skeleton with the plain-roof downgrade follows ST-3's "a roof that
skips `addGables` is drawn plain". (d) Tints — the in-app default is Spectrum (hue rotation at fixed S and V), Brightness a
value scale, Overlay a hue blend, weathering a ± 10 % per-roof RGB scale; the design's `ink` preset does not copy MFCG's tint
method, so no consumption to check. ST-9's three EG-6 refilings are right. Nothing to correct.

### B04 — MFCG style-options capture + drive.mjs additions (CORRECTED)

`steps/steps.jsonl` holds 83 driver lines and 33 coverage steps; the fifteen options were driven in the order tabled, each
with a toggle step and a regen step (receipt 1 checks their counts). `drive.mjs`'s `--coverage`, `--draw` and `--marker`
are implemented as the header says (precise coverage started before the action and taken when idle; the draw recorder reset
before the action; the marker gates readiness); `record.mjs`, which made every earlier capture, is untouched by these
flags, and `analyze.mjs`'s `steps/`→`session/network` fallback is a lookup only. The README's hazard (the persistent
profile left in a non-default style) was acted on: the exports README records the profile deleted before its run. Three
README readings were corrected by the styles addendum itself (ST-10 rows 10–12) without the README saying so; the appended
section names them. The union count 1 544 is the pre-label-fix figure (receipt 1).

### B05 — MFCG export geometry (SVG/JSON) + export tool (CORRECTED)

Receipts 5 and 6; `export.mjs` read whole (two capture paths — CDP downloads and an in-page Blob hook — with sha1 equality
logged; the later Dwellings flags leave the MFCG path unchanged). Schema reading: the thirteen-or-fourteen features, unclosed
rings, no holes, one winding, `buildings` + `prisms` = roofs + solids — all reproduced. The README's units: it calls the
coordinates "world units" and lists "a metre scale" as absent; the sweep lane (B20) and my scale-bar check (receipt 15) show
the JSON is in metres, so the README's cross-check numbers (footprints 47–7 427 "world units²", extents ± 3.4 km) are m² and
metres — appended. The open tower count is closed as far as the JSON allows (receipt 6). Suitability as a parity source: the
design's §13.5 anchors (district areas, wall vertex spacing p50 88 m at size 40 = 2 828 m ÷ 32, castle 0.5–3.2 ha, plaza),
the gate law and the §12 speed table all rest on these exports and the sweep; the block layer is absent as the README says.

### B06 — Profiler label-attribution fix (CONFIRMED)

Receipt 7. The fix in `analyze.mjs` is the one described: class ranges start at the constructor (`Var = function` before the
`__name__` marker), code outside `[first constructor, first core-type registration)` is `(unattributed)`, a name match
counts only between the class's neighbouring markers, dotted names also in the static initialisers up to `ApplicationMain.main()`.
Only labels changed. Which findings' class tables shift: the README's table is right and its predictions were later confirmed
in the village captures analysed after the fix (B07 P1's `Building.a` → `River.a`; `Elevation.g` → `Farmland.g`, B08 N0).
Captures not re-analysed keep old labels; profile-mfcg EG-2's `Alleys.(anon@284885)` is one (noted under B01). The two
deferred items (static-initialiser closures; Haxe enums) are documented where they will be found.

### B07 — Village river-course addendum, part 2 + `--detailed` (CONFIRMED)

Receipt 8. The version drift is handled as drift (P0) with both builds' facts kept apart (P6). The river construction for
19365073 — a 3-point skeleton Chaikin-cut into 6 points, 6–7 knots along it, a cubic spline at 7 samples per span, a fixed-
step resample to 94/91/84/64 segments, no curvature pass, no `Random` call inside the constructor — is CONFIRMED by counts
and windows; where the seed enters is left open and said to be open. `record.mjs --detailed` keeps coverage on for the pass
and resets counts per generation, enables the debugger with pauses skipped and disables the cache, exactly the three hazards
P5 measured. Build-stamping is in `meta.json` and in every table. Consumption: the village is staged (PART III) and the
design's own river model (§4.2 S1's control knots) is ours; CONFIDENCE §3.2 G2/G3 cite the inlined seed path and knot law as
open — right.

### B08 — Village new-build block-coverage addendum (CONFIRMED)

Receipt 9. Palisade = hull of the populated 10 × 10 lattice samples (19/20/13 kept = `ConvexHull.ofSet`'s second loop),
cleaned, closed cubic spline at 11 samples per span, fixed-step resample, rasterised; consulted on every tracker step
(`blocks` = `endBridge`), hence built before the roads — the addendum tags the order INFERRED and the code reading (27c item
61) confirms it; the design's PART III item 2 already says "a palisade before its roads". Density: one 128² pass in 13/13
with a rare 273-B shoreline arm taken in 1 of 19 runs — CONFIDENCE's G6 row still says "untaken in 6/6 runs" (impact 3).
`warp` = wrapping (W1, INFERRED) agrees with the code reading's torus (27c item 53). Nothing to correct.

### B09 — Neighbourhood bent-cut geometry addendum (CORRECTED)

Receipt 10 (`bentcut_geometry.py`). The measured construction — at most one bend (380 of 519), the bend near the middle
(80 % in 0.40–0.60), right angles (96 % ≥ 85°), bend angle = angle between the crossed roads, the stop at the crossed
corridor edge (803/811 within 0.05 px), cuts ending on earlier cuts — is CONFIRMED and is what §13.5's bent-cut row tests
against. The two corrections (model units, no ridge stroke) are right: `instrument.js` records the raw `lineWidth` and the
paint-time CTM, so the earlier "px" widths were model units. Two INFERRED readings are superseded by the code readings, to be
applied by pass c: the width law's free-end term (27c item 40: junction ends are drawn 0.3 × the crossed width past the cut;
the law is `w_lo + (w_hi − w_lo)·min(1, L/axis)^p`) and "no predictor for fillet versus sharp" (item 38: sharp with
probability `sin²(δ/2) + cos²(δ/2)·min(1, w/ℓ)`, which predicts 209.9 of 378 against the 200 observed). The addendum itself
flagged both as open, so this is a closure, not a refutation.

### B10 — Neighbourhood bent-cut parent-face test (CORRECTED)

Receipt 10 (`bentcut_parent_face.py`). The face reconstruction is sound (512/512 sides consistent, the three slits = the
closed inner bands, every cut midpoint inside its parent). "The OBB chooses the axis, the longest edge does not" and "the
corner goes at the cut's midpoint" stand and agree with the code reading (the start lies on the boundary edge most parallel
to the major axis; the corner at a bell fraction of the first leg's free length, centred). Surviving rule 3's INFERRED
mechanism — a position clamped near the middle by `MathUtils.gate` — is superseded: the position is the mean of the face
centroid's fraction along the major axis and a bell draw, unclamped (27c item 35), and the "coin flip" start side of open
item 1 is deterministic (item 36).

### B11 — Neighbourhood bent-cut prediction test (CORRECTED)

Receipt 10 (`bentcut_predict.py`). The test's logic and numbers stand, and its cross-reference holds: `ng-challenge-under.md`
§4.1's table has a "< 0.1, better side" column reading 45 / 35 / 8 / 2 / 56 / 101, which PP-1's L1 reproduces. Verdict 1
(the face alone does not determine the cut) stands. Verdict 3, "the position is a random draw, not a face property", is
half right: the code reading (item 35) makes it the average of a face property (the centroid's fraction) and a bell draw,
which is why AN-2 found no correlate among aspect, area, depth and rank (the centroid fraction was not among the candidates)
and why the fitted f is centred and bell-shaped. Verdicts 4 and 5 (coin side; 25 % far-side failures) are explained by items
36 and 37 (deterministic start; corner placed first, far side chosen from the corner).

### B12 — Neighbourhood bent-cut anchor test (CORRECTED)

Receipt 10 (`bentcut_anchor.py`). The position law N(0.5, 0.09) (σ 0.066 plain / 0.098 ring), the perpendicular-ray far
side (66 %), the mid-course corner and the `proj` variant's small edge are all reproduced. The design's §4.6 recipe now
carries exactly these numbers (the queue's "NOT yet reflected" is closed by MN-3), and §13.5's bent-cut row quotes them as
targets. Pass c (27c items 33–41) replaces the recipe's generative steps 1–9 with the mechanism read in NG's code and keeps
σ, the 53 % fillet share and the 66 % as measured outputs of that mechanism (item 41); AN-4's finding that half the
perpendicular projection A–F predicts better than equal legs is, in hindsight, the code's corner placement along the first
leg. The appended section records that AN-6's draws 1–3 are outputs, not the mechanism, so the addendum is not read as a
recipe once pass c lands.

### B13 — Neighbourhood vertex recorder + README + analysis scripts (CONFIRMED)

Receipt 11. Coordinate transforms: the recorder applies the CTM current at each path call to every argument (Canvas2D's own
semantics), records arcs and curves as endpoints plus their raw arguments and CTM, stores the paint-time CTM and raw
`lineWidth`, and indexes each record to the `rec.log` entry it paints; `paths_stats.py` converts stroke widths with
`w·√|det m|`, exact for the similarity CTMs NG uses (uniform scale 0.56–1.11 plus translate). Colour classes: roads = the
`#a69e92` strokes; "lots" = the `#222222` w1 outlines on the buildings canvas, which the README says plainly are building
footprints; roofs = the other fills there. The same-seed check against the flag-less capture and the deviation from the
brief (`--regen reload`) are both recorded. The corrections for the findings owner (model units; pen-point subpaths) were
folded into BG-3.

### B14 — Fantasy Manor extraction (CORRECTED)

Read whole (379 lines). The five-layout grammar (`getPoly` → one of `ring` / `closed` / `arc` / `rect` / `snake`, one
`weighted` pick), the Wing-per-segment step, the facet and section identities (receipt 12 extends them to 41 buildings with
2-facet bays and 4-facet pyramids), "no plot / scale / orientation input" (URL probe, `parameters: {}`, fit-to-view) and the
hand-off history are CONFIRMED, and the code reading (27c item 59: one polyline and one wing width as the whole input; five
layouts at equal odds; fixed scale) agrees. One INFERRED sentence is wrong — §2.3 has a square hip block's roof become a
pyramid, where the code reading has hip blocks never pyramidal and the pyramids square towers on blocks (as
`README-frequencies.md` §2 already reads the 4-facet towers). The INFERRED shapes of `closed` / `rect` / `snake` are refined
by the code (star-shaped 4–6-gon closed plans; rectangles; self-avoiding snakes on a 4 × 4 grid; arcs of 2–7 equal chords).
The lot-driven adaptation (§3.3, §9) is INFERRED design and is consumed as such: the design's stage-3 hook (§2.6, line 1249)
cites it, and 27c item 59 keeps our three departures (wings in the collision set, a street-facing main door, metric scale)
and adopts the layout vocabulary as stage 3's path-shape rows.

### B15 — Fantasy Manor captures + frequencies + target (CONFIRMED)

Receipt 12; `common.mjs`'s `manor` entry read (regen `key:Enter`, no marker, with the comment explaining why; the other
targets untouched). Classification rules are the ones tabled and re-checkable from `calls.json` alone; the 32-or-2 porch and
64-or-4 tower split is solved from the facet identity and every count column is classified in 41/41. The per-layout rates
are labelled PLAUSIBLE at n = 7–9, rightly. The capture README's caveat 3 (48 `Date.*`/`?.*` labels) is superseded by B06 as
the label-fix README already says. The 41-generation run answers manor.md §8 questions 1 and 3 as claimed; the code reading
(equal odds) agrees with the χ² result.

### B16 — Fantasy Manor archive + scraper changes (CONFIRMED)

Receipt 13. Post selection: 54 hits, 31 included, 24 excluded with reasons, one locked post recorded as locked and not
bypassed (the owner's clean-room rule respected). Scraper code read whole: `devlog_scrape.py` merges `index.json` by URL and
keeps the richer cached row, `archive()` returns early when `post.md` exists, and the new comment parser walks `<div>` nesting
for depth; `patreon_scrape.py` merges the index by group and reuses `post.json` / `comments.json` when present — so re-runs
alter no earlier archive (CONFIRMED by code), and the five groups on disk are intact. The "0 of 11 comments" regression is
accepted on the lane's stated check (no network in this seat). Two later movements, not errors: the group holds 33 posts
since the Dwellings lane added two Taverns posts on 2026-09-26, and the "deliberately deferred" PM/Dwellings devlogs were
archived at 06:42 on 2026-09-25 (so `manor.md` could read them).

### B17 — FTG roadLength = 100 capture (CONFIRMED)

Receipt 14. `(L + 0.5)/2` for district-stage normal streets (25.25 / 30.25 / 50.25 m) against `L + 0.5` for main roads
(50.5 / 60.5 / 100.5 m), suburb streets at exactly 30.00 m and lot outlines at 14.70 m: reproduced byte for byte. The
"placed segments, not midpoint splits" test covers junction nodes. "Generation ≈ 3–7 s": the PUT is answered in 2.90 s /
3.23 s and the client builds the scene 6.4–7.0 s after the click; the ≈ 300 s figure was the profiler's wait cap, and the
superseded statements are listed by file. Consumption: §4.4 (line 3917: our tables start at (L + 0.5)/2 ≈ 25–30 m), §13.5's
street-runs row (main L + 0.5, district (L + 0.5)/2, suburb 30.00 m, lot outlines 14.70 m), §12's FTG timing paragraph
(server 2.9–3.2 s; the client at 6.4–7.0 s), CONFIDENCE §0.3. 27c item 49 withdraws the lawn-patch "lots" elsewhere but
does not touch this row's street classes.

### B20 — MFCG size-sweep exports (CONFIRMED)

Receipts 15 and 16. The size-class mapping TOWN = 40 / CITY = 80 / METROPOLIS = 130 by building count (1 475 / 5 242 /
13 091 against the §12 bands) is consumed at §12's table, §4.2 S3 (4)'s gate law, §4.5's district count and §13.5's
anchors, and every number I cross-read matches the table. Units: the README's argument (road width 8 vs 2; MFP-8's areas;
plausible scale bars) is now backed by an executed, independent measurement — 4.000 ± 0.001 m per SVG map unit from the
scale bar in screen space — so **J19 (the MFCG JSON is metres, only the SVG uses 4 m units) is confirmed, not pending
(J-Fev-1)**, and the redteam-mfcg MFP-5 recomputation J19 ordered stands as ordered. Two notes: the gate law's fit outside
the three rungs (receipt 16; impact 2) and the composition of the restart census (receipt 4; impact 4). The README's
"deliberately deferred" band (one seed per size) is a measurement scope note, not a design deferral; §13.5's M-1 calibration
is where the spread is to be measured.

## Judgments (each vetoable; chose X over Y because Z)

* **J-Fev-1 — J19 re-ruled from pending to confirmed.** Chose to confirm the metres reading on the scale-bar measurement
  over leaving J19 "re-rule after the Fable review" because the check is executed, independent of the red team's area
  argument, and holds at five sizes to 0.03 %; the design's metric anchors from the sweep stand.
* **J-Fev-2 — the restart census stands as dated.** Chose to keep "24 restarts in 58 recorded attempts" over correcting it
  to the fuller 51 of 193 because the census reproduces exactly for its date and composition, the design's rule (no restart
  path) does not depend on the share, and 27c item 51 already re-words that sentence; the fuller count is recorded here for
  the calibration seat (impact 4).
* **J-Fev-3 — no blocks from this lane.** Chose to write no block over re-stating pass c's corrections because every design
  consequence of these rows is either already correct in the current text at the cited lines or already a candidate
  amendment of `docs/AMENDMENTS-2026-09-27c.md` (items 33–41, 46, 51, 53, 59, 61); a block here would state each fact twice
  and apply it out of the passes' order (SINGLE SOURCE) — the same reasoning as the sf and manager-corpus lanes.
* **J-Fev-4 — measured statistics stay targets; INFERRED mechanisms are marked superseded.** Chose to append "superseded by
  the code reading" notes to the four bent-cut addenda over leaving them silent because pass c will remove the recipe's
  citations from §4.6 and a reader of the addenda alone would otherwise take AN-6 as the mechanism; the numbers themselves
  remain §13.5's parity targets (item 41).
* **J-Fev-5 — the tower gap is explained, not re-measured.** Chose the point-in-polygon explanation (coastline stretch, one
  watergate, two end posts) with a PLAUSIBLE tag over a pixel re-measurement because the arithmetic closes exactly and the
  design's wall model is already an open chain for coastal traces, so no design text depends on the residual.
* **J-Fev-6 — later movements are not errors.** Chose to record B16's 33 posts and 92 index rows as movements by later lanes
  over marking the README wrong because the README was exact at its landing and the additions are logged in
  `scrape-taverns-dwellings.log` and the directory dates.

## Design impacts

| part | impact |
|---|---|
| pipeline | §4.6 S8's recipe (steps 1–9) currently states the measured recipe of profile-neighbourhood AN-6 / PF-2 / BG-1 — `f ~ N(0.5, σ)`, a coin for the start side, the perpendicular-ray far side with a fallback ladder, a constant 53 % fillet, a free-end width term. The code readings plainly contradict these as mechanisms (27c items 34–40: area-then-extent stop threshold per face, position = mean of the centroid fraction and a bell draw, deterministic start side, corner first and far side from the corner, the fillet predictor, the saturating width law). Pass c applies them; the measured σ, 53 % and 66 % stay §13.5 targets (item 41). |
| pipeline | §4.2 S3 (4)'s gate law `round(1 + 0.47·√A_ha)` reproduces MFCG's 5 / 8 / 12 / 18 gates at sizes 40 / 80 / 130 / 200 and misses by one at sizes 15, 24, 60, 120 and 250 of the same sweep (the fits file). The text's claim is true as written; the M-1 calibration should test the law against the whole sweep, and 27c item 46's coastal factor should be checked on the 777001 city (7 gates at 220 walled ha, where the land law gives 8). |
| scope | `docs/CONFIDENCE.md` §3.2 G6 F still says `createDensity`'s alternative arm is "untaken in 6/6 runs"; profile-village N1 (B08) finds the 273-B arm taken in 1 of 19 runs of build 19365073 — a rare shoreline branch (D2). The rating note should read 1 of 19 and cite N1; the 0.75 rating need not move. |
| determinism | §5.1 (1), §1.4 and §13.5 quote "24 restarts in 58 recorded attempts" (with "712 rejections", "21 canal restarts", "8 of 34 cities" elsewhere). The census is exact for its composition (capture A's three passes, capture B once, capture G's coverage pass, the styles session — all before 2026-09-25 11:00); the gates cold loads, the exports session and the size sweep bring the day's total to 51 restarts in 193 attempts (26 %). Keep the figure as a dated descriptive count; when 27c item 51 re-words the sentence, the editor may add "(2026-09-25 morning census; 26 % over the whole day's recordings)". |
| rendering | MFCG's exported wall ring for a coastal city includes the shoreline stretch (24 of the 777001 city's 48 vertices lie on the coast) and carries no towers there; any §13.5 tower-parity measurement taken from MFCG exports must count only the land chain's vertices (plus its shore-end posts), or the towers-per-vertex target will be wrong for coastal references. |
| scope | Stage 3's digest for implementers must carry the code-read layout vocabulary of 27c item 59 (regular 4/5/6/8-gon rings; star-shaped 4–6-corner closed plans; arcs of 2–7 equal chords; rectangles; grid snakes; pyramids are square towers, hip blocks never pyramidal), not manor.md §2.2–§2.3's INFERRED shapes; the design's `RoofSpec` already separates `hip` from `pyramid`, so no design change. |
| model | The design's B5 row and §1.4 say "a tower on every non-gate vertex" for MFCG; the sweep's derived tower counts (`stats.py`) assume the same and are valid only for dry cities, as the sweep README says. No change; noted so the parity seat does not read the 777001 or the size-200 river-and-coast rows' tower columns. |

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed in this seat):** every re-derivation in receipts 1–16 — the MFCG count tables of B01–B03 from the
calls files; the two Lehmer step counts; the exact gate-midpoint and ring-invariance geometry; the restart census's
composition; the B05 cross-checks and the point-in-polygon census of the 777001 ring; the label-fix before/after equality;
the river and palisade identities and the 19-03-50 reproducibility; the four bent-cut scripts and the paths_stats tables;
the 41-building manor classification; the manor archive's selection and index state; the FTG payload scripts and the PUT
timings from both indexes; the sweep statistics and the scale-bar units at five sizes; the design's consumption at every
cited line (grep and read).

**PLAUSIBLE (reasoning only):** that the two shore-end vertices of the 777001 wall carry the two towers that close the count
to 20 (arithmetic exact, identity not pixel-checked); that the `Alleys.(anon@284885)` closure's move to `Castle` is the only
B01 label the fix would change (the label-fix README lists `PolyUtils`, `CloseButton`, `DropDownButton` and `View` for
MFCG captures too, none of which B01 cites); the B16 "0 of 11 comments" regression (accepted on the lane's check; no network
here); and, as the addenda themselves say, every INFERRED mechanism reading of B01–B03 and B07–B12 that the code readings
(27c) now confirm or supersede — the design must take those from the code readings' restatements, not from these addenda.

**Not done, said plainly:** I did not re-run the styles session's executed-set diff over V8 byte ranges (the label-level
diff reproduces the headline; the byte-range "never executed" lists of EG-6 and ST-9 are accepted on the quoted method); I
did not open any captured bundle (this seat is not the code-readings seat), any screenshot pixel, or anything outside
`/Users/cstokes/Desktop/Maps`; I did not edit the `> PENDING FABLE REVIEW` markers or the queue rows — the brief confines
area reviewers to appended sections, and the reconciler replaces markers and sets `REVIEWED-<verdict>` from the verdict
table above.
