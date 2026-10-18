// The flatbush patch (C-0152; §6.5 (3) – (4); closes C-0126 (5)): `_collectContained` (reached from `search`) computed
// `this.nodeSize ** level`; vendor/patches/flatbush@4.6.2.json makes it the node size to the power `level` by exact
// repeated multiplication, in both builds. These tests hold the patch's two promises.
//   (1) It changes nothing else: the spec replayed on the unpatched bytes — the vendored scan's fixture copy, equal to
//       the lock's pre-patch hashes — gives exactly the vendored bytes of index.js and flatbush.js.
//   (2) It computes the same thing: a seeded, deterministic property over random trees of several node sizes and
//       depths — the patched ESM build as imported (the bytes that run), and the patched ESM and UMD texts, return the
//       same ids in the same order as the unpatched ESM and UMD builds, and the same set as a brute-force box filter,
//       with and without a filter function; each case's queries reach `_collectContained` at every level from 0 to
//       the deepest below the root. Deterministic deep trees reach level 15 (node size 2), 9 (3) and 4 (16), the
//       first two and the last with 32-bit indices.
// The unpatched module is compiled from the fixture text, never fetched (nothing touches the network at test time).
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { compileFunction } from 'node:vm';
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import FlatQueue from '../../vendor/flatqueue@3.1.0/index.js';
import FlatbushImported from '../../vendor/flatbush@4.6.2/index.js';
import { PLAT_ROOT, VENDOR_DIR, countOf, readJson } from './common.mjs';

const KEY = 'flatbush@4.6.2';
const LIB = join(VENDOR_DIR, KEY);
const UNPATCHED = join(PLAT_ROOT, 'tools', 'lint', 'fixtures', 'vendor-scan', `${KEY}-unpatched`);
const lock = readJson(join(VENDOR_DIR, 'vendor.lock.json')).libraries[KEY];
const spec = readJson(join(VENDOR_DIR, 'patches', `${KEY}.json`));
const BUILDS = ['index.js', 'flatbush.js'];
const POWER = 'this.nodeSize ** level';
/** The fast-check seed and case count of the property: fixed, so every run checks the same trees. */
const SEED = 0x5eed_c152;
const RUNS = 400;
/** Explicit headroom for the property and the deep trees on a shared machine — never a timing (C-0128 (6)). */
const HEADROOM = 120_000;

const text = (dir, file) => readFileSync(join(dir, file), 'utf8');
const sha256 = (s) => createHash('sha256').update(s, 'utf8').digest('hex');

function once(src, needle, what) {
  const n = countOf(src, needle);
  if (n !== 1) throw new Error(`${what}: expected one ${JSON.stringify(needle)}, found ${n}`);
}

/** The ESM build's class from its text: its one import becomes a parameter, its default export the return value. */
function fromEsm(src, what) {
  const IMPORT = "import FlatQueue from 'flatqueue';\n";
  const EXPORT = 'export default class Flatbush {';
  once(src, IMPORT, what);
  once(src, EXPORT, what);
  const body = `${src.replace(IMPORT, '').replace(EXPORT, 'class Flatbush {')}\nreturn Flatbush;\n`;
  return compileFunction(body, ['FlatQueue'])(FlatQueue);
}

/** The UMD build's class: its CommonJS branch, run with a module object (it bundles its own queue). */
function fromUmd(src) {
  const module = { exports: {} };
  compileFunction(src, ['module', 'exports'])(module, module.exports);
  return module.exports;
}

/** A copy of a class whose `_collectContained` records each level it is handed into `seen`. */
function counting(Base, seen) {
  return class extends Base {
    _collectContained(nodeIndex, end, level, numItems4, results, filterFn) {
      seen.add(level);
      return super._collectContained(nodeIndex, end, level, numItems4, results, filterFn);
    }
  };
}

const unpatched = {
  esm: fromEsm(text(UNPATCHED, 'index.js'), 'unpatched index.js'),
  umd: fromUmd(text(UNPATCHED, 'flatbush.js')),
};
const patchedEsm = fromEsm(text(LIB, 'index.js'), 'patched index.js');
const patchedUmd = fromUmd(text(LIB, 'flatbush.js'));

/** A small seeded generator (mulberry32) for the boxes and queries of one case. */
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Item boxes on a 1/8 grid (touching and equal edges occur; some boxes are points). */
function makeBoxes(n, seed) {
  const r = rng(seed);
  const span = 64 + Math.floor(r() * 4096);
  const boxes = [];
  for (let i = 0; i < n; i += 1) {
    const x = Math.floor(r() * span * 8) / 8;
    const y = Math.floor(r() * span * 8) / 8;
    const w = r() < 0.15 ? 0 : Math.floor(r() * 64 * 8) / 8;
    const h = r() < 0.15 ? 0 : Math.floor(r() * 64 * 8) / 8;
    boxes.push([x, y, x + w, y + h]);
  }
  return boxes;
}

function build(Class, nodeSize, boxes) {
  const index = new Class(boxes.length, nodeSize);
  for (const [x0, y0, x1, y1] of boxes) index.add(x0, y0, x1, y1);
  index.finish();
  return index;
}

/** The ids whose box meets or touches the query, ascending — the brute-force filter. */
function bruteForce(boxes, [minX, minY, maxX, maxY], keep) {
  const out = [];
  boxes.forEach(([x0, y0, x1, y1], i) => {
    if (maxX < x0 || maxY < y0 || minX > x1 || minY > y1) return;
    if (keep === undefined || keep(i)) out.push(i);
  });
  return out;
}

const keepSome = (i) => i % 3 !== 1;

/**
 * Queries that hand `_collectContained` every level below the root: for each level k ≥ 1 below the root, the box of
 * one level-k node that is strictly smaller than its parent's (so the node, not its parent, is the contained one, and
 * `_collectContained` is handed level k − 1); the root's box (level root − 1); and random boxes of every size.
 */
function queriesFor(index, boxes, seed) {
  const { _boxes: b, _indices: idx, _levelBounds: bounds, nodeSize } = index;
  const root = bounds.length - 1;
  const box = (p) => [b[p], b[p + 1], b[p + 2], b[p + 3]];
  const same = (p, q) => b[p] === b[q] && b[p + 1] === b[q + 1] && b[p + 2] === b[q + 2] && b[p + 3] === b[q + 3];
  const queries = [];
  for (let k = 1; k < root; k += 1) {
    let found = null;
    for (let parent = bounds[k]; parent < bounds[k + 1] && found === null; parent += 4) {
      const first = idx[parent >> 2];
      const end = Math.min(first + nodeSize * 4, bounds[k]);
      for (let child = first; child < end; child += 4) {
        if (!same(child, parent)) {
          found = child;
          break;
        }
      }
    }
    if (found !== null) queries.push(box(found));
  }
  queries.push(box(b.length - 4));
  const r = rng(seed ^ 0x9e3779b9);
  const [mx0, my0, mx1, my1] = box(b.length - 4);
  const w = mx1 - mx0 || 1;
  const h = my1 - my0 || 1;
  for (const scale of [0, 0.01, 0.05, 0.2, 0.5, 1.2]) {
    const qx = mx0 - 0.1 * w + r() * 1.2 * w;
    const qy = my0 - 0.1 * h + r() * 1.2 * h;
    queries.push([qx, qy, qx + scale * w * r(), qy + scale * h * r()]);
  }
  if (boxes.length > 0) queries.push([...boxes[Math.floor(r() * boxes.length)]]);
  return { queries, root };
}

/**
 * Runs one case: every build answers every query alike. Returns the levels `_collectContained` was handed by the
 * patched texts (ESM and UMD) and the root's level.
 */
function checkCase(nodeSize, n, seed) {
  const boxes = makeBoxes(n, seed);
  const seenEsm = new Set();
  const seenUmd = new Set();
  const trees = {
    imported: build(FlatbushImported, nodeSize, boxes),
    esm: build(counting(patchedEsm, seenEsm), nodeSize, boxes),
    umd: build(counting(patchedUmd, seenUmd), nodeSize, boxes),
    oldEsm: build(unpatched.esm, nodeSize, boxes),
    oldUmd: build(unpatched.umd, nodeSize, boxes),
  };
  const { queries, root } = queriesFor(trees.esm, boxes, seed);
  for (const q of queries) {
    for (const keep of [undefined, keepSome]) {
      const filterFn = keep === undefined ? undefined : (i) => keep(i);
      const want = trees.oldEsm.search(...q, filterFn);
      expect(trees.oldUmd.search(...q, filterFn)).toEqual(want);
      for (const name of ['imported', 'esm', 'umd']) expect(trees[name].search(...q, filterFn), `${name} ${q}`).toEqual(want);
      expect([...want].sort((a, b) => a - b)).toEqual(bruteForce(boxes, q, keep));
    }
  }
  return { seenEsm, seenUmd, root };
}

const levelsBelow = (root) => Array.from({ length: root }, (_, l) => l);
const sorted = (set) => [...set].sort((a, b) => a - b);

describe('the flatbush patch (C-0152)', () => {
  it('is the lock\'s patch, and the unpatched fixture copy is the lock\'s pre-patch bytes', () => {
    expect(lock.patch).toBe(`patches/${KEY}.json`);
    expect(spec.library).toBe(KEY);
    expect(spec.choice).toBe('C-0152');
    for (const f of BUILDS) expect(sha256(text(UNPATCHED, f)), f).toBe(lock.original[f]);
  });

  it('replaced exactly the power, once per build, and changed nothing else (the spec replayed on the unpatched bytes)', () => {
    expect(spec.edits.map((e) => e.file).sort()).toEqual([...BUILDS].sort());
    for (const e of spec.edits) {
      expect(e.count).toBe(1);
      expect(countOf(e.find, POWER)).toBe(1);
      expect(e.replace).not.toContain('**');
      expect(e.replace).toContain('scale *= this.nodeSize;');
      const before = text(UNPATCHED, e.file);
      expect(countOf(before, POWER), `${e.file}: one power before`).toBe(1);
      expect(countOf(before, e.find)).toBe(1);
      const after = before.split(e.find).join(e.replace);
      expect(sha256(after), `${e.file}: the replayed bytes are the vendored bytes`).toBe(lock.files[e.file]);
      expect(text(LIB, e.file)).toBe(after);
      expect(countOf(after, '**')).toBe(countOf(before, '**') - 1); // the other `**` are JSDoc openers
      // Line by line: the one line holding the power became three — the marker with `scale = 1`, the loop, and the same
      // line with `scale` for the power, at its indentation — and every other line is as it was.
      const was = before.split('\n');
      const now = after.split('\n');
      const i = was.findIndex((l) => l.includes(POWER));
      const indent = /^\s*/.exec(was[i])[0];
      expect(now.slice(0, i)).toEqual(was.slice(0, i));
      expect(now.slice(i + 3)).toEqual(was.slice(i + 1));
      expect(now[i]).toMatch(new RegExp(`^${indent}let scale = 1; // PLAT patch \\(choices C-0152\\)[^*]*$`));
      expect(now[i + 1]).toBe(`${indent}for (let l = level; l > 0; l--) scale *= this.nodeSize;`);
      expect(now[i + 2]).toBe(was[i].replace(POWER, 'scale'));
    }
    // Every other vendored file kept the tarball's bytes (package.json's edits are C-0055's, not the patch's).
    expect(Object.keys(lock.original).sort()).toEqual(['flatbush.js', 'index.js', 'package.json']);
  });

  it('the imported module is the patched ESM text', () => {
    expect(text(LIB, 'index.js')).not.toContain(POWER);
    const index = build(FlatbushImported, 2, makeBoxes(40, 7));
    expect(Object.getPrototypeOf(index)._collectContained.toString()).toContain('scale *= this.nodeSize');
  });

  it('answers every search like the unpatched builds and a brute-force filter, at every level below the root (seeded property)', () => {
    const reached = new Map();
    fc.assert(
      fc.property(fc.integer({ min: 2, max: 16 }), fc.integer({ min: 1, max: 1500 }), fc.integer(), (nodeSize, n, seed) => {
        const { seenEsm, seenUmd, root } = checkCase(nodeSize, n, seed);
        expect(sorted(seenEsm)).toEqual(levelsBelow(root));
        expect(sorted(seenUmd)).toEqual(levelsBelow(root));
        reached.set(nodeSize, Math.max(reached.get(nodeSize) ?? 0, root - 1));
      }),
      { seed: SEED, numRuns: RUNS },
    );
    // Every node size 2 – 16 was drawn, and the deepest level reached grows as the node size falls.
    expect([...reached.keys()].sort((a, b) => a - b)).toEqual(Array.from({ length: 15 }, (_, i) => i + 2));
    expect(reached.get(2)).toBeGreaterThanOrEqual(8);
    expect(reached.get(16)).toBeGreaterThanOrEqual(1);
  }, HEADROOM);

  it.each([
    [2, 32_773, 15],
    [3, 19_684, 9],
    [16, 70_001, 4],
  ])('answers alike on a deep tree: node size %i, %i items, every level 0 – %i handed to _collectContained', (nodeSize, n, deepest) => {
    const { seenEsm, seenUmd, root } = checkCase(nodeSize, n, 0xc152 + nodeSize);
    expect(root - 1).toBe(deepest);
    expect(sorted(seenEsm)).toEqual(levelsBelow(root));
    expect(sorted(seenUmd)).toEqual(levelsBelow(root));
  }, HEADROOM);
});
