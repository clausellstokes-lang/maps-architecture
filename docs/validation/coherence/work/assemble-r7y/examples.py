#!/usr/bin/env python3
"""examples.py (coherence/assemble-r7y, P4 (b'''); brief ROUND-7 NOTES (9) (e)) — the citation forms this round's blocks write
beside "law n (m)", which lawrefs.py and tablerefs.py do not read, checked against what the installed §2.7 defines:
  * "its / their worked example(s) X" (the citing form of adjudication-r7's Part H head): each target named in X —
    a crossing-table row "row(s) Wn" (and its cells "Cm"), a way-and-channel table row "row (x)", a named sentence ("the lock
    sentence", "the bent-group sentence" with its items (i)–(iv), "the fixed-place sentence"), an italic name ("*beneath*",
    "*the cap*", "*Strips, zones and nearest points*" …) — must exist in §2.7 (italic names: every bold or italic phrase of
    §2.7 from the support step to its end, the laws and the worked examples included);
  * "support step (n)" / "support step's (n)": n among the support step's items (0)–(7) as installed;
  * the support step (6)'s renamed term: every "(6)'s held" / "(6)'s **held**" left in the set is listed (the model's M6
    renames (6)'s lead and term to **kept**; its sweep names the sites it leaves).
Read-only. Usage: examples.py ROOT. Writes examples.json beside it; prints every target it could not parse, for reading."""
import glob, json, os, re, sys
from collections import Counter
R = sys.argv[1]; W = os.path.dirname(os.path.abspath(__file__))
base = open(f'{R}/docs/ARCHITECTURE.md', encoding='utf-8').read()
s27 = base.index('\n### 2.7 '); e27 = base.index('\n### 2.8 ', s27)
sec = base[s27:e27]
ss = sec.index('* **The support step**')
tail = sec[ss:]
J = lambda s: re.sub(r'\s+', ' ', s)
italics = {J(x).strip().lower() for x in re.findall(r'(?<!\*)\*{1,3}([^*\n][^*]{0,80}?)\*{1,3}(?!\*)', tail)}
# the support step's items: "(n) " opening a clause inside the step's paragraph, and "(n) **" items after it
step_par = tail[:tail.index('* (0) **§2.7')]
steps = set(re.findall(r'(?:^|[;:] |\n  )\((\d)\) ', step_par)) | {'0'} | set(re.findall(r'\n  \((\d)\) \*\*', tail))
cross_rows = {int(x) for x in re.findall(r'\| \*\*W(\d+)\*\*', tail)}
hdr = next(l for l in tail.split('\n') if l.strip().startswith('| wall event'))
cross_cols = {int(x) for x in re.findall(r'\bC(\d+)\b', hdr)}
wc_rows = set(re.findall(r'^\s*\| \*\*\(([a-e])\)\*\*', tail, re.M))   # the way-and-channel table's rows, as tablerefs.py reads them
named = {}
for n in ('lock', 'bent-group', 'fixed-place'):
    m = re.search(r'\*\*The ' + n + r' sentence\*\*', tail); named[n] = bool(m)
bg = tail[tail.index('**The bent-group sentence**'):tail.index('**The fixed-place sentence**')]
bg_items = set(re.findall(r'\((i{1,3}|iv|v)\)', bg))
defined = dict(steps=sorted(steps), cross_rows=sorted(cross_rows), cross_cols=sorted(cross_cols), wc_rows=sorted(wc_rows),
               sentences=named, bent_group_items=sorted(bg_items), italic_names=len(italics))
units = [('base', f'{R}/docs/ARCHITECTURE.md')] + [(os.path.basename(f)[:3], f) for f in sorted(glob.glob(f'{R}/docs/volumes/V*.md'))] + [('INDEX', f'{R}/docs/volumes/INDEX.md')]
res = dict(defined=defined, worked=Counter(), targets=Counter(), steps=Counter(), bad=[], unparsed=[], held6=[])
for u, p in units:
    t = open(p, encoding='utf-8').read()
    nl = [m.start() for m in re.finditer('\n', t)]
    line = lambda pos: 1 + sum(1 for x in nl if x < pos)
    for m in re.finditer(r'\b(?:its|their) worked examples?,?\s+((?:[^;()]|\([^()]*\))*)', t):
        x = J(m.group(1))[:220]; res['worked'][u] += 1; hit = False
        ctx = J(t[max(0, m.start() - 60):m.end() + 10])[:260]
        for r_ in re.findall(r'\brows? W(\d+)', x) + re.findall(r'\bW(\d+)\b', x):
            hit = True; res['targets']['row Wn'] += 1
            if int(r_) not in cross_rows: res['bad'].append(dict(unit=u, line=line(m.start()), kind='row', ref='W' + r_, ctx=ctx))
        for c in re.findall(r'\bC(\d+)\b', x):
            hit = True; res['targets']['col Cm'] += 1
            if int(c) not in cross_cols: res['bad'].append(dict(unit=u, line=line(m.start()), kind='col', ref='C' + c, ctx=ctx))
        if 'way-and-channel' in x or "that table's row" in x or re.match(r'rows? \(', x):
            hit = True; res['targets']['way-and-channel'] += 1
            for r_ in re.findall(r"rows? \(([a-e])\)(?:\s*[–-]\s*\(([a-e])\))?", x):
                res['targets']['wc row'] += 1
                for ch in [r_[0]] + ([r_[1]] if r_[1] else []):
                    if ch not in wc_rows: res['bad'].append(dict(unit=u, line=line(m.start()), kind='wc-row', ref=ch, ctx=ctx))
        for n in ('lock', 'bent-group', 'fixed-place'):
            if f'{n} sentence' in x:
                hit = True; res['targets'][f'{n} sentence'] += 1
                if not named[n]: res['bad'].append(dict(unit=u, line=line(m.start()), kind='sentence', ref=n, ctx=ctx))
                if n == 'bent-group':
                    for it in re.findall(r'bent-group sentence(?:\'s)?\s*\((i{1,3}|iv|v)\)', x):
                        res['targets']['bent-group item'] += 1
                        if it not in bg_items: res['bad'].append(dict(unit=u, line=line(m.start()), kind='bg-item', ref=it, ctx=ctx))
        for it in re.findall(r'(?<!\*)\*{1,3}([^*]{1,80}?)\*{1,3}(?!\*)', x):
            hit = True; res['targets']['italic name'] += 1
            if J(it).strip().lower() not in italics: res['bad'].append(dict(unit=u, line=line(m.start()), kind='italic', ref=it, ctx=ctx))
        if re.search(r"\b(?:the|§2\.7's) crossing table\b", x): hit = True; res['targets']['the crossing table'] += 1
        if not hit: res['unparsed'].append(dict(unit=u, line=line(m.start()), text=x[:160]))
    for m in re.finditer(r"support step(?:'s)?\s+\((\d)\)", t):
        res['steps'][u] += 1
        if m.group(1) not in steps: res['bad'].append(dict(unit=u, line=line(m.start()), kind='step', ref=m.group(0), ctx=J(t[max(0, m.start() - 60):m.end() + 40])))
    for m in re.finditer(r"\(6\)'s\s+\*{0,2}held\b", t):
        res['held6'].append(dict(unit=u, line=line(m.start()), ctx=J(t[max(0, m.start() - 100):m.end() + 60])))
for k in ('worked', 'targets', 'steps'): res[k] = dict(res[k])
json.dump(res, open(f'{W}/examples.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('defined', json.dumps(defined, ensure_ascii=False))
print('worked-example citations by unit', res['worked'], 'total', sum(res['worked'].values()))
print('targets', res['targets']); print('support step (n) citations', res['steps'], 'total', sum(res['steps'].values()))
print('bad', len(res['bad']))
for x in res['bad']: print('  BAD', x['unit'], x['line'], x['kind'], x['ref'], '|', x['ctx'])
print('unparsed', len(res['unparsed']))
for x in res['unparsed']: print('  ?', x['unit'], x['line'], '|', x['text'])
print("(6)'s held sites", len(res['held6']))
for x in res['held6']: print('  H', x['unit'], x['line'], '|', x['ctx'])
