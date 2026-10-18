#!/usr/bin/env python3
"""hitctx.py (coherence/assemble-r7w, P5) — for each attributed unreviewed C3 run (c3-attribution.tsv), the final base's
original text of its every occurrence (the run's tokens mapped back to characters, lines read joined), with 50 characters
either side: the text this seat reviews before writing a row. Usage: hitctx.py ATTRIBUTION.tsv OUT.tsv"""
import re, sys
FIN = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm7w/final/docs/ARCHITECTURE.md'
T = open(FIN, encoding='utf-8').read()
toks = [(m.group(0), m.start(), m.end()) for m in re.finditer(r'[a-z0-9_]+', T.lower())]
words = [t for t, _, _ in toks]
out = ['check\trun\tline\ttext']
for l in open(sys.argv[1], encoding='utf-8'):
    r = l.rstrip('\n').split('\t')
    if r[0] != 'C3': continue
    run = r[1].split(); n = len(run)
    for i in range(len(words) - n + 1):
        if words[i:i + n] == run:
            s, e = toks[i][1], toks[i + n - 1][2]
            ln = T.count('\n', 0, s) + 1
            ctx = re.sub(r'\s+', ' ', T[max(0, s - 50):s] + '[[' + T[s:e] + ']]' + T[e:e + 50])
            out.append('\t'.join(['C3', r[1], str(ln), ctx]))
open(sys.argv[2], 'w', encoding='utf-8').write('\n'.join(out) + '\n')
print(len(out) - 1, 'occurrences')
