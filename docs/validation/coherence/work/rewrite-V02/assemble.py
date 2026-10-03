# assemble.py: parts -> new/volumes/V02-buildings.md with the census filled; then id and reference checks.
import os,re,glob,collections
R='/home/user/maps-architecture/docs/validation/coherence/'
P=R+'work/rewrite-V02/parts/'
txt=''
for f in sorted(os.listdir(P)):
    s=open(P+f).read()
    txt = s.rstrip('\n')+'\n' if not txt else txt+'\n'+s.strip('\n')+'\n'
j=sorted(set(int(x) for x in re.findall(r'^\| J-V2\.(\d+) \|',txt,re.M)))
t=sorted(set(int(x) for x in re.findall(r'\*\*T-V2-(\d+)\b',txt)))
x=sorted(set(int(v) for v in re.findall(r'^\| X(\d+) \|',txt,re.M)))
b=sorted(set(int(v) for v in re.findall(r'^\| BCR-V2-(\d+) \|',txt,re.M)))
cen=(f"decisions J-V2.1 – J-V2.{j[-1]} ({len(j)} rows, J-V2.58, J-V2.73 and J-V2.76 marked); tests T-V2-1 – T-V2-{t[-1]} ({len(t)} bars); "
     f"hand-offs X1 – X{x[-1]}; requests BCR-V2-01 – BCR-V2-{b[-1]:02d}, each applied as its file f item (V02 §10); every `J-V2`, `T-V2` and `X` id cited here is defined here, and every `V02 §` reference resolves.")
txt=txt.replace('{{CENSUS}}',cen)
open(R+'new/volumes/V02-buildings.md','w').write(txt)
s=txt
# ids
jcit=set(int(v) for v in re.findall(r'J-V2\.(\d+)',s)); tcit=set(int(v) for v in re.findall(r'T-V2-(\d+)',s))
xcit=set(int(v) for v in re.findall(r'(?<![-\w])X ?(\d+)\b',s))
assert not (jcit-set(j)), jcit-set(j)
assert not (tcit-set(t)), tcit-set(t)
assert not (xcit-set(x)), xcit-set(x)
assert len(j)==108 and t==list(range(1,58)) and x==list(range(1,34)) and b==list(range(1,43))
# self refs
anch=set(m.group(1) for m in re.finditer(r'^#{2,4} (\d+(?:\.\d+)*[a-d]?)\b',s,re.M))|set(m.group(1) for m in re.finditer(r'\*\*(\d+\.\d+(?:\.\d+)+)\b',s))
bad=[r for r in re.findall(r'V02\s+§(\d+(?:\.\d+)*[a-d]?)',s) if r not in anch]
assert not bad, bad
# other volumes
va={}
for f in glob.glob('/home/user/maps-architecture/docs/volumes/V[01][0-9]-*.md'):
    v=re.search(r'V(\d\d)-',f).group(1); tt=open(f).read(); a=set()
    for m in re.finditer(r'^#{1,5} (?:§)?(\d+[a-z]?(?:\.\d+)*[a-z]?)\b',tt,re.M): a.add(m.group(1))
    for m in re.finditer(r'\*\*(\d+\.\d+(?:\.\d+)*[a-z]?)',tt): a.add(m.group(1))
    va[v]=a
ob=[(v,r) for v,r in re.findall(r'\bV(0[13-9]|1[0-2])\s+§(\d+[a-z]?(?:\.\d+)*[a-z]?)',s) if r not in va[v]]
print('other-volume unresolved',ob)
print(cen); print('words',len(s.split()),'KB',round(len(s.encode())/1024,1))
