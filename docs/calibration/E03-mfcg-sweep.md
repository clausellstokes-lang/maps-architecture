# E03 — the MFCG sweep by formula (M-1 work item W-03)

Lane `m1/W-03`, 2026-10-03, on the owner's Mac. This is a research-side record, written in numbers, metric ids and our own
words. It holds no reference code, word list, grammar, palette or generated name. Nothing was written into `plat/`, and no
git command was run.

**Outcome: partial.** The live build is unchanged: `itch:12710731`, JSON version 0.11.5, so there is no pin shift. The sweep
used exactly the **35 loads** the owner approved (J159), one per plan seed. It downloaded **68 of the 70** approved files. **34 of 35 seeds**
exported a JSON, an SVG and a screenshot, with Blob = download on every file and the canonical href correct on every one.
`capture/MFCG/130/plain/8` (seed 1413909430) produced no export, and its page stopped answering input. Two stress seeds
(`/80/river+coast/1`, `/4`) were retries. All three are in the sample's `failed` list. Two of the row's four checks pass as
written. The other two cannot pass inside J159's 35 loads:

- "35 of 35 exports" stands at 34 / 35.
- "A re-export of seed 0, byte-identical" would need a 36th load. A same-load re-export was byte-identical on 33 seeds,
  which is weaker evidence.

The owner steps that would close the row are in section 5.

## 1 What was run

| file | role | bytes | sha256 |
|---|---|---|---|
| `research/baselines/mfcg_sweep_m1.mjs` | the per-seed exporter: one navigation, JSON by URL key, SVG by the Settlement window; guards, probe fallback, load cap | 21 683 | `846007ce…` |
| `research/baselines/sweep_m1.sh` | the wrapper (df before/after, the exporter, `stats.py`) | 1 454 | `abcf6192…` |
| `research/baselines/check_w03.py` | the checker, C1–C6 from the files on disk | 7 078 | `f3f89df5…` |
| `captures/mfcg/exports-sweep-m1-2026-10-03/` | 34 × JSON / SVG / PNG (205 MB), `export-log.jsonl`, `loads.jsonl`, `stats.md` / `stats.json`, `export-check.json`, `probe/`, `README.md` | — | `export-log.jsonl` `9475c3ae…`, `loads.jsonl` `da75d116…`, `stats.json` `c8b94265…` |

- **Build-id check.** At 13:17 local, `profiler/lib/common.mjs` `resolveTargetUrl('mfcg')` returned
  `html-classic.itch.zone/html/12710731/bin/index.html`. Every JSON's values feature says generator mfcg, version 0.11.5
  (C5). The plan's section 9 drift outcome was not needed.
- **Runs.** Loads 1–35 ran 13:22:06–13:55:41 local in three runs:
  1. Seed 0, the calibration probe.
  2. Seeds 1–28. This run crashed during load 29 (section 3, item 5).
  3. The last six seeds.
- **Disk.** 16 GiB free before and 15 GiB after (`disk.log`). The folder holds 205 MB against the plan's ≈ 325, because no
  response bodies were stored.

## 2 The checker (W-03's row) and further receipts — executed 2026-10-03

| check | receipt | result |
|---|---|---|
| row: 35 of 35 exports with Blob = download (`sameAsDownload`) | `check_w03.py` C2: 34 ok seeds, 68 files. Each file's sha1 on disk equals the logged download sha1 and an in-page Blob with `sameAsDownload: true`. The JSON came by the URL key and the SVG by the window. JSON and SVG name the same city in all 34 | **34 / 35 — not met as written.** The 35th is a recorded generator failure (section 4) |
| row: canonical href carries the plan's seed and the plain options | C3: all six keys of `plan.json`'s `hrefExpect` (the size, the seed, and the flags that keep shanty towns and parks off and set river and coast) equal the `hrefAfter` values on 34 / 34 | **pass** |
| row: a re-export of seed 0 at size 40 byte-identical | not run: a cold re-export is a 36th load, outside J159. In its place: on seeds 1–34 the window's JSON item was clicked again in the same load with downloads denied, and the in-page Blob equals the URL-export JSON on 33 / 33 (C4). Seed 0 was the calibration load | **not met as written**; substitute pass |
| work.json: retries recorded in `sample.failed` | C6: `/80/river+coast/1` (2 attempts) and `/4` (3 attempts) carry reason `retry`, their files kept. `/130/plain/8` carries reason `no-export`. Every planned slot is accounted for | **pass** |
| loads within the approval | C1: `loads.jsonl` has 35 lines, 35 distinct plan seeds, every URL on build 12710731 with the plan's query. Every recorded load made exactly one document request | pass |
| version and units | C5: 34 / 34 JSON at mfcg 0.11.5; JSON/SVG unit ratio 4.0 in all 34 (`stats.py`) | pass |
| the checker catches tampering | an APFS clone with one SVG byte changed and one href edited fails C2 and C3; exit 1 against exit 0 on the real folder | pass |
| the tool's mechanics before any live load | a local mock page (file URL, no network) exercised the window and menu guards, mismatch, probe fallback, denied re-export, retry flag, load cap, a frozen page and orphan reconciliation | pass |
| `stats.py` is the 2026-09-25 script | sha1 `f490ea64…` for both copies | pass |

## 3 Calls made under delegated authority (vetoable)

1. **One navigation per seed, not one per file.** The plan, `plan.json` (`mfcgExport.perSeed`) and the 2026-09-25 sweep
   make one navigation per file, which is 70 loads. J159 approved 35 loads and 70 downloads (plan-check PC-06). Each load
   therefore yields the JSON by the URL key on load and the SVG by the app's own Settlement window (T → Export → SVG).
   Two reference crops guard every click (the open window and the open menu, compared byte for byte). On a mismatch, the
   live page goes to a command-driven probe instead of a blind click. *Effect:* the SVG comes from the window, not from
   the `export=svg` key. It has the same element vocabulary and the 4.0 unit ratio. The window-route JSON equals the URL
   JSON byte for byte on 33 seeds. A byte comparison of the two SVG routes on one seed was not possible inside the budget
   (PLAUSIBLE equal).
2. **Own browser, scratch profile.** `session.mjs` writes and later deletes `profiler/.session`, which W-02's FTG
   `drive.mjs` reads. A second session would redirect FTG's one-shot clicks. The tool therefore launched its own headless
   Chrome through `common.mjs` `launch()` with a fresh scratch profile, deleted afterwards because its cache holds the
   build. The app ran with its default settings, as the 2026-09-25 README states for its profile.
3. **No response bodies stored.** The network record keeps URL, status, bytes and host only, so the build's code never
   reached disk under `captures/`.
4. **Seed 0's calibration and the cap padding.** The tool's first version allowed one click per export, but the Settlement
   window needs two. Seed 0 was finished by probe commands: Export opened the menu (no download), then the SVG item gave
   the download. The tool was then stopped before a second load by padding its own `loads.jsonl` with 34 marked
   placeholder lines, which its cap check reads. The file was restored, and `cmp` showed it identical to the one-line file
   saved before. The second version (two-click route, menu guard, same-load re-export) was tested on a mock with a
   dropdown first. Seed 1 calibrated the menu crop live.
5. **The failed seed is not reloaded.** Load 29 (`/130/plain/8`) began at 13:34:13. No JSON arrived within 180 s, and the
   download folder stayed empty. The first version then moved the mouse. The page did not answer within the 600 s
   protocol limit, and the process ended at 13:47:15, exactly the sum. The console trace was lost with the process (no
   Chrome survived).
   - The tool now writes a failed load's record before any input, abandons a screenshot after 20 s, and stops.
   - It never reloads a seed that `loads.jsonl` lists, and it reconciles a loaded seed without a record as a failed slot.
   - The frozen-page case was red-tested on a mock that loops forever.
   - Six loads remained for six seeds, so `/130/plain/8` keeps one load and reason `no-export`.
6. **Retries are kept, flagged and excluded from `usable`.**
   - The rule: an attempt count other than one, or an internal seed other than the plan's, means `retry` (plan
     section 2.2, `plan.json` `retryRule`).
   - The two retried stress files stay on disk. Their geometry is not the plan seed's first attempt.
   - The failures, in our words: `/1` failed a canal build, then regenerated. `/4` hit an invalid polygon in subdivision,
     then failed a canal build, then regenerated.
7. **Timing is contended.** M0's build seats ran on this machine throughout. `gen ms` (sum of the app's stage timings)
   and `export wall ms` are recorded but feed no `time.*` row (plan-check PC-11).
8. **Hosts the page contacts by itself are part of an approved load.** Per load: `html-classic.itch.zone` (the build),
   1 request each to `itch.io` and `static.itch.io`, and 3 to `armoria.herokuapp.com` (PLAUSIBLY the app's emblem). These
   were recorded and not blocked: blocking them would change the exported SVG. They are reported in owner_notes.

## 4 The sample (for W-07, W-09, W-13, W-14, W-15)

| family | planned n | captured | usable (not retry) | `failed` |
|---|---|---|---|---|
| `capture/MFCG/40/plain` (TOWN) | 10 | 10 | 10 | — |
| `capture/MFCG/80/plain` (CITY) | 10 | 10 | 10 | — |
| `capture/MFCG/130/plain` (METROPOLIS) | 10 | 9 | 9 | i = 8, seed 1413909430, `no-export` (no JSON in 180 s; page unresponsive; trace lost) |
| `capture/MFCG/80/river+coast` (stress, descriptive) | 5 | 5 | 3 | i = 1 `retry` (2 attempts, final internal seed 565976615); i = 4 `retry` (3 attempts, final 1143976087) |

Per-family anchors (`stats.json`, min / median / max over the captured files; the stress row includes the two retries):

| family | buildings | walled ha | walled share | cover in walls | median footprint m² | gates | districts | plaza ha | castle ha |
|---|---|---|---|---|---|---|---|---|---|
| 40 plain | 1 209 / 1 447 / 1 576 | 53.8 / 58.3 / 60.9 | 0.814 / 0.905 / 0.926 | 0.561 / 0.605 / 0.627 | 224 / 251 / 313 | 4 / 5 / 5 | 7 / 8.5 / 11 | 0.15 / 0.38 / 0.68 | 0.79 / 2.38 / 3.73 |
| 80 plain | 4 205 / 5 103 / 5 591 | 200 / 212 / 222 | 0.861 / 0.905 / 0.924 | 0.604 / 0.624 / 0.653 | 225 / 263 / 332 | 8 / 8 / 8 | 10 / 12.5 / 15 | 0.16 / 0.33 / 0.51 | 0.77 / 3.51 / 6.41 |
| 130 plain | 12 889 / 13 879 / 14 134 | 518 / 533 / 549 | 0.885 / 0.925 / 0.942 | 0.613 / 0.624 / 0.642 | 228 / 245 / 253 | 11 / 12 / 12 | 13 / 16 / 20 | 0.15 / 0.30 / 0.71 | 0.62 / 5.26 / 8.88 |
| 80 river + coast | 4 374 / 5 336 / 8 092 | 206 / 260 / 350 | 0.845 / 0.905 / 0.942 | 0.590 / 0.594 / 0.647 | 245 / 256 / 305 | 7 / 7 / 7 | 11 / 13 / 15 | 0.27 / 0.42 / 0.64 | 1.02 / 2.43 / 8.02 |

These are `stats.py`'s raw anchor values (plan section 2.2), not rows. The rows, their definitions and bands are W-07's,
W-09's and W-15's.

## 5 Owner-gated steps that would close the row (not taken)

1. **Seed 0's cold re-export.** One more automated load of `capture/MFCG/40/plain/0`. It can run with downloads denied,
   reading the Blob in-page, so it needs **1 load and 0 downloads**, or 1 download if the file is to be kept. Comparing
   the result with `size40-plain-0.json` (sha1 `eaa7701b…`) completes the row's third check.
2. **A second load of `/130/plain/8`.** One load, no download expected. It confirms that the seed freezes the generator,
   which turns `no-export` from PLAUSIBLE into CONFIRMED. A deterministic freeze means "35 of 35" is unattainable on this
   build. The family then stands at n = 9, and `failed` records why (C7).
3. **Optional: a replacement seed.** Restoring n = 10 needs a design ruling: would `capture/MFCG/130/plain/10` be a
   legitimate replacement under V12 §2.4 and §3.2.1? If so, 1 load and 2 downloads.
4. **S-V12-1's 20-seed fallback, if W-13 triggers it.** It would add 30 loads and 60 downloads with this method (one load
   per seed). This is not covered by J159 (plan-check PC-06).

## 6 Findings for other seats (CONFIRMED by execution unless marked)

- **Plan text vs approval.** Plan §2 W-03, §2.2 and §5 item 2, and `plan.json` `mfcgExport.perSeed`, still describe one
  navigation per file. The method here is one per seed. W-01's tool and the plan should say so (the session's call, with
  PC-06).
- **The shared `profiler/.session` hazard.** `session.mjs` overwrites it and removes it on exit, and `drive.mjs` /
  `export.mjs` read it. Two lanes running `session.mjs` at once (W-02's FTG, a W-03/W-04 style lane) would point FTG's
  `drive.mjs` at the wrong browser. `export.mjs --port` exists, but `session.mjs` has no switch to leave the file alone.
- **A frozen page outlasts `export.mjs` too.** Its 600 s protocol timeout and input-after-wait order would hit the same
  failure. This tool's order (record first, bounded screenshot, stop) is the pattern to copy.
- **Rung bands, for the §12 / W-15 design seat.** The 2026-09-25 size→rung mapping used one seed per size. Over ten seeds:
  - Size 40 gives 1 209–1 576 buildings; 4 of 10 exceed TOWN's 1 500.
  - Size 80 gives 4 205–5 591; 1 of 10 is under CITY's 4 500.
  - Size 130 gives 12 889–14 134, all inside METROPOLIS.
  - Gates are 4–5, 8 and 11–12 at the three sizes; W-07 tests the gate law on these.
- **Derived towers.** They remain invalid for the river-and-coast family, where the exported ring follows the shore
  (inherited caveat).

## 7 Effect on `doc_checks.py`

`doc_checks.py` reads `captures/**/README*.md` and `captures/**/*.json` as reference corpus, so this folder joins it.

**Measured, 14:00–14:10, CONFIRMED: the folder adds 0 hits.** Method: `doc_checks.py --doc` was run on
`docs/volumes/V12-calibration.md` and `docs/ARCHITECTURE.md` from two roots, back to back. One root was the project. The
other was a symlinked copy that hides only this folder.

- **The folder entered the corpus.** The project root read 49 more JSON files (9 691 against 9 642), 50 more colour files,
  51 more lists and 1 973 more corpus 3-grams.
- **The results did not move.** Every count is identical between the two roots, and the sorted unreviewed lines `diff`
  empty:
  - V12: C1 8 / 0, C2 0, C3 207 / 33, C4 6 / 4.
  - ARCHITECTURE: C1 5 / 0, C2 2 / 0, C3 2 050 / 14, C4 28 / 5, S2 318 / 0.
- **The existing unreviewed hits predate this folder.** E01 §7 attributes them to `research/baselines/` JSON.
- **V12's S2 count is not a finding.** These runs passed no `--heads`, so V12's S2 pointer hits (581 unreviewed) count
  the same in both runs.

The new tools (`.mjs`, `.sh`, `.py`) are outside `doc_checks.py`'s extension list, and this lane wrote no JSON under
`research/`.

**This record's own check (executed).** Command: `doc_checks.py --doc docs/calibration/E03-mfcg-sweep.md --heads
docs/ARCHITECTURE.md`. Result:

- C1 1 hit, reviewed. C2 0, C4 0, S1 0, S2 0.
- C3 21 hits, 20 unreviewed: capture and tool paths, digit runs of the tables, and phrases of our own (several shared
  with this lane's capture README). None is a reference word list, palette, grammar or identifier.
- The exit status 1 is that unreviewed count. This record is not in the design set, so no allow rows are added (as for
  E01).
- A first run flagged one C4 list: the app's six URL keys on one line. The line was reworded in our own words before
  this run.

## 8 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed):

- the build id and version, and the 35 loads with one document each;
- the 68 files, with sha1 = log = Blob;
- 34 / 34 hrefs, and 33 / 33 same-load re-exports byte-identical;
- the two retries and their attempt counts;
- the failed seed's empty download folder and its timing chain;
- C1–C6, and the checker's red run;
- `doc_checks.py`'s zero delta from this folder, and this record's self-check;
- the mock tests of every mechanic;
- the hosts contacted;
- `stats.py`'s identity;
- the restored `loads.jsonl`.

**PLAUSIBLE** (reasoning):

- that seed 1413909430 freezes MFCG 0.11.5 deterministically;
- that the window-route SVG equals the `export=svg` SVG byte for byte;
- that the `armoria.herokuapp.com` requests are the emblem.
