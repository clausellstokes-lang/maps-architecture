# M0 → M1 deferral ledger

*Lane filler/m1-deferral-ledger, 2026-10-05. Implementer-side, clean room. A **snapshot**, to be refreshed at M0's close. It lists the work M0's build records hand to M1. It adds no design (J156): where it and the design or the build records differ, those govern. Clause numbers are `scope.json`'s (`n`), the twin `scope.md` uses the same numbering.*

## Sources and their state

| source | state read | what was taken |
|---|---|---|
| `plat/docs/build/M0-work.json` | working copy, 2026-10-05 (file dated 2026-10-04 22:27; the build seats do not write it) | every `defers` entry that names M1 as a whole word: **100 entries over 62 items** |
| `plat/docs/build/choices.md` | **as committed**, the session's copy `maps-scratch/filler/m1-defer/choices.head.md` (rows C-0001 – C-0191) | every row whose choice stages work to M1: **61 rows**; 7 more rows mention M1 without handing work over (listed at the end) |
| `plat/docs/build/checks/M0-spec-notes.md` | **as committed**, the session's copy `spec-notes.head.md` (rows N-01 – N-36) | **1 row** (N-10) |
| `docs/build-prep/M1/scope.json` | as written 2026-10-05 (132 clauses) | the clause numbers in the last column |

Reading rules:

- **M-1 is not M1.** `M0-work.json`'s `afterM1Needs` and the AFTER-M-1 wave are about milestone **M-1**'s deliverables, and so are spec notes N-20 – N-36 and N-28 / N-30's `afterM1Needs`. None of these is listed. `checks/M0-handoff-M1.md` is likewise an M-1 hand-off file despite its name.
- A `defers` entry naming M1 beside another milestone ("M1 / M2a", "M1 and later") is listed, with the split in the note column. Only its M1 part is M1's.
- The clause column is a cross-reference made by reading, not a mapping the design states. "—" means no `scope.json` clause covers the entry. Those entries are gathered under *Gaps* below.
- Line numbers are the source file's, 1-based. An `M0-work.json` line is the `defers` string itself. A choices or spec-notes line is the row's line in the committed copy.

## 1. From `M0-work.json` (item `defers`)

| # | item | what M1 receives | source line | M1 clauses | note |
|---|---|---|---|---|---|
| W1 | M0-s-01 | @plat/content, @plat/plots and every later package: created by their milestones (M1 …) — no empty skeletons for them (J156 (2)) | M0-work.json:615 | 36, 31, 30, 32 |  |
| W2 | M0-s-01 | zod: M1 with the document schema (C-0012) | M0-work.json:616 | 25, 27, 14 |  |
| W3 | M0-s-02 | zod schemas and the unit lint → M1 (C-0012, C-0044) | M0-work.json:777 | 25, 27 |  |
| W4 | M0-m-01 | every record of §2.5–§2.7 M0 does not read (Building, Passage, Castle, RaisedWayRecord, …) → M1 and later; declared only where an M0 record's field needs the name | M0-work.json:857 | 124 |  |
| W5 | M0-m-01 | the entity registry and its path-completeness test → M1 | M0-work.json:858 | 124, 27 |  |
| W6 | M0-m-01 | zod → M1 (C-0012) | M0-work.json:859 | 25, 27 |  |
| W7 | M0-a-03 | the pool freeze's rebuild and the frozen copy → M1 | M0-work.json:1058 | 23 |  |
| W8 | M0-a-06 | the pool overlays and merge (steps 1–5) → M1 (E_SCOPE declared) | M0-work.json:1241 | 23 |  |
| W9 | M0-a-07 | claimSubFace's score form (areaCm2, within, score raster) → M1 (S7b) | M0-work.json:1304 | 10 |  |
| W10 | M0-a-09 | S10 step (0)'s band parts → M1 | M0-work.json:1438 | 112 |  |
| W11 | M0-a-10 | Poisson-disc (Bridson, k = 50) and the stamp tiles → M1 (§8.10) | M0-work.json:1514 | 123, 61, 87 |  |
| W12 | M0-a-11 | the regions reader (S10's per-frontage regions) → M1 | M0-work.json:1572 | 112 |  |
| W13 | M0-a-11 | roof readers (RoofSpec) → M1; M0 exercises skeleton('roof') on footprints and returns the arcs and the downgrade | M0-work.json:1573 | — | no clause; scope.json lists it as a discrepancy (§16 places roofs at M2b) |
| W14 | M0-a-12 | B-CITY-lite's footprints and faces → M1 (the corpus bar re-run whole there; C-0015) | M0-work.json:1628 | 129 |  |
| W15 | M0-a-14 | the pool-scope and frozen-base rows → M1 | M0-work.json:1744 | 23, 26 |  |
| W16 | M0-a-15 | .plat document, manifest, content-addressed store, gzip, the root check and the replay → M1 (C-0037) | M0-work.json:1797 | 14, 15 |  |
| W17 | M0-a-15 | the rebuild-partition-on-first-query fallback → M1's open-to-editable bar | M0-work.json:1798 | — | no clause; scope.json lists it as a discrepancy (§16 places open-to-editable in M2a's exit) |
| W18 | M0-a-16 | the pool → M1 | M0-work.json:1863 | 23 |  |
| W19 | M0-d-01 | rerollLayer and the salts' recipe schema → M2a / M1 | M0-work.json:1939 | 50 | split M2a / M1; clause 50 is the nearest (Recipe schema), not an exact match |
| W20 | M0-d-02 | RH32 (§8.1's render hash) → M1 | M0-work.json:1998 | 125 |  |
| W21 | M0-d-04 | the snapshot's stored root and the load's recomputation path → M1 (§2.9); M0 tests the oracle on in-memory trees | M0-work.json:2111 | 15, 14 |  |
| W22 | M0-d-04 | the goldens' canonical text form → M1 (the serialiser exists for tests) | M0-work.json:2112 | 21, 76 |  |
| W23 | M0-d-05a | the archive and tombstone store → M1 | M0-work.json:2173 | 132 |  |
| W24 | M0-d-05b | plots, buildings, yard parts, households, people, labels and the later kinds' anchors → M1 and later (rows added with their kinds) | M0-work.json:2218 | 74, 57 | M1 and later |
| W25 | M0-d-05b | B-EDIT-lite's 1 cm perturbation measurement → M1 | M0-work.json:2219 | 74 |  |
| W26 | M0-d-06 | pool sizes 0–3 → M1 (the pool) | M0-work.json:2273 | 91, 67, 23 |  |
| W27 | M0-d-06 | the derived-complete digest and placement digests → M1 | M0-work.json:2274 | 21, 71 |  |
| W28 | M0-d-07 | the unit lint (a length field without a unit) → M1 with the zod schemas (C-0044) | M0-work.json:2339 | 25 |  |
| W29 | M0-d-07 | the dossier port's adapter-boundary scan → M1 (@plat/port) | M0-work.json:2340 | 131, 45 |  |
| W30 | M0-d-07 | the labels / render import-closure scope → M1 (the closure walk is built now and seeded with the model packages) | M0-work.json:2341 | 71 | PLAUSIBLE match: the digest closure feeds the placement digests |
| W31 | M0-d-08 | the pool-size 0–3 clause → M1 | M0-work.json:2397 | 24, 91 |  |
| W32 | M0-d-08 | the derived-complete digest → M1 | M0-work.json:2398 | 21 |  |
| W33 | M0-d-09 | B-CITY's real city → M1 (C-0015): the spike city stands in; every bar re-run at M1 | M0-work.json:2445 | 129, 24 |  |
| W34 | M0-b-01 | the full GranularityLaw (areaM2, joinMax, vacancyRunShare, the manifested band) → M1's @plat/plots (C-0006); S8 then reads it through the registry | M0-work.json:2510 | 31 | scope.json discrepancy: §16 lists the full law at M2b |
| W35 | M0-b-02 | the slope term's real field → M0-e-05 (fields) and M1's slope classes; at M0 a switch at weight 0 on the flat fixture, unit-tested on a synthetic slope | M0-work.json:2558 | — | no clause names slope classes; split with M0-e-05 |
| W36 | M0-b-03 | the substitution rung's pending claims (green, landmark, a joined plot) → M1 with S7b (C-0036) | M0-work.json:2629 | 10 |  |
| W37 | M0-b-03 | the full SeamContract and SeamAmendment → M1 (C-0046) | M0-work.json:2630 | 22, 80 |  |
| W38 | M0-b-03 | the slope class of the band table → M1 (the fusion gate's statistics fallback) | M0-work.json:2632 | 66 |  |
| W39 | M0-b-05 | B-CITY's districts → M1 (the bars re-run there) | M0-work.json:2768 | 130 |  |
| W40 | M0-c-01 | S3 (1) centre scoring, polycentric forms, the separation floor → M1 (C-0032) | M0-work.json:2839 | 7 |  |
| W41 | M0-c-01 | (2) precinct, harbour basin, canals; (8) the castle; (10) moats; (11) the harbour route; (12)'s trade-convergence market → M1 | M0-work.json:2840 | 7, 9, 89 |  |
| W42 | M0-c-01 | the waterfront and closed-arc reductions of (4) → M1 (no water on the flat fixture; the formula's unit test lands now, its readers at M1) | M0-work.json:2841 | 7, 114 |  |
| W43 | M0-c-01 | the water pull's real q(x) → M0-e-05 / M1 (a soft term at weight 0 here) | M0-work.json:2842 | — | no clause names q(x); split with M0-e-05 |
| W44 | M0-c-02 | S7 (towers, gatehouses, gate plazas, the band's L3 parts, the intervallum, condition at generation) → M1 (C-0033) | M0-work.json:2911 | 9, 33 |  |
| W45 | M0-c-02 | barrier closure's real arcs, the waterfront policy's quay-access water gates and sea gates, open chains anchored on a barrier, outer moats → M1 (the basic river water gate is built here, C-0087); the fixed-place law of §2.7 at a water gate → M3a | M0-work.json:2912 | 114, 9 | the fixed-place law at a water gate is M3a's |
| W46 | M0-c-02 | the castle weld → M1 | M0-work.json:2914 | 9 |  |
| W47 | M0-c-03 | the deck strip's geometry (S9's band on the span), the extra-bridge rung and the rest of F-ROUTE → M1 (the slope rung and unserved are built as code paths now and tested on a synthetic impassable edge; the basic span through a site is built here, C-0076) | M0-work.json:2974 | 113 |  |
| W48 | M0-c-03 | TradeFlow → M1 (presets ringed / american, M0.md §4b) | M0-work.json:2976 | 115 |  |
| W49 | M0-c-04 | the waterfront and closed-arc reductions, moats, water gates, the castle → M1 | M0-work.json:3039 | 114, 9, 7 |  |
| W50 | M0-c-05 | ringed / american presets (radiusHold, gridLock, their matrices) → M1 | M0-work.json:3107 | 115 |  |
| W51 | M0-c-05 | water crossings of proposals (sites, bridges) → M1 | M0-work.json:3109 | 113, 59 |  |
| W52 | M0-c-05 | S2's real demand for S5d → M1 (the fixture's quotas stand in, C-0016) | M0-work.json:3112 | 111, 8 |  |
| W53 | M0-c-06 | real terrain (river, coast, relief) → M1's re-run of the gate | M0-work.json:3182 | 66 |  |
| W54 | M0-c-07 | the slope class of the band table → M1's gate re-run on real terrain | M0-work.json:3256 | 66 |  |
| W55 | M0-e-01 | S1 (2) the coast routine and the outline template rows; (4) islands; (6) harbour candidates; (7) bank classes; the oasis; the geology flag; Terrain.mining → M1 (C-0048) | M0-work.json:3323 | 28, 47, 43 |  |
| W56 | M0-e-01 | the relief toggle's S0 pick → M1 | M0-work.json:3324 | 43 |  |
| W57 | M0-e-02 | the delta's distributaries and river islands → M1 | M0-work.json:3385 | 28 |  |
| W58 | M0-e-02 | lakes from sinks as water bodies, the coast's coupling → M1 | M0-work.json:3386 | 28 |  |
| W59 | M0-e-03 | coast, lakes, islets, ponds, oases → M1 (C-0048) | M0-work.json:3455 | 28, 47 |  |
| W60 | M0-e-03 | a site becoming a bridge (a route laying the span through its two deck_end vertices) → M0-c-03, S4's basic water crossing (C-0076), integrated on the river fixture by M0-e-06; the deck strip's geometry and the extra-bridge rung → M1 | M0-work.json:3456 | 113, 59 | only the last clause of the entry is M1's |
| W61 | M0-e-03 | bank classes and the shoreSetback readers → M1 | M0-work.json:3457 | 28 |  |
| W62 | M0-e-04 | the roster's real demand (S2) and S7b's allocation → M1 (C-0035) | M0-work.json:3521 | 111, 10 |  |
| W63 | M0-e-04 | the margin band's L3 parts (S10 step (0)) → M1 | M0-work.json:3523 | 112 |  |
| W64 | M0-e-04 | the hinterland unit → M1 | M0-work.json:3525 | — | no clause names the hinterland unit (M0-x-02 splits it M1 / M6-U) |
| W65 | M0-e-05 | pass 2 (S10a) → M1 | M0-work.json:3591 | 4, 31 |  |
| W66 | M0-e-05 | the roster's shares → M1 (the default shares stand in; C-0049) | M0-work.json:3592 | 111 |  |
| W67 | M0-e-06 | coast and relief configurations beyond the two fixtures → M1's gate re-run | M0-work.json:3655 | 66 |  |
| W68 | M0-e-06 | the pool → M1 | M0-work.json:3656 | 23 |  |
| W69 | M0-f-01 | the browser parts of calibrate (the Canvas2D raster, the GPU probe) and the hardware tiers → M1 / M4 | M0-work.json:3730 | — | split M1 / M4; no clause names calibrate's browser parts |
| W70 | M0-f-01 | the Chrome-worker figures of §12.3's model budgets → M1 (nightly); the fusion and site gates' Chromium-worker figures are taken by M0-t-01 through M0-d-06's runner (C-0082) | M0-work.json:3731 | 67, 116 |  |
| W71 | M0-f-03a | the nightly flatness sweep and its pre-decided coefficient fallback → M1 (§13.2) | M0-work.json:3794 | 108, 116 |  |
| W72 | M0-f-03b | re-fitting on B-CITY-lite and the nightly flatness sweep → M1 | M0-work.json:3839 | 108, 116 |  |
| W73 | M0-k-01 | B-CITY's seed families → M1 | M0-work.json:3888 | 20, 52 |  |
| W74 | M0-k-02 | the classes tagged M1, M2b, M3a, M4, M5, M6-P, M6-U — their generators are stubs that return 'deferred' with the tag, counted by the runner (C-0038) | M0-work.json:3930 | 23, 26 | M1 is one tag of seven; only the M1-tagged classes are M1's |
| W75 | M0-k-04 | B-EDIT and B-CITY-lite's fault injection → M1 / M2a | M0-work.json:4029 | 128, 74 | split M1 / M2a |
| W76 | M0-k-05 | plat measure, plat calibrate, the register, the seed families' collision rule → M1 / V12 | M0-work.json:4103 | 52, 3, 119 | split M1 / V12 |
| W77 | M0-x-02 | the derivation pool, the hinterland unit, the tail, the worker host → M1 / M6-U | M0-work.json:4177 | 23 | split M1 / M6-U; the hinterland, tail and worker host have no clause |
| W78 | M0-x-02 | S0's blueprint expansion → M1 (a fixture Blueprint stands in) | M0-work.json:4178 | 4, 43 |  |
| W79 | M0-x-02 | every stage M0 does not build (S2, S7, S7b, S9 …) → M1 | M0-work.json:4180 | 4, 111, 112, 9, 10 |  |
| W80 | M0-t-00 | the Chrome-worker re-measure of §12.3's model budgets at TOWN and CITY → M1 (nightly), where they are first gated; the fusion and site gates are measured in Chromium's worker here (C-0082) | M0-work.json:4238 | 67, 116 |  |
| W81 | M0-t-00 | pool sizes → M1 | M0-work.json:4239 | 67, 91 |  |
| W82 | M0-t-01 | the Chrome-worker re-measure of §12.3's model budgets at TOWN and CITY → M1 (nightly), where they are first gated; the fusion and site gates are measured in Chromium's worker here (C-0082) | M0-work.json:4319 | 67, 116 |  |
| W83 | M0-t-01 | pool sizes → M1 | M0-work.json:4320 | 67, 91 |  |
| W84 | M0-t-02 | the fusion gate's re-run on B-CITY-lite's river, coast and relief configurations → M1 (§16 M1) | M0-work.json:4394 | 66 |  |
| W85 | M0-x-01 | the golden tooling, shift and cascade records → M1 (C-0042) | M0-work.json:4447 | 21, 1 |  |
| W86 | M0-x-03 | known-defects.json's file → M1 (@plat/docs); at M0 the entries are listed in the addendum | M0-work.json:4507 | 120 |  |
| W87 | M0-b-05a | B-CITY's districts → M1 (the bars re-run there) | M0-work.json:4562 | 130 |  |
| W88 | M0-b-05b | B-CITY's districts → M1 (the bars re-run there) | M0-work.json:4617 | 130 |  |
| W89 | M0-c-07a | the slope class of the band table → M1's gate re-run on real terrain | M0-work.json:4679 | 66 |  |
| W90 | M0-c-07b | the slope class of the band table → M1's gate re-run on real terrain | M0-work.json:4736 | 66 |  |
| W91 | M0-f-02a | B-CITY-lite, B-EDIT, goldens, the five-engine golden run, visual regression → M1 and later | M0-work.json:4793 | 20, 21, 63, 71, 74, 116 | M1 and later |
| W92 | M0-f-02b | B-CITY-lite, B-EDIT, goldens, the five-engine golden run, visual regression → M1 and later | M0-work.json:4858 | 20, 21, 63, 71, 74, 116 | M1 and later |
| W93 | M0-k-06 | plat/assets' files and the fonts' name tables → M1 (no assets at M0) | M0-work.json:4934 | — | no clause; nearest are 61 (stamp-tile asset) and 92 (font faces) |
| W94 | M0-k-06 | the dossier port's adapter-boundary key scan → M1 (@plat/port) | M0-work.json:4935 | 131 |  |
| W95 | M0-x-04 | every stage M0 does not build (S0's expansion, S2, S7, S7b, S9 …) → M1 | M0-work.json:5046 | 4, 43, 111, 112, 9, 10 |  |
| W96 | M0-x-05 | the later rungs of F-ROUTE, F-RIVER and F-WALL → M1 / M3a (tagged in the table) | M0-work.json:5107 | 113 | split M1 / M3a |
| W97 | M0-x-05 | the fault-injection hook's B-CITY-lite form → M1 (§5.1 (8)) | M0-work.json:5108 | 128 |  |
| W98 | M0-x-06 | EP-02, EP-03, EP-07 – EP-15, EP-17 – EP-19, EP-21, EP-22, EP-24 – EP-27 and every combination cell outside the frame column's cliff, river, bridge and wall rows (the cliff cell's drawn clause → M1, S14; C-0118) → the milestone of each row's mechanism (listed in the coverage table) | M0-work.json:5175 | 104 | mostly later milestones; the M1 part is the cliff × frame drawn clause and the rows whose mechanism lands at M1 |
| W99 | M0-x-06 | EP-20's island, fjord and narrow-valley fixtures and EP-23's S5b / S5c part → M1 (coast and islands; S5 on relief with B-CITY) | M0-work.json:5177 | 104 |  |
| W100 | M0-x-06 | the rung sweep (TOWN, METROPOLIS) and the preset sweep (the parity presets, each layer on and off) → M1 (the presets and the size ladder's fixtures; C-0100) | M0-work.json:5178 | 104 |  |

## 2. From `choices.md` as committed

| # | row | items | what M1 receives | source line | M1 clauses | note |
|---|---|---|---|---|---|---|
| K1 | C-0006 | M0-b-01 | The full `GranularityLaw` in `@plat/plots`; S8 then reads it through the registry | choices.md:17 | 31 | scope.json discrepancy: §16 M2b |
| K2 | C-0012 | M0-s-01, M0-s-02, M0-m-01 | `zod` adoption and its vendored scan, with the document schema | choices.md:23 | 25, 27 |  |
| K3 | C-0015 | M0-d-06, M0-d-09, M0-a-12, M0-d-05b | Every M0 bar stated on "a B-CITY city" re-run on B-CITY and B-CITY-lite | choices.md:26 | 129 |  |
| K4 | C-0016 | M0-c-05 | S2's real demand (M0 uses the fixture's quotas) | choices.md:27 | 111 |  |
| K5 | C-0018 | M0-k-05 | R4 measured on lots, not block OBB axes | choices.md:29 | 117 |  |
| K6 | C-0021 | M0-f-03a/b | `workLimits.json` coefficients re-fitted on B-CITY-lite | choices.md:32 | 108 |  |
| K7 | C-0032 | M0-c-01 | S3 (1) centre scoring, (2) precinct, harbour, canals, (8) castle, (10) moats, (11) harbour route, (12) trade-convergence market, (13) destinations beyond plaza and gates | choices.md:43 | 7 |  |
| K8 | C-0033 | M0-c-02 | S7 whole: the band, towers and gatehouses beyond the minimal `Enceinte` | choices.md:44 | 9, 33 |  |
| K9 | C-0035 | M0-e-04 | The roster (S2); real demand replaces the synthetic typing table | choices.md:46 | 111 |  |
| K10 | C-0036 | M0-b-03 | The allocation's pending claims (green, landmark, joined plot) with S7b; rung (d) then reads them | choices.md:47 | 10 |  |
| K11 | C-0037 | M0-a-15 | The `.plat` document around the arena block: manifest, content-addressed chunks, gzip, root check | choices.md:48 | 14, 15 |  |
| K12 | C-0038 | M0-k-02 | B-FUZZ re-run whole with the pool overlays class (M1; other classes later) | choices.md:49 | 23, 26 |  |
| K13 | C-0042 | M0-x-01 | Golden tooling; the first shift and cascade records; M1 ingests M0-record.json | choices.md:53 | 1, 21 |  |
| K14 | C-0044 | M0-d-07 | The unit lint, with the `zod` schemas | choices.md:55 | 25 |  |
| K15 | C-0046 | M0-b-03, M0-m-01 | The full `SeamContract` and `SeamAmendment` | choices.md:57 | 22, 80 |  |
| K16 | C-0048 | M0-e-01, M0-e-03 | S1 coast (2), islands (4), harbour candidates (6), bank classes (7), oasis, geology flag | choices.md:59 | 28, 43, 47 |  |
| K17 | C-0049 | M0-e-05 | The roster's household shares feeding `FieldBands` | choices.md:60 | 111 |  |
| K18 | C-0050 | M0-f-01 | Calibrate's browser parts (Canvas2D raster, GPU probe, hardware tiers) | choices.md:61 | — | split M1 / M4; no clause |
| K19 | C-0070 | M0-s-02 | `plat calibrate register --check`, run over M0's calibratable cells at M1's exit | choices.md:81 | 3 |  |
| K20 | C-0072 | M0-c-07a, M0-k-05 | R4 and wall alignment as gates on lots; lots per block | choices.md:83 | 117 |  |
| K21 | C-0074 | M0-d-06, M0-t-00 | §12.3 model budgets first gated; the in-Chrome re-measure (nightly) | choices.md:85 | 67 |  |
| K22 | C-0076 | M0-c-03, M0-e-03 | The deck strip's geometry, the extra-bridge rung, the rest of F-ROUTE | choices.md:87 | 113 |  |
| K23 | C-0082 | M0-t-00, M0-t-01 | The Chrome re-measure of §12.3's model budgets at TOWN and CITY (nightly) | choices.md:93 | 67, 116 |  |
| K24 | C-0084 | M0-x-01 | §12.3's p50 column follows any R12-4 restatement | choices.md:95 | 67 |  |
| K25 | C-0087 | M0-c-02 | The waterfront policy, quay-access water gates, sea gates, open chains on a barrier, outer moats | choices.md:98 | 114 | the fixed-place law is M3a's |
| K26 | C-0088 | M0-f-02b | The nightly `timing-phase (nightly contents)` job, status `not-built: M1` at M0 | choices.md:99 | 116 |  |
| K27 | C-0090 | M0-d-05b | B-EDIT-lite's 1 cm perturbation and the Re-derive-from-S1 fixture | choices.md:101 | 74 |  |
| K28 | C-0092 | M0-k-05 | V12 §3.5's sign-indefinite and floor forms (rows `notApplicable` until then); `baselines check` C8–C10 | choices.md:103 | 54, 79 |  |
| K29 | C-0098 | M0-k-04, M0-a-14 | The S11 bar re-measured on B-CITY-lite's S11 | choices.md:109 | 118 |  |
| K30 | C-0100 | M0-x-06 | EP-02, EP-03 (S0); EP-20's island, fjord, narrow-valley fixtures; EP-23's S5b / S5c part; the rung and preset sweeps | choices.md:111 | 104 | the other EP rows go to their mechanisms' milestones |
| K31 | C-0107 | M0-k-04 | The frontage-band intersection in the S11 workload, with S10's frontage | choices.md:118 | 118 |  |
| K32 | C-0113 | M0-k-05, M0-k-06 | The one `plat` bin (`plat parity`, `plat baselines check`, the scan) in `@plat/api` | choices.md:124 | 119 |  |
| K33 | C-0116 | M0-k-05, M0-x-03 | Lots per block marked ⟨M-1⟩ for M1; `@plat/docs`' `known-defects.json` | choices.md:127 | 117, 120 |  |
| K34 | C-0118 | M0-x-06 | The cliff × frame "nothing drawn beyond it" clause (S14) | choices.md:129 | 104 |  |
| K35 | C-0121 | M0-s-01, M0-k-07 | The PR tier with the deny-list scan inside it, first timed at M1 | choices.md:132 | 121 |  |
| K36 | C-0127 | M0-d-07 | Unit lint; the port's adapter-boundary scan; the labels / render seeds of the digest closure; M1's packages join the dependency rule | choices.md:138 | 25, 131, 71 |  |
| K37 | C-0132 | M0-d-02 | The schema-level NaN refusal (with `zod`) | choices.md:143 | 25, 27 |  |
| K38 | C-0138 | M0-f-01 | The host record's `browser` field filled | choices.md:149 | — | no clause; follows C-0050 |
| K39 | C-0142 | M0-m-01 | Staged fields: `Terrain.geology` / `.mining`, `Way.slopeP95`, `Block.frontages`, District's ten, Enceinte's 23, `Gate.heights` / `.footprint`, `Seam.boundarySamples`, `SeamEdge.frontageSide`; the entity registry keeps `M0_KINDS`; `Document` env slot | choices.md:153 | 28, 43, 9, 22, 112, 124, 14 | `Way.surface` is M2b's, `laidAt` M3a's |
| K40 | C-0145 | M0-m-01 | `Seam.amendments` (staged) and `SeamAmendment` (undeclared) | choices.md:156 | 22, 80 |  |
| K41 | C-0146 | M0-a-02 | The arena-size figures, PLAUSIBLE until measured at M1 | choices.md:157 | 109 |  |
| K42 | C-0153 | M0-s-02 | The design's table form via `zod` and the tables compiler (V11) | choices.md:164 | 56, 25 |  |
| K43 | C-0156 | M0-s-02 | LadderRouter's routing and clamp; the §12.10 budget register | choices.md:167 | 4 | no clause names the budget register |
| K44 | C-0157 | M0-s-02 | `TableView` override chain (packs, presets, user and document overrides, log events); V11's slice kinds | choices.md:168 | 14, 56 |  |
| K45 | C-0158 | M0-s-02 | Table rows left out: granularity institution row and poor frontage CV; `american` / `ringed` presets; S7 furniture rows; roster shanty rows and relation weights; the budget register | choices.md:169 | 112, 115, 9, 111 |  |
| K46 | C-0160 | M0-a-03 | The freeze, the frozen copy and the pool around `rebuildForFreeze` | choices.md:171 | 23 |  |
| K47 | C-0161 | M0-k-01 | V12 §2.4's collision rehash for the B-CITY seed families | choices.md:172 | 52, 20 |  |
| K48 | C-0162 | M0-s-02 | The `VG` value requirement (V11's village-read registry); V11's base settings row for `crossing.searchBandM` | choices.md:173 | 56 |  |
| K49 | C-0165 | M0-e-01 | Spur, ravine and lake / oasis hollow primitives; fish reach width; the full Blueprint | choices.md:176 | 28, 47, 43 |  |
| K50 | C-0166 | M0-b-01 | The full `GranularityLaw`; a parity preset's step blend at each cut; `american` / `ringed` | choices.md:177 | 31, 41, 115 |  |
| K51 | C-0167 | M0-e-01 | The first reader of `terrain.controls`: S1 (1)'s draws for named-but-unplaced primitives (M1's S1 seat picks them) | choices.md:178 | 28, 43 |  |
| K52 | C-0168 | M0-a-11 | The `RoofSpec` that chooses a roof form | choices.md:179 | — | scope.json discrepancy: §16 M2b |
| K53 | C-0173 | M0-e-02 | Lakes as water bodies; S3's centre-to-bank rung and `no_crossing`; delta distributaries; islands; bank classes and harbour depths | choices.md:184 | 28, 7 |  |
| K54 | C-0174 | M0-f-03a | The flatness check across a band and its coefficient fallback | choices.md:185 | 108, 116 |  |
| K55 | C-0175 | M0-e-02 | S3's centre moved to the bank (F-RIVER's fourth rung) | choices.md:186 | 7, 113 |  |
| K56 | C-0177 | M0-a-05 | roles.json version 2 naming the simple-ring roles (`E_SELF_INTERSECT` read) | choices.md:188 | — | no clause |
| K57 | C-0179 | M0-d-05a | The archive and its tombstone store | choices.md:190 | 132 |  |
| K58 | C-0180 | M0-k-05 | FTG's turning target and the `per100m` unit; `block.areaRel` and `blockc.lotsPer` measured; the B-CITY run feeding `--ours` | choices.md:191 | 117, 79, 52 |  |
| K59 | C-0182 | M0-k-02 | Poisson sampler's no-input row and annulus; B-CITY-lite's skeleton faces; the declared shift and migration | choices.md:193 | 123, 129, 21 |  |
| K60 | C-0185 | M0-a-06 | The pool's copy-on-write overlay and merge, replacing the per-batch arena image before S10 / S11 run at CITY (cost risk, PLAUSIBLE) | choices.md:196 | 23, 91 |  |
| K61 | C-0188 | M0-d-05b | The building row of the matching routine's anchor table | choices.md:199 | 74 |  |

## 3. From `checks/M0-spec-notes.md` as committed

| # | row | items | what M1 receives | source line | M1 clauses | note |
|---|---|---|---|---|---|---|
| S1 | N-10 | M0-k-07, M0-x-03 | A deny-list fix round taken after M0-x-01 that touches a timed loop is flagged for M1's first timing phase (re-timing) | M0-spec-notes.md:21 | 116, 49 | the M0 addendum (M0-x-03) carries the flag list |

## 4. Gaps: deferrals no `scope.json` clause covers

These are hand-overs the M1 scope inventory does not yet carry. Three are already in `scope.json`'s discrepancy list because §16 places the work at another milestone. The rest are small or split with a later milestone.

| # | source | note |
|---|---|---|
| W13 | M0-a-11 | no clause; scope.json lists it as a discrepancy (§16 places roofs at M2b) |
| W17 | M0-a-15 | no clause; scope.json lists it as a discrepancy (§16 places open-to-editable in M2a's exit) |
| W35 | M0-b-02 | no clause names slope classes; split with M0-e-05 |
| W43 | M0-c-01 | no clause names q(x); split with M0-e-05 |
| W64 | M0-e-04 | no clause names the hinterland unit (M0-x-02 splits it M1 / M6-U) |
| W69 | M0-f-01 | split M1 / M4; no clause names calibrate's browser parts |
| W93 | M0-k-06 | no clause; nearest are 61 (stamp-tile asset) and 92 (font faces) |
| K18 | C-0050 | split M1 / M4; no clause |
| K38 | C-0138 | no clause; follows C-0050 |
| K52 | C-0168 | scope.json discrepancy: §16 M2b |
| K56 | C-0177 | no clause |

## 5. M1 clauses fed from M0 that no deferral above names

These are `scope.json` clauses whose kind is `staged-from-M0` but which no ledger row above points at. No item's `defers` names it as M1 work; `scope.json` lists M0-b-05a and M0-c-07a as its M0 items.

| clause | kind | status | clause text (abridged) |
|---|---|---|---|
| 122 | staged-from-M0 | needs-M-1 | The nightly parity report inside a timed `tier:nightly` |

## 6. Rows that mention M1 but hand nothing over

| row | source line | why not listed |
|---|---|---|
| C-0001 | choices.md:12 | "Apple M1" is the reference machine's chip, not the milestone (superseded by C-0025) |
| C-0019 | choices.md:30 | M1 appears only in the quoted section ("applied before M1 if a bar fails"): an M0 obligation |
| C-0020 | choices.md:31 | A constraint on M1, not work: stage and concern ids freeze at M0's exit, before M1's first golden (clause 21) |
| C-0025 | choices.md:36 | "Apple M1" chip again |
| C-0078 | choices.md:89 | Names the document (M1) as a later reader of `encodeArena`; the work is C-0037's |
| C-0080 | choices.md:91 | "before M1": the conditional timing re-run is M0's |
| C-0147 | choices.md:158 | Staging the entity-key cache to M1 was considered and rejected |

## Refresh at M0's close

This is a snapshot. Choices rows after C-0191 (the working copy of `choices.md` was already ahead of the committed copy when this was read) and spec notes after N-36, and any fix round's new `defers`, are not in it. To refresh it: re-read the three sources as committed at M0's close, apply the same whole-word `M1` filter and the M-1 exclusion, and re-run the cross-reference against `scope.json` as it then stands.
