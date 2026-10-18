# Lane coherence/assemble-r0, step (b): attribute every unreviewed C3 run of the combined document. For each distinct run:
# where it stands in the live base (line, top-level section), whether the archived base or an archived volume already
# carries it (our own design text, before this pass), and which corpus files hold it whole (doc_checks' tokenisation:
# lower-cased [a-z0-9_] runs; findings files whole, JSON files as their document-order string stream with purely numeric
# tokens dropped). A run no corpus file holds whole is a chain of 3-grams from different places. Usage:
# attrib.py DOC_CHECKS_OUTPUT OUT.tsv
import glob, json, os, re, sys
ROOT = '/home/user/maps-architecture'
os.chdir(ROOT)
tok = lambda s: re.findall(r'[a-z0-9_]+', s.lower())
runs = sorted({l.split(' | ')[1] for l in open(sys.argv[1], encoding='utf-8') if l.startswith('UNREVIEWED C3 | ')})
def stream_md(p): return tok(open(p, encoding='utf-8', errors='replace').read())
def stream_json(p):
    out = []
    def walk(x):
        if isinstance(x, str): out.extend(t for t in tok(x) if not t.isdigit())
        elif isinstance(x, dict):
            for k, v in x.items(): out.extend(t for t in tok(k) if not t.isdigit()); walk(v)
        elif isinstance(x, list):
            for v in x: walk(v)
    try: walk(json.load(open(p, encoding='utf-8', errors='replace')))
    except Exception: pass
    return out
corpus = {p: ' ' + ' '.join(stream_md(p)) + ' ' for p in sorted(glob.glob('research/findings/*.md'))}
corpus.update({p: ' ' + ' '.join(stream_json(p)) + ' ' for p in sorted(glob.glob('research/**/*.json', recursive=True) + glob.glob('captures/**/*.json', recursive=True))})
ours = {'archived base': 'docs/archive/ARCHITECTURE-pre-coherence-2026-09-28.md'}
for f in sorted(glob.glob('docs/archive/volumes-pre-coherence-2026-09-28/V*.md')): ours['archived ' + os.path.basename(f)[:3]] = f
ours_s = {k: ' ' + ' '.join(stream_md(p)) + ' ' for k, p in ours.items()}
# the live base, tokenised with line numbers, and its top-level sections
L = open('docs/ARCHITECTURE.md', encoding='utf-8').read().split('\n')
toks, tline = [], []
for i, l in enumerate(L):
    for t in tok(l): toks.append(t); tline.append(i + 1)
sec = []; cur = ''; fence = False
for l in L:
    if l.lstrip().startswith('```'): fence = not fence
    if not fence and re.match(r'#{1,2} ', l): cur = l.lstrip('#').strip()[:40]
    sec.append(cur)
live = ' ' + ' '.join(toks) + ' '
# index positions: character offset in `live` -> token index
starts = []; p = 1
for t in toks: starts.append(p); p += len(t) + 1
import bisect
rows = ['run\tlines\tsection\tin_ours\tcorpus_whole\tn_tokens']
for r in runs:
    needle = ' ' + r + ' '
    lines = []; k = live.find(needle)
    while k >= 0 and len(lines) < 6:
        ti = bisect.bisect_left(starts, k + 1); lines.append(tline[ti]); k = live.find(needle, k + 1)
    held = [os.path.relpath(p, 'research') for p, s in corpus.items() if needle in s]
    inours = [k for k, s in ours_s.items() if needle in s]
    rows.append('\t'.join([r, ','.join(map(str, lines)) or '?', sec[lines[0] - 1] if lines else '?', ';'.join(inours) or '-', ';'.join(held) or '-', str(len(r.split()))]))
open(sys.argv[2], 'w', encoding='utf-8').write('\n'.join(rows) + '\n')
from collections import Counter
print(len(runs), 'runs;', 'held whole by a corpus file:', sum(1 for x in rows[1:] if x.split('\t')[4] != '-'),
      '; already in our archived texts:', sum(1 for x in rows[1:] if x.split('\t')[3] != '-'))
print(Counter(x.split('\t')[2][:30] for x in rows[1:]).most_common(40))
