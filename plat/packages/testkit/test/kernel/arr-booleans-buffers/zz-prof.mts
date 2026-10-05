// SCRATCH (M0-a-08 seat profiling; deleted before landing)
import fc from 'fast-check';
import { buffer, bufferParts } from '@plat/kernel';
import { bufferCaseArb } from './support.js';
const cases = fc.sample(bufferCaseArb, { numRuns: Number(process.env.N ?? 60), seed: Number(process.env.SEED ?? 5) });
const rows: string[] = [];
let tot = 0;
for (const c of cases) {
  const t0 = performance.now();
  let res = '';
  try { const r = buffer(c.chains, c.w, c.joins, c.ends); res = r.ok ? JSON.stringify(r.warnings.map((w) => w.code + w.count)) : r.code; } catch { res = 'THROW'; }
  const ms = performance.now() - t0;
  tot += ms;
  const parts = bufferParts(c.chains, c.w, c.joins, c.ends);
  const segs = parts.ok ? parts.value.reduce((s, r) => s + r.length, 0) : -1;
  const pts = c.chains.reduce((s, ch) => s + ch.length, 0);
  const lens = c.chains.map((ch) => { let L = 0; for (let i = 1; i < ch.length; i++) L += Math.hypot(ch[i].x - ch[i-1].x, ch[i].y - ch[i-1].y); return Math.round(L); });
  rows.push(`${ms.toFixed(0)}ms pts ${pts} segs ${segs} w ${Array.isArray(c.w) ? 'per' : c.w} ${c.joins}/${c.ends} src ${c.source} len ${lens.join(',')} ${res}`);
}
rows.sort((a, b) => parseFloat(b) - parseFloat(a));
console.log('total', tot.toFixed(0));
console.log(rows.slice(0, Number(process.env.TOP ?? 25)).join('\n'));
