# M0-f-03a — the closing check's notes (not failing lines)

These notes come from the closing check of item M0-f-03a (lane `check/M0-f-03a-close-r1`, 2026-10-04). Under the
session's rulings J162 and J169, the closing check fails the item only on a blocker. The finding below is not a
blocker, and it is not a defect of the item: it concerns how the seat ledger records context that the session harness
gives every seat. Its row names its handling and where it belongs. The verdict and its evidence are in
`checks/M0-f-03a.md` (the closing round is at the top).

The first check's notes (N1 – N5: the seam between fractional limits and the kernel's whole-number work limit, which
needs a session ruling before M0-f-03b and M0-a-06; `warp.halvings`'s floor being test-pinned yet calibratable; the
`corepack pnpm test -- <flags>` form dropping its flags; the record's wave label; the fixed `numRuns`) are bullets in
`checks/M0-f-03a.md` round 1. They are still open and are not repeated here. This file starts its own numbering at N-1.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-1 | **The session harness puts the owner's memory index into every seat's context, and only one ledger row says so.** The fix round's row L-0120 discloses that the harness placed the owner's memory index (one line per project note, some of them naming research-side topics) and the repository's git status in its context unasked, and that it opened and used neither. This closing seat's context carries the same text, disclosed in L-0121. No earlier row (L-0001 – L-0119) mentions it, and §1 of `CLEAN-ROOM.md` has no sentence for context that the harness injects, as opposed to a file a seat reads (rule 8 covers a seat's own accidental read). For this item the effect is nil: the item's code, data and tests are generic work-limit arithmetic from §5.1 (5), and nothing in them draws on the index (CONFIRMED that the files are unchanged since round 1; PLAUSIBLE that the index had no influence). Across the build, however, every implementer-side seat runs with that text in view, and the §17.1 (7) record does not say so. | A session ruling, made once: either (a) one sentence in `CLEAN-ROOM.md` §1 stating that harness-injected context (the memory index, global instructions, git status) is not a seat's read, is never used, and is covered by a standing rule-8 decision of no redo, with later rows citing it; or (b) implementer-side seats run without the memory index in their context. Either way, the rows before L-0120 need no correction. | now (the session), before M0-x-01's M0 record |
