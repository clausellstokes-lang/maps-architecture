// J318 (C-0338; refining N-57 (3), C-0329): a split block's child records its seed STRICTLY INSIDE THE PARENT'S KERB AT
// THE CUT ON THE CHILD'S SIDE OF THE SPINE — the kerb component the ladder read for the block (`BlockFaces.kerb`, its
// outer ring) less the new spine's band, on that child's side of the spine's centreline — never in another component
// of the child FACE's kerb. Read here from the design, by the test's own geometry (the spine: the S8 lane whose
// centreline enters the block's recorded kerb; its band: half the lane's width; the side: the spine's centreline), never
// through the code under test or a harness.
//
// The fixture: the two-district fixture with, inside its west district, a 100 m × 45 m face whose kerb has two
// components — a dead-end lane from its north side stops 1.5 m short of its south side, so the lane's band separates a
// 2 394 m² west part from a 1 554 m² east part. The ladder reads the larger; where the face stops and the deep-interior
// rule splits it, one child FACE holds a part of the block and the whole other component: before this round its seed
// was that larger component's pole (`kerbSeed` without the parent — shown here on each run), outside the block.
// Fixture seeds 4 and 2 split it (a through alley and a back lane; found by a sweep of seeds 1–12, where 4, 9, 10, 12
// and 2 split the face); every split block of both runs is read the same way.
import { readFileSync } from 'node:fs';
import { pointLocate, STAGES, type KernelTx, type LatticePoint } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { kerbSeed, wayWidthCm, type BlockFaces, type S8Output } from '../../../src/index.js';
import { fixture, GROUND, kerbNow, P, runFixture, waySegments, type Fixture } from './support.js';

type XY = { readonly x: number; readonly y: number };

/** Twice a ring's signed area. */
function area2(r: readonly XY[]): number {
  let s = 0;
  for (let i = 0; i < r.length; i += 1) {
    const a = r[i];
    const b = r[(i + 1) % r.length];
    s += a.x * b.y - b.x * a.y;
  }
  return s;
}

/** The distance from p to segment a–b. */
function segDist(p: XY, a: XY, b: XY): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const l2 = dx * dx + dy * dy;
  const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / l2));
  return Math.hypot(a.x + t * dx - p.x, a.y + t * dy - p.y);
}

/** Even–odd inside, and the distance to the ring's boundary (cm). */
function inside(ring: readonly XY[], p: XY): { in: boolean; d: number } {
  let c = false;
  let d = Infinity;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const a = ring[i];
    const b = ring[j];
    if (a.y > p.y !== b.y > p.y && p.x < a.x + ((b.x - a.x) * (p.y - a.y)) / (b.y - a.y)) c = !c;
    d = Math.min(d, segDist(p, a, b));
  }
  return { in: c, d };
}

/** Strictly inside the ring. */
function strictlyIn(ring: readonly XY[], p: XY): boolean {
  const x = inside(ring, p);
  return x.in && x.d > 0;
}

/** A split block's spine as the design reads it: the S8 lane(s) whose centreline enters the block's kerb at the cut. */
interface Spine {
  readonly way: string;
  readonly segs: readonly [XY, XY][];
  readonly hw: number;
}

function spinesOf(f: Fixture, out: S8Output, stop: readonly XY[]): Spine[] {
  const spines: Spine[] = [];
  for (const w of out.lanes) {
    const segs = waySegments(f.plat, w.id);
    let enters = false;
    for (const [a, b] of segs) {
      const n = Math.max(1, Math.ceil(Math.hypot(b.x - a.x, b.y - a.y) / 50));
      for (let i = 0; i <= n && !enters; i += 1) {
        const q = { x: a.x + ((b.x - a.x) * i) / n, y: a.y + ((b.y - a.y) * i) / n };
        const x = inside(stop, q);
        if (x.in && x.d > 1) enters = true;
      }
      if (enters) break;
    }
    if (enters) spines.push({ way: w.id, segs, hw: wayWidthCm(w) / 2 });
  }
  return spines;
}

/** The distance from p to a spine's centreline, and p's side of it (the sign at its nearest segment). */
function toSpine(s: Spine, p: XY): { d: number; side: number } {
  let d = Infinity;
  let side = 0;
  for (const [a, b] of s.segs) {
    const e = segDist(p, a, b);
    if (e < d) {
      d = e;
      side = Math.sign((b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x));
    }
  }
  return { d, side };
}

/** The area (m²) of each side's part — the kerb at the cut less the spine's band, on that side — by a 25 cm grid. */
function partAreas(stop: readonly XY[], s: Spine): Map<number, number> {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const q of stop) {
    x0 = Math.min(x0, q.x);
    y0 = Math.min(y0, q.y);
    x1 = Math.max(x1, q.x);
    y1 = Math.max(y1, q.y);
  }
  const step = Math.max(25, Math.ceil(Math.max(x1 - x0, y1 - y0) / 400));
  const out = new Map<number, number>();
  for (let x = x0 + step / 2; x < x1; x += step) {
    for (let y = y0 + step / 2; y < y1; y += step) {
      const q = { x, y };
      if (!inside(stop, q).in) continue;
      const t = toSpine(s, q);
      if (t.d <= s.hw) continue;
      out.set(t.side, (out.get(t.side) ?? 0) + (step * step) / 1e4);
    }
  }
  return out;
}

/** A batch that writes nothing, for a read of the open overlay. */
const READ: KernelTx = { key: GROUND, level: 1, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S8 }, stage: STAGES.S8, rederivesFrom: STAGES.S8, workLimit: 100_000_000 };

/** The face: 100 m × 45 m at (40 m, 100 m), a dead-end lane from its north side at x = 100 m to 1.5 m off its south side. */
const OX = 4_000;
const OY = 10_000;
const FACE_A = P(OX + 3_000, OY + 2_250);
const FACE_B = P(OX + 8_000, OY + 2_250);

/** The two-district fixture with the face inside its west district (both of the face's components the district's). */
function twoDistrictsWithDeadEnd(seed: number): Fixture {
  const W = 40_000;
  const H = 30_000;
  return fixture(
    60_000,
    [
      { id: 'way:ring', cls: 'secondary', widthCm: 600, points: [P(0, 0), P(W, 0), P(W, H), P(0, H)], closed: true },
      { id: 'way:art', cls: 'primary', widthCm: 1000, points: [P(W / 2, 0), P(W / 2, H)] },
      { id: 'way:db', cls: 'lane', widthCm: 300, points: [P(OX, OY), P(OX + 10_000, OY), P(OX + 10_000, OY + 4_500), P(OX, OY + 4_500)], closed: true },
      { id: 'way:dead', cls: 'lane', widthCm: 300, points: [P(OX + 6_000, OY + 4_500), P(OX + 6_000, OY + 150)] },
    ],
    [
      { seeds: [P(2_000, 2_000), FACE_A], prosperity: 0.3, density: 0.5 },
      { seeds: [P((3 * W) / 4, H / 2)], prosperity: 0.3, density: 0.5 },
    ],
    { seed },
  );
}

/** Every split block of a run read against the parent's kerb at the cut; the verdicts and the target block's reading. */
function readSplits(f: Fixture, out: S8Output): { block: BlockFaces; spine: Spine; sides: number[]; areas: Map<number, number> }[] {
  const rows: { block: BlockFaces; spine: Spine; sides: number[]; areas: Map<number, number> }[] = [];
  for (const b of out.infill.blockFaces) {
    if (b.seeds.length < 2) continue;
    const spines = spinesOf(f, out, b.kerb);
    // One spine enters a split block's kerb at the cut (its own deep-interior lane).
    expect(spines.map((s) => s.way)).toHaveLength(1);
    const spine = spines[0];
    const sides: number[] = [];
    for (const s of b.seeds) {
      // Strictly inside the parent's kerb at the cut, outside the spine's band.
      expect(strictlyIn(b.kerb, s), `${b.block}: seed (${String(s.x)}, ${String(s.y)}) inside its kerb at the cut`).toBe(true);
      const t = toSpine(spine, s);
      expect(t.d, `${b.block}: seed (${String(s.x)}, ${String(s.y)}) outside the spine's band`).toBeGreaterThan(spine.hw);
      sides.push(t.side);
      // N-57 (3): strictly inside one ring of kerb(its L1 face).
      const at = pointLocate(f.plat, GROUND, 1, s);
      expect(at.on).toBe('face');
      if (at.on !== 'face') continue;
      const kr = kerbNow(f.k, at.face);
      expect(kr.filter((r) => area2(r) > 0 && strictlyIn(r, s))).toHaveLength(1);
    }
    // Each side's part holds exactly one of the children's seeds.
    expect(new Set(sides).size, `${b.block}: one seed on each side of the spine`).toBe(2);
    rows.push({ block: b, spine, sides, areas: partAreas(b.kerb, spine) });
  }
  return rows;
}

describe('a split child’s seed lies inside the parent’s kerb at the cut, on its side of the spine (J318, C-0338)', () => {
  it('the face’s kerb has two components separated by the dead-end lane’s band; the ladder reads the larger', { timeout: 120_000 }, () => {
    const f = twoDistrictsWithDeadEnd(4);
    const at = pointLocate(f.plat, GROUND, 1, FACE_A);
    const bt = pointLocate(f.plat, GROUND, 1, FACE_B);
    expect(at.on === 'face' && bt.on === 'face' && at.face === bt.face).toBe(true);
    if (at.on !== 'face') return;
    const outer = kerbNow(f.k, at.face).filter((r) => area2(r) > 0);
    expect(outer.map((r) => area2(r) / 2e4).sort((a, b) => b - a)).toEqual([2_394, 1_554]);
    expect(strictlyIn(outer.find((r) => area2(r) === 2_394 * 2e4) ?? [], FACE_A)).toBe(true);
  });

  for (const seed of [4, 2]) {
    it(`fixture seed ${String(seed)}: the face splits; each child's seed lies in the block's part on its side, never in the other component`, { timeout: 300_000 }, () => {
      const f = twoDistrictsWithDeadEnd(seed);
      const out = runFixture(f);
      const rows = readSplits(f, out);
      // The target: the split block whose kerb at the cut is one of the face's two components.
      const target = rows.filter((r) => strictlyIn(r.block.kerb, FACE_A) || strictlyIn(r.block.kerb, FACE_B));
      expect(target).toHaveLength(1);
      const t = target[0];
      // Both parts have area, and neither is seedless (two seeds, one a side — read above).
      for (const side of [-1, 1]) expect(t.areas.get(side) ?? 0).toBeGreaterThan(100);
      // Before this round (`kerbSeed` without the parent, the largest component of kerb(child)): the child holding the
      // other component recorded that component's pole — outside the block's kerb at the cut. Shown on the children now.
      let outsideBefore = 0;
      const r = f.k.tx(READ, (o) => {
        for (const s of t.block.seeds) {
          const loc = pointLocate(f.plat, GROUND, 1, s);
          if (loc.on !== 'face') continue;
          const old = kerbSeed(o, loc.face, f.widths);
          if (old !== null && !strictlyIn(t.block.kerb, old)) outsideBefore += 1;
          // With the parent (the rule): inside it — the recorded seed's definition (here read after the stage, so within
          // the drift of a kerb read at the cut against the stage's end, N-57 (4)).
          const now = kerbSeed(o, loc.face, f.widths, [t.block.kerb.slice()]);
          expect(now).not.toBeNull();
          if (now !== null) expect(strictlyIn(t.block.kerb, now)).toBe(true);
        }
        return { ok: true as const, value: undefined, warnings: [] };
      });
      expect(r.ok).toBe(true);
      expect(outsideBefore).toBe(1);
      expect(rows.length).toBeGreaterThan(0);
    });
  }

  it('kerbSeed with a parent: none for an empty parent or one no component of the kerb lies in; the unsplit pole for its own component', { timeout: 120_000 }, () => {
    const f = twoDistrictsWithDeadEnd(4);
    const at = pointLocate(f.plat, GROUND, 1, FACE_A);
    expect(at.on).toBe('face');
    if (at.on !== 'face') return;
    const kr = kerbNow(f.k, at.face);
    const big = kr.filter((r) => area2(r) > 0).sort((a, b) => area2(b) - area2(a));
    const got: (LatticePoint | null)[] = [];
    const r = f.k.tx(READ, (o) => {
      got.push(kerbSeed(o, at.face, f.widths));
      got.push(kerbSeed(o, at.face, f.widths, [big[0]]));
      got.push(kerbSeed(o, at.face, f.widths, [big[1]]));
      got.push(kerbSeed(o, at.face, f.widths, []));
      got.push(kerbSeed(o, at.face, f.widths, [[P(30_000, 1_000), P(31_000, 1_000), P(31_000, 2_000), P(30_000, 2_000)]]));
      return { ok: true as const, value: undefined, warnings: [] };
    });
    expect(r.ok).toBe(true);
    const [unsplit, inBig, inSmall, empty, away] = got;
    expect(unsplit).not.toBeNull();
    // The parent the larger component: the unsplit block's pole (the same definition).
    expect(inBig).toEqual(unsplit);
    // The parent the smaller one: that component's pole, inside it.
    expect(inSmall).not.toBeNull();
    if (inSmall !== null) {
      expect(strictlyIn(big[1], inSmall)).toBe(true);
      expect(strictlyIn(big[0], inSmall)).toBe(false);
    }
    expect(empty).toBeNull();
    expect(away).toBeNull();
  });

  // C-0338 (2), the closing check of round s5 (its mutant C06): where kerb(child) holds SEVERAL components inside the
  // parent, the seed is the LARGEST one's pole — never a fragment's, which would leave the part around the larger
  // component seedless (fusion 3 block:177024epxqk08: child face 370's kerb 0.2 + 415.0 m², both inside the parent;
  // the fragment's pole left the 420.6 m² part seedless). Pinned here on the dead-end face, the parent its whole L1 ring
  // (both of its kerb's components, 2 394 and 1 554 m², lie inside it), in either orientation of the ring.
  it('kerbSeed with a parent holding two components of the kerb: the larger’s pole, never the smaller’s', { timeout: 120_000 }, () => {
    const f = twoDistrictsWithDeadEnd(4);
    const at = pointLocate(f.plat, GROUND, 1, FACE_A);
    expect(at.on).toBe('face');
    if (at.on !== 'face') return;
    const kr = kerbNow(f.k, at.face);
    const big = kr.filter((r) => area2(r) > 0).sort((a, b) => area2(b) - area2(a));
    expect(big.map((r) => area2(r) / 2e4)).toEqual([2_394, 1_554]);
    const whole = [P(OX, OY), P(OX + 10_000, OY), P(OX + 10_000, OY + 4_500), P(OX, OY + 4_500)];
    // Both components lie inside the parent (their every vertex inside or on the face's ring).
    for (const r of big) for (const q of r) expect(inside(whole, q).in || inside(whole, q).d === 0).toBe(true);
    const got: (LatticePoint | null)[] = [];
    const r = f.k.tx(READ, (o) => {
      got.push(kerbSeed(o, at.face, f.widths));
      got.push(kerbSeed(o, at.face, f.widths, [whole]));
      got.push(kerbSeed(o, at.face, f.widths, [whole.slice().reverse()]));
      got.push(kerbSeed(o, at.face, f.widths, [big[1]]));
      return { ok: true as const, value: undefined, warnings: [] };
    });
    expect(r.ok).toBe(true);
    const [unsplit, both, bothReversed, small] = got;
    expect(unsplit).not.toBeNull();
    expect(both).not.toBeNull();
    if (both === null || small === null) return;
    // The larger component's pole: strictly inside the 2 394 m² component, not the 1 554 m² one; the unsplit pole.
    expect(strictlyIn(big[0], both)).toBe(true);
    expect(strictlyIn(big[1], both)).toBe(false);
    expect(both).toEqual(unsplit);
    expect(bothReversed).toEqual(both);
    // And not the smaller component's pole (what a smallest-first pick would give).
    expect(both).not.toEqual(small);
  });
});

/**
 * The CITY reproductions (J318; the c-06 builder's CITY probe, its row C-0333 (7) on wip/child-c06f0c: "integrated 4,
 * 7: (A); fusion 3: (A) and (B)"): each split block of the class as the CITY derivation (the flat CITY fixture's base
 * pipeline, integrated or fusion) left it, translated by `offset` — every L1 edge within 40 m of its two child faces
 * (each way's chain with its width; a district bound, setback or wall edge spineless), the block's kerb at the cut
 * (`BlockFaces.kerb`), the spine's way, and the block's recorded seeds before this round and after it. Extracted by the
 * builder's scratch probe of round s5 (outside plat/; nothing of the bench is imported here); fusion 3's class-B block
 * (block:3wge6h37j1r7q, M0-a-09 s5's, J318) is not one of them.
 */
interface CityCase {
  readonly name: string;
  readonly kind: 'integrated' | 'fusion';
  readonly seed: number;
  readonly block: string;
  readonly offset: readonly [number, number];
  readonly sideCm: number;
  readonly spine: string;
  readonly kerb: readonly (readonly [number, number])[];
  readonly seedsBefore: readonly (readonly [number, number])[];
  readonly seedsAfter: readonly (readonly [number, number])[];
  readonly ways: readonly { readonly id: string; readonly w: number | null; readonly closed: boolean; readonly pts: readonly (readonly [number, number])[] }[];
}

const CITY = JSON.parse(readFileSync(new URL('./city-split-seeds.json', import.meta.url), 'utf8')) as CityCase[];

const pt = (q: readonly [number, number]): LatticePoint => P(q[0], q[1]);

/** The case's arena: every way (the spine left out, or not); the spineless edges keep no width. */
function cityFixture(c: CityCase, withSpine: boolean): Fixture {
  const ways = c.ways.filter((w) => withSpine || w.id !== c.spine);
  const f = fixture(
    c.sideCm,
    ways.map((w) => ({ id: w.id, cls: 'lane' as const, widthCm: w.w ?? 1, points: w.pts.map(pt), closed: w.closed })),
    [{ seeds: c.seedsAfter.map(pt), prosperity: 0.5, density: 0.5 }],
  );
  for (const w of ways) if (w.w === null) f.widths.delete(w.id);
  return f;
}

/** The design's reading of one split: is each seed strictly inside the kerb at the cut, outside the spine's band, one a side? */
function partReading(kerbAtCut: readonly XY[], spine: Spine, seeds: readonly XY[]): { inside: boolean[]; outOfBand: boolean[]; sides: number[]; ok: boolean } {
  const insideRow = seeds.map((s) => strictlyIn(kerbAtCut, s));
  const outOfBand = seeds.map((s) => toSpine(spine, s).d > spine.hw);
  const sides = seeds.map((s) => toSpine(spine, s).side);
  return { inside: insideRow, outOfBand, sides, ok: insideRow.every((x) => x) && outOfBand.every((x) => x) && new Set(sides).size === 2 };
}

describe('the CITY reproductions: integrated 4 and 7, fusion 3 (J318) — red before, green after', () => {
  it('the three cases are the registered ones', () => {
    expect(CITY.map((c) => `${c.kind} ${String(c.seed)} ${c.block}`)).toEqual(['integrated 4 block:brek4wj2tntma', 'integrated 7 block:3db2tkbbrfw6r', 'fusion 3 block:9hfkbahxmkdbk']);
  });

  for (const c of CITY) {
    it(`${c.kind} ${String(c.seed)} ${c.block}: each side's part of the kerb at the cut holds exactly one seed — the recorded ones after, not before; kerbSeed with the parent on the rebuilt arena`, { timeout: 300_000 }, () => {
      const kerbAtCut = c.kerb.map(pt);
      // The arena without the spine: the face the ladder stopped on, its kerb's component the recorded kerb at the cut.
      const f0 = cityFixture(c, false);
      const at = pointLocate(f0.plat, GROUND, 1, pt(c.seedsAfter[0]));
      expect(at.on).toBe('face');
      if (at.on !== 'face') return;
      const comps = kerbNow(f0.k, at.face);
      const outer = comps.filter((r) => area2(r) > 0).sort((a, b) => area2(b) - area2(a));
      // Two components or more: the class (the ladder read the largest).
      expect(outer.length).toBeGreaterThanOrEqual(2);
      const parent = [outer[0], ...comps.filter((r) => area2(r) < 0 && strictlyIn(outer[0], r[0]))];
      expect(Math.abs(area2(parent[0]) - area2(kerbAtCut)) / area2(kerbAtCut)).toBeLessThan(0.01);
      // The arena with the spine: its two children.
      const f1 = cityFixture(c, true);
      const segs = waySegments(f1.plat, c.spine);
      const spineWay = c.ways.find((w) => w.id === c.spine);
      expect(segs.length > 0 && spineWay !== undefined && spineWay.w !== null).toBe(true);
      const spine: Spine = { way: c.spine, segs, hw: (spineWay?.w ?? 0) / 2 };
      // The recorded seeds: before this round one lies outside the kerb at the cut (in the other component); after it
      // both lie inside, one a side, outside the band.
      const before = partReading(kerbAtCut, spine, c.seedsBefore.map(pt));
      const after = partReading(kerbAtCut, spine, c.seedsAfter.map(pt));
      expect(before.ok).toBe(false);
      expect(before.inside.filter((x) => !x)).toHaveLength(1);
      expect(after).toEqual({ inside: [true, true], outOfBand: [true, true], sides: after.sides, ok: true });
      // Each side's part has area (no seedless part where the parent's part has area).
      const areas = partAreas(kerbAtCut, spine);
      for (const side of [-1, 1]) expect(areas.get(side) ?? 0).toBeGreaterThan(100);
      // The rule on the rebuilt arena: each child's kerbSeed with the parent lies in the parent's part on its side;
      // without it (the rule before this round) the child holding the other component gets that component's pole.
      const now: XY[] = [];
      const old: XY[] = [];
      const r = f1.k.tx(READ, (o) => {
        for (const s of c.seedsAfter) {
          const loc = pointLocate(f1.plat, GROUND, 1, pt(s));
          if (loc.on !== 'face') continue;
          const a = kerbSeed(o, loc.face, f1.widths, parent);
          const b = kerbSeed(o, loc.face, f1.widths);
          if (a !== null) now.push(a);
          if (b !== null) old.push(b);
        }
        return { ok: true as const, value: undefined, warnings: [] };
      });
      expect(r.ok).toBe(true);
      expect(now).toHaveLength(2);
      expect(partReading(kerbAtCut, spine, now).ok).toBe(true);
      expect(old).toHaveLength(2);
      expect(old.filter((q) => !strictlyIn(kerbAtCut, q))).toHaveLength(1);
    });
  }
});
