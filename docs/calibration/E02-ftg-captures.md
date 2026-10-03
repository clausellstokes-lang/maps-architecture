# E02 — FTG's six captures (M-1 work item W-02)

Lane `m1/W-02`, from 2026-10-03, on the owner's Mac. This is a research-side record, and implementer seats do not read
it (`plat/CLEAN-ROOM.md` rule 2). It holds numbers, ids, file paths and our own words; FTG's form labels and request key
names stay in `research/baselines/ftg_capture_checklist.md` and the capture folders (plan-check PC-20). Nothing was
written into `plat/`, and no git command was run. The only third-party contact was owner-approved (J159): one free
temporary settlement a day on FTG's no-account allowance.

**Outcome (day 1 of 6).** The day-1 capture is done and every check of W-02's row passes. Slot 0
(`capture/FTG/BIG_TOWN/none/0`) is `captures/ftg/2026-10-03T17-19-06`: a BIG_TOWN settlement with no coast and rivers
off. It has 1 694 buildings, 3 266 road edges and 3 003 nodes, 25 wall towers, 0 water bodies and 3 districts, on a
4 000 m square. Its population is the nominal 5 600, because the payload carries no resident count. Its
`referenceBuild` is `ftg:2026-10-03+aa8ba6c213b6` (all CONFIRMED by decode). The slot is bound in `plan.json`, and
`plan.py --check` reads SAME. The site showed no consent notice, no login, no account, no payment and no new terms;
nothing was accepted. Five slots remain, one per day from 2026-10-04 (section 5 says how to run day 2).

## 1 What was built

| file | what it is |
|---|---|
| `research/baselines/ftg_capture_checklist.md` | The per-capture checklist, written before the first capture. It covers the six-day slot table; the 2026-09-21 base form values; J159's consent and stop rules; pre-flight; an isolated runner; the form steps with a `text` and a `shot` before every click; the create rule (exactly one hit-testable match inside the dialog); the post-processing; and section G, learned on day 1. |
| `research/baselines/ftg_capture_post.py` | Post-processing of one capture; Python 3.9, standard library plus `tools/pb_raw.py`. It writes the request (pretty-printed), the request diff, the `pb_raw` structure, `capture-facts.json` (numbers and ids only) and the README. It runs 8 checks and exits 0 only when all pass. `--check-only` writes nothing. |
| `captures/ftg/2026-10-03T17-19-06/` | The day-1 capture: `session/` (network index and bodies, console), `steps/` (21 screenshots, `steps.jsonl`), `README.md`, `create-request.json`, `request-diff.txt`, `structure.md`, `capture-facts.json`. |
| `research/baselines/plan.json` | Slot 0 bound by `plan.py --bind-ftg 0=2026-10-03T17-19-06`. Exactly one leaf changed, and `metrics.m-1.json` is byte-unchanged. The file's sha256 moves from `6c81c04b…` (E01) to `45b4b315…`; this is the designed slot lifecycle, and `--check` reads SAME for both files. |

## 2 Day 1 — 2026-10-03, slot 0, BIG_TOWN, `none`

| field (README) | value |
|---|---|
| capture id | `2026-10-03T17-19-06` |
| size / rung | BIG_TOWN / TOWN |
| `WaterSetting` | `none` (the request's coast key empty, rivers false) |
| population, source | 5 600, `nominal` |
| server date; PUT sent | 2026-10-03; 17:23:23.574 UTC (the response date headers read 17:23:25 and 17:23:26 GMT) |
| server time | 2.553 s, from the PUT being sent to the layout GET being sent. **Contended**: M0's build seats shared the machine, so this feeds no time row (plan-check PC-11). |
| buildings | 1 694 |
| request hash | `aa8ba6c213b6`: sha256 of the exact 274 285-byte PUT body |
| `referenceBuild` | `ftg:2026-10-03+aa8ba6c213b6` |
| payload | 396 544 bytes, Fetch-intercepted (`intercept-0049…bin`, sha256 `c71803079feb8e1e…`) |
| road graph | 3 266 edges, 3 003 nodes |
| wall towers / water bodies / districts | 25 / 0 / 3 |
| settlement border | a square with half width 2 000.00 m, which is the size ladder's 4 000 m width |
| capture folder | 65 MB: 20 MB network bodies and 44 MB of screenshots at 2× (no CPU profile). Free disk: 17 GB before, 16 GB after. |

**Form values.** The size was set to the BIG_TOWN option. The water was the site's own default: no coast, rivers off.
The farm box was already on; the forest, reserve-area and wall boxes were switched on. Everything else stayed at FTG's
default presets (layout, building material, races, religions, lifestyle, climate), and the name was left blank. All
settings was never opened (shots 004–012; values verified by `eval` before the create click).

## 3 Checks — W-02's checker column, and further receipts (all executed 2026-10-03, CONFIRMED)

| check | how | result |
|---|---|---|
| the payload decodes: field 3 edges and nodes, field 8 buildings | `python3 tools/pb_raw.py <payload>`: exit 0, 183 field paths | path 3 present, 3.1 × 3 266, 3.2 × 3 003, 8 × 1 694. `structure.md` equals a fresh run apart from its title line. |
| the request's size key equals the slot's | `create-request.json` | BIG_TOWN = slot 0's BIG_TOWN |
| the water keys equal the slot's water option (plan-check PC-16) | the same file | coast key empty and rivers false, as slot `none` requires |
| the README carries §13.6 (2)'s three fields | `grep` of the README for the capture id, `WaterSetting` and population (with its source) | all present (4 of 4 lines) |
| all 8 checks of `ftg_capture_post.py` | `--check-only`: exit 0 | 8 of 8 pass: calls, size key, water keys, request-diff classes, decode, border square, no resident field, `pb_raw` runs |
| the checks discriminate (red tests) | the same capture checked against slot 1 (BIG_CITY) and slot 2 (`coast+river`) | slot 1: exit 1, size and border checks fail. Slot 2: exit 1, the water check fails. |
| the decoder agrees with the documented counts | on the 2026-09-21 and 2026-09-25 CITY payloads | 5 326 edges / 4 303 nodes / 2 798 buildings / 17 towers, and 4 811 / 4 045 / 2 813 / 29. Both borders are ±2 500 m, matching `code-ftg-client.md` §2.1 and the plan. |
| the runner is the profiler's code | `cmp` of the scratchpad copies against `profiler/` | identical: session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…` |
| the slot bind is safe | `plan.py --bind-ftg 0=…`, then `--check` and a JSON diff against the pre-bind copy | one line changed (slot 0's capture). SAME for both files; every seed unchanged. |

## 4 Findings

1. **The size carries eleven hidden values (difference CONFIRMED; cause PLAUSIBLE).** Against the 2026-09-21 CITY base
   request, day 1's request differs in 20 semantic leaves:
   - 3 slot keys: the size, the coast key and the river flag;
   - 6 leaves from one raw-resource entry the water options drop (the fishing one); the list shifts by one;
   - 11 layout-preset values, which no simple-form control sets:
     - stage 1 (5): its two branch-segment counts (4 → 3), spoke probability (0.5 → 0.1), building share (0.2 → 0.1)
       and minimum district area (10 → 6 ha);
     - stage 2 (3): its building share (0.5 → 0.6), minimum district area (7 → 6 ha) and main-road step (60 → 50 m);
     - 3 others: the random-faction count (4 → 3) and two shop probabilities.

   There are also 45 client-random partner ids. The capture changed only the size, the boxes and nothing in the layout
   view (`steps.jsonl`), so the eleven values come with the size choice. Two readings remain: they are the preset's
   values for BIG_TOWN, or the fresh form's initial size left them unchanged. Day 2 (BIG_CITY) decides between these:
   its values should differ from both day 1 and the CITY base if they follow the size. For W-05, these are FTG's
   defaults at that size, not a setting this programme chose. `ftg_capture_post.py` reports them as their own class
   and fails on any other difference.
2. **No resident count (CONFIRMED).** The payload's top-level fields are a subset of the 27-field layout message
   (`research/findings/code-ftg-client.md` §2.1), and none of them is a population. `populationSource` is therefore
   `nominal`, as plan section 8 item 2 expected.
3. **A no-coast, no-river town has no water bodies (CONFIRMED)**: field 6 is absent. The two CITY captures had 4 each.
4. **Same id each time (CONFIRMED).** The guest identity's temporary-settlement id was the same as on 2026-09-21 and
   -25, for the third time. The new settlement replaces the old one under that id.
5. **Window size (CONFIRMED).** The session's 1500×1100 viewport is larger than this Mac's 1440×632 window, so plain
   shots show only the window. `shot --full` clears the viewport emulation, and the form steps then ran at 1440×632,
   where the dialog scrolls. The request and the payload do not depend on the viewport. The overview (shot 014) is the
   full 1500×1100 frame with a 500 m bar; the core (shot 021) has a 250 m bar.
6. **Parallel lanes share the session file (CONFIRMED by reading the tools).** `drive.mjs` and `export.mjs` (without
   `--port`) follow `profiler/.session`, and `session.mjs` defaults to port 9333. The MFCG sweep ran beside this lane
   with the same tools. The FTG session therefore ran from byte-identical copies in the scratchpad, on port 9341, with
   its own session file. The shared file was never written (checked before and after).

## 5 How to run day 2 (BIG_CITY, `none`) tomorrow

Run on 2026-10-04, no earlier than 13:30 EDT (24 hours after day 1's 17:23 UTC create, so the one-a-day allowance
has renewed), from a fresh session.

1. Follow `research/baselines/ftg_capture_checklist.md` from step A1, including section G, with slot **1**.
2. Build the isolated runner (A3) in that session's own scratchpad and `cmp` the copies. Start
   `node <runner>/profiler/session.mjs --target ftg --headful --port 9341`, and drive with a shell function
   (`D() { node <runner>/profiler/drive.mjs "$@"; }`).
3. Take a `text` and a `shot` of the landing page. If today's settlement is shown instead of the create buttons, use
   the map page's create-new control (G7). Click "Create one-time settlement" only when exactly 1 match is hit-testable.
4. In the form, select the size option whose text starts "Big city" (visible select 0). Confirm that the coast select
   reads no coast and that the river box is off and the farm box on. Click the forest box, scroll the dialog
   (`D wheel 720 400 300`), and click the reserve-area and wall boxes at their re-read coordinates. Confirm every box
   by `eval`, with a `text` and a `shot` before each click. Never use `--full` before creating.
5. Click "Create Temporary Settlement" only when exactly 1 hit-testable match lies inside the dialog. Poll the
   network index for the intercepted layout body. Then take the after-create shot, `shot map-overview --full`, two
   zoom-control clicks, and `shot core`. Stop with `D stop` and run `df`.
6. Run `python3 research/baselines/ftg_capture_post.py <stamp> --slot 1 --notes <notes>`; all 8 checks must pass,
   with a border of ±2 750 m. Compare its eleven size-dependent values with day 1's and the CITY base's (finding 1).
   Then run `python3 research/baselines/plan.py --bind-ftg 1=<stamp>` and `--check`. Append a "Day 2" section here
   and an entry to `E02-ftg-captures.json`.
7. If the allowance is refused, run `plan.py --fail-ftg 1=<reason>` and stop. The schedule slides: day 3 retries
   BIG_CITY `none`.

## 6 Calls made under delegated authority (vetoable)

1. **The base for "every other form value".** The site's fresh form has the forest, reserve-area and wall boxes off.
   The plan's base is the 2026-09-21 capture (§2.1: "Walled on"), whose request has all three on, so they were
   switched on. The water options are then the only difference from the CITY captures beyond size, and days 3–6 keep
   the same boxes. The alternative is the fresh-form defaults for all six days; switching to it would change the
   forest and reserve-area land cover and remove the wall.
2. **The isolated runner** (finding 6). It uses byte-identical copies rather than a new tool; the receipts are in
   section 3.
3. **The request-diff check was refined after its first run.** The first run failed it, finding 11 differences beyond
   the size and water. They were examined (finding 1) and named as a class. The check still fails on any difference
   outside the slot keys, the water-implied resources and that class. This is recorded so that a verifier can rule on
   the class.
4. **The overview used `--full`** to get the whole 1500×1100 frame. This cleared the viewport emulation after the
   create click (finding 5).

## 7 Deviations, stated plainly

- The second zoom-control click (step 020) had its own `shot` but reused the `text` reading taken before the first
  one; the control had not moved.
- The first click on the reserve-area box landed on the dialog's padding, because the row was clipped at 1440×632.
  Nothing changed (verified), and the dialog was scrolled before the box was clicked again.
- The `file` paths in `steps.jsonl` and `session.json` name the scratchpad runner. The link resolves them to the
  capture folder.
- Records outside `captures/` now include our own `capture-facts.json` (numbers and ids only) and the capture README.
  `doc_checks.py` reads both as reference corpus, like every capture README. Expect a few phantom C3 hits until
  captures' own record files are excluded, the same fix E01 asks for `research/baselines/`.

## 8 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read) are every number in sections 2 and 3, findings 2–6, and the request's 20 semantic
differences. PLAUSIBLE (reasoning only) are that the eleven layout-preset values follow the chosen size (finding 1;
day 2 tests it), and the 13:30 EDT earliest time for day 2 (the allowance window is not documented, so 24 hours is
the safe reading).
