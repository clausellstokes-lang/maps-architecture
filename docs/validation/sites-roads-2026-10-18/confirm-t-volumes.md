# confirm-t-volumes — the confirming re-check of file t on V13 and V14

Lane: sites-roads/confirm-t-volumes (opus; J394, Fable-critiqued), the confirming re-check under J394, after J398 (the
owner's "Yes" on Q5). 2026-10-18 from 16:16 UTC. Scope: file t's 70 fragments on `docs/volumes/V13-world.md` and 44 on
`docs/volumes/V14-sites.md`; the records `apply-t-v13.md` and `apply-t-v14.md`; `docs/AMENDMENTS-2026-10-18t.md`
items 940–948. Edited only this record and `docs/lane-events.log`. No git command run; the host repository untouched.

**Verdict: PASS.** No problem in scope. One non-blocking label slip in `apply-t-v13.md` and one open note, both below.

## The scripts (python3 -I; scratchpad `sites-roads/confirm-t-volumes/`)

- `check.py` → `check.out` (exit 0, `FAIL 0`): replays file t's V13/V14 fragments from the before copies, then file u's
  V13/V14 fragments (`apply-u/frags.py`) on top, and compares with the targets as they stand now.
- `amend.py` → `amend.out`: parses all 138 fragments out of `docs/AMENDMENTS-2026-10-18t.md` (header, *Current text*,
  *New text*, *Reason*, *From*) and compares each V13/V14 one with `draft-t.fragments.json`; diffs the amendment file
  against `draft-t.md`.
- `extra.py`: the base's four new texts in the base and the bundle; file u's recorded before-md5s (file t's after-md5s);
  README's md5; extracts the 114 V13/V14 new texts to `newtexts.txt` (515 lines) for the reading.
- `cd /home/user/maps-architecture && python3 -I tools/bundle_architecture.py --check`

## The check table

| # | check | how | result |
|---|---|---|---|
| 1 | V13 before copy is the true before | md5 of scratchpad `V13-d0de9ad8.md` | `d0de9ad8dadfeccc89ac86f2ea4d62f4` = the fragments' recorded md5 (70/70) and file t's header |
| 2 | V14 before copy is the true before | md5 of scratchpad `v14/V14-before.md` (the apply lane's own snapshot) | `70d8aa1b3c14e7cab6a135adbd3caa00` = the fragments' recorded md5 (44/44) and file t's header |
| 3 | every V13 old once at its turn | replay in the JSON's order | 70/70 |
| 4 | every V14 old once at its turn | same | 44/44 |
| 5 | V13 replay result = the recorded after | md5 of the replay | `02049f9d6340fa4f08cf3f9509def63d`, 4 605 lines — MATCH (apply-t-v13.md, file t's header) |
| 6 | V14 replay result = the recorded after | same | `681cc8d9b490e4ea4529533ebe8def34`, 3 327 lines — MATCH (apply-t-v14.md, file t's header) |
| 7 | V13 after t: new once; old gone or only inside its new | counts on the replay | new once 70/70; old gone 52; old inside its new (count = its count in the new) 18 — as apply-t-v13.md states (17 prefixes, 946 (g) a suffix) |
| 8 | V14 after t: same | same | new once 44/44; old gone 33; old inside its new 11 — as apply-t-v14.md states (946 (m) a suffix) |
| 9 | nothing else moved in V13 since t | t-after + file u's 2 V13 fragments (949 (a), (b)) = the file now | `e68af748638dd3c8474d21b37005c7ac`, 4 611 lines — byte-equal MATCH: every changed line since d0de9ad8 is a file t or file u fragment |
| 10 | nothing else moved in V14 since t | t-after + file u's 7 V14 fragments (950 (b), (c), 951 (a)–(c), 952 (a), (b)) = the file now | `19b4f1c1a898ace55d10b5b366613cab`, 3 336 lines — byte-equal MATCH |
| 11 | file u left file t's texts whole | each t new text in the current target; any u old inside a t new | V13 70/70 once, V14 44/44 once; no u old lies inside a t new text |
| 12 | the amendment file carries the applied texts exactly | 138 fragments parsed; V13/V14 compared with the JSON: target, first line, md5 prefix, current text (⏎ → line break), new text, *Reason*, *From* | 138 parsed, order = the JSON's; 114/114 V13/V14 identical, 0 mismatch |
| 13 | the amendment file is the draft plus its status | `difflib` from "**The fix round**" to the end | one line differs: the Q5 row's id cell gains "— **ANSWERED 2026-10-18: Yes (J398)**" (the table's five cells kept) |
| 14 | the amendment file's form (file r's, read whole) | read | title; "Numbered from **940**"; the **APPLIED** status with each target's md5 before → after and lines, the lanes' records, the bundle; Sources; *How to read the items*; `---`; items 940–948 each with its statement and lettered fragments (target, line, md5, *From*, current once, new in full, reason); *Gaps judged not taken*; *Owner questions*; *What this file leaves unchanged and why*; *For the session* — file r's form, extended as files s–t extend it |
| 15 | the md5s file t states are true | rows 1–2, 5–6; file u's apply.json `before` md5s (taken from the targets as file t left them); README now | all eight after-md5s true: V13 02049f9d, V14 681cc8d9, INDEX 2ca7f112, SUMMARY 43c7035d, base 5c463a94, gate 7349635a, brief 11d7d458 (file u's before), README 7adac4db (now; file u did not touch it); `draft-t.md` 2642fddb (1 610 lines), `draft-t.fragments.json` 66d10247, `docs/AMENDMENTS-2026-10-18t.md` 2d6a6308 (1 633 lines) — as `apply-t-record.md` states |
| 16 | the bundle fresh | `python3 -I tools/bundle_architecture.py --check` | "UP TO DATE", exit 0; `docs/ARCHITECTURE-FULL.md` md5 `dbef77819c737d5c3d0bf6cd5cd1a732`, 81 354 lines (file u's regeneration; file t's d2ab45bb is the record of its own regeneration, superseded) |
| 17 | the bundle carries each V13/V14/base new text once | counts in the bundle | V13 70/70, V14 44/44, base 4/4 (and each base new text once in `docs/ARCHITECTURE.md`) |
| 18 | no sentence against the owner's words or the standing rules | read the 114 new texts whole (`newtexts.txt`) and grep | see below: none found |

## The reading (row 18)

- **J393** — quoted verbatim in V13 §1.3 (940 (a)), V14 §1.3 (940 (c)), V14 §2.5 (941 (j)) and the revision notes (947
  (a)); every mechanism serves it (road access per kind, the approach along or by an approach road, the bend). Not
  re-judged.
- **J398 (Q5 "Yes": the catalogue is V14 §2.5's kind rows)** — every applied text reads the catalogue as the kind rows
  (940 (a), (c), (d), 941 (j), J-V14.57). Nothing contradicts the answer. Open note (not a defect of file t, already in
  `apply-t-record.md` §5): V14 §11's Q5 row (now V14:3196) still reads as a question with its recommendation "yes", the
  answer recorded only in file t's header and owner-questions table; file u did not carry it into the volumes.
- **J396 (patrols map-only; the host not asked; H16's door open)** — no V13/V14 new text of file t names H25, H16 or a
  host patrol-coverage meaning (grep: 0). What file t says of patrols is map-side: W8b (14)'s patrol source through a
  fort's approach and no cadence on an approach road (945 (b), 946 (e), J-V13.111). Consistent.
- **Door 1** — an approach road carries no host key, is in no `canon` slot, `routeFacts`, `patrolOffer` or the host list
  of `routes(world)`, rides only the DM's map feed keyless and is read by no step of the host's simulation (942 (n),
  944 (a), (b), (d) H31, J-V13.110); no settlement frame geometry crosses. Consistent.
- **A host-placed site never re-sited** — kept word for word: "a host-placed site its rows as a reading, never a bend"
  (941 (j)), "A host-locked site placement takes the reading only — no bend, no offer" (943 (j)), F-PLACE's "a
  host-locked site: the reading only, never bent or offered" (943 (m)), 944 (f), J-V14.61, T-V13-58's host-locked
  tollhouse. Also no later world change moves any site (943 (j), (k), J-V13.109).
- **No route bent to a site** — the `along` case writes no route ("its polyline, stations, effort and lay version stay
  byte-identical", 942 (n)); 942 (m), (x), 943 (s), J-V13.107, T-V13-57's byte-identity clause.
- **Determinism** — every search names its tie-break (lineage-key order, lower route lineage key, lower vertex index,
  lower cell index then (y, x)); the plug-ins are pure with no draw (943 (d)); approaches are laid each on its own (no
  order dependence); "no random or jitter term" (943 (d), 946 (l)); T-V13-57/-58 and T-V14-34 require two runs
  bit-identical. The two greps for `random`/`jitter` hit only those prohibitions.

## Notes (non-blocking)

1. `apply-t-v13.md`'s fragment table heads its third column "draft line", but its values are the fragment's line in
   the target before (the JSON's `line`: 940 (a) "340" is V13:340; in `draft-t.md` 940 (a) stands at line 101). The
   values are right; the label is not. If the record is ever touched, the exact fix is: replace
   `| # | id | draft line | result |` with `| # | id | target line (before) | result |`. Not edited here (not this
   lane's file).
2. Q5's answer in the volumes — see the reading above; the session's or a later file's to carry, if wanted.

## Counts at a glance

114/114 V13/V14 fragments landed exactly as file t states (70 + 44); 0 adjustments; 0 skipped; all changed lines
accounted for by file t's and file u's fragments (byte-equal replay); amendment file 138/138 parsed, 114/114 V13/V14
identical to the machine copy; bundle `--check` exit 0, 118/118 V13/V14/base new texts once in it.
