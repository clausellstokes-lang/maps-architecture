import re,sys,json
def edit(fn, pairs):
    t=open(fn,encoding='utf-8').read()
    for old,new,cnt in pairs:
        rx=re.compile(r'\s+'.join(re.escape(w) for w in old.split()))
        ms=list(rx.finditer(t))
        assert len(ms)==cnt, (fn, old[:70], len(ms))
        t=rx.sub(lambda m: new, t)
    open(fn,'w',encoding='utf-8').write(t)
    print(fn,'ok',len(pairs))
