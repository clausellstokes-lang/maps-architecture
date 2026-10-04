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

**Update, programme 2, slot 6's first seat (2026-10-04 02:20 UTC): STOPPED, nothing created.** Lane `m1/W-02-slot6`
stopped on the landing page, before any click: the page scrolled twice while the seat only read it (section 16). No
settlement was made and the account was not written to. Slot 6 (`capture/FTG/METROPOLIS/none/0`) stays open in
`plan.json`; a relaunch needs the window left alone.

**Update, programme 2, slot 6 (2026-10-04 03:06 UTC, signed in, premium since J164): the first METROPOLIS.** Lane
`m1/W-02-slot6b` relaunched the slot with the window left alone. Slot 6 (`capture/FTG/METROPOLIS/none/0`) is
`captures/ftg/2026-10-04T02-55-56`: a METROPOLIS settlement with no coast and rivers off, 14 748 buildings, 13 193 road
edges and 10 819 nodes, 93 wall towers, 1 water body and 7 districts on a 6 000 m square; `referenceBuild`
`ftg:2026-10-04+47ad771558f5`. As the first capture of a new size (R-41) it brought one size-dependent value the class
did not yet name, the second stage's spoke cap; it joined the class by name (17 values) on this capture's controlled
comparison and the client's per-size table. All 10 checks then pass, the slot is bound, and `plan.py --check` reads SAME
(section 17). The account list held 6 settlements before and 7 after.

**Update, programme 2, slot 7 (2026-10-04 03:22 UTC, signed in, premium since J164): the second METROPOLIS.** Lane
`m1/W-02-slot7b`. Slot 7 (`capture/FTG/METROPOLIS/coast+river/0`) is `captures/ftg/2026-10-04T03-13-14`: a METROPOLIS
settlement on the coast with rivers on, 14 617 buildings, 15 327 road edges and 12 284 nodes, 74 wall towers, 8 water
bodies and 9 districts on a 6 000 m square; `referenceBuild` `ftg:2026-10-04+ab8a44dfa6ce`. All 10 checks pass on the
first run, its 17 size-dependent values equal slot 6's (the same-size check), the slot is bound, and `plan.py --check`
reads SAME (section 18). The account list held 7 settlements before and 8 after.

**Update, programme 2, slot 8 (2026-10-04 03:36 UTC, signed in, premium since J164): the third METROPOLIS.** Lane
`m1/W-02-slot8b`. Slot 8 (`capture/FTG/METROPOLIS/coast+river/1`) is `captures/ftg/2026-10-04T03-26-16`: a METROPOLIS
settlement on the coast with rivers on, 15 606 buildings, 13 486 road edges and 10 626 nodes, 92 wall towers, 3 water
bodies and 10 districts on a 6 000 m square; `referenceBuild` `ftg:2026-10-04+c44c6dcbfacf`. All 10 checks pass on the
first run, its 17 size-dependent values equal slot 6's (the same-size check), its request equals slot 7's apart from the
45 client-random ids, the slot is bound, and `plan.py --check` reads SAME (section 19). The account list held 8
settlements before and 9 after.

**Update, programme 2, slot 9 (2026-10-04 03:47 UTC, signed in, premium since J164): the fourth and last METROPOLIS.**
Lane `m1/W-02-slot9b`. Slot 9 (`capture/FTG/METROPOLIS/coast+river/2`) is `captures/ftg/2026-10-04T03-40-45`: a
METROPOLIS settlement on the coast with rivers on, 14 313 buildings, 18 817 road edges and 13 988 nodes, 57 wall towers,
3 water bodies and 8 districts on a 6 000 m square; `referenceBuild` `ftg:2026-10-04+33678f1122ff`. All 10 checks pass on
the first run, its 17 size-dependent values equal slot 6's (the same-size check), its request equals slots 7 and 8's
apart from the 45 client-random ids, the slot is bound, and `plan.py --check` reads SAME (section 20). The account list
held 9 settlements before and 10 after. The four METROPOLIS slots (6–9) are done.

**Update, programme 2, slot 10 (2026-10-04 04:01 UTC, signed in, premium since J164): the fourth BIG_TOWN.** Lane
`m1/W-02-slot10b`. Slot 10 (`capture/FTG/BIG_TOWN/none/1`) is `captures/ftg/2026-10-04T03-53-59`: a BIG_TOWN settlement
with no coast and rivers off, 1 675 buildings, 3 288 road edges and 2 895 nodes, 17 wall towers, 0 water bodies and 2
districts on a 4 000 m square; `referenceBuild` `ftg:2026-10-04+7fb2f6163913`. All 10 checks pass on the first run, its
17 size-dependent values equal slot 0's (the same-size check), its request equals slot 0's (the guest capture of the
same cell) apart from the 45 client-random ids, the slot is bound, and `plan.py --check` reads SAME (section 21). The
account list held 10 settlements before and 11 after: the premium account took an eleventh settlement with no prompt.

**Update, programme 2, slot 11 (2026-10-04 04:14 UTC, signed in, premium since J164): the fourth BIG_CITY.** Lane
`m1/W-02-slot11b`. Slot 11 (`capture/FTG/BIG_CITY/none/1`) is `captures/ftg/2026-10-04T04-07-26`: a BIG_CITY settlement
with no coast and rivers off, 7 376 buildings, 8 427 road edges and 6 835 nodes, 62 wall towers, 0 water bodies and 6
districts on a 5 500 m square; `referenceBuild` `ftg:2026-10-04+6a23599e2e24`. All 10 checks pass on the first run, its
17 size-dependent values equal slot 1's (the same-size check), its request equals slot 1's (the same cell) apart from
the 45 client-random ids, the slot is bound, and `plan.py --check` reads SAME (section 22). The account list held 11
settlements before and 12 after, with no prompt.

**Update, programme 2, slot 12 (2026-10-04 04:24 UTC, signed in, premium since J164): the fifth BIG_TOWN, unwalled.**
Lane `m1/W-02-slot12b`. Slot 12 (`capture/FTG/BIG_TOWN/coast+river/2`) is `captures/ftg/2026-10-04T04-20-04`: a
BIG_TOWN settlement on the coast with rivers on, 1 610 buildings, 2 987 road edges and 2 639 nodes, **no wall and no
wall towers**, 4 water bodies and 2 districts on a 4 000 m square; `referenceBuild` `ftg:2026-10-04+6a10a6990446`. All
10 checks pass on the first run, its 17 size-dependent values equal slot 0's (the same-size check), its request equals
slots 2 and 4's (the same cell) apart from the 45 client-random ids, the slot is bound, and `plan.py --check` reads
SAME (section 23). The request asks for the wall as slots 2 and 4's did, yet this draw has none: the first capture
without one (section 23.3 finding 2). The account list held 12 settlements before and 13 after, with no prompt.

**Update, programme 2, slot 13 (2026-10-04 04:39 UTC, signed in, premium since J164): the fifth BIG_CITY.** Lane
`m1/W-02-slot13b`. Slot 13 (`capture/FTG/BIG_CITY/coast+river/2`) is `captures/ftg/2026-10-04T04-35-38`: a BIG_CITY
settlement on the coast with rivers on, 7 328 buildings, 11 713 road edges and 9 000 nodes, 37 wall towers (58 wall
edges), 4 water bodies and 5 districts on a 5 500 m square; `referenceBuild` `ftg:2026-10-04+0d0696065301`. All 10
checks pass on the first run, its 17 size-dependent values equal slot 1's (the same-size check), its request equals
slots 3 and 5's (the same cell) apart from the 45 client-random ids, the slot is bound, and `plan.py --check` reads
SAME (section 24). The account list held 13 settlements before and 14 after, with no prompt.

**Update, programme 2, slot 14 (2026-10-04 04:56 UTC, signed in, premium since J164): the sixth BIG_TOWN.** Lane
`m1/W-02-slot14b`. Slot 14 (`capture/FTG/BIG_TOWN/none/2`) is `captures/ftg/2026-10-04T04-53-21`: a BIG_TOWN settlement
with no coast and rivers off, 1 826 buildings, 3 597 road edges and 3 145 nodes, 23 wall towers (44 wall edges), 2
water bodies (two small ponds) and 3 districts on a 4 000 m square; `referenceBuild` `ftg:2026-10-04+46477f59df5a`.
All 10 checks pass on the first run, its 17 size-dependent values equal slot 0's (the same-size check), its request
equals slots 0 and 10's (the same cell) apart from the 45 client-random ids, the slot is bound, and `plan.py --check`
reads SAME (section 25). The account list held 14 settlements before and 15 after, with no prompt.

**Update, programme 2, slot 15 (2026-10-04 05:10 UTC, signed in, premium since J164): the sixth BIG_CITY.** Lane
`m1/W-02-slot15b`. Slot 15 (`capture/FTG/BIG_CITY/none/2`) is `captures/ftg/2026-10-04T05-07-56`: a BIG_CITY settlement
with no coast and rivers off, 7 696 buildings, 10 937 road edges and 8 566 nodes, 49 wall towers (92 wall edges), 0
water bodies and 5 districts on a 5 500 m square; `referenceBuild` `ftg:2026-10-04+244a77d22f63`. All 10 checks pass on
the first run, its 17 size-dependent values equal slot 1's (the same-size check), its request equals slots 1 and 11's
(the same cell) apart from the 45 client-random ids, the slot is bound, and `plan.py --check` reads SAME (section 26).
The account list held 15 settlements before and 16 after, with no prompt.

**Update, programme 2, slot 16 (2026-10-04 05:27 UTC, signed in, premium since J164): the seventh BIG_TOWN.** Lane
`m1/W-02-slot16b`. Slot 16 (`capture/FTG/BIG_TOWN/coast+river/3`) is `captures/ftg/2026-10-04T05-24-24`: a BIG_TOWN
settlement on the coast with rivers on, 1 675 buildings, 3 648 road edges and 3 186 nodes, 16 wall towers (29 wall
edges, the shortest wall so far, round one harbour quarter), 5 water bodies and 4 districts on a 4 000 m square;
`referenceBuild` `ftg:2026-10-04+cb0aa16b422b`. All 10 checks pass on the first run, its 17 size-dependent values equal
slot 0's (the same-size check), its request equals slots 2, 4 and 12's (the same cell) apart from the 45 client-random
ids, the slot is bound, and `plan.py --check` reads SAME (section 27). The account list held 16 settlements before and
17 after, with no prompt.

**Update, programme 2, slot 17 (2026-10-04 05:44 UTC, signed in, premium since J164): the seventh BIG_CITY.** Lane
`m1/W-02-slot17b`. Slot 17 (`capture/FTG/BIG_CITY/coast+river/3`) is `captures/ftg/2026-10-04T05-40-57`: a BIG_CITY
settlement on the coast with rivers on, 7 311 buildings, 10 715 road edges and 8 329 nodes, 25 wall towers (40 wall
edges, the shortest BIG_CITY wall so far, round the harbour quarter only), 5 water bodies and 6 districts on a 5 500 m
square; `referenceBuild` `ftg:2026-10-04+e18a980c526b`. All 10 checks pass on the first run, its 17 size-dependent
values equal slot 1's (the same-size check), its request equals slots 3, 5 and 13's (the same cell) apart from the 45
client-random ids, the slot is bound, and `plan.py --check` reads SAME (section 28). The account list held 17
settlements before and 18 after, with no prompt.

**Update, programme 2, slot 18 (2026-10-04 06:03 UTC, signed in, premium since J164): the eighth BIG_TOWN.** Lane
`m1/W-02-slot18b`. Slot 18 (`capture/FTG/BIG_TOWN/none/3`) is `captures/ftg/2026-10-04T06-00-29`: a BIG_TOWN settlement
with no coast and rivers off, 1 712 buildings, 3 003 road edges and 2 639 nodes, 22 wall towers (46 wall edges, a short
ring round the inner district), 4 water bodies (small ponds) and 3 districts on a 4 000 m square; `referenceBuild`
`ftg:2026-10-04+2e3cbb89d175`. All 10 checks pass on the first run, its 17 size-dependent values equal slot 0's (the
same-size check), its request equals slots 0, 10 and 14's (the same cell) apart from the 45 client-random ids, the slot
is bound, and `plan.py --check` reads SAME (section 29). The account list held 18 settlements before and 19 after, with
no prompt.

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

## 16 Slot 6 (programme 2) — 2026-10-04, METROPOLIS, `none`: STOPPED, nothing created

Lane `m1/W-02-slot6`, the first seat of programme 2 (J164; owner's go of 2026-10-03, `owner-go.json`). **No settlement
was created; slot 6 stays open** (`plan.json` unchanged, not marked failed). The attempt's folder is
`captures/ftg/2026-10-04T02-18-09` (its README gives the timeline; it is not a capture).

**Before the site (CONFIRMED).** No result file or earlier line for this lane key; slots 0–5 bound and slot 6 open;
`plan.py --check` SAME (`ee28c604…` / `8a0efa7e…`); the capture folders ended at slot 5's; no FTG process, no
`Singleton*` file, the shared `profiler/.session` absent, port 9341 free; 12 GiB free. The isolated runner's copies
`cmp` equal to `profiler/` (session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…`, package.json
`25e7d362…`, lib/instrument.js `cca253ac…`).

**What stopped it (CONFIRMED by the readings, the network index and the shots).** The landing loaded signed in, with
the "Signed in as …" line, "Sign out" and "Home", and no consent notice (shot 001). The seat's first reading (7.1 s after
load) found the page's root scroll container at 0 and "Home" at (896, 931), where slots 3–5 found it. Its next reading
(16.2 s) found "Home" at (896, 278): the container had scrolled 653 px. The site fetched its first lazy-loaded feature
image at 8.3 s. At 73 s it fetched five more, and at 98 s the container stood at 2 769 px (shot 003 shows the features
section far below the account block). A `:hover` reading at 77.5 s ended in the landing's account block, so a pointer
rested over the page. The seat sent only `text`, `shot` and read-only `eval` commands, none of which scrolls or moves
a pointer. Checklist H12 and I10 treat a page that changes without a command as a sign of another hand, so the seat took
the shot and stopped the session (`session closed`; no `Singleton*` file, no FTG process; both `.session` files absent).
Nothing was clicked.

**Effects (CONFIRMED in the recording).** The recording holds the page and its assets, fonts, tag-manager and
analytics calls, one error report, and the sign-in library's token refresh at load. It holds no call to the site's
settlements API: the account list was not read, and nothing was written to the account. The recording stays local under
`captures/`, which git ignores.

**Reading (PLAUSIBLE, strongly).** A person scrolled the visible recording window, which is headful on the Mac. The
three earlier signed-in landings never moved, no driver command scrolls, and a pointer was over the page. A relaunch
needs the owner's word that the window, the mouse and the trackpad over it are left alone while a seat runs (J164,
plan 2.1b (8)).

**Calls (vetoable).** (1) A scroll counts as a page change without a command, so the seat stopped instead of reading
past it. Clicking "Home" would still have hit its control, because `clicktext` hit-tests at the click. The rule exists so
that a seat never acts while another hand is on the window (section 12). (2) The lane is closed as `stopped` with this
record, as slot 3's first attempt was (section 12). A retry runs under a new lane key, so the resume rule does not return
this result.

## 17 Slot 6 (programme 2) — 2026-10-04, METROPOLIS, `none`

Lane `m1/W-02-slot6b`, the relaunch after section 16's stopped attempt, under the owner's go for programme 2
(`owner-go.json`). One settlement was created, with one create click, by checklist sections H (with H12's guarded clicks,
H13's list count and H14's redacting helper) and I. Before the create, slot 6 was open and slots 0–5 bound, the only
folder after slot 5's was section 16's attempt (no call to the settlements API in it), and the account list held 6
settlements (big town 3, big city 3, metropolis 0), so no slot-6 settlement existed. The landing's root scroll container
read 0 at the first reading and 0 again just before the "Home" click, and no hover was on the page: no sign of another
hand (checklist I, slot-6 note).

### 17.1 The capture

| field (README) | value |
|---|---|
| capture id | `2026-10-04T02-55-56` |
| account | the owner's signed-in account, premium since J164; the list held 6 settlements before and 7 after (no counter) |
| size / rung | METROPOLIS / METROPOLIS (the premium-only size, plan 2.1b (2)) |
| `WaterSetting` | `none` (the request's coast key empty, rivers false) |
| population, source | 49 500, `nominal`. The account list gives 49 780 (section 9.1; recorded, not used). |
| server date; PUT sent | 2026-10-04 (UTC; 22:59 EDT on 2026-10-03); 02:59:19.584 UTC (the response date headers read 02:59:30 and 02:59:32 GMT) |
| server time | 11.147 s, from the PUT being sent to the layout GET being sent. **Contended**: M0's build seats and M-1 research seats shared the machine, so this feeds no time row (plan-check PC-11). |
| buildings | 14 748 |
| request hash | `47ad771558f5`: sha256 of the exact 274 292-byte PUT body |
| `referenceBuild` | `ftg:2026-10-04+47ad771558f5` |
| payload | 2 088 939 bytes, Fetch-intercepted (`intercept-0035…bin`, sha256 `2c48da5b83b35282…`) |
| road graph | 13 193 edges, 10 819 nodes |
| wall towers / water bodies / districts | 93 / 1 / 7 |
| settlement border | a square with half width 3 000.00 m, the size ladder's 6 000 m width |
| capture folder | 46 MB: 14 MB of session recording and 32 MB of screenshots at 2× (no CPU profile). Free disk: 10 GB before and after. |

**Form values.** The size was set to the metropolis option, chosen by its request key: the size select's option values
are their display texts, so the seat read each option's React element key (the display text followed by the request
key) by `eval`; exactly one of the 12 options carried `METROPOLIS`, and the selected option's key was re-read after the
select. The water was the form's own default: no coast, rivers off. The farm box was already on; the forest,
reserve-area and wall boxes were switched on. Everything else stayed at FTG's default presets, and the name was left
blank. All settings was never opened (shots 004–011; values verified by `eval` before the create click). Every click
and select was its own command after its readings, and every coordinate click had an `elementFromPoint` reading naming
its control; a form-state reading after each step showed the dialog still open (`steps/steps.jsonl`, 19 shots). The map
(shot 013, 500 m bar) shows a walled core inside an oval wall, quarters on every side, seven district labels, fields to
the west, a large forest to the south-west and open country to the east, with no sea or river. The core shot (017) has
a 250 m bar.

### 17.2 Checks (all executed 2026-10-04, CONFIRMED)

| check | how | result |
|---|---|---|
| all checks of `ftg_capture_post.py` | `--slot 6 --signed-in --premium`, `--check-only` first | **first run exit 1**: 8 of 10; the request diff against the base and the diff against slot 0 failed on one value outside the 16 named ones (finding 1); every other check passed |
| the first-of-size rule (R-41; checklist I9) | finding 1's steps 1–4 | the one value joined the class by name; `--check-only` exit 0, then the writing run exit 0: 10 of 10 pass (calls, size key, water keys, the request diff against the base, the diff against slot 0, the same-size values (vacuous: the first METROPOLIS), decode, border, no resident field, `pb_raw` runs) |
| the payload decodes: field 3 edges and nodes, field 8 buildings | `python3 tools/pb_raw.py <payload>` | exit 0, 187 distinct field paths; 3.1 × 13 193, 3.2 × 10 819, 8 × 14 748, 7 × 93, 6 × 1, 10 × 7 |
| the request's size key and water keys equal the slot's (PC-16) | `create-request.json` | METROPOLIS; coast key empty and rivers false |
| the request hash | sha256 of the PUT row's body, recomputed outside the script | `47ad771558f5`, 274 292 bytes; exactly one PUT row with a body in the recording |
| the request differs from slot 1's (the same water) only by the size | a leaf diff of the two requests | 8 semantic differences: the size key and 7 size-dependent values (finding 1's table), the new one among them; 0 other; plus 45 partner ids. Both requests have the same 26 top-level keys. |
| the request differs from day 1's (slot 0, the same water) only by the size | a leaf diff of the two requests | 16 semantic differences: the size key and 15 size-dependent values; 0 other; plus 45 partner ids |
| the form steps differ from slot 1's in the size option only (R-41 step 1) | the form-changing commands of both `steps.jsonl` files | the same commands in the same order at the same coordinates ("Home", "New Settlement", the size select, the forest box, the dialog scroll, the reserve-area and wall boxes, "Create Settlement"); only the size option's text differs. The form-final `eval` reads every other select and every box as day 1's form. |
| the widening is red first and safe (R-41 step 4) | the old script and a same-directory copy with the one added name, `--check-only` on slots 0–6 | old: slot 6 exit 1 (other 1), slots 0–5 exit 0 at 10 of 10; copy: slot 6 exit 0, slots 0–5 exit 0 at 10 of 10 (same-size 17 of 17 for slots 2–5). Installed by an atomic rename after checking the file's hash unchanged (`4d396e67…` → `73592294…`). |
| the checks discriminate (red tests) | this capture checked as other slots under the new script, `--check-only` | as slot 0 (BIG_TOWN, `none`): exit 1 (size key, border). As slot 1 (BIG_CITY, `none`): exit 1 (size key, border). As slot 7 (METROPOLIS, `coast+river`): exit 1 (water keys, request diff, diff against slot 0: the resource list is not the coastal one). |
| the runner is the profiler's code | `cmp` of the scratchpad copies against `profiler/` before the start | identical: session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…`, package.json `25e7d362…`, lib/instrument.js `cca253ac…`; port 9341; no FTG process and no `Singleton*` file before; `session closed`, no FTG process and no `Singleton*` file after; both `.session` files absent before and after |
| only the seat used the window | the scroll readings and the recording's hosts, documents and writes | root scroll 0 → 0 across the landing; one document load (the landing); hosts: the site, its API, analytics, error reporting, fonts and one GPU-benchmark file from a public package CDN (as in slots 2–5); exactly one write to the site's API (the create; listed twice, as the request and its interception); no page outside the site |
| one settlement made (plan 2.1b (6)) | the PUT status and the list before and after | PUT 200; the list's rows 6 → 7, the new row of size METROPOLIS carrying the PUT's settlement id; no retry |
| the slot bind is safe | `plan.py --bind-ftg 6=…`, then `--check` and a diff against the pre-bind copy | one line changed (slot 6's capture); SAME for both files; `metrics.m-1.json` byte-unchanged (`8a0efa7e…`). `plan.json` sha256 moves from `f6972b91…` to `80d1a447…`. |
| no account identifier in the files written | grep of the README, `capture-facts.json`, `create-request.json`, `request-diff.txt`, `structure.md`, `steps.jsonl`, this section, the header update, the JSON entry, the checklist note, the result file and this lane's `lane-events.log` lines for an email pattern, the display name, a token prefix and a full id | see the result file's privacy row |

### 17.3 Findings

1. **The second stage's spoke cap follows the size (CONFIRMED; R-41).** The first `--check-only` named one value
   outside the class: the second stage's most spokes, 1 in the base, day 1 and slot 1, and 2 here. The four steps of
   checklist I9: (1) the form steps differ from slot 1's, and so from day 1's, in the size option only (section 17.2);
   (2) it is the only value the two failing checks name as other; (3) it is a value of the layout preset's second stage,
   the twin of the first stage's spoke cap that joined the class with slot 1, and no simple-form control sets it; the
   client's per-size table for the second stage (read in this capture's script bundle, research-side) gives 1 at
   BIG_TOWN, CITY and BIG_CITY and 2 at METROPOLIS, and its METROPOLIS entries for both stages equal the request's
   values; (4) it joined `SIZE_DEPENDENT` by name, red first (section 17.2). The class now has **17 named values**. Their
   values at the four sizes captured so far:

   | value | METROPOLIS (slot 6) | BIG_CITY (slot 1) | BIG_TOWN (day 1) | CITY (2026-09-21 base) | in the class since |
   |---|---|---|---|---|---|
   | stage 1: branch segments, first direction | 5 | 4 | 3 | 4 | day 1 |
   | stage 1: branch segments, second direction | 5 | 4 | 3 | 4 | day 1 |
   | stage 1: minimum district area (ha) | 12 | 10 | 6 | 10 | day 1 |
   | stage 1: building share | 0.25 | 0.2 | 0.1 | 0.2 | day 1 |
   | stage 1: spoke probability | 0.3 | 0.3 | 0.1 | 0.5 | day 1 |
   | stage 1: most spokes | 2 | 2 | 1 | 1 | slot 1 |
   | stage 1: main-road step (m) | 70 | 70 | 50 | 50 | slot 1 |
   | stage 2: branch segments, first direction | 5 | 5 | 3 | 3 | slot 1 |
   | stage 2: branch segments, second direction | 5 | 5 | 3 | 3 | slot 1 |
   | stage 2: minimum district area (ha) | 10 | 10 | 6 | 7 | day 1 |
   | stage 2: building share | 0.6 | 0.6 | 0.6 | 0.5 | day 1 |
   | stage 2: main-road step (m) | 50 | 50 | 50 | 60 | day 1 |
   | random-faction count | 6 | 5 | 3 | 4 | day 1 |
   | shop probability, inside the settlement | 0.1 | 0.1 | 0.4 | 0.1 | day 1 |
   | shop probability, outside the settlement | 0.5 | 0.5 | 0.4 | 0.5 | day 1 |
   | religious-workers share | 0.0025 | 0.005 | 0.01 | 0.01 | slot 1 |
   | **stage 2: most spokes** | **2** | 1 | 1 | 1 | **slot 6** |

   Seven values differ between BIG_CITY and METROPOLIS (the new one among them); the shop probabilities equal the CITY
   base's. Every later METROPOLIS slot (7–9) must repeat this column exactly (the same-size check). The new value
   equals 1 in every earlier capture, so slots 0–5 are unchanged by the widening (17 of 17 same-size values equal).
2. **The metropolis is about twice the big city (CONFIRMED for this one draw).** 14 748 buildings against 7 164–7 342
   in the three BIG_CITY slots; 13 193 edges and 10 819 nodes against slot 1's 7 236 and 6 302 (the same water); 93
   wall towers against 40–66; 7 districts against 4–5; a 3 000 m half width against 2 750 m. The account list gives
   49 780 people against the nominal 49 500.
3. **One water body with no coast and no river (count CONFIRMED; reading PLAUSIBLE).** Field 6 occurs once: one polygon
   of 14 points, every coordinate within 1 781 m of the centre, so it does not reach the border. The overview frame
   shows no water. It is PLAUSIBLY a pond of the kind slot 1's three were.
4. **The payload's paths are a subset of the earlier ones (CONFIRMED).** 187 distinct field paths, none new; the 11 of
   the earlier union's 198 that are absent are field 11's optional parts 11.7 and 11.8.2, which vary by draw (section
   15.3 finding 4). The size changed no part of the payload's schema. No check reads field 11.
5. **The premium size behaves as the plan expected (CONFIRMED; times contended).** The payload is 2.09 MB (plan 2.1b
   (7): 2–3 MB) and the server time 11.1 s (≈ 10 s expected); the layout body arrived within the poll's first 15 s.
6. **The size option's request key is not its `value` attribute (CONFIRMED).** The size select's option values equal
   their display texts; the request key appears only in each option's React element key, after the text. Checklist
   I4's "the option whose value is the request key" is read there (checklist I, slot-6 note).

### 17.4 Calls and deviations (vetoable)

1. **The size-dependent class grows to 17 values by R-41.** The added value is named in the post script, with this
   capture as its evidence. The alternative was to record slot 6 `failed` on a value that the size option alone sets.
   The rule's guard holds: anything that is not a layout-preset value set by the size would have failed the slot.
2. **The request key was read from the React element key** (a read-only `eval`), because the option values are texts.
   The alternative, selecting by the remembered text, is what checklist I4 forbids. The request's size key confirmed
   the choice (check `sizeKey`).
3. **One click had a form-state reading in place of a `text` reading.** Before the reserve-area click, the seat read the
   form state (every select, every box with its centre, the dialog open), took a shot and read `elementFromPoint`, but
   ran no separate `text`. The click landed (checked by `eval`).
4. **The `E02-ftg-captures.json` entry joins `days`** with `day` null and `programme` 2, so that the readers of that
   list (W-05b's `measure_ftg_slots.py` maps captures to their `referenceBuild` there) find it; `slotsTaken` is 7 of 28.
5. **Not changed here:** section 10.3's table (W-05b's tool parses it, with 16 rows), `measure_ftg_slots.py`'s row map
   and the plan's wording of "16 named values" (plan 2.1b (4), checklist H10). They belong to other lanes; the result
   names them.

### 17.5 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read) are every number in sections 17.1 and 17.2, finding 1's comparison, its table and the
client's per-size values, findings 2, 4, 5 and 6, and the field-6 count and shape. PLAUSIBLE (reasoning only) are that
the one water body is a pond, and that the listed population is the generated resident count.

## 18 Slot 7 (programme 2) — 2026-10-04, METROPOLIS, `coast+river`

Lane `m1/W-02-slot7b`, under the owner's go for programme 2 (`owner-go.json`). One settlement was created, with one
create click, by checklist sections H (with H12's guarded clicks, H13's list count and H14's redacting helper) and I.
Before the create, slot 7 was open and slots 0–6 bound, the newest folder was slot 6's (its one create is slot 6's own),
no lane line named a slot-7 key, and the account list held 7 settlements (big town 3, big city 3, metropolis 1: the
earlier settlement and slots 1 to 6), so no slot-7 settlement existed. The landing's root scroll container read 0 at the
first reading and 0 again just before the "Home" click, and no hover was on the page: no sign of another hand.

### 18.1 The capture

| field (README) | value |
|---|---|
| capture id | `2026-10-04T03-13-14` |
| account | the owner's signed-in account, premium since J164; the list held 7 settlements before and 8 after (no counter) |
| size / rung | METROPOLIS / METROPOLIS (the premium-only size, plan 2.1b (2)) |
| `WaterSetting` | `coast+river` (the request's coast key coastal, rivers true) |
| population, source | 49 500, `nominal`. The account list gives 49 184 (section 9.1; recorded, not used). |
| server date; PUT sent | 2026-10-04 (UTC; 23:16 EDT on 2026-10-03); 03:16:40.423 UTC (the response date headers read 03:16:55 and 03:16:57 GMT) |
| server time | 15.223 s, from the PUT being sent to the layout GET being sent. **Contended**: M0's build seats and M-1 research seats shared the machine, so this feeds no time row (plan-check PC-11). |
| buildings | 14 617 |
| request hash | `ab8a44dfa6ce`: sha256 of the exact 274 303-byte PUT body |
| `referenceBuild` | `ftg:2026-10-04+ab8a44dfa6ce` |
| payload | 2 234 951 bytes, Fetch-intercepted (`intercept-0035…bin`, sha256 `baaf23aa9c91889e…`) |
| road graph | 15 327 edges, 12 284 nodes |
| wall towers / water bodies / districts | 74 / 8 / 9 |
| settlement border | a square with half width 3 000.00 m, the size ladder's 6 000 m width |
| capture folder | 42 MB: 14 MB of session recording and 28 MB of screenshots at 2× (no CPU profile). Free disk: 10 GB before and after. |

**Form values.** The size was set to the metropolis option, chosen by its request key as in slot 6: the seat read each
size option's React element key by `eval`; exactly one of the 12 options carried `METROPOLIS`, and the selected
option's key was re-read after the select. The coast select was set to the coastal option, and the river, forest,
reserve-area and wall boxes were switched on; the farm box was already on. Everything else stayed at FTG's default
presets, and the name was left blank. All settings was never opened (shots 004–012; values verified by `eval` before
the create click). Every click and select was its own command after its readings, and every coordinate click had an
`elementFromPoint` reading naming its control; a form-state reading after each step showed the dialog still open
(`steps/steps.jsonl`, 20 shots). The map (shot 014, 500 m bar) shows the sea to the west and north-west with harbour
piers, a river from the east and another from the south meeting north-east of the walled core, quarters on both banks,
eight district labels in view, and fields and forest to the east. The core shot (018) has a 250 m bar.

### 18.2 Checks (all executed 2026-10-04, CONFIRMED)

| check | how | result |
|---|---|---|
| all checks of `ftg_capture_post.py` | `--slot 7 --signed-in --premium`, `--check-only` first, then the writing run: exit 0 both times (the script unchanged since slot 6, `735922948e3970fb…`) | 10 of 10 pass: calls, size key, water keys, the request diff against the base, the diff against slot 0, the same-size values (**17 of 17 equal slot 6's**), decode, border, no resident field, `pb_raw` runs |
| the payload decodes: field 3 edges and nodes, field 8 buildings | `python3 tools/pb_raw.py <payload>` (the post script's run) | exit 0, 198 distinct field paths; 3.1 × 15 327, 3.2 × 12 284, 8 × 14 617, 7 × 74, 6 × 8, 10 × 9 |
| the request's size key and water keys equal the slot's (PC-16) | `create-request.json` | METROPOLIS; coast key coastal and rivers true |
| the request hash | sha256 of the PUT row's body, recomputed outside the script | `ab8a44dfa6ce`, 274 303 bytes; exactly one PUT row with a body in the recording |
| the request differs from slot 6's (the same size) only by the water options | a leaf diff of the two requests | 8 semantic differences: the 2 water keys and 6 leaves of the raw-resource entry the water options add (the list shifts by one); 0 size-dependent; plus 45 client-random partner ids. Both requests have the same 26 top-level keys. |
| the request differs from slots 3 and 5 (BIG_CITY, the same water) only by the size | leaf diffs of the requests | 8 semantic differences each: the size key and the 7 size-dependent values that differ between BIG_CITY and METROPOLIS (section 17.3's table); plus 45 partner ids |
| the request differs from slot 2's (BIG_TOWN, the same water) only by the size | a leaf diff of the two requests | 16 semantic differences: the size key and 15 size-dependent values; plus 45 partner ids |
| the request differs from the base and from day 1 within the named classes | the script's `requestDiff` and `vsSlot0` | against the base: 16 semantic (the size key and 15 size-dependent), `other` 0; against day 1: 24 semantic (the size key, 2 water keys, 6 water-implied, 15 size-dependent), `other` 0 |
| the checks discriminate (red tests) | this capture checked as other slots, `--check-only` | as slot 0 and as slot 1 (`none`, other sizes): exit 1 (size key, water keys, request diff, diff against slot 0, border). As slot 5 (BIG_CITY, `coast+river`): exit 1 (size key, same-size, border). As slot 6 (METROPOLIS, `none`): exit 1 (water keys, request diff, diff against slot 0). As slot 8 (the same cell): exit 0, as it must be. |
| the runner is the profiler's code | `cmp` of the scratchpad copies against `profiler/` before the start | identical: session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…`, package.json `25e7d362…`, lib/instrument.js `cca253ac…`; port 9341; no FTG process and no `Singleton*` file before; `session closed`, no FTG process and no `Singleton*` file after; both `.session` files absent before and after |
| only the seat used the window | the scroll readings and the recording's hosts, documents and writes | root scroll 0 → 0 across the landing, hover empty; one document load (the landing); hosts: the site, its API, analytics, error reporting, fonts and one GPU-benchmark file from a public package CDN (as in slots 2–6); exactly one write to the site's API (the create; listed twice, as the request and its interception); no page outside the site |
| one settlement made (plan 2.1b (6)) | the PUT status and the list before and after | PUT 200; the list's rows 7 → 8, the new row of size METROPOLIS carrying the PUT's settlement id; no retry |
| the slot bind is safe | `plan.py --bind-ftg 7=…`, then `--check` and a diff against the pre-bind copy | one line changed (slot 7's capture); SAME for both files; `metrics.m-1.json` byte-unchanged (`8a0efa7e…`). `plan.json` sha256 moves from `80d1a447…` to `703dd74b…`. |
| no account identifier in the files written | grep of the README, `capture-facts.json`, `create-request.json`, `request-diff.txt`, `structure.md`, `steps.jsonl`, this section, the header update, the JSON entry, the checklist line, the result file and this lane's `lane-events.log` lines for an email pattern, the display name, a token prefix and a full id | see the result file's privacy row |

### 18.3 Findings

1. **The size-dependent values repeat at METROPOLIS (CONFIRMED).** All 17 equal slot 6's, and the request differs from
   slot 6's only by the water options. The 17-value class needed no change (R-41: a size's later captures repeat its
   first capture's values).
2. **The coastal option again brings no new kind of difference (CONFIRMED).** As in slots 2–5, it adds the two water
   keys and the water-implied resource entry only; the METROPOLIS request carries the base's resource list, which is
   itself coastal with rivers on (`waterImplied` 0 against the base).
3. **Eight water bodies (count CONFIRMED; reading PLAUSIBLE).** Field 6 occurs 8 times: one polygon of 18 points with
   every coordinate within 356 m of the centre; four of 25, 14, 20 and 31 points whose coordinates stay within 1 423 to
   2 361 m, so they do not reach the border; and three of 140, 125 and 511 points that reach the 3 000 m border (the
   511-point one reaches a corner). Shot 014 shows the sea and a river in two branches. So the three border-reaching
   polygons are PLAUSIBLY the sea and the two branches, the small one PLAUSIBLY of the kind seen near the centre in
   slots 2 to 5 (9, 7, 8 and 20 points), and the four interior ones PLAUSIBLY ponds of the kind seen in slots 1 and 6.
   The decoding reproduces sections 15.3 and 17.3's polygons on slots 5 and 6 exactly.
4. **The coastal metropolis has a larger road graph than slot 6 (CONFIRMED; one draw per cell, no reading drawn).**
   15 327 edges and 12 284 nodes against slot 6's 13 193 and 10 819, with 14 617 buildings against 14 748; 74 wall
   towers against 93; 9 districts against 7. The BIG_CITY pair showed the same direction (slot 3's 11 121 edges against
   slot 1's 7 236; section 13.3 finding 4).
5. **The payload's paths are the earlier union exactly (CONFIRMED).** 198 distinct field paths, equal to the union of
   slots 0–6's 198: no new path and none absent; field 11's optional parts, which vary by draw, are all present here.
6. **The premium size behaves as before (CONFIRMED; times contended).** The payload is 2.23 MB (plan 2.1b (7): 2–3 MB)
   and the server time 15.2 s (slot 6: 11.1 s; ≈ 10 s expected; the machine was shared); the layout body arrived within
   the poll's first 15 s. The account list gives 49 184 people against the nominal 49 500 (slot 6: 49 780).

### 18.4 Calls and deviations (vetoable)

1. **No deviation from checklist sections H and I.** The `--full` shot of the settlements view (002) was taken as H3
   prescribes; the form and the map then ran in the 1440×632 window. Every click and select had a `text`, a `shot` and,
   for coordinate clicks, an `elementFromPoint` reading before it, and a form-state reading after it. The overview
   `--full` shot (015) carries the 500 m label this time.
2. **`SIZE_DEPENDENT` was not touched** (R-41 forbids widening it on a later capture of a size); the same-size check
   passed as it stands.
3. **A second visit to the settlements view after the create** (one guarded navigation click) read the list. It
   changed nothing.

### 18.5 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read) are every number in sections 18.1 and 18.2, findings 1, 2, 5 and 6, the counts in
findings 3 and 4, and the listed population. PLAUSIBLE (reasoning only) are what the eight field-6 polygons are, and
that the listed population is the generated resident count.

## 19 Slot 8 (programme 2) — 2026-10-04, METROPOLIS, `coast+river`

Lane `m1/W-02-slot8b`, under the owner's go for programme 2 (`owner-go.json`). One settlement was created, with one
create click, by checklist sections H (with H12's guarded clicks, H13's list count and H14's redacting helper) and I.
Before the create, slot 8 was open and slots 0–7 bound, the newest folder was slot 7's (its one create is slot 7's own),
no lane line named a slot-8 key, and the account list held 8 settlements (big town 3, big city 3, metropolis 2: the
earlier settlement and slots 1 to 7), so no slot-8 settlement existed. The landing's root scroll container read 0 at the
first reading and 0 again just before the "Home" click, and no hover was on the page: no sign of another hand.

### 19.1 The capture

| field (README) | value |
|---|---|
| capture id | `2026-10-04T03-26-16` |
| account | the owner's signed-in account, premium since J164; the list held 8 settlements before and 9 after (no counter) |
| size / rung | METROPOLIS / METROPOLIS (the premium-only size, plan 2.1b (2)) |
| `WaterSetting` | `coast+river` (the request's coast key coastal, rivers true) |
| population, source | 49 500, `nominal`. The account list gives 52 637 (section 9.1; recorded, not used). |
| server date; PUT sent | 2026-10-04 (UTC; 23:29 EDT on 2026-10-03); 03:29:30.073 UTC (the response date headers read 03:29:40 and 03:29:42 GMT) |
| server time | 10.296 s, from the PUT being sent to the layout GET being sent. **Contended**: M0's build seats and M-1 research seats shared the machine, so this feeds no time row (plan-check PC-11). |
| buildings | 15 606 |
| request hash | `c44c6dcbfacf`: sha256 of the exact 274 303-byte PUT body |
| `referenceBuild` | `ftg:2026-10-04+c44c6dcbfacf` |
| payload | 2 139 194 bytes, Fetch-intercepted (`intercept-0037…bin`, sha256 `564028957498418e…`) |
| road graph | 13 486 edges, 10 626 nodes |
| wall towers / water bodies / districts | 92 / 3 / 10 |
| settlement border | a square with half width 3 000.00 m, the size ladder's 6 000 m width |
| capture folder | 41 MB: 14 MB of session recording and 27 MB of screenshots at 2× (no CPU profile). Free disk: 10 GB before and after. |

**Form values.** The size was set to the metropolis option, chosen by its request key as in slots 6 and 7: the seat
read each size option's React element key by `eval`; exactly one of the 12 options carried `METROPOLIS`, and the
selected option's key was re-read after the select. The coast select was set to the coastal option, and the river,
forest, reserve-area and wall boxes were switched on; the farm box was already on. Everything else stayed at FTG's
default presets, and the name was left blank. All settings was never opened (shots 004–012; values verified by `eval`
before the create click). Every click and select was its own command after its readings, and every coordinate click had
an `elementFromPoint` reading naming its control; a form-state reading after each step showed the dialog still open
(`steps/steps.jsonl`, 20 shots). The 13 form, map and navigation commands equal slot 7's in order and coordinates. The
map (shot 014, 500 m bar) shows the sea along the north with a sandy shore and a small harbour basin, one straight river
from the south through the walled core into the sea, quarters on both banks and outside the wall, eight district labels
in view, fields to the west and east and open grassland to the south-east. The core shot (018) has a 250 m bar.

### 19.2 Checks (all executed 2026-10-04, CONFIRMED)

| check | how | result |
|---|---|---|
| all checks of `ftg_capture_post.py` | `--slot 8 --signed-in --premium`, `--check-only` first, then the writing run: exit 0 both times (the script unchanged since slot 6, `735922948e3970fb…`) | 10 of 10 pass: calls, size key, water keys, the request diff against the base, the diff against slot 0, the same-size values (**17 of 17 equal slot 6's**), decode, border, no resident field, `pb_raw` runs |
| the payload decodes: field 3 edges and nodes, field 8 buildings | `python3 tools/pb_raw.py <payload>` (the post script's run) | exit 0, 198 distinct field paths; 3.1 × 13 486, 3.2 × 10 626, 8 × 15 606, 7 × 92, 6 × 3, 10 × 10 |
| the request's size key and water keys equal the slot's (PC-16) | `create-request.json` | METROPOLIS; coast key coastal and rivers true |
| the request hash | sha256 of the PUT row's body, recomputed outside the script | `c44c6dcbfacf`, 274 303 bytes; exactly one PUT row with a body in the recording |
| the request equals slot 7's (the same cell) | a leaf diff of the two requests | **0 semantic differences**; only the 45 client-random partner ids differ. Both requests have the same 26 top-level keys. |
| the request differs from slot 6's (the same size) only by the water options | a leaf diff of the two requests | 8 semantic differences: the 2 water keys and 6 leaves of the raw-resource entry the water options add (the list shifts by one); 0 size-dependent; plus 45 partner ids |
| the request differs from slots 3 and 5 (BIG_CITY, the same water) only by the size | leaf diffs of the requests | 8 semantic differences each: the size key and the 7 size-dependent values that differ between BIG_CITY and METROPOLIS (section 17.3's table); plus 45 partner ids |
| the request differs from slot 4's (BIG_TOWN, the same water) only by the size | a leaf diff of the two requests | 16 semantic differences: the size key and 15 size-dependent values; plus 45 partner ids |
| the request differs from the base and from day 1 within the named classes | the script's `requestDiff` and `vsSlot0` | against the base: 16 semantic (the size key and 15 size-dependent), `other` 0; against day 1: 24 semantic (the size key, 2 water keys, 6 water-implied, 15 size-dependent), `other` 0 |
| the checks discriminate (red tests) | this capture checked as other slots, `--check-only` | as slot 0 and as slot 1 (`none`, other sizes): exit 1 (size key, water keys, request diff, diff against slot 0, border). As slot 5 (BIG_CITY, `coast+river`): exit 1 (size key, same-size, border). As slot 6 (METROPOLIS, `none`): exit 1 (water keys, request diff, diff against slot 0). As slots 7 and 9 (the same cell): exit 0, as it must be. |
| the runner is the profiler's code | `cmp` of the scratchpad copies against `profiler/` before the start | identical: session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…`, package.json `25e7d362…`, lib/instrument.js `cca253ac…`; port 9341; no FTG process and no `Singleton*` file before; `session closed`, no FTG process, no `Singleton*` file and port 9341 free after; both `.session` files absent before and after |
| only the seat used the window | the scroll readings and the recording's hosts, documents and writes | root scroll 0 → 0 across the landing, hover empty; one document load (the landing); hosts: the site, its API, the sign-in token service, analytics, error reporting, fonts and one GPU-benchmark file from a public package CDN (as in slots 2–7); exactly one write to the site's API (the create; listed twice, as the request and its interception); no page outside the site |
| one settlement made (plan 2.1b (6)) | the PUT status and the list before and after | PUT 200; the list's rows 8 → 9, the new row of size METROPOLIS carrying the PUT's settlement id; no retry |
| the slot bind is safe | `plan.py --bind-ftg 8=…`, then `--check` and a diff against the pre-bind copy | one line changed (slot 8's capture); SAME for both files; `metrics.m-1.json` byte-unchanged (`8a0efa7e…`); `plan.py` unchanged (`68709ba8…`). `plan.json` sha256 moves from `703dd74b…` to `c49c88ec…`. |
| no account identifier in the files written | grep of the README, `capture-facts.json`, `create-request.json`, `request-diff.txt`, `structure.md`, `steps.jsonl`, this section, the header update, the JSON entry, the checklist line, the result file and this lane's `lane-events.log` lines for an email pattern, the display name, a token prefix and a full id | see the result file's privacy row |

### 19.3 Findings

1. **The size-dependent values repeat at METROPOLIS a third time (CONFIRMED).** All 17 equal slot 6's. The 17-value
   class needed no change (R-41: a size's later captures repeat its first capture's values).
2. **The same request gives a different metropolis (CONFIRMED).** The request equals slot 7's in every value apart from
   the 45 client-random partner ids, yet the city differs: 15 606 buildings against 14 617, 13 486 edges and 10 626
   nodes against 15 327 and 12 284, 92 wall towers against 74, 3 water bodies against 8, 10 districts against 9. Slots
   4 and 5 found the same for the big town and the big city (sections 14.3, 15.3): the form's settings do not fix the
   result, and the server's own seed remains the PLAUSIBLE source.
3. **Three water bodies (count CONFIRMED; reading PLAUSIBLE).** Field 6 occurs 3 times: one polygon of 8 points with
   every coordinate within 254 m of the centre, and two of 145 and 128 points that reach the 3 000 m border (the
   128-point one reaches a corner). No polygon stays in the interior, where slot 7 had four and slot 6 one. Shot 014
   shows the sea along the north, one river from the south and a small harbour basin near the centre. So the corner
   polygon is PLAUSIBLY the sea, the other border-reaching one the river, and the small one PLAUSIBLY the harbour basin,
   of the kind seen near the centre in slots 2 to 5 and 7. The decoding reproduces section 18.3's eight polygons on
   slot 7 exactly.
4. **The payload's paths are the earlier union exactly (CONFIRMED).** 198 distinct field paths, equal to the union of
   slots 0–7's 198: no new path and none absent.
5. **The premium size behaves as before (CONFIRMED; times contended).** The payload is 2.14 MB (plan 2.1b (7): 2–3 MB)
   and the server time 10.3 s (slots 6 and 7: 11.1 and 15.2 s; ≈ 10 s expected; the machine was shared); the layout
   body arrived within the poll's first 10 s. The account list gives 52 637 people against the nominal 49 500 (slots 6
   and 7: 49 780 and 49 184).

### 19.4 Calls and deviations (vetoable)

1. **No deviation from checklist sections H and I.** The `--full` shot of the settlements view (002) was taken as H3
   prescribes; the form and the map then ran in the 1440×632 window. Every click and select had a `text`, a `shot` and,
   for coordinate clicks, an `elementFromPoint` reading before it, and a form-state reading after it. The overview
   `--full` shot (015) carries the 500 m label.
2. **`SIZE_DEPENDENT` was not touched** (R-41 forbids widening it on a later capture of a size); the same-size check
   passed as it stands.
3. **A second visit to the settlements view after the create** (one guarded navigation click) read the list. It
   changed nothing.
4. **The map toolbar's re-roll control was gone by the overview shot (015), before any zoom** (it shows in 014). H14
   expects it to vanish after a zoom; it was never clicked either way.

### 19.5 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read) are every number in sections 19.1 and 19.2, findings 1, 2 (the request equality and the
differing counts), 4 and 5, the counts in finding 3, and the listed population. PLAUSIBLE (reasoning only) are what the
three field-6 polygons are, that the server's seed makes two equal requests differ, and that the listed population is
the generated resident count.

## 20 Slot 9 (programme 2) — 2026-10-04, METROPOLIS, `coast+river`

Lane `m1/W-02-slot9b`, under the owner's go for programme 2 (`owner-go.json`). One settlement was created, with one
create click, by checklist sections H (with H12's guarded clicks, H13's list count and H14's redacting helper) and I.
Before the create, slot 9 was open and slots 0–8 bound, the newest folder was slot 8's (its one create is slot 8's own),
no lane line named a slot-9 key, and the account list held 9 settlements (big town 3, big city 3, metropolis 3: the
earlier settlement and slots 1 to 8), so no slot-9 settlement existed. The landing's root scroll container read 0 at the
first reading and 0 again just before the "Home" click, and no hover was on the page: no sign of another hand.

### 20.1 The capture

| field (README) | value |
|---|---|
| capture id | `2026-10-04T03-40-45` |
| account | the owner's signed-in account, premium since J164; the list held 9 settlements before and 10 after (no counter) |
| size / rung | METROPOLIS / METROPOLIS (the premium-only size, plan 2.1b (2)) |
| `WaterSetting` | `coast+river` (the request's coast key coastal, rivers true) |
| population, source | 49 500, `nominal`. The account list gives 48 622 (section 9.1; recorded, not used). |
| server date; PUT sent | 2026-10-04 (UTC; 23:43 EDT on 2026-10-03); 03:43:34.100 UTC (the response date headers read 03:43:48 and 03:43:50 GMT) |
| server time | 14.845 s, from the PUT being sent to the layout GET being sent. **Contended**: M0's build seats and M-1 research seats shared the machine, so this feeds no time row (plan-check PC-11). |
| buildings | 14 313 |
| request hash | `33678f1122ff`: sha256 of the exact 274 303-byte PUT body |
| `referenceBuild` | `ftg:2026-10-04+33678f1122ff` |
| payload | 2 298 752 bytes, Fetch-intercepted (`intercept-0035…bin`, sha256 `0b75dc85d4bca6b9…`) |
| road graph | 18 817 edges, 13 988 nodes |
| wall towers / water bodies / districts | 57 / 3 / 8 |
| settlement border | a square with half width 3 000.00 m, the size ladder's 6 000 m width |
| capture folder | 43 MB: 14 MB of session recording and 29 MB of screenshots at 2× (no CPU profile). Free disk: 10 GB before, 9.9 GB after. |

**Form values.** The size was set to the metropolis option, chosen by its request key as in slots 6–8: the seat read
each size option's React element key by `eval`; exactly one of the 12 options carried `METROPOLIS`, and the selected
option's key was re-read after the select. The coast select was set to the coastal option, and the river, forest,
reserve-area and wall boxes were switched on; the farm box was already on. Everything else stayed at FTG's default
presets, and the name was left blank. All settings was never opened (shots 004–012; values verified by `eval` before
the create click). Every click and select was its own command after its readings, and every coordinate click had an
`elementFromPoint` reading naming its control; a form-state reading after each step showed the dialog still open
(`steps/steps.jsonl`, 20 shots). The 13 form, map and navigation commands equal slots 7 and 8's in order and
coordinates. The map (shot 014, 500 m bar) shows the sea along the whole north with sandy shores, a harbour basin with
two piers just west of the river mouth, one straight river from the south through the walled core into the sea, the
wall a half ring against the shore, quarters on both banks and outside the wall, six district labels in view, fields to
the west and grassland to the east. The core shot (018) has a 250 m bar.

### 20.2 Checks (all executed 2026-10-04, CONFIRMED)

| check | how | result |
|---|---|---|
| all checks of `ftg_capture_post.py` | `--slot 9 --signed-in --premium`, `--check-only` first, then the writing run: exit 0 both times (the script unchanged since slot 6, `735922948e3970fb…`) | 10 of 10 pass: calls, size key, water keys, the request diff against the base, the diff against slot 0, the same-size values (**17 of 17 equal slot 6's**), decode, border, no resident field, `pb_raw` runs |
| the payload decodes: field 3 edges and nodes, field 8 buildings | `python3 tools/pb_raw.py <payload>` (the post script's run) | exit 0, 188 distinct field paths; 3.1 × 18 817, 3.2 × 13 988, 8 × 14 313, 7 × 57, 6 × 3, 10 × 8 |
| the request's size key and water keys equal the slot's (PC-16) | `create-request.json` | METROPOLIS; coast key coastal and rivers true |
| the request hash | sha256 of the PUT row's body, recomputed outside the script | `33678f1122ff`, 274 303 bytes; exactly one PUT row with a body in the recording |
| the request equals slots 7 and 8's (the same cell) | leaf diffs of the requests | **0 semantic differences** against each; only the 45 client-random partner ids differ. All three requests have the same 26 top-level keys. |
| the request differs from slot 6's (the same size) only by the water options | a leaf diff of the two requests | 8 semantic differences: the 2 water keys and 6 leaves of the raw-resource entry the water options add (the list shifts by one); 0 size-dependent; plus 45 partner ids |
| the request differs from slots 3 and 5 (BIG_CITY, the same water) only by the size | leaf diffs of the requests | 8 semantic differences each: the size key and the 7 size-dependent values that differ between BIG_CITY and METROPOLIS (section 17.3's table); plus 45 partner ids |
| the request differs from slot 4's (BIG_TOWN, the same water) only by the size | a leaf diff of the two requests | 16 semantic differences: the size key and 15 size-dependent values; plus 45 partner ids |
| the request differs from the base and from day 1 within the named classes | the script's `requestDiff` and `vsSlot0` | against the base: 16 semantic (the size key and 15 size-dependent), `other` 0; against day 1: 24 semantic (the size key, 2 water keys, 6 water-implied, 15 size-dependent), `other` 0 |
| the checks discriminate (red tests) | this capture checked as other slots, `--check-only` | as slot 0 and as slot 1 (`none`, other sizes): exit 1 (size key, water keys, request diff, diff against slot 0, border). As slot 5 (BIG_CITY, `coast+river`): exit 1 (size key, same-size, border). As slot 6 (METROPOLIS, `none`): exit 1 (water keys, request diff, diff against slot 0). As slots 7 and 8 (the same cell): exit 0, as it must be. |
| the runner is the profiler's code | `cmp` of the scratchpad copies against `profiler/` before the start | identical: session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…`, package.json `25e7d362…`, lib/instrument.js `cca253ac…`; port 9341; no FTG process and no `Singleton*` file before; `session closed`, no FTG process, no `Singleton*` file and port 9341 free after; both `.session` files absent before and after |
| only the seat used the window | the scroll readings and the recording's hosts, documents and writes | root scroll 0 → 0 across the landing, hover empty; one document load (the landing); hosts: the site, its API, analytics, error reporting, fonts and one GPU-benchmark file from a public package CDN (as in slots 2–8); exactly one write to the site's API (the create; listed twice, as the request and its interception); no page outside the site |
| one settlement made (plan 2.1b (6)) | the PUT status and the list before and after | PUT 200; the list's rows 9 → 10, the new row of size METROPOLIS carrying the PUT's settlement id; no retry |
| the slot bind is safe | `plan.py --bind-ftg 9=…`, then `--check` and a diff against the pre-bind copy | one line changed (slot 9's capture); SAME for both files; `metrics.m-1.json` byte-unchanged (`8a0efa7e…`); `plan.py` unchanged (`68709ba8…`). `plan.json` sha256 moves from `c49c88ec…` to `b60b1889…`. |
| no account identifier in the files written | grep of the README, `capture-facts.json`, `create-request.json`, `request-diff.txt`, `structure.md`, `steps.jsonl`, this section, the header update, the JSON entry, the checklist line, the result file and this lane's `lane-events.log` lines for an email pattern, the display name, a token prefix and a full id | see the result file's privacy row |

### 20.3 Findings

1. **The size-dependent values repeat at METROPOLIS a fourth time (CONFIRMED).** All 17 equal slot 6's. The 17-value
   class needed no change (R-41: a size's later captures repeat its first capture's values). The four METROPOLIS slots
   (6–9) are now taken: one `none` and three `coast+river`, as plan 2.1b's table sets them.
2. **The same request gives a third different metropolis (CONFIRMED).** The request equals slots 7 and 8's in every
   value apart from the 45 client-random partner ids, yet the city differs from both: 14 313 buildings against 14 617
   and 15 606, 18 817 edges and 13 988 nodes against 15 327 / 12 284 and 13 486 / 10 626, 57 wall towers against 74
   and 92, 3 water bodies against 8 and 3, 8 districts against 9 and 10. Over the three equal requests the building
   count spans 14 313–15 606 and the edge count 13 486–18 817. The server's own seed remains the PLAUSIBLE source
   (sections 14.3, 15.3, 19.3).
3. **Three water bodies (count CONFIRMED; reading PLAUSIBLE).** Field 6 occurs 3 times: one polygon of 14 points with
   every coordinate within 276 m of the centre, and two of 136 and 139 points that reach the 3 000 m border (the
   139-point one reaches a corner). No polygon stays in the interior. Shot 014 shows the sea along the north, one river
   from the south and a harbour basin with two piers by the river mouth. So the corner polygon is PLAUSIBLY the sea, the
   other border-reaching one the river, and the small one PLAUSIBLY the harbour basin, as in slot 8. The decoding
   reproduces section 19.3's three polygons on slot 8 exactly (8, 145 and 128 points).
4. **The payload's paths are a subset of the earlier union (CONFIRMED).** 188 distinct field paths, none new; the 10 of
   the union of slots 0–8's 198 that are absent are field 11's optional parts 11.1 and 11.7, which vary by draw (11.1
   is absent in slots 2–4 too, 11.7 in slots 1, 3, 4 and 6; section 17.3 finding 4). No check reads field 11.
5. **The premium size behaves as before (CONFIRMED; times contended).** The payload is 2.30 MB (plan 2.1b (7): 2–3 MB)
   and the server time 14.8 s (slots 6–8: 11.1, 15.2 and 10.3 s; ≈ 10 s expected; the machine was shared); the layout
   body was in the folder at the second poll, 21 s after the click. The account list gives 48 622 people against the nominal 49 500 (slots
   6–8: 49 780, 49 184 and 52 637).
6. **The account now holds 10 settlements (CONFIRMED), the free tier's stated limit.** The premium account shows no
   counter and raised no prompt. Whether a create would be refused if the premium month lapsed is PLAUSIBLE only (the
   landing's membership text gives free accounts a limit of 10); section I's stop rule covers it either way.

### 20.4 Calls and deviations (vetoable)

1. **No deviation from checklist sections H and I.** The `--full` shot of the settlements view (002) was taken as H3
   prescribes; the form and the map then ran in the 1440×632 window. Every click and select had a `text`, a `shot` and,
   for coordinate clicks, an `elementFromPoint` reading before it, and a form-state reading after it. The overview
   `--full` shot (015) carries the 500 m label.
2. **`SIZE_DEPENDENT` was not touched** (R-41 forbids widening it on a later capture of a size); the same-size check
   passed as it stands.
3. **A second visit to the settlements view after the create** (one guarded navigation click) read the list. It
   changed nothing.
4. **The map toolbar's re-roll control showed in shots 014 and 015 and was gone after the zooms (018)**, as H14
   expects; slot 8 saw it gone before any zoom. It was never clicked.

### 20.5 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read) are every number in sections 20.1 and 20.2, findings 1, 2 (the request equality and the
differing counts), 4 and 5, the counts in finding 3, the account's row count in finding 6, and the listed population.
PLAUSIBLE (reasoning only) are what the three field-6 polygons are, that the server's seed makes equal requests differ,
that a lapsed premium would refuse an eleventh settlement, and that the listed population is the generated resident
count.

## 21 Slot 10 (programme 2) — 2026-10-04, BIG_TOWN, `none`

Lane `m1/W-02-slot10b`, under the owner's go for programme 2 (`owner-go.json`). One settlement was created, with one
create click, by checklist sections H (with H12's guarded clicks, H13's list count and H14's redacting helper) and I.
Before the create, slot 10 was open and slots 0–9 bound, the newest folder was slot 9's (its one create is slot 9's own),
no lane line named a slot-10 key, and the account list held 10 settlements (big town 3, big city 3, metropolis 4: the
earlier settlement and slots 1 to 9), so no slot-10 settlement existed. The landing's root scroll container read 0 at
the first reading and 0 again just before the "Home" click, and no hover was on the page: no sign of another hand.

### 21.1 The capture

| field (README) | value |
|---|---|
| capture id | `2026-10-04T03-53-59` |
| account | the owner's signed-in account, premium since J164; the list held 10 settlements before and 11 after (no counter) |
| size / rung | BIG_TOWN / TOWN |
| `WaterSetting` | `none` (the request's coast key empty, rivers false) |
| population, source | 5 600, `nominal`. The account list gives 5 544 (section 9.1; recorded, not used). |
| server date; PUT sent | 2026-10-04 (UTC; 23:56 EDT on 2026-10-03); 03:56:52.279 UTC (the response date headers read 03:56:54 GMT both) |
| server time | 1.934 s, from the PUT being sent to the layout GET being sent. **Contended**: M0's build seats and M-1 research seats shared the machine, so this feeds no time row (plan-check PC-11). |
| buildings | 1 675 |
| request hash | `7fb2f6163913`: sha256 of the exact 274 285-byte PUT body |
| `referenceBuild` | `ftg:2026-10-04+7fb2f6163913` |
| payload | 376 467 bytes, Fetch-intercepted (`intercept-0035…bin`, sha256 `4bc34421814d705d…`) |
| road graph | 3 288 edges, 2 895 nodes |
| wall towers / water bodies / districts | 17 / 0 / 2 |
| settlement border | a square with half width 2 000.00 m, the size ladder's 4 000 m width |
| capture folder | 36 MB: 12 MB of session recording and 23 MB of screenshots at 2× (no CPU profile). Free disk: 9.7 GB before, 9.5 GB after the session. |

**Form values.** The size was set to the big-town option, chosen by its request key as in slots 6–9: the seat read each
size option's React element key by `eval`; exactly one of the 12 options carried `BIG_TOWN`, and the selected option's
key was re-read after the select. The metropolis option was not touched. The water was the form's own default: no
coast, rivers off. The farm box was already on; the forest, reserve-area and wall boxes were switched on. Everything
else stayed at FTG's default presets, and the name was left blank. All settings was never opened (shots 004–010; values
verified by `eval` before the create click). Every click and select was its own command after its readings, and every
coordinate click had an `elementFromPoint` reading naming its control; a form-state reading after each step showed the
dialog still open (`steps/steps.jsonl`, 18 shots). The 11 form, map and navigation commands equal slots 1 and 6's (the
other signed-in `none` captures) in order and coordinates, apart from the size option's text. The map (shot 012, 500 m
bar) shows a small town: a walled core with one district label inside the wall and one outside it, houses strung along
the roads to the north and south-east, hedged fields to the west and north, open grassland to the east, forest in the
north-east and south-west corners, and no water. The core shot (016) has a 250 m bar.

### 21.2 Checks (all executed 2026-10-04, CONFIRMED)

| check | how | result |
|---|---|---|
| all checks of `ftg_capture_post.py` | `--slot 10 --signed-in --premium`, `--check-only` first, then the writing run: exit 0 both times (the script unchanged since slot 6, `735922948e3970fb…`) | 10 of 10 pass: calls, size key, water keys, the request diff against the base, the diff against slot 0, the same-size values (**17 of 17 equal slot 0's**), decode, border, no resident field, `pb_raw` runs |
| the payload decodes: field 3 edges and nodes, field 8 buildings | `python3 tools/pb_raw.py <payload>` (the post script's run) | exit 0, 172 distinct field paths; 3.1 × 3 288, 3.2 × 2 895, 8 × 1 675, 7 × 17, 6 × 0, 10 × 2; `structure.md` equals a fresh run apart from its title path and trailing newline |
| the request's size key and water keys equal the slot's (PC-16) | `create-request.json` | BIG_TOWN; coast key empty and rivers false |
| the request hash | sha256 of the PUT row's body, recomputed outside the script | `7fb2f6163913`, 274 285 bytes; exactly one PUT row with a body in the recording; `create-request.json` parses to the same object |
| the request equals slot 0's (the same cell; the guest capture of day 1) | a leaf diff of the two requests | **0 semantic differences**; only the 45 client-random partner ids differ. Both requests have the same 26 top-level keys. |
| the request differs from slots 2 and 4 (BIG_TOWN, `coast+river`) only by the water options | leaf diffs of the requests | 8 semantic differences each: the 2 water keys and 6 leaves of the raw-resource entry the water options add (the list shifts by one); 0 size-dependent; plus 45 partner ids |
| the request differs from slot 1's (BIG_CITY, the same water) only by the size | a leaf diff of the two requests | 15 semantic differences: the size key and the 14 size-dependent values that differ between BIG_CITY and BIG_TOWN (section 17.3's table); plus 45 partner ids |
| the request differs from slot 6's (METROPOLIS, the same water) only by the size | a leaf diff of the two requests | 16 semantic differences: the size key and 15 size-dependent values; plus 45 partner ids |
| the request differs from the base within the named classes | the script's `requestDiff` and `vsSlot0` | against the base: 20 semantic (3 slot keys, 6 water-implied, 11 size-dependent), `other` 0; against day 1: 0 semantic |
| the checks discriminate (red tests) | this capture checked as other slots, `--check-only` | as slot 0 (the same cell): exit 0, as it must be. As slot 1 (BIG_CITY, `none`) and as slot 6 (METROPOLIS, `none`): exit 1 (size key, border). As slots 2 and 4 (BIG_TOWN, `coast+river`): exit 1 (water keys, request diff, diff against slot 0). As slot 5 (BIG_CITY, `coast+river`) and slot 9 (METROPOLIS, `coast+river`): exit 1 (size key, water keys, request diff, diff against slot 0, same-size, border). |
| the runner is the profiler's code | `cmp` of the scratchpad copies against `profiler/` before the start | identical: session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…`, package.json `25e7d362…`, lib/instrument.js `cca253ac…`; port 9341; no FTG process and no `Singleton*` file before; `session closed`, no FTG process, no `Singleton*` file and port 9341 free after; both `.session` files absent before and after |
| only the seat used the window | the scroll readings and the recording's hosts, documents and writes | root scroll 0 → 0 across the landing, hover empty; one document load (the landing); hosts: the site, its API, analytics, error reporting, fonts and one GPU-benchmark file from a public package CDN (as in slots 2–9); exactly one write to the site's API (the create; listed twice, as the request and its interception); no page outside the site |
| one settlement made (plan 2.1b (6)) | the PUT status and the list before and after | PUT 200; the list's rows 10 → 11, the new row of size BIG_TOWN carrying the PUT's settlement id; no retry |
| the slot bind is safe | `plan.py --bind-ftg 10=…`, then `--check` and a diff against the pre-bind copy | one line changed (slot 10's capture); SAME for both files; `metrics.m-1.json` byte-unchanged (`8a0efa7e…`); `plan.py` unchanged (`68709ba8…`). `plan.json` sha256 moves from `b60b1889…` to `9dc339ec…`. |
| no account identifier in the files written | grep of the README, `capture-facts.json`, `create-request.json`, `request-diff.txt`, `structure.md`, `steps.jsonl`, this section, the header update, the JSON entry, the checklist line, the result file and this lane's `lane-events.log` lines for an email pattern, the display name, a token prefix and a full id | see the result file's privacy row |

### 21.3 Findings

1. **The size-dependent values repeat at BIG_TOWN a fourth time (CONFIRMED).** All 17 equal slot 0's, as slots 2 and 4
   found. The 17-value class needed no change (R-41: a size's later captures repeat its first capture's values).
2. **The signed-in premium flow sends the guest flow's request (CONFIRMED).** Slot 0 was made on day 1 in the guest flow
   (no account, the temporary-settlement dialog); slot 10 in the owner's premium account. For the same cell the two
   requests are equal in every value apart from the 45 client-random partner ids. Neither the account nor premium
   changes what the form sends (section 10.3 finding 4 found the same for the wire's shape).
3. **The same request gives a different town (CONFIRMED).** Against slot 0, the same cell and an equal request: 1 675
   buildings against 1 694, 3 288 edges and 2 895 nodes against 3 266 and 3 003, 17 wall towers against 25, 2 districts
   against 3; both have 0 water bodies. The four BIG_TOWN slots now span 1 675–1 880 buildings. The server's own seed
   remains the PLAUSIBLE source (sections 14.3, 19.3).
4. **No water body (CONFIRMED).** Field 6 is absent, as in slot 0; the overview shows no water. The ponds of slots 1 and
   6 (BIG_CITY and METROPOLIS, the same water) have no BIG_TOWN counterpart in two draws.
5. **The payload's paths are a subset of the earlier union (CONFIRMED), with one path seen absent for the first time.**
   172 distinct field paths, none new. Of the 26 absent from the union of slots 0–9's 198: field 6 and its parts (no
   water body, as in slot 0), 10.3 (absent in slot 0 too), field 11's optional parts 11.1, 11.6, 11.7 and 11.8.2 (each
   absent in earlier captures too), and **9.2.4**, present in every earlier capture. Taken in the order of the
   polygon's fields in the client's field list (`research/findings/code-ftg-client.md` §2.1, field 9: id, outline,
   texture type, raised flag, draw height, colour), 9.2.4 is the raised flag; its values are all 1 where it occurs
   (the order mapping is PLAUSIBLE, the counts CONFIRMED). Slot 0 carried it on all 4 polygons of one texture group
   (type 8), and that group is absent here: 9 groups and 519 polygons, none flagged. The findings name the raised
   ground cover as road paving drawn above the roads, so this town PLAUSIBLY has no paved patch. No check reads
   field 9.
6. **The premium account took an eleventh settlement with no prompt (CONFIRMED).** The list held 10 rows before (the
   free tier's stated limit) and 11 after; no limit, payment or upgrade prompt appeared. Section 20.3 finding 6's
   question (would a lapsed premium refuse an eleventh?) stays PLAUSIBLE only: premium is still active.
7. **Server time and payload (CONFIRMED; time contended).** The payload is 0.38 MB (slot 0: 0.40 MB) and the server
   time 1.9 s (slots 0, 2 and 4: 2.6, 1.9 and 2.2 s); the layout body was in the folder at the poll's first look, within
   a few seconds of the click. The account list gives 5 544 people against the nominal 5 600 (slots 2 and 4: 5 906 and
   6 221).

### 21.4 Calls and deviations (vetoable)

1. **No deviation from checklist sections H and I.** The `--full` shot of the settlements view (002) was taken as H3
   prescribes; the form and the map then ran in the 1440×632 window. Every click and select had a `text`, a `shot` and,
   for coordinate clicks, an `elementFromPoint` reading before it, and a form-state reading after it. The coast select
   and the rivers box were already at the slot's values (the form's defaults), so neither was touched, as in slots 1
   and 6.
2. **`SIZE_DEPENDENT` was not touched** (R-41 forbids widening it on a later capture of a size); the same-size check
   passed as it stands.
3. **A second visit to the settlements view after the create** (one guarded navigation click) read the list. It
   changed nothing.
4. **The overview `--full` shot (013) drew the scale bar without its label**; the window shot just before it (012) reads
   500 m and shows the same view. The re-roll control showed in 012 and 013 and was gone after the zooms (016), as H14
   expects. It was never clicked.

### 21.5 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read) are every number in sections 21.1 and 21.2, findings 1, 2, 3 (the request equality and the
differing counts), 4, 6 and 7, the path counts and the 9.2.4 counts in finding 5, and the listed population.
PLAUSIBLE (reasoning only) are that 9.2.4 is the raised flag and the absent group road paving, that the server's seed
makes equal requests differ, that a lapsed premium would refuse a further settlement, and that the listed population is
the generated resident count.

## 22 Slot 11 (programme 2) — 2026-10-04, BIG_CITY, `none`

Lane `m1/W-02-slot11b`, under the owner's go for programme 2 (`owner-go.json`). One settlement was created, with one
create click, by checklist sections H (with H12's guarded clicks, H13's list count and H14's redacting helper) and I.
Before the create, slot 11 was open and slots 0–10 bound, the newest folder was slot 10's (its one create is slot 10's
own), no lane line named a slot-11 key, and the account list held 11 settlements (big town 4, big city 3, metropolis 4:
the earlier settlement and slots 1 to 10), so no slot-11 settlement existed. The landing's root scroll container read 0
at the first reading and 0 again just before the "Home" click, and no hover was on the page: no sign of another hand.

### 22.1 The capture

| field (README) | value |
|---|---|
| capture id | `2026-10-04T04-07-26` |
| account | the owner's signed-in account, premium since J164; the list held 11 settlements before and 12 after (no counter) |
| size / rung | BIG_CITY / CITY |
| `WaterSetting` | `none` (the request's coast key empty, rivers false) |
| population, source | 24 500, `nominal`. The account list gives 24 961 (section 9.1; recorded, not used). |
| server date; PUT sent | 2026-10-04 (UTC; 00:10 EDT); 04:10:11.464 UTC (the response date headers read 04:10:17 and 04:10:18 GMT) |
| server time | 6.161 s, from the PUT being sent to the layout GET being sent. **Contended**: M0's build seats and M-1 research seats shared the machine, so this feeds no time row (plan-check PC-11). |
| buildings | 7 376 |
| request hash | `6a23599e2e24`: sha256 of the exact 274 288-byte PUT body |
| `referenceBuild` | `ftg:2026-10-04+6a23599e2e24` |
| payload | 1 188 620 bytes, Fetch-intercepted (`intercept-0035…bin`, sha256 `b8822d66f4921f81…`) |
| road graph | 8 427 edges, 6 835 nodes |
| wall towers / water bodies / districts | 62 / 0 / 6 |
| settlement border | a square with half width 2 750.00 m, the size ladder's 5 500 m width |
| capture folder | 41 MB: 13 MB of session recording and 28 MB of screenshots at 2× (no CPU profile). Free disk: 10 GB before, 9.8 GB after the session. |

**Form values.** The size was set to the big-city option, chosen by its request key as in slots 6–10: the seat read each
size option's React element key by `eval`; exactly one of the 12 options carried `BIG_CITY`, and the selected option's
key was re-read after the select. The metropolis option was not touched. The water was the form's own default: no
coast, rivers off. The farm box was already on; the forest, reserve-area and wall boxes were switched on. Everything
else stayed at FTG's default presets, and the name was left blank. All settings was never opened (shots 004–010; values
verified by `eval` before the create click). Every click and select was its own command after its readings, and every
coordinate click had an `elementFromPoint` reading naming its control; a form-state reading after each step showed the
dialog still open (`steps/steps.jsonl`, 18 shots). The 11 form, map and navigation commands equal slot 1's (the first
big city, the same cell) in order, coordinates and size text, and slots 6 and 10's apart from the size option's text.
The map (shot 012, 500 m bar) shows a city with an oval walled core holding two district labels, four more districts
outside the wall (west, south, east, and a small one by the wall to the north), dense houses spreading along the roads
on every side, hedged fields of crops and pasture all round, a wood at the southern edge, and no water. The core shot
(016) has a 250 m bar.

### 22.2 Checks (all executed 2026-10-04, CONFIRMED)

| check | how | result |
|---|---|---|
| all checks of `ftg_capture_post.py` | `--slot 11 --signed-in --premium`, `--check-only` first, then the writing run: exit 0 both times (the script unchanged since slot 6, `735922948e3970fb…`) | 10 of 10 pass: calls, size key, water keys, the request diff against the base, the diff against slot 0, the same-size values (**17 of 17 equal slot 1's**), decode, border, no resident field, `pb_raw` runs |
| the payload decodes: field 3 edges and nodes, field 8 buildings | `python3 tools/pb_raw.py <payload>` (the post script's run) | exit 0, 184 distinct field paths; 3.1 × 8 427, 3.2 × 6 835, 8 × 7 376, 7 × 62, 6 × 0, 10 × 6; `structure.md` equals a fresh run apart from its title path |
| the request's size key and water keys equal the slot's (PC-16) | `create-request.json` | BIG_CITY; coast key empty and rivers false |
| the request hash | sha256 of the PUT row's body, recomputed outside the script | `6a23599e2e24`, 274 288 bytes; exactly one PUT row with a body in the recording; `create-request.json` parses to the same object |
| the request equals slot 1's (the same cell) | a leaf diff of the two requests | **0 semantic differences**; only the 45 client-random partner ids differ. Both requests have the same 26 top-level keys. |
| the request differs from slots 3 and 5 (BIG_CITY, `coast+river`) only by the water options | leaf diffs of the requests | 8 semantic differences each: the 2 water keys and 6 leaves of the raw-resource entry the water options add (the list shifts by one); 0 size-dependent; plus 45 partner ids |
| the request differs from slots 0 and 10 (BIG_TOWN, the same water) only by the size | leaf diffs of the requests | 15 semantic differences each: the size key and the 14 size-dependent values that differ between BIG_TOWN and BIG_CITY (section 10.3's table); plus 45 partner ids |
| the request differs from slot 6's (METROPOLIS, the same water) only by the size | a leaf diff of the two requests | 8 semantic differences: the size key and 7 size-dependent values (the random-faction count, four first-stage values, the second stage's spoke cap, the religious-workers share); plus 45 partner ids |
| the request differs from the base within the named classes | the script's `requestDiff` and `vsSlot0` | against the base: 19 semantic (3 slot keys, 6 water-implied, 10 size-dependent), `other` 0; against day 1: 15 semantic (14 size-dependent), `other` 0 |
| the checks discriminate (red tests) | this capture checked as other slots, `--check-only` | as slot 1 (the same cell): exit 0, as it must be. As slots 0 and 6 (BIG_TOWN and METROPOLIS, `none`; each its size's first): exit 1 (size key, border). As slot 10 (BIG_TOWN, `none`, a later draw): exit 1 (size key, same-size, border). As slots 3 and 5 (BIG_CITY, `coast+river`): exit 1 (water keys, request diff, diff against slot 0). As slot 9 (METROPOLIS, `coast+river`): exit 1 (size key, water keys, request diff, diff against slot 0, same-size, border). |
| the runner is the profiler's code | `cmp` of the scratchpad copies against `profiler/` before the start | identical: session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…`, package.json `25e7d362…`, lib/instrument.js `cca253ac…`; port 9341; no FTG process and no `Singleton*` file before; `session closed`, no FTG process, no `Singleton*` file and port 9341 free after; both `.session` files absent before and after |
| only the seat used the window | the scroll readings and the recording's hosts, documents and writes | root scroll 0 → 0 across the landing, hover empty; one document load (the landing); hosts: the site, its API, analytics, error reporting, fonts and one GPU-benchmark file from a public package CDN (as in slots 2–10); exactly one write to the site's API (the create; listed twice, as the request and its interception); no page outside the site |
| one settlement made (plan 2.1b (6)) | the PUT status and the list before and after | PUT 200; the list's rows 11 → 12, the new row of size BIG_CITY carrying the PUT's settlement id; no retry |
| the slot bind is safe | `plan.py --bind-ftg 11=…`, then `--check` and a diff against the pre-bind copy | one line changed (slot 11's capture); SAME for both files; `metrics.m-1.json` byte-unchanged (`8a0efa7e…`); `plan.py` unchanged (`68709ba8…`). `plan.json` sha256 moves from `9dc339ec…` to `b50adff0…`. |
| no account identifier in the files written | grep of the README, `capture-facts.json`, `create-request.json`, `request-diff.txt`, `structure.md`, `steps.jsonl`, this section, the header update, the JSON entry, the checklist line, the result file and this lane's `lane-events.log` lines for an email pattern, the display name, a token prefix and a full id | see the result file's privacy row |

### 22.3 Findings

1. **The size-dependent values repeat at BIG_CITY a fourth time (CONFIRMED).** All 17 equal slot 1's, as slots 3 and 5
   found. The 17-value class needed no change (R-41: a size's later captures repeat its first capture's values).
2. **Premium sends the free account's request (CONFIRMED).** Slot 1 was made in the owner's free account (J163), slot 11
   in the same account after the premium subscription (J164). For the same cell the two requests are equal in every
   value apart from the 45 client-random partner ids, as slot 10 found against the guest flow (section 21.3 finding 2).
3. **The same request gives a different city (CONFIRMED).** Against slot 1, the same cell and an equal request: 7 376
   buildings against 7 164, 8 427 edges and 6 835 nodes against 7 236 and 6 302, 62 wall towers against 66, 6 districts
   against 5, 0 water bodies against 3. The four BIG_CITY slots now span 7 164–7 376 buildings. The server's own seed
   remains the PLAUSIBLE source (sections 14.3, 19.3, 21.3).
4. **The ponds of slot 1 do not come with the cell (CONFIRMED).** Field 6 is absent here, where slot 1 (the same size,
   water options and request) had 3 water bodies, which section 10.3 finding 3 read as ponds independent of the water
   options. So at BIG_CITY with no coast and no river, standing water appears in some draws and not others: it is not
   set by the request. That the slot-1 bodies are ponds stays PLAUSIBLE.
5. **The payload's paths are a subset of the earlier union (CONFIRMED).** 184 distinct field paths, none new. Of the 14
   absent from the union of slots 0–10's 198: field 6 and its parts (no water body, as in slots 0 and 10), 11.7 and its
   parts (absent in slots 1, 3, 4, 6, 9 and 10 too) and 11.8.2 and its parts (absent in slots 0, 1, 3, 4, 6 and 10 too).
   Path 9.2.4 (by the client's field order the ground-cover raised flag, PLAUSIBLE; section 21.3 finding 5), absent in
   slot 10, is present here on 27 polygons, all with the value 1 (slot 1: 9).
6. **The premium account took a twelfth settlement with no prompt (CONFIRMED).** The list held 11 rows before and 12
   after; no limit, payment or upgrade prompt appeared. Whether a lapsed premium would refuse one stays PLAUSIBLE only.
7. **Server time and payload (CONFIRMED; time contended).** The payload is 1.19 MB (slot 1: 1.13 MB) and the server time
   6.2 s (slots 1, 3 and 5: 5.7, 6.3 and 6.0 s); the layout body was in the folder at the poll's first look, within
   seconds of the click. The account list gives 24 961 people against the nominal 24 500 (slots 1, 3 and 5: 24 367,
   24 755 and 24 597).

### 22.4 Calls and deviations (vetoable)

1. **No deviation from checklist sections H and I.** The `--full` shot of the settlements view (002) was taken as H3
   prescribes; the form and the map then ran in the 1440×632 window. Every click and select had a `text`, a `shot` and,
   for coordinate clicks, an `elementFromPoint` reading before it, and a form-state reading after it. The coast select
   and the rivers box were already at the slot's values (the form's defaults), so neither was touched, as in slots 1,
   6 and 10.
2. **`SIZE_DEPENDENT` was not touched** (R-41 forbids widening it on a later capture of a size); the same-size check
   passed as it stands.
3. **A second visit to the settlements view after the create** (one guarded navigation click) read the list. It
   changed nothing.
4. **The hover reading before the create click named the walled box**, the point of the seat's own last click (the
   driver leaves its pointer there); it is not a sign of another hand. The re-roll control showed in the overview shots
   (012, 013) and was gone after the zooms (016), as H14 expects. It was never clicked.

### 22.5 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read) are every number in sections 22.1 and 22.2, findings 1, 2, 3 (the request equality and the
differing counts), 4 (the field-6 counts), 6 and 7, the path counts and the 9.2.4 counts in finding 5, and the listed
population. PLAUSIBLE (reasoning only) are that the server's seed makes equal requests differ, that slot 1's water
bodies are ponds, that 9.2.4 is the raised flag, that a lapsed premium would refuse a further settlement, and that the
listed population is the generated resident count.

## 23 Slot 12 (programme 2) — 2026-10-04, BIG_TOWN, `coast+river`

Lane `m1/W-02-slot12b`, under the owner's go for programme 2 (`owner-go.json`). One settlement was created, with one
create click, by checklist sections H (with H12's guarded clicks, H13's list count and H14's redacting helper) and I.
Before the create, slot 12 was open and slots 0–11 bound, the newest folder was slot 11's (its one create is slot 11's
own), no lane line named a slot-12 key, and the account list held 12 settlements (big town 4, big city 4, metropolis 4:
the earlier settlement and slots 1 to 11), so no slot-12 settlement existed. The landing's root scroll container read 0
at the first reading and 0 again just before the "Home" click, and no hover was on the page: no sign of another hand.

### 23.1 The capture

| field (README) | value |
|---|---|
| capture id | `2026-10-04T04-20-04` |
| account | the owner's signed-in account, premium since J164; the list held 12 settlements before and 13 after (no counter) |
| size / rung | BIG_TOWN / TOWN |
| `WaterSetting` | `coast+river` (the request's coast key coastal, rivers true) |
| population, source | 5 600, `nominal`. The account list gives 5 491 (section 9.1; recorded, not used). |
| server date; PUT sent | 2026-10-04 (UTC; 00:23 EDT); 04:23:58.673 UTC (the response date headers read 04:24:02 and 04:24:03 GMT) |
| server time | 4.445 s, from the PUT being sent to the layout GET being sent. **Contended**: M0's build seats and M-1 research seats shared the machine, so this feeds no time row (plan-check PC-11). |
| buildings | 1 610 |
| request hash | `6a10a6990446`: sha256 of the exact 274 296-byte PUT body |
| `referenceBuild` | `ftg:2026-10-04+6a10a6990446` |
| payload | 389 668 bytes, Fetch-intercepted (`intercept-0035…bin`, sha256 `5f029ddbde650f80…`) |
| road graph | 2 987 edges, 2 639 nodes; **0 wall edges** (edge type 7) |
| wall towers / water bodies / districts | **0** (field 7 absent) / 4 / 2 |
| settlement border | a square with half width 2 000.00 m, the size ladder's 4 000 m width |
| capture folder | 36 MB: 12 MB of session recording and 24 MB of screenshots at 2× (no CPU profile). Free disk: 9.9 GB before, 9.7 GB after the session. |

**Form values.** The size was set to the big-town option, chosen by its request key as in slots 6–11: the seat read each
size option's React element key by `eval`; exactly one of the 12 options carried `BIG_TOWN`, and the selected option's
key was re-read after the select. The metropolis option was not touched. The coast select was set to the coastal option,
and the river, forest, reserve-area and wall boxes were switched on; the farm box was already on. Everything else stayed
at FTG's default presets, and the name was left blank. All settings was never opened (shots 004–012; values verified by
`eval` before the create click). Every click and select was its own command after its readings, and every coordinate
click had an `elementFromPoint` reading naming its control; a form-state reading after each step showed the dialog still
open (`steps/steps.jsonl`, 20 shots). The 13 form, map and navigation commands equal slots 2 and 4's (the same cell) in
order, coordinates and size text. The map (shot 014, 500 m bar) shows the sea along the north, a river from the
south-south-west reaching it at a harbour quarter with a basin and quays, a long sand spit with houses running east
along the shore (one district label), the town south of the harbour (the second district label), hedged fields all
round and a large wood to the south. **No wall is drawn.** The core shot (018) has a 250 m bar.

### 23.2 Checks (all executed 2026-10-04, CONFIRMED)

| check | how | result |
|---|---|---|
| all checks of `ftg_capture_post.py` | `--slot 12 --signed-in --premium`, `--check-only` first, then the writing run: exit 0 both times (the script unchanged since slot 6, `735922948e3970fb…`) | 10 of 10 pass: calls, size key, water keys, the request diff against the base, the diff against slot 0, the same-size values (**17 of 17 equal slot 0's**), decode, border, no resident field, `pb_raw` runs |
| the payload decodes: field 3 edges and nodes, field 8 buildings | `python3 tools/pb_raw.py <payload>` (the post script's run, and a fresh run) | exit 0, 181 distinct field paths; 3.1 × 2 987, 3.2 × 2 639, 8 × 1 610, 7 × 0 (absent), 6 × 4, 10 × 2; `structure.md` equals a fresh run apart from its title path |
| the wall in the payload | `research/baselines/adapters/ftg.py`'s decoder over slots 0–12, edges counted by type | slot 12: 0 type-7 (wall) edges and 0 towers; every earlier capture has both (wall edges 34–180, towers 17–93) |
| the request's size key and water keys equal the slot's (PC-16) | `create-request.json` | BIG_TOWN; coast key coastal and rivers true |
| the request hash | sha256 of the PUT row's body, recomputed outside the script | `6a10a6990446`, 274 296 bytes; exactly one PUT row with a body in the recording; `create-request.json` parses to the same object (45 partner-id fields) |
| the request equals slots 2 and 4's (the same cell) | leaf diffs of the requests | **0 semantic differences** against each; only the 45 client-random partner ids differ. All three have the same 26 top-level keys. The wall settings (the first stage places a stone wall around all lots after it; the second stage and the suburb do not) are among the equal values. |
| the request differs from slots 0 and 10 (BIG_TOWN, `none`) only by the water options | leaf diffs of the requests | 8 semantic differences each: the 2 water keys and 6 leaves of the raw-resource entry the water options add (the list shifts by one); 0 size-dependent; plus 45 partner ids |
| the request differs from slots 3 and 5 (BIG_CITY, the same water) only by the size | leaf diffs of the requests | 15 semantic differences each: the size key and 14 size-dependent values (section 10.3's table); plus 45 partner ids |
| the request differs from slot 9's (METROPOLIS, the same water) only by the size | a leaf diff of the two requests | 16 semantic differences: the size key and 15 size-dependent values; plus 45 partner ids |
| the request differs from the base within the named classes | the script's `requestDiff` and `vsSlot0` | against the base: 12 semantic (1 slot key, 11 size-dependent; the base was itself coastal with rivers, section 11.3 finding 2), `other` 0; against day 1: 8 semantic (2 water keys, 6 water-implied), `other` 0 |
| the checks discriminate (red tests) | this capture checked as other slots, `--check-only` | as slots 2 and 4 (the same cell): exit 0, as it must be. As slots 0 and 10 (BIG_TOWN, `none`): exit 1 (water keys, request diff, diff against slot 0). As slots 3, 5 and 9 (BIG_CITY and METROPOLIS, `coast+river`): exit 1 (size key, same-size, border). As slots 1 and 6 (each its size's first, `none`): exit 1 (size key, water keys, request diff, diff against slot 0, border). As slot 11 (BIG_CITY, `none`, a later draw): exit 1 (those five and same-size). |
| the runner is the profiler's code | `cmp` of the scratchpad copies against `profiler/` before the start | identical: session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…`, package.json `25e7d362…`, lib/instrument.js `cca253ac…`; port 9341; no FTG process and no `Singleton*` file before; `session closed`, no FTG process, no `Singleton*` file and port 9341 free after; both `.session` files absent before and after |
| only the seat used the window | the scroll readings and the recording's hosts, documents and writes | root scroll 0 → 0 across the landing, hover empty; one document load (the landing); hosts: the site, its API, analytics, error reporting, fonts and one GPU-benchmark file from a public package CDN (as in slots 2–11); exactly one write to the site's API (the create; listed twice, as the request and its interception); no page outside the site |
| one settlement made (plan 2.1b (6)) | the PUT status and the list before and after | PUT 200; the list's rows 12 → 13, the new row of size BIG_TOWN carrying the PUT's settlement id; no retry |
| the slot bind is safe | `plan.py --bind-ftg 12=…`, then `--check` and a diff against the pre-bind copy | one line changed (slot 12's capture); SAME for both files; `metrics.m-1.json` byte-unchanged (`8a0efa7e…`); `plan.py` unchanged (`68709ba8…`). `plan.json` sha256 moves from `b50adff0…` to `2994f3e2…`. |
| no account identifier in the files written | grep of the README, `capture-facts.json`, `create-request.json`, `request-diff.txt`, `structure.md`, `steps.jsonl`, this section, the header update, the JSON entry, the checklist line, the result file and this lane's `lane-events.log` lines for an email pattern, the display name, a token prefix and a full id | see the result file's privacy row |

### 23.3 Findings

1. **The size-dependent values repeat at BIG_TOWN a fifth time (CONFIRMED).** All 17 equal slot 0's, as slots 2, 4 and
   10 found. The 17-value class needed no change (R-41).
2. **A walled request gave a town with no wall (CONFIRMED; cause not read).** The request is equal to slots 2 and 4's
   in every value apart from the 45 partner ids, wall settings included (a stone wall after the first stage, around all
   lots), and the walled box was on, as the form-final reading shows. Slots 2 and 4 got walls (49 and 38 wall edges, 31
   and 22 towers). This draw has no wall edge and no tower: field 7 is absent from the payload, the first of 13 captures
   without it, and shots 014, 015 and 018 show the town unwalled. So whether the wall is built is a per-draw outcome,
   not fixed by the request. Why it was not built (a first-stage lot set the wall could not enclose, the harbour or the
   river crossing, or something else) is not read; any cause is PLAUSIBLE only. **For W-05b:** the wall rows
   (`wall.towerSpacing`, `wall.ungated` and the twin's tower readings) have nothing to measure in this capture; it must
   be recorded as a wall-less draw (n = 0 for those rows), never dropped from the BIG_TOWN pool or treated as a decode
   failure. Routed to W-05b's next pass.
3. **The same request gives a different town again (CONFIRMED).** Against slots 2 and 4 (the same cell, equal requests):
   1 610 buildings against 1 821 and 1 880, 2 987 edges and 2 639 nodes against 4 197 / 3 558 and 4 215 / 3 571, 2
   districts against 4 and 4, 4 water bodies against 3 and 4, and no wall. The five BIG_TOWN captures now span 1 610–1 880
   buildings. The server's own seed remains the PLAUSIBLE source (sections 14.3, 21.3, 22.3).
4. **Four water bodies (count CONFIRMED; reading PLAUSIBLE).** One polygon of 13 points within 261 m of the centre, one
   of 81 points reaching 1 566 m (inside the border), and two of 97 and 210 points that reach the 2 000 m border. Shot 014
   shows the sea, the river and a harbour basin, so the two border-reaching polygons are PLAUSIBLY the sea and the
   river, and the small one PLAUSIBLY of the near-centre kind seen in slots 2–4.
5. **The payload's paths are a subset of the earlier union (CONFIRMED).** 181 distinct field paths, none new. Of the 17
   absent from the union of slots 0–11's 198: field 7 and its 6 sub-paths (no tower; present in every earlier capture),
   11.6 and its parts (absent in slots 0, 2, 3, 4 and 10 too) and 11.7 and its parts (absent in slots 1, 3, 4, 6, 9, 10
   and 11 too).
6. **The premium account took a thirteenth settlement with no prompt (CONFIRMED).** The list held 12 rows before and 13
   after; no limit, payment or upgrade prompt appeared. Whether a lapsed premium would refuse one stays PLAUSIBLE only.
7. **Server time and payload (CONFIRMED; time contended).** The payload is 0.39 MB (slots 2 and 4: 0.42 and 0.43 MB) and
   the server time 4.4 s (slots 0, 2, 4 and 10: 2.6, 1.9, 2.2 and 1.9 s; this run shared the machine with more seats);
   the layout body was in the folder at the poll's first look. The account list gives 5 491 people against the nominal
   5 600 (the earlier big town and slots 2, 4 and 10: 5 769, 5 906, 6 221 and 5 544).

### 23.4 Calls and deviations (vetoable)

1. **No deviation from checklist sections H and I.** The `--full` shot of the settlements view (002) was taken as H3
   prescribes; the form and the map then ran in the 1440×632 window. Every click and select had a `text`, a `shot` and,
   for coordinate clicks, an `elementFromPoint` reading before it, and a form-state reading after it. Setting the coast
   select (select 7) to the coastal option moved no box: rivers (1008, 498) and forests (1008, 556) before the scroll, the reserve area
   (1008, 367) and walled (1008, 396) after it, "Create Settlement" 1 of 1 at (947, 522) inside the dialog.
2. **The wall-less town was bound, not failed.** The 10 post checks read the request, the decode and the border; all
   pass, and the request is the cell's exact request. The missing wall is FTG's outcome for that request, so it is a
   finding about the generator, not a deviation of the capture (plan 2.1b (6) keeps `--fail-ftg` for a failed post check).
   The alternative, failing the slot or re-creating it, would bias the BIG_TOWN pool toward walled draws and add a
   settlement to the owner's account. Vetoable: a ruling could exclude wall-less draws from the wall rows by name.
3. **`SIZE_DEPENDENT` was not touched** (R-41 forbids widening it on a later capture of a size); the same-size check
   passed as it stands.
4. **A second visit to the settlements view after the create** (one guarded navigation click) read the list. It changed
   nothing. The hover reading before the create click named the walled box, the seat's own last click point. The
   re-roll control showed in the overview shots (014, 015) and was gone after the zooms (018), as H14 expects. It was
   never clicked.

### 23.5 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read) are every number in sections 23.1 and 23.2, findings 1, 2 (the equal requests, the absent
wall edges and towers, the shots), 3 (the request equality and the differing counts), 4 (the field-6 counts), 5, 6 and
7, and the listed population. PLAUSIBLE (reasoning only) are any cause of the missing wall, that the server's seed makes
equal requests differ, what the four field-6 polygons are, that a lapsed premium would refuse a further settlement, and
that the listed population is the generated resident count.

## 24 Slot 13 (programme 2) — 2026-10-04, BIG_CITY, `coast+river`

Lane `m1/W-02-slot13b`, under the owner's go for programme 2 (`owner-go.json`). One settlement was created, with one
create click, by checklist sections H (with H12's guarded clicks, H13's list count and H14's redacting helper) and I.
Before the create, slot 13 was open and slots 0–12 bound, the newest folder was slot 12's (its one create is slot 12's
own), no lane line named a slot-13 key, and the account list held 13 settlements (big town 5, big city 4, metropolis 4:
the earlier settlement and slots 1 to 12), so no slot-13 settlement existed. The landing's root scroll container read 0
at the first reading and 0 again just before the "Home" click, and no hover was on the page: no sign of another hand.

### 24.1 The capture

| field (README) | value |
|---|---|
| capture id | `2026-10-04T04-35-38` |
| account | the owner's signed-in account, premium since J164; the list held 13 settlements before and 14 after (no counter) |
| size / rung | BIG_CITY / CITY |
| `WaterSetting` | `coast+river` (the request's coast key coastal, rivers true) |
| population, source | 24 500, `nominal`. The account list gives 24 436 (section 9.1; recorded, not used). |
| server date; PUT sent | 2026-10-04 (UTC; 00:38 EDT); 04:38:41.513 UTC (the response date headers read 04:38:47 and 04:38:48 GMT) |
| server time | 6.025 s, from the PUT being sent to the layout GET being sent. **Contended**: M0's build seats and M-1 research seats shared the machine, so this feeds no time row (plan-check PC-11). |
| buildings | 7 328 |
| request hash | `0d0696065301`: sha256 of the exact 274 299-byte PUT body |
| `referenceBuild` | `ftg:2026-10-04+0d0696065301` |
| payload | 1 359 417 bytes, Fetch-intercepted (`intercept-0035…bin`, sha256 `9b04e444642b3e56…`) |
| road graph | 11 713 edges, 9 000 nodes; 58 wall edges (edge type 7) |
| wall towers / water bodies / districts | 37 / 4 / 5 |
| settlement border | a square with half width 2 750.00 m, the size ladder's 5 500 m width |
| capture folder | 39 MB: 13 MB of session recording and 26 MB of screenshots at 2× (no CPU profile). Free disk: 9.6 GB before, 8.2 GB after the session (other lanes writing too). |

**Form values.** The size was set to the big-city option, chosen by its request key as in slots 6–12: the seat read each
size option's React element key by `eval`; exactly one of the 12 options carried `BIG_CITY`, and the selected option's
key was re-read after the select and again in the form-final reading. The metropolis option was not touched. The coast
select was set to the coastal option, and the river, forest, reserve-area and wall boxes were switched on; the farm box
was already on. Everything else stayed at FTG's default presets, and the name was left blank. All settings was never
opened (shots 004–012; values verified by `eval` before the create click). Every click and select was its own command
after its readings, and every coordinate click had an `elementFromPoint` reading naming its control; a form-state
reading after each step showed the dialog still open (`steps/steps.jsonl`, 20 shots). The 13 form, map and navigation
commands equal slots 3 and 5's (the same cell) in order, coordinates and size text. The map (shot 014, 500 m bar) shows
the sea along the whole west side, a river from the east reaching it in the middle of the shore at a harbour quarter
with basins, quays and a mole, the city along the shore north and south of the river mouth (five district labels),
fields to the north-east and a large wood to the south-east. The core shot (018, 250 m bar) shows grey lines along the
river banks by the harbour, PLAUSIBLY the wall.

### 24.2 Checks (all executed 2026-10-04, CONFIRMED)

| check | how | result |
|---|---|---|
| all checks of `ftg_capture_post.py` | `--slot 13 --signed-in --premium`, `--check-only` first, then the writing run: exit 0 both times (the script unchanged since slot 6, `735922948e3970fb…`) | 10 of 10 pass: calls, size key, water keys, the request diff against the base, the diff against slot 0, the same-size values (**17 of 17 equal slot 1's**), decode, border, no resident field, `pb_raw` runs |
| the payload decodes: field 3 edges and nodes, field 8 buildings | `python3 tools/pb_raw.py <payload>` (the post script's run, and a fresh run) | exit 0, 188 distinct field paths; 3.1 × 11 713, 3.2 × 9 000, 8 × 7 328, 7 × 37, 6 × 4, 10 × 5; `structure.md` equals a fresh run apart from its title path |
| the wall in the payload | `research/baselines/adapters/ftg.py`'s decoder, edges counted by type | 58 type-7 (wall) edges and 37 towers (slots 3 and 5, the same cell: 57 and 80 edges, 40 and 49 towers); after slot 12's wall-less draw, this one has its wall |
| the request's size key and water keys equal the slot's (PC-16) | `create-request.json` | BIG_CITY; coast key coastal and rivers true |
| the request hash | sha256 of the PUT row's body, recomputed outside the script | `0d0696065301`, 274 299 bytes; exactly one PUT row with a body in the recording; `create-request.json` parses to the same object (45 partner-id fields) |
| the request equals slots 3 and 5's (the same cell) | leaf diffs of the requests | **0 semantic differences** against each; only the 45 client-random partner ids differ. All three have the same 26 top-level keys. |
| the request differs from slots 1 and 11 (BIG_CITY, `none`) only by the water options | leaf diffs of the requests | 8 semantic differences each: the 2 water keys and 6 leaves of the raw-resource entry the water options add (the list shifts by one); 0 size-dependent; plus 45 partner ids |
| the request differs from slots 2, 4 and 12 (BIG_TOWN, the same water) only by the size | leaf diffs of the requests | 15 semantic differences each: the size key and 14 size-dependent values (section 10.3's table); plus 45 partner ids |
| the request differs from slot 9's (METROPOLIS, the same water) only by the size | a leaf diff of the two requests | 8 semantic differences: the size key and 7 size-dependent values (the random-faction count, four first-stage values, the second stage's spoke cap, the religious-workers share); plus 45 partner ids |
| the request differs from the base within the named classes | the script's `requestDiff` and `vsSlot0` | against the base: 11 semantic (1 slot key, 10 size-dependent; the base was itself coastal with rivers, section 11.3 finding 2), `other` 0; against day 1: 23 semantic (14 size-dependent, the 2 water keys, 6 water-implied, the size key), `other` 0 |
| the checks discriminate (red tests) | this capture checked as other slots, `--check-only` | as slots 3 and 5 (the same cell): exit 0, as it must be. As slots 1 and 11 (BIG_CITY, `none`): exit 1 (water keys, request diff, diff against slot 0). As slots 2, 9 and 12 (BIG_TOWN and METROPOLIS, `coast+river`): exit 1 (size key, same-size, border). As slots 0 and 6 (BIG_TOWN and METROPOLIS, `none`; each its size's first): exit 1 (size key, water keys, request diff, diff against slot 0, border). As slot 10 (BIG_TOWN, `none`, a later draw): exit 1 (those five and same-size). |
| the runner is the profiler's code | `cmp` of the scratchpad copies against `profiler/` before the start | identical: session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…`, package.json `25e7d362…`, lib/instrument.js `cca253ac…`; port 9341; no FTG process and no `Singleton*` file before; `session closed`, no `Singleton*` file and port 9341 free after, and no FTG process once this run's orphaned network helper had been ended (24.4 call 2); both `.session` files absent before and after |
| only the seat used the window | the scroll readings and the recording's hosts, documents and writes | root scroll 0 → 0 across the landing, hover empty; one document load (the landing); hosts: the site, its API, the site's identity provider (one token renewal by the site's own sign-in library as the landing loaded, answered 200; the same call is in slot 8's recording), analytics, error reporting (two of its uploads timed out), fonts and one GPU-benchmark file from a public package CDN; exactly one write to the site's settlements API (the create; listed twice, as the request and its interception); no page outside the site |
| one settlement made (plan 2.1b (6)) | the PUT status and the list before and after | PUT 200; the list's rows 13 → 14, the new row of size BIG_CITY carrying the PUT's settlement id; no retry |
| the slot bind is safe | `plan.py --bind-ftg 13=…`, then `--check` and a diff against the pre-bind copy | one line changed (slot 13's capture); SAME for both files; `metrics.m-1.json` byte-unchanged (`8a0efa7e…`); `plan.py` unchanged (`68709ba8…`). `plan.json` sha256 moves from `2994f3e2…` to `4cd99fba…`. |
| no account identifier in the files written | grep of the README, `capture-facts.json`, `create-request.json`, `request-diff.txt`, `structure.md`, `steps.jsonl`, this section, the header update, the JSON entry, the checklist line, the result file and this lane's `lane-events.log` lines for an email pattern, the display name, a token prefix and a full id | see the result file's privacy row |

### 24.3 Findings

1. **The size-dependent values repeat at BIG_CITY a fifth time (CONFIRMED).** All 17 equal slot 1's, as slots 3, 5 and
   11 found. The 17-value class needed no change (R-41).
2. **The same request gives a different city again (CONFIRMED).** Against slots 3 and 5 (the same cell, equal
   requests): 7 328 buildings against 7 342 and 7 270, 11 713 edges and 9 000 nodes against 11 121 / 8 400 and
   10 164 / 7 984, 37 towers against 40 and 49, 5 districts against 4 and 4, 4 water bodies against 4 and 3. The five
   BIG_CITY captures now span 7 164–7 376 buildings. The server's own seed remains the PLAUSIBLE source (sections 14.3,
   21.3, 22.3).
3. **The wall is back (CONFIRMED).** After slot 12's wall-less big town (section 23.3 finding 2), this draw of a walled
   request has a wall: 58 wall edges and 37 towers. Slot 12 stays the only wall-less capture of 14.
4. **Four water bodies (count CONFIRMED; reading PLAUSIBLE).** One polygon of 15 points within 286 m of the centre, one
   of 29 points reaching 1 977 m (inside the border), and two of 141 and 494 points that reach the border (3 021 m and
   3 889 m from the centre; 3 889 m is the border square's corner). Shot 014 shows the sea and the river, so the two
   border-reaching polygons are PLAUSIBLY the sea and the river, and the small one PLAUSIBLY of the near-centre kind of
   slots 2–5 and 12 (slots 3 and 5: 7 and 20 points within 284 and 302 m).
5. **The payload's paths are a subset of the earlier union (CONFIRMED).** 188 distinct field paths, none new. Of the 10
   absent from the union of slots 0–12's 198: 11.1 and its parts (absent in slots 2, 3, 4, 9 and 10 too) and 11.6 and
   its parts (absent in slots 0, 2, 3, 4, 10 and 12 too).
6. **The premium account took a fourteenth settlement with no prompt (CONFIRMED).** The list held 13 rows before and 14
   after; no limit, payment or upgrade prompt appeared. Whether a lapsed premium would refuse one stays PLAUSIBLE only.
7. **The site renewed its sign-in in the background (CONFIRMED; nothing to do).** As the landing loaded, the site's own
   sign-in library exchanged its stored renewal token for fresh session tokens at the site's identity provider (one call,
   answered 200). Slot 8's recording, about 70 minutes earlier, holds the same call; slots 9–12's do not. No sign-in page
   or prompt appeared and the seat typed nothing. The recording that holds those tokens stays under `captures/`, which
   git ignores, and is not quoted.
8. **Server time and payload (CONFIRMED; time contended).** The payload is 1.36 MB (slots 3 and 5: 1.26 MB each) and the
   server time 6.0 s (slots 1, 3, 5 and 11: 5.7, 6.3, 6.0 and 6.2 s); the layout body was in the folder at the poll's
   first look. The account list gives 24 436 people against the nominal 24 500 (slots 1, 3, 5 and 11: 24 367, 24 755,
   24 597 and 24 961).

### 24.4 Calls and deviations (vetoable)

1. **No deviation from checklist sections H and I.** The `--full` shot of the settlements view (002) was taken as H3
   prescribes; the form and the map then ran in the 1440×632 window. Every click and select had a `text`, a `shot` and,
   for coordinate clicks, an `elementFromPoint` reading before it, and a form-state reading after it. Setting the coast
   select (select 7) to the coastal option moved no box: rivers (1008, 498) and forests (1008, 556) before the scroll,
   the reserve area (1008, 367) and walled (1008, 396) after it, "Create Settlement" 1 of 1 at (947, 522) inside the
   dialog.
2. **This run's orphaned browser helper was ended.** After `drive.mjs stop` printed "session closed", one Chrome
   network-service helper stayed alive with no parent for about seven minutes. It was this run's own process: its
   user-data directory is this runner's profile link and it started at the session's start (00:35:40 EDT). Left alive,
   it would have failed the next seat's pre-flight (`pgrep -fl profiles/ftg` must print nothing), so the seat sent it a
   plain terminate signal; it exited at once, leaving no `Singleton*` file. No other process was touched. Vetoable: a
   ruling could prefer waiting for it, or a check by the next seat.
3. **`SIZE_DEPENDENT` was not touched** (R-41 forbids widening it on a later capture of a size); the same-size check
   passed as it stands.
4. **A second visit to the settlements view after the create** (one guarded navigation click) read the list. It changed
   nothing. The hover readings named only the points of the seat's own last clicks (the dialog over the "New
   Settlement" point, the walled box before the create, the map canvas after it). The re-roll control showed in the
   first two map shots (014, 015) and was gone before the first zoom (016). It was never clicked.

### 24.5 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read) are every number in sections 24.1 and 24.2, findings 1, 2 (the request equality and the
differing counts), 3, 4 (the field-6 counts), 5, 6, 7 (the call, its answer and its absence from slots 9–12) and 8, and
the listed population. PLAUSIBLE (reasoning only) are that the server's seed makes equal requests differ, what the four
field-6 polygons are, that the grey lines in shot 018 are the wall, that a lapsed premium would refuse a further
settlement, and that the listed population is the generated resident count.

## 25 Slot 14 (programme 2) — 2026-10-04, BIG_TOWN, `none`

Lane `m1/W-02-slot14b`, under the owner's go for programme 2 (`owner-go.json`). One settlement was created, with one
create click, by checklist sections H (with H12's guarded clicks, H13's list count and H14's redacting helper) and I.
Before the create, slot 14 was open and slots 0–13 bound, the newest folder was slot 13's (its one create is slot 13's
own), no lane line named a slot-14 key, and the account list held 14 settlements (big town 5, big city 5, metropolis 4:
the earlier settlement and slots 1 to 13), so no slot-14 settlement existed. The landing's root scroll container read 0
at the first reading and 0 again just before the "Home" click, and no hover was on the page: no sign of another hand.

### 25.1 The capture

| field (README) | value |
|---|---|
| capture id | `2026-10-04T04-53-21` |
| account | the owner's signed-in account, premium since J164; the list held 14 settlements before and 15 after (no counter) |
| size / rung | BIG_TOWN / TOWN |
| `WaterSetting` | `none` (the request's coast key empty, rivers false) |
| population, source | 5 600, `nominal`. The account list gives 6 033 (section 9.1; recorded, not used). |
| server date; PUT sent | 2026-10-04 (UTC; 00:56 EDT); 04:56:35.861 UTC (the response date headers read 04:56:37 and 04:56:38 GMT) |
| server time | 2.064 s, from the PUT being sent to the layout GET being sent. **Contended**: M0's build seats and M-1 research seats shared the machine, so this feeds no time row (plan-check PC-11). |
| buildings | 1 826 |
| request hash | `46477f59df5a`: sha256 of the exact 274 285-byte PUT body |
| `referenceBuild` | `ftg:2026-10-04+46477f59df5a` |
| payload | 406 064 bytes, Fetch-intercepted (`intercept-0035…bin`, sha256 `00f9eecfe75d920c…`) |
| road graph | 3 597 edges, 3 145 nodes; 44 wall edges (edge type 7) |
| wall towers / water bodies / districts | 23 / 2 / 3 |
| settlement border | a square with half width 2 000.00 m, the size ladder's 4 000 m width |
| capture folder | 40 MB: 12 MB of session recording and 27 MB of screenshots at 2× (no CPU profile). Free disk: 8.2 GB before, 8.1 GB after the session (other lanes writing too). |

**Form values.** The size was set to the big-town option, chosen by its request key as in slots 6–13: the seat read each
size option's React element key by `eval`; exactly one of the 12 options carried `BIG_TOWN`, and the selected option's
key was re-read after the select and again in the form-final reading. The metropolis option was not touched. The water
was the form's own default: no coast, rivers off. The farm box was already on; the forest, reserve-area and wall boxes
were switched on. Everything else stayed at FTG's default presets, and the name was left blank. All settings was never
opened (shots 004–010; values verified by `eval` before the create click). Every click and select was its own command
after its readings, and every coordinate click had an `elementFromPoint` reading naming its control; a form-state
reading after each step showed the dialog still open (`steps/steps.jsonl`, 18 shots). The 11 form, map and navigation
commands equal slot 10's (the same cell) in order, coordinates and size text. The map (shot 012, 500 m bar) shows a small
walled town in the middle of the square, with one district label inside the wall and two outside it, houses spread
along the roads around the wall, a large forest over the whole west half, open grassland with scattered trees to the
north and north-east, hedged fields to the south and east, and two small ponds, one in the south-west and one in the
east. The core shot (016) has a 250 m bar.

### 25.2 Checks (all executed 2026-10-04, CONFIRMED)

| check | how | result |
|---|---|---|
| all checks of `ftg_capture_post.py` | `--slot 14 --signed-in --premium`, `--check-only` first, then the writing run: exit 0 both times (the script unchanged since slot 6, `735922948e3970fb…`) | 10 of 10 pass: calls, size key, water keys, the request diff against the base, the diff against slot 0, the same-size values (**17 of 17 equal slot 0's**), decode, border, no resident field, `pb_raw` runs |
| the payload decodes: field 3 edges and nodes, field 8 buildings | `python3 tools/pb_raw.py <payload>` (the post script's run, and a fresh run) | exit 0, 182 distinct field paths; 3.1 × 3 597, 3.2 × 3 145, 8 × 1 826, 7 × 23, 6 × 2, 10 × 3; `structure.md` equals a fresh run apart from its title path |
| the wall in the payload | `research/baselines/adapters/ftg.py`'s decoder, edges counted by type | 44 type-7 (wall) edges and 23 towers (slots 0 and 10, the same cell: 42 and 34 edges, 25 and 17 towers) |
| the request's size key and water keys equal the slot's (PC-16) | `create-request.json` | BIG_TOWN; coast key empty and rivers false |
| the request hash | sha256 of the PUT row's body, recomputed outside the script | `46477f59df5a`, 274 285 bytes; exactly one PUT row with a body in the recording; `create-request.json` parses to the same object |
| the request equals slots 0 and 10's (the same cell) | leaf diffs of the requests | **0 semantic differences** against each; only the 45 client-random partner ids differ. All three have the same 26 top-level keys. |
| the request differs from slots 2, 4 and 12 (BIG_TOWN, `coast+river`) only by the water options | leaf diffs of the requests | 8 semantic differences each: the 2 water keys and 6 leaves of the raw-resource entry the water options add (the list shifts by one); 0 size-dependent; plus 45 partner ids |
| the request differs from slots 1 and 11 (BIG_CITY, the same water) only by the size | leaf diffs of the requests | 15 semantic differences each: the size key and the 14 size-dependent values that differ between BIG_CITY and BIG_TOWN (section 10.3's table); plus 45 partner ids |
| the request differs from slot 6's (METROPOLIS, the same water) only by the size | a leaf diff of the two requests | 16 semantic differences: the size key and 15 size-dependent values; plus 45 partner ids |
| the request differs from the base within the named classes | the script's `requestDiff` and `vsSlot0` | against the base: 20 semantic (3 slot keys, 6 water-implied, 11 size-dependent), `other` 0; against day 1: 0 semantic |
| the checks discriminate (red tests) | this capture checked as other slots, `--check-only` | as slots 0 and 10 (the same cell): exit 0, as it must be. As slots 1 and 6 (BIG_CITY and METROPOLIS, `none`; each its size's first): exit 1 (size key, border). As slot 11 (BIG_CITY, `none`, a later draw): exit 1 (size key, same-size, border). As slots 2, 4 and 12 (BIG_TOWN, `coast+river`): exit 1 (water keys, request diff, diff against slot 0). As slots 3, 5, 9 and 13 (BIG_CITY and METROPOLIS, `coast+river`): exit 1 (size key, water keys, request diff, diff against slot 0, same-size, border). |
| the runner is the profiler's code | `cmp` of the scratchpad copies against `profiler/` before the start | identical: session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…`, package.json `25e7d362…`, lib/instrument.js `cca253ac…`; port 9341; no FTG process and no `Singleton*` file before; `session closed`, no `Singleton*` file and port 9341 free after, and no FTG process once this run's orphaned network helper had been ended (25.4 call 2); both `.session` files absent before and after |
| only the seat used the window | the scroll readings and the recording's hosts, documents and writes | root scroll 0 → 0 across the landing, hover empty; one document load (the landing); hosts: the site, its API, analytics, error reporting, fonts and one GPU-benchmark file from a public package CDN (as in slots 2–13), and no call to the site's identity provider this time; exactly one write to the site's settlements API (the create; listed twice, as the request and its interception); no page outside the site |
| one settlement made (plan 2.1b (6)) | the PUT status and the list before and after | PUT 200; the list's rows 14 → 15, the new row of size BIG_TOWN carrying the PUT's settlement id; no retry |
| the slot bind is safe | `plan.py --bind-ftg 14=…`, then `--check` and a diff against the pre-bind copy | one line changed (slot 14's capture); SAME for both files; `metrics.m-1.json` byte-unchanged (`8a0efa7e…`); `plan.py` unchanged (`68709ba8…`). `plan.json` sha256 moves from `4cd99fba…` to `b76f90ed…`. |
| no account identifier in the files written | grep of the README, `capture-facts.json`, `create-request.json`, `request-diff.txt`, `structure.md`, `steps.jsonl`, this section, the header update, the JSON entry, the checklist line, the result file and this lane's `lane-events.log` lines for an email pattern, the display name, a token prefix and a full id | see the result file's privacy row |

### 25.3 Findings

1. **The size-dependent values repeat at BIG_TOWN a sixth time (CONFIRMED).** All 17 equal slot 0's, as slots 2, 4, 10
   and 12 found. The 17-value class needed no change (R-41).
2. **The same request gives a different town again (CONFIRMED).** Against slots 0 and 10 (the same cell, equal
   requests): 1 826 buildings against 1 694 and 1 675, 3 597 edges and 3 145 nodes against 3 266 / 3 003 and
   3 288 / 2 895, 23 towers against 25 and 17, 44 wall edges against 42 and 34, 3 districts against 3 and 2. The six
   BIG_TOWN captures now span 1 610–1 880 buildings. The server's own seed remains the PLAUSIBLE source (sections 14.3,
   21.3, 23.3).
3. **Two ponds in a big town with no coast and no river (count CONFIRMED; reading PLAUSIBLE).** Field 6 occurs twice:
   polygons of 12 and 19 points reaching 1 542 m and 1 292 m from the centre, inside the 2 000 m border, and shot 012
   shows two small ponds (south-west and east). Slots 0 and 10, with equal requests, had none, so this is the first
   BIG_TOWN draw with water under the `none` option. Field 6 now appears in 3 of the 6 `none` captures (slots 1, 6 and
   14, with 3, 1 and 2 bodies; slots 0, 10 and 11 have none), across three sizes. This strengthens section 10.3 finding 3's PLAUSIBLE reading: field 6
   can hold ponds that come from the draw, not from the water options. W-05b's water rows read `coast+river` slots only
   (plan 2.1b, R-33), so these ponds feed no water row as planned.
4. **The wall is present (CONFIRMED).** 44 wall edges and 23 towers; slot 12 stays the only wall-less capture of 15.
5. **The payload's paths are a subset of the earlier union (CONFIRMED).** 182 distinct field paths, none new. Of the 16
   absent from the union of slots 0–13's 198: 11.1 and its parts (absent in slots 2, 3, 4, 9, 10 and 13 too), 11.6 and
   its parts (absent in slots 0, 2, 3, 4, 10, 12 and 13 too) and 11.8.2 and its parts (absent in slots 0, 1, 3, 4, 6, 10
   and 11 too). Path 9.2.4, which slot 10 lacked (section 21.3 finding 5), is present here (3 occurrences, value 1).
6. **The premium account took a fifteenth settlement with no prompt (CONFIRMED).** The list held 14 rows before and 15
   after; no limit, payment or upgrade prompt appeared. Whether a lapsed premium would refuse one stays PLAUSIBLE only.
7. **Server time and payload (CONFIRMED; time contended).** The payload is 0.41 MB (slots 0 and 10: 0.40 and 0.38 MB)
   and the server time 2.1 s (slots 0, 2, 4, 10 and 12: 2.6, 1.9, 2.2, 1.9 and 4.4 s); the layout GET was sent about
   2 s after the PUT, by the recording's timestamps. The account list gives 6 033 people against the nominal 5 600 (slots 2, 4, 10 and 12:
   5 906, 6 221, 5 544 and 5 491).

### 25.4 Calls and deviations (vetoable)

1. **No deviation from checklist sections H and I.** The `--full` shot of the settlements view (002) was taken as H3
   prescribes; the form and the map then ran in the 1440×632 window. Every click and select had a `text`, a `shot` and,
   for coordinate clicks, an `elementFromPoint` reading before it, and a form-state reading after it. The coast select
   and the rivers box were already at the slot's values (the form's defaults), so neither was touched, as in slots 1, 6,
   10 and 11: forests (1008, 556) before the scroll, the reserve area (1008, 367) and walled (1008, 396) after it,
   "Create Settlement" 1 of 1 at (947, 522) inside the dialog.
2. **This run's orphaned browser helper was ended, as in slot 13.** After `drive.mjs stop` printed "session closed",
   one Chrome network-service helper stayed alive with no parent. It was this run's own process: its user-data directory
   is this runner's profile link and it started at the session's start (00:53:23 EDT). Following checklist I's slot-13
   note, the seat sent it a plain terminate signal about three minutes after the stop; it exited at once, leaving no
   `Singleton*` file. No other process was touched. Vetoable as section 24.4 call 2 is.
3. **`SIZE_DEPENDENT` was not touched** (R-41 forbids widening it on a later capture of a size); the same-size check
   passed as it stands.
4. **A second visit to the settlements view after the create** (one guarded navigation click) read the list. It changed
   nothing. The hover readings named only the points of the seat's own last clicks (the "Home" point on the settlements
   view, the walled box before the create, the map canvas after it). The re-roll control showed in the first two map
   shots (012, 013) and was gone after the zooms (016). It was never clicked. The overview `--full` shot (013) drew the
   scale bar with its label this time.

### 25.5 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read) are every number in sections 25.1 and 25.2, findings 1, 2 (the request equality and the
differing counts), 3 (the field-6 counts and extents), 4, 5, 6 and 7, and the listed population. PLAUSIBLE (reasoning
only) are that the server's seed makes equal requests differ, that the two field-6 polygons are ponds that come from
the draw rather than the water options, that a lapsed premium would refuse a further settlement, and that the listed
population is the generated resident count.

## 26 Slot 15 (programme 2) — 2026-10-04, BIG_CITY, `none`

Lane `m1/W-02-slot15b`, under the owner's go for programme 2 (`owner-go.json`). One settlement was created, with one
create click, by checklist sections H (with H12's guarded clicks, H13's list count and H14's redacting helper) and I.
Before the create, slot 15 was open and slots 0–14 bound, the newest folder was slot 14's (its one create is slot 14's
own), no lane line named a slot-15 key, and the account list held 15 settlements (big town 6, big city 5, metropolis 4:
the earlier settlement and slots 1 to 14), so no slot-15 settlement existed. The landing's root scroll container read 0
at the first reading and 0 again just before the "Home" click, and no hover was on the page: no sign of another hand.

### 26.1 The capture

| field (README) | value |
|---|---|
| capture id | `2026-10-04T05-07-56` |
| account | the owner's signed-in account, premium since J164; the list held 15 settlements before and 16 after (no counter) |
| size / rung | BIG_CITY / CITY |
| `WaterSetting` | `none` (the request's coast key empty, rivers false) |
| population, source | 24 500, `nominal`. The account list gives 26 099 (section 9.1; recorded, not used). |
| server date; PUT sent | 2026-10-04 (UTC; 01:10 EDT); 05:10:33.578 UTC (the response date headers read 05:10:39 and 05:10:40 GMT) |
| server time | 6.039 s, from the PUT being sent to the layout GET being sent. **Contended**: M0's build seats and M-1 research seats shared the machine, so this feeds no time row (plan-check PC-11). |
| buildings | 7 696 |
| request hash | `244a77d22f63`: sha256 of the exact 274 288-byte PUT body |
| `referenceBuild` | `ftg:2026-10-04+244a77d22f63` |
| payload | 1 325 485 bytes, Fetch-intercepted (`intercept-0033…bin`, sha256 `157042868d95e579…`) |
| road graph | 10 937 edges, 8 566 nodes; 92 wall edges (edge type 7) |
| wall towers / water bodies / districts | 49 / 0 / 5 |
| settlement border | a square with half width 2 750.00 m, the size ladder's 5 500 m width |
| capture folder | 42 MB: 13 MB of session recording and 29 MB of screenshots at 2× (no CPU profile). Free disk: 8.3 GB before, 8.2 GB after the session (other lanes writing too). |

**Form values.** The size was set to the big-city option, chosen by its request key as in slots 6–14: the seat read each
size option's React element key by `eval`; exactly one of the 12 options carried `BIG_CITY`, and the selected option's
key was re-read after the select and again in the form-final reading. The metropolis option was not touched. The water
was the form's own default: no coast, rivers off. The farm box was already on; the forest, reserve-area and wall boxes
were switched on. Everything else stayed at FTG's default presets, and the name was left blank. All settings was never
opened (shots 004–010; values verified by `eval` before the create click). Every click and select was its own command
after its readings, and every coordinate click had an `elementFromPoint` reading naming its control; a form-state
reading after each step showed the dialog still open (`steps/steps.jsonl`, 17 shots). The 11 form, map and navigation
commands equal slots 1 and 11's (the same cell) in order, coordinates and size text. The map (shot 011, 500 m bar) shows a
city with an irregular four-sided walled core holding one district label, four more districts outside the wall (north,
north-east, west and south), dense houses spreading out along the roads on every side, open grassland with scattered
trees to the north, hedged fields of crops and pasture to the west and east, forest along the south and south-east, and
no water. The core shot (015) has a 250 m bar.

### 26.2 Checks (all executed 2026-10-04, CONFIRMED)

| check | how | result |
|---|---|---|
| all checks of `ftg_capture_post.py` | `--slot 15 --signed-in --premium`, `--check-only` first, then the writing run: exit 0 both times (the script unchanged since slot 6, `735922948e3970fb…`) | 10 of 10 pass: calls, size key, water keys, the request diff against the base, the diff against slot 0, the same-size values (**17 of 17 equal slot 1's**), decode, border, no resident field, `pb_raw` runs |
| the payload decodes: field 3 edges and nodes, field 8 buildings | `python3 tools/pb_raw.py <payload>` (the post script's run, and a fresh run) | exit 0, 184 distinct field paths; 3.1 × 10 937, 3.2 × 8 566, 8 × 7 696, 7 × 49, 6 × 0, 10 × 5; `structure.md` equals a fresh run apart from its title path |
| the wall in the payload | `research/baselines/adapters/ftg.py`'s decoder, edges counted by type | 92 type-7 (wall) edges and 49 towers (slots 1 and 11, the same cell: 130 and 116 edges, 66 and 62 towers) |
| the request's size key and water keys equal the slot's (PC-16) | `create-request.json` | BIG_CITY; coast key empty and rivers false |
| the request hash | sha256 of the PUT row's body, recomputed outside the script | `244a77d22f63`, 274 288 bytes; exactly one PUT row with a body in the recording; `create-request.json` parses to the same object |
| the request equals slots 1 and 11's (the same cell) | leaf diffs of the requests | **0 semantic differences** against each; only the 45 client-random partner ids differ. All three have the same 26 top-level keys. |
| the request differs from slots 3, 5 and 13 (BIG_CITY, `coast+river`) only by the water options | leaf diffs of the requests | 8 semantic differences each: the 2 water keys and 6 leaves of the raw-resource entry the water options add (the list shifts by one); 0 size-dependent; plus 45 partner ids |
| the request differs from slots 0, 10 and 14 (BIG_TOWN, the same water) only by the size | leaf diffs of the requests | 15 semantic differences each: the size key and the 14 size-dependent values that differ between BIG_TOWN and BIG_CITY (section 10.3's table); plus 45 partner ids |
| the request differs from slot 6's (METROPOLIS, the same water) only by the size | a leaf diff of the two requests | 8 semantic differences: the size key and 7 size-dependent values (the random-faction count, four first-stage values, the second stage's spoke cap, the religious-workers share); plus 45 partner ids |
| the request differs from the base within the named classes | the script's `requestDiff` and `vsSlot0` | against the base: 19 semantic (3 slot keys, 6 water-implied, 10 size-dependent), `other` 0; against day 1: 15 semantic (14 size-dependent), `other` 0 |
| the checks discriminate (red tests) | this capture checked as other slots, `--check-only` | as slots 1 and 11 (the same cell): exit 0, as it must be. As slots 0 and 6 (BIG_TOWN and METROPOLIS, `none`; each its size's first): exit 1 (size key, border). As slots 10 and 14 (BIG_TOWN, `none`, later draws): exit 1 (size key, same-size, border). As slots 3, 5 and 13 (BIG_CITY, `coast+river`): exit 1 (water keys, request diff, diff against slot 0). As slots 2 and 9 (BIG_TOWN and METROPOLIS, `coast+river`, later draws): exit 1 (size key, water keys, request diff, diff against slot 0, same-size, border). |
| the runner is the profiler's code | `cmp` of the scratchpad copies against `profiler/` before the start | identical: session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…`, package.json `25e7d362…`, lib/instrument.js `cca253ac…`; port 9341; no FTG process and no `Singleton*` file before; `session closed`, no `Singleton*` file and port 9341 free after, and no FTG process once this run's orphaned network helper had been ended (26.4 call 3); both `.session` files absent before and after |
| only the seat used the window | the scroll readings and the recording's hosts, documents and writes | root scroll 0 → 0 across the landing, hover empty; one document load (the landing); hosts: the site, its API, analytics, error reporting, fonts and one GPU-benchmark file from a public package CDN (as in slots 2–14), and no call to the site's identity provider; exactly one write to the site's settlements API (the create; listed twice, as the request and its interception); no page outside the site |
| one settlement made (plan 2.1b (6)) | the PUT status and the list before and after | PUT 200; the list's rows 15 → 16, the new row of size BIG_CITY carrying the PUT's settlement id; no retry |
| the slot bind is safe | `plan.py --bind-ftg 15=…`, then `--check` and a diff against the pre-bind copy | one line changed (slot 15's capture); SAME for both files; `metrics.m-1.json` byte-unchanged (`8a0efa7e…`); `plan.py` unchanged (`68709ba8…`). `plan.json` sha256 moves from `b76f90ed…` to `ed6c8183…`. |
| no account identifier in the files written | grep of the README, `capture-facts.json`, `create-request.json`, `request-diff.txt`, `structure.md`, `steps.jsonl`, this section, the header update, the JSON entry, the checklist line, the result file and this lane's `lane-events.log` lines for an email pattern, the display name, a token prefix and a full id | see the result file's privacy row |

### 26.3 Findings

1. **The size-dependent values repeat in the sixth BIG_CITY (CONFIRMED).** All 17 equal slot 1's, as slots 3, 5, 11 and
   13 found. The 17-value class needed no change (R-41).
2. **The same request gives a different city again, and the largest so far (CONFIRMED).** Against slots 1 and 11 (the
   same cell, equal requests): 7 696 buildings against 7 164 and 7 376, 10 937 edges and 8 566 nodes against
   7 236 / 6 302 and 8 427 / 6 835, 49 towers against 66 and 62, 92 wall edges against 130 and 116, 5 districts against
   5 and 6. The six BIG_CITY captures now span 7 164–7 696 buildings; this one is 320 above the previous highest
   (slot 11). Its road graph is the size of the three `coast+river` draws' (10 164–11 713 edges), not of the other two
   `none` draws': the difference lies mostly in edge type 4 (5 180 here against 2 157 and 3 458; 4 572–5 511 in the
   coastal draws). The cause is not read; the server's own seed remains the PLAUSIBLE source of the spread (sections
   14.3, 21.3, 23.3, 25.3).
3. **No standing water (CONFIRMED).** Field 6 is absent, as in slot 11, where slot 1 (the same cell) had 3 bodies. Field
   6 now appears in 3 of the 7 `none` captures (slots 1, 6 and 14; slots 0, 10, 11 and 15 have none), which fits
   section 25.3 finding 3's PLAUSIBLE reading: ponds come from the draw, not from the water options.
4. **The listed population is the highest at BIG_CITY (CONFIRMED; meaning PLAUSIBLE).** The account list gives 26 099
   against the nominal 24 500, the first BIG_CITY listing above 25 000 (slots 1, 3, 5, 11 and 13: 24 367, 24 755,
   24 597, 24 961 and 24 436). This draw also has the most buildings. Across the six BIG_CITY captures the listed figure
   and the building count rank in the same order apart from one swapped pair (slots 5 and 13), which is PLAUSIBLY a sign
   that the listed figure is a generated count rather than a fixed nominal one; the rows keep `populationSource:
   nominal` until the ruling slot 1 asked for.
5. **The payload's paths are a subset of the earlier union (CONFIRMED).** 184 distinct field paths, none new. Of the 14
   absent from the union of slots 0–14's 198: field 6 and its parts (no water body, as in slots 0, 10 and 11), 11.6 and
   its parts (absent in slots 0, 2, 3, 4, 10, 12, 13 and 14 too) and 11.8.2 and its parts (absent in slots 0, 1, 3, 4,
   6, 10, 11 and 14 too). Path 9.2.4 is present (32 occurrences, value 1).
6. **The premium account took a sixteenth settlement with no prompt (CONFIRMED).** The list held 15 rows before and 16
   after; no limit, payment or upgrade prompt appeared. Whether a lapsed premium would refuse one stays PLAUSIBLE only.
7. **Server time and payload (CONFIRMED; time contended).** The payload is 1.33 MB (slots 1 and 11: 1.13 and 1.19 MB;
   the coastal BIG_CITY slots 1.26–1.36 MB) and the server time 6.0 s (slots 1, 3, 5, 11 and 13: 5.7, 6.3, 6.0, 6.2
   and 6.0 s); the layout body was in the folder at the poll's first looks, within seconds of the click.

### 26.4 Calls and deviations (vetoable)

1. **No deviation from checklist sections H and I in the clicks.** The `--full` shot of the settlements view (002) was
   taken as H3 prescribes; the form and the map then ran in the 1440×632 window. Every click and select had a `text`
   reading, a `shot` and, for coordinate clicks, an `elementFromPoint` reading before it, and a form-state reading
   after it. The coast select and the rivers box were already at the slot's values (the form's defaults), so neither
   was touched, as in slots 1, 6, 10, 11 and 14: forests (1008, 556) before the scroll, the reserve area (1008, 367) and
   walled (1008, 396) after it, "Create Settlement" 1 of 1 at (947, 522) inside the dialog.
2. **Two reading departures, stated plainly.** (a) No separate pre-create shot was taken (H6's `D shot pre-create`).
   The form-final shot (010, 05:10:20 UTC) was the last shot before the click (05:10:33 UTC); in between, the seat sent
   only readings (a `text`, the hit test of "Create Settlement", a scroll and hover reading) and wrote the CHECKPOINT
   line, so the page state at the click is on record by those readings, not by a shot. So shot numbers run one lower
   than slots 11 and 14's from 011 on (17 shots, not 18). (b) The `text` reading before the size select was taken but
   its printed output was discarded; the option-key and form-state readings in the same command were printed and
   checked before the select. Neither departure touched a click's guard: every click's own readings were checked.
3. **This run's orphaned browser helper was ended, as in slots 13 and 14.** After `drive.mjs stop` printed "session
   closed", one Chrome network-service helper stayed alive with no parent. It was this run's own process: its user-data
   directory is this runner's profile link and it started at the session's start (01:07:58 EDT). Following checklist
   I's slot-13 note, the seat sent it a plain terminate signal about one minute after the stop; it exited at once,
   leaving no `Singleton*` file. No other process was touched. Vetoable as section 24.4 call 2 is. It has now happened
   on three runs in a row.
4. **`SIZE_DEPENDENT` was not touched** (R-41 forbids widening it on a later capture of a size); the same-size check
   passed as it stands.
5. **A second visit to the settlements view after the create** (one guarded navigation click) read the list. It changed
   nothing. The hover readings named only the points of the seat's own last clicks (the walled box before the create,
   the map canvas after it, the zoom control, the header at the home-link point). The re-roll control showed in the
   first two map shots (011, 012) and was gone after the first zoom (014, 015). It was never clicked. The first zoom-in
   click already brought the 250 m bar; the second zoomed a little further under the same bar.

### 26.5 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read) are every number in sections 26.1 and 26.2, findings 1, 2 (the request equality and the
differing counts), 3 (the field-6 counts), 5, 6 and 7, the listed populations and building counts in finding 4, and the
reading departures of 26.4 call 2 (from `steps/steps.jsonl`). PLAUSIBLE (reasoning only) are that the server's seed makes
equal requests differ, that field 6 holds ponds that come from the draw, that the listed population is a generated
count (finding 4's rank agreement is one sample of six), and that a lapsed premium would refuse a further settlement.

## 27 Slot 16 (programme 2) — 2026-10-04, BIG_TOWN, `coast+river`

Lane `m1/W-02-slot16b`, under the owner's go for programme 2 (`owner-go.json`). One settlement was created, with one
create click, by checklist sections H (with H12's guarded clicks, H13's list count and H14's redacting helper) and I.
Before the create, slot 16 was open and slots 0–15 bound, the newest folder was slot 15's (its one create is slot 15's
own), no lane line named a slot-16 key, and the account list held 16 settlements (big town 6, big city 6, metropolis 4:
the earlier settlement and slots 1 to 15), so no slot-16 settlement existed. The landing's root scroll container read 0
at the first reading and 0 again just before the "Home" click, and no hover was on the page: no sign of another hand.

### 27.1 The capture

| field (README) | value |
|---|---|
| capture id | `2026-10-04T05-24-24` |
| account | the owner's signed-in account, premium since J164; the list held 16 settlements before and 17 after (no counter) |
| size / rung | BIG_TOWN / TOWN |
| `WaterSetting` | `coast+river` (the request's coast key coastal, rivers true) |
| population, source | 5 600, `nominal`. The account list gives 5 552 (section 9.1; recorded, not used). |
| server date; PUT sent | 2026-10-04 (UTC; 01:27 EDT); 05:27:41.249 UTC (the response date headers read 05:27:43 and 05:27:44 GMT) |
| server time | 2.627 s, from the PUT being sent to the layout GET being sent. **Contended**: M0's build seats and M-1 research seats shared the machine, so this feeds no time row (plan-check PC-11). |
| buildings | 1 675 |
| request hash | `cb0aa16b422b`: sha256 of the exact 274 296-byte PUT body |
| `referenceBuild` | `ftg:2026-10-04+cb0aa16b422b` |
| payload | 430 424 bytes, Fetch-intercepted (`intercept-0035…bin`, sha256 `31b83304cf4b62b9…`) |
| road graph | 3 648 edges, 3 186 nodes; 29 wall edges (edge type 7) |
| wall towers / water bodies / districts | 16 / 5 / 4 |
| settlement border | a square with half width 2 000.00 m, the size ladder's 4 000 m width |
| capture folder | 34 MB: 12 MB of session recording and 22 MB of screenshots at 2× (no CPU profile). Free disk: 8.1 GB before and 8.1 GB after the session (other lanes writing too). |

**Form values.** The size was set to the big-town option, chosen by its request key as in slots 6–15: the seat read each
size option's React element key by `eval`; exactly one of the 12 options carried `BIG_TOWN`, and the selected option's
key was re-read after the select and again in the form-final reading. The metropolis option was not touched. The coast
select was set to the coastal option, and the river, forest, reserve-area and wall boxes were switched on; the farm box
was already on. Everything else stayed at FTG's default presets, and the name was left blank. All settings was never
opened (shots 004–013; values verified by `eval` before the create click). Every click and select was its own command
after its readings, and every coordinate click had an `elementFromPoint` reading naming its control; a form-state
reading after each step showed the dialog still open (`steps/steps.jsonl`, 20 shots). The 13 form, map and navigation
commands equal slots 2, 4 and 12's (the same cell) in order, coordinates and size text. The map (shot 014, 500 m bar)
shows the sea along the east and a river from the west reaching it. The town lies along the shore north of the river
mouth. A small walled quarter at the harbour holds one district label and a basin with quays. The largest district lies
outside the wall to the north-west, and a third lies between the wall and the river. A fourth district runs along the
shore south of the river. Hedged fields of crops and pasture lie to the west and north-west, a large wood by the shore to
the north-east, open grassland with scattered trees south of the river, and two small ponds. The core shot (018) has a
250 m bar.

### 27.2 Checks (all executed 2026-10-04, CONFIRMED)

| check | how | result |
|---|---|---|
| all checks of `ftg_capture_post.py` | `--slot 16 --signed-in --premium`, `--check-only` first, then the writing run: exit 0 both times (the script unchanged since slot 6, `735922948e3970fb…`) | 10 of 10 pass: calls, size key, water keys, the request diff against the base, the diff against slot 0, the same-size values (**17 of 17 equal slot 0's**), decode, border, no resident field, `pb_raw` runs |
| the payload decodes: field 3 edges and nodes, field 8 buildings | `python3 tools/pb_raw.py <payload>` (the post script's run, and a fresh run) | exit 0, 188 distinct field paths; 3.1 × 3 648, 3.2 × 3 186, 8 × 1 675, 7 × 16, 6 × 5, 10 × 4; `structure.md` equals a fresh run apart from its title path |
| the wall in the payload | `research/baselines/adapters/ftg.py`'s decoder over slots 0–16, edges counted by type | 29 type-7 (wall) edges and 16 towers, the fewest of the 16 walled captures (the others: 34–180 edges, 17–93 towers); slots 2, 4 and 12 (the same cell): 49, 38 and 0 edges, 31, 22 and 0 towers |
| the request's size key and water keys equal the slot's (PC-16) | `create-request.json` | BIG_TOWN; coast key coastal and rivers true |
| the request hash | sha256 of the PUT row's body, recomputed outside the script | `cb0aa16b422b`, 274 296 bytes; exactly one PUT row with a body in the recording; `create-request.json` parses to the same object |
| the request equals slots 2, 4 and 12's (the same cell) | leaf diffs of the requests | **0 semantic differences** against each; only the 45 client-random partner ids differ. All four have the same 26 top-level keys. |
| the request differs from slots 0, 10 and 14 (BIG_TOWN, `none`) only by the water options | leaf diffs of the requests | 8 semantic differences each: the 2 water keys and 6 leaves of the raw-resource entry the water options add (the list shifts by one); 0 size-dependent; plus 45 partner ids |
| the request differs from slots 3, 5 and 13 (BIG_CITY, the same water) only by the size | leaf diffs of the requests | 15 semantic differences each: the size key and the 14 size-dependent values that differ between BIG_CITY and BIG_TOWN (section 10.3's table); plus 45 partner ids |
| the request differs from slot 9's (METROPOLIS, the same water) only by the size | a leaf diff of the two requests | 16 semantic differences: the size key and 15 size-dependent values; plus 45 partner ids |
| the request differs from the base within the named classes | the script's `requestDiff` and `vsSlot0` | against the base: 12 semantic (1 slot key, 11 size-dependent; the base was itself coastal with rivers, section 11.3 finding 2), `other` 0; against day 1: 8 semantic (2 water keys, 6 water-implied), `other` 0 |
| the checks discriminate (red tests) | this capture checked as every earlier slot, `--check-only` | as slots 2, 4 and 12 (the same cell): exit 0, as it must be. As slots 0, 10 and 14 (BIG_TOWN, `none`): exit 1 (water keys, request diff, diff against slot 0). As slots 3, 5, 7, 8, 9 and 13 (BIG_CITY and METROPOLIS, `coast+river`): exit 1 (size key, same-size, border). As slots 1 and 6 (each its size's first, `none`): exit 1 (size key, water keys, request diff, diff against slot 0, border). As slots 11 and 15 (BIG_CITY, `none`, later draws): exit 1 (those five and same-size). |
| the runner is the profiler's code | `cmp` of the scratchpad copies against `profiler/` before the start | identical: session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…`, package.json `25e7d362…`, lib/instrument.js `cca253ac…`; port 9341; no FTG process and no `Singleton*` file before; `session closed`, no `Singleton*` file and port 9341 free after, and no FTG process once this run's orphaned network helper had been ended (27.4 call 2); both `.session` files absent before and after |
| only the seat used the window | the scroll readings and the recording's hosts, documents and writes | root scroll 0 → 0 across the landing, hover empty; one document load (the landing); hosts: the site, its API, analytics, error reporting, fonts and one GPU-benchmark file from a public package CDN (as in slots 2–15), and no call to the site's identity provider; exactly one write to the site's settlements API (the create; listed twice, as the request and its interception); no page outside the site |
| one settlement made (plan 2.1b (6)) | the PUT status and the list before and after | PUT 200; the list's rows 16 → 17, the new row of size BIG_TOWN carrying the PUT's settlement id; no retry |
| the slot bind is safe | `plan.py --bind-ftg 16=…`, then `--check` and a diff against the pre-bind copy | `plan.json` byte-equal to the pre-flight copy just before the bind (no second writer in between); one line changed (slot 16's capture); SAME for both files; `metrics.m-1.json` byte-unchanged (`8a0efa7e…`); `plan.py` unchanged (`68709ba8…`). `plan.json` sha256 moves from `ed6c8183…` to `67614c8e…`. |
| no account identifier in the files written | grep of the README, `capture-facts.json`, `create-request.json`, `request-diff.txt`, `structure.md`, `steps.jsonl`, this section, the header update, the JSON entry, the checklist line, the result file and this lane's `lane-events.log` lines for an email pattern, the display name, a token prefix and a full id | see the result file's privacy row |

### 27.3 Findings

1. **The size-dependent values repeat at BIG_TOWN a seventh time (CONFIRMED).** All 17 equal slot 0's, as slots 2, 4,
   10, 12 and 14 found. The 17-value class needed no change (R-41).
2. **The wall is back, but encloses only a small harbour quarter (counts CONFIRMED; reading of the shots CONFIRMED;
   cause PLAUSIBLE).** The request asks for the wall exactly as slots 2, 4 and 12's do. Slot 12's draw had none; this one
   has 29 wall edges and 16 towers, the fewest of the 16 walled captures (slot 10's 34 and 17 were the lowest before).
   Shots 014 and 018 show the wall around one small quarter at the harbour holding one district label, with most of the
   town outside it. Across the four draws of this one request, the wall now ranges from none to 49 edges. That the
   walled quarter is what the first stage's lots made of the town is PLAUSIBLE only. **For W-05b:** a short wall with
   few towers is a valid draw for the wall rows; it is not a decode fault.
3. **The same request gives a different town again (CONFIRMED).** Against slots 2, 4 and 12 (the same cell, equal
   requests): 1 675 buildings against 1 821, 1 880 and 1 610; 3 648 edges and 3 186 nodes against 4 197 / 3 558,
   4 215 / 3 571 and 2 987 / 2 639; 4 districts against 4, 4 and 2; 5 water bodies against 3, 4 and 4. The seven
   BIG_TOWN captures still span 1 610–1 880 buildings. The server's own seed remains the PLAUSIBLE source (sections
   14.3, 21.3, 23.3, 25.3, 26.3).
4. **Two draws with the same building count list different populations (CONFIRMED; meaning PLAUSIBLE).** This town and
   slot 10's (BIG_TOWN, `none`) both have exactly 1 675 buildings. The account list gives 5 552 here and 5 544 for slot
   10. So the listed figure is not a function of the building count alone. That fits section 26.3 finding 4's PLAUSIBLE
   reading of a generated count, and adds that it depends on more than the number of buildings. The rows keep
   `populationSource: nominal` until the ruling slot 1 asked for.
5. **Five water bodies (count CONFIRMED; reading PLAUSIBLE).** The polygons have 11, 27, 25, 90 and 337 points. Their
   farthest points lie 220, 780, 1 307, 2 012 and 2 828 m from the centre. Shot 014 shows the sea, the river, a harbour
   basin and two small ponds. The 337-point polygon reaching the corner is PLAUSIBLY the sea and the 90-point one reaching
   the border PLAUSIBLY the river. The 27- and 25-point ones are PLAUSIBLY the two ponds, and the small one near the
   centre PLAUSIBLY the near-centre kind seen in slots 2, 4 and 12. Ponds now appear under both water settings (here
   and in slot 14's `none` draw), which fits section 25.3 finding 3.
6. **The payload's paths are a subset of the earlier union (CONFIRMED).** 188 distinct field paths, none new. Of the 10
   absent from the union of slots 0–15's 198: 11.1 and its parts (absent in slots 2, 3, 4, 9, 10, 13 and 14 too) and
   11.6 and its parts (absent in slots 0, 2, 3, 4, 10, 12, 13, 14 and 15 too).
7. **The premium account took a seventeenth settlement with no prompt (CONFIRMED).** The list held 16 rows before and 17
   after; no limit, payment or upgrade prompt appeared. Whether a lapsed premium would refuse one stays PLAUSIBLE only.
8. **Server time and payload (CONFIRMED; time contended).** The payload is 0.43 MB (slots 2, 4 and 12: 0.42, 0.43 and
   0.39 MB) and the server time 2.6 s (slots 2, 4 and 12: 1.9, 2.2 and 4.4 s). The layout body was in the folder at the
   poll's first look, within seconds of the click.

### 27.4 Calls and deviations (vetoable)

1. **No deviation from checklist sections H and I.** The `--full` shot of the settlements view (002) was taken as H3
   prescribes; the form and the map then ran in the 1440×632 window. Every click and select had a `text` reading, a
   `shot` and, for coordinate clicks, an `elementFromPoint` reading before it, and a form-state reading after it. The
   pre-create shot (013) was taken after the hit test, as section 26.4 call 2 asked. Setting the coast select (select 7)
   to the coastal option moved no box: rivers (1008, 498) and forests (1008, 556) before the scroll, the reserve area
   (1008, 367) and walled (1008, 396) after it, "Create Settlement" 1 of 1 at (947, 522) inside the dialog.
2. **This run's orphaned browser helper was ended, as in slots 13 to 15.** After `drive.mjs stop` printed "session
   closed", one Chrome network-service helper stayed alive with no parent. It was this run's own process: its user-data
   directory is this runner's profile link and it started at the session's start (01:24:25 EDT). Following checklist
   I's slot-13 note, the seat sent it a plain terminate signal a few seconds after the stop; it exited at once, leaving
   no `Singleton*` file. No other process was touched. Vetoable as section 24.4 call 2 is. It has now happened on four
   runs in a row.
3. **`SIZE_DEPENDENT` was not touched** (R-41 forbids widening it on a later capture of a size); the same-size check
   passed as it stands.
4. **A second visit to the settlements view after the create** (one guarded navigation click) read the list. It changed
   nothing. The hover readings named only the points of the seat's own last clicks (the walled box before the create,
   the zoom control before the home link). The re-roll control showed in the first two map shots (014, 015) and was
   gone after the zooms (018). It was never clicked.

### 27.5 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read) are every number in sections 27.1 and 27.2, findings 1, 2 (the equal requests, the wall
counts, the shots), 3 (the request equality and the differing counts), 4 (the equal building counts and the two listed
figures), 5 (the field-6 counts and extents), 6, 7 and 8, and the listed population. PLAUSIBLE (reasoning only) are any
cause of the short wall, that the server's seed makes equal requests differ, what the five field-6 polygons are, that
the listed population is a generated count, and that a lapsed premium would refuse a further settlement.

## 28 Slot 17 (programme 2) — 2026-10-04, BIG_CITY, `coast+river`

Lane `m1/W-02-slot17b`, under the owner's go for programme 2 (`owner-go.json`). One settlement was created, with one
create click, by checklist sections H (with H12's guarded clicks, H13's list count and H14's redacting helper) and I.
Before the create, slot 17 was open and slots 0–16 bound, the newest folder was slot 16's (its one create is slot 16's
own), no lane line named a slot-17 key, and the account list held 17 settlements (big town 7, big city 6, metropolis 4:
the earlier settlement and slots 1 to 16), so no slot-17 settlement existed. The landing's root scroll container read 0
at the first reading and 0 again just before the "Home" click, and no hover was on the page: no sign of another hand.

### 28.1 The capture

| field (README) | value |
|---|---|
| capture id | `2026-10-04T05-40-57` |
| account | the owner's signed-in account, premium since J164; the list held 17 settlements before and 18 after (no counter) |
| size / rung | BIG_CITY / CITY |
| `WaterSetting` | `coast+river` (the request's coast key coastal, rivers true) |
| population, source | 24 500, `nominal`. The account list gives 24 673 (section 9.1; recorded, not used). |
| server date; PUT sent | 2026-10-04 (UTC; 01:44 EDT); 05:44:47.260 UTC (the response date headers read 05:44:54 and 05:44:55 GMT) |
| server time | 7.122 s, from the PUT being sent to the layout GET being sent. **Contended**: M0's build seats and M-1 research seats shared the machine, so this feeds no time row (plan-check PC-11). |
| buildings | 7 311 |
| request hash | `e18a980c526b`: sha256 of the exact 274 299-byte PUT body |
| `referenceBuild` | `ftg:2026-10-04+e18a980c526b` |
| payload | 1 359 234 bytes, Fetch-intercepted (`intercept-0034…bin`, sha256 `bb9816efffcc3bf0…`) |
| road graph | 10 715 edges, 8 329 nodes; 40 wall edges (edge type 7) |
| wall towers / water bodies / districts | 25 / 5 / 6 |
| settlement border | a square with half width 2 750.00 m, the size ladder's 5 500 m width |
| capture folder | 37 MB: 13 MB of session recording and 25 MB of screenshots at 2× (no CPU profile). Free disk: 8.1 GB before, 8.0 GB after the session (other lanes writing too). |

**Form values.** The size was set to the big-city option, chosen by its request key as in slots 6–16: the seat read each
size option's React element key by `eval`; exactly one of the 12 options carried `BIG_CITY`, and the selected option's
key was re-read after the select and again in the form-final reading. The metropolis option was not touched. The coast
select was set to the coastal option, and the river, forest, reserve-area and wall boxes were switched on; the farm box
was already on. Everything else stayed at FTG's default presets, and the name was left blank. All settings was never
opened (shots 004–013; values verified by `eval` before the create click). Every click and select was its own command
after its readings, and every coordinate click had an `elementFromPoint` reading naming its control; a form-state
reading after each step showed the dialog still open (`steps/steps.jsonl`, 20 shots). The 13 form, map and navigation
commands equal slots 3, 5 and 13's (the same cell) in order, coordinates and size text. The map (shot 014, 500 m bar)
shows the sea over the whole west and north-west. A river comes in from the east and a second arm from the south; they
meet near the middle, and the joined water reaches the sea in two channels. The city fills the land between the two
channels and both banks, with six district labels. A harbour quarter with a mole lies between the sea and the northern
channel. Hedged fields of crops and pasture lie to the north-east, and open grassland with scattered trees to the east
and south. The core shot (018, 250 m bar) shows the wall: one line with towers from the shore down to the northern
channel, closing the harbour quarter on its land side.

### 28.2 Checks (all executed 2026-10-04, CONFIRMED)

| check | how | result |
|---|---|---|
| all checks of `ftg_capture_post.py` | `--slot 17 --signed-in --premium`, `--check-only` first, then the writing run: exit 0 both times (the script unchanged since slot 6, `735922948e3970fb…`) | 10 of 10 pass: calls, size key, water keys, the request diff against the base, the diff against slot 0, the same-size values (**17 of 17 equal slot 1's**), decode, border, no resident field, `pb_raw` runs |
| the payload decodes: field 3 edges and nodes, field 8 buildings | `python3 tools/pb_raw.py <payload>` (the post script's run, and a fresh run) | exit 0, 198 distinct field paths; 3.1 × 10 715, 3.2 × 8 329, 8 × 7 311, 7 × 25, 6 × 5, 10 × 6; `structure.md` equals a fresh run apart from its title path |
| the wall in the payload | `research/baselines/adapters/ftg.py`'s decoder over slots 0–17, edges counted by type | 40 type-7 (wall) edges and 25 towers, the shortest BIG_CITY wall (the other six: 57–130 edges, 37–66 towers); slots 3, 5 and 13 (the same cell): 57, 80 and 58 edges, 40, 49 and 37 towers |
| the request's size key and water keys equal the slot's (PC-16) | `create-request.json` | BIG_CITY; coast key coastal and rivers true |
| the request hash | sha256 of the PUT row's body, recomputed outside the script | `e18a980c526b`, 274 299 bytes; exactly one PUT row with a body in the recording; `create-request.json` parses to the same object |
| the request equals slots 3, 5 and 13's (the same cell) | leaf diffs of the requests | **0 semantic differences** against each; only the 45 client-random partner ids differ. All four have the same 26 top-level keys. |
| the request differs from slots 1, 11 and 15 (BIG_CITY, `none`) only by the water options | leaf diffs of the requests | 8 semantic differences each: the 2 water keys and 6 leaves of the raw-resource entry the water options add (the list shifts by one); 0 size-dependent; plus 45 partner ids |
| the request differs from slots 2, 4, 12 and 16 (BIG_TOWN, the same water) only by the size | leaf diffs of the requests | 15 semantic differences each: the size key and the 14 size-dependent values that differ between BIG_TOWN and BIG_CITY (section 10.3's table); plus 45 partner ids |
| the request differs from slot 9's (METROPOLIS, the same water) only by the size | a leaf diff of the two requests | 8 semantic differences: the size key and 7 size-dependent values (the random-faction count, four first-stage values, the second stage's spoke cap, the religious-workers share); plus 45 partner ids |
| the request differs from the base within the named classes | the script's `requestDiff` and `vsSlot0` | against the base: 11 semantic (1 slot key, 10 size-dependent; the base was itself coastal with rivers, section 11.3 finding 2), `other` 0; against day 1: 23 semantic (14 size-dependent, the 2 water keys, 6 water-implied, the size key), `other` 0 |
| the checks discriminate (red tests) | this capture checked as every earlier slot, `--check-only` | as slots 3, 5 and 13 (the same cell): exit 0, as it must be. As slots 1, 11 and 15 (BIG_CITY, `none`): exit 1 (water keys, request diff, diff against slot 0). As slots 2, 4, 12 and 16 (BIG_TOWN, `coast+river`) and 7, 8 and 9 (METROPOLIS, `coast+river`): exit 1 (size key, same-size, border). As slots 0 and 6 (BIG_TOWN and METROPOLIS, `none`; each its size's first): exit 1 (size key, water keys, request diff, diff against slot 0, border). As slots 10 and 14 (BIG_TOWN, `none`, later draws): exit 1 (those five and same-size). |
| the runner is the profiler's code | `cmp` of the scratchpad copies against `profiler/` before the start | identical: session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…`, package.json `25e7d362…`, lib/instrument.js `cca253ac…`; port 9341; no FTG process and no `Singleton*` file before; `session closed`, no `Singleton*` file and port 9341 free after, and no FTG process once this run's leftover helper had exited by itself (28.4 call 2); both `.session` files absent before and after |
| only the seat used the window | the scroll readings and the recording's hosts, documents and writes | root scroll 0 → 0 across the landing, hover empty; one document load (the landing); hosts: the site, its API, the site's identity provider (one token renewal by the site's own sign-in library as the landing loaded, answered 200, as in slots 8 and 13), analytics, error reporting (one of its uploads got no answer), fonts and one GPU-benchmark file from a public package CDN; exactly one write to the site's settlements API (the create; listed twice, as the request and its interception); no page outside the site |
| one settlement made (plan 2.1b (6)) | the PUT status and the list before and after | PUT 200; the list's rows 17 → 18, the new row of size BIG_CITY carrying the PUT's settlement id; no retry |
| the slot bind is safe | `plan.py --bind-ftg 17=…`, then `--check` and a diff against the pre-bind copy | `plan.json` byte-equal to the pre-flight copy just before the bind (no second writer in between); one line changed (slot 17's capture); SAME for both files; `metrics.m-1.json` byte-unchanged (`8a0efa7e…`); `plan.py` unchanged (`68709ba8…`). `plan.json` sha256 moves from `67614c8e…` to `7577dc4d…`. |
| no account identifier in the files written | grep of the README, `capture-facts.json`, `create-request.json`, `request-diff.txt`, `structure.md`, `steps.jsonl`, this section, the header update, the JSON entry, the checklist line, the result file and this lane's `lane-events.log` lines for an email pattern, the display name, a token prefix and a full id | see the result file's privacy row |

### 28.3 Findings

1. **The size-dependent values repeat in the seventh BIG_CITY (CONFIRMED).** All 17 equal slot 1's, as slots 3, 5, 11,
   13 and 15 found. The 17-value class needed no change (R-41).
2. **The shortest BIG_CITY wall, round the harbour quarter only (counts and shots CONFIRMED; cause PLAUSIBLE).** The
   request asks for the wall exactly as slots 3, 5 and 13's do. This draw has 40 wall edges and 25 towers, where the
   six earlier big cities have 57–130 edges and 37–66 towers; it is shorter than three of the seven big towns' walls
   (slots 0, 2 and 14: 42, 49 and 44 edges). Shots 014 and 018 show the wall as one line with towers from the shore
   down to the northern channel: it closes the harbour quarter on its land side, and the sea and the channel close the
   rest. Most of the city lies outside it. That is the pattern of slot 16's big town (section 27.3 finding 2), now at
   BIG_CITY. Why the first stage's quarter is walled alone is PLAUSIBLE only. **For W-05b:** a short wall with few
   towers is a valid draw at BIG_CITY too; it is not a decode fault.
3. **The same request gives a different city again (CONFIRMED).** Against slots 3, 5 and 13 (the same cell, equal
   requests): 7 311 buildings against 7 342, 7 270 and 7 328; 10 715 edges and 8 329 nodes against 11 121 / 8 400,
   10 164 / 7 984 and 11 713 / 9 000; 6 districts against 4, 4 and 5; 5 water bodies against 4, 3 and 4. The seven
   BIG_CITY captures still span 7 164–7 696 buildings. The server's own seed remains the PLAUSIBLE source (sections
   14.3, 21.3, 23.3, 25.3, 26.3).
4. **Five water bodies (count and extents CONFIRMED; reading PLAUSIBLE).** The polygons have 12, 51, 108, 136 and 558
   points. Their farthest points lie 236, 1 145, 3 061, 2 825 and 3 889 m from the centre; 3 889 m is the border
   square's corner. The 558-point polygon spans the square's whole width and is PLAUSIBLY the sea. The 136-point one
   reaches the east border and the 108-point one the south border: PLAUSIBLY the river's east and south arms. The
   51-point one, about 1.2 km long and 0.2 km wide south-west of the centre, is PLAUSIBLY a channel to the sea. The 12-point
   one within 236 m of the centre is PLAUSIBLY of the near-centre kind of slots 3, 5 and 13 (7, 20 and 15 points
   within 284–302 m). Shot 014 shows the sea, the river arms and the two channels; no pond is read in it.
5. **The payload holds every known field path (CONFIRMED).** 198 distinct field paths: exactly the union of slots
   0–16's 198, none new and none absent, as in slots 5, 7 and 8 (the other captures hold 172–188).
6. **The premium account took an eighteenth settlement with no prompt (CONFIRMED).** The list held 17 rows before and 18
   after; no limit, payment or upgrade prompt appeared. Whether a lapsed premium would refuse one stays PLAUSIBLE only.
7. **The site renewed its sign-in in the background (CONFIRMED; nothing to do).** As the landing loaded, the site's own
   sign-in library exchanged its stored renewal token for fresh session tokens at the site's identity provider (one call,
   answered 200), as in slots 8 and 13. No sign-in page or prompt appeared and the seat typed nothing. The recording
   that holds those tokens stays under `captures/`, which git ignores, and is not quoted.
8. **Server time and payload (CONFIRMED; time contended).** The payload is 1.36 MB (slots 3, 5 and 13: 1.26, 1.26 and
   1.36 MB) and the server time 7.1 s, the longest at BIG_CITY so far (slots 1, 3, 5, 11, 13 and 15: 5.7, 6.3, 6.0,
   6.2, 6.0 and 6.0 s); the machine was shared, so the difference is not read. The layout body was in the folder at the
   poll's first look. The account list gives 24 673 people against the nominal 24 500 (slots 1, 3, 5, 11, 13 and 15:
   24 367, 24 755, 24 597, 24 961, 24 436 and 26 099).

### 28.4 Calls and deviations (vetoable)

1. **No deviation from checklist sections H and I.** The `--full` shot of the settlements view (002) was taken as H3
   prescribes; the form and the map then ran in the 1440×632 window. Every click and select had a `text` reading, a
   `shot` and, for coordinate clicks, an `elementFromPoint` reading before it, and a form-state reading after it. The
   pre-create shot (013) was taken after the hit test (section 26.4 call 2). Setting the coast select (select 7) to the
   coastal option moved no box: rivers (1008, 498) and forests (1008, 556) before the scroll, the reserve area
   (1008, 367) and walled (1008, 396) after it, "Create Settlement" 1 of 1 at (947, 522) inside the dialog.
2. **This run's leftover browser helper exited by itself; no signal was sent.** After `drive.mjs stop` printed "session
   closed", one Chrome utility helper stayed alive with no parent, as in slots 13 to 16. It was this run's own process:
   its user-data directory is this runner's profile link and it started at the session's start (01:41:00 EDT). Before
   the seat acted on checklist I's slot-13 note, it had exited on its own, within about a minute of the stop, leaving no
   `Singleton*` file. No process was signalled. So the helper does not always need ending: a seat can first wait a
   minute and re-check.
3. **`SIZE_DEPENDENT` was not touched** (R-41 forbids widening it on a later capture of a size); the same-size check
   passed as it stands.
4. **A second visit to the settlements view after the create** (one guarded navigation click) read the list. It changed
   nothing. The hover readings named only the points of the seat's own last clicks (the walled box before the create,
   the zoom control before the home link). The re-roll control showed in the first two map shots (014, 015) and was
   gone after the zooms (018). It was never clicked.
5. **One CHECKPOINT figure, corrected in the next line.** The site-work CHECKPOINT line gave 8.1 GiB free, the
   pre-session figure; `df` after the session read 8.0 GiB, and the post CHECKPOINT line says so.

### 28.5 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read) are every number in sections 28.1 and 28.2, findings 1, 2 (the equal requests, the wall
counts, the shots), 3 (the request equality and the differing counts), 4 (the field-6 counts and extents), 5, 6, 7 and
8, and the listed population. PLAUSIBLE (reasoning only) are any cause of the short wall, that the server's seed makes
equal requests differ, what the five field-6 polygons are, that the listed population is a generated count, and that a
lapsed premium would refuse a further settlement.

## 29 Slot 18 (programme 2) — 2026-10-04, BIG_TOWN, `none`

Lane `m1/W-02-slot18b`, under the owner's go for programme 2 (`owner-go.json`). One settlement was created, with one
create click, by checklist sections H (with H12's guarded clicks, H13's list count and H14's redacting helper) and I.
Before the create, slot 18 was open and slots 0–17 bound, the newest folder was slot 17's (its one create is slot 17's
own), no lane line named a slot-18 key, and the account list held 18 settlements (big town 7, big city 7, metropolis 4:
the earlier settlement and slots 1 to 17), so no slot-18 settlement existed. The landing's root scroll container read 0
at the first reading and 0 again just before the "Home" click, and no hover was on the page: no sign of another hand.

### 29.1 The capture

| field (README) | value |
|---|---|
| capture id | `2026-10-04T06-00-29` |
| account | the owner's signed-in account, premium since J164; the list held 18 settlements before and 19 after (no counter) |
| size / rung | BIG_TOWN / TOWN |
| `WaterSetting` | `none` (the request's coast key empty, rivers false) |
| population, source | 5 600, `nominal`. The account list gives 5 781 (section 9.1; recorded, not used). |
| server date; PUT sent | 2026-10-04 (UTC; 02:03 EDT); 06:03:29.100 UTC (the response date headers read 06:03:30 and 06:03:32 GMT) |
| server time | 1.951 s, from the PUT being sent to the layout GET being sent. **Contended**: M0's build seats and M-1 research seats shared the machine, so this feeds no time row (plan-check PC-11). |
| buildings | 1 712 |
| request hash | `2e3cbb89d175`: sha256 of the exact 274 285-byte PUT body |
| `referenceBuild` | `ftg:2026-10-04+2e3cbb89d175` |
| payload | 376 314 bytes, Fetch-intercepted (`intercept-0035…bin`, sha256 `7ea5d8b225518ba8…`) |
| road graph | 3 003 edges, 2 639 nodes; 46 wall edges (edge type 7) |
| wall towers / water bodies / districts | 22 / 4 / 3 |
| settlement border | a square with half width 2 000.00 m, the size ladder's 4 000 m width |
| capture folder | 36 MB: 12 MB of session recording and 23 MB of screenshots at 2× (no CPU profile). Free disk: 8.2 GB before, 8.1 GB after the session (other lanes writing too). |

**Form values.** The size was set to the big-town option, chosen by its request key as in slots 6–17: the seat read each
size option's React element key by `eval`; exactly one of the 12 options carried `BIG_TOWN`, and the selected option's
key was re-read after the select and again in the form-final reading. The metropolis option was not touched. The water
was the form's own default: no coast, rivers off. The farm box was already on; the forest, reserve-area and wall boxes
were switched on. Everything else stayed at FTG's default presets, and the name was left blank. All settings was never
opened (shots 004–010; values verified by `eval` before the create click). Every click and select was its own command
after its readings, and every coordinate click had an `elementFromPoint` reading naming its control; a form-state
reading after each step showed the dialog still open (`steps/steps.jsonl`, 18 shots). The 11 form, map and navigation
commands equal slots 10 and 14's (the same cell) in order, coordinates and size text. The map (shot 012, 500 m bar)
shows a small town in the middle of the square. A short ring wall with towers encloses its inner district (one district
label inside the wall, two outside it), and houses spread along the roads around it, most of them outside the wall.
Open grassland with scattered trees covers the west half, with a forest in the south-west corner; hedged fields of crops
and pasture cover the east half. Three small ponds are in view: to the north, south-west of the town, and far to the
west near the border. The core shot (016) has a 250 m bar.

### 29.2 Checks (all executed 2026-10-04, CONFIRMED)

| check | how | result |
|---|---|---|
| all checks of `ftg_capture_post.py` | `--slot 18 --signed-in --premium`, `--check-only` first, then the writing run: exit 0 both times (the script unchanged since slot 6, `735922948e3970fb…`) | 10 of 10 pass: calls, size key, water keys, the request diff against the base, the diff against slot 0, the same-size values (**17 of 17 equal slot 0's**), decode, border, no resident field, `pb_raw` runs |
| the payload decodes: field 3 edges and nodes, field 8 buildings | `python3 tools/pb_raw.py <payload>` (the post script's run, and a fresh run) | exit 0, 177 distinct field paths; 3.1 × 3 003, 3.2 × 2 639, 8 × 1 712, 7 × 22, 6 × 4, 10 × 3; `structure.md` equals a fresh run apart from its title path |
| the wall in the payload | `research/baselines/adapters/ftg.py`'s decoder over the eight BIG_TOWN captures, edges counted by type | 46 type-7 (wall) edges, 827 m long, every wall node within 241 m of the centre, and 22 towers; slots 0, 10 and 14 (the same cell): 42, 34 and 44 edges, 25, 17 and 23 towers |
| the request's size key and water keys equal the slot's (PC-16) | `create-request.json` | BIG_TOWN; coast key empty and rivers false |
| the request hash | sha256 of the PUT row's body, recomputed outside the script | `2e3cbb89d175`, 274 285 bytes; exactly one PUT row with a body in the recording; `create-request.json` parses to the same object |
| the request equals slots 0, 10 and 14's (the same cell) | leaf diffs of the requests | **0 semantic differences** against each; only the 45 client-random partner ids differ. All four have the same 26 top-level keys. |
| the request differs from slots 2, 4, 12 and 16 (BIG_TOWN, `coast+river`) only by the water options | leaf diffs of the requests | 8 semantic differences each: the 2 water keys and 6 leaves of the raw-resource entry the water options add (the list shifts by one); 0 size-dependent; plus 45 partner ids |
| the request differs from slots 1, 11 and 15 (BIG_CITY, the same water) only by the size | leaf diffs of the requests | 15 semantic differences each: the size key and the 14 size-dependent values that differ between BIG_CITY and BIG_TOWN (section 10.3's table); plus 45 partner ids |
| the request differs from slot 6's (METROPOLIS, the same water) only by the size | a leaf diff of the two requests | 16 semantic differences: the size key and 15 size-dependent values; plus 45 partner ids |
| the request differs from the base within the named classes | the script's `requestDiff` and `vsSlot0` | against the base: 20 semantic (3 slot keys, 6 water-implied, 11 size-dependent), `other` 0; against day 1: 0 semantic |
| the checks discriminate (red tests) | this capture checked as every earlier slot, `--check-only` | as slots 0, 10 and 14 (the same cell): exit 0, as it must be. As slots 1 and 6 (BIG_CITY and METROPOLIS, `none`; each its size's first): exit 1 (size key, border). As slots 11 and 15 (BIG_CITY, `none`, later draws): exit 1 (size key, same-size, border). As slots 2, 4, 12 and 16 (BIG_TOWN, `coast+river`): exit 1 (water keys, request diff, diff against slot 0). As slots 3, 5, 7, 8, 9, 13 and 17 (BIG_CITY and METROPOLIS, `coast+river`): exit 1 (size key, water keys, request diff, diff against slot 0, same-size, border). |
| the runner is the profiler's code | `cmp` of the scratchpad copies against `profiler/` before the start | identical: session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…`, package.json `25e7d362…`, lib/instrument.js `cca253ac…`; port 9341; no FTG process and no `Singleton*` file before; `session closed`, no `Singleton*` file, port 9341 free and no FTG process at once after the stop and again about four minutes later (29.4 call 2); both `.session` files absent before and after |
| only the seat used the window | the scroll readings and the recording's hosts, documents and writes | root scroll 0 → 0 across the landing, hover empty; one document load (the landing); hosts: the site, its API, analytics, error reporting, fonts and one GPU-benchmark file from a public package CDN (as in slots 2–17), and no call to the site's identity provider this time; exactly one write to the site's settlements API (the create; listed twice, as the request and its interception); no page outside the site |
| one settlement made (plan 2.1b (6)) | the PUT status and the list before and after | PUT 200; the list's rows 18 → 19, the new row of size BIG_TOWN carrying the PUT's settlement id; no retry |
| the slot bind is safe | `plan.py --bind-ftg 18=…`, then `--check` and a diff against the pre-bind copy | `plan.json` byte-equal to the pre-flight copy just before the bind (no second writer in between); one line changed (slot 18's capture); SAME for both files; `metrics.m-1.json` byte-unchanged (`8a0efa7e…`); `plan.py` unchanged (`68709ba8…`). `plan.json` sha256 moves from `7577dc4d…` to `2d420b3e…`. |
| no account identifier in the files written | grep of the README, `capture-facts.json`, `create-request.json`, `request-diff.txt`, `structure.md`, `steps.jsonl`, this section, the header update, the JSON entry, the checklist line, the result file and this lane's `lane-events.log` lines for an email pattern, the display name, a token prefix and a full id | see the result file's privacy row |

### 29.3 Findings

1. **The size-dependent values repeat in the eighth BIG_TOWN (CONFIRMED).** All 17 equal slot 0's, as slots 2, 4, 10,
   12, 14 and 16 found. The 17-value class needed no change (R-41).
2. **The same request gives a different town again (CONFIRMED).** Against slots 0, 10 and 14 (the same cell, equal
   requests): 1 712 buildings against 1 694, 1 675 and 1 826; 3 003 edges and 2 639 nodes against 3 266 / 3 003,
   3 288 / 2 895 and 3 597 / 3 145; 22 towers against 25, 17 and 23; 46 wall edges against 42, 34 and 44; 3 districts
   against 3, 2 and 3. The eight BIG_TOWN captures still span 1 610–1 880 buildings. The server's own seed remains the
   PLAUSIBLE source (sections 14.3, 21.3, 23.3, 25.3).
3. **Four ponds in a big town with no coast and no river (counts and extents CONFIRMED; reading PLAUSIBLE).** Field 6
   occurs four times. The polygons have 14, 25, 14 and 29 points, each 42–86 m across, all inside the 2 000 m border.
   Their centres lie about 0.86 km north of the centre, 0.50 km south-south-west, 1.99 km west (near the west border)
   and 2.36 km south-east (towards the square's corner). Shot 012 shows the first three as small ponds; the fourth lies
   outside the window. Slot 14 (the same cell) had two ponds and slots 0 and 10 none. Field 6 now appears in 4 of the 8
   `none` captures (slots 1, 6, 14 and 18, with 3, 1, 2 and 4 bodies; slots 0, 10, 11 and 15 have none). This keeps
   section 25.3 finding 3's PLAUSIBLE reading: field 6 can hold ponds that come from the draw, not from the water
   options. W-05b's water rows read `coast+river` slots only (plan 2.1b, R-33), so these ponds feed no water row as
   planned.
4. **The wall is a short ring round the inner district (counts CONFIRMED; reading of the shots PLAUSIBLE).** 46 wall
   edges and 22 towers, 827 m of wall with every wall node within 241 m of the centre. Among the eight big towns that
   is the second-most wall edges (slot 2 has 49) and a middling length (594–998 m among the seven walled ones; slot 12
   has none). Shots 012 and 016 show it closing round the inner district, with most houses outside it; the walls of
   slots 0, 10 and 14 (the same cell) also stay within 198–257 m of the centre. Slot 12 stays the only wall-less
   capture of 19.
5. **The payload's paths are a subset of the earlier union (CONFIRMED).** 177 distinct field paths, none new. Of the 21
   absent from the union of slots 0–17's 198: 11.1 and its parts (absent in slots 2, 3, 4, 9, 10, 13, 14 and 16 too),
   11.6 and its parts (absent in slots 0, 2, 3, 4, 10, 12, 13, 14, 15 and 16 too), 11.7 and its parts (absent in slots
   1, 3, 4, 6, 9, 10, 11 and 12 too) and 11.8.2 and its parts (absent in slots 0, 1, 3, 4, 6, 10, 11, 14 and 15 too).
6. **The premium account took a nineteenth settlement with no prompt (CONFIRMED).** The list held 18 rows before and 19
   after; no limit, payment or upgrade prompt appeared. Whether a lapsed premium would refuse one stays PLAUSIBLE only.
7. **Server time and payload (CONFIRMED; time contended).** The payload is 0.38 MB (slots 0, 10 and 14: 0.40, 0.38 and
   0.41 MB) and the server time 2.0 s (the other BIG_TOWN captures: 1.9–4.4 s). The layout body was in the folder at
   the poll's first look. The account list gives 5 781 people against the nominal 5 600 (slots 2, 4, 10, 12, 14 and 16:
   5 906, 6 221, 5 544, 5 491, 6 033 and 5 552).

### 29.4 Calls and deviations (vetoable)

1. **No deviation from checklist sections H and I.** The `--full` shot of the settlements view (002) was taken as H3
   prescribes; the form and the map then ran in the 1440×632 window. Every click and select had a `text` reading, a
   `shot` and, for coordinate clicks, an `elementFromPoint` reading before it, and a form-state reading after it. The
   pre-create shot (011) was taken after the hit test (section 26.4 call 2). The coast select and the rivers box were
   already at the slot's values (the form's defaults), so neither was touched, as in slots 1, 6, 10, 11, 14 and 15:
   forests (1008, 556) before the scroll, the reserve area (1008, 367) and walled (1008, 396) after it, "Create
   Settlement" 1 of 1 at (947, 522) inside the dialog.
2. **No browser helper outlived the stop this time; no process was signalled.** After `drive.mjs stop` printed "session
   closed", `pgrep -fl profiles/ftg` was empty at once and again about four minutes later. Slots 13 to 17 each had one
   leftover helper of their own run (section 28.4 call 2). Checklist I's slot-13 and slot-17 notes stay as written.
3. **`SIZE_DEPENDENT` was not touched** (R-41 forbids widening it on a later capture of a size); the same-size check
   passed as it stands.
4. **A second visit to the settlements view after the create** (one guarded navigation click) read the list. It changed
   nothing. The hover readings named only the points of the seat's own last clicks (the "Home" point on the settlements
   view, the walled box before the create, the map canvas after it). The re-roll control showed in the first two map
   shots (012, 013) and was gone after the zooms (016). It was never clicked. The overview `--full` shot (013) drew the
   scale bar without its label, as in slot 10; the window shot just before it (012) reads 500 m.

### 29.5 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read) are every number in sections 29.1 and 29.2, findings 1, 2 (the request equality and the
differing counts), 3 (the field-6 counts, sizes and positions), 4 (the wall counts, length and radius), 5, 6 and 7, and
the listed population. PLAUSIBLE (reasoning only) are that the server's seed makes equal requests differ, that the four
field-6 polygons are ponds that come from the draw rather than the water options, the reading of the wall in the shots,
that a lapsed premium would refuse a further settlement, and that the listed population is the generated resident
count.
