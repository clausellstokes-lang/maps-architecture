# Apply record: draft t → docs/volumes/V13-world.md (sites-roads/apply-t-v13)

Lane: sites-roads/apply-t-v13 (opus; J394, Fable-critiqued), under J398 (the owner's Yes on Q5). Date: 2026-10-18.

## Target

- File: `docs/volumes/V13-world.md`
- md5 before: `d0de9ad8dadfeccc89ac86f2ea4d62f4` (4,465 lines) — equals the fragments' recorded md5 d0de9ad8 for all 70 fragments
- md5 after: `02049f9d6340fa4f08cf3f9509def63d` (4,605 lines)
- Source: `docs/validation/sites-roads-2026-10-18/draft-t.fragments.json` (138 fragments; the 70 whose `file` is exactly `docs/volumes/V13-world.md`, applied in the JSON's order)
- Script: `/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/sites-roads/apply_t_v13.py` (python3 -I), one pass, writing the file only after every assertion held

## Method

For each fragment in order: assert `old` occurs exactly once in the file as it stands at that step, then replace that one occurrence with `new`. After all 70: assert every `new` occurs exactly once; assert every `old` not contained in its own `new` occurs zero times, and every `old` contained in its own `new` occurs exactly as often as in that `new` (once).

A first run's post-check flagged 946 (g): its `old` ("W8a and W8b with the patrol step and the border-post proposals;") is a suffix, not a prefix, of its `new` (the new text prepends "W7 (12)'s approaches to world sites and P1's site form with its bend (J393); "), so its one remaining occurrence is the new text itself. That run aborted before writing (the file stayed d0de9ad8); the post-check was widened from "old is a prefix of new" to "old is contained in new" and the script rerun from d0de9ad8. No fragment text was changed; this is not an adjustment.

## Assertion counts

- Once-in-target before replace: 70 / 70 held (no non-match, no stop)
- New text exactly once after all: 70 / 70
- Old text gone (old not contained in its new): 52 / 52
- Old text contained in its new, count equals its count in new (1): 18 / 18 (17 prefix of new; 1 contained not as prefix: 946 (g))
- Adjustments: 0

## Fragment table

| # | id | draft line | result |
|---|---|---|---|
| 1 | 940 (a) | 340 | applied (old is prefix of new) |
| 2 | 941 (a) | 387 | applied |
| 3 | 941 (b) | 772 | applied |
| 4 | 941 (c) | 1157 | applied |
| 5 | 941 (d) | 4261 | applied |
| 6 | 942 (a) | 457 | applied |
| 7 | 942 (b) | 750 | applied |
| 8 | 942 (c) | 753 | applied |
| 9 | 942 (d) | 918 | applied |
| 10 | 942 (e) | 1093 | applied |
| 11 | 942 (f) | 1219 | applied (old is prefix of new) |
| 12 | 942 (g) | 1235 | applied |
| 13 | 942 (h) | 1263 | applied (old is prefix of new) |
| 14 | 942 (i) | 1402 | applied |
| 15 | 942 (j) | 1714 | applied |
| 16 | 942 (k) | 1720 | applied |
| 17 | 942 (l) | 1776 | applied |
| 18 | 942 (m) | 1783 | applied |
| 19 | 942 (n) | 1786 | applied (old is prefix of new) |
| 20 | 942 (o) | 1788 | applied |
| 21 | 942 (p) | 1892 | applied |
| 22 | 942 (q) | 2663 | applied (old is prefix of new) |
| 23 | 942 (r) | 2693 | applied |
| 24 | 942 (s) | 2706 | applied |
| 25 | 942 (t) | 3629 | applied (old is prefix of new) |
| 26 | 943 (a) | 456 | applied |
| 27 | 943 (b) | 504 | applied |
| 28 | 943 (c) | 748 | applied |
| 29 | 943 (d) | 777 | applied (old is prefix of new) |
| 30 | 943 (e) | 801 | applied |
| 31 | 943 (f) | 1254 | applied (old is prefix of new) |
| 32 | 943 (g) | 2070 | applied |
| 33 | 943 (h) | 2078 | applied |
| 34 | 943 (i) | 2090 | applied |
| 35 | 943 (j) | 2115 | applied (old is prefix of new) |
| 36 | 943 (k) | 2297 | applied (old is prefix of new) |
| 37 | 943 (l) | 2472 | applied |
| 38 | 943 (m) | 2787 | applied (old is prefix of new) |
| 39 | 943 (n) | 2846 | applied |
| 40 | 943 (o) | 2848 | applied |
| 41 | 943 (p) | 2886 | applied |
| 42 | 943 (q) | 2887 | applied |
| 43 | 943 (r) | 2919 | applied |
| 44 | 943 (s) | 2922 | applied (old is prefix of new) |
| 45 | 944 (a) | 2375 | applied |
| 46 | 944 (b) | 2387 | applied |
| 47 | 944 (c) | 2927 | applied |
| 48 | 944 (d) | 3768 | applied (old is prefix of new) |
| 49 | 944 (e) | 4286 | applied |
| 50 | 945 (a) | 727 | applied |
| 51 | 945 (b) | 1979 | applied |
| 52 | 945 (c) | 2001 | applied |
| 53 | 945 (d) | 3013 | applied |
| 54 | 946 (a) | 3523 | applied |
| 55 | 946 (b) | 3565 | applied |
| 56 | 946 (c) | 3577 | applied |
| 57 | 946 (d) | 3584 | applied (old is prefix of new) |
| 58 | 946 (e) | 3601 | applied |
| 59 | 946 (f) | 3602 | applied |
| 60 | 946 (g) | 3677 | applied (old contained in new as suffix) |
| 61 | 946 (h) | 3677 | applied |
| 62 | 946 (i) | 3883 | applied (old is prefix of new) |
| 63 | 946 (j) | 4273 | applied (old is prefix of new) |
| 64 | 947 (a) | 116 | applied (old is prefix of new) |
| 65 | 948 (a) | 199 | applied |
| 66 | 948 (b) | 1763 | applied |
| 67 | 948 (c) | 1258 | applied |
| 68 | 948 (d) | 2000 | applied |
| 69 | 948 (e) | 2111 | applied |
| 70 | 948 (f) | 771 | applied |

## Not done here

- The bundle is not regenerated (the record lane does that once).
- No git command run; no other file edited; the host repository untouched.
