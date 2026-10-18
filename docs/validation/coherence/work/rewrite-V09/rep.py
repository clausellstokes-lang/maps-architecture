#!/usr/bin/env python3
"""rewrite-V09: exact replacements in a part file. stdin holds blocks:
@@@OLD
<old text>
@@@NEW
<new text>
@@@END
Each OLD must occur exactly once (else the whole batch is refused and nothing is written)."""
import sys, re
path = sys.argv[1]
text = open(path, encoding='utf-8').read()
spec = sys.stdin.read()
blocks = re.findall(r'@@@OLD\n(.*?)\n@@@NEW\n(.*?)\n?@@@END', spec, re.S)
errs = []
for old, new in blocks:
    n = text.count(old)
    if n != 1:
        errs.append((n, old[:160]))
if errs:
    for n, o in errs:
        print(f'REFUSED ({n} matches): {o!r}')
    sys.exit(1)
for old, new in blocks:
    text = text.replace(old, new)
open(path, 'w', encoding='utf-8').write(text)
print(f'{len(blocks)} replacements applied to {path}')
