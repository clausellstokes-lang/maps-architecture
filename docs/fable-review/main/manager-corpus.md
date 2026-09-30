# Fable review — lane fable-review/main/manager-corpus (2026-09-27)

Reviewer: Fable 5.1 — the Fable touch the six queue rows below waited for. Rows: A-M1, A-M2, A-corpus-preview/synthesis,
B-corpus-preview/plan, B-corpus-preview/look, B-corpus-preview/history (every PENDING row of docs/FABLE-REVIEW-QUEUE.md
whose id matches the lane's patterns; grep run at the start, six matches, none added since). Sections owned:
docs/PROGRESS.md (judgment rows, append only), docs/CONFIDENCE.md, partitioned/corpus-preview/. Design corrections
would be blocks in docs/fable-review/main/blocks-manager-corpus.md — this review needed none (0 blocks; the file says why).
Re-derivation scripts and their outputs: /private/tmp/claude-502/-Users-cstokes-Desktop-Maps/c0d81c15-f08e-4364-97ca-c6b05aa13811/scratchpad/fable-review/
(`mfcg_rederive.py` → `mfcg_rederive.out`; `ftg_degrees.py` → `ftg_degrees.out`, `ftg_degrees_nevervalley.out`;
`ftg_analyse.out` from research/ftg-capture/analyse_layout.py). Queue statuses and the `> PENDING FABLE REVIEW` marker
lines are the close seat's to change; this review does not touch them.

Standalone rule kept: nothing outside /Users/cstokes/Desktop/Maps was opened. The corpus itself
(~/Desktop/settlement-engine/map-corpus) is therefore NOT re-readable by this seat; every corpus-side figure below is
accepted on the lanes' quoted script output and marked so. Everything computed from our own files (the lanes' saved raw
data under partitioned/corpus-preview/look-data/, the MFCG sweep exports, the two decoded FTG payloads — protobuf data
files, not bundles) was re-derived by execution.

## PROGRESS ledger (one line per row)

| row | state |
|---|---|
| A-M1 (J18–J51) | done |
| A-M2 (J52–J74) | done |
| B-corpus-preview/look | done |
| B-corpus-preview/plan | done |
| B-corpus-preview/history | done |
| A-corpus-preview/synthesis | done |

## Verdict table

| row | verdict | one-line reason | corrections made |
|---|---|---|---|
| A-M1 | CORRECTED | Every stand-in judgment J18–J29 stands: the counts, units and mappings behind them re-derive (fix-all r5 = 20 minor / 0 major; the 11 477-line pre-consistency archive; the MFCG JSON is metres by the 225 m² median footprint and 58 ha walled area at size 40; TOWN/CITY/METROPOLIS = sizes 40/80/130 = 1 475 / 5 242 / 13 091 buildings, carried by §1 and §12 of the design); J27–J28's re-grounding of amendments 8, 19 and 23–27 in MFCG/FTG behaviour is in the design at its homes and its cited evidence spot-checks; J30–J51 are Fable's own rows. What is corrected is the record: the hand log is silent from 2026-09-26 03:17 to 2026-09-27 04:29 and from 04:29 to 17:14 (the judgment rows and docs/lane-events.log are the record for those windows), two rows carry the id J46, and the owner-facing plain estimates (about 85 / 70 / 65–70 % and two in three) were never entered in the ledger. | docs/PROGRESS.md J81 (appended) |
| A-M2 | CORRECTED | J52–J74 stand: each owner-rule recording (items 63–72 and 20 (h) of docs/AMENDMENTS-2026-09-27c.md) was read against the item text as written and against the landed files (the code critic's 37 claims = 33 CONFIRMED / 4 CORRECTED / 0 REJECTED; the hand-fix list = 31 = 2 major + 29 minor; the 13 028-line pre-hand-fix archive; no GPL wording in the design; item 28 (f) present in the model blocks). One wording correction: J65's item 70 (d) writes "outside the enceinte" into FTG's emulation default, where the design holds the extramural preference as our own extension (§4.5, J-A27.43, weight 0.6, zero in the parity presets). | docs/PROGRESS.md J82; a review section appended to docs/AMENDMENTS-2026-09-27c.md for pass c's editors |
| B-corpus-preview/look | CORRECTED | Every competitor measurement re-derives from look-data/comp_measure.json to the decimal, the holdout-free band recomputation (q2.out), the 64-plate roster check (sample.out) and the resolution control (rescontrol.json) hold, and the design's role hex values are the ones the lane measured. Its §2.1 sentence "on the hand axes every competitor is measurably outside the target" is wrong for FTG (wash inside the band on 6 of 6 frames, median 3.36) and FM (grain 0.33 and wash 0.12 above the band tops): the ruler separates flat maps from textured ones, not hand from machine. | review section appended to partitioned/corpus-preview/look.md |
| B-corpus-preview/plan | CONFIRMED | MFCG footprint rectangularity 0.912 / 0.946 / 0.964 / 0.977 at sizes 24 / 40 / 80 / 130, the ≥ 0.90 shares, elongation 1.46–1.49 and the footprint medians 225–339 m² reproduce exactly from the sweep JSON; FTG's street-edge X : T 0.39 and whole-graph 0.58 reproduce exactly, and the second payload (Nevervalley) gives 0.43 / 0.52; the four prior-art errors check at _critic-os C3, C9, C12 and os-model's seven scoring ward classes; the design already carries FTG's 36.4 % four-way share (§13.5), so the lane's "carry forward" is satisfied; the grain analogue reproduces in direction (its exact value is definition-dependent by about ± 25 %). | review section appended to plan.md (stale line numbers, the subgraph caveat, the n = 2 figure) |
| B-corpus-preview/history | CONFIRMED | The method held (no plate viewed, the integrity gate re-run on a copy, incidental exposure declared and nothing adopted); the 28-row scoreboard recounts to 13 / 2 / 7 / 5 / 1; the five rules "contradicted as stated" were re-worded by amendments 8 (c), 19 (a) and 23–25 (J27–J28) and stand in the design as tendencies and options; 9c (heights scale with prosperity) is an owner rule and a reconciliation-stage item; the registry's counts and record ids are accepted on the lane's script output because this seat may not open the corpus. | review section appended to history.md |
| A-corpus-preview/synthesis | CORRECTED | "No ruled figure moves" is CONFIRMED against docs/CONFIDENCE.md §1 (unchanged) and by re-running the partition grep (0 hits in six design files; the four hits in 27c are item 69, the owner-opened palette exception); the texture correction re-derives exactly; the first "exceed" figure (about 60 %) is PLAUSIBLE and its arithmetic holds. Corrected: the file sets the stand-in manager's plain estimates (85 / 70 / 65–70 %) beside the ruled ranges (0.77–0.83 / 0.78–0.83) as "two yardsticks" without saying what each measures — labelled here for the owner: the plain figures are product-level estimates carried in workflows/07's brief, not rulings; CONFIDENCE.md §1 is the figure of record. The metropolis-grain disagreement resolves toward the plan lane on my re-derivation. | review section appended to CONFIDENCE-PREVIEW.md; a pointer section appended to docs/CONFIDENCE.md; docs/PROGRESS.md J83 |

---

## A-M1 — the main session's judgments on Opus 5.5 as manager, 2026-09-25 15:40 onward (J18–J51)

**Scope as found.** The stand-in span is J18–J29 (15:46 EDT 2026-09-25 to about 04:50 2026-09-26) plus the lane choices
in the hand log from 15:46 to 03:17. J30–J51 carry the attribution "(Fable manager)" and coincide with the ledger's
record that Fable answered probes again at 14:47 on 2026-09-26 (J31; docs/CONFIDENCE.md §9's header names its judge seat
"Fable 5.1", 2026-09-26). The review brief's outage window ("15:30 to about 2026-09-27 01:00") is loose on this point;
the ledger's own attribution governs. I read J30–J51 as well, as a second look; none needed a change.

**What I re-derived (CONFIRMED by execution in this seat).**
- J29's counts: docs/validation/fix-all/still-open-r5.json holds 20 items, all `minor`; the archive
  docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md has 11 477 lines. The five fix-all rounds and the corpus preview
  landed in the order J26 states (docs/lane-events.log: fix-all verify-scope-r3 00:05, corpus-preview/plan 00:20, look
  00:23, history 00:34, synthesis 00:44; fix-all r4 drafts from 00:32 — two lanes each until the preview landed).
- J19's units: in captures/mfcg/exports-sweep-2026-09-25/size-40.json the median footprint area is 225.1 m² and the walled
  area 58.17 ha when the coordinates are read as metres (my script; stats.json agrees). Read as 4 m units those would be
  3 600 m² per house and 930 ha inside the wall — absurd — so "the JSON is metres" stands on the areas alone, independently
  of the roadWidth 8 : SVG stroke 2 ratio the sweep README cites. ARCHITECTURE-VALIDATION.md rows MFP-5 FIXED with the
  speed bars re-anchored (57 / 131 / 156 ms at sizes 40 / 80 / 130) — the recomputation J19 ordered happened.
- J20's mapping: the sweep gives 411 buildings at size 24 (the row's "size 25 ≈ 411"), 1 475 at 40, 5 242 at 80 and
  13 091 at 130; docs/ARCHITECTURE.md carries "MFCG size 40 / 80 / 130" in the §1 rung table (lines 224–226) and the
  matched counts in §12 (lines 9519–9521) and the gate law "5 / 8 / 12 gates at sizes 40 / 80 / 130" (line 3607).
- J25's partition: grep of docs/ARCHITECTURE.md, DEFINITION.md, AMENDMENTS-2026-09-25b.md, CONFIDENCE.md,
  ARCHITECTURE-RATIONALE.md and ARCHITECTURE-VALIDATION.md for the corpus path, plate ids, instrument names, record-id
  prefixes and the palette centroids: 0 hits in every file. All four preview files state that GENERATION-SPEC.md and
  MORPHOLOGY-PLAN.md were not opened; the look lane's sample.out reports 64 plates, 0 duplicates, 0 holdout hits.
- J27 and J28: the design carries amendments 23–27 at the homes its landing table names (lines 154–158), each with its
  reference baseline — §7.6's emulation-first defaults with `provenance.source` and the `MFCG` / `FTG` parity presets
  (J-A23.71); §4.2's markets ("MFCG's central plaza doubles as its market … secondary plazas, rarer since 0.9.2; FTG …
  two in its captured city") with the principal market's trade-convergence score at S3 (12); §4.11's decline table whose
  rows "are tendencies — weights and chance, no fixed order (AM-23)" and the strike lottery (J-A8.41), and its
  `TerrainWaterOp` (`reclaim`, `siltReach`, `shiftCourse`, `digCanal`) at the slowest persistence rate (J-A25.41); §4.9's
  `FarmModeRow` (J-A26.43); §4.5's six-band set declared equivalent to FTG's lifestyle tiers with FTG's captured weights
  1 / 1 / 20 / 40 / 20 / 10 and MFCG's ward classes, with FTG's shanty trigger as the default and the extramural preference
  as our extension (J-A27.43); materials a rendering attribute only (J-A19.42). J28's evidence spot-checked at source:
  os-model.md's `Market` ward (a hard exclusion against bordering another market; two Market slots in the 36-slot deck),
  mfcg-posts-b.md 79147510 (0.9.2: "much fewer secondary plazas"), ftg-payload-visual.md (two market squares in the
  captured city), ftg-docs-params.md (the shanty rule and the six lifestyle tiers with the captured weights). No corpus
  content entered: the amendments' baselines cite MFCG and FTG only (0 corpus traces, above).
- J23 and its reversal: docs/ARCHITECTURE.md §17.1 reads "No code from TownGeneratorOS (GPL-3) … is read for
  implementation, ported or paraphrased (J-A21.01)" and D-22 / §17.3 keep the private default; nothing was adapted in the
  window between J23 (2026-09-25 20:32) and J49 (2026-09-27 ~01:20).

**Row by row.** J18 CONFIRMED (the owner directed "run the rest on Opus 5.5"; the stand-in marking and the queue are the
mechanism this review runs on). J19 CONFIRMED (re-derived above). J20 CONFIRMED (re-derived). J21 owner rule, recorded
faithfully. J22 CONFIRMED (the parallel fix-architects plus one integrator delivered 0 blocker / 0 major after five rounds
— the outcome J29 records; the alternative, one reviser over ≈ 280 items, had already stalled). J23 CONFIRMED as of its date
and superseded by J49 — the ledger records both; no correction needed. J24 CONFIRMED (J29 executed it). J25 CONFIRMED
(method held: read-only, map-corpus only, SettlementForge's own map design unread, the holdout untouched, outputs walled
off; the history lane's declared incidental exposure to passages about SettlementForge's own modules inside required
documents adopted nothing — see the history row). J26 CONFIRMED (the 2 + 2 split is in the lane events). J27 CONFIRMED —
the owner asked "should any of these change the design now?" and the answer removed only our own over-strong universals,
then J28 grounded every replacement in MFCG/FTG behaviour at the owner's word; the design text at the homes agrees.
J28 CONFIRMED (evidence spot-checked above). J29 CONFIRMED (counts re-derived). J30–J51 (Fable's own) CONFIRMED on reading;
J31's "Fable is available again" is borne out by the Fable-attributed seats that followed (consistency validate 19:09,
the Dwellings ruling in CONFIDENCE.md §9).

**Lane choices after 15:40 (hand log 15:46–03:17).** Pre-running the seven red-team lenses as standalone stand-ins with
their exact saved prompts so the workflow resumed from disk; leaving slots empty "by choice (nothing that lands without
rework before revise)"; resuming 03 with `standInPhases`; superseding 03's loop and 04 with 06-fix-all; running the fix-all
at 2 lanes beside the 2-lane corpus preview; the 4-lane cap held in every logged state. CONFIRMED as sound management under
the owner's rules and the efficiency standard.

**The owner-facing plain estimates.** workflows/07-corpus-preview.js's brief carries "the manager's plain estimate: about
85 % we match what their maps do, about 70 % we match how they look, about 65–70 % we match their speed and simplicity,
about two chances in three overall". No judgment row records these figures and they are not CONFIDENCE.md's (0.77–0.83
functional, 0.78–0.83 visual per reference). They are the stand-in manager's product-level estimates for the fused base
as designed, given to the owner in chat. Fable verdict: PLAUSIBLE as estimates, not rulings; CONFIDENCE.md §1 (parity per
reference as recorded) and D-5's acceptance test (the owner's eye plus the parity numbers) are the figures of record;
recorded as J81 so the record is complete. This is a labelling correction, not a re-ruling of any number.

**Record defects (corrected by J81).** (1) The hand log has no entry between 2026-09-26 03:17 and 2026-09-27 04:29 and
one entry (04:29) before 17:14, although the judgment rows J29–J74 and docs/lane-events.log cover those windows in detail.
(2) Two rows carry the id J46 (the Fable manager's completion row and the Fable judge's ruling row, the latter appended
after J80); J81 names the second J46b for citation. Neither defect changes a decision.

## A-M2 — the main session's judgments on Opus 5.5 as manager, 2026-09-27 ~04:30 to 15:10 (J52–J74)

**What I re-derived (CONFIRMED).**
- J52: docs/ARCHITECTURE.md has no GPL-3 wording beyond §17.1's exclusion sentence and the CGAL licence notes; item
  28 (f) is present in docs/validation/amendments-b/blocks-model.md (19 mentions of the interior ladder / 28 (f)).
- J53: research/findings/_critic-code.md §3 has 37 rows: 33 CONFIRMED, 4 CORRECTED (R-M8 wording, R-V6, R-V7, R-T1 count
  word), 0 REJECTED — as J53 states. Its quote of docs/AMENDMENTS-2026-09-27c.md's counts ("13 ADOPT, 18 KEEP OURS,
  15 CALIBRATE") is faithful to the file; a mechanical count of the ruling column gives ADOPT 13, CALIBRATE 15 and
  KEEP OURS 16, so the file's own tally is off by two on KEEP OURS — the code/impact reviewer's row, noted for them.
- J63: docs/validation/amendments-b/closing-report.md §2 lists 31 fixes, 2 major (VP3-01 = VD3-02 and VD3-01 = VP3-02, the
  dossier-roster household bar) and 29 minor; docs/archive/ARCHITECTURE-pre-handfix-b-2026-09-27.md has 13 028 lines
  (the pre-amendments-b archive has 9 667 — the row says 9 668; a newline count, not a substance difference).
- J54–J73 against items 63–72 and 20 (h) as written (docs/AMENDMENTS-2026-09-27c.md lines 665–1225 and 1226–1276, read
  in full): every row summarises its item faithfully — item 63's three modes and the front's two designations (J54); item
  64's geometric gate × class-band probability × concealment multiplier × sewer existence, the cellar staying a cellar
  (J55); item 65's four requirements of an undercity, the 1–3 bound by tier, the buried-old-town source and (c′) the
  shadow-not-a-second-city clauses (J55, J57, J58); item 66's closure in dependency order with ownership (J56); item 67's
  Works records with the stage lists and the class × size × material × prosperity × season durations (J59); item 68's
  accumulated-light model, (c′)'s radial default with the shadow length d · h ÷ (H − h) — similar triangles, exact — and
  (d′)'s underground lighting (J60–J62); item 69's palette targets (J64); item 70's tenure and cluster arrangement (J65);
  item 71's class-mix weights and prime-frontage placement (J66); item 72's character vector, (d′) distribution column and
  quarter identities, (d″) two dials and significance, (d‴) neighbourhood bounds, (d4) the economy dial by market share
  with no rank bonus, (d5) partitioned amplification (J67–J71, J73).
- J64's palette numbers against the look lane's raw data: paper 226–244 / 235 and warmth 36, ink luma ≤ 45 with warmth
  about 20, chroma 18–70 / 43 are the corpus's published targets; the holdout-free data behind them (q1.out, q2.out): the
  strongest cohort (n = 60) has ink luma median 34.95 and chroma median 43.95, ink warmth median 21.0 over 260 plates, and
  the HF-1 reference cohort (n = 43) has paper luma p5 224.6, median 235.7, p95 242.7 — consistent with the published
  band and target within 1.5 L. The corpus's "L" is 8-bit luma, not CIELAB L* (#F6EDDE measures 238.0 in the lane's own
  output and by the Rec. 601 formula), so item 69's "8-bit sRGB luma" is the right unit.
- J67's scope and J72's rule: the resume (J75) and HANDOFF 6h honour both; the survey read the dossier only.

**Row by row.** J52 CONFIRMED. J53 CONFIRMED (the 27c tally slip is the file's, flagged to its reviewer). J54 CONFIRMED.
J55 CONFIRMED. J56 CONFIRMED. J57 CONFIRMED with a wording note for pass c: item 65 (c) says an undercity "exists only in
cities and metropolises (rarely a large town)" and in the same breath bounds "at most one in a large town" — one rule
should be written: cities and metropolises; a large town only where a void source exists, rare. J58 CONFIRMED. J59
CONFIRMED. J60 CONFIRMED — the flagged interpretation (shadows on by default in the lit styles, the ink parity style
keeping its under-copy) stays the program's vetoable default; pass c applies it as such. J61 CONFIRMED (the formula is
exact). J62 CONFIRMED. J63 CONFIRMED (re-derived). J64 CONFIRMED (re-derived; the chroma placement in the band's lower
range for the `ink` family is a defensible reading of "constraint" — vetoable: the owner may prefer the median for the
default too). **J65 CORRECTED (wording, J82):** item 70 (d) states "FTG's staging rule kept as the emulation default —
shanty clusters appear in the second half of the growth stages, outside the enceinte, where the average band is squalid or
poor". FTG's rule (ftg-docs-params.md: shanty towns "replace residential (lower class) districts when the average lifestyle
is squalid or poor … only after the first half of the settlement") says nothing about the enceinte; the design already
holds the extramural preference as OUR extension (§4.5: the `shanty` kind's `extramural` relation row, soft,
`extension: true`, weight 0.6, zero in the parity presets, J-A27.43). Pass c's editor must write item 70 (d)'s default as
FTG's trigger and staging and its placement preference as the extension row it already is, or the parity presets would
carry a rule FTG does not have. J66 CONFIRMED. J67 CONFIRMED. J68–J71 CONFIRMED. J72 CONFIRMED (a self-reported breach,
corrected the same quarter-hour, with a rule that prevents it). J73 CONFIRMED. J74 CONFIRMED (the state HANDOFF 6h
describes is the state the Fable session found at 17:14).

**The stand-in rows of 09 (repairs, validator, closing) and 11 (critic, impact).** Those rows have their own ids and area
reviewers (the amendments-b/hand-fix part seats and the code seat); this review checked only the outcomes the manager's
rows quote (above) and cites those seats for the content.

## B-corpus-preview/look — partitioned/corpus-preview/look.md

**Method (CONFIRMED on the file's own evidence and its saved data):** read-only, map-corpus only, GENERATION-SPEC.md and
MORPHOLOGY-PLAN.md unopened, instruments copied and run from the scratchpad, 64 non-holdout previews viewed with a script
check against the 53-plate roster (sample.out: "sample n 64 dupes 0 holdout hits []"; viewnotes.md names 64 ids), no
lettering reproduced. The corpus itself is not re-readable by this seat; the corpus-side figures are accepted as quoted.

**Re-derived from look-data/comp_measure.json (39 frames: MFCG 7, VG 8, NG 8, FTG 6, FM 10) — every cell of §1.3 holds:**

| axis | MFCG (mine / lane) | VG | NG | FTG | FM |
|---|---|---|---|---|---|
| paper L | 197.6 on 7/7 / 197.6 | 196.2–232.0, median 204.6 / "196–232, median 205" | 196.9 / 196.9 | 199.2–221.1 / "199–221" | 195.2–196.3 / 195.2 |
| ink L | 25.1–42.8 / "25–43" | 18.7–26.0 / "19–26" | 53.6–65.0 / "54–65" | 61.8–69.6 / "62–70" | 47.4–75.0, median 69.85 / "47–75, median 70" |
| chroma | 16.3–18.6 / "16–19" | 26.5–43.3 / "26–43" | 22.3–24.5 / "22–24" | 38.3–42.8 / "38–43" | 24.0–25.8 / "24–26" |
| paper grain σ | 0.00 on 7/7 | 0.43–6.56, median 0.74 | 0.00 on 8/8 | 0.00–2.96, median 0.79 | 3.29 on 10/10 |
| wash σ | 0.00 on 7/7 | 0.46–0.51 | median 0.0, max 1.92 | 2.43–3.57, median 3.355 | 2.95–6.44, median 4.51 |

Corpus bands as the lane recomputed them without the holdout (q2.out, strongest cohort n = 60): grain p5 / median / p95
1.29 / 2.10 / 2.98 (published 1.30–2.96), wash 1.82 / 3.28 / 4.24 (published 1.83–4.39), ink luma median 34.95, chroma
median 43.95, stroke ratio median 4.33; 5 of 260 plates below paper L 226; 35 of 260 (13.5 %) under-inked above 62 —
all as §1.1 states. The resolution control (rescontrol.json, 10 plates) shows the IQR and stroke-ratio collapse the lane
reports (hf50: IQR 19.5 → 6.4, ratio 3.5 → 2.5). The design's role table still holds the values the lane measured
(docs/ARCHITECTURE.md §8.2: paper `#F6EDDE` = luma 238.0, warmth 24; ink `#292522` = 37.9, 7 — I recomputed both).
grain_comp.out holds the two MFCG windows (29.5 and 67) and also FTG (26) and VG (9.2), which the lane measured and did not
report; fine to omit as not tier-mappable, but §1.3 should say so.

**The correction.** §2.1's "on the hand axes every competitor is measurably outside the target" is contradicted by the
lane's own table and data: FTG's wash is inside the band on 6 of 6 frames (2.43–3.57; the §1.3 cell "2.4–2.6 at street
level" quotes a subset) and its grain is inside on 2 of 6 (2.49, 2.96); FM's grain 3.29 sits 0.33 above the band's top
and its wash median 4.51 0.12 above. The correct statement, which the lane's §1.4 already makes ("the ruler can be
fooled"): the flat competitors (MFCG, NG, VG) are outside; FTG and FM reach or pass the texture bands with lit texture
tiles and a repeated noise tile; the bands separate flat from textured, not hand from machine, so an eye check remains
necessary. The synthesis seat found the same and said so (its §2.4); this review makes the correction in look.md itself.

**Paper band provenance (a strengthening, for item 69's editor).** look.md documents the holdout-free recomputation for
the texture, ink and chroma axes but only a below-226 count for paper. From the lane's q1.out: the HF-1 reference cohort
(n = 43, non-holdout) has paper luma p5 224.6, median 235.7, p95 242.7, warmth median 37 — the published 226–244 / 235 and
the warmth pin 36 rest on that cohort and survive the holdout's removal within 1.5 L. The all-plate non-holdout median is
242.65 (36 % of plates lie above 244), so the target is the reference cohort's, not the population's — which is what the
corpus declares.

**Other judgments in the file.** The register-index caveat (hf16 REG 92.7 yet oblique by eye; hf131; hf300) is the lane's
eye reading, PLAUSIBLE and well labelled. "Our design contains none of the six hand mechanics" — re-grepped today across
the whole design: 0 hits for waver, wobble, mis-registration, overshoot, foxing, blot. The net verdict (a small rise for
"exceed", none for "match", a small speed risk) stands; it is a judgment and is labelled PLAUSIBLE in the file.

## B-corpus-preview/plan — partitioned/corpus-preview/plan.md

**Method (CONFIRMED on the file's evidence):** read-only, holdout roster applied to every table by script, the atlas grain
ladder and T-08 excluded because they rest partly on roster plates, five plates viewed, none on the roster, no lettering
reproduced, SettlementForge's own design unopened. The corpus-side numbers (§1.2's medians; the prior-art studies' text)
are accepted as quoted.

**Re-derived from captures/mfcg/exports-sweep-2026-09-25/size-{24,40,80,130}.json (my script, pure Python: shoelace area,
convex hull, minimum-area bounding rectangle over hull-edge directions):**

| size | n footprints | rectangularity median (mine / lane) | share ≥ 0.90 (mine / lane) | elongation median, p90 | footprint area median m² (mine / stats.json), p10–p90 |
|---|---|---|---|---|---|
| 24 | 411 | 0.912 / 0.912 | 0.55 / 0.56 | 1.48, 2.22 | 339.0 / 339.0, 193–557 |
| 40 | 1 475 | 0.946 / 0.946 | 0.70 / 0.70 | 1.46, 2.28 | 225.1 / 225.1, 127–428 |
| 80 | 5 242 | 0.964 / 0.964 | 0.78 / 0.78 | 1.47, 2.20 | 270.0 / 270.0, 143–469 |
| 130 | 13 091 | 0.977 / 0.977 | 0.85 / 0.85 | 1.49, 2.22 | 268.9 / 268.9, 149–480 |

Exact agreement on rectangularity, the ≥ 0.90 share (one rounding), elongation ("1.46–1.49, p90 ≈ 2.2") and the areas
("225–339, p10 127–193, p90 429–557"). Gates 4 / 5 / 8 / 12 and districts 6 / 9 / 12 / 18 at 24 / 40 / 80 / 130 are the
sweep's stats.md values. **Grain analogue** (buildings crossed per horizontal scanline, 600 scanlines over the footprints'
extent): the lane reports 11 / 16 / 37.5 / 49 / 72 / 108 at sizes 15 / 24 / 40 / 60 / 80 / 130; my median over all
scanlines that cross at least one building is 12 / 16 / 27 / 46 / 35 / 98, and over the middle half of the extent
13 / 19 / 38 / 54 / 64 / 125. The statistic depends on which scanlines are pooled (the lane's exact rule is not stated);
the tier reading reproduces: MFCG's TOWN (size 40) lies at or below the corpus village figure (39), and its METROPOLIS
(size 130) lies above the corpus metropolis figure (84) under both of my definitions (98 and 125). This also settles the
synthesis's look-versus-plan disagreement at metropolis size in the plan lane's direction: the look lane's 67 came from
the raster kernel in a hand-set window on one screenshot and undercounts; the export-based count is the better instrument
for MFCG. (The reconciliation stage still runs both instruments on one render, by the partition's own staging.)

**FTG junction mix, re-derived from the decoded payloads (my `ftg_degrees.py`, stdlib protobuf walk of field 3, node
degrees by edge incidence).** Galeiaward (2026-09-21, the lane's settlement): street edges of types 0 / 1 / 2 / 10 —
junction nodes (degree ≠ 2) T/Y 0.45, X 0.17, dead ends 0.37, X : T 0.39 — exactly the lane's figures; the whole graph
(all edge types) — degree 3: 969, degree 4: 561, degree 1: 83 — X : T 0.58 (the lane's "with suburb edges 0.58") and a
four-way share of 0.36 among junctions of degree ≥ 3. Nevervalley (2026-09-25, roadLength 100): streets X : T 0.43;
whole graph 0.52; four-way share 0.34. Two cautions the file should carry: (1) restricting to street edge types makes
every street node whose other arms are lot outlines or suburb edges look like a dead end (0.37) — the whole-graph figures
(dead ends 0.05, four-way 0.36) are the honest description of FTG's network; (2) the design already holds this: §13.5's
junction row reads "FTG median 90.02°, 58 % in 80–100°, 36.4 % 4-way in its Medieval city — weakness for organic presets,
target for `ringed` and `american`", with the organic band 0–15 % that plan.md's §1.4 cites. So the lane's §5 item 6
("carry forward as a factual correction to our own record") is already satisfied; the correction is to the corpus's FTG
study, not to us. The design's row may now cite n = 2 (36.4 % and 34 %) — evidence seat.

**The four prior-art errors on the 2017 MFCG (CONFIRMED at our sources):** relaxation touches spiral indices n − 4 … n − 2,
never the centre (_critic-os.md C9); the cathedral takes the smallest plaza-fronting patch (C3, "−1/A"); wall smoothing
saturates at 1 for every shipped size (C12); os-model.md's `rateLocation` table lists seven scoring classes (Cathedral,
Administration, Merchant, Slum, Market, Military, Patriciate). The FMG size-mapping note for CONFIDENCE row G2 is corpus
content and PLAUSIBLE (the lane did not read FMG's code): ruled not an input now under the partition; it is re-examined at
reconciliation, where the corpus opens — not a deferral of a finding about our design.

**Stale references.** §0 cites docs/ARCHITECTURE.md §12 at lines 7206–7619 and §4.6–§4.7 at 3383–3664 and §1.4 cites
"ARCHITECTURE ≈ line 2882": pre-consolidation numbering. Today §4.11 begins at line 4954, the markets paragraph sits at
3511–3520, the rung table at 222–226 and the junction row at 10614. Section numbers, not line numbers, are the stable
citation.

## B-corpus-preview/history — partitioned/corpus-preview/history.md

**Method (CONFIRMED on the file's evidence):** no plate viewed; the registry's own integrity gate copied and run
read-only ("status ok", 32 records, 20 mechanisms, 23 places, 0 cohorts, prevalence not eligible); records rendered by
script and read; GENERATION-SPEC.md and MORPHOLOGY-PLAN.md unopened; incidental exposure to passages describing
SettlementForge's own modules inside required documents declared, nothing adopted. Sound.

**Recount.** The §1.2 scoreboard has 28 rows (1; 2; 3; 4a–4e; 5a–5g; 6; 7a–7f; 8; 9a–9e). By my count: WITNESSED 13 (1,
4a, 4b, 4c, 4d, 5a, 5b, 5e, 7a, 7c, 7e, 9a, 9b), PARTIAL 2 (3, 9e), ABSENT 7 (2, 4e, 5c, 5d, 5f, 6, 7d), CONTRADICTED 5
(5g, 7b, 7f, 9c, 9d — 7f counted as the lane counts it), mixed 1 (row 8). The lane's tally 13 / 2 / 7 / 5 / 1 holds.

**The contradicted rules against the CURRENT design.** The lane judged the rules "as we state them" on 2026-09-26 00:34,
reading DEFINITION.md and amendments 8–22 as they then stood. J27 and J28 (00:49 and 00:54 the same night) re-worded the
over-strong ones, and pass b landed them: 5f (a fixed decline order) is now §4.11's weighted lottery over an exposure field
with a chance share ("a weighted tendency, not a law", J-A8.41); 5g ("terrain and water never change") is now amendment 25's
slow conversions, `TerrainWaterOp` in §4.11 with `LandUse.reclaimed` in §2.7; 7b (one market) is amendment 24's N markets
by size at §4.2 with MFCG's and FTG's behaviour as the baseline; 7f (cathedral and market central) is answered by the
principal market's trade-convergence score ("central by default in MFCG-style towns, not by law") — the cathedral stays at
the plaza as MFCG places it (emulation); 9d (a universal material ladder) is amendment 19 (a)'s FTG-default material model
with an optional regional table and a material a rendering attribute only. 9c (heights and storeys scale with prosperity)
remains as the owner stated it ("scale appropriately in size and structure … all buildings across prosperity bands") and
becomes visible once item 68's height-aware shadows land: an owner rule and a reconciliation-stage realism item, not a
change now. The lane's §3 item 3 remark on wall-to-boulevard conversions (Paris, Vienna) is correctly labelled "outside the
registry, from general knowledge and not verified" — and the wall → ring road path stays the owner's own design choice
(J27), built and tested at M4 (§16, D-25).

**Facts accepted on quoted evidence (this seat may not open the corpus):** the 32 / 23 / 20 / 8 counts, the period tally
(24 of 32 overlap 1100–1500, 4 wholly inside, the three direct depictions 1833–1840), the record ids and the case
descriptions. **Stale references:** "ARCHITECTURE ≈ line 2882" (polycentric forms) and "lines 396–404" (epoch conversions)
are pre-consolidation; today the polycentric form rows are in §4.2 S3 (about lines 3515–3600) and the conversions in §4.11
(from line 4954; `wallToWay` at 4758).

## A-corpus-preview/synthesis — partitioned/corpus-preview/CONFIDENCE-PREVIEW.md

(1) **No matching figure moves — CONFIRMED.** docs/CONFIDENCE.md §1's ranges (functional 0.77–0.83, visual 0.78–0.83,
algorithm identity 0.53–0.58, seed-exact 0.00–0.02) are unchanged and the file carries 0 corpus traces; the corpus holds
no measurement of any competitor and no scale, so nothing in it bears on parity as CONFIDENCE.md defines it. The
synthesis's reasons (§2.1–§2.3) are the surveys' and are right.

(2) **The first "exceed" figure, about 60 % — PLAUSIBLE, arithmetic holds** (2/3 × 0.9 = 0.60). The 0.9 conditional is
defensible because the five points (zoom, seeds where FTG has none, real lots, a real-world scale, growth and decline) are
structural: once parity is reached they exist by construction — which is also why IMP-4/5/7 warned that such metrics are
"true by construction" and the owner's eye (D-5) decides "clearly better". The file's honest net — "checkable, not
likelier" — stands. The −5-point conditional on a painted default look is an unmeasured guess and is labelled so.

(3) **The texture correction — CONFIRMED to the decimal** (FTG wash 6/6 inside, median 3.355 → 3.36; FM grain 3.29 against
2.96, wash median 4.51 against 4.39). The synthesis seat found what the look lane's own data showed; look.md now carries
the correction (this review's section there).

(4) **The look-versus-plan disagreement at metropolis (67 against 108)** — resolved toward the plan lane by my export-based
re-derivation (98–125 at size 130 against the corpus's 84; see the plan row); the look lane's windowed raster count
undercounts. The synthesis's "may undercount (PLAUSIBLE)" was the right reading.

(5) **§4 partition checks — re-run 2026-09-27:** 0 hits for the corpus path, plate ids, instrument names, record-id
prefixes and palette centroids in docs/ARCHITECTURE.md, DEFINITION.md, AMENDMENTS-2026-09-25b.md, CONFIDENCE.md,
ARCHITECTURE-RATIONALE.md and ARCHITECTURE-VALIDATION.md; 4 hits in docs/AMENDMENTS-2026-09-27c.md, all in item 69 — the
owner-opened palette exception ("Adopt the corpus measured color targets", J64), recorded in partitioned/README.md. The
partition held and the one opening is the owner's.

**The correction.** The file presents "before" figures of two kinds in one table — "about 85 % (ruled range 0.77–0.83)",
"about 70 % (ruled range 0.78–0.83)" — and says they are "two different yardsticks" without saying what each measures.
For the owner, a plain reader, that is a contradiction left standing (85 above the range; 70 below it). Ruling: the
ruled ranges are CONFIDENCE.md §1's probabilities of parity with each reference as recorded, from the evidence classes;
the plain figures are the stand-in manager's product-level estimates for the fused base as designed, carried into
workflows/07's brief from chat, never entered in the ledger (now J81) and never a ruling. Both may be quoted only with
those labels; the figure of record for "how confident are we" remains CONFIDENCE.md §1 with D-5's acceptance test.
Recorded in the file's review section and in docs/CONFIDENCE.md's pointer section (§10) so a later confidence seat knows
the corpus look was weighed and moved nothing.

## Design impacts (for other parts; none requires a block from this lane)

| part | impact |
|---|---|
| pipeline | Pass c, item 70 (d): write FTG's shanty trigger and staging as the emulation default and the extramural preference as the design's existing extension row (§4.5 `shanty` `extramural`, weight 0.6, zero in the parity presets, J-A27.43) — never "outside the enceinte" as FTG's own rule (J82). Item 65 (c): one existence rule — cities and metropolises; a large town only where a void source exists (rare) — instead of "only in cities and metropolises (rarely a large town)" beside "at most one in a large town". |
| rendering | Pass c, items 68 and 69 will replace §8.4's ground-only projection in the lit styles and move §8.2's `ink` roles (paper `#F6EDDE` → warmth 36 inside luma 226–244; ink/label/wall `#292522` → warm brown-black, warmth ≈ 20, luma ≤ 45; the role-chroma cap 18 → plate chroma 20–30; contrast matrix re-run). Provenance the editor can cite for the paper target: the corpus's HF-1 reference cohort, holdout-free p5–p95 224.6–242.7, median 235.7, warmth median 37 (look-data/q1.out); ink luma median 34.95 and warmth median 21 (q2.out). The unit is 8-bit luma, not CIELAB L*. |
| scope | §13.5's junction row may cite the FTG four-way share on two payloads (36.4 % Galeiaward, 34 % Nevervalley; whole-graph X : T 0.58 and 0.52) — evidence-captures seat; the code/impact reviewer should re-tally docs/AMENDMENTS-2026-09-27c.md's ruling summary (KEEP OURS counts 16 by a mechanical count of its column, the file says 18). |
| model | Pass c, items 63–64 add `concealment`, `front` / `trueFunction` and the basement access; the current §2.6 wording ("a cellar never joins a sewer as a room, a cellar stair to a tunnel being an `AccessPoint`") already leaves room for item 64 — no contradiction to repair. |
| determinism | none |
| kernel | none |

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed in this seat, 2026-09-27):** the still-open-r5 count (20 minor); the archive line counts (11 477;
13 028; 9 667); the partition grep over seven files; the critic-code verdict tally (37 = 33 / 4 / 0); the closing-report
hand-fix list (31 = 2 + 29); the impact seat's ruling-column count (13 / 15 / 16); the design's carriage of amendments 23–27
at their homes and of the 40 / 80 / 130 mapping, the FTG 36.4 % four-way row and the role hex values; the absence of hand
mechanics in the design (0 hits); every competitor figure in look.md from comp_measure.json; the holdout-free band figures
from q2.out and q1.out; the 64-plate roster check; the MFCG rectangularity, shares, elongation, footprint areas and the
scanline grain analogue (two definitions) from the sweep JSON; the FTG junction mix on both decoded payloads; the
2017 spot-checks at _critic-os C3 / C9 / C12 and os-model's scoring table; the emulation evidence behind J28 at its four
sources; the history scoreboard recount; the hand-log gap and the duplicate J46; the plain estimates' origin in
workflows/07's brief.

**PLAUSIBLE (reasoning or accepted on quoted evidence):** every corpus-side number (the corpus is not readable by this
seat); the lanes' eye readings of plates; the tier mapping between MFCG sizes and corpus tiers; the confidence figures
themselves (the ruled ranges are CONFIDENCE.md's rulings; the 60 % and the plain estimates are judgments); the exact
scanline pooling the plan lane used (my two definitions bracket its figures within ± 25 %); Fable's availability window on
2026-09-26 (taken from the ledger's attribution and the Fable-labelled seats, not re-executed).
