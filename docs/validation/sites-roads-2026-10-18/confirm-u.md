# confirm-u — the confirming re-check of file u and apply-u

Lane: sites-roads/confirm-u (Opus/high, the confirming re-check; J394), 2026-10-18 16:17–16:25 UTC. Scope: file u
whole (`docs/AMENDMENTS-2026-10-18u.md`, items 949–953, 23 fragments) and `apply-u.md`. Edited only this record and
the lane log; no target, no amendment file and no journal touched; no git command run; the host repository
(`/home/user/clausellstokes-lang/settlement-engine` at `81f1cd96`) read only. Scripts and outputs in
`/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/sites-roads/confirm-u/`
(`parse.py`, `frags-u.json`, `check.py`, `check.out`, `grep-wide.txt`, the reconstructed `before-*` copies,
`AMENDMENTS-u.fixed-preview.md`).

**Verdict: FAIL — one formation defect in file u (mechanical; exact fix below). Every fragment, the targets, the md5s,
the greps, the K14 row and the bundle PASS.**

## 1. Method (independent of the apply lane's data)

1. `python3 -I parse.py frags-u.json` — the 23 fragments parsed from file u's own text (header regex: item, letter,
   target, line, md5 prefix; *Current text:* one `> ` line with ⏎ for line breaks; *New text:* the `> ` lines, a bare
   `>` an empty line). Result: 23 (V14 7, lens-implications 3, V13 2, trade-system 2, SUMMARY 2, base 2, gate spec 2,
   brief 2, INDEX 1) — the counts file u's status line states.
2. `python3 -I check.py` (output `check.out`, `FAIL 0`):
   - (0) file u's quoted old/new texts and order against the applier's data `apply-u/frags.py` (read as data):
     identical, 23/23.
   - (1) every target's md5 now equals file u's stated after-md5 (9/9); every new text exactly once in its target
     (23/23); no old text left outside its own new text (23/23; the old is a prefix/part of its new in 949 (b), (f),
     (g), (i), 950 (a), (c), 952 (a), (b), 953 (b), (d)).
   - (2) **reverse round-trip**: each target with its fragments undone in reverse order (new once → old) reproduces the
     stated before-md5 exactly (9/9) — so nothing else in any target moved. The before-md5s are file t's after-md5s
     (`apply-t-record.md` §1: V13 `02049f9d`, V14 `681cc8d9`, INDEX `2ca7f112`, SUMMARY `43c7035d`, base `5c463a94`,
     gate `7349635a`, brief `11d7d458`).
   - (3) forward re-apply on the reconstructed before copies: every old text once at its turn (23/23), every new once
     after (23/23), every cited line (or line range) and md5 prefix equal to the computed ones (23/23), and the result
     byte-identical to the current target (9/9).
   - (4) the bundle (`docs/ARCHITECTURE-FULL.md`, md5 `dbef77819c737d5c3d0bf6cd5cd1a732`, `wc -l` 81 354, the
     generator's 81 355): the twelve new texts of the bundled sources (V13 2, V14 7, base 2, INDEX 1; SUMMARY, the
     brief, the gate spec and the research notes are not bundle sources — `tools/bundle_architecture.py` `sources()`)
     each exactly once, no old text outside its new (12/12).
3. `python3 -I tools/bundle_architecture.py --check` → `UP TO DATE`, **exit 0** (16:17 UTC).
4. Untouched files re-hashed: `README.md` `7adac4db…` (file t's after), `docs/AMENDMENTS-2026-10-18u.md` `edad734b…`
   (377 lines), `apply-u.md` `b55b30b9…`, `docs/AMENDMENTS-2026-10-18t.md` `2d6a6308…` — as their records state.

## 2. The check table

| check | result |
|---|---|
| 23 fragments: old once before at its turn, new once after | PASS 23/23 (reverse and forward, `check.out`) |
| cited lines and md5s (as the targets stood before file u) | PASS 23/23 |
| nothing else moved in any target | PASS 9/9 (reverse round-trip to the exact before-md5) |
| stated before → after md5s (file u's application paragraph, apply-u §2) | PASS 9/9, full 32-hex md5s |
| line counts (apply-u §2) | PASS (V13 4 605→4 611, V14 3 327→3 336, INDEX 260, SUMMARY 223→227, base 24 467, gate 47→52, brief 216→217, lens 615, trade 1 280) |
| bundle fresh and carrying each V13/V14/base/INDEX new text once | PASS (`--check` exit 0; 12/12) |
| the greps of item 949 (task (b)–(d)) | PASS — see §3 |
| the K14 row's form against K1–K13 | PASS — see §4 |
| no sentence against the owner's words (J393, J396, J398) or the standing rules | PASS — see §5 |
| file u complete and in file r's form | **FAIL — §6 (blank lines missing at four item boundaries and before the closing rule)** |
| sources' citations (host code at `81f1cd96`, kernel, hydro, verdict, queue, journal) | PASS — every cited line read: `commercialReasons.js:55-57` (route_predation / route_wardenship, "an honest permanent zero until it lights"), `:338` `scoreCommercialReasons`; `embattlement.js:55-58` ("a peaceful or aspatial world carries no `embattlement` key"), `:74` `ENTER_THRESHOLD: 0.55`; `decode.ts:274` ("a chunk of another arena"); `io/types.ts:21-30` (`index?`, `digests?` only); `hydro/field.ts:1-2` (16 / 25 / 32 m); `hydro/params.ts:43` (`ESTUARY_LENGTH_M = 400`); `PROGRESS.md:455` J396, `:457` J398; verdict `:114` E-31, `:123-124` O2/O1, `:188-199` S1, `:292` K14; `M0-FIX-QUEUE.md:94-96` Q80–Q82; `checks/M0-world-sites-gate.md:471` (the carried K10, K12, M1, M2, M4) |

## 3. The greps (a missed "host meaning" ask is a FAIL — none missed)

On the reconstructed before copies (V13, V14, base, brief, INDEX, SUMMARY) and the unchanged `docs/volumes/V01–V12`
and `docs/design/*.md`:

| pattern | hits (before file u) |
|---|---|
| "host meaning" | V13:3894 only (H25) → 949 (a) |
| "security input" | V13:3894 only → 949 (a) |
| "road-warden" | V13:3894 only → 949 (a) |
| "wardenship" | none |
| "patrol coverage" | V13:2425 (the consumption law's timing), :3885 (H16's optional door), :3894 (→ 949 (a)) |
| "patrol-coverage" | none |
| "patrol" (lines, case-insensitive) | V13 87, V14 8, INDEX 1, SUMMARY 1, base 1, brief 2, V11 1, `proposal-world-native.md` 1 — the counts apply-u §3 gives |

A further scan of every "patrol" line with "meaning / ask / security / warden / predation / consum / adopt" found
V13:541, :1299, :1300, :2076, :3885, :3894, :3987 and V14:3164 — none an ask of a host meaning (the port's optional
`patrolOffer`, the approach road's exclusions, the offer "consumed only by the host's choice", H16's door, J-V13.78's
vocabulary, the V13 request list). Research: `lens-implications.md` "ask 8" — :192, :193, :520, all bracketed
(949 (c)–(e)); no other "ask 8" in `research/`, the volumes, the design or the base. `trade-system.md`: no literal
"OQ4" (§10.3's fourth bullet :1115 bracketed, 949 (g)); "wardenship" :916-917 (§9 item 4, its closing sentence :919
bracketed, 949 (f)), :1115 (949 (g)), :1118 (TR-5, the host's own programme — left, rightly). A repository-wide grep
(`grep-wide.txt`, 59 lines outside `docs/validation/` and the bundle) adds `research/sf/fp-realm-review.md:486, :660,
:663` (the host's own interdiction patrols and wardenship terms as INBOUND facts; H16's optional consumer) and
`fp-simulator.md:967`, `research/ux/tool-survey.md:497` — none asks the host for a patrol-coverage meaning, and all lie
outside the task's (b)/(c) scope; `HOST-REQUIREMENTS-2026-10-18.md` was reworded at J396 (not file u's). INDEX (949 (h))
and SUMMARY (949 (i)) name file u beside file t; the summary's sentence matches J396 ("patrols stay on the map only for
now — your host is not asked to give them a meaning, and the door stays open").

## 4. K14 against the gate's K rows

`plat/docs/build/M0-world-sites-gate.md`: the kernel table is `| # | the row | verification |`; K1–K14 each three
cells (counted by script, backtick-aware); K14 sits after K13 in the kernel table, the heading `## Kernel rows
(K1–K14)`. Its *row* cell states the property (load under a caller-named `PlatKey` with an id map, printing and
digests equal to the same content built under the new key) with the option's form, the code line and its sources, as
M12/M13 carry theirs; its *verification* cell follows K12's carried-row pattern ("if absent, carry to M1 with the
smallest addition named"): at M0 read `io/decode.ts` and `io/types.ts`, recorded carried-to-M1, nothing built — the
spec's "No row adds a feature" and "resolved before M0 commits, or carried to M1's API pass with its reason" hold. The
*Carried to M1's API pass* paragraph names K10, K12, K14, M1, M2, M4 (the checker's report `:471` carried K10, K12,
M1, M2, M4). The brief's Part A table (three cells, K1–K14 then M1–M13) and its range "K1–K14" match; SUMMARY's
count twenty-seven = 14 + 13. No other text counts the gate's rows (grep "K1–K13", "twenty-six", "26 rows"): the base's
`TransientKey` comment "(above; K1–K13 unchanged)" (`ARCHITECTURE.md:4970`) is about that change, left rightly.

## 5. Against the owner's words and the standing rules

949 carries J396 as given (Option B; "then do as you recommend" verbatim; H16's door open; the host not asked) and
does not re-judge it; no fragment touches door 1, the canon (file r item 926), a host-placed site, a route's course or
any seed/stream (determinism). 950–953 carry J395's C8–C10 and Q80–Q82 as J398 named them; 952's fallback runs no S1
and moves no site; 953 builds nothing at M0. Nothing contradicts J393 (the catalogue = V14 §2.5's kind rows, J398) —
file u touches no site-kind, access or autocorrect text.

## 6. The problem (FAIL)

**File u's item boundaries are not separated from the preceding paragraph.** `docs/AMENDMENTS-2026-10-18u.md` lines
151→152, 186→187, 230→231 and 253→254 run a fragment's `*Reason:*` line straight into the next item's bold header
(`**950.**`, `**951.**`, `**952.**`, `**953.**`), so in rendered Markdown each item header joins the previous reason's
paragraph (file t, the same family, puts a blank line before every item header; file r's fragments are blank-line
separated); and line 307→308 puts `---` straight under 953 (e)'s reason, which makes that reason a setext heading.

**Exact fix** (one edit lane, Opus): in `docs/AMENDMENTS-2026-10-18u.md` make these five single replacements, each
asserted once before and once after:

1. `files t and u were not named.\n**950.**` → `files t and u were not named.\n\n**950.**`
2. `record every amendment file that changes it.\n**951.**` → `record every amendment file that changes it.\n\n**951.**`
3. `names how the encounter crop keeps it.\n**952.**` → `names how the encounter crop keeps it.\n\n**952.**`
4. `the spike's exit names the measurement.\n**953.**` → `the spike's exit names the measurement.\n\n**953.**`
5. `(apply-t-record §5: "Q80's K14 row is file u's").\n---` → `(apply-t-record §5: "Q80's K14 row is file u's").\n\n---`

Result (previewed on a scratch copy, `AMENDMENTS-u.fixed-preview.md`): 382 lines, md5
`c1403ea0ede814134563f1ddbc4ff5c6`. No target and no bundle changes (file u is not a bundle source); the fix lane
records the new md5 beside apply-u's `edad734b` in its own record and lane line (the log is append-only).

## 7. For the session (observations, not failures of this lane's checks)

1. **950 (a)'s gloss.** The base's §3.4 now reads "the kernel's stub row (`API.md` §8) builds the form at M6-P, its
   first view owner is M-ENC's. The transient arena's form is built by M-ENC's SE0 …, M6-P its second reader; the
   base's M6-P sentence above states the second reader." — the sentence the computed task dictated verbatim, applied
   exactly; but the kept clause still says the form is *built* at M6-P, so Q81 (a) closes only through the gloss. For
   the coherence pass, a cleaner single sentence: "the kernel's stub row (`API.md` §8) is built at M-ENC's SE0 (V14
   §8, the first crop), its first view owner M-ENC's and M6-P its second reader." The base's staged-hooks table still
   lists "the transient arena" among the plan rung's hooks under "volume 3 (M6-P …)" (`ARCHITECTURE.md:24417`), a third
   M6-P place Q81 did not name.
2. **951 and the ground scene's shallow elements.** V14 §3.10 (3) puts in the resolved set, "on the ground, the
   elements whose ceiling lies within `surfaceClearCm` of the ground"; if those belong to the ground scene, the ground
   scene's own arena still holds a footprint and a shallow cellar or sewer face overlapping in plan, and E4 (a)'s
   bracket "a cellar's face under its building's footprint lies in another scene's arena" holds only when underground
   element faces enter the band or level scene's arena alone. One sentence in E4 (a) saying so would close O1 fully.
3. **V13's revision note u** quotes the lens rule as "a patrol is never drawn lowering danger" (§5.8) — J396's and the
   host document's phrase; V13's own words are §5.8 (4)'s "a patrol lowering danger" (refused) and the patrols lens's
   refusal "a patrol drawn lowering danger" (`V13-world.md:3309`, `:3428`).
4. Style only: 951 (a)'s "EncounterCrop.scenes" / "pointLocate" and 952 (a)'s code paths and `ESTUARY_LENGTH_M` are
   not in backticks, unlike the volume's style (the dictated text).
