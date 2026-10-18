# sites-roads/apply-t-v14 — draft t's V14 fragments applied

Lane sites-roads/apply-t-v14 (Opus 5.5, high; an apply lane under J394 and J398, the owner's "Yes" on Q5). Started
2026-10-18 16:02 UTC. Written as the lane goes.

## Sources

- `docs/validation/sites-roads-2026-10-18/draft-t.fragments.json` (md5 66d10247…, 138 fragments): the 44 whose
  `file` is exactly `docs/volumes/V14-sites.md`, taken in the JSON's order (indices 1–3, 8–19, 41–45, 65–67, 73,
  78–82, 95–106, 110, 133–134).
- `docs/validation/sites-roads-2026-10-18/draft-t.md` (md5 2642fddb…), the draft the fragments carry.
- `docs/AMENDMENTS-2026-10-18r.md` read whole (the amendment files' form).

## Before

- `docs/volumes/V14-sites.md`: 3213 lines, md5 `70d8aa1b3c14e7cab6a135adbd3caa00` — equal to every V14 fragment's
  recorded md5 (`70d8aa1b…`). Snapshot kept in the lane's scratchpad.

## Application

Method: one script (`apply.py` in the lane's scratchpad, run with `python3 -I`): read the target once; for each of the
44 fragments in the JSON's order assert its `old` occurs exactly once in the text as it stands at that step, replace it
once; after all, assert every `new` occurs exactly once and every `old` that is not contained in its own `new` occurs
0 times; re-check the target's md5 unchanged since the read (no sibling write in between); one write. Every fragment
matched at its first try: **no adjustment was needed**, no fragment skipped. Each fragment's recorded md5 equalled the
target's before-md5 (`70d8aa1b…`).

| idx | id | line (before) | result |
|---|---|---|---|
| 1 | 940 (b) | 179 | APPLIED: old once before, new once after; old a prefix of its new (old 1 after, inside the new) |
| 2 | 940 (c) | 298 | APPLIED: old once before, new once after; old a prefix of its new (old 1 after, inside the new) |
| 3 | 940 (d) | 3075 | APPLIED: old once before, new once after; old a prefix of its new (old 1 after, inside the new) |
| 8 | 941 (e) | 362 | APPLIED: old once before, new once after, old 0 after |
| 9 | 941 (f) | 480 | APPLIED: old once before, new once after, old 0 after |
| 10 | 941 (g) | 545 | APPLIED: old once before, new once after, old 0 after |
| 11 | 941 (h) | 559 | APPLIED: old once before, new once after, old 0 after |
| 12 | 941 (i) | 872 | APPLIED: old once before, new once after, old 0 after |
| 13 | 941 (j) | 907 | APPLIED: old once before, new once after, old 0 after |
| 14 | 941 (k) | 987 | APPLIED: old once before, new once after, old 0 after |
| 15 | 941 (l) | 1179 | APPLIED: old once before, new once after; old a prefix of its new (old 1 after, inside the new) |
| 16 | 941 (m) | 2266 | APPLIED: old once before, new once after, old 0 after |
| 17 | 941 (n) | 2997 | APPLIED: old once before, new once after, old 0 after |
| 18 | 941 (o) | 3035 | APPLIED: old once before, new once after, old 0 after |
| 19 | 941 (p) | 3053 | APPLIED: old once before, new once after, old 0 after |
| 41 | 942 (u) | 481 | APPLIED: old once before, new once after, old 0 after |
| 42 | 942 (v) | 1420 | APPLIED: old once before, new once after, old 0 after |
| 43 | 942 (w) | 1444 | APPLIED: old once before, new once after, old 0 after |
| 44 | 942 (x) | 2377 | APPLIED: old once before, new once after, old 0 after |
| 45 | 942 (y) | 2380 | APPLIED: old once before, new once after, old 0 after |
| 65 | 943 (t) | 1404 | APPLIED: old once before, new once after, old 0 after |
| 66 | 943 (u) | 2138 | APPLIED: old once before, new once after, old 0 after |
| 67 | 943 (v) | 2429 | APPLIED: old once before, new once after, old 0 after |
| 73 | 944 (f) | 463 | APPLIED: old once before, new once after, old 0 after |
| 78 | 945 (e) | 478 | APPLIED: old once before, new once after, old 0 after |
| 79 | 945 (f) | 1437 | APPLIED: old once before, new once after, old 0 after |
| 80 | 945 (g) | 1697 | APPLIED: old once before, new once after, old 0 after |
| 81 | 945 (h) | 1943 | APPLIED: old once before, new once after, old 0 after |
| 82 | 945 (i) | 2424 | APPLIED: old once before, new once after, old 0 after |
| 95 | 946 (k) | 2180 | APPLIED: old once before, new once after, old 0 after |
| 96 | 946 (l) | 2210 | APPLIED: old once before, new once after, old 0 after |
| 97 | 946 (m) | 2409 | APPLIED: old once before, new once after; old a suffix of its new (old 1 after, inside the new) |
| 98 | 946 (n) | 2763 | APPLIED: old once before, new once after, old 0 after |
| 99 | 946 (o) | 2838 | APPLIED: old once before, new once after, old 0 after |
| 100 | 946 (p) | 2863 | APPLIED: old once before, new once after; old a prefix of its new (old 1 after, inside the new) |
| 101 | 946 (q) | 2895 | APPLIED: old once before, new once after, old 0 after |
| 102 | 946 (r) | 2895 | APPLIED: old once before, new once after; old a prefix of its new (old 1 after, inside the new) |
| 103 | 946 (s) | 2895 | APPLIED: old once before, new once after, old 0 after |
| 104 | 946 (t) | 3010 | APPLIED: old once before, new once after; old a prefix of its new (old 1 after, inside the new) |
| 105 | 946 (u) | 3047 | APPLIED: old once before, new once after; old a prefix of its new (old 1 after, inside the new) |
| 106 | 946 (v) | 3053 | APPLIED: old once before, new once after, old 0 after |
| 110 | 947 (b) | 74 | APPLIED: old once before, new once after; old a prefix of its new (old 1 after, inside the new) |
| 133 | 948 (g) | 3113 | APPLIED: old once before, new once after, old 0 after |
| 134 | 948 (h) | 3131 | APPLIED: old once before, new once after; old a prefix of its new (old 1 after, inside the new) |

## Assertions

- Before each replacement: old exactly once — 44/44.
- After all: new exactly once — 44/44.
- Old gone (old not contained in its new) — 33/33 at 0 occurrences.
- Old contained in its new — 11 (940 (b), (c), (d), 941 (l), 946 (m) [a suffix], 946 (p), (r), (t), (u), 947 (b),
  948 (h) [prefixes]): each old occurs once after, inside its new.

## After

- `docs/volumes/V14-sites.md`: 3327 lines (3213 before, +114), md5 `681cc8d9b490e4ea4529533ebe8def34`.
- The bundle `docs/ARCHITECTURE-FULL.md` not regenerated (the record lane does it, once). No other file edited; no git
  command run; the host repository untouched.
