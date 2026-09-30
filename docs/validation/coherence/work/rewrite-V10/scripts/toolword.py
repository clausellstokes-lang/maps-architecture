import re,sys
W={1:'intend',2:'ground',3:'wall',4:'road',5:'quarter',6:'place',7:'roster',8:'fill',9:'shape',10:'hold',11:'name',12:'dress'}
pat=re.compile(r'(?<![\w\-`.])T(1[0-2]|[1-9])(?![\d\-.\w])(?!\s`)')
def fix_block(b):
    m=pat.search(b)
    if not m: return b,0
    n=int(m.group(1))
    # already followed by its word somewhere right after? e.g. "T8's" -> keep: insert word after possessive
    end=m.end()
    if b[end:end+2]=="'s":
        rep=m.group(0)+" `"+W[n]+"`"
        # "T8 `fill`'s" awkward; use "T8 `fill`'s"
        return b[:m.start()]+rep+b[end:],1
    return b[:m.start()]+m.group(0)+" `"+W[n]+"`"+b[end:],1
tot=0
for fn in sys.argv[1:]:
    t=open(fn).read()
    # split into blocks: table rows (lines starting with |) each a block; else paragraphs by blank line
    lines=t.split('\n'); out=[]; buf=[]; incode=False; cnt=0
    def flush():
        global cnt
        if buf:
            b='\n'.join(buf); b2,c=fix_block(b); cnt+=c; out.append(b2); buf.clear()
    cnt=0
    for l in lines:
        if l.startswith('```'):
            flush(); out.append(l); incode=not incode; continue
        if incode: out.append(l); continue
        if l.startswith('|'):
            flush(); b2,c=fix_block(l); cnt+=c; out.append(b2); continue
        if l.strip()=='':
            flush(); out.append(l); continue
        buf.append(l)
    flush()
    t2='\n'.join(out)
    if t2!=t: open(fn,'w').write(t2)
    print(fn,cnt); tot+=cnt
print('total',tot)
