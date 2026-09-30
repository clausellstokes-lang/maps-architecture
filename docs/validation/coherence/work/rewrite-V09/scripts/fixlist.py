import re,json,glob,sys
W='/home/user/maps-architecture/docs/validation/coherence/work/rewrite-V09/'
S=json.load(open(W+'secsets.json')); sets={k:set(v) for k,v in S.items() if not k.endswith('_src')}
SEC=r'(\d+[a-z]?(?:\.\d+[a-z]?)*)'
head=re.compile(r'\b(V\d\d)\s+§'+SEC+r'(?:\s*\((?:[^()]|\([^()]*\))*\))?')
cont=re.compile(r'(,\s*|\s+and\s+|\s*–\s*|\s+to\s+|\s+or\s+)§'+SEC)
apply='--apply' in sys.argv
amb=[];fixed=0
for p in sorted(glob.glob(W+'parts/*.md')):
    t=open(p).read(); out=[]; pos=0; changed=False
    i=0
    while True:
        m=head.search(t,i)
        if not m: break
        v=m.group(1); j=m.end()
        while True:
            c=cont.match(t,j)
            if not c: break
            s=c.group(2).rstrip('.')
            inV = s in sets.get(v,set()); inB = s in sets['base']
            if inV:
                # insert prefix
                k=c.start(2)-1  # position of §
                t=t[:k]+v+' '+t[k:]; fixed+=1; changed=True
                j=c.end()+len(v)+1
            elif inV and inB:
                amb.append((p.split('/')[-1],v,t[max(0,c.start()-40):c.end()+10].replace('\n',' ')))
                j=c.end()
            else:
                amb.append(('NOTINV:'+p.split('/')[-1],v,t[max(0,c.start()-40):c.end()+10].replace('\n',' ')))
                j=c.end()
            # skip a parenthetical after
            pm=re.match(r'\s*\((?:[^()]|\([^()]*\))*\)',t[j:])
            if pm: j+=pm.end()
        i=m.end()
    if changed and apply: open(p,'w').write(t)
print('fixed',fixed,'ambiguous',len(amb))
for a in amb: print(a)
