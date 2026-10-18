# E03 — the MFCG sweep by formula (M-1 work item W-03)

Lane `m1/W-03`, 2026-10-03, on the owner's Mac; completed the same day by lane `m1/W-03-complete` under J161 (section 9)
and closed by lane `m1/W-03b` with R-13's extension, as section 10 records.
This is a research-side record, written in numbers, metric ids and our own words. It holds no reference code, word list,
grammar, palette or generated name. Nothing was written into `plat/`, and no git command was run.

**Outcome after R-13's extension (section 10, lane `m1/W-03b`): the MFCG sample is complete.** J161's third and last
load exported `capture/MFCG/130/plain/10` (the formula's next index, seed 1179968783) with one generation attempt, the plan
href and no download, so the METROPOLIS plain family stands at **10 usable of 11 indices** (index 8 `no-export`) and keeps
the `type7` estimator. All four families: 10 / 10 / 10 usable, the stress family 3 of 5. J161 is used up (3 of 3 loads,
0 downloads), and both build-id fetches are logged in its ledger. `check_w03.py` C1–C9 pass.

**Outcome after the completion (section 9): three of the row's four checks pass; the fourth stands at 34 / 35 on a
reproduced generator freeze.** Two more loads under J161 (downloads denied, files read from the in-page Blob):

- **Seed 0's cold re-export is byte-identical.** A fresh browser regenerated `capture/MFCG/40/plain/0`, and its JSON
  (sha1 `eaa7701b…`) and SVG (`f41234c3…`) equal the stored files byte for byte. The screenshot was identical too.
- **`capture/MFCG/130/plain/8` froze again.** All of the app's generation stages logged within 2.1 s of the navigation.
  Then no export came within 180 s, and the page's main thread was still busy. The seed stays in `failed` with reason
  `no-export`, now on two loads. "35 of 35" cannot be met on this build with this seed. A substitute waits for the ruling
  seat's replacement-seed rule; J161's third load is kept for it. (Since then: the rule is R-13's formula extension
  (R-39), run by W-03b, section 10.)

The wave verifier's count correction (section 6: two size-40 seeds above 1 500, not four) is applied.

**Outcome of the sweep itself (lane `m1/W-03`): partial.** The live build is unchanged: `itch:12710731`, JSON version 0.11.5, so there is no pin shift. The sweep
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
| `research/baselines/check_w03.py` | the checker, C1–C6 from the files on disk (extended with C7–C8 by the completion: now 11 256 bytes, `60ce9f3e…`, section 9) | 7 078 | `f3f89df5…` |
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
| `capture/MFCG/130/plain` (METROPOLIS) | 10, extended to 11 indices by R-13 (W-03b, section 10) | 10 | 10 | i = 8, seed 1413909430, `no-export` on 2 loads (no JSON in 180 s; page unresponsive; section 9.3) |
| `capture/MFCG/80/river+coast` (stress, descriptive) | 5 | 5 | 3 | i = 1 `retry` (2 attempts, final internal seed 565976615); i = 4 `retry` (3 attempts, final 1143976087) |

Per-family anchors (`stats.json`, min / median / max over the captured files; the stress row includes the two retries):

| family | buildings | walled ha | walled share | cover in walls | median footprint m² | gates | districts | plaza ha | castle ha |
|---|---|---|---|---|---|---|---|---|---|
| 40 plain | 1 209 / 1 447 / 1 576 | 53.8 / 58.3 / 60.9 | 0.814 / 0.905 / 0.926 | 0.561 / 0.605 / 0.627 | 224 / 251 / 313 | 4 / 5 / 5 | 7 / 8.5 / 11 | 0.15 / 0.38 / 0.68 | 0.79 / 2.38 / 3.73 |
| 80 plain | 4 205 / 5 103 / 5 591 | 200 / 212 / 222 | 0.861 / 0.905 / 0.924 | 0.604 / 0.624 / 0.653 | 225 / 263 / 332 | 8 / 8 / 8 | 10 / 12.5 / 15 | 0.16 / 0.33 / 0.51 | 0.77 / 3.51 / 6.41 |
| 130 plain (10 usable: i = 0–7, 9, 10) | 12 889 / 13 951 / 16 800 | 518 / 535 / 549 | 0.885 / 0.924 / 0.942 | 0.608 / 0.623 / 0.642 | 202 / 242 / 253 | 11 / 12 / 12 | 11 / 16 / 20 | 0.15 / 0.36 / 0.71 | 0.62 / 3.83 / 8.88 |
| 80 river + coast | 4 374 / 5 336 / 8 092 | 206 / 260 / 350 | 0.845 / 0.905 / 0.942 | 0.590 / 0.594 / 0.647 | 245 / 256 / 305 | 7 / 7 / 7 | 11 / 13 / 15 | 0.27 / 0.42 / 0.64 | 1.02 / 2.43 / 8.02 |

These are `stats.py`'s raw anchor values (plan section 2.2), not rows. The rows, their definitions and bands are W-07's,
W-09's and W-15's. The 130 plain row was recomputed by W-03b over the ten usable files (section 10.3); over the first
nine it read 12 889 / 13 879 / 14 134 buildings, 533 walled ha, 0.925 walled share, 0.613 / 0.624 cover, 228 / 245
median footprint, 13 / 16 districts, 0.30 plaza ha and 5.26 castle ha.

## 5 Owner-gated steps that would close the row

The owner approved up to three more loads (J161). Steps 1 and 2 were taken by lane `m1/W-03-complete` (section 9);
step 3 was ruled as R-13's formula extension (R-39) and taken by lane `m1/W-03b` (section 10); step 4 is not approved.

1. **Seed 0's cold re-export — done (J161 load 1).** One more automated load of `capture/MFCG/40/plain/0`. It can run with downloads denied,
   reading the Blob in-page, so it needs **1 load and 0 downloads**, or 1 download if the file is to be kept. Comparing
   the result with `size40-plain-0.json` (sha1 `eaa7701b…`) completes the row's third check.
   *Result:* JSON, SVG and screenshot byte-identical to the stored files; 0 downloads.
2. **A second load of `/130/plain/8` — done (J161 load 2).** One load, no download expected. It confirms that the seed freezes the generator,
   which turns `no-export` from PLAUSIBLE into CONFIRMED. A deterministic freeze means "35 of 35" is unattainable on this
   build. The family then stands at n = 9, and `failed` records why (C7).
   *Result:* it froze again; `no-export` now rests on two loads (C6, C7).
3. **Optional: a replacement seed — waiting.** Restoring n = 10 needs a design ruling: would `capture/MFCG/130/plain/10` be a
   legitimate replacement under V12 §2.4 and §3.2.1? If so, 1 load and 2 downloads. The rule belongs to the M-1 ruling
   seat (`m1/rulings-1`); J161's third load is unused and kept for it.
   *Result:* ruled R-13 (a frozen seed extends the family by the formula's next index, never a hand-chosen seed) and R-39;
   `plan.py --extend` (W-01b) added index 10, and J161 load 3 exported it with 0 downloads (section 10). The family
   stands at 10 usable.
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
  - Size 40 gives 1 209–1 576 buildings; 2 of 10 exceed TOWN's 1 500 (1 571 and 1 576; 1 499 and 1 491 are just under).
    The first version of this record said 4 of 10; the wave verifier counted 2 from `stats.json`, and the completion
    lane recounted 2 (section 9).
  - Size 80 gives 4 205–5 591; 1 of 10 is under CITY's 4 500.
  - Size 130 gives 12 889–16 800 over its ten usable seeds; 1 of 10 exceeds METROPOLIS's 15 000 (16 800, the extension
    index 10; the other nine are 12 889–14 134). Corrected by W-03b (section 10.3); the first nine were all inside.
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

- that seed 1413909430 freezes MFCG 0.11.5 deterministically (superseded: reproduced on a second load, section 9);
- that the window-route SVG equals the `export=svg` SVG byte for byte;
- that the `armoria.herokuapp.com` requests are the emblem.

## 9 Completion under J161 (lane `m1/W-03-complete`, 2026-10-03, 16:30–16:52 local)

**Approval and use.** J161 (the owner, 2026-10-03, about 16:30 EDT) approved up to three more automated loads of the
public build: the cold re-export of seed 0, one retry of `/130/plain/8`, and a substitute only after the ruling seat's
replacement rule. This lane used **2 loads and 0 downloads**: every download the page started was denied, and the files
are the in-page Blob's bytes. It also made one fetch of the public game page for the build-id check. No login, account,
payment, terms or consent prompt appeared, and the site asked nothing else. The third load is unused.

### 9.1 What was run

| file | role | bytes | sha256 |
|---|---|---|---|
| `research/baselines/mfcg_j161_m1.mjs` | one plan name per run: the sweep's route with downloads denied; its own two-load ledger; no-overwrite writes; compare with stored files; on a failed load, the record first, then one bounded non-input question | 17 895 | `48f7d52b…` |
| `research/baselines/check_w03.py` | C1–C6 as before (C6 now counts a slot's J161 loads), plus C7 (the J161 ledger) and C8 (the cold re-export) | 11 256 | `60ce9f3e…` |
| `captures/mfcg/exports-sweep-m1-2026-10-03/j161/` | `loads.jsonl` (2 lines), `export-log.jsonl` (2 records, 2 notes), the cold re-export's JSON, SVG and PNG, `disk.log`; 1.4 MB | — | `loads.jsonl` `0799d51d…`, `export-log.jsonl` `900a00cf…` |
| `captures/mfcg/exports-sweep-m1-2026-10-03/export-check.json` | the checker's output, C1–C8 | 3 kB | `a9f53e2f…` |

- **Build-id check.** At 16:34:14 local, `resolveTargetUrl('mfcg')` returned `html-classic.itch.zone/html/12710731/bin/index.html`.
  The build is unchanged, so there is no pin shift.
- **Load 1** (16:34:28): `size40-plain-0`, in a fresh scratch profile with an empty cache, like seed 0's first load.
- **Load 2** (16:34:54): `size130-plain-8`, in the same profile with a warm cache, like load 29.
- **Afterwards.** The profile (92 MB) was deleted, and no Chrome process remained.
- **Mock tests before any live load.** These ran on a `file://` copy of the sweep lane's mock page, with no network.
  - A green run with the compare.
  - A page that freezes after loading. The record was written first, the question came back "busy", the screenshot was
    abandoned after 20 s, and the tool exited at 40 s.
  - The cap of 2 refused a third load, and a name already in the ledger was refused.
  - No overwrite: the write failed with EEXIST and the compare still ran.
  - A red compare on a flipped byte.
  - The test found one bug, now fixed: comparing after writing into the same folder compared a file with itself, so the
    compare now runs first.

### 9.2 Results (executed 2026-10-03)

| check | receipt | result |
|---|---|---|
| row: a re-export of seed 0 at size 40, byte-identical | C8. The cold load's JSON (525 367 B, sha1 `eaa7701b…`) and SVG (584 676 B, `f41234c3…`) equal the stored `size40-plain-0.json` / `.svg` byte for byte. The checker reads both pairs, and `cmp` was also run. The screenshot is identical too (`032cd974…`). One generation attempt at the plan seed; the href equals the plan; the same-load window re-export is identical | **pass** |
| row: 35 of 35 exports | 34 / 35. `/130/plain/8` froze on both of its loads (9.3). C6 records `no-export` with `loads: 2` and both loads' details | **not met, and cannot be met on this build with this seed** |
| row: canonical href | unchanged, 34 / 34 (C3) | pass |
| work.json: retries in `sample.failed` | C6: `/130/plain/8` `no-export`; `/80/river+coast/1` and `/4` `retry` | pass |
| J161 loads | C7: 2 ledger lines with plan names, on the pinned build with the plan's JSON export query. One document each and a record for each. 0 downloads completed (load 1's three download events were all denied; load 2 started none). Every written file hashes to its logged sha1 | pass |
| the checker catches tampering | three APFS clones. A flipped SVG byte under `j161/` fails C7 and C8. A third ledger line fails C7. A download marked completed fails C7 and C8. All three exit 1; the real folder exits 0 | pass |
| `stats.py` re-run | run as `sweep_m1.sh` runs it. No file was added to the folder, so `stats.md` and `stats.json` are byte-identical to before (`44a2cb00…`, `c8b94265…`) | pass |
| the section 6 count | recounted from `stats.json`: size 40 has 2 of 10 above 1 500 (1 571, 1 576). Corrected in section 6 and in the README | corrected |

### 9.3 The freeze, in our own words (CONFIRMED unless marked)

- **What load 2 logged.** It logged the seed line once, so there was one attempt, at the plan seed, and no retry. Then it
  logged every stage-timing line through the last one the tool waits for. The last of these came 2.1 s after the
  navigation began.
- **What then failed to happen.** No Blob and no download event came in the next 180 s; the tool waited 181.8 s in all.
  A non-input question to the page (an evaluate) got no answer within 10 s, so the main thread was busy. A screenshot
  got no answer within 20 s. The tool closed the browser and killed its process.
- **The emblem requests were missing.** The page made 18 requests: 16 to the build (mostly cached) and 1 each to
  `itch.io` and `static.itch.io`. It made **none** to the emblem host. Each of the 35 good loads made 3 there.
  - PLAUSIBLE: the hang lies after the model's stages and before the step that fetches the emblem and exports, which
    would be drawing or labelling. Nothing was profiled.
- **Two of two loads froze.** Load 29 gave no JSON within 180 s, then went 600 s without answering input. So the seed
  has frozen on both of its loads, in two browser sessions with different cache states.
  - CONFIRMED: the freeze reproduces.
  - PLAUSIBLE: it happens on every load of this build. That is the strong reading of 2 out of 2.
- **Consequence.**
  - `capture/MFCG/130/plain/8` stays in `sample.failed` with reason `no-export`, and no files.
  - The METROPOLIS plain family stands at n = 9 until the ruling seat's replacement-seed rule.
  - J161's third load is kept for that substitute.

### 9.4 Calls made under delegated authority (J122; vetoable)

1. **Downloads denied for both loads; the files are the in-page Blob's bytes.**
   - Why: section 5 item 1 offered the owner exactly this route (1 load, 0 downloads). The sweep showed Blob = download
     on all 68 files and on 33 re-exports, so the bytes compared are the bytes a download would save. And nothing reaches
     disk through the browser.
   - What stays the same: everything else in the method. One load, the JSON by the URL key, the SVG by the window behind
     the same reference crops, and the same-load JSON re-export.
2. **A separate tool and ledger, not an edit of `mfcg_sweep_m1.mjs`.**
   - The landed tool refuses, by design, any seed already in the J159 ledger, and its hashes are recorded in section 1.
   - J161's loads are counted in their own ledger with a cap of 2, so the third load stays the ruling seat's.
3. **Cold means a fresh profile.** Load 1 ran on an empty cache. Load 2 reused the profile (warm, as load 29 was). The
   profile was deleted afterwards.
4. **One bounded, non-input liveness question on a failed load.** It tells a busy main thread from an idle page that
   never exported. It is asked only after the record is on disk.
5. **The cold re-export's files are kept under `j161/` (1.4 MB)** so that the identity can be re-checked with `cmp`.
   They are written with no-overwrite and never replace the stored files.
6. **The checker was extended in place** (C6, C7, C8), so one command still checks the whole folder. Its new hash is
   given in 9.1.
7. **The rung-band count was corrected** in section 6 and the README, following the wave verifier.
   - `W-03.json` is a landed result, so it is left as history.
   - The correction is carried in `results/W-03-complete.json`.

### 9.5 Effect on `doc_checks.py`

- **This folder.** `doc_checks.py`'s corpus rule of 2026-10-03 reads reference material only. In this folder it leaves
  out our own records: the README, `export-check.json`, `stats.json` and `probe/`.
- **The new JSON.** `j161/size40-plain-0.json` is a reference export, byte-identical to a file the corpus already reads.
  C3's 3-grams and C4's lists are sets, so it adds nothing.
- **Outside the globs.** The `.jsonl` logs, the SVG and the PNG are not read at all.
- **This record's own check.** The result is in 9.7.

### 9.6 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed):

- the build id;
- 2 loads, one document each, and 0 downloads;
- the cold re-export's identity for JSON, SVG and PNG, and the same-load re-export's identity on seed 0;
- load 2's freeze: its stage log, the 181.8 s wait, the unanswered question and screenshot, and no emblem requests;
- C1–C8 pass, and the three red clones fail;
- `stats.py`'s outputs unchanged;
- the mock tests;
- the profile deleted, with no Chrome left;
- the 2-of-10 recount.

**PLAUSIBLE** (reasoning):

- that the seed freezes on every load of this build (2 of 2 observed);
- that the hang lies in drawing or labelling, after the model's stages (from the missing emblem requests and the stage
  log; not profiled).

### 9.7 This record's own check (executed after section 9 was written)

Command: `doc_checks.py --doc docs/calibration/E03-mfcg-sweep.md --heads docs/ARCHITECTURE.md`. It ran on the corpus
rule of 2026-10-03, which reads 10 152 JSON files and 953 357 corpus 3-grams and leaves 44 of our own outputs out.

- C1 1 hit, reviewed. C2 0, C4 0, S1 0, S2 0.
- C3 30 hits, 28 unreviewed. They are of the same kinds as before: the build path, digit runs of the tables, dates, and
  plain phrases of our own. None is a reference word list, palette, grammar or identifier.
- The exit status 1 is that unreviewed count. As in section 7, this record is not in the design set, so no allow rows
  are added.

## 10 R-13's extension under J161 (lane `m1/W-03b`, 2026-10-03, 22:16–22:50 local)

**Outcome: the METROPOLIS plain family stands at 10 usable, and J161 is used up.** J161's third and last load exported
`capture/MFCG/130/plain/10`, the formula's next index after the frozen index 8 (R-13, R-39; `plan.py --extend` by
W-01b). It made one generation attempt, at the plan seed, and its href equals the plan. Its JSON, SVG and screenshot are
in the sweep folder beside the other 34, read from the in-page Blob with every download denied. `check_w03.py` C1–C9 pass
on the folder. The family keeps V12 §3.5.1's `type7` estimator (10 usable), where nine usable would have given `minmax`.
Both build-id fetches made under J161 are now in its ledger as the same contact class (R-47 (i)). The live build is
still `itch:12710731`, so there is no pin shift. No login, account, payment, terms or consent prompt appeared, and the
site asked nothing else.

### 10.1 What was run

| file | role | bytes | sha256 |
|---|---|---|---|
| `research/baselines/mfcg_j161_m1.mjs` | the J161 tool, extended: ledger kinds (a load, or a `build-id-fetch` written before the fetch with its result as a note in the log); `--build-id`, the check alone (one fetch through `profiler/lib/common.mjs` `resolveTargetUrl`, no browser; exit 4 on a pin shift); the cap counts loads only and is 3, J161's whole approval; a load on an https build refused unless a fresh build-id fetch, made after the last load, found exactly that build | 22 381 | `2b310229…` (was `48f7d52b…`, 17 895) |
| `research/baselines/check_w03.py` | C1–C8 as before, with C2–C5 also covering a seed first captured under J161; C7 at a cap of 3 with the fetch lines checked; new C9, the estimator at the usable count against the declared n | 15 808 | `2a7e4c18…` (was `60ce9f3e…`, 11 256) |
| `captures/mfcg/exports-sweep-m1-2026-10-03/size130-plain-10.json / .svg / .png` | the extension's files: the URL-export Blob, the window's SVG Blob, the screenshot | 7 620 995 / 8 071 825 / 936 474 | sha1 `e39d42d3…` / `f3b4de47…` / `588cd113…` |
| `captures/mfcg/exports-sweep-m1-2026-10-03/j161/loads.jsonl` | 5 lines: loads 1–3 and 2 build-id fetches; its first two lines are byte-unchanged (their 530 bytes still hash to `0799d51d…`) | 1 439 | `9b1d5199…` |
| `captures/mfcg/exports-sweep-m1-2026-10-03/j161/export-log.jsonl` | 3 load records, 2 notes of load 2, 2 build-id notes | 16 548 | `dba00bab…` |
| `stats.md`, `stats.json`, `export-check.json` (same folder) | `stats.py` re-run as `sweep_m1.sh` runs it; the checker's output | — | `99f81c35…`, `eb77b3b6…`, `ab756c8b…` |

- **Seed.** `plan.py --vectors capture/MFCG/130/plain/10` prints H32 1179968782 and Park–Miller 1179968783; the plan entry,
  the load URL, the console's seed line and the href all carry 1179968783.
- **Build-id check** (22:26:25 local, `--build-id`): the public game page named build 12710731, the pinned one. Its ledger line was written before the fetch.
- **W-03-complete's fetch backfilled.** That lane's 16:34:14 fetch (section 9.1) had no ledger line. It now has one, marked
  `backfilled` with `loggedBy m1/W-03b`, its time taken from that lane's own record of the check; its note carries the
  build it found (12710731). A backfilled line never satisfies the tool's build-id guard.
- **Load 3** (22:26:35 local, a fresh scratch profile with an empty cache): the JSON came 8.5 s after the navigation, the
  window and menu crops matched, and the window's JSON item was exported a second time within that load. The page started three
  downloads; all three were denied. One document request; the page's own requests went to the build host (18), `itch.io`
  (1), `static.itch.io` (1) and the emblem host (3), as on every good load.
- **Afterwards.** The scratch profile (13 MB) was deleted. One orphaned network helper of that profile was still running
  and was stopped; no other process was touched. 11 GiB free before and after (`j161/disk.log`).
- **Mock tests before the live contact,** on a `file://` copy of W-03-complete's mock page (index 8's seed freezes, others
  export) and a localhost page standing in for the game page; no outside network. Fifteen cases behaved as intended: the
  guard refused a load with no fetch, after a fetch of another build, after a pin-shift fetch, after a backfilled fetch
  and after a two-hour-old fetch (dry-run and real run, both before any browser started); it allowed a fresh matching
  fetch (dry-run only); `--build-id` exited 0 when the page named the pinned build, 4 when it named another and 4 when it
  named none; a green load of index 10 (3 denied downloads, re-export identical); the cap refused a fourth load; a name already
  in the ledger was refused; files were never overwritten; a freezing page still wrote its record first.

### 10.2 The row's checks (executed 2026-10-03)

| check (plan §2 W-03b) | receipt | result |
|---|---|---|
| the extension's seed = seedOf(family, [10]), by `plan.py --vectors` | 1179968782 / 1179968783 printed; the URL, the console's seed line (1 attempt, internal seed 1179968783) and `hrefAfter` carry 1179968783 | **pass** |
| `check_w03.py` PASS on the folder, C6 counting the J161 ledger | C1–C9 pass, exit 0. C6: `capture/MFCG/130/plain` n 11, captured 10, usable 10, failed i = 8 `no-export` (2 loads). C2: index 10's two files hash to their logged sha1 and equal their Blobs; the screenshot hashes to its logged sha1; the three denied downloads name one city. C3: href 35 / 35. C4: same-load re-export identical 34 / 34. C5: 35 JSON at mfcg 0.11.5, unit ratio 4.0 | **pass** |
| both ledgers counted; the build-id fetch logged as the same contact class | `loads.jsonl` 35 (J159). `j161/loads.jsonl` 3 loads (cap 3) and 2 build-id fetches (W-03-complete's, backfilled; W-03b's), each with its note, each finding 12710731 (C7) | **pass** |
| the family's `type7` estimator unchanged | C9: declared n 10 → `type7`; usable 10 → `type7`. The same checker on a clone of the folder taken before the load failed C9 (usable 9 → `minmax`): red first | **pass** |
| the checker catches tampering | eight APFS clones, each exit 1: a flipped SVG byte (C2, C7), a fourth load line (C7), a fetch line without a note (C7), a fetch note naming another build (C7), an unknown ledger kind (C7), index 10's record removed (C7, C9), index 10's href seed changed (C3), a flipped screenshot byte (C2). The real folder exits 0 | pass |
| `stats.py` re-run | run as `sweep_m1.sh` runs it: `stats.md` and `stats.json` gain the `size130-plain-10` row and nothing else (the first 34 records of `stats.json` are equal to before); a second run reproduces `stats.md` byte for byte | pass |
| plan files unchanged by this lane | `plan.py --check`: SAME for `plan.json` and `metrics.m-1.json` (`8a0efa7e…`) at 22:31 and again at 23:22; `plan.json` was regenerated meanwhile by other lanes (`f6972b91…` from `m1/plan-guard-2` at 22:20, `703dd74b…` after the FTG slot binds by 23:21), index 10's seed unchanged; this lane wrote neither | pass |

### 10.3 Index 10 in numbers (CONFIRMED from `stats.json`)

| anchor | index 10 | the other nine usable (min–max) |
|---|---|---|
| buildings | 16 800 | 12 889–14 134 |
| median footprint m² | 202 | 228–253 |
| walled ha | 544 | 518–549 |
| walled share | 0.890 | 0.885–0.942 |
| cover in walls | 0.608 | 0.613–0.642 |
| gates | 12 | 11–12 |
| districts | 11 | 13–20 |

- **Index 10 lies above METROPOLIS's building count at the target** (§12: 12 000–15 000). With it, 1 of the 10 usable
  size-130 seeds exceeds 15 000, as 2 of 10 size-40 seeds exceed TOWN's 1 500. Section 6 is corrected. This is a finding
  for the §12 / W-15 design seat and for W-07b, not a reason to drop the seed: R-13 allows no hand-chosen substitute.
- It packs more and smaller buildings into a wall of ordinary size; three anchors (buildings, median footprint, districts)
  fall outside the other nine's ranges. Section 4's anchor row and the README's per-family row are recomputed over the ten.
- `stats.md`'s attempts, stage and wall-time columns are blank for this row: `stats.py` (unchanged) reads them from the J159
  log only, and this load's record is in `j161/export-log.jsonl`. The attempt count (1) and the href are checked by C3,
  C6 and C7 from that record; the timing feeds no row (PC-11, R-44).

### 10.4 Calls made under delegated authority (J122; vetoable)

1. **Two contact classes in one ledger.** R-47 (i) puts the build-id fetches in the J161 ledger, while the tool and the
   checker read every line as a load. A fetch line therefore carries `kind: build-id-fetch` and a load line keeps no
   kind, so lines 1–2 stay byte-unchanged and the cap counts loads only. The fetch's result is a `build-id` note in the
   log, written after the fetch, as a load's record follows its ledger line.
2. **W-03-complete's fetch was backfilled,** marked as such, with that lane's own time. Rewriting the ledger's history
   was ruled out; an appended, labelled line keeps the file append-only.
3. **The build-id check comes first, by refusal.** A load on an https build needs a build-id fetch made after the last
   load, at most an hour old, not backfilled, that found exactly the build to be loaded. A pin shift stops the tool
   before any browser starts (plan §9: the owner is told first).
4. **The cap's default is 3,** J161's whole approval (W-03-complete ran with 2 to keep the third for the ruling); the
   ledger now holds 3 loads, so the tool refuses any further load under any cap of 3.
5. **Index 10's files are in the sweep folder, not `j161/`:** the family counts it like its other nine usable seeds, and it is no re-export, so `stats.py`,
   the checker's C2–C5 and W-07b read it like the other 34. Files are written without overwrite.
6. **`stats.py` stays byte-identical** to the 2026-09-25 copy (section 10.3 says what that leaves blank).
7. **The checker was extended in place** (C2–C5 for J161 captures, C7's cap and fetch lines, C9), so one command still
   checks the whole folder.
8. **Section 6's size-130 line and section 4's row were corrected in place** (as the completion lane did for size 40);
   `W-03.json` and `W-03-complete.json` are left as history.

### 10.5 Effect on `doc_checks.py`

`size130-plain-10.json` is a new reference export. Unlike section 9.5's cold re-export, this file duplicates nothing, so
it joins the corpus with new content. `stats.json` adds no string for this row (its name field is empty, see 10.3).
The `.jsonl` logs, the SVG and the PNG are not read.

**Measured, 22:32–23:10, CONFIRMED: the new file changes no result on the design set.** Method as in section 7:
`doc_checks.py --doc` on V12 and on the base document (`docs/ARCHITECTURE.md`) from two roots, back to back. One root
was the project; the other a symlinked copy that hides only `size130-plain-10.json`.

- **The file entered the corpus:** 1 more JSON file and colour file (10 208 against 10 207) and 21 more corpus 3-grams;
  the C4 lists are unchanged (523).
- **V12:** C1 7 / 0, C2 0, C3 155 / 0, C4 2 / 0, S1 0, S2 604 / 588 (no `--heads`, as in section 7) in both runs; the
  sorted unreviewed lines `diff` empty.
- **ARCHITECTURE:** C1 5 / 0, C2 2 / 0, C3 1 888 / 0, C4 24 / 0, S1 0, S2 318 / 0 with the file (exit 0, nothing
  unreviewed); without it, every count was equal and the sorted unreviewed lines `diff` empty (none either way). The second
  root's corpus had grown by 8 JSON files and 1 list meanwhile, written by other lanes (corpus drift), and still no
  count moved.

### 10.6 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed): the seed by `--vectors`; the build id at 22:26:25; 1 load with 1 document, 3 denied downloads
and 0 completed; the files' hashes, Blob identity and the same-load re-export; one attempt at the plan seed; the href;
C1–C9 on the folder, the red-first C9 and the eight red clones; `stats.py`'s added row and reproducibility; `plan.py
--check` SAME; the fifteen mock cases; the profile deleted and its helper stopped; the section 10.3 numbers.
**PLAUSIBLE**: none of the row's conclusions rests on reasoning alone. That the three extra emblem-host requests fetch the
emblem stays PLAUSIBLE, as in section 3.

### 10.7 This record's own check (executed after section 10 was written)

Command: `doc_checks.py --doc docs/calibration/E03-mfcg-sweep.md --heads docs/ARCHITECTURE.md`, on the corpus rule of
2026-10-03 (the new file included).

- C1 1 hit, reviewed. C2 0, C4 0, S1 0, S2 0.
- C3 31 hits, 28 unreviewed, of the kinds section 9.7 lists: the build path, digit runs of the tables, dates and plain
  phrases of our own. None is a reference word list, palette, grammar or identifier. A first run of this section's
  draft found ten more, all our own phrases (a heading, a path pair, the build URL, a few connectives); they were
  reworded before the final run.
- The exit status 1 is that unreviewed count. This record lies outside the design set, so no allow row is added.
