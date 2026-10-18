// M0-a-15: the block's byte-level promises — §3.9 "The ordinal and stage-rank columns — 2 bytes per role row, 1 byte per
// face"; "slots are compacted on save … nothing outside the kernel stores a slot and no output depends on slot numbers"
// (no slot enters the bytes); §6.5 (3) and the item's "no text serialisation on the path" (every value written as its
// bits). The checker's two confirmations, as tests.
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { addRoleRow, intern, isFaceLive, roleIdOf, type Plat } from '../../src/arena/index.js';
import { encodeArena, type Chunk } from '../../src/io/index.js';
import { ins, tx } from '../insert/step3-5/support.js';
import { framed, vertexAtPoint } from '../tx/support.js';
import { print } from './support.js';

function weldArena(ordinal: number): Plat {
  const p = framed();
  addRoleRow(p, vertexAtPoint(p, 0, 0), roleIdOf('weld'), intern(p, 'castle:1'), 0, ordinal);
  return p;
}

function diff(a: Chunk, b: Chunk): number[] {
  const out: number[] = [];
  for (let i = 0; i < a.bytes.length; i++) if (a.bytes[i] !== b.bytes[i]) out.push(i);
  return out;
}

describe('the block\'s columns and bytes (§3.9, §6.5 (3))', () => {
  it('the ordinal column is 2 bytes per role row: any ordinal keeps the chunk\'s length, differing in two adjacent bytes', () => {
    const base = encodeArena(weldArena(1))[0];
    for (const ordinal of [0, 2, 127, 128, 300, 16_384, 65_535]) {
      const c = encodeArena(weldArena(ordinal))[0];
      expect(c.bytes.length).toBe(base.bytes.length);
      const d = diff(base, c);
      expect(d.length).toBeGreaterThan(0);
      expect(d[d.length - 1] - d[0]).toBeLessThanOrEqual(1);
    }
  });

  it('the stage-rank column is 1 byte per face: any rank keeps the chunk\'s length, differing in one byte', () => {
    const p = framed();
    const f = [0, 1, 2, 3].find((i) => isFaceLive(p, 0, i)) as number;
    p.faces[0].stage[f] = 0;
    const base = encodeArena(p)[0];
    for (const s of [1, 127, 128, 200, 255]) {
      p.faces[0].stage[f] = s;
      const c = encodeArena(p)[0];
      expect(c.bytes.length).toBe(base.bytes.length);
      expect(diff(base, c).length).toBe(1);
    }
  });

  it('no slot enters the bytes: one arena built in two histories (different slots) writes identical chunks', () => {
    const a = framed();
    const b = framed();
    const lanes: [number, number][][] = [[[500, 600], [1500, 700]], [[2500, 2600], [3300, 3400]], [[600, 3000], [1200, 3500]]];
    for (const l of lanes) expect(ins(tx(a, 2), l, [{ role: 'kerb', entity: `lane:${l[0][0]}` }]).ok).toBe(true);
    for (const l of [...lanes].reverse()) expect(ins(tx(b, 2), l, [{ role: 'kerb', entity: `lane:${l[0][0]}` }]).ok).toBe(true);
    expect(print(a)).toBe(print(b));
    // The fixture's precondition: the slots differ.
    expect(Array.from(a.vertices.x.subarray(4, 10))).not.toEqual(Array.from(b.vertices.x.subarray(4, 10)));
    const ca = encodeArena(a);
    const cb = encodeArena(b);
    expect(ca.length).toBe(cb.length);
    ca.forEach((c, i) => expect(c.bytes).toEqual(cb[i].bytes));
  });

  it('no text serialisation on the path: the io sources format and parse no number as text', () => {
    const dir = fileURLToPath(new URL('../../src/io/', import.meta.url));
    const forbidden = [/JSON\./, /\.toString\(/, /\.toFixed\(/, /\.toPrecision\(/, /parseInt\(/, /parseFloat\(/, /\bNumber\(/, /TextEncoder/, /TextDecoder/, /utf8Bytes/];
    const files = readdirSync(dir).filter((f) => f.endsWith('.ts'));
    expect(files.length).toBeGreaterThanOrEqual(6);
    for (const f of files) {
      const src = readFileSync(dir + f, 'utf8');
      for (const re of forbidden) expect(`${f}: ${re.test(src) ? re.source : 'clean'}`).toBe(`${f}: clean`);
    }
  });
});
