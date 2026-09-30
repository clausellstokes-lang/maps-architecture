import re,sys,json
p=sys.argv[1]; L=open(p).read().split('\n')
heads=[(i,l) for i,l in enumerate(L) if re.match(r'^#{1,2} ',l)]
out=[]
for k,(i,l) in enumerate(heads):
    j=heads[k+1][0] if k+1<len(heads) else len(L)
    w=sum(len(x.split()) for x in L[i:j])
    out.append((i+1,j,w,l[:70]))
pre=sum(len(x.split()) for x in L[:heads[0][0]]) if heads else 0
for o in out: print(o)
print('total',sum(len(x.split()) for x in L))
