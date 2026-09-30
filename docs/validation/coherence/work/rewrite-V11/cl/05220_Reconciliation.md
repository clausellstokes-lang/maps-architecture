## Reconciliation round 2 — continuation on the re-issued brief (volumes/reconcile-V11-r2, 2026-09-29 09:21)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V11-r2 (continuation); covered by the whole-design retrovalidation (J84).

The workflow re-issued this lane's brief with two issues the 05:09 landing did not hold: **SCC-R1C-1** and **SCC-R1C-3**
(majors), raised at 09:12 by `seam-content-calibration-r1.md`'s continuation (§7.2). The 13 issues of the first landing are history under
the resume rule: each anchor was found in the live text (md5 79d485df… before this continuation) and nothing was redone.
The two new issues: **2 FIXED, 0 INVALID, 0 on the fix list**. The pre-continuation text is kept at
`scratchpad/volumes/rcV11r2c/V11-pre-r2c.md`.

| id | severity | disposition | where |
|---|---|---|---|
| SCC-R1C-1 | major | FIXED — every stage and epoch-phase reader in the registry is named by its StageId, a module id only for a reader outside the stage graph (V11 §2.1's `readers` comment, §3.1's *Readers* paragraph); row 39 reads S11 (V02's `outline()`) with the wings rung as a lazy module reader; row 60 all fifteen `EVO_*` ids; row 61 the village stages and the epoch phases reading V07 §3.12's rows; rows 7, 17, 24, 46, 58a, 67, 78, 80, 82, 85 — and, for the class, rows 3, 5, 9, 14, 15, 18–20, 23, 25, 28, 32, 36–38, 40, 43, 44, 47–52, 55–59, 68–71, 79, 81, 83, 84 — name their readers by StageId (the `EVO_*` phases, V04's `U-*` stages with `U-FADE` for its epoch participants, V05's `SKY`, V07's `VS3`); the source manifest gains `stageIds` and the dist manifest `stageReaders`, the compiler refusing a reader that is neither a StageId nor a module id (V11 §3.2.1 steps 1, 6, 7), the village-read test reading StageIds only (step 4); T-V11-1 (b) records each stage's reads in the integration suite and fails an unlisted reader | §2.1, §3.1, V11 §3.2.1, T-V11-1, W4, W71, V11 §2.10, §8, J-V11.80, X-V11-14 |
| SCC-R1C-3 | major | FIXED — registry rows 86–89: `toolkit` (`toolkit.json`, V09 §2.3), `messages` (`messages/<locale>.json`, V09 §2.9), `clerk.ops` and `clerk.content` (`clerk/ops.json`, `clerk/content.json`, V10 §2.10), each `parity: 'untouched'`, `packPatchable: false`, with the layers their owners state; `TableSchema.owner` gains `'V09'` and `'V10'`; the count reads ninety from `REGISTRY`; every column of the four is `calibratable: false` — wider than the finding's texts and word lists, because no corpus of drawn maps measures any of them and V12's lint would otherwise demand a method (J-V11.81; vetoable); T-V11-1 (a) greps for their file names and T-V11-37 holds them non-calibratable | §2.1, §3.1, T-V11-1, T-V11-37, W72, V11 §2.10, §8, J-V11.81, J-V11.82, X-V11-14 |

**Also in this continuation.** The round-2 ledger's RD5–RD7; the performance row's catalogue count (90); C0's estimate
(+0.25 pw, the reader lists and the recorded-read suite) and the total (12.25–17.0 pw); the §12 paragraph; the §13
preamble. Outside the brief, as a companion V12's landed continuation asks of V11 (X-V12-15; its note of 09:39):
V11 §8's T16-4 and T-V11-30 registrations write each setting's `preset` `'default'` (V12 §2.1's `PresetArm`) — two
phrases, since no V11 lane carries SCC-R1C-5 and the field is otherwise left bare.

**Other volumes' halves.** V10 (its round-2 continuation landed 09:33, md5 5f29725e… confirmed): SCC-R1C-3's half
applied — V10 §2.10's default-rows heading and V10 §3.3's lexicon heading, each marked "V11's round 2 (continuation),
SCC-R1C-3"; backup `scratchpad/volumes/rcV11r2c/V10-before-rcV11r2c.md`. V12 (its round-2 continuation, for SCC-R1C-2
and SCC-R1C-5, was open from 09:27): SCC-R1C-1's half handed over by a lane-events note at 09:38 with the exact text; that
lane landed at 09:39 without it (V12 md5 1d568dff… confirmed), so this lane applied it after the LANDED line, as the note
said — V12 §3.7.2 (4) and V12 §3.7.7, each marked "V11's round 2 (continuation), SCC-R1C-1"; backup
`scratchpad/volumes/rcV11r2c/V12-before-rcV11r2c.md`. V09: no change (X-V11-14 (e)). V04 and V07: the participants' `stage`
values requested by X-V11-14 (a), (b); no lane of theirs is open and no edit was made there.

**Document checks** (`docs/validation/bench/doc_checks.py --doc … --heads docs/ARCHITECTURE.md`), before → after this
continuation: V11 C1 0 → 0, C2 0 → 0, C4 0 → 0, S1 0 → 0; C3 255 → 291 (the new hits digit runs of section numbers, the
stand-in line and ordinary phrasing — "so it must be data", "the union of the stage", "and the two files are"; none a list,
grammar or table) and S2 305 → 349 (volume pointers — V06 §2.12, V06 §3.16, V09 §2.3, §2.9, V09 §4.20, V10 §2.10, §3.3, V02 §3.1 —
which the base's headings do not hold). V10 and V12 unchanged in every count by their two edits each (V10 C3 232, S2 312,
C4 1 as before; V12 C1 8 reviewed, C3 170, S2 123 as before).

