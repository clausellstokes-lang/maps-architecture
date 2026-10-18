# Reconcile-V02-r1 (SCC-12): the two new family rows with medians, by the conventions of revise-v2/medians.py
import math
def single(w,L): return max(L,1.2*w)*w
def tower(w,sh):
    t=1.6*w
    a=sh.get('square',0)*t*t+sh.get('round',0)*math.pi*(t/2)**2+sh.get('octagon',0)*2*math.sqrt(2)*(t/2)**2
    return a/sum(sh.values())
rows={
 # fort: towerHouse with no range; main share 0.6 (gate required); V11 p50 150/200/300/450
 'fort':(lambda i: tower([6.5,7.5,9.25,11.25][i],{'square':.6,'round':.3,'octagon':.1}), [150,200,300,450], 0.6),
 # burial-ground: the mortuary chapel as a single range; share 0.6 (several optional structures drawn); V11 p50 40/60/80/100
 'burial-ground':(lambda i: single([4.5,5,5.5,5.75][i],[6,7.5,9,10.5][i]), [40,60,80,100], 0.6),
}
rs=[]
for k,(f,p50,sh) in rows.items():
    out=[]
    for i in range(4):
        m=f(i); b=p50[i]*sh; r=m/b; rs.append(r); out.append(f"{m:.0f}/{b:.0f}={r:.2f}")
    print(k,*out)
print("min",round(min(rs),2),"max",round(max(rs),2))
