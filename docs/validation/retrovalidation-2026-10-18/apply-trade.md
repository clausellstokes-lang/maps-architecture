# Retrovalidation apply — trade family (lane retrovalidation/apply-trade)

Lane `retrovalidation/apply-trade` (Opus 5.5, high; J390, Fable-checked). Source of corrections:
`docs/validation/retrovalidation-2026-10-18/trade.verdict.json`, read whole (verdict PASS-WITH-CORRECTIONS; summary,
19 rulings, notice_replacement, 38 corrections: 37 `kind: research` on `research/sf/trade-system.md`, 1 `kind:
research` on `research/sf/fp-physical-integration.md`; 0 `design`, 0 `record`, none aimed at `docs/PROGRESS.md`).
No git command run; the host repository was not touched.

Family file: `research/sf/trade-system.md` — before: 1,307 lines, md5 `94d85edd98a74d4b906d9ba8ac0b45ac` (copy at
`/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/retro/apply-trade/trade-system.before.md`);
after: 1,280 lines (several multi-line old passages became single-line new text), md5
`15d47636182b1e8a6e4821021ec2a71b`. The after-file was read whole (lines 1-1,280) once the fragments were in.

Status: LANDED.

## Method

Script `/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/retro/apply-trade/apply.py`:
for each trade-family correction in verdict order, assert the `old` text occurs exactly once in the current file,
replace it with `new` once; then replace every line beginning "> PENDING FABLE REVIEW — written by Opus 5.5 standing
in for the Fable seat" with the verdict's `notice_replacement`. Pre-check before any write: all 37 `old` texts
occurred exactly once and no `new` text was already present. Post-check: every `new` text occurs exactly once, and
undoing the 37 replacements and the notice in reverse reproduces the before-file byte for byte (round-trip identical:
True), so nothing outside the fragments and the notice line changed.

## Fragments applied to research/sf/trade-system.md (37 + the notice)

Line numbers: where the `old` began in the before-file, where the `new` begins in the after-file. "Bracket" = the
new text carries a dated record bracket ([Fable-reviewed 2026-10-18 …] or [SUPERSEDED BY EVENT 2026-10-17 …]) as the
correction specifies; where the correction gives none, none was added.

| # | Finding | Line before | Line after | Bracket | Result |
|---|---|---|---|---|---|
| C1 | TV-1 | 262 | 254 | yes | applied, old found once |
| C2 | TV-2 | 361 | 351 | yes | applied, old found once |
| C3 | TV-2 | 1085 | 1059 | yes | applied, old found once |
| C4 | TV-3 | 145 | 139 | yes | applied, old found once |
| C5 | TV-3 | 140 | 134 | no | applied, old found once |
| C6 | TV-4 | 343 | 334 | yes | applied, old found once |
| C7 | TV-5 | 99 | 97 | yes | applied, old found once |
| C8 | TV-6 | 941 | 928 | yes | applied, old found once |
| C9 | Validator's own (F-A) | 413 | 402 | no | applied, old found once |
| C10 | TV-7 | 319 | 310 | no | applied, old found once |
| C11 | TV-7 | 1306 | 1279 | no | applied, old found once |
| C12 | TV-8 | 278 | 270 | no | applied, old found once |
| C13 | TV-9 | 1049 | 1024 | no | applied, old found once |
| C14 | TV-10 | 407 | 396 | no | applied, old found once |
| C15 | TV-10 | 927 | 914 | no | applied, old found once |
| C16 | Validator's own extension of TV-10 | 1103 | 1076 | no | applied, old found once |
| C17 | TV-11 | 949 | 935 | yes | applied, old found once |
| C18 | TV-12 | 1043 | 1023 | yes | applied, old found once |
| C19 | TV-12 | 975 | 957 | yes | applied, old found once |
| C20 | TV-13 | 710 | 699 | no | applied, old found once |
| C21 | TV-13 | 777 | 765 | no | applied, old found once |
| C22 | TV-14 | 639 | 628 | no | applied, old found once |
| C23 | TV-15 | 1065 | 1039 | no | applied, old found once |
| C24 | TV-16 | 1031 | 1012 | no | applied, old found once |
| C25 | TV-17 | 1036 | 1016 | no | applied, old found once |
| C26 | TV-18 | 908 | 896 | yes | applied, old found once |
| C27 | TV-18 | 120 | 115 | no | applied, old found once |
| C28 | Validator's own extension of TV-18 | 1140 | 1113 | yes | applied, old found once |
| C29 | TV-19 | 57 | 57 | no | applied, old found once |
| C30 | TV-20 | 104 | 100 | yes | applied, old found once |
| C31 | TV-21 | 196 | 188 | no | applied, old found once |
| C32 | TV-21 | 871 | 859 | no | applied, old found once |
| C33 | TV-22 | 192 | 184 | no | applied, old found once |
| C34 | Validator's own (F-B) | 83 | 82 | no | applied, old found once |
| C35 | Validator's own (F-B), §3.8 echo | 364 | 353 | no | applied, old found once |
| C36 | Validator's own (F-C) | 1293 | 1266 | yes | applied, old found once |
| C37 | Validator's own (F-C) | 1302 | 1275 | yes | applied, old found once |
| notice | — | 3 | 3 | — | the single "> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat research/sf-trade; …" line replaced by the verdict's notice_replacement; no other notice line in the file |

Did not match: none. No adjustment was needed for any fragment.

## Not applied by this lane

- **C38** (`research/sf/fp-physical-integration.md` row A1: "from W8's budgeted flood with the host's
  `TerritorySeed`s and cost vector" → "from W8a's unbudgeted nearest-seat flood over the host's seats (J-V13.63;
  budgets and cost vectors retired) [Fable-reviewed 2026-10-18, trade lane]"). The file belongs to the FP family, not
  the trade family this lane is limited to, so it was not edited here. State at landing: the `old` text still occurs
  exactly once in that file; `fp.verdict.json` has no correction touching row A1's planned-source cell, and
  `apply-fp.md` does not apply it. It needs a lane that may edit `fp-physical-integration.md` (the FP apply lane, or
  the orchestrator's routing); named for J392.
- **prosperity.verdict.json V-3** (cross-family, `research/sf/trade-system.md` §3.7 "Other writers: traditions, roads,
  corruption, faction capture, demographics" → a dated bracket naming the four band writers). It comes from the
  prosperity verdict, not the trade verdict this lane applies, so it was left for the prosperity apply lane. After this
  lane's C6 its `old` text still occurs exactly once in the trade note (line 334), so it applies cleanly on top.
- No `design` correction and no `docs/PROGRESS.md` correction exist in the trade verdict; nothing is carried "for
  J392" from this verdict except the routing of C38 above and the items the verdict's rulings already name for J392
  (RL-1, RL-4, RL-6, RL-8).

## Bundle check

`python3 tools/bundle_architecture.py --check` → UP TO DATE. The bundle's sources are `docs/ARCHITECTURE.md`,
`docs/volumes/INDEX.md` and `docs/volumes/V*.md`; `research/sf/trade-system.md` is not a source, so this lane's edits
cannot stale it.
