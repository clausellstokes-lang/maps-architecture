// SCRATCH (M0-a-08 seat profiling; deleted before landing): per-source attracted share and time of buffer cases.
import fc from 'fast-check';
import { buffer } from '@plat/kernel';
import { bufferCaseArb } from './support.js';
const ATT = ['W_ATTRACTED', 'W_STRETCH_SHARED', 'W_WEDGE_ROUTED', 'W_PLACED'];
const cases = fc.sample(bufferCaseArb, { numRuns: Number(process.env.N ?? 300), seed: Number(process.env.SEED ?? 5) });
const agg = new Map<string, { n: number; att: number; ms: number; th: number }>();
for (const c of cases) {
  const key = c.source + (process.env.BYW ? ` w${Array.isArray(c.w) ? 'per' : c.w < 100 ? '<100' : c.w < 500 ? '<500' : '>=500'}` : '');
  const a = agg.get(key) ?? { n: 0, att: 0, ms: 0, th: 0 };
  agg.set(key, a);
  a.n += 1;
  const t0 = performance.now();
  try {
    const r = buffer(c.chains, c.w, c.joins, c.ends);
    const ws = r.ok ? r.warnings : ((r as { warnings?: { code: string; count: number }[] }).warnings ?? []);
    if (ws.some((w) => ATT.includes(w.code) && w.count > 0)) a.att += 1;
  } catch { a.th += 1; }
  a.ms += performance.now() - t0;
}
for (const [k, a] of [...agg].sort()) console.log(k.padEnd(40), 'n', a.n, 'unatt', (1 - a.att / a.n).toFixed(2), 'ms/case', (a.ms / a.n).toFixed(0), 'throws', a.th);
