#!/usr/bin/env python3
"""coherence/rewrite-V07 — mechanical citation pass (G-cite, S7) over docs/volumes/V07-village.md.

Produces work/rewrite-V07/converted.md and work/rewrite-V07/convert-log.txt.
Rules (V07's old pointer convention -> the set's one form):
  * 'V6 §', 'V4 §', 'V2 §' ... -> 'V06 §' (two-digit volume names); 'V6 W75' -> 'V06 W75'; "V6's" -> "V06's".
  * "the base's §x" -> '§x' (the base is bare).
  * a bare §x that V07's convention made the volume's own (§1b, §2.1-§2.7, §2.2a, any §3.m, a top-level §n with n <= 13)
    -> 'V07 §x'; a bare §x continuing a list that began with another volume's prefix inherits that volume.
  * every other bare §x stays bare (the base).
"""
import re, sys, os
ROOT = '/home/user/maps-architecture'
SRC = os.path.join(ROOT, 'docs/volumes/V07-village.md')
OUT = os.path.join(ROOT, 'docs/validation/coherence/work/rewrite-V07/converted.md')
LOG = os.path.join(ROOT, 'docs/validation/coherence/work/rewrite-V07/convert-log.txt')

text = open(SRC, encoding='utf-8').read()
log = []

# 1. two-digit volume names in pointers
def vol2(m):
    return 'V0' + m.group(1)
text = re.sub(r'(?<![\w.\-])V([1-9])(?=\s§|\s+W\d|\s+X\d|\s+H\d|’s|\'s|\s+FL-|\s+IN-)', vol2, text)
text = re.sub(r'\bvolume ([1-9]) §', lambda m: 'V0' + m.group(1) + ' §', text)
text = re.sub(r'\bvolume (1[0-2]) §', lambda m: 'V' + m.group(1) + ' §', text)

# 2. the base's §x -> placeholder (bare base)
BASEMARK = '\u0000B'
text = re.sub(r"the(\s+)base['’]s(\s+)§", lambda m: BASEMARK + '§' if '\n' not in m.group(0) else '\n' + BASEMARK + '§', text)

V07_SUB = {'1b', '2.1', '2.2', '2.2a', '2.3', '2.4', '2.5', '2.6', '2.7'}
BASE_SUBS = set('0.1 0.2 0.3 1.1 1.2 1.3 1.4 1.5 1.6 1.7 2.1 2.2 2.3 2.4 2.5 2.6 2.7 2.8 2.9 3.1 3.2 3.3 3.4 3.5 3.6 3.7 3.8 3.9 3.10 3.11 4.1 4.2 4.3 4.4 4.5 4.6 4.7 4.8 4.9 4.10 4.11 4.12 4.13 5.1 5.2 5.3 5.4 6.1 6.2 6.3 6.4 6.5 7.1 7.2 7.3 7.4 7.5 7.6 7.7 7.8 8.1 8.2 8.3 8.4 8.5 8.6 8.7 8.8 8.9 8.10 9.1 9.2 9.3 9.4 9.5 9.6 10.1 10.2 10.3 10.4 11.1 11.2 11.3 11.4 11.5 12.1 12.2 12.3 12.4 12.5 12.6 12.7 12.8 12.9 13.1 13.2 13.3 13.4 13.5 13.6 13.7 13.8 13.9 15.1 15.2 17.1 17.2 17.3 17.4'.split())

def is_v07(num):
    if num in V07_SUB:
        return True
    if re.fullmatch(r'3(\.\d+[a-z]?)?', num):
        return True
    if re.fullmatch(r'\d+', num) and int(num) <= 13:
        return True
    return False

tok = re.compile(r'(?P<pre>(?:V\d\d\s|\u0000B)?)§(?P<num>\d+(?:\.\d+)*[a-z]?)')
GAP = re.compile(r'^(?:\s*\([^()§]{1,14}\))*\s*(?:[,;]|–|—|and|or|to|, and|, or|; and)?\s*(?:\([^()§]{1,14}\)\s*)*$')

out = []
pos = 0
last_vol = None
last_end = -1
lines_starts = [0]
for m in re.finditer('\n', text):
    lines_starts.append(m.end())
import bisect
def lineno(p):
    return bisect.bisect_right(lines_starts, p)

for m in tok.finditer(text):
    pre, num = m.group('pre'), m.group('num')
    s, e = m.start(), m.end()
    out.append(text[pos:s])
    if pre == BASEMARK:
        rep = '§' + num
        vol = 'BASEX'
    elif pre:
        rep = pre + '§' + num
        vol = pre.strip()
    else:
        gap = text[last_end:s] if last_end >= 0 else None
        inherit = gap is not None and last_vol not in (None, 'BASE', 'V07') and len(gap) < 40 and ';' not in gap and GAP.match(gap)
        if inherit and last_vol == 'BASEX':
            rep = '§' + num
            vol = 'BASEX'
            log.append('INHERIT-BASE l%d §%s ctx=%r' % (lineno(s), num, text[max(0, s-60):e+10]))
        elif inherit:
            rep = last_vol + ' §' + num
            vol = last_vol
            log.append('INHERIT l%d %s §%s  gap=%r ctx=%r' % (lineno(s), last_vol, num, gap, text[max(0, s-60):e+10]))
        elif is_v07(num):
            rep = 'V07 §' + num
            vol = 'V07'
        else:
            rep = '§' + num
            vol = 'BASE'
            if num not in BASE_SUBS and not re.fullmatch(r'\d+', num) and not re.fullmatch(r'\d+\.\d+', num):
                log.append('CHECK-BASE l%d §%s ctx=%r' % (lineno(s), num, text[max(0, s-60):e+10]))
            elif re.fullmatch(r'\d+\.\d+', num) and num not in BASE_SUBS:
                log.append('CHECK-BASE l%d §%s ctx=%r' % (lineno(s), num, text[max(0, s-60):e+10]))
    out.append(rep)
    pos = e
    last_vol = vol
    last_end = e
out.append(text[pos:])
res = ''.join(out)
res = res.replace(BASEMARK, '')
# 'V07 §' must never be doubled
res = res.replace('V07 V07 §', 'V07 §')
open(OUT, 'w', encoding='utf-8').write(res)
open(LOG, 'w', encoding='utf-8').write('\n'.join(log) + '\n')
print('tokens logged', len(log))
