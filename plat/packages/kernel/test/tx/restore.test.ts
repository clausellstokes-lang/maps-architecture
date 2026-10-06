// M0-a-06, session fix round S1 (N-47, C-0219): remove(insert(x)) restores the arena — the face records included. A
// finer chain's insertion materialises its own children at the levels between its parent record and its own (§2.2 rule
// 2, insertChain's re-walk, C-0177 (9)); a later removeEdges must free each record its level no longer needs, up to L1
// (rule 2: "until then the parent face is its own child"; C-0185 (3)'s keep rule), list it among the batch's removed
// records and tombstone its index item. Level digests keep own children out (C-0194), so equality is judged on the
// slot-free content print, the live records per level and the encoded chunks (`encodeArena` writes every live record).
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { isFaceLive, type Plat } from '../../src/arena/index.js';
import { insertChain } from '../../src/insert/index.js';
import { encodeArena } from '../../src/io/index.js';
import { removeEdges, tx, type CommitRecord } from '../../src/tx/index.js';
import type { Level } from '../../src/types/index.js';
import { rng } from './fuzzgen.js';
import { commit, contentPrint, framed, healthy, pt, spec } from './support.js';

const LEVELS: readonly Level[] = [0, 1, 2, 3, 4];

/** Live face records per level. */
function facesPerLevel(p: Plat): number[] {
  return LEVELS.map((l) => {
    let n = 0;
    for (let f = 0; f < p.slots.face[l].top; f++) if (isFaceLive(p, l, f)) n++;
    return n;
  });
}

/** The encoded chunks' refs, in encoding order (the persisted form, §11). */
function chunkRefs(p: Plat): string {
  return JSON.stringify(encodeArena(p).map((c) => c.ref));
}

/** The arena's slot-free print, its records per level and its encoded chunks. */
function snapshot(p: Plat): { print: string; faces: number[]; refs: string } {
  return { print: contentPrint(p), faces: facesPerLevel(p), refs: chunkRefs(p) };
}

const roleAt = (l: Level): string => (l <= 1 ? 'way' : l === 2 ? 'kerb' : 'plot_line');

/** N-13's first example: an L0 way across a framed 4000 square. */
function withWay(): Plat {
  const p = framed(4000);
  commit(p, 0, (o) => insertChain(o, [pt(1553, 1708), pt(2317, 1842)], [{ role: 'way', entity: 'way:b0' }], 'mandatory'));
  return p;
}

/** Inserts `pts` at `level`, checks the own children it made, removes it in a later batch at `removeAt`. */
function roundTrip(p: Plat, level: Level, pts: readonly { x: number; y: number }[], removeAt: Level = level): { made: number[]; removal: CommitRecord } {
  const before = snapshot(p);
  const role = roleAt(level);
  commit(p, level, (o) => insertChain(o, pts.map(({ x, y }) => pt(x, y)), [{ role, entity: 'x:1' }], 'mandatory'));
  healthy(p);
  const made = facesPerLevel(p);
  // rederivesFrom 0: no stage's content is kept from the removing batch (§3.3 *Kept content*), whatever its level.
  const c = commit(p, removeAt, (o) => removeEdges(o, { role, entity: 'x:1' }), { rederivesFrom: 0 as never });
  healthy(p);
  const after = snapshot(p);
  expect(after.print).toBe(before.print);
  expect(after.faces).toEqual(before.faces);
  expect(after.refs).toBe(before.refs);
  return { made, removal: c.record as CommitRecord };
}

describe('N-47: removeEdges frees the own children a finer insertion materialised (§2.2 rule 2, C-0185 (3))', () => {
  it('an L3 chain inside the framed square beside an L0 way: removed in a later L3 batch, the L1 and L2 records are freed', () => {
    const p = withWay();
    expect(facesPerLevel(p)).toEqual([1, 0, 0, 0, 0]);
    const { made } = roundTrip(p, 3, [{ x: 285, y: 882 }, { x: 1317, y: 314 }, { x: 2233, y: 691 }]);
    expect(made).toEqual([1, 1, 1, 1, 0]); // the insertion made one own child at L1 and at L2
  });

  it('the L2 variant: an L2 chain, removed, frees the L1 own child', () => {
    const p = withWay();
    const { made } = roundTrip(p, 2, [{ x: 285, y: 882 }, { x: 1317, y: 314 }, { x: 2233, y: 691 }]);
    expect(made).toEqual([1, 1, 1, 0, 0]);
  });

  it('the L4 variant: an L4 chain, removed, frees the L1 – L3 own children', () => {
    const p = withWay();
    const { made } = roundTrip(p, 4, [{ x: 285, y: 882 }, { x: 1317, y: 314 }, { x: 2233, y: 691 }]);
    expect(made).toEqual([1, 1, 1, 1, 1]);
  });

  it('a chain touching the frame (an L3 corner cut): removed, the arena is as before', () => {
    const p = withWay();
    const { made } = roundTrip(p, 3, [{ x: 0, y: 800 }, { x: 700, y: 650 }, { x: 900, y: 0 }]);
    expect(made).toEqual([1, 1, 1, 2, 0]); // the cut splits the L3 view in two
  });

  it('an own child that keeps another child survives: two L3 chains, one removed, the L1 / L2 records stay', () => {
    const p = withWay();
    commit(p, 3, (o) => insertChain(o, [pt(285, 882), pt(1317, 314), pt(2233, 691)], [{ role: 'plot_line', entity: 'keep:1' }], 'mandatory'));
    const kept = facesPerLevel(p);
    const before = snapshot(p);
    commit(p, 3, (o) => insertChain(o, [pt(800, 3000), pt(2600, 3400)], [{ role: 'plot_line', entity: 'x:1' }], 'mandatory'));
    commit(p, 3, (o) => removeEdges(o, { role: 'plot_line', entity: 'x:1' }));
    healthy(p);
    expect(facesPerLevel(p)).toEqual(kept);
    expect(snapshot(p)).toEqual(before);
  });

  it('the commit record lists each freed record: the L3 chain removed by an L1 batch — faces[L1].removed and faces[L2].removed of length 1', () => {
    // §3.3: the record's dirty set covers the levels at and below (finer than) the batch's, so an L1 batch shows the L1
    // and L2 records it freed; an L3 batch frees them alike (the test above) and its record lists levels 3 and 4 only.
    const p = withWay();
    const { removal } = roundTrip(p, 3, [{ x: 285, y: 882 }, { x: 1317, y: 314 }, { x: 2233, y: 691 }], 1);
    const at = (l: Level) => removal.faces.find((d) => d.level === l);
    expect(at(1)?.removed.length).toBe(1);
    expect(at(2)?.removed.length).toBe(1);
    expect(at(3)?.removed.length).toBe(1);
    expect(at(1)?.created.length).toBe(0);
    expect(at(2)?.created.length).toBe(0);
  });
});

// ---- the property ----------------------------------------------------------------------------------------------------

/** A ring of a face line, rotated to its least rotation (a ring through one vertex twice prints from either visit). */
function canonRing(s: string): string {
  const t = s.split(' ').filter((x) => x !== '');
  let best = '';
  for (let i = 0; i < t.length; i++) {
    const r = t.slice(i).concat(t.slice(0, i)).join(' ');
    if (i === 0 || r < best) best = r;
  }
  return best;
}

/**
 * The content print with each face line's rings at their least rotation. contentPrint starts a ring at its least point
 * from the stored half-edge; where the ring passes that point twice (a dangling tree) the start depends on which visit
 * the record stores, which the encoded form does not keep (the chunks are compared exactly beside this).
 */
function canonPrint(print: string): string {
  return print
    .split('\n')
    .map((line) => {
      const m = /^(f\d) (.*?) \| (.*) (k\S+ o\S+ s\S+) p\((.*)\)$/.exec(line);
      if (m === null) return line;
      const holes = m[3] === '' ? [] : m[3].split(' | ').map(canonRing).sort();
      return `${m[1]} ${canonRing(m[2])} | ${holes.join(' | ')} ${m[4]} p(${canonRing(m[5])})`;
    })
    .sort()
    .join('\n');
}

/** PLAT_FUZZ_RUNS (10⁴ in the PR tier, 10⁶ nightly; C-0057): a quarter of it in cases. */
const RUNS = fc.readConfigureGlobal().numRuns ?? 10_000;
const CASES = Math.max(250, Math.floor(RUNS / 4));

describe(`N-47 property: ${CASES} random insertions at every level, each removed by a later batch, restore the arena`, () => {
  it('the content print (rings at their least rotation), the records per level and the encoded chunk refs as before', () => {
    const tally = { inserted: 0, refusedInsert: 0, refusedRemove: 0, exact: 0, rotated: 0, sharedEnd: 0, ownChildren: 0 };
    const byLevel = LEVELS.map(() => 0);
    for (let c = 1; c <= CASES; c++) {
      const r = rng(c * 2_654_435_761);
      const at = (): number => Math.floor(r() * 4001);
      const inner = (): number => 200 + Math.floor(r() * 3601);
      const p = framed();
      // 0 – 2 coarser chains first (L0 – L2), then the chain at a random level, then its removal.
      const nb = Math.floor(r() * 3);
      for (let i = 0; i < nb; i++) {
        const l = Math.floor(r() * 3) as Level;
        const pts = l === 2 ? [pt(inner(), inner()), pt(inner(), inner())] : r() < 0.5 ? [pt(0, at()), pt(inner(), inner()), pt(4000, at())] : [pt(at(), 0), pt(inner(), inner()), pt(at(), 4000)];
        tx(p, spec(l, { rederivesFrom: 0 as never }), (o) => insertChain(o, pts, [{ role: roleAt(l), entity: `base:${i}` }], 'mandatory'));
      }
      const lt = Math.floor(r() * 5) as Level;
      const n = 2 + Math.floor(r() * 2);
      const pts = Array.from({ length: n }, () => pt(inner(), inner()));
      if (r() < 0.3) pts[0] = r() < 0.5 ? pt(0, inner()) : pt(inner(), 0);
      const before = snapshot(p);
      const a = tx(p, spec(lt, { rederivesFrom: 0 as never }), (o) => insertChain(o, pts, [{ role: roleAt(lt), entity: 'x:1' }], 'mandatory'));
      if (!a.ok) {
        tally.refusedInsert++;
        continue;
      }
      tally.inserted++;
      byLevel[lt]++;
      const mid = facesPerLevel(p);
      if (mid.some((k, l) => l > 0 && l < lt && k > before.faces[l])) tally.ownChildren++;
      const b = tx(p, spec(lt, { rederivesFrom: 0 as never }), (o) => removeEdges(o, { role: roleAt(lt), entity: 'x:1' }));
      if (!b.ok) {
        tally.refusedRemove++;
        continue;
      }
      healthy(p);
      const after = snapshot(p);
      // No record of any level is left behind (N-47) — in every case.
      expect(after.faces, `case ${c}: live records per level`).toEqual(before.faces);
      const shared = (a.value.record?.warnings ?? []).some((w) => w.code === 'W_STRETCH_SHARED');
      if (shared && after.refs !== before.refs) {
        // A shared stretch's end where the chain left the run it shared: rule 3 (b) as §2.2 words it clears the end's
        // split flag (no pair of its edges carried identical rows before the batch), so the run stays split there — the
        // arena valid, the run's route unchanged. A design question for the session (C-0219 (4)), counted, not judged.
        tally.sharedEnd++;
        continue;
      }
      expect(after.refs, `case ${c}: encoded chunk refs`).toBe(before.refs);
      if (after.print === before.print) tally.exact++;
      else {
        tally.rotated++;
        expect(canonPrint(after.print), `case ${c}: content print`).toBe(canonPrint(before.print));
      }
    }
    console.info(`N-47 property: ${JSON.stringify({ cases: CASES, ...tally, byLevel })}`);
    // Not vacuous: insertions at every level, own children made and freed, the removals all committed.
    for (const l of LEVELS) expect(byLevel[l], `insertions at L${l}`).toBeGreaterThan(0);
    expect(tally.ownChildren).toBeGreaterThan(CASES / 20);
    expect(tally.refusedRemove).toBe(0);
    expect(tally.exact).toBeGreaterThan(tally.inserted * 0.95);
    expect(tally.sharedEnd).toBeLessThanOrEqual(Math.max(2, tally.inserted / 200));
  }, 600_000);
});
