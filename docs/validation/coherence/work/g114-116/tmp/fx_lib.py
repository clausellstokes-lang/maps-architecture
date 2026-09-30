# Segment-aware replacement for the bundle's items file: prose paragraphs are matched on their joined text (so a
# phrase may cross a line break), every replacement is asserted to match exactly the expected number of times, and only
# the paragraphs a replacement touched are rewrapped (width 125, the file's own rule, as tmp/rewrap116.py).
import re, textwrap

def _segments(lines):
    segs, cur, kind, fence = [], [], None, False
    def flush():
        nonlocal cur, kind
        if cur:
            segs.append([kind, cur])
        cur, kind = [], None
    for l in lines:
        s = l.strip()
        if s.startswith('```'):
            flush(); segs.append(['raw', [l]]); fence = not fence; continue
        if fence or s == '' or s.startswith('|'):
            flush(); segs.append(['raw', [l]]); continue
        if re.match(r'^\d+\. ', l):
            flush(); kind = 'item'; cur.append(l); continue
        if l.startswith('     * '):
            flush(); kind = 'bullet'; cur.append(l); continue
        if l.startswith('       ') and kind == 'bullet':
            cur.append(l); continue
        if re.match(r'^     \*\*\([a-z]\)', l):
            flush(); kind = 'para'; cur.append(l); continue
        if kind is None:
            kind = 'para'
        cur.append(l)
    flush()
    return segs

def _wrap(kind, text):
    if kind == 'item':
        init, sub = '', '     '
    elif kind == 'bullet':
        text = text[2:] if text.startswith('* ') else text
        init, sub = '     * ', '       '
    else:
        init, sub = '     ', '     '
    w = textwrap.TextWrapper(width=125, initial_indent=init, subsequent_indent=sub,
                             break_long_words=False, break_on_hyphens=False)
    return w.wrap(text)

def apply(path, reps):
    lines = open(path, encoding='utf-8').read().split('\n')
    segs = _segments(lines)
    texts = []
    for kind, ls in segs:
        texts.append(ls[0] if kind == 'raw' else ' '.join(l.strip() for l in ls))
    touched = set()
    for i, rep in enumerate(reps):
        old, new = rep[0], rep[1]
        want = rep[2] if len(rep) > 2 else 1
        n = sum(t.count(old) for t in texts)
        assert n == want, (i, n, want, old[:90])
        for j, t in enumerate(texts):
            if old in t:
                texts[j] = t.replace(old, new)
                touched.add(j)
    out = []
    for j, (kind, ls) in enumerate(segs):
        if j not in touched:
            out.extend(ls)
        elif kind == 'raw':
            out.append(texts[j])
        else:
            out.extend(_wrap(kind, texts[j]))
    open(path, 'w', encoding='utf-8').write('\n'.join(out))
    return len(touched)

def apply_plain(path, reps):
    s = open(path, encoding='utf-8').read()
    for i, rep in enumerate(reps):
        old, new = rep[0], rep[1]
        want = rep[2] if len(rep) > 2 else 1
        n = s.count(old)
        assert n == want, (i, n, want, old[:90])
        s = s.replace(old, new)
    open(path, 'w', encoding='utf-8').write(s)
