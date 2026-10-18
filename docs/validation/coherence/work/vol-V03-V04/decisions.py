#!/usr/bin/env python3
# usage: decisions.py VOL file prefix start end  -> emits I| lines for each decision row, stdout
import sys,re
vol,path,prefix,a,b=sys.argv[1],sys.argv[2],sys.argv[3],int(sys.argv[4]),int(sys.argv[5])
L=open(path,encoding='utf-8').read().split('\n')
heads=[]
for i,l in enumerate(L):
    m=re.match(r'^(#{2,4}) (\S+)',l)
    if m: heads.append((i,m.group(2)))
def sec(i):
    h='0'
    for j,t in heads:
        if j<=i: h=t
        else: break
    return h
pat=re.compile(r'^\|\s*('+re.escape(prefix)+r'\d+)\s*\|\s*(.*?)\s*\|\s*$')
out=[]
for i in range(a-1,b):
    m=pat.match(L[i])
    if not m: continue
    jid,txt=m.group(1),m.group(2)
    txt=re.sub(r'\s+',' ',txt).replace('|','/')
    short=txt if len(txt)<=420 else txt[:417]+'...'
    rx=re.compile(r'(?<![\w.])'+re.escape(jid)+r'(?![\d])')
    cites=[]
    for k,l in enumerate(L):
        if a-1<=k<b: continue
        if rx.search(l):
            s=sec(k)
            if s not in cites: cites.append(s)
    used=';'.join(f'{vol}-{c}' for c in cites) or 'none'
    out.append(f'I|{vol}|decision|9|{vol} ({jid})|{jid}: {short}|{vol}-9|{used}|{jid}')
print('\n'.join(out))
