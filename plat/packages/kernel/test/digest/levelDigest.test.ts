// M0-d-04: the kernel's per-level route digests (§6.2 *Geometry is hashed once, by the kernel, per level*; §3.3 *The
// commit record*'s digest update; C-0194). The maintained digest of every level equals the digest recomputed from
// nothing after every batch of every fuzz run (the CI oracle's kernel half, §5.3's CI-only row); a finer level's
// derivation never changes a coarser level's digest (§3.3's canonical key); promotion then demotion restores the
// coarser level's digest exactly; no digest depends on slots. Round s1 (N-56 (5), C-0305): the maintained state is keyed
// on the arena's (restore generation, version), so a savepoint put back across committed batches never leaves a state
// that reads current again once the version comes back.
import { describe, expect, it } from 'vitest';
import { faceWalk, facesOfOwner, handleOf, isFaceLive, type Plat } from '../../src/arena/index.js';
import {
  attachLevelDigests,
  changedEntities,
  freshLevelDigests,
  levelDigest,
  levelDigestBuilds,
  levelDigests,
  recomputeLevelDigest,
  updateLevelDigests,
} from '../../src/digest/index.js';
import { FACE_KIND_RESIDUE } from '../../src/faces/index.js';
import type { Hash128 } from '../../src/hash/index.js';
import { insertChain } from '../../src/insert/index.js';
import { removeEdges, restoreGeneration, restoreSavepoint, setOwner, takeSavepoint, tx, type CommitRecord, type DirtySet, type Overlay, type TxEnv } from '../../src/tx/index.js';
import type { Level } from '../../src/types/index.js';
import { ALONG_MIX, DEFAULT_MIX, randomBatch, rng, type Live, type Mix } from '../tx/fuzzgen.js';
import { commit, framed, must, pt, S6, spec, vertexAtPoint } from '../tx/support.js';

const ENV: TxEnv = { onCommit: updateLevelDigests };
const LV: Level[] = [0, 1, 2, 3, 4];

const hex = (h: Hash128): string => h.map((w) => w.toString(16).padStart(8, '0')).join('');
const all = (p: Plat): string[] => LV.map((n) => hex(levelDigest(p, n)));
const fresh = (p: Plat): string[] => LV.map((n) => hex(recomputeLevelDigest(p, n)));

/** Runs one fuzz sequence with the oracle after every batch; returns the batches committed. */
function oracleRun(seed: number, steps: number, mix: Mix): number {
  const r = rng(seed);
  const p = framed();
  attachLevelDigests(p);
  const live: Live = { ways: [], kerbs: [], next: 0 };
  let committed = 0;
  for (let step = 0; step < steps; step++) {
    const before = all(p);
    const snapshot: Live = { ways: live.ways.slice(), kerbs: live.kerbs.slice(), next: live.next };
    const b = randomBatch(p, live, r, mix);
    const res = tx(p, spec(b.level, { rederivesFrom: 0 as never }), b.fn, ENV);
    if (!res.ok) {
      live.ways = snapshot.ways;
      live.kerbs = snapshot.kerbs;
      expect(all(p)).toEqual(before);
      continue;
    }
    if (res.value.record !== null) committed++;
    const now = all(p);
    // The oracle: the maintained digests equal the recomputed ones, and no rebuild hid a missed update.
    expect(now, `seed ${seed} step ${step} (${b.kind}, L${b.level})`).toEqual(fresh(p));
    expect(levelDigestBuilds(p)).toBe(1);
    // The canonical-key property: a level-k batch never changes a coarser level's digest.
    for (let m = 0; m < b.level; m++) expect(now[m], `seed ${seed} step ${step}: L${m} moved by an L${b.level} batch`).toBe(before[m]);
  }
  return committed;
}

describe('the maintained level digests equal the recomputed ones after every batch (the CI oracle, §5.3)', () => {
  for (let seed = 1; seed <= 16; seed++) {
    it(`fuzz seed ${seed} (ways, lanes, removals, re-owns, clears)`, () => {
      expect(oracleRun(seed * 7919, 14, DEFAULT_MIX)).toBeGreaterThan(0);
    }, 120_000);
  }
  for (let seed = 1; seed <= 12; seed++) {
    it(`fuzz seed ${seed} with finer chains along the ways (promotions, demotions)`, () => {
      expect(oracleRun(seed * 15_485_863, 16, ALONG_MIX)).toBeGreaterThan(0);
    }, 120_000);
  }
  // Removals beside finer faces whose rings the record does not name: caught only by the items registered on the
  // pairs and vertices the dirty faces gained or lost (found by wide runs of this oracle, 7919 × seed, DEFAULT_MIX).
  for (const seed of [10, 30, 38, 51, 81]) {
    it(`removal sequence ${seed} (the registration's reach)`, () => {
      expect(oracleRun(seed * 7919, 30, DEFAULT_MIX)).toBeGreaterThan(0);
    }, 120_000);
  }
  // M0-a-06's regression sequences (own-child regions, demoted sides, one-rings).
  for (const [seed, steps, mix] of [[286, 20, DEFAULT_MIX], [418, 20, DEFAULT_MIX], [649, 20, DEFAULT_MIX], [1072, 20, DEFAULT_MIX], [5413, 30, { way: 0.25, lane: 0.5 }]] as const) {
    it(`regression sequence ${seed}`, () => {
      expect(oracleRun(seed * 7919, steps, mix)).toBeGreaterThan(0);
    }, 120_000);
  }
  // The closing check s2's B-1: step 11 is an L1 'stretch (rekeyed)' whose re-level frees an L1 record and moves its
  // L2 children to the survivor without listing them (relevel's face pass); the update must re-read a removed record's
  // children, or each keeps its stale item (parent: the freed slot) and stays in the L2 tree as no one's own child.
  it('a removed record\'s children are re-read: a re-level that re-parents them unlisted keeps L2 – L4 as recomputed (B-1, seed 44509828)', () => {
    expect(oracleRun(44_509_828, 12, DEFAULT_MIX)).toBeGreaterThan(0);
  }, 120_000);
});

/** The frame, an L1 street along y = 2000, and an L3 plot line from the north ending on it at (2000, 2000). */
function neighbourStep(): Plat {
  const p = framed();
  attachLevelDigests(p);
  commit(p, 1, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'), {}, ENV);
  commit(p, 3, (o) => insertChain(o, [pt(2000, 3500), pt(2000, 2000)], [{ role: 'plot_line', entity: 'plot:1' }], 'mandatory'), {}, ENV);
  return p;
}

describe('levels', () => {
  it('a finer level\'s derivation never changes a coarser level\'s digest (§3.3\'s canonical key)', () => {
    const p = framed();
    attachLevelDigests(p);
    commit(p, 1, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'), {}, ENV);
    const l1 = all(p);
    // An L3 line ending on the street splits it with an L3 Steiner vertex: in L3's digest, in no coarser one.
    commit(p, 3, (o) => insertChain(o, [pt(1300, 3500), pt(1300, 2000)], [{ role: 'plot_line', entity: 'plot:9' }], 'mandatory'), {}, ENV);
    const l3 = all(p);
    expect(l3.slice(0, 3)).toEqual(l1.slice(0, 3));
    expect(l3[3]).not.toBe(l1[3]);
    expect(l3[4]).not.toBe(l1[4]);
    // An L2 lane then moves L2 and finer, never L0 or L1.
    commit(p, 2, (o) => insertChain(o, [pt(2500, 500), pt(2500, 2000)], [{ role: 'kerb', entity: 'lane:1' }], 'mandatory'), {}, ENV);
    const l2 = all(p);
    expect(l2.slice(0, 2)).toEqual(l1.slice(0, 2));
    expect(l2[2]).not.toBe(l3[2]);
    expect(all(p)).toEqual(fresh(p));
  });

  it('promotion then demotion restores the coarser level\'s digest exactly (the neighbour step\'s reversal in miniature)', () => {
    const p = neighbourStep();
    const s = vertexAtPoint(p, 2000, 2000);
    expect(p.vertices.level[s]).toBe(3);
    const before = all(p);
    // An L2 chain from the south ending 15 cm from the plot line's end attracts onto it and promotes it to L2.
    const c = commit(p, 2, (o) => insertChain(o, [pt(2015, 1000), pt(2015, 1990)], [{ role: 'corridor_split', entity: 'way:n' }], 'mandatory'), {}, ENV);
    expect(c.record?.promoted).toEqual([s]);
    expect(p.vertices.level[s]).toBe(2);
    const promoted = all(p);
    expect(promoted.slice(0, 2)).toEqual(before.slice(0, 2));
    expect(promoted[2]).not.toBe(before[2]);
    expect(promoted).toEqual(fresh(p));
    // Removing it demotes the vertex back to L3: every level's digest is the one before, exactly.
    const d = commit(p, 2, (o) => removeEdges(o, { role: 'corridor_split', entity: 'way:n' }), {}, ENV);
    expect(d.record?.demoted.vertices).toEqual([s]);
    expect(p.vertices.level[s]).toBe(3);
    expect(all(p)).toEqual(before);
    expect(fresh(p)).toEqual(before);
    expect(levelDigestBuilds(p)).toBe(1);
  });

  it('a re-own moves the owner\'s level only, and the update names the entities whose items changed', () => {
    const p = framed();
    attachLevelDigests(p);
    const c1 = commit(p, 1, (o) => insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'), {}, ENV);
    expect(changedEntities(p, c1.record?.version ?? -1)).toContain('way:1');
    const faces = c1.record?.faces[0].created ?? [];
    const before = all(p);
    const c2 = commit(p, 1, (o) => setOwner(o, [faces[0]], 'district:a'), { stage: S6, rederivesFrom: S6 }, ENV);
    const after = all(p);
    expect(after[0]).toBe(before[0]);
    expect(after[1]).not.toBe(before[1]);
    expect(changedEntities(p, c2.record?.version ?? -1)).toContain('district:a');
    expect(changedEntities(p, 999)).toEqual([]);
    expect(after).toEqual(fresh(p));
  });

  it('resolves a FaceRef and a ChainRef to the digests of the faces and chains they name, maintained as recomputed', () => {
    const p = framed();
    attachLevelDigests(p);
    const c1 = commit(p, 1, (o) => insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'), {}, ENV);
    const faces = c1.record?.faces[0].created ?? [];
    commit(p, 1, (o) => setOwner(o, [faces[0], faces[1]], 'district:a'), { stage: S6, rederivesFrom: S6 }, ENV);
    const m = levelDigests(p);
    const f = freshLevelDigests(p);
    const face = { owner: 'district:a', level: 1 as Level };
    const chain = { role: 'way', entity: 'way:1' };
    expect(hex(m.ref(face))).toBe(hex(f.ref(face)));
    expect(hex(m.ref(chain))).toBe(hex(f.ref(chain)));
    expect(hex(m.ref(chain))).not.toBe(hex(m.ref({ role: 'way', entity: 'way:2' })));
    // A finer split of the way leaves its L1 chain digest as it was.
    const way = hex(m.ref(chain));
    commit(p, 3, (o) => insertChain(o, [pt(500, 1000), pt(2000, 1000)], [{ role: 'plot_line', entity: 'plot:1' }], 'mandatory'), {}, ENV);
    expect(hex(levelDigests(p).ref(chain))).toBe(way);
  });

  it('a commit made without the listener is caught: the state is rebuilt on the next read and counted', () => {
    const p = framed();
    attachLevelDigests(p);
    commit(p, 1, (o) => insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    expect(all(p)).toEqual(fresh(p));
    expect(levelDigestBuilds(p)).toBe(2);
    // A listener after a missed commit does not patch the stale state: it is rebuilt at the read.
    commit(p, 1, (o) => insertChain(o, [pt(1000, 0), pt(1000, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory'));
    commit(p, 1, (o) => insertChain(o, [pt(3000, 0), pt(3000, 4000)], [{ role: 'way', entity: 'way:3' }], 'mandatory'), {}, ENV);
    expect(all(p)).toEqual(fresh(p));
    expect(levelDigestBuilds(p)).toBe(3);
  });

  it('a FaceRef resolves at a level where a finer batch materialised its owner\'s own children', () => {
    const p = framed();
    attachLevelDigests(p);
    const c1 = commit(p, 1, (o) => insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'), {}, ENV);
    const faces = c1.record?.faces[0].created ?? [];
    commit(p, 1, (o) => setOwner(o, faces, 'district:a'), { stage: S6, rederivesFrom: S6 }, ENV);
    // An L3 line inside one half: its L2 parent is materialised (own child of the district's L1 face, owner inherited).
    commit(p, 3, (o) => insertChain(o, [pt(500, 1000), pt(1500, 1000)], [{ role: 'plot_line', entity: 'plot:1' }], 'mandatory'), {}, ENV);
    const ref = { owner: 'district:a', level: 2 as Level };
    expect(hex(levelDigests(p).ref(ref))).toBe(hex(freshLevelDigests(p).ref(ref)));
    expect(levelDigestBuilds(p)).toBe(1);
  });
});

/** Two isolated L1 chains inside the south half (y < 2000) of the frame cut by an L1 street along y = 2000. */
const HOLES = [
  [pt(500, 1000), pt(1200, 1000)],
  [pt(2600, 700), pt(3300, 1300)],
] as const;

/** The live face of level m with hole rings (exactly one expected). */
function faceWithHoles(p: Plat, m: Level): number {
  const found: number[] = [];
  for (let f = 0; f < p.slots.face[m].top; f++) if (isFaceLive(p, m, f) && faceWalk(p, m, f).length > 1) found.push(f);
  expect(found).toHaveLength(1);
  return found[0];
}

/** The frame and an L1 street along y = `y`; both L1 faces owned by district:a. */
function streetArena(y: number): Plat {
  const p = framed();
  attachLevelDigests(p);
  const c = commit(p, 1, (o) => insertChain(o, [pt(0, y), pt(4000, y)], [{ role: 'way', entity: 'way:1' }], 'mandatory'), {}, ENV);
  commit(p, 1, (o) => setOwner(o, c.record?.faces[0].created ?? [], 'district:a'), { stage: S6, rederivesFrom: S6 }, ENV);
  return p;
}

const DISTRICT = { owner: 'district:a', level: 1 as Level };
const WAY = { role: 'way', entity: 'way:1' };

describe('what enters an item (§6.2: vertices, roles, face owners and kinds; C-0194 (1))', () => {
  it('a chain\'s level-ℓ geometry enters its chain item: the same way moved 1 m gives another ChainRef and level digest', () => {
    const a = streetArena(2000);
    const b = streetArena(2100);
    const ra = freshLevelDigests(a);
    const rb = freshLevelDigests(b);
    expect(hex(rb.ref(WAY))).not.toBe(hex(ra.ref(WAY)));
    expect(hex(rb.ref({ ...WAY, ordinal: 0 }))).not.toBe(hex(ra.ref({ ...WAY, ordinal: 0 })));
    expect(hex(rb.level(1))).not.toBe(hex(ra.level(1)));
    // Maintained as recomputed on both.
    expect(hex(levelDigests(a).ref(WAY))).toBe(hex(ra.ref(WAY)));
    expect(hex(levelDigests(b).ref(WAY))).toBe(hex(rb.ref(WAY)));
  });

  it('a face\'s kind enters its face item: two arenas equal but for one face\'s kind differ at its level and in its FaceRef', () => {
    const a = streetArena(2000);
    const b = streetArena(2000);
    expect(fresh(b)).toEqual(fresh(a));
    const f = facesOfOwner(b, 1, handleOf(b, 'district:a'))[0];
    expect(b.faces[1].kind[f]).not.toBe(FACE_KIND_RESIDUE);
    // The kind written in place (absorbSliver's residue retype, without its geometry); read from nothing on both.
    b.faces[1].kind[f] = FACE_KIND_RESIDUE;
    expect(hex(recomputeLevelDigest(b, 1))).not.toBe(hex(recomputeLevelDigest(a, 1)));
    expect(hex(recomputeLevelDigest(b, 0))).toBe(hex(recomputeLevelDigest(a, 0)));
    expect(hex(freshLevelDigests(b).ref(DISTRICT))).not.toBe(hex(freshLevelDigests(a).ref(DISTRICT)));
  });

  it('a face\'s holes enter its face item: a face that gains a hole changes its owner\'s FaceRef digest', () => {
    const a = streetArena(2000);
    const b = streetArena(2000);
    commit(b, 1, (o) => insertChain(o, HOLES[0], [{ role: 'way', entity: 'hole:0' }], 'mandatory'), {}, ENV);
    const f = faceWithHoles(b, 1);
    expect(b.faces[1].owner[f]).toBe(handleOf(b, 'district:a'));
    expect(hex(freshLevelDigests(b).ref(DISTRICT))).not.toBe(hex(freshLevelDigests(a).ref(DISTRICT)));
    expect(hex(levelDigests(b).ref(DISTRICT))).toBe(hex(freshLevelDigests(b).ref(DISTRICT)));
    expect(all(b)).toEqual(fresh(b));
  });
});

describe('no digest depends on slot numbers', () => {
  it('equal content reached through other slots gives equal digests at every level', () => {
    const build = (shuffle: boolean): Plat => {
      const p = framed();
      attachLevelDigests(p);
      if (shuffle) {
        commit(p, 1, (o) => {
          for (let i = 0; i < 4; i++) must(insertChain(o, [pt(300 + 700 * i, 300), pt(600 + 700 * i, 3700)], [{ role: 'way', entity: `tmp:${i}` }], 'mandatory'));
          return { ok: true as const, value: null, warnings: [] };
        }, {}, ENV);
        commit(p, 1, (o) => {
          for (const i of [2, 0, 3, 1]) must(removeEdges(o, { role: 'way', entity: `tmp:${i}` }));
          return { ok: true as const, value: null, warnings: [] };
        }, {}, ENV);
      }
      commit(p, 1, (o) => insertChain(o, [pt(0, 2000), pt(1500, 2300), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'), {}, ENV);
      commit(p, 3, (o) => insertChain(o, [pt(1000, 3500), pt(1000, 2150)], [{ role: 'plot_line', entity: 'plot:1' }], 'mandatory'), {}, ENV);
      return p;
    };
    const a = build(false);
    const b = build(true);
    expect(b.slots.vertex.top).not.toBe(a.slots.vertex.top);
    expect(all(b)).toEqual(all(a));
    expect(fresh(b)).toEqual(fresh(a));
  });

  it('equal content whose face reaches two holes in either slot order gives equal digests (holes sorted, C-0194 (1))', () => {
    // The frame, an L1 street along y = 2000 and two isolated L1 chains in the south half (holes of one face), inserted
    // in either order.
    const build = (order: readonly number[]): Plat => {
      const p = framed();
      attachLevelDigests(p);
      commit(p, 1, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'), {}, ENV);
      for (const i of order) commit(p, 1, (o) => insertChain(o, HOLES[i], [{ role: 'way', entity: `hole:${i}` }], 'mandatory'), {}, ENV);
      return p;
    };
    const a = build([0, 1]);
    const b = build([1, 0]);
    // The face's hole rings come out of the walk in other orders: only the digest's sort makes them equal.
    const holeStarts = (p: Plat): number[] => {
      const f = faceWithHoles(p, 1);
      return faceWalk(p, 1, f).slice(1).map((ring) => Math.min(...ring.map((h) => p.vertices.x[p.halfEdges.origin[h]])));
    };
    expect(holeStarts(a)).toHaveLength(2);
    expect(holeStarts(b)).toEqual(holeStarts(a).slice().reverse());
    expect(all(b)).toEqual(all(a));
    expect(fresh(b)).toEqual(fresh(a));
    expect(all(a)).toEqual(fresh(a));
  });

  it('the arena\'s layer and part enter the digest', () => {
    const a = framed();
    const b = framed();
    (b as { key: Plat['key'] }).key = { layer: 'ground', part: 1 };
    expect(hex(recomputeLevelDigest(b, 0))).not.toBe(hex(recomputeLevelDigest(a, 0)));
  });
});

describe('N-56 (5): the maintained state is keyed on (restore generation, version), never the version alone (C-0299, C-0305)', () => {
  /** The rolled-back batches: n L1 ways from the south edge to the north. */
  const rolledBack = (i: number) => (o: Overlay) =>
    insertChain(o, [pt(500 + 800 * i, 0), pt(700 + 800 * i, 4000)], [{ role: 'way', entity: `gone:${i}` }], 'mandatory');
  /** The replayed batches: n other L1 ways, from the west edge to the east. */
  const replayed = (i: number) => (o: Overlay) =>
    insertChain(o, [pt(0, 600 + 900 * i), pt(4000, 800 + 900 * i)], [{ role: 'way', entity: `new:${i}` }], 'mandatory');

  /**
   * The ruling's replay (N-56 (5)): digests attached, an image taken, n committed batches (the state follows them, read
   * once: `seen`), the image put back across them with NO re-attach. Returns the arena and what the state saw.
   */
  function restoredAcross(n: number): { p: Plat; seen: string[]; version: number } {
    const p = framed();
    attachLevelDigests(p);
    const image = takeSavepoint(p);
    const version = p.version;
    for (let i = 0; i < n; i++) commit(p, 1, rolledBack(i), {}, ENV);
    const seen = all(p);
    expect(seen).toEqual(fresh(p));
    expect(levelDigestBuilds(p)).toBe(1);
    restoreSavepoint(image);
    expect(p.version).toBe(version);
    expect(restoreGeneration(p)).toBe(1);
    return { p, seen, version };
  }

  for (const n of [1, 3]) {
    it(`restore across ${n} committed batch(es), no re-attach, ${n} replayed commits, then a read: current, rebuilt once`, () => {
      const { p, seen, version } = restoredAcross(n);
      for (let i = 0; i < n; i++) commit(p, 1, replayed(i), {}, ENV);
      // The version is back where the state saw it; the listener skipped every commit of the foreign generation.
      expect(p.version).toBe(version + n);
      expect(changedEntities(p, p.version)).toEqual([]);
      const read = all(p);
      expect(read, 'never stale').toEqual(fresh(p));
      expect(levelDigestBuilds(p), 'the foreign state rebuilt on the read, and counted').toBe(2);
      // What a version-only key would have read: the rolled-back ways' digests (L1–L4 differ; L0 never moved).
      expect(read[0]).toBe(seen[0]);
      for (let m = 1; m <= 4; m++) expect(read[m], `L${m}`).not.toBe(seen[m]);
      // Maintained from the rebuilt state on: the next commits keep it current, with no further build.
      const c = commit(p, 2, (o) => insertChain(o, [pt(2100, 300), pt(2300, 3700)], [{ role: 'kerb', entity: 'lane:9' }], 'mandatory'), {}, ENV);
      expect(changedEntities(p, c.record?.version ?? -1)).toContain('lane:9');
      expect(all(p)).toEqual(fresh(p));
      expect(levelDigestBuilds(p)).toBe(2);
    });

    it(`restore across ${n} committed batch(es), no re-attach, ${n + 1} commits before the read: the listener never patches the foreign state`, () => {
      // At the (n + 1)-th commit the version-only key would match (the state's version = the commit's − 1) and the
      // listener would patch the stale state incrementally; the generation refuses it.
      const { p } = restoredAcross(n);
      for (let i = 0; i <= n; i++) commit(p, 1, replayed(i), {}, ENV);
      expect(changedEntities(p, p.version)).toEqual([]);
      expect(all(p)).toEqual(fresh(p));
      expect(levelDigestBuilds(p)).toBe(2);
      for (const l of LV) expect(hex(levelDigests(p).level(l))).toBe(hex(recomputeLevelDigest(p, l)));
    });
  }

  it('a read between the restore and the replay rebuilds once; the replayed commits are maintained from there', () => {
    const { p } = restoredAcross(3);
    expect(all(p)).toEqual(fresh(p));
    expect(levelDigestBuilds(p)).toBe(2);
    for (let i = 0; i < 3; i++) {
      const c = commit(p, 1, replayed(i), {}, ENV);
      expect(changedEntities(p, c.record?.version ?? -1)).toContain(`new:${i}`);
      expect(all(p)).toEqual(fresh(p));
    }
    expect(levelDigestBuilds(p)).toBe(2);
  });

  it('the re-attach path is unchanged: restored, re-attached (C-0287 (2)), replayed — current with one build', () => {
    for (const n of [1, 3]) {
      const { p } = restoredAcross(n);
      attachLevelDigests(p);
      expect(levelDigestBuilds(p)).toBe(1);
      for (let i = 0; i <= n; i++) {
        const c = commit(p, 1, replayed(i), {}, ENV);
        expect(changedEntities(p, c.record?.version ?? -1)).toContain(`new:${i}`);
      }
      expect(all(p)).toEqual(fresh(p));
      expect(levelDigestBuilds(p), `n = ${n}`).toBe(1);
    }
  });

  it('a second restore across committed batches is a second foreign generation', () => {
    const { p } = restoredAcross(1);
    commit(p, 1, replayed(0), {}, ENV);
    expect(all(p)).toEqual(fresh(p));
    expect(levelDigestBuilds(p)).toBe(2);
    const image = takeSavepoint(p);
    commit(p, 1, replayed(1), {}, ENV);
    expect(all(p)).toEqual(fresh(p));
    restoreSavepoint(image);
    expect(restoreGeneration(p)).toBe(2);
    commit(p, 1, rolledBack(2), {}, ENV);
    expect(all(p)).toEqual(fresh(p));
    expect(levelDigestBuilds(p)).toBe(3);
  });
});

// Paths and lanes the fuzz families reach only together with another one, each pinned alone (C-0387).
describe('reach and lanes the fuzz families cover only together', () => {
  /** An env that keeps the last commit's dirty set and record beside the digest listener. */
  function watching(): { env: TxEnv; last: () => { dirty: DirtySet; record: CommitRecord } } {
    let seen: { dirty: DirtySet; record: CommitRecord } | null = null;
    const env: TxEnv = {
      onCommit: (p, dirty, record) => {
        seen = { dirty, record };
        updateLevelDigests(p, dirty, record);
      },
    };
    return { env, last: () => seen as unknown as { dirty: DirtySet; record: CommitRecord } };
  }

  it('a promotion moves a face no dirty face names: the record\'s promoted and demoted vertices reach their neighbours\' items (N-2, K3)', () => {
    const { env, last } = watching();
    const p = framed();
    attachLevelDigests(p);
    commit(p, 1, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'), {}, env);
    // An L3 plot line from the north ending on the street at s; an L2 kerb in the south half, so the south L2 face exists.
    commit(p, 3, (o) => insertChain(o, [pt(2000, 3500), pt(2000, 2000)], [{ role: 'plot_line', entity: 'plot:1' }], 'mandatory'), {}, env);
    commit(p, 2, (o) => insertChain(o, [pt(3500, 500), pt(3500, 1500)], [{ role: 'kerb', entity: 'lane:s' }], 'mandatory'), {}, env);
    const north: number[] = [];
    for (let f = 0; f < p.slots.face[2].top; f++) {
      if (isFaceLive(p, 2, f) && faceWalk(p, 2, f)[0].some((h) => p.vertices.y[p.halfEdges.origin[h]] === 4000)) north.push(f);
    }
    expect(north).toHaveLength(1);
    // The north L2 face re-owned, so it is an item of the L2 tree (no longer its parent's own child).
    commit(p, 2, (o) => setOwner(o, north, 'block:n'), { stage: S6, rederivesFrom: S6 }, env);
    const s = vertexAtPoint(p, 2000, 2000);
    const ref = { owner: 'block:n', level: 2 as Level };
    const before = all(p);
    const refBefore = hex(levelDigests(p).ref(ref));
    // An L2 spur from the south ends 15 cm from s: s is promoted to L2 and now enters the north face's L2 ring.
    commit(p, 2, (o) => insertChain(o, [pt(2015, 1000), pt(2015, 1990)], [{ role: 'corridor_split', entity: 'way:n' }], 'mandatory'), {}, env);
    const { dirty, record } = last();
    expect(record.promoted).toEqual([s]);
    expect(dirty.owners).not.toContain('block:n');
    for (const d of dirty.faces) for (const f of [...d.created, ...d.changed, ...d.removed]) expect(d.level === 2 && f === north[0], `L${d.level} face ${f}`).toBe(false);
    expect(changedEntities(p, dirty.version)).toContain('block:n');
    expect(hex(levelDigests(p).ref(ref))).not.toBe(refBefore);
    expect(hex(levelDigests(p).ref(ref))).toBe(hex(freshLevelDigests(p).ref(ref)));
    expect(all(p)).toEqual(fresh(p));
    // Its removal demotes s: every level digest and the reference come back exactly.
    commit(p, 2, (o) => removeEdges(o, { role: 'corridor_split', entity: 'way:n' }), {}, env);
    expect(last().record.demoted.vertices).toEqual([s]);
    expect(all(p)).toEqual(before);
    expect(hex(levelDigests(p).ref(ref))).toBe(refBefore);
    expect(fresh(p)).toEqual(before);
    expect(levelDigestBuilds(p)).toBe(1);
  });

  it('a chain\'s entity enters its chain item: 65 arenas equal but for the way\'s entity give 65 level digests (N-3, K12)', () => {
    // 65 entities in DIGEST_BUCKETS = 64 buckets: two of them share a bucket, so only the item's entity lane tells
    // them apart there.
    const seen = new Set<string>();
    for (let i = 0; i < 65; i++) {
      const p = framed();
      commit(p, 1, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: `way:${i}` }], 'mandatory'));
      seen.add(hex(recomputeLevelDigest(p, 1)));
    }
    expect(seen.size).toBe(65);
  });

  it('a chain\'s x coordinates enter its chain item: a slanted way whose bend moves 2 m east gives another ChainRef (N-12, K13x)', () => {
    const bent = (x: number): Plat => {
      const p = framed();
      attachLevelDigests(p);
      commit(p, 1, (o) => insertChain(o, [pt(0, 2000), pt(x, 2300), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'), {}, ENV);
      return p;
    };
    const a = bent(1500);
    const b = bent(1700);
    expect(hex(freshLevelDigests(b).ref(WAY))).not.toBe(hex(freshLevelDigests(a).ref(WAY)));
    expect(hex(freshLevelDigests(b).ref({ ...WAY, ordinal: 0 }))).not.toBe(hex(freshLevelDigests(a).ref({ ...WAY, ordinal: 0 })));
    expect(hex(levelDigests(a).ref(WAY))).toBe(hex(freshLevelDigests(a).ref(WAY)));
    expect(hex(levelDigests(b).ref(WAY))).toBe(hex(freshLevelDigests(b).ref(WAY)));
  });

  it('a hole\'s place enters its face item: the same face with its hole 1 m east, or 1 m north, gives another FaceRef (N-13, K16c)', () => {
    const holed = (dx: number, dy: number): Plat => {
      const p = streetArena(2000);
      const hole = HOLES[0].map((q) => pt(q.x + dx, q.y + dy));
      commit(p, 1, (o) => insertChain(o, hole, [{ role: 'way', entity: 'hole:0' }], 'mandatory'), {}, ENV);
      expect(faceWalk(p, 1, faceWithHoles(p, 1))).toHaveLength(2);
      return p;
    };
    const refs = [holed(0, 0), holed(100, 0), holed(0, 100)].map((p) => {
      expect(hex(levelDigests(p).ref(DISTRICT))).toBe(hex(freshLevelDigests(p).ref(DISTRICT)));
      return hex(freshLevelDigests(p).ref(DISTRICT));
    });
    expect(new Set(refs).size).toBe(3);
  });

  it('an own child re-owned is its own face again: it enters its level\'s tree, and leaves it when owned back (N-9)', () => {
    const p = streetArena(2000);
    // An L3 line inside the south half materialises its L2 parent: the own child of district:a's L1 face.
    commit(p, 3, (o) => insertChain(o, [pt(500, 1000), pt(1500, 1000)], [{ role: 'plot_line', entity: 'plot:1' }], 'mandatory'), {}, ENV);
    const l2: number[] = [];
    for (let f = 0; f < p.slots.face[2].top; f++) if (isFaceLive(p, 2, f)) l2.push(f);
    expect(l2).toHaveLength(1);
    expect(p.faces[2].owner[l2[0]]).toBe(handleOf(p, 'district:a'));
    const own = all(p);
    commit(p, 2, (o) => setOwner(o, l2, 'block:a'), { stage: S6, rederivesFrom: S6 }, ENV);
    const reowned = all(p);
    expect(reowned.slice(0, 2)).toEqual(own.slice(0, 2));
    for (let m = 2; m <= 4; m++) expect(reowned[m], `L${m}`).not.toBe(own[m]);
    expect(reowned).toEqual(fresh(p));
    commit(p, 2, (o) => setOwner(o, l2, 'district:a'), { stage: S6, rederivesFrom: S6 }, ENV);
    expect(all(p)).toEqual(own);
    expect(fresh(p)).toEqual(own);
    expect(levelDigestBuilds(p)).toBe(1);
  });

  it('two faces of one level that share a sort key are refused, never ordered by insertion (§3.3: the key is total; N-6)', () => {
    // Every vertex written finer than L1 in place: both L1 faces lose every vertex of their L1 rings, so both read the
    // key [0, 0, 0, 0] — the degenerate face of N-6, which no lawful arena holds.
    const p = streetArena(2000);
    for (let v = 0; v < p.slots.vertex.top; v++) p.vertices.level[v] = 4;
    expect(() => recomputeLevelDigest(p, 0)).not.toThrow();
    expect(() => recomputeLevelDigest(p, 1)).toThrow('digest: two L1 face items share the sort key 0,0,0,0 (§3.3: the key is total; a degenerate face)');
    // A FaceRef over both (district:a owns them) reads them in the same order, so it is refused alike.
    expect(() => freshLevelDigests(p).ref(DISTRICT)).toThrow('digest: two L1 face items share the sort key 0,0,0,0 (§3.3: the key is total; a degenerate face)');
  });
});
