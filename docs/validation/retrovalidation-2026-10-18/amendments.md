# Retrovalidation 2026-10-18 — lane retrovalidation/amendments (Fable 5.1, J390/J392)

Lane: `retrovalidation/amendments` — Fable 5.1, the validator of the amendment family "amendments": files
`docs/AMENDMENTS-2026-10-17m.md`, `-n.md`, `-o.md`, `-p.md`, `-q.md` (items 659–925), their application records
`docs/validation/coherence/realm-m.md`, `lens-n.md`, `lens-o.md`, `lens-p.md`, `lens-q.md`, their critics
`realm-m-critic.md`, `lens-n-critic.md`, `lens-o-critic.md`, `lens-p-critic.md`, `lens-q-critic.md`, and the applied
targets as they stand on 2026-10-18 (V13 §3.9, §5.8, §5.9, §8.5, §9, §10, §11, §12 especially; V14; the proposal; the
brief; the base; INDEX; SUMMARY). Written on Opus 5.5 under the J375 delegation; this is the retrovalidation the owner
called on 2026-10-18 ("now"), continued after the first workflow run was killed by the usage limit (fable; J392).

Status: IN PROGRESS (started 2026-10-18 04:59Z). Written as it goes; the LANDED line in `docs/lane-events.log` closes it.

## Inputs read whole

Files `docs/AMENDMENTS-2026-10-17m.md` (2 441 lines), `-n.md` (2 007), `-o.md` (1 231), `-p.md` (677), `-q.md` (920) — every
item 659–925, every *Evidence* line, every preamble, review and verification record; `docs/AMENDMENTS-2026-10-18r.md`
(262; the owner's word, placement only); the five application records `docs/validation/coherence/realm-m.md`, `lens-n.md`,
`lens-o.md`, `lens-p.md`, `lens-q.md` and the five critics `realm-m-critic.md`, `lens-n-critic.md`, `lens-o-critic.md`,
`lens-p-critic.md`, `lens-q-critic.md` (whole); the verifier's `amendments-verify.md` and `amendments.findings.json`
(whole); the re-judged rulings `rulings.md`, `rulings.verdict.json`, `realm.md`, `realm.verdict.json`, `lenses.verdict.json`
(whole) and every non-research correction of the other landed verdict JSONs (faith, population, prosperity, small, scripts;
so no design fragment below duplicates or contradicts one of theirs); the owner's rules `docs/AMENDMENTS-2026-10-16j.md`
(whole; file k's head and item list — file k is the volumes' base change requests, carrying no owner word beyond file j's);
`docs/PROGRESS.md` rows J377–J391 (the owner's words the items quote, and the rulings they encode); the applied targets
as they stand on 2026-10-18: `docs/volumes/V13-world.md` — its head notes (:1-121), §1.3–§1.4, §2.2's polity, port and
lens records, §3.9 whole, §3.11.6 whole, §5.8–§5.9 whole, §8.5 whole, §9 whole, §11–§12 whole and the integration notes;
`docs/volumes/V14-sites.md` at every applied passage (the devotion field and `SiteDevotion`, G2's row, the toll house's rows,
the holder and `garrisonCount`, `territoryBorder`, E1's polity read, E4's patrol item, T-V14-33, SE3, J-V14.56, request (5));
`docs/design/proposal-world-native.md` (whole), `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` (whole),
`docs/volumes/INDEX.md` (whole), `docs/volumes/SUMMARY.md` (whole), `docs/ARCHITECTURE.md` at the applied passages
(§2.9's `Document`, §7.7's world port paragraph and never-read list, §11.3's two lines, §11.4's door (5), §16's world rows);
and, read-only at `81f1cd96`, the host lines behind every verifier finding: `src/domain/spatial/spatialCost.js:30-70,96-101,241-254,380-388`,
`spatialDigest.js:117-179,698-730,768-778,810-820`, `armyTransit.js:54-59,293-301`, `canonMembership.js` (125 lines; :112-125),
`src/domain/worldPulse/sovereigntyReach.js:19-40,55-85,186-192`, `routeNetworkLedger.js:236-243`,
`src/domain/certification/subsystemRowsWaves.js:354-367`, `docs/DESIGN_ROUTE_LIFECYCLE.md:70-88`,
`docs/PHASE55_SPATIAL_ENGINE_DESIGN.md:1370-1376,1530-1537`, `src/store/campaignWorldPulseSlice.js:386-393`, the thirteen
`export const *_VERSION` under `src/domain/spatial/` and an import-aware scan of every `src` module importing
`activeSpatialDigest` (32; three further files only mention it). No git command was run; the host tree was not modified.

## Rules obeyed

The owner's own words quoted in any row or item (T1–T3, "yes", "i leave all judgemtn to you", "1. yes", the rules of
files j and k) are the owner's and are not re-judged; only the session's readings, rulings and claims are. A verdict on
a file is a verdict on the whole file, read in full. Every finding ends FIXED (a fragment in the corrections table, every
old string present exactly once in its file) or shown INVALID with checkable evidence; nothing is deferred. A wrong
amendment item is corrected by a dated bracket in the amendment file, never silently. The design is a reference, not a
contract. No git command is run; no file is edited but this record, its JSON and the log.

## The verifier's findings, ruled

Every finding was re-read at the host (the lines above) before it was ruled. "ACCEPTED" means the finding is real and
its fix is taken (as given, or amended as the row says); the fragment is in the corrections table.

| id | the verifier's verdict | ruling | evidence and reason |
|---|---|---|---|
| AV-1 | IMPRECISE (V13 :953, file m item 695 as n:793 left it) | ACCEPTED (kind design) | `spatialCost.js:35-49` prices per biome (13 rows); `TERRAIN_CLASSES` (:62-67) and `SEASON_TERRAIN_COST` (:96-101) key receipts and the seasonal overlay by class only; `terrainClassOf` (:241-254) folds biomes costing 1.6, 1.9, 2.6, 2.2 and 2.2 into one `forest`; the knee is `elevMult = 1 + (h − 60) / 15` (:385), a ramp, and the river term an add of 0.3 (:386). So "the host's per-terrain-class factor" and "the host's elevation knee: a step above it costs × the factor" describe no law the host runs: the fields are the shape of its law 2 (H6 asks for "its cost law 2 in this volume's schema"), which J-V13.73 chose over porting the first law. The verifier's rewording is taken whole. The item's own evidence (:668, "the host's v1 law has an elevation knee and a river-cell add and no slope, `spatialCost.js:30-70,380-388`") holds as written — a knee and an add exist; it is the schema comment that overstated what they are. realm.md's J-RR.12 reason "the v1 law's inputs (knee, river add) are expressible" is INVALID as a defect: the inputs (the knee height, the river add) are expressible in `elevationKneeM` and `riverCellAdd`; the ramp's shape is the law, which J-V13.73 does not port. |
| AV-2 | WRONG (file m :1474, item 727) | ACCEPTED (kind record) | `spatialDigest.js:771-775` is step 4b, the neighbour tiers' BFS; the crossings are chosen at :700-727 (`crossings[key] = { a, b, cost, cellA, cellB }`) and the gates built at :813-817 (`{ between: [g.a, g.b], cellA, cellB, cost }`), pack cell indices and no coordinate. Fix as given. |
| AV-3 | IMPRECISE (file m :963, item 713) | ACCEPTED (kind record) | `src/domain/certification/subsystemRowsWaves.js:356-366` carries the five event words and "a road being walked, patrolled or garrisoned is not a CHANGE"; `routeNetworkLedger.js:64-181` holds the grades, flavours, accrual and bypass. Fix as given (the second path added, nothing struck). |
| AV-4 | IMPRECISE (file q :497-498, item 909; :899, review issue 3) | ACCEPTED (kind record) | `PHASE55_SPATIAL_ENGINE_DESIGN.md:1372-1375` says a cost-law change is "a DISCRETE re-canonize event"; `:1534-1535` is §VI.4's open decision 3 ("re-derive on next open behind the entitlement, or freeze old canons on their old law forever"), so "behind the entitlement" rests on `campaignWorldPulseSlice.js:391` (every canonize refused below premium), not on the design document. Both fixes as given; the item's design text (H22, J-V13.100) is unaffected, since it already keeps a cost-law change premium. |
| AV-5 | IMPRECISE (file m :719, item 698) | ACCEPTED (kind record) | `armyTransit.js:57-59` (`ARMY_SPEED_FACTOR` 1.5, `READINESS_SPEED_GAIN` 0.4, `MAX_MARCH_WEEKS` 52) and :298-300 (`speedMult = 1 + 0.4·(rdy − 0.5)·2`; `weeks = ceil(base × 1.5 ÷ max(0.1, speedMult))`, clamped to [1, 52]). The verifier's formula is exact; the same fix landed on the research note (realm.md correction 9). The design is unaffected: V13 §2.3's `TravelLaw.army` already carries `factor`, `readinessGain` and `neutralReadiness` (item 693). |
| AV-6 | IMPRECISE (file m :774, item 701) | ACCEPTED (kind record) | `DESIGN_ROUTE_LIFECYCLE.md:71-82` is the `RouteEdge` shape; the id rule "edgeIds deterministic (`route.<a>.<b>.<mode>` codepoint-ordered)" is :85-86; `routeEdgeId` builds it at `routeNetworkLedger.js:239-242`. Fix as given (realm.md correction 6 is the same on the note). |
| AV-7 | IMPRECISE (file m :834, item 706) | ACCEPTED (kind record) | thirteen `export const *_VERSION` under `src/domain/spatial/`: six in `spatialDigest.js` (:120, :121, :122, :127, :134, :179), `spatialCost.js:82`, `seaLanes.js:85`, `waterBodies.js:60`, `spatialSubstrate.js:65`, `teleportEdges.js:64`, `captureSidecar.js:41`, and `armyTransit.js:120` — `ARMY_INTERCEPTION_DECISION_SCHEMA_VERSION`, a decision-record schema no re-canonize bumps. Twelve canon axes; fix as given (realm.md correction 3 names the thirteenth the same way). |
| AV-8 | IMPRECISE (file m :216, item 666) | ACCEPTED (kind record), and carried to its source | my own import-aware scan over `src` finds 32 modules importing `activeSpatialDigest` (four map components, `CharterRoadCard`, `briefs/roadScene`, `display/settlementRumors`, `events/realmManifest`, `region/neutralNeighbourEdges`, `spatial/rumorNetwork`, 21 under `worldPulse/`, `store/userRouteCharter`); three further files only mention it (`canonMembership.js`, `distanceRead.js` — the gate itself —, `traditions/pilgrimage.js`). The count came from the research note (`research/sf/fp-realm-review.md:101`, RR-1: "31 modules"), which the realm lanes left standing and `realm.md`'s J-RR.1 row repeats; the note and that record row are corrected too (the realm lane's verdict JSON is not reopened — its rulings' reasons are not applied anywhere). Nothing of the design rests on the number. |
| AV-9 | IMPRECISE (file q :360, :498, :637, :897) | ACCEPTED (kind record), four fragments | `canonMembership.js` has 125 lines; the "Re-map to bring it into the canon" note is :116-124. Each of the four occurrences is anchored on its own line's context (`:5-13`, `:116-127` (a seat …; the :498 path form; the :637 path form before `; [INFERRED]`; the :897 `:5-13`, `:116-127`); the research notes …), so every old string occurs once in the file. |
| AV-10 | IMPRECISE (file m :745, item 699) | ACCEPTED, the wording amended (kind record) | `src/domain/worldPulse/sovereigntyReach.js:60-79`: the 2w–8w spectrum is the `hopWeeks` of every ordered pair on a measured realm; `MAX_REINFORCEMENT_WEEKS` 5 (:81) is "the army-transit leg band", a march-week ceiling run through `armyMarchWeeks` (:23-28, :189-190), and the host's own comment says the number "WAS MEASURED, NOT CHOSEN" and "sits inside the measured spectrum". So the band was not "measured on a 2–8 army-week spectrum"; it was set by measurement inside a spectrum of 2–8 hop weeks — written so, rather than the verifier's "chosen inside", which the host's comment contradicts in its word. The item's next clause ("5 army weeks admit hop weeks ≤ 3 at neutral readiness") was right and stays. |

## The amendments judged as design

(filled as judged)

## Rulings table

(filled as judged)

## Corrections

(filled as judged)

## Verdict

(pending)

## Notice replacement

(pending)
