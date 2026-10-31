// M0-a-06 hardening round S8 (the write door, line 3): the type-checked scan behind write-door.test.ts — every store whose
// target is an arena column, found from the declarations so that every alias resolves. Not a test file: the guard test
// runs it over plat/packages/*/src and plat/bench/src and over its planted probe, and the round's census was read with it.
//
// A COLUMN is a typed-array property of one of the arena's tables (`VertexTable`, `HalfEdgeTable`, `LevelFaces`,
// `RoleTable`, `IndexHome`, `RoleHeadTable`, `OwnerTable`, `HandleTable`; kernel/src/arena/), an element of
// `IndexHome.face` (the per-level column tuple), an identifier bound to a column (const, let, a destructuring of a table,
// a for-of over a column tuple or an array literal of columns), or a `.subarray` view of one. The forms flagged:
//   store      `=` or a compound assignment (`|= &= ^= += -= *= /= %= <<= >>= >>>= **= ??= ||= &&=`) on `<column>[…]`
//   update     `++` / `--` on `<column>[…]`
//   bulk       `<column>.set / fill / copyWithin / sort / reverse (…)`
//   passed     a column passed to a function declared under the scanned roots that stores into that parameter (flagged
//              at the call site; a callee declared elsewhere — the TypeScript lib, a vendored module — is not followed)
//   replace    an assignment that replaces a column array or a table object: `<expr>.<column> = …`, `p.vertices = …`,
//              `p.halfEdges = …`, `p.roles / faces / indexHome / handles = …`, `<roles>.head = …`, `<faces>.ownerHead = …`,
//              `p.indexHome.face[l] = …`
// The counts, the SlotCounters, holesTop, the version, the frame and p.index are not columns and are never flagged.
import { readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import ts from 'typescript';

/** The tables whose typed-array properties are arena columns. */
export const TABLES = new Set(['VertexTable', 'HalfEdgeTable', 'LevelFaces', 'RoleTable', 'IndexHome', 'RoleHeadTable', 'OwnerTable', 'HandleTable']);
/** The Plat properties that hold a table object (never replaced: the door's registry keys on them). */
const PLAT_OBJECTS = new Set(['vertices', 'halfEdges', 'roles', 'faces', 'indexHome', 'handles']);
const TYPED = new Set(['Int32Array', 'Int16Array', 'Uint16Array', 'Uint8Array', 'Int8Array', 'Uint32Array', 'Float64Array', 'Float32Array', 'Uint8ClampedArray']);
const BULK = new Set(['set', 'fill', 'copyWithin', 'sort', 'reverse']);

export interface Finding {
  /** Path relative to the scan's base (plat/), '/'-separated. */
  readonly file: string;
  readonly line: number;
  readonly form: 'store' | 'update' | 'bulk' | 'passed' | 'replace';
  /** The enclosing function chain, outermost first, ' > '-joined ('' at module level). */
  readonly fn: string;
  /** The store's text, whitespace collapsed (the statement's expression). */
  readonly text: string;
}

/** Every .ts file under `dir`, recursively, sorted. */
export function tsFiles(dir: string): string[] {
  const out: string[] = [];
  const walk = (d: string): void => {
    for (const name of readdirSync(d).sort()) {
      const f = join(d, name);
      const st = statSync(f);
      if (st.isDirectory()) walk(f);
      else if (/\.(ts|mts|cts)$/.test(name) && !name.endsWith('.d.ts')) out.push(f);
    }
  };
  walk(dir);
  return out;
}

export const OPTIONS: ts.CompilerOptions = {
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ES2022,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  lib: ['lib.es2022.d.ts'],
  types: [],
  strict: true,
  noEmit: true,
  skipLibCheck: true,
  resolveJsonModule: true,
  allowImportingTsExtensions: false,
  customConditions: ['plat-source'],
};

/** A compiler host whose `planted` files (absolute path → text) exist only in memory. */
export function hostWith(planted: ReadonlyMap<string, string>): ts.CompilerHost {
  const host = ts.createCompilerHost(OPTIONS);
  const { getSourceFile, fileExists, readFile } = host;
  host.getSourceFile = (name, lang, ...rest) => {
    const text = planted.get(name);
    return text !== undefined ? ts.createSourceFile(name, text, lang, true) : getSourceFile.call(host, name, lang, ...rest);
  };
  host.fileExists = (name) => planted.has(name) || fileExists.call(host, name);
  host.readFile = (name) => planted.get(name) ?? readFile.call(host, name);
  return host;
}

/**
 * The scan: every flagged store in `files` (absolute paths), against `roots` (absolute folders whose declarations a
 * `passed` call is followed into). `base` makes the reported paths relative.
 */
export function scanStores(files: readonly string[], roots: readonly string[], base: string, planted: ReadonlyMap<string, string> = new Map()): { findings: Finding[]; tablesSeen: string[] } {
  const program = ts.createProgram([...files], OPTIONS, hostWith(planted));
  const checker = program.getTypeChecker();
  const tablesSeen = new Set<string>();
  const inRoots = (f: string): boolean => roots.some((r) => f === r || f.startsWith(r.endsWith(sep) ? r : r + sep));

  const unwrap = (e: ts.Expression): ts.Expression => {
    let x = e;
    while (ts.isParenthesizedExpression(x) || ts.isNonNullExpression(x) || ts.isAsExpression(x) || ts.isSatisfiesExpression(x) || ts.isTypeAssertionExpression(x)) x = x.expression;
    return x;
  };

  /** The table interface a property symbol is declared in (one of TABLES, or 'Plat'), or null. */
  const tableOf = (sym: ts.Symbol | undefined): { table: string; prop: string; typed: boolean } | null => {
    if (sym === undefined) return null;
    const s = sym.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(sym) : sym;
    for (const d of s.declarations ?? []) {
      if (!ts.isPropertySignature(d) || !ts.isInterfaceDeclaration(d.parent)) continue;
      const iface = d.parent.name.text;
      const file = d.getSourceFile().fileName.split(sep).join('/');
      if (!file.includes('/packages/kernel/src/arena/')) continue;
      if (!TABLES.has(iface) && iface !== 'Plat') continue;
      tablesSeen.add(iface);
      const tn = d.type !== undefined ? d.type.getText() : '';
      return { table: iface, prop: s.name, typed: TYPED.has(tn) };
    }
    return null;
  };

  const propSym = (e: ts.Expression): ts.Symbol | undefined => {
    if (ts.isPropertyAccessExpression(e)) return checker.getSymbolAtLocation(e.name);
    if (ts.isElementAccessExpression(e) && ts.isStringLiteralLike(e.argumentExpression)) return checker.getSymbolAtLocation(e.argumentExpression);
    return undefined;
  };

  /** Is `e` the column tuple IndexHome.face (or an alias of it)? */
  const isTuple = (e0: ts.Expression, depth = 0): boolean => {
    const e = unwrap(e0);
    const t = tableOf(propSym(e));
    if (t !== null && t.table === 'IndexHome' && t.prop === 'face') return true;
    if (ts.isIdentifier(e) && depth < 8) {
      const init = aliasInit(e);
      if (init !== null && init.kind === 'value') return isTuple(init.expr, depth + 1);
    }
    if (ts.isArrayLiteralExpression(e)) return e.elements.length > 0 && e.elements.every((x) => !ts.isSpreadElement(x) && isColumn(x, depth + 1));
    return false;
  };

  type Init = { kind: 'value'; expr: ts.Expression } | { kind: 'element'; expr: ts.Expression } | { kind: 'prop'; expr: ts.Expression; name: string } | { kind: 'param'; decl: ts.ParameterDeclaration };
  /** What an identifier was bound to: a declaration's initializer, a for-of element, a destructured property, a parameter. */
  const aliasInit = (id: ts.Identifier): Init | null => {
    const sym = checker.getSymbolAtLocation(id);
    if (sym === undefined) return null;
    for (const d of sym.declarations ?? []) {
      if (ts.isVariableDeclaration(d) && ts.isIdentifier(d.name)) {
        if (d.initializer !== undefined) return { kind: 'value', expr: d.initializer };
        const fo = d.parent.parent;
        if (ts.isForOfStatement(fo) && fo.initializer === d.parent) return { kind: 'element', expr: fo.expression };
      }
      if (ts.isBindingElement(d) && ts.isObjectBindingPattern(d.parent)) {
        const vd = d.parent.parent;
        const name = d.propertyName !== undefined && ts.isIdentifier(d.propertyName) ? d.propertyName.text : ts.isIdentifier(d.name) ? d.name.text : '';
        if (ts.isVariableDeclaration(vd) && vd.initializer !== undefined) return { kind: 'prop', expr: vd.initializer, name };
      }
      if (ts.isBindingElement(d) && ts.isArrayBindingPattern(d.parent)) {
        const vd = d.parent.parent;
        if (ts.isVariableDeclaration(vd) && vd.initializer !== undefined) return { kind: 'element', expr: vd.initializer };
      }
      if (ts.isParameter(d)) return { kind: 'param', decl: d };
    }
    return null;
  };

  /** Is `e0` an arena column (a typed-array property of a table, an element of the tuple, an alias, a subarray view)? */
  const isColumn = (e0: ts.Expression, depth = 0): boolean => {
    if (depth > 8) return false;
    const e = unwrap(e0);
    const t = tableOf(propSym(e));
    if (t !== null) return t.table !== 'Plat' && t.typed;
    if (ts.isElementAccessExpression(e) && !ts.isStringLiteralLike(e.argumentExpression) && isTuple(e.expression, depth + 1)) return true;
    if (ts.isConditionalExpression(e)) return isColumn(e.whenTrue, depth + 1) || isColumn(e.whenFalse, depth + 1);
    if (ts.isBinaryExpression(e) && (e.operatorToken.kind === ts.SyntaxKind.BarBarToken || e.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken)) return isColumn(e.left, depth + 1) || isColumn(e.right, depth + 1);
    if (ts.isCallExpression(e) && ts.isPropertyAccessExpression(e.expression) && e.expression.name.text === 'subarray') return isColumn(e.expression.expression, depth + 1);
    if (ts.isIdentifier(e)) {
      const init = aliasInit(e);
      if (init === null) return false;
      if (init.kind === 'value') return isColumn(init.expr, depth + 1);
      if (init.kind === 'element') return isTuple(init.expr, depth + 1);
      if (init.kind === 'prop') {
        const ty = checker.getTypeAtLocation(init.expr);
        const p = ty.getProperty(init.name);
        const tt = tableOf(p);
        return tt !== null && tt.table !== 'Plat' && tt.typed;
      }
    }
    return false;
  };

  /** Does the function `fn` store into its parameter `param` (any form; followed into calls it passes it to)? */
  const storesMemo = new Map<ts.ParameterDeclaration, boolean>();
  const storesInto = (param: ts.ParameterDeclaration, depth: number): boolean => {
    const memo = storesMemo.get(param);
    if (memo !== undefined) return memo;
    storesMemo.set(param, false);
    const fn = param.parent;
    const body = (fn as ts.FunctionLikeDeclaration).body;
    if (body === undefined || !ts.isIdentifier(param.name)) return false;
    const psym = checker.getSymbolAtLocation(param.name);
    const isParam = (e0: ts.Expression, d = 0): boolean => {
      const e = unwrap(e0);
      if (ts.isIdentifier(e)) {
        const s = checker.getSymbolAtLocation(e);
        if (s === psym) return true;
        if (d < 8 && s !== undefined) for (const decl of s.declarations ?? []) if (ts.isVariableDeclaration(decl) && decl.initializer !== undefined) return isParam(decl.initializer, d + 1);
        return false;
      }
      if (ts.isCallExpression(e) && ts.isPropertyAccessExpression(e.expression) && e.expression.name.text === 'subarray') return isParam(e.expression.expression, d + 1);
      return false;
    };
    let found = false;
    const visit = (n: ts.Node): void => {
      if (found) return;
      const target = storeTarget(n);
      if (target !== null && ts.isElementAccessExpression(unwrap(target)) && isParam((unwrap(target) as ts.ElementAccessExpression).expression)) found = true;
      if (ts.isCallExpression(n) && ts.isPropertyAccessExpression(n.expression) && BULK.has(n.expression.name.text) && isParam(n.expression.expression)) found = true;
      if (ts.isCallExpression(n) && depth < 4) {
        n.arguments.forEach((a, i) => {
          if (!found && isParam(a)) {
            const callee = calleeParam(n, i);
            if (callee !== null && storesInto(callee, depth + 1)) found = true;
          }
        });
      }
      ts.forEachChild(n, visit);
    };
    visit(body);
    storesMemo.set(param, found);
    return found;
  };

  /** The callee's parameter declaration for argument `i`, when the callee is declared under the roots. */
  const calleeParam = (call: ts.CallExpression, i: number): ts.ParameterDeclaration | null => {
    const sig = checker.getResolvedSignature(call);
    const decl = sig?.getDeclaration();
    if (decl === undefined || !('parameters' in decl)) return null;
    if (!inRoots(decl.getSourceFile().fileName)) return null;
    const params = (decl as ts.SignatureDeclaration).parameters;
    const p = params[Math.min(i, params.length - 1)];
    if (p === undefined || (p.dotDotDotToken === undefined && i >= params.length)) return null;
    return p;
  };

  /** The target of an assignment (any assignment operator) or of ++ / --, or null. */
  function storeTarget(n: ts.Node): ts.Expression | null {
    if (ts.isBinaryExpression(n) && n.operatorToken.kind >= ts.SyntaxKind.FirstAssignment && n.operatorToken.kind <= ts.SyntaxKind.LastAssignment) return n.left;
    if ((ts.isPrefixUnaryExpression(n) || ts.isPostfixUnaryExpression(n)) && (n.operator === ts.SyntaxKind.PlusPlusToken || n.operator === ts.SyntaxKind.MinusMinusToken)) return n.operand;
    return null;
  }

  const fnName = (n: ts.Node): string => {
    const names: string[] = [];
    for (let x: ts.Node | undefined = n.parent; x !== undefined; x = x.parent) {
      let name: string | null = null;
      if ((ts.isFunctionDeclaration(x) || ts.isMethodDeclaration(x)) && x.name !== undefined) name = x.name.getText();
      else if (ts.isArrowFunction(x) || ts.isFunctionExpression(x)) {
        const p = x.parent;
        if (ts.isVariableDeclaration(p) && ts.isIdentifier(p.name)) name = p.name.text;
        else if (ts.isPropertyAssignment(p)) name = p.name.getText();
        else if (ts.isFunctionExpression(x) && x.name !== undefined) name = x.name.text;
        else name = '(anonymous)';
      }
      if (name !== null) names.unshift(name);
    }
    return names.join(' > ');
  };

  const findings: Finding[] = [];
  for (const file of files) {
    const sf = program.getSourceFile(file);
    if (sf === undefined) throw new Error(`door-scan: not in the program: ${file}`);
    const rel = relative(base, file).split(sep).join('/');
    const push = (n: ts.Node, form: Finding['form'], textNode: ts.Node): void => {
      const line = sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1;
      findings.push({ file: rel, line, form, fn: fnName(n), text: textNode.getText(sf).replace(/\s+/g, ' ').trim() });
    };
    const visit = (n: ts.Node): void => {
      const target0 = storeTarget(n);
      if (target0 !== null) {
        const target = unwrap(target0);
        const form: Finding['form'] = ts.isBinaryExpression(n) ? 'store' : 'update';
        if (ts.isElementAccessExpression(target) && !ts.isStringLiteralLike(target.argumentExpression)) {
          if (isColumn(target.expression)) push(n, form, n);
          else if (form === 'store' && isTuple(target.expression)) push(n, 'replace', n); // p.indexHome.face[l] = …
        } else if (form === 'store') {
          const t = tableOf(propSym(target));
          if (t !== null) {
            const replacesColumn = t.table !== 'Plat' && t.typed;
            const replacesTable = (t.table === 'Plat' && PLAT_OBJECTS.has(t.prop)) || (t.table === 'RoleTable' && t.prop === 'head') || (t.table === 'LevelFaces' && t.prop === 'ownerHead') || (t.table === 'IndexHome' && t.prop === 'face');
            if (replacesColumn || replacesTable) push(n, 'replace', n);
          }
        }
      }
      if (ts.isCallExpression(n) && ts.isPropertyAccessExpression(n.expression) && BULK.has(n.expression.name.text) && isColumn(n.expression.expression)) push(n, 'bulk', n);
      if (ts.isCallExpression(n)) {
        n.arguments.forEach((a, i) => {
          if (!isColumn(a)) return;
          const p = calleeParam(n, i);
          if (p !== null && storesInto(p, 0)) push(n, 'passed', n);
        });
      }
      ts.forEachChild(n, visit);
    };
    visit(sf);
  }
  return { findings, tablesSeen: [...tablesSeen].sort() };
}
