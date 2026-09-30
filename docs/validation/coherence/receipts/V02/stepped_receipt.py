# Receipt for V2 §3.10.3's stepped rows (revise-V2 second round, V2C-49 (6)); beside revise-v2/medians.py.
# Closed forms of V2 §3.15.1 as revised: ST0 (Wmin, Dmin, Amin with the front terraces), ST2/ST3 (rect stacks),
# the summit offset, the tiered tower's fit in its tower-family budget, and a Monte-Carlo estimate of tiersTruncated
# on claim-sized hints (the T-V2-46 bar). Constants: tierMinSideM 3, landingM 1, stairClearM .3, plinth .3 m;
# storeys 3.2 / 3.0 m for storeyed tiers (V11 HeightsRow values vary; palace and tower rows only).
import random, math
random.seed(1)
TMIN,LAND,CLEAR,PL=3.0,1.0,0.3,0.3
ANC=['p','m','pr','r']
def lin(a):  # a cell given as one pair or four pairs
    return a if isinstance(a,list) else [a]*4
R={
 'stepped-temple':dict(count=[(3,4),(4,5),(4,6),(5,7)],inset=[(1.5,2.5),(1.5,2.5),(2,3),(2,3.5)],solid=[(3,4),(3.5,4.5),(4,5),(4.5,6)],taper=.9,grade=(1.0,1.2),stairs='axial',sw=[(2.5,4),(3,5),(4,6),(5,8)],aspect=(.72,.82)),
 'stepped-monument':dict(count=[(3,5),(4,6),(5,7),(6,8)],inset=(1.5,3),solid=(3,5),taper=.9,grade=(.9,.9),stairs='axial',sw=(3,6),aspect=(.68,.78)),
 'terraced-palace':dict(count=[(2,3),(2,3),(3,4),(3,5)],inset=[(3,5),(3,6),(4,7),(5,8)],floors=[(1,2),(1,2),(2,2),(2,3)],taper=1,grade=(.6,.6),stairs='flights',sw=[(2,3),(2,3),(2.5,4),(3,5)],aspect=(1.3,2)),
 'tiered-tower':dict(count=[(3,3),(3,4),(3,5),(4,6)],inset=[(.3,.5),(.3,.6),(.4,.7),(.4,.8)],floors=(1,1),taper=.92,grade=(1,1),stairs='internal',sw=(0,0),aspect=(1,1)),
}
def heights(Rw,a,n,pick):
    if 'solid' in Rw: h0=pick(lin(Rw['solid'])[a])
    else:
        f=pick(lin(Rw['floors'])[a]); h0=3.2+(f-1)*3.0
    return [h0*Rw['taper']**k for k in range(n)]
def fronts(Rw,hs,d,g,sw):
    n=len(hs)
    if Rw['stairs']=='axial': return (hs[0]+PL)/g,[max(d,hs[k]/g+LAND) for k in range(1,n)]
    if Rw['stairs']=='flights': return sw+CLEAR,[max(d,sw+CLEAR) for k in range(1,n)]
    return 0.0,[d]*(n-1)
def st0(Rw,a):  # least draws; g at its steepest (the least run)
    n0=lin(Rw['count'])[a][0]; d0=lin(Rw['inset'])[a][0]; g=Rw['grade'][1]; sw0=lin(Rw['sw'])[a][0]
    hs=heights(Rw,a,n0,lambda p:p[0]); r0,f=fronts(Rw,hs,d0,g,sw0)
    Wmin=TMIN+2*(n0-1)*d0; Dmin=r0+sum(f)+(n0-1)*d0+TMIN
    return Wmin,Dmin,Wmin*(Dmin-r0)+sw0*r0
def median(Rw,a):
    c=lin(Rw['count'])[a]; n=math.floor((c[0]+c[1])/2+.5); d=sum(lin(Rw['inset'])[a])/2; g=sum(Rw['grade'])/2; sw=sum(lin(Rw['sw'])[a])/2
    hs=heights(Rw,a,n,lambda p:(p[0]+p[1])/2); r,f=fronts(Rw,hs,d,g,sw)
    W=TMIN+2*(n-1)*d; Dt=sum(f)+(n-1)*d+TMIN
    return dict(n=n,d=d,g=g,r=round(r,1),W=round(W,1),D=round(Dt,1),ideal_aspect=round(W/Dt,3),A=round(W*Dt+sw*r),offset=round((sum(f)-(n-1)*d)/2,1)), (W,Dt,r,sw)
def laid(Rw,a,Wr,Dr,claimHi,draw=True):
    pick=(lambda p:random.uniform(*p)) if draw else (lambda p:(p[0]+p[1])/2)
    c=lin(Rw['count'])[a]; n=random.randint(*c) if draw else round(sum(c)/2)
    d=pick(lin(Rw['inset'])[a]); asp=pick(Rw['aspect']); g=pick(Rw['grade']); sw=pick(lin(Rw['sw'])[a])
    hs=heights(Rw,a,n,pick); r,f=fronts(Rw,hs,d,g,sw)
    hi=claimHi*Wr*Dr
    def lay(scale):
        W0=min(Wr,asp*(Dr-r))*scale; D0=min(Dr-r,W0/asp); return W0,D0
    W0,D0=lay(1.0); A_t=W0*D0; A_s=sw*r
    if A_t+A_s>1.1*hi:
        s=math.sqrt(max(hi-A_s,1e-9)/A_t); W0,D0=lay(s)
    k=1; W,D=W0,D0
    while k<n:
        W2=W-2*d; D2=D-d-f[k-1]
        if min(W2,D2)<TMIN: break
        W,D=W2,D2; k+=1
    return n,k
print('== ST0 (least draws, steepest grade) and the median stack')
for name,Rw in R.items():
    for a,anc in enumerate(ANC):
        Wmin,Dmin,Amin=st0(Rw,a); m,_=median(Rw,a)
        print(f'{name:17s} {anc:2s} ST0 Wmin {Wmin:5.1f} Dmin {Dmin:5.1f} Amin {Amin:6.0f} | median {m}')
print('== tiered tower: the median stack against the tower-family budget (V2 §3.10.3: 34/42/60/85 m2)')
for a,anc in enumerate(ANC):
    Rw=R['tiered-tower']; m,(W,Dt,r,sw)=median(Rw,a); b=[34,42,60,85][a]
    print(f'{anc}: median n={m["n"]} d={m["d"]} needs {W:.1f} x {Dt:.1f} = {W*Dt:.0f} m2 vs budget {b} (fits: {W*Dt<=1.1*b})')
print('== tiersTruncated, Monte-Carlo, N=2000 per anchor, on claim-sized hints: area = median A / 0.475, shape of the median stack (+ reserve)')
for name in ['stepped-temple','terraced-palace','stepped-monument']:
    Rw=R[name]
    for a,anc in enumerate(ANC):
        m,(W,Dt,r,sw)=median(Rw,a); A=W*Dt+sw*r; s=math.sqrt((A/0.475)/(W*(Dt+r)))
        Wr,Dr=W*s,(Dt+r)*s; tr=0; N=2000
        for i in range(N):
            n,k=laid(Rw,a,Wr,Dr,0.6)
            tr+= k<n
        print(f'{name:17s} {anc:2s} hint {Wr:5.1f} x {Dr:5.1f} m ({Wr*Dr:6.0f} m2): truncated {100*tr/N:5.1f} %')
