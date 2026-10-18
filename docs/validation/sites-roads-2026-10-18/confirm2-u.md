# confirm2-u — the confirming re-check of file u and apply-u, second round (after fix-u)

Lane: sites-roads/confirm2-u (Opus/high, the confirming re-check; J394), 2026-10-18 16:29–16:33 UTC. Scope: file u whole
(`docs/AMENDMENTS-2026-10-18u.md`, items 949–953, 23 fragments), `apply-u.md`, and `fix-u.md` (the first round's one
FAIL, `confirm-u.md` §6). Edited only this record and the lane log; no target, amendment file or journal touched; no git
command run; the host repository (`/home/user/clausellstokes-lang/settlement-engine` at `81f1cd96`) read only. Scripts and
outputs in `/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/sites-roads/confirm2-u/`
(`parse2.py`, `u.json`, `v.json`, `check2.py`, `check2.out`, `greps.txt`).

**Verdict: PASS.** fix-u's five blank lines are in and nothing else in file u moved; every fragment, md5, line, the
greps, K14's form and the bundle re-verified independently. Since the first round, file v (fix-t-rest, item 954)
changed V14, INDEX and SUMMARY again; the replay below runs file u and then file v and gets the current files
byte-for-byte, so every changed line in those three files comes from a fragment.

## 1. Commands

1. `python3 -I parse2.py docs/AMENDMENTS-2026-10-18u.md u.json`: a new parser written for this round, not the
   first round's `parse.py` and not the applier's `frags.py`. It reads each header's item, letter, target, line(s) and
   md5 prefix, then *Current text:* (`⏎` read as a line break) and *New text:* (`> ` lines; a bare `>` is an empty line).
   Result: **23** fragments (V14 7, lens-implications 3, V13 2, trade-system 2, SUMMARY 2, base 2, gate 2, brief 2,
   INDEX 1), the counts file u states. File v was parsed the same way: 9 (V14 3, INDEX 3, SUMMARY 3).
2. `python3 -I check2.py` → `check2.out` (301 lines). Before copies: the nine `before-*` files in
   `confirm-u/`. Their md5s equal file t's after-md5s, which `apply-t-record.md` §1 recorded independently and file u's
   header states (9/9), so they are the true before copies.
3. `python3 -I tools/bundle_architecture.py --check` → `UP TO DATE`, **exit 0**.
4. `diff fix-u/before.md docs/AMENDMENTS-2026-10-18u.md`: five added empty lines (152, 188, 233, 257, 312) and
   nothing else. `before.md` md5 is `edad734b` (apply-u's). `cmp` against confirm-u's preview: equal. The current file is
   382 lines, md5 `c1403ea0ede814134563f1ddbc4ff5c6`, as fix-u states.
5. Repository-wide greps (`greps.txt`, 65 lines; `docs/validation/`, the bundle, `docs/AMENDMENTS-*` and
   `docs/PROGRESS.md` excluded) for "host meaning", "security input", "road-warden", "wardenship", "patrol coverage",
   "patrol-coverage", "ask 8" and "OQ4". Also every "patrol" line in the volumes, the base, the brief and
   `docs/design/` filtered for meaning/ask/security/warden/predation/consum/adopt/producer.
6. Read the cited kernel and site code: `plat/packages/kernel/src/io/decode.ts:274`, `io/types.ts:21-30`,
   `plat/packages/site/src/hydro/field.ts:1-2`, `hydro/params.ts:43`. Also `docs/M0-FIX-QUEUE.md:94-96` (Q80–Q82)
   and verdict `:292-303` (C8–C10).

## 2. The check table

| check | count | result |
|---|---|---|
| before copies' md5 = file u's stated before-md5 (and line counts) | 9/9 | PASS |
| fragment count per target = the header's count | 9/9 | PASS |
| old once in the before copy | 23/23 | PASS |
| cited line(s) = computed from the before copy | 23/23 | PASS |
| cited md5 prefix = the target's before-md5 | 23/23 | PASS |
| old once at its turn (forward, file order) | 23/23 | PASS |
| new once after | 23/23 | PASS |
| forward result = stated after-md5 and after line count | 9/9, 9/9 | PASS |
| after all of file u: new once; old only inside its own new (old a prefix of the new in 949 (b), (f), (g), (i), 950 (a), (c), 952 (a), (b), 953 (b), (d)) | 23/23 | PASS |
| file v on top: its before = file u's after; old once / new once; after = stated | 3/3; 9/9, 9/9; 3/3 | PASS |
| replay (u, then v on V14/INDEX/SUMMARY) byte-equal to the current target; nothing else moved | 9/9 | PASS |
| reverse from current (v undone, then u undone) = stated before-md5 | 9/9 (v → u-after 3/3) | PASS |
| file u's new texts still once in the current targets | 22/23 + 949 (h) | PASS, see note (a) |
| bundle fresh (`--check` exit 0); V13/V14/base/INDEX new texts once in it, old only inside its new | exit 0; 11/12 exact + 949 (h); 12/12 old | PASS, see note (a) |
| bundle state after file u = stated `dbef7781` | fix-t-rest's `FULL.before.md` md5 `dbef7781…` | PASS |
| untouched since: V13 `e68af748`, base `eac3a6a5`, gate `21d963e7`, brief `2aa8e839`, lens `673576f2`, trade `7457b1a6` (file u's afters); README `7adac4db` | 7/7 | PASS |
| file u formation: blank line before every item and sub-item header, before every `---` and around every `##` | 0 defects (file t 0, file v 0) | PASS (round 1's FAIL closed) |
| file u in file r's form: title; "Numbered from"; **APPLIED** status; md5 table; *Sources*; *How to read*; `---`; items with *The question as put* / *The owner's answer* / *Its meaning* (949) and lettered fragments (header, *Current text:*, *New text:*, *Reason:*); *Not items*; *For the session* | complete; *Adjustments* added as the task's rules require | PASS |
| header md5s true (full 32-hex, 9 targets + bundle) | 10/10 | PASS |
| greps: a missed "host meaning" ask | none | PASS, see §3 |
| K14 against the gate's K rows | 3 cells, K1–K14 contiguous, 27 rows (14 + 13) | PASS, see §4 |
| against J393, J396, J398, door 1, host-placed sites, no route bent to a site, determinism | no conflict | PASS, see §5 |

**Note (a).** 949 (h)'s new text ends "…the M0 gate's K14 row, 2026-10-18), applied by the lane its status line names."
File v's 954 (d) replaced exactly that tail ("…, applied by the lane its status line names, and file v (…)"), so the
full new text with its final period is no longer present. Without the final period it occurs once in INDEX and once in
the bundle (checked). The replay accounts for the change; it is not a defect in file u.

## 3. The greps (current files)

- "host meaning": V13:3900, H25's new clause ("patrol coverage's host meaning NOT asked — … (J396); H16's optional door
  stays open"); `lens-implications.md:520`, ask 8, bracketed (949 (e)); `HOST-REQUIREMENTS-2026-10-18.md:104`, `:182`,
  `:579` (each says "not asked" / "left to the host's own programme", J396's own rewording, not file u's);
  `docs/HANDOFF.md:18` (the session's handoff, a record).
- "security input" / "road-warden": V13:138 (file u's revision note); `trade-system.md:1115` and `lens-implications.md:193`,
  `:520` bracketed; `HOST-REQUIREMENTS:356`.
- "wardenship": `trade-system.md:916-917` (§9 item 4; its closing sentence :919 bracketed, 949 (f)), :1115 (949 (g)),
  :1118 (TR-5, the host's own programme, left as before); `lens-implications.md:192` (949 (c)), :520; `fp-realm-review.md:486`,
  :660 and `fp-simulator.md:967` (the host's own terms, inbound facts, no ask).
- "patrol coverage" / "patrol-coverage": V13:2431 (the consumption law's timing; apply-u's :2425 + 6), :3891 (H16's
  optional door; apply-u's :3885 + 6), :3900, :138; `fp-realm-review.md:533`, `:663`; `research/ux/tool-survey.md:497`;
  `workflows/36*-realm-review.js` (old prompt text, not a design text); the host document and HANDOFF as above.
- "ask 8": `lens-implications.md:192`, `:193` only (both bracketed). "OQ4": the host document only.
- "patrol" in the design texts: V13 91, V14 8, INDEX 2, SUMMARY 2 (each +1 from file u's 949 (h), (i)), base 1,
  brief 2, V11 1, `proposal-world-native.md` 1. The filtered lines (V13:137-138, :547, :1305-1306, :2082, :3891, :3900,
  :3993, V14:3177) contain no ask for a host meaning.

Every hit apply-u §3 lists has the decision it records, and the current files contain no new ask. Observation, not a
FAIL of this scope: `HOST-REQUIREMENTS-2026-10-18.md:356` (the trade-OQ4 appendix row) still reads "Host to decide
whether to adopt patrol coverage, and in which slot. | open question". The same document's :104, :182 and :579 say
"not asked … left to the host's own programme". The row fits J396 ("an open question to the host's own programme"),
but the J396 rewording could add "(not asked; the owner's decision, 2026-10-18)" there. That document is the session's
(J396), not file u's.

## 4. K14 against the gate's K rows

`plat/docs/build/M0-world-sites-gate.md`: heading `## Kernel rows (K1–K14)` (:13). 27 `| K/M |` rows, every one with 3
cells when split with backticks respected; K1–K14 in order, K14 (:30) after K13. The *row* cell states the property and
names the option's form (`DecodeOptions.from?: PlatKey`, `DecodeOptions.ids?: (id) => id`), the code line and its sources,
as M12/M13 do. The *verification* cell follows K12's carried pattern: at M0 a read of `io/decode.ts` and `io/types.ts`,
recorded as carried to M1 with nothing built; at M1's API pass, K2's two-part arena decoded under a new key. Its source
facts are true at the cited lines: decode.ts:274 is `bad(c.layer === key.layer && c.part === key.part, 'a chunk of another
arena')`, and `DecodeOptions` (types.ts:21-30) carries `index?` and `digests?` only. The *Carried to M1's API pass*
paragraph (:32-34) lists K10, K12, K14, M1, M2, M4. It matches Q80 (`M0-FIX-QUEUE.md:94`) and verdict C8 (:292-295),
including the first reader, M-SITE-F's SE6. The brief's Part A (:53 "K1–K14"; the table's 27 rows, 3 cells each; K14 at
:71) and SUMMARY:227 ("twenty-seven") agree. The base's "(above; K1–K13 unchanged)" (`ARCHITECTURE.md:4970`) was left,
correctly: it refers to the transient key's change.

## 5. Against the owner's words and the standing rules

The text is unchanged since round 1 apart from blank lines, and was re-read. 949 carries J396 verbatim ("then do as you
recommend", Option B) and does not re-judge it: patrols stay map-only, the host is not asked, and H16's door stays open.
The research brackets keep the original text. 950–953 carry J395 C8–C10 and Q80–Q82 as J398 named them. 952's fallback
runs no S1 and moves no site; its frame comes from the charter's edge profile and water edges. 951's per-scene arenas
are keyed by the address, so the result is deterministic, and no route moves. 953 builds nothing at M0. Nothing in file u
touches door 1, a host-placed site's position, a route's course, or J393's catalogue (V14 §2.5's kind rows, J398).
Verdict: PASS.

## 6. For the session (observations, carried, not failures)

1. `apply-u.md` §2 still records file u at `edad734b` (377 lines). Its current state is `c1403ea0` (382 lines), which
   `fix-u.md` and the lane log record. The records are dated and append-only, so none was edited.
2. Round 1's notes stand: 950 (a)'s kept clause "builds the form at M6-P" sits beside the new gloss, and
   `ARCHITECTURE.md:24417` is a third M6-P place. E4 (a) and the ground scene's shallow elements. V13's revision note u
   quotes "a patrol is never drawn lowering danger". Missing backticks in 951 (a) and 952 (a).
3. The form source has the same blank-line slip that fix-u corrected in file u: `docs/AMENDMENTS-2026-10-18r.md:234`
   puts `---` directly under 926 (t)'s reason.
4. `HOST-REQUIREMENTS-2026-10-18.md:356` (§3 above).
