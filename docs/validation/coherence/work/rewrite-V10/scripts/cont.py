import re,json,sys,os
H=os.path.dirname(os.path.abspath(__file__)); W=os.path.join(H,'..')
S=json.load(open(os.path.join(W,'secsets.json')))
SETS={k:set(v) for k,v in S.items() if not k.endswith('_src')}
SETS['V09']|={'3.16','4.21','4.22','7.6'}
SEC=r'(?:\d+[a-z]?(?:\.\d+[a-z]?)*|II(?:\.\d+)+)'
def secs_of(text):
    s=set()
    for l in text.split('\n'):
        m=re.match(r'^#{1,6}\s+(?:§\s?)?(\d+[a-z]?(?:\.\d+[a-z]?)*)\b',l)
        if m: s.add(m.group(1))
    for x in list(s):
        p=x.split('.')
        for k in range(1,len(p)): s.add('.'.join(p[:k]))
    return s
def conv(t):
    SETS['V10']=secs_of(open('/tmp/maps-scratch/coherence/V10-draft2.md').read())|{'3.23.1','3.23.2','3.23.3'}
    pat=re.compile(r'(V(\d\d)\s+§'+SEC+r'(?:\s(?:\((?:[a-z0-9]{1,3}|[a-z0-9]{1,3}′)\)|step \d|[A-Za-z\'’ ]{0,12}?table|\*[^*]{1,40}\*))*(?:(?:,\s|\sand\s|,\sand\s)(?:V\2\s)?§'+SEC+r'(?:\s(?:\([a-z0-9]{1,3}\)|step \d))*)*)((?:,\s|\sand\s|,\sand\s))§('+SEC+r')\b')
    def rep(m):
        v='V'+m.group(2); sec=m.group(4)
        if sec in SETS.get(v,set()): return m.group(1)+m.group(3)+v+' §'+sec
        return m.group(0)
    for _ in range(10):
        t2=pat.sub(rep,t)
        if t2==t: break
        t=t2
    return t
for fn in sys.argv[1:]:
    x=open(fn).read(); y=conv(x)
    if x!=y: open(fn,'w').write(y); print('changed',fn)
