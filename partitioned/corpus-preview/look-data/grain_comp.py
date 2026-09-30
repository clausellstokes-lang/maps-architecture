# kernel copied verbatim in logic from map-corpus/docs/MFS1-grain2.py (read-only source); windows eye-set by this lane
import json
from PIL import Image
C='/Users/cstokes/Desktop/Maps/captures/'
JOBS=[(C+'mfcg/2026-09-21T05-03-24/draw/gen-0.png',.22,.08,.63,.80,'MFCG town Feygate'),
      (C+'mfcg/2026-09-21T05-06-58/draw/gen-2.png',.36,.08,.75,.92,'MFCG metropolis Stormway'),
      (C+'ftg/2026-09-21T05-23-58/steps/006-street-level.png',.30,.10,.80,.90,'FTG street-level core'),
      (C+'village/2026-09-21T05-04-05/draw/gen-0.png',.26,.18,.52,.68,'VG village Godaton W bank')]
out=[]
for path,x0,y0,x1,y1,lab in JOBS:
    im=Image.open(path).convert('L'); W,H=im.size
    win=im.crop((int(W*x0),int(H*y0),int(W*x1),int(H*y1))); ww,wh=win.size; px=win.load(); runs=[]
    for k in range(90):
        y=int(wh*(k+.5)/90); row=[px[x,y] for x in range(ww)]; thr=sum(row)/len(row)-30; c=0; inr=False
        for v in row:
            if v<thr and not inr: c+=1; inr=True
            elif v>=thr: inr=False
        runs.append(c)
    for k in range(90):
        x=int(ww*(k+.5)/90); col=[px[x,y] for y in range(wh)]; thr=sum(col)/len(col)-30; c=0; inr=False
        for v in col:
            if v<thr and not inr: c+=1; inr=True
            elif v>=thr: inr=False
        runs.append(c*ww/float(wh))
    v=sorted(runs); med=v[len(v)//2]
    out.append(dict(label=lab,window=[x0,y0,x1,y1],cells_p25_p50_p75=[round(v[len(v)//4],1),round(med,1),round(v[3*len(v)//4],1)],pitch_px=round(ww/max(med,1e-6),1)))
print(json.dumps(out,indent=1))
