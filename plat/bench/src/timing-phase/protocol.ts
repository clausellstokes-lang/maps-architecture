// The measurement protocol around M0-f-01's harness (M0-t-00; §12.1; C-0025, C-0047, C-0075, C-0082, C-0097, C-0098,
// C-0103). A bar's work is cut into BATCHES, each one stamped by `timeBatch` (30 s idle, ≤ 60 s, calibrate before and
// after within 5 % or re-run at most twice, the detector before, through and after): this file queues them, re-queues a
// batch whose stamp is not a result — CONTENDED, built from injected readings, or without a normalisation (C-0047,
// C-0075) — at the back of its group's queue at most MAX_REQUEUES times (then it is dropped and its bar is
// `unmeasured`, never judged on part of its work), pools the accepted batches' samples each with its batch's
// normalisation (§12.1: a timing ÷ (runner score ÷ reference score)), and folds each figure: its quantile, its verdict
// against the budget its row states, the factor of a miss, the ±15 % rule between the Node and the Chromium-worker leg
// (C-0082) and, for a kernel bar's miss, C-0098's ordered ladder.
import type { TimeBatchOptions, TimingResult } from '../timing/harness.js';
import type { BarDef, FigureSpec } from './bars.js';

/** A batch whose stamp is not a result is re-queued at most this many times, then dropped (its bar unmeasured). */
export const MAX_REQUEUES = 2;
/** §12.1: where the Node and the Chrome figures differ by more than ± 15 %, the Chrome figure is the one checked. */
export const CROSS_ENGINE_TOLERANCE = 0.15;
/** An adaptive block of seeds is sized to about this much work, under §12.1's 60 s cap. */
export const TARGET_BATCH_MS = 40_000;
/** The Chromium-worker leg's suffix on a pool key. */
export const CHROMIUM = 'chromium-worker';

export type Leg = 'node' | typeof CHROMIUM;

/** A batch's raw samples by pool key, each in its figure's unit (normalised by the protocol, never by the batch). */
export type Samples = Record<string, number[]>;

/** What one batch gives: the harness's stamp, its samples, and what the record keeps beside them. */
export interface BatchOutput {
  readonly stamp: TimingResult;
  readonly samples: Samples;
  readonly extra?: Readonly<Record<string, unknown>>;
}

export type TimeBatchFn = (fn: () => unknown, opts?: TimeBatchOptions) => Promise<TimingResult>;

/** What a batch is run with: the harness's `timeBatch` and the options the protocol passes every stamped batch. */
export interface BatchHarness {
  readonly timeBatch: TimeBatchFn;
  /** The protocol's options for a harness entry that calls timeBatch itself (the own processes; never a reading). */
  readonly options: TimeBatchOptions;
  /** Registers a child process the batch launched (the Chromium leg, C-0082): the detector counts it as its own. */
  readonly own: (pid: number) => void;
}

/** One batch of a group: its label, its leg, and its run. */
export interface BatchPlan {
  readonly label: string;
  readonly leg?: Leg;
  run(h: BatchHarness): Promise<BatchOutput>;
}

/** A group of batches: a fixed list, or adaptive blocks over items (seeds), sized from the last batch's wall-clock. */
export interface Group {
  readonly id: string;
  readonly plans?: readonly BatchPlan[];
  readonly blocks?: { readonly items: readonly number[]; make(block: readonly number[]): BatchPlan; readonly first?: number };
}

/** One pooled sample: its raw value and its batch's normalisation. */
export interface Pooled {
  readonly raw: number;
  readonly norm: number;
}

/** A batch as the record keeps it. */
export interface BatchSummary {
  readonly label: string;
  readonly leg: Leg;
  /** `accepted`: its samples are pooled; `requeued`: its stamp was not a result; `dropped`: re-queued too often or failed. */
  readonly fate: 'accepted' | 'requeued' | 'dropped';
  readonly authority: TimingResult['authority'] | null;
  readonly readings: TimingResult['readings'] | null;
  readonly reasons: readonly string[];
  readonly normalisation: number | null;
  readonly calibration: TimingResult['calibration'] | null;
  readonly flags: readonly string[];
  readonly samples: number;
  readonly wallMs: number | null;
  readonly host: TimingResult['host'] | null;
  readonly at: string | null;
  readonly items: number | null;
  readonly error?: string;
}

/** A group's result. */
export interface GroupResult {
  readonly id: string;
  readonly pools: ReadonlyMap<string, readonly Pooled[]>;
  readonly batches: readonly BatchSummary[];
  /** Batches dropped (re-queued past MAX_REQUEUES, or failed): the group's bars are unmeasured. */
  readonly dropped: number;
  readonly requeued: number;
  readonly extras: readonly Readonly<Record<string, unknown>>[];
}

/** Whether a stamp is a result (C-0047: measured, authoritative, normalised; C-0075: a reference score exists). */
export function isResult(s: TimingResult): boolean {
  return s.readings === 'measured' && s.authority === 'authoritative' && s.normalisation !== null && s.normalisation > 0;
}

function summary(plan: BatchPlan, fate: BatchSummary['fate'], s: TimingResult | null, items: number | null, error?: string): BatchSummary {
  return {
    label: plan.label,
    leg: plan.leg ?? 'node',
    fate,
    authority: s?.authority ?? null,
    readings: s?.readings ?? null,
    reasons: s?.reasons ?? [],
    normalisation: s?.normalisation ?? null,
    calibration: s?.calibration ?? null,
    flags: s?.flags ?? [],
    samples: s?.samples ?? 0,
    wallMs: s?.wallMs ?? null,
    host: s?.host ?? null,
    at: s?.at ?? null,
    items,
    ...(error === undefined ? {} : { error }),
  };
}

/** The next adaptive block's size: about TARGET_BATCH_MS of work at the last batch's rate per item (at least 1). */
export function nextBlockSize(lastWallMs: number | null, lastItems: number, remaining: number, target: number = TARGET_BATCH_MS): number {
  if (remaining <= 0) return 0;
  if (lastWallMs === null || !(lastWallMs > 0) || lastItems <= 0) return 1;
  const per = lastWallMs / lastItems;
  return Math.max(1, Math.min(remaining, Math.floor(target / per)));
}

/**
 * Runs a group's batches by the protocol. A plan that throws is dropped naming its error (the run goes on; its bars are
 * unmeasured). Never throws on a batch's account.
 */
export async function runGroup(group: Group, h: BatchHarness, log: (line: string) => void = () => undefined): Promise<GroupResult> {
  const pools = new Map<string, Pooled[]>();
  const batches: BatchSummary[] = [];
  const extras: Record<string, unknown>[] = [];
  let dropped = 0;
  let requeued = 0;
  interface Queued {
    plan: BatchPlan;
    items: number | null;
    tries: number;
    block?: readonly number[];
  }
  const queue: Queued[] = (group.plans ?? []).map((plan) => ({ plan, items: null, tries: 0 }));
  const pending = [...(group.blocks?.items ?? [])];
  let lastWall: number | null = null;
  let lastItems = 0;
  let firstBlock = true;
  const take = (): Queued | undefined => {
    // a re-queued block waits behind a freshly cut one (the back of the queue), so the contention may pass first
    // blocks are cut lazily, sized from the last batch's rate; a re-queued block keeps its items
    if (group.blocks !== undefined && pending.length > 0 && queue.every((x) => x.tries > 0)) {
      const n = firstBlock ? Math.min(pending.length, Math.max(1, group.blocks.first ?? 1)) : nextBlockSize(lastWall, lastItems, pending.length);
      firstBlock = false;
      const block = pending.splice(0, n);
      queue.unshift({ plan: group.blocks.make(block), items: block.length, tries: 0, block });
    }
    return queue.shift();
  };
  for (let q = take(); q !== undefined; q = take()) {
    let out: BatchOutput;
    try {
      out = await q.plan.run(h);
    } catch (e) {
      dropped += 1;
      const msg = e instanceof Error ? e.message : String(e);
      batches.push(summary(q.plan, 'dropped', null, q.items, msg));
      log(`timing-phase: ${q.plan.label}: FAILED (${msg}); dropped, its bars unmeasured`);
      continue;
    }
    const s = out.stamp;
    if (q.items !== null) {
      lastWall = s.wallMs;
      lastItems = q.items;
    }
    if (!isResult(s)) {
      if (q.tries < MAX_REQUEUES) {
        requeued += 1;
        batches.push(summary(q.plan, 'requeued', s, q.items));
        log(`timing-phase: ${q.plan.label}: ${s.authority}${s.readings === 'built' ? ' (built readings)' : ''} — re-queued (${String(q.tries + 1)} of ${String(MAX_REQUEUES)}): ${s.reasons.join('; ') || 'no normalisation'}`);
        queue.push({ ...q, tries: q.tries + 1 });
      } else {
        dropped += 1;
        batches.push(summary(q.plan, 'dropped', s, q.items));
        log(`timing-phase: ${q.plan.label}: still not a result after ${String(MAX_REQUEUES)} re-queues — dropped, its bars unmeasured`);
      }
      continue;
    }
    const norm = s.normalisation as number;
    const suffix = (q.plan.leg ?? 'node') === CHROMIUM ? `@${CHROMIUM}` : '';
    for (const [key, xs] of Object.entries(out.samples)) {
      const k = `${key}${suffix}`;
      let pool = pools.get(k);
      if (pool === undefined) {
        pool = [];
        pools.set(k, pool);
      }
      for (const x of xs) if (Number.isFinite(x)) pool.push({ raw: x, norm });
    }
    if (out.extra !== undefined) extras.push({ batch: q.plan.label, ...out.extra });
    batches.push(summary(q.plan, 'accepted', s, q.items));
  }
  return { id: group.id, pools, batches, dropped, requeued, extras };
}

/** The nearest-rank quantile (the p50 is the median: the lower middle of an even count). */
export function quantile(xs: readonly number[], q: number): number | null {
  if (xs.length === 0) return null;
  const s = [...xs].sort((a, b) => a - b);
  const i = Math.min(s.length - 1, Math.max(0, Math.ceil(q * s.length) - 1));
  return s[i];
}

/** A pool's values, each divided by its batch's normalisation when the figure is normalised. */
export function values(pool: readonly Pooled[] | undefined, normalise: boolean): number[] {
  return (pool ?? []).map((p) => (normalise ? p.raw / p.norm : p.raw));
}

/** The ±15 % rule's record (C-0082). */
export interface CrossEngine {
  readonly node: number;
  readonly chromium: number;
  /** |Chromium − Node| ÷ Node of the derivation call both legs time. */
  readonly gap: number;
  readonly checked: 'node' | typeof CHROMIUM;
  readonly rule: string;
}

/**
 * §12.1's rule on a figure measured in Node and in Chromium's worker: more than ± 15 % apart, the Chromium figure is
 * checked; both are reported. The Chromium gate figure is the Node gate figure scaled by the two legs' ratio on the same
 * derivation call (C-0440 (3)).
 */
export function crossEngine(nodeGate: number, nodeCall: number, chromiumCall: number, tolerance: number = CROSS_ENGINE_TOLERANCE): CrossEngine {
  const ratio = chromiumCall / nodeCall;
  const chromium = nodeGate * ratio;
  const gap = Math.abs(chromiumCall - nodeCall) / nodeCall;
  const checked = gap > tolerance ? CHROMIUM : 'node';
  return {
    node: nodeGate,
    chromium,
    gap,
    checked,
    rule: `the two legs differ by ${(gap * 100).toFixed(1)} % (${gap > tolerance ? 'more than' : 'within'} ± ${String(tolerance * 100)} %): the ${checked === 'node' ? 'Node' : 'Chromium-worker'} figure is checked, both reported (§12.1; C-0082)`,
  };
}

/** A figure as the record keeps it. */
export interface FigureRecord {
  readonly name: string;
  readonly key: string;
  readonly unit: FigureSpec['unit'];
  readonly budget: number;
  readonly comparator: FigureSpec['comparator'];
  readonly reduce: FigureSpec['reduce'];
  readonly role: FigureSpec['role'];
  /** The checked figure (normalised), or null when unmeasured. */
  readonly value: number | null;
  /** `pass` / `miss` (a gating figure), `reported` (a reported one), `unmeasured` (no complete pool). */
  readonly verdict: 'pass' | 'miss' | 'reported' | 'unmeasured';
  /** value ÷ budget. */
  readonly factor: number | null;
  /** A reported figure above its budget (R12-4's restatement, M0-x-01). */
  readonly exceeds: boolean | null;
  /** The samples the figure folds. */
  readonly n: number;
  readonly crossEngine?: CrossEngine;
  readonly quoted?: string;
  readonly normalised: boolean;
  readonly why?: string;
}

/** Judges a value against its figure's budget (`≈` as `≤` its figure, C-0440 (5)). */
export function judgeFigure(spec: FigureSpec, value: number | null, n: number, extra: Partial<FigureRecord> = {}): FigureRecord {
  const base = { name: spec.name, key: spec.key, unit: spec.unit, budget: spec.budget, comparator: spec.comparator, reduce: spec.reduce, role: spec.role, n, normalised: spec.normalise, ...(spec.quoted === undefined ? {} : { quoted: spec.quoted }) };
  if (value === null || !Number.isFinite(value)) return { ...base, value: null, verdict: 'unmeasured', factor: null, exceeds: null, ...extra };
  const factor = value / spec.budget;
  const over = value > spec.budget;
  return { ...base, value, factor, exceeds: over, verdict: spec.role === 'reported' ? 'reported' : over ? 'miss' : 'pass', ...extra };
}

/**
 * Folds one figure from its pools. A figure whose group dropped a batch is unmeasured (never judged on part of its
 * work); a cross-engine figure needs both legs.
 */
export function foldFigure(spec: FigureSpec, pools: ReadonlyMap<string, readonly Pooled[]>, complete: boolean): FigureRecord {
  const q = spec.reduce === 'p95' ? 0.95 : 0.5;
  const xs = values(pools.get(spec.key), spec.normalise);
  if (!complete) return judgeFigure(spec, null, xs.length, { why: 'a batch of its group was dropped (contended past the re-queue bound, or failed): re-run it with --only (C-0080)' });
  const node = quantile(xs, q);
  if (spec.crossEngine === undefined) return judgeFigure(spec, node, xs.length, xs.length === 0 ? { why: 'no sample' } : {});
  const nodeCall = quantile(values(pools.get(spec.crossEngine.call), spec.normalise), 0.5);
  const chromiumCall = quantile(values(pools.get(`${spec.crossEngine.call}@${CHROMIUM}`), spec.normalise), 0.5);
  if (node === null || nodeCall === null || chromiumCall === null || !(nodeCall > 0)) {
    return judgeFigure(spec, null, xs.length, { why: `the ±15 % rule needs both legs: Node ${nodeCall === null ? 'missing' : 'present'}, Chromium worker ${chromiumCall === null ? 'missing' : 'present'} (C-0082)` });
  }
  const ce = crossEngine(node, nodeCall, chromiumCall);
  return judgeFigure(spec, ce.checked === 'node' ? ce.node : ce.chromium, xs.length, { crossEngine: ce });
}

/** C-0098's ordered ladder for a kernel bar's miss: the steps in order and the one taken next. */
export interface Ladder {
  readonly rule: 'C-0098';
  readonly next: string;
  readonly steps: readonly string[];
}

/** The ladder a kernel bar's miss takes, by its factor (C-0098; §3.7 *No WASM kernel*). */
export function ladderOf(def: Pick<BarDef, 'arrangement'>, factor: number): Ladder {
  const second =
    factor <= 2
      ? '≤ 2×: the measured cost carried into its §12.4 row — a declared budget amendment while the row stays inside its budget (the M0 record and a choices row, the critical path re-summed); over it, the WebAssembly accelerator for that loop'
      : '> 2×: the WebAssembly accelerator for that loop alone, from the same integer algorithm, byte-identical under §6.5 (10)';
  const third = def.arrangement
    ? 'still missing: Clipper2 compiled to WebAssembly as the only engine on every host (§3.7 (ii); a declared golden shift)'
    : "still missing: the D-18 budget re-declaration at the measured value for the owner's veto";
  const steps = [
    'one optimisation pass — a T-fix round of the owning item, re-measured in T2 (C-0080)',
    second,
    third,
    ...(def.arrangement ? ["Clipper2 still missing: the D-18 budget re-declaration for the owner's veto"] : []),
  ];
  return { rule: 'C-0098', next: `${steps[0]}; then ${second}`, steps };
}
