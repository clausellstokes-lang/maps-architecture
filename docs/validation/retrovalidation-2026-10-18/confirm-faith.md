# Retrovalidation confirm — faith family (lane retrovalidation/confirm-faith)

Lane `retrovalidation/confirm-faith` (Fable 5.1, high; the confirming check under J390/J392), 2026-10-18 05:37–05:42 UTC.
Checked: the apply lane `retrovalidation/apply-faith` (Opus 5.5; record `apply-faith.md`, 133 lines, read whole) against
`faith.verdict.json` (609 lines, 67 corrections, read whole) and the file as it stands, `research/sf/faith-system.md`
(1,516 lines, read whole, every line, after the apply). No git command was run; the host repository was not opened;
nothing was executed except the bundle check and my own comparison script. Edited: this file and the lane log only.

Working copies and the script: `/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/retro/confirm-faith/`
(`recon.py`, `recon.out`, `verdict-dump.txt`, `my.diff`).

## 1. Verdict on the apply lane: PASS

The apply lane's claims all hold, checked independently, not by re-reading its table:

| Check | Method | Result |
|---|---|---|
| Every faith-family correction landed as specified | `recon.py`: took the pre-lane copy the apply lane left (`retro/faith-system.before.md`, md5 `3c73ffe80590f957e8958dda3a20b18b`, 1,516 lines — the md5 the apply record and `STATUS.md:40` both attest), applied the verdict's 64 corrections on `research/sf/faith-system.md` in verdict order by single exact-match replacement, then replaced the one line starting `> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat` with `notice_replacement` | the reconstruction is **byte-identical** to the current file (md5 `65f01f67af355cc2418521a5b2a21497`, 1,516 lines). So every correction is in, in the verdict's words, and **nothing else in the file moved**: there is no byte in the current file that the before copy plus the verdict do not account for |
| Each old text once before, once at apply; each new text once after | counted in `recon.py` on the before copy, on the working text at each step, and on the current file | 64/64: old count 1 before and 1 at apply; new count 1 after. Old count after = 0 for 59 corrections and 1 for C50, C63, C64, C65, C66 (the five whose new text contains the old, because they append a dated bracket or sentence) — exactly as the apply record says |
| Line numbers in the apply record's §4 table | `recon.py` computed each correction's line before (on the before copy) and after (on the current file) | all 64 pairs match the apply record's "before → after" column (every correction stayed on its line; the apply changed no line count) |
| Diff shape | `diff -U0 before current` | 57 hunks, 65 changed lines (64 corrections + the notice), file length unchanged — the apply record's "65 changed lines in 57 hunks" is right (`diff -u` with default context merges them to 44 hunks, which is not a discrepancy) |
| Notice line | grep | 0 lines in the file begin with the PENDING prefix; the verdict's `notice_replacement` occurs exactly once, at line 3, verbatim (`"strongest carrier"` with straight quotes, the em dash, `(lane retrovalidation/faith; J392)`); no file in the repository carries the string `standing in for the Fable seat research/sf-faith` (grep over `*.md`, `*.json`, `*.py`, `*.txt`: 0 files) |
| Dated brackets | compared in `recon.py` as part of the byte-identity check | C9, C54, C60, C61, C63, C64, C65, C66 carry their `[Fable-reviewed 2026-10-18: …]` text exactly as the verdict wrote it; none added, none dropped |
| Bundle | `python3 tools/bundle_architecture.py --check` | `UP TO DATE`, exit 0 (the research note is not a bundle source; the check is reported because the design correction C57 was applied by apply-design and the bundle was regenerated after it) |
| Lane log | grep | one `retrovalidation/apply-faith LANDED` line (log line 9609, 05:25); no duplicate |
| Amendments file s | not this lane's to check (design lane only); apply-design's record covers it | — |

The three corrections the apply lane rightly left (not the faith family's file), checked in their files now:

| C# (verdict index) | File | State now | Who applied |
|---|---|---|---|
| C57 (design) | `docs/volumes/V13-world.md` §5.9 (6) | old text gone (0), new text present once in V13 and once in `docs/ARCHITECTURE-FULL.md`; bundle fresh | apply-design (its record names it "§5.9 (6) faith C45" — `faith.md`'s table number for the same correction; JSON index 57) |
| C58 (research) | `research/sf/lens-implications.md:105` | old gone (0), new present once | apply-lenses, row F-59, taken from `faith.verdict.json` as the apply-faith record asked |
| **C59 (record)** | `docs/validation/retrovalidation-2026-10-18/rulings.md:55` (J379.1 AMENDED text) | **old text still present once; new text absent — NOT LANDED** | no lane (README row 145 lists it as LEFT). The text is the validator's own amended reading, not the owner's words, so it may be corrected (the verdict says so and I agree) |

## 2. Problems found (none is the apply lane's; each has an exact, checkable fix)

The apply lane did exactly what its task and the verdict specified. The problems below are in the verdict's coverage
and in files no apply lane owned; the owner's rule that every finding ends FIXED or INVALID means they must be routed,
not left. None is in a file this lane may edit.

| # | Where | What | Exact fix (each old text occurs exactly once in its file today) |
|---|---|---|---|
| P1 | `docs/validation/retrovalidation-2026-10-18/rulings.md`, line 55, the J379.1 row's AMENDED text | verdict correction C59 (kind record, finding V1) never landed: the rulings record still says "hostility carries hardest" as an absolute, which the host contradicts (vassal authority 0.82 overlord → vassal; `rg/graph.js:679-680`) | replace `(never flows on routes; hostility carries hardest)` with `(never flows on routes; hostility carries hardest of the two-way carriers, an overlord's authority over its vassal harder still, one way)` — the verdict's own new text, verbatim. Owner: whichever lane the orchestrator gives `rulings.md` (the lenses verdict's C40 on the same file is also unlanded, per README row 35) |
| P2 | `research/sf/faith-system.md`, line 1348, §10.2 item 25 (the defects list) | a fourth site of finding V1 inside the faith file that the verdict's correction set missed: "hostile war fronts carry faith hardest (§6.2)" — the same absolute the verdict corrected at §6.2 (C56), §9.6 item 4 (C54) and §10.3 (C55). After the apply, item 25 contradicts the §6.2 bullet it cites | replace `hostile war fronts carry faith hardest (§6.2);` with `hostile war fronts carry faith hardest of the two-way carriers (§6.2);`. Owner: the faith family's file — apply-faith or a close-gaps lane; it is the only "hardest"/"strongest" site left in the file that still reads as an absolute (grep: lines 3, 579, 747, 1248, 1252, 1348, 1365; all but 1348 are corrected or unrelated — 747 is "the strongest non-hostile partner", 1252 is the host ask "the strongest carrier source", a per-conversion carrier, not a ranking) |
| P3 | `research/sf/faith-system.md`, lines 1258–1259, §9.6 item 6 | C63 landed exactly as the verdict wrote it, but the verdict put the bracket after "a host" and before the line-wrapped word "adoption.", so the sentence now reads "…needing the owner's ruling and, to matter, a host [Fable-reviewed 2026-10-18: … never generated]\n   adoption." — the bracket splits the phrase "a host adoption". Cosmetic; the content is right | move the bracket after the sentence: replace `a host [Fable-reviewed 2026-10-18: ruled by J384 (10) under the owner's delegation — holy places and hidden cult sites enter only as DM-placed world sites tagged with a deity, DM-only by default, offered to the host; never generated]` + newline + `   adoption.` with `a host` + newline + `   adoption. [Fable-reviewed 2026-10-18: ruled by J384 (10) under the owner's delegation — holy places and hidden cult sites enter only as DM-placed world sites tagged with a deity, DM-only by default, offered to the host; never generated]`. Owner: same as P2 |
| P4 | `docs/HOST-REQUIREMENTS-2026-10-18.md`, line 246 (row faith-OQ4), and its sources `docs/validation/host-requirements-2026-10-18/final-s4.md:100`, `draft-s4.md:85`, `extract-defects-a.md:69` | V1 travelled into the host-requirements document (J391 (6)), which quotes the note's §10.3 question as it stood before the correction: "Hostile relationships carry faith at 0.72, the strongest carrier (see faith-25e)." The companion row faith-25e ("stronger than any friendly link", `extract-defects-a.md:54`) is defensible as written (0.72 beats the allied 0.62 and trade 0.45 edges; the 0.82 is an authority channel, one way) and needs no change | in `docs/HOST-REQUIREMENTS-2026-10-18.md` replace `Hostile relationships carry faith at 0.72, the strongest carrier (see faith-25e).` with `Hostile relationships carry faith at 0.72, the strongest two-way carrier (an overlord's authority over its vassal reaches 0.82, one way; see faith-25e).`; the three validation drafts are records of that workflow and may carry the same replacement or a dated note. Owner: the host-requirements document's owner, or J392 |

Not problems, checked and dismissed:

- `research/sf/lens-implications.md:522` ("the strongest carrier source" on each mint) and V13 `:798`, `:3766`, `docs/HOST-REQUIREMENTS-2026-10-18.md:107`, `:228`: the host ask H28 — the carrier that moved one conversion, not a ranking of carrier kinds (amendments file s, item at `docs/AMENDMENTS-2026-10-18s.md:69`, already says so). Nothing to change.
- `docs/AMENDMENTS-2026-10-17n.md:1197` quotes V13 §5.9 (6)'s old pressure row inside a `>` amendment block: a dated record of what was written then, not a live statement; file s records the change.
- The apply record's "for J392" notes (R22/V6 on J380's two phrases; R17 on the host-requirements document carrying §3.11's three defects) are correctly left as journal notes; no correction in the verdict targets `docs/PROGRESS.md` and none was applied (grep of the verdict's `file` fields: 64 × faith-system.md, 1 × V13, 1 × lens-implications, 1 × rulings.md).
- The validator's `faith.md` numbers V1's corrections C42–C47 while `faith.verdict.json` holds them at indexes 54–59; the apply records use the JSON indexes. A numbering difference between two records, not a discrepancy in content (apply-lenses already notes the mapping at its F-59 row).

## 3. What I read, in full

`faith.verdict.json` (609 lines; the summary, the 22 rulings' presence confirmed by key, all 67 corrections with old, new,
kind, file, reason); `apply-faith.md` (133 lines); `research/sf/faith-system.md` (1,516 lines, lines 1–1516 in six
contiguous reads, after the apply); the lane-events log tail and its three faith-lane lines; the README's lane table row
for faith (line 30) and LEFT row 145; `rulings.md` lines 52–56 around the J379.1 row; `apply-lenses.md` lines 63 and 72;
`extract-defects-a.md` line 54. Spot reads for the problems: V13 §5.9 (6) by grep; `lens-implications.md:105`, `:522`;
`docs/HOST-REQUIREMENTS-2026-10-18.md:107`, `:228`, `:246`.

Status: LANDED. Verdict on the apply lane: PASS; four routed problems (P1–P4), none the apply lane's, each with an exact
fix above.
