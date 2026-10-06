// The grower (M0-e-04; §4.5 *Grower* (CONFIDENCE B9; MFCG 12710731's district-builder idea, item 47, J-A47.41),
// §6.1 `district.seed`, §5.2 F-WORK; C-0085; readings C-0245 (6)–(10)). Over the coarse-face graph's claimable faces:
//   * a round gives every unfinished grower one turn, in seed-id order; each turn's draws come from its own stream,
//     keyed by the grower's seed lineage and the turn's number (`stream(lineage, turn)`), so a turn's draws depend on
//     nothing but the grower and the turn — never on a slot, an arrival or another grower's draws;
//   * a turn first takes the admissible neighbours in canonical face order — a grower with none is finished, so even a
//     grower of rate 0 ends — then skips with probability 1 − rate (one uniform, `bool(rate)`), else absorbs one of
//     them drawn uniformly (`int`) (C-0245 (6));
//   * admissible: an unclaimed claimable face whose every shared edge with the patch passes the edge test (no barrier
//     bit the kind is not allowed; no kind is allowed one at M0, C-0245 (3)), and the grown patch passes the patch
//     test — area at most the band's top, compactness ≥ the floor (the patch's area over its convex hull's, C-0245
//     (7)), and no hole (one boundary loop); a face
//     whose absorption would enclose a hole is refused, so the hole splits off (C-0245 (7));
//   * the leftover rule: faces no grower could claim seed further districts in face-id order, each grown alone by the
//     same turns to its end before the next unclaimed face seeds (C-0245 (8));
//   * the merge rule: a district whose area ends below the band's floor merges into the neighbour with the longest
//     shared edge — among the neighbours across edges that pass the edge test, so no merge carries a district across
//     a barrier; one with no such neighbour stays and is reported — smallest first; a district grown from a seed of
//     rate < 1 is never merged away, so it keeps its seed face and the rates set its size (C-0245 (9));
//   * F-WORK (C-0085): when grower.turns reaches its limit, growth stops and the leftover rule assigns every face still
//     unowned without turns — each connected run of them (across edges that pass the edge test) one district — and the
//     result reports work_cut with the count (C-0245 (10)).
import type { Stream } from '@plat/kernel';
import { boundaryLoops, EDGE_TEST_BARRIERS, faceLineage, hullCompactness, type FaceGraph, type FaceLink } from './faces.js';
import type { GrowResult, GrowSeed, Grown, MergeRecord, SeedKind, TurnRecord } from './types.js';

/** The faces a grower may claim: the graph and, per face, whether it is claimable (inside, unowned, not water). */
export interface GrowFaces {
  readonly graph: FaceGraph;
  readonly claimable: readonly boolean[];
}

/** The grower's limits and rules. */
export interface GrowOptions {
  /** The district band [floor, top] (cm²): §4.5's [0.5, 1.5] × A ÷ N_d. */
  readonly bandCm2: readonly [number, number];
  /** The patch test's compactness floor (`district.patch.compactnessMin`, 0.5). */
  readonly compactnessMin: number;
  /** grower.turns' limit (F-WORK). */
  readonly turnLimit: number;
  /** The leftover rule's seeds' rate (`district.growthRate.other`). */
  readonly leftoverRate: number;
  /** The barrier bits a seed kind may cross (§4.5: "unless the seed kind allows it"); default none. */
  readonly allows?: (kind: SeedKind) => number;
}

/** The draws of one turn: a grower's seed lineage and its turn number → the turn's stream. */
export type TurnStream = (lineage: GrowSeed['lineage'], turn: number) => Stream;

/** A degenerate face (§4.1's S6 row: "a degenerate district face merges into its neighbour"): area ≤ 0. */
function degenerate(g: FaceGraph, i: number): boolean {
  return !(g.faces[i].areaCm2 > 0);
}

/**
 * §4.5's grower over `faces` from `seeds` (seed-id order; distinct claimable faces), its turns drawn from `stream`.
 * Throws a RangeError on seeds out of order, on a face that is not claimable or seeded twice, or on bad options.
 */
export function grow(seeds: readonly GrowSeed[], faces: GrowFaces, stream: TurnStream, opts: GrowOptions): GrowResult {
  const g = faces.graph;
  const n = g.faces.length;
  if (faces.claimable.length !== n) throw new RangeError('grow: the claimable mask is not one flag per face');
  if (!(opts.turnLimit >= 0 && Number.isFinite(opts.turnLimit))) throw new RangeError(`grow: the turn limit is a count ≥ 0, got ${String(opts.turnLimit)}`);
  const [floor, top] = opts.bandCm2;
  if (!(floor >= 0 && top >= floor)) throw new RangeError('grow: the band is [floor, top] with 0 ≤ floor ≤ top');
  const owner = new Int32Array(n).fill(-1);
  const byOrder = new Map<number, Grown>();
  const grown: Grown[] = [];
  const log: TurnRecord[] = [];
  const merges: MergeRecord[] = [];
  const leftovers: number[] = [];
  const finished = new Set<number>();
  let turns = 0;
  let workCut = false;
  const blocked = (kind: SeedKind): number => EDGE_TEST_BARRIERS & ~(opts.allows?.(kind) ?? 0);
  const passes = (l: FaceLink, kind: SeedKind): boolean => (l.barriers & blocked(kind)) === 0;

  const start = (seed: GrowSeed): Grown => {
    const f = g.faces[seed.face];
    const d: Grown = { seed, faces: [seed.face], areaCm2: f.areaCm2, perimeterCm: f.perimeterCm, turns: 0, mergedInto: -1 };
    owner[seed.face] = seed.order;
    byOrder.set(seed.order, d);
    grown.push(d);
    return d;
  };

  let last = -1;
  for (const s of seeds) {
    if (!(s.order > last)) throw new RangeError('grow: the seeds are not in seed-id order');
    last = s.order;
    if (!(s.face >= 0 && s.face < n) || !faces.claimable[s.face]) throw new RangeError(`grow: seed ${String(s.order)}'s face is not claimable`);
    if (owner[s.face] >= 0) throw new RangeError(`grow: seed ${String(s.order)}'s face is seeded twice`);
    if (!(s.rate >= 0 && s.rate <= 1)) throw new RangeError(`grow: seed ${String(s.order)}'s rate is not in [0, 1]`);
    start(s);
  }

  /** The admissible neighbours of a grower, in canonical face order (see the module comment). */
  const admissible = (d: Grown): number[] => {
    const cand = new Set<number>();
    for (const m of d.faces) for (const j of g.links[m].keys()) if (faces.claimable[j] && owner[j] < 0 && !degenerate(g, j)) cand.add(j);
    const sorted = [...cand].sort((a, b) => a - b);
    const out: number[] = [];
    const me = d.seed.order;
    for (const j of sorted) {
      let shared = 0;
      let ok = true;
      for (const [m, l] of g.links[j]) {
        if (owner[m] !== me) continue;
        if (!passes(l, d.seed.kind)) {
          ok = false;
          break;
        }
        shared += l.lengthCm;
      }
      if (!ok) continue;
      const f = g.faces[j];
      const area = d.areaCm2 + f.areaCm2;
      if (area > top) continue;
      if (hullCompactness(g, [...d.faces, j], area) < opts.compactnessMin) continue;
      if (boundaryLoops(g, [...d.faces, j], (i) => i === j || owner[i] === me) > 1) continue;
      out.push(j);
    }
    return out;
  };

  const absorb = (d: Grown, j: number): void => {
    let shared = 0;
    for (const [m, l] of g.links[j]) if (owner[m] === d.seed.order) shared += l.lengthCm;
    const f = g.faces[j];
    d.areaCm2 += f.areaCm2;
    d.perimeterCm += f.perimeterCm - 2 * shared;
    d.faces.push(j);
    owner[j] = d.seed.order;
  };

  /** One turn of `d`: false when the grower is finished. */
  const turn = (d: Grown): boolean => {
    const t = d.turns;
    d.turns += 1;
    turns += 1;
    const adm = admissible(d);
    if (adm.length === 0) {
      log.push({ seed: d.seed.order, turn: t, what: 'done' });
      return false;
    }
    const s = stream(d.seed.lineage, t);
    if (!s.bool(d.seed.rate)) {
      log.push({ seed: d.seed.order, turn: t, what: 'skip' });
      return true;
    }
    const j = adm[s.int(0, adm.length - 1)];
    absorb(d, j);
    log.push({ seed: d.seed.order, turn: t, what: 'absorb', face: j });
    return true;
  };

  /** Runs `ds` in rounds until every one is finished or the limit is reached (then workCut). */
  const rounds = (ds: readonly Grown[]): void => {
    for (;;) {
      let any = false;
      for (const d of ds) {
        if (finished.has(d.seed.order)) continue;
        if (turns >= opts.turnLimit) {
          workCut = true;
          return;
        }
        any = true;
        if (!turn(d)) finished.add(d.seed.order);
      }
      if (!any) return;
    }
  };

  rounds(grown.slice());

  // The leftover rule: each unclaimed face, in face-id order, seeds a district grown alone to its end.
  let next = last + 1;
  if (!workCut) {
    for (let i = 0; i < n; i += 1) {
      if (!faces.claimable[i] || owner[i] >= 0 || degenerate(g, i)) continue;
      const d = start({ order: next, kind: 'leftover', face: i, lineage: faceLineage(g.faces[i].key), rate: opts.leftoverRate });
      leftovers.push(next);
      next += 1;
      rounds([d]);
      if (workCut) break;
    }
  }
  // F-WORK: every face still unowned joins one district per connected run of them, without turns.
  if (workCut) {
    for (let i = 0; i < n; i += 1) {
      if (!faces.claimable[i] || owner[i] >= 0 || degenerate(g, i)) continue;
      const d = start({ order: next, kind: 'leftover', face: i, lineage: faceLineage(g.faces[i].key), rate: opts.leftoverRate });
      leftovers.push(next);
      next += 1;
      const queue = [i];
      while (queue.length > 0) {
        const m = queue.shift() as number;
        const nb = [...g.links[m].entries()].sort((a, b) => a[0] - b[0]);
        for (const [j, l] of nb) {
          if (!faces.claimable[j] || owner[j] >= 0 || degenerate(g, j) || !passes(l, 'leftover')) continue;
          absorb(d, j);
          queue.push(j);
        }
      }
    }
  }

  // Degenerate faces join the district across their longest shared edge that passes the edge test.
  for (let i = 0; i < n; i += 1) {
    if (!faces.claimable[i] || owner[i] >= 0) continue;
    let best = -1;
    let bestLen = -1;
    for (const [j, l] of [...g.links[i].entries()].sort((a, b) => a[0] - b[0])) {
      if (owner[j] < 0 || !passes(l, 'leftover')) continue;
      if (l.lengthCm > bestLen) {
        bestLen = l.lengthCm;
        best = owner[j];
      }
    }
    if (best >= 0) absorb(byOrder.get(best) as Grown, i);
  }

  // The merge rule (see the module comment).
  for (;;) {
    const small = grown.filter((d) => d.mergedInto < 0 && d.seed.rate >= 1 && d.areaCm2 < floor).sort((a, b) => a.areaCm2 - b.areaCm2 || a.seed.order - b.seed.order);
    let merged = false;
    for (const d of small) {
      const shared = new Map<number, number>();
      const bad = new Set<number>();
      for (const m of d.faces) {
        for (const [j, l] of g.links[m]) {
          const o = owner[j];
          if (o < 0 || o === d.seed.order) continue;
          if (!passes(l, d.seed.kind)) bad.add(o);
          shared.set(o, (shared.get(o) ?? 0) + l.lengthCm);
        }
      }
      let into = -1;
      let len = -1;
      for (const o of [...shared.keys()].sort((a, b) => a - b)) {
        if (bad.has(o)) continue;
        const s = shared.get(o) as number;
        if (s > len) {
          len = s;
          into = o;
        }
      }
      if (into < 0) continue;
      const target = byOrder.get(into) as Grown;
      merges.push({ from: d.seed.order, into, sharedCm: len, areaCm2: d.areaCm2 });
      for (const f of d.faces) {
        owner[f] = into;
        target.faces.push(f);
      }
      target.areaCm2 += d.areaCm2;
      target.perimeterCm += d.perimeterCm - 2 * len;
      d.mergedInto = into;
      merged = true;
      break;
    }
    if (!merged) break;
  }
  const belowFloor = grown.filter((d) => d.mergedInto < 0 && d.areaCm2 < floor).map((d) => d.seed.order);
  return { grown, owner, turns, turnLimit: opts.turnLimit, workCut, log, merges, leftovers, belowFloor };
}
