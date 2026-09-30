import sys,json
# usage: rep.py file edits.json   edits: [[old,new],...] each old must occur exactly once (or [old,new,count])
f=sys.argv[1]; t=open(f).read()
E=json.load(open(sys.argv[2]))
bad=0
for e in E:
    old,new=e[0],e[1]; n=e[2] if len(e)>2 else 1
    c=t.count(old)
    if c!=n:
        print('COUNT',c,'!=',n,':',old[:120]); bad+=1; continue
    t=t.replace(old,new)
open(f,'w').write(t)
print('ok' if not bad else f'{bad} failed')
