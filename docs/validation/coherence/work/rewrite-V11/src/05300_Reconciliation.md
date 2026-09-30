## Reconciliation round 4 — continuation on the re-issued brief (volumes/reconcile-V11-r4, 2026-09-29 11:35)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V11-r4 (continuation); covered by the whole-design retrovalidation (J84).

The workflow re-issued this lane's brief with four issues the 07:32 landing did not hold: **SCC-R3C-2**, **SCC-R3C-4**
(majors) and **SCC-R3C-7**, **SCC-R3C-15** (minors), raised at 11:18–11:19 by `seam-content-calibration-r3.md`'s
continuation (§6.2). The 4 issues of the first landing (SCC-75, SCC-77 majors; SR3-03, SR3-07 minors) are history under
the resume rule: each anchor was found in the live text (md5 cd7e6c42… before this continuation) and nothing was redone —
SR3-07's milestone (V-M0 ships the `VG` preset file) now agrees with V07's landed text (J-V7.120), as the brief's note
anticipated. The four new issues: **4 FIXED, 0 INVALID, 0 on the fix list**. The pre-continuation text is kept at
`scratchpad/volumes/rcV11r4c/V11-pre-r4c.md`.

| id | severity | disposition | where |
|---|---|---|---|
| SCC-R3C-2 | major | FIXED as V01 states `NG` (V1-3.15, BCR-46, J-V1.98; its note (33)), narrower than the finding's default (vetoable, J-V11.88) — `PresetId` gains `'NG'`; `SourceCell.presets` gains `NG?`; `ext.over` gains no value (file f item 376's note); `NG` resolves a cell by its own entry, else as `MFCG` does, so it requires an entry on no cell; a `presets.NG` entry off `hood.constants` stops the compile; the off-form checks run under `NG` from V01's M5, the milestone whose content ships its entries; V11 writes no `NG` entry | §2.1 `presetsRequired`, §2.2 (`PresetId`, the source cell, the preset entries), §3.1 row 73, §3.2.1 step 4, §3.2.2, §8, T-V11-0, T-V11-9, W75, §2.10, J-V11.74's tail, J-V11.88, X-V11-16 |
| SCC-R3C-4 | major | FIXED — registry rows 90 `way.surface` (`way/surface.json`, `SurfaceRow`, rows home V1-3.7.3, readers S10a, S6 and EVO_DECLINE, owner `'V01'`, not calibratable) and 91 `squares.quota` (`squares/quota.json`, `SquareQuotaRow`, rows home V1-3.5.2, readers S7b, S2 and S9b, owner `'base'`, `perPreset` with `MFCG` and `FTG` entries and no `NG` entry, `haPer1000` and the kind factors calibratable); ninety-two catalogue rows; T-V11-1 (a) greps both; S2 and EVO_DECLINE and S6 wider than the finding (J-V11.89) | §3.1 rows 90–91 and the count, §6, §8 (C0, the readers paragraph), T-V11-1 (a), W76, §2.10, J-V11.89 |
| SCC-R3C-7 | minor | FIXED — (a) row 38's readers S10b, S11, EVO_DEPARTURES, EVO_SITING, EVO_GROWTH and `@plat/hood` (the base's capacity function, S11's entrance and basement-door cells, the relets, the close-up's reserve); (b) row 62's readers S0, S1, S2, S6, S7b, S7c, S8.seed, S9b, S11, S13a and the modules `@plat/hood`, `@plat/app`, `testkit.bench` (wider than the finding by V01's standalone and centrepiece reads), `S8.seed` chosen with a pre-decided move to `S8`; `fabric.select` dropped from row 62's ids (a stream concern, V1-3.12; V01's note (33)); (c) V11 §8's writer rule covers any change that makes a registered stage, phase or module read a table it did not read, a base change request's application included | §3.1 rows 38 and 62, §8, J-V11.90, X-V11-16 (d) |
| SCC-R3C-15 | minor | FIXED — the loader resolves every table under `VG` by §7.6's order, a categorical cell of a table no village stage reads resolving to its `MFCG` entry (the value V07 §3.15's rule gives), so a village's epochs read V06's tables at their parity values; the `VG` entry rule unchanged; the off-form check under `VG` spans every table; J-V11.77's "resolving no other table under `VG`" and its premise withdrawn; BCR-V11-31's new text amended (item 581, by note) | §2.1, §2.2, §3.2.1 step 4, §3.2.2, T-V11-9, BCR-V11-31, J-V11.77, J-V11.91 |

**Also in this continuation.** The round-4 continuation ledger's RF1–RF5; decisions J-V11.88 – J-V11.91 and the
amendments of J-V11.74 and J-V11.77; wiring rows W75 and W76; two §2.10 lifecycle rows (`NG`'s entries; rows 90–91);
X-V11-16; the §12 paragraph; the §13 preamble.

**Other volumes' halves.** V01: none needed — its round-4 continuation (live beside this one) already states `NG` in
§7.6's terms with its entries on `hood.constants` alone, BCR-46 and note (33), which this volume adopts as written, and
note (31)'s two tables are now rows 90–91. File f: SCC-R3C-15 amends BCR-V11-31, which item 581 carries — handed to the
live base-change lane by a lane-events note at 11:44 with the amended text (V01's BCR-46 is that lane's own new item). V12:
SCC-R3C-6 is V12's own half (`PresetArm` `'NG'`), nothing on V11's account. V03, V06: no change (X-V11-16 (d), (e)). No
other volume was edited by this continuation.

**Document checks** (`docs/validation/bench/doc_checks.py --doc … --heads docs/ARCHITECTURE.md`), before (the backup,
measured now: C3 306, S2 377, against 303 and 371 at round 3's continuation's landing — the checker reads every JSON
under `research/` and `captures/`, which parallel lanes change) → after this continuation: C1 0 → 0, C2 0 → 0, C4 0 → 0,
S1 0 → 0; C3 306 → 317 (the new hits digit runs of section and row numbers, the stand-in lines and ordinary phrasing —
"read is the one place", "where it has one the"; none a list, grammar or table) and S2 377 → 388 (this volume's own §2.10,
§3.11, §3.12 pointers and V07 §3.12, §3.15, which the base's headings do not hold). By script: every J-V11 (to
J-V11.91), W (to W76), X-V11 (to X-V11-16), T-V11 (38 rows, T-V11-0 – T-V11-37) and BCR-V11 (31) id cited is defined;
ninety-two catalogue rows in §3.1's table.

