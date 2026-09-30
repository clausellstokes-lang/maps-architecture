# ed.py: extract a line range of cleaned.md into a part, or apply exact replacements to a part.
# usage: python3 ed.py extract START END part.md   |   python3 ed.py apply part.md edits.py
import sys,runpy
W='/Users/cstokes/Desktop/Maps/docs/validation/coherence/work/rewrite-V02/'
if sys.argv[1]=='extract':
    a,b=int(sys.argv[2]),int(sys.argv[3])
    L=open(W+'cleaned.md').read().split('\n')
    open(W+'parts/'+sys.argv[4],'w').write('\n'+'\n'.join(L[a-1:b])+'\n')
    print('extracted',b-a+1,'lines')
elif sys.argv[1]=='apply':
    p=W+'parts/'+sys.argv[2]
    s=open(p).read()
    E=runpy.run_path(sys.argv[3])['E']
    bad=0
    for i,(o,n) in enumerate(E):
        c=s.count(o)
        if c!=1:
            print('EDIT',i,'count',c,':',o[:90]); bad+=1; continue
        s=s.replace(o,n)
    if bad: print('NOT WRITTEN, fix edits'); sys.exit(1)
    open(p,'w').write(s); print('applied',len(E),'edits; words',len(s.split()))
