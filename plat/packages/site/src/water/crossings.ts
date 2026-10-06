// Crossing sites (M0-e-03; §4.2 S1 (5), GEO-17, J-P44): "One function, `siteCrossings(reaches, bandM,
// existingDecks)`, sites crossings: S1 runs it over every reach, S1's water operator over the re-traced reach only. The
// narrowest and shallowest reaches within the search band … become crossing sites, typed `ford` (width < table) or
// `bridge_site`, with a minimum spacing (FTG's 40 m as the default). Each site is a pinned deck: a bank-to-bank segment
// perpendicular to the local flow (the course tangent averaged over one channel width upstream and downstream)".
//
// Readings (C-0229 (5)): the search band is a window of `bandM` along each reach's course, from its first course point
// — every window offers its narrowest deck; "shallowest" has no measure at M0 (`depthCm` stays absent, C-0173 (7)), so
// the width alone ranks. A candidate stands at every interior course vertex whose one-width window up and downstream
// lies on the course: the flow there is the unit chord from the course point one width upstream to the one a width
// downstream; the deck is the line through the course vertex across that flow, cut at the first crossing of the
// reach's polygon on each side — both on the outer ring of the part holding the vertex (never an island's ring), its
// span at most DECK_SPAN_SHARE_MAX times the width there, each end DECK_CLEARANCE_CM clear of the arena's outer ring and
// of every other body's polygon. Within a window the candidates rank by span, then nearness to the window's middle,
// then course order; the windows are served narrowest first (then reach order, then window order), each taking its
// first candidate that keeps `minSpacingCm` from every deck taken and every existing deck (segment to segment). End 0 is
// the left bank looking downstream. A site is a `ford` when the reach's width there (its width profile) is below `fordMaxWidthCm`.
import type { Cm } from '@plat/model';
import type { LatticePoint } from '@plat/kernel';
import { arcLengths, pointAtArc, type XY } from '../hydro/course.js';
import { insideRings, quot, rayHit, ringGap, ringsDist2, segSeg2, type Reach } from './geometry.js';
import { DECK_CLEARANCE_CM, DECK_SPAN_SHARE_MAX } from './params.js';
import type { CrossingSite, Deck, WaterReach } from './types.js';

/** What `siteCrossings` reads besides its three arguments: the arena and the crossing cells (cm). */
export interface CrossingOptions {
  reach: Reach;
  minSpacingCm: number;
  fordMaxWidthCm: number;
}

function lp(q: XY): LatticePoint {
  return { x: Math.round(q.x) as Cm, y: Math.round(q.y) as Cm };
}

interface Candidate {
  site: CrossingSite;
  reach: number;
  window: number;
  mid: number;
}

/** The deck candidates of one reach (see the header), each with its window. */
function candidates(reaches: readonly WaterReach[], ri: number, bandCm: number, opts: CrossingOptions): Candidate[] {
  const r = reaches[ri];
  const course = r.body.course ?? [];
  const widths = r.body.widthProfile;
  const out: Candidate[] = [];
  if (course.length < 3 || widths === undefined || widths.length !== course.length) return out;
  const arcs = arcLengths(course);
  const total = arcs[arcs.length - 1];
  const others = reaches.filter((_, j) => j !== ri).flatMap((o) => o.parts.flatMap((p) => p.rings));
  const clear2 = DECK_CLEARANCE_CM * DECK_CLEARANCE_CM;
  const clearOf = (q: LatticePoint): boolean => ringGap(opts.reach, q) >= DECK_CLEARANCE_CM && (others.length === 0 || ringsDist2(others, q) >= clear2);
  for (let v = 1; v < course.length - 1; v += 1) {
    const s = arcs[v];
    const w = widths[v];
    if (s - w < 0 || s + w > total) continue;
    const up = pointAtArc(course, arcs, s - w);
    const down = pointAtArc(course, arcs, s + w);
    const dx = down.x - up.x;
    const dy = down.y - up.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len < 1) continue;
    const flow = { x: quot(dx, len), y: quot(dy, len) };
    const c = course[v];
    const pi = r.parts.findIndex((p) => insideRings(p.rings, c));
    if (pi < 0) continue;
    const rings = r.parts[pi].rings;
    const left = rayHit(rings, c, { x: -flow.y, y: flow.x });
    const right = rayHit(rings, c, { x: flow.y, y: -flow.x });
    if (left === null || right === null || left.ring !== 0 || right.ring !== 0) continue;
    const span = left.t + right.t;
    if (span > DECK_SPAN_SHARE_MAX * w) continue;
    const a = lp(left.at);
    const b = lp(right.at);
    if (a.x === b.x && a.y === b.y) continue;
    if (!clearOf(a) || !clearOf(b)) continue;
    const window = Math.floor(quot(s, bandCm));
    const site: CrossingSite = {
      water: r.body.id,
      type: w < opts.fordMaxWidthCm ? 'ford' : 'bridge_site',
      deck: [a, b],
      spanCm: Math.round(span),
      arcCm: Math.round(s),
      at: lp(c),
      flow,
      ends: [
        { part: pi, ring: 0, seg: left.seg },
        { part: pi, ring: 0, seg: right.seg },
      ],
    };
    out.push({ site, reach: ri, window, mid: Math.abs(s - (window + 0.5) * bandCm) });
  }
  return out;
}

/** Do two decks keep the spacing (their segments at least `spacing` apart)? */
function spaced(a: Deck, b: Deck, spacingCm: number): boolean {
  return segSeg2(a[0], a[1], b[0], b[1]) >= spacingCm * spacingCm;
}

/**
 * §4.2 S1 (5)'s `siteCrossings(reaches, bandM, existingDecks)` (see the header): the sites, in reach order then course
 * order. `bandM` is the search band in metres (`crossing.searchBandM`).
 */
export function siteCrossings(reaches: readonly WaterReach[], bandM: number, existingDecks: readonly Deck[], opts: CrossingOptions): CrossingSite[] {
  const bandCm = bandM * 100;
  if (!(bandCm >= 1)) throw new RangeError(`siteCrossings: a search band of ${String(bandM)} m`);
  // the windows, each with its ranked candidates
  const windows = new Map<string, Candidate[]>();
  const order: { key: string; reach: number; window: number }[] = [];
  for (let ri = 0; ri < reaches.length; ri += 1) {
    for (const c of candidates(reaches, ri, bandCm, opts)) {
      const key = `${String(ri)}/${String(c.window)}`;
      let list = windows.get(key);
      if (list === undefined) {
        list = [];
        windows.set(key, list);
        order.push({ key, reach: ri, window: c.window });
      }
      list.push(c);
    }
  }
  for (const list of windows.values()) {
    list.sort((a, b) => a.site.spanCm - b.site.spanCm || a.mid - b.mid || a.site.arcCm - b.site.arcCm);
  }
  // narrowest window first, then reach order, then window order
  order.sort((a, b) => {
    const sa = (windows.get(a.key) ?? [])[0].site.spanCm;
    const sb = (windows.get(b.key) ?? [])[0].site.spanCm;
    return sa - sb || a.reach - b.reach || a.window - b.window;
  });
  const taken: Candidate[] = [];
  for (const w of order) {
    for (const c of windows.get(w.key) ?? []) {
      const deck = c.site.deck;
      if (!existingDecks.every((d) => spaced(deck, d, opts.minSpacingCm))) continue;
      if (!taken.every((t) => spaced(deck, t.site.deck, opts.minSpacingCm))) continue;
      taken.push(c);
      break;
    }
  }
  taken.sort((a, b) => a.reach - b.reach || a.site.arcCm - b.site.arcCm);
  return taken.map((c) => c.site);
}
