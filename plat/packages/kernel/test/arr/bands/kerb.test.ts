// M0-a-09: kerb(F) (§3.7 *The kerb, defined once*; §3.4 `kerb`; §2.2 rule 5) — the spine-less face (kerb(F) = F, one
// built block), the sharp concave corners at junctions, the half-width sampled per segment end from a knot profile, the
// declared square end against the round one, and the T-junction that carries no knot and changes no sampled
// half-width. Expected rings are written from the definition (offset lines met by hand), never from the code.
import { describe, expect, it } from 'vitest';
import { handleOf, roleIdOf, rowsOn, type Plat } from '../../../src/arena/index.js';
import { insertChain } from '../../../src/insert/index.js';
import { sampleChain } from '../../../src/tx/index.js';
import { kerb, readFace } from '../../../src/arr/kerb.js';
import { corridorUnion } from '../../../src/arr/corridorUnion.js';
import {
  area2Of,
  AT_S9,
  commit,
  edgesWithRole,
  faceAt,
  framed,
  healthy,
  normal,
  normals,
  own,
  profile,
  pt,
  way,
  widthsOf,
} from './support.js';

const W300 = widthsOf({ 'way:1': 300, 'way:2': 300 });

/** kerb(F) read in a batch of `level` that writes nothing (the read-only service on the open overlay). */
function kerbIn(p: Plat, face: number, widths = W300, level: 1 | 2 = 1): ReturnType<typeof kerb> {
  let out: ReturnType<typeof kerb> | null = null;
  commit(p, level, (o) => {
    out = kerb(o, face, widths);
    return { ok: true, value: null, warnings: [] };
  });
  return out as unknown as ReturnType<typeof kerb>;
}

describe('kerb(F) (§3.7)', () => {
  it('a face with no bounding spine: kerb(F) = F, and corridorUnion leaves it one built block with no kerb or corridor_split edge', () => {
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(1000, 1000), pt(3000, 1000), pt(3000, 2500), pt(1000, 2500)], [{ role: 'district_bound', entity: 'district:7' }], 'mandatory', { closed: true }));
    const [f] = own(p, 'district:7', [[2000, 2000]]);
    const k = kerbIn(p, f);
    expect(k.ok).toBe(true);
    if (!k.ok) return;
    // exactly F's ring, counter-clockwise from its lowest-leftmost vertex
    expect(k.value).toEqual([[pt(1000, 1000), pt(3000, 1000), pt(3000, 2500), pt(1000, 2500)]]);
    expect(k.warnings).toEqual([]);
    const before = edgesWithRole(p, 'district_bound');
    const r = commit(p, 2, (o) => corridorUnion(o, [f], W300), AT_S9);
    expect(r.record).toBeNull();
    expect(r.value).toEqual({ band: [], strips: [], wedges: [], blocks: [], whole: [f], wholeBand: [] });
    expect(edgesWithRole(p, 'kerb')).toEqual([]);
    expect(edgesWithRole(p, 'corridor_split')).toEqual([]);
    expect(edgesWithRole(p, 'district_bound')).toEqual(before);
    healthy(p);
  });

  it('a crossing: F less the two strips, the block corner sharp at the offset lines’ meeting point', () => {
    const p = framed();
    way(p, 'way:1', [[0, 2000], [4000, 2000]]);
    way(p, 'way:2', [[2000, 0], [2000, 4000]]);
    const [ll, lr, ul, ur] = own(p, 'district:1', [[1000, 1000], [3000, 1000], [1000, 3000], [3000, 3000]]);
    const ws = widthsOf({ 'way:1': 300, 'way:2': 250 });
    const at = (f: number): string[] => {
      const k = kerbIn(p, f, ws);
      expect(k.ok).toBe(true);
      return k.ok ? normals(k.value) : [];
    };
    expect(at(ll)).toEqual(['0,0 1750,0 1750,1700 0,1700']);
    expect(at(lr)).toEqual(['2250,0 4000,0 4000,1700 2250,1700']);
    expect(at(ul)).toEqual(['0,2300 1750,2300 1750,4000 0,4000']);
    expect(at(ur)).toEqual(['2250,2300 4000,2300 4000,4000 2250,4000']);
  });

  it('a half-width profile is sampled per segment end: the strip is the trapezoid between the two ends’ half-widths (§2.2 rule 5)', () => {
    const p = framed();
    // way:1's half-width runs 200 → 600 along it (knots on its two ends); way:2 crosses it at x = 2000, a route vertex
    way(p, 'way:1', [[0, 2000], [4000, 2000]], [0, 1]);
    way(p, 'way:2', [[2000, 0], [2000, 4000]]);
    const [ll, ul, lr] = own(p, 'district:1', [[1000, 1000], [1000, 3000], [3000, 1000]]);
    const ws = widthsOf({ 'way:1': profile([200, 600]), 'way:2': 300 });
    const k1 = kerbIn(p, ll, ws);
    const k2 = kerbIn(p, ul, ws);
    const k3 = kerbIn(p, lr, ws);
    expect(k1.ok && k2.ok && k3.ok).toBe(true);
    if (!k1.ok || !k2.ok || !k3.ok) return;
    // hw(x) = 200 + 400·x/4000: 200 at x = 0, 370 at the corner x = 1700, 430 at x = 2300, 600 at x = 4000
    expect(normals(k1.value)).toEqual(['0,0 1700,0 1700,1630 0,1800']);
    expect(normals(k2.value)).toEqual(['0,2200 1700,2370 1700,4000 0,4000']);
    expect(normals(k3.value)).toEqual(['2300,0 4000,0 4000,1400 2300,1570']);
    // the samples the read takes: per route vertex of way:1, 200 / 400 / 600
    const read = readFace(p, ll, ws);
    const s = [...read.spines.values()].find((x) => x.chain.entity === 'way:1');
    expect(s?.lines.map((l) => l.hw)).toEqual([[200, 400, 600]]);
  });

  it('a dead end’s declared square end extends the strip by the half-width; a round end is chords of ≤ 2 cm sagitta', () => {
    const build = (ends: 'round' | 'square' | 'default'): string[] => {
      const p = framed();
      way(p, 'way:1', [[0, 2000], [4000, 2000]]);
      way(p, 'way:3', [[2000, 2000], [2000, 1000]]);
      const [low] = own(p, 'district:1', [[500, 500]]);
      const k = kerbIn(p, low, widthsOf({ 'way:1': 300, 'way:3': ends === 'default' ? 200 : { halfWidthCm: 200, ends } }));
      expect(k.ok).toBe(true);
      return k.ok ? k.value.flat().map((q) => `${String(q.x)},${String(q.y)}`) : [];
    };
    const square = build('square');
    expect(square).toContain('1800,800');
    expect(square).toContain('2200,800');
    // an end declared neither way is round (§3.7: "square ends where declared")
    expect(build('default')).toEqual(build('round'));
    const round = build('round');
    expect(round).not.toContain('1800,800');
    expect(round).not.toContain('2200,800');
    // the arc's chords lie on the circle of radius 200 about (2000, 1000) to the lattice, and reach its far point
    const arc = round.map((s) => s.split(',').map(Number)).filter(([x, y]) => y < 1000 && x > 1700 && x < 2300);
    expect(arc.length).toBeGreaterThan(8);
    for (const [x, y] of arc) expect(Math.abs(Math.hypot(x - 2000, y - 1000) - 200)).toBeLessThanOrEqual(1);
    expect(Math.min(...arc.map(([, y]) => y))).toBeLessThanOrEqual(801);
  });

  it('a T-junction inserted into a spine carries no knot and changes no sampled half-width (§3.7; §2.2 rule 5)', () => {
    const p = framed();
    way(p, 'way:1', [[0, 2000], [4000, 2000]], [0, 1]);
    const [low] = own(p, 'district:1', [[2000, 1000]]);
    const prof = profile([200, 600]);
    const ws = widthsOf({ 'way:1': prof });
    const key = p.key;
    const before = sampleChain(p, prof, { role: 'way', entity: 'way:1' }, key, 50 as never);
    const kBefore = kerbIn(p, low, ws);
    expect(kBefore.ok).toBe(true);
    if (!kBefore.ok) return;
    expect(normals(kBefore.value)).toEqual(['0,0 4000,0 4000,1400 0,1800']);
    // S8's lane: a T-junction on way:1 at x = 1000 (a lane with no declared half-width)
    commit(p, 1, (o) => insertChain(o, [pt(1000, 0), pt(1000, 2000)], [{ role: 'way', entity: 'lane:1' }], 'mandatory'));
    const t = (() => {
      for (let v = 0; v < p.slots.vertex.top; v += 1) if (p.vertices.x[v] === 1000 && p.vertices.y[v] === 2000) return v;
      return -1;
    })();
    expect(t).toBeGreaterThanOrEqual(0);
    const knot = roleIdOf('width_knot');
    expect(rowsOn(p, 'vertex', t).filter((r) => p.roles.kind[r] === knot && p.roles.entity[r] === handleOf(p, 'way:1'))).toEqual([]);
    expect(sampleChain(p, prof, { role: 'way', entity: 'way:1' }, key, 50 as never)).toEqual(before);
    const left = faceAt(p, 1, 500, 500);
    const right = faceAt(p, 1, 2000, 500);
    const kl = kerbIn(p, left, ws);
    const kr = kerbIn(p, right, ws);
    expect(kl.ok && kr.ok).toBe(true);
    if (!kl.ok || !kr.ok) return;
    // the half-width at the T vertex is the profile's sample there (300 at x = 1000), on both sides of the lane
    expect(normals(kl.value)).toEqual(['0,0 1000,0 1000,1700 0,1800']);
    expect(normals(kr.value)).toEqual(['1000,0 4000,0 4000,1400 1000,1700']);
    expect(area2Of(kl.value) + area2Of(kr.value)).toBe(area2Of(kBefore.value));
  });

  it('a crossing’s junction gives four wedges; the far side of a T has no corner, one split to its perpendicular foot', () => {
    const p = framed();
    way(p, 'way:1', [[0, 2000], [4000, 2000]]);
    way(p, 'way:3', [[2000, 2000], [2000, 1000]]);
    const [low, high] = own(p, 'district:1', [[500, 500], [500, 3500]]);
    const ws = widthsOf({ 'way:1': 300, 'way:3': 200 });
    const r = commit(p, 2, (o) => corridorUnion(o, [low, high], ws), AT_S9);
    healthy(p);
    const v = r.value as { wedges: number[]; strips: number[]; blocks: number[] };
    // the antenna's root is two corners of the lower face: two wedges (J, the feet, K) beside it
    expect(v.wedges.length).toBe(2);
    expect(v.blocks.length).toBe(2);
    expect(edgesWithRole(p, 'corridor_split')).toEqual([
      '1800,1700-2000,1700',
      '2000,1700-2200,1700',
      '1800,1700-1800,2000',
      '2200,1700-2200,2000',
      '2000,2000-2000,2300',
    ].sort());
    // the upper face: way:1 passes straight through the T vertex, its two strips split there
    const up = r.value as { strips: number[] };
    expect(up.strips.length).toBe(2 + 3);
    expect(normal([pt(0, 2300), pt(4000, 2300), pt(4000, 4000), pt(0, 4000)])).toBe('0,2300 4000,2300 4000,4000 0,4000');
  });
});
