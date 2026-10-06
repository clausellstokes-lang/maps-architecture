// M0-k-04's listed test: "every M0 case of the constructive set runs against the kernel and returns the outcome §3.11 /
// §13.1 states for it (C-0110)" — each M0 case of M0-k-02's set on its first draws (the sweeps' first draws; the bar's
// run is the bench's `fuzz-bar`, every case at the tier's draws and every sweep whole), judged by the runner's judge:
// the scenario through the façade, every step before the last ok, the whole-arena sweep after every writer step, the
// last step's outcome and every property the case holds. The known findings (C-0227 (14)) fail as known — owned by
// another item, listed, never green. Negative controls show the judge can fail: a wrong expected outcome, a wrong code,
// a property on the wrong geometry. And the runner's own fixtures for the two §3.3 / §3.11 clauses the case data
// cannot reach (C-0227 (10), KI-2): a class floor's angle refusal under reject and repair, and the halving cap's no-op.
import { beforeAll, describe, expect, it } from 'vitest';
import {
  casesAt,
  CONSTRUCTIVE_KNOWN,
  CONSTRUCTIVE_SET,
  constructiveCase,
  constructiveKernelJudge,
  loadOracles,
  runConstructiveOnKernel,
  runnerFramedAround,
  runnerKernelOn,
  runnerSpec,
  type ConstructiveCase,
  type ConstructiveInput,
} from '@plat/testkit';
import { absorbSliver, classFloorRow, pointLocate, type KernelTx } from '@plat/kernel';
import { CASE_DRAWS, HEAVY_DRAWS, lp } from './support.js';

beforeAll(async () => {
  await loadOracles();
});

const HEAVY = new Set(['limit/cap-rebuild-threshold']);

function draws(c: ConstructiveCase): number {
  const n = HEAVY.has(c.id) ? HEAVY_DRAWS : CASE_DRAWS;
  return c.sweep === undefined ? n : Math.min(c.sweep, n);
}

function input(c: ConstructiveCase, seed: number): ConstructiveInput {
  const g = c.generate(seed);
  if (g.kind !== 'input') throw new Error(`${c.id} is deferred`);
  return g;
}

const M0 = casesAt('M0');
const KNOWN = new Map(CONSTRUCTIVE_KNOWN.map((k) => [k.id, k]));

describe('every M0 case of the constructive set runs against the kernel and returns its stated outcome (C-0110)', () => {
  it('the set holds the M0 cases the judge runs, and the known findings name M0 cases', () => {
    expect(M0.length).toBe(134);
    for (const k of CONSTRUCTIVE_KNOWN) expect(constructiveCase(k.id)?.milestone).toBe('M0');
  });

  it.each(M0.filter((c) => !KNOWN.has(c.id)).map((c) => [c.id, c] as const))('%s', (_id, c) => {
    for (let s = 0; s < draws(c); s++) {
      const v = constructiveKernelJudge(c, input(c, s));
      if (!v.ok) expect.fail(`${c.id} seed ${String(s)}: ${v.reason}`);
    }
  }, 300_000);

  it.each(CONSTRUCTIVE_KNOWN.map((k) => [k.id, k] as const))('%s fails as its known finding (and only so)', (id, k) => {
    const c = constructiveCase(id) as ConstructiveCase;
    for (let s = 0; s < CASE_DRAWS; s++) {
      const v = constructiveKernelJudge(c, input(c, s));
      expect(v.ok, `${id} seed ${String(s)} is green: the known finding is stale`).toBe(false);
      if (!v.ok) expect(v.reason).toMatch(k.pattern);
    }
  }, 120_000);

  it('the run over the whole set counts the known findings apart, none stale, none pending', () => {
    const cheap = CONSTRUCTIVE_SET.filter((c) => !HEAVY.has(c.id));
    const r = runConstructiveOnKernel(cheap, 1);
    expect(r.pending).toEqual([]);
    expect(r.staleKnown).toEqual([]);
    expect(r.known.map((k) => k.id).sort()).toEqual(CONSTRUCTIVE_KNOWN.map((k) => k.id).sort());
    expect(r.failures).toEqual([]);
    expect(r.failedCases).toBe(0);
    expect(r.green + r.known.length).toBe(r.judged);
  }, 300_000);
});

describe('negative controls: the judge fails what is not the stated outcome', () => {
  /** A copy of a case with its expected outcome replaced. */
  const twisted = (id: string, expect2: ConstructiveCase['expect']): ConstructiveCase => ({ ...(constructiveCase(id) as ConstructiveCase), expect: expect2 });

  it('a refusal judged against ok, and against another code, fails', () => {
    const v1 = constructiveKernelJudge(twisted('geom/cut-through-vertex', { outcome: 'ok', holds: [], clause: 'twisted' }), input(constructiveCase('geom/cut-through-vertex') as ConstructiveCase, 0));
    expect(v1.ok).toBe(false);
    const v2 = constructiveKernelJudge(twisted('geom/cut-through-vertex', { outcome: 'refused', code: 'E_LEVEL', holds: [], clause: 'twisted' }), input(constructiveCase('geom/cut-through-vertex') as ConstructiveCase, 0));
    expect(v2.ok).toBe(false);
    expect(!v2.ok && v2.reason).toMatch(/expected E_LEVEL, got E_NOT_TWO_CROSSINGS/);
  });

  it("version-kept fails where the last step moved the arena (an empty transaction's case given a committing step)", () => {
    const c = constructiveCase('limit/no-input-empty-tx') as ConstructiveCase;
    const g = input(c, 0);
    const f = g.rings.face;
    const inner = [lp(f[0].x + 100, f[0].y + 100), lp(f[0].x + 300, f[0].y + 100), lp(f[0].x + 300, f[0].y + 300), lp(f[0].x + 100, f[0].y + 300)];
    const moved = { ...g, rings: { ...g.rings, inner }, steps: [g.steps[0], { op: 'insertChain', args: { ring: 'inner', level: 1, cls: 'mandatory', role: 'way' } }] };
    const v = constructiveKernelJudge(c, moved);
    expect(v.ok).toBe(false);
    expect(!v.ok && v.reason).toMatch(/version-kept/);
  });

  it('a property checked on geometry that does not hold it fails (the target moved one centimetre)', () => {
    const c = constructiveCase('move/vertex-near-endpoint') as ConstructiveCase;
    const g = input(c, 0);
    const moved = { ...g, points: { ...g.points, target: lp(g.points.target.x + 1, g.points.target.y) } };
    const v = constructiveKernelJudge(c, moved);
    expect(v.ok).toBe(false);
    expect(!v.ok && v.reason).toMatch(/lands-on-target/);
  });

  it('an ok case whose outcome is a downgrade fails where the skeleton path is due (skel/notched-rectangle holds skeleton-valid)', () => {
    const c = constructiveCase('skel/notched-rectangle') as ConstructiveCase;
    const g = input(c, 0);
    // A 2° corner: the contract refuses it, a downgrade where the case states the skeleton path.
    const sharp = { ...g, rings: { outer: [lp(0, 0), lp(2000, 0), lp(2000, 70)] } };
    const v = constructiveKernelJudge(c, sharp);
    expect(v.ok).toBe(false);
  });
});

describe("the runner's own fixtures for clauses the case data cannot reach", () => {
  /** An L1 face and a straight cut leaving a corner child whose angle is `cdeg` (centidegrees) — above minFaceAngle. */
  function angleRun(cdeg: number, minAngleCdeg: number, onFail: 'reject' | 'repair') {
    const W = 8_000;
    const H = 4_000;
    const x2 = 3_000;
    const y1 = Math.round(x2 * Math.tan((cdeg * Math.PI) / 18_000));
    const face = [lp(0, 0), lp(W, 0), lp(W, H), lp(0, H)];
    const p = runnerFramedAround(face);
    if (p === null) throw new Error('no frame');
    const env = {
      floors: () => ({ minWidthCm: 1, minAreaCm2: 1, minAngleCdeg }),
      repair: absorbSliver,
    };
    const k = runnerKernelOn([p], { base: env as never });
    const f = k.tx(runnerSpec(1), (o) => k.geom.insertChain(o, face, [{ role: 'way', entity: 'way:face' }], 'mandatory', { closed: true }));
    expect(f.ok).toBe(true);
    const at = pointLocate(p, p.key, 1, lp(W / 2, H / 2));
    if (at.on !== 'face') throw new Error('no face');
    const v = p.version;
    const over: Partial<KernelTx> = { expect: [classFloorRow('angle')], onFail };
    const r = k.tx(runnerSpec(2, over), (o) => k.geom.splitFace(o, at.face, [lp(0, y1), lp(x2, 0)], { rows: [{ role: 'plot_line', entity: 'plot_line:cut' }], faceLevel: at.level }));
    return { r, kept: p.version === v };
  }

  it('§3.3 reject: a child corner of 7° under a 10° class floor → E_BELOW_MIN_ANGLE, the version kept', () => {
    const { r, kept } = angleRun(700, 1000, 'reject');
    expect(r.ok).toBe(false);
    expect(!r.ok && r.code).toBe('E_BELOW_MIN_ANGLE');
    expect(kept).toBe(true);
  });

  it('§3.3 repair: a face below its angle floor is still rejected after the repair → E_BELOW_MIN_ANGLE', () => {
    const { r, kept } = angleRun(700, 1000, 'repair');
    expect(!r.ok && r.code).toBe('E_BELOW_MIN_ANGLE');
    expect(kept).toBe(true);
  });

  it('control: the same cut under a 5° floor commits', () => {
    expect(angleRun(700, 500, 'reject').r.ok).toBe(true);
  });

  it('§3.11 the caps: a move every halving of which would shorten an edge below minEdge — 8 halvings, then a reported no-op', () => {
    // The moved vertex 30 cm from its neighbour (beyond attractCm, so it stands), dragged 2 000 cm toward it: even
    // 2 000 / 2⁸ ≈ 7.8 cm takes the edge below minEdge, so every strength fails validation.
    const chain = [lp(0, 0), lp(30, 0), lp(30, 900)];
    const p = runnerFramedAround(chain);
    if (p === null) throw new Error('no frame');
    const k = runnerKernelOn([p]);
    expect(k.tx(runnerSpec(1), (o) => k.geom.insertChain(o, chain, [{ role: 'way', entity: 'way:c' }], 'mandatory')).ok).toBe(true);
    const v = p.version;
    let report: { applied: boolean; halvings: number; moves: unknown[] } | null = null;
    const r = k.tx(runnerSpec(1), (o) => {
      const w = k.geom.warp(o, { displacement: () => ({ x: -2000, y: 0 }) }, 1, [lp(20, -10), lp(40, -10), lp(40, 10), lp(20, 10)]);
      if (w.ok) report = w.value;
      return w;
    });
    expect(r.ok).toBe(true);
    expect(report).toMatchObject({ applied: false, halvings: 8, moves: [] });
    expect(p.version).toBe(v); // a no-op commits nothing
    // control: a drag that keeps the edge long enough commits at the first strength
    const r2 = k.tx(runnerSpec(1), (o) => k.geom.warp(o, { displacement: () => ({ x: 4, y: 0 }) }, 1, [lp(20, -10), lp(40, -10), lp(40, 10), lp(20, 10)]));
    expect(r2.ok && (r2.value.value as { applied: boolean; halvings: number }).halvings).toBe(0);
  });
});
