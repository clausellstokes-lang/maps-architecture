// M0-e-04's testkit-side support (C-0122): a small walled town on an indexed ground arena, built through the kernel —
// the arena's outer ring, the map border, a plaza reservation's barrier face, a wall ring with three gates, `primary`
// streets from the plaza to the gates, and a street grid of `secondary` ways — and S6's input over it. The package is
// reached only through `@plat/layout` (C-0122).
import { attachIndex, createKernel, createPlat, err, seedKey, STAGES, type Cm, type Frame, type Kernel, type KernelResult, type KernelTx, type LatticePoint, type Plat, type PlatKey, type StageId } from '@plat/kernel';
import { settlementPerimeter, siteFeatures, type S6Input } from '@plat/layout';
import type { Gate, Id, Reservation, Way } from '@plat/model';

export const GROUND: PlatKey = { layer: 'ground', part: 0 };

export function P(x: number, y: number): LatticePoint {
  return { x: Math.round(x), y: Math.round(y) } as LatticePoint;
}

const GENERATED = { existence: 'generated' as const, flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } };

function spec(level: 0 | 1, stage: number): KernelTx {
  return { key: GROUND, level, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: stage as StageId }, stage: stage as StageId, rederivesFrom: stage as StageId, workLimit: 100_000_000 };
}

function wayRecord(id: Id, cls: Way['class']): Way {
  return { id, class: cls, spine: { role: 'way', entity: id }, width: 600 as Cm, from: { kind: 'junction', id: 'j' }, to: { kind: 'junction', id: 'j' }, growthStage: 1, epoch: 0, provisional: false, lifecycle: GENERATED } as Way;
}

function lay(k: Kernel, level: 0 | 1, stage: number, pts: readonly LatticePoint[], rows: { role: string; entity: string }[], opts: { closed?: boolean; knots?: { index: number; role: string; ordinal: number; entity: string }[] } = {}, own?: { at: LatticePoint; owner: Id }): void {
  const r = k.tx(spec(level, stage), (o): KernelResult<unknown> => {
    const ins = k.geom.insertChain(o, pts, rows, 'mandatory', { ...(opts.closed === true ? { closed: true } : {}), ...(opts.knots === undefined ? {} : { knots: opts.knots, pinned: opts.knots.map((x) => x.index) }) });
    if (!ins.ok) return err(ins.code, ins.detail);
    if (own !== undefined) {
      const loc = k.geom.pointLocate(GROUND, 1, own.at);
      if (loc.on !== 'face') return err('E_INVARIANT', 'support: no face at the owner point');
      return k.geom.setOwner(o, [loc.face], own.owner);
    }
    return ins;
  });
  if (!r.ok) throw new Error(`support: a chain was refused: ${r.code} ${r.detail}`);
}

/** The town: the arena, its kernel, S6's input (without the kernel's part the batch never reads) and its perimeter. */
export interface SmallTown {
  readonly plat: Plat;
  readonly k: Kernel;
  readonly input: S6Input;
  readonly perimeter: LatticePoint[];
}

/** The small town (see the module comment): a 1.2 km frame, a 300 m wall, a 70 m street grid. */
export function smallTown(seed = 7): SmallTown {
  const half = 60_000;
  const frame: Frame = { widthCm: (2 * half) as Cm, heightCm: (2 * half) as Cm, aspect: 1, marginShare: 0.3 };
  const plat = createPlat(GROUND, frame);
  attachIndex(plat, { gridCellCm: 5000 });
  const k = createKernel(new Map([[GROUND, plat]]), { spineWidths: () => null });
  lay(k, 0, STAGES.S1, [P(-90_000, -90_000), P(90_000, -90_000), P(90_000, 90_000), P(-90_000, 90_000)], [{ role: 'margin', entity: 'terrain:t' }], { closed: true });
  const frameRing = [P(-half, -half), P(half, -half), P(half, half), P(-half, half)];
  lay(k, 1, STAGES.S3, frameRing, [{ role: 'border', entity: 'terrain:t' }], { closed: true });
  const plaza = [P(-3000, -3000), P(3000, -3000), P(3000, 3000), P(-3000, 3000)];
  lay(k, 1, STAGES.S3, plaza, [{ role: 'reserved', entity: 'plaza:0' }], { closed: true }, { at: P(0, 0), owner: 'plaza:0' });
  const n = 24;
  const wall: LatticePoint[] = [];
  for (let i = 0; i < n; i += 1) {
    const a = (2 * Math.PI * i) / n + seed * 0.01;
    wall.push(P(30_000 * Math.cos(a), 30_000 * Math.sin(a)));
  }
  const gateAt = [0, 8, 16];
  lay(k, 1, STAGES.S5, wall, [{ role: 'wall', entity: 'enceinte:0' }], { closed: true, knots: gateAt.map((idx, i) => ({ index: idx, role: 'gate', ordinal: 0, entity: `gate:${String(i)}` })) });
  const ways: Way[] = [];
  const gates: Gate[] = [];
  gateAt.forEach((idx, i) => {
    const g = wall[idx];
    const len = Math.hypot(g.x, g.y);
    const from = P((3000 * g.x) / len, (3000 * g.y) / len);
    lay(k, 1, STAGES.S4, [from, g], [{ role: 'way', entity: `way:in${String(i)}` }]);
    ways.push(wayRecord(`way:in${String(i)}`, 'primary'));
    gates.push({ id: `gate:${String(i)}`, enceinte: 'enceinte:0', junction: 'j', way: null, kind: 'main', lifecycle: GENERATED } as Gate);
  });
  // the grid: lines every 70 m (jittered by the seed) within ± 380 m, clear of the plaza
  let gi = 0;
  for (const dir of [0, 1]) {
    for (let a = -5; a <= 5; a += 1) {
      const c = a * 7000 + ((seed * 37 + a * 11) % 7) * 100;
      for (const [b0, b1] of [
        [-38_000, -4000],
        [4000, 38_000],
      ]) {
        if (Math.abs(c) < 4000) continue;
        const pts = dir === 0 ? [P(b0, c), P(b1, c)] : [P(c, b0), P(c, b1)];
        const id = `way:g${String(gi)}`;
        gi += 1;
        lay(k, 1, STAGES.S5, pts, [{ role: 'way', entity: id }]);
        ways.push(wayRecord(id, 'secondary'));
      }
    }
  }
  const boundary: LatticePoint[] = [];
  for (let i = 0; i < 32; i += 1) {
    const a = (2 * Math.PI * i) / 32;
    boundary.push(P(36_000 * Math.cos(a), 36_000 * Math.sin(a)));
  }
  const reservation: Reservation = { id: 'plaza:0', kind: 'plaza', face: { owner: 'plaza:0', level: 1 }, areaBandM2: [3000, 5000], attach: [], stage: STAGES.S3, lifecycle: GENERATED } as unknown as Reservation;
  const features = siteFeatures(plat, { reservations: [reservation], gates, ways, wall });
  const input: S6Input = { kernel: k, key: GROUND, seedKey: seedKey(seed), rung: 'TOWN', boundary, frame: frameRing, stageBoundaries: [wall, boundary], ways, features, reservations: [reservation], wall };
  const per = settlementPerimeter(boundary, k, { frame: frameRing });
  if (!per.ok) throw new Error(`support: the perimeter: ${per.code}`);
  return { plat, k, input, perimeter: per.value };
}
