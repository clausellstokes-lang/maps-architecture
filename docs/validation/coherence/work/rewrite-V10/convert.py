#!/usr/bin/env python3
"""coherence/rewrite-V10 — mechanical pass over docs/volumes/V10-clerk.md (kill-safe; re-runnable).

Output: work/rewrite-V10/converted.md, log convert-log.txt. The rewrite reads the converted text part by part.
Rules:
  G-cite   'V9 §', 'V6 §', 'volume 9 §' ... -> 'V09 §'; "V9's" -> "V09's"; 'this volume's §x' -> 'V10 §x'.
           A bare §x continuing a list (gap: comma, 'and', 'or', en dash) after another volume's citation inherits that
           volume when the number is a heading of that volume (V10-BREF-2); a bare §x naming no base heading but a V10
           heading becomes 'V10 §x'; every other bare §x stays the base's.
  G-clerkhandle  ClerkHarness -> ClerkHandle (the alias line is removed by hand).
  G-offline      error.clerkOffline -> refuse.clerk.offline.
  NARR     review-round ids inside a parenthetical list are removed (SS-n, SRk-n (x), TR-n, C10-n, C8-n, C4-110-n, SCC-…,
           J-SS…, seam-…-rN, reconcile-…-rN, revise-V10, critique-…); an emptied parenthesis is removed.
  ITEM     'file f item' / 'file g item' -> 'item' (owner items 1-113 and file f's 200+ are disjoint).
"""
import re, os, json, bisect
ROOT = '/home/user/maps-architecture'
SRC = os.path.join(ROOT, 'docs/volumes/V10-clerk.md')
W = os.path.join(ROOT, 'docs/validation/coherence/work/rewrite-V10/')
SCR = '/tmp/claude-0/-home-user-maps-architecture/ce371545-83c4-5807-9f2a-da73abd8485d/scratchpad/coherence/'
H = json.load(open(SCR + 'heads.json'))
BASE = set(H['base'])
VOLS = {k: set(v) for k, v in H['vols'].items()}
text = open(SRC, encoding='utf-8').read()
log = []

# --- G-cite: two-digit volume names
text = re.sub(r'(?<![\w.\-])V([1-9])(?=\s§|\s+[WXH]\d|’s|\'s|\s+FL-|\s+IN-|\s+§)', lambda m: 'V0' + m.group(1), text)
text = re.sub(r'\bvolume ([1-9]) §', lambda m: 'V0' + m.group(1) + ' §', text)
text = re.sub(r'\bvolume (1[0-2]) §', lambda m: 'V' + m.group(1) + ' §', text)
text = re.sub(r"\bthis volume['’]s §", 'V10 §', text)
text = re.sub(r'\bV([1-9])-(\d+(?:\.\d+)+)\b', lambda m: 'V0%s §%s' % (m.group(1), m.group(2)), text)

# --- bare-§ resolution
tok = re.compile(r'(?P<pre>(?:V\d\d\s)?)§(?P<num>\d+[a-z]?(?:\.\d+[a-z]?)*)')
GAP = re.compile(r'^(?:\s*\([^()§]{1,16}\))*\s*(?:,|–|—|and|or|, and|, or)?\s*(?:\([^()§]{1,16}\)\s*)*$')
starts = [0] + [m.end() for m in re.finditer('\n', text)]
def ln(p): return bisect.bisect_right(starts, p)
out, pos, last_vol, last_end = [], 0, None, -1
for m in tok.finditer(text):
    pre, num = m.group('pre'), m.group('num')
    s, e = m.start(), m.end()
    out.append(text[pos:s])
    if pre:
        rep, vol = pre + '§' + num, pre.strip()
    else:
        gap = text[last_end:s] if last_end >= 0 else None
        inherit = (gap is not None and last_vol not in (None, 'BASE') and len(gap) < 24 and '\n\n' not in gap
                   and GAP.match(gap) and (num in VOLS.get(last_vol, ()) or num.rsplit('.', 1)[0] in VOLS.get(last_vol, ())))
        if inherit:
            rep, vol = last_vol + ' §' + num, last_vol
            log.append('INHERIT l%d %s §%s ctx=%r' % (ln(s), last_vol, num, text[max(0, s-70):e+12]))
        elif num not in BASE and num in VOLS['V10']:
            rep, vol = 'V10 §' + num, 'V10'
            log.append('OWN l%d §%s ctx=%r' % (ln(s), num, text[max(0, s-70):e+12]))
        else:
            rep, vol = '§' + num, 'BASE'
            if num not in BASE and not re.fullmatch(r'\d+', num):
                log.append('CHECK-BASE l%d §%s ctx=%r' % (ln(s), num, text[max(0, s-70):e+12]))
    out.append(rep)
    pos, last_vol, last_end = e, vol, e
out.append(text[pos:])
text = ''.join(out)

# --- terms
n0 = text.count('ClerkHarness'); text = text.replace('ClerkHarness', 'ClerkHandle'); log.append('G-clerkhandle %d' % n0)
n0 = text.count('error.clerkOffline'); text = text.replace('error.clerkOffline', 'refuse.clerk.offline'); log.append('G-offline %d' % n0)
text = re.sub(r'\bfile [fg] (items?)\b', r'\1', text)

# --- narration ids inside parenthetical lists
NID = (r'(?:(?:seam(?:-surfaces|-time|-settlements)?(?:-r\d+)?|critique(?:-V\d+)?|reconcile-V\d+-r\d+(?:,? (?:second brief|continuation))?(?:,? \d\d:\d\d)?|revise-V\d+|reconciliation round \d+(?:,? (?:second brief|continuation))?|the finali[sz]ation|landed \d\d:\d\d)\s*)?'
       r'(?:(?:SS|SR\d?|TR|ST|SCC(?:-R\dC)?|C10|C8|C4-110|S23R?\d?|V\dC|J-SS\d)[-.]\d+(?:\s*\([a-z0-9](?:\)\s*[–-]\s*\([a-z0-9])?\))*(?:\s*[–-]\s*(?:C4-110-|SR\d?-|SS-)?\d+)?'
       r'|seam(?:-surfaces|-time)?-r\d+|reconcile-V\d+-r\d+(?:,? (?:second brief|continuation))?(?:,? \d\d:\d\d)?|revise-V\d+|critique-V\d+|md5 `[0-9a-f…]+`)')
ELEM = re.compile(r'^\s*(?:' + NID + r')(?:\s*(?:,|and|;)\s*(?:' + NID + r'))*\s*$')
def clean_paren(m):
    inner = m.group(1)
    parts = re.split(r'(;\s*)', inner)
    keep = []
    removed = []
    for i in range(0, len(parts), 2):
        el = parts[i]
        if ELEM.match(el):
            removed.append(el.strip())
            continue
        # comma sub-elements
        sub = re.split(r'(,\s*)', el)
        ks = [sub[j] for j in range(0, len(sub), 2) if not ELEM.match(sub[j])]
        rs = [sub[j].strip() for j in range(0, len(sub), 2) if ELEM.match(sub[j])]
        if rs and ks:
            removed += rs
            el = ', '.join(x.strip() for x in ks)
        keep.append(el.strip())
    if not removed:
        return m.group(0)
    log.append('NARR-PAREN removed %r from %r' % (removed, inner[:160]))
    if not keep or all(not k for k in keep):
        return '\x00EMPTY'
    return '(' + '; '.join(k for k in keep if k) + ')'
paren = re.compile(r'\(([^()]*(?:\([^()]*\)[^()]*)*)\)')
for _ in range(2):
    text = paren.sub(clean_paren, text)
text = re.sub(r'\s?\x00EMPTY', '', text)
text = text.replace(' ,', ',').replace(' .', '.')

open(W + 'converted.md', 'w', encoding='utf-8').write(text)
open(W + 'convert-log.txt', 'w', encoding='utf-8').write('\n'.join(log) + '\n')
import collections
print(collections.Counter(l.split()[0] for l in log))

# --- BCR -> applied item (body before §10 and after it; §10 is rewritten by hand as the pointer table)
M = {'BCR-V10-1': 468, 'BCR-V10-2': 311, 'BCR-V10-3': 270, 'BCR-V10-4': 297, 'BCR-V10-5': 469, 'BCR-V10-6': 470,
     'BCR-V10-7': 473, 'BCR-V10-8': 518, 'BCR-V10-9': 538, 'BCR-V10-10': 531, 'BCR-V10-11': 487, 'BCR-V10-12': 348,
     'BCR-V10-13': 471, 'BCR-V10-14': 519, 'BCR-V10-15': 271, 'BCR-V10-16': 365, 'BCR-V10-17': 366, 'BCR-V10-18': 367,
     'BCR-V10-19': 481, 'BCR-V10-20': 368, 'BCR-V10-21': 290, 'BCR-V10-22': 572, 'BCR-V10-23': 571,
     'BCR-V9-26': 362, 'BCR-V9-27': 465, 'BCR-V9-12': 463, 'BCR-V9-22': 372, 'BCR-V9-23': 464, 'BCR-V9-36': 583,
     'BCR-V9-16': 348, 'BCR-V9-10': 461, 'BCR-V9-28': 466, 'BCR-V9-30': 246, 'BCR-V9-5': 460, 'BCR-V9-34': 467,
     'BCR-V6-25': 290, 'BCR-V6-24': 260, 'BCR-V6-14': 339}
txt = open(W + 'converted.md', encoding='utf-8').read()
cut = txt.index('\n## 10 Base change requests'); cut2 = txt.index('\n## 11 Owner questions')
head, mid, tail = txt[:cut], txt[cut:cut2], txt[cut2:]
def conv(t):
    t = re.sub(r'BCR-V10-6 \(b\)', 'item 461', t)
    t = re.sub(r'BCR-V10-6 \(c\)', 'item 463', t)
    t = re.sub(r'BCR-V10-7 \([a-z]\)', 'item 473', t)
    keys = sorted(M, key=len, reverse=True)
    pat = re.compile('|'.join(re.escape(k) + r'(?!\d)' for k in keys))
    t = pat.sub(lambda m: 'item %d' % M[m.group(0)], t)
    t = re.sub(r'\bitem (\d+)(,|;| and) item \1\b', r'item \1', t)
    t = re.sub(r'\bitem (\d+) \(item \1\)', r'item \1', t)
    return t
txt = conv(head) + mid + conv(tail)
open(W + 'converted.md', 'w', encoding='utf-8').write(txt)
left = sorted(set(re.findall(r'BCR-V\d+-\d+', conv(head))))
print('BCR left in body:', left)
