// M0-c-05's test support for the frame rows of hardening round S3 (queue Q150, Q149): the base registration (M0-x-04's
// `registerBase`, read, never edited) run through S5 on its own arena — S6 and S8 replaced by no-op stages, which the
// runner allows (a stage that returns ok having produced nothing has no stage end to check, C-0316 (4)) — with every draw
// of the growth stage's own streams counted (the concerns `growth.heading`, `growth.curvature` and `growth.branch`: S5c's,
// and S5d's rim; `growth.mainroad`, S5b's, is M0-c-04's and is not counted), the S5 record and S5's stage root read back.
import { CONCERNS, ok, stageText, Stream, type ConcernId, type Hash128 } from '@plat/kernel';
import { baseArena, checkBaseBlueprint, createRegistry, registerBase, run, type BaseBlueprint, type PipelineContext, type PipelineModel, type PipelineStage, type S5Record } from '../../../src/index.js';

/** The growth stage's own concerns (§6.1): S5c draws them, and S5d's top-up grows its rim from them. */
export const GROWTH_CONCERNS: ReadonlySet<number> = new Set([CONCERNS['growth.heading'], CONCERNS['growth.curvature'], CONCERNS['growth.branch']]);

/** A replacement for S5's run (a trace of the stage's steps); `original` is the registered stage. */
export type S5Run = (input: unknown, ctx: PipelineContext, original: PipelineStage) => ReturnType<PipelineStage['run']>;

export interface ThroughS5 {
  readonly model: PipelineModel;
  /** Every value drawn from the growth stage's own streams (S5c and S5d's rim). */
  readonly draws: number;
  readonly s5: S5Record | undefined;
  /** S5's stage root, as hex (the model digest's root at S5's end). */
  readonly root: string;
}

function hex(h: Readonly<Hash128>): string {
  let s = '';
  for (let i = 0; i < 4; i += 1) s += ((h[i] as number) >>> 0).toString(16).padStart(8, '0');
  return s;
}

/** A stream whose every method call is counted (the stream itself answers, unchanged). */
function counted(s: Stream, tally: { n: number }): Stream {
  return new Proxy(s, {
    get(target, prop, receiver) {
      const v: unknown = Reflect.get(target, prop, receiver);
      if (typeof v !== 'function') return v;
      return (...args: unknown[]): unknown => {
        tally.n += 1;
        return (v as (...a: unknown[]) => unknown).apply(target, args);
      };
    },
  });
}

/** The base blueprint `base` at a frame of `areaHa` with `walledHa` walled (C-0264 (10)'s smaller frames). */
export function sized(base: BaseBlueprint, areaHa: number, walledHa: number): BaseBlueprint {
  return { ...base, size: { ...base.size, areaHa }, walledHa };
}

/** The base product at `seed` through S5 (S6 and S8 no-ops), the growth stage's draws counted. */
export function throughS5(bp: BaseBlueprint, seed: number, opts: { rerolls?: Readonly<Record<string, number>>; s5?: S5Run } = {}): ThroughS5 {
  checkBaseBlueprint(bp);
  const registry = createRegistry();
  registerBase(registry);
  const product = registry.products.get('base');
  if (product === undefined) throw new Error('throughS5: the registry holds no base product');
  const tally = { n: 0 };
  for (let i = 0; i < product.stages.length; i += 1) {
    const st = product.stages[i];
    const name = stageText(st.id);
    if (name === 'S6' || name === 'S8') {
      product.stages[i] = Object.freeze({ ...st, run: () => ok({}) });
    } else if (name === 'S5') {
      const s5 = opts.s5;
      product.stages[i] = Object.freeze({
        ...st,
        run: (input: unknown, ctx: PipelineContext) => {
          const stream = (concern: ConcernId, entity: Parameters<PipelineContext['stream']>[1], o: Parameters<PipelineContext['stream']>[2]): Stream => {
            const s = ctx.stream(concern, entity, o);
            return GROWTH_CONCERNS.has(concern) ? counted(s, tally) : s;
          };
          const c: PipelineContext = { ...ctx, stream };
          return s5 === undefined ? st.run(input, c) : s5(input, c, st);
        },
      });
    }
  }
  const { model } = run(registry, { ...bp, seed }, { kind: 'all' }, { arenas: () => [baseArena(bp)], ...(opts.rerolls === undefined ? {} : { rerolls: opts.rerolls }) });
  const root = model.stageRoots.get('S5');
  if (root === undefined) throw new Error('throughS5: S5 left no stage root');
  return { model, draws: tally.n, s5: model.data.get('s5' as never) as S5Record | undefined, root: hex(root) };
}
