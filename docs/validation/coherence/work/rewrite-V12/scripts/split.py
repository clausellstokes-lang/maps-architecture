import re,os
src='/home/user/maps-architecture/docs/volumes/V12-calibration.md'
L=open(src).read().split('\n')
out='src'
os.makedirs(out,exist_ok=True)
for f in os.listdir(out): os.remove(os.path.join(out,f))
starts=[]
for i,l in enumerate(L):
    if re.match(r'^#{1,3} ',l): starts.append(i)
starts.append(len(L))
for a,b in zip(starts,starts[1:]):
    h=L[a]
    m=re.match(r'^#{1,3}\s+(\S+)',h)
    key=m.group(1) if m else 'x'
    key=re.sub(r'[^\w.\-]','',key)[:20]
    open(os.path.join(out,'%05d_%s.md'%(a+1,key)),'w').write('\n'.join(L[a:b])+'\n')
print(len(starts)-1)
