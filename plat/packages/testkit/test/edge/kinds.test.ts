// §5.1 (9)'s five degenerate kinds as the edge suite makes them (M0-x-06; ./src/edge/kinds.ts): each maker gives its kind
// — zero length, zero area, a vertex visited twice, a fold along one line, coincident points — on the lattice, and the
// kernel answers each with a typed outcome (a §3.1 code or ok under §3.11's rule), never a throw.
import { attachIndex, createKernel, createPlat, STAGES, type Cm, type Frame, type KernelTx, type LatticePoint } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { collinearChain, DEGENERATE_KINDS, degenerateRing, doubledPoints, ringArea2, selfTouchingChain, selfTouchingRing, zeroAreaRing, zeroLengthChain } from '../../src/edge/kinds.js';
import { KERNEL_CODES } from '../../src/edge/observe.js';
import { plantKernel, plantLog } from '../../src/edge/plant.js';
import { fixtureRandom } from '../../src/edge/s8.js';

const cross = (a: LatticePoint, b: LatticePoint, c: LatticePoint): number => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
const same = (a: LatticePoint, b: LatticePoint): boolean => a.x === b.x && a.y === b.y;
const whole = (ps: readonly LatticePoint[]): boolean => ps.every((p) => Number.isInteger(p.x) && Number.isInteger(p.y));

function chainAt(seed: number): LatticePoint[] {
  const r = fixtureRandom(seed);
  const out: LatticePoint[] = [];
  let x = Math.round((r() - 0.5) * 20_000);
  let y = Math.round((r() - 0.5) * 20_000);
  for (let i = 0; i < 3 + Math.floor(r() * 4); i += 1) {
    out.push({ x, y } as LatticePoint);
    x += Math.round(500 + r() * 3_000) * (r() < 0.5 ? -1 : 1);
    y += Math.round(500 + r() * 3_000) * (r() < 0.5 ? -1 : 1);
  }
  return out;
}

function squareAt(seed: number): LatticePoint[] {
  const r = fixtureRandom(seed);
  const s = Math.round(2_000 + r() * 6_000);
  const x = Math.round((r() - 0.5) * 20_000);
  const y = Math.round((r() - 0.5) * 20_000);
  return [{ x, y }, { x: x + s, y }, { x: x + s, y: y + s }, { x, y: y + s }] as LatticePoint[];
}

describe('the five kinds (§5.1 (9))', () => {
  it('the chain makers give their kind on the lattice', () => {
    for (let seed = 1; seed <= 200; seed += 1) {
      const c = chainAt(seed);
      const zl = zeroLengthChain(c);
      expect(zl).toHaveLength(2);
      expect(same(zl[0], zl[1])).toBe(true);
      const za = zeroAreaRing(c);
      expect(za).toHaveLength(3);
      expect(ringArea2(za)).toBe(0);
      expect(cross(za[0], za[1], za[2])).toBe(0);
      expect(same(za[0], za[1]) || same(za[1], za[2]) || same(za[0], za[2])).toBe(false);
      const st = selfTouchingRing(c);
      expect(same(st[0], st[3])).toBe(true);
      expect(new Set(st.map((p) => `${String(p.x)},${String(p.y)}`)).size).toBe(st.length - 1);
      const sc = selfTouchingChain(c);
      expect(same(sc[0], sc[3])).toBe(true);
      const co = collinearChain(c);
      expect(cross(co[0], co[1], co[2])).toBe(0);
      // folding back: the third point lies between the first two
      expect((co[2].x - co[0].x) * (co[1].x - co[2].x) + (co[2].y - co[0].y) * (co[1].y - co[2].y)).toBeGreaterThan(0);
      const dp = doubledPoints(c);
      expect(dp).toHaveLength(2 * c.length);
      for (let i = 0; i < dp.length; i += 2) expect(same(dp[i], dp[i + 1])).toBe(true);
      for (const ps of [zl, za, st, sc, co, dp]) expect(whole(ps)).toBe(true);
    }
  });

  it("degenerateRing makes a ring the kind at its first vertex, keeping the rest", () => {
    for (let seed = 1; seed <= 200; seed += 1) {
      const sq = squareAt(seed);
      const a2 = ringArea2(sq);
      const zl = degenerateRing(sq, 'zero-length');
      expect(same(zl[0], zl[1])).toBe(true);
      expect(ringArea2(zl)).toBe(a2);
      const za = degenerateRing(sq, 'zero-area');
      expect(same(za[0], za[2])).toBe(true);
      expect(ringArea2(za)).toBe(a2);
      const st = degenerateRing(sq, 'self-touching');
      expect(same(st[0], st[3])).toBe(true);
      expect(st.slice(4)).toEqual(sq.slice(1));
      const co = degenerateRing(sq, 'collinear');
      expect(co.length).toBe(2 * sq.length);
      for (let i = 1; i < co.length; i += 2) expect(cross(co[i - 1], co[i], co[(i + 1) % co.length])).toBe(0);
      expect(ringArea2(co)).toBe(a2);
      const cc = degenerateRing(sq, 'coincident');
      expect(cc).toEqual([...sq, ...sq]);
      for (const k of DEGENERATE_KINDS) expect(whole(degenerateRing(sq, k))).toBe(true);
    }
  });

  it('the kernel answers each planted kind typed — a §3.1 code or ok — never a throw, and the batch ends committed or rolled back', () => {
    const key = { layer: 'ground', part: 0 } as const;
    const outcomes = new Map<string, Set<string>>();
    for (let seed = 1; seed <= 40; seed += 1) {
      for (const kind of DEGENERATE_KINDS) {
        const frame: Frame = { widthCm: 100_000 as Cm, heightCm: 100_000 as Cm, aspect: 1, marginShare: 0.3 };
        const plat = createPlat(key, frame);
        attachIndex(plat, { gridCellCm: 5000 });
        const kernel = createKernel(new Map([[key, plat]]));
        const log = plantLog(true);
        const k = plantKernel(kernel, { kind, select: (c) => c.role === 'way' }, log);
        const spec: KernelTx = { key, level: 1, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S4 as never }, stage: STAGES.S4 as never, rederivesFrom: STAGES.S4 as never, workLimit: 10_000_000 };
        const c = chainAt(seed);
        const r = k.tx(spec, (o) => k.geom.insertChain(o, c, [{ role: 'way', entity: 'way:x' }], 'mandatory'));
        expect(log.fired?.role).toBe('way');
        expect(log.insert).not.toBeNull();
        const code = log.insert?.ok === true ? 'ok' : (log.insert?.code ?? '?');
        if (code !== 'ok') expect(KERNEL_CODES.has(code), `${kind}: ${code}`).toBe(true);
        expect(log.batch).toEqual(r.ok ? { committed: r.value.record !== null } : { committed: false, code: r.code });
        if (!outcomes.has(kind)) outcomes.set(kind, new Set());
        outcomes.get(kind)?.add(code);
      }
    }
    // a zero-length chain is refused by the kernel (§3.11: degenerate geometry)
    expect([...(outcomes.get('zero-length') ?? [])]).toEqual(['E_DEGENERATE']);
  });
});
