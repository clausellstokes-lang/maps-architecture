import sys
class Ed:
    def __init__(s,path): s.p=path; s.t=open(path).read(); s.bad=0
    def R(s,old,new,n=1):
        c=s.t.count(old)
        if c!=n: print('COUNT',c,'!=',n,'::',old[:150].replace('\n','\\n')); s.bad+=1; return
        s.t=s.t.replace(old,new)
    def save(s):
        open(s.p,'w').write(s.t); print('saved',s.p,'failed',s.bad, 'words',len(s.t.split()))
