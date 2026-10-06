import { faceAt } from './faces.js';
import { faceDistrict } from './district.js';
import { replayDistrict } from './signature.js';
import { runS8 } from '@plat/layout';
const kinds = (process.argv[2] ?? 'curved').split(',');
const n = Number(process.argv[3] ?? 5);
for (const kind of kinds) {
  const t = performance.now();
  let tot = { cuts: 0, planner: 0, fallback: 0, deep: 0, matched: 0, missed: 0 }; const misses: string[] = []; let over = 0; let same = 0; let bent = 0, corner = 0, arr = 0, fil = 0;
  for (let i = 0; i < n; i++) {
    const f = faceAt(kind as never, i, 1);
    const fd = faceDistrict(f.polygon, i);
    const r = replayDistrict(fd, kind as never);
    if ('error' in r) { console.log('ERR', r.error); continue; }
    if (r.overLimit) over++;
    for (const k of Object.keys(tot)) (tot as any)[k] += (r.counts as any)[k];
    misses.push(...r.counts.misses);
    for (const c of r.cuts) { if (c.bends === 1) { bent++; if (Math.abs((c.cornerT ?? 9) - 0.5) <= 0.1) corner++; if (c.fillet) fil++; } if (c.arrivalCdeg >= 8500) arr++; }
    if (i < 3) { const fd2 = faceDistrict(f.polygon, i); const s = runS8(fd2.input, { report: undefined } as never); if (s.ok && JSON.stringify(s.value.infill.report.districts[0]) === JSON.stringify(r.report)) same++; else console.log('REPORT DIFFERS', i); }
  }
  console.log(kind, n, ((performance.now() - t) / n).toFixed(0), 'ms/face', tot, 'over', over, 'same', same, { bent, corner: corner / bent, arr: arr / tot.matched, fil: fil / bent }, misses.slice(0, 6));
}
