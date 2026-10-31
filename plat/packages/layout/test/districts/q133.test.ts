// Q133 and Q122's S6 class (M0-e-04 hardening round S4; C-0454): the integrated CITY derivations whose S6 aborted
// E_INVARIANT in the 1 000-seed run (seeds 73 195 243 253 310 476 751 999) and the site spike's S6 refusals (relief-60
// seeds 172 and 183, relief-3000 seed 77). Every one was refused in settlementPerimeter before S6's batch: the overlay of
// the full convolution refused an interior swallowtail fold at a concave bay narrower than the offset (sub-class A), the
// sum check refused a correct ring beside a near-collinear run of boundary edges (B1), or the overlay's ring carried a
// sliver past its tolerance (B2). Pinned two ways: the eight seeds derived through S6 on the base pipeline (S8 dropped;
// about 26 s a seed, most of it S1 – S5 and the buffer rung), and the captured perimeter inputs of all thirteen runs
// (`fixtures/q133-inputs.json`: S5's last boundary and the frame as S6 received them) through settlementPerimeter, each
// on its rung. M0-x-06's self-touching plant at seed 3009257304 is unlawful input (S5's boundary pinched at one vertex
// into two counter-clockwise lobes): repaired, read as the lobes' union, on the buffer rung.
import { readFileSync } from 'node:fs';
import { STAGES, type LatticePoint } from '@plat/kernel';
import type { Seed } from '@plat/model';
import { describe, expect, it } from 'vitest';
import { baseArena, createRegistry, FLAT_BLUEPRINT, isSumRing, OVERLAY_TOLERANCE_CM, registerBase, run, simpleCcw, type S6Output } from '../../src/index.js';
import { settlementPerimeterRung } from '../../src/districts/perimeter.js';
import { W_PERIMETER_BUFFER } from '../../src/districts/stage.js';
import { insidePoly, kernel, ringDist } from './support.js';

interface Input {
  readonly id: string;
  readonly runs: readonly string[];
  readonly class: 'A' | 'B1' | 'B2' | 'unlawful';
  readonly was: string;
  readonly rung: 'overlay' | 'buffer';
  readonly frame: readonly (readonly [number, number])[];
  readonly boundary: readonly (readonly [number, number])[];
}
const INPUTS = (JSON.parse(readFileSync(new URL('./fixtures/q133-inputs.json', import.meta.url), 'utf8')) as { inputs: Input[] }).inputs;
const pts = (r: readonly (readonly [number, number])[]): LatticePoint[] => r.map(([x, y]) => ({ x, y }) as LatticePoint);
const input = (id: string): Input => {
  const i = INPUTS.find((x) => x.id === id);
  if (i === undefined) throw new Error(`no captured input ${id}`);
  return i;
};

/** The perimeter of a captured input, judged: simple, counter-clockwise, the sum by the check and by sampling. */
function perimeterOf(i: Input): { rung: string; ring: LatticePoint[] } {
  const b = pts(i.boundary);
  const r = settlementPerimeterRung(b, kernel(), { frame: pts(i.frame) });
  if (!r.ok) throw new Error(`${i.id}: refused ${r.code} ${r.detail}`);
  const ring = r.value.ring;
  expect(simpleCcw(ring), i.id).toBe(true);
  expect(isSumRing(b, ring, 5000, OVERLAY_TOLERANCE_CM), i.id).toBe(true);
  // by the sum's definition, sampled: every boundary vertex inside, every ring vertex 50 m from the boundary (within
  // the overlay's tolerance; no frame clip moves these: each input lies well inside its frame)
  for (const q of b) expect(insidePoly(ring, q), i.id).toBe(true);
  for (const q of ring) {
    const dd = ringDist(b, q);
    expect(Math.abs(dd - 5000), `${i.id} at (${String(q.x)}, ${String(q.y)})`).toBeLessThanOrEqual(OVERLAY_TOLERANCE_CM);
  }
  return { rung: r.value.rung, ring };
}

describe('Q133 and Q122’s S6 class: the captured perimeter inputs stand on their rungs (C-0454)', () => {
  it('the fixture holds the thirteen runs, each with the refusal it met before round S4', () => {
    expect(INPUTS.flatMap((i) => i.runs).sort()).toEqual(
      ['edge-3009257304', 'integrated-195', 'integrated-243', 'integrated-253', 'integrated-310', 'integrated-476', 'integrated-73', 'integrated-751', 'integrated-999', 'site-relief-3000-coarse-77', 'site-relief-3000-default-77', 'site-relief-60-coarse-183', 'site-relief-60-default-172', 'site-relief-60-default-183'].sort(),
    );
    for (const i of INPUTS) expect(i.was.startsWith('settlementPerimeter: '), i.id).toBe(true);
    expect(INPUTS.filter((i) => i.class === 'A').every((i) => i.was.startsWith('settlementPerimeter: the union: insert: no route from'))).toBe(true);
    expect(INPUTS.filter((i) => i.class !== 'A').every((i) => i.was === "settlementPerimeter: the overlay's outer ring is not the boundary's offset (the sum check failed)")).toBe(true);
  });

  it('B1 (integrated 195, relief-60 172): the overlay’s correct ring now passes the sum check — the overlay rung', { timeout: 120_000 }, () => {
    for (const id of ['integrated-195', 'site-relief-60-default-172']) expect(perimeterOf(input(id)).rung, id).toBe('overlay');
  });

  it('A and B2 on the site spike (relief-60 183 in both configurations, relief-3000 77): the buffer rung stands', { timeout: 300_000 }, () => {
    for (const id of ['site-relief-60-default-183', 'site-relief-60-coarse-183', 'site-relief-3000-default-77']) expect(perimeterOf(input(id)).rung, id).toBe('buffer');
  });

  it('A and B2 on the long run (integrated 253: B2’s 9° spike; 751: A’s bridge over collapsed segments): the buffer rung stands', { timeout: 300_000 }, () => {
    for (const id of ['integrated-253', 'integrated-751']) expect(perimeterOf(input(id)).rung, id).toBe('buffer');
  });

  it('x-06’s self-touching plant (3009257304, unlawful input: two counter-clockwise lobes meeting at one vertex): the buffer rung stands, the lobes’ union offset', { timeout: 120_000 }, () => {
    const i = input('edge-3009257304');
    expect(simpleCcw(pts(i.boundary))).toBe(false);
    expect(perimeterOf(i).rung).toBe('buffer');
  });

  it('every captured input names the rung it stands on', () => {
    for (const i of INPUTS) expect(['overlay', 'buffer'], i.id).toContain(i.rung);
  });
});

/** The flat CITY fixture at `seed` through S6 on the base pipeline (the integrated run's stages, S8 dropped). */
function deriveThroughS6(seed: number): { bugs: string[]; s6: S6Output | undefined; warnings: Record<string, number> } {
  const registry = createRegistry();
  registerBase(registry);
  const product = registry.products.get('base');
  if (product === undefined) throw new Error('the base registered no product');
  const i8 = product.stages.findIndex((s) => s.id === STAGES.S8);
  if (i8 >= 0) product.stages.splice(i8, 1);
  const out = run(registry, { ...FLAT_BLUEPRINT, seed: seed as Seed }, { kind: 'all' }, { arenas: () => [baseArena(FLAT_BLUEPRINT)] });
  const entry = out.report.stages.find((s) => s.name === 'S6');
  return { bugs: out.report.bugs.map((b) => `${b.stage}:${b.cls}`), s6: out.model.data.get('s6') as S6Output | undefined, warnings: entry?.warnings ?? {} };
}

describe('Q133: the long run’s eight seeds derive through S6 and commit (the base pipeline, S8 dropped)', () => {
  const SEEDS = [73, 195, 243, 253, 310, 476, 751, 999];
  it(`seeds ${SEEDS.join(' ')}: no bug, S6's districts hold every coarse face inside a simple perimeter; the buffer rung reported where it stood`, { timeout: 900_000 }, () => {
    const buffered: number[] = [];
    for (const seed of SEEDS) {
      const d = deriveThroughS6(seed);
      expect(d.bugs, `seed ${String(seed)}`).toEqual([]);
      const s6 = d.s6;
      expect(s6, `seed ${String(seed)}`).toBeDefined();
      if (s6 === undefined) continue;
      expect(s6.districts.length, `seed ${String(seed)}`).toBeGreaterThan(20);
      expect(s6.report.unowned, `seed ${String(seed)}`).toBe(0);
      expect(s6.report.landHa, `seed ${String(seed)}`).toBeGreaterThan(200);
      expect(simpleCcw(s6.perimeter), `seed ${String(seed)}`).toBe(true);
      const w = d.warnings[W_PERIMETER_BUFFER] ?? 0;
      expect(w === 0 || w === 1, `seed ${String(seed)}`).toBe(true);
      if (w === 1) buffered.push(seed);
    }
    // on the tree of round S4: every seed but 195 (B1, the overlay rung) stands on the buffer rung
    expect(buffered).toEqual([73, 243, 253, 310, 476, 751, 999]);
  });
});
