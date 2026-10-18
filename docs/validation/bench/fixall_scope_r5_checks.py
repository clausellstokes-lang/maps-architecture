# PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/draft-scope-r5 (2026-09-26); queued in docs/FABLE-REVIEW-QUEUE.md.
# usage: python3 docs/validation/bench/fixall_scope_r5_checks.py [--doc docs/ARCHITECTURE.md]   (stdlib only; prints counts only)
# Receipts for round 5's scope items:
#   A  (VS4-1) table rows whose unescaped-pipe cell count differs from their header's, outside fenced code (indented fences
#      included) — the clause doc_checks.py S1 gains this round
#   B  (VS4-3, VS4-6) §16: the milestone rows' effort sums, the effort table's line sums, the base subtotal and total, the
#      cut arithmetic, and D-20's figures against §16's
import argparse, hashlib, re
ap = argparse.ArgumentParser(); ap.add_argument('--doc', default='docs/ARCHITECTURE.md'); a = ap.parse_args()
raw = open(a.doc, 'rb').read(); L = raw.decode('utf-8').split('\n')
print('doc', a.doc, 'md5', hashlib.md5(raw).hexdigest(), 'lines', len(L))
# A
fence = False; hdr = None; bad = []
for i, l in enumerate(L):
    if l.lstrip().startswith('```'): fence = not fence; hdr = None; continue
    if fence: continue
    s = l.rstrip()
    if s.startswith('|'):
        cells = len(re.split(r'(?<!\\)\|', s)) - 2
        if hdr is None: hdr = cells
        elif cells != hdr: bad.append((i + 1, cells, hdr, s.split('|')[1].strip()))
    else: hdr = None
print('A rows whose cell count differs from the header: %d' % len(bad))
for b in bad: print('A   l. %d: %d cells against %d (row %s)' % b)
# B
i16 = next(i for i, l in enumerate(L) if l.startswith('## §16 '))
i17 = next(i for i in range(i16 + 1, len(L)) if L[i].startswith('## §17 '))
sec = L[i16:i17]
rng = lambda t: tuple(int(x) for x in re.match(r'\s*\**(\d+)–(\d+)', t).groups())
ms = [(r.split('|')[1].strip(), rng(r.split('|')[4].replace('pw', ''))) for r in sec if r.startswith('| **M')]
lo = sum(m[1][0] for m in ms); hi = sum(m[1][1] for m in ms)
print('B milestone rows %d: %s' % (len(ms), ', '.join('%s %d–%d' % (re.sub(r'\*\*|—.*', '', m[0]).strip(), *m[1]) for m in ms)))
print('B milestone sum %d–%d' % (lo, hi))
t0 = next(i for i, r in enumerate(sec) if r.startswith('| line | pw |'))
rows = []
for r in sec[t0 + 2:]:
    if not r.startswith('|'): break
    c = [x.strip() for x in r.split('|')[1:-1]]; rows.append((c[0], rng(c[1])))
lines = [x for x in rows if 'subtotal' not in x[0] and 'total' not in x[0] and 'stage 2' not in x[0]]
bl = sum(x[1][0] for x in lines); bh = sum(x[1][1] for x in lines)
sub = next(x[1] for x in rows if 'subtotal' in x[0]); st2 = next(x[1] for x in rows if x[0].startswith('stage 2'))
tot = next(x[1] for x in rows if x[0].startswith('**total'))
print('B effort lines %d: sum %d–%d; stated base subtotal %d–%d; stage 2 %d–%d; stated total %d–%d' % (len(lines), bl, bh, *sub, *st2, *tot))
print('B checks: lines = subtotal %s; subtotal + stage 2 = total %s; milestone sum = total %s' % (
    (bl, bh) == sub, (sub[0] + st2[0], sub[1] + st2[1]) == tot, (lo, hi) == tot))
cuts = [(8, 14), (3, 5), (2, 3), (4, 6)]
cl = sum(c[0] for c in cuts); ch = sum(c[1] for c in cuts)
txt = '\n'.join(sec)
m = re.search(r'a base of ≈ (\d+)–(\d+) pw and a total of ≈ (\d+)–(\d+) pw', txt)
print('B cuts %d–%d: base after cuts computed %d–%d, stated %s–%s; total after cuts computed %d–%d, stated %s–%s' % (
    cl, ch, sub[0] - cl, sub[1] - ch, m.group(1), m.group(2), sub[0] - cl + st2[0], sub[1] - ch + st2[1], m.group(3), m.group(4)))
w = re.search(r'about (\d+)–(\d+) calendar weeks', txt)
print('B calendar weeks stated %s–%s; total ÷ 2 = %.1f–%.1f' % (w.group(1), w.group(2), tot[0] / 2, tot[1] / 2))
d20 = next(l for l in L if l.startswith('| D-20 |'))
print('B D-20 figures: total %s, base %s, stage 2 %s, after cuts %s' % (re.search(r'Effort ≈ (\d+–\d+)', d20).group(1), re.search(r'the base (\d+–\d+)', d20).group(1), re.search(r'stage 2 (\d+–\d+)', d20).group(1), re.search(r'reduce it to ≈ (\d+–\d+)', d20).group(1)))
print('B plain words:', re.search(r'about (\d+–\d+) expert person-weeks', txt).group(1))
