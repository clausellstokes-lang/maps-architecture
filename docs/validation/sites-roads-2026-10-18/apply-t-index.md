# apply-t-index — file t's fragments applied to docs/volumes/INDEX.md

Lane: sites-roads/apply-t-index (Opus/high, an apply lane; J394, J398). Source: `docs/validation/sites-roads-2026-10-18/draft-t.fragments.json`, the 10 fragments whose `file` is exactly `docs/volumes/INDEX.md`, applied in the JSON's order by one script (`python3 -I`), each an exact single replacement after asserting its old text occurs exactly once in the file as it stood at that step. The bundle was not regenerated (the record lane does that). No git command was run, and the host repository was not touched.

## md5

| | md5 | lines |
|---|---|---|
| before | `4288179616d26f75b3d717deb23ed0ce` (= every fragment's recorded md5, INDEX 42881796) | 259 |
| after | `2ca7f112e916eea4cf8589c58a414d15` | 260 |

## Fragments

| # | id | line (at draft) | old count before | result |
|---|---|---|---|---|
| 1 | 947 (c) | 14 | 1 | applied |
| 2 | 947 (d) | 40 | 1 | applied |
| 3 | 947 (e) | 40 | 1 | applied |
| 4 | 947 (f) | 71 | 1 | applied |
| 5 | 947 (g) | 72 | 1 | applied |
| 6 | 947 (h) | 186 | 1 | applied |
| 7 | 947 (i) | 222 | 1 | applied |
| 8 | 947 (j) | 222 | 1 | applied |
| 9 | 947 (k) | 228 | 1 | applied |
| 10 | 948 (i) | 48 | 1 | applied |

Adjustments: none. Every old text matched exactly once at its step.

## Assertions after the apply

- Every new text occurs exactly once in the file: 10 / 10.
- Old texts that are not a prefix of their new text (9: all except 947 (k), whose new text starts with its old text): none remains outside its new text. In 947 (c), the old text is a suffix of the new text ("applied by the lane its status line names. The plain-language account ..." closes the new state line). Its one remaining occurrence is the one inside the new text: the file count is 1 and the count inside the new text is 1. The first run of the script asserted a raw count of 0, failed at that check and wrote nothing. The check was refined to "count in the file minus the occurrences inside the new text = 0", and the script was re-run from the untouched file (md5 still 42881796). This was a correction to the check, not to the fragment.
- Script and its output: `/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/sites-roads/apply_index.py`, `.../apply_index.out`.
