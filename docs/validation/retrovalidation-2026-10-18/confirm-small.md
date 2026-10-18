# retrovalidation/confirm-small — the confirming check on apply-small

Lane retrovalidation/confirm-small (Fable 5.1, high; J390: Fable judges and validates, Opus verifies and applies; fable; J392).
Started 2026-10-18 05:44 UTC. Written as the lane goes. Scratch: `/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/retro/confirm-small/` (the six `diff -U0` files and `reconstruct.txt`).

**Verdict on apply-small: PASS.** Every one of the ten record corrections landed verbatim, nothing else in any of the
six files moved, the six notices are the verdict's `notice_replacement`, the bundle is fresh, and the one design
correction landed through the design lane with a well-formed file s item. No problem is the apply lane's. Two
observations are routed for J392 (below), each with its exact fix.

## 1 Read whole

- `docs/validation/retrovalidation-2026-10-18/small.verdict.json` (11 corrections: 10 `record`, 1 `design` (idx 9),
  0 `research`; none on `docs/PROGRESS.md`; 16 rulings; the `notice_replacement`; the summary).
- `docs/validation/retrovalidation-2026-10-18/apply-small.md` (the apply record) and the lane's `apply.py` and its six
  before copies in `…/scratchpad/retro/apply-small/`.
- `docs/AMENDMENTS-2026-10-17l.md` as it stands (288 lines) and `docs/validation/coherence/vtt-l.md` (59 lines), both
  whole after the apply; `plat/packages/kernel/API.md` whole (1,059 lines); `plat/docs/build/choices.md` l. 381
  (C-0374, the whole row, 2,814 characters) with l. 375–380 for context; `docs/ARCHITECTURE.md` l. 1–7 (the revision
  note at l. 5) and l. 5244–5250 (§3.6's held set); `docs/volumes/V14-sites.md` l. 1–4, 60–76 (the *Coherence l* and
  *Retrovalidation s* notes) and l. 798–802 (§2.4 `EncounterCrop.scenes`); the full before/after diff of each of the
  six files (`diff -U0`).
- `docs/validation/retrovalidation-2026-10-18/small.md` l. 80–125 (the correction table's tail and the verdict's
  notice paragraph naming the six files), `apply-design.md` (its rows for small idx 9 and the V14 md5 chain),
  `docs/AMENDMENTS-2026-10-18s.md` (head, items 936–937 whole, the verification record).
- The kernel at the cited lines: `plat/packages/kernel/src/warp/held.ts` l. 195–215 and `warp.ts` l. 330–346; the
  gate `plat/docs/build/checks/M0-world-sites-gate.md` l. 205–218.

## 2 Snapshots

The apply lane's before copies carry exactly the md5s and line counts its *Snapshots before* table states
(choices 2a511390… 381; API 43d7a1b8… 1,059; V14 a1c6d7c2… 3,208; base b03ba26e… 24,462; file l 6209eda5… 284;
vtt-l 0d45ae01… 59). The files now:

| file | lines | md5 now | = apply's *After* md5? |
|---|---|---|---|
| plat/docs/build/choices.md | 381 | 27d72b0cf9ea73c47a822bd89b11c36c | yes |
| plat/packages/kernel/API.md | 1,059 | 468a2d1e353b46a955bed2c283ec28e7 | yes |
| docs/volumes/V14-sites.md | 3,213 | 70d8aa1b3c14e7cab6a135adbd3caa00 | no — apply-design's *after* md5 (items 936–937 landed on apply-small's 8f2265ea…, see §4) |
| docs/ARCHITECTURE.md | 24,462 | 1f871a01961de8a4994125d7bb1993be | yes |
| docs/AMENDMENTS-2026-10-17l.md | 288 | 12576a2748facd8c68992509da94a2e1 | yes |
| docs/validation/coherence/vtt-l.md | 59 | 05ac43b6980b587bd25414c7aeb8d0b6 | yes |

No sibling has written any of the five files since apply-small landed (05:29); V14 was written once since, by
apply-design (05:30), as that lane's record states.

## 3 The corrections, re-checked independently

Method (my own, not the apply lane's script): for each file, count each correction's `old` and `new` in the before
copy and in the file now; then rebuild the file from the before copy by applying the verdict's strings in index order
and the notice replacement, and compare the rebuild byte for byte with the file now.

| idx | kind | file | old in before / now | new in before / now | note |
|---|---|---|---|---|---|
| 0 | record | API.md l. 55 | 1 / 0 | 0 / 1 | the §1 row's held clause |
| 1 | record | choices.md l. 381 (Scope) | 1 / 0 | 0 / 1 | |
| 2 | record | choices.md l. 381 (Rationale) | 1 / 0 | 0 / 1 | |
| 3 | record | file l l. 11–12 | 1 / 0 | 0 / 1 | across the wrap |
| 4 | record | file l l. 28–29 | 1 / 0 | 0 / 1 | across the wrap; the two lines re-wrapped as the verdict writes them |
| 5 | record | file l l. 162 (was 158) | 1 / 0 | 0 / 1 | item 654's quote with ⏎ |
| 6 | record | file l l. 37–40 | 1 / 0 | 0 / 1 | choice (f) with its dated bracket |
| 7 | record | file l l. 42 (new) + l. 44 | 1 / 1 | 0 / 1 | old is the new's last line (`*Not items* …`), so it survives once |
| 8 | record | vtt-l l. 19 | 1 / 1 | 0 / 1 | old is the new's prefix, so it survives once |
| 9 | design | V14 l. 800 (was 795) | 1 / 0 | 0 / 1 | landed by apply-design (file s item 937), not by apply-small — correct |
| 10 | record | base l. 5 | 1 / 0 | 0 / 1 | item 652 named |

Reconstruction: before copy + the verdict's strings + the notice line is **byte-identical** to the file now for
choices.md, API.md, the base, file l and vtt-l (md5s as in §2; trailing newline kept in all six). For V14 the
reconstruction (with idx 9 applied) differs from the file now by exactly one hunk: the five lines l. 70–74 (a blank
line and the four-line *Retrovalidation s* note) that apply-design's item 936 inserted. So in all six files nothing
moved beyond what the apply record states plus, in V14, the design lane's two fragments.

Hunk counts at `-U0`: choices 1 (one line, three edits on it), API 2, V14 3 (two apply-small's: l. 65 the notice and —
no: l. 65 only; the other two are apply-design's l. 70–74 insert and l. 800), base 1, file l 5, vtt-l 2 — as the apply
record's "choices 1 line, API 2, V14 1, base 1, file l 5 … hunks, vtt-l 2".

Line numbers in the apply table reproduced: API 17 and 55; choices 381; file l 11–12, 28–29, 158→162, 37–40, 40→42;
vtt-l 3 and 19; base 5; V14 65 (notice) and 795 (idx 9, then still the old text — now l. 800 with the new text).

## 4 The notices

`notice_replacement`, verbatim from the verdict: `> Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — applied as
recorded; the held-set clause and six wording and evidence points corrected (lane retrovalidation/small; J392)`.

- The J375 notice (`PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat coherence/vtt-l-and-k11;
  …`) occurred once in each before copy and occurs **0** times in each of the six files now; the only copy left in the
  repository is the one `apply-small.md` quotes (its record). `docs/ARCHITECTURE-FULL.md` carries it 0 times.
- Whole-line replacements (the line equals `notice_replacement`): API.md l. 17, file l l. 3, vtt-l l. 3 — each once.
- Inline replacements (the replacement's text without its `> ` marker, the rest of the line untouched): choices.md
  l. 381 (C-0374's Ruling cell, before the cell's closing ` | `), V14 l. 65 (before ". What changed:"), the base l. 5
  (after the bold revision clause, on the line correction 10 also edited). Judged right: the task's "every line
  beginning …" cannot reach a notice in the middle of a table cell or a note, the validator's record (small.md l. 95)
  names all six sites, and correction 10's reason says "with the notice replacement on the same line". The replacement
  text occurs exactly once in each of the six files.
- V14 l. 3 and l. 3182 (was 3177) carry the architect and integration seats' J339/J84 notices, not this family's;
  untouched, correctly.

## 5 The bundle

`python3 tools/bundle_architecture.py --check` at 05:46: **UP TO DATE, exit 0** (`docs/ARCHITECTURE-FULL.md`
81,079 lines, written 05:34 by apply-design's regeneration after its V13/V14/INDEX edits). The apply record's
"STALE, exit 1" was true at 05:29 and is superseded, as that record foresaw ("regenerated after [the design lane]
lands"). In the bundle now: the replacement notice twice (l. 315 the base's note, l. 77931 V14's), item 652's new
words once, V14 §2.4's new comment once, the J375 notice 0 times.

## 6 The design correction and amendments file s

Small idx 9 (V14 §2.4) is file s item **937**: its *Current text* is the verdict's `old` verbatim, its *New text* the
verdict's `new` verbatim, its *From* names `small.verdict.json` correction 9 / F-2 / R-3 and R-12, its *Reason* quotes
the validator's reason verbatim, its *Evidence* cites small.md and V14:795. Item **936** (file s's own bookkeeping,
"no validator asked for it") adds the *Retrovalidation s* note under V14's title, in the series' form; its quote is
V14's l. 69 kept as the new text's first line (so once after). Both landed (V14 l. 70–74 and l. 800). File s's
verification record states the V14 chain 8f2265ea… (apply-small's after) → 70d8aa1b… (now), matching §2. Complete
and well-formed for this family.

## 7 Not applied, and rightly

- No `research` correction; none on `docs/PROGRESS.md` (R-15: l. 434 is J375's own row, the owner's words quoted,
  nothing to replace) — the apply record lists it for J392 correctly.
- The lane log: one apply-small LANDED line (l. 9617, 05:29), its counts (16 fragments; 284 → 288 lines) as verified
  here. No CHECKPOINT line was owed (the lane ran 05:26–05:29).

## 8 Readings behind the corrections, spot-checked at source (for the record, not re-judged)

- `warp/held.ts` l. 204–205 declare `crossing` and `feet`; l. 207 `if (fromLevel !== 0 && carries(p, v, crossing))`;
  l. 208 the feet always; l. 209 the `VERTEX_PINNED` flag under `opts.smoothing`. `warp.ts` l. 330–331 and l. 340
  state and check that `fromLevel` is the batch's level — so API.md's "unless the batch's level is 0" and choices.md's
  "unless `fromLevel = 0`" say the same thing, and the base's §3.6 (2) at l. 5247 reads "unless `fromLevel = 0`".
  The corrected held-set clause is right in all three places.

## 9 For J392 (routed; none an apply-small defect)

1. **The source of the held-set misreading still stands in the gate.** `plat/docs/build/checks/M0-world-sites-gate.md`
   l. 209 reads "§3.6's held set (2)–(4) — crossing ends and raised feet are held" and l. 218 reads "set, §3.6
   (2)–(4)) as the kernel's defaults" (the verdict's R-1 and the apply record cite "l. 208–209, 216"; the two
   `(2)–(4)` strings are on l. 209 and l. 218). Outside this family (a Fable-spawned gate file), so no lane here may
   edit it. Exact fix, for the gate's next edit: l. 209 `§3.6's held set (2)–(4) — crossing ends and raised feet are` →
   `§3.6's held set (2)–(3) — crossing ends, unless fromLevel = 0, and raised feet are`; l. 218 `set, §3.6 (2)–(4))` →
   `set, §3.6 (2)–(3))`. No other `(2)–(4)` in the repository refers to §3.6's held set (grep checked: the others are
   V04/V05/V06/critique references to other numbered lists).
2. **The apply record's bundle paragraph is now historical.** `apply-small.md` *Bundle* says "STALE, exit 1 … the old
   notice text still stands in it at its l. 315 (base) and l. 77918 (V14) until the next regeneration" — true at 05:29,
   superseded at 05:34. Nothing to change (the record is the lane's dated account and says so); noted so no one
   re-finds it.

Status: COMPLETE — see the LANDED line in docs/lane-events.log.
