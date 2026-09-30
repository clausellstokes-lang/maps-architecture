# fixall/draft-pipeline-r2 — NF-P1 / NF-P10: how far the anisotropic travel-cost level set (road multiplier on radial
# arterials, a = rho_off / rho_road) departs from the isotropic level set of the same area. Numbers only; our own code.
# 16-neighbour Dijkstra on a 5 m grid; the isotropic run on the same grid cancels the grid's own metric bias.
import heapq, math
CELL=5.0
def field(n, roads, a, R_road_cells=0):
    N=n; c=N//2
    road=[[False]*N for _ in range(N)]
    for k in range(roads):
        th=2*math.pi*k/roads + 0.3
        for s in range(0, int(N*0.75)):
            x=int(round(c+s*math.cos(th))); y=int(round(c+s*math.sin(th)))
            if 0<=x<N and 0<=y<N: road[y][x]=True
    moves=[(1,0),(0,1),(-1,0),(0,-1),(1,1),(1,-1),(-1,1),(-1,-1),(2,1),(1,2),(-2,1),(-1,2),(2,-1),(1,-2),(-2,-1),(-1,-2)]
    INF=float('inf'); T=[[INF]*N for _ in range(N)]; T[c][c]=0.0; h=[(0.0,c,c)]
    while h:
        t,y,x=heapq.heappop(h)
        if t>T[y][x]: continue
        for dx,dy in moves:
            X,Y=x+dx,y+dy
            if not(0<=X<N and 0<=Y<N): continue
            L=math.hypot(dx,dy)*CELL
            rho = (1.0/a) if (road[y][x] and road[Y][X] and roads>0) else 1.0
            nt=t+L*rho
            if nt<T[Y][X]: T[Y][X]=nt; heapq.heappush(h,(nt,Y,X))
    return T, road, c
def contour_stats(n, roads, a, area_ha):
    T,road,c=field(n,roads,a)
    cells=sorted(v for row in T for v in row)
    k=int(area_ha*10000/(CELL*CELL)); t=cells[k-1]
    R=math.sqrt(area_ha*10000/math.pi)
    # reach along each road bearing and at mid-bearing between roads
    def reach(th):
        s=0.0
        while True:
            x=int(round(c+s*math.cos(th))); y=int(round(c+s*math.sin(th)))
            if not(0<=x<n and 0<=y<n) or T[y][x]>t: return s*CELL
            s+=0.25
    tips=[reach(2*math.pi*k/roads+0.3) for k in range(roads)] if roads else [reach(0.3)]
    vals=[reach(2*math.pi*(k+0.5)/roads+0.3) for k in range(roads)] if roads else [reach(0.3+math.pi)]
    return R, sum(tips)/len(tips), sum(vals)/len(vals)
print("area_ha roads a      R_eq(m)  iso_reach  tip_reach  valley   tip-iso(m)  valley-iso(m)")
for area,roads,a in [(58,5,1.3),(58,5,1.8),(220,8,1.3),(220,8,1.8),(29,4,1.3)]:
    n=int(2.6*math.sqrt(area*10000/math.pi)/CELL)*2+1
    R,iso_t,_=contour_stats(n,0,1.0,area)
    R,tip,val=contour_stats(n,roads,a,area)
    print(f"{area:7d} {roads:5d} {a:4.1f} {R:9.0f} {iso_t:10.0f} {tip:10.0f} {val:8.0f} {tip-iso_t:11.0f} {val-iso_t:13.0f}")
print()
print("NF-P10 separation check: two nuclei of 29 ha each (TOWN at k=2), a=1.3")
R=math.sqrt(29*10000/math.pi); print(f"R_eq = {R:.0f} m; 2*R_eq = {2*R:.0f} m; a*(R1+R2) = {1.3*2*R:.0f} m; + 2 x (10..20 m setback+glacis) + 30 m gap = {1.3*2*R+2*10+30:.0f}..{1.3*2*R+2*20+30:.0f} m (vs the old 400 m band floor)")
