# E01 — the capture plan and the seed twin (M-1 work item W-01)

Lane `m1/W-01`, 2026-10-03, on the owner's Mac. A research-side record: implementer seats do not read it
(`plat/CLEAN-ROOM.md` rule 2). It holds numbers, metric ids, file paths and our own words. Nothing here was written into
`plat/`, nothing touched a third-party site, and no git command was run.

**Outcome.** The work item is done and its checker passes. `research/baselines/plan.py` now writes the capture plan,
`plan.json`, and the metric registry's research-side twin, `metrics.m-1.json`. The three check vectors of W-01's row,
printed by `plan.py`, match `docs/validation/bench/v12_h32_vectors.out` byte for byte (CONFIRMED, `cmp`). `plan.py` also
reproduces the whole of that file and of `v12_rev_h32.out`, and the original bench script prints the same bytes
(CONFIRMED). The plan fixes 85 slots by formula before anything is captured: 35 MFCG exports (70 files), 44 NG
generations and 6 FTG capture slots. Fantasy Manor's 41 recorded buildings are listed as its sample. No two seeds collide.
The twin registers all 182 ids of V12 §3.4.2's catalogue at version 1.0.0, matching the catalogue table exactly. It also
names eight fields that V12 does not settle, each assigned to the work item that must settle it, and 19 pairs of
(metric, reference) that no M-1 work item fills (section 5). **One side effect needs a fix outside this seat.**
`doc_checks.py` reads every JSON file under `research/` as reference corpus, so the two new files turn the design-set
check red. V12 goes from 0 to 37 unreviewed hits and `ARCHITECTURE.md` from 0 to 16, all of them our own vocabulary
(section 7, CONFIRMED). The fix is one exclusion of `research/baselines/` from that corpus. W-16's deny-list builder
already excludes the folder.

## 1 What was built

| file | what it is | how it is made |
|---|---|---|
| `research/baselines/plan.py` | the plan writer and the seed twin; Python 3.9, standard library only | MurmurHash3 x86_128, which `v12_h32_vectors.py` writes from the public-domain algorithm, is carried inside the script. Every run first checks the SMHasher value `0xB3ECE62A` and the three vectors, and writes nothing if either fails. |
| `research/baselines/plan.json` | every planned capture: family, index, seed, settings, the export or record arguments, the expected canonical href (MFCG), FTG slots in capture order, the Fantasy Manor sample | `python3 research/baselines/plan.py` (48 444 bytes, sha256 `6c81c04b…`) |
| `research/baselines/metrics.m-1.json` | the twin of `dist/metrics.json` (V12 §2.1) that `cross_check.py`'s C6 reads until M1. Each entry has its id, version 1.0.0, input, scale, unit, output with bin edges, per-seed reduction, sign, floor, tolerance, references, row, and the M-1 deliverable and work item that fill it. | the same run (88 627 bytes, sha256 `7a21bb29…`) |

Modes: `--check` recomputes both files and compares them with the files on disk. `--vectors LABEL…` prints the bench
script's exact line format. `--bind-ftg K=FOLDER` and `--fail-ftg K=REASON` record an FTG slot. `--catalogue-check` compares
the registry with V12 §3.4.2's table.

**Seed rule.** seedOf(family, [i]) = reduce(H32(family + '/' + i)), where H32 is h1 of MurmurHash3 x86_128 with seed 0
over the UTF-8 label. MFCG and NG seeds use the `parkMiller` reduce, 1 + (H32 mod 2 147 483 646). That is MINSTD's state
range, and every seed in the plan lies inside it (checked on each run). Capture families are outside the collision domain
(V12 §2.4), so no capture label gains `/r1`.

**Families.** These carry the settings of plan section 2 and V12 §3.2.1.
- **MFCG.** `capture/MFCG/40/plain`, `/80/plain` and `/130/plain` have i = 0…9 each and match TOWN, CITY and METROPOLIS.
  `capture/MFCG/80/river+coast` has i = 0…4 and is the descriptive stress setting. Each entry carries the 2026-09-25
  sweep's query with the plan's seed substituted, one export per file key, and the values the canonical href must show.
- **NG.** `capture/NG/<template>/<size>` covers the four templates, with `medium` at i = 0…4 and `small` and `large` at
  i = 0…2. Each entry carries the `record.mjs` arguments of W-04.
- **FTG.** Six slots, `capture/FTG/BIG_TOWN` and `capture/FTG/BIG_CITY`, each in capture order, follow section 2.1's
  six-day schedule. FTG has no seed. A slot holds its capture folder or its failure reason once W-02 records it.
- **Fantasy Manor.** The capture `2026-09-25T11-25-38` holds generations 0–40 of build 890 (itch upload 2851818). These
  feed the counts rows at M6c and no M-1 row.

## 2 The checker (W-01's row) and further receipts — all executed 2026-10-03, CONFIRMED

| check | command (from the project root) | result |
|---|---|---|
| the three vectors, byte for byte | `python3 research/baselines/plan.py --vectors capture/MFCG/40/plain/0 capture/MFCG/80/river+coast/9 capture/NG/area/medium/0`, compared by `cmp` with line 1 and the three matching lines of `v12_h32_vectors.out` | **identical**; both files have sha256 `b1187d9d79df0faf…`. The lines read 2003595628 PM **2003595629**, 1452355483 PM **1452355484**, 259196529 PM **259196530**, after `verification 0xb3ece62a` |
| the whole vector file | `--vectors` over the labels of all 18 lines of `v12_h32_vectors.out`, then `cmp` | identical (19 lines) |
| the revision vectors | `--vectors` over the 10 labels of `v12_rev_h32.out`, then `cmp` against that file without its comment line | identical |
| two implementations | `python3 docs/validation/bench/v12_h32_vectors.py` on the three labels, then `cmp` with `plan.py`'s output | identical |
| plan entries carry the vectors | `capture/MFCG/40/plain/0` seed 2003595629; `capture/NG/area/medium/0` seed 259196530 (asserted inside `plan.py`) | pass |
| a broken hash writes nothing (red first) | a scratch copy with one expected value changed by 1 | `SELF-TEST FAILED, nothing written`, exit 2, and `plan.json` byte-unchanged |
| determinism | `python3 research/baselines/plan.py --check` | `SAME` for both files |
| the catalogue | `python3 research/baselines/plan.py --catalogue-check` | 182 catalogue ids (`block.areaRel` taken from the scale column) against 182 registered, with 0 missing and 0 extra |
| the FTG slot lifecycle | on a scratch copy: bind out of order, bind a missing folder, rebind, reuse a folder, record a malformed reason, then regenerate | each refused with exit 1. A valid bind and a valid failure were recorded, regeneration kept both, `--check` read `SAME`, and every seed stayed unchanged |

The scratch copies and outputs are in the session scratchpad (`…/scratchpad/m1/w01-*`), which is not part of the
project.

## 3 Calls made under delegated authority (vetoable)

1. **Every metric starts at version 1.0.0**, and `metricsVersion` is 1.0.0. V12 §3.4.3 defines a major version bump only
   as a change of definition, and no metric has had one. The product's `metrics.json` must start at the same versions,
   or M1's re-check of the M-1 file (T-V12-1) fails C6.
2. **The hash is carried inside `plan.py` rather than imported from `docs/`.** If someone edits the bench script, the
   plan's seeds cannot change silently: the self-test and the cross-implementation `cmp` above tie the two together.
3. **FTG labels.** The family is per size (`capture/FTG/<size>`), so a per-size row's `sample.captures` lists that
   size's slots in order (C7). Each slot also has a descriptive label `capture/FTG/<size>/<water>/<k>`, which no seed is
   drawn from. A slot is filled in capture order and is never rewritten. A refused day slides the schedule, and a slot
   that is never taken is recorded as failed with its reason (plan section 9).
4. **The fields V12 does not state are inferred from the row's words and labelled.** Each entry's `basis` says
   *stated*, *default rule* or *inferred*. The inferred units are: `deg` for turning per 100 m, `ratio` for R4,
   σ and the detour index, and `share` for the three cut measures. Floors for lengths, areas, densities and timings are
   stored as a share of the reference median (`relToReferenceMedian`), because the default rule defines them that way.
5. **Fantasy Manor's `referenceBuild` is 890**, the build the design cites. The capture's itch upload, 2851818, is
   recorded beside it.
6. **The MFCG query strings sit in `plan.json`** because W-03's sweep script needs them. They are research-side only.
   `rows.py` must not carry option names into `baselines.json`, since only numbers and flags cross (V12 §3.3, J-V12.2).

## 4 Deliberately deferred (documented, not a bug to re-find)

- **The panel identifier files.** V12 §3.2.1 says `plan.py` writes `fm-captures.json`, `dw-captures.json` and
  `vg-seeds.json`. The M-1 plan (section 1, *Not M-1's*) and W-01's row leave them to the panels at M1, M5, M6c and V-M4.
  `plan.json` keeps the Fantasy Manor sample those files will read. The writer is added to `plan.py` when the first of
  those panels is scheduled. The two texts disagree on who writes the files, and that is for the plan-check lane to
  reconcile.
- **Member ids of `draw.*` and `wealth.*`.** V12 names neither family's members. `metrics.m-1.json` registers each
  family with the item that fixes its members: W-07 for MFCG's draw-style rows (D28) and W-05 for FTG's tier shares (D25).
- **VG.** VG has no entry: V07 owns its recordings, and its rows cross at V-M4.

## 5 Findings for other seats (CONFIRMED by reading the texts named; the rulings are not this seat's)

1. **Four of D4's five NG metrics, and `block.area` in D15, need metres, but NG inputs are relative.** The metrics are
   `street.detour`, `street.cyclesPerKm2`, `plot.minWidth` and `fg.streetwallGap100`, all marked `m` in V12 §3.4.2. V12
   §2.2 and §3.2.2 make NG's input `scale: 'relative'`, so by §3.5.6 each would read `notApplicable`. That would leave its
   ⟨M-1⟩ cell `missingBaseline`, which counts as a fail. `block.area` has a relative variant, `block.areaRel`, with no bin
   edges stated. The other four have none. Two units are also outside `MetricUnit`: per km² for cycles, and a count per
   100 m for gaps. Each is an `open` entry in `metrics.m-1.json` owned by **W-11**, and a design seat must state a relative
   rule or a unit before those rows are written.
2. **Seven further open fields.** The vector of `bldg.wallAlign` mixes degrees and shares, but `MetricDef.output` has one
   unit (W-07). `variety.dispersion` has no stated floor for a distance in z units (W-09, W-05). `block.areaRel` has no
   edges (W-11).
3. **Nineteen (metric, reference) pairs that the catalogue names and no M-1 work item fills**, listed in
   `metrics.m-1.json` → `m1Uncovered`, handed to **W-15** (every §13.5 baseline row present):
   - MFCG: `bldg.area` (descriptive), `water.step` and `water.riverWidth` (descriptive), `pop.perBuilding` (weakness),
     `wall.ungated`, `wall.barrierShare` (descriptive), `label.*` (weakness).
   - NG: `plot.spearman` and `plot.cvDistrict` (weakness), `draw.*`, `label.*`.
   - FTG: `alley.gradient` (weakness; a model-input metric that FTG cannot feed as written).
   - Timing: `time.firstMap` and `time.worst` for all three references.
   - `block.areaRel` for NG: the plan names `block.area` for it (item 1).

   Some of these may be ours-only by intent. That is W-15's call, under the ⟨M-1⟩ rule.
4. **Vector files.** V12 §2.4 points to `v12_rev_h32.out` for its vectors, while W-01's row names
   `v12_h32_vectors.out`. Both files hold different labels and both reproduce, so they do not conflict. The check vector
   `capture/MFCG/80/river+coast/9` lies beyond the plan's five stress indices: it checks the formula, not a plan entry.

## 6 The clean-room corpus and our own files — the new files turn the design-set check red (CONFIRMED)

`docs/validation/bench/doc_checks.py` treats every JSON file under `research/` as reference corpus for C3 and C4
(lines 62 and 108). V12 §3.2.1 places `plan.json` and `metrics.m-1.json` under `research/baselines/`, so the check now
reads our own registry twin and plan as if they were reference material. The twin's keys repeat `MetricDef`'s field names
by design. Its values include the unit names, the way classes and the metric inputs, and its row names and notes quote
V12.

## 7 Measured effect on `doc_checks.py` (2026-10-03, executed)

Each document was run twice: once in the project root, and once in a scratch root identical except that
`research/baselines/` was left out. The scratch root linked to `docs/`, `captures/` and every other entry of `research/`.

| document | with the new files | without them | added by the new files |
|---|---|---|---|
| `docs/volumes/V12-calibration.md` | C3 207 hits, 33 unreviewed; C4 6 hits, 4 unreviewed; exit **1** | C3 174 hits, 0 unreviewed; C4 2 hits, 0 unreviewed; exit 0 | 33 C3 + 4 C4 unreviewed |
| `docs/ARCHITECTURE.md` | C3 2 050 hits, 14 unreviewed; C4 27 hits, 2 unreviewed; exit **1** | C3 2 040 hits, 0 unreviewed; C4 26 hits, 0 unreviewed; exit 0 | 14 C3 + 2 C4 unreviewed |

Every added hit is our own design vocabulary: the unit list, `MetricDef`'s keys, the way classes, the metric inputs,
V12's row names, and phrases of V12 quoted in notes. Some are composite runs, where 3-grams from the new files joined
3-grams already in the corpus. None is a reference word list, palette, grammar or identifier: C1 and C2 are unchanged.
Rewording the notes cannot bring the count to 0, because the keys, units, classes and inputs are what the twin is for.
**The fix is outside this seat's write scope.** `doc_checks.py` should leave `research/baselines/` (our own research-side
outputs) out of `corpus_files` and `json_files`. W-16's `research/baselines/make_denylist.py`, written in parallel,
already excludes the folder (`EXCLUDE`, line 49, applied to its JSON sources through `in_scope`; read at 13:12). The
deny-list therefore does not hash our metric ids, and only `doc_checks.py` remains. A reviewed allow row per hit is the
fallback, but it is fragile: any regeneration of the twin moves the composite hits. Until one of the
two is applied, a design seat running `doc_checks.py` on V12 or `ARCHITECTURE.md` sees these hits as unreviewed. The
outputs are in the scratchpad as `dc-{with,without}-{V12-calibration,ARCHITECTURE}.out`.

This record's own check, `python3 docs/validation/bench/doc_checks.py --doc docs/calibration/E01-capture-plan.md --heads
docs/ARCHITECTURE.md`, found C1 0, C2 0, S1 0 and S2 0, plus C3 24 and C4 2, all unreviewed. Every one of those is our
own words: dates, capture paths, and phrases shared with `plan.json` and the M-1 plan. This record is not in the design
set, so no allow rows are added, as with the M-1 plan's own self-check.

## 8 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed or read): every receipt in section 2; the 85 slots and their seeds; the 0 collisions; the
182-id catalogue match; the files' sizes and hashes; the texts behind sections 4 and 5; the doc-check counts of
section 7; W-16's exclusion of `research/baselines/` (read in its script; W-16 has not landed). **PLAUSIBLE**
(reasoning only):
the inferred units and per-seed reductions labelled `inferred` in `metrics.m-1.json`, and that some of the 19 uncovered
pairs are ours-only by intent.
