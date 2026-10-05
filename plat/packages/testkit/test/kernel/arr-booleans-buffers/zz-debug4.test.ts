import { appendFileSync } from 'node:fs';
import fc from 'fast-check';
import { it } from 'vitest';
import { buffer } from '@plat/kernel';
import { bufferCaseArb } from './support.js';
const log = (...a: unknown[]): void => appendFileSync(process.env.DBG_OUT as string, a.map(String).join(' ') + '\n');
function dec(c: any[], d: number): any[] { const o = [c[0]]; for (const p of c.slice(1, -1)) { const q = o[o.length - 1]; if (Math.hypot(p.x - q.x, p.y - q.y) >= d) o.push(p); } o.push(c[c.length-1]); return o; }
it('debug4', () => {
  const cases = fc.sample(bufferCaseArb, { numRuns: Number(process.env.N ?? 200), seed: 7 });
  const t: Record<string, number> = {};
  const t0 = Date.now();
  for (const c of cases) {
    for (const d of [0, 25]) {
      if (d > 0 && !Array.isArray(c.w)) {
        const cs = c.chains.map((ch) => dec(ch, d));
        try { buffer(cs, c.w, c.joins, c.ends); t['ok' + d] = (t['ok' + d] ?? 0) + 1; } catch (e) { t['throw' + d] = (t['throw' + d] ?? 0) + 1; }
      } else if (d === 0) {
        try { buffer(c.chains, c.w, c.joins, c.ends); t['ok' + d] = (t['ok' + d] ?? 0) + 1; } catch (e) { t['throw' + d] = (t['throw' + d] ?? 0) + 1; log('THROW', (e as Error).message.slice(0, 80), JSON.stringify({ n: c.chains.map((x) => x.length), w: Array.isArray(c.w) ? 'per' : c.w, j: c.joins, e: c.ends, src: c.source })); }
      }
    }
  }
  log(JSON.stringify(t), 'ms', Date.now() - t0);
}, 3600000);
