# Retrovalidation 2026-10-18 — family "amendments" (files m–q, items 659–925; file r placement only): the verifier's record

Lane `retrovalidation/amendments-verify` (Opus 5.5, the verifier; J390, Fable-checked). Written as it goes.

Scope: `docs/AMENDMENTS-2026-10-17m.md`, `-n.md`, `-o.md`, `-p.md`, `-q.md` read whole; their coherence records
`docs/validation/coherence/realm-m.md`, `lens-n.md`, `lens-o.md`, `lens-p.md`, `lens-q.md` and critics
`realm-m-critic.md`, `lens-n-critic.md`, `lens-o-critic.md`, `lens-p-critic.md`, `lens-q-critic.md` read whole; the
applied targets as they stand on 2026-10-18 (after file r): `docs/volumes/V13-world.md`, `docs/volumes/V14-sites.md`,
`docs/design/proposal-world-native.md`, `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md`,
`docs/ARCHITECTURE.md`, `docs/volumes/INDEX.md`, `docs/volumes/SUMMARY.md`. File r (item 926) checked for placement only
(the owner's word). Host: `clausellstokes-lang/settlement-engine` at `81f1cd96`, read only.

## Method (in progress)

1. **Parse.** Every item of files m–q parsed from its file by its markers (`**n.** **title**`, a wrapped title read
   whole; `*Current text:*` / `*Current text* (x):` and `*New text…*`; a current text's `⏎` a line break; a new text's
   blockquote with `> ` removed and a bare `>` an empty line), the target from the `###` heading (Volume 13 → V13,
   Volume 14 → V14, The proposal, The brief, BASE → `docs/ARCHITECTURE.md`, The index → INDEX, The summary → SUMMARY);
   file r's twenty sub-items (a)–(t) by their *Target:* line. Parsed: m 117 items / 170 fragments; n 58 / 131; o 40 / 80;
   p 19 / 32; q 29 / 43 (items 663–925 without a gap; 659–662 are the owner's rules and carry no fragment); r 1 / 20.
   Each count equals the one its application record states (realm-m.md :18–20, lens-n.md :22–24, lens-o.md :23–27,
   lens-p.md :23–26, lens-q.md :24–28, file r's status line).
2. **Reverse replay (check (b)).** Starting from the seven targets and `README.md` as they stand on 2026-10-18, every
   fragment of r, q, p, o, n, m undone in reverse order (its new text, which must occur exactly once at its turn,
   replaced by its current text), the md5 and line count of each target taken at each file boundary.
3. **Forward replay (check (a)).** From the reconstructed pre-m state, every fragment applied in order (its current text
   must occur exactly once at its turn, its new text exactly once after), the span of each applied new text tracked
   through every later edit, so a new text absent today is traced to the later fragment(s) that rewrote part of it.
4. **Evidence (check (c))** and **critic gaps (check (d))**: below, by reading.

## (a) and (b): placement and the md5 chain — HOLD

- **Reverse replay:** all 476 fragments (m–q 456, r 20) undone, each new text found exactly once at its turn; no miss.
- **The md5 chain, every value reproduced** (reconstructed state → the record's value):

  | state | V13 | V14 | proposal | brief | base | INDEX | SUMMARY | README |
  |---|---|---|---|---|---|---|---|---|
  | before m (realm-m.md :28–32) | `16e23add` 2 988 | `3323294d` 3 183 | `d100ecbb` 270 | `e6aad12b` 182 | `3552f3ca` 24 439 | `72f97005` 251 | `f70c63d4` 197 | `bc1f950f` |
  | after m = before n (lens-n.md :42–46) | `aec3207d` 3 679 | `9d59d45d` 3 198 | `7374c286` 275 | `a01b8471` 189 | `c6b03643` 24 456 | = | = | = |
  | after n = before o (lens-o.md :52–55) | `c6956b05` 4 216 | `56bef233` 3 208 | `efc7ce31` 277 | `9d60fdd0` 194 | `81efb0c6` 24 457 | = | = | = |
  | after o = before p (lens-p.md :54–59) | `3320f3ca` 4 348 | `a1c6d7c2` 3 208 | `efc7ce31` | `234f3895` 199 | `96598bab` 24 457 | `72f97005` | `f70c63d4` | = |
  | after p = before q (lens-q.md :58–63) | `32b526d5` 4 377 | = | `f509e32a` 281 | `645dc230` 203 | `d0f1b84b` 24 459 | `157f091c` 251 | `163f7a0b` 199 | = |
  | after q = before r (file r :17–21) | `9e4e8b9b` 4 438 | = | `b2e18a92` 281 | `b1e0e364` 208 | `a440f7a4` 24 461 | `8972b3d9` 257 | `c6264602` 211 | `bc1f950f` |
  | after r = now (file r :17–21) | `c8759307` 4 452 | `a1c6d7c2` | `b2e18a92` | `fc252070` 212 | `b03ba26e` 24 462 | `39b0c519` 259 | `9d142283` 214 | `2a4b54c8` |

  Every before/after md5 and line count in the five records and in file r equals the reconstructed one; each record's
  "before" is the previous record's "after"; no target changed between applications or since file r (the targets'
  md5s today are file r's after-values). Files m–q never touched INDEX or SUMMARY before p, nor V14 after o, nor the
  proposal in o — as the records' target lists say.
- **Forward replay:** from the reconstructed pre-m state, all 476 fragments re-applied in order: every current text
  found exactly once at its turn, every new text exactly once after, and the result **byte-identical** to the seven
  targets and README today. So every claim "current text found exactly once at its turn; new text found once after"
  in realm-m.md §1, lens-n.md §1, lens-o.md §1, lens-p.md §1 and lens-q.md §1 holds.
- **Present now:** 367 of the 456 m–q fragments' new texts occur exactly once in their target today; file r's 20 occur
  once. The other 89 are absent because a later fragment rewrote part of them — each traced (none untraced; no new text
  occurs twice; no fragment present today was later touched):
- `m:665` → q:898
- `m:667` → n:783(a), n:783(b)
- `m:668` → n:784(a)
- `m:671` → n:785(a), n:785(e), o:840(a), o:840(b)
- `m:672(a)` → n:785(b)
- `m:672(b)` → n:785(c)
- `m:673(a)` → n:785(d)
- `m:675` → n:786(a)
- `m:678` → q:899
- `m:692` → n:792(a), o:842(f)
- `m:693` → n:789, n:790(a), n:790(b), n:790(c), n:790(d), n:790(e), n:790(f), n:791, q:900(a), q:900(b)
- `m:695` → n:793(a), n:793(b), n:793(c), n:793(d)
- `m:699` → n:793(e), n:793(f), n:793(g), n:793(h)
- `m:705` → n:795(a), q:901
- `m:713(a)` → n:797
- `m:714(a)` → n:798(a), n:798(b), n:799, n:800(a), n:800(b), n:801, n:802, n:803(a), n:803(b), n:803(c), n:804, o:843, o:844(a), o:844(b), o:844(c)
- `m:721` → n:806(a), n:806(b), n:806(c), n:806(d), n:807(a), n:807(b), n:807(c), q:902(a), q:902(b), q:902(c), q:902(d)
- `m:732` → q:903
- `m:734` → o:844(d)
- `m:737(a)` → n:808(a), n:808(b), n:808(c), n:808(d), n:808(e)
- `m:737(b)` → n:808(f), n:808(g), o:845(a), o:845(b)
- `m:740(a)` → n:809(a)
- `m:740(b)` → n:809(b)
- `m:741(b)` → n:812
- `m:743` → n:813(c), n:813(d), n:813(e), n:813(f), n:813(g), n:814, o:858, o:859, o:860, o:861(a), o:861(b), p:882, p:883
- `m:744(a)` → n:815(a), o:862, q:905(a), q:905(b)
- `m:746(b)` → n:816(e)
- `m:749` → n:817(a), n:817(b), n:817(c), n:817(d), n:817(e), n:817(f), n:817(g), n:818(a), n:818(b), n:818(c), n:818(d), n:818(e), o:864(a), o:864(b), o:865(a), o:865(b), o:865(c), o:865(d), o:866, p:884(a), p:884(b), p:884(c), p:884(d), q:906, q:907, q:908, q:909(a), q:909(b), r:926
- `m:751` → n:819(a), o:867, q:910
- `m:753` → n:821, n:822
- `m:754` → n:824(a), n:824(b), n:824(c)
- `m:755` → o:870(a), p:886(a), q:913(a), r:926
- `m:769` → q:914
- `m:770(b)` → p:887
- `m:771` → n:832(a), n:832(b)
- `m:774(a)` → q:915(a)
- `m:774(b)` → p:888(b), r:926
- `m:776` → n:834(a), n:834(b), o:873, p:889, r:926
- `m:778` → n:837(a), n:837(b), o:876, q:916
- `m:779(a)` → n:837(c)
- `m:779(b)` → q:917, r:926
- `m:779(f)` → n:835
- `n:781` → r:926
- `n:783(c)` → o:839(a)
- `n:785(a)` → o:840(a), o:840(b)
- `n:786(b)` → o:841
- `n:792(a)` → o:842(f)
- `n:792(b)` → o:842(a), o:842(b), o:842(c), o:842(d), o:842(e), o:842(g), p:879(a), p:879(b)
- `n:794(a)` → p:880
- `n:808(f)` → o:845(a)
- `n:810` → o:846(a), o:846(b), o:846(c), p:881(a), p:881(b)
- `n:811` → o:847, o:848, o:849(a), o:849(b), o:850, o:851(a), o:851(b), o:851(c), o:851(d), o:851(e), o:852(a), o:852(b), o:853(a), o:853(b), o:853(c), o:853(d), o:853(e), o:853(f), o:854, o:855(a), o:855(b), p:881(c), p:881(d)
- `n:813(a)` → o:856
- `n:813(f)` → o:858, p:882
- `n:814` → o:859, o:860, o:861(a), o:861(b), p:883
- `n:815(a)` → o:862
- `n:816(c)` → o:863
- `n:817(a)` → p:884(a), p:884(b), p:884(d), q:906, r:926
- `n:818(e)` → o:864(a), o:864(b), o:865(a), o:865(b), o:865(c), o:865(d), o:866, p:884(c), q:909(a), q:909(b), r:926
- `n:824(d)` → r:926
- `n:833` → o:872, p:888(a), q:915(b), r:926
- `n:834(b)` → o:873, p:889, r:926
- `n:837(b)` → o:876
- `o:852(a)` → p:881(c)
- `o:859` → p:883
- `o:864(b)` → p:884(c), q:909(a), r:926
- `o:868(a)` → p:885, q:911(a)
- `o:870(a)` → r:926
- `o:870(b)` → p:886(b), q:913(b), r:926
- `o:872` → p:888(a), q:915(b)
- `o:873` → p:889, r:926
- `p:884(b)` → q:906, r:926
- `p:884(c)` → q:909(a)
- `p:885` → q:911(a)
- `p:886(a)` → q:913(a)
- `p:886(b)` → q:913(b), r:926
- `p:888(a)` → q:915(b)
- `p:888(b)` → r:926
- `p:889` → r:926
- `q:906` → r:926
- `q:909(b)` → r:926
- `q:912` → r:926
- `q:913(b)` → r:926
- `q:918` → r:926
- `q:920(a)` → r:926
- `q:920(d)` → r:926
- `q:922` → r:926
- `q:924(b)` → r:926
- `q:925(a)` → r:926
