import re,sys
def cells(line):
    # split on | outside backticks
    out=[];cur='';tick=False
    for ch in line:
        if ch=='`': tick=not tick
        if ch=='|' and not tick:
            out.append(cur);cur=''
        else: cur+=ch
    out.append(cur)
    return len(out)-2
def check(path):
    L=open(path,encoding='utf-8').read().split('\n')
    bad=[];fence=False;hdr=None
    for i,l in enumerate(L):
        if l.strip().startswith('```'): fence=not fence; continue
        if fence: continue
        if l.startswith('|'):
            if hdr is None:
                hdr=cells(l)
            elif re.match(r'^\|[-\s|:]+\|$',l): pass
            else:
                n=cells(l)
                if n!=hdr: bad.append((i+1,hdr,n,l[:120]))
        else: hdr=None
    return bad
for p in sys.argv[1:]:
    b=check(p); print(p, len(b))
    for x in b[:20]: print('  ',x)
