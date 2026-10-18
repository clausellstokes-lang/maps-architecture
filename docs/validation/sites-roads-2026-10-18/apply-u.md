# apply-u — file u written and applied (the patrols decision, Q81's two sentences, Q82's fallback row, Q80's K14)

Lane: sites-roads/apply-u (Opus/high; J394, Fable-critiqued), under J396 (the owner's "then do as you recommend" =
Option B), J395 (the M0 coverage verdict's C8–C10; queue rows Q80–Q82) and J398 (the owner's "Yes" on Q5, which opened
the apply of files t and u), 2026-10-18 from 16:06 UTC. Ran after file t's application (`apply-t-record.md`, its lane
LANDED 16:06). Edits only the files the lane's task names; no git command run; the host repository untouched.

## 0. Read first

- `docs/AMENDMENTS-2026-10-18r.md` whole (the form); `docs/AMENDMENTS-2026-10-18t.md`'s header; `apply-t-record.md` whole.
- `docs/PROGRESS.md` J395–J398 (read, not edited); `docs/M0-FIX-QUEUE.md` Q80–Q82; the verdict's C8–C10 rows and §3 (d)–(e)
  (`docs/validation/m0-coverage-2026-10-18/verdict.md`).
- The targets re-hashed at 16:08 UTC, every one at file t's after-md5 (`apply-t-record.md` §1): V13 `02049f9d…`, V14
  `681cc8d9…`, INDEX `2ca7f112…`, SUMMARY `43c7035d…`, the base `5c463a94…`, the gate spec `7349635a…`, the brief
  `11d7d458…`, README `7adac4db…`; the research notes `research/sf/lens-implications.md` `901c8bb6…`,
  `research/sf/trade-system.md` `4ab935c8…`; the bundle `d2ab45bb…`.

## 1. The fragments (applied by script, in file u's order)

Data `sites-roads/apply-u/frags.py`, applier `apply.py` (`python3 -I apply.py dry …` first on in-memory copies, then
`apply`; output `dry.json`, `apply.json`), in the lane scratchpad
`/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/sites-roads/apply-u/`. For each
fragment the script asserted the current text exactly once in its target at its turn and the new text exactly once
after; before writing, it checked no two fragments of one target overlap and re-read each target to be sure it had not
changed under the lane. Dry run and apply: 23 / 23, no failure, no overlap (950 (b) and 952 (b) share SE0's row, on
disjoint spans). Lines and md5s are the targets' before this file.

| fragment | target | line before | md5 before | old once before | new once after | old after |
|---|---|---|---|---|---|---|
| 949 (a) | `docs/volumes/V13-world.md` | 3894 | `02049f9d…` | 1 | 1 | gone |
| 949 (b) | `docs/volumes/V13-world.md` | 134 | `02049f9d…` | 1 | 1 | contained in its new |
| 949 (c) | `research/sf/lens-implications.md` | 192 | `901c8bb6…` | 1 | 1 | gone |
| 949 (d) | `research/sf/lens-implications.md` | 193 | `901c8bb6…` | 1 | 1 | gone |
| 949 (e) | `research/sf/lens-implications.md` | 520 | `901c8bb6…` | 1 | 1 | gone |
| 949 (f) | `research/sf/trade-system.md` | 919 | `4ab935c8…` | 1 | 1 | contained in its new |
| 949 (g) | `research/sf/trade-system.md` | 1115 | `4ab935c8…` | 1 | 1 | contained in its new |
| 949 (h) | `docs/volumes/INDEX.md` | 14 | `2ca7f112…` | 1 | 1 | gone |
| 949 (i) | `docs/volumes/SUMMARY.md` | 161 | `43c7035d…` | 1 | 1 | contained in its new |
| 950 (a) | `docs/ARCHITECTURE.md` | 4967 | `5c463a94…` | 1 | 1 | contained in its new |
| 950 (b) | `docs/volumes/V14-sites.md` | 2992 | `681cc8d9…` | 1 | 1 | gone |
| 950 (c) | `docs/volumes/V14-sites.md` | 85 | `681cc8d9…` | 1 | 1 | contained in its new |
| 951 (a) | `docs/volumes/V14-sites.md` | 2176–2180 | `681cc8d9…` | 1 | 1 | gone |
| 951 (b) | `docs/volumes/V14-sites.md` | 2185–2186 | `681cc8d9…` | 1 | 1 | gone |
| 951 (c) | `docs/volumes/V14-sites.md` | 2085–2086 | `681cc8d9…` | 1 | 1 | gone |
| 951 (d) | `docs/ARCHITECTURE.md` | 4988 | `5c463a94…` | 1 | 1 | gone |
| 952 (a) | `docs/volumes/V14-sites.md` | 2850 | `681cc8d9…` | 1 | 1 | contained in its new |
| 952 (b) | `docs/volumes/V14-sites.md` | 2992 | `681cc8d9…` | 1 | 1 | contained in its new |
| 953 (a) | `plat/docs/build/M0-world-sites-gate.md` | 13 | `7349635a…` | 1 | 1 | gone |
| 953 (b) | `plat/docs/build/M0-world-sites-gate.md` | 29 | `7349635a…` | 1 | 1 | contained in its new |
| 953 (c) | `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` | 53 | `11d7d458…` | 1 | 1 | gone |
| 953 (d) | `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` | 70 | `11d7d458…` | 1 | 1 | contained in its new |
| 953 (e) | `docs/volumes/SUMMARY.md` | 222 | `43c7035d…` | 1 | 1 | gone |

## 2. The targets (md5 before → after, lines)

| target | before | after | fragments |
|---|---|---|---|
| `docs/volumes/V13-world.md` | `02049f9d6340fa4f08cf3f9509def63d` (4 605) | `e68af748638dd3c8474d21b37005c7ac` (4 611) | 2 |
| `docs/volumes/V14-sites.md` | `681cc8d9b490e4ea4529533ebe8def34` (3 327) | `19b4f1c1a898ace55d10b5b366613cab` (3 336) | 7 |
| `docs/volumes/INDEX.md` | `2ca7f112e916eea4cf8589c58a414d15` (260) | `55ad33a169855ff270874384d33914eb` (260) | 1 |
| `docs/volumes/SUMMARY.md` | `43c7035de2128ac557622b3d4df51753` (223) | `ace778811c60989f4a52f2237d1bd4ab` (227) | 2 |
| `docs/ARCHITECTURE.md` | `5c463a94ae9cdda1127a5c6875b4eaaf` (24 467) | `eac3a6a5ee2c58534185318949ebd8ba` (24 467) | 2 |
| `plat/docs/build/M0-world-sites-gate.md` | `7349635a52587501c1071021b30b4cd4` (47) | `21d963e755bb74753bb7fe16bf2b2929` (52) | 2 |
| `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` | `11d7d45875db5093d2aef909b0b885ba` (216) | `2aa8e839961fc0f7800b940119f6a684` (217) | 2 |
| `research/sf/lens-implications.md` | `901c8bb66a0d13125cec39ac0e8adc88` (615) | `673576f27c4874d13f615b964954a8e3` (615) | 3 |
| `research/sf/trade-system.md` | `4ab935c8e423a5c9ef59572d32aa8ee1` (1 280) | `7457b1a67672e0028927daea71e8b814` (1 280) | 2 |
| `docs/ARCHITECTURE-FULL.md` (regenerated) | `d2ab45bbe7a99bd7fb4f0e2b25b463bc` (81 340) | `dbef77819c737d5c3d0bf6cd5cd1a732` (81 355 by the generator; `wc -l` 81 354) | — |
| `docs/AMENDMENTS-2026-10-18u.md` (new) | — | `edad734bb8372b621b378d6975bc951d` (377) | — |

`README.md` untouched (`7adac4db…`, file t's after-md5).

## 3. The greps (item 949) — every hit and its decision

Run over `docs/volumes/*.md`, `docs/ARCHITECTURE.md`, `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md`,
`docs/design/*.md` (lines before this file; output `greps.txt` in the scratchpad):

| pattern | hits | decision |
|---|---|---|
| "host meaning" | V13:3894 (H25) | CHANGED, 949 (a) |
| "security input" | V13:3894 | CHANGED, 949 (a) |
| "road-warden" | V13:3894 | CHANGED, 949 (a) |
| "wardenship" | none | — |
| "patrol coverage" | V13:2425 (§3.11.6's consumption law: answers the host consumes are requested between advances) | LEFT — the offer's timing, no ask |
| | V13:3885 (H16: "patrol coverage re-priced through its one distance reader, read by outcome rolls only …") | LEFT — H16's optional door, open by the decision |
| | V13:3894 | CHANGED, 949 (a) |
| "patrol-coverage" | none | — |

The wider read of every "patrol" hit in the same files (87 in V13, 8 in V14, 1 each in INDEX, SUMMARY, V11, the base,
2 in the brief, 1 in `docs/design/proposal-world-native.md`) found no other ask: V13 §3.9 (14) :2072-2076 and
J-V13.66 :3975 (offered, consumed only by the host's choice, never imposed) LEFT; `patrolOffer` :2430, :2481-2485
(optional, behind the host's own switch) LEFT; §5.8 (4) :3298-3304 and the patrols lens :3411-3422 (the lens rule) LEFT;
:3418's "until H25" (the cut road's closer, still asked) LEFT; D-V13.8 :4032 (the host's embattlement drawn) LEFT;
J-V13.97 :4006, J-V13.111 :4020 (the cadence's rules) LEFT; V14 :2083, :2198-2202 (`patrolAt` in a crop) LEFT; the
base :21765, the brief :108, :209, SUMMARY :124, INDEX :39, V11 :2912, proposal-world-native :143 (lists and other
subjects) LEFT.

Research (the task's (c)):

| file | grep | hits | decision |
|---|---|---|---|
| `research/sf/lens-implications.md` | "ask 8" | :192 (§2.2 *A warden's term* → ask 8), :193 (§2.2 *A patrol lowering danger* → ask 8, the security input proposed) | BRACKETED, 949 (c), (d) |
| | (§5's row 8, `\| 8 \|`) | :520 (ask 8: "Give patrol coverage a host meaning …") | BRACKETED, 949 (e) |
| | "patrol" / "wardenship" / "security input" (the rest) | :186, :294, :371, :403, :444, :450, :470, :503, :515 (ask 3, garrison bands), :521 (ask 9, the closer), :567 | LEFT — the lens and its rules; ask 3 and ask 9 are not a coverage meaning |
| `research/sf/trade-system.md` | "OQ4" | none (the host document's name for §10.3's fourth bullet, `HOST-REQUIREMENTS-2026-10-18.md:356`) | ADJUSTED: the fourth bullet :1115 BRACKETED, 949 (g) |
| | "wardenship" | :916-919 (§9 item 4: offered "as a candidate producer for those slots or as a security input") | BRACKETED, 949 (f) |
| | | :1115 | BRACKETED, 949 (g) |
| | | :1118 (TR-5's trade half, route wardenship with no owner, OD-FC-2) | LEFT — the host's own programme's question, which the decision leaves to it |

INDEX / SUMMARY (the task's (d)): `grep "file t"` — INDEX:14 (the state line) and INDEX:48 (BCR-V14-26's admission,
no file-list) → file u named at :14, 949 (h); SUMMARY none → the sentence at :159-161 where SUMMARY names the
amendment files, 949 (i) (adjustment).

## 4. Adjustments

As file u's *Adjustments* lists them: the task's (b) carries no fragment (no other asking place); trade-system's "OQ4"
is §10.3's fourth bullet; lens-implications' "ask 8" hits are two §2.2 cells plus §5's row 8; SUMMARY named no file t;
K14 stands after K13 in the kernel table (the task said "after file t's M12 row"), the heading's range K1–K14; the gate
spec had no "carried to M1" list (that list is the checker's dated report, `plat/docs/build/checks/M0-world-sites-gate.md:30`,
not edited), so the spec gains a *Carried to M1's API pass* paragraph naming K10, K12, K14, M1, M2, M4. Added by this
seat for coherence: 949 (b), 950 (c) revision notes; 951 (b), (c); 952 (b); 953 (c)–(e).

## 5. The bundle and the confirm

`python3 -I tools/bundle_architecture.py --check` before: STALE, exit 1 (expected); `python3 -I tools/bundle_architecture.py`:
"wrote docs/ARCHITECTURE-FULL.md: 81355 lines from 16 source(s)", exit 0; `--check`: "UP TO DATE", **exit 0** (re-run
after file u was written: exit 0). The confirm `confirm.py` (output `confirm.out`): every one of the 23 new texts
exactly once in its target, no old text outside its own new text; the eleven V13, V14 and base new texts exactly once
in the bundle, and the index's (949 (h)) once there too (12 / 12); fail 0.

## 6. Left for the session

As file u's *For the session* (1)–(6): the ledger row (J399); SE0's estimate does not price the form's build; §6's E4
row budgets one arena's open, now one per scene; README's owner-words row lacks file u; the volumes' Q5 texts carry the
recommendation, the "Yes" in file t's table only; V13's citation rule names 926, not 940 or 949.
