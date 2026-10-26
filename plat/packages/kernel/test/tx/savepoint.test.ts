// M0-a-06, session round S4 (N-55 (6), C-0287): the before-image every batch keeps, exported from @plat/kernel for the
// pipeline runner's stage image (M0-x-02). Taken before a stage, put back after committed batches: the arena bit for bit,
// its version, slot counters, handles and index state as at the image; the next batch opens and commits. Putting it
// back sets the version back, so maintained level digests are re-attached afterwards (the consumer's protocol, pinned).
// Session round S5 (N-56 (5), C-0299): a restore across committed batches bumps the arena's restore generation, which a
// state keyed on the version alone (M0-d-04's level digests) keys on too; a rejected, thrown or empty batch never moves it.
import { describe, expect, it } from 'vitest';
import * as kernel from '../../src/index.js';
import { attachLevelDigests, levelDigest, recomputeLevelDigest, updateLevelDigests } from '../../src/digest/index.js';
import { insertChain } from '../../src/insert/index.js';
import { err } from '../../src/num/index.js';
import { opInsertChain, removeEdges, restoreGeneration, restoreSavepoint, setOwner, takeSavepoint, tx, type TxEnv } from '../../src/tx/index.js';
import type { Level } from '../../src/types/index.js';
import { bits, commit, contentPrint, declared, framed, healthy, lin, pt, spec, state } from './support.js';

const LEVELS: readonly Level[] = [0, 1, 2, 3, 4];
const hex = (h: ArrayLike<number>): string => Array.from(h).join(',');

describe('N-55 (6): takeSavepoint / restoreSavepoint / Savepoint through @plat/kernel', () => {
  it('the kernel index exports the two functions (the type is a type)', () => {
    expect(typeof (kernel as Record<string, unknown>).takeSavepoint).toBe('function');
    expect(typeof (kernel as Record<string, unknown>).restoreSavepoint).toBe('function');
  });

  it('take → committed batches on two levels (tables grown, handles interned, faces re-owned, a removal) → restore: the arena bit for bit as at the image', () => {
    const p = framed();
    commit(p, 0, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:0' }], 'mandatory'));
    healthy(p);
    const before = bits(p);
    const print = contentPrint(p);
    const version = p.version;
    const slots = JSON.stringify(p.slots);
    const handles = p.handles.count;
    const image = kernel.takeSavepoint(p);
    // Batches enough to double tables (every allocation past capacity replaces the columns), at L1 and L2.
    for (let i = 0; i < 12; i++) {
      const x = 200 + i * 300;
      commit(p, 1, (o) => insertChain(o, [pt(x, 0), pt(x + 50, 4000)], [{ role: 'way', entity: `way:n${i}` }], 'mandatory'));
    }
    commit(p, 2, (o) => insertChain(o, [pt(100, 3000), pt(3900, 3100)], [{ role: 'kerb', entity: 'kerb:1' }], 'mandatory'));
    commit(p, 1, (o) => setOwner(o, [0], 'block:1'));
    commit(p, 1, (o) => removeEdges(o, { role: 'way', entity: 'way:n3' }));
    healthy(p);
    expect(p.halfEdges.origin.length, 'the pair table doubled').toBeGreaterThan(image.halfEdges.origin.length);
    expect(p.roles.kind.length, 'the role table doubled').toBeGreaterThan(image.roles.kind.length);
    expect(p.version).toBe(version + 15);
    expect(bits(p)).not.toBe(before);
    kernel.restoreSavepoint(image);
    expect(bits(p)).toBe(before);
    expect(contentPrint(p)).toBe(print);
    expect(p.version).toBe(version);
    expect(JSON.stringify(p.slots)).toBe(slots);
    expect(p.handles.count).toBe(handles);
    healthy(p);
    // The next batch opens and commits on the restored arena and its index.
    const c = commit(p, 1, (o) => insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'way', entity: 'way:9' }], 'mandatory'));
    expect(c.record?.version).toBe(version + 1);
    healthy(p);
  });

  it('maintained level digests: re-attached after the restore, they read the restored arena — and the next commits keep them current', () => {
    // A digest state that saw the rolled-back commits matches the restored version again once a new commit brings the
    // version back to where it was, and then reads stale (CONFIRMED in the round's mirror: L1 differs without the
    // re-attach); re-attaching after the restore (the consumer's protocol, C-0287) rebuilds it.
    const env: TxEnv = { onCommit: (q, dirty, record) => updateLevelDigests(q, dirty, record) };
    const p = framed();
    commit(p, 0, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:0' }], 'mandatory'), {}, env);
    attachLevelDigests(p);
    const image = takeSavepoint(p);
    commit(p, 1, (o) => insertChain(o, [pt(2000, 0), pt(2000, 4000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'), {}, env);
    restoreSavepoint(image);
    attachLevelDigests(p);
    commit(p, 1, (o) => insertChain(o, [pt(1000, 0), pt(1200, 4000)], [{ role: 'way', entity: 'way:2' }], 'mandatory'), {}, env);
    for (const l of LEVELS) expect(hex(levelDigest(p, l)), `L${l}`).toBe(hex(recomputeLevelDigest(p, l)));
  });
});

describe('N-56 (5): the restore generation (restoreGeneration, C-0299)', () => {
  const way = (o: Parameters<typeof insertChain>[0], x: number, name: string) =>
    insertChain(o, [pt(x, 0), pt(x + 50, 4000)], [{ role: 'way', entity: name }], 'mandatory');

  it('exported through @plat/kernel; 0 on a fresh arena and after commits', () => {
    expect(typeof (kernel as Record<string, unknown>).restoreGeneration).toBe('function');
    const p = framed();
    expect(kernel.restoreGeneration(p)).toBe(0);
    commit(p, 1, (o) => way(o, 1000, 'way:1'));
    commit(p, 1, (o) => way(o, 2000, 'way:2'));
    expect(restoreGeneration(p)).toBe(0);
  });

  it('a restore across committed batches bumps it by exactly one (n = 1 and n = 3); a restore at the image\'s own version does not', () => {
    for (const n of [1, 3]) {
      const p = framed();
      commit(p, 0, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:0' }], 'mandatory'));
      const image = takeSavepoint(p);
      for (let i = 0; i < n; i++) commit(p, 1, (o) => way(o, 200 + 300 * i, `way:a${i}`));
      expect(restoreGeneration(p)).toBe(0);
      restoreSavepoint(image);
      expect(restoreGeneration(p), `n = ${n}`).toBe(1);
      // An image put back at its own version (nothing committed since) is the rejected batch's restore: no bump.
      const same = takeSavepoint(p);
      restoreSavepoint(same);
      expect(restoreGeneration(p)).toBe(1);
    }
  });

  it('(generation, version) tells the replayed state from the rolled-back one: n rolled back, n replayed → same version, generation 1 higher', () => {
    for (const n of [1, 3]) {
      const p = framed();
      commit(p, 0, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:0' }], 'mandatory'));
      const image = takeSavepoint(p);
      for (let i = 0; i < n; i++) commit(p, 1, (o) => way(o, 200 + 300 * i, `way:a${i}`));
      const seen = { generation: restoreGeneration(p), version: p.version, print: contentPrint(p) };
      restoreSavepoint(image);
      for (let i = 0; i < n; i++) commit(p, 1, (o) => way(o, 100 + 300 * i, `way:b${i}`));
      expect(p.version, `n = ${n}: the version is reached again`).toBe(seen.version);
      expect(contentPrint(p)).not.toBe(seen.print);
      expect(restoreGeneration(p), `n = ${n}: the key differs`).toBe(seen.generation + 1);
    }
  });

  it('the generation survives further commits, and a second cross-commit restore bumps it again', () => {
    const p = framed();
    const image = takeSavepoint(p);
    commit(p, 1, (o) => way(o, 1000, 'way:1'));
    restoreSavepoint(image);
    expect(restoreGeneration(p)).toBe(1);
    for (let i = 0; i < 4; i++) commit(p, 1, (o) => way(o, 200 + 300 * i, `way:c${i}`));
    expect(p.version).toBe(4);
    expect(restoreGeneration(p)).toBe(1);
    const second = takeSavepoint(p);
    commit(p, 2, (o) => insertChain(o, [pt(100, 3000), pt(3900, 3100)], [{ role: 'kerb', entity: 'kerb:1' }], 'mandatory'));
    restoreSavepoint(second);
    expect(restoreGeneration(p)).toBe(2);
    expect(p.version).toBe(4);
  });

  it('20 rejected batches (refused op, refused callback, E_WORK_LIMIT, a throw, an empty batch) bump nothing', () => {
    const p = framed();
    commit(p, 0, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:0' }], 'mandatory'));
    const before = state(p);
    const outcomes: string[] = [];
    for (let i = 0; i < 20; i++) {
      const x = 300 + 150 * i;
      switch (i % 5) {
        case 0: {
          // The callback writes, then refuses: the batch rolls back at its own version.
          const r = tx(p, spec(1), (o) => {
            const a = way(o, x, `way:r${i}`);
            expect(a.ok).toBe(true);
            return err('E_INVARIANT', 'refused by the test');
          });
          outcomes.push(r.ok ? 'ok' : r.code);
          break;
        }
        case 1: {
          const r = tx(p, spec(1, { workLimit: 2 }), (o) => way(o, x, `way:r${i}`));
          outcomes.push(r.ok ? 'ok' : r.code);
          break;
        }
        case 2: {
          let thrown = false;
          try {
            tx(p, spec(1), (o) => {
              way(o, x, `way:r${i}`);
              throw new Error('thrown by the test');
            });
          } catch {
            thrown = true;
          }
          outcomes.push(thrown ? 'throw' : 'no throw');
          break;
        }
        case 3: {
          // A declared batch refused at its work limit (the op's own rollback, then the batch's).
          const r = declared(p, 1, [opInsertChain(lin(i), 0, [pt(x, 0), pt(x + 50, 4000)], [{ role: 'way', entity: `way:r${i}` }], 'mandatory')], { workLimit: 1 });
          outcomes.push(r.ok ? 'ok' : r.code);
          break;
        }
        default: {
          // A batch with no op commits nothing and keeps the version (its image is put back too).
          const r = tx(p, spec(1), () => ({ ok: true as const, value: null, warnings: [] }));
          outcomes.push(r.ok && r.value.record === null ? 'empty' : 'committed');
        }
      }
      expect(restoreGeneration(p), `batch ${i}`).toBe(0);
    }
    expect(outcomes).toEqual(Array.from({ length: 4 }, () => ['E_INVARIANT', 'E_WORK_LIMIT', 'throw', 'E_WORK_LIMIT', 'empty']).flat());
    expect(state(p)).toBe(before);
    expect(p.version).toBe(1);
    expect(restoreGeneration(p)).toBe(0);
  });

  it('per arena: a restore on one arena leaves another\'s generation at 0', () => {
    const p = framed();
    const q = framed();
    const image = takeSavepoint(p);
    commit(p, 1, (o) => way(o, 1000, 'way:1'));
    commit(q, 1, (o) => way(o, 1000, 'way:1'));
    restoreSavepoint(image);
    expect(restoreGeneration(p)).toBe(1);
    expect(restoreGeneration(q)).toBe(0);
  });
});
