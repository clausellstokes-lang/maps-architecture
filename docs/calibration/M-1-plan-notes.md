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
