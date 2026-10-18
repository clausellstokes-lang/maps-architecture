# Retrovalidation — lane retrovalidate/pipeline-gen (Fable validator; §4 Generation pipeline, whole)

Validator: Fable 5.1 (claude-fable-5-1), 2026-09-27 23:10–23:4x. Sections: §4 Generation pipeline, docs/ARCHITECTURE.md
l. 3203–5528 (§4.1–§4.12), read whole in contiguous ranges (no sample). Standard: THE STANDARD of the lane brief (owner
fidelity → parity floor → soundness → coherence → single source / no deferral), the seat's lens (S0–S14 as executable
steps; the fusion thesis as mechanism; FTG-1/2/3 and MFP-2/3; the plot model and granularity law; the placement solver
and items 16–19; the dossier flow of items 20 and 22 in S10b / S11; the evolution and decline hooks of items 8, 17, 18, 31
in §4.11; the sewer and island hooks). Candidate inputs read first and disposed below: docs/fable-review/main/pipeline.md
with blocks-pipeline.md (landed), redteam.md with blocks-redteam.md (checkpointed after geometry, mfcg, lifecycle),
model-b.md / scope.md / rendering.md (stubs, no findings). Standalone and clean-room rules kept: nothing outside
/Users/cstokes/Desktop/Maps opened; no captured bundle opened; no reference code, grammar, palette, word list or
identifier found in §4 (the reference names that appear — MFCG ward names, FTG setting names, NG's rule labels — are
public UI terms and measured behaviour, item 21 (e)). Scratch:
/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/c0d81c15-f08e-4364-97ca-c6b05aa13811/scratchpad/retrovalidation/
(index-pipeline-128.txt, redteam-blocker-major.txt, val-rows-mine.txt).

**sha256 of docs/ARCHITECTURE.md at launch:** `1c23190f040c8935532e81731dfaa7df44a7aad43033fba3a0eb0e92011af461`
(13 026 lines; the post-handfix-b/close text, the digest every landed fable-review lane records). Re-checked at the end
of the lane: unchanged (§6).

## PROGRESS

| section | planned | done |
|---|---|---|
| candidate inputs (pipeline.md, blocks-pipeline.md, redteam.md, blocks-redteam.md, model-b / scope / rendering stubs) | read whole; each finding confirmed / sharpened / dropped (§2) | done |
| owner rules (OWNER-INSTRUCTIONS, AMENDMENTS-25 1–7, AMENDMENTS-25b 8–31, DEFINITION) | read whole | done |
| pending items (27c: 20 (h), 33–47, 49, 50, 57, 63–72; 27d ruling summary and 81; 27e 101 head) | read; §4 texts checked for plain contradictions (RV-7) | done |
| §4 intro + §4.1 (l. 3203–3365) | read whole; batch table, worker, laziness contract, click policy checked | done |
| §4.2 S0–S3 (l. 3366–3780) | read whole; stage shares, gate law, separation band, market scores re-derived | done |
| §4.3 S4 (l. 3781–3838) | read whole | done |
| §4.4 S5 (l. 3839–3999) | read whole; anisotropy rows vs regime table, separation floors checked | done |
| §4.5 S6 · S7b (l. 4000–4180) | read whole; grower and quarter laws, band shares, cumulative cuts re-derived | done |
| §4.6 S8 (l. 4181–4362) | read whole; deep-interior and reach weight sums, hidden-share rows checked; §3.6 contact rule read | done |
| §4.7 S9 · S10a · S10 · S10b · S11 (l. 4363–4694) | read whole; items 16–19, 20, 22, 28 (f), 29, 30 traced to mechanisms | done |
| §4.8 S7 (l. 4695–4779) | read whole | done |
| §4.9 S12a · S12b (l. 4780–4941) | read whole; farm table arithmetic checked | done |
| §4.10 S13–S15 (l. 4942–4953) | read whole | done |
| §4.11 incremental mode (l. 4954–5496) | read whole; items 8, 17, 18, 25, 30 (e), 31 traced; carve batches read; ladder table and churn rows checked | done |
| §4.12 strategies (l. 5497–5528) | read whole | done |
| cross-checks outside §4 that §4 relies on | §1.1 bands and stage rows; §2 fields (Block.due/reach/interior, Plot.exposure, WaterBody.controls, Enceinte.moat, Castle.cityWeld, BaseWing.corners, Passage, Frontage.way); §3.6 contact rule 2; §5.2 ladder names; §6.1 stream names (24 checked); §7.6 table inventory; §12.4 S7b row; II.6 condition table; §13.2 test ids | done |
| red-team blocker/major dispositions in §4 (§3) | 44 re-checked in the live text | done |
| findings table (§1), blocks file, owner questions (§4), CONFIRMED vs PLAUSIBLE (§5), LANDED | written; logged | done |

## 1. Findings

Severity: blocker / major / minor. Kind: owner-fidelity / mechanism / coherence / single-source / deferral / parity /
regression / stale / clean-room / new-problem. Every finding is labelled CONFIRMED (read or executed) or PLAUSIBLE.
"Block" says where the correction's block is; the BLOCK PROTOCOL ruling for this lane is J-RVpg-1 (§7): in-place
substitutions go to the PIPELINE repairer (exact old text once, new text in full); the two gaps that already have Fable
blocks are applied once from the files named.

| id | severity | kind | section (exact heading) | claim | evidence | required change | owner | block |
|---|---|---|---|---|---|---|---|---|
| RV-pipeline-gen-1 | minor | stale | `### 4.5 S6 Districts, quarters and fields · S7b Allocation and district claims` — "Grower" | The illustration "≈ 7 ha at 60 ha of land, ≈ 13 ha at 250 ha, ≈ 21 ha at 600 ha" does not follow the law it illustrates: with `N_d = round(3.5 · √(A_ha / 10))`, A ÷ N_d is 60 ÷ 9 = 6.7, 250 ÷ 18 = 13.9, 600 ÷ 27 = 22.2, and √(10A)/3.5 is 7.0 / 14.3 / 22.1 — the second and third figures read ≈ 14 and ≈ 22. CONFIRMED (re-derived by script; the landed pipeline review found the same, J-Fpipe-1). | arithmetic above; docs/fable-review/main/pipeline.md "One design slip" | Two exact substitutions on the Grower sentence (l. 4025–4026): "≈ 13 ha at" → "≈ 14 ha at" and "250 ha, ≈ 21 ha at 600 ha" → "250 ha, ≈ 22 ha at 600 ha". The law is unchanged. (J-Fpipe-1 routed the same text to pass c's §4.5 editor; whichever executor lands first, the other's anchor then fails harmlessly — apply once.) | pipeline | no (substitution, J-RVpg-1) |
| RV-pipeline-gen-2 | minor | mechanism | `### 4.6 S8 Infill — the measured bent cut as a kernel transaction, per district, with the deep-interior rule` — step 8 | Rung (c) "the always-succeeding cut — a straight cut perpendicular to the longest run through its midpoint, clipped to F's own component" answers only the four-crossing failure; §3.6 contact rule 2 (l. 2839–2840) refuses a cut "passing through or within `attractCm` of a boundary vertex, grazing a reflex vertex" or touching an antenna, and the reflex pre-cut removes only reflex vertices deeper than the band's plot depth, so a shallow jog can refuse (c); rung (d)'s "a larger face reaching (d) is cut by (c) again" repeats the identical refused cut and the ladder ends in F-WORK with the face uncut — reported, never silent, but the rung's claim is false. CONFIRMED as a contradiction of two live rules (both read here); how often it fires is PLAUSIBLE (the red-team seat's ≈ 1 % per shallow reflex vertex at 50 m). | §4.6 step 8 (c)–(d); §3.6 rule 2; docs/fable-review/main/redteam.md A-redteam:geometry (c) MISSED | Apply the Fable red-team seat's block B-1 (docs/fable-review/main/blocks-redteam.md: APPEND TO SECTION §4.6 — rung (c) slides its foot along the longest run in steps of 2 · `attractCm`, alternating sides, until the contact rule passes; rung (d)'s "(c) again" is that slide; report `W_CUT_SLID`; J-Fredteam-1 with its J-ROWS and RATIONALE-A). One copy only; pass c's items 33–41 restate the steps and fold the sentence into rung (c). | pipeline | exists — blocks-redteam.md B-1 (not duplicated here) |
| RV-pipeline-gen-3 | major | mechanism | `### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base)` — "The batches", (1) | Batch (1) says "a way cut in two first hands its far part to a new way by `retypeEdges`' `rekey` on that part's `StretchRef`" (l. 5215) and nothing re-points the records that name the way by id along the far part — `Frontage.way` (§2.5 l. 855), `Bridge.way`, `Gate.way`, `Greenery.along.way`, `Junction.arms`, `Tunnel.follows`, `SeamEdge.chain`, `Portal.wayId`, `SeamAmendment.spine` — so after every canal that cuts a `lane` or `secondary` those records name the near part (a dangling reference against §5.3's reference-integrity row) or must change outside the footprint `R` against the promise "byte identity outside it, less the seam exception"; the phrase "identity exception" has 0 hits in the live text. The same holds for S1's water operator (§7.3 (b) 3), which cuts ways the same way. A lifecycle gap (the geometry path is complete, the identity path ghosts). CONFIRMED by reading l. 5215, §2.5 `Frontage`, and grep. | §4.11 batch (1); §2.5 l. 855; §3.4's `rekey` (moves role rows only — read by the landed pipeline review); docs/fable-review/main/pipeline.md A-fixall/draft-pipeline-r3 CORRECTED, J-Fpipe-2 | Apply the landed pipeline lane's block B-1 (docs/fable-review/main/blocks-pipeline.md: APPEND TO SECTION §4.11 — the same batch re-points every record naming the way along the far part; the identity exception the locality oracle admits beside the seam exception; the far part keeps the parent's name; test with §13.1's carve fixtures; J-Fpipe-2 with J-ROWS and RATIONALE-A). One copy only. Its design impacts stand as that review lists them: determinism (§7.3 (b) 3, §7.3 items 1 and 7 (ii), §7.4, §6.3's SPLIT way row), kernel (§3.3 rekey pointer), scope (§13.1 / §13.2 fixture). | pipeline | exists — blocks-pipeline.md B-1 (not duplicated here) |
| RV-pipeline-gen-4 | minor | mechanism | `### 4.5 S6 Districts, quarters and fields · S7b Allocation and district claims` — "Typing" | "A **shanty / squalid** kind is admitted only when the roster's **average band** … is `poor` or `squalid`, and only once the settlement's first half is built (`shanty.trigger`, `shanty.afterStageShare` 0.5 …); where admitted it replaces the typing of the districts of lowest mean pass-1 band, as many as its demand fills" — S6 types every district after all K stages have grown, so "once the settlement's first half is built" names no candidate set, and the replacement clause is unrestricted by stage although §4.7 S11's tents row ("after the first half of the stages"), §15.1 B13 and J-A27.43 all read the stage restriction. Two readings are possible for an implementer. CONFIRMED (the three restated texts read at l. 4050, 4572, 11138, 12863). | §4.5 l. 4049–4051; §4.7 S11 tents row; §15.1 B13; J-A27.43 | Exact substitution: "where admitted it replaces the typing of the districts of lowest mean pass-1 band, as many as its demand fills," → "where admitted it replaces the typing of the districts of lowest mean pass-1 band **among the districts of the stages whose cumulative quota share (§4.2 S2's stage rows) exceeds `shanty.afterStageShare`** (a district's stage is its `growthStage`, §2.5), as many as its demand fills,". Pass c's item 70 (d) restates this sentence's rule (the cluster arrangement); the repairer keeps the insertion a single clause so the two compose. | pipeline | no (substitution) |
| RV-pipeline-gen-5 | minor | coherence | `### 4.5 S6 Districts, quarters and fields · S7b Allocation and district claims` — "Fields" | The field is "computed in **two declared eager passes** (LC-2): **pass 1** here, from the drivers that exist after S5 …; **pass 2** at S10a …. S6's typing and S8's block bands read pass 1", and the paragraph ends "A second S6 pass applies the district-type term after typing." Three evaluations, two names: `characterOffset(district)` cannot be in the field typing reads (it depends on the typing) but must be in the field S8 reads (S6's output, "the district's pass-1 band", §4.6 l. 4186); "pass 1" therefore names two different states and the count "two" is not what the text describes — a determinism-relevant ambiguity (LC-2 wants each pass declared). CONFIRMED (l. 4058, 4065–4068, 4118, 4186). | §4.5 Fields; §4.6 l. 4186; §4.4 S5d l. 3958 ("driver-only") | Two exact substitutions. (a) "**pass 1** here, from the drivers that exist after S5 (the kernels S5d uses); **pass 2** at S10a (§4.7), adding the kernels around the noxious trades, prisons, middens and institutions the block allocation placed. S6's typing and S8's block bands read pass 1; S10 onward reads pass 2." → "**pass 1** at S6 — first the driver kernels that exist after S5 (the kernels S5d uses; S6's typing reads this driver-only state), then, after typing, the district-type term `characterOffset(district)`, which completes pass 1 (S8's block bands read pass 1 complete); **pass 2** at S10a (§4.7), adding the kernels around the noxious trades, prisons, middens and institutions the block allocation placed. S10 onward reads pass 2." (b) "A second S6 pass applies the district-type term after typing." → "Each field's district-type term is applied after typing as the last step of its pass 1, as above." | pipeline | no (substitution) |
| RV-pipeline-gen-6 | minor | mechanism | `### 4.6 S8 Infill — the measured bent cut as a kernel transaction, per district, with the deep-interior rule` — "Hidden plots, and how a court or a rear row is reached" | The reach weights are band rows summing to one, then "the non-open weights scaled by the density value (× (0.5 + density) …) and by the rung (TOWN 0.6, CITY 1.0, METROPOLIS 1.2 …)" with no rule for the `open` weight: a squalid block at density 1 in a METROPOLIS has passage 0.75 × 1.5 × 1.2 = 1.35 alone, so the three weights no longer form a distribution and `open` is undefined (negative as a remainder). The hidden-share target below is "capped at one"; the reach weights are not. CONFIRMED (arithmetic executed). | §4.6 l. 4300–4304 | Exact insertion after "(TOWN 0.6, CITY 1.0, METROPOLIS 1.2; the village rung rows are 0, PART III)": ", and the three weights then renormalised to sum to one (so density and rung raise the hidden reaches' share monotonically while every band keeps an `open` share proportional to its row's)". J-RVpg-5: renormalisation over a cap-and-floor, because it adds no parameter and keeps every row's open share non-zero. | pipeline | no (substitution) |
| RV-pipeline-gen-7 | minor | owner-fidelity (the brief's kind for texts a pending item contradicts) | several — listed | Current §4 provenance and characterisation statements that pass c's readings (docs/AMENDMENTS-2026-09-27c.md, not yet applied) show to be false, so pass c's editor texts must reach them: (1) §4.2 S2 "M-1 #5 (FTG face recovery) measures FTG's plot share" — item 49: FTG sends no lot or plot (its "lots" were lawn patches), so there is no FTG plot share to measure; (2) §4.7 S11 "the main entrance on the access edge 3 ± 1 m from the corridor (FTG's measured rule, §13.5)" — item 50: FTG's 2.99 m is a night-light anchor, the rule is the owner's (item 29); (3) §4.7 S10 (10) "NG's ≈ 42 % discard becomes 0 by construction" — item 42: the 42 % are NG's frontage-less lots, its courts, by construction; (4) §4.7 S11 compound row "(NG's walled manor compound)" — item 44: NG has no wall, gate or enclosure; (5) §4.6 recipe heading "(MN-3; `profile-neighbourhood.md` AN-6, PF-2, BG-1 — the measured default)" and step 1 "(MFCG's one elevation effect is on exactly the alleys)" — item 33: MFCG's model has no elevation field; (6) §4.8 F-CASTLE "equalise … (≤ 20 iterations), then bloat" — item 45: MFCG bloats first, then equalises toward the best-fit regular polygon; (7) §4.9 "the MFCG/VG sector look (Voronoi of ring seeds ∩ land cut by the OBB bisector, the recorded construction)" — item 57: VG and MFCG differ and neither is that construction. Rulings pass c must make, flagged so they are not missed: J-P1's "no district is zoned residential or by class" (§4.5 Typing) against item 72 (d′)'s "a plain residential kind by band" for a neighbourhood meeting no identity; §4.7 S11 mutator step 6 and §4.11's "applies the whole mutation at once" against item 67's Works timetable (drawn stages over weeks; the model's decision may stay immediate). Items 46 (coastal gate factor), 47 (grower rates), 34–41 (bent-cut steps), 70–72 are additions, not contradictions. CONFIRMED that each text is present as quoted; the readings' facts are accepted from the code-readings lane (PLAUSIBLE here, its Fable review landed). | §4.2 l. 3520; §4.7 l. 4612, 4451, 4574; §4.6 l. 4204, 4208; §4.8 l. 4747–4748; §4.9 l. 4797; §4.5 l. 4045–4046; §4.7 S11 step 6; item texts at 27c l. 56–75, 226–303, 355–393, 487–504, 841–894, 1088–1225 | None by this pass's repairer (the brief: do not demand the pending items). Pass c's editor texts, as written in docs/AMENDMENTS-2026-09-27c.md items 33, 42, 44, 45, 49, 50 and 57, are the changes; this row is the register that the retrovalidation repairer leaves those seven sentences untouched so pass c's anchors survive, and that pass c's §4.5 / §4.7 editors rule J-P1 vs 72 (d′) and the immediate-mutation sentences vs 67 explicitly. | pipeline | no (pass c) |

**Non-findings recorded so they are not re-found (all CONFIRMED by reading the cited lines).** (a) §4.11's "Tunnels
(II.6's condition table)" and the `DeclineOp` comment "the underground's ladder (II.6)" are right: II.6 (l. 11837–11975)
holds the tunnel condition table (l. 11937–11952) and II.7 itself cites "II.6's condition table" (l. 12088, 12136, 12188).
(b) Every record field §4 writes or reads is declared in §2: `Block.interior` / `reach` / `due` (l. 852–854),
`Plot.exposure` with `sealed` (l. 859), `Frontage.way` (l. 855), `Passage` (l. 876), `BaseWing.corners` (l. 953),
`WaterBody.controls` (l. 736), `Enceinte.moat` (l. 1548), `Castle.cityWeld` (l. 1553), `FieldBands.middle` (l. 849),
`builtBand` / `builtProsperity` / `geometryFloor` (l. 858), `BuildingSlot.unhoused` (l. 879), `Building.condition`,
`reusedAs`, `households`, `dwelling`, `formerUses`, `MaterialLedger`, `Enceinte.supersededBy`, `ElaborationRecord`,
`knownTo`. (c) §6.1 (l. 5758–5898) declares every stream §4 draws from — `cut.t`, `cut.side`, `cut.arc`, `cut.interior`,
`cut.width`, `cut.farSideAlt`, `gate.pick`, `alloc.district`, `alloc.block`, `plot.vacancy`, `siteplan`,
`siteplan.mutate`, `reserve.market`, `blueprint.features`, `water.delta`, `epoch.transform`, `island.place`,
`use.relocate`, `render.instances`, `district.seed`, `siting`, `forest`, `greenery`, and the `pin.centrepiece` /
`pin.decor` / `pin.stall` concerns behind §4.7's "`pin.*`". (d) Every failure ladder §4 cites (F-ROUTE, F-SITING, F-WALL,
F-RIVER, F-BUDGET-STAGE, F-PLOT, F-PLAN, F-EDIT, F-SKELETON, F-CONTOUR, F-CASTLE) is defined in §5.2. (e) §1.1's population
bands (CITY from 10 000, the `firstAtPopulation` S2 cites) and stage rows equal §4.2 S2's (shares sum to 1.00 at every
rung; walled share 0.90 / 0.88 / 0.88). (f) §4.4's anisotropy rows (1.3 / 1.8 / 4 / 3 / 8) equal the regime table's; S5c's
separation floors 120 / 160 / 200 m equal the table's "120–200 m"; the perimeter offset 50 m equals the ribbon depth
band's top. (g) §12.4 carries the S7b / S10a allocation row (l. 9640) LC-2's integration promised. (h) §4.5's quarter
law re-derives (9.1–9.6 at 1 200–1 500 buildings, 12.9–14.0 at 4 500–6 000, 16.8–17.9 at 12 000–15 000), the band
shares (1/1/20/40/20/10 → 0.011 / 0.011 / 0.217 / 0.435 / 0.217 / 0.109; cumulative 0.239, 0.674), the deep-interior
shares and the reach rows each sum to 1.00 before scaling, the gate law gives 5 / 8 / 12 / 18 at 58 / 220 / 548 / 1 274 ha
and `N₁` = 2 on [1.1, 10.2] ha, the separation band for two 29 ha nuclei is 780–1 180 m ("≈ 800–1 200 m"), and S3 (12)'s
score comparisons hold (1.5 / 0.9 / 0.85 / 0.65; harbour 1.6 at the median port, 1.3 at half, equal at ⅚). (i) The
market's `firstAtPopulation` (10 000) is the CITY floor of §1.1. (j) §4.12's "`UndergroundStrategy` after the network
stage" means II.7.2's sewer network stage (II.7.2's own title), consistent with §14 l. 11008.

## 2. Candidate inputs — confirmed, sharpened or dropped

| source | candidate | disposition here |
|---|---|---|
| fable-review/main/pipeline.md, J-Fpipe-1 | §4.5 Grower's "≈ 13 / ≈ 21" | CONFIRMED and re-derived → RV-pipeline-gen-1; routed here to the PIPELINE repairer as well as to pass c (apply once) |
| fable-review/main/pipeline.md, J-Fpipe-2 / blocks-pipeline.md B-1 | the carve's rekey identity gap | CONFIRMED in the live text (l. 5215; 0 hits for "identity exception"); severity set major (a §5.3 reference-integrity and locality-oracle failure on an ordinary edit) → RV-pipeline-gen-3; block applied once from that file |
| fable-review/main/pipeline.md, design impacts | pass c items 33–41, 46, 47, 49, 50, 57, 63–72 touch §4 | sharpened: only the texts that plainly contradict a reading are registered (RV-pipeline-gen-7); the granularity table's "FTG quad side median 10.3 m, footprint median 103 m²" is NOT registered — a building-outline anchor, not a lot measurement, so item 49 does not reach it |
| fable-review/main/pipeline.md, the 128 dispositions | all FIXED / STAGED in the live text | CONFIRMED for every blocker and major (§3); the 13 STAGED items carry concrete hooks in §4 (S7b (5)–(6), §4.11's island, tunnel, hidden and terrain kinds, §4.12's registrations) |
| fable-review/main/redteam.md, J-Fredteam-1 / blocks-redteam.md B-1 | §4.6 rung (c) under the contact rule | CONFIRMED by reading §3.6 rule 2 at l. 2839–2840 → RV-pipeline-gen-2; block applied once from that file |
| fable-review/main/redteam.md, "checked sound" items | pool scope at the wall strips; the one-click default; the quarter law | re-read: §4.8's "strip faces inherit their district", §4.7 S10 (0) both sides at once, §4.1's freeze order — hold; the quarter law re-derived (above) |
| fable-review/main/model-b.md, scope.md, rendering.md | (stubs) | nothing to dispose |

## 3. Red-team blocker and major dispositions in §4 — re-checked in the live text

The disposition claimed is docs/ARCHITECTURE-VALIDATION.md §R1.1–§R5.1's row (scratch val-rows-mine.txt); the verdict
is on the CURRENT text: is the mechanism there, and is it right. STANDS = there and right; STANDS* = there and right with
a finding above that sharpens it; WRONG = not there or not right (none).

| id | sev | disposition claimed (mechanism; home) | verdict | why (live text) |
|---|---|---|---|---|
| LC-2 | blocker | laziness contract; eager S7b / S10a allocation, two field passes; derived-complete digest over district permutations; §4.1, §4.5, §4.7 | STANDS | §4.1's contract with the write-only-inside-own-faces rule, S8 eager with the portal exception, S13a eager; §4.5 S7b and §4.7 S10a eager; §5.3 l. 5702's permutation digest; S10b reads block allocations, never another district's placed plots |
| FTG-1 | blocker | as LC-2 | STANDS | as LC-2 |
| GEO-13 | major | displacement clamped to 0.8 × local feature size; non-zero union repair; §4.2 S1 (2) | STANDS | present, with the `spine` reader for the feature size and the typed loops |
| GEO-14 | major | vector coast authoritative, ± 10 cm ramp, contours §8.2's relief tier clipped; §4.2 S1 (2) | STANDS | present (F-CONTOUR pointer) |
| GEO-16 | major | routes unioned on the lattice, chains smoothed and inserted once; §4.3 | STANDS | present, with the 8 m graph merge and the 26 cm attraction |
| GEO-17 | major | pinned bank-to-bank decks; S4 routes to deck ends as fixed edges; §4.2 S1 (5), §4.3 | STANDS | present; the four deck cases (site, extra bridge, before-water, carve) each named |
| GEO-18 | major | trace before growth, gates pinned, topology-preserving simplification; §4.4 S5a, §4.2 S3 (9) | STANDS | stage 1 one construction at S3; k ≥ 2 boundary → S5b → trace |
| GEO-19 | major | water carved at S3 before S4; later carves by the conversion path; §4.2 S3 (10), §4.11 | STANDS | present; outer moats by S5a's carve at L1-only time |
| GEO-20 | major | one kerb function, S9 commits S8's kerbs; §3.7, §4.6, §4.7 | STANDS | §4.6 intro and the Hausdorff-0 contract test |
| GEO-21 | major | cut ends extended to the crossed spine as T-junctions; §4.6 step 7 | STANDS | present, with the strip-line exception |
| GEO-22 | major | sides as runs; perpendicularity on chords or a ± 5 m window; §4.6 | STANDS | present (pass c's items 36–37 change steps 3–5 but keep the runs) |
| GEO-23 | major | reflex pre-cut; always-succeeding clipped cut; substitution ≤ 2 × band; §4.6 step 8 | STANDS* | present; rung (c) needs the slide of RV-pipeline-gen-2 to be always-succeeding in fact |
| GEO-24 | major | per-frontage regions by straight skeleton; strips never leave their region; §4.7 S10 (4)–(5) | STANDS | present, with the F-SKELETON downgrade path |
| GEO-25 | major | lanes decided in S8's district batch; S10 never writes L1; §4.6, §4.7 S10 (9), §4.1 | STANDS | present three times consistently |
| GEO-26 | major | row footprint = plot ∩ frontage band, one L4 batch per block; §4.7 S11 | STANDS | present, with the `quad` wing and the first carry |
| GEO-27 | major | built-face legality in epoch growth; §4.11 | STANDS | present |
| GEO-29 | major | S13 split: S13a model (names in §6.3's cases), S13b view data per zoom stop; §4.10, §9 | STANDS | present |
| GEO-30 | major | PART II rule (3) | (PART II — not this seat's) | — |
| LC-6 | major | cuts once per town from roster shares; hysteresis on the recorded band; §4.5 | STANDS | present; the brush never moves cuts; `FieldBands.middle` recorded |
| LC-12 | major | survivors keep built state; explicit rate-limited events; §4.11 | STANDS | present as the wealth ladder with due mark, churn and floor |
| LC-15 | major | the recipe holds every model-affecting input; §2.9, §7.6 | STANDS (§4 side) | §4.7 S10b reads `recipe.entryMode` from §2.9 |
| LC-17 | major | labels re-run globally → S13b as view data; §4.10 | STANDS | present |
| SCL-2 | blocker | static indexes rebuilt at stage end; §3.3 (kernel) | STANDS (§4 side) | §4.1: partitions rebuilt "as §3.3 states"; S10 (0) ends like a stage |
| SCL-3 | major | §12's per-stage split; S1's raster costs | STANDS (§4 side) | §4.2 S1 (1)/(3): 32 m fBm grid, hydrology grid by rung, ≈ 2 ms recompute; T ≈ 4 ms |
| SCL-4 | major | first paint = complete city LOD, no preview; §4.1 | STANDS | present (J-R7) |
| SCL-8 / VIS-5 | major | trees never stored, positions independent of the LOD band; §4.9 | STANDS (§4 side) | the "trees at render" row: keyed by entity and instance ordinal, LOD-independent |
| SCL-13 | major | outline / compose split; §2.6 | STANDS (§4 side) | §4.1's lazy list names compositions; S11 hands fixed `quad` wings to `outline()` |
| FTG-2 | major | plot counts per class × band; plotShare; S5d top-up; exact check after S10; §4.2 S2, §4.4, §4.5, §4.7 | STANDS | present, with the refit fallback and the band cuts that make capacity = demand |
| FTG-3 / MFP-3 | major | S3 reservations before S4; S7b claims > 1 block before S8; §4.2 S3, §4.5 S7b (3) | STANDS | present, strips excluded from claims |
| FTG-4 | major | S5b main-road step per stage and epoch; §4.4, §4.11 | STANDS | present |
| FTG-5 | major | network-travel-cost level set with anisotropy `a`; §4.4 S5a | STANDS | present, one field `T` re-settled incrementally |
| FTG-6 | major | `ou` / `radiusHold` / `gridLock`, crossing matrix; §4.4 S5c | STANDS | present with the receipt's numbers |
| FTG-7 | major | S12a before S10b; one farm table; §4.9, §4.1 | STANDS | present; farm modes decided from rung, climate and relief only |
| FTG-8 | major | open traces anchored on shores; waterfront row; §4.4 | STANDS | present |
| FTG-13 | major | ground datum `baseCm` via `deriveBase`; §4.7 S11 | STANDS | present; towers, decks and piers carry datums (§4.8) |
| FTG-14 | major | sequential prefix-stable roster; §10.2 | STANDS (§4 side) | §4.2 S2's fixed rows and `perOther` floors; §4.11's suffix delta |
| MFP-1 | blocker | figure-ground contract; §8.5 | STANDS (§4 side) | §4.7 S9 declares streets as geometry and defers the look to §8's contract |
| MFP-2 | major | walled regimes grow district-scale secondaries only; lanes from the bent cut; §4.4 S5c, §4.6 | STANDS | present |
| MFP-4 | major | N gate sites picked first, nested; one road out, one street in; §4.2 S3 (4), §4.3, §4.8 | STANDS | present; the record's "N = 0 sealed without a postern" superseded by S3 (7)'s harbour gate (J-P35, J-P45), as the landed review noted |
| MFP-6 | major | walled share ≈ 0.88–0.9; ribbon default; suburb by preset; §4.2 S2, §4.4 | STANDS | present; shares re-derived |
| MFP-7 | major | feature-named kinds; live-in rows; §4.5, §4.7 S10b | STANDS | present (J-P1 to be re-ruled against item 72 (d′) by pass c, RV-7) |
| IMP-8 | major | deep-interior treatment by band shares in S8; §4.6 | STANDS | present, shares sum to one |
| IMP-9 | major | distributaries; polycentric nuclei; §4.2 S1 (3), S3 (1) | STANDS | present, with the separation floor and the merge rule |
| VIS-8 | major | `PlotBound` treatments from the site-plan table; §4.7 S11 | STANDS | present, counted toward O17 (d) |
| VIS-10 | major | rectangular wings with per-wing ridge axes; §4.7 S11, §2.6 | STANDS | present |
| GEO-42 | minor (re-checked because it bounds S8's writes) | continuation forbidden across district-boundary edges; §4.6 step 10 | STANDS | present |

No disposition in §4 is WRONG; two (GEO-23 via RV-pipeline-gen-2 and the carve's locality claim via RV-pipeline-gen-3)
are right as dispositions and incomplete as mechanisms, with their blocks already written by Fable seats.

## 4. Owner questions

None. Nothing found in §4 is a money, licence, SettlementForge-boundary or product-line decision; every call made here
is recorded vetoably in §7. (The pending items' owner decisions — 27d's Q1–Q6 — are the plan seat's, not §4's.)

## 5. CONFIRMED versus PLAUSIBLE

**CONFIRMED (read or executed in this seat, 2026-09-27).** The sha256 (unchanged at close, §6). §4 read whole in nine
contiguous ranges (l. 3203–5528; the chunk boundaries fall mid-sentence and were checked contiguous). Executed
re-derivations: the stage shares' sums, the gate law at four areas and the `N₁` = 2 range, the two-nucleus separation
band, S3 (12)'s score comparisons, the band shares and cumulative cuts, the quarter law at six building counts, the
grower's illustrative sizes (RV-1), the deep-interior and reach rows' sums and the scaled reach overflow (RV-6), the
farm table's per-head arithmetic (0.25 ha of coppice per head — an import in every frame, as §4.9 says). Read at source:
§3.6 contact rule 2 (RV-2's premise); §4.11 l. 5215 and the 0-hit grep for "identity exception" (RV-3); the shanty
staging texts at four places (RV-4); the pass wording at l. 4058–4118 and 4186 (RV-5); the seven pending-item texts and
their 27c items (RV-7); every non-finding of §1 (fields, streams, ladders, tables, bands, pointers). The 44 dispositions
of §3 against the live mechanisms. Every owner rule in the seat's lens traced to a mechanism with fields, steps, tables
and a bar: items 8–20, 22–31 and AM-1/AM-3/AM-5/AM-6 in §4.1–§4.11 (the trace is the reading in §1's non-findings and
§3; no rule is honoured by assertion alone in §4).

**PLAUSIBLE (reasoning on the text; no engine exists).** That each mechanism defeats its failure scenario when built —
the standing status of the whole design until M0 / M1; the red-team seat's ≈ 1 % estimate of how often rung (c) is
refused; the completeness of the way-id record list in RV-3's block (the landed review's grep, accepted); §12.4's sums
(rendering's); the reference facts the pending items rest on (the code-readings lane's, its Fable review landed); the
J-P49 winding-number argument and the six pipeline receipts (accepted from the landed pipeline review, not re-run here —
the design texts they support were re-read and their numbers agree).

**Not done here, by design of the lane:** no edit to docs/ARCHITECTURE.md, docs/ARCHITECTURE-RATIONALE.md or
docs/ARCHITECTURE-VALIDATION.md; no block written (J-RVpg-1); no bundle opened; nothing outside the project read;
PART II / PART III and §10 (the pipeline part's other homes) are other seats' — GEO-30 and LC-18 are left to them.

## 6. Close

sha256 of docs/ARCHITECTURE.md at close, re-computed by `shasum -a 256` after §1–§5 were written:
`1c23190f040c8935532e81731dfaa7df44a7aad43033fba3a0eb0e92011af461` — equal to the launch digest, so the document did not
change under the lane (CONFIRMED).

## 7. Judgments (vetoable — say "veto" to flip any)

| id | the call |
|---|---|
| J-RVpg-1 | In-place corrections (RV-1, -4, -5, -6) go to the PIPELINE repairer as exact single-occurrence substitutions, not as REPLACE blocks from this seat — chosen over writing REPLACE blocks because apply-blocks.py applies block files in basename order and a REPLACE of §4.5 or §4.6 would drop (audit LOST) any sibling APPEND applied before it from the model, kernel or determinism seats' files, which sort before "blocks-pipeline-gen.md"; the repairer generates the REPLACE last from the live subsection. Consistent with the landed pipeline review's J-Fpipe-1. |
| J-RVpg-2 | RV-2 and RV-3 are not duplicated as blocks; the Fable-written blocks in blocks-redteam.md and blocks-pipeline.md are applied once — chosen over copying them here because two copies in the assembler's set would double-apply an APPEND. |
| J-RVpg-3 | Texts that pending items 33, 42, 44, 45, 49, 50, 57 contradict are one consolidated minor register (RV-7) applied by pass c, not by this pass's repairer — chosen over seven repair findings because the brief says not to demand the pending items, and over silence because the repairer must not touch those sentences (pass c's anchors). |
| J-RVpg-4 | RV-3 is graded major (the landed review left it ungraded) — chosen because a canal that cuts a lane is an ordinary M3a edit and leaves §5.3's reference-integrity row false or the locality oracle's byte-identity promise false on every such edit; not a blocker because the fix is a stated, bounded batch rule whose block exists. |
| J-RVpg-5 | RV-6 renormalises the three reach weights after scaling — chosen over a cap on the non-open sum with an `open` floor because renormalisation adds no parameter, keeps density and rung monotone on the hidden reaches, and keeps every band's `open` share non-zero in proportion to its row. |
| J-RVpg-6 | The granularity table's "FTG quad side median 10.3 m, footprint median 103 m²" cell is NOT registered under item 49 — chosen against the landed review's design-impact note because the cell anchors on building outlines, which FTG does send, not on its lawn-patch "lots"; pass c's §4.7 editor may still re-source it. |

## 8. Design impacts for other parts (not §4's to change)

| part | impact |
|---|---|
| determinism | RV-3's block asserts what §7.3 (b) 3, §7.3 items 1 and 7 (ii), §7.4 and §6.3's SPLIT way row must state (the landed pipeline review's table); the determinism seat's blocks-determinism.md already APPENDs to §7.3 / §7.4 — check they carry the identity exception. |
| kernel | §3.3's rekey sentence gains the pointer to §4.11's identity exception (RV-3). |
| scope | §13.1 / §13.2 carve fixture for RV-3's test; §14's `@plat/tables` line (l. 10931–10934) names `wealthLadder.json` but not the decline table's file, which §7.6 l. 7255 lists — record hygiene. |
| model | none — every field §4 relies on is declared (§1 non-findings (b)). |
| rendering | none from §4 (item 68's light model and item 54's under-copy are pass c's). |
