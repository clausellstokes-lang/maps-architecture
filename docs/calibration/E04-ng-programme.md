# E04 — the NG recording programme (M-1 work item W-04)

Lane `m1/W-04`, 2026-10-03, on the owner's Mac. This is a research-side record, written in numbers, metric ids and our own
words. It holds no reference code, word list, grammar, palette or generated name. Nothing was written into `plat/`, and no
git command was run.

**Outcome: landed.** The live build is unchanged: `itch:11441280`, the plan's pin, so there is no pin shift. The programme
used exactly the **44 loads** the owner approved (J159 (3)), one cold load per plan seed, and downloaded nothing. All
**44 of 44** recordings exist, each a single generation at its plan seed, in the order the brief set: `medium` first (M0
(b)'s input), then `small`, then `large`. All three checks of the row pass on all 44 folders, and so do four further
checks of our own (C4–C7 below). The checker fails a tampered copy. Disk went from 15 to 14 GiB free; the 44 folders hold
322 MB, under the plan's 450–600 MB estimate.

## 1 What was run

| file | role | bytes | sha256 |
|---|---|---|---|
| `research/baselines/ng_programme_m1.mjs` | the programme driver: `profiler/record.mjs` unchanged, once per plan entry with the entry's own arguments plus `--url`; the load ledger with the 44 cap; `df` before each load; a per-load timeout that kills only that load's own Chrome | 10 913 | `280d1427…` |
| `research/baselines/check_w04.py` | the checker, C1–C7 from the files on disk; runs `profiler/paths_stats.py --md` | 10 866 | `9c172d9d…` |
| `profiler/record.mjs`, `profiler/lib/instrument.js`, `profiler/paths_stats.py` | used unchanged (`git status` on `profiler/` clean) | 10 380 / 13 540 / 14 742 | `7f152077…` / `cca253ac…` / `188b6078…` |
| `captures/neighbourhood/ng-programme-m1-2026-10-03/` | `README.md` (the 44-row index), `build-check.json`, `loads.jsonl`, `index.json`, `disk.log`, `programme.log`, `logs/`, `paths-stats.md` | — | `loads.jsonl` `91837940…`, `index.json` `b472f40f…`, `paths-stats.md` `e0f523d8…` |
| `captures/neighbourhood/2026-10-03T19-05-32` … `2026-10-03T19-11-04` | the 44 capture folders (`meta.json`; `draw/gen-0.{paths.json,draw.json,png,idle.json}`, `console.jsonl`, `network/`) | 322 MB | — |

- **Build-id check.** At 18:59:52Z, `profiler/lib/common.mjs` `resolveTargetUrl('neighbourhood')` fetched the public game
  page once and returned `html-classic.itch.zone/html/11441280/bin/index.html`. That is the plan's pin, so section 9's
  drift outcome was not needed. Every `meta.json` base URL and every final href carries `/html/11441280/` (C6).
- **Runs.** One run, loads 1–44, 19:05:32Z–19:11:15Z (15:05–15:11 local). Each load exited 0. No load hit the 240 s
  timeout, and no leftover browser was found.
- **Disk.** `df -h /Users/cstokes` was read before the build check, before every load and after the programme
  (`disk.log`): 15 GiB free at the start and 14 GiB at the end, so the 1 GB stop rule was never near.

## 2 The checker (W-04's row) and further receipts — executed 2026-10-03

| check | receipt | result |
|---|---|---|
| row: each `meta.json` keeps the requested tags and seed | `check_w04.py` C1 on 44 / 44. `args.seed` and `args.query` equal the plan entry, with runs 0, pass draw and the vertex layer on. There is exactly one generation, a cold load. The final href's `tags` and `seed` parameters equal the plan's. The generator's own per-generation console line (exactly one per load) names the same seed and both tags | **pass** |
| row: `paths.json` caps untouched (0 skipped, 0 dropped) | C2 on 44 / 44: `skippedLong` 0 and `droppedTotal` 0. Also `nonFinite`, `path2d` and `errors` are 0, and `meta.json`'s copy of the counts equals the file's. The largest map holds 62 405 painted paths and 270 635 vertices (`ring/large/2`), against the 4 000 000 cap | **pass** |
| row: `paths_stats.py --md` runs on every folder | C3: one invocation over the 44 folders exits 0. Each of its four tables has 44 rows, and its per-file JSON has an entry for every folder. The output is `paths-stats.md` | **pass** |
| loads within the approval (J159 (3)) | C4: `loads.jsonl` has 44 start lines, 44 distinct plan labels, the plan seed on each and an end line for each. Every folder's network index holds exactly one document request, the build's `index.html`, and no response with an attachment disposition | pass |
| every load settled on the generation | C5: `settled` true and `markerTimedOut` false on 44 / 44. `gen-0.png`, `gen-0.draw.json` and `gen-0.idle.json` are present in all 44 | pass |
| build | C6: 44 / 44 on `/html/11441280/` | pass |
| coverage of the plan | C7: every one of the 44 W-04 entries in `plan.json` has its folder | pass |
| the checker catches tampering | APFS clones of the programme folder and of `square/medium/0`'s folder. In the clone, the seed in `meta.json` was edited and `skippedLong` was set to 1, and the clone's index was pointed at it. C1 and C2 FAIL, exit 1, against exit 0 on the real folders | pass |
| the driver's mechanics before any live load | a local mock page (file URL, no network) under a scratch copy of `record.mjs`. It exercised a normal load, a frozen page (killed at the timeout, its Chrome reaped), a page that never prints the generation line, the never-reload rule on a re-run, the cap and the disk stop. One defect was found and fixed: a delayed kill from a timed-out load could land on the next load's browser, so clean-up now finishes before the next load starts | pass |
| this record carries no reference identifiers, colours or lists | `doc_checks.py --doc E04-ng-programme.md --heads ARCHITECTURE.md`: C1 1 hit (reviewed), C2 0, C4 0, S1 0, S2 0; C3 21 unreviewed hits, all read: capture paths, dates, digit runs and our own phrases (several from this programme's own README, now in the corpus). Exit 1 by that count; the record is outside the design set | pass |
| the new folders cause no doc_checks drift on the design set | `doc_checks.py` on `ARCHITECTURE.md` and on V12 with and without the 45 new folders (a symlinked root without them): the corpus grows by 486 JSON files, 35 647 3-grams and 1 list; every hit count and every unreviewed line is identical, so 0 new hits. The other volumes were not run | pass (two documents) |
| the maps are real generations | `gen-0.png` of `ring/small/0` and `square/large/2` viewed: a full hood each, with roads, blocks and buildings | pass (two viewed) |

## 3 The sample

44 maps: 4 templates × (`medium` 5 + `small` 3 + `large` 3). The counts are `paths_stats.py`'s census: streets (open road
polylines), closed roads (ring roads), footprints (building outlines), street bends, and arrivals at junction ends. They
describe the sample; they are **not** baseline rows. The rows are W-10's and W-11's, measured from these files.

| size | template | n | painted paths | vertices | streets | closed roads | footprints | streets with 0 / 1 / 2+ bends | arrivals ≥ 85° / junction ends |
|---|---|---|---|---|---|---|---|---|---|
| small | area | 3 | 7 982–8 514 | 32 621–50 986 | 25–28 | 0 | 252–262 | 21 / 58 / 0 | 105 / 107 |
| small | street | 3 | 2 336–6 219 | 10 699–22 674 | 8–21 | 0 | 77–198 | 8 / 33 / 2 | 50 / 53 |
| small | square | 3 | 2 609–4 000 | 15 873–25 455 | 11–18 | 0 | 85–124 | 21 / 20 / 0 | 48 / 48 |
| small | ring | 3 | 13 653–16 308 | 56 279–67 569 | 35–43 | 1–3 | 425–532 | 19 / 96 / 0 | 172 / 180 |
| medium | area | 5 | 14 269–34 419 | 69 818–155 376 | 37–99 | 0 | 445–1 118 | 171 / 177 / 1 | 542 / 548 |
| medium | street | 5 | 6 593–12 825 | 29 641–56 268 | 16–39 | 0 | 193–437 | 31 / 100 / 1 | 163 / 171 |
| medium | square | 5 | 4 545–15 419 | 17 392–60 622 | 22–45 | 0–1 | 146–488 | 49 / 111 / 0 | 210 / 222 |
| medium | ring | 5 | 27 543–39 798 | 133 170–164 638 | 61–154 | 1–5 | 837–1 332 | 131 / 351 / 2 | 797 / 822 |
| large | area | 3 | 22 391–36 923 | 104 216–181 493 | 86–101 | 0 | 805–1 236 | 125 / 162 / 0 | 448 / 456 |
| large | street | 3 | 18 844–28 463 | 83 350–132 985 | 57–75 | 0 | 621–918 | 86 / 112 / 2 | 299 / 301 |
| large | square | 3 | 22 323–45 454 | 112 308–192 540 | 67–178 | 0 | 674–1 525 | 184 / 148 / 0 | 528 / 540 |
| large | ring | 3 | 46 185–62 405 | 212 375–270 635 | 107–149 | 1–3 | 1 376–1 930 | 102 / 300 / 1 | 662 / 687 |

Readings, for the seats that use these files (CONFIRMED as counts; their meaning is W-10's and W-11's to rule):

1. **The straight-or-one-bend street holds at every size.** Over all 44 maps, 9 of 2 625 streets have two or more bends
   (948 straight, 1 668 with one bend). On the 2026-09-25 medium maps the count was 3 of 519.
2. **Right-angle arrival holds at every size.** 4 024 of 4 135 junction ends arrive at 85° or more (97.3 %); on the
   2026-09-25 maps it was 96 %.
3. **The size ladder is wide and overlapping.** Footprints per map run 77–532 at `small`, 146–1 332 at `medium` and
   621–1 930 at `large`. The template moves the count about as much as the size does: `ring` has the most footprints on
   average at every size (466, 1 078 and 1 586 per map), and `street` or `square` the fewest (105, 302 and 782).
   CONFIDENCE §6 #2's reading of the sweep (block minor extent against size, D3) is W-11's and W-12's.

## 4 Calls made under delegated authority (vetoable)

1. **`--url` added to every invocation.** Without it, `record.mjs` resolves the build by fetching the public game page on
   every run, which would be 44 page fetches beyond the approved build loads. The driver resolves it once (the build-id
   check) and passes the checked URL. Every other argument is the plan entry's own `record` list, and the driver refuses
   an entry whose list differs from the plan's shape. *Effect:* none on the recordings; one game-page fetch in all.
2. **Order inside a size is index-major** (area 0, street 0, square 0, ring 0, area 1, …), so a programme cut short would
   still have kept the four templates balanced. The brief's size order was kept: medium, small, large.
3. **The recorder's caps were left at their defaults** (5 000 vertices per path, 4 000 000 per generation), as `plan.json`
   lists the arguments. Before the run, the longest path on the 2026-09-25 medium maps had 497 vertices, so the margin was
   about ten times. The outcome was 0 skipped and 0 dropped on all 44, `large` included.
4. **Response bodies are stored, as `record.mjs` always stores them.** This differs from W-03, whose own exporter stored
   none. Keeping `record.mjs` unchanged was the row's tool; the cost is 56 MB over the 44 folders. These files are the
   build's program and asset files, and no M-1 seat reads them (the folder README says so).
5. **Headless Chrome**, `record.mjs`'s default, as on 2026-09-25. `meta.json` records 2.6–18.4 s of wall time per generation.
   Those times were taken while M0's build seats shared the machine, so they are **not** timing rows (`time.model` stays W-11's, from
   its own sources).
6. **`paths_stats.py` ran as one invocation over the 44 folders.** It analyses each folder's file separately; an
   exception in any one would end the run with a non-zero exit.

## 5 Hand-offs and owner notes

- **W-10** (bent cut per face class, M0 (b)): the 20 `medium` maps are the "W-04 medium seeds" its row names, as
  `ng_faces_by_class.py` input.
- **W-11** (NG rows): `block.countTemplate` and `block.area` at `medium` now have five seeds per template, plus the two of
  2026-09-25. The `small` and `large` maps carry the size sweep (D3). Register the road and footprint layers on
  `gen-0.png` before any pairing (W-11's finding: the two layers sit on separate canvases with an unrecorded offset).
- **W-12**: the block minor extents per template and size come from W-11's faces on these maps.
- **J159 (3) is used up:** 44 of 44 loads, 0 downloads. Any re-recording, any further seed, or a `--regen` run would need
  a new approval. No login, account, payment, terms or consent prompt appeared; the loads ran in fresh headless browser
  profiles with no stored identity.
- **What each load contacted:** the build host `html-classic.itch.zone` (14 requests: the page, its program file, fonts
  and asset files), `static.itch.io` (1 request, itch's embed script) and `itch.io` (1 POST per load, the page's own
  callback ping, answered 204). That is 16 requests per load, 704 in all, every one answered (660 × 200, 44 × 204).

## 6 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read): the build id; the 44 loads and their ledger; every row check and C4–C7 on all 44 folders;
the red test; the mock tests; the doc_checks runs and the drift comparison on two design documents; the census counts of section 3; the disk readings; the request tally; that `profiler/`
is unchanged. PLAUSIBLE (reasoning only): that the recordings equal what a headful load would paint (the 2026-09-25
same-seed check showed the generator is deterministic for a seed, but headless and headful were not compared); that the
census readings of section 3 carry over to W-11's registered faces; that the other eleven volumes see no doc_checks drift
either, as `ARCHITECTURE.md` and V12 do not.
