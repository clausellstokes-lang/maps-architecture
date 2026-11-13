#!/usr/bin/env python3
"""The merged RQ2 round SPLIT (J797): legs 1 and 2 (M0-a-02 S4 -> M0-a-06 S10) are bound now, on the design head, before
the router round lands; leg 3 (M0-a-05) follows as its own round. Edits the two entries' session clauses (the merged
sentence, the gate, the head's declared reds, the restarts), writes them beside the originals and appends them to specs.json."""
import json
D = '/home/user/maps-architecture/docs/validation/rq2-spec-2026-11-11/'
P = '/home/user/maps-architecture/workflows/lane-prompts/session-fix-cloud/specs.json'
GATE_OLD = ("THE GATE: the round opens on the head of M0-a-05 S14's LANDING (hash filled at launch) or later, when few rounds are in flight, and once the measured list is final (R15). M0-a-05 S14 "
            "changes insert/insertChain.ts (pass 5 after `passes`), insert/stretch.ts (Q77's exact helper), cutBack / tryCuts, caps.ts, router.test.ts's ratchet, register/s14-rescues.json and "
            "bfuzz.test.ts's N-7 GOLDEN — every cite below was read on the design head 6f98b464: re-read every one on the RESUME head; the files, functions and forms named are binding, the "
            "numbers are not.")
GATE_NEW = ("THE GATE, AS THE SESSION SET IT AGAIN AT THE SPLIT (J797): the round opens on the design head b3ed9b2e or later, BEFORE the router round lands — your tree does NOT hold M0-a-05's "
            "fifth pass (its rounds S14 – S16, in flight in another child, change insert/insertChain.ts, insert/stretch.ts, insert/snapRound.ts and tests under kernel/test/insert/step3-5/: no "
            "file of these two legs' write scopes), and nothing in these two legs reads it; at the landing the session reads the legs' RELATED and their grep confirmations again on the MERGED "
            "tree (J786's rule). Every cite below was read on the design head 6f98b464, and no file under kernel/src/arena, kernel/src/tx, kernel/src/io, kernel/test/arena, kernel/test/tx or "
            "kernel/test/gate has changed between it and b3ed9b2e (the session's git diff, 2026-11-13): re-read every cite on your tree all the same; the files, functions and forms named are "
            "binding, the numbers are not.")
REDS_OLD = ("DECLARED REDS OF THE HEAD, never a failing line: Q152's six M0-a-09 bands tests (if M0-a-09's re-pin round has not landed), J176's Mac-reference bench tests, Q153's flake "
            "(testkit/test/determinism/dilation.test.ts; re-run alone).")
REDS_NEW = ("DECLARED REDS OF THE HEAD, never a failing line (brought to the head of 2026-11-13; where THE MEASURED LIST above names a red of the head differently, this list is the newer): Q152's "
            "six M0-a-09 bands tests; J176's Mac-reference bench tests (bench/test/calibrate, host, timing); bench/test/site/summary.test.ts's canary (J772 (7): the committed site summary is "
            "stale until the session's re-run — the compose.test.ts and spike.test.ts reds the measured list names beside it were re-pinned since by M0-e-06 S4 and are green); Q153's flake "
            "(testkit/test/determinism/dilation.test.ts; re-run alone); and Q202 — the seven 'later rungs' cases of packages/layout/test/enceinte/s5seeds.test.ts, which register only at FULL "
            "strength (PLAT_FUZZ_RUNS unset; at 1 000 runs the file reports 'No test found') and are red there since before this round was specced: another item's, re-pinned by a round in "
            "flight. THE RESTARTS (a fact of this platform on 2026-11-12 / 13: a container restarts about every two hours whether or not background tasks are live; /home/user/maps-scratch "
            "survives, every process dies, /tmp does not survive): every run over ten minutes is a STEP OF A RE-ENTRANT CHAIN under /home/user/maps-scratch/waves/ — its log and its exit-code "
            "file beside it, and for a run of many parts one exit-code file per part, so that a seat that comes back after a restart skips what is finished: the census one file per seed or "
            "family; RELATED@1000 IN CHUNKS — collect RELATED's own file list once (`vitest related --run` with the JSON reporter and a test-name filter that matches nothing, e.g. "
            "-t '^__no_such_test__$'), split it by 12 files, run each chunk with `vitest run --passWithNoTests` at PLAT_FUZZ_RUNS=1000 under ONE recorded PLAT_FUZZ_SEED, each chunk's JSON "
            "report and exit code beside it, the totals summed from the JSON reports (a file that registers no test at 1 000 runs is named); NEAR one run per project; each mutant its own "
            "exit-code file. A CHECKPOINT line names the chain's directory and its next unfinished step at least every twenty minutes of the seat's own work.")


def merged_old(n):
    return (f"THIS IS LEG {n} OF A MERGED ROUND (the MERGED-ROUND RULE, J443): M0-a-02 S4 → M0-a-06 S10 → M0-a-05 S15, in that order, on ONE tree and ONE branch, no reset between, each leg "
            "with its own build, closing check, LANDED line and record; a leg launches only when the leg before it returned ok with check.verdict pass (each builds on the one before).")


def merged_new(n):
    return (f"THIS IS LEG {n} OF A MERGED ROUND OF TWO LEGS (the MERGED-ROUND RULE, J443): M0-a-02 S4 → M0-a-06 S10, in that order, on ONE tree and ONE branch, no reset between, each leg with "
            "its own build, closing check, LANDED line and record; leg 2 launches only when leg 1 returned ok with check.verdict pass (it builds on it). THE ROUND WAS SPECCED WITH A THIRD "
            "LEG, on M0-a-05 (the write of the `shape` rows at the chain's commit, its register kind and the oracles): the session SPLIT IT OFF (J797) to run as its own round after BOTH this "
            "round and the router round have landed — wherever this entry, the rulings file or a file they cite says 'leg 3' or 'M0-a-05 S15', read 'the later round on M0-a-05'; nothing of "
            "it is built, planted or pinned here beyond what the lines below say.")


out = []
for n, f in ((1, 'spec-a02-s4.json'), (2, 'spec-a06-s10.json')):
    e = json.load(open(D + f, encoding='utf-8'))
    s = e['session']
    for old, new in ((merged_old(n), merged_new(n)), (GATE_OLD, GATE_NEW), (REDS_OLD, REDS_NEW)):
        assert s.count(old) == 1, (f, old[:50], s.count(old))
        s = s.replace(old, new)
    e['session'] = s
    json.dump(e, open(D + 'split-2026-11-13/' + f, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    open(D + 'split-2026-11-13/' + f, 'a').write('\n')
    out.append(e)
sp = json.load(open(P, encoding='utf-8'))
have = {(e['id'], e.get('round')) for e in sp['rounds']}
for e in out:
    assert (e['id'], e['round']) not in have, e['id']
    assert set(e.keys()) >= {'id', 'from', 'round', 'session', 'lines'}, e.keys()
sp['rounds'] += out
json.dump(sp, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
open(P, 'a').write('\n')
print('appended; rounds =', len(sp['rounds']), [(e['id'], e['round'], e['from'], len(e['session']), len(e['lines']), sorted(e.keys())) for e in out])
