#!/usr/bin/env python3
# usage: fixf.py type vol n field value   (items field: comma list)
import sys,json
P='findings.jsonl'; t,v,n,f,val=sys.argv[1:6]; n=int(n)
L=[json.loads(l) for l in open(P) if l.strip()]
for d in L:
    if d['type']==t and d['vol']==v and d['n']==n:
        d[f]=[x.strip() for x in val.split(',') if x.strip()] if f=='items' else val
open(P,'w').write(''.join(json.dumps(d,ensure_ascii=False)+'\n' for d in L))
print('ok')
