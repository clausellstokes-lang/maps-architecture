// The notices a built package carries (the kernel reuse round, J224, line A; §17.4): fdlibm's notice survives into
// @plat/kernel's bundle as dmath's /*! */ legal comments, and every bundle's dist/ carries plat/LICENSE and
// THIRD-PARTY-NOTICES.txt, which the kernel's manifest ("files": ["dist", "API.md"]) packs with its API document. The bundle is built in memory with
// scripts/build.mjs's own options, so a change to them (legalComments 'none', say) turns this file red.
import { mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { build } from 'esbuild';
import { describe, expect, it } from 'vitest';
import { SHIPPED_NOTICES, bundleOptions, copyNotices } from '../../scripts/build.mjs';
import { PLAT_ROOT } from './closure.mjs';

const KERNEL = join(PLAT_ROOT, 'packages', 'kernel');
const DMATH = join(KERNEL, 'src', 'dmath');
const SUN_1993 = 'Copyright (C) 1993 by Sun Microsystems, Inc. All rights reserved.';
const SUN_2004 = 'Copyright (C) 2004 by Sun Microsystems, Inc. All rights reserved.';

/** dmath's source files that carry a Sun notice: [{ name, text }]. */
const sunFiles = () => readdirSync(DMATH)
  .filter((n) => n.endsWith('.ts'))
  .sort()
  .map((name) => ({ name, text: readFileSync(join(DMATH, name), 'utf8') }))
  .filter((f) => f.text.includes('Sun Microsystems'));

/** Every block comment of a text that holds `needle`, with its opening delimiter. */
const commentsHolding = (text, needle) => [...text.matchAll(/\/\*[\s\S]*?\*\//g)].map((m) => m[0]).filter((c) => c.includes(needle));

describe("fdlibm's notice in the kernel bundle", () => {
  it('opens each of the eight dmath ports with Sun\'s notice as a legal comment (/*! */), text unchanged', () => {
    const files = sunFiles();
    expect(files.map((f) => f.name)).toEqual(['atan.ts', 'exp.ts', 'k-trig.ts', 'log.ts', 'pow.ts', 'rem-pio2.ts', 'scalbn.ts', 'trig.ts']);
    for (const f of files) {
      const notices = commentsHolding(f.text, 'Sun Microsystems');
      expect(notices, f.name).toHaveLength(1);
      expect(f.text.startsWith(notices[0]), f.name).toBe(true);
      expect(notices[0].startsWith('/*!\n'), `${f.name}: Sun's notice must be a /*! */ legal comment`).toBe(true);
      expect(notices[0]).toMatch(/is preserved\.\n \* =+\n \*\/$/);
    }
  });

  it("keeps both of Sun's notices in the bundle scripts/build.mjs makes", async () => {
    const r = await build({ ...bundleOptions(KERNEL), write: false });
    const js = r.outputFiles.find((o) => o.path.endsWith('index.js')).text;
    const count = (needle) => js.split(needle).length - 1;
    const sources = sunFiles();
    const in1993 = sources.filter((f) => f.text.includes(SUN_1993)).length;
    const in2004 = sources.filter((f) => f.text.includes(SUN_2004)).length;
    expect(in1993 + in2004).toBe(8);
    expect(count(SUN_1993)).toBe(in1993);
    expect(count(SUN_2004)).toBe(in2004);
    expect(js).toContain('Permission to use, copy, modify, and distribute this\n * software is freely granted, provided that this notice\n * is preserved.');
  });
});

describe("a bundle's dist/ carries the licence and the notices", () => {
  it('copies plat/LICENSE and THIRD-PARTY-NOTICES.txt byte for byte', () => {
    expect([...SHIPPED_NOTICES]).toEqual(['LICENSE', 'THIRD-PARTY-NOTICES.txt']);
    const dir = mkdtempSync(join(tmpdir(), 'plat-shipped-'));
    try {
      const written = copyNotices(PLAT_ROOT, dir);
      expect(written).toEqual(SHIPPED_NOTICES.map((n) => join(dir, 'dist', n)));
      for (const n of SHIPPED_NOTICES) expect(readFileSync(join(dir, 'dist', n), 'utf8')).toBe(readFileSync(join(PLAT_ROOT, n), 'utf8'));
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it('refuses to build a package when a notice is missing', () => {
    const empty = mkdtempSync(join(tmpdir(), 'plat-shipped-root-'));
    const dir = mkdtempSync(join(tmpdir(), 'plat-shipped-pkg-'));
    try {
      expect(() => copyNotices(empty, dir)).toThrow(/LICENSE is missing/);
    } finally {
      rmSync(empty, { recursive: true, force: true });
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("packs dist/ whole and the API document: the kernel manifest's files list is [dist, API.md]", () => {
    const m = JSON.parse(readFileSync(join(KERNEL, 'package.json'), 'utf8'));
    expect(m.files).toEqual(['dist', 'API.md']);
    expect(readFileSync(join(KERNEL, 'API.md'), 'utf8')).toMatch(/^# @plat\/kernel — public API reference\n/);
  });
});
