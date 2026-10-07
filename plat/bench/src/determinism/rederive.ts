// The matching bar's real-anchor workload (M0-d-09; C-0090; §6.3 *Measurement (M0 d …)*: "the routine inside the
// engine, on real anchors, per kind"; §6.1's `reroll` component; readings C-0268 (7), (8)).
//
// `rederive(seed, { rerolls: { S5: 1 } })` derives a spike twice at `seed`: the old run, and a fresh run with the growth
// stage's reroll incremented (M0-x-02's run option, which sets `StreamOpts.reroll` for S5's town-root streams), so the
// site, the S3 slice and the routes stand and S5, S6 and S8 are re-drawn. Each run's entities per kind are read from its
// own arena (./entities.ts).
//
// `matchPair(pair)` hands addresses on with M0-d-05b's routine and M0's anchor table: every old entity S1 – S4 made is
// not re-derived — it SURVIVES (flagged `survives`; the fresh run's copy of it is the same entity, checked to be
// identical, never matched twice); every old entity S5, S6 or S8 made is matched against the fresh run's entities of
// those stages. The outcomes are counted per kind (survive / succeed / tombstone / fresh), and two contracts asserted:
//   0 duplicate ids — after the hand-on, no address is held twice (the survivors' and every fresh entity's final one);
//   0 silent re-binds — every old address that lives on is held by its own successor (a `succeed` outcome's fresh entity
//   takes exactly that address), every fresh entity holds its own provisional id or the address handed to it, and
//   every reference an old re-derived entity's anchor makes resolves (M0-d-05b's `rebind`) to kept or reported, a kept
//   one through its own successor — never to another entity's address.
// `timedPair(pair)` is the same pair in the shape M0-d-05b's `timeMatch` (and M0-t-01's timing phase) times.
import { M0_ANCHORS, match, rebind, resolveAnchors, type AnchorSpec, type MatchEntity, type MatchResult, type TimedPair } from '@plat/model';
import { canonicalText } from '@plat/model';
import { tableView } from '@plat/tables';
import type { Id } from '@plat/kernel';
import { MATCH_KINDS, spikeEntities, type MatchKind, type SpikeEntities, type SpikeEntity } from './entities.js';
import { spikeRun, type SpikeName, type SpikeRun, type SpikeRunOptions, type SpikeSize } from './spike.js';

/** C-0090's scoped reroll. */
export const S5_REROLL: Readonly<Record<string, number>> = Object.freeze({ S5: 1 });

/** The stages that stand under a reroll of S5 (C-0090: "the same site, S3 slice and routes stand"). */
export const STANDING: readonly string[] = Object.freeze(['S1', 'S3', 'S4']);

/** `rederive`'s options. */
export interface RederiveOptions {
  /** The fresh run's rerolls (C-0090: `{ S5: 1 }`). */
  readonly rerolls: Readonly<Record<string, number>>;
  /** The spike (default the site spike, whose city holds every kind S1 makes). */
  readonly spike?: SpikeName;
  readonly size?: SpikeSize;
  /** The old run's switches (the runner's checks ride on it: the oracle). */
  readonly old?: Omit<SpikeRunOptions, 'size' | 'rerolls'>;
}

/** One run of a pair: the run and its entities. */
export interface PairSide {
  readonly run: SpikeRun;
  readonly entities: SpikeEntities;
}

/** A re-derivation pair (C-0090). */
export interface RederivedPair {
  readonly spike: SpikeName;
  readonly seed: number;
  readonly rerolls: Readonly<Record<string, number>>;
  readonly old: PairSide;
  readonly fresh: PairSide;
}

/** Derives the pair at `seed`: the old run and the fresh one with `opts.rerolls` (the matching workload, C-0090). */
export function rederive(seed: number, opts: RederiveOptions): RederivedPair {
  const spike = opts.spike ?? 'site';
  const size = opts.size === undefined ? {} : { size: opts.size };
  const oldRun = spikeRun(spike, seed, { ...(opts.old ?? {}), ...size });
  const freshRun = spikeRun(spike, seed, { ...size, rerolls: opts.rerolls });
  return Object.freeze({
    spike,
    seed,
    rerolls: Object.freeze({ ...opts.rerolls }),
    old: Object.freeze({ run: oldRun, entities: spikeEntities(oldRun) }),
    fresh: Object.freeze({ run: freshRun, entities: spikeEntities(freshRun) }),
  });
}

/** M0's anchor table with its cells read from the shipped tables (the bridge's search band). */
export function m0Anchors(): readonly AnchorSpec[] {
  const t = tableView();
  return resolveAnchors(M0_ANCHORS, (cell) => t.table(cell.table).num(cell.row, cell.cell));
}

/** One kind's row of a pair's result. */
export interface KindCounts {
  readonly kind: MatchKind;
  /** Old entities of the kind (survivors and re-derived). */
  readonly old: number;
  /** Fresh entities of the kind matched against (the re-drawn stages' only). */
  readonly fresh: number;
  readonly survive: number;
  readonly succeed: number;
  readonly tombstone: number;
  readonly freshOutcome: number;
  /** Records of the kind with no resolvable anchor, old and fresh (left out, ./entities.ts). */
  readonly unanchored: { readonly old: number; readonly fresh: number };
  /** Where the kind's lineage came from in the old run ('model', 'address', 'mixed', 'none'). */
  readonly lineage: string;
}

/** What `matchPair` finds. */
export interface PairResult {
  readonly spike: SpikeName;
  readonly seed: number;
  /** The standing stages: their roots equal in both runs, and every entity they made identical (id, kind, anchor). */
  readonly standing: {
    readonly rootsEqual: boolean;
    /** The standing stages' records (S1's water, S3's commit's entities, S4's network, bridges and gates) as text: equal. */
    readonly recordsEqual: boolean;
    readonly entities: number;
    /** Standing entities whose fresh copy differs or is missing. */
    readonly differing: number;
    /** The first such, `kind:id`. */
    readonly firstDiffering: string | null;
  };
  readonly perKind: readonly KindCounts[];
  readonly totals: { readonly survive: number; readonly succeed: number; readonly tombstone: number; readonly fresh: number };
  readonly duplicateIds: number;
  readonly silentRebinds: number;
  /** References of old re-derived entities that resolve to a tombstone or an unknown address (reported, never re-bound). */
  readonly reportedRefs: number;
  /** The routine's carry events (successions whose lineage changed). */
  readonly carry: number;
  /** Both runs' refusals (`<stage>:<class>`): a refused stage leaves its kinds empty. */
  readonly bugs: { readonly old: readonly string[]; readonly fresh: readonly string[] };
}

const STANDING_KEYS = ['water', 's3.commit', 's4'] as const;

function anchorText(e: MatchEntity): string {
  return canonicalText([e.kind, e.id, e.anchor]);
}

/** The references an anchor makes to other entities (a way's ends, a key's refs and sets, a point's `on`). */
export function anchorRefs(e: MatchEntity): Id[] {
  const a = e.anchor as { ends?: readonly (Id | null)[]; key?: readonly { ref?: Id | null; set?: readonly (Id | null)[] }[]; on?: Id };
  const out: Id[] = [];
  for (const x of a.ends ?? []) if (x !== null) out.push(x);
  for (const part of a.key ?? []) {
    if (part.ref !== undefined && part.ref !== null) out.push(part.ref);
    for (const x of part.set ?? []) if (x !== null) out.push(x);
  }
  if (a.on !== undefined) out.push(a.on);
  return out;
}

/** The entities of a side, as the routine reads them: the old side with the standing ones flagged, the fresh side re-drawn only. */
export function pairEntities(pair: RederivedPair): { old: MatchEntity[]; fresh: MatchEntity[]; standing: SpikeEntity[] } {
  const standing = pair.old.entities.entities.filter((s) => STANDING.includes(s.by));
  const old = pair.old.entities.entities.map((s) => (STANDING.includes(s.by) ? { ...s.entity, survives: true } : s.entity));
  const fresh = pair.fresh.entities.entities.filter((s) => !STANDING.includes(s.by)).map((s) => s.entity);
  return { old, fresh, standing };
}

/** The pair's TimedPair for M0-d-05b's `timeMatch` (M0-t-01 times it per kind, C-0090). */
export function timedPair(pair: RederivedPair, anchors: readonly AnchorSpec[] = m0Anchors()): TimedPair {
  const { old, fresh } = pairEntities(pair);
  return Object.freeze({ name: `spike-${pair.spike}-${String(pair.seed)}`, seed: pair.seed, old, fresh, anchors });
}

/** Counts the silent re-binds of a result over the entities matched (see the module comment). */
export function silentRebinds(result: MatchResult, old: readonly MatchEntity[], fresh: readonly MatchEntity[]): { silent: number; reported: number } {
  let silent = 0;
  for (const o of result.outcomes) {
    if (o.outcome === 'succeed' && result.addressOf.get(o.fresh) !== o.id) silent += 1;
  }
  for (const f of fresh) {
    const a = result.addressOf.get(f.id);
    if (a === undefined) silent += 1;
    else if (a !== f.id && result.handedOn.get(f.id) !== a) silent += 1;
  }
  const refs: Id[] = [];
  for (const e of old) if (e.survives !== true) refs.push(...anchorRefs(e));
  const r = rebind(result, refs);
  for (const k of r.kept) {
    if (k.status !== 'kept') silent += 1;
    else if (k.fresh !== undefined && result.addressOf.get(k.fresh) !== k.ref) silent += 1;
  }
  return { silent, reported: r.reported.length };
}

/** Matches a pair (see the module comment). */
export function matchPair(pair: RederivedPair, anchors: readonly AnchorSpec[] = m0Anchors()): PairResult & { readonly result: MatchResult } {
  const { old, fresh, standing } = pairEntities(pair);
  // The standing stages stand: their roots and records equal, every entity they made identical in the fresh run.
  const rootOf = (r: SpikeRun, stage: string): string | undefined => r.stageRoots.find(([n]) => n === stage)?.[1];
  const rootsEqual = STANDING.every((s) => rootOf(pair.old.run, s) !== undefined && rootOf(pair.old.run, s) === rootOf(pair.fresh.run, s));
  const recText = (r: SpikeRun): string => canonicalText(STANDING_KEYS.map((k) => [k, standingRecord(r, k)]));
  const recordsEqual = recText(pair.old.run) === recText(pair.fresh.run);
  const freshById = new Map(pair.fresh.entities.entities.map((s) => [`${s.entity.kind}:${s.entity.id}`, s]));
  let differing = 0;
  let firstDiffering: string | null = null;
  for (const s of standing) {
    const key = `${s.entity.kind}:${s.entity.id}`;
    const f = freshById.get(key);
    if (f === undefined || f.by !== s.by || anchorText(f.entity) !== anchorText(s.entity)) {
      differing += 1;
      if (firstDiffering === null) firstDiffering = key;
    }
  }

  const result = match(old, fresh, anchors);
  const perKind: KindCounts[] = MATCH_KINDS.map((kind) => {
    const c = result.perKind.get(kind) ?? { survive: 0, succeed: 0, tombstone: 0, fresh: 0 };
    return Object.freeze({
      kind,
      old: old.filter((e) => e.kind === kind).length,
      fresh: fresh.filter((e) => e.kind === kind).length,
      survive: c.survive,
      succeed: c.succeed,
      tombstone: c.tombstone,
      freshOutcome: c.fresh,
      unanchored: Object.freeze({ old: pair.old.entities.unanchored[kind], fresh: pair.fresh.entities.unanchored[kind] }),
      lineage: pair.old.entities.lineage[kind],
    });
  });

  // Duplicate ids: every address held after the hand-on — the survivors' and each fresh entity's final one.
  const held = new Map<Id, number>();
  for (const e of old) if (e.survives === true) held.set(e.id, (held.get(e.id) ?? 0) + 1);
  for (const f of fresh) {
    const a = result.addressOf.get(f.id) ?? f.id;
    held.set(a, (held.get(a) ?? 0) + 1);
  }
  let duplicateIds = 0;
  for (const n of held.values()) if (n > 1) duplicateIds += n - 1;
  const rb = silentRebinds(result, old, fresh);

  return Object.freeze({
    spike: pair.spike,
    seed: pair.seed,
    standing: Object.freeze({ rootsEqual, recordsEqual, entities: standing.length, differing, firstDiffering }),
    perKind: Object.freeze(perKind),
    totals: Object.freeze({ ...result.counts }),
    duplicateIds,
    silentRebinds: rb.silent,
    reportedRefs: rb.reported,
    carry: result.carry.length,
    bugs: Object.freeze({ old: pair.old.run.bugs, fresh: pair.fresh.run.bugs }),
    result,
  });
}

/** A standing stage's record as compared: S1's water set, S3's commit's entities, S4's network, bridges and gates. */
function standingRecord(r: SpikeRun, key: (typeof STANDING_KEYS)[number]): unknown {
  const v = r.model.data.get(key) as Record<string, unknown> | undefined;
  if (v === undefined) return null;
  if (key === 'water') return v;
  if (key === 's3.commit') return { enceinte: v['enceinte'], gates: v['gates'], plaza: v['plaza'] };
  const s4 = v as { network?: { ways?: unknown; junctions?: unknown }; bridges?: unknown; gates?: unknown; spines?: unknown };
  return { ways: s4.network?.ways, junctions: s4.network?.junctions, bridges: s4.bridges, gates: s4.gates, spines: s4.spines };
}
