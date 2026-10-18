# Our own measurement on MFCG screenshots (pixels only): paper share and void-width structure
# in one intramural region, Lots vs Complex vs Block, same city (steps 047/049/051 are the same href? 047 regen, 049 toggle on 047's city, 051 toggle on 050's city)
from PIL import Image
import sys
PAPER=(0xff,0xf2,0xc8)
def L1(a,b): return abs(a[0]-b[0])+abs(a[1]-b[1])+abs(a[2]-b[2])
def classify(p):
    if L1(p,PAPER)<=45: return 'P'
    if L1(p,(0x77,0x99,0x88))<=30: return 'W'
    if L1(p,(0x66,0x77,0x55))<=30: return 'T'
    return 'I'   # ink/roof/outline/grid-over-roof: "figure"
def analyse(f,box):
    im=Image.open(f).convert('RGB').crop(box)
    w,h=im.size; px=im.load()
    cls=[[classify(px[x,y]) for x in range(w)] for y in range(h)]
    n={'P':0,'W':0,'T':0,'I':0}
    for row in cls:
        for c in row: n[c]+=1
    land=n['P']+n['I']
    # chamfer distance (3-4) of paper pixels to nearest non-paper pixel
    INF=10**9
    d=[[0 if cls[y][x]!='P' else INF for x in range(w)] for y in range(h)]
    for y in range(h):
        for x in range(w):
            if d[y][x]:
                best=d[y][x]
                for dx,dy,c in ((-1,0,3),(0,-1,3),(-1,-1,4),(1,-1,4)):
                    xx,yy=x+dx,y+dy
                    if 0<=xx<w and 0<=yy<h: best=min(best,d[yy][xx]+c)
                d[y][x]=best
    for y in range(h-1,-1,-1):
        for x in range(w-1,-1,-1):
            if d[y][x]:
                best=d[y][x]
                for dx,dy,c in ((1,0,3),(0,1,3),(1,1,4),(-1,1,4)):
                    xx,yy=x+dx,y+dy
                    if 0<=xx<w and 0<=yy<h: best=min(best,d[yy][xx]+c)
                d[y][x]=best
    # local void half-width = max distance along the void; approximate by the max of d in a 5x5 window (ridge value)
    hw=[]
    for y in range(h):
        for x in range(w):
            if cls[y][x]=='P':
                m=0
                for yy in range(max(0,y-3),min(h,y+4)):
                    for xx in range(max(0,x-3),min(w,x+4)):
                        if d[yy][xx]>m and d[yy][xx]<INF: m=d[yy][xx]
                hw.append(m/3.0)
    narrow=sum(1 for v in hw if v<=1.5)/max(1,len(hw))
    wide=sum(1 for v in hw if v>=2.5)/max(1,len(hw))
    return dict(file=f,box=box,paper_share_of_land=round(n['P']/land,3),figure_share_of_land=round(n['I']/land,3),
                water=round(n['W']/(w*h),3),trees=round(n['T']/(w*h),3),
                paper_in_narrow_voids=round(narrow,3),paper_in_wide_voids=round(wide,3))
box=tuple(int(v) for v in sys.argv[1].split(','))
for f in sys.argv[2:]:
    print(analyse(f,box))
