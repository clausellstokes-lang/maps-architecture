# Retrovalidation 2026-10-18 — critic-2 (Fable 5.1 high, the second look; fable; J392, under J394)

Lane `retrovalidation/critic-2` — the last seat of continuation 2, limited to the gaps (the owner's J394: confirmation
re-checks on Opus, Fable kept for critique; J390 otherwise). Started 2026-10-18 09:38 UTC; the checks 09:39–09:45Z,
the one fix applied 09:45Z, this record 09:46Z. Inputs read whole: `critic.md` (the Fable critic, 223 lines) and
`critic-round2.md` (the Opus close-gaps record, 1,154 lines), then the texts each gap names as they stand now (the 28
target files at the md5s `critic-round2.md` §1 gives, re-hashed here), `README.md` *What was left* and its close note,
`docs/PROGRESS.md` rows J390–J394, `docs/lane-events.log` from the critic's line on, and — for N-1 — the whole of
`docs/HOST-REQUIREMENTS-2026-10-18.md` (935 lines) with every file it points into. Rules obeyed: everything read before
characterizing; the owner's own words never re-judged; no deferral — every gap below ends FIXED or shown rightly open
with its reason; no git command; the host clone (81f1cd96) not opened — no gap needs a host fact; no file edited but
`docs/HOST-REQUIREMENTS-2026-10-18.md` (the N-1 fix), this record and the lane lines. Scripts and outputs under
`/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/retro/critic-2/`
(`check_gaps.py`, `extract_ptrs.py`, `map_ptrs.py`, `label_check.py`, `remap_hr.py`, their `.out` files,
`hr_edits.json`, `hr_record.json`, `hr.diff`, `HOST-REQUIREMENTS.before.md` / `.after.md`), each run as `python3 -I`.

Status: LANDED (see the lane line).

## Verdict in one paragraph

**The J375 body of work is closed in its texts as well as its substance.** The close-gaps lane applied the critic's 66
fragments exactly as specified: re-checked here from disk, 65 are verbatim (each new text once, each old gone) and the
66th, B-19, carries the one adjustment the lane recorded — its two plague-note pointers 533 → 531 and 674 → 672 — which
is right (A-prosperity-36, ordered before it, joins three lines into one above them; `plague-system.md:531` is §5.1 row
14 "Quarantine / closure" and `:672` is §7's "PG pg-4 candidates, quarantine verb" row). The 28 targets hash to the
md5s the lane recorded; the eight script headers pass `node --check`; `tools/bundle_architecture.py --check` is `UP TO
DATE`, exit 0; amendments #25's line holds one `[` and one `]`. Of the two items left open, J392 is rightly open (the
session's own journal row; no seat writes it) and N-1 was not: the owner's rule allows no deferral, the host-requirements
document is a seat-drafted text the lanes already correct (A-prosperity-43…46, B-3, B-19), and the fix is mechanical, so
it is applied here — every line pointer in `docs/HOST-REQUIREMENTS-2026-10-18.md` into a map-side file that moved since
the document read it is remapped to the live line: 1,040 pointers resolved to their files, 642 rewritten over 447 lines
(V13 373, V14 50, trade 55, alignment 46, prosperity 39, plague 34, population 30, lens 12, fp-realm 3), each mapped by
`difflib` from the state the document read to the file as it stands and verified line-text-identical for the 1,058
unchanged lines (the 58 same-position replaced lines are listed in §3), labels untouched, nothing else in the document
changed (asserted). With that, nothing of the retrovalidation is open to a seat: what remains is the session's — the
J392 row (critic.md §5 items 1–8, close-gaps §3 N-1 as fixed here) and the re-placing of the Claude-doc mirror of the
host-requirements document, which now lags the file by the close-gaps fragments and this remap.

## 1. The close-gaps pass, re-checked (critic.md §4 → critic-round2.md)

`check_gaps.py` re-read `critic/gaps.json` (the critic's 66 fragments, fields `id`, `file`, `old`, `new`) and the
28 targets from disk at 09:40Z: 65 fragments `new` count 1 / `old` count 0; B-19 `new`-as-adjusted count 1, the
critic's unadjusted `new` 0, its `old` 1 (the unchanged `plague-10.2-8` row the new row follows — expected). The
lane's `applied.json` equals `gaps.json` in `id`, `old` and `new` for all 66 but B-19's `new` (the adjustment). The 28
md5s equal `critic-round2.md` §1's "after" column (`check_gaps.out`). Independent re-runs: `node --check` on the eight
`workflows/*.js` (all ok); `python3 tools/bundle_architecture.py --check` → `UP TO DATE`, exit 0 (09:40Z);
`fp-realm-review.md:101` brackets balanced. (After the N-1 fix the `plague-10.2-8` row reads `(line 952)` for `(line
943)` — question 8 is `:952` now — so B-19's `old` no longer matches by string; the `plague-R7` row is present once, its
531/672 untouched: the fix excluded it as a row that already cites the live note.)

| gap | the critic's fix | close-gaps | this look | ruling |
|---|---|---|---|---|
| G1 A-amendments-3…25 (23) | files m, n, o, p, q, `realm.md`, `fp-realm-review.md`; #25 with the repaired bracket | FIXED, verbatim; #25 the repaired text | 23 / 23 new once, old gone; m/n/o/p/q 5bc341bd / cce6c940 / 15079bfa / 56ba149a / e112764f; `realm.md` b68f5820; `fp-realm-review.md` 04ddbd0c, :101 `[`=`]`=1 | **closed as specified** |
| G2 A-faith-60, A-lenses-40 | `rulings.md` :55, :66 | FIXED | both once; 9f787d06 | **closed as specified** |
| G3 A-prosperity-35, 36–41, 43–46 (11) | trade note §3.7; plague note PL-1…PL-6; HOST-REQUIREMENTS HR-1…HR-4 | FIXED | 11 / 11; trade 4ab935c8, plague 60003131 (1096 → 1094 lines: PL-1 joins three lines), HOST-REQUIREMENTS 058523fd before this lane's fix | **closed as specified** |
| G4 A-trade-38 | `fp-physical-integration.md` row A1 | FIXED | once; 9b6795f6 | **closed as specified** |
| G5 A-scripts-13, -14 | `docs/HANDOFF.md` :145–146 | FIXED | both once; a5a0e84d | **closed as specified** |
| G6 B-1 | faith §10.2 item 25, the fourth V1 site | FIXED | once; 69e6301e | **closed as specified** |
| G7 B-2 | faith §9.6 item 6, the bracket moved after "adoption." | FIXED | once; "a host⏎   adoption. [Fable-reviewed …]" | **closed as specified** |
| G8 B-3 | HOST-REQUIREMENTS faith-OQ4 :246 | FIXED | once | **closed as specified** |
| G9 B-4 | fp-physical row M2 (FV-13's retired name) | FIXED | once | **closed as specified** |
| G10 B-5 | population §8.3 item 2 (R-12 OVERTURNED) | FIXED | once; 4de5a9b4 | **closed as specified** |
| G11 B-6, B-7, B-8 | prosperity :456, :570 | FIXED | three once; 6f7cb5c0 | **closed as specified** |
| G12 B-9, B-10 | alignment CR-26 / CR-28 V13 lines +13 | FIXED | both once; 000a6b85; V13 §3.9 is `:1792` and `culture: Uint16Array` `:675` in V13 d0de9ad8 (re-read) | **closed as specified** |
| G13 B-11, B-12 | 36 / 36b headers `:798` → `:800` | FIXED | both once; `fp-realm-review.md:800` is the "**Not read by this seat:**" line (re-read) | **closed as specified** |
| G14 B-13 | `realm.md` RV-4 row | FIXED | once | **closed as specified** |
| G15 B-14, B-15, B-16 | `scripts.md` :30, :54; `scripts-verify.md` :27 | FIXED | three once; 5f81b89f, ff93d260 | **closed as specified** |
| G16 B-17, B-18 | M0 gate :209, :218 held set (2)–(3) | FIXED | both once; 1b5d7e6e | **closed as specified** |
| G17 B-19 | the `plague-R7` row after `plague-10.2-8`, pointers (line 533), (line 674) | FIXED with 531 / 672 | the adjustment is right: `sed -n 531p` = §5.1 row 14 "Quarantine / closure … DESIGNED ONLY as an owner value"; `sed -n 672p` = "PG pg-4 candidates, quarantine verb"; the critic's 533 / 674 were the pre-PL-1 lines | **closed; the adjustment confirmed** (it is the fix the critic meant: the rows, not the numbers) |
| G18 C-36…C-43 (8) | the as-run line-number clause in eight headers | FIXED | 8 / 8 once; `node --check` ok on all eight; no template literal touched (the comment is line 1 in each) | **closed as specified** |
| G19 J392 | not a seat's edit; the session writes the row carrying critic.md §5 items 1–8 | LEFT OPEN | `docs/PROGRESS.md` ends J390, J391, J393, J394 at 09:46Z; J393 reserves J392; journal rows are append-only and the owner's/session's | **rightly open** — not a seat's; the list for it is critic.md §5 plus N-1 as fixed below and the mirror re-placing |
| N-1 (close-gaps §3) | none given — "remap or drop-to-labels is a call not supplied" | LEFT OPEN with the per-row map (`hr_drift.json`, 8 notes, 349 pointers) | **should have been fixed**: the rule allows no deferral; the document is seat-drafted and already lane-corrected; the critic's own precedent is a remap (B-9–B-12) and section pointers only where the line would move again in the same pass (B-7, B-8) | **FIXED here** (§3): remapped, not dropped — the numbers are what the document's "so it can be checked there" promises, and a remap is verifiable line by line while a drop loses information |

The close-gaps record's own account checks: 62 hunks over 28 files (its `all.diff`), the four merged pairs as it says;
its README close note (`README.md` :160–) is dated and accurate; its `fragments.md` / `applied.json` are the strings
written. Nothing in it is overruled.

## 2. The items the critic ruled INVALID or for J392 — unchanged

Every §3 INVALID ruling of `critic.md` stands (re-read; none depends on a text that moved). The §5 list for J392 gains
two facts from this lane: N-1 is fixed (item 1's "66 close-gaps fragments … and their confirm" is this record), and the
Claude-doc mirror of `docs/HOST-REQUIREMENTS-2026-10-18.md` (item 5) now lags the file by the six close-gaps fragments
on it and by this lane's 642 pointer rewrites — it is the session's to re-place, as before.

## 3. N-1 — the host-requirements document's line pointers, fixed

**What was wrong.** `docs/HOST-REQUIREMENTS-2026-10-18.md` cites map-side files by section, item and line ("§10.2
question 8 (line 943)", "V13 §8.5, H1, line 3726", "`docs/volumes/V14-sites.md` §1b.5, lines 450–461"). It was drafted
at the state the retrovalidation's validators read (01:08–01:15Z): V13 at 4,452 lines (`retro/states/after_r__volumes_V13-world.md`,
whose §8.5, §10, §11, §12 and §3.11.6 sit at the lines the document's own critic names), V14 at 3,208
(`after_r__volumes_V14-sites.md`, equal to apply-small's before copy), and the research notes at the apply lanes' before
copies (`apply-alignment/`, `apply-plague/`, `apply-prosperity/`, `apply-realm/`, `apply-trade/`, `retro/faith-system.before.md`,
`population-system.before.md`, `lens-implications.orig.md`; the fp notes at confirm-fp's reversed reconstructions, whose
§2, §3 and §6 sit where the document's critic cites them). Since then: file s and apply-design inserted 13 lines in V13
at :105 (every pointer ≥ 105 moved +13) and 5 in V14 at :71 (+5); the apply lanes added and removed lines in alignment
(+3 from :959), plague (+9 by the notes' region, −2 by PL-1), prosperity (−1), trade (−19 to −27), population (−1),
fp-realm-review (+2) and lens-implications (+2 from :553). INDEX, the owner brief, file m, fp-simulator, fp-physical,
`docs/PROGRESS.md` (rows appended only), the FMG audit and the two FMG notes changed no line position that the document
cites (checked: their cited lines map to themselves).

**Method** (`extract_ptrs.py`, `map_ptrs.py`, `label_check.py`, `remap_hr.py`). Every `line N` / `lines N–M` / `lines
N, M` token in the document (1,040) was resolved to its file by the last file named in its table cell, with four
overrides that the label check exposed: a label naming a journal row (`J377`–`J389`) is `docs/PROGRESS.md` whatever the
cell names first (37 pointers, all held); a label naming `§8.5` or an H-row with a number ≥ 3600 is V13 (21 pointers in
cells that name `lens-implications.md` first, and row 107's `(line 3753)`); a label naming a `.js` path is a host file
(10, frozen at 81f1cd96, skipped); and row 481, the `plague-R7` row B-19 wrote against the live note, is excluded. Each
file's base-to-live line map is `difflib.SequenceMatcher` over whole lines (`autojunk=False`); every number was mapped
and the live line at the new number compared with the base line at the old: identical for 1,058 of the 1,116 numbers
mapped; the other 58 are lines the apply lanes replaced in place (same position, the item's own text with a bracket or
a correction: faith 1292, 1301, 1308, 1314, 1348, 1350, 1365, 1366; fp-simulator 3, 467, 515, 1090; fp-physical 23, 25,
36, 38, 57, 101, 103, 111, 124, 137, 146, 157, 159, 472; lens 22, 175, 179, 180, 193, 363, 365, 367, 368, 369, 438, 520;
fp-realm 677; and nine whose item moved and was edited — alignment 1056 → 1059 item 25(g), trade 1031 → 1012 item 10,
1049 → 1024 item 15, 1065 → 1039 item 23, 1140 → 1113 "One territory or two?", population 863 → 862 item 9, prosperity
909 → 908 C7, 913 → 912 C9 — each read and confirmed the same item). No pointer mapped nowhere. The document after the
rewrite, with every pointer's digits masked, is byte-identical to the document before with the same mask (asserted), its
line count unchanged (935), and the six close-gaps fragments on it are present once each (the `plague-10.2-8` row's own
pointer 943 → 952 included).

**Result.** 642 pointers rewritten on 447 lines: V13 373, V14 50, `trade-system.md` 55, `alignment-system.md` 46,
`prosperity-system.md` 39, `plague-system.md` 34, `population-system.md` 30, `lens-implications.md` 12,
`fp-realm-review.md` 3; held as right: 385 (faith 66, fp-physical 106, fp-simulator 41, lens 64, fp-realm 11,
population 2, V13 1, PROGRESS 37, audit 35, brief 8, INDEX 8, file m 3, ARCHITECTURE 1 — `:12898`, only line 5 of that
file changed — and the two FMG notes), and 13 outside the map (the ten host `.js` pointers, the host's
`DESIGN_FP_COHERENCE_FOLD.md`, the two of the `plague-R7` row); 642 + 385 + 13 = 1,040. md5 058523fd → 434d54b0; `hr.diff` 85 hunks; the per-pointer map in
`hr_edits.json` (old → new per pointer) and `hr_record.json` (every number with its base and live line text). Spot
reads after the write: row 126 "H1 … (line 3739)" → V13 `:3739` is `| H1 | now, on the fork |`; row 480 "question 8
(line 952)" → the plague note's "Should the DM's moderate plague band (0.6) be able to displace refugees"; row 318 "item
10 (line 1012)" → the trade note's "10. **Same-named truth reads.**".

**Why remap, not drop.** The critic dropped to section pointers in B-7 and B-8 only because the cited lines were about
to move again inside the same pass; everywhere else (B-9–B-12) it remapped. The document promises line-checkable
pointers ("Every item names the map-side source it comes from, so it can be checked there"); a remap keeps that promise
and is verifiable line by line, a drop is not. The pointers will drift again when the notes are next edited — that is
the nature of line pointers, and the per-pointer base-to-live record here is the tool for the next remap.

## 4. What remains open after this lane

- **J392** only, the session's row — carrying critic.md §5 items 1–8, with N-1 fixed as above and the Claude-doc mirror
  of the host-requirements document to re-place (now lagging by the six close-gaps fragments and the 642 pointers).

Nothing else of the retrovalidation is open to a seat.

**LANDED** 2026-10-18 (see the lane line).
