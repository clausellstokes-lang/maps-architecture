// M0-s-01's licence and notices tests (§17.4; C-0052, C-0058, C-0095).
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { PLAT_ROOT, checkLicences, devClosure, permitted, productionClosure, walk } from './closure.mjs';
import {
  FDLIBM_HEADING, FDLIBM_PLACEHOLDER, MURMUR3_HEADING, NOTICES_FILE, XOSHIRO_HEADING, XOSHIRO_SOURCE, fdlibmNotice,
  fdlibmState, leadingComment, normaliseNotice, noticesText, publicDomainCredits,
} from './generate.mjs';

const production = productionClosure();
const dev = devClosure(PLAT_ROOT, production);
const table = JSON.parse(readFileSync(new URL('./dev-exceptions.json', import.meta.url), 'utf8'));
const thirdParty = (m) => [...m.values()].filter((p) => !p.name.startsWith('@plat/'));

describe('the production closure', () => {
  it('is the five vendored libraries, each resolved to its vendor folder', () => {
    const libs = thirdParty(production).map((p) => `${p.name}@${p.version} ${p.licence}`).sort();
    expect(libs).toEqual([
      'delaunator@5.1.0 ISC', 'flatbush@4.6.2 ISC', 'flatqueue@3.1.0 ISC', 'robust-predicates@3.0.3 Unlicense',
      'simplex-noise@4.0.3 MIT',
    ]);
    for (const p of thirdParty(production)) expect(p.dir).toContain(`/vendor/${p.name}@${p.version}`);
  });

  it('reaches simplex-noise through @plat/kernel, where noise lives (§14, C-0065)', () => {
    const noise = thirdParty(production).find((p) => p.name === 'simplex-noise');
    expect(noise?.via).toBe('@plat/kernel@0.0.0');
  });

  it('passes the licence check; every dev exception has a written reason', () => {
    const r = checkLicences(production, dev, table);
    expect(r.failures).toEqual([]);
    expect(r.ok).toBe(true);
    expect(r.exceptions.filter((e) => e.reason === null).map((e) => e.name)).toEqual([]);
  });
});

describe('the dev closure (the scaffold fix round, C-0062)', () => {
  const TESTKIT_DEV = ['clipper2-wasm@0.4.0', 'fast-check@4.10.2', 'playwright-core@1.60.0', 'polygon-clipping@0.15.7'];

  it("holds the test kit's oracles and tools, which never enter the production closure (§3.7)", () => {
    for (const key of TESTKIT_DEV) {
      expect(dev.has(key)).toBe(true);
      expect(production.has(key)).toBe(false);
    }
  });

  it("walks a start package's devDependencies even when another start reached it first", () => {
    const startEdges = (pkg, isStart) => [
      ...Object.keys(pkg.dependencies ?? {}),
      ...(isStart ? Object.keys(pkg.devDependencies ?? {}) : []),
    ];
    // The bench is popped first and reaches the test kit through its dependencies before the test kit's own start.
    const m = walk([join(PLAT_ROOT, 'packages', 'testkit'), join(PLAT_ROOT, 'bench')], startEdges);
    for (const key of TESTKIT_DEV) expect(m.has(key)).toBe(true);
  });
});

describe('the licence checker', () => {
  const planted = { name: 'planted-gpl', version: '1.0.0', licence: 'GPL-3.0-only', dir: '/nowhere', via: 'test' };

  it('reports a planted GPL dev-only package as an exception, not a production failure', () => {
    const devPlus = new Map(dev);
    devPlus.set('planted-gpl@1.0.0', planted);
    const r = checkLicences(production, devPlus, table);
    expect(r.ok).toBe(true);
    expect(r.failures).toEqual([]);
    expect(r.exceptions.find((e) => e.name === 'planted-gpl')).toMatchObject({ licence: 'GPL-3.0-only', reason: null });
  });

  it('fails a GPL package in the production closure', () => {
    const prodPlus = new Map(production);
    prodPlus.set('planted-gpl@1.0.0', planted);
    const r = checkLicences(prodPlus, dev, table);
    expect(r.ok).toBe(false);
    expect(r.failures.map((f) => f.name)).toEqual(['planted-gpl']);
  });

  it('reads SPDX expressions', () => {
    expect(permitted('MIT')).toBe(true);
    expect(permitted('(MIT OR GPL-3.0-only)')).toBe(true);
    expect(permitted('MIT AND GPL-3.0-only')).toBe(false);
    expect(permitted('UNKNOWN')).toBe(false);
  });
});

describe('THIRD-PARTY-NOTICES.txt', () => {
  const text = noticesText(PLAT_ROOT, production);
  const committed = readFileSync(join(PLAT_ROOT, NOTICES_FILE), 'utf8');

  it('holds the five libraries and the fdlibm section', () => {
    for (const l of ['delaunator 5.1.0', 'flatbush 4.6.2', 'flatqueue 3.1.0', 'robust-predicates 3.0.3', 'simplex-noise 4.0.3']) {
      expect(committed).toContain(`\n${l}\nLicence: `);
    }
    expect(committed).toContain(`\n${FDLIBM_HEADING}\n`);
  });

  // C-0095: the placeholder until M0-d-03 adds vendor/fdlibm-5.3/NOTICE.txt and regenerates the file
  // (`corepack pnpm notices`), Sun's notice after — exactly one of the two, never both, whichever state the tree is in.
  it("holds exactly one of the fdlibm placeholder and Sun's notice, as vendor/fdlibm-5.3/NOTICE.txt's presence says", () => {
    const notice = fdlibmNotice(PLAT_ROOT);
    expect(fdlibmState(committed, notice)).toBe(notice === null ? 'placeholder' : 'notice');
  });

  it("takes Sun's notice in place of the placeholder when NOTICE.txt lands (simulated in memory)", () => {
    const without = noticesText(PLAT_ROOT, production, null);
    expect(fdlibmState(without, null)).toBe('placeholder');
    const notice = normaliseNotice('SIMULATED fdlibm NOTICE (not Sun\'s text)\r\nsecond line  \n\n');
    expect(notice).toBe('SIMULATED fdlibm NOTICE (not Sun\'s text)\nsecond line');
    const withNotice = noticesText(PLAT_ROOT, production, notice);
    expect(fdlibmState(withNotice, notice)).toBe('notice');
    expect(withNotice).not.toContain(FDLIBM_PLACEHOLDER);
    expect(withNotice).toContain(`\n${FDLIBM_HEADING}\n\n${notice}\n`);
    // only the fdlibm section changes: the libraries' part is the same text
    expect(withNotice.slice(0, withNotice.indexOf(FDLIBM_HEADING))).toBe(without.slice(0, without.indexOf(FDLIBM_HEADING)));
    // with no notice passed, the generator reads the tree: the committed state
    expect(noticesText(PLAT_ROOT, production)).toBe(noticesText(PLAT_ROOT, production, fdlibmNotice(PLAT_ROOT)));
  });

  it('refuses a notices text holding both, neither, or one of them twice', () => {
    expect(fdlibmState(`${FDLIBM_PLACEHOLDER}\nSUN`, 'SUN')).toBe('both');
    expect(fdlibmState('no fdlibm text', 'SUN')).toBe('neither');
    expect(fdlibmState('no fdlibm text', null)).toBe('neither');
    expect(fdlibmState('SUN', '')).toBe('neither'); // an empty NOTICE.txt is not a notice
    expect(fdlibmState(`${FDLIBM_PLACEHOLDER}\n${FDLIBM_PLACEHOLDER}`, null)).toBe('repeated');
    expect(fdlibmState('SUN\nSUN', 'SUN')).toBe('repeated');
    expect(fdlibmState(`x\n${FDLIBM_PLACEHOLDER}\n`, null)).toBe('placeholder');
    expect(fdlibmState('x\nSUN\n', 'SUN')).toBe('notice');
  });

  // The kernel reuse round (J224, line B; CLEAN-ROOM.md rule 7): the public-domain algorithms the kernel ports
  // (xoshiro128**, vendored C) or implements (MurmurHash3) are credited after fdlibm, the dedication read from the C.
  it('credits xoshiro128** with its authors\' dedication and MurmurHash3, after the fdlibm section', () => {
    const rule = '='.repeat(78);
    const iF = committed.indexOf(`\n${FDLIBM_HEADING}\n`);
    const iX = committed.indexOf(`${rule}\n${XOSHIRO_HEADING}\n\n`);
    const iM = committed.indexOf(`${rule}\n${MURMUR3_HEADING}\n\n`);
    expect(iF).toBeGreaterThan(0);
    expect(iX).toBeGreaterThan(iF);
    expect(iM).toBeGreaterThan(iX);
    const dedication = leadingComment(readFileSync(join(PLAT_ROOT, XOSHIRO_SOURCE), 'utf8'));
    expect(dedication).toMatch(/^Written in 2018 by David Blackman and Sebastiano Vigna/);
    expect(dedication).toContain('dedicated all copyright\nand related and neighboring rights to this software to the public domain');
    expect(committed.slice(iX, iM)).toContain(`\n\n${dedication}\n`);
    expect(committed.slice(iM)).toMatch(/Austin Appleby[\s\S]*public domain[\s\S]*src\/hash\/murmur3\.ts/);
    for (const credit of [XOSHIRO_HEADING, MURMUR3_HEADING]) expect(committed.split(credit).length - 1).toBe(1);
  });

  it('reads a C file\'s leading comment, and refuses to drop a credit whose source is gone', () => {
    expect(leadingComment('  /*  A\r\n  B  \r\n*/\nint x; /* later */')).toBe('A\n  B');
    expect(leadingComment('int x; /* not leading */')).toBeNull();
    const empty = mkdtempSync(join(tmpdir(), 'plat-notices-'));
    try {
      expect(() => publicDomainCredits(empty)).toThrow(/vendor\/xoshiro\/xoshiro128starstar\.c is missing/);
    } finally {
      rmSync(empty, { recursive: true, force: true });
    }
    expect(publicDomainCredits(PLAT_ROOT).map((c) => c.heading)).toEqual([XOSHIRO_HEADING, MURMUR3_HEADING]);
  });

  it('is committed as generated', () => {
    expect(committed).toBe(text);
  });
});
