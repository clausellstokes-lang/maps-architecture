# fixall/draft-pipeline-r2 — NF-P9 / N-21: quarter city cut vs district count, numbers only.
# PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r3, VP2-7): the ladder column now computes
# J-P28's chosen rule; the rejected floor variant is kept only as a labelled reference column.
# Laws (ARCHITECTURE §4.5): N_d = round(3.5*sqrt(A_ha/10)); N_q = round(1.37*B**0.267).
# Chosen rule (J-P28): city cut = min(N_q, L), L = the districts the grower produced (= N_d when the grower meets its law).
# Rejected variant (J-P28, reference only): floor the district count, N_d* = max(N_d, N_q), cut = min(N_q, N_d*) = N_q.
import math
def nd(a_ha): return round(3.5*math.sqrt(a_ha/10))
def nq(b): return round(1.37*b**0.267)
print("# fixall_pipeline_r2_quarters.out — revised by fixall/draft-pipeline-r3 (VP2-7); PENDING FABLE REVIEW")
print("# chosen rule J-P28: city cut = min(N_q, N_d); 'rejected floor' = min(N_q, max(N_d, N_q)), shown for reference only")
print("MFCG size sweep (captures/mfcg/exports-sweep-2026-09-25/README.md): buildings, walled ha, MFCG districts")
rows=[("size-24",411,23.09,6),("size-40",1475,58.17,9),("size-60",2617,121.82,13),("size-80",5242,220.45,12),("size-130",13091,548.09,18)]
print(f"{'size':9}{'B':>7}{'A_ha':>8}{'MFCG':>6}{'N_q':>5}{'N_d':>5}{'cut J-P28 min(N_q,N_d)':>24}{'cut-MFCG':>10}{'rejected floor':>16}")
for s,b,a,m in rows:
    q=nq(b); d=nd(a); cut=min(q,d)
    print(f"{s:9}{b:7d}{a:8.1f}{m:6d}{q:5d}{d:5d}{cut:24d}{cut-m:+10d}{min(q,max(d,q)):16d}")
print()
print("PLAT ladder (buildings = 0.27 per inhabitant, the rung tables' ratio; land A = buildings / 19.8 per ha,")
print("i.e. MFCG's ~22 buildings per walled ha at a 0.9 walled share -- a PROXY for S2's land, not our computed land)")
print(f"{'pop':>7}{'B':>7}{'A_ha':>8}{'N_q':>5}{'N_d':>5}{'old N_d-N_q merges':>20}{'cut J-P28 min(N_q,N_d)':>24}{'rejected floor':>16}")
for p in [1500,3000,5000,7500,9999,10000,15000,20000,30000,50000,80000,120000]:
    b=round(0.27*p); a=b/19.8; q=nq(b); d=nd(a)
    print(f"{p:7d}{b:7d}{a:8.1f}{q:5d}{d:5d}{('merges=%d' % (d-q)):>20}{min(q,d):24d}{min(q,max(d,q)):16d}")
tb=[min(nq(round(0.27*p)), nd(round(0.27*p)/19.8)) for p in (1500,3000,5000,7500,9999)]
print()
print(f"TOWN band (1 500 - 9 999 inhabitants), J-P28 cut: from {tb[0]} to {tb[-1]}")
