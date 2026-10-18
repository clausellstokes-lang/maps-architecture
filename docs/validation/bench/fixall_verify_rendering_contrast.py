import math
def srgb2lab(h):
    h=h.lstrip('#'); r,g,b=[int(h[i:i+2],16)/255 for i in (0,2,4)]
    def lin(c): return c/12.92 if c<=0.04045 else ((c+0.055)/1.055)**2.4
    r,g,b=lin(r),lin(g),lin(b)
    X=0.4124564*r+0.3575761*g+0.1804375*b
    Y=0.2126729*r+0.7151522*g+0.0721750*b
    Z=0.0193339*r+0.1191920*g+0.9503041*b
    Xn,Yn,Zn=0.95047,1.0,1.08883
    def f(t): return t**(1/3) if t>216/24389 else (24389/27*t+16)/116
    fx,fy,fz=f(X/Xn),f(Y/Yn),f(Z/Zn)
    return (116*fy-16, 500*(fx-fy), 200*(fy-fz))
def de2000(l1,l2):
    L1,a1,b1=l1;L2,a2,b2=l2
    C1=math.hypot(a1,b1);C2=math.hypot(a2,b2);Cb=(C1+C2)/2
    G=0.5*(1-math.sqrt(Cb**7/(Cb**7+25**7)))
    a1p=(1+G)*a1;a2p=(1+G)*a2
    C1p=math.hypot(a1p,b1);C2p=math.hypot(a2p,b2)
    h1p=math.degrees(math.atan2(b1,a1p))%360;h2p=math.degrees(math.atan2(b2,a2p))%360
    dLp=L2-L1;dCp=C2p-C1p
    if C1p*C2p==0: dhp=0
    else:
        dhp=h2p-h1p
        if dhp>180: dhp-=360
        elif dhp<-180: dhp+=360
    dHp=2*math.sqrt(C1p*C2p)*math.sin(math.radians(dhp/2))
    Lbp=(L1+L2)/2;Cbp=(C1p+C2p)/2
    if C1p*C2p==0: hbp=h1p+h2p
    else:
        if abs(h1p-h2p)<=180: hbp=(h1p+h2p)/2
        elif h1p+h2p<360: hbp=(h1p+h2p+360)/2
        else: hbp=(h1p+h2p-360)/2
    T=1-0.17*math.cos(math.radians(hbp-30))+0.24*math.cos(math.radians(2*hbp))+0.32*math.cos(math.radians(3*hbp+6))-0.20*math.cos(math.radians(4*hbp-63))
    dth=30*math.exp(-((hbp-275)/25)**2)
    Rc=2*math.sqrt(Cbp**7/(Cbp**7+25**7))
    Sl=1+0.015*(Lbp-50)**2/math.sqrt(20+(Lbp-50)**2)
    Sc=1+0.045*Cbp;Sh=1+0.015*Cbp*T
    Rt=-math.sin(math.radians(2*dth))*Rc
    return math.sqrt((dLp/Sl)**2+(dCp/Sc)**2+(dHp/Sh)**2+Rt*(dCp/Sc)*(dHp/Sh))
fam={
'ink':dict(paper='#F6EDDE',road='#F6EDDE',ground='#DED0BB',court='#ECE0C6',building='#A49689',ink='#292522',wall='#34302B',water='#AABBC5',green='#BCC8AB',garden='#C7CCAF',tree='#7E907A',field='#ECDFBD',verge='#D9DCC5'),
'lit':dict(paper='#DED6CC',road='#D8D0C8',ground='#CBB9A2',court='#D1C5B2',building='#AD8A72',ink='#46392F',wall='#857A6E',water='#6D9CB9',green='#9AB37F',garden='#8EA96D',tree='#5B7A4F',field='#D8BE89',verge='#ADBB95'),
'hatched':dict(paper='#D4CABF',road='#B6A99B',ground='#D4CABF',court='#B7B898',building='#9D7D68',ink='#322B25',wall='#685C51',water='#98AFBB',green='#B0B48C',garden='#A8AF83',tree='#798C67',field='#E5D6B5',verge='#BBBEA1'),
}
pairs=[('road','ground',6,5),('ground','building',12,12),('road','building',15,15),('garden','building',10,0),('green','building',10,0),('tree','water',10,0),('green','road',8,0),('tree','green',8,0),('water','road',8,0),('water','ground',8,0),('wall','water',20,0),('field','road',4,0),('field','ground',4,0),('court','road',4,0),('court','ground',3,0),('ink','road',40,50),('ink','ground',40,50)]
for f,p in fam.items():
    lab={k:srgb2lab(v) for k,v in p.items()}
    print('==',f)
    for a,b,de,dl in pairs:
        d=de2000(lab[a],lab[b]);l=abs(lab[a][0]-lab[b][0])
        ok = d>=de and l>=dl
        print(f"{a:8s}/{b:8s} dE={d:5.1f} (>={de}) dL={l:5.1f} (>={dl}) {'OK' if ok else 'FAIL'}")
    ch={k:math.hypot(v[1],v[2]) for k,v in lab.items()}
    print(' max chroma', max(ch.items(),key=lambda x:x[1]))
    print(' halo check ink vs roles (floor dE40, dL50):')
    for r in ['building','tree','water','green','garden','field','court','verge','wall','paper','road','ground']:
        d=de2000(lab['ink'],lab[r]);l=abs(lab['ink'][0]-lab[r][0])
        print(f"   ink/{r:8s} dE={d:5.1f} dL={l:5.1f} {'OK' if d>=40 and l>=50 else 'FAIL'}")
