// The validator of the build's work file docs/build/M0-work.json (checks/M0-spec-notes.md N-17; C-0122's rules V1 – V3),
// run by `corepack pnpm test` so that an edit to an item's `owns`, `dependsOn` or wave is re-checked where it lands.
// The session's validator lived in a scratchpad outside plat/; this is its port from the rules as M0.md §2 and C-0122
// state them, over the attribution tools' own reading of an owns entry and of a wave (tools/landed/landed.mjs):
//   W   every item is listed in exactly one wave, the wave its `wave` names, and `itemCount` counts the items;
//   D   every dependency is another item that lands in an earlier wave — or in the same wave when that wave's `order`
//       names it first (AFTER-M-1 (b)'s stated sequence) — and every AFTER-M-1 item depends on M0-x-01 but M0-k-07
//       (C-0121);
//   O   no two items own one path, by directory prefix, unless the later one's entry says "handed over from" an item
//       that owns it earlier (or first in its wave's order), or the earlier one is the scaffold handing over a module or
//       harness folder's index.ts (C-0013, C-0059) or a path one line of its `handsOver` names together with the
//       receiver — the line names the receiver AND the path the two own in common (the narrower of the two entries) or
//       a folder above it, as a whole path with or without `plat/` and a folder with its closing `/`, so a receiver's
//       hand-over never excuses its taking another scaffold path (checks/M0-s-01-s4.md, MW-O);
//   V1  a package item (code in kernel … layout) that depends on test-kit code owns a test folder under
//       packages/testkit/test/<its package>/ or bench/test/ and names it in its tests, and only a package item of
//       <package> owns a folder there (C-0122's reserved folders);
//   V2  a dependency's code is importable from a package the item writes or visible from a test folder it owns
//       (§14's order kernel ← model ← tables ← site ← layout; the test kit sees every package, the bench every package
//       and the test kit);
//   V3  a test-kit item named in a package item's tests is its dependency, or depends on it (the hand-off: it runs the
//       clause later).
// The scaffold (M0-s-01) is no test-kit item for V1 – V3: its test-kit files are the placeholders it hands over.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { parseOwnsEntry, wavePosition } from '../landed/landed.mjs';

const root = fileURLToPath(new URL('../../', import.meta.url));
const PACKAGES = ['kernel', 'model', 'tables', 'site', 'layout'];
const SCAFFOLD = 'M0-s-01';

/** The packages a test folder or a package's code sees: its own and the ones below it (§14; C-0056, C-0114). */
function visibleFrom(pkg) {
  const i = PACKAGES.indexOf(pkg);
  if (i >= 0) return PACKAGES.slice(0, i + 1);
  if (pkg === 'testkit') return [...PACKAGES, 'testkit'];
  if (pkg === 'bench') return [...PACKAGES, 'testkit', 'bench'];
  return [];
}

/** An item's code packages (`packages/<p>/src/…`, `bench/src/…`) and its test folders (`…/test/…`). */
function shape(item) {
  const code = new Set();
  const tests = [];
  for (const entry of item.owns ?? []) {
    for (const p of parseOwnsEntry(entry).patterns) {
      const s = p.segments;
      if (s[1] === 'packages' && s[2] !== null && s[2] !== undefined && s[3] === 'src') code.add(s[2]);
      if (s[1] === 'bench' && s[2] === 'src') code.add('bench');
      if (s[1] === 'packages' && s[2] !== null && s[2] !== undefined && s[3] === 'test') tests.push({ pkg: s[2], segments: s, folder: p.folder });
      if (s[1] === 'bench' && s[2] === 'test') tests.push({ pkg: 'bench', segments: s, folder: p.folder });
    }
  }
  return { code, tests };
}

/** Do two owns patterns own a common path (by directory prefix; `null` a wildcard segment)? */
function overlap(a, b) {
  const n = Math.min(a.segments.length, b.segments.length);
  for (let i = 0; i < n; i += 1) {
    const x = a.segments[i];
    const y = b.segments[i];
    if (x !== null && y !== null && x !== y) return false;
  }
  if (a.segments.length === b.segments.length) return true;
  return (a.segments.length < b.segments.length ? a : b).folder;
}

const mentions = (text, id) => new RegExp(`(^|[^A-Za-z0-9-])${id.replace(/[-]/g, '\\-')}($|[^A-Za-z0-9-])`).test(text);

/**
 * Does a hand-over line name a pattern's path, or a folder above it, as a whole path (with or without `plat/`; never
 * `plat/` alone; a folder written with its closing `/`, so the word "bench" in a line's prose names no `bench/`)? A
 * path through a wildcard segment is never named.
 */
function namesPathOrAbove(text, pattern) {
  for (let k = pattern.segments.length; k >= 2; k -= 1) {
    const segs = pattern.segments.slice(1, k);
    if (segs.some((s) => s === null)) continue;
    const path = segs.join('/').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const slash = k < pattern.segments.length || pattern.folder ? '/' : '';
    if (new RegExp(`(^|[\\s(,]|plat/)${path}${slash}($|[\\s),;])`).test(text)) return true;
  }
  return false;
}

/** Every rule's problem lines for a work file (empty when it holds). */
export function workProblems(work) {
  const problems = [];
  const items = work.items ?? [];
  const byId = new Map(items.map((it) => [it.id, it]));
  const pos = (it) => wavePosition(work, it.wave);
  const waveOf = (it) => (work.waves ?? []).find((w) => wavePosition(work, w.wave) === pos(it)) ?? null;
  /** Does item `a` come before item `b` in their common wave's stated order? */
  const orderedBefore = (a, b) => {
    const order = waveOf(b)?.order ?? '';
    const i = order.indexOf(a.id);
    const j = order.indexOf(b.id);
    return i >= 0 && j >= 0 && i < j;
  };

  // W: the waves.
  if (work.itemCount !== items.length) problems.push(`W itemCount ${work.itemCount} counts ${items.length} items`);
  const listed = new Map();
  for (const w of work.waves ?? []) {
    for (const id of w.items ?? []) {
      if (!byId.has(id)) problems.push(`W wave ${w.wave} lists ${id}, no item`);
      if (listed.has(id)) problems.push(`W ${id} listed in waves ${listed.get(id)} and ${w.wave}`);
      else listed.set(id, w.wave);
    }
  }
  for (const it of items) {
    if (pos(it) === null) problems.push(`W ${it.id}: wave ${it.wave} is no wave of the file`);
    else if (!listed.has(it.id)) problems.push(`W ${it.id}: listed in no wave`);
    else if (wavePosition(work, listed.get(it.id)) !== pos(it)) problems.push(`W ${it.id}: wave ${it.wave}, listed in wave ${listed.get(it.id)}`);
  }

  // D: the dependencies.
  for (const it of items) {
    for (const d of it.dependsOn ?? []) {
      const dep = byId.get(d);
      if (dep === undefined || d === it.id) {
        problems.push(`D ${it.id}: depends on ${d}, ${d === it.id ? 'itself' : 'no item'}`);
        continue;
      }
      if (pos(dep) === null || pos(it) === null) continue;
      if (pos(dep) > pos(it) || (pos(dep) === pos(it) && !orderedBefore(dep, it))) {
        problems.push(`D ${it.id} (wave ${it.wave}) depends on ${d} (wave ${dep.wave}), which lands no earlier`);
      }
    }
    if (/^AFTER-M-1/.test(String(it.wave)) && it.id !== 'M0-k-07' && !(it.dependsOn ?? []).includes('M0-x-01')) {
      problems.push(`D ${it.id} (wave ${it.wave}) does not depend on M0-x-01 (only M0-k-07 may start before it, C-0121)`);
    }
  }

  // O: one owner per path, hand-overs declared.
  const pats = items.flatMap((it) => (it.owns ?? []).flatMap((entry) => parseOwnsEntry(entry).patterns.map((p) => ({ it, entry, p }))));
  const ownsOverlapping = (it, p) => pats.some((q) => q.it === it && overlap(q.p, p));
  for (let i = 0; i < pats.length; i += 1) {
    for (let j = i + 1; j < pats.length; j += 1) {
      const [x, y] = [pats[i], pats[j]];
      if (x.it === y.it || !overlap(x.p, y.p)) continue;
      // `a` the earlier owner (by wave, then by the wave's order), `b` the later.
      const [a, b] = pos(x.it) < pos(y.it) || (pos(x.it) === pos(y.it) && orderedBefore(x.it, y.it)) ? [x, y] : [y, x];
      const from = /handed over from (M0-[a-z]-\d\d[a-z]?)/.exec(b.entry)?.[1] ?? null;
      const giver = from === null ? undefined : byId.get(from);
      const declared =
        giver !== undefined &&
        ownsOverlapping(giver, b.p) &&
        (pos(giver) < pos(b.it) || (pos(giver) === pos(b.it) && orderedBefore(giver, b.it)));
      // The path the two own in common is the narrower pattern's (both, when neither is narrower).
      const common = a.p.segments.length === b.p.segments.length ? [a.p, b.p] : [a.p.segments.length > b.p.segments.length ? a.p : b.p];
      const scaffold =
        a.it.id === SCAFFOLD && pos(a.it) < pos(b.it) &&
        (/<(module|harness)>/.test(a.entry) ||
          (a.it.handsOver ?? []).some((h) => mentions(h, b.it.id) && common.some((p) => namesPathOrAbove(h, p))));
      // A SEAM (J622): the borrowing item's entry names the lender — "(seam from M0-xx-nn: <the ruling>)" — and the lender
      // owns the overlapping path; lawful in either wave order. The lender stays the path's owner for the landed tool (no
      // hand-over): the borrower's round changes the named lines only, under the session's ruling the entry cites.
      // J627: only a LATER-wave lender is lawful — landed.mjs's ownersAt gives a path to its latest-wave owner, so a seam
      // borrowed from an EARLIER wave silently hands the lender's file to the borrower (the J620 seams did, for a-02 – a-05).
      const seamOf = (e) => /seam from (M0-[a-z]-\d\d[a-z]?)/.exec(e.entry)?.[1] ?? null;
      const lenderLater = (borrower, lender) => pos(lender) > pos(borrower) || (pos(lender) === pos(borrower) && orderedBefore(borrower, lender));
      const seamFrom = (bor, len) => seamOf(bor) === len.it.id && ownsOverlapping(len.it, bor.p);
      if ((seamFrom(x, y) && !lenderLater(x.it, y.it)) || (seamFrom(y, x) && !lenderLater(y.it, x.it))) {
        const [bor, len] = seamFrom(x, y) ? [x, y] : [y, x];
        problems.push(`O ${bor.it.id} borrows "${bor.entry.split(' (')[0]}" as a seam from ${len.it.id}, an earlier wave's item: the landed tool would hand it the lender's path (J627)`);
        continue;
      }
      const seam = seamFrom(x, y) || seamFrom(y, x);
      const sameWave = pos(a.it) === pos(b.it) && !orderedBefore(a.it, b.it);
      if (!seam && (sameWave || !(declared || scaffold))) {
        problems.push(`O ${a.it.id} (wave ${a.it.wave}) "${a.entry.split(' (')[0]}" and ${b.it.id} (wave ${b.it.wave}) "${b.entry.split(' (')[0]}" own one path, no hand-over declared`);
      }
    }
  }

  // V1 – V3: test-kit code and where an item's tests can see it (C-0122).
  const shapes = new Map(items.map((it) => [it.id, shape(it)]));
  const testkitItems = new Set(items.filter((it) => it.id !== SCAFFOLD && shapes.get(it.id).code.has('testkit')).map((it) => it.id));
  for (const it of items) {
    const { code, tests } = shapes.get(it.id);
    const testsText = JSON.stringify(it.tests ?? []);
    const packageItem = [...code].some((p) => PACKAGES.includes(p));
    for (const t of tests) {
      const s = t.segments;
      if (t.pkg === 'testkit' && PACKAGES.includes(s[4]) && s.length > 5 && !code.has(s[4])) {
        problems.push(`V1 ${it.id} owns ${s.join('/')}/, a folder reserved for a package item of ${s[4]}`);
      }
    }
    if (packageItem && it.id !== SCAFFOLD) {
      const fromTestkit = (it.dependsOn ?? []).filter((d) => testkitItems.has(d));
      if (fromTestkit.length > 0) {
        const homes = tests.filter((t) => t.pkg === 'bench' || (t.pkg === 'testkit' && code.has(t.segments[4])));
        if (homes.length === 0) {
          problems.push(`V1 ${it.id} depends on test-kit code (${fromTestkit.join(', ')}) and owns no test folder under packages/testkit/test/<its package>/ or bench/test/`);
        }
        for (const h of homes) {
          const folder = h.segments.slice(1).join('/');
          if (!testsText.includes(folder)) problems.push(`V1 ${it.id} owns ${folder}/ and its tests never name it`);
        }
      }
      for (const k of testkitItems) {
        if (k === it.id || !mentions(testsText, k)) continue;
        const handOff = (byId.get(k).dependsOn ?? []).includes(it.id);
        if (!(it.dependsOn ?? []).includes(k) && !handOff) problems.push(`V3 ${it.id}'s tests name ${k}, neither its dependency nor a hand-off to it`);
      }
    }
    if (code.size === 0 && tests.length === 0) continue;
    const sees = new Set([...[...code].flatMap(visibleFrom), ...tests.flatMap((t) => visibleFrom(t.pkg))]);
    for (const d of it.dependsOn ?? []) {
      const dep = byId.get(d);
      if (dep === undefined || d === SCAFFOLD) continue;
      const dc = [...shapes.get(d).code];
      if (dc.length > 0 && !dc.some((p) => sees.has(p))) {
        problems.push(`V2 ${it.id} depends on ${d}, whose code (${dc.join(', ')}) no package it writes and no test folder it owns can import`);
      }
    }
  }
  return problems;
}

// A small work file that holds every rule, for the planted breaks below.
const BASE = {
  itemCount: 8,
  waves: [
    { wave: 0, items: ['M0-s-01'] },
    { wave: 1, items: ['M0-a-01', 'M0-k-01'] },
    { wave: 2, items: ['M0-a-02', 'M0-e-01'] },
    { wave: 3, items: ['M0-x-01'] },
    { wave: 'AFTER-M-1 (b)', items: ['M0-b-05b', 'M0-c-07b'], order: 'run items: M0-b-05b, then M0-c-07b (cut.json\'s hand-over)' },
  ],
  items: [
    {
      id: 'M0-s-01',
      wave: 0,
      owns: [
        'plat/package.json',
        'plat/tools/vitest/',
        'plat/tools/lint/index.mjs (created as an empty plugin; passes to M0-k-01)',
        'plat/packages/*/src/<module>/index.ts (created empty; passes to the folder\'s owner)',
      ],
      handsOver: ['plat/tools/lint/index.mjs → M0-k-01 (created as the empty plugin of the lint tools)'],
      dependsOn: [],
      tests: [],
    },
    { id: 'M0-a-01', wave: 1, owns: ['plat/packages/kernel/src/num/', 'plat/packages/kernel/test/num/'], dependsOn: ['M0-s-01'], tests: ['num'] },
    { id: 'M0-k-01', wave: 1, owns: ['plat/packages/testkit/src/fuzz/', 'plat/packages/testkit/test/fuzz/', 'plat/tools/lint/'], dependsOn: ['M0-s-01'], tests: ['fuzz'] },
    {
      id: 'M0-a-02',
      wave: 2,
      owns: ['plat/packages/kernel/src/arena/', 'plat/packages/kernel/test/arena/', 'plat/packages/testkit/test/kernel/arena/'],
      dependsOn: ['M0-a-01', 'M0-k-01'],
      tests: ['the arena over M0-k-01\'s fuzz arenas (packages/testkit/test/kernel/arena/)'],
    },
    { id: 'M0-e-01', wave: 2, owns: ['plat/packages/site/src/terrain/', 'plat/packages/site/test/terrain/'], dependsOn: ['M0-a-01'], tests: ['terrain'] },
    { id: 'M0-x-01', wave: 3, owns: ['plat/docs/build/M0-record.json'], dependsOn: ['M0-a-02', 'M0-e-01'], tests: [] },
    { id: 'M0-b-05b', wave: 'AFTER-M-1 (b)', owns: ['plat/packages/tables/data/cut.json'], dependsOn: ['M0-x-01'], tests: [] },
    { id: 'M0-c-07b', wave: 'AFTER-M-1 (b)', owns: ['plat/packages/tables/data/cut.json (handed over from M0-b-05b)'], dependsOn: ['M0-x-01', 'M0-b-05b'], tests: [] },
  ],
};
const planted = (edit) => {
  const w = structuredClone(BASE);
  edit(w, (id) => w.items.find((it) => it.id === id));
  return workProblems(w);
};

describe('the M0-work.json validator (checks/M0-spec-notes.md N-17; C-0122 V1 – V3)', () => {
  it('passes the committed docs/build/M0-work.json', () => {
    const work = JSON.parse(readFileSync(join(root, 'docs', 'build', 'M0-work.json'), 'utf8'));
    expect(work.items.length).toBeGreaterThan(60);
    expect(workProblems(work)).toEqual([]);
  });

  it('passes its own small work file', () => {
    expect(workProblems(BASE)).toEqual([]);
  });

  it('W: names an item listed in another wave than its own, listed twice, or miscounted', () => {
    expect(planted((w, item) => { item('M0-e-01').wave = 1; })).toEqual([
      'W M0-e-01: wave 1, listed in wave 2',
      'D M0-e-01 (wave 1) depends on M0-a-01 (wave 1), which lands no earlier',
    ]);
    expect(planted((w) => { w.waves[2].items.push('M0-a-01'); })).toEqual(['W M0-a-01 listed in waves 1 and 2']);
    expect(planted((w) => { w.itemCount = 9; })).toEqual(['W itemCount 9 counts 8 items']);
  });

  it('D: names a dependency of a later wave, a same-wave one against the stated order, and an AFTER-M-1 item without M0-x-01', () => {
    expect(planted((w, item) => { item('M0-a-01').dependsOn.push('M0-e-01'); })).toEqual([
      'D M0-a-01 (wave 1) depends on M0-e-01 (wave 2), which lands no earlier',
      'V2 M0-a-01 depends on M0-e-01, whose code (site) no package it writes and no test folder it owns can import',
    ]);
    expect(planted((w, item) => { item('M0-b-05b').dependsOn.push('M0-c-07b'); })).toEqual([
      'D M0-b-05b (wave AFTER-M-1 (b)) depends on M0-c-07b (wave AFTER-M-1 (b)), which lands no earlier',
    ]);
    expect(planted((w, item) => { item('M0-b-05b').dependsOn = []; })).toEqual([
      'D M0-b-05b (wave AFTER-M-1 (b)) does not depend on M0-x-01 (only M0-k-07 may start before it, C-0121)',
    ]);
    expect(planted((w, item) => { item('M0-a-02').dependsOn.push('M0-zz-99'); })).toEqual(['D M0-a-02: depends on M0-zz-99, no item']);
  });

  it('O: names two owners of one path without a declared hand-over, and accepts the declared ones', () => {
    expect(planted((w, item) => { item('M0-e-01').owns.push('plat/packages/kernel/src/num/extra.ts'); })).toEqual([
      'O M0-a-01 (wave 1) "plat/packages/kernel/src/num/" and M0-e-01 (wave 2) "plat/packages/kernel/src/num/extra.ts" own one path, no hand-over declared',
    ]);
    expect(planted((w, item) => { item('M0-k-01').owns.push('plat/packages/kernel/test/num/'); })).toEqual([
      'O M0-k-01 (wave 1) "plat/packages/kernel/test/num/" and M0-a-01 (wave 1) "plat/packages/kernel/test/num/" own one path, no hand-over declared',
    ]);
    expect(planted((w, item) => { item('M0-c-07b').owns = ['plat/packages/tables/data/cut.json']; })).toHaveLength(1);
    expect(planted((w, item) => { item('M0-e-01').owns.push('plat/packages/kernel/src/num/extra.ts (handed over from M0-a-01)'); })).toEqual([]);
  });

  it('O: accepts a seam from a later wave, refuses one from an earlier wave (J627) or whose lender owns no such path', () => {
    expect(planted((w, item) => { item('M0-a-01').owns.push('plat/packages/site/src/terrain/range.ts (seam from M0-e-01: an earlier item borrowing a later one\'s file)'); })).toEqual([]);
    expect(planted((w, item) => { item('M0-e-01').owns.push('plat/packages/kernel/src/num/extra.ts (seam from M0-a-01: one door call per store site, J622)'); })).toEqual([
      'O M0-e-01 borrows "plat/packages/kernel/src/num/extra.ts" as a seam from M0-a-01, an earlier wave\'s item: the landed tool would hand it the lender\'s path (J627)',
    ]);
    expect(planted((w, item) => { item('M0-e-01').owns.push('plat/packages/kernel/src/num/extra.ts (seam from M0-k-01: a lender that owns no such path)'); })).toEqual([
      'O M0-a-01 (wave 1) "plat/packages/kernel/src/num/" and M0-e-01 (wave 2) "plat/packages/kernel/src/num/extra.ts" own one path, no hand-over declared',
    ]);
  });

  it('O: a scaffold hand-over excuses its receiver only on the path the hand-over line names (checks/M0-s-01-s4.md, MW-O)', () => {
    // The receiver of `plat/tools/lint/index.mjs` taking another scaffold path is named …
    expect(planted((w, item) => { item('M0-k-01').owns.push('plat/package.json'); })).toEqual([
      'O M0-s-01 (wave 0) "plat/package.json" and M0-k-01 (wave 1) "plat/package.json" own one path, no hand-over declared',
    ]);
    // … and so is its taking a folder above the handed path: the line names `tools/lint/index.mjs`, not `tools/` (its
    // word "tools" is prose, no folder).
    expect(planted((w, item) => { item('M0-k-01').owns.push('plat/tools/'); })).toEqual([
      'O M0-s-01 (wave 0) "plat/tools/vitest/" and M0-k-01 (wave 1) "plat/tools/" own one path, no hand-over declared',
    ]);
    // A hand-over of a folder (or of a folder inside a scaffold folder) lets its receiver take what lies in it.
    expect(planted((w, item) => {
      w.items[0].handsOver.push('plat/tools/vitest/ → M0-a-01', 'tools/vitest/fuzz/ → M0-e-01');
      item('M0-a-01').owns.push('plat/tools/vitest/setup.mjs');
      item('M0-e-01').owns.push('plat/tools/vitest/fuzz/run.mjs');
    })).toEqual([]);
    // A hand-over line naming the path but another receiver excuses no one.
    expect(planted((w) => { w.items[0].handsOver = ['plat/tools/lint/index.mjs → M0-a-01']; })).toEqual([
      'O M0-s-01 (wave 0) "plat/tools/lint/index.mjs" and M0-k-01 (wave 1) "plat/tools/lint/" own one path, no hand-over declared',
    ]);
  });

  it('V1: names a package item reading test-kit code with no test-kit folder, an unnamed folder, and a reserved folder taken', () => {
    expect(planted((w, item) => { item('M0-a-02').owns.pop(); })).toEqual([
      'V1 M0-a-02 depends on test-kit code (M0-k-01) and owns no test folder under packages/testkit/test/<its package>/ or bench/test/',
      'V2 M0-a-02 depends on M0-k-01, whose code (testkit) no package it writes and no test folder it owns can import',
    ]);
    expect(planted((w, item) => { item('M0-a-02').tests = ['the arena']; })).toEqual([
      'V1 M0-a-02 owns packages/testkit/test/kernel/arena/ and its tests never name it',
    ]);
    expect(planted((w, item) => { item('M0-e-01').owns.push('plat/packages/testkit/test/kernel/terrain/'); })).toEqual([
      'V1 M0-e-01 owns plat/packages/testkit/test/kernel/terrain/, a folder reserved for a package item of kernel',
    ]);
  });

  it('V2: names a dependency whose code the item can import from nowhere it writes', () => {
    expect(planted((w, item) => { item('M0-x-01').owns.push('plat/packages/model/src/record/'); })).toEqual([
      'V2 M0-x-01 depends on M0-e-01, whose code (site) no package it writes and no test folder it owns can import',
    ]);
  });

  it('V3: names a test-kit item a package item\'s tests rely on that is neither its dependency nor a hand-off', () => {
    expect(planted((w, item) => { item('M0-e-01').tests.push('the slopes over M0-k-01\'s arenas'); })).toEqual([
      'V3 M0-e-01\'s tests name M0-k-01, neither its dependency nor a hand-off to it',
    ]);
    expect(planted((w, item) => {
      item('M0-e-01').tests.push('the slopes, re-run by M0-k-01');
      item('M0-k-01').dependsOn.push('M0-e-01');
      item('M0-k-01').wave = 3;
      w.waves[1].items = ['M0-a-01'];
      w.waves[3].items.push('M0-k-01');
    })).toEqual(['D M0-a-02 (wave 2) depends on M0-k-01 (wave 3), which lands no earlier']); // the hand-off itself is no V3 problem
  });
});
