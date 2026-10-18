# Sites-roads apply: file t on the base (lane sites-roads/apply-t-base)

This record is for lane `sites-roads/apply-t-base` (Opus 5.5, high; J394, Fable-critiqued), launched under J398 (the owner's "Yes" on Q5).
The fragments come from `docs/validation/sites-roads-2026-10-18/draft-t.fragments.json` (138 fragments). The 4 fragments
whose `file` is exactly `docs/ARCHITECTURE.md` were applied in the JSON's order. No git command was run. The host
repository was not touched, and no file was edited except the target, this record and the lane log. The bundle was
not regenerated, because the record lane does that.

Target `docs/ARCHITECTURE.md`:
- before: 24,462 lines, md5 `1f871a01961de8a4994125d7bb1993be`. This equals the md5 recorded in all 4 fragments, so no
  drift was found. A copy is at
  `/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/sites-roads/apply-t-base/ARCHITECTURE.before.md`.
- after: 24,467 lines (+5: 945 (j) adds 3, 948 (j) adds 2), md5 `5c463a94ae9cdda1127a5c6875b4eaaf`.

Status: LANDED.

## Method

The script is `/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/sites-roads/apply-t-base/apply.py`
(run with `python3 -I`; its output is in `apply.out` beside it). For each fragment in JSON order it does two things:
- It asserts that `old` occurs exactly once in the file as it stands at that step. On any other count the script stops,
  and that never happened.
- It replaces `old` with `new` once.

After all 4 were applied, it checked three things:
- Every `new` occurs exactly once.
- Every `old` that is not a prefix of its `new` is gone.
- Undoing the 4 replacements in reverse order reproduces the before-file byte for byte. Round-trip identical: True.
  So nothing outside the 4 fragments changed.

## Fragments applied to docs/ARCHITECTURE.md (4)

The columns are:
- "Line (fragment)": the line recorded in the fragment.
- "Line at step": where `old` began at its step of the in-order apply.
- "Line after": where `new` begins in the final file.

| Fragment | Line (fragment) | Line at step | Line after | Result |
|---|---|---|---|---|
| 941 (q) | 9718 | 9718 | 9723 | applied, old found once |
| 945 (j) | 8678 | 8678 | 8680 | applied, old found once |
| 945 (k) | 11709 | 11712 | 11714 | applied, old found once (its line at step is +3 after 945 (j)) |
| 948 (j) | 5 | 5 | 5 | applied, old found once (old is a prefix of new: the base's revision note for file t is inserted after file l's note) |

Adjustments: none. Every `old` matched exactly once, at the step where it was applied.

## Assertion counts

- `old` exactly once before its replacement: 4 of 4.
- `new` exactly once after all were applied: 4 of 4.
- `old` gone after all were applied: 3 of 3. One more `old` (948 (j)) is a prefix of its `new`, so it stays inside that `new` once.
- Reverse round-trip to the before-file: identical.
