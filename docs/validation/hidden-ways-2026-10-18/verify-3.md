# verify-3 — the fragment verifier, third pass (hidden-ways, 2026-10-19)

Seat: hidden-ways/verify-3 (confirm-only). Checked `draft-w.fragments.json` as fix-2 left it (lane log 07:10 LANDED: 913 lines, md5 a9a34c0a; 114 fragments, not the 113 the task text names: fix-2 added 971 (g)) and `draft-w.md` (1141 lines, md5 3576d830) against the live targets. Script: `synth-scripts/verify_w3.py` (66 lines, md5 5057019e), run with `python3 -I`. Nothing in any target or in the draft was changed.

## Targets as they stand (md5sum)
- `docs/volumes/V13-world.md` e68af748 (83 fragments)
- `docs/volumes/V14-sites.md` f5dd37a7 (6)
- `docs/HOST-REQUIREMENTS-2026-10-18.md` 7db37cc1 (12)
- `docs/volumes/INDEX.md` 10a72c97 (7)
- `docs/volumes/SUMMARY.md` 1c0ada29 (6)

Every fragment's stated md5 equals its target's current md5sum.

## Results — 940 checks, 0 failures
- **Once at its line:** 114/114 old texts occur exactly once in their target; 114/114 start exactly at the stated line (none needed the three-line tolerance).
- **Apply in order:** on in-memory copies, all 114 apply in the file's order (955 (a) first); each old is found once at its turn and each new once after.
- **Reverse:** applying new → old in reverse order restores all five copies byte for byte.
- **md ↔ json:** 114 lettered fragment headers in `draft-w.md`, 114 ids in the json, no duplicates, the same set in the same order; all 21 items 955–975 have at least one fragment.
- **Negative controls** (on a deep copy, fragment 958 (a)): a mutated old (last character changed) → caught (old occurs 0x; apply fails; reverse does not restore); line +40 → caught (old at line 1260, stated 1300); md5 set to 00000000 → caught (md5 mismatch). Each control fails as it should, so the clean result is not a vacuous pass.

## Failures
None.

## Verdict
PASS — 114/114 fragments verified against the live targets.
