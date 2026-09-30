import re,sys,os
# citation form G-cite for V07: own sections -> 'V07 §x'; 'the base's §x' -> '§x'; Vn §x -> V0n §x
OWN2=set(['2.1','2.2','2.2a','2.3','2.4','2.5','2.6','2.7']+['3.%d'%i for i in range(0,17)]+['3.5a','3.8a','3.10a'])
OWNTOP=set([str(i) for i in range(0,14)]+['1b'])
amb=[]
def conv(t,fname):
    t=re.sub(r'(?<![\w\-./])V([1-9])(?= §|-\d|[\'’]s\b| \(|W\d)',lambda m:'V0'+m.group(1),t)
    t=re.sub(r'(?<![\w\-./])V0([1-9])-(\d+(?:\.\d+)+)',r'V0\1 §\2',t)
    # protect 'the base's §x'
    t=re.sub(r"the(\s+)base['’]s(\s+)§",'\x01§',t)
    out=[];pos=0
    pat=re.compile(r'(V\d\d |\x01)?§(\d+[a-z]?(?:\.\d+[a-z]?)*)')
    lastvol=None;lastend=-10
    for m in pat.finditer(t):
        pre,num=m.group(1),m.group(2)
        s=m.start()
        between=t[lastend:s]
        tight = lastvol and re.fullmatch(r'(?:\s*\([^()]{0,20}\))?(?:, | and |–|-|; | or |, and )',between) is not None
        if pre=='\x01':
            rep='§'+num; lastvol='BASE'
        elif pre:
            rep=m.group(0); lastvol=pre.strip() if pre.strip()!='V07' else None
        else:
            depth=num.count('.')
            own = (num in OWN2) or (num in OWNTOP)
            if tight and lastvol=='BASE':
                rep='§'+num
            elif tight and (depth>=2 or not own):
                rep=lastvol+' §'+num
            elif tight and own:
                rep='V07 §'+num; amb.append((fname,t[max(0,s-80):s+20].replace('\n',' ')))
            elif own:
                rep='V07 §'+num; lastvol=None
            else:
                rep='§'+num; lastvol=None
        out.append(t[pos:s]); out.append(rep); pos=m.end(); lastend=m.end()
    out.append(t[pos:]); t=''.join(out)
    t=t.replace('\x01','the base\'s §')
    return t
src,dst=sys.argv[1],sys.argv[2]
os.makedirs(dst,exist_ok=True)
for f in sorted(os.listdir(src)):
    t=open(os.path.join(src,f)).read()
    open(os.path.join(dst,f),'w').write(conv(t,f))
with open(os.path.join(dst,'..','ambiguous.txt'),'w') as g:
    for a in amb: g.write(a[0]+' :: '+a[1]+'\n')
print(len(amb),'ambiguous')
