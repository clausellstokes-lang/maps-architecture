// M0-a-07: claimSubFace in its ring form (§3.4: "may span several faces — a reservation across coarse faces, a precinct,
// a bailey"; the score form is S7b's, M1) and pinVertices (§3.4: the only writer of the kernel `pinned` flag), with the
// partitioners as declared ops (§3.3 *Two op forms*).
import { describe, expect, it } from 'vitest';
import { facesOfOwner, handleOf, VERTEX_PINNED, type FaceId, type Plat } from '../../src/arena/index.js';
import { claimSubFace, isPinned, opPinVertices, opSplitFace, pinVertices, splitFace } from '../../src/faces/index.js';
import { insertChain } from '../../src/insert/index.js';
import { removeEdges, tx } from '../../src/tx/index.js';
import { carrying, lin } from '../tx/support.js';
import { attempt, commit, content, faceAt, halves, pt, spec, state, withHoles } from './support.js';

const DB = [{ role: 'district_bound', entity: 'd:1' }];
type P = readonly [number, number];
const pts = (xs: readonly P[]) => xs.map(([x, y]) => pt(x, y));
const rect = (x0: number, y0: number, x1: number, y1: number): P[] => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];

function owned(p: Plat, owner: string): FaceId[] {
  const h = handleOf(p, owner);
  return h < 0 ? [] : facesOfOwner(p, 1, h);
}

function refusal(p: Plat, run: Parameters<typeof attempt>[2]): string {
  const before = content(p);
  const r = attempt(p, 1, run);
  expect(content(p)).toBe(before);
  return r.ok ? 'ok' : r.code;
}

describe('claimSubFace, the ring form (§3.4)', () => {
  it('a reservation across two faces separated by a partition edge: both parts owned, the FaceRef returned', () => {
    const p = halves();
    commit(p, 1, (o) => splitFace(o, faceAt(p, 1, 100, 100), pts([[2000, 0], [2000, 2000]]), { rows: DB }));
    const c = commit(p, 1, (o) => claimSubFace(o, { ring: pts(rect(1000, 500, 3000, 1500)) }, 'reservation:1'));
    expect(c.value).toEqual({ owner: 'reservation:1', level: 1 });
    const fs = owned(p, 'reservation:1');
    expect(fs).toHaveLength(2);
    expect(fs).toContain(faceAt(p, 1, 1500, 1000));
    expect(fs).toContain(faceAt(p, 1, 2500, 1000));
    expect(fs).not.toContain(faceAt(p, 1, 500, 100));
    content(p);
  });

  it('across a structural way, clockwise input, and a face wholly inside the ring', () => {
    const p = withHoles([rect(1800, 1000, 2200, 1400)]);
    commit(p, 1, (o) => claimSubFace(o, { ring: pts([...rect(1000, 500, 3000, 2500)].reverse()) }, 'precinct:1'));
    const fs = owned(p, 'precinct:1');
    expect(fs).toHaveLength(3);
    for (const [x, y] of [[1500, 1000], [2000, 1200], [2000, 2200]] as const) expect(fs).toContain(faceAt(p, 1, x, y));
    content(p);
  });

  it('refusals: a self-crossing ring (E_SELF_INTERSECT), a ring of no area (E_DEGENERATE), nothing written', () => {
    const p = halves();
    expect(refusal(p, (o) => claimSubFace(o, { ring: pts([[1000, 500], [3000, 1500], [3000, 500], [1000, 1800]]) }, 'r:1'))).toBe('E_SELF_INTERSECT');
    expect(refusal(p, (o) => claimSubFace(o, { ring: pts([[1000, 500], [2000, 500], [3000, 500]]) }, 'r:1'))).toBe('E_DEGENERATE');
  });

  it('a ring whose sides the insertion draws together (4 cm apart, under attractCm) is no simple cycle: E_DEGENERATE `collapsed`, nothing written (B-FUZZ seed 1617122082)', () => {
    const p = halves();
    expect(refusal(p, (o) => claimSubFace(o, { ring: pts(rect(1681, 996, 2853, 1000)) }, 'claim:1'))).toBe('E_DEGENERATE');
    const q = withHoles([[[1940, 960], [2060, 960], [2060, 1040], [1940, 1040]]]);
    expect(refusal(q, (o) => claimSubFace(o, { ring: pts(rect(1681, 996, 2853, 1000)) }, 'claim:1'))).toBe('E_DEGENERATE');
  });

  it('the score form is S7b\'s: notBuilt(\'M1\')', () => {
    const p = halves();
    expect(() => tx(p, spec(1), (o) => claimSubFace(o, { areaCm2: 1e6, within: [0], score: null }, 'r:1'))).toThrow(/notBuilt\('M1'\)/);
  });
});

describe('pinVertices (§3.4): the only writer of the pinned flag', () => {
  /** A way across the lower half with a `junction` row on its middle vertex (2000, 1000). */
  function junction(level: 1 | 2 = 1): Plat {
    const p = halves();
    commit(p, level, (o) => insertChain(o, pts([[0, 1000], [2000, 1000], [4000, 1000]]), [{ role: level === 1 ? 'way' : 'plot_line', entity: 'way:2' }], 'mandatory', { knots: [{ index: 1, role: 'junction', ordinal: 0 }] }));
    return p;
  }

  it('sets the flag on the vertex a ref resolves to, and the batch commits', () => {
    const p = junction();
    const [v] = carrying(p, 'junction', 'way:2', 0);
    expect(isPinned(p, v)).toBe(false);
    const c = commit(p, 1, (o) => pinVertices(o, [{ role: 'junction', entity: 'way:2' }]));
    expect(c.record).not.toBeNull();
    expect(isPinned(p, v)).toBe(true);
    expect(p.vertices.flags[v] & VERTEX_PINNED).toBe(VERTEX_PINNED);
    content(p);
  });

  it('a ref that finds no vertex resolves empty: nothing written', () => {
    const p = junction();
    const before = state(p);
    const c = commit(p, 1, (o) => pinVertices(o, [{ role: 'junction', entity: 'way:404' }]));
    expect(c.record).toBeNull();
    expect(state(p)).toBe(before);
  });

  it('a vertex coarser than the batch: E_LEVEL, nothing written', () => {
    const p = junction();
    const before = state(p);
    const r = tx(p, spec(2), (o) => pinVertices(o, [{ role: 'junction', entity: 'way:2' }]));
    expect(!r.ok && r.code).toBe('E_LEVEL');
    expect(state(p)).toBe(before);
  });

  it('released by §2.2 rule 3 (b): stripping the vertex\'s last role row clears the pin', () => {
    const p = junction();
    commit(p, 1, (o) => pinVertices(o, [{ role: 'junction', entity: 'way:2' }]));
    const [v] = carrying(p, 'junction', 'way:2', 0);
    commit(p, 1, (o) => removeEdges(o, { role: 'junction', entity: 'way:2' }));
    expect(isPinned(p, v)).toBe(false);
    content(p);
  });

  it('a rejected batch puts the flag back', () => {
    const p = junction();
    const before = state(p);
    const r = tx(p, spec(1), (o) => {
      pinVertices(o, [{ role: 'junction', entity: 'way:2' }]);
      return { ok: false, code: 'E_INVARIANT', detail: 'the caller gives up' } as const;
    });
    expect(r.ok).toBe(false);
    expect(state(p)).toBe(before);
  });
});

describe('the partitioners as declared ops (§3.3)', () => {
  it('a declared batch of a split and a pin commits', () => {
    const p = halves();
    commit(p, 1, (o) => insertChain(o, pts([[0, 1000], [2000, 1000], [4000, 1000]]), [{ role: 'way', entity: 'way:2' }], 'mandatory', { knots: [{ index: 1, role: 'junction', ordinal: 0 }] }));
    const f = faceAt(p, 1, 100, 100);
    const r = tx(p, spec(1, { ops: [opPinVertices(lin(2), 0, [{ role: 'junction', entity: 'way:2' }]), opSplitFace(lin(1), 0, f, pts([[1000, 0], [1000, 1000]]), { rows: DB })] }));
    expect(r.ok).toBe(true);
    expect(isPinned(p, carrying(p, 'junction', 'way:2', 0)[0])).toBe(true);
    expect(faceAt(p, 1, 500, 500)).not.toBe(faceAt(p, 1, 1500, 500));
    content(p);
  });
});
