import re,os,json,glob
R='/home/user/maps-architecture/docs'
N=R+'/validation/coherence/new'
def secs_of(text):
    s=set()
    for l in text.split('\n'):
        m=re.match(r'^#{1,6}\s+(?:§\s?)?(\d+[a-z]?(?:\.\d+[a-z]?)*|[IVX]+(?:\.\d+)*)\b',l)
        if m: s.add(m.group(1))
        m=re.match(r'^\*\*(\d+(?:\.\d+)+[a-z]?)\s',l)
        if m: s.add(m.group(1))
        m=re.match(r'^#{1,6}\s+(?:Part|PART)\s+([IVX]+)',l)
        if m: s.add(m.group(1))
    # add prefixes
    for x in list(s):
        p=x.split('.')
        for k in range(1,len(p)): s.add('.'.join(p[:k]))
    return s
out={}
base=''
for f in sorted(glob.glob(N+'/base/*/*.md')): base+=open(f).read()+'\n'
out['base']=sorted(secs_of(base))
for n in range(1,13):
    v='V%02d'%n
    fs=glob.glob(N+'/volumes/%s-*.md'%v) or glob.glob(R+'/volumes/%s-*.md'%v)
    out[v]=sorted(secs_of(open(fs[0]).read())); out[v+'_src']=fs[0]
json.dump(out,open('secsets.json','w'),indent=0)
for k in out:
    if not k.endswith('_src'): print(k,len(out[k]), out[k][:12] if k!='base' else [x for x in out[k] if x.startswith('7.') or x.startswith('11')][:30])
    else: print(k,out[k])
