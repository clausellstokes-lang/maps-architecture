import sys, math, collections
sys.path.insert(0,'tools')
from pb_raw import parse, varint
from PIL import Image, ImageDraw
b=open('captures/ftg/2026-09-21T05-23-58/session/network/bodies/intercept-0018-b39aab95.bin','rb').read()
def zz(u): return (u>>1) ^ -(u&1)
def pv(v):
    i,vs=0,[]
    while i<len(v):
        x,i=varint(v,i); vs.append(x)
    return vs
def fields(v):
    d=collections.defaultdict(list)
    for fn,wt,x in parse(v): d[fn].append((wt,x))
    return d
def one(d,fn,default=None): return d[fn][0][1] if fn in d else default
def uv(d,fn,default=0): return d[fn][0][1] if fn in d else default
top=fields(b)
for MODE in ('zz','raw'):
    dec=zz if MODE=='zz' else (lambda u:u)
    def pts(v):
        vs=[dec(x) for x in pv(v)]; return [(vs[i],vs[i+1]) for i in range(0,len(vs)-1,2)]
    # view window in cm: zz: -2500..2500 m ; raw 0..5000 m. Render 1000 px, y up for zz (flip)
    if MODE=='zz': x0,x1,y0,y1=-250000,250000,-250000,250000
    else: x0,x1,y0,y1=0,500000,0,500000
    S=1000; sc=S/(x1-x0)
    def T(p): return ((p[0]-x0)*sc, S-(p[1]-y0)*sc)   # +y up
    im=Image.new('RGB',(S,S),(164,194,142)); dr=ImageDraw.Draw(im)
    for _,v in top[6]:
        d=fields(v); P=[T(p) for p in pts(one(d,2))]
        if len(P)>2: dr.polygon(P,fill=(103,129,156))
    for _,v in top[9]:
        d=fields(v); g=uv(d,1)
        if g!=4: continue
        for _,lv in d.get(2,[]):
            ld=fields(lv); P=[T(p) for p in pts(one(ld,2))]
            if len(P)>2: dr.polygon(P,fill=(132,156,107))
    R=fields(one(top,3)); nodes={}
    for _,v in R[2]:
        d=fields(v); nid=uv(d,1); pos=(0,0)
        if 2 in d: pd=fields(one(d,2)); pos=(dec(uv(pd,1)),dec(uv(pd,2)))
        nodes[nid]=pos
    for _,v in R[1]:
        d=fields(v); a,bb,t=uv(d,2),uv(d,3),uv(d,4)
        col=(90,90,90) if t in (0,1,2,3,10) else (150,150,150)
        dr.line([T(nodes[a]),T(nodes[bb])],fill=col,width=1)
    for _,v in top[8]:
        d=fields(v); P=[T(p) for p in pts(one(d,2))]
        if len(P)>2: dr.polygon(P,fill=(110,80,60))
    for _,v in top[10]:
        d=fields(v); sd=fields(one(d,5)); P=[T(p) for p in pts(one(sd,1))]
        dr.line(P+[P[0]],fill=(200,0,0),width=2)
        ad=fields(one(d,4)); a=T((dec(uv(ad,1)),dec(uv(ad,2)))); dr.text((a[0]+4,a[1]-6),one(d,2).decode(),fill=(0,0,0))
    for _,v in top[7]:
        d=fields(v); pd=fields(one(d,2)); p=T((dec(uv(pd,1)),dec(uv(pd,2)))); dr.ellipse([p[0]-3,p[1]-3,p[0]+3,p[1]+3],fill=(0,0,0))
    # frame
    dr.rectangle([0,0,S-1,S-1],outline=(255,0,0))
    im.save(f'/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/3fbc58a0-613c-43b5-9c94-a4f47a8689a6/scratchpad/map_{MODE}.png')
    if MODE=='zz':
        # crop centre 2 km x 2 km around (0,200m) at 2x
        im2=im.crop((300,200,700,600)).resize((1200,1200),Image.NEAREST); im2.save('/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/3fbc58a0-613c-43b5-9c94-a4f47a8689a6/scratchpad/map_zz_centre.png')
print('rendered')
# scale bar measurement in the two screenshots
for f in ('captures/ftg/2026-09-21T05-23-58/steps/001-load-settlement.png','captures/ftg/2026-09-21T05-23-58/steps/007-building-level.png'):
    im=Image.open(f).convert('RGB'); W,H=im.size; print(f.split('/')[-1],'native size',W,H)
    px=im.load(); best=(0,0,0)
    for y in range(int(H*0.95),H):
        run=0; start=0
        for x in range(int(W*0.55),int(W*0.85)):
            r,g,bb=px[x,y]
            if r<70 and g<70 and bb<70:
                if run==0: start=x
                run+=1
                if run>best[0]: best=(run,y,start)
            else: run=0
    print('   longest dark run (scale bar): %d px at y=%d from x=%d'%best)
