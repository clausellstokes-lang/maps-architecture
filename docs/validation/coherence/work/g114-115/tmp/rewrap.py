import re, sys, textwrap
path = sys.argv[1]
lines = open(path, encoding='utf-8').read().split('\n')
out = []
seg = []
def flush():
    if not seg:
        return
    first = seg[0]
    m = re.match(r'^(\d+\. )', first)
    text = ' '.join(l.strip() for l in seg)
    if m:
        init = ''
        body = text
    else:
        init = '     '
        body = text
    w = textwrap.TextWrapper(width=125, initial_indent=init, subsequent_indent='     ',
                             break_long_words=False, break_on_hyphens=False)
    out.extend(w.wrap(body))
    seg.clear()
for l in lines:
    if l.strip() == '':
        flush(); out.append(''); continue
    if re.match(r'^\d+\. ', l) or l.startswith('     **('):
        flush()
    seg.append(l)
flush()
# drop trailing duplicate empties
text = '\n'.join(out)
text = re.sub(r'\n{3,}', '\n\n', text)
open(path, 'w', encoding='utf-8').write(text.rstrip('\n') + '\n')
