# Retrovalidation 2026-10-18 — confirm-scripts

Lane: retrovalidation/confirm-scripts (fable; J392). Fable 5.1, the confirming check under J390 over the apply lane
retrovalidation/apply-scripts (opus; J390, Fable-checked). Started 2026-10-18 05:43 UTC. Scratch:
`/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/retro/confirm-scripts/`
(`check.py`, `check.out`, `diff-U0.txt`).

## Verdict on apply-scripts: PASS

The apply lane did exactly what `scripts.verdict.json` specified for the scripts family, recorded every change, and
recorded its one adjustment (C8) correctly. Residuals below are routed with exact fixes; none is an apply defect.

## What I read, whole

- `docs/validation/retrovalidation-2026-10-18/scripts.verdict.json` (14 corrections, all `kind: record`; 17 rulings;
  `notice_replacement`; no `design` correction; none aimed at `docs/PROGRESS.md`).
- `docs/validation/retrovalidation-2026-10-18/apply-scripts.md`, `scripts-verify.md`, `scripts.md`, every line.
- The ten scripts as they now stand: `workflows/36-realm-review.js` (212 lines), `36b-realm-review-continue.js` (187),
  `37-faith-read.js` (84), `38-systems-read.js` (127), `38b-systems-read-continue.js` (131), `39-plague-read.js` (94),
  `40-lens-design.js` (76), `41-lens-close.js` (69), `42-lens-final.js` (69), `43-lens-q.js` (69) — 1,118 lines, every line.
- The apply lane's before copies (`…/scratchpad/retro/apply-scripts/before/`, 1,110 lines: 211/186/83/126/130/94/76/68/68/68,
  the counts the verifier and validator recorded), its `apply.py`, `rt.py`, `parse.mjs`, `after.diff`.
- `docs/HANDOFF.md` lines 28–37; the README's LEFT table row for scripts; `docs/lane-events.log` lines for this family.

## Independent checks (all executed; outputs in `check.out` and `diff-U0.txt`)

| check | result |
|---|---|
| each old text in the before copy / each new text absent before (C1–C12) | old ×1, new ×0 in all twelve |
| each new text now ×1; old gone where not a prefix of the new (C4, C6, C7, C9); old ×1 where it is the prefix (C1–C3, C5, C8, C10–C12: `export const meta = {\n  name: …` survives inside the header-comment correction) | as stated |
| first line of each new text now | C1/C2/C3/C5/C8/C10/C11/C12 line 1; C4 38:9; C6 38b:6; C7 38b:9; C9 40:3 — matches the apply table |
| forward reconstruction: before copy + the verdict's twelve strings in verdict order (C8 with "line 48") | byte-identical to every current file (md5 399c01b1, 9a0605ce, 7e26ba0e, 7156de54, 71cb2f55, b81b90f3, 15943721, c523e79b, 7f98ba6e — the apply record's checksums); trailing newline kept |
| `diff -U0` before → now | 12 hunks in 9 files: 8 one-line insertions at line 1, 4 one-line meta replacements (38:8, 38b:5, 38b:8, 40:3); nothing else moved |
| every backtick template literal, before vs now (header line stripped) | 25/19/13/12/12/10/10/10/10 literals per file, all identical — no prompt text changed |
| header comments sit at line 1, above `export const meta`, outside every literal | yes, all eight |
| `workflows/39-plague-read.js` | `cmp` identical to its before copy (md5 0f1a176d) |
| parse (Node v22.22.0, `parse.mjs`: async-function body with `export` stripped) | all ten parse OK |
| C8 adjustment: `grep -n warSeatBooks` on the before copies | 38:47, 38b:48 — the verdict's "line 61" was wrong (38b:61 is the population subject line); the apply lane's "line 48" is right |
| every as-run line the header comments cite, grepped in the before copies | 36: TI brief 109, TR brief 110, critic item 7 "(T1) and (T2)" 209, "scaled by its prosperity band" 27; 36b: 108, 109, 184, 26; 37: "deity" 15; 38: 47; 38b: 48; 41/42/43: CONTEXT INPUTS "rows J377–J384" 20, design prompt "J377–J386 / J384–J387 / J384–J388 first" 25, reviser "fix it in file n" 52 — every citation correct |
| notice lines: `grep -c '^> PENDING FABLE REVIEW'` over the ten files | 0 in every file; the ten occurrences are the `NOTICE`/`notice` constants (36:18, 36b:16, 37:13, 38:15, 38b:16, 39:13, 40:16, 41:17, 42:17, 43:17 as the files now stand), which the verdict keeps as record — rightly left |
| `notice_replacement` | copied verbatim into apply-scripts.md as the family verdict (the family carries no notice of its own; scripts.md:70 says the same) |
| `python3 tools/bundle_architecture.py --check` | `UP TO DATE`, exit 0 (re-run 05:46 UTC); the scripts are not bundle sources |
| amendments file s | nothing owed: no `design` correction in this family |
| C13, C14 (`docs/HANDOFF.md`) | still unapplied: both old texts present exactly once (HANDOFF.md:34–35, the file has grown since the verdict cited :30–31); the README lists them under LEFT (README:150); no other apply record takes them |
| LANDED line | `docs/lane-events.log:9615` (05:28, apply-scripts); no CHECKPOINT (the lane ran ~3 minutes) |

## Residuals (none an apply-scripts defect; each with its exact fix)

**P1 — C13/C14 on `docs/HANDOFF.md` still owed (F12).** No lane owns HANDOFF in this workflow. Fix, by exact single
replacement (each old occurs once, HANDOFF.md:34 and :35):
- `| wf_a7c82671-f52 systems read continuation | — | LANDED (J383) | — |` →
  `| wf_a7c82671-f52 systems read continuation | workflows/38b-systems-read-continue.js | LANDED (J383) | — |`
- `| wf_868a6476-905 plague read | — | LANDED (J383) | — |` →
  `| wf_868a6476-905 plague read | workflows/39-plague-read.js | LANDED (J383) | — |`
Route to the close-gaps lane or J392 (HANDOFF is the session's hand-off record, not a journal row; applying is lawful).

**P2 — the header comments' line numbers are as-run; the comment itself shifts every later line by one** (the apply
lane's observation, confirmed: e.g. 36's TI brief is now line 110, cited as 109). The citations are right for the script
as it ran and as the verifier, validator and verdict cite it, so I confirm the as-run convention — but a reader of the
file today is not told. Fix (optional wording, one exact replacement in each of the eight files; the old occurs once per
file because both "Correction to it" and "Corrections to it" start with "Correction"):
- old: `its prompt text stays as fed. Correction` → new: `its prompt text stays as fed; the line numbers below are those of the script as it ran (this comment shifts each by one). Correction`
Files: workflows/36-realm-review.js, 36b-realm-review-continue.js, 37-faith-read.js, 38-systems-read.js,
38b-systems-read-continue.js, 41-lens-close.js, 42-lens-final.js, 43-lens-q.js. For J392 to confirm the convention or
apply the clause; either way the comments mislead no seat (no seat reads them).

**P3 — two wrong citations in the validator's own records (not corrections; record hygiene).** `scripts.md:43` and `:54`
and `scripts.verdict.json` R6 (line 197) and R7 (line 203) cite "41:101" and "43:93"; 41 and 43 have 68 lines as run.
The passages ("no new owner question — the owner delegated it and J386 rules it"; "Q4 added as the owner's own word NOT
delegated") are both at line 25 as run (grep on the before copies). Fix: "41:101" → "41:25" and "43:93" → "43:25" in
scripts.md (two rows) and in the two verdict rulings; the claims themselves hold (checked at 41:25 and 43:25).

**P4 — "38b:61" stands in `scripts-verify.md:27` and `scripts.md:30`** (the S8 row). The brief is 38b:48; the apply record
already states the correction. Fix: a dated bracket at the end of each row, e.g.
`[Fable-reviewed 2026-10-18 (confirm-scripts): 38b:48, not :61 — line 61 is the population subject line; applied with 48]`.

**For J392 (unchanged from the verdict and the apply record):** carry the owner's review ask quoted only at 36:40
("comprehensively read and review [SettlementForge's] simulator … to better refine your approach to the FMG / the
realm integration") — F13/R7; no design correction and nothing aimed at `docs/PROGRESS.md` in this family.

## Verdict

PASS on apply-scripts: 12 of 12 scripts-family corrections landed as specified (C8 with the right line), nothing else
moved, no prompt text changed, no notice line to replace and none wrongly replaced, the bundle fresh, no amendments file
owed; C13/C14 rightly left and routed. Residuals P1–P4 carry exact fixes and are no deferral by this lane.
