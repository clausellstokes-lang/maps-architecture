# fix-u — file u's item boundaries (sites-roads/fix-u)

Lane: sites-roads/fix-u (opus; J394, Fable-critiqued). Date: 2026-10-18 (UTC).
Source of the finding: confirm-u (docs/validation/sites-roads-2026-10-18/confirm-u.md, md5 6893f047): a formation defect only; every fragment text, md5, target and the bundle passed.

## The defect

docs/AMENDMENTS-2026-10-18u.md had no blank line between the last `*Reason:*` line of one item and the next item header (`**950.**`, `**951.**`, `**952.**`, `**953.**`), and none before the closing `---` (which turned 953 (e)'s reason into a setext H2). File t and file r put a blank line before every item header.

## What was changed

One file only: docs/AMENDMENTS-2026-10-18u.md. Five exact single replacements, applied by script (python3 -I), each asserted old-text-once before and new-text-once after (5/5 passed):

| # | old (once) | new (once) | line (before -> after) |
|---|---|---|---|
| 1 | `files t and u were not named.\n**950.**` | `files t and u were not named.\n\n**950.**` | 151-152 -> blank at 152 |
| 2 | `record every amendment file that changes it.\n**951.**` | `...changes it.\n\n**951.**` | 186-187 -> blank at 188 |
| 3 | `names how the encounter crop keeps it.\n**952.**` | `...keeps it.\n\n**952.**` | 230-231 -> blank at 233 |
| 4 | `the spike's exit names the measurement.\n**953.**` | `...measurement.\n\n**953.**` | 253-254 -> blank at 257 |
| 5 | `(apply-t-record §5: "Q80's K14 row is file u's").\n---` | `...file u's").\n\n---` | 307-308 -> blank at 312 |

`diff before after` shows exactly five added empty lines (152, 188, 233, 257, 312) and nothing else.

## md5s

| file | before | after | lines |
|---|---|---|---|
| docs/AMENDMENTS-2026-10-18u.md | edad734bb8372b621b378d6975bc951d (apply-u's edad734b) | c1403ea0ede814134563f1ddbc4ff5c6 | 377 -> 382 |

The result is byte-identical (cmp) to confirm-u's preview, scratchpad sites-roads/confirm-u/AMENDMENTS-u.fixed-preview.md (md5 c1403ea0).

## Not changed

No volume, base, INDEX, SUMMARY, gate spec, brief or README was touched; file u is not a bundle source, so the bundle was not regenerated. No fragment text changed. No git command run; host repository untouched; docs/PROGRESS.md not edited.

Scratch: /tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/sites-roads/fix-u/ (before.md, fix.py).
