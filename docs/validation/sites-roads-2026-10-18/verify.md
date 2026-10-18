# Fragment verification of draft file t (sites-roads/verify)

> Designed on Opus 5.5 under the owner's staffing word of 2026-10-18 (J394); Fable critique closes the run (lane sites-roads/critic)

Lane: sites-roads/verify (opus; J394, Fable-critiqued). Run 2026-10-18 10:13Z. Input:
`docs/validation/sites-roads-2026-10-18/draft-t.fragments.json` (127 fragments, md5 b4604f942464da0b4686d98a645d8e5d).
Method: one script run under `python3 -I`, reading only (no file edited, no git run); the script is kept at the
session scratchpad as `sites-roads/verify.py`, its output as `sites-roads/verify.out.json`.

## Checks per fragment

- (a) the old text occurs exactly once in its target as the target stands now; also its line matched against the recorded `line`.
- (b) the whole new text does not already occur in the target (an insertion whose new text repeats its anchor line passes, since the whole new text is absent).
- (c) the target's current md5 versus the fragment's recorded md5.
- (d) the new text is non-empty and the reason is present.
- Extra: the 127 fragments applied in order to in-memory copies, each old text once at its turn; no duplicate fragment ids.

## Counts

| Target | Current md5 | Fragments |
|---|---|---|
| docs/volumes/V13-world.md | d0de9ad8dadfeccc89ac86f2ea4d62f4 | 64 |
| docs/volumes/V14-sites.md | 70d8aa1b3c14e7cab6a135adbd3caa00 | 42 |
| docs/ARCHITECTURE.md | 1f871a01961de8a4994125d7bb1993be | 3 |
| plat/docs/build/M0-world-sites-gate.md | b6c5be2a5d89fbd19035a3c606194fb9 | 2 |
| docs/volumes/INDEX.md | 4288179616d26f75b3d717deb23ed0ce | 9 |
| docs/volumes/SUMMARY.md | 9d1422839ab63a3ec3bf6d13e3ea8265 | 4 |
| docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md | fc2520709752ef77f397ba7d6a89c169 | 2 |
| README.md | 2a4b54c89e47cc40bf0a7b3ffd619f07 | 1 |
| **Total** | | **127** |

Results: (a) 127 of 127 old texts occur exactly once, each at its recorded line; (b) 127 of 127 new texts absent
(34 fragments are insertions whose new text contains the old, 31 of them beginning with it: well-formed); (c) 0 md5
drifts; (d) 127 of 127 have a non-empty new text and a reason; sequential application: 127 of 127 apply in order;
duplicate ids: none.

## Failures

| Fragment id | Target | Reason |
|---|---|---|
| (none) | | |

## md5 drifts

None: every fragment's recorded md5 equals its target's md5 at 10:13Z. The verdict holds only for these md5s; if any
target changes before application, re-run the script.
