# hidden-ways/verify — the fragment verifier's record (2026-10-19)

Seat: the confirm-only re-check of `draft-w.fragments.json` against the live targets (Opus/medium). No git run; no file edited but this record and the script copy.

**Inputs.** `docs/validation/hidden-ways-2026-10-18/draft-w.fragments.json` (md5 `f5127fa05c9191838260b2fa88586f65`, 96 records) and `draft-w.md` (md5 `0b15e31569d2a42b5b93b217b96f3058`, 910 lines) — the same md5s the synthesis lane's LANDED lines record [OBSERVED].

**Script.** `docs/validation/hidden-ways-2026-10-18/synth-scripts/verify_w.py`, run with `python3 -I`. It reads each target once from disk and checks:
1. the stated md5 equals the live target's md5;
2. each `old` occurs exactly once in the live target, and at or within three lines of its stated `line`;
3. applying all 96 fragments in order to an in-memory copy succeeds, each `old` found exactly once at its turn;
4. reversing them in reverse order (each `new` found exactly once, swapped back to `old`) gives back every target byte-for-byte;
5. every `**NNN (x).**` item in `draft-w.md` has a fragment with that id, and every fragment has an item. It also checks that ids are not repeated, that the items appear in the fragment order, and that each item's heading names the same target file, line and md5 prefix as its fragment.

**Live targets** [OBSERVED, md5sum at the run]:

| target | md5 | fragments |
|---|---|---|
| `docs/volumes/V13-world.md` | `e68af748638dd3c8474d21b37005c7ac` | 66 |
| `docs/volumes/V14-sites.md` | `f5dd37a7e9b739da7f29095d47a17a87` | 5 |
| `docs/HOST-REQUIREMENTS-2026-10-18.md` | `7db37cc1a4e03fc8db665c1be9d55211` | 12 |
| `docs/volumes/INDEX.md` | `10a72c97f86a88533292971629c56539` | 7 |
| `docs/volumes/SUMMARY.md` | `1c0ada295f24b9e22909ce86eaec2cd8` | 6 |

**Counts.** 96 fragments checked; 96 items in `draft-w.md` (items 955–969); md5 96/96 match; old-once-in-live 96/96; line within ±3 96/96 (all at their stated line); apply in order 96/96; reversal byte-identical on all 5 targets; item to fragment pairing 96/96 both ways, no duplicates, same order; heading file, line and md5 agree 96/96.

**Failures.** None.

**Negative control** [OBSERVED]. A copy of the JSON with four planted defects (one md5 zeroed, one `old` altered, one `line` moved by 10, one record removed) was run through the same script. It reported all four (md5 mismatch; old 0 times, also at apply; line 601 vs 611, also in the heading check; item without a fragment, plus the order notice). So the clean result above is a real pass, not a check that cannot fail.

**Verdict: PASS.** The machine copy applies cleanly to the targets as they stand and reverses cleanly. It holds until any of the five target files changes; after that it has to be re-run.
