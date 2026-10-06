import { appendFileSync } from 'node:fs';
import { describe, it } from 'vitest';
import { reachOf, splitEstuary } from '../../src/water/index.js';
import { chainOf, simplifyChain } from '../../src/water/polygons.js';
import { clipToArena, isSimple, offsetRing, snapRing } from '../../src/water/offset.js';
import { riverFixture } from './support.js';

const LOG = (s: string): void => appendFileSync('/tmp/claude-1000/-home-cstokes111-Maps/6e7b0e39-9580-4748-b844-6b72e677c650/scratchpad/e03/p7.txt', s);

describe('probe', () => {
  it('why', () => {
    const fx = riverFixture(4, { relief: 'rolling' }, { tributaries: [{}, {}] }, {});
    const reach = reachOf(fx.frame);
    const b = splitEstuary(fx.water.bodies, reach, undefined)[0];
    const c = chainOf(b, reach, []);
    if (c === null) return;
    const s = simplifyChain(c.pts, c.half);
    LOG(`chain ${c.pts.length} simple ${s.pts.length} startOut ${c.startOut} endOut ${c.endOut} first ${JSON.stringify(b.course?.[0])} last ${JSON.stringify(b.course?.at(-1))} reach ${JSON.stringify(reach)}\n`);
    let dup = 0;
    for (let i = 0; i + 1 < s.pts.length; i += 1) if (Math.hypot(s.pts[i + 1].x - s.pts[i].x, s.pts[i + 1].y - s.pts[i].y) < 1) dup += 1;
    let minSep = Infinity;
    for (let i = 0; i < s.pts.length; i += 1) for (let j = i + 20; j < s.pts.length; j += 1) minSep = Math.min(minSep, Math.hypot(s.pts[j].x - s.pts[i].x, s.pts[j].y - s.pts[i].y));
    LOG(`dup ${dup} maxHalf ${Math.max(...s.half)} minSep(20 apart) ${Math.round(minSep)}\n`);
    const raw = offsetRing(s.pts, s.half, [c.startOut ? 'flat' : 'round', c.endOut ? 'flat' : 'round']);
    LOG(`raw ${raw === null ? 'null' : raw.length}\n`);
    if (raw === null) return;
    const cl = clipToArena(raw, reach);
    const sn = snapRing(cl);
    LOG(`clip ${cl.length} snap ${sn?.length} simple ${sn ? isSimple(sn) : '-'}\n`);
    if (sn && !isSimple(sn)) {
      // find the first meeting pair
      const n = sn.length;
      for (let i = 0; i < n; i += 1) for (let j = i + 2; j < n; j += 1) {
        if (i === 0 && j === n - 1) continue;
        const a = sn[i], a2 = sn[(i + 1) % n], q = sn[j], q2 = sn[(j + 1) % n];
        const o1 = (a2.x - a.x) * (q.y - a.y) - (a2.y - a.y) * (q.x - a.x);
        const o2 = (a2.x - a.x) * (q2.y - a.y) - (a2.y - a.y) * (q2.x - a.x);
        const o3 = (q2.x - q.x) * (a.y - q.y) - (q2.y - q.y) * (a.x - q.x);
        const o4 = (q2.x - q.x) * (a2.y - q.y) - (q2.y - q.y) * (a2.x - q.x);
        if (((o1 > 0 && o2 < 0) || (o1 < 0 && o2 > 0)) && ((o3 > 0 && o4 < 0) || (o3 < 0 && o4 > 0))) { LOG(`cross ${i} ${j} ${JSON.stringify([a, a2, q, q2])}\n`); return; }
      }
      LOG('no proper crossing: a touch or fold\n');
    }
  }, 900_000);
});
