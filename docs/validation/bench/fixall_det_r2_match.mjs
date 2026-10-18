// Succession-matching cost: grid-bucketed nearest neighbour per (kind, class family), greedy one-to-one
// by (distance, old id, fresh id). Our own construction for docs/validation/fix-all/r2-determinism.md (NF-D7).
function rng(seed){let s=seed>>>0;return()=>{s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};}
function makeSet(n, sideCm, r, families){ // anchors on a jittered grid (dense town fabric), family per entity
  const x=new Int32Array(n), y=new Int32Array(n), fam=new Uint8Array(n);
  const cols=Math.ceil(Math.sqrt(n)), step=Math.floor(sideCm/cols);
  for(let i=0;i<n;i++){ x[i]=(i%cols)*step+Math.floor(r()*step*0.5); y[i]=Math.floor(i/cols)*step+Math.floor(r()*step*0.5); fam[i]=Math.floor(r()*families); }
  return {x,y,fam,n};
}
function perturb(old, r, maxCm, dropShare, addShare, sideCm, families){
  const keep=[]; for(let i=0;i<old.n;i++) if(r()>=dropShare) keep.push(i);
  const add=Math.floor(old.n*addShare), n=keep.length+add;
  const x=new Int32Array(n), y=new Int32Array(n), fam=new Uint8Array(n);
  keep.forEach((i,k)=>{ x[k]=old.x[i]+Math.round((r()*2-1)*maxCm); y[k]=old.y[i]+Math.round((r()*2-1)*maxCm); fam[k]=old.fam[i]; });
  for(let k=keep.length;k<n;k++){ x[k]=Math.floor(r()*sideCm); y[k]=Math.floor(r()*sideCm); fam[k]=Math.floor(r()*families); }
  return {x,y,fam,n};
}
function match(old, fresh, radiusCm){
  const cell=radiusCm; const key=(cx,cy,f)=>((cx*73856093)^(cy*19349663)^(f*83492791))|0;
  const buckets=new Map();
  for(let j=0;j<fresh.n;j++){ const k=key(Math.floor(fresh.x[j]/cell),Math.floor(fresh.y[j]/cell),fresh.fam[j]); let b=buckets.get(k); if(!b){b=[];buckets.set(k,b);} b.push(j); }
  const pd=[], po=[], pf=[]; const r2=radiusCm*radiusCm;
  for(let i=0;i<old.n;i++){ const cx=Math.floor(old.x[i]/cell), cy=Math.floor(old.y[i]/cell), f=old.fam[i];
    for(let dx=-1;dx<=1;dx++) for(let dy=-1;dy<=1;dy++){ const b=buckets.get(key(cx+dx,cy+dy,f)); if(!b) continue;
      for(const j of b){ if(fresh.fam[j]!==f) continue; const ex=fresh.x[j]-old.x[i], ey=fresh.y[j]-old.y[i], d=ex*ex+ey*ey; if(d<=r2){pd.push(d);po.push(i);pf.push(j);} } } }
  const idx=Array.from(pd.keys()); idx.sort((a,b)=>pd[a]-pd[b]||po[a]-po[b]||pf[a]-pf[b]);
  const usedO=new Uint8Array(old.n), usedF=new Uint8Array(fresh.n); let m=0;
  for(const k of idx){ if(usedO[po[k]]||usedF[pf[k]]) continue; usedO[po[k]]=1; usedF[pf[k]]=1; m++; }
  return m;
}
const cases=[
  {name:'district regeneration (450 buildings, 0.5 m radius, anchors moved <= 40 cm)', n:450, side:30000, radius:50, move:40, drop:0.05, add:0.05},
  {name:'CITY re-derive from S1 (30 000 entities, 0.5 m radius, 5 % dropped, 5 % new)', n:30000, side:500000, radius:50, move:40, drop:0.05, add:0.05},
  {name:'CITY re-derive from S1, fresh town unrelated (30 000, anchors random)', n:30000, side:500000, radius:50, move:1e9, drop:0, add:0},
  {name:'METROPOLIS upgrade mapping (80 000 entities, 2 m radius, anchors moved <= 150 cm)', n:80000, side:800000, radius:200, move:150, drop:0.05, add:0.05},
];
for(const c of cases){
  const r=rng(12345); const fam=6; const old=makeSet(c.n,c.side,r,fam);
  let fresh = c.move>1e8 ? makeSet(c.n,c.side,rng(999),fam) : perturb(old,r,c.move,c.drop,c.add,c.side,fam);
  for(let w=0;w<3;w++) match(old,fresh,c.radius); // warm-up
  const runs=[]; let m=0;
  for(let t=0;t<9;t++){ const t0=process.hrtime.bigint(); m=match(old,fresh,c.radius); const t1=process.hrtime.bigint(); runs.push(Number(t1-t0)/1e3); }
  runs.sort((a,b)=>a-b); const med=runs[4];
  console.log(`${c.name}: old=${old.n} fresh=${fresh.n} matched=${m} median=${med.toFixed(0)} us total, ${(med/old.n).toFixed(3)} us per old entity (min ${ (runs[0]/old.n).toFixed(3)}, max ${(runs[8]/old.n).toFixed(3)})`);
}
