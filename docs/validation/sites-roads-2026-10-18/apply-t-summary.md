# apply-t-summary — file t's fragments applied to docs/volumes/SUMMARY.md

Lane: sites-roads/apply-t-summary (opus; J394, Fable-critiqued), under J398 (the owner's Yes on Q5), 2026-10-18.
Source: docs/validation/sites-roads-2026-10-18/draft-t.fragments.json, the 5 fragments whose "file" is exactly
`docs/volumes/SUMMARY.md`, applied in the JSON's order by one script (python3 -I; scratchpad
`sites-roads/apply_summary.py`). No git command run; the host repository untouched; the bundle not regenerated (the
record lane does it, once).

## md5s

| | md5 | lines |
|---|---|---|
| before | 9d1422839ab63a3ec3bf6d13e3ea8265 (equal to every fragment's recorded md5) | 214 |
| after | 43c7035de2128ac557622b3d4df51753 | 223 |

The recorded md5 is the base's; the script's per-step md5 note for fragments 2–5 is only the expected drift after the
earlier fragments landed. The once-in-target assertion held at every step.

## Fragments

| # | id | base line | landed at | result |
|---|---|---|---|---|
| 1 | 947 (l) | 15 | 15 | applied (old once → new once) |
| 2 | 947 (m) | 84 | 85 | applied (old once → new once) |
| 3 | 947 (n) | 197 | 203 | applied (old once → new once) |
| 4 | 947 (o) | 209 | 218 | applied (old once → new once) |
| 5 | 948 (k) | 213 | 222 | applied (old once → new once) |

Adjustments: none. No non-match; no fragment skipped.

## Assertions after

- every new text occurs exactly once: 5 / 5;
- every old text that is not a prefix of its new text is gone: 3 / 3 (947 (l), 947 (o), 948 (k));
- the 2 old texts that are prefixes of their new texts (947 (m), 947 (n)) each occur once, inside their new text.

## Note for the record lane (not acted on; outside this lane)

The applied texts are the draft's as written: 947 (n) still reads "recommended yes; the design reads it so until you
say otherwise" and 947 (o) "eight proceed on their recommendation … one you answered on 18 October", although the
owner answered Q5 "Yes" (J398); and 948 (k)'s "twenty-six" does not count Q80's K14 row (file u). Whether these
follow J398 / file u is for file u or the record lane; this lane applies file t verbatim.
