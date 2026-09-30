# PENDING FABLE REVIEW — receipt of amendments-c/repair-determinism-r3 (opus stand-in), VD2-01: stdlib only.
# usage: python3 docs/validation/bench/amendc_repair_determinism_r3_doorlight.py
# receipt for VD2-01's fix: the door light's carry under a turning warp — old rule (entrance vertex displacement) vs the
# new rule (fraction along the edge the point lies on) vs the limit of the interior mean-value image (continuity check).
import math
def mvc(p, ring):
    n=len(ring); w=[0.0]*n
    for i in range(n):
        a=ring[i-1]; b=ring[i]; c=ring[(i+1)%n]
        def ang(u,v):
            ux,uy=u[0]-p[0],u[1]-p[1]; vx,vy=v[0]-p[0],v[1]-p[1]
            return math.atan2(ux*vy-uy*vx, ux*vx+uy*vy)
        r=math.hypot(b[0]-p[0],b[1]-p[1])
        w[i]=(math.tan(ang(a,b)/2)+math.tan(ang(b,c)/2))/r
    s=sum(w); return [x/s for x in w]
def apply(l, ring): return (sum(l[i]*ring[i][0] for i in range(len(ring))), sum(l[i]*ring[i][1] for i in range(len(ring))))
def dist_to_line(p,a,b):
    return ((b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0]))/math.hypot(b[0]-a[0],b[1]-a[1])  # >0: left of a->b (inside, ccw ring)
for theta_deg, d in ((1.5,60),(-1.5,60),(5,60),(1.5,120)):
    th=math.radians(theta_deg)
    E=(300.0,0.0); B=(800.0,0.0)
    ring=[(0.0,0.0),E,B,(800.0,600.0),(0.0,600.0)]           # ccw, interior above the facade y = 0
    L=(E[0]+d,0.0)                                             # the door light beside its door on edge E-B
    B2=(E[0]+500*math.cos(th), 500*math.sin(th))               # the warp turns the facade about the entrance vertex
    ring2=[ring[0],E,B2,ring[3],ring[4]]
    old=(L[0]+0.0, L[1]+0.0)                                   # old rule: + the entrance vertex's displacement (0 here)
    t=((L[0]-E[0])*(B[0]-E[0])+(L[1]-E[1])*(B[1]-E[1]))/((B[0]-E[0])**2+(B[1]-E[1])**2)
    new=(E[0]+t*(B2[0]-E[0]), E[1]+t*(B2[1]-E[1]))
    lim=apply(mvc((L[0],1e-7),ring),ring2)                     # interior mean-value image just inside the edge
    print(f"turn {theta_deg:+.1f} deg, offset {d} cm: old rule {dist_to_line(old,E,B2):+.3f} cm from the facade "
          f"({'indoors' if dist_to_line(old,E,B2)>0 else 'outdoors'}); new rule {dist_to_line(new,E,B2):+.2e} cm; "
          f"new vs interior MVC limit {math.hypot(new[0]-lim[0],new[1]-lim[1]):.2e} cm; lattice-rounded new "
          f"{dist_to_line((round(new[0]),round(new[1])),E,B2):+.3f} cm")
