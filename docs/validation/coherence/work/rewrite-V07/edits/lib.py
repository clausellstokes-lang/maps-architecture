# helper for the rewrite-V07 section edits: extract a line range of converted2.md, apply exact replacements (each must hit)
import re, sys
D = '/home/user/maps-architecture/docs/validation/coherence/work/rewrite-V07/'
def extract(a, b):
    L = open(D + 'converted2.md', encoding='utf-8').read().split('\n')
    return '\n'.join(L[a-1:b])
def apply(t, reps, strict=True):
    for old, new in reps:
        n = t.count(old)
        if n == 0:
            msg = 'MISS: ' + old[:120]
            if strict: raise SystemExit(msg)
            print(msg)
        t = t.replace(old, new)
    return t
def rx(t, pat, new, count_min=1):
    t2, n = re.subn(pat, new, t)
    if n < count_min:
        raise SystemExit('RX MISS: ' + pat)
    return t2
def save(name, t):
    open(D + 'parts/' + name, 'w', encoding='utf-8').write(t.rstrip('\n') + '\n\n')
# narration ids that leave the normative text (S9): seam, critique and round ids in parentheses
NARR_ID = r'(?:SS|ST|SR\d|TR|TT|TU|TV|TW|TX|SCC(?:-R\dC)?|SL|CVR-V\d+|V\d+C|C\d+(?:-110)?|I110R)-\d+(?:\s?\([a-z0-9]+\))?'
def strip_narr_ids(t):
    # '(SR5-02)' alone -> ''; '(J-V7.1; SR5-02)' -> '(J-V7.1)'; '(SR5-02; J-V7.1)' -> '(J-V7.1)'
    t = re.sub(r';\s*(?:seam\s+)?' + NARR_ID + r'(?:\s*(?:,|and|–)\s*' + NARR_ID + r')*(?=[;)])', '', t)
    t = re.sub(r'\(\s*(?:seam\s+)?' + NARR_ID + r'(?:\s*(?:,|and|–)\s*' + NARR_ID + r')*\s*;\s*', '(', t)
    t = re.sub(r'\s*\(\s*(?:seam\s+)?' + NARR_ID + r'(?:\s*(?:,|and|–)\s*' + NARR_ID + r')*\s*\)', '', t)
    return t
