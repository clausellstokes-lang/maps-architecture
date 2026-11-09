// M0-d-09's third test (C-0090): the re-derivation pair at one seed — the site spike derived, then re-derived with the
// growth stage's reroll incremented ({ S5: 1 }): every S1 and S4 entity survives identically (its stage roots and
// records equal, the same address, kind and lineage, the routine's outcome `survive`); the S5 / S6 / S8 entities match
// per kind with 0 duplicate ids and 0 silent re-binds. Beside it: the entities' anchors read from the run's arena
// (C-0268 (7)), the two contracts' counters on planted failures, and the pair's timing stamp (M0-f-01's harness).
import fc from 'fast-check';
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
  mintAddresses,
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
    expect(r.redrawn).toEqual(['S5', 'S6', 'S8']);
    // the old run matched with itself re-draws nothing (a negative control: the evidence reads the roots, C-0280)
    expect(matchPair({ ...p, fresh: p.old }).redrawn).toEqual([]);
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
    // every fresh entity holds one address after the hand-on and the mint, every old address at most one holder
    // (Q124: read on the final addresses — the routine's raw `addressOf` gives a fresh entity its natural address even
    // where a succession hands that address to another, which the mint resolves by §6.3's `~k`, C-0274)
    expect(r.minted.refused).toEqual([]);
    const held = new Set<string>();
    for (const e of p.old.entities.entities) if (STANDING.includes(e.by)) held.add(e.entity.id);
    for (const e of p.fresh.entities.entities.filter((x) => !STANDING.includes(x.by))) {
      const a = r.minted.addressOf.get(e.entity.id);
      expect(a, e.entity.id).toBeDefined();
      expect(held.has(a as string), a).toBe(false);
      held.add(a as string);
    }
    // Q124's case, wherever the pair holds it (at seed 1 on c-02 S5's tree: junction:6nymg6w713p26 handed to
    // junction:3ab8743sbjpay at 74.7 cm, block:2skgtzs7hxr50 to block:cmps09px73p0z at 70.2 cm): the successor ends at
    // the handed-on address, the fresh entity whose natural address it is at `<id>~k`, never beside it
    const handed = new Map([...r.result.handedOn].map(([f, a]) => [a, f]));
    for (const e of p.fresh.entities.entities.filter((x) => !STANDING.includes(x.by))) {
      const successor = handed.get(e.entity.id);
      if (successor === undefined || successor === e.entity.id) continue;
      expect(r.minted.addressOf.get(successor), successor).toBe(e.entity.id);
      expect(r.minted.addressOf.get(e.entity.id), e.entity.id).toMatch(new RegExp(`^${e.entity.id}~[1-9][0-9]*$`));
    }
  });
});

describe('the standing check on a pair whose standing stage moved (hardening S1, check note 2)', () => {
  it('a fresh side with a tampered S1, S3 or S4 root, or none, has rootsEqual false; its records and entities as they were', { timeout: SLOW }, () => {
    const p = pair();
    expect(matchPair(p).standing.rootsEqual).toBe(true);
    const withRoots = (roots: readonly (readonly [string, string])[]): RederivedPair => ({ ...p, fresh: { ...p.fresh, run: { ...p.fresh.run, stageRoots: roots } } });
    for (const s of STANDING) {
      const tampered = p.fresh.run.stageRoots.map(([n, h]) => [n, n === s ? 'f'.repeat(32) : h] as const);
      expect(tampered.filter(([n]) => n === s), s).toHaveLength(1);
      const r = matchPair(withRoots(tampered));
      expect(r.standing.rootsEqual, s).toBe(false);
      // only the root was tampered: the records compare and the entities still hold, so rootsEqual alone sees it
      expect(r.standing, s).toMatchObject({ recordsEqual: true, missing: 0 });
      expect(r.redrawn, s).toEqual(['S5', 'S6', 'S8']);
    }
    // a fresh run without the S4 root is no standing pair either
    expect(matchPair(withRoots(p.fresh.run.stageRoots.filter(([n]) => n !== 'S4'))).standing.rootsEqual).toBe(false);
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

describe('the mint after the matching on a real pair (C-0274; the CITY bar form found 196 pre-mint duplicates)', () => {
  it('a fresh entity whose natural address the batch retires and hands on takes ~k: 0 duplicate ids (the fusion spike at seed 6)', { timeout: SLOW }, () => {
    const p = rederive(6, { rerolls: S5_REROLL, spike: 'fusion', size: TEST_SIZE });
    const r = matchPair(p);
    const { old, fresh } = pairEntities(p);
    // before the mint the routine's own addresses collide: a fresh S8 entity keeps a natural address handed to another
    const before = duplicateIds(r.result, old, fresh, { addressOf: r.result.addressOf, suffixed: 0, refused: [] });
    expect(before).toBeGreaterThanOrEqual(1);
    expect(r.duplicateIds).toBe(0);
    expect(r.silentRebinds).toBe(0);
    expect(r.suffixed).toBeGreaterThanOrEqual(before);
    const m = mintAddresses(r.result, old, fresh);
    const oldIds = new Set(old.map((e) => e.id));
    let suffixed = 0;
    for (const f of fresh) {
      const a = m.addressOf.get(f.id);
      if (r.result.handedOn.has(f.id)) expect(a).toBe(r.result.handedOn.get(f.id));
      else if (a !== f.id) {
        suffixed += 1;
        expect(a).toBe(`${f.id}~1`);
        expect(oldIds.has(f.id), f.id).toBe(true); // its natural address was a live one
      }
    }
    expect(suffixed).toBe(r.suffixed);
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
    expect(mintAddresses(r, old, fresh)).toEqual({ addressOf: new Map([['junction:7', 'junction:2'], ['junction:9', 'junction:9']]), suffixed: 0, refused: [] });
    expect(silentRebinds(r, old, fresh)).toEqual({ silent: 0, reported: 0 });
  });
  it('apply the mint\'s one collision rule before counting (§6.3, C-0274): a taken natural address takes ~k, never a duplicate', () => {
    // a fresh entity whose natural address is a survivor's (the far junction:1 keeps no predecessor)
    const f1 = [...fresh, pt('junction:1', 70_000)];
    const r1 = match(old, f1, anchors);
    expect(r1.addressOf.get('junction:1')).toBe('junction:1');
    expect(mintAddresses(r1, old, f1).addressOf.get('junction:1')).toBe('junction:1~1');
    expect(mintAddresses(r1, old, f1).suffixed).toBe(1);
    expect(duplicateIds(r1, old, f1)).toBe(0);
    // the spike city's case: a fresh entity whose natural address is one the batch retires and hands on to another
    const f2 = [pt('junction:7', 1010), pt('junction:2', 60_000)];
    const r2 = match(old, f2, anchors);
    expect(r2.handedOn.get('junction:7')).toBe('junction:2');
    expect(r2.addressOf.get('junction:2')).toBe('junction:2'); // before the mint: two holders
    expect(duplicateIds(r2, old, f2, { addressOf: r2.addressOf, suffixed: 0, refused: [] })).toBe(1);
    const m2 = mintAddresses(r2, old, f2);
    expect(m2.addressOf).toEqual(new Map([['junction:7', 'junction:2'], ['junction:2', 'junction:2~1']]));
    expect(duplicateIds(r2, old, f2)).toBe(0);
    // a retired address nobody is handed is taken too (§6.3: "an address its own batch retires")
    const f3 = [pt('junction:3', 40_000)];
    const r3 = match(old, f3, anchors);
    expect(r3.old.get('junction:3')?.outcome).toBe('tombstone');
    expect(mintAddresses(r3, old, f3).addressOf.get('junction:3')).toBe('junction:3~1');
    // the smallest free k: ~1 already given in the batch, the next takes ~2 (canonical order: by lineage)
    const f4 = [pt('junction:2', 60_000), pt('junction:2~1', 59_000)];
    const r4 = match(old, f4, anchors);
    const m4 = mintAddresses(r4, old, f4);
    expect(m4.addressOf.get('junction:2')).toBe('junction:2~2');
    expect(m4.addressOf.get('junction:2~1')).toBe('junction:2~1');
    expect(duplicateIds(r4, old, f4)).toBe(0);
  });
  it('count a duplicate address and every kind of silent re-bind (planted in the result)', () => {
    const r = match(old, fresh, anchors);
    const tamper = (f: (m: Map<string, string>, h: Map<string, string>) => void): MatchResult => {
      const addressOf = new Map(r.addressOf);
      const handedOn = new Map(r.handedOn);
      f(addressOf, handedOn);
      return { ...r, addressOf, handedOn };
    };
    // a handed-on address the mint would refuse: a survivor's, or one handed to two records — a duplicate either way
    expect(duplicateIds(tamper((_m, h) => h.set('junction:9', 'junction:1')), old, fresh)).toBe(1);
    expect(duplicateIds(tamper((_m, h) => h.set('junction:9', 'junction:2')), old, fresh)).toBe(1);
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

describe('the hand-on\'s uniqueness (hardening S2, Q124)', () => {
  const P = (x: number, y: number): LatticePoint => ({ x, y }) as unknown as LatticePoint;
  const pt = (id: string, x: number, survives = false): MatchEntity => ({ id, kind: 'junction', lineage: [1, x], anchor: { point: P(x, 0) }, ...(survives ? { survives } : {}) });
  const old = [pt('junction:1', 0, true), pt('junction:2', 1000), pt('junction:3', 5000)];
  const anchors = m0Anchors();
  const handOn = (r: MatchResult, f: string, a: string): MatchResult => ({ ...r, handedOn: new Map(r.handedOn).set(f, a), addressOf: new Map(r.addressOf).set(f, a) });
  /** Every final address (the survivors' and the fresh entities' after the mint) is held once. */
  const heldOnce = (r: MatchResult, fresh: readonly MatchEntity[]): boolean => {
    const m = mintAddresses(r, old, fresh);
    const all = [...old.filter((e) => e.survives === true).map((e) => e.id), ...fresh.map((f) => m.addressOf.get(f.id))];
    return all.every((a) => a !== undefined) && new Set(all).size === all.length;
  };
  it('a succession handing a natural holder\'s address: the successor keeps it, the holder takes ~k, whichever sorts first (§6.3)', () => {
    // the natural holder junction:2 sorts before its address's successor junction:7 (lineage [1, 500] < [1, 1010])
    const fresh = [pt('junction:7', 1010), pt('junction:2', 500)];
    const r = match(old, fresh, anchors);
    expect(r.old.get('junction:2')).toMatchObject({ outcome: 'succeed', fresh: 'junction:7' });
    expect(r.addressOf.get('junction:2')).toBe('junction:2'); // the routine's raw addresses: two holders before the mint
    const m = mintAddresses(r, old, fresh);
    expect(m).toEqual({ addressOf: new Map([['junction:2', 'junction:2~1'], ['junction:7', 'junction:2']]), suffixed: 1, refused: [] });
    expect(heldOnce(r, fresh)).toBe(true);
    expect(duplicateIds(r, old, fresh)).toBe(0);
    expect(silentRebinds(r, old, fresh)).toEqual({ silent: 0, reported: 0 });
    // the same fresh entity left as its raw address after the mint — the case Q124 names — is a duplicate and a silent re-bind
    const raw = { addressOf: r.addressOf, suffixed: 0, refused: [] };
    expect(duplicateIds(r, old, fresh, raw)).toBe(1);
    expect(silentRebinds(r, old, fresh, raw).silent).toBe(1);
    // a mint that leaves the successor at its natural address: no address held twice, but the hand-on is lost — a silent re-bind
    const lost = { addressOf: new Map([['junction:2', 'junction:2~1'], ['junction:7', 'junction:7']]), suffixed: 1, refused: [] };
    expect(duplicateIds(r, old, fresh, lost)).toBe(0);
    expect(silentRebinds(r, old, fresh, lost).silent).toBe(1);
  });
  it('a planted succession that hands a held id is refused, minted fresh and counted: a survivor\'s, another successor\'s, a fresh entity\'s own', () => {
    const fresh = [pt('junction:7', 1010), pt('junction:9', 90_000), pt('junction:8', 80_000)];
    const r = match(old, fresh, anchors);
    expect(r.handedOn).toEqual(new Map([['junction:7', 'junction:2']]));
    for (const [what, f, a] of [
      ['a survivor\'s address', 'junction:8', 'junction:1'],
      ['an address handed to another successor', 'junction:8', 'junction:2'],
      ['a fresh entity\'s own address', 'junction:8', 'junction:9'],
    ] as const) {
      const bad = handOn(r, f, a);
      const m = mintAddresses(bad, old, fresh);
      expect(m.refused, what).toEqual(['junction:8']);
      expect(m.addressOf.get('junction:8'), what).toBe('junction:8'); // minted as a fresh entity
      expect(m.addressOf.get('junction:9'), what).toBe('junction:9');
      expect(m.addressOf.get('junction:7'), what).toBe('junction:2'); // the outcome's successor keeps its address
      expect(heldOnce(bad, fresh), what).toBe(true);
      expect(duplicateIds(bad, old, fresh), what).toBe(1);
      expect(silentRebinds(bad, old, fresh).silent, what).toBe(1);
    }
    // an unknown address no entity holds: refused and a duplicate counted, no holder re-bound
    const unknown = handOn(r, 'junction:8', 'junction:404');
    expect(mintAddresses(unknown, old, fresh).refused).toEqual(['junction:8']);
    expect(duplicateIds(unknown, old, fresh)).toBe(1);
    // a succession whose successor's hand-on names another address: the outcome's address is not held by its successor
    const moved = { ...r, handedOn: new Map(r.handedOn).set('junction:7', 'junction:3') };
    expect(mintAddresses(moved, old, fresh).refused).toEqual(['junction:7']);
    expect(heldOnce(moved, fresh)).toBe(true);
    expect(silentRebinds(moved, old, fresh).silent).toBeGreaterThanOrEqual(1);
  });
  it('the final addresses are held once for any planted hand-on, and every refusal is counted (fast-check)', () => {
    const fresh = [pt('junction:7', 1010), pt('junction:9', 90_000), pt('junction:2', 500), pt('junction:3', 5100)];
    const r = match(old, fresh, anchors);
    expect(mintAddresses(r, old, fresh).refused).toEqual([]);
    const ids = ['junction:1', 'junction:2', 'junction:3', 'junction:7', 'junction:9', 'junction:2~1', 'junction:404'];
    fc.assert(
      fc.property(fc.array(fc.tuple(fc.constantFrom(...fresh.map((f) => f.id)), fc.constantFrom(...ids)), { maxLength: 4 }), (plants) => {
        let bad = r;
        for (const [f, a] of plants) bad = handOn(bad, f, a);
        const m = mintAddresses(bad, old, fresh);
        expect(heldOnce(bad, fresh)).toBe(true);
        expect(duplicateIds(bad, old, fresh)).toBe(m.refused.length);
        const lawful = fresh.filter((f) => {
          const o = bad.old.get(bad.handedOn.get(f.id) ?? '');
          return o?.outcome === 'succeed' && o.fresh === f.id;
        }).length;
        expect(m.refused.length).toBe(bad.handedOn.size - lawful);
        if (m.refused.length === 0) expect(silentRebinds(bad, old, fresh).silent).toBe(0);
      }),
    );
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
