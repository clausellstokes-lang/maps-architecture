# Reading log — lane `m1/W-17-draft` (the digest seat), 2026-10-04

Every file this seat opened to draft the nine entries, with the extent read. Research-side files are named here by
their path because this log is itself a research-side record (`plat/CLEAN-ROOM.md` rule 2); it never crosses. Nothing
under `plat/` was written; the `plat/` files below were read only. No captured program bundle was opened, no site
touched, no benchmark run, no git command changed state.

## Plan, rulings, notes

| file | extent |
|---|---|
| `docs/calibration/M-1-work.json` | the W-17 row, `wave3`, the top-level keys |
| `docs/calibration/M-1-plan.md` | every line naming W-17, W-18, W-20, R-20 or the digest (section 1 D18, D33; section 2 rows W-12, W-16b, W-17, W-18, W-19, W-20); section 7 whole with 7b and 7c and section 8's head (lines 395–484) |
| `docs/calibration/M-1-plan-notes.md` | whole (sections 1–7) |
| `docs/calibration/M-1-rulings-1.md` | whole (R-01 … R-32, the DC table, sections 3–5) |
| `docs/calibration/M-1-rulings-2.md` | whole (R-33 … R-49, DC-31 … DC-36, sections 1–9) |
| `docs/calibration/results/W-12.json`, `W-15.json`, `W-16b.json` | status, outputs and notes |
| `docs/lane-events.log` | the lines naming W-17 (none before this lane) |

## The records E05–E16 (the inputs the row names)

| file | extent |
|---|---|
| `docs/calibration/E05-ftg-metrics.md` | sections 0–4 whole (lines 1–140); the headings of 5–11; every line naming the recorded CITY family, slots 24–25 or the non-default setting (sections 9.1, 9.6, 9.11) |
| `docs/calibration/E06-ftg-faces.md` | the headings; section 8 (the market squares) |
| `docs/calibration/E07-mfcg-signature.md` | whole (sections 0–10, with 9.1–9.8) |
| `docs/calibration/E08-mfcg-renders.md` | the headings; section 3 (the three measures as built) |
| `docs/calibration/E09-mfcg-derived-graph.md` | whole (sections 0–11) |
| `docs/calibration/E10-ng-bentcut-faces.md` | whole (sections 0–9, with 9.1–9.11) |
| `docs/calibration/E11-ng-rows.md` | whole (sections 0–10, with 10.1–10.11) |
| `docs/calibration/E12-depth-refit.md` | whole (Part I sections 0–10, Part II sections 11–17, the appendix script included) |
| `docs/calibration/E14-spike-derived-graph.md` | whole (sections 0–10) |
| `docs/calibration/E15-baselines.md` | whole (sections 0–12) |
| `docs/calibration/E16-denylist.md` | the headings; section 3; sections 9.3 and 9.7 |
| `research/baselines/candidates/baselines.json` | the rows the entries cite, queried by id (values, roles, notes, samples); the pins; the metric-version and scale sets |
| `research/baselines/plan.json` | the FTG slots 12 and 24–27 (label, water, capture stamp) |

## The findings (the P-ids and the creators' stated ideas)

| file | extent |
|---|---|
| `research/findings/code-impact.md` | whole (sections a–d and the review note); only the P-ids and their behaviours in our words were taken, never a class name |
| `research/findings/vg-ng-devlogs.md` | the lines matched by a search for the bent cut, fillets, courtyards and lanes; section B2.1–B2.3 whole (lines 736–850) |
| `research/findings/mfcg-devlogs-a.md` | the lines matched by a search for courtyards, orientation and alleys; section 2.5–2.6 (lines 238–268) |
| `research/findings/mfcg-posts-b.md` | the lines matched by the same search; lines 60–70, 90–125, 176–200, 241–258 (the road classes, the bent bisection, the block morphology, the alleys view) |
| `research/findings/ftg-docs-params.md` | the lines matched by a search for the road segment length, the size presets and the population ladder (lines 10, 64–85, 120–142, 178, 280–296, 617, 648) |

## The design and the volume (section references and definitions)

| file | extent |
|---|---|
| `docs/ARCHITECTURE.md` | the heading list; §17.1 (1)–(5) whole; §13.5's head and the `Baseline` interface; §4.6's lines naming the stop test, `cut.flattenM`, the deep-interior rule and the default shares (the deep-interior paragraph whole); §4.7's band table; §4.4's regime table rows naming the floors; every line of the document naming the digest (a search) |
| `docs/volumes/V12-calibration.md` | the paragraph 3.4.1 (the two derived features) and the catalogue rows of `junction.*`, `bldg.r4.*`, `sgd.*`, `blockc.*`, `block.courtShare`, `cut.*` and `variety.dispersion` (a search) |

## `plat/` (read only; the digest's destination and its rules)

| file | extent |
|---|---|
| `plat/CLEAN-ROOM.md` | section 1 whole; section 2's head and the first eleven ledger rows (truncated); sections 2a, 3 and 4 |
| `plat/docs/digest/README.md` | whole |
| `plat/docs/build/M0.md` | lines 150–220: (b), (c) and the head of (d), with their AFTER-M-1 clauses; every line naming the digest (a search) |
| `plat/docs/build/M0-work.json` | `afterM1Needs` whole |
| `plat/docs/build/choices.md` | rows C-0018, C-0071, C-0092, C-0101, C-0120 (each truncated at 1 200 characters) |

## Tools (read to run them)

| file | extent |
|---|---|
| `docs/validation/bench/doc_checks.py` | whole |
| `research/baselines/make_denylist.py` | the usage header, the `scan` entry points and the spell class (a search) |

## Not read

The captured program bundles; `captures/` beyond the row ids and slot stamps `plan.json` carries; the critic files;
`research/findings/code-*.md` beyond `code-impact.md`; the profile findings; E01–E04, E13, E20 (outside the row's
inputs; their results reach this lane through E15 and the rulings).
