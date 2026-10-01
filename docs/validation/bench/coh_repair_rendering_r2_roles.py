#!/usr/bin/env python3
"""coh_repair_rendering_r2_roles — places g items 120, 122 and 124's new style roles by rule and checks their pairs.
Rules (repair-r2-rendering, §8.2's role table):
  find.1 … find.8   eight hues at CIELCh h = 25 + 45 k (k = 0…7), L* 50, chroma = min(family cap, the largest in sRGB gamut);
                    caps: ink 34, lit and hatched 60 (the leaf rule's caps)
  crisis.army.a … .d four hues h = 20, 110, 200, 290 at L* 44, same caps (a coalition's camps and banners)
  crisis.mark       h = 30 (a red), L* 42, same caps (the marked door's cross)
  crisis.tent       plank lerped 50 % toward paper (linear light)
  crisis.ash        ink lerped 55 % toward ground (linear light): burned ground, the ruined tone
  fog               paper lerped 35 % toward ambience (linear light)
Checks printed: every new role against paper, road and ground (ΔE2000), find.* pairwise minimum, crisis.army.* pairwise minimum."""
import math
def srgb2lin(c): c/=255; return c/12.92 if c<=0.04045 else ((c+0.055)/1.055)**2.4
def lin2srgb(v):
    v=max(0.0,min(1.0,v)); s=12.92*v if v<=0.0031308 else 1.055*v**(1/2.4)-0.055
    return round(s*255)
def hex2rgb(h): h=h.lstrip('#'); return tuple(int(h[i:i+2],16) for i in (0,2,4))
def rgb2hex(r): return '#%02X%02X%02X'%r
M=[[0.4124564,0.3575761,0.1804375],[0.2126729,0.7151522,0.0721750],[0.0193339,0.1191920,0.9503041]]
Mi=[[3.2404542,-1.5371385,-0.4985314],[-0.9692660,1.8760108,0.0415560],[0.0556434,-0.2040259,1.0572252]]
Wn=(0.95047,1.0,1.08883)
def f(t): return t**(1/3) if t>216/24389 else (24389/27*t+16)/116
def fi(t): return t**3 if t**3>216/24389 else (116*t-16)/(24389/27)
def rgb2lab(rgb):
    l=[srgb2lin(c) for c in rgb]; X=[sum(M[i][j]*l[j] for j in range(3)) for i in range(3)]
    fx,fy,fz=(f(X[i]/Wn[i]) for i in range(3)); return (116*fy-16,500*(fx-fy),200*(fy-fz))
def lab2lin(L,a,b):
    fy=(L+16)/116; fx=fy+a/500; fz=fy-b/200
    X=(fi(fx)*Wn[0],fi(fy)*Wn[1],fi(fz)*Wn[2]); return [sum(Mi[i][j]*X[j] for j in range(3)) for i in range(3)]
def ingamut(L,a,b): return all(-1e-6<=v<=1+1e-6 for v in lab2lin(L,a,b))
def lch2rgb(L,C,h):
    a=C*math.cos(math.radians(h)); b=C*math.sin(math.radians(h)); return tuple(lin2srgb(v) for v in lab2lin(L,a,b))
def place(L,h,cap):
    C=cap
    while C>0 and not ingamut(L,C*math.cos(math.radians(h)),C*math.sin(math.radians(h))): C-=0.25
    return lch2rgb(L,C,h),C
def de2000(l1,l2):
    L1,a1,b1=l1;L2,a2,b2=l2;C1=math.hypot(a1,b1);C2=math.hypot(a2,b2);Cb=(C1+C2)/2
    G=0.5*(1-math.sqrt(Cb**7/(Cb**7+25**7)));a1p=(1+G)*a1;a2p=(1+G)*a2
    C1p=math.hypot(a1p,b1);C2p=math.hypot(a2p,b2)
    h1p=math.degrees(math.atan2(b1,a1p))%360;h2p=math.degrees(math.atan2(b2,a2p))%360
    dL=L2-L1;dC=C2p-C1p
    if C1p*C2p==0: dh=0
    else:
        dh=h2p-h1p
        if dh>180: dh-=360
        elif dh<-180: dh+=360
    dH=2*math.sqrt(C1p*C2p)*math.sin(math.radians(dh/2))
    Lb=(L1+L2)/2;Cbp=(C1p+C2p)/2
    if C1p*C2p==0: hb=h1p+h2p
    else:
        hb=(h1p+h2p)/2 if abs(h1p-h2p)<=180 else ((h1p+h2p+360)/2 if h1p+h2p<360 else (h1p+h2p-360)/2)
    T=1-0.17*math.cos(math.radians(hb-30))+0.24*math.cos(math.radians(2*hb))+0.32*math.cos(math.radians(3*hb+6))-0.20*math.cos(math.radians(4*hb-63))
    dth=30*math.exp(-((hb-275)/25)**2);RC=2*math.sqrt(Cbp**7/(Cbp**7+25**7))
    SL=1+0.015*(Lb-50)**2/math.sqrt(20+(Lb-50)**2);SC=1+0.045*Cbp;SH=1+0.015*Cbp*T;RT=-math.sin(math.radians(2*dth))*RC
    return math.sqrt((dL/SL)**2+(dC/SC)**2+(dH/SH)**2+RT*(dC/SC)*(dH/SH))
def lerp(c1,c2,t): return tuple(lin2srgb(srgb2lin(a)*(1-t)+srgb2lin(b)*t) for a,b in zip(c1,c2))
fam={
 'ink':dict(paper='#F7EAD3',road='#F7EAD3',ground='#E8CFA6',ink='#2D2219',plank='#B39B78',ambience='#5A5048',cap=34),
 'lit':dict(paper='#F7EAD3',road='#DDCFC1',ground='#D4B78F',ink='#2C2218',plank='#9A7650',ambience='#3E4A63',cap=60),
 'hatched':dict(paper='#F7EAD3',road='#C4A683',ground='#F7EAD3',ink='#2C2218',plank='#A07A4C',ambience='#4A4A5A',cap=60)}
out={}
for fn,F in fam.items():
    R={}
    for k in range(8): R[f'find.{k+1}']=place(50,25+45*k,F['cap'])[0]
    for i,h in enumerate((20,110,200,290)): R['crisis.army.'+'abcd'[i]]=place(44,h,F['cap'])[0]
    R['crisis.mark']=place(42,30,F['cap'])[0]
    R['crisis.tent']=lerp(hex2rgb(F['plank']),hex2rgb(F['paper']),0.5)
    R['crisis.ash']=lerp(hex2rgb(F['ink']),hex2rgb(F['ground']),0.55)
    R['fog']=lerp(hex2rgb(F['paper']),hex2rgb(F['ambience']),0.35)
    out[fn]=R
    print(f'== {fn} (chroma cap {F["cap"]})')
    for r,v in R.items():
        lab=rgb2lab(v); d=[de2000(lab,rgb2lab(hex2rgb(F[x]))) for x in ('paper','road','ground')]
        print(f'  {r:15s} {rgb2hex(v)}  L* {lab[0]:5.1f}  vs paper/road/ground {d[0]:5.1f} / {d[1]:5.1f} / {d[2]:5.1f}')
    fl=[rgb2lab(R[f'find.{k+1}']) for k in range(8)]
    m=min((de2000(fl[i],fl[j]),i+1,j+1) for i in range(8) for j in range(i+1,8))
    print(f'  find.* pairwise minimum ΔE2000 {m[0]:.1f} (find.{m[1]} / find.{m[2]})')
    al=[rgb2lab(R['crisis.army.'+c]) for c in 'abcd']
    m=min(de2000(al[i],al[j]) for i in range(4) for j in range(i+1,4))
    print(f'  crisis.army.* pairwise minimum ΔE2000 {m:.1f}')
    mi=min(de2000(rgb2lab(R[r]),rgb2lab(hex2rgb(F['ink']))) for r in R if r.startswith('find'))
    print(f'  find.* against ink minimum ΔE2000 {mi:.1f}')
print('\nTABLE')
for r in out['ink']:
    print(f"| {r} | `{rgb2hex(out['ink'][r])}` | `{rgb2hex(out['lit'][r])}` | `{rgb2hex(out['hatched'][r])}` |")
