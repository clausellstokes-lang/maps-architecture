#!/usr/bin/env python3
"""c3runs.py (coherence/assemble-r7y, P5, new) — doc_checks.py's C3 runs located: the same corpus 3-grams (findings and
the JSON document-order streams, built as doc_checks builds them) and the same maximal-run rule over the eight '#' keys,
each run recorded with the line its first token stands on. For every distinct unreviewed run of the attribution file it
prints the installed copy's runs equal to it (its sites) and the untouched copy's runs that contain it (and whether
that longer run has a reviewed row). Read-only. Usage: c3runs.py ATTRIBUTION.tsv UNTOUCHED.md FINAL.md OUT.json"""
import glob, json, os, re, sys
os.chdir('/home/user/maps-architecture')
tok = lambda s: re.findall(r'[a-z0-9_]+', s.lower())
json_files = sorted(set(glob.glob('research/**/*.json', recursive=True) + glob.glob('captures/**/*.json', recursive=True)))
shared = set()
for f in json_files:
    try: d = json.load(open(f, encoding='utf-8', errors='replace'))
    except (OSError, ValueError): continue
    stream = []
    def walk(x):
        if isinstance(x, str): stream.extend(t for t in tok(x) if not t.isdigit())
        elif isinstance(x, dict):
            for k, v in x.items(): stream.extend(t for t in tok(k) if not t.isdigit()); walk(v)
        elif isinstance(x, list):
            for v in x: walk(v)
    sys.setrecursionlimit(100000); walk(d)
    shared.update(zip(stream, stream[1:], stream[2:]))
for f in glob.glob('research/findings/*.md'):
    t = tok(open(f, encoding='utf-8', errors='replace').read()); shared.update(zip(t, t[1:], t[2:]))
allow = set()
for ln in open('docs/validation/doc-checks-allow.tsv', encoding='utf-8'):
    if ln.strip() and not ln.startswith('#'):
        p = ln.rstrip('\n').split('\t')
        if len(p) >= 3 and p[2].strip(): allow.add((p[0], p[1]))
def runs(path):
    lines = open(path, encoding='utf-8').read().split('\n')
    heads = [i for i, l in enumerate(lines) if l.startswith('# ')]
    rng = [(h, (heads[k + 1] if k + 1 < len(heads) else len(lines))) for k, h in enumerate(heads)]
    out = []
    for i0, i1 in rng:
        tl = []
        for i in range(i0, i1):
            for t in tok(lines[i]): tl.append((t, i + 1))
        t = [x for x, _ in tl]; g = list(zip(t, t[1:], t[2:])); run = []
        for k, gg in enumerate(g + [None]):
            if gg is not None and gg in shared: run.append(k)
            else:
                if len(run) >= 3: out.append((' '.join(t[run[0]:run[-1] + 3]), tl[run[0]][1]))
                run = []
    return out
U, F = runs(sys.argv[2]), runs(sys.argv[3])
res = {}
for l in open(sys.argv[1], encoding='utf-8'):
    r = l.rstrip('\n').split('\t')
    if r[0] != 'C3': continue
    s = r[1]; pad = ' ' + s + ' '
    fin = [ln for x, ln in F if x == s]
    unt = [(x, ln, ('C3', x) in allow) for x, ln in U if pad in ' ' + x + ' ']
    res[s] = dict(final_sites=fin, untouched_containing_runs=[dict(run=x, line=ln, reviewed=a) for x, ln, a in unt])
    print(f'{s!r}: installed runs at l. {fin}; untouched runs containing it: ' + '; '.join(f'l. {ln} {x!r} reviewed={a}' for x, ln, a in unt))
json.dump(res, open(sys.argv[4], 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
