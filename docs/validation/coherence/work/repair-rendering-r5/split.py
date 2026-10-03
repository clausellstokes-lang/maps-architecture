#!/usr/bin/env python3
"""split.py — copy the live base's §8, §9, §11, §12 into orig/ as one file per subsection (X.0 = the ## intro up to the
first ###; X.y = a ### subsection up to the next heading of level <= 3, fenced code ignored); writes manifest.json.
Concatenating a section's files in manifest order gives the section byte for byte."""
import hashlib, json, os, re
ROOT = '/home/user/maps-architecture'
W = os.path.dirname(os.path.abspath(__file__))
doc = open(f'{ROOT}/docs/ARCHITECTURE.md', encoding='utf-8').read()
lines = doc.split('\n')
FENCE = re.compile(r'^\s*(```|~~~)'); HEAD = re.compile(r'^(#{1,6})\s+\S')
heads, fence = [], None
for i, l in enumerate(lines):
    m = FENCE.match(l)
    if m:
        if fence is None: fence = m.group(1)
        elif m.group(1) == fence: fence = None
        continue
    if fence is None and HEAD.match(l):
        heads.append((i, len(l) - len(l.lstrip('#')), l))
man = []
want = ('8', '9', '11', '12')
for k, (i, lvl, l) in enumerate(heads):
    if lvl == 2:
        m = re.match(r'^## §(\d+) ', l)
        if not m or m.group(1) not in want: continue
        sec = m.group(1); name = f'{sec}.0.md'
    elif lvl == 3:
        m = re.match(r'^### (\d+)\.(\d+) ', l)
        if not m or m.group(1) not in want: continue
        name = f'{m.group(1)}.{m.group(2)}.md'
    else:
        continue
    # end: next heading of level <= 3
    j = len(lines)
    for (i2, lvl2, l2) in heads[k + 1:]:
        if lvl2 <= 3: j = i2; break
    body = '\n'.join(lines[i:j]) + '\n'
    open(f'{W}/orig/{name}', 'w', encoding='utf-8').write(body)
    man.append({'file': name, 'heading': l, 'line': i + 1, 'words': len(body.split())})
json.dump(man, open(f'{W}/manifest.json', 'w'), indent=1, ensure_ascii=False)
print(len(man), 'parts; base sha256', hashlib.sha256(doc.encode()).hexdigest()[:16])
for m in man: print(m['file'], m['line'], m['words'], m['heading'][:90])
