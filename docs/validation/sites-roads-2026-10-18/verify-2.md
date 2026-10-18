# Fragment verification of draft file t, second pass (sites-roads/verify-2)

> Designed on Opus 5.5 under the owner's staffing word of 2026-10-18 (J394); Fable critique closes the run (lane sites-roads/critic)

Lane: sites-roads/verify-2 (opus; J394, Fable-critiqued). Run 2026-10-18 10:37Z, after sites-roads/fix landed. Input:
`docs/validation/sites-roads-2026-10-18/draft-t.fragments.json` (138 fragments, md5 66d102471989116cb52253a1c33f403f;
matches the md5 the fix lane's LANDED line records). Method: one script run under `python3 -I`, reading only (no file
edited, no git run); the script is at the session scratchpad as `sites-roads/verify2.py`, its output as
`sites-roads/verify2.out.json`.

## Checks per fragment

- (a) the old text occurs exactly once in its target as the target stands now; its line also matched against the recorded `line`.
- (b) the whole new text does not already occur in the target, and differs from the old text (an insertion whose new text repeats its anchor passes: the whole new text is absent).
- (c) the target's current md5 versus the fragment's recorded md5.
- (d) the new text is non-empty and the reason is present.
- Extra: no duplicate fragment ids; the 138 fragments applied in order to in-memory copies, each old text once at its turn; after the full apply, each new text occurs exactly once.

## Counts

| Target | Current md5 | Fragments |
|---|---|---|
| docs/volumes/V13-world.md | d0de9ad8dadfeccc89ac86f2ea4d62f4 | 70 |
| docs/volumes/V14-sites.md | 70d8aa1b3c14e7cab6a135adbd3caa00 | 44 |
| docs/ARCHITECTURE.md | 1f871a01961de8a4994125d7bb1993be | 4 |
| plat/docs/build/M0-world-sites-gate.md | b6c5be2a5d89fbd19035a3c606194fb9 | 2 |
| docs/volumes/INDEX.md | 4288179616d26f75b3d717deb23ed0ce | 10 |
| docs/volumes/SUMMARY.md | 9d1422839ab63a3ec3bf6d13e3ea8265 | 5 |
| docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md | fc2520709752ef77f397ba7d6a89c169 | 2 |
| README.md | 2a4b54c89e47cc40bf0a7b3ffd619f07 | 1 |
| **Total** | | **138** |

Results: (a) 138 of 138 old texts occur exactly once, each at its recorded line; (b) 138 of 138 new texts absent and
different from their old texts (36 are insertions whose new text contains the old: well-formed); (c) 0 md5 drifts;
(d) 138 of 138 have a non-empty new text and a reason; duplicate ids: none; sequential application: 138 of 138 apply
in order; after the apply every new text occurs exactly once.

## Failures

| Fragment id | Target | Reason |
|---|---|---|
| (none) | | |

## md5 drifts

None: every fragment's recorded md5 equals its target's md5 now (the eight md5s above, the same the critic and the
fix lane recorded).

Nothing applied; no git run; the host repository untouched.
