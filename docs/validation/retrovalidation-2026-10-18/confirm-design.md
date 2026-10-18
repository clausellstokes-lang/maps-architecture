# retrovalidation/confirm-design — the confirming check of apply-design (amendments file s)

Lane retrovalidation/confirm-design (Fable 5.1, high; J390: Fable judges and validates, Opus verifies and applies;
J392). Started 2026-10-18 05:37 UTC, written as the lane went. The lane under check: retrovalidation/apply-design
(Opus 5.5; record `apply-design.md`, LANDED 05:32).

## Verdict

**FAIL, narrowly** — every one of the twelve items of `docs/AMENDMENTS-2026-10-18s.md` landed as specified, nothing
else moved in the three targets, the notices on the design texts are the right verdict lines, the bundle is fresh and
file s is well-formed; two findings of this check remain, each with an exact fix below, so the lane is returned for
them rather than closed with a finding deferred (the owner's rule): (1) V13 §9's J-V13.83 still gives the rejected
absolute rung's reason as the law prosperity's D-1 corrected ("the host's band ratchets upward realm-wide"), the one
"upward" hit in V13 that the apply record's sweep sentence claims is a target or a listed *Not item* and is neither;
(2) item 927's own revision-note sentence strengthens the validator's text ("drifts upward in aggregate **only** where
most seats start there") beyond the finding. Neither touches a validator's correction; both are the applying seat's
own texts.

## What I read, whole

- `docs/validation/retrovalidation-2026-10-18/apply-design.md` (the lane record) and `docs/AMENDMENTS-2026-10-18s.md`
  (273 lines, md5 `76fb99dc3b4fbcec1171c6e56db8aaf5`), each line.
- All thirteen `*.verdict.json` (loaded as JSON; every correction's `kind`, `file`, `old`, `new`, `reason`; every
  ruling's verdict): 417 corrections — 357 `research`, 52 `record`, 8 `design` — and 371 rulings, the counts file s
  gives. The eight `design` corrections read whole, old and new, and the one `record` correction on a design file
  (`small.verdict.json` idx 10, `docs/ARCHITECTURE.md` l. 5).
- `docs/AMENDMENTS-2026-10-17q.md` whole (920 lines) for the form; `docs/validation/retrovalidation-2026-10-18/prosperity.md`
  :1–60 and :100–115 (V-2, the §4 AMENDED row, the list of V13 passages the validator read at `:11`).
- The targets as they stand (V13 `a896c8db…` 4,465 lines; V14 `70d8aa1b…` 3,213; INDEX `b19971d3…` 259; the base
  `1f871a01…`; the bundle `0e58a72f…`) and the pre-application snapshots other lanes kept in the scratchpad
  (`retro/states/after_r__volumes_V13-world.md` = `c8759307…`, `…V14-sites.md` = `a1c6d7c2…`, `…INDEX.md` = `39b0c519…`,
  `…ARCHITECTURE.md` = `b03ba26e…`), diffed whole against the current files.
- The owner's words J382 and J384 (the scratchpad's `J382.txt`, `J384.txt`), the host's prosperity band words
  (`src/generators/economy/prosperity.js:125`, read-only).

## Checks (each independent of the apply record's claims)

| check | method | result |
|---|---|---|
| every design correction landed | for each of the 8 `design` corrections: count `old` and `new` in its target file | old 0, new 1 in every case (V13 ×7, V14 ×1); the `record` one on the base (small idx 10): old 0, new 1 (apply-small's) |
| file s quotes the JSON exactly | parse each item's *Current text*, *New text* and the verbatim *Reason* out of file s and compare to `old`, `new`, `reason` of the correction it names | all 8 equal, byte for byte (⏎ unfolded for item 935) |
| the lane's own items on disk | items 927, 930, 936, 938: new text counted in the target | each once (927 and 936 keep their quote as their first line, as file s says) |
| nothing else moved | `diff` of each target against its snapshot | V13: exactly the 9 fragments (the note after l. 104; ll. 812, 953, 1100, 2454, 3184, 3339, 3367, 3392–3394 as file s gives them). V14: the 2 fragments (the note after l. 70; l. 795) plus l. 65, apply-small's notice replacement. INDEX: l. 14 only. The base: l. 5 only (apply-small's). No other line differs |
| the notice lines | grep `PENDING FABLE REVIEW` and `J375)` over V13, V14, INDEX, SUMMARY, the base, `docs/design/*.md`, the brief, files a–s | no J375 notice left in any design text; V14 l. 65 and the base l. 5 carry `small.verdict.json`'s `notice_replacement` verbatim. The eight notices that remain (V13 :3, :4439; V14 :3, :3182; INDEX :3–4; SUMMARY :3–4) are the J339/J84 architect- and integration-seat notices "covered by the whole-design retrovalidation (J84)", not J375's — outside this retrovalidation's scope |
| the bundle | `python3 tools/bundle_architecture.py --check` | `UP TO DATE`, exit 0; md5 `0e58a72fb14caa61f473987f583b1a57`; 81,080 lines by split (81,079 newlines); every one of the 9 design-file new texts and the 4 own-item texts occurs once in it, every old 0 |
| file s's tallies | `rulings[].verdict` counted per JSON | the thirteen rows of file s's table match exactly (e.g. prosperity 52: 41/10/0/1; population 16: 11/3/1/1) |
| file s's form | against file q whole | the same parts: title, numbering line, status line, items summary, *How to read an item*, the clean-room rule, *Where the sources were not taken verbatim*, *Not items*, items in volume-then-index order with section, title, source, line, current text, new text, reason, tagged evidence; verification record and final list. *From:* replaces q's *Requests:* (a validator's correction has no request to carry); each item names its target file, quotes current and new text exactly and gives the validator lane with its verdict-JSON index — the task's four requirements |
| the clean-room claim | the new texts' code spans and the word "Moderate" | every code span already in its target; "Moderate" new to V13 (now :3405–3406 only), the host's displayed band word (`prosperity.js:125`), in the validator's own text; the lane's own texts say "the middle rung" — the fourth of the seven-word ladder V13 §2.2 names, so exact |
| item 930 (the lane's own carriage of prosperity D-1) | prosperity.md `:11` and `:50`; V13 :1113 in context | confirmed: §2.3 is not among the V13 passages the validator read; the row's "realm-wide" is the word D-1 removed and its claim (a relative rung is not inflated by a common drift) is kept; the new text says the drift as the validator's note does. Judged sound and **kept**. J384 (1)'s rationale (`docs/PROGRESS.md:443`, session text under the owner's "i leave all judgemtn to you") is not re-judged here; the owner's quoted words are untouched |
| items 927, 936, 938 (bookkeeping) | against the series' form (q 897, 918; r 926 (a), (i)) | in form; the V13 note's item range 927–935 and the V14 note's 936–937 are right; INDEX :14 names file s and its status line, which names the record |
| the *Not items* sweep | re-grep of the corrected phrases and of "upward", "drift", "ratchet" over V13, V14, INDEX, SUMMARY, the base, the proposals and the brief | every listed hit confirmed (V13 :3160 §5.8 (3) both halves of the corrected law; :798 and H28 :3766 "a conversion's strongest carrier"; V14 :2066–2067 the wrapped "file⏎suffix of the multi-floor convention"); SUMMARY has no affected claim; the proposals and the brief none. **One hit unlisted: V13 :3860, J-V13.83** (finding 1) |

## Findings

**1. J-V13.83 (V13 §9, :3860) still states the pre-correction law as the rejected option's reason.** The row reads
"over the absolute rung (the host's band ratchets upward realm-wide, so every reach would inflate together over the
years)". The prosperity validator (V-2, D-1) found the band polarises and drifts upward in aggregate as the usual
case, not a law, and that the relative choice rests on the polarisation, not the direction; it read §2.2, §3.9 (7),
§5.8 (3), §5.8 (6), §5.9 (7), T-V13-55 and H29 (`prosperity.md:11`), not §9. The apply lane carried D-1 to §2.3's row
(item 930) on the ground that two texts of one volume stating one law two ways leave the implementer to choose, and its
record says its "upward" sweep over V13 found every hit a target or a listed *Not item*; :3860 contains "upward" and is
neither — the sweep claim is wrong by one, and a reader of the decisions log still learns the law as it was. The
ruling stands (the validator: "J384 (1)'s choice of relative is unaffected and stands"); the fix is the series' form
for an amended rationale, a dated bracket inside the parenthesis, carried as file s item 939 with the bookkeeping
below. Severity: low (a decision row's reason; no constant, schema or lens text).

**2. Item 927's note overstates the validator's text.** V13 :112 (and file s item 927's new text) says the band
"drifts upward in aggregate **only** where most seats start there"; the validator wrote "drifts upward in aggregate
where generation seeded most seats at Moderate or better, the usual case for connected seats", and V-2 that "the
aggregate direction depends on how many settlements generation seeds at Moderate or better". "Only where most" makes
a sufficient condition a necessary one (with Wealthy at +0.43 and Struggling at −0.21 a tradition-year, fewer than
most can still carry the mean upward). Severity: low (a revision note).

## The exact fixes (each anchor occurs exactly once in its file as it stands; apply in this order, then regenerate the bundle)

(a) `docs/volumes/V13-world.md` :3860 — replace
`over the absolute rung (the host's band ratchets upward realm-wide, so every reach would inflate together over the years), continuous re-reading`
with
`over the absolute rung (the host's band ratchets upward realm-wide, so every reach would inflate together over the years — *amended 2026-10-18 by the Fable retrovalidation's prosperity lane (file s item 939): the band polarises and drifts upward in aggregate as the usual case, not a law; the relative choice rests on the polarisation, not the direction, and stands*), continuous re-reading`.

(b) `docs/volumes/V13-world.md` :112 and `docs/AMENDMENTS-2026-10-18s.md` item 927's new text — replace
`drifts upward in aggregate only where most seats start there, the` with
`drifts upward in aggregate where most seats start there, the usual case, the` (once in each file).

(c) `docs/volumes/V13-world.md` :105 and file s item 927's new text — replace
`items 927–935; the Fable retrovalidation of` with `items 927–935 and 939; the Fable retrovalidation of` (once in each file).

(d) `docs/volumes/INDEX.md` :14 and file s item 938's new text — replace
`items 927–938: the Fable retrovalidation's corrections to volumes 13 and 14, 2026-10-18` with
`items 927–939: the Fable retrovalidation's corrections to volumes 13 and 14, 2026-10-18` (once in each file).

(e) `docs/AMENDMENTS-2026-10-18s.md` — add item 939 before the line `### Volume 14 — the revision notes under the title`, in item 930's form:
`### Volume 13 — §9 Decisions (J-V13.83)` / `**939.** **J-V13.83's rejected absolute rung: its reason bracketed as the retrovalidation amended it.**` / *From:* the confirm-design check's finding 1 (Fable; `confirm-design.md`), the carriage of retrovalidation/prosperity's D-1 (`prosperity.verdict.json` correction 41, V-2) to the decisions log; not in the validator's list (`prosperity.md:11`). / *Target:* `docs/volumes/V13-world.md`, line 3860 as it stood before this item. / *Current text:* the fragment of (a) above, quoted. / *New text:* (a)'s replacement. / *Reason:* the validator's V-2 reason verbatim (as item 935 quotes it) and: the row's rejected option keeps its reason as given, bracketed so the decisions log says what the retrovalidation found; the ruling stands. / *Evidence:* [STATED] `prosperity.md:50`, `:109`; [OBSERVED] `docs/volumes/V13-world.md:3860`, `:3802` (J-V13.25's italic dated note, the §9 form for a later amendment); item 930.
Then the counts: replace `Items 927–938: 12 change items, one fragment each, to `docs/volumes/V13-world.md` (9, items 927–935),` with `Items 927–939: 13 change items, one fragment each, to `docs/volumes/V13-world.md` (10, items 927–935 and 939),`; replace `all 12 change items 927–938 applied, all 12 fragments matched exactly once at their turn, no adjustment needed; no item not applied;` with `all 13 change items 927–939 applied (939 added by the confirm-design check, 2026-10-18), all 13 fragments matched exactly once at their turn, no adjustment needed; no item not applied;`; replace `| 1 (V13 §5.9 (7)) | 935 (and 930) |` with `| 1 (V13 §5.9 (7)) | 935 (and 930, 939) |`; replace `**The final item list and targets** (12 items, 12 fragments)` with `**The final item list and targets** (13 items, 13 fragments)`; replace `935 (§5.9 (7) drift note); V14` with `935 (§5.9 (7) drift note), 939 (J-V13.83); V14`.

(f) `docs/validation/retrovalidation-2026-10-18/apply-design.md` — replace
`every hit is a target
  of this file or is listed in file s's *Not items* with its reason` with
`every hit but one is a target
  of this file or is listed in file s's *Not items* with its reason — the one, J-V13.83 :3860 (the rejected absolute rung's reason), found by confirm-design and carried as file s item 939`.

(g) `cd /home/user/maps-architecture && python3 tools/bundle_architecture.py && python3 tools/bundle_architecture.py --check` — exit 0.

Everything else is confirmed as the apply lane recorded it; no other fix.

Scratch: `/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/retro/confirm-design-corrections.txt`
(the eight design corrections and the one base record correction, with their on-disk counts).

**LANDED** 2026-10-18 (see the lane line).
