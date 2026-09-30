#!/usr/bin/env python3
"""rewrite-V11: strip review-round, seam and critique ids (narration, principle (5); V11-NARR-3..17) from a file.

Design ids stay: J-V11.n, J-VI.n, J-An.m, D-n, T-..., BCR-V11-n (until the pointer table), X-V11-n (own rows), file f items,
DRn. Removed, with the separators around them: SS-n, SRk-n (a), SCC-n, SCC-RkC-n, VnC-n (critique ids), RV-pc-n,
'reconciliation round N['s continuation]', 'round N's continuation', 'seam-<name>-rN', 'reconcile-V11-rN', 'revise-V11'.
Every change is logged (line, before, after) to strip-log.tsv beside this script.
usage: strip.py <in.md> <out.md>
"""
import re, sys, os

RND = (r"(?:(?:the )?reconciliation round \d+(?:'s continuation)?(?: \(continuation\))?"
       r"|round \d+'s continuation|(?:its )?round-\d+ lane"
       r"|seam-[a-z]+(?:-[a-z]+)?-r\d+(?:'s)?(?: \([a-z]+\))?|reconcile-V\d+-r\d+(?:'s continuation)?|revise-V11)")
ONE = (r"(?:SS-\d+|SR\d-\d+|SCC-R\dC-\d+|SCC-\d+|V\d+C-\d+|RV-pc-\d+)"
       r"(?:'s(?: [A-Z0-9]+ half)?)?(?: \([a-z0-9]+\))*")
TOK = r"(?:" + RND + r"|" + ONE + r")"
SEP = r"(?:, and | and |, | – |–|; |/)"
IDS = TOK + r"(?:" + SEP + TOK + r")*"
LOG = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'strip-log.tsv')

pats = [
    (re.compile(r" ?\(" + IDS + r"\)"), ''),                    # ' (SS-06, SCC-11)'
    (re.compile(r"\(" + IDS + r"(?:; |, )"), '('),              # '(SS-15; J-V11.3)' -> '(J-V11.3)'
    (re.compile(r"(?:; |, )" + IDS + r"(?=[);,.\]])"), ''),     # '...; SR2-23)' or '..., SCC-8.'
    (re.compile(r"(?:; |, )" + IDS + r"$"), ''),
    (re.compile(r"\[" + IDS + r"\]"), ''),
]

def strip(s):
    out = s
    for _ in range(8):
        prev = out
        for p, r in pats:
            out = p.sub(r, out)
        if out == prev:
            break
    return out

inp, outp = sys.argv[1], sys.argv[2]
lines = open(inp, encoding='utf-8').read().split('\n')
new = []
with open(LOG, 'w', encoding='utf-8') as log:
    for i, l in enumerate(lines, 1):
        n = strip(l)
        if n != l:
            log.write(f"{i}\t{l.strip()[:400]}\t{n.strip()[:400]}\n")
        new.append(n)
open(outp, 'w', encoding='utf-8').write('\n'.join(new))
left = [(i, m.group(0)) for i, l in enumerate(new, 1) for m in re.finditer(TOK, l)]
print('left:', len(left))
