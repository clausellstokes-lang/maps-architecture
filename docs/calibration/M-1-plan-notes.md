# M-1 plan — closing-check notes for the wave-2 and wave-3 seats

Lane `m1/plan-check-close-1`, 2026-10-03 17:03–17:20 local (EDT), the closing checker of plan revision 2
(`M-1-plan.md`, `M-1-work.json`, `M-1-rulings-1.md`), independent of its writer. A research-side record: implementer seats
do not read it (`plat/CLEAN-ROOM.md` rule 2). It holds metric ids, file paths, numbers and our own words only. Nothing was
written into `plat/`, no site was touched, no benchmark ran and no git command changed state. The verdict and its two
blockers are in `results/plan-check-close-1.json`; this file holds every other observation, for the seats that run next.

**Outcome.** The 21 issues of `results/plan-check.json` are all fixed in the plan, the work file or the rulings (CONFIRMED
by reading each against its required change). Every AFTER-M-1 need of `plat/docs/build/M0-work.json` has a work item, a
format and a checker (section 5), with four cross-side hand-offs that the session must carry before M0's waves 11 and 13
(section 2). Two new findings are blockers by the brief's definition (an item ordered before its input; an owner-gated
step marked approved beyond its approval), summarised in section 1 so that a wave-2 seat does not act on the stale text.

## 1 The two blockers (context only; the fix round owns them)

* **B-1 — W-03b is stale and would overspend J161.** Lane `m1/W-03-complete` LANDED at 16:49 (`results/W-03-complete.json`,
  E03 §9), before the rulings seat finished: seed 0's cold re-export is byte-identical, and the retry of `130/plain/8` froze
  again (2 of 2 loads; `sample.failed` `no-export`). J161's third load is unused. The plan still lists both loads as to-do,
  so W-03b as written could take three more loads (five in all against J161's three). Its checker counts the J159 ledger
  only, not `j161/loads.jsonl`. The one step left is R-13's formula extension (index 10, one load), and it needs `plan.py
  --extend`, which W-01b adds. W-03b does not depend on W-01b (CONFIRMED: `plan.py` has no such option today). **A W-03b
  seat must not run the re-export or the retry again.**
* **B-2 — the variety dispersions are scheduled before their inputs.** R-10 standardises both references' dispersion at
  TOWN and CITY by deviations pooled over MFCG's usable seeds plus FTG's three slots at that rung. W-09 outputs MFCG's
  dispersion but depends only on W-03 and W-07b, and it runs before FTG days 5 and 6 (2026-10-07 and 2026-10-08). W-05b's
  FTG dispersion needs W-09's MFCG vectors, yet it depends only on W-02. **Until the fix lands, W-09 and W-05b write vectors
  only.** METROPOLIS, MFCG alone, may be computed at W-09.

## 2 Cross-side hand-offs: the session carries these before M0 waves 11 and 13

These are not blockers under the brief's definition. But if one is missed, an AFTER-M-1 item stops or reads the wrong
verdict.

* **N-01 Metric ids (before wave 11, M0-k-05).** M-1's rows carry V12 §3.4.2's ids (`sgd.tShare`, `cut.sigma`,
  `block.countTemplate`, `bldg.r4.60`, …). Those ids appear in V12 only: grep finds 0 of 11 in `ARCHITECTURE.md`, and
  `cut.length` appears in neither, being DC-21's new id. M0's implementers read no V12 (C-0092; `CLEAN-ROOM.md` rule 1).
  M0-k-05's `METRICS` registry will therefore pick its own ids. The parity CLI matches rows by id, so a mismatch reads
  every M0-gated ⟨M-1⟩ cell as "⟨M-1⟩ row missing" (fail, C-0116). The session should carry one table to M0-k-05: id,
  unit, `metricVersion` and role for every row that an AFTER-M-1 item reads. The ids are ours, and the channel is C-0071's.
  CONFIRMED that the ids appear only in V12. PLAUSIBLE that M0-k-05 would otherwise choose different ones.
* **N-02 `ng-faces.json`'s schema (before wave 11, M0-k-05's `loadNgFaces`).** C-0086 and C-0101 (3) require
  `referenceBuild` **on each face record**, and the loader refuses "a face record lacking `referenceBuild`". Plan §7b puts
  `referenceBuild` at the top of the file only, so every face would be refused. W-10b's face-record writer should put
  `referenceBuild` on every face (and on every hood) as well as at the top. §7b's field names (`ringCm`, `blockAreasCm2`,
  `cuts[].lengthCm`, `cornerT`, `arrivalCdeg`, `fillet`, `hoods[].outlineCm`) are not yet known to the build side. The plan
  carries §7c to M0-k-06 but says nothing about carrying §7b, so the session should carry §7b to M0-k-05 too. Also: §7b says
  "no string beyond the schema's enumerations", yet `seedLabel` and `capture` are free strings. Restate that check as "every
  string matches V12 §3.3 C2's patterns". CONFIRMED by reading.
* **N-03 `denylist.json` through M0's `baselines:check` (before wave 11).** M0-k-05 builds `baselines:check` over
  `baselines.json` and `ng-faces.json` only, but M0-k-07 needs `denylist.json` checked by that same command. The build
  side's colour check is its C3 (no six-hex run anywhere), and every 16-hex digest contains such runs. R-17 gives the file
  kind to `cross_check.py` only. The session must ask M0-k-05 for a deny-list file kind whose colour check reads only
  hex-delimited six-digit runs, or W-20's deny-list crossing is refused. Plan §7's row also says "C4 reads hex-delimited",
  which is V12's numbering. In M0's numbering, C4 is the append-only check and the colour check is C3. **`ng-faces.json`
  has the same problem through its numbers.** Block areas in integer cm² run to seven or eight digits (2 000 m² is
  20 000 000 cm²), and V12 C4's literal rule ("no six-hex-digit sequence anywhere in the file") counts decimal digits as hex
  digits. Both checks, `cross_check.py` at W-15 and M0's C3, must therefore read a colour only in a string value, never
  inside a JSON number. The session should carry this with N-02 to M0-k-05. (CONFIRMED by reading the rule; PLAUSIBLE that
  M0-k-05 would otherwise implement the literal form.)
* **N-04 The 16-hex truncation (before wave 13, M0-k-06).** C-0101 defines version 1's digest as SHA-256(salt ‖ item).
  R-17 truncates it to 16 hex digits while keeping `normalisationVersion: 1`. A scanner built to the full form would pass
  the version check yet never match a digest: zero hits, a silent pass. M0-k-07 has no positive control against the real
  list. Recommended: add a header field `digestHexDigits: 16`, which the session carries with §7c and the scanner refuses
  when it does not know it. At W-20, run a planted-hit control: one listed token placed in a scratch copy outside `plat/`
  must be caught by M0's scanner. The plan's "PLAUSIBLE" label on the truncation is right, but the failure mode is silent,
  not a refusal.

Two more points the session should settle:

* **N-05 Rows M0 gates on carry no floor (W-15).** C-0092 reports a row carrying a metric floor or a sign-indefinite flag as
  `notApplicable` (never pass) at M0. `rows.py` must not write a floor or sign field into the rows that M0-b-05a, M0-b-05b,
  M0-c-07a and M0-c-07b judge (`sgd.*`, `blockc.perHa`, `junction.*`, `block.*`, `cut.*`, `block.courtShare`). The floor
  belongs in `metrics.m-1.json`, and V12 §3.5's form waits for M1.
* **N-06 The countersigner's side (W-20).** C-0120 (3) makes the countersigning checker seat *implementer-side, reading
  only the file*. Plan §7 is headed "research-side seats only", and its checker seat also reads `metrics.m-1.json`, which
  lies under `research/`. An implementer-side seat may never open that folder (rule 2). One side must be chosen. Either the
  countersigner is implementer-side and reads the file plus `baselines:check`'s output only (C6 against the registry stays
  research-side in `cross_check.py` at W-15). Or the session records that a research seat countersigns, and C-0120 (3) is
  amended. As written, the plan is not a breach (its heading says research-side). Executed under C-0120's wording, it would
  be one.

## 3 Plan against work file: the work file is behind the plan (fix when next touched)

* **W-15 checker.** `M-1-work.json` says "every ⟨M-1⟩ cell has a row or a known-defects entry". The plan says "a target row
  or a descriptive row in C-0116's form". **Follow the plan.** C-0116 says never no row, so a known-defects entry alone
  fails M0's parity.
* **W-15 depends.** Neither file lists W-22 (the NG draw rows) or W-01b (C6 needs the new ids in `metrics.m-1.json`). The
  waves order both before W-15, but add them.
* **W-10 checker.** The work file lacks σ 0.066 / 0.098, which the plan and E10 §2 have.
* **W-11 tool.** It still says "adapters/ng.py (relative scale)". This is the landed item's history; W-11b carries R-01.
* **W-12.** The work file reads "W-10 faces (relative)"; the plan reads W-11b's faces in declared metres and relative.
  The work file's checker also lacks "the shares of every band sum to 1", and its outputs omit the deep-interior shares.
* **W-13 depends.** The work file has W-07; the plan has W-07b. W-13 bootstraps the sweep's rows, so W-07b is right.
* **W-20 inputs.** The work file has "E15, E14, E19"; the plan has E15, E14, E16b, E17.
* **W-23.** The work file still names a `doc_checks_exclude.txt` tool. The plan says the exclusion is applied, so W-23 is
  the receipt only.
* **W-16 outputs.** The work file still says "the digest file for @plat/testkit's scanner". W-16b names `denylist.json`.
* **W-03 / W-03b.** See B-1.

## 4 Item-level observations for the seats

* **`rows.py` has no owner.** W-05b names `rows.py` (wave 2) and W-15 names it again (wave 3), but no item writes it, and it
  does not exist yet (nor do `bands.py` and `cross_check.py`). Either W-05b writes per-slot values into E05 §9 and W-15 is
  the sole writer of `rows.py`, or W-05b's first pass writes a minimal `rows.py` that W-15 extends. The same applies to the
  "rows" of W-07b and W-11b: they are measured values until W-15 forms the rows.
* **W-06 is rolling like W-05b.** Its `ftg.ringBlock` row must come from a pass after FTG day 6. W-15 depends on W-06, so
  W-06's last landing must postdate day 6, or W-15 consumes a partial row.
* **W-08 renders offline.** Rasterise the SVGs in headless Chrome with the network disabled. A stored SVG may reference
  outside resources, and a request to a third-party host would be a contact that §5 does not list.
* **D15: `spreadKS.p90` on `block.area`.** M0-b-05b's need names it explicitly. Without it, C-0092 reads the row
  `missingBaseline`. State it in D15 and W-11b's outputs (per-template subsets, as for `cut.length`).
* **FTG first-map time at BIG_TOWN and BIG_CITY.** §13.5's generation-time bar asks for "≥ 10 × sooner than FTG … at
  BIG_TOWN and BIG_CITY from M-1's captures". The plan makes FTG `time.firstMap` descriptive because of contention, and
  W-21 times MFCG and NG only. That clause therefore has no reference value at M-1. Give it an E19 entry with the reason,
  and record each slot's client scene time in E05 §9 with its contention flag, so that M1 knows what exists. Day-k
  captures cannot be re-taken in an idle window.
* **MFCG `time.worst`.** §1's no-row paragraph says "no time row". §8 (5) says a descriptive row with `values.n` 0. Either
  is lawful, since the cell is not ⟨M-1⟩; pick one in E07 and E19.
* **PC-12's remainder.** W-14's step and spur sensitivity is a proxy, not the raster-against-skeleton bias, because no
  skeleton exists research-side. T-V12-3 at M1 decides (R-22). Say "proxy" in E14.
* **R-17's owner flag.** The rulings record's header says R-14 and R-17 "are flagged for the owner's eye in section 4", but
  section 4 (and plan §5) list R-14 only. R-17 conforms to C-0101 apart from the truncation (N-04). Correct the sentence,
  or add the truncation to §4.
* **Build-id fetches.** Revision 1's §5 (2) named the MFCG build-id fetch, so J159 covered it. Its §5 (3) did not name one
  for NG; W-04 has landed, so this is moot. J161's wording does not name a fetch either. W-03-complete made one, and the
  last J161 load would make one. Record it in the load ledger as the same contact class.
* **The self-check re-run (CONFIRMED, 17:13–17:16).** `doc_checks.py --doc docs/calibration/M-1-plan.md --heads
  docs/ARCHITECTURE.md` gives C1 0, C2 0, C4 0, S1 0, S2 0, and C3 28 hits with 27 unreviewed (the plan claims 26 / 25). All
  27 were read: dates and capture stamps, digit runs, file names of our own records and our own phrases. None is a reference
  word list, palette, grammar or identifier. The two-hit drift is corpus drift. Separately, the plan says its self-check ran
  at "17:10" and the rulings record says it ran until "17:40", yet both files were written at 16:59 and LANDED at 17:01.
  Those clock statements are wrong, though the counts reproduce.
* **W-22's checker** ("no colour value in the record") is right. The roof luma ratios cross as plain numbers. Until N-03's
  string-only colour reading is in both checks, keep every number in a crossing file below six consecutive digits where
  the unit allows it: ratios at four decimals, areas in m² rather than cm² in `baselines.json`.

## 5 AFTER-M-1 needs of `M0-work.json`: item, format and checker for each

| M0 item | need | M-1 deliverable / items | format | checker | open point |
|---|---|---|---|---|---|
| M0-b-05a | bent-cut rows: σ plain and ring, corner and arrival shares, fillet share, with provenance | D23 · W-10b → W-15 → W-20 | `baselines.json` rows (pooled, ring, plain, per-template), `rows.py` provenance | W-10b (fixture 11 / 11; σ compared), W-15 C1–C10, W-20 `baselines:check` | N-01, N-05 |
| M0-b-05a | re-fitted depth rows and regime floors as cells | D21 · W-12 → W-17 entry (2) | E12 numbers table, provenance "M-1 ⟨date⟩"; digest entry | W-12 (p10 / p90 reproduced), W-18 | — |
| M0-b-05a | digest: how σ was measured | D33 · R-20 (1) · W-17 | digest entry | W-18 | — |
| M0-b-05a / -05b / M0-c-07a / -07b | the ⟨M-1⟩ rule's form (C-0116) | §8, R-25 · W-15 | descriptive row: role, provenance, `values.n` 0, `sample.failed` reasons | W-15 checker (plan text, not the work file's) | §3 first point |
| M0-b-05b | `ng-faces.json` | D29 · W-10b, W-11b → W-15 → W-20 | plan §7b | research-side ring, integer and area checks; W-15 `cross_check.py`; W-20 `baselines:check` and `loadNgFaces` | **N-02** |
| M0-b-05b | blocks row: NG counts per template at `medium`, `spreadKS.p90` | D15 · W-11b | `block.countTemplate`, `block.area` (declared m, catalogue bins) | W-11b (T1 / T2, registration, indices), W-15 | §4 D15 point; N-01 |
| M0-b-05b | the cut-length row | D30 · W-10b | `cut.length`, 5 m bins to 400 m, `spreadKS.p90` over per-template subsets | W-10b, W-15 C6 (after W-01b registers it) | N-01 |
| M0-c-07a | junction row; MFCG R4, wall alignment, T / Y, dead ends, blocks per ha | D4, D27 (NG); D7, D11 (MFCG) · W-11b, W-07b, W-09, W-14 | rows; raster twin at version 1.0.0 | W-07b (T-V12-6 in full), W-09, W-14 (CV rule) | N-01, N-05 |
| M0-c-07a | deep interiors: NG hollow-block frequency, MFCG inner-lot removal, fitted shares | D5, D32 · W-11b, W-09, W-12 → W-17 entry (6) | `block.courtShare` rows; E12 cells | W-12 (shares sum to 1) | — |
| M0-c-07a | digest: R4, hollow-block definition, junction census | D33 · R-20 (3)–(5) | digest entries | W-18 | — |
| M0-c-07b | `ng-faces.json` hood outlines | D29 · W-11b (hull, R-08) | §7b `hoods[]` | as `ng-faces.json` | N-02 |
| M0-x-03 | known-defects entries of the descriptive rows | R-25 · E19 (M1's file) | the rows' `sample.failed` reasons (implementer-side seats cannot read E19) | W-15 | reasons must be in the row |
| M0-k-07 | `denylist.json`: digests, salt, spell set, `normalisationVersion` 1 | D19, D31 · W-16b → W-20 | plan §7c | W-16b (eleven checks; a planted leak per class); W-20 `baselines:check` | **N-03, N-04** |
| M0-k-07 | §4 G-row, `crossings.json` record, window | W-20 · R-18, R-32 | C-0092's record; G-nnnn row | W-20; the wave's close (C-0120) | N-06 |

## 6 Round 2 — the closing check of plan revision 3 (lane `m1/plan-check-close-2`, 2026-10-03 19:47–20:05 EDT)

The closing checker of revision 3 (`M-1-plan.md`, `M-1-work.json`, `M-1-rulings-2.md`), independent of its writer. The
verdict is in `results/plan-check-close-2.json`. B-1 and B-2 are fixed, and no new finding is a blocker by the brief's four
classes. Everything below is for the session and the seats that run next. Nothing was written into `plat/`, no site was
touched, no git command changed state, and every `plan.py` write ran on a scratch mirror.

**What was confirmed (CONFIRMED, read or executed).** B-1: W-03b is the extension only in plan §1 D6, §2 W-03b, §4, §5 (2)
and the work file. It depends on W-01b, and its checker counts both ledgers. Today `loads.jsonl` holds 35 lines and
`j161/loads.jsonl` holds 2. `mfcg_j161_m1.mjs` finds its seed by name in `plan.json` and caps at `--cap`, so it cannot load
index 10 before W-01b's `--extend`. B-2: W-09 and W-05b write vectors only, and W-15 forms both dispersions after W-02b,
W-05b, W-06 and W-09 in both files. The 22 programme-2 slots are identical in `plan.json`, `M-1-work.json` `ftgProgramme2`,
`results/rulings-2.json` and plan §2.1b: size, water, water options, label in the family form, rung, nominal population and
premium flag (0 mismatches). `plan.py --check` gives SAME for `plan.json` (`524830f5…`) and `metrics.m-1.json`
(`7a21bb29…`). On a scratch mirror: binding slot 7 while slot 6 is open is refused (exit 1); binding slot 6 to slot 5's
folder is refused (exit 1); binding slot 6 to a new folder writes, and `--check` then gives SAME; swapping two programme-1
rows is refused (exit 2). No new `--extend` exists (R-35 makes programme 2 a declared block), so none was run. The band
rule (§13.5) and V12 §3.5.1's estimators match R-34's roles except one bucket (point 5). Disk: programme 1 measures 65 / 46 /
38 / 39 / 37 / 42 MB (267 in all). Programme 2's ≈ 1 030 MB estimate uses ≈ 45 MB per BIG_TOWN / BIG_CITY slot. 13 168 MB
were free at 19:55. `M0-work.json`'s `afterM1Needs` is unchanged since §5 above (same hash at a884e70, fe2e99b and on disk),
and choices C-0124 … C-0138 name no M-1 need. **The self-check re-run** (`doc_checks.py --doc docs/calibration/M-1-plan.md
--heads docs/ARCHITECTURE.md`, 19:52–19:55) gives C1 1 (reviewed), C2 0, C4 0, S1 0, S2 1 (reviewed), and C3 45 hits with
43 unreviewed. These are the rulings seat's counts. All 43 were read: capture dates, section-number digit runs, our own
paths (the presets file, the NG draw record, our `referenceBuild` string) and phrases of our own records. None is a reference
word list, palette, grammar or identifier. The same check on `M-1-rulings-2.md` (19:55–19:58) gives C1 1 (reviewed), C2 0,
C4 0, S1 0, S2 1 (reviewed), and C3 42 hits with 39 unreviewed. The rulings seat's 25 / 22 came before its §7 was written.
All 39 were read, and they are of the same kinds: our paths, digit runs and our own phrases.

1. **Before programme 2 is launched, `workflows/25-ftg-signed-in.js` needs a programme-2 brief.** This is the session's
   file, not the plan. Plan §2.1b names it as the launcher "with slots 6–27 and the premium wording". As written
   (CONFIRMED by reading lines 14–40):
   (a) the first-seat branch fires for `SLOTS[0]`, whatever slot that is. Slot 6's seat would be told it is "the FIRST
   signed-in seat" and must write a new checklist section H and an E02 "Signed-in captures (J163)" section. Plan §2.1b (10)
   wants programme 2's first seat to write section I instead.
   (b) "plan section 2.1: day ${n + 1}'s size and water options" is wrong for these slots: they have no day (`plan.json`
   `day` is null) and they live in §2.1b.
   (c) "all its checks must pass … failed otherwise", combined with the loop's stop on any non-landed result, means that
   without R-41 named, a first-of-size capture (slot 6, METROPOLIS) that sets more than the 16 named leaves fails
   `requestDiff` / `vsSlot0`, and the run stops at slot 6. Name R-41 and §2.1b (4).
   (d) §2.1b (6) wants a created-but-failed slot to be recorded with `--fail-ftg` and the next slot to follow. The loop
   instead stops on it. Keeping the stop is the conservative choice; either way, record which one applies.
   (e) The ground text still says "six towns", "the five remaining towns … FREE account", "the owner's signed-in free
   account" and "fewer than five creates". Programme 2's wording is 22 slots under J164, "premium since J164", and
   unlimited saves.
   (f) The post command omits `--signed-in --premium` (checklist H13 has them).
2. **R-36 guards only the first six labels.** CONFIRMED on the scratch mirror. After slot 6 was bound, the first
   `FTG_PREMIUM_SCHEDULE` row was changed from METROPOLIS `none` to BIG_TOWN `none` and the plan regenerated. `plan.py`
   wrote it with exit 0, and slot 6 became `capture/FTG/BIG_TOWN/none/1` while still holding its METROPOLIS folder. §5 (1)
   lets the owner strike or reorder rows "before the run". Once slot 6 binds, any edit at or before the last recorded slot
   silently relabels captures. Recommended (a small `compute()` check): refuse when a recorded slot's label, size or water
   differs from the prior `plan.json`. Striking unrecorded tail rows (the TOWN pair first) stays allowed. Until then, edit
   only rows after the last recorded slot.
3. **`plan.json` has two writers in wave 2.** Every `--bind-ftg` regenerates both `plan.json` and `metrics.m-1.json` from
   the `plan.py` on disk. W-01b changes `plan.py` and regenerates while programme 2 binds slots. This creates two risks:
   a lost binding (W-01b reads the slots, a bind lands, W-01b writes) and a bind run through W-01b's half-edited `plan.py`.
   Recommended: W-01b develops on a scratch mirror, as the rulings seat did. It installs `plan.py` by atomic rename between
   two binds and regenerates at once. Its checker ("the 28 FTG slots and their bindings unchanged") compares against the
   live `plan.json` read after the install.
4. **The retry rule's "or" (§2.1b (6)) can make a duplicate settlement.** It reads: "a create whose PUT does not return
   200, or after which the settlements list shows no new settlement, made no settlement". So a PUT that returns 200 while
   the list lags would be retried, creating a second settlement in the owner's account. Safer: retry only when the PUT did
   not return 200 *and* the list shows no new row. A PUT 200 with no list row stops the run and is reported. Carry this
   into section I.
5. **`water.step` is in the wrong bucket in R-34.** §13.5's water row has the band column "outline step ≤ 25 m; width band
   by class", so the step is a fixed bound, not the band rule. If W-15 forms `water.step`'s band from FTG's ≈ 50 m step by
   V12 §3.5.2, our ≤ 25 m step fails a target it should pass. W-15 should treat `water.step` like the fixed-band rows (the
   reference value is sharpened, the band column stays) and `water.riverWidth` by the band rule per class. The other
   buckets match §13.5 and V12 §3.5.1:
   * band rule: `street.runs`, `outline.*`, `wall.towerSpacing`;
   * fixed: `junction.*`, `bldg.*`;
   * declared exception: `street.turn100`;
   * the weakness and descriptive rows are unchanged;
   * the estimators are `type7` at n = 10 and `minmax` at 2–9, with coverages 0.5 / 0.6 / 0.67 / 0.71 at n = 3 / 4 / 5 / 6.
6. **Text left behind (not blockers; the rows that act are right):**
   * Plan §2.2's last sentence still lists the cold re-export and the retry as W-03b's steps, and §9's "freezes on the
     retry" row is now history. Reword both as history.
   * W-16b's inputs ("the corpus after W-02 day 6") and its depends (W-02 only) predate programme 2, whose folders join
     the corpus. §4 already starts wave 3 after the programme's close, so the order holds. Add W-02b to the depends.
   * In `M-1-work.json` (follow the plan): D13 still reads "three each, over six days" with work W-02 only; `sampleRule.FTG`
     still reads "six slots … CITY rows estimator single"; `wave2[0]` still has "slots 4-5 (running)"; and the risks entry
     "thin FTG samples: rows already weakness/descriptive" is stale.
   * In `metrics.m-1.json`, regenerated by W-01b, `variety.dispersion`'s `m1` entries still name W-09 / W-05 and
     "minmax at n = 3", and its `open` names W-09 / W-05. R-40 moved both dispersions to W-15.
   * W-03b's checker says the seed is "printed by `plan.py --check`", but `--check` prints SAME / DIFFERS only.
     `plan.py --vectors capture/MFCG/130/plain/10` prints it (H32 1179968782, parkMiller 1179968783; CONFIRMED today).
   * Plan §2.1b (1), rulings-2 §2 and `results/rulings-2.json` quote the site's account-control labels literally. These
     are site controls, not generator content, so this is no clean-room breach. Still, R-27 (PC-20) keeps literal site
     labels in the checklist only. Reword them in our terms when the files are next touched.
7. **The owner's sign-in question.** No new sign-in is needed as of 19:33 EDT: lane `m1/W-02-slot3b`'s read-only landing
   check showed the signed-in line, and no later lane line reports a sign-in prompt (CONFIRMED by the log; this seat touched
   no website). That the site session is still valid at the next sitting is PLAUSIBLE only. The first programme-2 seat
   reads the landing before anything (H2), and stops if the signed-in line is missing. The owner then signs in once in that
   window.
