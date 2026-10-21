# File x applied (hidden-ways/file-x)

2026-10-19. The application record of `docs/AMENDMENTS-2026-10-18x.md` (items 976–982, 20 fragments), written on the
owner's decision J421 ("i follow your recommendations", 2026-10-19 07:12Z) from `confirm-consistency.md`'s six residues
F1–F6. Scripts (`python3 -I`, under `synth-scripts/`): `build_x.py` (the draft and its machine copy from the targets as
they stood; the two V13 lines the host document cites computed by applying the V13 fragments to a copy), `assemble_x.py`
(the draft's header and tail), `check_x.py` (the verify), `apply_x.py` (`apply_w.py`'s form, JSON path changed only),
`write_x.py` (the applied file, items byte for byte from `draft-x.md`).

## 1. Verify (before the apply, copies only)

`check_x.py`: **407 checks, 0 failures** — each fragment's md5 equal to its live target's (file w's after-md5s); each old
exactly once, at its stated line; in-order application on copies, each new exactly once after its turn and at the end;
no old left outside its own new; the reverse application restoring the four targets byte for byte; `draft-x.md` ↔
`draft-x.fragments.json` by id and order (20 = 20), every item 976–982 with a fragment, each md block's file, line,
md5, current text and new text equal to the JSON's; the clean room (critic-3's tokens and the request's identifiers)
0 hits in the five V13 new texts. Negative controls, each caught: an old altered (979 (a): 4 failures), a line +40
(1), an md5 zeroed (1), an ambiguous old `" pw"` (21 occurrences: 5). The dry run of `apply_x.py` gave the after-md5s
below.

## 2. The application, target by target

| target | md5 before (lines) | md5 after (lines) | fragments |
|---|---|---|---|
| `docs/volumes/V13-world.md` | `81b3a00364b1026b7c3b6a047a59a605` (4832) | `799d0f72d7013edef579d6dfb6e6b518` (4838) | 5 |
| `docs/HOST-REQUIREMENTS-2026-10-18.md` | `7ff6f94425d4842757116d20a0ee628c` (938) | `6c664872a8f13d298a790ed4e2ba4b8a` (938) | 3 |
| `docs/volumes/INDEX.md` | `1f988c2d9795d10fb8cb5a9ccaf06c5b` (261) | `73b3c664bd9e029021e9465256ade82d` (261) | 4 |
| `docs/volumes/SUMMARY.md` | `7de28faa4c5df1819d33063058523ae6` (245) | `abf4d7adaf0f904694becfb06e5020e0` (245) | 8 |
| `docs/volumes/V14-sites.md` | `1fcdce8e633db3b39322e3c3854cc99a` (3341) | unchanged | 0 |

`apply_x.py --live`: applied 20, already 0, of 20; no failure; new exactly once 20 / 20; old left outside its own new 0.
Machine copy: `apply-x-run.json`.

## 3. The fragments

Columns: stated line (the target before file x), landed (the line at its turn), final (the new text's first line in the
target as file x leaves it; V13's lines after 154 moved by 982 (a)'s 6 lines), the target's md5 before, ok.

| id | target | stated | landed | final | md5 | ok |
|---|---|---|---|---|---|---|
| 976 (a) | `docs/volumes/SUMMARY.md` | 136 | 136 | 136 | 7de28faa | ok |
| 977 (a) | `docs/volumes/INDEX.md` | 258 | 258 | 258 | 1f988c2d | ok |
| 978 (a) | `docs/volumes/SUMMARY.md` | 218 | 218 | 218 | 7de28faa | ok |
| 979 (a) | `docs/volumes/V13-world.md` | 4565 | 4565 | 4571 | 81b3a003 | ok |
| 979 (b) | `docs/volumes/V13-world.md` | 4566 | 4566 | 4572 | 81b3a003 | ok |
| 979 (c) | `docs/volumes/V13-world.md` | 4567 | 4567 | 4573 | 81b3a003 | ok |
| 980 (a) | `docs/HOST-REQUIREMENTS-2026-10-18.md` | 143 | 143 | 143 | 7ff6f944 | ok |
| 980 (b) | `docs/HOST-REQUIREMENTS-2026-10-18.md` | 146 | 146 | 146 | 7ff6f944 | ok |
| 981 (a) | `docs/volumes/V13-world.md` | 4213 | 4213 | 4219 | 81b3a003 | ok |
| 981 (b) | `docs/HOST-REQUIREMENTS-2026-10-18.md` | 717 | 717 | 717 | 7ff6f944 | ok |
| 981 (c) | `docs/volumes/INDEX.md` | 186 | 186 | 186 | 1f988c2d | ok |
| 981 (d) | `docs/volumes/INDEX.md` | 225 | 225 | 225 | 1f988c2d | ok |
| 981 (e) | `docs/volumes/SUMMARY.md` | 16 | 16 | 16 | 7de28faa | ok |
| 981 (f) | `docs/volumes/SUMMARY.md` | 173 | 173 | 173 | 7de28faa | ok |
| 981 (g) | `docs/volumes/SUMMARY.md` | 223 | 223 | 223 | 7de28faa | ok |
| 981 (h) | `docs/volumes/SUMMARY.md` | 228 | 228 | 228 | 7de28faa | ok |
| 981 (i) | `docs/volumes/SUMMARY.md` | 240 | 240 | 240 | 7de28faa | ok |
| 981 (j) | `docs/volumes/SUMMARY.md` | 241 | 241 | 241 | 7de28faa | ok |
| 982 (a) | `docs/volumes/V13-world.md` | 154 | 154 | 154 | 81b3a003 | ok |
| 982 (b) | `docs/volumes/INDEX.md` | 14 | 14 | 14 | 1f988c2d | ok |

## 4. After the apply

- Sweep of the five targets for "37–45", "37 to 45" and "455–620": left only where the text says "before file w"
  (V13:4007 §8.2, V13:4573 BCR-V13-37, HRQ:146, INDEX:258, SUMMARY:136, SUMMARY:218) and the price as put in V13 §11
  Q5 (V13:4676, history).
- Sweep for Q5 read as open ("pending your look", "open for the owner", "proceeds on its recommendation", "put to the
  owner in Q5 (vetoable)", "the product as proposed (recommended; vetoable)"): 0 hits in `docs/volumes/` and the host
  document.
- The host document's two V13 cites hold in the live V13: line 4001 is §8.2's M-W2 row, lines 4006–4007 the staged-row
  sentence ("39–47 pw (37–45 before file w, …").
- The clean room in the live V13: 0 for `way_known`, `way_rung`, `way_forgotten`, `settlementId`, `wayId`,
  `spatialLedgers`, `src/`; `research/sf` 2, both pre-existing (V13:37, :48).
- `docs/AMENDMENTS-2026-10-18x.md` written by `write_x.py` (227 lines, md5 `8c5cb0131014b8af953ad31fb3ab5fef`); its items from `## The items` to the
  end byte-identical to `draft-x.md`'s (20 569 characters).

## 5. The bundle

`python3 -I tools/bundle_architecture.py --check` before: `STALE` (exit 1; stale since file w). `python3 -I
tools/bundle_architecture.py`: "wrote docs/ARCHITECTURE-FULL.md: 81588 lines from 16 source(s)" (`bd69e9a6…` →
`bcc1640ee84f38ea0ce1398ad3cf9f7d`, 81 587 lines by `wc -l`). `--check` after: "UP TO DATE /home/user/maps-architecture/docs/ARCHITECTURE-FULL.md",
exit 0. The nine V13 and INDEX new texts each exactly once in the bundle (SUMMARY and the host document are not bundle
sources).

## 6. For the session

The base (`docs/ARCHITECTURE.md` §16, :21720, :21765, :21767, :21768, and :21675, :311) still reads the world at 37–45
and the totals 250.6–345.35 / 481.35–660.6; BCR-V13-37 now asks 39–47 (→ 252.6–347.35 / 483.35–662.6, the arithmetic
in file x's *For the session*); an application of BCR-V13-37 to the base as file o item 877 was, outside this lane's
targets. The ledger wants J421's carrying and this file's application; this lane does not edit `docs/PROGRESS.md`.
