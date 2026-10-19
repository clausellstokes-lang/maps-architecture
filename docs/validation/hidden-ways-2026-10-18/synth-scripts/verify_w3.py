# verify-3: confirm-only check of draft-w.fragments.json against the live targets.
import json, hashlib, re, sys, os, copy
R='/home/user/maps-architecture/'
D=R+'docs/validation/hidden-ways-2026-10-18/'
frags=json.load(open(D+'draft-w.fragments.json',encoding='utf-8'))
md=open(D+'draft-w.md',encoding='utf-8').read()
fails=[]; checks=0
def lineof(txt,pos): return txt.count('\n',0,pos)+1
def run(frags, label):
    F=[]; n=0
    texts={f:open(R+f,encoding='utf-8').read() for f in sorted(set(x['file'] for x in frags))}
    raw={f:open(R+f,'rb').read() for f in texts}
    for x in frags:
        t=texts[x['file']]; h=hashlib.md5(raw[x['file']]).hexdigest()
        n+=1
        if not h.startswith(x['md5'].rstrip('.…')): F.append(f"{x['id']}: md5 {x['md5']} != {h[:8]} ({x['file']})")
        c=t.count(x['old']); n+=1
        if c!=1: F.append(f"{x['id']}: old occurs {c}x in {x['file']}")
        else:
            L=lineof(t,t.index(x['old'])); n+=1
            if abs(L-x['line'])>3: F.append(f"{x['id']}: old at line {L}, stated {x['line']}")
    # apply in order, then reverse
    cur=dict(texts)
    for x in frags:
        n+=1
        if cur[x['file']].count(x['old'])!=1: F.append(f"{x['id']}: apply: old found {cur[x['file']].count(x['old'])}x"); continue
        cur[x['file']]=cur[x['file']].replace(x['old'],x['new'],1)
        n+=1
        if cur[x['file']].count(x['new'])!=1: F.append(f"{x['id']}: apply: new found {cur[x['file']].count(x['new'])}x after")
    for x in reversed(frags):
        n+=1
        if cur[x['file']].count(x['new'])!=1: F.append(f"{x['id']}: reverse: new found {cur[x['file']].count(x['new'])}x"); continue
        cur[x['file']]=cur[x['file']].replace(x['new'],x['old'],1)
    for f in texts:
        n+=1
        if cur[f].encode('utf-8')!=raw[f]: F.append(f"reverse does not restore {f} byte-for-byte")
    return F,n
F,n=run(frags,'live'); fails+=F; checks+=n
# md <-> json by id
mdids=re.findall(r'^\*\*(\d{3} \([a-z]+\))\.\*\*',md,re.M)
jids=[x['id'] for x in frags]
checks+=1
if len(set(jids))!=len(jids): fails.append('duplicate ids in json')
for i in mdids:
    checks+=1
    if i not in jids: fails.append(f'md item {i} has no fragment')
for i in jids:
    checks+=1
    if i not in mdids: fails.append(f'fragment {i} has no md item')
checks+=1
if mdids!=jids: fails.append('md order != json order')
items=sorted(set(re.findall(r'^\*\*(\d{3})\.\*\*',md,re.M)))
for it in items:
    checks+=1
    if not any(j.startswith(it+' (') for j in jids): fails.append(f'item {it} has no fragment')
# negative controls on copies
neg=[]
for kind in ('old','line','md5'):
    m=copy.deepcopy(frags); x=m[17]
    if kind=='old': x['old']=x['old'][:-1]+('X' if x['old'][-1]!='X' else 'Y')
    if kind=='line': x['line']+=40
    if kind=='md5': x['md5']='00000000'
    Fn,_=run(m,kind); neg.append((kind,x['id'],len(Fn),Fn[:2]))
print('fragments',len(frags),'md items',len(mdids),'items',len(items),items[0],items[-1])
print('checks',checks,'failures',len(fails)); [print(' FAIL',f) for f in fails]
for k in neg: print('NEG',k)
