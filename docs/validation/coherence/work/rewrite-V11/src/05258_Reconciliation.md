## Reconciliation round 3 — continuation on the re-issued brief (volumes/reconcile-V11-r3, 2026-09-29 10:31)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V11-r3 (continuation); covered by the whole-design retrovalidation (J84).

The workflow re-issued this lane's brief with four issues the 06:25 landing did not hold: **SCC-R2C-2** (major) and
**SCC-R2C-8**, **SCC-R2C-9**, **SCC-R2C-10** (minors), raised at 10:10–10:12 by `seam-content-calibration-r2.md`'s
continuation (§7.2). The 8 issues of the first landing (SR2-05, SCC-51 majors; SR2-06, SCC-63, SCC-65, SCC-66, SCC-67,
SCC-72 minors) are history under the resume rule: each anchor was found in the live text (md5 8b4ca3f9… before this
continuation) and nothing was redone. The four new issues: **4 FIXED, 0 INVALID, 0 on the fix list**. The
pre-continuation text is kept at `scratchpad/volumes/rcV11r3c/V11-pre-r3c.md`.

| id | severity | disposition | where |
|---|---|---|---|
| SCC-R2C-2 | major | FIXED — registry row 63 holds V04's two dossier row sets, `dossier.sanitation` and `dossier.subterranean` (files `dossier/sanitation.json`, `dossier/subterranean.json`, which V04 writes `tables/dossier/…`; `owner` `'V04'`; row types V4 §2.3a's match rows); rows home adds V4 §2.3a (BCR-14's DR17); readers `port.digest` (DR17's creation and binding at door 1) and `@plat/app` (V09's why card); every column `calibratable: false`, as every dossier row set; T-V11-1 (a)'s grep covers the `tables/…` and `dossier/…` path forms and names the two | §3.1 row 63 and its paragraph, T-V11-1, W73, §2.10, J-V11.83, X-V11-15 (a) |
| SCC-R2C-8 | minor | FIXED — (a) V11 §8: the seat registering a stage **or an epoch participant** writes the id — for a participant its registered `stage` — into the readers of every table it reads, in the same change; a module reader is written by the seat landing the module's first read; (b) row 57 adds U-FADE (`under.extend`'s sewer derivation and extension); (c) row 61 adds S10b (`rules.race`, V07 W68); (d) rows 39 and 62 add the module reader `@plat/hood` (the neighbourhood close-up's entrance reserve and hood pins, V1-3.8.2), named in §3.1's *Readers* paragraph and §2.1's module list | §2.1, §3.1 rows 39, 57, 61, 62 and *Readers*, §8, J-V11.85, X-V11-15 (c), (d) |
| SCC-R2C-9 | minor | FIXED — V11 §2.1 states the empty-table rule: every registry row exists from C0 and ships its file as its schema's empty table until its rows-home milestone, the *status* column naming who writes the rows, not whether they have shipped; the compiler holds an empty table's `TotalityRule`s and invariants from its first row (wider than the finding, which a coverage rule over an unwritten table requires; vetoable); §3.1's preamble and §8's paragraph cite it and "(status `staged`)" is dropped | §2.1, §3.1's preamble, §8, §2.10, J-V11.84 |
| SCC-R2C-10 | minor | FIXED — `raisedWays.settings` gains `elevated.landmarkMinSignificance` 20 (`own; V08 J-V8.70, the castle's significance`; calibratable, entered by V12 §3.11's `raisedWays` settings line), typed in §2.8c; `landmarkFactor`'s text and §3.24.7 (4) count DR-V8.8's records by it; V08's half handed over (below) | §2.8c, §3.24.2, §3.24.7 (4), W50, W74, J-V11.86, X-V11-15 (b) |

**Also in this continuation.** The round-3 ledger's RE6–RE9; decisions J-V11.83 – J-V11.87; wiring rows W73, W74 and
W50's consumer; two §2.10 lifecycle rows (the empty table, V04's two row sets); X-V11-15; the §12 paragraph; the §13
preamble. Outside the brief, as the companion V07's open lane asked (its note of 10:40): **SCC-R2C-12's V11 half** — V11
§8's preset-entries paragraph names, after V-M0, the seat landing a change that makes a table village-read (V07's V-M2u)
or adds a `presetsRequired` column to a village-read table as the writer of the new cells' `presets.VG` entries, in the
same change (V07 §3.15 (3), J-V7.123; J-V11.87). And, as V08's landed continuation asked (its X19, note of 10:42):
registry row 63's list gains V08's new dossier row set **`customWeights`** (V08 §2.6, §3.11; J-V8.108), non-calibratable
like the row's others — a table outside the registry cannot load (V11 §2.1), the same defect SCC-R2C-2 closes.

**Other volumes' halves.** V04: SCC-R2C-2's half was applied by V04's own round-3 continuation (its note of 10:27; V4
§1b.1's cell reads "not calibratable"). V08: SCC-R2C-10's half (DR-V8.8 citing V11's cell) handed over to V08's open
round-3 continuation by a lane-events note at 10:38 with the exact text; that lane applied it (DR-V8.8, V08 §1b, T-V8-38,
J-V8.70; its note of 10:42) and landed at 10:44 (md5 594909a3…, read here after it landed). V07: SCC-R2C-12
is V07's own (its lane open, its V07 half written); row 61's S10b told to it by note. V01, V06: no change (X-V11-15 (d),
(e)). No other volume was edited by this continuation.

**Document checks** (`docs/validation/bench/doc_checks.py --doc … --heads docs/ARCHITECTURE.md`), before (the backup,
measured now: C3 295, S2 353, against 291 and 349 at round 2's continuation's landing — the checker reads every JSON under
`research/` and `captures/`, which parallel lanes change) → after this continuation: C1 0 → 0, C2 0 → 0, C4 0 → 0, S1 0 →
0; C3 295 → 303 (the new hits digit runs of section numbers — "2 1 3 1", V1-3.8.1–3.8.2 — a renumbered "in the table
below", the stand-in lines and ordinary phrasing — "are present in the live", "text is a hard coded"; none a list, grammar
or table) and S2 353 → 371 (this volume's own §2.10 and §3.11 pointers and V07 §3.15, V6 §3.16, §3.19, V08 §2.6, §3.11,
which the base's headings do not hold). No other volume was edited by this continuation.

