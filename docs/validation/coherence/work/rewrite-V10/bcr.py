#!/usr/bin/env python3
"""rewrite-V10 stage 2: a body citation of a base change request -> its applied file f item (canon: BCR blocks -> pointers).
'BCR-V10-6 (b)' -> 'item 470 (b)'; 'BCR-V9-26' -> 'item 362'. Lines of V10 §10 (3040-3366) are left (rewritten whole).
Writes src/V10-work2.md; appends to transform-log.tsv."""
import re, json, os
HERE = os.path.dirname(os.path.abspath(__file__))
M = json.load(open(os.path.join(HERE, 'bcr-map.json')))
src = open(os.path.join(HERE, 'src', 'V10-work.md'), encoding='utf-8').read().split('\n')
out = []; n = 0
with open(os.path.join(HERE, 'transform-log.tsv'), 'a', encoding='utf-8') as log:
    for i, s in enumerate(src, 1):
        if 3040 <= i <= 3366:
            out.append(s); continue
        def f(m):
            global n
            k = m.group(0)
            if k in M:
                n += 1; log.write(f"{i}\tbcr\t{k}\titem {M[k]}\n"); return 'item ' + M[k]
            return k
        out.append(re.sub(r'\bBCR-V\d+-\d+\b', f, s))
open(os.path.join(HERE, 'src', 'V10-work2.md'), 'w', encoding='utf-8').write('\n'.join(out))
print('replaced', n)
