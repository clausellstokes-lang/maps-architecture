# What M1 needs from M-1 — the implementer half

Written 2026-10-05 by filler lane `filler/m1-needs-from-m-1` (implementer side, clean room). This is an inventory, not
design (J156 (1)): where it and the design differ, the design governs. No design is added here.

## What was read

- `docs/build-prep/M1/scope.json` (twin `scope.md`): the 14 clauses marked `needs-M-1` and their `m1Needs`.
- `docs/ARCHITECTURE.md` §13.5 (the B-REF table and the ⟨M-1⟩ rule), §13.6 (2) (the D-5 inputs), §16's M-1 and M1 rows,
  §17.1 (4)–(5) (the crossing files and the content scan), §8.2's *Palette targets* (item 69).
- `docs/volumes/V12-calibration.md` §8.2 (the W-steps), which M1 builds a share of (W2, W7).
- The `plat/` **working copy** (not HEAD; no git was run): `plat/packages/testkit/baselines/README.md` and
  `crossings.json`. No `docs/calibration/`, `docs/validation/`, `research/`, `captures/` or `reference/` file was opened;
  the E-ids below are cited from §13.5's cells for traceability only.

## The M-1 deliverables these needs name

The scope inventory names files (`baselines.json`, `ng-faces.json`, `denylist.json`, `ftg-captures.json`,
`known-defects.json`) and measurements, **not W-ids**: no `W-` id appears in `scope.json`, `scope.md` or §16. The only
W-step the design places at M-1 is **V12 §8.2 W1** (the capture plan and the crossing); the other deliverables are named
in §16's M-1 row or §17.1. The column "M-1 deliverable" below therefore gives the §16 / §17.1 name and, where one
exists, the V12 step.

| key | M-1 deliverable | where the design names it | lands in `plat/` as |
|---|---|---|---|
| D1 | `baselines.json`: every §13.5 row with provenance, bands by the band rule, generated research-side and crossed | §16 M-1 (content and exit); §13.5; §17.1 (4); V12 W1 ("the M-1 metric scripts for every ⟨M-1⟩ and baseline row … the pins and the first `CrossingRecord`") | `plat/packages/testkit/baselines/baselines.json` + a `crossings.json` record |
| D2 | the MFCG sweep, ten seeds per matched size (40 / 80 / 130), plain plus river-and-coast | §16 M-1; V12 W1 ("MFCG at ten seeds per matched size plus five stress seeds") | rows of D1 |
| D3 | street-edge recoverability implemented research-side, cross-checked against the product's on M1's golden renders within 0.01 | §16 M-1; V12 W1's metric scripts | a row of D1; the cross-check itself runs at M1 |
| D4 | the variety dispersions of MFCG and FTG | §16 M-1 | rows of D1 |
| D5 | the FTG captures, programmes 1 and 2 (28 slots), each capture's id, `WaterSetting` and recorded population in its README | §16 M-1; §13.6 (2) | not directly: at M1 the research-side panel script writes `plat/goldens/d5/M1/ftg-captures.json` from these records |
| D6 | `ng-faces.json`: NG's recorded hood outlines and faces with per-cut records | §17.1 (4) ("M-1 adds one file of measured geometry") | `plat/packages/testkit/baselines/ng-faces.json` |
| D7 | the hashed content deny-list | §16 M-1; §17.1 (5) | `plat/packages/testkit/baselines/denylist.json` (the `plat/` name, C-0101; the design names no file) |
| D8 | the ⟨M-1⟩ statement: which ⟨M-1⟩ cells M-1 could not measure, made descriptive with a reason | §16 M-1 exit; §13.5's ⟨M-1⟩ rule | `known-defects.json` entries (M1 clause 120 writes the file) |
| D9 | the plot-depth rows and regime block-depth minimums re-fitted (item 34; J-A34.01) | §16 M-1; §13.5's blocks row (E12) | rows the blocks band reads; with D1 |
| D10 | the sanitised implementer digest and `CLEAN-ROOM.md`'s seat ledger | §16 M-1; §17.1 | `plat/docs/digest/` |

State as read (working copy, 2026-10-05 04:18): `plat/packages/testkit/baselines/` holds `README.md` and
`crossings.json`, which is `[]`; no `baselines.json`, `ng-faces.json` or `denylist.json` is there, and
`plat/goldens/d5/` does not exist. §13.5 says M-1 recomputed the baselines on 2026-10-04 (E15), so the measurement
exists research-side; the M1 needs below wait on the **crossing**, not the measurement (the scope inventory's
discrepancy 5). D10 is no clause's `m1Needs` and is listed for completeness only.

## The needs, by §13.5 row

Each §13.5 row an M1 `needs-M-1` clause reads, the clause numbers (`scope.json` `n`), and the deliverable. A row
marked ⟨M-1⟩ in §13.5 holds at least one cell that falls under the ⟨M-1⟩ rule (D8): if M-1 could not measure it, the
cell is descriptive and the clause reads it as *reported*, not *pass*.

| §13.5 row | ⟨M-1⟩ cells | class | M1 clauses that use it | M-1 deliverable |
|---|---|---|---|---|
| street turning | 1 (FTG turning per 100 m, E15) | P | 66 (no turn cliff), 79, 120, 122 | D1 (FTG rows from D5's captures) |
| junction arm angles and degrees | 0 | P | 66 (junction-degree distribution), 79, 122 | D1 |
| MFCG street signature | 1 (T / Y share, dead ends, blocks per ha, lots per block) | P | 66, 79, 117 (R4, wall alignment, lots per block), 120, 122 | D1 + D2 |
| blocks | 1 (NG block counts per template, E15) | P | 66 (block-area distribution), 79, 120, 122, 130 | D1, D6, D9 |
| deep block interiors | 2 (NG court share; MFCG inner-lot removal) | P | 79, 120, 122 | D1 + D2 |
| bent-cut signature | 1 (NG cut lengths, E15) | P | 79, 120, 122, 130 (σ, corner, arrival, fillet share, cut-length KS) | D1, D6 |
| figure-ground and streetwall | 2 (MFCG recoverability; MFCG streetwall continuity) | O | 53 (recoverability cross-check ≤ 0.01), 69 (figure-ground against MFCG's recoverability), 79, 120, 122 | D1, D2, D3 |
| walled share and ribbons | 0 | P | 72, 79, 122 | D1 + D2 |
| MFCG anchors | 0 | P | 69 (city-zoom quarter labels at MFCG's count), 79, 122 | D1 + D2 |
| labels | 0 | O | 69 (label counts read the anchors row) | D1 + D2 (through the anchors row) |
| between-seed variety | 2 (MFCG and FTG dispersions) | O | 73, 79, 120, 122 | D1 + D4 |
| markets | 1 (MFCG 0 secondary markets, E07) | P | 79, 120, 122 | D1 |
| wealth bands | 1 (FTG lifestyle tiers, descriptive) | P | 79, 120, 122 | D1 |
| every other row with a `baselines.json` reference (street runs, plots and footprints, party walls, plot-area gradient, outline anisotropy, towers and gates, water, tree scatter, population, generation time, draw style) | 0 | — | 79, 95, 122 (the whole report, and the parity-preset runs) | D1 |
| rows with no reference number (growth drift, entrance rule, alleys, vacancy runs, quays, ladder use, hidden plots' default, …) | 0 | C / O | none: no M-1 need | — |
| Fantasy Manor rows | 0 | P | none at M1 (stage 3, M6) | — |

## The needs, by M1 clause

The 14 `needs-M-1` clauses, with the §13.5 row (or the section that holds the need where it is not a §13.5 row).

| n | M1 clause (short) | §13.5 row(s) | needs (scope inventory) | M-1 deliverable |
|---|---|---|---|---|
| 36 | M1 content authored fresh (roster, grammar, word lists, era table, `ink` palette) | none — §17.1 (5)'s content scan | `denylist.json` for the PR scan that judges it (0 hits) | D7 |
| 53 | V12 W2's M-1 metric rows' product side, recoverability cross-checked within 0.01 | figure-ground and streetwall; the product side of every M-1 metric row (`street.detour` … `draw.hairline`) | the M-1 metric scripts and `baselines.json` | D1, D3 (V12 W1) |
| 62 | D-5's first run (diagnostic) with its threshold panel | none — §13.6 (1), (2) | `ftg-captures.json`; the research-side panel script's MFCG renders | D5 (the MFCG renders are made at M1 by formula; they are not an M-1 output) |
| 66 | fusion gate re-run on river, coast and relief, with its fallbacks | blocks; junction arm angles and degrees; MFCG street signature; street turning (no cliff) — the rows §16 M0 (c) names | `baselines.json` NG bands and MFCG street-signature rows; `ng-faces.json` for the slope-class fallback | D1, D2, D6, D9 |
| 69 | figure-ground against MFCG's M-1 recoverability; quarter labels at MFCG's count | figure-ground and streetwall; MFCG anchors; labels | MFCG recoverability baseline; MFCG quarter-label count rows | D1, D2, D3 |
| 72 | walled share and extramural ribbon share in MFCG's band | walled share and ribbons | `baselines.json` MFCG sweep rows | D1, D2 |
| 73 | between-seed dispersion against MFCG's and FTG's | between-seed variety | the variety dispersions | D1, D4 |
| 79 | the parity report by the band rule (`plat/goldens/parity/M1.json`) | every row with a baseline | `baselines.json` crossed into `plat/` | D1 (its `CrossingRecord`), D8 |
| 95 | V12 W2's exit (T-V12-1 – 7, 16 – 20, 22, 32's MFCG clauses, 51); panel sat or *provisional* | every crossed row (T-V12-32's MFCG clauses not resolved to rows by this seat) | crossed `baselines.json` and `ftg-captures.json` | D1, D5 (V12 W1's crossing) |
| 117 | MFCG street-signature rows that measure lots (R4, wall alignment as gates; lots per block) | MFCG street signature | `baselines.json` MFCG street-signature rows | D1, D2 |
| 120 | `known-defects.json` for the descriptive ⟨M-1⟩ cells | the 9 rows above with ⟨M-1⟩ cells (12 cells) | M-1's statement of the cells it could not measure | D8 |
| 121 | the PR tier's budget with the deny-list scan inside it | none — §13.8, §17.1 (5) | `denylist.json` | D7 |
| 122 | the nightly parity report inside a timed `tier:nightly` | every row with a baseline, plus one run per parity preset | `baselines.json` | D1 |
| 130 | the bent-cut signature bars re-run on B-CITY's districts | bent-cut signature; blocks | `baselines.json`; `ng-faces.json` | D1, D6, D9 |

## Item 69's corpus targets — need a corpus not on this machine

Item 69's clauses (scope `n` 44, the `ink` palette with its measurement code, and `n` 94, the palette inside its corpus
targets on the measurement render) are **not** `needs-M-1`: the bands are figures inside §8.2's table, and the program
reads no corpus file. What they cannot do on this machine is anything that needs the corpus itself: a definitional
mismatch between our measure and the corpus's own instrument is re-signed at the reconciliation stage (§13.9, M-CAL),
never by opening the corpus earlier. **Marked: corpus not on this machine** (the task's statement; this seat did not
look and may not). M1 can build and judge both clauses against §8.2's bands; it cannot confirm the bands' definitions
against the corpus. M-1 supplies nothing to either.

## Notes

- `ftg-captures.json` (clauses 62, 95) is not an M-1 file: §13.6 (2) has the research-side panel script write it at
  each D-5 milestone, from the capture ids, water settings and resident counts M-1 records (D5). Clause 62's need is
  M-1's records plus an M1-time research-side write.
- The deny-list has no file name in the design; `denylist.json` is the name `plat/` gave it (C-0101, the baselines
  README).
- No `needs-M-1` clause reads D10 (the digest); the implementer seats read it, so it gates M1's work rather than any
  one clause.
