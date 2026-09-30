#!/usr/bin/env python3
"""patch.py FILE PATCHES.py — apply (old, new) pairs; old matched whitespace-insensitively, exactly once."""
import re, sys
f=sys.argv[1]; s=open(f).read()
ns={}; exec(open(sys.argv[2]).read(), ns)
bad=0
for i,(old,new) in enumerate(ns['P']):
    pat=r'\s+'.join(re.escape(w) for w in old.split())
    m=list(re.finditer(pat,s))
    if len(m)!=1:
        print('PATCH %d: %d matches: %s'%(i,len(m),old[:80])); bad+=1; continue
    s=s[:m[0].start()]+new+s[m[0].end():]
open(f,'w').write(s)
print('applied', len(ns['P'])-bad, 'of', len(ns['P']))
