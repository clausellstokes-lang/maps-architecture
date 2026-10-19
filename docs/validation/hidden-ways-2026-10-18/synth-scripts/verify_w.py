import json, hashlib, re, sys
R='/home/user/maps-architecture/'
D=R+'docs/validation/hidden-ways-2026-10-18/'
fr=json.load(open(D+'draft-w.fragments.json',encoding='utf-8'))
md=open(D+'draft-w.md',encoding='utf-8').read()
fails=[]; info=[]
orig={}
for f in fr:
    if f['file'] not in orig:
        b=open(R+f['file'],'rb').read(); orig[f['file']]=b
md5={k:hashlib.md5(v).hexdigest() for k,v in orig.items()}
# per-fragment checks against live targets
ids=[f['id'] for f in fr]
dups={i for i in ids if ids.count(i)>1}
for i in dups: fails.append((i,'-','duplicate fragment id'))
for f in fr:
    t=orig[f['file']].decode('utf-8'); old=f['old']; ln=int(f['line'])
    if f['md5']!=md5[f['file']]: fails.append((f['id'],f['file'],f"md5 stated {f['md5']} != live {md5[f['file']]}"))
    n=t.count(old)
    if n!=1: fails.append((f['id'],f['file'],f'old text occurs {n} times in live target')); continue
    at=t[:t.index(old)].count('\n')+1
    if abs(at-ln)>3: fails.append((f['id'],f['file'],f'old found at line {at}, stated {ln}'))
    if old==f['new']: fails.append((f['id'],f['file'],'old == new (no-op)'))
# apply in order, then reverse
work={k:v.decode('utf-8') for k,v in orig.items()}
applied=[]
okapply=True
for f in fr:
    t=work[f['file']]; n=t.count(f['old'])
    if n!=1:
        fails.append((f['id'],f['file'],f'apply in order: old occurs {n} times in working copy')); okapply=False; continue
    work[f['file']]=t.replace(f['old'],f['new'],1); applied.append(f)
okrev=True
for f in reversed(applied):
    t=work[f['file']]; n=t.count(f['new'])
    if n!=1:
        # locate by position-less fallback is not allowed; record
        fails.append((f['id'],f['file'],f'reverse: new text occurs {n} times in applied copy')); okrev=False; continue
    work[f['file']]=t.replace(f['new'],f['old'],1)
for k in orig:
    if work[k].encode('utf-8')!=orig[k]:
        fails.append(('-',k,'reversal does not restore the file byte-for-byte')); okrev=False
# item <-> fragment by id
mdids=re.findall(r'^\*\*(\d{3} \([a-z]+\))\.\*\*',md,re.M)
mdset=set(mdids)
for i in sorted(mdset-set(ids)): fails.append((i,'-','item in draft-w.md has no fragment'))
for i in sorted(set(ids)-mdset): fails.append((i,'-','fragment has no item in draft-w.md'))
for i in {x for x in mdids if mdids.count(x)>1}: fails.append((i,'-','item heading duplicated in draft-w.md'))
if mdids!=[i for i in ids if i in mdset]: info.append('order of items in draft-w.md differs from fragment order')
# item heading target/line consistency
for f in fr:
    m=re.search(r'^\*\*'+re.escape(f['id'])+r'\.\*\*(.*)$',md,re.M)
    if not m: continue
    h=m.group(1)
    if '`'+f['file']+'`' not in h: fails.append((f['id'],f['file'],'item heading names a different target file'))
    lm=re.search(r'line (\d+)',h)
    if not lm or int(lm.group(1))!=int(f['line']): fails.append((f['id'],f['file'],f"item heading line {lm.group(1) if lm else None} != fragment line {f['line']}"))
    mm=re.search(r'md5 `([0-9a-f]{8})',h)
    if mm and not f['md5'].startswith(mm.group(1)): fails.append((f['id'],f['file'],'item heading md5 prefix differs'))
print(json.dumps({'fragments':len(fr),'items':len(mdids),'files':{k:(md5[k],sum(1 for f in fr if f['file']==k)) for k in orig},
 'apply_ok':okapply,'reverse_ok':okrev,'fails':fails,'info':info},indent=1))
