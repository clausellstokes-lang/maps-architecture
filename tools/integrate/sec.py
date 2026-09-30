import re,sys
# usage: sec.py file secKey  -> prints section (## secKey ...) until next '## '
f,key=sys.argv[1],sys.argv[2]
lines=open(f).read().split('\n')
out=False
for i,l in enumerate(lines):
    if l.startswith('## '):
        m=re.match(r'## (\S+)',l)
        out = (m and m.group(1)==key)
    if out: print(f'{i+1}: {l}' if len(sys.argv)>3 else l)
