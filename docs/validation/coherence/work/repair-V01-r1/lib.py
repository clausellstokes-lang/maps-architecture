import re
FENCE = re.compile(r'^\s*(```|~~~)')
HEAD = re.compile(r'^(#{1,6})\s+\S')
def headings(lines):
    out, fence = [], None
    for i, l in enumerate(lines):
        m = FENCE.match(l)
        if m:
            if fence is None: fence = m.group(1)
            elif m.group(1) == fence: fence = None
            continue
        if fence is None and HEAD.match(l):
            out.append((i, len(l) - len(l.lstrip('#')), l))
    return out
def section(lines, heading):
    hs = headings(lines)
    ks = [k for k, h in enumerate(hs) if h[2] == heading]
    assert len(ks) == 1, (heading, ks)
    k = ks[0]; i, lvl, _ = hs[k]
    e = next((h[0] for h in hs[k+1:] if h[1] <= lvl), len(lines))
    return i, e
