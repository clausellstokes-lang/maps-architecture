// M0-a-04's checker line "confirms every distance test uses + − × ÷ √ only" (§3.2 (3)), held by a scan of the item's
// sources: no Math member but the determinism allowlist's exact ones (§6.5 (3)), no `**`, no float comparison with
// `== 0` on a computed distance, and every division through ratio() or by a literal (the lint's ratio-division rule
// covers the last; this scan pins the item's own files whatever the lint's configuration).
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const FILES = ['classes.ts', 'decimate.ts', 'attractVertex.ts', 'placement.ts', 'splitThrough.ts'];
const src = (f: string): string => readFileSync(new URL(`../../../src/insert/${f}`, import.meta.url), 'utf8');
/** The code without comments (line and block) and string literals, so prose naming a function is not a use. */
const code = (s: string): string => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '').replace(/'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/g, "''");

describe('the step-1–2 sources use + − × ÷ √ only for distances (§3.2 (3))', () => {
  for (const f of FILES) {
    it(`${f}: Math members only abs floor ceil round sign min max sqrt; no exponent operator; no hypot`, () => {
      const c = code(src(f));
      const members = [...c.matchAll(/Math\.([A-Za-z0-9_]+)/g)].map((m) => m[1]);
      for (const m of members) expect(['abs', 'floor', 'ceil', 'round', 'sign', 'min', 'max', 'sqrt', 'SQRT2']).toContain(m);
      expect(c).not.toMatch(/\*\*/);
      expect(c).not.toMatch(/hypot|atan|cos\(|sin\(|pow\(|exp\(|log\(/);
    });
  }

  it('every division in the sources is by a literal or a named constant of one, or through ratio()', () => {
    for (const f of FILES) {
      const c = code(src(f));
      for (const m of c.matchAll(/[^/*]\/\s*([A-Za-z_][A-Za-z0-9_]*|\d+)/g)) expect(['CELL_CM', '2', '4']).toContain(m[1]);
    }
  });

  it('the placement reads the arena only through the index query and the vertex rotations (no slot order)', () => {
    const c = code(src('placement.ts'));
    expect(c).toMatch(/query\(p, tx\.key, 4,/);
    expect(c).not.toMatch(/slots\.(vertex|pair)\.top/); // no scan over arena slots
  });
});

// N-55 (5), N-12 (C-0294 (1), C-0296): every function the item's sources export that takes an InsertTx and is an entry or
// a writer begins with the closed check; the rest are named here with the reason they carry none. A new exported
// function taking an InsertTx fails this test until it is sorted into one list or the other.
//
// N-13 (hardening round S5): the scan reads the code's structure, not one layout. `exportedFunctions` lexes a source
// (comments dropped, string and template literals kept but opaque to the structure), finds every function declaration
// and every `const` bound to an arrow or a function expression, exported directly or through an `export { … }` list,
// reads its parameter list with balanced brackets (a signature over many lines, any parameter name, generics, defaults),
// and takes the first statement of its block body. A function "takes an InsertTx" when its first parameter's type text
// names `InsertTx`; the closed check is compared with whitespace outside string literals removed and the parameter's own
// name, so a wrapped `check(\n  t.closed !== true,\n  '…',\n);` counts as the check. The planted writers below are the
// negative control (the checker's two shapes of N-13 and the arrow it named, among others).
const CLOSED_CHECK = "check(tx.closed !== true, 'the transaction is closed (committed or rejected)');";
const CHECKED = ['splitThrough', 'applySplitPlan', 'attractVertex', 'attractRun', 'applyAttraction'];
const UNCHECKED: Record<string, string> = {
  // planners: they read and charge the overlay's own counters only, never the arena; their entries above check first,
  // and a check in them would make those entries' ordering pins (N-11) unkillable
  planSplitThrough: 'planner (reads, charges the overlay)',
  planAttraction: 'planner (reads, charges the overlay)',
  placePoint: 'planner (reads, charges the overlay)',
  decimate: "planner (reads, charges the overlay); insertChain's entry checks first (M0-a-05)",
  // the overlay's bookkeeping, called inside every op of both items after its entry check
  charge: 'bookkeeping (the overlay’s counters)',
  warn: 'bookkeeping (the overlay’s warnings)',
};

/** Per character of a source: code ('c'), inside a string or template literal ('s', its quotes included), or comment ('m'). */
function lex(s: string): string {
  const kind: string[] = [];
  let i = 0;
  while (i < s.length) {
    const c = s[i];
    if (c === '/' && s[i + 1] === '/') {
      while (i < s.length && s[i] !== '\n') kind[i++] = 'm';
    } else if (c === '/' && s[i + 1] === '*') {
      const end = s.indexOf('*/', i + 2);
      const stop = end < 0 ? s.length : end + 2;
      while (i < stop) kind[i++] = 'm';
    } else if (c === "'" || c === '"' || c === '`') {
      kind[i++] = 's';
      while (i < s.length && s[i] !== c) {
        if (s[i] === '\\') kind[i++] = 's';
        if (i < s.length) kind[i++] = 's';
      }
      if (i < s.length) kind[i++] = 's';
    } else kind[i++] = 'c';
  }
  return kind.join('');
}

/** An exported function of a source: its name, its first parameter (name and type text, whitespace flattened) and the first statement of its block body, canonical (whitespace outside string literals removed; null for an expression body). */
interface Exported {
  readonly name: string;
  readonly param: string | null;
  readonly type: string | null;
  readonly first: string | null;
}

/** The function declarations and function-valued `const`s a source exports (directly or through `export { … }`), read from its structure. */
function exportedFunctions(source: string): Exported[] {
  const kind = lex(source);
  // The structure: comments blanked, every literal's characters replaced by one opaque letter (same length as the source).
  let masked = '';
  for (let i = 0; i < source.length; i++) masked += kind[i] === 'm' ? ' ' : kind[i] === 's' ? 'S' : source[i];
  const canonical = (from: number, to: number): string => {
    let out = '';
    for (let i = from; i < to; i++) if (kind[i] === 's' || !/\s/.test(source[i])) out += source[i];
    return out.replace(/,\)/g, ')');
  };
  /** The index of the bracket closing the one at `open` (round, square, curly; angle brackets counted, `=>` skipped). */
  const closing = (open: number): number => {
    let depth = 0;
    for (let i = open; i < masked.length; i++) {
      const c = masked[i];
      if (c === '=' && masked[i + 1] === '>') {
        i += 1;
        continue;
      }
      if ('([{<'.includes(c)) depth += 1;
      else if (')]}>'.includes(c)) {
        depth -= 1;
        if (depth === 0) return i;
      }
    }
    return -1;
  };
  const skipSpace = (i: number): number => {
    while (i < masked.length && /\s/.test(masked[i])) i += 1;
    return i;
  };
  /** After a parameter list closing at `close`: the index of the body's `{` (or of an arrow's expression), and whether it is a block. */
  const bodyAfter = (close: number, arrow: boolean): { at: number; block: boolean } => {
    let i = skipSpace(close + 1);
    let prev = ')';
    if (masked[i] === ':') {
      prev = ':';
      i += 1;
      // the return type: up to the body's `{` (one following a complete type) or, for an arrow, its `=>`
      for (; i < masked.length; i++) {
        const c = masked[i];
        if (/\s/.test(c)) continue;
        if (c === '=' && masked[i + 1] === '>') break;
        if (c === '{' && !':|&,<(='.includes(prev)) break;
        if ('([{<'.includes(c)) {
          i = closing(i);
          prev = ')';
          continue;
        }
        prev = c;
      }
    }
    if (arrow) {
      i = skipSpace(i);
      if (masked[i] === '=' && masked[i + 1] === '>') i = skipSpace(i + 2);
    }
    return { at: i, block: masked[i] === '{' };
  };
  /** The first top-level parameter of the list between `open` and `close`: its name and type text. */
  const firstParam = (open: number, close: number): { param: string | null; type: string | null } => {
    let depth = 0;
    let end = close;
    for (let i = open + 1; i < close; i++) {
      const c = masked[i];
      if (c === '=' && masked[i + 1] === '>') {
        i += 1;
        continue;
      }
      if ('([{<'.includes(c)) depth += 1;
      else if (')]}>'.includes(c)) depth -= 1;
      else if (c === ',' && depth === 0) {
        end = i;
        break;
      }
    }
    const text = masked.slice(open + 1, end);
    if (text.trim() === '') return { param: null, type: null };
    // the type: after the first ':' outside brackets, up to a default value's '=' outside brackets
    depth = 0;
    let colon = -1;
    let eq = text.length;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '=' && text[i + 1] === '>') {
        i += 1;
        continue;
      }
      if ('([{<'.includes(c)) depth += 1;
      else if (')]}>'.includes(c)) depth -= 1;
      else if (c === ':' && depth === 0 && colon < 0) colon = i;
      else if (c === '=' && depth === 0) {
        eq = i;
        break;
      }
    }
    const name = (colon < 0 ? text.slice(0, eq) : text.slice(0, colon)).replace(/[?\s]/g, '');
    const type = colon < 0 ? null : source.slice(open + 1 + colon + 1, open + 1 + eq).replace(/\s+/g, ' ').trim();
    return { param: name, type };
  };
  /** The canonical first statement of the block whose `{` is at `at`. */
  const firstStatement = (at: number): string => {
    const start = skipSpace(at + 1);
    let depth = 0;
    for (let i = start; i < masked.length; i++) {
      const c = masked[i];
      if ('([{'.includes(c)) depth += 1;
      else if (')]}'.includes(c)) {
        if (depth === 0) return canonical(start, i);
        depth -= 1;
      } else if (c === ';' && depth === 0) return canonical(start, i + 1);
    }
    return canonical(start, masked.length);
  };

  const found = new Map<string, { exported: boolean; open: number; arrow: boolean }>();
  for (const m of masked.matchAll(/(\bexport\s+(?:default\s+)?)?(?:\basync\s+)?\bfunction\b\s*\*?\s*([A-Za-z_$][\w$]*)\s*(<)?/g)) {
    let i = m.index + m[0].length - (m[3] === undefined ? 0 : 1);
    if (m[3] !== undefined) i = closing(i) + 1;
    i = skipSpace(i);
    if (masked[i] !== '(') continue;
    found.set(m[2], { exported: m[1] !== undefined, open: i, arrow: false });
  }
  for (const m of masked.matchAll(/(\bexport\s+)?\b(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*/g)) {
    let i = m.index + m[0].length;
    if (masked[i] === ':') {
      // a type annotation: up to the '=' that binds the value
      for (i += 1; i < masked.length && !(masked[i] === '=' && masked[i + 1] !== '>' && masked[i - 1] !== '='); i++) {
        if (masked[i] === '=' && masked[i + 1] === '>') i += 1;
        else if ('([{<'.includes(masked[i])) i = closing(i);
      }
    }
    if (masked[i] !== '=') continue;
    i = skipSpace(i + 1);
    const fn = /^(?:async\s+)?function\b\s*\*?\s*[\w$]*\s*/.exec(masked.slice(i));
    let arrow = true;
    if (fn !== null) {
      i += fn[0].length;
      arrow = false;
    } else if (/^async\s/.test(masked.slice(i))) i = skipSpace(i + 5);
    if (masked[i] === '<') i = skipSpace(closing(i) + 1);
    if (masked[i] !== '(') continue;
    if (arrow) {
      // an arrow: its parameter list is followed (after an optional return type) by '=>'
      const close = closing(i);
      const after = masked.slice(close + 1);
      if (!/^\s*(?::[\s\S]*?)?=>/.test(after)) continue;
    }
    found.set(m[2], { exported: m[1] !== undefined, open: i, arrow });
  }
  // `export { a, b as c }` lists of local names (a list with `from` re-exports another module's: not this source's)
  const listed = new Set<string>();
  for (const m of masked.matchAll(/\bexport\s*\{([^}]*)\}\s*(from\b)?/g)) {
    if (m[2] !== undefined) continue;
    for (const part of m[1].split(',')) {
      const local = part.trim().split(/\s+as\s+/)[0];
      if (local !== '') listed.add(local);
    }
  }
  const out: Exported[] = [];
  for (const [name, f] of found) {
    if (!f.exported && !listed.has(name)) continue;
    const close = closing(f.open);
    const { param, type } = firstParam(f.open, close);
    const body = bodyAfter(close, f.arrow);
    out.push({ name, param, type, first: body.block ? firstStatement(body.at) : null });
  }
  return out;
}

const takesTx = (f: Exported): boolean => f.type !== null && /\bInsertTx\b/.test(f.type);
/** The closed check as a function whose first parameter is `name` writes it, canonical (whitespace outside literals removed). */
const closedCheck = (name: string): string => CLOSED_CHECK.replace('tx.closed', `${name}.closed`).replace(/\s+(?=(?:[^']*'[^']*')*[^']*$)/g, '');

describe('a closed transaction is checked at every exported entry and writer of steps 1–2 (N-55 (5); C-0296)', () => {
  it('each exported function taking an InsertTx is checked first or named as a planner or bookkeeping', () => {
    const seen: string[] = [];
    for (const f of FILES) {
      for (const e of exportedFunctions(src(f))) {
        if (!takesTx(e)) continue;
        seen.push(e.name);
        if (CHECKED.includes(e.name)) expect(`${e.name}: ${e.first}`).toBe(`${e.name}: ${closedCheck(e.param ?? '')}`);
        else expect(Object.keys(UNCHECKED), `${f}: ${e.name} takes an InsertTx: check it or name it`).toContain(e.name);
      }
    }
    expect(seen.slice().sort()).toEqual([...CHECKED, ...Object.keys(UNCHECKED)].sort());
  });

  it('N-13: the scan sees an exported writer in any layout — wrapped signatures, any parameter name, arrows, generics, export lists — and nothing in comments or strings', () => {
    // planted writers (the negative control): the checker's two shapes of N-13 (`zzWriter`, wrapped as Prettier wraps a
    // long signature, and `zzWriter2`, its parameter named t), the arrow it named, and the other shapes a source may take
    const planted = [
      '// export function inComment(tx: InsertTx): void {}',
      '/* export const inBlock = (tx: InsertTx) => {}; */',
      "const text = 'export function inString(tx: InsertTx) {}';",
      'export function zzWriter(',
      '  tx: InsertTx,',
      '  p: LatticePoint,',
      '): void {',
      '  write(tx.plat, p);',
      '}',
      'export function zzWriter2(t: InsertTx): void {',
      '  write(t.plat);',
      '}',
      'export const zzArrow = (tx: InsertTx) => write(tx.plat);',
      'export const zzArrowBlock = async (',
      '  o: InsertTx,',
      '): Promise<{ readonly done: boolean }> => {',
      '  return write(o.plat);',
      '};',
      'export const zzExpr = function (tx: InsertTx, n = (a: number) => a) {',
      '  write(tx.plat, n);',
      '};',
      'export function zzGeneric<T extends { a: number }>(tx: Readonly<InsertTx>, t: T): KernelResult<{ v: T }> {',
      '  return write(tx.plat, t);',
      '}',
      'function zzLocal(tx: InsertTx | null): void {',
      '  write(tx);',
      '}',
      'function zzHidden(tx: InsertTx): void {}',
      'export { zzLocal as zzListed };',
      'export function zzChecked(',
      '  tx: InsertTx,',
      '  p: LatticePoint,',
      '): KernelResult<{ ok: true }> {',
      "  check(",
      '    tx.closed !== true,',
      "    'the transaction is closed (committed or rejected)',",
      '  );',
      '  return write(tx.plat, p);',
      '}',
      'export function zzNotTx(p: Plat, tx2: number): void {}',
      'export function zzNoParam(): void {}',
    ].join('\n');
    const found = exportedFunctions(planted);
    expect(found.map((e) => [e.name, e.param, takesTx(e)])).toEqual([
      ['zzWriter', 'tx', true],
      ['zzWriter2', 't', true],
      ['zzGeneric', 'tx', true],
      ['zzLocal', 'tx', true],
      ['zzChecked', 'tx', true],
      ['zzNotTx', 'p', false],
      ['zzNoParam', null, false],
      ['zzArrow', 'tx', true],
      ['zzArrowBlock', 'o', true],
      ['zzExpr', 'tx', true],
    ]);
    const first = new Map(found.map((e) => [e.name, e.first]));
    expect(first.get('zzChecked')).toBe(closedCheck('tx')); // the wrapped check counts as the check
    expect(first.get('zzWriter')).toBe('write(tx.plat,p);');
    expect(first.get('zzWriter2')).not.toBe(closedCheck('t'));
    expect(first.get('zzArrow')).toBeNull(); // an expression body cannot begin with the check
    expect(first.get('zzArrowBlock')).toBe('returnwrite(o.plat);');
    expect(first.get('zzGeneric')).toBe('returnwrite(tx.plat,t);');
    // the audit's verdict on the planted source: every writer but zzChecked is unsorted
    const unsorted = found.filter((e) => takesTx(e) && e.first !== closedCheck(e.param ?? '')).map((e) => e.name);
    expect(unsorted).toEqual(['zzWriter', 'zzWriter2', 'zzGeneric', 'zzLocal', 'zzArrow', 'zzArrowBlock', 'zzExpr']);
  });
});
