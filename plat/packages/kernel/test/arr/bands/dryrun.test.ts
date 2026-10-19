// kerb(F)'s read is a dry-run on the real arena (session round S9, the ruling on KI-12; C-0387; kerb.ts's module
// comment): no scratch arrangement is built for a read — `createPlat`, the door a scratch overlay is built through
// (winding.ts imports it from ../arena/index.js), is never called by one — its parts go through `insertChain` (the door,
// imported by kerb.ts from ../insert/insertChain.js) under ONE op savepoint (`opSave`, ../faces/common.js), and the read
// leaves the arena bit-identical and the batch's work, warnings and journals as it found them. Counted through vitest
// module mocks of those three modules, each spreading the real module and wrapping the one function in a counter; the
// counter is reset after the fixture's own build (the fixtures call createPlat and insertChain themselves) and read
// after each read, on the fusion fixture's faces (vertexcontact-faces.json), the dead-end fixture's (deadend-faces.json)
// and B-FUZZ's networks (bfuzz.test.ts's chord arbitrary, a fixed sample). Before round S9 every non-trivial read built
// at least one arena (fusion 3/33/44: 2 each, with 334/338/548 two-point insertions; dead end: 1, with 198; 200 networks
// of seed 20261019: 422 reads, 434 arenas, 21 613 insertions, no savepoint — the CHECKPOINT of 2026-10-19 02:58).
import fc from 'fast-check';
import { describe, expect, it, vi } from 'vitest';

const counts = { createPlat: 0, insertChain: 0, opSave: 0 };

vi.mock('../../../src/arena/index.js', async (importOriginal) => {
  const real = await importOriginal<typeof import('../../../src/arena/index.js')>();
  return { ...real, createPlat: (...a: Parameters<typeof real.createPlat>) => { counts.createPlat += 1; return real.createPlat(...a); } };
});
vi.mock('../../../src/insert/insertChain.js', async (importOriginal) => {
  const real = await importOriginal<typeof import('../../../src/insert/insertChain.js')>();
  return { ...real, insertChain: (...a: Parameters<typeof real.insertChain>) => { counts.insertChain += 1; return real.insertChain(...a); } };
});
vi.mock('../../../src/faces/common.js', async (importOriginal) => {
  const real = await importOriginal<typeof import('../../../src/faces/common.js')>();
  return { ...real, opSave: (...a: Parameters<typeof real.opSave>) => { counts.opSave += 1; return real.opSave(...a); } };
});

import type { FaceId, Plat } from '../../../src/arena/index.js';
import { kerb, readKerb, type SpineWidths } from '../../../src/arr/kerb.js';
import { bits } from '../../tx/support.js';
import { buildContact, buildDeadEnd, commit, contactFixtures, deadEndFixtures, network, state, widthsOf, type Chord } from './support.js';

type Counts = typeof counts;

/** One read's counts and what it left behind. */
interface ReadCount extends Counts {
  readonly ok: boolean;
  /** Parts the read laid (insertChain calls; 0: a spine-less face or no part near F). */
  readonly parts: number;
  /** The arena bit for bit, the batch's work, warnings and journals unchanged across the read. */
  readonly untouched: boolean;
}

/** Every face's kerb read in one L1 batch, each counted on its own. */
function countReads(p: Plat, faces: readonly FaceId[], ws: SpineWidths): ReadCount[] {
  const out: ReadCount[] = [];
  const before = state(p);
  commit(p, 1, (o) => {
    for (const f of faces) {
      const b0 = bits(p);
      const w0 = { work: o.work.total, counts: JSON.stringify([...o.work.counts]), warnings: JSON.stringify(o.warnings), journal: JSON.stringify(o.journal) };
      counts.createPlat = 0;
      counts.insertChain = 0;
      counts.opSave = 0;
      const k = kerb(o, f, ws);
      const c = { ...counts };
      const w1 = { work: o.work.total, counts: JSON.stringify([...o.work.counts]), warnings: JSON.stringify(o.warnings), journal: JSON.stringify(o.journal) };
      out.push({ ...c, ok: k.ok, parts: c.insertChain, untouched: bits(p) === b0 && JSON.stringify(w1) === JSON.stringify(w0) });
    }
    return { ok: true, value: null, warnings: [] };
  });
  // and the batch committed nothing (the read-only service writes nothing)
  expect(state(p).replace(/#v\d+$/, '')).toBe(before.replace(/#v\d+$/, ''));
  return out;
}

/** No scratch arena; one savepoint per read that lays a part, none for one that lays none; the arena and batch untouched. */
function expectDryRun(per: readonly ReadCount[], label: string): void {
  for (const [i, c] of per.entries()) {
    expect(c.createPlat, `${label} read ${String(i)}: arenas built`).toBe(0);
    expect(c.opSave, `${label} read ${String(i)}: savepoints`).toBeLessThanOrEqual(1);
    if (c.parts > 0) expect(c.opSave, `${label} read ${String(i)}: one savepoint`).toBe(1);
    expect(c.untouched, `${label} read ${String(i)}: the arena and the batch as the read found them`).toBe(true);
  }
}

describe('kerb(F) is a dry-run on the real arena: no scratch arrangement, one savepoint, nothing left behind (C-0387; KI-12)', () => {
  it('the fusion fixture’s faces (CITY seeds 3/33/44, vertexcontact-faces.json)', () => {
    const fx = contactFixtures();
    expect(fx.map((f) => f.seed)).toEqual([3, 33, 44]);
    for (const f of fx) {
      const { p, face, widths } = buildContact(f);
      const per = countReads(p, [face], widths);
      expect(per[0].ok).toBe(true);
      expect(per[0].parts).toBeGreaterThan(0);
      expectDryRun(per, `fusion ${String(f.seed)}`);
    }
  });

  it('the dead-end fixture’s faces (deadend-faces.json)', () => {
    for (const f of deadEndFixtures()) {
      const { p, face, widths } = buildDeadEnd(f);
      const per = countReads(p, [face], widths);
      expect(per[0].ok).toBe(true);
      expect(per[0].parts).toBeGreaterThan(0);
      expectDryRun(per, `dead end ${String(f.face)}`);
    }
  });

  it('B-FUZZ’s networks (a fixed sample of bfuzz.test.ts’s chords, seed 20261019): every read, refused or not', { timeout: 1_800_000 }, () => {
    const chordArb: fc.Arbitrary<Chord> = fc.record({
      a: fc.integer({ min: 0, max: 15_999 }),
      b: fc.oneof(fc.integer({ min: 0, max: 15_999 }), fc.integer({ min: 0, max: 60 }), fc.integer({ min: 7_960, max: 8_040 })),
      hw: fc.oneof(fc.integer({ min: 1, max: 30 }), fc.integer({ min: 30, max: 600 })),
      knots: fc.option(fc.tuple(fc.integer({ min: 5, max: 600 }), fc.integer({ min: 5, max: 600 })), { freq: 3 }),
      ends: fc.constantFrom<'round' | 'square'>('round', 'square'),
    });
    const nets = fc.sample(fc.array(chordArb, { minLength: 1, maxLength: 3 }), { seed: 20_261_019, numRuns: 100 });
    let reads = 0;
    let laid = 0;
    for (const chords of nets) {
      const { p, faces, table } = network(chords);
      const per = countReads(p, faces, widthsOf(table));
      expectDryRun(per, JSON.stringify(chords));
      reads += per.length;
      laid += per.filter((c) => c.parts > 0).length;
    }
    console.info(`dry-run census: ${String(reads)} reads on 100 networks, ${String(laid)} laid parts (one savepoint each), 0 arenas built`);
    // not vacuous: most reads lay parts
    expect(laid).toBeGreaterThan(reads / 2);
  });

  it('the overlay must be open: a shell transaction is a programming error (openTx), never a read on a bare arena', () => {
    const { p, faces, table } = network([{ a: 2000, b: 10_000, hw: 200, knots: null, ends: 'round' }]);
    const shell = { plat: p, key: p.key, level: 1, workLimit: 1e9, work: { total: 0, counts: new Map<string, number>() }, warnings: [], journal: { vertices: [], pairs: [], split: [], steiner: 0, changed: [] }, open: true } as unknown as Parameters<typeof readKerb>[0];
    expect(() => readKerb(shell, faces[0], widthsOf(table))).toThrow(/no open transaction/);
  });
});
