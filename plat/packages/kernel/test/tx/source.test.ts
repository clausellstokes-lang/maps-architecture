// M0-a-06: "No output depends on slot numbers" (§3.3) in this item's source — every tie-break in src/tx reads lattice
// positions, canonical keys, ranks or arc positions, never a VertexId, HalfEdgeId or FaceId (the checker's first
// confirmation). Every sort in the folder names its key; a bare numeric comparison of two slots is refused. Behaviour is
// held by order.test.ts, record.test.ts (an arena whose slots differ) and the fixtures M0-d-08 renumbers.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const DIR = join(import.meta.dirname, '../../src/tx');

/** The keys a comparator may read: lattice positions, canonical face keys, address ids, ranks, arc positions, lineage. */
const KEYS = /compareVertices|compareKeys|comparePoints|keyCmp|byKey|\bcmp\b|rank|\.pos\b|ordinal/;

/**
 * The one exception, by file and comparator name (hardening round S9, line 3): sweepVertexRows walks the role rows the
 * batch's log names in ROW order — the order its whole-table loop visited them before S9 — because levelProblems and
 * clearanceProblems read t.log.vertices in that order and a refusal names the first problem. The order is a slot order
 * (§3.3: no output depends on slot numbers): a refusal's DETAIL can depend on it, as it did before the round, and the
 * notes name that dependence to the session (NO-SHIFT: unchanged here). No other sort may order slots.
 */
const EXCEPTIONS: readonly { readonly file: string; readonly comparator: string; readonly reason: string }[] = [
  { file: 'tx.ts', comparator: 'byRoleRowOrder', reason: 'sweepVertexRows visits the logged role rows in row order (the pre-S9 loop\'s order; a refusal\'s detail reads it)' },
];

describe('src/tx: every tie-break reads a canonical key, never a slot', () => {
  const files = readdirSync(DIR).filter((f) => f.endsWith('.ts'));
  it('the folder holds the item\'s modules', () => {
    expect(files.sort()).toEqual(['chains.ts', 'frames.ts', 'index.ts', 'ops.ts', 'profile.ts', 'relevel.ts', 'savepoint.ts', 'state.ts', 'tx.ts', 'types.ts', 'writers.ts']);
  });

  for (const f of files) {
    it(`${f}: each sort's comparator names its key`, () => {
      const src = readFileSync(join(DIR, f), 'utf8');
      const lines = src.split('\n');
      const excepted = EXCEPTIONS.filter((x) => x.file === f);
      for (const x of excepted) expect(src.split(`.sort(${x.comparator})`).length - 1, `${f}: the exception ${x.comparator} is used by exactly one sort`).toBe(1);
      lines.forEach((line, i) => {
        if (!line.includes('.sort(')) return;
        if (excepted.some((x) => line.includes(`.sort(${x.comparator})`))) return;
        const text = lines.slice(i, i + 7).join(' ');
        expect(text, `${f}:${i + 1}`).toMatch(KEYS);
        expect(text, `${f}:${i + 1}`).not.toMatch(/\.sort\(\(\s*\w+\s*,\s*\w+\s*\)\s*=>\s*\w+\s*-\s*\w+\s*\)/);
        expect(text, `${f}:${i + 1}`).not.toMatch(/\.sort\(\)/);
      });
    });
  }
});
