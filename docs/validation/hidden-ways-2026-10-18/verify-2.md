# hidden-ways/verify-2 — confirm-only re-check of draft w's machine copy (2026-10-19)

Seat: the fragment verifier hidden-ways/verify-2 (confirm-only). Script of my own, written fresh (not the synthesis scripts in `synth-scripts/`), run under `python3 -I` against the live targets.

**Verdict: PASS — 113 of 113 fragments checked, 0 failures.**

## What was checked [OBSERVED]

Input `docs/validation/hidden-ways-2026-10-18/draft-w.fragments.json` (113 records) and `draft-w.md` (113 item headers `**NNN (x).**`).

| Check | Result |
|---|---|
| ids unique in the JSON | 113 unique |
| stated md5 = live `md5sum` of the target | 113/113 |
| `old` occurs exactly once in the live target | 113/113 |
| `old` starts at the stated line (tolerance ±3) | 113/113, every one at offset 0 |
| draft-w.md item ↔ JSON fragment, by id | 113 ↔ 113, none missing either way, same order |
| draft-w.md header (target, line, md5 prefix) = JSON | 113/113 |
| in-order application to copies (each `old` once in the evolving copy) | 113/113 applied |
| `new` occurs once in the fully applied copy | 113/113 |
| reversal in reverse order at the recorded offsets restores each file byte-for-byte | 5/5 files |

Per target: `docs/volumes/V13-world.md` 82, `docs/volumes/V14-sites.md` 6, `docs/HOST-REQUIREMENTS-2026-10-18.md` 12, `docs/volumes/INDEX.md` 7, `docs/volumes/SUMMARY.md` 6.

Live md5 (before): V13 `e68af748`, V14 `f5dd37a7`, HRQ `7db37cc1`, INDEX `10a72c97`, SUMMARY `1c0ada29`.
After application: V13 `3be48f34`, V14 `6ad657ca`, HRQ `7ff6f944`, INDEX `1f988c2d`, SUMMARY `7de28faa` — these equal the after-md5s the fix seat's LANDED line records (`docs/lane-events.log`, hidden-ways/fix LANDED draft-w.md, 2026-10-19 06:51).

## Negative control [OBSERVED]

A mutated copy of the JSON (955 (a) md5 zeroed, 955 (b) line +10, 955 (c) old text altered, 955 (d) id renamed to 999 (z)) produced exactly the expected failures: md5 mismatch, line 374 vs stated 384, old found 0 times (live and in-order apply), the md/JSON id mismatch both ways, and the header disagreements. The checker detects each failure class it claims to test.

## Failures

None.

Script: `/tmp/claude-0/-home-user-maps-architecture/0879ea5b-b746-548b-94fc-4b8bc2058b38/scratchpad/v2.py` (scratch, not part of the repo).
