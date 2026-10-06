// The typing stand-in (M0-e-04; §4.5 *Typing* (G-P5; MFP-7; J-P1); §6.1 `district.type`; C-0035; readings C-0242
// (12)): a data-driven scorer per district kind over the synthetic demand table (`s6.json`: the kinds central,
// market, gate, riverbank, craft and sprawl, each with its land share and its relation rows) — the remaining demand,
// the relation rows and a random term — with the districts typed greedily from the largest and a mixed-use floor.
//   * score(kind) = demandWeight · (the kind's remaining demand ÷ A) + Σ the weights of its `prefer` rows that hold
//     + randomWeight · u, u one uniform per kind in table order from the district's `district.type` stream; a
//     `require` row that does not hold makes the kind inadmissible (−∞), one that holds adds its weight;
//   * relations: 'plaza' (the district touches the main plaza's reservation), 'water' (it touches a shore or a bank),
//     'extramural' (its seed face lies outside the wall), 'seed.<kind>' (its seed was of that kind);
//   * greedy: the largest district first (ties by id), the best score wins (ties by table order), the kind's remaining
//     demand less the district's land;
//   * the mixed-use floor (R5): no single-use district unless requested — the district's use mix gives its own kind
//     1 − floor and the floor to the other kinds in proportion to their demand shares.
// Kinds are feature-named; wealth is no kind (the prosperity field's, §10.4).
import type { Stream } from '@plat/kernel';
import type { Id } from '@plat/model';
import { quot } from '../siting/geom.js';
import type { TypingCells } from './table.js';
import type { DistrictTyping } from './types.js';

/** One district as the scorer reads it. */
export interface TypingDistrict {
  readonly id: Id;
  readonly areaCm2: number;
  /** The relations that hold for it ('plaza', 'water', 'extramural', 'seed.<kind>'). */
  readonly relations: ReadonlySet<string>;
}

/** The typing's options. */
export interface TypingOptions {
  /** Districts whose single use was requested (R5's "unless requested"): their mix is their kind alone. */
  readonly singleUse?: ReadonlySet<Id>;
}

/**
 * §4.5's typing over `districts` (see the module comment): `demand` the synthetic demand table's cells, `stream` the
 * district's `district.type` stream. Returns one typing per district, in the input's order.
 */
export function typeDistricts(districts: readonly TypingDistrict[], demand: TypingCells, stream: (district: Id) => Stream, opts: TypingOptions = {}): DistrictTyping[] {
  let land = 0;
  for (const d of districts) land += d.areaCm2;
  const remaining = new Map<string, number>();
  let shareSum = 0;
  for (const k of demand.kinds) {
    remaining.set(k.kind, k.share * land);
    shareSum += k.share;
  }
  const order = districts
    .map((d, i) => ({ d, i }))
    .sort((a, b) => b.d.areaCm2 - a.d.areaCm2 || (a.d.id < b.d.id ? -1 : a.d.id > b.d.id ? 1 : 0));
  const out = new Array<DistrictTyping>(districts.length);
  for (const { d, i } of order) {
    const s = stream(d.id);
    const scores: [string, number][] = [];
    let best = '';
    let bestScore = -Infinity;
    for (const k of demand.kinds) {
      const u = s.float01();
      let score = demand.randomWeight * u + (land > 0 ? demand.demandWeight * quot(Math.max(0, remaining.get(k.kind) as number), land, 'area', 'the land') : 0);
      for (const r of k.relations) {
        const holds = d.relations.has(r.to);
        if (holds) score += r.weight;
        else if (r.mode === 'require') score = -Infinity;
      }
      scores.push([k.kind, score]);
      if (score > bestScore) {
        bestScore = score;
        best = k.kind;
      }
    }
    if (best === '') throw new RangeError(`typeDistricts: no kind is admissible for ${d.id} (every kind requires a relation it lacks)`);
    remaining.set(best, (remaining.get(best) as number) - d.areaCm2);
    const own = demand.kinds.find((k) => k.kind === best);
    const otherShare = shareSum - (own === undefined ? 0 : own.share);
    let mix: [string, number][];
    if (opts.singleUse?.has(d.id) === true || otherShare <= 0) mix = [[best, 1]];
    else {
      mix = [[best, 1 - demand.mixedUseFloor]];
      for (const k of demand.kinds) {
        if (k.kind === best || k.share <= 0) continue;
        mix.push([k.kind, demand.mixedUseFloor * quot(k.share * 1_000_000, otherShare * 1_000_000, 'count', 'the demand shares')]);
      }
    }
    out[i] = { district: d.id, kind: best, mix, scores };
  }
  return out;
}
