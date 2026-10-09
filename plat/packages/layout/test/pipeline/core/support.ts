// M0-x-02's test support: FIXTURE stages (C-0077) — synthetic StageDecls with declared I/O and trivial runs — and the
// arena they write. `stage()` makes one stage with defaults a test overrides; `drawn()` is §4.1's six M0 stages (S1, S3,
// S4, S5, S6, S8) declared with §4.1's inputs and outputs and the op forms of M0.md §5 item 25, each drawing from its
// own town-root stream and inserting chains that split faces, so the order, the forms, the ranks, the digests and the
// rerolls are judged on one set: S1's L0 ring; S3's plaza ring at L1; S4's arterial from the ring's west and east edges
// to the plaza (north and south faces); S5's two ways in the south-east, S6's bound in the north-west, S8's lane in the
// north-east — so a reroll of S5 moves no other stage's chain.
import {
  attachIndex,
  CONCERNS,
  createPlat,
  faceWalk,
  idOf,
  isFaceLive,
  isHalfEdgeLive,
  isVertexLive,
  ok,
  opInsertChain,
  rowsOn,
  STAGES,
  type Cm,
  type Frame,
  type KernelResult,
  type LatticePoint,
  type Plat,
  type PlatKey,
  type StageId,
  type Stream,
} from '@plat/kernel';
import type { DataKey, Invariant, Rung, WorkLimitLaw } from '@plat/model';
import { register, type ModelView, type PipelineContext, type PipelineStage, type StrategyRegistry } from '../../../src/index.js';

/** The ground arena's key. */
export const GROUND: PlatKey = { layer: 'ground', part: 0 };

/** The fixture frame: 2 km square, the base law's 30 % margin. */
export const FRAME: Frame = { widthCm: 200_000 as Cm, heightCm: 200_000 as Cm, aspect: 1, marginShare: 0.3 };

/** The side of the fixture's L0 ring (400 m). */
export const SIDE = 40_000;

/** A lattice point. */
export function pt(x: number, y: number): LatticePoint {
  return { x: x as Cm, y: y as Cm };
}

/** An empty indexed arena over the fixture frame (the ground arena unless `key` names another). */
export function arena(key: PlatKey = GROUND): Plat {
  const p = createPlat(key, FRAME);
  attachIndex(p, { gridCellCm: [800, 400, 200, 100, 50] });
  return p;
}

/** The run option that gives every run a fresh fixture arena. */
export const ARENAS = (): Plat[] => [arena()];

/** Every rung's reporting budget (§4.12's `budgetMs`): 0 — reporting only. */
const BUDGET: Record<Rung, number> = { TOWN: 0, CITY: 0, METROPOLIS: 0, THORP: 0, HAMLET: 0, VILLAGE: 0 };

/** The fixture's one work-limit law: a fixed 10⁶ operations over the stage's faces (floor + 0 × faces). */
export const LAW: WorkLimitLaw = { counter: 'fixture.ops', unit: 'faces', perUnit: 0, floor: 1_000_000 };

/** The committed counts a fixture batch hands its law. */
export const COUNTS = { faces: 0 } as const;

/** The fixture blueprint (§4.2 S0's seed and rung; `empty` makes S1 write nothing, so every later input is missing). */
export interface FixtureBlueprint {
  readonly seed: number;
  readonly size: { readonly rung: Rung };
  readonly empty?: boolean;
}

/** A blueprint at `seed` (CITY). */
export function bp(seed: number, empty = false): FixtureBlueprint {
  return empty ? { seed, size: { rung: 'CITY' }, empty } : { seed, size: { rung: 'CITY' } };
}

/** What a fixture stage's run receives as input: its declared inputs' values by key. */
export type Inputs = Readonly<Record<string, unknown>>;

/** The parts of a stage a test sets; the rest defaults. */
export interface StageSpec {
  readonly id: StageId;
  readonly inputs?: readonly DataKey[];
  readonly outputs?: readonly DataKey[];
  readonly txForm?: 'declared' | 'callback';
  readonly streamKeys?: readonly string[];
  readonly invariants?: readonly Invariant[];
  readonly workLimits?: readonly WorkLimitLaw[];
  readonly lazy?: boolean;
  readonly run?: (input: Inputs, ctx: PipelineContext) => KernelResult<unknown>;
}

/** How many times each stage's run was called, by stage id: the no-restart property reads it. */
export const CALLS = new Map<StageId, number>();

/** A fixture stage: declared I/O, a trivial run (none: it writes nothing) and the defaults of §4.12's fields. */
export function stage(s: StageSpec): PipelineStage<Inputs, unknown> {
  const inputs = [...(s.inputs ?? [])];
  return {
    id: s.id,
    inputs,
    outputs: [...(s.outputs ?? [])],
    streamKeys: [...(s.streamKeys ?? [])],
    invariants: [...(s.invariants ?? [])],
    ladder: [],
    workLimits: [...(s.workLimits ?? [LAW])],
    budgetMs: BUDGET,
    batch: { kind: 'stage', stage: s.id },
    lineageUnit: 'town',
    lazy: s.lazy ?? false,
    txForm: s.txForm ?? 'callback',
    version: '0',
    inputsOf(model: ModelView): Inputs {
      const out: Record<string, unknown> = {};
      for (const k of inputs) out[k] = model.get(k);
      return out;
    },
    run(input: Inputs, ctx: PipelineContext): KernelResult<unknown> {
      CALLS.set(s.id, (CALLS.get(s.id) ?? 0) + 1);
      return s.run === undefined ? ok({}) : s.run(input, ctx);
    },
  };
}

/** Registers every stage, in the order given. */
export function registerAll(registry: StrategyRegistry, stages: readonly PipelineStage<Inputs, unknown>[]): void {
  for (const s of stages) register(registry, s);
}

/** The town root's stream of `concern` for the calling stage, from the context (its default options). */
export function townStream(ctx: PipelineContext, concern: keyof typeof CONCERNS): Stream {
  const c = CONCERNS[concern];
  return ctx.stream(c, 0, ctx.streamOpts(c, 0));
}

/** Draws `n` u32s from a stream. */
export function draws(s: Stream, n: number): number[] {
  const out: number[] = [];
  for (let i = 0; i < n; i++) out.push(s.u32());
  return out;
}

/** Unwraps a batch's commit inside a stage (a refusal there fails the fixture loudly). */
function must<T>(r: KernelResult<T>, what: string): T {
  if (!r.ok) throw new Error(`fixture: ${what} refused: ${r.code} ${r.detail}`);
  return r.value;
}

/** An open chain as a callback batch at L1 under the 'way' role. */
function wayBatch(ctx: PipelineContext, entity: string, a: LatticePoint, b: LatticePoint): void {
  must(ctx.batch({ level: 1, counter: LAW.counter, counts: COUNTS }, (o) => ctx.kernel.geom.insertChain(o, [a, b], [{ role: 'way', entity }], 'mandatory')), `${entity}`);
}

/**
 * §4.1's six M0 stages as fixture stages, with §4.1's I/O and M0.md §5 item 25's op forms: S1 (callback; the L0 ring),
 * S3 (declared; the plaza reservation ring at L1), S4 (declared; the arterial from the ring's west and east edges to the plaza), S5 (callback;
 * two ways drawn from `growth.heading`), S6 (callback; a district bound drawn from `district.seed`), S8 (callback; a
 * lane drawn from `cut.t`). Each records its draws in its first output.
 */
export function drawn(): PipelineStage<Inputs, unknown>[] {
  return [
    stage({
      id: STAGES.S1,
      inputs: ['blueprint'],
      outputs: ['terrain', 'water'],
      streamKeys: ['terrain.noise'],
      run: (input, ctx) => {
        const blueprint = input.blueprint as FixtureBlueprint;
        if (blueprint.empty === true) return ok({});
        const d = draws(townStream(ctx, 'terrain.noise'), 2);
        must(ctx.batch({ level: 0, counter: LAW.counter, counts: COUNTS }, (o) => ctx.kernel.geom.insertChain(o, [pt(0, 0), pt(SIDE, 0), pt(SIDE, SIDE), pt(0, SIDE)], [{ role: 'margin', entity: 'terrain:ground' }], 'mandatory', { closed: true })), 'S1 ring');
        return ok({ terrain: { side: SIDE, draws: d }, water: { bodies: [] } });
      },
    }),
    stage({
      id: STAGES.S3,
      inputs: ['terrain', 'water'],
      outputs: ['reservations', 'gateSites', 'trace'],
      txForm: 'declared',
      streamKeys: ['gate.pick'],
      run: (input, ctx) => {
        if (input.terrain === undefined) return ok({});
        const d = draws(townStream(ctx, 'gate.pick'), 2);
        const ring = [pt(15_000, 15_000), pt(25_000, 15_000), pt(25_000, 25_000), pt(15_000, 25_000)];
        must(ctx.batch({ level: 1, counter: LAW.counter, counts: COUNTS, ops: [opInsertChain([3, 0], 0, ring, [{ role: 'way', entity: 'reservation:plaza' }], 'mandatory', { closed: true })] }), 'S3 plaza');
        return ok({ reservations: { ids: ['reservation:plaza'], draws: d }, gateSites: [{ at: { x: 0, y: 20_000 } }], trace: [] });
      },
    }),
    stage({
      id: STAGES.S4,
      inputs: ['terrain', 'water', 'reservations', 'gateSites'],
      outputs: ['arterials'],
      txForm: 'declared',
      streamKeys: ['route'],
      run: (input, ctx) => {
        if (input.reservations === undefined) return ok({});
        const d = draws(townStream(ctx, 'route'), 2);
        // Two ops of one declared batch (issued east first; the canonical order decides): the ring's west and east
        // edges to the plaza, splitting the land round the plaza into a north and a south face.
        must(ctx.batch({ level: 1, counter: LAW.counter, counts: COUNTS, ops: [
          opInsertChain([4, 1], 0, [pt(25_000, 20_000), pt(SIDE, 20_000)], [{ role: 'way', entity: 'way:arterial.e' }], 'mandatory'),
          opInsertChain([4, 0], 0, [pt(0, 20_000), pt(15_000, 20_000)], [{ role: 'way', entity: 'way:arterial.w' }], 'mandatory'),
        ] }), 'S4 arterial');
        return ok({ arterials: { ids: ['way:arterial.w', 'way:arterial.e'], draws: d } });
      },
    }),
    stage({
      id: STAGES.S5,
      inputs: ['arterials', 'reservations', 'trace'],
      outputs: ['network', 'enceintes'],
      streamKeys: ['growth.heading'],
      run: (input, ctx) => {
        if (input.arterials === undefined) return ok({});
        const d = draws(townStream(ctx, 'growth.heading'), 2);
        // Two ways from the ring's south edge to the arterial, south-east of the plaza (x on 12 and 11 slots).
        const x0 = 26_000 + 1_000 * (d[0] % 12);
        const x1 = 26_500 + 1_000 * (d[1] % 11);
        wayBatch(ctx, 'way:g0', pt(x0, 0), pt(x0, 20_000));
        wayBatch(ctx, 'way:g1', pt(x1, 0), pt(x1, 20_000));
        return ok({ network: { ids: ['way:g0', 'way:g1'], draws: d }, enceintes: [] });
      },
    }),
    stage({
      id: STAGES.S6,
      inputs: ['network', 'reservations'],
      outputs: ['districts', 'fieldBands'],
      streamKeys: ['district.seed'],
      run: (input, ctx) => {
        if (input.network === undefined) return ok({});
        const d = draws(townStream(ctx, 'district.seed'), 1);
        // A district bound from the arterial to the ring's north edge, north-west of the plaza.
        const x = 1_000 + 1_000 * (d[0] % 14);
        must(ctx.batch({ level: 1, counter: LAW.counter, counts: COUNTS }, (o) => ctx.kernel.geom.insertChain(o, [pt(x, 20_000), pt(x, SIDE)], [{ role: 'district_bound', entity: 'district:a' }], 'mandatory')), 'S6 bound');
        return ok({ districts: { ids: ['district:a'], draws: d }, fieldBands: {} });
      },
    }),
    stage({
      id: STAGES.S8,
      inputs: ['districts', 'fieldBands', 'network'],
      outputs: ['lanes', 'blocks'],
      streamKeys: ['cut.t'],
      run: (input, ctx) => {
        if (input.districts === undefined) return ok({});
        const d = draws(townStream(ctx, 'cut.t'), 1);
        // A lane from the arterial to the ring's north edge, north-east of the plaza.
        const x = 26_000 + 1_000 * (d[0] % 13);
        wayBatch(ctx, 'way:lane', pt(x, 20_000), pt(x, SIDE));
        return ok({ lanes: { ids: ['way:lane'], draws: d }, blocks: [] });
      },
    }),
  ];
}

/** The live faces of every level of an arena, as `level:slot` keys. */
export function liveFaces(p: Plat): string[] {
  const out: string[] = [];
  for (let l = 0; l < 5; l++) {
    const level = l as 0 | 1 | 2 | 3 | 4;
    for (let f = 0; f < p.slots.face[level].top; f++) if (isFaceLive(p, level, f)) out.push(`${String(l)}:${String(f)}`);
  }
  return out;
}

/** The scope every M0 run takes. */
export const ALL = { kind: 'all' } as const;

/**
 * The arena bit for bit (N-55 (6)'s pin): the version, frame and slot counters, every column of every table, the handle
 * table and the index's mutable state (grids, tombstones, partitions, by-key maps, work counters, log).
 */
export function bits(p: Plat): string {
  const col = (a: ArrayLike<number>): string => `${String(a.length)}:${Array.from(a).join(',')}`;
  const out: string[] = [`v${String(p.version)}`, JSON.stringify(p.frame), JSON.stringify(p.slots)];
  const V = p.vertices;
  const T = p.halfEdges;
  const R = p.roles;
  for (const a of [V.x, V.y, V.out, V.level, V.flags, T.origin, T.next, T.prev, T.level]) out.push(col(a));
  for (const a of [R.edgeFirst, R.vertexFirst, R.kind, R.entity, R.level, R.ordinal, R.nextInSet, R.nextSameKey, R.head.k0, R.head.k1, R.head.first]) out.push(col(a));
  out.push(`h${String(R.head.count)}`);
  for (const F of p.faces) {
    for (const a of [F.outer, F.holesStart, F.holes, F.kind, F.owner, F.parent, F.stage, F.nextOfOwner, F.ownerHead.owner, F.ownerHead.head]) out.push(col(a));
    out.push(`o${String(F.ownerHead.count)}`);
  }
  out.push(col(p.indexHome.vertex), col(p.indexHome.edge), ...p.indexHome.face.map(col));
  const H = p.handles;
  out.push(col(H.units), col(H.start), col(H.hash), col(H.slots), `n${String(H.count)}`);
  const idx = p.index;
  if (idx !== undefined) {
    out.push(`log ${idx.log === null ? 'none' : 'open'}`, `work ${String(idx.work.rebuilds)}/${String(idx.work.items)}`);
    for (const L of idx.levels) {
      out.push(`static ${L.static.map((q) => String(q.id)).join(',')}`);
      out.push(`tomb ${L.tombstones.map((t) => [...t].join(',')).join('|')}`);
      out.push(`cells ${JSON.stringify([...L.dynamic.cells].map(([k, v]) => [k, [...v]]))}`);
      out.push(`large ${[...L.dynamic.large].join(',')}`);
      out.push(`entries ${JSON.stringify([...L.dynamic.entries])}`);
    }
    for (const q of idx.partitions) out.push(`part ${String(q.id)} ${String(q.key)} ${q.tree === null ? 'empty' : 'tree'} ${col(q.keys)} ${[...q.pending].join(',')}`);
    for (const m of idx.byKey) out.push(`byKey ${JSON.stringify([...m])}`);
  }
  return out.join('\n');
}

/**
 * The arena's content free of slot numbers: every live vertex (point, level, flags, rows), edge (its ends' points, level,
 * rows) and face record per level (its rings as point texts, kind, owner, stage rank).
 */
export function contentPrint(p: Plat): string {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  const R = p.roles;
  const rows = (list: number[]): string => list.map((r) => `${String(R.kind[r])}/${idOf(p, R.entity[r])}/${String(R.level[r])}/${String(R.ordinal[r])}`).sort().join(';');
  const at = (v: number): string => `${String(X[v])},${String(Y[v])}`;
  const out: string[] = [];
  for (let v = 0; v < p.slots.vertex.top; v++) if (isVertexLive(p, v)) out.push(`v ${at(v)} L${String(p.vertices.level[v])} f${String(p.vertices.flags[v])} [${rows(rowsOn(p, 'vertex', v))}]`);
  for (let e = 0; e < p.slots.pair.top; e++) {
    if (!isHalfEdgeLive(p, 2 * e)) continue;
    const [a, b] = [at(O[2 * e]), at(O[2 * e + 1])].sort();
    out.push(`e ${a}-${b} L${String(p.halfEdges.level[e])} [${rows(rowsOn(p, 'edge', 2 * e))}]`);
  }
  for (let l = 0; l < 5; l++) {
    const level = l as 0 | 1 | 2 | 3 | 4;
    const F = p.faces[level];
    for (let f = 0; f < p.slots.face[level].top; f++) {
      if (!isFaceLive(p, level, f)) continue;
      const rings = faceWalk(p, level, f).map((ring) => ring.map((h) => at(O[h])).join(' '));
      out.push(`f${String(l)} ${rings.join(' | ')} k${String(F.kind[f])} o${F.owner[f] < 0 ? '-' : idOf(p, F.owner[f])} s${String(F.stage[f])}`);
    }
  }
  return out.sort().join('\n');
}
