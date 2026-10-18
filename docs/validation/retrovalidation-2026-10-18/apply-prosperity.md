# Retrovalidation 2026-10-18 — apply-prosperity

Lane: retrovalidation/apply-prosperity (Opus/high; J390, Fable-checked). Source of corrections:
`docs/validation/retrovalidation-2026-10-18/prosperity.verdict.json` (verdict PASS-WITH-CORRECTIONS; 52 rulings;
46 corrections: 41 research, 1 design, 4 record; 0 aimed at `docs/PROGRESS.md`), read whole.

Family file: `research/sf/prosperity-system.md` (1,116 lines before; md5 before 2adf55d6b30854a5faa7f06d2ef0859a; copy at
`/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/retro/apply-prosperity/prosperity-system.before.md`).

## Pre-check

Every one of the 34 prosperity-family `old` fragments (C1–C34, all `kind: research`) occurs exactly once in
`research/sf/prosperity-system.md`, and no `new` text was already present (script, 2026-10-18 05:25 UTC).

## Applied — `research/sf/prosperity-system.md` (35 fragments)

C1–C34 applied in verdict order by exact-match replacement, each `old` asserted to occur exactly once at its turn; after
the pass no `old` remains and each `new` occurs exactly once. No adjustment was needed: every fragment matched as given.
The dated brackets ("[Fable-reviewed 2026-10-18 …]") are carried exactly as the verdict's `new` texts give them.

| Correction | Line after | Finding |
|---|---|---|
| C1 | 46 | F1 (§1 route base: the thorp/hamlet 0 and teleportation 2 arms) |
| C2 | 675 | F2 (`econ/prosperity.js:182-192`) |
| C3 | 226 | F3 (only the founding core's scaleBand is the tier index) |
| C4 | 275 | F4 (ransom term rounds; term-end vs party-ransom vs other releases) |
| C5 | 61 | F4 amended (§1 summary) |
| C6 | 912 | F5 (`:411-412`) |
| C7 | 314 | F6 (two conquest-feed channels) |
| C8 | 337 | F7 (modifier only without own severity; clamp) |
| C9 | 191 | F8 (12% multiplicative decay) |
| C10 | 1090 | F8 (§12 P3 row) |
| C11 | 702 | F9 amended (v1 layout carries the wealth word, does not draw it) |
| C12 | 535 | F10 (growth chain's tail) |
| C13 | 546 | F11 (verbatim quote, `bandLadders.js:220`) |
| C14 | 643 | F12 (no shipped consumer; two dormant siblings) |
| C15 | 878 | F13 (UPSWING §0 and B2, not §4) |
| C16 | 908 | F14 (M11 carries no S16) |
| C17 | 654 | F15 (`EC-0..EC-18`, FOLD:340) |
| C18 | 455 | F16 (`population-system.md:417`, row C) |
| C19 | 570 | F17 amended (no rerun engine on Apply-stressor) |
| C20 | 900 | F18 (`supplyKernel.js:590-591`) |
| C21 | 102 | F19 (§1 point (3), J384 (4)) |
| C22 | 100 | F19 widened (§1 point (2), J384 (1)) |
| C23 | 772 | F19 (§9.1 item 2 closed, J384 (1), J385 gap 4) |
| C24 | 779 | F19 (stale AMENDMENTS-m and fp-realm-review pointers) |
| C25 | 783 | F19 ("still the map's to define" ruled by J384 (4)) |
| C26 | 945 | F19 (open question (g) answered) |
| C27 | 946 | F19 (open question (h) answered) |
| C28 | 1097 | F19 (§12 P10 row) |
| C29 | 94 | F20 amended (three paths to RR's lit keys) |
| C30 | 776 | V-1 own ("exit 1.5"; §9.1 item 3) |
| C31 | 393 | V-2 own (polarisation, not a law of upward drift) |
| C32 | 924 | V-3 own (C16 trade-note writer list) |
| C33 | 850 | V-3 (§9.3 item 16) |
| C34 | 939 | V-4 own (open question (a): the regeneration path) |
| notice | 3 | the J375 PENDING line replaced with the verdict's `notice_replacement` |

Notice: line 3, the only line beginning "> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat"
(seat `research/sf-prosperity`), replaced with:
"> Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — the substance holds at 81f1cd96; 20 verifier findings accepted (5 amended), 4 own findings fixed, 0 readings overturned (lane retrovalidation/prosperity; J392)".
No PENDING line is left in the file.

After: 1,115 lines (C3 joins two lines into one); md5 da8834f375f056d1139d9a35c653c7cb. Round-trip proof: restoring the
notice line and reverse-replacing every `new` with its `old` (C34 back to C1) reproduces the before-copy byte for byte
(`True`), so nothing else in the file changed. `diff` shows 33 hunks (adjacent fragments C21/C22, C26/C27 merge).

## Not applied by this lane (not the prosperity family's file)

The task scopes this lane to corrections whose file is `research/sf/prosperity-system.md`. The verdict's other twelve
corrections target other families' files and are left for their lanes; at 05:26 UTC each `old` still occurs exactly
once in its file and no `new` is present (read-only check):

- C35 (research) `research/sf/trade-system.md` — the §3.7 writer list (corruption, faction capture, demographics only
  read the band); V-3 cross-family. For the trade family's apply lane (apply-trade was mid-run on that file).
- C36–C41 (research) `research/sf/plague-system.md` — six F17 fragments (§3.12, §1, the DM walkthrough, the §7 row, P9,
  M7: no rerun at Apply-stressor; the drop lands at the next regeneration from config). For the plague family's apply lane.
- C42 (design) `docs/volumes/V13-world.md` — V13 §5.9 (7) upward-drift note qualified (V-2 → D-1). Kind "design": the
  design lane applies it.
- C43–C46 (record) `docs/HOST-REQUIREMENTS-2026-10-18.md` — four inherited imprecisions (:412, :420, :425, :736 per the
  summary: "exit 1.5"; UPSWING §4 → §0/B2 and `:121`; `supplyKernel.js:590-591`; `:411-412`). Not a prosperity-family
  file and not named as this lane's; the verdict's summary notes its Claude-doc mirror is the session's to re-place.

## For J392

No correction in the verdict targets `docs/PROGRESS.md`; the verdict's summary says "J392 names no J-row from this
lane". Nothing listed.

## Checks

- Bundle: `research/sf/prosperity-system.md` is not a source of `docs/ARCHITECTURE-FULL.md`;
  `python3 tools/bundle_architecture.py --check` → "UP TO DATE /home/user/maps-architecture/docs/ARCHITECTURE-FULL.md",
  exit 0 (05:26 UTC). No regeneration needed or done.
- No git command run; the host repository not touched; no file edited but `research/sf/prosperity-system.md`, this
  record and the lane-events log.
