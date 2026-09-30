import re,glob,json,os
import os; S=os.environ.get('INTEGRATE_SCRATCH', os.path.dirname(os.path.abspath(__file__)))
arch=open('/Users/cstokes/Desktop/Maps/docs/ARCHITECTURE.md').read().split('\n')
heads=[l for l in arch if re.match(r'#{2,4} ',l)]
def norm(h): return re.sub(r'\s+',' ',h.strip())
headset={norm(h):h for h in heads}
# short keys: '### 2.7' -> full
short={}
for h in heads:
    m=re.match(r'(#{2,4}) (\S+)',h)
    if m: short.setdefault(m.group(2),[]).append(h)
res=[]
for f in sorted(glob.glob(S+'/s10-V*.txt')):
    vol=os.path.basename(f)[4:7]
    txt=open(f).read().split('\n')
    lines=[re.sub(r'^\d+: ','',l) for l in txt]
    lnos=[int(re.match(r'^(\d+):',l).group(1)) if re.match(r'^\d+:',l) else 0 for l in txt]
    # find BCR starts
    starts=[]
    for i,l in enumerate(lines):
        m=re.match(r'\s*(?:[-*] )?\*\*(BCR-[A-Za-z0-9.\-]+)\s*[—–-]',l) or re.match(r'\s*(?:[-*] )?\*\*(BCR-[A-Za-z0-9.\-]+)\b',l)
        if m: starts.append((i,m.group(1)))
    prevhead=None
    for k,(i,bid) in enumerate(starts):
        j=starts[k+1][0] if k+1<len(starts) else len(lines)
        # stop at next '### ' heading too
        for t in range(i+1,j):
            if lines[t].startswith('### ') or lines[t].startswith('## '): j=t;break
        body='\n'.join(lines[i:j])
        title=re.match(r'\s*(?:[-*] )?\*\*([^*]+)\*\*',lines[i])
        title=title.group(1) if title else lines[i][:100]
        # headings cited in backticks
        cited=re.findall(r'`(#{2,4} [^`]+)`',body)
        secs=[]
        for c in cited:
            m=re.match(r'(#{2,4}) (\S+)',c)
            key=m.group(2) if m else c
            if key not in secs: secs.append(key)
        same=bool(re.search(r'Same heading|Heading as|heading as',body[:600]))
        if not secs and same and prevhead: secs=[prevhead+'*']
        if secs: prevhead=secs[0].rstrip('*')
        res.append(dict(vol=vol,id=bid,title=title[:160],secs=secs,line=lnos[i],nbytes=len(body)))
json.dump(res,open(S+'/bcr-index.json','w'),indent=0)
from collections import defaultdict
g=defaultdict(list)
for r in res:
    for s in (r['secs'] or ['?']): g[s.rstrip("*")].append(r["id"] if r["id"].startswith("BCR-V") else r["vol"]+":"+r["id"])
print(len(res),'BCRs')
for s in sorted(g,key=lambda x:(-len(g[x]),x)):
    print(f"{s:12} {len(g[s]):3}  {' '.join(g[s])}")
