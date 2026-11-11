// check/M0-a-11-close-s6 — the closing checker's own probe library (hardening round S6, Q67 (B): the skeleton's contract
// angle 1° for `spine` and `regions`, 5° for `roof`). Our own construction: it classes a face by the sharpest corner of
// its CLEANED rings (the kernel's pre-clean, read through `prepareRings(rings, 'spine')`; the angle itself is measured
// here from the definition, never with the code under test) and reads `skeleton(rings, use)` for the three uses.
// Run from plat/ with: corepack pnpm exec tsx --conditions=plat-source docs/build/checks/M0-a-11-s6-evidence/<probe>.mjs …
import { prepareRings } from '../../../../packages/kernel/src/skeleton/prepare.ts';
import { skeleton, validateSkeleton } from '../../../../packages/kernel/src/skeleton/index.ts';

const DEG = 57.29577951308232;

/** The fold angle (degrees) at vertex v between its neighbours p and q: 0° a fold-back, 180° straight on — the smaller of the interior angle and 360° minus it. */
export function foldDeg(p, v, q) {
  const ux = p.x - v.x;
  const uy = p.y - v.y;
  const wx = q.x - v.x;
  const wy = q.y - v.y;
  return Math.atan2(Math.abs(wx * uy - wy * ux), wx * ux + wy * uy) * DEG;
}

/** The sharpest corner of a ring set: its fold angle, ring, vertex index and whether it is reflex (the rings oriented outer ccw, holes cw). */
export function sharpest(rings) {
  let best = { deg: 360, ring: -1, i: -1, reflex: false };
  for (let k = 0; k < rings.length; k += 1) {
    const r = rings[k];
    const n = r.length;
    for (let i = 0; i < n; i += 1) {
      const p = r[(i + n - 1) % n];
      const v = r[i];
      const q = r[(i + 1) % n];
      const d = foldDeg(p, v, q);
      if (d < best.deg) best = { deg: d, ring: k, i, reflex: (v.x - p.x) * (q.y - v.y) - (v.y - p.y) * (q.x - v.x) < 0 };
    }
  }
  return best;
}

/** One use's outcome, as a short class string, and the graph when validated. */
export function outcome(rings, use) {
  const t0 = performance.now();
  let r;
  try {
    r = skeleton(rings, use);
  } catch (e) {
    return { cls: `THROW ${String(e && e.message).slice(0, 120)}`, ms: performance.now() - t0, graph: null };
  }
  const ms = performance.now() - t0;
  if (!r.ok) return { cls: `ERROR ${r.code}`, ms, graph: null };
  const v = r.value;
  if (v.kind === 'skeleton') {
    const again = validateSkeleton(v);
    const warn = r.warnings.length;
    return { cls: again.ok && warn === 0 ? 'validated' : `UNVALIDATED-OUTPUT ${again.ok ? `warnings ${String(warn)}` : `${again.check}: ${again.detail}`}`, ms, graph: v };
  }
  const c = v.cause;
  const reported = r.warnings.length === 1 && r.warnings[0].code === 'W_DOWNGRADE';
  const tag = c.code === 'contract' ? `contract:${c.refusal}` : c.code === 'validator' ? `validator:${c.check}` : 'E_WORK_LIMIT';
  return { cls: `downgrade ${tag}${reported ? '' : ' UNREPORTED'}`, ms, graph: null, detail: c.code === 'validator' ? c.detail : undefined };
}

/** Our own reading of a validated graph: a connected graph with h independent cycles, every node in or on the face, no two arcs crossing away from their ends. '' when it holds. */
export function independent(graph) {
  const { nodes, arcs, rings } = graph;
  const h = rings.length - 1;
  const parent = nodes.map((_, i) => i);
  const find = (i) => {
    while (parent[i] !== i) {
      parent[i] = parent[parent[i]];
      i = parent[i];
    }
    return i;
  };
  let comps = nodes.length;
  for (const a of arcs) {
    const x = find(a.a);
    const y = find(a.b);
    if (x !== y) {
      parent[x] = y;
      comps -= 1;
    }
  }
  if (comps !== 1) return `not connected: ${String(comps)} components`;
  if (arcs.length !== nodes.length - 1 + h) return `cycles: ${String(arcs.length)} arcs, ${String(nodes.length)} nodes, ${String(h)} holes`;
  const segs = [];
  for (const r of rings) for (let i = 0; i < r.length; i += 1) segs.push([r[i], r[(i + 1) % r.length]]);
  const dist2 = (p, a, b) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const l2 = dx * dx + dy * dy;
    const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2));
    const ex = p.x - a.x - t * dx;
    const ey = p.y - a.y - t * dy;
    return ex * ex + ey * ey;
  };
  for (let j = 0; j < nodes.length; j += 1) {
    const p = nodes[j];
    let inside = false;
    let near = Infinity;
    for (const [a, b] of segs) {
      near = Math.min(near, dist2(p, a, b));
      if (a.y > p.y !== b.y > p.y && p.x < a.x + ((p.y - a.y) * (b.x - a.x)) / (b.y - a.y)) inside = !inside;
    }
    if (!inside && near > 1) return `node ${String(j)} (${String(p.x)}, ${String(p.y)}) lies ${Math.sqrt(near).toFixed(2)} cm outside the face`;
    if (!(p.t >= 0) || !Number.isFinite(p.x) || !Number.isFinite(p.y)) return `node ${String(j)} is not finite or has t < 0`;
  }
  const o = (a, b, c) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
  for (let i = 0; i < arcs.length; i += 1) {
    const a = nodes[arcs[i].a];
    const b = nodes[arcs[i].b];
    for (let j = i + 1; j < arcs.length; j += 1) {
      const c = nodes[arcs[j].a];
      const d = nodes[arcs[j].b];
      const d1 = o(a, b, c);
      const d2 = o(a, b, d);
      const d3 = o(c, d, a);
      const d4 = o(c, d, b);
      if (d1 * d2 < 0 && d3 * d4 < 0) {
        const t = d1 / (d1 - d2);
        const x = c.x + t * (d.x - c.x);
        const y = c.y + t * (d.y - c.y);
        const far = Math.min(Math.hypot(x - a.x, y - a.y), Math.hypot(x - b.x, y - b.y), Math.hypot(x - c.x, y - c.y), Math.hypot(x - d.x, y - d.y));
        if (far > 0.5) return `arcs ${String(i)} and ${String(j)} cross ${far.toFixed(2)} cm from their ends`;
      }
    }
  }
  return '';
}

/** Are two validated graphs equal apart from `use`? */
export function sameApartFromUse(a, b) {
  return JSON.stringify({ ...a, use: '' }) === JSON.stringify({ ...b, use: '' });
}

/**
 * Reads one face: its class by the cleaned rings' sharpest corner — 'band' [1°, 5°) (the faces the 1° bound newly
 * admits), 'below1' (the spine contract refuses a sharp corner), 'other-refusal', or 'plain' (≥ 5°) — and the three
 * uses' outcomes.
 */
export function readFace(rings) {
  const prep = prepareRings(rings, 'spine');
  const roof = outcome(rings, 'roof');
  const spine = outcome(rings, 'spine');
  const regions = outcome(rings, 'regions');
  let cls;
  let s = null;
  if (!prep.ok) cls = prep.refusal === 'sharpCorner' ? 'below1' : `refused:${prep.refusal}`;
  else {
    s = sharpest(prep.value.rings);
    cls = s.deg < 5 ? 'band' : 'plain';
  }
  const eq = spine.graph !== null && regions.graph !== null ? sameApartFromUse(spine.graph, regions.graph) : spine.cls === regions.cls;
  const roofEq = roof.graph !== null && spine.graph !== null ? sameApartFromUse(roof.graph, spine.graph) : roof.cls === spine.cls;
  const ind = spine.graph !== null ? independent(spine.graph) : '';
  const n = prep.ok ? prep.value.n : rings.reduce((a, r) => a + r.length, 0);
  return { cls, sharp: s, roof, spine, regions, spineEqRegions: eq, roofEqSpine: roofEq, independent: ind, n, holes: rings.length - 1 };
}

/** A tally of faces read: counts by class and outcome, the band's rows, and every face worth keeping. */
export function newTally() {
  return { faces: 0, classes: {}, roof: {}, spine: {}, regions: {}, band: { faces: 0, spineValidated: 0, regionsValidated: 0, roofRefusedSharp: 0, convex: 0, reflex: 0, holed: 0, minDeg: 360, maxDeg: 0 }, movedOutsideBand: 0, causeMoved: 0, causeMoves: {}, spineNeRegions: 0, independentFails: 0, maxMs: 0, kept: [] };
}

const bump = (o, k) => {
  o[k] = (o[k] ?? 0) + 1;
};

export function add(tally, id, rings, f, keepBand = false) {
  tally.faces += 1;
  bump(tally.classes, f.cls);
  bump(tally.roof, f.roof.cls);
  bump(tally.spine, f.spine.cls);
  bump(tally.regions, f.regions.cls);
  tally.maxMs = Math.max(tally.maxMs, f.roof.ms, f.spine.ms, f.regions.ms);
  let keep = null;
  if (f.cls === 'band') {
    const b = tally.band;
    b.faces += 1;
    if (f.spine.cls === 'validated') b.spineValidated += 1;
    if (f.regions.cls === 'validated') b.regionsValidated += 1;
    if (f.roof.cls === 'downgrade contract:sharpCorner') b.roofRefusedSharp += 1;
    bump(b, f.sharp.reflex ? 'reflex' : 'convex');
    if (f.holes > 0) b.holed += 1;
    b.minDeg = Math.min(b.minDeg, f.sharp.deg);
    b.maxDeg = Math.max(b.maxDeg, f.sharp.deg);
    if (f.spine.cls !== 'validated' || f.regions.cls !== 'validated') keep = 'band face not validated';
    else if (keepBand) keep = 'band';
  } else if (!f.roofEqSpine) {
    if (f.roof.graph === null && f.spine.graph === null) {
      // both uses downgrade, under different causes (the roof's 5° refusal precedes a check the 1° bound lets the face reach)
      tally.causeMoved += 1;
      bump(tally.causeMoves, `${f.roof.cls} -> ${f.spine.cls}`);
    } else {
      tally.movedOutsideBand += 1;
      keep = 'roof and spine differ outside the band';
    }
  }
  if (!f.spineEqRegions) {
    tally.spineNeRegions += 1;
    keep = 'spine and regions differ';
  }
  if (f.independent !== '') {
    tally.independentFails += 1;
    keep = `independent check: ${f.independent}`;
  }
  for (const u of [f.roof, f.spine, f.regions]) if (/THROW|ERROR|UNVALIDATED|UNREPORTED|E_WORK_LIMIT/.test(u.cls)) keep = `outcome ${u.cls}`;
  if (keep !== null) {
    tally.kept.push({ id, why: keep, cls: f.cls, deg: f.sharp === null ? null : Number(f.sharp.deg.toFixed(4)), reflex: f.sharp?.reflex ?? null, n: f.n, holes: f.holes, roof: f.roof.cls, spine: f.spine.cls, regions: f.regions.cls, detail: f.spine.detail ?? f.regions.detail, rings: keep === 'band' ? undefined : rings.map((r) => r.map((p) => [p.x, p.y])) });
  }
}
