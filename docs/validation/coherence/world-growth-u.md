# Amendments u (the four delegated decisions, J396) — the application record

> Written by the session's Fable seat amendments/world-growth-u (J396; 2026-10-23).

The seat applied `docs/AMENDMENTS-2026-10-23u.md` on 2026-10-23 as a coherence pass does: every fragment in file order, each quoted
current text found by exact match exactly once in its target at its turn and replaced by the new text verbatim (a ⏎ in a quote is a
line break). The dry run (`world-growth/close-u/dryrun_u.py` in the session's scratchpad, the closing seat's `dryrun_s.py` pointed at
file u with SUMMARY, the brief and HANDOFF as targets, outside the repository) reported "27 change items, 32 fragments, mode=verify: OK"
against the targets as they stood and "27 change items, 32 fragments, mode=apply: OK" over copies; the same application was then
made to the real targets and the results were identical byte for byte to the copies (`cmp`). The 14 in-place edits to V15
(`world-growth/close-u/inplace_u.py`, atomic through the reviser's `edits_lib.py`: every old text counted once before any write)
were dry-run on a copy the same way and then applied, again byte-identical. `python3 tools/bundle_architecture.py` was run after the
application and `--check` reports the bundle up to date. The clean-room lint (`world-growth/close-u/lint_u.py`, the closing seat's lint
over file u's new texts bound for the base and the volumes and over every V15 edit's new text) reports no host identifier, product
name, ruling id or host document name; its one flagged token, `basic` in items 1057 and 1058, is this design's own group name
(V13 §2.3's `PresetRule.options[].group`, `'basic'|'advanced'|'deep'`; V09's `basic: boolean`), which the state note's Part D
quotes from V09 — a false positive of the token list, examined and dismissed.

**Result.** All 27 change items (1056–1082) applied, all 32 fragments matched exactly once at their turn; the 14 V15 edits E-1 – E-14
applied, each old text matched exactly once; no item and no edit not applied. Item 1055 is the owner-rule item and carries no
current or new text. After the application every new text occurs exactly once in its target. Line numbers are those on disk after
the application.

## Per item

| item | ruling | target | heading (file u) | applied | line(s) the new text now occupies |
|---|---|---|---|---|---|
| 1056 | J396 (1) | `docs/volumes/V13-world.md` | Volume 13 — §1.4 Out of scope, with the reason (the host's own changes bullet) | applied (1 fragment) | 522–523 |
| 1057 | J396 (2) | `docs/volumes/V13-world.md` | Volume 13 — §2.3 New rule tables (`PresetRule`: the gate's rows per account kind) | applied (2 fragments) | (a) 1265–1266; (b) 1531–1532 |
| 1058 | J396 (2) | `docs/volumes/V13-world.md` | Volume 13 — §4.2 (the outcome keys), §7.4 (T-V13-73) and §7.5 (the refusal row): the gate's refusal and its test | applied (3 fragments) | (a) 3913; (b) 4852; (c) 4808–4809 |
| 1059 | J396 (1) | `docs/volumes/V13-world.md` | Volume 13 — §8.5 The host's parallel track (the preamble: H22's waits) | applied (1 fragment) | 4948–4949 |
| 1060 | J396 (1) | `docs/volumes/V13-world.md` | Volume 13 — §8.5 H5 (the waits-on column) | applied (1 fragment) | 4960 |
| 1061 | J396 (1) | `docs/volumes/V13-world.md` | Volume 13 — §8.5 H22 (the row's last clause and its waits-on column) | applied (1 fragment) | 4977 |
| 1062 | J396 (3) | `docs/volumes/V13-world.md` | Volume 13 — §8.5 H35 (the when column: the gallery) | applied (1 fragment) | 4990 |
| 1063 | J396 (1) | `docs/volumes/V13-world.md` | Volume 13 — §9 Decisions (J-V13.136, after J-V13.135) | applied (1 fragment) | 5134–5135 |
| 1064 | J396 (1) | `docs/volumes/V13-world.md` | Volume 13 — §10 Base change requests (BCR-V13-47, after BCR-V13-46) | applied (1 fragment) | 5592–5601 |
| 1065 | J396 (2) | `docs/volumes/V13-world.md` | Volume 13 — §11 Owner questions (Q5 — who may generate with what: ruled) | applied (1 fragment) | 5661–5675 |
| 1066 | J396 (1) | `docs/volumes/V13-world.md` | Volume 13 — §11 Owner questions (Q4 — J86's door 1 and the world canon: ruled) | applied (1 fragment) | 5677–5690 |
| 1067 | J396 (1) | `docs/volumes/V13-world.md` | Volume 13 — §11 Owner questions ("Ruled — the birth canon and a fight verdict": the Q4 clause) | applied (1 fragment) | 5709 |
| 1068 | J396 (2) | `docs/volumes/V09-application.md` | Volume 9 — §4.22 The world dialog ((8) Nothing hidden; the gate at the one generate action) | applied (1 fragment) | 3896–3907 |
| 1069 | J396 (3) | `docs/volumes/V09-application.md` | Volume 9 — §5.13 Open, recent and new (the world map's strings) | applied (1 fragment) | 4292–4297 |
| 1070 | J396 (1) | `docs/ARCHITECTURE.md` | The base — §11.4 Host inputs (the closed door 1 and the fifth door: the owner's word on the canon) | applied (1 fragment) | 17729–17733 |
| 1071 | J396 (1) | `docs/volumes/INDEX.md` | INDEX — §6 Owner questions with recommendations (the preamble) | applied (2 fragments) | (a) 193; (b) 196–202 |
| 1072 | J396 (1) | `docs/volumes/INDEX.md` | INDEX — §6 (the V13 Q4 row) | applied (1 fragment) | 234 |
| 1073 | J396 (2) | `docs/volumes/INDEX.md` | INDEX — §6 (the V13 Q5 row) | applied (1 fragment) | 235 |
| 1074 | J396 (3), (4) | `docs/volumes/INDEX.md` | INDEX — §6 (the four V15 rows) | applied (1 fragment) | 240–243 |
| 1075 | J396 (4) | `docs/volumes/INDEX.md` | INDEX — §3 (the M-ATLAS-C row) | applied (1 fragment) | 146 |
| 1076 | J396 (1)–(4) | `docs/volumes/SUMMARY.md` | SUMMARY — the opening (the count of the decisions that are yours) | applied (1 fragment) | 18–24 |
| 1077 | J396 (1), (3), (4) | `docs/volumes/SUMMARY.md` | SUMMARY — "Decisions that are yours" (the world map bullet and the one that waited on your word) | applied (2 fragments) | (a) 244; (b) 245–249 |
| 1078 | J396 (1) | `docs/volumes/SUMMARY.md` | SUMMARY — "What the two new volumes ask of you" | applied (1 fragment) | 256–257 |
| 1079 | J396 (1) | `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` | The brief — §6 Part C (the owner questions that remain) | applied (1 fragment) | 126 |
| 1080 | J396 (1) | `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` | The brief — §9 Order and timing (the host's track row) | applied (1 fragment) | 203 |
| 1081 | J396 (1)–(4) | `docs/HANDOFF.md` | HANDOFF — the pass recorded as J395 (the open list) | applied (1 fragment) | 47 |
| 1082 | J396 (1)–(4) | `docs/HANDOFF.md` | HANDOFF — "WAITING ON THE OWNER" (ruled) | applied (1 fragment) | 49 |

## Per in-place edit (V15)

| edit | ruling | target | where (V15) | applied | line(s) the new text now occupies |
|---|---|---|---|---|---|
| E-1 | J396 | `docs/volumes/V15-atlas.md` | the revision notes under the title | applied (old text matched once) | 46–51 |
| E-2 | J396 (3) | `docs/volumes/V15-atlas.md` | §1.0 the naming paragraph | applied (old text matched once) | 86 |
| E-3 | J396 (4) | `docs/volumes/V15-atlas.md` | §1.4 the art bullet | applied (old text matched once) | 269–273 |
| E-4 | J396 (4) | `docs/volumes/V15-atlas.md` | §2.4 `FigureRow.asset` | applied (old text matched once) | 639 |
| E-5 | J396 (3) | `docs/volumes/V15-atlas.md` | §5.1 the page's opening sentence | applied (old text matched once) | 1605–1606 |
| E-6 | J396 (3) | `docs/volumes/V15-atlas.md` | §5.5 the sharing paragraph, (3) and (4) | applied (old text matched once) | 1691–1703 |
| E-7 | J396 (3) | `docs/volumes/V15-atlas.md` | §7.3 T-V15-26 (after T-V15-8) | applied (old text matched once) | 1782–1783 |
| E-8 | J396 (4) | `docs/volumes/V15-atlas.md` | §8 the preamble's art sentence | applied (old text matched once) | 1841–1842 |
| E-9 | J396 (4) | `docs/volumes/V15-atlas.md` | §8 the total row | applied (old text matched once) | 1852 |
| E-10 | J396 (4) | `docs/volumes/V15-atlas.md` | §8 Dependencies | applied (old text matched once) | 1860–1863 |
| E-11 | J396 (3), (4) | `docs/volumes/V15-atlas.md` | §9 J-V15.37 – J-V15.40 (after J-V15.36) | applied (old text matched once) | 1938–1942 |
| E-12 | J396 (4) | `docs/volumes/V15-atlas.md` | §10.3 RQ-V15-9 | applied (old text matched once) | 1990 |
| E-13 | J396 (3), (4) | `docs/volumes/V15-atlas.md` | §11 the preamble and the four rows | applied (old text matched once) | 2072–2081 |
| E-14 | J396 (3) | `docs/volumes/V15-atlas.md` | §12 the PLAUSIBLE bullet | applied (old text matched once) | 2138–2139 |

## The targets before and after

| target | md5 before | lines before | md5 after | lines after |
|---|---|---|---|---|
| `docs/volumes/V13-world.md` | `ac919efd5cb3cb64f0f2d2d8699fe950` | 5832 | `a382bc11b32e7c44ea7d0a8c667b57c4` | 5851 |
| `docs/ARCHITECTURE.md` | `607c1b42571141ad4c22e10a3fbcb50c` | 24509 | `c3ce2487b9a38d49f75c28f2853c0c81` | 24512 |
| `docs/volumes/V09-application.md` | `6fed2c3658a398bf7714e33b656f9f1f` | 5169 | `39303070dbea7cf45a03880bc59620d7` | 5183 |
| `docs/volumes/INDEX.md` | `e5f779a66dd661c27eceacb80e604611` | 272 | `0c5c3eb899e5d538d958116e57f11da7` | 274 |
| `docs/volumes/SUMMARY.md` | `d82309a6ba8dd88b4c1df34de2ad41c0` | 259 | `ba1902e9369845135b1b983a2a680b00` | 261 |
| `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` | `1a9042a58a3665edc1b3ed1d2d252f78` | 211 | `6e5a3bce7d5c507893d41ce028999fbf` | 211 |
| `docs/HANDOFF.md` | `489f7a4c2d7d6256fbb87372423a7873` | 686 | `68a27f6943d9c9e7f47c30b5663ba66b` | 686 |
| `docs/volumes/V15-atlas.md` | `a5310ec5f9dd26a1776c3dd339bf0c27` | 2195 | `a4bfc7a02c7da53d80883c72032536e3` | 2218 |

## The rulings, carried

| ruling | carried by |
|---|---|
| J396 (1) | items 1056, 1059, 1060, 1061, 1063 (J-V13.136), 1064 (BCR-V13-47), 1066, 1067 (V13); 1070 (the base §11.4); 1071, 1072 (INDEX); 1076, 1077 (b), 1078 (SUMMARY); 1079, 1080 (the brief); 1081, 1082 (HANDOFF) |
| J396 (2) | items 1057 (`PresetRule.gate`), 1058 (`refuse.surface.gate`, T-V13-73), 1065 (V13 §11 ruled); 1068 (V09 §4.22 (8)); 1073 (INDEX) |
| J396 (3) | items 1062 (V13 H35), 1069 (V09 §5.13), 1074 (INDEX), 1077 (a) (SUMMARY); V15 edits E-1, E-2, E-5, E-6, E-7 (T-V15-26), E-11 (J-V15.37, J-V15.38, J-V15.40), E-13, E-14 |
| J396 (4) | items 1074, 1075 (INDEX), 1077 (a) (SUMMARY); V15 edits E-3, E-4, E-8, E-9, E-10, E-11 (J-V15.39), E-12, E-13 |

## "Q4" references left (none live)

Every live reference to V13 §11 Q4 in V13, the base, V09, V15, INDEX, SUMMARY, the brief and HANDOFF now reads the ruled state. What
still spells "Q4" is a dated record, left as it stood: V13's "How to read this volume" notes for files m, p and q (the questions those
passes added or refined), BCR-V13-40's text (the §11.4 sentence as file q wrote it, superseded by BCR-V13-47), V15 §10.4's quoted
INDEX rows (file r's texts, a record), HANDOFF's older paragraphs (V14 Q1–Q4; the owner's deferral of 2026-10-16), and the other
volumes' own Q4 rows (V08, V10, V14, V15), which are not V13's question.
