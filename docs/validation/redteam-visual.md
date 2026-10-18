# Red team — VISUAL PARITY AND CRAFT lens against `docs/ARCHITECTURE.md`
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat redteam:visual (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `validation/redteam-visual` · 2026-09-25 · seat: red-team validator (Fable role; opus stand-in), clean-room (no
captured JavaScript bundle opened; no reference code copied; reference screenshots and exports were measured, not reused).

**Status: COMPLETE — 18 findings (0 blocker, 10 major, 8 minor).** §2 is the parseable table (one row per finding, the
`RT_SCHEMA` fields, in the layout of `docs/validation/redteam-geometry.md` §2); §3 gives each failure scenario, its
evidence and the required change; §4 lists what to keep; §5 groups the findings and maps overlaps with
`redteam-mfcg.md` (MFP-n), `redteam-geometry.md` (GEO-n) and the four coverage audits; §6 separates CONFIRMED from
PLAUSIBLE.

**Headline.** The style system is the right shape — one display list, paint programs as data, the recorded draw laws as
a census — but it is specified against the references' *pictures* and not against PLAT's *model*. MFCG's look is made
of exaggerated symbols (walls 7.6 m, towers 15 m across, roads 8 m) on an abstract grid, a four-tone palette in which
gardens equal buildings and trees equal water, and a bitmap cache that exists because MFCG never zooms; PLAT has a
realistic metric model, greenery in most yards, extramural lanes and continuous zoom. None of the translations is
written down: the `ink` preset is still in MFCG's unit (VIS-1), the roles and the contrast test cannot separate what the
plot model now puts side by side (VIS-2), the city band drops the suburb's streets (VIS-3), district labels cannot fit
PLAT's smaller districts (VIS-4), decoration re-rolls at every band (VIS-5) and cached tiles cannot follow zoom (VIS-6).
The `lit` preset cannot be built as specified on either backend (VIS-7), and stage 2's hatched look needs wings,
plot boundaries and a style family that spans the bands (VIS-8 – VIS-10). MFP-1 (redteam-mfcg, blocker) remains the
one blocker in this territory; VIS-1 – VIS-4 are the parts of the city-zoom picture it does not cover, and together
with it they decide the owner's M1 side-by-side.

## §0 Reading record

| file | size | read |
|---|---|---|
| `workflows/lane-prompts/03/redteam_visual.prompt.txt` | 24 KB | in full (the brief) |
| `research/findings/_critic.md` | 42 KB, 478 lines | in full, first (standing ruling) |
| `research/findings/_critic-ftg.md` | 49 KB, 256 lines | in full (F1–F27, §2, 37 spot-checks, §4 payload table, §6) |
| `research/findings/_critic-vg-ng.md` | 37 KB, 226 lines | in full (V1–V27, §2, S1–S29 / P1–P5, §4, §6) |
| `research/findings/_critic-os.md` | 63 KB, 434 lines | outline, plus every rendering row (§1.9 constants 115–127; C7, C8) located by grep; geometry and RNG sections by outline only (outside this lens) |
| `docs/ARCHITECTURE.md` | 245 KB, 2 200 lines | in full, every line (§0–§17, PART II, PART III, D-1–D-25, J-1–J-18, deferrals, Appendix A); line numbers cited below re-checked by grep |
| `docs/validation/redteam-mfcg.md` | 59 KB, 480 lines | header, §0–§2, MFP-1 in full, §4–§6 in full (to build on MFP-1 and not repeat MFP-n) |
| `docs/validation/redteam-geometry.md` | 134 KB | header, §0, §1 and the §2 table layout (`RT_SCHEMA`); GEO-n titles by outline |
| `research/findings/visual-spec.md` | 51 KB, 743 lines | in full, every line (§0–§8) |
| `research/findings/profile-mfcg.md` | 204 KB | §8 (labels), §10.1–§10.6 (drawing record), EG-4 (gate draw, three corrections), Styles addendum ST-0–ST-8 and ST-12 in full; the rest by outline |
| `research/findings/profile-neighbourhood.md` | 204 KB | §3.5–§3.8 (wings, roof rendering and hatching, prism shadows, greens) and BG-3 in full; the rest by outline |
| `research/findings/watabou-extra-b.md` | 83 KB | T4 (gable skeleton) and T5 (NG "fake" gables) in full, located by grep |
| `research/findings/manor.md` | 60 KB | the render and shadow passages (lines 53–99, 285–312, 365–376) located by grep |
| `research/findings/ftg-posts-c.md` | 87 KB | §2.13 (water classification, depth, foam, texture) in full |
| `research/findings/ftg-payload-visual.md` | 74 KB | §8.1–§8.3 (Sept-2026 palette, terrain, roads; lines 755–812) in full |
| `docs/IMPROVEMENTS.md` | 193 KB | O12 in full (answers, design idea, acceptance, restraint); "relief tier" lines by grep |
| `docs/validation/coverage-audit-mfcg.md` | 122 KB | §2 summary and rows J01–J05, K01–K17 in full |
| `docs/validation/coverage-audit-ftg.md` | 163 KB | rows K01–K21 and L01–L09 in full; D rows by title |
| `docs/validation/coverage-audit-ng-shared.md` | 87 KB | rows VS01–VS37, §3–§6 in full; N rows on buildings, roofs, shadows, trees and streets by grep |
| `docs/validation/coverage-audit-vg.md` | 99 KB | §2.3–§2.4 and §3.12 (rendering rows VN-141–VN-156) in full; VN-029, VN-031 by grep |
| `captures/mfcg/exports-2026-09-25/README.md` | 15 KB | in full (JSON `values`, SVG structure, cross-checks) |
| `captures/mfcg/2026-09-25T10-38-58/README.md` | — | method and options table (what each step drove) |
| `docs/FABLE-REVIEW-QUEUE.md`, `docs/lane-events.log` | — | in full (resume check; row format) |

**Screenshots opened** (all 1500 × 1100, downscaled contact sheets plus native-resolution crops): MFCG styles capture
`steps/047` (Lots, Vivid, straight labels), `049` (Complex, same city), `051` (Block); FTG
`2026-09-21T05-23-58/steps/001`, `002`, `004`, `006`; NG `2026-09-21T05-38-59/draw/gen-0.png` (crop); VG
`2026-09-21T05-04-05/draw/gen-0.png` (crop).

**Not read** (outside this lens or carried by a critic or audit read above): the other findings files (`mfcg-posts-a/b`,
`mfcg-devlogs-a/b`, `os-*`, `profile-village`, `vg-posts-a/b`, `vg-ng-devlogs`, `ftg-posts-a/b`, `ftg-docs-params`,
`watabou-extra-a`), the rest of `manor.md`, `profile-mfcg.md` and `profile-neighbourhood.md`, `docs/CONFIDENCE.md`,
`docs/confidence/*`, `docs/improvements/*`, the design proposals and judges, and the `*.draw.json` files themselves
(their content reached this seat through `visual-spec.md` and the profile files). Reading total ≈ 210 k tokens, under
the 350 k switch point; nothing was skimmed silently.

**Executed by this seat** (our own Python + PIL in the session scratchpad; each reads only screenshots or published
colour values — no bundle, no reference source). The scratchpad is not kept, so each rule is stated for rerun; results
are quoted below as "EXP".

| script → output | rule | result used |
|---|---|---|
| `mfcg_cover.py` | window x 660–940, y 720–940 of MFCG styles steps 047 (Lots) and 049 (Complex, the same city re-rendered) and 051 (Block, a different city); pixels classified as paper (L1 ≤ 45 from `#FFF2C8`), water, tree or figure; 3-4 chamfer distance for void widths | paper share of land **0.246 (Lots) → 0.311 (Complex)**, figure 0.754 → 0.689 on the same city; Block (other city) 0.249 |
| `lab.py` | sRGB → CIELAB (D65), ΔE76, for palette pairs published in the findings | MFCG default green `#A59F93` vs roof `#A5A095`: **ΔE 0.8** (L* 65.7 / 66.0); tree vs water `#7F7A71`: **ΔE 0.0**; FTG paving `#C6C2BB` vs settled ground `#BCB8B2`: ΔE 3.7 (L* 78.6 / 74.9), paving vs in-town lawn `#ADB69D`: 12.4; NG paper vs street stripe: 14.0; NG green vs street: **11.9 at ΔL* 1.5** |
| tone mask + profile | FTG `006-street-level.png`, pixels within L1 ≤ 6 of `#C6C2BB` / `#BCB8B2` in x 800–1200, y 380–680; row 500, x 985–1024 | the two tones cover 17 % of the crop; row 500 shows an 8-px `#C6C2BB` street run ending in a `#BBB7B2` rim and shading before the next building |

## §1 Lens, method, severity rule

**Lens (from the brief).** VISUAL PARITY AND CRAFT: can the style system reproduce the looks the staged scope requires —
for the BASE, MFCG's ink-and-flat look with curved labels, FTG's textures, lighting, shore foam, field hedgerows, and
LOD; for STAGE 2, NG's hatched roofs with ridges, shadows and courtyards; VG's relief, contours, water bands, tree
crowns and furrows only as a not-precluded check — and would the claimed visual improvements reduce legibility.

**Method.** Every finding is a concrete input or state → a wrong picture, a missed budget, an uncovered capability or an
unmeasurable claim, with the ARCH section and line that specifies the failing mechanism, the evidence (recorded draw
laws, screenshots and exports through the findings files, this seat's measurements, or arithmetic shown inline), and the
specific change required. Where a coverage audit judged a row COVERED, the finding says why the coverage is illusory;
rows already marked PARTIAL or MISSING are cited, not repeated. Base items rank first; VIS-9 and VIS-10 are stage-2
readiness items; VIS-12 carries the VG not-precluded check.

**Severity.** *blocker* — a goal the document states cannot be met by the mechanism as written, the failure shows in
what the owner judges (the one-click default or a stage side-by-side), and no implementer could fix it by choosing a
value the design leaves open; *major* — will bite in normal use or at a stage acceptance and needs a design change to a
program, a table, an interface or a stage (this includes stated goals that fail only because a mechanism is missing or
contradictory but has a contained repair); *minor* — a local defect or under-specification with a cheap fix. Under this
rule no finding here is a new blocker: MFP-1 (redteam-mfcg) already holds the blocker for the city-zoom picture, and
the findings that compound it (VIS-1 – VIS-4) each have a contained repair.

**Evidence classes.** ARCH text quoted by section and line is CONFIRMED as what the design says. Reference behaviour is
CONFIRMED where a findings passage read by this seat records it (cited by file and section). EXP numbers are CONFIRMED
as executed measurements of the references' output. View-scale and pixel arithmetic is shown inline and CONFIRMED as
arithmetic; its consequence for a PLAT town is PLAUSIBLE until M1 renders one (§6).

## §2 Findings table (machine-parseable; one row per finding)

Columns match the workflow's `RT_SCHEMA` (`id`, `severity`, `claim`, `evidence`, `required_change`), in the layout of
`docs/validation/redteam-geometry.md` §2. Each row stands alone; §3 carries the full failure scenario per id. No row
repeats an MFP-n or GEO-n finding or a coverage-audit row; overlaps are cited by id (§5).

| id | severity | claim | evidence | required change |
|---|---|---|---|---|
| VIS-1 | major | The `ink` preset is written in MFCG's internal unit ("wall 1.9 u", "offset ≈ (+0.25, +0.7) u"), which PLAT does not have (read as metres, the numbers are a quarter of MFCG's drawn sizes), and there is no symbolisation law from PLAT's realistic model to drawn symbols. Drawn at model width, the 2–3 m wall band is a third of MFCG's weight (1.6–2.4 px against 6.2 px at MFCG's size-40 view scale; 0.56 px against 1.7 px at its size-80 scale, under the 2-px floor) and towers and gate blocks have no size; drawn at MFCG's 7.6 m over a 2.5 m band, the symbol overhangs an unspecified setback onto plots. At CITY and METROPOLIS frame zoom 0.5-px paper hairlines take ≈ 39 % and ≈ 58 % of a 10.3 m house's pixels — MFCG's own size-80 "outlines swamp" weakness — and the 1.4-px METROPOLIS house breaks O12 (a)'s floor with no rule for meeting it. | ARCH §8.2 l. 1354 (ink in u), §2.1 and §1.7 data row (every length carries a unit), §4.8 l. 903 (wall 2–3 m), §2.7 `Tower.radiusCm` (no rule), §8.5 l. 1390–1391 (min symbol ≥ 2 px), O12 (a) l. 1879. MFCG export `values`: roadWidth 8, wallThickness 7.6, towerRadius 7.6, planks 4.8 (exports README; metres per redteam-mfcg EXP, 1 u = 4.00 m); SVG `scale(3.263)` for gates4; profile-mfcg EG-4 (wall ≈ 5–6 px, gate = gap + two ≈ 12 × 13 px blocks), §10.3 (outlines in screen px, widths in world units); visual-spec §0.2, §1.3 step 10 (walls after buildings); IMPROVEMENTS O12 answers (size 80: outlines swamp, buildings "read as texture"), O6 restraint (symbol scaling in rendering, never in the model); coverage K04 judged "1.9 u" COVERED, K14 Thin lines. | Add a symbolisation table to every style sheet: per semantic and LOD band, drawn width = clamp(k × model width, minPx, maxPx) or a fixed paper width, units explicit (m or paper px), no "u"; calibrate the ink rows on the MFCG export at matched view scale (wall ≈ 7.6 m-equivalent, tower diameter ≈ 2 × drawn wall, gate = gap + two blocks ≈ 2 × wall width, road core 8 m, pier 4.8 m); exaggeration never enters the model, GeoJSON or VTT; exaggerated walls draw after footprints and the setback band covers half the overhang (or the symbol is clipped); outlines thin then drop by band (an ink "thin lines" row at city LOD); sub-floor footprints go through MFP-1's footprint-mass generalisation; census: drawn wall, tower and road px within ± 15 % of MFCG's at the matched scale, outline share of footprint pixels at city LOD ≤ 25 %. |
| VIS-2 | major | The colour roles and the contrast test cannot keep gardens apart from buildings, trees apart from water, or yards apart from streets. §4.9 puts garden parts on most plots, and the `ink` row allows "four inks on buff paper"; with MFCG-family role values the garden fill is ΔE 0.8 from the building fill, so every planted yard reads as a building filling its plot — the "illusion of buildings" returns through greenery — and woods take the water colour (ΔE 0). The only colour constraint tests luminance between ground, road, building and water, so it passes both collapses and misses hue-separated pairs. | ARCH §8.2 l. 1341–1342 (roles: no ground, yard, garden, court, field or verge), l. 1360 and O12 (f) (luminance, four classes), §4.9 l. 946 (yard planting by class), l. 962 (restraint). MFCG default `colorGreen` `#A59F93` vs `colorRoof` `#A5A095`, `colorTree` = `colorWater` `#7F7A71` (profile-mfcg §10.1; ST-2: forest "the same grey as water"); EXP ΔE 0.8 and 0.0. MFCG's Complex mode (buildings smaller than lots, ST-7): EXP paper share 0.246 → 0.311 on the same city, streets merge with gaps (047 vs 049 crop); default is Lots (ST-0). FTG: paving `#C6C2BB` with a 1-px rim, settled ground `#BCB8B2`, in-town lawn `#ADB69D` (ftg-payload-visual §8.1, visual-spec §4.3; EXP ΔE 3.7 and 12.4; 002 overview: suburb streets pale through green). NG: street stripe ΔE 14.0 from paper, green courts ΔE 11.9 at ΔL* 1.5 (visual-spec §3.2–§3.6). | Add roles `ground` (yard, settled ground), `garden`, `court`, `field`, `verge` (MFP-1 asks for `ground`) with our own ink values; replace the luminance rule by a pairwise matrix with ΔE and ΔL* floors on the pairs that must separate at city zoom (street vs ground, garden vs building, building vs ground, tree vs water, green vs road, wall vs water), checked on rendered city-LOD images in B-ZOOM and on 100 % of random styles; keep the ink family to ≤ 6–8 visible tones without saturated hues (O12 restraint) so the matrix is met by value steps; record MFCG's green = building and tree = water collapses as reference weaknesses not to copy. |
| VIS-3 | major | The city LOD draws only tier-1/2 ways, so the suburb regime's offshoot lanes and cul-de-sacs, the gapped rings' rear lanes and the farmsteads' tracks vanish outside the walls, where no continuous building line makes them read as gaps: the plots the suburb lays "directly along the offshoots" float in paper with no street network at the zoom the owner compares. FTG draws its suburb streets as filled corridors at overview zoom; MFCG avoids the case because its extramural houses sit on drawn roads. | ARCH §8.5 l. 1386–1388 (city band: tier-1/2 ways; intramural alleys as gaps), §4.9 l. 949 (tier 1 = through, primary), §4.4 l. 742 (rear lanes), l. 744 (suburb offshoots as `cul_de_sac` / `lane`, density gaps), §4.9 (farmstead `track`). FTG 002-overview and 001 crops (Greenwood's streets visible at overview zoom); visual-spec §4.4 (filled corridors); profile-mfcg ST-4 (sprawl alleys drawn only with the off-by-default alleys layer, ST-0); redteam-mfcg MFP-6 (suburb regime by default; 50–65 % of a TOWN outside the wall) and EXP ribbon distances (71–85 % within 100 m of a gate road). | Select city-LOD ways by legibility need, not class: every way that is the only access of a plot not fronting a drawn way (suburb offshoots, ribbon back lanes, farm tracks, extramural lanes) is drawn at city LOD with a lane symbol; intramural lanes stay gaps only where a continuous frontage bounds them (MFP-1); B-ZOOM metric: plots at city LOD whose access way is drawn or bounded by continuous frontage ≥ 95 %; include the suburb in the M1 / M2 side-by-sides against FTG's overview. |
| VIS-4 | major | District labels cannot fit inside PLAT's 5–15 ha districts at CITY frame zoom under the ≥ 99 %-inside and protected-feature rules: a 10 ha district is ≈ 69 px across at 4.55 m/px, so a 12-glyph letter-spaced name fits only at ≈ 5–6 px (cap ≈ 4 px), and the F-LABEL ladder sends most names to the legend; METROPOLIS is worse. MFCG keeps its curved labels legible at size 80 with districts of median 29 ha and by letting labels overflow; the "minimum size" F-LABEL tests against is unstated. | ARCH §9 l. 1419–1431 (size ∝ √area within a band, inside ≥ 99 %, protected features), §5.2 F-LABEL l. 1047 ("the minimum size", no value), §13.5 labels row l. 1629, D-19 (district band 5–15 ha); profile-mfcg §8, visual-spec §1.7 (27 px caps, glyph canvases 15–55 px, size ∝ district); coverage-audit-mfcg J02 (2019 labels overflowed their areas), J05 (skeleton labels, small fitted curves); redteam-mfcg EXP district areas (size 80: 17 districts, median 29 ha) and MFP-10 (36–70 labels at MFCG-80 scale); GEO-29 (label fit depends on the text engine). | State the label legibility floor in px (e.g. cap height ≥ 7 px at 1×) and make the ladder respect it before the legend rung; at city LOD label quarters (adjacent districts of one kind merged until the spine fits the floor, named by the grammar) or allow a declared overflow (≤ 20 % of glyph area outside the face, never over a protected feature or another label); acceptance per rung at the default view: ≥ 12 on-map area labels at or above the floor (MFCG size 80 draws 17), 0 protected overlaps, legend fallbacks reported; measured with the bundled font in B-ZOOM. |
| VIS-5 | major | Decoration is keyed "by entity id and LOD band" (§6.1), so tree positions and shapes, scatter, roof detail and hatch phase are re-drawn from a new stream at every band switch: zooming a leafy district from city to neighbourhood makes every tree jump at the district and neighbourhood thresholds (and again on each hysteresis reversal), against O12 (a) and §8.5's "no feature pops more than once". §13.4 tests only the footprint hash. PLAT would re-roll positions as well as shapes — worse than MFCG, whose re-picked crowns are a recorded defect. | ARCH §6.1 l. 1103, §4.9 l. 955 (instances at render from `treeStream`), l. 962 (area fill → crowns → lobed trees by LOD), §8.5 l. 1391, §13.4 l. 1598–1603, O12 (a); profile-mfcg ST-2 (tree positions are model data; crowns re-picked from an un-reset stream on every render, visibly), ST-12 ("make the pick deterministic if re-renders must match; MFCG's does not"); coverage-audit-ng-shared XB32 (tree instances have no export path). | Key decoration by entity id and instance index only, never by band; generate each green entity's instances once at the finest spacing with a stable per-instance rank and let coarser bands draw a deterministic subset (rank ≤ k) or an aggregate fill; crown shape, colour jitter and hatch phase keyed by instance or entity id; evaluate forest edges once in world units; extend B-ZOOM so every decoration instance appears at most once across a city → neighbourhood → city sweep and keeps its position once visible, and an unchanged view re-renders pixel-identically. |
| VIS-6 | major | Canvas2D tiles "re-rasterised only when a district's marks change" cannot follow continuous zoom: paper-unit hairlines and casings change world size at every zoom step, so a cached tile is either bitmap-scaled (hairlines blur to ≈ 1 px or thin to ≈ 0.25 px, casing Δ = 2h lost, screen-space labels no longer match) or every visible district is re-rasterised per step (at MFCG's recorded 170–230 ms per redraw of ≈ 15 k buildings, i.e. 11–15 µs per building, ≈ 50–90 ms for a CITY view and ≈ 130–225 ms for METROPOLIS: 4–20 fps against O12 (b)'s "pan and zoom at ≥ 60 fps"). §12 quietly states "≥ 60 fps pan". MFCG's per-ward cache is why MFCG has no zoom. | ARCH §8.5 l. 1390–1398, §8.2 (paper-unit hairlines), §12 l. 1549 ("≥ 60 fps pan") and its MFCG bar (170–230 ms Canvas replay), O12 (b) (IMPROVEMENTS: "Pan and zoom at ≥ 60 fps"); visual-spec §1.1 (one bitmap per ward), §6 item 3 ("sub-pixel widths matter: MFCG's 0.119 px hairline is the look"); IMPROVEMENTS O12 answers (MFCG: no zoom for "technical reasons"; NG rasterises in 73–111 ms); GEO-28 (per-district tiles break the casing order at seams). | A tile pyramid keyed (district, band, zoom level) at ≤ √2 steps with per-level re-raster budgets (ms per 1 000 buildings) measured at M1; bitmap scaling only transiently within one level during a gesture, re-raster in the worker (OffscreenCanvas) and swap; tile margins ≥ the largest cross-tile effect (shadow length, crown radius, casing width) and one global casing-before-body order (GEO-28); separate zoom fps from pan fps in §12 and B-ZOOM; a hairline-fidelity check at every settled zoom (casing Δ = 2h ± 0.1 px, hairline ≈ 50 % ink). |
| VIS-7 | major | The `lit` preset (D-1's second preset; M2's side-by-side against FTG) is specified as programs the default Canvas2D backend cannot run — normal-mapped canopy and stone shading, and "soft" shadows that need the bitmap filters §8.4 says the design avoids — and a WebGL2 tier that must stay within a pixel threshold of Canvas2D, which caps the lit look at a tonal split. The same WebGL2 tier carries the METROPOLIS first frame but specifies no stroke tessellation for MFCG's round-joined sub-pixel hairlines. PLAT's own texture set (FTG's is creative content) has no list, format or budget. | ARCH §8.2 l. 1339 ("WebGL2 with a Canvas2D tonal-split approximation"), l. 1355 (lit: soft drop shadows, depth ramp, foam), §8.4 l. 1379–1381 (FM's cost "avoided by vector offsets, not bitmap filters"), §8.5 l. 1396 (WebGL2: hatch, crowns, SDF text later, pixel test against Canvas2D), O12 (c), §12 METROPOLIS row (WebGL2 tier), §16 M2 l. 1919, §17 (no reference textures), D-1. visual-spec §4.1–§4.4 (three.js, per-vertex colour, normals, `sphere_normal`, `tall_stone_normal`, `circle_alpha`, `edges_alpha`, directional light); ftg-posts-c §2.13 (depth and foam as distance-from-shore functions in the water shader); manor.md (FM's soft shadow = 11–15 bitmap passes, ≈ 90 % of render); coverage-audit-ftg K04 (soft shadows judged COVERED), K07; coverage-audit-ng-shared VS27 (no crop attribute). | Declare a reference backend per preset (ink → Canvas2D, lit → WebGL2) and scope the cross-backend pixel test to one preset with a declared degradation list (lit on Canvas2D: hard offset shadows, two-tone faces, no normal maps); specify the WebGL2 pipeline both uses need: stroke tessellation with round joins and caps and coverage-correct sub-pixel widths (the ink census must pass on WebGL2), per-face roof normals from the skeleton, normal-mapped canopy and stone shading with one directional light, soft shadows as a per-tile shadow mask blurred once (or alpha-mask quads), water depth and foam from a shoreline distance field; add `penumbraPx` to `shadowPass`; list PLAT's own texture set with provenance, resolution and tiling and cost it in M2; add the crop attribute VS27 asks for. |
| VIS-8 | major | Plot boundaries carry no walls, fences, hedges or gates: the edge types are `plot_line`, `party_wall` and `invisible`, yards are areas, and the compound's "gate on the access edge" has no geometry. At district LOD every detached, compound, hovel, vacant or garden frontage is an open yard edge — once MFP-1 tones yards, the street edge there is a tone step only; a compound's court cannot be told from a public square or the neighbour's yard; NG's walled manor compounds cannot be drawn; VTT scenes lack every yard wall. FTG shows the symbology risk: its fenced yards "read as broken buildings". | ARCH §2.4 l. 359, §2.5 l. 375 (yard parts), §4.7 S11 l. 882–889 (arrangements; "a gate on the access edge"), §8.5 district band, §11 VTT row, O17 (d); profile-neighbourhood §3.8 (manor groves fill "its entire walled plot"); coverage-audit-ng-shared N27 (manor enclosure wall not modelled; L, stage 2); coverage-audit-ftg D06 (FTG walls and fences drawn with road controls); IMPROVEMENTS O12 answers (FTG: "fenced yards read as broken buildings"); coverage-audit-vg VN-154 (VG fences and hedges between plots); NG crop (continuous rows around green courts keep the street edge). | Add a boundary treatment to plot edges (frontage, side, rear) — none, fence, hedge, wall or railing, with gate openings on access edges — chosen by the site-plan table by class, prosperity band and arrangement (calibratable data rows); draw it at district LOD as a stroke distinct from buildings (never filled, weight ≤ ½ the building outline, gaps at gates); count walled or fenced frontage toward O17 (d) streetwall continuity; export walls and fences to VTT and GeoJSON; NG's manor wall uses the same field. |
| VIS-9 | major | The style families are not defined across the four LOD bands: `ink` covers city and district items, `hatched` is "the stage-2 close-up tier", and §8.5 defines the neighbourhood band in NG's own terms. A default-ink user who opens a district gets either the ink city drawing magnified — MFCG's District View weakness ("drawn exactly in the same way … often looks disjointed") — or a switch to `hatched`, where the palette and line idiom jump from grey print to brown hatched roofs at one threshold, contradicting PART II's "a closer level of detail of the same picture". `lit` has no close-up band either. | ARCH §8.2 l. 1354–1356, §8.5 l. 1386–1389 (neighbourhood band = NG-class content), §8.6 l. 1402 and II.4 l. 2059 ("the hatched preset at neighbourhood LOD"), §14 `StyleSheet` (per-band order, programs, budgets), PART II l. 1992; IMPROVEMENTS O12 answers (MFCG District View, 101942512); visual-spec §1.4 vs §3.4 (flat grey roofs vs two-tone brown roofs with ink ticks); profile-mfcg ST-3 (MFCG's own close-up: per-footprint ridge hairlines on flat roofs). | Every shipped family defines all four bands with invariant colour roles — detail is added, roles are never remapped: `ink` at neighbourhood LOD = an ink-family close-up (MFCG's Hip/Gable ridge hairlines, NG-style tapered ticks in the ink role on the roof colour, prism shadows at an ink alpha, cobbles as ink stipple); `hatched` and `lit` define their city bands too; additive detail cross-faded over the hysteresis interval; B-ZOOM role-continuity check (mean roof and ground colour ΔE < 2 across each band switch in a family); the stage-2 side-by-side against NG uses `hatched` with an ink close-up alongside. |
| VIS-10 | major | Single-wing L/T footprints and model-fixed roof kinds cannot produce NG's per-wing "fake" gables, its two-tone law or its hatching. NG draws every wing as a rectangle with a ridge on its long axis, cuts the roof into two slopes along it and hatches across each slope; PLAT stores an L/T as "a single-wing composition" with one `ridgeAxis`, so the hatched preset either splits an L by one ridge line (the cross arm gets a lengthwise split and hatching) or draws a hip-and-valley skeleton NG never draws, with no rule for which faces are lit. Roof construction follows the model's `roof.kind`, so changing preset cannot change it; the derived-roof cache has no construction key. | ARCH §2.6 l. 419–423 (L/T "single-wing composition", one `roof` per building), §4.7 l. 893–894 (roof kind by class: skeleton hip or gable), §8.5 l. 1398 (derived roofs cached by entity id), §8.2 l. 1356 (`roof`, `hatch(ridge)`); profile-neighbourhood §3.5 (Building 779 ≈ Wing 787, `Rect.ofPoly` = OBB, `getRidge`, `swapAxes` ≈ 36 %), §3.6 (`hatchRoof` = cut by the ridge, ≈ 8.5 chords × 2 triangles; dark = lit × lerp(ambience, shadow, 0.4)), BG-3 (no ridge stroked); watabou-extra-b T5 ("fake" gables preferred by eye; a style parameter, not correctness), T4; profile-mfcg ST-3 (per-footprint skeleton; gable via `addGables`; failure → plain); coverage-audit-ng-shared N28, N29, N35. | Store wings in the base: every non-rectangular outline-builder footprint is a set of rectangular wings (L = 2, T = 2–3), each with ridge axis, heights and roof kind, the footprint their union (footprint hash unchanged at city LOD); make roof construction a style-sheet parameter (plain, skeleton-hip, skeleton-gable, fake-gable-per-wing) over the stored wings, with the derived-roof cache keyed by (entity, construction); define two-tone assignment for any face set (lit when the face normal faces the light, NG's multiplier otherwise); census: roofs per wing, hatch triangles per wing 15–20, no ridge stroke, footprint-only outline (N35). |
| VIS-11 | minor | The F-SKELETON roof downgrade "hip-from-OBB" draws hip lines from OBB corners that lie outside a non-rectangular footprint and cross its edges — a visual surprise the ladder claims to exclude; MFCG draws a roof whose gable pass fails plain. | ARCH §5.2 F-SKELETON l. 1046, §5.1 tier 4, §13.1 l. 1575 ("never a crash and never a visual surprise"); profile-mfcg ST-3, ST-12 ("drawn plain, not hipped"). | Downgrade roofs to plain (no ridge lines), or clip the OBB hip to the footprint and drop sub-pixel lines; a ladder-coverage fixture renders the downgrade and asserts no roof line outside its footprint. |
| VIS-12 | minor | The display list has no raster mark, so the base should-have relief tier (hillshade), terrain colour ramps and distance-field water effects have nowhere to live: `MarkKind` and `GeomRef` cover faces, chains, point sets and text spines only. VN-031 asks for a hillshade program; a program still needs a raster geometry to run on. | ARCH §8.1 (`MarkKind`, `GeomRef`), §2.3 (terrain is a raster outside the plat), §15.2 "O12 extras (relief tiers …)" → §8.5 (no mechanism); coverage-audit-vg VN-031 (hillshade MISSING, medium), VN-029 (relief marks PARTIAL), §5 conflict note; visual-spec §2.3, §7 item 4 (VG beach band from a raster pass); ftg-posts-c §2.13 (FTG depth and foam as distance fields). | Add a `field` mark kind with a raster `GeomRef` (world-space grid, resolution per band, value → colour ramp or light) so hillshade, FTG's depth ramp and VG's beach band are data; zero cost when unused. |
| VIS-13 | minor | Shore treatments vary per shore segment in the references — FTG's foam on the open sea, weaker on rivers, none in the sheltered harbour; beach, pebble and cliff strips — but the display list strokes the water face's outline uniformly, so foam lands on quays and inside the harbour basin and cliffs are painted as beach, although the model already types `bankKinds` per shore segment. | ARCH §2.3 (`bankKinds` per shore segment), §4.2 S1 (7), §8.2 `bands(...)` over the face, l. 1355 (lit: "water depth ramp and foam line"); ftg-posts-c §2.13 (ocean foam, weaker river foam, heuristic ocean vs river); ftg-payload-visual §8.1–§8.2 (harbour a distinct tone; foam exactly on the waterline; beach strip); visual-spec §4.2 (`pebble_beach`, `cliff`), §4.4. | S14 emits shore chains per bank segment with `bankKind`, `waterKind` and `exposure` attributes; foam, beach, cliff and quay programs select on them; census: foam on 0 % of quay and harbour segments. |
| VIS-14 | minor | Avenue trees along tier-1 ways cover the casings of the town's most important streets at city zoom: the avenue rule plants crowns 8–12 m apart on both sides of through and primary ways, trees draw after roads, and the city-LOD restraint (area fill → crowns → lobed trees) says nothing about line greenery — 6–10 m crowns are 1.5–2 px blobs on each kerb at 4.55 m/px. | ARCH §4.9 l. 949 (avenues), l. 955 (crown diameters "consistent with building sizes"), l. 962 (restraint); profile-mfcg ST-2 (trees after wards and fields, before walls; never on roads in the screenshots), coverage-audit-mfcg K16. | At city LOD draw avenues as a thin green edge line inside the corridor, or not at all, never as crowns over a casing; B-ZOOM check: no tree mark covers a tier-1/2 casing at city LOD. |
| VIS-15 | minor | The label halo is the paper role; once MFP-1 gives blocks a ground tone, and over water, forest or fields, a paper halo prints light blotches around every glyph. MFCG's paper halo works only because its paper is also its road and ground. | ARCH §9 l. 1422 ("halo in the paper role"), §8.2 `halo(text, paper, px)`; visual-spec §1.2 (paper = road = ground in MFCG), §1.7 (≈ 2 px paper halo), §4.5 (FTG cream halo plus drop shadow); redteam-mfcg MFP-1 (a) (ground role). | Halo role = the local background role under the glyph (sampled along the spine), or a knock-out that restores the underlying fills; checked with VIS-2's contrast matrix. |
| VIS-16 | minor | The draw-style census's "layer order equal to the recorded order" is undefined once PLAT draws semantics the references never drew (yards, gardens, courts, boundary treatments, avenues, hedgerows, shadows, street labels), and the census omits NG's measured "no ridge stroke; outline = footprint only". | ARCH §8.3 l. 1371, §13.5 draw-style row; coverage-audit-mfcg K16 (no tree slot in the shipped MFCG order); coverage-audit-ng-shared §6 item 6 and N35; profile-neighbourhood BG-3. | Define order parity as "the recorded order is a subsequence of the preset's order and each added semantic sits at a declared slot with a reason"; add N35's two checks and MFCG's walls-after-buildings rule to the census. |
| VIS-17 | minor | The sky layer has no occlusion policy: an island drawn above the town hides the district beneath it in the top-down view (an island of neighbourhood size covers a 5–15 ha district), and no rule places islands relative to ground features or shows the covered ground. | ARCH §2.1 l. 267–276 (layers), §8.4 l. 1376 ("sky marks (islands) render above"), D-19 (district band), owner CITY ADD-ON LAYERS (one to three islands over the city, casting shadows, a palace "overlooking the land"). | As part of the hook: a per-layer occlusion mode (opaque, ghost the covered ground at x %, offset view) and a placement rule that reads the ground plan (over water, fields or outskirts by default; over the core only by assignment). |
| VIS-18 | minor | SVG export has no size budget or instance aggregation at METROPOLIS scale: MFCG's size-80 SVG is already 6.3 MB for 15 392 buildings with no trees, while PLAT adds up to 200 k tree `<use>` instances, hedgerows and furrows; O11 (h) "opens in Inkscape / Illustrator with layers intact" is untested at that scale. | ARCH §11 SVG row l. 1513, §12 (200 k trees), O11 (h); exports README (size-80 SVG 6 297 685 B, 15 392 buildings, trees off); coverage-audit-ftg K18 (FTG simplifies trees in SVG). | An SVG size budget per rung with tree and hedgerow aggregation at city LOD (one path per green entity) and a scripted Inkscape open-time check in O11 (h). |

**Counts:** 18 findings — 0 blocker, 10 major, 8 minor.

## §3 Findings in detail (failure scenario → evidence → required change)

"EXP" = this seat's executed measurements (§0). View scales used throughout: MFCG size 40 = the gates4 export's SVG
`scale(3.263)` px per internal unit at 4.00 m per unit (redteam-mfcg EXP) = **0.816 px/m**; MFCG size 80 = hairline
t = 0.556 ⇒ s = 0.5 / t = 0.899 px/unit = **0.225 px/m** (profile-mfcg §10.3); PLAT frame fits on MFCG's 1 500 × 1 100
canvas (the framing rule is unstated, coverage-audit-mfcg A06; a square frame fits the 1 100-px height): TOWN 2 km ⇒
**1.82 m/px**, CITY 5 km ⇒ **4.55 m/px**, METROPOLIS 8 km ⇒ **7.27 m/px**. ARCH line numbers refer to
`docs/ARCHITECTURE.md` as read.

### VIS-1 · major · The `ink` preset is written in MFCG's unit, and nothing maps PLAT's realistic model to drawn symbols

**Failure scenario.** One-click TOWN and CITY, default `ink`. ARCH states the MFCG look as "wall 1.9 u with round towers
and gate bars", "ink drop shadow under buildings offset ≈ (+0.25, +0.7) u", "hairline `h = 0.5 px`" (§8.2, l. 1354).
PLAT has no "u": every model length is integer centimetres, a lint refuses a length without a unit suffix (§2.1), and
every table cell is `{value, unit, provenance, calibratable}` (§1.7) — the preset's numbers cannot even be written into
a style file. (Read "u" instead as PLAT's world unit, the metre, and the preset draws a 1.9 m wall with a 0.7 m shadow
offset — a quarter of MFCG's drawn wall and thinner than PLAT's own 2–3 m band; either reading fails.) What the model does have is realistic: a wall band "thickness by era 2–3 m" (§4.8, l. 903), a tower
radius with no rule (§2.7), gates as junctions with plazas and no block symbol (§4.8). MFCG's drawn sizes, in the metres
of its own export, are exaggerated symbols: `wallThickness` 7.6, `towerRadius` 7.6 (towers 15.2 m across), `roadWidth`
8, piers 4.8 (exports README `values`). The implementer has three choices, and each breaks something:

| view (m per px) | MFCG wall 7.6 m | PLAT wall band 2–3 m | MFCG tower ⌀ 15.2 m | a 10.3 m house | outline share of that house (0.5-px hairline) |
|---|---|---|---|---|---|
| MFCG size 40 (1.23) | 6.2 px (EG-4: ≈ 5–6 px measured) | 1.6–2.4 px | 12.4 px | 8.4 px | 11 % |
| PLAT TOWN frame (1.82) | 4.2 px | 1.1–1.6 px | 8.4 px | 5.7 px | 17 % |
| MFCG size 80 (4.45) | 1.7 px | 0.45–0.67 px | 3.4 px | 2.3 px | 39 % |
| PLAT CITY frame (4.55) | 1.7 px | 0.44–0.66 px | 3.3 px | 2.3 px | 39 % |
| PLAT METROPOLIS frame (7.27) | 1.0 px | 0.28–0.41 px | 2.1 px | 1.4 px | 58 % |

(Outline share = 1 − ((a − 0.5)/a)² for a house a px wide with a 0.5-px hairline centred on its edge; 10.3 m is FTG's
median quad side, §13.5.)

1. **Draw model widths.** The wall reads at a third of MFCG's weight at every scale and falls under the 2-px floor of
   §8.5 / O12 (a) at CITY and METROPOLIS; towers shrink to whatever the unstated radius rule yields; MFCG's gate — a gap
   in the wall stroke flanked by two ≈ 12 × 13 px blocks against a ≈ 5–6 px wall (EG-4) — has no geometry to draw. The
   wall, its towers and its gates are, with the curved labels, the most legible elements of an MFCG map.
2. **Draw MFCG's widths over the realistic model.** A 7.6 m symbol on a 2.5 m band overhangs by ≈ 2.5 m on each side,
   onto a setback band whose width is not stated and which is not a hard invariant (MFP-9) — i.e. onto the first row of
   plots. MFCG hides the same overhang by drawing walls after buildings ("buildings tuck under the wall", visual-spec
   §1.3 step 10); ARCH's order-as-data allows that but no rule requires it or sizes the setback to the symbol.
3. **At city zoom the hairline wins.** At the CITY frame a house is ≈ 2.3 px and 39 % of its pixels are outline; at the
   METROPOLIS frame 1.4 px and 58 %. This is exactly the MFCG size-80 weakness IMPROVEMENTS O12 records ("outline width in
   screen pixels while features scale, so at size 80 outlines swamp streets and buildings 'read as texture'"), which MFCG
   answers only with a user option (Thin lines, coverage K14). The 1.4-px METROPOLIS house also breaks O12 (a)'s
   "minimum drawn feature ≥ 2 px" while §8.1 forbids any change of footprint geometry; nothing says how the floor is met
   (enlarge, merge, drop). MFP-1 (b) asks for a "footprint masses" generalisation for the same zoom; this finding adds
   that strokes and symbols need the same law.

**Evidence.** ARCH §8.2 l. 1354; §2.1; §1.7 data row; §4.8 l. 903; §2.7 `Tower`; §8.5 l. 1390–1391; O12 (a) l. 1879.
`captures/mfcg/exports-2026-09-25/README.md` (JSON `values`; gates4 SVG `scale(3.263)`); redteam-mfcg §0 EXP (1 unit =
4.00 m; the GeoJSON is in metres); `profile-mfcg.md` EG-4 (gate blocks, wall and passage widths in px), §10.3 (outline
width t in screen px, grows with map size, while street and river widths scale with the map); `visual-spec.md` §0.2
(road 2.0 u, bridge 2.0 u, pier 1.2 u, wall 1.9 u; "1.9 however behaves as a world width"), §1.3; IMPROVEMENTS O12
answers and O6 restraint ("solve legibility in rendering (O12 symbol scaling), never by distorting the model"). Coverage
row K04 judged the wall COVERED on the strength of "wall 1.9 u"; this finding shows that the unit behind that phrase is
undefined in PLAT.

**Required change.**
* A **symbolisation table** in every style sheet: per semantic and LOD band, drawn width = clamp(k × model width, minPx,
  maxPx), or a fixed paper width, with units explicit (m or paper px). No "u" anywhere.
* The `ink` rows calibrated on the MFCG export at matched view scale: drawn wall ≈ 7.6 m-equivalent at TOWN, tower
  diameter ≈ 2 × the drawn wall, gate = a gap plus two blocks ≈ 2 × the wall width, road core 8 m, pier 4.8 m. The
  exaggeration never enters the model, the GeoJSON or the VTT export (they carry model widths); styled SVG and PNG carry
  symbol widths.
* Exaggerated wall symbols draw after footprints, and the setback band is at least half the overhang (or the symbol is
  clipped to band ⊕ setback) — a stated rule, cross-referenced from §4.8.
* Outlines thin, then drop, by band: an ink "thin lines" row at city LOD for CITY and METROPOLIS.
* Footprints below the floor are drawn through MFP-1's footprint-mass generalisation, never enlarged one by one.
* Census rows (§8.3): drawn wall, tower and road widths within ± 15 % of MFCG's at the matched scale; outline share of
  footprint pixels at city LOD ≤ 25 % (an initial band for the validation lanes to fix).

### VIS-2 · major · Roles and the contrast test cannot separate gardens from buildings, trees from water, or yards from streets

**Failure scenario.** One-click CITY in `ink`, M2 onward (greenery on). The roles are `paper, ink, water, building, roof,
green, tree, wall, road, sand, plank, shadow, ambience, label, light` (§8.2, l. 1341–1342): there is no ground, yard,
garden, court, field or verge role. The greenery rule plants most plots: "row → rear kitchen garden (band ≥ modest) …;
compound → formal or kitchen garden + orchard part; detached → garden; … institution → forecourt / churchyard" (§4.9,
l. 946), plus formal gardens, parks, orchards and churchyards. D-1 asks for the MFCG family, and the `ink` row specifies "four inks on buff paper" (l. 1354) — MFCG's paper, water,
building and ink (visual-spec §1.2) — so a garden, a court or a wood must take one of those four tones unless the preset
is extended. MFCG's own role values collapse exactly the pairs PLAT now puts side by side:

* `colorGreen` `#A59F93` against `colorRoof` `#A5A095`: **ΔE76 0.8**, L* 65.7 against 66.0 (EXP) — below a
  just-noticeable difference. MFCG gets away with it because its greens are rare park wards ("parks … as solid `#a5a095`
  blobs with no building subdivision", visual-spec §1.6). In PLAT a garden in every modest-or-better yard would, at city
  zoom, fill each plot's open ground with a building-coloured patch: the "illusion of buildings" that the PLOT MODEL
  ruling asks the base to design past comes back through the greenery rule.
* `colorTree` = `colorWater` = `#7F7A71`: **ΔE 0.0**; with forests on, MFCG's forest is "the same grey as water in the
  default scheme" (ST-2). PLAT's woodland rings (§4.9) are a base requirement, so an MFCG-valued `tree` role draws the
  hinterland woods as lakes.
* The only colour constraint is "minimum luminance contrast between ground / road / building / water" (§8.2 l. 1360;
  O12 (f)). It tests neither green against building nor tree against water nor yard against street, and luminance alone
  would also misjudge the good pairs: NG's green courts differ from its street stripe by ΔL* 1.5 but ΔE 11.9 (EXP).

MFP-1 already shows that yards and streets share the paper colour and asks for a `ground` role; this finding adds the
garden, tree and field pairs and the test that must catch all of them.

**Evidence (how the references keep these apart, measured).**
* **MFCG's own plot-model analogue loses the streets.** The Complex display mode puts "a smaller building assembled from
  rectangles … with ground between neighbours" in each lot (ST-7) — the closest the reference comes to PLAT's plot
  model. On the same city and window (styles steps 047 Lots → 049 Complex), the paper share of land rises from **0.246
  to 0.311** (EXP) and the native-resolution crop shows the street voids merging with the new gaps between buildings; the
  creator ships Lots, not Complex, as the default (ST-0).
* **FTG separates the tones.** Road and plaza paving `#C6C2BB` with a 1-px darker rim `#BBB7B1`, settled ground
  `#BCB8B2`, in-town lawn `#ADB69D` (ftg-payload-visual §8.1; visual-spec §4.3): ΔE 3.7 paving against ground, 12.4
  paving against lawn (EXP), and this seat's profile of `006-street-level.png` shows a street run ending in its rim. FTG
  keeps streets legible at 38 % lot coverage (_critic-ftg F13); in `002-overview.png` its suburb streets read as pale
  corridors through green ground.
* **NG draws the street.** A `#A69E92` stripe on `#CCC4B7` paper (ΔE 14.0), with continuous building rows around green
  courts `#A5A584` (visual-spec §3.2–§3.6; the NG crop): legible with 75–79 % of the frame in paper.

**Required change.**
* Roles `ground` (yard, settled ground), `garden`, `court`, `field` and `verge`, with our own `ink` values.
* A **pairwise contrast matrix** replacing the luminance rule: ΔE (76 or 2000) and ΔL* floors on the pairs that must
  separate at city zoom — street vs ground, garden vs building, building vs ground, tree vs water, green vs road, wall vs
  water — evaluated on rendered city-LOD images in B-ZOOM and on 100 % of random styles (O12 f).
* The `ink` family keeps its character by value steps: ≤ 6–8 visible tones, no saturated hue (IMPROVEMENTS O12
  restraint: "one ink for outlines, 4–8 colour roles").
* MFCG's green = building and tree = water collapses recorded as reference weaknesses not to copy.

### VIS-3 · major · The city LOD drops every way below tier 2, so the suburb's streets and the extramural lanes vanish

**Failure scenario.** One-click CITY at the frame zoom. The city band draws "water, walls, towers, gates, tier-1/2 ways,
blocks as footprint masses, landmarks, district labels; intramural alleys as unstroked gaps" (§8.5, l. 1386–1388); tier 1
is `through` and `primary` (§4.9, l. 949), so tier 2 is `secondary`. Everything finer is not drawn:

* the **suburb regime**: "offshoot lanes seeded from perimeter spokes … grow as `cul_de_sac` / `lane` proposals"; "plots
  are laid directly along the offshoots with small lots from the outset …, a per-plot density Bernoulli … leaves gaps"
  (§4.4, l. 744);
* the **gapped rings'** "courts and rear lanes" (l. 742);
* farmsteads' `track` to the nearest lane (§4.9).

(Tier 2 is nowhere defined; even if it were read to include `lane`, the suburb's `cul_de_sac` offshoots and the
`track`s would still vanish.) Inside the walls MFP-1 already shows that undrawn lanes need a continuous building line to
read as gaps. Outside the
walls there is no such line: the suburb's small lots with Bernoulli gaps, the ribbon's back lanes and the farm tracks
become footprints scattered on paper with no street network. Per MFP-6 the suburb regime is the default and 50–65 % of a
TOWN's buildings lie outside the wall, so this is most of the settlement at the zoom the owner compares.

**Evidence.** ARCH §8.5 l. 1386–1388; §4.4 l. 742, l. 744; §4.9 l. 949 and the farmstead rule. FTG draws its suburb
streets as filled corridors at overview zoom (`002-overview.png` and `001-load-settlement.png` crops: Greenwood's streets
are pale corridors through green ground; visual-spec §4.4). MFCG avoids the case rather than solving it: its extramural
houses sit on drawn roads (redteam-mfcg EXP: 71–85 % within 100 m of a gate road at size 40), and its sprawl-alley
hairlines exist only in the off-by-default alleys layer (ST-4, ST-0).

**Required change.** Select city-LOD ways by legibility need, not by class: every way that is the only access of a plot
not fronting a drawn way — suburb offshoots, ribbon back lanes, farm tracks, extramural lanes — is drawn at city LOD with
a lane symbol (a thin casing or a stripe); intramural lanes stay gaps only where a continuous frontage bounds them
(MFP-1). B-ZOOM metric: share of plots at city LOD whose access way is drawn or bounded by continuous frontage ≥ 95 %.
The suburb (or MFCG's ribbon, if MFP-6 is adopted) is part of the M1 / M2 side-by-sides against FTG's overview.

### VIS-4 · major · District labels cannot fit PLAT's districts at CITY zoom under "≥ 99 % inside" and the protected features

**Failure scenario.** One-click CITY at the frame zoom (4.55 m/px). §9: area labels are "letter-spaced small caps placed
per glyph along the spine, size ∝ √area within a band and clearance" (l. 1421); protected features (gates, castle,
plaza, bridges, walls) are obstacles; "district labels stay inside their face ≥ 99 %" (l. 1430–1431); F-LABEL fires when
the "spine [is] shorter than the text at the minimum size" and runs: shorter name → straight OBB label → 2019 OBB arc →
legend entry (§5.2, l. 1047). The "minimum size" is nowhere stated. With D-19's district band of 5–15 ha:

| view (m per px) | 5 ha (≈ 224 m) | 10 ha (≈ 316 m) | 15 ha (≈ 387 m) | largest font for a 12-glyph name on a spine of 0.9 × the width |
|---|---|---|---|---|
| TOWN frame (1.82) | 123 px | 174 px | 213 px | 10 / 15 / 18 px |
| CITY frame (4.55) | 49 px | 70 px | 85 px | **4 / 6 / 7 px** |
| METROPOLIS frame (7.27) | 31 px | 43 px | 53 px | 3 / 4 / 4 px |

(Assumes a glyph advance ≈ 0.9 em for letter-spaced caps; cap height ≈ 0.7 em. MFCG names run 8–16 glyphs: "STONEBLOOM
ROAD", "LIGHT KNOTS TOWN".) At CITY a 10 ha district takes a ≈ 6 px font (cap ≈ 4 px): illegible, so the ladder pushes
most CITY district names to the legend — MFCG's signature curved labels disappear from the default CITY view. MFCG at
size 80 (4.45 m/px, the same scale) has 17 districts of median 29 ha (EXP) — ≈ 121 px across — and its labels still
overflow their districts; overflow is how MFCG keeps them large (J02: the 2019 arcs "overflowed their areas"; J05: the
skeleton labels give narrow districts "small fitted curves"). PLAT's districts are 2–6 × smaller, and MFP-10 shows the
count law yields 36–70 districts where MFCG draws 17.

**Evidence.** ARCH §9 l. 1419–1435; §5.2 l. 1047; §13.5 labels row l. 1629 (0 protected overlaps, ≥ 99 % inside); D-19;
profile-mfcg §8 (per-letter labels along the ridge), visual-spec §1.7 (27 px caps, glyph canvases 15–55 px, label size ∝
district size); coverage-audit-mfcg J02, J05; redteam-mfcg EXP district areas and MFP-10; GEO-29 (label fit depends on
the host text engine).

**Required change.**
* State the label legibility floor in px (e.g. cap height ≥ 7 px at 1×) and make the F-LABEL ladder respect it before
  the legend rung.
* At city LOD, label **quarters**: adjacent districts of one kind merged until their spine fits the floor, named by the
  grammar (the naming engine already conditions names on features) — or allow a declared overflow (≤ 20 % of glyph area
  outside the face, never over a protected feature or another label).
* Acceptance per rung at the default view: ≥ 12 on-map area labels at or above the floor (MFCG size 80 draws 17),
  0 protected overlaps, legend fallbacks reported; measured with the bundled font on B-ZOOM (GEO-29 fixes the engine
  dependence).

### VIS-5 · major · Decoration is keyed by LOD band, so trees and roof detail re-roll at every band switch

**Failure scenario.** A leafy rich district, zoomed from the city band to the neighbourhood band and back. §6.1:
"Decoration (trees, roof detail, scatter, hatch phase) draws from `style/*` streams keyed by entity id **and LOD band** at
render time and is never stored" (l. 1103). §4.9: every green entity's trees are "instanced from `treeStream` with spacing
rules — orchard 6–8 m jittered grid, avenue 8–12 m in line, garden 4–6 m Poisson, wood 3–5 m warped Poisson" (l. 955),
and the restraint is "area fill → crowns → lobed trees by LOD" (l. 962). At the district threshold crowns appear (the one
pop O12 (a) allows); at the neighbourhood threshold the lobed trees are drawn from a different stream key, so every tree
takes a new position and shape; with `hatched` "usable at district LOD", the hatch phase of every roof shifts too; each
hysteresis reversal re-rolls them again. §8.5 promises "no feature pops more than once across a zoom sweep (B-ZOOM)"
(l. 1391), but §13.4 checks pops only as "footprint hash identical across bands" (l. 1602–1603). The text leaves one reading open: tree
*positions* might come from `treeStream` alone (§2.7) while only shapes and hatch phase are band-keyed; even then every
crown changes shape and every roof's hatching shifts at each band switch — MFCG's recorded defect — and nothing says
whether the district band's crowns and the neighbourhood band's lobed trees share positions. The same keying also makes
a tree export impossible to reconcile with the screen (coverage XB32: tree instances have no export path).

**Evidence.** ARCH §6.1 l. 1103; §4.9 l. 955, l. 962; §8.5 l. 1391; §13.4 l. 1598–1603; O12 (a). MFCG shows the defect
in a milder form: tree positions are model data cached per city, but the crown shape is re-picked from an un-reset
stream on every re-render, visibly ("crowns on the same trees change shape between `020` and `021`", ST-2), and the
recorded advice is "make the pick deterministic if re-renders must match; MFCG's does not" (ST-12). PLAT would re-roll
positions as well as shapes.

**Required change.**
* Key decoration by entity id and instance index only, never by band.
* Generate each green entity's instances once at the finest spacing with a stable per-instance rank; coarser bands draw a
  deterministic subset (rank ≤ k) or the aggregate fill — progressive, not resampled.
* Crown shape, colour jitter and hatch phase keyed by instance or entity id; forest edges (warped density) evaluated once
  in world units.
* B-ZOOM: every decoration instance appears at most once across a city → neighbourhood → city sweep and keeps its
  position once visible; an unchanged view re-renders pixel-identically (MFCG's re-pick as the baseline defect).

### VIS-6 · major · Per-district tiles "re-rasterised only when marks change" cannot follow continuous zoom

**Failure scenario.** A CITY in `ink`, pinch-zoomed from the city frame toward a district. §8.5: Canvas2D "with retained
**tiles per district** (MFCG's per-ward cache), re-rasterised only when a district's marks change" (l. 1392); continuous
zoom "selects the band with hysteresis" (l. 1390); hairlines and casings are in paper units (§8.2). A zoom step changes
no mark, but it changes the world size of every paper-unit width, so a tile rasterised at one scale is wrong at every
other scale. The design leaves two readings, and both fail a stated goal:

1. **Tiles are bitmap-scaled.** At 2 × zoom-in the 0.5-px hairline renders ≈ 1 px and blurred, at 2 × zoom-out
   ≈ 0.25 px; the casing's Δ = 2h (the law §8.3's census enforces) is lost; screen-space labels and furniture no longer
   register with the scaled map. MFCG's look *is* the sub-pixel hairline ("sub-pixel widths matter: MFCG's 0.119 px
   hairline is the look", visual-spec §6 item 3).
2. **Visible districts are re-rasterised per zoom step.** At MFCG's recorded Canvas replay of 170–230 ms for a size-80
   city of ≈ 15 k buildings (ARCH §12's own reference bar) — 11–15 µs per building — a CITY view of 4 500–6 000
   buildings costs ≈ 50–90 ms and a METROPOLIS view of 12 000–15 000 ≈ 130–225 ms per step, before trees: 4–20 fps.
   IMPROVEMENTS O12 (b) requires "Pan and zoom at ≥ 60 fps with 40 000 buildings and 200 k trees"; ARCH §12 states only
   "≥ 60 fps pan at 40 k buildings / 200 k trees with tiles" (l. 1549) — the zoom half of the goal has no mechanism.

The per-ward bitmap cache ARCH adopts is the reason MFCG has no zoom at all ("Currently there is no way to zoom in/out. I
know it's a big flaw, but there are technical reasons for it", IMPROVEMENTS O12 answers). Tiles per district also cut
effects that cross district edges: the global casing-before-body order (GEO-28), shadows cast across a district
boundary, tree crowns and label halos near it.

**Evidence.** ARCH §8.5 l. 1390–1398; §8.2 (paper-unit widths); §12 l. 1549 and its MFCG bar (170–230 ms); IMPROVEMENTS
O12 (b) and answers (MFCG no zoom; NG rasterises in 73–111 ms, more than it spends generating); visual-spec §1.1 (one
bitmap per ward: 46 000 fills, 590 uploads), §6 item 3; GEO-28.

**Required change.**
* A tile pyramid keyed (district, band, zoom level) at ≤ √2 steps, with per-level re-raster budgets (ms per 1 000
  buildings) measured at M1.
* Bitmap scaling only transiently, within one level, during a gesture; re-raster in the worker (OffscreenCanvas) and swap
  in; state the settle time.
* Tile margins ≥ the largest cross-tile effect (shadow length, crown radius, casing width), and one global
  casing-before-body order across tiles (GEO-28).
* Zoom fps stated separately from pan fps in §12 and in B-ZOOM; a hairline-fidelity check at every settled zoom
  (casing Δ = 2h ± 0.1 px; hairline ≈ 50 % ink coverage at 1×).

### VIS-7 · major · The `lit` preset cannot be built as specified on either backend, and its assets have no budget

**Failure scenario.** M2: "the `lit` preset and the WebGL2 tier … the second preset side by side against FTG" (§16,
l. 1919; D-1). §8.2 defines `lit` as "tiled land-use textures with tint, directional light on extruded roofs with soft
drop shadows, hedgerow rows along field boundaries, filled corridors, stone-textured wall band …, water depth ramp and
foam line" with the programs "texture + light, shadowPass(soft) …" (l. 1355), and `texture(tile, tint) + light(dir)` is
"FTG's look; WebGL2 with a Canvas2D tonal-split approximation" (l. 1339). FTG's look is made of things neither backend
is specified to do:

* **Canvas2D (the default backend and the M1–M2 tile path).** FTG lights roofs, trees and walls through normal maps
  (`sphere_normal` for canopies, `tall_stone_normal` for buildings and walls) and soft alpha masks (`circle_alpha`,
  `edges_alpha`) with one directional light (visual-spec §4.2, §4.4). No Canvas2D program shades by a normal map, and a
  *soft* drop shadow needs either a blur or a multi-pass penumbra — the bitmap-filter cost §8.4 says the design avoids
  ("Fantasy Manor's ≈ 90 % render cost is avoided by vector offsets, not bitmap filters", l. 1379–1381; FM's shadow is
  11–15 bitmap passes, soft, ≈ 90 % of its render, manor.md). `shadowPass(colour, alpha, offset | prismFromHeight(sun))`
  has no softness parameter at all. On Canvas2D, `lit` is therefore NG's two-tone roofs with textures.
* **WebGL2.** The tier is specified as "instanced triangles for hatch and crowns, SDF text later, pixel-difference test
  against Canvas2D below threshold" (l. 1396), and O12 (c) requires screen = PNG = SVG within threshold over the full
  option matrix. Real lighting and soft shadows differ from the Canvas2D tonal split by construction, so either that
  test fails or the WebGL2 `lit` is capped at the Canvas2D look. The same tier carries the METROPOLIS first frame (§12,
  "≤ 1 s (progressive; WebGL2 tier)") yet specifies no stroke tessellation: WebGL has no usable wide lines, so MFCG's
  round-joined, sub-pixel, casing-exact hairlines (the `ink` census) need a tessellator the document does not mention.
* **Water.** FTG's depth ramp and foam are distance-from-shore functions evaluated in the water shader — widths
  independent of coastline curvature, uniform into bays (ftg-posts-c §2.13) — which the stroke-based `bands` program
  reproduces only approximately (VIS-12, VIS-13).
* **Assets.** FTG's 17 texture PNGs (field tiles per crop and livestock, pebble beach with normal map, cliff, parchment,
  two normal maps, two alpha masks, a colour LUT; visual-spec §4.2) are its creative content (§17). PLAT needs its own
  set; no asset list, resolution, tiling rule or authoring effort appears in M2's 26–32 pw, and `LandUse` has no crop or
  livestock attribute to choose a tile (coverage-audit-ng-shared VS27, M).

**Evidence.** ARCH l. 1339, 1355, 1379–1381, 1396; O12 (c); §12 METROPOLIS row; §16 M2; §17; D-1. visual-spec §4.1–§4.4,
§5 (FTG: "real directional lighting", "normal maps"); ftg-posts-c §2.13; manor.md (render passages); coverage-audit-ftg
K04 (soft shadows judged COVERED), K07 (post-process pointer dangling); coverage-audit-ng-shared VS27.

**Required change.**
* A reference backend per preset (`ink` → Canvas2D; `lit` → WebGL2), with the cross-backend pixel test scoped to one
  preset and a declared degradation list (for `lit` on Canvas2D: hard offset shadows, two-tone faces, no normal maps —
  shown to the user as such).
* A WebGL2 pipeline specification for both uses: stroke tessellation with round joins and caps and coverage-correct
  sub-pixel widths (the `ink` census must pass on WebGL2); per-face roof normals from the skeleton; normal-mapped canopy
  and stone shading with one directional light; soft shadows as a per-tile shadow mask blurred once, or alpha-mask quads;
  water depth and foam from a shoreline distance field (VIS-12).
* `shadowPass` gains `penumbraPx`.
* PLAT's own texture set listed with provenance, resolution and tiling, and costed in M2; the crop attribute of VS27.

### VIS-8 · major · Plot boundaries have no walls, fences, hedges or gates

**Failure scenario.** District LOD, a prosperous quarter at M2: detached houses with side yards, set-back compounds with
forecourts and outbuildings, formal gardens (§4.7 S11 table l. 882–889; §4.9). The model's plot edges are typed
`plot_line`, `party_wall` or `invisible` (§2.4, l. 359); yards are areas (`yard, garden, court, orchard, midden, pen,
vacant, formal_garden, forecourt`, §2.5 l. 375); the compound gets "a gate on the access edge" (l. 885) with no gate
geometry; the plot outline is an optional cadastral toggle. So:

* every open frontage — detached, compound, hovel, vacant, garden — has no drawn edge; once MFP-1's fix tones yards, the
  street edge there is a tone step only;
* a compound's forecourt cannot be told from a public square or the neighbour's yard (ownership is invisible);
* NG's manor compound — a walled rectangle whose grove fills "its entire walled plot" (profile-neighbourhood §3.8) — has
  no wall to draw (coverage-audit-ng-shared N27 records the gap as L at stage 2);
* the VTT export takes "walls from footprint edges and enceintes" (§11): every yard wall and fence a battle map needs is
  missing.

FTG shows why the symbology must be designed, not improvised: it draws walls and fences with its road controls
(coverage-audit-ftg D06), and "fenced yards read as broken buildings" (IMPROVEMENTS O12 answers). VG draws fences and
hedges between plots (coverage-audit-vg VN-154). The NG crop shows the positive case: continuous building rows around
green courts keep every street edge drawn.

**Evidence.** ARCH §2.4 l. 359; §2.5 l. 375; §4.7 l. 882–889; §8.5 district band; §11 VTT row; O17 (d) (streetwall
continuity); profile-neighbourhood §3.8; coverage-audit-ng-shared N27; coverage-audit-ftg D06; IMPROVEMENTS O12 answers;
coverage-audit-vg VN-154.

**Required change.**
* A boundary treatment on plot edges (frontage, side, rear): none, fence, hedge, wall or railing, with gate openings on
  access edges — chosen by the site-plan table by class, prosperity band and arrangement, as calibratable data rows.
* Drawn at district LOD as a stroke distinct from buildings: never filled, weight ≤ ½ the building outline, gaps at
  gates; a symbology check that no boundary mark shares a building's fill role.
* A walled or fenced frontage counts toward O17 (d) streetwall continuity.
* Walls and fences exported to VTT (as walls) and GeoJSON (as typed lines); NG's manor wall uses the same field.

### VIS-9 · major · The style families are not defined across the four LOD bands

**Failure scenario.** A default-`ink` user opens a district as a close-up (the stage-2 workflow of II.4) or simply zooms
to the neighbourhood band. `StyleSheet` has per-band `order`, `programs` and `budgets` (§14), but the presets are
defined by family: `ink` lists city and district items; `hatched` is "NG family; the stage-2 close-up tier; usable at
district LOD" (l. 1356); §8.5 defines the neighbourhood band itself in NG's terms ("NG-class: hatched two-tone roofs,
prism shadows, cobbles, chimneys, wells, lobed depth-sorted trees", l. 1386–1389); §8.6 and II.4 say "the `hatched`
preset at neighbourhood LOD" (l. 1402, l. 2059). Two readings, both failing a stated goal:

1. The `ink` sheet has no neighbourhood programs, and the close-up is the city drawing magnified — MFCG's own District
   View weakness, recorded in IMPROVEMENTS O12: "drawn exactly in the same way … no cupolas, shadows, cobbled roads",
   "often looks disjointed" (101942512).
2. The band switches to `hatched`, and at one zoom threshold the palette and line idiom jump from grey mono print (flat
   `#A5A095` roofs, hairlines, visual-spec §1.4) to brown two-tone roofs with ink ticks (visual-spec §3.4) — contradicting
   PART II's own promise that "the neighbourhood's look is just a closer level of detail of the same picture" (l. 1992).

`lit` has no neighbourhood or building band either, and B-ZOOM checks feature pops, not role remaps.

**Evidence.** ARCH §8.2 l. 1354–1356; §8.5 l. 1386–1389; §8.6 l. 1402; II.4 l. 2059; §14 `StyleSheet`; PART II l. 1992;
IMPROVEMENTS O12 answers; visual-spec §1.4, §3.4; profile-mfcg ST-3 (MFCG's own close-up idiom: a per-footprint skeleton
drawn as ridge hairlines over flat roofs, which "turn the flat grey roofs into a darker, busier texture").

**Required change.**
* Every shipped family defines all four bands with invariant colour roles — detail is added, roles are never remapped.
  `ink` at neighbourhood LOD is an ink-family close-up: MFCG's Hip/Gable ridge hairlines, NG-style tapered ticks in the
  `ink` role on the roof colour, prism shadows at an ink alpha, cobbles as ink stipple. `hatched` and `lit` define their
  city bands too.
* Additive detail cross-faded over the hysteresis interval.
* B-ZOOM role continuity: mean roof and ground colour ΔE < 2 across each band switch within a family.
* The stage-2 side-by-side against NG uses `hatched`, with the `ink` close-up alongside.

### VIS-10 · major · Single-wing L/T footprints and model-fixed roof kinds cannot produce NG's per-wing "fake" gables

**Failure scenario.** Stage 2, `hatched`, a street of houses that the base's outline builder made L-shaped, and a
cross-plan hall. ARCH: `OutlineBuildingGenerator` emits "the site plan's rectangle, or an L/T composition of rectangles
… a single-wing composition" (§2.6, l. 419–423); `Building.roof` is one spec with one `ridgeAxis`; S11 picks "roof kind
by class (hip by straight skeleton, gable with the skeleton's gable variant, cone / dome for towers)" (l. 893–894);
derived roofs are "cached by entity id" (l. 1398). NG draws every wing as an oriented rectangle (the lot's OBB) with a
ridge on its long axis (≈ 36 % swapped to present the gable), cuts the roof into two slopes along that ridge, fills them
light and dark (dark = lit × lerp(ambience, shadow, 0.4)), and hatches each slope with ≈ 8.5 pierced chords × 2 tapered
triangles; landmarks are compositions of several rectangles (profile-neighbourhood §3.5–§3.6). Its creator built the
correct hip skeleton, compared, and chose these "fake" gables "for my eye" — a style parameter, not a correctness
question (watabou-extra-b T5). With PLAT's data:

* an L house cut by its single ridge line yields two "slopes" that match neither arm: the cross arm gets a lengthwise
  light/dark split and hatching that runs along its length;
* drawing the skeleton instead yields a hip-and-valley roof of ≥ 6 faces that NG never draws, and the `roof` program
  (§8.2) defines two tones for two faces, not which of six faces are lit;
* roof construction follows `roof.kind` in the model, so moving a document from `ink` with MFCG-style Hip roofs to
  `hatched` fake gables cannot change it without regeneration, and the derived-roof cache has no construction key.

**Evidence.** ARCH §2.6 l. 419–423 and the `Building` interface; §4.7 l. 893–894; §8.5 l. 1398; §8.2 l. 1356;
profile-neighbourhood §3.5 (`Building.new` 779 ≈ `Wing.new` 787; `Rect.ofPoly` = OBB; `Rect.getRidge`; `swapAxes`
≈ 36 %), §3.6 (`hatchRoof` = `PolyCut.cut` by the ridge, `pierce` ≈ 8.5 per roof, 2 `shortStroke` per pierce; the dark
multiplier), BG-3 (no ridge stroked); watabou-extra-b T4, T5; profile-mfcg ST-3 (one skeleton per footprint; Gable =
`addGables` post-pass; a failed gable is drawn plain); coverage-audit-ng-shared N28, N29 (judged COVERED), N35.

**Required change.**
* Store wings in the base: every non-rectangular outline-builder footprint is a set of rectangular wings (L = 2, T = 2–3),
  each with ridge axis, heights and roof kind; the footprint is their union, so the city-LOD footprint hash is
  unchanged (O17 i).
* Roof construction becomes a style-sheet parameter over the stored wings — plain, skeleton-hip, skeleton-gable or
  fake-gable-per-wing — with the derived-roof cache keyed by (entity, construction).
* Two-tone assignment defined for any face set: lit when the face normal faces the light, NG's multiplier otherwise.
* Census rows: roofs drawn per wing, hatch triangles per wing 15–20, no ridge stroke, footprint-only outline (N35).

### Minor findings (VIS-11 – VIS-18)

**VIS-11 · minor · The roof downgrade "hip-from-OBB" is itself a visual surprise.** *Scenario:* the straight skeleton times
out on a trapezoidal or L footprint (F-SKELETON, §5.2 l. 1046; tier 4 of §5.1); the downgrade draws hip lines from the
OBB's corners, which lie outside a non-rectangular footprint, so ridge and hip lines start outside the roof and cross its
edges — while §13.1 promises that a skeleton failure is "never a crash and never a visual surprise" (l. 1575).
*Evidence:* MFCG's rule is the opposite: a roof whose gable pass fails "is drawn plain, not hipped" (profile-mfcg ST-3,
ST-12). *Change:* downgrade roofs to plain (no ridge lines), or clip the OBB hip to the footprint and drop sub-pixel
lines; a ladder-coverage fixture renders the downgrade and asserts no roof line outside its footprint.

**VIS-12 · minor · The display list has no raster mark.** *Scenario:* the base should-have "O12 extras: relief tiers
(hillshade, contours)" (§15.2, mapped to §8.5, where no mechanism exists), FTG's depth ramp and foam (distance fields,
ftg-posts-c §2.13) and VG's beach band (produced by a raster pass, visual-spec §2.3 and §7 item 4) all need a
world-space raster, but `MarkKind` is area, ribbon, outline, hatch, glyph, text, instances or shadow and `GeomRef` is a
face, chain, point set or text spine (§8.1); the terrain raster lives outside the plat (§2.3). A hillshade program —
what coverage-audit-vg VN-031 (MISSING, medium) asks for — has no geometry to run on. *Change:* a `field` mark kind with
a raster `GeomRef` (world-space grid, resolution per band, value → colour ramp or light); zero cost when unused. This is
the one structural addition the VG not-precluded check needs; every other VG rendering row maps to an existing or
registrable program (coverage-audit-vg §3.12; the VG crop's bands, crowns, shadows and furrows).

**VIS-13 · minor · Shore treatments need per-segment shore marks.** *Scenario:* a coastal CITY in `lit` with a harbour:
the `bands` program strokes the water face's outline uniformly (§8.2), so foam lands on quays and inside the sheltered
basin and cliffs are painted as beach — although S1 already types `bankKinds` per shore segment (§2.3; §4.2 S1 (7)).
*Evidence:* FTG puts foam on the open sea, a weaker version on rivers and none in the harbour, whose sheltered water is a
distinct tone (ftg-posts-c §2.13; ftg-payload-visual §8.1–§8.2), with pebble and cliff textures (visual-spec §4.2).
*Change:* S14 emits shore chains per bank segment with `bankKind`, `waterKind` and `exposure` attributes; foam, beach,
cliff and quay programs select on them; census: foam on 0 % of quay and harbour segments.

**VIS-14 · minor · Avenue crowns cover the tier-1 casings at city zoom.** *Scenario:* a rich or planned CITY district:
the avenue rule plants tree rows 8–12 m apart on both sides of `through` and `primary` ways (§4.9 l. 949), crowns are
"consistent with building sizes" (l. 955), trees draw after roads (MFCG's recorded order, ST-2; coverage K16), and the
city-LOD restraint "area fill → crowns → lobed trees" (l. 962) says nothing about line greenery; at 4.55 m/px a 6–10 m
crown is a 1.5–2 px blob on each kerb, covering the casing hairlines of the town's most important streets. MFCG's trees
never stand on roads (ST-2 screenshots). *Change:* at city LOD draw avenues as a thin green edge line inside the corridor,
or not at all — never as crowns over a casing; B-ZOOM check: no tree mark covers a tier-1/2 casing at city LOD.

**VIS-15 · minor · A paper-role halo misfires once blocks have a ground tone.** *Scenario:* after MFP-1's fix (a
`ground` role for blocks), district labels haloed "in the paper role" (§9 l. 1422; `halo(text, paper, px)` §8.2) print
light blotches around every glyph over blocks, water, woods and fields. MFCG's ≈ 2 px paper halo works only because its
paper is also its road and its ground (visual-spec §1.2, §1.7); FTG uses a cream halo plus a drop shadow (§4.5).
*Change:* halo role = the local background role under the glyph (sampled along the spine), or a knock-out that restores
the underlying fills; checked against VIS-2's contrast matrix.

**VIS-16 · minor · "Layer order equal to the recorded order" is undefined for PLAT's new semantics.** *Scenario:* the
census (§8.3 l. 1371; §13.5 "order equal") compares against MFCG's 17-step and NG's recorded orders, but PLAT draws
semantics the references never drew — yards, gardens, courts, boundary treatments (VIS-8), avenues, hedgerows, the
shadow pass, street labels — and MFCG's shipped order has no tree slot (coverage K16); the census also omits NG's
measured "no ridge stroke; outline = footprint only" (BG-3; coverage-audit-ng-shared §6 item 6, N35). *Change:* define
order parity as "the recorded order is a subsequence of the preset's order, and each added semantic sits at a declared
slot with a reason"; add N35's two checks and MFCG's walls-after-buildings rule to the census.

**VIS-17 · minor · The sky layer has no occlusion policy.** *Scenario:* the owner's floating islands (one to three,
each carrying one or more neighbourhoods, "a palace overlooking the land") are drawn above the ground layer (§8.4
l. 1376), so in the top-down view an island of neighbourhood size hides the 5–15 ha district beneath it (D-19), while its
shadow falls elsewhere; nothing places islands relative to ground features or shows the covered ground. *Change:* as
part of the hook, a per-layer occlusion mode (opaque, ghost the covered ground at x %, or an offset view) and a placement
rule that reads the ground plan (over water, fields or outskirts by default; over the core only by assignment).

**VIS-18 · minor · SVG export has no size budget at METROPOLIS scale.** *Scenario:* O11 (h) promises layered SVG that
"opens in Inkscape / Illustrator with layers intact" (§11 l. 1513) with instances as `<use>`. MFCG's size-80 SVG is
already 6.3 MB (6 297 685 B) for 15 392 buildings with trees off (exports README); a PLAT METROPOLIS adds 12–15 k
buildings with up to 200 k tree instances (§12), hedgerows and furrows. FTG simplifies trees in its SVG (coverage-audit-ftg
K18). *Change:* an SVG size budget per rung, tree and hedgerow aggregation at city LOD (one path per green entity), and a
scripted Inkscape open-time check as part of O11 (h).

## §4 What the design already gets right under this lens (keep it through the revision)

* **One semantic display list with style as data** (§8.1–§8.2): it removes MFCG's two drawing code paths ("all the
  'drawing' needs to be implemented two times", IMPROVEMENTS O12) and FTG's coupling of geometry to its three.js scene;
  new looks are files, and the references' palette schemas (MFCG 13 keys, NG 26, VG 40) fit the role model.
* **The recorded draw laws as a regression census** (§8.3, §13.5): casing Δ = 2h, round joins ≥ 99.9 %, VG's band ratios
  5.196 : 2.828 : 1, NG's hatch per wing and roof ratios (0.787, 0.802, 0.834). This is what makes "parity" measurable
  rather than a matter of taste — keep it and extend it (VIS-1, VIS-10, VIS-16).
* **Paper-unit hairlines and world-unit ribbons as two declared coordinate spaces** — MFCG's single most reusable
  convention (visual-spec §0.2). VIS-1 and VIS-6 ask only that the conversion be stated and survive zoom.
* **Heights on every building, wing, tower and roof, and one composited shadow pass off by default** (§2.6, §8.4): NG's
  prism shadow and VG's single pass without double darkening, with Fantasy Manor's bitmap cost avoided for hard shadows.
  (Coverage K06 asks that MFCG's constant Raised under-copy stay on in `ink`.)
* **Protected features, hole-aware spines with typed fallbacks, per-zoom label sets and street labels** (§9): MFCG's
  measured defects (gates and keep covered, walls straddled) are answered; VIS-4 only asks for a size floor and a
  city-LOD aggregation.
* **LOD bands with identical footprint geometry, hysteresis, per-band budgets and a pop test** (§8.5, §13.4) — the right
  contract for stage 2 and stage 3; VIS-5 extends the pop test to decoration.
* **The option-interaction matrix and the no-fills / no-outlines survival render** (§8.2, §13.2): MFCG's Block mode
  silently dropping trees cannot recur.
* **Restraint** (§4.9, O12): calm at city zoom, relief and shadows optional, no oblique default, the ink look as default.
* **Layers (underground / ground / sky) on every mark, with per-layer toggles, shadows and export** (§2.1, §8.4, §11):
  the right hook for sewers and islands; VIS-17 adds occlusion.

## §5 How the findings cluster, and overlaps with other lenses

**Cluster A — the city-zoom picture (with MFP-1):** VIS-1, VIS-2, VIS-3, VIS-4, VIS-14, VIS-15. One city-LOD rendering
contract answers them together with MFP-1: a symbolisation table (widths, symbol sizes, outline thinning, footprint
masses), roles with a pairwise contrast matrix, way selection by legibility need, a label floor with quarter labels,
halo by background role. These decide the M1 side-by-side against MFCG, so they belong in M1's exit list with MFP-1.

**Cluster B — zoom and LOD mechanics:** VIS-5, VIS-6, VIS-9. Stable decoration keys, a tile pyramid, style families
defined across all bands. Together with GEO-28 (casing order across tiles) and GEO-29 (label fit and the text engine).

**Cluster C — the second preset and the backends:** VIS-7, VIS-12, VIS-13, VIS-18. A reference backend per preset, a
WebGL2 pipeline specification (tessellated strokes, lighting, soft shadows, distance-field water), a raster mark kind,
per-segment shore marks, our own texture set, export budgets. Related: coverage-audit-ng-shared VS27 (crop attribute),
coverage-audit-ftg K07 (post-process pointer), coverage-audit-vg VN-031 (hillshade).

**Cluster D — plot and building symbology, stage-2 readiness:** VIS-8, VIS-10, VIS-11, VIS-16. Boundary treatments on
plot edges, wings stored in the base, roof construction as a style parameter, plain-roof downgrade, census order parity.
Related: coverage-audit-ng-shared N27, N35.

**Cluster E — hooks:** VIS-17 (sky occlusion).

| this finding | overlaps (cited, not repeated) | what this finding adds |
|---|---|---|
| VIS-1 | MFP-1 (b) (footprint masses), MFP-9 (setback not a hard invariant); coverage K04 (COVERED), K14 | the undefined unit; the symbolisation law for walls, towers, gates and outlines; the view-scale arithmetic; the outline-swamp mechanism at CITY / METROPOLIS |
| VIS-2 | MFP-1 (a), (c) (ground role, yard-street contrast); coverage K05 (roles) | garden vs building and tree vs water collapses in MFCG's palette; the pairwise ΔE matrix; MFCG Complex, FTG and NG measured as the reference answers |
| VIS-3 | MFP-6 (suburb regime default, extramural share); MFP-1 (intramural gaps); coverage K11 | the city-LOD class cut outside the walls; selection by access need; the FTG overview evidence |
| VIS-4 | MFP-10 (district count, thinning); GEO-29; coverage J02, J05 | the fit arithmetic per rung; the unstated minimum size; quarter labels or declared overflow |
| VIS-5 | coverage-audit-ng-shared XB32 (tree export) | band-keyed decoration streams defeat the pop test; MFCG's re-pick defect as the baseline |
| VIS-6 | GEO-28 (casing order across tiles); MFP-5 (budgets at matched counts) | paper-unit hairlines against cached tiles under zoom; zoom fps missing from §12 |
| VIS-7 | coverage-audit-ftg K04 (COVERED), K07; coverage-audit-ng-shared VS27 | the Canvas2D / WebGL2 contradiction; soft shadows vs §8.4; WebGL stroke tessellation for METROPOLIS; the asset budget |
| VIS-8 | coverage-audit-ng-shared N27 (L, stage 2); coverage-audit-ftg D06; coverage-audit-vg VN-154 | boundary treatments as a base plot-edge attribute; district-LOD legibility; VTT walls; FTG's fence-as-building defect |
| VIS-9 | coverage-audit-ng-shared VS25 / N40 (orders shipped) | family × band definition; MFCG's District View weakness; the palette jump |
| VIS-10 | coverage-audit-ng-shared N28, N29 (COVERED), N35 | single-wing L/T and model-fixed roof kinds against NG's per-wing fake gables; the cache key |
| VIS-11 | — | the downgrade's own visual failure |
| VIS-12 | coverage-audit-vg VN-029, VN-031 | the missing raster mark kind that a hillshade program needs |
| VIS-13 | coverage-audit-ng-shared VS32 (COVERED) | per-segment shore marks |
| VIS-14 | coverage K16 (tree slot) | avenue crowns over casings at city LOD |
| VIS-15 | MFP-1 (a) | halo role follows the background |
| VIS-16 | coverage K16; coverage-audit-ng-shared §6 item 6 | order parity for new semantics |
| VIS-17 | — | occlusion policy for the sky layer |
| VIS-18 | coverage-audit-ftg K18 | SVG budget at METROPOLIS |

**Deliberately not re-raised** (already raised elsewhere at a severity this seat accepts): Raised on by default in `ink`
(coverage K06, M), district tints (K12), the dangling post-process pointer (FTG K07), the hillshade program (VG VN-031),
the crop attribute for FTG's field textures (VS27), NG's no-ridge-stroke census line (N35), MFCG's centred title versus
NG's corner rule (VS11, a recorded deliberate difference), tree-instance export (XB32), the first paint before S10
(MFP-1 item 4).

## §6 CONFIRMED versus PLAUSIBLE

**CONFIRMED.** Every quotation of ARCH (sections and line numbers re-checked by grep against the file); every reference
fact cited from a findings passage or audit row read by this seat (§0); every EXP number (the MFCG Lots → Complex paper
share 0.246 → 0.311 on one city; the ΔE and L* values of published palette pairs; the FTG pixel profile); the MFCG export
`values` and SVG scale (read from the README); and the arithmetic shown inline — view scales, drawn widths in px, the
outline share of a footprint, label fit per rung, and the re-raster estimate at MFCG's per-building replay rate.

**PLAUSIBLE.** Every consequence for a PLAT picture, because no PLAT renderer exists: the frame-fit view scales assume
the framing rule the design leaves open (A06); the label fit assumes a glyph advance of ≈ 0.9 em; the zoom frame rates
assume MFCG's OpenFL replay cost per building, which a leaner Canvas2D path may beat; the garden-as-building reading
assumes an `ink` preset that copies MFCG's role values, which the design does not require but nothing prevents; the
share of L/T footprints (VIS-10) and the suburb's share of the picture (VIS-3, via MFP-6) depend on tables M-1 and M1
will fix; and the FTG street-versus-ground tone assignment rests on ftg-payload-visual §8.1 and visual-spec §4.3, with
this seat's pixel profile consistent with it but not independently decisive.
