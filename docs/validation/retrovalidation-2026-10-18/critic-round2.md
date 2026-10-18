# Retrovalidation 2026-10-18 — close-gaps (critic round 2; opus; J394, Fable-critiqued)

Lane `retrovalidation/close-gaps` (Opus 5.5/high, by the owner's J394 word: confirmation re-checks run on Opus, Fable
is kept for critique; J390 otherwise). Started 2026-10-18 09:33 UTC; fragments applied 09:35Z; this record from 09:37Z.
Task: apply the Fable critic's exact fixes (`critic.md` §4, the 66 fragments of `gaps.json`), record each gap FIXED with
before/after or LEFT OPEN with why, never invent. No git command was run. The host clone was not opened (none of the 66
needs a host fact). No file was edited except the 28 targets the gap list names, this record, `README.md` (*What was
left*, as the task asks) and the lane line.

Status: LANDED (see the lane line).

## Result in one paragraph

**All 66 fragments are applied: 18 of the task's 19 gaps are FIXED, and one, J392, is LEFT OPEN because only the
session may write it.** 65 fragments landed exactly as the critic gave them. B-19 landed with one recorded adjustment:
its two plague-note line pointers, (line 533) and (line 674), became (line 531) and (line 672). Both were right at
09:28Z, but A-prosperity-36, applied in the same pass, turns three lines of the plague note into one at :372. After the
write, :531 is §5.1 row 14 ("Quarantine / closure") and :672 is §7's "PG pg-4 candidates, quarantine verb" row. The
J392 journal row is the session's own (journal rows are append-only and no seat writes them), so this lane does not
write it. The other new finding is under §3: about 195 of the 349 "(line N)" pointers in the owner's host-requirements
document point at lines the apply lanes moved. It is LEFT OPEN with its exact line map, because the critic gave no fix
for it and the document is not this lane's beyond the named fragments.

## 1. Method and checks (script `retro/close-gaps/apply_gaps.py`, run as `python3 -I`; output `apply.out`)

1. **Cross-check before applying.** Each group-A fragment's `file` and `old` equal the named verdict correction's
   (`<family>.verdict.json` corrections[n−1]), and so does its `new`, except amendments #25. For #25 the verdict's
   `new` has 2 `[` and 1 `]`, and the fragment holds the critic's repaired text, which matches the task's verbatim
   string. The task's own strings for A-faith-60, A-lenses-40, A-trade-38, A-scripts-13 and A-scripts-14 match
   `gaps.json` exactly. Result: all 66 pass.
2. **Before each replacement** the script asserted that the old text occurs exactly once and the new text does not
   occur, in the order `gaps.json` lists them (group A in verdict order per file, then B, then C). After each
   replacement it asserted that the new text occurs once. All 66 held.
3. **End state, re-checked from disk** in a separate pass: every new text occurs once and every old text is gone.
   B-19's old text survives once, as the first line of its own new text, which is expected. Result: 66 / 66.
4. **Reverse round trip**: undoing the 66 replacements in reverse order gives every target's before-copy byte for byte
   (before-copies in `retro/close-gaps/before/`). So nothing else in the files moved. The `diff -U0` from the
   before-copies has 62 hunks over 28 files. That is 66 fragments less four merged pairs: B-7 and B-8 share a line,
   B-11 and C-36 share 36's line 1, B-12 and C-36b share 36b's line 1, and A-scripts-13 and -14 sit on adjacent lines
   (`retro/close-gaps/all.diff`).
5. **#25's line** (`research/sf/fp-realm-review.md:101`) now has one `[` and one `]`.
6. **Scripts**: `node --check` passes on all eight edited `workflows/*.js`. Only the line-1 header comments changed;
   no template literal was touched.
7. **Bundle**: `python3 tools/bundle_architecture.py --check` reported `UP TO DATE`, exit 0, with `ARCHITECTURE-FULL.md`
   md5 bbe57b8b (unchanged). None of the 28 targets is a bundle source, so nothing was regenerated.

| file | lines before → after | md5 before → after | fragments |
|---|---|---|---|
| docs/AMENDMENTS-2026-10-17m.md | 2441 → 2441 | 8ec92f1f → 5bc341bd | A-amendments-3…13 |
| docs/AMENDMENTS-2026-10-17n.md | 2007 → 2007 | 9d2b92ab → cce6c940 | A-amendments-14…16 |
| docs/AMENDMENTS-2026-10-17o.md | 1231 → 1231 | f1c067d1 → 15079bfa | A-amendments-17 |
| docs/AMENDMENTS-2026-10-17p.md | 677 → 677 | 0d90f551 → 56ba149a | A-amendments-18 |
| docs/AMENDMENTS-2026-10-17q.md | 920 → 920 | a83e1dd5 → e112764f | A-amendments-19…23 |
| docs/validation/retrovalidation-2026-10-18/realm.md | 194 → 194 | 23cefe1b → b68f5820 | A-amendments-24, B-13 |
| research/sf/fp-realm-review.md | 872 → 872 | 0a9e5dcf → 04ddbd0c | A-amendments-25 |
| docs/validation/retrovalidation-2026-10-18/rulings.md | 106 → 106 | b2e8fa39 → 9f787d06 | A-faith-60, A-lenses-40 |
| research/sf/trade-system.md | 1280 → 1280 | 15d47636 → 4ab935c8 | A-prosperity-35 |
| research/sf/plague-system.md | 1096 → 1094 | 09b9a121 → 60003131 | A-prosperity-36…41 (36 joins three lines into one) |
| docs/HOST-REQUIREMENTS-2026-10-18.md | 934 → 935 | 77444063 → 058523fd | A-prosperity-43…46, B-3, B-19 (adds one row) |
| docs/HANDOFF.md | 781 → 781 | 33b6ad72 → a5a0e84d | A-scripts-13, -14 |
| research/sf/fp-physical-integration.md | 493 → 493 | 052c64f4 → 9b6795f6 | A-trade-38, B-4 |
| research/sf/faith-system.md | 1516 → 1516 | 65f01f67 → 69e6301e | B-1, B-2 |
| research/sf/population-system.md | 1090 → 1090 | cb61abe9 → 4de5a9b4 | B-5 |
| research/sf/prosperity-system.md | 1115 → 1115 | da8834f3 → 6f7cb5c0 | B-6, B-7, B-8 |
| research/sf/alignment-system.md | 1249 → 1249 | fe10aea2 → 000a6b85 | B-9, B-10 |
| workflows/36-realm-review.js | 212 → 212 | 399c01b1 → 949fcd69 | B-11, C-36 |
| workflows/36b-realm-review-continue.js | 187 → 187 | 9a0605ce → a3d82203 | B-12, C-36b |
| docs/validation/retrovalidation-2026-10-18/scripts.md | 72 → 72 | 1818295e → 5f81b89f | B-14, B-16 |
| docs/validation/retrovalidation-2026-10-18/scripts-verify.md | 43 → 43 | f91915f4 → ff93d260 | B-15 |
| plat/docs/build/checks/M0-world-sites-gate.md | 476 → 476 | 1e29aadc → 1b5d7e6e | B-17, B-18 |
| workflows/37-faith-read.js | 84 → 84 | 7e26ba0e → 323e447b | C-37 |
| workflows/38-systems-read.js | 127 → 127 | 7156de54 → 2ecb8c2b | C-38 |
| workflows/38b-systems-read-continue.js | 131 → 131 | 71cb2f55 → 7925187d | C-38b |
| workflows/41-lens-close.js | 69 → 69 | 15943721 → a50c7b26 | C-41 |
| workflows/42-lens-final.js | 69 → 69 | c523e79b → d194d654 | C-42 |
| workflows/43-lens-q.js | 69 → 69 | 7f98ba6e → 6c1245c5 | C-43 |

(The line counts are newline-separated segments as Python splits them. The md5 values are the first 8 hex digits of
each file's UTF-8 bytes.)

**The one adjustment, B-19.** The critic's new row cites "plague-system.md §5.1 row 14 (line 533), §7 (line 674)".
Both lines were right when the critic wrote them. Group A, which the critic orders before group B, includes
A-prosperity-36, the verdict's PL-1. It replaces three lines of the plague note at :372–374 with one, so every later
line moves up by 2. The row was applied with (line 531) and (line 672). After the write, `sed -n 531p` shows
`| 14 | Quarantine / closure | … DESIGNED ONLY as an owner value |` and `sed -n 672p` shows
`| PG pg-4 candidates, quarantine verb | DESIGNED ONLY | — | quarantine an owner value |`. These are the rows the
critic named. Nothing else in the row changed. The precedent is scripts C8, applied with the right line and confirmed
by confirm-scripts. The Fable second look should confirm or overrule this adjustment.

## 2. Each gap, with before and after

The before and after texts below are verbatim from `retro/close-gaps/applied.json`, which holds the exact strings
written. Line numbers are those of the file before this lane's pass.

### G1 — 23 amendments-family corrections (amendments.verdict.json #3–#25; #25 with the critic's repaired text): **FIXED**

- **A-amendments-3** — `docs/AMENDMENTS-2026-10-17m.md` at line 1474 (before); source: amendments.verdict.json corrections[2] (1-based #3, kind record).

  Before:

  ~~~text
  host `spatialDigest.js:771-775`
  ~~~

  After:

  ~~~text
  host `spatialDigest.js:700-727,813-817` [Fable-reviewed 2026-10-18: was `:771-775`, the neighbour tiers' step 4b; the crossings are chosen at :700-727 and the gates built at :813-817; AV-2]
  ~~~

- **A-amendments-4** — `docs/AMENDMENTS-2026-10-17m.md` at line 963 (before); source: amendments.verdict.json corrections[3] (1-based #4, kind record).

  Before:

  ~~~text
  "patrolled is not a change", hidden never absence, `routeNetworkLedger.js:64-181`
  ~~~

  After:

  ~~~text
  "patrolled is not a change", hidden never absence, `routeNetworkLedger.js:64-181`, `src/domain/certification/subsystemRowsWaves.js:356-366` [Fable-reviewed 2026-10-18: the five event words and the quoted sentence are the certification rows', the ledger holding the grades, flavours, accrual and bypass; AV-3]
  ~~~

- **A-amendments-5** — `docs/AMENDMENTS-2026-10-17m.md` at line 719 (before); source: amendments.verdict.json corrections[4] (1-based #5, kind record).

  Before:

  ~~~text
  army time is ceil(1.5 × weeks ÷ readiness)
  ~~~

  After:

  ~~~text
  army time is ceil(1.5 × weeks ÷ (1 + 0.4·(2·readiness − 1))), clamped to [1, 52] [Fable-reviewed 2026-10-18: `armyTransit.js:57-59`, `:298-300`; AV-5]
  ~~~

- **A-amendments-6** — `docs/AMENDMENTS-2026-10-17m.md` at line 774 (before); source: amendments.verdict.json corrections[5] (1-based #6, kind record).

  Before:

  ~~~text
  the host's edge id is the pair and the mode, host `DESIGN_ROUTE_LIFECYCLE.md:71-80`
  ~~~

  After:

  ~~~text
  the host's edge id is the pair and the mode, host `DESIGN_ROUTE_LIFECYCLE.md:71-86`, `routeNetworkLedger.js:239-241` [Fable-reviewed 2026-10-18: :71-82 is the `RouteEdge` shape, the id rule `route.<a>.<b>.<mode>` is :85-86, built by `routeEdgeId`; AV-6]
  ~~~

- **A-amendments-7** — `docs/AMENDMENTS-2026-10-17m.md` at line 834 (before); source: amendments.verdict.json corrections[6] (1-based #7, kind record).

  Before:

  ~~~text
  at least thirteen self-describing host axes, each bumped only by a discrete re-canonize, host `spatialDigest.js:116-179`
  ~~~

  After:

  ~~~text
  at least twelve self-describing canon axes, each bumped only by a discrete re-canonize — six in host `spatialDigest.js:117-179`, with `spatialCost.js:82`, `seaLanes.js:85`, `waterBodies.js:60`, `spatialSubstrate.js:65`, `teleportEdges.js:64`, `captureSidecar.js:41` [Fable-reviewed 2026-10-18: the thirteenth `*_VERSION`, `armyTransit.js:120`, is a decision-record schema no re-canonize bumps; AV-7]
  ~~~

- **A-amendments-8** — `docs/AMENDMENTS-2026-10-17m.md` at line 216 (before); source: amendments.verdict.json corrections[7] (1-based #8, kind record).

  Before:

  ~~~text
  read through one gate by 31 modules
  ~~~

  After:

  ~~~text
  read through one gate by 32 modules [Fable-reviewed 2026-10-18: an import-aware count at `81f1cd96` (four map components, `CharterRoadCard`, `briefs/roadScene`, `display/settlementRumors`, `events/realmManifest`, `region/neutralNeighbourEdges`, `spatial/rumorNetwork`, 21 under `worldPulse/`, `store/userRouteCharter`); the note's 31 is corrected the same way; AV-8]
  ~~~

- **A-amendments-9** — `docs/AMENDMENTS-2026-10-17m.md` at line 745 (before); source: amendments.verdict.json corrections[8] (1-based #9, kind record).

  Before:

  ~~~text
  the reinforcement band was measured on a 2–8 army-week spectrum
  ~~~

  After:

  ~~~text
  the reinforcement band (5 march weeks) was set by measurement inside a spectrum of 2–8 hop weeks [Fable-reviewed 2026-10-18: `src/domain/worldPulse/sovereigntyReach.js:60-81` — the 2w–8w spectrum is the `hopWeeks` of every ordered pair on a measured realm, `MAX_REINFORCEMENT_WEEKS` 5 a march-week ceiling "MEASURED, NOT CHOSEN" that "sits inside the measured spectrum"; AV-10]
  ~~~

- **A-amendments-10** — `docs/AMENDMENTS-2026-10-17m.md` at line 668 (before); source: amendments.verdict.json corrections[9] (1-based #10, kind record).

  Before:

  ~~~text
  landed host words, so `lodgementDays` and `keyframeEvery`).
  ~~~

  After:

  ~~~text
  landed host words, so `lodgementDays` and `keyframeEvery`). [Fable-reviewed 2026-10-18: this item's `classFactor` and `elevationKneeFactor` comments called them "the host's" factor and knee; the host's first law prices by biome (13 rows), its terrain classes key receipts and the seasonal factor only, and its knee is a ramp (`spatialCost.js:35-49,62-67,96-101,241-254,385`); V13 §2.2 now says the two fields are the shape of its law 2 (H6), the first law not ported (J-V13.73); this file's fragment is left as applied on its date; AV-1]
  ~~~

- **A-amendments-11** — `docs/AMENDMENTS-2026-10-17m.md` at line 159 (before); source: amendments.verdict.json corrections[10] (1-based #11, kind record).

  Before:

  ~~~text
  recorded here for the religion lens's follow-up review (J379); no text of this file.
  ~~~

  After:

  ~~~text
  recorded here for the religion lens's follow-up review (J379); no text of this file. [Fable-reviewed 2026-10-18: (b)'s "lit" is defined by `rulings.md` J382(b) AMENDED — the host's frozen record carrying a versioned lane slot with at least one lane, as its caravans, refugee pricing and plague latency read it, never its fleet switch (`navalEnabled`); V13 §2.2's `waterLanes` comment now says so (the rulings lane's correction C1) and §3.9 (6) reads through it; *lodgement* is already this reading's word; (a) and (c) stand.]
  ~~~

- **A-amendments-12** — `docs/AMENDMENTS-2026-10-17m.md` at line 630 (before); source: amendments.verdict.json corrections[11] (1-based #12, kind record).

  Before:

  ~~~text
  the stance and route-event unions were the host's closed vocabularies written as literals.
  ~~~

  After:

  ~~~text
  the stance and route-event unions were the host's closed vocabularies written as literals. [Fable-reviewed 2026-10-18: the polity window's `waterLanes.lit` comment this item wrote left "lit" undefined; `rulings.md` J382(b) AMENDED defines it, and the rulings lane's correction C1 rewrites the comment in V13 §2.2 (the record's versioned lane slot with at least one lane, never the fleet switch; V13 §8.5's H25); this file's fragment is left as applied on its date.]
  ~~~

- **A-amendments-13** — `docs/AMENDMENTS-2026-10-17m.md` at line 1382 (before); source: amendments.verdict.json corrections[12] (1-based #13, kind record).

  Before:

  ~~~text
  a host's removal of a placement is ungated, `mapSlice.js:473-481`.
  ~~~

  After:

  ~~~text
  a host's removal of a placement is ungated, `mapSlice.js:473-481`. [Fable-reviewed 2026-10-18: this item's *Retention* sentence ("the map's own horizons cover user events and the polity supersession chain only") was true on its date; file n item 810 then gave the lens plates a horizon of their own (V13 §5.8 (8); J384 (9); J-RR.42 AMENDED in `realm.md`), so V13 §3.11.6 now names the plates too (lane amendments, design fragment D-2); this file's text is left as applied.]
  ~~~

- **A-amendments-14** — `docs/AMENDMENTS-2026-10-17n.md` at line 1065 (before); source: amendments.verdict.json corrections[13] (1-based #14, kind record).

  Before:

  ~~~text
  line, the insertion point; item 811 then inserts §5.9 before §6's heading, `:2836`).
  ~~~

  After:

  ~~~text
  line, the insertion point; item 811 then inserts §5.9 before §6's heading, `:2836`). [Fable-reviewed 2026-10-18: (7)'s "the host's public chips" (carried into V13 §5.8 (7) and forward by file o item 846 (b)) over-states the host — its aggression chip reaches the DM's cards and the premium PDF only (`livingWorldSignals.js:236-262`, `liveWorld.js:318`; no player surface traced), so the lenses lane corrects V13 to "the host's own chips (shown to the DM on its cards and PDF today; no player surface traced)" and `rulings.md`'s J384(7) row the same way; this file's text is left as applied.]
  ~~~

- **A-amendments-15** — `docs/AMENDMENTS-2026-10-17n.md` at line 1274 (before); source: amendments.verdict.json corrections[14] (1-based #15, kind record).

  Before:

  ~~~text
  "drawn as marks with no link").
  ~~~

  After:

  ~~~text
  "drawn as marks with no link"). [Fable-reviewed 2026-10-18: two rows of §5.9 as this item wrote them are corrected in V13 by sibling lanes — the religion lens's pressure row ("hostility carries hardest": the host's vassal-authority channel, 0.82 overlord → vassal, carries harder than a war front, 0.72; the faith lane, through lens-implications §1.3 and J379.1) and the populations lens's trend row ("the party's believed trend where beliefs": the host keeps belief records for its courts and reads the believed trend on no surface, so the party reads the direction its own dossier tells it; the population lane); this file's text is left as applied.]
  ~~~

- **A-amendments-16** — `docs/AMENDMENTS-2026-10-17n.md` at line 533 (before); source: amendments.verdict.json corrections[15] (1-based #16, kind record).

  Before:

  ~~~text
  (§9.1 item 2: the band drifts upward realm-wide in lit presets)
  ~~~

  After:

  ~~~text
  (§9.1 item 2: the band drifts upward realm-wide in lit presets) [Fable-reviewed 2026-10-18: the prosperity lane re-read the drift as a polarisation — Moderate and above climb, Struggling sinks — upward in aggregate only where generation seeded most seats at Moderate or better; the relative rung this item rests on (J384 (1)) does not turn on the direction]
  ~~~

- **A-amendments-17** — `docs/AMENDMENTS-2026-10-17o.md` at line 423 (before); source: amendments.verdict.json corrections[16] (1-based #17, kind record).

  Before:

  ~~~text
  (V09 §4.19 has no lens row).
  ~~~

  After:

  ~~~text
  (V09 §4.19 has no lens row). [Fable-reviewed 2026-10-18: (b) carries §5.8 (7)'s "the host's public chips" forward unchanged; the lenses lane corrects the phrase in V13 (the host's own chips reach the DM's cards and the premium PDF only; no player surface traced); see file n item 810's bracket.]
  ~~~

- **A-amendments-18** — `docs/AMENDMENTS-2026-10-17p.md` at line 294 (before); source: amendments.verdict.json corrections[17] (1-based #18, kind record).

  Before:

  ~~~text
  dark, where none grows; "upward" is the aggregate, a struggling seat sinking.
  ~~~

  After:

  ~~~text
  dark, where none grows; "upward" is the aggregate, a struggling seat sinking. [Fable-reviewed 2026-10-18: (d)'s note "drifts upward realm-wide in aggregate" is corrected in V13 §5.9 (7) by the prosperity lane — the band polarises (a seat at Moderate or better climbs, a struggling seat sinks) and drifts upward in aggregate where generation seeded most seats at Moderate or better; the writer gate this item states stands.]
  ~~~

- **A-amendments-19** — `docs/AMENDMENTS-2026-10-17q.md` at line 497 (before); source: amendments.verdict.json corrections[18] (1-based #19, kind record).

  Before:

  ~~~text
  host `docs/PHASE55_SPATIAL_ENGINE_DESIGN.md:1372-1375`, `:1534-1535`
  (a cost-law change "a DISCRETE re-canonize event", behind the entitlement); host `src/domain/spatial/canonMembership.js:116-127`
  (the DM asked to re-map a seat founded since)
  ~~~

  After:

  ~~~text
  host `docs/PHASE55_SPATIAL_ENGINE_DESIGN.md:1372-1375`
  (a cost-law change "a DISCRETE re-canonize event"; behind the entitlement as every canonize is, `src/store/campaignWorldPulseSlice.js:389-391`; the installed base's re-derivation an open owner decision, `:1534-1535` [Fable-reviewed 2026-10-18: AV-4]); host `src/domain/spatial/canonMembership.js:116-124` [Fable-reviewed 2026-10-18: was `:116-127`; the file has 125 lines, its re-map note is :116-124; AV-9]
  (the DM asked to re-map a seat founded since)
  ~~~

- **A-amendments-20** — `docs/AMENDMENTS-2026-10-17q.md` at line 899 (before); source: amendments.verdict.json corrections[19] (1-based #20, kind record).

  Before:

  ~~~text
  a cost-law change is a discrete, entitled re-canonize (`PHASE55…:1372-1375`, `:1534-1535`)
  ~~~

  After:

  ~~~text
  a cost-law change is a discrete re-canonize (`PHASE55…:1372-1375`), entitled as every canonize is (`campaignWorldPulseSlice.js:389-391`; the installed base's policy an open owner decision, `PHASE55…:1534-1535`) [Fable-reviewed 2026-10-18: AV-4]
  ~~~

- **A-amendments-21** — `docs/AMENDMENTS-2026-10-17q.md` at line 360 (before); source: amendments.verdict.json corrections[20] (1-based #21, kind record).

  Before:

  ~~~text
  `src/domain/spatial/canonMembership.js:5-13`, `:116-127` (a seat founded after the canon has no territory, no gates, no
  ~~~

  After:

  ~~~text
  `src/domain/spatial/canonMembership.js:5-13`, `:116-124` [Fable-reviewed 2026-10-18: was `:116-127`; AV-9] (a seat founded after the canon has no territory, no gates, no
  ~~~

- **A-amendments-22** — `docs/AMENDMENTS-2026-10-17q.md` at line 637 (before); source: amendments.verdict.json corrections[21] (1-based #22, kind record).

  Before:

  ~~~text
  `src/store/campaignWorldPulseSlice.js:368-370`, `src/domain/spatial/canonMembership.js:116-127`; [INFERRED] the owner's
  ~~~

  After:

  ~~~text
  `src/store/campaignWorldPulseSlice.js:368-370`, `src/domain/spatial/canonMembership.js:116-124` [Fable-reviewed 2026-10-18: was `:116-127`; AV-9]; [INFERRED] the owner's
  ~~~

- **A-amendments-23** — `docs/AMENDMENTS-2026-10-17q.md` at line 897 (before); source: amendments.verdict.json corrections[22] (1-based #23, kind record).

  Before:

  ~~~text
  (`src/domain/spatial/canonMembership.js:5-13`, `:116-127`); the research notes
  ~~~

  After:

  ~~~text
  (`src/domain/spatial/canonMembership.js:5-13`, `:116-124` [Fable-reviewed 2026-10-18: was `:116-127`; AV-9]); the research notes
  ~~~

- **A-amendments-24** — `docs/validation/retrovalidation-2026-10-18/realm.md` at line 90 (before); source: amendments.verdict.json corrections[23] (1-based #24, kind record).

  Before:

  ~~~text
  read through one gate by 31 modules and never re-derived on load
  ~~~

  After:

  ~~~text
  read through one gate by 32 modules (an import-aware count at `81f1cd96`; lane amendments AV-8) and never re-derived on load
  ~~~

- **A-amendments-25** — `research/sf/fp-realm-review.md` at line 101 (before); source: amendments.verdict.json corrections[24] (1-based #25, kind research).

  Before:

  ~~~text
  read through one gate by 31 modules (`campaignSpatialCanonize.js:36,158-186`; `distanceRead.js:115-132`) [OBSERVED];
  ~~~

  After:

  ~~~text
  read through one gate by 32 modules (`campaignSpatialCanonize.js:36,158-186`; `distanceRead.js:115-132`) [OBSERVED; Fable-reviewed 2026-10-18: 32 by an import-aware count at `81f1cd96`, lane amendments AV-8];
  ~~~


### G2 — The two record corrections on rulings.md (faith #60, lenses #40): **FIXED**

- **A-faith-60** — `docs/validation/retrovalidation-2026-10-18/rulings.md` at line 55 (before); source: faith.verdict.json corrections[59] (1-based #60, kind record).

  Before:

  ~~~text
  (never flows on routes; hostility carries hardest)
  ~~~

  After:

  ~~~text
  (never flows on routes; hostility carries hardest of the two-way carriers, an overlord's authority over its vassal harder still, one way)
  ~~~

- **A-lenses-40** — `docs/validation/retrovalidation-2026-10-18/rulings.md` at line 66 (before); source: lenses.verdict.json corrections[39] (1-based #40, kind record).

  Before:

  ~~~text
  players see the host's public chips | UPHELD |
  ~~~

  After:

  ~~~text
  players see the host's public chips | UPHELD (the chip itself is a DM surface — Library/Realm cards and the premium PDF, no player surface traced, lenses.md L1 — so the players' share is nothing today) |
  ~~~


### G3 — Eleven prosperity cross-family corrections (#35, #36–#41, #43–#46): **FIXED**

- **A-prosperity-35** — `research/sf/trade-system.md` at line 334 (before); source: prosperity.verdict.json corrections[34] (1-based #35, kind research).

  Before:

  ~~~text
  Other writers: traditions, roads, corruption, faction capture, demographics
  ~~~

  After:

  ~~~text
  Other writers: traditions, roads [Fable-reviewed 2026-10-18 (lane retrovalidation/prosperity): corruption, faction capture and demographics only read the band — the src-wide writes of a `PROSPERITY_TIERS[...]` label are `wp/upswingKernel.js:917`, `wp/generosityUpdates.js:137`, `wp/traditionsKernel.js:405` and `rd/state.js:495`, and the demographics wave is dark; `research/sf/prosperity-system.md` §3.11, C16]
  ~~~

- **A-prosperity-36** — `research/sf/plague-system.md` at line 372 (before); source: prosperity.verdict.json corrections[35] (1-based #36, kind research).

  Before:

  ~~~text
  **A DM-authored plague does**: Apply-stressor reruns `economicState` [`registryRerunKeys.js:68`], and the prosperity
  generator drops one rank while `plague_onset` is among the stresses [OBSERVED `src/generators/economy/prosperity.js:160`;
  INFERRED that the authored stress is in that list on the rerun].
  ~~~

  After:

  ~~~text
  **A DM-authored plague does, but only at the next regeneration from config** [Fable-reviewed 2026-10-18 (lane retrovalidation/prosperity): Apply-stressor runs no economy pass — `mutateWorld.js:681-690` → `crisisOnset` writes the container, the `config.stressorEdits` record and the promoted condition (`crisisLifecycle.js:300-330`), the event pipeline derives system, causal and faction state only (`eventPipeline.js:37-44`), and `registryRerunKeys.js:68` is a freshness classifier read by `display/economyFreshness.js` alone (`:19-30`; the step-level rerun engine is retired), so the band keeps its generation value after the event (`economyFreshness.js:6-12`); the authored stress persists in `config.stressorEdits.added`, which the generator's stress step overlays on a Regenerate Draft or Edit-Mode re-derivation (`src/generators/steps/resolveStress.js:126-177`; `src/domain/edit/dmLayer.js:911-920`), and there the prosperity generator drops one rank while `plague_onset` is among the stresses (`src/generators/economy/prosperity.js:160`) — as does the Quarantine Council (`stressFactions.js`, a generator step imported by `rulingStructure.js:17` only)].
  ~~~

- **A-prosperity-37** — `research/sf/plague-system.md` at line 47 (before); source: prosperity.verdict.json corrections[36] (1-based #37, kind research).

  Before:

  ~~~text
  and reruns the power and economy generators (a "Quarantine Council" faction, prosperity one rank lower)
  ~~~

  After:

  ~~~text
  and leaves an authored stress in `config.stressorEdits` that the power and economy generators read at the next regeneration from config (a "Quarantine Council" faction, prosperity one rank lower — at a Regenerate Draft or Edit-Mode re-derivation, never at apply: §3.12 [Fable-reviewed 2026-10-18])
  ~~~

- **A-prosperity-38** — `research/sf/plague-system.md` at line 409 (before); source: prosperity.verdict.json corrections[37] (1-based #38, kind research).

  Before:

  ~~~text
  and the rerun of power and economy adds the Quarantine Council and the prosperity drop (§3.10,
    §3.12).
  ~~~

  After:

  ~~~text
  and the next regeneration from config (not the apply itself) adds the Quarantine Council and the prosperity drop (§3.10,
    §3.12 [Fable-reviewed 2026-10-18]).
  ~~~

- **A-prosperity-39** — `research/sf/plague-system.md` at line 663 (before); source: prosperity.verdict.json corrections[38] (1-based #39, kind research).

  Before:

  ~~~text
  the felt plague at default tuning; reruns power and economy (Quarantine Council, prosperity −1) |
  ~~~

  After:

  ~~~text
  the felt plague at default tuning; the Quarantine Council and the prosperity −1 land at the next regeneration from config, not at apply (§3.12 [Fable-reviewed 2026-10-18]) |
  ~~~

- **A-prosperity-40** — `research/sf/plague-system.md` at line 1078 (before); source: prosperity.verdict.json corrections[39] (1-based #40, kind research).

  Before:

  ~~~text
  That the authored stress is in the rerun's stress list is INFERRED |
  ~~~

  After:

  ~~~text
  That the authored stress is in the rerun's stress list is INFERRED [Fable-reviewed 2026-10-18: no rerun runs on Apply-stressor — `registryRerunKeys.js` is a freshness classifier (`:19-30`); the drop lands at the next Regenerate Draft or Edit-Mode re-derivation, where `resolveStress.js:126-177` overlays the authored stress; §3.12 as corrected] |
  ~~~

- **A-prosperity-41** — `research/sf/plague-system.md` at line 1087 (before); source: prosperity.verdict.json corrections[40] (1-based #41, kind research).

  Before:

  ~~~text
  | M7 | The Apply-stressor regeneration rerun: prosperity, Quarantine Council, institution-effect hooks, defence posture | Partly holds.
  ~~~

  After:

  ~~~text
  | M7 | The Apply-stressor regeneration rerun: prosperity, Quarantine Council, institution-effect hooks, defence posture | Partly holds [Fable-reviewed 2026-10-18: and only at the next regeneration from config — no rerun runs at apply; §3.12 as corrected].
  ~~~

- **A-prosperity-43** — `docs/HOST-REQUIREMENTS-2026-10-18.md` at line 736 (before); source: prosperity.verdict.json corrections[42] (1-based #43, kind record).

  Before:

  ~~~text
  a boom or bust (enter 3.0, exit 1.5, dwell 3)
  ~~~

  After:

  ~~~text
  a boom or bust (a boom enters at throughput 3.0 with centrality 0.3 after a 3-tick dwell; a bust below 1.0 or on embattlement — 1.5 is the building-phase floor, not a boom exit, `src/domain/worldPulse/upswingKernel.js:644-653` [Fable-reviewed 2026-10-18])
  ~~~

- **A-prosperity-44** — `docs/HOST-REQUIREMENTS-2026-10-18.md` at line 412 (before); source: prosperity.verdict.json corrections[43] (1-based #44, kind record).

  Before:

  ~~~text
  although the upswing design §4 promises receipted steps. Host `docs/DESIGN_UPSWING_RELATIONSHIP_FLOWS.md` §4.
  ~~~

  After:

  ~~~text
  although the upswing design promises receipted, receipt-visible steps (its §0 and B2) and the code's own tuning comment says "receipted". Host `docs/DESIGN_UPSWING_RELATIONSHIP_FLOWS.md:12`, `:103`; `src/domain/worldPulse/upswingKernel.js:121` [Fable-reviewed 2026-10-18].
  ~~~

- **A-prosperity-45** — `docs/HOST-REQUIREMENTS-2026-10-18.md` at line 420 (before); source: prosperity.verdict.json corrections[44] (1-based #45, kind record).

  Before:

  ~~~text
  `src/domain/worldPulse/supplyKernel.js:580-586`
  ~~~

  After:

  ~~~text
  `src/domain/worldPulse/supplyKernel.js:590-591`
  ~~~

- **A-prosperity-46** — `docs/HOST-REQUIREMENTS-2026-10-18.md` at line 425 (before); source: prosperity.verdict.json corrections[45] (1-based #46, kind record).

  Before:

  ~~~text
  `src/domain/worldPulse/settlementLifecycleFirstClass.js:291`, `:319`, `:410`
  ~~~

  After:

  ~~~text
  `src/domain/worldPulse/settlementLifecycleFirstClass.js:291`, `:319`, `:411-412`
  ~~~


### G4 — trade #38 (fp-physical-integration.md row A1): **FIXED**

- **A-trade-38** — `research/sf/fp-physical-integration.md` at line 111 (before); source: trade.verdict.json corrections[37] (1-based #38, kind research).

  Before:

  ~~~text
  from W8's budgeted flood with the host's `TerritorySeed`s and cost vector
  ~~~

  After:

  ~~~text
  from W8a's unbudgeted nearest-seat flood over the host's seats (J-V13.63; budgets and cost vectors retired) [Fable-reviewed 2026-10-18, trade lane]
  ~~~


### G5 — scripts #13–#14 (HANDOFF script cells): **FIXED**

- **A-scripts-13** — `docs/HANDOFF.md` at line 145 (before); source: scripts.verdict.json corrections[12] (1-based #13, kind record).

  Before:

  ~~~text
  | wf_a7c82671-f52 systems read continuation | — | LANDED (J383) | — |
  ~~~

  After:

  ~~~text
  | wf_a7c82671-f52 systems read continuation | workflows/38b-systems-read-continue.js | LANDED (J383) | — |
  ~~~

- **A-scripts-14** — `docs/HANDOFF.md` at line 146 (before); source: scripts.verdict.json corrections[13] (1-based #14, kind record).

  Before:

  ~~~text
  | wf_868a6476-905 plague read | — | LANDED (J383) | — |
  ~~~

  After:

  ~~~text
  | wf_868a6476-905 plague read | workflows/39-plague-read.js | LANDED (J383) | — |
  ~~~


### G6 — faith V1, fourth site (§10.2 item 25): **FIXED**

- **B-1** — `research/sf/faith-system.md` at line 1348 (before); source: confirm-faith P2 (faith V1, a fourth site the verdict missed).

  Before:

  ~~~text
  hostile war fronts carry faith hardest (§6.2);
  ~~~

  After:

  ~~~text
  hostile war fronts carry faith hardest of the two-way carriers (§6.2);
  ~~~


### G7 — faith C63 bracket splitting "a host adoption": **FIXED**

- **B-2** — `research/sf/faith-system.md` at line 1258 (before); source: confirm-faith P3 (C63 bracket splits "a host adoption").

  Before:

  ~~~text
  a host [Fable-reviewed 2026-10-18: ruled by J384 (10) under the owner's delegation — holy places and hidden cult sites enter only as DM-placed world sites tagged with a deity, DM-only by default, offered to the host; never generated]
     adoption.
  ~~~

  After:

  ~~~text
  a host
     adoption. [Fable-reviewed 2026-10-18: ruled by J384 (10) under the owner's delegation — holy places and hidden cult sites enter only as DM-placed world sites tagged with a deity, DM-only by default, offered to the host; never generated]
  ~~~


### G8 — faith V1 inherited by HOST-REQUIREMENTS faith-OQ4: **FIXED**

- **B-3** — `docs/HOST-REQUIREMENTS-2026-10-18.md` at line 246 (before); source: confirm-faith P4 (faith V1 inherited by the owner document).

  Before:

  ~~~text
  Hostile relationships carry faith at 0.72, the strongest carrier (see faith-25e).
  ~~~

  After:

  ~~~text
  Hostile relationships carry faith at 0.72, the strongest two-way carrier (an overlord's authority over its vassal reaches 0.82, one way; see faith-25e).
  ~~~


### G9 — FP physical note row M2 (the name FV-13 retired): **FIXED**

- **B-4** — `research/sf/fp-physical-integration.md` at line 157 (before); source: confirm-fp (c) (FV-13 sibling row M2).

  Before:

  ~~~text
  adds a modality weight and a blockade-bypass share [OBSERVED tradeFlow.js:102,138; blockadeTransport.js:20]
  ~~~

  After:

  ~~~text
  adds a modality weight and the food-import coverage rate that foodStockpile's `blockadeBypass` applies (0.3; 0.15 besieged) [OBSERVED tradeFlow.js:102,138; blockadeTransport.js:20]
  ~~~


### G10 — population §8.3 item 2 (the OVERTURNED R-12 audience): **FIXED**

- **B-5** — `research/sf/population-system.md` at line 706 (before); source: confirm-population §4 (V-1 site §8.3 item 2 the verdict missed).

  Before:

  ~~~text
     players, the believed trend where it exists (P-17).
  ~~~

  After:

  ~~~text
     players, the host's own dossier direction sentence over that ring (§8.5), never the believed trend, which the host records for its courts (P-17) and shows to no one [Fable-reviewed 2026-10-18: was "for players, the believed trend where it exists (P-17)"; V-1, D-1].
  ~~~


### G11 — prosperity note pointers drifted by other lanes: **FIXED**

- **B-6** — `research/sf/prosperity-system.md` at line 456 (before); source: confirm-prosperity fix 1 (line drifted by apply-population C-4a).

  Before:

  ~~~text
  reading, `research/sf/population-system.md:417`, row C
  ~~~

  After:

  ~~~text
  reading, `research/sf/population-system.md:416`, row C
  ~~~

- **B-7** — `research/sf/prosperity-system.md` at line 570 (before); source: confirm-prosperity fix 2a (apply-plague shifted §3.12 to :368; PL-1 will move it again).

  Before:

  ~~~text
  agrees with `research/sf/plague-system.md:364-366` for the pulse lanes
  ~~~

  After:

  ~~~text
  agrees with `research/sf/plague-system.md` §3.12, first paragraph, for the pulse lanes
  ~~~

- **B-8** — `research/sf/prosperity-system.md` at line 570 (before); source: confirm-prosperity fix 2b.

  Before:

  ~~~text
  that note's :368-371 said
  ~~~

  After:

  ~~~text
  that note's §3.12, second paragraph, said
  ~~~


### G12 — alignment CR-26 / CR-28 V13 line citations (+13 from file s): **FIXED**

- **B-9** — `research/sf/alignment-system.md` at line 872 (before); source: critic drift scan: CR-26 cited V13 at 4,452 lines; file s (items 927–939) moved these lines by +13.

  Before:

  ~~~text
  V13 §3.9 W8 (now `:1779`) reads the host's culture distance between the seed seat and the owning seat, banded in fifths, in its plain form (V13:662, :811, :1101, :1811-1820;
  ~~~

  After:

  ~~~text
  V13 §3.9 W8 (now `:1792`) reads the host's culture distance between the seed seat and the owning seat, banded in fifths, in its plain form (V13:675, :824, :1114, :1824-1833;
  ~~~

- **B-10** — `research/sf/alignment-system.md` at line 902 (before); source: critic drift scan: CR-28, same cause.

  Before:

  ~~~text
  [Fable-reviewed 2026-10-18: J384 (2), V13:811, :1811-1820 — this item was written before J384]
  ~~~

  After:

  ~~~text
  [Fable-reviewed 2026-10-18: J384 (2), V13:824, :1824-1833 — this item was written before J384]
  ~~~


### G13 — 36 / 36b headers: fp-realm-review.md:798 -> :800: **FIXED**

- **B-11** — `workflows/36-realm-review.js` at line 1 (before); source: critic drift scan: apply-realm C25 added two lines above :798.

  Before:

  ~~~text
  the run's output records it absent at fp-realm-review.md:798)
  ~~~

  After:

  ~~~text
  the run's output records it absent at fp-realm-review.md:800)
  ~~~

- **B-12** — `workflows/36b-realm-review-continue.js` at line 1 (before); source: critic drift scan: same.

  Before:

  ~~~text
  (fp-physical-integration.md §9; fp-realm-review.md:798)
  ~~~

  After:

  ~~~text
  (fp-physical-integration.md §9; fp-realm-review.md:800)
  ~~~


### G14 — realm.md RV-4 row "(corrections 2, 20)": **FIXED**

- **B-13** — `docs/validation/retrovalidation-2026-10-18/realm.md` at line 62 (before); source: confirm-realm R1 (the record cell).

  Before:

  ~~~text
  both halves of J382 sit in J-RR.49 and RR-46 (corrections 2, 20) |
  ~~~

  After:

  ~~~text
  both halves of J382 sit in J-RR.49 and RR-46 (correction 2; its second site, the §6 preamble, applied as apply-realm's A1 and confirmed by confirm-realm [Fable-reviewed 2026-10-18 (critic): correction 20 is RR-8's register bracket, not RV-4's second site]) |
  ~~~


### G15 — scripts records: S8 "38b:61" and R6 "41:101", "43:93": **FIXED**

- **B-14** — `docs/validation/retrovalidation-2026-10-18/scripts.md` at line 30 (before); source: confirm-scripts P4.

  Before:

  ~~~text
  Header comment (38:47; 38b:61). |
  ~~~

  After:

  ~~~text
  Header comment (38:47; 38b:61 [Fable-reviewed 2026-10-18 (confirm-scripts): 38b:48, not :61 — line 61 is the population subject line; applied with 48]). |
  ~~~

- **B-15** — `docs/validation/retrovalidation-2026-10-18/scripts-verify.md` at line 27 (before); source: confirm-scripts P4.

  Before:

  ~~~text
  "src/domain/corruption.js, src/domain/worldPulse/supplyKernel.js, migrationKernel.js, peaceReasons.js, warSeatBooks.js" |
  ~~~

  After:

  ~~~text
  "src/domain/corruption.js, src/domain/worldPulse/supplyKernel.js, migrationKernel.js, peaceReasons.js, warSeatBooks.js" [Fable-reviewed 2026-10-18 (confirm-scripts): 38b:48, not :61 — line 61 is the population subject line; applied with 48] |
  ~~~

- **B-16** — `docs/validation/retrovalidation-2026-10-18/scripts.md` at line 54 (before); source: confirm-scripts P3 (the record; the verdict JSON's reason strings are frozen inputs and stay).

  Before:

  ~~~text
  | R6 | 41:101; 42:25; 43:93 |
  ~~~

  After:

  ~~~text
  | R6 | 41:101 [Fable-reviewed 2026-10-18 (confirm-scripts): 41:25 as run]; 42:25; 43:93 [Fable-reviewed 2026-10-18 (confirm-scripts): 43:25 as run] |
  ~~~


### G16 — M0 gate K11 held-set text (2)–(4) -> (2)–(3): **FIXED**

- **B-17** — `plat/docs/build/checks/M0-world-sites-gate.md` at line 209 (before); source: confirm-small 1 (the source of the held-set misreading).

  Before:

  ~~~text
  §3.6's held set (2)–(4) — crossing ends and raised feet are
  ~~~

  After:

  ~~~text
  §3.6's held set (2)–(3) — crossing ends, unless fromLevel = 0, and raised feet are
  ~~~

- **B-18** — `plat/docs/build/checks/M0-world-sites-gate.md` at line 218 (before); source: confirm-small 1.

  Before:

  ~~~text
  set, §3.6 (2)–(4)) as the kernel's defaults
  ~~~

  After:

  ~~~text
  set, §3.6 (2)–(3)) as the kernel's defaults
  ~~~


### G17 — plague R7: the pg-4 quarantine row in HOST-REQUIREMENTS: **FIXED**

- **B-19** — `docs/HOST-REQUIREMENTS-2026-10-18.md` at line 480 (before); source: plague validator R7's consequence (HOST-REQUIREMENTS carries no pg-4 row). **Applied with one recorded adjustment** (below).

  Before:

  ~~~text
  | plague-10.2-8 | Should a moderate DM plague displace refugees (plague-10.1-27)? | Today the DM's default band sends nobody. | Owner ruling. | open question; plague-system.md §10.2 question 8 (line 943) |
  ~~~

  After:

  ~~~text
  | plague-10.2-8 | Should a moderate DM plague displace refugees (plague-10.1-27)? | Today the DM's default band sends nobody. | Owner ruling. | open question; plague-system.md §10.2 question 8 (line 943) |
  | plague-R7 | PG pg-4's quarantine or gate-closure verb is DESIGNED ONLY and PG names quarantine an owner value: is it to be built, and if so as the host's own verb with a stance input — never as a patrol fact the map draws (a patrol holds no quarantine line)? | Without the verb the DM has no plague-control action to author, and no border, patrol or march can stand in for it. | Owner ruling (PG names it an owner value). | open question; plague-system.md §5.1 row 14 (line 531), §7 (line 672); retrovalidation/plague ruling R7 (Fable, 2026-10-18) |
  ~~~


### G18 — the eight script headers' as-run line-number clause: **FIXED**

- **C-36** — `workflows/36-realm-review.js` at line 1 (before); source: confirm-scripts P2 (ruled: apply).

  Before:

  ~~~text
  its prompt text stays as fed. Correction
  ~~~

  After:

  ~~~text
  its prompt text stays as fed; the line numbers below are those of the script as it ran (this comment shifts each by one). Correction
  ~~~

- **C-36b** — `workflows/36b-realm-review-continue.js` at line 1 (before); source: confirm-scripts P2 (ruled: apply).

  Before:

  ~~~text
  its prompt text stays as fed. Correction
  ~~~

  After:

  ~~~text
  its prompt text stays as fed; the line numbers below are those of the script as it ran (this comment shifts each by one). Correction
  ~~~

- **C-37** — `workflows/37-faith-read.js` at line 1 (before); source: confirm-scripts P2 (ruled: apply).

  Before:

  ~~~text
  its prompt text stays as fed. Correction
  ~~~

  After:

  ~~~text
  its prompt text stays as fed; the line numbers below are those of the script as it ran (this comment shifts each by one). Correction
  ~~~

- **C-38** — `workflows/38-systems-read.js` at line 1 (before); source: confirm-scripts P2 (ruled: apply).

  Before:

  ~~~text
  its prompt text stays as fed. Correction
  ~~~

  After:

  ~~~text
  its prompt text stays as fed; the line numbers below are those of the script as it ran (this comment shifts each by one). Correction
  ~~~

- **C-38b** — `workflows/38b-systems-read-continue.js` at line 1 (before); source: confirm-scripts P2 (ruled: apply).

  Before:

  ~~~text
  its prompt text stays as fed. Correction
  ~~~

  After:

  ~~~text
  its prompt text stays as fed; the line numbers below are those of the script as it ran (this comment shifts each by one). Correction
  ~~~

- **C-41** — `workflows/41-lens-close.js` at line 1 (before); source: confirm-scripts P2 (ruled: apply).

  Before:

  ~~~text
  its prompt text stays as fed. Correction
  ~~~

  After:

  ~~~text
  its prompt text stays as fed; the line numbers below are those of the script as it ran (this comment shifts each by one). Correction
  ~~~

- **C-42** — `workflows/42-lens-final.js` at line 1 (before); source: confirm-scripts P2 (ruled: apply).

  Before:

  ~~~text
  its prompt text stays as fed. Correction
  ~~~

  After:

  ~~~text
  its prompt text stays as fed; the line numbers below are those of the script as it ran (this comment shifts each by one). Correction
  ~~~

- **C-43** — `workflows/43-lens-q.js` at line 1 (before); source: confirm-scripts P2 (ruled: apply).

  Before:

  ~~~text
  its prompt text stays as fed. Correction
  ~~~

  After:

  ~~~text
  its prompt text stays as fed; the line numbers below are those of the script as it ran (this comment shifts each by one). Correction
  ~~~

### G19 — J392, the retrovalidation's own journal row: **LEFT OPEN** (the session's, not a seat's)

**Why it stays open.** Journal rows in `docs/PROGRESS.md` are the session's and append-only. The gap's own fix says
"Not an Opus seat's edit … The session writes J392 carrying the list in critic.md §5 items 1-8 verbatim". So this
lane writes nothing there. Checked at 09:38Z: `docs/PROGRESS.md` still ends J390, J391, J393, J394, and J393 still
reserves J392.

**What changes for J392 after this lane:**

- Item 1: the 66 close-gaps fragments are now applied (§1 above). Their confirm is the second Fable look.
- Item 5: A-prosperity-43…46, B-3 and B-19 have now landed in `docs/HOST-REQUIREMENTS-2026-10-18.md`. Re-placing the
  Claude-doc mirror is now due, and it is the session's job.
- Item 7: the K11 gate fix (B-17, B-18) has landed.
- New for J392: §3 N-1 below.

No retrovalidation file changes for this gap.

## 3. Found by this lane, outside the gap list

### N-1 — the host-requirements document's line pointers into the research notes: **LEFT OPEN** (no fix supplied; not this lane's file beyond its fragments)

`docs/HOST-REQUIREMENTS-2026-10-18.md` cites the research notes as `<note>.md §… item k (line N)`. There are 349 such
pointers. They were right at the notes' pre-apply state. Spot-checked against the apply lanes' before-copies: plague
§10.2 question 8 at :943; alignment §10 items 3 and 17 at :966 and :1028; trade §10.1 item 3 and §10.2 item 19 at
:1014 and :1056; population §10.1 item 1 and §10.2 item 3 at :844 and :902. All held. The twelve apply lanes
(05:24–05:32Z) then added or removed lines above them, and A-prosperity-36 moved the plague note by −2 more.

A `difflib` line map from each before-copy to the live note gives the count of moved pointers per note
(`retro/close-gaps/hr_drift.py`; per-row map in `retro/close-gaps/hr_drift.json`):

| note | pointers | moved | the cited line itself changed |
|---|---|---|---|
| alignment-system.md | 40 | 40 | 0 |
| plague-system.md | 35 | 34 (+1: the new plague-R7 row, which cites the live state and is right) | 0 |
| prosperity-system.md | 32 | 30 | 2 |
| fp-realm-review.md | 7 | 2 | 1 |
| faith-system.md | 60 | 0 | 11 |
| population-system.md | 32 | 29 | 1 |
| lens-implications.md | 44 | 12 | 10 |
| trade-system.md | 52 | 48 | 4 |

The remaining pointers name notes this map does not cover: the V13 and V14 volumes, the fp-simulator and
fp-physical notes, the audit and file m. They were not mapped.

Every pointer also carries its section and item label, and those labels are unchanged, so a reader can still find each
item. Only the line number is wrong. The critic's drift scan (ask 7b) mapped the line citations inside the 417
corrections' new texts and did not cover this document's own pointers.

There are two ways to fix it, and choosing between them is a judgement this lane was not given:
- remap each number through `hr_drift.json`, plus a look at the 29 pointers whose cited line itself changed;
- drop the numbers in favour of the labels, which is what the critic chose for B-7 and B-8.

The document is also the owner's, and this lane may edit it only for its named fragments. So N-1 is recorded for the
second Fable look and for J392. This is a new finding, not a deferral of an assigned gap.

## 4. README

`README.md`'s *What was left* now has a dated close-gaps paragraph that sends the reader here. Its 05:35Z list of the
39 is kept as the record of its time, because the README is a dated lane record and the critic's §4 step 4 so rules.
The same paragraph says that the amendments notice on files m–q ("22 dated record brackets and fixes across files m–q
and the realm record, 1 research count") is now true: its 23 fragments are A-amendments-3…25.

## 5. What remains

- **G19 / J392**: the session's row, carrying critic.md §5 items 1–8 and §3 N-1 here.
- **N-1**: the host-requirements document's moved line pointers, for the second Fable look to rule on.
- **The second Fable look** at these 66 fragments, the B-19 adjustment included. The critic names it as the last step
  before the J375 body of work is closed.
- **The Claude-doc mirror** of HOST-REQUIREMENTS: the session re-places it (J392 item 5).

**LANDED** 2026-10-18 (see the lane line).
