#!/usr/bin/env python3
"""Mechanical pass for the V04 coherence rewrite: cite forms, BCR->f item, DR aliases, retired terms, critique tags.
Usage: mech.py START END  (1-based inclusive line range of docs/volumes/V04-underground.md) > out"""
import re, sys
SRC='/home/user/maps-architecture/docs/volumes/V04-underground.md'
BCR={1:205,2:208,3:247,4:212,5:325,6:319,7:330,8:355,9:403,10:413,11:475,12:505,13:526,14:386,15:484,16:452,17:423,
     18:445,19:551,20:559,21:555,22:485,23:556,24:561,25:281,26:562,27:552,28:548,29:554,30:557,31:563,32:248,33:249,
     34:386,35:404,36:560,37:549,38:414,39:306,40:407,41:338,42:558,43:243,44:247,45:244,46:250}
DR={'DR-V1.1':'DR26','DR-SKY':'DR27','DR-V6.1':'DR28','DR-V8.6':'DR28','DR-V8.1':'DR29','DR-V8.2':'DR30','DR-V8.3':'DR31',
    'DR-V8.4':'DR32','DR-V8.5':'DR33','DR-V8.7':'DR34','DR-V8.8':'DR35'}
TAG=r'(?:C4-\d+(?:-\d+)?(?: \x01[0-9a-z]+\x02)?|SLR\d-\d+|SL-\d+|ST-\d+|TR-\d+|TT-\d+|SR\d?-\d+|SCC-[A-Z0-9-]*\d|RV-pc-\d+|LC-\d+(?:\'s class)?|TW-\d+(?: \x01\d+\x02)?|TX-\d+|V4C-\d+|SLR\d-\d+|S23R\d-\d+|V4-C\d+)'
def tx(s):
    a,b=int(sys.argv[1]),int(sys.argv[2])
    return s
def conv(t):
    t=t.replace('first paint','first map')
    t=re.sub(r'`LayerSpec\.showUnexcavated`','the view key `showUnexcavated`',t)
    t=t.replace('LayerSpec.showUnexcavated','the view key `showUnexcavated`')
    for k,v in DR.items(): t=t.replace(k,v)
    t=re.sub(r'(DR\d\d) \(\1\)',r'\1',t)
    t=re.sub(r'(DR\d\d)\'s \(\1\)',r"\1's",t)
    t=re.sub(r'(?<![-\w.])V(\d) §',r'V0\1 §',t)
    t=re.sub(r'(?<![-\w.])V(1[0-2]) §',r'V\1 §',t)
    t=re.sub(r'(?<![-\w.])V(\d)-(\d+(?:\.\d+)*)(?![\w-])',r'V0\1 §\2',t)
    t=re.sub(r'(?<![-\w.])V(1[0-2])-(\d+(?:\.\d+)*)(?![\w-])',r'V\1 §\2',t)
    def bcr(m):
        n=int(m.group(1)); return 'item %d'%BCR[n] if n in BCR else m.group(0)
    t=re.sub(r'(?<![-\w])BCR-(\d+)(?![-\d])',bcr,t)
    t=re.sub(r'(J-V4\.\d+) as amended',r'\1',t)
    # critique tags inside parenthetical lists
    def paren(m):
        inner=m.group(1)
        parts=re.split(r'(;\s+|,\s+)',inner)
        toks=parts[0::2]; seps=parts[1::2]
        keep=[]; 
        for i,tok in enumerate(toks):
            tt=tok.strip()
            tt2=re.sub(r'^(fixes|fixing|closes|and) ','',tt)
            if re.fullmatch(TAG+r'(?:(?: – |–| and |, )'+TAG+r')*',tt2): continue
            if re.fullmatch(r'(?:fixes |fixing )?'+TAG+r'(?: \(\d+\))?',tt): continue
            keep.append((tok, seps[i-1] if i>0 else ''))
        if not keep: return '\x00'
        out=keep[0][0].lstrip() if keep[0][0].startswith(' ') else keep[0][0]
        for tok,sep in keep[1:]: out+=(sep or '; ')+tok
        return '('+out+')'
    t=re.sub(r'\(((?:\d+[a-z]?|[a-z]{1,2}|[ivx]+))\)',lambda m:'\x01'+m.group(1)+'\x02',t)
    t=re.sub(r'\(((?:\d+[a-z]?|[a-z]{1,2}|[ivx]+))\)',lambda m:'\x01'+m.group(1)+'\x02',t)
    for _ in range(3):
        t=re.sub(r'\(([^()]*)\)',paren,t)
    t=re.sub(r'[ \n]?\x00','',t)
    t=t.replace('\x01','(').replace('\x02',')')
    return t
lines=open(SRC).read().split('\n')
a,b=int(sys.argv[1]),int(sys.argv[2])
print(conv('\n'.join(lines[a-1:b])))
