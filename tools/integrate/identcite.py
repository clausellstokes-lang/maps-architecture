import re,glob,collections
vols={}
for f in sorted(glob.glob('docs/volumes/V*.md')):
    n=int(f.split('/')[-1][1:3]); vols[n]=open(f,encoding='utf-8').read()
base=open('docs/ARCHITECTURE.md',encoding='utf-8').read()
fg=open('docs/AMENDMENTS-2026-09-28f.md',encoding='utf-8').read()+open('docs/AMENDMENTS-2026-09-28g.md',encoding='utf-8').read()
cite=re.compile(r"\b(?:V0?(\d{1,2})|[Vv]olume (\d{1,2}))\b")
tick=re.compile(r"`([^`\s]{3,80})`")
def codey(t): return bool(re.search(r'[a-z][A-Z]|[A-Za-z]\.[A-Za-z]|_[a-z]|\(\)|[a-z]\(',t))
def core(t):
    t=re.sub(r'\(.*','',t); t=t.strip("'\"?:;,.")
    return t
out=collections.defaultdict(list)
for a,txt in vols.items():
    for i,l in enumerate(txt.split('\n')):
        ts=set(int(m.group(1) or m.group(2)) for m in cite.finditer(l))
        ts={t for t in ts if 1<=t<=12 and t!=a}
        if len(ts)!=1: continue   # unambiguous single target only
        b=ts.pop()
        for m in tick.finditer(l):
            t=core(m.group(1))
            if not t or not codey(t): continue
            parts=[t]+t.split('.')
            if any(p and p in vols[b] for p in parts): continue
            if t in base or t in fg: continue
            out[(a,b)].append((i+1,t))
tot=0
for (a,b),L in sorted(out.items()):
    print(f"== V{a:02d} -> V{b:02d}: {len(L)}")
    for ln,t in L: print(f"   {ln}\t{t}")
    tot+=len(L)
print('TOTAL',tot)
print('#### FILTERED: ident occurs in its own volume <=2 times and in no other volume')
allv='\n'.join(vols.values())
cnt=0
for (a,b),L in sorted(out.items()):
    for ln,t in L:
        na=len(re.findall(r'(?<![A-Za-z0-9_])'+re.escape(t)+r'(?![A-Za-z0-9_])',vols[a]))
        others=[k for k in vols if k!=a and t in vols[k]]
        if na<=2 and not others:
            print(f"F\tV{a:02d}->V{b:02d}\t{ln}\t{t}\tinA={na}"); cnt+=1
print('FILTERED',cnt)
