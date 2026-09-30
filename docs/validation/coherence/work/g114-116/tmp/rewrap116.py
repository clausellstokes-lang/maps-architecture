# Rewrap the prose paragraphs and bullets of item 116 at width 125; tables and code fences untouched.
import re, sys, textwrap
p = sys.argv[1]
lines = open(p, encoding='utf-8').read().split('\n')
out, seg, kind = [], [], None
def flush():
    global seg, kind
    if not seg:
        return
    text = ' '.join(l.strip() for l in seg)
    if kind == 'item':
        init, sub = '', '     '
    elif kind == 'bullet':
        text = text[2:] if text.startswith('* ') else text
        init, sub = '     * ', '       '
    else:
        init, sub = '     ', '     '
    w = textwrap.TextWrapper(width=125, initial_indent=init, subsequent_indent=sub, break_long_words=False, break_on_hyphens=False)
    out.extend(w.wrap(text))
    seg, kind = [], None
fence = False
for l in lines:
    s = l.strip()
    if s.startswith('```'):
        flush(); out.append(l); fence = not fence; continue
    if fence or s == '' or s.startswith('|'):
        flush(); out.append(l); continue
    if re.match(r'^\d+\. ', l):
        flush(); kind = 'item'; seg.append(l); continue
    if l.startswith('     * '):
        flush(); kind = 'bullet'; seg.append(l); continue
    if l.startswith('       ') and kind == 'bullet':
        seg.append(l); continue
    if l.startswith('     **(') and re.match(r'^     \*\*\([a-z]\)', l):
        flush(); kind = 'para'; seg.append(l); continue
    if kind is None:
        kind = 'para'
    seg.append(l)
flush()
open(p, 'w', encoding='utf-8').write('\n'.join(out))
