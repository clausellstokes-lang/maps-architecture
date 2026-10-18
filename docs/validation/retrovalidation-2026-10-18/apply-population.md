# apply-population — the population family's corrections applied

Lane: `retrovalidation/apply-population` (opus; J390, Fable-checked). Source: `docs/validation/retrovalidation-2026-10-18/population.verdict.json`, read whole (verdict PASS-WITH-CORRECTIONS; 45 corrections: 43 research on `research/sf/population-system.md`, 1 research on `research/sf/lens-implications.md`, 1 design on `docs/volumes/V13-world.md`; no correction to `docs/PROGRESS.md`). No git command run; the host repository was not touched.

Family file: `research/sf/population-system.md` (the only file carrying the notice "> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat research/sf-population; ..."; repository-wide grep). Before: 1,091 lines, md5 `6c51fbb91a40090fa1015b2bb747216f` (copy kept at the scratchpad `retro/population-system.before.md`).

## Pre-check (every old fragment counted in the file before any write)

42 of the 43 population-file olds occur exactly once; every new occurs zero times. Correction #8 (C-4a) matched zero times — see Adjustments.

## Application log — `research/sf/population-system.md` (43 fragments + 1 notice line)

Applied in verdict order by exact-match replacement, each old asserted to occur exactly once in the file as it stood at that step (script `retro/apply_pop.py` in the scratchpad). After: 1,090 lines (C-4a and C-19d each join two lines, C-19e adds one), md5 `cb61abe983e271bf6fa0ebec412dd6f1`. Post-check (`retro/check_pop.py`): every new occurs exactly once; every old occurs zero times, or once only where the correction keeps it inside its new (C-9b, C-9d, C-22a–d, C-23 append a dated bracket). Every dated bracket the corrections carry ("[Fable-reviewed 2026-10-18: was …]" and the "RULED —" brackets) went in as written; no sentence lost its record.

| # in verdict | correction | kind | line after apply | result |
|---|---|---|---|---|
| 0 | C-1 | research | 219 | applied; old 1→0 (or kept inside new), new 0→1 |
| 1 | C-2a | research | 565 | applied; old 1→0 (or kept inside new), new 0→1 |
| 2 | C-2b | research | 567 | applied; old 1→0 (or kept inside new), new 0→1 |
| 3 | C-2c | research | 1019 | applied; old 1→0 (or kept inside new), new 0→1 |
| 4 | C-2d | research | 1023 | applied; old 1→0 (or kept inside new), new 0→1 |
| 5 | C-2e | research | 1066 | applied; old 1→0 (or kept inside new), new 0→1 |
| 6 | C-2f | research | 1078 | applied; old 1→0 (or kept inside new), new 0→1 |
| 7 | C-3 | research | 270 | applied; old 1→0 (or kept inside new), new 0→1 |
| 8 | C-4a | research | 140 | applied; old 1→0 (or kept inside new), new 0→1 — ADJUSTED (see below) |
| 9 | C-4b | research | 885 | applied; old 1→0 (or kept inside new), new 0→1 |
| 10 | C-5a | research | 173 | applied; old 1→0 (or kept inside new), new 0→1 |
| 11 | C-5b | research | 747 | applied; old 1→0 (or kept inside new), new 0→1 |
| 12 | C-5c | research | 931 | applied; old 1→0 (or kept inside new), new 0→1 |
| 13 | C-6a | research | 41 | applied; old 1→0 (or kept inside new), new 0→1 |
| 14 | C-6b | research | 379 | applied; old 1→0 (or kept inside new), new 0→1 |
| 15 | C-7 | research | 292 | applied; old 1→0 (or kept inside new), new 0→1 |
| 16 | C-8 | research | 797 | applied; old 1→0 (or kept inside new), new 0→1 |
| 17 | C-9a | research | 819 | applied; old 1→0 (or kept inside new), new 0→1 |
| 18 | C-9b | research | 820 | applied; old 1→0 (or kept inside new), new 0→1 |
| 19 | C-9c | research | 764 | applied; old 1→0 (or kept inside new), new 0→1 |
| 20 | C-9d | research | 940 | applied; old 1→0 (or kept inside new), new 0→1 |
| 21 | C-9e | research | 110 | applied; old 1→0 (or kept inside new), new 0→1 |
| 22 | C-10 | research | 862 | applied; old 1→0 (or kept inside new), new 0→1 |
| 23 | C-11 | research | 525 | applied; old 1→0 (or kept inside new), new 0→1 |
| 24 | C-12 | research | 986 | applied; old 1→0 (or kept inside new), new 0→1 |
| 25 | C-13 | research | 861 | applied; old 1→0 (or kept inside new), new 0→1 |
| 26 | C-14a | research | 394 | applied; old 1→0 (or kept inside new), new 0→1 |
| 27 | C-15 | research | 803 | applied; old 1→0 (or kept inside new), new 0→1 |
| 28 | C-16 | research | 1073 | applied; old 1→0 (or kept inside new), new 0→1 |
| 29 | C-17 | research | 425 | applied; old 1→0 (or kept inside new), new 0→1 |
| 30 | C-18 | research | 584 | applied; old 1→0 (or kept inside new), new 0→1 |
| 31 | C-19a | research | 117 | applied; old 1→0 (or kept inside new), new 0→1 |
| 32 | C-19b | research | 740 | applied; old 1→0 (or kept inside new), new 0→1 |
| 33 | C-19c | research | 743 | applied; old 1→0 (or kept inside new), new 0→1 |
| 34 | C-19d | research | 831 | applied; old 1→0 (or kept inside new), new 0→1 |
| 35 | C-19e | research | 673 | applied; old 1→0 (or kept inside new), new 0→1 |
| 36 | C-20 | research | 776 | applied; old 1→0 (or kept inside new), new 0→1 |
| 37 | C-21 | research | 45 | applied; old 1→0 (or kept inside new), new 0→1 |
| 38 | C-22a | research | 941 | applied; old 1→0 (or kept inside new), new 0→1 |
| 39 | C-22b | research | 943 | applied; old 1→0 (or kept inside new), new 0→1 |
| 40 | C-22c | research | 945 | applied; old 1→0 (or kept inside new), new 0→1 |
| 41 | C-22d | research | 949 | applied; old 1→0 (or kept inside new), new 0→1 |
| 42 | C-23 | research | 791 | applied; old 1→0 (or kept inside new), new 0→1 |

## Adjustments

- **#8 C-4a (F4) did not match as given.** The verdict JSON's old and new carry `<\tick>` (a backslash before `tick`, three times in the new, once in the old); the file reads `` `candidate.population.emigration.<origin>.<tick>` `` (line 141 before apply) and the validator's own record `population.md` row C-4a reads `<tick>` in both old and new. The backslash is an escape artifact of the JSON, not intended text. Re-read the passage (lines 136-145 before apply): the equivalent current text is the old with `<tick>`, occurring exactly once. Applied the intended correction with `<tick>` in old and new (the old's line break between "of the form" and the id kept as in the file; the new is one paragraph as written). Result: the new occurs once, the old zero times.

## Notice line

Line 3, the only line in the family beginning "> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat" (`research/sf/population-system.md`; a repository-wide grep finds the "research/sf-population" notice in no other file):

- was: `> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat research/sf-population; to be retrovalidated overall at the next opportunity (owner, 2026-10-17, J375)`
- now: `> Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — the conclusions hold; 18 verifier and 6 validator findings fixed by 45 fragments (lane retrovalidation/population; J392)`

The rest of the file is untouched beyond the 43 fragments (diff against the before copy: 93 removed-or-added lines, all inside the fragments and line 3).

## Corrections in the verdict that are not this lane's

- **#43 C-24 (V-6), kind research, `research/sf/lens-implications.md`** (line 34, the +S row: "no premium check was traced in its opener, mount or store write" → "no premium check of its own … premium-gated like the Living-World row (POP §7 legend as Fable-reviewed 2026-10-18)"). NOT APPLIED here: the file belongs to the lenses family, and this lane may edit no file but the population family's. The old was tested: it occurs exactly once in `lens-implications.md` (line 34) and `lenses.verdict.json` carries no correction touching that row (its 40 corrections, 38 of them on `lens-implications.md`, were checked for "premium", "SRD" and "store write"; none is on line 34), so the two do not conflict. The apply-lenses lane, which applies only `lenses.verdict.json`, will not pick it up either; it is **routed to the orchestrator / J392 for the lenses apply (or a follow-up) to apply**, so the finding does not drop.
- **#44 D-1 (V-1), kind design, `docs/volumes/V13-world.md`** (§5.9 (5) trend row). NOT APPLIED: kind "design" belongs to the design lane.
- **For J392 (docs/PROGRESS.md):** none — the verdict carries no correction to `docs/PROGRESS.md` (the validator: "no journal row is wrong").

## Bundle check

`python3 tools/bundle_architecture.py --check` → "UP TO DATE /home/user/maps-architecture/docs/ARCHITECTURE-FULL.md", exit 0. The bundle's sources are `docs/ARCHITECTURE.md`, `docs/volumes/INDEX.md` and `docs/volumes/V??-*.md` only, so this lane's file (under `research/sf/`) does not feed it; the check is recorded for completeness.

## Files changed by this lane

- `research/sf/population-system.md` — 43 fragments + 1 notice line (md5 6c51fbb9… → cb61abe9…; 1,091 → 1,090 lines).
- `docs/validation/retrovalidation-2026-10-18/apply-population.md` — this record.
- `docs/lane-events.log` — the LANDED line (append only).
