# Fix-all round 1 — PIPELINE area (§4 generation pipeline, the entity schemas the stages produce §2.5–§2.7, §10 simulation and content, PART II stage 2, PART III village readiness)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/draft-pipeline-r1 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `fixall/draft-pipeline-r1`, 2026-09-25. Input: `docs/validation/fix-all/index.md` / `index.json` (128 pipeline items),
`docs/ARCHITECTURE.md` (read in full), the index's full claim / required-change / evidence text for all 128 items and
for the 34 other-area items that touch these sections, the red-team detail sections of MFP-2–MFP-7, FTG-2, FTG-5 and
FTG-17 (the other lens rows were read through the index, not re-read in the lens files), `docs/AMENDMENTS-2026-09-25.md`, `docs/ARCHITECTURE-VALIDATION.md` §0.M, `docs/OWNER-INSTRUCTIONS-2026-09-25.md`, and the
evidence the fixes depend on (numbers only): `research/findings/profile-neighbourhood.md` BG-1–BG-4, PF-1–PF-3, AN-1–AN-7;
`captures/mfcg/exports-sweep-2026-09-25/README.md` (per-size statistics); `research/findings/profile-village.md` New-build
addendum N2 / P1. Executed in this lane (receipts quoted where used; scripts and outputs copied to `docs/validation/bench/` and re-run to
identical output): `fixall_pipeline_ou_heading.py` (the growth heading model's drift distribution, FTG-17) and
`fixall_pipeline_mfcg_fits.py` (gate-count and quarter-count laws fitted on the MFCG size sweep, MFP-4 / MFP-10).

## 0. How to read this file (plain words)

Every one of the 128 items this area owns ends FIXED, INVALID or STAGED-BY-OWNER; none is deferred. Section 1 is the
disposition table. Section 2 holds the replacement text for the architecture, one block per subsection, each opening with
`=== REPLACE … ===` or `=== INSERT AFTER … ===`; the integrator pastes each block over the named subsection. Section 3
lists the changes this area needs in sections other areas own. Where only an experiment can confirm a choice, the text
names the chosen mechanism, the first-milestone measurement that confirms it, and the fallback that applies if it fails.

**The big changes, in plain words.** (1) The town's large pieces — the castle, the main square, church precincts, the
harbour basin, the moat — are reserved on the ground before any street is drawn, and the walls and gates are decided
before the side streets grow, so streets never have to be cut or rerouted around them. (2) Inside the walls, the lanes
come from the bent cut (watabou's method, now with the measured recipe); outside, streets grow FTG-style along the main
roads, so the town stretches along its roads instead of growing in circles. (3) The town's content (which plot hosts the
guildhall, the inns, the rich houses) is decided once for the whole town before any district is drawn, so every viewer
of a seed sees the same town. (4) Every building now stands on the terrain (a ground height), is stored as rectangular
wings (so roofs can be drawn the Neighbourhood way), and plots carry fences, hedges and walls. (5) People are never
saved just because someone looked at them; relations, work places and sub-locations have a defined schema. (6) The
neighbourhood close-up, floating islands, sewers, stage-3 manors, the evolution engine and the village product stay in
the owner's later stages, but each now has a concrete hook in the base.

## 1. Disposition table

**128 items: 115 FIXED, 0 INVALID, 13 STAGED-BY-OWNER (subject matter the owner's roadmap puts in a later stage — stage 2, the village product, floating islands and sewers, stage-3 manors, the evolution engine — each with its hooks now concrete in the base). None deferred.** Duplicates (index §3) share their primary's mechanism and say so. Section references are to the blocks below; a parenthesised code such as (D-a) points to a cross-area request in §3. Two index transcription slips were found and worked around, not propagated: COV-FTG-C05's and COV-FTG-C07's `required_change` fields carry text copied from other rows (a slope term; the enceinte rule), and COV-FTG-I03's reads "As G03"; each was answered from its claim.

| # | item | disposition | sections changed | mechanism |
|---|---|---|---|---|
| 1 | GEO-13 | **FIX** | §4.2 S1 (2); §5.2 (D-a) | Normal displacement clamped to 0.8 × local feature size; non-zero union repair keeps the anchor component, other loops typed; 10 000-outline property test |
| 2 | GEO-14 | **FIX** | §4.2 S1 (2); §2.3 (K-a); §8 (R-d) | Vector coast authoritative, coastal cells ramped past sea level ± 10 cm, contours extracted per tile and clipped to land faces — no crossing possible, no abort path |
| 3 | GEO-16 | **FIX** | §4.3 | Routes unioned on the lattice with multiplicity, split at degree ≠ 2, merged on the graph, each chain smoothed and inserted once |
| 4 | GEO-17 | **FIX** | §4.2 S1 (5); §4.3; §4.8; §2.7 Bridge | S1 emits pinned bank-to-bank decks perpendicular to flow; S4 routes to deck endpoints as fixed edges; F-ROUTE moves the site along its reach |
| 5 | GEO-18 | **FIX** | §4.1; §4.4 S5a; §4.8 | Trace, gates and castle weld fixed in S5a before the stage's growth; topology-preserving simplification; last F-WALL rung cuts at the setback |
| 6 | GEO-19 | **FIX** | §4.2 S3; §4.8; §4.11 | Harbour basins, moats and canals reserved and carved into L0 at S3, before S4; later carves go through the conversion path |
| 7 | GEO-21 | **FIX** | §4.6 step 7 | Cut ends extended to the crossed spine and inserted as T-junctions (splitThrough); 'stop half a width short' is the renderer's stroke rule |
| 8 | GEO-22 | **FIX** | §4.6 sides, steps 3–5 | Sides are runs within 10° cumulative turning; perpendicularity on run chords or a ± 5 m tangent window; start/far sides defined for any face via the minor-axis line at f |
| 9 | GEO-23 | **FIX** | §4.6 step 8 | Reflex pre-cut and antenna split; always-succeeding clipped cut before substitution; substitution only for faces ≤ 2 × band area; residue reported ≤ 5 % |
| 10 | GEO-24 | **FIX** | §4.7 S10 (4)–(5) | Blocks partitioned into per-frontage regions by the straight skeleton (reflex pre-cut fallback); strips never leave their region; property test |
| 11 | GEO-25 | **FIX** | §4.6 deep-interior rule; §4.7 S10 (9); §4.1 | Back lanes and through-alleys decided and inserted in S8's district batch; S10 never writes L1 |
| 12 | GEO-26 | **FIX** | §4.7 S11 row; §4.1 transactions | Row footprint = plot ∩ frontage band (boolean), one L4 batch per block, so party walls are shared edges on curved frontages |
| 13 | GEO-27 | **FIX** | §4.11 | Built-face legality class in epoch growth: no crossing built faces except along plot lines or by declared demolish conversions; re-cut through the conversion path |
| 14 | GEO-30 | **FIX** | II.1 rule (3); II.2; II.5 | Seam amendment: T-junctions on shared spines via splitThrough, recorded as new portals in both contracts; neighbour re-derives only corridor and wedge |
| 15 | GEO-36 | **FIX** | §4.2 S1 (3)–(4) | Knot offsets ≤ half the control spacing with a simplicity test; carve cap with F-RIVER re-trace; island only if branch separation ≥ (w₁ + w₂)/2 + min islet |
| 16 | GEO-37 | **FIX** | §4.4 S5c legality | Regime clearance applied to shores, wall setback bands, reservations and the stage boundary, not only parallel spines |
| 17 | GEO-38 | **FIX** | §2.7; §4.8; §4.11; §2.2 (K-d) | Bands, glacis, towers, gatehouses as per-side FaceRef unions; wallToWay clearance rule clips plots keeping ids where anchors survive |
| 18 | GEO-42 | **FIX** | §4.6 step 10 | Bent-cut continuation forbidden across district-boundary edges |
| 19 | LC-2 | **FIX** | §4.1; §4.5 S7b; §4.7 S10a; §2.5; §6.2 (D-d) | Laziness contract; eager town-wide allocation (districts, then blocks) and two declared field passes; derived-complete hash CI over random district orders |
| 20 | LC-6 | **FIX** | §4.5 bands and brush; §2.5 FieldBands, DerivationRecord; §7.2 (D-g) | Cut points computed once from roster shares and recorded; hysteresis on the recorded band; relative strokes; re-derive beyond τ = 0.01 on session and replay |
| 21 | LC-12 | **FIX** | §4.11; §2.5 DerivationRecord; §7.3 (D-h) | Survivors keep built state; field changes act only via rate-limited transformation events; Regenerate (keep) reads the recorded inputs |
| 22 | LC-16 | **FIX** | §2.7 Person, Household; §10.3; §4.7 S10b; §7.4 (D-i) | Pins only by explicit edit; seen = view state; person key (household lineage, ordinal, birth epoch); ageing by epoch; people row in §7.4 |
| 23 | LC-18 | **FIX** | II.1; II.4; II.5 | Refine close-ups are derived presentation data outside the hash; template replacement is a logged model edit; close-up edits are instance overrides |
| 24 | SCL-4 | **FIX** | §4.1; §4.10; §8.5 / §12 (R-d) | One-click first paint = complete city LOD (S0–S13 eager); laziness only below the city band; METROPOLIS preview replaced exactly once |
| 25 | SCL-13 | **FIX** | §2.6 BuildingGenerator | outline() (≤ 10 µs, every LOD) / compose() (lazy per tile, ≤ 1 ms) split; union contract test; stage-3 intake measurement with pre-decided fallbacks |
| 26 | VIS-8 | **FIX** | §2.5 PlotBound; §4.7 S11 table; §8 / §11 (R-b, R-f) | Boundary treatment per plot edge (none/fence/hedge/wall/railing, gates) from the site-plan table; counts toward streetwall continuity; exported |
| 27 | VIS-10 | **FIX** | §2.6 BaseWing; §4.7 S11; §8.2 (R-a) | Every footprint stored as rectangular wings with ridge axes; roof construction a style parameter over the wings |
| 28 | MFP-2 | **FIX** | §4.4 S5c; §4.6; §1.4 (S-a); §13.5 (S-b) | Walled regimes grow only district-scale secondaries (120–200 m); lanes and intramural secondaries from the bent cut; MFCG signature rows in the gate |
| 29 | MFP-3 | **FIX** | §4.2 S3; §4.4 S5a; §4.8; §2.5 Reservation | S3 reservations (plaza, castle, precinct, market) as L1 barriers before S4; castle welded into the trace; F-CASTLE repairs in place |
| 30 | MFP-4 | **FIX** | §4.2 S3; §4.3; §4.8 | N gate sites picked first (nested, prefix-stable); each gate one road out and one street in; N = 0 sealed without a postern |
| 31 | MFP-6 | **FIX** | §4.2 S2 stage rows; §4.4 regimes; D-2 (S-f) | Walled share ≈ 0.88–0.9 per rung from MFCG's 0.87–0.92; ribbon default extramural; suburb only by preset or shanty toggle |
| 32 | MFP-7 | **FIX** | §2.5; §4.5 typing; §4.7 S10b; §2.6 dwelling | Feature-named district kinds; live-in rows site households at their workplaces; block-level use-mix acceptance |
| 33 | MFP-9 | **FIX** | §2.7 Enceinte.setbackCm; §4.8; §4.7 S10; §5.3 (D-b) | Inner and outer setbacks both unbuildable, hard invariant; ribbon plots start beyond the outer band |
| 34 | MFP-10 | **FIX** | §4.5 grower and quarters; §9 (R-e) | District band derived from the count law; quarters N_q = round(1.37·B^0.267) fitted on MFCG as the city-LOD label unit |
| 35 | MFP-11 | **FIX** | §4.9 S12b | greens toggle mapped onto the table (floor rates, park districts, report); castle esplanade row |
| 36 | FTG-1 | **FIX** | as LC-2 (duplicate of LC-2) | Same mechanism as LC-2: eager allocation before any per-district stage; order-independence CI |
| 37 | FTG-2 | **FIX** | §4.2 S2; §4.4 S5d; §4.5 bands; §4.7 S10 | Plot counts per class × band; plotShare measured (MFCG 0.60–0.65); bands from roster shares; S5d top-up and exact check after S10 |
| 38 | FTG-3 | **FIX** | §4.5 S7b claims (duplicate of MFP-3) | District claims > one block cut out before S8; S8 cuts around them; parks only on reserved faces or residue |
| 39 | FTG-4 | **FIX** | §4.4 S5b; §4.11 | Main-road step per stage and per epoch: new primaries routed incrementally to match the stage's gate law |
| 40 | FTG-5 | **FIX** | §4.4 S5a; §13.5 (S-b) | Boundary = network-travel-cost level set with anisotropy row a (1.3 walled … 8 linear-street); outline metric monotone in a |
| 41 | FTG-6 | **FIX** | §4.4 S5c; §15.2 (S-d) | Per-preset heading model (ou / radiusHold / gridLock), crossing matrix, switchable bias, junction bands; ringed fixture |
| 42 | FTG-7 | **FIX** | §4.9 S12a; §4.1 order; §4.7 S10b; §10.2 | S12a before S10b makes outside plots count-driven from the allocation; one farm table links farm demand and farmland |
| 43 | FTG-8 | **FIX** | §2.7 Enceinte; §4.4 S5a; §4.8 | Open traces anchored on shore; waterfront policy row (open / quay wall / sea wall); aroundStage placement; quays reachable |
| 44 | FTG-9 | **FIX** | §10.1; §10.3; §2.7 | Relation store schema in the base, materialised once by the module and persisted; content locality contract; storage restated |
| 45 | FTG-10 | **FIX** | §10.3; §2.7 (duplicate of LC-16) | Pin only on explicit edit; per-household person-table version; re-derivation of existing people only by a diffed action |
| 46 | FTG-11 | **FIX** | §2.6 SubLocation; §10.3 | SubLocation with tags and capacities; whole-population occupancy per (day type, hour) in two passes, cached, ≤ 50 ms per hour |
| 47 | FTG-13 | **FIX** | §2.6 Heights.baseCm; §4.7 S11; §8.4 / §11 (R-c, R-f) | Ground datum per wing, wall vertex, gate, tower, bridge; plinth, skirts, stepped wings; shadows and glTF from baseCm |
| 48 | FTG-14 | **FIX** | §10.2 | Sequential grid roster keyed by building ordinal; manifest(P₂) ⊇ manifest(P₁); epoch delta = suffix |
| 49 | FTG-17 | **FIX** | §4.4 S5c heading model | Ornstein–Uhlenbeck curvature with goal reversion, sigma in degrees per 100 m; executed drift distribution (p50 21°, > 90° 0.1 %) |
| 50 | FTG-18 | **FIX** | §4.4 between stages; §2.4 (K-b) | Only S5-grown provisional spines are trimmed; S4 and S5b arterials never |
| 51 | FTG-19 | **FIX** | §4.2 S3 step 5; §15.2 (S-d) | Island towns get shore destinations (harbour, landings, ferry point); O4 (g) counts landings |
| 52 | FTG-20 | **FIX** | §4.4 suburb row | Optional perimeter lane offset from the previous enceinte seeds offshoots besides arterial seeds |
| 53 | IMP-8 | **FIX** | §4.6 deep-interior rule; §13.5 (S-b) | Deep-interior treatment (court / back lane / through-alley / rear plots) by band shares, decided in S8; court-share keep-test |
| 54 | IMP-9 | **FIX** | §4.2 S1 (3) mouths; §4.2 S3 polycentric; §7.7 (D-k); §15.2 (S-d) | Distributaries by descent without rejoining; k = 2–3 nuclei with own enceintes; linear-street and island-city realisable |
| 55 | COV-MFCG-A03 | **FIX** | §4.2 S0 | Per-rung feature table on its own concern, drawn once before any stage; every auto value reported |
| 56 | COV-MFCG-C05 | **FIX** | §4.6 step 1 | Working major axis rotated toward the contour direction by min(0.5, slope/0.3) on faces steeper than 5 % |
| 57 | COV-MFCG-C07 | **FIX** | as FTG-8 (duplicate of FTG-8) | Waterfront policy row read by S5a and F-WALL: open along quays and beaches by default, or quay / sea wall with water gates |
| 58 | COV-MFCG-E04 | **FIX** | §4.2 S3 step 4–5 | Each gate carries a bearing (requested or least-cost to the frame); unwalled towns derive bearings by the same law |
| 59 | COV-MFCG-G03 | **FIX** | §4.6 partition recipes; §4.9 park layout; §4.7 S11 | fan / semiFan / ring PartitionRecipes from splitFace and insetRing, used by parks and cloister templates |
| 60 | COV-MFCG-G05 | **FIX** | §2.6 outline builder | Axis-locked cell-drop composer for institution classes behind outline() |
| 61 | COV-MFCG-I01 | **FIX** | §4.7 furniture pins | Main plaza always gets a centrepiece (statue 0.6 / fountain 0.3 / market cross 0.1, offset rule); gate-plaza pins |
| 62 | COV-MFCG-I03 | **FIX** | §4.9 park layout | Radial fan of groves if compactness ≥ 0.7, else semi-fan; perimeter path |
| 63 | COV-MFCG-Q01 | **FIX** | §4.2 S0; §9 (R-e) | Each reference limit stated as supported: several enceintes, 0–2 castles, islands and confluences, polycentric settlements, multi-line labels |
| 64 | COV-VG-VN-170 | **FIX** | §4.7 S10 (8) and granularity table | Vacancy-run share of frontage per band, typed vacant or joined garden; keep-test |
| 65 | COV-VG-VN-179 | **STAGED-BY-OWNER** | II.2 SquareFabric | Stage 2: SquareFabric mode 'void' leaves the square as the void of omitted frontages; hook concrete |
| 66 | COV-NG-N06 | **STAGED-BY-OWNER** | II.1 rule (5); §4.2 S1 (2) | Stage 2: outline templates (disc, D, lozenge, crescent, spindle) for standalone and sky calls; hook concrete |
| 67 | COV-NG-N12 | **STAGED-BY-OWNER** | II.2 RingFabric | Stage 2: rings as the only seed geometry, bands outside-in, first cut a slit, radials staggered band to band; hook concrete |
| 68 | COV-NG-N18 | **FIX** | §4.6 step 2 (duplicate of MN-3) | Start at f ~ N(0.5, σ) of the major axis (σ 0.066 / 0.098) with an outlier term, no clamp; M0 (b) distributional |
| 69 | COV-NG-N19 | **FIX** | §4.6 step 6 | Fillet tangent length = r_t × shorter leg, r_t ~ N(0.73, 0.10) clipped to [0.54, 0.87] |
| 70 | COV-NG-N20 | **FIX** | §4.6 step 9; II.2 | Free-end term e = 0.025 × median cut length; fixed per-district widths for template and ring roads |
| 71 | COV-NG-N27 | **FIX** | §4.7 S11 compound row; §2.5 PlotBound; II.3 (duplicate of VIS-8) | The manor compound's enclosure wall and gate are base boundary treatments, drawn by the close-up from model data |
| 72 | COV-NG-XA07 | **STAGED-BY-OWNER** | II.3 | Stage 2: dispatch table reads spacing to the nearest landmark or manor block; minimum landmark spacing row; hook concrete |
| 73 | COV-NG-XB23 | **FIX** | §2.7 Pin; II.2 (duplicate of COV-FTG-J02) | Pin kinds statue and monument in the base; SquareFabric centrepiece at the nexus |
| 74 | COV-NG-VS27 | **FIX** | §2.7 LandUse.crop / livestock; §4.9 S12a | Era/region crop table with a rotation scheme assigns crop and livestock per field |
| 75 | COV-NG-CR23 | **FIX** | §2.7 Pin (duplicate of COV-FTG-J02) | Pin kinds statue and bandstand; per-block decoration rows |
| 76 | COV-FTG-B06 | **FIX** | §10.2 rosterMode | minimiseUnemployment (default) or matchRatios, both grid-sequential and prefix-stable |
| 77 | COV-FTG-B09 | **FIX** | §4.2 S1 (10); §2.7 SiteResources; §4.9 S12a (duplicate of FTG-7) | Resource rasters from the site; S2 gates and S12a siting of outside classes read them |
| 78 | COV-FTG-B11 | **FIX** | §10.3 work | Postings persisted; after an edit only changed workplaces and the unemployed pool re-matched; unfilled postings reported |
| 79 | COV-FTG-B12 | **FIX** | §2.7 Faction; §10.3 | Roles with criteria and counts, goals with methods, secret flag; headcount reconciled with the seat's working capacity |
| 80 | COV-FTG-B13 | **FIX** | §2.7 Government; §10.2; §4.2 S0/S2 | Government circumstance selects offices that force seats (castle, keep, bishop's palace, town hall …) and a military share |
| 81 | COV-FTG-B14 | **FIX** | §2.7 Religion; §10.2 | Religions with generated pantheons, worshipper and practice shares, clergy rate; temples proportional to practising worshippers |
| 82 | COV-FTG-C01 | **FIX** | §10.3 people model | AncestryRow (life stages, max age, heights, name grammar) and a partnering matrix as data; one human ancestry in the base |
| 83 | COV-FTG-C02 | **FIX** | §10.3; §10.4 | Appearance templates in the grammar engine: weighted options, substitution, conditional and fallback lines, article agreement |
| 84 | COV-FTG-C04 | **FIX** | §2.7; §10.3 (duplicate of FTG-9) | FamilyUnit and Relation schema in the relation store |
| 85 | COV-FTG-C05 | **FIX** | §10.3 events | EventTemplate with preconditions, weight and effects as logged, undoable edit events |
| 86 | COV-FTG-C07 | **FIX** | §2.6 SubLocation (duplicate of FTG-11) | SubLocation capacities and tags from the class table (index's required-change text is mis-copied; the claim is answered) |
| 87 | COV-FTG-C08 | **FIX** | §2.7 Person.status, carer; §10.3; §5.3 (D-b) | Person types and carer-following; carer reassignment by rule; reference integrity |
| 88 | COV-FTG-D26 | **FIX** | §4.4 S5a anisotropy (duplicate of FTG-5) | The anisotropy ratio a is the wide-versus-elongated control for ribbons and suburbs |
| 89 | COV-FTG-E02 | **FIX** | §4.5 S7b; §4.7 S10a; §2.5 SubDistrict | Cluster-tagged classes get contiguous sub-district block groups inside their district |
| 90 | COV-FTG-E07 | **FIX** | §4.7 S11 tents row; §2.7 Pin | Tents arrangement (tent buildings, fire-pit pins, dirt) in squalid and shanty districts |
| 91 | COV-FTG-E10 | **FIX** | §10.4; §4.10; §2.5 District.description | Generated one-line district description from mix, features and prosperity; editable |
| 92 | COV-FTG-F09 | **FIX** | §2.5 District.buildingScale; §4.7 S11 | Continuous 0.5–2 building-scale multiplier per district or Adjust regeneration; tents row |
| 93 | COV-FTG-F16 | **FIX** | §2.6 footprint templates (duplicate of COV-MFCG-G05) | Landmark footprint templates as data rows fitted to the claim in the base |
| 94 | COV-FTG-F20 | **FIX** | §2.6 MaterialRow; §2.7 Enceinte.material | Material table by district kind × class × band × era with per-district and per-building overrides |
| 95 | COV-FTG-F21 | **FIX** | §2.6 description, openingHours | Generated building descriptions and opening hours from the class table |
| 96 | COV-FTG-F23 | **FIX** | §2.5 PlotBound (duplicate of VIS-8) | Fences, hedges and walls as plot boundary treatments |
| 97 | COV-FTG-G07 | **FIX** | §4.8 intervallum | Intervallum lane as an era row (on at CITY / METROPOLIS inner and outer enceintes) |
| 98 | COV-FTG-G09 | **FIX** | §4.8 castle template; §2.7 Castle | Gatehouse facing the castle street, internal paths, inner ward, surround row |
| 99 | COV-FTG-G10 | **FIX** | §4.8; §2.7 Castle, Tower | Keep shapes rect / square / octagon / round / cruciform; octagonal towers; inner ward |
| 100 | COV-FTG-H04 | **FIX** | §4.2 S1 (2) arms | Two coast arms, each with its own shape and detail rows |
| 101 | COV-FTG-H06 | **FIX** | §4.2 S1 (7); §2.3 (K-a) | Bay / headland / straight per shore segment by smoothed curvature; per-class bank-kind weights |
| 102 | COV-FTG-H07 | **FIX** | §4.2 S1 (8); §4.7 S10; §4.9 S12a | Shore setback table per bank kind for plots and fields, typed shore band |
| 103 | COV-FTG-H11 | **FIX** | §4.2 S1 (3) (duplicate of IMP-9) | Distributaries in a delta mouth |
| 104 | COV-FTG-H17 | **FIX** | §4.8 harbour | Harbour-wall shape and type rows, straight or branching piers on harbour and open coast, pier material |
| 105 | COV-FTG-I03 | **FIX** | §4.9 S12a | Count-driven division of outside land by weighted Voronoi with a same-kind clustering term |
| 106 | COV-FTG-I09 | **FIX** | §4.9 S12b | Street trees, ambient scatter and shoreline bands as rule rows |
| 107 | COV-FTG-I11 | **FIX** | §2.7 Greenery.species; §4.9 | Species mix per green entity from the climate table, inner and outer shares for woods |
| 108 | COV-FTG-I12 | **FIX** | §4.9 S12a decorations; §2.7 Decoration | Hinterland decoration table with counts by rung and biome, trails and keep-clear radii |
| 109 | COV-FTG-I15 | **FIX** | §4.9 climate table | ClimateTable rows: ground cover, species, field system, roof form, scatter |
| 110 | COV-FTG-J02 | **FIX** | §4.7 furniture pins; §2.7 Pin | Per-block weighted decoration row and per-district singletons by deck; statue, monument, bandstand, campfire kinds |
| 111 | COV-FTG-J05 | **FIX** | §4.7 furniture pins | Market stalls on the square's edge band and round the market hall, ≈ 1 per 150 m², ≤ 40 |
| 112 | COV-FTG-L06 | **FIX** | §10.4 | Per-culture grammars and corpora; user-uploaded lists become user corpora in the document |
| 113 | COV-VG-VN-002 | **STAGED-BY-OWNER** | §4.1; §4.12 StageDecl; PART III | Village staged: stage graph ordered from declared I/O so a density stage can precede the network; hook concrete |
| 114 | COV-VG-VN-003 | **STAGED-BY-OWNER** | §4.12 NetworkStrategy / EnceinteStrategy; PART III (duplicate of MN-4) | Village staged: enceinte input to network growth and an EnceinteStrategy before the roads; hook concrete |
| 115 | COV-VG-WC2 | **FIX** | §4.2 S1 (3); PART III; §15.1 (S-d) | Wording corrected: VG's course is a terrain-independent spline laid before its terrain; ours is descent-traced with a carved field |
| 116 | COV-VG-WC4 | **STAGED-BY-OWNER** | PART III item 4; §1.6 (S-a) | Village staged: a village is one district, so containment holds unchanged; hook concrete |
| 117 | AM-1 | **FIX** | §4.9 S12b clause map | Every clause mapped to a rule row; rows interpolated along prosperity like coverage and granularity |
| 118 | AM-2 | **STAGED-BY-OWNER** | §2.7 SkyIsland; II.1; II.6; §4.2 S1 (2) | Islands staged: two reasons by rule or assignment, echo terrain, placement rule, no underground relation; interfaces concrete |
| 119 | AM-3 | **FIX** | §2.6 heights and ground datum; §8.4 (R-c) | Heights with baseCm on every building, wing, tower, wall run, gate and bridge; shadow hook and a stated shadow budget |
| 120 | AM-6 | **FIX** | §4.5 fields clause map | Continuous field, driver table, ε share, recorded bands, interpolation, epochs, brush — each clause mapped |
| 121 | MN-3 | **FIX** | §4.6 recipe | The measured AN-6 recipe adopted: f on the major axis, coin side, perpendicular departure, R1 far side, proj corner, 0.53 fillet, width law |
| 122 | MN-4 | **STAGED-BY-OWNER** | PART III item 2; §4.12 | Village staged: palisade-before-roads (density-lattice hull) admitted through EnceinteStrategy and the enceinte input; hook concrete |
| 123 | DEF-7 | **STAGED-BY-OWNER** | II.6; §2.7 SkyIsland, Tunnel; Deferrals (S-f) | Sewers and islands staged: SkyStrategy, IslandRule, SewerStrategy and records concrete; entry moved to 'staged by the owner' |
| 124 | DEF-8 | **STAGED-BY-OWNER** | §4.11; Deferrals (S-f) | Evolution engine staged: ConversionOp kinds incl. decline, EpochInputs, EvolutionStrategy; the growth path built |
| 125 | DEF-10 | **FIX** | §10.4 SettingPack; §7.6 (D-j) | Pack format and loading layer decided; the base ships one pack; further contents are data |
| 126 | DEF-15 | **STAGED-BY-OWNER** | PART III; Deferrals (S-f) | Village product staged: five concrete hooks (declared-I/O stages, enceinte input, tracker network, one district, ladder rows) |
| 127 | DEF-16 | **FIX** | §4.1 worker | Per-district pool specified now; M2 measures METROPOLIS single-threaded; the pool switches on if it misses 1 s p95 |
| 128 | DEF-17 | **STAGED-BY-OWNER** | §2.6 stage-3 hook; §16 (S-e) | Stage-3 compositions staged: outline/compose split, cost contract, intake measurement and fallback concrete |

## 2. Replacement blocks

### Block P-1 — §2.5 (items MFP-3, MFP-7, MFP-10, LC-2, LC-6, LC-12, IMP-8, VIS-8, COV-FTG-E02, COV-FTG-E10, COV-FTG-F09, COV-FTG-F23, COV-NG-N27, COV-VG-VN-170, AM-6)

=== REPLACE §2.5 Districts, blocks, plots — the PLOT MODEL and the context vector ===

### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context vector

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r1)

```ts
interface District { id: Id; kind: DistrictKind /* feature-named: central, market, docks, gate, riverbank, castle, temple, park, craft, sprawl, suburb, shanty, hinterland, … data-defined; never a social class */;
  quarter: Id /* the label-level grouping, below */; faces: FaceRef /* L1 coarse faces, before and after infill */; boundary: TypedBoundary; seam: SeamContract /* §4.12, PART II — from milestone 1 */;
  character: CharacterVector; venueMix: Record<string, number>; prosperity: { mean: number; band: string }; growthStage: number;
  fabric: FabricStrategyId /* 'bent-cut' in the base; ring / square / street at stage 2 */; fabricParams: Record<string, number>;
  buildingScale: number /* 0.5–2, default 1: FTG's "smaller / bigger" knob as a continuous multiplier on footprint targets (§4.7 S11) */;
  materialOverride?: Partial<MaterialRow> /* §2.6 */; allocation: Id /* the district's Allocation record (§4.5 S7b) */; subDistricts: Id[];
  description?: TextRef /* a generated one-line summary of the mix and features (§10.4), regenerated when the mix changes, editable */;
  namingFeature?: Id; name?: NameRef; labelSpine?: Polyline; subseed: StreamKey; lifecycle: Lifecycle }
interface Quarter { id: Id; districts: Id[] /* adjacent districts, ≥ 1 */; kindFamily: string; name: NameRef; labelSpine?: Polyline; lifecycle: Lifecycle }   // the city-LOD label unit (MFCG's district count, §4.5)
interface SubDistrict { id: Id; district: Id; blocks: Id[]; cluster: string /* roster cluster tag, e.g. a trade group */ }             // FTG's sub-district: a contiguous block group a cluster is placed into (§4.7 S10a)
interface Reservation { id: Id; kind: 'castle'|'plaza'|'market'|'precinct'|'institution'|'park'|'harbour_basin'|'moat'|'canal';
  face: FaceRef /* L1 barrier face(s); water kinds are L0 faces */; areaBandM2: [number, number]; compactnessMin?: number; owner?: Id /* castle, institution, commons */;
  attach: VertexId[] /* perimeter vertices arterials end at (plaza) or the wall welds through (castle on the enceinte) */; stage: StageId /* S3 or S7b */; lifecycle: Lifecycle }
interface Allocation { id: Id; level: 'town'|'district'|'block'; target: Id /* town, district, block or the hinterland pseudo-district */;
  rows: { cls: string; band: string; count: number; claim?: Id /* Reservation for items larger than a block */; subDistrict?: Id }[];
  stream: StreamKey; lifecycle: Lifecycle }   // persisted; the eager content decision every lazy or per-district stage honours (§4.1 laziness contract)
interface FieldBands { field: 'prosperity'|'density'|'greenery'; cuts: number[] /* ascending, on the field's [0, 1] value */; hysteresis: number /* default 0.02 */;
  source: 'roster-shares'|'table'|'edit'; epoch: number }   // computed once per town at S6 (§4.5); changed only by an explicit edit or an epoch
interface Block { id: Id; face: FaceRef /* L2 built block(s) */; district: Id; subDistrict?: Id; frontages: Frontage[]; depthClass: string;
  interior: 'plots'|'court'|'back_lane'|'through_alley'|'rear_plots'|'green'|'landmark'|'reserved'|'empty' /* the deep-interior treatment, decided in S8 (§4.6) */; reservation?: Id }
interface Frontage { way: Id; edge: HalfEdgeId /* L2 kerb edge */; class: WayClass; lengthCm: Cm }
interface Plot {
  id: Id; face: FaceRef /* L3 */; block: Id; district: Id;
  frontage: HalfEdgeId[]; access: HalfEdgeId[] /* ≥ 1 always (invariant) */; depthCm: Cm; frontageCm: Cm; partyWalls: { edge: HalfEdgeId; with: Id }[];
  bounds: PlotBound[] /* the boundary treatment of every non-party-wall edge (VIS-8) */;
  owner?: Id /* household | business | institution */; use: PlotUse; sitePlan: SitePlan;
  buildings: Id[] /* 0..n footprints */; yard: YardPart[] /* typed sub-areas: yard, garden, court, orchard, midden, pen, vacant, formal_garden, forecourt, churchyard, shore */;
  ctx: ContextVector; derivedFrom: DerivationRecord; assignment?: AssignmentRef; members?: Id[] /* joined plots (EVO) */; lifecycle: Lifecycle; subseed: StreamKey;
}
interface PlotBound { edge: HalfEdgeId; side: 'frontage'|'side'|'rear'; treatment: 'none'|'fence'|'hedge'|'wall'|'railing';
  heightCm: Cm; gates: { posCm: Cm; widthCm: Cm }[] /* openings; every access edge with a treatment has ≥ 1 */; ownedBy: Id /* one owner per shared edge */ }
interface DerivationRecord { fieldSample: { prosperity: number; density: number; greenery: number }; band: string /* the recorded band hysteresis reads */;
  allocationRow?: number; tableVersions: Record<string, string>; epoch: number }   // what S10–S12b read last time; Regenerate (keep) re-reads it (§4.5, §4.11)
interface SitePlan { arrangement: 'row'|'compound'|'detached'|'hovel'|'tents'|'institution'|'none'; coverage: number; slots: BuildingSlot[]; frontJitterCm: Cm; ruleRow: string }
interface BuildingSlot { role: string /* house, hall, stables, workshop, chapel, barn, kitchen, brewhouse, tent, … */; hint: Polygon; entranceEdge: HalfEdgeId }
interface ContextVector {   // the per-plot vector every rule table reads (owner hook; O7 / O17 / O18 / O19)
  areaM2: number; shape: { obbW: number; obbD: number; compactness: number; reflex: number; corner: boolean; wedge: boolean };
  frontageM: number; roadClass: WayClass; roadWidthM: number;
  districtKind: DistrictKind; quarter: Id; venueMix: Record<string, number>;
  prosperity: number; prosperityBand: string; density: number; greenery: number;   // continuous values + banded class (O18)
  dist: { centre: number; plaza: number; market: number; gate: number; wall: number; water: number; shore: number; harbour?: number };
  upstream: number /* 0 = upstream … 1 = downstream along drainage */; slope: number; aspect: number; upwind: number; baseCm: Cm;
  terrainClass: 'high'|'mid'|'low'|'damp'|'flood'|'rock'; growthStage: number; epoch: number; buildingScale: number;
  rosterAssignment?: Id; assignment?: Id;
}
```

A plot is the parcel (the owner's stage-3 wording and the references' code say *lot* for the same thing; this document
says *plot* except when quoting them, and *building* only for a footprint with heights standing on a plot); rendering
never draws a plot outline as a building (a cadastral outline group is an optional toggle).
Coverage ratio, arrangement, separation rule and boundary treatment come from the site-plan tables keyed by `class ×
prosperityBand × density`, with continuous rules (coverage, plot size, greenery, building scale) interpolating along the
prosperity value between band rows (§4.7).

**What the new records are for.**

* **Districts are feature-named, never class-named.** A district's kind names its feature or function (market, docks,
  gate, castle, temple, craft, riverbank …); "rich quarter" and "poor quarter" are *descriptions* derived from the
  prosperity field for naming and the description line only. *Judgment:* chose feature-named kinds over the synthesis
  seat's `patrician` / `slum` kinds because MFCG's live taxonomy dropped class-typed wards and its creator states that
  townspeople lived where they worked with no purely residential wards except the patriciate (MFP-7); wealth still
  varies continuously through the prosperity field, which is where the owner put it.
* **Quarters are the city-LOD label unit.** A quarter is a group of adjacent districts (often one district at TOWN)
  whose count follows MFCG's measured law (§4.5), so the city view carries as many area labels as MFCG draws; districts
  keep their own names at district LOD.
* **Reservations** are the large claims made before the streets (§4.2 S3) or before the lanes (§4.5 S7b): castle bailey,
  main plaza, market, church or cathedral precinct, large institutions, parks, and the water kinds (harbour basin, moat,
  canal) that are carved into L0 before any way is routed. A reservation is a barrier to growth and infill; the claimed
  entity is built inside it.
* **Allocations** are the persisted content decision: which classes and how many, in which wealth band, go to each
  district, sub-district and block. They are computed eagerly for the whole town (§4.1) and every per-district stage reads
  them, so the town's content never depends on the order districts are derived or viewed (LC-2).
* **FieldBands** hold the prosperity (and density, greenery) cut points. They are computed once per town from the
  roster's household wealth shares (§4.5), recorded, and changed only by an explicit edit (`setAttr` on the record, which
  re-derives every block whose band changes) or by an epoch. A block keeps its recorded band unless its value crosses a cut
  by more than the hysteresis, so a from-scratch replay reproduces the session's bands (LC-6).
* **DerivationRecord** is the per-plot memory of the inputs its last derivation read. "Regenerate (keep settings)"
  re-derives from these recorded inputs (faithful, byte-identical); re-deriving with current inputs is `Adjust`; a field
  brush or an epoch re-derives only plots whose current sample differs from the recorded one by more than the declared
  tolerance τ = 0.01 of the field range, and the same τ applies on replay (LC-6, LC-12).
* **PlotBound** gives every plot edge a treatment — none, fence, hedge, wall or railing — with gate openings on access
  edges, chosen by the site-plan table (§4.7 S11). It is what draws a walled manor compound, a fenced garden, a hedged
  field edge, and it exports as VTT walls and GeoJSON lines (VIS-8; NG's walled manor compound, COV-NG-N27; FTG's fences,
  COV-FTG-F23).
* **Vacant frontage runs** are ordinary plots with `use = 'vacant'` (or a `yard` part joined to the neighbour) placed by
  the vacancy-run rule of the granularity table (§4.7 S10), so a built block is not always fully ringed (COV-VG-VN-170).

### Block P-2 — §2.6 (items FTG-13, AM-3, VIS-10, SCL-13, DEF-17, MFP-7, COV-MFCG-G05, COV-FTG-F16, COV-FTG-F20, COV-FTG-F21, FTG-11, COV-FTG-C07)

=== REPLACE §2.6 Buildings, heights, the stage-3 interface ===

### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r1)

```ts
interface Heights { baseCm: Cm /* ground datum: floor level in terrain cm (§4.7 S11) */; floors: number; eaveCm: Cm; ridgeCm: Cm; towerCm?: Cm /* eave, ridge, tower above baseCm */ }   // owner HEIGHT ruling: always populated
interface BaseWing { rect: Polygon /* 4 vertices, a rectangle */; ridgeAxis: 0|1 /* along the rect's first or second side */; heights: Heights; roof: RoofSpec }
interface Building {
  id: Id; plot: Id; slot: number; footprint: FaceRef /* L4 */; wings: BaseWing[] /* ≥ 1; the footprint is their union (rectangle = 1, L = 2, T = 2–3, templates n) */;
  class: BuildingClass /* hovel, cottage, house, row_house, hall, inn, workshop, warehouse, chapel, church, temple, manor, keep, tower, mill, tent, … data-defined */;
  use: Id /* roster building type */; dwelling?: Id /* the household living in a workplace (live-in), §4.7 S10b */;
  entrance: { edge: HalfEdgeId; posCm: Cm }; heights: Heights /* the building's max over its wings */;
  roof: RoofSpec /* the model's default roof construction; a style sheet may override the construction, never the heights (§8.2) */;
  material: { walls: string; roof: string } /* from MaterialRow; setAttr-overridable */; description?: TextRef; openingHours?: OpeningRow[];
  subLocations: Id[] /* SubLocation records, from the class table */;
  composition?: Composition /* stage 3: lazily generated, stored only when edited */; compositionSeed: StreamKey;
  assignment?: Id; drift?: DriftBounds; occupants: Id[]; lifecycle: Lifecycle;
}
type RoofSpec = { kind: 'gable'|'hip'|'flat'|'pyramid'|'cone'|'dome'|'skeleton'|'tent'; pitch?: number; material?: string };
interface MaterialRow { key: { districtKind: string; cls: string; band: string; era: string }; walls: string; roof: string; weight: number }   // a rule table (§7.6), our own rows
interface OpeningRow { dayType: string; openH: number; closeH: number }
interface SubLocation { id: Id; building: Id; name: string; tags: string[] /* table, counter, stage, bed, bath, pickup, deliver, … data-defined */;
  capacities: { leisure: number; tempResidential: number; guestWorker: number; studying: number; working: number }; relax?: string[] }   // from the class table; rooms at stage 3 refine, never replace
interface Composition { lod: ('outline'|'wings'|'rooms')[]; wings: Wing[]; towers: Tower[]; courts: Polygon[]; rooms?: Room[] }
interface Wing { footprint: Polygon; heights: Heights; roof: RoofSpec; dormers?: number; porch?: Porch }
interface Tower { centre: Point; radiusCm: Cm; heights: Heights; roof: RoofSpec }
interface BuildingInput { lot: Polygon; access: Segment[]; slot: BuildingSlot; ctx: ContextVector; cls: BuildingClass; assignment?: Assignment; drift: DriftBounds; seed: StreamKey; terrain: TerrainSampler }
interface BuildingGenerator {   // the stage-3 hook, split by cost (SCL-13)
  outline(input: BuildingInput, k: Kernel): KernelResult<{ wings: BaseWing[] }>;              // every LOD, exports, shadows: cheap and deterministic
  compose(input: BuildingInput, outline: BaseWing[], lod: 'wings'|'rooms', k: Kernel): KernelResult<Composition>;   // lazy, per visible tile
}
interface ClassRules { pick(ctx: ContextVector, assignment?: Assignment): { cls: BuildingClass; heights: Omit<Heights, 'baseCm'>; roof: RoofSpec; template?: string } }   // a data table, not code
```

**The base outline builder.** The base ships `OutlineBuildingGenerator`: the site plan's rectangle, an L or T composed of
2–3 rectangular wings (MFCG Complex mode, FTG Dense/Gaps looks), and — for institution classes (keep, temple, church,
manor, hall, farmstead) — two further constructions behind the same `outline()`:
1. **Footprint templates** (COV-FTG-F16): data rows of normalised shapes fitted to the claim — cruciform church (nave,
   transept, apse), cruciform keep with corner projections, octagon, n-gon (a 9-gon theatre), 6- and 7-pointed star
   temples, U-court, ring cloister around a court. Fitting is an affine map of the template into the claim's `lir`,
   then a boolean intersection with the claim; each template is stored as its constituent rectangles and wedges so the
   wing rule below holds.
2. **The axis-locked composer** (COV-MFCG-G05; our own construction of MFCG's idea): take the claim's OBB axes; cut the
   axis-aligned rectangle on the axis more perpendicular to the current longest edge at a ratio drawn from U(0.4, 0.6);
   recurse until cells reach the class's minimum cell (`minCell = baseCell · 2^(2·size − 1)`, a table row); keep each
   cell with the class's `fill` probability, keeping the cell nearest the entrance and rejecting any drop that
   disconnects the kept set; retry ≤ 3 times on the `…/attempt=n` stream, then the full rectangle (reported). U, H,
   comb, cross and ring footprints emerge — the landmark silhouettes that show at city zoom.

Every footprint is stored as **rectangular wings** (VIS-10): each wing carries its ridge axis (the wing's long axis, or
the short axis in a table share of wings — NG measures ≈ 36 %), its heights and its roof; the footprint is
the wings' union, so the footprint hash at city LOD does not depend on the wing split. Non-rectangular template parts
(apse, octagon, star points) are wings of kind `polygon` with a `pyramid` / `cone` / `dome` roof. The roof *construction*
the renderer draws (plain, skeleton-hip, skeleton-gable, fake gable per wing) is a style-sheet parameter over the stored
wings (§8.2); the model's `roof.kind` is the default that the 3-D export uses, so presets can change the picture without
changing the model. *Judgment:* chose wings stored in the base over a single-wing L/T because NG's per-wing roofs,
two-tone law and hatching cannot be derived from one ridge line (VIS-10) and the wing split costs one small array per
building.

**Heights and the ground datum (owner HEIGHT ruling; AM-3; FTG-13).** Every building, wing, tower, keep, wall run, gate
and bridge carries heights; eave, ridge and tower heights are measured above `baseCm`, the floor level in terrain
centimetres. S11 computes `baseCm` per wing from the terrain sampler (bilinear on the refined 2.5 m raster at the wing's
vertices and centroid): `baseCm = max(samples) + plinthCm` (table, default 30 cm), so no floor is buried; the fall under the
wing (`max − min`) is a foundation skirt the 3-D export extrudes down to the terrain and the shadow pass includes. Where
the fall across a row footprint would exceed `skirtMaxCm` (table, default 300 cm) the footprint is split along the
contour into stepped wings, each within the limit — terraces step down a hill instead of floating. Walls store a base per
trace vertex, gates and towers their own base, bridges a deck height from the two bank elevations plus a clearance row.
Shadows and a later 3-D export read the same numbers, so they agree on any terrain, not only on flat sites. The shadow
pass itself is the owner's later SHADOW stage; the base populates every height and keeps the display list's shadow hook
(§8.1) and its budget (§8.4, §12). Acceptance: heights on 100 % of buildings, wings, towers and wall runs; on the hilly
golden seeds 0 wings whose `baseCm` departs from the terrain maximum under them by more than the plinth.

**Materials (COV-FTG-F20).** `MaterialRow` is a rule table keyed by district kind × class × prosperity band × era (weighted
rows; temples and churches stone by row), read by S11; a district's `materialOverride` and a building's `setAttr` override
it; enceintes carry their own wall material (§2.7). The style sheet maps materials to colour and texture roles.

**Descriptions, opening hours, sub-locations (COV-FTG-F21, FTG-11).** A building's description is generated by the naming
engine (§10.4) from its class, use, owner and district, persisted per entity and editable; opening hours come from the
class table and are what the simulation module reads. `SubLocation` records (named parts of a building with tags and
capacities for leisure, temporary residence, guest workers, study and work) are filled from the class table when the
building is created; stage-3 rooms refine them (a room may host a sub-location) and never replace their ids.

**The stage-3 hook and its cost contract (owner-staged; DEF-17, SCL-13).** Stage 3 replaces `OutlineBuildingGenerator`
with a lot-driven Fantasy-Manor-class generator (`manor.md` §3.3, §9 via the proposals: a lot-derived path of wings,
orientation fixed by the frontage, the lot polygon in the collision set, a class picker per plot from the same
`ClassRules` table). The interface is split so the city view never waits for a manor:
* `outline(input)` returns the wings every LOD, every export and the shadow hook use. Budget: ≤ 10 µs per building median
  (the S11 budget, §12), so the METROPOLIS city view composes no manor to show its footprints.
* `compose(input, outline, lod)` returns wings with roofs, dormers, porches, towers, courts and rooms, lazily per visible
  tile at district LOD and finer; ≤ 1 ms per building median at `wings`, one tile's compositions within 16 ms of frame
  work (amortised: a tile draws the outline until its compositions arrive). **Contract test:** the union of the composed
  wings equals the outline's union exactly (integer equality after snapping), so O17 (i)'s identical footprint hash at
  every LOD holds by construction.
* **Stage-3 intake measurement and fallback, decided now.** The stage-3 intake measures the generator's `outline()` time
  per building class on B-CITY METROPOLIS seeds. If it exceeds the 10 µs median, `outline()` runs the generator's own
  massing step only (its wing rectangles without roofs or rooms); if that still exceeds the budget, the base
  `OutlineBuildingGenerator` keeps producing the outline and stage-3 `compose()` is constrained to it (its wings must
  union to the base outline). Diversity "from a giant manor to a small hovel" stays a property of `ClassRules` (data keyed
  by the context vector), not of the generator.

### Block P-3 — §2.7 (items FTG-8, COV-MFCG-C07, GEO-38, MFP-9, COV-FTG-G07, COV-FTG-G09, COV-FTG-G10, GEO-17, FTG-9, COV-FTG-C04, LC-16, FTG-10, COV-FTG-B12, COV-FTG-B13, COV-FTG-B14, COV-FTG-C01, COV-FTG-C08, COV-FTG-B09, COV-FTG-I11, COV-FTG-I12, COV-NG-VS27, COV-FTG-J02, COV-NG-XB23, COV-NG-CR23, COV-MFCG-I01, COV-FTG-J05, COV-FTG-E07, AM-2, DEF-7)

=== REPLACE §2.7 Walls, gates, towers; greenery; labels; content entities ===

### 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r1)

```ts
interface Enceinte { id: Id; kind: 'citadel'|'inner'|'outer'|'suburb'|'bailey'|'palisade'|'earthwork';
  trace: HalfEdgeId[] /* L1 wall edges, a ring or an open chain */; closure: 'ring'|'shore' /* 'shore': an open chain whose enclosure is closed by the L0 shoreline */;
  anchors?: { end: 0|1; on: 'shore'|'bank'|'cliff'|'enceinte'; edge: HalfEdgeId }[] /* typed end anchors of an open chain */;
  waterfront: 'open'|'quay_wall'|'sea_wall'; placement: 'aroundAll'|'aroundStage';
  band: { inner: FaceRef; outer: FaceRef } /* L3 half-bands on each side of the L1 wall edge (nesting holds) */; glacis?: { inner?: FaceRef; outer: FaceRef };
  thicknessCm: Cm; walkCm: Cm; heightCm: Cm; baseCm: Int32Array /* per trace vertex */; setbackCm: { inner: Cm; outer: Cm } /* both faces unbuildable */;
  intervallum?: Id /* the lane inside the wall when the era row asks for it */; material: string;
  gates: Id[]; towers: Id[]; ditch?: Id; stage: number; lifecycle: Lifecycle }
interface Gate { id: Id; enceinte: Id; junction: Id; way: Id | null /* null: a postern or water gate without an outward way */;
  kind: 'main'|'postern'|'water'|'gatehouse'|'castle'; heights: Heights; footprint: { inner: FaceRef; outer: FaceRef }; plaza?: FaceRef }
interface Tower { id: Id; enceinte: Id; vertex: VertexId; radiusCm: Cm; heights: Heights; kind: 'round'|'square'|'bastion'|'octagonal'; footprint: { inner: FaceRef; outer: FaceRef } }
interface Castle { id: Id; plot: Id; reservation: Id; curtain: Id /* its own Enceinte, kind 'bailey' */; cityWeld?: [VertexId, VertexId] /* the shared wall edge when on the enceinte */;
  keep: Id; keepShape: 'rect'|'square'|'octagon'|'round'|'cruciform'; keepAt: 'opposite_gate'|'highest'|'centre'; innerWard?: FaceRef; gatehouse: Id /* one town-side gate */;
  paths: Id[] /* keep ↔ gate ↔ wall stairs, 'path' ways inside the bailey */; bailey: FaceRef; moat?: Id; surround: 'none'|'esplanade'|'park'|'plaza'|'cliff'; siteScore: number; template: string }
interface Bridge { id: Id; way: Id; deck: [VertexId, VertexId] /* pinned bank-to-bank deck, perpendicular to local flow */; deckCm: Cm; spanCm: Cm; kind: 'stone'|'timber'|'draw'|'ford'; piers: number }
interface Greenery { id: Id; kind: 'park'|'garden'|'formal_garden'|'orchard'|'green'|'commons'|'avenue'|'street_trees'|'churchyard'|'market_green'|'esplanade'|'grove'
    |'wood'|'coppice'|'meadow'|'hedgerow'|'shore_band'|'ambient'|'yard_planting';
  face?: FaceRef; line?: HalfEdgeId[]; owner?: Id | 'commons'; rule: string; density: number; species: { kind: string; inner: number; outer: number }[] /* shares per species kind (§4.9) */;
  layout?: 'fan'|'semi_fan'|'grid'|'free' /* parks and groves, §4.9 */; paths?: Id[]; treeStream: StreamKey /* instances at render, never stored */; lifecycle: Lifecycle }
interface LandUse { id: Id; kind: 'arable'|'strip_field'|'meadow'|'pasture'|'commons'|'orchard'|'vineyard'|'coppice'|'wildwood'|'quarry'|'claypit'|'mine'|'lumber'|'fishery'|'saltpan'|'marsh'|'reserve';
  face: FaceRef; owner?: Id; furrowAxisCdeg?: number; crop?: string /* from the era / region crop table */; livestock?: string; rotation?: { scheme: string; slot: number } }
interface SiteResources { cellCm: Cm; ore: Float32Array; stone: Float32Array; timber: Float32Array; fish: Float32Array; clay: Float32Array; fertile: Float32Array }   // S1 output on the terrain grid, 0..1 per cell (§4.2)
interface Decoration { id: Id; kind: string /* pond, copse, stone circle, ruin, wayside shrine, boundary stone, gallows hill, … data-defined */; face?: FaceRef; point?: Point;
  trail?: Id /* the 'path' way to the nearest way */; keepClearCm: Cm; rule: string; lifecycle: Lifecycle }
interface Pin { id: Id; kind: 'well'|'fountain'|'large_tree'|'cross'|'market_cross'|'shrine'|'pump'|'gallows'|'statue'|'monument'|'bandstand'|'campfire'|'fire_pit'|'stall'|'trough'|'lamp';
  point: Point; host: Id /* the yard, square, corridor or plot face */; rule: string; lifecycle: Lifecycle }   // in the entity registry (§2.8) from M1; placed by §4.7 S11 / §4.9 rules and by stage 2 (II.3)
interface Label { id: Id; target: Id; text: string; kind: 'quarter'|'district'|'way'|'landmark'|'water'|'gate'|'title'|'annotation'; spine?: Polyline; anchor?: Point; priority: number; pinned?: Placement; hidden?: boolean }
interface Institution { id: Id; kind: string; plots: Id[]; buildings: Id[]; faction?: Id; roster: RosterRef; name: NameRef; reservation?: Id }
interface Household { id: Id /* lineage-stable across re-derivation (§6.3) */; plot: Id; building: Id; members: number /* size; people derived lazily */; wealth: number; tableVersion: string /* person tables at creation */ }
interface Person { id: Id; key: { household: Id; ordinal: number; bornEpoch: number }; status: 'worker'|'unemployed'|'retired'|'student'|'dependent';
  role: string; workplace?: Id; carer?: Id /* dependent → the person whose schedule it follows */; derived: true; pinned?: Partial<PersonFields> /* only by an explicit edit */ }
interface Faction { id: Id; kind: 'guild'|'religion'|'lordship'|'company'|'criminal'|'council'; seats: Id[]; turf?: Id[]; influence: number; secret: boolean;
  goals: { id: string; method: string; progress: number }[]; roles: { name: string; criteria: string; count: number }[]; template: string }
interface Government { kind: 'crown'|'seigneurial'|'ecclesiastical'|'chartered_commune'|'merchant_oligarchy'; seat: Id /* the institution */; offices: { name: string; seatClass: string; count: number }[] }
interface Religion { id: Id; name: NameRef; deities: { name: NameRef; domain: string }[]; practiceShare: number; clergyPerThousand: number; temples: Id[]; faction: Id }
// The relation store (FTG-9): schema in the base registry from M1; materialised by @plat/sim's first run, then persisted with lifecycle and reference integrity (§10.3)
interface FamilyUnit { id: Id; kind: 'couple'|'parents_children'|'single_parent'|'extended'; members: Id[]; households: Id[] }
interface Relation { id: Id; a: Id; b: Id; kind: 'partner'|'parent'|'sibling'|'carer'|'friend'|'rival'|'business'|'religious'|'affair'; since: number; lifecycle: Lifecycle }
interface Membership { id: Id; person: Id; faction: Id; role: string; since: number }
interface Posting { id: Id; workplace: Id; profession: string; filledBy?: Id; lifecycle: Lifecycle }
// The staged layers' records (owner-staged: floating islands and sewers are toggles after the city is mastered; the base carries these records empty)
interface SkyIsland { id: Id; outline: Polygon; elevationCm: Cm; terrain?: Terrain; terrainEcho?: { river?: Id /* the ground river it echoes */; relief?: 'echo'|'own' };
  plat: PlatSet; districts: Id[]; reason: 'prosperity'|'institution'; institution?: Id; placement: { over: 'water'|'fields'|'outskirts'|'core'; byAssignment: boolean }; occlusion: 'opaque'|'ghost'|'offset' }
interface Tunnel { id: Id; kind: 'drain'|'main'|'culvert'|'passage'; centreline: Polyline; widthCm: Cm; invertCm: Int32Array /* per vertex, below ground */; follows?: Id /* way */;
  outfall?: Outfall; serves: Id[] /* plots or buildings drained */; chambers?: FaceRef; rule: string }
```

People are never materialised in the document unless an explicit edit pins them (FTG's rule: "locked in" on manual
edit, never on view — LC-16, FTG-10): derivation is `derivePerson(seed, key, tableVersion)` under the person tables current
at the household's creation (`Household.tableVersion`), so a later table edit applies only to later households unless
the user re-derives existing people through a diffed action (§7.5 pattern). Which people a user has opened is per-user
view state outside the document. Content references geometry by id and never the reverse, so the map can be
regenerated without deleting content and content re-solved without moving the map.

**What the new wall, castle and water records settle.**
* **Open traces and the waterfront (FTG-8, COV-MFCG-C07).** An enceinte may be an open chain whose ends are anchored on a
  shore, bank, cliff or another enceinte; its enclosure is closed by the L0 shoreline for every "enclosed" and "sealed"
  test. `waterfront` is a preset row: `open` (MFCG's default and FTG's captured open chain: no wall along quays and
  beaches), `quay_wall` (a wall along the waterfront with a water gate at every quay access), `sea_wall` (a full wall
  with water gates only at the harbour mouth). `placement: 'aroundStage'` walls only a stage's new ring, anchored on the
  previous enceinte (FTG's "around stage lots").
* **Both faces unbuildable (MFP-9).** `setbackCm.inner` and `setbackCm.outer` are both unbuildable bands; the invariant
  "footprints ∩ (band ⊕ setback) = ∅ on both faces" is hard (§5.3), and ribbon plots start beyond the outer setback
  (§4.4).
* **Nesting (GEO-38).** Wall bands, glacis, towers and gatehouses are `FaceRef` unions of per-side parts, like corridors:
  each part nests in the L1 face on its side of the wall edge.
* **Castles (COV-FTG-G09, COV-FTG-G10).** A castle is a reservation (§4.2 S3) with its own curtain, one town-side
  gatehouse on the side facing the castle street, a keep whose shape and position are template rows, internal paths
  (keep ↔ gatehouse ↔ wall stairs), an optional inner ward (an inset of the bailey with its own gate) and a surround row
  (esplanade, park with a perimeter path, plaza, cliff skirt, moat).
* **Bridges (GEO-17).** A bridge is a deck pinned bank to bank, perpendicular to the local flow, created by S1 at a
  crossing site; ways route to its endpoints (§4.3).

**What the content records settle.** `Faction` gains goals, named roles with member criteria and a secret flag (COV-FTG-B12);
`Government` is a blueprint circumstance whose offices force seats (COV-FTG-B13, §10.2); `Religion` carries a generated
pantheon, practice share and clergy rate (COV-FTG-B14); `Person` carries a status and a carer (COV-FTG-C08); the relation
store holds family units, relations, memberships and postings (FTG-9, COV-FTG-C04). `SiteResources` makes raw-resource
availability a site property (COV-FTG-B09), `LandUse` carries crop and livestock (COV-NG-VS27), `Greenery.species` the
species mix (COV-FTG-I11), `Decoration` the hinterland decoration table's output (COV-FTG-I12), and `Pin` the complete
furniture vocabulary: statue, monument, bandstand, market cross, campfire, fire pit, stall (COV-FTG-J02, COV-NG-XB23,
COV-NG-CR23, COV-MFCG-I01, COV-FTG-J05, COV-FTG-E07). The placement rules are in §4.7 S11 and §4.9.

**The staged layers (AM-2, DEF-7).** `SkyIsland` and `Tunnel` are schema-complete hooks, empty in the base; the owner
stages both layers after the city is mastered. An island exists for one of two reasons (`reason`): a very prosperous
neighbourhood or set of neighbourhoods, or a unique institution (a palace overlooking the land, a cathedral, a prison
isolating criminals), by rule or by assignment; it may carry its own terrain that echoes the ground (a conjured river
with the ground river's bearing); it has no relation to the underground layer. A tunnel records what it drains, where it
falls (per-vertex invert) and where it discharges, so the later sewer rules (II.6) have their data model now.

### Block P-4 — §4.1 (items LC-2, FTG-1, SCL-4, DEF-16, GEO-18, GEO-19, MFP-3, FTG-3, FTG-7, GEO-25, COV-VG-VN-002, MFP-2)

=== REPLACE §4.1 Stage graph, evaluation model, transactions ===

### 4.1 Stage graph, evaluation model, laziness contract, transactions, the worker

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r1)

```
S0 Blueprint ─► S1 Site ─► S2 Programme ─► S3 Siting + reservations + gate sites ─► S4 Backbone ─► S5 Stage k (for k = 1 … K) ─────────────────────────────►
 params, sub-    terrain, L0   roster demand,    centre(s), provisional stage-1         L1 arterial     S5a boundary (travel-cost level set) + enceinte trace + gates
 seeds, auto     water, decks, plot quotas per   boundary, N gate sites, bearings,      graph, decks,   S5b main-road step (new primaries for stage k)
 features        resources     stage × class ×   L0 basins / moats / canals, L1         plaza attach    S5c growth of secondaries (regime rules; district scale in walled cores)
                               band              barrier faces (castle, plaza, …)                       S5d capacity check (one bounded top-up)
     ─► S6 Districts, quarters, field pass 1 ─► S7 Fortification furniture ─► S7b Allocation + district claims ─► S12a Hinterland land + outside plots
        grower over coarse faces, typing,        towers, bands, gatehouses,     roster → districts (and the         field systems, farmsteads, mills, quarries,
        quarters, FieldBands                     castle weld, water furniture   hinterland), claims > 1 block      decorations, crops (count-driven)
     ─► S8 Infill (per district) ─► S9 Corridors (L2) ─► S10a Block allocation + field pass 2 ─► S10 Plots (per block) ─► S10b Placement (per district)
        bent cuts, deep-interior       corridor union        allocation → blocks and sub-districts,     frontage-first, regions,    allocation honoured;
        treatment, rear lanes (L1)                           institution / noxious kernels              vacancy runs, bounds        live-in; outside plots
     ─► S11 Site plans + footprints (per block) ─► S12b Greenery ─► S13 Names + labels ─► S14 Display list ─► S15 Simulation (optional module)
```

* **The graph is built from declared I/O (COV-VG-VN-002).** Each `Stage` registration declares `{inputs, outputs,
  streamKeys, invariants, ladder, budgetMs per rung, batch scope}` (§14). The pipeline is the directed acyclic graph those
  declarations induce, topologically sorted with the stage id as the deterministic tie-break; the base's registrations
  yield exactly the order drawn above, and a cycle is a registration error caught at load. A later product may register a
  stage that the base does not have (the village's density stage before its network, its palisade before its roads —
  PART III) without editing the pipeline. `*`-marked behaviour of the old chart is now S5's: each growth stage k runs
  S5a–S5d in order, and the same S5 runs incrementally for an epoch (§4.11).
* **Order rationale.** Water before roads, *including* every carved water body — harbour basins, moats and canals are
  reserved and carved into L0 at S3, so no street is ever laid on ground that later becomes water (FTG's order,
  `_critic.md` C12; GEO-19). Programme before layout (FTG: buildings and people decided before geometry — kept as the
  *demand* side; geometry answers with capacity, O7). Large claims before streets: the castle bailey, the main plaza, the
  market, church precincts and large institutions are reservations inserted as L1 barrier faces at S3, before S4 routes
  (MFP-3); district-level claims larger than one block are cut out at S7b, before S8 cuts lanes (FTG's landmark-first,
  FTG-3). Walls before the streets they enclose: each growth stage's boundary and its enceinte trace are fixed in S5a,
  gates first, *before* that stage's secondaries grow, so a secondary never crosses a wall except at a gate and the
  intramural fabric inherits the wall's direction (MFCG builds its wall before its bisection; GEO-18, MFP-2). Districts and
  the first field pass before infill (the infill's block band is the district class's, J-2). The hinterland's land before
  placement (S12a before S10b), so the roster's farms, mills and quarries have outside plots to go to (FTG-7). Greenery
  after site plans (it reads yards and claims).
* **The laziness contract (LC-2, FTG-1).** A stage may run lazily for a scope X (a district, a block, a tile) only if its
  output for X is a pure function of eager upstream state and X's own sub-streams, it reads no other scope's lazy output,
  and it writes nothing outside X. Everything that decides the town's *content* is eager and town-wide: S2's roster, S3's
  reservations, S6's field bands, S7b's and S10a's allocations. The per-district stages (S8, S10, S10b, S11, S12b) read
  those records and their own district's sub-stream only, so any order of derivation — viewer order, worker order,
  headless order — gives the same model. The F-CUT substitution rung reads the district's allocation, never live roster
  state; S13's names draw from `naming/*` streams per entity; label *placement* at city LOD is eager in S13 (priority, then
  id order), and placement at finer LOD bands is view data outside the model hash (§9).
* **The one-click first paint is the complete city LOD (SCL-4).** `generate({seed})` runs S0–S13 eagerly for every
  district at city-band detail: every footprint with its wings and heights, every quarter and district label, the
  hinterland and the greenery faces. Laziness is restricted to what the city band does not draw: yard sub-part detail at
  district LOD, entrance glyphs, roof constructions and hatching, way names and addresses, pins below the city band, tree
  instances and crowns, stage-2 close-up detail and stage-3 compositions — each a pure function under the contract. At
  METROPOLIS only, if S10–S13 have not finished within 150 ms of S9 committing, the worker delivers one **preview**
  (blocks as masses in the ground tone of the figure-ground contract, §8, no footprints, no district labels, a visible
  "drafting" state); the complete city frame replaces it exactly once, and the report records the preview's duration.
  TOWN and CITY never show a preview.
* **The model hash (LC-2).** The document's hash covers the eager model (everything the city LOD draws plus the
  allocation and field-band records). CI derives every lazy output of 50 METROPOLIS seeds in three random district orders
  and with workers on and off, and requires identical *derived-complete* hashes; a viewer's order can therefore never
  change the town.
* **Transactions.** S3 commits one batch (reservations and L0 carvings); S4 one; each S5 stage one batch per sub-step
  (S5a trace, S5b main roads, S5c growth); S7b one per district; S12a one; S8 one per district; S10a one; S10 one per
  block; S11 one per block (so a row's party walls are one shared L4 edge, §4.7); edits one per event (§3.3). S8 is the
  only stage after S5 that writes L1 (lanes, rear lanes and through-alleys, §4.6); S10 never writes L1 (GEO-25).
* **One generation worker, and the district pool decided now (DEF-16).** The pipeline runs in one Web Worker with
  transferable buffers and incremental delivery; rendering happens on the main thread from the display list. The
  per-district pool for S10, S10b, S11 and S12b is specified now, not "behind a need": because the laziness contract makes
  each district's output a pure function of eager state, its allocation and its own sub-stream, districts can run in
  parallel on per-worker arenas (reserved id ranges), and results merge in district id order with no shared-edge writes
  (district boundary edges belong to L1/L2, committed before S10). **Measurement:** M2 runs METROPOLIS single-threaded on
  the reference machine against §12's 1 s p95. **Pre-decided fallback:** if it misses, the pool switches on for
  METROPOLIS with `min(4, hardwareConcurrency − 1)` district workers; the golden suite already runs workers on and off and
  requires identical hashes (§6.5, §13.2), so the switch is a configuration, not a redesign. *Judgment:* chose
  single-worker-first with the pool fully specified and switched by that measurement over pools by default, because a
  single worker is simpler to prove deterministic and the TOWN and CITY budgets do not need parallelism (§12).

### Block P-5 — §4.2 (items COV-MFCG-A03, COV-MFCG-Q01, GEO-13, GEO-14, GEO-36, IMP-9, COV-FTG-H04, COV-FTG-H06, COV-FTG-H07, COV-FTG-H11, COV-VG-WC2, GEO-17, COV-FTG-B09, FTG-2, MFP-6, FTG-14, MFP-3, GEO-19, MFP-4, COV-MFCG-E04, FTG-19, COV-FTG-B13, COV-NG-N06, AM-2)

=== REPLACE §4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting ===

### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations and gate sites

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r1)

**S0 Blueprint.** `Blueprint = { version, seed, size: { rung: TOWN|CITY|METROPOLIS, population? | areaHa? | buildings?, tolerance },
intent (§7.7), site request (coast side / bearing with two arm rows, river with inflow bearing, islands and mouth, lake,
hill, …), toggles (walls, castle: 'inside'|'on_enceinte'|'outside'|'auto'|'none', castles: 0–2, plaza, temple, harbour,
farms, forests, shanty, greens, waterfront: 'open'|'quay_wall'|'sea_wall', wallPlacement — MFCG's flags kept as intent),
circumstances (era, government, biome, economy, landscape toggles: fertile land, mines, quarries, fishing, logging),
style, assignments, edits }`. Parameter expansion (intent → the ≈ 200 internal parameters) is a pure function held in data
(§7.7). **Auto features (COV-MFCG-A03).** Every toggle left on `auto` is resolved by a per-rung **feature table** —
P(coast), P(river), P(castle), P(castle on the enceinte), P(temple), P(harbour | coast), P(shanty), P(greens) … — drawn
once from its own concern `blueprint.features` before any other stage, never redrawn by a later rung, so "Enter" varies
the structural features the way MFCG's master switch does; every auto-resolved value is recorded in the report with its
reason (O16 b). **What the base supports, stated (COV-MFCG-Q01).** Several enceintes (§4.8); 0–2 castles (a second castle
is a citadel on the outer enceinte, by request or by the METROPOLIS row); islands, confluences and distributaries (S1);
non-circular and multi-cluster (polycentric) settlements (S3); routed non-radial arterials (§4.3); generated institutions
(S2); multi-line labels (§9); continuous zoom, save and load (§8, §2.9).

**S1 Site (O1; the mechanism that removes whole-map restarts).** (1) **Heightfield**: 5-octave fBm (VG's measured
character, `_critic-vg-ng.md` V7) with a low base frequency and a relief-character amplitude (flat / rolling / hilly /
mountainous, metres by class) plus **authored site primitives** from the request (hill, spur, valley along the river
bearing, terrace, cliff, ravine, hollow for a lake — VG's `createMount/Hollow/Ridge` idea); heights are stored in the
range and datum §2.3 declares.

(2) **Coast.** From a sea bearing (MFCG's `sea` angle kept as the request's coast bearing) and an intent (bay / headland /
straight / fjord / islands), one **closed-outline routine** draws the sea polygon. *Arms (COV-FTG-H04):* the base line is two
arms from a point near the town toward two frame edges, each arm with its own **shape** row (smooth / gentle / sharp: the
lateral amplitude and count of the arm's 3–5 control points, then a centripetal Catmull-Rom through them) and its own
**detail** row (none / bays / deep bays / rough / jagged: fBm amplitude, frequency, warp strength and, for bays, the count
and depth of indentations) — our own values, all calibratable. The base line is displaced by domain-warped fBm with an
amplitude envelope that damps detail near the town (FTG's "ease into detail") → resample → Chaikin. **Simplicity
(GEO-13):** the normal displacement at every sample is clamped to 0.8 × the local feature size on that side (the distance
from the sample to the base shape's medial axis, taken from its straight skeleton — for an open arm, the distance to the
facing arm or the frame), which keeps small islands, elongated ovals (whose end radius is ≈ b²/a) and fjords simple for any
fBm draw; if the resampled ring still self-touches, a non-zero union repairs it, the component containing the anchor (the
town side) keeps the outline's id, and every other loop is typed by rule — a land loop in the sea above the minimum islet
area is an `islet`, a water loop on land above the minimum pond area is a `pond`, anything smaller is absorbed — and
reported. Property test: 10 000 outlines per intent → 0 self-intersections, 0 untyped loops. **Contours and coast
(GEO-14):** the vector coast is authoritative; the raster is lowered below sea level on the sea side and every land cell
within two cells of the shore is raised to at least sea level + 10 cm (every sea cell at most sea level − 10 cm), and
contour lines are not model geometry: they are extracted per render tile by marching squares and **clipped to the land
faces in vector space before emission** (§8), so a contour cannot cross the shore on any coast, cliffs and sub-cell spits
included; steep-coast and cliff fixtures are in the golden suite. The same routine with a closed base curve makes lakes
(from sinks), ponds, islands (a raised closed curve) and — with `elevationCm` set — **the floating-island outline of the
LAYER hook**, which may carry its own terrain from the same S1 with a request that echoes the ground (e.g. a conjured
river with the ground river's bearing; AM-2). For a standalone or sky outline the base curve comes from an **outline
template** row — disc, D-shape, lozenge, crescent, spindle — scaled to the requested area (COV-NG-N06; II.1).

(3) **Hydrology.** Priority-flood sink filling with the flat resolution §2.3 declares, D8 flow direction and accumulation;
**rivers by descent**: the inlet on the frame's upstream edge (from the requested bearing or the highest frame edge), the
course traced by steepest descent with a lateral meander term — a Chaikin-smoothed control polyline whose knots sit
mostly on alternating sides, our own construction; VG's live course is a different one, a terrain-independent spline
through 6–7 control points laid before its terrain (COV-VG-WC2) — **the terrain carved to the course** so the river always
reaches the sea, a lake or the frame; width `w = w0 · acc^0.4` clamped to the class band (FTG's ≈ 31 m mean river width at
CITY is one calibration point); tributaries by the same rule from secondary inlets. **Bounds (GEO-36):** knot offsets are
clamped to half the control spacing and the course is tested for simplicity (a self-touching course is re-traced with the
offsets halved); carving is capped at `carveMaxCm` (table: 400 cm at TOWN and CITY, 600 cm at METROPOLIS) — a course that
would need more is re-routed by the F-RIVER rung (re-trace from the last good knot, then move the inlet), never trenched.
**Mouths (IMP-9, COV-FTG-H11):** `mouth: 'estuary'` is a widening width profile (`deltaRiver` in MFCG is a widened mouth,
`_critic.md` C15); `mouth: 'delta'` splits the course inside the delta zone (within the table's distance of the sea, where
the bed slope is below its threshold) into 2–4 **distributaries** at splits spaced ≥ 3 channel widths, each carrying a
share of the accumulation drawn from the `water.delta` stream (each ≥ 0.2), each of width `w0 · (share · acc)^0.4`, each
traced by descent to the sea without rejoining; a distributary that would meet another merges, and the land between
becomes a river island under rule (4).

(4) **River islands** (the parity judge's shared repair): a `river: { islands: n }` request adds a branch that leaves the
course and rejoins it after k cells, typing the enclosed land as an `islet` L0 face, **only if** the branch's separation
from the main channel stays ≥ (w_main + w_branch)/2 + the minimum islet width (table: 20 m); otherwise the island is
reported as not built. Mid-channel islets appear at reaches wider than a table threshold with a per-reach probability.

(5) **Crossing decks (GEO-17).** The narrowest / shallowest reaches within a search band become crossing sites, typed
`ford` (width < table) or `bridge_site`, with a minimum spacing (FTG's 40 m as the table default). Each bridge site is
emitted as a **pinned deck**: a bank-to-bank segment perpendicular to the local flow (the course tangent averaged over one
channel width upstream and downstream), its endpoints on the banks, its vertices pinned against every later smoothing.
S4 routes to the deck's endpoints as a fixed graph edge (§4.3), so "bridges within ± 10° of the channel normal" holds on
the way itself by construction.

(6) **Harbour candidates**: coast faces with depth ≥ threshold. (7) **Bank classes and bay / headland (COV-FTG-H06):**
every shore segment is classed `bay`, `headland` or `straight` by the signed curvature of the shoreline smoothed over
200 m (thresholds in a table); its bank kind — beach / rock / cliff / quay / marsh — is drawn from a per-class weight
table (our own weights) conditioned on slope and exposure (G-R5), so bays tend to beaches and headlands to rock and
cliff; the class is kept per segment for the shore decoration of §8. (8) Water faces enter L0 with `shore` / `bank` edges;
land components by flood fill (MFCG's `buildDomains`); every land component gets uses later (O14 g). **Shore setback
(COV-FTG-H07):** a table `shoreSetback` per bank kind (plots: beach 6 m, marsh 10 m, rock 3 m, cliff 5 m from the edge,
quay 0 m because quay plots front the quay way; fields: 10 m) is read by S10 and S12a; the band is typed `shore` greenery
or commons. (9) Drainage stays queryable. (10) **Resources (COV-FTG-B09):** `SiteResources` rasters on the terrain grid —
stone from slope, rock class and cliffs; ore from relief times an fBm propensity (hills only); timber from the forest
propensity (slope and soil class, realised as woods in S12a); fish from water adjacency and reach width; clay from low
damp river flats; fertile land from gentle, dry, non-rock ground. The S0 landscape toggles clamp a kind to zero or raise
its floor. S2's resource gates and S12a's outside sites read these rasters.

**Restart-free by design**: if a requested feature is infeasible on the drawn site, S1 adjusts inside its own ladder
(F-RIVER, §5.2) — the source moves along the frame edge, a sink is carved deeper within its cap, the course re-traces —
never the whole map.

**S2 Programme (the roster demand side; O7).** From `population` (or derived from area / buildings by the size tables):
households by wealth band, institutions (market, temple, churches per capita, guild halls, inn, mill on water, tannery;
the seats the `government` circumstance forces — a crown seat or a lord's castle or keep, a bishop's palace, a town hall
or guildhall, per §10.2, COV-FTG-B13), building demand per class from **our own** dependency tables run as the
**sequential, prefix-stable roster** of §10.2 (FTG's idea, none of its values), with resource gates read from
`SiteResources` ("no farmland → no farms, shops instead"). Outside classes (farmsteads, mills, quarries, lumber yards,
fisheries, mines) are demanded here and sited on S12a's outside plots (FTG-7).

*Demand in plot counts (FTG-2).* Stage demand is **plot counts per class × band**: `n(c, b, k)` = the class's demand ×
the band shares × stage k's quota share. Residential band shares are the roster's household wealth shares (the character
vector shifts them); workplace bands come from the class row's lifestyle band. The stage's land is
`A_k = Σ_(c, b) n(c, b, k) · plotArea(c, b) / plotShare(regime_k)`, with `plotArea` the *plot* area of the granularity
table's band centre (§4.7; footprints and coverage are not in this formula) and `plotShare` the measured share of a
stage's land that is plots (the rest is corridors, squares, greens and residue): **dense core 0.62** — MFCG's gross lot
cover inside the wall is 0.60–0.65 at sizes 40–250 and its lots are plots in our sense (`captures/mfcg/exports-sweep-
2026-09-25/README.md`, CONFIRMED) — gapped rings 0.55, ribbon 0.45 (PLAUSIBLE). *Judgment:* chose plot counts per band with
a measured plot share over the synthesis seat's single area per class with `builtBlockShare = 1 − 0.38`, because FTG's 38 %
is footprint over lot, not plots over land, and one area per class ignores the 11× plot-size spread across bands.
**Measurement:** M-1 #5 (FTG face recovery) measures FTG's plot share; M1 measures B-CITY's own per regime. **Fallback:**
if S5d's top-up fires on more than 10 % of B-CITY seeds at a rung, the `plotShare` rows are refitted from B-CITY's
measured share per regime by one scripted pass, with a declared golden shift (§13.3).

*Stages and the walled share (MFP-6).* Stage rows per rung (a table, era-calibratable): **TOWN** 2 stages — walled core
0.90 of buildings, ribbon 0.10; **CITY** 3 — inner walled 0.55, outer walled 0.33, ribbon 0.12; **METROPOLIS** 4 — inner
0.30, middle 0.30, outer 0.28 (all walled), ribbon 0.12; the FTG cul-de-sac **suburb** regime is added only by the era or
form preset or by the shanty toggle. The share inside the outermost wall is thus ≈ 0.9 at TOWN and ≈ 0.88 at CITY and
METROPOLIS, anchored on MFCG's measured 0.87–0.92 inside the wall at sizes 40–250 with shanty towns off (sweep README,
CONFIRMED). *Judgment:* chose MFCG's walled share over the synthesis seat's 0.35–0.5 (an addition to D-2, not the owner's
era default) because a mostly-extramural default reproduces MFCG's size-80 shanty case, the wall is the town's signature
silhouette (R6), and a compact walled town with ribbons on its approach roads is the historically constrained medieval
pattern; FTG's ≈ 20 % walled preset stays reachable as a preset row, and the corpus phase recalibrates the rows. Output:
`Roster` (demand by class with area / frontage requirement classes, district affinities, wealth bands) and `StageQuotas[]`
(plot counts per class × band, land area, regime per stage: dense core → gapped rings → ribbon, plus the optional suburb;
FTG's zonal gradient, R4).

**S3 Siting, reservations and gate sites (the large decisions, made before any street).**
1. **Centre(s).** Candidate centres on a coarse lattice inside the frame's middle third are scored by a rule table:
   distance to a crossing site (river towns sit at fords and bridges), to the harbour candidate, slope, elevation above the
   flood line, wind exposure, distance from the frame, plus a controlled random term; the best is the **centre / market**.
   **The site is placed relative to the river** (G-P14), so "no river through the core" cannot occur when a river is
   requested; the invariant is checked here and repaired by moving the centre, never by re-rolling. **Polycentric forms
   (IMP-9):** the `twin-town` and `polycentric` form rows site k = 2–3 nuclei at a separation band (400–1 200 m by rung),
   each scored the same way; each nucleus receives its own share of stage 1 and its own stage-1 boundary and enceinte;
   the ground between them is grown as an extramural regime in S5, and the market sits at the highest-scoring nucleus.
2. **Provisional stage-1 boundary.** The S5a construction (a travel-cost level set enclosing stage 1's land, §4.4) is run
   once here on the terrain alone, giving the intended first enceinte that reservations and gate picks read; S5a later
   recomputes it with the arterials and pins its gates.
3. **Reservations (MFP-3, GEO-19).** S3 emits `Reservation` polygons and commits them in one batch: the **main plaza**
   (area band TOWN 0.25–0.45 ha, CITY 0.35–0.6, METROPOLIS 0.45–0.8, anchored on MFCG's 0.32–0.58 ha across sizes 40–250
   and the red team's 0.36–0.54 ha; a compact 4–6-vertex polygon at the centre aligned to the contours, compactness ≥ 0.8;
   its vertices are the attach points arterials end at, so the plaza acts as MFCG's roundabout); the **castle bailey** when
   a castle is requested or drawn (sited by defensibility = height + water on ≥ 1 side + control of the main route,
   `docs/IMPROVEMENTS.md` O8 d, restricted by the `castle` option to inside / on the intended enceinte / outside; a 5–7-vertex
   polygon on a jittered circle, area band TOWN 1.0–3.0 ha, CITY 1.5–3.5, METROPOLIS 2.0–5.0, anchored on MFCG's plain-size
   castles of 1.3–3.4 ha, compactness ≥ 0.75 — MFCG's threshold; `on_enceinte` places it across the provisional boundary so
   that exactly two of its vertices lie on it, the weld vertices); the **temple or cathedral precinct** adjacent to the
   plaza by score, sized from its institution row; a separate **market square** when the roster asks for one (CITY and
   above); and the **water reservations** — a harbour basin (a template shape: rectangle, semi-octagon, semi-hexagon, L wide
   or narrow, scaled to port demand) at the chosen harbour candidate, a castle moat (a ring band around the bailey when
   water is within reach), a city moat along the provisional boundary when requested, and canals along a least-cost line
   between two water bodies — which are **carved into L0 here**, before S4, and seen as water by every later stage. Land
   reservations enter L1 as barrier faces: no way crosses them (S4, S5), S8 does not cut them, and the claimed entity is
   built inside them (§4.7, §4.8).
4. **Gate sites (MFP-4, COV-MFCG-E04).** `N₁` = the request, or `round(1 + 0.47 · √A_ha)` with A the stage-1 land — a law
   that reproduces MFCG's 5 / 8 / 12 gates at sizes 40 / 80 / 130 from their walled areas of 58 / 220 / 548 ha (and 18 at
   size 200) (`docs/validation/bench/fixall_pipeline_mfcg_fits.out`, this lane, from the sweep README). Gates are **sequential nested picks** on the provisional
   boundary from the `gate.pick` stream: pick i scores the boundary's candidate points by angular gap to the earlier picks,
   nearness to a requested bearing, terrain (saddles and valley exits score up, steep ground down) and a jitter, so a
   smaller N is always a prefix of a larger one. Each gate carries a **bearing**: the requested bearing it serves or, when
   none was requested, the least-cost outward direction from the gate to the frame. Where the river crosses the boundary,
   **water gates** are added (not counted in N). `N = 0` produces no gate and no external arterial through the wall; the
   sealed circuit is reported and the extramural stages are folded into the walled stage.
5. **Destinations** are typed entities: the plaza's attach points; each gate and its bearing (an **external bearing** per
   gate for a walled town; an unwalled town derives its bearings by the same law on its own land); the crossing decks
   (inside the boundary they connect in town; outside, through the nearest gate); the harbour; the castle's single
   town-side gate; the precinct. **Island towns (FTG-19):** when the settlement's land component does not touch the frame,
   external destinations are shore points — the harbour, one **landing** per requested bearing (the shore point nearest the
   bearing with the best deep-water score) and a ferry point — and O4 (g) counts landings as the external connections.

### Block P-6 — §4.3 (items GEO-16, GEO-17, MFP-3, MFP-4, COV-MFCG-E04, FTG-19, FTG-4)

=== REPLACE §4.3 S4 Backbone — arterials routed between named destinations ===

### 4.3 S4 Backbone — arterials routed between named destinations, built as one graph

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r1)

**Lattice and costs.** Arterials (`through`, `primary`) are routed between the S3 destinations on a **candidate lattice**: a
jittered hexagonal point set at ≈ 25 m spacing whose adjacency is known by construction (six neighbours per point, the
jitter bounded so no edge crosses another; no Poisson sampling, relaxation or triangulation is needed). Edge cost =
length × (1 + k_slope · slope²) × waterCrossingPenalty (impassable except along a pinned crossing deck, §4.2 S1 (5)) ×
reservationPenalty (impassable inside a reservation; the plaza and castle are reached only at their attach points and
gate) × wallCrossingPenalty (only at gates) × existingFabricCost (epoch > 0: crossing a built face costs by its class, so
growth reuses streets) × landValue; heap A\* (the 2017 BFS is replaced).

**Routes.** For each gate: its attach point on the plaza ↔ the gate (the inward street, `primary`) and the gate ↔ the frame
edge at the gate's bearing (the outward arterial, `through`), so roads leaving the walled stage = N exactly and each gate
carries one road out and one street in (MFCG's gate identity; MFP-4). Crossing decks inside the provisional boundary
connect to the nearest arterial in town; decks outside it connect through the nearest gate, never through a new wall
crossing. Harbour ↔ plaza; the castle's town-side gate ↔ plaza (the castle street); the precinct's frontage ↔ the plaza
side it faces. Island towns route gate ↔ landing (§4.2 S3). Polycentric towns add one arterial between each pair of
adjacent nuclei's plazas.

**One graph, then one smoothing (GEO-16).** All routes are solved first on the lattice; the arterial graph is the union of
the lattice edges they use, each edge carrying its multiplicity (how many routes share it). The graph is split into
chains at every node of degree ≠ 2 and at every pinned node (gates, attach points, deck endpoints, landings); junctions
closer than 8 m are merged *on the graph*; each chain is then simplified (Visvalingam) and smoothed (Chaikin × 2, then
curvature-limited to the class's minimum radius) **once**, with its end nodes pinned, and inserted into L1 **once** as a
spine. Routes that share a run leaving the plaza therefore become one street, never braided near-duplicates. Class and
width come from multiplicity and betweenness on this graph (the width table is keyed by class and the class by
betweenness, O4 c). Junction rules: minimum crossing angle 30° (else deflect), **Y → T conversion** where the acute arm can
be bent within its class curvature limit (G-P5). A deck is a fixed edge of the graph: smoothing never moves its vertices
and each approach curve stays within the class radius; if an approach cannot meet the radius, the F-ROUTE rung moves the
crossing site along its reach (§5.2). Test: on B-CITY, no two spines run closer than their class separation for more than
one step length; every deck's way angle is within ± 10° of the channel normal.

**Result.** Through-roads continue to the context margin with their bearings (O14); MFCG's radial gate → plaza legibility
(CONFIDENCE B7: streets converge on the plaza) with real metres and terrain (O4 a, d). Later growth stages add main roads
through the **main-road step** (§4.4 S5b), which runs this same router incrementally with every existing arterial fixed.

### Block P-7 — §4.4 (items FTG-5, COV-FTG-D26, GEO-18, FTG-8, COV-MFCG-C07, FTG-4, MFP-2, MFP-4, FTG-6, FTG-17, FTG-18, FTG-20, GEO-37, MFP-6, MFP-9, FTG-2, IMP-9)

=== REPLACE §4.4 S5 Growth — FTG-shaped staged growth of the secondary streets, with the suburb regime ===

### 4.4 S5 Growth stages — boundary and wall first, main roads, then FTG-shaped growth, then a capacity check

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r1)

Each growth stage k runs four sub-steps in order; stage 1 reuses the gate sites and reservations S3 fixed.

**S5a Stage boundary and enceinte trace.** *Boundary (FTG-5, COV-FTG-D26):* the boundary of stage k is a level set of
**network travel cost**: `T(x)` = the least cost from the centre(s) (stage 1) or from the previous boundary (k ≥ 2) over the
S4 lattice, where a lattice edge inside an arterial's corridor costs ρ_road per metre and any other edge ρ_off per metre,
both times the slope term; water is impassable except along decks and reservations are impassable. The **anisotropy
ratio** `a = ρ_off / ρ_road` is a stage-regime and form row — our equivalent of FTG's spoke-priority control: walled core
1.3, walled rings 1.8, ribbon 4, suburb 3, `linear-street` form 8 (our own values; FTG's measured road / non-road
90th-percentile radius ratio of 1.26–1.65 on its two captured cities is the calibration target for the extramural
stages). The threshold `t_k` is chosen so the land inside `{T ≤ t_k}` equals stage k's land `A_k` from S2 (lattice nodes
sorted by T, their cell areas accumulated; exact to one cell); the boundary is that contour, Chaikin-smoothed and
resampled. On a flat, dry site a walled core is therefore compact and the outer stages stretch along the main roads;
`a` is also the control over the wide-versus-elongated balance of ribbons and suburbs. B-REF measures the land-sector r90
coefficient of variation and the road / non-road r90 ratio on ours and on FTG's payloads and requires both to be monotone
in `a` (§13.5).

*Trace (GEO-18, FTG-8).* For a walled stage the trace is fixed **now, before the stage's secondaries grow**: the boundary →
pulled to defensible ground within a 40 m search band (local ridges, slope breaks, river banks: a cost-surface path
around the town with a penalty for leaving high ground) with **the gates pinned** (stage 1: S3's sites, crossed exactly by
S4's arterials; k ≥ 2: the crossings of the S5b primaries) and an `on_enceinte` castle **welded through its two claim
vertices** (the shared castle edge is one wall; MFP-3) → pinned-vertex Laplacian smoothing → **topology-preserving**
Visvalingam (minimum segment 20 m, no interior angle < 100°; a removal that would make the trace touch itself, cross water,
enter a reservation or move a pinned vertex is refused) → inserted as `wall` / `wall_gate` edges on L1. Water: the trace
never crosses water except at a **water gate** where a river passes; on a coast or a river bank the trace is an **open
chain** anchored on the shore at its two ends, with the enclosure closed by the shoreline, and the preset's `waterfront`
row decides whether a quay wall or sea wall is added along the water (with a water gate at every quay access, so every
quay stays reachable through a gate) or the waterfront stays open (the default: MFCG's coastal wall stops at the water,
FTG's captured wall is an open 17-tower chain from bank to coast). `placement: 'aroundStage'` traces only the stage's new
ring as an open chain anchored on the previous enceinte. Nothing grown later can cross the trace except at a gate, and
S6 treats it as a barrier. If an inward pull would leave the stage's land short by more than the S5d tolerance, the pull
is capped at the smoothing step (reported); the F-WALL ladder's last rung (§5.2) cuts any way that still reaches the wall
at the setback band and prunes the outer stub.

**S5b Main-road step (FTG-4; stages k ≥ 2 and every epoch stage).** The stage's primaries are made to match its gates:
`N_k` = the gate law of §4.2 S3 on the land inside the stage's enceinte (walled), or one primary per `mainRoadSpacingM` of
boundary (unwalled; table: 450 m at CITY). The existing arterials all continue to the frame, so they cross the new
boundary `c` times; when `N_k > c`, S5b spawns `N_k − c` radial destinations on the boundary by nested picks (largest
angular gaps first, terrain-scored like gates) and routes each with the incremental S4 router from the nearest junction on
an existing primary *outside* the previous enceinte (never through an inner wall) to the frame at its bearing; the
crossings become stage k's main gates, posterns only for an explicitly requested remainder. An outer enceinte never gets
fewer gates than arterials cross it; a request below that is raised and reported (a requested gate count applies to the
innermost enceinte, MFCG's semantics). Test: primary length per km² and the share of gates on primaries in band from
TOWN to METROPOLIS; each epoch stage whose `N_k` exceeds its crossings adds ≥ 1 primary.

**S5c Growth of the secondaries.** Inside the boundary a priority queue of proposals grows streets FTG-style (CONFIDENCE C5;
`ftg-docs-params.md` §2.2 via the proposals): each proposal `{origin junction, heading, curvature, goalHeading, class,
remainingSegments, branchCounter, priority}`, lowest priority first; step length by class (secondary 25–40 m, lane 15–25 m;
FTG's district streets persist at (L + 0.5)/2 ≈ 25–30 m, `_critic-ftg.md` F3, our tables start there).
* **Division of labour with the bent cut (MFP-2).** In **walled regimes** S5c grows only the arterial-connecting
  secondary network at district scale — proposals seeded at arterial junctions and gate plazas, separation floor
  120 / 160 / 200 m at TOWN / CITY / METROPOLIS, destination bias toward other arterials — and every lane and every
  finer intramural street comes from S8's recursive bent cut of the district polygon, which inherits the wall's and the
  shore's direction (MFCG's measured lot-orientation coherence of 0.84–0.97 within 60 m falling to 0.32–0.68 within 250 m,
  and its lots within 40 m of the wall aligned to it at a median 3.5–4.5°, are the targets §13.5 measures). In
  **extramural regimes** (ribbon, suburb, unwalled rings, the ground between polycentric nuclei) growth works at block
  scale as FTG's does. *Judgment:* chose the bent cut for the intramural fabric and FTG growth outside the walls over FTG
  growth everywhere, because MFCG's intramural signature (coherence, wall alignment, the connected three-valent alley
  mesh) comes from recursion on the district polygon and the tiebreaker favours the measured construction, while FTG's
  staged growth along roads is the historically constrained form of extramural expansion.
* **Heading model per proposal class and preset (FTG-17, FTG-6).** `ou` — a mean-reverting curvature walk:
  `κ ← ρ·κ + (1 − ρ)·κ_goal + s·√(1 − ρ²)·ξ` per step Δs, with `ρ = e^(−Δs/ℓ)` (correlation length ℓ),
  `κ_goal = (θ_goal − θ)/L_r` (reversion toward the proposal's goal heading over L_r), `s` from `headingSigma` stated in
  degrees per 100 m; organic defaults 20° per 100 m, ℓ = 90 m, L_r = 250 m; planned 5° per 100 m. Executed (this lane,
  `docs/validation/bench/fixall_pipeline_ou_heading.out`, 4 000 streets per setting): at the organic defaults a 600 m street's net turn is p50 21°, p90 50°, 0.1 %
  beyond 90°, and the per-30 m-step turn has p95 11.4°, p99 14.9° with Gaussian tails — no cliff and no curling.
  `radiusHold` — ring proposals keep the curvature 1/r of their radius about the centre with a small `s` (the `ringed`
  preset); `gridLock` — headings snap to the preset's grid table (`american`). CI tests the drift distribution per preset.
* **Branching** after `n` segments with a per-class probability, perpendicular ± jitter (FTG's `Continue`) or tangential
  to the centre (FTG's `Curve around origin`, the `ringed` preset's ring branch).
* **Destination bias**, switchable per class and preset: a proposal that can reach an unserved destination or an existing
  spine within ≈ 1.5 step lengths turns toward it (this connects the fabric and ends cul-de-sacs deliberately); it is off
  for suburb offshoots and ring proposals.
* **Legality (explicit, unlike FTG's unstated thresholds).** Minimum separation from parallel spines = the regime's
  separation; **the same clearance applies to shores, wall setback bands, reservations and the stage boundary** (GEO-37):
  a proposal running within `max(minimum block depth of the regime, separation / 2) + half its corridor` of any of them
  and within 30° of parallel is deflected or rejected, so no strip thinner than a plot depth is left; a proposal meeting
  a shore or a reservation at ≥ 30° ends there (a street arriving at the quay). A wall is never crossed except at a gate:
  a proposal reaching the setback band stops there. Snap to a junction within `0.35 · step`. **Crossings follow the
  preset's crossing matrix** (proposal class × crossed class → stop in a T, cross with a materialised crossroads, or
  deflect): organic crosses only a lower-or-equal class collinear within 6° (the rare crossroads, O4 b); `ringed` crosses
  radials with rings; `american` crosses on the grid. Reject water unless the way uses a deck; slope ≤ class limit.
  Junction rules as §4.3 with T-preference in organic regimes; the junction-degree band is a preset row (organic 4-way
  0–15 %, ringed 20–45 %, american 40–80 %).
* **Between stages:** prune dangling `secondary` chains shorter than one block width; trim only S5-grown provisional
  spines that run beyond the boundary (FTG-18) — **S4 and S5b arterials are never trimmed**. The boundary becomes the next
  stage's start.

**S5d Capacity check (FTG-2).** Right after S5c, the stage's new coarse faces are priced: built land per face = face area
minus the corridor reserve of its spines (declared half-widths) minus reservations; each face's band is the driver-only
prosperity field at its centroid (the same kernels as S6's pass 1) cut by provisional cut points computed exactly as §4.5
computes the recorded bands, over the land grown so far (S6 then records the town's `FieldBands` once, over all stages). If the land per band
falls short of the stage's demand `Σ n(c, b, k) · plotArea(c, b) / plotShare` by more than 5 % in total, **one top-up**
runs: the level set grows to cover the shortfall, S5a re-traces only the affected arc between its pinned gates, and S5c
grows the added rim. A remaining shortfall goes to the exact check after S10 (plots per class × band against the quota)
and to the F-SITING reconcile, reported (F-BUDGET-STAGE, §5.2). B-CITY sweeps `wealthLevel` ∈ {0, 0.5, 1} and asserts
population ± 5 % and the walled share inside its rung band.

**Stage regimes (a table; `StageRegime` rows per rung, era and form):**

| regime | where | block-depth band floor | separation | anisotropy `a` | heading model / bias | notes |
|---|---|---|---|---|---|---|
| dense core (walled) | stage 1 | 30–45 m (applied by S8) | 120–200 m (district-scale secondaries only) | 1.3 | `ou`, bias on | lanes come from S8; T-preference |
| walled rings | walled stages ≥ 2 | 45–70 m (S8) | 120–200 m | 1.8 | `ou`, bias on | courts and rear lanes (S8) |
| ribbon (default extramural) | outside the last enceinte along arterials | plots directly on the arterial, depth band 30–50 m, **starting beyond the outer setback / glacis** (MFP-9), density falloff by a distance-to-gate kernel (MFCG's `filterOutskirts` idea) | — | 4 | — | MFCG's outskirts: 71–85 % of its extramural buildings lie within 100 m of a gate road (red-team EXP) |
| **suburb** (FTG C10; preset, era row or shanty toggle only — MFP-6) | a final regime outside the last enceinte | 40–60 m | 80 m | 3 | offshoots, bias off | an optional **perimeter lane** (FTG-20): the previous enceinte's outer boundary offset by setback and glacis, typed `lane`, broken at arterials, seeds offshoots at a 60–90 m spacing row besides the arterial seeds; offshoots grow as `cul_de_sac` / `lane` proposals **without destination-bias termination** (deliberate dead ends), no infill below the band; plots **directly along the offshoots with small lots from the outset**, a per-plot density Bernoulli from the distance-to-gate kernel leaves gaps; calibration references: FTG's 83 cul-de-sacs, 30.00 m suburb streets, 14.70 m lot outlines (`research/ftg-capture/roadlength100/README.md` via `_critic-ftg.md`) |
| `american` / `ringed` presets | on request | — | preset | preset | `gridLock` / `radiusHold` | crossing matrix and junction band per preset; fixture: `ringed` on a flat site gives ≥ 3 closed rings with radius CV ≤ 10 % and ring × radial crossroads |

**Alternatives rejected (written, as required).** 1 *Partition seeded from a grown skeleton via Voronoi cells around the
arterials*: cell edges are again widthless, classless "streets"; fails the tiebreaker and O4 (a)–(c). 2 *Pure FTG growth
including infill*: the 15°-clamp fabric and "vaguely circular" sameness; loses the NG signature R3 requires; a queue cannot
guarantee block-size bands. 3 *Pure MFCG partition with FTG plots inside*: no destinations, no growth (the evolution hook
needs it), no metres, restart-prone water. 4 *Urban Places' base mesh*: street geometry becomes a function of mesh
resolution, which the precision tiebreaker forbids; its warp/edit affordances are obtained by the vertex arena and
`warp`. 5 *Least-cost connectors instead of growth for the secondaries* (the pipeline proposal's default): defensible
under the tiebreaker, but it leaves FTG's organic staged accretion and the measured suburb signature on the shelf, and the
owner asked for the best of both. 6 *Walls traced after growth* (this document's first version): streets grown before
the wall must then be cut or gated, and the fabric cannot inherit the wall's direction (GEO-18, MFP-2).

**The fusion risk gate (O4 f), and the fallback if it fails.** S4 + S5 + S8 infill ≤ 100 ms at CITY on reference
hardware, block-area and junction-degree distributions of the infill inside the NG-measured bands on the same district
shapes **and** MFCG's street-signature rows (orientation coherence at 60 / 120 / 250 m, wall and shore alignment by distance
band, T/Y share, intramural dead ends, blocks per ha, lots per block) inside their bands (§13.5). M0 measures this before
anything else is built (§16). If the gate fails on time, extramural growth also stops at `secondary` (`lane` becomes
infill-only everywhere) and the gate is re-run; if it fails on statistics, the infill constants are recalibrated against
the NG vertex captures and the MFCG size-sweep exports (spike M0-b) before M1. Neither fallback changes the architecture.

### Block P-8 — §4.5 (items MFP-10, MFP-7, LC-6, AM-6, FTG-2, LC-2, FTG-1, FTG-3, COV-FTG-E02, COV-FTG-B09, FTG-7, LC-12)

=== REPLACE §4.5 S6 Districts and fields — MFCG's grower over the coarse skeleton, typed before infill ===

### 4.5 S6 Districts, quarters and fields · S7b Allocation and district claims

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r1)

**Grower.** Seeds = the sited features (market, harbour, gates, castle, temple precinct, river banks, parks) plus a
density-guided remainder; a **grower** (MFCG's `DistrictBuilder` / `Grower` idea, CONFIDENCE B9) claims adjacent
coarse faces of the L1 skeleton with `validateEdge` = (no arterial of class ≥ primary, no wall trace, no water, no
reservation boundary) unless the seed kind allows it, `validatePatch` = (area within the district band, compactness ≥ 0.5,
no hole); `check4holes` → split; faces below the floor are merged into the neighbour with the longest shared edge.
**One law for count and band (MFP-10):** the district count is `N_d = round(3.5 · √(A_ha / 10))` over the settlement's land
A (FTG's 10 ha anchor sits in its middle), and the band is derived from it — `[0.5, 1.5] × A / N_d` — so the two can no
longer disagree at any size (the mean district grows as √(10A)/3.5: ≈ 7 ha at 60 ha of land, ≈ 13 ha at 250 ha, ≈ 21 ha at
600 ha). A district's `faces` is a `FaceRef`; after S8 cuts lanes inside them, the finer faces inherit the district
through `parent`, so containment is 100 % by construction (O11 b).

**Quarters (MFP-10).** After typing, adjacent districts are grouped into `N_q = round(1.37 · B^0.267)` quarters, B being the
roster's building count — the least-squares fit of MFCG's district counts on its size sweep (9 / 12 / 18 / 22 / 24 districts
at 1 475 / 5 242 / 13 091 / 31 951 / 48 379 buildings; `docs/validation/bench/fixall_pipeline_mfcg_fits.out`, this lane): ≈ 9 at TOWN, ≈ 13 at CITY, ≈ 17 at
METROPOLIS. Grouping is greedy: repeatedly merge the adjacent pair with the smallest combined area whose kinds share a
family (central + market, docks + riverbank, gate + ribbon, craft + craft …), never across a wall or water barrier while
another pair remains, ties by id. The quarter is the city-LOD label unit (§9), so the city view carries MFCG's label count
while districts keep their own names at district LOD. *Judgment:* chose a quarter level over thinning district labels by
priority, because thinning leaves named districts unlabelled at the view the owner compares with MFCG, whereas MFCG labels
every one of its (larger) districts.

**Typing (G-P5; MFP-7).** A data-driven scorer per district kind reads the roster's remaining demand per class, adjacency
(docks at the harbour, gate wards at gates, central → market / merchant, noxious crafts downstream and downwind, near the
castle → military / administration, waterfront → docks) and a random term; faces are typed **greedily from the largest**
with a **mixed-use floor** (no single-use district unless requested, R5). Kinds are **feature-named**; wealth is not a
kind — "the rich quarter" or "the poor end" is a description the naming engine derives from the prosperity field (§10.4),
so no district is zoned residential or by class. A **shanty / squalid** type is allowed only after the first half of the
stages and only outside the enceinte (FTG's staging rule); MFCG's "one prominent feature per named type" survives as the
district's `namingFeature`. The district's `fabric` is `bent-cut` unless a template is requested (PART II).

**Fields (owner: prosperity is a gradient and a band; AM-6).** The **prosperity field**
`P(x) = Σ_i w_i · kernel_i(x) + characterOffset(district) + ε(x)`, clamped once to [0, 1], with driver kernels from a table:
distance decay to the plaza / market, main streets, gates, water and the harbour (+); elevation above the flood line and
upwind (+); low, damp, downwind, flood-prone (−); walls (−); attractors at the reserved institutions (castle, precinct,
plaza); `ε` a low-frequency fBm from the field's own sub-stream with a declared share (default 0.15); smoothed by a
Gaussian of one block width (σ ≈ 60 m at CITY) so neighbours vary gradually; stored per coarse face and as a raster. It is
computed in **two declared eager passes** (LC-2): **pass 1** here, from the drivers that exist after S5 (the same kernels
S5d uses); **pass 2** at S10a (§4.7), adding the kernels around the noxious trades, prisons, middens and institutions the
block allocation has placed. S6's typing and S8's block bands read pass 1; S10 onward reads pass 2.
* **Bands (LC-6, FTG-2).** The cut points are computed **once per town** so that the share of built land falling in each
  band equals that band's share of the plot land the roster demands (household wealth shares × the band's plot areas,
  S2) — band capacity and band demand agree by construction — and recorded as the town's `FieldBands` (§2.5). They move
  only by an explicit edit of that record or by an epoch; a field brush never moves them. A block keeps its recorded band
  unless its value crosses a cut point by more than the hysteresis (0.02), so a replay reproduces the session's bands.
  Bands are used **only where a table needs a class**; continuous rules (coverage, plot size, greenery share, building
  scale) **interpolate linearly between band rows along the value**, so quarters blend at their edges.
* **Brush (§7.2).** A stroke is a **relative** raster Δ composited over the driver field, the sum clamped once; it
  re-derives every block whose plot samples moved by more than τ = 0.01 of the field range (the plots' `DerivationRecord`
  holds the last samples), and replay applies the same τ; strokes persist as events and survive epochs as Δ over the
  re-evaluated drivers.
* **Over time (LC-12).** An epoch re-evaluates the drivers with the new circumstances; surviving plots keep their built
  state and change only through the explicit, rate-limited transformation events of §4.11.
* **The owner rule, clause by clause (AM-6).** Continuous field: `P(x)`. Predictable drivers: the kernel table (centre,
  market, main streets, gates, water / harbour, high versus low / damp / downwind ground, noxious trades, walls, prisons,
  institutions). Controlled random component: `ε` with its declared share. Banded only where a table needs a class:
  `FieldBands`. Continuous rules interpolate: §4.7, §4.9. Dynamic over time yet predictable: epochs move the drivers,
  survivors transform by rule. Editable: the brush and `setAttr` on `FieldBands`.

The **density field** and the **greenery propensity field** follow the same construction with their own driver tables and
their own `FieldBands`. A second S6 pass applies the district-type term after typing.

**S7b Allocation and district claims (runs after S7; LC-2, FTG-1, FTG-3).** Everything that decides the town's content is
decided here, once, for the whole town, before any lane is cut:
1. **Town → districts.** The roster's demand per class × band is allocated to the districts — and, for the outside
   classes (farmsteads, mills, quarries, mines, lumber yards, fisheries), to the **hinterland** pseudo-district (§4.9
   S12a) — by capacity (each district's built land per band from pass 1) and affinity (district-kind affinity rows,
   adjacency to features, resource sites from `SiteResources`), greedy in a declared order (institutions, then large
   workplaces, then households; classes by priority then id; districts by score then id) from the `alloc.district`
   stream. A bounded reconcile (≤ 3 rounds) moves counts between districts before any placement. The result is persisted
   as one `Allocation` per district.
2. **Sub-districts (COV-FTG-E02).** Classes carrying a cluster tag (a trade group) whose allocation in a district exceeds a
   threshold share get a `SubDistrict`; S10a gives it a contiguous group of blocks sized to its allocation, so industries
   clump inside their district as FTG's sub-districts make them.
3. **District claims (FTG-3).** Every item larger than one block — institutions whose requirement exceeds the district's
   block band, the district's share of the park and green quota (§4.9), area-bearing assignments, a castle's esplanade —
   is sized from its requirement table and cut out of the district's coarse faces with `claimSubFace` at the best
   siting score inside the district, entered as a `Reservation`; S8 cuts around it as a hole (the slit exists), S10 keeps
   only sub-block claims, and S12b builds parks only on reserved faces or residue. Test: 100 % of institutions and parks
   larger than one block placed at their requirement (O18 f).

### Block P-9 — §4.6 (items MN-3, COV-NG-N18, COV-NG-N19, COV-NG-N20, GEO-21, GEO-22, GEO-23, GEO-25, IMP-8, COV-MFCG-C05, GEO-42, MFP-2, COV-MFCG-G03)

=== REPLACE §4.6 S8 Infill — the bent cut as a kernel transaction (NG's primitive, made robust), per district ===

### 4.6 S8 Infill — the measured bent cut as a kernel transaction, per district, with the deep-interior rule

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r1)

Runs per district (one batch each) on every coarse face, minus its reservations (which are holes), whose kerb polygon
(the kernel's single kerb function: the face minus the buffered spines, §3.4) is larger than **the district class's block
band** (from the granularity table, §4.7, at the district's pass-1 band), floored by the stage regime's band (§4.4) — the
parity judge's sequencing repair. In walled regimes the faces are district-scale (S5c grew only arterial-connecting
secondaries), so this recursion produces every intramural lane and secondary and propagates the wall's and the shore's
direction into the fabric (MFP-2).

**Sides (GEO-22).** Before any rule reads a side, the face boundary is reduced to **runs**: maximal boundary chains whose
cumulative turning stays within 10°, each with its chord direction; a crossing street's fillet arc is replaced by its
virtual corner (NG PF-1's method). "Perpendicular to a side" is measured against the run's chord, or on a curved run
against the tangent over a ± 5 m window at the contact point — never against the one short segment a cut happens to hit
on a Chaikin-smoothed, round-joined kerb. M0 (b) includes curved, round-joined, triangular, C-shaped and holed faces and
re-measures the NG signature on them before calibration.

**The recipe (MN-3; `profile-neighbourhood.md` AN-6, PF-2, BG-1 — the measured default).** Given a face F:

1. **Stop test.** `obb(F)`; if the OBB minor extent < the band's upper bound, F is a block. **Slope term (COV-MFCG-C05):** on a
   face whose mean slope exceeds 5 %, the working major axis is the OBB major axis rotated toward the contour direction by
   the weight `min(0.5, slope / 0.3)`, so cuts on a hillside run with the fall line and blocks lie along the contours
   (MFCG's one elevation effect is on exactly the alleys).
2. **Position.** Draw `f ~ N(0.5, σ)` as a fraction of the (working) major axis — σ = 0.066 on plain faces, 0.098 on holed or
   annular faces — with an outlier term: with probability 0.03 draw `f` uniform over [0.15, 0.85] instead (NG's 2–5 % tail);
   no clamp (the measured law is bell-shaped with no pile-up at a bound); `f` outside [0.1, 0.9] is redrawn once from the
   same stream. Stream `cut.t`.
3. **Start.** The minor-axis line at `f` meets F in one segment around the OBB centre's projection (for a concave face, the
   segment containing the point nearest to it); its two ends are the candidate starts, one on each long side, which defines
   the start and far sides for any face shape — triangles, C-shapes and curved faces included. A coin (`cut.side`, p = 0.5;
   the table row `cut.sideLongerBias` records NG's unconfirmed 2 : 1 lean in plain faces and defaults to 0.5) picks the
   start A. Leave A exactly perpendicular to its run.
4. **Far side.** The side hit by the perpendicular ray from A (NG's R1: right in 66 % of cuts, the best face rule measured).
   `cut.farSideAlt` (default 0) is the probability of taking the next reachable side instead. **Measurement:** M0 (b) compares
   our block-area, cut-length and junction-angle distributions with NG's on the same faces. **Fallback:** if they fail the KS
   test with R1 alone, `cut.farSideAlt` is set to 0.34 (NG's measured mismatch rate) and the test re-run; if that also fails,
   the far side is taken from the minor-axis line through A (NG's R4) — each step a table value, not a code change.
5. **Straight or bent.** If a straight cut would reach the far side within 2° of perpendicular, keep it straight along the
   mean of the two run normals (NG: 83 of 86 straight cuts join roads within 4–6° of parallel); otherwise place **one
   corner at half the perpendicular projection A–F** (F = where the first leg's line meets the far side; NG AN-4: within 0.05
   chord of the course midpoint in 96 of 120 cuts) and drop the second leg perpendicular to the far side's run. Two bends
   never (3 / 519).
6. **Fillet (COV-NG-N19).** With probability 0.53 (NG: 201 / 379, no predictor found; stream `cut.arc`) replace the corner
   by an equal-chord circular arc whose **tangent length is `r_t` × the shorter leg**, `r_t ~ N(0.73, 0.10)` clipped to
   [0.54, 0.87] (NG PF-2 e: p10 0.54, p50 0.73, p90 0.87, ρ = 0.94 with the shorter leg) — the radius follows from the
   legs, never a constant; chord steps equal and ≥ the lattice minimum edge.
7. **Ends in the model (GEO-21).** Each junction end is extended along its arrival direction from the kerb to the crossed
   spine and inserted there as a T-junction (`splitThrough`, §3.4), so the L1 face splits, the lane joins the street graph
   and the junction census, betweenness and R3 see it. NG's "stop half the crossed road's width short, square caps" is the
   renderer's stroke rule, which S9's corridor union and junction wedge produce without any model trimming.
8. **Transaction and ladder (GEO-23).** Before step 1 on any face with a reflex vertex deeper than the band's plot depth (L-
   and C-shaped faces, faces wrapped round a cul-de-sac antenna), a **reflex pre-cut** splits the face perpendicular to the
   reflex vertex's longer run, and antennae are split off at their roots (FTG's fix for "internal corners"). Then
   `splitFace(F, cut)` as a transaction; reject if either child violates `minEdge`, min angle or the class's minimum block
   width — the **ladder**: (a) redraw `f` (≤ 2 more candidates; NG's ≈ 4 % "Alternative cut"); (b) the straight cut on the
   mean normal; (c) **the always-succeeding cut**: a straight cut perpendicular to the longest run through its midpoint,
   clipped to F's own component by boolean intersection (a clipped line cannot make four crossings); (d) substitution — F
   becomes a court, green or landmark block chosen from the district allocation's pending claims (NG's substitution rule,
   K6) — **only for faces ≤ 2 × the band's upper block area**; a larger face reaching (d) is cut by (c) again. No rung
   restarts anything above F. Every district reports the share of its built land left as court or green by substitution
   (soft bound ≤ 5 %), so MFCG's "empty areas inside city walls" cannot return silently.
9. **Width (COV-NG-N20).** The new way's width is `w = a_district + b · (L + e · n_free)`: `a` drawn once per district (NG: a
   per-seed intercept), `b` a rung-table slope, L the final course length, `n_free` its free ends and `e = 0.025 ×` the
   district's median cut length (NG: ≈ 5 model units per free end against median lengths of 150–250); metres: alleys
   2–3 m, lanes 3–5 m, and a cut longer than the lane length band in a walled regime is typed `secondary`. Never narrower
   than a lower class (O4 c). Template roads (PART II) take fixed per-district widths drawn once from the district's stream.
10. **Continuation.** A cut may **continue across an existing lower-or-equal-class street** when collinear within 6° (the
   rare crossroads) — **only inside its own district**: never across a district-boundary edge (GEO-42). *Judgment:* chose
   the prohibition over a two-district transaction because per-district batches, the worker merge rule and per-district
   reroll isolation all rest on districts never writing each other's faces, and the crossroads it forgoes is rare by design.
11. **Recurse** on both children with their own sub-streams.

**The deep-interior rule (IMP-8, GEO-25).** When recursion stops and a block's local thickness exceeds twice its band's plot
depth, the district's band row chooses the interior **now, in S8**, by target shares: `court` (a hollow block, perimeter
plots around a shared court — MFCG's donut and NG's hollow block), `back_lane` (a lane spine through the middle, parallel to
the longer frontage), `through_alley` (an alley spine joining two opposite frontages), `rear_plots` (a second row of plots
reached by a passage). Default shares — poor: court 0.35, back lane 0.25, through-alley 0.30, rear plots 0.10; modest: 0.45 /
0.30 / 0.15 / 0.10; prosperous: 0.65 / 0.15 / 0.05 / 0.15; rich: 0.75 / 0.10 / 0 / 0.15 — our own values, calibrated at
M-1 on NG's hollow-block frequency in the vertex captures and MFCG's inner-lot removal in the size-sweep exports. Lanes and
alleys chosen here are inserted as L1 spines in S8's own district batch, so **S10 never writes L1** and no sibling block is
left stale; dense poor quarters get many narrow alleys and still keep courts, rich quarters keep gardens behind their
houses — from the same rule. Keep-test: the court share of deep blocks within band per class (§13.5).

**Holes (the `BisectorEx` case, C13 — ours):** a cut that would cross a hole is routed to the hole's boundary (a *slit*),
the annulus becomes simply connected, and the same ladder applies (σ = 0.098); this is the primitive the stage-2 ring
template needs (PART II). Cuts are inserted as `lane` / `alley` / `secondary` spines, so lanes are real ways in the same
graph (NG's look on FTG's substrate). Junction fillets at street corners are a style-time smoothing (Urban Places' arcs),
not a model change.

**Partition recipes (COV-MFCG-G03).** The same module exposes `PartitionRecipe` rows built only from `splitFace` and
`insetRing`: `fan` (k radial cuts from the centroid with alley-width gaps), `semiFan` (from a boundary vertex), and `ring`
(an inset band around a court, split into segments by slit cuts, short sides first). Park layouts (§4.9 S12b) and
institution templates (cloister, quadrangle; §4.7 S11) use them.

**The strategy slot.** S8 calls `FabricStrategy.partition(district)`; the base registers `BentCutFabric`; stage 2 registers
`RingFabric`, `SquareFabric`, `StreetFabric` (G-P2, §14).

### Block P-10 — §4.7 (items LC-2, FTG-1, SCL-4, FTG-2, GEO-24, GEO-25, GEO-26, IMP-8, COV-VG-VN-170, VIS-8, COV-FTG-F23, COV-NG-N27, MFP-9, COV-FTG-H07, MFP-7, FTG-7, COV-FTG-E02, LC-16, LC-12, FTG-13, VIS-10, SCL-13, COV-MFCG-G05, COV-FTG-F16, COV-FTG-F20, COV-FTG-F21, COV-FTG-E07, COV-FTG-F09, COV-MFCG-I01, COV-FTG-J02, COV-FTG-J05, COV-NG-XB23, COV-NG-CR23)

=== REPLACE §4.7 S9 Corridors · S10 Plots and siting · S11 Site plans and footprints — the plot model ===

### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r1)

**S9 Corridors (L2).** `corridorUnion(spines, widths)`: each spine buffered by its half-width (round joins; square ends at
gates and bridgeheads), unioned per class, subtracted from L1 faces → half-corridor strips, junction wedges and **built
blocks**; the main plaza is S3's reservation, typed as a `square` face; other squares come from S7b claims and are sized
from population (O7); gate plazas and forecourts from S7 (§4.8). Streets exist as geometry from here on;
"negative-space streets" is purely a style (§8), and the figure-ground contract of §8 fills blocks in a ground tone.

**S10a Block allocation and field pass 2 (eager, town-wide; LC-2, FTG-1).** Each district's `Allocation` (S7b) is distributed
to its blocks in three declared steps, from the `alloc.block` stream, blocks by score then id: (i) the **field-driving
classes** — noxious trades, middens, prisons and institutions below a block — are allocated first, by scores that need no
prosperity (downstream, downwind, extramural, frontage class, adjacency); (ii) **field pass 2** adds their kernels to pass 1
(§4.5); (iii) every other class — households by band, ordinary workplaces, shops — is allocated by capacity per band under
pass 2, sub-districts receiving contiguous block groups sized to their clusters (COV-FTG-E02). The result is persisted as
one block-level `Allocation` per block. From here on every district's S10, S10b, S11 and S12b is a pure function of these
records and the district's own sub-stream, so the town's content does not depend on derivation order, viewer order or
worker count.

**S10 Plots (L3) — frontage-first with the granularity law (O5 / O18), per block.**
For each built block: (1) classify each kerb edge as a frontage by way class; (2) read the block's context (district
kind, prosperity value and recorded band, density, growth stage) → the **granularity table** gives target frontage-width and
depth bands, a join maximum and a vacancy-run share, interpolated along the prosperity value:

| band (default rows; all calibratable, J-T) | frontage width (m) | depth (m) | join max | vacancy-run share of frontage | reference anchors |
|---|---|---|---|---|---|
| poor / dense | 4–6 (log-normal, CV 0.25) | 12–20 | 1 | 0.03 | NG 95–99 % attached, party walls 39–43 % of perimeter |
| modest | 6–9 | 18–30 | 2 | 0.06 | FTG quad side median 10.3 m, footprint median 103 m² |
| prosperous | 9–14 | 25–40 | 3 | 0.08 | MFCG ≈ 18.6 lots per block |
| rich | 14–25 (joined) | 30–60 | 5 | 0.05 | "fewer, bigger buildings, bigger yards and courts" (owner) |
| institution / assigned | by requirement class | by requirement | whole block above a share threshold | — | FTG landmark-first |

(The deep-interior choice — court, back lane, through-alley or rear plots — was made by S8, §4.6; S10 reads the block's
`interior`.)
(3) **Claims first**: institutions and assignments *smaller than a block* `claimSubFace` the contiguous area and frontage class
their requirement demands before ordinary plots are cut (larger ones are S7b reservations already); (4) **per-frontage
regions (GEO-24)**: the block (minus claims and the S8 interior) is partitioned into one region per frontage run by its
straight skeleton, each region's depth capped by the skeleton height and the band depth — if the skeleton is downgraded
(F-SKELETON), a reflex pre-cut partition (a perpendicular cut from every reflex vertex) is used instead — and plots are
laid as strips perpendicular to each region's frontage with widths drawn from the band and depth = min(band depth, region
depth); side lines are bent lot cuts perpendicular to the frontage arriving at the region's rear line (the creator's stated
use of the primitive for buildings, `watabou-extra-a.md` §2.1 via the proposals); because strips never leave their region,
reflex corners, notches round cul-de-sacs and the inside of tight curves cannot produce overlapping or hourglass plots —
property test on concave, notched and curved blocks: 0 overlapping or self-intersecting plots before any fallback; (5)
**corners and seams**: the corner plot takes the higher-class frontage and the shorter frontage's depth; the wedge left
between two regions becomes a corner plot when it meets the minimum width and angle, else a declared `wedge` class
(bounded < 0.5 %) or residue; (6) the residue is typed: `court` (from the S8 interior), `yard` (assigned to the adjacent
plot when its area < 1.5 × the plot), `green`, `vacant`, `shore` (the shore setback); (7) **joins and splits, one law**:
strips are cut to the band's lower end, then a merge operator joins k adjacent plots (along a frontage or back to back
keeping a frontage) up to the band's upper end, keeping `members`; poor bands stay at the lower end; both directions read the
same context vector — one code path (O18 g); (8) **vacancy runs (COV-VG-VN-170)**: runs of frontage totalling the band's
vacancy share, each at least one band frontage long, are left unbuilt from the `plot.vacancy` stream — typed `vacant`, or a
`garden` yard joined to the neighbour — so no built block is necessarily fully ringed; (9) **alleys**: slivers narrower than
the minimum plot width that connect two ways become `alley` L3 faces (S10 never inserts an L1 spine; GEO-25); (10) every plot
gets its `ContextVector`, its `DerivationRecord` and access edges (100 %, O5 a); NG's ≈ 42 % discard becomes 0 by
construction. Party walls are shared L3 edges typed `party_wall` in row classes. **Unbuildable bands:** the shore setback
(§4.2 S1 (8)), the wall's inner setback and its outer setback and glacis (MFP-9) and reservations are never plotted; ribbon
plots begin at the outer setback's edge. **Exact capacity check (FTG-2):** after the last block of a stage, plots per class
× band are compared with the stage quota; a shortfall goes to S10b's reconcile and the report (F-BUDGET-STAGE).

**S10b Placement (O7; per district; the allocation honoured).** Each block's allocated classes are placed onto its plots by a
rule-based score over the plot context — noxious trades downstream and extramural (`upstream` high, outside the enceinte),
mills on water, markets and inns at tier-1 junctions or gates, religious precincts and faction turf as attractors, frontage
class, area fit — filled in descending score with capacity accounting; households take residential plots of their band
± drift. **Live-in (MFP-7):** craft and shop rows default to `liveIn`; a live-in household is sited first at its workplace
and recorded as the building's `dwelling`, so the arterial frontages are shop-houses, not workplace strips, and residential-only
blocks stay the exception; block-level acceptance measures the share of residential-only blocks, per-block use-mix entropy
and the share of trade households living at their workplace (§13.5). **Outside classes and farm households** are placed on
S12a's outside plots in the hinterland pseudo-district (FTG-7). A bounded **plan–fit–reconcile** loop (≤ 3 rounds) adjusts
*inside the district's allocation* where a class finds no plot (one more JOIN; a class demoted within its band; surplus
capacity typed as yards, greens or vacant plots) — placement never gives up (O18 f; F-SITING ladder) and never reaches into
another district; moving demand between districts happens only in S7b's reconcile. Both entry points exist: content-first
(default) and layout-first (thumbnails, then populate). People are derived lazily from the household's key; **a person is
pinned only by an explicit edit, never by being viewed** (§10.3; LC-16).

**S11 Site plans and footprints (L4; O17; one batch per block).** One rule evaluation per plot, no search: the site-plan table
keyed by `class × prosperityBand × density` (interpolated) gives coverage ratio, arrangement, setbacks, separation (party
wall / slot / passage), front-line jitter (MFCG `Offset`, NG's uneven streetwall — a parameter), yard partition and
**boundary treatments**:

| arrangement | geometry | boundary treatment (default rows) | where |
|---|---|---|---|
| row | one or more footprints end to end along the frontage; **footprint = plot ∩ the frontage band of the row depth** (a boolean intersection, GEO-26), so every party wall is the plot side line and, the block being one L4 batch, one shared edge even on bent or curved frontages; depth from the coverage; rear yard | frontage none (the house is the frontage); rear wall (dense) or fence | dense and poor bands, shops, workshops (NG 95–99 % attached; FTG's warehouse rows) |
| set-back compound | hall or house set back behind a forecourt; **2–5 disjoint outbuildings** (stables, workshop, chapel, barn, brewhouse) placed by a small greedy packer on the plot's OBB grid around a court | **enclosure wall** (rich, prosperous) or fence, with a **gate on the access edge** (NG's walled manor compound) | manors, inns, temples, guildhalls, farmsteads (FTG's farmstead with a driveway) |
| detached | one OBB-aligned footprint at the frontage with side yards and a path to the access edge | frontage fence, railing (rich) or hedge, with a gate; side hedges | prosperous / semi-rural bands, sparingly (R4/R5) |
| hovel | one small footprint on the frontage of a plot that is mostly bare yard | none or a hedge | squalid bands, outskirts |
| tents | 1–3 small round or rectangular footprints (6–15 m², class `tent`, roof `tent`) with a fire-pit pin, dirt surface | none | squalid and shanty districts after the first half of the stages (COV-FTG-E07) |
| institution | the claim's own template (§2.6 footprint templates, the axis-locked composer, the `ring` partition recipe for a cloister) | wall with a gatehouse gap; churchyard wall | claims |
| vacant run | no footprint | wall (dense bands) or fence | vacancy runs (S10 (8)) |

Treatments are stored per plot edge (`PlotBound`, §2.5), drawn at district LOD as a stroke distinct from buildings — never
filled, at most half the building outline's weight, gaps at gates (§8) — and **walled or fenced frontage counts toward
O17 (d)'s streetwall continuity**; walls and fences export to VTT and GeoJSON (VIS-8).

Footprints come from `BuildingGenerator.outline()` (§2.6): rectangles and L / T compositions as **rectangular wings** with
per-wing ridge axes (VIS-10), footprint templates and the axis-locked composer for institutions (COV-FTG-F16, COV-MFCG-G05).
**Scale (COV-FTG-F09):** footprint targets are multiplied by the district's `buildingScale` (0.5–2, continuous; FTG's
"smaller / bigger" as a district edit or an `Adjust` regeneration). **Heights** from the class tables on every wing
(floors × storey height + roof rise by pitch; eave and ridge per wing; tower heights for keeps and church towers) with the
**ground datum** `baseCm` from the terrain (§2.6; FTG-13) — carried even though the top-down view never shows them;
entrance on the access edge 3 ± 1 m from the corridor (FTG's measured 2.99 m rule kept); roof kind by class per wing (the
style sheet chooses the construction, §8.2); **materials** from `MaterialRow` (COV-FTG-F20); **description, opening hours
and sub-locations** from the class table and the naming engine (COV-FTG-F21, FTG-11); yards partitioned into typed parts.

**Furniture pins (COV-MFCG-I01, COV-FTG-J02, COV-FTG-J05; `pin.*` streams).** The main plaza always gets one centrepiece —
statue 0.6, fountain 0.3, market cross 0.1 by default weights (MFCG places one in every market square, 60 % statues) —
offset toward the plaza's longest edge for statues and for 30 % of fountains; each gate plaza gets a well, cross or trough
with probability 0.5; every block draws one **weighted decoration row** from a deck and applies it to its unused plots and
vacancy runs (wells, pumps, troughs, large trees); **singletons** — bandstand, statue, monument — are placed once per
district in an unused plot by a deck draw, campfires in squalid districts; **market stalls** line the market square's edge
band and ring a market hall in market districts, one per ≈ 150 m² of square (≤ 40), drawn as small tents. Rendering draws
footprints, yards, boundary treatments and pins; the plot outline is an optional cadastral layer.

### Block P-11 — §4.8 (items GEO-18, FTG-8, COV-MFCG-C07, GEO-38, MFP-9, COV-FTG-G07, COV-FTG-G09, COV-FTG-G10, MFP-3, MFP-4, GEO-19, COV-FTG-H17, GEO-17)

=== REPLACE §4.8 S7 Fortification (per walled stage) · water furniture ===

### 4.8 S7 Fortification furniture (per enceinte) · the castle · water furniture

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r1)

**The trace is S5a's.** Each walled stage's enceinte trace, its gates and its castle weld are fixed in S5a before the stage's
secondaries grow (§4.4), with the waterfront policy and open chains of FTG-8; S7 builds everything that stands on the
traced wall, once per enceinte, after S6 has typed the districts.

**Band, setbacks, intervallum (GEO-38, MFP-9, COV-FTG-G07).** The wall band (thickness by era 2–3 m) is two L3 half-bands,
one under the L1 face on each side of the wall edge, so nesting holds; towers and gatehouses are likewise unions of
per-side parts. **Both faces are unbuildable**: an inner setback band (table 6–10 m; MFCG's "buildings never touch the
wall") and an outer setback plus glacis (table 10–20 m) — the hard invariant "footprints ∩ (band ⊕ setback) = ∅ on both
faces" holds, and ribbon plots start beyond the outer band (O8 b). An **intervallum** lane along the inside of the wall is
an era row: `lane` on inner and outer enceintes at CITY and METROPOLIS in the high-medieval preset, `none` at TOWN; when
present S7 inserts it as an L1 `lane` spine in the inner setback band (S7 precedes S8, so L1 is still open).

**Gates — exactly N, by construction (MFP-4).** Main gates are where S4's and S5b's arterials cross the trace: N₁ gate sites
were picked in S3 and the arterials were routed through them, and each outer enceinte's gates are its S5b primaries'
crossings, so roads leaving each walled stage = its gate count and no arterial ends blind against a wall. Water gates sit
where a river passes and, under a `quay_wall` or `sea_wall` waterfront, at every quay access; the castle has one
town-side gate; posterns are a separate, road-less count added only on request. `N = 0` was honoured in S3 (no gate, no
external arterial). **Gate plazas (G-R1):** a small plaza face is carved at each main gate inside the wall (MFCG B14);
**forecourt squares** at churches and temples are typed open spaces sized by the institution's class. The F-WALL ladder
(§5.2) keeps, as its last reported rung, cutting any way that still reaches the wall at the setback band and pruning the
outer stub.

**Towers** at every trace vertex whose turn exceeds a threshold and along straight runs at a spacing (35–60 m by rung and
era; FTG's 39 m median and MFCG's tower-per-vertex are the two reference points); kind (round, square, bastion,
octagonal) by era row; heights and a ground datum per tower.

**The castle (MFP-3, COV-FTG-G09, COV-FTG-G10).** The S3 bailey reservation becomes the castle's plot; its curtain is its
own enceinte of kind `bailey` along the reservation polygon, with towers at its vertices and along its runs; an
`on_enceinte` castle is already welded into the town wall through its two claim vertices (the shared edge is one wall).
A **castle template table** places: the **gatehouse** on the side facing the castle street, with an inward spur; the
**keep** — shape `rect` (by `lir`), `square`, `octagon`, `round` or `cruciform` with corner projections, by era and rank
rows — opposite the gate, on the highest ground or central, by row; an optional **inner ward** (an inset of the bailey by
30–40 % with its own gate) by rank; **internal paths** as `path` ways keep ↔ gatehouse ↔ wall stairs; and a **surround**
row — an esplanade (MFCG's green spacer before an inner castle, §4.9), a park with a perimeter path, a plaza, a cliff skirt
on a cliff site, a moat (carved at S3). The 0.75 compactness gate (MFCG's threshold, kept as a *shape check*) is
**repaired in place first**, in MFCG's order: equalise the claim polygon's angles toward the regular polygon's (≤ 20
iterations), then bloat it about its centroid in 5 % steps up to its area band's top; only then re-site to the next
candidate (reported), and last a keep without a bailey (reported) — never a restart (F-CASTLE, §5.2). The claim polygon is
the target of the `warp` `equalize` and `bloat` edits (MFCG's documented castle-resize workflow). Acceptance: castle area and
compactness inside the band on ≥ 99 % of seeds with a castle requested; every re-sited castle reported. Several enceintes
(citadel, inner, outer, suburb, bailey, palisade, earthwork) are stage rows in the table; up to two castles (§4.2 S0).
Every wall carries a lifecycle for wall → ring road conversion (§4.11).

**Water furniture.** **Bridges** stand on S1's pinned decks (§4.2 S1 (5)): the deck is perpendicular to the flow by
construction, S4 routed the way to its endpoints, the class comes from the way, stone or timber by era and prosperity rows,
the deck height from the two bank elevations plus a clearance row; minimum spacing 40 m (FTG); fords where the class allows.
**Harbour (GEO-19, COV-FTG-H17)**: the basin was reserved and carved into L0 at S3, before any street, so S7 builds only its
furniture on the reserved shore: a **harbour-wall row** — shape (none, one arm, two arms; following the coast or projecting)
and type (wall, wall with rocks, detached breakwater) — moles, quays as `quay` ways along the waterfront (bank class
`quay`), piers as `pier` ways at 12–20 m spacing, straight or branching, on the harbour and on the open coast, with FTG's
≈ 75 m length as a reference and timber or stone by era; MFCG's `1.2 ± t` pier casing is a style. **Canals and moats** were
carved at S3 (`canal` along the chosen line; MFCG's `buildCanals` name for rivers is covered by S1); S7 adds their quays,
banks and bridges. A carve requested later by an edit goes through the conversion path of §4.11 (cut and reroute rules,
lifecycle events), never a silent overwrite.

### Block P-12 — §4.9 (items FTG-7, COV-FTG-B09, COV-FTG-I03, COV-FTG-I12, COV-NG-VS27, COV-FTG-H07, AM-1, MFP-11, COV-MFCG-I03, COV-MFCG-G03, COV-FTG-I09, COV-FTG-I11, COV-FTG-I15, FTG-3)

=== REPLACE §4.9 S12 Hinterland and greenery — the rule table (O14 / O19) ===

### 4.9 S12a Hinterland land and outside plots · S12b Greenery — the rule tables (O14 / O19)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r1)

**S12a Hinterland land (runs after S7b, before S10b; O14-core; FTG-7).** The context margin (frame + 30 % per side) is
partitioned by the extended arterials and the field-system preset: **open-field strips** (long narrow faces perpendicular
to lanes), **enclosed fields** (FTG-style with hedgerow lines), **farmsteads** with driveways, **perimeter**, **along rivers**,
or the MFCG/VG **sector look** (Voronoi of ring seeds ∩ land cut by the OBB bisector, the recorded construction) as a style
preset; land-use rings (gardens / closes / orchards → fields → meadow / pasture / commons → coppice → wild wood); managed
woodland by distance band, wild wood beyond, forest edges by domain-warped density noise (a render-time property); every
land component gets uses (both banks, islands); roads continue to the frame at their bearings; the **settlement perimeter**
= the last stage boundary offset and rounded (FTG C17). Fields keep the shore setback of §4.2 S1 (8) (COV-FTG-H07).
* **One farm table (FTG-7).** `FarmTable { arableHaPerCapita (era, with provenance), householdsPerFarmstead,
  fieldHaPerFarmstead }` is the only source of both numbers: S2 demands `farmsteads = round(arableHaPerCapita · P /
  fieldHaPerFarmstead)` farm plots and their households, and S12a gives each farmstead its fields, so farmland per capita
  and the farm classes' field area agree by construction (MFCG's "not enough farms" removed). Test: 100 % of outside-class
  buildings on outside plots with occupants; farmland per capita ± 20 % of the era row and equal to the farm classes' area.
* **Count-driven outside plots (FTG-7, COV-FTG-I03, COV-FTG-B09).** The hinterland allocation (S7b) lists the outside classes
  — farmsteads, water and wind mills, quarries, mines, lumber yards, charcoal burners, fisheries, lodges — and the
  decorations below. Their sites are seeded by score on `SiteResources` (quarries on stone, mines on ore, lumber at the
  woodland edge, fisheries on the shore, water mills at a reach with fall, windmills on exposed high ground, farmsteads on
  fertile land near a lane) with a **clustering term** (a seed's score rises for each seed of its own kind within the
  cluster radius, so similar features sit together, FTG's rule); the outside land is then divided into exactly that many
  lots by a weighted Voronoi (power diagram with area targets) clipped to the land; each lot is an outside plot (L3 in the
  hinterland's L1 faces) with its yard and a `track` to the nearest lane (VG's lonely houses, on purpose). S10b places the
  allocated outside classes and farm households on them.
* **Crops and livestock (COV-NG-VS27).** Every field face takes `crop` and `livestock` from the era / region crop table (our
  own rows) under a rotation scheme (three-field by default: winter grain, spring crop, fallow per furlong, each field's slot
  from its furlong index); pastures take livestock. The `lit` preset's field textures read these attributes.
* **Hinterland decorations (COV-FTG-I12).** A decoration table — rows `{kind, count by rung and biome, placement score,
  trail: yes / no, keepClearCm}` — places ponds (small closed outlines from S1's routine, entering L0), copses (wood faces),
  stone circles, ruins (an outline footprint in the `ruined` lifecycle state), wayside shrines (one per through-road by
  default), boundary stones at the margin crossings; a row with `trail` links its decoration to the nearest way by a `path`
  way; fields and woods keep back by `keepClearCm`. Our own rows and counts, calibratable.

**S12b Greenery (after S11; O19; owner base ruling AM-1) — the rule table.** Greenery is a rule family that reads the
prosperity value, the district kind and the greenery propensity field, never leftover space. It is **the same rule family
as coverage and plot granularity**: every share below is a band row, and the value used for a plot is interpolated along
its prosperity value between the band rows, so a quarter's greenery blends at its edges. Rows are defaults with provenance
"owner ruling + O19 answers", all calibratable (J-T):

| rule | reads | fires when | places (typed, owned entities) |
|---|---|---|---|
| yard planting by plot class | site plan, value | every plot | row → rear kitchen garden (≥ modest), else bare / midden; compound → formal or kitchen garden + orchard part; detached → garden; hovel → bare, pen or midden; institution → forecourt / churchyard |
| formal gardens | value | compound plots: share rising from 0 at the modest band's centre through 0.3 at the prosperous centre to ≥ 0.6 in the rich band | `formal_garden` yard parts (grid layout) |
| parks and ornamental grounds | value, institutions, `greens` | rich or planned districts: **0.4–0.8 ha of park per 1 000 inhabitants of the district**, only on S7b reserved faces or residue ≥ 0.3 ha; palace / cathedral close / monastery: an ornamental claim of 0.5–2 ha | `park`, `garden` faces owned by the institution or the commons |
| avenues | way class, value, planned flag | tier-1 ways (`through`, `primary`) inside rich or planned districts; prosperous districts with probability 0.5 | `avenue` lines: tree rows at 8–12 m spacing on both sides |
| street trees (COV-FTG-I09) | way class, value | `secondary` streets in prosperous and rich districts with probability 0.3 | `street_trees`: one row on the wider side at 10–14 m |
| edge green or orchard | value, position | modest districts touching the outskirts: one `green` / `commons` of 0.1–0.3 ha at the edge **or** an `orchard` of 0.2–0.5 ha in the first hinterland ring | faces owned by the commons |
| churchyard | institution | every church / temple plot: a `churchyard` part ≥ 30 % of the plot's yard | yard part |
| market green | era preset | an unpaved market square (era table) | `market_green` |
| castle esplanade (MFP-11) | castle surround row | an inside or inner castle: a 20–40 m green spacer between the bailey and the town | `esplanade` |
| poor quarters | value | little: yard planting on ≤ 15 % of plots; **a tree by the well** (a pin rule at squares and wells) — charm, not zero | yard parts, pins |
| hinterland ring supply | O14 rings | orchards in ring 1, commons in ring 3, coppice in ring 4 | `orchard`, `commons`, `coppice` |
| ambient scatter (COV-FTG-I09) | land use, biome | pasture, meadow and commons: 0.5–2 single trees per ha by biome row, clumped by a cluster process | `ambient` |
| shoreline band (COV-FTG-I09) | bank kind, biome | round ponds and lakes where the bank is not a quay or a beach: a 5–15 m tree band | `shore_band` |
| trees at render | ecology, species | every green entity: instanced from `treeStream` with spacing rules — orchard 6–8 m jittered grid, avenue 8–12 m in line, garden 4–6 m, wood 3–5 m; crown diameters in metres consistent with building sizes; species from the entity's mix | never stored |

* **The `greens` toggle (MFP-11).** `on`: the park row fires in every band at a floor rate (0.1 ha per 1 000 inhabitants in
  modest districts, 0.05 in poor) and one park district is seeded per 25 000 inhabitants regardless of wealth (MFCG grows
  its park districts independently of wealth); `off`: parks and park districts are not generated, yard planting and every
  other row unchanged; `auto`: the feature table (§4.2 S0). The resolved mapping is written to the report.
* **Park layout (COV-MFCG-I03, COV-MFCG-G03).** A park's inside is laid by a `PartitionRecipe` (§4.6): a radial `fan` of
  groves with alley-width paths when its compactness is ≥ 0.7, otherwise a `semiFan` from the vertex at its longest edge
  (MFCG's rule), plus a perimeter path (FTG's); groves are `grove` faces, paths `path` ways; formal gardens use a grid.
* **Species and climate (COV-FTG-I11, COV-FTG-I15).** A `ClimateTable` row per biome (temperate-deciduous,
  temperate-coniferous, mixed, maritime, arid, cold — the biome is a circumstance, §7.7) sets the ground-cover role, the
  tree-species mix with separate inner and outer shares for woods (e.g. a coniferous interior with a deciduous edge), the
  default field system and farm layout, the default roof form and pitch, and the scatter densities; `Greenery.species`
  carries each entity's resulting mix, which the crown symbols and the orchard kinds read. Our own rows.

Acceptance (O19, adopted): (a) Spearman(prosperity, private green share) ≥ 0.7 within ± 5 points of the table mean,
σ ≤ 8 across seeds; (b) public-green rule satisfaction ≥ 95 % and park / green area per 1 000 inhabitants within its
band, reported; (c) 100 % of greenery typed and owned or common, untyped leftover green = 0; (d) tree scatter NN p1
above the canopy threshold and a pair-correlation per class; (e) ≥ 10 000 trees within a 16 ms frame at district LOD;
(f) the greenery control monotone and continuous (§7.8); (g) city-zoom greenery passes the legibility check and no
option coupling drops the layer. Restraint: calm at city zoom (area fill → crowns → lobed trees by LOD); the `grove`
tag and VG's dramatic forest kept as options; trees a layer toggle.

**The owner rule, clause by clause (AM-1).** Trees and greens here and there: the poor-quarter tree-by-the-well pin, edge
greens, street trees, ambient scatter. Parks: the park row with its per-capita band and the `greens` toggle. Artificial
landscapes — formal gardens, orchards, avenues, ornamental grounds: their rows. Placed by rules reading prosperity and
district type: every row's `reads` column and the interpolated band rows. Rich quarters gardens, parks and tree-lined ways;
modest ones a green or an orchard at the edge; poor ones little: the rows' band conditions. Yard planting follows the plot
class: the first row. Same rule family as coverage and plot granularity: band rows interpolated along the prosperity value.

### Block P-13 — §4.10, §4.11, §4.12 (items LC-2, SCL-4, COV-FTG-E10, MFP-10; GEO-27, LC-12, FTG-4, FTG-14, GEO-38, GEO-19, DEF-8; COV-VG-VN-002, COV-VG-VN-003, MN-4)

=== REPLACE §4.10 S13 Names and labels · S14 Display list · S15 Simulation ===

### 4.10 S13 Names and labels · S14 Display list · S15 Simulation

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r1)

S13 draws names from the `naming/*` streams only (§9, §10.4): quarters, districts, ways, landmarks and water; it writes each
district's one-line **description** from its venue mix, features and prosperity (§10.4; COV-FTG-E10). It places the
**city-LOD labels eagerly** — quarter labels (the city-LOD area label unit, §4.5), water, major landmarks, gates — in
priority-then-id order, so the one-click first paint is complete and the same for every viewer (§4.1). Labels of finer LOD
bands (district names, streets, squares) are placed per view and are view data outside the model hash (§9). S14 builds the
display list's city band eagerly for the first paint and the finer bands lazily per tile under the laziness contract (§8);
S15 is the optional module (§10), never in the one-click path.

=== REPLACE §4.11 Incremental mode and conversions (the evolution hook; one path built in the base) ===

### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r1)

**The one built path: add a growth stage (GEO-27, LC-12, FTG-4, FTG-14).** `grow(doc, epochInputs)` runs, on the persisted
model with the epoch sub-stream: S2 (**delta demand** = the suffix of the sequential roster between the old and the new
population, §10.2 — prefix-stable, so no survivor's use is withdrawn by arithmetic) → S5 for the new stage (S5a the boundary
grown from the previous one and, if walled, its trace and gates; **S5b the main-road step**, the incremental S4 router with
every existing arterial fixed, so each epoch can add main roads; S5c growth with the **built-face legality class** below;
S5d) → S6 (districts extend over the new faces, existing districts keep their ids; the field's drivers are re-evaluated
with the new circumstances and the brush strokes kept as Δ) → S7 (the new enceinte's furniture) → S7b (allocation of the
delta demand only, to new faces and to transformed plots) → S12a (outside plots for new outside classes) → S8–S13 on new
faces only.
* **Built-face legality (GEO-27).** In an epoch, a growth proposal may not cross a face holding footprints unless it runs
  along plot boundaries or back lanes (the `existingFabricCost` of §4.3 applies to S5c as well, pricing a route along plot
  lines far below one through buildings) or a declared `demolish` conversion is chosen at its table cost (by building class
  and age), recorded as events. Plots cut by a new corridor are re-cut through the conversion path — buildings that still
  fit are kept, the others demolished with lifecycle events — never re-derived from scratch.
* **Survivors (LC-12).** Surviving plots and buildings keep their built state. A re-evaluated field acts on them **only
  through explicit, rate-limited transformation events** chosen by rules and drawn from `…/epoch=e` streams: `densify` /
  `subdivide` when a plot's value has risen past a cut point by more than the hysteresis, `amalgamate` when neighbours
  join, `rebuild` (a class upgrade), `decay` when the value has fallen past a cut; at most a table share of a district's
  plots transforms per epoch (default 10 % per decade). A transformed entity's `DerivationRecord` is updated; every other
  plot keeps its record, so "Regenerate (keep settings)" on an untouched block reproduces it byte for byte, and re-deriving
  it with the new field is the explicit `Adjust`. Siting across epochs places only delta demand, only on new or
  transformed plots.
* **Test (M4).** On a town with walled, ribbon and suburb regimes, adding a stage re-rolls 0 survivors, adds ≥ 1 primary when
  its gate law asks for one, and replays from the log to the session hash.

**Conversions** are typed plat operations with recorded events (the `ConversionOp` of §7.1):

```ts
type ConversionOp =
  | { op: 'wallToWay'; enceinte: Id; widthCm?: Cm } | { op: 'gateToJunction'; gate: Id; square?: boolean }
  | { op: 'outskirtToDistrict'; faces: FaceId[] } | { op: 'demolish'; id: Id } | { op: 'densify'; district: Id; band: string }
  | { op: 'subdivide' | 'amalgamate'; plots: Id[] } | { op: 'rebuild'; building: Id; cls: BuildingClass }
  | { op: 'build'; plot: Id; cls: BuildingClass; footprint?: Polygon } | { op: 'carve'; kind: 'canal'|'moat'|'harbour_basin'; polygon: Polygon }
  | { op: 'abandon' | 'decay' | 'ruin' | 'robStone'; building: Id } | { op: 'plotToGarden'; plot: Id } | { op: 'contractWall'; enceinte: Id; trace: Polygon };
```

`wallToWay(enceinte)` retypes `wall` edges to `way:primary` with a ring-road width; the band faces become corridor; towers
are removed; gates become junctions with a `square` option. **Clearance (GEO-38):** the new corridor needs half its width on
each side of the old wall line; where the half-band plus setback on a side is narrower, plots meeting the new corridor are
clipped along its edge — a plot keeps its id when its frontage anchor survives (O8 g), footprints that no longer fit are
demolished with lifecycle events (cause `convert:wallToWay`). `carve` (a canal, moat or basin added by an edit) cuts and
reroutes the ways it meets by the same rules, never silently. Every touched entity's lifecycle records the event with its
cause; nothing outside the touched faces changes (the O18 (g) / O2 (c) perturbation test is the check). **Coherence from
one seed** (owner): epoch N+1 is derived from epoch N's persisted state, the inputs and the seed's epoch sub-stream
`…/epoch=<n>`; the same town under different inputs has different histories and under the same inputs the same history;
nothing that survives is re-rolled because its stream path is unchanged.

**The evolution engine is the owner's later stage (DEF-8); its hooks are concrete now.** The owner's history — growth,
regression and growth again: houses emptied and robbed for stone, plots turned to gardens, a shorter wall ring inside the
old one, ruins left standing — is expressed with the base's own records: the transformation and conversion kinds above
(`abandon`, `decay`, `ruin`, `robStone`, `plotToGarden`, `contractWall`), the lifecycle history on every entity, the epoch
streams, the circumstances timeline (§7.7) and the sequential roster (a population fall selects its suffix in reverse
ordinal order; a decline rule table — periphery, lowest value, noxious and extramural first, never locked or assigned —
chooses which buildings empty). The engine plugs in behind one interface, and the base registers only its own path:

```ts
interface EpochInputs { years: number; populationTarget: number; circumstances: CircumstanceSlice; events: { kind: string; params: Record<string, number> }[] }
interface EvolutionStrategy { plan(doc: Document, inputs: EpochInputs, tables: TableView, rng: Stream): KernelResult<(ConversionOp | EditEvent)[]> }   // registered by name (§4.12)
// base registration: 'grow-by-stage' — the path above; the owner-staged engine registers its own strategy and reuses every event kind
```

The base builds and tests exactly one path — **add a growth stage to an existing town** — at M4 (G-P13), because it is the
same path "regenerate this area" uses.

=== REPLACE §4.12 The strategy interface and the stage-2 seam (pointer) ===

### 4.12 The strategy interface, stage registration by declared I/O, and the stage-2 seam (pointer)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r1)

Every layout stage runs behind a strategy in the registry (§14): `TerrainStrategy`, `CoastStrategy`, `RiverStrategy`,
`ManifestStrategy`, `NetworkStrategy` (the fused base; `american` / `ringed`; a village would add a tracker walk),
`EnceinteStrategy` (the base's S5a pull-and-simplify; a village's palisade), `FabricStrategy` (`BentCutFabric` now; NG's
templates at stage 2), `PlotStrategy`, `SitePlanStrategy`, `BuildingGenerator` (§2.6), `EvolutionStrategy` (§4.11). The
signatures this section changes (mirrored in §14):

```ts
interface StageDecl { id: StageId; inputs: DataKey[]; outputs: DataKey[]; streamKeys: string[]; invariants: Invariant[]; ladder: Ladder; budgetMs: Record<Rung, number>; batch: BatchScope; lazy: boolean /* only under the §4.1 contract */ }
interface NetworkStrategy { grow(site: Site, destinations: Destination[], terrain: Terrain, water: WaterSet,
  enceintes: Enceinte[] /* traced before growth; the strategy consults them at every step and places gates where it meets them */,
  existing: Network | null, stage: number, ctx: StageContext, k: Kernel): KernelResult<Network> }
interface EnceinteStrategy { trace(boundary: Polygon, gateSites: GateSite[], reservations: Reservation[], terrain: Terrain, water: WaterSet,
  policy: { waterfront: 'open'|'quay_wall'|'sea_wall'; placement: 'aroundAll'|'aroundStage' }, ctx: StageContext, k: Kernel): KernelResult<Enceinte> }
```

The pipeline order is the topological order of the registered `StageDecl`s (§4.1), so a product may add a stage — a
village's density field before its network, its palisade before its roads (PART III) — by registration alone. Every district
carries a `SeamContract` from milestone 1 (G-P1) — typed boundary edges with `hard` flags, portals, shared geometry owned
by the base, plot lines and alleys on the boundary, field samples along the boundary and inside — and the district →
neighbourhood interface of PART II reads it. Nothing in PART II needs a base change; what the base must already carry is
listed there and is a base requirement here.

### Block P-16 — §10.1–§10.4 (items FTG-9, COV-FTG-C04, FTG-10, LC-16, FTG-11, COV-FTG-C07, FTG-14, COV-FTG-B06, COV-FTG-B11, COV-FTG-B12, COV-FTG-B13, COV-FTG-B14, COV-FTG-C01, COV-FTG-C02, COV-FTG-C05, COV-FTG-C08, COV-FTG-E10, COV-FTG-L06, DEF-10, MFP-7, FTG-7, COV-FTG-B09)

=== REPLACE §10.1 Scope and depth (judgment J-9; IMPROVEMENTS J-S adopted) ===

### 10.1 Scope and depth (judgment J-9; IMPROVEMENTS J-S adopted; the content locality contract)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r1)

**Base must-haves:** the sequential roster (S2), the per-plot context vector, the eager allocation (S7b, S10a) and the
per-district placement (S10b), households and people derived lazily from their keys, typed open spaces, rule-placed
landmarks and furniture, a gazetteer via `query`. **Base schema from M1, materialised by the module:** the relation store
(family units, relations, memberships, postings), sub-locations, factions with roles and goals, religions, the government's
offices (§2.7). **Optional module `@plat/sim`** (delivered in the base release cycle after M2, never gating milestone 1,
never in the one-click path): professions ↔ workplace matching, occupancy and schedules as a query, the calendar and clock
with external time sync, factions' and religions' meetings, events as templates, relations by the family-unit model.
Restraint: the map stays a clean plan; content lives in data, hover, the gazetteer and export; one click never asks a
questionnaire. The product proposal's D-7 widening (schedules and the calendar in the base module) is rejected as more than
J-S allows for the first release.

**The content locality contract (FTG-9).** Content is global and relational (a family spans households, an employee works
across the town, a faction has members everywhere), while regeneration is spatial. So: (1) the allocation is persisted,
and a scoped regeneration re-places only its own scope's allocation — global rebalancing of content is a separate, reported
action; (2) once the module has materialised the relation store, a scoped regeneration changes no relation outside the
scope: relations of people whose households were superseded are carried over by the household's lineage (§6.3) or dropped
and reported; (3) the locality oracle and O2 (c) cover content and relation hashes as well as geometry. *Judgment:* chose
a relation store whose schema is in the base and whose data the module materialises once and then persists, over relations
re-derived on every read, because a re-derivation after any scoped regeneration would reshuffle relations town-wide; the
one-click path still never pays for it.

=== REPLACE §10.2 Roster (data-driven, replaceable; G-R3's loop, our values) ===

### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r1)

```ts
interface RosterTables { classes: BuildingClassRow[] /* {id, use, perCapita:[lo,hi], perOther?: {class, ratio}, min, max, firstAtPopulation, requires: ('water'|'coast'|'route'|'farmland'|'ore'|'stone'|'timber'|'fish'|'clay')[],
    outside: boolean, liveIn: boolean, cluster?: string, noxious, lifestyleBand, shopProb, priority, footprintM2:[p10,p50,p90], floors:[…], heights, coverageByBand, siteplan, subLocations: SubLocationRow[], openingHours: OpeningRow[], tags} */;
  institutions: InstitutionRow[]; government: GovernmentRow[] /* offices and seat classes per government kind */; religions: ReligionRow[];
  households: HouseholdRow[] /* size distributions by class */; professions: ProfessionRow[]; farm: FarmTable /* §4.9 */; names: NamePack; provenance: Provenance }
```

**The sequential roster (FTG-14; FTG's documented *shape*, `ftg-docs-params.md` §3.3 via the proposals; none of its 209
types, 80 nodes, 299 professions or 323 items).** A **virtual population** advances on a fixed grid of Δ = 10 people up to
the rung's maximum. At each grid point the target count of every class is a monotone step function of the virtual
population — `perCapita` or `perOther` ratios converted to per-person ratios, core versus shop pools, lifestyle-banded pools
with rare outliers (weights ours), hard `min` / `max`, **size gates** (`firstAtPopulation`), **resource gates** read from
`SiteResources` (no farmland → no farms, shops instead) — and every class below its target receives its next building, in
class-priority then class-id order. Every draw is keyed by the building's ordinal (`roster/<class>/<ordinal>`: shop or core,
lifestyle outlier), so the n-th chandler is the same chandler at any population. The run records each building's
**appearance population**; the manifest for population P is every (class, ordinal) that appeared at or below P.
Consequently manifest(P₂) ⊇ manifest(P₁) whenever P₂ > P₁ (property test on 1 000 seeds), an epoch's delta demand is exactly
the suffix, a population fall selects the suffix in reverse order, negative deltas arise only from declared circumstance
events, and §7.8's population control is monotone by construction. **Mode (COV-FTG-B06):** `rosterMode: 'minimiseUnemployment'`
(default: at each grid point, when the unemployed share of the virtual population exceeds a table threshold, the workplace
class with the largest weighted job deficit receives one extra building) or `'matchRatios'` (the configured ratios only,
FTG's alternative). Both are grid-sequential, so both are prefix-stable.

Output: demand per class with area / frontage requirement classes, district affinities, cluster tags, live-in flags,
outside flags and wealth bands; the **character vector** (mercantile / ecclesiastic / military / agrarian / squalid …)
shifts the ratios. **Government (COV-FTG-B13):** the blueprint's `government` circumstance selects a `GovernmentRow` whose
offices force seats — a crown seat forces a royal castle or palace, a seigneurial lordship a lord's castle or keep, an
ecclesiastical lordship a bishop's palace beside the cathedral, a chartered commune a town hall and guild halls, a merchant
oligarchy a merchants' hall — plus a military share (guard posts per 1 000 inhabitants; barracks at CITY and above near the
castle or the gates); the castle toggle `auto` reads it. **Religion (COV-FTG-B14):** religions come from `ReligionRow`s with
worshipper shares (the character vector shifts them), a practice share and clergy per 1 000; temples per religion are
proportional to its practising worshippers; each religion has a faction (§2.7). Then S7b allocates the demand, S10b places
it, and a bounded **plan–fit–reconcile** loop (≤ 3 rounds, inside each district's allocation) trims the lowest-priority
classes where capacity is short and types surplus capacity as yards, greens or vacant plots; population is honoured within
tolerance and reported (O7 a, e).

=== REPLACE §10.3 People, households, schedules ===

### 10.3 People, households, relations, sub-locations, schedules

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r1)

**Households and people.** A person is a pure function `derivePerson(seed, key, tableVersion)` of its key — `(household
lineage id, member ordinal, birth epoch)` — and of the person tables current when its household was created
(`Household.tableVersion`); it yields name, age, status, role, ancestry, height and appearance. **Pinning is an explicit
edit, never a view (LC-16, FTG-10):** opening a person in the gazetteer writes nothing to the document, the hash or the undo
stack; which people a viewer has seen is per-user view state. A table edit applies to households created afterwards; the
existing people change only through a diffed "re-derive people" action (§7.5 pattern). An epoch ages everyone by its years
through the key's birth epoch; births and deaths are epoch events of the owner-staged evolution engine. When regeneration
supersedes a household, its pinned or edited people are fixed inputs re-homed by rule to the household that inherits its
lineage (§6.3), or reported as orphans; the edit-lifecycle row for people is in §7.4. Storage: aggregates plus explicitly
pinned people — kilobytes for a 50 000-person metropolis (FTG PERF-1 answered; R14) — until the module materialises the
relation store, after which relations and postings are persisted (≈ 12 bytes per relation in the binary block; ≈ 1.8 MB raw
for 50 000 people at ≈ 3 relations each, reported per 10 k population as the O7 module metric).

**People model (COV-FTG-C01, COV-FTG-C08).** `AncestryRow { id, lifeStages: {name, fromAge}[], maxAge, heightCmBand, nameGrammar,
appearanceTemplates }` and a partnering matrix (pair weights and the child's ancestry rule) are data; the realism base ships
one human ancestry, and further ancestries arrive only through setting packs (§10.4). `Person.status` ∈ worker, unemployed,
retired, student, dependent; a dependent has a `carer` whose schedule it follows; when a carer is removed the household (then
the family unit) supplies the next carer by rule and the change is reported — a dangling carer is a reference-integrity
violation (§5.3). **Appearance (COV-FTG-C02):** appearance text comes from the §10.4 engine: weighted option tables per
ancestry, line templates with substitution, conditional lines (by gender, age or a value predicate), fallback lines and
article agreement — our own templates.

**The module (`@plat/sim`).** *Relations (FTG-9, COV-FTG-C04):* the first run materialises the relation store by one global
pass on its own stream (`content/relations`) in person-key order — family units, partnerships, parent / child, siblings,
carer / caree, friends, rivals, business and religious ties, affairs — and persists it with lifecycle and reference
integrity (§10.1's locality contract). *Work (COV-FTG-B11):* professions ↔ workplaces by greedy matching with id tie-breaks,
persisted as `Posting` records; after an edit only the postings of changed workplaces and the unemployed pool are
re-matched, in person-key order; unfilled postings are tracked and reported. *Sub-locations and occupancy (FTG-11):*
`occupancy(dayType, hour)` resolves the whole population in person-key order in two passes — primary behaviours (home,
work, study, care, following carers) from profession templates, then occupancy criteria (leisure, guest workers,
temporary residence) filling `SubLocation` capacities with their relax options — cached per (day type, hour) and
invalidated by edits that touch the people or buildings involved; `whereIs(person, day, hour)` reads the cache; resource
*provides / uses* edges on roster rows are data the schedules may read. Budget: one hour for 50 000 people ≤ 50 ms in the
worker, with a cost-model test (§12). *Calendar:* a configurable calendar (hours / day, days / week, rest days, weekday
names) with `SET_TIME` / `SIMULATE_TIME` through the bridge (§11). *Factions (COV-FTG-B12):* seats on plots, an influence field
over districts (used by the prosperity drivers and the grammar), named roles with member criteria (predicates over person
fields) and counts, goals with methods and progress, a secret flag; role headcounts are reconciled with the seat building's
working capacity (excess roles are filled by members housed elsewhere; the reconciliation is reported). Government offices
and religions are §10.2's. *Events (COV-FTG-C05):* `EventTemplate { id, preconditions (predicates over relations, factions,
buildings), weight, effects: EditEvent[] }` rank candidate events per building; starting one applies its effects as logged,
undoable edit events. Data dictionaries (ages, genders, ancestries) are append-only and id-referenced so renaming never
re-colours (FTG DAT-3 avoided).

=== REPLACE §10.4 Names ===

### 10.4 Names, descriptions and setting packs

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r1)

An original English-fantasy grammar (D-6) in a Tracery-class engine of our own (rules with modifiers, feature guards,
weighted decks, conditional lines, article agreement) plus syllable and Markov generators over corpora of our own
authoring; folk-contraction as an EVO event (FTG's erosion idea; "≤ 3 syllables" a parameter); naming draws from `naming/*`
streams only, so names never move geometry. The same engine writes **descriptions** — a district's one-line summary of its
mix and features, e.g. a waterfront quarter that also holds workshops and a green (COV-FTG-E10), and each building's
description (§2.6) — and people's appearance lines (§10.3); descriptions are regenerated when their inputs change unless
edited.

**Per-culture generators and user lists (COV-FTG-L06).** Every `AncestryRow` and culture row names its own grammar and
corpora, so personal and place names can differ by culture; a user-uploaded list (plain text, one entry per line) becomes a
`user` corpus: a syllable and a Markov model trained from it at load, stored in the document as pack data with author
`user`, selectable wherever a corpus is.

**Setting packs — format and loading hook decided now (DEF-10).**

```ts
interface SettingPack { id: string; version: string; author: string; date: string; licence: string;
  provides: { grammars?: GrammarDef[]; corpora?: { id: string; kind: 'personal'|'place'|'word'; entries: string[] }[]; ancestries?: AncestryRow[];
    religions?: ReligionRow[]; appearance?: TemplateDef[]; rosterPatch?: JsonPatch; styleHints?: Partial<StyleSheet> } }
```

A pack is data, never code: schema-validated (`zod`), every entry carrying its author and date (the clean-room rule of §17),
loaded as one layer of the override chain between the shipped defaults and the preset (§7.6), and recorded in the document
by id and version so a replay reproduces it. The base ships exactly one pack, our original English-fantasy set; further
packs' contents are the owner's adopted default "setting packs later" (D-6), and adding one is a file, not a code change.

### Block P-20 — PART II II.1–II.5 and a new II.6 (items GEO-30, LC-18, COV-NG-N06, COV-NG-N12, COV-NG-N20, COV-NG-XA07, COV-VG-VN-179, COV-NG-XB23, COV-NG-CR23, COV-NG-N27, AM-2, DEF-7)

=== REPLACE II.1 The district → neighbourhood interface ===

## II.1 The district → neighbourhood interface

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r1)

```ts
interface SeamContract {                       // carried by every District from milestone 1 (G-P1)
  boundary: SeamEdge[];                        // in ring order; each: { edge, type: 'way'|'water'|'wall'|'field'|'cliff'|'frame'|'sky', wayClass?, widthCm?, frontageSide?, hard: boolean }
  portals: Portal[];                           // where ways cross or meet the boundary: { wayId, class, widthCm, vertex, bearing, addedBy?: EditId } — every one must be connected
  sharedGeometry: 'ownedByBase';               // shared edges are generated once by the base; neighbourhoods read them and change them only through a SeamAmendment
  amendments: SeamAmendment[];                 // recorded in BOTH districts' contracts
  plotLinesOnBoundary: Id[]; alleysOnBoundary: Id[];
  fieldSamples: { prosperity: Sample[]; density: Sample[]; greenery: Sample[]; terrain: Sample[] };   // along the boundary and on an interior lattice; `hard` seams jump, soft seams interpolate
}
interface SeamAmendment { kind: 'tJunction'; spine: Id /* the shared boundary way */; at: VertexId /* inserted by splitThrough */; newPortal: Portal; by: Id /* the district whose close-up asked */; event: EditId }
interface NeighbourhoodRequest {
  district: Id; boundary: TypedBoundary; seam: SeamContract; context: DistrictContext /* kind, venue mix, character, prosperity band, growth stage, water, walls, slope */;
  laid: { blocks: Id[]; plots: Id[]; alleys: Id[] };   // the base's own L2/L3 fabric under this district (R's `laid`)
  layer: 'ground' | 'sky';                     // sky: no portals, no roads in or out (the floating-island context); own terrain optional
  mode: 'refine' | 'replace';                  // refine: presentation detail only (derived); replace: a template fabric (a model edit, II.4)
  strategy: FabricStrategyId; params: Record<string, number>;   // 'bent-cut' (refine) | 'ring' | 'square' | 'street' (replace)
  outlineTemplate?: 'disc'|'d_shape'|'lozenge'|'crescent'|'spindle';   // standalone and sky calls only (§4.2 S1 (2))
  subSeed: StreamKey;                          // derived from the district id (§6.1)
  lod: 'neighbourhood';
}
interface NeighbourhoodResult { blocks: Block[]; ways: Way[]; plots: Plot[]; buildings: Building[]; greens: Greenery[]; pins: Pin[]; labels: Label[]; seams: SeamReport; report: StageReport }
interface SeamReport {                         // written by every close-up; its numbers are the S1 acceptance (II.5)
  portalsTotal: number; portalsConnected: number /* must equal portalsTotal */; unconnected: Id[]; addedPortals: SeamAmendment[];
  sharedEdgeHausdorffCm: Cm /* must be 0: shared edges are read from the base; an amendment only inserts a vertex on them */;
  fieldJumps: { edge: HalfEdgeId; field: 'prosperity'|'density'|'greenery'; delta: number; hard: boolean }[] /* a jump on a soft seam outside its band is a soft-invariant failure */;
  superseded: { old: Id; new: Id }[];          // entities re-derived by a template replacement, under the anchor rule (§2.1, §6.3)
}
interface NeighbourhoodStrategy { generate(req: NeighbourhoodRequest, ctx: StageContext, k: Kernel): KernelResult<NeighbourhoodResult> }
// Pin is defined in §2.7 (the complete furniture vocabulary, in the entity registry from M1)
```

Rules: (1) the base generates every shared edge once and both districts read it; (2) a close-up either **refines** — adds the
neighbourhood-LOD presentation detail (roof construction and hatching, surfaces, pins, trees, local street names) as a
pure function of the district's committed base state, its sub-seed, strategy and params, never changing L1–L4 geometry —
or **replaces** the base's plots with a template layout inside its boundary with `ring` / `square` / `street`; the templates
are `FabricStrategy` registrations selected per district (G-P2), so a template district is laid by the base's own engine
with seams by construction; (3) **seam amendment (GEO-30):** a close-up may end a street on a shared boundary spine (NG's
cuts end on existing roads, 361 / 361; the ring template's radials run to the edge); each such end is a T-junction
inserted with `splitThrough` so the shared spine stays one chain, recorded as a `SeamAmendment` and a new portal in both
districts' contracts; the neighbour re-derives only its corridor half-strip and junction wedge at that vertex, never its
plots, and every portal stays connected (S1 acceptance: portal connection 100 %, shared-edge Hausdorff 0); (4) footprint
hashes at city LOD and neighbourhood LOD are identical for every entity a `refine` close-up covers (refinement never changes
geometry), and a `replace` close-up re-derives its entities under the anchor rule and records `supersedes`; (5) the
standalone no-portal mode is the same call with a synthetic boundary drawn from an **outline template** (disc, D-shape,
lozenge, crescent, spindle — NG's template outlines, our own shapes; COV-NG-N06) through §4.2's closed-outline routine; the
**sky-island call** is the same request with `layer: 'sky'`, an outline from that routine, optional own terrain echoing the
ground, no roads in or out, and a `reason` (II.6), its shadow projected onto the ground layer by §8.4.

=== REPLACE II.2 Templates as fabric strategies (NG B2, B7, B8) ===

## II.2 Templates as fabric strategies (NG B2, B7, B8)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r1)

`RingFabric` (COV-NG-N12): concentric `secondary` ring roads inside the boundary at a radius law (a table) are the template's
only seed geometry — no template radials. The bands are processed **outside-in**, one hole-aware bent-cut recursion per
annulus (§4.6's slit, σ = 0.098): the band's **first cut is a slit** that opens the annulus without splitting it, and the
band's later cuts are its radial streets, arriving at the ring roads at right angles by the recipe's perpendicular
departure and arrival; because each band draws its cuts from its own sub-stream, radials are **staggered band to band**,
never one straight line through all rings (NG RA-2, RA-4, PF-1). Radials of the outermost band that reach the boundary use
the seam amendment of II.1 rule (3). `SquareFabric`: `mode: 'carved'` places a rectangular or round plaza face at the
district's centroid or at a portal, sized from population, frontages typed `square`, then the bent cut on the remainder;
`mode: 'void'` (COV-VG-VN-179) carves nothing — the plots whose frontages face a chosen open area are left unbuilt, so the
square is the irregular void their omission forms (NG 1.1.0's square, IMPR S4's "keep NG's square as a void"); in both modes
a centrepiece pin (monument, statue or fountain; COV-NG-XB23) sits at the square's nexus. `StreetFabric`: a main street
between two portals with plots directly on it, bent cuts on the deeper faces. **Template road widths (COV-NG-N20):** ring
roads and template streets take fixed per-district widths drawn once from the district's stream (NG: per-seed values), while
cut streets follow §4.6's width law. Each template is "seed geometry plus how many sub-areas to hand to the bisector"
(CA-2 via the parity judge) and is a data row plus a strategy class; the `area` template is the base's default. Templates
chosen by context (S4) read the district context (a quay district gets a quay-parallel street; an intramural district a ring
near the wall; a stepped street on a slope).

=== REPLACE II.3 Block content dispatch, pins, local identities (S2 context features) ===

## II.3 Block content dispatch, pins, local identities (S2 context features)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r1)

A stage-2 table maps `(block area, spacing to the nearest green, spacing to the nearest landmark or manor block, district
kind, prosperity band)` → the weighted choice NG makes among Normal / Manor / Empty / Green (CONFIDENCE B6: NG's
`createGreen` on 23–58 % of Normal blocks with no target is the failure — ours has a target per band, from §4.9's rules);
a **minimum landmark spacing** row keeps landmark and manor blocks apart (NG's "kept apart from each other"; COV-NG-XA07).
**Pins** of the neighbourhood tier (wells, fountains, large trees, statues, monuments, bandstands) are placed in yards and
squares by a probability gate per kind and band, as refine-mode presentation detail; the base's own pins (§4.7 S11) are
model entities and appear at every LOD. **Local street identities** (names, surfaces, widths) come from the way records and
the naming grammar; context features (quays, intervallum along the wall, stepped streets, bridge approaches) are constraints
available inside the boundary. A manor compound's enclosure wall and gate are the base's `PlotBound` treatments
(§2.5, §4.7 S11), so the close-up draws NG's walled compound from model data (COV-NG-N27).

=== REPLACE II.4 The render tier and the workflow (S5, S6) ===

## II.4 The render tier, the workflow and the close-up's persistence status (S5, S6)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r1)

The `hatched` preset at neighbourhood LOD (§8.2, §8.6): tapered hatch triangles from the ridge, two-tone roofs by the
measured law over the stored wings, prism shadows from stored heights, cobbles / tiles / outlined / dashed road programs,
chimneys, wells, lobed depth-sorted trees, the hood title in the emptiest corner; ≈ 25 canvas ops per wing as the
ceiling; instanced hatching.

**Persistence status (LC-18).** A `refine` close-up is **derived data**: a pure function of the district's committed base
state, sub-seed, strategy and params, identical whether computed eagerly or lazily, held outside the base hash and never
stored — so the town is the same before and after anyone opens a district. Editing a close-up element (moving a well,
removing a tree, restyling a pin) records an **instance-override event** on the element's host entity and ordinal (§7.1),
which persists, undoes and replays after regeneration, re-matched by position; when the base re-derives the district, the
close-up re-derives with those overrides carried over and orphans reported. Close-up lanes, plots and houses are base
entities (the base's S8–S11 already produce the finest model fabric), so renaming a lane or locking a house is an ordinary
base edit. A `replace` close-up (a template fabric) is **a model edit**: `setAttr(district.fabric, template)` plus a scoped
regeneration of the district — logged, hashed, the same for every viewer, and visible at city LOD because city-LOD footprints
read the same model at every zoom.

**Workflow.** Open any district at neighbourhood LOD from the city view; "Same kind, new seed" per district with locks (the
four actions of §7.1 scoped to the district); per-district reroll isolation (rerolling district D leaves every other
district byte-identical — R8 — except the corridor and junction wedge at a seam amendment's vertex); export of one district
as its own SVG / PNG / VTT scene.

=== REPLACE II.5 What the base already carries for stage 2 (all base requirements in PART I) ===

## II.5 What the base already carries for stage 2 (all base requirements in PART I)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r1)

Typed boundary edges with `hard` flags and portals on every district (§2.5); shared geometry owned by the base (§2.2) with the
seam-amendment protocol and `splitThrough` (§3.4, II.1); plot lines and alleys on the boundary (§4.7); seam-continuous
prosperity, density and greenery fields with hard / soft seams (§4.5); per-district sub-seeds (§6.1); the hole-aware bent cut
with the measured recipe (§4.6); the `FabricStrategy` slot (§14, G-P2) with `BentCutFabric` registered from M1 and the three
template fabrics registered at M5; stored wings, boundary treatments and the complete pin vocabulary (§2.5–§2.7); the
neighbourhood LOD band declared in the display list and the `hatched` programs (§8); the tile cache (§8.5); the
per-district regeneration budget ≤ 30 ms (§12); the close-up persistence rule and the instance-override event (II.4, §7.1);
the sky context and outline templates (§2.1, §4.2, II.6). Acceptance for stage-2 readiness of the base itself: every district
of every B-CITY city carries a complete `SeamContract` in the schema — 100 % — before any close-up generator exists (M1
exit). Acceptance for stage 2 itself (M5 exit, §16), read from the `SeamReport` of II.1: portals connected 100 % (added
portals included); shared-edge Hausdorff distance 0; field jumps on soft seams within band; the footprint hash at
neighbourhood LOD identical to the city-LOD hash for every entity a refine close-up covers; opening a district ≤ NG's
recorded 10–96 ms at comparable counts and per-district regeneration ≤ 30 ms (§12); rerolling one district leaves every
other district byte-identical outside amendment vertices; the model hash unchanged by opening, closing or reopening any
number of districts.

=== INSERT AFTER II.5 What the base already carries for stage 2 (all base requirements in PART I) ===

## II.6 The staged layers — floating islands and sewers: the hooks the base carries now

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r1)

*In plain words.* The owner stages both layers as toggles after the city is mastered. Nothing here is built in the base,
but every record and interface they need exists now, so adding them later is a registration, not a redesign.

**Floating islands (AM-2; DEF-7).** The toggle creates 1–3 islands. **Why an island exists** is one of two reasons, by rule or
by assignment: `prosperity` — the island carries a very prosperous neighbourhood or set of neighbourhoods; by rule, when the
toggle is on, the roster's richest demand for up to three districts' worth of households is allocated by S7b to sky
pseudo-districts instead of the ground (so the population stays whole); `institution` — the island carries one unique
institution chosen from an `IslandInstitution` row (a palace overlooking the land, a cathedral, a prison isolating
criminals) or named by an assignment. **What it is:** a `SkyIsland` (§2.7) with an organic oval outline from §4.2's
routine (the `disc` or `lozenge` outline template), an elevation from a band row, and optionally its own terrain from S1 run
on the sky plat with an *echo* request — its relief `echo` or `own`, and a conjured river that takes the ground river's
bearing and width law; its districts are laid by the ordinary pipeline through a `NeighbourhoodRequest` with `layer: 'sky'`
(no portals, no roads in or out). **Where it floats:** a placement rule reads the ground plan — over water, fields or
outskirts by default, over the core only by assignment; the occlusion mode (opaque, ghost the covered ground, offset view) is
a rendering choice (§8.4). **What it does not do:** it has no relation to the underground layer; its shadow falls on the
ground through the shadow pass; it exports as its own layer (§11). Hook interface:

```ts
interface IslandRule { reason: 'prosperity'|'institution'; maxIslands: 1|2|3; elevationCmBand: [Cm, Cm]; areaHaBand: [number, number]; placement: ('water'|'fields'|'outskirts')[]; terrain: 'none'|'echo'|'own' }
interface SkyStrategy { place(doc: Document, rules: IslandRule[], ctx: StageContext, k: Kernel): KernelResult<SkyIsland[]> }   // a Stage registered after S7b by declared I/O
```

**Sewers (DEF-7).** A `SewerStrategy` registers as a stage after S11 (declared inputs: ways with `flowToward`, the drainage
raster and outfalls of §2.3, plots and buildings with their class table's `drain` column, the underground plat; output:
`Tunnel` records, §2.7). Its rule families are data: `follow-streets` (mains under the ways, falling with `flowToward` to the
outfalls), `drainage-lines` (along the natural drainage), `mixed`; which buildings need drains is the class table's column;
two presets — `historical` (restrained: open gutters, a few culverted mains, cess pits by class) and `navigable` (the fantasy
preset: large vaulted mains with chambers). It renders through the ground by §8.4's cut-away or overlay and exports as the
underground layer.

```ts
interface SewerStrategy { derive(doc: Document, rules: { family: 'follow-streets'|'drainage-lines'|'mixed'; preset: 'historical'|'navigable' }, ctx: StageContext, k: Kernel): KernelResult<Tunnel[]> }
```

=== REPLACE PART III — What a later village product would need from the base (one page; no design) ===

# PART III — What a later village product needs from the base (one page; the hooks are concrete)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r1)

*In plain words.* The village generator is a separate product the owner stages after the town, with its own ladder
(thorp → hamlet → village). This page lists what it would take from the base, the hooks the base carries for it now, and
confirms nothing here stands in its way; the base does not pay for it.

**What it would reuse unchanged:** the kernel and plat (§2–§3); the site model — descent-traced rivers with a carved field,
level-set ponds, the coast routine (§4.2) — and, for VG's own order, a `RiverStrategy` that lays a terrain-independent
spline course first (VG's live course runs through 6–7 control points before its terrain; COV-VG-WC2) and asks S1 to carve
the field to it, which S1's carve step already does; the sequential roster and lazy people (§10); the frontage-first plot
machinery and the site-plan tables, which already contain cottage, farmstead and detached-in-yard classes (§4.7); the
hinterland presets incl. the VG sector look, orchards and commons (§4.9); the `palisade` enceinte kind (§2.7); the display
list, style sheets and the reserved `painterly` preset slot (§8.2); the document, edits, exports and the API (§7, §11).

**What it would add behind hooks the base now carries (DEF-15):**
1. **A density stage before its network (COV-VG-VN-002).** The pipeline is the topological order of declared stage I/O
   (§4.1, §4.12), so a `VillageStrategy` registers a density `StageDecl` whose output the network stage declares as an
   input; VG computes its density before its roads, and the base's S6 order does not bind it.
2. **A palisade before its roads (MN-4, COV-VG-VN-003).** On the live VG build 19365073 the palisade is built before the roads
   — the hull of the populated points of a 10 × 10 lattice over the density field, cleaned and smoothed — and the road
   trackers consult it at every step, gates falling where they meet it (`profile-village.md` New-build addendum N2, P1).
   The village registers an `EnceinteStrategy` that builds exactly that from its density stage, and its tracker-steered
   `NetworkStrategy` receives the result through the `enceintes` input every network strategy now takes (§4.12).
3. **A tracker-steered network** (VG's roads are steered trackers, not A\* — `_critic-vg-ng.md`) with one through-road and
   partial driveways, and a **"houses along ways" `FabricStrategy`** with no block cutting.
4. **One district (COV-VG-WC4).** A village is modelled as **one district** of kind `village` (one quarter) covering the
   settlement; its blocks are the large faces between ways and its plots line the ways, so the containment invariant
   building ⊂ plot ⊂ block ⊂ district holds unchanged and nothing in §2–§4 needs a village exception.
5. **A size ladder below TOWN.** Rung rows THORP ≈ 20–80, HAMLET ≈ 80–400, VILLAGE ≈ 400–1 500 inhabitants (our own rows,
   calibratable; VG spans ≈ 130–1 700); a request above the village ceiling goes to the base, whose size follows population within its rung; a
   village request's default is not a walled circle (walls are a rule keyed on rung); VG's independent tree stream is a
   keyed sub-stream (already the design); the relief renderer (hillshade, contour marks, spotlight vignette) as optional
   programs.

**Not-precluded checks** (the parity judge's 44 / 44): the strategy registry admits every strategy above; the level model
tolerates nearly empty L2 / L3; model time is near-linear in building count; every VG rendering row has a program or a
preset slot; terrain-and-water-as-one-picture is the base's own model. **What the base does not pay for:** tracker
steering, the palisade construction, the relief renderer, the palisade look, VG's grammar and its tag vocabulary.


## 3. Cross-area requests

The integrator applies these in the named sections, which other areas own. Each names the pipeline item(s) that need it.

### 3.1 To KERNEL

| # | section | request | items |
|---|---|---|---|
| K-a | §2.3 Terrain and water | Add `'distributary'` to `WaterBody.kind`; add a per-shore-segment `shoreClass` (one of bay, headland, straight per shore segment) beside `bankKinds`; replace "its level sets and drainage lines are exported into L0 as faces and typed edges" with "drainage lines are exported into L0 as typed edges; contour lines are not model geometry — they are extracted per render tile and clipped to the land faces (§4.2 S1 (2), §8)"; expose the refined 2.5 m raster as an on-demand `TerrainSampler` (bilinear) that S11's ground datum reads. | GEO-14, IMP-9, COV-FTG-H06, FTG-13 |
| K-b | §2.4 Ways and typed edges | Add `provisional: boolean` to `Way` (S5-grown spines beyond a stage boundary, the only ways the inter-stage trim may cut) and `bridge?: Id` (the §2.7 `Bridge` deck); add the edge type `reserved` (a reservation's L1 boundary); state that a `wall` chain may be open with typed end anchors (§2.7). | FTG-18, GEO-17, MFP-3, FTG-8 |
| K-c | §3.4 Kernel operations | The pipeline now calls: `splitThrough(edge, latticePoint)` (cut ends extended to the crossed spine, §4.6 step 7; seam amendments, II.1); `claimSubFace` over a multi-face region (`FaceRef`), not only one face (S3 and S7b reservations); the single kerb function of GEO-20 (S8's working polygon); per-input-edge face attribution from `skeleton(face)` (S10's per-frontage regions); a topology-preserving `simplify(chain, minSegment, minAngle, obstacles)` that refuses a removal which would self-touch, cross an obstacle or move a pinned vertex (S5a's trace); a hexagonal lattice with adjacency by construction (S4). Please list them with preconditions and fuzz tests. | GEO-21, GEO-30, MFP-3, FTG-3, GEO-24, GEO-18, GEO-16 |
| K-d | §2.2 rule 1 | Name wall half-bands, glacis, tower and gatehouse parts as per-side `FaceRef` unions (like corridors) so every part nests in the L1 face on its side of the wall edge. | GEO-38 |

### 3.2 To DETERMINISM

| # | section | request | items |
|---|---|---|---|
| D-a | §5.2 ladder rows | **F-CUT:** reflex pre-cut (pre-step) → redraw `f` ×2 → straight cut on the mean normal → the always-succeeding clipped cut perpendicular to the longest run → substitution only for faces ≤ 2 × the band's upper block area; per-district residue report (soft ≤ 5 %). **F-WALL:** trace fixed before growth with gates pinned (S5a); last rung cuts a way reaching the wall at the setback band and prunes the outer stub; `N = 0` adds no gate. **F-CASTLE:** equalise angles (≤ 20) → bloat in 5 % steps to the band top → re-site (reported) → keep without bailey (reported). **F-ROUTE:** new rung "move the crossing site along its reach when an approach cannot meet the class radius". **F-RIVER:** carve cap `carveMaxCm` then re-trace from the last good knot, then move the inlet; river island "not built" reported when branch separation fails. **F-BUDGET-STAGE:** S5d area test with one top-up, then the exact plot check after S10 feeding F-SITING. **F-SITING:** reconcile inside the district's allocation; cross-district moves only in S7b's reconcile. **F-PLOT:** per-frontage regions; skeleton downgrade → reflex pre-cut partition. **F-SITEPLAN:** add the `tents` row and stepped wings on slopes above `skirtMaxCm`. **F-OUTLINE (new):** displacement clamp → non-zero union repair → typed loops (islet / pond / absorbed), reported. | GEO-23, GEO-18, MFP-4, MFP-3, GEO-17, GEO-36, FTG-2, LC-2, GEO-24, FTG-13, GEO-13 |
| D-b | §5.3 invariants | Add: footprints ∩ (wall band ⊕ setback) = ∅ **on both faces**; no way crosses a reservation; roads leaving each walled stage = its gate count and an outer enceinte's gates ≥ its arterial crossings; every quay reachable from the town without crossing a wall except at a gate; a dependent's carer resolves (reference integrity); keep "bridges within ± 10°" (now constructive: measured on the deck and on the way) and "contours never cross a shore" (now a check of the clip construction, never an abort path). | MFP-9, MFP-3, MFP-4, FTG-8, COV-FTG-C08, GEO-17, GEO-14 |
| D-c | §6.1 concern registry | Register: `blueprint.features`, `gate.pick`, `reserve.plaza`, `reserve.castle`, `reserve.precinct`, `reserve.water`, `growth.mainroad`, `growth.curvature`, `alloc.district`, `alloc.block`, `plot.vacancy`, `plot.bounds`, `material`, `siteplan.template`, `pin.centrepiece`, `pin.decor`, `pin.stall`, `hinterland.outside`, `hinterland.decor`, `crop`, `water.delta`, `cut.farSideAlt`, `content/relations`, ordinal-keyed `roster/<class>/<ordinal>`, `island.place`, `sewer`. | COV-MFCG-A03, MFP-4, MFP-3, FTG-4, FTG-17, LC-2, COV-VG-VN-170, VIS-8, COV-FTG-F20, COV-MFCG-I01, COV-FTG-J02, COV-FTG-J05, FTG-7, COV-FTG-I12, COV-NG-VS27, IMP-9, MN-3, FTG-9, FTG-14, AM-2, DEF-7 |
| D-d | §6.2 / §2.9 | Define the model hash over the eager model (everything the city LOD draws plus the `Allocation` and `FieldBands` records); add the *derived-complete* hash CI check (50 METROPOLIS seeds, three random district orders, workers on and off, identical). | LC-2, FTG-1 |
| D-e | §6.3 / §2.1 | Household ids must be lineage-stable across re-derivation (the person key `(household lineage id, ordinal, birth epoch)` depends on it; LC-1's lineage). | LC-16 |
| D-f | §7.1 EditEvent | `convert` takes the `ConversionOp` defined in §4.11; `setAttr` on a town's `FieldBands` is the explicit re-banding edit; `setAttr(district.fabric, template)` + `regenerate(district)` is a stage-2 template replacement; `pin` is only ever an explicit user action (never emitted by viewing); the instance-override event (LC-20) also serves close-up presentation edits (II.4). | GEO-27, LC-6, LC-18, LC-16 |
| D-g | §7.2 | Replace "a field edit regenerates the plots and site plans of the blocks whose band changed, nothing else" with: strokes are relative Δ over the drivers, clamped once; a stroke re-derives every block whose plot samples moved by more than τ = 0.01 of the field range (the same τ on replay); bands move only by an explicit `FieldBands` edit or an epoch. | LC-6 |
| D-h | §7.3 | "Regenerate (keep settings)" re-derives from each plot's recorded `DerivationRecord`; re-deriving with current inputs is `Adjust`. | LC-12 |
| D-i | §7.4 lifecycle table | Add a **people** row (create: explicit pin or edit only; persist: pinned fields; regenerate: pinned people are fixed inputs re-homed to the household inheriting the lineage, else orphans reported; undo: inverse; migrate: person-table version per household, orphans reported) and a **close-up presentation** row (instance-override events, re-matched by position after the base re-derives the district, orphans reported). | LC-16, FTG-10, LC-18 |
| D-j | §7.6 | The override chain gains the setting-pack layer: `defaults ⊕ packs ⊕ preset ⊕ userGlobal ⊕ documentOverrides ⊕ editEvents`; the document records pack ids and versions. | DEF-10 |
| D-k | §7.7 | Forms: add `twin-town` / `polycentric` rows (k = 2–3 nuclei, §4.2 S3); state `linear-street` as anisotropy `a = 8` (§4.4) and `island-city` as shore destinations (§4.2 S3). Expansion example: `planned ∈ [0, 1]` → `growth.headingSigma = lerp(20, 5)` **degrees per 100 m** (replacing `lerp(9°, 2°)`). Circumstances gain `government` and the landscape toggles; the character vector gains `buildingScale`. | IMP-9, FTG-5, FTG-19, FTG-17, COV-FTG-B13, COV-FTG-B09, COV-FTG-F09 |
| D-l | §2.8 LifecycleState | §4.11 and §4.9 use `abandoned`, `decayed` and `ruined` states (the latter is COV-NG-XA36's fix); please include all three. | DEF-8, COV-FTG-I12 |

### 3.3 To RENDERING

| # | section | request | items |
|---|---|---|---|
| R-a | §8.2 / §8.1 | Roof *construction* is a style-sheet parameter over the stored wings (`plain`, `skeleton-hip`, `skeleton-gable`, `fake-gable-per-wing`), falling back to the model's `roof.kind`; the derived-roof cache is keyed by (entity, construction); define two-tone lit / shadow assignment for any roof face set; census: roofs per wing, hatch triangles per wing 15–20, no ridge stroke. | VIS-10 |
| R-b | §8.2 / §8.3 | Symbols and programs for `PlotBound` treatments (a stroke distinct from buildings, never filled, ≤ ½ the building outline weight, gaps at gates, drawn from district LOD); the pin vocabulary of §2.7 (statue, monument, bandstand, market cross, campfire, fire pit, stall as a small tent glyph, trough, lamp) and `tent` buildings; crown symbols chosen by `Greenery.species`; shore decoration per bay / headland class; field textures in `lit` keyed by `LandUse.crop` / `livestock`. | VIS-8, COV-FTG-J02, COV-FTG-J05, COV-FTG-E07, COV-FTG-I11, COV-FTG-H06, COV-NG-VS27 |
| R-c | §8.4 | Shadows are projected from `baseCm + heights` onto the terrain (or a stated flat-ground error bound), foundation skirts included; state the shadow pass's budget (proposal: ≤ 10 % of the city-LOD frame at CITY with vector offsets; pre-decided fallback: drop mode instead of projected at METROPOLIS), answering AM-3's "Fantasy Manor spends ≈ 90 % of its render on its drop shadow — budget accordingly"; the sky layer's occlusion modes match II.6 (opaque, ghost, offset). | AM-3, FTG-13, AM-2 |
| R-d | §8.5 / §12 | The one-click first paint is the complete city LOD (S0–S13 eager, §4.1); the METROPOLIS-only preview (blocks as masses in the ground tone, replaced exactly once, reported) replaces "S1–S9 → a city-LOD preview while S10–S13 continue"; restate §12's METROPOLIS clause as a budget for the complete city LOD with §4.1's per-district pool as the pre-decided fallback (measured at M2); add rows for S3 reservations, S5a–S5d, S7b, S10a, S12a / S12b; the stage-3 `compose()` tile budget (≤ 1 ms per building median, one tile within 16 ms of frame work, amortised) and `outline()` inside S11's ≤ 10 µs; the simulation module's occupancy budget (one hour for 50 000 people ≤ 50 ms in the worker, cost-model test); contour lines extracted per render tile and clipped to land faces. | SCL-4, DEF-16, SCL-13, FTG-11, GEO-14 |
| R-e | §9 | City-LOD area labels are **quarter** labels (§4.5; ≈ MFCG's district count per rung); district names from district LOD; label placement at finer LODs is view data outside the model hash; multi-line labels supported (state the rule). | MFP-10, LC-2, COV-MFCG-Q01 |
| R-f | §11 | Export `PlotBound` walls and fences as VTT walls and GeoJSON lines; glTF places meshes at `baseCm` with foundation skirts and bridge decks at `deckCm`; sky and underground layers export separately (II.6). | VIS-8, FTG-13, AM-2, DEF-7 |

### 3.4 To SCOPE

| # | section | request | items |
|---|---|---|---|
| S-a | §1.2, §1.4, §1.5, §1.6 | §1.2: the first paint is the complete city LOD. §1.4 rows: *secondary streets* — MFCG's intramural streets are its district-wide twisted bisection (a real secondary network, not "none as geometry"); PLAT grows district-scale secondaries in walled cores and cuts the rest with the bent cut, FTG growth outside the walls; *walls* — trace and gates before the stage's growth, castle and plaza reserved at S3; *districts* — feature-named kinds plus quarters; *blocks → plots* — per-frontage regions. §1.5: epochs run the main-road step; survivors change only through explicit transformation events. §1.6 village: replace "Nothing in §2–§4 assumes walls, districts or a market" with "a village is modelled as one district; stages are ordered by declared I/O; network strategies take an enceinte input (PART III)". | SCL-4, MFP-2, GEO-18, MFP-3, MFP-7, MFP-10, GEO-24, FTG-4, LC-12, COV-VG-WC4, COV-VG-VN-002 |
| S-b | §13.5 parity metrics (new rows) | MFCG street signature (lot-orientation coherence R4 at 60 / 120 / 250 m: MFCG 0.84–0.97 / 0.58–0.88 / 0.32–0.68; wall and shore alignment by distance band: within 40 m median 3.5–4.5°, 84–92 % ≤ 15°; T/Y share; intramural dead ends; blocks per ha; lots per block); walled share (MFCG 0.87–0.92 at sizes 40–250) and extramural ribbon share within 100 m of an arterial (MFCG 71–85 %); outline anisotropy (land-sector r90 CV, road / non-road r90 ratio; FTG 0.20–0.33 and 1.26–1.65; monotone in `a`); court share of deep blocks per class; vacancy-run share of frontage per band; growth drift (organic 600 m net turn p50 15–30°, > 90° ≤ 1 %, no turn cliff); block-level use mix (residential-only block share, per-block entropy, trade households at their workplace); castle area and compactness in band ≥ 99 %; roads leaving each walled stage = N; quays reachable 100 %; substitution residue ≤ 5 %; junction band per preset; quarter label count vs MFCG (9 / 12 / 18 at sizes 40 / 80 / 130). | MFP-2, MFP-6, FTG-5, IMP-8, COV-VG-VN-170, FTG-17, MFP-7, MFP-3, MFP-4, FTG-8, GEO-23, FTG-6, MFP-10 |
| S-c | §13.1 / §13.2 tests | Property tests: 10 000 coast / island / fjord / sky outlines per intent → 0 self-intersections, 0 untyped loops; 0 overlapping or self-intersecting plots on concave, notched and curved blocks before any fallback; attached and party-wall shares on curved-street blocks; roster `manifest(P₂) ⊇ manifest(P₁)` on 1 000 seeds; the stage-3 contract test (union of composed wings = outline); the `ringed` fixture (≥ 3 closed rings, radius CV ≤ 10 %); B-CITY sweep over `wealthLevel` ∈ {0, 0.5, 1} (population ± 5 %, walled share in band); the derived-complete hash across district orders; opening a person leaves hash, log and undo unchanged. | GEO-13, GEO-24, GEO-26, FTG-14, SCL-13, FTG-6, FTG-2, LC-2, LC-16 |
| S-d | §15.1 / §15.2 | O4 (b)'s 4-way band per preset (organic 0–15 %, ringed 20–45 %, american 40–80 %); O4 (g) / O14 (d) count landings for island towns; O1 (c)'s delta and O8 (f)'s two independent enceintes are now realised (distributaries, polycentric nuclei), O10 (g)'s forms list includes `twin-town` and realisable `linear-street` / `island-city`; O17 (d) counts walled or fenced frontage toward streetwall continuity; O7 module stored bytes restated (§10.3); §15.1 VG G3–G5: "S1 shares level-set water and a carved field; VG's course-first spline is a `RiverStrategy` the village registers"; FTG C7 small tents realised (§4.7), C9 landmark templates in the base (§2.6), C16 decoration table (§4.9); NG B1 outline templates, B8 ring template per II.2; MFCG B6 / B14 castle and plaza reservations. | FTG-6, FTG-19, IMP-9, VIS-8, FTG-9, COV-VG-WC2, COV-FTG-E07, COV-FTG-F16, COV-FTG-I12, COV-NG-N06, COV-NG-N12, MFP-3 |
| S-e | §16 build plan | M-1 adds FTG's plot share (#5 faces), NG's hollow-block frequency and MFCG's inner-lot removal; M0 (b) exit restated distributionally (position `f` against AN-2: σ within ± 0.02 of 0.066 plain / 0.098 ring; corner within 0.10 of mid-course ≥ 80 %; arrival ≥ 85° ≥ 95 %; block-area / cut-length KS with the far-side fallback chain of §4.6 step 4) and run on curved, round-joined, triangular, C-shaped and holed faces; M0 (c) fusion gate adds MFCG's signature rows; M1 exit adds the walled share in band; M2 adds the METROPOLIS single-thread measurement that switches the district pool (§4.1); M4 adds the epoch test of §4.11; the stage-3 intake measurement of §2.6. "Deliberately out of scope": replace stage-3 compositions, sewers and islands, the evolution engine and the village product with "staged by the owner — hooks concrete in §2.6, II.6, §4.11, PART III"; drop setting packs (decided, §10.4). | FTG-2, IMP-8, MN-3, COV-NG-N18, GEO-22, MFP-2, MFP-6, DEF-16, GEO-27, SCL-13, DEF-17, DEF-7, DEF-8, DEF-15, DEF-10 |
| S-f | Decision tables and Deferrals | D-2: strike "the walled stage's share ≈ 0.35–0.5" (now MFCG-calibrated stage rows, §4.2 S2). D-10: the relation store's schema is in the base, the module materialises it; storage restated. D-17: gates picked first at S3, trace fixed before the stage's growth, castle and plaza reservations. D-18 / J-12: the per-district pool is specified now and switched by M2's measurement. D-19: district band derived from the count law; gate law `round(1 + 0.47 √A_ha)`; stage counts and shares per rung. D-25: the evolution engine is staged by the owner with concrete hooks (§4.11). **Deferrals:** remove "the sewer and floating-island rule design beyond the hooks", "the evolution engine beyond the one incremental path", "setting packs" and "the village product (PART III)"; add a list "Staged by the owner (hooks concrete)": stage-3 compositions (§2.6), sewers and floating islands (II.6), the evolution engine (§4.11), the village product (PART III). | MFP-6, FTG-9, MFP-3, MFP-4, GEO-18, DEF-16, MFP-10, DEF-8, DEF-7, DEF-10, DEF-15, DEF-17 |
| S-g | Judgment calls (new rows) | Add, as written in the blocks: **J-P1** chose feature-named district kinds over class-typed kinds because MFCG's live taxonomy dropped class wards and its townspeople lived where they worked (§2.5). **J-P2** chose a quarter level for city-LOD labels over thinning district labels, because MFCG labels every one of its larger districts (§4.5). **J-P3** chose reservations and gate sites at S3 and the trace before each stage's growth over claims and walls after growth, because nothing then has to cut, gate or reroute streets and the fabric inherits the wall (§4.2, §4.4). **J-P4** chose the bent cut for the intramural fabric and FTG growth outside the walls over FTG growth everywhere, because MFCG's measured intramural signature comes from recursion on the district polygon (§4.4). **J-P5** chose MFCG's walled share over 0.35–0.5, because a mostly-extramural default reproduces MFCG's shanty case and a compact walled town with ribbons is the constrained medieval pattern (§4.2 S2). **J-P6** chose plot counts per band with a measured plot share over one area per class with `1 − 0.38`, because 38 % is footprint over lot and plots span 11× in size across bands (§4.2 S2). **J-P7** chose a network-travel-cost level set with an anisotropy row over isotropic distance-cost, because FTG's creator retired the circular look and its towns are measurably longer along main roads (§4.4). **J-P8** chose a mean-reverting curvature walk with goal reversion over a random walk on the rate of turn, because the latter curls 600 m streets through 73–108° (§4.4; `docs/validation/bench/fixall_pipeline_ou_heading.out`). **J-P9** chose an eager town-wide allocation, a laziness contract and a complete city-LOD first paint over lazy per-district S10–S14, because the lazy tier made the town depend on viewing order and the owner wants footprints at city zoom (§4.1). **J-P10** chose one worker first with the district pool specified and switched by M2's measurement over pools by default (§4.1). **J-P11** chose to forbid bent-cut continuation across district boundaries over two-district transactions (§4.6). **J-P12** chose the vector coast with contours clipped to land over a shoreline extracted as the raster's level set, because it keeps centimetre precision and makes the invariant constructive (§4.2 S1). **J-P13** chose per-frontage regions from the block's straight skeleton over FTG's reflex pre-cut as the primary construction, keeping the pre-cut as its fallback, because regions are exact on curves (§4.7 S10). **J-P14** chose row footprints by clipping over fitted rectangles, because party walls must be one shared edge on bent and curved frontages (§4.7 S11). **J-P15** chose to decide the deep-block interior in S8 by band shares over S10 inserting lanes, because S10 cannot write L1 and dense quarters must keep their courts (§4.6). **J-P16** chose NG's perpendicular-ray far side with a pre-decided fallback chain over an open rule (§4.6 step 4). **J-P17** chose wings stored in the base over single-wing L / T (§2.6). **J-P18** chose an `outline()` / `compose()` split with a cost contract over one lazy `compose` (§2.6). **J-P19** chose `baseCm` = the highest sample plus a plinth, with foundation skirts and stepped wings, over the lowest sample, because no floor may be buried and nothing may float (§2.6). **J-P20** chose a sequential grid roster keyed by building ordinal over a capped fixed-point iteration, because only the former is prefix-stable in population (§10.2). **J-P21** chose a base-schema relation store materialised by the module over relations re-derived on every read (§10.1). **J-P22** chose pinning by explicit edit only over "pinned once seen", FTG's own rule (§10.3). **J-P23** chose close-up refinement as derived data and template replacement as a model edit over refinements entering the model (II.4). **J-P24** chose the gate law `round(1 + 0.47 √A_ha)` fitted on MFCG's size sweep over `2 + round(0.9 √(A/10))`, because it reproduces MFCG's 5 / 8 / 12 / 18 gates and the old law gives 4 / 6 / 9 / 12 (`docs/validation/bench/fixall_pipeline_mfcg_fits.out`). **J-P25** chose an open waterfront as the default over a sea wall, because MFCG's coastal wall stops at the water and FTG's captured wall is an open chain (§2.7). | all listed |
| S-h | §14 | Mirror §2.6's `BuildingGenerator` split (`outline` / `compose`); `GranularityLaw.bands` returns a vacancy-run share in place of `alleyPolicy` (deep-interior treatment is S8's band-share rule, §4.6); `Household.members` is a size and people are addressed by their key (§2.7); §4.12's `StageDecl` with declared I/O, `NetworkStrategy.grow(…, enceintes, …)`, `EnceinteStrategy`, and the registries for `enceinte`, `evolution` (§4.11), `sky` and `sewer` (II.6); package layout: `@plat/layout` gains S3 reservations, S5a–S5d, S7b claims, S12a / S12b; `@plat/content` gains S7b / S10a allocation and the relation schema; `@plat/plots` gains per-frontage regions, boundary treatments, footprint templates and the axis-locked composer. | SCL-13, COV-VG-VN-002, COV-VG-VN-003, MN-4, DEF-8, DEF-7 |
| S-i | §0.4 | Update the amendment landings: AM-1 → §4.9 (clause map), AM-2 → §2.7 and II.6, AM-3 → §2.6 (ground datum, every carrier), AM-6 → §4.5 (clause map). | AM-1, AM-2, AM-3, AM-6 |
| S-j | §12 ladder | State the base's population floor as the village ceiling of PART III (≈ 1 500): a request from ≈ 1 500 up is a base TOWN whose size follows its population (COV-VG-VN-088's other half). | COV-VG-WC4, DEF-15 |

## 4. Evidence status

**CONFIRMED** (executed or read at source in this lane): the drift distribution of the chosen heading model (600 m net
turn p50 20.8°, p90 49.5°, 0.1 % beyond 90°; per-step p95 11.35°, p99 14.90° at 20° per 100 m, ℓ = 90 m, L_r = 250 m) and
the two MFCG fits (gate law reproducing 5 / 8 / 12 / 18 gates; quarter law 1.37 · B^0.267), both re-run from
`docs/validation/bench/` to identical output; every reference number quoted as an anchor (MFCG's walled share 0.87–0.92,
lot cover 0.60–0.65, plaza 0.32–0.58 ha, castles 1.26–3.36 ha; NG's AN-2 position law, PF-2 fillet ratio, BG-1 width law and
fillet share; FTG's anisotropy ratios and captured open wall; the VG palisade order) is read from its cited file.
**PLAUSIBLE** (this lane's judgment until M-1, M0 and the harnesses measure them): every mechanism and every new constant in
the blocks above — stage shares, anisotropy ratios, separation floors, interior shares, vacancy shares, setbacks, plinth and
skirt limits, the island and sewer hooks — each marked calibratable and each with its first measurement named.


## Fable review (2026-09-27) — A-fixall/draft-pipeline-r1

**Verdict: CORRECTED** (the dispositions stand; the record is corrected on four points). Reviewed by Fable (lane
fable-review/main/pipeline, `docs/fable-review/main/pipeline.md`) on the live design (`docs/ARCHITECTURE.md` sha256
1c23190f…): all 128 dispositions hold — 115 FIXED with their mechanisms present in the live text as rounds 2–5 and the hand
fix refined them, 13 STAGED-BY-OWNER on the roadmap's subjects with their hooks present, 0 INVALID rightly. The two
receipts were re-run byte-identical (`fixall_pipeline_mfcg_fits.py`, `fixall_pipeline_ou_heading.py`). Four mechanisms
this file states were superseded by later rulings, and the live text follows the later ruling:
1. SCL-4 (row 24) and Part 3 R-d: "the METROPOLIS-only preview … replaced exactly once" — superseded by rendering's J-R7:
   no rung shows a preview; the first-map times and their knees are §12.5's (live §4.1).
2. DEF-16 (row 127) and Part 3 S-g's J-P10 ("one worker first … switched by M2's measurement") — superseded by the live
   J-P10 (Part A of the rationale): the derivation pool is the primary configuration at each size where M1 (TOWN, CITY)
   or M2b (METROPOLIS) measures it within its law + 10 % with identical digests for pool sizes 0–3; the single worker is
   the pre-decided fallback elsewhere (live §4.1, §12.3).
3. COV-FTG-F20 (row 94): "Material table by district kind × class × band × era" — superseded by owner item 19: no default
   `MaterialRow` keys a material by wealth; the band key exists only in the optional regional-shift rows, off by default
   (live §2.6).
4. MFP-4 (row 30): "N = 0 sealed without a postern" — refined by rounds 3–4: `N = 0` produces no main gate, but a harbour
   outside the stage-1 region still gets the harbour gate of §4.2 S3 (7), not counted in N (J-P35, J-P45).
One illustrative figure the round-1 §4.5 block carried is off by one and survives in the live text: "≈ 13 ha at 250 ha,
≈ 21 ha at 600 ha" reads ≈ 14 and ≈ 22 under the stated law (N_d 18 and 27); the exact substitution is routed to pass c's
§4.5 editor by the review's design impacts (J-Fpipe-1).
