# Red team — MFCG-CLASS PARITY WITHIN THE FUSED BASE lens against `docs/ARCHITECTURE.md`
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat redteam:mfcg (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `validation/redteam-mfcg` · 2026-09-25 · seat: red-team validator (Fable role; opus stand-in), clean-room (no
captured JavaScript bundle opened; no reference code copied or ported; MFCG's exported files were measured, not reused).

**Status: COMPLETE — 12 findings (1 blocker, 6 major, 5 minor).** §2 is the parseable table (one row per finding, the
`RT_SCHEMA` fields); §3 gives each failure scenario, its evidence and the required change; §4 lists what to keep; §5
groups the findings and maps overlaps with `docs/validation/redteam-geometry.md` (GEO-n) and
`docs/validation/coverage-audit-mfcg.md`; §6 separates CONFIRMED from PLAUSIBLE.

**Headline.** The fusion keeps MFCG's parts but loses how they fit together. Four mechanisms carry most of MFCG's
legibility and charm, and the design breaks each one: a continuous building line along every street, which is what
makes negative-space streets work (MFP-1); a street network cut into districts that inherits the wall's shape (MFP-2);
landmark spaces and gates that are fixed before the streets (MFP-3, MFP-4); and a compact walled town with short ribbons
along the roads (MFP-6). The speed comparison is also made against the wrong reference size (MFP-5). The plot model
itself is right; MFP-1 asks only that the city-zoom rendering keep the figure-ground MFCG gets from drawing lots as
buildings.

## §0 Reading record

| file | size | read |
|---|---|---|
| `workflows/lane-prompts/03/redteam_mfcg.prompt.txt` | 23 KB | in full (the brief) |
| `research/findings/_critic.md` | 42 KB, 478 lines | in full, first (standing ruling) |
| `research/findings/_critic-os.md` | 63 KB, 434 lines | in full (constants 1–141, C1–C18, S1–S20, draw order §4, gaps) |
| `research/findings/_critic-ftg.md` | 49 KB, 256 lines | in full (F1–F27, §2, 37 spot-checks, §4 payload table, §6) |
| `research/findings/_critic-vg-ng.md` | 37 KB, 226 lines | in full (V1–V27, §2, S1–S29 / P1–P5, §4, §6) |
| `docs/ARCHITECTURE.md` | 245 KB, 2 200 lines | in full, every line (§0–§17, PART II, PART III, D-1–D-25, J-1–J-18, deferrals, Appendix A); cited line numbers re-checked |
| `docs/ARCHITECTURE-VALIDATION.md` | 5 KB | §0 in full |
| `docs/validation/redteam-geometry.md` | 134 KB | header, §0–§2 in full (the 42-row table, to avoid repeating GEO-n and to match its layout); §3–§6 by outline only |
| `docs/validation/coverage-audit-mfcg.md` | 122 KB | header, §2 summary in full, and every row of §3 D–Q (ID, capability, verdict, gap, severity); §0, §1, §3 A–C, §4, §5 by outline only |
| `workflows/03-assess-design-validate.js` | — | `RT_SCHEMA` and the RedTeam phase only |
| `captures/mfcg/exports-2026-09-25/README.md` | 15 KB | in full; the five exported JSON/SVG files measured by this seat's scripts (below) |
| `research/findings/profile-mfcg.md` | 204 KB, 2 261 lines | in full: body §0–§15, Critic addendum, Critic-2 addendum, Explicit-gates addendum parts 1 and 2 (EG-1–EG-8, EG2-1–EG2-7), Styles addendum (ST-0–ST-12) |
| `research/findings/mfcg-posts-a.md` | 73 KB | T2, T3, T4, T10–T13, T20–T23 in full; the rest by outline |
| `research/findings/mfcg-posts-b.md` | 65 KB | §2.1–§2.9, §2.12, §2.16–§2.18 in full; the rest by outline |
| `research/findings/mfcg-devlogs-a.md` | 91 KB | §2.11, §2.12, §2.18, §2.19, §2.28, §4 and the External-sources addendum (E0–E2) in full; the rest by outline |
| `research/findings/mfcg-devlogs-b.md` | 81 KB | §2.16–§2.17 in full; the rest by outline |
| `research/findings/visual-spec.md` | 51 KB | §0.2, §1.4, §1.5 and §5 in full; the rest by outline |
| `docs/IMPROVEMENTS.md` | 193 KB | located by grep and read in those ranges: O6 restraint (l. 200–212), O7 restraint (l. 598–610), O17 design / acceptance / restraint (l. 1130–1175), O18 restraint (l. 1260–1270), R1–R6 (l. 1470–1476) |
| `docs/FABLE-REVIEW-QUEUE.md` | 9 KB | the queue table (to append this seat's row) |

**Not read** (outside this lens, or carried by a critic read in full): `os-model.md`, `os-wards-render.md`,
`os-geometry.md` (their MFCG constants through `_critic-os.md`), the FTG findings files (through `_critic-ftg.md`), the
VG / NG / manor / watabou-extra files, `docs/CONFIDENCE.md`, `docs/confidence/*`, `docs/improvements/*`, the design
proposals and judges, and every capture other than the MFCG exports. Reading total ≈ 265 k tokens, under the 350 k
switch point; nothing was skimmed silently.

**Executed by this seat** (our own Python in the session scratchpad; each reads only MFCG's exported output — no bundle,
no reference source). The scratchpad is not kept, so each rule is stated here for rerun; the numbers are quoted as "EXP".

| script → output | rule | result used |
|---|---|---|
| `mfcg_scale.py`, `mfcg_svgarea.py` | map-group scale (px per internal unit) ÷ (scale-bar px ÷ its metres); median JSON footprint area ÷ median SVG roof-path area (the roofs sit directly in the scaled group) | **1 internal unit = 4.00 m** (3.9998 / 3.9998 / 3.9991); area ratio **16.02** ⇒ the GeoJSON is in **metres** |
| `mfcg_stats.py` → `mfcg_stats.out` | footprint areas (shoelace); district polygons and point-in-polygon of building centroids; city-wall ring area, perimeter, vertex spacing; buildings inside the ring; castle ring area and compactness 4πA/P²; squares | gross footprint cover inside the wall 65.7 / 58.2 / 62.1 / 58.3 % (size 40, gates 0/1/4/9), 56.9 % (size 80); inside-wall share 98 / 97 / 92 / 82 % and 30 %; lots-as-buildings median 427 / 210 / 255 / 272 / 253 m²; districts 5–11 of 2.4–17.6 ha (size 40), 17 of 2.5–376 ha, median 29 ha, total 1 041 ha (size 80); wall 58 ha / 2.83 km / vertex p50 88 m (size 40), 248 ha / 6.83 km (size 80); castle 2.61 ha / 0.82 and 3.36 ha / 0.78; plaza 3 580–5 373 m² |
| `mfcg_orient.py` → `mfcg_orient.out` | per building, the longest-edge axis θ; R4 = \|mean exp(4iθ)\| over buildings within r of a sampled building (1 500 samples); control = the same with shuffled angles | median R4 0.84–0.97 (60 m), 0.58–0.88 (120 m), 0.32–0.68 (250 m); control 0.14–0.25 |
| `mfcg_wallalign.py` → `mfcg_wallalign.out` | buildings inside the wall: deviation (mod 90°) between the building axis and the nearest wall segment, by distance band | 0–40 m: median 3.5–4.5°, 84–92 % ≤ 15° (random 33 %); 40–100 m: 56–70 %; 100–200 m: 38–58 % |
| `mfcg_ribbon.py` → `mfcg_ribbon.out` | buildings outside the wall ring: distance to the nearest exported gate-road polyline | size 40: extramural 3 / 8 / 18 % (gates 1/4/9), 71–85 % within 100 m of a gate road, median 43–57 m; size 80: 70 % extramural, 28 % within 100 m, median 185 m |

## §1 Lens, method, severity rule

**Lens (from the brief).** MFCG-CLASS PARITY WITHIN THE FUSED BASE: ward/district partition and semantics (venue mix, no
residential wards), twisted bisection with local retry, castle/citadel repair, plaza/temple/market placement, curtain
walls with gates/towers and the no-buildings-against-walls rule, coast/river/canals/bridges, greens/farms/outskirts/
shantytowns, warp/rotate/reroll-per-ward editing, size classes and seed permalinks, one-click charm and speed (size-80
≈ 200 ms), ink style with curved labels and legend. Find what the fusion loses from MFCG, where FTG-style road growth
would break MFCG-class legibility, and whether the PLOT MODEL keeps MFCG's dense, legible fabric at city zoom.

**Method.** Every finding is a concrete input or state → a wrong output, lost capability, missed budget or unmeasurable
claim, with the ARCH section (and line) that specifies the failing mechanism, the evidence (creator words or recordings
through the findings files, or this seat's measurements of MFCG's own exports), and the specific change required.
Coverage-audit rows that judged a capability COVERED are re-examined where a finding shows the coverage is illusory;
rows the audit already marked PARTIAL or MISSING are cited, not repeated. Base items rank first (the owner's rule); no
finding here is a stage-2, stage-3 or village item.

**Severity** (the brief's definitions, applied literally). *blocker* — a goal the document states (quoted in the
finding) cannot be met by the mechanism as written; *major* — will bite in normal use and needs a design change to a
stage, a table or an interface; *minor* — a local defect or under-specification with a cheap, contained fix. MFP-1 is a
blocker by that rule although its repair is confined to the rendering contract; it is the first thing the M1 side-by-side
would expose.

**Evidence classes.** ARCH text quoted by section and line is CONFIRMED as what the design says. Reference behaviour is
CONFIRMED where a findings passage read by this seat records it (cited by file and section). EXP numbers are CONFIRMED
as executed measurements of MFCG's output. Every consequence for a PLAT town is PLAUSIBLE until M0/M1 exist (§6).

## §2 Findings table (machine-parseable; one row per finding)

Columns match the workflow's `RT_SCHEMA` (`id`, `severity`, `claim`, `evidence`, `required_change`), in the layout of
`docs/validation/redteam-geometry.md` §2. Each row stands alone; §3 carries the full failure scenario per id. No row
repeats a GEO-n finding or a coverage-audit row; overlaps are cited by id (§5).

| id | severity | claim | evidence | required change |
|---|---|---|---|---|
| MFP-1 | blocker | At city zoom the default `ink` look cannot show the street network once the plot model is on: intramural streets are negative space, footprints stand in yards, and nothing paints yards or block ground differently from street paper. Row yards form 10–20 m paper bands (3–6 px at CITY zoom) wider than the 2–5 m lanes and alleys; detached, compound, hovel, vacant and green frontages open the street edge; gross ink cover falls to ≈ 0.32–0.36 against MFCG's 0.57–0.66; and the city-LOD first paint (after S9, before any footprint exists) has no defined content. | ARCH §8.2 `ink` "negative-space streets inside walls" (l. 1354), roles l. 1341–1342; §8.5 city band "blocks as footprint masses … alleys as unstroked gaps"; §4.1 lazy S10–S14 after first paint; §4.7 granularity (depth 12–20 m) and S11 arrangements; §4.2 S2 builtBlockShare 0.62; IMPROVEMENTS O17 (a) coverage anchor FTG 0.51–0.58, O6 restraint "solve legibility in rendering". MFCG: streets are "just gaps between buildings" (30234656); only roads, piers, bridges stroked (profile-mfcg EG-4, ST-4); Lots mode edge to edge (ST-7), enclosed courtyards (posts-b §2.5). EXP gross cover inside walls 65.7/58.2/62.1/58.3 % (size 40), 56.9 % (size 80). | Specify the city-LOD figure-ground contract: fill L2 blocks (or L3 plots) with a `ground` role distinct from `road`/`paper` under the footprints (or stroke kerb hairlines wherever a frontage is open); define the "footprint masses" generalisation and make the first paint show the same figure-ground; add B-ZOOM / O12 (g) metrics — street-edge recoverability on rendered city-LOD images ≥ MFCG's on the EXP renders, yard-to-street contrast floor, gross ink cover vs MFCG 0.57–0.66; make them M1 exit criteria before the owner's side-by-side. |
| MFP-2 | major | The fusion hands MFCG's street work to FTG growth: S5 grows secondaries and lanes at 40 / 60 / 80 m separation, so core faces are block-sized before S8 and the bent cut adds at most a last cut; the wall is traced after growth, so the fabric cannot inherit its shape; §1.4 misreads MFCG as having no secondary streets; no metric or gate measures MFCG's street signature. | ARCH §4.4 (steps, separation 40/60/80 m, core band 30–45 m, lane in growth unless M0 fails), §4.6 step 1, §4.1 order, §1.4 row l. 182, §13.5 (no MFCG street row), §16 M0 c (NG bands only). MFCG 0.10.0: "merge patches and build streets district-wide … twisted bisection propagating properties of the outer shape inside" (87882877); 100431269/03 connected 3-valent alley mesh. EXP: lot orientation coherence R4 0.84–0.97 (60 m), 0.58–0.88 (120 m), 0.32–0.68 (250 m) vs shuffled 0.14–0.25; lots within 40 m of the wall aligned (median 3.5–4.5°, 84–92 % ≤ 15°, random 33 %). Coverage E11 COVERED. | In walled/core regimes let S5 grow only arterial-connecting secondaries at district scale (separation ≈ 120–250 m) and let S8's recursive bent cut of the merged district polygon produce every lane and intramural secondary (make the §4.4 fallback the default there); trace wall and water before S8 (cf. GEO-18); correct §1.4; add MFCG signature rows (R4 at 60/120/250 m, wall/shore alignment by distance band, T/Y share, intramural dead ends, blocks/ha, lots/block) to §13.5 and to the M0 gate against MFCG as well as NG. |
| MFP-3 | major | Nothing reserves the castle, main plaza or institution precincts before streets are grown: S5 has no rule excluding sited claims, the castle is claimed in S7 and institutions in S10 inside ≈ 0.16–0.36 ha street-bounded faces, `claimSubFace` acts on one face, so a realistic bailey (MFCG 2.6–3.4 ha) or cathedral close cannot be claimed; F-CASTLE shrinks, moves or strips the castle instead of repairing it in place; the `on_enceinte` weld, castle gate and plaza polygon are unspecified; §5.1's "S3 reserves space for institutions" has no mechanism. | ARCH §4.2 S3 (sites only), §4.4 legality list, §4.1 diagram (S7 castle claim), §4.7 step 3 claims, §3.4 claimSubFace(face), §5.2 F-CASTLE ladder, §4.8 trace pull/simplify, §5.1 principle 2 (l. 1009–1011), §4.7 S9 squares. MFCG: castle one cell, repaired by Equalize/Bloat, never moved (profile-mfcg §4.4b, Critic item 2; posts-a T12); shares two vertices with the wall, one town-side gate, castle street to plaza (EG-1, EG2-2); plaza a roundabout cell (coverage E03). EXP castle 2.61–3.36 ha, compactness 0.78–0.82; plaza 3 580–5 373 m². | S3 emits reservation polygons (castle bailey with an area band by rung and compactness ≥ 0.75, plaza, temple/cathedral precinct, market) inserted into L1 as barrier faces before S4; arterials end at the plaza's perimeter vertices, the castle street at one town-side castle gate; S5 may not cross, S8 skips reserved faces; S7 welds an `on_enceinte` castle into the trace through two claim vertices; F-CASTLE repairs in place (equalise angles, then bloat) before a reported re-site; the claim is the target of the `equalize`/`bloat` edits; acceptance: castle area/compactness in the EXP band ≥ 99 %, 0 ways through reservations. |
| MFP-4 | major | `gates = N` does not give MFCG's roads = gates: arterials are routed before the wall, so when crossings exceed N the excess inner arterials end blind at the wall and outer roads run along it to a neighbouring gate; when N exceeds crossings the extra gates are road-less posterns; `gates=0` still routes external arterials to a sealed wall and, read literally, adds a postern the user did not ask for. | ARCH §4.3 routes (bearings, crossing sites, harbour, castle ↔ plaza), §4.8 gates (top-N by betweenness, diversion lanes, posterns, sealed circuit with a declared postern), §5.2 F-WALL. MFCG: N exact, nested prefix picks, roads = N, one street to the plaza per gate, gates at chord midpoints (profile-mfcg EG-1, EG2-1, EG2-2); `gates=0` sealed with no road leaving, no fallback (EG2-5). Coverage E04 (H) covers only the default inland bearing count; GEO-18 covers secondary crossings of the pulled trace. | Pick exactly N gate sites on the intended enceinte first (sequential nested picks), each yielding one outward arterial (bearings derived from gates when not requested) and one inward street to the plaza; crossing sites, harbour and an outside castle connect through those gates or water gates; posterns a separate road-less count; `N = 0` routes no external arterial through the wall and adds no gate; acceptance: roads leaving the walled stage = N, 0 arterials ending inside a wall, 0 outer roads hugging the wall beyond one tower interval. |
| MFP-5 | major | The speed parity claim compares CITY (4 500–6 000 buildings) with MFCG size 80 (13 349–36 480 buildings in 141–278 ms); per building ARCH budgets 40–58 µs against MFCG's 7.6–12 µs, so at equal output PLAT is 4–7× slower (≤ 2 s vs ≈ 0.4 s to first map), and MFCG's size-80 36 000-building cities and sizes up to 200 have no rung. | ARCH §12 table (CITY row cites MFCG size-80 as its bar, l. 1534), per-stage split (S10, S11 ≈ 10 µs/plot each), METROPOLIS 700 ms / 1 s, first map ≤ 2 s; profile-mfcg §7.1–§7.4, EG-3 (buildGeometry ≈ 19.5 ms + 7.5 µs × buildings), EG-8 item 6; EXP 777001 15 392 buildings; posts-a T20 (size 5–200); IMPROVEMENTS O17 (h) names MFCG's 7.5 µs as the budget. Coverage N03 COVERED. | Restate §12 and §13.5's timing row at matched building counts; either budget the city-LOD first map per building near MFCG's order (S1–S9 + block masses first, S10–S11 lazy, consistent with MFP-1) or record the 4–7× trade in D-18 as an owner-visible decision with its reason; define behaviour above METROPOLIS (rung or reported cap); add a matched-count timing row to B-REF. |
| MFP-6 | major | The default walled share (0.35–0.5 of buildings) plus the FTG suburb regime make every one-click town look like MFCG's size-80 shanty case: at TOWN 50–65 % of buildings lie outside the wall and cul-de-sac offshoots fill the wedges between approach roads, replacing MFCG's compact walled town with ribbon extensions. | ARCH §4.2 S2 l. 681–682, D-2 l. 2119 (the share is the seat's addition, not the owner's era default), §4.4 suburb row l. 744, R6. EXP: size-40 defaults 82–98 % of buildings inside the wall; extramural buildings 71–85 % within 100 m of a gate road (median 43–57 m); only the size-80 shanty city is 70 % outside and broad (28 % within 100 m). MFCG shanty towns off by default (devlog 7063); star silhouette "one of MFCG's best readability tricks" (devlogs-a §2.12); FTG preset ≈ 20 % walled (_critic-ftg F15). | Make the walled share a rung row calibrated on MFCG's measured shares (TOWN ≈ 0.85–0.95; lower at CITY/METROPOLIS only with a second or outer enceinte offered by default); keep MFCG's ribbon regime as the default extramural fabric; restrict the cul-de-sac suburb regime to a preset/era row or the shanty toggle; add walled share and extramural ribbon share to §13.5 with EXP baselines (corpus phase recalibrates). |
| MFP-7 | major | Siting places workplaces by score and then puts households on "residential plots", with one `use` per building and no live-in rule, so arterial frontages become workplace strips and interiors residential-only blocks; district typing adds class-typed kinds (craft / patrician / slum, "tanners and poor") that live MFCG dropped — MFCG's "venue mix with residents, no residential wards" semantics survives only as a district-level entropy floor. | ARCH §4.7 S10b l. 867–873, §2.6 Building.use, §2.7 Household.building, §4.5 typing l. 775–779 and kinds §2.5, R5 floor. MFCG creator (6cg1ol via devlogs-a E1.4): gate wards have taverns and shops "and people live there", no purely residential wards except the patriciate, craftsmen lived where they worked; devlog 1579; live taxonomy collapsed to Alleys + specials with feature-named district types (profile-mfcg §4.7, §9.2); IMPROVEMENTS O7/O18 restraints "never modern (single-use / class) zoning". Coverage F05 COVERED at district level only. | Allow a building to carry a dwelling and a workplace (live-in roster rows as the default for crafts and shops) and site live-in households at their workplaces first; add block-level acceptance (share of residential-only blocks in a band, per-block use-mix entropy, share of trade households at their workplace); keep district kinds feature-named and derive rich/poor quarter labels from the prosperity field for naming only. |
| MFP-8 | minor | ARCH quotes MFCG at "≈ 3.7 m/unit" while its exports fix 4.00 m per internal unit and are themselves in metres; B-REF has no MFCG baselines although the exports now provide them, and MFCG's lot areas risk being read as house sizes. | ARCH §1.4 l. 180, §13.5 ("MFCG ≈ 13–14 m across", "river 6.9–18.9 units", only "18.6 lots per block"). EXP: scale bar vs group scale 3.9998 / 3.9998 / 3.9991 m; JSON areas 16.02× SVG; lots-as-buildings median 210–427 m². | Correct §1.4 to 4.00 m/unit citing the exports; add EXP-derived MFCG rows to §13.5 with provenance (gross cover, walled share, ribbon share, district areas, wall vertex spacing, castle area/compactness, plaza area, orientation coherence, wall alignment); label MFCG footprint areas as lots, never as a house-size anchor. |
| MFP-9 | minor | "Buildings never touch the wall" is stated for one unnamed face and is not a hard invariant; the ribbon regime lays plots directly on the arterial with density peaking at the gate, so extramural plots can abut the wall's outer face. | ARCH §4.8 l. 903 setback band, §2.2 glacis face, §4.4 ribbon row l. 743, §5.3 hard suite (no clearance), O8 (b) count only. MFCG: clearance hard-coded inside and outside (8jkf7z via devlogs-a E1.5). Coverage D11 notes "both faces" unstated. | Setback on both faces as a hard invariant (footprints ∩ (band ⊕ setback) = ∅ inside and outside); S10 treats glacis/outer setback as unbuildable and starts ribbon plots beyond it. |
| MFP-10 | minor | The district band (5–15 ha) and the count law (3.5·√(A/10)) contradict each other above ≈ 275 ha of districts (and below ≈ 31 ha); at MFCG-80 scale either rule yields 36–70 district labels where MFCG draws 17. | ARCH §4.5 l. 769–771; arithmetic mean area √(10A)/3.5 ha; EXP size 80: 1 041 ha, 17 districts (median 29 ha); size 40: 5–11 districts. | One consistent law per rung (e.g. band upper = 1.5 × √(10A)/3.5); district labels thinned by LOD priority at city zoom; MFCG's counts as the legibility anchor. |
| MFP-11 | minor | The `greens` toggle kept "as intent" has no defined effect on the greenery rule table (parks fire only in rich/planned districts; modest ones get only an edge green), and MFCG's green spacer in front of an inner castle has no rule. | ARCH §4.2 S0 l. 643–644, §4.9 l. 948; MFCG greens grow park districts independent of wealth (profile-mfcg §2; EXP 4 greens at size 80) and space inner castles (40345972, posts-a T12). | Map the toggle onto the table (on: park rows fire in every band at a floor rate; off: parks and park districts off, yard planting unchanged); add a castle-esplanade row; report the mapping. |
| MFP-12 | minor | MFCG's one-click Features toggles (plaza, temple, shanty town, farms, inner castle) are demoted behind the advanced panel by the ≤ 12-control basic panel. | ARCH §7.8 l. 1299–1302, §4.2 S0; MFCG Generate window (posts-a T21). Coverage A03 is a different gap (per-seed feature choice). | One "features" control group (a checkbox strip counted as one control in the R15 budget) carrying MFCG's toggles. |

**Counts:** 12 findings — 1 blocker, 6 major, 5 minor.

## §3 Findings in detail (failure scenario → evidence → required change)

"EXP" = this seat's executed measurements on MFCG's own exports (`captures/mfcg/exports-2026-09-25/`, five cities:
seed 555001 size 40 with `gates` 0/1/4/9, and seed 777001 size 80 with river, coast and shanty town); scripts and
outputs are listed in §0. JSON units are metres (§0). ARCH line numbers refer to `docs/ARCHITECTURE.md` as read.

### MFP-1 · blocker · At city zoom the plot model plus negative-space ink streets makes the street network unreadable

**Failure scenario.** One-click CITY, default `ink` preset, city LOD (the 5 km frame on a 1 500 px canvas ≈ 3.3 m per
pixel). ARCH draws intramural streets as negative space — `ink`: "negative-space streets inside walls" (§8.2, l. 1354);
city band: "blocks as footprint masses … intramural alleys as unstroked gaps" (§8.5, l. 1386–1387) — and, by the
owner's plot model, draws footprints and yards but never a plot outline as a building (§2.5, §4.7 S11). The listed
colour roles (`paper, ink, water, building, roof, green, tree, wall, road, sand …`, §8.2 l. 1341–1342) include no yard or
block-ground tone, and the `ink` preset (l. 1354) specifies none. From ARCH's own tables:

1. **Yard bands wider than streets.** Dense/poor rows have plot depth 12–20 m (granularity table, §4.7 l. 844). At the
   coverage anchor IMPROVEMENTS O17 (a) cites (FTG 0.51–0.58 per class) a row footprint leaves a 5–10 m rear yard per
   plot, i.e. a 10–20 m paper band down every back-to-back block — 3–6 px at city zoom — while the lanes and alleys S8
   cuts are 3–5 m and 2–3 m (§4.6 step 6), ≤ 1.5 px. The widest paper voids inside the walls are yards, not streets.
2. **Open frontages dissolve the street edge.** Detached (side yards), set-back compound (forecourt), hovel ("a plot
   that is mostly bare yard"), `vacant` and `green` residue (§4.7 S11 table l. 882–889, S10 step 6) all leave the
   frontage open. Inside the walls the only thing that draws a street is the building line, so wherever a frontage
   opens, the yard void merges with the street void.
3. **Half MFCG's ink.** Gross footprint cover inside the wall ≈ coverage × `builtBlockShare` = (0.51–0.58) × 0.62
   (§4.2 S2, l. 679–680) ≈ 0.32–0.36, against MFCG's measured **0.57–0.66** (EXP: 65.7 / 58.2 / 62.1 / 58.3 % at size 40,
   56.9 % at size 80).
4. **The first paint is undefined.** §4.1 emits the city-LOD display list "as soon as S9 commits", with S10–S14 lazy per
   district (l. 623–625), and §8.5 calls it a preview while S10–S13 continue. At that moment no footprint exists, so the
   preview cannot show "footprint masses": it shows either empty blocks or solid blocks that footprints-with-yards then
   replace — the first picture's figure-ground differs from the final one's — or it waits for S11 in every district
   (the lazy tier buys nothing at city zoom). The text specifies none of these.

**Evidence.** MFCG's intramural streets are unstroked gaps — "inside a city they are just gaps between buildings"
(30234656, `mfcg-posts-a.md` T10) — and its draw records stroke only roads, piers and bridges (`profile-mfcg.md` EG-4
correction 1; ST-4). What keeps them legible is that the default Lots mode draws lots edge to edge (ST-7), ≈ 18.6 lots per
block (§4.9), with courtyards as *enclosed* voids (`mfcg-posts-b.md` §2.5): every street is bounded by a continuous ink
edge. EXP gross cover above. IMPROVEMENTS O6 restraint: "MFCG's legibility at a glance came from an exaggerated visual
scale; solve legibility in rendering (O12 symbol scaling), never by distorting the model" — ARCH §8 specifies no such
rendering beyond "minimum symbol sizes (≥ 2 px)" (§8.5). O17 (d) compares only streetwall continuity on dense
frontages; §13.4's "city-zoom legibility check (minimum feature size, contrast)" has no street-recoverability term.
Stated goals that cannot be met as written: the owner's PLOT MODEL ruling ("at city zoom the footprints are what
shows"), D-1 (clean ink, MFCG family) and the legibility floor ("Legibility and one-click usability remain a floor").
Coverage-audit rows G01 and K10 marked negative-space streets and display modes COVERED; this is the interaction they
did not test.

**Required change.** (a) State the city-LOD figure-ground contract in §8.5 and the `ink` preset: built blocks (L2), or
plots (L3), are filled with a `ground` role distinct from `road`/`paper` (MFCG's own role rule: roads, bridges and
squares share the road colour, T10), footprints are drawn over it and yards/gardens by role, so streets and squares stay
the only paper voids — or, as a declared alternative, kerb hairlines are stroked wherever a frontage is open. (b) Define
"footprint masses": the generalisation (e.g. per frontage run, footprints unioned across gaps ≤ the slot width, minimum
mapping unit ≥ 2 px) and make the first paint show the same figure-ground (blocks in the ground tone) so that S10–S11
only refine it. (c) Acceptance on B-ZOOM / O12 (g): street-edge recoverability on rendered city-LOD images (share of
intramural street length with a figure-ground edge on both sides within 1 px) ≥ MFCG's on the EXP renders; a
yard-to-street luminance-contrast floor; gross ink cover inside the walls reported against MFCG's 0.57–0.66. (d) Put
(a)–(c) in M1's exit list, ahead of the owner's side-by-side.

### MFP-2 · major · FTG growth does MFCG's street work at block scale, so the bent cut rarely fires and nothing measures MFCG's street signature

**Failure scenario.** CITY, walled core. S5 grows `secondary` streets and — by the fallback's own wording ("growth stops
at `secondary`; `lane` becomes infill-only", l. 760, applied only if M0 fails on time) — `lane`s too, with steps of
25–40 m and 15–25 m, a minimum separation from parallel spines of 40 m in the core, 60 m in rings and 80 m in suburbs,
and a core regime with "branch prob. high" and a block-depth band floor of 30–45 m (§4.4 l. 720–741). S8 then bent-cuts only faces whose OBB minor extent exceeds the
district's block band floored by that same 30–45 m (§4.6 l. 799–803). Core faces bounded by 40 m-separated grown spines
are already block-sized, so S8 adds at most a last cut; the intramural street pattern *is* the growth pattern — FTG's
fabric, whose creator names the result "most of the settlements in FTG look similar" (112861635, ARCH §1.4). MFCG since
0.10.0 is the opposite: main roads gate → plaza, and every other street is twisted bisection of the *merged district
polygon* — "merge patches and build streets district-wide … an illusion of streets following some kind of underlying
landscape … 'twisted bisection' propagating properties of the outer shape inside" (87882877, `mfcg-posts-b.md` §2.2). MFCG
builds its wall before that bisection, so the fabric inherits the wall's shape; ARCH traces the wall after S5 and S6
(§4.1; GEO-18), so the fabric near the wall is laid before the wall exists and cannot inherit its direction.

**Evidence.**
* ARCH §1.4's "secondary streets" row (l. 182) reads 87882877 as "none as geometry: cell edges are 'an illusion of
  streets'". The quote describes the district-wide bisection streets, which *are* MFCG's secondary network
  (`profile-mfcg.md` §4.9: `WardGroup.createAlleys` = level 1, ward → blocks; `mfcg-posts-b.md` §2.9 on 100431269/03:
  "alleys form a fully connected mesh with mostly 3-valent nodes").
* EXP (executed, `mfcg_orient.out`): MFCG's lot orientations form a coherent field that decays with scale — median local
  coherence R4 (4θ mean resultant) **0.84–0.97 within 60 m, 0.58–0.88 within 120 m, 0.32–0.68 within 250 m**, against
  0.14–0.25 for shuffled angles. EXP (`mfcg_wallalign.out`): lots align with the wall — within 40 m of it the median
  deviation is **3.5–4.5°** and **84–92 %** lie within 15° (random: 33 %), decaying to 56–70 % at 40–100 m and 38–58 % at
  100–200 m. That is the measurable form of "propagating the outer shape inside".
* The creator's warning ARCH itself cites (l. 209–210): road-first plus block subdivision "seems problematic" (31287).
* §13.5 has no MFCG street-fabric row (turn angles and junctions are FTG/NG, blocks NG/FTG; MFCG appears only as
  "≈ 18.6 lots per block"), and the M0 fusion gate scores "block-area and junction-degree distributions … inside the NG
  bands" (§4.4 l. 757–762; §16 M0 c). Coverage row E11 marks the district-wide network COVERED because S5 and S8 both
  exist, not on how the work is split between them.

**Required change.** (a) Fix the division of labour: in walled and core regimes S5 grows only the arterial-connecting
secondary network at district scale (a separation floor of the order of MFCG's measured coherence length, ≈ 120–250 m,
leaving district-sized faces), and every lane and intramural secondary comes from S8's recursive bent cut of the merged
district polygon — make §4.4's time fallback the default there; keep FTG growth for rings, ribbons and suburbs.
(b) Compute the enceinte trace and the water before S8 (GEO-18 asks for the same order for its own reason) so the cut
propagates wall and shore into the fabric. (c) Correct §1.4's row. (d) Add MFCG signature rows to §13.5 and to the M0
gate, EXP as baseline: R4 at 60 / 120 / 250 m, wall and shore alignment by distance band, T/Y share and intramural dead
ends, blocks per ha and lots per block (blocks reconstructed from EXP footprints); run the gate side by side against
MFCG as well as NG.

### MFP-3 · major · Nothing reserves the castle, the main plaza or institution precincts before streets are grown

**Failure scenario.** The MFCG default citadel outside the town (`citadel=1&urban_castle=0`) is ARCH's
`castle: 'on_enceinte'`. S3 picks a scored castle *site* and a temple site "near the plaza" (§4.2 S3, l. 691–696). S4
routes; S5 grows secondaries and lanes at 40 m separation across the whole walled boundary — its legality list
(§4.4 l. 729–734) has no rule that excludes a sited claim. §4.8 speaks of "the S3 claim on the scored site", but S3 outputs only "destinations, castle site"
(stage diagram, l. 613–615) and no stage inserts that claim into L1 before S5 grows through it; the castle claim is
made in S7 ("castle claim", same diagram) and institution claims in S10 ("`claimSubFace` … before ordinary plots are cut … a whole block
only above a threshold share", §4.7 step 3), both after S5 and S8 have cut the ground into street-bounded faces of
≈ 0.16–0.36 ha in the core. MFCG's castle is **2.61–3.36 ha with compactness 0.78–0.82** and its main plaza
**3 580–5 373 m²** (EXP); ARCH's own §4.9 asks for a 0.5–2 ha cathedral close. `claimSubFace(face, requirement)` acts
on one face (§3.4), so a realistic bailey cannot be claimed without crossing grown streets, which no op does. F-CASTLE
then runs "join one more plot → re-claim with a widened OBB → next candidate site → a keep without a bailey" (§5.2
l. 1042): the castle shrinks, moves to another site — changing the town's composition; MFCG never moves it but repairs
its cell in place (`Castle.equalize` on angles, 1–20 iterations, and "Bloating the citadel…", `profile-mfcg.md` §4.4b,
Critic addendum item 2) — or loses its bailey, so a requested citadel is degraded on ordinary seeds. For `on_enceinte`
the S7 trace is pulled up to 40 m to defensible ground and simplified (§4.8 l. 899–903) with no rule that it pass
through the castle; MFCG's castle shares two vertices and the edge between them with the city wall, has exactly one gate
on its town side and a castle street to the plaza (EG-1, EG2-2; EXP castle ring 6 vertices, 1 gate). §5.1 principle 2
asserts "S3 … reserves space for institutions … before any fabric is cut" (l. 1009–1011) — no stage implements the
reservation. The plaza is "at the convergence of the arterials by construction" (S3) and a `square` corridor face "sized
from population" at S9 (§4.7), with no algorithm for its polygon; MFCG's plaza is a compact cell whose corners the gate
streets reach, "the plaza acts as a roundabout" (os-model §6.3 via coverage row E03).

**Evidence.** As cited above; EXP castle and plaza areas (`mfcg_stats.out`); `profile-mfcg.md` §4.4b, EG-1, EG2-2;
`mfcg-posts-a.md` T12 ("it always occupies one cell of the mesh … resize it … using the 'bloat' tool"); coverage rows
D07/D08 (COVERED) and L03 (warp kernel mapping, L).

**Required change.** S3 emits reservations as polygons — castle bailey (area band by rung anchored on EXP 2.6–3.4 ha,
compact: a relaxed cell or rounded OBB with compactness ≥ 0.75 before insertion), main plaza (EXP 0.36–0.54 ha),
temple / cathedral precinct, market — and S4 inserts them into L1 as barrier faces before routing: arterials end at the
plaza's perimeter vertices (a roundabout plaza), the castle street at the castle's single town-side gate; S5 legality
forbids crossing a reservation; S8 skips reserved faces; S7 welds an `on_enceinte` castle into the trace (the trace
passes through two claim vertices, the shared edge is one wall); F-CASTLE repairs in place first (equalise angles, then
bloat the claim polygon — MFCG's order) and re-sites only as a reported last rung; state the castle gate count (1) and
orientation; make the claim polygon the target of the `equalize` / `bloat` edits (MFCG's documented castle-resize
workflow). Acceptance: castle area and compactness inside the EXP band on ≥ 99 % of seeds with a castle requested;
0 ways crossing a reservation; every re-sited castle reported.

### MFP-4 · major · `gates = N` does not give MFCG's roads = gates: extra arterials dead-end at the wall and missing ones become road-less posterns

**Failure scenario.** River CITY, request `gates=4` (MFCG honours an explicit count exactly, EG2). S4 routes arterials
before any wall exists — one per external bearing (a river town gets "a road along each bank", §4.2 S3), plaza ↔ each
crossing site, harbour ↔ plaza, castle ↔ plaza (§4.3 l. 705–707) — say 6–7 of them cross the later trace. §4.8 gates the
top 4 by betweenness and "the excess arterials are cut at the trace and diverted along the outside of the wall to the
nearest gate as a `lane`" (l. 904–908): 2–3 `primary` arterials — the widest ways in the town — end blind against the
inside of the wall, and 2–3 outer roads run along the ditch to a neighbouring gate. The gate → plaza radial reading
breaks where MFCG is strongest. `gates=9` on a site with 5 crossings: 4 "posterns … on the next-ranked secondary
crossings" — gates without an outward road — where MFCG's 9 gates each carry a road (EG2-1: roads = N). `gates=0`:
MFCG gives a sealed city with no road leaving it (EG2-5); ARCH routes the external arterials anyway (S4 precedes S7),
then "N = 0 is honoured as a sealed circuit with a declared postern or watergate" (§4.8) — read literally, a gate the
user did not ask for (at best an ambiguity the text leaves open) — while the S4 arterials still end at the wall.

**Evidence.** `profile-mfcg.md` EG-1 (each city gate at the chord midpoint of its towers, one road out, one street to
the plaza; the castle street core-only), EG2-1/EG2-2 (N exact; nested picks, so a smaller N is a prefix; roads = N;
`aStar` = 2N + 1; a face split guarantees an outward road), EG2-5 (N = 0 sealed, no fallback routine); ARCH §4.3, §4.8,
§5.2 F-WALL ("divert excess arterials to the nearest gate as lanes; if N cannot be met, add posterns"). Coverage row E04
(H) covers the *default* inland case (no rule for how many bearings an unrequested town gets); this finding is the
requested-N case and the geometry it produces. GEO-18 covers secondary crossings created by the pulled trace.

**Required change.** Choose gates before the arterial network: S3 picks exactly N gate sites on the intended enceinte
(sequential nested picks from a seeded order, so a smaller N is a prefix), each gate producing one outward arterial (to
its bearing; bearings derived from the gates when none are requested) and one inward street to the plaza; crossing sites,
the harbour and an outside castle connect through those gates or through water gates instead of adding wall crossings;
posterns are a separate, road-less count; `N = 0` routes no external arterial through the wall and reports the sealed
circuit without adding a gate. Acceptance: roads leaving the walled stage = N exactly; 0 arterials ending at the inside
of a wall; 0 outer roads running along the wall for more than one tower interval.

### MFP-5 · major · The speed claim is anchored on MFCG size 80 but compares a rung with a third of its buildings; at equal output the budget is 4–7× slower and MFCG's large sizes have no rung

**Failure scenario.** §12 sets CITY at 4 500–6 000 buildings, 240 / 300 ms model and ≤ 600 ms to first map, and cites
"MFCG size-80: 125–260 ms model, 170–230 ms Canvas replay" as its reference bar (l. 1534); §12's prose calls these "the
bars MFCG sets". MFCG size 80 is **13 349–36 480 buildings** (`profile-mfcg.md` §7.3–§7.4, EG-3; EXP 777001: 15 392)
generated in **141–278 ms** (profile pass; 151–287 ms draw pass), i.e. **7.6–12 µs per building** — EG-3's fit is
`buildGeometry` ≈ 19.5 ms + 7.5 µs × buildings. ARCH budgets **40–53 µs per building** at CITY and **47–58 µs** at
METROPOLIS (700 ms for 12 000–15 000). In the owner's side-by-side at METROPOLIS (D-5), MFCG size 80 shows ≈ 15 000
buildings in ≈ 0.4 s (model + replay); PLAT is allowed ≤ 2 s to first map for the same count. MFCG's 36 480-building
size-80 city (≈ 220 000 people at 6.12 per building) and its sizes up to 200 ("The minimum size is 5 and the maximum is
200", 47063541, `mfcg-posts-a.md` T20) have no PLAT rung at all: the ladder stops at METROPOLIS ≈ 50 000 people /
15 000 buildings (§12) and nothing says what a larger request does. IMPROVEMENTS R1 fixed the bar only at TOWN; the
lens bar ("size-80 ≈ 200 ms") is neither met nor declared as traded away.

**Evidence.** As cited; `profile-mfcg.md` §7.1, §7.2 (render 170–230 ms at size 80), EG-3 (fit, R² 0.974; "Budget by
building count, not size", EG-8 item 6); IMPROVEMENTS O17 (h) itself names "MFCG's `buildGeometry` ≈ 19.5 ms + 7.5 µs
per building" as the budget, while ARCH gives S10 and S11 ≈ 10 µs per plot *each* on top of S1–S9 (§12 l. 1537–1544).
Coverage row N03 marked the envelope COVERED against "MFCG's bars" as ARCH states them.

**Required change.** (a) Restate §12 and §13.5's timing row at matched building counts (MFCG size 40: 837–1 512
buildings, ≈ 45 ms model for the 1 298-building city in the draw pass — its coverage pass, 76 ms, is instrumentation-
inflated; size 80: 13 349–36 480 buildings, 141–287 ms). (b) Either budget the one-click city-LOD map per
building at MFCG's order — e.g. S1–S9 plus block masses first and S10–S11 lazily per district, consistent with MFP-1's
figure-ground contract, targeting ≤ ≈ 0.5 s to first map at 15 000 buildings — or record the 4–7× per-building trade in
D-18 as an owner-visible decision with its reason (terrain, plots and site plans cost more than lots). (c) Say what
happens above METROPOLIS (a rung, or a cap with a report) so an MFCG size-100–200 request has an answer. (d) Add a
matched-count timing row to B-REF.

### MFP-6 · major · The default walled share and the suburb regime turn every one-click town into MFCG's size-80 shanty case: the wall encloses a minority of the town

**Failure scenario.** One-click TOWN, walls on (R6, §1.2). S2 sets "the walled stage's share of buildings at ≈ 0.35–0.5"
(§4.2 l. 681–682; D-2 l. 2119) and TOWN has 2 stages, so 50–65 % of the buildings are extramural. METROPOLIS adds the
FTG suburb regime — `cul_de_sac` / `lane` offshoots from perimeter spokes "without destination-bias termination
(deliberate dead ends)" (§4.4 l. 744) — which fills the wedges between the approach roads (whether TOWN and CITY also get
it is unstated). MFCG's default (shanty towns "unchecked by default", devlog 7063) at size 40 puts **82–98 %** of
buildings inside the wall, and its few extramural buildings form ribbons: **71–85 %** of them lie within 100 m of a gate
road, median distance 43–57 m (EXP `mfcg_ribbon.out`, `gates` 1/4/9). The "ribbons hugging the radial roads … a clear
star/asterisk silhouette around an oval walled core" is "one of MFCG's best readability tricks" (`mfcg-devlogs-a.md`
§2.12 [SHOWN]). MFCG reaches a mostly-extramural, broad-sprawl picture only at size 80 *with* shanty towns on (EXP
777001: 70 % outside the wall, 28 % within 100 m of a gate road, median 185 m). So PLAT's default town looks like MFCG's
largest shanty case, and the wall — R6's "signature silhouette" — encloses less than half of it.

**Evidence.** As cited; D-2's owner-adopted content is the era (12th–15th c.); the 0.35–0.5 share was added by the
synthesis seat and is vetoable; FTG's own preset is ≈ 20 % walled (`_critic-ftg.md` F15), so neither reference supports
0.35–0.5 for a town.

**Required change.** Make the walled share a rung row calibrated on MFCG's measured shares (TOWN ≈ 0.85–0.95; CITY and
METROPOLIS lower only together with a second or outer enceinte offered by default); keep MFCG's ribbon regime as the
default extramural fabric (plots on the approach roads, density falling from the gate); restrict FTG's cul-de-sac suburb
regime to a preset or era row, or to the shanty toggle; add walled share and extramural ribbon share (within 100 m of an
arterial) to §13.5 with the EXP baselines. Whether medieval extramural growth was ribbon-like is a corpus question for
the calibration phase (PLAUSIBLE here), which can move the rows without code.

### MFP-7 · major · Siting separates dwellings from workplaces and districts are typed by social class, so blocks zone into residential and commercial — MFCG's "no residential wards" semantics is lost below the district level

**Failure scenario.** CITY default. S2 derives households and workplace demand (§4.2 S2, §10.2); S10b places each venue
class by score — "noxious trades downstream and extramural …, mills on water, markets and inns at tier-1 junctions or
gates, wealth near the centre …, frontage class" — and then "households take residential plots by wealth band"
(§4.7 l. 867–873). A building has one `use` (§2.6) and a household one `building` (§2.7); no roster row, arrangement or
rule puts a household in its workplace. Output: arterial frontages become workplace strips and interior blocks become
residential-only — single-use zoning at block scale — while the only guard is a *district-level* "mixed-use floor" /
venue-mix entropy (§4.5 l. 779, R5), which a district with commercial frontages and residential interiors passes.
District typing then adds class-typed quarters — "upstream and upwind on high dry ground → patrician, downstream /
downwind / damp → tanners and poor" and kinds `craft`, `patrician`, `slum` (§2.5, §4.5 l. 775–778) — i.e. the 2017
CraftsmenWard / PatriciateWard / Slum classes that live MFCG dropped (its ward taxonomy collapsed to `Alleys` plus
specials, and district types are named by feature: central, castle, docks, park, bridge, gate, bank, sprawl —
`profile-mfcg.md` §4.7, §9.2), and a second, categorical encoding of wealth beside the continuous prosperity field the
owner asked for ("prosperity is a gradient and a band, not binary").

**Evidence.** Creator (Reddit 6cg1ol via `mfcg-devlogs-a.md` External-sources E1.4): a gate ward holds taverns and
cheap shops "and people live there"; a craftsmen ward also has pubs and churches; no purely residential wards except the
rich patriciate ones, because craftsmen lived where they worked. Devlog 1579: "a craftsmen ward doesn't consist entirely
of workshops". IMPROVEMENTS O7 restraint ("never modern single-use zoning") and O18 restraint ("Mixed use, never modern
class zoning"). Coverage row F05 marks venue mix COVERED by the district-level field; this finding is about the plot and
block level, which F05 did not examine.

**Required change.** Let a building carry a dwelling and a workplace (`uses: [dwelling, workshop | shop | inn …]`;
roster rows flagged live-in, the default for crafts and shops); site live-in households in their workplace buildings
before free households; add block-level acceptance — share of residential-only blocks within a band (placeholder until
the corpus phase), per-block use-mix entropy quantiles, share of trade households living at their workplace; keep
district kinds feature-named (MFCG's live typing) and derive "rich / poor quarter" from the prosperity field for naming
only, not as a typing category that drives rules.

### Minor findings (MFP-8 – MFP-12)

#### MFP-8 · minor · MFCG calibration anchors: the exports give an exact metric scale and ARCH quotes a wrong one; B-REF has no MFCG baselines although they are now measurable

ARCH §1.4 (l. 180) states MFCG uses "abstract units, ≈ 3.7 m/unit derived from the grid (`visual-spec.md` §0.2)".
EXP: the SVG scale bar against the map group's scale gives **1 internal unit = 4.00 m** in three files
(3.9998 / 3.9998 / 3.9991), and the GeoJSON export is **in metres** (footprint areas 16.02× the SVG roof areas;
`roadWidth` 8, `wallThickness` 7.6). §13.5's "MFCG ≈ 13–14 m across at size 25" and "MFCG river 6.9–18.9 units" inherit
the estimate; and MFCG's measured footprints (median 210–427 m², EXP) are *lots drawn as buildings* — the owner's
"illusion of buildings" — so they must never calibrate O6 (b)'s house band. **Required:** correct §1.4 to 4.00 m/unit
citing the exports; add MFCG rows to §13.5 with provenance from EXP — gross cover inside the walls, walled share,
extramural ribbon share, district areas (2.4–17.6 ha at size 40; 2.5–376 ha, median 29 ha at size 80), wall vertex
spacing (p50 88 m at size 40), castle area and compactness, plaza area, lot-orientation coherence and wall alignment;
label lot areas as lots.

#### MFP-9 · minor · "Buildings never touch the wall" is stated for one face and is not a hard invariant; the ribbon regime's densest plots start at the gate

MFCG hard-codes the clearance on both faces, "from the defenders' point of view" (Reddit 8jkf7z via `mfcg-devlogs-a.md`
E1.5). ARCH: "a setback band (MFCG's 'buildings never touch the wall'; O8 b)" (§4.8 l. 903) without saying which face;
the glacis is a declared L3 face (§2.2 rule 1) but S10's ribbon regime lays "plots directly on the arterial" with a
density kernel that peaks at the gate (§4.4 l. 743), and §5.3's hard suite has no clearance invariant (O8 b is an
acceptance count). Scenario: TOWN, stage-2 ribbon plots laid outward from a gate — the first plots abut the wall's outer
face. **Required:** the setback on both faces as a hard invariant (footprints ∩ (wall band ⊕ setback) = ∅, inside and
outside); S10 treats the glacis / outer setback as unbuildable and starts ribbon plots beyond it. Coverage row D11 notes
the missing "both faces"; this adds the invariant and the ribbon mechanism that breaks it.

#### MFP-10 · minor · The district band and the district-count law contradict each other above ≈ 275 ha; at MFCG-80 scale the city view carries twice MFCG's labels

§4.5 (l. 769–771) sets `validatePatch` = area within 5–15 ha "by rung" and a count ≈ 3.5·√(A/10). The implied mean
district area is √(10A)/3.5 ha, above 15 ha once A > 275 ha and below 5 ha when A < 31 ha. For MFCG size 80's 1 041 ha of
districts (EXP) the law gives 36 districts of mean 29 ha, which the 15 ha cap rejects (≥ 70 districts), against MFCG's
17; which rule wins is unstated. At city zoom that is 36–70 curved district labels where MFCG draws 17 (EXP; 5–11 at
size 40). **Required:** one law (a band per rung consistent with the count formula, e.g. upper = 1.5 × √(10A)/3.5),
district labels thinned by LOD priority at city zoom, and MFCG's measured counts stated as the legibility anchor.

#### MFP-11 · minor · The `greens` toggle has no defined effect on the greenery rule table, and MFCG's green spacer before an inner castle is missing

MFCG `greens=1` grows park districts (`ParkGrower`; EXP 777001: 4 greens) independently of wealth, and places greens "in
front of an inner castle to create some space around it" (40345972, `mfcg-posts-a.md` T12). ARCH keeps `greens` among
the S0 toggles "as intent" (§4.2 l. 643–644), but §4.9 gives parks and ornamental grounds only to "rich or planned districts"
(l. 948; modest districts get only an edge green or orchard at the outskirts) and no row reads the toggle: `greens=1` on
a modest seed yields no park inside the town; `greens=0` has no stated effect on the owner-mandated rules. **Required:** map the toggle onto the table (on: park rows fire in every band at a floor rate; off: parks and park
districts off, private yard planting unchanged), add a castle-esplanade / green-spacer row for inside castles, and
report the mapping in the generation report.

#### MFP-12 · minor · MFCG's first-level Features toggles are demoted behind the advanced panel

MFCG's Generate window keeps Citadel, Inner castle, Walls, River, Coast, Temple, Plaza, Shanty town, Farms and Greens
(plus Random) and Small / Medium / Large / Size one click away (`mfcg-posts-a.md` T21). ARCH's basic panel (≤ 12
controls, §7.8 l. 1299–1302) keeps seed, size, water, walls, castle, gates, planned ↔ organic, wealth, greenery, style,
labels and "Surprise me"; plaza, temple, shanty town and farms exist in S0 (§4.2) but sit behind the advanced panel, so
an MFCG-style request ("coastal town with a shanty town and no temple") needs the advanced panel. **Required:** one
"features" control group (a checkbox strip counted as one control in the R15 budget) carrying MFCG's toggles. Coverage
row A03 (which features an unrequested seed gets) is a separate issue.

## §4 What the design already gets right under this lens (keep it through the revision)

* **No whole-city restart** (D-9, §5.1): MFCG restarts on canal failures and on any geometry exception ("bad poly",
  profile-mfcg ST-8; 24 restarts in 58 attempts). Keep the tiered ladders and the report.
* **Keyed sub-streams** (§6.1): in MFCG a change of `gates` re-rolls every ward, building and name inside the same wall
  (EG2-4); ARCH's per-stage, per-entity streams keep the rest of the town. This is a real improvement over MFCG.
* **Per-area reroll that keeps type and shape**: "New random" on a district or face scope re-derives only finer levels
  (§7.3), which is MFCG's Cmd-click ward reroll ("keep its type and shape, but its inner structure will change",
  devlog 19034) made persistent and undoable.
* **MFCG's draw laws as data**: the casing law, round joins, the recorded layer order, curved per-glyph skeleton labels
  with a paper halo, the grid, the old-style scale bar and the 8-ray compass (§8.2, §9), plus protected features so
  labels no longer cover gates and the keep.
* **Continuous zoom and documents**: both fix MFCG's own stated flaws ("no zoom … a big flaw"; no save/load, mfcg-posts-a
  T22).
* **Exact gate counts as a request, the coast bearing as MFCG's `sea` angle, "river through the core" by siting**
  (§4.2, §4.8): keep them, but with MFP-4's order.
* **The plot model itself** (owner ruling): keep it; MFP-1 is a rendering contract, not a request to return to lots
  drawn as buildings.

## §5 How the findings cluster, and overlaps with other lenses

**Cluster A — the city-zoom picture:** MFP-1, MFP-6, MFP-8, MFP-10. One rendering contract (a block ground tone,
defined footprint masses, figure-ground metrics), MFCG-calibrated walled and ribbon shares, and EXP-based parity rows
answer them together. Related coverage rows: K06 (Raised default), I01 (plaza monument).

**Cluster B — what is fixed before the streets:** MFP-2, MFP-3, MFP-4. Most of them go away with one reordering: S3
emits reservations (castle, plaza, precincts) and N gate sites; the enceinte and water are traced before growth; S5
grows only district-scale secondaries; S8 cuts every lane inside the merged district polygon. The same reordering
answers GEO-18 (trace after growth), GEO-19 (harbour, moat and canal carved late) and part of GEO-23 (large residual
court blocks), so the reviser should solve the four together.

**Cluster C — budgets:** MFP-5, together with GEO-2 (wall-clock watchdog changes the model): state the budgets per
building and deterministically.

**Cluster D — semantics and controls:** MFP-7, MFP-9, MFP-11, MFP-12.

| this finding | overlaps (cited, not repeated) | what this finding adds |
|---|---|---|
| MFP-1 | coverage G01, K10 (COVERED); GEO-28 (casing order across tiles) | the plot model breaks negative-space streets; figure-ground metrics; undefined first paint |
| MFP-2 | coverage E11, E12 (COVERED); GEO-18, GEO-21, GEO-22 | the growth / bent-cut split; the §1.4 misreading; MFCG signature metrics (EXP) |
| MFP-3 | coverage D07, D08, D10 (COVERED), L03 (warp mapping, L); GEO-19 | no reservation before growth; castle weld, gate and in-place repair; plaza polygon |
| MFP-4 | coverage E04 (H, default bearings), D13 (COVERED); GEO-18 | requested-N geometry: dead-end arterials, wall-hugging diversions, road-less posterns, sealed N = 0 |
| MFP-5 | coverage N03 (COVERED); GEO-2 | matched-count comparison; per-building budget; no rung above METROPOLIS |
| MFP-6 | coverage F03, H05 (COVERED) | walled share and ribbon share against EXP |
| MFP-7 | coverage F05, F07 (COVERED) | block-level zoning; class-typed district kinds |
| MFP-8 | — | the 4.00 m unit; EXP baselines for B-REF |
| MFP-9 | coverage D11 (note); GEO-38 (band straddles L1) | the hard invariant and the ribbon mechanism that breaks it |
| MFP-10 | coverage F04 | the band / count contradiction and the label count |
| MFP-11 | coverage I04 (COVERED) | toggle-to-table mapping; castle spacer |
| MFP-12 | coverage A03 (different gap) | the Features control group |

**Deliberately not re-raised** (already raised elsewhere at a severity this seat accepts): the warp kernel list
(coverage L03), the legend content (J04), district tints (K12), Raised on by default (K06), the plaza monument (I01),
composite keeps (G05), the coastal open-chain wall (C07), the measure tool (L10), warp across levels (GEO-10), empty
court blocks (GEO-23), bridge angles (GEO-17), canal and harbour carving (GEO-19).

## §6 CONFIRMED versus PLAUSIBLE

**CONFIRMED.** Every quotation of ARCH (sections and line numbers re-checked against the file); every reference fact
cited from a findings passage read in full by this seat (§0); every EXP number (executed on MFCG's exported JSON/SVG —
the 4.00 m unit, the metre GeoJSON, cover, shares, district areas, wall, castle, plaza, orientation coherence, wall
alignment, ribbon distances); and the arithmetic shown inline (per-building budgets, gross cover, the district-law
contradiction, pixel widths at city zoom).

**PLAUSIBLE.** Every consequence for a PLAT town, because no PLAT code exists: the yard-band widths depend on coverage
values the tables have not yet fixed; the growth/cut split depends on S5 parameters that M0 will tune; the zoning outcome
depends on S10b's weights; and the claim that FTG-style growth lacks MFCG's wall alignment rests on ARCH's stage order,
not on a measurement of FTG. The historical reading in MFP-6 (ribbon faubourgs) is left to the corpus phase.

## Fable review (2026-09-27) — A-redteam:mfcg

Reviewer: Fable 5.1, lane fable-review/main/redteam (docs/fable-review/main/redteam.md). Verdict **CORRECTED**: every
finding stands and every one is FIXED in the live design (docs/ARCHITECTURE-VALIDATION.md §R1.1); MFP-1's blocker rating
and MFP-2 / MFP-6's MFCG-ward defaults are confirmed (the owner's item 23, emulation-first, makes MFCG's measured
behaviour the default). One correction to this file's record, none to the design:

1. **MFP-5's premise is wrong in magnitude.** "MFCG size 80 is 13 349–36 480 buildings" and "4–7× slower at equal output"
   rest on MFCG profile runs under option sets (shanty towns, river and coast — this file's own EXP city 777001 carries
   15 392 buildings with shanty on and 70 % extramural), not on the plain size. The size sweep
   (captures/mfcg/exports-sweep-2026-09-25/stats.json) gives 1 475 buildings at size 40, 5 242 at size 80 and 13 091 at
   size 130 (411 at 24), which J19 / J20 and the live §12.2 adopt ("13 349–36 480 size-80 counts of the MFCG profile
   belong to such option sets and are stress comparisons, not the CITY bar"). The finding's direction — the pre-fix §12
   compared CITY with a size of another building count — was right; the declared trade is 1.8× model time at TOWN
   (§12.3), not 4–7×.
2. **Record weakness, not an error:** the EXP scripts' scratchpad was not kept, so the five-city measurements (R4,
   wall alignment, ribbon shares, castle and plaza areas) cannot be re-run byte for byte; the design's baselines now
   come from the size sweep (B20), which agrees with them where the ranges overlap.
3. MFP-10's fix, `N_q = round(1.37 · B^0.267)`, re-derives against the sweep within ± 1.5 quarters at every anchor
   (9.6 / 9 at size 40, 13.5 / 12 at size 80); the 17 districts counted here on city 777001 are the shanty-and-sprawl case.
