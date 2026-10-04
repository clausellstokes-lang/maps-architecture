# M-1 design corrections, round 2 — wave 3's measured design cells applied to the design

Lane `design/m1-corrections-2` (M-1 wave 3), written on 2026-10-04 on the owner's Mac by the design seat. The cells come
from four inputs: E12's hand-off note (`docs/calibration/E12-depth-refit.md` section 13: C-1 … C-9 and D-1 … D-3), E15's
hand-off list (`E15-baselines.md` section 8, the same list as `designHandoff` in its JSON, with its findings F2, F3 and F6), and DC-37 and
DC-38 (`M-1-plan-notes.md` section 7). They were applied by amendment to the base design, `docs/ARCHITECTURE.md`, and to
V12, V01 and V11 in `docs/volumes/`. The result file is `m1-corrections-2.json`. This record holds numbers, metric ids,
paths and our own words only. Nothing was written into `plat/`, no site was touched, no benchmark was run, and no git
command changed state.

## Outcome

**Every input is in the design** (CONFIRMED by the edit log and the diff). That covers 12 E12 cells, E15's 56 hand-off
entries, F2, F3, F6, DC-37 and DC-38. Statuses over 73 units (12 + 56 + 5): 65 applied, 6 applied-adapted, 2 already true, 0 ruled invalid. None
adds a feature. Each change does one of the following:

* corrects a measured value;
* fixes a definition that the measurement showed could not work;
* restates a reason, as DC-35 asked.

So J156's feature freeze holds.

* **The edits.** One script made 55 replacements. Each had to match exactly once in the backup copy, and no file was
  written unless it still equalled its backup. The changed files are `docs/ARCHITECTURE.md` (49 edits),
  `docs/volumes/V12-calibration.md` (2), `V01-neighbourhoods.md` (2) and `V11-content.md` (2). No section number,
  test id or J-id changed.
* **Sites beyond the hand-offs.** Some other sentences quote the same reference value as the current value: they cite
  §13.5, or they state σ, the fillet share, the attached share or the worst corner. Those sentences were corrected too
  (§5 lists them). Sentences that anchor one of our own rule values on an earlier sample, and say which sample, were
  left alone. §4 gives each one with its reason.
* **One consequence for the session (CONFIRMED, verbatim).** `python3 research/baselines/plan.py --check` now exits 2
  with `PLAN CHECK FAILED, nothing written:` / `catalogue mismatch: missing ['water.channelWidth'] extra ['water.riverWidth']`. This comes from F2's rename. The registry writer must follow (`plan.py`'s catalogue twin and
  `metrics.m-1.json`) before any `plan.py` write. Only then can W-15's five held river-width rows be appended. Last
  round's DC-17 and DC-21 had the same effect.

## 1 The corrections

### 1.1 E12 (W-12's ruling; provenance "M-1 2026-10-04")

| id | section | before | after | status |
|---|---|---|---|---|
| C-1 … C-4 | §4.7 S10 (2) band table, "depth (m)" | poor 12–20, modest 18–30, prosperous 25–40, rich 30–60 | 16–32, 24–48, 33–64, 40–96 m. The column head carries "M-1 2026-10-04, E12". A sentence under the table names the fit: `modest` on NG's `area` template at `medium`, the other rows by its lo and hi ratios 1.32 and 1.61, the rung depth factors unchanged | applied |
| C-5 | §4.4 stage regimes, dense core floor | 30–45 m (applied by S8) | 37–45 m (applied by S8; the lo re-fitted at M-1 on MFCG's intramural blocks, E12) | applied |
| C-6 | `cut.flattenM`'s provenance in step 5 of §4.6 | "an inference, recalibrated at M-1 on the bent-cut signature of §13.5" | E12's text: bounded from above, 0.59 m lowest kept height, 3 of 731 below 0.7 m, one-bend share 0.658 against 0.660. The DC's "M0-b-05b calibrates it" reads "§16 M0 (b) calibrates it", because the base names milestone clauses, not build items | applied-adapted |
| C-7 | the default shares of §4.6's deep-interior rule | 0.35 / 0.25 / 0.30 / 0.10 … 0.75 / 0.10 / 0 / 0.15, "our own values" | poor 0.355 / 0.248 / 0.298 / 0.099; modest 0.457 / 0.296 / 0.148 / 0.099; prosperous 0.659 / 0.146 / 0.049 / 0.146; rich 0.761 / 0.096 / 0 / 0.143, provenance "M-1 2026-10-04", the fitting method stated; the `MFCG` row 0.813 / 0 / 0 / 0.187 beside them | applied |
| C-8 | step 1 of §4.6 | "re-fitted at M-1 under this reading" | adds "(E12, 2026-10-04)" | applied |
| C-9 | §13.5 blocks row, band column | "… re-fitted at M-1 … before this band is signed" | the depth rows "were re-fitted at M-1 … (E12, 2026-10-04), which meets this band's condition" | applied |
| D-1 | §2.5 `Block.depthClass` and §4.6 deep-interior rule | deep when local thickness > 2 × the band's plot depth | deep when local thickness > 0.6 × the band's plot depth. That is the reference rows' own deep population (inscribed radius above 1.5 × the median footprint's short side, 21.6 m of thickness on NG), which 0.6 × the re-fitted `modest` depth of 36 m reproduces. The old test admitted 3 of NG's 597 deep blocks | applied-adapted (J-1) |
| D-2 | §7.6's `NG` resolution, with V01 §2.2, V01 §3.15, V11 §3.2.2 and V11's compile note | a cell resolves under `NG` to its `presets.NG` entry, else as under `MFCG` | a new step comes before the fallback to `MFCG`: a base cell whose default is NG's own rule, or was calibrated on NG's output, resolves under `NG` to its default. The cells named are the deep-interior shares, and `cut.bendMode` with `cut.flattenM`. No `NG` entry leaves `hood.constants`, so V11's compile check still holds | applied-adapted (J-2) |
| D-3 | §7.6, the rows carried with `presets` entries | the shares absent | the deep-interior shares, `MFCG` entry 0.813 / 0 / 0 / 0.187 in every band; `FTG` reads the default. §4.6 states the same | applied |

E12's four consequences asked for no cell change, and none was made. §4 records them, as does the result's
`owner_notes`.

### 1.2 E15 (W-15's hand-off list, 56 entries; provenance "M-1 2026-10-04")

§13.5's band-rule paragraph gained one key sentence. It says the following:

* A cell that names the matched sizes gives M-1's per-seed medians at those sizes.
* Each row's p10, p90 and band are in `baselines.json`.
* The figures they replace stay in the cell as history.
* No gate turned from passing to failing, because no product existed yet. E15 §7's list is the shift record's input.

So each cell below states medians: TOWN / CITY / METROPOLIS, which is MFCG at sizes 40 / 80 / 130 and FTG at
BIG_TOWN / BIG_CITY / METROPOLIS. Where an old cell gave a range across sizes, the cell now also names that range as
history. The ⟨M-1⟩ marks stay on every cell, because they drive M0's parity rule (C-0116). A marked cell now carries its
measured value beside the mark.

| entries | §13.5 row (or section) | what the cell now quotes | status |
|---|---|---|---|
| 1, 2 | street turning | weakness clauses read the step histograms over 10 / 10 / 4 captures; turning per 100 m 8.42 / 9.35 / 14.06°. The target clause's reason is restated (J-3) | applied |
| 3, 4 | junction arm angles | NG 4-way share 0.052 (p10–p90 0.026–0.077; 0–5 % on the fixture maps); FTG medians 91.5 / 91.1 / 92.2°, 4-way 0.25 / 0.27 / 0.21 | applied |
| 5 | street runs by class | arterial 50.5 / 50.5 / 42.2, street 37.1 / 35.3 / 35.3, lane 44.7 / 33.6 / 37.5, track 183 / 78 / 68 m; the formula figures kept | applied |
| 6 – 13 | MFCG street signature | R4 at 60 / 120 / 250 m; wall alignment by band; T / Y 0.44 / 0.45 / 0.46; dead ends 2.32 / 1.43 / 0.96 per km; blocks per ha 2.56 / 2.31 / 2.53; 9 lots per block. MFP-2's ranges kept as history | applied |
| 14 | blocks (NG) | medians 39 / 6 / 10 / 59 blocks per hood by template (minimum to maximum given), 608 blocks over 20 hoods as the area distribution; with C-9 and F3 | applied |
| 15 | deep block interiors | NG 0.457 (0.295–0.542); MFCG 0.810 / 0.810 / 0.814 | applied |
| 16, 17 | bent-cut signature: σ | 0.084 plain, 0.094 ring (0.066 and 0.098, the two fixture maps, as history; F6). Also §16 M0 (b) and the position step of §4.6 | applied |
| 18 | bent-cut: one bend; corner near mid-course | see DC-38 below | applied-adapted |
| 19, 20 | bent-cut: arrival; fillet | 0.974; 393 of 731 = 0.538 (96 % and 200 / 378 as history); §4.6 step 6's fillet sentence too | applied |
| 21 | bent-cut: cut lengths | 379 cuts with a rebuilt parent over 18 hoods, a distribution; F3 in the band column | applied |
| 22 – 24 | figure-ground and streetwall | recoverability 0.870 / 0.750 / 0.524; cover 0.605 / 0.624 / 0.623; streetwall 0.923 / 0.928 / 0.924 | applied |
| 25, 26 | plots and footprints | FTG median 96 / 99 / 91 m², p95 163 / 161 / 164 m², quad side 10.24 / 10.33 / 9.95 m, worst corner 22.8 / 25.5 / 26.3°; MFCG 251 / 263 / 242 m² (descriptive) | applied |
| 27 – 29 | party walls and attachment | NG 0.441 (0.409–0.463), attached 0.987; FTG 0 and 0.14 / 0.14 / 0.23 over all footprints (descriptive) | applied |
| 30 | plot-area gradient | Moran −0.10 (−0.23 … +0.06) | applied |
| 31 – 34 | walled share and ribbons | walled 0.905 / 0.905 / 0.924; ribbon 0.773 / 0.623 / 0.532 | applied |
| 35 – 42 | MFCG anchors | district area 8.9 / 17.5 / 30.4 ha; spacing 90 m; castle 2.38 / 3.51 / 3.83 ha; plaza 0.38 / 0.33 / 0.36 ha; 8.5 / 12.5 / 16 districts; the one-seed and fixture figures as history | applied |
| 43, 44 | outline anisotropy | r90 CV 0.321 / 0.203 / 0.331; road ratio 1.35 / 1.19 / 1.28; provenance "M-1 2026-10-04" replaces "M-1 ⟨date⟩"; §4.4 S5a's target sentence too | applied |
| 45 – 47 | towers and gates | spacing 34.9 / 33.4 / 32.7 m; ungated 3 / 3 / 4; MFCG gates 5 / 8 / 12 as ten-seed medians | applied |
| 48 | water | step 17.2 / 16.9 / 50.0 m; the held river-width rows 44.0 / 46.1 / 29.8 m, named as held; MFCG's export key reworded (F2) | applied |
| 49 | tree scatter | NN median 10.4 / 10.3 / 9.2 m, p1 0.985 / 1.063 / 1.196 m | applied |
| 50 | population and buildings | MFCG 6.03 / 6.15 / 6.04; FTG 3.29 / 3.35 / 3.37 | applied |
| 51 | generation time | CITY PUT → layout GET 4.27 s median (2.77–5.25 s over three); 2.13 / 6.23 / 13.00 s at the matched sizes; §12's sentence too | applied |
| 52 | draw style (NG hatched) | 18.07 and 2.29 over the 44 plan seeds: DC-36 already wrote them | already true |
| 53 | between-seed variety | MFCG 1.81 / 1.56 / 1.74 z, FTG 3.29 / 3.48 / 3.36 z | applied |
| 54 | markets | 0 secondary markets and 0 adjacent pairs, as the cell already said | already true |
| 55 | wealth bands | "measured at BIG_TOWN, where every capture shows one distribution". The design does not quote the six shares (J-4) | applied-adapted |
| 56 | §4.7 granularity table, `prosperous` anchor | "MFCG 9 footprints per cluster block at sizes 40 / 80 / 130 (… the earlier ≈ 18.6 counted the profiler's partition leaves, E09)" (F6) | applied |

### 1.3 F2, F3, F6, DC-37, DC-38

* **F2 (applied).** V12 §3.4.2's id becomes `water.channelWidth`. Before the edit, the candidate was scanned by
  `make_denylist.py scan` against both lists: 0 hits on the research list and 0 on the M0 list. The old id, scanned as
  a control, hit TOK on both. §13.5's water cell named MFCG's export key in backticks. It now reads "MFCG's exported
  river width". Neither the base nor any volume still contains the old token (grep, 0 hits). No `plat/` file holds it
  (read-only grep). M0 reads no `water.*` metric.
* **F3 (applied as information).** The blocks row's and the bent-cut row's band columns now say where the KS clause
  gates at NG's sample. For blocks it binds on two templates, `area` and `square`; for cut lengths on
  `area` and `ring`. Elsewhere, 1.25 × the seed-to-seed spread reaches 1. Whether the clause should compare pooled distributions
  instead would be new design (J156). It was not changed.
* **F6 (applied).** σ plain moves from 0.066 to 0.084, and its ± 0.02 band moves with it. §13.5 says so, as do
  §16 M0 (b) and the position step of §4.6. The granularity anchor is entry 56.
* **DC-37 (applied).** V12 §3.3 C2: `id`, `metric` and `supersedes` take `^[A-Za-z0-9.:/@+_-]{1,120}$` together with
  the other id fields, "matched case-sensitively (`sgd.tShare` and `sgd.tshare` are two ids)". No other statement of
  the pattern exists in the design (grep).
* **DC-38 (applied-adapted).** §13.5's bent-cut row did not say "about 73 %" or "about 82 %". It said "one bend at
  mid-course in 380 / 519", so the intent was applied to that text. The row now carries the formula seeds' values: one
  bend on 739 of 1 125 streets (66 %), and the corner within 0.10 of mid-course on 211 of 239 bent cuts (0.883). The
  fixture figures are named as history: 380 / 519, and the corner near the middle on 99 / 120. The DC said "about
  89 %", which is E10's simple-parent value (0.888). The row W-15 formed and F6 confirms is 0.883, so the design
  carries the row's value. The band columns, which are W-15's, are unchanged.

## 2 What the build side carries (M0 items whose `sections` include a changed section; `M0-work.json`, read only)

| change | M0 items | what changes for them |
|---|---|---|
| C-1 … C-4 depth rows | M0-s-02 (landed), M0-b-01 (landed), M0-b-05, M0-b-05a, M0-b-05b | `granularity.json`'s `depthM` rows go from [12, 20], [18, 30], [25, 40] and [30, 60] to [16, 32], [24, 48], [33, 64] and [40, 96], provenance "M-1 2026-10-04". M0-b-01's block-depth ranges move with them (`modest` at CITY e = [48, 96] against [36, 60]), so any test that pins the old range changes. The AFTER-M-1 items apply the cells as `afterM1Needs` asks |
| C-5 floor | M0-s-02, M0-b-01 | `regimes.json` dense-core `blockDepthFloorM` [30, 45] → [37, 45]; it binds the `poor` band's lo at every rung |
| C-6 `cut.flattenM` | M0-s-02, M0-b-05, M0-b-05b | the value stays 0.7 m; the provenance note changes. M0-b-05b's calibration on NG's recorded faces stands, with E12's bound as its prior |
| C-7, D-3 shares | M0-s-02, M0-b-03, M0-c-07, M0-c-07a, M0-c-07b | `interior.json`'s four share cells per band take the new values, and the shares cell gains the `presets.MFCG` entry 0.813 / 0 / 0 / 0.187 (the cell form already allows it). The MFCG deep-interior row then holds under the `MFCG` preset |
| D-1 deep test | M0-m-01 (landed: `Block.depthClass`'s doc comment), M0-b-03 (wave 12), M0-c-07, M0-c-07a, M0-c-07b | S8's deep test is local thickness > 0.6 × d̄, no longer 2 × d̄. At the re-fitted rows most blocks are deep, like NG's. The court-share keep-test reads that population |
| D-2 `NG` resolution | none at M0 | M0's loader resolves defaults only; presets arrive at M1. M1's loader (V11 §3.2.2) and V01's M5 harness carry it |
| C-8, C-9, F3 | M0-b-05, M0-b-05b, M0-c-07, M0-c-07a, M0-c-07b | the blocks band is signable. The KS clause gates at NG's sample on `block.area` `area` and `square` and on `cut.length` `area` and `ring`; the other subsets cannot fail (E15 §4) |
| σ and DC-38 (E15 16–21, F6) | M0-b-04, M0-b-05, M0-b-05a, M0-b-05b, M0-x-01 | §16 M0 (b) now reads "within ± 0.02 of 0.084 (plain faces) and 0.094 (ring faces)". The section quotes of M0-b-05, -05a and -05b, and `afterM1Needs`' M0-b-05a line, still say 0.066 and 0.098; the session corrects them. The corner (≥ 80 %), arrival (≥ 95 %) and fillet (± 0.05) clauses are unchanged; their reference values are 0.883, 0.974 and 0.538 |
| §13.5 rows M0 measures (E15 3–15, 22–24) | M0-k-05, M0-c-06, M0-c-07, M0-c-07a, M0-c-07b, M0-x-03 | quoted values only; metric ids, roles, bands and ⟨M-1⟩ marks are unchanged, so M0-k-05's registry and parity CLI are unaffected |
| DC-37 | M0-k-05 | none: N-24 already gave M0's C1 this pattern, and V12 now agrees |
| F2 rename | none | no M0 item reads `water.*`; N-01's table does not list it |
| other consistency edits (§1 table, §4.4 S5a, §4.7 class floors and S11, §12, §15.2 O6 and O17) | M0-s-02 (§4.7 class floors: text only), M0-c-04 (§4.4 S5a: the calibration-target sentence only) | nothing they build changes |

## 3 Judgment calls (delegated authority, J122; each vetoable)

* **J-1 — D-1's form.** I chose the factor form, deep when thickness > 0.6 × d̄. The alternative was E12's first
  wording: inscribed radius > 1.5 × the band's median footprint short side. The factor keeps the rule in its existing
  terms and changes one constant. Footprints do not exist yet when S8 runs, so the alternative would need a band
  value no table holds (new design). 0.6 × 36 m = 21.6 m, the reference's own threshold. Veto flips it to the
  footprint form.
* **J-2 — D-2's mechanism and reach.** I chose a resolution step over an `NG` entry equal to the default. An entry
  would break §7.6's and V01's "entries stand only on `hood.constants`" and V11's compile check. I named
  `cut.bendMode` with `cut.flattenM` beside the shares. D-2's own test ("rows M-1 calibrated on NG") covers
  `cut.flattenM` (J-A37.01). §4.6 step 5 gives `flatten` NG 1.2.2's provenance and `straightFirst` the provenance of MFCG's square test.
  So the old fallback would have run MFCG's square test and 8 m flatten length under `NG`, and the two cells move as a
  pair. Veto narrows it to the shares alone.
* **J-3 — DC-35's choice: the target clause's exception restated, not withdrawn.** E05 printed the ten-capture bands
  as DC-35 asked. FTG's own median rises with size, from 8.42 at BIG_TOWN to 14.06° at METROPOLIS. The band rule's
  per-size bands (6.7–9.7 and 9.8–17.6) share no value, and the clause's fallback tunes one `headingSigma`. Withdrawing
  the exception would make the organic target unmeetable across sizes by construction. Veto withdraws it: the band
  rule per size, with E05's `type7` bands.
* **J-4 — the wealth-band values are not quoted.** FTG's six shares are identical on all ten BIG_TOWN captures, so they
  form one fixed table. The rows carry them as numbers. The design names the measurement only (the
  clean-room rule on content tables). Veto writes the six shares in.
* **J-5 — the new id.** `water.channelWidth`: our words, and 0 hits on both lists. `water.bedWidth` and
  `water.flowWidth` also scanned clean. Veto picks either.
* **J-6 — precision.** Shares are written to three decimals where the cell needs the reference value itself (σ, court
  share, fillet). Elsewhere they take the design's usual two or three significant places. The exact values are the
  rows'. A few cells carry one more digit than their neighbours: turning per 100 m, the quad sides, the castle areas
  and the server times. Shorter forms of these number runs, and five short phrases, matched 3-grams of the reference
  corpus (18 unreviewed C3 and deny-list TRI hits on the first run). They were reworded rather than allowed, so no
  allow row was added for our words.

## 4 Noted for the session, not changed (recorded so nobody re-finds them as bugs)

* **E12's consequences** (no cell asked):
  1. The upper block area e_hi² rises at CITY to 0.92 ha at `modest`. That moves §4.6's substitution bound and §4.5's
     district claims. τ's own p90 reading would be a design choice for the owner.
  2. d̄ moves to 36 m at `modest`, so the reflex pre-cut and step 8 read deeper.
  3. The `modest` hi end is weakly identified (bootstrap 78–153 m). M0's S8 reference run confirms it.
  4. The rung depth factors stand, although MFCG's blocks barely move with size.
* **Anchors of our own rules, left as they stand.** Each names the earlier sample it was set on. Re-anchoring would be
  tuning, not a measured correction:
  * §4.5's walled-share stage rows (0.87–0.92, "sweep README"). M-1's 0.905 / 0.905 / 0.924 agree.
  * §4.2 S3's plaza band (0.32–0.58 ha). M-1's medians fall inside it.
  * §4.2 S3's gate law (5 / 8 / 12). Equal to M-1's medians.
  * §4.5's district-area merge note. Its figures stay in §13.5 as history.
  * §4.5's count law, N_q = round(1.37 · B^0.267), fitted on 9 / 12 / 18 / 22 / 24.
  * §9's label bar: within one of 9 / 12 / 18, the counts of the sweep taken on 25 September.
* **The count law at METROPOLIS (for the owner).** M-1's ten-seed median at size 130 is 16 districts. The law gives
  17–18 at METROPOLIS. That is inside §13.5's anchors band (11.5–21.0) but outside ± 1 of 16. Whether to re-fit the law
  is a tuning call; it was left.
* **Narrative history kept.** The calibration-target list in §0.3 ("FTG's 10.3 m quad side"), the closing summary list,
  §15.2 O19's "FTG minimum 0.14 m" and §4.6 step 5's "3 / 519" are true of the samples they name.
* **The count in W-15's result.** `results/W-15.json` says "57 design cells". The `designHandoff` list holds 56 entries
  (55 of §13.5 and one of §4.7).
* **The digest (W-17, drafting in parallel).** E12 §14's entry (6) was written before D-1 was applied. The digest
  entry should state the applied test (thickness > 0.6 × the band's plot depth) and the `MFCG` preset entry. Entry (2)
  and σ's entry should carry 0.084 / 0.094.

## 5 Receipts (CONFIRMED, executed)

* **Backups.** `ARCHITECTURE.md`, `ARCHITECTURE-FULL.md`, `doc-checks-allow.tsv` and every `docs/volumes/*.md` were
  copied before the first edit to the scratchpad's `m1w3/backup/`, with `SHA256SUMS` (18 files). `git status` showed
  the design files clean.
* **The edits.** `mc2_apply.py` applies `mc2_edits.py`'s 55 edits to the backups, each matched exactly once, and
  refuses any file that differs from its backup and from its own last output. The log `mc2_apply.log.json` holds every
  before and after with its line. `git diff --stat` lists the four files only.
* **Consistency sites beyond the hand-offs** (edited, in the same script):
  * §1's comparison table: the towers and walled-share criteria;
  * §4.4 S5a's road-ratio target;
  * §4.6 step 6's fillet share;
  * §4.7's class-floor worst corner;
  * §4.7 S11's attached share;
  * §12's FTG server time;
  * §15.2 O6's and O17's evidence.
* **Greps after the edit.** Every old figure in the hand-offs was grepped again across the base and the volumes. Each
  surviving hit is a history clause in the new text, or a site listed in §4.
* **The deny-list.** Candidate ids were scanned by `make_denylist.py scan --list research|m0`, with the old id as a
  control. Results are in §1.3.
* **`plan.py --check`** exits 2 (verbatim in the outcome). `--catalogue-check` exits 1 with "missing from registry:
  ['water.channelWidth']".
* **The doc checks and the bundle.** See the result file's `checks`, which hold the counts and exits of the final runs.

## 6 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read or executed).**

* Before each edit, the old text of its input was read where the design stood.
* Every replacement is confirmed by the script's match counts and the diff.
* Every number written was read from E12 section 12 and section 13, E15 section 8 and the JSON (held rows included),
  and E10 section 9.
* The M0 items were read from `M0-work.json`'s `sections` and `afterM1Needs`. Their landed tables were read read-only.
* The deny-list scans and `plan.py`'s two checks were run.

**PLAUSIBLE (reasoning only).**

* No sentence outside the edits restates a changed figure in a form the greps missed. The greps covered each old value's digits
  and key words across the base and every volume. Last round's verifier found two such misses.
* J-3's premise that one `headingSigma` cannot follow FTG's size trend. It rests on the fallback's wording, not on a
  run.
* That most blocks become deep under J-1's test at the re-fitted rows. E12's forward run puts `modest` blocks at a p10
  of 30.2 m against a 21.6 m threshold. M0-b-03's harness measures it.

## Round 3 — `design/m1-corrections-3` (2026-10-04)

Lane `design/m1-corrections-3`, the design seat of rulings round 3 (`M-1-rulings-3.md`), on the owner's Mac beside M0's
four build seats. Its inputs: the record-completeness and m0-affected items of `m1-corrections-2.verify.json`, the
`design/m1-corrections-2` item of `results/wave3-verify-ab.json`, and DC-39 … DC-41 of `M-1-rulings-3.md` §2. The result
file is `m1-corrections-3.json`. Nothing was written into `plat/`, no site was touched, no benchmark ran, and no git
command changed state.

**Outcome (CONFIRMED by the edit log and the diff).** 13 replacements, each matched exactly once in its backup copy: the
base `docs/ARCHITECTURE.md` 5, `V12-calibration.md` 4, `V11-content.md` 1, and 3 in this record (above, in place). The
three stale tower-spacing quotes now carry E15 entry 45's medians. DC-39, DC-40 and DC-41 are in the design; DC-41
stands or falls with D13 (R-54). One further clause, the wave-3 verifiers' minor wording point, was corrected (X-1).
No number moved except as the inputs state, no section, test id or J-id changed, and no allow row was added.

### R3.1 The changes

| id | site | before | after | status |
|---|---|---|---|---|
| T-1 | base §4.8 S7 *Towers* | "FTG's 39 m median and MFCG's tower-per-vertex are the two reference points" | "FTG's median spacing 34.9 / 33.4 / 32.7 m at the matched sizes (§13.5) and MFCG's tower-per-vertex are the two reference points" | applied |
| T-2 | base §15.2 O8 row (c) | "[P — FTG 39 m]" | "[P — FTG medians 34.9 / 33.4 / 32.7 m at the matched sizes, §13.5]", as the O6 and O17 tags have it | applied |
| T-3 | V11 §3.19.1, under the era rows | "FTG's 39 m tower spacing and MFCG's tower-per-vertex remain §4.8's reference points" | "FTG's median tower spacing (34.9 / 33.4 / 32.7 m at the matched sizes, §13.5) and MFCG's tower-per-vertex remain …" | applied |
| W-1 – W-3 | this record's §2 table, §4 and §5 | "§16 O6 and O17", "§16 O19", "the calibration-target list in §1.4" | "§15.2 O6 and O17", "§15.2 O19", "§0.3" | applied |
| DC-39 | V12 §8.3 (1), the *Pre-decided* clause | MFCG to 20 seeds per size; FTG's rows as §13.5 classes them (weakness and descriptive, the one declared target exception) | the ruling's text: each flagged target row keeps role, values and band and carries a stability marker in its `note`; the 20-seed fallback withdrawn by J171 with its reason; FTG's roles as §13.5 classes them, its type 7 band-rule rows marked (R-50 (4)) | applied-adapted (J-7, J-9) |
| DC-39 | V12 §3.5.4 | — | "The report prints a row's stability marker (V12 §8.3 (1)) beside its verdict, as it prints "declared exception"." | applied-adapted (J-8) |
| DC-40 | base §13.5 draw style, the MFCG cell | 7 / 7 maps, 4 062 / 4 063, 17-step order, widths 6.2 / 12.4 / 6.5 px at size 40's scale | the ruling's text: the eleven cased recordings of the twelve, round joins 0.99998 pooled, walls after buildings on 8 / 8 complete logs, widths as M-1's ten-seed `draw.widthPx` rows at size 40, the earlier figures as history | applied-adapted (J-9) |
| DC-40 | V12 §3.5.5 step 2 | — | "A row without `matched` (the MFCG draw rows on the recorded family) is read at every setting of its reference." | applied |
| DC-41 | V12 §3.3 C10 | "over the whole file: 0 hits" | "over the file: 0 hits — a JSON file read by its string values and keys, each a text of its own, never its numbers" | applied (stands or falls with D13, R-54) |
| DC-41 | base §17.1 (5), the scanner's scope sentence | "… and the digest, in the PR tier" | "… and the digest, and the crossing files under `plat/packages/testkit/baselines/` by their string values and keys (a numbers-only file carries no word in its numbers), in the PR tier" | applied (stands or falls with D13, R-54) |
| X-1 | base §13.5 deep block interiors, the MFCG clause | "each over the reference's deep blocks, §4.6's deep-interior rule" | "each over the reference's deep blocks as V12 §3.4.2's `block.courtShare` defines them" | applied (J-11) |

E15 entry 45 (`E15-baselines.json` `designHandoff`): `wall.towerSpacing` medians 34.897 at BIG_TOWN (`minmax`, n 9),
33.3575 at BIG_CITY (`type7`, n 10) and 32.704 at METROPOLIS (`minmax`, n 4). The 39 m figure stays in §13.5's towers
cell as history; the three restated sites carry no history clause, as the O6 and O17 tags carry none.

### R3.2 This record, completed (the verifiers' record points)

* **Location labels (W-1 – W-3).** O6, O17 and O19 are rows of §15.2's improvement matrix, and the calibration-target
  list sits in §0.3; the three places above now say so. `m1-corrections-2.json` (`design_corrections`, `notes`) carries the
  same two labels; it is a landed result, kept as history, and this section and `m1-corrections-3.json` supersede them.
* **Edits made in round 2 but not listed in §1 or §5.** Round 2's script also changed the anchor column of §4.7 S10 (2)'s
  band table (its labels C-1 and C-2): the `poor` anchor now reads NG attached 0.987 and party walls 0.441 (E15 entries
  27–28), and the `modest` anchor FTG quad side 10.24 / 10.33 / 9.95 m and footprint 96 / 99 / 91 m² (entries 25–26).
  For M0: M0-s-02's `granularity.json` reads the depth column, so the anchor column is text only.
* **§2's M0 table, completed (read from `M0-work.json`).** M0-b-04's and M0-b-05a's `exitBars` also quote σ's
  0.066 / 0.098; the session carries this as N-28 (`plat/docs/build/checks/M0-spec-notes.md`, read only), which names
  M0-b-04, M0-b-05, M0-b-05a, M0-b-05b and M0-x-01. M0-b-05a belongs under C-8 (its section is §4.6 step 1 on the depth
  rows and regime floors re-fitted at M-1), and M0-x-03 under σ (§16 M0 (b), (c), the comparison clauses). Nothing
  they build changes for: M0-b-02 (§4.6 steps 1–7, where it builds the flatten rule on `cut.flattenM`), M0-c-01 (§4.4
  S5a, the regimes' a), M0-d-03 and M0-x-06 (§4.6 step 1, C-8's parenthetical only), and M0-t-00 and M0-t-01 (§16 M0
  (a)–(f), so M0 (b)'s σ).

### R3.3 What the build side carries (M0 items whose `sections` include a changed section; `M0-work.json`, read only)

| change | M0 items | what changes for them |
|---|---|---|
| T-1 (§4.8 S7 *Towers*) | none; M0-s-02 and M0-c-02 cite §4.8's strip widths and wall strips only, and M0-c-02 defers S7's towers to M1 (C-0033) | nothing |
| T-2 (§15.2 O8) | none; no M0 item cites §15.2 | nothing |
| T-3 (V11 §3.19.1) | none; M0 reads no volume (C-0092) | nothing |
| DC-39 (V12 §3.5.4 and §8.3 (1)) | none by section. M0-k-05 (wave 11) reads the marker inside a row's `note`; M0-c-07a's eight gate rows among the 50 marked rows keep their values and bands | nothing they build: no role, value or band changes; printing the marker beside the verdict is V12's M1 report |
| DC-40 (§13.5 draw style; V12 §3.5.5) | none; M0-k-05's metric list holds no `draw.*` metric | nothing; a row without `matched` loads (§13.5's `Baseline` has `matched?`) and is never selected at M0 |
| DC-41 (§17.1 (5); V12 §3.3 C10) | M0-k-06 (wave 13), M0-k-07 (AFTER-M-1 (a)); M0-k-05 | M0-k-06's scanner scope gains the JSON files under `plat/packages/testkit/baselines/`, read by string values and keys, so its section quote in `M0-work.json` is behind the design; the session carries it as N-26 (rulings round 3 §3). M0-k-07's run over `plat/` reads those files the same way. M0-k-05: C10 is not run at M0 (C-0092 (2)), so nothing changes. A veto of D13 restores both sentences, and the session replaces N-26 (R-52's coupling) |
| X-1 (§13.5 deep block interiors) | M0-c-07, M0-c-07a, M0-c-07b, M0-k-05 | nothing they build: the reference values are unchanged and the rows are read as stored; the clause only names the definition the reference rows were measured by |
| W-1 – W-3 (this record) | none | nothing |

### R3.4 Judgment calls (delegated authority, J122; each vetoable)

* **J-7 — DC-39's trailing parenthetical dropped.** The old clause went on "(weakness and descriptive, the one declared
  target exception)", past the ruling's quoted text. That list described FTG's rows when FTG had three captures. §13.5
  now classes FTG's tower spacing, street runs and outline rows as targets, and R-50 (4) marks exactly those type 7
  band-rule targets, so keeping it would contradict the new clause. The new clause names §13.5 as the authority instead.
  Veto restores it.
* **J-8 — a cross-reference in §3.5.4.** The added sentence names "(V12 §8.3 (1))", which defines the marker, since a
  reader of §3.5.4 meets the term there first. Veto drops the parenthesis.
* **J-9 — rewording for C3, no allow row.** The ruled texts as written matched corpus 3-grams: 4 unreviewed runs in the
  base (two date runs, two width lists) and 1 in V12 ("share and the" before a percentile pair). As round 2 did (J-6),
  the words were changed and the meaning kept: "twelve recordings of 21 and 25 September 2026", "on the recordings of
  21 September before", "the model widths 7.6, 15.2, 8 and 4.8 m in every export; 6.2, 12.4, 6.5 and 3.9 px on the
  four-gate fixture's scale before", and "the row's flip share and each edge's 2.5–97.5 % bootstrap interval". Veto
  writes the ruled forms and adds reviewed allow rows.
* **J-10 — the tower-spacing sites carry no history clause.** §13.5's cell keeps 39 m as history. The three restated
  sites follow the corrected O6 and O17 tags, which name the matched sizes and §13.5 and carry no history. Veto adds
  "(39 m earlier)" as §1's comparison table has it.
* **J-11 — X-1, outside the brief's enumerated list.** Both wave-3 verifiers flagged the clause as misleading. Round 2
  wrote it, and the owner's rule is to fix every finding now. It said the reference's 0.810 / 0.810 / 0.814 were taken
  over "§4.6's deep-interior rule", but the rows use V12 §3.4.2's inscribed-radius definition (R-20 (4); E12 entry 6).
  Under J-1's test the two agree on NG at `modest` (593 of 597, the wave-3 verifier), not by definition. One clause
  changed; no value. Veto restores round 2's wording.

### R3.5 Noted, not changed (so nobody re-finds them)

* **Other 39 m mentions.** §0.3's calibration-target list and the closing CONFIRMED-versus-PLAUSIBLE sentence say the
  number was measured and confirmed by its own lane, which is history of the sample they name, as round 2 kept the same
  sentences for 10.3 m. §17.1 (6)'s "39 m tower spacing (FTG)" illustrates the form of a `ref:` provenance label; no
  cell carries such a label (grep). §1's comparison table already reads "33–35 m … (M-1; 39 m earlier)".
* **§8.3's `ink` census row** (its five drawn widths within ± 15 %, at "MFCG size 40, 0.816 px/m") states
  its scale. The model widths × 0.8157 px per m give exactly those widths, and the model widths hold in every export
  (E07 §7), so the bar agrees with DC-40. No correction is owed.
* **V12's PLAUSIBLE list, item 2** ("the ten-seed choice's adequacy (S-V12-1)") stays true: the marker carries the edge
  noise rather than establishing adequacy.
* **For the owner (the round-2 verifier's note).** FTG's re-measured medians (34.9 / 33.4 / 32.7 m) lie just below our
  own 35–60 m tower-spacing rule (V11's era rows), so the rule's anchor no longer sits inside it. Re-anchoring would be
  tuning (J156); it was left.
* **For the session (PLAUSIBLE, M0-k-05, wave 11).** C-0092 (2) words M0's note check as "a note holds only numbers,
  units, our ids and the provenance forms". W-15's notes already hold words ("main gates = N exact by our law …"), as
  will R-50's markers ("edge noise", "lo", "hi"). A literal reading would refuse such notes, so the check's M0 reading
  may need confirming beside N-31 before the first crossing.

### R3.6 Receipts (CONFIRMED, executed)

* **Backups.** Before the first edit, `ARCHITECTURE.md`, `ARCHITECTURE-FULL.md`, `V11-content.md`, `V12-calibration.md`,
  this record, `doc-checks-allow.tsv` and `design-allow.tsv` were copied to the scratchpad's `m1r3/backup/` with
  `SHA256SUMS`. The design files equalled git HEAD and round 2's last write (base `cde0c228`, V12 `ae77045f`, V11
  `cce719fb`).
* **The edits.** `m1r3/mc3_apply.py` applies `mc3_edits.py`'s 13 edits to the backups, each matched exactly once. It
  refuses any file that differs from both its backup and its own last output. `mc3_apply.log.json` holds every before
  and after with its line.
* **Content.** Deny-list scan (`make_denylist.py scan`) of the four edited files: research list TOK 8/0, ID 13/0,
  TRI 2465/0, COL 0/0, SET 50/0, PHR 7/0, FILE 0/0; M0 list TOK 8/0, TRI 2465/0, COL 0/0, SET 50/0, FILE 0/0; both
  exit 0. The same counts hold on the backups (control), so no class rose. The 13 new texts alone scan 0 hits in every
  class on both lists.
* **Doc checks, the bundle and the allow files.** See `m1-corrections-3.json` (`checks`), which holds the final runs'
  counts and exits.

**CONFIRMED versus PLAUSIBLE.** CONFIRMED (read or executed): each value written was read from E15's JSON (entry 45) or the ruling's
text; every site was read where the design stood; the M0 rows come from `M0-work.json`'s `sections`, `defers` and
`exitBars`; the scans, doc checks and bundle check ran. PLAUSIBLE: that no other sentence restates a value this round
changed. The greps covered "39 m", "tower spacing", the old draw-style figures, "20 seeds", "whole file", "S-V12-1" and
the scanner's scope words across the base and every volume.
