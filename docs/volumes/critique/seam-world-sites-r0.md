# Seam check: the world (V13) and world sites, encounters and the 2.5D view (V14) against each other, the base and the earlier volumes — round 0

> PENDING FABLE REVIEW — written by the session's seam seat volumes/seam-world-sites-r0 under the owner's delegation (J339); covered by the whole-design retrovalidation (J84).

PROGRESS
- §0 Method and inputs (files, md5, lines) | done
- §1 Seam census: every piece crossing V13 <-> V14 (and the base and earlier-volume sections they share), producer and consumer | done
- §2 Findings (SW-01 onward), severity, owner, required change | done
- §3 The ten questions of the brief, answered; disposition summary by owning unit | done

## 0 Method and inputs

Lane `volumes/seam-world-sites-r0`, 2026-10-17. Read whole, in order, nothing sampled: `docs/volumes/V13-world.md`
(2 861 lines, revision 1, md5 cfc173af…), `docs/volumes/V14-sites.md` (3 047 lines, revision 1, md5 268a96f0…), the
critiques' disposition tables (`docs/volumes/critique/V13.md` §6, md5 66e13f1c…; `critique/V14.md` §6–§7, md5
3e1978b9…), the owner rules `docs/AMENDMENTS-2026-10-16j.md` items 131–141 and its BCR-j table (md5 5e0f4ad9…), the
spine `scratchpad/v13v14/SPINE.md` (md5 26bcba5d…), `docs/volumes/INDEX.md` whole (202 lines, md5 5b6ec66d…) and the
brief's Part E bars and §9 order (`docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` §8–§9, md5 e6aad12b…).
Base sections (`docs/ARCHITECTURE.md`, md5 8929de0f…) read where a seam cites them, through the heading map: §2.1 (l. 550,
the `Layer` set), §2.6 (l. 1904, the basement water-table paragraph — which both volumes cite under two different
section numbers, SW-23), §2.9 (l. 3863, 3880: the view keys and `Recipe.product`), §3.2 (1) (the range invariant
|x|, |y| < 2²³ cm), §3.4 (l. 4953 `TransientKey`), §4.2 S1 (1) (l. 5902), §4.12 (l. 9687 `StageDecl.txForm`), §1.1 (l. 384
the `products` union), §6.1 (l. 10141, 10247), §6.3 (l. 10561), §7.1, §11.1 (l. 16946, 16970), §13.2 (l. 18363), §16
(l. 21559, 21587–21603). Every "current text" both volumes' BCRs quote was checked against the base by fragment: every
quote of V13 §10.1 and V14 §10.1 exists (line-wrapped) in the base. Earlier volumes read at the cited sections: V03 §3.3,
§3.7.2–§3.7.3; V04 §1b, §2.2 (the `flood` admission, `hallDryCm`), §3.5.1, §3.5.7, §3.8; V06 §3.23; V08 §2.2, §3.14; V09
§4.3, §5.5; V10 §3.9; V11 §2.8; V12 §3.7.8.

**What a seam piece is here.** Every record, field, function, stage slot, message, table row, stream, digest rule,
milestone, owner question, acceptance bar, label, export key or test clause that one volume produces and the other
reads, or that both describe from two sides, plus every base section both volumes' change requests touch. Each was
traced both ways — the producer's consumer column against the consumer's producer column, V14 §10.2's nine requests
against what V13 declares after its revision, V13 §10.2's eight requests against what V14 declares — then against the
base text each BCR quotes. A sentence one volume's own disposition table already overrules is not reported; a finding
of V13's or V14's critique that Revision 1 fixed is not re-reported.

**Severity.** *Blocker*: the two sides cannot both be built as written (two definitions of one registered thing; a
cycle). *Major*: a request one side makes that the other does not honour, a contradiction between the two texts or
with the base or an earlier volume, an unwired call. *Minor*: wording, a citation, a single-source slip, a gap a stated
fallback already covers.

## 1 Seam census

| # | seam piece | producer (as stated) | consumer (as stated) | state |
|---|---|---|---|---|
| 1 | the suitability score and its plug-in slot: `SuitabilityTerm`, `SuitabilityContext`, `score(cell, ctx, weights, hard?, jitter?)`, the `terms` registry | V13 §2.2, §3.7, §1b.2 (the registry holds "V13's eight and the terms V14 names", each by V13's own formula) | V14 §2.5 (the seventeen terms as V14's plug-ins with V14's formulas, `SuitabilityScore.register`), §3.4 (a), §10.2 (1) | **SW-01** |
| 2 | the destination term's name and reach | V13 §2.3 `weights.site`, `reach.siteKm`; §3.7 (1) "`destination` (V14's name for it)"; R-V14-3 "called `destination`" | V14 §2.5, §3.4 (d): the `site` term within `siteReachKm` | **SW-01** |
| 3 | the controlled random term in G3's score | V13 §3.7, BCR-V13-8's `world.siting` row, R-V14-3, T-V13-37 (b): "the one jitter term V14 names" | V14 §3.4 (a), §2.5, J-V14.43, T-V14-8: "no random term enters the score"; §3.1's G3 row: "the controlled random term V13's score admits" | **SW-03** |
| 4 | `WorldSite.attraction`, `.routed` read by W6 and W7 | V14 §2.2, §2.5's columns, §3.4 (d) | V13 §3.7 (1), §3.8 (1) ("flagged `routed` (V14 G1)"), R-V14-1 (`WorldSite { at; attraction; routed }`) | wired; **SW-20** |
| 5 | the 2.5D projection of the world document | V13 §5.7 (the list handed to "V14's R1–R4"; R-V14-7; T-V13-40) | V14 §8, §10.2 (9), J-V14.34: "the renderer reads nothing of V13; the world view's projection is V13's own" | **SW-02** |
| 6 | `charterFor` at a transient placement (the crop frame) | V13 §1b.2 (`charterFor(world, placement)` over a `Placement` record; `requestCharter` creates one) | V14 §3.10 (4), §1b.2, §10.2 (2), §6's crop-frame row | **SW-05** |
| 7 | the world event index (recent events near a point) | V13 §2.4 `WorldFacts.recent` (dated water and terrain events only) | V14 §1b.5, §2.5 `CropRule.recentEventWeeks`, §3.10 (4), §3.13 (b), §10.2 (9) | **SW-07** |
| 8 | the `Encounter` memo and the scene's `waterStamp` | V14 §2.4, §3.10, §4.7 | V13 §3.14.2 step 5 ("V14's E3 cache", "V14's stamp"), T-V13-21b (11), (12) | names unresolved: **SW-17** |
| 9 | the crop's water rendering rule | V13 §5.1 (states it; "the crop's rendering is V14's") | V14 §5.3 (states it; "V13 §5.1's rule read by E3 (7)") | circular: **SW-18** |
| 10 | W8's `foreignCulture` and `WorldRaster.culture` | V13 §2.2, §2.6, §3.9: "from V14's or the host's raster" | V14 §1b.6, §10.2 (5): V14 has no culture raster | **SW-09** |
| 11 | a free site's world glyph | V13 §3.10 (3)–(4) (`glyphOf` in the frame, the world transforms; "the same hook serves V14's site glyphs"; R-V14-8) | V14 §3.9 (d), §5.1, §10.2 (6): "made by V13 W9's commit hook from the card" | each asks the other: **SW-08** |
| 12 | a `WaterSurface` of kind `site`; the connected-set walk over `site` parts and `VerticalLink`s | V13 §2.2 (`kind: 'sea'\|'lake'\|'reach'`), §3.12.6 (V04's elements only) | V14 §3.7, §4.3 (`floodSite`, `drainSite`), §1b.6, §10.2 (7) | **SW-06** |
| 13 | `setPlacement` / `placeFrame` / `unplaceFrame` with a `site` subject; `worldWins` on a site | V13 §2.2 `Placement.subject`, §4.1 `requestCharter.subject`, §4.3 (frames only) | V14 §3.4 (a), §4.1, §4.7, §4.8, T-V14-25 | compatible; the site rows missing: **SW-19** |
| 14 | `ReasonRecord` (one declaration) and the `WhyProvider` kinds | V13 §2.2, §4.7, BCR-V13-17 | V14 §2.7, §1b.2, §4.9 (R-V14-6) | consistent |
| 15 | G6 storing `WaterClassResult` / `RouteClassResult`, re-run on the cascade; E3 reading `routeClass` | V13 §2.4, §3.13, §3.14.2 step 5 (R-V14-4) | V14 §2.2 `Unit.water`, §2.4, §3.7, §3.12 (7) | consistent |
| 16 | the import's markers and zones as G1's candidates and annotations | V13 §2.8, §3.15 (3), R-V14-5 | V14 §3.2 G1 — no mention | **SW-04** |
| 17 | the `SiteAnchor` resolved across documents by the namespace segment | V13 §2.5, BCR-V13-6 (R-V14-2) | V14 §2.8 (C14-22) | consistent; two slips: **SW-20**, **SW-21** |
| 18 | `charter.sites` as drawn constraints; adoption's trigger | V13 §2.2 `FrameCharter.sites { site; at; kind; footprint? }`, §3.11.4 (S0 reads them "(V14's adoption)"), §1.3 ("134 (d)'s adoption is V14 §3's G8 over V13's placement") | V14 §3.9 (e), §1b.2 (`SiteAdopt.adopt` called by "V13's P4/P5"), §4.5 ("that V13's P5 has not adopted") | **SW-10** |
| 19 | the card's `placement` field | V14 §2.2 (`placement?: Placement`, a declared model field) | V13 §2.2, §2.7 (a placement lives in the world document and in no arena's digest), T-V13-2 | **SW-11** |
| 20 | the world point's unit at a click or a drop | V13 §2.1 (`WorldPointCm`, integer cm; "no coordinate is ever a degree") | V14 §2.4 `EncounterAddress.at: { xM; yM }`, `arena: { world: true /* in metres */ }`, §3.12 (5), §4.2 `dropSite.at` | **SW-12** |
| 21 | `Recipe.product` (§2.9) and `StrategyRegistry.products` (§4.12) | V13 BCR-V13-5 (`'town'\|'hood'\|'world'`), BCR-V13-7 (`'base'\|'village'\|'world'`) | V14 BCR-V14-3 (`product` gains `'site'`); §3.1 (a product `site` with `ProductDecl.stages`); no §4.12 request | **SW-13** |
| 22 | the water class test: `classifyWater`, `governingSurface`, `routeClass`, the five classes, the five route classes, the site summary | V13 §3.13, §2.4, `SettlementMapRecord.waterClassSummary` | V14 §2.2 `lifecycle.water`, §2.4 `WaterClassReport`, `UnitWaterClass = WaterClassResult`, §3.7; V04 (BCR-V13-21) | one signature, one table, one word set — consistent; II.6's `flooded` mapping: **SW-31** |
| 23 | the two verbs and the counterfactual fork | V13 §3.14.1, §4.1, §4.5, `forkAt` | V14 §1.4, §4.3 (J-V14.23), §3.4 (b), §4.2 (`floodSite`, `drainSite`), §4.9, T-V14-23 | used identically; `date?` on terrain strokes **SW-27**; wording **SW-28** |
| 24 | the frame charter as a site frame's one input; a 100 m / 120 m frame | V13 §2.2, §3.11.4, BCR-V13-4 | V14 §3.4 (c), §3.6 (f) | consistent |
| 25 | the namespace segment on every address (M1) | V13 §2.5, BCR-V13-5, -6 | V14 §2.8, §3.9 (e), T-V14-7, T-V14-22 | consistent |
| 26 | the `site` layer, `nextSitePart`, the `passage` role, the `site` concern and G-/E- stage ids | V14 BCR-V14-3, -14, -24 | V13 §2.5's address examples (`under3/gallery:…`), BCR-V13-8 (W0–W9, `WORLD_PLACE`, `WORLD_CASCADE`) | consistent (K1, K5, K6) |
| 27 | `ZDecl` on registry rows; V13's world kinds | V14 BCR-V14-5, §5.4 ("V13's own rows (declared there)"), T-V14-16 (excluded by name) | V13 §5.7 (prose: base = top = DEM), BCR-V13-28 (registry columns without `z`) | **SW-22** |
| 28 | §2.9 view keys | V13 §1b.1 (`worldZoom`, `worldLayer`, `showTraces`, `surfaceDate`, the world's `week`; "§2.9 (BCR-V13-5)") | V14 BCR-V14-7, -19 (`projection`, `encounter`, `siteOpen`, `party`) | no clash; V13's keys never requested: **SW-24** |
| 29 | the surface-set digest (`waterStamp`, `WaterClassReport.stamp`) | V14 §2.4 ("V13 §2.7's form") | V13 §2.7 (defines no such digest) | **SW-25** |
| 30 | `raiseLower`'s water and terrain rows | V14 §4.6 ("V13's water-level verb (`drawWater`'s `levelCm` form, dated)") | V13 §4.1 (`setSurface { levelCm; verb }`) | **SW-26** |
| 31 | the basement water table's base home | V13 §1.2, §1b.1, BCR-V13-3: "§2.4 *Basements*" | base l. 1904 (§2.6); V04 §1b, V14 §1b.6, §3.3 ("§2.6") | **SW-23** |
| 32 | V06 §3.23 (2)'s `r` | V13 BCR-V13-22 (`r × waterloggedFactor`) | V14 §3.8, §10.2's V06 request (`r` the unit's material rate) | both edit one sentence: **SW-30** |
| 33 | §13.2's take-over line, §16's staged paragraph and table | V13 BCR-V13-15 (already "T-V1-n … T-V14-n"), BCR-V13-19 (M-W0–M-W4 after M-SF, "32 pw") | V14 BCR-V14-22, BCR-V14-20 (M-ENC, M-SITE-A/F, M-25D) | one merged text each: **SW-29** |
| 34 | the build order: the frame-side water state V04 and V14 call | V13 §8.1 ("built first, inside M-W1, so V04 and V14 read one function from their first milestone"), M-W1 after M-SF | V14 §8 (M-SITE-A after M6-U; "until V13 lands … provisional"), INDEX §3–§4 (M6-U after M5; M-SF after M-CAL) | **SW-14** |
| 35 | INDEX.md's product map, wiring, dependency table, build order, owner-question table | V14 integration notes ("the coherence pass … adds the three milestones to §16 and INDEX.md's tables") | INDEX.md has no V13 or V14 row anywhere | **SW-15** |
| 36 | W7's Urquhart graph through the kernel's `delaunay` over world cm | V13 §2.1 ("§3.2's lattice bounds are never read for a world coordinate"), §3.8 (3) | base §3.2 (1): the range invariant |x|, |y| < 2²³ cm on which every exactness argument rests | **SW-16** |
| 37 | budgets each side cites of the other | V14 §6 ("V13's budget row" for G3; "V13's row" for the transient charter) | V13 §6 (no row for either) | **SW-32** |
| 38 | the acceptance bars 1–17 | V13 §7.5's bar map (3, 4, 5, 7w, 9, 10, 13) | V14 §7's bar map (2, 6, 7s, 8s, 10s, 11, 12, 14–17); V14 §11 Q1 ("bars 11, 13") | **SW-33** |
| 39 | the naming hazard (the base's "site") | spine; V13 §1 (`SiteInput` = the charter, §1.3) | V14 §1 (claims `WorldSite*`; adds `Site*` records and bare `site` layer / product / concern / source / rule values) | **SW-34** |
| 40 | owner questions | V13 §11 Q1–Q3 | V14 §11 Q1–Q4 | none answered differently; V14 Q3's sum **SW-35** |
| 41 | the V03 stair core of kind `secret` for the head rule | V14 §3.9 (a) ("V03 §3.3's stair kinds"), §10.2's V03 request | V03 §3.3 S4 (no such kind), §3.7.3 (a concealed room round the head) | **SW-36** |
| 42 | the milestone names V14 cites of V13 | V14 §8 ("V13's W1", "W2", "W6") | V13 §8.2 (M-W0 – M-W4; W1 and W6 are stage ids) | **SW-37** |
| 43 | `WorldPort`, the per-campaign charter, the host's site record | V13 §3.11.6, BCR-V13-11 (V08 §2.2's unions, confirmed present) | V14 §1b.5 (DR-V14-1 through V08's dossier port), §11 Q2 | consistent (two doors, two records) |
| 44 | the clerk: V13's `ask` modes and V14's sections | V13 §4.7, BCR-V13-24 (V10 §3.9's query, confirmed) | V14 §4.9 | consistent |
| 45 | V09's T6 `place` on two documents; T9 `shape`; the fates sheet | V13 BCR-V13-25 (V09 §4.3's table, confirmed) | V14 §1b.3, §10.2's V09 request (V09 §5.5's fates sheet, confirmed) | consistent |

## 2 Findings

### SW-01 — blocker — owner V14 (the plug-ins) and V13 (the slot and the name) — the seventeen siting terms are defined twice, under two interfaces and two names for the destination term

**Claim.** V13 §3.7 (l. 1209 ff.): "The registry holds V13's eight terms (below) and the terms V14 names, each computed
from V13's data by an own formula: `overlook` = clamp((dem − the mean dem within `reach.overlookKm`) ÷ 300 m, 0, 1);
`roadControl` = 1 − min(1, distToRoute ÷ `reach.roadControlKm`); `waterNear` = the `lowland` term; … `concealment` =
1 − `overlook`, × 1.5 on forest land use …; `solitude` = min(1, distance to the nearest placement or proposal ÷
`reach.settlementKm`) …" — seventeen formulas. V14 §2.5 (l. 921 ff.): "the terms are THIS VOLUME'S `SuitabilityTerm`
plug-ins in `@plat/sites/siting`, registered with V13's `SuitabilityScore` … each plug-in, stated once: `overlook` —
(h(c) − mean h over overlookRadiusM 300) ÷ overlookNormM 40, clamped; … `waterNear` — exp(−distToRiverM ÷ 400); …
`concealment` — 1 − max(overlook, routeNear) (J-V14.36); `solitude` — settlementFar × (1 − routeNear) …" — the same
seventeen ids with different formulas, and V14 §2.5's closing sentence: "V13 owns the score, its own terms … and the
plug-in interface; nothing is asked of V13 but that interface's inputs". Two modules registering one id set into one
registry cannot both be built. Three further mismatches ride on it: (a) the interface — V14 §10.2 (1) asks for a term
"`(cell, world: { dem, distToRiverM, distToShoreM, route, placements, territory, floodSpread, resources, landUse },
stage) → number`, registered by `SuitabilityScore.register(term)`"; V13 §2.2 declares `SuitabilityTerm { id;
compute(cell, ctx: SuitabilityContext) }` with `SuitabilityContext { raster; coast; reaches; surfaces; routes;
placements; sites; resources; springs; stage }`, no `register` function and no `SuitabilityScore` type, and the context
carries neither `Territory` records (V14's `territoryBorder` reads `Territory.border`) nor a wet-season spread (V14's
`floodSafe` reads "the wet-season `FloodSpread` at stage 1"; V13's `FloodSpread` is frame-scale, §3.12.4); (b) the
name — V13 §2.3's `SuitabilityRule.weights` key is `site` ("site 0.5") while V13 §3.7 (1) calls the same term
"`destination` (V14's name for it, C13-19)" and R-V14-3 asks that "the destination term [be] called `destination`";
V14 §2.5 and §3.4 (d) call it the `site` term and J-V14.43 rejects "a destination term"; (c) the reach cell — V14 says
`siteReachKm`, V13 §2.3's cell is `reach.siteKm`.

**Required change.** V14 owns the seventeen plug-ins: V13 §3.7's paragraph "The registry holds V13's eight terms
(below) and the terms V14 names, each computed from V13's data by an own formula: … `destination` (V13's own term, below
— the name V14 uses)" is cut to "The registry holds V13's eight terms (below); V14 registers its purpose terms
(V14 §2.5) through `terms.register(term: SuitabilityTerm)` and they are V14's to state", and V13 §1b.2's `score` row
and the integration notes say the same. V13 §2.2 declares `terms.register(term)` on `@plat/world/siting` and
`SuitabilityContext` gains `territories: Territory[]` and `wetStage(reach: Id): Int32Array` (the reach's wet-season
stage profile by V13 §3.12.4's `seasonal.wetShare`, derived on demand) so `territoryBorder` and `floodSafe` are
computable from the declared context. The term is `site` everywhere: V13 §3.7 (1)'s bullet reads "`site`: V14's world
sites' pull …", R-V14-3 reads "G3 calls `score(cell, ctx, weights, hard)` with its `SitePurposeWeightRow` over V14's
seventeen plug-ins and V13's eight terms; the world-site term is `site`" (the jitter clause goes with SW-03), and the
word *destination* stays prose for item 134 (c). V14 §2.5's comment, §1.2's hook row and §10.2 (1) cite V13's
declared names — `SuitabilityTerm`, `SuitabilityContext`, `score`, `terms.register` — in place of `SuitabilityScore`
and the `world: {…}` object, and read `reach.siteKm`.

### SW-02 — major — owner V14 (V13's §5.7 stands) — the world document's 2.5D view is owned by neither side

**Claim.** V13 §5.7: "The world regime hands a 2.5D view exactly these: the fine DEM draped …; every `WaterSurface` a
plane …; the glyph marks …; the routes and territory borders draped …; the labels upright … The projection family, the
hit test and the vertical edit are V14's (R1–R4)"; R-V14-7: "the 2.5D renderer (R1–R4) consumes V13 §5.7's list and
nothing else of the world"; T-V13-40's row asserts bar 14's world half. V14 §8: "V0–V4 wait on M4's render tier and on
nothing of V13 (V13's world view's projection is V13's own, reading R2's transform through `@plat/render`, V14 §10.2)";
J-V14.34: "the renderer reads nothing of V13"; V14 §10.2 (9) asks V13 for "the world view's projection reading R2's
transform from `@plat/render`"; V14 §5.4's table excludes V13's kinds from the `ZDecl` lint "(declared there)"; V14
§5.6's R3 draws "the ground's heightfield" and frame kinds only, with no `Lod25Row` for a world document. Each side
assigns the world's projected view to the other; no section builds it, though item 141 (a) asks for "the whole
architecture" and V13's T-V13-40 tests it.

**Required change.** V14's R2–R3 take the world document as one more document kind: V14 §5.6 gains "(10) **The world
document.** R3 draws V13 §5.7's list and nothing else of the world — the fine DEM draped in place of the ground's
heightfield (the tile's raster at the stop's cell), every `WaterSurface` a plane at its level (a reach's stage a ruled
surface), traces as planes at their former level, the glyph marks, routes and borders draped at the DEM's height, the
labels at their anchors' heights; a `Lod25Row` per world stop (`terrain` draped, `massing` none, `trees` none)" and
V14 §2.5's `Lod25Row` table gains the four world stops; V14 §8's dependency sentence reads "V2 gains the world's rows
after V13's M-W1 (a registry lookup: no world, no rows)" and J-V14.34's "the renderer reads nothing of V13" becomes
"reads V13 §5.7's list after M-W1"; V14 §10.2 (9) drops "the world view's projection reading R2's transform". V13
§5.7 stands; its T-V13-40 row names T-V14-14's fixture as the world half's harness.

### SW-03 — major — owner V13 and V14 — the controlled random term: V13 expects G3 to name one; V14 forbids it, and V14 contradicts itself

**Claim.** V13 §3.7: "V14's G3 calls it with its purpose row's weights and `hard` terms … and the one controlled random
term it names drawn on `world.siting` keyed by the caller's key (`jitter`)"; BCR-V13-8's `world.siting` row: "V14's G3
jitter term, keyed by the caller's key"; R-V14-3: "names its one jitter term"; T-V13-37 (b): "`score` called as V14's
G3 calls it (purpose weights, hard terms, the jitter term) … draws the jitter on `world.siting` keyed by the caller".
V14 §3.4 (a): "equal candidates are tie-broken by one draw on `site` keyed by (the card, `siting`) (V13's own tie-break
rule; no random term enters the score, C14-04)"; §2.5: "the `siting` draw is the tie-break among equal candidates,
V13's own rule"; T-V14-8: "no random term enters the score"; J-V14.43 likewise — but V14 §3.1's G3 row still says
"`site` keyed by the card, salt `siting` (the controlled random term V13's score admits)". V13's own tie-break is a
different draw ("on `world.siting` keyed by the two cells", §3.7 (6)), so V14's "(V13's own tie-break rule)" names a
rule V13 does not have.

**Required change.** The score has no random term for a site (derive before invent, item 132 (g)): V13 §3.7's
plug-in paragraph, BCR-V13-8's `world.siting` row and R-V14-3 drop the V14 jitter clause (the `jitter?` argument stays
for the host's `proposals`, or is removed with T-V13-37 (b)'s clause reduced to "refuses a cell whose hard term is
0"). V14 §3.4 (a) and §2.5 read "equal candidates are tie-broken by V14's one draw on `site` keyed by (the card,
`siting`), outside the score; W6's own tie-break (V13 §3.7 (6)) is W6's"; V14 §3.1's G3 stream column reads "`site`
keyed by the card, salt `siting` (the tie-break among equal candidates, outside the score)".

### SW-04 — major — owner V14 — R-V14-5 is not honoured: G1 says nothing of the import's markers and zones

**Claim.** V13 §2.8's rows: "the markers … POI records like `SitingProposal` with `demand: 'import'`, handed to V14's G1
as site candidates (V13 §10.2's request)" and "the zones … a `zone` record (cells, kind, name) the view draws and V14's
G1 may read"; §3.15 (3): "the markers become POI candidates for V14's G1, the zones annotation records"; R-V14-5: "V14
states what G1 does with them". V14 §3.2 G1 reads the clicked address, the host document and the admissibility table and
names neither a marker nor a zone; a grep of V14 for *marker*/*zones*/*import* finds only the DM's `marker` item kind
and the marker-like kinds.

**Required change.** V14 §3.2 gains one paragraph "**Import candidates (V13 §3.15 (3)).** An imported map's POI
candidates (V13's `SitingProposal`s with `demand: 'import'`, each with the export's type and legend as provenance)
are listed by the site dialog's **From the import** tab as candidate `dropSite`s at the proposal's `at` in the `world`
(or the covering frame's) context — G1 maps the type word to a kind by a shipped `importKinds` row of
`tables/sites/kinds.json` (a word with no row → `camp` of attachment `ground`, named), G2 derives the rest; nothing is
dropped until the DM accepts one. An import `zone` record is an annotation: G1 reads it only as the context's
`territory`-like note in the card's reason (`info.site.zone`), never as a rule." T-V14-5 gains a clause over V13's
synthetic import fixture.

### SW-05 — major — owner V13 — V14's request (2), a transient `charterFor` for the crop frame, is not honoured

**Claim.** V14 §3.10 (4): "(i) V13's `charterFor(world, placement)` at a transient placement at the clicked point — a
100 m frame, no settlement, no `Placement` recorded (the V13 request of V14 §10.2; the form `WorldPort.charter` nearly
gives)"; V14 §6 budgets it as "V13's row". V13 declares `charterFor(world, placement)` over a `Placement` record whose
only makers are the placement edits (`requestCharter` "creates the `Placement` … and runs P4", §3.11), `WorldPort.charter`
is "the `requestCharter` event with `author: 'host'`" (§3.11.6), P4 writes the charter "both copies" into the world
document, and V13's E1 hand-off is `worldFactsAt` alone (§1b.2, §2.4). No pure, record-less charter exists, and V13
§6 has no row for one.

**Required change.** V13 §1b.2 and §3.11.4 declare the pure form `charterFor(world, pl: Placement | TransientPlacement)`
with `TransientPlacement { originCm; bearingCdeg: 0; mirrored: false; frame: { widthCm; heightCm; marginCm } }`: it
builds the `FrameCharter` of §3.11.4 (1)–(11) from the world as it stands, with `placement` the transient value and
`source: 'world'`, writes no record, no event, no blend, no glyph and no reason record (a view read, as `worldFactsAt`
is), and is the form V14's E1 (4) calls; V13 §6's edit paragraph gains "a transient `charterFor` ≤ 10 ms (P4's cost;
`WORLD-9`)"; V13 §10.2 gains R-V14-9 "E1's crop frame calls the transient form and persists nothing". V14 §6's
crop-frame row adds the 10 ms (the row reads ≈ 20 · 26 ms, inside `firstFrameMs`).

### SW-06 — major — owner V13 — V14's request (7), a `WaterSurface` of kind `site` and the walk over `site` parts, is not honoured

**Claim.** V14 §3.7: "the request's `floodedLevel` as a `WaterSurface` of kind `site` with `body` the card and the
level's units as its cells, dated at the layer's week (V13's record; the V13 request of V14 §10.2, designed as granted;
C14-58)"; "V13's connected-set walk (V13 §3.12.6) runs over `site` parts and `VerticalLink`s as over V04's elements";
§4.3's `floodSite` / `drainSite` are "a dated governing surface through V13's verbs". V13 §2.2: `WaterSurface.kind:
'sea'|'lake'|'reach'`, `body: "a world feature id (W2), a Reach, or on a frame a WaterBody"`; §3.12.6: "V04's elements
(cellars, crypts, sewers, mines, caves, the undercity) are units … the void graph of V04's elements is walked"; §4.1's
`setSurface` takes "the body's present surface, or a reach". A level flooded by request has no surface to be governed
by, and `floodSite` has no event to fold into.

**Required change.** V13 §2.2's `WaterSurface` gains `kind: 'sea'|'lake'|'reach'|'site'` with `body` "or a `WorldSite`
(V14) with `cells` the units of one level (`level: number`)", `cause` the `setSurface` or the site's creation prefix
event; §3.13.1's `governingSurface` admits a `site` surface for a unit of that level as an `open` surface; §3.12.6
reads "the void graph of V04's elements and of V14's `site` parts — every `Unit` with its `passages` and every
`VerticalLink` as a passage whose `floorCm` is the lower end's (V14 §2.2) — is walked"; §4.1's `setSurface` admits
`{ surface: { kind: 'site'; body: Id; level: number }; levelCm; date?; verb }` (V14's `floodSite` / `drainSite` fold to
it); V13 §10.2 gains the row "R-V14-10: G6 hands the level's units as `WaterUnit`s with `passages` from the unit graph
and the links". T-V13-8's fixture gains a site level.

### SW-07 — major — owner V13 — the world document has no event index; V14's world crop reads one

**Claim.** V14 §1b.5: "recent events near a world point (a battle, a plague, a fire) | V13's world document's event
index (**V13**)"; §2.5 `CropRule.recentEventWeeks` "how far back E1's `world` context reads V13's event index"; §3.10 (4):
"the events V13's world document indexes near the point within `recentEventWeeks`"; §3.13 (b): "a `world` context's
recent battle gives `corpse`, `debris` and `wagon` items by V13's event index"; §10.2 (9). V13 declares `WorldFacts.recent:
{ kind; week; reason }[]` filled by "recent dated events" (§1b.2, §2.4) — its own dated surfaces and traces — and no
record for a host event; §1.4: "The host's political facts — … military … — are the host's"; the `WorldPort` (§3.11.6)
has no inbound event message. Item 132 (e)'s "recent battle" has no producer.

**Required change.** V13 §2.2 gains `WorldEvent { id; kind: string /* the host's word: battle, plague, fire, … */; at:
WorldPointCm; radiusM: number; week: Week; source: 'host'|'user'; detail?: string; reason: Id }` in the world's entities
block (a dossier-tier record when the host wrote it, `factTier: 'dossier'`), written by the new inbound `WorldPort`
call `events(world, events: WorldEvent[])` (BCR-V13-11 gains the seventh method; V08 §2.2's union gains its message) or
by a user's `setAttr`-free `addEvent` edit (T9 `shape`; §4.1's union, BCR-V13-9); `worldFactsAt(world, wCm, sinceWeek?)`
answers `recent` as every `WorldEvent` within its `radiusM` of the point and every dated surface or trace in the cell,
each with `week` ≥ `sinceWeek`; §1b.1 gains the row; §2.5 its creation key (`event`, the host's key or the seq); §2.6
its lifecycle row (kept through every re-derivation; removed with its host record at `map` tier as V14 §1b.5's rule
keeps a card). V14 §1b.5, §3.10 (4) and §3.13 (b) cite `WorldEvent` and `worldFactsAt(…, sinceWeek)`.

### SW-08 — major — owner V14 (the marks) and V13 (the record) — the site's world glyph: each side asks the other to make it

**Claim.** V13 §3.10 (3)–(4): the frame "makes its own marks in frame cm: `glyphOf(doc, levels)` in `@plat/layout` …
The world … only transforms marks by `toWorld` … The same hook serves V14's site glyphs"; R-V14-8: "a site's glyph marks
through the same `glyphOf`/`world.glyph` path as a frame's"; BCR-V13-1: `@plat/world` reads no layout record (C13-35).
V14 §3.9 (d): "a free-standing site's world glyph is a `SettlementGlyph`-shaped record made by V13 W9's commit hook from
the card (level 0 the kind's glyph as a dot, level 2 the envelope's outline and its enclosure; `sourceDigest` the site
document's; the V13 request of V14 §10.2)"; §10.2 (6): "W9's commit hook makes a free site's glyph from the card".
V13's W9 cannot read a site document's envelope or enclosure (the dependency rule), V13's `SettlementGlyph` requires
`tier: Rung` and `pop` (a site has neither) and `GlyphMark.kind` has no kind glyph.

**Required change.** V14 §3.9 (d) reads: "a free-standing site's world glyph is made by the site document's own commit
hook as a frame's is (V13 §3.10 (4)): `@plat/sites` runs `glyphOf` over the site document — level 0 a `dot` whose
`class` is the kind (the icon glyph id), level 1 `dot` + `ring` (the envelope), level 2 `outline` (the envelope) and
`wall` (the enclosure), level 3 the same — into its `derived.glyph` and posts `world.glyph`; V13 places it"; §10.2 (6) is
withdrawn. V13 §2.2's `SettlementGlyph` gains `subject: 'frame'|'site'; tier?: Rung; pop?: number` and the view's
settlements row (§5.1) draws a `site` subject's level-0 dot by its `class` glyph at the pin size; §3.10 (4)'s "The same
hook serves V14's site glyphs" names the levels V14 posts; `GlyphLevelRow.minTier` is read for frames only.

### SW-09 — major — owner V13 — `WorldRaster.culture` names V14 as a producer; V14 has no culture raster

**Claim.** V13 §2.2: "`culture: Uint16Array /* fine; the culture id per cell from V14's or the host's raster, or the
import (V13 §2.8) … read by W8's foreignCulture term */`"; §2.6: "`culture` from V14, the host or the import"; §3.9 (2):
"the cell's culture (V14's or the host's culture raster, absent → 0)". V14 §1b.6: "W8's `foreignCulture` reads the
host's or the recipe's culture, never a raster of V14's (V14 has none)"; §10.2 (5) asks V13 to say so; V14's critique
routed it (C14-52) and V13's revision did not take it.

**Required change.** V13 §2.2's comment reads "the culture id per cell from the host's seats (`TerritorySeed.culture`,
flooded with W8's territories), the recipe's default culture, or the import (V13 §2.8); 0 none"; §2.6's row and §3.9 (2)
say "the host's or the recipe's culture (the seat's `culture` spread over its territory by W8, read back by the
`foreignCulture` term at the next pass), never V14's"; §1b.1's `WorldRaster` producer column drops V14.

### SW-10 — major — owner V14 — adoption's trigger is unwired: V14 has V13's P4/P5 call `SiteAdopt.adopt`; V13's operators call nothing of V14

**Claim.** V14 §1b.2: "`SiteAdopt.adopt(settlement, site, placement)` … | V13's P4/P5 when a settlement is placed over
a site; V07's siting at a village rung; a hand `adoptSite`"; §3.9 (e): "When a settlement is placed over a free-standing
site's frame — V13's P1–P5 for a host-founded settlement, or a hand `adoptSite` — `SiteAdopt.adopt(…)`"; §4.5: "that
V13's P5 has not adopted (an older site placed after the settlement, say)". V13 §3.11's P1–P5 run `coherence`, `blend`,
`localDrainage`, `charterFor` and the stamp; §1.4: "this volume … reads nothing of V14's but `WorldSite` positions …
and a `SiteAnchor`'s address"; §1.3: "134 (d)'s adoption is V14 §3's G8 over V13's placement"; T-V13-7: `@plat/world`
imports nothing from the layout packages (`@plat/sites` sits above it). Nothing in V13 calls V14's adopt.

**Required change.** V14 §3.9 (e) (1) reads: "the trigger is V14's own hook, not V13's operators: `@plat/sites` registers
a `beforeS0` hook on `generate` (the stage-2 seam's hook form, §4.12) that fires when `Recipe.charter.sites` is
non-empty — it opens each listed site document through `@plat/api`'s resolver (as the world opens a frame's
`derived.glyph`, V13 §3.10 (3)) and runs `SiteAdopt.adopt` before S0 reads the charter, writing the drawn constraints and
the `worldSite` reservation into the creation prefix; a `bindPlacement` or `setPlacement` whose new extent covers a
free site's placement (V13 §3.11's overlap edge, the site's extent read from its `Placement`) posts `world.placed {
placement }`, which `@plat/sites` answers with `adoptSite` on the settlement (the hand form, one event)"; §1b.2's caller
column and §4.5's "that V13's P5 has not adopted" read accordingly ("that no generate-from-charter adopted"). V13
§3.11's edges gain "two placements whose extents overlap where one subject is a `site`: admitted, `world.placed`
posted (V14 adopts)" in place of the refusal, and §1b.2 lists the `world.placed` message beside `world.glyph`.

### SW-11 — major — owner V14 — `WorldSite.placement: Placement` is a declared model field of the card, so moving a site moves the card's digest

**Claim.** V14 §2.2: "`placement?: Placement; // V13: a free-standing site's placement in the world regime … absent attached
or surface`" and the declared-versus-derived rule: "`placement` … are declared — in the model digest, moved only by
events"; §3.9 (e) (3) "the card moves … with `placement` the settlement's". V13 §2.2: a `Placement` is "one per placed
arena set, in the WORLD document"; §2.7: "**A placement is in the world's digest and in no arena's** (the brief's bar
3) … no placement edit writes any field the frame's model digest hashes"; T-V13-2 asserts the subject document's model
digest byte-equal across every placement edit. A `setPlacement` of a free site would rewrite the card's `placement`
(a model field of the site document's entities block) — T-V14-25's "every per-part digest unchanged" holds, the site
document's model digest does not; and the copy can drift from the world's record.

**Required change.** V14 §2.2 replaces `placement?: Placement` by `placement?: { world: Uuid; placement: Id }` — a
reference, the site document's `Document.worldRef` (V13 BCR-V13-5) mirrored on the card for the icon and the clerk —
and moves it to the derived block's list (rebuilt from `worldRef` on open); every reader (`SiteContext.of` rule 1, G3,
§3.9 (e) (3), §1b.5's "a placement the host fixes", GeoJSON's placement properties) reads the `Placement` through the
world document; `dropSite.placement?: Placement` stays as the event's recorded proposal. T-V14-25 gains "the site
document's model digest byte-equal across V13's `setPlacement` (T-V13-2's bar on a site subject)".

### SW-12 — major — owner V14 — the world point is in metres in V14 and integer centimetres in V13

**Claim.** V14 §2.4: "`arena: PlatKey | { world: true /* V13's regime, in metres */ } …; at: PointCm | { xM: number; yM:
number /* the world point, V13 */ }`"; §3.12 (5): "for V13's regime the world's origin in metres"; §4.2 `dropSite.at?:
PointCm | { xM; yM }`. V13 §2.1 (J-V13.2): "The **world regime** is … in **integer world centimetres** (`WorldCm`, an
int32 lane as `Cm` is …) with a `WorldPointCm = { x: WorldCm; y: WorldCm }`"; every V13 record (`Placement.originCm`,
`WorldRoute.polyline`, `worldFactsAt(world, wCm)`) takes `WorldPointCm`. A double in metres keyed into an
`EncounterAddress` also breaks T-V14-1's byte-identity across engines where V13's integer key would not.

**Required change.** V14 §2.4, §3.12 (5) and §4.2 read `WorldPointCm` (V13 §2.1) wherever `{ xM; yM }` or "in metres"
stands: `arena: PlatKey | { world: true /* V13's regime, WorldPointCm */ } | …`, `at: PointCm | WorldPointCm`, "for
V13's regime the world's south-west origin in world cm, the grid cell `gridCm` on that lattice"; the world crop
frame's transient placement (SW-05) takes the click as its `originCm`.

### SW-13 — major — owner V13 (the two unions) and V14 (its missing §4.12 request) — `Recipe.product` and `StrategyRegistry.products` are each edited by both volumes with two different results

**Claim.** V13 BCR-V13-5's new text for the base's one line (l. 3880): "`product?: 'town'|'hood'|'world' /* … */; …
world?: WorldRecipe …`"; V14 BCR-V14-3's new text for the same line: "`Recipe.product` gains `'site'`". V13 BCR-V13-7's
new text for the base's l. 384: "`→ { product: 'base' | 'village' | 'world', rung }` … registered in
`StrategyRegistry.products`" — no `site`; V14 §3.1: "Its stage set (`ProductDecl.stages`, §4.12) is the G- stages …
register as `StageDecl`s … under the product `site`" with no request on §4.12's `products` union or `LadderRouter`'s
routing by `Recipe.product`. Two new texts for one line, and a product with no registration. Inside BCR-V13-7 itself:
"each a `StageDecl` with `txForm: 'declared'`" against the base's `txForm: 'declared'|'callback'` (l. 9687) and the same
request's "`StageDecl.txForm` gains `'records'`" and V13 §3.0's `txForm: 'records'`; and "stages W0–W9 and the
placement stage P1–P5" against the same request's "The placement operators P1–P5 are not stages of the set".

**Required change.** One merged text per line, carried by V13's request and cited by V14's: BCR-V13-5's `product?:
'town'|'hood'|'world'|'site' /* … 'site' a world-site document (V14 §3.1) */` and BCR-V13-7's `{ product: 'base' |
'village' | 'world' | 'site', rung }` with "the `site` product (V14 §3.1's G1–G8, registered by `@plat/sites` into
`StrategyRegistry.products`; `LadderRouter` routes a `Recipe.product: 'site'` to it, never by population)"; BCR-V13-7's
own text reads `txForm: 'records'` once and "stages W0–W9 (the placement operators P1–P5 are §7.3 local operators, not
stages)". V14 BCR-V14-3's `Recipe.product` clause reads "carried by BCR-V13-5's merged union" and V14 §10.1 gains the
one-line request "§4.12 `StrategyRegistry.products` admits `'site'` (BCR-V13-7's merged union)".

### SW-14 — major — owner V13 (and INDEX) — the frame-side water state lands after M-SF, yet V13 says V04 and V14 read it "from their first milestone"

**Claim.** V13 §8.1: "The world milestones follow M-SF … The frame-side water state (surfaces, the groundwater step,
the water class test, the two verbs and the cascade) has no host dependency and is built first, inside M-W1, so V04
and V14 read one function from their first milestone"; BCR-V13-19: "M-W0 – M-W4 … follow M-SF"; BCR-V13-21 rewrites
V04 §2.6's and §3.5.2's readers to `waterTableAt` / `classifyWater` unconditionally. INDEX §3–§4 and §16 (l. 21599,
21603): M6-U (V04) follows M5; M-SF follows M-CAL, which follows M6-sky, which follows M6-U; V14 §8: M-SITE-A after
M6-U, with "until V13 lands, G6 reads the base's §2.6 water table … `W_SITE_WATER_PROVISIONAL`". So V04's first
milestone precedes M-W1 by three milestones and the one function does not exist when V04's rewritten readers are
built; V14 carries a fallback, V04's rewritten text carries none.

**Required change.** V13 §8.1–§8.2 split the frame-side water state out of M-W1 as **M-W0h — the water state at the
frame** (the hydro lift, `carveDeltaCm`, `Terrain.surfaces`, `datumOf` on a standalone frame, the groundwater step and
`waterTableAt`, `classifyWater`, `routeClass`, the two verbs and the cascade at the frame, the fork, `ReasonRecord` and
its readers; ≈ 4 pw; T-V13-4, 6, 8, 9, 10, 20, 22, 25, 27, 29, 33–35), starting after M4 beside M5 and exiting before
M6-U's U3b (its only new dependency M4's render tier for the overlays); M-W0 – M-W4 as now after M-SF; BCR-V13-19's
sentence names both; BCR-V13-21 reads "from M-W0h; until it lands V04's readers keep the base's nearest-body rule
(reported as the version's shift at M-W0h's landing)". V14 §8 cites M-W0h for G6's classifier (its provisional classes
then cover only a build older than M-W0h). INDEX's dependency table gains the row (SW-15).

### SW-15 — major — owner INDEX.md (the coherence pass) — the index has no row for either volume

**Claim.** INDEX §1's product map, §2's wiring table, §3's dependency graph and table, §4's build order and §6's
owner-question table list V01–V12 only; §1 states "407 requests … carried by the 386 items of file f … 0 uncarried", which
BCR-V13-1 – BCR-V13-29 and BCR-V14-1 – BCR-V14-25 (to be numbered from 600 into file k, V13 §0, V14 §10) make false.
V14's integration notes expect "the coherence pass … adds the three milestones to §16 and INDEX.md's tables"; V13's
BCR-V13-19 touches §16 only. The brief's checks (7) and (8) cannot be made against INDEX as it stands.

**Required change.** INDEX gains: §1 two rows (V13 `V13-world.md`, the world regime, placement and hydrology, hooks §2.3,
§2.6, §2.8–§2.9, §4.2 S1, §6.1, §6.3, §7.1, §7.3, §7.7, §8.4, §9.5, §11.1, §14, built at M-W0h and M-W0 – M-W4, 28–36 pw
(V13 §8.2); V14 `V14-sites.md`, world sites, encounters and the 2.5D view, hooks §2.1–§2.2, §2.7–§2.9, §3.4, §4.12, §6.1,
§7.1, §8.2, §8.4, §9.2, §11.1–§11.2, §14, built at M-ENC, M-SITE-A/F, M-25D, 25.75–36.25 pw (SW-35)); §1's census
sentence re-counted by the coherence pass once file k exists; §2 two wiring rows (V13 fed by V04, V06, V08, V10, V11,
V12, feeding V04, V06, V08, V09, V10, V14; V14 fed by V01–V13, feeding V04, V06, V07, V08, V09, V10, V11, V12, V13's W6/W7
and the charter's `sites`); §3's graph and table the rows M-W0h (after M4, beside M5, before M6-U), M-W0 – M-W4 (after
M-SF), M-ENC (after M1; interiors with M6-P's P1), M-SITE-A (after M6-U's U3b and M5's W15), M-SITE-F (after M-W1,
beside M-W2), M-25D (after M4, beside M5; its world rows after M-W1, SW-02); §4's order sentence; §6 seven rows (V13 Q1
migrate settlement-first, Q2 the host in step with M-W1 – M-W3, Q3 embed the charter; V14 Q1 ship after M1, Q2 yes with
item 138 (e), Q3 accept, Q4 the optional vendor block), each "decided under the delegation, vetoable".

### SW-16 — major — owner V13 — W7 triangulates world coordinates with the kernel's `delaunay`, outside the kernel's range invariant

**Claim.** V13 §2.1: "the largest world rung's far corner at 3 840 km lies at 3.84 × 10⁸ cm, inside the lane, and §3.2's
lattice bounds are never read for a world coordinate … the kernel's `delaunay`, `dmath`, `rng`, `index` and `noise` are
the only kernel parts it calls"; §3.8 (3): "the Urquhart graph of their Delaunay triangulation … computed by the kernel's
deterministic triangulation (§5.1's primitive, over integer cm)". Base §3.2 (1): "**The range invariant is |x|, |y| <
2²³ cm (83.9 km)**, enforced by `snap` … Every exactness argument below rests on the range"; (its products are exact
doubles "below 2⁴⁸" only inside it). Seats at up to 3.84 × 10⁸ cm are forty-six times outside the range the predicates
are exact for; the invariant is a kernel fact no K row widens (item 140's K14 would be a new kernel row).

**Required change.** V13 §3.8 (3) reads: "the seats' positions are handed to the kernel's `delaunay` in **integer
metres** (`originCm ÷ 100`, rounded; the continent rung's far corner at 3.84 × 10⁶ m lies inside §3.2 (1)'s range of
2²³ at every rung), the triangulation's edges read back by seat id; no world cm reaches a kernel predicate"; §2.1's
sentence reads "… and no world coordinate reaches a kernel primitive except as integer metres inside §3.2 (1)'s range
(V13 §3.8 (3))"; T-V13-39 gains "every coordinate passed to `delaunay` is within the range invariant (a lint on the
call)". No kernel request follows.

### SW-17 — minor — owner V13 — V14's request (3): the names "E3 cache" and "VTT scene stamps" are still unresolved in V13

**Claim.** V13 §3.14.2 step 5: "encounter crops at those addresses (V14's E3 cache invalidated); VTT scenes covering
them (V14's stamp)"; T-V13-21b: "(11) V14's E3 encounter crop cache, (12) V14's VTT scene stamps". V14 §3.10: the open
`Encounter` is memoised "in the elaboration cache … invalidated by … V13's cascade whose dirty set reaches its
rectangle (V13 §3.14.2 step 5's 'V14's E3 cache')"; §2.4 `EncounterCrop.waterStamp`; §10.2 (3) asks the names be resolved.

**Required change.** V13 §3.14.2 step 5 reads "the open `Encounter`'s memo at every address whose rectangle the dirty set
reaches (invalidated; V14 §3.10) and the `waterStamp` of every scene exported over it (V14 §2.4)"; T-V13-21b (11) and
(12) read "the `Encounter` memo re-resolves after the cascade" and "a scene re-exported after the cascade differs in
`waterStamp` and the water fields alone (T-V14-11's clause)".

### SW-18 — minor — owner V13 (and V14's citation) — the crop's water rendering rule is stated in both volumes and each cites the other

**Claim.** V13 §5.1 (last paragraph): "the encounter crop's water-as-terrain with depth bands, rooftops as the dry ground
and swimming routes as difficult terrain (V14's E3 reads `RouteClassResult`; the crop's rendering is V14's)". V14 §5.3:
"**the water (C14-21; V13 §5.1's rule read by E3 (7))**: a face whose class is `wading` or `swimming` takes V13's depth
tint …, a `submerged` interior is withheld …, the rooftops of the flooded buildings draw as the dry ground". V14 §10.2
(4) asks that V13 §5.1 name E3's two reads and leave the rule to V14 §5.3.

**Required change.** V13 §5.1's sentence reads "the encounter crop reads `classifyWater` for every face of its resolved
set and `routeClass` over its ways (V14's E3 (7)); the crop's water rendering is V14 §5.3's"; V14 §5.3's parenthesis
reads "(C14-21; E3 (7)'s reads of V13 §3.13; the depth tint is V13 §5.1's `flood` overlay's)".

### SW-19 — minor — owner V13 (the rows) and V14 (`worldWins`) — a `site` subject through the placement edits is compatible but unstated, and `worldWins` on a site has no S1 to re-derive from

**Claim.** V13 §2.2 admits `Placement.subject: { kind: 'site'; site }` and §4.1 `requestCharter.subject` the same, but
§3.11's operators, §4.3's rows and §3.11.5 speak of "the frame" throughout and V13 §10.2 does not acknowledge V14's
request (8); §4.3 has no row for `setPlacement` of a world-first placement whose origin moves. V14 §3.4 (a): "Moving a
site is V13's `setPlacement` … a `worldWins` is the DM's explicit re-derive from S1 with carry-over"; V14 §3.1: "no S0–S15
run on a site document" — S1 is a function G5 (f) calls, so V13's `worldWins` ("schedules a Re-derive from S1 on the
frame", §3.11.5 (3)) has no stage to schedule on a site document.

**Required change.** V13 §3.11's opening gains "A `Placement` whose subject is a site (V14 §3.4 (a)) takes the site
document as the frame through every edit below"; §4.3 gains the row "`setPlacement` (origin) of a world-first
placement | P4 (the charter re-emitted, marked stale on the frame) → P5 → W9 → W7–W8 over the landmass | the frame |
the frame's `worldWins` re-derivation: declared" and the `worldWins` row's note "on a site subject the re-derivation is
V14's G5 (f) re-materialization under the new charter with §6.3's carry-over, run by `@plat/sites`"; V13 §10.2 gains
R-V14-11 recording request (8) as honoured. V14 §3.4 (a) reads "a `worldWins` is the DM's explicit re-materialization
(G3 (c), G5 (f)) under the new charter with carry-over".

### SW-20 — minor — owner V13 — four readings of V14's records in V13 name shapes or sources V14 does not have

**Claim.** (a) R-V14-1: "`WorldSite { id; at: WorldPointCm; attraction; routed }` positions" — V14's card carries
`placement` (and after SW-11 a reference), no `at`; the card lives in the site document's entities block, which
`@plat/world` must read through the resolver as it reads a frame's `derived.glyph`. (b) V13 §1.4, R-V14-2: "a
`SiteAnchor`'s address as a world fact to answer `worldFactsAt`" — a `SiteAnchor` exists only for an attached site in a
host document (V14 §2.3); a free-standing site has a `Placement`. (c) V13 §3.10 (2): "a site at its anchor" (a label
anchor). (d) V13 §3.8 (1): "V14's world sites flagged `routed` (V14 G1)" — the flag is the kind row's column copied at
the drop (V14 §3.4 (d)), not G1's.

**Required change.** R-V14-1 reads "every `Placement` with a `site` subject gives the site's `at` (`originCm`); its
card's `attraction` and `routed` are read through `@plat/api`'s resolver from the site document (V14 §2.2), cached per
(placement, the card's digest)"; §1.4 and R-V14-2 read "a site's `Placement` as a world fact (`WorldFacts.sites`)";
§3.10 (2) "a site at its placement's origin"; §3.8 (1) "flagged `routed` on the card (V14 §2.5's kind row)".

### SW-21 — minor — owner V14 — the anchor's `site` and the card's `anchor` are same-document references written with a namespace

**Claim.** V14 §2.8: "every id that names an entity of another document is written whole with that document's
namespace … the anchor's `site` and the card's `anchor` — while a document's own addresses are bare inside it"; V14 §2.2:
an attached card lives in "the entities block of the host document" and §2.3 the anchor in the host document — the same
document. V13 §2.5: "A document's own addresses are written bare inside it".

**Required change.** V14 §2.8's list drops "the anchor's `site` and the card's `anchor`" (bare, same document) and keeps
`SiteReach.site`, `.unit`, `SiteDocumentRef`, `adoptedFrom`, `EncounterAddress.doc` with its `arena`, `AdoptResult.addresses`.

### SW-22 — minor — owner V13 (the rows) and V14 (the lint) — `ZDecl` for the world's kinds is prose in V13 and an exclusion in V14

**Claim.** V14 §5.4's table: "V13's world kinds … | V13's own rows (declared there; excluded from this lint's list)";
T-V14-16: "V13's kinds excluded by name (C14-41)". V13 §5.7: "every world kind declares base = the DEM and top = the DEM
… or its surface (a `WaterSurface`: base the bed, top the surface)" — prose; BCR-V13-28's registry rows name "its stage,
its lineage unit, its anchor, its digest encoding, its export mapping, its `WhyProvider`, its edit kinds" and no `z`.

**Required change.** BCR-V13-28's column list gains "`z: ZDecl` (BCR-V14-5's column): `{ surface: 'dem' }` for the
rasters, routes, borders, glyph marks and `TerrainTrace`; `{ base: 'bed', top: 'elevationCm' }` for `WaterSurface` and
`SurfaceTrace`; `{ flat, reason: 'furniture' }` for a label candidate"; V14 §5.4's row reads "V13's own rows
(BCR-V13-28, with `z`)" and T-V14-16 lints them like every row.

### SW-23 — minor — owner V13 — BCR-V13-3 names the wrong base heading for the basement water-table rule

**Claim.** V13 §1.2: "the basement's water table … | §2.4 *Basements*"; §1b.1: "§2.4's basement gate"; BCR-V13-3's
heading: "§2.4 *Basements*: the water table is the groundwater function". The base's paragraph ("The **water table** is
the nearest water body's surface elevation …") stands at l. 1904, inside §2.6 (l. 1316–2250, *Buildings, heights and
ground datum …*); §2.4 is *Ways*. V04 §1b and V14 §1b.6, §3.3 cite "§2.6 *Basements*". The coherence pass applies a
request by its named heading.

**Required change.** V13 §1.1's H-STATE row, §1.2, §1b.1 (two rows), §1b.2's `classifyWater` row and BCR-V13-3's heading
read "§2.6 *Basements*".

### SW-24 — minor — owner V13 — the world's view keys are said to be BCR-V13-5's and are not in it

**Claim.** V13 §1b.1: "the view keys `worldZoom`, `worldLayer`, `showTraces`, `surfaceDate` (per viewer) | … | §2.9
(BCR-V13-5)"; §1b.3: "are view keys (§2.9)"; §2.1: the world document's `week` set "by the season control and, on a
host-bound world, by `WorldPort.clock(world, week)`, a view command in §11.3's `view.set { week }` form". BCR-V13-5's new
text adds `product`, `world?`, `charter?`, `worldRef?` and `namespace` and no view key.

**Required change.** BCR-V13-5 gains "§2.9's per-viewer view keys gain `worldZoom` (0–3, default 1), `worldLayer`
(V13 §5.1's thematic layer, default `relief`), `showTraces` (default false) and `surfaceDate` (a `Week`, default the
document's week); the world document's `week` key is set by the season control or `view.set { week }` (V13 §2.1)".

### SW-25 — minor — owner V13 — the surface-set digest V14 cites "V13 §2.7's form" for is not declared

**Claim.** V14 §2.4: "`waterStamp: Hash64; // the digest of the surface set in force at the key's week (V13 §2.7's form)`"
and `WaterClassReport.stamp: Hash64`; V14 §4.7, T-V14-11 read it. V13 §2.7 declares the model digest's `world` node and
the records digest, no per-week surface-set digest.

**Required change.** V13 §2.7 gains "**The surface-set digest.** `surfaceSetDigest(doc, week): Hash64` is the low 64
bits of `H128` over the canonical bytes of every `WaterSurface` in force at `week` (V13 §3.12.5's rule), in id order —
a derived reading V14's `waterStamp` and `WaterClassReport.stamp` carry (V14 §2.4) and the flood overlay's cache key"
and §1b.2 lists it.

### SW-26 — minor — owner V14 — `raiseLower`'s water row names a form V13 does not declare

**Claim.** V14 §4.6's table: "a water body | `level` | V13's water-level verb (`drawWater`'s `levelCm` form, dated)".
V13 §4.1 declares `setSurface { surface; levelCm?; stage?; date?; cause? }` with `verb` as the dated level edit and
treats "a user's `drawWater` lake with a `levelCm` form" as an edited attribute at creation only (§3.12.1).

**Required change.** The row reads "a water body | `level` | V13's `setSurface { surface: the body's present surface;
levelCm; verb }` (dated under `happened`)"; `floodSite` / `drainSite` (§4.3) fold to `setSurface` on the level's `site`
surface (SW-06).

### SW-27 — minor — owner V13 — a `happened` terrain stroke cannot carry a past date; V14 dates the site's terrain pre-edit at the construction layer's year

**Claim.** V14 §3.4 (b): "the request's `terrain` becomes one `setField { field: 'terrain', stroke }` in the site
document's creation prefix …, dated 'this happened' at the construction layer's year under V13 §4's first verb". V13 §4.1
gives `setSurface` a `date?: Week /* absent: the document's week under 'happened' */` and `setField` / `rerouteReach`
only `verb`; §3.14.1: a `happened` edit writes "the new surface with `date` = the document's week" and a trace at that
week.

**Required change.** V13 §4.1's `setField(terrain)` and `rerouteReach` (and `moveCourseKnot` with `verb`) gain `date?:
Week /* ≤ the document's week; absent: the document's week; forbidden under 'alwaysSo' (refuse.surface.date) */`, and
§3.14.1 reads "the trace and the dated record take `date` where given, else the document's week". V14 §3.4 (b) cites
`date`.

### SW-28 — minor — owner V14 — the deletion verbs are "cited to V13 §4" in §1.4 and "this volume's own semantics" in §4.3

**Claim.** V14 §1.4: "this volume's `destroySite` is 'this happened' and `removeSite` is 'this was always so', each cited
to V13 §4"; §4.3 (C14-30): "The two verbs are this volume's own semantics on the card: V13's `EditBase.verb` is read on
terrain and water edits only … so no `verb` field is read here"; §12: "that the two deletion verbs map to V13's two edit
verbs (J-V14.23, vetoable)". V13 §4.1 agrees with §4.3 ("ignored on every other kind").

**Required change.** V14 §1.4's sentence reads "this volume's **remove** and **destroy** carry the owner's two meanings
on the card (V14 §4.3, J-V14.23); V13's `verb` is read on terrain and water edits only"; §12's clause reads "that the two
deletion verbs carry the owner's two meanings without reading V13's `verb`".

### SW-29 — minor — owner V13 and V14 — §13.2's take-over line and §16's staged paragraph are each edited by both volumes; BCR-V13-19 states a total V13 says it does not state

**Claim.** BCR-V13-15 rewrites the base's l. 18363 to "(T-V1-n … T-V14-n, each volume's §7) … volume 13 adds the B-WORLD
corpus …"; BCR-V14-22 edits the same table ("the T-V14 rows and the fixtures B-SITE, B-CROP, B-25D; the no-op pins").
BCR-V13-19 rewrites l. 21559 ("… the world milestones M-W0 – M-W4 (V13 §8: 32 pw) follow M-SF …; §16's totals gain the
32 pw"); BCR-V14-20 adds "the rows M-ENC, M-SITE (A and F) and M-25D" to the staged table without their place against
M-W1 (M-SITE-F after it). V13 §8.2: "The volume states no total of its own (§16's rule; C13-45): M-W0 – M-W4 is priced as
one staged-milestone row in §16 with the estimate range 28–36 pw".

**Required change.** One merged text each, carried by V13's request and cited by V14's: BCR-V13-15 adds "volume 14 adds
the fixtures `B-SITE`, `B-CROP`, `B-25D` and the no-op pins `item132.none`, `item141.flat` (V14 §7)"; BCR-V13-19 reads
"the water state at the frame M-W0h after M4 (SW-14), the world milestones M-W0 – M-W4 (V13 §8: 28–36 pw as one
staged row) after M-SF, the encounter crop M-ENC after M1, the attached sites M-SITE-A after M6-U, the free sites
M-SITE-F after M-W1 and the 2.5D renderer M-25D after M4 (V14 §8)"; BCR-V14-20 and -22 read "the rows as BCR-V13-19's
and -15's merged texts place them". V13's "32 pw" is struck.

### SW-30 — minor — owner V13 and V14 — V06 §3.23 (2)'s `r` sentence is edited by both; V14's lifecycle has no row for V13's waterlogged decay

**Claim.** BCR-V13-22 rewrites "`r` is V11's decay rate per year …" to add "a building whose ground storey is `submerged`
or `swimming` … decays at `r × waterloggedFactor` … toward the `submerged ruin` state". V14 §3.8 and §10.2's V06
request: `decayLevel(doc, lineage: card, week)` "with `r` the unit's `SiteDamageRow.ratePerYear` by its material … in
place of V11's walls rate" (V06 §3.23's signature and Works-less branch (3) confirmed). V14 §2.5's lifecycle rows take
a `submerged` aggregate to `vacant` (cause `water`) and no row reaches `damaged` or `ruined` by water, while V13 §3.12.5
and §3.13.4 run permanent submergence "to `submerged ruin` at the waterlogged rate".

**Required change.** The coherence pass merges the two into one sentence of V06 §3.23 (2): "`r` is V11's decay rate per
year for the building's walls material …, or, for a world site's carved and natural units, the unit's material rate
(`SiteDamageRow.ratePerYear`, V14 §2.5); a lineage whose ground storey or lowest unit is `submerged` or `swimming`
under the present surface decays at `r × waterloggedFactor` …". V14 §2.5's lifecycle rows gain "vacant | occupied →
damaged | ruined   cause water (the aggregate `submerged` for ≥ `waterloggedWeeks` of the decay run)   transform decay
at `r × waterloggedFactor`" so the card's condition follows V13's rule.

### SW-31 — minor — owner V13 — BCR-V13-21 maps no water class to II.6's `flooded` condition

**Claim.** BCR-V13-21 makes "every element's `flood` admission … V13 §3.13's `classifyWater`" but names no class for the
condition; V04 §3.5.1 "An element whose floor lies below the water table is created `flooded`" (any depth); V14 §2.9's
access row: "a submerged entrance reads `flooded`" and `VerticalLink.state` carries `flooded`.

**Required change.** BCR-V13-21 gains "an element's II.6 condition `flooded` holds exactly when its class is `wading`,
`swimming` or `submerged` (`depthCm` > 0 at its floor sample), `damp` and `dry` leaving it as it was"; V14 §2.9's row
reads "an entrance whose unit's class is `wading` or worse reads `flooded`".

### SW-32 — minor — owner V13 and V14 — budget rows each cites of the other do not exist

**Claim.** V14 §6: "G3 (free-standing) | V13's score over its candidates (V13's budget row)" and "E1 (4) the world crop
frame | V13's `charterFor` at a transient placement (V13's row)". V13 §6 budgets W6a + W6b inside the one-click path and
the placement edit (P1 ≤ 40 ms, `nearestLawful` ≤ 600 ms, `requestCharter` ≤ 30 ms with P4 ≤ 10 ms) and no row for a
caller's score pass or a transient charter; V14's crop-frame row (10 · 16 ms) allots the charter 0 ms.

**Required change.** V13 §6's edit paragraph gains "a caller's score pass (V14's G3, the host's `proposals`) ≤ W6a's law
over the disc asked (≤ 230 ms over a continent, ≤ 30 ms over a 100 km disc; `WORLD-10`)" and the transient charter row
of SW-05; V14 §6's G3 row cites `WORLD-10` and its crop-frame row reads "V13's transient `charterFor` (≤ 10 ms,
`WORLD-9`) … 20 · 26 ms, inside the first frame".

### SW-33 — minor — owner V14 (bar 1, Q1) and both (the split bars) — the seventeen bars: bar 1 has no T- row, four bars have two owners, and V14 Q1 claims bar 13

**Claim.** Part E bar 1 ("A fourth `Layer`, a new role, concern and stage appended; every existing digest
byte-identical"): V13 §7.5 "Bars 1, 2 (the kernel's, M0's gate) … are V14's … and are not carried here"; V14 BCR-V14-3,
-14, -24 say "(bar 1)" but V14 §7's bar map (2, 6, 8, 10, 11, 12, 14–17) carries no row for it. Bars 7, 8, 10 and 12 are
carried by two rows each (T-V13-30 / T-V14-7; T-V13-9 / T-V14-23; T-V13-10 / T-V14-18; T-V13-8 / T-V14-12), the halves
declared consistently on both sides. V14 §11 Q1: "the in-town encounter crop ships after M1 … (bars 11, 13)" — bar 13
is V13's T-V13-21 (the eighteen drift tests, M-W1); the slip is the brief's §9 row's, repeated.

**Required change.** V14 §7 gains T-V14-32 (bar 1): "the `site` layer, `nextSitePart`, the `passage` role, the `site`
concern and the G-/E- stage ids appended: every golden of every rung hashes byte-identically (model, records, document,
arena) before and after, K1/K5/K6's append-only tests extended; PR" and its bar map "1 → T-V14-32". For each split bar
one row is the bar's owner and the other its named clause: 7 → T-V14-7 (its world clause T-V13-30 (a)); 8 → T-V13-9
(its site clause T-V14-23); 10 → T-V13-10 (its site and encounter clause T-V14-18); 12 → T-V14-12 (its classifier
clause T-V13-8); both volumes' bar maps say so. V14 Q1 reads "(bar 11; bar 13 is V13's T-V13-21)".

### SW-34 — minor — owner V14 (its claim) and V13 (`SiteInput`) — the naming hazard: the record prefix and the bare word

**Claim.** The spine: "The base's word is never redefined. The owner's things are **world sites** in prose and
`WorldSite*` in records". V14 §1: "the owner's persistent places are **world sites** in prose and `WorldSite*` in
records" — then V14 declares `SiteAnchor`, `SiteRequest`, `SiteProgramme`, `SitePolicy`, `SiteLevel`, `SiteReach`,
`SiteKnowledge`, `SiteHistoryLayer`, `SiteContextKind`, `SiteTerm`, the five `Site*Row`s, `SiteSiting`, `SiteAttach`,
`SiteAdopt`, `SiteCondition`, `SiteDocumentRef`, `siteOpen`, `siteEnvelopes`, and the bare value `site` as a `Layer`, a
`Recipe.product`, a concern, an `AccessPoint.source`, an `AccessCause.rule` and an address prefix — beside the base's
S1 Site, `@plat/site`, `SitePlanStrategy`, `SiteFeature`, the `siting` and `siteplan` concerns. V13 §1.3 names the base's
S1 input record "`SiteInput` = the charter" (item 140 M5) — a `SiteInput` beside V14's `SiteRequest` is the hazard the
spine forbids. Between the two volumes the usage is consistent (V13's `Placement.subject.kind 'site'`, `weights.site`,
`FrameCharter.sites` match V14's values).

**Required change.** V14 §1's naming paragraph states what it does: "the card is `WorldSite` and its host facts
`WorldSiteHost`; the records of `@plat/sites` carry the `Site` prefix (`SiteAnchor` …); the bare word `site` names V14's
things only as a `Layer` value, a `Recipe.product`, the `site` concern, an `AccessPoint.source`, an `AccessCause.rule`
and the address prefix `site<n>/` — listed here once, every other `site` in this volume the base's"; the spine's rule is
amended to match. V13 §1.3 strikes "`SiteInput` =" for "M5 … — the charter as `Recipe.charter` (BCR-V13-4; T-V13-23)".

### SW-35 — minor — owner V14 — the build plan's total does not sum, and Q3 quotes it

**Claim.** V14 §8's steps: SE0 0.75–1, SE1 2.5–3.25, SE2 1–1.5 (M-ENC 4.25–5.75); SE3 2–3, SE4 5–7, SE5 2.5–3.5, SE6
3.5–5 (M-SITE 13–18.5); V0 0.75–1, V1 2.5–3.5, V2 2–3, V3 1.5–2, V4 1–1.5 (M-25D 7.75–11); content 0.75–1 — the parts
sum to 25.75–36.25; the row and §11 Q3 state "26.75–37.25".

**Required change.** V14 §8's total row and §11 Q3 read 25.75–36.25 pw (or a step's estimate is corrected and the
total re-summed by the coherence pass, item 568's rule); INDEX's row (SW-15) takes the corrected figure.

### SW-36 — minor — owner V14 — the V03 stair core "of kind `secret`" is cited as V03 §3.3's and does not exist there

**Claim.** V14 §3.9 (a): "its descent to the building's lowest storey is a V03 stair core of kind `secret` the plan
places like any core (V03 §3.3's stair kinds)"; §2.3's comment and T-V14-13 likewise. V03 §3.3 S4's stair kinds are the
class row's (`spiral` among them) with no `secret`; V03 §3.7.3's "secret head" gives a `secret` access head its own
concealed `back room` on the head storey, not a core through several storeys. V14 §10.2's V03 row asks for the head rule
but names no new stair kind.

**Required change.** V14 §3.9 (a) reads "a V03 stair core of the new kind `secret` (the V03 request of V14 §10.2: a core
placed by S4 like any, its openings concealed by V03 §3.6 O6's rule, its head room V03 §3.7.3's concealed `back room`)";
§10.2's V03 row adds "S4's stair kinds gain `secret`".

### SW-37 — minor — owner V14 — V13's milestones are cited by stage ids

**Claim.** V14 §8: "after V13's W1 (the charter and placement) … the free half beside V13's W2"; "SE6 waits on V13's W1
(the charter, placement) and W6 (the score) — until W6 lands"; §1.4 "lands only after V13's W1–W5". V13's milestones are
M-W0h (SW-14), M-W0 – M-W4; W1 and W6 are the stage ids W-TERRAIN and W-SUIT (V13 §1.1), both inside M-W1.

**Required change.** V14 §8, §1.4 and J-V14.34 read M-W1 (the charter, placement, W6's score) and M-W2 (routes, polity)
where they say "W1", "W2" and "W6", and "V13's M-W1 (its W1–W5 stages)" where they say "W1–W5".

## 3 The brief's ten questions, answered; disposition by owning unit

| question | answer |
|---|---|
| (1) V14 §10.2's nine requests to V13 | (1) the plug-in interface and `attraction`/`routed`: partly honoured — the slot exists, the inputs, the `register` call and the term's name differ (SW-01); (2) the transient `charterFor`: not honoured (SW-05); (3) the memo and `waterStamp` names: not honoured (SW-17); (4) §5.1's sentence: half honoured, circular (SW-18); (5) W8's culture source: not honoured (SW-09); (6) the site glyph: contradicted (SW-08); (7) the `site` `WaterSurface` and the walk: not honoured (SW-06); (8) `setPlacement` with a site subject: compatible, unstated (SW-19); (9) `ReasonRecord`: honoured; the event index: not honoured (SW-07); the world view's projection: contradicted (SW-02) |
| (2) V13 §10.2's eight requests to V14 | R-V14-1 honoured in substance (the shape differs, SW-20); R-V14-2 honoured (one slip, SW-21); R-V14-3 contradicted on the jitter and the name (SW-03, SW-01); R-V14-4 honoured; R-V14-5 not honoured (SW-04); R-V14-6 honoured; R-V14-7 contradicted (SW-02); R-V14-8 contradicted (SW-08) |
| (3) base sections both touch | §2.1–§2.2: V14 only, consistent with V13's address forms; §2.8: `z` column missing from V13's rows (SW-22); §2.9: `product` edited twice (SW-13), V13's view keys unrequested (SW-24); §4.12: the `products` union (SW-13); §6.1: the `world.siting` row's V14 clause (SW-03); §7.1: consistent, `date?` (SW-27), `raiseLower`'s water row (SW-26); §7.3: V13 only, consistent; §8.2/§8.4: consistent; §11.1–§11.2: consistent, the surface-set digest (SW-25); §12: cross-cited rows missing (SW-32); §13.2 and §16: edited twice (SW-29); §14: consistent; V06 §3.23 (2): edited twice (SW-30); V04 §2.6/§3.5: the heading (SW-23), the `flooded` mapping (SW-31) |
| (4) the naming hazard | the base's "site" is never redefined in prose by either volume; the `site` layer value, product, concern, source and rule and the `Site*` records are consistent between the two volumes but contradict V14 §1's own `WorldSite*` claim and the spine; V13's `SiteInput` is the one collision (SW-34) |
| (5) the shared classifier | one signature (`classifyWater(unit, governing, thresholds)`, `governingSurface`, `routeClass`), one table (V13 §3.13.2), one class set (`dry`/`damp`/`wading`/`swimming`/`submerged`; `walkable`/`wading`/`swimming`/`diving`/`none`) in V13 §3.13, V14 §2.2, §2.4, §3.7 and BCR-V13-21's V04 readers; the mapping to II.6's `flooded` is unstated (SW-31) |
| (6) the two verbs and the fork | used identically: `verb` on terrain and water edits only, V14's `floodSite`/`drainSite`/terrain pre-edit through it, the deletion verbs V14's own; the fork through `forkAt` on both sides (T-V13-9, T-V14-23); a past `date` on a stroke is missing (SW-27), one wording slip (SW-28) |
| (7) milestones and build order | V13 M-W0 – M-W4 after M-SF and V14 M-ENC / M-SITE-A / M-SITE-F / M-25D are mutually consistent (M-SITE-F after M-W1), but V13's "first milestone" claim contradicts the order (SW-14), INDEX has no rows (SW-15), §16 is edited twice (SW-29), V14 names V13's milestones by stage ids (SW-37) |
| (8) owner questions | no question is answered differently by the two volumes (V13 Q1–Q3; V14 Q1–Q4; V14 Q2's "with V13's host changes" agrees with V13 Q2); V14 Q1's bar 13 (SW-33) and Q3's sum (SW-35) are slips |
| (9) item 140's gate | the union of both volumes' base requests touches the kernel only inside K1 (`Layer`), K5 (the `passage` role), K6 (concerns and stage ids), K9 (the transient arena's lifetime, `owner` unchanged) and reserves model records inside M1–M11 (the namespace, the carve delta and surfaces, `datumOf`, `waterTableAt`, the charter, `Placement`, `SiteAnchor`, `ReasonRecord`, `ZDecl`, `verticalEnds`, `projection`); the requests outside the enumerated rows are model and registry changes (BCR-V13-7's `StageDecl.txForm: 'records'` and `ProductDecl.coordinateRegime`, BCR-V13-9's edit kinds, BCR-V14-9's `raiseLower`, BCR-V14-5's registry column), each inside items 139 (d) and 141 (a)'s remit and none a kernel change — **no request lies beyond K1–K13 and M1–M11**; one *use* of the kernel does (SW-16: `delaunay` over world cm beyond §3.2 (1)'s range), fixed without a kernel row |
| (10) bars 1–17 | 2, 6, 11, 14, 15, 16, 17 → one T-V14 row each; 3, 4, 5, 9, 13 → one T-V13 row each; 7, 8, 10, 12 → two rows (halves) and 1 → none (SW-33) |

**Disposition by owning unit.** V13: SW-05, -06, -07, -09, -14, -16 (major), -17, -20, -22 (rows), -23, -24, -25, -27, -31
(minor), and its half of SW-01, -03, -08, -13, -19, -29, -30, -32, -33, -34. V14: SW-02, -04, -10, -11, -12 (major),
-21, -26, -28, -35, -36, -37 (minor), and its half of SW-01 (the plug-ins), -03, -08, -13, -18, -19, -22, -29, -30,
-32, -33, -34. INDEX.md (the coherence pass): SW-15, the merged texts of SW-13, -29, -30. The spine: its naming rule
amended by SW-34.

**Counts.** 37 findings: 1 blocker (SW-01), 15 major (SW-02 – SW-16), 21 minor (SW-17 – SW-37). By owner: V13 owns or
co-owns 24, V14 22, INDEX.md 1 (plus three merged texts).
