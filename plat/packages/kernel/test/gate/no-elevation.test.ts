// The M0 close gate, row K13 (check/M0-world-sites-gate; docs/build/M0-world-sites-gate.md): no digest, reference
// form, invariant or kernel operation reads or assumes an elevation — `Frame` and the lattice are two-dimensional
// only. A grep lint over kernel/src: no interface member, type member or object key declares a z-like name (z, zCm,
// elevation…, altitude…, datum…, storey…, floorCm, baseCm, topCm, surfaceCm, depth…), a comment and a string
// stripped first; the one `depth…` member in the tree — geom/lir.ts's `depthCm`, the inscribed rectangle's extent
// across its axis, a plan length — is the allowlist, and the allowlist must be hit exactly (a stale entry fails). The
// type side pins `LatticePoint` to x and y and `Frame` to its four plan fields.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { describe, expect, expectTypeOf, it } from 'vitest';
import type { Frame, LatticeSpec } from '../../src/num/index.js';
import type { FaceRef, ChainRef, EdgeSetRef, VertexRef, LatticePoint, PlatKey } from '../../src/types/index.js';

const SRC = fileURLToPath(new URL('../../src/', import.meta.url));

/** A member declaration at the start of a line: `name:` / `name?:` / `readonly name:` — never a `let`, `const`, a parameter or a call. */
const MEMBER = /^\s*(?:readonly\s+)?(z|zCm|elev\w*|elevation\w*|altitude\w*|datum\w*|storey\w*|floorCm|baseCm|topCm|surfaceCm|depth\w*)\??\s*:/;

/** Lines in the tree the lint allows, each with why (a plan length, never an elevation). */
const ALLOWED: readonly { file: string; member: string; why: string }[] = [
  { file: 'geom/lir.ts', member: 'depthCm', why: 'the inscribed rectangle\'s extent across its axis (a plan length)' },
];

function walk(dir: string, out: string[]): string[] {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else if (/\.(ts|json)$/.test(name)) out.push(path);
  }
  return out;
}

/** The source with block comments, line comments and string literals blanked (their line structure kept). */
function code(text: string): string {
  return text
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/(^|[^:\\])\/\/.*$/gm, (_m, pre: string) => pre)
    .replace(/'(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*"|`(?:[^`\\]|\\.)*`/g, (m) => m.replace(/[^\n]/g, ' '));
}

describe('K13: no z-like field in kernel/src; the frame and the lattice are two-dimensional', () => {
  it('no interface member, type member or object key of kernel/src declares an elevation (a grep lint with an exact allowlist)', () => {
    const files = walk(SRC, []).sort();
    expect(files.length).toBeGreaterThan(100);
    const hits: { file: string; member: string; line: number }[] = [];
    for (const path of files) {
      const rel = path.slice(SRC.length);
      const text = readFileSync(path, 'utf8');
      const lines = (rel.endsWith('.json') ? text : code(text)).split('\n');
      lines.forEach((line, i) => {
        const m = MEMBER.exec(line);
        if (m !== null) hits.push({ file: rel, member: m[1], line: i + 1 });
        // a JSON registry key
        if (rel.endsWith('.json') && /"(z|zCm|elevation\w*|altitude\w*|datum\w*|depth\w*)"\s*:/.test(line)) hits.push({ file: rel, member: 'json', line: i + 1 });
      });
    }
    const unexpected = hits.filter((h) => !ALLOWED.some((a) => a.file === h.file && a.member === h.member));
    expect(unexpected, 'z-like members outside the allowlist').toEqual([]);
    for (const a of ALLOWED) expect(hits.some((h) => h.file === a.file && h.member === a.member), `stale allowlist entry ${a.file} ${a.member}`).toBe(true);
  });

  it('a lattice point is x and y; a frame is width, height, aspect and margin share; the lattice spec names no third axis', () => {
    expectTypeOf<keyof LatticePoint>().toEqualTypeOf<'x' | 'y'>();
    expectTypeOf<keyof Frame>().toEqualTypeOf<'widthCm' | 'heightCm' | 'aspect' | 'marginShare'>();
    expectTypeOf<keyof LatticeSpec>().toEqualTypeOf<'unitCm' | 'minEdgeCm' | 'attractCm' | 'minFaceAngleCdeg' | 'rangeCm'>();
    expectTypeOf<keyof PlatKey>().toEqualTypeOf<'layer' | 'part'>();
    // the reference forms: entity, role, level and ordinal only — no position, no elevation
    expectTypeOf<keyof FaceRef>().toEqualTypeOf<'owner' | 'level'>();
    expectTypeOf<keyof ChainRef>().toEqualTypeOf<'role' | 'entity'>();
    expectTypeOf<keyof EdgeSetRef>().toEqualTypeOf<'role' | 'entity' | 'ordinal'>();
    expectTypeOf<keyof VertexRef>().toEqualTypeOf<'role' | 'entity' | 'ordinal'>();
  });

  it('the arena\'s vertex table has x and y columns and no third coordinate (the typed-array layout, by name)', () => {
    const text = readFileSync(join(SRC, 'arena/plat.ts'), 'utf8');
    const block = /export interface VertexTable \{([\s\S]*?)\}/.exec(text);
    expect(block).not.toBeNull();
    const members = (block as RegExpExecArray)[1].split('\n').map((l) => /^\s*(\w+)\s*:/.exec(l)?.[1]).filter((m): m is string => m !== undefined);
    expect(members).toEqual(['x', 'y', 'out', 'level', 'flags']);
  });
});
