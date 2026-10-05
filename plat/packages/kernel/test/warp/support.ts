// Test support for M0-a-13's warp: displacement fields (a constant drag, a shear, the pointwise brush kernels of §7.1 —
// displace, pinch, bloat, swirl, jitter — and a field given per lattice point), regions, and a warp batch runner. The
// arena builders and oracles are M0-a-04 … M0-a-06's test support, read-only.
import type { MoveReport, WarpOptions, DisplacementField } from '../../src/warp/index.js';
import { warp } from '../../src/warp/index.js';
import { compareVertices, type Plat } from '../../src/arena/index.js';
import { tx, type Committed, type KernelTx, type TxEnv } from '../../src/tx/index.js';
import type { KernelResult } from '../../src/num/index.js';
import type { Cm, Level, Point } from '../../src/types/index.js';
import { spec } from '../tx/support.js';

export { allProblems, between, commit, contentPrint, edgeRows, framed, healthy, must, pt, S4, S8, spec, state, vertexAtPoint } from '../tx/support.js';

/** A lattice point. */
export const P = (x: number, y: number): Point => ({ x: x as Cm, y: y as Cm });

/** The axis-aligned square region [x0, x1] × [y0, y1], counter-clockwise. */
export function box(x0: number, y0: number, x1: number, y1: number): Point[] {
  return [P(x0, y0), P(x1, y0), P(x1, y1), P(x0, y1)];
}

/** A constant drag everywhere. */
export function drag(dx: number, dy: number): DisplacementField {
  return { displacement: () => ({ x: dx, y: dy }) };
}

/** A field given at lattice points (zero elsewhere). */
export function pointwise(entries: readonly [number, number, number, number][]): DisplacementField {
  const m = new Map<string, { x: number; y: number }>(entries.map(([x, y, dx, dy]) => [`${x},${y}`, { x: dx, y: dy }]));
  return { displacement: (x, y) => m.get(`${x},${y}`) ?? { x: 0, y: 0 } };
}

/** §7.1's pointwise brush kernels about a centre, with a linear falloff to zero at the radius. */
export type BrushKind = 'displace' | 'pinch' | 'bloat' | 'swirl' | 'jitter';

export function brush(kind: BrushKind, cx: number, cy: number, radius: number, strength: number, dragX = 0, dragY = 0): DisplacementField {
  return {
    displacement(x: number, y: number) {
      const rx = x - cx;
      const ry = y - cy;
      const r = Math.sqrt(rx * rx + ry * ry);
      if (r >= radius) return { x: 0, y: 0 };
      const w = 1 - r / radius;
      switch (kind) {
        case 'displace':
          return { x: w * dragX, y: w * dragY };
        case 'pinch':
          return { x: -w * strength * rx, y: -w * strength * ry };
        case 'bloat':
          return { x: w * strength * rx, y: w * strength * ry };
        case 'swirl': {
          const a = w * strength;
          const c = 1 - (a * a) / 2;
          const s = a - (a * a * a) / 6;
          return { x: c * rx - s * ry - rx, y: s * rx + c * ry - ry };
        }
        case 'jitter': {
          // A deterministic hash of the point: ± strength cm.
          let h = (Math.imul(x | 0, 73_856_093) ^ Math.imul(y | 0, 19_349_663)) >>> 0;
          h = Math.imul(h ^ (h >>> 13), 0x5bd1e995) >>> 0;
          const u = (h & 0xffff) / 65_535 - 0.5;
          const v = (h >>> 16) / 65_535 - 0.5;
          return { x: 2 * w * strength * u, y: 2 * w * strength * v };
        }
      }
    },
  };
}

/** One warp step as its own callback batch at `level`; returns the batch's result and the report. */
export function warpBatch(p: Plat, level: Level, field: DisplacementField, region: readonly Point[], opts: { record?: (r: MoveReport) => boolean; warp?: WarpOptions; spec?: Partial<KernelTx>; env?: TxEnv } = {}): KernelResult<Committed<MoveReport>> {
  return tx(p, spec(level, { rederivesFrom: 0 as never, ...(opts.spec ?? {}) }), (o) => warp(o, field, level, region, opts.record, opts.warp ?? {}), opts.env ?? {}) as KernelResult<Committed<MoveReport>>;
}

/** The committed step's report (a refusal is a test failure). */
export function report(r: KernelResult<Committed<MoveReport>>): { report: MoveReport; committed: boolean; work: number } {
  if (!r.ok) throw new Error(`support: the warp batch was refused: ${r.code} ${r.detail}`);
  return { report: r.value.value, committed: r.value.record !== null, work: r.value.record?.work ?? 0 };
}

/** The point of a vertex as "x,y". */
export function at(p: Plat, v: number): string {
  return `${p.vertices.x[v]},${p.vertices.y[v]}`;
}

/**
 * The commit record's `moved` against the step's reports (§3.3, §3.6 "the commit record lists every moved vertex"): the
 * record's list, and every vertex the reports moved (slides and re-seats included) by lattice position now, as "x,y".
 */
export function movedLists(p: Plat, recordMoved: readonly number[] | undefined, reports: readonly MoveReport[]): { record: string[]; reported: string[] } {
  const vs = [...new Set(reports.flatMap((r) => r.moves.map((m) => m.vertex)))];
  vs.sort((a, b) => compareVertices(p, a, b));
  return { record: (recordMoved ?? []).map((v) => at(p, v)), reported: vs.map((v) => at(p, v)) };
}
