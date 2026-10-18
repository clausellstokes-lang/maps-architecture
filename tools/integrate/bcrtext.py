import re,glob,json,os
import os; S=os.environ.get('INTEGRATE_SCRATCH', os.path.dirname(os.path.abspath(__file__)))
idx=json.load(open(S+'/bcr-index.json'))
recs=[]
for f in sorted(glob.glob(S+'/s10-V*.txt')):
    vol=os.path.basename(f)[4:7]
    raw=open(f).read().split('\n')
    lines=[re.sub(r'^\d+: ','',l) for l in raw]
    starts=[i for i,l in enumerate(lines) if re.match(r'\s*(?:[-*] )?\*\*(BCR-[A-Za-z0-9.\-]+)',l)]
    for k,i in enumerate(starts):
        j=starts[k+1] if k+1<len(starts) else len(lines)
        for t in range(i+1,j):
            if lines[t].startswith('### ') or lines[t].startswith('## '): j=t;break
        body='\n'.join(lines[i:j])
        bid=re.match(r'\s*(?:[-*] )?\*\*(BCR-[A-Za-z0-9.\-]+)',lines[i]).group(1)
        key=bid if bid.startswith('BCR-V') else f'{vol}:{bid}'
        # quotes after 'Current' within 300 chars
        cur=[]
        for m in re.finditer(r'[Cc]urrent[^"“]{0,120}["“]([^"”]{30,})["”]',body):
            cur.append(m.group(1))
        recs.append(dict(key=key,vol=vol,line=int(re.match(r'^(\d+):',raw[i]).group(1)),body=body,cur=cur))
json.dump(recs,open(S+'/bcr-recs.json','w'))
# overlap detection
def norm(s): return re.sub(r'\s+',' ',s.replace('`','')).strip()
pairs=[]
for a in range(len(recs)):
    for b in range(a+1,len(recs)):
        A,B=recs[a],recs[b]
        hit=None
        for qa in A['cur']:
            na=norm(qa)
            for qb in B['cur']:
                nb=norm(qb)
                # shared window of 40 chars
                for s in range(0,max(1,len(na)-40),20):
                    w=na[s:s+40]
                    if len(w)==40 and w in nb: hit=w;break
                if hit:break
            if hit:break
        if hit: pairs.append((A['key'],B['key'],hit))
for p in pairs: print(f"{p[0]} ~ {p[1]} :: {p[2]}")
print(len(recs),'recs',len(pairs),'overlaps', sum(1 for r in recs if not r['cur']),'without current-quote')
