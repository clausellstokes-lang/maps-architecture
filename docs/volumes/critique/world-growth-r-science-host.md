# Adversarial review: amendments r and V15 against the science, the host and the owner's rules F1–F16 (seat review/world-growth-science-host)

> Provenance: written by Opus 5.5 under the Fable manager (J392); its findings are weighed by the Fable reviser and critic seats.

Lane `review/world-growth-science-host`, 2026-10-23. Read whole: `docs/design/spine-world-growth-2026-10-23.md` (455
lines), `research/world/formation-ecology-science.md` (1 393 lines), the seam seat's `seam-world-growth-r0.md` §1 and §3;
read in full the parts of `docs/AMENDMENTS-2026-10-23r.md` (3 691 lines) that carry a law, a constant, a budget, a test bar
or a host fact (items 926–934, 942–965, 967–973, 983–988, 992–998, 1007–1015) and of `docs/volumes/V15-atlas.md` (2 122
lines) §1.3, §3.3–§3.6, §6, §10.2; `research/world/formation-ecology-state.md` Part D whole. Host repository
`/home/user/clausellstokes-lang/settlement-engine` at `81f1cd96` (verified `git log -1`), read only. Two primary sources
fetched through the proxy and read for the load-bearing numbers: Peel, Finlayson & McMahon 2007 (HESS 11, Table 1 and §2,
the PDF) and Casson 1951 (TAPA 82, LacusCurtius). Arithmetic re-done by script where a number is load-bearing. Nothing
below repeats a seam-seat ruling (SW-01 – SW-19); its §3 open issues are judged at the end. File r and V15 are not edited.

**Verified and sound (no finding):** the science note's §11 roll-up (every row re-multiplied: formation 0.26 / 1.04 /
2.34 s, live 0.15 / 0.61 / 1.37 s) and file r item 983's totals built on it (840 / 3 350 / 7 700 ms authored; 1 110 /
4 350 / 10 000 ms with a scenario; the caps to ≈ 8 000 ms); the formation grid (4 × 4 fine: 64 k / 256 k / 576 k cells at
1 / 2 / 4 km) and its baked-and-deleted payload with `formation.version` pinning (T-V13-57); the Munk width (A = 3 000
m²/s, β = 2.3 × 10⁻¹¹ → 50.7 km, resolved by the 2 / 4 / 8 km coarse grid); every `KoppenRule` threshold against Peel et
al. Table 1 (A ≥ 18, B < 10 × P_th with 0 / +28 / +14, W < 5 ×, h at 18, C 0 < T_cold < 18 with T_hot > 10, s < 40 and
< P_wwet/3, w < P_swet/10, a ≥ 22, b ≥ 4 months, c 1–3, d < −38, ET > 0, the 0 °C C/D variant, the Cs/Cw tie by the
wetter half-year, the Herberton example 678 mm); the soil table's deci-degree conversions; the square-rig and fore-and-aft
polars, `fairKn` 5, leeway and tack penalties against science §8.1; Casson's with-against ratio (fetched: Alexandria →
Rome 53–73 days, Rome → Alexandria 10–13) behind T-V13-67's 3–7×; the ruins depth law (V04 `formerRiseCmPerCentury` 60 ×
material 0.5 / 0.4 / 1.5 → 30 / 24 / 90 cm per century, inside science §7.1's 0.2–0.5 and 0.5–2 m) and T113-8's s = 0.44;
the V15 warp family (Gastner–Seguy–More flow cartogram, one Poisson solve, v = −∇φ/ρ_t; science §9.2 row 3) and
`ATLAS-7` ≤ 1.5 s at 512² against the science's "seconds at 1 024²"; the whole-program re-sum 476–651 pw. Host facts
verified at their addresses: the layered panel and the anonymous lock (`LayeredConfigurationPanel.jsx:1–35`), the
enforcement at the one generate action (`settlementGenerateAction.js:228–289`), the instant world's tier-blind composer
with the premium gate outside it (`composeInstantWorld.js:47`), `AGE_BY_TIER` (`historyData.js:1111–1118`: thorp 15–300,
hamlet 30–120, village 30–250, town 50–300, city 100–500, metropolis 200–800), the canonize gates
(`campaignWorldPulseSlice.js:385–394`), the world-fact card (`fieldDeclarations.js:159–165`), the draft/canon edit split
(`editSlice.js:342`, `:512–515`), the 4-4-5 calendar (`worldState.js:40–57`), the storm multipliers (`seaLanes.js:119`),
the mode speeds (`modeSpeeds.js:50–63`), the regional relation words (`region/graph.js:665–710`: vassal, patron/client,
allied, trade_partner, hostile, rival, cold_war).

## Findings

1. **Where:** file r item 1007's `WorldCharter` (r:3077–3079), item 953's `WorldEdgeCharter` (r:783–786), item 960 (6)
   (r:1156–1172), T-V13-68 (a) (r:2297); V15 §3.4 (3) (V15:1003–1013), T-V15-2. **Severity:** major.
   **Problem:** "timeless" is asserted, never defined against the world's own `happened` edits, and V13 and V15 now
   disagree on what the charter reads. V13 §3.14.1 lets a `happened` `setField(terrain)` or `rerouteReach` rewrite the
   present heightfield and course, keeping only a `TerrainTrace`; `edgeCharter` reads "the fine DEM's mean at the
   station", the river crossings, the water class and the monthly climate derived from that present ground, so a
   landslide or a re-routed river dated at week 300 changes the charter between week w and w + 520 — the test "identical
   at every week" fails, and T-V13-68 (a)'s list (advances, a flood, a razing, a cover change, a dated surface)
   conveniently omits a `happened` terrain or reach edit. `WorldCharter.ground` says outright "the parent's ground as it
   stands at emission" — dated ground crosses the seam. V15 §3.4 (3) promises the opposite of V13 ("never … anything of
   the neighbour's log after its generation"), while V13 carries the neighbour's always-so overrides painted after its
   generation. F14 ("Edits after generation should not carry over") is read two ways by the two files.
   **Evidence:** V13-world.md:2622–2630 (the verbs: `happened` writes a dated record, the trace keeps the former ground);
   r:783 (`demCm: the fine DEM's mean`), r:786, r:3077, r:2297; V15:1010.
   **Fix:** in item 953 add to `WorldEdgeCharter`'s comment and to item 960 (6): "`edgeCharter` reads the world's
   **timeless state** — the recipe's ops and every `alwaysSo` edit and `Override`, with every `happened` edit's surface,
   course and ground replaced by its trace's former value (V13 §3.14.1) and W3 re-run over that ground for the
   charter's monthly fields — never the present where a dated edit changed it"; widen `WORLD-20` by one coarse march for
   a world holding a dated relief edit along the span (≤ 0.2 / 0.3 / 0.5 s); give `WorldCharter.ground` the same reading;
   add "a `happened` `setField` raising the edge 300 m and a `happened` `rerouteReach` crossing the edge" to T-V13-68 (a)
   and T-V15-2; replace V15:1010's "or anything of the neighbour's log after its generation" by "or any dated fact of the
   neighbour's log (its always-so state at the continuation's generation is read; the owner's F14 is read so: no edit
   made after the continuation's generation ever crosses)", and record that reading as a vetoable J-V15 row.

2. **Where:** file r item 961 §3.2.1 steps 5–6 and 11 (r:1251–1275, 1320–1327), item 955's `profiles` and `erosion`
   rows (r:880–881), T-V13-58 (r:2283), SP-W9 (r:2366). **Severity:** major. **Problem:** the relief is uncalibrated.
   (a) The `profiles` rows give heights in metres, the solver needs an uplift **rate** U in mm/yr "scaled by the closing
   speed"; no conversion is stated, so the Earth anchors (arc 3–7 km, collision 4–8.8 km) never reach the bake. (b) The
   steady state depends only on k_s = U/K; with the table's K (folded belt 3 × 10⁻⁶, shield 10⁻⁶ yr⁻¹, m = 0.45, n = 1)
   and the science's own active-margin U (1–5 mm/yr, science §2.1's calibration table) the steady relief of a 50–200 km
   catchment is 5–39 km (k_s 333–1 667; computed along Hack's law with the talus clip at 37°): physically impossible. (c)
   "the steady state's relief falls with age by the Flint law's steepness" is false — a steady state has no age; an old
   orogen is a decaying transient (U → 0). (d) "U integrated over the scenario's age is the initial surface z₀" gives
   tens to hundreds of km. (e) After a steady-state bake E = U on every channel, so a `weather` op of 10⁴ years over a
   young range lowers channels 10–50 m, not "≤ 2 m" (T-V13-58) or the dialog's "about 1 m" (science §2.1's 0.1 mm/yr is
   a stable-region rate). (f) No spike or test bars the relief height. **Evidence:** r:880 (`profiles` heights), r:881
   (K by bedrock), r:1251–1262, r:1264–1266 (S = (U/K) A^−m), r:2283; science §2.1 (uplift 1–3 mm/yr active margins,
   5–10 Himalaya; erosion ≥ 1 mm/yr in active orogens). **Fix:** in item 955 add `profiles[].upliftMmYr` (collision 5,
   ocean–continent arc 2, ocean–ocean arc 1.5, rift shoulder 0.5, hotspot 0.3, relict 0.05 — PLAUSIBLE, science §2.1) and
   state in step 5 "U = the row's `upliftMmYr` × the profile's shape × (closing ÷ the row's reference closing)"; in step 6
   add "after the fixed point, each boundary's relief is scaled so its crest lies in its row's `heightM` band (the shape
   kept, the Hack statistics unchanged)"; replace the `ageMyr` sentence by "an orogen older than `ageMyr` 30 takes U × e^
   (−(age − 30) ÷ 60 Myr) (anchors: Appalachians ≈ 300 Myr, 2.0 km; Urals ≈ 250 Myr, 1.9 km — PLAUSIBLE)" and z₀ by
   "the isostatic rest height plus the profile's `heightM`"; make the `weather` dialog's sentence computed from E = K A^m
   S on the scope; T-V13-58's ≤ 2 m bar on a fixture with U ≤ 0.2 mm/yr, named; add to SP-W9 and T-V13-58 "the highest
   crest per scenario inside its profile's `heightM` band; the mean land height 500–1 200 m (Earth ≈ 840 m)".

3. **Where:** file r item 961 step 7 (b) (r:1286–1293). **Severity:** major. **Problem:** the sea-level history cannot
   run on the chosen solver. A steady state has no span: re-solving "with the base level at −120 m" shifts every
   z_i = z_r + Δx (U/K) A^−m down by 120 m, so either (whole domain) the whole land drops 120 m and resetting the datum to
   0 drowns every lowland under 120 m, or ("over the exposed shelf" only) no inland valley is cut below 0 and no ria
   forms at the present coast. The science's method is a time-limited run ("for the last cycle's span", science §2.4),
   which file r choice (g) forbids. **Evidence:** r:1286–1293; r:69 (choice (g): "the transient 200-step run never");
   science §2.4. **Fix:** replace "the solver of step 6 runs once more with the base level at `seaLevel.glacialLowM` over
   the exposed shelf for the last stand" by "a bounded transient of `seaLevel.lowstandSteps` (10) implicit Braun–Willett
   steps of `lowstandYr` ÷ 10 (`lowstandYr` 20 000) with U = 0 and the base level at `glacialLowM`, over the cells within
   `riaBandKm` of the lowstand coast (O(N) per step, ≈ 0.2 s at the realm rung inside `formationMs`)"; add the two cells
   to item 955's `seaLevel` row and record in choice (g) that the transient is admitted for the lowstand only.

4. **Where:** file r item 961 step 11 (r:1320–1327), item 983 (g)'s `weather` cost (r:2236). **Severity:** major.
   **Problem:** the `weather` op takes ONE explicit stream-power step of up to 10⁶ years. The explicit update is stable
   only for Δt ≤ Δx ÷ (K A^m); on an alluvial trunk (K 5 × 10⁻⁵, A 10¹⁰ m², Δx 2 km) the limit is ≈ 1 300 yr, so a 10⁵–10⁶
   yr step exceeds it 80–800 ×, and the clamp "no cell below its receiver" then flattens every large river to its
   receiver — the opposite of the "valleys deepen at 10⁵–10⁶ years" the op table promises. The science prescribes the
   implicit scheme, unconditionally stable for n = 1 (science §2.1 step 4). **Evidence:** r:1321–1323; science §2.1
   ("Unconditionally stable for n = 1"). **Fix:** replace "one explicit step of the stream-power law with U = 0 scaled by
   `years` (Δz = −K A^m S^n × years …, clamped …)" by "⌈`years` ÷ 10⁵⌉ (at most 10) implicit steps of the stream-power
   law with U = 0 (the Braun–Willett stack update, z_i = (z_i + F_i z_r) ÷ (1 + F_i))"; in item 983 (g) "`weather` ≤
   `formationMs` ÷ 2 … (one explicit step …)" becomes "≤ `formationMs` (up to ten implicit steps)".

5. **Where:** file r item 955's `cascade.dirtyRiseM` row (r:865), item 971 (b) (r:1828–1838) and its consumer rows,
   T-V13-60 (r:2289). **Severity:** major. **Problem:** the dirty set is not "the whole monthly march". A relief edit
   under 100 m re-marches "only where its coarse cell's mean moved by more than one metre", and one under a metre not at
   all — so the downwind cells keep their former precipitation, the incremental world differs from the same recipe
   re-derived, and replay determinism breaks (science §4.6: the change "propagates strictly to the map edge along every
   affected wind path"). T-V13-60 then asserts two things the coupling contradicts: "every reach outside the stroke's
   watersheds byte-identical" (discharge is runoffShare × (P − E) × area, so lee rivers change) and "re-solves that basin
   alone (the other basin's currents byte-identical)" (a land↔water edit changes the thermal term's land–sea contrast
   within `landFetchKm` 3 000 km and the convergence zone's swing, hence every month's wind stress over every basin).
   **Evidence:** r:865; r:1830–1838; r:1380–1388 (step 5 reads the land fraction within `landFetchKm`); T-V13-35 (the
   discharge law); science §4.6. **Fix:** item 955's row becomes "`cascade.dirtyRiseM` | 0 | any change of a coarse
   cell's mean height or of any cell's water re-runs the twelve marches whole and every basin (≤ `WORLD-19`); a live
   brush may preview a local re-march during the drag, the commit runs the whole" (SP-W10's fallback already says so);
   item 971 (b) drops "whose change exceeds `climate.cascade.dirtyRiseM` …"; the consumer row adds W4's discharge, the
   endorheic lakes' balance and the table over every cell whose P − E moved; T-V13-60 replaces the two byte-identity
   clauses by "every reach's course outside the stroke's watersheds byte-identical, its discharge re-derived" and "a
   strait op re-solves every basin; the far basin's currents within 2 % of their former values".

6. **Where:** file r item 962 steps 2, 3, 5, 6 and 6b (r:1348–1440). **Severity:** major. **Problem:** W3 is circular
   and no order is stated: step 2's monthly temperature reads `maritime` (step 3) and `sstAnomalyDeciC` (step 6b);
   `maritime` comes from the march (step 6), which needs the month's winds (step 5); step 5's thermal term needs the
   month's land–sea temperature contrast (step 2); 6b's currents need step 5's wind stress. The only ordering given is
   "the first month's march runs with the last month's winds as its start". An implementer must invent an iteration,
   and two implementations will not be byte-identical (V13 §3.17). **Evidence:** r:1351–1355 (step 2 reads `maritime`
   and the anomaly), r:1359–1363, r:1384–1386 (the thermal term reads the contrast), r:1425–1440. **Fix:** add to item
   962 a step 1b: "**The order (one fixed pass, no iteration):** (i) a first temperature with `continentality` by the
   distance rule (`continentalityReachKm`) and no anomaly; (ii) the winds of every month from (i); (iii) the currents and
   `sstAnomalyDeciC` from (ii); (iv) the twelve marches with `maritime`; (v) the final temperature from `maritime` and
   (iii) — the winds are not recomputed from (v)"; and a T-V13-59 clause "W3 runs (i)–(v) once (a log assertion)".

7. **Where:** file r item 962 steps 5 and 6b (r:1380–1440), item 955's `belts` row (r:862), file r choices (c)–(d)
   (r:84–90), T-V13-59 (r:2284). **Severity:** major. **Problem:** the scale argument file r applies to the monsoon
   applies equally to currents and is not applied. A subtropical gyre spans ≈ 15°–45° (science §4.4) and is driven by
   the wind-stress curl between the trades and the westerlies; a realm (≈ 7° of latitude) or a province cannot make one
   — it receives one from an ocean larger than the map, exactly as choice (d) rules for the monsoon. As written the
   basin solve runs on the map's own partial sea with ψ = 0 on the mainland coast and NO stated condition at an open map
   edge, so a realm's sea becomes a closed box with a spurious western boundary current; the cold-upwelling desert coast
   and the sail asymmetry (F4) then follow an artefact. The same leak defeats choice (d): A_I takes "the column's land
   fraction within `landFetchKm` (3 000 km)" — mostly off-map at the realm rung — so a land-heavy realm swings the
   convergence zone toward 22° and its belts reverse its winds seasonally without any thermal term, contrary to
   T-V13-59's "nowhere on the realm-rung fixture without `worldContext.monsoon`". **Evidence:** r:1382–1384 (A_I by land
   fraction), r:1426–1430 (ψ = 0 on coasts; no edge condition), r:862 (`itczSwingLandDeg` 22, `landFetchKm` 3 000); science
   §4.3 (the scale fact), §4.4 (gyre latitudes; the rule-based coast-facing method). **Fix:** add to item 962 (6b): "at
   the realm and province rungs the open ocean beyond an edge is `WorldRecipe.worldContext.ocean` (per open edge: the
   basin side the map's coast faces and its latitude span; default: the map's coast is the eastern boundary of a basin
   to its west in the westerlies' latitudes and of none in the trades'); the coast's anomaly and along-shore current
   then come from the rule-based coast-facing table (science §4.4's first method) and the solve runs only over enclosed
   seas wholly inside the map; at an open edge ψ takes the context's value (a Dirichlet row) — never a wall"; in step 5:
   "the land fraction beyond the edge is the world context's (the ocean's share by default), never the map's own land
   extrapolated"; add both to T-V13-59.

8. **Where:** file r item 955 `maritime.efoldKm` 400 (r:866) against T-V13-59 (r:2284). **Severity:** major.
   **Problem:** the test fails by construction: the maritime fraction 500 km inland is e^(−500/400) = 0.29, but the bar
   asks "> 0.8". (0.8 at 500 km needs an e-folding length of 2 240 km, which would leave an east coast maritime and break
   the bar's second clause.) **Evidence:** r:866, r:1360–1361 (the law), r:2284. **Fix:** T-V13-59's clause becomes "the
   maritime fraction 500 km inland on the west coast is e^(−500 ÷ `efoldKm`) ± 0.02 (0.29) and at least 3 × the value 50
   km inland on the east coast of a fixture whose upwind land fetch there is ≥ 1 000 km (≤ 0.10)".

9. **Where:** file r item 963 (a), the classification path (r:1475–1490). **Severity:** major. **Problem:** the
   twelve monthly temperatures are "bilinearly sampled from the coarse climate raster", whose lapse was applied at the
   coarse cell's mean height; no fine-cell lapse is re-applied, and the dem-based alpine override is now "the import's
   only". Inside an 8 km continent-rung coarse cell the relief can reach 2–3 km — 13–20 °C at 6.5 °C/km — so peaks are
   classified with the valley's climate: the treeline override (months above 6.4 °C) and ET/EF on mountains are wrong
   exactly where the owner will look. **Evidence:** r:1475, r:1484–1485; V13-world.md:1488 (lapse on the coarse dem);
   science §4.1 (lapse 6.5 °C/km), §5.2 (the treeline). **Fix:** in item 963 (a) after "(bilinearly sampled from the
   coarse climate raster)" add "and moved to the fine cell's height: T_m,fine = T_m,sampled − `lapseDeciCPerKm` × (dem_fine
   − dem_coarse,sampled) ÷ 1 000 m (the coarse temperatures sampled with the coarse heights they were lapsed at)"; add to
   T-V13-61 "a 3 000 m peak inside a 1 000 m-mean coarse cell reads alpine or E".

10. **Where:** file r item 954's `PnvRule` comment (r:834) and item 955's `rows` (r:914); item 963 (a) (r:1478–1483).
    **Severity:** major. **Problem:** the classification emits Peel et al.'s 30 classes, but the potential-vegetation
    table maps only 25: `Cwc`, `Dsa`, `Dsb`, `Dsc` and `Dsd` have no row and no fallback, so W5's `biome` is undefined
    for reachable cells (a summer-dry cold climate is what a Mediterranean-latitude range produces). T-V13-61's "every
    class of the table is reached" checks the wrong direction. Also the arid threshold is written "2 × MAT + the factor"
    beside deci-degree temperature cells: with MAT in deci-°C the threshold is ten times too high. **Evidence:** Peel et
    al. 2007, p. 1636 ("30 possible climate types … 12 cold (Dsa, Dsb, Dsc, Dsd, …)", "Cwc"), fetched; r:914; r:907.
    **Fix:** add the rows "`Cwc` → `tropicalSeasonal` (highland); `Dsa`, `Dsb` → `temperateForest` (`dryMargin`
    `temperateGrass`); `Dsc`, `Dsd` → `boreal`" and to W5 "a class without a row is refused at registration (a lint over
    `world.pnv` against the classifier's 30 outputs)"; T-V13-61 adds "every one of the 30 classes has a row"; item 955's
    KoppenRule row: "the threshold 2 × MAT (MAT in °C, `tempDeciC` ÷ 10) + the factor".

11. **Where:** file r item 965 "What the host gets" and "Laziness" (r:1614–1621), item 950 (r:710), H33 (r:2374), item
    970 (c) (r:1786–1788), against T-V13-67 (r:2305). **Severity:** blocking. **Problem:** the canon's water metres —
    which the host prices by its own sea speed — are redefined as "the symmetric mean over the twelve months and both
    directions of the `sail` kind" of effort-metres (length ÷ ground-speed share, × `closedRisk`). That changes every
    host sea time the day M-W9 lands, before and without the host adopting anything (H33 even says "the symmetric mean
    (what the canon's water metres carry) where it does not"), which is a simulation change the host has not chosen, and
    it contradicts file r's own T-V13-67 ("the canon's water metres and `TravelEdge` are byte-identical before and after
    sail routing lands"). Two definitions of the mean also coexist: "one annual-mean run per leg" on the one-click path
    (a monsoon's annual-mean wind is near calm) against the mean of twelve monthly efforts both ways. **Evidence:**
    r:1614–1617, r:1620–1621, r:710, r:2374, r:2305; V13-world.md:735–736 (`stations`, `openSeaM`, `coastalM` are water
    METRES "in their own lane"); host `seaLanes.js:237` (symmetric lanes priced by the host). **Fix:** item 965:
    "`TravelEdge`, the canon's water metres and `WorldRoute.stations`, `openSeaM` and `coastalM` stay GEOMETRIC water
    metres, byte-identical to today; `routeFacts` offers beside them, per host water edge, the directional seasonal
    efforts by vessel and their symmetric mean (the mean of the twelve monthly efforts both ways), which the host reads
    only behind its own switch (H33)"; the one-click path computes no sailing leg; H33's "the symmetric mean (what the
    canon's water metres carry) where it does not" becomes "its own lanes, unchanged, where it does not".

12. **Where:** file r item 955 `months.closedRisk` (r:932), item 965 (r:1606), H33 (r:2374). **Severity:** major.
    **Problem:** a map-side winter multiplier (the winter quarter 2.0, shoulders 1.3) is a second storm season. The host
    already multiplies sea legs by season (spring 1.3, summer 1.0, autumn 1.5, winter 2.5) and H33 multiplies "its storm
    season on top" — a winter crossing costs 5 ×, twice the historical penalty — against J391's reading "deterministic
    fields, no random weather (storms stay the host's storm season)". The row is also calendar-fixed (the host has no
    hemisphere, `worldState.js:40–57`), so a southern-hemisphere world closes its summer sea, and it is uniform by
    latitude, though the closed season the anchor describes is the Mediterranean westerlies' (Vegetius, science §8.4),
    absent in the trades and monsoon belts where windows must "emerge". **Evidence:** r:932; host `seaLanes.js:119`;
    science §8.4. **Fix:** remove `months.closedRisk` from every effort offered to the host; keep it, if at all, as a
    standalone world's storm row ("on a standalone world only, in the local hemisphere's winter, over the westerlies'
    band; on a host-bound world the host's storm season alone"); T-V13-67's "the month set's closed quarter multiplies
    by its risk" is scoped to standalone.

13. **Where:** file r item 953 `SettlementFacts` (r:751), item 970 (b) `campaignFacts` (r:1767–1769), item 932 (a)
    (r:244–247), H31 (r:2372). **Severity:** major. **Problem:** "based off of my settlements" asks the host for facts it
    does not hold. H31 and `campaignFacts` list "lake and coast side" among what the host sends; the host has no coast
    side, no lake and no latitude on a settlement (state note D.8: "no climate, latitude or biome field"; a search of
    `src/data`, `src/generators`, `src/domain` finds no coast-side field and a lake only as the frozen spatial canon's
    shore sub-digest of its own map, `steadingTopography.js:236–312`, not a dossier fact). Coast side and lake are the
    base's DR1 outcomes of a generated site, not host inputs. **Evidence:** r:751, r:1768, r:2372; state note D.8;
    `ARCHITECTURE.md:12940` (DR1 resolves "coast and its side … lake" from `site.terrain`, `site.access`, the water
    deposits). **Fix:** H31 and item 970 (b): "each settlement's tier, population, terrain word, route word, culture and
    resources" (drop "lake and coast side"); item 953: `lake?` and `coastSide?` documented "read from the settlement's own
    base document where one exists (its DR1 site, `Recipe.charter`), else absent — the row then `random`", and
    `riverInflow?` likewise.

14. **Where:** file r item 969 (r:1723–1737), item 953's `Conflict.preview` and `Decision.kind` (r:756–758), item 970
    (c) (r:1777–1781), H32 (r:2373). **Severity:** major. **Problem:** the approval F8 asks for is not informed of what
    the host will do. In the host a terrain change is a generation input: on a draft it re-derives the settlement through
    the layer and "re-rolls the settlement under the same-seed law: its people, trades and history are drawn again" (the
    host's own warning, `autoplacement.js:553`); on a canonized settlement plain edits are refused and the edit waits as
    a decree "applied at the next advance". File r's preview offers only "the dossier fields that would change, whether
    the host's economy or food would feel it" and `settlementMap: 'nothing'`; its default kind `landChanged` is "a dated
    host event from this week" — no draft has a dated path, and a canon decree lands at the next advance, not this
    week; H32 files the canon decree under `alwaysSo` though it is the dated path. **Evidence:** r:1734–1740, r:756,
    r:2373; host `autoplacement.js:545–553`, `editSlice.js:342` (`canon_locked`), `:512–515`. **Fix:** item 953
    `Conflict.preview` gains `hostEffect: 'reroll' | 'decreeAtNextAdvance' | 'unknown'` (from the host's phase, sent in
    `campaignFacts`); item 969's preview sentence adds "and what the host will do: on a draft, a regeneration of the
    settlement (its people, trades and history drawn again — the host's own words, shown verbatim); on a canonized one, a
    decree applied at the next advance"; `updateDossier`'s kinds offered by phase — a draft: `alwaysSo` only; a canonized
    settlement: `landChanged` (the default, dated at the advance it applies) or `alwaysSo` where the host admits a retcon
    — and H32's parenthesis rewritten to "a draft's plain edit under `alwaysSo`; a canonized settlement's decree at the
    next advance under `landChanged`".

15. **Where:** file r T-V13-64 (a) (r:2295), item 960 (7) (r:1173–1180), item 934 (c) (r:286–288). **Severity:** major.
    **Problem:** two equalities the mechanism cannot deliver are made acceptance bars. (a) "generated at once with
    `include` set equals, at every coarse cell, the same fixture generated standalone and then its twelve settlements
    placed one by one by the best form": the at-once run widens a random latitude box, lays planned sites and adds W1 ops
    for them (r:1150–1156), while the in-sequence run is under least-change ("change nothing that exists") and steps back
    only where no site is lawful — different goals, different worlds. (b) "the preview's coarse run equals Generate's
    fine run at every coarse cell": W1's `mask`, `smooth`, clamps and W2's flood do not commute with the 8 × 8 block
    mean. **Evidence:** r:2295, r:1176–1178; spine §4.4 (goal 3 applies "when a world exists"). **Fix:** T-V13-64 (a)
    becomes "both paths meet the same requirement set with identical verification statuses (every row met / partly /
    unmet alike) and each path is byte-deterministic; the preview's coarse classes agree with Generate's block-majority
    classes on ≥ 95 % of coarse cells and the two reports are identical"; item 960 (7)'s "gives the same world at every
    coarse cell" becomes "gives the same report and the same coarse classes within T-V13-64's tolerance".

16. **Where:** file r item 960 (7) (r:1176–1178), item 983 (e) and `WORLD-16` (r:2214–2216, r:2245). **Severity:**
    major. **Problem:** the preview "runs W0–W5 on the coarse grid alone (the formation op on its own grid …) inside the
    preview budget (≤ 300 ms at the realm rung)", but the formation op alone costs 270 / 1 000 / 2 300 ms (science §11;
    item 983 (a)) against `WORLD-16`'s 120 / 300 / 700 ms; every hover over a scenario knob re-runs it ("an option change
    re-runs from the earliest stage it affects"). **Evidence:** r:1177–1178, r:2189 (formation 270 / 1 000 / 2 300 ms),
    r:2215–2216. **Fix:** item 960 (7) and `WORLD-16`: "the preview ≤ 120 / 300 / 700 ms when no formation knob changed
    (the bake cached by (scenario, knobs, seed) and shared with Generate); a formation knob's change ≤ `formationMs` +
    the preview, with a progress strip and the last bake's thumbnail shown meanwhile"; T-V13-70 measures both.

17. **Where:** file r head (r:9) and item 936 (r:341–347); V15 §1.3 (V15:209–225). **Severity:** major. **Problem:**
    the owner's rules F10–F16 are not carried in full, and F16 by nobody. File r enters only F1–F9 as owner-rule items
    ("F10–F16 are the V15 seat's"); V15 §1.3 quotes F10, F11, F13 and F15 with ellipses and omissions — F10 loses "The
    relational scale predominant in medieval and renaissance in some ways disregard north south west etc, and" (the
    orientation clause) — and says "The rules F1–F9 and F16 are seat A's" (V15:223), while file r says F16 is V15's
    (r:9). F16 appears verbatim in neither. **Evidence:** a verbatim search of each J392 quote (normalised quotes and
    whitespace) in both files: F10, F11a, F13, F15, F16 not found; F11b, F12, F14 found in V15 only. **Fix:** add owner-
    rule items 1029–1035 to file r (after item 934's form; next free per SW-19), F10–F16 each quoted whole from J392
    with typos kept and its reading cited to spine §10–§11, §13 and to V15; item 936's "items 926–934 likewise (… F1–F9 …)"
    becomes "items 926–934 and 1029–1035 likewise (… F1–F16 …)"; V15 §1.3's column carries each rule whole (or cites the
    item) and its last paragraph reads "F1–F9 are seat A's; F16 is the pass's own (file r item 1035)".

18. **Where:** file r item 992, V09 §4.22 (2) (r:2650–2660) against item 930 (b) (r:206–212), item 954's `PresetRule`
    (r:844) and item 955's `options` (r:943); the spine §6. **Severity:** major. **Problem:** F5 names three
    preconfiguration options, "random all, basic, advanced"; V13's own `PresetRule` groups them `basic | advanced | deep`
    (with Random all a button), as the spine and item 930 do — but V09's panel is "Basic · Detailed · Expert · the DM's
    physics toolbar", drops Deep constraints (sketching, pinning, heightmap import, regional locks) and moves the
    inclusion chips to Basic, where `PresetRule` files them under advanced (biomes). The UI the owner will see does not
    use the owner's words and disagrees with the semantics V13 owns. **Evidence:** r:2652–2656; r:943 ("**basic** … ;
    **advanced** … biomes (… the inclusion chips …); **deep** …"); r:206–212; PROGRESS J392 F5. **Fix:** item 992 (2)
    becomes "Four layers: **Random all** (the one button, the seed shown) · **Basic** · **Advanced** (collapsible groups
    each with random and reset) · **Deep constraints** — exactly `world.presets`' groups (V13 §2.3) — and the DM's
    physics toolbar beside them"; the inclusion chips stay in Advanced (biomes) with the include toggle in Basic, or
    `PresetRule` moves them to `basic` — one of the two, stated once.

19. **Where:** file r item 963 (5) (a) (r:1525–1534), item 955 `use.*` (r:919–921), T-V13-62 (b) (r:2302).
    **Severity:** major. **Problem:** the cover law's catchment cannot hold the demand it computes, and its test fails by
    construction. A 10 000-person seat demands 75 km² of fields, 75 of pasture and 75 of coppice (`cropShare` +
    `fallowShare` 1.0, `pastureShare` 1.0, `woodlandShare` 1.0 × 0.75 ha); the one-hour disc at 5 km/h holds 78.5 km² of
    which only the eligible share (science §6.1: 30–50 % arable → a 7–9 km radius) can be fields, the frame's own extent
    excluded — so "clears ≈ 75 km² of fields within its catchment hour" cannot pass, and pasture and coppice, assigned
    "next out to `catchmentHours`", get nothing for any seat above ≈ 3 000 people. **Evidence:** r:1528–1534, r:919–921,
    r:2302; science §6.1 ("a disc of radius 7–9 km"), §6.2. **Fix:** item 963 (5) (a): "fields by ascending travel time
    until met (no time cap; a shortfall reported past `fieldHoursMax` 2), pasture and coppice next out to
    `catchmentHours` × 2"; item 955 adds `fieldHoursMax` 2 and sets `catchmentHours` the pasture limit; T-V13-62 (b):
    "clears ≈ 75 km² of fields, inside a radius of 7–10 km at the fixture's eligible share".

20. **Where:** file r item 963 (5) (a) "withdraws its use" (r:1534–1536), T-V13-62 (a), T-V13-71. **Severity:** minor.
    **Problem:** the "pure function" of (potential vegetation, last dated event, elapsed weeks) hides a fold: a cell's
    withdrawal date is "the window at which its seat's population fell", which needs the catchment fill at every prior
    window; a dropped cache rebuild therefore replays the whole history (300 years of weekly windows) with no budget.
    **Evidence:** r:1534–1536; r:2302 (a); `WORLD-17` budgets one plate. **Fix:** "a seat's use is withdrawn only by a
    dated host event (razing, plague, abandonment) carrying the population after it (H34): the cells beyond the new
    demand take the event's week and kind; a population change without an event moves the use and dates nothing"; add
    to `WORLD-17` "a dropped cache rebuilds in ≤ 2 s at the realm rung (one fill per dated event)".

21. **Where:** file r item 954 `CoverRule.recovery[].soilReset` (r:837) and item 955 (r:923). **Severity:** minor.
    **Problem:** `soilReset` (alluvial, ash, young lava) is read by no law. If it writes `soil`, a baked formation raster
    becomes dated — and with it W6's habitability (a stage input) and the edge charter's `soil`; if it does not, it is
    dead data. **Evidence:** r:837, r:923; item 963 (5) (c) never names it; science §3.5 (these are dated events).
    **Fix:** item 954: "`soilReset?`: the cover class's fertility reading inside the cover plate only (read by the cover
    fold's eligibility and `SettlementPhysical.soil`'s dated note), never written to `WorldRaster.soil`".

22. **Where:** file r item 996 "Whether" and "How large" (r:2768–2780). **Severity:** minor. **Problem:** (a) p reaches
    1 at A ≥ 1 200 years; the science's anchor is 0.6–0.8 for a continuous region and 0.2–0.4 after a collapse (§7.2) —
    the reset arm gives 0.5. (b) The draw is calibrated on predecessors (§7.2) but applied to the town's own debris
    (§7.1, deterministic in age), and its composition with V04 §3.5.0a's ruin system (an older civilisation's remnant,
    DR30, fed by the host's `ancientRuin`) is unstated. (c) `ageTierBonus` keys TOWN, CITY, METROPOLIS only. (d) For the
    owner: with the host's `AGE_BY_TIER` auto ages no thorp, hamlet, village or town ever reaches `ageMinYears` 300, a city
    at most p 0.22, and a stone stratum is walkable (V04's 190 cm headroom) only after ≈ 630 years — F3 is dark for most
    default settlements. **Evidence:** r:2768–2780; science §7.2; host `historyData.js:1111–1118`; V04-underground.md:632,
    1366. **Fix:** p = clamp(…) × `agePMax` (0.8) × the continuity factor (`ageResetFactor` 0.4); add "where II.7.6's ruin
    system (V04 §3.5.0a) lies under the same nucleus, the age strata lie above it, union of extents, deepest floor wins";
    `ageTierBonus` gains THORP, HAMLET, VILLAGE 0; and a line to the owner (V13 §11) that F3's ruins appear under default
    ages only for metropolises.

23. **Where:** file r item 954/955 `crust` (r:824, r:879), item 961 steps 2 and 7 (b) (r:1236–1240, r:1290–1292).
    **Severity:** minor. **Problem:** the "isostatic rest height" needs crust and mantle densities, which `crust` lacks;
    the rebound needs "the former ice thickness", which the flux-based ice mask never computes. **Evidence:** r:879;
    science §1.1, §1.6 (2.7–2.8, 2.9–3.0, 3.3 g/cm³), §2.4. **Fix:** `crust` gains `densityContinental` 2.75,
    `densityOceanic` 2.95, `densityMantle` 3.3 (physics); step 7 (a) writes "an ice thickness H = (flux ÷ width)^½ ×
    `iceThicknessCoef`" or step 7 (b) reads "the ice extent × `reboundMaxM` (300)".

24. **Where:** file r item 961 step 2 (r:1230–1233). **Severity:** minor. **Problem:** "a phantom margin … (the halo a
    neighbour generated later continues through its edge charter)" is false: the margin's seeds, velocities and
    boundary classes are deleted with the block set (F1, T-V13-57), and the charter carries landform profiles only — a
    departure from science §1.3 and §10.1, which keep the margin for neighbours, made silently. **Evidence:** r:1231–1233;
    r:786 (no plate in the charter); science §1.7 ("the phantom-plate margin" survives). **Fix:** replace the parenthesis
    by "(deleted with the block set; a neighbour generated later continues only the landforms that reach the edge, as
    fixed profiles, V13 §3.1 (6))" and record the departure in J-V13.107's reason.

25. **Where:** file r item 953 `WorldEdgeCharter.currents` (r:785), item 960 (6) (r:1161–1163). **Severity:** minor.
    **Problem:** one `psi` array seeds twelve monthly solves; and the continuation's blend "over the margin" names no
    width at world scale (V13 §3.11.2's band is a frame's 2 000 m), where science §10.2 asks 8–16 coarse cells.
    **Evidence:** r:785, r:1161; science §10.2. **Fix:** `currents?: { psiMonth: Float32Array[] /* twelve */ }`; item 960
    (6): "over `solver.edgeBlendCells` (8 coarse cells) inward".

26. **Where:** file r item 983 (b), (f), (g), (h) (r:2193, r:2219–2226, r:2236–2249). **Severity:** minor. **Problem:**
    budget and memory arithmetic. (a) W3's law "12 × `cycles` × 30 ns × 4 × the basins' cells" gives 115 / 461 / 1 037
    ms at half ocean, four times the row's 29 / 120 / 260. (b) `WORLD-19`'s "a basin's current re-solve ≤ 10 / 40 / 90
    ms" is below W3's own full solve for a one-basin world. (c) The monthly arrays at 144 k coarse cells are 24 + 24 + 24
    + 12 + 24 + 4 B ≈ 16 MB, not ≈ 14, at a line with zero headroom; the fallbacks save 1.7 MB (precipitation as Uint8)
    and 5.2 MB (winds as a band table), not 3.5 each. (d) `WORLD-18`'s 0.5 ms per sailing leg is the science's figure for
    a cell graph; tack penalties need the heading in the state (16 ×). **Evidence:** r:2193, r:2219–2226, r:2237, r:2249;
    science §4.4, §8.6. **Fix:** (a) drop "× 4"; (b) "≤ the W3 currents row × the basin's share of the ocean cells"; (c)
    "≈ 16 MB … `WORLD-5` reads 302 MB, over the line until the first fallback (−1.7 MB) and the second (−5.2 MB)"; (d)
    `WORLD-18` "≤ 2 ms per leg over (cell, heading) states, a lane's set ≤ 150 ms", measured by T-V13-70.

27. **Where:** file r item 965 (r:1596–1606), item 955's `vessels` (r:928–930). **Severity:** minor. **Problem:** the
    current enters as a scalar along-track share; the science's law is the vector sum with the cross-track part crabbed
    out (§8.2); a step whose share is ≤ 0 (a 2–2.5 m/s boundary current against a 3–4 kn hull) has no rule; the coastal
    kind's `maxDaysFromShore` is unset though the law reads it. **Evidence:** r:1600–1606; science §8.2. **Fix:** "the
    ground speed solves the heading whose water velocity plus the current tracks the step; a step no heading can make
    good at `minGroundShare` (0.1) is impassable that month"; the coastal row gets `maxDaysFromShore` 1.

28. **Where:** file r item 984 (a)'s B-CLIM (r:2263) and SP-W10's bar (r:2367). **Severity:** minor. **Problem:** "within
    20 % of the analytic answer" — no analytic answer is named; a march's rain shadow on a synthetic fixture is
    otherwise checked against itself. **Evidence:** r:2263, r:2367. **Fix:** name it: "the lee's depletion against
    1 − e^(−H/H_w) with H_w 2.25 km (a 2 km ridge removes 55–60 % of a saturated column) and the windward/lee ratio in
    4–10 (Cascades 4.5, Olympics 8); the upwelling coast under 250 mm/yr" (science §4.5, §4.4).

29. **Where:** V15 §3.6 (1) (b) numerics (V15:1128–1146), `ATLAS-7` (V15:1688). **Severity:** minor. **Problem:** the
    Poisson solve's boundary condition is unstated; with the border vertices fixed the flux through the border must be
    zero (Neumann, ∂φ/∂n = 0, as the cosine-transform form of the flow method implies), which is solvable only if ρ̄ is
    the mean over the padded grid; and the law counts four bilinear reads per integration step where a fourth-order step
    takes four velocity evaluations of three reads each. **Evidence:** V15:1132–1144; V15:1688. **Fix:** add "∂φ/∂n = 0
    on the padded border; ρ̄ the mean over the whole padded grid"; `ATLAS-7`'s law "12 ns × cells × (passes + 12 × steps)",
    the budget re-checked by SA3.

30. **Where:** file r item 961 (a)'s `weather` row and step 11 (r:1202, r:1320). **Severity:** minor. **Problem:** a
    `weather` op's baked delta is "added to the working raster after the ops before it" on every later run and never
    re-run, so an edit to an earlier op (a reroll of the template's noise) lays the old delta's carved channels on new
    ground, silently. **Evidence:** r:1202. **Fix:** "a `weather` op whose input ground (the hash at its position) moved
    is reported `W_WEATHER_STALE` and offered for a re-bake on the fork; its delta is kept until the DM chooses".

31. **Where:** file r item 988's Q5 recommendation (r:2559–2563). **Severity:** minor. **Problem:** "every layer free
    to read and set and every one-click generation free at every rung" departs from the host's standing anonymous rule
    (§934.34: "only hamlet, village, and town … and only with everything on random", enforced at the one generate
    action) without saying so; the owner should see the precedent beside the recommendation. **Evidence:** r:2559–2563;
    host `LayeredConfigurationPanel.jsx:23–33`, `settlementGenerateAction.js:228–289`. **Fix:** add to Q5: "the host's
    precedent for settlements is that an anonymous visitor generates the three smallest tiers with everything on
    random; the world's analogue would be Random all at the province and realm rungs, every control drawn and disabled".

## Rulings on the seam seat's open issues (seam-world-growth-r0 §3)

32. **Open issue 1 — land cover in the atlas picture.** **Severity:** minor. The exclusion leaves a 300-year campaign's
    member drawn as unbroken potential vegetation around its cities in an atlas that labels each member with its own
    date (spine §10.1: "the rendered imagery of each member at the member's own present week"). **Fix:** admit the
    `landCover` layer's fills (no legend rows) in `renderAt`'s `atlas` set (file r items 1007, 1011; V15 §3.2 (3),
    J-V15.35) with V13 §5.8 (9)'s audience filter and the one legend line "derived land cover" on the atlas page — the
    honesty rule kept at one line.

33. **Open issues 4 and 6.** **Severity:** minor. Drop `WorldCharter.ground.biome` (file r r:3077): the child's W5
    re-classifies from its own climate, the edge grading reads `edges[].stations[].biome`, and the pre-fill reads the
    edges — a second copy invites use as a requirement. Delete V15 §3.1 (4)'s proxy sentence and risks (3)–(4) now that
    M-ATLAS-A follows M-W6.

34. **Open issue 7 — the whole-program total.** **Severity:** minor. 392–539 + 51–66 + 25.75–36.25 + 7–10 = 475.75–651.25
    is right, but the sum omits the ruins-by-age milestone's ≈ 1 pw (file r item 985: "the base's") and the relational
    style's art (spine §15 "plus art"; the owner's). **Fix:** item 1027's bullet adds "(plus ≈ 1 for ruins by age in the
    base's milestone and the art budget, the owner's)".

Open issues 2 (M-ATLAS-A after M-W6), 3 (the arrangement bound as the caller's cell), 5 (`Recipe.rung` `'atlas'`) and 8
(two margins for two rungs): no finding — each is consistent with the spine and the base as written; issue 2 is the
owner's to advance.

## Counts

Blocking 1 (11) · major 18 (1–10, 12–19) · minor 15 (20–34).
