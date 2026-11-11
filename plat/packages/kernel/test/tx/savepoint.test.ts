// M0-a-06, session round S4 (N-55 (6), C-0287): the before-image (since hardening round S9 the STAGE image only — a batch
// undoes through its frames), exported from @plat/kernel for the pipeline runner's stage image (M0-x-02). Taken before a stage, put back after committed batches: the arena bit for bit,
// its version, slot counters, handles and index state as at the image; the next batch opens and commits. Putting it
// back sets the version back, so maintained level digests are re-attached afterwards (the consumer's protocol, pinned).
// Session round S5 (N-56 (5), C-0299): a restore across committed batches bumps the arena's restore generation, which a
// state keyed on the version alone (M0-d-04's level digests) keys on too; a rejected, thrown or empty batch never moves it.
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import * as kernel from '../../src/index.js';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { setDebugAssertions, setFaceHoles, type Plat } from '../../src/arena/index.js';
import { entryCounts, forEachEntry, hasRecorder, markArena, ROLE_HEAD_BASE, setUndoFaultHook } from '../../src/arena/write.js';
import { attachIndex, beginIndexBatch, indexChange, indexOf, ITEM_FACE } from '../../src/index/index.js';
import { keyKind, keySlot } from '../../src/index/items.js';
import { frameObserver, mark, setFrameObserver, setIndexUndoFaultHook, undoTo, type FrameObserver } from '../../src/tx/frames.js';
import { imagesTaken } from '../../src/tx/savepoint.js';
import { TINY_TABLES } from '../arena/tiny.js';
import { SCENARIOS } from './s9scenarios.js';
import { buildOverlay } from '../../src/arr/index.js';
import { kerb } from '../../src/arr/kerb.js';
import { attachLevelDigests, levelDigest, recomputeLevelDigest, updateLevelDigests } from '../../src/digest/index.js';
import { opSave, rollback } from '../../src/faces/common.js';
import { splitFace } from '../../src/faces/index.js';
import { insertChain } from '../../src/insert/index.js';
import { err, type KernelResult } from '../../src/num/index.js';
import { opInsertChain, removeEdges, restoreGeneration, restoreSavepoint, setOwner, takeSavepoint, tx, type Overlay, type TxEnv } from '../../src/tx/index.js';
import type { OpenTx } from '../../src/tx/state.js';
import type { Cm, Level } from '../../src/types/index.js';
import { warp } from '../../src/warp/index.js';
import { faceAt } from '../faces/support.js';
import { rng } from './fuzzgen.js';
import { bits, churn, commit, contentPrint, declared, frameStats, framed, healthy, installFrameObserver, lin, pt, resetFrameStats, spec, state, uninstallFrameObserver, type FrameKind } from './support.js';

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

describe('S7 (N-23, N-24 / L17, N-25): an image is put back once, last-taken first, between batches — misuse throws and changes nothing', () => {
  const way = (o: Parameters<typeof insertChain>[0], x: number, name: string) =>
    insertChain(o, [pt(x, 0), pt(x + 50, 4000)], [{ role: 'way', entity: name }], 'mandatory');
  const threw = (f: () => void): string => {
    try {
      f();
    } catch (e) {
      return (e as Error).message;
    }
    return 'no throw';
  };

  it('N-23: one image put back twice — the second restore throws, the arena and its generation as they were; the next batch commits', () => {
    const p = framed();
    commit(p, 0, (o) => insertChain(o, [pt(0, 2000), pt(4000, 2000)], [{ role: 'way', entity: 'way:0' }], 'mandatory'));
    const at = bits(p);
    const image = takeSavepoint(p);
    commit(p, 1, (o) => way(o, 1000, 'way:1'));
    restoreSavepoint(image);
    expect(bits(p)).toBe(at);
    commit(p, 1, (o) => way(o, 2500, 'way:2'));
    const now = bits(p);
    const generation = restoreGeneration(p);
    expect(threw(() => restoreSavepoint(image))).toBe('tx: a savepoint is put back twice (an image is put back at most once)');
    expect(bits(p)).toBe(now);
    expect(restoreGeneration(p)).toBe(generation);
    healthy(p);
    commit(p, 1, (o) => way(o, 3000, 'way:3'));
    healthy(p);
  });

  it('N-23: an image taken between batches put back while a batch is open — the restore throws, the batch rolls back, the image stays usable', () => {
    const p = framed();
    const image = takeSavepoint(p);
    commit(p, 1, (o) => way(o, 1000, 'way:1'));
    const before = state(p);
    const r = threw(() => tx(p, spec(1), (o) => {
      way(o, 2000, 'way:2');
      restoreSavepoint(image);
      return { ok: true as const, value: null, warnings: [] };
    }));
    expect(r).toBe('tx 8/L1/callback/fn: tx: a savepoint is put back while a batch it was not taken in is open on the arena (restore between batches)');
    expect(state(p)).toBe(before);
    expect(restoreGeneration(p)).toBe(0);
    restoreSavepoint(image);
    expect(p.version).toBe(0);
    expect(restoreGeneration(p)).toBe(1);
    healthy(p);
  });

  it('N-24 / L17: a dead image (taken after an older image since put back) — refused, so (generation, version) never names two contents', () => {
    // A at v1; two commits; B at v3; A put back (generation 1, v1); two commits (generation 1, v3, other content); B.
    const p = framed();
    commit(p, 1, (o) => way(o, 500, 'way:0'));
    const a = takeSavepoint(p);
    commit(p, 1, (o) => way(o, 1000, 'way:1'));
    commit(p, 1, (o) => way(o, 1500, 'way:2'));
    const b = takeSavepoint(p);
    expect(b.version).toBe(3);
    restoreSavepoint(a);
    expect([restoreGeneration(p), p.version]).toEqual([1, 1]);
    commit(p, 1, (o) => way(o, 2500, 'way:3'));
    commit(p, 1, (o) => way(o, 3000, 'way:4'));
    const key = [restoreGeneration(p), p.version];
    const content = contentPrint(p);
    expect(key).toEqual([1, 3]);
    expect(threw(() => restoreSavepoint(b))).toBe('tx: a savepoint is put back after an image taken before it (images are put back last-taken first)');
    expect([restoreGeneration(p), p.version]).toEqual(key);
    expect(contentPrint(p)).toBe(content);
    healthy(p);
  });

  it('N-24: the image taken right after the one put back is dead too (no batch between the two takes)', () => {
    const p = framed();
    const a = takeSavepoint(p);
    const b = takeSavepoint(p);
    commit(p, 1, (o) => way(o, 1000, 'way:1'));
    restoreSavepoint(a);
    expect(threw(() => restoreSavepoint(b))).toBe('tx: a savepoint is put back after an image taken before it (images are put back last-taken first)');
    expect([restoreGeneration(p), p.version]).toEqual([1, 0]);
  });

  it('N-25: a forward restore (an image at a later version than the arena) is a dead image — refused, the generation not moved; a backward restore moves it by one', () => {
    const p = framed();
    const x = takeSavepoint(p);
    commit(p, 1, (o) => way(o, 1000, 'way:1'));
    const y = takeSavepoint(p);
    commit(p, 1, (o) => way(o, 2000, 'way:2'));
    restoreSavepoint(x);
    expect([restoreGeneration(p), p.version]).toEqual([1, 0]);
    expect(y.version).toBeGreaterThan(p.version);
    expect(threw(() => restoreSavepoint(y))).toBe('tx: a savepoint is put back after an image taken before it (images are put back last-taken first)');
    expect([restoreGeneration(p), p.version]).toEqual([1, 0]);
  });

  it('N-25: random nested take / restore / drop with commits, rejects, throws and empty batches — no (generation, version) names two contents, the generation counts the cross-commit restores', () => {
    let sequences = 0;
    let restores = 0;
    let crossCommit = 0;
    let refusedDead = 0;
    for (let seed = 1; seed <= 120; seed++) {
      const r = rng(seed * 7919);
      const p = framed();
      const seen = new Map<string, string>();
      const stack: ReturnType<typeof takeSavepoint>[] = [];
      const gone: ReturnType<typeof takeSavepoint>[] = [];
      const order = new Map<ReturnType<typeof takeSavepoint>, number>();
      // A restore kills every image taken after it: those still on the stack join the gone list.
      const killAfter = (img: ReturnType<typeof takeSavepoint>): void => {
        const k = order.get(img) as number;
        for (let i = stack.length - 1; i >= 0; i--) if ((order.get(stack[i]) as number) > k) gone.push(...stack.splice(i, 1));
      };
      let count = 0;
      let n = 0;
      const look = (): void => {
        const k = `${restoreGeneration(p)}:${p.version}`;
        const c = contentPrint(p);
        const was = seen.get(k);
        if (was !== undefined) expect(c, `seed ${seed}: the key ${k} names two contents`).toBe(was);
        else seen.set(k, c);
      };
      look();
      for (let step = 0; step < 30; step++) {
        const e = r();
        const x = 100 + Math.floor(r() * 3700);
        if (e < 0.3) {
          tx(p, spec(1), (o) => way(o, x, `way:${n++}`));
        } else if (e < 0.38) {
          tx(p, spec(1), (o) => {
            way(o, x, `way:${n++}`);
            return err('E_INVARIANT', 'refused by the test');
          });
        } else if (e < 0.44) {
          threw(() => tx(p, spec(1), (o) => {
            way(o, x, `way:${n++}`);
            throw new Error('thrown by the test');
          }));
        } else if (e < 0.5) {
          tx(p, spec(1), () => ({ ok: true as const, value: null, warnings: [] }));
        } else if (e < 0.7) {
          const img = takeSavepoint(p);
          order.set(img, order.size);
          stack.push(img);
        } else if (e < 0.85 && stack.length > 0) {
          // Put back an image of the stack (the top or a deeper one): every image above it dies.
          const i = Math.floor(r() * stack.length);
          const img = stack[i];
          stack.splice(i, 1);
          gone.push(img);
          killAfter(img);
          if (p.version !== img.version) {
            count += 1;
            crossCommit += 1;
          }
          restoreSavepoint(img);
          restores += 1;
        } else if (e < 0.93 && stack.length > 0) {
          gone.push(stack.pop() as ReturnType<typeof takeSavepoint>); // dropped: never put back
        } else if (gone.length > 0) {
          // A used, dropped-after-use or dead image: refused, nothing changes.
          const img = gone[Math.floor(r() * gone.length)];
          const before = `${restoreGeneration(p)}:${p.version}:${contentPrint(p)}`;
          const moves = p.version !== img.version;
          const used = threw(() => restoreSavepoint(img));
          if (used !== 'no throw') {
            refusedDead += 1;
            expect(`${restoreGeneration(p)}:${p.version}:${contentPrint(p)}`).toBe(before);
          } else {
            // A dropped image never put back and still alive (nothing older put back since): a lawful restore.
            if (moves) {
              count += 1;
              crossCommit += 1;
            }
            restores += 1;
            killAfter(img);
          }
        }
        look();
        expect(restoreGeneration(p), `seed ${seed} step ${step}`).toBe(count);
      }
      healthy(p);
      sequences += 1;
    }
    expect(sequences).toBe(120);
    expect(restores).toBeGreaterThan(100);
    expect(crossCommit).toBeGreaterThan(50);
    expect(refusedDead).toBeGreaterThan(20);
  }, 300_000);
});

// ---- hardening round S8, line 4 (d): the frame observer's named pins (each in both modes: this folder runs in kernel and
// kernel-tiny). With the observer on, every put-back of a marked image is preceded by the door's undo to its mark (CHECK
// B) and followed by the whole comparison (CHECK A); each pin reads the observer's counts and failures.
describe('S8 line 4 (d): the frame observer over named frame shapes (observer on)', () => {
  beforeAll(() => installFrameObserver());
  afterAll(() => uninstallFrameObserver());
  beforeEach(() => resetFrameStats());

  /** The observer saw no failure and compared at least `n` marks of `kind`. */
  const clean = (kind: FrameKind, n = 1): void => {
    expect(frameStats().failures).toEqual([]);
    expect(frameStats().compared[kind]).toBeGreaterThanOrEqual(n);
  };
  const way = (o: Overlay, id: string, a: [number, number], b: [number, number]): KernelResult<unknown> => insertChain(o, [pt(a[0], a[1]), pt(b[0], b[1])], [{ role: 'way', entity: id }], 'mandatory');
  const refusal = err('E_INVARIANT', 'pin: rolled back');

  it('an inner op frame writes slot s and is rolled back, then the outer writes s and is rolled back', () => {
    const p = framed();
    commit(p, 1, (o) => way(o, 'way:0', [0, 2000], [4000, 2000]));
    const before = bits(p);
    const r = tx(p, spec(1), (o) => {
      const t = o as unknown as OpenTx;
      const outer = opSave(t);
      const inner = opSave(t);
      expect(setOwner(o, [faceAt(p, 1, 1000, 1000)], 'block:inner').ok).toBe(true);
      rollback(t, inner, refusal);
      expect(setOwner(o, [faceAt(p, 1, 1000, 1000)], 'block:outer').ok).toBe(true);
      rollback(t, outer, refusal);
      return err('E_INVARIANT', 'pin: the batch rejected');
    });
    expect(r.ok).toBe(false);
    expect(bits(p)).toBe(before);
    clean('op', 2);
    clean('batch');
  });

  it('an inner frame dropped, then the outer rolled back (the outer\'s undo replays the dropped frame\'s stores)', () => {
    const p = framed();
    const r = tx(p, spec(1), (o) => {
      const t = o as unknown as OpenTx;
      const outer = opSave(t);
      opSave(t); // dropped: committed into the outer frame implicitly
      expect(way(o, 'way:1', [0, 1000], [4000, 1200]).ok).toBe(true);
      rollback(t, outer, refusal);
      return way(o, 'way:2', [1000, 0], [1200, 4000]);
    });
    expect(r.ok).toBe(true);
    clean('op');
  });

  it('a kerb read inside an op that commits, and inside one that rolls back', () => {
    const p = framed();
    commit(p, 1, (o) => way(o, 'way:0', [0, 2000], [4000, 2000]));
    commit(p, 1, (o) => way(o, 'way:1', [2000, 0], [2000, 4000]));
    const widths = (c: { role: string }): { halfWidthCm: number } | null => (c.role === 'way' ? { halfWidthCm: 80 } : null);
    const f = faceAt(p, 1, 1000, 1000);
    const g = faceAt(p, 1, 3000, 3000);
    expect(tx(p, spec(1), (o) => {
      expect(kerb(o, f, widths).ok).toBe(true);
      return setOwner(o, [f], 'block:k1');
    }).ok).toBe(true);
    expect(tx(p, spec(1), (o) => {
      const t = o as unknown as OpenTx;
      const s = opSave(t);
      expect(kerb(o, g, widths).ok).toBe(true);
      expect(setOwner(o, [g], 'block:k2').ok).toBe(true);
      rollback(t, s, refusal);
      return setOwner(o, [g], 'block:k3');
    }).ok).toBe(true);
    clean('dry-run', 2);
    clean('op');
  });

  it('an op frame its caller drops on success (splitFace), then the batch\'s reject', () => {
    const p = framed();
    commit(p, 1, (o) => way(o, 'way:0', [0, 2000], [4000, 2000]));
    const before = bits(p);
    const r = tx(p, spec(1), (o) => {
      const s = splitFace(o, faceAt(p, 1, 1000, 1000), [pt(0, 1000), pt(4000, 1000)], { rows: [{ role: 'district_bound', entity: 'd:1' }] });
      expect(s.ok).toBe(true);
      return err('E_INVARIANT', 'pin: the batch rejected');
    });
    expect(r.ok).toBe(false);
    expect(bits(p)).toBe(before);
    clean('batch');
  });

  it('a batch rejected with dropped frames above its frame', () => {
    const p = framed();
    const before = bits(p);
    const r = tx(p, spec(1), (o) => {
      const t = o as unknown as OpenTx;
      opSave(t);
      expect(way(o, 'way:1', [0, 1000], [4000, 1200]).ok).toBe(true);
      opSave(t);
      expect(way(o, 'way:2', [1000, 0], [1200, 4000]).ok).toBe(true);
      return err('E_INVARIANT', 'pin: the batch rejected');
    });
    expect(r.ok).toBe(false);
    expect(bits(p)).toBe(before);
    clean('batch');
  });

  it('a frame that grows the vertex, pair, face and role-row tables, rehashes roles.head, an ownerHead and handles.slots and compacts a hole pool, then is rolled back', () => {
    const p = framed();
    const r = tx(p, spec(1), (o) => {
      const t = o as unknown as OpenTx;
      const s = opSave(t);
      churn(p);
      rollback(t, s, refusal);
      return way(o, 'way:1', [0, 1000], [4000, 1200]);
    });
    expect(r.ok).toBe(true);
    clean('op');
    const u = frameStats().undone;
    for (const k of ['grow vertices', 'grow pairs', 'grow role rows', 'grow faces[1]', 'rehash roles.head', 'rehash faces[1].ownerHead', 'rehash handles.slots', 'compact faces[1].holes']) expect(u.get(k) ?? 0, k).toBeGreaterThan(0);
  });

  it('a warp step committed in a batch the test then rejects (warp.ts commitStep\'s coordinate stores)', () => {
    const p = framed();
    commit(p, 1, (o) => insertChain(o, [pt(1000, 2000), pt(1060, 2000), pt(1140, 2000), pt(1200, 2000)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
    const before = bits(p);
    let moved = 0;
    const r = tx(p, spec(1, { rederivesFrom: 0 as never }), (o) => {
      // both coordinates move, so a revert of either of commitStep's two coordinate stores to a direct store is red (B)
      const w = warp(o, { displacement: () => ({ x: 20, y: 30 }) }, 1, [{ x: 1050 as Cm, y: 1990 as Cm }, { x: 1150 as Cm, y: 1990 as Cm }, { x: 1150 as Cm, y: 2010 as Cm }, { x: 1050 as Cm, y: 2010 as Cm }]);
      expect(w.ok).toBe(true);
      if (w.ok) moved = w.value.moves.length;
      return err('E_INVARIANT', 'pin: the batch rejected');
    });
    expect(r.ok).toBe(false);
    expect(moved).toBeGreaterThan(0);
    expect(bits(p)).toBe(before);
    clean('batch');
  });

  it('a batch on one arena whose callback rejects a batch on a second arena, and a scratch arena written inside a batch: each arena\'s log holds only its own stores', () => {
    const p = framed();
    const q = framed();
    const r = tx(p, spec(1), (o) => {
      const m = markArena(p);
      const inner = tx(q, spec(1), (oq) => {
        expect(way(oq, 'way:q', [0, 1000], [4000, 1000]).ok).toBe(true);
        return err('E_INVARIANT', 'pin: the inner batch rejected');
      });
      expect(inner.ok).toBe(false);
      const ov = buildOverlay([[[pt(0, 0), pt(100, 0), pt(100, 100), pt(0, 100)]]]);
      expect(ov.ok).toBe(true);
      expect(entryCounts(p, m)).toEqual({ column: 0, replacement: 0 });
      expect(hasRecorder(q)).toBe(false);
      return way(o, 'way:p', [1000, 0], [1000, 4000]);
    });
    expect(r.ok).toBe(true);
    clean('batch');
    expect(hasRecorder(p)).toBe(false);
  });

  it('a direct store a test plants into a slot the frame never wrote through the door: CHECK A names its column and slot (re-pointed from CHECK B, S9)', () => {
    const p = framed();
    let v = -1;
    const r = tx(p, spec(1), (o) => {
      const t = o as unknown as OpenTx;
      const s = opSave(t);
      v = p.slots.vertex.top - 1;
      p.vertices.x[v] += 1; // planted: past the door, so the log cannot see it
      rollback(t, s, refusal);
      return err('E_INVARIANT', 'pin: the batch rejected');
    });
    expect(r.ok).toBe(false);
    // the undo cannot see the planted store (the narrowed contract: a rejected or thrown batch undoes the stores that
    // passed the door, and nothing else), so the op frame's CHECK A names it, and the batch frame's after it
    const f = frameStats().failures;
    expect(f).toHaveLength(2);
    expect(f[0]).toContain('CHECK A (op frame)');
    expect(f[0]).toContain(`column vertices.x slot ${v}:`);
    expect(f[1]).toContain('CHECK A (batch frame)');
    expect(f[1]).toContain(`column vertices.x slot ${v}:`);
    resetFrameStats();
  });
});

// ---- hardening round S9, lines 3 and 5 (b) – (c): the frames' named pins (each in both modes: this folder runs in kernel
// and kernel-tiny). The observer (support.ts) records `bits` at every frame's mark and compares it after the frame's undo
// (CHECK A); each pin also reads `bits` itself where it names a state.
const IMAGE_PATH = (JSON.parse(readFileSync(join(import.meta.dirname, 's9-image-path.json'), 'utf8')) as Record<'default' | 'tiny', Record<keyof typeof SCENARIOS, string>>)[TINY_TABLES ? 'tiny' : 'default'];

describe('S9 line 3: the commit record reads the batch frame — equal to the image path\'s on the RESUME head (fixture s9-image-path.json)', () => {
  it('R1, a committed batch with a face freed and its slot re-used, an owner changed and changed back, a vertex row written back to its old values and a fresh row', () => {
    expect(SCENARIOS.r1()).toBe(IMAGE_PATH.r1);
  });

  it('R2, a refused batch with two swept vertex rows whose log order differs from their row order: the refusal detail the image path gave', () => {
    expect(SCENARIOS.r2()).toBe(IMAGE_PATH.r2);
    expect(IMAGE_PATH.r2).toBe('refused E_INVARIANT: a vertex at (500, 500) is coarser than every edge and row at it');
  });
});

describe('S9 line 5 (b): the frames\' named pins (observer on)', () => {
  beforeAll(() => installFrameObserver());
  afterAll(() => uninstallFrameObserver());
  beforeEach(() => resetFrameStats());

  const clean = (kind: FrameKind, n = 1): void => {
    expect(frameStats().failures).toEqual([]);
    expect(frameStats().compared[kind]).toBeGreaterThanOrEqual(n);
  };
  const way = (o: Overlay, id: string, a: [number, number], b: [number, number]): KernelResult<unknown> => insertChain(o, [pt(a[0], a[1]), pt(b[0], b[1])], [{ role: 'way', entity: id }], 'mandatory');
  const kerbLine = (o: Overlay, id: string, y: number): KernelResult<unknown> => insertChain(o, [pt(100, y), pt(3900, y + 100)], [{ role: 'kerb', entity: id }], 'mandatory');
  const refusal = err('E_INVARIANT', 'pin: rolled back');
  const ok = { ok: true as const, value: null, warnings: [] };
  const threw = (f: () => unknown): string => {
    try {
      f();
    } catch (e) {
      return (e as Error).message;
    }
    return 'no throw';
  };
  const ALREADY = 'tx: an undo to a frame already undone or discarded (a frame is undone at most once, the frames after it with it)';
  const OTHER = 'tx: an undo to a frame of another batch (a frame is undone only inside its own batch)';

  it('a committed batch whose op frame rolled back an attracted insertion: record.warnings the image path\'s (W_ATTRACTED counted once)', () => {
    const w = SCENARIOS.w();
    expect(w).toBe(IMAGE_PATH.w);
    expect((JSON.parse(w) as { warnings: unknown }).warnings).toEqual([{ code: 'W_ATTRACTED', count: 1, at: { x: 1000, y: 1000 } }]);
    clean('op');
  });

  it('a rejected batch, a thrown one and an empty one, each followed by a batch that opens and commits (the index log closed)', () => {
    const p = framed();
    commit(p, 1, (o) => way(o, 'way:0', [0, 2000], [4000, 2000]));
    const before = bits(p);
    expect(tx(p, spec(1), (o) => {
      expect(way(o, 'way:1', [1000, 0], [1000, 4000]).ok).toBe(true);
      return err('E_INVARIANT', 'pin: the batch rejected');
    }).ok).toBe(false);
    expect(p.index?.log).toBe(null);
    expect(bits(p)).toBe(before);
    expect(threw(() => tx(p, spec(1), (o) => {
      way(o, 'way:1', [1000, 0], [1000, 4000]);
      throw new Error('pin: thrown');
    }))).toBe('tx 8/L1/callback/fn: pin: thrown');
    expect(bits(p)).toBe(before);
    expect(tx(p, spec(1), () => ok).ok).toBe(true);
    expect(bits(p)).toBe(before);
    expect(hasRecorder(p)).toBe(false);
    expect(tx(p, spec(1), (o) => way(o, 'way:2', [3000, 0], [3000, 4000])).ok).toBe(true);
    healthy(p);
    clean('batch', 3);
  });

  it('a frame that creates a partition (an L2 dry read on a freshly attached index), then undone: the partition list, its byKey entry and its share gone', () => {
    const p = framed();
    commit(p, 1, (o) => way(o, 'way:0', [0, 2000], [4000, 2000]));
    attachIndex(p, { gridCellCm: 5000, partitionOf: () => 'd:fresh' });
    const parts = p.index?.partitions.length ?? 0;
    const r = tx(p, spec(2), (o) => {
      const t = o as unknown as OpenTx;
      const at = bits(p);
      const s = opSave(t);
      expect(kerbLine(o, 'kerb:1', 3000).ok).toBe(true);
      expect(p.index?.partitions.length).toBeGreaterThan(parts);
      expect(p.index?.byKey[2].has('d:fresh')).toBe(true);
      rollback(t, s, refusal);
      expect(p.index?.partitions.length).toBe(parts);
      expect(p.index?.byKey[2].has('d:fresh')).toBe(false);
      expect(bits(p)).toBe(at);
      return kerbLine(o, 'kerb:2', 1000);
    });
    expect(r.ok).toBe(true);
    clean('op');
  });

  it('a grid entry replaced inside a frame, then undone: the key back in the old entry\'s partition\'s grid share', () => {
    const p = framed();
    let key = 'd:a';
    attachIndex(p, { gridCellCm: 5000, partitionOf: () => key });
    commit(p, 2, (o) => kerbLine(o, 'kerb:1', 3000));
    const idx = p.index as NonNullable<Plat['index']>;
    const pa = idx.byKey[2].get('d:a') as number;
    const k = [...idx.levels[2].dynamic.entries.keys()].sort((a, b) => a - b)[0];
    expect(idx.partitions[pa].pending.has(k)).toBe(true);
    const r = tx(p, spec(2), (o) => {
      const t = o as unknown as OpenTx;
      const at = bits(p);
      const s = opSave(t);
      key = 'd:b';
      indexChange(p, { kind: keyKind(k), level: 2, slot: keySlot(k) });
      const pb = idx.byKey[2].get('d:b') as number;
      expect(idx.levels[2].dynamic.entries.get(k)?.partition).toBe(pb);
      expect(idx.partitions[pa].pending.has(k)).toBe(false);
      expect(idx.partitions[pb].pending.has(k)).toBe(true);
      rollback(t, s, refusal);
      key = 'd:a';
      expect(idx.levels[2].dynamic.entries.get(k)?.partition).toBe(pa);
      expect(idx.partitions[pa].pending.has(k)).toBe(true);
      expect(idx.byKey[2].has('d:b')).toBe(false);
      expect(bits(p)).toBe(at);
      return err('E_INVARIANT', 'pin: the batch rejected');
    });
    expect(r.ok).toBe(false);
    clean('op');
  });

  it('S7\'s analogues on marks: a second undo refused, an undo of a mark an older undo discarded refused, a mark undone only inside its own batch, an in-batch undo moving neither the version nor the generation', () => {
    const p = framed();
    commit(p, 1, (o) => way(o, 'way:0', [0, 2000], [4000, 2000]));
    const version = p.version;
    const generation = restoreGeneration(p);
    let kept: ReturnType<typeof mark> | null = null;
    let keptTx: OpenTx | null = null;
    const r = tx(p, spec(1), (o) => {
      const t = o as unknown as OpenTx;
      const m1 = mark(t);
      expect(way(o, 'way:1', [1000, 0], [1000, 4000]).ok).toBe(true);
      undoTo(t, m1);
      expect(p.version).toBe(version);
      expect(restoreGeneration(p)).toBe(generation);
      const at = bits(p);
      expect(threw(() => undoTo(t, m1))).toBe(ALREADY);
      expect(bits(p)).toBe(at);
      const a = mark(t);
      expect(way(o, 'way:2', [1500, 0], [1500, 4000]).ok).toBe(true);
      const b = mark(t);
      expect(way(o, 'way:3', [2500, 0], [2500, 4000]).ok).toBe(true);
      undoTo(t, a);
      const atA = bits(p);
      expect(threw(() => undoTo(t, b))).toBe(ALREADY);
      expect(threw(() => undoTo(t, a))).toBe(ALREADY);
      expect(bits(p)).toBe(atA);
      expect(p.version).toBe(version);
      expect(restoreGeneration(p)).toBe(generation);
      kept = mark(t);
      keptTx = t;
      return way(o, 'way:4', [3000, 0], [3000, 4000]);
    });
    expect(r.ok).toBe(true);
    const after = bits(p);
    // the batch ended: its frame is undone nowhere — not through its own (closed) overlay, not inside the next batch
    expect(threw(() => undoTo(keptTx as unknown as OpenTx, kept as unknown as ReturnType<typeof mark>))).toBe(OTHER);
    const r2 = tx(p, spec(1), (o) => {
      expect(threw(() => undoTo(o as unknown as OpenTx, kept as unknown as ReturnType<typeof mark>))).toBe(OTHER);
      return err('E_INVARIANT', 'pin: the batch rejected');
    });
    expect(r2.ok).toBe(false);
    expect(bits(p)).toBe(after);
    expect(restoreGeneration(p)).toBe(generation);
    clean('op', 2);
  });

  it('restoreSavepoint inside a batch of an image taken inside it: refused with its own message, the batch undone, the generation unmoved (N-23\'s check stays first)', () => {
    const p = framed();
    commit(p, 1, (o) => way(o, 'way:0', [0, 2000], [4000, 2000]));
    const before = bits(p);
    const taken = imagesTaken(p);
    const m = threw(() => tx(p, spec(1), (o) => {
      const image = takeSavepoint(p);
      expect(way(o, 'way:1', [1000, 0], [1000, 4000]).ok).toBe(true);
      restoreSavepoint(image);
      return { ok: true as const, value: null, warnings: [] };
    }));
    expect(m).toBe('tx 8/L1/callback/fn: tx: a savepoint is put back while a batch is open on the arena (images are put back between batches)');
    expect(bits(p)).toBe(before);
    expect(imagesTaken(p)).toBe(taken + 1);
    expect(restoreGeneration(p)).toBe(0);
    clean('batch');
  });

  /** A frame that writes, rehashes roles.head, compacts a hole pool and creates a partition (an L2 batch on a fresh resolver). */
  const heavyFrame = (p: Plat, o: Overlay): void => {
    expect(kerbLine(o, 'kerb:h', 3000).ok).toBe(true);
    churn(p);
  };
  const heavyArena = (): Plat => {
    const p = framed();
    commit(p, 1, (o) => way(o, 'way:0', [0, 2000], [4000, 2000]));
    // twenty more role keys before the batch, so the roles.head table the batch finds is dense and a newer table's entry
    // re-applied into it (an undo replayed whole after an interruption) lands on a live slot
    commit(p, 1, (o) => {
      for (let i = 0; i < 20; i++) {
        const r = way(o, `way:t${i}`, [150 + 180 * i, 2000], [150 + 180 * i, 2400]);
        if (!r.ok) return r;
      }
      return ok;
    });
    attachIndex(p, { gridCellCm: 5000, partitionOf: () => 'd:heavy' });
    return p;
  };

  it('a throw from inside undoTo mid-replay (S8\'s undo fault hook right after a roles.head rehash\'s replacement entry is undone): the batch\'s own undo resumes, bits() the batch mark\'s', () => {
    const p = heavyArena();
    const before = bits(p);
    let fired = false;
    const m = threw(() => tx(p, spec(2), (o) => {
      const t = o as unknown as OpenTx;
      const s = opSave(t);
      heavyFrame(p, o);
      const parts = p.index?.partitions.length ?? 0;
      expect(parts).toBeGreaterThan(0);
      let at = -1;
      let i = s.mark.arena.log;
      forEachEntry(p, s.mark.arena, {
        column() {
          i++;
        },
        replacement(id) {
          // the frame's FIRST roles.head rehash: its undo puts back the array the batch found, so an entry re-applied after
          // the interruption (an undo replayed whole) would write a newer array's fill into it
          if (id === ROLE_HEAD_BASE && at < 0) at = i;
          i++;
        },
      });
      expect(at).toBeGreaterThanOrEqual(0);
      setUndoFaultHook((e) => {
        if (e !== at) return;
        setUndoFaultHook(null);
        fired = true;
        throw new Error('pin: the undo interrupted after a rehash');
      });
      try {
        rollback(t, s, refusal);
      } finally {
        setUndoFaultHook(null);
      }
      return ok;
    }));
    expect(fired).toBe(true);
    expect(m).toBe('tx 8/L2/callback/fn: pin: the undo interrupted after a rehash');
    expect(bits(p)).toBe(before);
    healthy(p);
    expect(frameStats().failures).toEqual([]);
    expect(tx(p, spec(2), (o) => kerbLine(o, 'kerb:n', 1000)).ok).toBe(true);
  });

  it('a throw from frames.ts\'s own fault hook between the index undo\'s writes and its truncation: the batch\'s own undo resumes, bits() the batch mark\'s', () => {
    const p = heavyArena();
    const before = bits(p);
    let fired = false;
    const m = threw(() => tx(p, spec(2), (o) => {
      const t = o as unknown as OpenTx;
      const s = opSave(t);
      heavyFrame(p, o);
      setIndexUndoFaultHook(() => {
        setIndexUndoFaultHook(null);
        fired = true;
        throw new Error('pin: the index undo interrupted before its truncation');
      });
      try {
        rollback(t, s, refusal);
      } finally {
        setIndexUndoFaultHook(null);
      }
      return ok;
    }));
    expect(fired).toBe(true);
    expect(m).toBe('tx 8/L2/callback/fn: pin: the index undo interrupted before its truncation');
    expect(bits(p)).toBe(before);
    healthy(p);
    expect(frameStats().failures).toEqual([]);
    expect(tx(p, spec(2), (o) => kerbLine(o, 'kerb:n', 1000)).ok).toBe(true);
  });

  it('a throw from a test observer after the replay: the batch\'s own undo resumes, bits() the batch mark\'s', () => {
    const p = heavyArena();
    const before = bits(p);
    const was = frameObserver as FrameObserver;
    let fired = false;
    let target: unknown = null;
    setFrameObserver({
      ...was,
      afterUndo(q, f) {
        was.afterUndo(q, f);
        if (f === target) {
          fired = true;
          throw new Error('pin: the observer threw after the replay');
        }
      },
    });
    try {
      const m = threw(() => tx(p, spec(2), (o) => {
        const t = o as unknown as OpenTx;
        const s = opSave(t);
        target = s.mark;
        heavyFrame(p, o);
        rollback(t, s, refusal);
        return ok;
      }));
      expect(m).toBe('tx 8/L2/callback/fn: pin: the observer threw after the replay');
    } finally {
      setFrameObserver(was);
    }
    expect(fired).toBe(true);
    expect(bits(p)).toBe(before);
    healthy(p);
    expect(frameStats().failures).toEqual([]);
  });

  it('attachIndex on an arena with a batch open: thrown under the debug build with its message, the arena and its index unchanged; nothing asserted with the assertions off', () => {
    const p = framed();
    commit(p, 1, (o) => way(o, 'way:0', [0, 2000], [4000, 2000]));
    const idx = p.index;
    const r = tx(p, spec(1), (o) => {
      expect(way(o, 'way:1', [1000, 0], [1000, 4000]).ok).toBe(true);
      const at = bits(p);
      expect(threw(() => attachIndex(p, { gridCellCm: 5000 }))).toBe('index: attachIndex while a batch is open on the arena (attach between batches)');
      expect(bits(p)).toBe(at);
      expect(p.index).toBe(idx);
      return way(o, 'way:2', [3000, 0], [3000, 4000]);
    });
    expect(r.ok).toBe(true);
    const q = framed();
    beginIndexBatch(q, 1);
    setDebugAssertions(false);
    try {
      expect(threw(() => attachIndex(q, { gridCellCm: 5000 }))).toBe('no throw');
    } finally {
      setDebugAssertions(true);
    }
    expect(frameStats().failures).toEqual([]);
  });

  it('a pool compaction between an outer and an inner frame\'s opens, the inner frame\'s run written above the lowered top, then both undone', () => {
    const p = framed();
    commit(p, 1, (o) => way(o, 'way:0', [0, 2000], [4000, 2000]));
    commit(p, 1, (o) => way(o, 'way:1', [2000, 0], [2000, 4000]));
    const f1 = faceAt(p, 1, 1000, 1000);
    const f2 = faceAt(p, 1, 3000, 3000);
    const hs: number[] = [];
    for (let h = 0; h < 2 * p.slots.pair.top && hs.length < 3; h += 2) if (p.halfEdges.next[h] >= 0 && p.halfEdges.level[h >> 1] <= 1) hs.push(h);
    let compacted = false;
    const r = tx(p, spec(1), (o) => {
      const t = o as unknown as OpenTx;
      const outer = opSave(t);
      const atOuter = bits(p);
      for (let i = 0; i < 200 && !compacted; i++) {
        const f = i % 2 === 0 ? f1 : f2;
        const top = p.slots.holesTop[1];
        setFaceHoles(p, 1, f, [hs[0], hs[1]]);
        compacted = p.faces[1].holesStart[f] < top;
      }
      expect(compacted).toBe(true);
      const top = p.slots.holesTop[1];
      const inner = opSave(t);
      const atInner = bits(p);
      setFaceHoles(p, 1, f1, [hs[2]]);
      expect(p.faces[1].holesStart[f1]).toBeGreaterThanOrEqual(top - 3);
      rollback(t, inner, refusal);
      expect(bits(p)).toBe(atInner);
      rollback(t, outer, refusal);
      expect(bits(p)).toBe(atOuter);
      return way(o, 'way:2', [1000, 0], [1000, 2000]);
    });
    expect(r.ok).toBe(true);
    clean('op', 2);
  });

  it('two sibling op frames writing one slot, the second rolled back: the first\'s write stands and commits', () => {
    const p = framed();
    commit(p, 1, (o) => way(o, 'way:0', [0, 2000], [4000, 2000]));
    const f = faceAt(p, 1, 1000, 1000);
    const r = tx(p, spec(1), (o) => {
      const t = o as unknown as OpenTx;
      opSave(t); // dropped: committed into the batch frame
      expect(setOwner(o, [f], 'block:a').ok).toBe(true);
      const atB = bits(p);
      const b = opSave(t);
      expect(setOwner(o, [f], 'block:b').ok).toBe(true);
      rollback(t, b, refusal);
      expect(bits(p)).toBe(atB);
      return ok;
    });
    expect(r.ok).toBe(true);
    expect(kernel.idOf(p, p.faces[1].owner[f])).toBe('block:a');
    clean('op');
  });

  it('a batch whose stage has no u8 rank throws at its open before its frame is marked: no index log left open, no recorder attached, the next batch commits', () => {
    const p = framed();
    const before = bits(p);
    const m = threw(() => tx(p, spec(1), (o) => way(o, 'way:1', [1000, 0], [1000, 4000]), { rankOf: () => 300 }));
    expect(m).toMatch(/has no u8 rank/);
    expect(bits(p)).toBe(before);
    expect(hasRecorder(p)).toBe(false);
    expect(tx(p, spec(1), (o) => way(o, 'way:1', [1000, 0], [1000, 4000])).ok).toBe(true);
    expect(frameStats().failures).toEqual([]);
  });

  it('writes planted in the index log that the index never held (an insert of no partition, a delete with no removed entry, a tombstone naming another level\'s partition) are skipped: the rejected batch undoes the rest, bits() as before', () => {
    const p = framed();
    commit(p, 1, (o) => way(o, 'way:0', [0, 2000], [4000, 2000]));
    const before = bits(p);
    const l0 = p.index?.byKey[0].get('') ?? -1;
    expect(l0).toBeGreaterThanOrEqual(0);
    const r = tx(p, spec(1), (o) => {
      expect(way(o, 'way:1', [1000, 0], [1000, 4000]).ok).toBe(true);
      const log = indexOf(o.plat).log;
      log?.writes.push({ op: 'insert', kind: ITEM_FACE, level: 1, slot: 0, partition: -1 });
      log?.writes.push({ op: 'delete', kind: ITEM_FACE, level: 1, slot: 0, partition: -1 });
      log?.writes.push({ op: 'tombstone', kind: ITEM_FACE, level: 1, slot: 0, partition: l0 });
      return err('E_INVARIANT', 'pin: the batch rejected');
    });
    expect(r.ok).toBe(false);
    expect(bits(p)).toBe(before);
    expect(tx(p, spec(1), (o) => way(o, 'way:2', [3000, 0], [3000, 4000])).ok).toBe(true);
    healthy(p);
    clean('batch');
  });

  it('a slot written in batch 1, then rewritten in batch 2 and rejected: batch 1\'s value stands', () => {
    const p = framed();
    commit(p, 1, (o) => way(o, 'way:0', [0, 2000], [4000, 2000]));
    const f = faceAt(p, 1, 1000, 1000);
    commit(p, 1, (o) => setOwner(o, [f], 'block:1'));
    const at = bits(p);
    expect(tx(p, spec(1), (o) => {
      expect(setOwner(o, [f], 'block:2').ok).toBe(true);
      return err('E_INVARIANT', 'pin: the batch rejected');
    }).ok).toBe(false);
    expect(bits(p)).toBe(at);
    expect(kernel.idOf(p, p.faces[1].owner[f])).toBe('block:1');
    clean('batch');
  });
});

describe('S9 line 5 (c): no kernel path takes an image — the per-arena image count unchanged (observer off)', () => {
  it('across a kerb read, a splitFace and a rejected batch', () => {
    uninstallFrameObserver();
    const p = framed();
    const way = (o: Overlay, id: string, a: [number, number], b: [number, number]): KernelResult<unknown> => insertChain(o, [pt(a[0], a[1]), pt(b[0], b[1])], [{ role: 'way', entity: id }], 'mandatory');
    commit(p, 1, (o) => way(o, 'way:0', [0, 2000], [4000, 2000]));
    commit(p, 1, (o) => way(o, 'way:1', [2000, 0], [2000, 4000]));
    const n = imagesTaken(p);
    const widths = (c: { role: string }): { halfWidthCm: number } | null => (c.role === 'way' ? { halfWidthCm: 80 } : null);
    expect(tx(p, spec(1), (o) => kerb(o, faceAt(p, 1, 1000, 1000), widths)).ok).toBe(true);
    expect(imagesTaken(p)).toBe(n);
    expect(tx(p, spec(1), (o) => splitFace(o, faceAt(p, 1, 3000, 3000), [pt(2000, 3000), pt(4000, 3000)], { rows: [{ role: 'district_bound', entity: 'd:1' }] })).ok).toBe(true);
    expect(imagesTaken(p)).toBe(n);
    expect(tx(p, spec(1), (o) => {
      way(o, 'way:2', [1000, 0], [1000, 2000]);
      return err('E_INVARIANT', 'pin: the batch rejected');
    }).ok).toBe(false);
    expect(imagesTaken(p)).toBe(n);
    expect(n).toBe(0);
  });
});
