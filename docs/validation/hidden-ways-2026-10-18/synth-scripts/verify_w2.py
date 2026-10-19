import json, hashlib, re, sys, os
R='/home/user/maps-architecture/'
D=R+'docs/validation/hidden-ways-2026-10-18/'
fj=sys.argv[1] if len(sys.argv)>1 else D+'draft-w.fragments.json'
md=D+'draft-w.md'
F=json.load(open(fj,encoding='utf-8'))
fails=[]
raw={}; 
for f in F:
    if f['file'] not in raw: raw[f['file']]=open(R+f['file'],'rb').read()
txt={k:v.decode('utf-8') for k,v in raw.items()}
live_md5={k:hashlib.md5(v).hexdigest() for k,v in raw.items()}
def lineof(s,pos): return s.count('\n',0,pos)+1
c={'md5':0,'once':0,'line':0,'apply':0}
for f in F:
    t=txt[f['file']]
    if f['md5']==live_md5[f['file']]: c['md5']+=1
    else: fails.append((f['id'],f['file'],'md5 stated %s live %s'%(f['md5'],live_md5[f['file']])))
    n=t.count(f['old'])
    if n==1:
        c['once']+=1
        L=lineof(t,t.find(f['old']))
        if abs(L-f['line'])<=3: c['line']+=1
        else: fails.append((f['id'],f['file'],'old at line %d, stated %d'%(L,f['line'])))
    else: fails.append((f['id'],f['file'],'old occurs %d times in live target'%n))
# apply in order
cur=dict(txt); applied=[]
for f in F:
    t=cur[f['file']]; n=t.count(f['old'])
    if n!=1: fails.append((f['id'],f['file'],'apply: old occurs %d times at its turn'%n)); continue
    cur[f['file']]=t.replace(f['old'],f['new'],1); c['apply']+=1; applied.append(f)
after={k:hashlib.md5(v.encode('utf-8')).hexdigest() for k,v in cur.items()}
rev=0
for f in reversed(applied):
    t=cur[f['file']]; n=t.count(f['new'])
    if n!=1: fails.append((f['id'],f['file'],'reverse: new occurs %d times at its turn'%n)); continue
    cur[f['file']]=t.replace(f['new'],f['old'],1); rev+=1
restored={k:(cur[k].encode('utf-8')==raw[k]) for k in raw}
for k,ok in restored.items():
    if not ok: fails.append(('-',k,'reversal not byte-identical'))
# items vs fragments
M=open(md,encoding='utf-8').read()
items=re.findall(r'^\*\*(9\d\d \([a-z]+\))\.\*\* .*?Target: `([^`]+)`, line (\d+) \(md5 `([0-9a-f]+)',M,re.M)
heads=re.findall(r'^\*\*(9\d\d \([a-z]+\))\.\*\*',M,re.M)
iid=[h for h in heads]; fid=[f['id'] for f in F]
for x in set(iid)-set(fid): fails.append((x,'draft-w.md','item without fragment'))
for x in set(fid)-set(iid): fails.append((x,'-','fragment without item'))
dup=[x for x in set(fid) if fid.count(x)>1]+[x for x in set(iid) if iid.count(x)>1]
for x in dup: fails.append((x,'-','duplicate id'))
order_ok = [x for x in iid if x in fid]==[x for x in fid if x in iid]
if not order_ok: fails.append(('-','-','items and fragments not in the same order'))
byid={f['id']:f for f in F}; hd=0
for i,fl,ln,m in items:
    f=byid.get(i)
    if not f: continue
    if f['file']==fl and f['line']==int(ln) and f['md5'].startswith(m): hd+=1
    else: fails.append((i,fl,'heading says %s:%s md5 %s; fragment %s:%d md5 %s'%(fl,ln,m,f['file'],f['line'],f['md5'][:8])))
# overlaps among fragments in same file (old ranges in live text)
ov=0
from collections import defaultdict
rng=defaultdict(list)
for f in F:
    t=txt[f['file']]
    if t.count(f['old'])==1:
        p=t.find(f['old']); rng[f['file']].append((p,p+len(f['old']),f['id']))
for k,v in rng.items():
    v.sort()
    for a,b in zip(v,v[1:]):
        if b[0]<a[1]: ov+=1
out=dict(n=len(F),items=len(iid),heads_parsed=len(items),counts=c,reversed=rev,restored=restored,heading_ok=hd,order_ok=order_ok,overlaps_in_live=ov,live_md5=live_md5,after_md5=after,per_file={k:fid and sum(1 for f in F if f['file']==k) for k in raw},json_md5=hashlib.md5(open(fj,'rb').read()).hexdigest(),md_md5=hashlib.md5(open(md,'rb').read()).hexdigest(),md_lines=M.count('\n'),fails=fails)
print(json.dumps(out,indent=1,ensure_ascii=False))
