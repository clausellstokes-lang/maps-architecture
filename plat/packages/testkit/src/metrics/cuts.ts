// The bent-cut signature metrics (M0-k-05 with M0-b-04; §13.5's bent-cut row, §4.6; attachment A's `cut.*` measures
// restated on our cuts; C-0180 (7)). M0-b-04's harness records each of our cuts as a `MetricCut` (the start's place along
// the parent's OBB major axis in the recorded frame, the bends, the corner's place, the arrival, the fillet, the
// fillet-free length) and reads the signature through these functions, so one definition and one `metricVersion`
// serve ours and the comparison (C-0122's rule against a second measurement).
import type { MetricCut, MetricDoc } from './doc.js';
import { sampleStd } from './stats.js';

/** The subsets a cut belongs to (N-25): `all`, its face kind, and its template when the face carries one. */
export function cutSubsets(c: MetricCut): string[] {
  const out = ['all', c.faceKind];
  if (c.template !== undefined) out.push(`template-${c.template}`);
  return out;
}

function bySubset(doc: MetricDoc, pick: (c: MetricCut) => number | null): Map<string, number[]> {
  const out = new Map<string, number[]>();
  for (const c of doc.cuts ?? []) {
    const v = pick(c);
    if (v === null) continue;
    for (const s of cutSubsets(c)) {
      const list = out.get(s);
      if (list === undefined) out.set(s, [v]);
      else list.push(v);
    }
  }
  return out;
}

/** σ of the snapped start along the OBB major axis (§13.5: "start at N(0.5, σ)"): the sample standard deviation per subset. */
export function cutSigma(doc: MetricDoc): Map<string, number> {
  const out = new Map<string, number>();
  for (const [k, v] of bySubset(doc, (c) => c.startT)) {
    const s = sampleStd(v);
    if (!Number.isNaN(s)) out.set(k, s);
  }
  return out;
}

/** The corner within this share of mid-course (§13.5: "the corner within 0.10 of mid-course"). */
export const CORNER_MID_TOL = 0.1;
/** The arrival threshold in centidegrees (§13.5: "≥ 85° arrival"). */
export const ARRIVAL_MIN_CDEG = 8500;

function share(values: readonly number[]): number {
  let s = 0;
  for (const v of values) s += v;
  return s / values.length;
}

/** The share of one-bend cuts whose corner lies within 0.10 of mid-course, per subset. */
export function cutCornerMid(doc: MetricDoc): Map<string, number> {
  const m = bySubset(doc, (c) => (c.bends === 1 && c.cornerT !== undefined ? (Math.abs(c.cornerT - 0.5) <= CORNER_MID_TOL ? 1 : 0) : null));
  return new Map([...m].map(([k, v]) => [k, share(v)]));
}

/** The share of cuts arriving at ≥ 85°, per subset. */
export function cutArrival85(doc: MetricDoc): Map<string, number> {
  const m = bySubset(doc, (c) => (c.arrivalCdeg >= ARRIVAL_MIN_CDEG ? 1 : 0));
  return new Map([...m].map(([k, v]) => [k, share(v)]));
}

/** The share of one-bend cuts whose corner is filleted (the recorded corners), per subset. */
export function cutFillet(doc: MetricDoc): Map<string, number> {
  const m = bySubset(doc, (c) => (c.bends === 1 ? (c.fillet ? 1 : 0) : null));
  return new Map([...m].map(([k, v]) => [k, share(v)]));
}

/** The fillet-free course lengths in metres, per subset (the cut-lengths-per-face row's distribution, C-0086). */
export function cutLengths(doc: MetricDoc): Map<string, number[]> {
  return bySubset(doc, (c) => c.lengthCm / 100);
}
