import json,re,sys
IT=[json.loads(l) for l in open('items.jsonl')]
def q(vol,*pats):
    r=[d['id'] for d in IT if d['id'].startswith(vol) and all(re.search(p,d['statement']+' '+' '.join(d['keys'])) for p in pats)]
    if not r: print('NO MATCH',vol,pats,file=sys.stderr)
    return r
def apply(M):
    F=[json.loads(l) for l in open('findings.jsonl')]
    for (t,v,n),qs in M.items():
        ids=[]
        for x in qs: ids+= q(v,*x) if isinstance(x,tuple) else q(v,x)
        seen=[]; [seen.append(i) for i in ids if i not in seen]
        hit=False
        for d in F:
            if d['type']==t and d['vol']==v and d['n']==n: d['items']=seen or ['—']; hit=True
        if not hit: print('no finding',t,v,n,file=sys.stderr)
    open('findings.jsonl','w').write(''.join(json.dumps(d,ensure_ascii=False)+'\n' for d in F))
