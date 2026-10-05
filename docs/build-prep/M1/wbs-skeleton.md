# M1 work-breakdown skeleton (family level)

*Lane `filler/m1-wbs-skeleton`, 2026-10-05. Implementer-side, clean room (the CLEAN_ROOM text of `workflows/23-build-m0-waves.js`). A **skeleton**, not a build spec: it groups `scope.json`'s 132 M1 clauses into work families, one per package or subsystem, and names what each family builds on and waits for. It binds **no owner and no file** — that waits for M0-x-01's record (the `MilestoneRecord` / exitCriteria shape) and M0-a-16's façade. It adds no design (J156): every family is a §14 package row or a design subsystem, every clause is `scope.json`'s by number, and where this file and the design or the M0 build records differ, those govern.*

## Sources

| source | state read | what was taken |
|---|---|---|
| `docs/build-prep/M1/scope.json` (twin `scope.md`) | as written 2026-10-05, 132 clauses | the clause numbers `n`, each clause's `status`, `m0Items` and `m1Needs` |
| `docs/build-prep/M1/volume-shares.md` | 2026-10-05 | the volume ids (AP1, W2, W7, C0, C1, V01-M1-n, V11-M1-n) beside the clauses that carry them |
| `docs/build-prep/M1/m0-deferrals.md` | 2026-10-05 snapshot | the W/K/S rows' cross-references to clauses; §4's *Gaps* (deferrals with no clause) |
| `docs/ARCHITECTURE.md` §14 (package rows ≈ lines 20735–20840) and §16's M1 row (≈ line 21512) | working copy | the package a family is named after and what §14 says that package holds |
| `plat/docs/build/M0.md` layout block (≈ lines 748–770) | working copy (read, not `git show`) | the M0 packages that exist: `@plat/kernel`, `model`, `tables`, `site`, `layout`, `testkit`, `bench` |

Reading rules:

- **Family ≠ package creation.** A family named after a package M0 did not create (`@plat/content`, `plots`, `labels`, `render`, `export`, `api`, `app`, `port`, `docs`) does not say who creates it or when; M0-s-01 defers those packages to "their milestones (M1 …) — no empty skeletons" (ledger W1). Which seat creates each is the build spec's call.
- **One primary family per clause.** A clause that spans families is listed once as primary and cross-referenced (→) where its other half lands; the counts below sum to 132 over the primary listings.
- **Status marks** are `scope.json`'s: **†** = needs-M-1 (the clause's verdict waits on an M-1 crossing), **○** = M0-dependent (extends or re-runs an M0 item without a landed record on 2026-10-05), unmarked = specifiable-now. The landed snapshot is 2026-10-05's working copy, run `wf_8f7c7489-304` in flight; it will have moved by the time this is used.
- **M0 interfaces** are the `m0Items` the clauses name plus the `m0-deferrals.md` rows (W / K / S) cross-referenced to those clauses, each such addition cited by row id, deduplicated per family; an M0 item that neither source ties to the family's clauses appears only as a pointer in the family's Cross-refs line. "(landed)" is the 2026-10-05 snapshot. **M-1 needs** are the `m1Needs` strings, deduplicated.
- **Order** is a rough dependency order in five waves (§Order), not a schedule.

## Family index

| id | family | package or subsystem (§14) | primary clauses | † | ○ |
|---|---|---|---|---|---|
| F01 | Kernel additions | `@plat/kernel` | 38, 109, 123, 125 | 0 | 1 |
| F02 | Model schema and registry | `@plat/model` | 22, 25, 27, 42, 50, 124, 127 | 0 | 2 |
| F03 | Identity, matching, archive | `@plat/model` identity / match | 57, 74, 132 | 0 | 1 |
| F04 | The `.plat` document | `@plat/model` + `@plat/api` (§2.9, §3.9) | 14, 15, 16, 17, 75, 76, 77 | 0 | 6 |
| F05 | Tables, presets and rung profiles | `@plat/tables` | 39, 40, 41, 56, 115 | 0 | 1 |
| F06 | M1 content authored fresh | V11 C1 rows, naming grammar, era table, palette rows | 36 | 1 | 0 |
| F07 | Site: S0 draws and S1 terrain | `@plat/site` | 28, 43, 47, 101 | 0 | 1 |
| F08 | Roster, demand and allocation | `@plat/content` | 10, 65, 111 | 0 | 1 |
| F09 | Siting: S3 | `@plat/layout` siting | 7, 89, 106 | 0 | 2 |
| F10 | Network: S4 backbone, S5 growth, S9 corridors | `@plat/layout` backbone / growth / corridors | 8, 29, 59, 113 | 0 | 4 |
| F11 | Fortification: S7 | `@plat/layout` enceinte | 9, 33, 114 | 0 | 3 |
| F12 | Districts, fields, seams: S6, S7b hook, S8 reads | `@plat/layout` districts / fields | 31, 80, 107 | 0 | 2 |
| F13 | The one pipeline at three rungs | `@plat/layout` pipeline / `StrategyRegistry` | 4, 6 | 0 | 2 |
| F14 | Plots and site plans: S10, S10b, S11 | `@plat/plots` | 5, 30, 32, 58, 64, 112, 118 | 0 | 6 |
| F15 | Names and labels: S13a, S13b | `@plat/labels` | 11, 51, 68, 84, 88, 92 | 0 | 1 |
| F16 | Render: S14, `ink`, the tile pyramid | `@plat/render` | 12, 34, 44, 48, 60, 61, 70, 85, 86, 87, 94, 102, 126 | 0 | 0 |
| F17 | Export and permalinks | `@plat/export` | 13, 18, 90, 93, 110 | 0 | 0 |
| F18 | API: pool, worker host, report, CLI | `@plat/api` | 19, 23, 35, 78, 119 | 0 | 4 |
| F19 | App shell AP1 | `@plat/app` | 37, 81 | 0 | 0 |
| F20 | Dossier port in the tests | `@plat/port` | 45, 46, 98, 100, 131 | 0 | 1 |
| F21 | Docs | `@plat/docs` | 120 | 1 | 0 |
| F22 | Goldens and milestone records | `plat/goldens/`, golden tooling (§13.3) | 1, 21 | 0 | 2 |
| F23 | Determinism and placement digests | `@plat/testkit` crosshost / determinism | 24, 71 | 0 | 2 |
| F24 | The calibration rig (V12 W2 / W7) | `@plat/testkit` metrics / parity / panel / register | 3, 52, 53, 54, 55, 62, 69, 72, 73, 79, 95, 103, 117 | 8 | 0 |
| F25 | Tiers and the B-CITY harness | `@plat/bench` tiers / tier-jobs, B-CITY, B-CITY-lite | 20, 63, 66, 121, 122, 129, 130 | 4 | 2 |
| F26 | Timing and budgets | `@plat/bench` timing / timing-phase / worklimits | 49, 67, 82, 83, 91, 108, 116 | 0 | 6 |
| F27 | Ladders, fuzz, invariants, edges | `@plat/testkit` ladders / fuzz / invariants / edge | 26, 104, 128 | 0 | 3 |
| F28 | Bars with no single mechanism family | §13.8's schedule, §13.7's thresholds | 2, 96, 97, 99, 105 | 0 | 0 |
| | | **total** | **132** | **14** | **53** |

(The † and ○ columns are counts of primary clauses; 65 are specifiable-now. They match `scope.json`'s `counts`: 14 / 53 / 65.)

## The families

Each family: the clauses it owns (number, short name, mark), what it builds on from M0 (`m0Items`, deduplicated), its M-1 needs, its cross-references, and the discrepancies or gaps it carries.

### F01 Kernel additions — `@plat/kernel`

- **Clauses:** 38 transient arena open / read-back / release ○; 109 entity registry ≤ 64 B, arena and pool-copy sizes measured; 123 the Poisson sampler deferred by M0-a-10; 125 `RH32` over H32 / H128.
- **Builds on (M0):** M0-a-16 (façade stubs `transientArena` / `readBack` / `release`, `notBuilt('M6-P')`, C-0041; not landed); M0-a-07 (landed; defers the transient arena's writers to M6-P); M0-a-09 (tileRings; not landed); M0-a-02, M0-a-06 (landed; arena, overlay); M0-a-10 (landed; defers Poisson, C-0182); M0-d-02 (H128 / H32, landed).
- **M-1 needs:** none.
- **Cross-refs:** 125's consumer is F16 (§8.1's render hash); 123's consumer is F16 (stamp tiles, §8.10; ledger W11); 109's pool half is F18.
- **Carries:** the **transient-arena discrepancy** (clause 38; §16 names it M1, `M0.md` §4b / M0-a-07 / M0-a-16 stage it to M6-P; building it at M1 re-tags M0-a-16's stubs and needs a choices row). Ledger gap K56 (C-0177, roles.json version 2 naming the simple-ring roles) has no clause; it is kernel-shaped and is parked here for the build spec to place.

### F02 Model schema and registry — `@plat/model`

- **Clauses:** 22 `SeamContract` on every district (schema half) ○; 25 O6 metric units, unit lint, core statistics record; 27 O11 schema (registry round trip, containment) + PNG / SVG ○; 42 `factTier` over the registry's dossier paths, the derivation table as an index, its totality bar; 50 Volume 1's M1 schema (`Block.content`, `Block.overrides`, `HoodPlace` row, `DistrictContext`, `Recipe.product`, concern ids, `S8.seed`) [V01-M1-1]; 124 the entity registry with §13.2's path-completeness test and the §2.5–§2.7 records M0 does not read; 127 the relation store's schema, facilities / factions / religions / offices, D-32 stubs (empty until M4b).
- **Builds on (M0):** M0-m-01 (landed; defers the entity registry, its path-completeness test, the unread records, zod, `M0_KINDS`, the staged fields of C-0142 / C-0145); M0-d-01 (concern and stage-id registries, landed); M0-b-03 (seam portals; not landed); M0-d-07 (lint host, landed; defers the unit lint); M0-k-05 (metrics, landed); M0-a-15 (arena block encode / decode; not landed); M0-s-01 / M0-s-02 (zod with the document schema, C-0012; ledger W2, W3 → 25, 27).
- **M-1 needs:** none.
- **Cross-refs:** 22's writer half is F12 (clause 80); 27's PNG / SVG half is F17; 25's statistics record is F24; 42's bars (T20-10, T73-10) are F20's clause 100; zod and the unit lint (ledger W2, W3, W6, W28, K2, K14, K37) land with F04's document schema.
- **Carries:** C-0020's constraint — stage and concern ids freeze at M0's exit, before M1's first golden (F22).

### F03 Identity, matching, archive — `@plat/model` identity / match

- **Clauses:** 57 per-name naming records (M1 writes them; renames at M3a); 74 B-EDIT-lite identity fixtures ≥ 99.9 % (1 cm perturbations), the matching routine on real anchors; 132 the §2.8 archive and tombstone store ○.
- **Builds on (M0):** M0-d-05a (identity / lineage, landed; defers the archive and tombstone store); M0-d-05b (succession, carry-over, the matching routine, landed; defers the building row of the anchor table, K61, and the 1 cm measurement, W25 / K27).
- **M-1 needs:** none.
- **Cross-refs:** 132's archive chunk is carried by F04's document (clause 14); 57's names come from F15 (S13a); 74 runs on B-CITY-lite (F25) and its fault injection is F27's clause 128.

### F04 The `.plat` document — `@plat/model` + `@plat/api` (§2.9, §3.9)

- **Clauses:** 14 the writer and reader (manifest, content-addressed chunks, §3.9's geometry layout, gzip, empty log) ○; 15 the root check with corrupt-cache regeneration ○; 16 §2.9 step 2's frozen view of another output version ○; 17 boundary: the records digest joins the snapshot at M2a, not M1; 75 ≤ 320 B per building at CITY ○; 76 save → load → save byte-identical ○; 77 an earlier-version document opens as a frozen view with no mismatch message ○.
- **Builds on (M0):** M0-a-15 (arena block encode / decode; defers the document, manifest, store, gzip, root check and replay, C-0037; not landed); M0-d-04 (Merkle digest and the goldens' canonical text form serialiser, landed; defers the stored root and the load's recomputation path, W21 / W22); M0-s-02 (`TableView` override chain with document overrides, K44).
- **M-1 needs:** none.
- **Cross-refs:** the zod document schema and the unit lint (F02) land here; 76's canonical form is F22's golden text form; 75 and 76 run on B-CITY-lite's towns (F25).
- **Carries:** ledger gap W17 (M0-a-15 defers the rebuild-partition-on-first-query fallback "→ M1's open-to-editable bar"; §16 places open-to-editable in M2a's exit) — a discrepancy for the build spec, parked here.

### F05 Tables, presets and rung profiles — `@plat/tables`

- **Clauses:** 39 `RungProfile.layers` with `Features.sewers` resolved at S0; 40 the emulation marker on every default cell; 41 the parity presets `MFCG` / `FTG`; 56 V11 C0 / C1 exits: the M1 tables compile byte-identical on two hosts, register green over the C1 rows, T16-4 with `detourFactor` [C0, V11-M1-2, V11-M1-3, V11-M1-5]; 115 `TradeFlow` and the presets `ringed` / `american` (tables half) ○.
- **Builds on (M0):** M0-s-02 (loader, cell check, `ladder.json`, presets column C-0153, `TableView` chain, landed; defers the rows of C-0158 — `american` / `ringed`, S7 furniture, roster shanty rows, the budget register); M0-c-03 (`ways.json` crossing matrix; not landed); M0-b-01 (landed; a parity preset's step blend at each cut, K50).
- **M-1 needs:** none.
- **Cross-refs:** the rows themselves are F06's; `hood.constants`' row (clause 51) is F15's with V01-M1-3 / V01-M1-4 / V01-M1-6 landing here; `toolkit.json` and `messages/en.json` (V09-M1-2) ship with F19; item 111's dry-country cells and `garden` row (V11-M1-1) sit beside F07's clause 47, item 116's margin cell beside F16's clause 48, item 119's `perf.qualitySpend` beside F26's clause 49; the register entries every calibratable column takes (V11-M1-2, V01-M1-5) are checked by F24's clause 3.
- **Carries:** C-0156's budget register (K43) — no clause names it.

### F06 M1 content authored fresh — V11 C1 rows, naming grammar and word lists, era table, `ink` palette rows

- **Clauses:** 36 roster rows for the M1 classes, households, the naming grammar and word lists, the era table, the `ink` palette (≈ 3–4 pw) [C1, V11-M1-4, V11-M1-6, V11-M1-7, V11-M1-8] †.
- **Builds on (M0):** M0-s-02 (loader, landed); M0-k-06 (content scanner; not landed).
- **M-1 needs:** `denylist.json` — the verdict (0 deny-list hits, §17.1 (5)) reads it; *what to author is fixed by the design now* and does not wait.
- **Cross-refs:** the loader and compile are F05; the grammar's reader is F15 (S13a); the palette's reader and its measurement are F16 (clauses 44, 94); the deny-list scan inside the PR tier is F25's clause 121.
- **Carries:** V11 R4 (C1 is scoped to the M1 classes so M1 never waits on the full ladder; V11-M1-9) — a dependency rule, not work.

### F07 Site: S0 draws and S1 terrain — `@plat/site`

- **Clauses:** 28 O1 terrain and hydrology first (S1 (2) coast, (4) islands, (6) harbour, (7) bank classes, `Terrain.mining`) ○; 43 the geology flag's S0 draw and S1 resolution, the relief toggle's S0 pick; 47 the oasis and spring features at S0–S1, V11 C9's item-111 dry-country cells beside them; 101 T65-7 but its sky-island clause (nightly relief-class sweeps).
- **Builds on (M0):** M0-e-01 (landed; defers S1 (2) (4) (6) (7), the oasis, the geology flag, `Terrain.mining` (C-0048), the relief toggle's S0 pick, the spur / ravine / hollow primitives (K49), `terrain.controls`' first reader (K51)); M0-e-02 (landed; defers the delta's distributaries, river islands, lakes as water bodies, the coast's coupling, bank classes and harbour depths, K53); M0-e-03 (L0 batch, water faces, crossing sites; not landed; defers coast / lakes / islets / ponds / oases and the bank-class and `shoreSetback` readers); M0-d-01 (streams, landed).
- **M-1 needs:** none.
- **Cross-refs:** S0's blueprint expansion (ledger W78) and `Features.sewers` at S0 sit with F13 / F05; the harbour pick's measurement (clause 89) is F09's; the real terrain the fusion gate re-runs on (clause 66) is F25's; the EP-20 island / fjord / narrow-valley fixtures (clause 104) are F27's.
- **Carries:** ledger gaps W35 (M0-b-02's slope term's real field, split with M0-e-05 and "M1's slope classes") and W43 (M0-c-01's water pull's real q(x), split with M0-e-05) — no clause names them; they are field-shaped and may belong with F12 as much as here.

### F08 Roster, demand and allocation — `@plat/content`

- **Clauses:** 10 the eager allocation (S7b) with `claimSubFace`'s score form ○; 65 B-CITY-lite population ± 5 %; 111 S2 roster and need propagation (M0 used synthetic demand, C-0035).
- **Builds on (M0):** M0-e-04 (S6 districts, quarter merge tree; defers S2's real demand and S7b's allocation, C-0035; not landed); M0-a-07 (`claimSubFace` ring form, landed; score form `notBuilt('M1')`); M0-b-03 (defers the substitution rung's pending claims — green, landmark, joined plot — to M1 with S7b, C-0036; ledger W36 → 10); M0-c-05 (S5d reads S2's real demand, C-0016; ledger W52 → 111); M0-e-05 (the roster's household shares feeding `FieldBands`, C-0049; ledger W66 → 111).
- **M-1 needs:** none.
- **Cross-refs:** §14 puts "S7b claims" in `@plat/layout` and "S7b / S10a allocation" in `@plat/content`: clause 10's claim-side hook is F12's, and clause 10 is ordered after S7 (F11) and that hook, not with S2 (§Order); the roster rows are F06's; the households that F15's naming and F03's records read come from here; the relation-store schema the roster's households derive into is F02's clause 127.
- **Carries:** ledger gap W64 (M0-e-04's hinterland unit → M1; M0-x-02 splits it M1 / M6-U; §14 places the hinterland unit in `@plat/layout`) — no clause; parked between here and F12 for the build spec.

### F09 Siting: S3 — `@plat/layout` siting

- **Clauses:** 7 S3 reservations and gate sites (S3 (1), (2), (8), (10), (11), (12)'s market score, (13)'s typed destinations; polycentric forms; F-SITE's nuclei rungs) ○; 89 the harbour pick's measurement on B-CITY walled coastal seeds (p99 ≤ 1.5, else the detour guard) ○; 106 the stored `market.siting` cell `portRef` set by a scripted pass and checked against S0–S2.
- **Builds on (M0):** M0-c-01 (S3 slice as data; defers (1) centre scoring, polycentric forms, the separation floor (C-0032), (2) precinct / harbour basin / canals, (8) castle, (10) moats, (11) harbour route, (12)'s market, the waterfront and closed-arc reductions of (4); not landed); M0-c-02 (trace and the slice's commits; not landed); M0-e-03 (coast, water faces; not landed); M0-e-02 (landed; S3's centre-to-bank rung, `no_crossing`, the centre moved to the bank — F-RIVER's fourth rung, K53 / K55).
- **M-1 needs:** none.
- **Cross-refs:** the castle and moats S3 reserves are built by F11 (clause 9); the typed destinations feed F10's traces; F-SITE's later rungs are counted by F27's ladder coverage.

### F10 Network: S4 backbone, S5 growth, S9 corridors — `@plat/layout` backbone / growth / corridors

- **Clauses:** 8 S5 with each trace before its stage's growth ○; 29 O4 two-tier street network ○; 59 crossing sites as a `Bridge` in state `site` (generation side) ○; 113 the deck strip's geometry (S9's band on a span), the extra-bridge rung and the rest of F-ROUTE; later rungs of F-RIVER and F-WALL and every §5.2 ladder of an M1 stage ○.
- **Builds on (M0):** M0-c-02 (traces; not landed); M0-c-03 (backbone; defers the deck strip, the extra-bridge rung, the rest of F-ROUTE (C-0076) and `TradeFlow`; not landed); M0-c-04 (S5a / S5b; defers the waterfront and closed-arc reductions, moats, water gates, the castle; not landed); M0-c-05 (S5c / S5d; defers the `ringed` / `american` presets, water crossings of proposals, S2's real demand; not landed); M0-e-03 (crossing sites as pinned decks, C-0076; not landed); M0-b-03 (seam portals; not landed); M0-x-05 (coverage table; defers the later rungs of F-ROUTE, F-RIVER, F-WALL to M1 / M3a; not landed).
- **M-1 needs:** none.
- **Cross-refs:** S9's corridor band also underlies F14's S10 step (0) (`corridorUnion`, M0-a-09); `TradeFlow` and the two presets' tables half are F05's clause 115; the `Bridge` record itself is F02's; the two-tier network's bars (T16-4 detour factor) are F05 / F24's.

### F11 Fortification: S7 — `@plat/layout` enceinte

- **Clauses:** 9 S7 walls, gates, towers, castle (wall strips, band, gatehouses, gate plazas) ○; 33 O8 basic (fortification network) ○; 114 the waterfront policy's quay-access water gates and sea gates (M1 part) ○.
- **Builds on (M0):** M0-c-02 (strip stand-in, C-0033; defers S7 whole — towers, gatehouses, gate plazas, the band's L3 parts, the intervallum, condition at generation; barrier closure's real arcs, the waterfront policy's water gates and sea gates, open chains on a barrier, outer moats (C-0087); the castle weld; not landed); M0-m-01 (minimal `Enceinte` / `Gate`, landed; Enceinte's 23 staged fields, `Gate.heights` / `.footprint`, K39); M0-a-08 / M0-a-09 (buffers, bands; not landed).
- **M-1 needs:** none.
- **Cross-refs:** the walled share and extramural ribbon share (clause 72) and T46-1 / T47-1 on walled seeds (clause 97) judge this family's output through F24 / F28; the fixed-place law at a water gate is M3a's (ledger W45), not M1's; S7 furniture rows (C-0158) are F05's.

### F12 Districts, fields, seams: S6, S7b hook, S8 reads — `@plat/layout` districts / fields

- **Clauses:** 31 O18 with a flat field ○; 80 every district carries a complete `SeamContract`; II.5's stage-2 readiness ○; 107 the district base weights fitted at M1 on B-CITY so every rung's districts meet their scaled targets.
- **Builds on (M0):** M0-e-05 (fields pass 1, `FieldBands`; defers pass 2 (S10a), W65; not landed); M0-b-01 (granularity bands, landed; defers the full `GranularityLaw` to `@plat/plots`, C-0006); M0-b-03 (seam portals; defers the full `SeamContract` and `SeamAmendment` (C-0046), the pending claims (C-0036), the band table's slope class; not landed); M0-m-01 (minimal Seam, `Seam.amendments` staged, ledger K40 → 22, 80; landed).
- **M-1 needs:** none.
- **Cross-refs:** M0-e-04 (S6 districts, the quarter merge tree; not landed) is the S6 item this family extends, but no clause here names it and its ledger rows map elsewhere — W62 → F08 (111, 10), W63 → F14 (112); the `SeamContract` schema is F02's clause 22; the pending claims S7b writes are F08's clause 10; S8's read of the granularity law through the registry is F14's; the quarter merge tree's names are F15's clause 11; the band table's slope class (ledger W38, W54, W89, W90) is the fusion gate's statistics fallback, F25's clause 66.
- **Carries:** the **GranularityLaw discrepancy** (clause 31's note: M0-b-01 defers the full law to M1's `@plat/plots`, §16 keeps M1 at "O18 with a flat field" and lists the full law at M2b) — the split between this family and F14 follows whichever the build spec takes; and the **New random discrepancy** (clause 80's II.5 readiness uses New random, which §16 builds at M2a).

### F13 The one pipeline at three rungs — `@plat/layout` pipeline / `StrategyRegistry`

- **Clauses:** 4 S0–S11 at TOWN, CITY and METROPOLIS on the one pipeline (the universal vehicle; later stage clauses do not repeat it) ○; 6 METROPOLIS in the goldens, B-CITY, the determinism tests and the diagnostic panel (core statistics reported from M1, gating from M2b) ○.
- **Builds on (M0):** M0-x-02 (`StrategyRegistry`, runner, generation report; defers S0's blueprint expansion (a fixture Blueprint stands in), every stage M0 does not build, the derivation pool / hinterland unit / tail / worker host (M1 / M6-U); not landed); M0-x-04 (base registration table; not landed); M0-a-16 (Kernel façade; not landed); M0-s-02 (ladder rows, `LadderRouter`'s routing and clamp, landed); M0-d-06 (cross-host harness; not landed).
- **M-1 needs:** none.
- **Cross-refs:** every stage family (F07–F12, F14–F16) registers into this pipeline; the pool is F18's; the goldens and the determinism tests 6 names are F22 / F23's; the panel is F24's.
- **Carries:** the **S12a–c discrepancy** (clause 112's note: `M0.md` §4b stages S12a–c to M1; §16 places S12's hinterland, greenery rules and S12c at M2b) — recorded here because the pipeline's registration order is where it bites first.

### F14 Plots and site plans: S10, S10b, S11 — `@plat/plots`

- **Clauses:** 5 site plans for row, detached and hovel types, and heights (compounds at M2b) ○; 30 O5 frontage-first plots ○; 32 O17 basic (plot model, site plans, heights) ○; 58 `carryWings` and the wing check decided by pairing, in generation; 64 B-CITY-lite plots with access 100 % ○; 112 S9, S10 (step (0) and plots), S10b, S11 and S14 on M0's hooks (`corridorUnion`; `Block` / `Frontage` written by S8) ○; 118 the S11 geometry bar's frontage-band intersection re-measured on B-CITY-lite's S11 ○.
- **Builds on (M0):** M0-a-08 (`offsetFace`, buffers; not landed); M0-a-10 (obb, lir, landed); M0-a-09 (`corridorUnion`, tileRings; defers S10 step (0)'s band parts; not landed); M0-a-11 (skeleton, landed; defers the regions reader — S10's per-frontage regions, ledger W12 → 112 — and the roof readers); M0-b-03 (`Block` / `Frontage` records written by S8; not landed); M0-k-04 (S11 geometry-share bar, B-FUZZ runner, C-0107; not landed); M0-a-14 (invariant suite; the S11 bar re-measured, ledger K29 → 118; not landed); M0-e-04 (the margin band's L3 parts, S10 step (0), ledger W63 → 112; not landed).
- **M-1 needs:** none.
- **Cross-refs:** 112's S9 part is F10's and its S14 part is F16's; the full `GranularityLaw` lives here if the build spec takes M0-b-01's staging (F12's discrepancy); the M1 template families' footprint and plot budgets (V11-M1-6) and the roster-driven S10b placement are read from F06 / F08; `Building`, `Passage` and the other §2.5–§2.7 records come from F02's clause 124.
- **Carries:** ledger gap W13 / K52 (M0-a-11 defers the roof readers / `RoofSpec` to M1; §16 places roofs at M2b) — the discrepancy is `scope.json`'s; no clause, parked here.

### F15 Names and labels: S13a, S13b — `@plat/labels`

- **Clauses:** 11 S13a names with the quarter merge tree (quarter labels at the city band, district names at the district band) ○; 51 the way-naming context's features in S13a with the M1 grammar; `hood.constants`' one settings row (four naming columns read) [V01-M1-2, V01-M1-3, V01-M1-5]; 68 the label-composition measurement; 84 the furniture and snap query round trip (p95 ≤ 16 ms during a settle); 88 the pin-pass B-ZOOM fixture; 92 the font-feature test (PR tier, each bundled label face).
- **Builds on (M0):** M0-e-04 (quarter merge tree; not landed).
- **M-1 needs:** none.
- **Cross-refs:** the naming records S13a's names go into are F03's clause 57, on M0-d-05a (identity, landed; ledger W24 / K57 map it to 57, 74, 132 — F03's, not this family's); S13b as a resumable placement job and the tile worker's queue are F16's clause 60 (§14: the tile worker runs S13b by calling `@plat/labels`; labels never imports render); the grammar and word lists are F06's; `hood.constants`' row ships through F05; label floors and counts at MFCG's count (clause 69) are judged by F24; the fonts' name tables and `plat/assets` (ledger gap W93, M0-k-06) have no clause — nearest are 92 here and F16's 61.

### F16 Render: S14, `ink`, the tile pyramid — `@plat/render`

- **Clauses:** 12 the `ink` preset at the city and district bands on the Canvas2D tile pyramid; 34 O12 `ink`; 44 the `ink` palette on the corpus targets with its measurement code; 48 §8.8's per-map zoom-out limit with §9.5's framing, the exports framed within it, `view.limitStop`, AP11's zoom-out stop [V09-M1-1, W7 (view.limitStop), V11-M1-1 (margin cell)]; 60 resumable raster jobs, S13b as a resumable placement job, the tile worker's four-class queue; 61 the shipped stamp-tile asset with its seam band and `plat/tools/stamptiles/`; 70 B-ZOOM's role continuity across the city → district switch; 85 the sliced-raster census rows; 86 the pan-and-zoom run during an A2 300-dpi CITY export, the sliced-placement census row, placement stepped in class 4; 87 the stamp-tile asset load (≤ 5 ms) and the seam check; 94 the `ink` palette inside its corpus targets on the measurement render; 102 T116-1, T116-2, T116-4 (zoom-out stop bars); 126 B-ZOOM's no-pop check at the band entry stops 0, 16, 20 and 24.
- **Builds on (M0):** none named by the clauses (all specifiable-now); the subsystem reads F01's `RH32` (clause 125) and Poisson sampler (clause 123, the stamp tiles, ledger W11). No ledger row ties another M0 item to this family's clauses.
- **M-1 needs:** none for the family's own clauses; the figure-ground and recoverability verdicts over its renders are F24's clause 69 (needs MFCG's M-1 recoverability baseline and quarter-label count rows).
- **Cross-refs:** M0-d-07's import-closure walk seeding the labels / render digest scope is F23's (ledger W30 → 71; K36 → 25, 131, 71), a pointer only; 112's S14 part (the display-list builder on M0's hooks) lands here; the palette rows are F06's; the exports 48 frames are F17's; the A2 export of 86 is F17's; the shell that shows the pyramid is F19's; the on-screen zoom-out stop is V09 AP11's base part, listed here with 48 because §16's carried row places it at M1.
- **Carries:** nothing unresolved; the `ink` close-up and building bands are M2b's by §16 (clause 12).

### F17 Export and permalinks — `@plat/export`

- **Clauses:** 13 SVG and PNG export; 18 permalinks marked *preview* with the preview notice and `o=` until M4 fixes output version 1; 90 the SVG export's transient-list peak and the export-time peak at TOWN and CITY; 93 the SVG and PNG export budgets on B-CITY-lite's TOWN and CITY seeds; 110 text in SVG as outlines by default, measured against §12.7.
- **Builds on (M0):** none named (all specifiable-now); O11's PNG / SVG half (F02's clause 27) is judged here.
- **M-1 needs:** none.
- **Cross-refs:** the exports are framed within F16's zoom-out limit (clause 48) and the A2 run (clause 86); the open / download of generated towns is F19's AP1; the permalink's `o=` reads F22's output-version stamp (clause 21).

### F18 API: pool, worker host, report, CLI — `@plat/api`

- **Clauses:** 19 the report panel with delivery tiers (the generation report's side) ○; 23 the derivation pool (overlays and merge; pool sizes 1–3 in the contract tests) ○; 35 O16-core report and honest controls ○; 78 the control-continuity sweep; 119 the `plat` bin — one CLI for `plat parity`, `plat baselines check` and the scan (`@plat/api` headless CLI) ○.
- **Builds on (M0):** M0-x-02 (generation report; the pool / tail / worker host split M1 / M6-U; not landed); M0-a-06 (overlay, pool-size-0 path, landed; defers the pool overlays and merge, steps 1–5, and the copy-on-write overlay before S10 / S11 at CITY, K60); M0-a-03 (landed; the pool freeze's rebuild and the frozen copy, W7 / K46); M0-a-16 (defers the pool to M1; not landed); M0-a-14 (the pool-scope and frozen-base rows, W15; not landed); M0-k-05 (parity CLI, landed; C-0113's root scripts over the bench dispatcher); M0-k-06 (scanner; not landed); M0-d-06 (pool sizes 0–3 → M1; ledger W26 → 91, 67, 23; not landed).
- **M-1 needs:** none.
- **Cross-refs:** the other M0 items that defer pool sizes to M1 point at the families that sweep them, not here — M0-d-08 → F23 (ledger W31 → 24, 91), M0-t-00 / M0-t-01 → F26 (W81, W83 → 67, 91); the pool's memory and model measurements at pool sizes 0 and 3 are F26's clauses 67 and 91; the B-FUZZ re-run with the pool overlays class (K12, C-0038) is F27's; the report panel's UI side is F19's; the honest-controls half of 35 and the sweep 78 judge every control family (F19, F05's presets).
- **Carries:** ledger gaps W69 / K18 / K38 (M0-f-01's calibrate browser parts — Canvas2D raster, GPU probe, hardware tiers — split M1 / M4; the host record's `browser` field) — no clause; parked here with F26 as the other candidate.

### F19 App shell AP1 — `@plat/app`

- **Clauses:** 37 the app shell (V09 AP1): one click, basic panel, report, gazetteer and "features in view", the keymap, the accessibility contract, context-help skeleton, chrome tokens and themes, the empty-state card, the message catalogue's first rows and coverage test, open and download of generated towns; exits T-V9-1 (shell), T-V9-15, T-V9-21 (shell) [AP1, V09-M1-2]; 81 the scripted tasks of §13.4 that M1 supports, keyboard-only included (O16 (c): link, SVG, coast side, variants).
- **Builds on (M0):** none named (specifiable-now); the shell reads F18's facade and report, F16's pyramid, F17's exports and F04's open / download.
- **M-1 needs:** none.
- **Cross-refs:** `toolkit.json` and `messages/en.json` rows (V09-M1-2) are F05's tables; the on-screen zoom-out stop (AP11's M1 part) is listed with F16's clause 48; the report panel's data is F18's clause 19; the §13.7 O16 (c) threshold is F28's clause 105.

### F20 Dossier port in the tests — `@plat/port`

- **Clauses:** 45 `@plat/port` in the tests only: `DossierDigest`, one adapter for `fp-integration-2026-09-23`, the creation half, the binding table's shape and key law, `tables/dossier/*` rows, the typed circumstance slices, `Institution.powers` and `Assignment.state` as schema, the one-way seed, the inert-export bar, the ignore-list, the refusal below 1 500 and above the cap (≈ 2.5–3 pw); 46 the frozen dossier fixtures in `plat/tests/fixtures/dossier/` with their manifest, and B-DOSSIER-lite; 98 T20-7, T20-11 – T20-13, T73-1 – T73-9, T77-1's slice clause, T81-2's creation clause, T85-1, T85-2; 100 T20-10, T73-10 (the totality files and the culture towns); 131 the adapter-boundary key scan over `@plat/port` ○.
- **Builds on (M0):** M0-d-02 (H32, landed); M0-m-01 (landed); M0-d-07 (import-closure walk, landed; defers the scan); M0-k-06 (content scanner; defers the key scan; not landed).
- **M-1 needs:** none. (46's fixtures are an **external input**, cut from SettlementForge line `fp/integration-2026-09-23` at commit `5d699cc68` — not an M-1 deliverable and not in the clean room's corpus.)
- **Cross-refs:** `factTier` and the derivation index (F02's clause 42) are what 100's totality bar judges; `tables/dossier/*` rows load through F05; this family is independent of the stage families and can run beside them once F02's schema exists.
- **Carries:** V08 was not read (volume-shares.md: no milestone this seat prepares builds V08); any V08-tagged M1 item is outside this skeleton.

### F21 Docs — `@plat/docs`

- **Clauses:** 120 `known-defects.json` for the descriptive ⟨M-1⟩ cells †.
- **Builds on (M0):** M0-x-03 (the addendum lists each descriptive row's entry, C-0116; not landed).
- **M-1 needs:** M-1's statement of which ⟨M-1⟩ cells it could not measure.
- **Cross-refs:** the release-notes generator §14 gives this package reads F22's shift records and milestone records; the user-guide pages are later milestones'.

### F22 Goldens and milestone records — `plat/goldens/`, golden tooling (§13.3)

- **Clauses:** 1 M1 ends on executed evidence and writes its `MilestoneRecord` with declared shifts ○; 21 the output-version stamp; shift, cascade and milestone records; the stage-isolated golden tooling with per-stop placement digests; the golden suite 12 seeds × 3 rungs × 4 water settings ○.
- **Builds on (M0):** M0-x-01 (the record and exitCriteria shape, C-0042; defers the golden tooling and the first shift / cascade records; M1 ingests `M0-record.json`; not landed); M0-x-02 (stage isolation runs on the pipeline; not landed); M0-d-02 (H32 seeds, landed); M0-d-04 (the canonical text form serialiser, landed; defers the form); M0-d-06 / M0-d-08 (the derived-complete digest and placement digests → M1, ledger W27, W32; not landed); M0-k-02 (the declared shift and migration, ledger K59, landed).
- **M-1 needs:** none.
- **Cross-refs:** clause 21 is split in time (§Order): its first three parts — the output-version stamp, the shift / cascade / milestone records and the stage-isolated tooling — come in wave 0, and its 12 × 3 × 4 golden suite is pinned in wave 4, after F13's pipeline and F07's water settings (coast, islands, harbour, clause 28) land; the clause stays primary here; every stage family's output is pinned by these goldens; C-0020 freezes stage and concern ids before the first golden; the placement digests are F23's clause 71; the golden seeds' formulas (`@plat/testkit/seeds`, item 491) are F24's W2; the suite's METROPOLIS rung is F13's clause 6.

### F23 Determinism and placement digests — `@plat/testkit` crosshost / determinism

- **Clauses:** 24 O2 deterministic recipe ○; 71 placement digests identical on Node x86 and in the nightly five-engine run ○.
- **Builds on (M0):** M0-d-06 (cross-host harness, browser runner; not landed); M0-d-08 (time-dilation / op-order harness; defers the pool-size 0–3 clause and the derived-complete digest; not landed); M0-d-09 (determinism spike runner; defers B-CITY's real city, C-0015; not landed); M0-d-07 (allowlist lint, landed; the labels / render import-closure scope → M1, W30).
- **M-1 needs:** none.
- **Cross-refs:** the five-engine golden run is F25's tier contents (W91 / W92); the digests are F22's; the pool sizes the determinism clauses sweep are F18's.

### F24 The calibration rig (V12 W2 / W7) — `@plat/testkit` metrics / parity / panel / register

- **Clauses:** 3 `plat calibrate register --check` green over every calibratable column landed; 52 V12 W2: `@plat/testkit/metrics` with `METRICS`, `plat measure`, `plat baselines check / aggregate`, `plat parity` with dashboard and CSV, `@plat/testkit/seeds`, the panel engine (`PanelSpec`, `plat d5 verdict`), `history.jsonl`, the register with §13.7's letters and the M1–M2b constants, `--defaults --milestone` [W2, V12-M1-1]; 53 the M-1 metric rows' product side (`street.detour` … `draw.hairline`), street-edge recoverability within 0.01 †; 54 V12's forms of the band rule (sign-indefinite metrics, floors), checks C8–C10, the full `CrossingRecord`; 55 W7 at M1: item 111's rate specs and pin, the `--trial` entry, the edge suite's M1 rows [W7]; 62 the D-5 protocol's first run (diagnostic, all three rungs) with its threshold panel †; 69 the figure-ground metrics against MFCG's M-1 recoverability, contrast matrix, `ink` symbolisation census, label floors and counts, hairline fidelity †; 72 the walled share and extramural ribbon share in MFCG's band †; 73 the between-seed dispersion against MFCG's and FTG's †; 79 the parity report by the band rule (`plat/goldens/parity/M1.json`) †; 95 W2's exit tests (T-V12-1 – 7, 16 – 20, 22, 32's MFCG clauses, 51; the panel sat or *provisional — not rated*) †; 103 T-RIG-1 – T-RIG-5; 117 the MFCG street-signature rows that measure lots: R4 and wall alignment as gates, lots per block †.
- **Builds on (M0):** M0-k-05 (metrics, parity CLI, the M0 form of the band rule, landed; defers the sign-indefinite and floor forms and C8–C10 (C-0092), `plat measure` / `calibrate` / the register / the seed families' collision rule (M1 / V12), R4 on lots (C-0018, C-0072), FTG's turning target and `per100m` (K58)); M0-s-02 (calibratable-cell census C-0070, landed); M0-d-02 (H32, landed); M0-c-07a (the street-signature rows; not landed); M0-k-01 (B-CITY's seed families and the collision rehash, W73 / K47, landed).
- **M-1 needs:** `baselines.json` committed into `plat/` (NG bands, MFCG street-signature rows, walled and ribbon shares, lots per block); the M-1 metric scripts and their measured rows; `ftg-captures.json` (numbers-only); the research-side panel script's MFCG renders; the MFCG street-edge recoverability baseline and quarter-label count rows; the variety dispersions of MFCG and FTG; the crossed numbers-only files generally. **Eight of the family's thirteen clauses wait on the crossing, not on code.**
- **Cross-refs:** every family that lands a calibratable column (F05, F06, F15's `hood.constants`, F26's `perf.qualitySpend`) is checked by clause 3; the parity report's input (`--ours`) is F25's B-CITY run (K58); W2 names `build_sitting.py`, `check_t3.py` and `check_t6.py` beside the panel engine — their location and author is a clean-room question for the build spec (volume-shares.md's note), recorded here, not decided.

### F25 Tiers and the B-CITY harness — `@plat/bench` tiers / tier-jobs, B-CITY, B-CITY-lite

- **Clauses:** 20 the B-CITY harness in the PR and nightly tiers (B-CITY-lite in PR; B-CITY nightly; the universal vehicle for every bar clause) ○; 63 B-CITY-lite (200 seeds × 4 water settings): 0 tier-6 omissions of requested features, degraded ≤ 5 %; 66 the fusion gate re-run on B-CITY-lite's river, coast and relief configurations with the reordered stages and its pre-decided fallbacks †; 121 the PR tier's budget with the deny-list scan inside it, first timed at M1 †; 122 the nightly parity report inside a timed `tier:nightly` †; 129 M0's spike-city bars re-run on B-CITY / B-CITY-lite (C-0015: the determinism spike's bars, the digest bars at CITY counts, the matching routine, the skeleton corpus bar) ○; 130 the bent-cut signature bars re-run on B-CITY's districts (M0-b-04, M0-b-05, M0-b-05a/b) †.
- **Builds on (M0):** M0-f-02a / M0-f-02b (tier runner PR tier; nightly / milestone contents; defer B-CITY-lite, B-EDIT, goldens, the five-engine run and visual regression to M1 and later; the nightly `timing-phase (nightly contents)` job `not-built: M1`, C-0088; not landed); M0-c-06 / M0-c-07 / M0-c-07a / M0-c-07b (fusion gate and statistics harnesses; defer real terrain and the band table's slope class to M1's re-run, ledger W90 → 66; not landed); M0-e-06 (spike-city harness; coast and relief configurations beyond the two fixtures → M1; not landed); M0-d-09, M0-d-06 (not landed), M0-d-05b (landed), M0-a-12 (landed) — the bars C-0015 re-runs; M0-b-04, M0-b-05, M0-b-05a/b (none landed); M0-k-07 (the PR tier with the deny-list scan, C-0121; not landed); M0-k-01 (B-CITY's seed families, ledger W73 / K47 → 20; landed).
- **M-1 needs:** `baselines.json` (NG bands, MFCG street-signature rows); `ng-faces.json` (the slope-class calibration; M0-b-05a/b read both); `denylist.json`.
- **Cross-refs:** every exit clause stated "on B-CITY-lite" in other families (F03's 74, F04's 75–76, F08's 65, F14's 64 and 118, F17's 93, F27's 128) runs through this harness; the fusion gate's time fallback (§4.4's class-boundary move, then the CITY budget re-declared as a D-18 amendment for the owner's veto) is an **owner-gated outcome** the build spec must route, not this file.

### F26 Timing and budgets — `@plat/bench` timing / timing-phase / worklimits

- **Clauses:** 49 §12's comfort-level timing at TOWN and CITY (item 119; T119-1, T119-2), `perf.qualitySpend`'s empty row [V11-M1-1] ○; 67 model within §12.3 at TOWN and CITY with the pool measurement; the in-Chrome re-measure (nightly) ○; 82 first-map, settle and re-raster runs at TOWN and CITY band bottom / default / top ○; 83 the model max clause at TOWN and CITY on confirmed outliers; 91 memory within §12.8's lines at pool sizes 0 and 3 ○; 108 confirmation of the F-WORK hit rate per stage, flat across each rung ○; 116 §13.8's nightly timing-phase contents (cost-model sweeps with the F-WORK flatness check, first-map runs, in-Chrome re-measure, flagged re-timing) ○.
- **Builds on (M0):** M0-t-00 (timing-phase script; defers the Chrome-worker re-measure of §12.3's budgets at TOWN and CITY to M1 nightly, C-0082; not landed); M0-t-01 (same, ledger W82 → 67, 116; not landed); M0-f-01 (timing harness, landed; defers calibrate's browser parts and the Chrome-worker figures); M0-f-03a (landed) / M0-f-03b (not landed) (work-limit coefficients, the F-WORK report; defer the nightly flatness sweep and its coefficient fallback, ledger W71 → 108, 116, and re-fitting on B-CITY-lite, C-0021 / C-0174); M0-d-06 (browser runs; not landed); M0-f-02b (the nightly job, C-0088); spec note N-10 (a deny-list fix round touching a timed loop is flagged for M1's first timing phase).
- **M-1 needs:** none.
- **Cross-refs:** the pool sizes measured are F18's; the SVG transient-list and export-time peaks (F17's clause 90) and the stamp-tile load (F16's clause 87) are §12 budgets judged by this family's phase; C-0084's rule (§12.3's p50 column follows any R12-4 restatement) is carried with 67.
- **Carries:** the fusion gate's time fallback (F25's clause 66) re-declares the CITY model budget this family measures — one owner-gated amendment shared by the two families.

### F27 Ladders, fuzz, invariants, edges — `@plat/testkit` ladders / fuzz / invariants / edge

- **Clauses:** 26 O3 robust kernel, typed ladders, report ○; 104 B-EDGE rows and T-ER rows whose mechanisms land at M1; EP-20's island, fjord and narrow-valley fixtures; EP-23's S5b / S5c part; the rung and preset sweeps; the cliff × frame drawn clause ○; 128 §5.1 (8)'s fault-injection hook on B-CITY-lite (three aborts forced, the batch rolled back, one `bugs` entry with a replayable key, tier 6 for the entity, every other leaf digest unchanged) ○.
- **Builds on (M0):** M0-k-04 (B-FUZZ runner; defers B-EDIT and B-CITY-lite's fault injection to M1 / M2a; not landed); M0-x-05 (ladder coverage; defers the later rungs of F-ROUTE / F-RIVER / F-WALL (M1 / M3a) and the hook's B-CITY-lite form; not landed); M0-a-14 (invariant suite; not landed); M0-x-06 (edge suite and coverage table; defers EP-02 / 03, EP-20, EP-23's part, the rung and preset sweeps (C-0100), the cliff × frame clause (C-0118); not landed); M0-k-02 (landed; the M1-tagged generator classes return `'deferred'` with the tag, C-0038; the B-FUZZ re-run whole with the pool overlays class, K12).
- **M-1 needs:** none.
- **Cross-refs:** the edge suite's M1 rows named by V12 W7 are F24's clause 55; each ladder's rungs are built by the stage family that owns the stage (F09–F12, F14) and counted here; the pool overlays class fuzzes F18's pool.

### F28 Bars with no single mechanism family — §13.8's schedule, §13.7's thresholds

- **Clauses:** 2 M1's bars are those §13.8's schedule gives M1 and its volumes' §7 bars at the steps their §8 names; 96 T13-1; T14-1 but its hidden-render clause; T16-4; T23-1's registry test; T43-1 – T43-5; T45-1; T54-1; T55-1; T111-2, T111-3, T111-5; 97 T46-1, T47-1 (nightly, walled B-CITY seeds); 99 T88-1, each reader from the milestone that lands its stage; 105 §13.7 thresholds due at M1: O12 (a) legibility floors with the 6 / 7 / 8 px strip; O13 (a) label curvature; O13 (c) name–feature consistency within 250 m; O14 (e) built / map area 0.06–0.25; requested features degraded ≤ 5 %; O16 (c) M1 tasks — each with its pre-decided fallback.
- **Builds on (M0):** the tier runner (F25's clause 20) and the timing script (F26) — the universal vehicles; nothing else named.
- **M-1 needs:** none.
- **Cross-refs:** each T-number is judged inside the family whose mechanism it tests (the build spec binds them; this skeleton does not). From the clause texts alone: T16-4 is F05 / F10's detour factor, T46-1 / T47-1 are F11's walled seeds, T111-x are F07's oasis, T116-x sit with F16 (clause 102), T20-x / T73-x / T85-x with F20 (clauses 98, 100), T65-7 with F07 (clause 101), T-RIG-x with F24 (clause 103); the rest (T13-1, T14-1, T23-1, T43-x, T45-1, T54-1, T55-1, T88-1) are not mapped here. 105's O12 / O13 thresholds fall on F16 / F15, O14 (e) on F12 / F14, O16 (c) on F19.

## Order

Five waves by dependency, each a rough order and not a schedule. A family may start when the M0 interfaces it names have landed records; "parallel" means no dependency between the listed families, not that seats are free.

| wave | families | why here |
|---|---|---|
| **0 — foundations and the long poles** | F02 (schema, registry, zod), F01 (small kernel items), F05 (tables, presets, marker, layers), F22's tooling and output-version stamp (clause 21's first three parts: the stamp, the shift / cascade / milestone records, the stage-isolated tooling — before the first stage lands, so every later family lands under goldens; C-0020's id freeze precedes it), F06 (content authoring starts now: the design fixes what to author; only its verdict waits on `denylist.json`), F20 (port in the tests — independent of the stages once F02's schema exists) | everything below reads a record, a table row or a golden; F06 is ≈ 3–4 pw of authoring and F20 ≈ 2.5–3 pw, both off the stage critical path |
| **1 — the ground, in stage order** | F07 (S0 / S1) → F08's S2 part (clauses 111, 65) → F09 (S3) → F10 (S4 / S5 / S9) → F12 (S6 / fields / seams; the S7b hook) → F11 (S7) → F08's clause 10 (S7b, after S7 and F12's hook) → F13 (the one pipeline at three rungs, last, when every stage registers) | each stage reads the one before it, in the design's stage order S4, S5, S6, S7, S7b (`ARCHITECTURE.md` ≈ line 5735; S7b "after S7", ≈ line 6965); F08 is split by stage because its clause 10 is S7b; F13 is the integration that clause 4 calls the universal vehicle, so the stage families precede it |
| **2 — plots and the picture** | F14 (S10 / S10b / S11) → F15 (S13a / S13b) → F16 (S14, `ink`, the pyramid) → F17 (export) | F14 reads F12's blocks and frontages and F08's roster; F15 reads F12's merge tree and F06's grammar; F16 draws F14–F15's output; F17 frames within F16's limit |
| **3 — the document, the host and the shell** | F04 (document) with F03 (identity, archive) beside it; F18 (pool, worker host, report, CLI); F19 (shell) last; F21 (docs) whenever F22's records exist | F04 needs a full town to size (clause 75) and round-trip (clause 76); F18's pool wraps the pipeline F13 finished; F19 shows F16–F18's surfaces; F18's pool can start earlier against M0-a-06's overlay if the build spec wants the memory clauses sooner |
| **4 — the rig, the harness and the exit** | F23 (determinism), F27 (ladders, fuzz, edges), F26 (timing), F25 (tiers and B-CITY), F24 (the rig and its needs-M-1 verdicts), F28 (the remaining bars), clause 21's 12 × 3 × 4 golden suite (F22), pinned after F13 and F07 land; then clause 1's `MilestoneRecord` | these judge the others and run on B-CITY-lite, which needs the whole pipeline; the † clauses (14 of them, 8 in F24, 4 in F25, 1 each in F06 and F21) are **last in this wave because they wait on the M-1 crossing, not on code** — the code they need can be built in wave 4's first half |

Three ordering notes the clauses impose: the golden tooling (F22's wave-0 part of clause 21) precedes every stage family, not follows it, because the first golden pins the stage ids (C-0020) and the output-version stamp (clause 21) is what permalinks (F17's 18) and the document (F04's 14) read — while clause 21's golden suite itself waits for the pipeline (F13) and the water settings (F07's clause 28); S7b (F08's clause 10) waits on S7 (§4.5) and on F12's M0-b-03 pending claims (C-0036, ledger W36), so it is not built with S2; and the B-CITY harness (F25's clause 20) is the vehicle for every "on B-CITY-lite" clause across waves 2–4, so its PR-tier form must exist before those families can prove their exit clauses — the build spec may pull clause 20's harness forward to wave 1.

## Discrepancies and gaps carried, by family

Every row is already in `scope.json`'s *discrepancies* or `m0-deferrals.md` §4 *Gaps*. This table only says which family holds each one so none is dropped; it resolves nothing.

| item | source | parked with | what the build spec must pick |
|---|---|---|---|
| transient arenas: §16 M1 vs `M0.md` §4b / M0-a-07 / M0-a-16 M6-P | scope.json discrepancies; clause 38 | F01 | build at M1 (re-tag the `notBuilt('M6-P')` stubs with a choices row) or leave at M6-P |
| S12a–c: `M0.md` §4b M1 vs §16 M2b | scope.json discrepancies; clause 112 note | F13 | which stages register at M1 |
| II.5's M1-exit readiness uses New random (§16: M2a) | scope.json discrepancies; clause 80 | F12 | how the readiness clause is exercised without the named action |
| full `GranularityLaw`: M0-b-01 → M1's `@plat/plots` vs §16 "O18 with a flat field" at M1, full law at M2b | scope.json discrepancies; clause 31 note; K1 / K50 | F12 / F14 | where the law's M1 part stops |
| roof readers (`RoofSpec`): M0-a-11 → M1 vs §16 M2b | scope.json discrepancies; W13 / K52 | F14 | M1 or M2b |
| rebuild-partition-on-first-query fallback → "M1's open-to-editable bar" vs §16 M2a exit | scope.json discrepancies; W17 | F04 | M1 or M2a |
| the slope term's real field and "M1's slope classes" (M0-b-02, split with M0-e-05) | ledger gap W35 | F07 / F12 | which family and whether M1 |
| the water pull's real q(x) (M0-c-01, split with M0-e-05) | ledger gap W43 | F07 / F09 | which family and whether M1 |
| the hinterland unit (M0-e-04 → M1; M0-x-02 splits M1 / M6-U; §14: `@plat/layout`) | ledger gap W64 | F08 / F12 | its M1 part, if any |
| calibrate's browser parts and the host record's `browser` field (M0-f-01, split M1 / M4) | ledger gaps W69, K18, K38 | F18 / F26 | its M1 part |
| `plat/assets`' files and the fonts' name tables (M0-k-06) | ledger gap W93 | F15 / F16 | which family ships the assets |
| roles.json version 2 naming the simple-ring roles (M0-a-05, C-0177) | ledger gap K56 | F01 | whether M1 |
| C-0156's §12.10 budget register | K43 note | F05 | whether M1 |
| `build_sitting.py`, `check_t3.py`, `check_t6.py` (W2 names them; research-side) | volume-shares.md note | F24 | location and author under the clean room |
| V08's M1 items, if any | volume-shares.md "V08 not read" | — | an owner read, or a seat whose milestone builds V08 |
| the fusion gate's time fallback (CITY budget re-declared as a D-18 amendment for the owner's veto) | clause 66 | F25 / F26 | owner-gated; routed, not decided |
| §13.5 says M-1 recomputed baselines on 2026-10-04; `plat/` held no `baselines.json`, `ng-faces.json`, `denylist.json` or digest when read | scope.json discrepancies | F24 / F25 / F06 / F21 | the † clauses wait on the crossing's files landing in `plat/packages/testkit/baselines/` |

## What this file is not

- Not a binding of clauses to owners, seats or files: M0-x-01's record fixes the record and exit shape and M0-a-16's façade fixes the kernel surface the stage families import; both were unlanded on 2026-10-05.
- Not an estimate: §16's M1 line is 40.25–52.25 pw with the named-work sub-lines quoted in the family headings where §16 gives them (F06 ≈ 3–4, F19 ≈ 2–3, F01's transient arena + F05's layers / marker / presets ≈ 1, F20 ≈ 2.5–3, V01's share ≈ 0.5, F24 +1.75–2.25); no family total is computed here.
- Not a refresh of the deferral ledger: the ledger is a snapshot and so is this; both are re-read at M0's close.

**CONFIRMED** (read in place): every clause number, status, `m0Items` and `m1Needs` string is `scope.json`'s; a Builds-on entry beyond the clauses' `m0Items` is grounded in an `m0-deferrals.md` row (W / K / S) that maps to one of the family's clauses and is cited by its row id, and an M0 item with no such row sits only as a Cross-refs pointer; every W / K / S row is `m0-deferrals.md`'s; every package name is a §14 row; the M0 package layout is `M0.md`'s block as working copy. **PLAUSIBLE**: the family a clause is primary in, where §14 splits the subsystem across packages (S7b: layout claims / content allocation; S13b: labels placement / render worker; the document: model + api), and the wave order, which is read off the clauses' `m0Items` chains and not stated by the design.
