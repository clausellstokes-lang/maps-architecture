// S8's stage-end hard row `seam-portals` (§5.3, §13.2's seam portal invariant; checks/M0-b-03-notes.md N-9, Q15; C-0297):
// the row is EVALUATED at S8's end — over the seams as the stage leaves them and the lanes it committed — and its
// evaluation is counted in the runner's report, so a report line that says pass with count 0 can never again mean the
// row never ran. A planted portal breach (a fabric that drops or re-points a baseLane portal of its own result) makes the
// row non-empty: S8 is refused E_INVARIANT, the line reads pass false with its evaluation counted, the report carries a
// bug entry for S8, and the runner's rollback (C-0295) leaves nothing of S8 in the arena. The honest twin passes with
// zero problems and its evaluation counted.
import { isHalfEdgeLive, pointLocate, rowKey, rowsOn, type Plat } from '@plat/kernel';
import type { District, Seam } from '@plat/model';
import { describe, expect, it } from 'vitest';
import {
  BentCutFabric,
  BENT_CUT,
  createRegistry,
  cutCells,
  portalInvariant,
  register,
  run,
  runS8,
  s8Stage,
  seamPortalProblems,
  spineWidthsOf,
  type FabricStrategy,
  type GenerationReport,
  type PipelineModel,
  type PipelineStage,
  type S8Input,
  vertexPoints,
} from '../../../src/index.js';
import { fixture, GROUND, ownerOf, P, SEED, twoDistricts, type Fixture } from './support.js';

/** How a planted breach corrupts a district's result: its last baseLane portal dropped, or re-pointed at no lane. */
type Breach = 'drop' | 'repoint';

/**
 * A fabric that runs BentCutFabric and then corrupts the seams it returns (the planted breach): the arena keeps every
 * lane BentCutFabric committed, so the Seam records no longer match the lanes' end vertices.
 */
function breaching(how: Breach): FabricStrategy {
  return {
    ...BentCutFabric,
    partition(district: District, seams: readonly Seam[], ctx, sc, k) {
      const r = BentCutFabric.partition(district, seams, ctx, sc, k);
      if (!r.ok) return r;
      const out: Seam[] = r.value.seams.map((s) => ({ ...s, portals: s.portals.slice() }));
      for (let i = out.length - 1; i >= 0; i -= 1) {
        const j = out[i].portals.map((p) => p.from).lastIndexOf('baseLane');
        if (j < 0) continue;
        if (how === 'drop') out[i].portals.splice(j, 1);
        else out[i].portals[j] = { ...out[i].portals[j], wayId: 'way:no-such-lane' };
        break;
      }
      return { ...r, value: { ...r.value, seams: out } };
    },
  };
}

/** A context whose report sink records each stage-row evaluation (§5.4's ReportSink.invariant). */
function recording(): { ctx: never; rows: [string, boolean][] } {
  const rows: [string, boolean][] = [];
  return { ctx: { report: { invariant: (name: string, pass: boolean) => rows.push([name, pass]), warning: () => undefined } } as never, rows };
}

/** Every way id carried by a live edge of the arena. */
function arenaWays(plat: Plat): Set<string> {
  const ids = new Set<string>();
  for (let e = 0; e < 2 * plat.slots.pair.top; e += 1) {
    if (!isHalfEdgeLive(plat, e)) continue;
    for (const r of rowsOn(plat, 'edge', e)) {
      const key = rowKey(plat, r);
      if (key.role === 'way') ids.add(key.entity);
    }
  }
  return ids;
}

describe('runS8 evaluates the seam-portal row at its end (standalone, a context with a report sink)', () => {
  it('the honest run: the row is evaluated once and holds; the seams carry baseLane portals and the row’s check finds no problem', { timeout: 300_000 }, () => {
    const f = twoDistricts();
    const { ctx, rows } = recording();
    const r = runS8(f.input, ctx);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(rows).toEqual([['seam-portals', true]]);
    const portals = r.value.infill.seams.flatMap((s) => s.portals).filter((p) => p.from === 'baseLane');
    expect(portals.length).toBeGreaterThan(2);
    expect(seamPortalProblems(f.input, GROUND, r.value.infill.seams, r.value.lanes)).toEqual([]);
  });

  for (const how of ['drop', 'repoint'] as const) {
    it(`a planted breach (${how}): the row is evaluated once and fails, and S8 is refused E_INVARIANT naming the row`, { timeout: 300_000 }, () => {
      const f = twoDistricts();
      const { ctx, rows } = recording();
      const r = runS8({ ...f.input, fabrics: new Map([[BENT_CUT, breaching(how)]]) }, ctx);
      expect(r.ok).toBe(false);
      if (r.ok) return;
      expect(r.code).toBe('E_INVARIANT');
      expect(r.detail.startsWith('seam-portals: ')).toBe(true);
      expect(r.detail).toContain(how === 'drop' ? 'lane-end-without-portal' : 'not-a-lane-end');
      expect(rows).toEqual([['seam-portals', false]]);
    });
  }

  it('a context with no sink still evaluates the row: the breach is refused all the same', { timeout: 300_000 }, () => {
    const f = twoDistricts();
    const r = runS8({ ...f.input, fabrics: new Map([[BENT_CUT, breaching('drop')]]) }, { report: undefined } as never);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.detail.startsWith('seam-portals: ')).toBe(true);
  });
});

/**
 * S8 registered alone in a StrategyRegistry over a fixture's arena and run by M0-x-02's runner: the item's s8Stage with
 * the fixture's record as its input and the runner's kernel as its façade (base.ts's adapter does the same over S6's
 * record).
 */
function runAlone(f: Fixture, fabrics?: ReadonlyMap<string, FabricStrategy>): { model: PipelineModel; report: GenerationReport } {
  const item = s8Stage();
  const input: S8Input = fabrics === undefined ? f.input : { ...f.input, fabrics };
  const stage = {
    ...item,
    inputs: [] as string[],
    inputsOf: () => input,
    run: (x: S8Input, ctx: { kernel: S8Input['kernel'] }) => item.run({ ...x, kernel: ctx.kernel }, ctx as never),
  } as unknown as PipelineStage;
  const registry = createRegistry();
  register(registry, stage);
  return run(registry, { seed: SEED, size: { rung: 'CITY' } }, { kind: 'all' }, { arenas: () => [f.plat], spineWidths: spineWidthsOf(f.widths) });
}

describe('through the runner: the report line of seam-portals counts its evaluation; a breach is a refused stage', () => {
  it('the honest twin: S8’s seam-portals line passes with its evaluation counted (count 1), no bug, the lanes written', { timeout: 300_000 }, () => {
    const f = twoDistricts();
    const { model, report } = runAlone(f);
    expect(report.bugs).toEqual([]);
    const s8 = report.stages.find((s) => s.name === 'S8');
    expect(s8?.invariants.find((l) => l.name === 'seam-portals')).toEqual({ name: 'seam-portals', scope: 'stage', pass: true, count: 1 });
    const lanes = model.data.get('lanes') as { id: string }[] | undefined;
    expect(lanes?.length ?? 0).toBeGreaterThan(5);
    const ways = arenaWays(f.plat);
    for (const w of lanes ?? []) expect(ways.has(w.id)).toBe(true);
  });

  it('the planted breach: the line fails with its evaluation counted, one bug entry for S8, no output written, and nothing of S8 stays in the arena', { timeout: 300_000 }, () => {
    const f = twoDistricts();
    const version = f.plat.version;
    const waysBefore = [...arenaWays(f.plat)].sort();
    const { model, report } = runAlone(f, new Map([[BENT_CUT, breaching('drop')]]));
    const s8 = report.stages.find((s) => s.name === 'S8');
    expect(s8?.invariants.find((l) => l.name === 'seam-portals')).toEqual({ name: 'seam-portals', scope: 'stage', pass: false, count: 1 });
    expect(report.bugs.length).toBe(1);
    expect(report.bugs[0]).toMatchObject({ cls: 'E_INVARIANT', stage: 'S8' });
    expect(model.data.has('lanes')).toBe(false);
    expect(model.data.has('blocks')).toBe(false);
    expect(model.data.has('infill')).toBe(false);
    // The runner's rollback (C-0295): the arena stands as it did at S8's start — its version and its ways.
    expect(f.plat.version).toBe(version);
    expect([...arenaWays(f.plat)].sort()).toEqual(waysBefore);
  });
});

/**
 * One way chain in two seams (C-0297): a 400 m × 300 m land inside a ring road, a north–south arterial at x = 200 m, and
 * an east–west secondary from the arterial to the ring at y = 150 m — the west district faces the north-east district
 * across the arterial's north half and the south-east district across its south half, so the arterial's chain lies in
 * the seams (west, north-east) and (west, south-east). Before C-0297 every portal on the arterial went into the first
 * of them and the row (checked seam by seam) found the other seam's lane ends without a portal.
 */
function threeDistricts(): Fixture {
  const W = 40_000;
  const H = 30_000;
  return fixture(
    60_000,
    [
      { id: 'way:ring', cls: 'secondary', widthCm: 600, points: [P(0, 0), P(W, 0), P(W, H), P(0, H)], closed: true },
      { id: 'way:art', cls: 'primary', widthCm: 1000, points: [P(W / 2, 0), P(W / 2, H)] },
      { id: 'way:east', cls: 'secondary', widthCm: 600, points: [P(W / 2, H / 2), P(W, H / 2)] },
    ],
    [
      { seeds: [P(W / 4, H / 2)], prosperity: 0.3, density: 0.5 },
      { seeds: [P((3 * W) / 4, (3 * H) / 4)], prosperity: 0.3, density: 0.5 },
      { seeds: [P((3 * W) / 4, H / 4)], prosperity: 0.3, density: 0.5 },
    ],
  );
}

describe('a way that bounds three districts lies in two seams: each portal goes into its own boundary run’s seam (C-0297)', () => {
  const f = threeDistricts();
  const r = runS8(f.input, { report: undefined } as never);

  it('the fixture: the arterial’s chain is in two seams, and S8 passes its stage-end row (the row found nothing)', { timeout: 300_000 }, () => {
    expect(f.seams.filter((s) => s.edges.some((e) => e.chain.entity === 'way:art')).length).toBe(2);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(seamPortalProblems(f.input, GROUND, r.value.infill.seams, r.value.lanes)).toEqual([]);
  });

  it('every baseLane portal is in a seam of the district that added it, and one on the arterial is in the seam of the district across it at that point', { timeout: 300_000 }, () => {
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    let onArterial = 0;
    const others = new Set<string>();
    for (const seam of r.value.infill.seams) {
      for (const p of seam.portals) {
        if (p.from !== 'baseLane') continue;
        expect(seam.sides).toContain(p.by);
        const at = vertexPoints(f.plat, GROUND, p.at)[0];
        if (at.x !== 20_000) continue;
        onArterial += 1;
        // The face across the arterial from the district that added the portal, 6 m off the centreline.
        const west = f.districts[0].district.id;
        const probe = P(p.by === west ? at.x + 600 : at.x - 600, at.y);
        const loc = pointLocate(f.plat, GROUND, 1, probe);
        expect(loc.on).toBe('face');
        if (loc.on !== 'face') continue;
        const across = ownerOf(f.plat, loc.face);
        const other = seam.sides[0] === p.by ? seam.sides[1] : seam.sides[0];
        expect(other).toBe(across);
        if (p.by === west) others.add(other);
      }
    }
    expect(onArterial).toBeGreaterThan(2);
    // The west district's portals on the arterial reach both of its seams there.
    expect(others.size).toBe(2);
  });
});

describe('the row’s check across seams on planted records (portalInvariant through seamPortalProblems; C-0297)', () => {
  const f = threeDistricts();
  const r = runS8(f.input, { report: undefined } as never);
  const west = f.districts[0].district.id;
  const out = r.ok ? r.value : null;
  const artSeams = (seams: readonly Seam[]): Seam[] => seams.filter((s) => s.edges.some((e) => e.chain.entity === 'way:art'));
  const copy = (seams: readonly Seam[]): Seam[] => seams.map((s) => ({ ...s, portals: s.portals.slice() }));
  const whats = (seams: readonly Seam[], lanes = out?.lanes ?? []): string[] => [...new Set(seamPortalProblems(f.input, GROUND, seams, lanes).map((p) => p.what))].sort();

  it('a portal moved to the other seam of its spine, whose sides lack its district: wrong-seam only', { timeout: 300_000 }, () => {
    expect(out).not.toBeNull();
    if (out === null) return;
    const seams = copy(out.infill.seams);
    // A portal an east district added on the arterial, moved from its seam (west, it) into the other arterial seam.
    const [a, b] = artSeams(seams);
    const fromA = a.portals.findIndex((p) => p.from === 'baseLane' && p.by !== west && !b.sides.includes(p.by));
    const [src, dst, i] = fromA >= 0 ? [a, b, fromA] : [b, a, b.portals.findIndex((p) => p.from === 'baseLane' && p.by !== west && !a.sides.includes(p.by))];
    expect(i).toBeGreaterThanOrEqual(0);
    dst.portals.push(src.portals.splice(i, 1)[0]);
    expect(whats(seams)).toEqual(['wrong-seam']);
  });

  it('a portal moved to a seam that does not hold its spine (its district a side): off-seam, and its lane end has no portal', { timeout: 300_000 }, () => {
    expect(out).not.toBeNull();
    if (out === null) return;
    const seams = copy(out.infill.seams);
    const east = seams.find((s) => s.edges.some((e) => e.chain.entity === 'way:east'));
    expect(east).toBeDefined();
    if (east === undefined) return;
    const src = artSeams(seams).find((s) => s.portals.some((p) => p.from === 'baseLane' && east.sides.includes(p.by)));
    expect(src).toBeDefined();
    if (src === undefined) return;
    const i = src.portals.findIndex((p) => p.from === 'baseLane' && east.sides.includes(p.by));
    east.portals.push(src.portals.splice(i, 1)[0]);
    expect(whats(seams)).toEqual(['lane-end-without-portal', 'off-seam']);
  });

  it('one portal recorded in both seams of its spine: two-portals', { timeout: 300_000 }, () => {
    expect(out).not.toBeNull();
    if (out === null) return;
    const seams = copy(out.infill.seams);
    const [a, b] = artSeams(seams);
    const p = a.portals.find((x) => x.from === 'baseLane' && x.by === west && b.sides.includes(x.by));
    expect(p).toBeDefined();
    if (p === undefined) return;
    b.portals.push(p);
    expect(whats(seams)).toEqual(['two-portals']);
  });

  it('the gap is judged along the spine over the portals of every seam holding it, not seam by seam', { timeout: 300_000 }, () => {
    expect(out).not.toBeNull();
    if (out === null) return;
    // Each arterial seam keeps one west portal; the lanes are those two; a gap no two portals clear.
    const seams = copy(out.infill.seams).map((s) => ({ ...s, portals: [] as Seam['portals'] }));
    const kept: string[] = [];
    for (const s of artSeams(seams)) {
      const p = artSeams(out.infill.seams).find((x) => x.id === s.id)?.portals.find((x) => x.from === 'baseLane' && x.by === west);
      expect(p).toBeDefined();
      if (p === undefined) return;
      s.portals.push(p);
      kept.push(p.wayId);
    }
    const lanes = out.lanes.filter((w) => kept.includes(w.id));
    const wide = { portalGapMinCm: 1e9, portalGapLaneFactor: 1 };
    const gaps = portalInvariant(f.plat, GROUND, seams, lanes, wide).filter((p) => p.what === 'gap');
    expect(gaps.length).toBe(1);
    expect(portalInvariant(f.plat, GROUND, seams, lanes, cutCells())).toEqual([]);
  });
});
