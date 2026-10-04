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

**Update, programme 2, slot 19 (2026-10-04 06:32 UTC, signed in, premium since J164): the eighth BIG_CITY.** Lane
`m1/W-02-slot19b`. Slot 19 (`capture/FTG/BIG_CITY/none/3`) is `captures/ftg/2026-10-04T06-30-03`: a BIG_CITY settlement
with no coast and rivers off, 7 174 buildings, 9 470 road edges and 7 595 nodes, 51 wall towers (100 wall edges, a
roughly triangular ring round the inner district), no water body and 5 districts on a 5 500 m square; `referenceBuild`
`ftg:2026-10-04+6a85e3718382`. All 10 checks pass on the first run, its 17 size-dependent values equal slot 1's (the
same-size check), its request equals slots 1, 11 and 15's (the same cell) apart from the 45 client-random ids, the slot
is bound, and `plan.py --check` reads SAME (section 30). The account list held 19 settlements before and 20 after, with
no prompt.

**Update, programme 2, slot 20 (2026-10-04 06:45 UTC, signed in, premium since J164): the ninth BIG_TOWN.** Lane
`m1/W-02-slot20b`. Slot 20 (`capture/FTG/BIG_TOWN/coast+river/4`) is `captures/ftg/2026-10-04T06-42-05`: a BIG_TOWN
settlement on the coast with rivers on, 1 672 buildings, 3 583 road edges and 3 126 nodes, 14 wall towers (32 wall
edges, 499 m: the fewest towers and the shortest wall so far, one line closing a harbour quarter), 3 water bodies and 4
districts on a 4 000 m square; `referenceBuild` `ftg:2026-10-04+21432c73dce0`. All 10 checks pass on the first run, its
17 size-dependent values equal slot 0's (the same-size check), its request equals slots 2, 4, 12 and 16's (the same
cell) apart from the 45 client-random ids, the slot is bound, and `plan.py --check` reads SAME (section 31). The account
list held 20 settlements before and 21 after, with no prompt.

**Update, programme 2, slot 21 (2026-10-04 06:58 UTC, signed in, premium since J164): the ninth BIG_CITY.** Lane
`m1/W-02-slot21b`. Slot 21 (`capture/FTG/BIG_CITY/coast+river/4`) is `captures/ftg/2026-10-04T06-55-42`: a BIG_CITY
settlement on the coast with rivers on, 7 603 buildings, 11 890 road edges and 9 121 nodes, 23 wall towers (41 wall
edges, 789 m: the fewest towers and the shortest wall at BIG_CITY, one line closing a harbour quarter), 4 water bodies
and 5 districts on a 5 500 m square; `referenceBuild` `ftg:2026-10-04+e2fe1aca7649`. All 10 checks pass on the first
run, its 17 size-dependent values equal slot 1's (the same-size check), its request equals slots 3, 5, 13 and 17's (the
same cell) apart from the 45 client-random ids, the slot is bound, and `plan.py --check` reads SAME (section 32). The
account list held 21 settlements before and 22 after, with no prompt.

**Update, programme 2, slot 22 (2026-10-04 07:10 UTC, signed in, premium since J164): the tenth BIG_TOWN.** Lane
`m1/W-02-slot22b`. Slot 22 (`capture/FTG/BIG_TOWN/coast+river/5`) is `captures/ftg/2026-10-04T07-07-33`: a BIG_TOWN
settlement on the coast with rivers on, 1 789 buildings, 3 749 road edges and 3 255 nodes, 18 wall towers (36 wall
edges, 714 m, one line closing the harbour quarter), 7 water bodies (four of them small ponds) and 2 districts on a
4 000 m square; `referenceBuild` `ftg:2026-10-04+d2c182d38b90`. All 10 checks pass on the first run, its 17
size-dependent values equal slot 0's (the same-size check), its request equals slots 2, 4, 12, 16 and 20's (the same
cell) apart from the 45 client-random ids, the slot is bound, and `plan.py --check` reads SAME (section 33). BIG_TOWN
now has its ten captures (4 `none`, 6 `coast+river`). The account list held 22 settlements before and 23 after, with no
prompt.

**Update, programme 2, slot 23 (2026-10-04 07:23 UTC, signed in, premium since J164): the tenth BIG_CITY.** Lane
`m1/W-02-slot23b`. Slot 23 (`capture/FTG/BIG_CITY/coast+river/5`) is `captures/ftg/2026-10-04T07-21-10`: a BIG_CITY
settlement on the coast with rivers on, 7 108 buildings (the fewest at BIG_CITY), 9 254 road edges and 7 366 nodes,
47 wall towers (83 wall edges, 1 557 m, in two open lines), 3 water bodies and 4 districts on a 5 500 m square;
`referenceBuild` `ftg:2026-10-04+7ce26f7b8581`. All 10 checks pass on the first run, its 17 size-dependent values equal
slot 1's (the same-size check), its request equals slots 3, 5, 13, 17 and 21's (the same cell) apart from the 45
client-random ids, the slot is bound, and `plan.py --check` reads SAME (section 34). BIG_CITY now has its ten captures
(4 `none`, 6 `coast+river`), as BIG_TOWN has since slot 22. The account list held 23 settlements before and 24 after,
with no prompt.

**Update, programme 2, slot 24 (2026-10-04 07:37 UTC, signed in, premium since J164): the first CITY.** Lane
`m1/W-02-slot24b`. Slot 24 (`capture/FTG/CITY/none/0`) is `captures/ftg/2026-10-04T07-34-12`: a CITY settlement with no
coast and rivers off, 2 881 buildings, 4 123 road edges and 3 664 nodes, 36 wall towers (76 wall edges, 1 494 m, one
closed ring), 0 water bodies and 4 districts on a 5 000 m square; `referenceBuild` `ftg:2026-10-04+1efe31200956`. All
10 checks pass on the first run. Under the first-of-size rule (R-41) no leaf outside the 17 named values differs: the
request differs from the 2026-09-21 CITY base only by the water options, and its 17 size-dependent values equal the
base's, so `SIZE_DEPENDENT` is unchanged. The slot is bound, and `plan.py --check` reads SAME (section 35). The account
list held 24 settlements before and 25 after, with no prompt.

**Update, programme 2, slot 25 (2026-10-04 07:54 UTC, signed in, premium since J164): the second CITY.** Lane
`m1/W-02-slot25b`. Slot 25 (`capture/FTG/CITY/coast+river/2`) is `captures/ftg/2026-10-04T07-50-43`: a CITY settlement
on the coast with rivers on, 2 770 buildings, 5 131 road edges and 4 195 nodes, 13 wall towers (27 wall edges, 526 m,
one open line closing the harbour quarter), 6 water bodies and 3 districts on a 5 000 m square; `referenceBuild`
`ftg:2026-10-04+b7db525fe189`. All 10 checks pass on the first run, and its 17 size-dependent values equal slot 24's
(the same-size check). Its request equals the 2026-09-21 CITY base request apart from the 45 client-random ids, so the
two are draws of one request. The recorded CITY family now holds three usable captures. The slot is bound, and
`plan.py --check` reads SAME (section 36). The account list held 25 settlements before and 26 after, with no prompt.

**Update, programme 2, slot 26 (2026-10-04 08:08 UTC, signed in, premium since J164): the first TOWN.** Lane
`m1/W-02-slot26b`. Slot 26 (`capture/FTG/TOWN/none/0`) is `captures/ftg/2026-10-04T08-06-17`: a TOWN settlement with no
coast and rivers off, 1 102 buildings, 2 417 road edges and 1 985 nodes, 27 wall towers (49 wall edges, 1 178 m, one
closed ring), 0 water bodies and 2 districts on a 3 500 m square; `referenceBuild` `ftg:2026-10-04+de113ff3f066`. As the
first capture of a new size (R-41) it brought eleven values the class did not yet name: FTG's client gives the town a
single layout stage where the larger sizes have two, so the first stage's identifier and building placement differ and
nine values of the second stage are absent. They joined the class by name (28 values) on this capture's controlled
comparison and the client's stage builder. All 10 checks then pass, the slot is bound, and `plan.py --check` reads SAME
(section 37). The account list held 26 settlements before and 27 after, with no prompt.
**Update, programme 2, slot 27's first seat (2026-10-04 08:31 UTC): STOPPED, nothing created.** Lane
`m1/W-02-slot27b` set the whole form and stopped before the create click: the create dialog scrolled back to its top
while the seat only read it (section 38). No settlement was made and the account was not written to. Slot 27
(`capture/FTG/TOWN/coast+river/0`) stays open in `plan.json`; a relaunch needs the window left alone.

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

## 30 Slot 19 (programme 2) — 2026-10-04, BIG_CITY, `none`

Lane `m1/W-02-slot19b`, under the owner's go for programme 2 (`owner-go.json`). One settlement was created, with one
create click, by checklist sections H (with H12's guarded clicks, H13's list count and H14's redacting helper) and I.
Before the create, slot 19 was open and slots 0–18 bound, the newest folder was slot 18's (its one create is slot 18's
own), no lane line named a slot-19 key, and the account list held 19 settlements (big town 8, big city 7, metropolis 4:
the earlier settlement and slots 1 to 18), so no slot-19 settlement existed. The landing's root scroll container read 0
at the first reading and 0 again just before the "Home" click, and no hover was on the page: no sign of another hand.

### 30.1 The capture

| field (README) | value |
|---|---|
| capture id | `2026-10-04T06-30-03` |
| account | the owner's signed-in account, premium since J164; the list held 19 settlements before and 20 after (no counter) |
| size / rung | BIG_CITY / CITY |
| `WaterSetting` | `none` (the request's coast key empty, rivers false) |
| population, source | 24 500, `nominal`. The account list gives 24 614 (section 9.1; recorded, not used). |
| server date; PUT sent | 2026-10-04 (UTC; 02:32 EDT); 06:32:28.414 UTC (the response date headers read 06:32:34 and 06:32:36 GMT) |
| server time | 6.528 s, from the PUT being sent to the layout GET being sent. **Contended**: M0's build seats and M-1 research seats shared the machine, so this feeds no time row (plan-check PC-11). |
| buildings | 7 174 |
| request hash | `6a85e3718382`: sha256 of the exact 274 288-byte PUT body |
| `referenceBuild` | `ftg:2026-10-04+6a85e3718382` |
| payload | 1 221 783 bytes, Fetch-intercepted (`intercept-0035…bin`, sha256 `7a048d704a411955…`) |
| road graph | 9 470 edges, 7 595 nodes; 100 wall edges (edge type 7) |
| wall towers / water bodies / districts | 51 / 0 / 5 |
| settlement border | a square with half width 2 750.00 m, the size ladder's 5 500 m width |
| capture folder | 44 MB: 13 MB of session recording and 31 MB of screenshots at 2× (no CPU profile). Free disk: 11 GB before and 11 GB after the session (other lanes writing too). |

**Form values.** The size was set to the big-city option, chosen by its request key as in slots 6–18: the seat read each
size option's React element key by `eval`; exactly one of the 12 options carried `BIG_CITY`, and the selected option's
key was re-read after the select and again in the form-final reading. The metropolis option was not touched. The water
was the form's own default: no coast, rivers off. The farm box was already on; the forest, reserve-area and wall boxes
were switched on. Everything else stayed at FTG's default presets, and the name was left blank. All settings was never
opened (shots 004–010; values verified by `eval` before the create click). Every click and select was its own command
after its readings, and every coordinate click had an `elementFromPoint` reading naming its control; a form-state
reading after each step showed the dialog still open (`steps/steps.jsonl`, 18 shots). The 11 form, map and navigation
commands equal slots 1, 11 and 15's (the same cell) in order, coordinates and size text. The map (shot 012, 500 m bar)
shows a city with a walled, roughly triangular core holding one district label, four more districts outside the wall
(north-west, north-east, south-east and south), dense houses spreading along the roads on every side and in long arms
to the west and east, a large forest over the west and south-west, hedged fields of crops and pasture everywhere else,
and no water. The core shot (016) has a 250 m bar.

### 30.2 Checks (all executed 2026-10-04, CONFIRMED)

| check | how | result |
|---|---|---|
| all checks of `ftg_capture_post.py` | `--slot 19 --signed-in --premium`, `--check-only` first, then the writing run: exit 0 both times (the script unchanged since slot 6, `735922948e3970fb…`) | 10 of 10 pass: calls, size key, water keys, the request diff against the base, the diff against slot 0, the same-size values (**17 of 17 equal slot 1's**), decode, border, no resident field, `pb_raw` runs |
| the payload decodes: field 3 edges and nodes, field 8 buildings | `python3 tools/pb_raw.py <payload>` (the post script's run, and a fresh run) | exit 0, 184 distinct field paths; 3.1 × 9 470, 3.2 × 7 595, 8 × 7 174, 7 × 51, 6 × 0, 10 × 5; `structure.md` equals a fresh run apart from its title path |
| the wall in the payload | `research/baselines/adapters/ftg.py`'s decoder over the eight BIG_CITY captures, edges counted by type | 100 type-7 (wall) edges, 1 861 m long, every wall node within 396 m of the centre, and 51 towers; slots 1, 11 and 15 (the same cell): 130, 116 and 92 edges, 2 368, 2 128 and 1 756 m, within 488, 435 and 416 m, 66, 62 and 49 towers |
| the request's size key and water keys equal the slot's (PC-16) | `create-request.json` | BIG_CITY; coast key empty and rivers false |
| the request hash | sha256 of the PUT row's body, recomputed outside the script | `6a85e3718382`, 274 288 bytes; exactly one PUT row with a body in the recording; `create-request.json` parses to the same object |
| the request equals slots 1, 11 and 15's (the same cell) | leaf diffs of the requests | **0 semantic differences** against each; only the 45 client-random partner ids differ. All four have the same 26 top-level keys. |
| the request differs from slots 3, 5, 13 and 17 (BIG_CITY, `coast+river`) only by the water options | leaf diffs of the requests | 8 semantic differences each: the 2 water keys and 6 leaves of the raw-resource entry the water options add (the list shifts by one); 0 size-dependent; plus 45 partner ids |
| the request differs from slots 0, 10, 14 and 18 (BIG_TOWN, the same water) only by the size | leaf diffs of the requests | 15 semantic differences each: the size key and the 14 size-dependent values that differ between BIG_TOWN and BIG_CITY (section 10.3's table); plus 45 partner ids |
| the request differs from slot 6's (METROPOLIS, the same water) only by the size | a leaf diff of the two requests | 8 semantic differences: the size key and 7 size-dependent values (the random-faction count, four first-stage values, the second stage's spoke cap, the religious-workers share); plus 45 partner ids |
| the request differs from the base within the named classes | the script's `requestDiff` and `vsSlot0` | against the base: 19 semantic (3 slot keys, 6 water-implied, 10 size-dependent), `other` 0; against day 1: 15 semantic (14 size-dependent), `other` 0 |
| the checks discriminate (red tests) | this capture checked as every earlier slot, `--check-only` | as slots 1, 11 and 15 (the same cell): exit 0, as it must be. As slots 0 and 6 (BIG_TOWN and METROPOLIS, `none`; each its size's first): exit 1 (size key, border). As slots 10, 14 and 18 (BIG_TOWN, `none`, later draws): exit 1 (size key, same-size, border). As slots 3, 5, 13 and 17 (BIG_CITY, `coast+river`): exit 1 (water keys, request diff, diff against slot 0). As slots 2, 4, 7, 8, 9, 12 and 16 (BIG_TOWN and METROPOLIS, `coast+river`): exit 1 (size key, water keys, request diff, diff against slot 0, same-size, border). |
| the runner is the profiler's code | `cmp` of the scratchpad copies against `profiler/` before the start | identical: session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…`, package.json `25e7d362…`, lib/instrument.js `cca253ac…`; port 9341; no FTG process and no `Singleton*` file before; `session closed`, no `Singleton*` file, port 9341 free and no FTG process at once after the stop and again about half a minute later (30.4 call 2); both `.session` files absent before and after |
| only the seat used the window | the scroll readings and the recording's hosts, documents and writes | root scroll 0 → 0 across the landing, hover empty; one document load (the landing); hosts: the site, its API, analytics, error reporting, fonts and one GPU-benchmark file from a public package CDN (as in slots 2–18), and no call to the site's identity provider; exactly one write to the site's settlements API (the create; listed twice, as the request and its interception); no page outside the site |
| one settlement made (plan 2.1b (6)) | the PUT status and the list before and after | PUT 200; the list's rows 19 → 20, the new row of size BIG_CITY carrying the PUT's settlement id; no retry |
| the slot bind is safe | `plan.py --bind-ftg 19=…`, then `--check` and a diff against the pre-bind copy | `plan.json` byte-equal to the pre-flight copy just before the bind (no second writer in between); one line changed (slot 19's capture); SAME for both files; `metrics.m-1.json` byte-unchanged (`8a0efa7e…`); `plan.py` unchanged (`68709ba8…`). `plan.json` sha256 moves from `2d420b3e…` to `fac17995…`. |
| no account identifier in the files written | grep of the README, `capture-facts.json`, `create-request.json`, `request-diff.txt`, `structure.md`, `steps.jsonl`, this section, the header update, the JSON entry, the checklist line, the result file and this lane's `lane-events.log` lines for an email pattern, the display name, a token prefix and a full id | see the result file's privacy row |

### 30.3 Findings

1. **The size-dependent values repeat in the eighth BIG_CITY (CONFIRMED).** All 17 equal slot 1's, as slots 3, 5, 11,
   13, 15 and 17 found. The 17-value class needed no change (R-41).
2. **The same request gives a different city again (CONFIRMED).** Against slots 1, 11 and 15 (the same cell, equal
   requests): 7 174 buildings against 7 164, 7 376 and 7 696; 9 470 edges and 7 595 nodes against 7 236 / 6 302,
   8 427 / 6 835 and 10 937 / 8 566; 51 towers against 66, 62 and 49; 100 wall edges against 130, 116 and 92; 5
   districts against 5, 6 and 5. The eight BIG_CITY captures still span 7 164–7 696 buildings; this one is the second
   lowest. Its road graph lies between the other `none` draws', again mostly through edge type 4 (4 349 here against
   2 157, 3 458 and 5 180). The server's own seed remains the PLAUSIBLE source of the spread (sections 14.3, 21.3, 23.3,
   25.3).
3. **No standing water (CONFIRMED).** Field 6 is absent, as in slots 11 and 15, where slot 1 (the same cell) had 3
   bodies. Field 6 now appears in 4 of the 9 `none` captures (slots 1, 6, 14 and 18; slots 0, 10, 11, 15 and 19 have
   none), which fits section 25.3 finding 3's PLAUSIBLE reading: ponds come from the draw, not from the water options.
4. **The wall is a ring round the inner district (counts CONFIRMED; reading of the shots PLAUSIBLE).** 100 wall edges and
   51 towers, 1 861 m of wall with every wall node within 396 m of the centre: between slots 11 and 15 in edges and
   length, and the tightest of the four `none` BIG_CITY walls (slots 1, 11 and 15: within 488, 435 and 416 m). Shots 012
   and 016 show it closing round the one district inside it, with the four other districts outside it.
5. **The payload's paths are a subset of the earlier union (CONFIRMED).** 184 distinct field paths, none new. Of the 14
   absent from the union of slots 0–18's 198: field 6 and its parts (no water body, as in slots 0, 10, 11 and 15), 11.7
   and its parts (absent in slots 1, 3, 4, 6, 9, 10, 11, 12 and 18 too) and 11.8.2 and its parts (absent in slots 0, 1,
   3, 4, 6, 10, 11, 14, 15 and 18 too).
6. **The premium account took a twentieth settlement with no prompt (CONFIRMED).** The list held 19 rows before and 20
   after; no limit, payment or upgrade prompt appeared. Whether a lapsed premium would refuse one stays PLAUSIBLE only.
7. **Server time, payload and listed population (CONFIRMED; time contended; meaning of the listed figure PLAUSIBLE).** The
   payload is 1.22 MB (slots 1, 11 and 15: 1.13, 1.19 and 1.33 MB) and the server time 6.5 s (the other BIG_CITY
   captures: 5.7–7.1 s). The layout body was in the folder at the poll's first looks, within seconds of the click. The
   account list gives 24 614 people against the nominal 24 500 (slots 1, 3, 5, 11, 13, 15 and 17: 24 367, 24 755,
   24 597, 24 961, 24 436, 26 099 and 24 673). Across the eight BIG_CITY captures the listed figure and the building
   count rank alike with a Spearman coefficient of 0.83 (section 26.3 finding 4's reading, one more sample); the rows
   keep `populationSource: nominal` until the ruling slot 1 asked for.

### 30.4 Calls and deviations (vetoable)

1. **No deviation from checklist sections H and I.** The `--full` shot of the settlements view (002) was taken as H3
   prescribes; the form and the map then ran in the 1440×632 window. Every click and select had a `text` reading, a
   `shot` and, for coordinate clicks, an `elementFromPoint` reading before it, and a form-state reading after it. The
   pre-create shot (011) was taken after the hit test (section 26.4 call 2). The coast select and the rivers box were
   already at the slot's values (the form's defaults), so neither was touched, as in slots 1, 6, 10, 11, 14, 15 and 18:
   forests (1008, 556) before the scroll, the reserve area (1008, 367) and walled (1008, 396) after it, "Create
   Settlement" 1 of 1 at (947, 522) inside the dialog.
2. **No browser helper outlived the stop; no process was signalled.** After `drive.mjs stop` printed "session closed",
   `pgrep -fl profiles/ftg` was empty at once and again about half a minute later, as in slot 18. Checklist I's slot-13
   and slot-17 notes stay as written.
3. **`SIZE_DEPENDENT` was not touched** (R-41 forbids widening it on a later capture of a size); the same-size check
   passed as it stands.
4. **A second visit to the settlements view after the create** (one guarded navigation click) read the list. It changed
   nothing. The hover readings named only the points of the seat's own last clicks (the walled box before the create,
   the map canvas after it, the zoom control, the header at the home-link point). The re-roll control showed in the
   first two map shots (012, 013) and was gone after the zooms (016). It was never clicked. The overview `--full` shot
   (013) drew the scale bar without its label, as in slots 10 and 18; the window shot just before it (012) reads 500 m.

### 30.5 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read) are every number in sections 30.1 and 30.2, findings 1, 2 (the request equality and the
differing counts), 3 (the field-6 counts), 4 (the wall counts, length and radius), 5, 6 and 7 (the sizes, times, listed
populations and the rank coefficient). PLAUSIBLE (reasoning only) are that the server's seed makes equal requests
differ, that field 6 holds ponds that come from the draw, the reading of the wall in the shots, that a lapsed premium
would refuse a further settlement, and that the listed population is the generated resident count.

## 31 Slot 20 (programme 2) — 2026-10-04, BIG_TOWN, `coast+river`

Lane `m1/W-02-slot20b`, under the owner's go for programme 2 (`owner-go.json`). One settlement was created, with one
create click, by checklist sections H (with H12's guarded clicks, H13's list count and H14's redacting helper) and I.
Before the create, slot 20 was open and slots 0–19 bound, the newest folder was slot 19's (its one create is slot 19's
own), no lane line named a slot-20 key, and the account list held 20 settlements (big town 8, big city 8, metropolis 4:
the earlier settlement and slots 1 to 19), so no slot-20 settlement existed. The landing's root scroll container read 0
at the first reading and 0 again just before the "Home" click, and no hover was on the page: no sign of another hand.

### 31.1 The capture

| field (README) | value |
|---|---|
| capture id | `2026-10-04T06-42-05` |
| account | the owner's signed-in account, premium since J164; the list held 20 settlements before and 21 after (no counter) |
| size / rung | BIG_TOWN / TOWN |
| `WaterSetting` | `coast+river` (the request's coast key coastal, rivers true) |
| population, source | 5 600, `nominal`. The account list gives 5 537 (section 9.1; recorded, not used). |
| server date; PUT sent | 2026-10-04 (UTC; 02:45 EDT); 06:45:11.866 UTC (the response date headers read 06:45:13 and 06:45:14 GMT) |
| server time | 2.127 s, from the PUT being sent to the layout GET being sent. **Contended**: M0's build seats and M-1 research seats shared the machine, so this feeds no time row (plan-check PC-11). |
| buildings | 1 672 |
| request hash | `21432c73dce0`: sha256 of the exact 274 296-byte PUT body |
| `referenceBuild` | `ftg:2026-10-04+21432c73dce0` |
| payload | 463 590 bytes, Fetch-intercepted (`intercept-0037…bin`, sha256 `1199279e05f5a685…`) |
| road graph | 3 583 edges, 3 126 nodes; 32 wall edges (edge type 7) |
| wall towers / water bodies / districts | 14 / 3 / 4 |
| settlement border | a square with half width 2 000.00 m, the size ladder's 4 000 m width |
| capture folder | 36 MB: 12 MB of session recording and 23 MB of screenshots at 2× (no CPU profile). Free disk: 11 GB before and 11 GB after the session (other lanes writing too). |

**Form values.** The size was set to the big-town option, chosen by its request key as in slots 6–19: the seat read each
size option's React element key by `eval`; exactly one of the 12 options carried `BIG_TOWN`, and the selected option's
key was re-read after the select and again in the form-final reading. The metropolis option was not touched. The coast
select was set to the coastal option, and the river, forest, reserve-area and wall boxes were switched on; the farm box
was already on. Everything else stayed at FTG's default presets, and the name was left blank. All settings was never
opened (shots 004–013; values verified by `eval` before the create click). Every click and select was its own command
after its readings, and every coordinate click had an `elementFromPoint` reading naming its control; a form-state
reading after each step showed the dialog still open (`steps/steps.jsonl`, 20 shots). The 13 form, map and navigation
commands equal slots 2, 4, 12 and 16's (the same cell) in order, coordinates and size text. The map (shot 014, 500 m
bar) shows the sea over the north-west half, its shore running from the north-east corner to the south-west, and a
river from the south reaching it. The town lies at the river mouth on both banks: a small walled quarter at the harbour
on the west bank holds one district label and a basin with a pier, a second district lies beside it inland, a third
along the shore to the south-west, and a fourth across the river on the east bank, with two bridges between the banks.
Hedged fields of crops and pasture lie east of the river, large woods to the north-east and south-east, and open
grassland with scattered trees over the south-west. The core shot (018) has a 250 m bar.

### 31.2 Checks (all executed 2026-10-04, CONFIRMED)

| check | how | result |
|---|---|---|
| all checks of `ftg_capture_post.py` | `--slot 20 --signed-in --premium`, `--check-only` first, then the writing run: exit 0 both times (the script unchanged since slot 6, `735922948e3970fb…`) | 10 of 10 pass: calls, size key, water keys, the request diff against the base, the diff against slot 0, the same-size values (**17 of 17 equal slot 0's**), decode, border, no resident field, `pb_raw` runs |
| the payload decodes: field 3 edges and nodes, field 8 buildings | `python3 tools/pb_raw.py <payload>` (the post script's run, and a fresh run) | exit 0, 183 distinct field paths; 3.1 × 3 583, 3.2 × 3 126, 8 × 1 672, 7 × 14, 6 × 3, 10 × 4; `structure.md` equals a fresh run apart from its title path |
| the wall in the payload | `research/baselines/adapters/ftg.py`'s decoder over slots 0–20, edges counted by type | 32 type-7 (wall) edges, 499 m long, every wall node within 405 m of the centre, and 14 towers: the fewest towers and the shortest wall of the 20 walled captures (the others: 16–93 towers, 594–3 296 m; 29–180 edges); slots 2, 4, 12 and 16 (the same cell): 49, 38, 0 and 29 edges, 998, 806, 0 and 594 m, within 258, 232, – and 265 m, 31, 22, 0 and 16 towers |
| the request's size key and water keys equal the slot's (PC-16) | `create-request.json` | BIG_TOWN; coast key coastal and rivers true |
| the request hash | sha256 of the PUT row's body, recomputed outside the script | `21432c73dce0`, 274 296 bytes; exactly one PUT row with a body in the recording; `create-request.json` parses to the same object |
| the request equals slots 2, 4, 12 and 16's (the same cell) | leaf diffs of the requests | **0 semantic differences** against each; only the 45 client-random partner ids differ. All five have the same 26 top-level keys. |
| the request differs from slots 0, 10, 14 and 18 (BIG_TOWN, `none`) only by the water options | leaf diffs of the requests | 8 semantic differences each: the 2 water keys and 6 leaves of the raw-resource entry the water options add (the list shifts by one); 0 size-dependent; plus 45 partner ids |
| the request differs from slots 3, 5, 13 and 17 (BIG_CITY, the same water) only by the size | leaf diffs of the requests | 15 semantic differences each: the size key and the 14 size-dependent values that differ between BIG_CITY and BIG_TOWN (section 10.3's table); plus 45 partner ids |
| the request differs from slot 9's (METROPOLIS, the same water) only by the size | a leaf diff of the two requests | 16 semantic differences: the size key and 15 size-dependent values; plus 45 partner ids |
| the request differs from the base within the named classes | the script's `requestDiff` and `vsSlot0` | against the base: 12 semantic (1 slot key, 11 size-dependent; the base was itself coastal with rivers, section 11.3 finding 2), `other` 0; against day 1: 8 semantic (2 water keys, 6 water-implied), `other` 0 |
| the checks discriminate (red tests) | this capture checked as every earlier slot, `--check-only` | as slots 2, 4, 12 and 16 (the same cell): exit 0, as it must be. As slots 0, 10, 14 and 18 (BIG_TOWN, `none`): exit 1 (water keys, request diff, diff against slot 0). As slots 3, 5, 7, 8, 9, 13 and 17 (BIG_CITY and METROPOLIS, `coast+river`): exit 1 (size key, same-size, border). As slots 1 and 6 (each its size's first, `none`): exit 1 (size key, water keys, request diff, diff against slot 0, border). As slots 11, 15 and 19 (BIG_CITY, `none`, later draws): exit 1 (those five and same-size). |
| the runner is the profiler's code | `cmp` of the scratchpad copies against `profiler/` before the start | identical: session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…`, package.json `25e7d362…`, lib/instrument.js `cca253ac…`; port 9341; no FTG process and no `Singleton*` file before; `session closed`, no `Singleton*` file, port 9341 free and no FTG process at once after the stop and again about two minutes later (31.4 call 2); both `.session` files absent before and after |
| only the seat used the window | the scroll readings and the recording's hosts, documents and writes | root scroll 0 → 0 across the landing, hover empty; one document load (the landing); hosts: the site, its API, analytics, error reporting, fonts, one GPU-benchmark file from a public package CDN (as in slots 2–19), and one background call to the site's identity provider as the landing loaded (answered 200; the token renewal of checklist I's slot-13 note, as in slots 8 and 13; no prompt); exactly one write to the site's settlements API (the create; listed twice, as the request and its interception); no page outside the site |
| one settlement made (plan 2.1b (6)) | the PUT status and the list before and after | PUT 200; the list's rows 20 → 21, the new row of size BIG_TOWN carrying the PUT's settlement id; no retry |
| the slot bind is safe | `plan.py --bind-ftg 20=…`, then `--check` and a diff against the pre-bind copy | `plan.json` byte-equal to the pre-flight copy just before the bind (no second writer in between); one line changed (slot 20's capture); SAME for both files; `metrics.m-1.json` byte-unchanged (`8a0efa7e…`); `plan.py` unchanged (`68709ba8…`). `plan.json` sha256 moves from `fac17995…` to `da68f069…`. |
| no account identifier in the files written | grep of the README, `capture-facts.json`, `create-request.json`, `request-diff.txt`, `structure.md`, `steps.jsonl`, this section, the header update, the JSON entry, the checklist line, the result file and this lane's `lane-events.log` lines for an email pattern, the display name, a token prefix and a full id | see the result file's privacy row |

### 31.3 Findings

1. **The size-dependent values repeat in the ninth BIG_TOWN (CONFIRMED).** All 17 equal slot 0's, as slots 2, 4, 10,
   12, 14, 16 and 18 found. The 17-value class needed no change (R-41).
2. **The shortest wall so far, one line closing the harbour quarter (counts CONFIRMED; reading of the shots CONFIRMED;
   cause PLAUSIBLE).** The request asks for the wall exactly as slots 2, 4, 12 and 16's do. This draw has 32 wall edges,
   499 m of wall and 14 towers: the fewest towers and the shortest wall of the 20 walled captures (slot 16 had 16 towers
   and 594 m; its 29 edges stay the fewest). Every wall node lies within 405 m of the centre, the farthest of the five
   draws of this request (258, 232 and 265 m for slots 2, 4 and 16), because the walled quarter sits at the harbour off
   the centre. Shot 018 shows the wall as one line from the shore north of the harbour to the shore south-west of it,
   closing one small quarter with one district label on its land side, with the other three districts outside it: the
   shape slot 17 showed at BIG_CITY. Across the five draws of this one request the wall now ranges from none to 49
   edges. **For W-05b:** a single wall line closing a harbour quarter is a valid draw for the wall rows; it is not a
   decode fault.
3. **The same request gives a different town again (CONFIRMED).** Against slots 2, 4, 12 and 16 (the same cell, equal
   requests): 1 672 buildings against 1 821, 1 880, 1 610 and 1 675; 3 583 edges and 3 126 nodes against 4 197 / 3 558,
   4 215 / 3 571, 2 987 / 2 639 and 3 648 / 3 186; 4 districts against 4, 4, 2 and 4; 3 water bodies against 3, 4, 4
   and 5. The nine BIG_TOWN captures still span 1 610–1 880 buildings; this one is the second lowest. The server's own
   seed remains the PLAUSIBLE source (sections 14.3, 21.3, 23.3, 25.3).
4. **Three water bodies (count CONFIRMED; reading PLAUSIBLE).** The polygons have 15, 113 and 388 points; their farthest
   points lie 333, 2 353 and 2 828 m from the centre. Shot 014 shows the sea, the river and the harbour basin, and no
   pond. The 388-point polygon reaching the corner is PLAUSIBLY the sea, the 113-point one PLAUSIBLY the river, and the
   15-point one near the centre PLAUSIBLY the near-centre kind seen in slots 2, 4, 12 and 16.
5. **The largest BIG_TOWN payload so far, from one edge type (CONFIRMED; cause PLAUSIBLE).** The payload is 0.46 MB
   (the eight earlier BIG_TOWN captures: 0.38–0.43 MB) although the building count is the second lowest. Edge type 14
   accounts for 468 edges here against 183, 288, 288 and 366 in slots 2, 4, 12 and 16; it appears in the `coast+river`
   BIG_TOWN captures only (none in slots 0, 10, 14 and 18). What type 14 draws is not read here; the hedged fields east
   of the river in shot 014 are PLAUSIBLY part of it.
6. **The payload's paths are a subset of the earlier union (CONFIRMED).** 183 distinct field paths, none new. Of the 15
   absent from the union of slots 0–19's 198: 11.1 and its parts (absent in slots 2, 3, 4, 9, 10, 13, 14, 16 and 18
   too), 11.6 and its parts (absent in slots 0, 2, 3, 4, 10, 12, 13, 14, 15, 16 and 18 too) and 11.7 and its parts
   (absent in slots 1, 3, 4, 6, 9, 10, 11, 12, 18 and 19 too).
7. **The premium account took a twenty-first settlement with no prompt (CONFIRMED).** The list held 20 rows before and 21
   after; no limit, payment or upgrade prompt appeared. Whether a lapsed premium would refuse one stays PLAUSIBLE only.
8. **Server time and listed population (CONFIRMED; time contended; meaning of the listed figure PLAUSIBLE).** The server
   time is 2.1 s (slots 2, 4, 12 and 16: 1.9, 2.2, 4.4 and 2.6 s). The layout body was in the folder at the poll's first
   look, within seconds of the click. The account list gives 5 537 people against the nominal 5 600 (the seven earlier
   signed-in BIG_TOWN captures: 5 491–6 221). Across the eight BIG_TOWN captures with a listed figure (slots 2, 4, 10,
   12, 14, 16, 18 and 20; slot 0, the guest capture, has none) the listed figure and the building count rank alike with
   a Spearman coefficient of 0.99 (section 26.3 finding 4's reading; section 30.3 finding 7 found 0.83 at BIG_CITY); the
   rows keep `populationSource: nominal` until the ruling slot 1 asked for.

### 31.4 Calls and deviations (vetoable)

1. **No deviation from checklist sections H and I.** The `--full` shot of the settlements view (002) was taken as H3
   prescribes; the form and the map then ran in the 1440×632 window. Every click and select had a `text` reading, a
   `shot` and, for coordinate clicks, an `elementFromPoint` reading before it, and a form-state reading after it. The
   pre-create shot (013) was taken after the hit test (section 26.4 call 2). Setting the coast select (select 7) to the
   coastal option moved no box: rivers (1008, 498) and forests (1008, 556) before the scroll, the reserve area
   (1008, 367) and walled (1008, 396) after it, "Create Settlement" 1 of 1 at (947, 522) inside the dialog.
2. **No browser helper outlived the stop; no process was signalled.** After `drive.mjs stop` printed "session closed",
   `pgrep -fl profiles/ftg` was empty at once and again about two minutes later, as in slots 18 and 19. Checklist I's
   slot-13 and slot-17 notes stay as written.
3. **`SIZE_DEPENDENT` was not touched** (R-41 forbids widening it on a later capture of a size); the same-size check
   passed as it stands.
4. **A second visit to the settlements view after the create** (one guarded navigation click) read the list. It changed
   nothing. The hover readings named only the points of the seat's own last clicks (the dialog under the "New
   Settlement" point, the walled box before the create, the map canvas after it, the zoom control). The page reported
   window focus from the settlements view on (it did not on the landing); no hover, scroll or page change came with it,
   so it is read as the full-frame shot raising the window, not another hand (PLAUSIBLE). The re-roll control showed in
   the first two map shots (014, 015) and was gone after the zooms (018). It was never clicked. The overview `--full`
   shot (015) drew the scale bar without its label, as in slots 10, 18 and 19; the window shot just before it (014)
   reads 500 m.

### 31.5 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read) are every number in sections 31.1 and 31.2, findings 1, 2 (the equal requests, the wall
counts, length and radius, the shots), 3 (the request equality and the differing counts), 4 (the field-6 counts and
extents), 5 (the payload sizes and edge-type counts), 6, 7 and 8 (the times, listed populations and the rank
coefficient). PLAUSIBLE (reasoning only) are any cause of the short wall, that the server's seed makes equal requests
differ, what the three field-6 polygons are, what edge type 14 draws, that the focus change was the seat's own shot,
that a lapsed premium would refuse a further settlement, and that the listed population is the generated resident
count.

## 32 Slot 21 (programme 2) — 2026-10-04, BIG_CITY, `coast+river`

Lane `m1/W-02-slot21b`, under the owner's go for programme 2 (`owner-go.json`). One settlement was created, with one
create click, by checklist sections H (with H12's guarded clicks, H13's list count and H14's redacting helper) and I.
Before the create, slot 21 was open and slots 0–20 bound, the newest folder was slot 20's (its one create is slot 20's
own), no lane line named a slot-21 key, and the account list held 21 settlements (big town 9, big city 8, metropolis 4:
the earlier settlement and slots 1 to 20), so no slot-21 settlement existed. The landing's root scroll container read 0
at the first reading and 0 again just before the "Home" click, and no hover was on the page: no sign of another hand.

### 32.1 The capture

| field (README) | value |
|---|---|
| capture id | `2026-10-04T06-55-42` |
| account | the owner's signed-in account, premium since J164; the list held 21 settlements before and 22 after (no counter) |
| size / rung | BIG_CITY / CITY |
| `WaterSetting` | `coast+river` (the request's coast key coastal, rivers true) |
| population, source | 24 500, `nominal`. The account list gives 25 663 (section 9.1; recorded, not used). |
| server date; PUT sent | 2026-10-04 (UTC; 02:58 EDT); 06:58:15.757 UTC (the response date headers read 06:58:22 and 06:58:23 GMT) |
| server time | 6.704 s, from the PUT being sent to the layout GET being sent. **Contended**: M0's build seats and M-1 research seats shared the machine, so this feeds no time row (plan-check PC-11). |
| buildings | 7 603 |
| request hash | `e2fe1aca7649`: sha256 of the exact 274 299-byte PUT body |
| `referenceBuild` | `ftg:2026-10-04+e2fe1aca7649` |
| payload | 1 411 840 bytes, Fetch-intercepted (`intercept-0035…bin`, sha256 `5b38da132aa69a6b…`) |
| road graph | 11 890 edges, 9 121 nodes; 41 wall edges (edge type 7) |
| wall towers / water bodies / districts | 23 / 4 / 5 |
| settlement border | a square with half width 2 750.00 m, the size ladder's 5 500 m width |
| capture folder | 39 MB: 13 MB of session recording and 26 MB of screenshots at 2× (no CPU profile). Free disk: 11 GB before and 11 GB after the session (other lanes writing too). |

**Form values.** The size was set to the big-city option, chosen by its request key as in slots 6–20: the seat read each
size option's React element key by `eval`; exactly one of the 12 options carried `BIG_CITY`, and the selected option's
key was re-read after the select and again in the form-final reading. The metropolis option was not touched. The coast
select was set to the coastal option, and the river, forest, reserve-area and wall boxes were switched on; the farm box
was already on. Everything else stayed at FTG's default presets, and the name was left blank. All settings was never
opened (shots 004–013; values verified by `eval` before the create click). Every click and select was its own command
after its readings, and every coordinate click had an `elementFromPoint` reading naming its control; a form-state
reading after each step showed the dialog still open (`steps/steps.jsonl`, 20 shots). The 13 form, map and navigation
commands equal slots 3, 5, 13 and 17's (the same cell) in order, coordinates and size text. The map (shot 014, 500 m
bar) shows the sea along the whole east side. A river comes in from the north and forks near the top edge: one arm runs
south-west across the farmland to the south-west corner, the other curves south-east through the city and reaches the
sea, with a harbour basin and a mole at its mouth. A small district lies in the fork. The walled quarter lies between
the eastern arm and the sea, two districts lie north of it along the shore and one south of the arm. Hedged fields of
crops and pasture and open grassland lie to the west and south-west, and woods to the north-west. The core shot (018,
250 m bar) shows the wall: one line with towers from the eastern arm north-east to the shore, closing the harbour
quarter on its land side.

### 32.2 Checks (all executed 2026-10-04, CONFIRMED)

| check | how | result |
|---|---|---|
| all checks of `ftg_capture_post.py` | `--slot 21 --signed-in --premium`, `--check-only` first, then the writing run: exit 0 both times (the script unchanged since slot 6, `735922948e3970fb…`) | 10 of 10 pass: calls, size key, water keys, the request diff against the base, the diff against slot 0, the same-size values (**17 of 17 equal slot 1's**), decode, border, no resident field, `pb_raw` runs |
| the payload decodes: field 3 edges and nodes, field 8 buildings | `python3 tools/pb_raw.py <payload>` (the post script's run, and a fresh run) | exit 0, 193 distinct field paths; 3.1 × 11 890, 3.2 × 9 121, 8 × 7 603, 7 × 23, 6 × 4, 10 × 5; `structure.md` equals a fresh run apart from its title path |
| the wall in the payload | `research/baselines/adapters/ftg.py`'s decoder over slots 0–21, edges counted by type | 41 type-7 (wall) edges, 789 m long, every wall node within 401 m of the centre, and 23 towers: the fewest towers and the shortest wall at BIG_CITY (the other eight: 25–66 towers, 827–2 368 m; 40–130 edges); slots 3, 5, 13 and 17 (the same cell): 57, 80, 58 and 40 edges, 1 211, 1 560, 1 339 and 827 m, 40, 49, 37 and 25 towers |
| the request's size key and water keys equal the slot's (PC-16) | `create-request.json` | BIG_CITY; coast key coastal and rivers true |
| the request hash | sha256 of the PUT row's body, recomputed outside the script | `e2fe1aca7649`, 274 299 bytes; exactly one PUT row with a body in the recording; `create-request.json` parses to the same object |
| the request equals slots 3, 5, 13 and 17's (the same cell) | leaf diffs of the requests | **0 semantic differences** against each; only the 45 client-random partner ids differ. All five have the same 26 top-level keys. |
| the request differs from slots 1, 11, 15 and 19 (BIG_CITY, `none`) only by the water options | leaf diffs of the requests | 8 semantic differences each: the 2 water keys and 6 leaves of the raw-resource entry the water options add (the list shifts by one); 0 size-dependent; plus 45 partner ids |
| the request differs from slots 2, 4, 12, 16 and 20 (BIG_TOWN, the same water) only by the size | leaf diffs of the requests | 15 semantic differences each: the size key and the 14 size-dependent values that differ between BIG_TOWN and BIG_CITY (section 10.3's table); plus 45 partner ids |
| the request differs from slot 9's (METROPOLIS, the same water) only by the size | a leaf diff of the two requests | 8 semantic differences: the size key and 7 size-dependent values (the random-faction count, four first-stage values, the second stage's spoke cap, the religious-workers share); plus 45 partner ids |
| the request differs from the base within the named classes | the script's `requestDiff` and `vsSlot0` | against the base: 11 semantic (1 slot key, 10 size-dependent; the base was itself coastal with rivers, section 11.3 finding 2), `other` 0; against day 1: 23 semantic (14 size-dependent, the 2 water keys, 6 water-implied, the size key), `other` 0 |
| the checks discriminate (red tests) | this capture checked as every earlier slot, `--check-only` | as slots 3, 5, 13 and 17 (the same cell): exit 0, as it must be. As slots 1, 11, 15 and 19 (BIG_CITY, `none`): exit 1 (water keys, request diff, diff against slot 0). As slots 2, 4, 12, 16 and 20 (BIG_TOWN, `coast+river`) and 7, 8 and 9 (METROPOLIS, `coast+river`): exit 1 (size key, same-size, border). As slots 0 and 6 (BIG_TOWN and METROPOLIS, `none`; each its size's first): exit 1 (size key, water keys, request diff, diff against slot 0, border). As slots 10, 14 and 18 (BIG_TOWN, `none`, later draws): exit 1 (those five and same-size). |
| the runner is the profiler's code | `cmp` of the scratchpad copies against `profiler/` before the start | identical: session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…`, package.json `25e7d362…`, lib/instrument.js `cca253ac…`; port 9341; no FTG process and no `Singleton*` file before; `session closed`, no `Singleton*` file, port 9341 free and no FTG process at once after the stop and again about two minutes later (32.4 call 2); both `.session` files absent before and after |
| only the seat used the window | the scroll readings and the recording's hosts, documents and writes | root scroll 0 → 0 across the landing, hover empty; one document load (the landing); hosts: the site, its API, analytics, error reporting, fonts and one GPU-benchmark file from a public package CDN (as in slots 2–20); no call to the site's identity provider this run (32.4 call 4); exactly one write to the site's settlements API (the create; listed twice, as the request and its interception); no page outside the site; no response of status 400 or above |
| one settlement made (plan 2.1b (6)) | the PUT status and the list before and after | PUT 200; the list's rows 21 → 22, the new row of size BIG_CITY carrying the PUT's settlement id; no retry |
| the slot bind is safe | `plan.py --bind-ftg 21=…`, then `--check` and a diff against the pre-bind copy | `plan.json` byte-equal to the pre-flight copy just before the bind (no second writer in between); one line changed (slot 21's capture); SAME for both files; `metrics.m-1.json` byte-unchanged (`8a0efa7e…`); `plan.py` unchanged (`68709ba8…`). `plan.json` sha256 moves from `da68f069…` to `6ad28659…`. |
| no account identifier in the files written | grep of the README, `capture-facts.json`, `create-request.json`, `request-diff.txt`, `structure.md`, `steps.jsonl`, this section, the header update, the JSON entry, the checklist line, the result file and this lane's `lane-events.log` lines for an email pattern, the display name, a token prefix and a full id | see the result file's privacy row |

### 32.3 Findings

1. **The size-dependent values repeat in the ninth BIG_CITY (CONFIRMED).** All 17 equal slot 1's, as slots 3, 5, 11,
   13, 15, 17 and 19 found. The 17-value class needed no change (R-41).
2. **The fewest towers and the shortest wall at BIG_CITY, one line closing the harbour quarter (counts and shots
   CONFIRMED; cause PLAUSIBLE).** The request asks for the wall exactly as slots 3, 5, 13 and 17's do. This draw has 41
   wall edges, 789 m of wall and 23 towers; the eight earlier big cities have 25–66 towers and 827–2 368 m (slot 17's
   40 edges stay the fewest). Every wall node lies within 401 m of the centre. Shot 018 shows the wall as one line with
   towers from the eastern river arm north-east to the shore: it closes the harbour quarter between the arm and the sea
   on its land side, and the arm and the sea close the rest; the other four districts lie outside it. That is the shape
   of slots 16, 17 and 20 (sections 27.3, 28.3 and 31.3 finding 2), now in two of the five draws of this BIG_CITY
   request. Why the first stage's quarter is walled alone is PLAUSIBLE only. **For W-05b:** a single wall line closing
   a harbour quarter is a valid BIG_CITY draw; it is not a decode fault.
3. **The same request gives a different city again (CONFIRMED).** Against slots 3, 5, 13 and 17 (the same cell, equal
   requests): 7 603 buildings against 7 342, 7 270, 7 328 and 7 311; 11 890 edges and 9 121 nodes against
   11 121 / 8 400, 10 164 / 7 984, 11 713 / 9 000 and 10 715 / 8 329; 5 districts against 4, 4, 5 and 6; 4 water
   bodies against 4, 3, 4 and 5. The edge and node counts are the highest at BIG_CITY so far, and the building count is
   the highest of the five coastal big cities; the nine BIG_CITY captures span 7 164–7 696 buildings (slot 15 keeps the
   most). The server's own seed remains the PLAUSIBLE source (sections 14.3, 21.3, 23.3, 25.3).
4. **Four water bodies (count and extents CONFIRMED; reading PLAUSIBLE).** The polygons have 11, 122, 170 and 469
   points; their farthest points lie 209, 2 956, 3 860 and 3 889 m from the centre; 3 889 m is the border square's
   corner. Shot 014 shows the sea along the east side, the river's two arms and the harbour basin, and no pond. The
   469-point polygon is PLAUSIBLY the sea, the 170- and 122-point ones PLAUSIBLY the two river arms, and the 11-point one
   within 209 m of the centre PLAUSIBLY the near-centre kind of slots 3, 5, 13 and 17 (7, 20, 15 and 12 points within
   236–302 m).
5. **The largest BIG_CITY payload so far (CONFIRMED; cause PLAUSIBLE).** The payload is 1.41 MB (the eight earlier
   BIG_CITY captures: 1.13–1.36 MB), with the most edges at this size. Edge type 14 accounts for 652 edges here against
   356, 430, 518 and 673 in slots 3, 5, 13 and 17; as at BIG_TOWN (section 31.3 finding 5) it appears in the
   `coast+river` captures only (none in slots 1, 11, 15 and 19). What type 14 draws is not read here.
6. **The payload's paths are a subset of the earlier union (CONFIRMED).** 193 distinct field paths, none new. The 5
   absent from the union of slots 0–20's 198 are 11.7 and its parts, absent in slots 1, 3, 4, 6, 9, 10, 11, 12, 18, 19
   and 20 too.
7. **The premium account took a twenty-second settlement with no prompt (CONFIRMED).** The list held 21 rows before and
   22 after; no limit, payment or upgrade prompt appeared. Whether a lapsed premium would refuse one stays PLAUSIBLE
   only.
8. **Server time and listed population (CONFIRMED; time contended; meaning of the listed figure PLAUSIBLE).** The server
   time is 6.7 s (slots 1, 3, 5, 11, 13, 15, 17 and 19: 5.7, 6.3, 6.0, 6.2, 6.0, 6.0, 7.1 and 6.5 s); the machine was
   shared, so the difference is not read. The layout body was in the folder at the poll's first look. The account list
   gives 25 663 people against the nominal 24 500 (the eight earlier BIG_CITY captures: 24 367–26 099). Across the nine
   BIG_CITY captures the listed figure and the building count rank alike with a Spearman coefficient of 0.88 (section
   30.3 finding 7 found 0.83 over eight); the rows keep `populationSource: nominal` until the ruling slot 1 asked for.

### 32.4 Calls and deviations (vetoable)

1. **No deviation from checklist sections H and I.** The `--full` shot of the settlements view (002) was taken as H3
   prescribes; the form and the map then ran in the 1440×632 window. Every click and select had a `text` reading, a
   `shot` and, for coordinate clicks, an `elementFromPoint` reading before it, and a form-state reading after it. The
   pre-create shot (013) was taken after the hit test (section 26.4 call 2). Setting the coast select (select 7) to the
   coastal option moved no box: rivers (1008, 498) and forests (1008, 556) before the scroll, the reserve area
   (1008, 367) and walled (1008, 396) after it, "Create Settlement" 1 of 1 at (947, 522) inside the dialog.
2. **No browser helper outlived the stop; no process was signalled.** After `drive.mjs stop` printed "session closed",
   `pgrep -fl profiles/ftg` was empty at once and again about two minutes later, as in slots 18 to 20. Checklist I's
   slot-13 and slot-17 notes stay as written.
3. **`SIZE_DEPENDENT` was not touched** (R-41 forbids widening it on a later capture of a size); the same-size check
   passed as it stands.
4. **A second visit to the settlements view after the create** (one guarded navigation click) read the list. It changed
   nothing. The hover readings named only the points of the seat's own last clicks (the walled box before the create,
   the map canvas under the create point after it, the zoom control before the home link). The page reported window
   focus from the settlements view on, after the full-frame shot, with no hover, scroll or page change: read as the shot
   raising the window, as in section 31.4 call 4 (PLAUSIBLE). Unlike slots 8, 13, 17 and 20, the landing made no
   background call to the site's identity provider this time; nothing was needed either way. The re-roll control showed
   in the first two map shots (014, 015) and was gone after the zooms (018). It was never clicked. The overview `--full`
   shot (015) drew the scale bar without its label, as in slots 10, 18, 19 and 20; the window shot just before it (014)
   reads 500 m.

### 32.5 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read) are every number in sections 32.1 and 32.2, findings 1, 2 (the equal requests, the wall
counts, length and radius, the shots), 3 (the request equality and the differing counts), 4 (the field-6 counts and
extents), 5 (the payload sizes and edge-type counts), 6, 7 and 8 (the times, listed populations and the rank
coefficient). PLAUSIBLE (reasoning only) are any cause of the short wall, that the server's seed makes equal requests
differ, what the four field-6 polygons are, what edge type 14 draws, that the focus change was the seat's own shot,
that a lapsed premium would refuse a further settlement, and that the listed population is the generated resident
count.

## 33 Slot 22 (programme 2) — 2026-10-04, BIG_TOWN, `coast+river`

Lane `m1/W-02-slot22b`, under the owner's go for programme 2 (`owner-go.json`). One settlement was created, with one
create click, by checklist sections H (with H12's guarded clicks, H13's list count and H14's redacting helper) and I.
Before the create, slot 22 was open and slots 0–21 bound, the newest folder was slot 21's (its one create is slot 21's
own), no lane line named a slot-22 key, and the account list held 22 settlements (big town 9, big city 9, metropolis 4:
the earlier settlement and slots 1 to 21), so no slot-22 settlement existed. The landing's root scroll container read 0
at the first reading and 0 again just before the "Home" click, and no hover was on the page: no sign of another hand.

### 33.1 The capture

| field (README) | value |
|---|---|
| capture id | `2026-10-04T07-07-33` |
| account | the owner's signed-in account, premium since J164; the list held 22 settlements before and 23 after (no counter) |
| size / rung | BIG_TOWN / TOWN |
| `WaterSetting` | `coast+river` (the request's coast key coastal, rivers true) |
| population, source | 5 600, `nominal`. The account list gives 6 102 (section 9.1; recorded, not used). |
| server date; PUT sent | 2026-10-04 (UTC; 03:10 EDT); 07:10:12.661 UTC (the response date headers read 07:10:14 and 07:10:15 GMT) |
| server time | 2.135 s, from the PUT being sent to the layout GET being sent. **Contended**: M0's build seats and M-1 research seats shared the machine, so this feeds no time row (plan-check PC-11). |
| buildings | 1 789 |
| request hash | `d2c182d38b90`: sha256 of the exact 274 296-byte PUT body |
| `referenceBuild` | `ftg:2026-10-04+d2c182d38b90` |
| payload | 429 178 bytes, Fetch-intercepted (`intercept-0035…bin`, sha256 `3e6a7d1bca99a844…`) |
| road graph | 3 749 edges, 3 255 nodes; 36 wall edges (edge type 7) |
| wall towers / water bodies / districts | 18 / 7 / 2 |
| settlement border | a square with half width 2 000.00 m, the size ladder's 4 000 m width |
| capture folder | 35 MB: 12 MB of session recording and 22 MB of screenshots at 2× (no CPU profile). Free disk: 11 GB before and 11 GB after the session (other lanes writing too). |

**Form values.** The size was set to the big-town option, chosen by its request key as in slots 6–21: the seat read each
size option's React element key by `eval`; exactly one of the 12 options carried `BIG_TOWN`, and the selected option's
key was re-read after the select and again in the form-final reading. The metropolis option was not touched. The coast
select was set to the coastal option, and the river, forest, reserve-area and wall boxes were switched on; the farm box
was already on. Everything else stayed at FTG's default presets, and the name was left blank. All settings was never
opened (shots 004–013; values verified by `eval` before the create click). Every click and select was its own command
after its readings, and every coordinate click had an `elementFromPoint` reading naming its control; a form-state
reading after each step showed the dialog still open (`steps/steps.jsonl`, 20 shots). The 13 form, map and navigation
commands equal slots 2, 4, 12, 16 and 20's (the same cell) in order, coordinates and size text. The map (shot 014,
500 m bar) shows the sea along the whole east side, with a strip of beach in the north, and a river that comes in from
the west-south-west and crosses the south of the map to the sea. The town lies on the shore just north of the river
mouth. A small walled quarter at the harbour, with a pier at its shore, holds one district label; the second district
label lies beside it, outside the wall on its south-west side, and a small suburb lies south of the river across a
bridge. Hedged fields of crops and pasture cover the west and north, with woods in the north-west corner and three
small ponds among the fields. The core shot (018, 250 m bar) shows the wall: one curved line with towers from the shore
north of the harbour round to the shore south of it, closing the harbour quarter on its land side.

### 33.2 Checks (all executed 2026-10-04, CONFIRMED)

| check | how | result |
|---|---|---|
| all checks of `ftg_capture_post.py` | `--slot 22 --signed-in --premium`, `--check-only` first, then the writing run: exit 0 both times (the script unchanged since slot 6, `735922948e3970fb…`) | 10 of 10 pass: calls, size key, water keys, the request diff against the base, the diff against slot 0, the same-size values (**17 of 17 equal slot 0's**), decode, border, no resident field, `pb_raw` runs |
| the payload decodes: field 3 edges and nodes, field 8 buildings | `python3 tools/pb_raw.py <payload>` (the post script's run, and a fresh run) | exit 0, 183 distinct field paths; 3.1 × 3 749, 3.2 × 3 255, 8 × 1 789, 7 × 18, 6 × 7, 10 × 2; `structure.md` equals a fresh run apart from its title path |
| the wall in the payload | `research/baselines/adapters/ftg.py`'s decoder over slots 0–22, edges counted by type | 36 type-7 (wall) edges, 714 m long, every wall node within 251 m of the centre, and 18 towers; the ten BIG_TOWN captures now span 0–31 towers, 0–998 m and 0–49 edges; slots 2, 4, 12, 16 and 20 (the same cell): 49, 38, 0, 29 and 32 edges, 998, 806, 0, 594 and 499 m, within 258, 232, –, 265 and 405 m, 31, 22, 0, 16 and 14 towers |
| the request's size key and water keys equal the slot's (PC-16) | `create-request.json` | BIG_TOWN; coast key coastal and rivers true |
| the request hash | sha256 of the PUT row's body, recomputed outside the script | `d2c182d38b90`, 274 296 bytes; exactly one PUT row with a body in the recording; `create-request.json` parses to the same object |
| the request equals slots 2, 4, 12, 16 and 20's (the same cell) | leaf diffs of the requests | **0 semantic differences** against each; only the 45 client-random partner ids differ. All six have the same 26 top-level keys. |
| the request differs from slots 0, 10, 14 and 18 (BIG_TOWN, `none`) only by the water options | leaf diffs of the requests | 8 semantic differences each: the 2 water keys and 6 leaves of the raw-resource entry the water options add (the list shifts by one); 0 size-dependent; plus 45 partner ids |
| the request differs from slots 3, 5, 13, 17 and 21 (BIG_CITY, the same water) only by the size | leaf diffs of the requests | 15 semantic differences each: the size key and the 14 size-dependent values that differ between BIG_CITY and BIG_TOWN (section 10.3's table); plus 45 partner ids |
| the request differs from slot 9's (METROPOLIS, the same water) only by the size | a leaf diff of the two requests | 16 semantic differences: the size key and 15 size-dependent values; plus 45 partner ids |
| the request differs from the base within the named classes | the script's `requestDiff` and `vsSlot0` | against the base: 12 semantic (1 slot key, 11 size-dependent; the base was itself coastal with rivers, section 11.3 finding 2), `other` 0; against day 1: 8 semantic (2 water keys, 6 water-implied), `other` 0 |
| the checks discriminate (red tests) | this capture checked as every earlier slot, `--check-only` | as slots 2, 4, 12, 16 and 20 (the same cell): exit 0, as it must be. As slots 0, 10, 14 and 18 (BIG_TOWN, `none`): exit 1 (water keys, request diff, diff against slot 0). As slots 3, 5, 7, 8, 9, 13, 17 and 21 (BIG_CITY and METROPOLIS, `coast+river`): exit 1 (size key, same-size, border). As slots 1 and 6 (each its size's first, `none`): exit 1 (size key, water keys, request diff, diff against slot 0, border). As slots 11, 15 and 19 (BIG_CITY, `none`, later draws): exit 1 (those five and same-size). The check-only runs wrote nothing (the folder held `session/` and `steps/` only until the writing run). |
| the runner is the profiler's code | `cmp` of the scratchpad copies against `profiler/` before the start | identical: session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…`, package.json `25e7d362…`, lib/instrument.js `cca253ac…`; port 9341; no FTG process and no `Singleton*` file before; `session closed`, no `Singleton*` file, port 9341 free and no FTG process at once after the stop and again about three minutes later (33.4 call 2); both `.session` files absent before and after |
| only the seat used the window | the scroll readings and the recording's hosts, documents and writes | root scroll 0 → 0 across the landing, hover empty; one document load (the landing); hosts: the site, its API, analytics, error reporting, fonts and one GPU-benchmark file from a public package CDN (as in slots 2–21); no call to the site's identity provider this run (as in slot 21); exactly one write to the site's settlements API (the create; listed twice, as the request and its interception); no page outside the site; no response of status 400 or above |
| one settlement made (plan 2.1b (6)) | the PUT status and the list before and after | PUT 200; the list's rows 22 → 23, the new row of size BIG_TOWN carrying the PUT's settlement id; no retry |
| the slot bind is safe | `plan.py --bind-ftg 22=…`, then `--check` and a diff against the pre-bind copy | `plan.json` byte-equal to the pre-flight copy just before the bind (no second writer in between); one line changed (slot 22's capture); SAME for both files; `metrics.m-1.json` byte-unchanged (`8a0efa7e…`); `plan.py` unchanged (`68709ba8…`). `plan.json` sha256 moves from `6ad28659…` to `a08cec0a…`. |
| no account identifier in the files written | grep of the README, `capture-facts.json`, `create-request.json`, `request-diff.txt`, `structure.md`, `steps.jsonl`, this section, the header update, the JSON entry, the checklist line, the result file and this lane's `lane-events.log` lines for an email pattern, the display name, a token prefix and a full id | see the result file's privacy row |

### 33.3 Findings

1. **The size-dependent values repeat in the tenth BIG_TOWN (CONFIRMED).** All 17 equal slot 0's, as slots 2, 4, 10,
   12, 14, 16, 18 and 20 found. The 17-value class needed no change (R-41).
2. **BIG_TOWN has its ten captures (CONFIRMED).** Slots 0, 10, 14 and 18 (`none`) and 2, 4, 12, 16, 20 and 22
   (`coast+river`) are bound: the 4 / 6 split of `plan.json`'s `ftg.perSize` for BIG_TOWN, and the count plan section
   2.1b names for the `type7` estimator (the "tenth BIG_TOWN" row). Whether the rows read at ten carry bands is W-05b's
   reading, not this record's.
3. **One curved wall line closing the harbour quarter (counts CONFIRMED; reading of the shots CONFIRMED; cause
   PLAUSIBLE).** The request asks for the wall exactly as slots 2, 4, 12, 16 and 20's do. This draw has 36 wall edges,
   714 m of wall and 18 towers, every wall node within 251 m of the centre: inside the BIG_TOWN range (0–31 towers,
   0–998 m). Shot 018 shows the wall as one line from the shore north of the harbour round to the shore south of it,
   closing the small harbour quarter, which holds one of the two district labels, on its land side; the other district
   lies outside it. It is the shape of slots 16, 17, 20 and 21. Across the six draws of this one request the wall ranges
   from none to 49 edges.
4. **The same request gives a different town again (CONFIRMED).** Against slots 2, 4, 12, 16 and 20 (the same cell,
   equal requests): 1 789 buildings against 1 821, 1 880, 1 610, 1 675 and 1 672; 3 749 edges and 3 255 nodes against
   4 197 / 3 558, 4 215 / 3 571, 2 987 / 2 639, 3 648 / 3 186 and 3 583 / 3 126; 2 districts against 4, 4, 2, 4 and 4.
   The ten BIG_TOWN captures span 1 610–1 880 buildings. The server's own seed remains the PLAUSIBLE source (sections
   14.3, 21.3, 23.3, 25.3).
5. **Seven water bodies, four of them small ponds (counts and extents CONFIRMED; reading PLAUSIBLE).** The most of any
   BIG_TOWN capture (the nine earlier: 0–5) and second only to slot 7's eight overall. The polygons have 8, 12, 19, 20,
   29, 96 and 209 points. The 209-point one reaches the corner (2 828 m from the centre): PLAUSIBLY the sea. The 96-point
   one runs from 456 to 2 208 m: PLAUSIBLY the river. The 8-point one lies within 208 m of the centre: PLAUSIBLY the
   near-centre kind seen in slots 2, 4, 12, 16 and 20. The four of 12–29 points each lie in a narrow ring, 742–769,
   828–903, 1 597–1 694 and 1 872–1 930 m from the centre: PLAUSIBLY ponds. Shot 014 shows three small ponds among the
   fields; the fourth PLAUSIBLY lies outside the window's frame. Ponds under `coast+river` are not new: slot 16 had two
   (section 27.3 finding 5). Like slot 14's and 18's ponds under `none`, this is a per-draw outcome, not a capture fault.
6. **Payload and edge types (CONFIRMED; what type 14 draws PLAUSIBLE).** The payload is 0.43 MB (the five earlier
   `coast+river` BIG_TOWN captures: 0.39–0.46 MB). Edge type 14 has 273 edges here against 183, 288, 288, 366 and 468
   in slots 2, 4, 12, 16 and 20, and is still absent from every `none` BIG_TOWN capture (slots 0, 10, 14 and 18). The
   edge types present (0, 1, 2, 3, 4, 6, 7, 10, 11, 13, 14) all occur in earlier captures.
7. **The payload's paths are a subset of the earlier union (CONFIRMED).** 183 distinct field paths, none new. Of the 15
   absent from the union of slots 0–21's 198: 11.1 and its parts (absent in slots 2, 3, 4, 9, 10, 13, 14, 16, 18 and 20
   too), 11.6 and its parts (absent in slots 0, 2, 3, 4, 10, 12, 13, 14, 15, 16, 18 and 20 too) and 11.7 and its parts
   (absent in slots 1, 3, 4, 6, 9, 10, 11, 12, 18, 19, 20 and 21 too).
8. **The premium account took a twenty-third settlement with no prompt (CONFIRMED).** The list held 22 rows before and 23
   after; no limit, payment or upgrade prompt appeared. Whether a lapsed premium would refuse one stays PLAUSIBLE only.
9. **Server time and listed population (CONFIRMED; time contended; meaning of the listed figure PLAUSIBLE).** The server
   time is 2.1 s (slots 2, 4, 12, 16 and 20: 1.9, 2.2, 4.4, 2.6 and 2.1 s). The layout body was in the folder at the
   poll's first look, within seconds of the click. The account list gives 6 102 people against the nominal 5 600 (the
   eight earlier signed-in BIG_TOWN captures: 5 491–6 221). Across the nine BIG_TOWN captures with a listed figure
   (slots 2, 4, 10, 12, 14, 16, 18, 20 and 22; slot 0, the guest capture, has none) the listed figure and the building
   count rank alike with a Spearman coefficient of 0.95 (0.99 over the first eight, section 31.3 finding 8); the rows
   keep `populationSource: nominal` until the ruling slot 1 asked for.

### 33.4 Calls and deviations (vetoable)

1. **No deviation from checklist sections H and I.** The `--full` shot of the settlements view (002) was taken as H3
   prescribes; the form and the map then ran in the 1440×632 window. Every click and select had a `text` reading, a
   `shot` and, for coordinate clicks, an `elementFromPoint` reading before it, and a form-state reading after it. The
   pre-create shot (013) was taken after the hit test (section 26.4 call 2). Setting the coast select (select 7) to the
   coastal option moved no box: rivers (1008, 498) and forests (1008, 556) before the scroll, the reserve area
   (1008, 367) and walled (1008, 396) after it, "Create Settlement" 1 of 1 at (947, 522) inside the dialog.
2. **No browser helper outlived the stop; no process was signalled.** After `drive.mjs stop` printed "session closed",
   `pgrep -fl profiles/ftg` was empty at once and again about three minutes later, as in slots 18 to 21. Checklist I's
   slot-13 and slot-17 notes stay as written.
3. **`SIZE_DEPENDENT` was not touched** (R-41 forbids widening it on a later capture of a size); the same-size check
   passed as it stands.
4. **Focus came with the seat's own navigation this time, not after the full-frame shot (PLAUSIBLE reading).** The page
   reported window focus at the first reading of the settlements view, taken right after the seat's "Home" click and
   before the `--full` shot (slots 20 and 21 first saw it after that shot). The hover at that reading was a list row
   under the "Home" click's own point; no scroll and no page change came with it beyond the seat's own navigation. It is
   read as the seat's click, or the browser raising the window as the page changed, not another hand. A later seat that
   sees focus together with a hover, scroll or page change it did not cause still stops as H12 says. A second visit to
   the settlements view after the create (one guarded navigation click) read the list and changed nothing; the other
   hover readings named only the seat's own last click points (the dialog under the "New Settlement" point, the walled
   box before the create, the map canvas after it, the zoom control). The re-roll control showed in the first two map
   shots (014, 015) and was gone after the zooms (018). It was never clicked. The overview `--full` shot (015) drew the
   scale bar without its label, as in slots 10 and 18 to 21; the window shot just before it (014) reads 500 m.

### 33.5 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read) are every number in sections 33.1 and 33.2, findings 1, 2, 3 (the equal requests, the
wall counts, length and radius, the shots), 4 (the request equality and the differing counts), 5 (the field-6 counts
and extents), 6 (the payload sizes and edge-type counts), 7, 8 and 9 (the times, listed populations and the rank
coefficient). PLAUSIBLE (reasoning only) are any cause of the wall's shape, that the server's seed makes equal requests
differ, what the seven field-6 polygons are, what edge type 14 draws, what raised the window's focus, that a lapsed
premium would refuse a further settlement, and that the listed population is the generated resident count.

## 34 Slot 23 (programme 2) — 2026-10-04, BIG_CITY, `coast+river`

Lane `m1/W-02-slot23b`, under the owner's go for programme 2 (`owner-go.json`). One settlement was created, with one
create click, by checklist sections H (with H12's guarded clicks, H13's list count and H14's redacting helper) and I.
Before the create, slot 23 was open and slots 0–22 bound, the newest folder was slot 22's (its one create is slot 22's
own), no lane line named a slot-23 key, and the account list held 23 settlements (big town 10, big city 9, metropolis 4:
the earlier settlement and slots 1 to 22), so no slot-23 settlement existed. The landing's root scroll container read 0
at the first reading and 0 again just before the "Home" click, and no hover was on the page: no sign of another hand.

### 34.1 The capture

| field (README) | value |
|---|---|
| capture id | `2026-10-04T07-21-10` |
| account | the owner's signed-in account, premium since J164; the list held 23 settlements before and 24 after (no counter) |
| size / rung | BIG_CITY / CITY |
| `WaterSetting` | `coast+river` (the request's coast key coastal, rivers true) |
| population, source | 24 500, `nominal`. The account list gives 24 024 (section 9.1; recorded, not used). |
| server date; PUT sent | 2026-10-04 (UTC; 03:23 EDT); 07:23:38.935 UTC (the response date headers read 07:23:46 and 07:23:47 GMT) |
| server time | 7.098 s, from the PUT being sent to the layout GET being sent. **Contended**: M0's build seats and M-1 research seats shared the machine, so this feeds no time row (plan-check PC-11). |
| buildings | 7 108 |
| request hash | `7ce26f7b8581`: sha256 of the exact 274 299-byte PUT body |
| `referenceBuild` | `ftg:2026-10-04+7ce26f7b8581` |
| payload | 1 178 709 bytes, Fetch-intercepted (`intercept-0035…bin`, sha256 `f9f05124c92b7567…`) |
| road graph | 9 254 edges, 7 366 nodes; 83 wall edges (edge type 7) |
| wall towers / water bodies / districts | 47 / 3 / 4 |
| settlement border | a square with half width 2 750.00 m, the size ladder's 5 500 m width |
| capture folder | 39 MB with the post outputs: the session recording and the screenshots at 2× (no CPU profile). Free disk: 11 GB before and 11 GB after the session (other lanes writing too). |

**Form values.** The size was set to the big-city option, chosen by its request key as in slots 6–22: the seat read each
size option's React element key by `eval`; exactly one of the 12 options carried `BIG_CITY`, and the selected option's
key was re-read after the select and again in the form-final reading. The metropolis option was not touched. The coast
select was set to the coastal option, and the river, forest, reserve-area and wall boxes were switched on; the farm box
was already on. Everything else stayed at FTG's default presets, and the name was left blank. All settings was never
opened (shots 004–013; values verified by `eval` before the create click). Every click and select was its own command
after its readings, and every coordinate click had an `elementFromPoint` reading naming its control; a form-state
reading after each step showed the dialog still open (`steps/steps.jsonl`, 20 shots). The 13 form, map and navigation
commands equal slots 3, 5, 13, 17 and 21's (the same cell) in order, coordinates and size text. The map (shot 014,
500 m bar) shows the sea along the whole south-west and south, with a strip of beach on its shore, and a river that
comes from the north and runs south through the city to the sea. The city lies on both banks of the river mouth, with
four district labels: a walled harbour quarter on the east bank at the mouth, with a pier at its shore; a narrow walled
strip along the river's west bank; a large district west of the river; and a large district north of the walled
quarter. Hedged fields of crops and pasture cover the east, with woods at the east edge; open grassland with scattered
trees covers the west and north-west. The core shot (018, 250 m bar) shows the wall as two open lines with towers: one
curves from the river bank round the harbour quarter to the shore east of the harbour; the other runs along the river's
west bank from the shore north to a point across the river from the first line's river end, closing the narrow strip
between it and the river.

### 34.2 Checks (all executed 2026-10-04, CONFIRMED)

| check | how | result |
|---|---|---|
| all checks of `ftg_capture_post.py` | `--slot 23 --signed-in --premium`, `--check-only` first, then the writing run: exit 0 both times (the script unchanged since slot 6, `735922948e3970fb…`) | 10 of 10 pass: calls, size key, water keys, the request diff against the base, the diff against slot 0, the same-size values (**17 of 17 equal slot 1's**), decode, border, no resident field, `pb_raw` runs |
| the payload decodes: field 3 edges and nodes, field 8 buildings | `python3 tools/pb_raw.py <payload>` (the post script's run, and a fresh run) | exit 0, 187 distinct field paths; 3.1 × 9 254, 3.2 × 7 366, 8 × 7 108, 7 × 47, 6 × 3, 10 × 4; `structure.md` equals a fresh run apart from its title path |
| the wall in the payload | `research/baselines/adapters/ftg.py`'s decoder over slots 0–23, edges counted by type and joined into connected lines | 83 type-7 (wall) edges, 1 557 m long, every wall node within 464 m of the centre, and 47 towers; two open lines, of 59 edges (1 108 m) and 24 edges (450 m). The ten BIG_CITY captures now span 23–66 towers, 789–2 368 m and 40–130 edges. Slots 3, 5, 13, 17 and 21 (the same cell): 57, 80, 58, 40 and 41 edges, 1 211, 1 560, 1 339, 827 and 789 m, within 729, 494, 574, 506 and 401 m, 40, 49, 37, 25 and 23 towers; two open lines in slots 3, 5 and 13, one in slots 17 and 21 |
| the request's size key and water keys equal the slot's (PC-16) | `create-request.json` | BIG_CITY; coast key coastal and rivers true |
| the request hash | sha256 of the PUT row's body, recomputed outside the script | `7ce26f7b8581`, 274 299 bytes; exactly one PUT row with a body in the recording; `create-request.json` parses to the same object |
| the request equals slots 3, 5, 13, 17 and 21's (the same cell) | leaf diffs of the requests | **0 semantic differences** against each; only the 45 client-random partner ids differ. All six have the same 26 top-level keys. |
| the request differs from slots 1, 11, 15 and 19 (BIG_CITY, `none`) only by the water options | leaf diffs of the requests | 8 semantic differences each, the same 8 leaves: the 2 water keys and 6 leaves of the raw-resource entry the water options add (the list shifts by one); 0 size-dependent; plus 45 partner ids |
| the request differs from slots 2, 4, 12, 16, 20 and 22 (BIG_TOWN, the same water) only by the size | leaf diffs of the requests | 15 semantic differences each, the same 15 leaves: the size key and the 14 size-dependent values that differ between BIG_TOWN and BIG_CITY (section 10.3's table); plus 45 partner ids |
| the request differs from slot 9's (METROPOLIS, the same water) only by the size | a leaf diff of the two requests | 8 semantic differences: the size key and 7 size-dependent values; plus 45 partner ids |
| the request differs from the base within the named classes | the script's `requestDiff` and `vsSlot0` | against the base: 11 semantic (1 slot key, 10 size-dependent; the base was itself coastal with rivers, section 11.3 finding 2), `other` 0; against day 1: 23 semantic (the size key, 2 water keys, 6 water-implied, 14 size-dependent), `other` 0 |
| the checks discriminate (red tests) | this capture checked as every earlier slot, `--check-only` | as slots 3, 5, 13, 17 and 21 (the same cell): exit 0, as it must be. As slots 1, 11, 15 and 19 (BIG_CITY, `none`): exit 1 (water keys, request diff, diff against slot 0). As slots 2, 4, 7, 8, 9, 12, 16, 20 and 22 (BIG_TOWN and METROPOLIS, `coast+river`): exit 1 (size key, same-size, border). As slots 0 and 6 (each its size's first, `none`): exit 1 (size key, water keys, request diff, diff against slot 0, border). As slots 10, 14 and 18 (BIG_TOWN, `none`, later draws): exit 1 (those five and same-size). The check-only runs wrote nothing (the folder held `session/` and `steps/` only until the writing run). |
| the runner is the profiler's code | `cmp` of the scratchpad copies against `profiler/` before the start | identical: session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…`, package.json `25e7d362…`, lib/instrument.js `cca253ac…`; port 9341; no FTG process and no `Singleton*` file before; `session closed`, no `Singleton*` file, port 9341 free and no FTG process at once after the stop and again about two minutes later (34.4 call 2); both `.session` files absent before and after |
| only the seat used the window | the scroll readings and the recording's hosts, documents and writes | root scroll 0 → 0 across the landing, hover empty; one document load (the landing); hosts: the site, its API, analytics, error reporting, fonts and one GPU-benchmark file from a public package CDN (as in slots 2–22); no call to the site's identity provider this run (as in slots 21 and 22); exactly one write to the site's settlements API (the create; listed twice, as the request and its interception); no page outside the site; no response of status 400 or above |
| one settlement made (plan 2.1b (6)) | the PUT status and the list before and after | PUT 200; the list's rows 23 → 24, the new row of size BIG_CITY carrying the PUT's settlement id; no retry |
| the slot bind is safe | `plan.py --bind-ftg 23=…`, then `--check` and a diff against the pre-bind copy | `plan.json` byte-equal to the pre-flight copy just before the bind (no second writer in between); one line changed (slot 23's capture); SAME for both files; `metrics.m-1.json` byte-unchanged (`8a0efa7e…`); `plan.py` unchanged (`68709ba8…`). `plan.json` sha256 moves from `a08cec0a…` to `6f946bf3…`. |
| no account identifier in the files written | grep of the README, `capture-facts.json`, `create-request.json`, `request-diff.txt`, `structure.md`, `steps.jsonl`, this section, the header update, the JSON entry, the checklist line, the result file and this lane's `lane-events.log` lines for an email pattern, the display name, a token prefix and a full id | see the result file's privacy row |

### 34.3 Findings

1. **The size-dependent values repeat in the tenth BIG_CITY (CONFIRMED).** All 17 equal slot 1's, as slots 3, 5, 11,
   13, 15, 17, 19 and 21 found. The 17-value class needed no change (R-41).
2. **BIG_CITY has its ten captures (CONFIRMED).** Slots 1, 11, 15 and 19 (`none`) and 3, 5, 13, 17, 21 and 23
   (`coast+river`) are bound: the 4 / 6 split of `plan.json`'s `ftg.perSize` for BIG_CITY, and the count plan section
   2.1b names for the `type7` estimator (the "tenth BIG_CITY" row). With slot 22, both matched sizes now hold ten.
   Whether the rows read at ten carry bands is W-05b's reading, not this record's.
3. **A two-line wall again (counts, lines and shots CONFIRMED; cause PLAUSIBLE).** The request asks for the wall exactly
   as slots 3, 5, 13, 17 and 21's do. This draw has 83 wall edges, 1 557 m of wall and 47 towers, every wall node within
   464 m of the centre: inside the BIG_CITY range (23–66 towers, 789–2 368 m). The wall is two open lines: one of 59 edges
   (1 108 m) round the harbour quarter on the east bank, and one of 24 edges (450 m) along the river's west bank, closing
   a narrow strip, which carries its own district label, between it and the river (shot 018). Slots 3, 5 and 13 also had
   two lines; slots 17 and 21 had one line closing a harbour quarter. Across the six draws of this one request the wall
   ranges from 40 to 83 edges and from 789 to 1 560 m. Why the draws split between one and two lines is PLAUSIBLE only.
4. **The same request gives a different city again (CONFIRMED).** Against slots 3, 5, 13, 17 and 21 (the same cell,
   equal requests): 7 108 buildings against 7 342, 7 270, 7 328, 7 311 and 7 603; 9 254 edges and 7 366 nodes against
   11 121 / 8 400, 10 164 / 7 984, 11 713 / 9 000, 10 715 / 8 329 and 11 890 / 9 121; 4 districts against 4, 4, 5, 6 and
   5. The building count is the fewest of the ten BIG_CITY captures (the nine earlier: 7 164–7 696), and the edge and
   node counts are the fewest of the six coastal big cities. The server's own seed remains the PLAUSIBLE source
   (sections 14.3, 21.3, 23.3, 25.3).
5. **Three water bodies (count and extents CONFIRMED; reading PLAUSIBLE).** The polygons have 7, 123 and 128 points. The
   123-point one runs from 200 m to the border square's corner (3 889 m): PLAUSIBLY the sea. The 128-point one runs from
   81 to 2 878 m: PLAUSIBLY the river. The 7-point one lies 156–252 m from the centre: PLAUSIBLY the near-centre kind of
   slots 3, 5, 13, 17 and 21 (7, 20, 15, 12 and 11 points within 209–302 m). Shot 014 shows the sea, the one river and
   the harbour basin, and no pond.
6. **The smallest coastal BIG_CITY payload (CONFIRMED; cause PLAUSIBLE).** The payload is 1.18 MB (the five earlier
   `coast+river` BIG_CITY captures: 1.26–1.41 MB; all ten BIG_CITY captures: 1.13–1.41 MB). Edge type 14 has 223 edges
   here against 356, 430, 518, 673 and 652 in slots 3, 5, 13, 17 and 21, the fewest, and it is still absent from every
   `none` BIG_CITY capture (slots 1, 11, 15 and 19). The edge types present (0, 1, 2, 3, 4, 6, 7, 10, 14) all occur in
   earlier captures. What type 14 draws is not read here.
7. **The payload's paths are a subset of the earlier union (CONFIRMED).** 187 distinct field paths, none new. Of the 11
   absent from the union of slots 0–22's 198: 11.7 and its parts (absent in slots 1, 3, 4, 6, 9, 10, 11, 12, 18, 19, 20,
   21 and 22 too) and 11.8.2 and its parts (absent in slots 0, 1, 3, 4, 6, 10, 11, 14, 15, 18 and 19 too).
8. **The premium account took a twenty-fourth settlement with no prompt (CONFIRMED).** The list held 23 rows before and
   24 after; no limit, payment or upgrade prompt appeared. Whether a lapsed premium would refuse one stays PLAUSIBLE
   only.
9. **Server time and listed population (CONFIRMED; time contended; meaning of the listed figure PLAUSIBLE).** The server
   time is 7.1 s (slots 1, 3, 5, 11, 13, 15, 17, 19 and 21: 5.7, 6.3, 6.0, 6.2, 6.0, 6.0, 7.1, 6.5 and 6.7 s); the
   machine was shared, so the difference is not read. The layout body was in the folder at the poll's first look. The
   account list gives 24 024 people against the nominal 24 500, the lowest of the ten BIG_CITY captures (the nine
   earlier: 24 367–26 099), beside the fewest buildings. Across the ten BIG_CITY captures the listed figure and the
   building count rank alike with a Spearman coefficient of 0.92 (section 32.3 finding 8 found 0.88 over nine); the rows
   keep `populationSource: nominal` until the ruling slot 1 asked for.

### 34.4 Calls and deviations (vetoable)

1. **No deviation from checklist sections H and I.** The `--full` shot of the settlements view (002) was taken as H3
   prescribes; the form and the map then ran in the 1440×632 window. Every click and select had a `text` reading, a
   `shot` and, for coordinate clicks, an `elementFromPoint` reading before it, and a form-state reading after it. The
   pre-create shot (013) was taken after the hit test (section 26.4 call 2). Setting the coast select (select 7) to the
   coastal option moved no box: rivers (1008, 498) and forests (1008, 556) before the scroll, the reserve area
   (1008, 367) and walled (1008, 396) after it, "Create Settlement" 1 of 1 at (947, 522) inside the dialog.
2. **No browser helper outlived the stop; no process was signalled.** After `drive.mjs stop` printed "session closed",
   `pgrep -fl profiles/ftg` was empty at once and again about two minutes later, as in slots 18 to 22. Checklist I's
   slot-13 and slot-17 notes stay as written.
3. **`SIZE_DEPENDENT` was not touched** (R-41 forbids widening it on a later capture of a size); the same-size check
   passed as it stands.
4. **Focus came with the seat's own navigation, as in slot 22 (PLAUSIBLE reading).** The page reported window focus at
   the first reading of the settlements view, taken right after the seat's "Home" click and before the `--full` shot.
   The hover at that reading was a list row under the "Home" click's own point; no scroll and no page change came with it
   beyond the seat's own navigation. It is read as the seat's click, or the browser raising the window as the page
   changed, not another hand (section 33.4 call 4). A second visit to the settlements view after the create (one guarded
   navigation click) read the list and changed nothing; the other hover readings named only the seat's own last click
   points (the walled box before the create, the map canvas after it, the zoom control, the page header under the home
   link). The re-roll control showed in the first two map shots (014, 015) and was gone after the zooms (018). It was
   never clicked. The overview `--full` shot (015) drew the scale bar without its label, as in slots 10 and 18 to 22; the
   window shot just before it (014) reads 500 m.

### 34.5 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read) are every number in sections 34.1 and 34.2, findings 1, 2, 3 (the equal requests, the
wall counts, lines, length and radius, the shots), 4 (the request equality and the differing counts), 5 (the field-6
counts and extents), 6 (the payload sizes and edge-type counts), 7, 8 and 9 (the times, listed populations and the rank
coefficient). PLAUSIBLE (reasoning only) are any cause of the wall's shape, that the server's seed makes equal requests
differ, what the three field-6 polygons are, what edge type 14 draws, what raised the window's focus, that a lapsed
premium would refuse a further settlement, and that the listed population is the generated resident count.

## 35 Slot 24 (programme 2) — 2026-10-04, CITY, `none`

Lane `m1/W-02-slot24b`, under the owner's go for programme 2 (`owner-go.json`). One settlement was created, with one
create click, by checklist sections H (with H12's guarded clicks, H13's list count and H14's redacting helper) and I.
This is the first CITY capture of the programme, so checklist I9's first-of-size steps applied (R-41). Before the
create, slot 24 was open and slots 0–23 bound, the newest folder was slot 23's (its one create is slot 23's own), no
lane line named a slot-24 key, and the account list held 24 settlements (big town 10, big city 10, metropolis 4, city 0:
the earlier settlement and slots 1 to 23), so no slot-24 settlement existed. The landing's root scroll container read 0
at the first reading and 0 again just before the "Home" click, and no hover was on the page: no sign of another hand.

### 35.1 The capture

| field (README) | value |
|---|---|
| capture id | `2026-10-04T07-34-12` |
| account | the owner's signed-in account, premium since J164; the list held 24 settlements before and 25 after (no counter) |
| size / rung | CITY / TOWN (nominal 9 500 people, the size ladder's CITY; plan 2.1b's timed preset) |
| `WaterSetting` | `none` (the request's coast key empty, rivers false) |
| population, source | 9 500, `nominal`. The account list gives 9 767 (section 9.1; recorded, not used). |
| server date; PUT sent | 2026-10-04 (UTC; 03:37 EDT); 07:37:34.552 UTC (the response date headers read 07:37:37 and 07:37:38 GMT) |
| server time | 2.767 s, from the PUT being sent to the layout GET being sent. **Contended**: M0's build seats and M-1 research seats shared the machine, so this feeds no time row (plan-check PC-11). |
| buildings | 2 881 |
| request hash | `1efe31200956`: sha256 of the exact 274 282-byte PUT body |
| `referenceBuild` | `ftg:2026-10-04+1efe31200956` |
| payload | 570 441 bytes, Fetch-intercepted (`intercept-0035…bin`, sha256 `1c764916a2b1d479…`) |
| road graph | 4 123 edges, 3 664 nodes; 76 wall edges (edge type 7) |
| wall towers / water bodies / districts | 36 / 0 / 4 |
| settlement border | a square with half width 2 500.00 m, the size ladder's 5 000 m width |
| capture folder | 38 MB: the session recording and the screenshots at 2× (no CPU profile). Free disk: 11 GB before and 11 GB after the session (other lanes writing too). |

**Form values.** The size was set to the city option, chosen by its request key: the seat read each size option's React
element key by `eval`. Three of the 12 keys end in `CITY` (the small-city, city and big-city options), so the seat
matched the whole part of the key after the option's text: exactly one option's part is `CITY`. The selected option's
part was re-read after the select and again in the form-final reading. The metropolis option was not touched. The
water was the form's own default: no coast, rivers off, neither touched. The farm box was already on; the forest,
reserve-area and wall boxes were switched on. Everything else stayed at FTG's default presets, and the name was left
blank. All settings was never opened (shots 004–010; values verified by `eval` before the create click). Every click and
select was its own command after its readings, and every coordinate click had an `elementFromPoint` reading naming its
control; a form-state reading after each step showed the dialog still open (`steps/steps.jsonl`, 18 shots). The 11
form, map and navigation commands equal those of slots 1, 6, 10, 11, 14, 15, 18 and 19 (every signed-in `none` capture)
in order and coordinates; only the size option's text differs. The map (shot 012, 500 m bar) shows a compact walled
town in the middle of the frame: an oval wall round the core, four district labels (one inside the wall, three round it
to the north-west, north-east and south) and suburbs on every side, densest to the south-east. A wide open meadow with
scattered trees lies north of the town between two woods in the top corners; hedged fields of crops and pasture cover
the rest of the frame. There is no sea, no river and no pond. The core shot (016) has a 250 m bar.

### 35.2 Checks (all executed 2026-10-04, CONFIRMED)

| check | how | result |
|---|---|---|
| all checks of `ftg_capture_post.py` | `--slot 24 --signed-in --premium`, `--check-only` first, then the writing run: exit 0 both times (the script unchanged since slot 6, `735922948e3970fb…`) | 10 of 10 pass on the **first** run: calls, size key, water keys, the request diff against the base, the diff against slot 0, the same-size values (vacuous: the first CITY of the programme; this capture sets CITY's reference values), decode, border, no resident field, `pb_raw` runs |
| the first-of-size rule (R-41; checklist I9) | the first `--check-only`'s `requestDiff` and `vsSlot0` receipts, and leaf diffs outside the script | nothing to list: `other` 0 against the base and 0 against slot 0, so I9 steps 2–4 name no leaf and `SIZE_DEPENDENT` stays at 17 (finding 1). Step 1 was run anyway (the row below). |
| the form steps differ from the captured `none` slots in the size option only (R-41 step 1) | the form-changing commands of the `steps.jsonl` files; the form-state readings | the same 11 commands as slots 1, 6, 10, 11, 14, 15, 18 and 19, in the same order at the same coordinates ("Home", "New Settlement", the size select, the forest box, the dialog scroll, the reserve-area and wall boxes, "Create Settlement", two zoom clicks, the home link); only the size option's text differs. The first and the form-final readings show the other seven selects and all 23 checkboxes (the five simple-form boxes and the hidden All settings mirrors) exactly as slots 18 and 19's first and form-final readings. |
| the payload decodes: field 3 edges and nodes, field 8 buildings | `python3 tools/pb_raw.py <payload>` (the post script's run, and a fresh run) | exit 0, 179 distinct field paths; 3.1 × 4 123, 3.2 × 3 664, 8 × 2 881, 7 × 36, 6 × 0, 10 × 4; `structure.md` equals a fresh run apart from its title path |
| the wall in the payload | `research/baselines/adapters/ftg.py`'s decoder, edges counted by type and joined into connected lines | 76 type-7 (wall) edges, 1 494 m long, every wall node within 290 m of the centre, one closed ring with no open end, and 36 towers. The `none` captures of the other sizes are closed rings too: BIG_TOWN (slots 0, 10, 14, 18) 42, 34, 44 and 46 edges, 993, 694, 870 and 827 m, 25, 17, 23 and 22 towers; BIG_CITY (slots 1, 11, 15, 19) 130, 116, 92 and 100 edges, 2 368, 2 128, 1 756 and 1 861 m, 66, 62, 49 and 51 towers; METROPOLIS (slot 6) 180 edges, 3 296 m, 93 towers |
| the request's size key and water keys equal the slot's (PC-16) | `create-request.json` | CITY; coast key empty and rivers false |
| the request hash | sha256 of the PUT row's body, recomputed outside the script | `1efe31200956`, 274 282 bytes; exactly one PUT row with a body in the recording; `create-request.json` parses to the same object |
| the request differs from the 2026-09-21 base (CITY, coastal with rivers on) only by the water options | a leaf diff of the two requests | 8 semantic differences: the 2 water keys and the 6 leaves of the raw-resource entry the water options drop (the list shifts by one); **0 size-dependent**; 0 other; plus 45 client-random partner ids. Both requests have the same 26 top-level keys. |
| the request differs from slots 0, 10, 14 and 18 (BIG_TOWN, the same water) only by the size | leaf diffs of the requests | 12 semantic differences each, the same 12 leaves: the size key and 11 size-dependent values (the eleven of day 1, section 4); 0 other; plus 45 partner ids |
| the request differs from slots 1, 11, 15 and 19 (BIG_CITY, the same water) only by the size | leaf diffs of the requests | 11 semantic differences each, the same 11 leaves: the size key and 10 size-dependent values; 0 other; plus 45 partner ids |
| the request differs from slot 6's (METROPOLIS, the same water) only by the size | a leaf diff of the two requests | 16 semantic differences: the size key and 15 size-dependent values; 0 other; plus 45 partner ids |
| the request differs from slots 3 and 23 (BIG_CITY, `coast+river`) only by the size and the water | leaf diffs of the requests | 19 semantic differences each: the size key, 2 water keys, 6 water-implied and 10 size-dependent values; 0 other |
| the checks discriminate (red tests) | this capture checked as every other slot, `--check-only` | as slot 25 (CITY, `coast+river`): exit 1 (water keys, request diff, diff against slot 0). As slots 0, 1 and 6 (each its size's first, `none`) and 26 (TOWN, `none`): exit 1 (size key, border). As slots 10, 11, 14, 15, 18 and 19 (later `none` draws of BIG_TOWN and BIG_CITY): exit 1 (size key, same-size, border). As slots 2–5, 7–9, 12, 13, 16, 17 and 20–23 (`coast+river` at the other sizes): exit 1 (size key, water keys, request diff, diff against slot 0, same-size, border). As slot 27 (TOWN, `coast+river`): exit 1 (size key, water keys, request diff, diff against slot 0, border). The check-only runs wrote nothing (the folder held `session/` and `steps/` only until the writing run). |
| the runner is the profiler's code | `cmp` of the scratchpad copies against `profiler/` before the start | identical: session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…`, package.json `25e7d362…`, lib/instrument.js `cca253ac…`; port 9341; no FTG process and no `Singleton*` file before; `session closed`, no `Singleton*` file, port 9341 free and no FTG process at once after the stop and again about four minutes later (35.4 call 5); both `.session` files absent before and after |
| only the seat used the window | the scroll readings and the recording's hosts, documents and writes | root scroll 0 → 0 across the landing, hover empty; one document load (the landing); hosts: the site, its API, analytics, error reporting, fonts and one GPU-benchmark file from a public package CDN (as in slots 2–23); no call to the site's identity provider this run (as in slots 21 to 23); exactly one write to the site's settlements API (the create; listed twice, as the request and its interception); no page outside the site; no response of status 400 or above |
| one settlement made (plan 2.1b (6)) | the PUT status and the list before and after | PUT 200; the list's rows 24 → 25, the new row of size CITY carrying the PUT's settlement id; no retry |
| the slot bind is safe | `plan.py --bind-ftg 24=…`, then `--check` and a diff against the pre-bind copy | `plan.json` byte-equal to the pre-flight copy just before the bind (no second writer in between); one line changed (slot 24's capture); SAME for both files; `metrics.m-1.json` byte-unchanged (`8a0efa7e…`); `plan.py` unchanged (`68709ba8…`). `plan.json` sha256 moves from `6f946bf3…` to `0fd7aae1…`. |
| no account identifier in the files written | grep of the README, `capture-facts.json`, `create-request.json`, `request-diff.txt`, `structure.md`, `steps.jsonl`, this section, the header update, the JSON entry, the checklist note, the result file and this lane's `lane-events.log` lines for an email pattern, the display name, a token prefix and a full id | see the result file's privacy row |

### 35.3 Findings

1. **CITY's first capture adds no size-dependent value (CONFIRMED; R-41).** Checklist I9 said this was PLAUSIBLE until
   slot 24 showed it, because the 2026-09-21 base is itself a CITY capture. The first `--check-only` passed: against the
   base the request differs only by the water options, so all 17 named values equal the base's, and against slot 0 no
   leaf outside the class differs. The form steps differ from those of the captured `none` slots in the size option only
   (35.2), so this is the controlled comparison R-41 asks for, and it names no new leaf. `SIZE_DEPENDENT` keeps its 17
   names; the class table of section 17.3 stays the current one, and its CITY column (read from the base) is now
   confirmed by a programme capture. Slot 25 (CITY, `coast+river`) must repeat this capture's 17 values exactly (the
   same-size check). The 17 values at CITY beside the other sizes (the header is not in the class-table form, so W-05b's
   reader keeps section 17.3's table):

   | value | slot 24: CITY | 2026-09-21 base: CITY | slot 0: BIG_TOWN | slot 1: BIG_CITY | slot 6: METROPOLIS | slot 24 differs from |
   |---|---|---|---|---|---|---|
   | stage 1: branch segments, first direction | 4 | 4 | 3 | 4 | 5 | BIG_TOWN, METROPOLIS |
   | stage 1: branch segments, second direction | 4 | 4 | 3 | 4 | 5 | BIG_TOWN, METROPOLIS |
   | stage 1: minimum district area (ha) | 10 | 10 | 6 | 10 | 12 | BIG_TOWN, METROPOLIS |
   | stage 1: building share | 0.2 | 0.2 | 0.1 | 0.2 | 0.25 | BIG_TOWN, METROPOLIS |
   | stage 1: spoke probability | 0.5 | 0.5 | 0.1 | 0.3 | 0.3 | all three |
   | stage 1: most spokes | 1 | 1 | 1 | 2 | 2 | BIG_CITY, METROPOLIS |
   | stage 1: main-road step (m) | 50 | 50 | 50 | 70 | 70 | BIG_CITY, METROPOLIS |
   | stage 2: branch segments, first direction | 3 | 3 | 3 | 5 | 5 | BIG_CITY, METROPOLIS |
   | stage 2: branch segments, second direction | 3 | 3 | 3 | 5 | 5 | BIG_CITY, METROPOLIS |
   | stage 2: minimum district area (ha) | 7 | 7 | 6 | 10 | 10 | all three |
   | stage 2: building share | 0.5 | 0.5 | 0.6 | 0.6 | 0.6 | all three |
   | stage 2: main-road step (m) | 60 | 60 | 50 | 50 | 50 | all three |
   | stage 2: most spokes | 1 | 1 | 1 | 1 | 2 | METROPOLIS |
   | random-faction count | 4 | 4 | 3 | 5 | 6 | all three |
   | shop probability, inside the settlement | 0.1 | 0.1 | 0.4 | 0.1 | 0.1 | BIG_TOWN |
   | shop probability, outside the settlement | 0.5 | 0.5 | 0.4 | 0.5 | 0.5 | BIG_TOWN |
   | religious-workers share | 0.01 | 0.01 | 0.01 | 0.005 | 0.0025 | BIG_CITY, METROPOLIS |

   Slot 24 differs from BIG_TOWN in 11 values, from BIG_CITY in 10 and from METROPOLIS in 15, and from the base in none:
   FTG's CITY preset did not change between 2026-09-21 and today.
2. **The city sits between the big town and the big city (CONFIRMED for this one draw).** Against the `none` captures
   of the two matched sizes (BIG_TOWN slots 0, 10, 14, 18; BIG_CITY slots 1, 11, 15, 19): 2 881 buildings against
   1 675–1 826 and 7 164–7 696; 4 123 edges against 3 003–3 597 and 7 236–10 937; 3 664 nodes against 2 639–3 145 and
   6 302–8 566; 36 towers against 17–25 and 49–66; 1 494 m of wall against 694–993 and 1 756–2 368 m; 4 districts against
   2–3 and 5–6; a 0.57 MB payload against 0.38–0.41 and 1.13–1.33 MB; a 2 500 m half width against 2 000 and 2 750 m.
   The account list gives 9 767 people against the nominal 9 500. The two recorded CITY captures (2026-09-21, usable,
   and 2026-09-25, failed for a setting under R-04; both labelled coastal with rivers; section 3) have 2 798 and 2 813
   buildings, 5 326 and 4 811 edges, 4 303 and 4 045 nodes and 17 and 29 towers. Their water differs from this slot's,
   so they are not draws of the same cell.
3. **One closed wall ring (counts and shot CONFIRMED).** The wall is a single closed ring of 76 edges and 1 494 m round
   the core, every wall node within 290 m of the centre, with 36 towers. Every `none` capture so far has a single closed
   ring (35.2), while the coastal captures often have open lines that close on the shore (sections 31.3 to 34.3).
4. **No water body (CONFIRMED).** Field 6 is absent, as in slots 0, 10, 11, 15 and 19. Slots 1, 6, 14 and 18, also
   `none`, had 3, 1, 2 and 4 small ponds. Shot 012 shows no water.
5. **The payload's paths are a subset of the earlier union (CONFIRMED).** 179 distinct field paths, none new. Of the 19
   absent from the union of slots 0–23's 198: field 6 and its parts (3; absent in slots 0, 10, 11, 15 and 19 too), 11.1
   and its parts (5; absent in 11 earlier slots), 11.7 and its parts (5; absent in 14 earlier slots) and 11.8.2 and its
   parts (6; absent in 12 earlier slots). The edge types present (0, 1, 2, 3, 4, 6, 7, 10) all occur in earlier
   captures; type 13 is absent here (present in slots 0, 1, 6, 14, 15 and 18 among the `none` captures), and type 14
   is absent, as in every `none` capture.
6. **Server time (CONFIRMED; contended).** 2.8 s, between the `none` BIG_TOWN captures (1.9–2.6 s) and the `none` BIG_CITY
   captures (5.7–6.5 s). The machine was shared, so the figure feeds no row. The layout body was in the folder at the
   poll's first look.
7. **The premium account took a twenty-fifth settlement with no prompt (CONFIRMED).** The list held 24 rows before and
   25 after; no limit, payment or upgrade prompt appeared.
8. **"Ends in the request key" is ambiguous at CITY and TOWN (CONFIRMED).** The slot-6 note of checklist I reads the
   size option by its React key, the display text followed by the request key. For slots 6–23 the reading "the key ends
   in the slot's request key" picked one option, but three keys end in `CITY` (small city, city, big city), and three end
   in `TOWN` (small town, town, big town). The seat therefore matched the whole part of the key after the option's text,
   which names exactly one option for every request key on the form. The checklist note for slot 24 records this for
   slots 25–27.

### 35.4 Calls and deviations (vetoable)

1. **No deviation from checklist sections H and I.** The `--full` shot of the settlements view (002) was taken as H3
   prescribes; the form and the map then ran in the 1440×632 window. Every click and select had a `text` reading, a
   `shot` and, for coordinate clicks, an `elementFromPoint` reading before it, and a form-state reading after it. The
   pre-create shot (011) was taken after the hit test. The coast select already read the no-coast option and the river
   box was off, so neither was touched. Forests (1008, 556) before the scroll, the reserve area (1008, 367) and walled
   (1008, 396) after it, and "Create Settlement" 1 of 1 at (947, 522) inside the dialog, as in slots 1 to 23.
2. **The size option was matched by the whole part of its key after the text** (finding 8). The alternative, "ends in
   `CITY`", names three options, and choosing among them by their texts would be the guess checklist I4 forbids. The
   request's size key confirmed the choice (check `sizeKey`).
3. **`SIZE_DEPENDENT` was not touched.** R-41 adds a leaf only when the first `--check-only` names one as `other`; it
   named none. The 17-value table of finding 1 has a header outside the class-table form on purpose, so that
   `measure_ftg_slots.py`'s reader, which takes the last class-form table as the current class, still reads section
   17.3's; its parse was run before and after this section was written, with equal results.
4. **One form-final reading read the wrong field and was replaced.** A combined reading took the first text input on the
   page as the name field; it is a hidden All settings field holding a default of 8 characters, which the seat did not
   print. The next reading found the dialog's name field by its placeholder: empty. The form-state reading's visible
   text inputs read empty too. No click depended on the first reading.
5. **No browser helper outlived the stop; no process was signalled.** After `drive.mjs stop` printed "session closed",
   `pgrep -fl profiles/ftg` was empty at once and again about four minutes later, as in slots 18 to 23.
6. **Focus came with the seat's own navigation, as in slots 22 and 23 (PLAUSIBLE reading).** The page reported window
   focus at the first reading of the settlements view, right after the seat's "Home" click and before the `--full` shot,
   with the hover on a list row under that click's own point and no scroll or page change beyond the seat's navigation.
   The other hover readings named only the seat's own last click points (the walled box before the create, the map
   canvas after it, the zoom control, the page header under the home link). A second visit to the settlements view after
   the create (one guarded navigation click) read the list and changed nothing. The re-roll control showed in the first
   two map shots (012, 013) and was gone after the zooms (016); it was never clicked. The overview `--full` shot (013)
   drew the scale bar without its label, as in slots 10 and 18 to 23; the window shot just before it (012) reads 500 m.

### 35.5 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read) are every number in sections 35.1 and 35.2, findings 1 (the passing first-of-size check,
the request equalities and the 17-value table), 2 (the counts against the other sizes and the recorded CITY family), 3
(the wall counts, ring and radius, the shots), 4, 5, 6 (the time, contended), 7 and 8. PLAUSIBLE (reasoning only) are
what raised the window's focus, and that the listed population is the generated resident count. That the city sits
between the two matched sizes is CONFIRMED for this one draw only; a second CITY draw (slot 25) has other water.

## 36 Slot 25 (programme 2) — 2026-10-04, CITY, `coast+river`

Lane `m1/W-02-slot25b`, under the owner's go for programme 2 (`owner-go.json`). One settlement was created, with one
create click, by checklist sections H (with H12's guarded clicks, H13's list count and H14's redacting helper) and I.
This is the second CITY capture of the programme, so the same-size rule applied (R-41): its 17 size-dependent values
must equal slot 24's. Before the create, slot 25 was open and slots 0–24 bound, the newest folder was slot 24's (its one
create is slot 24's own), no lane line named a slot-25 key, and the account list held 25 settlements (big town 10, big
city 10, metropolis 4, city 1: the earlier settlement and slots 1 to 24), so no slot-25 settlement existed. The
landing's root scroll container read 0 at the first reading and 0 again just before the "Home" click, and no hover was
on the page: no sign of another hand.

### 36.1 The capture

| field (README) | value |
|---|---|
| capture id | `2026-10-04T07-50-43` |
| account | the owner's signed-in account, premium since J164; the list held 25 settlements before and 26 after (no counter) |
| size / rung | CITY / TOWN (nominal 9 500 people, the size ladder's CITY; plan 2.1b's timed preset) |
| `WaterSetting` | `coast+river` (the request's coast key coastal, rivers true) |
| population, source | 9 500, `nominal`. The account list gives 9 407 (section 9.1; recorded, not used). |
| server date; PUT sent | 2026-10-04 (UTC; 03:54 EDT); 07:54:04.381 UTC (the response date headers read 07:54:09 and 07:54:10 GMT) |
| server time | 5.245 s, from the PUT being sent to the layout GET being sent. **Contended**: M0's build seats and M-1 research seats shared the machine, so this feeds no time row (plan-check PC-11). |
| buildings | 2 770 |
| request hash | `b7db525fe189`: sha256 of the exact 274 293-byte PUT body |
| `referenceBuild` | `ftg:2026-10-04+b7db525fe189` |
| payload | 638 724 bytes, Fetch-intercepted (`intercept-0037…bin`, sha256 `96ad0e51eec619ba…`) |
| road graph | 5 131 edges, 4 195 nodes; 27 wall edges (edge type 7) |
| wall towers / water bodies / districts | 13 / 6 / 3 |
| settlement border | a square with half width 2 500.00 m, the size ladder's 5 000 m width |
| capture folder | 37 MB: the session recording and the screenshots at 2× (no CPU profile). Free disk: 11 GB before and 11 GB after the session (other lanes writing too). |

**Form values.** The size was set to the city option, chosen by its request key as in slot 24: the seat read each size
option's React element key by `eval` and matched the whole part of the key after the option's text (three keys end in
`CITY`); exactly one option's part is `CITY`. The selected option's part was re-read after the select and again in the
form-final reading. The metropolis option was not touched. The coast select was set to the coastal option, and the
river, forest, reserve-area and wall boxes were switched on; the farm box was already on. Everything else stayed at
FTG's default presets, and the name (found by its placeholder) was left blank. All settings was never opened (shots
004–013; values verified by `eval` before the create click). Every click and select was its own command after its
readings, and every coordinate click had an `elementFromPoint` reading naming its control; a form-state reading after
each step showed the dialog still open (`steps/steps.jsonl`, 20 shots). The 13 form, map and navigation commands equal
those of every signed-in `coast+river` capture (slots 2–5, 7–9, 12, 13, 16, 17 and 20–23) in order and coordinates; only
the size option's text differs. The map (shot 014, 500 m bar) shows the sea across the whole north of the frame and a
river that comes from the south and runs north through the town to the sea. The town lies on both banks of the river
mouth, with three district labels: a harbour quarter on the west bank at the mouth, a large district west of the river
behind it and a district on the east bank. Hedged fields of crops and pasture lie east of the river, a wood runs along
the east edge with a small pond in it, and open grassland with scattered trees covers the west and south-west. The core
shot (018, 250 m bar) shows the wall as one open line with towers along the land side of the harbour quarter, from the
shore west of the harbour to the river bank.

### 36.2 Checks (all executed 2026-10-04, CONFIRMED)

| check | how | result |
|---|---|---|
| all checks of `ftg_capture_post.py` | `--slot 25 --signed-in --premium`, `--check-only` first (twice, identical output), then the writing run: exit 0 every time (the script unchanged since slot 6, `735922948e3970fb…`) | 10 of 10 pass on the **first** run: calls, size key, water keys, the request diff against the base, the diff against slot 0, the same-size values (**17 of 17 equal slot 24's**), decode, border, no resident field, `pb_raw` runs |
| the payload decodes: field 3 edges and nodes, field 8 buildings | `python3 tools/pb_raw.py <payload>` (the post script's run, and a fresh run) | exit 0, 198 distinct field paths; 3.1 × 5 131, 3.2 × 4 195, 8 × 2 770, 7 × 13, 6 × 6, 10 × 3; `structure.md` equals a fresh run apart from its title path |
| the wall in the payload | `research/baselines/adapters/ftg.py`'s decoder, edges counted by type and joined into connected lines | 27 type-7 (wall) edges, 526 m long, every wall node within 289 m of the centre, one open line (two ends), and 13 towers. The recorded CITY family: slot 24 (`none`) 76 edges, 1 494 m, one closed ring, 36 towers; the 2026-09-21 base (`coast+river`) 25 edges, 632 m, one open line, within 375 m, 17 towers; the 2026-09-25 capture (`coast+river`, failed for a setting) 44 edges, 933 m, two open lines (31 and 13 edges), within 493 m, 29 towers |
| the request's size key and water keys equal the slot's (PC-16) | `create-request.json` | CITY; coast key coastal and rivers true |
| the request hash | sha256 of the PUT row's body, recomputed outside the script | `b7db525fe189`, 274 293 bytes; exactly one PUT row with a body in the recording; `create-request.json` parses to the same object |
| the request equals the 2026-09-21 base (CITY, coastal with rivers on) | a leaf diff of the two requests, and the script's `requestDiff` | **0 semantic differences**: 45 differing leaves, all client-random partner ids. Both requests have the same 26 top-level keys. |
| the request differs from the 2026-09-25 capture (CITY, coastal with rivers on, failed for a setting) in that setting only | a leaf diff of the two requests | 1 semantic difference: the stage-2 main-road step, 60 m here and 100 m there (the non-default setting that R-04 failed that capture for); plus 45 partner ids |
| the request differs from slot 24's (CITY, `none`) only by the water options | a leaf diff of the two requests | 8 semantic differences: the 2 water keys and 6 leaves of the raw-resource entry the water options add (the list shifts by one); 0 size-dependent; 0 other; plus 45 partner ids |
| the request differs from the other sizes' `coast+river` captures only by the size | leaf diffs of the requests | against slots 2, 4, 12, 16, 20 and 22 (BIG_TOWN): 12 semantic differences each, the size key and 11 size-dependent values; against slots 3, 5, 13, 17, 21 and 23 (BIG_CITY): 11 each, the size key and 10; against slots 7, 8 and 9 (METROPOLIS): 16 each, the size key and 15; 0 other in every pair; plus 45 partner ids |
| the request differs from the other sizes' first `none` captures by the size and the water only | leaf diffs of the requests, and the script's `vsSlot0` | against slots 0, 1 and 6: 20, 19 and 24 semantic differences (the size key, 2 water keys, 6 water-implied and 11, 10 and 15 size-dependent values); 0 other |
| the checks discriminate (red tests) | this capture checked as every other slot, `--check-only` | as slot 24 (CITY, `none`): exit 1 (water keys, request diff, diff against slot 0). As slots 0, 1, 6 and 26 (each its size's first, `none`): exit 1 (size key, water keys, request diff, diff against slot 0, border). As slots 10, 11, 14, 15, 18 and 19 (later `none` draws of BIG_TOWN and BIG_CITY): exit 1 (those five and same-size). As slots 2–5, 7–9, 12, 13, 16, 17 and 20–23 (`coast+river` at the other sizes): exit 1 (size key, same-size, border). As slot 27 (TOWN, `coast+river`, no TOWN captured yet): exit 1 (size key, border). The check-only runs wrote nothing (the folder held `session/` and `steps/` only until the writing run). |
| the runner is the profiler's code | `cmp` of the scratchpad copies against `profiler/` before the start | identical: session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…`, package.json `25e7d362…`, lib/instrument.js `cca253ac…`; port 9341; no FTG process and no `Singleton*` file before; `session closed`, no `Singleton*` file, port 9341 free and no FTG process at once after the stop and again about three minutes later (36.4 call 4); both `.session` files absent before and after |
| only the seat used the window | the scroll and hover readings and the recording's hosts, documents and writes | root scroll 0 → 0 across the landing, hover empty; one document load (the landing); hosts: the site, its API, its identity provider (one background call as the landing loaded, answered 200, as in slots 8 and 13), analytics, error reporting, fonts and one GPU-benchmark file from a public package CDN (as in slots 2–24); exactly one write to the site's settlements API (the create; listed twice, as the request and its interception); no page outside the site; no response of status 400 or above |
| one settlement made (plan 2.1b (6)) | the PUT status and the list before and after | PUT 200; the list's rows 25 → 26, the new row of size CITY carrying the PUT's settlement id; no retry |
| the slot bind is safe | `plan.py --bind-ftg 25=…`, then `--check` and a diff against the pre-bind copy | `plan.json` byte-equal to the pre-flight copy just before the bind (no second writer in between); one line changed (slot 25's capture); SAME for both files; `metrics.m-1.json` byte-unchanged (`8a0efa7e…`); `plan.py` unchanged (`68709ba8…`). `plan.json` sha256 moves from `0fd7aae1…` to `d9c1109e…`. |
| no account identifier in the files written | grep of the README, `capture-facts.json`, `create-request.json`, `request-diff.txt`, `structure.md`, `steps.jsonl`, this section, the header update, the JSON entry, the checklist note, the result file and this lane's `lane-events.log` lines for an email pattern, the display name, a token prefix and a full id | see the result file's privacy row |

### 36.3 Findings

1. **The size-dependent values repeat in the second CITY (CONFIRMED; R-41).** All 17 equal slot 24's, which equal the
   2026-09-21 base's (section 35.3 finding 1). The same-size check compared them with slot 24, the first CITY of the
   programme. The 17-value class needed no change.
2. **The request equals the 2026-09-21 base request (CONFIRMED).** Apart from the 45 client-random partner ids, every
   leaf of the two requests is equal: the same size, the same water options, the same 17 size-dependent values and the
   same form values, in the same 26 top-level keys. The base is the recorded CITY family's usable capture
   (`capture/FTG/CITY/coast+river/0`), so slot 25 and the base are two draws of one request, made two weeks apart. FTG's
   default request for a coastal city with rivers did not change between 2026-09-21 and today. Plan section 2.1b names
   slot 25 as poolable with the base; this check shows the requests are equal. The 2026-09-25 capture
   (`capture/FTG/CITY/coast+river/1`) differs from both in one leaf only, the stage-2 main-road step (100 m against
   60 m), the setting R-04 failed it for.
3. **The CITY family has three usable captures (CONFIRMED).** The base (`coast+river/0`), slot 24 (`none/0`) and slot 25
   (`coast+river/2`) are usable, and the 2026-09-25 capture stays failed for a setting and pooled in no row (`plan.json`
   `ftg.recordedCity`, R-02, R-04). This is the count `plan.json`'s `recordedRule` names: "with slots 24 and 25 the
   family reaches three usable, minmax" (R-33, R-34). How the CITY rows read at three is W-05b's reading, not this
   record's.
4. **The same request gives a different town (CONFIRMED; cause PLAUSIBLE).** Against the base: 2 770 buildings against
   2 798, 5 131 edges and 4 195 nodes against 5 326 and 4 303, 13 towers against 17, 27 wall edges (526 m) against 25
   (632 m), 6 water bodies against 4, 3 districts against 4, and a 638 724-byte payload against 593 263. The server's
   own seed remains the PLAUSIBLE source (sections 14.3, 21.3, 23.3, 25.3).
5. **The fewest towers so far (counts, line and shot CONFIRMED; cause PLAUSIBLE).** The wall is one open line of 27
   edges and 526 m with 13 towers, every wall node within 289 m of the centre: it runs along the land side of the
   harbour quarter from the shore to the river bank (shot 018). Thirteen towers are the fewest of any walled capture in
   slots 0–25 (the next fewest: 14 in slot 20, 16 in slot 16; slot 12 had no wall), and 526 m is the second-shortest
   wall (slot 20: 499 m). One line closing a harbour quarter is the shape of slots 16, 17, 20, 21 and 22; the base's
   wall is also one open line (25 edges, 632 m, 17 towers). Slot 24, the `none` city, has a closed ring of
   76 edges, as every `none` capture does (section 35.3 finding 3). Why coastal draws close a quarter with one line is
   PLAUSIBLE only.
6. **Six water bodies (count and extents CONFIRMED; reading PLAUSIBLE).** The polygons have 425, 147, 23, 31, 28 and 31
   points. The 425-point one runs from 200 m to the border square's corner (3 536 m): PLAUSIBLY the sea. The 147-point
   one runs from 223 m to the border (3 181 m): PLAUSIBLY the river. The 23-point one lies 47–238 m from the centre:
   PLAUSIBLY the near-centre kind seen in the coastal captures (the base's has 9 points within 138–344 m). The three
   others have 28–31 points each and lie 1 957–2 721 m from the centre, inside the border (their largest coordinates
   1 823–2 266 m against the 2 500 m half width): PLAUSIBLY ponds, like those of slots 14, 18 and 22. Shot 014 shows one
   small pond, in the wood at the east edge. The base and the 2026-09-25 capture had 4 water bodies each.
7. **The city sits between the coastal big town and big city (CONFIRMED for this one draw).** Against the `coast+river`
   captures of the two matched sizes (BIG_TOWN slots 2, 4, 12, 16, 20, 22; BIG_CITY slots 3, 5, 13, 17, 21, 23): 2 770
   buildings against 1 610–1 880 and 7 108–7 603; 13 towers against 0–31 and 23–49; a 0.64 MB payload against
   0.39–0.46 and 1.18–1.41 MB; a 2 500 m half width against 2 000 and 2 750 m. Slot 24 (`none`) had 2 881 buildings
   and 36 towers. The account list gives 9 407 people against the nominal 9 500 (slot 24: 9 767).
8. **The payload's paths are the whole earlier union (CONFIRMED).** 198 distinct field paths: exactly the union of slots
   0–24's, none new and none absent. The edge types present (0, 1, 2, 3, 4, 6, 7, 10, 12, 13, 14) all occur in earlier
   captures; type 14 has 505 edges (the base: 348; slot 24, `none`: none, as in every `none` capture).
9. **The premium account took a twenty-sixth settlement with no prompt (CONFIRMED).** The list held 25 rows before and
   26 after; no limit, payment or upgrade prompt appeared.
10. **Server time (CONFIRMED; contended).** 5.2 s, against 2.8 s for slot 24; the machine was shared, so the difference
    is not read and the figure feeds no row. The layout body was in the folder at the poll's second look, a few seconds
    after the PUT.

### 36.4 Calls and deviations (vetoable)

1. **No deviation from checklist sections H and I.** The `--full` shot of the settlements view (002) was taken as H3
   prescribes; the form and the map then ran in the 1440×632 window. Every click and select had a `text` reading, a
   `shot` and, for coordinate clicks, an `elementFromPoint` reading before it, and a form-state reading after it. The
   pre-create shot (013) was taken after the hit test. Setting the coast select (select 7) to the coastal option moved
   no box: rivers (1008, 498) and forests (1008, 556) before the scroll, the reserve area (1008, 367) and walled
   (1008, 396) after it, "Create Settlement" 1 of 1 at (947, 522) inside the dialog, as in every signed-in
   `coast+river` capture.
2. **One more hover reading than earlier seats took, and what it showed.** The seat read the page's hover chain just
   after the form opened, before the size select. It named the create dialog's full-window layer: the pointer still
   rested at the "New Settlement" click point (1377, 576), outside the visible dialog panel. A read-only
   `elementFromPoint` there returned that layer (`0, 0, 1440, 632`), so the reading is the seat's own pointer, not
   another hand. The seats of slots 23 and 24 took no hover reading at this step, so there is nothing to compare it with.
3. **`SIZE_DEPENDENT` was not touched** (R-41 forbids widening it on a later capture of a size); the same-size check
   passed as it stands. The class-table reader of `measure_ftg_slots.py` parses E02 equally before and after this
   section was written (this section adds no class-form table).
4. **No browser helper outlived the stop; no process was signalled.** After `drive.mjs stop` printed "session closed",
   `pgrep -fl profiles/ftg` was empty at once and again about three minutes later, as in slots 18 to 24.
5. **Focus came with the seat's own navigation, as in slots 22 to 24 (PLAUSIBLE reading).** The page reported window
   focus at the first reading of the settlements view, right after the seat's "Home" click and before the `--full`
   shot, with the hover on a list row under that click's own point and no scroll or page change beyond the seat's
   navigation. The other hover readings named only the seat's own last click points (the modal layer above, the walled
   box before the create, the map canvas after it, the zoom control, the page header under the home link). A second
   visit to the settlements view after the create (one guarded navigation click) read the list and changed nothing. The
   re-roll control showed in the first two map shots (014, 015) and was gone after the zooms (018); it was never
   clicked. The overview `--full` shot (015) drew the scale bar without its label, as in slots 10 and 18 to 24; the
   window shot just before it (014) reads 500 m.
6. **The identity-provider call needed no action.** As the landing loaded, the site's own sign-in library called its
   identity provider once (answered 200), as in slots 8 and 13 and not in slots 21 to 24. No sign-in page or prompt
   appeared on screen (checklist I, slot-13 note).

### 36.5 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read) are every number in sections 36.1 and 36.2, findings 1, 2 (the request equality with the
base and the one-leaf difference from the 2026-09-25 capture), 3, 4 (the request equality and the differing counts), 5
(the wall counts, line, length, radius and ranks, the shots), 6 (the field-6 counts and extents), 7 (for this one draw),
8, 9 and 10 (the time, contended). PLAUSIBLE (reasoning only) are any cause of the wall's shape, that the server's seed
makes equal requests differ, what the six field-6 polygons are, what raised the window's focus, and that the listed
population is the generated resident count.

## 37 Slot 26 (programme 2) — 2026-10-04, TOWN, `none`

Lane `m1/W-02-slot26b`, under the owner's go for programme 2 (`owner-go.json`). One settlement was created, with one
create click, by checklist sections H (with H12's guarded clicks, H13's list count and H14's redacting helper) and I.
This is the first TOWN capture, so checklist I9's first-of-size steps applied (R-41). Before the create, slot 26 was
open and slots 0–25 bound, the newest folder was slot 25's (its one create is slot 25's own), no lane line named a
slot-26 key, and the account list held 26 settlements (big town 10, big city 10, metropolis 4, city 2, town 0: the
earlier settlement and slots 1 to 25), so no slot-26 settlement existed. The landing's root scroll container read 0 at
the first reading and 0 again just before the "Home" click, and no hover was on the page: no sign of another hand.

### 37.1 The capture

| field (README) | value |
|---|---|
| capture id | `2026-10-04T08-06-17` |
| account | the owner's signed-in account, premium since J164; the list held 26 settlements before and 27 after (no counter) |
| size / rung | TOWN / TOWN (nominal 3 625 people, the size ladder's TOWN; FTG's form default) |
| `WaterSetting` | `none` (the request's coast key empty, rivers false) |
| population, source | 3 625, `nominal`. The account list gives 3 590 (section 9.1; recorded, not used). |
| server date; PUT sent | 2026-10-04 (UTC; 04:08 EDT); 08:08:41.293 UTC (both response date headers read 08:08:43 GMT) |
| server time | 1.477 s, from the PUT being sent to the layout GET being sent. **Contended**: M0's build seats and M-1 research seats shared the machine, so this feeds no time row (plan-check PC-11). |
| buildings | 1 102 |
| request hash | `de113ff3f066`: sha256 of the exact 273 907-byte PUT body |
| `referenceBuild` | `ftg:2026-10-04+de113ff3f066` |
| payload | 271 060 bytes, Fetch-intercepted (`intercept-0035…bin`, sha256 `3b66815867e34d2f…`) |
| road graph | 2 417 edges, 1 985 nodes; 49 wall edges (edge type 7) |
| wall towers / water bodies / districts | 27 / 0 / 2 |
| settlement border | a square with half width 1 750.00 m, the size ladder's 3 500 m width |
| capture folder | 33 MB: the session recording and the screenshots at 2× (no CPU profile). Free disk: 11 GB before and 11 GB after the session (other lanes writing too). |

**Form values.** The form opened at the town option. The seat read each size option's React element key by `eval`:
three of the 12 keys end in `TOWN` (the small-town, town and big-town options), so the seat matched the whole part of
the key after the option's text, and exactly one option's part is `TOWN`: the selected one. As checklist I4 says for
slots 26 and 27, it was confirmed by `eval` and not selected again; the form-final reading re-read it. The metropolis
option was not touched. The water was the form's own default: no coast, rivers off, neither touched. The farm box was
already on; the forest, reserve-area and wall boxes were switched on. Everything else stayed at FTG's default presets,
and the name (found by its placeholder) was left blank. All settings was never opened (shots 004–009; values verified
by `eval` before the create click). Every click was its own command after its readings, and every coordinate click had
an `elementFromPoint` reading naming its control; a form-state reading after each step showed the dialog still open
(`steps/steps.jsonl`, 17 shots). The 10 form, map and navigation commands equal the 11 of every signed-in `none` capture
(slots 1, 6, 10, 11, 14, 15, 18, 19 and 24) in order and coordinates, with their size select left out. The map (shot
011, 500 m bar) shows a small walled town in the middle of the frame: a round wall closes the core, with both district
labels inside it, suburbs spread on every side and a road leaves to the north. Open meadow with scattered trees covers
most of the frame, a large wood lies to the south-south-west, and hedged fields of crops and pasture line the west,
south-east and east edges. There is no sea, no river and no pond. The core shot (015) has a 250 m bar.

### 37.2 Checks (all executed 2026-10-04, CONFIRMED)

| check | how | result |
|---|---|---|
| all checks of `ftg_capture_post.py` | `--slot 26 --signed-in --premium`, `--check-only` first (the script at `735922948e3970fb…`) | **first run exit 1**: 8 of 10; the request diff against the base and the diff against slot 0 each named the same 11 values outside the 17 named ones (finding 1); every other check passed |
| the first-of-size rule (R-41; checklist I9) | finding 1's steps 1–4 | the 11 values joined the class by name; `--check-only` exit 0, then the writing run exit 0: 10 of 10 pass (calls, size key, water keys, the request diff against the base, the diff against slot 0, the same-size values (vacuous: the first TOWN; this capture sets TOWN's reference values), decode, border, no resident field, `pb_raw` runs) |
| the form steps differ from the captured `none` slots in the size option only (R-41 step 1) | the form-changing commands of the `steps.jsonl` files; the form-state readings | this capture's 10 commands ("Home", "New Settlement", the forest box, the dialog scroll, the reserve-area and wall boxes, "Create Settlement", two zoom clicks, the home link) equal the 11 of slots 1, 6, 10, 11, 14, 15, 18, 19 and 24 in order and coordinates once their size select is left out; no other form change. The form-final reading shows the other seven selects and the 23 checkboxes as slot 25's form-final reading apart from the river box and its All settings mirror (slot 25 is coastal with rivers on). |
| the 11 values come from the size (R-41 step 3) | FTG's client script bundle in this capture's recording (research-side reading) | the client builds the stage list from the size: two stages (a dense stage, then a stage with gaps) for every size above the town, the gaps stage alone for the small town and the town, none for the hamlet and the village sizes; each stage takes its per-size values from a table, and the town's gaps-stage entry (2.5 ha, building share 0.5, branch segments 3 and 3, main-road step 50 m, at most one spoke) equals the request's one stage |
| the widening is red first and safe (R-41 step 4) | the old script and a same-directory copy with the 11 added names, `--check-only` on slots 0–26 | old: slot 26 exit 1 (other 11), slots 0–25 exit 0 at 10 of 10 (same-size 17 of 17 where it applies); copy: slot 26 exit 0, slots 0–25 exit 0 at 10 of 10 (same-size 28 of 28 where it applies). Installed by an atomic rename after checking the file's hash unchanged (`735922948e3970fb…` → `c4ad4ddf76bd1f2a…`). |
| the widened class still guards the second stage at two-stage sizes | the copy's module run in-process on slot 21 (BIG_CITY) and slot 26 with one planted value each | slot 21 unplanted exit 0; slot 21 with the second stage's building material changed: exit 1 (same-size; the old script failed the request diff and the diff against slot 0 instead); slot 21 with the second stage's wall flag changed: exit 1 (same-size); slot 26 with its one stage's building material changed: exit 1 (request diff, diff against slot 0) under both scripts |
| the payload decodes: field 3 edges and nodes, field 8 buildings | `python3 tools/pb_raw.py <payload>` (the post script's run, and a fresh run) | exit 0, 173 distinct field paths; 3.1 × 2 417, 3.2 × 1 985, 8 × 1 102, 7 × 27, 6 × 0, 10 × 2; `structure.md` equals a fresh run apart from its title line |
| the wall in the payload | `research/baselines/adapters/ftg.py`'s decoder, edges counted by type and joined into connected lines | 49 type-7 (wall) edges, 1 178 m long, every wall node within 250 m of the centre, one closed ring with no open end, and 27 towers. The `none` captures of the other sizes are closed rings too: BIG_TOWN (slots 0, 10, 14, 18) 34–46 edges, 694–993 m, within 198–257 m, 17–25 towers; CITY (slot 24) 76 edges, 1 494 m, within 290 m, 36 towers |
| the request's size key and water keys equal the slot's (PC-16) | `create-request.json` | TOWN; coast key empty and rivers false |
| the request hash | sha256 of the PUT row's body, recomputed outside the script | `de113ff3f066`, 273 907 bytes; exactly one PUT row with a body in the recording; `create-request.json` parses to the same object |
| the request differs from the 2026-09-21 base (CITY, coastal with rivers on) only by the size and the water | a leaf diff of the two requests, under the widened class | 32 semantic differences: the size key, the 2 water keys, the 6 water-implied resource leaves and 23 size-dependent values; 0 other; plus 45 client-random partner ids. Both requests have the same 26 top-level keys. Under the old class: 12 size-dependent and 11 other. |
| the request differs from slot 24's (CITY, the same water) only by the size | a leaf diff of the two requests | 24 semantic differences: the size key and 23 size-dependent values; 0 other; plus 45 partner ids |
| the request differs from the other sizes' `none` captures only by the size | leaf diffs of the requests | against slots 0, 10, 14 and 18 (BIG_TOWN): 22 each, the size key and 21 size-dependent values; against slots 1, 11, 15 and 19 (BIG_CITY) and slot 6 (METROPOLIS): 27 each, the size key and 26; 0 other in every pair; plus 45 partner ids |
| the request differs from `coast+river` captures by the size and the water only | leaf diffs of the requests | against slot 25 (CITY) 32, slot 2 (BIG_TOWN) 30, slots 3 (BIG_CITY) and 7 (METROPOLIS) 35: the size key, 2 water keys, 6 water-implied and 23, 21, 26 and 26 size-dependent values; 0 other |
| the checks discriminate (red tests) | this capture checked as every other slot, `--check-only`, under the installed script | as slots 0, 1, 6 and 24 (each its size's first, `none`): exit 1 (size key, border). As slots 10, 11, 14, 15, 18 and 19 (later `none` draws): exit 1 (size key, same-size, border). As slots 2–5, 7–9, 12, 13, 16, 17, 20–23 and 25 (`coast+river` at the other sizes): exit 1 (size key, water keys, request diff, diff against slot 0, same-size, border). As slot 27 (TOWN, `coast+river`): exit 1 (water keys, request diff, diff against slot 0). The check-only runs write nothing (the script returns before its writes). |
| the runner is the profiler's code | `cmp` of the scratchpad copies against `profiler/` before the start | identical: session.mjs `e199be5d…`, drive.mjs `597eb62d…`, lib/common.mjs `3b948576…`, package.json `25e7d362…`, lib/instrument.js `cca253ac…`; port 9341; no FTG process and no `Singleton*` file before; `session closed`, no `Singleton*` file, port 9341 free and no FTG process at once after the stop and again about seven minutes later (37.4 call 5); both `.session` files absent before and after |
| only the seat used the window | the scroll and hover readings and the recording's hosts, documents and writes | root scroll 0 → 0 across the landing, hover empty; one document load (the landing); hosts: the site, its API, analytics, error reporting, fonts and one GPU-benchmark file from a public package CDN (as in slots 2–25); no call to the site's identity provider this run (as in slots 21 to 24); exactly one write to the site's settlements API (the create; listed twice, as the request and its interception); no page outside the site; no response of status 400 or above |
| one settlement made (plan 2.1b (6)) | the PUT status and the list before and after | PUT 200; the list's rows 26 → 27, the new row of size TOWN carrying the PUT's settlement id; no retry |
| the slot bind is safe | `plan.py --bind-ftg 26=…`, then `--check` and a diff against the pre-bind copy | `plan.json` byte-equal to the pre-flight copy just before the bind (no second writer in between); one line changed (slot 26's capture); SAME for both files; `metrics.m-1.json` byte-unchanged (`8a0efa7e…`); `plan.py` unchanged (`68709ba8…`). `plan.json` sha256 moves from `d9c1109e…` to `11a9b357…`. |
| W-05b's class-table reader still reads section 17.3's table | `measure_ftg_slots.py`'s `e02_table()`, before and after this section was written | equal: 17 rows, columns BIG_CITY, BIG_TOWN, CITY and METROPOLIS (37.4 call 3) |
| no account identifier in the files written | grep of the README, `capture-facts.json`, `create-request.json`, `request-diff.txt`, `structure.md`, `steps.jsonl`, this section, the header update, the JSON entry, the checklist note, the post script's new lines, the result file and this lane's `lane-events.log` lines for an email pattern, the display name, a token prefix and a full id | see the result file's privacy row |

### 37.3 Findings

1. **The town has one layout stage where the larger sizes have two (CONFIRMED; R-41).** The first `--check-only` named
   11 values outside the class, the same 11 in the request diff against the base and in the diff against slot 0, and
   the same 11 against every one of 16 earlier requests compared (the base, the 2026-09-25 capture and slots 0, 1, 2, 3,
   6, 7, 10, 11, 14, 15, 18, 19, 24 and 25). The four steps of checklist I9: (1) the form steps differ from those of
   every captured `none` slot in the size option only, and here the size option was the form's own opening value
   (37.2); (2) the 11 are the only values the two failing checks name as other; (3) all 11 sit in the layout preset's
   stage list, which no simple-form control sets (it lives in All settings, never opened): FTG's client builds that list
   from the size, giving every size above the town a dense stage and then a stage with gaps, and the small town and the
   town the gaps stage alone. The leaf diff pairs stages by position, so the town's one stage meets the other sizes'
   dense stage: its identifier and building placement differ (2 values), and nine values of the second stage are absent
   (the other six second-stage values were already in the class and read absent too). The town's one stage carries the
   client's town entry of the gaps-stage table (2.5 ha minimum district area, building share 0.5, branch segments 3 and
   3, main-road step 50 m, at most one spoke) and, like the first stage of every other size, the form's building
   material (wood) and the wall flag on. None of the 11 is a resource, a water key, a form value or a name. (4) They
   joined `SIZE_DEPENDENT` by name, red first (37.2). The class now has **28 named values**. Their values at the five
   sizes captured (the header is not in the class-table form, so W-05b's reader keeps section 17.3's table; 37.4 call 3):

   | leaf (our words) | slot 26: TOWN | slot 24: CITY | slot 0: BIG_TOWN | slot 1: BIG_CITY | slot 6: METROPOLIS | joined at |
   |---|---|---|---|---|---|---|
   | stage 1: branch segments, first direction | 3 | 4 | 3 | 4 | 5 | day 1 |
   | stage 1: branch segments, second direction | 3 | 4 | 3 | 4 | 5 | day 1 |
   | stage 1: minimum district area (ha) | 2.5 | 10 | 6 | 10 | 12 | day 1 |
   | stage 1: building share | 0.5 | 0.2 | 0.1 | 0.2 | 0.25 | day 1 |
   | stage 1: spoke probability | 0.1 | 0.5 | 0.1 | 0.3 | 0.3 | day 1 |
   | stage 1: most spokes | 1 | 1 | 1 | 2 | 2 | slot 1 |
   | stage 1: main-road step (m) | 50 | 50 | 50 | 70 | 70 | slot 1 |
   | stage 2: branch segments, first direction | absent | 3 | 3 | 5 | 5 | slot 1 |
   | stage 2: branch segments, second direction | absent | 3 | 3 | 5 | 5 | slot 1 |
   | stage 2: minimum district area (ha) | absent | 7 | 6 | 10 | 10 | day 1 |
   | stage 2: building share | absent | 0.5 | 0.6 | 0.6 | 0.6 | day 1 |
   | stage 2: main-road step (m) | absent | 60 | 50 | 50 | 50 | day 1 |
   | stage 2: most spokes | absent | 1 | 1 | 1 | 2 | slot 6 |
   | random-faction count | 3 | 4 | 3 | 5 | 6 | day 1 |
   | shop probability, inside the settlement | 0.1 | 0.1 | 0.4 | 0.1 | 0.1 | day 1 |
   | shop probability, outside the settlement | 0.5 | 0.5 | 0.4 | 0.5 | 0.5 | day 1 |
   | religious-workers share | 0.01 | 0.01 | 0.01 | 0.005 | 0.0025 | slot 1 |
   | **stage 1: the stage's identifier** | **the gaps stage's** | the dense stage's | the dense stage's | the dense stage's | the dense stage's | **slot 26** |
   | **stage 1: building placement** | **with gaps** | dense | dense | dense | dense | **slot 26** |
   | **stage 2: the stage's identifier** | **absent** | the gaps stage's | the gaps stage's | the gaps stage's | the gaps stage's | **slot 26** |
   | **stage 2: building placement** | **absent** | with gaps | with gaps | with gaps | with gaps | **slot 26** |
   | **stage 2: branch type** | **absent** | continue | continue | continue | continue | **slot 26** |
   | **stage 2: building material** | **absent** | wood | wood | wood | wood | **slot 26** |
   | **stage 2: main-road turn cap (degrees)** | **absent** | 15 | 15 | 15 | 15 | **slot 26** |
   | **stage 2: side-road turn cap (degrees)** | **absent** | 15 | 15 | 15 | 15 | **slot 26** |
   | **stage 2: wall after this stage** | **absent** | no | no | no | no | **slot 26** |
   | **stage 2: spoke probability** | **absent** | 0.1 | 0.1 | 0.1 | 0.1 | **slot 26** |
   | **stage 2: wall placement** | **absent** | round all lots | round all lots | round all lots | round all lots | **slot 26** |

   The town's "stage 1" row is its gaps stage, so its numbers compare with the other sizes' stage-2 rows: they match the
   CITY and BIG_TOWN pattern of the second stage (branch segments 3 and 3, at most one spoke) at a smaller minimum
   district area. Slot 26 differs from CITY in 23 of the 28 values, from BIG_TOWN in 21 and from BIG_CITY and
   METROPOLIS in 26. Slot 27 (TOWN, `coast+river`) must repeat this column exactly (the same-size check). The eleven
   new values are equal at the four two-stage sizes, so slots 0–25 are unchanged by the widening (28 of 28 same-size
   values equal).
2. **The town is the smallest capture so far (CONFIRMED for this one draw).** Against the `none` captures of BIG_TOWN
   (slots 0, 10, 14, 18) and CITY (slot 24): 1 102 buildings against 1 675–1 826 and 2 881; 2 417 edges against
   3 003–3 597 and 4 123; 1 985 nodes against 2 639–3 145 and 3 664; 2 districts against 2–3 and 4; a 0.27 MB payload
   against 0.38–0.41 and 0.57 MB; a 1 750 m half width against 2 000 and 2 500 m. The account list gives 3 590 people
   against the nominal 3 625.
3. **One closed wall ring, longer than the big towns' (counts CONFIRMED; reading PLAUSIBLE).** The wall is a single
   closed ring of 49 edges and 1 178 m with 27 towers, every wall node within 250 m of the centre: longer and with more
   towers than any BIG_TOWN `none` wall (694–993 m, 17–25 towers), though the town is smaller. The wall flag sits on the
   first stage at every size; at the town that stage is the only one and takes half the buildings (share 0.5), where
   BIG_TOWN's first, dense stage takes a tenth. So the wall PLAUSIBLY closes round more of the town. Every `none` capture
   so far has a single closed ring.
4. **No water body (CONFIRMED).** Field 6 is absent, as in slots 0, 10, 11, 15, 19 and 24. Shot 011 shows no water.
5. **The payload's paths are a subset of the earlier union (CONFIRMED).** 173 distinct field paths, none new. Each of
   the 25 absent from the union of slots 0–25's 198 is absent in at least one earlier capture: field 6 and its parts (3;
   absent in 6 earlier slots), 11.1 and its parts (5; 12), 11.6 and its parts (5; 13), 11.7 and its parts (5; 15),
   11.8.2 and its parts (6; 13), and 9.2.4 (1; absent before only in slot 10). The edge types present (0, 1, 2, 3, 4, 6,
   7, 10) all occur in earlier captures; types 13 and 14 are absent.
6. **Server time (CONFIRMED; contended).** 1.5 s, the shortest so far (the `none` BIG_TOWN captures: 1.9–2.6 s; slot
   24: 2.8 s). The machine was shared, so the figure feeds no row. The layout body was in the folder at the poll's first
   look.
7. **The premium account took a twenty-seventh settlement with no prompt (CONFIRMED).** The list held 26 rows before and
   27 after; no limit, payment or upgrade prompt appeared.
8. **The form's opening state already carries the town's values (CONFIRMED).** The size select was never touched, and
   the request carries the client's town values (the one stage, the faction count 3). The opening form is therefore the
   town's form, not a form with another size's stage values under a town label.
9. **W-05b's size-value reader cannot read a town request (CONFIRMED for the function; its effect on a run PLAUSIBLE).**
   `measure_ftg_slots.py` reads the 17 class values from each bound capture's request by fixed positions, the second
   stage included. Called on this request, its reader stops with an index error (there is no second stage), and its
   "stage 1" rows would read the town's gaps stage. That tool measures every bound slot, so its next run over slot 26
   PLAUSIBLY stops there. The tool belongs to W-05b's lane and was not changed here; the result names it for the session.

### 37.4 Calls and deviations (vetoable)

1. **The size-dependent class grows to 28 values by R-41.** The 11 added values are named in the post script, with this
   capture and the client's stage builder as their evidence. The alternative was to record slot 26 `failed` on values
   that the size option alone sets; slot 27 would then fail the same way, and the programme would have no TOWN. The
   rule's guard holds: a resource, a water key, a form value or a name would have failed the slot. One cost, stated:
   two of the added second-stage values (its building material and its wall flag) take a form control's value at the
   two-stage sizes. There, a change to them now passes the request diff and the diff against slot 0, and is caught by
   the same-size check instead, which applies to every size from here on because every size has a first capture (the
   planted tests in 37.2). A single "stage-list shape" rule would be smaller, but R-24 pins the class by name and this
   lane may change only the names.
2. **The size option was confirmed, not selected** (checklist I4 for slots 26 and 27): the form opened at the town
   option, so the form steps are those of the other `none` slots without their size select. The alternative, selecting
   the same option again, would add a command that changes nothing.
3. **The 28-value table's header is outside the class-table form** (as section 35.3's), and section 17.3's table stays
   the one `measure_ftg_slots.py` reads. That reader turns every cell into a number and maps each row to a fixed
   request position, so the town's absent cells, the text values of the new rows and the 11 new rows would stop it or
   fail its check 4. Its parse was run before and after this section was written, with equal results. Adding the new
   rows and a town reading to that tool is W-05b's work (finding 9).
4. **One more hover reading than slot 25's seat took, and what it showed.** As in slot 25, the hover chain read just
   after the form opened named the create dialog's full-window layer under the "New Settlement" click point: the seat's
   own pointer, not another hand. The other hover readings named only the seat's own last click points (a list row under
   the "Home" point, the box last clicked, the map canvas after the create, the zoom control, the page header under the
   home link). Window focus came with the seat's own "Home" click, as in slots 22 to 25 (PLAUSIBLE reading).
5. **No browser helper outlived the stop; no process was signalled.** After `drive.mjs stop` printed "session closed",
   `pgrep -fl profiles/ftg` was empty at once and again about seven minutes later, as in slots 18 to 25.
6. **The shots.** The re-roll control showed in the first two map shots (011, 012) and was gone after the zooms (015);
   it was never clicked. This time the overview `--full` shot (012) kept its scale-bar label (500 m), unlike slots 10
   and 18 to 25. A second visit to the settlements view after the create (one guarded navigation click) read the list
   and changed nothing.

### 37.5 CONFIRMED versus PLAUSIBLE

CONFIRMED (executed or read) are every number in sections 37.1 and 37.2, finding 1 (the 11 values, the controlled
comparison, the client's stage builder and town entry, the 28-value table, the red-first widening), findings 2 (for this
one draw), 4, 5, 6 (the time, contended), 7 and 8, the wall counts, ring and radius of finding 3, and that W-05b's
reader stops on this request (finding 9). PLAUSIBLE (reasoning only) are why the town's wall is longer than the big
towns', that W-05b's next run stops at slot 26, what raised the window's focus, and that the listed population is the
generated resident count.

## 38 Slot 27 (programme 2) — 2026-10-04, TOWN, `coast+river`: STOPPED, nothing created

Lane `m1/W-02-slot27b`, the seat for programme 2's last slot (J164; owner's go of 2026-10-03, `owner-go.json`). **No
settlement was created; slot 27 stays open** (`plan.json` unchanged, not marked failed). The attempt's folder is
`captures/ftg/2026-10-04T08-26-40` (its README gives the timeline; it is not a capture).

**Before the site (CONFIRMED).** No result file or earlier line for this lane key; slots 0–26 bound and slot 27 open;
`plan.py --check` SAME (`11a9b357…` / `8a0efa7e…`); the capture folders ended at slot 26's `2026-10-04T08-06-17`,
whose one create is slot 26's own; no FTG process, no `Singleton*` file, both `.session` files absent, port 9341 free;
11 GiB free. The isolated runner's copies `cmp` equal to `profiler/` (session.mjs `e199be5d…`, drive.mjs `597eb62d…`,
lib/common.mjs `3b948576…`, package.json `25e7d362…`, lib/instrument.js `cca253ac…`).

**What the seat did (CONFIRMED by `steps/steps.jsonl` and the shots).** Checklist H1–H14 and I1–I11, as for slots 25
and 26. The landing loaded signed in with no consent notice; its root scroll container read 0 at the first reading and
0 again just before the "Home" click, with no hover on the page. The account list held 27 settlements (big town 10, big
city 10, metropolis 4, city 2, town 1: the earlier settlement and slots 1 to 26), so no slot-27 settlement existed. The
form opened at the town option, whose React key remainder is exactly `TOWN` (1 of 12; 3 keys end in `TOWN`); it was
confirmed by `eval` and not selected again. Then: coast select 7 "Coastal", rivers (1008, 498), forests (1008, 556), the
dialog scroll (`wheel 720 400 300`, its point inside the dialog), reserve area (1008, 367) and walled (1008, 396). These
8 commands equal slot 25's first 9 without its size select, in order and coordinates. Each click was its own command
after a `text`, a `shot` and an `elementFromPoint` reading naming its control, and a form-state reading after each step
showed that it had taken. The form-final reading (08:29:44 UTC) equals slot 25's in all eight selects but the size text
and in all 23 boxes: size Town, Medieval europe, Wood, Generic fantasy, Generic religions, Comfortable, Temperate
(deciduous trees), Coastal; name empty; rivers, farms, forests, reserve area and walled on. The create hit test found
"Create Settlement" 1 of 1, hit-testable at (947, 522), inside the dialog.

**What stopped it (CONFIRMED by the readings and shots 012 and 013).** The form-final reading put the five boxes at
y 280–396, the dialog scrolled, as in every one of the 24 earlier signed-in creates with a form-state reading (slots
3–26), each of which stayed scrolled up to its create click. At 08:29:53, with the seat's pointer last at the walled
box, the `:hover` chain ended at the form's own container instead of that box (17 of the 18 earlier slots with this
reading named the box; slot 10's was empty). Shot 012 (08:29:54) still shows the dialog scrolled. At 08:30:19 the
`:hover` chain was empty and `elementFromPoint(1008, 396)` was the form body, no longer the walled box. At 08:30:39 the
five boxes read y 498–614, and shot 013 shows the dialog at its top: it had scrolled back with no seat command. Every
form value was still as set. The seat's last command that moves a pointer or scrolls was the walled click at 08:29:37,
and the recording has no network row between the form's opening (08:28:03) and the stop, so no data arrival re-rendered
the form. Checklist H12 and I10 treat a page that changes without a command as a sign of another hand, so the seat took
shot 014 and stopped the session (`session closed`; no `Singleton*` file, no FTG process, both `.session` files absent,
port 9341 free). The create control was never clicked, and no create CHECKPOINT line was written.

**Effects (CONFIRMED in the recording).** The recording holds the page and its assets, fonts, the tag manager,
analytics, one error report, and two reads of the site's API: the account list and the generation presets, each with
its interception. It holds no create call and no response of status 400 or above. This run made no call to the
identity provider. Nothing was written to the account, which still holds the 27 settlements read before the form. The
recording stays local under `captures/`, which git ignores.

**Reading (PLAUSIBLE, strongly).** A person moved the pointer and scrolled over the visible recording window, which is
headful on the Mac. A wheel or trackpad scroll over the dialog would return it to its top, and nothing in the seat's
commands or the network explains the change. Who it was is unknown. A relaunch needs the window, the mouse and the
trackpad over it left alone while a seat runs (J164, plan 2.1b (8)).

**Calls (vetoable).** (1) A scroll of the create dialog counts as a page change without a command, as the landing's
scroll did for slot 6's first seat (section 16), so the seat stopped instead of re-scrolling and clicking. The create is
the one irreversible step; the click would still have hit-tested at the click, but the rule exists so that a seat never
acts while another hand is on the window. (2) The lane is closed as `stopped` with this record, as slot 6's and slot 3's
first attempts were. No `plan.py --fail-ftg` was run: no create was attempted, so the retry rule does not apply. A
relaunch runs under a new lane key, because the resume rule returns this result for this one. (3) The checklist gained
a note for the relaunch (section I): take a form-state reading with the create hit test, just before the create
CHECKPOINT, and stop if the boxes' coordinates differ from the form-final reading.

**CONFIRMED versus PLAUSIBLE.** CONFIRMED (executed readings, shots, the network index and `steps.jsonl`): the state
before the site, the form as set, the dialog's return to its top and the pointer's departure without a seat command,
the stop, and that no create call was made. PLAUSIBLE: that a person caused the change.
