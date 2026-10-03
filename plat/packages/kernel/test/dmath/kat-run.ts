// The one known-answer check of dmath (M0-d-03; C-0029, C-0135), shared by the vitest test (kat.test.ts, on the test
// runner's Node) and by kat-hosts.mjs, which bundles it and runs it on Node arm64 and on Node x64 under Rosetta 2 (the
// exit bar "known-answer tests pass on Node arm64 and under Rosetta"; vitest itself cannot start under x64 here, its
// native bundler binding being arm64-only).
import { dmath } from '../../src/dmath/index.js';
import { ARCHES, type Arch, ROUTINES, type RoutineName, VECTOR_ROOT, hexOf, matches, readCases, vectorBytes } from './vectors.js';

const call: Record<RoutineName, (a: number[]) => number> = {
  pow: (a) => dmath.pow(a[0], a[1]),
  log: (a) => dmath.log(a[0]),
  exp: (a) => dmath.exp(a[0]),
  sin: (a) => dmath.sin(a[0]),
  cos: (a) => dmath.cos(a[0]),
  atan2: (a) => dmath.atan2(a[0], a[1]),
  atan: (a) => dmath.atan(a[0]),
};

export interface KatResult {
  readonly name: RoutineName;
  readonly arch: Arch;
  readonly cases: number;
  readonly missCount: number;
  /** the first ten differing cases, each as "line n: name(args) = result, fdlibm expected" in hexadecimal */
  readonly misses: string[];
}

/** Checks one routine against one architecture's vector file. */
export function katOf(name: RoutineName, arch: Arch, root: URL = VECTOR_ROOT): KatResult {
  const arity = ROUTINES.find((r) => r.name === name)?.arity ?? 1;
  const cases = readCases(arch, name, arity, root);
  const misses: string[] = [];
  let missCount = 0;
  for (const c of cases) {
    const r = call[name](c.args);
    if (!matches(r, c.expected)) {
      missCount += 1;
      if (misses.length < 10) {
        misses.push(`line ${c.line}: ${name}(${c.args.map(hexOf).join(', ')}) = ${hexOf(r)}, fdlibm ${c.expected.toString(16).padStart(16, '0')}`);
      }
    }
  }
  return { name, arch, cases: cases.length, missCount, misses };
}

/** Are the two architectures' vector files of a routine byte-identical? */
export function setsIdentical(name: RoutineName, root: URL = VECTOR_ROOT): boolean {
  return vectorBytes('arm64', name, root).equals(vectorBytes('x86_64', name, root));
}

export interface KatReport {
  readonly host: string;
  readonly results: KatResult[];
  readonly identical: Record<RoutineName, boolean>;
  readonly ok: boolean;
}

/** Every routine against both architectures' vectors, on the running host (`process.arch`). */
export function runKat(root: URL = VECTOR_ROOT, minimum = 10_000): KatReport {
  const results: KatResult[] = [];
  const identical = {} as Record<RoutineName, boolean>;
  for (const { name } of ROUTINES) {
    identical[name] = setsIdentical(name, root);
    for (const arch of ARCHES) results.push(katOf(name, arch, root));
  }
  const ok = results.every((r) => r.missCount === 0 && r.cases >= minimum) && ROUTINES.every((r) => identical[r.name]);
  return { host: `node ${process.version} ${process.arch}`, results, identical, ok };
}
