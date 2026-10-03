"""Part builder for the V11 rewrite: pull source lines, apply exact replacements (each must match exactly once
unless count given), write the part. Usage from an edit script:
    from helper import build
    build('03-s1b', [(230, 315)], [(old, new), ...], pre='', post='')
"""
import sys, os, re
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, '..', 'V11-source.md')
PARTS = os.path.join(HERE, '..', 'parts')
_lines = open(SRC, encoding='utf-8').read().split('\n')

def src(a, b):
    """1-based inclusive line range of the source volume."""
    return '\n'.join(_lines[a-1:b])

def build(name, ranges, reps, pre='', post='', mid=None):
    text = '\n\n'.join(src(a, b) for a, b in ranges) if ranges else ''
    if mid is not None:
        text = mid
    errs = []
    for r in reps:
        if len(r) == 3:
            old, new, cnt = r
        else:
            old, new = r; cnt = 1
        n = text.count(old)
        if cnt == 'all':
            if n == 0:
                errs.append('NOT FOUND (all): ' + old[:120])
            text = text.replace(old, new)
            continue
        if n != cnt:
            errs.append('COUNT %d != %d: %s' % (n, cnt, old[:160]))
            continue
        text = text.replace(old, new)
    if errs:
        print('\n'.join(errs)); sys.exit(1)
    out = (pre + text + post).rstrip('\n') + '\n'
    open(os.path.join(PARTS, name + '.md'), 'w', encoding='utf-8').write(out)
    print('wrote', name, len(out.split()), 'words')
