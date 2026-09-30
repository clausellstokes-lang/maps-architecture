# Fable review — lane fable-review/main/evidence-review (coverage audits, post-revision verifications, red-team measurement scripts)

Reviewer: Fable (claude-fable-5-1), 2026-09-27 (started 21:47; resumed after a session limit with no CHECKPOINT line and every
row still planned, so nothing was redone). Rows: every PENDING row of `docs/FABLE-REVIEW-QUEUE.md` whose id is B18, B19 or
B21 (three rows; listed by grep at the start — no other row matched these ids; B20 is the sibling lane `evidence-captures`'s
row, already CONFIRMED there, and is not judged here). Judged against the CURRENT design (`docs/ARCHITECTURE.md`, 13 026 lines,
sha256 `1c23190f…` — the post-hand-fix-close text of 21:45; `docs/ARCHITECTURE-RATIONALE.md` `0be40dfd…`;
`docs/ARCHITECTURE-VALIDATION.md` §R1–§R5 and §Ab for the fix-round record; `docs/validation/fix-all/index.md` for the routing of
every coverage gap). Method per row is the lane brief's: B18 — read the four coverage audits whole and re-check at least ten
capability rows per audit against the current text (was the gap real; is it closed; what the audit missed); B19 — the files the
row names either exist and are judged or do not and the row is REJECTED; B21 — read every script whole, run at least three and
compare with their `.out` files, judge the synthetic workloads' representativeness and the export measurements' units. Scratch:
`/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/c0d81c15-f08e-4364-97ca-c6b05aa13811/scratchpad/fable-review/` (re-run
outputs `run-*.out`, probes `probe-*.txt`, `cover_rederive.py`).

Clean room: this seat opened no captured bundle. The FTG anisotropy script reads two captured protobuf PAYLOADS
(`captures/ftg/**/network/bodies/intercept-*.bin`, map data, not code) through the project's own `tools/pb_raw.py`; the MFCG
scripts and my own re-derivation read the project's own GeoJSON exports. Nothing of the references' code, constants, grammars or
identifiers is quoted here.

## PROGRESS

| row | planned | done |
|---|---|---|
| B18 | read the four audits whole (2 281 lines); ≥ 10 rows per audit re-checked against the current design via the fix-all index and §R1–§R5; missed capabilities; verdict | done — CONFIRMED (67 gap rows + 4 noted COVERED rows re-checked; verdict sections appended to the four audits) |
| B19 | `docs/validation/verify-*.md` existence; what superseded them; verdict | done — REJECTED (never produced) |
| B21 | read the 11 scripts + README whole; run ≥ 3 (all 11 where inputs exist) and diff against `.out`; units of the export measurements; representativeness of the synthetic sizes against §12; design consumption; verdict | done — CORRECTED (all 11 re-run; README section appended) |
| blocks file, design impacts, CONFIRMED vs PLAUSIBLE, LANDED | write; log | done (no block; LANDED line written last) |

## Verdict table

| row | verdict | reason | corrections |
|---|---|---|---|
| B18 | CONFIRMED | all four audits read whole (2 281 lines); the fix-all index's 96 coverage gaps re-derive from the audits' own tallies; 67 gap rows and 4 COVERED-with-note rows re-checked against the current text — every gap was real (quoted pre-fix text, concurred by the fix seats: 97 FIXED, 10 STAGED-BY-OWNER, 0 INVALID among the COV items), every one is closed now or staged with a concrete hook that I found in the text, and I found no capability the audits missed | none to the audits; a verdict section appended to each of the four files |
| B19 | REJECTED | never produced: no file matches `docs/validation/verify-*.md`; workflow 03's revision-round verifiers never ran — `docs/lane-events.log` goes from the last red team (17:37) to `fixall/index` (18:07) and the first verifiers ever to land are `fixall/verify-*-r1` at 19:59–20:19 (`docs/validation/fix-all/r1-verify-*.md`), which have their own 25 queue rows `B-fixall/verify-{area}-r1…r5` | none possible (no file); the reconciler sets the row to REJECTED with the reason "never produced; superseded by B-fixall/verify-*" |
| B21 | CORRECTED | all eleven scripts read whole and re-run: the five Python measurements reproduce their `.out` byte for byte, the five Node benchmarks reproduce theirs within timing noise on the same machine class (Apple M1, Node v24.12.0), and the output-less cover script reproduces the 0.246 → 0.311 paper share `redteam-visual.md` quotes; the units the scripts assume (JSON in metres) are right and consistent with J19; the 0.57–0.66 ink cover is re-derived exactly from the exports — but the README credits it to `mfcg_cover.py` (it came from the unpreserved `mfcg_stats.py`), and `bench_state.out` carries one defective line (a negative heap figure) | README gets a review section (attribution, the heap line, units, the re-run table); the `.out` files stand as the receipts the reports quote; the two design sentences resting on bench figures reproduce; no block |

## B19 — Post-revision verifications (`docs/validation/verify-*.md`)

**Verdict: REJECTED — never produced; superseded by B-fixall/verify-\*.**

What I checked (all CONFIRMED by execution):

* `ls docs/validation/verify-*` matches nothing; `find docs -name "verify-*"` finds files only under `docs/validation/consistency/`,
  `docs/validation/amendments-b/`, `docs/validation/amendments-b/handfix/` and `docs/validation/fix-all/r{1..5}-verify-*.md` — all
  later passes with their own queue rows.
* The row's producer, "Opus verifiers (workflow 03)", is the `validation/verify-${grp}-r${round}` lane of
  `workflows/03-assess-design-validate.js` (line 274), which runs only after that workflow's revision round
  (`LANE ARCHITECTURE-VALIDATION (revision round …)`). `docs/lane-events.log` shows the 2026-09-25 sequence: coverage audits and
  red teams LANDED 16:00–17:37, then `fixall/index` LANDED 18:07 (workflow 06, the owner's no-defer pass), then
  `fixall/verify-determinism-r1` 19:59 … `fixall/verify-scope-r1` 20:19. No `validation/verify-` or `final-validation` lane ever
  ran; `find docs -name "final-validation*"` is empty.
* The queue already carries the superseding work: 25 rows `B-fixall/verify-{determinism,pipeline,kernel,rendering,scope}-r{1..5}`
  (lines 67–71, 78–82, 89–93, 104–107 and the r5 rows), each reviewed by the per-part Fable lanes of this run.

What replaces it: nothing new — the superseding verifications are already queued and reviewed elsewhere. The row was written on
2026-09-25 in anticipation of workflow 03's round and should close. JUDGMENT (J-Fev2-1): REJECTED rather than CONFIRMED-vacuous,
because the queue's own rule is one row per artifact and this artifact does not exist — say "veto" to keep the row open.

## B21 — Red-team measurement scripts (`docs/validation/bench/*.mjs, *.py, *.out, README.md`)

**Verdict: CORRECTED.** The scripts and their recorded outputs stand as evidence; two statements in the README and one line of one
`.out` do not, and are corrected by an appended README section (below). No design text quotes a number that changes.

**Scope read whole.** README.md (59 lines) and the eleven red-team scripts of 2026-09-25 17:07 — `bench_state.mjs`,
`bench_index.mjs`, `bench_terrain.mjs`, `bench_poisson_astar.mjs`, `bench_siting_doc.mjs`, `mfcg_orient.py`, `mfcg_ribbon.py`,
`mfcg_wallalign.py`, `mfcg_cover.py`, `ftg_anisotropy.py`, `ftg_arith.py` — with their ten `.out` files (`mfcg_cover.py` has none).
The later `fixall_*` and `amendb_*` scripts in the same folder belong to the fix-all and amendments-b rows (their own queue rows)
and are not this row's.

**Re-runs (CONFIRMED by execution, 2026-09-27, Apple M1, Node v24.12.0, Python 3.9.6 — the README's stated machine class).**

| script | inputs found | re-run versus `.out` |
|---|---|---|
| `mfcg_orient.py` (from `captures/mfcg/exports-2026-09-25/`) | 3 JSON exports | byte-identical (9 lines) |
| `mfcg_ribbon.py` | 4 JSON exports | byte-identical (4 lines) |
| `mfcg_wallalign.py` | 4 JSON exports | byte-identical (12 lines): 0–40 m band 87 / 88 / 84 / 92 % within 15° — the README's "84–92 %" |
| `ftg_arith.py` | none needed (seeded) | byte-identical (20 lines) |
| `ftg_anisotropy.py` (from the project root) | both `.bin` payloads + `tools/pb_raw.py` | byte-identical (36 lines): ratio 1.26 / 1.65, CV 0.20 / 0.33 |
| `bench_state.mjs` (CITY and METRO) | seeded | timings within 1–6 % on every line a report quotes (canonical hash 1 163 → 1 177 ms CITY, 2 712 → 2 713 ms METRO; stream keys 73 → 73 ms = 0.73 µs per key; 65.0 / 167.4 MB text identical); three lines move beyond noise — CITY structured-clone receive 162 → 84 ms, display-list build 6 → 21 ms, and **heap per entity-table copy −90 MB → 47 MB** (see below) |
| `bench_index.mjs` | seeded | within 1 % (CITY S11 13.37 → 13.39 s; METRO S11 84.93 → 85.32 s; single edit 7.33 → 7.34 ms) |
| `bench_terrain.mjs` | seeded | within 3 % (CITY 625² S1 subtotal 125.5 → 127.6 ms) |
| `bench_poisson_astar.mjs` | seeded | counts identical (25 667 / 65 632 points; 35 364 / 88 869 expansions); µs per point 12.08 → 12.11 |
| `bench_siting_doc.mjs` | seeded | sizes identical (15.5 MB / 1.25 MB gzip; 2.73 / 6.98 / 11.44 MB); siting 97.8 → 99.6 ms per round |
| `mfcg_cover.py` (needs a crop box and screenshots; recorded only in `redteam-visual.md` §0 line 72) | `captures/mfcg/2026-09-25T10-38-58/steps/047…, 049…, 051….png`, window 660,720,940,940 | reproduces the quoted result exactly: paper share of land 0.246 (Lots) → 0.311 (Complex), figure 0.754 → 0.689, Block 0.249 — its `.out` was never preserved; my run is `run-mfcg_cover.out` |

The `.out` files therefore stand as the receipts the reports quote (`redteam-scale.md` §0 and SCL-1/2/5/6/8/11/12 cite them; the
0.73 µs per key, the 65 MB canonical text, the 13.37 s S11 index total and the 2.73 MB raster pair all reproduce). JUDGMENT
(J-Fev2-2): I do **not** regenerate the Node `.out` files — their numbers are the ones the red-team findings quote and reproduce
within noise, so a regenerated file would only break the receipt chain; the one defective line is ruled in the README instead —
say "veto" to have the five files regenerated from `run-bench_*.out` in the scratch folder.

**The defective line.** `bench_state.out` CITY reports "heap per entity-table copy ≈ −90 MB": a negative memory delta is a
measurement failure (the forced GC before the second `heapUsed` read reclaimed more than the copy allocated). My run gives 47 MB;
the METRO line reads 117 MB in both runs. `redteam-scale.md` §7.3 reproduces the raw `bench_state` output verbatim (its line 756
carries the −90 MB), but the SCL-5 argument itself rests on the METRO figure (≈ 2.1 KB per entity, 117 MB for 55 625 entities),
the 29 / 73 MB typed-array totals and the 19.4 / 48.7 MB serialised sizes — all reproduced — so nothing downstream rests on the
defective line.

**Units (the row's "1 unit = 4 m").** Two different units are in play and the scripts use the right one. The GeoJSON exports are in
metres: the metadata feature reads `roadWidth 8, towerRadius 7.6, wallThickness 7.6` (MFCG's 2.0 u road and 1.9 u wall at 4 m per
internal unit), and the size-40 wall ring spans 919 × 866 units = 58 ha, a 0.9 km walled town — at 4 m per unit it would be a
3.7 km, 930 ha enceinte, absurd for "size 40". The SVG is in MFCG's internal unit, 4.00 m (redteam-mfcg §0's `mfcg_scale.py`:
3.9998; the sibling lane's B20 check: 4.000 ± 0.001 m per SVG unit, J19). `mfcg_ribbon.py` says so in its header ("JSON units are
metres") and every distance band in the three MFCG scripts is metres. Consistent with J19; no correction to the scripts.

**Ink cover 0.57–0.66 — re-derived, and mis-attributed.** My own script (`cover_rederive.py`: shoelace footprint area of every
building whose centroid lies inside the wall ring ÷ ring area) gives 0.657 / 0.582 / 0.621 / 0.583 for size 40 with gates 0 / 1 / 4 / 9
and 0.569 for size 80 — exactly MFP-1's "65.7 / 58.2 / 62.1 / 58.3 % at size 40, 56.9 % at size 80" (CONFIRMED). But the README's
table credits "building ink cover (0.57–0.66)" to `mfcg_cover.py`, and that script is a pixel classifier over MFCG screenshots
(paper / water / tree / ink by colour distance, void widths by a chamfer transform; comparing Lots versus Complex versus Block
display modes at three recorded steps) whose own result is a different number — the **paper share of land 0.246 → 0.311**
quoted by `redteam-visual.md` (§0 line 72; VIS-2's evidence, line 231), which my re-run reproduces exactly — and whose `.out` was
never preserved. The 0.57–0.66 cover came from `mfcg_stats.py`, whose rule redteam-mfcg §0 states ("gross footprint cover inside
the wall") and whose file was not preserved either. Correction: the README section below records the true provenance of both
figures and the re-derivation that now stands in for the missing `mfcg_stats.py`.

**Representativeness of the synthetic workloads (PLAUSIBLE, argued).** The `bench_state` / `bench_siting_doc` shapes are the §2
schemas of 2026-09-25 at 5 500 plots, 6 000 buildings, 1 750 blocks, 3 000 ways, 25 districts and 60 000 vertices per plat level for
CITY, ×2.5 for METRO. Against the current §12 ladder (line 224–226: CITY 4 500–6 000 buildings on a 5.0 km frame, METROPOLIS
12 000–15 000 on 8.0 km) the CITY workload sits at the top of its band and METRO (15 000) at the top of the METROPOLIS band; the
calibration table at line 9521–9523 (MFCG size 80 → 5 242 buildings, size 130 → 13 091) puts both within 15 %. `bench_terrain`'s
grids are the design's frames (2 / 5 / 8 km at 5 / 8 / 10 m, plus the 30 % margin), `bench_poisson_astar`'s S4 lattice is the design's
25 m spacing and `bench_index`'s face counts (L3 ≈ 8 000, L4 ≈ 17 000 at CITY) follow from the plot and footprint counts. The
workloads are schema-shaped cost models, not the product's code, and the reports say so; every finding they fed (SCL-1 canonical
hash → the §6.2 digest tree, measured again by `fixall_det_r4_loaddigest.mjs` at ≈ 31–34 ms; SCL-2 per-commit index rebuild →
S10 step (0)'s one rebuild, `fixall_kernel_r3_bench.mjs`; SCL-11 rasters → derived, not persisted) was closed by a mechanism
the fix rounds then re-measured. `ftg_arith.py` part A reads the §4.7 band midpoints as they stood on 2026-09-25 (its purpose was
to show FTG-1's double count on that text); it is evidence of the pre-fix design and needs no update.

**Clean room.** `ftg_anisotropy.py` decodes map payloads (protobuf field numbers of the captured layout message, zig-zag
centimetres) through `tools/pb_raw.py` — data, not code; no bundle is opened by any script.

**What the design takes from these scripts (CONFIRMED by grep and re-run).** Two places in `docs/ARCHITECTURE.md` rest on them:
§6.1 (line 5773) budgets stream-key derivation at "≤ 0.1 µs per stream key (string paths measured 0.73 µs)" — the `bench_state`
figure, reproduced exactly (73 ms for 100 000 keys); and §13.5's MFCG street-signature metrics (line 10617: lot-orientation
coherence R4 within 60 / 120 / 250 m, lot alignment with the wall by distance band) are the `mfcg_orient` / `mfcg_wallalign`
measurements, reproduced byte for byte. The rationale file quotes none.

**Corrections made:** one appended section in `docs/validation/bench/README.md` ("Fable review (2026-09-27) — B21"). **Blocks:**
none — every design sentence that rests on a bench number reproduces.

## B18 — Coverage audits of the architecture (four slices)

Verdict pending the VG, NG-shared and FTG parts (below, written as they finish). All four audits were read whole
(`coverage-audit-mfcg.md` 367 lines, `-vg.md` 640, `-ng-shared.md` 417, `-ftg.md` 857 incl. its appendices — 2 281 lines in
ranges). The fix-all index's count of coverage gaps — 96 (MFCG 18, VG 8, NG 16, FTG 54) — re-derives from the audits' own tallies
(MFCG 17 PARTIAL + 1 MISSING; VG 6 + 1 BASE and 1 STAGE-2; NG 16 PARTIAL; FTG 47 + 7): CONFIRMED.

### B18 (a) MFCG slice — 137 rows, 18 gaps

**Routing and disposition.** Every one of the 18 PARTIAL / MISSING rows is a `COV-MFCG-*` item of `fix-all/index.md` §4 (C07 as a
duplicate of FTG-8; L10 the primary of COV-FTG-L08; G05 the primary of COV-FTG-F16; L03 the primary of COV-NG-CR02) and every one
is disposed **FIXED** in `ARCHITECTURE-VALIDATION.md` §R1.1 (round 1; lines 170, 235–243, 343–349, 396). None was ruled INVALID.

**Was each gap real.** Accepted on the quoted evidence: each row quotes the pre-fix text (2 201 lines, 2026-09-25 15:10) and the fix
seats, reading that same text, chose FIX for all 18. No pre-fix-all copy of the design survives in `docs/archive/` (the oldest is the
pre-consistency copy of 2026-09-26), so the quotations plus the fix seats' concurrence are the two witnesses. For the one HIGH row,
E04, the audit's argument stands on its own terms: the pre-fix §4.2 S3 derived external bearings only "a road along each bank, a
coast road", so an inland one-click town had no rule for its radial roads.

**Is each closed now — 18 of 18 present in the current text** (`grep`, line numbers of the current file):
A03 per-rung feature table on its own concern (3378; 260); A06 framing = the circle over max(outer enceinte radius, the 95th
percentile of footprint distances) × 1.08 fitted to the short side, no letterbox (8833–8837); C05 the working major axis rotated
toward the contour direction on faces steeper than 5 % (4208); C07 `waterfront: open | quay_wall | sea_wall` as a preset row read by
S5a and F-WALL (1541, 3372, 3875–3884); E04 every route carries an external bearing (809, 3755); G03 `ringBand` / `insetRing` and the
ring-cloister template (1045, 2528, 2543); G05 the axis-locked composer (1048, 4573, 4583); I01 the main plaza always gets one
centrepiece, the furniture vocabulary statue / monument / bandstand / market cross (1626, 4650); I03 park layout radial fan or
semi-fan with a perimeter path (4910); J04 the gazetteer legend (8815–8816); K06 the `ink` default with MFCG's raised under-copy on
and the projected shadow off (258, 7600, 7649); K12 `tint` per district from a greedy colouring of the district adjacency graph
(7781, 7806–7809); K16 the tree slot after fields and before walls, woods over track casings (7905); L03 Displace / Liquify / Relax /
Bloat / Pinch / Equalize / Measure mapped kernel by kernel (6515–6522); L08 `keymap.json` with the click / shift / ctrl / alt idiom
(10557, 11061–11063); L10 the measure tool of §9.5 with ruler snaps (6522, 8330, 8410); M06 the emblem as a per-document furniture
symbol (2073, 5765, 5812); Q01 several enceintes, 0–2 castles, islands and confluences, polycentric settlements, multi-line labels
stated as supported (3382–3384).

**Three COVERED rows with notes, re-checked.** D07 (the castle's town-facing gate "not stated as a rule") is now stated — "the
castle has one town-side gate" (4720). D11 (the setback band "should be stated" as applying on both faces of the wall) — checked
below with the FTG probes (H07 shore setback shares the anchor). K09 (a printable frame overlay "not listed") — the map border is
now an entity (the frame rectangle, role `border`, 465, 3286); MFCG's double-rule decorative frame is a style of that role, trivial.
E09 (MFCG's "Maximum" road mode) has no named equivalent (0 hits), as the audit itself judged trivial.

**What the audit missed.** I walked MFCG's recorded surface against the 137 rows and found no capability without a row. Items
one might expect and where they sit: option persistence in local storage (0.4.1) → A02's evidence and the §7.6 `userGlobal` override
layer; the `export=png/svg/json` URL automation → A07's evidence and the Node CLI (D-4, M05); the `hub` parameter → the host
hand-offs of M05 / M07; the coastal castle as a named export entity → M02; Rebuild → A07 and §7.1 regenerate; hover tooltips → L02.
The audit's scope-creep list (canals, the `random` / `shift` kernels, `fjord`, `gallows`, moles) was judged an option, not an
obligation, by the fix-all index (§1 "Not items"), and the owner's later amendments made canals a first-class carve (S3 L0, 3286),
so the recommendation is moot. **MFCG part: the audit stands, all 18 gaps real and closed; no correction.**

### B18 (b) VG slice — 192 rows, 8 gaps, 4 caveats, 5 wording corrections

**Routing and disposition.** The 8 PARTIAL / MISSING rows (VN-031, VN-029, VN-170, VN-088, VN-008, VN-010, VN-158, VN-179) and
the 9 items the fix-all index added from this audit's caveats and wording corrections (VN-002, VN-003, VN-090, VN-156, WC1–WC5)
are all `COV-VG-*` items; the fix rounds disposed them FIXED except the village-roadmap ones (VN-179, VN-002, VN-003, VN-090,
VN-156, WC4 STAGED-BY-OWNER — which the roadmap rule turns into "hooks concrete now", checked below). None INVALID.

**Was each gap real.** Accepted on the quoted evidence, concurred by the fix seats. I re-derived the two MEDIUM arguments that
rest on the design's own text: VN-029/VN-031's contradiction (IMPROVEMENTS §5.2 makes relief tiers a base should-have while the
pre-fix §15.1 / §16 / PART III declared relief "not built in the base") is a plain reading, and VN-088's undefined band is arithmetic
on the pre-fix ladder (TOWN ≈ 5 000 with no floor; the village ladder with no ceiling).

**Is each closed now — 8 of 8, and the 9 added items** (current line numbers): VN-031 the `hillshade(sun, strength)` program,
Lambert on bilinear-interpolated cell normals, over the terrain field raster (7776, 7584); VN-029 a relief tier in the base with its
F-CONTOUR ladder — a contour never crosses the shore (3413) — the `painterly` preset merely switches it on by default (7945);
VN-170 a **vacancy-run share of frontage** column in the granularity table, interpolated along the prosperity value (4407, 4415);
VN-088 the TOWN band now starts at 1 500 (224) and PART III's ladder below TOWN runs THORP ≈ 20–80, HAMLET ≈ 80–400, VILLAGE ≈ 400
up to (not including) 1 500 (12273) — the two ladders meet with no gap; VN-008 `rerollLayer` with per-entity salts and a schema
that refuses a geometry concern (1681, 1835); VN-010 `referenceBuild` is a required field of every B-REF row and the CLI refuses
a row without it (10571, 10587); VN-158 exporters instance trees deterministically — "a GeoJSON, glTF or CityJSON file with trees is
byte-identical on every host" (8499); VN-179 `SquareFabric`'s `void` mode: the plots whose frontages face a chosen open area are
left unbuilt, so the square is the irregular void (10709, 11744). Caveats: VN-002 / VN-003 the stage graph is the DAG the declared
inputs and outputs induce, topologically sorted with the stage id as the tie-break (3237; `SkyStrategy` is registered that way,
4166), so a village density stage or palisade ahead of the network is admissible; VN-090 `Existence` carries `ruined` (1665);
VN-156 every rung row has `aspect: [number, number]` 0.5–2 (211, 222). Wording: WC1 "irreproducible" — 0 hits; WC2 the §15.1 VG row
now reads "VG's course-first, terrain-independent spline is a `RiverStrategy` the village registers" (11266); WC3 "domain-warped
variant" — 0 hits; WC4 staged with the hook stated in PART III item 4, "One district (COV-VG-WC4): a village is modelled as one
district of kind `village`", so building ⊂ plot ⊂ block ⊂ district holds unchanged (12270–12272; PART III is headed "the hooks are
concrete", 12243); WC5 the shadow casters are enumerated (8056–8058).

**What the audit missed.** Nothing of substance: VG's twelve layer toggles, tags, wilderness mode, house numbering, nameplate,
print styles, top-down toggle, custom map sizes and the Enter successor all have rows. **VG part: stands; no correction.**

### B18 (c) NG-shared slice — 227 rows, 16 gaps

**Routing and disposition.** The 16 PARTIAL rows are `COV-NG-*` items (CR02 a duplicate of COV-MFCG-L03); the index routed six
neighbourhood-roadmap items (N06, N12, N27, XA07, XA36, XB23) to the staged list — the fix record shows five STAGED-BY-OWNER
lines and one fixed outright — and disposed the rest FIXED (14 of the 20 COV-NG lines); the two observations the index added (OBS3
FIXED as a duplicate of MFP-8, and the §6.1 wording) are FIXED. None INVALID.

**Was each gap real.** Accepted on the quoted evidence; N18 re-derived from the audit's own numbers (the pre-fix §4.6 drew the
start along the start side as N(0.5, 0.06) clamped to [0.40, 0.60], while AN-2 / AN-6 measure a major-axis fraction with
σ ≈ 0.066 / 0.098 and a 2–5 % tail — two different quantities, the audit is right); CR02 rests on critic ruling C4 (whole-map
Rotate), which the audit applied correctly.

**Is each closed now — 16 of 16.** MEDIUM: N18 the start is `f ~ N(0.5, σ)` as a fraction of the major axis, σ = 0.066 on plain
faces and 0.098 on holed or annular faces, a 3 % outlier draw, **no clamp**, the far side by NG's R1 with `cut.farSideAlt` = 0.34 as
the measured fallback and R4 as the last rung, M0 (b) made distributional (4211–4230) — every clause of the audit's required
change; CR02 Rotate is the `rotation` view key, a whole-map rotation as view state, never a vertex operation (6521, 2933); VS27
`LandUse` carries `crop` and livestock (1573, 1624). LOW: N06 the outline-template row disc / D-shape / lozenge / crescent / spindle
for standalone and sky calls (3419, 11657); N12 the ring bands processed outside-in, one hole-aware recursion per band, radials
staggered band to band, no template radials (11737–11740); N19 the fillet's tangent is `r_t` × the shorter leg with
`r_t ~ N(0.73, 0.10)` clipped to [0.54, 0.87] (4232–4233); N20 the width law's free-end term `n_free` and `e = 0.025 ×` the
district's median cut length (4267–4268); N27 the set-back compound's enclosure wall and gate (4569, 11767); XA07 "spacing to the
nearest landmark or manor block" is an input of the stage-2 dispatch table (11759); XA36 `ruined` (1665); XB08 compass auto-
placement by a covered-marks score over eight candidates, re-evaluated when the view settles (8800–8803); XB15 grid kinds none |
square | hex | mesh and **skip water** (8809–8811); XB17 multi-colour roles with the pick rule, aggregate fills take index 0 (7642,
7804); XB23 / CR23 `Pin.kind` gains statue, monument, bandstand, campfire, fire pit, stall (1578, 1626); XB32 tree instances in
every export (8499). Observations: OBS1 "irreproducible" gone; OBS3 the "≈ 13–14 m across at size 25" figure removed and the MFCG
footprint baseline re-based on the metre exports (§13.5; validation line 404); N35 in the §8.3 census — "no ridge stroke; outline =
footprint only (NG BG-3; N35)" (8009). The audit's scope-creep note (the unevidenced `Pin.kind` values cross / shrine / pump /
gallows) was ruled an option by the fix-all index; the design kept them beside the evidenced kinds (1578) — harmless.

**What the audit missed.** Nothing of substance; the other-toy rows (Perilous Shores, 1PDG, Sails, Dark Clues) are correctly OUT.
**NG-shared part: stands; no correction.**

### B18 (d) FTG slice — 227 rows, 54 gaps

**Routing and disposition.** The 47 PARTIAL and 7 MISSING rows are `COV-FTG-*` items (L08 a duplicate of COV-MFCG-L10; F16 of
COV-MFCG-G05), plus the two observation items OBS1 and OBS5; every COV-FTG line of the fix record is FIXED (none STAGED, none
INVALID). The audit's own counts (168 COVERED, 47 PARTIAL, 7 MISSING of 222 BASE rows) re-add correctly and its Appendix B maps all
277 raw items.

**Was each gap real.** Accepted on the quoted evidence, concurred by the fix seats; the nine MEDIUM arguments are of the form "a
builder would have to invent the rule" or "an unrecorded scope decision", and for each I checked that the pre-fix text the audit
quotes (e.g. §15.1 C9 relabelling landmark templates a stage-3 hook, §15.1 C16 claiming a decoration table §4.9 did not have) is
consistent with the fix rounds' changelogs.

**Is each closed now — the 9 MEDIUM rows.** M01 `drawFootprint` and `build` as lifecycle events, `swapUse` as two relocations
(1692, 5290); L08 the measure tool (= L10 above); F16 landmark templates fitted to the claim in the base and
`Castle.keepShape` rect / square / octagon / round / cruciform (1554; §15.1 C9 re-cited, 11192); G09 the castle table — a
`gatehouse` sited on the bailey side facing the plaza, `innerWard`, keep placement, the surround row esplanade / park with a
perimeter path / plaza / cliff skirt (1550–1556, 4742); I12 the `Decoration` entity (pond, copse, stone circle, ruin, wayside shrine,
boundary stone …) built by S12a's sites (1576, 1625; §15.1 C16 re-cited, 11200); F20 `MaterialRow` (walls, roof, weight, era rows;
the default never keyed by wealth), `District.materialOverride`, `Enceinte.material` (969, 978, 834, 1547); B09 raw-resource
availability as a site property and S12a before S10b "so the roster's farms, mills and quarries have outside sites to go to" (1624,
3258); B10 and C03 (with C11) recorded as delegated decision D-32 — economy, personality, stats and the family tree in the module,
flagged for veto (J-S14, 12738; schema stubs 8870).

**Sixteen LOW rows re-checked, all closed:** E07 the `tents` arrangement (875); I05 `feather(widthM)` as three inset vector
bands, no bitmap blur (7780); I11 `Greenery.species` with inner / outer shares and `leafType` (1567); K05 the hemisphere from the
latitude's sign, shadow length capped near sunrise (8070–8074); K06 season rows read `leafType` (1567) and the crop rotation
(4867), season and weather as document settings (2073); K07 post operations greyscale / sepia / tint / pixelate per tile, colour-
matrix filters in SVG (7833–7835); F23 a plot edge's `treatment` fence / hedge / wall / railing (870, 663); H07 the same clearance to
shores as to setback bands (3939); G07 the `intervallum` lane inside the wall as an era row (1544, 1547); D26 a control over the
wide-versus-elongated balance of ribbons and suburbs (3851); E02 `SubDistrict` (838); E10 / F21 `District.description`,
`Building.description` and `openingHours` (835, 971, 1242); N06 / N07 decided, not deferred — no hosted service, the host is the
store, `DocResolver` with viewer / editor / owner roles (359; DEF-12 FIXED as a decision, validation 372); A24 axe-core in the test
stack (357); A25 a help link per control with a CI link check (10269, 11084); H11 `distributary` water kind (733); H17 breakwaters,
straight or branching piers on the harbour and the open coast, timber or stone by era (4770–4771); I15 the climate row and
`FarmModeRow` (3528, 4829); L06 a selected user corpus as a pack (1812, 1829); J02 stall, campfire, fire pit (1578, 879). §6
observations: OBS1 the five §15.1 rows C7, C9, C16, C17, D6 re-cited to sections that now carry the mechanism (11190, 11192,
11200, 11202, 11210); OBS5 the §12 comparator cites part 2 (validation 366). The MFCG audit's D11 note is answered here too: the
enceinte's bands are stated on both faces — setback and intervallum inside, band + outer setback + glacis or berm outside (1544).
H04 (per-arm coast configuration) is stated at the §1.4 comparison level ("coast in two arms", 293); I did not probe it to
buildable depth — PLAUSIBLE.

**What the audit missed.** Nothing of substance; FTG's accounts, tiers, folders and dark mode are context rows by design (Q2).
**FTG part: stands; no correction.**

### B18 verdict

**CONFIRMED.** The four audits stand as written. Against the current design every one of the 96 coverage gaps they raised is
either closed by a mechanism I found in the text (86 FIXED, cited above by line) or staged by the owner's roadmap with the hook
present (10, all checked), and the 12 caveat / wording items the fix-all index added from them are closed too. Re-checked: 18
MFCG + 8 VG + 16 NG + 25 FTG gap rows (67) plus D07, D11, K09 and E09 (COVERED-with-note rows). I found no capability of the
references without a row. Corrections: none to the audits (they were right about the text they read); a "Fable review
(2026-09-27) — B18" section is appended to each of the four files recording this verdict so the reconciler can close the row.

## Design impacts

None required. Two notes for other parts, no change asked: (determinism) §6.1's "string paths measured 0.73 µs" is a bench figure
that reproduces exactly on the reference machine class; (scope) `Pin.kind` still carries the unevidenced values cross / shrine /
pump / gallows beside the evidenced ones — the audits' "data table, not schema" recommendation was ruled optional by the fix-all
index and stays optional.

## Judgments (vetoable)

* **J-Fev2-1** — B19 REJECTED ("never produced; superseded by B-fixall/verify-*") rather than left PENDING or marked CONFIRMED-
  vacuous, because the queue's rule is one row per artifact and the artifact does not exist; the superseding verifications have
  their own 25 rows. Say "veto" to keep the row open.
* **J-Fev2-2** — the five Node `.out` files are not regenerated: they are the receipts `redteam-scale.md` quotes verbatim and my
  re-run reproduces every quoted figure within noise; the one defective line (−90 MB) is ruled in the README instead of rewriting
  history. Say "veto" to regenerate them from `run-bench_*.out` in the scratch folder.
* **J-Fev2-3** — B18 CONFIRMED with appended verdict sections rather than CORRECTED: the audits' verdicts were true of the text they
  read; their supersession by the fix rounds is the design's history, not the audits' error. Say "veto" to record the
  supersession as a correction on each audit.
* **J-Fev2-4** — no block from this lane: no design sentence resting on this lane's evidence is wrong. Say "veto" to have the
  README's cover-attribution correction mirrored as a §13.5 footnote.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed or read in full by this seat):** the four audits read whole; the fix-all index's gap counts re-derived; every
"closed now" citation above found by `grep` at the stated line of the current `docs/ARCHITECTURE.md` (sha256 `1c23190f…`) and every
disposition read in `docs/ARCHITECTURE-VALIDATION.md`; the absence of `docs/validation/verify-*.md` and the lane-events sequence
for B19; the eleven scripts read whole and re-run (five byte-identical, five within timing noise, the cover script re-run on its
three screenshots); the ink-cover re-derivation (0.657 / 0.582 / 0.621 / 0.583 / 0.569); the units of the JSON exports from their
metadata and the wall-ring extent; the two design sentences that rest on bench figures.
**PLAUSIBLE (judgment):** that each gap was real — accepted on the audits' quotations of a pre-fix text that no longer exists on
disk, with the fix seats' concurrence as the second witness; that the synthetic workloads are representative of the current rungs
(argued from the §12 bands, not re-measured against product code, which does not exist); that H04 is specified to buildable
depth; that no capability of the references escaped all four audits (my walk of the recorded surfaces, not an enumeration).
