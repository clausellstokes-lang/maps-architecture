// M0-a-06, session round S4 (N-55 (6), C-0300): the before-image every batch keeps, exported from @plat/kernel for the
// pipeline runner's stage image (M0-x-02). Taken before a stage, put back after committed batches: the arena bit for bit,
// its version, slot counters, handles and index state as at the image; the next batch opens and commits. Putting it
// back sets the version back, so maintained level digests are re-attached afterwards (the consumer's protocol, pinned).
import { describe, expect, it } from 'vitest';
import * as kernel from '../../src/index.js';
import { attachLevelDigests, levelDigest, recomputeLevelDigest, updateLevelDigests } from '../../src/digest/index.js';
import { insertChain } from '../../src/insert/index.js';
import { removeEdges, restoreSavepoint, setOwner, takeSavepoint, type TxEnv } from '../../src/tx/index.js';
import type { Level } from '../../src/types/index.js';
import { bits, commit, contentPrint, framed, healthy, pt } from './support.js';

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
    // re-attach); re-attaching after the restore (the consumer's protocol, C-0300) rebuilds it.
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
