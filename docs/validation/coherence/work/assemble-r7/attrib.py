#!/usr/bin/env python3
"""attrib.py (coherence/assemble-r7, P5; assemble-r1's, with the pipe-form proposed rows read too) — attribute every distinct unreviewed hit of the combined document's run
(assemble-r0's attrib.py method): for each C3 run, where it stands in the final base (lines, top-level section), whether
the untouched base already carries it, which repair-r7 file carries it (the block text, tokenised as doc_checks does),
which corpus files hold it whole (findings files whole; JSON files as their document-order string stream, numeric tokens
dropped; a run no corpus file holds whole is a chain of 3-grams from several places), and which repair seat proposed a
reviewed row for it (with its reason). Usage: attrib.py DOC_CHECKS_OUTPUT OUT.tsv"""
import bisect, glob, json, os, re, sys
ROOT = '/home/user/maps-architecture'; os.chdir(ROOT)
SCR = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm7'
tok = lambda s: re.findall(r'[a-z0-9_]+', s.lower())
hits = sorted({(l.split(' | ')[0].split()[1], l.rstrip('\n').split(' | ')[1]) for l in open(sys.argv[1], encoding='utf-8') if l.startswith('UNREVIEWED ')})
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
sp = lambda ts: ' ' + ' '.join(ts) + ' '
corpus = {p: sp(tok(open(p, encoding='utf-8', errors='replace').read())) for p in sorted(glob.glob('research/findings/*.md'))}
corpus.update({p: sp(stream_json(p)) for p in sorted(glob.glob('research/**/*.json', recursive=True) + glob.glob('captures/**/*.json', recursive=True))})
untouched = sp(tok(open(f'{SCR}/before/docs/ARCHITECTURE.md', encoding='utf-8').read()))
repairs = {os.path.basename(p): sp(tok(open(p, encoding='utf-8').read())) for p in glob.glob(f'{ROOT}/docs/validation/coherence/work/assemble-r7/split/base/*.md')}
prop = {}
# the proposed rows of the repair-r7 preambles: the tab form ('# ALLOW C3<TAB>run<TAB>reason', scope) and the pipe form
# ('S2 | §x | reason' with its indented continuation lines, pipeline's and rendering's 'PROPOSED ALLOW ROW(S)')
PIPE = re.compile(r'^#\s*(?:PROPOSED ALLOW ROWS? \([^)]*\):\s*)?(C[1-4]|S[12]) \| (\S+)\s*\| (.+)$')
BUL = re.compile(r'^#\s+\*\s+(C[1-4]|S[12])\s+("[^"]+"|§\S+)\s+—\s+(.+)$')
for p in sorted(glob.glob('docs/validation/coherence/repair-r7-*.md')):
    pl = open(p, encoding='utf-8').read().split('\n')
    first = next(i for i, l in enumerate(pl) if l.startswith('=== '))
    for i, l in enumerate(pl[:first]):
        m = re.match(r'^#\s*(?:ALLOW)?[ \t]+(C[1-4]|S[12])\t([^\t]+)\t(.+)$', l.rstrip('\n'))
        if m: prop.setdefault((m.group(1), m.group(2)), []).append((os.path.basename(p)[len('repair-r7-'):-3], m.group(3))); continue
        # the bullet form (rendering's r4 'Proposed allow rows' list): '#   * C3 "run" — reason' / '#   * S2 §x — reason',
        # its continuation lines indented deeper
        m = BUL.match(l.rstrip())
        if m:
            reason = m.group(3).strip(); j = i + 1
            while j < first and re.match(r'^#\s{4,}\S', pl[j]) and not BUL.match(pl[j].rstrip()):
                reason += ' ' + pl[j][1:].strip(); j += 1
            prop.setdefault((m.group(1), m.group(2).strip('"')), []).append((os.path.basename(p)[len('repair-r7-'):-3], reason))
            continue
        m = PIPE.match(l.rstrip())
        if m:
            reason = m.group(3).strip(); j = i + 1
            while j < first and re.match(r'^#\s{3,}\S', pl[j]) and not PIPE.match(pl[j].rstrip()) and not re.match(r'^#\s*[-*] ', pl[j]):
                reason += ' ' + pl[j][1:].strip(); j += 1
            prop.setdefault((m.group(1), m.group(2)), []).append((os.path.basename(p)[len('repair-r7-'):-3], reason))
L = open(f'{SCR}/final/docs/ARCHITECTURE.md', encoding='utf-8').read().split('\n')
toks, tline = [], []
for i, l in enumerate(L):
    for t in tok(l): toks.append(t); tline.append(i + 1)
sec = []; cur = ''; fence = False
for l in L:
    if l.lstrip().startswith('```'): fence = not fence
    if not fence and re.match(r'#{1,3} ', l): cur = l.lstrip('#').strip()[:40]
    sec.append(cur)
live = sp(toks); starts = []; p = 1
for t in toks: starts.append(p); p += len(t) + 1
rows = ['check\trun\tlines\tsubsection\tin_untouched\tcarried_by\tcorpus_whole\tproposed_by\tproposed_reason']
for c, r in hits:
    lines = []
    if c == 'C3':
        needle = ' ' + r + ' '; k = live.find(needle)
        while k >= 0 and len(lines) < 6:
            lines.append(tline[bisect.bisect_left(starts, k + 1)]); k = live.find(needle, k + 1)
        held = [os.path.relpath(x, 'research') for x, s in corpus.items() if needle in s]
        inu = needle in untouched
        car = [re.search(r'repair-r7-(.+)\.md$', b).group(1) for b, s in repairs.items() if needle in s]
    else:
        lines = [i + 1 for i, l in enumerate(L) if r in l][:6]; held = ['(S2: a base-heading lookup)']; inu = r in open(f'{SCR}/before/docs/ARCHITECTURE.md', encoding='utf-8').read(); car = []
    pr = prop.get((c, r), [])
    rows.append('\t'.join([c, r, ','.join(map(str, lines)) or '?', sec[lines[0] - 1] if lines else '?', 'yes' if inu else 'no', ';'.join(car) or '-',
                           ';'.join(held) or '-', ';'.join(x[0] for x in pr) or '-', ' || '.join(x[1] for x in pr)[:300]]))
open(sys.argv[2], 'w', encoding='utf-8').write('\n'.join(rows) + '\n')
print(len(hits), 'distinct unreviewed hits; held whole by a corpus file:', sum(1 for x in rows[1:] if x.split('\t')[6] not in ('-', '(S2: a base-heading lookup)')),
      '; in the untouched base:', sum(1 for x in rows[1:] if x.split('\t')[4] == 'yes'), '; with a proposed row:', sum(1 for x in rows[1:] if x.split('\t')[7] != '-'))
