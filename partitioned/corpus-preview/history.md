# Corpus preview — HISTORICAL RESEARCH

> PENDING FABLE REVIEW — Opus-produced (corpus-preview/history), not yet checked by a Fable seat; PARTITIONED until the reconciliation stage.

Lane `corpus-preview/history`, 2026-09-26. A read-only, preliminary look at SettlementForge's historical-evidence
registry (`~/Desktop/settlement-engine/map-corpus/historical-evidence/`) and its three Wave-1 research documents and
expansion protocol, for the owner's question "does it give you more confidence?". Nothing here is an input to
`docs/ARCHITECTURE.md`, `docs/DEFINITION.md`, any rule table or any current workflow.

**Outcome in four sentences.** The historical research makes the *shape* of our realism model more credible and none of
its numbers: independent atlas scholarship describes towns the way our definition does — plots cut from the street
frontage, walls laid as dated projects around routes and existing fabric, suburbs at gates later swallowed by new
circuits, market foci, towns that shrink as well as grow, property lines that survive rebuilding, and buildings altered
part by part rather than rebuilt. It is silent on where prosperity sits in a town, on walls becoming ring roads, shorter
wall rings, stone robbing, noxious trades downstream and trade streets, and it witnesses plot joining and splitting only
in rural and single-building cases driven by desertion or inheritance, never by wealth. Its cases and its own evidence
law contradict four of our rules as we state them — a prosperity-driven material ladder, prosperity-driven heights,
"terrain and water never change" and one market per town (as our polycentric forms imply) — and its rural wave forbids
the kind of fixed order in which our decline strikes. Every witness proves possibility, never frequency — the registry
has no sampling frame, no cohort, no holdout and no usable dimension — so no ruled confidence number moves:
`docs/CONFIDENCE.md` grades parity with the references, and this evidence speaks only to historical realism, which that
document does not grade.

## §0 What was read, run and viewed

**Read in full (every line).**
- Corpus registry: `historical-evidence/README.md`; `manifest.json` (421 lines: 23 atlas programmes, 0 cohorts, 20
  mechanisms); `records.json` (1 055 lines, 32 records — every field rendered to a readable file by script and read,
  plus a census of every nested field so nothing was skipped); `expansion/HEEP-1/README.md`.
- Corpus documents: `HISTORICAL-URBANISM-EVIDENCE.md` (782 lines), `RURAL-SETTLEMENT-LANDSCAPE-EVIDENCE-WAVE1.md` (927),
  `ARCHITECTURAL-MASSING-EVIDENCE-WAVE1.md` (1 020), `HISTORICAL-EVIDENCE-EXPANSION-PROTOCOL.md` (699), and the corpus
  `README.md`.
- Ours: `docs/DEFINITION.md` (90), `docs/OWNER-INSTRUCTIONS-2026-09-25.md` (125), `docs/AMENDMENTS-2026-09-25b.md`
  (202).

**Read in part.** `docs/CONFIDENCE.md` §1 (the verdict) and §7–§8; `docs/ARCHITECTURE.md` by grep only — term counts
plus lines 396–404 (epoch conversions), 2878–2884 (polycentric forms) and single-line hits for tanneries,
subdivide/amalgamate and stone robbing — so that no mechanism is called absent from our design when it is there;
`partitioned/corpus-preview/plan.md` §0–§1 for the sibling lane's conventions.

**Executed (CONFIRMED).**
1. A script census of `records.json`: modes, roles, programmes, certainty aspects, represented periods and the record
   list behind every mechanism id (scratchpad `corpus/records_readable.txt`, `corpus/period_mech.out`).
2. The corpus's own read-only gate `historical_evidence_integrity.py`, copied to the scratchpad (`corpus/hei_copy.py`)
   with its docs path pointed at the corpus and run with `python3 -B`: `"status": "ok"`, 32 records, 20 mechanisms, 23
   places, 23 programmes registered, 8 with claim records, 0 prevalence cohorts, 0 cohort-statistic records, 32 of 32
   `CITATION_ONLY`, `prevalence_eligible: false`, `holdout_registered: false` (`corpus/hei_run.out`). Corpus timestamps
   were unchanged afterwards and no cache was written.

**Plates viewed: none (0).** The registry and both wave documents rule that the synthetic plates are a visual register
and never historical evidence (urban survey §11 and forbidden inference 22; rural §10.3), so no plate could witness or
contradict a historical mechanism. No plate id appears in this file, so the 53-plate holdout roster is untouched by
construction.

**Not read.** `GENERATION-SPEC.md` and `MORPHOLOGY-PLAN.md` (owner's partition rule); `historical-evidence.schema.json`
(the integrity gate validated the records against it); the HEEP-1 JSON and `.mjs` artefacts; the urbanism atlas and the
HF4 scrub list (no plates used).

**Incidental exposure, declared.** Three documents the brief required in full contain passages that describe
SettlementForge's own map design or code: section pointers into `GENERATION-SPEC.md` in each header, massing §3.3 (its
view of SettlementForge's prosperity-and-material law) and rural §8 (an audit of SettlementForge's sandbox rural
modules). I read them because they sit inside required documents. Nothing in this file adopts them; §1 cites only the
evidence principles (numbered forbidden inferences, `RM-*` candidate rows, case entries).

**Naming.** Real place names below are citations of registry records and research cases. They are not name material; our
settlement names stay original.

**Evidence tiers used in §1.** Every tier is a possibility witness only.
- **R** — a registry record: claim-sized, schema-validated, `CITATION_ONLY`; the record id is given.
- **D** — a case described only in the urban survey's text, with no registry record behind it.
- **W** — an entry in the rural (`RSL-W1-*`) or massing (`AM-*`) Wave-1 discovery logs: prose only, not in the registry,
  no validator.

## §1 Findings

### 1.1 What the registry is, in numbers [CONFIRMED by script and by the corpus's own gate]

| property | value |
|---|---|
| size | 32 claim-sized records about 23 places. Only 8 of the 23 registered atlas programmes carry a record: Germany 11, Ireland 9, Hungary 4, Britain 3, Poland 2, Italy, Denmark and France 1 each. |
| mechanisms | 20, every one `RESEARCH_ONLY`, with no temporal operation, no realisation stage and `activationWeightSource: null`. |
| sampling | no cohort, no sampling frame, no holdout; `prevalenceEligible: false`; status `EXPLORATORY_CASE_REGISTRY`. |
| how each claim is known | 14 text-asserted, 15 scholarly-interpreted, 3 directly depicted. All three direct depictions are 1833–1840 surveys (Carlingford, Downpatrick, Fethard frontage), not medieval sources. |
| source roles | 22 thematic analysis, 5 interpretive reconstruction, 3 base cadastre, 2 written gazetteer. |
| allowed uses | validation case 32, possibility witness 30, counterexample 5, mechanism design 2, cohort statistic 0. |
| certainty | 63 aspect ratings. No record rates MATERIAL. Of 15 alignment ratings, 9 are HYPOTHETICAL or UNKNOWN. |
| period | 24 of 32 records overlap 1100–1500 (our 12th–15th-century centre of gravity); only 4 lie wholly inside it (York c.1300, Buda 1240–1300, Biecz 1250–1375, Stary Sącz 1357–58); 8 are post-medieval only. |
| numbers | none usable. Every record's omissions strip coordinates, dimensions, counts and polygons, and the rights mode forbids geometry. |
| the two other waves | 30 rural entries and 30 massing entries exist only as prose. The expansion protocol (HEEP-1) that would turn all of this into cohorts failed its own hard metadata quotas: no town slate, no cohort, no holdout and no opened source exist yet. |

### 1.2 Our realism mechanisms against the evidence — the scoreboard

Verdict words: **WITNESSED** = at least one case shows it is historically possible; **PARTIAL** = the operation is
witnessed but not the driver our rule uses; **ABSENT** = no record or wave entry speaks to it; **CONTRADICTED** = a case
or the corpus's evidence law refutes the rule *as we state it* (usually as a universal). Our rules are taken from
DEFINITION §3 and §5, the owner instructions and amendments 8, 16–19. Verdicts are my reading of the sources
[PLAUSIBLE]; the record ids and quotations are CONFIRMED at source.

| # | our mechanism | verdict | strongest witnesses (tier) | what the evidence cannot say, or warns |
|---|---|---|---|---|
| 1 | plots cut from the street frontage, row houses along the street | **WITNESSED** | `HE-IE-FETHARD-FRONTAGE-BACKLAND`, `HE-PL-STARY-SACZ-PLAN-REALIZATION`, `HE-GB-YORK-SYMBOLIC-FRONTAGE` (R) | no plot width or depth anywhere; deep rear land does not imply a back lane; long later parcels are not proof of medieval burgages; rural holdings are not small burgages |
| 2 | prosperity as a smooth field that rises near centre, market, main streets and high dry ground and falls near tanneries, walls and damp low ground | **ABSENT** | none | the corpus refuses prosperity-to-morphology and prosperity-to-height laws without separate evidence (urban forbidden inference 18) |
| 3 | rich quarters join plots, poor quarters split them, leftover gaps become alleys | **PARTIAL** | joining under desertion `RSL-W1-ENG-02`; possible inheritance splitting `RSL-W1-DNK-01`; yards shrinking as houses crowd round a church `RSL-W1-FRA-01`; a building subdivided `AM-GB-02` (all W) | no urban case; the witnessed drivers are desertion, inheritance and crowding, never wealth; alleys born from leftover gaps are absent |
| 4a | the wall as a project laid where a walled town needs one | **WITNESSED** | `HE-IE-FETHARD-WALL-ROUTES`, `HE-PL-BIECZ-FORTIFICATION-UNCERTAINTY`, `HE-HU-BUDA-WALL-BEFORE-PLOTS` (R) | both orders occur: a wall before the plots (Buda) and a wall fitted tightly round existing plots (Fethard); a wall is not the settlement's hull and not only military |
| 4b | gates where routes arrive | **WITNESSED** | Fethard: gates meet the external approaches (R); gates arise from dated routes and circuits (D, Mühlhausen) | no gate count; gates are not evenly spaced portals |
| 4c | suburbs outside the walls | **WITNESSED** | `HE-DE-MUEHLHAUSEN-GATE-SUBURB`, `HE-IE-FETHARD-WALL-ROUTES`, `HE-GB-YORK-EXTRAMURAL`, `HE-DE-QUEDLINBURG-PRECINCTS` (R); Lviv 1766 plan, Biecz, London (D) | extramural growth need not occur at every gate; York shows built frontage and institutions outside the wall c.1300 |
| 4d | suburbs absorbed by a new circuit as the town grows | **WITNESSED** | `HE-FR-AGEN-SUCCESSIVE-ENCLOSURES` (a rampart absorbing eastern growth; a later circuit joining separate parts), `HE-DE-MUEHLHAUSEN-WALL-GENERATIONS`, `HE-HU-KOSZEG-WETLAND-EXPANSION` (R) | London (D): filling an inherited enclosure need not produce a concentric new ring |
| 4e | walls become ring roads | **ABSENT** | none; the nearest is "superseded circuits may persist" (D, Mühlhausen) — the line persists, its conversion to a street is not recorded | see §3 item 3 |
| 5a | decline: houses empty, the town shrinks | **WITNESSED** | Newport: a later grid laid over earlier plots, then contraction and long stagnation (D only); Greetwell growth–contraction–recovery–decline `RSL-W1-ENG-06`, Gainsthorpe, Marsleben, Eldbotle, Saint-Gilles, Hound Tor (W) | causes are often recorded as UNKNOWN; the rural wave forbids a universal abandonment cause |
| 5b | vacant plots become gardens and fields | **WITNESSED** (loosely) | agriculture resumes after abandonment at Saint-Gilles `RSL-W1-FRA-01` and Hound Tor `RSL-W1-ENG-03` (W) | rural cases only; land use can continue after dwellings go |
| 5c | houses robbed for stone; salvage feeds nearby building | **ABSENT** | the nearest: Les Tierces `RSL-W1-FRA-02` names planned recovery of portable objects as one explanation among several; reused timbers in `AM-GB-WA-05`, `AM-NO-18` (W) | building-stone robbing and a salvage geography are not recorded anywhere |
| 5d | a shorter inner wall ring replaces the old one | **ABSENT** | every successive-enclosure record expands or joins; none contracts | London's retained Roman enclosure with breaches (D) is the only neglected-wall observation |
| 5e | regrowth on the old plan | **WITNESSED** (post-fire cases only), with a counterexample | Bryggen rebuilt on its old property structure after the 1702 fire `AM-NO-19`; Nyborg's merchant complexes kept their function through post-1797 rebuilding `AM-DK-20` (W) | Magdeburg `HE-DE-MAGDEBURG-RUPTURE` (R): destruction in 1631, a century of rebuilding and a later fortress programme — change can be discontinuous |
| 5f | where decline strikes first: suburbs, then marginal ground, then the intramural periphery; the core holds | **ABSENT**, and warned against | none | rural forbidden inference 20: "No universal abandonment cause or LIFO decay"; fields keep being worked after abandonment |
| 5g | during decline "terrain and water never change" (amendment 8b) | **CONTRADICTED** as stated | `HE-IE-GALWAY-RECLAMATION` (shoreline is "a time-varying substrate"), `HE-DE-BRAUNSCHWEIG-HYDROLOGY` (canalisation altered streets and parcels), `HE-HU-KOSZEG-WETLAND-EXPANSION`, `HE-DK-RIBE-HYDRAULIC-STREET` (a mill dam became a principal street) (R); windblown sand at Eldbotle (W) | urban forbidden inference 14; most witnessed change is engineered during growth, some (sand, silting) happens in decline |
| 6 | noxious trades at the edge and downstream; tanneries lower prosperity | **ABSENT** | the nearest: possible peripheral metalworking at Köckte `RSL-W1-DEU-02` (seen only because a trench sampled the edge) and a silo district pushed outward at Saint-Gilles (W) | the rural wave says never universalise "industry outside" (RM-13); mills attached to flowing water **are** witnessed: `HE-HU-KOSZEG-HYDRAULICS`, `HE-DK-RIBE-HYDRAULIC-STREET` (R) |
| 7a | the market as a focus | **WITNESSED** | `HE-IE-KILKENNY-COMPONENTS` (R); Fethard's funnel-shaped market street, Dublin's ford-route-market, Stary Sącz's street market and later square (D) | — |
| 7b | one market per town | **CONTRADICTED** as a universal | two weekly markets for two quarters `HE-HU-BUDA-MULTIPLE-MARKETS`; market foci per component at Kilkenny (R) | the registry allows a second market only from a second quarter, function, authority or dated right; our polycentric form rows put a single market at the best nucleus (ARCHITECTURE ≈ line 2882) |
| 7c | uses resist moving for small changes (amendment 17c) | **WITNESSED** | Trim: a second planted borough did not automatically displace the established market (D) | one case; says nothing for 17b's "markets and shops drift toward where people now live" |
| 7d | trades cluster on streets; inns at gates and main roads; bakeries near mills; smiths away from thatch | **ABSENT** | the Kőszeg mills-and-inns sheet was inspected (D) but no inn placement is recorded | — |
| 7e | warehouses at the waterfront | **WITNESSED** | Bryggen harbour sheds and storage rows `AM-NO-19`; a quay building in a multi-court complex `AM-FR-10` (W); docks at Galway (R) | building-scale cases, no siting rule |
| 7f | cathedral and market central | **not supported as a default** | a detached cathedral precinct at Downpatrick (D); a cathedral-centred component separate from the castle borough at Kilkenny (R) | urban forbidden inference 12: a prominent castle, church or market does not imply a one-centre street system |
| 8 | village ladder thorp → hamlet → village as population bands; fields and woods sized to the population | forms **WITNESSED**; ladder **ABSENT**; several likely defaults **CONTRADICTED** | farms, hamlets, villages, townships and seasonal places all exist (Historic England guide, W); Sweetworthy `RSL-W1-ENG-05`: about eleven buildings, only three or four of them houses (W) | no tier-to-form or tier-to-common table; nucleated and dispersed are not a binary; building count is not household count; the countryside is not what is left over after the town; no Wave-1 entry carries any numeric parameter, a field area per head included (rural §6) |
| 9a | buildings composed of wings, ranges and courts (Fantasy-Manor style) | **WITNESSED** (strongly) | Upton Cressett `AM-GB-01`, Old Leckie `AM-GB-SC-07`, Rothe House `AM-IE-09`, Springweg `AM-NL-15`, Strasbourg `AM-FR-10` (W) | no counts or dimensions; "one semantic building, many mass parts" |
| 9b | a new use mutates the old building, never re-rolls it (amendment 18) | **WITNESSED** (strongly) | inserted floors, encasement, replaced facades over surviving cores, added rear ranges: `AM-GB-01`, `AM-GB-02`, `AM-GB-WA-06`, `AM-NL-15`, `AM-NL-16`, `AM-GB-05` (W) | the corpus's alteration vocabulary (ADD_PART, INSERT_FLOOR, REPLACE_FACADE, SUBDIVIDE, AMALGAMATE) is close to ours |
| 9c | heights and storeys scale with prosperity | **CONTRADICTED** by the evidence law | massing §5.3: prosperity to height is "refused"; function sets vertical form (a hall, a barn, a warehouse) and slope changes apparent storeys (`AM-DE-14`, `AM-PL-23`) (W) | the owner's heights are imaginary and used for shadows only, so this bears on realism, not on the map |
| 9d | materials climb with prosperity: wattle and thatch → timber and tile → stone and slate (amendment 19a) | **CONTRADICTED** as a universal | Casa Manca `AM-IT-26`: a two-storey, about 9 m street range with an unfired earth-brick upper storey, named "a direct counterexample to WEALTH_OR_HEIGHT -> STONE"; brick replacing earth infill without proving a prosperity shift `AM-DE-13`; mixed and reused material `AM-NO-18` (W) | massing §3.2 lists rich-means-stone, poor-means-earth and a universal material-grade ladder as overclaims |
| 9e | rich quarters: fewer, bigger buildings with bigger yards and courts | **PARTIAL** | merchant and institutional complexes with courts, galleries and carriage passages exist (`AM-IE-09`, `AM-FR-10`, `AM-DK-20`, `AM-GB-03`) (W) | "an annex count or courtyard count determined directly by prosperity" is named as not licensed |

Tally over the 28 rows [CONFIRMED by a script over this table]: 13 WITNESSED (5b is a loose fit, 5e rests on post-fire
rebuilds and carries a counterexample, 7c rests on one case), 2 PARTIAL, 7 ABSENT, 5 CONTRADICTED as we state them (7f
is a soft default that two cases contradict) and 1 mixed (row 8).

### 1.3 Notes behind the scoreboard

**Frontage plots (row 1).** The only direct depiction is Fethard's c.1840 survey: dense Main Street frontage with long,
narrow parcels running back into rear land, with the date of every boundary UNKNOWN. The in-period witness is Stary
Sącz, a scholarly reconstruction of a 1357–58 regulation whose theoretical module was deformed by inherited routes,
water and a monastery (alignment HYPOTHETICAL). York's frontage tone can separate occupied frontage from rear land but,
by the atlas's own note, cannot give plot or building depth. The urban survey adds Fethard's warning that the later wall
"left no continuous back lane" and that plot measurements do not prove uniform original burgages. The rural wave adds a
hard rule for our village ladder: rural frontage-and-backland holdings are conditional on a planning or tenure cause
(Newbold, Yarwell) and are rejected as universal by four cases (Stock, Hound Tor, Sweetworthy, Rheeze); an urban plot
depth ratio may not be reused for crofts or farmyards (rural forbidden inference 1). The building-scale cases show what
sits on such plots: Morlaix's narrow merchant house with a plot that widens toward the court (`AM-FR-12`), Bryggen's
gable-first commercial rows, Strasbourg's four buildings round three courts.

**Prosperity (row 2).** No record or wave entry says where wealth sat inside a town. The nearest facts are social, not
economic: Buda's two markets served socially distinct German and Hungarian quarters; Kőszeg grew onto low, wet, drained
ground after its core (silent on who lived there). The corpus's law is explicit that prosperity may change occupation,
maintenance, use and material condition but not rewrite inherited streets without a dated construction event (urban
§10.5), that investment, status, institutional capital, repair and age are "not interchangeable wealth proxies" (massing
§4 item 9), and that status must be documented, never inferred from height or material (massing §6.3). Greenery and
parks by prosperity have no witness either.

**Joining and splitting (row 3).** The closest match to our decline rule 8(c) — "surviving households absorbing
neighbouring plots" — is Gainsthorpe, where property amalgamation accompanied piecemeal desertion. Østergård shows seven
occupied and three empty tofts around 1200 after one earlier elite farm, with inheritance subdivision possible but not
certain and tofts shifting toward garden plots. Saint-Gilles shows courts and gardens shrinking as houses concentrated
round a new church and storage moving outward. None of these ties joining to wealth or splitting to poverty, and the
urban survey names "parcel amalgamation/subdivision" only as a design direction (§10.5) without a case.

**Walls, gates and suburbs (row 4).** The registry treats every wall as a dated project with purpose, funding, terrain
and access prerequisites, and lists as forbidden: settlement hull ⇒ wall, gate ⇒ evenly spaced portal, wall ⇒ purely
military, one murage grant ⇒ exact circuit or date. Buda and Fethard together show both temporal orders (wall first,
plots first). Agen shows four successive enclosures, one absorbing growth outside the earlier line and one joining
previously separate parts — the clearest witness in the registry for our "suburbs are absorbed". Nothing records a wall
line turning into a street.

**Decline and regrowth (row 5).** The single urban contraction witness, Newport (a Historic England research report: an
earlier trading place whose plots constrained a later grid, followed by contraction and long stagnation), has no
registry record; the survey itself says to use it only through claim-sized records that do not yet exist. It witnesses
shrinking, not regrowth. The rural wave supplies the texture our amendment 8 asks for — vacancy, amalgamation,
relocation, removal or recovery, burial, and agricultural reuse (its candidate RM-14) — and insists that each of those
be a typed operation whose cause may stay UNKNOWN. The only witnesses for "regrow on the old plan" follow fires, not
population decline: at Bryggen, rebuilding after the 1702 fire followed the earlier property structure, although only
about a quarter of the earlier complex survives; at Nyborg, merchant complexes kept their function through post-1797
rebuilding in more masonry. Magdeburg's 1631 destruction witnesses a class of change — sudden rupture and partial
replanning — that our definition does not include (its decline is driven by population, and the owner's war example was
ruled hypothetical and kept out of the design); the urban survey's warning that "a rupture may rewrite only part of the
fabric" and "does not authorize whole-map reroll" matches our local-repair rule.

**Water and ground (row 5g).** Four registry records make water and buildable land time-varying: Galway's docks and
reclamation, Braunschweig's canalised river branches, Kőszeg's drained wetland, Ribe's mill dam that became a principal
street. Our amendment 8(b) says terrain and water never change during decline, and a grep of `ARCHITECTURE.md` finds no
reclamation operation (0 hits for "reclam") [PLAUSIBLE that none exists under another name].

**Trades and markets (rows 6–7).** The registry has no record naming a tannery, dyer, butcher or any other noxious
trade, and no downstream or downwind siting claim; it does witness mills attached to channels and flow (Kőszeg, Ribe),
which bears on our supply-chain templates' "mill on water". Buda and Kilkenny witness more than one market focus, each
tied to a quarter or component; the registry's rule is that a second market needs a second cause, not a layout wish.

**Villages (row 8).** The rural wave was built to stop an urban template being reused for the countryside. Its forbidden
inferences include: no mandatory urban core; no wall, gate or radial-road grammar for villages; no universal nucleation
law; no tier-to-common table ("thorps, hamlets and townships can possess common rights; a village need not have one
central green"); no one-house-per-holding rule; no countryside as urban leftovers. Sweetworthy's eleven-odd buildings
with only three or four houses make "building count is not household count" a direct caution for any
population-to-building-count law on the village ladder. The Danish national strategy adds a bias warning: excavation
over-represents abandoned single farms and thorps while continuously occupied village cores stay under-dug.

**Massing (row 9).** The massing wave's governing line is that "height is not a prosperity multiplier, one footprint is
not necessarily one building volume, and a present roof or facade is not necessarily the date of the fabric behind it."
It supports composite, phase-owned buildings and part-by-part alteration strongly, and refuses both a prosperity-height
law and a universal material ladder. The smith case our amendment 19 uses as its example has one witness, Market
Bosworth (`AM-GB-05`, late eighteenth century): a two-storey house and a one-storey forge share a chimney across a
straight joint, and two rear workshops added in turn make the working complex an L and the whole property a U — growth
by function-specific additions over time, not a prosperity template. Party walls default to UNKNOWN in the corpus's
instrument, "never inferred merely from touching polygons".

### 1.4 Other registry mechanisms our design touches

| registry mechanism | records | our design (DEFINITION, or ARCHITECTURE by grep) | reading |
|---|---|---|---|
| multi-nuclear accretion, persistent seams | 6 and 3 (R); planned control `HE-DE-HERRNHUT-PLANNED` | twin-town and polycentric form rows site 2–3 nuclei at once | the evidence describes nuclei with separate, dated causes that merge later and keep seams; ours are sited together from a form choice [PLAUSIBLE] |
| institutional precinct | `HE-DE-QUEDLINBURG-PRECINCTS`, Trim, Kilkenny (R) | precinct reservations | consistent; the registry forbids institutions as point symbols without precinct and access |
| hydraulic spine, crossing hinge | 3 and 3 (R) | river placed relative to the site; bridges | consistent in kind; the registry makes channels and crossings dated and changeable |
| wetland and port reclamation | 2 and 1 (R) | none found | a witnessed growth mechanism we lack |
| topographic ribbon | Carlingford (directly depicted, c.1835), Biecz (R) | routes over real terrain | consistent in kind |
| planned intent versus realisation | Stary Sącz, Biecz, Herrnhut (R) | not checked | the registry keeps the intended module and the built result as separate objects |
| inherited sacred enclosure | Kells (R), with Downpatrick as the counterexample | none | a monastic origin must not force a circular plan |
| rupture and discontinuous rebuild | Magdeburg, Mühlhausen (R) | not in our definition (decline is population-driven) | noted only |

## §2 What raises confidence

**Direct answer to the brief.** Yes, but only for the structure of our realism rules. The research makes it more
credible that our town model has the right *kinds* of parts and the right *kinds* of change. It does not make any of our
numbers, or any rule driven by prosperity, more credible. None of this touches the parity numbers in
`docs/CONFIDENCE.md`, which measure how closely we can match MFCG, VG, NG and FTG, not how historical our towns are.

1. **An independent programme arrived at the same model shape.** The urban survey's closing ruling asks for "one dated
   causal world", typed operations, "persistent lineage through accretion, merger, wall projects, reclamation, rupture
   and reuse", and local rather than global change. Its historically common order — substrate and long routes, then
   nuclei and institutions, then growth or merger, then route, wall and water projects, then frontage and parcels, then
   infill, reclamation, rupture, abandonment and rebuilding (§8.1) — is close to our generation order with the history
   engine on top, and like us it keeps historical time separate from the engine's stage order. This is convergence of
   two designs from different starting points, not calibration.
2. **Our best-witnessed rules are the ones about change.** "A new use mutates the old building, never re-rolls it"
   (amendments 18 and 22) and "a building is several parts" have the strongest witness sets in the corpus: at least five
   massing cases each (rows 9a–9b). The urban survey's own rules — a rupture "does not authorize whole-map reroll"; a
   citation added on Tuesday "must not silently change every existing or future seed on Wednesday" — match our "nothing
   that survives is re-rolled".
3. **The owner's "growth, regression and growth" is historically real.** Greetwell grew, contracted in the fifteenth
   century, recovered and declined again (`RSL-W1-ENG-06`); Newport grew a grid over older plots and then contracted and
   stagnated (D).
4. **Two specific amendment rules have direct witnesses.** Amendment 8(c)'s "surviving households absorbing neighbouring
   plots" matches Gainsthorpe's amalgamation during piecemeal desertion (W). Amendment 17(c)'s inertia of uses matches
   Trim, where a newly planted borough did not automatically displace the established market (D).
5. **Walls, gates and suburbs behave as our evolution image expects.** Walls are fitted to routes, terrain and existing
   plots, gates meet the approaches, suburbs grow outside some gates, and later circuits absorb them (Fethard, Biecz,
   Buda, Mühlhausen, Agen, York — all R).
6. **The witnesses are well governed.** The registry passes its own integrity gate (CONFIRMED, §0), and every claim
   carries its source role, represented period, per-aspect certainty and coverage. Where it witnesses a possibility, the
   witness can be trusted as a possibility.
7. **It hands reconciliation a ready-made list of failure modes.** The urban survey's 22 forbidden inferences, the rural
   wave's 22 and the massing wave's list of overclaims are a checklist against over-regular or over-tidy output — the
   "realism is the tiebreaker" rule in usable form.

## §3 What lowers confidence

1. **No numbers, now or later.** No record carries a usable dimension, rate or count, and the rights mode forbids
   geometry. Our definition says rules are data "later calibrated against real towns"; this registry cannot do that
   today, and the expansion that would (HEEP-1) has not started — its first metadata frame failed its own quotas. Even
   when it and its rural and massing children finish, their law says they yield only conditional engineering ranges and
   dimensionless relations; occurrence rates, count distributions and activation weights stay `NOT_IDENTIFIED` unless a
   separate probability-sampling study is authorised.
2. **Prosperity, our central lever, has no witness.** The owner's plot model turns on prosperity: plot joining and
   splitting, building size, yards and courts, materials, heights, greenery, even floating islands. The registry says
   nothing about where wealth sat in a town and refuses prosperity-to-height and prosperity-to-morphology laws without
   separate evidence. The material ladder in amendment 19(a) is contradicted as a universal by named cases (Casa Manca
   `AM-IT-26`, Dedendorf `AM-DE-13`, Panengstuen `AM-NO-18`), though Casa Manca itself is dated only "XX" (§3 item 8).
   The realism of our most distinctive feature therefore rests on our own reasoning, not on this evidence.
3. **The signature time conversions are unwitnessed.** Wall → ring road is the one incremental path `ARCHITECTURE.md`
   builds and tests at M4 (lines 398–403); the registry has no case of it, nor of a shorter wall ring, nor of stone
   robbing or salvage clustering near new building. *Outside the registry, from general knowledge and not verified in
   this lane:* the best-known wall-to-boulevard conversions (Paris from 1670, Vienna's Ringstraße from 1857) are
   post-medieval, so whether this conversion belongs in a 12th–15th-century centre of gravity is an open question.
4. **Our decline order is the kind the rural wave forbids.** Amendment 8(c) fixes where decline strikes first (suburbs,
   then marginal ground, then the intramural periphery). The rural wave forbids "universal ... LIFO decay", records most
   abandonment causes as UNKNOWN, and shows fields worked on after dwellings are gone.
5. **"Terrain and water never change" is contradicted** by four registry records (row 5g), and a reclamation or
   canalisation operation appears nowhere in our design (0 grep hits for "reclam") [PLAUSIBLE].
6. **One market per town is contradicted** by Buda and Kilkenny, and "cathedral and market central" is not supported as
   a default (row 7f) [PLAUSIBLE that our design is single-market: DEFINITION names one market and the polycentric rows
   place one].
7. **The village ladder meets explicit refusals.** No tier-to-form or tier-to-common table, no nucleation law, no
   burgage-to-toft reuse, building count ≠ household count. Our finishing step sizes fields and woods to the population
   after the town exists (DEFINITION §3.8), which is the "countryside as urban leftovers" pattern the rural wave rejects
   (rural §7 item 15; its Dublin-module entry says supply, routes and rural production must be upstream of, or derived
   together with, the town) [PLAUSIBLE reading of our design from DEFINITION alone].
8. **The in-period anchor is thin.** 24 of 32 records overlap 1100–1500, only 4 lie wholly inside it, and all three
   direct depictions are 1833–1840 surveys. The rich building complexes are 1594–1610 (Rothe House), seventeenth century
   (Nyborg), post-1702 (Bryggen) and late eighteenth century (Market Bosworth); Casa Manca's catalogue date is only "XX"
   (by Italian catalogue convention a century label, the twentieth) [PLAUSIBLE reading]. Headline counts overstate what
   is known about our centre of gravity.
9. **The sample is concentrated.** Germany and Ireland supply 20 of the 32 records; each massing country supplies one to
   five buildings.

## §4 Limits of this evidence

- **Possibility, never prevalence.** Every record allows only possibility-witness, counterexample, validation-case or
  mechanism-design use; `prevalenceEligible` is false and no cohort exists (CONFIRMED by the gate). A witness cannot say
  how often anything happened, and "not observed in this survey" is not "historically absent".
- **Exploratory Wave 1.** The registry calls itself an exploratory case registry and forbids relabelling it as
  calibration. HEEP-1 has no slate, cohort or holdout; the rural (`RSLP-1`) and massing (`AMP-1`) child programmes are
  unbuilt.
- **Uneven tiers.** Only the 32 urban records are registry-backed. The 60 rural and massing entries are prose with no
  validator, and one rural inspection claim is not reproducible (the Rheeze source returned HTTP 404 at the corpus's own
  recheck). Several urban cases — Newport, London, Limerick, Lviv, Halych, Luxatlas — have no record at all.
- **Source bias.** Listed buildings, excavated deserted sites and survey-era plans over-represent the durable, the
  exceptional and the abandoned; continuously occupied village cores and ordinary rear ranges are under-recorded
  (massing §8; the Danish strategy in rural §4.3).
- **Blind spots by design.** Town atlases cannot supply height, storeys, roofs or materials (urban §10.6), and the
  expansion protocol forbids using its frame for population, building-height, material, lighting or body-count
  calibration (HEEP-1 §1). Our population-to-size law can never be calibrated from this programme.
- **Rights.** Everything is citation-only: no geometry, symbols or pixels. Even a perfect witness can inform a predicate
  or a dimensionless relation, never a shape template.
- **Scope.** European towns only (`EUROPEAN_FANTASY_BASE`). Nothing bears on the fantasy toggles, and there is no urban
  sewer witness (only buried drains under a Norwegian farm cluster, `RSL-W1-NOR-01`, and Ribe's channels).
- **This lane's own limits.** No plate was viewed. No external source was opened: every characterisation of an atlas,
  report or building is the registry's own paraphrase, not independently checked. Our design was read through
  DEFINITION, the owner instructions and amendments 8–22, plus greps of `ARCHITECTURE.md`, so every "absent from our
  design" statement is PLAUSIBLE. The verdicts in §1.2 are my judgment; the counts, record ids and gate results are
  CONFIRMED.

## §5 What the reconciliation stage will need from it

1. **A reviewed mapping table.** §1.2 is a first draft: each of our rules, the registry mechanism id and its
   prerequisite classes (manifest), the verdict, and the tier of the best witness. A Fable seat should re-check every
   CONTRADICTED and ABSENT verdict before anything leans on it.
2. **Evidence of the right kind for the absent rules.** Most of our unwitnessed rules are not questions a town atlas can
   answer. Where wealth sat needs documentary sources such as tax and rent rolls; wall-to-street conversion and
   contracted circuits need dated fortification histories; noxious-trade siting needs occupational and regulatory
   records. None of these is in HEEP-1's scope: its question 4 only routes atlas-unanswerable questions to the rural and
   massing programmes, and neither covers them. Reconciliation will need to decide whether to commission such research
   or to keep these rules as declared design choices.
3. **Conditional restatements of the contradicted rules.** Each one can survive as a mechanism with an explicit cause
   rather than a universal: materials from a local-resource and period fact with prosperity as one input; water and
   buildable ground changed only by dated operations (reclamation, canalisation, dams, silting); a second market only
   from a second quarter, function or authority; heights from function and capacity; a decline order stated as our
   design default, not as history.
4. **A ruling on seeded variety.** The corpus's law says a mechanism activates only from an explicit world fact or from
   a separately authorised probability study, never from a default random draw (activation weight `NONE`). Our generator
   draws walls, forms and districts from the seed. Reconciliation must rule that our seeded choices are product choices,
   not historical frequency claims; otherwise every drawn feature collides with the corpus's governance.
5. **Period tagging.** Carry each witness's represented period and weigh in-period (1100–1500) witnesses above
   nineteenth-century surveys and post-medieval buildings.
6. **Base-first discipline.** No calibrated number will arrive from HEEP-1, RSLP-1 or AMP-1 until they pass their gates,
   and even then only conditional ranges. Owner, 2026-09-25: "what you have built is always the BASE". The evidence can
   narrow and annotate our tables; it cannot replace them.

## Fable review (2026-09-27) — B-corpus-preview/history

**Verdict: CONFIRMED** (annotations only). Reviewer: Fable 5.1, lane fable-review/main/manager-corpus; full record
docs/fable-review/main/manager-corpus.md. Registry counts, record ids and case descriptions are accepted on this file's
script output: the reviewer may not open the corpus.

- **Method:** sound — no plate viewed, the integrity gate copied and run read-only, the incidental exposure to passages
  about SettlementForge's own modules declared and nothing adopted.
- **Recount of §1.2** (28 rows): WITNESSED 13 (1, 4a, 4b, 4c, 4d, 5a, 5b, 5e, 7a, 7c, 7e, 9a, 9b), PARTIAL 2 (3, 9e),
  ABSENT 7 (2, 4e, 5c, 5d, 5f, 6, 7d), CONTRADICTED 5 (5g, 7b, 7f, 9c, 9d), mixed 1 (8) — the tally 13 / 2 / 7 / 5 / 1 holds.
- **The "contradicted as stated" rules against the current design.** This file judged the rules as they stood at 00:34 on
  2026-09-26; J27 and J28 re-worded the over-strong ones the same night and pass b landed them. 5f (a fixed decline order)
  → docs/ARCHITECTURE.md §4.11's weighted strike lottery over an exposure field with a chance share ("a weighted tendency,
  not a law", J-A8.41). 5g ("terrain and water never change") → amendment 25's slow conversions: TerrainWaterOp
  (reclaim, siltReach, shiftCourse, digCanal) in §4.11, LandUse.reclaimed in §2.7. 7b (one market) → amendment 24's N
  markets by size (§4.2) on MFCG's and FTG's behaviour. 7f (cathedral and market central) → the principal market's
  trade-convergence score, "central by default in MFCG-style towns, not by law"; the cathedral stays at the plaza as MFCG
  places it (emulation first). 9d (a universal material ladder) → amendment 19 (a)'s FTG material model with an optional
  regional table, a material a rendering attribute only. 9c (heights and storeys scale with prosperity) remains as the
  owner stated it ("scale appropriately in size and structure … all buildings across prosperity bands") and is a
  reconciliation-stage realism item, more visible once item 68's height-aware shadows land — an owner rule, not a change now.
- **Row 4e and §3 item 3:** wall → ring road stays the owner's design choice (J27), built and tested at M4 (§16, D-25); the
  Paris/Vienna remark is correctly labelled unverified general knowledge.
- **Stale line numbers:** "ARCHITECTURE ≈ line 2882" (polycentric forms) and "lines 396–404" (epoch conversions) are
  pre-consolidation; cite §4.2 S3 and §4.11 (wallToWay).
