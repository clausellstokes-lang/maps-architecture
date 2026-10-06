// N-46 (6) (e) (the session's ruling J211; fix round S6, C-0220): the undo and remove paths of every kind of commit the
// router's fallbacks make restore the arena (§2.2 rule 3). Each fixture of register/s6-lifecycle.json is a B-FUZZ case
// whose last chain commits through one kind — an ordinary commit (the control), a shared stretch (W_STRETCH_SHARED), a
// first-pass W_PLACED commit (a step-2 or crossing fallback), N-42 (a)'s route across a sliver, N-42 (b)'s re-landed
// end, S4's split route, S5's third pass and its second reading (the free spot first), and S6's optional chain that
// N-43 B's bound refused before, committed by the split route (pass 2) or the third pass — found by a probe of the
// pass and route that committed (scratch mirror only; the kind is the fixture's provenance, its warnings pinned here).
//
// Every chain goes through M0-a-06's transaction (`tx`) with M0-a-14's invariant suite wired in (`suiteEnv`), role
// `invisible` (no linear-role row). For the last chain of each case:
//   * the undo path — a batch whose later op refuses after the insert wrote — leaves the arena and its version exactly as
//     they were (`state`);
//   * the commit gives the fixture's warnings, keeps N-43 B's bound (fidelity.ts) and the arena valid;
//   * the remove path — `removeEdges` of the chain's own rows in a later batch — is held to what it gives an ordinary
//     commit. Exactly as before is not that bar: of 1 791 ordinary first-pass commits this round replayed so (B-FUZZ
//     random, seed 4243, 3 000 cases, the mirror of 04:31), 818 came back exactly, 950 left a finer face record, 21
//     left split points or flag changes on earlier chains' vertices and 2 removals were refused by the suite — the S5
//     closing check's note N-13, a question about M0-a-06's remove and dissolution, which that item's in-flight round
//     (N-47) is changing: on the tree's code of 05:20 the face-record case of the controls is refused instead. So every
//     removal is held to the bar both readings meet — either it commits, the arena valid, no row of the chain's entity
//     left and every other row key of the arena still there, or it is refused and writes nothing — and a kind whose
//     removal gave the arena back exactly on both codes (`remove: 'exact'`) is pinned to that; the rest (`'n13'`) are
//     the three ordinary controls and the kinds whose removal shows one of their outcomes.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import type { Plat } from '../../../src/arena/index.js';
import { insertChain } from '../../../src/insert/insertChain.js';
import { suiteEnv, suiteReport } from '../../../src/invariants/index.js';
import { err, type Warning } from '../../../src/num/index.js';
import { removeEdges, tx } from '../../../src/tx/index.js';
import type { Level } from '../../../src/types/index.js';
import { spec, state } from '../../tx/support.js';
import { fidelityProblems } from './fidelity.js';
import { allProblems, contentPrint, framed, pt, TIMEOUT } from './support.js';

/** One chain of a case, as B-FUZZ draws it. */
interface Chain {
  readonly level: Level;
  readonly cls: 'mandatory' | 'optional';
  readonly closed: boolean;
  readonly points: readonly (readonly [number, number])[];
  readonly pinned?: readonly number[];
  readonly entity: string;
}

/** A case: its chains in order into the framed 4 000 cm square, the last one committing through `kind`. */
interface LifeCase {
  readonly kind: string;
  readonly family: string;
  readonly pass: number;
  readonly warnings: readonly Warning[];
  /** What removeEdges of the last chain gives: the arena exactly as before, or one of N-13's ordinary outcomes. */
  readonly remove: 'exact' | 'n13';
  readonly log: readonly Chain[];
}

const CASES = (JSON.parse(readFileSync(new URL('./register/s6-lifecycle.json', import.meta.url), 'utf8')) as { cases: LifeCase[] }).cases;

/** The kinds, in the register's order: the ordinary commit and its two N-13 controls first. */
const KINDS = ['plain', 'control-faces', 'control-content', 'control-refused', 'stretch', 'placed-pass1', 'sliver-route', 'relanded', 'split-route', 'pass3', 'pass4', 'pass3-optional', 'pass2-optional'];

const ROLE = 'invisible';
const optsOf = (c: Chain): { closed: boolean; pinned?: readonly number[] } => ({ closed: c.closed, ...(c.pinned === undefined ? {} : { pinned: c.pinned }) });
const env = (): ReturnType<typeof suiteEnv> => suiteEnv({ report: suiteReport() });

/** The chain inserted in its own batch through the transaction (the suite wired in); its result. */
function insert(p: Plat, c: Chain): ReturnType<typeof tx> {
  return tx(p, spec(c.level), (o) => insertChain(o, c.points.map(([x, y]) => pt(x, y)), [{ role: ROLE, entity: c.entity }], c.cls, optsOf(c)), env());
}

/** The content print split into its face-record lines and every other line (vertices, edges and their rows). */
function parts(p: Plat): { faces: string[]; rest: string[] } {
  const lines = contentPrint(p).split('\n');
  return { faces: lines.filter((l) => l.startsWith('f')), rest: lines.filter((l) => !l.startsWith('f')) };
}

/** The row keys (kind / entity / level / ordinal) the content print names on vertices and edges, each once. */
function rowKeys(p: Plat): Set<string> {
  const out = new Set<string>();
  for (const l of parts(p).rest) {
    const m = /\[([^\]]*)\]$/.exec(l);
    if (m !== null && m[1] !== '') for (const r of m[1].split(';')) out.add(r);
  }
  return out;
}

describe('N-46 (6) (e): the undo and remove paths of every kind of fallback-made commit restore the arena (register/s6-lifecycle.json)', () => {
  it('the register holds one case per kind', () => {
    expect(CASES.map((c) => c.kind)).toEqual(KINDS);
  });

  for (const c of CASES) {
    it(`${c.kind} (${c.family}, pass ${c.pass}, ${c.log.length} chain${c.log.length === 1 ? '' : 's'}): undo restores the arena exactly; remove restores it as for an ordinary commit`, () => {
      const p = framed(4000);
      const earlier = c.log.slice(0, -1);
      const last = c.log[c.log.length - 1];
      for (const k of earlier) {
        const before = state(p);
        const r = insert(p, k);
        if (!r.ok) expect(state(p), `${k.entity} refused (${r.code}) writes nothing`).toBe(before);
      }
      expect(allProblems(p)).toEqual([]);
      const before = state(p);

      // The undo path: the insert writes, then a later op of the batch refuses — everything back, the version too.
      let wrote = false;
      const rejected = tx(p, spec(last.level), (o) => {
        const r = insertChain(o, last.points.map(([x, y]) => pt(x, y)), [{ role: ROLE, entity: last.entity }], last.cls, optsOf(last));
        expect(r.ok, r.ok ? '' : `${r.code} ${r.detail}`).toBe(true);
        wrote = r.ok;
        return err('E_INVARIANT', 'lifecycle: a later op of the batch refused');
      }, env());
      expect(wrote).toBe(true);
      expect(rejected.ok).toBe(false);
      expect(state(p)).toBe(before);

      // The commit: the kind's warnings, within the bound, the arena valid.
      const res = insert(p, last);
      expect(res.ok, res.ok ? '' : `${res.code} ${res.detail}`).toBe(true);
      if (!res.ok) return;
      const out = res.value as unknown as { value: { placed: number[] }; record: { warnings: readonly Warning[] } | null };
      expect(res.warnings).toEqual(c.warnings);
      expect(fidelityProblems(p, last.level, last.cls, last.points, optsOf(last), out.value.placed, last.entity)).toEqual([]);
      expect(allProblems(p)).toEqual([]);
      expect(state(p)).not.toBe(before);
      const keysBefore = rowKeys(p);
      const committed = state(p);

      // The remove path: the chain's own rows removed in a later batch; a refusal of it (the invariant suite's, as on
      // ordinary commits) writes nothing.
      const rm = tx(p, spec(last.level), (o) => removeEdges(o, { role: ROLE, entity: last.entity }), env());
      if (!rm.ok) {
        expect(c.remove, `${rm.code} ${rm.detail}`).toBe('n13');
        expect(state(p)).toBe(committed);
        return;
      }
      expect(allProblems(p)).toEqual([]);
      const keys = rowKeys(p);
      expect([...keys].filter((k) => k.includes(`/${last.entity}/`))).toEqual([]);
      expect([...keysBefore].filter((k) => !k.includes(`/${last.entity}/`) && !keys.has(k))).toEqual([]);
      if (c.remove === 'exact') expect(contentPrint(p)).toBe(before.slice(0, before.lastIndexOf('\n#v')));
    }, TIMEOUT);
  }
});
