#!/usr/bin/env python3
"""scan.py NEW_BASE — the changed lines of NEW_BASE against the live base: the canon's retired-term patterns, deferral
wording, review ids in design text, phone, vague wording; and the word count of the unit (base §4, §10, PART II, PART III)
live and new."""
import json, re, sys, difflib
new = open(sys.argv[1], encoding='utf-8').read().split('\n')
old = open('docs/ARCHITECTURE.md', encoding='utf-8').read().split('\n')
c = json.load(open('docs/validation/coherence/canon.json'))
pats = [(r['id'], r['pattern']) for r in c['glossary']['retired'] if r.get('pattern')]
sm = difflib.SequenceMatcher(None, old, new, autojunk=False)
added = [l for tag, i1, i2, j1, j2 in sm.get_opcodes() if tag != 'equal' for l in new[j1:j2]]
txt = '\n'.join(added)
n = 0
for pid, p in pats:
    for m in re.finditer(p, txt):
        n += 1; print('RETIRED', pid, repr(txt[max(0, m.start() - 60):m.end() + 40]))
for p in [r'\bTBD\b', r'\bto be decided\b', r'\bdeferred?\b', r'\bopen question', r'\bR[234]-\d\d\b', r'\bV(?:PC|EW|Kr|M-R|AL|AT|V\d)[-A-Za-z0-9]*-\d', r'\bphone', r'\betc\.?\b', r'as appropriate', r'similar rules']:
    for m in re.finditer(p, txt):
        n += 1; print('SCAN', p, repr(txt[max(0, m.start() - 80):m.end() + 40]))
print('scan hits', n, 'over', len(added), 'changed lines')
def unit(ls):
    def at(prefix): return next(i for i, l in enumerate(ls) if l.startswith(prefix))
    rng = [(at('## §4 '), at('## §5 ')), (at('## §10 '), at('## §11 ')), (at('# PART II '), at('# Delegated decisions'))]
    return sum(len(re.findall(r'\S+', '\n'.join(ls[a:b]))) for a, b in rng)
print('unit words live', unit(old), 'new', unit(new), 'delta', unit(new) - unit(old))
