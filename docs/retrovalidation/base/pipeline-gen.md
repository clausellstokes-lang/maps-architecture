# Retrovalidation (base) — lane retrovalidate/base/pipeline-gen (Fable validator; §4 Generation pipeline, whole)

Validator: Fable 5.1 (claude-fable-5-1), 2026-09-28 (started ≈ 16:40). Sections: §4 Generation pipeline, docs/ARCHITECTURE.md
l. 3680–6793 (§4.1–§4.12; the brief's "l. 3203–5528" is the pre-amendment numbering). Standard: THE STANDARD of the lane brief and
the seat's lens. NOTE ON THE STATE OF THE TEXT: the bundled amendment pass c + d + e (items 20 (h), 32–88, 101) HAS landed
(docs/lane-events.log: amendments-c/assemble-r3 15:21, handfix-c/apply 16:26), so this seat judges the text WITH those items in it;
the brief's sentence that they are "NOT yet applied" is stale and is not followed — a plainly missing or contradicted item among them
is a finding here, owner-fidelity, at its consequence's severity. docs/validation/coherence/ (named by the brief as an input) does not
exist on disk; nothing was read from it.

**sha256 of docs/ARCHITECTURE.md at launch:** `87588d349c3da25575e915034412627bb4671c9b4696d74675b42d7f7316c31d` (17 297 lines,
2 304 442 bytes; the handfix-c/apply result of 16:26).

## PROGRESS

| section | planned | done |
|---|---|---|
| candidate inputs: docs/retrovalidation/pipeline-gen.md (RV-1…7, 2026-09-27), docs/fable-review/main/pipeline.md + blocks-pipeline.md, redteam.md + blocks-redteam.md | read whole; each disposed (§2) | done |
| owner rules: OWNER-INSTRUCTIONS, AMENDMENTS-25 1–7, AMENDMENTS-25b 8–31, DEFINITION | read whole | done |
| §4 intro + §4.1 (l. 3680–3861) | read whole | done |
| §4.2 S0–S3 (l. 3862–4289) | read whole | done |
| §4.3 S4 (l. 4290–4377) | read whole | done |
| §4.4 S5 (l. 4378–4541) | read whole | done |
| §4.5 S6 · S7b (l. 4542–4869) | read whole; grower, quarter and band-share laws re-derived | done |
| §4.6 S8 (l. 4870–5119) | read whole; stop-test mean, straightFirst angle, deep-interior and reach rows re-derived | done |
| §4.7 S9 · S10a · S10 · S10b · S11 (l. 5120–5712) | read whole; items 16–19, 20, 22, 28 (f), 29, 30, 43, 63, 68, 70, 71, 72, 80, 82 traced to mechanisms; light spacing re-derived | done |
| §4.8 S7 (l. 5713–5809) | read whole; item 45 order checked | done |
| §4.9 S12a · S12b (l. 5810–5981) | read whole; farm-table arithmetic, item 57 constructions checked | done |
| §4.10 S13–S15 (l. 5982–5999) | read whole; eager S13a against §4.1 (RV-2) | done |
| §4.11 incremental mode (l. 6000–6762) | read whole; items 8, 17, 18, 25, 30 (e), 31, 67, 70 (e), 72 (b), 75, 76, 81, 88 traced; ladder, churn, clock, Works tables read | done |
| §4.12 strategies (l. 6763–6793) | read whole | done |
| red-team blocker/major dispositions in §4 | 53 re-checked in the live text (§3) | done |
| cross-checks outside §4 that §4 relies on | §6.1 streams (30 names), §2 fields (60 names), §14 table files, §1.1 ladder bounds, §2.3 hydro grid, §5.4 report fields, §9.1 model/view rows, §12.4 S13a row — all by grep | done |
| findings table, blocks file (parse-checked, dry-applied), owner questions, CONFIRMED vs PLAUSIBLE, LANDED | written; logged | done |

## 1. Findings

Severity: blocker / major / minor. Kind: owner-fidelity / mechanism / coherence / single-source / deferral / parity /
regression / stale / clean-room / new-problem. Every finding is labelled CONFIRMED (read or executed) or PLAUSIBLE. The
blocks are in docs/retrovalidation/base/blocks-pipeline-gen.md (REPLACE bodies generated from the live subsections by exact,
count-asserted substitutions — scratch gen_blocks.py; parse-checked with apply-blocks.py --parse-only and dry-applied on
scratch copies: 4 blocks applied, audit not-OK 0, exactly the three named design lines plus one index row and one Part A
row differ, headings 147 → 147, fences balanced). No blocker and no major was found in §4.

| id | severity | kind | section (exact heading) | claim | evidence | required change | owner | block |
|---|---|---|---|---|---|---|---|---|
| RV-pipeline-gen-1 | minor | mechanism | `### 4.6 S8 Infill — the measured bent cut as a kernel transaction, per district, with the deep-interior rule` — "Hidden plots, and how a court or a rear row is reached", the reach weights | "The reach weights are band rows — squalid and poor: open 0.25, passage 0.75, gated 0; … — interpolated along the prosperity value, the non-open weights scaled by the density value (× (0.5 + density) …) and by the rung (TOWN 0.6, CITY 1.0, METROPOLIS 1.2 …)" states no rule for the `open` weight after the scaling: a squalid block at density 1 in a METROPOLIS has passage 0.75 × 1.5 × 1.2 = 1.35 alone, so the three weights are no longer a distribution and `open` is undefined (negative as a remainder), while the hidden-share target of the same paragraph is "capped at one". The draw on `cut.interior` ("one pair: treatment, reach") has no law to read. CONFIRMED (l. 5058–5063 read; arithmetic executed). Carried from the paused seat's RV-pipeline-gen-6 (2026-09-27), whose substitution no pass applied (grep "renormalised to sum to one": 0 hits in the live text). | §4.6 l. 5058–5068; docs/retrovalidation/pipeline-gen.md RV-6 | Exact insertion on l. 5063 after "(TOWN 0.6, CITY 1.0, METROPOLIS 1.2; the village rung rows are 0, PART III)": ", and the three weights then renormalised to sum to one — so density and rung raise the hidden reaches' share monotonically while every band keeps an `open` share in proportion to its row's, and no scaled weight exceeds one (J-RVpipeline-gen-1)". Written as the REPLACE §4.6 block, with its J-ROWS line and RATIONALE-A entry. | pipeline | yes — blocks-pipeline-gen.md REPLACE §4.6 (l. 5063) |
| RV-pipeline-gen-2 | minor | coherence | `### 4.1 Stage graph, evaluation model, laziness contract, transactions, the worker` — "The one-click first paint is the complete city LOD (SCL-4)" | The lazy list "Laziness is restricted to what the city band does not draw: … way names and addresses, pins below the city band …" contradicts three canonical statements: §4.10 "S13a (model; eager for every district) draws names … ways … numbers addresses"; §9.1 "Model (S13a; in the model hash; persisted): every entity's name and short form" and "Addresses: the numbering is model data (S13a …); the numbers are placed as view data at the neighbourhood band"; §12.4's S13a first-paint row ("≈ 3 500 names … address numbering", 12 ms). Names and numbering are in the model digest, and the same paragraph says "The model digest covers the eager model (§6.2)", so they cannot be lazily derived; an implementer reading §4.1 alone could make way naming lazy and break the digest. What the city band does not draw is the way-name labels and the address numbers — the drawing, not the names. CONFIRMED (l. 3760, 5990–5993, 11059, 11288–11289, 12510 read). | §4.1 l. 3758–3762; §4.10; §9.1; §12.4 | Exact substitution on l. 3760: "way names and addresses," → "way-name labels and address numbers (the names and the numbering themselves are S13a's eager model data, in the model digest — §4.10, §9.1; only their drawing waits for the finer bands),". Written as the REPLACE §4.1 block. | pipeline | yes — blocks-pipeline-gen.md REPLACE §4.1 (l. 3760) |
| RV-pipeline-gen-3 | minor | single-source | `### 4.6 S8 Infill — …` — the hidden-share target sentence | The rung factors "(TOWN 0.6, CITY 1.0, METROPOLIS 1.2)" are stated twice in one paragraph — once for the reach weights (l. 5063), once again for the hidden-share targets (l. 5067 "scaled as the reach weights are, by the rung's factor (TOWN 0.6, CITY 1.0, METROPOLIS 1.2)") — two copies of one table value that a later calibration could move apart. CONFIRMED (l. 5063, 5067 read). | §4.6 l. 5063, 5067 | Exact substitution on l. 5067: "by the rung's factor (TOWN 0.6, CITY 1.0, METROPOLIS 1.2) and by (0.5 + the" → "by the rung's factor above and by (0.5 + the". Written in the same REPLACE §4.6 block. | pipeline | yes — blocks-pipeline-gen.md REPLACE §4.6 (l. 5067) |

**Non-findings recorded so they are not re-found (all CONFIRMED by reading the cited lines or by executed arithmetic,
2026-09-28).** (a) The paused seat's RV-pipeline-gen-1 (grower illustration) is fixed: l. 4580 reads "≈ 7 ha at 60 ha of land,
≈ 14 ha at 250 ha, ≈ 22 ha at 600 ha" and the law re-derives (N_d 9 / 18 / 27 → 6.7 / 13.9 / 22.2). (b) RV-pipeline-gen-2 (rung
(c) under the contact rule) is fixed inline: step 8 (c) carries the slide in steps of 2 · `attractCm`, `W_CUT_SLID`, J-Fredteam-1
(l. 5019–5031), and rung (d) reads "that slide, never a repeat of a refused cut". (c) RV-pipeline-gen-3 (the cut way's far part)
is fixed: the identity-exception paragraph stands in §4.11 (l. 6330–6349, J-Fpipe-2) with the record list, the name rule and the
test. (d) RV-pipeline-gen-4 (shanty staging) is fixed: l. 4606–4607 restrict the replacement to "the districts of the stages
whose cumulative quota share (§4.2 S2's stage rows) exceeds `shanty.afterStageShare`". (e) RV-pipeline-gen-5 (the field
passes) is fixed: l. 4622–4625 name pass 1's driver-only state, its completion by `characterOffset` after typing, and pass 2
at S10a; the density and greenery fields' sentence (l. 4682) agrees. (f) RV-pipeline-gen-7's seven provenance texts are all
corrected by pass c: "M-1 #5 (FTG face recovery …) measures the share of FTG's land inside its road-graph faces — FTG's client
… receives no lot or plot … so this bounds its plot share from above" (l. 4043–4045, item 49); "FTG's measured rule" 0 hits
and S11's entrance reads "where §2.6's rule 1 places it (the owner's rule, item 29)" (item 50); "42 % discard" 0 hits and S10
(10) reads "about 42 % of its lot leaves, its courts by construction rather than by error" (item 42); "walled manor
compound" survives only at §2.5 l. 1086 as our own PlotBound's example, with no NG attribution, and S11's compound row reads
"ours — NG 1.2.2 draws no enclosure" (item 44); "one elevation effect" 0 hits and step 1's slope term reads "no reference
reacts to slope here — MFCG 12710731's model has no terrain" (item 33); F-CASTLE reads "repaired in place first, in MFCG
12710731's order — thinness first, then shape … (1) Bloat … (2) Equalise" (item 45); §4.9's sector look names VG 1.6.9's and
MFCG 12710731's two recorded constructions (item 57). J-P1 is re-ruled against item 72 (d′) as "a plain residential identity by
its band … an identity, never an S6 kind" (l. 4787–4790, J-A72.42), and the immediate-mutation sentences are reconciled with
item 67 (S11 step 6; §4.11 *The epoch-spread mutation* and *Works* (1), J-A67.49). (g) Every stream §4 draws from is
declared in §6.1 (30 names checked by grep, `plot.join`, `pin.light`, `works` and `siteplan.entrance` among the new ones;
`cut.side` and `cut.farSideAlt` are declared and no longer drawn by §4.6, which is §6.1's stream list to reconcile if it
still says otherwise — not §4's). (h) Every record field §4 writes or reads is declared in §2 (60 names checked), except
three that are not §2's by design: `PortRows` (§10.2's staged rows), `townSide` (a castle-table column, §4.8) and
`autoResolved` (§5.4's report field, l. 7002). (i) §14 names `wealthLadder.json` and `works.json` beside it (l. 14250–14251) and
`tables/dossier/*` (l. 14501); §1.1's ladder bounds are 1 500 and 120 000 with the port's refusal (l. 284–346), as §4.11's *The
rung at an epoch* states; §2.3's hydrology grid is 16 / 25 / 32 m as §4.2 S1 (3) states. (j) Re-derived: the gate law
5 / 8 / 12 / 18 at 58 / 220 / 548 / 1 274 ha and the waterfront reduction 4 / 7 / 10 / 14; the quarter law 9–10 / 13–14 / 17–18 at
the rung building counts; the band shares 0.011 / 0.011 / 0.217 / 0.435 / 0.217 / 0.109 and the cumulative cuts 0.239 / 0.674;
the deep-interior shares (four rows, each 1.00) and the unscaled reach rows (five rows, each 1.00); the stop test's mean
7/30 (E|X − 1| for X the half-sum of four uniforms ≈ 0.233); `asin(√0.99)` ≈ 84.3°; the street-light spacing 22 m at 25 cd,
3 m and 0.1 lx; the two-nucleus separation band ≈ 780–800 m; S3 (12)'s score comparisons (1.5 / 0.9 / 0.85 / 0.65; harbour 1.6,
1.3, equal at ⅚); the jitter bound (√area / 3 < 1.5 m below 20.25 m²); coppice 0.25 ha per head. (k) No "TBD", "to be decided",
"open question" or "TODO" in §4 (grep); every staged subject (islands, sewers, undercity, evolution engine, plan rung,
dossier port rows) carries a concrete hook — S7b (5)–(7), §4.11's kinds and strategies, §4.12's registrations — so the
roadmap's staging is not a deferral. (l) No reference code, grammar, palette, word list or identifier is in §4; the
`ref:<build> … (code)` labels are provenance citations under items 32 and 62, and the doc checks passed on the live text
(handfix-c/apply: C1 5/0, C3 1 185/0, exit 0). (m) The FTG granularity anchor "FTG quad side median 10.3 m, footprint median
103 m²" (§4.7 S10 (2)) is a building-outline measurement, which FTG's client does send, so item 49 does not reach it (the
paused seat's J-RVpg-6 stands). (n) `plotShare`'s "dense core 0.62" against MFCG's 0.60–0.65 gross lot cover, and the walled
shares 0.90 / 0.88 / 0.88, agree with §1.1's stage rows (l. 313–315). (o) The shanty stage rule admits the walled core at TOWN
(the core's cumulative share 0.90 exceeds 0.5) — the finest resolution a stage-keyed rule has for FTG's "after the first
half is built"; the `shanty` kind's soft `extramural` row (0.6) pulls outward; a stage-resolution reading, not a defect.

## 2. Candidate inputs — confirmed, sharpened or dropped

| source | candidate | disposition here |
|---|---|---|
| docs/retrovalidation/pipeline-gen.md (paused seat, 2026-09-27) RV-1 | grower's "≈ 13 / ≈ 21" | DROPPED — fixed in the live text (l. 4580), re-derived |
| — RV-2 | §4.6 rung (c) refused by the contact rule | DROPPED — fixed inline (blocks-redteam.md B-1 folded into step 8 (c)–(d), J-Fredteam-1) |
| — RV-3 (major) | the carve's rekey identity gap | DROPPED — fixed (§4.11's identity-exception paragraph, J-Fpipe-2, l. 6330–6349) |
| — RV-4 | shanty staging names no candidate set | DROPPED — fixed (l. 4606–4607) |
| — RV-5 | three field evaluations, two pass names | DROPPED — fixed (l. 4622–4625, 4682) |
| — RV-6 | reach weights not a distribution after scaling | CONFIRMED, still open → RV-pipeline-gen-1, block written |
| — RV-7 (register of seven pass-c contradictions) | items 33, 42, 44, 45, 49, 50, 57 texts | DROPPED — all seven applied by pass c (§1 (f)); the two rulings it flagged (J-P1 vs 72 (d′); immediate mutation vs 67) are taken |
| docs/fable-review/main/pipeline.md J-Fpipe-1 / blocks-pipeline.md B-1 (J-Fpipe-2) | the grower slip; the identity exception | both APPLIED in the live text; nothing to carry |
| docs/fable-review/main/redteam.md J-Fredteam-1 / blocks-redteam.md B-1 | rung (c)'s slide | APPLIED inline (step 8 (c)) |
| docs/fable-review/main/redteam.md "checked sound" items (pool scope at the wall strips, one-click default, quarter law) | — | re-read and hold (§4.8 "strip faces inherit their district"; §4.7 S10 (0) both sides at once; §4.1's freeze; the quarter law re-derived) |
| docs/fable-review/main/model-b.md, scope.md, rendering.md | stubs | nothing to dispose |
| docs/validation/amendments-c/closing-report.md, handfix-apply.md | the 19 hand-fix issues (pipeline 4: VD3-03, VD3-07, VPR3-01, VPR3-02) | read; their §4 texts are present as the rows state (the door light's `offsetCm` and placement at §4.7 (4); the cluster row's `depthM` upper end at §4.7 3 (i); II.7.6 and Part A are other seats') — no residue in §4 |

## 3. Red-team blocker and major dispositions in §4 — re-checked in the live text

The disposition claimed is docs/ARCHITECTURE-VALIDATION.md §R1.1–§R5.1's row; the verdict is on the CURRENT text (sha
87588d34…): is the mechanism there, and is it right. STANDS = there and right. Every row named §4 among its homes in the
record's blocker / major rows (49 ids by grep, `VK-3`, `VK-6` and `N-2` among them as verify-round majors) plus the §4-homed
rows the paused seat carried (SCL-2, SCL-8 / VIS-5, SCL-13, FTG-14, MFP-1, GEO-42) — 53 rows, 0 WRONG.

| id | sev | disposition claimed (mechanism; home) | verdict | why (live text, line) |
|---|---|---|---|---|
| LC-2 | blocker | laziness contract; eager S7b / S10a; two field passes; derived-complete digest | STANDS | §4.1 l. 3740–3756 (contract, write-only-inside-own-faces, S8 and S12c eager); §4.5 S7b l. 4700; §4.7 S10a l. 5133; §4.5 l. 4622–4625 |
| FTG-1 | blocker | as LC-2 | STANDS | as LC-2 |
| LC-1 | blocker | addresses `kind:token` from lineage; no reserved id ranges (§4 side) | STANDS | §4.1 l. 3799 "Addresses and lineage keys derive from lineage (§6.3), so no id ranges are reserved" |
| GEO-2 | blocker | work limits count operations, never milliseconds (§4 side) | STANDS | §4.1 l. 3797 "Work limits count kernel operations, never milliseconds (§5.1 (5))"; §4.6 step 8 "each rung under an operation-count work limit"; §4.12 `workLimits` "laws over … counts" |
| SCL-2 | blocker | static indexes rebuilt at stage end (§4 side) | STANDS | §4.1 l. 3796 "Static index partitions are rebuilt as §3.3 states; S10's eager step (0) ends like a stage" |
| MFP-1 | blocker | figure-ground contract (§4 side) | STANDS | §4.7 S9 l. 5128–5130 "Streets exist as geometry from here on; 'negative-space streets' is purely a style, and §8's figure-ground contract fills blocks" |
| GEO-13 | major | displacement clamped to 0.8 × local feature size; non-zero union repair | STANDS | §4.2 S1 (2) l. 3907–3914 |
| GEO-14 | major | vector coast authoritative; ± 10 cm; contours §8.2's tier (F-CONTOUR) | STANDS | l. 3915–3919 |
| GEO-15 | major | heights `Int32` cm on a per-document datum (§4 side: S1 sets `datumCm`) | STANDS | l. 3892–3894 "Heights are stored in the range and datum §2.3 declares; S1 sets `datumCm` to sea level on a coastal site …" |
| GEO-16 | major | routes unioned on the lattice, chains smoothed and inserted once; 8 m merge; 26 cm attraction | STANDS | §4.3 l. 4319–4331 |
| GEO-17 | major | pinned bank-to-bank decks; S4 routes to deck ends as fixed edges | STANDS | §4.2 S1 (5) l. 3950–3985 (four deck cases); §4.3 "Decks are fixed edges of the graph" |
| GEO-18 | major | trace before growth, gates pinned, topology-preserving simplification | STANDS | §4.2 S3 (9) l. 4126–4137; §4.4 S5a trace l. 4400–4412 |
| GEO-19 | major | water carved at S3 before S4; outer moats by the carve path | STANDS | §4.1 "Why this order (a)"; §4.2 S3 (10) l. 4138–4158; §4.4 *Outer moats* |
| GEO-20 | major | one kerb function; S9 commits S8's kerbs; Hausdorff 0 | STANDS | §4.6 l. 4872–4884; §4.7 S9 l. 5122 |
| GEO-21 | major | cut ends extended to the crossed spine as T-junctions | STANDS | §4.6 step 7 l. 4973–4982 |
| GEO-22 | major | sides as runs; perpendicularity on chords or a ± 5 m window | STANDS | §4.6 *Sides* l. 4889–4894; steps 3–5 read runs |
| GEO-23 | major | reflex pre-cut; always-succeeding clipped cut; substitution ≤ 2 × band | STANDS | step 8 l. 5006–5035 — with the slide of J-Fredteam-1 now inline, rung (c) is always-succeeding in fact (the paused seat's STANDS* is closed) |
| GEO-24 | major | per-frontage regions by straight skeleton; strips never leave their region; F-SKELETON downgrade | STANDS | §4.7 S10 (4) l. 5183–5191 |
| GEO-25 | major | lanes decided in S8; S10 never writes L1 | STANDS | §4.1 l. 3793–3795; §4.6 deep-interior l. 5045–5048; §4.7 S10 (9) |
| GEO-26 | major | row footprint = plot ∩ frontage band; one L4 batch per block | STANDS | §4.7 S11 row arrangement l. 5382; §4.1 S11 row |
| GEO-27 | major | built-face legality in epoch growth | STANDS | §4.11 l. 6012–6017 |
| GEO-29 | major | S13 split into S13a model and S13b view | STANDS | §4.10 l. 5984–5990 |
| GEO-42 | minor (bounds S8's writes) | no continuation across a district-boundary edge | STANDS | §4.6 step 10 l. 5043 |
| LC-6 | major | cuts once per town from roster shares; hysteresis 0.02; `FieldBands.middle` | STANDS | §4.5 *Bands* l. 4657–4665; the band-set bullet l. 4650–4654 |
| LC-7 | major | local operators per coarse stage chained (§4 side: S1 water, S4, S5, S6, S7 operators named where §4 relies on them) | STANDS | §4.2 S1 (5) "S1's water operator (§7.3 (b))"; §4.3 "S4's local operator for edits is §7.3's"; §4.5 "through S6's operator (§7.3's S6 row)"; §4.11 batches (1)–(4) name S4's, S6's and S7's operators |
| LC-9 | major | blueprint assignments as `assign` events at log positions 0…k; re-solves around fixed points | STANDS | §4.2 *Dossier-backed elements at creation* l. 4270–4278; §4.1 *Declarations read ahead* (item 101); S10b `PlacementRequest.fixed` |
| LC-11 | major | `{t:'epoch'}` an event in the ordered log; `EpochRecord` derived | STANDS | §4.11 l. 6002–6003 "`grow(doc, epochInputs)` appends an `epoch` event to the log and runs at that log position"; *The clock* (1) "each epoch's week is its `EpochRecord`'s" |
| LC-12 | major | survivors keep built state; explicit rate-limited events | STANDS | §4.11 *Survivors* l. 6019–6030, the ladder, churn and floor |
| LC-15 | major | the recipe holds every model-affecting input (§4 side) | STANDS | §4.7 S10b "read from `recipe.entryMode` (§2.9)"; §4.1 `elaborate` a view key, never a model input |
| LC-16 | major | people lazy from the household's key; pinned only by an explicit edit | STANDS | §4.7 S10b l. 5346–5347 "People are derived lazily from the household's key and pinned only by an explicit edit (§10.3)" |
| LC-17 | major | labels re-run globally → S13b as view data | STANDS | §4.10 l. 5988–5990 |
| SCL-3 | major | §12's per-stage split; S1's raster costs; `T` one field re-settled incrementally | STANDS | §4.2 S1 (1), (3) (32 m fBm grid; hydro grid by rung; ≈ 2 ms recompute); §4.4 S5a l. 4390–4395 |
| SCL-4 | major | first paint = complete city LOD, no preview | STANDS | §4.1 l. 3757–3762 (J-R7) |
| SCL-8 / VIS-5 | major | trees never stored; positions independent of the LOD band | STANDS | §4.9 table "trees at render" row |
| SCL-13 | major | outline / compose split (§4 side) | STANDS | §4.1's lazy list names compositions; §4.7 S11 hands fixed `quad` wings to `outline()` l. 5430–5434 |
| FTG-2 | major | plot counts per class × band; `plotShare`; S5d top-up; exact check after S10 | STANDS | §4.2 S2 *Demand in plot counts*; §4.4 S5d; §4.7 S10 *Exact capacity check* |
| FTG-3 / MFP-3 | major | S3 reservations before S4; S7b claims > 1 block before S8 | STANDS | §4.1 "Why this order (c)"; §4.2 S3 (12); §4.5 S7b (3) |
| FTG-4 | major | S5b main-road step per stage and epoch | STANDS | §4.4 S5b; §4.11 l. 6006 |
| FTG-5 | major | network-travel-cost level set with anisotropy `a` | STANDS | §4.4 S5a l. 4383–4396 |
| FTG-6 | major | `ou` / `radiusHold` / `gridLock`; crossing matrix | STANDS | §4.4 S5c l. 4440–4470 (receipt numbers) |
| FTG-7 | major | S12a before S10b; one farm table | STANDS | §4.1 "Why this order (e)"; §4.9 |
| FTG-8 | major | open traces anchored on shores; waterfront row | STANDS | §4.4 *Water and the waterfront* l. 4413–4424 |
| FTG-13 | major | ground datum `baseCm` via `deriveBase` | STANDS | §4.7 S11 *Heights* l. 5440–5443 |
| FTG-14 | major | sequential prefix-stable roster (§4 side) | STANDS | §4.2 S2 (fixed rows, `perOther` floors); §4.11 "the suffix of the sequential roster … prefix-stable" |
| MFP-2 | major | walled regimes grow district-scale secondaries only; lanes from the bent cut | STANDS | §4.4 S5c *Division of labour*; §4.6 intro |
| MFP-4 | major | N gate sites picked first, nested; one road out, one street in | STANDS | §4.2 S3 (4), (7); §4.3 *Routes*; §4.8 *Gates — exactly N* |
| MFP-6 | major | walled share ≈ 0.88–0.9; ribbon default; suburb by preset | STANDS | §4.2 S2 *Stages and the walled share*; §4.4 regime table |
| MFP-7 | major | feature-named kinds; live-in rows | STANDS | §4.5 *Typing* (with J-A72.42's plain residential identity); §4.7 S10b *Live-in* |
| IMP-8 | major | deep-interior treatment by band shares in S8 | STANDS | §4.6 *The deep-interior rule* l. 5045–5057 (shares each sum to 1.00) |
| IMP-9 | major | distributaries; polycentric nuclei with a separation floor | STANDS | §4.2 S1 (3); §4.2 S3 (1) |
| VIS-4 | major | quarter labels from the §4.5 merge tree (integration C-1) | STANDS | §4.5 *Quarters* l. 4586–4596 (`QuarterNode.cityCut`, `min(N_q, L)`) |
| VIS-8 | major | `PlotBound` treatments from the site-plan table; counted toward O17 (d) | STANDS | §4.7 S11 table and l. 5389–5391 |
| VIS-10 | major | rectangular wings with per-wing ridge axes | STANDS | §4.7 S11 l. 5430–5432 |
| MN-3 | manager-note | the measured bent-cut recipe adopted | STANDS (superseded in form) | §4.6's recipe is now items 33–41's code-read restatement (J-A34.41 … J-A40.41), which keeps MN-3's measured statistics as §13.5's targets — the disposition's substance (a measured default, not an invented one) holds |
| N-2 | major (verify) | first map as laws of B; no preview (§4 side) | STANDS | §4.1 l. 3761–3762 "No rung shows a preview; the first-map times and their knees are declared in §12.5 (J-R7)" |
| VK-3 | major (verify) | pool workers on a frozen read-only copy; overlays; `E_SCOPE`; the eager shared-edge step before the freeze | STANDS | §4.1 l. 3782–3807; §4.7 S10 (0) |
| VK-6 | major (verify) | declared and callback op forms; S5c, S8, S10 callback | STANDS | §4.1 l. 3712–3716; §4.12 `txForm` |

No disposition in §4 is WRONG. The two the paused seat marked incomplete as mechanisms (GEO-23; the carve's locality
claim) are complete in the live text.

## 4. Owner questions

None. Nothing in §4 is a money, licence, SettlementForge-boundary or product-line decision; every call this seat made is
recorded vetoably in §7.

## 5. CONFIRMED versus PLAUSIBLE

**CONFIRMED (read or executed in this seat, 2026-09-28).** The sha256 at launch and at close (§6). §4 read whole in sixteen
contiguous ranges (l. 3680–6793; every chunk boundary checked contiguous). Executed: the re-derivations of §1 (j); the block
file's generation by count-asserted substitutions (each old text found exactly once), its parse (4 blocks) and its dry
application (4/4 applied, audit not-OK 0, the three design lines and two table rows the only differences, headings and
fences unchanged); the doc checks of the dry-applied copy for the keys `4` and `Judgment calls` (scratch dc-applied.out —
see §6 for the result). Read at source: the three texts RV-pipeline-gen-2 contradicts (§4.1, §4.10, §9.1, §12.4); the reach
and hidden-share sentences (RV-1, RV-3); the seven pass-c corrections of §1 (f); the streams, fields, table files and ladder
bounds of §1 (g)–(i); the 53 dispositions of §3 at the lines cited. Every owner rule in the seat's lens traced to a
mechanism with fields, steps, tables and a bar: items 8, 16–20, 22, 24–31 and 43, 63, 67, 68, 70–72, 75–77, 80–82, 88, 101 in
§4.1–§4.12 (the trace is §1's non-findings and §3; no rule is honoured by assertion alone in §4).

**PLAUSIBLE (reasoning on the text; no engine exists).** That each mechanism defeats its failure scenario when built —
the standing status of the whole design until M0 / M1; the reference facts the pass-c items rest on (the code-readings
lane's, its Fable review landed); the §12.4 budgets §4 cites; the receipts §4 cites (fixall_pipeline_*.out — re-run by the
landed fable-review pipeline seat on 2026-09-27, not re-run here; the numbers in the text agree with its record).

**Not done here, by design of the lane:** no edit to docs/ARCHITECTURE.md, docs/ARCHITECTURE-RATIONALE.md or
docs/ARCHITECTURE-VALIDATION.md; no bundle opened; nothing outside the project read; §10, PART II and PART III (the
pipeline part's other homes) are the pipeline-content seat's; the three-copy doc-check run is the assembler's.

## 7. Judgments (vetoable — say "veto" to flip any)

| id | the call |
|---|---|
| J-RVpipeline-gen-1 | §4.6's reach weights are renormalised to sum to one after the density and rung scaling — chosen over a cap on the non-open sum with an `open` floor because it adds no parameter, keeps density and rung monotone on the hidden reaches and keeps every band's `open` share non-zero in proportion to its row (block, J-ROWS and RATIONALE-A written). |
| J-RVpipeline-gen-2 | The three small certain fixes are written as REPLACE blocks generated from the live subsections by exact substitutions (the brief's prescribed form), not routed to the repairer as the paused seat did (J-RVpg-1) — chosen because the brief names REPLACE-by-substitution as the protocol and asks the validator to write small certain fixes itself; the collision hazard (a REPLACE drops a sibling APPEND applied before it) is stated in the block file's preamble with the recovery (re-generate from the assembled text; the substitutions are the whole change). |
| J-RVpipeline-gen-3 | The text is judged WITH the bundled pass c + d + e in it (items 20 (h), 32–88, 101), because docs/lane-events.log shows it landed (assemble-r3 15:21, handfix-c/apply 16:26) and the launch sha matches handfix-c's result; the brief's "NOT yet applied" is read as stale, and no current text was found to contradict any of those items. |
| J-RVpipeline-gen-4 | The rung factor's second copy in §4.6 is folded into "the rung's factor above" inside the same REPLACE (RV-3) — chosen over leaving a duplicated table value because SINGLE SOURCE is the brief's standard and the fold costs one substitution in a block already written. |

## 8. Design impacts for other parts (not §4's to change)

| part | impact |
|---|---|
| determinism | §6.1's stream list still declares `cut.side` and `cut.farSideAlt` (2 hits each) while §4.6's recipe no longer draws them (items 36–37: the start and the far side are deterministic) — record hygiene for the stream inventory; if the determinism seat has not already retired them, they should be marked withdrawn there (§4 needs no change). |
| scope | §13.2's hidden-share bar reads the renormalised reach weights after RV-pipeline-gen-1; no test text changes, since the bar compares district shares to their targets. |
| model, kernel, rendering | none from §4. |
