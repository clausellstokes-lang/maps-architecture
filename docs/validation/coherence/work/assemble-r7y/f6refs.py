#!/usr/bin/env python3
"""f6refs.py (coherence/assemble-r7y, P4, new; ROUND-7 NOTES (9) (e)) — the citing forms adjudication-r7y adds, which
lawrefs.py does not parse (it reads a clause list right after "law n"): form F6, "law n, read with its terms[;|,] chiefly X"
(and "read with their terms"), whose pointer list X runs to the next ';' or unbalanced ')'; and form F3, "law n, in its
order". Every clause number "(k)" / "(k)–(m)" in X is checked against the clauses the INSTALLED laws define (lawrefs.py's
parse, read from its JSON). Lines read joined. Usage: f6refs.py ROOT LAWREFS_JSON. Writes f6refs.json beside it (named by
the ROOT's last folder)."""
import glob, json, os, re, sys
from collections import Counter
R, LJ = sys.argv[1], sys.argv[2]; W = os.path.dirname(os.path.abspath(__file__))
defined = json.load(open(LJ, encoding='utf-8'))['defined']['law_clauses']
files = ['docs/ARCHITECTURE.md'] + sorted(glob.glob(f'{R}/docs/volumes/V*.md')) + [f'{R}/docs/volumes/INDEX.md']
files = [f if not f.startswith(R) else os.path.relpath(f, R) for f in files]
F6 = re.compile(r'law (\d), read with (?:its|their) terms(?:[;,]\s*chiefly\s+)?')
F3 = re.compile(r'law (\d), in its order')
out = dict(f6=[], f3=[], bad=[]); by = Counter(); by3 = Counter()
for f in files:
    unit = 'base' if f.endswith('ARCHITECTURE.md') else ('INDEX' if f.endswith('INDEX.md') else os.path.basename(f)[:3])
    t = re.sub(r'\s+', ' ', open(f'{R}/{f}', encoding='utf-8').read())
    for m in F6.finditer(t):
        n = m.group(1); tail = t[m.end():m.end() + 400]
        chiefly = 'chiefly' in m.group(0)
        # the pointer list: up to the first ';' or an unbalanced ')'
        depth = 0; end = len(tail)
        for i, ch in enumerate(tail):
            if ch == '(': depth += 1
            elif ch == ')':
                if depth == 0: end = i; break
                depth -= 1
            elif ch == ';' and depth == 0: end = i; break
        X = tail[:end] if chiefly else ''
        nums = []
        for a, b in re.findall(r'\((\d+)\)(?:\s*[–-]\s*\((\d+)\))?', X):
            nums += [str(k) for k in range(int(a), int(b or a) + 1)]
        bad = [k for k in nums if k not in defined.get(n, [])]
        rec = dict(unit=unit, law=n, chiefly=chiefly, pointers=nums, text=t[max(0, m.start() - 60):m.end() + min(end, 160)])
        out['f6'].append(rec); by[(unit, 'chiefly' if chiefly else 'whole')] += 1
        if n not in defined or bad or (chiefly and not nums):
            out['bad'].append(rec | dict(bad=bad))
    for m in F3.finditer(t):
        n = m.group(1); out['f3'].append(dict(unit=unit, law=n, text=t[max(0, m.start() - 60):m.end() + 40])); by3[unit] += 1
        if n not in defined: out['bad'].append(dict(unit=unit, law=n, text=t[m.start():m.end() + 40], form='F3'))
out['by_unit_f6'] = {f'{u} {k}': v for (u, k), v in sorted(by.items())}; out['by_unit_f3'] = dict(by3)
out['pointer_counts'] = dict(Counter(p for r in out['f6'] for p in r['pointers']))
tag = os.path.basename(os.path.normpath(R))
json.dump(out, open(f'{W}/f6refs-{tag}.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(f"F6 citations {len(out['f6'])} ({sum(r['chiefly'] for r in out['f6'])} with a 'chiefly' list); by unit {out['by_unit_f6']}")
print(f"F3 'law n, in its order' {len(out['f3'])}; by unit {out['by_unit_f3']}")
print('pointers', dict(sorted(out['pointer_counts'].items(), key=lambda kv: int(kv[0]))))
print('bad', len(out['bad']))
for r in out['bad']: print('  BAD', r)
