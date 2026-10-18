# Retrovalidation 2026-10-18 — confirm-trade (Fable confirming check of apply-trade)

Lane `retrovalidation/confirm-trade` (Fable, high; J392 — Fable judges and validates). Status: COMPLETE. Verdict on
the apply lane's work: **PASS**. No git command was run; the host repository was not touched. Script and outputs:
`/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/retro/confirm-trade/`
(`check.py`, `diff.txt`).

## What I read, whole

- `docs/validation/retrovalidation-2026-10-18/trade.verdict.json` (verdict PASS-WITH-CORRECTIONS; 38 corrections, all
  `kind: research`; 37 on `research/sf/trade-system.md`, 1 on `research/sf/fp-physical-integration.md`; the
  `notice_replacement` line; the summary). No `design` and no `record` correction; none aimed at `docs/PROGRESS.md`.
- `docs/validation/retrovalidation-2026-10-18/apply-trade.md` (the apply record), whole; the apply script `apply.py`
  and its `table.md`; the before-copy `trade-system.before.md` (1,307 lines, md5 `94d85edd98a74d4b906d9ba8ac0b45ac`,
  the J375 notice at its line 3).
- `research/sf/trade-system.md` as it stands (1,280 lines, md5 `15d47636182b1e8a6e4821021ec2a71b`, mtime 05:24:17 UTC,
  unchanged since the apply lane landed), every line.
- The full unified diff before → after (331 lines, 28 hunks), every hunk.
- `docs/validation/retrovalidation-2026-10-18/trade.md` header (the family's files: `research/sf/trade-system.md` only;
  `fp-physical-integration.md` appears there only as the cross-family row A1 target) and `apply-prosperity.md` lines
  70-78 (its cross-family note on the trade note).

## Checks and evidence

1. **Every trade-family correction landed as specified.** For each of the 37 corrections (C1-C37, verdict order), my
   own script counted the `old` and `new` texts in the before-copy and in the live file: `old` once / `new` absent in
   the before-copy, and `new` exactly once / `old` absent in the live file, for all 37. The one apparent exception is
   C28 (§10.3 "One territory or two?"): its `new` text is the `old` text with a bracket appended, so the `old` string
   necessarily survives once, as the prefix of the `new`, at the same byte offset (113,949) — correct by construction.
   The line at which each `new` begins matches the apply record's "line after" column for all 37 (254, 351, 1059, 139,
   134, 334, 97, 928, 402, 310, 1279, 270, 1024, 396, 914, 1076, 935, 1023, 957, 699, 765, 628, 1039, 1012, 1016, 896,
   115, 1113, 57, 100, 188, 859, 184, 82, 353, 1266, 1275). Where the correction specifies a dated bracket
   ([Fable-reviewed 2026-10-18 …] or [SUPERSEDED BY EVENT 2026-10-17 …]) the live text carries it verbatim; where it
   specifies none, none was added. The apply record's "Did not match: none" holds: no adjustment was needed or made.
2. **Nothing else in the file moved.** Undoing the 37 replacements in reverse order on the live file and restoring the
   notice line reproduces the before-copy byte for byte (`reverse round-trip equals before: True`); replaying the 37
   replacements and the notice on the before-copy reproduces the live file byte for byte (`forward replay equals cur:
   True`). The diff's 28 hunks (99 changed lines) are the 37 fragments and the notice and nothing besides; adjacent
   fragments (C2/C35, C14-C9, C4/C5, C13/C18, C36/C37 neighbourhoods) share hunks. The line count fell from 1,307 to
   1,280 only because multi-line `old` passages became single-line `new` text, as the apply record says.
3. **The notice line.** The before-copy had exactly one line beginning "> PENDING FABLE REVIEW — written by Opus 5.5
   standing in for the Fable seat" (line 3, seat `research/sf-trade`). The live file's line 3 equals the verdict's
   `notice_replacement` exactly (string equality), the file has no "PENDING FABLE REVIEW" text anywhere, and a grep for
   "Fable seat research/sf-trade" across `research/` and `docs/` outside the validation folder finds nothing. The
   family has one file, so no other notice line was due.
4. **Bundle.** `python3 tools/bundle_architecture.py --check` → `UP TO DATE /home/user/maps-architecture/docs/ARCHITECTURE-FULL.md`,
   exit 0. The trade verdict carries no design correction, so no base, volume or amendments file was this lane's to
   check; `docs/ARCHITECTURE-FULL.md` is fresh as the apply-design and apply-notices lanes left it (the apply record's
   own --check also reported UP TO DATE; research notes are not bundle sources).
5. **Amendments file.** Not applicable: no design correction in this verdict, so no amendments entry was owed by the
   trade apply lane.
6. **Content read in context.** Having read the live note whole, each corrected passage reads coherently in place
   (the §1 prosperity bullet, the §2.1 freshness paragraph, §3.8's two corrected sentences, §3.10's two rows, §9 items
   1, 6, 8 and 13, §10.2 items 14, 15, 23 and 31, §10.3 and the §12 rows P10 and M8). I re-judge none of the
   verdict's readings here; those are the validator's and were Fable's to make.

## Not applied, correctly, and still open for routing

Both items the apply lane left alone were outside its task's file scope and are recorded in `apply-trade.md`; both
are also in the apply-notices README's list of 39 unowned corrections. Each still applies cleanly (checked at 05:40 UTC):

- **Trade C38** (`research/sf/fp-physical-integration.md` row A1, line 111): the `old` text "from W8's budgeted flood
  with the host's `TerritorySeed`s and cost vector" occurs exactly once; `fp.verdict.json` contains no correction on
  that text (grep "budgeted flood": 0) and `apply-fp.md` did not apply it. For J392 / the close-gaps lane: apply the
  verdict's `new` text once, as written (correction index 37 in `trade.verdict.json`).
- **Prosperity C35 / V-3** (`research/sf/trade-system.md` §3.7, line 334): "Other writers: traditions, roads,
  corruption, faction capture, demographics" occurs exactly once after C6. Each apply lane left it for the other
  (`apply-prosperity.md` line 74-75 "for the trade family's apply lane"; `apply-trade.md` "left for the prosperity
  apply lane"), so it is unowned. For J392 / the close-gaps lane: apply `prosperity.verdict.json`'s correction on that
  text once, as written.

Neither is a defect in the apply-trade lane's work: its task limited it to the trade verdict's corrections on the
trade family's file, and it named both leftovers.

## Verdict

PASS. All 37 trade-family corrections and the notice replacement landed exactly as the verdict specifies, nothing else
in `research/sf/trade-system.md` changed, no J375 notice remains in the family, and the bundle is fresh. No fix is
owed by the apply lane. Two cross-family corrections remain for routing, as above.
