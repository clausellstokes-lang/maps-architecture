# M-1 rulings, round 2 — the round-1 blockers, the premium FTG programme (J164) and the corpus rule

Lane `m1/rulings-2`, 2026-10-03 (18:42 → 19:16 EDT, then a continuation from 19:32 EDT after the owner's account switch —
section 7; the LANDED line in `docs/lane-events.log` carries its end), the Fable ruling seat J164 names, on the owner's Mac. A
research-side record (`plat/CLEAN-ROOM.md` rule 2: implementer seats do not read it). It holds numbers, metric ids, file
paths and our own words: no reference word list, grammar, palette value or identifier beyond FTG's five size names (the
`FtgSize` values of §13.5 plus the size ladder's TOWN, which the design already uses) and the four NG template names.
Nothing here was written into `plat/` or the design, no third-party site was touched, no benchmark was run and no git
command changed state. The build seats of M0 and the FTG recording seats (`m1/W-02-slot3b`, `-slot4b`, `-slot5b`) ran on
the same machine at the same time; this record names where that mattered.

**What this record is.** Every ruling below was decided under the owner's delegation (J122: all product decisions but the
Fable review) and is **vetoable**: an id (R-nn, continuing round 1's R-01 … R-32), the question, the ruling, its reason and
the record that measured the fact it rests on. Section 1 fixes the two blockers of the round-1 closing check
(`results/plan-check-close-1.json`: B-1, B-2) and answers or routes each of its notes (N-01 … N-06 and the item notes of
`M-1-plan-notes.md`); section 2 plans the premium FTG programme the owner bought (J164); section 3 settles the clean-room
verifier's P1 and records the receipts; section 4 lists the design corrections for a design seat (DC-31 … DC-35,
continuing round 1's DC-01 … DC-30); section 5 names what is owner-gated, plainly; section 6 separates CONFIRMED from
PLAUSIBLE. The plan revision that applies these rulings is `M-1-plan.md` revision 3 (its section 12b is the changelog) and
`M-1-work.json` revision 3; the slots are in `research/baselines/plan.py` and `plan.json`.

**Inputs read whole (CONFIRMED):** `M-1-plan.md` (revision 2), `M-1-work.json`, `M-1-rulings-1.md`,
`results/plan-check-close-1.json`, `M-1-plan-notes.md`, `results/rulings-1.json`, E02 §1–§12 (the signed-in captures and
the stopped slot-3 attempt), `results/W-02-slot1.json` … `-slot3.json`, `results/W-03-complete.json`, `plan.py`,
`plan.json`, `ftg_capture_checklist.md` (A–H12), `ftg_capture_post.py`, `docs/validation/clean-room-fix-2026-10-03.md`
and its verifier's `.verify.json` (P1–P6), `doc_checks.py`; the design: §13.5 whole (the FTG rows, the band rule, the
⟨M-1⟩ rule, `FtgSize`), §13.6 (1)–(3), §16's M-1 row, §1.1's rung table, §12.9's FTG paragraph, D-31, J-S11; V12 §2.4,
§3.2.1–§3.2.4, §3.3, §3.4.4's FTG row, §3.5, §3.9.1's panel table, §6's B-REF line, Q-V12-1; the J122, J163 and J164 rows
of `docs/PROGRESS.md`; FTG's size ladder (`research/ftg-capture/presets.json`: the five sizes' nominal populations and
widths); the lane-events log for the slot lanes (slot 3b landed 18:51, slot 4b 19:09; slot 5b landed 19:20 — read in the continuation
of section 7 together with E02 §13–§15, after the owner's account switch).

## 1 The round-1 closing check: both blockers fixed, every note answered or routed

**R-39 — B-1: W-03b is the extension only.** Lane `m1/W-03-complete` LANDED at 16:49 (E03 §9, `results/W-03-complete.json`)
with 2 of J161's 3 loads: seed 0's cold re-export is byte-identical (JSON sha1 `eaa7701b…`, SVG `f41234c3…`) and the retry
of `capture/MFCG/130/plain/8` froze again (`sample.failed` `no-export`, loads 2). Revision 2 still scheduled both, so
W-03b could have spent five loads against J161's three. *Ruling:* W-03b is **R-13's extension only** — one load, index 10 =
seedOf(`capture/MFCG/130/plain`, [10]), through the J161 tool (`mfcg_j161_m1.mjs`, its ledger `j161/loads.jsonl`, cap
raised 2 → 3 for this load, downloads denied, files from the in-page Blob); it **depends on W-01b** (`plan.py --extend`,
which does not exist today — CONFIRMED by reading `plan.py`'s options); its checker counts **both ledgers** (`loads.jsonl`
35 for J159; `j161/loads.jsonl` ≤ 3 for J161) and logs the build-id fetch as the same contact class; the re-export and the
retry are **never run again**. Applied in plan §1 D6, §2 W-03b, §4, §5 (2) and `M-1-work.json` W-03b. *Measured by:*
E03 §9; `W-03-complete.json` (`loads_used` 2).

**R-40 — B-2: both variety dispersions are formed at W-15.** R-10 standardises both references' `variety.dispersion` by
deviations pooled over MFCG's usable seeds and FTG's slots at the rung, so neither reference's value exists before both
samples do; revision 2 had W-09 (MFCG) depend on W-03 and W-07b only and W-05b (FTG) on W-02 only. *Ruling:* W-09 and W-05b
write **vectors only** (one per usable seed or slot); **W-15 forms both dispersions** at TOWN, CITY and METROPOLIS, after
W-02, W-02b, W-09 and W-05b are complete, with the pooled deviations over MFCG 10 ∪ FTG 10 at TOWN and CITY and MFCG 10 ∪
FTG 4 at METROPOLIS (the premium programme gives METROPOLIS an FTG sample, R-33, so R-10's "MFCG alone at METROPOLIS" is
withdrawn); FTG's per-water-setting values are reported beside as a note, because §13.5 measures ours per rung and water
setting while the reference pool mixes both (the mixed pool is the conservative floor; kept as the design states it).
Applied in plan §1 D16, §2 W-05b, W-09, W-15 and the work file. *Reason:* one statistic over a set cannot precede the set.

**R-45 — N-06: the countersigning checker seat is implementer-side.** C-0120 (3) makes the countersigner implementer-side,
reading only the file; V12 §3.3's sentence has it read "the candidate file, the check's output and `metrics.json`" — the
**product's** registry, not `research/baselines/metrics.m-1.json`. Plan §7's heading "research-side seats only" and its
checker row (which read `metrics.m-1.json`) were the plan's error. *Ruling:* the baseline, deny-list, digest and design
seats are research-side; the checker and digest-checker seats are implementer-side and never open `research/` or
`captures/`; C6 against `metrics.m-1.json` is W-15's `cross_check.py`, research-side. Plan §7 and W-20 corrected.

**R-46 — N-01 … N-05: hand-offs the session carries, now written where they will be found** (plan §7, after the table;
W-20's checker names them): N-01 the id / unit / `metricVersion` / role table for every row an AFTER-M-1 item reads, to
M0-k-05 before wave 11 (grep CONFIRMED by the closing check: the ids live in V12 only); N-02 §7b with `referenceBuild` on
every hood and face record (C-0086, C-0101 (3) refuse a face without it) and the rule "every string matches V12 §3.3 C2's
patterns" (plan §7b rewritten); N-03 a deny-list file kind for `baselines:check` and a colour check reading colours only
inside string values (`ng-faces.json`'s cm² integers reach eight digits; every 16-hex digest holds six-hex runs) — the same
for `cross_check.py`, and W-15's rows keep numbers below six consecutive digits where the unit allows (ratios at four
decimals, areas in m²); N-04 `digestHexDigits: 16` in §7c's header (a scanner built to the full digest then refuses the
file instead of passing with zero hits) and W-20's planted-hit control; N-05 no row M0 gates on carries an `absFloor` or a
sign field (C-0092 reads them as `notApplicable`) — the floor stays in `metrics.m-1.json`.

**The work file's lag (notes §3) — fixed in `M-1-work.json` revision 3:** W-15's checker reads "a target row or a
descriptive row in C-0116's form (never a known-defects entry alone)" and its dependencies gain W-01b, W-02b and W-22;
W-10's checker names σ 0.066 / 0.098; W-11's tool says the landed twin ran at relative scale and W-11b applies R-01;
W-12's inputs are W-11b's faces in declared metres and relative, its checker "the shares of every band sum to 1", its
outputs the deep-interior shares; W-13 depends on W-07b; W-16's outputs name the research list, `denylist.json` being
W-16b's; W-20's inputs are E15, E14, E16 §9, E17; W-23 is the receipt (done).

**R-47 — the item notes (notes §4), each answered:** (a) **`rows.py` has one owner:** W-15 is the sole writer of
`rows.py`, `bands.py` and `cross_check.py`; W-05b, W-07b and W-11b produce measured values (tables in their E records and
the `MeasureInput` files), not rows. (b) **W-06's last pass postdates the FTG programme's close** (slot 27 or its stop), and
W-15 depends on it. (c) **W-08 renders with the network disabled**; its log must show 0 requests (a stored SVG may name an
outside resource; no contact outside plan §5). (d) **D15 states `spreadKS.p90` on `block.area`** over the per-template
subsets (M0-b-05b's need). (e) **FTG's first-map clause at BIG_TOWN and BIG_CITY has no reference value at M-1:** an E19
entry, with each slot's client scene time and its contention flag tabled in E05 §9 (a capture cannot be re-taken in an
idle window). (f) **MFCG `time.worst`:** one rule for every time cell M-1 cannot measure (R-44 below); plan §1's "no time
row" is withdrawn. (g) **E14 calls W-14's sensitivity a proxy** of the raster-against-skeleton bias (no skeleton exists
research-side; T-V12-3 decides at M1). (h) **R-17's owner flag:** round 1's header said R-14 and R-17 were flagged for the
owner and its §4 listed R-14 only; the 16-hex truncation is now in plan §5 (7) and section 5 below, made explicit by
`digestHexDigits`. Round 1's record is history and is not edited (corrections route to this round). (i) **Build-id
fetches** are logged in the J161 ledger as the same contact class (W-03-complete's one and W-03b's). (j) **The clock
statements** "17:10" (plan §11) and "17:40" (round 1's header) were wrong — both files were written at 16:59 and LANDED at
17:01; plan §11 now says so, the counts reproduce (C3 26 / 25, then 28 / 27 at the closing check's re-run: corpus drift).
(k) **W-22's numbers** cross as plain ratios at four decimals (the digit rule above).

**R-44 — every time cell M-1 cannot measure is one descriptive row in C-0116's form.** MFCG and NG `time.model`,
`time.firstMap` and `time.worst` for all three: `role: descriptive`, provenance present, `values.n` 0, `sample.failed`
reason `contended` (the 2026-10-03 runs shared the machine with M0's seats) or `unmeasured` (no run), unless W-21 runs;
MFCG `time.worst`'s row carries the stress seeds' attempt counts in its note; FTG's `time.model` rows are admissible server
intervals (R-21) at BIG_TOWN, BIG_CITY, METROPOLIS and CITY. *Reason:* one form for every such cell (the elegance rule,
J112), and C-0116's parity reads a missing row as fail — a "no row" can only be right where no cell exists.

## 2 The premium FTG programme (J164)

**The owner's ruling (J164, 2026-10-03 ~18:50 EDT):** one month of FTG premium (unlimited saves; the premium-only
metropolis option), bought on the session's advice for about 20–25 more towns — BIG_TOWN and BIG_CITY to about ten each,
three to five metropolises, a few other sizes — chiefly for a METROPOLIS reference beside MFCG size 130 and for FTG rows
strong enough to carry bands. This reverses D-31 / J-S11 ("no purchase") and V12 Q-V12-1 ("no", J122) for the month; the
seats make no further purchase and nothing renews by a seat.

**R-33 — The 22 slots, 6–27, and their order (`plan.py` `FTG_PREMIUM_SCHEDULE`; plan §2.1b).** METROPOLIS 4 (`none`,
then three `coast+river`), then BIG_TOWN and BIG_CITY alternating 7 each (`none`, `coast+river`, `none`, `coast+river`,
`none`, `coast+river`, `coast+river`), then CITY 2 (`none`, `coast+river`), then TOWN 2 (`none`, `coast+river`). Totals
after the programme (`plan.json` `ftg.perSize`): BIG_TOWN 10 (4 / 6), BIG_CITY 10 (4 / 6), METROPOLIS 4 (1 / 3), CITY 2
planned + 2 recorded, TOWN 2; 28 slots in all. *Reasons:* (i) **ten per matched size** reaches V12 §3.5.1's `type7`
estimator (n ≥ 10), whose [p10, p90] is what §13.5's band rule was written for, instead of `minmax` at three (covering 0.5
of the population on average); (ii) **the water mix** — the non-water rows pool both settings per size, so any mix of ten
reaches `type7`; the water rows (`water.step`, `water.riverWidth`, the harbour) read only `coast+river` slots, so six per
matched size give them `minmax` at n = 6 (0.71 coverage), while four `none` slots keep the pooled rows representative of
both settings and give the dispersion a within-setting companion (R-40); and each size's first three captures in capture
order are one `none` and two `coast+river`, §13.6 (2)'s panel mix (R-42); (iii) **METROPOLIS first** because it is the
owner's chief motive and premium-only, and **BIG_TOWN / BIG_CITY alternating** so that a run stopped midway leaves the two
matched sizes balanced; (iv) **four METROPOLIS** towns rather than three or five: `minmax` at n = 4 covers 0.6 against 0.5
at three, and the fifth would buy 0.67 for a 60 MB folder and a ten-second server build with no row gaining a different
estimator — the owner's range was three to five; (v) **CITY ×2** because the recorded family `capture/FTG/CITY` (R-02) then
reaches three usable — `minmax` for the generation-time row at CITY (`time.model`, weakness) and its descriptive
companions — and both planned slots are poolable with the 2026-09-21 base (default settings; both recorded captures were
coastal with rivers on, E02 §11.3 (2) and `research/ftg-capture/roadlength100/README.md`), so the family's labels are
`capture/FTG/CITY/coast+river/0` (usable), `/1` (`failed: setting`), then `CITY/none/0` (slot 24) and
`CITY/coast+river/2` (slot 25); (vi) **TOWN ×2** (FTG's form default, 3 625 people) because our TOWN rung [1 500, 10 000)
then holds three FTG sizes — TOWN, BIG_TOWN (5 600) and CITY (9 500) — so the 16 size-dependent request values and the
footprint and street numbers can be read as a function of population inside one rung (research-side numbers, E05 §9; no
row, because `FtgSize` has no TOWN member, R-34); they are last in the order and the first to drop if the sitting runs
short. Nominal populations and rungs by `presets.json` and §1.1's bands: METROPOLIS 49 500 → METROPOLIS, BIG_CITY 24 500
→ CITY, CITY 9 500 → TOWN (as §13.5's generation-time row reads it), BIG_TOWN 5 600 → TOWN, TOWN 3 625 → TOWN; border half
widths 3 000 / 2 750 / 2 500 / 2 000 / 1 750 m. *Vetoable:* yes — the exact list and order are this seat's; the owner
approved the count (plan §5 (1)).

**R-34 — How the extended sample changes FTG's rows (each row's role is §13.5's; the estimator follows n).** At BIG_TOWN
and BIG_CITY (n = 10, `type7`): **target rows with bands by the band rule** — `street.runs` (the extramural ribbon and
suburb regimes), `outline.r90cv` and `outline.roadRatio` (the band recomputed, DC-11), `wall.towerSpacing`,
`water.riverWidth` and `water.step` (over the six `coast+river` slots, `minmax`), `variety.dispersion` (a floor, R-40);
**target rows whose band is a fixed number the design states** (the sample sharpens the reference's value and spread but
the band column stays): `junction.angles` and `junction.share4` (targets for `ringed` and `american`), `bldg.area`,
`bldg.quadSide`, `bldg.worstCorner` (ordinary houses 60–160 m²), `gate.count`; **`street.turn100` stays a declared
exception** (0.5–1.5 × FTG) at M-1 — its stated reason ("at most eight payloads") weakens at ten, so W-05b prints the
`type7` band beside the exception for the design pass (DC-35), but a ruled design cell is re-decided by amendment, not here;
**weakness rows stay weakness** — `street.stepHist`, `street.entropy50` (the cliff and entropy clauses), `wall.ungated`
(ours 0), `tree.nnP1`, `tree.nnMedian`, `tree.pcf`, `time.model` (the server interval, R-21); **descriptive stays
descriptive** — `bldg.partyShare`, `bldg.attached` (one unknown class), `pop.perBuilding`, `wealth.tier1–6`,
`ftg.ringBlock`; `alley.gradient` and the two market squares stay no-rows (R-23). At **METROPOLIS** (n = 4, `minmax`) the
same roles apply with `matched.rung` METROPOLIS, `ftgSize` METROPOLIS — the first FTG METROPOLIS rows (DC-31): §13.5's
"METROPOLIS ↔ MFCG size 130 (FTG per D-31)" gains its FTG side, and the METROPOLIS pooled deviations are MFCG 10 ∪ FTG 4.
At **CITY** (three usable, `minmax`): `time.model` (weakness) and the descriptive companions of R-02. **TOWN**: no row
(`FtgSize` has no TOWN; a widening would be a design amendment nobody has asked for — the two slots are research-side
numbers in E05 §9). The 2026-09-25 payload stays in no sample (R-04). *Measured by:* §13.5's rows and band column (read
whole); V12 §3.5.1.

**R-35 — What `plan.py` needs: the FTG extension is a declared schedule block, not a CLI flag.** The brief asked for "an
`--extend` for the FTG family with slot order kept, as R-13 did for MFCG". R-13's `--extend` (W-01b) extends a **formula**
family by its next index, so a flag with a count suffices; FTG has no formula — an extension is a list of (size, water)
rows in recording order, which must be reviewable and reproducible. A flag that appended rows into `plan.json` would break
the file's rule that every field but the bindings is a pure function of `plan.py`. *Ruling:* programme 2 is the block
`FTG_PREMIUM_SCHEDULE` in `plan.py`, concatenated after `FTG_SCHEDULE` (programme 1); `plan.json` gains `ftg.programmes`
(the two programmes, their slot ranges, rulings, order and procedure), `ftg.perSize`, `ftg.recordedCity`, `ftg.halfWidthM`,
and every slot gains `programme` and `premiumOnly`; `counts.ftgSlots` 28 (`ftgProgramme1` 6, `ftgProgramme2` 22); the slot
rule says the list is the concatenation and an extension can only append. The MFCG `--extend` of W-01b stands as ruled.
*Reason:* reproducibility (regeneration writes the same bytes) and reviewability (the owner can strike a row in the source).

**R-36 — The order invariant, enforced before any write.** `plan.py`'s `compute()` refuses to write a plan whose first six
labels differ from `FTG_FIRST_LABELS`, whose labels repeat, or whose sizes lack a nominal population, a rung or a half
width; `bind` already refuses a slot while an earlier one is open and a capture bound twice. *Receipts (CONFIRMED,
executed on a scratch mirror holding copies of `plan.py`, `plan.json`, `metrics.m-1.json`, V12 and a link to
`captures/ftg`):* regeneration writes 28 slots; slots 0–5 keep every existing key and value and their bindings (slots 0–3
bound at the time), gaining only `programme` and `premiumOnly`; every other top-level block of `plan.json` is identical;
`metrics.m-1.json` byte-unchanged (`7a21bb29…`); `--check` SAME. Red tests: the first two programme-1 rows swapped →
"PLAN CHECK FAILED … FTG slots 0..5 changed or reordered", exit 2, nothing written; a METROPOLIS row prepended to programme
1 → the same refusal; a size without a rung → "FTG size … lacks a nominal population, a rung or a half width", exit 2;
`--bind-ftg 6=<slot 3's folder>` → "slot 4 is still open", exit 1; `--bind-ftg 4=<slot 3's folder>` → "already bound to
another slot", exit 1; the mirror's files unchanged by the red tests. **Installed** into `research/baselines/plan.py`
(sha256 `4015955f…`) by an atomic rename and regenerated at once (`plan.json` `e5697b73…`, then `10501452…` after
`m1/W-02-slot4b` bound slot 4 through the installed script: its `--check` read SAME, CONFIRMED by its LANDED line; then
`524830f5…` after `m1/W-02-slot5b` bound slot 5 at 19:20, SAME by its LANDED line and by this seat's own `--check` at 19:35 in
the continuation — SAME for both files, `524830f5…` and `7a21bb29…`, section 7).

**R-37 — The listed population: recorded, not used.** Signed in, FTG's settlements list carries a per-settlement
population (5 769 and 5 906 against the nominal 5 600; 24 367 and 24 755 against 24 500; 6 221 for slot 4), while the layout
payload holds none (CONFIRMED on six payloads). §13.6 (2) defines the recorded population as "the residents its decoded
payload holds" and names the nominal fallback. *Ruling:* `populationSource` stays `nominal`; the listed figure is recorded
beside it as `listedPopulation` (a number) in `capture-facts.json`, the README and E02, and enters no row and no panel
file. *Reason:* what the listed figure means is PLAUSIBLE only (it varies per settlement by under 6 %, as a generated
count would, but nothing read in the client bundle says so); the design's fallback is CONFIRMED text; the rung band clamps
either value alike. A design amendment adopting the listed figure is possible later and is not asked for here.
*Vetoable:* yes (plan §5 (11)).

**R-41 — The first-of-size rule for the size-dependent class.** R-24 pinned the request-diff's size-dependent class to 16
named leaves after slot 1's controlled comparison (E02 §10.3). A METROPOLIS, CITY or TOWN request will differ from slot 0
in leaves beyond those 16 if the size sets more of them, and H10 forbids widening the class without "two captures whose
form steps differ in one option only". *Ruling:* the **first capture of a new size is itself that comparison** — its form
steps differ from the same-water slot of a captured size in the size option only — so the leaves the post script's
`requestDiff` and `vsSlot0` checks list beyond the 16 are examined, and those that are layout-preset values set by the size
are added **by name** to the script's class with that capture as evidence and a table in E02 (as slot 1 did); the script
then passes, and the size's later captures must repeat those values exactly (the same-size check, vacuous on the first).
Anything that is not a size-set layout value is a deviation: the slot is `--fail-ftg K=<reason>`, never widened in. The
post script's `HALF_WIDTH_M` gained METROPOLIS 3 000, CITY 2 500 and TOWN 1 750 m (an atomic rename of a scratch copy;
the file's hash checked unchanged before the swap; `--check-only` on slots 0–3 still 10 / 10, exit 0 — CONFIRMED). The
checklist itself was not edited by this round (the slot lanes were editing it: H13 and H14 landed meanwhile); the first
programme-2 seat writes its section I from plan §2.1b, as slot 1's seat wrote H.

**R-42 — The owner's sittings keep three FTG pairs per rung.** §13.6 (2) says "one pair per FTG capture … in capture
order: three pairs per rung", written when M-1 had three per size. Read literally with ten captures per size the panel
would grow to ten FTG pairs per rung, lengthening a sitting the owner gives about an hour (J122). *Ruling:* the panel's
FTG pairs stay three per rung — the first `none` and the first two `coast+river` captures in capture order (slots 0, 2, 4
at TOWN; 1, 3, 5 at CITY; 6, 7, 8 at METROPOLIS), which R-33's order guarantees — and every further capture feeds rows
only; the panel script writes `ftg-captures.json` from those READMEs; METROPOLIS joins the FTG panel at M1 (DC-31,
DC-33). *Vetoable:* yes (the owner may want more pairs at the cost of a longer sitting).

**R-43 — The parity run's FTG settings are per rung and water at the nominal population (DC-34).** V12 §3.5.5 step 2
sets "for FTG rows the capture's recorded population", and §6's budget counts "FTG 6 settings × 2 arms × 20 = 240 towns"
— one setting per capture, right at three per rung. With 28 captures that reading makes 1 120 towns a night. *Ruling:*
the rows are pooled per size (R-34) with `matched.population` the size's nominal value, so the parity run's FTG settings
are (rung, water) at the nominal population — TOWN, CITY and METROPOLIS × `none`, `coast+river` = 6 settings, the budget
line's count unchanged; the per-capture population stays the panel's business (§13.6 (2), R-42). A design correction for
the design seat (DC-34), reported not asked.

**The disk estimate (plan §6).** Programme 1 measured: slot 0 65 MB (21 shots at 2× and 20 MB of bodies), slot 1 46, slot
2 38, slot 3 39, slot 4 37 — about 280 MB for six. Programme 2 estimated from them: 14 BIG_TOWN / BIG_CITY × ≈ 45, 4
METROPOLIS × ≈ 60 (a 2–3 MB payload against BIG_CITY's 1.1–1.3 MB, the same shots), 4 CITY / TOWN × ≈ 40 — ≈ 1 030 MB;
`MeasureInput` files ≈ 1 MB each at METROPOLIS. 12 GiB free at 19:00 (`df`); the 1 GB stop rule is far off.

**The procedure's premium differences** are plan §2.1b's ten points (the checklist's section H stays the procedure): the
settlements view's counter is gone and a "Premium Settings" link is never clicked; the metropolis size option is enabled
and chosen for slots 6–9 only, by its request value; the border half widths; the first-of-size rule (R-41); `--premium`
on the post script; the retry rule (a create that made no settlement may be retried up to three attempts, V12 §3.12; a
failed post check is `--fail-ftg`; a site refusal stops the run; nothing slides, slots are fixed by number); the larger
METROPOLIS payload and server time within the five-minute poll; the window left alone (J164) and H12's guarded clicks;
privacy as H11 with the premium wording. *Measured by:* E02 §9–§12; `m1/W-02-slot3b`'s and `-slot4b`'s readings (the
premium account's list and form, the same flow, 10 / 10 checks).

## 3 The corpus rule (the clean-room verifier's P1) and the receipts

**R-38 — An M-1 folder's `stats.json` is read for its string values only.** The verifier's P1 (CONFIRMED by its own
measurement): R-30's exclusion left `captures/mfcg/exports-sweep-m1-2026-10-03/stats.json` out of `doc_checks.py`'s corpus,
yet that file — our script's table over the reference's exports — transcribes the reference's generated city names, which
survive otherwise only in files the checker never opens (the SVG exports and `export-log.jsonl`); keeping it out
contradicts CF-6's own reason for keeping pre-M-1 records (they transcribe reference values). The verifier's remedy was to
drop it from `OWN_RECORD` whole; but its keys are our field names, and R-30's reason for cutting our records was exactly
the phantom C3 runs and C4 lists our own words produce. *Ruling:* the file stays in the corpus for its **string values**
(document-order 3-grams of the values; per-field value lists, which hold the generated names), and its **keys** form no
3-gram and no list. Applied in `docs/validation/bench/doc_checks.py`: `stats\.json` leaves `OWN_RECORD`; a `VALUES_ONLY`
pattern over M-1 folders sets `want_keys` false in the JSON walk; the header comment and the summary line
(`own_values_only=`) say so; `make_denylist.py`'s rebuild at the exit (W-16b) adopts the same two rules so the two
checkers read one corpus (E16 §7; the clean-room record §6 asked for it).

**Receipts (CONFIRMED, executed 18:56–19:15).** (1) The installed script before the change, on the base: colour files
10 648, JSON 10 182, 3-grams 954 291, lists 517, own outputs left out 50 (slots 1–3's records had joined since the
verifier's 44); C1 5, C2 2, C3 1 889, C4 24, S1 0, S2 318, 0 unreviewed, exit 0. (2) The new script on the base: colour
files 10 653, JSON 10 187, 3-grams 955 187, lists 519, own outputs left out 49, values-only 1; **C1 5, C2 2, C3 1 889, C4
24, S1 0, S2 318, 0 unreviewed, exit 0** — the installed file is byte-identical to the copy that gave these counts (`cmp`).
(3) Controls on a scratch document holding one line with five single-word generated city names from that `stats.json` and
one line with seven of its keys in order (the names appear in no record; the document stays in the scratchpad). On the
full corpus both the new script and a keys-included variant give C4 1 (the names) and C3 1 (the keys) — the variant's
corpus has 38 more 3-grams, but the key run also lives in the pre-M-1 `exports-sweep-2026-09-25/stats.json`, which CF-6
keeps with its keys (the two files share all 56 keys; CONFIRMED), so the full corpus cannot separate the two rules. (4)
**The clean separation:** on a scratch corpus root holding only the M-1 `stats.json` (and a stub for C1's source), the new
script gives **C3 0, C4 1** (the five names caught; the seven keys not) and the keys-included variant **C3 1, C4 1** —
the positive control proves the generated names are in the corpus under R-38, the negative control that our keys are not.
(5) **Revision 3's self-check** (run in the continuation, section 7, on the full corpus with slots 4 and 5's folders in it —
JSON files 10 204, 3-grams 955 797, lists 521): `doc_checks.py --doc docs/calibration/M-1-plan.md --heads docs/ARCHITECTURE.md`,
19:37–19:39 — C1 1 (reviewed), C2 0, C4 0, S1 0, S2 1 (reviewed); **C3 45 hits, 43 unreviewed, every one read**: capture dates
and stamps ("the 2026 09 25 captures", "with the 2026 09 21 base"), digit runs of section numbers ("3 5 1 3 5 4"), our own
file paths (the presets file, the NG draw record, the NG build-id string of our `referenceBuild` form) and phrases of our own
records ("recorded in the owner s", "be read as a function of", "is written by the first") — none a reference word list,
palette, grammar or identifier; the plan is not in the design set, so no allow rows are added (wave 1's precedent; the
closing check read 28 / 27 on revision 2, and revision 3 is longer by §2.1b). **This record's own check** (`--doc
docs/calibration/M-1-rulings-2.md --heads docs/ARCHITECTURE.md`, 19:39–19:43): C1 1 (reviewed), C2 0, C4 0, S1 0, S2 1
(reviewed); C3 25 hits, 22 unreviewed, all read — the section-number run of the inputs paragraph ("2 4 3 2 1 3 2 4 3 3 3 4
4" is §2.4, §3.2.1–§3.2.4, §3.3, §3.4.4), our paths (the 2026-09-25 exports sweep, the road-length README) and our own
phrases ("none and the first two", "last in the order and the first to", "the end of this lane"); the same reading, exit 1
by the unreviewed count as every non-design document reads.

## 4 Design corrections the programme requires (for a design seat, `design/m1-corrections-1`; this seat edited no design file)

| id | section | old | new | measured by |
|---|---|---|---|---|
| DC-31 | D-31; §1.1 l. 357; §13.5 `FtgSize` comment and "Matched sizes"; §13.6 (2) (3); §12.9's FTG paragraph; V12 l. 160, §3.4.4's FTG row ("METROPOLIS none (D-31; J122)"), Q-V12-1 | FTG's premium METROPOLIS is not purchased; METROPOLIS compared with MFCG 130 only; "FTG per D-31" | J164 (2026-10-03): one premium month; FTG METROPOLIS rows from `capture/FTG/METROPOLIS` (n = 4, `minmax`, R-34); the panel's three METROPOLIS FTG pairs at M1 / M2b / M4 (R-42); D-31's text records the reversal and its term (the owner's own decision) | J164; plan §2.1b |
| DC-32 | V12 §3.2.1's FTG row; §16 M-1's FTG clause and exit ("six captures decoded") | "BIG_TOWN and BIG_CITY … 3 … six days on the free daily allowance" | two programmes in the owner's signed-in account: programme 1 six slots (J159 / J163), programme 2 the 22 premium slots (J164) — 28 in all; the exit reads "every slot of both programmes decoded or recorded failed" | plan §2.1, §2.1b; E02 |
| DC-33 | §13.6 (2) "one pair per FTG capture … three pairs per rung"; V12 §3.9.1's panel table "FTG 6 (three per rung, TOWN and CITY)" | one pair per capture | three per rung: the first `none` and the first two `coast+river` captures in capture order; further captures feed rows only; the table reads "FTG 9 (three per rung, TOWN, CITY and METROPOLIS)" | R-42 |
| DC-34 | V12 §3.5.5 step 2; §6's B-REF nightly line | "for FTG rows the capture's recorded population"; "FTG 6 settings" = six captures | FTG settings per (rung, water) at the size's nominal population — 6 settings, the count unchanged; rows pooled per size carry `matched.population` nominal; the per-capture population is the panel's | R-43 |
| DC-35 | §13.5 street turning, the target clause's reason | "FTG's per-seed spread over at most eight payloads is too narrow" | the exception stands at M-1; W-05b prints the ten-payload `type7` band beside it, and the next design pass restates the reason or withdraws the exception from that measurement | R-34 |

## 5 Owner-gated, named plainly

1. **The 22 premium creates** in the owner's FTG account (plan §2.1b) — approved in count by J164 ("about 20–25"); the
   exact list and order (METROPOLIS 4, BIG_TOWN 7, BIG_CITY 7, CITY 2, TOWN 2) is this seat's ruling and **vetoable**: strike
   or reorder rows in `plan.py`'s `FTG_PREMIUM_SCHEDULE` before the run (the two TOWN slots are the first to drop). The seats
   make **no further purchase**; nothing renews by a seat; the settlements stay in the owner's account for the owner to
   delete; the recording window is left alone while a seat runs (J164).
2. **The premium month's end** — no second month without the owner's word; a lapse mid-programme stops the run and the
   slots left stay open, recorded (plan §9).
3. **J161's third MFCG load** — R-13's extension (W-03b, after W-01b); approved already; nothing else is loaded.
4. **Not approved, unchanged:** S-V12-1's fallback (+ 30 MFCG loads, + 60 downloads); W-21's timing loads (3 MFCG, 12 NG
   in an idle window after M0-t-01); any further NG load.
5. **The crossing's commit** — the session, on the owner's word, re-confirmed in the chat of the day.
6. **R-14's firewall restatement** (`ng-faces.json` crossing as numbers) — flagged for veto (round 1, standing).
7. **R-17's 16-hex digest truncation** — a format decision the session carries to M0-k-06, made explicit by
   `digestHexDigits: 16`; flagged here for the owner's eye (round 1 said it was and omitted it).
8. **R-37** (the listed population recorded, not used) and **R-42** (three FTG pairs per rung in the sittings) — vetoable.
9. **DC-31** records the owner's own reversal of D-31 (an owner-veto decision) for the premium month; the design seat
   applies it by amendment, reported not asked (J-A34.01).
10. **Disk** — 12 GiB free; the programmes ≈ 1.3 GB; no seat deletes or moves data.
11. **This round's files** — committed by the session on the owner's word (the J164 row names the workflow).

## 6 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read or executed):** every number quoted from E02 (slots 0–4), E03 §9, `W-03-complete.json`, the clean-room
record and its verifier; the design texts each ruling cites (§13.5's rows, band column and ⟨M-1⟩ rule, `FtgSize`; §13.6
(2); §16 M-1; §1.1; §12.9; D-31; V12 §2.4, §3.2.1, §3.3 C7, §3.5.1–§3.5.6, §3.4.4, §3.9.1, §6); FTG's size ladder from
`presets.json`; `plan.py`'s regeneration, the kept bindings, the byte-unchanged registry, `--check` SAME and the five red
tests; the post script's 10 / 10 on slots 0–3 after the half-width change; the base run of `doc_checks.py` before and
after R-38 (exit 0, identical hit counts) and the four control runs; the two `stats.json` files' identical key sets; that
both recorded CITY captures were coastal with rivers on; that the slot lanes bound slots 3 and 4 through the installed
`plan.py` with `--check` SAME. **PLAUSIBLE (reasoning only):** that a METROPOLIS request differs from slot 0 only in
size-set layout values (R-41 tests it on slot 6); the METROPOLIS payload size and server time; that the listed population
is the generated resident count (R-37 keeps nominal); that the ten-payload `type7` turning band will lie inside the
declared exception (DC-35 measures it); that four METROPOLIS towns are the right count inside the owner's three to five.

`df -h /Users/cstokes`: 12 GiB free at the start and the end of the first instance, 13 GiB at the continuation (19:35). Outputs: this record; `M-1-plan.md` revision 3;
`M-1-work.json` revision 3; `research/baselines/plan.py` and the regenerated `plan.json` (`metrics.m-1.json` unchanged);
`research/baselines/ftg_capture_post.py` (three half widths); `docs/validation/bench/doc_checks.py` (R-38);
`results/rulings-2.json`; CHECKPOINT and LANDED lines in `docs/lane-events.log`. Not touched: `plat/`, the design, E02 and
the checklist (the slot lanes' files), `M-1-rulings-1.md` (history), `docs/PROGRESS.md` (the session's ledger).

## 7 Continuation after the owner's account switch (the CONTINUE rule; from 19:32 EDT)

**What this instance found.** The result file and sections 1–6 of this record were written at 19:15–19:16 by the first
instance of this lane, which was stopped before its LANDED line when the orchestrator paused at 19:20 for the owner's account
switch (`m1/W-02-slot5b` LANDED in the same minute). The session committed the files in `83ddd74` (`plan.py`, the post script) and `fd29304` (the pause commit: the plan, the
work file, this record, the result, `doc_checks.py`, `plan.json`'s binds) and relaunched the lane under `b1f350f` (`workflows/26-m1-rulings-2.js`, run `wf_2694b14e-85c`). By the brief's CONTINUE rule
("files without that line mean continue from them") nothing of sections 1–6 was redone; this instance re-executed the
receipts on today's tree, folded in what landed meanwhile, ran the self-checks section 3 (5) had promised, answered the
owner's one question, and wrote the LANDED line. No website was touched by this seat, nothing was written into `plat/` or
the design, and no git command changed state.

**Receipts re-executed (CONFIRMED, 19:34–19:43).** (1) `plan.py --check`: SAME for `plan.json` (60 036 bytes, sha256
`524830f5…`) and `metrics.m-1.json` (88 627 bytes, `7a21bb29…`); the file holds 28 slots, slots 0–5 bound (slot 5 =
`2026-10-03T23-10-37`), 6–27 open with `programme` 2, `ftg.programmes` two, `ftg.perSize` as R-33, `counts.ftgSlots` 28.
(2) `doc_checks.py` on the base (`docs/ARCHITECTURE.md`), with slots 4 and 5's folders now in the corpus: colour files
10 670, JSON 10 204, 3-grams 955 797, lists 521, own outputs left out 53, values-only 1; **C1 5, C2 2, C3 1 889, C4 24, S1 0,
S2 318, 0 unreviewed, exit 0** — the same hit counts as section 3's receipt (2). (3) The two self-checks of section 3 (5).
(4) The work file parses after its status touch and its dump format is unchanged (seven lines differ, all status text).
(5) `df`: 13 GiB free at 19:35. (6) Git (`git show --stat`, read-only): `fd29304` holds six of this lane's files (the plan, the work file, this record,
the result, `doc_checks.py` and `plan.json`), and the last commit touching `plan.py` and `ftg_capture_post.py` is `83ddd74`;
`--check` SAME proves the installed `plan.py` and the committed `plan.json` agree whichever commit holds them. The only
working-tree changes of this continuation are the status touches below and this section.

**Slot 5 folded in.** E02 §13–§15 (slots 3, 4, 5) and the slot lanes' LANDED lines were read whole. Programme 1 is complete:
six slots bound in order, BIG_TOWN `none` × 1 and `coast+river` × 2, BIG_CITY the same; slot 6 (METROPOLIS, `none`) is the
next to take, so the premium programme starts from the first row of `FTG_PREMIUM_SCHEDULE` with nothing sliding. The plan's
header, W-02 row, §2.1 slot-5 row, §2.1b bind sentence, §4 (1), §5 (1) and a §12b row say so (still revision 3: a status
touch, no ruling changed); the work file's `status`, both programme statuses, W-02's status and record, W-02b's dependency
wording and owner-gated step 1 likewise; this record's inputs paragraph and R-36 name slot 5's bind (`524830f5…`). Three E02
findings bear on programme 2 and change no ruling: (a) the two draws of one cell differ although their requests are equal
apart from the client-random ids (slots 2 / 4 and 3 / 5; the server's own seed is the PLAUSIBLE cause) — so W-05b reads a
cell's captures as independent draws of the same settings, which R-33's water mix already assumes; (b) field 11's optional
parts vary by draw, not by account (177–198 field paths across the premium captures; no check reads field 11); (c) the
listed populations 6 221 (slot 4) and 24 597 (slot 5) join R-37's table, recorded and not used.

**The owner's question — "let me know if i need to sign back into FTG": no, not now (CONFIRMED by a live read that was not
this seat's).** Lane `m1/W-02-slot3b`, resumed after the switch, made one read-only landing check at 19:32–19:33 EDT on the
isolated runner because of this question (its NOTE lines in `lane-events.log`): the landing shows the signed-in line, "Sign
out" and "Home", no consent notice; nothing was clicked, the recording holds reads only (15 GET; the 3 POST are error
reporting and analytics, no settlements write), and the session stopped cleanly. The sign-in lives in the capture profile
`profiler/.profiles/ftg`, not in the Claude account, so the account switch did not touch it. This seat read that profile's
cookie table for **flags and times only** (host, persistent, HttpOnly, created, last access, expiry — no name and no value,
nothing written anywhere): two persistent cookies for the site, one created at 18:43 EDT (the owner's sign-back-in after
subscribing, E02 §9.3), both refreshed at 19:32 EDT by that check, expiring 2027-11-07 (the browser's 400-day cap) — which
also explains the profile's 19:32 modification times this seat had noticed before reading the NOTE lines. PLAUSIBLE only:
that the site's own session is still valid at the next sitting. The procedure already covers it — every seat reads the
landing before anything else (checklist H2), and a landing without the signed-in line stops the seat and is reported;
then the owner signs in once in that window (as at 18:43) and the seat is relaunched. *Call made (vetoable):* reading the
profile's cookie metadata to corroborate the live check, rather than answering from the NOTE lines alone — chosen because
the owner's question deserved every local fact; the alternative, never opening the profile's databases, is a rule the owner
may prefer, in which case it goes into the checklist's H11 and this seat's reading stands as the one exception, recorded.

**CONFIRMED versus PLAUSIBLE for this section.** CONFIRMED: every count above (the `--check` hashes, the base run's six
counts and corpus sizes, the two self-checks, the work file's diff, the free space, the lane-events lines of the slot lanes,
the cookie flags and times, the capture folders ending at slot 5's). PLAUSIBLE: the server-seed cause of the differing draws;
the site session's validity at the next sitting; the meaning of the listed population (R-37 unchanged). Not touched by this
instance: `plat/`, the design, E02, the checklist, `doc_checks.py`, `plan.py`, `plan.json`, `M-1-rulings-1.md`,
`docs/PROGRESS.md`; no git state change; no website.
