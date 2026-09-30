# Red team — IMPROVEMENT CLAIMS AND SCOPE lens against `docs/ARCHITECTURE.md`
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat redteam:improve (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `validation/redteam-improve` · 2026-09-25 · seat: red-team validator (Fable role; opus stand-in), clean-room (no
captured JavaScript bundle opened; no reference source code opened; the only reference code seen is what the findings
files themselves quote, sampled to measure it for IMP-1).

**Status: COMPLETE — 16 findings (1 blocker, 8 major, 7 minor).** §2 is the parseable table (one row per finding, the `RT_SCHEMA` fields); §3 gives each failure scenario, its evidence and the required change; §4 is the ledger that answers the lens for every claimed improvement; §5 audits every named dependency and the standalone rule; §6 lists what to keep; §7 groups the findings, gives the re-cut milestone plan and the overlaps; §8 separates CONFIRMED from PLAUSIBLE.

## §0 Reading record

| file | size | read |
|---|---|---|
| `workflows/lane-prompts/03/redteam_improve.prompt.txt` | 23 KB | in full (the brief) |
| `research/findings/_critic.md` | 42 KB, 479 lines | in full (standing ruling) |
| `docs/ARCHITECTURE.md` | 245 KB, 2 200 lines | in full, every line (one-page summary, §0–§17, PART II, PART III, D-1–D-25, J-1–J-18, deferrals, Appendix A) |
| `docs/IMPROVEMENTS.md` | 193 KB, 1 939 lines | in full, every line (§0–§3 with O1–O19, S1–S6, V1–V3; §4 R1–R16; §5 split; §6 traceability; §7; Appendix A) — the rubric every claimed improvement is held to |
| `docs/design/judge-improvement.md` | 70 KB, 285 lines | in full |
| `docs/design/judging.md` | 29 KB, 226 lines | in full (graft list, every flaw and its answer) |
| `docs/design/judge-engineering.md` | 43 KB | the build-plan, complexity, licence and effort passages (§1 rubric rows, the K / P / R build-plan and licence rows, §3 items 1–6, §6), located by grep |
| `docs/CONFIDENCE.md` | 103 KB | §1 (verdict and per-reference effort table), the §3.4 FTG effort row and its corrections, §5 and §6 in full; the rest by outline |
| `docs/ARCHITECTURE-VALIDATION.md`, `docs/AMENDMENTS-2026-09-25.md`, `docs/OWNER-INSTRUCTIONS-2026-09-25.md`, `docs/DEFINITION.md`, `docs/PLAN.md` | 4–9 KB each | in full |
| `docs/validation/redteam-geometry.md`, `redteam-mfcg.md`, `redteam-lifecycle.md` (landed before this lane) | 134 / 59 / 119 KB | reading record, lens, method and the full §2 findings tables; MFP-5 and each file's §5 overlap section in full; other §3 details by id where cited |
| `docs/validation/redteam-ftg.md`, `redteam-scale.md` (landed during this lane, 17:04 and 17:06) | 99 / 100 KB | the full §2 findings tables; used only to cite overlaps instead of repeating them |
| `docs/validation/coverage-audit-{mfcg,ftg,vg,ng-shared}.md` | — | the scope-creep sections only |
| `docs/improvements/ftg.md` | 168 KB | GEO-2 and VAR-3 evidence passages (lines 290–300, 544–552: "look similar" is a V1 complaint) |
| `captures/mfcg/exports-sweep-2026-09-25/README.md` (landed 17:16) | 199 lines | lines 1–40 (rung mapping TOWN = size 40, CITY = 80, METROPOLIS = 130; metres) |
| findings, grep-located and counted | — | code-fence and hex-colour counts over all 28 findings files; `os-model.md` code blocks sampled (lines 30–353); `profile-mfcg.md` §9.1 header; `profile-neighbourhood.md` lines 449–478; font lines in `visual-spec.md` and `profile-mfcg.md` |
| capture metadata (no body opened) | — | `captures/mfcg/2026-09-21T05-06-58/meta.json` host block; file-type census of `captures/**/network/bodies/`; key census of `research/ftg-capture/presets.json` (keys and counts only, no values printed); the `size` of both FTG create-requests |
| raw sources | — | two creator quotes checked at source: MFCG devlog 85275 line 42; `research/patreon/ftg/120828892/post.md` line 175 |
| public npm registry (read-only metadata) | — | the `license` field of 31 named or candidate packages and the runtime dependency closure of the 14 runtime packages (126 packages), fetched 2026-09-25 |
| scratchpad executions (this seat) | — | `ks_faithfulness.py` / `.out` (IMP-7), `npm-licences.txt`, `closure.py` / `closure.txt` (§5) — our own code |

**Not read:** the findings files cover to cover (only the passages above, by ruling and by lens), the design
proposals (relayed through the three judges and `judging.md`), `docs/confidence/*.md`, any captured JavaScript
bundle, any file under `reference/`. Reading total ≈ 215 k tokens, under the 350 k switch point. Every reference fact
below comes from a passage in this table or from a critic, judge or red-team file that read it in full.

## §1 Lens, method, severity rule

**Lens (from the brief).** IMPROVEMENT CLAIMS AND SCOPE: for every claimed improvement, is it **real** (it answers an
evidenced reference weakness and its mechanism can deliver it), **measurable** (its acceptance criterion can pass or
fail and measures the gain, not merely that our own rule was applied) and **affordable** (it fits the effort plan and
the budgets)? Which claims are wishful? Where does the design exceed what a small team can ship, and what should be
cut or staged? Is the clean-room and licence posture of every named third-party dependency sound, and does nothing
depend on a project outside this folder?

**Method.** Each claim was traced to its ARCH section, to the weakness it cites (through IMPROVEMENTS' source-verified
citations) and to its acceptance letters in §15.2. Every letter was classified: **C** (conformance — true by
construction once the rule is implemented), **P** (reference parity — compared with a recorded reference number) or
**O** (outcome — can show that the result is better than the references for a user or for realism). Effort was
checked against the basis D-20 names (`docs/CONFIDENCE.md` §1). Licences were read from the public registry and
compared with §17. §4 is the ledger that answers the lens for every claimed improvement; §2–§3 are the failures.

**Severity.** *blocker* — the design, as written, cannot meet a goal it states or a binding owner ruling, and no
section repairs it; *major* — a claimed improvement is unreal, unmeasurable or unaffordable as written, or a scope or
effort statement is wrong enough to change the plan, and a design change is needed; *minor* — local, cheap to fix.

**Evidence classes.** ARCH and IMPROVEMENTS text is CONFIRMED as what the documents say (both read in full).
Counts, registry licences and simulations were executed in this seat and are CONFIRMED as executed (a simulation is
CONFIRMED under its stated assumptions). Effort figures, savings and consequences for a real build are PLAUSIBLE.

## §2 Findings table (machine-parseable; one row per finding)

Columns match the workflow's `RT_SCHEMA` (`id`, `severity`, `claim`, `evidence`, `required_change`), in the layout of
`docs/validation/redteam-geometry.md`. Each row stands alone; §3 carries the full failure scenario per id.

| id | severity | claim | evidence | required change |
|---|---|---|---|---|
| IMP-1 | blocker | The clean-room chain hands implementers GPL-3 source and the references' creative data and polices only file paths: §17 names "the findings" as implementers' only inputs, but those files quote ≈ 190 Haxe statement lines of TownGeneratorOS (e.g. the 2017 spiral seeding loop verbatim), reproduce MFCG's and NG's naming grammars and NG's six palettes verbatim and carry ≈ 890 reference colour values; the CI rule greps only for imports of `reference/` and `captures/**/network/bodies/*.js`, leaving the 920 captured JSON bodies and FTG's full tables in `research/ftg-capture/presets.json` (209 building types, 80-node dependency graph, 299 professions, 323 items) open; and `@plat/testkit`'s B-REF capture readers make the product's own CI read the captures tree, which holds 299 proprietary bundles. The owner's clean-room ruling and D-22 (no dependency may constrain the owner's licence choice) cannot be guaranteed. | ARCH §17 (inputs sentence; CI path rule; "No reference data"), §13.5 ("reads the capture records already on disk"), §14 `@plat/testkit`, D-22; owner CLEAN-ROOM ruling (brief). Executed: `os-model.md` 284 lines in code fences / 91 Haxe-like statements, `os-wards-render.md` 143 / 71, `os-geometry.md` 32 / 27; `profile-mfcg.md` §9.1 "the complete naming grammar, verbatim" (4 401 B); `profile-neighbourhood.md` l. 449 (grammar, 3 827 B, verbatim) and §4.1 (palette schema verbatim); hex tokens: visual-spec 202, profile-village 198, profile-mfcg 151, profile-neighbourhood 130; captures: 299 .js, 920 .json, 713 .bin bodies; presets.json key census. The sweep README itself: reference measurements "not to be copied into any product". | (a) Implementers' inputs = ARCH + a sanitised implementer digest (behaviours, measured numbers, stated ideas; no code excerpts, no reference wordlists, palettes or tables) written and checked by a separate seat; findings, captures, `reference/` and `research/` become research-only. (b) Put the `@plat` repository outside `research/`, `captures/` and `reference/`; replace capture readers with a numbers-only `baselines.json` of our own measurements with provenance, generated research-side and committed; the parity CLI reads only that file. (c) Add a content deny-list check in CI generated from the findings' recorded creative data (grammar rules and tokens, palette hex values, FTG building / profession / item identifiers, Markov samples, texture hashes) over `@plat/tables`, assets and source. (d) Label reference-derived numeric constants (0.75 compactness gate, 40 m bridge spacing, 39 m towers, NG's width law) with their reference origin instead of "our own value". (e) Record (a)–(d) in §17 and as a delegated decision; `CLEAN-ROOM.md` names which seat read which file. |
| IMP-2 | major | D-20's effort (≈ 100–130 pw for base + stage 2) rests on MFCG 46 + FTG's *map subset* 52, but the base also contains FTG's non-map scope (roster and dependency loop, institutions, households, lazily derived people, siting, Foundry / dd2vtt exports and the postMessage bridge, and the `@plat/sim` module), which CONFIDENCE prices inside FTG's 125 pw full product — its content line alone is 25 pw because every table must be authored originally under clean-room. Content authoring and the reference app's UI appear in no milestone's content list, and the module and the test rig share their milestones' ranges with other work. A line-by-line re-derivation lands at ≈ 141–192 pw (PLAUSIBLE), ≈ 121–158 after IMP-3's cuts. | ARCH D-20, §16 effort paragraph and milestone table (M1 22–28, M2 26–32, M3 20–26, M4 10–14, M5 14–18), §10.1–10.3, §11, §14 `@plat/app`; CONFIDENCE §1 (FTG 125 (105–145) full, 52 (44–62) map subset; MFCG 46 (36–62)) and §3.4 effort row (content re-priced 15 → 25 pw); judge-engineering §3 item 4 and the K build-plan row (M1 "≈ 2× optimistic"); FTG-9 (the module's data model is not in the base). | Re-derive D-20 in the document as a table: floors after sharing, then one line each for O1, the document and edit system, O12's backends, O11's exporters, O17–O19, O10, original content, the app UI, the verification rig, `@plat/sim` and stage 2, each with a range and basis; show the sum; either state the larger total as an owner-visible decision or apply IMP-3's cuts until the stated range holds; add content authoring and the app UI as named work items in the milestones that need them. |
| IMP-3 | major | The build plan contradicts D-7 and D-1 and overloads M3: M2 ships "the lit preset and the WebGL2 tier" while every editing capability waits for M3, although D-7 ranks editability first and says the weighting "decides ties in the build plan"; D-1 calls the lit look "a style file, not an architecture" (reversal cost low) while §8.2 implements it on WebGL2 with a Canvas2D approximation and §8.5 tests the two against each other — the duplicate-render-path cost both creators named; M3 (20–26 pw) holds the edit system, migration, the DAG audit, B-EDIT, the API and bridge, seven export targets, thumbnails, the intent expansion, ten forms and three "full" should-haves (≈ 31–40 pw itemised, PLAUSIBLE); M4 (10–14 pw) adds `@plat/sim` to hardening, goldens, provenance, performance tiers and the incremental path. When M3 overruns, the owner's first-weighted item slips. | ARCH D-1, D-7, §8.2 (`texture + light` "WebGL2 with a Canvas2D tonal-split approximation"), §8.5 (pixel-difference test), §16 rows M2–M4, §10.1; creator statements checked at source: MFCG devlog 85275 (SVG means drawing "implemented two times"), FTG 120828892 (a Foundry renderer would "double all future front-end work"); FTG-9; LC-14 (version retention has no mechanism). | Re-cut the base release: (1) the editing core (document and log, locks and pins, scoped faithful regeneration, the four actions, undo, dry run) directly after M1, before the second preset; (2) `lit` on Canvas2D only (tinted texture tiles plus directional shading from stored heights), WebGL2 only on a measured METROPOLIS need; (3) `@plat/sim` out of the base release into its own post-base milestone with its own estimate, after FTG-9's relation store; (4) base exports `.plat`, JSON schema, layered SVG, PNG and tiles, GeoJSON — VTT (Foundry, dd2vtt), glTF / OBJ, the CBOR twin and the bridge post-base; (5) three forms in the base (`organic`, `bastide-grid`, `linear-street` after FTG-5's fix), seven with the corpus; (6) O13 / O14 / O16 "full" and O12 extras post-base; (7) snapshot-first persistence with an explicit upgrade instead of keeping the last N versions replayable. Restate §16 with these moves (§7 gives a table). |
| IMP-4 | major | Most acceptance numbers for the owner's first-weighted improvements (realism, plot texture, editability — D-7) are conformance checks that hold by construction and would pass while the town reads worse than MFCG or FTG: Spearman(prosperity, plot area) ≥ 0.8 (plot bands are a function of prosperity), green-share Spearman ≥ 0.7, coverage within table, Moran's I > 0 (a σ ≈ 60 m smoothed field), shadow ∝ height, castle ≥ p80 (it is the best-scored site), through-roads at destinations (arterials are routed between destinations), containment and access 100 %, discard ≤ 0.05, farmland per capita, and M1's "complete SeamContract" while the field is flat. The only outcome check is D-5's owner's eye, which has no protocol. | ARCH §15.2 rows O4 (a), O5 (a) / (d), O8 (d), O11 (b), O14 (a), O17 (a) / (b) / (g), O18 (a)–(c), O19 (a); the mechanisms in §4.2 S3, §4.3, §4.5, §4.7, §4.9, §8.4; II.5 and §16 M1 ("O18 with a flat field"); D-5, D-7; the owner's IMPROVE rule ("how the gain would be measured"); MFP-1 (city-zoom legibility can fail while these numbers pass). | Tag every letter in §15.2 C, P or O and never cite C letters as evidence of improvement; give each first-weighted improvement at least one P or O criterion that its own rule cannot satisfy: plot texture — figure-ground and streetwall statistics against MFCG's size-sweep exports and FTG's payloads at matched rungs, with the intended direction of difference declared; editability — IMP-16's scripted scenarios; legibility, charm and "better than the references" — a written D-5 protocol (seeds fixed before rendering, matched rungs, blind randomised order, a short rubric, a pass rule, results filed under `docs/validation/`) run at M1 and M2; realism — declared unproven until the corpus phase. |
| IMP-5 | major | "Zero whole-map restarts" (D-9, O1 (a), O3 (b)) is true by construction because the pipeline has no restart path, so it measures nothing; the quantities that would show the gain over MFCG — requested-feature delivery and time on MFCG's worst configurations — are not measured, and O1 (a)'s "requested features 100 %" contradicts §5.3's "present or reported" and the tier-6 "documented omission" that F-RIVER, F-WALL, F-CASTLE and F-SITING end in. D-9 rejects a bounded restart tier because it "would hide feasibility bugs"; tier 6 hides the same failures behind a report line and nothing counts it. | ARCH §5.1 item 1 and the tier table, §5.2 last rungs, §5.3, §15.2 O1 (a) and O3 (b), D-9, §13.5 last row; IMPROVEMENTS O1 answers (MFCG size 80 + river + coast: 10 attempts for 3 cities, 3.7–4.0 s; 24 restarts in 58 attempts). | Replace the number with (i) per-requested-feature delivery by ladder tier on B-CITY — tier ≤ 3 delivered, tiers 4–5 degraded (rate reported, band set), tier 6 on a feature the request names counted as a failure with target 0, and §5.3's "present or reported" split accordingly; (ii) wall-clock p95 on an MFCG-worst configuration set (METROPOLIS-matched size with river, coast, walls and castle) against MFCG's 3.7–4.0 s, ladder costs included. Keep "no restart path" as a design property, not an acceptance number. |
| IMP-6 | major | M2's exit ("every must-have's acceptance criteria", "O17 / O18 / O19 runs …") depends on must-have thresholds that J-T declares placeholders no acceptance run may treat as passed, and that nothing in the plan can set: the references lack these properties, M-1 measures only reference behaviour, and the corpus phase the deferral names is owner-gated and comes after the whole standalone program — O18 (i) gradient threshold and (j) CV floor, O19 (d) canopy threshold and (g) legibility check, O12 (a) legibility floors, O14 (c) edge-straightness threshold and (e) built / map-area band. Either M2 never exits or the placeholders are promoted silently. | ARCH §16 M2 exit, §13.5 ("placeholders until the validation lanes and the corpus phase fix them"), the deferrals list, §15.2 O12, O14, O18, O19; IMPROVEMENTS J-T; the roadmap order in `docs/PLAN.md` and `docs/OWNER-INSTRUCTIONS-2026-09-25.md` (corpus after base, neighbourhoods, buildings and village). | Add a delegated decision listing every threshold with no reference source and, for each, either a provisional number set through the D-5 protocol at M1 (vetoable; provenance "owner-eye M1"; re-signed by the corpus later as a declared shift) or reclassification as a reported statistic that does not gate a milestone until the corpus phase; keep J-T for every threshold a reference measurement can set. |
| IMP-7 | major | The faithfulness criterion O9 (c) — two-sample KS on density, frontage width and footprint area, p > 0.05 on ≥ 95 % of regenerations, an M3 exit gate — fails a perfect regenerator: executed, independent samples of 100 / 500 plots pass per regeneration at 0.946 / 0.950 and a 400-regeneration campaign meets "≥ 95 %" in 40 % / 60 % of campaigns; with plots clustered in blocks, as the design builds them, the pass rate is 0.58–0.84 and no campaign passes. | ARCH §7.3 (O9 (c)), §15.2 O9 (c), §16 M3 exit ("KS faithfulness"), §4.6 step 6 (`a` drawn once per district), §4.7 S10 (4) (depth from the block's thickness; widths drawn per frontage); scratchpad `ks_faithfulness.out` (7 cases, 25–60 campaigns each). | Compare each regenerated scope's statistics (median plot area, frontage width, density, attached share) with their distribution over K ≥ 50 independent from-scratch generations of the same scope (same context, different attempt streams); pass when inside the central 95 % band; judge a campaign by a binomial test on the pass rate (fail only if it is below 0.95 at p < 0.01); state that "Regenerate (keep settings)" is checked by byte identity, not statistics. |
| IMP-8 | major | S10 keys both the courtyard rule and the rear-lane rule on the same condition (block deeper than twice the plot depth) with no stated order, and the granularity table's poor and modest rows call for lanes wherever that holds; dense and poor quarters therefore lose the hollow courtyard block that MFCG and NG get right (IMPROVEMENTS R3 and the O18 / O5 / O17 restraint clauses: "courtyards stay courtyards … not every interior needs a lane"), trading a keep property for the owner's alleys without saying so, and adding negative space at city zoom. | ARCH §4.7 S10 steps (4), (6), (8) and the granularity table's alley-policy column; §4.4 regime table (core block band 30–45 m against poor plot depths 12–20 m); IMPROVEMENTS §4 R3, O18, O5 and O17 restraint clauses; MFP-1. | Make the treatment of a deep block interior an explicit rule-table choice per band — court, back lane, through-alley or rear plots — with target shares, calibrated on NG's hollow-block frequency (vertex captures) and MFCG's inner-lot removal (size-sweep exports); state S10's evaluation order; add a keep-test "court share of deep blocks within band per class" to §13.5 beside O18 (d). |
| IMP-9 | major | Must-have letters promise configurations with no mechanism: O1 (c) "10/10" includes a delta, but S1 has tributaries, branch-and-rejoin islands and an estuary width rule and states that `deltaRiver` is not a delta — no distributaries; O8 (f) "4/4" includes two independent enceintes, but S3 sites one centre, S5 grows nested boundaries around it and S7 traces from one boundary — no polycentric town (MFCG's "multi-cluster cities" gap stays unanswered); the forms catalogue loses `linear-street` (FTG-5) and `island-city` (FTG-19), so O10 (g)'s "≥ 8 forms" has eight candidates, two impaired. | ARCH §4.2 S1 (3)–(4), S3, §4.4 stage boundary, §4.8 trace, §7.7 forms, §15.2 O1 (c), O8 (f), O10 (g); IMPROVEMENTS O1 (c), O8 (f), O10 answers (MFCG VAR-2, City Painter list, 39697187); `_critic.md` C15 (a patron still asking for a delta); FTG-5, FTG-19. | For each promised configuration either specify its mechanism (distributaries: a branch that does not rejoin, splitting near the outfall at low slope, with a width rule; polycentric growth: S3 sites k nuclei, each with its own stage boundaries and enceinte, S5 merges the fabrics between them) or strike it from O1 (c), O8 (f) and the forms list with the reason, and restate the counts. |
| IMP-10 | minor | §15.2 claims to adopt IMPROVEMENTS' letters but silently drops clauses that measured named reference weaknesses: O7 (a) "every person a home and a work" and (d) "no occupation above its per-capita maximum" (FTG's "20 adventurers" complaint); O12 (b) low-end 30 fps, "roof computations per frame after warm-up = 0" and draw-call / upload budgets (FTG PERF-2, NG's 528 uploads); O13 (a) curvature limit and "0 labels crossing holes"; O1 (b) outfall, non-decreasing width and a flow path for every cell; O14 (b) farmstead distance and land-use overlaps. | IMPROVEMENTS O1 (b), O7 (a) / (d), O12 (b), O13 (a), O14 (b) against ARCH §15.2 rows (both read in full). | Restore each clause verbatim or record why it was dropped (e.g. O7 (a)'s "work" needs the module's matching — make it a module criterion). |
| IMP-11 | minor | Human-subject criteria have no subjects: O16 (c) "≥ 90 % of testers" and S2's blind preference test with n ≥ 20 raters presuppose a tester pool, but the program has one human, the owner; D-5 makes the owner's eye the acceptance for "mastered" without a protocol. | ARCH §15.2 O16 full (c), S2 row (by reference to IMPROVEMENTS §3.2), D-5; IMPROVEMENTS O16 (c), S2; owner profile in `docs/OWNER-INSTRUCTIONS-2026-09-25.md` ("I know nothing about coding"; all judgment delegated). | Replace tester counts with scripted task checks (actions and time per task, measured by the browser harness); move preference testing into the written D-5 protocol (IMP-4) with the owner as the declared rater. |
| IMP-12 | minor | Between-seed variety — FTG's creator-stated "most settlements look similar" (V1) and MFCG's narrow repertoire — has no base metric; O10 (g)'s classifier arrives with the forms at M3, while the constraint-driven stages (best-scored centre, least-cost arterials, isotropic stage boundaries per FTG-5, greedy typing) pull seeds toward one optimum. | ARCH §4.2 S3, §4.3, §4.4, §4.5, §7.7 (signature vector), §15.2 O10 (g); IMPROVEMENTS O4 and O10 answers; `docs/improvements/ftg.md` GEO-2 / VAR-3; FTG-5. | Add at M1 a dispersion metric of §7.7's signature vector (radial share, orthogonality, street-density profile, block-area CV, enclosed share, outline anisotropy) over 100 seeds per rung and water setting, with the MFCG size-sweep and FTG payload dispersions as the floor. |
| IMP-13 | minor | The fusion gate (M0 (c)) runs S4 + S5 + S8 on a flat synthetic site, so passing it does not retire the fusion risk for what the base ships: M1 adds terrain costs, water barriers, bridges, reservations before growth and the trace before growth, each of which changes S5's work and the infill's faces, and the fallback is defined only "before M1". | ARCH §16 M0 (c), §4.4 fusion gate, D-16; MFP-2, MFP-3, GEO-18 (reordering), SCL-3 (stage costs). | Repeat the gate as an M1 exit criterion on B-CITY-lite's river, coast and relief configurations with the reordered stages, and state the fallback for a failure found there. |
| IMP-14 | minor | The licence table has one wrong entry and no rules for scope, notices or versions: Boost.Geometry has no GPL parts (it is BSL-1.0); the fdlibm port is unnamed and the obvious candidate brings a 94-package runtime closure with Node-only modules; an allowlist checker over all dependencies fails on dev-only MPL-2.0 `@resvg/resvg-js` and Playwright's browser builds; no notice file is generated although MIT, ISC, BSD, Apache-2.0, BSL-1.0, OFL and the fdlibm notice require notices that minifiers strip; `clipper2-ts`'s latest release is a prerelease. | ARCH §17 table and allowlist, D-14, D-23; registry (CONFIRMED 2026-09-25): every named package's licence matches §17; runtime closure Apache-2.0 94 (all from `@stdlib`), MIT 14, ISC 9, BSL-1.0 2, Unlicense 1; `@resvg/resvg-js` 2.6.2 MPL-2.0; `clipper2-ts` 2.0.1-18. | Correct the Boost entry; name the fdlibm source (or vendor the six functions with the Sun notice); run the checker over the transitive production closure with dev-only exceptions listed; generate a third-party notices file in CI; pin adopted versions. |
| IMP-15 | minor | The clean-room rule is applied too loosely to style tests and too strictly to fonts: the `hatched` census requires roof dark / light ratios within ± 0.02 of NG's measured values and water band ratios "to 1e-4", numbers derived from NG's and VG's palettes that §17 forbids reusing; meanwhile the default serif avoids IM FELL Great Primer "for clean-room distance", although that OFL face is neither watabou's code nor his creative data, and it is the face of every MFCG map label — the D-1 look loses its typographic signature for no clean-room gain. | ARCH §8.2 (`ink` row; `roof` law), §8.3 census, §13.5 draw-style row (NG ratios 0.787 / 0.802 / 0.834), §17 fonts sentence, D-1; `visual-spec.md` (IM FELL Great Primer for everything on the MFCG map), `profile-mfcg.md` (district labels at 27 px IM FELL). | Test the laws with our own palettes (dark = lit × lerp(ambience, shadow, α) within ± 0.02 for our colours; bands follow W·(i/N)^1.5 for our N and W) and keep the reference ratios as descriptive benchmarks; choose the default face by the D-1 look (IM FELL is admissible) and record fonts as third-party OFL assets outside the clean-room rule. |
| IMP-16 | minor | "The twelve MFCG edit asks are expressible 12/12" counts vocabulary, not working edits: §7.4 maps four asks and ends with "…"; "drag points in the sea" moves the L0 coast that S1 couples to the heightfield, so it breaks coast–contour agreement unless S1 re-runs, and "add a district" needs an L1 split with no local operator (LC-7). The criterion passes because an event exists for each ask. | ARCH §7.4 (last paragraph), §15.2 O9 (f), §4.2 S1 (2); IMPROVEMENTS O9 (f) (the twelve asks); LC-7; GEO-14. | List all twelve mappings; turn each into a scripted B-EDIT scenario with its locality (share of out-of-scope entities byte-identical) and invariant results reported; mark which asks need an S1, S4 or S6 re-run and what that costs. |

## §3 Findings in detail (failure scenario → evidence → required change)

### IMP-1 · blocker · The clean-room chain hands implementers GPL source and the references' creative data, and polices only file paths

**Failure scenario.** At M0 an implementer seat is asked to fill `@plat/tables` with naming data and the `ink`
palette. §17 tells it: "the findings, the critics, `docs/CONFIDENCE.md`, `docs/IMPROVEMENTS.md` and this document are
the only inputs". Among those inputs, `profile-mfcg.md` §9.1 is headed "the complete naming grammar, verbatim"
(4 401 bytes of MFCG's `grammar.json`), `profile-neighbourhood.md` reproduces NG's grammar ("captured verbatim",
3 827 bytes) and, in §4.1, all six NG palette files as a table, and `visual-spec.md` alone carries 202 hex colour
values. Nothing in CI compares content: the one rule greps imports for `reference/` and
`captures/**/network/bodies/*.js`. MFCG's rules and palette values reach `@plat/tables` and pass. A kernel seat that
opens `os-model.md` for S1 context meets TownGeneratorOS source quoted as code — the 2017 spiral seeding loop is
reproduced line for line (l. 141–146), and the file holds 91 Haxe-like statement lines inside code fences
(`os-wards-render.md` 71, `os-geometry.md` 27): GPL-3 expression inside the clean room that the owner's ruling
("never copy or port code") and §17 ("no code from TownGeneratorOS … is read for implementation") exclude. The
seat that writes the B-REF parity CLI follows §13.5 ("reads the capture records already on disk") and §14
(`@plat/testkit … capture readers for B-REF`): the product's CI now depends on `captures/`, which holds 299
proprietary JavaScript bundles, 920 JSON bodies (grammars, palettes, FTG's served data) and 713 binary bodies, and
it may reach `research/ftg-capture/presets.json`, which is FTG's whole content database — 209 building types, the
80-node dependency graph, 299 professions, 323 items, 21 services, 11 sizes (key census executed; no value printed).
If the owner later opens the code (D-22 keeps that choice open), the repository carries third-party data; if a GPL
excerpt was ported, the code may be a derivative work and the licence choice D-22 protects is gone.

**Evidence.** ARCH §17 (the inputs sentence, the CI path rule, "No reference data"), §13.5, §14, D-22; the owner's
CLEAN-ROOM ruling in the brief ("never copy or port code … their values/wordlists are not reused"). Executed in this
seat: code-fence and statement counts per findings file; hex-token counts (visual-spec 202, profile-village 198,
profile-mfcg 151, profile-neighbourhood 130, vg-posts-a 74; ≈ 890 across 15 files); capture body census (299
`.js`, 920 `.json`, 713 `.bin`, 257 `.png`, 68 `.svg`); `presets.json` keys and counts. Every captured `.js` sits
under `network/bodies/`, so the path glob itself holds — the exposure is everything the glob does not name. The newest
capture's own README says its files are reference measurements "not to be copied into any product". The findings
were written as research notes by readers allowed to see the sources; a clean room needs a sanitised specification
between those readers and the implementers, and §17 names the notes themselves as that specification.

**Required change.** (a) Implementers' inputs become ARCH plus a sanitised implementer digest — behaviours, measured
numbers and stated ideas with their citations, no code excerpts, no reference wordlists, palettes or tables — written
and checked by a separate seat; the findings, `captures/`, `reference/` and `research/` become research-only. (b)
Place the `@plat` repository outside those trees; turn B-REF into a numbers-only `baselines.json` of our own
measurements (value, unit, source capture, script, date), generated research-side and committed; the parity CLI reads
only that file. (c) Add a content deny-list check to CI, generated from the creative data the findings record (grammar
rules and tokens, palette hex values, FTG building / profession / item identifiers, Markov corpus samples, texture
hashes) and run over `@plat/tables`, assets and source. (d) Replace "every constant in `@plat/tables` is our own value"
with honest provenance: reference-derived numeric constants (the 0.75 compactness gate, the 40 m bridge spacing, the
39 m tower median, NG's width law, Poisson k = 50) are facts about behaviour and admissible as calibration anchors,
labelled with their reference origin. (e) Record (a)–(d) in §17 and as a delegated decision; `CLEAN-ROOM.md` names
which seat read which research file. Severity is blocker because the ruling is binding, the exposure is in the
design's own input list, and nothing in the document stops it; the repair is process, not structure.

### IMP-2 · major · D-20's effort basis leaves out scope the base contains

**Failure scenario.** The owner plans the program on D-20: ≈ 100–130 expert person-weeks for base plus stage 2,
"inside the engineering judge's honest range". §16 derives it from CONFIDENCE's floors — MFCG 46 pw and the FTG
*map-generation subset* 52 pw — less 25–35 % for sharing (≈ 64–74 pw), plus the base's additions. But the base also
builds FTG components that CONFIDENCE prices outside the map subset, inside FTG's 125 (105–145) pw full product: the
roster and dependency loop with institutions, households and lazily derived people (§4.2 S2, §10.2, §10.3 — base
must-haves), the siting solver (S10b), Faction and Institution entities, Foundry and dd2vtt exports with the
postMessage bridge (§11), and at M4 the `@plat/sim` module. CONFIDENCE re-priced FTG's content alone from 15 to 25 pw
because every building type, profession, item, name generator and event must be written fresh under clean-room; the
base's own content (≈ 60–100 building classes with per-capita ranges, footprints, heights, coverage and site-plan
rows; institutions; households; a naming grammar and Markov corpora "of our own authoring"; era tables; seven style
presets and a symbol set) appears in no milestone — the document names "the roster tables' authoring cost" only as a
risk. The reference app (panels, drawing and snapping tools, four field brushes, a tables editor for every rule table,
the style dialog, the advanced panel documenting ≈ 200 parameters) has no line either; `@plat/sim` and the
verification rig are listed but share their milestones' ranges with other work (M4: 10–14 pw for hardening, goldens,
provenance, performance tiers, the incremental path, the module and the docs). The engineering judge called the
kernel proposal's M1 (16–20 pw) "≈ 2× optimistic"; ARCH's M1 is 22–28 pw for more stages (S0–S11 plus the B-CITY
harness, goldens v0 and `SeamContract`).

**Evidence.** ARCH D-20, §16 (effort paragraph; the milestone table: M-1 1–2, M0 7–9, M1 22–28, M2 26–32, M3 20–26,
M4 10–14, M5 14–18 — sums to 100–129, CONFIRMED arithmetic), §10.1–10.3, §11, §14; `docs/CONFIDENCE.md` §1 table and
§3.4 effort row; `docs/design/judge-engineering.md` K build-plan row and §3 item 4; FTG-9 (the module's relation
store is not in the base schema, so the module is larger than §10 describes).

**Re-derivation (PLAUSIBLE; each line a range with its basis).**

| line | pw | basis |
|---|---|---|
| parity floors after sharing, (46 + 52) × 0.65–0.75 | 64–74 | D-20's own basis |
| O1 terrain and hydrology beyond the references' water | 4–6 | priority-flood, D8, rivers by descent, coast–terrain coupling, islands, bank classes; SCL-3's re-budgeting |
| O9 document and edit system (24 event kinds with inverses, dry run, locks, scoped regeneration, four actions, migration with diff, locality oracle, B-EDIT) | 8–12 | neither reference has it |
| O12 beyond the two floors' renderers (display list, paint-program vocabulary, tiles, SVG, WebGL2, print tiles) | 4–6 | 15 programs × 3 backends, pixel-parity tests |
| O11 beyond PNG / SVG / GeoJSON (VTT × 2 per layer, glTF / OBJ, CBOR, CSV, embed API, bridge) | 4–6 | §11 |
| O17 + O18 + O19 (plot model, site plans and packer, heights; field and granularity law with joins, splits and alleys; greenery rules) | 7–11 | new in both references |
| O10 (intent expansion over ≈ 200 parameters, ten forms, assignments, placement solver) | 4–6 | forms are tuned by eye |
| should-have "full" tiers (O13, O14, O16, O12 extras) | 4–6 | §15.2 should rows |
| original content under clean-room | 8–12 | ≈ 40–50 % of CONFIDENCE's 25 pw FTG content line, plus presets and symbols |
| `@plat/sim` (schedules, calendar, factions, events, FTG-9's relation store) | 8–15 | inside FTG's 125 − 52 = 73 pw non-map scope |
| reference app UI | 6–10 | no milestone line |
| verification rig (five benches, per-stage goldens with shift records, five-engine nightly, visual regression, option matrix, control sweeps, cost-model tests) | 6–10 | §13; SCL-18 prices its compute |
| **base subtotal** | **127–174** | |
| stage 2 (ARCH M5) | 14–18 | ARCH |
| **total** | **141–192** | against ARCH's 100–130 |

With IMP-3's moves (the module 8–15; VTT, glTF / OBJ, CBOR and the bridge ≈ 3–5; WebGL2 ≈ 2–3; seven of ten forms
≈ 2–3; the "full" tiers 4–6; version retention ≈ 1–2) the base falls to ≈ 107–140 and the total to ≈ 121–158.

**Required change.** Put the re-derivation in §16 as a table with a range and a basis per line, show the sum, and
either state the larger total as an owner-visible decision (D-20 revised) or apply IMP-3's cuts until the stated range
holds. Add content authoring and the app's UI as named work items in the milestones that need them (content at M1–M2,
UI at M1 and with the editing core).

### IMP-3 · major · The build plan contradicts D-7 and D-1 and overloads M3; re-cut the base release

**Failure scenario.** M2 (26–32 pw) delivers "the `lit` preset and the WebGL2 tier; METROPOLIS" while the whole edit
system waits for M3. D-7 ranks "realism, editability, plot texture first; speed and export next; novelty last" and
says the weighting "decides ties in the build plan"; a second preset on a second backend is a look, not editability.
D-1 states the lit look is "a style file, not an architecture" with a low reversal cost, but §8.2 implements its
`texture + light` program "on WebGL2 with a Canvas2D tonal-split approximation" and §8.5 requires a pixel-difference
test between the two backends — the duplicated drawing path both creators warned about (MFCG's creator on SVG export:
all drawing "implemented two times", devlog 85275; FTG's creator on a Foundry renderer: it would "double all future
front-end work", 120828892; both checked at source). M3's content, itemised (PLAUSIBLE):

| M3 item | pw |
|---|---|
| edit log with 24 event kinds, inverses, dry-run validation, undo / redo | 3–4 |
| locks and pins, scoped faithful regeneration, the four actions | 2–3 |
| eight warp kernels with whole-step validation (GEO-10) | 1.5–2 |
| five drawn-constraint kinds with snapping, validation and pre-stage insertion (LC-10) | 2–3 |
| assignments and the placement solver with precedence (LC-9) | 1.5–2 |
| rule-table overrides, the preference layer, a tables editor | 2 |
| migration with diff and upgrade replay | 2–3 |
| the dependency audit, the locality oracle, B-EDIT at 10⁵ | 2 |
| embedding API and postMessage bridge | 1–1.5 |
| GeoJSON with a scripted GIS load | 1 |
| VTT for Foundry and dd2vtt, one scene per layer (walls, doors, lights, regions, journal links) | 2 |
| glTF / OBJ with skeleton roofs, terrain mesh and water planes | 1.5–2 |
| CBOR twin with its decoder | 0.5 |
| S0–S4 proxy thumbnails | 0.5–1 |
| O10 intent expansion and ten forms with growth programmes and a classifier | 3–5 |
| O13 full (path labels, addresses, annotation layer and legend sheet, text templates) | 2 |
| O14 full (rings, presets, wildness control, ground cover, extent from need, feasibility check) | 1.5–2 |
| O16 full (drafts, discoverable export, responsive editor, browser matrix) | 2 |
| **total** | **31–40** (ARCH: 20–26) |

M4 (10–14 pw) then carries hardening, per-stage goldens, table provenance, performance tiers and the low-end tier, the
one incremental path, the whole `@plat/sim` module and the release documentation. The first milestone to overrun is
M3, and what slips is the owner's first-weighted item.

**Evidence.** ARCH D-1, D-7, §8.2, §8.5, §10.1 ("delivered in the base release cycle after M2"), §16 rows M2–M4;
the two creator statements (source lines in §0); FTG-9 (the module needs a persisted relation store the base does not
have); LC-14 (no mechanism for keeping the last N versions replayable in a browser library).

**Required change.** Restate §16 with seven moves:

1. The editing core — document and edit log, locks and pins, scoped faithful regeneration, the four actions, undo,
   dry-run validation — directly after M1, before the second preset (D-7).
2. `lit` on Canvas2D only (tinted texture tiles plus directional shading from the stored heights through the shadow
   pass), so D-1's "a style file" is true; WebGL2 only when a measured METROPOLIS target fails without it (SCL-7,
   SCL-17 bear on that measurement).
3. `@plat/sim` out of the base release into its own post-base milestone with its own estimate, after FTG-9's relation
   store is designed; the roster, siting and lazy people stay in the base (J-9 is unchanged — only the timing moves).
4. Base exports: `.plat`, the JSON schema, layered SVG, PNG and tiles, GeoJSON. VTT (Foundry, dd2vtt), glTF / OBJ,
   the CBOR twin and the postMessage bridge post-base (IMPROVEMENTS' largest export tally, MFCG's US×15, asks for
   standards, layers and transparency first).
5. Forms: `organic`, `bastide-grid` and `linear-street` (after FTG-5's fix) in the base; the other seven with the
   corpus phase, which can calibrate them against real towns.
6. O13 / O14 / O16 "full" and O12 extras post-base.
7. Snapshot-first persistence with an explicit, diffed upgrade replacing "the last N minor versions stay replayable".

§7 gives the resulting milestone table.

### IMP-4 · major · The first-weighted improvements are measured by conformance checks only

**Failure scenario.** At M2 an implementation applies the granularity, site-plan and greenery tables exactly as
written. Every O17 / O18 / O19 number passes — and each would pass whatever the town looks like, because each restates
its own rule:

| criterion (ARCH §15.2) | why it holds by construction |
|---|---|
| O18 (a) Spearman(prosperity, plot area) ≥ 0.8; (c) monotone detached / yard / coverage | the granularity table's bands are interpolated along the prosperity value (§4.7 S10) |
| O18 (b), O7 (c) Moran's I > 0 | the field is a Gaussian-smoothed sum of kernels (σ ≈ 60 m, §4.5) |
| O19 (a) Spearman(prosperity, private green) ≥ 0.7 | yard planting is read from the band (§4.9) |
| O17 (a) coverage within table; (g) heights on 100 %, shadow ∝ height r ≥ 0.99 | coverage is read from the table; the shadow pass projects the stored heights (§4.7 S11, §8.4) |
| O8 (d) castle site ≥ p80 among candidates | the castle is the best-scored candidate (§4.2 S3) |
| O4 (a) 100 % of through-roads at a destination | arterials are routed only between destinations (§4.3) |
| O11 (b) containment 100 %; O5 (a) access 100 %, (d) discard ≤ 0.05 | faces inherit parents; plots are cut from frontages; residue is typed, not dropped (§4.5, §4.7) |
| O14 (a) farmland per capita ± 20 % | arable per capita comes from the era table (§4.9) |
| II.5 / M1 every district carries a complete `SeamContract` | at M1 the prosperity field is flat ("O18 with a flat field") and no greenery field exists, so the samples are constants |

The same numbers pass if the town is illegible at city zoom (MFP-1), if its prosperity gradient is implausible, or if
its plots read as a modern subdivision. D-7 ranks realism, editability and plot texture first; for them the only
outcome evidence the ARCH names is D-5, "the owner's eye on side-by-sides", with no protocol — no fixed seeds, no
blinding, no rubric, no pass rule, no record.

**Evidence.** The rows and mechanisms cited; D-5, D-7; the owner's IMPROVE rule ("every improvement must name the
reference weakness it answers and how the gain would be measured"); IMPROVEMENTS §5 (criteria must be runnable —
these are, but they measure implementation fidelity, not gain); MFP-1.

**Required change.** (1) Tag every letter in §15.2 as C, P or O, and never cite a C letter as evidence that an
improvement was achieved. (2) Give each first-weighted improvement at least one P or O criterion its own rule cannot
satisfy: plot texture — figure-ground and streetwall statistics against MFCG's size-sweep exports (TOWN = size 40,
CITY = 80, METROPOLIS = 130) and FTG's payloads at matched rungs, with the intended direction of difference declared
(for example, footprint cover inside walls below MFCG's measured 0.57–0.66 because yards now exist, streetwall
continuity on dense frontages at or above MFCG's); editability — IMP-16's scripted scenarios with locality numbers;
legibility, charm and "better than the references" — a written D-5 protocol (seeds fixed before rendering, matched
rungs, randomised blind order, a three-question rubric, a pass rule, results filed under `docs/validation/`) run at M1
and M2; realism — declared unproven until the corpus phase, and said so in §15.2.

### IMP-5 · major · "Zero whole-map restarts" is true by construction and measures nothing

**Failure scenario.** A METROPOLIS request with river, coast, walls and castle meets the F-RIVER, F-WALL and F-CASTLE
ladders: the river's crossing is declared absent and the arterials go to the bank road; two requested gates become
posterns; the castle is "a keep without a bailey, reported". §5.3's hard invariant "every requested feature present or
reported" passes; O1 (a)'s "0 restarts" passes because §5.1 item 1 says the pipeline "has no restart path"; O1 (a)'s
"requested features 100 %" fails — or passes if a degraded feature counts as present, which the document never says.
The user gets a weaker town where MFCG, after its hidden restarts (size 80 + river + coast: 10 attempts for 3 cities,
3.7–4.0 s), would have delivered the requested river through the city. D-9 rejects a bounded restart tier because it
"would hide feasibility bugs"; tier 6 ("documented omission") hides the same bugs behind a report line, and no
criterion counts how often it fires.

**Evidence.** ARCH §5.1 item 1 and the tier table; §5.2 last rungs of F-RIVER, F-WALL, F-CASTLE and F-SITING; §5.3;
§15.2 O1 (a) and O3 (b); D-9; §13.5 last row ("0 whole-map restarts"); IMPROVEMENTS O1 answers (24 restarts in 58
attempts; 7 of 10 attempts failing at size 80 with river and coast).

**Required change.** Replace the number with the two quantities that compare with MFCG: (i) per-requested-feature
delivery by ladder tier on B-CITY — tier ≤ 3 counts as delivered, tiers 4–5 as degraded (rate reported, band set),
tier 6 on a feature the request names as a failure with target 0 — and split §5.3's "present or reported" the same
way; (ii) wall-clock p95 on an "MFCG-worst" configuration set (METROPOLIS-matched size with river, coast, walls and
castle) against MFCG's 3.7–4.0 s, with ladder costs inside the budget. Keep "no restart path" as a design property.

### IMP-6 · major · M2's exit needs numbers that J-T forbids passing and nothing can set before the corpus phase

**Failure scenario.** M2's exit reads "every must-have's acceptance criteria run on B-CITY … O17 / O18 / O19 runs".
J-T says numbers written as "band", "threshold" or "floor" are placeholders and "no acceptance run may treat a
placeholder as passed"; §13.5 and the deferrals name the sources that will fix them: M-1, B-REF, "the validation lanes
and the corpus phase". For thresholds on properties the references have (party-wall share, junction angles, block
areas, tower spacing) M-1 and B-REF can do it. For properties the references lack — which is exactly where the base
claims to improve — no reference measurement exists: O18 (i) the field's gradient threshold, O18 (j) the plot-area CV
floor, O19 (d) the canopy threshold, O19 (g) the city-zoom legibility check, O12 (a) the legibility floors, O14 (c) the
forest-edge straightness threshold, O14 (e) the built-area / map-area band. The corpus phase is owner-gated and, by
the roadmap, follows the standalone base, the neighbourhoods, the buildings and the village. So either M2 cannot exit,
or whoever runs M2 turns placeholders into targets — the silent promotion J-T exists to prevent.

**Evidence.** ARCH §16 M2 exit; §13.5 ("Bands are placeholders until the validation lanes and the corpus phase fix
them from B-REF"); the deferrals list ("final numeric targets … set from M-1 and B-REF by the validation lanes");
§15.2 rows O12, O14, O18, O19; IMPROVEMENTS J-T; the order of work in `docs/PLAN.md` ("Program roadmap") and
`docs/OWNER-INSTRUCTIONS-2026-09-25.md`. This re-raises a deferral: the deferral is wrong for these letters because the
sources it names cannot measure properties the references do not have.

**Required change.** A delegated decision that lists every threshold with no reference source and assigns each one of
two treatments: a provisional number chosen through the D-5 protocol at M1 (vetoable, provenance "owner-eye M1",
re-signed by the corpus later as a declared shift), or reclassification as a reported statistic that gates nothing
until the corpus phase. J-T stays in force for every threshold a reference measurement can set.

### IMP-7 · major · The faithfulness test O9 (c) fails a perfect regenerator

**Failure scenario.** At M3's exit B-EDIT regenerates scopes with "New random" and compares each with the original by
two-sample Kolmogorov–Smirnov tests on density, frontage width and footprint area, requiring p > 0.05 on ≥ 95 % of
regenerations (§7.3; §15.2 O9 (c); §16 M3 "KS faithfulness"). For an exactly faithful regenerator the p-values of
independent samples are close to uniform, so the pass fraction sits on the 95 % line and the criterion is a coin toss;
and the design's plot areas are not independent — depth is "min(band depth, half the block's local thickness)", widths
are drawn per frontage and the lane-width constant `a` "once per district" — so two faithful samples of one district
differ by more than independent sampling allows and KS rejects far more often than 5 % of the time.

**Evidence (executed, scratchpad `ks_faithfulness.py` / `.out`; pure-Python two-sample KS with the Stephens
asymptotic p-value; plot areas log-normal, σ = 0.35; 400 regenerations per campaign).**

| samples | plots per sample | block size | block factor σ | pass rate per regeneration | campaigns meeting "≥ 95 %" |
|---|---|---|---|---|---|
| independent | 20 | — | 0 | 0.967 | 95 % |
| independent | 100 | — | 0 | 0.946 | 40 % |
| independent | 500 | — | 0 | 0.950 | 60 % |
| clustered | 100 | 18 | 0.10 | 0.835 | 0 % |
| clustered | 200 | 18 | 0.15 | 0.731 | 0 % |
| clustered | 500 | 18 | 0.15 | 0.738 | 0 % |
| clustered | 500 | 18 | 0.25 | 0.575 | 0 % |

The only case that passes reliably is the one with too few plots to detect anything. CONFIRMED as a simulation under
its stated assumptions; the block-factor magnitudes are PLAUSIBLE stand-ins for the design's block-level draws.

**Required change.** Compare each regenerated scope's statistics (median plot area, frontage width, density, attached
share) with their distribution over K ≥ 50 independent from-scratch generations of the same scope (same context,
different attempt streams); pass when the scope sits inside the central 95 % band; judge a campaign by a binomial test
on the pass rate (fail only if it is below 0.95 at p < 0.01). State that "Regenerate (keep settings)" is checked by
byte identity, not by statistics.

### IMP-8 · major · The alley rule and the courtyard rule fire on the same condition; dense quarters lose their courts

**Failure scenario.** A 36 m-deep block in a poor district of the walled core (core block band 30–45 m; poor plot
depth 12–20 m). S10 step (4) lays strips of depth min(band depth, half the local thickness) from each frontage; step
(6) types the enclosed residue `court` ("perimeter blocks with courtyards, MFCG's donut morphology"); step (8) inserts
a rear lane "where the block is deeper than 2 × the depth band", and the granularity table's alley policy is
"alleys and back lanes wherever the block is deeper than 2 × depth" for poor rows and "back lane when deeper than
2 × depth" for modest rows. Both rules key on the same quantity; the order is not stated. If step (8) wins, every deep
poor or modest block is split by a lane and its courtyard never forms; courts survive only in the prosperous and rich
rows ("courts"). The owner's alleys arrive by deleting the hollow-courtyard block that IMPROVEMENTS lists as something
the references get right and a rewrite must keep: R3 ("shared courtyards"), the O18 restraint ("perimeter-block
courtyards stay courtyards (K3) — not every interior needs a lane"), the O5 and O17 restraints ("hollow courtyards").
The extra lanes also add unstroked negative space at city zoom, where MFP-1 already finds the street network
unreadable.

**Evidence.** ARCH §4.7 S10 steps (4), (6), (8) and the granularity table; §4.4 regime table; IMPROVEMENTS §4 R3 and
the O5, O17, O18 restraint clauses; MFP-1. NG's hollow blocks come from its dropped lot leaves (≈ 42 %), and MFCG's
from `filterInner` — both measurable (NG vertex captures; MFCG size-sweep exports).

**Required change.** Make the fate of a deep block interior an explicit rule-table choice per band — court, back lane,
through-alley or rear plots — with target shares (for example the share of deep blocks that stay courts), calibrated on
NG's hollow-block frequency and MFCG's inner-lot removal; state the evaluation order in S10; add a keep-test "court
share of deep blocks within band per class" to §13.5 beside O18 (d)'s alley gradient, so the alley improvement cannot
pass by erasing courts.

### IMP-9 · major · Must-have letters promise configurations no mechanism can produce

**Failure scenario.** O1 (c), adopted in §15.2 as "10/10 configurations on 100 seeds", is IMPROVEMENTS' catalogue:
coast, estuary, confluence, river island, lake shore, **delta**, moat, island city, hill town, cliff or ravine. S1 has
tributaries, branch-and-rejoin river islands and an estuary width rule, and says outright that `deltaRiver` "is a
widened mouth, not a delta"; nothing makes a river split into channels that do not rejoin. A delta request fails on
100 seeds of 100. O8 (f), adopted as "4/4 circuit configurations", includes **two independent enceintes**; S3 sites one
centre ("the best is the centre / market"), S5 grows nested stage boundaries around it and S7 traces each enceinte from
one stage boundary, so two separate walled nuclei — a castle town beside a church town, twin towns across a river —
cannot arise. MFCG's documented repertoire gap (the City Painter list: multi-cluster cities, several walls or castles)
is answered for nested walls only. The forms catalogue inherits two more: `linear-street` is unreachable with isotropic
stage boundaries (FTG-5) and `island-city` has nowhere to send its external roads (FTG-19), so O10 (g)'s "≥ 8 forms at
≥ 90 %" has eight candidates, two of them impaired.

**Evidence.** ARCH §4.2 S1 (3)–(4), §4.2 S3, §4.4 (stage boundary), §4.8 (trace), §7.7 (forms), §15.2 O1 (c), O8 (f),
O10 (g); IMPROVEMENTS O1 (c), O8 (f), O10 answers (MFCG VAR-2, 39697187); `_critic.md` C15 (a patron still asking for
a delta option); FTG-5, FTG-19.

**Required change.** For each promised configuration, either specify its mechanism — distributaries (a branch that does
not rejoin, splitting near the outfall at low slope, with a width rule); polycentric growth (S3 sites k nuclei, each
with its own stage boundaries and enceinte, S5 merges the fabrics between them) — or strike it from O1 (c), O8 (f) and
the forms list with the reason, and restate the counts.

### Minor findings (IMP-10 – IMP-16)

#### IMP-10 · minor · §15.2 silently drops acceptance clauses that measured named weaknesses

§0.2 says the matrix takes IMPROVEMENTS' letters as the improvement judge verified them; comparing the two files (both
read in full) shows five clauses shortened without a note, each the measurement of a weakness the matrix claims to
answer:

| opportunity | clause in IMPROVEMENTS, missing from ARCH §15.2 | the weakness it measured |
|---|---|---|
| O7 (a), (d) | every person a home and a work or role (100 %); per-capita ratio error reported; no occupation above its per-capita maximum | FTG users' only content complaint (US×4: too many tanners, "20 adventurers" in a village of 100) |
| O12 (b) | ≥ 30 fps on a reference low-end laptop; roof computations per frame after warm-up = 0; draw calls and GPU uploads within budgets | FTG PERF-2 (roofs recomputed every render), NG's 528 uploads per hood |
| O13 (a) | curvature within the limit; 0 labels crossing holes | MFCG's sibling labels that "curve too wildly" and ignore holes |
| O1 (b) | every river has an outfall; width never decreases downstream; every cell has a flow path to an outfall | FTG rivers that "bend back" into the ocean; VG rivers without flow |
| O14 (b) | every farmstead within X m of its fields; land-use overlaps = 0 | VG's accidental lonely houses and overlapping fields |

*Required change:* restore each clause, or record why it was dropped (O7 (a)'s "work" needs the module's matching —
make it a module criterion rather than a silent omission).

#### IMP-11 · minor · Human-subject criteria have no subjects, and D-5 has no protocol

O16 (c) requires usability tasks completed "by ≥ 90 % of testers"; S2's context-feature acceptance includes a blind
preference test with n ≥ 20 raters; D-5 makes "the owner's eye on side-by-sides" the acceptance for "mastered". The
program has one human, the owner, who has delegated all technical judgment; nothing recruits testers or raters, so
these criteria cannot be run. *Required change:* replace tester counts with scripted task checks (actions and time per
task, measured by the browser harness); fold preference testing into the written D-5 protocol of IMP-4 with the owner
as the declared rater and a small, fixed sample (for example five seeds per rung per milestone).

#### IMP-12 · minor · Between-seed variety has no base metric

The base answers FTG's creator-stated "most of the settlements in FTG look similar" (a V1 complaint; V2 added presets)
and MFCG's narrow repertoire with destinations and, at M3, the forms catalogue — whose classifier (O10 (g)) is the only
variety measure. Meanwhile the constraint-driven stages pull every seed toward one optimum: the best-scored centre
(S3), least-cost arterials (S4), isotropic stage boundaries that make concentric discs on flat ground (FTG-5), typing
greedy from the largest face (S6). B-CITY can pass every letter while its towns share one silhouette. *Required
change:* add at M1 a dispersion metric over §7.7's signature vector (radial share of arterials, orthogonality index,
street-density profile, block-area CV, enclosed share, outline anisotropy as FTG-5 defines it) for 100 seeds per rung
and water setting, with the dispersions of MFCG's size-sweep exports and FTG's payloads as the floor.

#### IMP-13 · minor · The fusion gate runs on a flat synthetic site

M0 (c) — "the fusion gate", D-16's risk retirement — times S4 + S5 + S8 and checks block and junction statistics "on
a flat synthetic site at CITY face counts". M1 then adds terrain costs, water barriers and bridges, and the lenses'
reorderings (MFP-2, MFP-3, GEO-18: reservations and the wall trace before growth) change what S5 proposes, rejects and
leaves for S8. The number that retired the risk no longer describes the pipeline, and §4.4's fallback is defined only
"before M1". *Required change:* repeat the gate as an M1 exit criterion on B-CITY-lite's river, coast and relief
configurations with the reordered stages, and state the fallback for a failure found at M1 (SCL-3's measured stage
costs bear on the timing half).

#### IMP-14 · minor · The licence table has one wrong entry and no rules for scope, notices or versions

§5 checks every named dependency against the public registry; all licences match §17. Five defects remain.
(1) "Boost.Geometry's GPL parts" — Boost.Geometry is distributed under BSL-1.0 and has no GPL parts (PLAUSIBLE,
general knowledge; the exclusion is harmless but wrong). (2) The fdlibm port behind `dmath` is unnamed; the obvious
candidate, stdlib's `@stdlib/math-base-special-*` (Apache-2.0), brings a 94-package runtime closure including
Node-oriented modules (`debug`, `resolve` through `utils-library-manifest`) — CONFIRMED from the registry; vendoring the
six functions §6.5 needs with the Sun notice is lighter. (3) The allowlist checker's scope is unstated: over all
dependencies it fails on dev-only `@resvg/resvg-js` (MPL-2.0, CONFIRMED) and on Playwright's browser builds; over the
transitive runtime closure it passes (Apache-2.0 94, MIT 14, ISC 9, BSL-1.0 2, Unlicense 1 — CONFIRMED). (4) MIT, ISC,
BSD, Apache-2.0, BSL-1.0 (for source-form distribution), OFL and the fdlibm notice all require notices that minifiers
strip; no notices file is specified. (5) `clipper2-ts`'s latest release is a prerelease (2.0.1-18). *Required change:*
correct the Boost entry, name the fdlibm source, run the checker over the transitive production closure with listed
dev-only exceptions, generate a third-party notices file in CI, and pin adopted versions.

#### IMP-15 · minor · The clean-room rule is applied too loosely to style tests and too strictly to fonts

The draw-style census (§8.3, §13.5) requires the `hatched` preset's roof dark / light ratios within ± 0.02 of NG's
measured 0.787 / 0.802 / 0.834 and water band ratios "to 1e-4" — numbers derived from NG's and VG's palettes, which §17
lists as creative content not to be reused; passing the test forces our palette to reproduce theirs. In the other
direction, §8.2 and §17 choose "a non-IM-Fell default serif (clean-room distance)"; IM FELL Great Primer is the face of
every MFCG map label (`visual-spec.md`; `profile-mfcg.md`: district labels drawn glyph by glyph in 27 px IM FELL), but
it is Igino Marini's OFL font, neither watabou's code nor his creative data. The clean-room rule does not reach it, and
the MFCG-family ink look the owner adopted as the default (D-1) loses its typographic signature for no gain.
*Required change:* test the laws with our own palettes (dark = lit × lerp(ambience, shadow, α) holds within ± 0.02 for
our colours; bands follow W·(i/N)^1.5 for our N and W) and keep the reference ratios as descriptive benchmarks; choose
the default face by the D-1 look (IM FELL is admissible) and record fonts as third-party OFL assets outside the
clean-room rule.

#### IMP-16 · minor · "The twelve MFCG edit asks are expressible 12/12" counts vocabulary

§7.4 maps four of the twelve asks and ends with "…". O9 (f) passes because an event kind exists for each ask, not
because the edit works with locality. Two asks show the gap: "drag points in the sea" is a `moveVertex` on the L0 coast,
but S1 couples coast and terrain (the heightfield is lowered on the sea side), so the edit breaks coast–contour
agreement unless S1 re-runs — a whole-map stage; "add a district" needs an L1 split, for which LC-7 finds no local
re-derivation operator. *Required change:* list all twelve mappings; turn each into a scripted B-EDIT scenario with its
locality (share of out-of-scope entities byte-identical) and invariant results reported; mark which asks need an S1,
S4 or S6 re-run and what that costs.

## §4 The improvement ledger — every claimed improvement: real, measurable, affordable

One row per claim in §15.2 (and the performance, simulation and "beyond" claims elsewhere). *Real* = the weakness is
evidenced (through IMPROVEMENTS' verified citations) and the mechanism can deliver the gain. *Measurable* classifies the
acceptance letters C / P / O as in §1. *Affordable* = effort (IMP-2 / IMP-3) and runtime (other lenses). The last
column cites this lens's findings first, then other lenses' ids.

| claim (ARCH §) | weakness answered | real? | measurable? | affordable? | verdict | findings |
|---|---|---|---|---|---|---|
| **O1** terrain and hydrology first (§4.2 S1) | MFCG 24 restarts in 58 attempts, 712 river rejections; FTG no terrain ("Mountains aren't properly supported yet", US×7), rivers that bend back; VG water made independently of the village | yes — neither base reference lets terrain constrain layout | (a) restarts C (tautology), features-present O but contradicts §5.3; (b) contours C, false as built (GEO-14); (c) O, delta has no mechanism; (e) P; (f) O; (g) C | ≈ 4–6 pw beyond the floors; S1 measured at 126 ms at 625² against a 30 ms budget (SCL-3) | keep; fix metrics | IMP-5, IMP-9, IMP-10; GEO-13, GEO-14, GEO-15, GEO-36, SCL-3 |
| **O2** deterministic recipe (§6) | MFCG `gates` change re-rolls the town; FTG `seed: null`; VG seeds drift across builds; NG one stream | yes | (a) P / O (hash identity across engines); (b), (c), (e) not measurable as written (LC-3, LC-4); (d) C | cheap; stream keys ≈ 73 ms at CITY (SCL-12) | keep; repair per the lifecycle lens | LC-1, LC-3, LC-4, GEO-2, GEO-29, GEO-31, SCL-12 |
| **O3** robust kernel, typed ladders, no restarts (§3, §5) | MFCG "collapsed or intersecting edges" and the null `rect`; FTG hourglasses, stacked duplicates, 10 % doorless; NG retries; VG boolean thorns | yes | (a) C / P, weak on exact degeneracies (GEO-12); (b) restarts C (IMP-5), invariant counts O; (d) P, budgets per building 4–7× MFCG's (MFP-5); (e) O; (f) C | the largest M0 item; whole-model checks per batch (SCL-1, SCL-2) | keep | IMP-5; GEO-1 – GEO-12, MFP-5, SCL-1, SCL-2, SCL-22 |
| **O4** destination-driven streets fused with bent-cut infill (§4.3–4.6) | MFCG streets as cell edges ("an illusion of streets"), roads toward a phantom point (2017 ancestor); FTG 15° clamp and "look similar" (a V1 complaint — V2 grows along main roads, FTG-5); NG a tree of T-junctions | yes, overstated for FTG V2 | (a) C; (b) P (detour, junction p5, 4-way share); (c) C; (d) P; (e) C; (f) P, but on a flat synthetic site (IMP-13); (g) C | fusion timing thin (SCL-3) | keep; move the gate to real configurations | IMP-4, IMP-12, IMP-13; MFP-2, GEO-16, GEO-21, GEO-22, FTG-4 – FTG-6, FTG-15, FTG-17 |
| **O5** frontage-first plots (§4.7 S10) | MFCG triangles; FTG hourglasses, duplicates, doorless buildings; NG ≈ 42 % of lot leaves dropped (the gain there is typed, exportable residue, not a different picture) | yes | (a), (d), (f) C; (b), (c), (e), (g) P | ≈ 10 µs per plot, underpriced (SCL-3) | keep | IMP-4, IMP-8; GEO-24, GEO-26 |
| **O6** metres, furniture, statistics (§2.1, §9, §13.2) | "Dimensions are a mess in all my generators" (MFCG, 79147510); FTG buildings ≈ 3× too large for years; NG and VG without scale | yes | (a) C (unit lint); (b) P; (c) C; (d) C | cheap; the per-generation record needs its own budget (SCL-21) | keep | MFP-8, SCL-21 |
| **O7** content-first land use (§4.2 S2, §4.7 S10b, §10.2) | MFCG population ≈ 6.12 × buildings; FTG one-way handoff and implausible counts; NG and VG without content | yes | (a) P / O (population); (b) C / O; (c) C; clauses dropped (IMP-10) | content authoring unbudgeted (IMP-2); laziness conflicts (LC-2, FTG-1) | keep; budget the content | IMP-2, IMP-10; LC-2, FTG-1, FTG-2, FTG-7, FTG-14, MFP-7 |
| **O8** fortification as a network (§4.8) | MFCG one ring, a tower on every vertex, `gates=0` seals the city, castle = one cell; FTG ungated crossings, gates not objects | yes | (a) C / P; (b) C; (c) P (FTG 39 m); (d) C (the castle is the argmax); (e) P; (f) O, but "two independent enceintes" has no mechanism; (g), (h) C | cheap | keep; fix (f) | IMP-4, IMP-9; MFP-4, GEO-18, FTG-8 |
| **O9** persistent document and editing (§2.9, §7) | MFCG "no way to save those changes" (US×9, US×12); FTG regenerate "cannot be undone"; NG and VG state = seed | yes — the largest user demand in two references | (a), (b), (d) C; (c) statistically invalid (IMP-7); (e) O; (f) C (IMP-16) | M3 overloaded; editability is first-weighted but lands third (IMP-3) | keep; move earlier | IMP-3, IMP-7, IMP-16; LC-5 – LC-17, GEO-10, GEO-11, SCL-5, SCL-9 |
| **O10** intent, forms, assignments (should; §7.7) | MFCG URL hacking and "too many parameters"; FTG "render a bunch of maps"; NG few character tools | yes | (a) O; (c) C / O; (g) separability of forms we design (C-like), two of ten impaired | ten forms tuned by eye; stage to three (IMP-3) | stage | IMP-3, IMP-9; LC-9, FTG-5, FTG-19 |
| **O11** schema, registry, exports, API (§2, §11, §14) | MFCG GeoJSON that "resembles" GeoJSON; FTG districts missing from GeoJSON, 53 % containment; VG palisade ghost | yes | (a), (b), (c), (e) – (h) C; (d) P (a GIS load) | eleven export targets; stage the extras (IMP-3) | keep the core; stage VTT, glTF, CBOR, bridge | IMP-3; FTG-12, FTG-21, FTG-22, SCL-6, SCL-11, SCL-14 |
| **O12** display list, LOD, style as data (§8) | MFCG no zoom ("a big flaw") and two drawing paths; NG 528 uploads per hood; FTG roofs recomputed every render | yes | (a) C / O; (b) P, clauses dropped (IMP-10); (c) C; (e) O; (f) C | three backends; `lit` needs WebGL2 as written (IMP-3); tiles at deep zoom (SCL-7) | keep; `lit` on Canvas2D, WebGL2 on need | IMP-3, IMP-10, IMP-15; MFP-1, GEO-28, SCL-7, SCL-17 |
| **O13** labels and names (§9, §10.4) | MFCG labels over gates and the keep, beyond their areas; no street names in any reference | yes | (a) C / P, clauses dropped (IMP-10); (c), (e) C | label stage underpriced (SCL-10) | keep the core; stage "full" | IMP-10; GEO-29, GEO-39, LC-17, SCL-10 |
| **O14** hinterland and margin (§4.9) | MFCG "not enough farms", roads ending at the crop; VG fields on one bank | yes | (a) C (the era table); (b), (d) C / P; (c), (e) unbaselined placeholders (IMP-6) | cheap; the margin raster costs (SCL-3) | keep the core | IMP-6, IMP-10; FTG-7 |
| **O16** report and honest controls (§5.4, §7.1, §7.8) | MFCG 28 silent street failures; VG "1 vs 0.999"; FTG raw server errors | yes | (a), (b) C; (c) needs testers (IMP-11); (f) a CI sweep that discrete stop rules defeat (GEO-41) | cheap | keep the core; stage "full" | IMP-11; GEO-41, LC-30, SCL-16 |
| **O17** plot model, site plans, heights (§2.5–2.6, §4.7 S11) | owner ruling; MFCG draws lots as buildings (33 746 of 34 950 fills); FTG lots without owner, one household per building | yes (owner-mandated) | (a), (b), (e), (f), (g), (i) C; (c) P (NG 39–43 %); (d) P, baseline now measurable from MFCG exports | site plans underpriced (SCL-3) | keep; add an outcome check | IMP-4; MFP-1, GEO-26, SCL-13 |
| **O18** prosperity field and one granularity law (§4.5, §4.7) | owner rulings; FTG 441 m² plots in every class; NG Moran's I ≈ 0; MFCG 2017 plot size fixed per ward | yes (owner-mandated) | (a) – (e) C; (g) C / O; (h) P-able from MFCG exports; (i), (j) unbaselined (IMP-6) | the σ = 60 m smoothing measured at 67 ms per field (SCL-3) | keep; fix the court / lane conflict | IMP-4, IMP-6, IMP-8; LC-6, LC-12 |
| **O19** greenery by rule (§4.9) | owner ruling; MFCG greenery = leftovers; NG `createGreen` on 23–58 % of blocks at identical tags | yes (owner-mandated) | (a), (b), (c), (f) C; (d), (g) unbaselined (IMP-6); (e) P | trees at render cost (SCL-8) | keep | IMP-4, IMP-6; SCL-8, MFP-11 |
| **hooks 1–8** (§15.2 last row) | owner hooks (ids, lifecycle, assignment, context vector, building generator, layers, editable tables, circumstances) | yes | "every hook field present on every entity (100 %)" is C and contradicts "zero cost when unused" | per-entity provenance, lifecycle history, context vectors and seam samples cost memory and bytes (SCL-11, SCL-20, FTG-21) | keep; state the per-entity cost and test "declared in the schema, populated when used" | LC-1, SCL-11, SCL-20, FTG-21 |
| **S1 / S3** stage-2 seam contract and fields (§2.5, §4.12, PART II) | NG hoods cannot share a street; "it won't be possible to reproduce a district … exactly" (70917627) | yes | M1's "complete contract" is C and vacuous while the field is flat (IMP-4) | cheap | keep | IMP-4; GEO-30, LC-18 |
| **performance** (§1.2, §12) | FTG ≈ 3–7 s on the server plus ≈ 4.6 s scene build, metropolis load ≈ 10 s; MFCG "a fraction of a second" | yes against FTG; against MFCG the per-building budget is 4–7× slower (MFP-5) | P, on undefined "reference hardware" (SCL-15); the improvements take 145 of the 252 ms CITY split (S1, S2 / S3, S6, S10, S10b, S11, S12 — arithmetic on §12) | stages underpriced and whole-model work per batch (SCL-1 – SCL-4) | fix the budgets | MFP-5, SCL-1 – SCL-4, SCL-15, SCL-17 |
| **simulation module** (O7 should; §10.1–10.3) | FTG parity (schedules, calendar, factions, events) | parity, not improvement | mostly C; FTG-9 / FTG-11 show relations and shared state missing | inside M4's 10–14 pw with five other items (IMP-2) | move out of the base release (IMP-3) | IMP-2, IMP-3; FTG-9 – FTG-11 |
| **"beyond" tags** in §15.1 (MFCG A2, A3, B20, C1, D2, E4, F2, G1, H1; FTG A4, C4, E2, G1, H2; NG A2, C8, G2) | each restates one of the rows above | as that row | as that row | as that row | — | — |

## §5 Licence and standalone audit — every named third-party dependency; nothing outside the folder

### 5.1 Named dependencies against the public registry (read 2026-09-25)

"Registry" = the `license` field of the package's latest version on registry.npmjs.org (CONFIRMED); rows marked
PLAUSIBLE rest on general knowledge and were not fetched.

| dependency (ARCH §17, §3.1, §1.7) | ARCH says | registry: version, licence | shipped? | verdict |
|---|---|---|---|---|
| `robust-predicates` | Unlicense / public domain (verify at adoption) | 3.0.3, Unlicense | runtime | matches |
| Clipper2 via WASM or a TypeScript port | BSL-1.0; the port's licence to verify | `clipper2-wasm` 0.4.0, BSL-1.0; `clipper2-ts` 2.0.1-18 (prerelease), BSL-1.0; `clipper2-js` 1.2.4, "Boost Software License" | runtime | matches; BSL needs its text in source-form distributions; pin a release (IMP-14); one engine per version (GEO-9) |
| `polygon-clipping` (fallback) | MIT | 0.15.7, MIT (depends on `splaytree` MIT, `robust-predicates`) | runtime | matches; shipping it beside Clipper2 is GEO-9's problem, not a licence one |
| `delaunator`, `d3-delaunay` | ISC | 5.1.0 ISC; 6.0.4 ISC | runtime | matches |
| `earcut` | ISC | 3.2.3 ISC | runtime | matches |
| `flatbush`, `rbush` | ISC, MIT | 4.6.2 ISC (`flatqueue` ISC); 4.0.1 MIT (`quickselect` ISC) | runtime | matches |
| `simplex-noise` | MIT | 4.0.3 MIT | runtime | matches; Perlin's US simplex-noise patent expired in 2022 (PLAUSIBLE) |
| `d3-contour` | ISC | 4.0.2 ISC (`d3-array`, `internmap` ISC) | runtime | matches |
| fdlibm port for `dmath` | "Sun's permissive fdlibm notice" | unnamed; the obvious candidate `@stdlib/math-base-special-sin` 0.3.1 is Apache-2.0 with a 94-package closure | runtime | name it or vendor six functions (IMP-14) |
| `cbor-x` | MIT | 1.6.6 MIT (optional native `cbor-extract`) | runtime (post-base under IMP-3) | matches |
| `zod` | MIT | 4.6.5 MIT (also on disk in `profiler/node_modules`) | runtime | matches |
| `fast-check`, `vitest`, Playwright, `pixelmatch`, Vite, `esbuild`, `tsx`, pnpm, TypeScript | MIT, MIT, Apache-2.0, ISC, MIT, MIT, MIT, MIT, Apache-2.0 | 4.10.2 MIT; 5.0.2 MIT; 1.63.0 Apache-2.0; 7.2.0 ISC; 8.3.1 MIT; 0.28.2 MIT; 4.23.15 MIT; 12.6.0 MIT; 7.0.2 Apache-2.0 | dev | all match; Playwright's downloaded browsers carry MPL / LGPL components — dev only |
| SSIM (named, no package) | — | `ssim.js` 3.5.0 MIT (a candidate) | dev | name it |
| `@napi-rs/canvas`, `resvg-js` | MIT; MPL-2.0 dev-only | 1.0.9 MIT; `@resvg/resvg-js` 2.6.2 MPL-2.0 | dev | matches; keep out of the runtime allowlist check (IMP-14) |
| OFL fonts (EB Garamond default; Cinzel, IM Fell) | SIL OFL 1.1 | not on npm; OFL 1.1 (PLAUSIBLE) | asset | bundling permitted, no sale on their own; check Reserved Font Names before subsetting; IMP-15 on the default |
| straight-skeleton ports | to verify; built in-house unless one passes B-FUZZ | none adopted | — | sound |
| CGAL | GPL / LGPL, rejected | — (its straight skeleton is GPL-3 with a commercial option, PLAUSIBLE) | — | correctly excluded |
| Boost.Geometry | "GPL parts" excluded | — (BSL-1.0 with no GPL parts, PLAUSIBLE) | — | wording wrong (IMP-14) |
| QGIS (the GeoJSON acceptance "scripted QGIS load") | — | GPL-2.0-or-later (PLAUSIBLE) | CI tool, never linked | acceptable; GDAL's `ogrinfo` (MIT) is a lighter validator |
| Emscripten (only if Clipper2 is compiled in-house) | — | MIT / UIUC (PLAUSIBLE) | build tool | sound |
| xoshiro128\*\*, MurmurHash3 finalisers, Tracery-class engine (all built in-house) | — | reference algorithms in the public domain; Tracery itself Apache-2.0 but not used (PLAUSIBLE) | own code | sound |
| formats: GeoJSON (RFC 7946), glTF 2.0, CBOR (RFC 8949), Universal VTT, Foundry scene JSON | — | open specifications | — | sound; the bridge's FTG message vocabulary is FTG-22 |

**Runtime closure (CONFIRMED).** The 14 runtime packages resolve to 126 packages: Apache-2.0 94 (every one from the
stdlib fdlibm candidate), MIT 14, ISC 9, BSL-1.0 2, Unlicense 1. Nothing copyleft reaches runtime. The allowlist in
§17 covers all five licences.

### 5.2 Clean-room inputs (IMP-1 in numbers)

| source the design lets implementers read | what it contains (executed counts) |
|---|---|
| `research/findings/os-model.md`, `os-wards-render.md`, `os-geometry.md`, `_critic-os.md` | 284 / 143 / 32 / 44 lines inside code fences; 91 / 71 / 27 / 2 Haxe-like statement lines — TownGeneratorOS (GPL-3) source quoted as code, e.g. the spiral seeding loop |
| `research/findings/profile-mfcg.md` §9.1 | MFCG's `grammar.json`, complete and verbatim (4 401 B) |
| `research/findings/profile-neighbourhood.md` l. 449, §4.1 | NG's `grammar.json` verbatim (3 827 B); six palette files verbatim |
| hex colour values across 15 findings files | ≈ 890 (visual-spec 202, profile-village 198, profile-mfcg 151, profile-neighbourhood 130, vg-posts-a 74, …) |
| `captures/**/network/bodies/` outside the `*.js` rule | 920 `.json`, 713 `.bin`, 257 `.png`, 68 `.svg`, 141 `.html`, 23 `.css` bodies |
| `research/ftg-capture/presets.json` (not named by the rule) | FTG's content database: 209 building types, an 80-node dependency graph, 299 professions, 323 items, 21 services, 11 sizes |

### 5.3 Nothing depends on a project outside this folder

`docs/ARCHITECTURE.md` was searched for `settlement-engine`, `SettlementForge`, `map-corpus`, `/Users/`, `~/`,
`Desktop` and `../`: no hit (CONFIRMED). The historical corpus and the host application appear only as later,
owner-gated phases and are never named, read or used as constraints. Every input the design names lies inside the
folder (findings, captures, `docs/`), and every runtime dependency is a public npm package, not a project on this
machine. Two external *services* matter for acceptance, not for the product: the live FTG server for the extra captures
FTG-16 requires (one free settlement a day; METROPOLIS premium-only, an owner-gated purchase) and the itch builds for
any further watabou capture (builds drift: the Village Generator changed between 21 and 25 September). **Verdict:** the
design is standalone. The one coupling to fix is inside the folder: the product's test kit reading `captures/` (IMP-1).

## §6 What the design already gets right under this lens (keep it through the revision)

* **Every improvement names its weakness.** §1.4's fusion table has a "discards, and why (measurable criterion)"
  column and marks where the tiebreaker decided; §15.2 carries a mechanism and an acceptance line for every must-have,
  should-have, hook and stage-2 item of IMPROVEMENTS §5 (none missing — checked row by row).
* **Honest numbers where they exist.** D-20 raised the proposals' 60–90 pw to 100–130 with a stated basis; §12 calls
  the CITY headroom "thin and PLAUSIBLE"; J-T forbids passing a placeholder; Appendix A.3 labels every mechanism,
  constant and budget PLAUSIBLE until M-1 and M0 measure it.
* **Risk first.** M-1 schedules the calibration experiments that need no recording before any spike, and M0 retires
  the kernel, the bent cut and the fusion timing with executed exit criteria before a product milestone.
* **Restraint.** The simulation module stays out of the one-click path (D-10, J-9); shadows and relief are off by
  default; no oblique view; the basic panel is capped at twelve controls (R15); invariants police validity, not
  regularity; the user's seed is never swapped.
* **Licences.** Permissive-only with an allowlist, one adapter file per library, CGAL excluded, hedges where a port is
  unverified. Every named npm package's licence matches the registry, and the runtime closure is entirely permissive
  (§5.1).
* **Clean-room intent.** No reference data reused, no captured bundle read, a CI rule, a `CLEAN-ROOM.md` at M0, an
  original grammar and presets — IMP-1 is about closing the gaps in the chain, not about the intent.
* **Standalone.** Nothing in the design depends on a project outside this folder (§5.3).

## §7 How the findings cluster for the reviser, what to cut or stage, and overlaps with other lenses

**Cluster A — measuring the improvements:** IMP-4, IMP-5, IMP-6, IMP-7, IMP-10, IMP-11, IMP-12, IMP-16. One decision
answers most of them: tag every acceptance letter C / P / O; add P and O criteria for the first-weighted improvements;
write the D-5 protocol and let it set the unbaselined thresholds (IMP-6) and replace the tester counts (IMP-11); use
calibrated reference bands instead of significance tests (IMP-7); restore the dropped clauses (IMP-10).

**Cluster B — scope, effort and order:** IMP-2, IMP-3, IMP-13. Re-derive D-20 line by line, then re-cut the base
release. The resulting plan (PLAUSIBLE; ranges from IMP-2's table):

| milestone | content after the re-cut | moved in / out |
|---|---|---|
| M-1 calibration | as ARCH, plus FTG's BIG_TOWN and BIG_CITY captures (FTG-16), the MFCG size sweep (landed 17:16), NG hollow-block and MFCG inner-lot shares (IMP-8), variety baselines (IMP-12) | in: capture days and baselines |
| M0 spikes | as ARCH | — |
| M1 viewable town | as ARCH, plus the first D-5 protocol run and the fusion gate on real configurations (IMP-13) | in: protocol, gate |
| M2a editing core | document and log, locks and pins, scoped faithful regeneration, the four actions, undo, dry run | in: from M3 (D-7) |
| M2b the base at parity | ARCH M2 with `lit` on Canvas2D | out: the WebGL2 tier |
| M3 editing and exports | drawn constraints, warp, assignments and the solver, overrides and the tables editor, snapshot-first migration, tiered B-EDIT, the embedding API; `.plat`, JSON schema, SVG, PNG, GeoJSON; three forms; thumbnails | out: VTT × 2, glTF / OBJ, CBOR, the bridge, seven forms, O13 / O14 / O16 "full", version retention |
| M4 hardening | goldens, provenance, performance tiers, the incremental path, documentation | out: `@plat/sim` |
| post-base (B+) | WebGL2 on measured need; VTT, glTF / OBJ, CBOR, the bridge; `@plat/sim` after FTG-9's relation store; seven forms; the "full" tiers | new milestone with its own estimate |
| M5 stage 2 | as ARCH | — |

Moving these items out does not drop them: each keeps its should-have status and its hooks in the base, and each
serves an owner weighting below the first tier (D-7) or no part of the D-5 acceptance.

**Cluster C — clean room and licences:** IMP-1, IMP-14, IMP-15 (with FTG-22 on the bridge vocabulary). One §17 rewrite:
sanitised implementer inputs, a repository boundary, a numbers-only B-REF baseline file, a content deny-list, honest
provenance for reference-derived constants, the checker's scope and notices, the Boost correction, and the style and
font rules.

**Cluster D — improvements that lose or lack something:** IMP-8 (alleys erase courts), IMP-9 (catalogue entries with
no mechanism).

**Overlaps (cited, not repeated).**

| this finding | overlaps | what this finding adds |
|---|---|---|
| IMP-1 (overlap) | FTG-22 (bridge vocabulary) | the findings, captures and test-kit exposure, counted; the content deny-list; the repository boundary |
| IMP-2 (overlap) | judge-engineering §3 item 4; SCL-18 (CI compute) | FTG's non-map scope inside the base; content, UI and rig lines; the re-derivation |
| IMP-3 (overlap) | FTG-9 (module data model), SCL-7 / SCL-17 (WebGL2 and tiles), LC-14 (version retention) | D-7 and D-1 contradicted by the plan; M3's itemisation; the re-cut |
| IMP-4 (overlap) | MFP-1 (legibility fails while the numbers pass), LC-4 (O2 (c) vacuous) | the C / P / O classification; the D-5 protocol |
| IMP-5 (overlap) | MFP-5 (speed), GEO-2 (watchdog), SCL-1 | the tautology; delivery by tier and time on MFCG's worst configurations |
| IMP-6 (overlap) | LC-19 (goldens before the shift protocol) | thresholds no reference can set, gating M2 |
| IMP-7 (overlap) | GEO-11 (the locality oracle), LC-8 | the executed statistical failure and a calibrated replacement |
| IMP-8 (overlap) | MFP-1, GEO-25 (rear lanes written from L3) | the rule conflict and the courtyard keep-test |
| IMP-9 (overlap) | FTG-5, FTG-19, MFP-6 | the delta and independent enceintes |
| IMP-12 (overlap) | FTG-5 (the mechanism) | the variety metric |
| IMP-13 (overlap) | MFP-2, MFP-3, GEO-18, SCL-3 | the gate's scope |
| IMP-14 (overlap) | the engineering judge's licence rows | registry confirmations, the Boost error, scope and notices |
| IMP-16 (overlap) | LC-7 (no local operator above the finest levels) | "expressible" versus working |

**Raised elsewhere and not re-raised here:** the missing FTG comparators for D-5's side-by-sides (FTG-16 — MFCG's are
now available from the size sweep: TOWN = size 40, CITY = 80, METROPOLIS = 130); the per-building speed against MFCG
(MFP-5); undefined reference hardware (SCL-15); the invariant suite and index rebuilds per batch (SCL-1, SCL-2);
under-priced stages (SCL-3); the CI compute budget (SCL-18).

**Deferrals.** IMP-6 re-raises J-T's placeholder deferral: the sources it names cannot measure properties the
references lack, and the corpus phase comes after the standalone program. No other finding re-raises a deferral; the
out-of-scope list of §16 is respected (IMP-3 moves items inside the base program, it does not add any).

## §8 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (read in full or executed in this seat).
* Every quotation of `docs/ARCHITECTURE.md` and `docs/IMPROVEMENTS.md` (both read in full), and therefore the
  contradictions built from them: IMP-3's D-1 / D-7 / §16 conflicts, IMP-5's tautology and the O1 (a) versus §5.3
  conflict, IMP-6's placeholders, IMP-8's shared condition, IMP-9's missing mechanisms, IMP-10's dropped clauses,
  IMP-16's four mappings.
* The counts in IMP-1 and §5.2 (code fences, statement lines, hex tokens, capture bodies, the presets key census), the
  capture host (Apple M1), the FTG request sizes, and the two creator quotes checked at source.
* Every registry licence and the runtime closure in §5.1.
* The KS simulation in IMP-7, as a simulation under its stated assumptions.
* The arithmetic: §16's milestone sum (100–129 pw), D-20's floor (64–74 pw), §12's improvement share (145 of 252 ms).

**PLAUSIBLE** (reasoning; no PLAT code exists).
* The effort re-derivation (141–192 pw; 121–158 after the cuts), M3's itemisation (31–40 pw) and every saving.
* The legal consequences in IMP-1 (a derivative-work risk, redistribution), and the licence facts marked PLAUSIBLE in
  §5.1 (Boost, QGIS, Emscripten, OFL, CGAL, the simplex patent).
* The block-factor magnitudes in IMP-7's clustered cases, and how often each failure would fire in a built system.
* The realism judgements (that poor dense quarters historically kept some courtyards), and every severity, which is
  this seat's judgement under §1's rule.
