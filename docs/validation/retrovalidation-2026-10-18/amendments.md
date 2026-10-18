# Retrovalidation 2026-10-18 — lane retrovalidation/amendments (Fable 5.1, J390/J392)

Lane: `retrovalidation/amendments` — Fable 5.1, the validator of the amendment family "amendments": files
`docs/AMENDMENTS-2026-10-17m.md`, `-n.md`, `-o.md`, `-p.md`, `-q.md` (items 659–925), their application records
`docs/validation/coherence/realm-m.md`, `lens-n.md`, `lens-o.md`, `lens-p.md`, `lens-q.md`, their critics
`realm-m-critic.md`, `lens-n-critic.md`, `lens-o-critic.md`, `lens-p-critic.md`, `lens-q-critic.md`, and the applied
targets as they stand on 2026-10-18 (V13 §3.9, §5.8, §5.9, §8.5, §9, §10, §11, §12 especially; V14; the proposal; the
brief; the base; INDEX; SUMMARY). Written on Opus 5.5 under the J375 delegation; this is the retrovalidation the owner
called on 2026-10-18 ("now"), continued after the first workflow run was killed by the usage limit (fable; J392).

Status: LANDED 2026-10-18 05:23Z (started 2026-10-18 04:59Z); verdict PASS-WITH-CORRECTIONS; the fragments in `amendments.verdict.json`.

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

### Against the volumes, the base and the owner's rules

* **The owner's words.** T1–T3 (file m items 659–661), "yes" (662), "i leave all judgemtn to you" (file n, J384), J380's
  two follow-up questions (file o item 872) and the Q4 reservation (file q, J388) are quoted verbatim and match
  `docs/PROGRESS.md` J377–J388 (typos and the double space kept); V13 §1.3 carries them the same way. None is re-judged.
* **Files j and k.** Every new text of files m–q keeps the host's identifiers out of the volumes, the base, INDEX and
  SUMMARY: a grep of V13, V14, INDEX, SUMMARY and the proposal for host paths, the host's design documents, its commit,
  `.js`/`.jsx` names and the review's J-RR ids finds none in the volumes and the index (V13's three "SettlementForge" are
  the owner's quoted words at :248 and the base's own M-SF milestone name at :3649, :4071; V14's are its owner questions);
  the proposal cites `research/sf/fp-realm-review.md` J-RR rows as evidence (file m items 771, 773 — this program's own
  note, not a host document) and the brief names the host by the convention its own :17-20 states. The files' stated
  no-hit greps hold.
* **The re-judged rulings.** Every reading in files m–q is consistent with `rulings.md`'s five AMENDED rulings or is
  corrected here: J378.4 (verdicts only; `fighting`, never *embattled*) — V13 §3.11.6 law (9), §3.9 (11), J-V13.78 as
  applied; J379.1 (the religion lens a read per faith) — file n item 811's record reads the host's faith facts per deity
  and prescribes nothing; J382(b) ("lit" the record's lane slot, *lodgement*) — items 662 (b) and 693 bracketed, the V13
  fragment the rulings lane's C1 (AM-R6); J384(11) (satellites claim points, never chain members) — items 659 (d), file n
  (c), 802, 819 already say so; J388.g2 → J389 — file q already carries J389's correction (AM-R18). Of `realm.md`'s eight
  AMENDED J-RR rows, .8 and .9 have no design consequence (V13 §11 Q4, §3.11.6 state the two canonize paths), .49, .50,
  .53, .54 and .56 are carried by V13 as applied through files m and n (AM-R3, AM-R4, AM-R11, AM-R12), and .42 has the
  design consequence that record left at "none" (AM-R22; design fragment 2).
* **A reference, not a contract.** H22–H30 and the additive canon ask the host to change (its canonize is today the DM's
  premium act, `campaignWorldPulseSlice.js:389-391`); the volumes say so where they ask (§3.11.6 :2341 "a new host
  behaviour", H22, J-V13.106), and the brief's Part C tells the owner what reverses the host's own design.

### The four classes of V13 §5.8 — no sentence invents a host fact

§5.8 (1)–(9) as applied (file n item 810, files o and p's gates): host-stored, host-derived (computed and sent by the
host by its own law, labelled, never a host function the map calls — J-V13.89, file n's choice (l)), placement, and
owner-ruled map derivation; the "no invented fact" refusals (`refuse.lens.audience`, the dark-lane and regime-not-sent
banners fail-closed, file n's choice (f)); the default-preset honesty rule; the built biases of (3) gated on the host's
intensity where the host gates them (file p item 881, lens-o-critic gap 4). Every §5.9 row carries one of the four class
letters, and every D row names a host law the verifier opened at 81f1cd96 (225 host citations, 258 ranges, all opened;
the ten findings are citation ranges, one count and the one law description of §2.2 — none a lens row's class or fact).
This seat re-opened the rows' host facts that decide a lens's honesty: the plague record's missing carrier
(`pestilence.js:258-270`), its bands and phase words read off the record (`settlementPestilence.js:57-76`), the
propagation modes (`simulationRules.js:64`, `:693`, `:966`), faith spread a per-campaign toggle
(`LivingWorldGates.jsx:68-72`), the growth rounding bar and the dark lane (`populationDynamics.js:311`, `:383`, `:533`),
no deity generated (`latentPantheon.js:6-12`), the culture distance's composite (`cultureDistance.js`), the two
relationship planes kept apart on purpose (`relationships/canonicalRelationship.js:19-35`), the strength bands, words never
the number (`display/armyStrength.js:44-55`), the
frozen record's one gate (`campaignSpatialCanonize.js:36,158-186`, `distanceRead.js:115-132`; 32 importers), the gates'
pack cell indices (`spatialDigest.js:700-727,813-817`), the canon's twelve version axes, the army march formula
(`armyTransit.js:57-59,298-300`), the reinforcement band (`sovereigntyReach.js:60-81`) and the premium gate on every
canonize (`campaignWorldPulseSlice.js:389-391`). The two rows sibling lanes correct (§5.9 (6)'s pressure row, §5.9 (5)'s
trend row) and the one phrase (§5.8 (7)'s "public chips") are the only lens sentences found to state more than the host
holds; their V13 fragments are those lanes' and the items that wrote them are bracketed here (AM-R13, AM-R14).

### The host rows H23–H30

Each rests on a host fact the notes record as OBSERVED and the verifier opened, or on an owner word: H23 (the lens
window after every advance, undo and resume: the host's own ledger rows, the suppressed creeds DM-only —
`faith-system.md:1276`, `:1229-1230` —, the 80 kept pulses); H24 (the plague asks: no carrier on the epidemic record,
the condition gap and the famine loop's cap — `plague-system.md` §8–§9); H25 (the sway and patrol asks: the strength
order in the polity window, a raid's outcome word — the host computes none for a drift raid, the realm lane verified at
`relationshipRulesAdversarial.js:277-314`, so a raid becomes a verdict only by the word, J-RR.56 AMENDED —, tier changes
as dated facts, and the lane slot's "lit", which the rulings lane names H25's clause); H26 (the trade asks: a shipment's
path and departure, seizures at the worst intermediary — `trade-system.md` §9 items 13–20); H27 (the population asks: a
column's route, carriage and toll — `population-system.md:165-166`, a column keeps no path); H28 (the faith asks: the
deity key and carrier source on mints, a share history, the prescription rows — `faith-system.md:688-727`); H29 (the
prosperity asks: a band-change receipt — the host keeps no rung history, `prosperity-system.md:98,126`); H30 (the
alignment asks: a per-advance reading — "Nothing is persisted", `alignment-system.md:127-137`). Each names what the host
lacks and asks, never a fact the host holds.

### The critics' gaps

38 of 38 gaps the records claim closed are present in the applied texts (the verifier's count; realm-m 15, lens-n 14,
lens-o 6, lens-p 3). This seat confirmed those with design weight in the volumes as they stand: realm-m gap 4 (the
log-linear `kSize` and `kProsperity` in §3.9 (7)), gap 5 (who keeps a gate: §3.9 (13), H16, §11's ruling, J-V13.96), gap
8 (J-V13.86, J-V13.97); lens-n gap 2 (suppressed creeds DM-only, §5.8 (2)), gap 10 (V13 owns the panel's behaviour, V09
only hosts it), gap 13 (the unread documents in H21); lens-o gap 1 (the birth canon the product ruling, §8.5 H22,
J-V13.100, §11), gap 4 (the intensity gate on the small seats, §5.9 (5)); lens-p gap 2 (the additive canon: H22,
J-V13.106, T-V13-37 (c), `CanonRequest.additive`), gap 3 (item 904's "nothing else"). The critics' lists are unchanged.

### INDEX and SUMMARY

INDEX's V13 row, its milestone lines (M-W0 – M-W5 after M-SF, M-W5 the lenses after M-W2 beside M-W3 — file o item 877)
and its state line (file r item 926: H5 and H22 lit) agree with V13 §8.5 and §11 as applied; SUMMARY's V13 state, its
Q1/Q2/Q4 rows and its plain-language world paragraph agree with the volume (the lenses named at :118, :155, :191).
SUMMARY's paragraph that does not name every lens is the integration seat's text, listed under file p's *Not items* —
not this family's to change. V13's decision rows run to J-V13.106 (file q's, the last).

### Checked and found INVALID as defects (no correction)

* `realm.md` J-RR.12's "the v1 law's inputs (knee, river add) are expressible": the row's point is that a library update
  must not move the host's times, which J-V13.73 secures by not porting law 1 at all; the schema is law 2's shape (the
  design fragment of AV-1 says so), so whether a ramp knee is "expressible" in it is moot. The row stands.
* V13 §2.6's `WorldEvent` row, "the map's own horizon covers user events only": scoped to the event store's retention,
  not a statement of every map-side horizon; the plates' cache is §5.8 (8)'s and §3.11.6's (design fragment 2).
* §3.9 (6)'s and §5.9 (2)'s "lit": read through the §2.2 definition the rulings lane writes (C1); no second fragment.
* The proposal's J-RR citations: this program's own research note cited as evidence (file m items 771, 773), not a host
  identifier.
* File r (items 926 –): placement only in this lane (the verifier's 20 fragments in place); its check lane passed.
* The small lane's V14 §2.4 fragment: no item of m–q wrote that comment (file l's), nothing to bracket here.
* The verifier's replay (every md5 and line count of the five records and file r reproduced, the forward replay
  byte-identical to the targets, 286 landing lines, the 89 rewritten fragments each traced) is taken as recorded
  (Fable-checked per the log); every applied passage this seat opened was in place as its item's new text, including
  the rewritten ones it touched (§3.9 (6), §5.8 (7), §8.5 H22, §11 Q4, §3.11.6 :2341).

## Rulings table

The "ruled" sentences inside files m–q (the session's readings and choices, the rulings it encoded, and the owner's
words it quotes), each re-judged against the host at 81f1cd96, the re-judged rulings and the design as applied. The J-numbered
rulings themselves are `rulings.md`'s; here is what the amendment files made of them.

| id | verdict | reason | consequence |
|---|---|---|---|
| AM-R1 | NOT-A-RULING | File m items 659–661 quote the owner's territory rules T1–T3 verbatim (PROGRESS J377, J378; typos and the double space kept, confirmed against the journal); the owner's words are not re-judged. | none |
| AM-R2 | UPHELD | Item 659's reading (a)–(f) of T1: borders a picture of host political facts (W8b, one way); the host's territory the nearest-settlement partition its distances ride on and never the political map (J-RR.48 UPHELD); occupation an overlay until a dated outcome (J-RR.52 UPHELD; J-RR.56 AMENDED to verdicts only, which (c)'s "dated outcome" already is); the allegiance graph with satellites as claim points of their parent's allegiance (J384 (11) AMENDED: claim points, never chain members — the reading already says so); the reference generator's states as allegiances on a standalone import; the encounter crop reading the polity at its point and week (V14 E1, E4). | none |
| AM-R3 | UPHELD | Item 660's reading (a)–(g) of T2: (a)–(b) as J-RR.49 AMENDED now reads (kSize = 1.15^(third − 1), kProsperity = 1.1^(relative rung), file n item 793; τ at least half again per rung kept); (c) the fade on the host's own cost law at walking pace; (d) as J-RR.50 AMENDED (the push the host's own strength order, J384 (3), file n's choice (a)); (e) the chain (J-RR.51 UPHELD); (f) every coefficient a tuning cell UNMEASURED; (g) J-RR.53's clause "borders move only on dated facts … the host's frozen territory and its crossings untouched" stands — its amended clause (the gate holder by J385) is file n item 817's. | none |
| AM-R4 | UPHELD | Item 661's reading (a)–(d) of T3: (a) the force band without the economy facet (J384 (4) UPHELD); (b) the ceiling kept; (c) "the host's dated verdicts on fights there move a hold band" is exactly J-RR.56 AMENDED and `rulings.md` J378.4 AMENDED (verdicts, never an open engagement; `fighting`, never *embattled* — V13 §3.11.6 law (9) as applied); (d) patrols derived on a fixed phase, never a roll, offered as an extent (J-RR.54 AMENDED adds the force-band rung, which V13 §3.9 (14) and J-V13.97 carry; "its garrisons" in the reading is that input). | none |
| AM-R5 | UPHELD | Item 662 (a), RULED vetoable: culture as a resistance through the host's own culture distance, read live, sent banded in fifths over its whole vector (J382 (a) UPHELD; J384 (2) UPHELD; J-V13.64 as file o item 867 states it); `cultureDistance.js` opened by the verifier with no finding; the governance term's conquest-and-vassalage behaviour described as the host computes it. | none |
| AM-R6 | AMENDED | Item 662 (b), "water is cheap carriage only where the host's sea lanes are lit": `rulings.md` J382(b) AMENDED — "lit" is the host's frozen record carrying a versioned lane slot with at least one lane, as its caravans, refugee pricing and plague latency read it (`activeSeaLanes`), never the fleet switch (`navalEnabled`); *lodgement* (already the item's word), never *foothold*. Item 693's `waterLanes.lit` comment encoded the undefined word into V13 §2.2. | V13 §2.2's comment is the rulings lane's correction C1 (not duplicated); dated brackets at m 662 and m 693 (corrections 10, 11) |
| AM-R7 | UPHELD | Item 662 (c), faith gets no sea carrier (J382 (c) UPHELD): the religion lens of file n item 811 carries no sea carrier; the faith lane's V13 §5.9 (6) correction concerns the vassal-authority channel's weight, not the sea. | none |
| AM-R8 | UPHELD | File m's eleven stated deviations (a)–(k) from the review's text, each a design choice under the delegation: (a)–(d) the port's names and merges (the base's one-way law kept, `refuse.world.hostRequires` after its message); (e) culture as a path resistance, `culture.phi` and `lodgementDays` own values labelled UNMEASURED; (f) BCR-V13-30–36 as substance in file k's form; (g) the standalone speeds PLAUSIBLE, labelled; (h) door 1 an owner question (J388.Q4 UPHELD; answered "1. yes", file r); (i) the crossings kept on the unweighted seat territory (J-RR.53 UPHELD in that clause); (j) rulings restated in the volume's own form; (k) the three manager readings not taken, two later recorded as J-V13.8… | none |
| AM-R9 | UPHELD | Item 714's law 13, "Revisions, not ticks (THE TENSION ruled, J-V13.65)": a polity window is the host's end-of-window state and the sway moves only through one receipted revision per week over a dirty box on dated host facts; J-RR.53 AMENDED only in its gate-holder clause and J-V13.65 stands, the host's advance being weekly and its facts dated. | none |
| AM-R10 | UPHELD | Items 754 (Q1) and 773: "the transition is ruled … neither — existing campaigns are offered an elective rebase" (J-RR.45, J-RR.46 UPHELD by the realm lane; J-V13.81; H19's phases 0–5); Q1's question itself stays the owner's. | none |
| AM-R11 | UPHELD | File n's thirteen stated choices (a)–(m): (a) J384 (3)'s deference exact, the push the host's strength order (J-RR.50 AMENDED to these words); (b) the held lower median on the revision; (c) satellites per J384 (11) AMENDED — placed at the tier's middle size, no chain bonus, claim points; (d) plates a cache (BCR-V13-38); (e) *plate*, `fighting`, *lodgement* (J378.4 and J382(b) AMENDED agree); (f) the banner "the host's regime not sent", fail-closed; (g) carriage labelled "likely carriage" where endpoint-tested; (h) gaps 3, 7, 8, 13 as stated; (i) alignment bands host-sent (J-V13.89); (j) devotion a request field; (k) M-W5 PLAUSIBLE; (l) the clean-room rule over J383's export call; (m) the swa… | none; (7)'s phrase is item 810's text, AM-R13 |
| AM-R12 | UPHELD | Item 824, "Ruled — who keeps a gate under the sway" (J385; J-V13.96), with 817 (H16), 819 and 833: `rulings.md` J385.g5 UPHELD; J-RR.53 AMENDED to the same words. | none |
| AM-R13 | AMENDED | Item 810's §5.8 (7) sentence "the host's public chips stay where the host shows them", carried forward by file o item 846 (b): the lenses lane (L1 / V-9) finds the host's aggression chip on the DM's cards and the premium PDF only (`livingWorldSignals.js:236-262`, `liveWorld.js:318`), no player surface; `rulings.md`'s J384(7) row is corrected by that lane the same way. | V13 §5.8 (7) corrected by the lenses lane (not duplicated); dated brackets at n 810 and o 846 (corrections 13, 16) |
| AM-R14 | AMENDED | Item 811's §5.9, the eight lens records: upheld in the main — every row opened rests on a host fact the verifier or this seat read at 81f1cd96 (plague: `pestilence.js:258-270`, `settlementPestilence.js:57-76`, `simulationRules.js:64,693,966`; faith: `LivingWorldGates.jsx:68-72`; populations: `populationDynamics.js:311,383,533`; alignment: `latentPantheon.js:6-12`) or on J384 — but two rows are amended by sibling lanes: the religion lens's pressure row ("hostility carries hardest": the vassal-authority channel 0.82 carries harder than a war front 0.72, faith lane) and the populations lens's trend row ("the party's believed trend": the host reads a believed trend on no surface, population lane… | V13 §5.9 (6) and (5) corrected by those lanes (not duplicated); dated bracket at n 811 (correction 14) |
| AM-R15 | AMENDED | File o's (f) gap 6 and (g) gap 7 as J386 ruled, and item 870 "Ruled — the birth canon and a fight verdict while the military term is dark": J386.g6 and J386.g7 UPHELD; but 870 (b)'s "asked to be canonized" hedged the ruling (lens-o-critic gap 1), which J387.g1 (UPHELD) amended and file p items 884–886 struck on their date. | none further (already corrected in the chain, dated in file p) |
| AM-R16 | NOT-A-RULING | Item 872's owner words on trade and ranking (J380's two follow-up questions, quoted verbatim). | none |
| AM-R17 | UPHELD | File p items 884, 885, 886, 888, 889: the birth canon the product ruling the host implements, never an offer and never the entitlement's choice (J387.g1 UPHELD); file p's review issue 3 ("the birth canon free while every re-canonize stays premium") verified — every host canonize is premium-gated at `campaignWorldPulseSlice.js:389-391`, and the design asks the host to change that for the birth canon: a reference, not a contract. | none |
| AM-R18 | UPHELD | File q's (b) gap 2 as J388 rules it, items 902 (c), 909 (a) (H22), 913 (Q4's premise and the ruling), 915 and J-V13.106: `rulings.md` J388.g2 is AMENDED by J389's correction (the additive re-canonize a NEW host behaviour; no host re-canonize on a settlement founding), and file q already carries that correction — its preamble's host paragraph, *For the session* (3), the items' "a new host behaviour", V13 §3.11.6 :2341 and H22 — so no item of this family encoded the pre-correction parenthesis. | none |
| AM-R19 | UPHELD | File q *For the session* (2) (a seat's removal stays the premium DM's re-canonize; only additions are additive) and (4) (the additive canon only for campaigns born canonized): `rulings.md` J389(2) and J389(4) UPHELD with the same reasons. | none |
| AM-R20 | UPHELD | File q *For the session* (3), the two ledger corrections (the founding-event parenthesis; "a campaign without the entitlement" rare): `rulings.md` J389.corr and J389.rare UPHELD, verified at 81f1cd96 (`createCampaign` refuses below premium; the host's founding events are institution foundings). | none |
| AM-R21 | NOT-A-RULING | File q's "V13 §11 Q4 NOT ruled — the owner's own word" (J388.Q4 UPHELD): reserved for the owner, answered "1. yes" by file r item 926 (J391), outside this family's items. | none |
| AM-R22 | AMENDED | Item 721's *Retention* sentence in V13 §3.11.6, "the map's own horizons cover user events and the polity supersession chain only" (J-RR.42 as the note had it): `realm.md` AMENDED J-RR.42 to add the lens plates' horizon (J384 (9), V13 §5.8 (8)) and recorded the design consequence as "none", but V13 :2454 still says "only". | design fragment on V13 :2454 (correction 2); dated bracket at m 721 (correction 12) |

## Corrections

The exact fragments are in `amendments.verdict.json` (every old string verified to occur exactly once in its file, and
once at its turn when the fragments are applied in order; the two on file q's lines :497-498 are taken as one fragment
so neither old overlaps the other). Each record fragment carries the verifier's fix or the sibling lane's finding
and a dated bracket naming it, so no amendment item is corrected silently; the sibling lanes' V13 and V14 fragments
are not duplicated. The bundle `docs/ARCHITECTURE-FULL.md` regenerates from the volumes.

| # | kind | file | old → new (abridged) | reason |
|---|---|---|---|---|
| 1 | design | `docs/volumes/V13-world.md` | classFactor?: Record<string, number> /* the host's per-terrain-class factor through the adapter folder's class… → classFactor?: Record<string, number> /* a host law's per-terrain-class factor through the adapter folder's class table — the shape of the host's law 2 in this schema (H6)… | AV-1 ACCEPTED, the verifier's text taken whole: at 81f1cd96 the host's first cost law prices by biome (`spatialCost.js:35-49`, 13 rows), its terrain classes key receipts and the seasonal overlay only (:62-67, :96-101, :241-254) and its knee is the ramp `elevMu… |
| 2 | design | `docs/volumes/V13-world.md` | horizon governs host facts; the map's own horizons cover user events and the polity supersession chain only (V… → horizon governs host facts; the map's own horizons cover user events, the polity supersession chain and the lens plates (V13 §2.6; the plates' own horizon is §5.8 (8)'s: … | Own finding D-2: §3.11.6's *Retention* sentence (file m item 721) still says the map's horizons cover user events and the polity chain "only", while §5.8 (8) (file n item 810; J384 (9)) gives the lens plates a third map-side horizon — the contradiction J-RR.42… |
| 3 | record | `docs/AMENDMENTS-2026-10-17m.md` | host `spatialDigest.js:771-775` → host `spatialDigest.js:700-727,813-817` [Fable-reviewed 2026-10-18: was `:771-775`, the neighbour tiers' step 4b; the crossings are chosen at :700-727 and the gates built… | AV-2 WRONG, ACCEPTED: item 727's citation for the gates' pack cell indices pointed at the neighbour-tier BFS; the gates `{ between, cellA, cellB, cost }` are built at :813-817 from the crossings chosen at :700-727. |
| 4 | record | `docs/AMENDMENTS-2026-10-17m.md` | "patrolled is not a change", hidden never absence, `routeNetworkLedger.js:64-181` → "patrolled is not a change", hidden never absence, `routeNetworkLedger.js:64-181`, `src/domain/certification/subsystemRowsWaves.js:356-366` [Fable-reviewed 2026-10-18: th… | AV-3 IMPRECISE, ACCEPTED: item 713 cites the ledger for words that live in `subsystemRowsWaves.js:356-366` (the research note's RR-15 cited them; file m dropped the path). The second path is added, nothing struck. |
| 5 | record | `docs/AMENDMENTS-2026-10-17m.md` | army time is ceil(1.5 × weeks ÷ readiness) → army time is ceil(1.5 × weeks ÷ (1 + 0.4·(2·readiness − 1))), clamped to [1, 52] [Fable-reviewed 2026-10-18: `armyTransit.js:57-59`, `:298-300`; AV-5] | AV-5 IMPRECISE, ACCEPTED: item 698's formula drops the readiness gain and the clamp the host applies (`speedMult = 1 + 0.4·(rdy − 0.5)·2`, `max(0.1, …)`, `MAX_MARCH_WEEKS` 52); the same fix landed on the research note (realm.md correction 9). V13 §2.3's `Trave… |
| 6 | record | `docs/AMENDMENTS-2026-10-17m.md` | the host's edge id is the pair and the mode, host `DESIGN_ROUTE_LIFECYCLE.md:71-80` → the host's edge id is the pair and the mode, host `DESIGN_ROUTE_LIFECYCLE.md:71-86`, `routeNetworkLedger.js:239-241` [Fable-reviewed 2026-10-18: :71-82 is the `RouteEdge`… | AV-6 IMPRECISE, ACCEPTED: item 701's range stops before the id rule it cites. |
| 7 | record | `docs/AMENDMENTS-2026-10-17m.md` | at least thirteen self-describing host axes, each bumped only by a discrete re-canonize, host `spatialDigest.j… → at least twelve self-describing canon axes, each bumped only by a discrete re-canonize — six in host `spatialDigest.js:117-179`, with `spatialCost.js:82`, `seaLanes.js:85… | AV-7 IMPRECISE, ACCEPTED: thirteen `*_VERSION` constants exist under `src/domain/spatial/`, but one (`ARMY_INTERCEPTION_DECISION_SCHEMA_VERSION`) versions a decision record, not a canon axis, and `spatialDigest.js` declares six of the twelve, not all of them (… |
| 8 | record | `docs/AMENDMENTS-2026-10-17m.md` | read through one gate by 31 modules → read through one gate by 32 modules [Fable-reviewed 2026-10-18: an import-aware count at `81f1cd96` (four map components, `CharterRoadCard`, `briefs/roadScene`, `display/… | AV-8 IMPRECISE, ACCEPTED and carried to its source: 32 `src` modules import `activeSpatialDigest` at 81f1cd96 (my own scan agrees with the verifier's); item 666 took 31 from the research note, which the realm lane did not re-count. The note (:101) and `realm.m… |
| 9 | record | `docs/AMENDMENTS-2026-10-17m.md` | the reinforcement band was measured on a 2–8 army-week spectrum → the reinforcement band (5 march weeks) was set by measurement inside a spectrum of 2–8 hop weeks [Fable-reviewed 2026-10-18: `src/domain/worldPulse/sovereigntyReach.js:60… | AV-10 IMPRECISE, ACCEPTED with the wording amended: the verifier's "chosen inside a measured spectrum" contradicts the host's own comment ("MEASURED, NOT CHOSEN"); the band is a march-week ceiling set by measurement inside a hop-week spectrum, so item 699's "m… |
| 10 | record | `docs/AMENDMENTS-2026-10-17m.md` | landed host words, so `lodgementDays` and `keyframeEvery`). → landed host words, so `lodgementDays` and `keyframeEvery`). [Fable-reviewed 2026-10-18: this item's `classFactor` and `elevationKneeFactor` comments called them "the host… | AV-1's source: item 695 wrote the two comments the design fragment above corrects; a wrong item is corrected by a dated bracket, never silently. |
| 11 | record | `docs/AMENDMENTS-2026-10-17m.md` | recorded here for the religion lens's follow-up review (J379); no text of this file. → recorded here for the religion lens's follow-up review (J379); no text of this file. [Fable-reviewed 2026-10-18: (b)'s "lit" is defined by `rulings.md` J382(b) AMENDED — … | Rulings table AM-R6: J382(b) AMENDED in `rulings.md` makes item 662 (b)'s reading an item that encoded it; the V13 fix is the rulings lane's C1 (not duplicated here), the amendment file gets the dated bracket. |
| 12 | record | `docs/AMENDMENTS-2026-10-17m.md` | the stance and route-event unions were the host's closed vocabularies written as literals. → the stance and route-event unions were the host's closed vocabularies written as literals. [Fable-reviewed 2026-10-18: the polity window's `waterLanes.lit` comment this i… | Rulings table AM-R6: item 693 wrote the `waterLanes` comment the rulings lane corrects (C1); dated bracket, no duplicate design fragment. |
| 13 | record | `docs/AMENDMENTS-2026-10-17m.md` | a host's removal of a placement is ungated, `mapSlice.js:473-481`. → a host's removal of a placement is ungated, `mapSlice.js:473-481`. [Fable-reviewed 2026-10-18: this item's *Retention* sentence ("the map's own horizons cover user events… | Own finding D-2's source: item 721 wrote the sentence; dated bracket. |
| 14 | record | `docs/AMENDMENTS-2026-10-17n.md` | line, the insertion point; item 811 then inserts §5.9 before §6's heading, `:2836`). → line, the insertion point; item 811 then inserts §5.9 before §6's heading, `:2836`). [Fable-reviewed 2026-10-18: (7)'s "the host's public chips" (carried into V13 §5.8 (7… | Rulings table AM-R13: the lenses lane's L1 / V-9 corrects V13 §5.8 (7) (not duplicated here); item 810 wrote the phrase; dated bracket. |
| 15 | record | `docs/AMENDMENTS-2026-10-17n.md` | "drawn as marks with no link"). → "drawn as marks with no link"). [Fable-reviewed 2026-10-18: two rows of §5.9 as this item wrote them are corrected in V13 by sibling lanes — the religion lens's pressure … | Rulings table AM-R14: two §5.9 rows item 811 wrote are corrected by the faith and population lanes (their V13 fragments, not duplicated here); dated bracket. |
| 16 | record | `docs/AMENDMENTS-2026-10-17n.md` | (§9.1 item 2: the band drifts upward realm-wide in lit presets) → (§9.1 item 2: the band drifts upward realm-wide in lit presets) [Fable-reviewed 2026-10-18: the prosperity lane re-read the drift as a polarisation — Moderate and above c… | Item 793 cites a research claim the prosperity lane corrected (its research and design fragments); the item's own reasoning stands, the citation is dated. |
| 17 | record | `docs/AMENDMENTS-2026-10-17o.md` | (V09 §4.19 has no lens row). → (V09 §4.19 has no lens row). [Fable-reviewed 2026-10-18: (b) carries §5.8 (7)'s "the host's public chips" forward unchanged; the lenses lane corrects the phrase in V13 (t… | Rulings table AM-R13: item 846 (b) re-wrote the §5.8 (7) sentence and kept the phrase; dated bracket. |
| 18 | record | `docs/AMENDMENTS-2026-10-17p.md` | dark, where none grows; "upward" is the aggregate, a struggling seat sinking. → dark, where none grows; "upward" is the aggregate, a struggling seat sinking. [Fable-reviewed 2026-10-18: (d)'s note "drifts upward realm-wide in aggregate" is corrected … | Item 881 (d) wrote the upward-drift note the prosperity lane corrects (its V13 fragment, not duplicated here); dated bracket. |
| 19 | record | `docs/AMENDMENTS-2026-10-17q.md` | host `docs/PHASE55_SPATIAL_ENGINE_DESIGN.md:1372-1375`, `:1534-1535`⏎(a cost-law change "a DISCRETE re-canoniz… → host `docs/PHASE55_SPATIAL_ENGINE_DESIGN.md:1372-1375`⏎(a cost-law change "a DISCRETE re-canonize event"; behind the entitlement as every canonize is, `src/store/campaign… | AV-4 and AV-9 on the same two lines of item 909's evidence (:497-498), taken together so each old string occurs once: `PHASE55…:1534-1535` is §VI.4's open owner decision 3, not the entitlement, which rests on every canonize being premium-gated at `campaignWorl… |
| 20 | record | `docs/AMENDMENTS-2026-10-17q.md` | a cost-law change is a discrete, entitled re-canonize (`PHASE55…:1372-1375`, `:1534-1535`) → a cost-law change is a discrete re-canonize (`PHASE55…:1372-1375`), entitled as every canonize is (`campaignWorldPulseSlice.js:389-391`; the installed base's policy an op… | AV-4 IMPRECISE, ACCEPTED: file q's review issue 3 (:899) cites the open decision as if it settled the entitlement. |
| 21 | record | `docs/AMENDMENTS-2026-10-17q.md` | `src/domain/spatial/canonMembership.js:5-13`, `:116-127` (a seat founded after the canon has no territory, no … → `src/domain/spatial/canonMembership.js:5-13`, `:116-124` [Fable-reviewed 2026-10-18: was `:116-127`; AV-9] (a seat founded after the canon has no territory, no gates, no | AV-9 IMPRECISE, ACCEPTED (item 902's evidence, :360): the file has 125 lines; the re-map note is :116-124. |
| 22 | record | `docs/AMENDMENTS-2026-10-17q.md` | `src/store/campaignWorldPulseSlice.js:368-370`, `src/domain/spatial/canonMembership.js:116-127`; [INFERRED] th… → `src/store/campaignWorldPulseSlice.js:368-370`, `src/domain/spatial/canonMembership.js:116-124` [Fable-reviewed 2026-10-18: was `:116-127`; AV-9]; [INFERRED] the owner's | AV-9 IMPRECISE, ACCEPTED (item 915's evidence, :637). |
| 23 | record | `docs/AMENDMENTS-2026-10-17q.md` | (`src/domain/spatial/canonMembership.js:5-13`, `:116-127`); the research notes → (`src/domain/spatial/canonMembership.js:5-13`, `:116-124` [Fable-reviewed 2026-10-18: was `:116-127`; AV-9]); the research notes | AV-9 IMPRECISE, ACCEPTED (file q's review issue 1, :897). |
| 24 | record | `docs/validation/retrovalidation-2026-10-18/realm.md` | read through one gate by 31 modules and never re-derived on load → read through one gate by 32 modules (an import-aware count at `81f1cd96`; lane amendments AV-8) and never re-derived on load | AV-8 carried to the realm record's J-RR.1 row, which repeats the note's 31; the row's verdict (UPHELD) does not rest on the count. `realm.verdict.json` is not reopened. |
| 25 | research | `research/sf/fp-realm-review.md` | read through one gate by 31 modules (`campaignSpatialCanonize.js:36,158-186`; `distanceRead.js:115-132`) [OBSE… → read through one gate by 32 modules (`campaignSpatialCanonize.js:36,158-186`; `distanceRead.js:115-132`) [OBSERVED; [Fable-reviewed 2026-10-18: 32 by an import-aware coun… | AV-8 carried to its source: the research note's PS-1 count of the gate's importers is 31; 32 `src` modules import `activeSpatialDigest` at 81f1cd96. No realm-lane correction touches this line. |

## Verdict

**PASS-WITH-CORRECTIONS.** The family is sound as design: the owner's words verbatim, every reading consistent with the re-judged
rulings, no lens sentence inventing a host fact beyond the three sibling lanes already correct, the critics' gaps closed,
INDEX and SUMMARY consistent. What needs correcting is small and exact: 2 design fragments on V13 (the
RouteCostLaw comments that called law 2's shape "the host's"; §3.11.6's horizons sentence that still says "only" against
the plates' horizon), 22 record fragments (the verifier's seven citation fixes in file m and five in file q, each
with its dated bracket; nine dated brackets on the items of files m, n, o and p that wrote passages sibling lanes correct in
V13 or that AV-1 and the horizons finding reach; `realm.md`'s J-RR.1 count) and 1 research fragment (the note's
importer count). Rulings tabled: 22 (14 UPHELD, 5 AMENDED, 3 NOT-A-RULING);
the AMENDED ones each end in a fragment or in a correction a sibling lane or a later file already carries. Nothing is deferred.

## Notice replacement

> Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — 2 design fragments on V13, 22 dated record brackets and fixes across files m–q and the realm record, 1 research count (lane retrovalidation/amendments; J392)
