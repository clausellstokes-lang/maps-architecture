#!/usr/bin/env python3
"""refcheck (coherence/repair-V01-r4): every section reference and id in the lines this repair adds resolves. V01 refs
against V01.new.md; other volumes' against the live volume plus its round-4 repair file's bodies where one exists; base
refs against the live base plus the round-2 base repair files present. Ids: every T-V1, J-V1 id the added lines name is
defined exactly once in V01.new.md; other ids are reported with where they are defined."""
import re, glob, os
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
    v = os.path.basename(f)[:3]
    t = open(f, encoding='utf-8').read()
    rf = R + f'docs/validation/coherence/repair-r4-{v}.md'
    if os.path.exists(rf): t += '\n' + open(rf, encoding='utf-8').read()
    vol[v] = secs(t)
new = open(os.path.join(S, 'V01.new.md'), encoding='utf-8').read()
vol['V01'] = secs(new)
base = open(R + 'docs/ARCHITECTURE.md', encoding='utf-8').read()
for f in glob.glob(R + 'docs/validation/coherence/repair-r4-*.md'):
    if not re.search(r'repair-r4-V[0-9]', f): base += '\n' + open(f, encoding='utf-8').read()
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
for m in re.finditer(r'\b(II\.[0-9]+(?:\.[0-9]+)*)', txt):
    s = m.group(1); seen.add(('base', s))
    if s not in bs: bad.append(('base', s))
ids = set(re.findall(r'\b(T-V1-\d+|J-V1\.\d+)\b', txt))
defs = {}
for i in ids:
    if i.startswith('T-V1'): n = len(re.findall(r'^\| ' + re.escape(i) + r' \|', new, re.M))
    else: n = len(re.findall(r'^\| ' + re.escape(i) + r' \|', new, re.M))
    defs[i] = n
print('section refs checked', len(seen), '; unresolved', sorted(set(bad)))
print('V01 ids named', len(ids), '; not defined exactly once', sorted(i for i, n in defs.items() if n != 1))
other = sorted(set(re.findall(r'\b(T-V(?:[2-9]|1[0-2])-\d+|T1[0-2][0-9]-\d+|DR\d+|J-V\d+\.\d+|J1[0-4]\d)\b', txt)))
alltext = base + '\n' + '\n'.join(open(f, encoding='utf-8').read() for f in glob.glob(R + 'docs/volumes/V*.md')) + '\n' + '\n'.join(open(f, encoding='utf-8').read() for f in glob.glob(R + 'docs/validation/coherence/repair-r4-V*.md'))
for i in other:
    n = len(re.findall(r'(?:^\| |\*\*)' + re.escape(i) + r'\b', alltext, re.M))
    print('  other id', i, 'definition-like occurrences:', n)
