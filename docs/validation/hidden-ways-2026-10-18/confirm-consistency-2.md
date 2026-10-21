# Confirm: consistency of files w and x as applied (hidden-ways/confirm-consistency-2)

2026-10-19. Confirm-only, no edits to any target. The targets as file x's apply left them, re-hashed by this seat: V13
`799d0f72` (4 838 lines), V14 `1fcdce8e` (unchanged), HOST-REQUIREMENTS `6c664872`, INDEX `73b3c664`, SUMMARY `abf4d7ad`,
the bundle `docs/ARCHITECTURE-FULL.md` `bcc1640e`. Scripts, `python3 -I`, read-only:
`synth-scripts/confirm_consistency_2.py` (67 lines, md5 de40b39d; 158 checks) and `synth-scripts/confirm_figures_2.py`
(83 lines, md5 7af519b9; 77 checks); plus the bundle's `--check` (1).

**Verdict: PASS** — 236 checks, 0 failures. F1–F6 of `confirm-consistency.md` are closed.

## 1. The six residues, as the lines now read

- **F1** SUMMARY:136 — "about **457–622 person-weeks** (455–620 before the hidden ways' two weeks; the earlier 392–539
  plus the two". With SUMMARY:130 "about **39–47 person-weeks**" and :134 25.75–36.25: 392 + 39 + 25.75 = 456.75 ≈ 457;
  539 + 47 + 36.25 = 622.25 ≈ 622. Closed.
- **F2** INDEX:258 — "39–47 (37–45 before file w's two person-weeks on M-W2, the price the owner accepted on 2026-10-19,
  J421) and 25.75–36.25 pw among them". Agrees with INDEX:39 "39–47 as one staged row". Closed.
- **F3** SUMMARY:218 — "the two volumes' cost (37–45 and 25.75–36.25 person-weeks; the world's 39–47 since you accepted
  the hidden ways' two weeks on 19 October)". Closed (the 16 October figure kept as history, the current one stated).
- **F4** V13:4571–4574 — "**BCR-V13-37 — §16: the world's estimate.** The staged-milestone row ... reads 39–47 pw (M-W2
  widened by 2 pw for the sway, the patrols and the windows, and by 2 pw more by file w — ≈ 1 for the trods and ≈ 1 for
  the junction ends and the fork rule ... (§11 Q5, J421) ...), and the staged milestones' total moves by 11 pw at both ends
  (2 for the sway, 7 for the lenses, 2 for file w's trods and junction ends; 9 before file w, which §16's world line took
  as 37–45 by file o item 877, so that line moves 2 pw more, to 39–47)". 2 + 7 + 2 = 11; 28 + 11 = 39, 36 + 11 = 47.
  Closed: one request carries the +2 pw into §16.
- **F5** HRQ:143 — "| M-W2 | ... 10 person-weeks, 8 before file w, the price the owner accepted on 2026-10-19, J421 (V13
  §8.2, line 4001). |"; HRQ:146 — "M-W0 to M-W5 together are one staged row of 39 to 47 person-weeks, 37 to 45 before
  file w's two person-weeks on M-W2 (lines 4006–4007)." The cites hold: V13:4001 is the M-W2 row ("| 10 pw (file w's
  trods ≈ 1 pw"), V13:4006–4007 the sentence "The volume states no total of its own ... with the estimate range 39–47
  pw". Closed.
- **F6** Q5 answered at every place it is named: HRQ:717 "(V13 §11 Q5, answered by the owner on 2026-10-19, J421,
  following the map's recommendations ...)"; INDEX:186 "the owner answering it on 2026-10-19 by following the
  recommendation ... J421"; INDEX:225 "the owner's own answer, given 2026-10-19 (J421: "i follow your recommendations")
  ... (answered by the owner)"; SUMMARY:16 "that you answered on 19 October by following the recommendations";
  SUMMARY:173 "(file w, which you accepted on 19 October by following its recommendations ...)"; SUMMARY:223 "answered
  by you on 19 October"; SUMMARY:228 "You followed the recommendations on 19 October"; SUMMARY:240–241 "seven proceed on
  their recommendation until you say otherwise; two you answered on 18 October and one on 19 October" (7 + 2 + 1 = 10,
  the "ten decisions above"); V13:4219 J-V13.116 "put to the owner in Q5, answered on 2026-10-19 (J421)"; V13:4686
  "**Answered 2026-10-19 (J421):**"; V13:156 the revision note "Owner's word x". No line in the five targets still reads
  "pending your look", "open for the owner" or Q5 unanswered (scan: 0 hits). Closed.

## 2. Ids, items and § references (confirm_consistency_2.py: 158 checks, 0 failures)

- Ids cited in the 114 + 20 new texts, each defined once (59): every T-V13-n (with ranges expanded) as a §7 row, every
  J-V13.n (114–133 and the rest) as a §9 row, every Hn as a §8.5 row, H32 twice in HRQ as designed (the milestone row and
  the lens-dependency summary), `W_TROD_SPARSE`/`_UNJOINED`/`_CUT` and `W_ROUTE_JUNCTION_ORPHAN` code rows, `WORLD-18`,
  every BCR-V13-n head and BCR-V14-n row; whole-volume duplicate scans of T, J, H, BCR-V13 and BCR-V14 ids: none.
- Items (39): 955–975 once each in file w; 976–982 once each in `AMENDMENTS-2026-10-18x.md` and in `draft-x.md`; no
  other item number in file x; the items section ("## The items" to end, 20 569 characters) of file x equals draft-x's
  byte for byte; items cited by file x's new texts defined once (877 in file o, 976 in file x).
- File x's 20 fragments as the targets stand (49): each new text once in its target; no old text outside its own new
  text; the 9 V13 and INDEX new texts once in the bundle (SUMMARY and HRQ are not bundle sources).
- § references in file x's V13 new texts (11): §6, §7, §8.2, §8.5, §9, §10, §11 resolve to V13 headings; §16 is the
  base's. File w's 146 references were resolved by `confirm-consistency.md` §2; the lines file x rewrote are covered here.

## 3. Milestone figures and Q5 status (confirm_figures_2.py: 77 checks, 0 failures)

M-W2 10 pw and the staged row 39–47 agree at V13:4001, :4007, :4571–4573 (BCR-V13-37), :4674–4676 (Q5, "8 → 10",
"37–45 → 39–47"), :4687, :157; INDEX:39, :225, :258; SUMMARY:130, :136 (457–622), :218; HRQ:143, :146, :717. V13 §8.2's
row estimates 3 + 4 + 14 + 10 + 6 + 7 + 3 = 47, the range's high end. Every remaining "37–45", "37 to 45" or "455–620"
in the five targets is marked as the figure before file w (V13:4007, :4573, :4676; INDEX:258; SUMMARY:136, :218;
HRQ:146); no "8 pw"/"8 person-weeks" for M-W2 remains. Q5's places as in §1 F6, plus the open-wording scan.

## 4. The clean room (23 + 1 checks, 0 failures)

The 23 tokens of `confirm-consistency.md` §7 (`.js`/`.ts` as whole extensions, so `schema.json` is not a hit): 0 in
file x's V13 new texts; in the whole V13/V14 only the pre-existing hits the first confirm named — `research/sf` V13:37,
:48; `src/` V14:2864; `.ts` V14:2864, :2977, :3149, :3216.

## 5. The bundle (1 check, 0 failures)

`python3 -I tools/bundle_architecture.py --check` printed "UP TO DATE /home/user/maps-architecture/docs/ARCHITECTURE-FULL.md",
exit 0.

## Not failures (for the session)

- The base's §16 still has the world at 37–45: `docs/ARCHITECTURE.md:21765` (FULL:22075), and its totals 250.6–345.35
  (:21767) and 481.35–660.6 (:21768). This is the request mechanism: BCR-V13-37 now asks for 39–47. Applied, the totals
  would be 250.6 + 2 = 252.6 and 345.35 + 2 = 347.35, and 481.35 + 2 = 483.35 and 660.6 + 2 = 662.6, matching file x's
  report.
- HRQ's other milestone cites (V13 §8.2 "line 3674" ... "line 3680" on HRQ:140–146) are stale. They were stale before
  file w (`confirm-consistency.md` F5) and are outside both files.
- The ledger row for J421 in `docs/PROGRESS.md` was not checked. It is outside this confirm.

## Counts

158 + 77 + 1 = **236 checks; 0 failures.**
