# M-1 design corrections, round 1 — DC-01 … DC-35 applied to the design

Lane `design/m1-corrections-1` (workflow `workflows/27-m1-wave2.js`, M-1 wave 2), written on 2026-10-03 on the owner's Mac by
the design seat. The corrections come from M-1's ruling seats: DC-01 … DC-30 from `docs/calibration/M-1-rulings-1.md` §2 and
DC-31 … DC-35 from `M-1-rulings-2.md` §4. They were applied to the base design, `docs/ARCHITECTURE.md`, and to V12
in `docs/volumes/`, with Q-V12-1's mirrors in INDEX and SUMMARY. The result file is `m1-corrections-1.json`. This record holds numbers, metric ids,
paths and our own words only. No reference word list, grammar, palette value or identifier was written into the design
or into this record. Nothing was written into `plat/`, no site was touched, no benchmark was run and no git command
changed state.

## Outcome

**All 35 corrections are in the design** (CONFIRMED by the edit log and the diff): 25 applied, 10 applied-adapted, 0 already true and 0 ruled invalid. Fix round 1 (§7) relabelled DC-11 as applied-adapted, finished two restatements its greps missed and applied DC-36.
None of them adds a feature. Each one corrects a measured value, a definition, a sample's description or the record of
the owner's own decision (J164), so J156's feature freeze holds.

* **The edits.** One script made the replacements, and three follow-up passes made the rest (the counts are in §5). Each had to match exactly once, and
  each file had to equal its backup before the first write. The files are `docs/ARCHITECTURE.md`, `docs/volumes/V12-calibration.md`, `docs/volumes/INDEX.md`
  and `docs/volumes/SUMMARY.md`. Every section number, test id and J-id is unchanged.
* **Sites beyond the DCs.** Where a DC's fact was also stated elsewhere, that statement was corrected too, so the
  design does not contradict itself. Each such site is named under its DC.
* **The checks.** `doc_checks.py` exits 0 on every touched document, with no allow row added. The base had 1 888 C3 hits, every one reviewed; its untouched copy had 1 889. V12 had C3 155 / 0 against 157 / 0. INDEX had 22 / 0 and SUMMARY 10 / 0, the same as their copies. C1, C2, C4, S1 and S2 are unchanged or lower. 17 runs of our own words had coincided with the corpus, and each was reworded, never allowed.
* **The bundle.** `python3 tools/bundle_architecture.py` wrote `docs/ARCHITECTURE-FULL.md`, 73 010 lines from 14 sources, after the last edit. `--check` reports UP TO DATE.
* **Owner flags carried, not decided here.**
  * R-14's restatement of the firewall: `ng-faces.json` now crosses as numbers (DC-20).
  * R-42: three FTG panel pairs per rung (DC-33).
  * The owner's own J164, recorded in D-31 (DC-31).
  Each stays vetoable as its ruling says.

## 1 The corrections (section · before · after · measured by · status)

Each "before" and "after" is a short form of the changed text, quoted where the words matter. The exact strings are in
the edit log the lane kept in its scratchpad. Line numbers are the pre-edit lines. Where a DC's own phrase coincided with
a run of the clean-room corpus (C3), the design words it slightly differently, with the numbers and meaning as ruled.
Each "after" below follows the wording the design now holds.

**DC-01 — applied.** *Section:* V12 §2.2 `MeasureInput.header.scale`; §3.5.6 (follow-on: NG's plan row and NG's adapter line in V12 §3.2) (V12 l. 328; V12 l. 359; V12 l. 1000). *Before:* `'metric' | 'relative'`; NG's vertex captures `relative`; a scale-needing metric on a relative input is `notApplicable`. *After:* `'metric' | 'relative' | 'declared'`, `unitM` required when declared, read as metric; a row on it carries `scale: 'metric'` and a note naming the declaration; NG's captures declared at 0.35 m per model unit; `notApplicable` for `relative` only. *Measured by:* E11 §2, E10 §3 (R-01). The quoted text matched. A short paragraph states the declared-scale rule once, and NG's adapter line and plan row now say `declared` so the volume does not contradict itself.

**DC-02 — applied-adapted.** *Section:* base §2.1 `Unit` and its prose; V12 §2's unit sentence, §2.1 `MetricUnit`, §3.4.2's default floor rule and the two rows' definitions (base l. 542; base l. 546; V12 l. 235; V12 l. 250; V12 l. 1105; V12 l. 1218). *Before:* no unit for cycles per km² or a count per 100 m. *After:* `perKm2` and `per100m` in `Unit` and `MetricUnit`; densities' default `absFloor` (5 % of the median) covers them; `street.cyclesPerKm2` names `perKm2`, `fg.streetwallGap100` names `per100m`. *Measured by:* E01 §5, E11 §6. The DC names V12 §2.1 only. `MetricUnit` extracts its members from the §2.1 list in the base, and the base says each named subset is exactly its present set, so the base's `Unit` gains the two words too. The default floor rule had to name them, or `plat build` would fail both rows for a missing `absFloor`.

**DC-03 — applied.** *Section:* V12 §3.4.2 `bldg.pairing` (V12 l. 1221). *Before:* "sharing ≥ 50 % of one edge with exactly one neighbour whose area lies within ± 25 %". *After:* "that have exactly one neighbour which both shares ≥ 50 % of one footprint edge and has an area within ± 25 % of theirs". *Measured by:* E11 §4 (R-05). The quoted text matched. The DC's phrase for the shared edge reads "one footprint edge" (C3).

**DC-04 — applied.** *Section:* §13.5 junction row, NG cell (base l. 20220). *Before:* "NG 361 / 361 T". *After:* "NG 361 / 361 T (raw: 0 degree-4 nodes); 0–5 % 4-way under the catalogue's 2 m merge at the declared scale (M-1, E11)". *Measured by:* E11 §4 (R-06). The quoted text matched.

**DC-05 — applied-adapted.** *Section:* V12 §3.4.2 `fg.streetwallGap100` and `fg.streetwall` (V12 l. 1155; V12 l. 1220). *Before:* "along dense frontages (as `fg.streetwall`), gaps longer than 2 m per 100 m"; "dense frontages" undefined. *After:* the ray rule (rays every 5 % of the median short side, walled within 1.0 × that side; a gap = unwalled run > 2 m), gap length per 100 m beside the count; dense frontages = every intramural frontage (MFCG), every built block's frontage (NG), ours, blocks in the dense / poor band row (§4.7). *Measured by:* E11 §2 (R-07). `poor` is one of §4.5's six bands, but the design has no `dense` band. "Dense / poor" is §4.7's granularity row "poor / dense", to which §4.5's table maps both `squalid` and `poor`, and §13.5's party-wall row names the same pair. So the definition names that row, which covers both bands (reason corrected in fix round 1).

**DC-06 — applied.** *Section:* V12 §3.4.2 `block.countTemplate` (V12 l. 1150). *Before:* "built blocks per hood per template at `medium`". *After:* "bounded built blocks — faces closed by ways — per hood per template at `medium`", unbounded land counted in the row's note; ours: the opened district's blocks that do not touch its outline. *Measured by:* E11 §4 (R-08). The quoted text matched.

**DC-07 — applied.** *Section:* V12 §3.4.2 `variety.dispersion`; §13.5 between-seed variety row (base l. 20248; V12 l. 1177). *Before:* components named but undefined; an estimator implied. *After:* eight components defined (R = p90 of building-centroid distance; radial share of arterial chords within 30°; orthogonality; way km per km² in three annuli; cluster-block area CV; enclosed share; `outline.r90cv`), deviations pooled over both references' vectors at the rung, one value per rung with `seeds` = n, `absFloor` 0.1 z. *Measured by:* E05 §6 (R-10, R-40). Applied with R-40's pooling (both references at every rung), which supersedes R-10's "MFCG alone at METROPOLIS". §7.7's forms catalogue keeps its own five-family signature; the catalogue row is the one definition.

**DC-08 — applied.** *Section:* §13.5 tree scatter, FTG (plus one key sentence under "Matched sizes" labelling every two-value FTG cell) (base l. 20213; base l. 20240). *Before:* "nearest-neighbour median 9.7 m". *After:* "10.6 m (10.59 / 10.57 m; the earlier script dropped 320 of 4 125 trees), minimum 0.14 m". *Measured by:* E05 §8 (1). The quoted text matched. A key sentence placed once under "Matched sizes" says that in every FTG cell "a / b" means CITY capture one and capture two, and that capture two is a non-default-setting fixture that enters no row (R-04's label). The sentence also says how "M-1, E05" citations resolve. Fix round 1 wrote the towers-and-gates row's older "17 / 17 towers" (17 of 17) as "17 of 17 towers", so the key reads every FTG pair correctly (§7).

**DC-09 — applied.** *Section:* §13.5 towers and gates, FTG (base l. 20238). *Before:* "6 and 2 ungated crossings". *After:* "3 and 1 arterial crossings at no gate (4 and 1 by any way class; the earlier count of 6 and 2 included the wall chain's ends)". *Measured by:* E05 §8 (2). The quoted text matched.

**DC-10 — applied.** *Section:* §13.5 water, FTG (base l. 20239). *Before:* "50 m resampling, rivers ≈ 31 m". *After:* "50 m resampling (the second capture's coast at 15 m and basin at 13 m steps, pooled 15.7 m), rivers 31 m / 48 m". *Measured by:* E05 §8 (3). The quoted text matched. §4.2 S1 (3)'s "FTG's ≈ 31 m mean river width at CITY is one calibration point" stands: it is the usable capture's value, and the second capture enters no row (R-02, R-04).

**DC-11 — applied-adapted.** *Section:* §13.5 outline anisotropy, FTG; follow-on §4.4 S5a (the extramural calibration target) (base l. 6567; base l. 20236). *Before:* "0.20–0.33 and 1.26–1.65 (both CITY payloads)". *After:* "0.365 / 0.333 and 1.160 / 1.214 under V12's 36-sector definition (the earlier 16 land sectors gave the old values); band recomputed by the band rule from the matched sizes' rows, provenance M-1 ⟨date⟩". *Measured by:* E05 §8 (4). The quoted text matched. §4.4 S5a stated the same 1.26–1.65 as the extramural stages' target, so it now states both definitions. The DC's "BIG_TOWN / BIG_CITY rows" reads "the matched sizes' rows", because R-34 gives METROPOLIS the same roles (DC-31). Fix round 1 relabelled this entry from applied, because that wording departs from the DC's (§7).

**DC-12 — applied-adapted.** *Section:* §13.5 street turning, FTG weakness; follow-on §1.4's secondary-streets row (base l. 452; base l. 20218). *Before:* "zero mass above 15° per step". *After:* "about 1 % of 10 m steps above 15° (1.03 % / 0.82 %) with 0 / 1 raw way vertices above 15° (the one at 16°)". *Measured by:* E05 §8 (5), §4. The DC wrote "≤ 1 %", but E05 §4 measured 1.03 % above 15° on the first payload. The text gives the measured values. §1.4 said "zero mass above 15°" of the same mechanism and now says there is no raw vertex turn above 15° on the default-setting capture.

**DC-13 — applied.** *Section:* §13.5 junction row, FTG (base l. 20220). *Before:* "36.4 % 4-way in its Medieval city". *After:* "a 4-way share of 0.28 / 0.30 among ways (36.4 % over every edge type, the earlier count)". *Measured by:* E05 §4. The quoted text matched. Not a DC, and so left: the same row's "median 90.02°, 58 % in 80–100°" also moved under V12's way-graph definition (90.15° / 90.52°, 55.4 % / 56.2 %, E05 §4). That is a note for the session, below.

**DC-14 — applied.** *Section:* V12 T-V12-6 (the alignment clause); T-V12-32 (V12 l. 3131; V12 l. 3157). *Before:* "the five MFCG exports measured through the shore split keep T-V12-6's values"; T-V12-6's alignment on all five. *After:* keep T-V12-6's walled share, gates and towers; the coastal city's wall alignment through the split is 89.2 / 56.7 / 41.0 % (descriptive); T-V12-6's alignment clause on the four dry cities. *Measured by:* E07 F1 (R-12). The quoted text matched.

**DC-15 — applied.** *Section:* §13.5 walled share and ribbons, MFCG; follow-on §4.4's stage-regime table (the ribbon row's anchor) (base l. 6739; base l. 20234). *Before:* "71–85 % (sweep)". *After:* the ribbon share per matched size from M-1's ten-seed sweep (one seed per size so far: 0.85 / 0.58 / 0.49 at 40 / 80 / 130); "71–85 %" was the size-40 gate fixtures'. *Measured by:* E07 F2 (R-12). The quoted text matched. §4.4's ribbon regime row now says that its 71–85 % is the size-40 gate fixtures' value. V06's T-V6-31 quotes that row with its own band and still reads true.

**DC-16 — applied.** *Section:* §13.5 MFCG anchors (base l. 20235). *Before:* "2.4–17.6 ha at size 40 and median 29 ha at size 80". *After:* "2.4–17.6 ha on the size-40 gate fixtures (the plain size-40 city 2.4–21.5 ha) and median 19.0 ha at plain size 80 (the river-and-coast city gives 29.3 ha)". *Measured by:* E07 F3. The quoted text matched. §4.2 S3's "two 29 ha nuclei at TOWN" is an example of our own separation band, not this measurement, and stands. §4.5's *Grower* paragraph cited the old range too and was restated in fix round 1 (§7).

**DC-17 — applied.** *Section:* V12 §3.4.2 `bldg.wallAlign` (V12 l. 1144). *Before:* one vector mixing degrees and shares. *After:* `bldg.wallAlign.median` (deg, `absFloor` 1°) and `bldg.wallAlign.share15` (share, `absFloor` 0.02), vectors over the three bands. *Measured by:* E07 F4 (R-12). The quoted text matched. J-V12.96 names the family `bldg.wallAlign` and still reads.

**DC-18 — applied-adapted.** *Section:* V12 §3.4.2 `draw.*` (V12 l. 1176). *Before:* members unnamed. *After:* MFCG `draw.casingLaw`, `draw.roundJoins`, `draw.roundCaps` (descriptive), `draw.widthPx` (a vector), `draw.wallsAfterBuildings`; NG `draw.capSquare`, `draw.hatchPerWing`, `draw.shadowQuadsPerWing`, `draw.roofLumaRatio` (descriptive); `draw.order` no numeric member. *Measured by:* E07 §7; W-22. `draw.roundCaps` is marked descriptive. E07 §7 measured it as descriptive, and §13.5's draw-style row states no cap law for MFCG, so a target would be new design.

**DC-19 — applied-adapted.** *Section:* §13.5 markets, MFCG (base l. 20248; base l. 20250). *Before:* "secondary-plaza frequency and non-adjacency on the plain size sweep ⟨M-1⟩ — target". *After:* "0 secondary markets and 0 adjacent pairs in every export and recorded generation ⟨M-1⟩ (E07) — target, reference 0". *Measured by:* E07 §6 (R-12). The design already had the row as a target. The "pre-decided descriptive" status was a line of plan §8 (3), which the rulings seat withdrew; the design never held it. "(M-1)" is written as the design's ⟨M-1⟩ mark. The blank line that split §13.5's table just before this row was removed: it had been rendering the markets row and the nine after it as plain text (ten rows; the count corrected in fix round 1).

**DC-20 — applied.** *Section:* V12 §3.3 (its file list, C1, the never-crosses paragraph); §17.1 (4); V12 §3.2.2's NG line; follow-on V12 T-V12-28 and §2.11's lifecycle table (base l. 21701; V12 l. 1028; V12 l. 1057; V12 l. 1064; V12 l. 1079; V12 l. 3153; V12 l. 823; V12 (follow-up pass)). *Before:* "images, geometry, names, colours … never cross"; the crossing list without `ng-faces.json`; "reference values are the recorded measurements … `trace` rows". *After:* geometry beyond the declared face-record file never crosses; `ng-faces.json` (NG's hood outlines and face records in integer cm at the declared scale, block areas, per-cut measures, `referenceBuild` on every record) in §17.1 (4)'s list, checked by C1–C10 (C1 knows `plat.ng-faces/1`) and countersigned; NG's trace rows from the formula seeds, the recorded captures twin fixtures. *Measured by:* E10 §7, E11 (R-03, R-14). Applied as ruled. R-14 widens what crosses the clean room and stays flagged for the owner's veto (rulings-1 §4 (6), rulings-2 §5 (6)). For wiring, T-V12-28's scanned list and §2.11's one lifecycle table gained the file, so every crossed record still has its row.

**DC-21 — applied-adapted.** *Section:* V12 §3.4.2 (new row); follow-on §13.5's bent-cut row (reference cell and band) (base l. 20225; base l. 20225; V12 l. 1152). *Before:* no cut-length metric; §13.5's bent-cut row without a cut-length cell, although §16 M0 (b) gates "cut-length KS by the band rule". *After:* `cut.length` (trace, m declared for NG, distribution on the run-length bins 5 m to 400 m plus overflow, `perSeed: 'sample'`), its row "bent-cut signature (cut lengths per face ⟨M-1⟩)"; §13.5's bent-cut row gains "NG's cut lengths per face on its formula seeds ⟨M-1⟩ — target" and "cut lengths: KS by the band rule (§16 M0 (b))". *Measured by:* E10 §5 (R-15). The DC named V12 §3.4.2 only. Its row text carries ⟨M-1⟩, and the ⟨M-1⟩ rule acts on §13.5's marked cells, so §13.5's bent-cut row states the cell §16 M0 (b) already gated. Without it, a missing cut-length row would have no marked cell to fail.

**DC-22 — applied-adapted.** *Section:* §4.6's hidden-plots paragraph (the reach weights) (base l. 7425). *Before:* "the base weights are fitted at M-1 on B-CITY". *After:* "the base weights are fitted at M1 on B-CITY". *Measured by:* plan §8 (7) (R-31). The DC said §4.5. The sentence is in §4.6 (the hidden-plots paragraph after the deep-interior rule), at the line the DC named.

**DC-23 — applied.** *Section:* §4.6 step 5, `cut.flattenM`'s note (base l. 7306). *Before:* the 0.35 credited to an export scale of MFCG's metric files. *After:* "two model units at a declared 0.35 m each, NG exporting no metric (at that scale its median footprint short side reads 7.1–7.3 m; M-1, E11)". *Measured by:* E11 §2 (R-01). The quoted text matched.

**DC-24 — applied.** *Section:* §13.5 party walls, NG; follow-on §4.7's granularity anchors and §15's O17 (c) (base l. 7565; base l. 20229; base l. 21432). *Before:* "39–43 % of perimeter, 95–99 % attached". *After:* "per-footprint median 0.42–0.46 within a hundredth of the short side, attached 0.98–1.00 (V12's definition; 39–43 % and 95–99 % under the earlier script's)". *Measured by:* E11 §5. The quoted text matched. §4.7's "poor / dense" anchor and §15's O17 (c) stated the same NG numbers and now give V12's. Appendix A's reading record keeps "95–99 % attached" as what its lanes confirmed then (history). §4.7 S11's `row` arrangement also stated 95–99 % and was restated in fix round 1 (§7).

**DC-25 — applied.** *Section:* §13.5 plot-area gradient, NG (base l. 20230). *Before:* "Moran's I −0.04 … +0.03". *After:* "−0.18 … +0.05 on shared-edge adjacency (−0.04 … +0.03 with 8 nearest centroids, the earlier rule)". *Measured by:* E11 §5. The quoted text matched.

**DC-26 — applied.** *Section:* §13.5 bent-cut signature (base l. 20225). *Before:* "σ 0.098 (ring faces)". *After:* "0.098 (ring faces; 0.100 with the three annulus first cuts and the three C-shaped cuts after them)" — a note; the band holds. *Measured by:* E10 §6 (1). The quoted text matched.

**DC-27 — applied.** *Section:* §13.5 generation time, FTG; follow-on §12.9's FTG paragraph (base l. 20242; base (follow-up pass); base (follow-up pass)). *Before:* "server 2.9–3.2 s". *After:* "server 2.9–3.2 s (PUT → OPTIONS; from 3.7 to 4.3 s PUT → layout GET, the M-1 row's definition)". *Measured by:* E05 §4 (R-21). The quoted text matched. §12.9 quoted the same 2.9–3.2 s and now names the M-1 definition.

**DC-28 — applied.** *Section:* §13.5 towers and gates, FTG (base l. 20238). *Before:* "39 m median spacing". *After:* "39 m median spacing (38.65 / 35.59 m by type 7; 39.3 was the probe's upper middle value)" — a note. *Measured by:* E05 §4. The quoted text matched. §1.4's and §4.8's "39 m" stand as the rounded value.

**DC-29 — applied.** *Section:* V12 §3.2.1's plan table (V12 l. 998). *Before:* MFCG "one URL load per export"; the FTG row without the recorded CITY pair. *After:* one load per seed (the JSON fetched by its URL key, the SVG saved from the app's export window); the FTG row names the recorded family `capture/FTG/CITY` (one usable, one non-default in `sample.failed`). *Measured by:* E03 §3 (1); R-02. The quoted text matched.

**DC-30 — applied-adapted.** *Section:* V12 §3.2.1 (the panels' identifier files) (V12 l. 1006). *Before:* `fm-captures.json`, `dw-captures.json`, `vg-seeds.json` "written by `plan.py`" (at M-1). *After:* written by `plan.py` at the milestone of the panel that reads each — M6's Fantasy Manor pairs, V3-P6's Dwellings pairs, V-M4's VG pairs (V12 §3.9.1) — not at M-1. *Measured by:* E01 §4. The DC's list (M1, M5, M6c, V-M4) includes M1 and M5. Those are the FTG and NG panels, whose files (`ftg-captures.json`, `ng-counts.json`) the research-side panel script writes. For the three files named, the reading panels are M6, V3-P6 and V-M4 (V12 §3.9.1's table).

**DC-31 — applied.** *Section:* D-31 (and J-S11's mark); §1.1's METROPOLIS row; §13.5 `FtgSize` comment and "Matched sizes"; the rung types of §13.6 (9), with (2) and (3); the FTG paragraph of §12.9; V12 §1 l. 111 and l. 160, §3.4.4's FTG row, Q-V12-1; INDEX §6's and SUMMARY's mirrors of Q-V12-1 (base l. 357; base l. 18225; base l. 18229; base l. 20174; base l. 20210; base l. 20327; base l. 20359; base l. 20408; base l. 23319; base l. 23594; V12 l. 111; V12 l. 160; V12 l. 3470; INDEX l. 179; SUMMARY l. 115). *Before:* FTG's premium METROPOLIS not purchased; METROPOLIS compared with MFCG 130 only; "FTG per D-31". *After:* J164 (2026-10-03): one premium month, no renewal and no further purchase by a seat; FTG METROPOLIS rows from `capture/FTG/METROPOLIS` (n = 4, `minmax`); the panels' three METROPOLIS FTG pairs at M1 / M2b / M4; D-31 records the reversal and its term; J-S11 marked *amended by J164*. *Measured by:* J164; plan §2.1b. This is the owner's own decision, recorded by amendment and reported, not asked (J-A34.01). It has two follow-ons. §13.6 (9)'s `D5Pair` FTG variant and `FtgCapture.rung` widen from TOWN and CITY to include METROPOLIS, and (2)'s nominal fallback gains METROPOLIS 49 500 (R-33's ladder). §16's M2b and M4 rows say "METROPOLIS per D-31", which now reads through the amended D-31 and was left as is.

**DC-32 — applied.** *Section:* V12 §3.2.1's FTG row; §16 M-1's FTG clause and exit; follow-on V12 §3.1's loop, §3.12's capture-failure ladder, §8.3's risk 1 (base l. 21483; base l. 21483; V12 l. 965; V12 l. 999; V12 l. 2310; V12 l. 3233). *Before:* "BIG_TOWN and BIG_CITY … 3 … six days on the free daily allowance"; exit "FTG's six captures decoded". *After:* two programmes in the owner's signed-in account: programme 1 six slots (J159 / J163), programme 2 the 22 premium slots (J164), 28 in all; the exit reads "every slot of both FTG programmes decoded or recorded failed". *Measured by:* plan §2.1, §2.1b; E02. The quoted text matched. Three V12 sites assumed the free allowance ("FTG one per day"; "FTG: the next day, up to 6 days"; "FTG has three captures per size") and now state the programmes. The ladder keeps three attempts per slot, with the slots fixed by number, as plan §2.1b reads V12 §3.12.

**DC-33 — applied.** *Section:* §13.6 (2) (one pair per FTG capture; the file per panel capture); V12 §3.9.1's panel table (base l. 20316; V12 l. 1788; base l. 20322). *Before:* "one pair per FTG capture … three pairs per rung"; "FTG 6 (three per rung, TOWN and CITY)". *After:* three per rung: one `none` capture and two `coast+river` captures, the earliest of each in capture order, further captures feeding rows only; `ftg-captures.json` one record per panel capture; "FTG 9 (three per rung at TOWN, CITY and METROPOLIS; the captures §13.6 (2) names)". *Measured by:* R-42. The quoted text matched. R-42 is vetoable: the owner may want more FTG pairs at the cost of a longer sitting.

**DC-34 — applied-adapted.** *Section:* V12 §3.5.5 step 2; §6's B-REF nightly line; follow-on §3.4.4's FTG setting column (V12 l. 1235; V12 l. 1289; V12 l. 3082; V12 l. 3082). *Before:* "for FTG rows the capture's recorded population"; "FTG 6 settings" = six captures. *After:* FTG settings per (rung, water) at the size's nominal population — TOWN, CITY and METROPOLIS × `none`, `coast+river` = 6, the count unchanged; rows pooled per size carry `matched.population` nominal; the per-capture population is the panels'. *Measured by:* R-43. R-43 says "the count unchanged", which holds for the 240 FTG towns. Their make-up changes, though: two of the six settings are now METROPOLIS. So §6's line now counts 120 METROPOLIS towns of ≈ 400 instead of 40. The ≈ 3 s average and the ≤ 20 CPU-min budget stand as written. PLAUSIBLE: the heavier METROPOLIS share may push the nightly to ≈ 24–25 CPU-min. The budget is measured at M1, and its own pre-decided change (render metrics every third night) covers a miss.

**DC-35 — applied.** *Section:* §13.5 street turning, the target clause's reason (base l. 20218). *Before:* "FTG's per-seed spread over at most eight payloads is too narrow". *After:* the exception stands at M-1, which prints the ten-capture `type7` band beside it; the next design pass restates the reason or withdraws the exception from that measurement. *Measured by:* R-34. The quoted text matched.

## 2 What the build side carries (M0 items whose `sections` include a changed section)

Read from `plat/docs/build/M0-work.json`'s `sections` field (read only). No M0 item cites a V12 section, so a V12-only
correction lists no item. Where an item reads the changed content by another route, for instance a row of `baselines.json`
or the N-01 id table, the text says so as *indirect*. None of these changes alters a value an M0 table ships; they
change reference text, ids and one crossing file kind.

| DC | M0 items | what changes for them |
|---|---|---|
| DC-01 | — | No M0 item's sections cite V12. Indirectly, the NG rows that M0-b-05b and M0-c-07b read (`block.area` in declared metres; `ng-faces.json` in integer cm) rest on this declared scale, and each such row's note names it. |
| DC-02 | M0-s-02, M0-m-01 | M0-s-02 (§2.1 (Unit)) and M0-m-01 (§2.1) declare and check the unit vocabulary: it gains `perKm2` and `per100m`. No M0 table column uses either. M0-d-05a cites §2.1 for ids only and is unaffected. Indirectly, M0-k-05's `METRICS` registry takes the two units when it registers M-1's ids (N-01). |
| DC-03 | — | No M0 item reads `bldg.pairing`. |
| DC-04 | M0-c-06, M0-c-07, M0-c-07a, M0-c-07b, M0-k-05 | The NG reference cell of the junction row they compare against now states the raw count and the merged share. The bands (median 85–95°, p5 ≥ 30°, organic 4-way 0–15 %) are unchanged. The M-1 row is the merged value, so ours must be merged within 2 m too (V12's `junction.*` definition already says so). |
| DC-05 | — | No M0 item reads either metric (streetwall continuity is M1's). |
| DC-06 | — | No M0 item's sections cite V12. Indirectly, M0-b-05b reads NG's block counts per template through §13.5's blocks row (its AFTER-M-1 need). That row is now an interior count, and ours must count the opened district's blocks that do not touch its outline (on NG's hood outlines, M0-c-07b). |
| DC-07 | — | No M0 item measures variety (it is M1's). |
| DC-08 | M0-c-06 | No M0 item reads the tree row. Fix round 1 wrote the towers-and-gates row's FTG count as "17 of 17 towers", and M0-c-06 cites that row (roads leaving = N). Only the wording changed; its clause and bars are unchanged. |
| DC-09 | M0-c-06 | Only FTG's weakness reference in the towers-and-gates row changes. M0-c-06's clause (roads leaving = N) and the bar "ungated crossings 0" are unchanged. |
| DC-10 | — | No M0 item reads the water row. |
| DC-11 | M0-c-01, M0-c-04 | M0-c-01 cites §4.4 S5a (the level set's reach; the regimes' a). M0-c-04 cites S5a's *Boundary* paragraph, which holds the edited ratio (added in fix round 1). FTG's target ratio is restated under V12's definition. The regimes' a values (our own) are unchanged, and nothing in M0 calibrates against it. |
| DC-12 | M0-c-05, M0-c-06, M0-k-05 | Only FTG's weakness reference wording changes. Our clause "no cliff" (M0-c-05, M0-c-06) and the turning metric M0-k-05 measures are unchanged. |
| DC-13 | M0-c-06, M0-c-07, M0-c-07a, M0-c-07b, M0-k-05 | Only the FTG reference cell changes. It is a weakness for organic presets and a target for `ringed` and `american`, which M0 does not build. The bands are unchanged. |
| DC-14 | — | Research-side checks (M1). No M0 item. |
| DC-15 | M0-s-02, M0-c-01, M0-b-01 | Only the reference-anchor text of the ribbon regime row changes. The StageRegime values M0-s-02 loads, M0-c-01 reads and M0-b-01 reads for the regimes' block-depth floors are unchanged (M0-b-01 added in fix round 1). |
| DC-16 | M0-e-04, M0-x-06, M0-s-02 | No M0 item reads the anchors row. Fix round 1 restated §4.5's pointer to it in the *Grower* paragraph's merge rule, which M0-e-04 cites (the merge rule with the seed-rate exception) and M0-x-06 cites (§4.5 *Grower*); M0-s-02 loads `district.growthRate`, defined in the same paragraph (added by the session after the fix round's verifier). Only the wording changed. The rule, the rates and the 2.4 ha floor it points to are unchanged. |
| DC-17 | — | No M0 item's sections cite V12. Indirectly, M0-c-07a reports wall alignment by distance band as a block-axis proxy and M0-k-05 registers the ids: the row ids are now `bldg.wallAlign.median` and `.share15` (the N-01 table already lists them). |
| DC-18 | — | No M0 item reads `draw.*` (M1's). |
| DC-19 | — | No M0 item reads the markets row. |
| DC-20 | M0-k-05, M0-b-05, M0-b-05b | §17.1 (4) now names `ng-faces.json` as a crossing file and describes its content. `plat baselines check` (M0-k-05) must accept the schema `plat.ng-faces/1` in C1, scan it like every crossing file, and read colours only inside string values (N-02, N-03). M0-b-05 and M0-b-05b gain the design text their landed choices (C-0043, C-0086) assumed. M0-b-05a and M0-k-07 cite §17.1 (4) for `baselines.json` and `denylist.json` and are unaffected. |
| DC-21 | M0-b-04, M0-b-05, M0-b-05a, M0-b-05b, M0-k-05 | §13.5's bent-cut row gains a marked ⟨M-1⟩ cut-length cell with KS by the band rule. M0-k-05's ⟨M-1⟩ mark list gains it (id `cut.length`, N-01), and M0-b-05b reads it from `baselines.json` (with `spreadKS.p90`). M0-b-05 is the same comparison. M0-b-04's PR bars and M0-b-05a's σ clauses do not change. |
| DC-22 | M0-s-02, M0-b-03 | The reach weights' base values are fitted at M1, not at M-1. M0's tables carry the stated defaults with their provenance, and no M-1 deliverable carries reach weights. No M0 work changes. |
| DC-23 | M0-s-02, M0-b-02, M0-b-05, M0-b-05b | Only the provenance wording of `cut.flattenM` changes. 0.7 m is unchanged. Its metre reading is the declared scale that `ng-faces.json` uses, so M0-b-05b's calibration compares like with like. |
| DC-24 | M0-s-02, M0-b-01 | Only the reference-anchor text of the granularity table changes. The frontage, depth, join and vacancy values M0-s-02 loads and M0-b-01 reads are unchanged. Fix round 1 also restated §4.7 S11's `row` arrangement, which no M0 item cites. |
| DC-25 | — | No M0 item reads the plot-area gradient row. |
| DC-26 | M0-b-04, M0-b-05, M0-b-05a, M0-b-05b, M0-k-05 | Note only. σ within ± 0.02 of 0.098 stands. |
| DC-27 | — | No M0 item reads the generation-time row. |
| DC-28 | M0-c-06 | Note only. |
| DC-29 | — | Research-side plan. No M0 item. |
| DC-30 | — | No M0 item. |
| DC-31 | M0-s-02, M0-k-05 | M0-s-02 (§1.1 RungProfile, the base's three rows): the METROPOLIS row's `matched.ftgSize` is now `'METROPOLIS'` (a captured, matched FTG size), not undefined. M0-k-05 (§13.5 `FtgSize`): the type is unchanged, and its comment now makes METROPOLIS a matched pair. M0-c-01 cites §1.1 for CITY's frame only, and M0-d-02 cites §13.6 (2) for H32 only. Both are unaffected. |
| DC-32 | — | M0's items cite §16's M0 row, never the M-1 row. No M0 item. |
| DC-33 | — | M0-d-02 cites §13.6 (2) for H32's definition and check vectors only, which are unchanged. No M0 item builds the panels. |
| DC-34 | — | No M0 item runs B-REF (M1's). |
| DC-35 | M0-c-05, M0-c-06, M0-k-05 | Only the reason text changes. The target clause (0.5–1.5 × FTG's median) and our weakness clauses are unchanged. |
| DC-36 (fix round 1) | — | No M0 item cites §13.5's draw-style row or §8.3. Eleven items cite §13.5 (M0-b-04, M0-b-05, M0-b-05a, M0-b-05b, M0-c-05, M0-c-06, M0-c-07, M0-c-07a, M0-c-07b, M0-k-05, M0-x-03), each for other rows, the band rule or the ⟨M-1⟩ rule. The changed cell carries no ⟨M-1⟩ mark, and its band column is unchanged. |

**For the session, before M0's wave 11 (with N-01 … N-03 of plan §7):**
1. M0-k-05 takes the new ⟨M-1⟩ cut-length cell (DC-21) and the ids `bldg.wallAlign.median` and `bldg.wallAlign.share15` (DC-17).
2. M0-k-05's units now include `perKm2` and `per100m` (DC-02).
3. `plat baselines check` knows `plat.ng-faces/1` (DC-20).
4. M0-s-02 gives the METROPOLIS row of `RungProfile` `matched.ftgSize: 'METROPOLIS'` (DC-31).

**For the session, research-side, before programme 2's first FTG bind (slot 6):** W-01b registers `bldg.wallAlign.median`,
`bldg.wallAlign.share15` and `cut.length` in `plan.py`'s registry and retires `bldg.wallAlign`. Until then `plan.py` refuses
every write, binds included (section 4, CONFIRMED).

## 3 Judgment calls (delegated authority, J122; each vetoable)

* **One measured fact, one value.** Where a DC's old number or wording also appeared outside the section it names, that site was corrected too: §1.4, §4.4 S5a, §4.4's regime table, §4.5's *Grower* (fix round 1), §4.7's anchors, §4.7 S11's `row` arrangement (fix round 1), §12.9, §15's O17 (c) and V12 §3.1, §3.12, §8.3. Leaving them would keep two values for one measurement. The alternative, editing only the named sections, was rejected for that reason. Every extra site is named under its DC.
* **R-04's label stated once.** One key sentence under §13.5's "Matched sizes" says what "a / b" means in an FTG cell: CITY capture one and capture two, capture two made at a non-default setting and entering no row. The alternative, repeating "non-default setting" in nine cells, was rejected.
* **Citations to the M-1 records.** Changed cells cite "M-1, E05" and the like, and the key sentence says they name records in `docs/calibration/`. The alternative, a bare "M-1", was rejected because it loses which record measured the number.
* **DC-12's "≤ 1 %" written as measured** (about 1 %: 1.03 % / 0.82 %). A design number must not contradict its own measuring record.
* **DC-21 reaches §13.5.** The ⟨M-1⟩ cut-length cell was added beside the catalogue row, because the ⟨M-1⟩ rule acts on §13.5's marked cells and §16 M0 (b) already gated that KS.
* **DC-20's wiring.** `ng-faces.json` gained a row in V12 §2.11's one lifecycle table and a place in T-V12-28's scanned list, so the owner's wiring rule holds for the new crossing file.
* **DC-31's types.** §13.6 (9)'s `D5Pair` FTG variant and `FtgCapture.rung` were widened to METROPOLIS (M1's panel files, not built yet). Otherwise the design would hold METROPOLIS FTG pairs that its own types refuse. It follows the owner's J164, and R-42 is vetoable.
* **Pointers kept.** §16's M2b and M4 rows say "METROPOLIS per D-31" and now read through the amended D-31, so they were left unchanged.
* **Appendix A unchanged.** Its "95–99 % attached" and "39 m towers" are what its lanes confirmed at the time. §13.5 now carries both definitions.
* **One table defect fixed in passing.** The blank line that ended §13.5's table before the markets row was removed. It had been rendering ten rows (markets through the five Fantasy Manor rows) as plain text.
* **Rewording, not allowing.** Our own phrases that coincided with the C3 corpus were reworded after testing each candidate against a pickled copy of the C3 corpus. That copy matched `doc_checks.py`'s counts exactly (1 896 / 9 and 163 / 8 before, 1 888 / 0 and 155 / 0 after). No row was added to `doc-checks-allow.tsv`.

## 4 Noted for the session, not applied (no DC names them; recorded so nobody re-finds them as bugs)

* **Blocks the FTG binds until W-01b lands (CONFIRMED).** `research/baselines/plan.py` compares V12 §3.4.2's ids with its own registry inside the computation every write runs. Since DC-17 and DC-21 changed the catalogue's ids, `plan.py --check`, `--bind-ftg` and `--fail-ftg` all refuse with "catalogue mismatch: missing bldg.wallAlign.median, bldg.wallAlign.share15, cut.length; extra bldg.wallAlign". `plan.json` and `metrics.m-1.json` are unchanged, and this seat wrote neither them nor `plan.py`. The registry ids are W-01b's (plan §4, wave 2 item 2), and lane `m1/plan-fix-3` recorded the same at 21:03. The session lands W-01b, which registers the three ids and retires `bldg.wallAlign`, before programme 2's first bind (slot 6). Reverting the ruled ids instead was rejected: the registry must match the catalogue either way, so whichever lands first leaves the check red until the other lands.
* §13.5's junction row also states FTG's "median 90.02°, 58 % in 80–100°". These moved under V12's way-graph definition to 90.15° / 90.52° and 55.4 % / 56.2 % (E05 §4). No DC names them, so they stand. A later ruling or W-15's rows should settle them.
* Two rulings of R-01 and R-08 have no DC and are missing from the catalogue: R-08's built outline for `street.cyclesPerKm2` (the convex hull of drawn road and footprint vertices, `outlineKind` 1) and R-01's `block.areaRel` bin edges (24 log bins over 0.5–500 median footprint areas). They live in `metrics.m-1.json` and the rows' notes; a later DC can bring them into V12 §3.4.2.
* R-13's formula-extension rule (a family short of its declared n extends by the next formula index, the failed index kept) is not stated in V12 §3.2.1. No DC asks for it.
* With FTG METROPOLIS settings, the nightly B-REF holds 120 METROPOLIS towns of ≈ 400 rather than 40. PLAUSIBLE: ≈ 24–25 CPU-min against the ≤ 20 budget. M1 measures it, and the budget's own pre-decided change applies if it is missed.
* V12 §8.3 risk 1 says FTG's rows "stay … weakness and descriptive, the one declared target exception". That understates §13.5, which has several FTG target rows. This is existing text and not a DC.
* §7.7's forms catalogue names five signature families, while V12's `variety.dispersion` now defines eight components. The forms' classifier (O10 (g)) is a separate use. No DC names it.
* Plan notes §6 point 5 (`water.step` a fixed band) is W-15's. The design already states "outline step ≤ 25 m".

## 5 Receipts (CONFIRMED, executed)

* **The edits.** `apply_m1c.py` made 83 replacements, each matched exactly once (§13.6 (9)'s rung type twice, by count). It refused any file whose bytes differed from its backup. Three follow-up passes made 2 + 14 + 2 more: a re-wrap, "per panel capture", the 14 rewordings and a re-wrap of §12.9. The log holds every before and after with its pre-edit line. `git diff --stat` shows `docs/ARCHITECTURE.md`, `docs/volumes/V12-calibration.md`, `docs/volumes/INDEX.md` and `docs/volumes/SUMMARY.md` only.
* **Backups.** All four files, the whole of `docs/volumes/*.md`, the allow file and the old bundle were copied before the first edit to the scratchpad's `m1w2/backup/`, with `SHA256SUMS`.
* **The doc checks.** Each run checked the edited and the untouched copy together, so both read one corpus snapshot: 10 670 colour files, 10 204 JSON, 955 797 3-grams, 521 lists, 54 own outputs left out.
* **Run r1 (after the edits).** The base gave C3 1 896 / 9 unreviewed and V12 163 / 8, exit 1 each. Both copies gave exit 0.
* **Run r2.** INDEX gave C3 22 / 0 and SUMMARY 10 / 0, exit 0, equal to their copies.
* **Run r3 (after the rewording, final).** The base gave C1 5, C2 2, C3 1 888, C4 24, S1 0, S2 318, none unreviewed, exit 0; its copy gave 1 889 / 0, exit 0. V12 gave C1 7, C3 155, C4 2, S2 119, none unreviewed, exit 0; its copy gave C1 8 and C3 157, exit 0. The C1 hit that went away is the README path removed from V12 §3.2.1's MFCG row (DC-29).
* **This record.** `doc_checks.py --doc docs/validation/m1-corrections-1.md --heads docs/ARCHITECTURE.md`: see the result file's `doc_checks`.
* **`plan.py --check` (21:07), verbatim:** `PLAN CHECK FAILED, nothing written:` / `catalogue mismatch: missing ['bldg.wallAlign.median', 'bldg.wallAlign.share15', 'cut.length'] extra ['bldg.wallAlign']`, exit 2. This is the expected effect of DC-17 and DC-21 until W-01b registers the ids (section 4).
* **The bundle.** 73 010 lines from 14 sources; `--check` UP TO DATE.
* **Disk.** 13 GiB free at the start and 12 GiB at the end (`df -h /Users/cstokes`; other lanes write captures meanwhile).

## 6 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read or executed).** The following were confirmed:

* every DC's old text in the design, before the edit;
* every replacement, by the script's match counts and the diff;
* the M0 items, read from `M0-work.json`'s `sections` and `afterM1Needs`;
* the doc-check counts and exits above;
* the bundle's regeneration and `--check`;
* that `plat/` holds no `Unit`, `FtgSize` or `MetricUnit` code yet (read-only grep), so no built code contradicts the changes;
* every number written into the design, quoted from E05, E07, E10 and E11 (read in their tables), or from the rulings where it was ruled there: 0.35 m per model unit, 49 500, and the programme counts.

**PLAUSIBLE (reasoning only).** The following rest on reasoning, not execution:

* that the nightly B-REF estimate rises to ≈ 24–25 CPU-min (M1 measures it);
* that no other design sentence restates a changed number in a form the greps missed. The greps covered each old value's digits and key words across the base and all volumes. They missed two sites, §4.5's *Grower* and §4.7 S11's `row` arrangement, which the verifier found and fix round 1 restated. Fix round 1's second sweep over every DC's old values found no other (§7).

## 7 Fix round 1 — the verifier's findings fixed and DC-36 applied

Lane `design/m1-corrections-1-fix` (workflow `workflows/28-wave2-followups.js`), 2026-10-03, the design seat. The
independent verifier (`m1-corrections-1.verify.json`, verdict partial) confirmed this round's core claims and found seven
minor defects. This fix round fixes all seven and applies DC-36, which R-49 added (`M-1-rulings-2.md` §9). The result file
is `m1-corrections-1-fix.json`. Where the earlier sections were wrong, they were corrected in place (§1's DC-05, DC-11 and
DC-19 entries, §2's table, §3 and §6), and each such place says "fix round 1". Nothing was written into `plat/`, no site was touched, no benchmark was run and no git
command changed state.

**Outcome.** All seven findings are fixed, and the design holds DC-36 as ruled (CONFIRMED by the edit log, the diff and
the checks below). The base changed on four lines and no other design file changed. The DC tally is now 25 applied and
10 applied-adapted, plus DC-36 applied.

### 7.1 The design edits (`docs/ARCHITECTURE.md`)

One script made the four edits. Each old string had to match exactly once, and the base had to equal its backup before
the write. `diff` against the backup shows lines 6791, 7918, 20245 and 20253 changed and no other line.

| finding | site (line) | before | after |
|---|---|---|---|
| DC-08 | §13.5 towers and gates, FTG cell (l. 20245) | "17 / 17 towers on ring vertices" | "17 of 17 towers on ring vertices" |
| DC-24 | §4.7 S11's arrangement table, the `row` arrangement's where column (l. 7918) | "(NG 95–99 % attached; FTG's warehouse rows)" | "(NG 0.98–1.00 attached under V12's definition, 95–99 % under the earlier script; FTG's warehouse rows)" |
| DC-16 | §4.5 *Grower*, the merge rule's pointer (l. 6791) | "§13.5's MFCG anchors row, 2.4–17.6 ha at size 40" | "§13.5's MFCG anchors row: 2.4–17.6 ha on the size-40 gate fixtures, 2.4–21.5 ha on the plain size-40 city" |
| DC-36 | §13.5 draw style, the NG reference cell (l. 20253) | "NG square caps, ≈ 17.4 hatch triangles and 2.33 shadow quads per wing" | "NG square caps, 18.07 hatch triangles per gable/hip wing (the two ridge tapers included; map means 15.76–21.10) and 2.29 shadow quads per wing (1.97–2.54) over the 44 plan seeds (M-1, E20; 17.4 and 2.33 were one 2026-09-21 map's ratios over the profile's wing count)" |

### 7.2 The seven findings

* **DC-08, the key's scope (fixed).** The towers-and-gates row now reads "17 of 17 towers", the older count it always
  meant. Every other two-value FTG figure in §13.5 was read: 1.03 % / 0.82 %, 0 / 1, 0.28 / 0.30, 0.365 / 0.333,
  1.160 / 1.214, 38.65 / 35.59 m, 31 m / 48 m and 10.59 / 10.57 m are all the two captures' values. The street-runs
  row's "district (L + 0.5) / 2" is a division inside a formula, not two values. So the key needs no narrower scope.
* **DC-19, the row count (fixed).** The blank line had split ten rows off §13.5's table: markets, wealth bands,
  entrances and basements, hidden plots, lighting and the five Fantasy Manor rows. This count comes from the pre-round
  backup, lines 20250–20259. The count is corrected in §1 (DC-19), in §3, and in the DC-19 entry and note of the JSON.
* **DC-05, the reason's premise (fixed).** `poor` is one of §4.5's six bands, and there is no `dense` band. The reason
  in §1 and in the JSON now says so, and adds that "dense / poor" is §4.7's granularity row, to which §4.5's table maps
  both `squalid` and `poor`. The design text needed no change and was not changed.
* **DC-24, a missed restatement (fixed).** §4.7 S11's `row` arrangement now gives V12's 0.98–1.00, with 95–99 %
  labelled as the earlier script's, in the words §4.7's granularity anchor uses.
* **DC-16, a missed restatement (fixed).** §4.5's merge rule now cites both ranges the anchors row gives. Both ranges
  share its 2.4 ha floor.
* **DC-11 and DC-15, the M0 lists (fixed).** §2 now names M0-c-04 for DC-11 and M0-b-01 for DC-15. Neither changes any
  M0 work. The fix round's own sites added M0-c-06 to DC-08 (the towers-and-gates row) and M0-e-04 and M0-x-06 to
  DC-16 (§4.5 *Grower*). §4.7 S11's arrangement table is cited by no M0 item.
* **DC-11's status (fixed).** It is relabelled applied-adapted, as the verifier judged, because "the matched sizes'
  rows" departs from the DC's wording, just as DC-22's section did. The tally is now 25 applied and 10 applied-adapted.

**A second sweep for missed restatements.** The base and every volume were searched for each DC's old values and
phrases, over 40 patterns. Apart from the two sites above, every hit was a site the record had already named, or a
value that is still true:
* §4.2 S1 (3)'s ≈ 31 m river (the usable capture's value, DC-10);
* §4.2 S3's 29 ha nuclei (our own example, DC-16);
* §4.6's and §16 M0 (b)'s σ 0.098 (ring faces, unchanged, DC-26);
* the seam rule's "361 / 361" cut ends (the raw count, unchanged, DC-04);
* §1.4's "FTG's ungated crossings" (still 3 and 1);
* §12.9's timing (it already names M-1's definition);
* V12's programme-1 history lines;
* Appendix A's 95–99 % (history).

The verifier's further note on V06's T-V6-31 is ruled not a defect. That test points to §4.4's ribbon row, which still
gives 71–85 %, now labelled as the size-40 gate fixtures' value, so it reads true. Its bar [0.6, 0.9] is our own design
value. One seed per size cannot re-set it, and J156 admits no new design. It is for the ruling that forms the ribbon
row from the ten-seed sweep (W-07b).

### 7.3 DC-36 (R-49)

DC-36 is applied with the ruled text, word for word. The band column ("15–20 triangles per wing") was not touched, as
R-49 (3) says. The old figures appear nowhere else in the base or any volume. §8.3's `hatched` row and T-V1-26 (a)
state our own bars (15–20; mean 17–19), not this reference figure, so they stand. No M0 item cites the draw-style row
or §8.3 (§2's DC-36 row). The cell carries no ⟨M-1⟩ mark, so M0-k-05's mark list does not change.

**Needs a ruling, not applied here: E20 F2.** R-49 (3) and W-22 route F2 to "the design seat". NG's own gable/hip wings
fall in 15–20 on only 52.86 % of wings, and its map means fall in 15–20 on 40 of 44 maps. So §8.3's "15–20 hatch
triangles per wing", T-V1-26 (a) and §13.5's band column can stand only as a bound on the mean per map. The narrower
"mean 17–19" fails on 20 of 44 maps.

Changing what a bar reads, per wing or per map mean, is a definition call. The plan reserves those for a ruling seat,
no DC states this one, and this seat's brief names DC-36 only. So no text was changed. The session should give F2 to a
ruling seat or to W-15's band formation, so that a DC states the wording. This seat recommends "on average per map" for
§8.3 and T-V1-26 (a), with T-V1-26's "mean 17–19" re-banded from the 44 per-map values. This is recorded here and in the
result file so that nobody loses it.

### 7.4 Judgment calls (delegated authority, J122; each vetoable)

* **"17 of 17", not a narrower key.** It fixes the one cell that misread and keeps the key's rule simple. Narrowing the
  key to "measured pairs" would have asked every reader to judge which pairs count.
* **The record corrected in place.** §1's DC-05, DC-11 and DC-19 entries and §2's rows were wrong, so they were
  corrected where they stand, each marked "fix round 1". Leaving them would keep a wrong statement beside its correction.
* **DC-11 relabelled.** The verifier's judgment was taken, because the record's own use of "applied-adapted" covers a
  change of the DC's wording.
* **F2 recorded, not decided.** See §7.3.

### 7.5 Receipts (CONFIRMED, executed)

* **Backups.** The base, the old bundle, this record, its JSON and the allow file were copied before the first edit to
  the scratchpad's `followups/backup/`, with `SHA256SUMS` (self-check OK). The base equalled the round's apply state
  (`337cf44c…`) when this fix round started, and it is `70fcf77d…` after the edits.
* **The edits.** `apply_fix.py` matched each of the four old strings once. Its log (`followups/m1c-fix/edits.json`)
  holds every before and after with its line. `diff` against the backup lists lines 6791, 7918, 20245 and 20253 only.
* **The doc checks on the base.** The edited base and its backup were checked together, so both read one corpus
  snapshot: 10 673 colour files, 10 207 JSON, 955 836 3-grams, 522 lists and 56 own outputs left out. Both gave C1 5,
  C2 2, C3 1 888, C4 24, S1 0 and S2 318, none unreviewed, exit 0. The new words add no corpus run, and no row was
  added to `doc-checks-allow.tsv`.
* **This record and the JSON files.** The checks on their final text are in the result file's `checks`.
* **The bundle.** `--check` reported STALE after the base edits. `python3 tools/bundle_architecture.py` then wrote
  73 010 lines from 14 sources, and `--check` reports UP TO DATE. Against the old bundle, only the base's hash row and
  the four edited lines differ.
* **Not touched.** This seat wrote no volume: V12, INDEX and SUMMARY still equal the round's apply state. It wrote
  nothing in E20, the rulings or `plat/`, and it read `M0-work.json` only.

## 8 Session close of the fix round (2026-10-03)

The fix round's verifier (`m1-corrections-1-fix.verify.json`, partial) found one list gap: M0-s-02 was missing from DC-16's M0 row although it loads `district.growthRate`, whose paragraph the restated anchor sits in. Added above and in the JSON (impact nil: no value changed, so nothing is carried to the build side). Every other line of both verifications passed; the design corrections round is closed.
