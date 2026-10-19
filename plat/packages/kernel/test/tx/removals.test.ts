// M0-a-06: removals and their consequences (§2.2 rule 3 *Dissolution*, *Levels follow the rows — demotion (a) – (c)*,
// split restoration; §3.4 removeEdges, clearFiner; §13.1's "removals" fixtures): a lane removed from a spine it ended
// on restores the spine exactly with its own shape vertices untouched (the split flag); a crossing way removed restores
// the way it crossed; clearFiner after a refinement restores the coarser level exactly; kept content survives a clear
// and refuses a removal beside it; a removal leaving a way in two parts without a rekey is refused by role consistency.
import { describe, expect, it } from 'vitest';
import { faceKey, idOf, roleIdOf, rowsOn, VERTEX_SPLIT, VERTEX_STEINER } from '../../src/arena/index.js';
import { insertChain, splitThrough } from '../../src/insert/index.js';
import { clearFiner, removeEdges, retypeEdges, setOwner, tx } from '../../src/tx/index.js';
import { between, commit, degreeAt, edgeRows, framed, healthy, must, pt, S4, S8, S10, spec, state, vertexAtPoint } from './support.js';

const noVersion = (s: string): string => s.replace(/#v\d+$/, '');

/** The L1 face north of the spine (its key's first vertex on y = 2000). */
function northFace(p: ReturnType<typeof framed>): number {
  const r = resolveFaces(p);
  return r;
}

function resolveFaces(p: ReturnType<typeof framed>): number {
  const F = p.faces[1];
  for (let f = 0; f < p.slots.face[1].top; f++) {
    if (F.kind[f] === 0xffff) continue;
    const k = faceKey(p, 1, f);
    if (p.vertices.y[k[0]] === 2000) return f;
  }
  throw new Error('no north face');
}

/** A frame split by a spine way:1 along y = 2000, committed by an L1 batch. */
function spined(points: readonly (readonly [number, number])[] = [[0, 2000], [4000, 2000]]) {
  const p = framed();
  commit(p, 1, (o) => insertChain(o, points.map(([x, y]) => pt(x, y)), [{ role: 'way', entity: 'way:1' }], 'mandatory'));
  return p;
}

describe('§13.1 removals: a lane removed from a spine it ended on — the spine restored exactly', () => {
  it('an L1 lane (a same-level split of the spine) removed: the junction dissolves, the spine is one edge again', () => {
    const p = spined();
    const before = noVersion(state(p));
    commit(p, 1, (o) => insertChain(o, [pt(2000, 2000), pt(2000, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory'));
    const j = vertexAtPoint(p, 2000, 2000);
    expect(j).toBeGreaterThanOrEqual(0);
    expect(p.vertices.flags[j] & VERTEX_SPLIT).toBe(VERTEX_SPLIT);
    healthy(p);
    const c = commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'way:2' }));
    healthy(p);
    expect(noVersion(state(p))).toBe(before);
    expect(vertexAtPoint(p, 2000, 2000)).toBe(-1);
    expect(c.record?.edgesRemoved).toBeGreaterThanOrEqual(2); // the lane's edge and the spine's second part, merged back
    expect(edgeRows(p, [0, 2000], [4000, 2000])).toEqual(['way/way:1']);
  });

  it('an L2 lane (a Steiner vertex on the L1 spine) removed by an L2 batch: the Steiner vertex dissolves (steinerDissolved)', () => {
    const p = spined();
    const before = noVersion(state(p));
    commit(p, 2, (o) => insertChain(o, [pt(2000, 2000), pt(2000, 4000)], [{ role: 'kerb', entity: 'lane:1' }], 'mandatory'));
    const s = vertexAtPoint(p, 2000, 2000);
    expect(p.vertices.level[s]).toBe(2);
    expect(p.vertices.flags[s] & (VERTEX_SPLIT | VERTEX_STEINER)).toBe(VERTEX_SPLIT | VERTEX_STEINER);
    healthy(p);
    const c = commit(p, 2, (o) => removeEdges(o, { role: 'kerb', entity: 'lane:1' }));
    healthy(p);
    expect(noVersion(state(p))).toBe(before);
    expect(c.record?.steinerDissolved).toBeGreaterThanOrEqual(1);
  });

  it('a lane that ended on the spine\'s own shape vertex: removed, the shape vertex stays (no split flag)', () => {
    const p = spined([[0, 2000], [2000, 2100], [4000, 2000]]);
    const before = noVersion(state(p));
    const shape = vertexAtPoint(p, 2000, 2100);
    expect(shape).toBeGreaterThanOrEqual(0);
    expect(p.vertices.flags[shape] & VERTEX_SPLIT).toBe(0);
    commit(p, 1, (o) => insertChain(o, [pt(2000, 2100), pt(2000, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory'));
    expect(degreeAt(p, 2000, 2100)).toBe(3);
    commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'way:2' }));
    healthy(p);
    expect(noVersion(state(p))).toBe(before);
    expect(degreeAt(p, 2000, 2100)).toBe(2);
  });

  it('a way crossing the spine removed: the crossing vertex dissolves, the spine restored', () => {
    const p = spined();
    const before = noVersion(state(p));
    commit(p, 1, (o) => insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory'));
    expect(degreeAt(p, 2000, 2000)).toBe(4);
    healthy(p);
    commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'way:2' }));
    healthy(p);
    expect(noVersion(state(p))).toBe(before);
  });

  it('split restoration: a junction left between the spine\'s two edges with a finer plot line at it takes the finer level', () => {
    const p = spined();
    commit(p, 1, (o) => insertChain(o, [pt(2000, 2000), pt(2000, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory'));
    commit(p, 3, (o) => insertChain(o, [pt(2000, 2000), pt(1000, 1000)], [{ role: 'plot_line', entity: 'plot:1' }], 'mandatory'));
    const j = vertexAtPoint(p, 2000, 2000);
    expect(p.vertices.level[j]).toBe(1);
    healthy(p);
    const c = commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'way:2' }));
    healthy(p);
    expect(p.vertices.level[j]).toBe(3);
    expect(p.vertices.flags[j] & (VERTEX_SPLIT | VERTEX_STEINER)).toBe(VERTEX_SPLIT | VERTEX_STEINER);
    expect(c.record?.demoted.vertices).toContain(j);
  });
});

describe('§13.1: a removal that leaves a way in two parts without a rekey is refused by role consistency', () => {
  it('a stretch from the middle of way:1 removed: E_INVARIANT, the arena as it was', () => {
    const p = spined([[0, 2000], [1000, 2000], [3000, 2100], [4000, 2000]]);
    const before = state(p);
    const r = tx(p, spec(1), (o) => removeEdges(o, { chain: { role: 'way', entity: 'way:1' }, from: pt(1000, 2000), to: pt(3000, 2100) }));
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.code).toBe('E_INVARIANT');
      expect(r.detail).toContain('role consistency');
    }
    expect(state(p)).toBe(before);
  });

  it('the far part handed to way:9 by rekey first: the same removal commits, each way one part', () => {
    const p = spined([[0, 2000], [1000, 2000], [3000, 2100], [4000, 2000]]);
    const c = commit(p, 1, (o) => {
      must(retypeEdges(o, { chain: { role: 'way', entity: 'way:1' }, from: pt(3000, 2100), to: pt(4000, 2000) }, [], [], { from: 'way:1', to: 'way:9' }));
      return removeEdges(o, { chain: { role: 'way', entity: 'way:1' }, from: pt(1000, 2000), to: pt(3000, 2100) });
    });
    healthy(p);
    expect(edgeRows(p, [3000, 2100], [4000, 2000])).toEqual(['way/way:9']);
    expect(edgeRows(p, [0, 2000], [1000, 2000])).toEqual(['way/way:1']);
    expect(edgeRows(p, [1000, 2000], [3000, 2100])).toBeNull();
    expect(c.record?.roles.map((k) => `${k.role}/${k.entity}`)).toEqual(expect.arrayContaining(['way/way:1', 'way/way:9']));
  });
});

describe('§13.1: clearFiner after a refinement restores the coarser level exactly', () => {
  it('an L1 block refined at L2 (a lane ending on two of its sides) and at L3, then cleared from S8: the L1 arena as before', () => {
    const p = spined();
    // The north block, owned at L1 by S4.
    const blockFace = northFace(p);
    commit(p, 1, (o) => setOwner(o, [blockFace], 'block:n'), { stage: S4, rederivesFrom: S4 });
    const before = noVersion(state(p));
    // The refinement: an L2 lane across the block (ending on the spine and the frame), its faces re-owned at S8.
    const c2 = commit(p, 2, (o) => {
      must(insertChain(o, [pt(1500, 2000), pt(1500, 4000)], [{ role: 'kerb', entity: 'lane:1' }], 'mandatory'));
      return { ok: true as const, value: null, warnings: [] };
    });
    const l2 = c2.record?.faces.find((d) => d.level === 2)?.created ?? [];
    expect(l2.length).toBeGreaterThanOrEqual(2);
    commit(p, 2, (o) => setOwner(o, l2, 'cell:1'), { stage: S8, rederivesFrom: S8 });
    commit(p, 3, (o) => insertChain(o, [pt(500, 2000), pt(500, 4000)], [{ role: 'plot_line', entity: 'plot:1' }], 'mandatory'));
    healthy(p);
    const cl = commit(p, 1, (o) => clearFiner(o, { owner: 'block:n', level: 1 }, 1), { stage: S8, rederivesFrom: S8 });
    expect(cl.value).toEqual([]);
    healthy(p);
    expect(noVersion(state(p))).toBe(before);
  });

  it('kept content: an L2 face made by S8 survives a clear re-deriving from S10, and a removal beside it is E_KEPT', () => {
    const p = spined();
    const blockFace = northFace(p);
    commit(p, 1, (o) => setOwner(o, [blockFace], 'block:n'), { stage: S4, rederivesFrom: S4 });
    const c2 = commit(p, 2, (o) => insertChain(o, [pt(1500, 2000), pt(1500, 4000)], [{ role: 'kerb', entity: 'lane:1' }], 'mandatory'));
    const l2 = c2.record?.faces.find((d) => d.level === 2)?.created ?? [];
    commit(p, 2, (o) => setOwner(o, l2, 'cell:1'), { stage: S8, rederivesFrom: S8 });
    const before = noVersion(state(p));
    const cl = commit(p, 1, (o) => clearFiner(o, { owner: 'block:n', level: 1 }, 1), { stage: S10, rederivesFrom: S10 });
    expect(cl.record).toBeNull(); // nothing cleared: the S8 content is kept, and kept content is never reported
    expect(noVersion(state(p))).toBe(before);
    const r = tx(p, spec(1, { stage: S10, rederivesFrom: S10 }), (o) => removeEdges(o, { role: 'kerb', entity: 'lane:1' }));
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe('E_KEPT'); // a finer row beside kept content
    const r2 = tx(p, spec(1, { stage: S10, rederivesFrom: S10 }), (o) => clearFiner(o, { owner: 'block:n', level: 1 }, 0));
    expect(r2.ok).toBe(false);
    if (!r2.ok) expect(r2.code).toBe('E_LEVEL');
  });
});

describe('§2.2 rule 3 (a): an edge whose remaining rows are all above its birth level takes the lowest of them', () => {
  it('a quay on a shore: the shore row removed by an L0 batch, the edge becomes L1 (demoted), the L0 faces beside it merge', () => {
    const p = framed();
    // An L0 lake ring and an L1 way sharing its south side.
    commit(p, 0, (o) => insertChain(o, [pt(1000, 1000), pt(3000, 1000), pt(3000, 3000), pt(1000, 3000)], [{ role: 'shore', entity: 'water:1' }], 'mandatory', { closed: true }));
    commit(p, 1, (o) => insertChain(o, [pt(1000, 1000), pt(3000, 1000)], [{ role: 'way', entity: 'quay:1' }], 'mandatory'));
    healthy(p);
    const h = between(p, [1000, 1000], [3000, 1000]);
    expect(p.halfEdges.level[h >> 1]).toBe(0);
    const c = commit(p, 0, (o) => removeEdges(o, { role: 'shore', entity: 'water:1' }));
    healthy(p);
    const h2 = between(p, [1000, 1000], [3000, 1000]);
    expect(p.halfEdges.level[h2 >> 1]).toBe(1);
    expect(c.record?.demoted.edges.length).toBe(1);
    expect(rowsOn(p, 'edge', h2).map((r) => p.roles.kind[r])).toEqual([roleIdOf('way')]);
    expect(c.record?.faces.find((d) => d.level === 0)?.removed.length).toBeGreaterThanOrEqual(1);
  });
});

describe('a VertexRef removal: the vertex role row stripped, the split vertex it held dissolves', () => {
  it('a contact name placed by splitThrough on the spine, then removed by its VertexRef: the spine restored', () => {
    const p = spined();
    const before = noVersion(state(p));
    commit(p, 1, (o) => splitThrough(o, between(p, [0, 2000], [4000, 2000]), pt(1500, 2000), { role: 'anchor', entity: 'district:1' }));
    expect(vertexAtPoint(p, 1500, 2000)).toBeGreaterThanOrEqual(0);
    commit(p, 1, (o) => removeEdges(o, { role: 'anchor', entity: 'district:1', ordinal: 0 }));
    healthy(p);
    expect(noVersion(state(p))).toBe(before);
  });
});

describe('C-0185 (4): which identical-row pairs are runs', () => {
  it('a chain\'s own corner that landed on another way\'s edge (a split vertex): the way removed, the corner kept, its flag cleared', () => {
    const p = spined();
    commit(p, 1, (o) => insertChain(o, [pt(1000, 0), pt(2000, 2010), pt(3000, 0)], [{ role: 'way', entity: 'way:b' }], 'mandatory'));
    const v = vertexAtPoint(p, 2000, 2000);
    expect(v).toBeGreaterThanOrEqual(0);
    expect(p.vertices.flags[v] & VERTEX_SPLIT).toBe(VERTEX_SPLIT);
    const c = commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'way:1' }));
    healthy(p);
    expect(vertexAtPoint(p, 2000, 2000)).toBe(v);
    expect(degreeAt(p, 2000, 2000)).toBe(2);
    expect(p.vertices.flags[v] & VERTEX_SPLIT).toBe(0);
    expect(c.record?.unflagged).toContain(v);
    expect(edgeRows(p, [1000, 0], [2000, 2000])).toEqual(['way/way:b']);
  });

  it('a split vertex whose two remaining edges carry different rows (a chain shares one side) is not dissolved', () => {
    const p = spined();
    commit(p, 1, (o) => insertChain(o, [pt(2000, 2000), pt(2000, 4000)], [{ role: 'way', entity: 'lane:1' }], 'mandatory'));
    commit(p, 1, (o) => insertChain(o, [pt(2000, 2000), pt(4000, 2000)], [{ role: 'district_bound', entity: 'district:1' }], 'mandatory'));
    expect(edgeRows(p, [2000, 2000], [4000, 2000])).toEqual(['district_bound/district:1', 'way/way:1']);
    commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'lane:1' }));
    healthy(p);
    expect(degreeAt(p, 2000, 2000)).toBe(2);
    expect(edgeRows(p, [0, 2000], [2000, 2000])).toEqual(['way/way:1']);
  });

  it('a split vertex whose remaining edges match at their level but differ in a finer row (an L2 kerb on one side): kept', () => {
    const p = spined();
    commit(p, 1, (o) => insertChain(o, [pt(2000, 2000), pt(2000, 4000)], [{ role: 'way', entity: 'lane:1' }], 'mandatory'));
    commit(p, 2, (o) => insertChain(o, [pt(2000, 2000), pt(4000, 2000)], [{ role: 'kerb', entity: 'kerb:1' }], 'mandatory'));
    const v = vertexAtPoint(p, 2000, 2000);
    expect(edgeRows(p, [2000, 2000], [4000, 2000])).toEqual(['kerb/kerb:1', 'way/way:1']);
    healthy(p);
    commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'lane:1' }));
    healthy(p);
    // The way's run through v survives whole at L1, so v keeps its flag (b); the kerb's end keeps v (no dissolution).
    expect(vertexAtPoint(p, 2000, 2000)).toBe(v);
    expect(p.vertices.flags[v] & VERTEX_SPLIT).toBe(VERTEX_SPLIT);
    expect(degreeAt(p, 2000, 2000)).toBe(2);
    expect(edgeRows(p, [0, 2000], [2000, 2000])).toEqual(['way/way:1']);
    expect(edgeRows(p, [2000, 2000], [4000, 2000])).toEqual(['kerb/kerb:1', 'way/way:1']);
  });
});

describe('C-0185 (3): a merged face keeps the record with the smallest canonical key', () => {
  it('four owned blocks, one way removed: the west record survives each merge, the crossing dissolves', () => {
    const p = spined();
    commit(p, 1, (o) => insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'way', entity: 'way:v' }], 'mandatory'));
    const ownerAt = (x: number, y: number): string => {
      const F = p.faces[1];
      for (let f = 0; f < p.slots.face[1].top; f++) {
        if (F.kind[f] === 0xffff) continue;
        const k = faceKey(p, 1, f);
        if (p.vertices.x[k[0]] === x && p.vertices.y[k[0]] === y) return String(f);
      }
      return '';
    };
    const sw = Number(ownerAt(0, 0));
    const se = Number(ownerAt(2000, 0));
    const nw = Number(ownerAt(0, 2000));
    const ne = Number(ownerAt(2000, 2000));
    commit(p, 1, (o) => {
      must(setOwner(o, [sw], 'b:sw'));
      must(setOwner(o, [se], 'b:se'));
      must(setOwner(o, [nw], 'b:nw'));
      return setOwner(o, [ne], 'b:ne');
    });
    const c = commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'way:v' }));
    healthy(p);
    expect(vertexAtPoint(p, 2000, 2000)).toBe(-1);
    const owners: string[] = [];
    const F = p.faces[1];
    for (let f = 0; f < p.slots.face[1].top; f++) if (F.kind[f] !== 0xffff) owners.push(idOf(p, F.owner[f]));
    expect(owners.sort()).toEqual(['b:nw', 'b:sw']);
    expect(c.record?.faces[0].removed.length).toBe(2);
    expect(c.record?.owners).toEqual(['b:ne', 'b:nw', 'b:se', 'b:sw']);
  });
});

describe('§2.2 rule 3 (a) + rule 2, C-0185 (3): an edge demoted to a level whose sides hold no record gets its own children there', () => {
  // An L1 way w:1 carrying a finer row of its own on the same edge — an L2 kerb, or an L3 plot line (rule 3: a finer
  // batch may add rows of its own level to a coarser edge) — dangling inside the frame or crossing it. The finer level
  // holds no record anywhere before (the finer insert shares the L1 edge). An L1 batch removing the way demotes the edge
  // to the finer row's level; the L1 faces beside it merge into one with no L1 edge, so the face its own children hang
  // from is the merged one, and the batch must leave a record on each side at the new level (checks/M0-a-06.md F-1).
  const cases: { lv: 2 | 3; role: string }[] = [{ lv: 2, role: 'kerb' }, { lv: 3, role: 'plot_line' }];
  function carried(cross: boolean, lv: 2 | 3, role: string): ReturnType<typeof framed> {
    const p = framed();
    const a = cross ? pt(0, 500) : pt(500, 500);
    const b = cross ? pt(4000, 500) : pt(1500, 500);
    commit(p, 1, (o) => insertChain(o, [a, b], [{ role: 'way', entity: 'w:1' }], 'mandatory'));
    commit(p, lv, (o) => insertChain(o, [a, b], [{ role, entity: 'f:1' }], 'mandatory'));
    healthy(p);
    return p;
  }
  const records = (p: ReturnType<typeof framed>, l: number): number => {
    let n = 0;
    for (let f = 0; f < p.slots.face[l].top; f++) if (p.faces[l].kind[f] !== 0xffff) n += 1;
    return n;
  };
  for (const { lv, role } of cases) {
    for (const cross of [false, true]) {
      for (const how of ['removeEdges', 'retypeEdges remove'] as const) {
        it(`an L1 way carrying an L${lv} ${role} row, ${cross ? 'crossing the frame' : 'dangling'}: ${how} commits a valid arena`, () => {
          const p = carried(cross, lv, role);
          const r = tx(p, spec(1), (o) => (how === 'removeEdges'
            ? removeEdges(o, { role: 'way', entity: 'w:1' })
            : retypeEdges(o, { role: 'way', entity: 'w:1' }, [], ['way'])));
          expect(r.ok).toBe(true);
          healthy(p);
          const h = cross ? between(p, [0, 500], [4000, 500]) : between(p, [500, 500], [1500, 500]);
          expect(p.halfEdges.level[h >> 1]).toBe(lv);
          expect(edgeRows(p, cross ? [0, 500] : [500, 500], cross ? [4000, 500] : [1500, 500])).toEqual([`${role}/f:1`]);
          // The new level holds a record each side (one for a dangling edge, two for a crossing one), every level between
          // its own child; the commit record lists them as created.
          const rec = r.ok ? r.value.record : null;
          expect(records(p, lv)).toBe(cross ? 2 : 1);
          expect(rec?.faces.find((d) => d.level === lv)?.created.length).toBe(cross ? 2 : 1);
          for (let l = 1; l < lv; l++) expect(records(p, l)).toBe(1);
        });
      }
    }
  }

  it('the merged L1 record is kept — its owner with it — and the L2 records hang from it', () => {
    const p = carried(true, 2, 'kerb');
    const south = (() => {
      for (let f = 0; f < p.slots.face[1].top; f++) if (p.faces[1].kind[f] !== 0xffff && p.vertices.y[faceKey(p, 1, f)[0]] === 0) return f;
      return -1;
    })();
    const north = (() => {
      for (let f = 0; f < p.slots.face[1].top; f++) if (p.faces[1].kind[f] !== 0xffff && p.vertices.y[faceKey(p, 1, f)[0]] === 500) return f;
      return -1;
    })();
    commit(p, 1, (o) => {
      must(setOwner(o, [south], 'b:s'));
      return setOwner(o, [north], 'b:n');
    });
    const r = tx(p, spec(1), (o) => removeEdges(o, { role: 'way', entity: 'w:1' }));
    expect(r.ok).toBe(true);
    healthy(p);
    // The survivor by canonical key is the south record (its key starts at (0, 0)): kept, not re-made.
    expect(p.faces[1].kind[south]).not.toBe(0xffff);
    expect(idOf(p, p.faces[1].owner[south])).toBe('b:s');
    const rec = r.ok ? r.value.record : null;
    expect(rec?.faces.find((d) => d.level === 1)?.created).toEqual([]);
    for (let f = 0; f < p.slots.face[2].top; f++) if (p.faces[2].kind[f] !== 0xffff) expect(p.faces[2].parent[f]).toBe(south);
  });

  for (const horizontalFiner of [true, false]) {
    it(`two edges of one entity demoted to two levels by one rewrite (an L3 plot line ${horizontalFiner ? 'across' : 'down'}, an L2 kerb ${horizontalFiner ? 'down' : 'across'}): every record nests`, () => {
      // d:1's two crossing chains, one carrying an L3 plot line, the other an L2 kerb; one removeEdges demotes both. The
      // L2 records (either side of the kerb) are made first, then the L3 ones under them (coarser targets first, C-0189).
      const p = framed();
      commit(p, 1, (o) => {
        must(insertChain(o, [pt(0, 1000), pt(4000, 1000)], [{ role: 'district_bound', entity: 'd:1' }], 'mandatory'));
        return insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'district_bound', entity: 'd:1' }], 'mandatory');
      });
      const across = [pt(0, 1000), pt(2000, 1000), pt(4000, 1000)];
      const down = [pt(2000, 0), pt(2000, 1000), pt(2000, 4000)];
      commit(p, 3, (o) => insertChain(o, horizontalFiner ? across : down, [{ role: 'plot_line', entity: 'pl:1' }], 'mandatory'));
      commit(p, 2, (o) => insertChain(o, horizontalFiner ? down : across, [{ role: 'kerb', entity: 'k:1' }], 'mandatory'));
      healthy(p);
      const r = tx(p, spec(1), (o) => removeEdges(o, { role: 'district_bound', entity: 'd:1' }));
      expect(r.ok).toBe(true);
      healthy(p);
      expect(records(p, 1)).toBe(1);
      expect(records(p, 2)).toBe(2);
      expect(records(p, 3)).toBe(4);
      // Each L3 record lies on its L2 parent's side of the kerb.
      const side = (l: 2 | 3, f: number): boolean => {
        const k = faceKey(p, l, f);
        return horizontalFiner ? p.vertices.x[k[0]] < 2000 || (p.vertices.x[k[0]] === 2000 && p.vertices.x[k[1]] < 2000) : p.vertices.y[k[0]] < 1000;
      };
      for (let f = 0; f < p.slots.face[3].top; f++) {
        if (p.faces[3].kind[f] === 0xffff) continue;
        expect(side(3, f)).toBe(side(2, p.faces[3].parent[f]));
      }
    });
  }

  it('the coarser records beside the edge merged by the same rewrite: two crossing district bounds of one entity removed at once', () => {
    // d:1's horizontal chain carries an L2 kerb across the frame; its vertical chain crosses it. One removeEdges strips
    // both: the vertical is deleted, the horizontal demoted to L2, the four L1 records merge into one (no L1 edge left,
    // but the demoted kerb inside it), and the kerb's two sides take L2 records under it.
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(0, 500), pt(4000, 500)], [{ role: 'district_bound', entity: 'd:1' }], 'mandatory'));
    commit(p, 2, (o) => insertChain(o, [pt(0, 500), pt(4000, 500)], [{ role: 'kerb', entity: 'f:1' }], 'mandatory'));
    commit(p, 1, (o) => insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'district_bound', entity: 'd:1' }], 'mandatory'));
    healthy(p);
    expect(records(p, 1)).toBe(4);
    const r = tx(p, spec(1), (o) => removeEdges(o, { role: 'district_bound', entity: 'd:1' }));
    expect(r.ok).toBe(true);
    healthy(p);
    expect(records(p, 1)).toBe(1);
    expect(records(p, 2)).toBe(2);
    expect(edgeRows(p, [0, 500], [4000, 500])).toEqual(['kerb/f:1']);
  });
});
