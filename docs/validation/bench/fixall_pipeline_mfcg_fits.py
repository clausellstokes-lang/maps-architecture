import math
# MFCG sweep (captures/mfcg/exports-sweep-2026-09-25/README.md), seed 555001, plain options
rows=[("size-10",77,4.43,2,3),("size-15",174,9.53,3,6),("size-24",411,23.09,4,6),("size-40",1475,58.17,5,9),("size-60",2617,121.82,7,13),
("size-80",5242,220.45,8,12),("size-120",11772,473.50,12,17),("size-130",13091,548.09,12,18),("size-200",31951,1274.47,18,22),("size-250",48379,1942.03,21,24)]
print("gates: N = round(1 + 0.47*sqrt(walled_ha))  vs arch old 2+round(0.9*sqrt(A/10))")
for n,b,a,g,d in rows:
    new=round(1+0.47*math.sqrt(a)); old=2+round(0.9*math.sqrt(a/10))
    print(f"{n:9} walled {a:8.1f} ha  MFCG gates {g:3}  new {new:3}  old {old:3}")
# quarter (label-unit) count law vs buildings, fit on sizes 40..250
import statistics
xs=[math.log(b) for n,b,a,g,d in rows if b>=1475]; ys=[math.log(d) for n,b,a,g,d in rows if b>=1475]
mx,my=statistics.mean(xs),statistics.mean(ys)
bb=sum((x-mx)*(y-my) for x,y in zip(xs,ys))/sum((x-mx)**2 for x in xs); aa=math.exp(my-bb*mx)
print(f"districts ~ {aa:.3f} * buildings^{bb:.3f} (least squares on log, sizes 40-250)")
for n,b,a,g,d in rows:
    print(f"{n:9} buildings {b:6}  MFCG districts {d:3}  fit {aa*b**bb:5.1f}  1.16*B^0.28 {1.16*b**0.28:5.1f}  arch 3.5*sqrt(A/10) on walled {3.5*math.sqrt(a/10):5.1f}")
