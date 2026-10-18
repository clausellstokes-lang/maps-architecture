# confirm2-t-rest — the confirming re-check of file t on INDEX, SUMMARY, the base, the gate spec, the brief and README (second round, after fix-t-rest)

Lane: sites-roads/confirm2-t-rest (Opus/high, the confirming re-check; J394), 2026-10-18 16:29–16:35 UTC.
Scope: file t's 24 fragments on six targets (INDEX 10, SUMMARY 5, the base 4, the gate spec 2, the brief 2, README 1),
their apply records (`apply-t-index.md`, `apply-t-summary.md`, `apply-t-base.md`, `apply-t-gate.md`, `apply-t-brief.md`,
`apply-t-readme.md`, `apply-t-record.md`), `docs/AMENDMENTS-2026-10-18t.md`'s header and application record, and the
first round's fixes (`fix-t-rest.md`, md5 `92d68a4e…`: file v item 954 and file t's 947 (c) label).
No git command run; the host repository untouched; this record and the lane log are the only files this lane wrote.
Scripts and outputs: `/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/sites-roads/confirm2-t-rest/`
(`check2.py` → `check2.out`; `mdcheck.out`; the `before-*`, `tafter-*`, `uafter-*` copies; `scope-new.txt`; `draft-tail.md`, `t-tail.md`).

**Verdict: PASS.** The first round's P1 (five INDEX/SUMMARY sentences and two V14 texts putting V14 Q5 as open against
J398) and P2 (947 (c)'s locator label) are fixed exactly as `confirm-t-rest.md` §5 wrote them; every file-t fragment in
scope still lands as file t states; every changed line of the six targets is a fragment of file t, u or v; file t is
complete and well-formed with true md5s; the bundle is fresh. Three notes for the session, none a defect (§6).

## 1. Independence of the check

File u's 23 and file v's 9 fragments were parsed **from the amendment files' own quotes** (`*Current text:*` one line,
⏎ a line break; `*New text:*` the blockquote's lines, `> ` removed, a bare `>` an empty line), not from the lanes'
machine copies; file t's from `draft-t.fragments.json` (`66d10247…`, re-hashed). Cross-check only: the parsed quotes
equal `apply-u/frags.py` 23/23 and `fix-t-rest/frags.py` 9/9, in order.

## 2. The check table (`python3 -I check2.py`, exit 0, FAIL 0)

Method per target: (A) reverse v, then u, then t from the current file — each new text once at its turn — giving file
u's after-md5, file t's after-md5 and the before md5; (B) forward from the kept before copy: t (each old once at its
turn, new once after, md5 = the apply record's after), then u, then v — the result **byte-equal to the current file**,
so nothing in the target moved but the fragments.

| target | before (copy; md5, lines) | + t (24) → md5, lines | + u → md5, lines | + v → md5 = current, lines | t / u / v frags |
|---|---|---|---|---|---|
| INDEX | `INDEX-42881796.md`; `42881796…`, 259 | `2ca7f112…`, 260 (= apply-t-index) | `55ad33a1…`, 260 | `10a72c97…`, 260 ✓ | 10 / 1 / 3 |
| SUMMARY | `SUMMARY-9d142283.md`; `9d142283…`, 214 | `43c7035d…`, 223 (= apply-t-summary) | `ace77881…`, 227 | `1c0ada29…`, 228 ✓ | 5 / 2 / 3 |
| base | `apply-t-base/ARCHITECTURE.before.md`; `1f871a01…`, 24 462 | `5c463a94…`, 24 467 (= apply-t-base) | `eac3a6a5…`, 24 467 | = (no v), ✓ | 4 / 2 / 0 |
| gate spec | none kept; reconstructed by the reverse chain = `b6c5be2a…`, 45 | `7349635a…`, 47 (= apply-t-gate) | `21d963e7…`, 52 | = (no v), ✓ | 2 / 2 / 0 |
| brief | `brief-fc252070.md`; `fc252070…`, 212 | `11d7d458…`, 216 (= apply-t-brief) | `2aa8e839…`, 217 | = (no v), ✓ | 2 / 2 / 0 |
| README | `retro/states/after_r__.._README.md`; `2a4b54c8…`, 31 | `7adac4db…`, 31 (= apply-t-readme) | = (no u) | = (no v), ✓ | 1 / 0 / 0 |

Per file-t fragment (24/24): recorded md5 = its target's before md5; old text once at its step; new text once after;
no old text left outside its own new text. Lines at step re-computed and equal to the apply records: INDEX 14, 40, 40,
71, 72, 186, 222, 222, 228, 48; SUMMARY 15, 85, 203, 218, 222; base 9718, 8678, 11712, 5; gate 31, 45; brief 81, 155
(apply-t-brief's 153 is 947 (q)'s line before 947 (p)'s two added lines); README 16.

In the current files 17/24 file-t new texts occur once; the other seven were each extended by a later file, and the
later fragment applied to the t new text is found once (7/7): 947 (c) by u 949 (h) (and v 954 (d) on the same line);
948 (k) by u 953 (e); 947 (h) by v 954 (e); 947 (k) by v 954 (f); 947 (l) by v 954 (g); 947 (n) by v 954 (h); 947 (o)
by v 954 (i).

File v on V14 (the volumes lane's target, checked here as file v's): reverse 954 (a)–(c) from the current V14
(`f5dd37a7…`, 3 340) gives `19b4f1c1…` (file u's after); forward from it, each old once, new once (lines 91, 3127,
3200 at step — 3123 and 3196 before (a)'s four added lines), result byte-equal to the current V14.

Line diffs of the first round's fixes (against `fix-t-rest/*.before.md`, md5s re-hashed = file v's stated befores):
INDEX 3 lines changed (14, 186, 229); SUMMARY 17–18 → 17–19, 208–210 → 209–211, 222–223 → 223–224; file t one line
(1304, 947 (c)'s label: old once before, 0 after; new once after).

## 3. The amendment file (file t)

- `docs/AMENDMENTS-2026-10-18t.md`: 1 633 lines, md5 `a5b2a1ab8b39c6c5bff94916b6e6fe6c` (= fix-t-rest and file v).
- `python3 -I confirm-t-rest/mdcheck.py` (re-run on the current file): 138 lettered items, 138 in the JSON, none extra
  or missing; each *Current text* and *New text* equals the JSON's old/new, the head names the target, one *Reason:*
  line — bad 0 (24/24 in scope).
- From "**The fix round**" (t:47, draft:24) to the end, file t (1 587 lines) differs from `draft-t.md` (`2642fddb…`)
  in two lines only: 1304 (947 (c)'s corrected label, P2) and the Q5 owner-questions cell
  "— **ANSWERED 2026-10-18: Yes (J398)**".
- Header md5s true: the eight targets' before → after md5s and lines as in §2 and in `apply-t-record.md` §1 (V13, V14
  equal file u's recorded befores); `draft-t.fragments.json` `66d10247…` re-hashed; the bundle's `d2ab45bb…` was
  reproduced by the first round (`confirm-t-rest.md` §2) and the targets it was built from are re-derived here.
- File r's form (file r read whole, 262 lines): title; "Numbered from"; **APPLIED** status line; the application target
  by target; sources; how to read; the items (target, line, md5, current text once, new text in full, reason); the
  not-items; *For the session*. File t has each. Well-formed.
- File v (`docs/AMENDMENTS-2026-10-18v.md`, 170 lines, `d2c39f0f…`), the first round's fix: file r's form, item by
  item (title; provenance line; "Numbered from **954** (file u ended at 953)"; **APPLIED**; target by target with true
  md5s — V14 `19b4f1c1…`→`f5dd37a7…` 3 336→3 340, INDEX `55ad33a1…`→`10a72c97…`, SUMMARY `ace77881…`→`1c0ada29…`
  227→228, bundle `dbef7781…`→`bd69e9a6…`, 81 358 newlines; sources; how to read; item 954 with the question, the
  owner's answer and its meaning; (a)–(i); *Adjustments and additions*; *Not items*; *For the session*). A blank line
  before every item header, `## ` heading and `---`, and after every `---` (script: 0 problems).

## 4. The bundle

`cd /home/user/maps-architecture && python3 tools/bundle_architecture.py --check` → "UP TO DATE
/home/user/maps-architecture/docs/ARCHITECTURE-FULL.md", exit 0 (md5 `bd69e9a6…`, 81 358 newlines).
File t's V13 (70), V14 (44) and base (4) new texts: 116 once as written; 2 (V14's 940 (d), whose Q5 cell file v's
954 (c) extends, and 946 (t), extended by file u) found once with the later fragment applied — 118/118 accounted.
File v's six V14/INDEX new texts once each (6/6). `diff fix-t-rest/FULL.before.md` (`dbef7781…`) → now: the INDEX and
V14 header rows, INDEX 14, 186, 229, V14's four-line note, J-V14.57, Q5 — nothing else.

## 5. Reading against the owner's words and the standing rules

Read in full: the 24 scope fragments' new texts (`scope-new.txt`), file v whole, INDEX:184–190 and :229, SUMMARY:12–22
and :195–228, J393–J398 (`docs/PROGRESS.md:451-457`, read only).

- **J398** (Q5 answered "Yes"; "the one owner question of draft t is closed"): now carried. INDEX:186 reads "the owner
  answered it the same day: yes, "the catalogue" is V14 §2.5's site kind rows, J398): of the others, the owner deferred
  …"; INDEX:229 "yes — the owner's own answer, given 2026-10-18 (J398) … (answered by the owner)"; SUMMARY:17–19
  "that you answered the same day: yes"; SUMMARY:209–211 "You said yes on 18 October; the design reads it so.";
  SUMMARY:223–224 "seven proceed on their recommendation … two you answered" (7 + 2 = 9). Grep over all six targets
  for `Q5`, `the catalogue`, `until you say otherwise`, `eight proceed`, `one you answered`: no line puts V14 Q5 as
  open (SUMMARY:20's "until you say otherwise" is the others'; INDEX's V08/V10 Q5 rows and the base's J80 Q5 are other
  questions). The owner's answer is carried as given, not re-judged.
- **J393**: carried (947 (d), (m), (q), (r), 945 (j)/(k), 946 (x), 947 (p)). No contradiction.
- **J396** (patrols map-only, host not asked): no scope text of file t or v mentions patrols. No contradiction.
- **Standing rules**: door 1 — no scope text sends anything to the host; a host-placed site never re-sited — 947 (m)
  moves only a site the DM drops, "one click keeping the spot you chose"; no route bent to a site — 947 (m) "no road is
  ever bent to reach a site", 945 (j) links a reservation to the nearest way corridor by its own face; determinism —
  nothing random or order-dependent; M13 "nothing is built at M0". No contradiction.

## 6. Notes for the session (not defects; no fix required of a lane)

1. File t's header (`AMENDMENTS-2026-10-18t.md:29-31`) still says the volumes' Q5 texts "are applied as the draft wrote
   them, with Q5's recommendation; the owner's answer (J398) is recorded in the owner-questions table below" — true of
   file t's own application; file v (item 954) now carries the answer into the volumes. If the session wants the pointer,
   the exact edit: replace `the owner's answer (J398) is recorded in the owner-questions table
   below.` with `the owner's answer (J398) is recorded in the owner-questions table
   below and carried into the volumes by file v (`docs/AMENDMENTS-2026-10-18v.md`, item 954).` (the old text spans the
   line break after "table"; once in the file).
2. `README.md:16` (*The owner's rules and words*) names files r and t but neither u (J396) nor v (J398) — as
   fix-t-rest and file v's *For the session* already record; README is not a lane file here.
3. The ledger row for file v's application (beside J399) is the session's; `docs/PROGRESS.md` not edited.

## 7. Commands run

- `python3 -I scratchpad/sites-roads/confirm2-t-rest/check2.py` → exit 0, FAIL 0 (§1, §2, §4).
- `python3 -I scratchpad/sites-roads/confirm-t-rest/mdcheck.py` → 138 items, in scope 24, bad 0, md5 `a5b2a1ab…` (§3).
- a formation script over file v (blank lines round headers and rules) → 0 problems (§3).
- `python3 tools/bundle_architecture.py --check` → "UP TO DATE", exit 0 (§4).
- `diff` of `fix-t-rest/{t,INDEX,SUMMARY,FULL}.before.md` against the current files; `diff` of draft-t (from line 24)
  against file t (from line 47); `md5sum`, `wc -l`, `grep`, `sed -n` over the targets, files r, t, u, v, the apply
  records and `docs/PROGRESS.md:451-457` (read only).

Status: LANDED (PASS).
