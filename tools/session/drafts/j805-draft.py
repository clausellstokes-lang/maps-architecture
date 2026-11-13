#!/usr/bin/env python3
"""Records of landings 84 and 85 (child EA: M0-e-02 S3 + S4, M0-e-03 S5): ledger row J805, queue row Q208, the states
of Q192 and Q193.
Usage: tools/session/drafts/j805-draft.py '<gate sentence>' '<end HH:MMZ>' '<tail sentence>'"""
import sys
gate, end, tail = sys.argv[1:4]

Q = '/home/user/maps-architecture/docs/M0-FIX-QUEUE.md'
q = open(Q, encoding='utf-8').read()
assert '\n| Q208 |' not in q and '\n| Q207 |' in q


def state(qid, text):
    global q
    k = q.find(f'\n| {qid} |')
    assert k >= 0, qid
    e = q.find('\n', k + 1)
    line = q[k + 1:e].rstrip()
    assert line.endswith('|'), qid
    q = q[:k + 1] + line[:-1].rstrip() + ' ' + text + ' |' + q[e:]


state('Q192', "STATE 2026-11-13 (J805): (a) – (e) CLOSED — M0-e-02 S3 with its fix round S4 landed ab6af015: (a) the courses are carved on a JOINT BED (the receiving course re-levelled below a "
              "confluence, no channel lowering another course's centreline, the cap read against the raster before any carve; a tributary whose join would need a trench is delivered degraded, "
              "never refused) — on the closing check's own census of 3 328 runs: rising beds 201 → 0, cells past the cap 10 → 0, tributaries below the receiving bed 423 → 0, refusals 0 → 0, "
              "every tributary-free run byte-identical; (b) – (e) pinned, each mutant red. The first closing check FAILED on three missing pins of (a)'s fix; the fix round added them, tests "
              "only. Its three notes for the session are Q208.")
state('Q193', "STATE 2026-11-13 (J805): (a) CLOSED — M0-e-03 S5 landed af32063e: `provedRings` drops a hole by the CLEANED area alone (the measure `partsOf` judges by); NO SHIFT on 303 runs "
              "(103 of 103 and 200 of 200 rows identical), refusals 0 → 0. Its closing check's two surviving mutants — the boundary at exactly 4 m² (not equivalent; the code is right there) "
              "and the winding read from the made ring (equivalent unless the clean reverses a ring) — are ACCEPTED as its vetoable judgments and BOUND as LINE 2 of M0-e-03 S6 (the contracts "
              "round's second leg; tests only). (b) carried at pass B (J800); (c) accepted.")
q208 = (
"| Q208 | The closing notes of M0-e-02 S3 (the hydrology's joint bed) for the item's next round: (a) N-s3c-4 — A WRONG FIELD ON A LAWFUL INPUT, older than the round: `flowTo` names the RIVER "
"when a tributary joins another tributary (`strategy.ts` writes `flowTo: mainId` for every joining tributary) — on `eastward`, river 160°, tributaries 250° and 70°, the second tributary ends on "
"the first's corridor and its body reads `flowTo: 'water:river:0'`, a course it never meets (410 – 1 246 m away over the check's 105 such joins); no refusal, no throw; (b) N-s3c-5 — a "
"tributary's reported `maxCarveCm` includes the receiving course's cut on the cells they share (true to the raster; the field's doc does not say so); (c) N-s3c-6 — a tributary's centreline "
"cells inside the receiving course's channel keep their own bed: up to 40 cm above the channel floor beside them, the bed still descending (36 census runs move by this alone; no bar reads it) | "
"plat/docs/build/checks/M0-e-02-s3.md (3) and M0-e-02-notes.md 'Closing check of hardening round S3' N-s3c-4 … N-s3c-6 (J805) | M0-e-02 S5 — ONE small round, bound in pass B's next batch once "
"the eighty-fourth landing is on the design branch: (a) FIX — `flowTo` carries the receiving course's id (the corridor's owner the joint bed already keeps), pinned on the run above; a DECLARED "
"SHIFT of that field for a tributary received by a tributary, and every reader of `flowTo` named; (b) the field's doc sentence (read on the joint bed, shared cells included) — text; (c) the "
"joining course's cells inside the receiving channel lowered to the channel's level where every bar still holds (a declared shift of the raster on those runs), or REPORTED with the bar that "
"forbids it | OPEN (J805) — (a) is M0's (J238 (1): a wrong model field on lawful input); (b), (c) ride with it |\n")
i = q.rfind('\n| Q207 |')
j = q.find('\n', i + 1)
q = q[:j + 1] + q208 + q[j + 1:]
open(Q, 'w', encoding='utf-8').write(q)

P = '/home/user/maps-architecture/docs/PROGRESS.md'
s = open(P, encoding='utf-8').read()
assert '\n| J805 |' not in s and '\n| J804 |' in s
row = (
"| J805 | 2026-11-13 03:30Z – " + end + " | THE EIGHTY-FOURTH AND EIGHTY-FIFTH LANDINGS — M0-e-02 S3 with its fix round S4, and M0-e-03 S5 (child EA): a joining tributary's carve made right "
"(a declared shift for runs with a tributary), the water stage's sliver rule on one measure (no shift); their gate run in a gate child | "
"(1) THE HAND-BACK (03:30Z; wip/child-e02s3 @ bc336018): both legs PASS — leg 1 after a failed closing check and a tests-only fix round, leg 2 at its first check, run by three seats of one "
"lane across a restart of the child's container. Read by this seat (J631 (2) (b)): the three verdicts whole (M0-e-02-s3, M0-e-02-s4, M0-e-03-s5) and the notes rows they left for the session. "
"(2) THE EIGHTY-FOURTH (ab6af015; C-0500, C-0501 → C-0510, C-0511; L-0826 – L-0829 → L-0847 – L-0850). hydro/carve.ts and hydro/strategy.ts carve the courses on a JOINT BED: the receiving "
"course is re-levelled below a confluence, no channel lowers another course's centreline, the cap is read against the raster before any carve; a tributary whose join would need a trench past "
"the cap is delivered degraded through F-RIVER's ladder, never refused. DECLARED SHIFT for runs with a tributary — on the closing check's own census of 3 328 runs: runs with a rising bed "
"201 → 0, with a cell past the cap 10 → 0 (446 → 400 cm), with a joining tributary below the receiving bed 423 → 0; 687 of 2 032 tributary runs move, 561 of them carried a defect before; 419 "
"tributaries lose their fit, every one on two closed-bowl fixtures of the checker's where the join would need a trench, none on the item's eight fixtures; all 1 296 tributary-free runs "
"byte-identical; refusals 0 → 0. Four more lines are tests only, each mutant red on its pin. "
"(3) ITS FIRST CLOSING CHECK FAILED RIGHTLY (14:27Z on 2026-11-12): three of the checker's own mutants of the new rule survived the folder and were not equivalent — a channel lowering another "
"course's centreline, a tributary received by a tributary, the reported deepest cut not read on the joint bed. The code was right on all three; the pins were missing. The fix round added them "
"(tests only, sources byte-identical) and the re-check PASSED (18:15Z). "
"(4) THE EIGHTY-FIFTH (af32063e; C-0502 → C-0512; L-0830, L-0831 → L-0851, L-0852). site/src/water/polygons.ts, one condition: `provedRings` drops a hole before the proofs by the CLEANED "
"ring's area alone, the measure the body is judged by. NO SHIFT on every input met (103 of 103 rows of the registered family and 200 of 200 of the relief-3000 family identical, arena prints "
"and model roots included; refusals 0 → 0). Its first act re-pins the water stage's exit-bar frame 4 to leg 1's shift (a fallback's name, 'mouth' → 'offset'), attributed by replay. "
"(5) THIS SEAT's JUDGMENTS: the closing check of leg 2 PASSED with two surviving mutants it called vetoable — the boundary at exactly 4 m² (not equivalent; the code is right there and agrees "
"with `partsOf`; one assertion is missing) and the winding read from the made ring (equivalent unless the clean reverses a ring). NO VETO: both are BOUND as LINE 2 of M0-e-03 S6, the contracts "
"round's second leg (tests only; added to that entry before it binds), so the item's next round carries them and no round is spent on one assertion. The hydrology check's three notes — "
"`flowTo` naming the river for a tributary received by a tributary (a wrong field on a lawful input, older than the round), a tributary's reported cut including the receiver's on shared cells, "
"a tributary's centreline cells standing up to 40 cm above the receiving channel's floor — are Q208, bound as M0-e-02 S5 in pass B's next batch. "
"(6) A RECORD GAP MENDED (674fcc7e): three seats of the child, working from plat/, wrote their lane lines — their LANDED lines among them — into plat/docs/lane-events.log, a file no landing "
"overlays; the eighteen lines the lane log lacked are appended as written, and the landing tool now reads that stray file beside the lane log. "
"(7) THE GATE, in gate child G2 (session_01FE9mEsw6daUcBrWCa9kUMc; on 674fcc7e, which holds the eighty-second to the eighty-fifth landings): " + gate + " "
"(8) THE QUEUE: Q192 (a) – (e) CLOSED; Q193 (a) CLOSED, its survivors bound; Q208 OPENED. "
"(9) " + tail + " |\n")
i = s.rfind('\n| J804 |')
j = s.find('\n', i + 1)
s = s[:j + 1] + row + s[j + 1:]
open(P, 'w', encoding='utf-8').write(s)
print('ok')
