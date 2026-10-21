# hidden-ways/confirm-anchors — file w as applied, confirmed on the live targets (2026-10-19)

**Seat:** hidden-ways/confirm-anchors (Fable/high; confirm-only — no target, draft, JSON or amendments file edited;
no git run). Under the apply workflow J422 on the owner's decision J421 (2026-10-19 07:12Z, "i follow your
recommendations"). Resume check: no `confirm-anchors.md` on disk, no LANDED line for `hidden-ways/confirm-anchors` in
`docs/lane-events.log` — fresh start. Script: `synth-scripts/confirm_anchors.py` (315 lines, md5 `5a28bd3a`), run
`python3 -I`; it reads only. Inputs as found: `draft-w.fragments.json` f79dbd49 (114 records), `draft-w.md` 8148b834
(1143 lines), `apply-run.json`, `apply.md` (176 lines), `docs/AMENDMENTS-2026-10-18w.md` 5df61697 (1181 lines).

**Verdict: PASS — 3 478 checks, 0 failures.** Five negative controls each fire (§7).

## 1. The five targets' md5s (the apply seat's point 2) — 5/5
`md5sum` live: V13 `81b3a00364b1026b7c3b6a047a59a605` (4832 lines), V14 `1fcdce8e633db3b39322e3c3854cc99a` (3341),
HRQ `7ff6f94425d4842757116d20a0ee628c` (938), INDEX `1f988c2d9795d10fb8cb5a9ccaf06c5b` (261), SUMMARY
`7de28faa4c5df1819d33063058523ae6` (245) — each equal to the apply seat's after-md5 and to `apply-run.json`'s `after`
and `lines`. The INDEX and SUMMARY targets are `docs/volumes/INDEX.md` and `docs/volumes/SUMMARY.md`, as the
fragments' `file` field names them (83 V13, 6 V14, 12 HRQ, 7 INDEX, 6 SUMMARY).

## 2. New once, old zero — 114/114
For every record, `new` occurs exactly once in its target as applied (114/114). For `old`:
- 81 records whose `old` is not a substring of their `new`: `old` occurs 0 times (81/81).
- 33 records whose `old` is a substring of their `new` (the insertions, which repeat the line they follow as the
  new text's first line, and the edits that keep a prefix): handled in two parts — the target's count of `old` equals
  `new.count(old)` (the count expected from the new text's content, 1 in every case) and, with the one occurrence of
  `new` cut out of the target, `old` occurs 0 times (33/33 both ways). So no `old` survives outside its own new text.
- Each new text's final line equals `apply.md`'s *final* column and the stated line equals the JSON's `line`
  (114/114); `apply-run.json`'s `final` counts are `newCount 1, oldOutsideNew 0` for every id (114/114).

## 3. Reversal and replay — byte-identical both ways
The 114 new texts put back by their old in reverse order on the live texts give five texts whose md5s are the
fragments' stated md5s (V13 e68af748, V14 f5dd37a7, HRQ 7db37cc1, INDEX 10a72c97, SUMMARY 1c0ada29) — the
pre-apply state, rebuilt without the apply seat's scratchpad copies. Replaying the 114 fragments forward from those
texts in the JSON's order: each `old` once at its turn, landing at the line `apply-run.json`'s row and `apply.md`'s
*landed* column give (114/114; e.g. 955 (b) stated 374, landed 388, final 389), and the replayed texts equal the live
targets byte for byte (5/5).

## 4. The amendments file `docs/AMENDMENTS-2026-10-18w.md` — 114 items, same texts
- Item headings `**955.**` … `**975.**` in order, 21 of them; lettered fragment headings 114, in the JSON's order,
  ids identical.
- For every id the *Current text* blockquote (the `> ` prefix removed, a bare `>` an empty line) equals the JSON's
  `old` and the *New text* blockquote equals the JSON's `new` (228/228); each locator names the fragment's file,
  line and md5 as the JSON (114/114).
- Header form (file v's): the title, the provenance line, "Numbered from **955** (file v ended at 954); items
  955–975.", the **APPLIED** line with J421 verbatim (`"i\nfollow your recommendations"` across the line break), the
  five before → after md5s, *Sources*, *How to read the items*. The items section from `## The items` equals
  `draft-w.md`'s from `## The items` to its end byte for byte, followed in the applied file by a `---` separator and
  `## For the session (not items)` (AMENDMENTS:1168) — the one difference, by design.

## 5. Structure around every anchor (before = the reversed texts of §3, after = live)
- **Tables:** 54 table blocks touched by or adjacent to a new text (INDEX's Q5 row `docs/volumes/INDEX.md:225`, V13 §9's
  J-V13 rows, §8.5's H-rows, §2.3's rule rows, §7's T-rows among them): every row of each has the header's pipe count
  (pipes counted outside code spans, `\|` excluded) and a separator row follows the header (54/54; none irregular
  before either).
- **Numbered lists:** 7 `n.` lists adjacent to an anchor keep consecutive numbering (7/7). (The volumes' `(n)`
  law and step numbering is inline prose, not list markup; W7 (12)–(14) read in order at V13 §3.8.)
- **Code fences:** every target's fences pair (an opening with a tag, a bare close; V13 4 pairs at 687–970,
  1008–1071, 1265–1273, 3142–3173; V14 12 pairs; INDEX 1; HRQ and SUMMARY none), the same number and tags before
  and after; 13 fragments land inside a fence and each sat inside one before (13/13); no new text carries a fence
  line (114/114). Every ts block's brace, paren and bracket balance (comments and strings stripped) is unchanged
  before → after (16/16 ts blocks: V13 4, V14 12; INDEX's one fence is mermaid).
- **§2.2's interface blocks:** all 71 `interface`/`type` lines of V13 §2.2 (685–998; §2.3 at 999) lie inside a
  ts fence (71/71); 7 of them are lines a file-w new text holds whole (`WorldRoute` V13:805, `Trod` 861,
  `WorldJunction` 870, `RouteEnd` 917, `RouteGenesis` 918, `NetworkChange` 919, `TimeDeltaReceipt` 921;
  `WorldWhere` 920 is edited within its line) — the `interface Trod {` … `}` block read by eye at 861–869,
  `WorldJunction` 870–873.
- **Blockquotes:** the §1.3 owner's-word block (955 (a), V13:140) keeps `> ` on every line (1/1).

## 6. V13 §11 Q5 reads as answered — yes
`docs/volumes/V13-world.md:4665` `**Q5 — The hidden ways' price, their place in the host's bodies chain, and the
trod record's door (file w).**` … `:4681–4683`: "**Answered 2026-10-19 (J421):** the owner followed the session's
recommendations — the price accepted (M-W2 10 pw, the staged row 39–47) and M-W2 named; the host's stand-in from
`routeFacts`' stretches meanwhile; the trod record a product of the simulator feed." The paragraph is item 966 (c)'s
new text (an insertion after Q4's last two lines, V13:4662–4663, which the new text repeats as its first lines); the
Q5 heading occurs once in the volume; the six phrases of the answer present (6/6).

**Residue (recorded, not failed — the apply seat's point 7, outside this step):** four applied texts still speak
of Q5 as open: 965 (a) `docs/volumes/V13-world.md:4213` ("put to the owner in Q5 (vetoable)", the J-V13.116 row);
968 (l) `docs/HOST-REQUIREMENTS-2026-10-18.md:717` ("open for the owner"); 969 (g) `docs/volumes/INDEX.md:225` (the
V13 Q5 row, "(recommended; vetoable)"); 969 (k) `docs/volumes/SUMMARY.md:173` ("file w, pending your look"). A
follow-up file x would carry J421 into them. Also outside this seat: `docs/ARCHITECTURE-FULL.md` stale (the apply
seat's point 8).

## 7. Clean room and negative controls
- None of critic-3's tokens (`critic-3.md:34`: `way_known`, `way_rung`, `way_forgotten`, `settlementId`, `wayId`,
  `.js`, `.ts`, `research/sf`, `HRQ:`, `FPI:`, `TRD:`, `FTH:`, `FPS:`, `FRR:`, `PLG:`, `LNS:`, `src/`) in any of the
  89 V13/V14 new texts (1513/1513 token checks).
- Negative controls on copies, each caught: a new text altered by one character (958 (a)) → 1 failure; an old
  text re-added to a target (960 (g)) → 1 failure; an amendments blockquote line altered (956 (a)) → mismatch; a
  cell dropped from INDEX's V08 Q5 row (INDEX:208) → table failure; V13's fence line 687 removed → fence failure.

## 8. Counts
checks 3 478; failures 0; fragments 114 (old inside new 33); targets 5; items 21 (955–975), lettered fragments 114
in the amendments file; tables 54; numbered lists 7; fenced fragments 13; §2.2 interface/type lines 71.
