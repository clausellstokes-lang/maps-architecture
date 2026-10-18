# retrovalidation/confirm3-design — the confirming re-check after fix2-design (amendments file s)

Lane retrovalidation/confirm3-design (Opus 5.5, high; the owner's J394, 2026-10-18 ~09:05Z: with a quarter of the Fable
allowance left, confirmation re-checks run on Opus and Fable is kept for critique; J390 otherwise). Started 2026-10-18
09:14 UTC, written as the lane went. Under check: the whole chain on retrovalidation/apply-design's work
(`apply-design.md`; `docs/AMENDMENTS-2026-10-18s.md`, items 927–939) — confirm-design (Fable, FAIL narrowly, 2 findings)
→ fix-design (Opus, 05:51) → confirm2-design (Opus, FAIL narrowly, 2 findings, 09:12) → fix2-design (Opus, LANDED 09:14).
The lane task named fix-design as the last pass; on reading the lane log, confirm2-design and fix2-design had already
landed, so this check confirms both rounds. Nothing was edited by this lane but this file and its lane line; every
script ran as `python3 -I` and only reads; no git command was run; the host repository was not touched.

## Verdict

**PASS.** All four findings (confirm-design's two, confirm2-design's two) are fixed exactly as specified and nothing
else moved: two independent reconstructions — confirm-design's strings parsed from `confirm-design.md` applied to
fix-design's before copies, then confirm2-design's strings parsed from `confirm2-design.md` applied to fix2-design's
before copies — are byte-identical to every file as it stands (V13, file s, INDEX, `apply-design.md`); no design text
moved outside the fix lanes; all eight design corrections (and the one record correction on the base) are in their
targets once, old texts gone, in the bundle likewise; file s's thirteen items and thirteen tally rows are exact against
the targets and the verdict JSONs; no J375 notice remains in any design text; the bundle is up to date. No finding.

## What I read, whole

`confirm-design.md`, `fix-design.md`, `confirm2-design.md`, `fix2-design.md` (and its `apply.py`), `apply-design.md`;
`docs/AMENDMENTS-2026-10-18s.md` (298 lines, every line); all thirteen `*.verdict.json` loaded as JSON (every
correction's kind, file, old, new, reason; every ruling's verdict); `prosperity.md` :50 and :109; the apply-notices
`README.md` *What was left*; V13 :105-117 (file s's note), :3860, and every V13 line holding "upward", "ratchet" or
"realm-wide"; the diffs of every before copy against its successor.

## Checks

| # | check | method (command / script) | count / result |
|---|---|---|---|
| 1a | targets as fix2-design left them | `md5sum` | V13 `d0de9ad8dadfeccc89ac86f2ea4d62f4` (4,465 lines), file s `3b83b3af9a0fc3ce818d1d2ad1039da8` (298), bundle `bbe57b8b682f378fd616e3342bb94d8b` — fix2-design's "after"; INDEX `4288179616d26f75b3d717deb23ed0ce`, `apply-design.md` `a4a0fd03064c9392b88d36fd0d2a6102` — fix-design's "after", untouched since; V14 `70d8aa1b3c14e7cab6a135adbd3caa00`, base `1f871a01961de8a4994125d7bb1993be` — as every earlier check read them |
| 1b | the before copies | `md5sum retro/fix-design/before/* retro/fix2-design/before/*` | fix-design's: V13 `a896c8db…`, INDEX `b19971d3…`, file s `76fb99dc…`, apply-design `fe3a9650…` (confirm-design's md5s); fix2-design's: V13 `09fbe522…`, file s `090329b6…`, bundle `ef177d68…` (fix-design's "after") |
| 1c | round 1 reconstruction | `retro/confirm3-design/recon1.py`: (a)–(d), (f) and (e)'s five count pairs parsed from `confirm-design.md`'s own backtick spans; each old asserted once, each new once after; item 939's block inserted before `### Volume 14 — the revision notes under the title` and checked field by field (1e) | V13 == fix2's before (`09fbe522`), file s == fix2's before (`090329b6`), INDEX == current (`42881796`), apply-design == current (`a4a0fd03`): **4/4 EQUAL** |
| 1d | round 2 reconstruction | `retro/confirm3-design/recon2.py`: (a)–(d) and (e)'s anchor line and fenced paragraph parsed from `confirm2-design.md`; applied to fix2's before copies | V13 == current (`d0de9ad8`), file s == current (`3b83b3af`): **2/2 EQUAL** |
| 1e | item 939 as confirm-design (e) asks | `recon1.py` | heading `### Volume 13 — §9 Decisions (J-V13.83)`; *Current text* == (a)'s old, *New text* == (a)'s new; the *Reason*'s quotation == `prosperity.verdict.json` correction 41's `reason` (kind design) and present in item 935; *From*, *Target*, *Current*, *New*, *Reason*, *Evidence* once each, [STATED] and [OBSERVED] present; `prosperity.md:50` and `:109` hold the quoted words |
| 1f | the diffs | `diff` before copy vs successor | round 1: V13 3 hunks (:105, :112, :3860), INDEX 1 (:14), file s 9 (:5, :7, :27, :91, :98, +12 at :204, :253, :282, :284), apply-design 1 (:101-102); round 2: V13 2 (:107, :116), file s 5 (:5, :93, :102, :104, +13 after :272) — each hunk one of the specified fixes |
| 1g | no other drift (the sites-roads design seats edit only their folder) | `find . -path ./.git -prune -o -type f -newermt '2026-10-18 05:50:30' -print`; `stat` | design texts newer than fix-design: V13 and file s (09:13:31, fix2), bundle (09:13:41, fix2's regeneration), INDEX (05:50:36, fix-design); V14 05:30, base 05:27, SUMMARY and the brief 00:24, `docs/design/*.md` and `_parts` 2026-10-17. The rest are records (`docs/validation/{host-requirements,m0-coverage,sites-roads}-2026-10-18/*`, the retrovalidation records, `STATUS.md`, `HANDOFF.md`, `PROGRESS.md`, the lane log, one `session-state` file) — none a design text; sites-roads wrote only `design-{A,B,C}.md` in its folder. **No drift** |
| 2a | every design correction in its target once, old gone | `retro/confirm3-design/check23.py`: every correction of kind `design` or whose file is V13, V14, INDEX, SUMMARY, the base, the brief or `docs/design/*.md` | 9: 8 design (amendments 0, 1; faith 57; lenses 38; population 44; prosperity 41; rulings 0 → V13; small 9 → V14) + small 10 (record, the base): old 0, new 1 in the target, new 1 / old 0 in the bundle — **9/9** |
| 2b | file s states each as its JSON gives it | the same script, whitespace-normalised, blockquotes unfolded | the 8 design corrections' new, old and reason found in file s (prosperity 41's old with ⏎ unfolded, item 935 — exact); small 10 is a *Not item* (record lane's), as file s says |
| 2c | file s's 13 items against their targets | `retro/confirm3-design/items.py` | new once in its target for all 13 and once in the bundle for the 12 bundled ones (INDEX :14 once in the bundle too); current 0 for the 11 replacements; 927 and 936 current 1 as the prefix of their new; all six fields and an evidence tag in every item; numbers 927–939 each once |
| 3a | file s's tallies | `check23.py` | 13/13 table rows exact (verdict, ruling count, per-verdict counts, design-correction count); totals 371 rulings, 417 = 357 research + 52 record + 8 design — as file s states |
| 3b | file s complete in file q's form | read whole | title, numbering, status line (13 items, 939's adder and applier named), items line (10/2/1), table, *How to read an item*, clean-room rule, *Where the sources were not taken verbatim*, *Not items*, items in volume-then-section order (939 after 935, before V14), verification record with the first pass and the confirm/fix/confirm2 paragraph, final list (13 items, 939 named). Complete |
| 4 | no J375 notice in a design text | `grep -rnc "PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat"` over V13, V14, INDEX, SUMMARY, the base, `docs/design/*.md`, `docs/design/_parts/*.md`, the brief, every `docs/AMENDMENTS-*.md`, the bundle; then `grep -rn "Opus 5.5 standing in"` | **0** (grep exit 1); the second grep's one hit is file n :1954, a record sentence, not a status line. The `PENDING FABLE REVIEW` lines left (V13 :3, :4439; V14 :3, :3182; INDEX :3-4; SUMMARY :3-4; files c, f, k) are the J84/J339/older notices the apply-notices `README.md` (*What was left*, :117-130) lists as out of J375's scope |
| 5 | the bundle | `cd /home/user/maps-architecture && python3 tools/bundle_architecture.py --check` | `UP TO DATE`, **exit 0**; md5 `bbe57b8b…` |
| — | the "upward" sweep after both rounds | `grep -n "upward\|ratchet"`, `grep -n realm-wide` over V13; `grep -ln "upward realm-wide\|realm-wide upward"` over the volumes, base, proposals, brief | V13 hits :82, :112, :1113, :1887, :3160, :3405-3406, :3614, :3721, :3860 — each a target, a listed *Not item* or not the band (as confirm2 found, unchanged); the only "upward realm-wide" left anywhere is :3860's bracketed old reason, amended in place by item 939 |

## Ruled not defects (with the evidence)

- The verification record's confirm paragraph (file s :274-285) narrates confirm2-design's finding and its result
  (V13 `09fbe522…` → `d0de9ad8…`) without naming fix2-design as the lane that applied it. It is confirm2-design's
  exact text, applied verbatim (check 1d); every claim in it is true of the files now (check 1a), the result md5 it
  gives is the current V13, and fix2-design's record sits beside it. Nothing in it is wrong or missing to a reader
  who wants what changed; not a defect.
- The apply-notices `README.md` lists 39 corrections not applied (05:35Z): none is of kind `design` or on a design
  text (check 2a covers every such correction, 9/9 applied), so none falls to this lane.

Scratch (scripts; nothing in them writes a target):
`/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/retro/confirm3-design/`
(`recon1.py`, `recon2.py`, `check23.py`, `items.py`).

**LANDED** 2026-10-18 (see the lane line).
