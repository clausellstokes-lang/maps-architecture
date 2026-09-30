import re,json,sys
from collections import Counter
S=json.load(open('/home/user/maps-architecture/docs/validation/coherence/work/rewrite-V09/secsets.json'))
sets={k:set(v) for k,v in S.items() if not k.endswith('_src')}
P=sys.argv[1] if len(sys.argv)>1 else '/home/user/maps-architecture/docs/validation/coherence/new/volumes/V09-application.md'
t=open(P).read()
def ln(pos): return t.count('\n',0,pos)+1
SEC=r'(\d+[a-z]?(?:\.\d+[a-z]?)*)'
bad=[]
for m in re.finditer(r'\bV(\d{1,2})\s+§\s?'+SEC,t):
    v='V%02d'%int(m.group(1)); s=m.group(2).rstrip('.')
    if len(m.group(1))!=2: bad.append((ln(m.start()),'short-vol',m.group(0)))
    elif v not in sets: bad.append((ln(m.start()),'no-vol',m.group(0)))
    elif s not in sets[v]: bad.append((ln(m.start()),'unresolved',m.group(0).replace('\n',' ')))
for m in re.finditer(r'§\s?'+SEC,t):
    pre=t[max(0,m.start()-14):m.start()]
    if re.search(r'V\d{1,2}\s+$',pre): continue
    s=m.group(1).rstrip('.')
    if s not in sets['base']:
        bad.append((ln(m.start()),'bare-not-base',t[max(0,m.start()-30):m.end()+5].replace('\n',' ')))
for m in re.finditer(r'\bV\d\s+§',t): bad.append((ln(m.start()),'old-form',m.group(0)))
for m in re.finditer(r'\bII\.(\d+(?:\.\d+)*)',t):
    if 'II.'+m.group(1) not in sets['base'] and m.group(1).split('.')[0] not in ('1','2','3','4','5','6','7','8'): bad.append((ln(m.start()),'II',m.group(0)))
print(Counter(b[1] for b in bad))
for b in bad[:80]: print('%d\t%s\t%s'%b)
