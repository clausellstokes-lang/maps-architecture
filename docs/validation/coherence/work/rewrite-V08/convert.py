#!/usr/bin/env python3
"""Mechanical pass for the V08 rewrite (coherence/rewrite-V08).
Reads docs/volumes/V08-settlementforge.md lines 80..(start of '## 10'), applies:
  G-cite (Vn § -> V0n §), ID-DR (DR-V8.n / DR-V6.1 -> DR28..DR35), ID-BCR (request id -> applied file f item),
  narration-tag stripping inside parentheses (critique and seam ids, round labels),
and writes the converted body split by '## ' / '### ' headings to work/rewrite-V08/convert/NN-<slug>.md.
The parts are then edited by hand; this script is the receipt of the mechanical share."""
import re, json, os, sys
ROOT = '/home/user/maps-architecture'
SRC = ROOT + '/docs/volumes/V08-settlementforge.md'
OUT = ROOT + '/docs/validation/coherence/work/rewrite-V08/convert'
os.makedirs(OUT, exist_ok=True)
lines = open(SRC).read().split('\n')
start = 79  # 0-based index of the Conventions paragraph (line 80)
end = next(i for i, l in enumerate(lines) if l.startswith('## 10 Base change requests'))
text = '\n'.join(lines[start:end])

# G-cite
text = re.sub(r'\bV([1-9]) §', r'V0\1 §', text)
text = re.sub(r'\bV([1-9]) (XV-|W\d|X\d)', r'V0\1 \2', text)

# ID-DR
DR = {'DR-V8.1': 'DR29', 'DR-V8.2': 'DR30', 'DR-V8.3': 'DR31', 'DR-V8.4': 'DR32', 'DR-V8.5': 'DR33',
      'DR-V8.6': 'DR28', 'DR-V8.7': 'DR34', 'DR-V8.8': 'DR35', 'DR-V6.1': 'DR28'}
text = text.replace('DR-V8.2 – DR-V8.6', 'DR28, DR30 – DR33').replace('DR-V8.2 – DR-V8.4', 'DR30 – DR32')
text = text.replace('DR-V8.1 – DR-V8.6', 'DR28 – DR33')
for k, v in DR.items():
    text = re.sub(re.escape(k) + r'(?!\d)', v, text)

# ID-BCR -> applied item
ITEM = {'BCR-V8-1': 472, 'BCR-V8-2': 459, 'BCR-V8-3': 507, 'BCR-V8-4': 508, 'BCR-V8-5': 509, 'BCR-V8-6': 358,
        'BCR-V8-7': 389, 'BCR-V8-8': 390, 'BCR-V8-9': 202, 'BCR-V8-10': 510, 'BCR-V8-11': 391, 'BCR-V8-12': 392,
        'BCR-V8-13': 511, 'BCR-V8-14': 256, 'BCR-V8-15': 410, 'BCR-V8-16': 480, 'BCR-V8-17': 486, 'BCR-V8-18': 529,
        'BCR-V8-19': 359, 'BCR-V8-20': 393, 'BCR-V8-21': 394, 'BCR-V8-22': 395, 'BCR-V8-23': 512, 'BCR-V8-24': 396,
        'BCR-V8-25': 397, 'BCR-V8-26': 257, 'BCR-V8-27': 513, 'BCR-V8-28': 244, 'BCR-V8-29': 425, 'BCR-V8-30': 398,
        'BCR-V8-31': 260, 'BCR-V8-32': 399, 'BCR-V10-14': 519, 'BCR-V10-19': 481, 'BCR-V10-22': 572,
        'BCR-V10-7': 473, 'BCR-V11-26': 425, 'BCR-V6-12': 388, 'BCR-V7-11': 202, 'BCR-V7-26': 322,
        'BCR-V9-12': 463, 'BCR-V9-14': 453, 'BCR-V9-23': 464, 'BCR-V9-36': 583, 'BCR-V9-8': 516}
for k in sorted(ITEM, key=len, reverse=True):
    text = re.sub(re.escape(k) + r'(?!\d)', 'item %d' % ITEM[k], text)
# "item 391, item 392" -> "items 391, 392"
for _ in range(3):
    text = re.sub(r'\bitem (\d+)((?:, (?:items? )?\d+)*)(, | and )item (\d+)',
                  lambda m: 'items %s%s%s%s' % (m.group(1), re.sub(r'items? ', '', m.group(2)), m.group(3), m.group(4)), text)
text = re.sub(r'\bitems items\b', 'items', text)

# narration tags inside parentheses
TAG = (r'(?:critique )?C8-\d+(?: \([0-9a-z]+\))*(?: – C8-\d+)?|SS-\d+(?: \([a-z]\))?|SR-\d+|SR\d-\d+(?: \([a-z]\))*(?: \((?:surfaces|settlements)\))?'
       r'|SCC-R\dC-\d+|SCC-\d+|J-SS\d\.\d+|J-SR\d\.\d+|seam-[a-z0-9-]+(?:\'s continuation)?(?: SR\d-\d+(?: \([a-z]\))*)?'
       r'|reconciliation round \d(?:\'s continuation)?|the finalization|found in passing|XV-V9-\d+|V09 XV-V9-\d+|CVR-V10-\d+'
       r'|V08 §13 X\d+|its X\d+|X\d+|critique §9|C8-\d+ \(\d+\)|SR\d-\d+ \([a-z]\)|TW-03 \(\d\)|ST-\d+|SL-\d+'
       r'|amended in reconciliation round \d[^;)]*|REVISED|added by the revision')
TAGSEG = re.compile(r'^\s*(?:(?:%s)(?:,? (?:and )?)?)+\s*$' % TAG)
def strip_paren(m):
    inner = m.group(1)
    segs = re.split(r'; ', inner)
    keep = []
    for s in segs:
        if TAGSEG.match(s):
            continue
        # comma-separated tag lists inside a segment: drop tag items
        parts = [p for p in re.split(r', ', s)]
        if len(parts) > 1 and all(TAGSEG.match(p) for p in parts):
            continue
        keep.append(s)
    if not keep:
        return ''
    return '(' + '; '.join(keep) + ')'
prev = None
while prev != text:
    prev = text
    text = re.sub(r'\(([^()\n]*)\)', strip_paren, text)
# whitespace left by removed tags: outside code fences only, never leading indentation
out, fence = [], False
for l in text.split('\n'):
    if l.startswith('```'):
        fence = not fence; out.append(l); continue
    if not fence:
        l = re.sub(r'(?<=\S) +([,.;:])(?=\s|$|\))', r'\1', l)
        l = re.sub(r'(?<=\S) {2,}', ' ', l)
        l = l.replace('( ', '(')
    out.append(l)
text = '\n'.join(out)

# split
parts, cur, name = [], [], '00-conventions'
for l in text.split('\n'):
    m = re.match(r'^(##|###) (\S+)', l)
    if m and l.startswith('## ') or (m and l.startswith('### ')):
        parts.append((name, cur)); cur = []
        name = re.sub(r'[^0-9a-z.]+', '-', m.group(2).lower()).strip('-')
    cur.append(l)
parts.append((name, cur))
for i, (n, c) in enumerate(parts):
    open('%s/%02d-%s.md' % (OUT, i, n), 'w').write('\n'.join(c).rstrip('\n') + '\n')
print(len(parts), 'parts;', len(text.split()), 'words')
