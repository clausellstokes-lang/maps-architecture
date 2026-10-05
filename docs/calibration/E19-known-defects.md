# E19 — known defects of the candidate baselines (the entries for M1's `known-defects.json`)

Lane `filler/e19-known-defects`, 2026-10-05. **Status: draft**, for W-20's crossing seat and M1's owner of
`plat/docs/known-defects.json` (R-25; M0-x-03 defers that file to M1). This is a research-side record: implementer-side
seats do not read it; so each reason also lives in its row's `sample.failed` and note (M-1 plan section 7).
It holds row ids, metric ids, counts, reason codes and ruling ids only. The numbers are in `E19-known-defects.json`
beside it, written by `maps-scratch/filler/e19/gen_e19.py` (read-only over its inputs). Nothing was written into `plat/`
and no git command ran; `plat/docs/build/choices.md` came from the working copy (C-0116, C-0180), not at a commit.

**Outcome.** The candidate (`research/baselines/candidates/baselines.json`, 491 rows, sha256 `784e2373…`, the hash
E15 states) holds **19 rows with `values.n` 0: FTG 8, MFCG 7, NG 4**, the count E15 section 2 gives. **All 19 are in
C-0116's descriptive form**: `role` descriptive, all four provenance fields present, no value but `n` and `seeds`, and
every member of the sample listed in `sample.failed` (indices 0 to members − 1, members = `values.seeds`). Each is one
entry below. **None of the 19 belongs to M0's ⟨M-1⟩ set** (C-0180 (15)), so none can make M0's parity CLI read
`fail`; each reads `reported` by C-0180 (8) ("a row with `values.n` 0 reads `reported`"). Separately, **eight cells
have no row at all** (section 3); none is in M0's ⟨M-1⟩ set either, so M0 reads them `missingBaseline`, not `fail`. One
of those eight (FTG plot depth, frontage and plot share) is listed by the M-1 plan as owing a descriptive row and has
none; it is the one open item (section 4).

## 1 The form (C-0116, as C-0180 (8) and (15) read it)

An ⟨M-1⟩ cell that M-1 could not measure crosses as a descriptive row (`role: descriptive`, provenance present,
`values.n` 0 allowed, `sample.failed` carrying each attempt's reason) and reports `reported` with a known-defects entry.
An `m1` cell with no row reports `fail` (note "⟨M-1⟩ row missing"); a non-`m1` metric with no row reports
`missingBaseline`. M0's `m1` set (C-0180 (15)) is seven metrics: `sgd.tShare`, `sgd.deadEnds`, `blockc.perHa`,
`block.courtShare` (NG and MFCG), `block.area`, `block.countTemplate` and `cut.length`. M-1's registry
(`metrics.m-1.json`) marks a wider set: 81 metrics carry an `m1` member, all 19 entries' metrics among them.

## 2 The entries (rows with `values.n` 0)

Cause codes are this record's grouping: *time, contended* (every member timed under contention, or contended with a
retry or a member with no export) and *time, unmeasured* (no run of that timing at M-1); *thin class* (too few bounded
cuts for the fit). The reason columns count `sample.failed` members by their code as the row stores it.

| # | row | cause | members | failed by reason | rulings in the row's note |
|---|---|---|---|---|---|
| 1 | `ng/medium/cut.sigma/class-holed` | thin class | 20 | thin-class 20 | R-09 |
| 2 | `mfcg/40/plain/time.model/all` | time, contended | 10 | contended 10 | R-21, R-44 |
| 3 | `mfcg/40/plain/time.firstMap/all` | time, unmeasured | 10 | unmeasured 10 | R-21, R-44 |
| 4 | `mfcg/80/plain/time.model/all` | time, contended | 10 | contended 10 | R-21, R-44 |
| 5 | `mfcg/80/plain/time.firstMap/all` | time, unmeasured | 10 | unmeasured 10 | R-21, R-44 |
| 6 | `mfcg/130/plain/time.model/all` | time, contended | 11 | contended 10, no-export 1 | R-21, R-44 |
| 7 | `mfcg/130/plain/time.firstMap/all` | time, unmeasured | 11 | unmeasured 10, no-export 1 | R-21, R-44 |
| 8 | `mfcg/80/river+coast/time.worst/all` | time, contended | 5 | contended 3, retry 2 | R-44 |
| 9 | `ng/medium/time.model/all` | time, contended | 20 | contended 20 | R-21, R-44 |
| 10 | `ng/medium/time.firstMap/all` | time, unmeasured | 20 | unmeasured 20 | R-44 |
| 11 | `ng/medium/time.worst/all` | time, unmeasured | 20 | unmeasured 20 | R-44 |
| 12 | `ftg/BIG_TOWN/time.firstMap/all` | time, contended | 10 | contended 10 | R-47 (e) |
| 13 | `ftg/BIG_TOWN/time.worst/all` | time, unmeasured | 10 | unmeasured 10 | R-44 |
| 14 | `ftg/BIG_CITY/time.firstMap/all` | time, contended | 10 | contended 10 | R-47 (e) |
| 15 | `ftg/BIG_CITY/time.worst/all` | time, unmeasured | 10 | unmeasured 10 | R-44 |
| 16 | `ftg/METROPOLIS/time.firstMap/all` | time, contended | 4 | contended 4 | R-47 (e) |
| 17 | `ftg/METROPOLIS/time.worst/all` | time, unmeasured | 4 | unmeasured 4 | R-44 |
| 18 | `ftg/CITY/time.firstMap/all` | time, contended | 4 | contended 3, setting 1 | R-47 (e) |
| 19 | `ftg/CITY/time.worst/all` | time, unmeasured | 4 | unmeasured 3, setting 1 | R-44 |

Totals: 19 entries (thin class 1, time contended 9, time unmeasured 9); 203 failed members (unmeasured 97, contended
80, thin-class 20, no-export 2, retry 2, setting 2).

**Two entries leave a design clause without a reference value:** rows 12 and 14. The FTG first-map clause of §13.5's
generation-time bar names BIG_TOWN and BIG_CITY, and both rows are `n` 0 (M-1 plan section 8 (5); plan notes, the FTG
first-map item). The per-slot scene times and their contention flags are tabled in E05 section 9, so M1 knows what
exists. The other 17 time and class entries leave no design clause without a value that it gates on.

**Entry 1's companions.** The `holed` class has three sibling rows that do carry a value and are not entries:
`cut.cornerMid` (n 2), `cut.arrival85` (n 10) and `cut.fillet` (n 2) on `class-holed`, each descriptive and each a
pooled share over the class with no per-seed estimate (E10 section 9; the class has 2 bounded bent cuts). M1's entry for the class should name all four rows
and state that only σ is absent (E10's E19 line names the class, not one row).

**What would clear the entries.** The 18 time entries clear only by an idle-window timing run (W-21, owner-gated and not
approved, R-21 and R-44); FTG's first-map rows cannot be re-taken, because the day-k captures are fixed (plan notes).
Entry 1 clears only with more `holed` faces than the 20 `medium` formula seeds give.

## 3 Cells with no row (not entries in C-0116's form)

| source | metric | reference | why no row | in M0's ⟨M-1⟩ set |
|---|---|---|---|---|
| registry `m1NoRow` | `plot.spearman` | NG | R-23 | no |
| registry `m1NoRow` | `alley.gradient` | FTG | R-23 | no |
| registry `m1NoRow` | `label.*` | MFCG | R-23 | no |
| registry `m1NoRow` | `label.*` | NG | R-23 | no |
| E15 `noRow` | `street.runs`, field `alley` | FTG | the field has no value on any payload (E05) | no |
| E15 `noRow` | every metric on `capture/FTG/TOWN` | FTG | R-34 (no TOWN size) | no |
| E15 `noRow` | the stress family's other values | MFCG | R-23 | no |
| M-1 plan section 8 (1); E06 section 10 | FTG plot depth, frontage and plot share (no registry id) | FTG | no plot reaches the client (E06 section 5) | no |

M0 reads each of these `missingBaseline` (C-0116, last case), not `fail`. The first seven were ruled to have no row and
need no `known-defects.json` entry by C-0116's form; they may still be listed by M1 as known gaps (M1's call).

## 4 The open item

**FTG plot depth, frontage and plot share.** The M-1 plan (section 8 (1), deliverable D1) and E06 (section 10, its E19
line) say these "stay descriptive rows in C-0116's form". The candidate holds **0 rows** for them, and the registry holds
**no metric id** for them (its `plot.area` lists no reference). E15's coverage check counts 26 of 26 ⟨M-1⟩ cells
covered, so these three are not among the cells §13.5 and V12 §3.4.2 mark ⟨M-1⟩. The PLAUSIBLE reading is that no
crossing row is owed (no registered metric, no ⟨M-1⟩ mark) and the plan's phrase is stale; the other reading is a
missing registry entry plus three `n` 0 rows. A ruling seat should pick one; until then, M1's `known-defects.json` should
carry the three as a stated gap with E06 section 5 as the evidence. This record leaves it undecided: either answer is a
registry and crossing-file change, outside this lane.

## 5 Rows and checks outside the list

* **107 rows with `values.n` above 0 also list members in `sample.failed`** (rows holding each code: setting 54, no-export 33,
  water-none 8, retry 5, no-cut 4, no-wall 3, uncased 1, truncated-log 1).
  They carry values and bands, so C-0116's descriptive form does not apply; their gaps are listed, not silent (C7,
  T-V12-30).
* **M0's seven ⟨M-1⟩ metrics** have 33 rows, all `target`, none with `n` 0 (`sgd.tShare` 3, `sgd.deadEnds` 3,
  `blockc.perHa` 3, `block.courtShare` 8, `block.area` 5, `block.countTemplate` 4, `cut.length` 7). Eight of them list
  some failed members and still carry values. So no M0 gating cell lacks a row and none would read `fail` for want of one.
* **MFCG derived-graph rows under the CV rule** (S-V12-2): 0 rows fired (E14), so no descriptive row and no entry.

## 6 CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed, `gen_e19.py` over the three inputs; hashes in the JSON):** the 19 rows and their per-reference
count; each row's form (role, provenance, `n`, `seeds`, every member in `failed`); the reason counts; the 107 partial
rows; M0's seven metrics' 33 rows and their roles; the eight no-row cells as the registry and E15 list them; 0 candidate
rows and 0 registry ids for FTG plot depth, frontage and plot share. **Read, not re-run:** E15's 26 of 26 coverage
check and E14's CV result. **PLAUSIBLE:** section 4's preferred answer; that each entry reads `reported`
under M0's parity CLI (from C-0180 (8), not run; M0's CLI is plat/'s and was not executed here).
