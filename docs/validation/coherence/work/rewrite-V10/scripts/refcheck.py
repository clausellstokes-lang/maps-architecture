import re,json,sys
D=sys.argv[1] if len(sys.argv)>1 else '/tmp/maps-scratch/coherence/V10-draft2.md'
t=open(D).read()
t=re.sub(r'V(\d\d)\n\s*§',r'V\1 §',t)
S=json.load(open('secsets.json'))
sets={k:set(v) for k,v in S.items() if not k.endswith('_src')}
# V10's own sections from the draft
def secs_of(text):
    s=set()
    for l in text.split('\n'):
        m=re.match(r'^#{1,6}\s+(?:§\s?)?(\d+[a-z]?(?:\.\d+[a-z]?)*)\b',l)
        if m: s.add(m.group(1))
        m=re.match(r'^\*\*(\d+(?:\.\d+)+[a-z]?)\s',l)
        if m: s.add(m.group(1))
    for x in list(s):
        p=x.split('.')
        for k in range(1,len(p)): s.add('.'.join(p[:k]))
    return s
sets['V10']=secs_of(t)
# V09 planned new sections
sets['V09'] |= {'3.16','4.21','4.22','7.6'}
# V10 extra numbered subsections like 3.23.1
sets['V10'] |= {'3.23.1','3.23.2','3.23.3'}
SEC=r'(\d+[a-z]?(?:\.\d+[a-z]?)*|II(?:\.\d+)+)'
bad=[]
# Vnn §x
for m in re.finditer(r'\bV(\d\d) §'+SEC,t):
    v='V'+m.group(1); sec=m.group(2)
    if sec not in sets.get(v,set()): bad.append(('vol',v,sec,t.count('\n',0,m.start())+1))
# bare § references not preceded by 'Vnn '
for m in re.finditer(r'(?<!V\d\d )§'+SEC,t):
    sec=m.group(1)
    if sec not in sets['base']: bad.append(('base','',sec,t.count('\n',0,m.start())+1))
# continuation lists: "Vnn §a, §b" where §b is not base-intended
for m in re.finditer(r'\bV(\d\d) §'+SEC+r'(?:\s\([^)]{1,12}\))?((?:,\s|\sand\s|,\sand\s)§'+SEC+')',t):
    v='V'+m.group(1); sec2=m.group(4)
    bad.append(('cont',v,sec2,t.count('\n',0,m.start())+1))
for b in bad: print(b)
print('total',len(bad))
