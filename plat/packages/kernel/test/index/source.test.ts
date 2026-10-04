// M0-a-03's checker lines, as receipts: flatbush is imported in exactly one adapter file of plat/ (§14:
// kernel/src/adapters/flatbush.ts), and the index's sources hold no comparator over slot numbers — every sort in
// src/index/ orders by lattice positions or face keys (the slot-renumbering tests in query.test.ts hold the behaviour;
// this holds the text), but for the rebuild's internal ordering of item keys, which no output reads.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const PLAT = new URL('../../../../', import.meta.url).pathname;

function files(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist' || name === 'coverage') continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) files(path, out);
    else if (/\.(ts|tsx|mts|cts|js|mjs|cjs)$/.test(name)) out.push(path);
  }
  return out;
}

describe('the checker’s lines (M0-work.json, M0-a-03)', () => {
  it('flatbush is imported in exactly one file of the packages and the bench: kernel/src/adapters/flatbush.ts', () => {
    const roots = ['packages', 'bench'].map((r) => join(PLAT, r));
    const importers = roots
      .flatMap((r) => files(r))
      .filter((f) => /(from\s+|import\s*\(\s*|require\s*\(\s*)['"]flatbush['"]/.test(readFileSync(f, 'utf8')))
      .map((f) => f.slice(PLAT.length));
    expect(importers).toEqual(['packages/kernel/src/adapters/flatbush.ts']);
  });

  it('every sort in src/index/ orders by positions or face keys, save the rebuild’s internal order of item keys', () => {
    const dir = join(PLAT, 'packages/kernel/src/index');
    const sorts: string[] = [];
    for (const f of files(dir)) {
      for (const line of readFileSync(f, 'utf8').split('\n')) if (/\.sort\(/.test(line)) sorts.push(`${f.slice(dir.length + 1)}: ${line.trim()}`);
    }
    for (const s of sorts) {
      const ok = /compareVertices|keys\.sort\(\(a, b\) => a - b\)/.test(s);
      expect(ok, s).toBe(true);
    }
    expect(sorts.filter((s) => s.includes('keys.sort'))).toHaveLength(1);
  });
});
