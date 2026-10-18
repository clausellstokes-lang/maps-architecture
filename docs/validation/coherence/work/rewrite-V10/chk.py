#!/usr/bin/env python3
"""rewrite-V10 checks over the assembled volume: retired forms and narration, ids, list citations, references.
usage: chk.py [volume.md]  — prints findings; exit 0 always (a report, not a gate)."""
import re, sys, os, glob, collections
ROOT = '/home/user/maps-architecture'
V = sys.argv[1] if len(sys.argv) > 1 else ROOT + '/docs/validation/coherence/new/volumes/V10-clerk.md'
t = open(V, encoding='utf-8').read()
L = t.split('\n')
sec10 = [i for i, l in enumerate(L) if l.startswith('## 10 ')][0]
sec11 = [i for i, l in enumerate(L) if l.startswith('## 11 ')][0]

def hits(pat, flags=0, skip=None):
    r = []
    for i, l in enumerate(L):
        if skip and skip(i): continue
        for m in re.finditer(pat, l, flags):
            r.append((i + 1, l[max(0, m.start() - 50): m.end() + 40]))
    return r

print('== retired forms and narration')
checks = {
  'ClerkHarness': r'ClerkHarness', 'error.clerkOffline': r'error\.clerkOffline', 'floor vault': r'floor[- ]vault',
  'G-cite V1-9': r'(?<![\w/.-])V[1-9](?= §|\'s\b| \()', 'DR alias': r'DR-V\d|DR-SKY', 'clerk.json': r'clerk\.json',
  'narration round': r'reconciliation round|second brief|round \d\b|revision round|this revision|[Ff]inalization|found beside|found in passing|seam-|critique-V10',
  'review ids': r'\b(?:SS-\d+|SR\d?-\d+|C10-\d+|C8-\d+|TR-\d+|V9C-\d+|SCC-[\w-]+|J-SS\d)',
  'deferral': r'\bTBD\b|until (?:it|they|V\d\d|volume \d+) (?:lands|names)|pre-decided fallback until|stays the owner|put to the owner|owner\'s option|owner\'s call',
  'G-newrandom': r'scoped re-roll|Rebuild .{0,20}as generated', 'G-suppress': r'kept removed|the removal holds|Removals that hold',
  'G-lot': r'\blots?\b|lot-driven', 'G-firstmap': r'first paint', 'G-standalone': r'standalone hood|lone neighbourhood|standalone neighbourhood(?! document)|standalone-neighbourhood',
  'Anthropic': r'Anthropic', 'deckRefusal': r'deckRefusal', 'internalSolid': r'internalSolid', 'clerk.alt.history.(fork|undo)': r'clerk\.alt\.history\.(?:fork|undo)',
}
for name, pat in checks.items():
    skip = (lambda i: sec10 <= i < sec11) if name in ('review ids',) else None
    h = hits(pat, 0, skip)
    if h:
        print(f'-- {name}: {len(h)}')
        for ln, s in h[:12]: print(f'   {ln}: {s}')
bcr = hits(r'BCR-V\d+-\d+|\bBCR-\d+', 0, lambda i: sec10 <= i < sec11)
print('-- BCR ids outside §10:', len(bcr))
for ln, s in bcr[:12]: print(f'   {ln}: {s}')

print('== ids')
for fam, rx, rowrx in [('J-V10', r'J-V10\.(\d+)', r'^\| J-V10\.(\d+) \|'), ('T-V10', r'T-V10-(\d+)', r'^\| T-V10-(\d+) \|'),
                       ('CVR-V10', r'CVR-V10-(\d+)', r'^\| CVR-V10-(\d+) \|')]:
    defs = collections.Counter(int(m.group(1)) for l in L for m in [re.match(rowrx, l)] if m)
    cited = set(int(x) for x in re.findall(rx, t))
    dup = [k for k, c in defs.items() if c > 1]
    missing = sorted(cited - set(defs))
    gaps = sorted(set(range(1, max(defs) + 1)) - set(defs)) if defs else []
    print(f'{fam}: defined {len(defs)} (max {max(defs) if defs else 0}); duplicates {dup}; cited-not-defined {missing}; gaps {gaps}')

print('== list continuations after a volume citation (every section of a list carries its prefix)')
lc = hits(r'V(?:0[1-9]|1[0-2]) §[0-9][0-9a-z.]*(?: \([a-z0-9]+\))*(?:, | and | or |; |–)§[0-9]')
print(len(lc))
for ln, s in lc[:60]: print(f'   {ln}: {s}')

print('== references')
def secs_of(path):
    s = set()
    for l in open(path, encoding='utf-8'):
        m = re.match(r'#{2,6} (?:§)?([0-9]+[a-z]?(?:\.[0-9]+[a-z]?)*)\b', l)
        if m: s.add(m.group(1))
        for m in re.finditer(r'\*\*([0-9]+\.[0-9]+[a-z]?(?:\.[0-9]+[a-z]?)*) ', l):
            s.add(m.group(1))
    return s
vols = {}
for n in range(1, 13):
    tag = 'V%02d' % n
    newp = glob.glob(ROOT + f'/docs/validation/coherence/new/volumes/{tag}-*.md')
    srcp = glob.glob(ROOT + f'/docs/volumes/{tag}-*.md')
    p = newp[0] if newp and tag != 'V10' else (V if tag == 'V10' else srcp[0])
    vols[tag] = secs_of(p)
base = set()
for p in glob.glob(ROOT + '/docs/validation/coherence/new/base/*/*.md'):
    base |= secs_of(p)
bad = collections.Counter()
for m in re.finditer(r'(V(?:0[1-9]|1[0-2])) §([0-9]+[a-z]?(?:\.[0-9]+[a-z]?)*)', t):
    v, s = m.group(1), m.group(2)
    if s not in vols[v] and not any(x.startswith(s + '.') for x in vols[v]):
        bad[(v, s)] += 1
print('unresolved volume refs:', len(bad))
for (v, s), c in sorted(bad.items()): print(f'   {v} §{s} ×{c}')
bb = collections.Counter()
for m in re.finditer(r'(?<![V0-9 ])(?<!V\d\d )§([0-9]+(?:\.[0-9]+)*)', t):
    s = m.group(1)
    if s not in base and not any(x.startswith(s + '.') for x in base):
        bb[s] += 1
print('unresolved base refs:', len(bb), sorted(bb.items())[:40])
print('== words', len(t.split()), 'bytes', len(t.encode()))
