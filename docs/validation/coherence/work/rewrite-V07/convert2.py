#!/usr/bin/env python3
"""coherence/rewrite-V07 — second mechanical pass: a base change request cited in the body becomes the applied item
(S1: after file f is applied the volume cites the base; V07 §10 keeps the pointer table BCR -> item -> section).
Input converted.md, output converted2.md; log convert2-log.txt. Only lines before '## 10 Base change requests' and the
§11-§13 tail are touched (§10 is rewritten by hand as the pointer table)."""
import re, os
D = '/home/user/maps-architecture/docs/validation/coherence/work/rewrite-V07/'
src = open(D + 'converted.md', encoding='utf-8').read()
M = {
 'BCR-V7-1': 201, 'BCR-V7-2': 287, 'BCR-V7-3': 267, 'BCR-V7-4': 214, 'BCR-V7-5': 215, 'BCR-V7-6': 255,
 'BCR-V7-7': 314, 'BCR-V7-8': 315, 'BCR-V7-9': 418, 'BCR-V7-10': 505, 'BCR-V7-11': 202, 'BCR-V7-12': 276,
 'BCR-V7-13': 377, 'BCR-V7-14': 378, 'BCR-V7-15': 344, 'BCR-V7-16': 527, 'BCR-V7-17': 202, 'BCR-V7-18': 202,
 'BCR-V7-19': 357, 'BCR-V7-20': 312, 'BCR-V7-21': 430, 'BCR-V7-22': 209, 'BCR-V7-23': 495, 'BCR-V7-24': 310,
 'BCR-V7-25': 292, 'BCR-V7-26': 322, 'BCR-V7-27': 565, 'BCR-V7-28': 316, 'BCR-V7-29': 283, 'BCR-V7-30': 279,
 'BCR-V7-31': 424, 'BCR-V7-32': 268, 'BCR-V7-33': 290, 'BCR-V7-34': 506, 'BCR-V7-35': 290, 'BCR-V7-36': 576,
 'BCR-V7-37': 577, 'BCR-V7-38': 579,
 'BCR-V6-1': 317, 'BCR-V6-26': 291, 'BCR-V8-32': 399, 'BCR-V8-9': 202, 'BCR-V9-8': 516, 'BCR-V11-13': 436,
 'BCR-V9-25': 413, 'BCR-V9-26': 362, 'V04 BCR-45': 244, 'BCR-V11-1': 432, 'BCR-V12-1': 496,
}
cut = src.index('\n## 10 Base change requests')
cut2 = src.index('\n## 11 Owner questions')
head, mid, tail = src[:cut], src[cut:cut2], src[cut2:]
log = []
def conv(t):
    def rep(m):
        k = m.group(0)
        n = M.get(k)
        if n is None:
            log.append('UNMAPPED ' + k)
            return k
        return 'item %d' % n
    keys = sorted(M, key=len, reverse=True)
    pat = re.compile('|'.join(re.escape(k) + r'(?![\d])' for k in keys))
    t = pat.sub(rep, t)
    # 'file f item' / 'file g item' -> 'item' (ID-ITEM: owner 1-101, g 102-113, f 200-585 are disjoint)
    t = re.sub(r'\bfile [fg] (items?)\b', r'\1', t)
    # collapse duplicates produced by the mapping
    t = re.sub(r'\bitem (\d+)(,|;| and) item \1\b', r'item \1', t)
    t = re.sub(r'\bitem (\d+) \(item \1\)', r'item \1', t)
    t = re.sub(r'\(item (\d+); item \1\)', r'(item \1)', t)
    return t
out = conv(head) + mid + conv(tail)
for k in re.findall(r'BCR-V\d+-\d+|V0\d BCR-\d+', conv(head) + conv(tail)):
    log.append('LEFT ' + k)
open(D + 'converted2.md', 'w', encoding='utf-8').write(out)
open(D + 'convert2-log.txt', 'w', encoding='utf-8').write('\n'.join(sorted(set(log))) + '\n')
print(len(log))
