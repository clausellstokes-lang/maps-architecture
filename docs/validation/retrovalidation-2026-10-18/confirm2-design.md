# retrovalidation/confirm2-design — the confirming re-check after fix-design (amendments file s)

Lane retrovalidation/confirm2-design (Opus 5.5, high; the owner's J394, 2026-10-18 ~09:05Z: with a quarter of the
Fable allowance left, confirmation re-checks run on Opus and Fable is kept for critique; J390 otherwise). Started
2026-10-18 09:06 UTC, written as the lane went. Under check: retrovalidation/fix-design (Opus 5.5; `fix-design.md`,
LANDED 05:51), which applied the two findings of retrovalidation/confirm-design (Fable; `confirm-design.md`, FAIL
narrowly) to retrovalidation/apply-design's work (`apply-design.md`; `docs/AMENDMENTS-2026-10-18s.md`, items 927–939).
Nothing was edited by this lane but this file and its lane line; every script ran as `python3 -I` and only reads.

## Verdict

**FAIL, narrowly — two findings, each low, each with its exact fix below.** Both of confirm-design's findings are
fixed exactly as it specified and nothing else moved (an independent reconstruction from the before copies and
confirm-design's own strings is byte-identical to all four files as they stand); all eight design corrections are in
their targets once with every old text gone; file s's thirteen tally rows match the verdict files; no J375 notice is
left in any design text; the bundle is up to date. The two findings are file s's own texts, which fix (c) only
half-carried: (1) item 927's revision note (V13 :105-116) now puts item 939 in its range but its list of changes leaves
out §9's J-V13.83; (2) file s's verification record still tells only the first application pass and names no
confirm-design finding, fix-design pass or after-md5 — file q's form records a later pass as its own paragraph (q
:856-868, "The reviser's re-check"). Fix-design named the second under *Seen, not changed* for the check; the owner's
no-deferral rule means it is ruled here.

## What I read, whole

- `confirm-design.md` (its verdict, its reading list, the eleven-row check table, both findings and fixes (a)–(g));
  `fix-design.md`; `apply-design.md`; `docs/AMENDMENTS-2026-10-18s.md` (285 lines, every line); the four before copies
  fix-design kept (`retro/fix-design/before/`) and its `apply.py`.
- All thirteen `*.verdict.json`, loaded as JSON: every correction's kind and file (417: 357 research, 52 record, 8
  design) and every ruling's verdict (371); every design correction's old, new and reason; the one record correction
  on a design file (`small.verdict.json` idx 10, the base l. 5).
- V13's revision notes (:1-116), J-V13.25 :3802, J-V13.83 :3860, the §9 heading :3774, and every V13 line holding
  "upward", "ratchet" or "realm-wide"; INDEX :14; V14 :71; `prosperity.md` :11, :50, :109; file q's verification and
  review records (:843-920) for the form; the apply-notices lane's `README.md` :1-210.

## Checks

| # | check | method (command / script) | count / result |
|---|---|---|---|
| 1a | the targets are as fix-design left them | `md5sum` of V13, V14, INDEX, SUMMARY, the base, file s, `apply-design.md`, the bundle | V13 `09fbe522c52b4b1c7c89e7c243f0f19d`, INDEX `4288179616d26f75b3d717deb23ed0ce`, file s `090329b6c51ca9abe907a8970acc5677`, `apply-design.md` `a4a0fd03064c9392b88d36fd0d2a6102`, bundle `ef177d681015a4a8edb471810b02c527` — each equal to fix-design's "after"; V14 `70d8aa1b…` and the base `1f871a01…` equal to what confirm-design read |
| 1b | fix-design's before copies are the files confirm-design read | `md5sum retro/fix-design/before/*` | V13 `a896c8db…`, INDEX `b19971d3…`, file s `76fb99dc…` — confirm-design's md5s; `apply-design.md` `fe3a9650…` |
| 1c | each fix exactly as confirm-design specified, nothing else | `retro/confirm2-design/recon.py`: parses (a)–(f)'s strings out of `confirm-design.md` itself (not fix-design's script), asserts each old once in the before copy and each new once after, applies them (file s: the five count replacements of (e), (b), (c), (d), and the 12-line item-939 block before `### Volume 14 — the revision notes under the title`) and compares to the file now | V13, INDEX, file s, `apply-design.md`: reconstruction **== current, byte for byte** (4/4) |
| 1d | the diffs | `diff -U0` before copy vs current | V13 3 hunks (:105, :112, :3860), INDEX 1 (:14), file s 9 (:5, :7, :27, :91, :98, +12 at :204, :253, :282, :284), `apply-design.md` 1 (:101-102) — fix-design's count |
| 1e | item 939 as (e) asks | the block parsed: *Current text* = (a)'s old, *New text* = (a)'s new (each once); the *Reason*'s quotation compared with item 935's *Reason* and with `prosperity.verdict.json` correction 41's `reason`; the evidence lines read | 1 / 1; quotation == item 935 == the JSON; `prosperity.md:50` holds "what it establishes is polarisation" and "\"upward in aggregate\" is the usual case, not a law", `:109` "V13 §5.9 (7) note amended (D-1); J384 (1)'s choice of relative is unaffected and stands"; V13 :3802 is J-V13.25's italic dated note; heading in file s's form (V13's §9 is "## 9 Decisions", :3774); placed after 935, before V14 — volume-then-section order |
| 1f | no drift by any other lane (the sites-roads design seats edit only their folder) | `find . -path ./.git -prune -o -type f -newermt '2026-10-18 05:50:30' -print` | design texts newer than fix-design's write: only V13, INDEX, file s (05:50:36) and the bundle (05:50:46), all fix-design's; the rest are `docs/validation/sites-roads-2026-10-18/design-{A,B,C}.md`, `docs/validation/host-requirements-2026-10-18/*`, `STATUS.md`, `HANDOFF.md`, `PROGRESS.md`, the lane log, `apply-design.md`, `fix-design.md` and one `session-state` file — none a design text; no drift |
| 2a | every design correction in its target once, old gone | `retro/confirm2-design/check2.py` over all 13 verdict files: for each correction of kind `design` or whose file is a design text, count old and new in the target and in the bundle | 8 design (V13 ×7, V14 ×1) + 1 record on the base: old 0, new 1 in the target and in the bundle, every one (9/9) |
| 2b | file s states each one as its JSON gives it | the same script and `check2b.py` (item 935 multi-line: ⏎ unfolded, `> ` stripped) | the 8 design corrections' old, new and reason each found in file s; item 935's current and new == the JSON |
| 2c | file s's 13 items against their targets | `items.py`: each item's *Target*, *Current text*, *New text* parsed and counted; the six fields and the evidence tags present | new text once in its target for all 13; current 0 for the ten replacements; 927 and 936 keep their quote as their first line (cur 1, prefix of new); 938's current ends with the period its new text replaces (0); every item has *From*, *Target*, *Current*, *New*, *Reason*, *Evidence*, each tagged; item numbers 927–939 each once |
| 3a | file s's tallies | `tally.py`: each table row's verdict, ruling count, per-verdict counts and design-correction count against its JSON | 13 / 13 rows exact; the totals line (371 rulings; 417 = 357 + 52 + 8) recomputed: exact |
| 3b | file s complete in file q's form | read whole against q (title, numbering, status, items line, table, *How to read an item*, clean-room rule, *Where the sources were not taken verbatim*, *Not items*, items, verification record, final list) | the parts present and in order; item 927's note and evidence and the verification record incomplete after item 939 — **findings 1 and 2** |
| 4 | no J375 notice in a design text | `grep -rn "PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat"` over V13, V14, INDEX, SUMMARY, the base, `docs/design/`, the brief, every `docs/AMENDMENTS-*.md` and the bundle; then `grep -rn "Opus 5.5 standing in\|J375)"` over the same | 0; the second grep's one hit is file n :1954, a record sentence ("Reviser seat (Opus 5.5 standing in for the Fable seat; the notice under the title holds)"), not a status line. The `PENDING FABLE REVIEW` lines left (V13 :3, :4439; V14 :3, :3182; INDEX :3-4; SUMMARY :3-4; files c, f, k) are the J84 and J339 notices, outside J375, as the apply-notices `README.md` (*Notices*) lists and explains; file s carries none |
| 5 | the bundle | `cd /home/user/maps-architecture && python3 tools/bundle_architecture.py --check` | `UP TO DATE`, **exit 0**; md5 `ef177d68…`; item 939's new text 1 and its old 0, "only where most" 0, "items 927–935 and 939" 1 |
| — | the "upward" sweep after the fix | `grep -n "upward\|ratchet" V13`; `grep -n realm-wide V13`; the same words over SUMMARY, INDEX, V14, the base, the brief, `docs/design/*.md` | V13 :82 (file n's note: "prosperity ratchet"), :112 (item 927), :1113 (item 930's row), :1887 (a member link upward — not the band), :3160 (§5.8 (3), a listed *Not item*), :3405-3406 (item 935), :3614 (T-V13-55, read by the validator), :3721 (first-paint ratchet — not the band), :3860 (item 939); "realm-wide" only at :799 (a realm arc's seats) and :3860 inside the bracketed old reason; no prosperity-drift hit outside V13 |

## Findings

**1. Item 927's note names item 939 in its range but not its change.** V13 :105 (and file s :91) now reads "items
927–935 and 939", but the note's list — "Changed, each text a validator's correction taken whole save §2.3's
prosperity row: …" (V13 :106-116, file s :92-102) — names every V13 change but §9's J-V13.83, and its "save" clause
names one non-validator text where there are now two; item 927's evidence still says "items 928–935 (the V13 changes
it lists)" (file s :104). The note's purpose is the item's own [INFERRED] line: "a reader of the volume learns what
changed from its own notes". Fix (c) as confirm-design gave it updated only the range. Severity: low (a revision
note).

**2. File s's verification record tells only the first pass.** :261-272 narrate apply-design's 12 fragments and give
V13 `a896c8db…` and INDEX `b19971d3…` as "After", both superseded; no paragraph records confirm-design's two
findings, fix-design's pass or its md5s, and the status line (:5) says the 13 items were applied by
retrovalidation/apply-design though item 939 was applied by retrovalidation/fix-design (its own *From:* says so).
File q records a second pass as its own paragraph in the verification record (q :856-868). Fix-design named this
under *Seen, not changed*; it is ruled a finding here. Severity: low (a record paragraph).

## Ruled not defects (with the evidence)

- *Where the sources were not taken verbatim*, (c) "nothing else": item 939's new text is taken verbatim from its
  source, confirm-design's fix (a) (check 1c), and its *From:* names that source; (b) is about the applying seat's own
  carriage (930), which 939 is not. True as it stands.
- The J-V13.83 bracket's "amended … by the Fable retrovalidation's prosperity lane (file s item 939)": the finding it
  carries is prosperity's D-1 / V-2 (`prosperity.md:50`), and the bracket cites item 939, whose *From:* gives the
  carriage by the confirm check. Accurate provenance; confirm-design's exact text.
- `apply-design.md` :101-102: after fix (f) the parenthesis "(V13 :785 and H28 :3753 … ; :3147 above)" follows the
  item-939 clause; its three lines are file s's listed *Not items* (:67-70), so no claim is wrong. confirm-design's
  exact text.
- The apply-notices `README.md` :22-23 "items 927–938, lane apply-design": it says where the design corrections went;
  the eight are items 928–935 and 937, inside 927–938; item 939 is not a verdict correction. True as it stands.

## The exact fixes (each old occurs exactly once in its file as it stands now; apply in this order, then regenerate the bundle)

Finding 1:

(a) In `docs/volumes/V13-world.md` (:107) and in `docs/AMENDMENTS-2026-10-18s.md` (:93), replace
`taken whole save §2.3's prosperity row:` with `taken whole save §2.3's prosperity row and §9's J-V13.83:`
(once in each file).

(b) In `docs/volumes/V13-world.md` (:116) and in `docs/AMENDMENTS-2026-10-18s.md` (:102), replace
`trend; §5.9 (6)'s pressure row puts an overlord's authority over its vassal above a war front.` with
`trend; §5.9 (6)'s pressure row puts an overlord's authority over its vassal above a war front; §9's J-V13.83 keeps the rejected absolute rung's reason under a dated bracket saying the band polarises, the relative choice standing.`
(once in each file).

(c) In `docs/AMENDMENTS-2026-10-18s.md` (:104), replace `items 928–935 (the V13 changes it lists)` with
`items 928–935 and 939 (the V13 changes it lists)`.

Simulated in memory (`retro/confirm2-design/simulate.py`, nothing written): each old once, each new once after; item
927's new text, unfolded, still occurs once in V13; V13 after (a)–(b) is `d0de9ad8dadfeccc89ac86f2ea4d62f4`, 4,465
lines.

Finding 2:

(d) In `docs/AMENDMENTS-2026-10-18s.md` (:5), replace `(939 added by the confirm-design check, 2026-10-18)` with
`(939 added by the confirm-design check and applied by retrovalidation/fix-design, 2026-10-18; the verification record gives both passes)`.

(e) In `docs/AMENDMENTS-2026-10-18s.md`, replace the line `("UP TO DATE"); every new text occurs once in the bundle.`
(:272, once) with that same line followed by an empty line and this paragraph:

```
The confirm check and its fixes (2026-10-18). retrovalidation/confirm-design (Fable 5.1 high, 05:37–05:46 UTC; record
`docs/validation/retrovalidation-2026-10-18/confirm-design.md`) returned this file with two findings: (1) J-V13.83 (V13
:3860) still gave the rejected absolute rung the pre-correction law as its reason, the one "upward" hit the sweep had
missed — item 939 added, item 927's range, item 938's `items 927–939` and this file's counts updated; (2) item 927's note
said the band drifts upward in aggregate "only where most seats start there", a sufficient condition made a necessary
one — "only" removed and "the usual case" added, in V13 and in item 927 alike. retrovalidation/fix-design (Opus 5.5
high, 05:49–05:51 UTC; record `fix-design.md` beside it) applied both as given, each old once before and each new once
after: V13 `a896c8db…` → `09fbe522…`, INDEX `b19971d3…` → `42881796…`, V14 unchanged. retrovalidation/confirm2-design
(Opus 5.5 high under J394, 2026-10-18 09:06 UTC; record `confirm2-design.md` beside it) confirmed both by reconstruction
and found item 927's note naming item 939 in its range but not its change: the note's list (in V13 and in item 927) and
item 927's evidence now name §9's J-V13.83, V13 `09fbe522…` → `d0de9ad8…` (4,465 lines). The bundle regenerated after
each pass; `--check` exit 0.
```

(f) `cd /home/user/maps-architecture && python3 tools/bundle_architecture.py && python3 tools/bundle_architecture.py --check`
— exit 0; then count (a)'s and (b)'s new texts once in the bundle and their olds 0.

Nothing else is owed by this check; everything else confirm-design and fix-design recorded is confirmed.

Scratch (scripts and simulation; nothing in them writes a target):
`/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/retro/confirm2-design/`
(`recon.py`, `check2.py`, `check2b.py`, `items.py`, `tally.py`, `simulate.py`, `V13.sim.md`).

**LANDED** 2026-10-18 (see the lane line).
