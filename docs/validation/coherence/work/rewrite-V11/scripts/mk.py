import sys,os,glob
W='/home/user/maps-architecture/docs/validation/coherence/work/rewrite-V11'
part=sys.argv[1]; keys=sys.argv[2:]
out=os.path.join(W,'parts',part+'.md')
if os.path.exists(out) and os.environ.get('FORCE')!='1': print('exists',out); sys.exit(0)
t=''
for k in keys:
    fs=sorted(glob.glob(os.path.join(W,'cl','*_%s.md'%k)))
    assert len(fs)==1,(k,fs)
    t+=open(fs[0]).read()
open(out,'w').write(t); print('made',out,len(t.split()))
