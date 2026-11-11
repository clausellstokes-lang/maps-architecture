// M0-x-05 hardening round S3 (Q87, m-01's L30): the rung fixtures' generated records — S8's districts on a hand-built
// arena (`districtOf`) and the ways and districts of a ways case (`waysCase`) — carry @plat/model's one builder of a
// generated record's lifecycle stamp, `generatedLifecycle(0)` (§2.8), value for value and key for key, a fresh object
// per record; and no source file of the folder spells the stamp by hand (the copy support.ts held until this round).
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { generatedLifecycle } from '@plat/model';
import { HEXAGON, L_SHAPE, RECT, twoDistricts } from '../../src/ladders/fixtures.js';
import { districtOf, type S8Case } from '../../src/ladders/support.js';

const SRC = fileURLToPath(new URL('../../src/ladders/', import.meta.url));

/** Every lifecycle a case's records carry: its districts' and its ways'. */
function lifecycles(c: S8Case): { what: string; lifecycle: unknown }[] {
  return [
    ...c.input.districts.map((d) => ({ what: d.district.id, lifecycle: d.district.lifecycle as unknown })),
    ...c.input.ways.map((w) => ({ what: w.id, lifecycle: w.lifecycle as unknown })),
  ];
}

describe("Q87: the rung fixtures' generated lifecycle is @plat/model's builder's", () => {
  it('districtOf’s district and waysCase’s ways and districts carry generatedLifecycle(0), key for key, each its own object', () => {
    const cases = [districtOf([RECT], 1), districtOf([L_SHAPE], 1), districtOf([HEXAGON], 1), twoDistricts(1)];
    const all = cases.flatMap(lifecycles);
    // the three one-face districts and the two-district ways case (two ways, two districts)
    expect(all.length).toBe(7);
    const stamp = JSON.stringify(generatedLifecycle(0));
    for (const { what, lifecycle } of all) {
      expect(lifecycle, what).toEqual(generatedLifecycle(0));
      expect(JSON.stringify(lifecycle), what).toBe(stamp);
    }
    // a fresh object per record (the records are plain and later steps write on them): no two records share one
    expect(new Set(all.map((x) => x.lifecycle)).size).toBe(all.length);
  });

  it('no source file of the folder spells the generated stamp by hand; support.ts calls the builder', () => {
    const files = readdirSync(SRC).filter((f) => f.endsWith('.ts'));
    expect(files.length).toBeGreaterThan(5);
    for (const f of files) {
      const text = readFileSync(`${SRC}${f}`, 'utf8');
      expect([f, /existence\s*:\s*['"]generated['"]/.test(text)]).toEqual([f, false]);
    }
    const support = readFileSync(`${SRC}support.ts`, 'utf8');
    expect(support).toMatch(/import \{[^}]*\bgeneratedLifecycle\b[^}]*\} from '@plat\/model'/);
    expect(support.match(/lifecycle: generatedLifecycle\(0\)/g)?.length).toBe(2);
  });
});
