# apply-t-record — file t applied: the amendment file, the bundle and the confirm

Lane: sites-roads/apply-t-record (Opus/high, the record lane; J394, Fable-critiqued), under J398 (the owner's "Yes" on
Q5), 2026-10-18 from 16:03 UTC. It ran after the eight target lanes landed (`docs/lane-events.log`, 16:02–16:03) and
edited only `docs/AMENDMENTS-2026-10-18t.md` (new), `docs/ARCHITECTURE-FULL.md` (regenerated), this record, the
folder's `STATUS.md` and `README.md`, and the lane log. No git command run; the host repository untouched.

## 1. The eight target lanes' records (read whole)

| target | lane record | fragments | md5 before (lines) | md5 after (lines) | adjustments |
|---|---|---|---|---|---|
| `docs/volumes/V13-world.md` | `apply-t-v13.md` | 70 | `d0de9ad8dadfeccc89ac86f2ea4d62f4` (4 465) | `02049f9d6340fa4f08cf3f9509def63d` (4 605) | none |
| `docs/volumes/V14-sites.md` | `apply-t-v14.md` | 44 | `70d8aa1b3c14e7cab6a135adbd3caa00` (3 213) | `681cc8d9b490e4ea4529533ebe8def34` (3 327) | none |
| `docs/volumes/INDEX.md` | `apply-t-index.md` | 10 | `4288179616d26f75b3d717deb23ed0ce` (259) | `2ca7f112e916eea4cf8589c58a414d15` (260) | none |
| `docs/volumes/SUMMARY.md` | `apply-t-summary.md` | 5 | `9d1422839ab63a3ec3bf6d13e3ea8265` (214) | `43c7035de2128ac557622b3d4df51753` (223) | none |
| `docs/ARCHITECTURE.md` | `apply-t-base.md` | 4 | `1f871a01961de8a4994125d7bb1993be` (24 462) | `5c463a94ae9cdda1127a5c6875b4eaaf` (24 467) | none |
| `plat/docs/build/M0-world-sites-gate.md` | `apply-t-gate.md` | 2 | `b6c5be2a5d89fbd19035a3c606194fb9` (45) | `7349635a52587501c1071021b30b4cd4` (47) | none |
| `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` | `apply-t-brief.md` | 2 | `fc2520709752ef77f397ba7d6a89c169` (212) | `11d7d45875db5093d2aef909b0b885ba` (216) | none |
| `README.md` | `apply-t-readme.md` | 1 | `2a4b54c89e47cc40bf0a7b3ffd619f07` (31) | `7adac4dbb47bc034c1311306d04d118d` (31) | none |
| **total** | | **138** | | | **0** |

Every before-md5 equals the md5 its fragments record (the draft's eight). Each lane asserted its old texts once at
their turn (138/138) and its new texts once after (138/138). Two lanes corrected their own post-check, not a fragment:
V13's (946 (g), an old text that ends its new text) and INDEX's (947 (c), likewise); each re-ran from the untouched
target. Re-hashed by this lane at 16:03 UTC: all eight targets at their lanes' after-md5s.

## 2. The amendment file

`docs/AMENDMENTS-2026-10-18t.md` — 1 633 lines, md5 `2d6a63086bb1a4277473a735bfcb6049`, built by script
(scratchpad `sites-roads/record/make_t.py`) from `draft-t.md` (md5 `2642fddb…`, 1 610 lines):

- the title and the draft's provenance line kept;
- "Numbered from **940** (file s ended at 939).", the draft's "computed task said 939" note kept as a bracket;
- the status line replaced by the **APPLIED** line as the task worded it, followed by a paragraph with every target's
  md5 before → after and lines, the lanes' records, "no adjustment", the bundle's md5 and line count, the record
  lane's confirm, and a note that "as it stands now" in the items names the target before this file; the draft's
  status paragraph kept after it, its "DRAFT — NOT APPLIED" bold removed, as the record of its checks;
- the Q5 row of the owner-questions table gains "— **ANSWERED 2026-10-18: Yes (J398)**" in its id cell (the table's
  five cells kept);
- everything from "**The fix round**" to the end — the sources, the reading rule, items 940–948 with their 138
  fragments, *Gaps judged not taken*, *Owner questions*, *What this file leaves unchanged and why*, *For the session* —
  identical to the draft but for that Q5 cell (checked by `diff`: one line differs).

## 3. The bundle

`cd /home/user/maps-architecture && python3 tools/bundle_architecture.py && python3 tools/bundle_architecture.py --check`:
before regeneration `--check` reported STALE (exit 1, as expected after the base, INDEX, V13 and V14 changed); the
generator wrote `docs/ARCHITECTURE-FULL.md`: 81 340 lines from 16 sources (`wc -l` 81 339), md5
`d2ab45bbe7a99bd7fb4f0e2b25b463bc`; `--check`: "UP TO DATE", **exit 0**.

## 4. The confirm (by script)

`/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/sites-roads/record/check.py`
(`python3 -I`; output beside it in `check.out`), over `draft-t.fragments.json` (md5 `66d10247…`, 138 fragments):

- every new text occurs exactly once in its target: **138 / 138** (V13 70, V14 44, INDEX 10, SUMMARY 5, base 4,
  gate 2, brief 2, README 1);
- every V13, V14 and base new text occurs exactly once in the bundle: **118 / 118** (V13 70, V14 44, base 4);
- no old text remains outside its own new text: 0 found;
- exit 0, no failure.

## 5. Notes left for file u and the session (not acted on here)

- The applied volume texts put Q5 with its recommendation — V14 §11's Q5 row (940 (d)), INDEX §6's count and Q5 row
  (947 (h), 947 (k)), SUMMARY's decision lines (947 (n) "recommended yes", 947 (o) "eight proceed on their
  recommendation … one you answered") — as the draft wrote them; the owner's answer (J398) is recorded in file t's
  owner-questions table and header only. Carrying "answered: yes" into the volumes is a change of text beyond file t
  (the apply-t-summary lane's note).
- 948 (k)'s SUMMARY count "twenty-six" checks counts the gate as file t leaves it (K1–K13, M1–M13); Q80's K14 row is
  file u's.
- The ledger: J393's landing (file t applied) wants its row in `docs/PROGRESS.md` (the draft's *For the session* (1)),
  the session's to append.
