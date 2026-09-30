import sys
sys.path.insert(0, '.')
from fx_lib import _segments
p = sys.argv[1]; pats = sys.argv[2:]
lines = open(p, encoding='utf-8').read().split('\n')
for kind, ls in _segments(lines):
    t = ls[0] if kind == 'raw' else ' '.join(l.strip() for l in ls)
    for pat in pats:
        i = t.find(pat)
        while i >= 0:
            print('>>', pat[:30], '::', t[max(0, i-250): i+len(pat)+250]); print()
            i = t.find(pat, i+1)
