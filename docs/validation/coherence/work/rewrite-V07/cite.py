# mechanical citation-form transform for V07 (G-cite, S7): V07's own sections -> 'V07 §x.y'; base bare; other volumes 'Vnn §'
import re, sys
src = open(sys.argv[1]).read()
out = src
# other volumes: V6 § -> V06 §, etc.
out = re.sub(r'\bV([1-9]) §', lambda m: 'V0%s §' % m.group(1), out)
# the base's §x -> placeholder
out = out.replace("the base's §", "\u0001BASE")
cnt = {'own': 0, 'range': 0}
pat = re.compile(r'§(1b|[0-9]{1,2}(?:\.[0-9]+[a-z]?)*)')
res = []
last = 0
prev_conv_end = -10
for m in pat.finditer(out):
    s, e = m.span()
    tok = m.group(1)
    before = out[max(0, s-12):s]
    own = False
    if tok == '1b':
        own = True
    else:
        parts = tok.split('.')
        top = parts[0]
        if len(parts) == 1:
            if top.isdigit() and 1 <= int(top) <= 13:
                own = True
        elif len(parts) >= 2:
            sub = parts[1]
            subn = re.match(r'(\d+)([a-z]?)', sub)
            if top == '2' and subn and (1 <= int(subn.group(1)) <= 7):
                own = True
            if top == '3' and subn and (0 <= int(subn.group(1)) <= 16):
                own = True
    # preceded by a volume name
    if re.search(r'V\d\d $', before) or re.search(r'V\d $', before):
        own = False
    if own:
        # range continuation: '–§' right after a converted ref
        if s - prev_conv_end <= 1 and out[s-1:s] in '–-':
            res.append(out[last:s]); res.append('§' + tok); cnt['range'] += 1
        else:
            res.append(out[last:s]); res.append('V07 §' + tok); cnt['own'] += 1
        prev_conv_end = e
    else:
        res.append(out[last:e])
    last = e
res.append(out[last:])
out = ''.join(res)
out = out.replace("\u0001BASE", "§")
out = out.replace('first paint', 'first map')
open(sys.argv[2], 'w').write(out)
print(cnt, file=sys.stderr)
