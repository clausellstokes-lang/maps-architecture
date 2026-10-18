// Seam portals (§4.6 step 7, J-P32; §5.3's and §13.2's seam portal invariant; C-0046): every baseLane portal matches
// one lane end and vice versa, spaced by the portal gap; a removed lane's portal leaves the Seam and the spine reads as
// it did before the lane. The portal records' content, the gap's slide, and a spine every end of which falls in a gap.
import { splitThrough, pointLocate, STAGES, type KernelTx, type LatticePoint } from '@plat/kernel';
import type { Portal } from '@plat/model';
import { describe, expect, it } from 'vitest';
import { chainRuns, portalInvariant, removeLane, vertexPoints } from '../../../src/index.js';
import { CELLS, crossingDeg, fixture, GROUND, P, runFixture, twoDistricts, waySegments } from './support.js';

function spinePoints(f: ReturnType<typeof twoDistricts>, id: string): string[] {
  return chainRuns(f.plat, GROUND, { role: 'way', entity: id }).flat().map((q) => `${q.x},${q.y}`);
}

describe('the seam portal invariant on two districts sharing an arterial', () => {
  const f = twoDistricts();
  const before = spinePoints(f, 'way:art');
  const out = runFixture(f);
  const seam = out.infill.seams.find((s) => s.edges.some((e) => e.chain.entity === 'way:art'));

  it('the arterial is the seam’s only spine and carries baseLane portals, each a lane end, every lane end on it a portal, spaced by the gap', { timeout: 120_000 }, () => {
    expect(f.seams.length).toBe(1);
    expect(seam).toBeDefined();
    expect(seam?.portals.length).toBeGreaterThan(2);
    expect(portalInvariant(f.plat, GROUND, out.infill.seams, out.lanes, CELLS)).toEqual([]);
  });

  it('each portal record names its lane, its class and width, its vertex role, the district that added it and the lane’s bearing into it', { timeout: 120_000 }, () => {
    for (const p of seam?.portals ?? []) {
      const lane = out.lanes.find((w) => w.id === p.wayId);
      expect(lane).toBeDefined();
      expect(p.from).toBe('baseLane');
      expect(p.class).toBe(lane?.class);
      expect(p.widthCm).toBe(lane?.width);
      expect(p.at).toEqual({ role: 'portal', entity: p.id });
      expect([f.districts[0].district.id, f.districts[1].district.id]).toContain(p.by);
      const at = vertexPoints(f.plat, GROUND, p.at);
      expect(at.length).toBe(1);
      // On the arterial (x = 20 000), the lane leaving it east or west: a compass bearing of 90° or 270° within 6°.
      expect(at[0].x).toBe(20_000);
      const b = p.bearing as number;
      expect(Math.min(Math.abs(b - 9000), Math.abs(b - 27000))).toBeLessThanOrEqual(600);
    }
  });

  it('no two lanes meet the arterial at one vertex (no crossroads on a district boundary)', { timeout: 120_000 }, () => {
    const at = (seam?.portals ?? []).map((p) => vertexPoints(f.plat, GROUND, p.at)[0]).map((q) => `${q.x},${q.y}`);
    expect(new Set(at).size).toBe(at.length);
  });

  it('a lane end on the arterial arrives within 85–95°', { timeout: 120_000 }, () => {
    for (const p of seam?.portals ?? []) {
      const at = vertexPoints(f.plat, GROUND, p.at)[0];
      const seg = waySegments(f.plat, p.wayId).find(([a, b]) => (a.x === at.x && a.y === at.y) || (b.x === at.x && b.y === at.y));
      expect(seg).toBeDefined();
      if (seg === undefined) continue;
      const deg = crossingDeg(seg[0], seg[1], P(20_000, 0), P(20_000, 30_000));
      expect(deg).toBeGreaterThanOrEqual(85);
    }
  });

  it('removing a lane takes its portal out of the Seam and the arterial reads as before at that point', { timeout: 300_000 }, () => {
    const p = (seam?.portals ?? [])[0] as Portal;
    const lane = out.lanes.find((w) => w.id === p.wayId);
    expect(lane).toBeDefined();
    if (lane === undefined) return;
    const atPortal = vertexPoints(f.plat, GROUND, p.at)[0];
    const afterS8 = spinePoints(f, 'way:art');
    expect(afterS8).toContain(`${atPortal.x},${atPortal.y}`);
    const r = removeLane(f.k, GROUND, lane, out.infill.seams, out.infill.junctions);
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    const now = r.value.seams.find((s) => s.id === seam?.id);
    expect(now?.portals.some((x) => x.id === p.id)).toBe(false);
    expect(now?.portals.length).toBe((seam?.portals.length ?? 0) - out.infill.seams.flatMap((s) => s.portals).filter((x) => x.wayId === lane.id).length);
    expect(vertexPoints(f.plat, GROUND, p.at)).toEqual([]);
    expect(waySegments(f.plat, lane.id)).toEqual([]);
    // The arterial: its points after S8 less the dissolved portal vertex — and every point it had before S8 kept.
    const after = spinePoints(f, 'way:art');
    expect(after).not.toContain(`${atPortal.x},${atPortal.y}`);
    expect(after.length).toBe(afterS8.length - 1);
    for (const q of before) expect(after).toContain(q);
    // The invariant still holds on what stands.
    expect(portalInvariant(f.plat, GROUND, r.value.seams, out.lanes.filter((w) => w.id !== lane.id), CELLS)).toEqual([]);
  });
});

/**
 * A district inside a ring way that bounds it (its seam), with portals of another district's lanes every 15 m along
 * the ring: every point of the ring lies within some portal's gap (10 m with 5 m lanes), so no end can land or slide.
 */
function denselyPortalled(): ReturnType<typeof fixture> {
  const W = 10_000;
  const H = 7_000;
  const ringPts: LatticePoint[] = [P(0, 0), P(W, 0), P(W, H), P(0, H)];
  const portalAt: LatticePoint[] = [];
  const perim = 2 * (W + H);
  for (let s = 750; s < perim; s += 1500) {
    if (s < W) portalAt.push(P(s, 0));
    else if (s < W + H) portalAt.push(P(W, s - W));
    else if (s < 2 * W + H) portalAt.push(P(W - (s - W - H), H));
    else portalAt.push(P(0, H - (s - 2 * W - H)));
  }
  const f = fixture(
    30_000,
    [{ id: 'way:ring', cls: 'secondary', widthCm: 600, points: ringPts, closed: true }],
    [{ seeds: [P(W / 2, H / 2)], prosperity: 0.3, density: 0.5 }],
    {
      extraL1: (k, plat) => {
        const spec: KernelTx = { key: GROUND, level: 1, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S6 }, stage: STAGES.S6, rederivesFrom: STAGES.S6, workLimit: 10_000_000 };
        const r = k.tx(spec, (o) => {
          for (let i = 0; i < portalAt.length; i += 1) {
            const at = pointLocate(plat, GROUND, 1, portalAt[i]);
            if (at.on !== 'edge') return { ok: false as const, code: 'E_INVARIANT' as const, detail: `portal ${i} not on the ring` };
            const s = splitThrough(o, at.edge, portalAt[i], { role: 'portal', entity: `portal:g${String(i)}` });
            if (!s.ok) return s;
          }
          return { ok: true as const, value: undefined, warnings: [] };
        });
        if (!r.ok) throw new Error(`portals: ${r.code} ${r.detail}`);
      },
    },
  );
  const d = f.districts[0].district.id;
  f.seams.push({
    id: 'seam:ring',
    sides: [d, 'district:zz'],
    edges: [{ chain: { role: 'way', entity: 'way:ring' }, type: 'way', wayClass: 'secondary', widthCm: 600 as never, hard: false }],
    portals: portalAt.map((_, i) => ({ id: `portal:g${String(i)}`, wayId: `way:g${String(i)}`, class: 'lane', widthCm: 500 as never, at: { role: 'portal', entity: `portal:g${String(i)}` }, bearing: 0 as never, from: 'growth', by: 'district:zz' })),
  });
  return f;
}

describe('the portal gap: a planned end inside a portal’s gap slides out, else the cut takes its next rung (§4.6 step 7)', () => {
  it('on a ring every point of which lies in a gap, no lane ends on it: every frame’s plan is the next rung, and rung (b) is reached and reported (T39-1)', { timeout: 300_000 }, () => {
    const f = denselyPortalled();
    const out = runFixture(f);
    expect(out.infill.report.refused).toEqual([]);
    const rep = out.infill.report.districts[0];
    // No lane touches the ring.
    expect(out.lanes.length).toBe(0);
    const first = rep.faces[0];
    const rungs = rep.rungs.filter((r) => r.face === first.face);
    const a = rungs.filter((r) => r.rung === 'a');
    expect(a.map((r) => r.attempt)).toEqual([0, 1, 2]);
    expect(a.every((r) => r.outcome === 'none' && r.why === 'nextRung')).toBe(true);
    // Each frame turned 36° from the last.
    expect(a.map((r) => r.turnCdeg)).toEqual([0, CELLS.ladderTurnCdeg, 2 * CELLS.ladderTurnCdeg]);
    // Rung (b) follows the three frames, reported.
    const ib = rungs.findIndex((r) => r.rung === 'b');
    expect(ib).toBeGreaterThan(rungs.findIndex((r) => r.rung === 'a' && r.attempt === 2));
    // The face ends as a block: the court of rung (d) (a face ≤ 2 · e_hi²), its stop test passed, counted as residue —
    // the district's whole built land, so its share is 1 and the soft bound (≤ 5 %) is flagged (C-0036).
    expect(first.outcome).toBe('court');
    expect(rep.rungs.some((r) => r.face === first.face && r.rung === 'd' && r.outcome === 'block')).toBe(true);
    expect(out.blocks.map((b) => b.interior)).toEqual(['court']);
    expect(rep.residueAreaCm2).toBeGreaterThan(0);
    expect(rep.residueAreaCm2).toBe(rep.builtAreaCm2);
    expect(rep.residueShare).toBe(1);
    expect(rep.residueSoftExceeded).toBe(true);
    expect(rep.stops[0].outcome).toBe('cut');
    expect(portalInvariant(f.plat, GROUND, out.infill.seams, out.lanes, CELLS).filter((p) => p.what !== 'not-a-lane-end')).toEqual([]);
  });
});
