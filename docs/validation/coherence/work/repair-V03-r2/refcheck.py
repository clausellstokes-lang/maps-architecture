#!/usr/bin/env python3
"""refcheck (coherence/repair-V03-r2): every section reference and V03 id in the lines this repair adds resolves.
V03 refs against V03.new.md; another volume's against its live text plus its round-2 repair file where one exists;
base refs against the live base plus the round-2 base repair files present. Ids: every T-V3 and J-V3 id the added
lines name is defined exactly once in V03.new.md, and the new ones appear nowhere else in the set."""
import re, glob, os, difflib
R = '/home/user/maps-architecture/'
S = os.path.dirname(os.path.abspath(__file__))
def secs(text):
    s = set()
    for m in re.finditer(r'^#{1,6}\s+(?:§)?([0-9]+[a-z]?(?:\.[0-9]+[a-z]?)*)\b', text, re.M): s.add(m.group(1))
    for m in re.finditer(r'^\*\*([0-9]+[a-z]?(?:\.[0-9]+[a-z]?)+)\b', text, re.M): s.add(m.group(1))
    for m in re.finditer(r'^#{1,6}\s+(II\.[0-9]+(?:\.[0-9]+)*)', text, re.M): s.add(m.group(1))
    return s
vol = {}
for f in glob.glob(R + 'docs/volumes/V[01][0-9]-*.md'):
    k = os.path.basename(f)[:3]
    t = open(f, encoding='utf-8').read()
    for g in glob.glob(R + 'docs/validation/coherence/repair-r2-%s.md' % k):
        t += '\n' + open(g, encoding='utf-8').read()
    vol[k] = secs(t)
new = open(os.path.join(S, 'V03.new.md'), encoding='utf-8').read()
vol['V03'] = secs(new)
base = open(R + 'docs/ARCHITECTURE.md', encoding='utf-8').read()
for f in glob.glob(R + 'docs/validation/coherence/repair-r2-*.md'):
    if not re.search(r'repair-r2-V[0-9]', f): base += '\n' + open(f, encoding='utf-8').read()
bs = secs(base)
o = open(os.path.join(S, 'V03.orig.md'), encoding='utf-8').read().split('\n')
n = new.split('\n')
sm = difflib.SequenceMatcher(None, o, n, autojunk=False)
plus = []
for tag, i1, i2, j1, j2 in sm.get_opcodes():
    if tag in ('replace', 'insert'): plus += n[j1:j2]
txt = '\n'.join(plus)
bad, seen = [], set()
for m in re.finditer(r'(V[01][0-9]) §([0-9]+[a-z]?(?:\.[0-9]+[a-z]?)*)', txt):
    v, s = m.group(1), m.group(2).rstrip('.'); seen.add((v, s))
    if s not in vol.get(v, set()): bad.append((v, s))
for m in re.finditer(r'(?<!V[01][0-9] )§([0-9]+(?:\.[0-9]+)*)', txt):
    s = m.group(1).rstrip('.'); seen.add(('base', s))
    if s not in bs: bad.append(('base', s))
ids = set(re.findall(r'\b(T-V3-\d+|J-V3\.\d+)\b', txt))
notonce = []
for i in sorted(ids):
    k = len(re.findall(r'^\| ' + re.escape(i) + r' \|', new, re.M))
    if k != 1: notonce.append((i, k))
print('section refs checked', len(seen), '; unresolved', sorted(set(bad)))
print('ids named', len(ids), '; not defined exactly once', notonce)
newids = ['T-V3-39', 'T-V3-40'] + ['J-V3.%d' % k for k in range(136, 141)]
elsewhere = []
for f in glob.glob(R + 'docs/**/*.md', recursive=True):
    if 'repair-r2-V03' in f or f.endswith('V03-interiors.md') or '/work/' in f: continue
    t = open(f, encoding='utf-8', errors='replace').read()
    for i in newids:
        if re.search(re.escape(i) + r'\b', t): elsewhere.append((i, f[len(R):]))
print('new ids used elsewhere', elsewhere)
