# hidden-ways/verify — the fragment verifier's record, correction run (2026-10-19)

Seat: the confirm-only re-check of `draft-w.fragments.json` against the live targets (Opus/medium). No git run; no file edited except this record and the script copy. The v1 record (96 fragments, 02:15) is kept as `verify-v1.md`; this record covers the revised draft w (items 955–975).

**Inputs** [OBSERVED]. `draft-w.fragments.json` (md5 `6318f27dec5b99cc871efec4ef384c58`, 110 records) and `draft-w.md` (md5 `f4221a487047b00050988fbf1dde8865`, 1102 lines). Both md5s match the synthesis-2 LANDED line (`docs/lane-events.log:10141`).

**Script.** `synth-scripts/verify_w2.py` (my own, written fresh for this run), run with `python3 -I`. It reads each target once from disk and checks:
1. the stated md5 equals the live target's md5;
2. each `old` occurs exactly once in the live target, at or within three lines of its stated `line`;
3. applying all fragments in order to an in-memory copy succeeds, with each `old` found exactly once at its turn;
4. reversing them in reverse order (each `new` found exactly once and swapped back to `old`) restores every target byte-for-byte;
5. every `**NNN (x).**` item in `draft-w.md` has a fragment with that id, and every fragment has an item. It also checks for repeated ids, for items and fragments in the same order, for each item heading's `Target:` file, line and md5 prefix agreeing with its fragment, and for overlapping `old` ranges within one target.

**Live targets** [OBSERVED, md5 at the run; after = md5 of the in-memory copy with all fragments applied]:

| target | live md5 | fragments | after md5 |
|---|---|---|---|
| `docs/volumes/V13-world.md` | `e68af748638dd3c8474d21b37005c7ac` | 80 | `31f46b80aca90a5e31ba481b38067a56` |
| `docs/volumes/V14-sites.md` | `f5dd37a7e9b739da7f29095d47a17a87` | 5 | `f3de9e332c56ae5045bd29f57814ff6d` |
| `docs/HOST-REQUIREMENTS-2026-10-18.md` | `7db37cc1a4e03fc8db665c1be9d55211` | 12 | `d51b547d6a06fed31a8ccaf08b5370fa` |
| `docs/volumes/INDEX.md` | `10a72c97f86a88533292971629c56539` | 7 | `1f988c2d9795d10fb8cb5a9ccaf06c5b` |
| `docs/volumes/SUMMARY.md` | `1c0ada295f24b9e22909ce86eaec2cd8` | 6 | `7de28faa4c5df1819d33063058523ae6` |

The after md5 prefixes match the ones synthesis-2 recorded (`docs/lane-events.log:10141`: V13 31f46b80, V14 f3de9e33, HRQ d51b547d, INDEX 1f988c2d, SUMMARY 7de28faa) [OBSERVED].

**Counts.** 110 fragments checked against 110 items in `draft-w.md` (items 955–975).

| check | result |
|---|---|
| md5 match | 110/110 |
| `old` exactly once in the live target | 110/110 |
| `old` within ±3 lines of its stated line | 110/110 |
| apply in order | 110/110 |
| reverse in order | 110/110 |
| byte-identical after reversal | 5/5 targets |
| item–fragment pairing (both ways) | 110/110 |
| duplicate ids | none |
| items and fragments in the same order | yes |
| heading file, line and md5 agree with the fragment | 110/110 |
| overlapping `old` ranges | 0 |

**Failures.** None.

**Negative control** [OBSERVED]. I planted four defects in a copy of the JSON:
- md5 of 955 (d) zeroed;
- `old` of 958 (d) altered;
- `line` of 960 (g) moved by +10;
- record 964 (b) removed.

The same script reported all four:
- md5 mismatch for 955 (d), also caught by the heading check;
- `old` found 0 times for 958 (d), both in the live target and at apply;
- 960 (g) found at line 2558 against a stated 2568, also caught by the heading check;
- item 964 (b) without a fragment.

A fifth probe, a `new` that also contains its `old`, was correctly not flagged, because the reversal is still unambiguous. The clean result above is therefore a real pass, not a check that cannot fail.

**Verdict: PASS.** The machine copy applies cleanly to the five targets as they stand and reverses cleanly. It holds only until one of those files changes; after that it must be re-run.
