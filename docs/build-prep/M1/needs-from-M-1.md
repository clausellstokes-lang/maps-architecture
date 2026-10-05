# What M1 needs from M-1 — the implementer half

Written 2026-10-05 by lane `filler/m1-needs-from-m-1` (implementer-side, clean room). **An inventory, not design**
(J156 (1)): it cross-references what the design already says and adds no rule, band or mechanism. Where it and the
design differ, the design governs.

**Read:** `docs/build-prep/M1/scope.json` (its 14 `needs-M-1` clauses and every clause's `m1Needs`), `docs/build-prep/M1/scope.md`,
`docs/ARCHITECTURE.md` §13.5 (whole), §16's M-1 and M1 rows, §17.1 (4)–(5), §8.2's palette targets; `docs/volumes/INDEX.md`;
`docs/volumes/V12-calibration.md` §8.1–§8.2; the plat/ working copy (a file search inside `plat/` only). No research,
reference, capture, calibration, validation or `docs/design/` path was opened; the M-1 experiment records the design
cites (E05, E10–E12, E15, E20) are named for traceability only and were not followed. **Clean-room note:** one `ls`
of `docs/` (file names only, nothing opened) was run at the start of this lane before the CLEAN_ROOM constant's
"never ls from docs/" line was read; it is recorded here, not hidden.

## 1. The W-ids

V12 §8.2 gives M-1 one step, **W1 — the capture plan and the crossing** (the seed families' twin, the capture plan, the
MFCG ten-seed sweep plus five stress seeds, the adapters, the M-1 metric scripts for every ⟨M-1⟩ and baseline row, the
cross-check, the pins and the first `CrossingRecord`; exit: every §13.5 baseline row present by the ⟨M-1⟩ rule). The
other M-1 deliverables sit only in §16's M-1 row and have no W-id: the FTG capture programmes, the sanitised digest, the
hashed deny-list, `CLEAN-ROOM.md`'s seat ledger and the plot-depth re-fit. The scope inventory names each deliverable by
its file or measurement, not by W-id; the W-id column below is this lane's mapping to V12 §8.2 and §16, labelled so.

M1's own side of the same rig is **W2** (M1); every need below is consumed by a W2 part or an M1 exit, never produced by it.

## 2. The needs, one row per (M1 clause, M-1 deliverable)

Clause numbers are `scope.json`'s `n`. "§13.5 row" names the row of §13.5's table the clause reads; "—" means the need
is not a §13.5 row (a clean-room or panel file).

| M1 clause (n) | what the clause does | §13.5 row(s) it reads | M-1 deliverable (scope inventory's words) | W-id / design home |
|---|---|---|---|---|
| 36 | M1 content authored fresh (roster rows, households, naming grammar and word lists, era table, `ink` palette; V11 C1) — judged by 0 deny-list hits | — | `denylist.json` | §16 M-1 "the hashed content deny-list"; §17.1 (5); no W-id |
| 53 | V12 W2's M-1 metric rows' product side (`street.detour` … `draw.hairline`); recoverability cross-checked against the research-side implementation within 0.01 on M1's golden renders | every row carrying an M-1 measurement; the cross-check is the figure-ground and streetwall row | the M-1 metric scripts and their measured rows (`baselines.json`) | W1 (the M-1 metric scripts); §16 M-1 (recoverability implemented research-side) |
| 62 | D-5 first run (diagnostic, all three rungs) with its threshold panel; MFCG pairs by formula, FTG one pair per panel capture | — (§13.6 (1), (2)) | `ftg-captures.json` (numbers-only, from the FTG programmes); the research-side panel script's MFCG renders | §16 M-1 FTG programmes 1 and 2; W1 (capture plan); file path per §17.1 (4): `plat/goldens/d5/⟨milestone⟩/` |
| 66 | Fusion gate re-run on B-CITY-lite's river, coast and relief configurations; statistics fallback: a slope class calibrated on NG's faces | junction arm angles and degrees (NG 4-way share); blocks; bent-cut signature; MFCG street signature | `baselines.json` NG bands and MFCG street-signature rows; `ng-faces.json` | W1; `ng-faces.json` per §17.1 (4) into `plat/packages/testkit/baselines/`; §16 M-1 depth re-fit (item 34) behind the blocks row |
| 69 | Figure-ground metrics against MFCG's M-1 recoverability; contrast matrix; `ink` census; label floors and counts (quarter labels at MFCG's count); hairline fidelity | figure-ground and streetwall (recoverability ⟨M-1⟩); MFCG anchors (district / quarter count); labels (its count clause reads the anchors row) | MFCG street-edge recoverability baseline; MFCG quarter-label count rows | W1 (MFCG sweep, ten seeds per matched size) |
| 72 | Walled share and extramural ribbon share in MFCG's band | walled share and ribbons | `baselines.json` rows (MFCG sweep, walled and ribbon shares) | W1 |
| 73 | Between-seed dispersion against MFCG's and FTG's | between-seed variety (⟨M-1⟩ on both references) | the variety dispersions of MFCG and FTG | W1; §16 M-1 "the variety dispersions of MFCG and FTG" |
| 79 | Parity report by the band rule (`plat/goldens/parity/M1.json`) | every row M1 measures | `baselines.json` committed into `plat/` | W1 (the crossing and first `CrossingRecord`) |
| 95 | V12 W2's exit: T-V12-1 – 7, 16 – 20, 22, T-V12-32's MFCG clauses, T-V12-51; M1 panel sat or *provisional — not rated* | every row the T-V12 bars read | crossed numbers-only files (`baselines.json`, `ftg-captures.json`) | W1 (crossing); §16 M-1 FTG programmes |
| 117 | MFCG street-signature rows that measure lots: R4 and wall alignment as gates; lots per block (staged from M0, C-0072) | MFCG street signature (lots per block ⟨M-1⟩) | `baselines.json` MFCG street-signature rows | W1 |
| 120 | `known-defects.json` for the descriptive ⟨M-1⟩ cells (staged from M0, C-0116) | every ⟨M-1⟩ cell (list in §3) | M-1's statement of which ⟨M-1⟩ cells it could not measure | W1's exit ("every §13.5 baseline row present by the ⟨M-1⟩ rule"); §16 M-1's exit |
| 121 | PR tier's budget with the deny-list scan inside it, first timed at M1 (staged from M0, C-0121) | — | `denylist.json` | §16 M-1; §17.1 (5); no W-id |
| 122 | Nightly parity report inside a timed `tier:nightly` (staged from M0, C-0102, C-0121) | every row the nightly run reports | `baselines.json` | W1 |
| 130 | Bent-cut signature bars re-run on B-CITY's districts (M0-b-04, M0-b-05, M0-b-05a/b) | bent-cut signature (σ, bend, corner, arrival, fillet share; cut lengths ⟨M-1⟩); blocks | `baselines.json`; `ng-faces.json` (M0-b-05a/b read both) | W1; §17.1 (4) |

No clause outside these 14 carries a non-empty `m1Needs` in `scope.json` (checked by script over all 132 clauses).

## 3. §13.5's rows from the other side

The ⟨M-1⟩ cells of §13.5 (measured by M-1; descriptive and entered in `known-defects.json` if M-1 could not measure
them — clause 120) and the M1 clauses that read each. Rows without an ⟨M-1⟩ mark that still cite an M-1 measurement
reach M1 through `baselines.json` in clauses 79 and 122 only, unless named here.

| §13.5 row | ⟨M-1⟩ cell(s) | M1 clauses that read it |
|---|---|---|
| street turning | FTG median turning per 100 m after 10 m resampling | 79, 122 (parity); 53 (metric product side) |
| junction arm angles and degrees | — (NG 4-way share is an M-1 row, unmarked) | 66, 79, 122 |
| MFCG street signature | T / Y share, intramural dead ends, blocks per ha, lots per block | 66, 117, 79, 122 |
| blocks | NG block counts per template at `medium` | 66, 130, 79, 122 |
| deep block interiors | NG hollow-block frequency; MFCG inner-lot removal | 79, 122 |
| bent-cut signature | NG cut lengths per face | 130, 66, 79, 122 |
| figure-ground and streetwall | MFCG recoverability; MFCG streetwall continuity | 69, 53 (cross-check within 0.01), 79, 122 |
| walled share and ribbons | — (M-1 ten-seed rows, unmarked) | 72, 79, 122 |
| MFCG anchors | — (M-1 ten-seed rows, unmarked) | 69 (quarter-label count), 79, 122 |
| between-seed variety | MFCG and FTG dispersions | 73, 79, 122 |
| markets | MFCG 0 secondary markets (E07) | 79, 122 |
| wealth bands | FTG six-tier distribution (descriptive) | 79, 122 (reported only) |
| every ⟨M-1⟩ cell above | — | 120 (which cells became descriptive) |

## 4. Item 69's corpus targets — not an M-1 need, and the corpus is not on this machine

Clauses 44 ("the `ink` palette on the owner-opened corpus targets with its measurement code") and 94 ("the `ink`
palette inside its corpus targets on the measurement render") are `specifiable-now` in the scope inventory and need
nothing from M-1: §8.2's palette-target table carries the bands as figures inside the design (paper luma 226–244,
warmth 20–50 pinned at 36, darkest-0.5 % luma ≤ 45, ink warmth 15–25, plate chroma 18–70 with `ink` 20–30), and the
program reads no corpus file for them. **Marked: any measurement of these targets against the historical corpus itself
— the corpus the bands were measured from, and M-CAL's "palette re-check" (V12 §8.2) — needs a corpus that is not on
this machine.** That status is taken from this lane's brief and was not verified here (verifying it would mean searching
outside `plat/`, which the clean room forbids). M1's checks on these targets measure our own render against the
design's numbers and need no corpus.

## 5. What plat/ holds today (working copy, 2026-10-05, read by a file search inside `plat/` only)

The 14 needs-M-1 clauses wait on the **crossing**, not the measurement (the scope inventory's discrepancy line; §13.5
says M-1 recomputed the baselines on 2026-10-04). Observed in the working copy, not at HEAD (no git was run):

- `plat/packages/testkit/baselines/` holds `README.md` and `crossings.json`, whose content is `[]` — no `baselines.json`,
  no `ng-faces.json`, no `CrossingRecord`.
- No `denylist.json` exists under `plat/` except the test fixture `plat/bench/test/baselines-check/fixtures/deny/denylist.json`;
  every `baselines.json` under `plat/` is a test fixture under `plat/bench/test/`.
- No `ftg-captures.json` was found; `plat/goldens/` does not exist yet.
- `plat/docs/digest/` holds only `README.md` (the sanitised digest has not crossed).
- `plat/CLEAN-ROOM.md` exists (its ledger was not read for this note).

So every row of §2 is open on the crossing today; the run `wf_8f7c7489-304` was in flight when read, and this snapshot
can go stale.
