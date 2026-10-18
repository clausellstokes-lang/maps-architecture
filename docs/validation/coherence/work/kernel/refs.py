import re,json,os,glob,collections
ROOT='/Users/cstokes/Desktop/Maps'
A=open(f'{ROOT}/docs/ARCHITECTURE.md',encoding='utf-8').read()
L=A.split('\n')
s=L.index([l for l in L if l.startswith('## §3 ')][0]); e=s+1
while not (L[e].startswith('## ') or L[e].startswith('# ')): e+=1
S3=L[s:e]
heads=[l for l in L if re.match(r'^#{1,4} ',l)]
secnums=set()
for h in heads:
    m=re.match(r'^#{2,4} (§?)([0-9]+(\.[0-9]+)*|II\.[0-9]+(\.[0-9]+)*)',h)
    if m: secnums.add(m.group(2))
# subsection headings in each section
def sub_of(n):
    return n
refs=collections.defaultdict(list)
for i,l in enumerate(S3):
    ln=s+i+1
    for m in re.finditer(r'§\s?([0-9]+(?:\.[0-9]+)?)',l): refs[('sec',m.group(1))].append(ln)
    for m in re.finditer(r'\bII\.([0-9]+(?:\.[0-9]+)?)',l): refs[('secII','II.'+m.group(1))].append(ln)
    for m in re.finditer(r'\b(J-[A-Za-z]+[0-9]*(?:[.-][0-9A-Za-z]+)*)',l): refs[('J',m.group(1).rstrip('.'))].append(ln)
    for m in re.finditer(r'\b(D-[0-9]+)\b',l): refs[('D',m.group(1))].append(ln)
    for m in re.finditer(r'\bitem (\d+)( \([a-z]\))?',l): refs[('item',m.group(1)+(m.group(2) or ''))].append(ln)
    for m in re.finditer(r'\b((?:GEO|SCL|LC|DEF|COV-VG-[A-Z]+|COV-VG-VN|G-R|G-P|NG RA|VIS|N)-[0-9]+)\b',l): refs[('finding',m.group(1))].append(ln)
    for m in re.finditer(r'\b(B-[A-Z][A-Za-z-]+)\b',l): refs[('bench',m.group(1))].append(ln)
    for m in re.finditer(r'\b(M[0-9][a-z]?)\b',l): refs[('milestone',m.group(1))].append(ln)
    for m in re.finditer(r'\b(F-[A-Z]+)\b',l): refs[('ladder',m.group(1))].append(ln)
    for m in re.finditer(r'\b(T-[A-Z0-9][A-Za-z0-9.-]*)',l): refs[('test',m.group(1))].append(ln)
    for m in re.finditer(r'`?((?:docs/)?[A-Za-z0-9_./-]+\.(?:out|py|md))`?',l): refs[('file',m.group(1))].append(ln)
    for m in re.finditer(r'\b(V(?:0[1-9]|1[0-2]))\b',l): refs[('vol',m.group(1))].append(ln)
out=[]
for (k,v),lns in sorted(refs.items()):
    out.append(dict(kind=k,ref=v,lines=sorted(set(lns))))
json.dump(dict(secnums=sorted(secnums),refs=out),open('/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/c0d81c15-f08e-4364-97ca-c6b05aa13811/scratchpad/coherence/kernel/refs.json','w'),indent=0)
c=collections.Counter(r['kind'] for r in out); print(c)
