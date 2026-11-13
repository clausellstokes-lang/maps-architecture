#!/usr/bin/env python3
"""Records of landing 82 (child DY: M0-c-05 S4 + S5): ledger row J794, queue row Q203, the state of Q189.
Usage: tools/session/drafts/j794-draft.py '<gate sentence>' '<end HH:MMZ>' '<tail sentence>'"""
import sys
gate, end, tail = sys.argv[1:4]

Q = '/home/user/maps-architecture/docs/M0-FIX-QUEUE.md'
q = open(Q, encoding='utf-8').read()
assert '\n| Q203 |' not in q and '\n| Q202 |' in q


def state(qid, text):
    global q
    k = q.find(f'\n| {qid} |')
    assert k >= 0, qid
    e = q.find('\n', k + 1)
    line = q[k + 1:e].rstrip()
    assert line.endswith('|'), qid
    q = q[:k + 1] + line[:-1].rstrip() + ' ' + text + ' |' + q[e:]


state('Q189', "STATE 2026-11-12 (J794): (a), (b), (c) CLOSED — M0-c-05 S4 with its fix round S5 landed a6b04f90: (a) the trim makes a provisional street whose cut lands on its own end FINAL, with "
              "no `removeEdges` call and no junction id taken (the fix judges the vertex the kernel committed, not the lattice exit this row named: a foot within 26 cm of an endpoint is "
              "attracted onto it); a declared shift of the S5 record alone on three of 360 sweep runs, no root moved, the 44 registered runs unchanged, the sweep's prune refusals 3 → 0; (b) "
              "every regime figure of legality.test.ts read from regimes.json; (c) the sentence corrected in the round's notes and choices row. The first closing check FAILED on a missing pin "
              "for 'no junction id is taken' (a mutant moved S5's root with every test green); the fix round added it, tests only. (d) stays M1's, with Q150.")
q203 = (
"| Q203 | The closing notes of M0-c-05 S4 (the growth stage's street trim) that outlive its fix round: (a) N-s4c-2 — THE NEW BRANCH's GUARD ON THE END ROW HAS NO PIN: with the three conditions "
"dropped (the street's `to` its own `end` row with one arm) every test and all 404 runs stay as they are, because every provisional street S5c makes carries that row; a street of another shape "
"whose cut lands on its end keeps the old typed refusal (`E_DEGENERATE`, the street left provisional) — met in no run; (b) N-s4c-3 — the corrected sentence says the top-up 'ran once' where the "
"sweep holds it at one seed and stage under BOTH rerolls (two of 360 runs); the fact that matters (S5d draws at no seed of any frame) is exact | plat/docs/build/checks/M0-c-05-s4.md (3) and "
"M0-c-05-notes.md 'Closing check S4' N-s4c-2, N-s4c-3 (J794) | (a) pass B, or M0-c-05's next touch: a hand case for the guard (a street whose `to` is not its own end row keeps the typed refusal), "
"or the guard dropped and such a street made final too — decided there; if any run ever meets the shape it is a lawful-input refusal and a fix row at once; (b) only if the sentence is touched "
"again | OPEN (J794) — no output on any input found; not required for M0's exit |\n")
i = q.rfind('\n| Q202 |')
j = q.find('\n', i + 1)
q = q[:j + 1] + q203 + q[j + 1:]
open(Q, 'w', encoding='utf-8').write(q)

P = '/home/user/maps-architecture/docs/PROGRESS.md'
s = open(P, encoding='utf-8').read()
assert '\n| J794 |' not in s and '\n| J793 |' in s
row = (
"| J794 | 2026-11-12 22:41Z – " + end + " | THE EIGHTY-SECOND LANDING — M0-c-05 S4 with its fix round S5 (child DY): the street trim makes a street whose cut lands on its own end final instead of "
"refusing it (Q189 (a) – (c) CLOSED; three lawful-input refusals gone; the S5 record alone moves, on three runs) | "
"(1) THE HAND-BACK (22:40Z; wip/child-c05s4 @ 7f606c3e): two rounds — the first closing check FAILED on one new line, the fix round was tests only, the re-check PASSED; read by this seat "
"(J631 (2) (b)): both verdicts whole and the notes' three sections. "
"(2) WHAT LANDED (a6b04f90; C-0496, C-0497 → C-0505, C-0506; L-0816 – L-0819 → L-0837 – L-0840). growth/prune.ts: where the vertex the kernel committed for the trim's cut IS the street's end — "
"on its last segment, the street's `to` its own end row — nothing is removed, the new row is taken back, no refusal is counted, no junction id is taken, and the street is made final as a trimmed "
"street is; any other shape keeps the old path and its typed refusal. The round found the queue row's reading wrong in one point and followed the code: the cut is not the exit 'rounded to the "
"lattice' but the vertex the kernel's placement attracts it to (a foot within 26 cm of an endpoint lands on it), so a fix keyed on the lattice exit never fired. DECLARED SHIFT: the S5 record "
"alone (two flags, the end's kind, one E_DEGENERATE fewer) on three of the 360 sweep runs; the 44 registered runs equal in every reading; NO ROOT MOVES, so no other item's pin moves; the census "
"0 → 0 and 3 → 0. Two regime floors of legality.test.ts are read from regimes.json; round S3's sentence on the top-up is corrected, append-only. "
"(3) THE FIRST CLOSING CHECK FAILED RIGHTLY: with a junction id burnt inside the new branch every test of the round stayed green while S5's root moved on both runs the round's own test pins — "
"the round states 'no junction id is taken, nothing else moves' three times and pinned it nowhere. The fix round added one hand case (a second street trimmed after the untrimmed one takes the "
"next id); the re-check killed the mutant on that pin alone. Seventeen mutants and controls in the first check; two survivors judged equivalent, one unreached (Q203). "
"(4) THE GATE on the merged tree, the first with the full-strength step of J793: " + gate + " "
"(5) THE QUEUE: Q189 (a), (b), (c) CLOSED ((d) stays M1's); Q203 OPENED (the new branch's guard has no pin — no output on any input found; pass B). "
"(6) " + tail + " |\n")
i = s.rfind('\n| J793 |')
j = s.find('\n', i + 1)
s = s[:j + 1] + row + s[j + 1:]
open(P, 'w', encoding='utf-8').write(s)
print('ok')
