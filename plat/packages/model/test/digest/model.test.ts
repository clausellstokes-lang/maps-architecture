// M0-d-04: the model digest (§6.2; §3.3 *The commit record*; C-0194). The full recomputation equals the maintained root
// after every batch of every fuzz run (the CI oracle, §5.3's CI-only row; the spike runs' half is M0-d-09's);
// layers, parent nodes, the identity and plats nodes; finalisation on read; the three fallbacks as switches, off by
// default and root-neutral when on; the oracle catches a stale leaf. A savepoint put back across committed batches
// (C-0299, C-0305) leaves neither the kernel's level digests nor this tree stale, re-attached or not.
import { attachLevelDigests, levelDigest, levelDigestBuilds, recomputeLevelDigest, restoreGeneration, restoreSavepoint, takeSavepoint, updateLevelDigests, type CommitRecord, type DirtySet, type Overlay, type Plat } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { DIGEST_LAYERS, ModelDigest, type DigestEntry } from '../../src/digest/index.js';
import { faceWalk, insertChain, isFaceLive, setOwner, tx, type StageId } from '@plat/kernel';
import { blockEntry, commit, districtEntry, framed, hex, plotEntry, pt, randomBatch, rng, spec, wayEntry, type Live } from './support.js';

/** A model over a framed arena: four districts, a block and a plot in each; ways registered as they are inserted. */
function setup(switches = {}): { md: ModelDigest; p: Plat } {
  const md = new ModelDigest(switches);
  const p = framed(4000);
  md.addArena(p);
  md.batch(() => {
    for (let d = 0; d < 4; d++) {
      md.put(districtEntry(`district:${d}`));
      md.put(blockEntry(`block:${d}`, `district:${d}`));
      md.put(plotEntry(`plot:${d}`, `block:${d}`, `district:${d}`));
    }
  });
  return { md, p };
}

/** One fuzz run: every committed batch followed by the oracle; ways get their records as they land. */
function run(seed: number, steps: number, switches = {}): { md: ModelDigest; roots: string[] } {
  const { md, p } = setup(switches);
  const r = rng(seed);
  const live: Live = { ways: [], lanes: [], next: 0 };
  const roots: string[] = [];
  for (let step = 0; step < steps; step++) {
    const before = live.ways.slice();
    const b = randomBatch(p, live, r);
    const res = tx(p, spec(b.level, b.over), b.fn, { onCommit: md.listener });
    if (!res.ok) {
      live.ways = before;
      continue;
    }
    // The stage writes its records: a new way's record, a removed way's record gone.
    md.batch(() => {
      for (const id of live.ways) if (md.leaf(id) === undefined) md.put(wayEntry(id));
      for (const id of before) if (!live.ways.includes(id)) md.remove(id);
    });
    if (md.switches.deferLeaves) md.flush(); // fallback (i): the coarser boundary
    const o = md.oracle(seed + step);
    expect(o.ok, `seed ${seed} step ${step} (${b.kind}): ${o.mismatches.join(', ')}`).toBe(true);
    roots.push(hex(md.finaliseRoot()));
    expect(levelDigestBuilds(p)).toBe(1);
  }
  return { md, roots };
}

describe('the full recomputation equals the maintained root after every batch (the CI oracle, §5.3)', () => {
  for (let seed = 1; seed <= 12; seed++) {
    it(`fuzz run ${seed}`, () => {
      const { roots } = run(seed * 7919, 16);
      expect(roots.length).toBeGreaterThan(0);
    }, 120_000);
  }

  it('the oracle reads the geometry from nothing: a stale kernel state carrying the arena\'s version is caught', () => {
    for (const switches of [{}, { subtreeOracle: true }]) {
      const { md, p } = setup(switches);
      md.put(wayEntry('way:9'));
      // One batch whose kernel half skips its re-hash (the dirty faces, owners and keys dropped) but still advances the
      // state's version, so no rebuild repairs it: the maintained level digests and resolved references are stale.
      const stale = (plat: Plat, dirty: DirtySet, record: CommitRecord): void => {
        updateLevelDigests(plat, { ...dirty, faces: [], owners: [], roles: [] }, record);
        md.onDirty(dirty);
      };
      commit(p, 1, (o) => insertChain(o, [pt(0, 1000), pt(4000, 1300)], [{ role: 'way', entity: 'way:9' }], 'mandatory'), { onCommit: stale });
      expect(levelDigestBuilds(p)).toBe(1);
      expect(hex(levelDigest(p, 1))).not.toBe(hex(recomputeLevelDigest(p, 1)));
      const o = md.oracle(7);
      expect(o.ok).toBe(false);
      if (o.mode === 'root') expect(o.mismatches).toEqual(['root']);
      else expect(o.mismatches).toContain('plats');
    }
  });

  it('the oracle catches a stale leaf: a record changed in place without its write', () => {
    const { md } = setup();
    expect(md.oracle().ok).toBe(true);
    const e = plotEntry('plot:x', 'block:0', 'district:0', 0.25);
    md.put(e);
    (e.record as { builtProsperity: number }).builtProsperity = 0.75; // no put: the maintained leaf is stale
    expect(md.oracle()).toEqual({ mode: 'root', ok: false, mismatches: ['root'] });
    md.put(e);
    expect(md.oracle().ok).toBe(true);
  });
});

describe('the tree', () => {
  it('a block and its plots hang under their district; the root is a function of the records, not of their order', () => {
    const a = new ModelDigest();
    const b = new ModelDigest();
    const entries: DigestEntry[] = [districtEntry('district:a'), blockEntry('block:a', 'district:a'), plotEntry('plot:a', 'block:a', 'district:a'), plotEntry('plot:b', 'block:a', 'district:a'), wayEntry('way:1')];
    for (const e of entries) a.put(e);
    for (const e of entries.slice().reverse()) b.put(e);
    expect(hex(b.finaliseRoot())).toBe(hex(a.finaliseRoot()));
    expect(hex(a.finaliseRoot())).toBe(hex(a.recomputeRoot()));
    // A plot re-parented to another block moves its node; the oracle holds through it.
    const before = hex(a.layer('districts'));
    a.put(blockEntry('block:b', 'district:a'));
    const moved = plotEntry('plot:b', 'block:b', 'district:a');
    a.put({ ...moved, identity: { ...moved.identity, lineage: (entries[3] as DigestEntry).identity.lineage } });
    expect(hex(a.layer('districts'))).not.toBe(before);
    expect(hex(a.finaliseRoot())).toBe(hex(a.recomputeRoot()));
    // Removing the district leaves its blocks at the layer's top; the oracle still holds.
    a.remove('district:a');
    expect(hex(a.finaliseRoot())).toBe(hex(a.recomputeRoot()));
    expect(a.size).toBe(entries.length);
  });

  it('each layer moves only with its own records; the eleven layers are §6.2\'s, in order', () => {
    expect(DIGEST_LAYERS).toEqual(['site', 'network', 'districts', 'hinterland', 'content', 'names', 'closeups', 'underground', 'sky', 'identity', 'plats']);
    const md = new ModelDigest();
    md.put(districtEntry('district:a'));
    const layers = (): Record<string, string> => Object.fromEntries(DIGEST_LAYERS.map((l) => [l, hex(md.layer(l))]));
    const l0 = layers();
    md.put(wayEntry('way:1'));
    const l1 = layers();
    for (const l of DIGEST_LAYERS) expect(l1[l] === l0[l], l).toBe(l !== 'network');
    md.putTombstone({ id: 'plot:gone', supersededBy: 'plot:other' });
    const other = hex(md.layer('identity'));
    md.putTombstone({ id: 'plot:gone', supersededBy: 'plot:new' });
    expect(hex(md.layer('identity'))).not.toBe(other);
    const l2 = layers();
    for (const l of DIGEST_LAYERS) expect(l2[l] === l1[l], l).toBe(l !== 'identity');
    md.setEvents('way:1', [{ id: 'way:1', seq: 0, epoch: 0, kind: 'generated', cause: 'generation' }]);
    expect(hex(md.layer('identity'))).not.toBe(l2.identity);
    expect(hex(md.finaliseRoot())).toBe(hex(md.recomputeRoot()));
    md.setEvents('way:1', []);
    md.removeTombstone('plot:gone');
    expect(hex(md.layer('identity'))).toBe(l0.identity);
    expect(() => md.setEvents('way:1', [{ id: 'way:2', seq: 0, epoch: 0, kind: 'generated', cause: 'generation' }])).toThrow(RangeError);
  });

  it('a batch on a registered arena moves the plats node and the leaves whose faces or chains it touched', () => {
    const { md, p } = setup();
    md.put(wayEntry('way:9'));
    const plats = hex(md.layer('plats'));
    const way = hex(md.leaf('way:9'));
    const network = hex(md.layer('network'));
    commit(p, 1, (o) => insertChain(o, [pt(0, 1000), pt(4000, 1300)], [{ role: 'way', entity: 'way:9' }], 'mandatory'), { onCommit: md.listener });
    expect(hex(md.layer('plats'))).not.toBe(plats);
    expect(hex(md.leaf('way:9'))).not.toBe(way);
    expect(hex(md.layer('network'))).not.toBe(network);
    expect(hex(md.finaliseRoot())).toBe(hex(md.recomputeRoot()));
  });

  it('a record whose face changed beside a batch that never named it is re-hashed (the kernel\'s changed entities)', () => {
    const md = new ModelDigest();
    const p = framed(4000);
    md.addArena(p);
    const env = { onCommit: md.listener };
    commit(p, 1, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'), env);
    // An L3 plot line from the north ending on the street; the L3 face east of it owned by plot:1.
    commit(p, 3, (o) => insertChain(o, [pt(2000, 3500), pt(2000, 2000)], [{ role: 'plot_line', entity: 'plot:9' }], 'mandatory'), env);
    let east = -1;
    for (let f = 0; f < p.slots.face[3].top; f++) {
      if (!isFaceLive(p, 3, f)) continue;
      const ring = faceWalk(p, 3, f)[0].map((h) => p.vertices.x[p.halfEdges.origin[h]]);
      if (ring.includes(4000) && ring.includes(2000)) east = f;
    }
    expect(east).toBeGreaterThanOrEqual(0);
    commit(p, 3, (o) => setOwner(o, [east], 'plot:1'), env, { stage: 10 as StageId, rederivesFrom: 10 as StageId });
    md.put(plotEntry('plot:1', 'block:1', 'district:1'));
    const leaf = hex(md.leaf('plot:1'));
    // An L2 chain from the south ends on the street 60 cm east of the plot line: an L2 Steiner vertex on the plot's ring.
    commit(p, 2, (o) => insertChain(o, [pt(2060, 1000), pt(2060, 1990)], [{ role: 'corridor_split', entity: 'way:n' }], 'mandatory'), env);
    expect(hex(md.leaf('plot:1'))).not.toBe(leaf);
    expect(md.oracle().ok).toBe(true);
  });

  it('a record\'s leaf takes its chains\' geometry: the same way 1 m further north gives another leaf', () => {
    const leafAt = (y: number): string => {
      const md = new ModelDigest();
      const p = framed(4000);
      md.addArena(p);
      md.put(wayEntry('way:1'));
      commit(p, 1, (o) => insertChain(o, [pt(0, y), pt(4000, y)], [{ role: 'way', entity: 'way:1' }], 'mandatory'), { onCommit: md.listener });
      expect(md.oracle().ok).toBe(true);
      return hex(md.leaf('way:1'));
    };
    expect(leafAt(2100)).not.toBe(leafAt(2000));
  });

  it('a record\'s leaf takes its faces\' holes: a district face that gains an isolated inner chain moves the district\'s leaf', () => {
    const md = new ModelDigest();
    const p = framed(4000);
    md.addArena(p);
    md.put(districtEntry('district:1'));
    const env = { onCommit: md.listener };
    commit(p, 1, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'), env);
    const owned: number[] = [];
    for (let f = 0; f < p.slots.face[1].top; f++) if (isFaceLive(p, 1, f)) owned.push(f);
    commit(p, 1, (o) => setOwner(o, owned, 'district:1'), env, { stage: 6 as StageId, rederivesFrom: 6 as StageId });
    const before = hex(md.leaf('district:1'));
    commit(p, 1, (o) => insertChain(o, [pt(500, 1000), pt(1200, 1000)], [{ role: 'way', entity: 'way:2' }], 'mandatory'), env);
    let holed = 0;
    for (let f = 0; f < p.slots.face[1].top; f++) if (isFaceLive(p, 1, f) && faceWalk(p, 1, f).length > 1) holed++;
    expect(holed).toBe(1);
    expect(hex(md.leaf('district:1'))).not.toBe(before);
    expect(md.oracle().ok).toBe(true);
  });

  it('a record whose arena is registered later is re-hashed then', () => {
    const md = new ModelDigest();
    md.put(wayEntry('way:9'));
    const unresolved = hex(md.leaf('way:9'));
    const p = framed(4000);
    md.addArena(p);
    // Its spine now resolves in the arena (no rows of way:9 there yet: the empty chain), no longer unresolved.
    expect(hex(md.leaf('way:9'))).not.toBe(unresolved);
    expect(hex(md.finaliseRoot())).toBe(hex(md.recomputeRoot()));
  });
});

describe('the pre-decided fallbacks are switches, off by default, and none moves a root (§6.2 (i)–(iii))', () => {
  it('the defaults: every switch off', () => {
    expect(new ModelDigest().switches).toEqual({ deferLeaves: false, rootOnReadOnly: false, subtreeOracle: false });
  });

  it('(i) deferred leaves: the same roots, batch for batch, once flushed at the coarser boundary', () => {
    const plain = run(5 * 7919, 12).roots;
    const deferred = run(5 * 7919, 12, { deferLeaves: true }).roots;
    expect(deferred).toEqual(plain);
  });

  it('(i) a rewritten leaf is re-hashed at the boundary, not at the write (a new one when first read)', () => {
    const md = new ModelDigest({ deferLeaves: true });
    const e = plotEntry('plot:1', 'block:1', 'district:1', 0.2);
    md.put(e);
    const first = hex(md.leaf('plot:1'));
    expect(first).not.toBe('null');
    md.put({ ...e, record: { ...e.record, builtProsperity: 0.4 } });
    expect(hex(md.leaf('plot:1'))).toBe(first);
    md.flush();
    expect(hex(md.leaf('plot:1'))).not.toBe(first);
  });

  it('(ii) the root left unfinalised at a stage end, and the root read is the default\'s', () => {
    const a = new ModelDigest();
    const b = new ModelDigest({ rootOnReadOnly: true });
    for (const md of [a, b]) {
      md.put(districtEntry('district:a'));
      md.put(wayEntry('way:1'));
    }
    expect(a.stageEnd()).not.toBeNull();
    expect(b.stageEnd()).toBeNull();
    expect(hex(b.finaliseRoot())).toBe(hex(a.stageEnd()));
  });

  it('(iii) the subtree oracle: one subtree per layer by seed, every subtree covered across seeds; it catches a stale one', () => {
    const { roots } = run(3 * 7919, 10, { subtreeOracle: true });
    expect(roots).toEqual(run(3 * 7919, 10).roots);
    const md = new ModelDigest({ subtreeOracle: true });
    const plots = [0, 1, 2, 3].map((i) => plotEntry(`plot:${i}`, `block:${i}`, `district:${i}`));
    for (const e of plots) md.put(e);
    expect(md.oracle(1).mode).toBe('subtrees');
    expect(md.oracle(1).ok).toBe(true);
    (plots[2].record as { builtProsperity: number }).builtProsperity = 0.9;
    const caught = new Set<string>();
    for (let seed = 0; seed < 64; seed++) for (const m of md.oracle(seed).mismatches) caught.add(m);
    expect([...caught]).toEqual(['districts:plot:2']);
  });
});

describe('N-56 (5): a savepoint put back across committed batches (C-0299, C-0305)', () => {
  const LV = [0, 1, 2, 3, 4] as const;
  /** The rolled-back batches: way:9 inserted (its record written before), the L1 faces re-owned, way:10 inserted. */
  const rolledBack = (p: Plat, i: number) => (o: Overlay) => {
    if (i % 3 === 0) return insertChain(o, [pt(0, 1000), pt(4000, 1300)], [{ role: 'way', entity: 'way:9' }], 'mandatory');
    if (i % 3 === 1) {
      const owned: number[] = [];
      for (let f = 0; f < p.slots.face[1].top; f++) if (isFaceLive(p, 1, f)) owned.push(f);
      return setOwner(o, owned, 'district:0');
    }
    return insertChain(o, [pt(1500, 0), pt(1700, 4000)], [{ role: 'way', entity: 'way:10' }], 'mandatory');
  };
  const over = (i: number) => (i % 3 === 1 ? { stage: 6 as StageId, rederivesFrom: 6 as StageId } : {});
  /** The replayed batches: other L1 ways, no record of their own. */
  const replayed = (i: number) => (o: Overlay) => insertChain(o, [pt(2500 + 300 * i, 0), pt(2600 + 300 * i, 4000)], [{ role: 'way', entity: `new:${i}` }], 'mandatory');

  /** The model over a framed arena; n committed batches through its listener; the image put back with no re-attach. */
  function restoredAcross(n: number, switches = {}): { md: ModelDigest; p: Plat; seen: string } {
    const { md, p } = setup(switches);
    md.put(wayEntry('way:9'));
    md.put(wayEntry('way:10'));
    const image = takeSavepoint(p);
    for (let i = 0; i < n; i++) commit(p, 1, rolledBack(p, i), { onCommit: md.listener }, over(i));
    if (md.switches.deferLeaves) md.flush();
    expect(md.oracle(n).ok).toBe(true);
    const seen = hex(md.finaliseRoot());
    restoreSavepoint(image);
    expect(restoreGeneration(p)).toBe(1);
    return { md, p, seen };
  }

  for (const switches of [{}, { deferLeaves: true }, { subtreeOracle: true }]) {
    for (const n of [1, 3]) {
      it(`${JSON.stringify(switches)} n = ${n}: read at once, no commit and no re-attach — the tree reads the restored arena`, () => {
        const { md, seen } = restoredAcross(n, switches);
        const o = md.oracle(n);
        expect(o.ok, o.mismatches.join(', ')).toBe(true);
        expect(hex(md.finaliseRoot())).toBe(hex(md.recomputeRoot()));
        expect(hex(md.finaliseRoot())).not.toBe(seen);
      });

      it(`${JSON.stringify(switches)} n = ${n}: ${n} and ${n + 1} replayed commits, no re-attach, no read between — never stale`, () => {
        const { md, p } = restoredAcross(n, switches);
        for (let i = 0; i <= n; i++) {
          commit(p, 1, replayed(i), { onCommit: md.listener });
          if (i === 0 && !md.switches.deferLeaves) {
            // The commit's own maintenance re-hashed the leaves resolving in the restored arena (before any root read):
            // way:9's leaf is the one a model registered now computes (its spine was rolled back).
            const twin = new ModelDigest();
            twin.addArena(p);
            twin.put(wayEntry('way:9'));
            expect(hex(md.leaf('way:9'))).toBe(hex(twin.leaf('way:9')));
          }
          if (i < n - 1) continue; // no read until the version is back where the stale state saw it
          if (md.switches.deferLeaves) md.flush();
          const o = md.oracle(i);
          expect(o.ok, `after ${i + 1}: ${o.mismatches.join(', ')}`).toBe(true);
          for (const l of LV) expect(hex(levelDigest(p, l)), `L${l}`).toBe(hex(recomputeLevelDigest(p, l)));
        }
        expect(levelDigestBuilds(p), 'the foreign kernel state rebuilt once').toBe(2);
      });
    }
  }

  it('the re-attach path is unchanged (C-0287 (2), C-0295): re-attached and re-registered, current with one build', () => {
    for (const n of [1, 3]) {
      const { md, p } = restoredAcross(n);
      attachLevelDigests(p);
      md.addArena(p);
      expect(md.oracle().ok).toBe(true);
      for (let i = 0; i <= n; i++) {
        commit(p, 1, replayed(i), { onCommit: md.listener });
        expect(md.oracle(i).ok).toBe(true);
      }
      expect(levelDigestBuilds(p), `n = ${n}`).toBe(1);
    }
  });
});
