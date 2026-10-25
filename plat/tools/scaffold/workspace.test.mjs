// The workspace tests: the engine range (C-0025), pnpm through corepack only (C-0030), exact pins (§17.4), the
// dependency placement (C-0062, C-0065), the package indexes (C-0013, C-0064, C-0112), the bench dispatcher — its map
// and owners (C-0059, C-0113, C-0115, C-0117), its shortcuts, its argument rule and its "not built" and unknown-name
// exits on fixture harnesses (C-0095) — and the TypeScript projects with what each test folder can import (C-0056,
// C-0114, C-0122, C-0124).
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { FIXTURE_HARNESSES, HARNESSES, resolveHarness, splitArgs } from '../../scripts/bench.mjs';

const root = fileURLToPath(new URL('../../', import.meta.url));
const readJson = (p) => JSON.parse(readFileSync(join(root, p), 'utf8'));
const rootPkg = readJson('package.json');

// The shipped packages in §14's order (kernel ← model ← tables ← site ← layout), written here independently of the
// lint's list.
const SHIPPED = ['kernel', 'model', 'tables', 'site', 'layout'];

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
function satisfies(version, range) {
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

/**
 * Every `pnpm` word in a command that is not run as `corepack pnpm`. Stricter than the lint's no-bare-pnpm rule, which
 * flags only a command whose first word is pnpm and skips the vendored manifests: this one flags any pnpm word and runs
 * over every PLAT manifest, the vendored ones included (C-0030).
 */
function barePnpm(command) {
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
  it('the folders the fix rounds plan exist with their index lines (C-0064, C-0112)', () => {
    for (const [p, d] of [['kernel', 'noise'], ['kernel', 'digest'], ['testkit', 'scanner'], ['kernel', 'types']]) {
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

  it('holds the fourth fix round\'s entries and owners (C-0113, C-0115, C-0117)', () => {
    expect(HARNESSES.scan).toEqual({ folder: 'scan', item: 'M0-k-06' });
    expect(HARNESSES.parity).toEqual({ folder: 'parity', item: 'M0-k-05' });
    expect(HARNESSES['baselines-check']).toEqual({ folder: 'baselines-check', item: 'M0-k-05' });
    expect(HARNESSES['timing-phase']).toEqual({ folder: 'timing-phase', item: 'M0-t-00' });
    expect(HARNESSES['bentcut-ng']).toEqual({ folder: 'bentcut-ng', item: 'M0-b-05' });
    expect(HARNESSES['fusion-ng']).toEqual({ folder: 'fusion-ng', item: 'M0-c-07' });
    for (const name of ['scan', 'parity', 'baselines-check']) {
      const r = resolveHarness(name, {});
      expect(r.ok, name).toBe(true);
      expect(r.index).toBe(join(root, 'bench', 'src', name, 'index.ts'));
    }
  });

  it('has the root shortcuts scan, parity and baselines:check over the dispatcher (C-0113)', () => {
    expect(rootPkg.scripts.scan).toBe('tsx --conditions=plat-source scripts/bench.mjs scan');
    expect(rootPkg.scripts.parity).toBe('tsx --conditions=plat-source scripts/bench.mjs parity');
    expect(rootPkg.scripts['baselines:check']).toBe('tsx --conditions=plat-source scripts/bench.mjs baselines-check');
    for (const s of ['scan', 'parity', 'baselines:check']) {
      const name = rootPkg.scripts[s].split(' ').pop();
      expect(Object.hasOwn(HARNESSES, name), s).toBe(true);
    }
  });

  it('drops one leading -- and one -- after the harness name, passing the rest unchanged', () => {
    expect(splitArgs(['--', 'baselines-check', '--', 'packages/testkit/baselines/baselines.json'])).toEqual({
      name: 'baselines-check', rest: ['packages/testkit/baselines/baselines.json'],
    });
    expect(splitArgs(['baselines-check', 'a.json'])).toEqual({ name: 'baselines-check', rest: ['a.json'] });
    expect(splitArgs(['parity', 'x', '--', 'y'])).toEqual({ name: 'parity', rest: ['x', '--', 'y'] });
    expect(splitArgs([])).toEqual({ name: undefined, rest: [] });
  });

  it('passes a shortcut\'s arguments to the harness (the fixture harness zz-echo)', () => {
    const r = run(['--', 'zz-echo', '--', 'a.json', '--flag'], FIXTURE_ROOT);
    expect(r.status).toBe(0);
    expect(r.stdout.trim()).toBe('["a.json","--flag"]');
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
    expect(Object.keys(FIXTURE_HARNESSES)).toEqual(['zz-unbuilt', 'zz-echo']);
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

// The TypeScript projects (C-0056) and what each test folder can import (C-0114, C-0122). A package's source project
// references exactly the PLAT packages its package.json depends on, and its test project those plus its own source, so
// a package's tests see their package and the ones below it (§14) and nothing else; the bench's tests see every package
// and the test kit (C-0114); the test kit's test project is the one package test project that sees the test kit's code
// and every package, so a package item's test that reads @plat/testkit code lives in
// packages/testkit/test/<package>/<item folder>/ (C-0122) and needs no configuration of its own. Nothing shipped depends
// on the test kit, and its oracle libraries resolve from the test kit alone (C-0062).
describe('the TypeScript projects and what each test folder can import (C-0056, C-0114, C-0122)', () => {
  const PROJECTS = [...SHIPPED, 'testkit', 'bench'];
  const dirOf = (p) => (p === 'bench' ? 'bench' : `packages/${p}`);
  const nameOf = (abs) => relative(root, abs).split(sep).join('/').replace(/^packages\//, '');
  /** The projects a tsconfig references, by package name ('kernel' … 'testkit', 'bench'). */
  const refsOf = (tsconfig) =>
    (readJson(tsconfig).references ?? []).map((r) => nameOf(resolve(root, dirname(tsconfig), r.path))).sort();
  /** The PLAT packages a manifest depends on, by name. */
  const platDeps = (p) => {
    const pkg = readJson(`${dirOf(p)}/package.json`);
    return Object.keys({ ...pkg.dependencies, ...pkg.devDependencies })
      .filter((d) => d.startsWith('@plat/'))
      .map((d) => d.slice('@plat/'.length))
      .sort();
  };

  it('the root builds the fourteen projects, each package\'s src and test', () => {
    const expected = PROJECTS.flatMap((p) => [dirOf(p), `${dirOf(p)}/test`]).sort();
    expect(readJson('tsconfig.json').references.map((r) => r.path).sort()).toEqual(expected);
  });

  it('each shipped package depends on the packages below it in §14\'s order, and on nothing else of PLAT\'s', () => {
    SHIPPED.forEach((p, i) => expect(platDeps(p), p).toEqual(SHIPPED.slice(0, i).sort()));
  });

  it('the test kit depends on every package, the bench on every package and the test kit; nothing shipped on the test kit', () => {
    expect(platDeps('testkit')).toEqual([...SHIPPED].sort());
    expect(platDeps('bench')).toEqual([...SHIPPED, 'testkit'].sort());
    for (const p of SHIPPED) expect(platDeps(p), p).not.toContain('testkit');
  });

  it('a source project references exactly its manifest\'s PLAT packages; its test project those and its own source', () => {
    for (const p of PROJECTS) {
      expect(refsOf(`${dirOf(p)}/tsconfig.json`), p).toEqual(platDeps(p));
      expect(refsOf(`${dirOf(p)}/test/tsconfig.json`), `${p}/test`).toEqual([...platDeps(p), p].sort());
    }
  });

  it('only the test kit\'s and the bench\'s test projects see the test kit\'s code (C-0114, C-0122)', () => {
    expect(PROJECTS.filter((p) => refsOf(`${dirOf(p)}/test/tsconfig.json`).includes('testkit'))).toEqual(['testkit', 'bench']);
  });

  it('every test project compiles its whole test/ folder, so an item\'s nested test folder needs no configuration', () => {
    for (const p of PROJECTS) {
      const t = readJson(`${dirOf(p)}/test/tsconfig.json`);
      expect(t.include, p).toEqual(['**/*', '**/*.json']);
      expect(t.exclude, p).toEqual(['fixtures/**', 'tsconfig.json']);
    }
  });

  it('vitest runs every test file under each package\'s test/ folder, nested folders included', async () => {
    const { default: config } = await import('../../vitest.config.ts');
    const byName = Object.fromEntries(config.test.projects.map((pr) => [pr.test.name, pr.test]));
    for (const p of PROJECTS) {
      expect(byName[p]?.include, p).toEqual(['test/**/*.test.ts']);
      expect(resolve(root, byName[p].root), p).toBe(resolve(root, dirOf(p)));
    }
  });

  it('the oracle libraries resolve from the test kit\'s test folders and from no other project (C-0062)', () => {
    // The node_modules walk TypeScript and Vite resolve by, from a project's test/ folder up to plat/ and never above it
    // (§17.1 (3)). Not require.resolve: under `corepack pnpm` NODE_PATH holds pnpm's hoisted store, which neither reads.
    const visible = (p, lib) => {
      for (let d = join(root, dirOf(p), 'test'); ; d = dirname(d)) {
        if (existsSync(join(d, 'node_modules', lib, 'package.json'))) return true;
        if (relative(root, d) === '') return false;
      }
    };
    for (const lib of ['polygon-clipping', 'clipper2-wasm']) {
      expect(visible('testkit', lib), lib).toBe(true);
      for (const p of [...SHIPPED, 'bench']) expect(visible(p, lib), `${p} → ${lib}`).toBe(false);
    }
  });

  it('no module folder of the test kit is named after a package, so testkit/test/<package>/ stays the package items\' (C-0122)', () => {
    const modules = readdirSync(join(root, 'packages', 'testkit', 'src'), { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
    for (const p of SHIPPED) expect(modules).not.toContain(p);
  });
});
