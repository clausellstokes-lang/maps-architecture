#!/usr/bin/env python3
"""Records of landing 83 (child DW: M0-a-09 S20 + S21): ledger row J795, queue row Q204, the states of Q152, Q178.
Usage: tools/session/drafts/j795-draft.py '<gate sentence>' '<end HH:MMZ>' '<tail sentence>'"""
import sys
gate, end, tail = sys.argv[1:4]

Q = '/home/user/maps-architecture/docs/M0-FIX-QUEUE.md'
q = open(Q, encoding='utf-8').read()
assert '\n| Q204 |' not in q and '\n| Q203 |' in q


def state(qid, text):
    global q
    k = q.find(f'\n| {qid} |')
    assert k >= 0, qid
    e = q.find('\n', k + 1)
    line = q[k + 1:e].rstrip()
    assert line.endswith('|'), qid
    q = q[:k + 1] + line[:-1].rstrip() + ' ' + text + ' |' + q[e:]


READING = ("THE SESSION'S READING OF THE FOUR VOID SEEDS (J795; vetoable): the column is VOID because more than half of the reads on which the served region and the exact one differ, differ "
           "by 8 cm or less (THIN: 39 % and 33 % of CITY's differing reads) or lie within the oracle's own 4 cm margin (UNDECIDED) — differences the arbitration is built not to judge. It is "
           "NOT evidence against the exact region: wherever the instrument decides, it decides for it (3 825 reads at CITY, 1 032 at the test size; 0 against, of 290 816 witnesses), the "
           "definition oracle judges every distinct key with 0 faults, and the construction is never off its own bound. It is the same picture the round-2B measurement drew from the other "
           "side (the two readings differ by needles and slivers thinner than the door's reach). So: a VOID stays 'not a pass' (J785 stands); the relation column is NO BAR of round 2B — its "
           "bars are the oracle on the exact region, plan ≡ commit, the thin measure and the stress population by networks (the entries v4/) — and nothing more is measured for it before "
           "round A binds.")

state('Q152', "STATE 2026-11-12 (J795): the six are red EXACTLY as declared on the tree of the eighty-third landing (M0-a-09 S20 + S21, b79e6a6e: the bands folder at the base's seed 6 failed | "
              "241 passed, the six's failure blocks identical to the base, 153 lines). They stay for round 2B's SHIFT round, where each assertion is routed one by one (the fourth review's U-1: "
              "re-pointing them to the construction cannot turn them green) after M0-a-05 S14 lands.")
state('Q178', "STATE 2026-11-12 (J795; M0-a-09 S20 landed b79e6a6e): (a) the wiring round's tables are in — at the six seeds the construction's no-move first reads count 0 and the "
              "construction is OFF ITS BOUND on no read; under J785's local arbitration 0 reads find the exact region wrong; it goes to round 2B with the rulings on the ladder; (b) the "
              "frame-side end rule is RULED (the code's reading; definition.ts's `endsOf` corrected) and is LINE 5 of round 2B's no-shift round — the class counts 0 at all six seeds (OQ-1 has "
              "nothing to list), and the S20 check's note 229 (the class exercised in the corpus and never asserted) is answered there.")
q204 = (
"| Q204 | The closing notes of M0-a-09 S20 and its fix round S21 (the wiring and measurement round) for the rounds that follow: (a) rows 228 and 230 — THREE UNPINNED GUARDS OF THE TEST-SIDE "
"OBSERVER: (k1)'s throw (a later read of a key carrying another exact region) has no unit pin; the verdict's `localXWrong` is pinned only by the runner's control; the per-read precedence of "
"X-WRONG over X-RIGHT is unpinned (every run prints 0 X-WRONG witnesses either way); (b) row 229 — the 'frame-side end' class fires in the arena-form property's own corpus (2 – 7 faces a run) "
"and is never asserted; (c) row 232 — a small named class of the UNDECIDED column: the sliver between a way's JUNCTION (flat) end line and the face's own edge meeting it obliquely (up to ≈ 10 cm "
"wide, ≈ 150 cm long: the served region reads band, the exact one kerb); and the oracle's margin is applied to a touching chain only inside its buffer; (d) row 236 — the shadow's `starts` stack "
"keeps one entry per read that throws between start and done (debug-only); (e) row 237 with the fix round's row 239 — WHAT THE CAPPED ORACLE CAN SEE: at a step of √(area ⁄ 4 000) (metres at CITY) "
"its samples need not meet a difference narrower than the step, so T3's '0 faults' is a VERTEX-level reading there and a 10 cm plant is caught by vertices or not at all; and the RECORD form of "
"the oracle is the wrong truth where a chord's route was snapped at a crossing (the arena's route is 15 cm off the record's straight line on the fix round's seed 123) — stated in the test and "
"the notes; (f) row 246 — the fix round's account that the check's literal form (i) went red at seeds 116 and 123 was not reproduced by the re-check (what is red by the seed is S20's unplanted "
"record-against-arena equality; the restated pin stands either way); (g) row 234 — the round's two disclosures: one read-only `git status` by a seat (the rule is no git command of any kind; "
"nothing was written), and the 53 MB evidence file (landed trimmed as the session's own record, L-0846) | plat/docs/build/checks/M0-a-09-s20.md, M0-a-09-s21.md; M0-a-09-notes.md 'Closing check of "
"hardening round S20' rows 228 – 238, 'Fix round S21' rows 239 – 244, 'Re-check 21' rows 245 – 246 (J795) | (a), (d): ROUND 2B's no-shift round re-points or retires S20's shadow and observer "
"(its LINE 1 deletes `setExactShadow` and `anyBuild`; its LINE 6 installs its own shadow) — the three guards get their unit pins there where the observer survives, else they go with it; (b): "
"answered by that round's LINE 5 (the class is retired with the corrected end rule); (c): named in round B's closed list of causes if round A's own measurement meets it — else nothing; (e): a "
"SHARPER ORACLE (samples along the exact outline's own normals) is pass B's, or earlier if round A's bars need it — round A's entry already asks for at least 300 keys a CITY seed judged at the "
"UNCAPPED 20 cm grid; (f), (g): nothing owed | OPEN (J795) — (a), (b), (d) fall to round 2B's no-shift round; (e) pass B |\n")
i = q.rfind('\n| Q203 |')
j = q.find('\n', i + 1)
q = q[:j + 1] + q204 + q[j + 1:]
open(Q, 'w', encoding='utf-8').write(q)

P = '/home/user/maps-architecture/docs/PROGRESS.md'
s = open(P, encoding='utf-8').read()
assert '\n| J795 |' not in s and '\n| J794 |' in s
row = (
"| J795 | 2026-11-12 22:43Z – " + end + " | THE EIGHTY-THIRD LANDING — M0-a-09 S20 with its fix round S21 (child DW): the exact kerb wired beside the served read as a debug-only shadow and measured "
"at six seeds — nothing served moves; the exact region is never found wrong; four seeds' relation column VOID, READ by the session; one 53 MB evidence file landed trimmed | "
"(1) THE HAND-BACK (22:43Z; wip/child-a09s20 @ 6d3f9f8c): the round built (06:26Z), was BLOCKED on a control with no population and RULED (J785), continued under the ruling (10:43Z), FAILED its "
"first closing check on one line (20:56Z), took a test-side fix round and PASSED its re-check (22:42Z); read by this seat (J631 (2) (b)): both verdicts whole, the notes' section under J785 and "
"the three sections after it (rows 216 – 246); rows 199 – 215 were read at the first hand-back. "
"(2) WHAT LANDED (b79e6a6e; C-0490 – C-0492 → C-0507 – C-0509; L-0800 – L-0804 → L-0841 – L-0845). arr/kerb.ts: one hook (`setReadShadow`: a start before the face is read, a done after the "
"census is set — four lines in the production bundle, nothing else); arr/kerbExact.ts: the exact region from the served read's own record, and `setExactShadow`, which installs only in a debug "
"build. Test-side: the definition oracle in an arena form, the relation of the served region to the exact one, the observer that judges every read of a harness run, and the runner quoted in "
"the notes. NO-SHIFT, shown by the round and again by its check: stage roots, all 46 counts, the fusion harness's reports byte-identical and the B-FUZZ census identical base → tree; the shadow "
"off and on gives byte-identical seed records with equal roots at all six seeds; the production bundle differs by the hook's four lines. "
"(3) THE FIGURES (fusion 3 and integrated 4 at CITY; fusion 1, 2 and integrated 1, 2 at the test size). The oracle: every distinct key judged, 0 faults, never VOID, 0 frame-side ends. The exact "
"region refused on no read the construction made; 0 exceptions. THE LOCAL ARBITRATION (J785): 0 reads and 0 of 290 816 witnesses find the exact region wrong; decided for it 1 712 and 2 113 reads "
"at CITY, 209, 239, 284 and 300 at the test size; the construction off its own bound on 0 reads; both planted controls FAIL as ruled (450 of 456 reads; 239 of 239 keys). FOUR OF THE SIX SEEDS "
"PRINT THE COLUMN VOID — UNDECIDED-or-THIN shares 0.567 and 0.555 at CITY, 0.543 and 0.507 at the two integrated test seeds (the two fusion test seeds pass at 0.451 and 0.386). COST in "
"production (fusion 3): the construction 26.07 ms a read, the exact region 2.11 ms. "
"(4) " + READING + " "
"(5) THE FIRST CLOSING CHECK FAILED RIGHTLY, on the round's own new pin: at the base's seed the bands folder showed a seventh red — the test asserted that the oracle's coarse-grid reading "
"always catches a 10 cm plant, and at that seed the grid's phase misses the 2 cm strip the margins leave (about one seed in thirteen). Not kernel code. The fix round found the check's own "
"suggested forms red by the seed too (the oracle's RECORD form is the wrong truth where a route is snapped at a crossing) and pinned a sharper claim that holds at every seed; the re-check "
"judged it by reading and by 25 seeds, killed five mutants on fixtures, and read the folder red in Q152's six alone, identical to the base. "
"(6) THE 53 MB EVIDENCE FILE (the planted control's: 450 failing reads, each listed with every witness) is landed TRIMMED, as the session's own record (eb95c034; L-0846, lane "
"session/a09s20-evidence-1): every line kept, each line over 600 characters cut at 600; the round's record claims the notes and the seven other evidence files. "
"(7) THE GATE on the merged tree: " + gate + " "
"(8) THE QUEUE: Q204 OPENED (the closing notes: three unpinned guards of the observer, the frame-side class never asserted, a named sliver class of the UNDECIDED column, what the capped oracle "
"can and cannot see — each routed to round 2B's no-shift round or to pass B); Q152 stays as declared; Q178 (a), (b) answered and routed. "
"(9) ROUND 2B: S20 IS LANDED — the first of round A's three conditions. Its fix round took the lanes -s21, so round A is KEYED S22 and round B S23 at render (the entries say so). Round A still "
"waits on M0-a-05 S14 (child DV, in its third round) and on the session's re-run of S20's quoted runner on the merged tree. The measurement mirror's one red on S20's early files (testkit's "
"agreement-corridor, J793) is read by this landing's gate on the landed tree. "
"(10) " + tail + " |\n")
i = s.rfind('\n| J794 |')
j = s.find('\n', i + 1)
s = s[:j + 1] + row + s[j + 1:]
open(P, 'w', encoding='utf-8').write(s)
print('ok')
