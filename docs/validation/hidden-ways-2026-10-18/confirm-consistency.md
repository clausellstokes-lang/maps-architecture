# Confirm: consistency of file w as applied (hidden-ways/confirm-consistency)

2026-10-19. Confirm-only, no edits to any target. The five targets as the apply lane left them: V13 `81b3a003` (4 832
lines), V14 `1fcdce8e`, HOST-REQUIREMENTS `7ff6f944`, INDEX `1f988c2d`, SUMMARY `7de28faa` (re-hashed by this seat).
Pre-apply copies (the fragments' md5s, `e68af748`, `f5dd37a7`, `7db37cc1`, `10a72c97`, `1c0ada29`) at the apply lane's
scratchpad `pre-apply/`. Scripts, `python3 -I`, read-only: `synth-scripts/confirm_consistency.py` (39 lines, md5
78651521) and `synth-scripts/confirm_reply_lines.py` (43 lines, md5 09bef0be); the rest by grep, cited below.

**Verdict: FAIL** — 292 checks, 6 failures (F1–F6). Every id file w cites is defined exactly once; the H32 row and its
summary agree; the reply's citations hold; the clean room holds. The failures are figures and statuses file w did not
carry through: the +2 pw (37–45 → 39–47) appears in V13 §8.2, INDEX's V13 row and SUMMARY's V13 line but not in five
other places that state the old figure, and J421's answer to Q5 appears only in V13 §11 and the reply.

## 1. Id definitions (56 checks, 0 failures)

Each id cited in the 114 fragments' new texts, its definition rows counted in the applied target (`confirm_consistency.py`):

| kind | ids | definition | count each |
|---|---|---|---|
| T-V13-n | 14, 41, 50, 57, 59, 60, 61 (+ 16, 17, 38, 39, 42, 43, 46, 58 from M-W2's test cell) | `^\| T-V13-n \|` in V13 §7 | 1 (T-V13-61 at V13:3896, -59 :3898, -60 :3930) |
| J-V13.n | 49, 110, 114–133 | `^\| J-V13.n \|` in V13 §9 | 1 (114–133 at V13:4211–4230) |
| H (V13 §8.5) | H1, 4, 5, 7, 8, 9, 12, 17–20, 22–24, 30, 31, 32 | `^\| Hn \|` | 1 (H32 at V13:4088) |
| H32 (host doc) | the M-W2 table row and the lens-dependency summary | `^\| H32 \|` | 2 as designed (HRQ:85, HRQ:579) |
| report codes | `W_TROD_SPARSE` / `W_TROD_UNJOINED` / `W_TROD_CUT` (V13:3946), `W_ROUTE_JUNCTION_ORPHAN` (V13:3947) | code-table row | 1 |
| budget | `WORLD-18` (V13:3832) | the register sentence | 1 |
| BCR | BCR-V13-37 (V13:4565), BCR-V14-19 (V14:3165) | the request's head | 1 |

Whole-volume duplicate scan: 54 T rows, 121 J rows, 32 H rows, 40 BCR-V13 heads, V14's BCR rows — no duplicate id.
(Pre-existing, not file w's: no definition row for T-V13-2, 4, 6–10 or J-V13.51–62; T-V13-61 is placed after T-V13-57,
before -58, by 975 (a)'s design.)

## 2. Items and § references (172 checks, 0 failures)

- Items 955–975: each heading `**n.**` exactly once in `AMENDMENTS-2026-10-18w.md` (21). Items cited by the new texts
  exist: 877 (`AMENDMENTS-2026-10-17o.md:1134`), 926 (file r), 940 (`AMENDMENTS-2026-10-18t.md:94`), 954 (file v),
  133 (e) (the owner's brief item, V14:311's trace row) (5).
- 146 § references in the V13/V14 new texts resolve to a heading or bold subsection of the volume named (§3.11.6 is
  V13:2600's bold head, §3.14.3 V13:2974's). Three non-heading hits are not file w's: V14 `§9.2` is in 967 (a)'s unchanged
  Current line (V14:766, base §9.2); `§5c` in 968 (h) is the host design document's section in the host document.

## 3. Milestone figures (15 places, 5 disagree)

Agree (M-W2 10 pw, staged row 39–47): V13:3995 (§8.2 M-W2 row, "10 pw"), V13:4001 ("39–47 pw (37–45 before file w")),
V13:4670–4677 (§11 Q5 and its answer), INDEX.md:39 (V13 row "39–47 as one staged row"), INDEX.md:225 (Q5 row),
SUMMARY.md:130 ("about 39–47 person-weeks"), SUMMARY.md:224, HOST-REQUIREMENTS:717 ("M-W2 is 10 pw (the staged row 39–47)").

- **F1** SUMMARY.md:136 — "The whole program with the two new volumes: about **455–620 person-weeks** (the earlier
  392–539 plus the two lines above)". The two lines above are now 39–47 (:130) and 25.75–36.25 (:134): 392 + 39 + 25.75
  = 456.75, 539 + 47 + 36.25 = 622.25, so ≈ 457–622. 455–620 is the sum with 37–45.
- **F2** INDEX.md:258 — the PLAUSIBLE paragraph: "volumes 13 and 14's 37–45 and 25.75–36.25 pw among them", against
  INDEX.md:39's 39–47.
- **F3** SUMMARY.md:218 — the 16 October deferred decisions: "accept the two volumes' cost (37–45 and 25.75–36.25
  person-weeks)", against SUMMARY.md:130's 39–47 (a recorded recommendation, but it states V13's cost as a figure that no
  longer holds and has no "(39–47 after file w)").
- **F4** V13-world.md:4565–4569 — BCR-V13-37, the request that carries V13's figure into base §16: "The staged-milestone
  row ... reads 37–45 pw ... this request's range stands for the staged row's estimate", against §8.2 (V13:4001) 39–47.
  No BCR-V13 request carries the +2 pw (the BCR heads end at BCR-V13-40), so §16 would still receive 37–45.
- **F5** HOST-REQUIREMENTS-2026-10-18.md:143 — *The milestones named above*, M-W2: "8 person-weeks (V13 §8.2, line
  3677)"; HOST-REQUIREMENTS:146, M-W4's row: "M-W0 to M-W5 together are one staged row of 37 to 45 person-weeks".
  The same document's HOST-REQUIREMENTS:717 says 10 pw and 39–47. (The "(line 3677)" cite is stale too, but it was
  stale before file w: the M-W2 row was at V13:3814 before the apply and is at V13:3995 now.)

## 4. Q5's answer (J421) across the targets (1 failure)

V13:4677 writes it ("**Answered 2026-10-19 (J421):** the owner followed the session's recommendations ..."), as do the
reply's §9.1 and file w's status line. Nothing else says it was answered:

- **F6** the question still reads as open in HOST-REQUIREMENTS:717 ("V13 §11 Q5, open for the owner with the price and the
  bodies chain's order"); INDEX.md:225 (the Q5 row: recommendation only, "(recommended; vetoable)", no answer, unlike
  V04's "accepted (J122)" at INDEX.md:200); SUMMARY.md:16 ("one put to you on 18 October ... which proceeds on its
  recommendation"), SUMMARY.md:173 ("the answer (file w, pending your look)"), SUMMARY.md:223–228 (the question and
  recommendation, no answer). V13:4213 (J-V13.116, "put to the owner in Q5") is true as history and is not counted. This
  is the residue the answer and apply lanes recorded (965 (a), 968 (l), 969 (g), 969 (k); lane log 07:19 and 07:24).

## 5. The host document's H32 (14 checks, 0 failures)

HOST-REQUIREMENTS:85 (the M-W2 table, after H22 at :84, as 968 (b) put it) and :579 (the lens-dependency summary)
give the same 14 asks: the trod record; the stand-in retired; the knowledge event; the lapse; the rung row; junction ends;
derived forks; the engagement's place; a body on a trod; a watch as a dated event; the reveal through the party's
places; the registered words; `way` minted on neither side; and the order (row: "M-W2; H9; H12; H17."; summary: "With
M-W2; waits on H9, H12, H17"). V13:4088's H32 ("with M-W2 (the trod record), after H9, H12 and H17") agrees. H9, H12,
H17 and H22 exist in the host tables (HRQ:68/573, :79/575, :83/578, :84).

## 6. The reply's cited V13 lines (12 checks, 0 failures)

The reply's key (HOST-REPLY:12) says its `V13:n` refers to V13 "before file w (md5 `e68af748…`, 4 611 lines)". In each
spot check the cited text is at that line in the pre-apply copy and, unchanged, at the applied line by a line-diff map
(`confirm_reply_lines.py`): reply:19 V13:788 → 807 (+19); :32 1850 → 1900 (+50); :40 1135 → 1173 (+38); :41 1846 → 1896
(+50); :45 1829 → 1879 (+50); :53 1800 → 1850 (+50); :54 2484 → 2658 (+174); :55 2437 → 2611 (+174); :60 573 → 590 (+17);
:66 1792 → 1842 (+50); :90 2578 → 2752 (+174); :109 3819 → 4000 (+181). Not counted: V13:786, 1827 and 3814 are lines file w
rewrote (971 (a), 970 (b), 964 (a)). The reply cites their pre-file-w text, as its key says, and that text holds in
`e68af748`. After the apply every `V13:n` in the reply is a pre-apply number by design: it holds against `e68af748`, not
against the volume as it stands.

## 7. The clean room (23 tokens, 0 failures)

Critic-3's list (`critic-3.md:34`) and the request's identifiers (`way_known`, `way_rung`, `way_forgotten`,
`settlementId`, `wayId`, `spatialLedgers`, `how: 'office'`, `kind: 'hidden'`, `research/sf`, `HRQ:`, `FPI:`, `TRD:`,
`FTH:`, `FPS:`, `FRR:`, `PLG:`, `LNS:`, `src/`, `.js`, `.ts`, `` `wild` ``, `tick)`) and `H32` hash: 0 hits in the V13/V14
new texts. 0 in the applied V13/V14, except four that were already there before file w: `research/sf/` V13:37, :48 (the
map's own research notes); `src/` and `.ts` in V14 (4). The "kernel's `H32` hash" at V13:4088 is the base kernel's string
hash (ARCHITECTURE.md:10475, §13.6 (2)), not a host identifier.

## Counts

56 + 21 + 5 + 146 + 15 + 14 + 12 + 23 = **292 checks; 6 failures** (F1–F6: SUMMARY:136, INDEX:258, SUMMARY:218,
V13:4565, HRQ:143/146, and the Q5 status at HRQ:717, INDEX:225, SUMMARY:16/173/223). None is in an id, a definition or
the clean room. All are text outside file w's 114 fragments that needed the +2 pw or J421 carried into it. They need a
small follow-up item; nothing applied needs to be reversed.
