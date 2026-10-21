// M0-a-16's stub tests (M0-work.json: "notBuilt stubs are not callable (a type test) and are enumerated in the stub
// table"; the exit bar "the stub table equals M0.md §4b's kernel entries"; M0.md §3: "a stub is a `notBuilt('<milestone>')`
// with a choices row or a §4b entry"; C-0041, C-0089). The type test is the `@ts-expect-error` lines below: `corepack
// pnpm build` (tsc -b compiles this file) fails if a stub ever becomes callable.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { isNotBuilt, notBuilt, STUB_TABLE, type NotBuiltStub } from '../../src/facade/index.js';
import { claimSubFace } from '../../src/faces/index.js';
import { tx } from '../../src/tx/index.js';
import { framed, GROUND, kernelOver, pt, spec } from './support.js';

const PLAT = fileURLToPath(new URL('../../../../', import.meta.url));
const SRC = fileURLToPath(new URL('../../src/', import.meta.url));

/** M0.md §4b's rows: [deferred, to, hook]. */
function section4b(): string[][] {
  const md = readFileSync(`${PLAT}docs/build/M0.md`, 'utf8');
  const start = md.indexOf('## 4b Deferred');
  const end = md.indexOf('\n## 5 ', start);
  expect(start).toBeGreaterThan(0);
  expect(end).toBeGreaterThan(start);
  const rows: string[][] = [];
  for (const line of md.slice(start, end).split('\n')) {
    if (!line.startsWith('| ') || line.startsWith('| deferred |') || line.startsWith('|---')) continue;
    const cells = line.slice(2, -2).split(' | ');
    expect(cells, line).toHaveLength(3);
    rows.push(cells);
  }
  return rows;
}

/**
 * §4b's kernel entries, by their first cell verbatim — an explicit list (checks/M0-a-16-notes.md note 9): the rows whose
 * deferral is a kernel member, branch or hook — a `notBuilt` stub, a `KernelTx` field, the transient key, the pool's
 * `E_SCOPE`, the replaceable `Plat.frame`, the multi-part `PlatKey`, the kernel's `sampleProfile`, or S9's kernel op
 * (whose row holds `claimSubFace`'s score form, S7b's).
 */
const KERNEL_ROWS: readonly string[] = [
  'S7b, S9, S10 (step (0) and plots), S10b, S11, S12a–c, S13a, S14',
  'the derivation pool and overlays, pool sizes 1–3 in the contract tests (§3.3)',
  'the stretch-state profile Write protocol and its fixtures (§2.2 rule 5)',
  'clear regions, prepared contacts, carves, S1\'s water operator; the raised ways and their arena parts',
  'frame growth at an epoch (§3.2 (9))',
  'transient arenas, `readBack`, `release`, the re-cut (§3.4)',
  '`resolveVertexAt` (§3.4) — the log-position-to-vertex service',
  'the underground parts\' fixtures (item 65)',
];
/**
 * §4b's other rows — no kernel member, branch or hook — by their first cell verbatim. Every §4b row is in exactly one of
 * the two lists: a row §4b gains is in neither until it is judged, and the census below goes red, so a kernel row worded
 * any way cannot escape the stub table's equality.
 */
const OTHER_ROWS: readonly string[] = [
  'S7\'s wall strips, band, towers, gatehouses, gate plazas (§4.8)',
  'S2 roster and need propagation (§4.2 S2)',
  'S3 (1), (2), (8), (10), (11), (12)\'s market score, (13)\'s typed destinations beyond plaza and gates; polycentric forms; F-SITE\'s nuclei rungs',
  'S1 (2) coast, (4) islands, (6) harbour, (7) bank classes, the oasis, the geology flag, `Terrain.mining`',
  'the deck strip\'s geometry (S9\'s band on a span), the extra-bridge rung and the rest of F-ROUTE',
  'the `.plat` document, `zod` schemas, the unit lint (§2.9, §2.1)',
  '`plat calibrate register --check` over M0\'s calibratable cells (§16\'s preamble; V12 §3.11)',
  '§12.1\'s in-Chrome re-measure of §12.3\'s model budgets at TOWN and CITY',
  'the MFCG street-signature rows that measure lots: R4 and wall alignment as gates, lots per block (§13.5)',
  '`TradeFlow`, presets `ringed` / `american`, the suburb regime',
  'neighbour steps and `SeamContract` (II.1)',
  'the waterfront policy\'s quay-access water gates and sea gates, open chains anchored on a barrier, outer moats (§4.4); the fixed-place law at a water gate (§2.7)',
  'the later rungs of F-ROUTE (the extra bridge), F-RIVER (the centre, `no_crossing`), F-WALL (open chains, arterial diversion, posterns, the setback cut; the raised-way rung) and every §5.2 ladder of a stage M0 does not build',
  'V12\'s forms of the band rule (sign-indefinite metrics, metric floors), checks C8–C10 and the full `CrossingRecord` (§13.5, §17.1 (4))',
  '§13.8\'s nightly timing-phase contents (the cost-model sweeps with the F-WORK flatness check, the first-map runs, the in-Chrome re-measure of the model budgets, the flagged re-timing)',
  '`RH32` (§8.1), rendering, labels, exports, edits',
  '`MilestoneRecord` tooling, shift and cascade records, goldens',
  'the hosted CI configuration; the product\'s repository host',
  'the WebAssembly accelerator; the Clipper2-WASM engine',
  'B-FUZZ classes whose mechanisms land later',
  'the content scanner\'s run over `plat/` with M-1\'s deny-list and the PR tier\'s deny-list scan (§17.1 (5), §13.8)',
  'the nightly parity report and the record\'s `parity` entry (§13.5)',
  'B-EDGE\'s rows whose mechanisms land later — EP-02, EP-03 (S0), EP-07 – EP-15, EP-17 – EP-19, EP-21, EP-22, EP-24 – EP-27, EP-16\'s ring-spacing part (II.2), every combination cell outside the frame column\'s river, bridge and wall rows (§4.13, §13.2)',
  'EP-20\'s island, fjord and narrow-valley fixtures; EP-23\'s S5b / S5c part (§4.13)',
  'B-EDGE\'s rung sweep (TOWN, METROPOLIS) and preset sweep (the parity presets, each layer on and off) (§13.8)',
  'the tier runner\'s `long-batch` units partitioned finer; the 16-core tiers\' gating verdicts (§13.8)',
  'the S11 geometry bar\'s frontage-band intersection and its re-measure on B-CITY-lite\'s S11 (§3.7)',
  'the `plat` bin — one CLI for `plat parity`, `plat baselines check` and the scan (§14\'s `@plat/api` headless CLI)',
  'the cliff × frame cell\'s drawn clause ("nothing drawn beyond it", §4.13)',
  '`known-defects.json` for the descriptive ⟨M-1⟩ cells (§13.5)',
  'the PR tier\'s budget with the deny-list scan inside it, when the scan is still pending when T opens (M-1\'s list not crossed, or not yet reviewed by M0-k-07) (§13.8)',
  'the nightly\'s parity report inside a timed `tier:nightly` (§13.8)',
];

/**
 * The cross-check of the judgement: a hook cell that names a kernel mechanism. A row it selects is a kernel row (one in
 * OTHER_ROWS that names one is misjudged); a kernel row worded otherwise is held by the lists above, not by these marks.
 */
const KERNEL_MARKS = ['notBuilt', 'KernelTx', 'TransientKey', 'E_SCOPE', 'Plat.frame', 'PlatKey', 'sampleProfile', 'S9\'s kernel op'];

/** §4b's rows that are kernel entries (the explicit list), in §4b's order. */
function kernelRows(): string[][] {
  return section4b().filter((r) => KERNEL_ROWS.includes(r[0]));
}

/** The name a callee is written with: an identifier, `ns.name` or `x['name']`; '' for any other. */
function calleeName(c: ts.Expression): string {
  if (ts.isIdentifier(c)) return c.text;
  if (ts.isPropertyAccessExpression(c)) return c.name.text;
  if (ts.isElementAccessExpression(c) && ts.isStringLiteralLike(c.argumentExpression)) return c.argumentExpression.text;
  return '';
}

/** A milestone as a site names it. */
const MILESTONE = /^M[0-9A-Za-z-]+$/;

/** A refusal's text `notBuilt('<M>')`, with any of the three quotes, inside a literal. */
const REFUSAL_TEXT = /notBuilt\((['"`])(M[0-9A-Za-z-]+)\1/g;

/** A literal segment that ends where a parametrised milestone is substituted: `notBuilt('${…}`. */
const PARAM_TEXT = /notBuilt\(['"`]?$/;

/** The name a function is declared or bound under ('' for none). */
function nameOf(fn: ts.Node): string {
  if ((ts.isFunctionDeclaration(fn) || ts.isMethodDeclaration(fn)) && fn.name !== undefined) return fn.name.getText();
  if ((ts.isArrowFunction(fn) || ts.isFunctionExpression(fn)) && ts.isVariableDeclaration(fn.parent) && ts.isIdentifier(fn.parent.name)) return fn.parent.name.text;
  return '';
}

/** The helpers of one source: the functions whose template builds a `notBuilt('<milestone>')` text from a parameter. */
function refusalHelpers(file: string, text: string): string[] {
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.ES2022, true, ts.ScriptKind.TS);
  const out: string[] = [];
  const visit = (n: ts.Node): void => {
    if (ts.isTemplateExpression(n) && [n.head.text, ...n.templateSpans.map((t) => t.literal.text)].slice(0, -1).some((t) => PARAM_TEXT.test(t))) {
      let fn: ts.Node | undefined = n.parent;
      while (fn !== undefined && !ts.isFunctionLike(fn)) fn = fn.parent;
      out.push(fn === undefined ? '' : nameOf(fn));
    }
    ts.forEachChild(n, visit);
  };
  visit(sf);
  return out;
}

/**
 * One source's `notBuilt` refusal sites, each as its milestone: every call of a helper (by name, through an alias,
 * a namespace or an element access) by its first argument's literal; every literal — quoted either way or a template —
 * that holds a `notBuilt('<M>')` text with a literal milestone. A site whose milestone cannot be read — a helper called
 * with a computed milestone, a helper handed on as a value — is `?<line>`, which no table row lists (note 8).
 */
function refusalSites(file: string, text: string, helpers: ReadonlySet<string>): string[] {
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.ES2022, true, ts.ScriptKind.TS);
  const out: string[] = [];
  const local = new Set(helpers);
  const line = (n: ts.Node): number => sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1;
  const literal = (t: string): void => {
    for (const m of t.matchAll(REFUSAL_TEXT)) out.push(m[2]);
  };
  const visit = (n: ts.Node): void => {
    if (ts.isImportSpecifier(n) && helpers.has((n.propertyName ?? n.name).text)) local.add(n.name.text);
    if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) literal(n.text);
    if (ts.isTemplateExpression(n)) for (const t of [n.head.text, ...n.templateSpans.map((s) => s.literal.text)]) literal(t);
    if (ts.isCallExpression(n) && local.has(calleeName(n.expression))) {
      const a = n.arguments[0];
      out.push(a !== undefined && ts.isStringLiteralLike(a) && MILESTONE.test(a.text) ? a.text : `?${String(line(n))}`);
    }
    if (ts.isIdentifier(n) && local.has(n.text)) {
      const p = n.parent;
      const named =
        (ts.isCallExpression(p) && p.expression === n) ||
        (ts.isPropertyAccessExpression(p) && p.name === n && ts.isCallExpression(p.parent) && p.parent.expression === p) ||
        ts.isImportSpecifier(p) ||
        ts.isExportSpecifier(p) ||
        ((ts.isFunctionDeclaration(p) || ts.isVariableDeclaration(p)) && p.name === n);
      if (!named) out.push(`?${String(line(n))}`);
    }
    ts.forEachChild(n, visit);
  };
  visit(sf);
  return out;
}

/** Every .ts file under a directory. */
function sources(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir).sort()) {
    const path = `${dir}${name}`;
    if (statSync(path).isDirectory()) out.push(...sources(`${path}/`));
    else if (name.endsWith('.ts')) out.push(path);
  }
  return out;
}

describe('the notBuilt stubs are not callable (the type test)', () => {
  it('calling a stub is a type error and, through a cast, a TypeError; a stub is a frozen object', () => {
    const k = kernelOver([framed()]);
    // @ts-expect-error a notBuilt stub is not callable (M2a, C-0089)
    expect(() => k.geom.resolveVertexAt(GROUND, pt(0, 0), { v: [], e: [] }, new Map())).toThrow(TypeError);
    // @ts-expect-error a notBuilt stub is not callable (M6-P, C-0041)
    expect(() => k.geom.transientArena('building:1', [], [], 1000)).toThrow(TypeError);
    // @ts-expect-error a notBuilt stub is not callable (M6-P, C-0041)
    expect(() => k.geom.readBack({ transient: true, owner: 'building:1', n: 0 })).toThrow(TypeError);
    // @ts-expect-error a notBuilt stub is not callable (M6-P, C-0041)
    expect(() => k.geom.release({ transient: true, owner: 'building:1', n: 0 })).toThrow(TypeError);
    // @ts-expect-error the pool is M1's (§4b)
    expect(() => k.pool()).toThrow(TypeError);
    for (const s of [k.geom.resolveVertexAt, k.geom.transientArena, k.geom.readBack, k.geom.release, k.pool]) {
      expect(typeof s).toBe('object');
      expect(Object.isFrozen(s)).toBe(true);
      expect(isNotBuilt(s)).toBe(true);
    }
  });

  it('claimSubFace\'s score form is unreachable on the façade (a type error) and refused notBuilt(\'M1\') by its module', () => {
    const p = framed();
    const k = kernelOver([p]);
    const score = { areaCm2: 1e6, within: [0], score: null };
    expect(() =>
      k.tx(spec(1), (o) =>
        // @ts-expect-error the façade's claim is the ring form only; the score form is S7b's (M1)
        k.geom.claimSubFace(o, score, 'reservation:1'),
      ),
    ).toThrow(/notBuilt\('M1'\)/);
    // the module itself refuses it the same way (the stub table's `sites`)
    expect(() => tx(p, spec(1), (o) => claimSubFace(o, score, 'reservation:1'))).toThrow(/notBuilt\('M1'\)/);
  });

  it('notBuilt(milestone, member) makes a frozen, non-callable stub; isNotBuilt tells it from a function', () => {
    const s: NotBuiltStub<'M4'> = notBuilt('M4', 'frameGrowth', 'an epoch\'s frame growth');
    expect(s).toEqual({ notBuilt: 'M4', member: 'frameGrowth', why: 'an epoch\'s frame growth' });
    expect(Object.isFrozen(s)).toBe(true);
    expect(isNotBuilt(s)).toBe(true);
    expect(isNotBuilt(() => 0)).toBe(false);
    expect(isNotBuilt(null)).toBe(false);
    expect(isNotBuilt({ notBuilt: 'M1' })).toBe(false);
    expect(notBuilt('M1', 'x').why).toBe('');
  });
});

describe('the stub table equals M0.md §4b\'s kernel entries (the exit bar)', () => {
  it('every row answers a §4b row by its first cell, verbatim, whose milestone cell names the row\'s milestone', () => {
    const rows = section4b();
    for (const s of STUB_TABLE) {
      const r = rows.find((x) => x[0] === s.deferred);
      expect(r, `${s.member}: ${s.deferred}`).toBeDefined();
      expect(r?.[1], s.member).toContain(s.milestone);
    }
  });

  it('the §4b rows the table answers are exactly §4b\'s kernel entries', () => {
    const cited = [...new Set(STUB_TABLE.map((s) => s.deferred))].sort();
    const kernel = kernelRows().map((r) => r[0]).sort();
    expect(cited).toEqual(kernel);
    expect(kernel).toHaveLength(8);
  });

  it('every §4b row is judged by its first cell verbatim: a kernel entry or not, never both, none left out (an explicit list)', () => {
    const firsts = section4b().map((r) => r[0]);
    expect(new Set(firsts).size).toBe(firsts.length);
    expect(KERNEL_ROWS.filter((r) => OTHER_ROWS.includes(r))).toEqual([]);
    expect([...firsts].sort()).toEqual([...KERNEL_ROWS, ...OTHER_ROWS].sort());
    expect(kernelRows().map((r) => r[0])).toEqual(KERNEL_ROWS);
    // the marks' cross-check: no row the marks select is filed with the others
    expect(section4b().filter((r) => KERNEL_MARKS.some((m) => r[2].includes(m))).map((r) => r[0]).filter((r) => !KERNEL_ROWS.includes(r))).toEqual([]);
  });

  it('a stub row\'s member is a façade stub of its milestone; a refused row names the sites that refuse it; a hook refuses nothing', () => {
    const k = kernelOver([framed()]);
    const geom = k.geom as unknown as Record<string, unknown>;
    for (const s of STUB_TABLE) {
      if (s.form === 'stub') {
        const m = s.member.startsWith('geom.') ? geom[s.member.slice(5)] : (k as unknown as Record<string, unknown>)[s.member];
        expect(isNotBuilt(m), s.member).toBe(true);
        expect((m as NotBuiltStub).notBuilt).toBe(s.milestone);
        expect(s.sites).toEqual([]);
      } else if (s.form === 'refused') {
        expect(s.sites.length, s.member).toBeGreaterThan(0);
      } else {
        expect(s.sites).toEqual([]);
      }
      expect(Object.isFrozen(s)).toBe(true);
      for (const c of s.choices) expect(c).toMatch(/^C-\d{4}$/);
    }
    expect(Object.isFrozen(STUB_TABLE)).toBe(true);
    expect(STUB_TABLE.map((s) => s.member)).toEqual([
      'geom.transientArena', 'geom.readBack', 'geom.release', 'KernelTx.key (a TransientKey)', 'geom.resolveVertexAt', 'pool',
      'geom.claimSubFace (the score form)', 'KernelTx.clearRegion', 'KernelTx.prepared',
      'geom.sampleProfile (an Order-valued stretch-state profile)', 'Plat.frame (replaceable)', 'PlatKey.part (multi-part arenas)',
    ]);
  });

  it('every notBuilt(\'…\') the kernel\'s sources throw is a refused row\'s site with its milestone, and every site throws it', () => {
    const thrown = new Set<string>();
    const files = sources(SRC)
      .map((file) => ({ rel: file.slice(SRC.length), text: readFileSync(file, 'utf8') }))
      .filter((f) => !f.rel.startsWith('facade/'));
    const helpers = new Set(files.flatMap((f) => refusalHelpers(f.rel, f.text)));
    // today's helpers: tx/state.ts's and insert/classes.ts's notBuilt(milestone, what)
    expect([...helpers]).toEqual(['notBuilt']);
    for (const f of files) for (const m of refusalSites(f.rel, f.text, helpers)) thrown.add(`${f.rel} ${m}`);
    const listed = new Set<string>();
    for (const s of STUB_TABLE) for (const site of s.sites) listed.add(`${site} ${s.milestone}`);
    expect([...thrown].sort()).toEqual([...listed].sort());
    expect(thrown.size).toBeGreaterThanOrEqual(5);
  });
});

describe('the notBuilt site census reads every form (checks/M0-a-16-notes.md note 8)', () => {
  it('a helper call quoted either way or as a template, an aliased or namespaced call, a refusal text in any literal, and a new helper are sites; a computed milestone or a helper handed on is unreadable', () => {
    const planted = [
      "import { notBuilt as nb } from './state.js';",
      "import * as st from './state.js';",
      "export function a(): never { return notBuilt('M1', 'single'); }",
      'export function b(): never { return notBuilt("M2a", "double"); }',
      'export function c(): never { return notBuilt(`M2b`, `template`); }',
      "export function d(): never { return nb('M3a', 'alias'); }",
      "export function e(): never { return st.notBuilt('M4', 'namespace'); }",
      "export function f(): never { throw new Error(\"notBuilt('M6-P'): a refusal in a double-quoted literal\"); }",
      'export function g(w: string): never { throw new Error(`notBuilt("M6-U"): ${w}`); }',
      "export function refuse(milestone: string, what: string): never { throw new Error(`notBuilt('${milestone}'): ${what}`); }",
      "export function h(): never { return refuse('M1', 'another helper'); }",
      "export function i(m: string): never { return notBuilt(m, 'computed'); }",
      'export const j = notBuilt;',
    ].join('\n');
    const helpers = new Set(['notBuilt', ...refusalHelpers('planted.ts', planted)]);
    expect([...helpers].sort()).toEqual(['notBuilt', 'refuse']);
    expect(refusalSites('planted.ts', planted, helpers)).toEqual(['M1', 'M2a', 'M2b', 'M3a', 'M4', 'M6-P', 'M6-U', 'M1', '?12', '?13']);
    // the helper's own parametrised text is no site; a comment that names a refusal is none either
    expect(refusalSites('helper.ts', "// notBuilt('M1'): a comment\nexport function notBuilt(m: string): never { throw new Error(`notBuilt('${m}')`); }", new Set(['notBuilt']))).toEqual([]);
  });
});

describe('the refused branches refuse through the façade (notBuilt at run time)', () => {
  it('a transient arena\'s key: tx, view, pointLocate, faceNeighbours and plat refuse notBuilt(\'M6-P\'); the arena is untouched', () => {
    const p = framed();
    const k = kernelOver([p]);
    const tk = { transient: true as const, owner: 'building:1', n: 0 };
    const before = p.version;
    expect(() => k.tx(spec(0, { key: tk }), () => ({ ok: true, value: 0, warnings: [] }))).toThrow(/notBuilt\('M6-P'\)/);
    expect(() => k.view(tk, 0)).toThrow(/notBuilt\('M6-P'\)/);
    expect(() => k.geom.pointLocate(tk, 0, pt(10, 10))).toThrow(/notBuilt\('M6-P'\)/);
    expect(() => k.geom.faceNeighbours(tk, 0, 0)).toThrow(/notBuilt\('M6-P'\)/);
    expect(() => k.index.pointLocate(tk, 0, pt(10, 10))).toThrow(/notBuilt\('M6-P'\)/);
    // @ts-expect-error plat(key) takes a PlatKey
    expect(() => k.plat(tk)).toThrow(/notBuilt\('M6-P'\)/);
    expect(p.version).toBe(before);
  });

  it('a clear-region batch and prepared contacts refuse notBuilt(\'M3a\') through kernel.tx; the arena is untouched', () => {
    const p = framed();
    const k = kernelOver([p]);
    const ring = [pt(100, 100), pt(900, 100), pt(900, 900)];
    const v = p.version;
    expect(() => k.tx(spec(1, { clearRegion: [ring] }), () => ({ ok: true, value: 0, warnings: [] }))).toThrow(/notBuilt\('M3a'\)/);
    expect(() => k.tx(spec(1, { prepared: [] }), () => ({ ok: true, value: 0, warnings: [] }))).toThrow(/notBuilt\('M3a'\)/);
    expect(p.version).toBe(v);
  });
});
