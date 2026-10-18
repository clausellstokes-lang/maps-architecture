# confirm-t-rest — the confirming re-check of file t on INDEX, SUMMARY, the base, the gate spec, the brief and README

Lane: sites-roads/confirm-t-rest (Opus/high, the confirming re-check; J394), 2026-10-18 16:16–16:24 UTC.
Scope: file t's 24 fragments on six targets (INDEX 10, SUMMARY 5, the base 4, the gate spec 2, the brief 2, README 1),
their apply records (`apply-t-index.md`, `apply-t-summary.md`, `apply-t-base.md`, `apply-t-gate.md`, `apply-t-brief.md`,
`apply-t-readme.md`, `apply-t-record.md`), and `docs/AMENDMENTS-2026-10-18t.md`'s header and application record.
No git command run; the host repository untouched; this record and the lane log are the only files this lane wrote.
Scripts and their outputs: `/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/sites-roads/confirm-t-rest/`
(`check.py` → `check.out`, `mdcheck.py` → `mdcheck.out`, `rebundle.py`, the `before-*`, `tafter-*` and `diff-*` copies).

**Verdict: FAIL — mechanics all PASS; one content problem (P1): the applied INDEX and SUMMARY texts still put V14 Q5
to the owner as open ("recommended; vetoable", "until you say otherwise"), against J398 ("Q5 ANSWERED — Yes … The one
owner question of draft t is closed"). One minor record nit (P2).** Exact fixes below.

## 0. A fact the check had to account for

File u (`docs/AMENDMENTS-2026-10-18u.md`, lane sites-roads/apply-u, LANDED 16:16) has since changed five of the six
targets (INDEX 949 (h); SUMMARY 949 (i), 953 (e); the base 950 (a), 951 (d); the gate 953 (a), (b); the brief
953 (c), (d); README none). So "nothing else moved" was checked in two steps: before → t-after (file t alone), and
t-after → now (file u alone, by reversing u's 9 fragments on these targets from its machine copy
`scratchpad/sites-roads/apply-u/frags.py`).

## 1. The check table (script `check.py`, `python3 -I`, exit 0, FAIL 0)

| target | before copy (md5) | t forward from before → md5 | u reversed from now → md5 | t reversed → before md5 | now (md5, lines) |
|---|---|---|---|---|---|
| INDEX | `scratchpad/sites-roads/INDEX-42881796.md` (`42881796…`, 259) | `2ca7f112…` (260) = record | `2ca7f112…` = record | `42881796…` | `55ad33a1…`, 260 |
| SUMMARY | `SUMMARY-9d142283.md` (`9d142283…`, 214) | `43c7035d…` (223) = record | `43c7035d…` = record | `9d142283…` | `ace77881…`, 227 |
| base | `apply-t-base/ARCHITECTURE.before.md` (`1f871a01…`, 24 462) | `5c463a94…` (24 467) = record | `5c463a94…` = record | `1f871a01…` | `eac3a6a5…`, 24 467 |
| gate spec | none kept; reconstructed by reversing t from the u-reversed file | (`b6c5be2a…`, 45) → `7349635a…` (47) = record | `7349635a…` = record (also = `scratchpad/sites-roads/fix/after-plat_docs_build_M0-world-sites-gate.md`) | `b6c5be2a…` = the fragments' md5 | `21d963e7…`, 52 |
| brief | `brief-fc252070.md` (`fc252070…`, 212) | `11d7d458…` (216) = record | `11d7d458…` = record | `fc252070…` | `2aa8e839…`, 217 |
| README | `scratchpad/retro/states/after_r__.._README.md` (`2a4b54c8…`, 31) | `7adac4db…` (31) = record | no u fragment; now = `7adac4db…` | `2a4b54c8…` | `7adac4db…`, 31 |

Per fragment (24): the fragment's recorded md5 = its target's before md5 (24/24); the old text exactly once at its
step (24/24); the new text exactly once in the t-after file (24/24); old text outside its own new text in the t-after
file 0 (24/24; prefixes: 947 (k), 947 (m), 947 (n), 948 (j), 946 (x), 947 (p); suffix: 947 (c)). In the current files
22/24 new texts are once; the two that are not were each extended by file u, and reversing u restores them:
947 (c) (INDEX:14, extended by u 949 (h) with file u's clause) and 948 (k) (SUMMARY "twenty-six" → "twenty-seven" by u
953 (e), Q80's K14 row).

Lines at step and after, re-computed, agree with every apply record: INDEX 14, 40, 40, 71, 72, 186, 222, 222, 228, 48;
SUMMARY 15, 85, 203, 218, 222; base at step 9718, 8678, 11712, 5 and after 9723, 8680, 11714, 5; gate 31, 45; brief
81, 155 (947 (q)'s 153 + 947 (p)'s two lines); README 16.

`diff before t-after` per target (every hunk is a fragment; the forward-apply md5 equality makes the account exact):
INDEX 7 hunks (−7 +8 lines; 947 (d)/(e) share line 40, 947 (i)/(j) line 222, (f)/(g) adjacent), SUMMARY 5 (−7 +16),
base 4 (−3 +8), gate 2 (−1 +3), brief 2 (−1 +5), README 1 (−1 +1).

## 2. The amendment file (`mdcheck.py`, `python3 -I`)

- `docs/AMENDMENTS-2026-10-18t.md`: 1 633 lines, md5 `2d6a63086bb1a4277473a735bfcb6049` (= apply-t-record).
- 138 lettered items parsed (`**94n (x).**`), 138 in the JSON, 0 extra, 0 missing; for every one the *Current text*
  and *New text* blockquotes (⏎ read as a line break) equal the JSON's old/new, the head names the target file, and one
  *Reason:* line: 138/138, 24/24 in this scope.
- From "**The fix round**" to the end the file equals `draft-t.md` (md5 `2642fddb…` re-hashed) but for the Q5 cell's
  "— **ANSWERED 2026-10-18: Yes (J398)**" (`diff` empty after removing it).
- r's form (file r read whole, 262 lines): title; "Numbered from"; the **APPLIED** status line; sources; how to read
  the items; the items with target, line, current text once, new text in full, reason; the not-items section; *For the
  session*. File t carries each (its *Gaps judged not taken*, *Owner questions*, *What this file leaves unchanged and
  why* play r's *Not items*), plus the application paragraph target by target. Well-formed.
- The header's md5s are true: the six in scope as in §1; V13 `d0de9ad8…` → `02049f9d…` and V14 `70d8aa1b…` →
  `681cc8d9…` equal file u's recorded before-md5s (`apply-u/apply.json`); `draft-t.fragments.json` `66d10247…`
  re-hashed; the bundle's `d2ab45bbe7a99bd7fb4f0e2b25b463bc` (81 340 lines) REPRODUCED: the bundle tool run in a scratch
  tree on the t-after base, INDEX, V13 and V14 (file u reversed) and the other volumes as they stand gave exactly
  `d2ab45bb…`, "81340 lines from 16 source(s)" (`rebundle.py`).
- The lane records' md5s named in the log: `apply-t-brief.md` `f20b9815…`, `apply-t-record.md` `ce42e660…` (72 lines): true.

## 3. The bundle

`cd /home/user/maps-architecture && python3 tools/bundle_architecture.py --check` → "UP TO DATE", exit 0 (now
`dbef7781…`, 81 354 newlines, regenerated by file u). Every V13 (70), V14 (44) and base (4) new text of file t occurs
exactly once in it: 118/118. Every V13/V14 new text also once in its current volume.

## 4. Reading against the owner's words and the standing rules

Read in full: the 24 fragments' old, new and reason (`scope-frags.txt`), J393, J396, J397, J398
(`docs/PROGRESS.md:451-457`), INDEX §6 and SUMMARY's decision sections as they stand.

- J393 (road access by kind, integration with the roads, catalogue-driven autocorrect): carried — 947 (d), (m), (q),
  (r), 945 (j)/(k), 946 (x), 947 (p). No contradiction.
- Standing rules: door 1 — no scope text sends anything to the host; "a host-placed site never re-sited" — no scope text
  moves one (947 (m) speaks of a site the DM drops); "no route bent to a site" — 947 (m) says it in plain words, 945 (j)
  links a reservation by a hinterland `driveway`/`path` face to the nearest way corridor, no route moved; determinism —
  nothing random or order-dependent added; M13 "nothing is built at M0". No contradiction.
- J396 (patrols map-only, host not asked): no scope text of file t mentions patrols. No contradiction.
- **J398 (Q5 answered "Yes"; "the one owner question of draft t is closed"): CONTRADICTED by five applied sentences
  (P1).**

## 5. Problems and exact fixes

**P1 (content; J398).** As they stand now, these say Q5 still waits on the owner:
INDEX:186 (947 (h)) puts Q5 among the questions that "stand as recommended; vetoable until the owner rules" and among
those "the owner deferred … (2026-10-16)"; INDEX:229 (947 (k)) answers it "(recommended; vetoable)"; SUMMARY:17-19
(947 (l)) counts it among "the others" that proceed "on the recommendation until you say otherwise"; SUMMARY:208-210
(947 (n)) "recommended yes; the design reads it so until you say otherwise"; SUMMARY:222-223 (947 (o)) "eight proceed on
their recommendation … one you answered". File r item 926 is the precedent: an owner's answer supersedes every live
sentence that says the question waits. apply-t-record §5 noted this and left it for file u, which did not take it.
FIX: a new amendments item (file v, numbered after file u's last item, in file r item 926's form; Opus apply and
confirm, J394), five exact replacements, each old text verified ONCE in the current target (script, 16:22 UTC):

1. `docs/volumes/INDEX.md` — old: `Volumes 13 and 14's nine questions carry the session's recommendation (V14 Q5, put on 2026-10-18 under J393, among them): the owner deferred`
   new: `Volumes 13 and 14's nine questions carry the session's recommendation (V14 Q5, put on 2026-10-18 under J393, among them; the owner answered it the same day: yes, "the catalogue" is V14 §2.5's site kind rows, J398): of the others, the owner deferred`
2. `docs/volumes/INDEX.md` — old: `| yes; if another list was meant, the columns move to it unchanged in substance (recommended; vetoable) |`
   new: `| yes — the owner's own answer, given 2026-10-18 (J398): "the catalogue" is V14 §2.5's site kind rows (`tables/sites/kinds`) (answered by the owner) |`
3. `docs/volumes/SUMMARY.md` — old (two lines): `closed door that keeps your host's simulator from reading the map — that you answered yourself on 18 October: yes; and one⏎put to you on 18 October with your word on sites and their roads — what "the catalogue" meant); each of the`
   new: `closed door that keeps your host's simulator from reading the map — that you answered yourself on 18 October: yes; and one⏎put to you on 18 October with your word on sites and their roads — what "the catalogue" meant — that you answered the⏎same day: yes, the list of site kinds you pick from); each of the`
4. `docs/volumes/SUMMARY.md` — old (three lines): `- **The sites and their roads** (one question, put to you on 18 October with your word on sites and roads): whether⏎  "the catalogue" in that word means the list of site kinds you pick from, each of which now says whether it needs a⏎  road and whether it moves itself to fit — recommended yes; the design reads it so until you say otherwise.`
   new: `- **The sites and their roads** (one question, put to you on 18 October with your word on sites and roads, and answered⏎  by you the same day): whether "the catalogue" in that word means the list of site kinds you pick from, each of which⏎  now says whether it needs a road and whether it moves itself to fit. You said yes on 18 October; the design reads it so.`
5. `docs/volumes/SUMMARY.md` — old (two lines): `the nine decisions above (eight proceed on their recommendation until you⏎say otherwise; one you answered on 18 October),`
   new: `the nine decisions above (seven proceed on their recommendation until you⏎say otherwise; two you answered on 18 October),`

Then regenerate the bundle (`python3 tools/bundle_architecture.py`, `--check` exit 0; INDEX is a bundle source) and
append the ledger row. Outside this lane's scope, for the same item (the V14 confirm lane's targets): V14 §11's Q5
row (`docs/volumes/V14-sites.md:3196`, 940 (d)) — its answer cell to gain "**Answered by the owner, 2026-10-18 (J398):
yes.**" as file r 926 (g) did for V13 Q4; and J-V14.57's closing "put to the owner as V14 §11 Q5 (vetoable)" (`:3123`)
to read "put to the owner as V14 §11 Q5, answered yes on 2026-10-18 (J398)".

**P2 (minor, record only).** `docs/AMENDMENTS-2026-10-18t.md:1304` labels 947 (c) "The index — the revision notes under
the title (replacement)", but INDEX:14 is the preamble's state line (*What this file is*: the amendment files' state;
file u's 949 (h) names the same passage so). FIX: in that line replace
`**947 (c).** The index — the revision notes under the title (replacement).` with
`**947 (c).** The index — the preamble (*What this file is*: the amendment files' state) (replacement).`
(the fragment's texts and its application are right; only the locator label is wrong).

## 6. Commands run

- `python3 -I scratchpad/sites-roads/confirm-t-rest/check.py` → exit 0, FAIL 0 (§1, §3's 118/118).
- `python3 -I scratchpad/sites-roads/confirm-t-rest/mdcheck.py` → 138 items, bad 0 (§2).
- `python3 -I scratchpad/sites-roads/confirm-t-rest/rebundle.py` then `python3 -I scratchpad/sites-roads/confirm-t-rest/tree/tools/bundle_architecture.py` → `d2ab45bb…`, 81 340 lines (§2).
- `python3 tools/bundle_architecture.py --check` → "UP TO DATE", exit 0 (§3).
- `diff before-* tafter-*` per target (§1); `md5sum`, `wc -l`, `grep`, `sed -n` over the targets, file r, file t, draft-t and `docs/PROGRESS.md:451-457` (read only).

Status: LANDED (FAIL on P1; P2 minor).
