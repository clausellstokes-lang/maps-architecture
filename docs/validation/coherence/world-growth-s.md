# Amendments s (the world-growth critic's gaps) — the application record

> Written by the Fable closing seat amendments/world-growth-s (J392; 2026-10-23).

The closing seat applied `docs/AMENDMENTS-2026-10-23s.md` on 2026-10-23 as a coherence pass does: every fragment in file order, each quoted
current text found by exact match exactly once in its target at its turn and replaced by the new text verbatim (a ⏎ in a quote is a
line break). The dry run (`world-growth/close-s/dryrun_s.py` in the session's scratchpad, the reviser's `dryrun_revise.py` pointed at
file s with file r added as a target, outside the repository) reported "19 change items, 54 fragments, mode=verify: OK" against the targets
as they stood and "19 change items, 54 fragments, mode=apply: OK" over copies; the same application was then made to the real targets
and the results were identical byte for byte to the copies (`cmp`). The 17 in-place edits to V15 and the one to the spine
(`world-growth/close-s/inplace_edits.py`, atomic through the reviser's `edits_lib.py`: every old text counted once before any write)
were dry-run on copies the same way and then applied, again byte-identical. `python3 tools/bundle_architecture.py` was run after the
application and `--check` reports the bundle up to date. The clean-room lint (`world-growth/close-s/lint_s.py`, the reviser's lint
over file s's new texts bound for the base and the volumes and over every V15 and spine edit's new text) reports no hit.

**Result.** All 19 change items (1033–1051) applied, all 54 fragments matched exactly once at their turn; the 17 V15 edits E-1 – E-17
and the spine's S-1 applied, each old text matched exactly once; no item and no edit not applied. After the application every new
text occurs exactly once in its target. Line numbers are those on disk after the application. The brief, SUMMARY and V14 were not
targets and are unchanged.

## Per item

| item | gap | target | heading (file s) | applied | line(s) the new text now occupies |
|---|---|---|---|---|---|
| 1033 | G-02 | `docs/volumes/V13-world.md` | Volume 13 — §1b.2, §2.2 and §3.11.4 (G-02: `edgeCharter` reads a `WorldCharter`'s interior sides) | applied (4 fragments) | (a) 642; (b) 1123; (c) 1127; (d) 3098–3099 |
| 1034 | G-03 | `docs/volumes/V13-world.md` | Volume 13 — §2.3 (the size rows) and §6 (the one-click table, its paragraph, `WORLD-1`) (G-03: one budget, one number) | applied (4 fragments) | (a) 1268–1272; (b) 4588; (c) 4592–4593; (d) 4659–4660 |
| 1035 | G-03 | `docs/ARCHITECTURE.md` | The base — §12.10 The budget register (G-03: the register's `WORLD-1` row follows V13 §6) | applied (1 fragment) | 18436 |
| 1036 | G-04 | `docs/volumes/V13-world.md` | Volume 13 — §6 Performance budgets: the memory paragraph and `WORLD-5` (G-04: the bar follows the arithmetic) | applied (2 fragments) | (a) 4616–4618; (b) 4662 |
| 1037 | G-05 | `docs/volumes/V13-world.md` | Volume 13 — §1b.1 Records, fields and tables and §1b.4 Entity kinds (G-05: `WorldCharter` and `ViewFacts` wired) | applied (3 fragments) | (a) 553; (b) 601–603; (c) 717–718 |
| 1038 | G-06 | `docs/volumes/INDEX.md` | INDEX — the opening paragraph and §7 (G-06: file r is applied) | applied (3 fragments) | (a) 15; (b) 257; (c) 257 |
| 1039 | G-06 | `README.md` | README — the table of what is where (G-06: file r is applied) | applied (1 fragment) | 16–17 |
| 1040 | G-08 | `docs/volumes/V13-world.md` | Volume 13 — §2.2 `Requirement.target` and §2.3 `PresetRule.options` (G-08: a source word used as a kind) | applied (2 fragments) | (a) 1081; (b) 1530 |
| 1041 | G-09 | `docs/AMENDMENTS-2026-10-23r.md` | Amendments r — the thirteen new texts a later item of the same file supersedes at its turn (G-09) | applied (13 fragments) | (a) 592–594; (b) 671–673; (c) 818–820; (d) 1140–1142; (e) 1219–1221; (f) 2228–2230; (g) 2342–2344; (h) 2391–2393; (i) 2404–2406; (j) 2424–2426; (k) 2445–2447; (l) 2525–2527; (m) 3086–3088 |
| 1042 | G-10 | `docs/volumes/V13-world.md` | Volume 13 — §9 Decisions (G-10: J-V13.134 before J-V13.135) | applied (1 fragment) | 5129–5130 |
| 1043 | G-11 | `docs/volumes/V13-world.md` | Volume 13 — §3.1 W0 Blueprint, step (1) (G-11: what `random` means for `scenario`) | applied (1 fragment) | 1861–1864 |
| 1044 | G-11 | `docs/design/proposal-world-native.md` | The proposal — §10 What is rejected, the last row (G-11: the default is the authored path) | applied (1 fragment) | 274 |
| 1045 | G-12 | `docs/volumes/V13-world.md` | Volume 13 — §2.2 `WorldRaster.formation?` and §2.6 (G-12: a world with no formation grid has one soil rule) | applied (2 fragments) | (a) 827; (b) 1637 |
| 1046 | G-13 | `docs/volumes/V13-world.md` | Volume 13 — §1b.2 the rung-general `placeFrame` row (G-13: the six terms' readings for a world child) | applied (1 fragment) | 647 |
| 1047 | G-14 | `docs/volumes/V13-world.md` | Volume 13 — §8.2 Milestones, the M-W6 and M-W8 rows (G-14: the cover overlay lands at M-W8) | applied (2 fragments) | (a) 4882; (b) 4884 |
| 1048 | G-14 | `docs/volumes/INDEX.md` | INDEX — §3 the dependency table, the M-ATLAS-A row (G-14) | applied (1 fragment) | 144 |
| 1049 | G-16 | `docs/volumes/V09-application.md` | Volume 9 — §4.3 The tool binding table and §4.14 (G-16: §4.22's paragraphs are numbered) | applied (8 fragments) | (a) 1762; (b) 1763; (c) 1764; (d) 1765; (e) 1766; (f) 1767; (g) 1768; (h) 2652 |
| 1050 | G-18 | `docs/volumes/V13-world.md` | Volume 13 — §2.2 `ViewFacts`, §6 `WORLD-20` and §7 T-V13-68 (j) (G-18: every route in force, with its stations) | applied (3 fragments) | (a) 1134; (b) 4686–4688; (c) 4766 |
| 1051 | G-19 | `docs/volumes/V13-world.md` | Volume 13 — §7.4 T-V13-67 (G-19: the sailing bar's lower bound) | applied (1 fragment) | 4802 |

Item 1041's thirteen fragments each quote a superseded new text's last line with the line after it; the line given is the
three-line span, the note the middle line.

## Per in-place edit (V15 and the spine)

| edit | gap | target | where (V15 / the spine) | applied | line(s) the new text now occupies |
|---|---|---|---|---|---|
| E-1 | G-01 | `docs/volumes/V15-atlas.md` | §3.2 (2) the formula sentence | applied (old text matched once) | 888–892 |
| E-2 | G-01 | `docs/volumes/V15-atlas.md` | §3.2 (2) the table's lead-in | applied (old text matched once) | 894–895 |
| E-3 | G-01 | `docs/volumes/V15-atlas.md` | §3.2 (2) the level–stop table | applied (old text matched once) | 897–908 |
| E-4 | G-01 | `docs/volumes/V15-atlas.md` | §9 J-V15.7 | applied (old text matched once) | 1892 |
| E-5 | G-01 | `docs/volumes/V15-atlas.md` | §6 `ATLAS-2` | applied (old text matched once) | 1713 |
| E-6 | G-01 | `docs/volumes/V15-atlas.md` | §6 `ATLAS-6` | applied (old text matched once) | 1717 |
| E-7 | G-01 | `docs/volumes/V15-atlas.md` | §7 T-V15-13 (a) | applied (old text matched once) | 1775 |
| E-8 | G-02 | `docs/volumes/V15-atlas.md` | §1b.6 the world edge charter row | applied (old text matched once) | 414 |
| E-9 | G-02 | `docs/volumes/V15-atlas.md` | §10.2 RQ-V15-3 | applied (old text matched once) | 1957 |
| E-10 | G-06 | `docs/volumes/V15-atlas.md` | §1.0 the reading paragraph | applied (old text matched once) | 72 |
| E-11 | G-13 | `docs/volumes/V15-atlas.md` | §3.5 (c) | applied (old text matched once) | 1117–1119 |
| E-12 | G-14 | `docs/volumes/V15-atlas.md` | §8 Dependencies (SA1) | applied (old text matched once) | 1839–1841 |
| E-13 | G-17 | `docs/volumes/V15-atlas.md` | §3.3 (4) | applied (old text matched once) | 985 |
| E-14 | G-17 | `docs/volumes/V15-atlas.md` | §2.7 the view keys | applied (old text matched once) | 684 |
| E-15 | G-17 | `docs/volumes/V15-atlas.md` | §7 T-V15-21 (the same loose use, beyond the critic's letter) | applied (old text matched once) | 1777 |
| E-16 | G-18 | `docs/volumes/V15-atlas.md` | §1b.5 the host-facts table | applied (old text matched once) | 401–402 |
| E-17 | the revision line | `docs/volumes/V15-atlas.md` | the revision notes under the title | applied (old text matched once) | 41–46 |
| S-1 | G-15 | `docs/design/spine-world-growth-2026-10-23.md` | the revision line under the title | applied (old text matched once) | 1–10 |

## The targets before and after

| target | md5 before | lines before | md5 after | lines after |
|---|---|---|---|---|
| `docs/volumes/V13-world.md` | `ce535bddfa79cc95684e57aeeecdadd4` | 5827 | `0c8f861de2642ac786bfcd8ab34346c9` | 5832 |
| `docs/ARCHITECTURE.md` | `0d27d9cac1b3632d8619b716de798243` | 24509 | `89a558be743fadfeebfc81ee54a790d7` | 24509 |
| `docs/volumes/V09-application.md` | `0401167b8fc31513cca5d96567842638` | 5169 | `6fed2c3658a398bf7714e33b656f9f1f` | 5169 |
| `docs/design/proposal-world-native.md` | `401f149e190593779a18d4dd809bf361` | 309 | `d6c78262666f27005ce2c64e2541310f` | 309 |
| `docs/volumes/INDEX.md` | `a0674e6b2b2c212450b3c702e1c24e53` | 272 | `e5f779a66dd661c27eceacb80e604611` | 272 |
| `README.md` | `d180f98ecea9226fa8a322fd809b60f4` | 32 | `cb048f893fa3ba9ca32428c86ff610fd` | 33 |
| `docs/AMENDMENTS-2026-10-23r.md` | `554f29e2d29dcf64d478c6befed36ec0` | 3964 | `05805c62de6f4ca7841844551b1b3154` | 3977 |
| `docs/volumes/V15-atlas.md` | `8a728409625fbb3d81e386225441402d` | 2185 | `4fccc5ba266abfab95f4e0d0116ed8af` | 2195 |
| `docs/design/spine-world-growth-2026-10-23.md` | `f9bd77e6e244040dae8c83cb140b3de3` | 455 | `b2fe992f84df59eed053491094e3fffe` | 462 |
| `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` (not a target) | `1a9042a58a3665edc1b3ed1d2d252f78` | 211 | `1a9042a58a3665edc1b3ed1d2d252f78` | 211 |
| `docs/volumes/SUMMARY.md` (not a target) | `d82309a6ba8dd88b4c1df34de2ad41c0` | 259 | `d82309a6ba8dd88b4c1df34de2ad41c0` | 259 |
| `docs/volumes/V14-sites.md` (not a target) | `a1c6d7c2bf08595776b1f913765cf1cb` | 3208 | `a1c6d7c2bf08595776b1f913765cf1cb` | 3208 |

## The gaps, closed

| gap | closed by |
|---|---|
| G-01 | V15 in-place edits E-1 – E-7 |
| G-02 | item 1033 (V13 §1b.2, §2.2, §3.11.4); V15 edits E-8, E-9 |
| G-03 | item 1034 (V13 §2.3, §6); item 1035 (the base §12.10, beyond the fix's letter) |
| G-04 | item 1036 (V13 §6) |
| G-05 | item 1037 (V13 §1b.1, §1b.4) |
| G-06 | item 1038 (INDEX); item 1039 (README); V15 edit E-10 |
| G-07 | §"The lane log" (five lines with their git dates) |
| G-08 | item 1040 (V13 §2.2, §2.3) |
| G-09 | item 1041 (file r) |
| G-10 | item 1042 (V13 §9) |
| G-11 | item 1043 (V13 §3.1 (1)); item 1044 (the proposal §10) |
| G-12 | item 1045 (V13 §2.2, §2.6) |
| G-13 | item 1046 (V13 §1b.2); V15 edit E-11 |
| G-14 | item 1047 (V13 §8.2); item 1048 (INDEX §3); V15 edit E-12 |
| G-15 | the spine's in-place edit S-1 |
| G-16 | item 1049 (V09 §4.3, §4.14) |
| G-17 | V15 edits E-13, E-14 (and E-15, a third use of the same kind) |
| G-18 | item 1050 (V13 §2.2, §6, §7); V15 edit E-16 |
| G-19 | item 1051 (V13 T-V13-67) |

## The lane log (G-07)

Five LANDED lines were appended to `docs/lane-events.log` for the spine, the two research notes and the two critiques, dated by
their landing commits (`git log --format='%ad %s' --date=format:'%Y-%m-%d %H:%M' -- <file>`), then this record's own line; the
lines are listed in file s §"The lane log".
