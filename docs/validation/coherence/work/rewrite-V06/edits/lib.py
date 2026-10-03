# helper for rewrite-V06 section edits: extract a line range of converted.md, apply exact replacements (each must hit)
import re, sys
D = '/home/user/maps-architecture/docs/validation/coherence/work/rewrite-V06/'
def extract(a, b):
    L = open(D + 'converted.md', encoding='utf-8').read().split('\n')
    return '\n'.join(L[a-1:b])
def apply(t, reps, strict=True):
    for old, new in reps:
        n = t.count(old)
        if n == 0:
            msg = 'MISS: ' + old[:160]
            if strict: raise SystemExit(msg)
            print(msg)
        t = t.replace(old, new)
    return t
def rx(t, pat, new, count_min=1, flags=0):
    t2, n = re.subn(pat, new, t, flags=flags)
    if n < count_min:
        raise SystemExit('RX MISS: ' + pat)
    return t2
def save(name, t):
    open(D + 'parts/' + name, 'w', encoding='utf-8').write(t.rstrip('\n') + '\n\n')
# narration ids (seam, critique and round ids) that leave the normative text (S9, V06-NARR-5)
NARR_ID = r'(?:SS|ST|SR\d|SLR\d|TR|TT|TU|TV|TW|TX|SCC(?:-R\dC)?|SL|CVR-V\d+|V\d+C|C6|C\d+|I110R|S23R\d|SR6)-\d+(?:\s?\([a-z0-9]+\))?'
def strip_narr_ids(t):
    t = re.sub(r';\s*(?:seam\s+)?' + NARR_ID + r'(?:\s*(?:,|and|–)\s*' + NARR_ID + r')*(?=[;)])', '', t)
    t = re.sub(r'\(\s*(?:seam\s+)?' + NARR_ID + r'(?:\s*(?:,|and|–)\s*' + NARR_ID + r')*\s*;\s*', '(', t)
    t = re.sub(r'\s*\(\s*(?:seam\s+)?' + NARR_ID + r'(?:\s*(?:,|and|–)\s*' + NARR_ID + r')*\s*\)', '', t)
    t = re.sub(r',\s*' + NARR_ID + r'(?=\))', '', t)
    return t
def words(t):
    return len(t.split())
