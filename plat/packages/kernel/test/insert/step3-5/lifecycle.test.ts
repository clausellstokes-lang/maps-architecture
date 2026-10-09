// N-46 (6) (e) (the session's ruling J211; fix round S6, C-0221): the undo and remove paths of every kind of commit the
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
//   * the remove path — `removeEdges` of the chain's own rows in a later batch — restores the arena exactly: the content
//     print, the encoded chunk refs and the level digests as before the insert (N-47, N-55). Every kind is held to it,
//     and no refusal of the removal is tolerated: the S6 round's `'n13'` reading (N-13's ordinary outcomes) masked
//     exactly two defects, both fixed — a same-level shared stretch's end left undissolved (Q9, M0-a-06 round s4) and a
//     chain's own fold-back point left carrying the `split` flag (Q10, this item's round S7: `control-refused` and
//     `pass2-optional`, whose removals tx's index-freshness row refused).
//   * after every commit and every removal the arena holds no dissolvable vertex (support.ts `dissolvableProblems`).
//
// N-55 (5) (round S7): an overlay kept past its batch — committed or rejected — is closed, and `insertChain` handed it
// throws at its entry; the arena bit for bit and its version as they were. C-0297.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import type { Plat } from '../../../src/arena/index.js';
import { recomputeLevelDigest } from '../../../src/digest/index.js';
import { insertChain } from '../../../src/insert/insertChain.js';
import { suiteEnv, suiteReport } from '../../../src/invariants/index.js';
import { encodeArena } from '../../../src/io/index.js';
import { err, type Warning } from '../../../src/num/index.js';
import { removeEdges, tx, type Overlay } from '../../../src/tx/index.js';
import type { Level } from '../../../src/types/index.js';
import { bits, spec, state } from '../../tx/support.js';
import { fidelityProblems } from './fidelity.js';
import { allProblems, contentPrint, dissolvableProblems, framed, pt, TIMEOUT } from './support.js';

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

/** The encoded chunks' refs in encoding order (the persisted form, §11), as restore.test.ts reads them. */
function chunkRefs(p: Plat): string {
  return JSON.stringify(encodeArena(p).map((c) => c.ref));
}

/** The level digests L0 – L4 (§3.9), as text. */
function digests(p: Plat): string {
  return JSON.stringify(([0, 1, 2, 3, 4] as const).map((l) => Array.from(recomputeLevelDigest(p, l) as ArrayLike<number>)));
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

describe('N-46 (6) (e), N-55: the undo and remove paths of every kind of fallback-made commit restore the arena exactly (register/s6-lifecycle.json)', () => {
  it('the register holds one case per kind', () => {
    expect(CASES.map((c) => c.kind)).toEqual(KINDS);
  });

  for (const c of CASES) {
    it(`${c.kind} (${c.family}, pass ${c.pass}, ${c.log.length} chain${c.log.length === 1 ? '' : 's'}): undo restores the arena exactly; remove restores it exactly (print, chunk refs, level digests)`, () => {
      const p = framed(4000);
      const earlier = c.log.slice(0, -1);
      const last = c.log[c.log.length - 1];
      for (const k of earlier) {
        const before = state(p);
        const r = insert(p, k);
        if (!r.ok) expect(state(p), `${k.entity} refused (${r.code}) writes nothing`).toBe(before);
        else expect(dissolvableProblems(p), `after ${k.entity}`).toEqual([]);
      }
      expect(allProblems(p)).toEqual([]);
      const before = state(p);
      const refsBefore = chunkRefs(p);
      const digestsBefore = digests(p);

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
      expect(dissolvableProblems(p)).toEqual([]);
      expect(state(p)).not.toBe(before);
      const keysBefore = rowKeys(p);

      // The remove path: the chain's own rows removed in a later batch commit, and the arena is as before the insert.
      const rm = tx(p, spec(last.level), (o) => removeEdges(o, { role: ROLE, entity: last.entity }), env());
      expect(rm.ok, rm.ok ? '' : `${rm.code} ${rm.detail}`).toBe(true);
      expect(allProblems(p)).toEqual([]);
      expect(dissolvableProblems(p)).toEqual([]);
      const keys = rowKeys(p);
      expect([...keys].filter((k) => k.includes(`/${last.entity}/`))).toEqual([]);
      expect([...keysBefore].filter((k) => !k.includes(`/${last.entity}/`) && !keys.has(k))).toEqual([]);
      expect(contentPrint(p)).toBe(before.slice(0, before.lastIndexOf('\n#v')));
      expect(chunkRefs(p)).toBe(refsBefore);
      expect(digests(p)).toBe(digestsBefore);
    }, TIMEOUT);
  }
});

// ---- N-55 (5): insertChain on a closed transaction throws (C-0297) -----------------------------------------------------
//
// An overlay outlives its batch only as a programming error. Before N-55 `insertChain` never looked: on the overlay of a
// committed batch it wrote outside any transaction, the version unchanged (the ruling's probe q13: "returned ok | version
// 1 -> 1 | state same: false"), and alike on a rejected batch's. It now throws at its entry — tx's assertion class
// (N-53 (3)), never a typed refusal — before it reads, charges or writes anything.

/** The overlay of an L1 batch that inserted way:0 across the framed square and then ended as `how`. */
function staleOverlay(how: 'committed' | 'rejected'): { p: Plat; o: Overlay } {
  const p = framed(4000);
  let kept: Overlay | null = null;
  const r = tx(p, spec(1), (o) => {
    kept = o;
    const w = insertChain(o, [pt(500, 500), pt(2500, 700)], [{ role: 'way', entity: 'way:0' }], 'mandatory');
    expect(w.ok).toBe(true);
    return how === 'committed' ? w : err('E_INVARIANT', 'lifecycle: the stage gave up');
  });
  expect(r.ok).toBe(how === 'committed');
  if (kept === null) throw new Error('the callback never ran');
  return { p, o: kept };
}

describe('N-55 (5): insertChain on a closed transaction throws — the overlay of a committed or a rejected batch (C-0297)', () => {
  for (const how of ['committed', 'rejected'] as const) {
    it(`on a ${how} batch's overlay: throws "the transaction is closed"; the arena bit for bit and its version as they were`, () => {
      const { p, o } = staleOverlay(how);
      expect(o.closed).toBe(true);
      const before = bits(p);
      const version = p.version;
      for (const cls of ['mandatory', 'optional'] as const) {
        expect(() => insertChain(o, [pt(600, 3000), pt(3000, 3200)], [{ role: 'way', entity: 'way:1' }], cls)).toThrow(/^insert: the transaction is closed \(committed or rejected\)$/);
        // a chain step 1 would refuse (one point) throws all the same: the door is the op's entry, before decimation
        expect(() => insertChain(o, [pt(600, 3000)], [{ role: 'way', entity: 'way:1' }], cls)).toThrow(/^insert: the transaction is closed/);
        expect(bits(p)).toBe(before);
        expect(p.version).toBe(version);
      }
      expect(allProblems(p)).toEqual([]);
      // the control: the same chain in an open batch commits — the throw was the closed overlay, nothing else
      const r = tx(p, spec(1), (open) => insertChain(open, [pt(600, 3000), pt(3000, 3200)], [{ role: 'way', entity: 'way:1' }], 'mandatory'));
      expect(r.ok ? 'committed' : `${r.code}: ${r.detail}`).toBe('committed');
      expect(p.version).toBe(version + 1);
      expect(allProblems(p)).toEqual([]);
    });
  }
});
