# Fix-all round 1 — PIPELINE area verification (fixall/verify-pipeline-r1)

> PENDING FABLE REVIEW — Opus-produced (fixall/verify-pipeline-r1), not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md.

Status: COMPLETE (2026-09-25). Verifier seat for the PIPELINE area after integration round 1.

## 0. In plain words

The pipeline area had 128 items to fix. I read the integrated `docs/ARCHITECTURE.md` from end to end, with the pipeline
sections (§2.5–§2.7, §4, §10, PART II, PART III) read line by line. I checked each item against its original finding.
**All 128 are accepted.** 115 are FIXED: the text now contains a concrete mechanism that defeats the failure the finding
described. 13 are STAGED BY THE OWNER, with concrete hooks, and every one of those 13 is on the owner's roadmap list.
No item was marked INVALID, and none is unresolved.

Putting the fixes together created **14 new problems**. Six are major:

1. The first wall's gates are pinned where the old boundary ran, not where the recomputed boundary runs.
2. Row houses cut to their plot cannot be stored as the rectangular wings the roof fix requires.
3. Per-district greenery plants trees and orchards outside its own district, so the result depends on the order districts are built.
4. Moats and canals are dug before roads, but no bridge crossing is defined for them, so roads cannot reach the gates or the castle.
5. The wall band is built before the lanes, and the lane cutter ignores it.
6. Lanes that now end on a boundary street change the neighbouring district, which contradicts "rerolling one district leaves the others untouched".

The other eight are minor: contradictions between sections, stale pointers, and missing edge cases. No deferral wording
remains in the pipeline sections. The only "later" subjects are the owner's roadmap stages.

## 1. Scope and method

* **Read in full:** `docs/ARCHITECTURE.md` (6 350 lines). §2.5–§2.7, §4.1–§4.12, §10, PART II, PART III, the delegated
  decisions, the judgment calls and the staged list were read line by line. §2.1–§2.4, §3, §5–§9, §11–§17 and Appendix A
  were read for cross-references and for conflicts with the pipeline text. Also read: the round-1 disposition rows of
  `docs/ARCHITECTURE-VALIDATION.md` §R1.1, §0.M, `docs/validation/fix-all/r1-integration-log.md` §2–§3, the section map of
  `docs/validation/fix-all/r1-pipeline.md`, and the executed receipts `docs/validation/bench/fixall_pipeline_{mfcg_fits,ou_heading}.out`.
  Each item's failure scenario and required change came from `docs/validation/fix-all/index.json`, which quotes the
  source finding.
* **Acceptance rule:**
  * **FIXED** is accepted only when the architecture now contains a concrete mechanism that defeats the item's failure
    scenario. The quote in the table is that mechanism.
  * **STAGED-BY-OWNER** is accepted only when the subject is on the owner's roadmap list and the hooks are concrete
    interfaces or records.
  * Deferral wording counts as UNRESOLVED.
* **Two index errors, noted and not held against the fix:** the `required_change` of COV-FTG-C05 and COV-FTG-C07 is
  mis-copied from other rows (a slope term, and a waterfront row). Both were judged against their claims, as the
  pipeline draft did.
* **Evidence status:** every verdict below is PLAUSIBLE. It rests on reading the text against the finding; the design
  itself is unexecuted. The one executed check is the arithmetic of NF-P9, which re-reads the pipeline lane's own receipt
  `fixall_pipeline_mfcg_fits.out`.

## 2. Verdict table

In the table, "disp." means the round-1 disposition. F = FIXED; S = STAGED-BY-OWNER. "NF-Pn" points to a new finding in
§3 that the fix interacts with. An NF note never changes the item's own verdict.

| id | disp. | verdict | quoted evidence (ARCHITECTURE.md) | required change |
|---|---|---|---|---|
| GEO-13 | F | ACCEPTED | §4.2 S1 (2): "the normal displacement at every sample is clamped to 0.8 × the local feature size"; loops "typed by rule"; "10 000 outlines per intent → 0 self-intersections, 0 untyped loops"; §5.2 F-OUTLINE | — |
| GEO-14 | F | ACCEPTED | §4.2 S1 (2): "the vector coast is authoritative … contour lines … clipped to the land faces in vector space before emission"; steep-coast fixtures; §5.2 F-CONTOUR "never an abort path" | — |
| GEO-16 | F | ACCEPTED | §4.3: "the arterial graph is the union of the lattice edges they use … each chain is then simplified … once … and inserted into L1 once"; test "no two spines run closer than their class separation" | — |
| GEO-17 | F | ACCEPTED | §4.2 S1 (5): "emitted as a pinned deck: a bank-to-bank segment perpendicular to the local flow"; §4.3: "A deck is a fixed edge of the graph … F-ROUTE rung moves the crossing site along its reach" | — (moat and canal crossings: NF-P4) |
| GEO-18 | F | ACCEPTED | §4.4 S5a: "the trace is fixed now, before the stage's secondaries grow … topology-preserving Visvalingam"; S5c: "a proposal reaching the setback band stops there"; §5.2 F-WALL last rung | — (stage-1 gate pinning: NF-P1) |
| GEO-19 | F | ACCEPTED | §4.2 S3 (3): water reservations "carved into L0 here, before S4, and seen as water by every later stage"; §4.8: later carves "go through the conversion path of §4.11" | — (crossings: NF-P4; the edit path's way rule: NF-P14) |
| GEO-21 | F | ACCEPTED | §4.6 step 7: "Each junction end is extended along its arrival direction from the kerb to the crossed spine and inserted there as a T-junction (`splitThrough`)"; §8.2: lane ends square at the kerb (renderer) | — (side effect on neighbouring districts: NF-P6) |
| GEO-22 | F | ACCEPTED | §4.6 Sides: "maximal boundary chains whose cumulative turning stays within 10° … against the run's chord, or … the tangent over a ± 5 m window"; step 3 defines start and far sides "for any face shape"; M0 (b) curved, C-shaped and holed faces | — |
| GEO-23 | F | ACCEPTED | §4.6 step 8: "reflex pre-cut … (c) the always-succeeding cut … (d) substitution … only for faces ≤ 2 × the band's upper block area"; court or green residue reported, "soft bound ≤ 5 %" | — |
| GEO-24 | F | ACCEPTED | §4.7 S10 (4): "partitioned into one region per frontage run by its straight skeleton … a reflex pre-cut partition … is used instead"; "0 overlapping or self-intersecting plots before any fallback" | — |
| GEO-25 | F | ACCEPTED | §4.6: "Lanes and alleys chosen here are inserted as L1 spines in S8's own district batch, so S10 never writes L1"; §4.7 S10 (9) | — (a stray alternative clause in §4.1: NF-P7) |
| GEO-26 | F | ACCEPTED | §4.7 S11 row: "footprint = plot ∩ the frontage band of the row depth (a boolean intersection) … one shared edge even on bent or curved frontages"; §4.1 "S11 one per block"; §13.2 curved-street property test | — (conflict with the wing storage of VIS-10: NF-P2) |
| GEO-27 | F | ACCEPTED | §4.11: "a growth proposal may not cross a face holding footprints unless it runs along plot boundaries or back lanes … or a declared `demolish` conversion is chosen"; re-cut through the conversion path; M4 test | — |
| GEO-30 | F | ACCEPTED | II.1 rule (3): "a T-junction inserted with `splitThrough` at level 1 … recorded as a `SeamAmendment` and a new portal in both districts' contracts; the neighbour re-derives only its corridor half-strip and junction wedge"; `SeamReport.addedPortals` | — |
| GEO-36 | F | ACCEPTED | §4.2 S1 (3): "knot offsets are clamped to half the control spacing … carving is capped at `carveMaxCm` … re-routed by the F-RIVER rung"; (4): an island is built "only if the branch's separation … ≥ (w_main + w_branch)/2 + the minimum islet width" | — |
| GEO-37 | F | ACCEPTED | §4.4 S5c legality: "the same clearance applies to shores, wall setback bands, reservations and the stage boundary" | — |
| GEO-38 | F | ACCEPTED | §4.8: "two L3 half-bands, one under the L1 face on each side of the wall edge, built by `bandUnion`"; §4.11 wallToWay clearance: "plots meeting the new corridor are clipped … footprints that no longer fit are demolished with lifecycle events" | — (build order against S8 and S9: NF-P5) |
| GEO-42 | F | ACCEPTED | §4.6 step 10: continuation allowed "only inside its own district: never across a district-boundary edge"; J-P11 | — |
| LC-2 | F | ACCEPTED | §4.1: "A stage may run lazily for a scope X … only if its output for X is a pure function of eager upstream state and X's own sub-streams"; eager S7b and S10a allocations; two declared field passes; "The F-CUT substitution rung reads the district's allocation"; §6.5 derived-complete digest over three district orders | — (S12b breaks the contract: NF-P3) |
| LC-6 | F | ACCEPTED | §4.5 Bands: cut points "computed once per town … recorded … A block keeps its recorded band unless its value crosses a cut point by more than the hysteresis"; Brush: "a relative raster Δ … τ = 0.01 … replay applies the same τ; strokes … survive epochs as Δ" | — |
| LC-12 | F | ACCEPTED | §4.11 Survivors: "keep their built state … only through explicit, rate-limited transformation events … 'Regenerate (keep settings)' on an untouched block reproduces it byte for byte"; §2.8 `DerivationRecord` | — |
| LC-16 | F | ACCEPTED | §10.3: "Pinning is an explicit edit, never a view"; person key "(household address, member ordinal, birth epoch)"; people age by epoch; §7.4 people row; §13.2 "opening a person leaves the digest, the log and the undo stack unchanged" | — |
| LC-18 | F | ACCEPTED | II.4: "A `refine` close-up is derived data … The first edit inside a close-up is preceded by a logged `closeup` event"; "A `replace` close-up … is a model edit"; §7.4 closeup row | — |
| SCL-4 | F | ACCEPTED | §4.1: "The one-click first paint is the complete city LOD … Laziness is restricted to what the city band does not draw"; §8.5 first paint; the pool merge protocol is written in §4.1 | — |
| SCL-13 | S→F | ACCEPTED | §2.6: `outline()` "≤ 10 µs per building median"; `compose()` lazy per visible tile; "Contract test: the union of the composed wings equals the outline's union exactly"; intake measurement and fallback | — |
| VIS-8 | F | ACCEPTED | §2.5 `PlotBound`; §4.7 S11 treatment column; drawn "at district LOD … never filled … walled or fenced frontage counts toward O17 (d)"; exported to VTT and GeoJSON (§11.1) | — |
| VIS-10 | F | ACCEPTED | §2.6: "Every footprint is stored as rectangular wings … The roof construction … is a style-sheet parameter over the stored wings"; §8.1 cache key includes the construction; §8.6 two-tone by face normal | — (row footprints: NF-P2) |
| MFP-2 | F | ACCEPTED | §4.4 S5c: "In walled regimes S5c grows only the arterial-connecting secondary network at district scale … separation floor 120 / 160 / 200 m … every lane … from S8's recursive bent cut"; §1.4 row corrected; §13.5 MFCG-signature row; §16 M0 (c) | — |
| MFP-3 | F | ACCEPTED | §4.2 S3 (3): reservations "enter L1 as barrier faces: no way crosses them"; §4.4 S5a: castle "welded through its two claim vertices"; §4.8: compactness "repaired in place first"; acceptance ≥ 99 % | — (castle-moat crossing: NF-P4) |
| MFP-4 | F | ACCEPTED | §4.2 S3 (4): "sequential nested picks … `N = 0` produces no gate and no external arterial"; §4.3: "roads leaving the walled stage = N exactly and each gate carries one road out and one street in" | — |
| MFP-6 | F | ACCEPTED | §4.2 S2: "TOWN 2 stages — walled core 0.90 … the FTG cul-de-sac suburb regime is added only by the era or form preset or by the shanty toggle"; §13.5 walled-share and ribbon row | — |
| MFP-7 | F | ACCEPTED | §4.7 S10b: "craft and shop rows default to `liveIn`; a live-in household is sited first at its workplace"; §2.5 feature-named kinds; §13.7 block-level use-mix bands | — |
| MFP-9 | F | ACCEPTED | §2.7: "`setbackCm.inner` and `setbackCm.outer` are both unbuildable … hard (§5.3), and ribbon plots start beyond the outer setback"; §5.3 row | — |
| MFP-10 | F | ACCEPTED | §4.5: "`N_d = round(3.5 · √(A_ha / 10))` … the band is derived from it — `[0.5, 1.5] × A / N_d`"; quarters "`N_q = round(1.37 · B^0.267)`" as the city-band label unit | — (N_q > N_d at TOWN: NF-P9) |
| MFP-11 | F | ACCEPTED | §4.9: "`on`: the park row fires in every band at a floor rate … `off`: parks and park districts are not generated … The resolved mapping is written to the report"; castle esplanade row | — |
| FTG-1 | F (dup of LC-2) | ACCEPTED | §4.5 S7b: "Everything that decides the town's content is decided here, once, for the whole town"; §6.5 "the districts of 50 METROPOLIS seeds derived in three random orders" | — |
| FTG-2 | F | ACCEPTED | §4.2 S2: "Stage demand is plot counts per class × band … `plotShare` … dense core 0.62"; §4.5 cut points from roster shares; §4.4 S5d "one top-up"; §13.2 `wealthLevel` sweep | — |
| FTG-3 | F (dup of MFP-3) | ACCEPTED | §4.5 S7b (3): "Every item larger than one block … cut out of the district's coarse faces with `claimSubFace` … S8 cuts around it as a hole … S12b builds parks only on reserved faces or residue. Test: 100 %" | — |
| FTG-4 | F | ACCEPTED | §4.4 S5b: "S5b spawns `N_k − c` radial destinations … the crossings become stage k's main gates"; §4.11 `grow()` runs "S5b the main-road step" | — |
| FTG-5 | F | ACCEPTED | §4.4 S5a: "a level set of network travel cost … anisotropy ratio `a = ρ_off / ρ_road` … B-REF … requires both to be monotone in `a`"; §13.5 outline-anisotropy row | — |
| FTG-6 | F | ACCEPTED | §4.4 S5c: heading models `ou` / `radiusHold` / `gridLock`; "Crossings follow the preset's crossing matrix"; destination bias "off for … ring proposals"; ringed fixture | — |
| FTG-7 | F | ACCEPTED | §4.9: S12a "runs after S7b, before S10b"; "One farm table"; count-driven outside plots; S10b places outside classes on them; test "100 % of outside-class buildings on outside plots with occupants" | — |
| FTG-8 | F | ACCEPTED | §2.7 `Enceinte.closure: 'shore'`, the `waterfront` row, `placement: 'aroundStage'`; §4.4 S5a: open chain anchored on the shore; §5.3 "every quay reachable from the town without crossing a wall except at a gate" | — |
| FTG-9 | F | ACCEPTED | §2.7 relation-store schema; §10.1 content locality contract; §10.3 storage restated ("≈ 1.8 MB raw for 50 000 people"); §7.3 (iii) content and relation hashes | — |
| FTG-10 | F (dup of LC-16) | ACCEPTED | §2.7: "'locked in' on manual edit, never on view"; `Household.tableVersion`; §10.3 "a diffed 're-derive people' action" | — |
| FTG-11 | F | ACCEPTED | §2.6 `SubLocation` with capacities; §10.3: occupancy "resolves the whole population in person-key order in two passes … cached per (day type, hour) … ≤ 50 ms"; §13.2 cost test | — |
| FTG-13 | F | ACCEPTED | §2.6: "`baseCm = max(samples) + plinthCm` … a foundation skirt … split along the contour into stepped wings"; §8.4 casters from `baseCm`; §11.1 glTF from `baseCm` | — |
| FTG-14 | F | ACCEPTED | §10.2: "A virtual population advances on a fixed grid of Δ = 10 … keyed by the building's ordinal … manifest(P₂) ⊇ manifest(P₁) … (property test on 1 000 seeds)" | — |
| FTG-17 | F | ACCEPTED | §4.4 S5c: the `ou` formula with correlation length and goal reversion; "`headingSigma` stated in degrees per 100 m"; executed drift "p50 21°, … 0.1 % beyond 90°" | — |
| FTG-18 | F | ACCEPTED | §4.4: "trim only S5-grown provisional spines that run beyond the boundary … S4 and S5b arterials are never trimmed"; §2.4 `Way.provisional` | — |
| FTG-19 | F | ACCEPTED | §4.2 S3 (5): "external destinations are shore points — the harbour, one landing per requested bearing … and a ferry point"; §15.2 O4 (g) counts landings | — |
| FTG-20 | F | ACCEPTED | §4.4 suburb row: "an optional perimeter lane … seeds offshoots at a 60–90 m spacing row besides the arterial seeds" | — |
| IMP-8 | F | ACCEPTED | §4.6 deep-interior rule: court, back lane, through-alley and rear-plot shares per band, decided "now, in S8"; §13.5 "deep block interiors" row | — |
| IMP-9 | F | ACCEPTED | §4.2 S1 (3): "`mouth: 'delta'` splits the course … into 2–4 distributaries"; S3 (1): polycentric k = 2–3 nuclei with their own enceintes; §7.7 forms include `linear-street` and `island-city`; §15.2 O1 (c), O8 (f), O10 (g) restated | — (polycentric boundary split: NF-P10) |
| COV-MFCG-A03 | F | ACCEPTED | §4.2 S0: a per-rung feature table "drawn once from its own concern `blueprint.features`"; §6.1 registry lists `blueprint.features`; auto values reported | — |
| COV-MFCG-C05 | F | ACCEPTED | §4.6 step 1: "the working major axis is the OBB major axis rotated toward the contour direction by the weight `min(0.5, slope / 0.3)`" | — |
| COV-MFCG-C07 | F (dup of FTG-8) | ACCEPTED | §2.7 / §4.4 S5a: the `waterfront` row, open by default; F-WALL reads it (§5.2) | — |
| COV-MFCG-E04 | F | ACCEPTED | §4.2 S3 (4)–(5): each gate carries "the least-cost outward direction from the gate to the frame"; "an unwalled town derives its bearings by the same law" | — |
| COV-MFCG-G03 | F | ACCEPTED | §4.6 Partition recipes: `fan`, `semiFan`, `ring`; §3.4 `radialSplit`, `ringBand`; used by §4.9 park layout and cloister templates | — |
| COV-MFCG-G05 | F | ACCEPTED | §2.6: "The axis-locked composer … U, H, comb, cross and ring footprints emerge" | — |
| COV-MFCG-I01 | F | ACCEPTED | §4.7 furniture pins: "The main plaza always gets one centrepiece — statue 0.6, fountain 0.3, market cross 0.1 … offset toward the plaza's longest edge" | — |
| COV-MFCG-I03 | F | ACCEPTED | §4.9: "a radial `fan` of groves … when its compactness is ≥ 0.7, otherwise a `semiFan` … plus a perimeter path" | — |
| COV-MFCG-Q01 | F | ACCEPTED | §4.2 S0: "What the base supports, stated … 0–2 castles … polycentric … multi-line labels" | — |
| COV-VG-VN-170 | F | ACCEPTED | §4.7 S10 (8): "runs of frontage totalling the band's vacancy share … typed `vacant`, or a `garden` yard"; §13.5 vacancy row | — |
| COV-VG-VN-179 | S | ACCEPTED | II.2: "`mode: 'void'` … carves nothing — the plots whose frontages face a chosen open area are left unbuilt" (stage 2 is on the roadmap) | — |
| COV-NG-N06 | S | ACCEPTED | II.1 rule (5) and §4.2 S1 (2): outline template rows (disc, D-shape, lozenge, crescent, spindle); `NeighbourhoodRequest.outlineTemplate` | — |
| COV-NG-N12 | S | ACCEPTED | II.2 `RingFabric`: rings are "the template's only seed geometry — no template radials … outside-in … first cut is a slit … staggered band to band" | — (stale §15.1 row: NF-P11) |
| COV-NG-N18 | F (dup of MN-3) | ACCEPTED | §4.6 step 2: "`f ~ N(0.5, σ)` … σ = 0.066 … 0.098 … outlier term … no clamp"; step 4 fallback chain instead of OPEN; §16 M0 (b) distributional | — |
| COV-NG-N19 | F | ACCEPTED | §4.6 step 6: "tangent length is `r_t` × the shorter leg, `r_t ~ N(0.73, 0.10)` clipped to [0.54, 0.87]" | — |
| COV-NG-N20 | F | ACCEPTED | §4.6 step 9: "`w = a_district + b · (L + e · n_free)`"; II.2: "ring roads and template streets take fixed per-district widths" | — |
| COV-NG-N27 | F (dup of VIS-8) | ACCEPTED | §4.7 S11 compound row "enclosure wall … with a gate on the access edge"; II.3 draws it from `PlotBound` | — |
| COV-NG-XA07 | S | ACCEPTED | II.3: the dispatch table reads "spacing to the nearest landmark or manor block"; "a minimum landmark spacing row" | — |
| COV-NG-XB23 | F (dup of J02) | ACCEPTED | §2.7 `Pin.kind` includes `statue` and `monument`; II.2: a "centrepiece pin … at the square's nexus" | — |
| COV-NG-VS27 | F | ACCEPTED | §2.7 `LandUse.crop / livestock / rotation`; §4.9: "Every field face takes `crop` and `livestock` from the era / region crop table"; §8.2 texture variants | — |
| COV-NG-CR23 | F (dup of J02) | ACCEPTED | §2.7 `Pin.kind` includes `statue` and `bandstand`; §4.7 per-block weighted decoration row | — |
| COV-FTG-B06 | F | ACCEPTED | §10.2: "`rosterMode: 'minimiseUnemployment'` … or `'matchRatios'` … Both are grid-sequential" | — |
| COV-FTG-B09 | F (dup of FTG-7) | ACCEPTED | §4.2 S1 (10) `SiteResources`; S2 resource gates; §4.9 S12a sites outside classes on the resources | — |
| COV-FTG-B11 | F | ACCEPTED | §10.3 Work: "after an edit only the postings of changed workplaces and the unemployed pool are re-matched … unfilled postings are tracked and reported" | — |
| COV-FTG-B12 | F | ACCEPTED | §2.7 `Faction` (goals, roles with criteria, secret); §10.3: "role headcounts are reconciled with the seat building's working capacity" | — |
| COV-FTG-B13 | F | ACCEPTED | §2.7 `Government`; §10.2: "offices force seats … plus a military share"; S0 circumstance | — |
| COV-FTG-B14 | F | ACCEPTED | §2.7 `Religion` (deities, practice share, clergy rate); §10.2: "temples per religion are proportional to its practising worshippers" | — |
| COV-FTG-C01 | F | ACCEPTED | §10.3: "`AncestryRow { … lifeStages, maxAge, heightCmBand, nameGrammar … }` and a partnering matrix … are data" | — |
| COV-FTG-C02 | F | ACCEPTED | §10.3 Appearance: "weighted option tables … line templates … conditional lines … fallback lines and article agreement" | — |
| COV-FTG-C04 | F (dup of FTG-9) | ACCEPTED | §2.7 `FamilyUnit`, `Relation` (partner … rival, business, religious, affair) | — |
| COV-FTG-C05 | F | ACCEPTED | §10.3 Events: "`EventTemplate { … preconditions … weight, effects: EditEvent[] }` … starting one applies its effects as logged, undoable edit events" (the index's required change is mis-copied) | — |
| COV-FTG-C07 | F (dup of FTG-11) | ACCEPTED | §2.6 `SubLocation { … tags … capacities … }` "from the class table" (the index's required change is mis-copied) | — |
| COV-FTG-C08 | F | ACCEPTED | §2.7 `Person.status`, `carer`; §10.3: "the household … supplies the next carer by rule"; §5.3: "a dependent's carer resolves" | — |
| COV-FTG-D26 | F (dup of FTG-5) | ACCEPTED | §4.4 S5a: "`a` is also the control over the wide-versus-elongated balance of ribbons and suburbs" | — |
| COV-FTG-E02 | F | ACCEPTED | §4.5 S7b (2) `SubDistrict`; §4.7 S10a: "sub-districts receiving contiguous block groups sized to their clusters" | — |
| COV-FTG-E07 | F | ACCEPTED | §4.7 S11 tents row "with a fire-pit pin, dirt surface"; §8.2 `tent` and `fire pit` symbols | — |
| COV-FTG-E10 | F | ACCEPTED | §2.5 `District.description`; §4.10 S13a "writes each district's one-line description"; §10.4 | — |
| COV-FTG-F09 | F | ACCEPTED | §2.5 `buildingScale: number /* 0.5–2 */`; §4.7 S11 Scale | — |
| COV-FTG-F16 | F (dup of G05) | ACCEPTED | §2.6 Footprint templates: "data rows of normalised shapes fitted to the claim — cruciform church … octagon, n-gon … star temples" | — |
| COV-FTG-F20 | F | ACCEPTED | §2.6 `MaterialRow` keyed by "district kind × class × prosperity band × era"; `materialOverride`, `setAttr`; §2.7 `Enceinte.material` | — |
| COV-FTG-F21 | F | ACCEPTED | §2.6 `description?`, `openingHours?`; "A building's description is generated by the naming engine" | — |
| COV-FTG-F23 | F (dup of VIS-8) | ACCEPTED | §2.5 `PlotBound.treatment: 'none'|'fence'|'hedge'|'wall'|'railing'` | — |
| COV-FTG-G07 | F | ACCEPTED | §4.8: "An intervallum lane along the inside of the wall is an era row" | — (its L1 write in S7: NF-P7) |
| COV-FTG-G09 | F | ACCEPTED | §4.8: "A castle template table places: the gatehouse … the keep … an optional inner ward … internal paths … and a surround row" | — |
| COV-FTG-G10 | F | ACCEPTED | §2.7 `Castle.keepShape` includes `octagon`, `cruciform`; `Tower.kind` includes `octagonal`; `innerWard` | — |
| COV-FTG-H04 | F | ACCEPTED | §4.2 S1 (2) Arms: "each arm with its own shape row … and its own detail row" | — |
| COV-FTG-H06 | F | ACCEPTED | §4.2 S1 (7): each shore segment "classed `bay`, `headland` or `straight` … bank kind … drawn from a per-class weight table" | — |
| COV-FTG-H07 | F | ACCEPTED | §4.2 S1 (8): "a table `shoreSetback` per bank kind … read by S10 and S12a" | — |
| COV-FTG-H11 | F (dup of IMP-9) | ACCEPTED | §4.2 S1 (3): distributaries "traced by descent to the sea without rejoining" | — |
| COV-FTG-H17 | F | ACCEPTED | §4.8 Harbour: "a harbour-wall row — shape … and type … piers … straight or branching, on the harbour and on the open coast … timber or stone" | — |
| COV-FTG-I03 | F | ACCEPTED | §4.9: sites seeded by score "with a clustering term … divided into exactly that many lots by a weighted Voronoi" | — |
| COV-FTG-I09 | F | ACCEPTED | §4.9 rows: street trees, ambient scatter and shoreline band | — (avenue side effect: NF-P3) |
| COV-FTG-I11 | F | ACCEPTED | §2.7 `Greenery.species` with inner and outer shares; §4.9 climate table | — |
| COV-FTG-I12 | F | ACCEPTED | §4.9 Hinterland decorations: "rows `{kind, count by rung and biome, placement score, trail …, keepClearCm}`" | — (pond timing: NF-P7) |
| COV-FTG-I15 | F | ACCEPTED | §4.9: "A `ClimateTable` row per biome … sets the ground-cover role, the tree-species mix … field system … roof form" | — |
| COV-FTG-J02 | F | ACCEPTED | §4.7 furniture pins: "every block draws one weighted decoration row from a deck … singletons … bandstand, statue, monument"; §2.7 kinds including `campfire` | — |
| COV-FTG-J05 | F | ACCEPTED | §4.7: "market stalls line the market square's edge band and ring a market hall … one per ≈ 150 m² … (≤ 40)"; §8.2 `stall` symbol | — |
| COV-FTG-L06 | F | ACCEPTED | §10.4: "Every `AncestryRow` and culture row names its own grammar and corpora … a user-uploaded list … becomes a `user` corpus" | — |
| COV-VG-VN-002 | S | ACCEPTED | §4.1: "The graph is built from declared I/O … topologically sorted"; §4.12 `StageDecl`; PART III item 1 (the village is on the roadmap) | — |
| COV-VG-VN-003 | S (dup of MN-4) | ACCEPTED | §4.12 `NetworkStrategy.grow(…, enceintes: Enceinte[] …)` and `EnceinteStrategy`; PART III item 2 | — |
| COV-VG-WC2 | F | ACCEPTED | §4.2 S1 (3): "VG's live course is a different one, a terrain-independent spline through 6–7 control points"; PART III and §15.1 G3–G5 corrected | — |
| COV-VG-WC4 | S | ACCEPTED | §1.6 and PART III item 4: "a village is modelled as one district of kind `village`" | — |
| AM-1 | F | ACCEPTED | §4.9 S12b rule table, band rows interpolated along prosperity; "The owner rule, clause by clause (AM-1)" maps every clause to a row | — (cross-district rows: NF-P3) |
| AM-2 | S | ACCEPTED | §2.7 `SkyIsland { reason: 'prosperity'|'institution'; terrainEcho; placement … }`; II.6 `IslandRule`, `SkyStrategy`; "no relation to the underground layer"; per-layer export (islands are on the roadmap) | — (allocation hook ordering: NF-P13) |
| AM-3 | F | ACCEPTED | §2.6 heights and `baseCm` on every building, wing, tower, wall run, gate and bridge; §8.4 shadow hook, "≤ 20 % of a tile's raster time", `drop`-mode fallback | — |
| AM-6 | F | ACCEPTED | §4.5: "The owner rule, clause by clause (AM-6)" covers the continuous field, driver table, ε share, `FieldBands`, interpolation, epochs and the brush | — |
| MN-3 | F | ACCEPTED | §4.6 recipe steps 2–9: f on the major axis, coin side, perpendicular departure, R1 far side, corner at mid-course, 0.53 fillet, junction ends as the renderer's rule, the width law | — |
| MN-4 | S | ACCEPTED | PART III item 2: "The village registers an `EnceinteStrategy` that builds exactly that from its density stage … through the `enceintes` input" | — |
| DEF-7 | S | ACCEPTED | II.6: `IslandRule`, `SkyStrategy`, `SewerStrategy` with rule families and presets; §2.7 `SkyIsland`, `Tunnel`; the staged list | — |
| DEF-8 | S | ACCEPTED | §4.11: `EpochInputs`, `EvolutionStrategy`, `ConversionOp` including abandon, decay, ruin, robStone, plotToGarden, contractWall; the one growth path built | — |
| DEF-10 | F | ACCEPTED | §10.4: the `SettingPack` interface; "loaded as one layer of the override chain … recorded in the document by id and version … The base ships exactly one pack" | — |
| DEF-15 | S | ACCEPTED | PART III: five concrete hooks (declared-I/O stages, the enceinte input, the tracker network with houses along ways, one district, the ladder rows) | — |
| DEF-16 | F | ACCEPTED | §4.1: the pool is "decided now … Measurement: M1 … Pre-decided fallback: the single-worker configuration"; J-P10; §12.3 | — |
| DEF-17 | S | ACCEPTED | §2.6: the stage-3 hook with the `outline` / `compose` split, cost contract, intake measurement and fallback; the staged list (manor-style buildings are on the roadmap) | — |

The SCL-13 row reads "S→F": SCL-13 itself is FIXED, and it is the concrete hook that DEF-17's staged disposition relies on.

## 3. New findings introduced by round 1

### Major

| id | owner (also) | finding | failure scenario | required change |
|---|---|---|---|---|
| NF-P1 | pipeline (determinism) | S3's provisional stage-1 boundary is "run once here on the terrain alone". That is isotropic, with a = 1. S3 picks the stage-1 gate sites and the `on_enceinte` castle's weld vertices on it, and carves a requested city moat along it. S5a then recomputes the boundary on the travel-cost field with the road anisotropy (a = 1.3 walled core, 1.8 walled rings), and pins the stage-1 gates to S3's sites. With a > 1 the level set crosses each arterial beyond the old gate point. The cone half-angle is asin(1/a) ≈ 50°, so the road tip lies about 1.3 × the off-road radius, about 16 % beyond an equal-area circle. No rule reconciles the two boundaries. | For a TOWN walled core of about 58 ha (r ≈ 430 m), the trace must pass through gate points about 70 m inside the new contour. That is beyond the 40 m pull band, so every gate sits in an inward notch, or implementers diverge on the construction. The castle weld points and the S3 city moat may no longer lie on the wall at all. | Make S3's provisional boundary and S5a's boundary the same construction. Either (a) compute S3's field with provisional road corridors along each gate's straight bearing at the same `a`, or (b) let S5a slide each stage-1 gate along its S4 arterial chain to where the recomputed contour crosses it. Under (b), the gate's identity and both of its roads are unchanged. Re-weld the castle through the two reservation vertices nearest the new contour, and carve the city moat at S5a along the final trace, not at S3. Test: the trace's deviation from the level set at every gate is within the 40 m band. |
| NF-P2 | pipeline (rendering, kernel) | GEO-26 builds a row footprint as "plot ∩ the frontage band": a quadrilateral with bent or curved sides. VIS-10 and §2.6 store "every footprint … as rectangular wings". `BaseWing.rect` is "4 vertices, a rectangle", the footprint is "the wings' union", and the stage-3 contract test needs the union to equal the outline exactly. §4.7 also says "Footprints come from `BuildingGenerator.outline()`", while row footprints come from a boolean. The text speaks of "wings of kind `polygon`", but `BaseWing` has no `kind` field. | Every attached row house on a bent or curved frontage breaks one of three things. Its wing union is not its footprint, which breaks O17 (i) and the stage-3 contract. Or it is re-fitted as a rectangle, which breaks the shared party wall of GEO-26. Or the schema cannot store it. The dense bands are where 95–99 % of buildings are attached. | Extend `BaseWing` to `{ kind: 'rect'|'quad'|'polygon'; ring; ridgeAxis; … }`. A clipped row footprint is one `quad` wing whose ridge runs between the midpoints of its two frontage-perpendicular sides, and §3.8's exact OBB path applies when the quad is near-rectangular. State that S11's row arrangement produces its footprint by the boolean and hands the wings to `outline()` as fixed input. Restate §2.6's "every footprint is stored as rectangular wings" as "as wings". |
| NF-P3 | pipeline (determinism) | S12b is a per-district stage run in the derivation pool (§4.1, §12.3). Two of its rows write outside the district: avenues are tree rows "on both sides" of tier-1 ways, and edge greens place "an `orchard` … in the first hinterland ring". Tier-1 ways are normally district boundaries, because the grower's `validateEdge` excludes arterials of class ≥ primary. This breaks §4.1's laziness contract ("writes nothing outside X") and the pool's disjoint overlays. | A rich district and its modest neighbour share an arterial. Which avenue rows exist, and which district's orchard takes a piece of the hinterland ring, depends on which district is derived or committed first. Two viewers, or pool sizes 0 and 3, give different model digests: LC-2's failure returns. | Restrict each district's S12b to its own faces. A district plants avenue rows only in its own half-corridor strip, so a boundary way gets rows on one or both sides by each side's own rule. Allocate edge orchards as hinterland `Allocation` rows at S7b and build them in S12a. Add S12b to the derived-complete digest test explicitly. |
| NF-P4 | pipeline (kernel) | GEO-19 carves city moats, castle moats and canals into L0 at S3, before S4. §4.3 makes water "impassable except along a pinned crossing deck", but S1 (5) emits decks only at river crossing sites. §4.8 says S7 "adds their quays, banks and bridges", after S4 and S5 have already routed. | With a requested city moat, every gate's outward arterial must cross it: F-ROUTE marks the destinations `unserved`, and the gates are cut off. The castle street to the castle gate across its moat, and any arterial crossing a canal, fail the same way. | S3 emits pinned decks for its own carved water, in the same form as S1's decks: one at every gate site across a city moat, one at the castle gate across its moat, and canal crossings at a spacing row, each perpendicular to the channel. S4 and S5 route to them as fixed graph edges, and S7 builds the bridge furniture on them. |
| NF-P5 | pipeline (kernel) | Build order against levels. S7 commits the wall's L3 half-bands, the tower and gatehouse footprint parts and the L1 intervallum. After that, S8 inserts L1 lanes and S9 inserts L2 corridors in the same L1 faces. S8 plans cuts on `kerb(F)`, which subtracts only way buffers; the wall is not a spine, and only reservations are holes. So in a TOWN (no intervallum) cuts run through the inner band and end on the wall line. This order predates round 1, but GEO-38's re-specification kept it without resolving it. | An S8 batch that splits a face holding S7's L3 band either clears it (`clearFiner`, §2.2 rule 6), losing the band, or splits an L3 face with an L1 edge, violating nesting (§3.10). Either way the commit fails or the band is lost on every walled seed. | Make S8 treat the wall band ⊕ inner setback as a barrier. Its kerb subtracts it, and cuts end on the setback line, the way lanes end on a reservation or on the intervallum. Also move the band, tower and gatehouse geometry to a batch after S9, for example the first step of S10 per block. |
| NF-P6 | pipeline (determinism) | GEO-21 extends S8 cut ends "to the crossed spine … as a T-junction". When the crossed spine bounds the district, as arterials usually do, a district's S8 batch and every reroll of it add or remove vertices on the shared way's chain. That changes the way and corridor records and the neighbour's portals. II.4 and II.5 still promise "rerolling district D leaves every other district byte-identical … except the corridor and junction wedge at a seam amendment's vertex". Only close-up `SeamAmendment`s record such vertices in both contracts. | After a base reroll of district A, either B's `SeamContract.portals` goes stale, failing "every district carries a complete contract", or it is re-derived, which changes B's leaf digest. The shared way's chain digest also changes. The locality oracle (§7.3 item 7 ii) and II.5's reroll-isolation check then fail by construction, or they must silently exclude these changes. | Treat every S8 lane end on a district-boundary spine like II.1 rule (3): record it as a portal in both contracts (a `SeamAmendment` kind `baseLane`, or a regenerated contract field). Declare that a district's effective scope includes its bounding ways' chains, both corridor half-strips and the junction wedges at vertices its lanes create or remove. Restate II.4, II.5 and O2 (c)'s byte-identity with that exception, and have the oracle compute it. |

### Minor

| id | owner (also) | finding | required change |
|---|---|---|---|
| NF-P7 | pipeline (kernel) | §4.1's transaction list contradicts the stages. "S8 is the only stage after S5 that writes L1" is false: S7's intervallum, S7b's `claimSubFace` reservations and S12a's field faces all write L1. S7, S7b and S12a each write several levels (S12a writes L0 ponds, L1 fields and L3 lots) but are listed as one batch under "every transaction writes one level". The leftover clause "or inserted as a separate L1 transaction that re-runs `corridorUnion` and S10 for the affected L1 face only" has no trigger or bound; GEO-25 asked for a declared bound. S12a's decoration ponds "enter L0" after S4's arterials already cross the margin, with keep-clear only from fields and woods. That is GEO-19's water-after-roads class. | List every stage's batches per level: S7 (L1 intervallum, then L3 bands), S7b (L1 claims), S12a (L0 ponds, then L1 fields, then L3 lots). Delete the stray alternative, or give it a trigger (edits only) and a bound of one pass. Place decoration ponds at S1 or S3, or keep them clear of every way corridor. |
| NF-P8 | pipeline (rendering) | §12.4 runs S12a "concurrent with the pool (… hidden by the pool)", but §4.1's chart and the topological order run it before S8. The pool's merge assumes no other writer of the arena between building an overlay and committing it. | State S12a's position once. Either keep it before S8, adding its 12 ms to the CITY critical path (≈ 257 ms p50), or state the concurrency rule: hinterland faces disjoint from district faces, and committed before the pool builds its overlays. |
| NF-P9 | pipeline (rendering) | Quarters are "the state after `N_d − N_q` merges". The lane's own receipt `fixall_pipeline_mfcg_fits.out` gives N_q = 9.6 (rounded to 10) against N_d = 8.4 (rounded to 8) at 1 475 buildings, so at TOWN the merge count is negative. The text's "≈ 9 at TOWN" also disagrees with that receipt. | Set the city cut at `min(N_q, N_d)` nodes, correct the TOWN figure, and check §9.4's TOWN label count (min(12, N_d)) against MFCG's 9. |
| NF-P10 | pipeline | Polycentric forms (IMP-9) promise each nucleus "its own stage-1 boundary and enceinte", but S5a's field is one multi-source travel cost "from the centre(s)". At 400 m separation with about 29 ha per nucleus (r ≈ 300 m at TOWN), the level sets merge. No rule splits T per nucleus or handles touching enceintes. S3 reserves one main plaza, yet §4.3 routes between "each pair of adjacent nuclei's plazas". | Partition T by its nearest source nucleus, and make the separation band ≥ the sum of the two stage-1 radii plus both setbacks, with a merge into one enceinte and a cross wall as the reported fallback. Reserve one plaza per nucleus and apply the gate law per nucleus. |
| NF-P11 | scope | Stale §15.1 rows. NG B8 "`RingFabric` (II.2: concentric spines at a radius law + radials)" contradicts II.2's "no template radials" (COV-NG-N12). NG B1 points the outline templates to II.2; they live in II.1 rule (5) and §4.2 S1 (2). MFCG B6 says "compactness gate with re-siting" and omits the in-place repair of MFP-3. | Correct the three rows. |
| NF-P12 | rendering | §12.3 says the pool's results are "merged in id order (§4.1)", while §4.1 and §12.4's merge row say "district lineage order". Integration conflict C-7 records this as aligned. | Replace "id order" with "district lineage order" in §12.3. |
| NF-P13 | pipeline | AM-2 hook ordering. II.6 has S7b allocate "the roster's richest demand … to sky pseudo-districts", while `SkyStrategy`, which creates the islands, is "registered after S7b". S7b's capacity-per-band allocation has no sky capacity to read. | State that S7b creates the sky pseudo-districts' `Allocation` from `IslandRule.areaHaBand` and the band capacities at the plot share, before the islands exist, and that `SkyStrategy` consumes that allocation (declared I/O). |
| NF-P14 | pipeline | GEO-19's edit path: `carve` "cuts and reroutes the ways it meets by the same rules". The rules cited (wallToWay's clearance) govern plots, not ways, so the way rule is unstated: cut at the new shore, re-route by the incremental router, or add a deck. | Give `carve` a way rule. An arterial crossing the carve gets a pinned deck (as in NF-P4). A secondary or lane is cut at the new shore and its stub pruned, or re-routed by the local S5 operator when that would disconnect a plot's access. Record each case as lifecycle events. |

## 4. Deferral-language scan

I grepped the pipeline sections (§2.5–§2.7, §4, §10, PART II, PART III) for TBD, "to be decided", defer, postpone, later,
open, "at M0", "not yet", future, eventually, "if profiling", until, pending, placeholder, unspecified and unstated.
Every hit is one of three kinds:

* an owner-staged subject: the SHADOW stage (§2.6), the sewer rules (§2.7, II.6), the evolution engine (§4.11), the
  village product (PART III), setting-pack contents (§10.4, owner default D-6; the format is decided);
* an ordinary word: "open chain", "open waterfront", "open-field strips", "open coast";
* a lifecycle statement: "until the module materialises", "until a `closeup` event".

No item in the area is left to be decided. Every measurement-dependent choice carries a mechanism, a measurement and a
pre-decided fallback. Examples: the far-side rule (§4.6 step 4), the pool (§4.1), `plotShare` (§4.2 S2), the stage-3
intake (§2.6), the shadow budget (§8.4) and the per-rung modifiers (§1.1).

## 5. Summary counts

| measure | count |
|---|---|
| items checked | 128 |
| ACCEPTED as FIXED | 115 (15 of them duplicates in the index, each accepted with its primary; COV-NG-N27 and COV-NG-XB23, which the index flagged as stage-2 candidates, were fixed in the base) |
| ACCEPTED as STAGED-BY-OWNER (subject on the roadmap, hooks concrete) | 13 (one duplicate: COV-VG-VN-003 of MN-4) |
| INVALID claimed / accepted | 0 / 0 |
| UNRESOLVED | 0 |
| new findings | 14: 6 major (NF-P1–P6), 8 minor (NF-P7–P14). By owner: pipeline 12 (NF-P1–P10, P13, P14), scope 1 (NF-P11), rendering 1 (NF-P12). |
| deferral wording left in the pipeline sections | 0 |

## 6. What a Fable reviewer should re-check first

1. **NF-P5 and NF-P1.** Both are geometric or ordering arguments from the text alone. Confirm that no other paragraph
   already has S8 respecting the wall band or S5a sliding the gates.
2. **NF-P6.** Is a lane ending on a boundary way a change "outside the scope"? Settle this with the determinism owner,
   because it decides what the locality oracle compares.
3. **The 128 ACCEPTED verdicts.** Were any accepted on the strength of a test name rather than a mechanism? The most
   test-dependent are GEO-22 (M0 (b) fixtures), COV-NG-N18 (the fallback chain) and FTG-17 (a pipeline-lane receipt).

## Fable review (2026-09-27) — B-fixall/verify-pipeline-r1

**Verdict: CONFIRMED.** Reviewed by Fable (lane fable-review/main/pipeline, `docs/fable-review/main/pipeline.md`) on the live design (`docs/ARCHITECTURE.md` sha256 1c23190f…, 13 026 lines). The 128 ACCEPTED rest on mechanisms the live text still holds (GEO-22, COV-NG-N18 and FTG-17 re-read; the FTG-17 receipt re-run byte-identical); the 14 new findings were real — each was FIXED in round 2 and its fix stands in the live text; NF-P1's geometry and NF-P9's arithmetic re-derived. Two of the accepted mechanisms were later superseded by owner rules or other areas' rulings and the live text follows the later ruling (COV-FTG-F20's band-keyed materials → item 19; SCL-4's METROPOLIS preview → J-R7); neither changes the verdict. No correction.
