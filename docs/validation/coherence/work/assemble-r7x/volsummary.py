#!/usr/bin/env python3
"""volsummary.py (coherence/assemble-r7x, P5 (b')) — summarises volchecks.sh's runs (each volume and INDEX, untouched vs
installed) and one rationale run, into volchecks-final.txt: counts per check, exit codes, and the distinct unreviewed
(check, run) pairs the installed text adds or drops. Information; volume runs are not held to exit 0. Usage: volsummary.py VOLDIR [RATIONALE.out]"""
import glob, os, re, sys
D = sys.argv[1]; W = os.path.dirname(os.path.abspath(__file__))
def parse(p):
    t = open(p, encoding='utf-8').read()
    cnt = {c: re.search(rf'^{c}: (\d+) hits, (\d+) unreviewed', t, re.M).groups() for c in ('C1', 'C2', 'C3', 'C4', 'S1', 'S2')}
    ex = re.search(r'^exit (\d+)', t, re.M).group(1)
    un = {tuple(l.split(' | ')[:2]) for l in t.split('\n') if l.startswith('UNREVIEWED ')}
    un = {(a.split()[1], b) for a, b in un}
    return cnt, ex, un
out = ["# volchecks-final.txt (coherence/assemble-r7x, P5 (b')) — doc_checks.py over each volume, INDEX and the rationale, whole document,",
       "# untouched (S2 against the untouched base) vs installed (S2 against the installed base). Information; not held to exit 0.",
       "# PROVISIONAL: doc_checks warns the reference corpus is INCOMPLETE in this checkout."]
tot_new = 0
for u in sorted({os.path.basename(p)[:-len('-final.out')] for p in glob.glob(f'{D}/*-final.out')}):
    (c0, e0, u0), (c1, e1, u1) = parse(f'{D}/{u}-untouched.out'), parse(f'{D}/{u}-final.out')
    new, gone = sorted(u1 - u0), sorted(u0 - u1)
    tot_new += len(new)
    out.append(f"{u}: exit {e0} -> {e1}; " + ', '.join(f"{c} {c0[c][0]}/{c0[c][1]} -> {c1[c][0]}/{c1[c][1]}" for c in c0) + f"; new unreviewed pairs {len(new)}, gone {len(gone)}")
    out += [f"   + {c} | {r}" for c, r in new]
    out += [f"   - {c} | {r}" for c, r in gone]
if len(sys.argv) > 2:   # assemble-r5: one rationale run when the rationale is unchanged (as this round: no block writes it)
    rc, re_, ru = parse(sys.argv[2])
    out.append(f"rationale (unchanged this round; one run, --heads the installed base): exit {re_}; " + ', '.join(f"{c} {rc[c][0]}/{rc[c][1]}" for c in rc))
out.append(f"total new distinct unreviewed pairs in the volumes and INDEX: {tot_new}")
open(f'{W}/volchecks-final.txt', 'w', encoding='utf-8').write('\n'.join(out) + '\n')
print('\n'.join(out))
