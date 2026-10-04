# M-1 rulings, round 3 — S-V12-1 under J171, D28's draw family, N-26, F5 and D13

Lane `m1/rulings-3`, 2026-10-04 (from 10:19 EDT; the LANDED line in `docs/lane-events.log` carries its end), the Fable
ruling seat of round 3 (J171; `workflows/30-m1-rulings-3.js`), on the owner's Mac beside M0's four build seats. A
research-side record (`plat/CLEAN-ROOM.md` rule 2: implementer seats do not read it). It holds numbers, metric ids, file
paths and our own words: no reference word list, grammar, palette value or identifier. Nothing here was written into
`plat/` or the design, no website was touched, no benchmark ran, and no git command changed state. The two rows this
record writes for M0 (section 3) are in our words, field names and design sections only, for the session to carry
(C-0071's channel).

**What this record is.** Every ruling below was decided under the owner's delegation (J122) and is **vetoable**: an id
(R-nn, continuing round 2's R-49), the question, the ruling, its reason and the record that measured the fact it rests
on. The owner's own decision of the day is J171 (`docs/PROGRESS.md`): **no extra MFCG loads** for S-V12-1; the MFCG rows
stand at ten seeds; this round restates the spike's test or remedy on the measured evidence. Section 2 lists the design
corrections for the design seat (DC-39 … DC-41, continuing DC-38); section 3 gives the two rows the session carries to
M0 (N-26, N-31); section 4 names what is flagged for the owner's eye; section 5 says what this round routes elsewhere;
section 6 separates CONFIRMED from PLAUSIBLE. The result file is `results/rulings-3.json`.

**Inputs read whole (CONFIRMED):** `M-1-plan-notes.md` (section 7 and the rest), E13 with its JSON (`rows[]`,
`outcome`, `families`, `projection`), E15 with its JSON (`heldRows`, `w13Addendum`, `bands`, `designHandoff`) and
`results/W-15.json`, `results/wave3-verify-ab.json`, `docs/validation/m1-corrections-2.md` and its `.verify.json`, V12
§8.3, §3.5, §3.3, §2.3 and §2.4, `plat/docs/build/M0-work.json`'s M0-k-05 and M0-k-06 items and `afterM1Needs`,
`M0.md`'s `baselines:check` passages, `plat/docs/build/checks/M0-spec-notes.md` (N-01 … N-30) and
`M0-handoff-M1.md` (attachments A to C), `choices.md` C-0092, C-0116 and C-0120 (read only), `M-1-rulings-1.md` and
`M-1-rulings-2.md` (the R-nn, DC-nn and flag forms; R-02, R-03, R-14, R-29, R-34, R-44, R-47 (a), R-48, R-49),
`M-1-plan.md` §1 D13 / D28, §2 W-13 / W-15 / W-20, §5 and §7, `research/baselines/plan.py` (the recorded CITY block,
`compute()`), `cross_check.py` (`load_plan`, C7, C10, `text_of_strings`), `rows.py` (`w13_addendum`, `mfcg_value`),
`spike_bootstrap.py` (`stream`, `pick`, the `loDraws` / `hiDraws` quantiles 2.5 / 50 / 97.5), `metrics.m-1.json`'s
`draw.*` entries, E07 §6–§7 with its JSON `draw` and `matchedWidthsPx` blocks, the six draw-record folders' `meta.json`
(flags and labels only), `research/baselines/candidates/baselines.json` (the row forms and every note's length), the
J122, J156, J164, J168–J171 rows of `docs/PROGRESS.md`, and §13.5's `Baseline` interface, band-rule paragraph and
draw-style row.

## 1 The rulings (R-50 … R-54)

**R-50 — S-V12-1: the test stands as measured; its remedy is restated — no extension (J171); every flagged row keeps
its role, its values and its band and carries a stability marker; the design change is DC-39.**

*(1) The fire is real and CONFIRMED.* 49 of the 72 band-rule MFCG target rows flip in more than 5 % of the 1 000
draws (68.1 %; 18 / 16 / 15 of 24 at TOWN / CITY / METROPOLIS), 50 of 78 with W-08's two rows added (E15 §6:
`fg.streetwall` stable at every rung, `fg.recoverability` unstable at METROPOLIS, 108 of 1 000), and the companion
readings fire too (64.1 % with the fixed-band rows counted, 93.1 % with candidates at ± 5 % of the band width). The
threshold sits in an empty gap (the most-flipping stable row 2.7 %, the least-flipping unstable row 13.8 %), so the
verdict does not depend on a reading. E13 §7 states the cause and this seat confirms it from the table: 47 of the 49
flagged rows have at least one edge set by a spread term (p10 × 0.9 or p90 × 1.1), which at n = 10 under type 7 rests
on the two outermost seeds; 16 of the 23 stable rows have both edges set by the centre terms. The test measures
whether 5 % of an edge is larger than that edge's sampling spread, which for a dispersed metric no feasible sample
satisfies (the model's 53 of 72 at 20 seeds and 38 of 72 at 100; PLAUSIBLE, E13 §7).

*(2) The remedy, restated.* V12 §8.3 (1)'s pre-decided remedy (20 seeds per size) is withdrawn for M-1 by the owner
(J171) and, by E13 F2, could not have satisfied the test. In its place: **a target row the spike finds unstable keeps
its role, its stored values (p10 / p50 / p90 at ten seeds) and its band as V12 §3.5.2 forms it, and gains a stability
marker** — in its `note`, joined to the existing note by "; ", of the form
`S-V12-1 edge noise ⟨row flip share, two decimals⟩: lo ⟨2.5 %⟩-⟨97.5 %⟩, hi ⟨2.5 %⟩-⟨97.5 %⟩` (three significant
figures; a one-sided band gives `lo … (one-sided)`), the intervals being the 2.5th and 97.5th percentiles of the
recomputed edge over the spike's 1 000 seeded draws (E13's `loDraws` / `hiDraws`; the same draws, `drawsSha256`
pinned) — and, research-side, a `stability` block in `E15-baselines.json`'s `bands[id]` holding the flip share, both
intervals, the edge terms, the draw digest and the source. The marker enters the shift record beside E15 §7's list.
**Exactly which rows change:** **50 rows change their note; 0 rows change role; 0 rows change band** — the 49 band-rule
rows E13 lists in `outcome.unstable` (18 at size 40, 16 at 80, 16 at 130, including the eight M0-c-07a gates on:
`sgd.tShare` at 40, `sgd.deadEnds` at 40 / 80 / 130, `blockc.perHa` at 40 / 80 / 130, `block.courtShare` at 80) and
`mfcg/130/plain/fg.recoverability/all` under §13.5's one-sided form; every marker is in Appendix A with its intervals,
computed by this seat from E13's JSON (and, for the one-sided row, from the addendum's own draws, section 6). The
combined notes stay within C3's 200 characters (the longest 198; CONFIRMED on the candidate's notes) and use only
C3's characters. `gate.count` at size 40 flipped 27.9 % under the band rule's companion but its band column is "main
gates = N exact" (§13.5), so it carries no marker, as E13 D2 kept it out of the denominator. The parity report prints
the marker beside the verdict as it prints "declared exception" (V12 §3.5.4), so a reader of a near-edge verdict at M1
sees the reference's own uncertainty (DC-39); the verdict itself is unchanged.

*(3) Why this and not the alternatives (each rejected with its reason).* (a) *Widen the bands to the edge's
interval.* M0's parity CLI reads p10 and p90 "from the row as M-1 stored them" and forms the band itself (C-0092 (1)),
and a row carries no band field (N-05, C1); a widened band could only be written by storing values that are not the
sample's estimates under a new estimator name — a V12 §3.5.1 change and a change to M0-k-05 at wave 11 — and it would
move 49 of 72 targets by the very noise the spike exposes (`castle.area` at size 80: lo 1.87 → 0.69 ha), which says
little about MFCG and much about ten seeds. (b) *Restate the threshold* (wider candidates, a higher share). E13 §7's
geometry means no threshold at n = 10 separates a sound sample from a poor one; a threshold chosen so the sample
passes is a test that cannot fail. (c) *Demote the flagged rows to weakness or descriptive.* S-V12-2 found every
derived-graph CV ≤ 0.3 (E14) and the flagged metrics are stable; their band edges are noisy. Demoting 49 of 72 MFCG
targets for an order-statistic artefact would gut §13.5's MFCG rows without a measured reason. (d) *A less noisy
spread estimator at n = 10.* New design (J156); the measurement requires no estimator change, only that the noise be
known where the verdict is read.

*(4) FTG's rows under the same marker (vetoable extension).* V12 §8.3 (1) scopes the spike to MFCG and says FTG's
rows "stay as §13.5 classes them", written when FTG had three captures per size. Roles do stay. But the band-rule FTG
rows at BIG_TOWN and BIG_CITY are now type 7 samples of ten (R-34) with the same edge geometry, so leaving them unmarked
would lose the nuance the marker records (J112). *Ruling:* W-15 runs the same tool at its append on the 13 FTG
band-rule target rows with estimator `type7` — `street.runs` (four fields) at BIG_TOWN and BIG_CITY, `outline.r90cv`,
`outline.roadRatio` and `wall.towerSpacing` at BIG_CITY, and `outline.r90cv` and `outline.roadRatio` at BIG_TOWN —
with the stream `S-V12-1|capture/FTG/<size>`, ten slots drawn with replacement per draw, and marks the rows the rule
flags. Rows with estimator `minmax` (METROPOLIS at n = 4, `wall.towerSpacing` at BIG_TOWN at n = 9, the
`water.channelWidth` rows at n ≤ 6) and `single` rows carry no marker: the test is written for the type 7 sample, and
V12 §3.5.1 already declares what `minmax` covers (0.5 … 0.82 of the population). The outcome share is not recomputed
over FTG (the spike's denominator is MFCG's).

*(5) W-15's append instructions (the research apply lane, after the registry writer's rename).* (i) Read
`E13-spike-bootstrap.json` `rows[]` (`id`, `rowRate`, `loDraws`, `hiDraws`, `band`) and Appendix A; (ii) for every
row in Appendix A, append the marker to the candidate row's `note` (joined by "; "), and write
`bands[id].stability` in `E15-baselines.json`; (iii) run the FTG draws of (4) and mark the rows flagged; (iv) add the
marked rows to E15 §7's shift-record input; (v) restate E15 §6's last sentence and `results/W-15.json`'s owner note
(the remedy is R-50's, the loads withdrawn by J171); (vi) `cross_check.py` C1–C10 on the candidate (C3 on every note)
and `rows.py --check` SAME. No row's values, role, estimator or `sample` change under this ruling.

*Reason:* a spike's remedy must follow from what it measured. The measurement shows noisy edges, not a defective
sample; the honest answer, with the loads withdrawn, is to carry the noise to where the verdict is read, in the one
place every reader of the row has (its note), and to change nothing the measurement does not require (J156).
*Measured by:* E13 §5 (the flip table, the terms that set each edge), §6, §7 (the arithmetic and the model), E15 §6
(the two W-08 rows), E14 (the CVs); this seat's recomputation in section 6. *Vetoable:* yes — a veto of (2) returns
the rows to unmarked notes (the fire then stands answered by J171 alone); a veto of (4) confines the marker to MFCG.

**R-51 — D28: the eight MFCG draw rows take a RECORDED family of the twelve profiler recordings (R-02's precedent)
for four metrics, and the formula route on the size-40 plain family for `draw.widthPx`; the `plan.py` block is in
Appendix B; the design correction is DC-40.**

*(1) The sample question.* E15 §9 held D28's rows because their twelve draw records are profiler recordings, not
plan seeds, and R-03 builds no row from a fixture. A formula sample for these metrics would need the draw records of
the plan's seeds, which the sweep did not record (W-03 took the JSON and SVG exports, E03 §3; a draw record is a
canvas log the profiler writes), so it would cost twelve new MFCG loads — withdrawn by J171. R-02's rule applies
exactly: "a recorded sample is justified only where no formula sample can exist" (R-03), registered "as recorded"
(V12 §3.2.1's Fantasy Manor precedent). The twelve records are all of build 12710731 (CONFIRMED: every folder's
`meta.json` names that build), the build the MFCG pin names.

*(2) The family.* `capture/MFCG/draw/recorded`, members `capture/MFCG/draw/recorded/<i>`, i = 0 … 11 in recording
order (folder stamp, then generation): 0–3 `2026-09-21T05-03-24` gen-0 … gen-3 (sizes 25 / 24 / 31 / 31; water
coast and river, coast and river, river, coast); 4–6 `2026-09-21T05-06-58` gen-0 … gen-2 (size 80, coast and river;
logs truncated at 60 000 entries); 7–8 `2026-09-21T11-25-32` gen-0 and gen-1 (size 40 plain, the four-gate city whose
export set the matched scale; size 71 coast and river, log truncated); 9 `2026-09-25T10-05-23` gen-0 (size 40 plain,
the no-gate city, whose one road is uncased); 10 `2026-09-25T10-05-38` gen-0 (size 40 plain, one gate); 11
`2026-09-25T10-05-44` gen-0 (size 40 plain, nine gates). The block is the top-level `mfcgRecordedDraw` of `plan.json`,
beside `ftg` (whose `recordedCity` is its precedent) and `fm`, written from `MFCG_RECORDED_DRAW` in `plan.py`
(Appendix B); `cross_check.py`'s `load_plan` reads it as a family of kind `recorded` with its twelve labels in order
(two lines; W-15 owns `cross_check.py`, R-47 (a)). The water terms are MFCG's own option vocabulary in `plan.json`
(`plain`, `river+coast`, with `river` and `coast` for the two single-water recordings).
The records' option values stay in `plan.json` as our own terms (size, water) and in the folders' `meta.json`; no
reference key enters a row or this record (R-27).

*(3) The rows on the recorded family* (ids `mfcg/draw/recorded/<metric>/all`; `sample.family`
`capture/MFCG/draw/recorded`, `indices` [0, 12), `captures` the twelve labels; `referenceBuild` `itch:12710731`;
`capture` `research:captures/mfcg` (the six folders; D4's opaque-label form); `script`
`research:baselines/measure_mfcg.py`; no `matched` — the records span sizes 24–80 and the draw style is
size-invariant, E07 §7; `scale` `free`): `draw.casingLaw`, target, §13.5's fixed band ("casing law on 100 % of
ribbons"), per record the share of its cased ribbons whose dark casing lies at core + 2t — 1.0 on the eleven records
with a cased ribbon, index 9 in `failed` with reason `uncased` (its one road is drawn without a casing: no cased
ribbon to measure), n 11, `type7`; `draw.roundJoins`, target, fixed ("round joins ≥ 99.9 %"), per record round joins ÷
joins (one non-round join per record; pooled 0.99998), n 12, `type7`; `draw.roundCaps`, descriptive, per record round
caps ÷ caps (pooled 0.99905), n 12, `type7`; `draw.wallsAfterBuildings`, target, fixed (§13.5's order parity: ours
against our declared slot table, the reference's 1.0 reported), per record 1 where the first wall stroke follows the
last roof fill, on the eight records with a complete log, indices 4, 5, 6 and 8 in `failed` with reason
`truncated-log`, n 8, `minmax`. The values are E07's JSON `draw` block per record (`coresPaired`, `coresTotal`,
`coresUncased`, `roundJoins`, `joins`, `roundCaps`, `caps`, `wallsAfterBuildings`, `logDropped`), so `rows.py` reads
them as it reads every other E07 value, with a receipt per row. These are fixed-band rows: the sample sharpens the
reference value and its spread, and the band column stays (R-34's second bucket, R-48, R-49). The note names the
twelve recordings, the two failure reasons and "draw style is size-invariant (sizes 24–80, water on and off)".

*(4) `draw.widthPx` takes the formula route.* Its §13.5 figures (6.2 / 12.4 / 6.5 px at size 40's scale; E07's
6.20 / 12.40 / 6.53 / 3.92) are model widths × pixels per metre of ONE export — the four-gate fixture's SVG scale
(0.8157 px per m) — and a draw record carries no pixels-per-metre. The model widths (7.6 / 15.2 / 8 / 4.8 m) hold in
all eighteen exported files (E07 §7), the plan's size-40 exports included. *Ruling:* the row is built on
`capture/MFCG/40/plain` (W-03's ten exports, already on disk; no load): per seed, each model width × that export's
pixels per metre by E07's `matchedWidthsPx` rule; ids `mfcg/40/plain/draw.widthPx/all/<field>` for the four fields
`wall`, `tower`, `roadCore`, `pier`; target, §13.5's fixed band "widths ± 15 %"; `type7` at n 10; the note carries the
model widths and the pixels-per-metre spread. The fixture figures become history in §13.5 (DC-40; DC-08's class, R-49's
precedent). The extension to `measure_mfcg.py` (the scale read from each sweep export as it is read from the fixtures)
is W-15's append step, under W-07b's checker (`--check` and `--red`). Sizes 80 and 130 take no row (the cell names
size 40's scale); their values may be tabled in E07 if the tool gives them.

*(5) W-15's append instructions (after the registry writer has installed the `water.channelWidth` rename and
`plan.py --check` reads SAME).* (i) Install Appendix B's block in `plan.py` by an atomic rename of a scratch copy
(R-36's precedent), regenerate, and confirm `--check` SAME for `plan.json` and `metrics.m-1.json` (the block adds
the top-level `mfcgRecordedDraw` and `counts.mfcgRecordedDraw` 12; it changes no family, slot or binding and no
registry entry);
(ii) add `load_plan`'s two lines in `cross_check.py` and a fixture: a row on `capture/MFCG/draw/recorded` with its
twelve captures passes C7, one with a capture out of order is refused; (iii) extend `measure_mfcg.py` for (4) and
re-run its `--check` and `--red`; (iv) form the eight rows (four of (3), four fields of (4)) in `rows.py` with
receipts against E07's JSON, and append them with the five held channel-width rows; (v) `cross_check.py` C1–C10 on the
candidate, `rows.py --check` SAME, `--red`; (vi) E15 §9's held table gains the resolution, and the result file's
"13 rows held" check turns to pass or names what still holds. The tools that read families by name
(`mfcg_j161_m1.mjs`, `rows.py`) are unaffected by a block outside `families[]`; the step confirms it by running
`rows.py --check`.

*Reason:* C7 forbids a row from an unregistered sample, R-03 forbids a fixture row, and J171 forbids the loads a
formula sample would cost; the recorded-family form already exists (R-02) and keeps the ⟨design⟩'s targets measurable
without pretending the recordings were planned. `draw.widthPx` is the one member a formula sample serves today, so
it takes that route. *The alternative, rejected:* the eight rows descriptive or no-rows — the draw-style cell is not an
⟨M-1⟩ cell (C-0116's parity would not fail), but the registry's `m1` entries name targets (DC-18), §13.5 states the
`ink` preset's clauses as targets, and a sample exists; demoting them would withhold a measured reference for no
reason. *Measured by:* E07 §7 and its JSON `draw` and `matchedWidthsPx` blocks; the six folders' `meta.json`; E15 §9.
*Vetoable:* yes — a veto of (1)–(3) makes the four rows descriptive on the same family (the family stays, C7 needs
it); a veto of (4) keeps `draw.widthPx` as a held row until a formula draw record exists.

**R-52 — N-26: M0's scanner reads the crossing files by their string values and keys; the deny-list stays whole;
the row the session carries is N-26 (section 3); the design wording is DC-41 (standing or falling with D13).**

*The question.* Read as whole text, the candidate `baselines.json` holds 70 distinct runs made of number tokens only
(histogram counts and values; the wave-3 verifier's count, each hit once on each list), 0 hits in its string values
and keys (E15 §11, N-26). Either M0's scanner (M0-k-06, wave 13) reads a crossing file by its string values and keys,
or the deny-list drops the 3-grams made only of number tokens.

*Ruling: the first, scoped to the crossing files.* The scanner's scope gains the JSON files under
`plat/packages/testkit/baselines/` (the files T-V12-28 says pass the scanner — `baselines.json`, `ng-faces.json`,
`denylist.json`, `crossings.json` — which §17.1 (5)'s scope sentence does not list today), and reads each of them by
its string values and keys only: every string value and every key is one text, tokenised and 3-grammed on its own, so
no 3-gram spans two strings; a number, boolean or null forms no token. Every other file the scanner reads (sources'
string literals and comments, `@plat/tables`' data files, assets, the digest) keeps the whole-text reading, and the
deny-list is not changed. This is the reading `cross_check.py`'s C10 applies research-side (E15 D13: `text_of_strings`
— one string per line, the keys sorted and unique) and the reading N-22 fixed for colours in `baselines:check`'s C3;
one reading on both sides, as R-38 gave the two checkers one corpus.

*Why not the second.* Dropping number-only 3-grams from the list weakens every scan to fix three files that have their
own check: a numeric content table copied into a `@plat/tables` data file, a source literal or a digest entry would
no longer be caught, and the design-set scan would lose the same protection, while the gain is small — of the 280
reviewed 3-gram allow rows in `design-allow.tsv`, five are digit-only. The clean-room cost of the chosen reading is
confined to the crossing files, which are numbers-only files our own scripts write from our own measurements,
checked C1–C10 and countersigned (§17.1 (4)); their strings — ids, notes, labels, family names — stay scanned, and a
number in them carries no word, name, list, grammar or colour (N-22's reasoning). The false-positive cost of the
chosen reading is nil on strings; of the rejected reading, every numeric table in the corpus becomes a blind spot.

*Coupling.* R-52 mirrors D13 on the build side. If the owner vetoes D13 (R-54), C10 keeps its whole-file reading,
R-52's reading falls with it, and the second route (the list drops number-only 3-grams; W-16b rebuilds the list and
re-runs its self-test) is the one left; the session then carries a replacement N-26 row. Until then the research
twin keeps reporting the whole-text count beside its C10 verdict (E15 D13), so a veto costs no re-measurement.

*Reason:* the list protects words, lists, grammars, names and colours; a numbers-only crossing file holds none in its
numbers, and the one place it could (a string) stays read. *Measured by:* E15 §3, §11 (the counts); the wave-3
verifier's W-15 item (70 runs per list); `make_denylist.py`'s corpus walk (digits dropped in JSON values, kept in
prose); `design-allow.tsv` (280 TRI rows, 5 digit-only; counted by this seat). *Vetoable:* yes (section 4).

**R-53 — F5: the three row conventions M0-k-05 meets in `baselines.json` are carried as row N-31 (section 3).**

E15 §11 F5 names three conventions the parity CLI will meet that §13.5's `Baseline` and N-25 do not state: a pooled
NG row's `sample.family` is the union `capture/NG` with every member label listed in `sample.captures` and no
`indices` (E15 D2); MFCG's stress rows share metric, reference and matched rung with the plain rows and differ by
the options segment of `sample.family` (`capture/MFCG/<size>/river+coast` against `…/plain`) and by the id's setting
segment; a row with `values.n` 0 lists every member in `sample.failed`, and its `values.seeds` is the member count,
not 0 (nineteen such rows: FTG 8, MFCG 7, NG 4). *Ruling:* row N-31 (section 3) states each as a form the loader
accepts and a rule the CLI follows — in particular that when two rows share metric, reference, matched and trailing
segments, the CLI reads the one whose family options segment is `plain` for M0's settings and lists the other as
"other setting", read for no verdict. M0's `baselines:check` runs no sample check (C-0092 (2): V12's C7 is C8–C10's
company, "not run at M0"), so the research twin's C7 stays the sole sample check until M1 (R-45). W-15's append
corrects E15 §2's sentence ("the members outside `failed` equal `values.seeds`") to carry the n-0 exception, as the
wave-3 verifier asked, and W-17's continuation corrects digest entry (9)'s repetition of it. *Reason:* a convention
the file follows and the reader does not know is a silent `missingBaseline` or a double selection at wave 11.
*Measured by:* E15 §2, §11; the candidate's rows (one union row, one stress row and one n-0 row read whole by this
seat); C-0092 (2); N-25. *Vetoable:* yes.

**R-54 — D13 (C10's research twin reads a JSON crossing file's string values and keys, not its numbers) is flagged
for the owner's veto, as R-14 was.** E15 D13 is a reading of a clean-room rule (V12 §3.3's C10 "over the whole
file"), taken under J122 by the W-15 seat; R-52 extends the same reading to M0's scanner and DC-41 writes it into
V12 §3.3 and §17.1 (5). Like R-14 (`ng-faces.json` as a numbers-only crossing) it narrows what the firewall reads, so
it is **flagged prominently** in section 4 and in the result file's `owner_notes`, with the consequence of a veto
stated (R-52's coupling). No seat acts on the veto's absence as approval: the reading stands as a vetoable delegated
call, recorded here and in E15 D13.

## 2 Design corrections (for a design seat; this seat edited no design file)

| id | section | old | new | measured by |
|---|---|---|---|---|
| DC-39 | V12 §8.3 (1), the *Pre-decided* clause; one sentence in V12 §3.5.4 (the report) | "*Pre-decided:* above 10 % of target rows flipping in over 5 % of draws, MFCG goes to 20 seeds per size (minutes of exports); FTG's rows stay as §13.5 classes them" | "*Pre-decided:* above 10 % of target rows flipping in over 5 % of draws, each flagged target row keeps its role, values and band and carries a stability marker in its `note` — the row's flip share and the 2.5–97.5 % bootstrap interval of each edge (M-1, E13: 49 of 72 band-rule rows flagged, 50 of 78 with the figure-ground rows; the fallback of 20 seeds per size was withdrawn by J171 because the edge rests on the two outermost seeds of ten and the model leaves 53 of 72 rows flagged at 20 seeds and 38 at 100); FTG's roles stay as §13.5 classes them, and its type 7 band-rule rows carry the same marker (R-50 (4))". §3.5.4 gains: "the report prints a row's stability marker beside its verdict, as it prints 'declared exception'" | E13 §5–§7; E15 §6; R-50 |
| DC-40 | §13.5 draw style, the MFCG cell; V12 §3.5.5 step 2 (one sentence) | "casing = core + 2h on 7 / 7 maps, round joins 4 062 / 4 063, 17-step order; wall, tower and road-core widths 6.2 / 12.4 / 6.5 px at size 40's scale" | "casing = core + 2h on every cased ribbon of the eleven recordings that draw one (twelve recordings, 2026-09-21 and 2026-09-25, the recorded draw family; 7 / 7 on the 2026-09-21 recordings before), round joins 0.99998 pooled (one non-round join per recording; 4 062 / 4 063 on the first), walls after buildings on 8 / 8 complete logs; wall, tower, road-core and pier widths as M-1's ten-seed rows at size 40 (`draw.widthPx`, M-1 2026-10-04; the model widths 7.6 / 15.2 / 8 / 4.8 m in every export, 6.2 / 12.4 / 6.5 / 3.9 px at the four-gate fixture's scale before)". V12 §3.5.5 step 2 gains: "a row without `matched` (the MFCG draw rows on the recorded family) is read at every setting of its reference" | E07 §7 and its JSON; R-51; W-15's `draw.widthPx` rows (the values the design seat quotes come from W-15's append) |
| DC-41 (stands or falls with D13, R-54) | V12 §3.3 C10; §17.1 (5), the scanner's scope sentence | C10 "the clean-room scanner (§17.1 (5)) over the whole file: 0 hits"; §17.1 (5) "digests the same way every token of `@plat/tables`, assets, source string literals and comments and the digest" | C10 "the clean-room scanner (§17.1 (5)) over the file: 0 hits — a JSON file read by its string values and keys, each a text of its own, never its numbers"; §17.1 (5) "… and the digest, and the crossing files under `plat/packages/testkit/baselines/` by their string values and keys (a numbers-only file carries no word in its numbers)" | E15 §11; R-52 |

## 3 The rows the session carries to M0 (`plat/docs/build/checks/M0-spec-notes.md`; our words, field names and design sections only)

| id | item | observation | suggested handling |
|---|---|---|---|
| N-26 | M0-k-06 (the scanner); M0-k-05 (`baselines:check`, the crossing files' folder) | *(session hand-off from M-1, 2026-10-04; before waves 11 and 13)* The files M-1 commits into `plat/packages/testkit/baselines/` (`baselines.json`, `ng-faces.json`, `denylist.json`; `crossings.json` beside them) are numbers-only JSON, and T-V12-28 (§17.1 (4)'s crossing rule) expects them to pass the scanner with 0 hits. §17.1 (5)'s 3-gram class lists 3-grams of number tokens as well as words, and the item's scope sentence names `@plat/tables`, sources, assets and the digest but not this folder. Read as whole text, `baselines.json` holds runs of histogram counts and values that match number-only 3-grams of the list (0 hits in its string values and keys), so a whole-text reading would refuse M-1's crossing on numbers that carry no word, name, list, grammar or colour, while skipping the folder would leave T-V12-28 unmet. | The scanner's scope includes the JSON files under `plat/packages/testkit/baselines/`, and it reads each of them by its string values and keys only: every string value and every key is one text, tokenised and 3-grammed on its own (no 3-gram spans two strings); a number, boolean or null forms no token. Every other file it scans keeps the whole-text reading; the deny-list is unchanged. (`baselines:check`'s C3 already reads colours this way, N-22.) Tests: a file in that folder whose numbers alone would form a listed 3-gram → 0 hits; the same three tokens inside one string value → one hit at that line; the same file placed outside the folder → the hit; a listed token in a key → a hit; the report names the file and line, never the token. |
| N-31 | M0-k-05 (the parity CLI; the `baselines.json` loader) | *(session hand-off from M-1, 2026-10-04; before wave 11)* Three forms of M-1's `baselines.json` that §13.5's `Baseline` and N-25 do not state. (1) A row pooled over several NG seed families names the union `capture/NG` in `sample.family` and lists every member label in `sample.captures`, with no `indices`. (2) MFCG rows of one metric, reference and matched rung exist for two settings — the plain family `capture/MFCG/<size>/plain` and the stress family `capture/MFCG/<size>/river+coast` — told apart by the options segment of `sample.family` (and by the id's setting segment); M0's parity settings are plain only. (3) A row with `values.n` 0 lists every member in `sample.failed`, and its `values.seeds` is the member count, not 0; so "the members outside `failed` equal `values.seeds`" holds only when `n` > 0. | (1) The loader accepts a `sample` with `captures` and no `indices`; the CLI selects by `metric`, `reference`, `matched` and the trailing segments (N-25) and never parses `sample.family`. (2) When two rows share metric, reference, matched and trailing segments, the CLI reads the one whose `sample.family` options segment is `plain` for M0's settings and lists the other in the report as `other setting: <options>`, read for no verdict; a third such row is reported as a duplicate naming all three. (3) A row with `values.n` 0 is accepted when every member is in `failed` (C-0116's descriptive form, `reported`); a row with `n` > 0 whose `values.seeds` differs from its members outside `failed` is reported naming the row (M0 runs no sample check of its own, C-0092 (2); the report line is information). Tests: a union-family row pairs with its metric; a plain and a stress row for one metric select the plain row and list the other; an n-0 row with every member failed reads `reported`; an n-0 row with `values.seeds` equal to its member count passes the loader. |

## 4 Owner-gated and flagged, named plainly

1. **J171 is the owner's own decision:** no extra MFCG loads; S-V12-1's pre-decided step is withdrawn for M-1. This
   round restates the remedy (R-50) and does not re-open the loads.
2. **R-54 — E15 D13's firewall reading** (C10's research twin reads a crossing file's string values and keys, not
   its numbers) — **flagged for veto, prominently**, as R-14 was; R-52 and DC-41 stand or fall with it (section 1,
   R-52's coupling).
3. **R-50 (2)** — the stability marker in 50 MFCG rows' notes, and **R-50 (4)** — the same marker on FTG's 13 type 7
   band-rule rows: vetoable; a veto leaves the rows' notes as W-15 wrote them.
4. **R-51** — the recorded draw family and `draw.widthPx` on the size-40 plain family: vetoable (the alternatives are
   named in R-51).
5. **R-52** — the crossing files read by strings and keys rather than the list dropping number-only 3-grams: vetoable;
   the other route is stated and costs W-16b one rebuild.
6. **The design corrections DC-39 … DC-41** — reported, not asked (plan §5 item 8; J-A34.01); none moves a signed
   golden; DC-41 waits for item 2.
7. **Not approved, unchanged:** W-21's timing loads; any further NG load; the crossing's commit (the session, on the
   owner's word, re-confirmed in the chat of the day); R-14 and R-17's flags (standing).

## 5 Routed, not done here (so nobody re-finds them)

* **F2 and the registry** (`water.riverWidth` → `water.channelWidth`): applied in the design by `design/m1-corrections-2`
  (J-5); the registry writer (the session's research apply lane, J171) installs the catalogue twin and regenerates
  `metrics.m-1.json`, after which W-15 appends its five held rows — before R-51's block, since `plan.py` refuses every
  write until then (CONFIRMED: `--check` exits 2 on the catalogue mismatch; the wave-3 verifier reproduced it).
* **The stale 39 m tower-spacing quotes** (base §4.8 S7, §15.2 O8 (c), V11 near l. 3485) and **W-17's entries (2), (4),
  (6)** on the applied D-1 and σ: the design apply lane and W-17's continuation (J171).
* **The wave-3 verifier's W-15 points:** T-V12-28's receipt reads "passes under D13 (vetoable; R-54); the whole-text
  count 70 runs per list is reported beside" — W-15's append restates it; "140 runs" → "70 distinct runs, each on
  both lists" in E15 and `W-15.json`; E15 §2's n-0 sentence (R-53).
* **E13 F3** (band-rule share bands above 1): information; no ruling — ours never exceeds 1, no verdict moves.
* **S-V12-2** (E14): nothing owed; every CV ≤ 0.3 and the rows stand as targets (used by R-50 (3) (c)).
* **`gate.count` at size 40**: no marker (fixed band); recorded in R-50 (2) so the 27.9 % companion flip is not
  re-found.

## 6 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read or executed).** Every number quoted from E13 (§5's flip table, §6's outcome, §7's pattern), E15
(§2, §6, §9, §11, D1–D15), E14, E07 §7, the wave-3 verifier and `W-15.json`; the design texts each ruling cites (V12
§8.3 (1), §3.5.1–§3.5.4, §3.3's C7 and C10, §2.3–§2.4; §13.5's `Baseline`, band-rule paragraph and draw-style row;
§17.1 (4)–(5); C-0092 (1)–(2), C-0116, C-0120); M0-k-05's and M0-k-06's item text and `afterM1Needs`. **Executed by
this seat (nice 10, standard library and the research scripts imported read-only; nothing written outside the
scratchpad `m1r3/` and this record):** (1) the 50-row marker table from E13's JSON — 49 rows with `unstable` and
`inDenominator` true, 18 / 16 / 16 by size, the `loDraws` / `hiDraws` 2.5 / 97.5 percentiles, the eight M0-c-07a rows
among them; (2) the one-sided row: the addendum's draws regenerated with `spike_bootstrap.stream('capture/MFCG/130/plain')`
give the digest `8541437c…` equal to E15's and E13's, 108 row flips reproduced, the recomputed edge (the draw's
median − 0.03) 0.4751–0.5302 at 2.5–97.5 % around 0.4936; (3) every combined note ≤ 200 characters (longest 198)
and inside C3's character set, against the candidate's notes; (4) the six draw-record folders' `meta.json` name build
12710731 (flags and labels read, no content); the per-record casing, joins, caps and log facts from E07's JSON;
(5) `design-allow.tsv`: 280 TRI rows, 5 digit-only; (6) `plan.py --check` exits 2 today (the catalogue mismatch; not
re-run by this seat — the verifier's receipt stands and nothing of this seat's writes `plan.py`). The content checks
on this record are in `results/rulings-3.json` (`checks`). **PLAUSIBLE (reasoning or model).** E13's projection (the
fallback cannot meet the test) — the owner acted on it (J171), and R-50 rests on the CONFIRMED geometry, not on the
model; that no §13.5 reader needs the marker before M1's parity report (M0's AFTER-M-1 items read verdicts, and the
note crosses with the row either way); that `load_plan`'s two lines are the only `cross_check.py` change R-51 needs
(C7's non-FTG branch compares `captures` to the registered labels when both exist, read by this seat; the fixture of
R-51 (5) (ii) proves it); that `measure_mfcg.py`'s scale rule reads the sweep exports as it reads the fixtures
(`matchedWidthsPx` is keyed per export; W-15's `--check` proves it).

`df -h /`: 11 GiB free at the start; `memory_pressure` 73 % free. Outputs: this record; `results/rulings-3.json`;
the scratch table `m1r3/r50-markers.json` (sha256 `c70c8840…`) and `.md`; CHECKPOINT and LANDED lines in
`docs/lane-events.log`. Not touched: `plat/`, the design, every E record and its JSON, `plan.py`, `plan.json`,
`metrics.m-1.json`, the candidate, `cross_check.py`, `rows.py`, `M-1-plan.md`, `M-1-work.json`, the earlier rulings
records (history; corrections route here), `docs/PROGRESS.md` (the session's ledger); no git command changed state;
no website; no benchmark.

## Appendix A — the 50 rows R-50 marks (role and band unchanged; the marker joins the row's note)

Flips: the share of the 1 000 draws in which any candidate's verdict flipped. Band and terms: V12 §3.5.2 on the ten
seeds (E13 §5). The intervals: the 2.5th and 97.5th percentiles of the recomputed edge over the draws. Source:
E13's JSON `rows[]`; the last row from the addendum's draws (section 6 (2)).

| row id | flips | band [lo, hi] | edge terms | lo 95 % | hi 95 % | marker |
|---|---|---|---|---|---|---|
| `mfcg/40/plain/bldg.r4.120/all` | 0.323 | [0.5203, 0.7411] | p10 x 0.9; p90 x 1.1 | 0.4812–0.5608 | 0.7124–0.7691 | `S-V12-1 edge noise 0.32: lo 0.481-0.561, hi 0.712-0.769` |
| `mfcg/40/plain/bldg.r4.250/all` | 0.620 | [0.3012, 0.5534] | p10 x 0.9; p90 x 1.1 | 0.2858–0.3548 | 0.476–0.568 | `S-V12-1 edge noise 0.62: lo 0.286-0.355, hi 0.476-0.568` |
| `mfcg/40/plain/bldg.wallAlign.median/all/b0_40` | 0.168 | [3.3686, 5.3686] | c - floor; c + floor | 3.0547–3.6574 | 5.2949–5.7265 | `S-V12-1 edge noise 0.17: lo 3.05-3.66, hi 5.29-5.73` |
| `mfcg/40/plain/bldg.wallAlign.median/all/b40_100` | 0.717 | [8.0428, 14.2098] | p10 x 0.9; p90 x 1.1 | 6.6261–8.7887 | 12.036–14.5944 | `S-V12-1 edge noise 0.72: lo 6.63-8.79, hi 12-14.6` |
| `mfcg/40/plain/bldg.wallAlign.median/all/b100_200` | 0.479 | [11.3308, 23.1847] | p10 x 0.9; p90 x 1.1 | 11.0222–14.0638 | 20.8828–24.953 | `S-V12-1 edge noise 0.48: lo 11-14.1, hi 20.9-25` |
| `mfcg/40/plain/bldg.wallAlign.share15/all/b40_100` | 0.633 | [0.4893, 0.7884] | p10 x 0.9; p90 x 1.1 | 0.4728–0.5421 | 0.712–0.8733 | `S-V12-1 edge noise 0.63: lo 0.473-0.542, hi 0.712-0.873` |
| `mfcg/40/plain/bldg.wallAlign.share15/all/b100_200` | 0.780 | [0.3334, 0.62] | p10 x 0.9; p90 x 1.1 | 0.3093–0.3847 | 0.5134–0.7102 | `S-V12-1 edge noise 0.78: lo 0.309-0.385, hi 0.513-0.71` |
| `mfcg/40/plain/sgd.tShare/all` | 0.264 | [0.3642, 0.5429] | p10 x 0.9; p90 x 1.1 | 0.3496–0.3926 | 0.5002–0.5521 | `S-V12-1 edge noise 0.26: lo 0.35-0.393, hi 0.5-0.552` |
| `mfcg/40/plain/sgd.deadEnds/all` | 0.798 | [1.4923, 3.0056] | p10 x 0.9; p90 x 1.1 | 1.3958–1.9927 | 2.6531–4.0036 | `S-V12-1 edge noise 0.80: lo 1.4-1.99, hi 2.65-4` |
| `mfcg/40/plain/blockc.perHa/all` | 0.375 | [1.9789, 3.0199] | p10 x 0.9; p90 x 1.1 | 1.8794–2.2074 | 2.907–3.1988 | `S-V12-1 edge noise 0.38: lo 1.88-2.21, hi 2.91-3.2` |
| `mfcg/40/plain/blockc.lotsPer/all` | 0.458 | [7.2, 10.35] | p10 x 0.9; c x 1.15 | 6.8–7.65 | 9.9–11.0 | `S-V12-1 edge noise 0.46: lo 6.8-7.65, hi 9.9-11` |
| `mfcg/40/plain/ribbon.share/all` | 0.202 | [0.5021, 0.9098] | p10 x 0.9; p90 x 1.1 | 0.4773–0.6673 | 0.8586–0.9375 | `S-V12-1 edge noise 0.20: lo 0.477-0.667, hi 0.859-0.937` |
| `mfcg/40/plain/district.area/all` | 0.495 | [5.6891, 12.5393] | p10 x 0.9; p90 x 1.1 | 5.4937–7.6141 | 10.2352–13.8634 | `S-V12-1 edge noise 0.49: lo 5.49-7.61, hi 10.2-13.9` |
| `mfcg/40/plain/plaza.area/all` | 0.881 | [0.1529, 0.6291] | p10 x 0.9; p90 x 1.1 | 0.1303–0.2771 | 0.4856–0.7504 | `S-V12-1 edge noise 0.88: lo 0.13-0.277, hi 0.486-0.75` |
| `mfcg/40/plain/castle.area/all` | 0.879 | [0.8534, 3.1412] | p10 x 0.9; p90 x 1.1 | 0.7147–1.9709 | 2.7253–4.1042 | `S-V12-1 edge noise 0.88: lo 0.715-1.97, hi 2.73-4.1` |
| `mfcg/40/plain/wall.nodeSpacing/all` | 0.230 | [74.6134, 111.5506] | p10 x 0.9; p90 x 1.1 | 71.8791–80.1727 | 101.3275–114.1465 | `S-V12-1 edge noise 0.23: lo 71.9-80.2, hi 101-114` |
| `mfcg/40/plain/quarter.count/all` | 0.778 | [6.3, 11.11] | p10 x 0.9; p90 x 1.1 | 6.3–7.2 | 9.9–12.1 | `S-V12-1 edge noise 0.78: lo 6.3-7.2, hi 9.9-12.1` |
| `mfcg/40/plain/wall.towerSpacing/all` | 0.363 | [79.172, 116.2199] | p10 x 0.9; p90 x 1.1 | 75.5759–85.2966 | 108.5844–122.1465 | `S-V12-1 edge noise 0.36: lo 75.6-85.3, hi 109-122` |
| `mfcg/80/plain/bldg.r4.250/all` | 0.421 | [0.3868, 0.6055] | p10 x 0.9; p90 x 1.1 | 0.3781–0.4448 | 0.5716–0.6292 | `S-V12-1 edge noise 0.42: lo 0.378-0.445, hi 0.572-0.629` |
| `mfcg/80/plain/bldg.wallAlign.median/all/b0_40` | 0.649 | [2.4758, 4.4758] | c - floor; c + floor | 2.1264–2.8178 | 4.1508–4.8315 | `S-V12-1 edge noise 0.65: lo 2.13-2.82, hi 4.15-4.83` |
| `mfcg/80/plain/bldg.wallAlign.median/all/b40_100` | 0.716 | [5.4041, 12.1625] | p10 x 0.9; p90 x 1.1 | 5.2159–6.1054 | 8.9079–13.6576 | `S-V12-1 edge noise 0.72: lo 5.22-6.11, hi 8.91-13.7` |
| `mfcg/80/plain/bldg.wallAlign.median/all/b100_200` | 0.759 | [10.1883, 19.9018] | p10 x 0.9; p90 x 1.1 | 9.0825–11.3647 | 14.7094–20.3787 | `S-V12-1 edge noise 0.76: lo 9.08-11.4, hi 14.7-20.4` |
| `mfcg/80/plain/bldg.wallAlign.share15/all/b40_100` | 0.417 | [0.5281, 0.8485] | p10 x 0.9; p90 x 1.1 | 0.5197–0.5886 | 0.779–0.8687 | `S-V12-1 edge noise 0.42: lo 0.52-0.589, hi 0.779-0.869` |
| `mfcg/80/plain/bldg.wallAlign.share15/all/b100_200` | 0.690 | [0.406, 0.6666] | p10 x 0.9; p90 x 1.1 | 0.3799–0.4704 | 0.5992–0.7418 | `S-V12-1 edge noise 0.69: lo 0.38-0.47, hi 0.599-0.742` |
| `mfcg/80/plain/sgd.deadEnds/all` | 0.800 | [1.0001, 1.9544] | p10 x 0.9; p90 x 1.1 | 0.9712–1.2431 | 1.5999–2.1057 | `S-V12-1 edge noise 0.80: lo 0.971-1.24, hi 1.6-2.11` |
| `mfcg/80/plain/blockc.perHa/all` | 0.418 | [1.8255, 3.4803] | p10 x 0.9; p90 x 1.1 | 1.7631–2.0479 | 2.588–3.5087 | `S-V12-1 edge noise 0.42: lo 1.76-2.05, hi 2.59-3.51` |
| `mfcg/80/plain/blockc.lotsPer/all` | 0.629 | [6.3, 11.0] | p10 x 0.9; p90 x 1.1 | 6.3–7.65 | 9.9–11.0 | `S-V12-1 edge noise 0.63: lo 6.3-7.65, hi 9.9-11` |
| `mfcg/80/plain/block.courtShare/all` | 0.191 | [0.6443, 0.9313] | p10 x 0.9; c x 1.15 | 0.6344–0.7099 | 0.9014–0.961 | `S-V12-1 edge noise 0.19: lo 0.634-0.71, hi 0.901-0.961` |
| `mfcg/80/plain/ribbon.share/all` | 0.484 | [0.4959, 0.7768] | p10 x 0.9; p90 x 1.1 | 0.4738–0.546 | 0.6971–0.8076 | `S-V12-1 edge noise 0.48: lo 0.474-0.546, hi 0.697-0.808` |
| `mfcg/80/plain/district.area/all` | 0.878 | [9.2758, 27.8389] | p10 x 0.9; p90 x 1.1 | 7.6295–12.5691 | 22.8767–36.1027 | `S-V12-1 edge noise 0.88: lo 7.63-12.6, hi 22.9-36.1` |
| `mfcg/80/plain/plaza.area/all` | 0.806 | [0.1979, 0.4992] | p10 x 0.9; p90 x 1.1 | 0.14–0.2851 | 0.3761–0.5659 | `S-V12-1 edge noise 0.81: lo 0.14-0.285, hi 0.376-0.566` |
| `mfcg/80/plain/castle.area/all` | 0.913 | [1.8689, 6.6661] | p10 x 0.9; p90 x 1.1 | 0.6933–2.9375 | 4.2365–7.0469 | `S-V12-1 edge noise 0.91: lo 0.693-2.94, hi 4.24-7.05` |
| `mfcg/80/plain/quarter.count/all` | 0.761 | [9.81, 16.5] | p10 x 0.9; p90 x 1.1 | 9.0–10.8 | 14.3–16.5 | `S-V12-1 edge noise 0.76: lo 9-10.8, hi 14.3-16.5` |
| `mfcg/80/plain/wall.towerSpacing/all` | 0.388 | [115.2486, 167.8373] | p10 x 0.9; c x 1.15 | 110.6991–125.393 | 162.1893–170.4134 | `S-V12-1 edge noise 0.39: lo 111-125, hi 162-170` |
| `mfcg/130/plain/bldg.wallAlign.median/all/b0_40` | 0.495 | [1.975, 3.9996] | p10 x 0.9; c + floor | 1.5951–2.1155 | 3.6456–4.4867 | `S-V12-1 edge noise 0.49: lo 1.6-2.12, hi 3.65-4.49` |
| `mfcg/130/plain/bldg.wallAlign.median/all/b40_100` | 0.673 | [4.8529, 7.8685] | p10 x 0.9; p90 x 1.1 | 4.1321–5.2028 | 6.8302–9.2986 | `S-V12-1 edge noise 0.67: lo 4.13-5.2, hi 6.83-9.3` |
| `mfcg/130/plain/bldg.wallAlign.median/all/b100_200` | 0.747 | [7.1051, 14.6606] | p10 x 0.9; p90 x 1.1 | 5.8483–10.6408 | 13.6536–17.3191 | `S-V12-1 edge noise 0.75: lo 5.85-10.6, hi 13.7-17.3` |
| `mfcg/130/plain/bldg.wallAlign.share15/all/b40_100` | 0.487 | [0.6121, 0.8768] | p10 x 0.9; c x 1.15 | 0.6086–0.6542 | 0.847–0.944 | `S-V12-1 edge noise 0.49: lo 0.609-0.654, hi 0.847-0.944` |
| `mfcg/130/plain/bldg.wallAlign.share15/all/b100_200` | 0.769 | [0.4648, 0.7567] | p10 x 0.9; p90 x 1.1 | 0.4174–0.495 | 0.6403–0.8542 | `S-V12-1 edge noise 0.77: lo 0.417-0.495, hi 0.64-0.854` |
| `mfcg/130/plain/sgd.deadEnds/all` | 0.466 | [0.7167, 1.2175] | p10 x 0.9; p90 x 1.1 | 0.6973–0.8378 | 1.0876–1.3348 | `S-V12-1 edge noise 0.47: lo 0.697-0.838, hi 1.09-1.33` |
| `mfcg/130/plain/blockc.perHa/all` | 0.138 | [2.1516, 3.0925] | c x 0.85; p90 x 1.1 | 2.0607–2.2294 | 2.8565–3.1422 | `S-V12-1 edge noise 0.14: lo 2.06-2.23, hi 2.86-3.14` |
| `mfcg/130/plain/blockc.lotsPer/all` | 0.560 | [7.65, 11.0] | c x 0.85; p90 x 1.1 | 7.2–8.01 | 10.35–11.0 | `S-V12-1 edge noise 0.56: lo 7.2-8.01, hi 10.3-11` |
| `mfcg/130/plain/ribbon.share/all` | 0.536 | [0.3953, 0.6155] | p10 x 0.9; p90 x 1.1 | 0.387–0.4644 | 0.6022–0.6892 | `S-V12-1 edge noise 0.54: lo 0.387-0.464, hi 0.602-0.689` |
| `mfcg/130/plain/district.area/all` | 0.860 | [19.3951, 39.8398] | p10 x 0.9; p90 x 1.1 | 16.4889–26.0704 | 33.9863–46.934 | `S-V12-1 edge noise 0.86: lo 16.5-26.1, hi 34-46.9` |
| `mfcg/130/plain/plaza.area/all` | 0.893 | [0.1652, 0.6935] | p10 x 0.9; p90 x 1.1 | 0.1368–0.2563 | 0.4862–0.7821 | `S-V12-1 edge noise 0.89: lo 0.137-0.256, hi 0.486-0.782` |
| `mfcg/130/plain/castle.area/all` | 0.890 | [0.643, 7.1435] | p10 x 0.9; p90 x 1.1 | 0.556–2.0325 | 5.8001–9.7724 | `S-V12-1 edge noise 0.89: lo 0.556-2.03, hi 5.8-9.77` |
| `mfcg/130/plain/wall.nodeSpacing/all` | 0.431 | [128.8108, 189.2884] | p10 x 0.9; p90 x 1.1 | 124.9724–139.1454 | 177.1936–203.8256 | `S-V12-1 edge noise 0.43: lo 125-139, hi 177-204` |
| `mfcg/130/plain/quarter.count/all` | 0.738 | [11.52, 21.01] | p10 x 0.9; p90 x 1.1 | 9.9–14.13 | 17.93–22.0 | `S-V12-1 edge noise 0.74: lo 9.9-14.1, hi 17.9-22` |
| `mfcg/130/plain/wall.towerSpacing/all` | 0.547 | [145.3492, 238.0915] | p10 x 0.9; p90 x 1.1 | 130.5206–155.4083 | 196.6317–247.1354 | `S-V12-1 edge noise 0.55: lo 131-155, hi 197-247` |
| `mfcg/130/plain/fg.recoverability/all` | 0.108 | [0.4936, open] | section 13.5 one-sided (MFCG - 0.03) | 0.4751–0.5302 | — | `S-V12-1 edge noise 0.11: lo 0.475-0.53 (one-sided)` |

## Appendix B — the `plan.py` block R-51 rules (installed by W-15's append; our labels only)

```
# The recorded MFCG draw family (R-51, M-1-rulings-3.md; R-02's precedent): the twelve profiler draw recordings of
# build 12710731 that E07 section 7 measured, in recording order (folder stamp, then generation). Each row: (folder,
# generation, size, water in our terms, log complete, draws a cased ribbon). A formula sample would need twelve
# new loads (J171: none), so the family is registered as recorded (V12 section 3.2.1's "as recorded").
MFCG_RECORDED_DRAW = [
    ('2026-09-21T05-03-24', 'gen-0', 25, 'river+coast', True, True),
    ('2026-09-21T05-03-24', 'gen-1', 24, 'river+coast', True, True),
    ('2026-09-21T05-03-24', 'gen-2', 31, 'river', True, True),
    ('2026-09-21T05-03-24', 'gen-3', 31, 'coast', True, True),
    ('2026-09-21T05-06-58', 'gen-0', 80, 'river+coast', False, True),
    ('2026-09-21T05-06-58', 'gen-1', 80, 'river+coast', False, True),
    ('2026-09-21T05-06-58', 'gen-2', 80, 'river+coast', False, True),
    ('2026-09-21T11-25-32', 'gen-0', 40, 'plain', True, True),
    ('2026-09-21T11-25-32', 'gen-1', 71, 'river+coast', False, True),
    ('2026-09-25T10-05-23', 'gen-0', 40, 'plain', True, False),
    ('2026-09-25T10-05-38', 'gen-0', 40, 'plain', True, True),
    ('2026-09-25T10-05-44', 'gen-0', 40, 'plain', True, True),
]
MFCG_RECORDED_DRAW_RULE = ('as recorded (R-51; R-02 and the Fantasy Manor sample are the precedents, V12 section 3.2.1): '
                           'the twelve draw recordings made before the plan hold the family capture/MFCG/draw/recorded '
                           'in recording order; a row lists in sample.failed the members its metric cannot read '
                           '(truncated-log for the four logs cut at 60 000 entries; uncased for the one recording '
                           'that draws its road without a casing) and pools nothing else; the family extends only by '
                           'a new recording appended in order, under an approval (J171: none now)')
```

In `compute()`'s `plan.json` output, a top-level block beside `ftg` and `fm` (the `ftg.recordedCity` form):

```
'mfcgRecordedDraw': {
    'family': 'capture/MFCG/draw/recorded', 'reference': 'MFCG', 'build': MFCG_BUILD, 'priority': 3,
    'rule': MFCG_RECORDED_DRAW_RULE, 'workItem': 'W-07 (E07 section 7); rows at W-15 (R-51)',
    'records': [{'family': 'capture/MFCG/draw/recorded', 'order': i,
                 'label': 'capture/MFCG/draw/recorded/%d' % i,
                 'record': '%s/%s' % (folder, gen), 'capture': folder, 'generation': gen,
                 'size': size, 'water': water, 'logComplete': complete, 'casedRibbon': cased}
                for i, (folder, gen, size, water, complete, cased) in enumerate(MFCG_RECORDED_DRAW)]},
'counts': {..., 'mfcgRecordedDraw': len(MFCG_RECORDED_DRAW)}
```

`cross_check.py`'s `load_plan` adds, after the FTG slots: for each record `r` of
`plan['mfcgRecordedDraw']['records']`, collect `(r['order'], r['label'])` under `r['family']`, sort, and register
`fams[family] = {'n': len, 'labels': [...], 'kind': 'recorded'}`. C7 then checks a row on this family as it checks any registered family whose `captures` are
listed: indices [0, 12), captures equal to the labels in order, `failed` indices inside [0, 12) and `values.seeds`
equal to the members outside `failed`.

## Session close of round 3 (2026-10-04 ~12:30)

The round's independent check (`results/round3-check.json`, partial) re-executed every claim and found three problems; the
session closed them:

1. **Appendix A, `mfcg/40/plain/ribbon.share/all`:** the marker's hi edge is 0.9374999… (E13 `hiDraws`), so three
   significant figures give 0.937 as the data, E15 and the candidate carry; the appendix had rounded 0.9375 a second time
   (0.938). Corrected above. The apply lane's three "character for character" receipts were wrong on this one row only.
2. **DC-41's timing:** section 4 item 6 said DC-41 waits for the D13 veto window; design/m1-corrections-3 applied it (V12
   §3.3 C10, base §17.1 (5)), disclosing the revert path (`m1r3/backup`). The session keeps it applied, as R-14's firewall
   DC-20 was applied while flagged (m1-corrections-1): the owner delegated these calls ("I leave everything to your
   judgment", 2026-10-04) and keeps the veto; a veto of D13 reverts DC-41 from the backup. Recorded as J172.
3. **M0-k-05's note check:** read literally ("numbers, units, our ids and the provenance forms only"), it would refuse the
   candidate's short prose notes, R-50's stability markers among them. The checker's proposed row was accepted and carried as
   **N-32** with **N-26** (R-52) and **N-31** (R-53) to `plat/docs/build/checks/M0-spec-notes.md` (record session-handoff-3,
   wave 4).
