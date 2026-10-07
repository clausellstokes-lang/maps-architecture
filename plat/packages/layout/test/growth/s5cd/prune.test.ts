// The between-stage prune and trim (§4.4 S5c *Between stages*; §4.1's S5 row; C-0254 (8)) on the flat fixture's town, S5
// run stage by stage: S4 and S5b arterials are never trimmed (their committed lines identical before and after, even an
// arterial handed to the trim as a provisional street); provisional streets are cut back where they first leave the
// unwalled stage's boundary; dangling secondaries under one block width are pruned, and every dangling secondary left
// is at least one block width long.
import { describe, expect, it } from 'vitest';
import { flatFixture } from '../../../src/index.js';
import { growthStart, mainRoadsStep, mainRoadStream, traceStep, wayLines, type GrowthState } from '../../../src/growth/index.js';
import { growthStep, growthStreams, type GrownStreet, type S5cRecord } from '../../../src/growth/proposals.js';
import { pruneAndTrim, type PruneRecord } from '../../../src/growth/prune.js';
import { baseRun, GROUND, insideRing, polyLength, segDist } from './support.js';

type Line = { readonly way: string; readonly runs: readonly { readonly points: readonly { x: number; y: number }[] }[] };

/** The same line on the ground: each line's points within 1 cm of the other's polyline, ends kept (a vertex the kernel
 * dissolved where a pruned street left an arterial changes no geometry). */
function sameGround(before: readonly Line[], after: readonly Line[]): boolean {
  if (before.length !== after.length) return false;
  const near = (p: { x: number; y: number }, l: Line): boolean => l.runs.some((r) => r.points.some((q, i) => i > 0 && segDist(p, r.points[i - 1], q) < 1));
  return before.every((b, i) => {
    const a = after[i];
    if (a.way !== b.way || a.runs.length !== b.runs.length) return false;
    const ends = (l: Line): string => JSON.stringify(l.runs.map((r) => [r.points[0], r.points[r.points.length - 1]]));
    return ends(a) === ends(b) && b.runs.every((r) => r.points.every((p) => near(p, a))) && a.runs.every((r) => r.points.every((p) => near(p, b)));
  });
}

interface StageRun {
  k: number;
  before: { arterials: Line[]; streets: Map<string, GrownStreet>; lines: Map<string, string> };
  rec: S5cRecord;
  pr: PruneRecord;
  /** Each pruned way's runs left in the arena right after its prune (a later stage may re-take a pruned id, C-0244 (7)). */
  left: Map<string, number>;
}

/** S5 through every stage's growth and its prune and trim (S5d aside), the arena read before and after each prune. */
function stepwise(seed: number): { state: GrowthState; stages: StageRun[] } {
  const b = baseRun(flatFixture(seed, { frameAreaHa: 900 }));
  const state = growthStart({ slice: b.slice, commit: b.commit, s4: b.s4, kernel: b.k });
  const mainroad = mainRoadStream(b.slice);
  const streams = growthStreams(b.slice);
  const out: StageRun[] = [];
  for (let k = 1; k <= 3; k += 1) {
    if (k >= 2) {
      if (!mainRoadsStep(state, k, mainroad).ok) throw new Error('S5b refused');
      if (!traceStep(state, k).ok) throw new Error('S5a refused');
    }
    const c = growthStep(state, k, streams);
    if (!c.ok) throw new Error(`S5c refused: ${c.detail}`);
    const grown = new Set(c.value.streets.map((s) => s.way.id));
    const arterials = state.ways.filter((w) => !grown.has(w.id) && (w.class === 'through' || w.class === 'primary')).map((w) => w.id);
    const lines = new Map(wayLines(b.k, state.ways.map((w) => w.id), GROUND).map((l) => [l.way, JSON.stringify(l.runs.map((r) => r.points))]));
    const before = {
      arterials: wayLines(b.k, arterials, GROUND),
      streets: new Map(c.value.streets.map((s) => [s.way.id, { ...s, points: s.points.slice() }])),
      lines,
    };
    const pr = pruneAndTrim({ state, k, record: c.value });
    if (!pr.ok) throw new Error(`prune refused: ${pr.detail}`);
    expect(sameGround(before.arterials, wayLines(b.k, arterials, GROUND))).toBe(true);
    const left = new Map(pr.value.pruned.map((p) => {
      const r = state.kernel.resolve({ role: 'way', entity: p.way }, GROUND);
      return [p.way, r.view === 'edges' ? r.runs.length : 0] as const;
    }));
    out.push({ k, before, rec: c.value, pr: pr.value, left });
  }
  return { state, stages: out };
}

describe('the prune and trim on the CITY town (frame 900 ha)', () => {
  let trimmed = 0;
  let pruned = 0;
  for (const seed of [1, 2, 3]) {
    it(`seed ${String(seed)}: arterials untouched; trims at the boundary; prunes exactly the short dangling secondaries`, { timeout: 240_000 }, () => {
      const { state, stages } = stepwise(seed);
      for (const s of stages) {
        const gs = state.stages[s.k - 1];
        const block = s.pr.blockWidthCm;
        expect(block).toBe(gs.regime === 'dense_core' ? 3_000 : gs.regime === 'walled_rings' ? 4_500 : 3_000);
        // The trim: each trimmed street now ends at its first exit from the boundary, nothing of it beyond.
        for (const t of s.pr.trimmed) {
          trimmed += 1;
          const st = s.rec.streets.find((x) => x.way.id === t.way);
          if (st === undefined) continue;
          expect(st.provisional).toBe(false);
          expect(st.way.provisional).toBe(false);
          const outline = gs.boundary!.set.outline;
          let d = Infinity;
          for (let i = 0; i < outline.length; i += 1) d = Math.min(d, segDist(t.cutAt, outline[i], outline[(i + 1) % outline.length]));
          expect(d).toBeLessThan(2);
          for (const q of st.points.slice(0, -1)) expect(insideRing(outline, q)).toBe(true);
          const line = wayLines(state.kernel, [t.way], GROUND)[0];
          const pts = line.runs.flatMap((r) => r.points);
          expect(pts.some((q) => q.x === t.cutAt.x && q.y === t.cutAt.y)).toBe(true);
          expect(t.removedCm).toBeGreaterThan(0);
        }
        // Every street the trim was owed was trimmed: none of the stage's streets is left provisional.
        expect(s.rec.streets.some((x) => x.provisional)).toBe(false);
        // The prune: each pruned way was a dangling secondary shorter than one block width, and is gone from the arena.
        for (const p of s.pr.pruned) {
          pruned += 1;
          expect(p.lengthCm).toBeLessThan(block);
          const was = s.before.streets.get(p.way);
          expect(was?.way.class).toBe('secondary');
          expect(s.left.get(p.way)).toBe(0);
          // Gone from the state's ways, unless a later stage's way re-took its id (`way:<n>` after every standing way).
          expect(state.ways.some((w) => w.id === p.way && w.growthStage === s.k && w.class === 'secondary')).toBe(false);
        }
        // What stands: no dangling secondary under one block width is left.
        for (const st of s.rec.streets) {
          if (st.way.class !== 'secondary' || st.ends === 'T' || st.ends === 'snap') continue;
          const from = st.way.from.kind === 'junction' ? st.way.from.id : '';
          const to = st.way.to.kind === 'junction' ? st.way.to.id : '';
          const met = state.junctions.some((j) => j.id !== from && j.id !== to && j.arms.includes(st.way.id));
          if (!met) expect(polyLength(st.points)).toBeGreaterThanOrEqual(block);
        }
      }
    });
  }

  it('over the three seeds the trim and the prune both ran', () => {
    expect(trimmed).toBeGreaterThan(0);
    expect(pruned).toBeGreaterThan(0);
  });

  it('an arterial handed to the trim as a provisional street is never trimmed', { timeout: 240_000 }, () => {
    const b = baseRun(flatFixture(1, { frameAreaHa: 900 }));
    const state = growthStart({ slice: b.slice, commit: b.commit, s4: b.s4, kernel: b.k });
    const mainroad = mainRoadStream(b.slice);
    const streams = growthStreams(b.slice);
    for (let k = 1; k <= 3; k += 1) {
      if (k >= 2) {
        expect(mainRoadsStep(state, k, mainroad).ok).toBe(true);
        expect(traceStep(state, k).ok).toBe(true);
      }
      const c = growthStep(state, k, streams);
      if (!c.ok) throw new Error(c.detail);
      if (k < 3) continue;
      // The ribbon's S5b roads run from the walled town out to the frame, far beyond the stage's boundary.
      const roads = state.stages[2].roads;
      expect(roads.length).toBeGreaterThan(0);
      const fake: GrownStreet[] = roads.map((r, i) => ({ way: { ...r.way, provisional: true }, lineage: [0, 0], index: 1_000 + i, proposal: -1, parent: r.from.way, points: r.points.slice(), ends: 'boundary', meets: null, provisional: true }));
      const before = wayLines(b.k, roads.map((r) => r.way.id), GROUND);
      const pr = pruneAndTrim({ state, k, record: { ...c.value, streets: fake, junctions: [] } });
      expect(pr.ok).toBe(true);
      if (pr.ok) expect(pr.value.trimmed).toEqual([]);
      expect(sameGround(before, wayLines(b.k, roads.map((r) => r.way.id), GROUND))).toBe(true);
      expect(JSON.stringify(wayLines(b.k, roads.map((r) => r.way.id), GROUND))).toBe(JSON.stringify(before));
    }
  });
});
