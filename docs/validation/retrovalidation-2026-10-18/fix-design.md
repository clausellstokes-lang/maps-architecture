# retrovalidation/fix-design — the fixes confirm-design returned to apply-design (amendments file s)

Lane retrovalidation/fix-design (Opus 5.5, high; J390: Fable judges and validates, Opus verifies and applies). Started
2026-10-18 05:49 UTC, written as the lane went. Task: the two findings of `confirm-design.md` (Fable), each with its
exact fix, applied as given; nothing else.

## Before

Targets as they stood (md5 equal to those confirm-design read, so its anchors hold): V13 `a896c8dbdb41dd38516becc970b4db81`,
INDEX `b19971d37d98710d9a195fb09021dd11`, file s `76fb99dc3b4fbcec1171c6e56db8aaf5`, apply-design.md
`fe3a965090821f6e558a0dcc4ed07f57`. Copies in the scratchpad (`retro/fix-design/before/`).

## Applied (`retro/fix-design/apply.py`: every old asserted once before, every new once after, one read-modify-write per file)

| confirm-design fix | file | result |
|---|---|---|
| finding 1 (a): J-V13.83's rejected absolute rung, dated italic bracket | V13 :3860 | applied; the line number unchanged (no line added above it) |
| finding 1 (b): item 939 (§9 Decisions, J-V13.83) inserted before `### Volume 14 — the revision notes under the title`, in item 930's form; its *Reason* quotes item 935's validator reason byte for byte (read from file s, not retyped) | file s :203-214 | applied |
| finding 1 (b): the items line, the status line, the prosperity table row, the final list's head and its 939 entry | file s :5, :7, :27, :282, :284 | applied, each once |
| finding 1 (c): `items 927–935 and 939` | V13 :105 and file s item 927's new text (:91) | applied, each once |
| finding 1 (d): `items 927–939` | INDEX :14 and file s item 938's new text (:253) | applied, each once |
| finding 1 (e): the sweep sentence names the one hit | apply-design.md :101-102 | applied |
| finding 2: `drifts upward in aggregate where most seats start there, the usual case, the` | V13 :112 and file s item 927's new text (:98) | applied, each once; "only where most" now 0 in V13, file s and the bundle |
| finding 1 (f) / 2: the bundle | `python3 tools/bundle_architecture.py` then `--check` | 81,080 lines from 16 sources; `UP TO DATE`, exit 0 |

`diff -U0` against the before copies: V13 3 hunks (:105, :112, :3860), INDEX 1 (:14), file s 9 (:5, :7, :27, :91,
:98, the 12-line insert at :204, :253, :282, :284), apply-design.md 1 (:101-102); nothing else moved. Item 927's new
text in file s, unfolded, occurs once in V13 (the note and its item still agree). Every new text occurs once in the
bundle.

## After

V13 `09fbe522c52b4b1c7c89e7c243f0f19d` (4,465 lines), INDEX `4288179616d26f75b3d717deb23ed0ce`, file s
`090329b6c51ca9abe907a8970acc5677` (285 lines), apply-design.md `a4a0fd03064c9392b88d36fd0d2a6102`, bundle
`ef177d681015a4a8edb471810b02c527`.

## Seen, not changed (outside the fixes given; for the Fable check)

File s's *Where the sources were not taken verbatim* names items 927, 936, 938 (a) and 930 (b) as the series' own and
says "(c) nothing else"; item 939 is a confirm-check carriage like 930 and is named in its own *From:* line, not in
that list. Its verification record (:261-272) still narrates the apply-design pass of the twelve items, which is
historical and true of that pass. Neither was among the fixes, so neither was edited here.

**LANDED** 2026-10-18 (see the lane line).
