import re,glob,collections,json
import os; S=os.environ.get('INTEGRATE_SCRATCH', os.path.dirname(os.path.abspath(__file__)))
ref=json.load(open(S+'/ref-idents.json'))
arch=open('docs/ARCHITECTURE.md',encoding='utf-8').read()
archtok=set(re.findall(r'[A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)*',arch))
archparts=set()
for t in archtok: archparts.update(t.split('.')); archparts.add(t)
rx=re.compile(r'[A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)*')
out=collections.defaultdict(list)
for vf in sorted(glob.glob('docs/volumes/V*.md')):
    v=vf.split('/')[-1][:3]
    for i,l in enumerate(open(vf,encoding='utf-8').read().split('\n')):
        for t in rx.findall(l):
            cands={t}|set(t.split('.'))
            for c in cands:
                if c in ref: out[(v,c)].append(i+1)
rows=[]
for (v,c),ls in out.items():
    rows.append((('base' if c in archparts else 'NEW'),c,v,len(ls),ls[:6],','.join(ref[c])))
rows.sort(key=lambda r:(r[0],r[1],r[2]))
with open(S+'/cr-hits.txt','w') as f:
    for r in rows: f.write(f"{r[0]}\t{r[1]}\t{r[2]}\t{r[3]}\t{r[4]}\t{r[5]}\n")
print(len(rows), sum(1 for r in rows if r[0]=='NEW'), len(set(r[1] for r in rows if r[0]=='NEW')))
