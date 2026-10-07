// M0-d-09's third test (C-0090): the re-derivation pair at one seed — the site spike derived, then re-derived with the
// growth stage's reroll incremented ({ S5: 1 }): every S1 and S4 entity survives identically (its stage roots and
// records equal, the same address, kind and lineage, the routine's outcome `survive`); the S5 / S6 / S8 entities match
// per kind with 0 duplicate ids and 0 silent re-binds. Beside it: the entities' anchors read from the run's arena
// (C-0268 (7)), the two contracts' counters on planted failures, and the pair's timing stamp (M0-f-01's harness).
import { describe, expect, it } from 'vitest';
import type { LatticePoint } from '@plat/kernel';
import { match, type MatchEntity, type MatchResult } from '@plat/model';
import type { Bridge, Junction, WaterSet } from '@plat/model';
import {
  duplicateIds,
  harnessStamp,
  m0Anchors,
  MATCH_KINDS,
  matchPair,
  pairEntities,
  rederive,
  S5_REROLL,
  silentRebinds,
  STANDING,
  timedPair,
  type RederivedPair,
} from '../../src/determinism/index.js';
import { SLOW, TEST_SIZE } from './support.js';

let cache: RederivedPair | null = null;
function pair(): RederivedPair {
  cache ??= rederive(1, { rerolls: S5_REROLL, spike: 'site', size: TEST_SIZE });
  return cache;
}
const rootAt = (p: RederivedPair, side: 'old' | 'fresh', stage: string): string | undefined => p[side].run.stageRoots.find(([n]) => n === stage)?.[1];

describe('the re-derivation pair at one seed (C-0090)', () => {
  it('re-draws S5, S6 and S8 and leaves S1, S3 and S4 as they were', { timeout: SLOW }, () => {
    const p = pair();
    expect(p.rerolls).toEqual({ S5: 1 });
    for (const s of STANDING) expect(rootAt(p, 'fresh', s), s).toBe(rootAt(p, 'old', s));
    for (const s of ['S5', 'S6', 'S8']) expect(rootAt(p, 'fresh', s), s).not.toBe(rootAt(p, 'old', s));
    expect(p.old.run.bugs).toEqual([]);
    expect(p.fresh.run.bugs).toEqual([]);
  });
  it('every S1 and S4 entity survives identically; the S5 / S6 / S8 entities match per kind with 0 duplicate ids and 0 silent re-binds', { timeout: SLOW }, () => {
    const p = pair();
    const r = matchPair(p);
    expect(r.standing).toMatchObject({ rootsEqual: true, recordsEqual: true, missing: 0, firstMissing: null });
    const standing = p.old.entities.entities.filter((e) => STANDING.includes(e.by));
    expect(standing.length).toBe(r.standing.entities);
    // the S1 and S4 entities are there, each kind S1 – S4 makes in a river city
    const standingKinds = new Set(standing.map((e) => `${e.by}:${e.entity.kind}`));
    for (const k of ['S1:water', 'S1:bridge', 'S3:enceinte', 'S3:gate', 'S4:way', 'S4:junction']) expect(standingKinds.has(k), k).toBe(true);
    const freshIds = new Map(p.fresh.entities.entities.map((e) => [`${e.entity.kind}:${e.entity.id}`, e]));
    for (const s of standing) {
      const o = r.result.old.get(s.entity.id);
      expect(o, s.entity.id).toEqual({ outcome: 'survive', kind: s.entity.kind, id: s.entity.id });
      const f = freshIds.get(`${s.entity.kind}:${s.entity.id}`);
      expect(f?.entity.lineage, s.entity.id).toEqual(s.entity.lineage);
      expect(f?.by).toBe(s.by);
    }
    // the re-drawn kinds: every old entity has one outcome, every fresh one an address
    for (const kind of ['way', 'junction', 'district', 'seam', 'portal', 'block', 'gate', 'enceinte'] as const) {
      const k = r.perKind.find((x) => x.kind === kind);
      expect(k, kind).toBeDefined();
      if (k === undefined) continue;
      const oldRe = p.old.entities.entities.filter((e) => e.entity.kind === kind && !STANDING.includes(e.by)).length;
      expect(k.old - k.survive, kind).toBe(oldRe);
      expect(k.succeed + k.tombstone, kind).toBe(oldRe);
      expect(k.succeed + k.freshOutcome, kind).toBe(k.fresh);
      expect(oldRe, kind).toBeGreaterThan(0);
    }
    expect(r.perKind.find((x) => x.kind === 'district')?.succeed).toBeGreaterThan(0);
    expect(r.perKind.find((x) => x.kind === 'cell')).toMatchObject({ old: 0, fresh: 0 });
    expect(r.duplicateIds).toBe(0);
    expect(r.silentRebinds).toBe(0);
    expect(r.totals.survive).toBe(standing.length);
    expect(r.perKind.map((k) => k.kind)).toEqual([...MATCH_KINDS]);
    // every fresh entity holds one address after the hand-on, every old address at most one holder
    const held = new Set<string>();
    for (const e of p.old.entities.entities) if (STANDING.includes(e.by)) held.add(e.entity.id);
    for (const e of p.fresh.entities.entities.filter((x) => !STANDING.includes(x.by))) {
      const a = r.result.addressOf.get(e.entity.id);
      expect(a, e.entity.id).toBeDefined();
      expect(held.has(a as string), a).toBe(false);
      held.add(a as string);
    }
  });
});

describe('the entities read from the run', () => {
  it('anchor each kind on the arena: a junction at its vertex, a bridge on its river, a district by its seed feature, a way by its ends', { timeout: SLOW }, () => {
    const p = pair();
    const run = p.old.run;
    const k = run.model.kernel;
    const plat = run.model.plats.get('ground/0');
    if (plat === undefined) throw new Error('no arena');
    const byId = new Map(p.old.entities.entities.map((e) => [e.entity.id, e]));
    const junctions = run.model.data.get('junctions') as Junction[];
    for (const j of junctions.slice(0, 10)) {
      const r = k.resolve(j.vertex, { layer: 'ground', part: 0 });
      if (r.view !== 'vertices') throw new Error('not a vertex');
      const v = r.vertices[0] as number;
      expect(byId.get(j.id)?.entity.anchor).toEqual({ point: { x: plat.vertices.x[v], y: plat.vertices.y[v] } });
    }
    const water = run.model.data.get('water') as WaterSet;
    const river = water.bodies[0]?.id;
    expect(river).toBeDefined();
    const bridges = run.model.data.get('bridges') as Bridge[];
    expect(bridges.length).toBeGreaterThan(0);
    for (const b of bridges) {
      const a = byId.get(b.id)?.entity.anchor as { point: { x: number; y: number }; on: string };
      expect(a.on).toBe(river);
      const ends = b.deck.map((ref) => {
        const r = k.resolve(ref, { layer: 'ground', part: 0 });
        if (r.view !== 'vertices') throw new Error('not a vertex');
        const v = r.vertices[0] as number;
        return { x: plat.vertices.x[v] as number, y: plat.vertices.y[v] as number };
      });
      expect(a.point).toEqual({ x: Math.round(((ends[0]?.x ?? 0) + (ends[1]?.x ?? 0)) / 2), y: Math.round(((ends[0]?.y ?? 0) + (ends[1]?.y ?? 0)) / 2) });
    }
    const waterAnchor = byId.get(river as string)?.entity.anchor as { area: { x: number; y: number }[][] };
    expect(waterAnchor.area.length).toBeGreaterThanOrEqual(1);
    expect(waterAnchor.area[0]?.length).toBeGreaterThanOrEqual(3);
    const districts = p.old.entities.entities.filter((e) => e.entity.kind === 'district');
    expect(districts.length).toBeGreaterThan(0);
    for (const d of districts) {
      expect(d.by).toBe('S6');
      expect(d.lineageFrom).toBe('model');
      const key = (d.entity.anchor as { key: { ref: string | null }[] }).key;
      expect(key.length).toBe(1);
    }
    expect(districts.some((d) => (d.entity.anchor as { key: { ref: string | null }[] }).key[0]?.ref !== null)).toBe(true);
    const ways = p.old.entities.entities.filter((e) => e.entity.kind === 'way');
    for (const w of ways) {
      const a = w.entity.anchor as unknown as { ends: (string | null)[]; line: unknown[] };
      expect(a.ends.length).toBe(2);
      expect(a.line.length).toBeGreaterThanOrEqual(2);
    }
    expect(ways.filter((w) => w.by === 'S8').every((w) => w.lineageFrom === 'model')).toBe(true);
    expect(p.old.entities.entities.filter((e) => e.entity.kind === 'block').every((b) => b.by === 'S8' && b.lineageFrom === 'model')).toBe(true);
    expect(p.old.entities.unanchored.block).toBeLessThan(p.old.entities.entities.filter((e) => e.entity.kind === 'block').length);
  });
});

describe('the two contracts\' counters', () => {
  const P = (x: number, y: number): LatticePoint => ({ x, y }) as unknown as LatticePoint;
  const pt = (id: string, x: number, survives = false): MatchEntity => ({ id, kind: 'junction', lineage: [1, x], anchor: { point: P(x, 0) }, ...(survives ? { survives } : {}) });
  const old = [pt('junction:1', 0, true), pt('junction:2', 1000), pt('junction:3', 5000)];
  const fresh = [pt('junction:7', 1010), pt('junction:9', 90_000)];
  const anchors = m0Anchors();
  it('count nothing on a sound hand-on', () => {
    const r = match(old, fresh, anchors);
    expect(r.old.get('junction:2')).toMatchObject({ outcome: 'succeed', fresh: 'junction:7' });
    expect(duplicateIds(r, old, fresh)).toBe(0);
    expect(silentRebinds(r, old, fresh)).toEqual({ silent: 0, reported: 0 });
  });
  it('count a duplicate address and every kind of silent re-bind (planted in the result)', () => {
    const r = match(old, fresh, anchors);
    // a fresh entity that keeps an id a survivor holds
    expect(duplicateIds(r, old, [...fresh, pt('junction:1', 70_000)].slice(0, 3))).toBe(1);
    const tamper = (f: (m: Map<string, string>, h: Map<string, string>) => void): MatchResult => {
      const addressOf = new Map(r.addressOf);
      const handedOn = new Map(r.handedOn);
      f(addressOf, handedOn);
      return { ...r, addressOf, handedOn };
    };
    // the successor holds another address than the one handed to it
    expect(silentRebinds(tamper((m) => m.set('junction:7', 'junction:3')), old, fresh).silent).toBeGreaterThanOrEqual(1);
    // a fresh entity holds an address nobody handed it
    expect(silentRebinds(tamper((m) => m.set('junction:9', 'junction:2')), old, fresh).silent).toBe(1);
    // a fresh entity with no address
    expect(silentRebinds(tamper((m) => m.delete('junction:9')), old, fresh).silent).toBe(1);
    // an old reference kept through a successor that does not hold it
    const way: MatchEntity = { id: 'way:5', kind: 'way', lineage: [2, 2], anchor: { ends: ['junction:2', 'junction:3'], line: [P(1000, 0), P(5000, 0)] } };
    const withWay = [...old, way];
    const r2 = match(withWay, fresh, anchors);
    expect(silentRebinds(r2, withWay, fresh)).toEqual({ silent: 0, reported: 1 }); // way:5's end junction:3 is a tombstone: reported, never re-bound
    const bad = { ...r2, addressOf: new Map(r2.addressOf).set('junction:7', 'junction:99') };
    expect(silentRebinds(bad, withWay, fresh).silent).toBe(3); // the succession, the fresh holder and way:5's kept end
  });
});

describe('the timing workload', () => {
  it('is the pair as M0-d-05b times it, stamped by M0-f-01\'s harness (CONTENDED here, never a result)', { timeout: SLOW }, async () => {
    const p = pair();
    const tp = timedPair(p);
    const { old, fresh } = pairEntities(p);
    expect(tp).toMatchObject({ name: 'spike-site-1', seed: 1 });
    expect(tp.old).toEqual(old);
    expect(tp.fresh).toEqual(fresh);
    expect(tp.old.filter((e) => e.survives === true).length).toBe(matchPair(p).standing.entities);
    const s = await harnessStamp(p, { stages: [], inputs: {}, timing: true, idleMs: 0, repeats: 1 });
    expect(s.label).toBe('matching spike-site-1');
    expect(s.unit).toBe('µs');
    expect(s.readings).toBe('measured');
    expect(['contended', 'authoritative']).toContain(s.authority);
    expect(s.reasons).toBe(s.authority === 'contended' ? Math.max(1, s.reasons) : 0);
    expect(s.pointUs).toBeGreaterThan(0);
    expect(s.value).toBe(s.pointUs);
    for (const kind of ['junction', 'way', 'district', 'seam']) expect(s.perKindUs[kind], kind).toBeGreaterThan(0);
    expect(s.host).toMatch(/node v24/);
  });
});
