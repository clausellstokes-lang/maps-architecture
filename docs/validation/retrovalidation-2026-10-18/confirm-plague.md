# Retrovalidation 2026-10-18 — confirm-plague

Lane retrovalidation/confirm-plague (fable; J392): the confirming check on lane retrovalidation/apply-plague (opus;
J390, Fable-checked). Verdict on the apply: **PASS**. Every one of the 18 corrections in `plague.verdict.json` landed
as specified, nothing else in `research/sf/plague-system.md` moved, the one notice line is the verdict's
`notice_replacement` verbatim, and the bundle is fresh.

## Inputs read whole

- `docs/validation/retrovalidation-2026-10-18/plague.verdict.json` (273 lines): the summary, the notice replacement, all
  23 rulings, all 18 corrections. Every correction is `kind: "research"` on `research/sf/plague-system.md`; there is no
  `design` and no `record` correction, and none targets `docs/PROGRESS.md`. Correction 18's `new` is byte-equal to
  `notice_replacement`.
- `docs/validation/retrovalidation-2026-10-18/apply-plague.md` (84 lines), with its scratch files
  `/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/retro/apply-plague/apply.py`,
  `roundtrip.py` and `plague-system.before.md` (1,085 lines, md5 `73c9ce31fca22e5f23826e6da4dbb79c`, trailing newline).
- `research/sf/plague-system.md` as it stands (1,096 lines, md5 `09b9a121417470adca5c1327c1375812`, trailing newline),
  read whole in four passes (1–280, 280–560, 560–840, 840–1096), plus the full `diff -u` of the before copy against it.
- `docs/validation/retrovalidation-2026-10-18/plague.md` lines 77–105 (the validator's corrections table and verdict), to
  settle the apply lane's count observation, and the three plague lines of `docs/lane-events.log` (00:54, 01:20, 05:26).

On the before copy: no git command is allowed, so the copy cannot be checked against the branch. It is corroborated three
ways: its md5 and line count match the apply record; its 1,085 lines match the count the validator read whole (verdict
summary; the 01:20 LANDED line); and every one of the 18 `old` strings occurs in it exactly once, as the validator
asserted of the note it judged.

## Independent re-check (script at `…/scratchpad/retro/confirm-plague/check.py`)

For each correction n: `old` in the before copy / `new` in the before copy / `old` in the live note / `new` in the live
note, with the line of `old` before and of `new` after. No `old` is a substring of its `new`, so an `old` count of 0 in
the live note is the full test.

| n | finding | old before | new before | old live | new live | line before → after | apply table says |
|---|---|---|---|---|---|---|---|
| 1 | F1 reason string | 1 | 0 | 0 | 1 | 209 → 209 | 209 → 209 |
| 2 | F2 amended, §9 item 3 (dated bracket) | 1 | 0 | 0 | 1 | 803 → 809 | 803 → 809 |
| 3 | F2, §5.5 | 1 | 0 | 0 | 1 | 563 → 569 | 563 → 569 |
| 4 | F2, row 16 RR clause | 1 | 0 | 0 | 1 | 529 → 535 | 529 → 535 |
| 5 | F3 tick is a week | 1 | 0 | 0 | 1 | 170 → 170 | 170 → 170 |
| 6 | F4 `populationDynamics.js:113,309` | 1 | 0 | 0 | 1 | 313 → 317 | 313 → 317 |
| 7 | F5 faith-system §5.5, fold:501 | 1 | 0 | 0 | 1 | 360 → 364 | 360 → 364 |
| 8 | F6 §3.14 (dated bracket) | 1 | 0 | 0 | 1 | 385 → 389 | 385 → 389 |
| 9 | F6 §1 summary | 1 | 0 | 0 | 1 | 103 → 103 | 103 → 103 |
| 10 | F7 soak sizes | 1 | 0 | 0 | 1 | 497 → 503 | 497 → 503 |
| 11 | F8 `COLUMN_SEED_CAP` | 1 | 0 | 0 | 1 | 525 → 531 | 525 → 531 |
| 12 | F9 PROGRESS count | 1 | 0 | 0 | 1 | 1000 → 1011 | 1000 → 1011 |
| 13 | F9 fp-physical-integration count | 1 | 0 | 0 | 1 | 1001 → 1012 | 1001 → 1012 |
| 14 | F10 amended, §3.3 (dated bracket) | 1 | 0 | 0 | 1 | 244 → 244 | 244 → 244 |
| 15 | F11 amended, PHASE55:1631 | 1 | 0 | 0 | 1 | 802 → 808 | 802 → 808 |
| 16 | R2 §1 (dated bracket) | 1 | 0 | 0 | 1 | 130 → 130 | 130 → 130 |
| 17 | R2 §8.4 heading | 1 | 0 | 0 | 1 | 744 → 750 | 744 → 750 |
| 18 | notice line | 1 | 0 | 0 | 1 | 3 → 3 | 3 → 3 |

All 18 rows match the apply record's table exactly. The four dated brackets (corrections 2, 8, 14, 16) are present
word for word, since each `new` is found once as a whole string; the live note holds five "Fable-reviewed 2026-10-18"
occurrences (the four brackets and the notice).

**Nothing else moved.** Forward replay — the before copy with the 18 verdict strings substituted in array order — is
byte-identical to the live note; the reverse round-trip (each `new` back to its `old`, last first) is byte-identical to
the before copy. Line count 1,085 → 1,096 (+11: corrections 2 (+6), 14 (+4), 8 (+2), 9 (−1); the rest ±0). The
`diff -u` has 15 hunks at the default three lines of context (rows 12 and 16 of §5.1, four lines apart, share a context
window); `diff -U0` has 16, which is the apply record's count and its stated reason (corrections 12–13 contiguous,
15/2 contiguous). Both figures describe the same 18 fragments; the record's claim holds for the zero-context count.

**Notice.** `grep "PENDING FABLE REVIEW" research/sf/plague-system.md` is empty. Line 3 equals `notice_replacement`
byte for byte, once. Across the repository the text "Fable seat research/sf-plague" survives only inside
`plague.verdict.json` and `apply-plague.md` (quotations of the replaced line in records), which is correct: the family
has one file.

**Bundle.** `python3 tools/bundle_architecture.py --check` → `UP TO DATE /home/user/maps-architecture/docs/ARCHITECTURE-FULL.md`,
exit 0. The research note is not a bundle source, so no regeneration was owed and none was needed.

**Amendments file.** Not owed by this family: the verdict carries no `design` correction ("no design fragment"; V13 §5.9
:3223 holds), so the design lane had nothing from plague to write into `docs/AMENDMENTS-2026-10-18s.md`, and
`apply-design.md` names plague only in its list of verdicts read.

**PROGRESS and record corrections.** None in the verdict; nothing was wrongly applied to `docs/PROGRESS.md` (no
correction targets it).

## The apply lane's observation ("sixteen" versus 17 research entries) — not a defect

The apply record flags that the notice and the verdict summary say "sixteen research corrections" while the array holds
17 research-text entries plus the notice. The validator's own record settles it: `plague.md` lines 79–97 number the
corrections **C1–C16** plus **N** (the notice), and its row C12 (F9) carries two old/new pairs in one correction — the
`docs/PROGRESS.md` count and the `research/sf/fp-physical-integration.md` count — which the verdict's JSON array splits
into entries 12 and 13 so each is a single exact-match replacement. So "sixteen" counts corrections as the validator
numbered them, and 17 is the fragment count; the same convention the confirm-alignment lane recorded ("30 fragments"
for 30 corrections, CR-7a/b/c). The notice is accurate on the validator's numbering; no change to the note, the verdict
or the apply is called for. Noted for J392 only so the two counts are not read as a discrepancy.

## Ruling R7's consequence — correctly not applied, named for J392

R7 (UPHELD) carries a consequence with no text fragment: "the host-requirements document (J391 (6)) should carry pg-4's
quarantine verb as the owner value PG names, not as a patrol fact". `docs/HOST-REQUIREMENTS-2026-10-18.md` belongs to no
plague-family lane and the verdict gives no `old`/`new` for it, so the apply lane rightly left it and so do I. It is a
validator's consequence for the close-gaps or J392 pass to carry, not an apply defect.

## Result

- **PASS.** 18 of 18 corrections landed as the verdict specifies (each old gone, each new once, at the lines the apply
  table gives); the before copy round-trips byte for byte in both directions, so nothing beyond the 18 fragments changed;
  the only notice line is the verdict's `notice_replacement`; bundle `--check` exits 0; no design, record or PROGRESS
  correction exists for this family, so no amendments fragment and no journal row were owed.
- Problems found: none in the apply. Two observations, both shown not to be defects above (the correction count in the
  notice; the hunk count's context dependence).
- Files written by this lane: this record and one LANDED line in `docs/lane-events.log`. Scratch:
  `/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/retro/confirm-plague/check.py`.
  No git command was run; the host repository was not touched; no other file was edited.
