// S8's EP-01 precondition (M0-x-06; C-0278 (3); checks/M0-x-06.md B2): the kind reaches the west district's faces S8
// receives — read from the arena, never from the fixture's geometry list — on every kind and both sizes, and the same
// reader finds no kind on the kindless state, so a fixture whose kind was erased fails.
import { describe, expect, it } from 'vitest';
import { DEGENERATE_KINDS } from '../../src/edge/kinds.js';
import { s8KindProblem, s8State } from '../../src/edge/s8.js';

describe("S8's kind reaches the faces S8 cuts", () => {
  for (const scale of [1, 3]) {
    it(`every kind stands in the west district's faces (scale ${String(scale)}); the kindless state carries none`, () => {
      for (const seed of [1, 2, 3, 4, 5]) {
        const none = s8State(seed, null, { scale });
        for (const kind of DEGENERATE_KINDS) {
          expect(s8KindProblem(s8State(seed, kind, { scale }), kind), `${kind} @${String(seed)}`).toBeNull();
          expect(s8KindProblem(none, kind), `kindless, read as ${kind} @${String(seed)}`).not.toBeNull();
        }
      }
    });
  }

  it('a kind is not mistaken for another: each state carries its own kind only where the readers are disjoint', () => {
    // the antenna and the loop both start at the ring road's west point; the arterial's midpoint is zero-length's alone
    for (const seed of [6, 7]) {
      for (const kind of DEGENERATE_KINDS) {
        const st = s8State(seed, kind);
        if (kind !== 'zero-length') expect(s8KindProblem(st, 'zero-length'), `${kind} read as zero-length`).not.toBeNull();
        if (kind !== 'collinear') expect(s8KindProblem(st, 'collinear'), `${kind} read as collinear`).not.toBeNull();
        if (kind !== 'coincident') expect(s8KindProblem(st, 'coincident'), `${kind} read as coincident`).not.toBeNull();
      }
    }
  });
});
