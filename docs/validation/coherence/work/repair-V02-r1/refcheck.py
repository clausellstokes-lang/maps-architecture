import re, glob, os
R='/home/user/maps-architecture/'
def secs(text):
    s=set()
    for m in re.finditer(r'^#{1,6}\s+(?:§)?([0-9]+[a-z]?(?:\.[0-9]+[a-z]?)*)\b', text, re.M): s.add(m.group(1))
    for m in re.finditer(r'^\*\*([0-9]+[a-z]?(?:\.[0-9]+[a-z]?)+)\b', text, re.M): s.add(m.group(1))
    for m in re.finditer(r'^#{1,6}\s+(II\.[0-9]+(?:\.[0-9]+)*)', text, re.M): s.add(m.group(1))
    return s
vol={}
for f in glob.glob(R+'docs/volumes/V[01][0-9]-*.md'):
    v=os.path.basename(f)[:3]; t=open(f).read()
    rp=R+'docs/validation/coherence/repair-r1-%s.md'%v
    if os.path.exists(rp): t+= '\n'+open(rp).read()
    vol[v]=secs(t)
vol['V02']=secs(open('V02.new.md').read())
base=open(R+'docs/ARCHITECTURE.md').read()
for f in glob.glob(R+'docs/validation/coherence/repair-r1-*.md'):
    if not re.search(r'repair-r1-V[0-9]',f): base+='\n'+open(f).read()
bs=secs(base)
plus=[l[1:] for l in open('diff.txt').read().split('\n') if l.startswith('+') and not l.startswith('+++')]
txt='\n'.join(plus)
bad=[]; seen=set()
for m in re.finditer(r'(V[01][0-9]) §([0-9]+[a-z]?(?:\.[0-9]+[a-z]?)*)', txt):
    v,s=m.group(1),m.group(2); seen.add((v,s))
    if s not in vol.get(v,set()) and s.split('.')[0] not in ('0',) : bad.append((v,s))
# base refs not preceded by a volume prefix
for m in re.finditer(r'(?<![0-9A-Z] )(?<!V[01][0-9] )§([0-9]+(?:\.[0-9]+)*)', txt):
    s=m.group(1); seen.add(('base',s))
    if s not in bs: bad.append(('base',s))
print('refs checked', len(seen)); print('unresolved', sorted(set(bad)))
