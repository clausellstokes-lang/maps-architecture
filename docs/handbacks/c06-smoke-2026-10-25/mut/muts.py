import json
D='bench/src/fusion/drift.ts'; M='bench/src/fusion/measure.ts'; R='bench/src/fusion/report.ts'; H='bench/src/fusion/hausdorff.ts'
m=[
 ('G1',D,'  const t = r / 2;\n','  const t = r / 2 + 1;\n','sliver bound: width <= 2·√2·attractCm, moved up'),
 ('G2',D,'  const t = r / 2;\n','  const t = r / 2 - 1;\n','sliver bound moved down'),
 ('G3',D,'const inR = inW && !stop.inside(c);','const inR = inW;','sliver of working MINUS stop (the stop region enters)'),
 ('G4',D,'const diff = [...differing(working.edges, stop.edges), ...differing(stop.edges, working.edges)];','const diff = [...differing(working.edges, stop.edges)];','differing pieces both ways'),
 ('B1',M,'within: sl.within && back.within,','within: sl.within,','the mirror sliver stop∖working asserted (Q60 class: a bite)'),
 ('B2',M,'sliverCm: Math.max(sl.cm, back.cm)','sliverCm: sl.cm','the reported sliver is the larger of both'),
 ('B3',M,'    if (!enters) continue;\n    bands.push(l.band);','    bands.push(l.band);','only lanes whose centreline ENTERS the stop kerb cut it'),
 ('B4',M,'      if (!dr.within) driftBeyond += 1;','      if (dr.drifted && dr.hausdorffCm > S8S9_BOUND_CM && !dr.within && dr.sliverCm > 1e9) driftBeyond += 1;','driftBeyond counts every block whose drift clause fails'),
 ('B5',M,'const m = { block: b.block, cm: c.cm, beyond: !c.within || !dr.within, why };','const m = { block: b.block, cm: c.cm, beyond: !c.within, why };','a drift-only beyond block is listed as beyond'),
 ('B6',M,"const s9 = at.on === 'face' ? faceRings(p, at.level, at.face) : [];","const s9 = at.on === 'face' && at.level === 2 ? faceRings(p, at.level, at.face) : [];",'S9 block = the L1 face where L2 holds no record'),
 ('B7',M,'export const S8S9_BOUND_SQ = 8 * LATTICE.attractCm * LATTICE.attractCm;','export const S8S9_BOUND_SQ = 8 * LATTICE.attractCm * LATTICE.attractCm + 1;','the bound up by one'),
 ('B8',M,'export const S8S9_BOUND_SQ = 8 * LATTICE.attractCm * LATTICE.attractCm;','export const S8S9_BOUND_SQ = 8 * LATTICE.attractCm * LATTICE.attractCm - 1;','the bound down by one'),
 ('B9',M,'const kept = spines.length > 0 ? seedComponents(region, seeds) : { region, seedless: 0 };','const kept = { region, seedless: 0 };','a split block read in the parts holding its seeds'),
 ('B10',M,'const planted = b.seeds.map((w) => (plant === undefined || w.working.length < 3 ? w.working : plant(b.block, w.working)));','const planted = b.seeds.map((w) => w.working);','the planted 1 cm shift reaches the comparison'),
 ('B11',M,'const plain = spines.length === 0 && working.length === 1;','const plain = working.length === 1;','a split child is judged off-lattice (drifted beyond 1 cm)'),
 ('B12',M,'const back = sliver(kept.region, all, r);','const back = sliver(region, all, r);','the mirror sliver reads the kept parts only (seedless not drift)'),
 ('B13',M,"working = kr.value.find((r) => r.length >= 3 && area2(r) > 0 && sideOfRing(s, r) === 'in') ?? [];","working = kr.value.find((r) => r.length >= 3 && area2(r) > 0) ?? [];",'the working block is the kerb component holding the seed'),
 ('R1',R,'const bad = x.beyond > 0 || x.driftBeyond > 0 || x.s9Refused > 0 || x.compared === 0;','const bad = x.beyond > 0 || x.s9Refused > 0 || x.compared === 0;','a drift-only seed is listed'),
 ('R2',R,'s8s9: s.s8s9.compared > 0 && s.s8s9.beyond === 0 && s.s8s9.driftBeyond === 0 && s.s8s9.s9Refused === 0,','s8s9: s.s8s9.compared > 0 && s.s8s9.beyond === 0 && s.s8s9.s9Refused === 0,','the s8s9 verdict fails on drift beyond'),
 ('R3',R,"status: whole ? 'complete' : 'PENDING-LONG-RUN'","status: 'complete' as const",'a smoke stays PENDING-LONG-RUN'),
 ('R4',R,'sizes.seeds >= BAR_SEEDS','sizes.seeds >= 50','no seed cut: complete only at 1 000 seeds'),
 ('R5',R,'exactShare: h.compared === 0 ? 0 : h.zero / h.compared','exactShare: h.compared === 0 ? 0 : h.within1cm / h.compared','the exact-0 share counts exact zeros'),
 ('R6',R,'    h.driftBeyond += x.driftBeyond;\n','','driftBeyond folded over seeds'),
 ('H1',H,'if (c * c <= BigInt(q) * BigInt(l2)) return true;','if (c * c < BigInt(q) * BigInt(l2)) return true;','a vertex exactly on the bound is within (exact integers)'),
]
out=[]
for i,f,o,n,p in m:
    s=open('/home/user/maps-architecture/plat/'+f).read()
    c=s.count(o)
    print(i,c)
    out.append({'id':i,'file':f,'old':o,'new':n,'promise':p})
json.dump(out,open('/home/user/maps-scratch/waves/probe-c06/mut/muts.json','w'),indent=1)
