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

**Update, slot 1 (2026-10-03 22:09 UTC, signed in under J163).** Owner ruling J163 moved slots 1–5 into the owner's
signed-in free account, created the same day one after another (section 9). Slot 1 (`capture/FTG/BIG_CITY/none/0`) is
`captures/ftg/2026-10-03T22-04-25`: a BIG_CITY settlement with no coast and rivers off, 7 164 buildings, 7 236 road edges
and 6 302 nodes, 66 wall towers, 3 water bodies and 5 districts on a 5 500 m square; `referenceBuild`
`ftg:2026-10-03+e2524cd0cb32`. All 10 checks of the revised `ftg_capture_post.py` pass, the slot is bound, and
`plan.py --check` reads SAME (section 10). It settles finding 1: the size-dependent request values follow the size
(CONFIRMED). The free account holds 10 settlements; its counter read 2 / 10 after slot 1.

**Update, slot 2 (2026-10-03 22:23 UTC, signed in under J163).** Slot 2 (`capture/FTG/BIG_TOWN/coast+river/0`) is
`captures/ftg/2026-10-03T22-21-00`: a BIG_TOWN settlement on the coast with rivers on, 1 821 buildings, 4 197 road edges
and 3 558 nodes, 31 wall towers, 3 water bodies and 4 districts on a 4 000 m square; `referenceBuild`
`ftg:2026-10-03+d93631bc2aed`. All 10 checks pass, its 16 size-dependent values equal day 1's, the slot is bound, and
`plan.py --check` reads SAME (section 11). The coastal option brought no new kind of request difference. The account
counter read 3 / 10 after slot 2.

**Update, slot 3 (2026-10-03 22:47 UTC, signed in, the account now premium under J164).** A first attempt stopped
before any create (section 12). The owner then subscribed to FTG premium (J164); the account has unlimited settlements,
and the site's request, form and payload did not change (section 9.3). Slot 3 (`capture/FTG/BIG_CITY/coast+river/0`) is
`captures/ftg/2026-10-03T22-43-28`: a BIG_CITY settlement on the coast with rivers on, 7 342 buildings, 11 121 road
edges and 8 400 nodes, 40 wall towers, 4 water bodies and 4 districts on a 5 500 m square; `referenceBuild`
`ftg:2026-10-03+0b64eaef3fe5`. All 10 checks pass, its 16 size-dependent values equal slot 1's, the slot is bound, and
`plan.py --check` reads SAME (section 13). The account list held 3 settlements before and 4 after.

**Update, slot 4 (2026-10-03 23:00 UTC, signed in, premium since J164).** Slot 4 (`capture/FTG/BIG_TOWN/coast+river/1`)
is `captures/ftg/2026-10-03T22-57-34`: a BIG_TOWN settlement on the coast with rivers on, 1 880 buildings, 4 215 road
edges and 3 571 nodes, 22 wall towers, 4 water bodies and 4 districts on a 4 000 m square; `referenceBuild`
`ftg:2026-10-03+2473a617654e`. All 10 checks pass, its 16 size-dependent values equal day 1's, the slot is bound, and
`plan.py --check` reads SAME (section 14). Its request equals slot 2's in every value apart from the 45 client-random
ids, yet the settlement differs: the form's settings do not fix the result (CONFIRMED), and the server's own seed is the
PLAUSIBLE source (section 14.3). The account list held 4 settlements before
and 5 after. One slot remains (slot 5, BIG_CITY, `coast+river`).

**Update, slot 5 (2026-10-03 23:13 UTC, signed in, premium since J164): programme 1 is complete.** Slot 5
(`capture/FTG/BIG_CITY/coast+river/1`) is `captures/ftg/2026-10-03T23-10-37`: a BIG_CITY settlement on the coast with
rivers on, 7 270 buildings, 10 164 road edges and 7 984 nodes, 49 wall towers, 3 water bodies and 4 districts on a
5 500 m square; `referenceBuild` `ftg:2026-10-03+101a10861aae`. All 10 checks pass, its 16 size-dependent values equal
slot 1's, the slot is bound, and `plan.py --check` reads SAME (section 15). Its request equals slot 3's apart from the 45
client-random ids, yet the city differs, as slot 4 found for the town (CONFIRMED). The account list held 5 settlements
before and 6 after. All six slots of programme 1 (0–5) are now bound.

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
   and fails on any other difference. **Resolved by slot 1 (section 10.3): they follow the size, CONFIRMED; the class
   is now 16 named leaves.**
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

*Superseded on 2026-10-03 by J163: slots 1–5 are created signed in, the same day (section 9; checklist section H). Kept
as the guest procedure in case the account route closes.*

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

## 9 Signed-in captures (J163)

Owner ruling J163 (2026-10-03, about 18:30 EDT): the five remaining slots are created today, one after another, in the
owner's signed-in free account (the persistent profile `profiler/.profiles/ftg`), replacing J159's "no account" rule
for FTG only. The seats never upgrade, pay, sign out, change settings, delete, rename or share. The account's name,
email, ids, tokens and cookies appear in no file outside `captures/`; this record says only "the owner's signed-in free
account". Lane `m1/W-02-slot1` (the first signed-in seat) read the site before creating anything (session
`2026-10-03T22-04-25`, shots 001–003; read only).

### 9.1 What the signed-in site shows before a create (read 2026-10-03 22:05 UTC, CONFIRMED)

| | day 1 (guest, no account) | signed in (J163) |
|---|---|---|
| landing page | the no-account block with the button "Create one-time settlement" | that block is gone: a "Signed in as …" line (the display name, not recorded), "Sign out" and "Home"; the membership text below; no consent notice |
| where a create starts | the landing button opens the temporary-settlement page | "Home" opens the account's settlements view (`/user/settlements`), which holds the button **"New Settlement"** (beside "New Folder") |
| settlements kept | one temporary settlement per identity, replaced by the next, deleted after 24 hours | kept in the account until deleted, up to the limit |

**The free account's limit, as the site states it.** The landing page's membership section: "Free accounts have a limit
of 10 settlements, which will not be deleted." The settlements view shows a counter, which read **1 / 10** before this
run: the account already held one settlement (a big town, not under day 1's temporary id). Nine creates remain, so the
five slots fit (1 + 5 = 6 of 10) and the run is not limited by the account.

**The account list carries a population (CONFIRMED; meaning PLAUSIBLE).** The settlements view loads
`GET …/prod/settlements`, whose rows hold an id, a name, a folder path, a population and the size key. The existing big
town lists 5 769 people, where the size ladder's nominal value is 5 600. The layout payload has no resident count (section
4, finding 2), so this list is the first place a per-settlement population appears. Whether it is the generated resident
count is PLAUSIBLE only. The capture rows keep `populationSource: nominal` (plan section 2.1) until a ruling, and each
signed-in slot records its listed population beside the nominal one.

### 9.2 The signed-in create flow and where the payload arrives (slot 1, CONFIRMED)

| | day 1 (guest) | signed in (slot 1) |
|---|---|---|
| the create control | "Create one-time settlement" on the landing page opens the temporary-settlement page and its dialog "Create Temporary Settlement" | "New Settlement" on the settlements view opens the dialog **"Create New Settlement"** over that view |
| the form | name, size, layout preset, building material, races, religions, lifestyle, climate, coast, then the river, farm, forest, reserve-area and wall boxes | the same fields in the same order, at the same coordinates in the 1440×632 window; the size opens at "Town (~4000 people)"; the premium size is listed but disabled; the boxes open as on day 1 (farms on, the rest off) |
| the create button | "Create Temporary Settlement" | **"Create Settlement"**, inside the dialog; it was the only hit-testable match |
| the request | `PUT …/prod/settlements`, a JSON body, an authorization header | the same path and the same top-level body keys: the body holds no account field. The recorder redacts the authorization header in both. |
| the payload | `GET …/prod/settlements/<id>/layout?asPublic=false`, Fetch-intercepted by the session's `*execute-api*` pattern | the same |
| after the create | the map at `/temporary-settlement`; the new settlement replaces the guest's previous one | the map at `/user/settlements/<id>`; the account list gains one entry (counter 1 / 10 → 2 / 10) |

The map page's toolbar puts a logout button and a re-roll button (a new generation with the previous settings) beside the
home link. Neither may be clicked: logout would end the owner's session, and a re-roll would make a second settlement.
Checklist section H gives the signed-in steps for slots 2–5.

### 9.3 After the owner's premium subscription (J164; read 2026-10-03 22:43–22:45 UTC by lane `m1/W-02-slot3b`, CONFIRMED)

The owner subscribed to FTG premium between slot 3's stopped attempt and its retry, and signed out and back in (J164,
about 18:50 EDT). The retry seat read the site before creating anything (session `2026-10-03T22-43-28`, shots 001–005;
read only). The hard limits did not change, and no premium-only option was used: the plan names none for any slot.

| | free account (slots 1, 2) | premium (slot 3 on) |
|---|---|---|
| landing page | "Signed in as …", "Sign out", "Home", the membership text | the same lines, no consent notice; the membership text still lists the free tier's limit and, for premium, "Unlimited settlements" |
| settlements view | the list, "New Folder", "New Settlement" and a counter `N / 10` | the same list and buttons; **no counter**; one more header icon, "Premium Settings" (never clicked) |
| the create form | the dialog "Create New Settlement"; the premium size listed but disabled | the same dialog, fields, defaults and coordinates; the premium size is **enabled** (not touched); nothing new in the simple form |
| the create button and the wire | "Create Settlement"; `PUT …/prod/settlements`; the layout GET intercepted | the same; the request has the same 26 top-level keys as slots 1 and 2 and no difference from the base outside the named classes (`other` 0) |

**The account's limit, as the site states it.** For premium, the landing's membership section says "Unlimited
settlements". The settlements view shows no counter any more, so a seat counts the account's settlements from the list
read (`GET …/prod/settlements`, rows counted, numbers only). Before slot 3 the list held 3 rows (big town, big city, big
town: the earlier settlement and slots 1 and 2), so the remaining three slots are not limited by the account.

## 10 Slot 1 (signed in) — 2026-10-03, BIG_CITY, `none`

Lane `m1/W-02-slot1`. One settlement was created; the create click was the only one.

### 10.1 The capture

| field (README) | value |
|---|---|
| capture id | `2026-10-03T22-04-25` |
| account | the owner's signed-in free account (J163); counter 1 / 10 before, 2 / 10 after |
| size / rung | BIG_CITY / CITY |
| `WaterSetting` | `none` (the request's coast key empty, rivers false) |
| population, source | 24 500, `nominal`. The account list gives 24 367 (section 9.1; recorded, not used). |
| server date; PUT sent | 2026-10-03; 22:09:28.207 UTC (the response date headers read 22:09:33 and 22:09:34 GMT) |
| server time | 5.656 s, from the PUT being sent to the layout GET being sent. **Contended**: M0's build seats shared the machine, so this feeds no time row (plan-check PC-11). |
| buildings | 7 164 |
| request hash | `e2524cd0cb32`: sha256 of the exact 274 288-byte PUT body |
| `referenceBuild` | `ftg:2026-10-03+e2524cd0cb32` |
| payload | 1 126 607 bytes, Fetch-intercepted (`intercept-0043…bin`, sha256 `2dd5f7badbdebe50…`) |
| road graph | 7 236 edges, 6 302 nodes |
| wall towers / water bodies / districts | 66 / 3 / 5 |
| settlement border | a square with half width 2 750.00 m, the size ladder's 5 500 m width |
| capture folder | 45 MB: 13 MB of session recording and 32 MB of screenshots at 2× (no CPU profile). Free disk: 12 GB before and after. |

**Form values.** The size was set to the BIG_CITY option. The water was the form's own default: no coast, rivers off.
The farm box was already on; the forest, reserve-area and wall boxes were switched on. Everything else stayed at FTG's
default presets, and the name was left blank. All settings was never opened (shots 005–012; values verified by `eval`
before the create click). Every click had a `text` and a `shot` reading before it (`steps/steps.jsonl`, 19 shots).

### 10.2 Checks (all executed 2026-10-03, CONFIRMED)

| check | how | result |
|---|---|---|
| all checks of the revised `ftg_capture_post.py` | `--slot 1 --signed-in`, `--check-only` first, then the writing run: exit 0 both times | 10 of 10 pass: calls, size key, water keys, the request diff against the base, the diff against slot 0, the same-size values (vacuous: the first BIG_CITY), decode, border, no resident field, `pb_raw` runs |
| the payload decodes: field 3 edges and nodes, field 8 buildings | `python3 tools/pb_raw.py <payload>`: exit 0, 187 field paths | 3.1 × 7 236, 3.2 × 6 302, 8 × 7 164. `structure.md` equals a fresh run apart from its trailing newline. |
| the request's size key and water keys equal the slot's (PC-16) | `create-request.json` | BIG_CITY; coast key empty and rivers false |
| the request differs from day 1's only by the size | a leaf diff of the two requests | 15 semantic differences: the size key and 14 named size-dependent values; plus 45 client-random partner ids. Nothing else. |
| the checks discriminate (red tests) | the module run with altered inputs, `--check-only` | slot 1's capture as slot 0: exit 1 (size key, border). As slot 2: exit 1 (size key, water keys, same-size, border). A base request with one unnamed stage value planted: exit 1 (request diff); the old prefix rule would have passed it. A plan copy that labels day 1 BIG_CITY: exit 1 (same-size: 14 values moved). Day 1 as slot 0 under the revised script: exit 0. |
| the runner is the profiler's code | `cmp` of the scratchpad copies against `profiler/` | identical: session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…`, package.json `25e7d362…`, lib/instrument.js `cca253ac…` |
| the slot bind is safe | `plan.py --bind-ftg 1=…`, then `--check` and a diff against the pre-bind copy | one line changed (slot 1's capture); SAME for both files; `metrics.m-1.json` byte-unchanged. `plan.json` sha256 moves from `45b4b315…` to `9b89d82e…` (the designed slot lifecycle). |
| no account identifier in the files written | grep of the README, `capture-facts.json`, `create-request.json`, `request-diff.txt`, `structure.md`, `steps.jsonl` for an email pattern, the display name, a token prefix and a full id | none. The 45 full ids in `create-request.json` are the client-random partner ids, as on day 1. |

### 10.3 Findings

1. **The size-dependent values follow the size (CONFIRMED; settles finding 1).** Day 1 and slot 1 took the same form
   steps apart from the size option: both forms opened at the same size and defaults, the same three boxes were
   switched on, and All settings stayed closed. Their requests differ in the size key, 14 layout-preset values and the
   random partner ids, and in nothing else. So these values come with the size choice. The client also recomputes the
   religious-workers share from the size while that setting is at its default, "based on size" (read in the client
   bundle in this capture; research-side). Five values that are equal at CITY and BIG_TOWN differ at BIG_CITY, so the
   class grows from eleven to **16 named values**:

   | value | CITY (2026-09-21 base) | BIG_TOWN (day 1) | BIG_CITY (slot 1) | in the class since |
   |---|---|---|---|---|
   | stage 1: branch segments, first direction | 4 | 3 | 4 | day 1 |
   | stage 1: branch segments, second direction | 4 | 3 | 4 | day 1 |
   | stage 1: minimum district area (ha) | 10 | 6 | 10 | day 1 |
   | stage 1: building share | 0.2 | 0.1 | 0.2 | day 1 |
   | stage 1: spoke probability | 0.5 | 0.1 | 0.3 | day 1 |
   | stage 1: most spokes | 1 | 1 | 2 | slot 1 |
   | stage 1: main-road step (m) | 50 | 50 | 70 | slot 1 |
   | stage 2: branch segments, first direction | 3 | 3 | 5 | slot 1 |
   | stage 2: branch segments, second direction | 3 | 3 | 5 | slot 1 |
   | stage 2: minimum district area (ha) | 7 | 6 | 10 | day 1 |
   | stage 2: building share | 0.5 | 0.6 | 0.6 | day 1 |
   | stage 2: main-road step (m) | 60 | 50 | 50 | day 1 |
   | random-faction count | 4 | 3 | 5 | day 1 |
   | shop probability, inside the settlement | 0.1 | 0.4 | 0.1 | day 1 |
   | shop probability, outside the settlement | 0.5 | 0.4 | 0.5 | day 1 |
   | religious-workers share | 0.01 | 0.01 | 0.005 | slot 1 |

   For W-05b these are FTG's defaults at each size, not settings this programme chose. The BIG_CITY row differs from
   the recorded CITY family's 2026-09-21 base in ten of these values. Every later BIG_CITY slot must repeat slot 1's
   values exactly, and every BIG_TOWN slot must repeat day 1's (the new same-size check).
2. **The account list carries a population (CONFIRMED; meaning PLAUSIBLE).** Slot 1 lists 24 367 people against the
   nominal 24 500, and the earlier big town lists 5 769 against 5 600. The rows keep `populationSource: nominal` (plan
   section 2.1) until a ruling. A seat ruling for W-05b could adopt the listed figure as a recorded resident count.
3. **A city with no coast and no river has 3 water bodies (CONFIRMED; nature PLAUSIBLE).** Field 6 occurs 3 times,
   where day 1's town had none. The overview (shot 013) shows small ponds in the countryside, so field 6 PLAUSIBLY
   holds ponds that do not depend on the water options.
4. **Signing in changes nothing on the wire that the tools read (CONFIRMED).** The request path, the body's keys and
   the layout call are the guest flow's (section 9.2). The intercept pattern, `ftg_capture_post.py`'s call matching
   and the decode needed no change; only the README's wording for the settlement id did.

### 10.4 Calls made under delegated authority (vetoable)

1. **The size-dependent class is pinned by name and widened to 16 values** (R-24 asked for it pinned to the named
   leaves). The old rule accepted any stage value by prefix, which was the verifier's weakness; the new rule names 16
   leaves and fails on any other (red test above). The five additions rest on the controlled comparison in finding 1.
   Two checks are new: the diff against slot 0 must stay within the same classes, and a later slot of a size already
   captured must repeat that size's values exactly. The alternative is the eleven leaves only, with BIG_CITY slots
   failing on five values that the size sets.
2. **`--signed-in` and the listed population** were added to `ftg_capture_post.py`. They change the README's id line
   and record the listed figure as a number. They change no check.
3. **One `--full` shot before the form** (shot 003, the settlements view). Checklist G1 advises against it; it was taken
   so that the counter and the create control were on record whole. It cleared the viewport emulation, so the form ran
   in the 1440×632 window, as on day 1. One dialog scroll handled the clipped rows, and no click missed.
4. **A second visit to the settlements view after the create** (one navigation click) read the counter and the listed
   population. It changed nothing.
5. **`text` readings were printed through a redacting filter and not saved** (the display name and email patterns
   replaced). This departs from checklist A4's scratch files, so that no account identifier lands in any file.

### 10.5 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read) are every number in sections 9.1, 9.2, 10.1 and 10.2, finding 1's controlled
comparison and its 16-value table, the client's size rule for the religious-workers share (read in the bundle), the
listed populations, and finding 4. PLAUSIBLE (reasoning only) are that the listed population is the generated
resident count, and that the 3 water bodies are ponds independent of the water options.

## 11 Slot 2 (signed in) — 2026-10-03, BIG_TOWN, `coast+river`

Lane `m1/W-02-slot2`. One settlement was created, with one create click, by checklist section H.

### 11.1 The capture

| field (README) | value |
|---|---|
| capture id | `2026-10-03T22-21-00` |
| account | the owner's signed-in free account (J163); counter 2 / 10 before, 3 / 10 after |
| size / rung | BIG_TOWN / TOWN |
| `WaterSetting` | `coast+river` (the request's coast key coastal, rivers true) |
| population, source | 5 600, `nominal`. The account list gives 5 906 (section 9.1; recorded, not used). |
| server date; PUT sent | 2026-10-03; 22:23:04.074 UTC (the response date headers read 22:23:05 and 22:23:06 GMT) |
| server time | 1.869 s, from the PUT being sent to the layout GET being sent. **Contended**: M0's build seats shared the machine, so this feeds no time row (plan-check PC-11). |
| buildings | 1 821 |
| request hash | `d93631bc2aed`: sha256 of the exact 274 296-byte PUT body |
| `referenceBuild` | `ftg:2026-10-03+d93631bc2aed` |
| payload | 419 570 bytes, Fetch-intercepted (`intercept-0035…bin`, sha256 `51a36d0994d7c956…`) |
| road graph | 4 197 edges, 3 558 nodes |
| wall towers / water bodies / districts | 31 / 3 / 4 |
| settlement border | a square with half width 2 000.00 m, the size ladder's 4 000 m width |
| capture folder | 37 MB: 12 MB of session recording and 25 MB of screenshots at 2× (no CPU profile). Free disk: 12 GB before and after. |

**Form values.** The size was set to the BIG_TOWN option and the coast select to the coastal option. The river,
forest, reserve-area and wall boxes were switched on; the farm box was already on. Everything else stayed at FTG's
default presets, and the name was left blank. All settings was never opened (shots 005–013; values verified by `eval`
before the create click). Every click and select had a `text` and a `shot` reading before it (`steps/steps.jsonl`, 21
shots). The map (shot 015, 500 m bar) shows the coast to the north, a river through the walled core and a harbour; the
core shot (019) has a 250 m bar.

### 11.2 Checks (all executed 2026-10-03, CONFIRMED)

| check | how | result |
|---|---|---|
| all checks of `ftg_capture_post.py` | `--slot 2 --signed-in`, `--check-only` first, then the writing run: exit 0 both times | 10 of 10 pass: calls, size key, water keys, the request diff against the base, the diff against slot 0, the same-size values (16 of 16 equal day 1's), decode, border, no resident field, `pb_raw` runs |
| the payload decodes: field 3 edges and nodes, field 8 buildings | `python3 tools/pb_raw.py <payload>`: exit 0, 188 field paths | 3.1 × 4 197, 3.2 × 3 558, 8 × 1 821. `structure.md` equals a fresh run apart from its trailing newline. |
| the request's size key and water keys equal the slot's (PC-16) | `create-request.json` | BIG_TOWN; coast key coastal and rivers true |
| the request hash | sha256 of the PUT row's body, recomputed outside the script | `d93631bc2aed`, 274 296 bytes; `create-request.json` parses equal to the body |
| the request differs from day 1's only by the water options | a leaf diff of the two requests | 8 semantic differences: the 2 water keys and 6 leaves of one raw-resource entry the water options add (the list shifts by one); 0 size-dependent; plus 45 client-random partner ids. Nothing else. |
| the checks discriminate (red tests) | the same capture checked as other slots, `--check-only` | as slot 0 (BIG_TOWN, `none`): exit 1 (water keys). As slot 1 (BIG_CITY, `none`): exit 1 (size key, water keys, border). As slot 3 (BIG_CITY, `coast+river`): exit 1 (size key, same-size, border). |
| the runner is the profiler's code | `cmp` of the scratchpad copies (slot 1's runner, reused) against `profiler/` before the start | identical: session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…`, package.json `25e7d362…`, lib/instrument.js `cca253ac…`; port 9341; no FTG process and no `Singleton*` file before; `session closed` and no `Singleton*` file after; the shared `profiler/.session` absent before and after |
| the slot bind is safe | `plan.py --bind-ftg 2=…`, then `--check` and a diff against the pre-bind copy | one line changed (slot 2's capture); SAME for both files; `metrics.m-1.json` byte-unchanged (`7a21bb29…`). `plan.json` sha256 moves from `9b89d82e…` to `f41df82b…` (the designed slot lifecycle). |
| no account identifier in the files written | grep of the README, `capture-facts.json`, `create-request.json`, `request-diff.txt`, `structure.md`, `steps.jsonl`, this section, the JSON entry, the result file and this lane's `lane-events.log` lines for an email pattern, the display name, a token prefix and a full id | no email, display name or token prefix anywhere. Full ids: `create-request.json` holds only the 45 client partner ids. `steps.jsonl` (written by `drive.mjs` itself) holds the new settlement's full id in its map-page addresses and the scratchpad's session folder name; neither is an account id, and slot 1's `steps.jsonl` holds the same two kinds. Every record written by hand keeps the first 8 hex. |

### 11.3 Findings

1. **The coastal option brings no new kind of difference (CONFIRMED).** Day 1 and slot 2 took the same form steps
   apart from the coast select and the river box. Their requests differ in the two water keys and in the raw-resource
   entry the water options add back (the fishing one, 6 leaves), and in nothing else. All 16 size-dependent values
   equal day 1's, so the class needed no change (checklist H10).
2. **The 2026-09-21 base was itself coastal with rivers on (CONFIRMED).** Against the base, slot 2's request differs
   only in the size key and the 11 BIG_TOWN size-dependent values: 0 water keys, 0 water-implied entries. Slots 2–5
   therefore carry the base's water options, and only slots 0 and 1 moved them away from it.
3. **Three water bodies again, but of another shape (count CONFIRMED; reading PLAUSIBLE).** Field 6 occurs 3 times, as
   in slot 1. Here one polygon has 9 points within 330 m of the centre, and two have 97 and 94 points and reach the
   border at 2 000 m. Slot 1's three had 25–27 points each and stayed inside the border. So the count of field 6 does
   not tell the water options apart. The two border-reaching polygons are PLAUSIBLY the sea and the river, and slot 1's
   three PLAUSIBLY ponds (section 10.3 finding 3).
4. **The listed population again differs from the nominal one (CONFIRMED; meaning PLAUSIBLE).** Slot 2 lists 5 906
   people against the nominal 5 600. The row keeps `populationSource: nominal` until the ruling slot 1 asked for.

### 11.4 Calls and deviations

1. **No deviation from checklist section H.** The `--full` shot of the settlements view (003) was taken as H3
   prescribes; the form and the map then ran in the 1440×632 window. Every box click landed (checked by `eval`).
2. **The overview `--full` shot (016) shows the scale bar without its label.** Shot 015, the same view, carries the
   500 m label.
3. **The red tests relabel the slot only.** `ftg_capture_post.py` is unchanged since slot 1, so slot 1's planted-input
   tests still stand for its logic.

### 11.5 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read) are every number in sections 11.1 and 11.2, findings 1 and 2, the field-6 count and
shapes, and the listed population. PLAUSIBLE (reasoning only) are what the three field-6 polygons are, and that the
listed population is the generated resident count.

## 12 Slot 3 (signed in) — 2026-10-03, BIG_CITY, `coast+river`: STOPPED, nothing created

Lane `m1/W-02-slot3`. **No settlement was created; slot 3 stays open** (`plan.json` unchanged, not marked failed).
The attempt's folder is `captures/ftg/2026-10-03T22-29-23` (its README gives the timeline; it is not a capture).

**What stopped it (CONFIRMED by the shots, `steps.jsonl` and the network index).** The seat set the size to the
BIG_CITY option, the coast to the coastal option and the river and forest boxes on, each step with a reading and a shot
before it, and scrolled the dialog (22:30:38–22:31:13 UTC). Between 22:31:13 and 22:31:16, with no command from the
seat, the create dialog closed. The next shots show the pointer over the site's logout control (22:31:17) and then
over its settings control (22:31:19), where the seat's driver had not moved it. Then the account's settings page
opened, then the site's Patreon link: Patreon's membership page (a payment page), its checkout and login pages, and a
Google sign-in page twice (22:31:28–22:32:02), then back to the account's list (22:32:31). The seat clicked none of
these. It took a stop shot (013, the payment page) and stopped the session (`session closed` by 22:32:55; no
`Singleton*` file; the shared `profiler/.session` absent before and after).

**Effects, checked in the recording (CONFIRMED).** The network index holds no create call. After 22:31 the only calls
to the site's account service are reads: the settings page's user read, and the list read, which still lists 3
settlements (BIG_CITY 1, BIG_TOWN 2), as before the run. No settings write was sent. The recording holds the
sign-in pages' traffic. It stays local under `captures/`, which git ignores, and it is not quoted here.

**The seat's own error (stated plainly).** Two box clicks (22:31:18 and 22:31:20) were each sent in the same shell
command as the reading before them, so neither reading was checked before its click. Both readings already showed the
dialog gone. Both clicks fell on blank page area below the list: shots 011 and 012 show nothing at those points
(CONFIRMED). No request followed the first click. The settings page loaded 1.2 s after the second click, but shot 012
had already shown the pointer resting on the settings control, 1.3 s before that click. So that navigation is
PLAUSIBLY (strongly) the other user's, not the seat's. No harm followed, but the rule "a reading before every click"
was met in form only.
Checklist H12 now requires a guarded click: `elementFromPoint` must name the expected control in the same step.

**Who used the window is unknown.** It may have been the owner at the Mac, since the session's window is headful
and visible, or another program. A retry needs the owner's word that the window will be left alone while a seat runs.
The account counter is 3 / 10, so a retry fits.

## 13 Slot 3 (signed in) — 2026-10-03, BIG_CITY, `coast+river`

Lane `m1/W-02-slot3b`, the retry of section 12's stopped attempt, after the owner's premium subscription (J164; section
9.3). One settlement was created, with one create click, by checklist section H with H12's guarded clicks. Before the
create, the account list held no slot-3 settlement (3 rows, as after slot 2). Section 12's attempt folder
`captures/ftg/2026-10-03T22-29-23` is no longer on disk: someone other than a capture seat removed it between 18:37 and
18:41 EDT (observed by lane `m1/W-02-signed-in-verify`; this seat found it absent at 18:42). Section 12 and the JSON
`stoppedAttempts` entry stand as its record. J164, as the session relays it, says the owner used the window during that
attempt to subscribe. That accounts for section 12's other hand.

### 13.1 The capture

| field (README) | value |
|---|---|
| capture id | `2026-10-03T22-43-28` |
| account | the owner's signed-in account, premium since J164; the list held 3 settlements before and 4 after (no counter any more) |
| size / rung | BIG_CITY / CITY |
| `WaterSetting` | `coast+river` (the request's coast key coastal, rivers true) |
| population, source | 24 500, `nominal`. The account list gives 24 755 (section 9.1; recorded, not used). |
| server date; PUT sent | 2026-10-03; 22:47:11.141 UTC (the response date headers read 22:47:17 and 22:47:18 GMT) |
| server time | 6.298 s, from the PUT being sent to the layout GET being sent. **Contended**: M0's build seats shared the machine, so this feeds no time row (plan-check PC-11). |
| buildings | 7 342 |
| request hash | `0b64eaef3fe5`: sha256 of the exact 274 299-byte PUT body |
| `referenceBuild` | `ftg:2026-10-03+0b64eaef3fe5` |
| payload | 1 259 943 bytes, Fetch-intercepted (`intercept-0035…bin`, sha256 `a1c9606a34d8a322…`) |
| road graph | 11 121 edges, 8 400 nodes |
| wall towers / water bodies / districts | 40 / 4 / 4 |
| settlement border | a square with half width 2 750.00 m, the size ladder's 5 500 m width |
| capture folder | 38 MB: 13 MB of session recording and 25 MB of screenshots at 2× (no CPU profile). Free disk: 12 GB before and after. |

**Form values.** The size was set to the BIG_CITY option and the coast select to the coastal option. The river,
forest, reserve-area and wall boxes were switched on; the farm box was already on. Everything else stayed at FTG's
default presets, and the name was left blank. All settings was never opened, and the premium size was not touched
(shots 005–013; values verified by `eval` before the create click). Every click and select was its own command, after a
`text` and a `shot`; every coordinate click also had an `elementFromPoint` reading naming its control, and a form-state
reading after each step showed the dialog still open (`steps/steps.jsonl`, 21 shots). The map (shot 015, 500 m bar)
shows the sea to the west, a river reaching the coast south of the city and a harbour quarter. The core shot (019) has
a 250 m bar.

### 13.2 Checks (all executed 2026-10-03, CONFIRMED)

| check | how | result |
|---|---|---|
| all checks of `ftg_capture_post.py` | `--slot 3 --signed-in --premium`, `--check-only` first, then the writing run: exit 0 both times | 10 of 10 pass: calls, size key, water keys, the request diff against the base, the diff against slot 0, the same-size values (16 of 16 equal slot 1's), decode, border, no resident field, `pb_raw` runs |
| the payload decodes: field 3 edges and nodes, field 8 buildings | `python3 tools/pb_raw.py <payload>`, and a separate walk with `pb_raw.parse` | exit 0, 177 distinct field paths; 3.1 × 11 121, 3.2 × 8 400, 8 × 7 342, 7 × 40, 6 × 4, 10 × 4 by both. `structure.md` equals a fresh run apart from its title line and trailing newline. |
| the request's size key and water keys equal the slot's (PC-16) | `create-request.json` | BIG_CITY; coast key coastal and rivers true |
| the request hash | sha256 of the PUT row's body, recomputed outside the script | `0b64eaef3fe5`, 274 299 bytes; exactly one PUT row with a body in the recording |
| the request differs from slot 1's only by the water options | a leaf diff of the two requests | 8 semantic differences: the 2 water keys and 6 leaves of the raw-resource entry the water options add (the list shifts by one); plus 45 client-random partner ids. Nothing else. |
| the request differs from slot 2's only by the size | a leaf diff of the two requests | 15 semantic differences: the size key and 14 named size-dependent values (the two that are equal at BIG_TOWN and BIG_CITY stay equal); plus 45 partner ids. Nothing else. Both requests have the same 26 top-level keys. |
| the checks discriminate (red tests) | the same capture checked as other slots, `--check-only` | as slot 0 (BIG_TOWN, `none`): exit 1 (size key, water keys, border). As slot 1 (BIG_CITY, `none`): exit 1 (water keys). As slot 2 (BIG_TOWN, `coast+river`): exit 1 (size key, same-size, border). |
| the `--premium` flag changes wording only | the script before the flag (a scratch copy) and after it, `--check-only` on slots 0–3 without the flag | outputs identical except the `pb_raw` receipt's own file path (the scratch copy's root); with the flag only the account line changes |
| the runner is the profiler's code | `cmp` of the scratchpad copies against `profiler/` before the start | identical: session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…`, package.json `25e7d362…`, lib/instrument.js `cca253ac…`; port 9341; no FTG process and no `Singleton*` file before; `session closed` and no `Singleton*` file after; the shared `profiler/.session` absent before and after |
| only the seat used the window | the recording's hosts, documents and writes | one document load (the landing); hosts: the site, its API, analytics, error reporting and fonts only; exactly one write to the site's API (the create); no page outside the site |
| the slot bind is safe | `plan.py --bind-ftg 3=…`, then `--check` and a diff against the pre-bind copy | one line changed (slot 3's capture); SAME for both files; `metrics.m-1.json` byte-unchanged (`7a21bb29…`). `plan.json` sha256 moves from `f41df82b…` to `811ae576…` (the designed slot lifecycle). |
| no account identifier in the files written | grep of the README, `capture-facts.json`, `create-request.json`, `request-diff.txt`, `structure.md`, `steps.jsonl`, this section, section 9.3, the JSON entry, checklist H13, the result file and this lane's `lane-events.log` lines for an email pattern, the display name, a token prefix and a full id | see the result file's privacy row (the same two kinds of full id in `steps.jsonl` as in slots 1 and 2: the new settlement's id in the map-page address and the scratchpad's session folder name; neither is an account id) |

### 13.3 Findings

1. **Premium changed nothing that the tools read (CONFIRMED).** The form, the create call, the request's keys and the
   layout call are those of slots 1 and 2 (section 9.3). Against slot 1 the request differs only by the water options,
   against slot 2 only by the size, and its 16 size-dependent values equal slot 1's. The checks needed no change; only
   the README's account wording did (`--premium`).
2. **The coastal option again brings no new kind of difference (CONFIRMED).** As in slot 2, it adds the water keys and
   the water-implied resource entry only.
3. **Four water bodies (count CONFIRMED; reading PLAUSIBLE).** Field 6 occurs 4 times: one polygon of 7 points within
   268 m of the centre, and three of 121, 129 and 132 points that reach the 2 750 m border. Shot 015 shows the sea and
   a river that forks south of the city. So the three border-reaching polygons are PLAUSIBLY the sea and two river
   branches. The small one is PLAUSIBLY of the same kind as slot 2's 9-point polygon near the centre.
4. **The road graph is much larger than slot 1's (CONFIRMED; cause not read).** Against slot 1 (the same size, no
   water): 11 121 against 7 236 edges and 8 400 against 6 302 nodes, but 7 342 against 7 164 buildings. Wall towers
   are 40 against 66, and districts 4 against 5. These are one sample in each cell, so no reading is drawn.
5. **Fewer distinct field paths (CONFIRMED).** The payload has 177 field paths, against 187 (slot 1) and 188 (slot 2).
   All 177 occur in both earlier payloads. The missing ones are optional parts of field 11, the decorations message
   (`research/findings/code-ftg-client.md` section 2.1). No check reads field 11.
6. **The listed population again differs from the nominal one (CONFIRMED; meaning PLAUSIBLE).** Slot 3 lists 24 755
   people against the nominal 24 500 (slot 1: 24 367). The row keeps `populationSource: nominal` until the ruling slot
   1 asked for.

### 13.4 Calls and deviations (vetoable)

1. **`ftg_capture_post.py` gained `--premium`** (with `--signed-in`). It changes the account wording in
   `capture-facts.json` and the README ("signed-in account, premium since J164" instead of "signed-in free account"),
   so the record does not call a premium account free. It changes no check (13.2). The alternative was the old wording
   with a correction in the notes.
2. **Settlements counted from the list read, not the counter.** The premium view has no counter, so H3's `N / 10`
   reading and its 10 / 10 stop were replaced by counting the list's rows before and after (checklist H13).
3. **No deviation from checklist section H otherwise.** The `--full` shot of the settlements view (003) was taken as
   H3 prescribes. The overview `--full` shot (016) again shows the scale bar without its label, as in slot 2; shot 015,
   the same view, carries the 500 m label.

### 13.5 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read) are every number in sections 9.3, 13.1 and 13.2, findings 1, 2 and 5, the counts in
findings 3 and 4, and the listed population. PLAUSIBLE (reasoning only) are what the four field-6 polygons are, and that
the listed population is the generated resident count. J164's account of section 12's other hand is the owner's, as
the session relays it; this seat did not observe it.

## 14 Slot 4 (signed in) — 2026-10-03, BIG_TOWN, `coast+river`

Lane `m1/W-02-slot4b`. One settlement was created, with one create click, by checklist section H with H12's guarded
clicks and H13's list count. Before the create, the capture folders ended at slot 3's, slot 4 was unbound, and the
account list held 4 settlements (big town 2, big city 2: the earlier settlement and slots 1 to 3), so no slot-4
settlement existed.

### 14.1 The capture

| field (README) | value |
|---|---|
| capture id | `2026-10-03T22-57-34` |
| account | the owner's signed-in account, premium since J164; the list held 4 settlements before and 5 after (no counter) |
| size / rung | BIG_TOWN / TOWN |
| `WaterSetting` | `coast+river` (the request's coast key coastal, rivers true) |
| population, source | 5 600, `nominal`. The account list gives 6 221 (section 9.1; recorded, not used). |
| server date; PUT sent | 2026-10-03; 23:00:40.853 UTC (the response date headers read 23:00:42 and 23:00:43 GMT) |
| server time | 2.232 s, from the PUT being sent to the layout GET being sent. **Contended**: M0's build seats shared the machine, so this feeds no time row (plan-check PC-11). |
| buildings | 1 880 |
| request hash | `2473a617654e`: sha256 of the exact 274 296-byte PUT body |
| `referenceBuild` | `ftg:2026-10-03+2473a617654e` |
| payload | 427 107 bytes, Fetch-intercepted (`intercept-0035…bin`, sha256 `b4193552b9d3e79c…`) |
| road graph | 4 215 edges, 3 571 nodes |
| wall towers / water bodies / districts | 22 / 4 / 4 |
| settlement border | a square with half width 2 000.00 m, the size ladder's 4 000 m width |
| capture folder | 37 MB: 12 MB of session recording and 24 MB of screenshots at 2× (no CPU profile). Free disk: 12 GB before, 11 GB after. |

**Form values.** The size was set to the BIG_TOWN option and the coast select to the coastal option. The river,
forest, reserve-area and wall boxes were switched on; the farm box was already on. Everything else stayed at FTG's
default presets, and the name was left blank. All settings was never opened, and the premium size was not touched
(shots 004–012; values verified by `eval` before the create click). Every click and select was its own command, after a
`text` and a `shot`; every coordinate click also had an `elementFromPoint` reading naming its control, and a form-state
reading after each step showed the dialog still open (`steps/steps.jsonl`, 20 shots). The map (shot 014, 500 m bar)
shows the sea along the south-west, a river from the east and a branch from the north meeting at the town, a harbour
quarter and a walled core. The core shot (018) has a 250 m bar.

### 14.2 Checks (all executed 2026-10-03, CONFIRMED)

| check | how | result |
|---|---|---|
| all checks of `ftg_capture_post.py` | `--slot 4 --signed-in --premium`, `--check-only` first, then the writing run: exit 0 both times | 10 of 10 pass: calls, size key, water keys, the request diff against the base, the diff against slot 0, the same-size values (16 of 16 equal day 1's), decode, border, no resident field, `pb_raw` runs |
| the payload decodes: field 3 edges and nodes, field 8 buildings | `python3 tools/pb_raw.py <payload>` | exit 0, 177 distinct field paths; 3.1 × 4 215, 3.2 × 3 571, 8 × 1 880, 7 × 22, 6 × 4, 10 × 4. `structure.md` equals a fresh run apart from its title line and trailing newline. |
| the request's size key and water keys equal the slot's (PC-16) | `create-request.json` | BIG_TOWN; coast key coastal and rivers true |
| the request hash | sha256 of the PUT row's body, recomputed outside the script | `2473a617654e`, 274 296 bytes; exactly one PUT row with a body in the recording |
| the request differs from slot 2's (the same cell) only by the random ids | a leaf diff of the two requests | **0 semantic differences**; 45 client-random partner ids. Both requests have the same 26 top-level keys. |
| the request differs from day 1's only by the water options | a leaf diff of the two requests | 8 semantic differences: the 2 water keys and 6 leaves of the raw-resource entry the water options add (the list shifts by one); 0 size-dependent; plus 45 partner ids |
| the request differs from slot 3's only by the size | a leaf diff of the two requests | 15 semantic differences: the size key and 14 named size-dependent values; plus 45 partner ids |
| the checks discriminate (red tests) | the same capture checked as other slots, `--check-only` | as slot 0 (BIG_TOWN, `none`): exit 1 (water keys). As slot 1 (BIG_CITY, `none`): exit 1 (size key, water keys, border). As slot 3 and as slot 5 (BIG_CITY, `coast+river`): exit 1 (size key, same-size, border). As slot 2 (the same cell): exit 0, as it must be: the two slots differ only in their order index, which no check can see. |
| the runner is the profiler's code | `cmp` of the scratchpad copies against `profiler/` before the start | identical: session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…`, package.json `25e7d362…`, lib/instrument.js `cca253ac…`; port 9341; no FTG process and no `Singleton*` file before; `session closed`, no FTG process and no `Singleton*` file after; the shared `profiler/.session` absent before and after |
| only the seat used the window | the recording's hosts, documents and writes | one document load (the landing); hosts: the site, its API, analytics, error reporting, fonts and one GPU-benchmark file from a public package CDN (fetched in slots 2 and 3 too); exactly one write to the site's API (the create; the recorder lists it twice, as the request and its interception); no page outside the site |
| the slot bind is safe | `plan.py --bind-ftg 4=…`, then `--check` and a diff against the pre-bind copy | one line changed (slot 4's capture); SAME for both files; `metrics.m-1.json` byte-unchanged (`7a21bb29…`). `plan.json` sha256 moves from `e5697b73…` to `10501452…`. The pre-bind file is not slot 3's `811ae576…`: lane `m1/rulings-2` regenerated it at 18:57 EDT with FTG programme 2 (slots 6–27), keeping bindings 0–3. |
| no account identifier in the files written | grep of the README, `capture-facts.json`, `create-request.json`, `request-diff.txt`, `structure.md`, `steps.jsonl`, this section, the JSON entry, the checklist line, the result file and this lane's `lane-events.log` lines for an email pattern, the display name, a token prefix and a full id | see the result file's privacy row |

### 14.3 Findings

1. **One request, two different towns (CONFIRMED; cause PLAUSIBLE).** Slots 2 and 4 are the two draws of one cell
   (BIG_TOWN, `coast+river`). Their requests are equal in every value apart from the 45 client-random partner ids, yet
   the settlements differ: 1 880 against 1 821 buildings, 4 215 against 4 197 edges, 3 571 against 3 558 nodes, 22
   against 31 wall towers, 4 against 3 water bodies (districts 4 both), and the sea lies to the south-west here and to
   the north in slot 2. So the form's settings do not fix the result. This matches the plan's reading that FTG is not
   seedable (`plan.json` `ftg.seedable` false: the server draws its own seed). That the server's seed, not the partner
   ids, makes the difference is PLAUSIBLE only. For W-05b, the two captures of a cell are independent draws of the same
   settings.
2. **The size-dependent values repeat (CONFIRMED).** All 16 equal day 1's, and the diff against day 1 is the water
   options only, as in slot 2. The class needed no change.
3. **Four water bodies (count CONFIRMED; reading PLAUSIBLE).** Field 6 occurs 4 times: one polygon of 8 points, all
   coordinates within 303 m of the centre, and three of 99, 89 and 109 points that reach the 2 000 m border. Shot 014
   shows the sea and a river in two branches. So the three border-reaching polygons are PLAUSIBLY the sea and two river
   branches, and the small one is PLAUSIBLY of the kind seen near the centre in slots 2 (9 points) and 3 (7 points).
4. **Field 11's optional parts come and go (CONFIRMED).** The payload has 177 distinct field paths, the same set as
   slot 3's. Slot 2 had 188: the 11 extra paths are two optional parts of field 11, the decorations message
   (`research/findings/code-ftg-client.md` section 2.1). Slot 1, a free-account capture, lacks both parts as well, and
   day 1 has one of them, so their absence in slots 3 and 4 is not a premium effect. No check reads field 11.
5. **The listed population again differs from the nominal one (CONFIRMED; meaning PLAUSIBLE).** Slot 4 lists 6 221
   people against the nominal 5 600 (slot 2: 5 906; the earlier big town: 5 769). The row keeps
   `populationSource: nominal` until the ruling slot 1 asked for.
6. **The map's re-roll control is not always shown (CONFIRMED in the shots and readings; cause not read).** It was in
   the toolbar in the first map frames (014, 015) and absent after the zoom clicks (018, 019 and the item list before
   the home click). It was never clicked. Checklist H keeps it on the never-click list either way.

### 14.4 Calls and deviations (vetoable)

1. **No deviation from checklist section H.** The `--full` shot of the settlements view (002) was taken as H3
   prescribes; the form and the map then ran in the 1440×632 window. Every box click landed (checked by `eval`). The
   overview `--full` shot (015) again shows the scale bar without its label; shot 014, the same view, carries the
   500 m label.
2. **The `elementFromPoint` helper of H13 was made to redact.** Its first reading, on the landing's "Home" button, returned
   the enclosing block's text, which holds the "Signed in as …" line. It reached the seat's tool output and, because
   `drive.mjs` logs every `eval` result, line 4 of the capture's `steps/steps.jsonl`. After the run that one value was
   replaced by `[name]` and the line marked `redacted` (the file still parses, 77 lines; slots 1–3's `steps.jsonl` hold
   no name). The helper now replaces that line before printing; checklist H14 records it.
3. **A second visit to the settlements view after the create** (one guarded navigation click) read the list. It
   changed nothing.

### 14.5 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read) are every number in sections 14.1 and 14.2, findings 2, 4 and 6, the request equality and
the differing counts in finding 1, the field-6 counts and shapes, and the listed population. PLAUSIBLE (reasoning only)
are that the server's own seed makes slots 2 and 4 differ, what the four field-6 polygons are, and that the listed
population is the generated resident count.

## 15 Slot 5 (signed in) — 2026-10-03, BIG_CITY, `coast+river`

Lane `m1/W-02-slot5b`. One settlement was created, with one create click, by checklist section H with H12's guarded
clicks, H13's list count and H14's redacting helper. Before the create, the capture folders ended at slot 4's, slot 5
was unbound, and the account list held 5 settlements (big town 3, big city 2: the earlier settlement and slots 1 to 4),
so no slot-5 settlement existed. This is the last slot of programme 1.

### 15.1 The capture

| field (README) | value |
|---|---|
| capture id | `2026-10-03T23-10-37` |
| account | the owner's signed-in account, premium since J164; the list held 5 settlements before and 6 after (no counter) |
| size / rung | BIG_CITY / CITY |
| `WaterSetting` | `coast+river` (the request's coast key coastal, rivers true) |
| population, source | 24 500, `nominal`. The account list gives 24 597 (section 9.1; recorded, not used). |
| server date; PUT sent | 2026-10-03; 23:13:33.583 UTC (the response date headers read 23:13:39 and 23:13:40 GMT) |
| server time | 5.976 s, from the PUT being sent to the layout GET being sent. **Contended**: M0's build seats shared the machine, so this feeds no time row (plan-check PC-11). |
| buildings | 7 270 |
| request hash | `101a10861aae`: sha256 of the exact 274 299-byte PUT body |
| `referenceBuild` | `ftg:2026-10-03+101a10861aae` |
| payload | 1 260 224 bytes, Fetch-intercepted (`intercept-0035…bin`, sha256 `05f68f7fb1d48d1a…`) |
| road graph | 10 164 edges, 7 984 nodes |
| wall towers / water bodies / districts | 49 / 3 / 4 |
| settlement border | a square with half width 2 750.00 m, the size ladder's 5 500 m width |
| capture folder | 41 MB: 13 MB of session recording and 27 MB of screenshots at 2× (no CPU profile). Free disk: 11 GB before and after. |

**Form values.** The size was set to the BIG_CITY option and the coast select to the coastal option. The river,
forest, reserve-area and wall boxes were switched on; the farm box was already on. Everything else stayed at FTG's
default presets, and the name was left blank. All settings was never opened, and the premium size was not touched
(shots 004–012; values verified by `eval` before the create click). Every click and select was its own command, after a
`text` and a `shot`; every coordinate click also had an `elementFromPoint` reading naming its control, and a form-state
reading after each step showed the dialog still open (`steps/steps.jsonl`, 20 shots). The map (shot 014, 500 m bar)
shows the sea along the north, a river from the south reaching the coast through the city with a harbour basin at its
mouth, a walled core beside the basin and quarters on both banks. The core shot (018) has a 250 m bar.

### 15.2 Checks (all executed 2026-10-03, CONFIRMED)

| check | how | result |
|---|---|---|
| all checks of `ftg_capture_post.py` | `--slot 5 --signed-in --premium`, `--check-only` first, then the writing run: exit 0 both times | 10 of 10 pass: calls, size key, water keys, the request diff against the base, the diff against slot 0, the same-size values (16 of 16 equal slot 1's), decode, border, no resident field, `pb_raw` runs |
| the payload decodes: field 3 edges and nodes, field 8 buildings | `python3 tools/pb_raw.py <payload>` | exit 0, 198 distinct field paths; 3.1 × 10 164, 3.2 × 7 984, 8 × 7 270, 7 × 49, 6 × 3, 10 × 4. `structure.md` equals a fresh run apart from its title line. |
| the request's size key and water keys equal the slot's (PC-16) | `create-request.json` | BIG_CITY; coast key coastal and rivers true |
| the request hash | sha256 of the PUT row's body, recomputed outside the script | `101a10861aae`, 274 299 bytes; exactly one PUT row with a body in the recording |
| the request differs from slot 3's (the same cell) only by the random ids | a leaf diff of the two requests | **0 semantic differences**; 45 client-random partner ids. Both requests have the same 26 top-level keys. |
| the request differs from slot 1's only by the water options | a leaf diff of the two requests | 8 semantic differences: the 2 water keys and 6 leaves of the raw-resource entry the water options add; 0 size-dependent; plus 45 partner ids |
| the request differs from slots 2 and 4 only by the size | leaf diffs of the requests | 15 semantic differences each: the size key and 14 named size-dependent values; plus 45 partner ids |
| the checks discriminate (red tests) | the same capture checked as other slots, `--check-only` | as slot 0 (BIG_TOWN, `none`): exit 1 (size key, water keys, border). As slot 1 (BIG_CITY, `none`): exit 1 (water keys). As slots 2 and 4 (BIG_TOWN, `coast+river`): exit 1 (size key, same-size, border). As slot 3 (the same cell): exit 0, as it must be: the two slots differ only in their order index, which no check can see. |
| the runner is the profiler's code | `cmp` of the scratchpad copies against `profiler/` before the start | identical: session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…`, package.json `25e7d362…`, lib/instrument.js `cca253ac…`; port 9341; no FTG process and no `Singleton*` file before; `session closed`, no FTG process and no `Singleton*` file after; the shared `profiler/.session` absent before and after |
| only the seat used the window | the recording's hosts, documents and writes | one document load (the landing); hosts: the site, its API, analytics, error reporting, fonts and one GPU-benchmark file from a public package CDN (as in slots 2–4); exactly one write to the site's API (the create; listed twice, as the request and its interception); no page outside the site |
| the slot bind is safe | `plan.py --bind-ftg 5=…`, then `--check` and a diff against the pre-bind copy | one line changed (slot 5's capture); SAME for both files; `metrics.m-1.json` byte-unchanged (`7a21bb29…`). `plan.json` sha256 moves from `10501452…` (slot 4's bind) to `524830f5…`. |
| no account identifier in the files written | grep of the README, `capture-facts.json`, `create-request.json`, `request-diff.txt`, `structure.md`, `steps.jsonl`, this section, the header update, the JSON entry, the checklist line, the result file and this lane's `lane-events.log` lines for an email pattern, the display name, a token prefix and a full id | see the result file's privacy row |

### 15.3 Findings

1. **One request, two different cities (CONFIRMED; cause PLAUSIBLE).** Slots 3 and 5 are the two draws of one cell
   (BIG_CITY, `coast+river`). Their requests are equal in every value apart from the 45 client-random partner ids, yet
   the settlements differ: 7 270 against 7 342 buildings, 10 164 against 11 121 edges, 7 984 against 8 400 nodes, 49
   against 40 wall towers, 3 against 4 water bodies (districts 4 both), and the sea lies to the north here and to the
   west in slot 3. Slot 4 found the same for the town (section 14.3), so it holds at both sizes. That the server's own
   seed makes the difference stays PLAUSIBLE only (`plan.json` `ftg.seedable` false).
2. **The size-dependent values repeat (CONFIRMED).** All 16 equal slot 1's, and the diff against slot 1 is the water
   options only, as in slot 3. The class needed no change.
3. **Three water bodies (count CONFIRMED; reading PLAUSIBLE).** Field 6 occurs 3 times: one polygon of 20 points with
   all coordinates within 274 m of the centre, and two of 147 and 295 points that reach the 2 750 m border. Shot 014
   shows the sea and one river. So the two border-reaching polygons are PLAUSIBLY the sea and the river. The small one
   is PLAUSIBLY of the kind seen near the centre in slots 2 to 4 (9, 7 and 8 points); here the shot shows a harbour
   basin at the river mouth near the centre.
4. **Field 11's optional parts vary by draw (CONFIRMED).** The payload has 198 distinct field paths, exactly the union
   of the five earlier captures' paths: no new path, and every earlier path is present. It carries field 11's parts
   11.1, 11.6 and 11.7, the decorations message's optional parts (`research/findings/code-ftg-client.md` section 2.1),
   which slots 3 and 4 lacked. All three captures are of the same premium account, so the count (177 to 198) varies
   between draws, not by account. No check reads field 11.
5. **The listed population again differs from the nominal one (CONFIRMED; meaning PLAUSIBLE).** Slot 5 lists 24 597
   people against the nominal 24 500 (slot 1: 24 367; slot 3: 24 755). The row keeps `populationSource: nominal` until
   the ruling slot 1 asked for.
6. **Programme 1 is complete (CONFIRMED).** Slots 0 to 5 are all bound in `plan.json`, and `plan.py --check` reads SAME.
   Each cell of programme 1 has its planned draws: BIG_TOWN and BIG_CITY with no water once each, and with coast and
   river twice each.

### 15.4 Calls and deviations (vetoable)

1. **No deviation from checklist section H.** The `--full` shot of the settlements view (002) was taken as H3
   prescribes; the form and the map then ran in the 1440×632 window. Every box click landed (checked by `eval`). The
   overview `--full` shot (015) again shows the scale bar without its label; shot 014, the same view, carries the
   500 m label. The redacting helper of H14 was used from the first reading, and `steps.jsonl` needed no redaction.
2. **One inspection reading failed and was repeated.** A read-only `eval` of the size select's options threw in the
   driver (it serialised the option list itself); the next `eval` read the option text. No click depended on the failed
   reading, and nothing on the page changed.
3. **A second visit to the settlements view after the create** (one guarded navigation click) read the list. It
   changed nothing.

### 15.5 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read) are every number in sections 15.1 and 15.2, findings 2, 4 and 6, the request equality and
the differing counts in finding 1, the field-6 counts and shapes, and the listed population. PLAUSIBLE (reasoning only)
are that the server's own seed makes slots 3 and 5 differ, what the three field-6 polygons are, and that the listed
population is the generated resident count.
