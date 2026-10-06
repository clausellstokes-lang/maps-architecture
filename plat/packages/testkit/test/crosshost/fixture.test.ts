// The fixture loader (M0-d-06; C-0067, §17.1 (3)): the fixture, its stage table and its inputs resolve inside plat/,
// symbolic links followed; the inputs are read by the runner and handed to the legs; a malformed fixture is refused.
import { mkdirSync, mkdtempSync, realpathSync, rmSync, symlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { CROSSHOST_PLAT_ROOT, crossHostFixtureFrom, crossHostInsidePlat, loadCrossHostFixture } from '@plat/testkit';
import { KERNEL_FIXTURE_PATH } from './support.js';

const ENTRY = 'packages/testkit/test/crosshost/planted-stages.ts';
// A scratch root with a link out of it (never a link inside the shared plat/, where the lint's whole-tree path check
// of a parallel seat would see it).
const outside = mkdtempSync(join(tmpdir(), 'plat-crosshost-outside-'));
const root = mkdtempSync(join(tmpdir(), 'plat-crosshost-root-'));
mkdirSync(join(root, 'in'));
writeFileSync(join(root, 'in', 'f.json'), '{}');
writeFileSync(join(outside, 'f.json'), '{}');
symlinkSync(outside, join(root, 'in', 'out'));
afterAll(() => {
  rmSync(outside, { recursive: true, force: true });
  rmSync(root, { recursive: true, force: true });
});

describe('the fixture loader', () => {
  it('loads the kernel fixture: its entry inside plat/, its ten inputs read as text', () => {
    const f = loadCrossHostFixture(KERNEL_FIXTURE_PATH);
    expect(f.id).toBe('kernel');
    expect(f.source).toBe(KERNEL_FIXTURE_PATH);
    expect(f.entryPath.startsWith(CROSSHOST_PLAT_ROOT.replace(/\/$/, ''))).toBe(true);
    expect(f.seeds.length).toBe(16);
    expect(Object.keys(f.inputs).length).toBe(10);
    expect(f.inputs['fdlibm/pow.txt']?.split('\n').filter(Boolean).length).toBe(12381);
  });
  it('refuses a path outside plat/, absolute, missing, or reaching out through a symbolic link', () => {
    expect(() => crossHostInsidePlat('/etc/hostname', 'x')).toThrow(/absolute/);
    expect(() => crossHostInsidePlat('../README.md', 'x')).toThrow(/outside plat|does not exist/);
    expect(() => crossHostInsidePlat('no/such/file.json', 'x')).toThrow(/does not exist/);
    expect(crossHostInsidePlat('in/f.json', 'x', root)).toBe(join(realpathSync(root), 'in', 'f.json'));
    expect(() => crossHostInsidePlat('in/out/f.json', 'x', root)).toThrow(/outside plat/);
  });
  it('refuses a malformed fixture', () => {
    const ok = { id: 't', entry: ENTRY, seeds: [1], stages: ['steady'] };
    expect(crossHostFixtureFrom(ok, 't').stages).toEqual(['steady']);
    expect(() => crossHostFixtureFrom({ ...ok, extra: 1 }, 't')).toThrow(/unknown field/);
    expect(() => crossHostFixtureFrom({ ...ok, id: 'Bad Id' }, 't')).toThrow(/id/);
    expect(() => crossHostFixtureFrom({ ...ok, seeds: [] }, 't')).toThrow(/seed list is empty/);
    expect(() => crossHostFixtureFrom({ ...ok, seeds: [1, 1] }, 't')).toThrow(/twice/);
    expect(() => crossHostFixtureFrom({ ...ok, seeds: [1.5] }, 't')).toThrow(/u32/);
    expect(() => crossHostFixtureFrom({ ...ok, stages: [] }, 't')).toThrow(/stage list is empty/);
    expect(() => crossHostFixtureFrom({ ...ok, stages: ['a', 'a'] }, 't')).toThrow(/twice/);
    expect(() => crossHostFixtureFrom({ ...ok, entry: '/abs.ts' }, 't')).toThrow(/absolute/);
    expect(() => crossHostFixtureFrom({ ...ok, inputs: { a: 3 } }, 't')).toThrow(/names no path/);
    expect(() => crossHostFixtureFrom({ ...ok, inputs: { a: '../x' } }, 't')).toThrow(/outside plat|does not exist/);
    expect(() => crossHostFixtureFrom([], 't')).toThrow(/JSON object/);
  });
});
