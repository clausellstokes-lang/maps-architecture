// M0-d-08: the slot-renumbering harness (§13.1 "renumbering the arena's slots gives identical output"; §3.3 "No output
// depends on slot numbers": every tie-break uses lattice positions, canonical item keys or entity ids, never a slot).
// renumberSlots' contract (every slot table permuted, every table naming a slot rewritten, the copy a valid arena with
// the original's index state), the bar "renumbering + next op: identical output on every constructive arena", and the
// negative control: a planted slot-dependent tie-break is detected, its canonical twin passes.
import { describe, expect, it, vi } from 'vitest';
import {
  checkIndexState,
  FREE_KIND,
  rebuildAtStageEnd,
  roleInfo,
  faceKey,
  hasLevelDigests,
  attachLevelDigests,
  isFaceLive,
  isHalfEdgeLive,
  isVertexLive,
  levelDigest,
  LEVELS,
  query,
  setOwner,
  insertChain,
  type Overlay,
  type Plat,
} from '@plat/kernel';
import {
  arenaPrint,
  determinismPoint as lp,
  fixtureSpec,
  levelDigestsHex,
  outcomePrint,
  recordPrint,
  renumbering,
  renumberSlots,
  runBatch,
  runSequenceOutcomes,
  runTwiceCompare,
  FIXTURE_KEY,
  type DeterminismSequence,
} from '@plat/testkit';
import { constructiveSequences, CROWDED, KERNEL_SEQUENCES, partitionerSequence } from './support.js';

// The bars run every fixture through several runs each: more than vitest's default 5 s per test.
vi.setConfig({ testTimeout: 180_000 });

/** The arena after every batch of a sequence (the last arena a fixture builds). */
function built(s: DeterminismSequence, upTo = s.batches.length): Plat {
  const p = s.arena();
  for (const b of s.batches.slice(0, upTo)) {
    try {
      runBatch(p, b.build(p));
    } catch {
      // a programming error leaves the arena as it was (tx's own guarantee)
    }
  }
  return p;
}

function isPermutation(m: Int32Array): boolean {
  const seen = new Uint8Array(m.length);
  for (const v of m) {
    if (v < 0 || v >= m.length || seen[v] === 1) return false;
    seen[v] = 1;
  }
  return true;
}

/** A query's answer on the whole frame as lattice points (§3.3's canonical order; slots read as positions). */
function answer(p: Plat, level: 0 | 1 | 2 | 3 | 4): string {
  const r = query(p, FIXTURE_KEY, level, { minX: -1e7, minY: -1e7, maxX: 1e7, maxY: 1e7 } as never);
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  return JSON.stringify({
    v: r.vertices.map((v) => `${X[v]},${Y[v]}`),
    e: r.edges.map((h) => `${X[O[h]]},${Y[O[h]]}>${X[O[h ^ 1]]},${Y[O[h ^ 1]]}`),
    f: r.faces.map((f) => faceKey(p, level, f).map((v) => `${X[v]},${Y[v]}`).join('>')),
  });
}

describe('renumberSlots(plat, seed): the same arena under other slot numbers', () => {
  const arenas = (): Plat[] => [...KERNEL_SEQUENCES.map((s) => built(s)), built(partitionerSequence()), built(CROWDED[5])];

  it('permutes every slot table (vertex, pair, face per level, role row), moving slots (vertices, pairs, faces of some level), and leaves the original unchanged', () => {
    for (const p of arenas()) {
      const before = arenaPrint(p);
      const x = p.vertices.x.slice();
      const { plat: q, maps } = renumbering(p, 11);
      expect(arenaPrint(p)).toBe(before);
      expect(p.vertices.x).toEqual(x);
      for (const m of [maps.vertex, maps.pair, maps.role, ...maps.face]) expect(isPermutation(m)).toBe(true);
      expect(maps.vertex.length).toBe(p.slots.vertex.top);
      expect(maps.pair.length).toBe(p.slots.pair.top);
      // The slots really move: some live vertex, pair and L1 face sits elsewhere, and some pair's halves are swapped.
      let movedV = 0;
      for (let v = 0; v < p.slots.vertex.top; v++) if (isVertexLive(p, v) && maps.vertex[v] !== v) movedV++;
      expect(movedV).toBeGreaterThan(0);
      expect([...maps.flip].some((f) => f === 1)).toBe(true);
      // (a small table can draw the identity: some seed of five moves a face)
      expect([11, 12, 13, 14, 15].some((k) => renumbering(p, k).maps.face.some((m) => [...m].some((v, i) => v !== i)))).toBe(true);
      // Each moved element carries its content to its new slot.
      for (let v = 0; v < p.slots.vertex.top; v++) {
        if (!isVertexLive(p, v)) continue;
        expect([q.vertices.x[maps.vertex[v]], q.vertices.y[maps.vertex[v]], q.vertices.level[maps.vertex[v]]]).toEqual([p.vertices.x[v], p.vertices.y[v], p.vertices.level[v]]);
      }
      for (let e = 0; e < p.slots.pair.top; e++) {
        if (!isHalfEdgeLive(p, 2 * e)) continue;
        const g = 2 * maps.pair[e] + maps.flip[e];
        expect(q.halfEdges.origin[g]).toBe(maps.vertex[p.halfEdges.origin[2 * e]]);
        expect(q.halfEdges.level[maps.pair[e]]).toBe(p.halfEdges.level[e]);
      }
      for (const l of LEVELS) for (let f = 0; f < p.slots.face[l].top; f++) expect(isFaceLive(q, l, maps.face[l][f])).toBe(isFaceLive(p, l, f));
      // The same arena: the slot-free print, the five level digests, the version and the slot counts.
      expect(arenaPrint(q)).toBe(before);
      expect(levelDigestsHex(q)).toEqual(levelDigestsHex(p));
      expect(q.slots.vertex.live).toBe(p.slots.vertex.live);
    }
  });

  it('the copy is a valid arena with the original\'s index state, answering every query as the original does', () => {
    for (const p of arenas()) {
      for (const q of [renumberSlots(p, 3), renumberSlots(p, 3, { mode: 'reverse' })]) {
        expect(checkIndexState(q)).toEqual([]);
        for (const l of LEVELS) expect(answer(q, l)).toBe(answer(p, l));
      }
    }
  });

  it('reverse mode reverses every slot table; a seed fixes the permutation', () => {
    const p = built(KERNEL_SEQUENCES[0]);
    const { maps } = renumbering(p, 1, { mode: 'reverse' });
    const n = p.slots.vertex.top;
    expect([...maps.vertex]).toEqual(Array.from({ length: n }, (_, i) => n - 1 - i));
    expect([...maps.flip].every((f) => f === 1)).toBe(true);
    expect([...renumbering(p, 9).maps.vertex]).toEqual([...renumbering(p, 9).maps.vertex]);
    expect([...renumbering(p, 9).maps.vertex]).not.toEqual([...renumbering(p, 10).maps.vertex]);
  });

  it('carries M0-d-04\'s maintained level digests over (re-attached on the copy, equal to the original\'s)', () => {
    const p = built(KERNEL_SEQUENCES[0]);
    attachLevelDigests(p);
    const q = renumberSlots(p, 4);
    expect(hasLevelDigests(q)).toBe(true);
    for (const l of LEVELS) expect(levelDigest(q, l)).toEqual(levelDigest(p, l));
  });

  it('an arena with rebuilt static partitions, then tombstones and grid items: index state and queries carried over', () => {
    const s = KERNEL_SEQUENCES[0];
    const p = built(s, 1);
    expect(rebuildAtStageEnd(p)).toBeGreaterThan(0);
    for (const b of s.batches.slice(1)) runBatch(p, b.build(p));
    const idx = p.index;
    expect(idx !== undefined && idx.partitions.some((part) => part.keys.length > 0)).toBe(true);
    expect(idx !== undefined && idx.levels.some((L) => L.tombstones.some((t) => t.size > 0))).toBe(true);
    for (const q of [renumberSlots(p, 21), renumberSlots(p, 22, { mode: 'reverse' })]) {
      expect(checkIndexState(q)).toEqual([]);
      for (const l of LEVELS) expect(answer(q, l)).toBe(answer(p, l));
    }
    // and the next batch on the renumbered copy gives the original's outcome
    const next = KERNEL_SEQUENCES[0].batches[1];
    const a = renumberSlots(p, 23);
    expect(outcomePrint(a, runBatch(a, next.build(a)))).toBe(outcomePrint(p, runBatch(p, next.build(p))));
  });

  it('the print sees every field it names: a point, a level, a flag, a vertex row, an edge row, an owner, a kind, a stage, a parent', () => {
    // the grid with its L2 lanes (L2 faces, owned L1 blocks), and the profiled way (knot rows on vertices)
    const grid = (): Plat => built(KERNEL_SEQUENCES[0], 3);
    const way = (): Plat => built(KERNEL_SEQUENCES[1], 1);
    const first = (top: number, ok: (i: number) => boolean): number => {
      for (let i = 0; i < top; i++) if (ok(i)) return i;
      throw new Error('support: no such element');
    };
    const row = (p: Plat, kind: 'vertex' | 'edge'): number => first(p.slots.role.top, (r) => p.roles.kind[r] !== FREE_KIND && roleInfo(p.roles.kind[r]).kind === kind);
    const vertex = (p: Plat): number => first(p.slots.vertex.top, (v) => isVertexLive(p, v));
    const face = (p: Plat, l: 1 | 2, owned = false): number => first(p.slots.face[l].top, (f) => isFaceLive(p, l, f) && (!owned || p.faces[l].owner[f] >= 0));
    const edits: [string, () => Plat, (q: Plat) => void][] = [
      ['point', grid, (q) => void (q.vertices.x[vertex(q)] += 1)],
      ['vertex level', grid, (q) => void (q.vertices.level[vertex(q)] ^= 1)],
      ['flag', grid, (q) => void (q.vertices.flags[vertex(q)] ^= 1)],
      ['vertex row', way, (q) => void (q.roles.ordinal[row(q, 'vertex')] += 1)],
      ['edge row', grid, (q) => void (q.roles.ordinal[row(q, 'edge')] += 1)],
      ['owner', grid, (q) => void (q.faces[1].owner[face(q, 1, true)] = q.faces[1].owner[face(q, 1, true)] === 0 ? 1 : 0)],
      ['kind', grid, (q) => void (q.faces[1].kind[face(q, 1)] += 1)],
      ['stage', grid, (q) => void (q.faces[1].stage[face(q, 1)] += 1)],
      ['parent', grid, (q) => void (q.faces[2].parent[face(q, 2)] = -1)],
    ];
    for (const [what, make, edit] of edits) {
      const q = make();
      const base = arenaPrint(q);
      expect(arenaPrint(renumberSlots(q, 2)), what).toBe(base);
      edit(q);
      expect(arenaPrint(q), what).not.toBe(base);
    }
  });

  it('refuses an arena with a batch open on it', () => {
    const p = built(KERNEL_SEQUENCES[0]);
    let thrown = '';
    runBatch(p, {
      spec: fixtureSpec(1),
      fn: (o: Overlay) => {
        try {
          renumberSlots(o.plat, 1);
        } catch (e) {
          thrown = String(e);
        }
        return { ok: true, value: null, warnings: [] };
      },
    });
    expect(thrown).toMatch(/a batch is open/);
  });
});

describe('the bar: renumbering + next op gives identical output on every constructive arena (§13.1, §16 M0 (a))', () => {
  it('every M0 constructive case that builds an arena, two draws each: fresh, again, reversed and renumbered slots before every batch', () => {
    let seqs = 0;
    const nextKinds = new Set<string>();
    for (const seed of [1, 2]) {
      const all = constructiveSequences(seed);
      expect(all.length).toBeGreaterThanOrEqual(80);
      for (const s of all) {
        for (const r of [runTwiceCompare(s, { seed: 3 }), runTwiceCompare(s, { seed: 17 })]) {
          expect(r.divergence, s.name).toBeNull();
          expect(r.identical).toBe(true);
        }
        nextKinds.add(s.batches[s.batches.length - 1].name.split(' ').slice(0, 2).join(' '));
        seqs++;
      }
    }
    expect(seqs).toBeGreaterThanOrEqual(160);
    // The next op is the case's own writer step where there is one, else the probe chain.
    expect([...nextKinds].sort()).toEqual(['next probe', 'next removeEdges', 'next splitFace']);
  });

  it('the constructive arenas commit: most next ops write, and none differs from its renumbered run', () => {
    let commits = 0;
    let total = 0;
    for (const s of constructiveSequences(1)) {
      const out = runSequenceOutcomes(s);
      total++;
      if (out[out.length - 1].print.startsWith('commit ')) commits++;
      expect(runSequenceOutcomes(s, { renumber: { mode: 'random', seed: 5 } }).map((o) => o.digest)).toEqual(out.map((o) => o.digest));
    }
    expect(commits / total).toBeGreaterThan(0.8);
  });

  it('with the stored starts re-drawn too (past the clause, C-0199 (2)): the arena after every batch is identical', () => {
    for (const s of [...constructiveSequences(1), ...KERNEL_SEQUENCES]) {
      let p = s.arena();
      let q = s.arena();
      s.batches.forEach((b, i) => {
        q = renumberSlots(q, 40 + i, { starts: true });
        let a: string;
        let c: string;
        try {
          runBatch(p, b.build(p));
          a = arenaPrint(p);
        } catch {
          a = `threw ${arenaPrint(p)}`;
        }
        try {
          runBatch(q, b.build(q));
          c = arenaPrint(q);
        } catch {
          c = `threw ${arenaPrint(q)}`;
        }
        expect(c, `${s.name} ${b.name}`).toBe(a);
      });
      void p;
    }
  });
});

describe('the negative control: a planted slot-dependent tie-break is detected; its canonical twin passes', () => {
  /** The grid fixture, then a batch that owns one of its L1 blocks — the one `pick` chooses. */
  function planted(name: string, pick: (p: Plat, faces: number[]) => number): DeterminismSequence {
    const grid = KERNEL_SEQUENCES[0];
    return {
      name,
      arena: grid.arena,
      batches: [
        grid.batches[0],
        {
          name: 'own one L1 block',
          build: (p) => ({
            spec: fixtureSpec(1),
            fn: (o: Overlay) => {
              const faces: number[] = [];
              for (let f = 0; f < p.slots.face[1].top; f++) if (isFaceLive(p, 1, f) && p.faces[1].owner[f] < 0) faces.push(f);
              return setOwner(o, [pick(p, faces)], 'district:picked');
            },
          }),
        },
        {
          name: 'a chain from the lowest-slot L1 vertex',
          build: (p) => ({
            spec: fixtureSpec(1),
            fn: (o: Overlay) => {
              let v = 0;
              while (!isVertexLive(p, v) || p.vertices.level[v] !== 1) v++;
              return insertChain(o, [lp(p.vertices.x[v] + 300, p.vertices.y[v] + 300), lp(p.vertices.x[v] + 300, p.vertices.y[v] + 700)], [{ role: 'way', entity: 'way:planted' }], 'mandatory');
            },
          }),
        },
      ],
    };
  }

  it('the lowest face slot (a slot tie-break) diverges under renumbering; the harness names the batch', () => {
    const r = runTwiceCompare(planted('planted: lowest face slot', (_, faces) => faces[0]));
    expect(r.identical).toBe(false);
    expect(['reversed', 'renumbered']).toContain(r.divergence?.run);
    expect(r.divergence?.batch).toBe('own one L1 block');
    expect(r.divergence?.expected).not.toBe(r.divergence?.actual);
  });

  it('the lowest vertex slot alone (the third batch) is caught too', () => {
    const r = runTwiceCompare(planted('planted: lowest vertex slot only', (p, faces) => {
      // the canonical pick for the block, so only the vertex tie-break remains
      const key = (f: number): string => faceKey(p, 1, f).map((v) => `${String(p.vertices.y[v]).padStart(9, '0')},${String(p.vertices.x[v]).padStart(9, '0')}`).join('>');
      return faces.slice().sort((a, b) => (key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : 0))[0];
    }));
    expect(r.identical).toBe(false);
    expect(r.divergence?.batch).toBe('a chain from the lowest-slot L1 vertex');
  });

  it('the canonical twin — the block with the smallest canonical face key, the chain from a named point — passes', () => {
    const grid = KERNEL_SEQUENCES[0];
    const twin: DeterminismSequence = {
      name: 'canonical twin',
      arena: grid.arena,
      batches: [
        grid.batches[0],
        {
          name: 'own the lowest-leftmost L1 block',
          build: (p) => ({
            spec: fixtureSpec(1),
            fn: (o: Overlay) => {
              const faces: number[] = [];
              for (let f = 0; f < p.slots.face[1].top; f++) if (isFaceLive(p, 1, f)) faces.push(f);
              const yx = (f: number): [number, number] => {
                const v = faceKey(p, 1, f)[0];
                return [p.vertices.y[v], p.vertices.x[v]];
              };
              faces.sort((a, b) => yx(a)[0] - yx(b)[0] || yx(a)[1] - yx(b)[1]);
              return setOwner(o, [faces[0]], 'district:picked');
            },
          }),
        },
      ],
    };
    const r = runTwiceCompare(twin);
    expect(r.divergence).toBeNull();
    expect(r.outcomes).toEqual(['commit', 'commit']);
  });

  it('a commit record and an outcome print hold no slot: equal across a renumbering of the same batch', () => {
    const s = KERNEL_SEQUENCES[0];
    const p = built(s, 2);
    const q = renumberSlots(p, 8);
    const b = s.batches[2];
    const rp = runBatch(p, b.build(p));
    const rq = runBatch(q, b.build(q));
    expect(rp.ok && rq.ok).toBe(true);
    if (rp.ok && rq.ok && rp.value.record !== null && rq.value.record !== null) {
      expect(recordPrint(q, rq.value.record)).toBe(recordPrint(p, rp.value.record));
      expect(rp.value.record.faces[0].created.length + rp.value.record.faces[0].changed.length).toBeGreaterThan(0);
    }
    expect(outcomePrint(q, rq)).toBe(outcomePrint(p, rp));
  });
});
