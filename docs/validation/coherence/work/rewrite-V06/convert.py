#!/usr/bin/env python3
"""coherence/rewrite-V06 — mechanical pass over docs/volumes/V06-evolution.md (kill-safe; re-runnable).
Output work/rewrite-V06/converted.md, log work/rewrite-V06/convert-log.txt.
Rules (each a canon ruling; every hit is reviewed when its section is rewritten by hand):
  G-cite / S7: 'V6 §' -> 'V06 §', 'V4 §' -> 'V04 §' ...; 'V1-3.7.3' -> 'V01 §3.7.3'; 'volume N §' -> 'V0N §';
       "the base's §x" -> '§x'; own rows 'V6 W19' / 'V6 X44' -> 'W19' / 'X44' (ID-WX: bare = this volume's).
  ID-DR: DR-V6.1 / DR-V8.6 -> DR28, DR-V8.1..5 -> DR29..DR33, DR-V8.7 -> DR34, DR-V8.8 -> DR35, DR-V1.1 -> DR26, DR-SKY -> DR27.
  ID-ITEM: 'file f item' / 'file g item' / 'g item' -> 'item' (owner 1-101, g 102-113, f 200-585 disjoint).
  ID-BCR: a base change request cited in the body (outside V06 §10) -> the applied item (canon requests_in_f);
       V05's BCR-V5-23 and BCR-V5-28 are requests to this volume (file f 'Not items'), left for hand review.
"""
import re, json, os, bisect
ROOT = '/home/user/maps-architecture'
W = ROOT + '/docs/validation/coherence/work/rewrite-V06/'
SRC = ROOT + '/docs/volumes/V06-evolution.md'
BM = json.load(open('/tmp/claude-0/-home-user-maps-architecture/ce371545-83c4-5807-9f2a-da73abd8485d/scratchpad/coherence/V06/bcrmap.json'))['map']
t = open(SRC, encoding='utf-8').read()
log = []
def sub(pat, rep, s, tag, flags=0):
    s2, n = re.subn(pat, rep, s, flags=flags)
    log.append('%s %d' % (tag, n))
    return s2
# G-cite
t = sub(r'\bV01 V1-(?=\d)', 'V01 §', t, 'V01 V1-')
t = sub(r'(?<![\w\-])V1-(?=\d+(?:\.\d+)*\b)', 'V01 §', t, 'V1-')
t = sub(r'(?<![\w.\-])V([1-9])(?=\s+§|’s|\'s|\s+W\d|\s+X\d|\s+H\d|\s+FL-|\s+IN-|\s+Q\d)', lambda m: 'V0' + m.group(1), t, 'Vn->V0n')
t = sub(r'\bvolume ([1-9]) §', lambda m: 'V0' + m.group(1) + ' §', t, 'volume n §')
t = sub(r'\bvolume (1[0-2]) §', lambda m: 'V' + m.group(1) + ' §', t, 'volume 1n §')
t = sub(r"the(\s+)base['’]s(\s+)§", lambda m: ('\n' if '\n' in m.group(0) else '') + '§', t, "the base's §")
t = sub(r'\bV06 (?=[WX]\d)', '', t, 'V06 W/X own')
# ID-DR
for a, b in [('DR-V6.1', 'DR28'), ('DR-V8.6', 'DR28'), ('DR-V8.1', 'DR29'), ('DR-V8.2', 'DR30'), ('DR-V8.3', 'DR31'),
             ('DR-V8.4', 'DR32'), ('DR-V8.5', 'DR33'), ('DR-V8.7', 'DR34'), ('DR-V8.8', 'DR35'), ('DR-V1.1', 'DR26'), ('DR-SKY', 'DR27')]:
    t = sub(re.escape(a) + r'(?![\d])', b, t, a)
t = sub(r'\b(DR\d\d) \(\1\)', r'\1', t, 'DR dup')
# ID-ITEM
t = sub(r'\bfile [fg] (items?)\b', r'\1', t, 'file f/g item')
t = sub(r'(?<![\w`])g (items?) (?=\d)', r'\1 ', t, 'g item')
# ID-BCR in the body (outside §10)
cut = t.index('\n## 10 Base change requests')
cut2 = t.index('\n## 11 Owner questions')
def conv(s):
    def rep(m):
        k = m.group(0)
        if k in ('BCR-V5-23', 'BCR-V5-28'):
            log.append('KEEP ' + k); return k
        key = k
        if k.startswith('V04 BCR-') or k.startswith('V01 BCR-'):
            key = k
        n = BM.get(key)
        if not n:
            log.append('UNMAPPED ' + k); return k
        return 'item ' + str(n[0]) if len(n) == 1 else 'items ' + ', '.join(map(str, n))
    s = re.sub(r'V0[14] BCR-\d+|BCR-V\d+-\d+', rep, s)
    s = re.sub(r'\bitem (\d+)(,|;| and) item \1\b', r'item \1', s)
    s = re.sub(r'\bitem (\d+) \(item \1\)', r'item \1', s)
    s = re.sub(r'\(item (\d+); item \1\)', r'(item \1)', s)
    return s
t = conv(t[:cut]) + t[cut:cut2] + conv(t[cut2:])
open(W + 'converted.md', 'w', encoding='utf-8').write(t)
open(W + 'convert-log.txt', 'w', encoding='utf-8').write('\n'.join(log) + '\n')
print('\n'.join(l for l in log if not l.startswith('KEEP')))
