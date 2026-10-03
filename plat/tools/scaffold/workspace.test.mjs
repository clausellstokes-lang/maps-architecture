// M0-s-01's workspace tests: the engine range (C-0025), pnpm through corepack only (C-0030), exact pins (§17.4), the
// dependency placement of the fix round (C-0062, C-0065), the package indexes (C-0013, C-0064) and the bench
// dispatcher — its map, and its "not built" and unknown-name exits proven on a fixture harness (C-0059, C-0095).
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { FIXTURE_HARNESSES, HARNESSES, resolveHarness } from '../../scripts/bench.mjs';

const root = fileURLToPath(new URL('../../', import.meta.url));
const readJson = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const rootPkg = readJson('package.json');

/** All of PLAT's own package.json files (vendored ones included), as paths relative to plat/. */
function manifests() {
  const out = ['package.json', 'bench/package.json'];
  for (const d of readdirSync(join(root, 'packages')).sort()) out.push(`packages/${d}/package.json`);
  for (const d of readdirSync(join(root, 'vendor')).sort()) {
    if (existsSync(join(root, 'vendor', d, 'package.json'))) out.push(`vendor/${d}/package.json`);
  }
  return out;
}

/** Does a version satisfy a range of space-joined comparators (>=, >, <=, <, =)? Enough for `engines`. */
export function satisfies(version, range) {
  const v = version.replace(/^v/, '').split('.').map(Number);
  const cmp = (a, b) => {
    for (let i = 0; i < 3; i += 1) if ((a[i] ?? 0) !== (b[i] ?? 0)) return (a[i] ?? 0) < (b[i] ?? 0) ? -1 : 1;
    return 0;
  };
  return range.trim().split(/\s+/).every((c) => {
    const m = /^(>=|<=|>|<|=)?(\d+(?:\.\d+){0,2})$/.exec(c);
    if (!m) throw new Error(`unsupported comparator ${c}`);
    const r = cmp(v, m[2].split('.').map(Number));
    switch (m[1] ?? '=') {
      case '>=': return r >= 0;
      case '>': return r > 0;
      case '<=': return r <= 0;
      case '<': return r < 0;
      default: return r === 0;
    }
  });
}

/** Every `pnpm` word in a command that is not run as `corepack pnpm`. */
export function barePnpm(command) {
  const hits = [];
  const re = /(^|[^\w@/.-])pnpm(?![\w-])/g;
  let m;
  while ((m = re.exec(command)) !== null) {
    const before = command.slice(0, m.index + m[1].length);
    if (!/(^|[\s;&|(])corepack\s+$/.test(before)) hits.push(m.index);
  }
  return hits;
}

describe('engines (C-0025)', () => {
  const range = rootPkg.engines.node;
  it('pins Node 24 LTS from 24.12.0', () => expect(range).toBe('>=24.12.0 <25'));
  it('refuses 22.x and 25.x, accepts 24.12.0 and later 24.x', () => {
    expect(satisfies('22.22.0', range)).toBe(false);
    expect(satisfies('24.11.1', range)).toBe(false);
    expect(satisfies('25.0.0', range)).toBe(false);
    expect(satisfies('24.12.0', range)).toBe(true);
    expect(satisfies('24.13.1', range)).toBe(true);
  });
  it('is satisfied by this Node, and the install enforces it', () => {
    expect(satisfies(process.versions.node, range)).toBe(true);
    const npmrc = readFileSync(join(root, '.npmrc'), 'utf8').split('\n');
    expect(npmrc).toContain('engine-strict=true');
    expect(npmrc).toContain('strict-peer-dependencies=true');
    expect(npmrc).toContain('shamefully-hoist=false');
  });
});

describe('pnpm through corepack only (C-0030)', () => {
  it('pins pnpm exactly', () => expect(rootPkg.packageManager).toBe('pnpm@10.34.6'));
  it('the detector flags a bare pnpm and passes corepack pnpm', () => {
    expect(barePnpm('pnpm test')).toEqual([0]);
    expect(barePnpm('vitest run && pnpm -r build')).not.toEqual([]);
    expect(barePnpm('corepack pnpm test')).toEqual([]);
    expect(barePnpm('FOO=1 corepack pnpm install --frozen-lockfile')).toEqual([]);
    expect(barePnpm('node scripts/pnpm-free.mjs')).toEqual([]);
  });
  it('no script of any PLAT package.json calls a bare pnpm', () => {
    const offenders = [];
    for (const m of manifests()) {
      for (const [name, cmd] of Object.entries(readJson(m).scripts ?? {})) {
        if (barePnpm(cmd).length > 0) offenders.push(`${m} scripts.${name}: ${cmd}`);
      }
    }
    expect(offenders).toEqual([]);
  });
  it('defines no install lifecycle script (it would re-enter the install)', () => {
    for (const hook of ['preinstall', 'install', 'postinstall', 'prepare']) expect(rootPkg.scripts[hook]).toBeUndefined();
    expect(rootPkg.scripts['install:frozen']).toBe('PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 corepack pnpm install --frozen-lockfile');
  });
});

describe('exact pins (§17.4)', () => {
  it('every third-party dependency is an exact version; workspace links are workspace:', () => {
    const loose = [];
    for (const m of manifests()) {
      const pkg = readJson(m);
      for (const field of ['dependencies', 'devDependencies', 'optionalDependencies', 'peerDependencies']) {
        for (const [dep, v] of Object.entries(pkg[field] ?? {})) {
          if (!/^\d+\.\d+\.\d+$/.test(v) && !/^workspace:(\*|\d+\.\d+\.\d+)$/.test(v)) loose.push(`${m} ${field}.${dep}@${v}`);
        }
      }
    }
    expect(loose).toEqual([]);
  });
  it('the lockfile is on disk', () => expect(existsSync(join(root, 'pnpm-lock.yaml'))).toBe(true));
});

describe('dependency placement (the scaffold fix round: C-0062, C-0065)', () => {
  const SHIPPED = ['kernel', 'model', 'tables', 'site', 'layout'];
  const DEV_ONLY = ['clipper2-wasm', 'polygon-clipping', 'fast-check', 'playwright-core', 'vitest', 'typescript', 'tsx'];
  const thirdParty = (deps) => Object.keys(deps ?? {}).filter((d) => !d.startsWith('@plat/'));

  it("@plat/testkit's oracles and tools are devDependencies; it has no runtime third-party dependency (§3.7)", () => {
    const pkg = readJson('packages/testkit/package.json');
    expect(thirdParty(pkg.dependencies)).toEqual([]);
    expect(Object.keys(pkg.devDependencies ?? {}).sort()).toEqual(
      ['clipper2-wasm', 'fast-check', 'playwright-core', 'polygon-clipping'],
    );
  });

  it('noise is the kernel\'s: @plat/kernel depends on simplex-noise and no other package does (§14)', () => {
    expect(readJson('packages/kernel/package.json').dependencies['simplex-noise']).toBe('workspace:4.0.3');
    for (const p of ['model', 'tables', 'site', 'layout', 'testkit']) {
      const pkg = readJson(`packages/${p}/package.json`);
      expect(pkg.dependencies?.['simplex-noise']).toBeUndefined();
    }
  });

  it('no shipped package lists a dev-only library, and the shipped ones depend only on vendored workspace members', () => {
    for (const p of SHIPPED) {
      const pkg = readJson(`packages/${p}/package.json`);
      expect(pkg.devDependencies).toBeUndefined();
      for (const d of thirdParty(pkg.dependencies)) {
        expect(DEV_ONLY).not.toContain(d);
        expect(pkg.dependencies[d]).toMatch(/^workspace:\d+\.\d+\.\d+$/);
      }
    }
  });
});

describe('package indexes (C-0013, C-0064)', () => {
  for (const p of readdirSync(join(root, 'packages')).sort()) {
    it(`@plat/${p}'s index re-exports each module folder and nothing else`, () => {
      const src = join(root, 'packages', p, 'src');
      const index = readFileSync(join(src, 'index.ts'), 'utf8');
      const folders = readdirSync(src, { withFileTypes: true }).filter((d) => d.isDirectory() && d.name !== 'adapters');
      expect(folders.length).toBeGreaterThan(0);
      for (const d of folders) {
        expect(existsSync(join(src, d.name, 'index.ts'))).toBe(true);
        expect(index).toContain(`export * from './${d.name}/index.js';`);
      }
      const code = index.split('\n').filter((l) => l.trim() !== '' && !l.trim().startsWith('//'));
      const expected = folders.map((d) => `export * from './${d.name}/index.js';`);
      expect([...code].sort()).toEqual([...expected].sort());
    });
  }
  it('the folders the fix round plans exist with their index lines (C-0064)', () => {
    for (const [p, d] of [['kernel', 'noise'], ['kernel', 'digest'], ['testkit', 'scanner']]) {
      expect(existsSync(join(root, 'packages', p, 'src', d, 'index.ts'))).toBe(true);
      expect(readFileSync(join(root, 'packages', p, 'src', 'index.ts'), 'utf8')).toContain(`export * from './${d}/index.js';`);
    }
  });
});

// The dispatcher is proven on the fixture harness only (C-0095): a real harness is never spawned here, because its
// owner's landing would turn a "not built" assertion red (calibrate, M0-f-01) and tier:pr would re-enter vitest
// (M0-f-02a). The real map is checked statically, without loading any harness.
describe('the bench dispatcher (C-0059, C-0095)', () => {
  const FIXTURE_ROOT = join(root, 'tools', 'scaffold', 'fixtures', 'bench-root');
  const require = createRequire(import.meta.url);
  const tsxPkg = require.resolve('tsx/package.json');
  const bin = JSON.parse(readFileSync(tsxPkg, 'utf8')).bin;
  const tsx = join(tsxPkg, '..', typeof bin === 'string' ? bin : bin.tsx);
  /** Spawns the dispatcher. Refuses to run a real harness: only the fixture map or an unknown name may be spawned. */
  const run = (args, fixtureRoot) => {
    const name = args.filter((a, i) => !(i === 0 && a === '--'))[0];
    if (fixtureRoot === undefined && Object.hasOwn(HARNESSES, name)) {
      throw new Error(`the scaffold test never runs the real harness ${name} (C-0095)`);
    }
    const env = { ...process.env };
    delete env.PLAT_BENCH_FIXTURE_ROOT;
    if (fixtureRoot !== undefined) env.PLAT_BENCH_FIXTURE_ROOT = fixtureRoot;
    return spawnSync(process.execPath, [tsx, '--conditions=plat-source', 'scripts/bench.mjs', ...args], { cwd: root, encoding: 'utf8', env });
  };

  it('names a folder of bench/src/ with its index.ts and an owning item for every harness', () => {
    for (const [name, h] of Object.entries(HARNESSES)) {
      expect(h.item, name).toMatch(/^M0-[a-z]-\d\d[a-z]?$/);
      expect(existsSync(join(root, 'bench', 'src', h.folder, 'index.ts')), name).toBe(true);
    }
    expect(HARNESSES['tier:pr']).toEqual({ folder: 'tiers', item: 'M0-f-02a', args: ['pr'] });
  });

  it('resolves ladder-coverage to bench/src/ladder-coverage/, owned by M0-x-05 (C-0085, C-0095)', () => {
    expect(HARNESSES['ladder-coverage']).toEqual({ folder: 'ladder-coverage', item: 'M0-x-05' });
    const r = resolveHarness('ladder-coverage', {});
    expect(r.ok).toBe(true);
    expect(r.index).toBe(join(root, 'bench', 'src', 'ladder-coverage', 'index.ts'));
  });

  it('exits 2 with "not built: <item>" on a harness whose index exports no run (the fixture harness)', () => {
    const r = run(['zz-unbuilt'], FIXTURE_ROOT);
    expect(r.status).toBe(2);
    expect(r.stderr).toContain('not built: M0-zz-00');
    const viaDashes = run(['--', 'zz-unbuilt'], FIXTURE_ROOT);
    expect(viaDashes.status).toBe(2);
    expect(viaDashes.stderr).toContain('not built: M0-zz-00');
  });

  it('knows only the fixture map under PLAT_BENCH_FIXTURE_ROOT, so no real harness is reached from it', () => {
    expect(Object.keys(FIXTURE_HARNESSES)).toEqual(['zz-unbuilt']);
    const r = run(['calibrate'], FIXTURE_ROOT);
    expect(r.status).toBe(64);
    expect(r.stderr).toContain('unknown harness "calibrate"');
    expect(resolveHarness('zz-unbuilt', {}).ok).toBe(false); // and the fixture harness is unknown without it
  });

  it('refuses an unknown harness, an inherited object key and a fixture root outside plat/ (§17.1 (3))', () => {
    expect(run(['no-such-harness']).status).toBe(64);
    expect(resolveHarness('constructor', {}).ok).toBe(false);
    expect(resolveHarness(undefined, {}).ok).toBe(false);
    const outside = run(['zz-unbuilt'], tmpdir());
    expect(outside.status).toBe(64);
    expect(outside.stderr).toContain('resolves outside plat/');
    expect(resolveHarness('zz-unbuilt', { PLAT_BENCH_FIXTURE_ROOT: join(FIXTURE_ROOT, 'no-such-folder') }).ok).toBe(false);
  });
});
