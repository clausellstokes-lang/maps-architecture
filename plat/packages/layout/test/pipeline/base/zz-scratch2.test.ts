import { appendFileSync } from 'node:fs';
import { describe, it } from 'vitest';
import { area2, faceRings, idOf, isFaceLive } from '@plat/kernel';
const log = (...a: unknown[]): void => appendFileSync('/tmp/claude-1000/-home-cstokes111-Maps/6e7b0e39-9580-4748-b844-6b72e677c650/scratchpad/probe2.log', a.map(String).join(' ') + '\n');
import { FLAT_BLUEPRINT, runBase, faceGraph, minBarrierClass } from '../../../src/index.js';

describe('scratch2', () => {
  it('flat faces', { timeout: 600_000 }, () => {
    const r = runBase(FLAT_BLUEPRINT, 1, { kind: 'all' });
    const p = r.model.plats.get('ground/0')!;
    const own = new Map<string, { n: number; a: number }>();
    for (let f = 0; f < p.slots.face[1].top; f += 1) {
      if (!isFaceLive(p, 1, f)) continue;
      const h = p.faces[1].owner[f];
      const o = h < 0 ? '(none)' : idOf(p, h);
      const e = own.get(o) ?? { n: 0, a: 0 };
      e.n += 1; e.a += Math.abs(area2(faceRings(p, 1, f)[0])) / 2e8;
      own.set(o, e);
    }
    for (const [o, e] of own) log(o, e.n, e.a.toFixed(1));
    const s6 = r.model.data.get('s6') as { hinterland: string; perimeter: unknown[] };
    log('hinterland', s6.hinterland, 'perimeter pts', s6.perimeter.length);
    const ways = r.model.data.get('ways') as { id: string; class: string }[];
    const g = faceGraph(p, { ways: new Map(ways.map((w) => [w.id, w.class])), minBarrierClass: minBarrierClass(), perimeter: s6.hinterland, water: new Set() });
    const sides = new Map<string, number>();
    for (const f of g.faces) { const k = `${f.side}/${f.owner ?? 'null'}`; sides.set(k, (sides.get(k) ?? 0) + 1); }
    for (const [k, v] of sides) log('side', k, v);
  });
});
