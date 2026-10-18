#!/usr/bin/env python3
"""refcheck (coherence/repair-V02-r2): every section reference and V02 id in the lines this repair adds resolves.
V02 refs against V02.new.md; other volumes' against the live volumes; base refs against the live base plus the
round-2 base repair files present (their REPLACE bodies). Ids: every T-V2, J-V2 and X id the added lines name is
defined exactly once in V02.new.md."""
import re, glob, os
R = '/home/user/maps-architecture/'
S = os.path.dirname(os.path.abspath(__file__))
def secs(text):
    s = set()
    for m in re.finditer(r'^#{1,6}\s+(?:§)?([0-9]+[a-z]?(?:\.[0-9]+[a-z]?)*)\b', text, re.M): s.add(m.group(1))
    for m in re.finditer(r'^\*\*([0-9]+[a-z]?(?:\.[0-9]+[a-z]?)+)\b', text, re.M): s.add(m.group(1))
    for m in re.finditer(r'^#{1,6}\s+(II\.[0-9]+(?:\.[0-9]+)*)', text, re.M): s.add(m.group(1))
    return s
vol = {os.path.basename(f)[:3]: secs(open(f, encoding='utf-8').read()) for f in glob.glob(R + 'docs/volumes/V[01][0-9]-*.md')}
new = open(os.path.join(S, 'V02.new.md'), encoding='utf-8').read()
vol['V02'] = secs(new)
base = open(R + 'docs/ARCHITECTURE.md', encoding='utf-8').read()
for f in glob.glob(R + 'docs/validation/coherence/repair-r2-*.md'):
    if not re.search(r'repair-r2-V[0-9]', f): base += '\n' + open(f, encoding='utf-8').read()
bs = secs(base)
plus = [l[1:] for l in open(os.path.join(S, 'diff.txt'), encoding='utf-8').read().split('\n') if l.startswith('+') and not l.startswith('+++')]
txt = '\n'.join(plus)
bad, seen = [], set()
for m in re.finditer(r'(V[01][0-9]) §([0-9]+[a-z]?(?:\.[0-9]+[a-z]?)*)', txt):
    v, s = m.group(1), m.group(2); seen.add((v, s))
    if s not in vol.get(v, set()): bad.append((v, s))
for m in re.finditer(r'(?<!V[01][0-9] )§([0-9]+(?:\.[0-9]+)*)', txt):
    s = m.group(1); seen.add(('base', s))
    if s not in bs: bad.append(('base', s))
ids = set(re.findall(r'\b(T-V2-\d+|J-V2\.\d+|X\d+)\b', txt))
defs = {}
for i in ids:
    if i.startswith('T-V2'): n = len(re.findall(r'^\* \*\*' + re.escape(i) + r'\b', new, re.M)) + len(re.findall(r'^\| ' + re.escape(i) + r' \|', new, re.M))
    else: n = len(re.findall(r'^\| ' + re.escape(i) + r' \|', new, re.M))
    defs[i] = n
print('section refs checked', len(seen), '; unresolved', sorted(set(bad)))
print('ids named', len(ids), '; not defined exactly once', sorted(i for i, n in defs.items() if n != 1))
