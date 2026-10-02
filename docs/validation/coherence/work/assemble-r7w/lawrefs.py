#!/usr/bin/env python3
"""lawrefs.py (coherence/assemble-r7w, P4 (b''); brief ROUND-7 NOTES (9) (e)) — every citation of §2.7's laws by law,
clause or term in the installed base, volumes and INDEX, checked against what the installed §2.7 support step (6)'s
(0) **§2.7's laws** defines (the model's block, applied first). Read-only. Usage: lawrefs.py ROOT. Writes lawrefs.json.

What the laws define (parsed from the installed text, from "(0) **§2.7's laws**" to "**Worked examples**"):
  law 1 — its numbered clauses ("    n. " list items), cited "law 1 (n)";
  law 2 — its italic heads (*Entry*, *Newer*, *Not yet built*, *The soft readings*, *Carried way*, *A warp*), its steps
          (a)–(c) and the labels (G1), (G3) it writes (not "law 4's (G2)", which it cites); law 3 — its keys (1)–(3);
          law 4 — the label (G2) it writes;
  the Terms — every bold phrase of the Terms list, plus *commit*'s *newly* / *deepens* and the laws' own heads
          (The check, Show me why).
What is checked (lines read joined):
  * every "law n" / "laws n–m" (not an alignment value of V11's tables, "alignment law 0", "alignment sacred −, law 0"):
    n in 1–4;
  * the clause list that follows it ("law 1 (2)–(4), (9)", "law 2 (a)", "law 4's (G2)", "law 1 (8) and (9)"): each item
    defined for that law (numeric ranges expanded);
  * the italic head that follows "law n" ("law 2 *Entry*"): one of that law's heads;
  * an italic term cited as "laws' *x*" ("§2.7's laws' *Order*", "these laws' *held*"): a defined term or head
    (case-insensitive, a leading article ignored)."""
import glob, json, os, re, sys
from collections import Counter
R = sys.argv[1]
W = os.path.dirname(os.path.abspath(__file__))
base = open(f'{R}/docs/ARCHITECTURE.md', encoding='utf-8').read()
a = base.index("(0) **§2.7's laws**"); b = base.index('**Worked examples**', a)
laws = base[a:b]
def part(x, y):
    i = laws.index(x); j = laws.index(y, i) if y else len(laws)
    return laws[i:j]
terms_t = part('**Terms**', '**LAW 1'); l1 = part('**LAW 1', '**LAW 2'); l2 = part('**LAW 2', '**LAW 3')
l3 = part('**LAW 3', '**LAW 4'); l4 = part('**LAW 4', '**The check.**')
norm = lambda s: re.sub(r'^(the|a|an)\s+', '', re.sub(r'\s+', ' ', s.strip().rstrip('.:').lower()))
D = {1: set(re.findall(r'^\s{4}(\d+)\. ', l1, re.M)),
     2: set(re.findall(r'^\s{4}\(([a-c])\) ', l2, re.M)) | set(re.findall(r"(?<!4's )\((G\d)\)", l2)),
     3: set(re.findall(r'\((\d)\) \*\*', l3)),
     4: set(re.findall(r'\((G\d)\)', l4))}
heads = {2: {norm(x) for x in re.findall(r'^\s{4}\* \*([^*]+?)\*', l2, re.M)}}
terms = {norm(x) for x in re.findall(r'\*\*([^*]+?)\*\*', terms_t)} | {norm(x) for x in ('newly', 'deepens', 'The check', 'Show me why')} | heads[2]
terms |= {norm(x) for x in re.findall(r'\*([^*]+?)\*', terms_t) if x[:1].isupper() or x in ('commit', 'shape', 'held')}
defined = dict(law_clauses={str(k): sorted(v, key=lambda x: (len(x), x)) for k, v in D.items()}, law2_heads=sorted(heads[2]), terms=sorted(terms))
units = [('base', f'{R}/docs/ARCHITECTURE.md')] + [(os.path.basename(f)[:3], f) for f in sorted(glob.glob(f'{R}/docs/volumes/V*.md'))] + [('INDEX', f'{R}/docs/volumes/INDEX.md')]
ITEM = re.compile(r"(?:\s*(,|–|-|and|or)\s*|\s*)\((G\d|\d{1,2}|[a-z])\)")
res = dict(defined=defined, cites=Counter(), clause_cites=Counter(), term_cites=Counter(), bad=[])
for u, p in units:
    t = open(p, encoding='utf-8').read()
    nl = [m.start() for m in re.finditer('\n', t)]
    line = lambda pos: 1 + sum(1 for x in nl if x < pos)
    for m in re.finditer(r"(?<!alignment )\blaws?\s+(\d+)(?:\s*[–-]\s*(\d+))?(?:'s)?(?![\d.])", t):
        if 'alignment' in t[max(0, m.start() - 40):m.start()]: continue   # V11's alignment values ("alignment sacred −, law 0")
        ns = [int(m.group(1))] + ([int(m.group(2))] if m.group(2) else [])
        res['cites'][u] += 1
        ctx = re.sub(r'\s+', ' ', t[max(0, m.start() - 70):m.end() + 60])
        for n in ns:
            if n not in D: res['bad'].append(dict(unit=u, line=line(m.start()), kind='law', ref=m.group(0), ctx=ctx))
        if m.group(2): continue
        n = ns[0]; pos = m.end(); items = []; first = True
        while True:
            mm = ITEM.match(t, pos)
            if not mm or (not first and not mm.group(1)) or (first and mm.group(1) and mm.group(1) not in (',',)): break
            if first and mm.group(1) == ',': break      # "law 2, law 3" — a list of laws, no clause
            items.append((mm.group(1), mm.group(2))); pos = mm.end(); first = False
        exp = []
        for k, (sep, it) in enumerate(items):
            if sep in ('–', '-') and exp and it.isdigit() and exp[-1].isdigit():
                exp += [str(x) for x in range(int(exp[-1]) + 1, int(it) + 1)]
            elif sep in ('–', '-') and exp and len(it) == 1 and it.isalpha() and len(exp[-1]) == 1 and exp[-1].isalpha():
                exp += [chr(x) for x in range(ord(exp[-1]) + 1, ord(it) + 1)]
            else: exp.append(it)
        for it in exp:
            res['clause_cites'][f'law {n} ({it})'] += 1
            if n in D and it not in D[n]:
                res['bad'].append(dict(unit=u, line=line(m.start()), kind='clause', ref=f'law {n} ({it})', ctx=ctx))
        mh = re.match(r"\s+\*([^*]{1,40})\*", t[m.end():]) if not items else None
        if mh:
            h = norm(mh.group(1)); res['term_cites'][f'law {n} *{mh.group(1)}*'] += 1
            if h not in heads.get(n, set()):
                res['bad'].append(dict(unit=u, line=line(m.start()), kind='head', ref=f'law {n} *{mh.group(1)}*', ctx=ctx))
    for m in re.finditer(r"laws'\s+\*([^*]{1,50})\*", t):
        res['term_cites'][f"laws' *{m.group(1)}*"] += 1
        if norm(m.group(1)) not in terms:
            res['bad'].append(dict(unit=u, line=line(m.start()), kind='term', ref=m.group(1),
                                   ctx=re.sub(r'\s+', ' ', t[max(0, m.start() - 70):m.end() + 40])))
res['cites'] = dict(res['cites']); res['clause_cites'] = dict(sorted(res['clause_cites'].items())); res['term_cites'] = dict(sorted(res['term_cites'].items()))
json.dump(res, open(f'{W}/lawrefs.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('defined', json.dumps(defined, ensure_ascii=False)[:1500])
print('law citations by unit', res['cites'], 'total', sum(res['cites'].values()))
print('clause citations', sum(res['clause_cites'].values()), res['clause_cites'])
print('term citations', res['term_cites'])
print('bad', len(res['bad']))
for x in res['bad']: print('  ', x['unit'], x['line'], x['kind'], x['ref'], '|', x['ctx'])
