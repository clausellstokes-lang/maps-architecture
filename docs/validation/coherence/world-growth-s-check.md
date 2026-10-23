# Re-check of amendments s — the 19 closures on disk

> Provenance: written by Opus 5.5 under the Fable manager (J392).

Re-check seat check/world-growth-s, 2026-10-23, branch `claude/focused-cray-qhz855` at `356aa90` (working tree clean
before this file). Inputs: the critic's §1 (`world-growth-r-critic.md`), file s (`docs/AMENDMENTS-2026-10-23s.md`), its
record (`world-growth-s.md`). Every check was made against the files on disk, not against file s: file s's 72 new texts
(54 item fragments, E-1 – E-17, S-1) were parsed out of file s by a script and searched for exactly in their targets,
and each gap's target place was then read and compared with the critic's fix.

**Result: 19 of 19 gaps closed, 0 not closed; all six checks pass.** Four residues outside the fixes' letter are listed
at the end (none reopens a gap's fix as the critic wrote it; two are the same kind of contradiction G-03's base row and
G-04 / G-18 were about, and are worth one small follow-up item).

## Per gap

| gap | where on disk (after s) | verdict | what was confirmed |
|---|---|---|---|
| G-01 | `docs/volumes/V15-atlas.md` 888–892, 894–895, 897–908; 1713 (`ATLAS-2`); 1717 (`ATLAS-6`); 1775 (T-V15-13 (a)); 1892 (J-V15.7) | closed | `c` is the **pyramid cell** (256 / 512 / 1 024 m); the table is recomputed and every cell matches the critic's list and the formula (province L6 1 native, L8 2, L10 3; realm L5 1, L7 2, L9 3; continent L4 1, L6 2, L8 3); the realm prose reads 5–6 / 7–8 / 9; `ATLAS-6` "on demand from level 8 / 7 / 6"; J-V15.7 "stop 2 first on demand … at 8 / 7 / 6"; `ATLAS-2`'s 1.0625 law restated at the native level 6 / 5 / 4; T-V15-13 (a) "4 and 1 pixels per cell" |
| G-02 | `docs/volumes/V13-world.md` 642 (§1b.2 row), 1123 (`WorldEdgeCharter` comment), 1127 (`WorldCharter.edges`), 3098–3099 (§3.11.4); V15 414 (§1b.6), 1957 (RQ-V15-3) | closed | four-argument `edgeCharter(world, side, span, line?)` with `line` the inward offset, absent = own edge; `WorldCharter.edges` and §3.11.4 read "at the extent's side"; V15 cites the four-argument form at both places the fix names |
| G-03 | V13 1268–1272 (§2.3 rows), 4588, 4592–4593, 4659–4660 (`WORLD-1`); `docs/ARCHITECTURE.md` 18436 | closed | rows gain `formationRatio` 4 and `formationMs` 400 / 1 300 / 2 800, `budgetMs` 1 000 / 3 500 / 8 000; the table's totals cite the cell; `WORLD-1` reads the fix's text; the base's §12.10 row moved too (the recorded departure (b)); no 900 / 3 000 / 7 000 or 600 / 1 800 / 4 500 left in V13, V15 or the base |
| G-04 | V13 4616–4618 (paragraph), 4662 (`WORLD-5`) | closed (residue R-1) | the critic's first alternative, as recorded (departure (a)): `WORLD-5` ≤ 300 MB, ≈ 295 MB expected after the two fallbacks |
| G-05 | V13 553 (`WorldRecipe` row gains `parentCharter`), 601–603 (§1b.1 `WorldCharter`, `ViewFacts`), 717–718 (§1b.4 `WorldCharter`) | closed | all three rows and the `parentCharter` mention present, producers and consumers as the fix lists |
| G-06 | `README.md` 16–17; `docs/volumes/INDEX.md` 15, 257; V15 72 | closed (residue R-3) | README's file r row is its own "applied 2026-10-23 by `amendments/world-growth-r-apply`" row; INDEX's opening names files m–r and s applied; INDEX §7 "applied 2026-10-23 by its record"; V15 "as amendments r extended it, applied 2026-10-23" |
| G-07 | `docs/lane-events.log` (the last six lines) | closed | five LANDED lines (spine; the two research notes "(opus; validated by the Fable design and critic seats)"; the science–host review "(opus; weighed by …)"; `critique/V15.md`) and the record's own line — see check (d) |
| G-08 | V13 1081 (`Requirement.target`), 1530 (`PresetRule.options`) | closed | "a `biome` row of source `inclusion`" / "each a `biome` requirement of source `inclusion`"; no `inclusion`-as-kind left in V13, V09, V15 or the base |
| G-09 | `docs/AMENDMENTS-2026-10-23r.md` 593, 672, 819, 1141, 1220, 2229, 2343, 2392, 2405, 2425, 2446, 2526, 3087 | closed | thirteen notes, each directly after the new text of the critic's thirteen fragments (942 (a), 946, 953 (c) "in part", 960 (a), (c), 981 (c), 983 (h), 984 (f), (g), (i), 985 (b), 986 (c), 1003 (d)), each naming the superseding item (1006 (a), 1007 (d), 1007 (a), 1008 (a), (b), 1011, 1013, 1014 (a)–(c), 1015 (a), 1016, 1025 (b)) and the record |
| G-10 | V13 5128–5130 | closed | the rows run J-V13.133, 134, 135 |
| G-11 | V13 1861–1864 (§3.1 (1)); `docs/design/proposal-world-native.md` 274 | closed | `random` for `scenario` resolves to `'none'` unless a preset or requirement names one; the proposal's row reads "`none` by default (the authored path, which the one-click world takes)" |
| G-12 | V13 827 (`WorldRaster.formation?`), 1637 (§2.6 row) | closed | one rule: no grid, no `soil` raster, every reader takes the `inceptisol` row and `ordinary sedimentary`; "by the soil law over the climate alone" is gone; §3.7 (1) (l. 2470) agrees |
| G-13 | V13 647 (§1b.2 `placeFrame` row); V15 1117–1119 (§3.5 (c)) | closed | the six terms' world-child readings incl. `territory` 0 and the ∞ `dossier` clause; V15 cites the V13 row |
| G-14 | V13 4882 (M-W6), 4884 (M-W8 gate gains T-V13-68 (g)'s cover clause); INDEX 144 (M-ATLAS-A); V15 1839–1841 (SA1) | closed | all four statements present as the fix words them |
| G-15 | `docs/design/spine-world-growth-2026-10-23.md` 3–8 | closed | the dated revision line under the title, covering §14 (1), (2) and (3) as the fix asks (departure (g): written as the manager's ruling) |
| G-16 | `docs/volumes/V09-application.md` 1762–1768, 2652 | closed | eight citations (the six letters, two of them used twice) now (5), (6), (7), (8), (8), (6), (4), (9); each checked against §4.22's numbered paragraphs at 3841–3907 (the dossier choice at (6), the physics toolbar inside (8), the gallery (9)) |
| G-17 | V15 985 (§3.3 (4)), 684 (§2.7), 1777 (T-V15-21) | closed | "per-seam treatment settings", "a preset choice", and the third use (departure (c)); neither old phrase remains |
| G-18 | V13 1134 (`ViewFacts.routes`), 4686–4688 (`WORLD-20`), 4766 (T-V13-68 (j)); V15 401–402 (§1b.5 row) | closed (residue R-2) | `routes: WorldRoute[]` of both modes with polyline, `stations`, `sailing`; `water.routes` dropped; `WORLD-20` restated with the routes' polylines and stations; T-V13-68 (j) "every route in force at the week with its stations"; V15's row as the fix words it |
| G-19 | V13 4802 (T-V13-67) | closed | "2–7 × smaller … (the historical record's span, science §8.5; its Rome–Alexandria pair 4–7 ×)" — the source's name stays in file s's *Evidence* (departure (d)) |

## The six checks

| check | result |
|---|---|
| (a) every new text of file s occurs exactly once in its target (python exact `str.count`) | **pass** — 72 of 72 new texts (54 fragments of items 1033–1051, E-1 – E-17, S-1) count 1, each at the line the record names. Six old texts still occur once, each because it is kept inside its own new text (an insertion: 1037 (b), (c), 1038 (c), 1046, E-16, E-17); every other old text counts 0 |
| (b) the record's "after" md5s match the files on disk | **pass** — all nine targets (V13 `0c8f861d…`, base `89a558be…`, V09 `6fed2c36…`, proposal `d6c78262…`, INDEX `e5f779a6…`, README `cb048f89…`, file r `05805c62…`, V15 `4fccc5ba…`, spine `b2fe992f…`) and the three untouched files (brief, SUMMARY, V14) match |
| (c) `python3 tools/bundle_architecture.py --check` | **pass** — "UP TO DATE /home/user/maps-architecture/docs/ARCHITECTURE-FULL.md", exit 0 |
| (d) `docs/lane-events.log` holds the closing seat's LANDED lines | **pass** — the five lines of file s §"The lane log", verbatim (spine 13:23; research science and state 13:36; science–host review 15:59; `critique/V15.md` 16:45), and `2026-10-23 19:11 amendments/world-growth-s LANDED docs/validation/coherence/world-growth-s.md (fable)` |
| (e) file r's status line and its 13 notes | **pass** — l. 18 still reads "**APPLIED** by amendments/world-growth-r-apply on 2026-10-23 …"; the 13 notes are present (twelve read "*Superseded at its turn by item …*", the one for item 953's part reads "*Superseded in part at its turn by item 1007 (a) …*") |
| (f) clean-room lint over the 52 new texts bound for V13, the base, V09 (and V15) | **pass** — no hit for a host source file name (`*.js`/`*.ts`, `autoplacement`, `editSlice`, `seaLanes`, `historyData`), "SettlementForge", "Azgaar"/"FMG", a host path, or the source's name (Casson). The only ruling ids found are `J394` inside the two J-V13 rows item 1042 swaps (pre-existing V13 text, moved, not new wording) |

## Residues (outside the fixes' letter; not counted as open gaps)

- **R-1 (G-04's kind, in the base).** `docs/ARCHITECTURE.md` l. 18440, the §12.10 register's `WORLD-5` row, still reads
  "≤ 285 MB resident", and §12.8 l. 18273 "≈ 285 MB resident during W4"; V13 §6 now says ≤ 300 MB, ≈ 295 MB expected.
  The critic's fix named V13 only; file s moved the base's `WORLD-1` row for the same reason (departure (b)) but not
  `WORLD-5`'s. One base item would align them.
- **R-2 (G-18's kind, in prose).** V13 §5.8 (10) l. 4336 still lists "the water routes" among `viewFacts`' readings,
  and V15 RQ-V15-4 l. 1958 "the water routes"; the record (`ViewFacts.routes`, both modes) is now wider than both
  sentences.
- **R-3 (G-06's kind, quoted).** V15 l. 2017 quotes file r item 1025's INDEX text with "(`docs/AMENDMENTS-2026-10-23r.md`,
  pending application)" — a quotation of the request as it was sent, not a status claim; harmless, noted for a reader.
- **R-4 (G-02, informational).** Three-argument `edgeCharter(world, side, span)` remains at V13 l. 255, 600, 1922 and
  V15 l. 213, 327, 1955; each names a world's own edge (a continuation), where `line` is absent by the new signature,
  so they are consistent.
