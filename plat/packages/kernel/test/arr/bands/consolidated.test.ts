// Hardening round S14 (lane build/M0-a-09-fix-s14): the item's files hold no private copy of a shared rule.
// N-c2-1 (checks/M0-a-01-notes.md:94): bandUnion.ts read a face inside kerb(F) (`insideKerb`) and a point inside F's
// route rings (`insideRings`) by its own copy of Sunday's crossing rule — a twelfth copy outside `copies.ts`'s table;
// it now sums exact.ts's `windingNumber` over the rings (the one rule, the site gone from the copies to hold).
// N-c1-1 / N-c1c-1 (checks/M0-a-08-notes.md:287, :325): tileRings.ts kept private `simpleLoops` and `dropStraight`,
// bodies identical to winding.ts's exports; it now imports them. Read from the sources with the TypeScript compiler, as
// equivalence.test.ts reads the copy table's sites (`copies.ts`).
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { sourceOf } from '../../num/copies.js';

/** The names a module imports from `from` (its named bindings), read from its source. */
function importedFrom(file: string, from: string): string[] {
  const sf = ts.createSourceFile(file, sourceOf(file), ts.ScriptTarget.ES2022, true);
  const out: string[] = [];
  for (const st of sf.statements) {
    if (!ts.isImportDeclaration(st) || !ts.isStringLiteral(st.moduleSpecifier) || st.moduleSpecifier.text !== from) continue;
    const nb = st.importClause?.namedBindings;
    if (nb !== undefined && ts.isNamedImports(nb)) for (const e of nb.elements) out.push(e.name.text);
  }
  return out.sort();
}

/** The functions a module declares at its top level, read from its source. */
function declaredFunctions(file: string): string[] {
  const sf = ts.createSourceFile(file, sourceOf(file), ts.ScriptTarget.ES2022, true);
  return sf.statements.filter(ts.isFunctionDeclaration).map((f) => f.name?.text ?? '').sort();
}

/** Every top-level function of the module whose body applies the half-open crossing rule itself (an orient2d sign counted ±1). */
function crossingCopies(file: string): string[] {
  const sf = ts.createSourceFile(file, sourceOf(file), ts.ScriptTarget.ES2022, true);
  const rule = /orient2d\([^)]*\)\s*[<>]\s*0\)?\s*\w+\s*[+-]=\s*1/;
  return sf.statements.filter(ts.isFunctionDeclaration).filter((f) => rule.test(f.getText(sf))).map((f) => f.name?.text ?? '');
}

describe('the band files hold no private copy of a shared rule (hardening round S14)', () => {
  it('N-c2-1: bandUnion.ts reads inside by exact.ts’s windingNumber, with no crossing rule of its own', () => {
    expect(importedFrom('arr/bandUnion.ts', '../num/exact.js')).toEqual(['windingNumber']);
    expect(crossingCopies('arr/bandUnion.ts')).toEqual([]);
  });

  it('N-c1-1: tileRings.ts traces with winding.ts’s simpleLoops and dropStraight, with no copy of either', () => {
    expect(importedFrom('arr/tileRings.ts', './winding.js')).toEqual(expect.arrayContaining(['dropStraight', 'simpleLoops']));
    expect(declaredFunctions('arr/tileRings.ts').filter((n) => n === 'simpleLoops' || n === 'dropStraight')).toEqual([]);
  });

  it('the probe sees a copy where one stands: kerb.ts’s strictlyInside, the copy table’s site N-3 arr/kerb (control)', () => {
    expect(crossingCopies('arr/kerb.ts')).toContain('strictlyInside');
  });
});
