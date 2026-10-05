import { appendFileSync } from 'node:fs';
import { it } from 'vitest';
import { buffer, bufferParts } from '@plat/kernel';
const log = (...a: unknown[]): void => appendFileSync(process.env.DBG_OUT as string, a.map(String).join(' ') + '\n');
const chain = [{"x":-65054,"y":-64953},{"x":-65048,"y":-64976},{"x":-65043,"y":-64998},{"x":-65039,"y":-65020},{"x":-65036,"y":-65041},{"x":-65036,"y":-65061},{"x":-65038,"y":-65080},{"x":-65042,"y":-65098},{"x":-65050,"y":-65115},{"x":-65061,"y":-65130},{"x":-65074,"y":-65144},{"x":-65089,"y":-65157},{"x":-65107,"y":-65169},{"x":-65126,"y":-65180},{"x":-65147,"y":-65191},{"x":-65168,"y":-65201},{"x":-65189,"y":-65212},{"x":-65209,"y":-65223},{"x":-65228,"y":-65234},{"x":-65245,"y":-65247},{"x":-65260,"y":-65260},{"x":-65272,"y":-65274},{"x":-65282,"y":-65290}] as any;
function dec(c: any[], d: number): any[] { const o = [c[0]]; for (const p of c.slice(1)) { const q = o[o.length - 1]; if (Math.hypot(p.x - q.x, p.y - q.y) >= d) o.push(p); } if (o[o.length-1] !== c[c.length-1]) o.push(c[c.length-1]); return o; }
it('debug3', () => {
  for (const d of [0, 25, 50, 100]) for (const w of [1665, 500, 100]) {
    const c = d === 0 ? chain : dec(chain, d);
    try { const r = buffer([c], w, 'round', 'round'); log('dec', d, 'w', w, 'n', c.length, r.ok ? `ok ${r.value.length} ${JSON.stringify(r.warnings)}` : r.code); }
    catch (e) { log('dec', d, 'w', w, 'n', c.length, 'THROW', (e as Error).message); }
  }
  const parts = bufferParts([chain], 1665, 'round', 'round');
  log('parts', parts.ok ? parts.value.length : parts.code);
});
