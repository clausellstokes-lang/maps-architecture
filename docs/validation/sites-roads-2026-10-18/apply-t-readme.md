# apply-t-readme: file t's fragment applied to README.md

Lane: sites-roads/apply-t-readme (Opus/high, an apply lane; J394, J398). Source: `docs/validation/sites-roads-2026-10-18/draft-t.fragments.json`, the 1 fragment whose `file` is exactly `README.md`. One script (`python3 -I`) applied it as an exact single replacement, after asserting that its old text occurs exactly once in the file. The bundle was not regenerated (the record lane does that). No git command was run, and the host repository was not touched.

## md5

| | md5 | lines |
|---|---|---|
| before | `2a4b54c89e47cc40bf0a7b3ffd619f07` (matches the fragment's recorded md5, README 2a4b54c8) | 31 |
| after | `7adac4dbb47bc034c1311306d04d118d` | 31 |

## Fragments

| # | id | line (at draft) | old count before | result |
|---|---|---|---|---|
| 1 | 947 (r) | 16 | 1 | applied |

Adjustments: none. The old text matched exactly once.

## Assertions after the apply

- Every new text occurs exactly once in the file: 1 / 1.
- Old texts that are not a prefix of, or contained in, their new text: 1 (947 (r)). None remains: count 0.
- Reverse round-trip: replacing the new text with the old text gives md5 `2a4b54c89e47cc40bf0a7b3ffd619f07`, which is identical to the file before the apply.
- Script: `/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/sites-roads/apply_readme.py`.
