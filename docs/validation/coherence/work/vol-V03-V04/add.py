#!/usr/bin/env python3
# append compact inventory lines from stdin.
# item:    I|VOL|kind|sec|owner|statement|reads(;)|used(;)|keys(,)
# finding: F|type|VOL|sev|items(,)|where|claim|hint
#   type in restate,dup,iconf,xconf,bref,wgap,eleg,edge,narr,defer
import sys,json,os
W=os.path.dirname(os.path.abspath(__file__))
IT=f'{W}/items.jsonl'; FI=f'{W}/findings.jsonl'
cnt={}
if os.path.exists(IT):
    for l in open(IT):
        if l.strip():
            d=json.loads(l); v=d['id'][:3]; cnt[v]=max(cnt.get(v,0),int(d['id'][4:]))
fc={}
if os.path.exists(FI):
    for l in open(FI):
        if l.strip():
            d=json.loads(l); fc[d['type']+d['vol']]=fc.get(d['type']+d['vol'],0)+1
sp=lambda s,c: [x.strip() for x in s.split(c) if x.strip()]
ni=nf=0; out_i=open(IT,'a'); out_f=open(FI,'a')
for raw in sys.stdin:
    raw=raw.rstrip('\n')
    if not raw.strip(): continue
    p=raw.split('|')
    if p[0]=='I':
        if len(p)!=9: sys.exit(f'BAD item ({len(p)} fields): {raw[:120]}')
        v=p[1]; cnt[v]=cnt.get(v,0)+1
        d={'id':f'{v}-{cnt[v]:04d}','kind':p[2],'sec':p[3],'owner':p[4],'statement':p[5],'reads':sp(p[6],';'),'used_by':sp(p[7],';'),'keys':sp(p[8],',')}
        out_i.write(json.dumps(d,ensure_ascii=False)+'\n'); ni+=1
    elif p[0]=='F':
        if len(p)!=8: sys.exit(f'BAD finding ({len(p)} fields): {raw[:120]}')
        t,v=p[1],p[2]; fc[t+v]=fc.get(t+v,0)+1
        d={'type':t,'vol':v,'n':fc[t+v],'severity':p[3],'items':sp(p[4],','),'where':p[5],'claim':p[6],'hint':p[7]}
        out_f.write(json.dumps(d,ensure_ascii=False)+'\n'); nf+=1
    else: sys.exit('BAD line: '+raw[:80])
print(f'added {ni} items, {nf} findings; last ids', {k:v for k,v in cnt.items()})
