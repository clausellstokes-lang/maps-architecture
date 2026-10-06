// N-44 (4)'s refusal register for insertChain (OWNER-APPROVED, J201) and the session's S4 fix round's repros (N-42, N-43;
// C-0215). Each fixture under register/ is the input that found a case — an overlay group of M0-a-08's (its frame, then
// its two-point mandatory chains inserted one by one into a fresh L0 arena 2²⁴ cm wide, as `buildOverlay` inserts them),
// trimmed to the case — with the outcome this round gives it. Every chain is judged as B-FUZZ judges one: a commit keeps
// N-43 B's fidelity bound (fidelity.ts); a refusal is the register's code and writes nothing (content and the
// transaction's warnings as they were); the arena stays valid (§3.10, the face records, Euler). The register's other
// entries live beside the tests they came from: B-FUZZ's seed 777 case 421 (bfuzz.test.ts), the N-6 fallback chain
// (promote.test.ts) and M0-a-08's buffer case 391's last chain (routerGap.test.ts), each refused E_INVARIANT.
//
//   fixture            found by                                         S2 / S3 outcome                      S4 outcome
//   fix1-case1         M0-a-08 fix1 buffer agreement (PR size), case 1   s36 refused E_INVARIANT              s36 refused E_INVARIANT
//   fix1-case2         M0-a-08 fix1 buffer agreement (PR size), case 2   s31 refused E_INVARIANT              s31 refused E_INVARIANT
//   n43a-buffer        N-43 A (s3-inflight seed 770804368)               s157 left the arena invalid, s160    all 161 commit, valid
//                                                                        threw at the final clearance check
//   n43b-s60           N-43 B (offsetFace off-case.json)                 s60 committed 2 711 cm off           s60 commits in bound
//   n43b-s25           N-43 B (offsetFace off-case-4b.json)              s25 committed 2 175 cm off           s25 refused E_INVARIANT;
//                                                                                                              S5 (C-0217): commits in bound
//
// Refused here means no route the router has keeps both §3.10's clearance and the fidelity bound (N-44: refused and
// counted, never committed out of bound); better routing that turns these into commits is deferred past M0 (N-44 (4) —
// documented, not a bug to re-find).
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { createPlat, type Plat } from '../../../src/arena/index.js';
import { attachIndex } from '../../../src/index/index.js';
import type { Cm } from '../../../src/types/index.js';
import { GROUND } from '../../arena/support.js';
import { fidelityProblems } from './fidelity.js';
import { allProblems, contentPrint, ins, TIMEOUT, tx } from './support.js';

/** One register fixture: where it came from, the arena's index grid, the frame ring, the two-point chains in order. */
interface Fixture {
  readonly source: string;
  readonly gridCellCm: number;
  readonly frame: readonly (readonly [number, number])[];
  readonly segments: readonly (readonly (readonly [number, number])[])[];
}

function load(name: string): Fixture {
  return JSON.parse(readFileSync(new URL(`./register/${name}.json`, import.meta.url), 'utf8')) as Fixture;
}

/** M0-a-08's overlay arena: a ground arena 2²⁴ cm wide (no margin), its index on a grid of `cell` cm. */
function wideArena(cell: number): Plat {
  const p = createPlat(GROUND, { widthCm: (1 << 24) as Cm, heightCm: (1 << 24) as Cm, aspect: 1, marginShare: 0 });
  attachIndex(p, { gridCellCm: cell });
  return p;
}

/**
 * Replays a fixture: the frame, then each chain judged. `refused` names the chains the register expects refused (index →
 * code); any other refusal must be step 1's collapse (E_DEGENERATE `empty`). Returns the indices refused.
 */
function replay(fx: Fixture, refused: ReadonlyMap<number, string>): number[] {
  const p = wideArena(fx.gridCellCm);
  const t = tx(p, 0);
  expect(ins(t, fx.frame, [{ role: 'invisible', entity: 'arr:frame' }], 'mandatory', { closed: true }).ok).toBe(true);
  const out: number[] = [];
  fx.segments.forEach((seg, i) => {
    const entity = `arr:s${i}`;
    const before = refused.has(i) ? contentPrint(p) : '';
    const warningsBefore = refused.has(i) ? JSON.stringify(t.warnings) : '';
    const r = ins(t, seg, [{ role: 'invisible', entity }]);
    if (r.ok) {
      expect(fidelityProblems(p, 0, 'mandatory', seg, {}, r.value.placed, entity), `${entity} in bound`).toEqual([]);
      return;
    }
    out.push(i);
    if (refused.has(i)) {
      expect(r.code, `${entity}: ${r.detail}`).toBe(refused.get(i));
      expect(contentPrint(p)).toBe(before);
      expect(JSON.stringify(t.warnings)).toBe(warningsBefore);
      expect(allProblems(p)).toEqual([]);
    } else {
      expect(`${entity} ${r.code} ${r.detail}`).toBe(`${entity} E_DEGENERATE empty`);
    }
  });
  expect(allProblems(p)).toEqual([]);
  return out.filter((i) => refused.has(i));
}

describe('N-44 (4): the insertChain refusal register — each case refuses cleanly, every other chain commits in bound', () => {
  it('fix1-case1 (M0-a-08 fix1, buffer case 1): s36 (−17146, 12375) → (−17837, 10679) is refused E_INVARIANT and writes nothing', () => {
    expect(replay(load('fix1-case1'), new Map([[36, 'E_INVARIANT']]))).toEqual([36]);
  }, TIMEOUT);

  it('fix1-case2 (M0-a-08 fix1, buffer case 2): s31 (−48618, −42484) → (−47975, −44198) is refused E_INVARIANT and writes nothing', () => {
    expect(replay(load('fix1-case2'), new Map([[31, 'E_INVARIANT']]))).toEqual([31]);
  }, TIMEOUT);
});

describe('N-43: the S3 closing check\'s repros, on the S4 router (and S5\'s third pass, C-0217)', () => {
  it('n43b-s25 (N-43 B, offsetFace 4b): s25 (2899, 31966) → (12964, 42476), which the S1 – S3 router committed 2 175 cm off and S4 refused, commits within the bound on S5\'s third pass (C-0217)', () => {
    expect(replay(load('n43b-s25'), new Map())).toEqual([]);
  }, TIMEOUT);

  it('N-43 A (n43a-buffer, the buffer group of s3-inflight seed 770804368): all 161 chains commit within the bound, the arena valid — s157 no longer leaves a vertex within minEdge of a split edge, s160 no longer throws', () => {
    expect(replay(load('n43a-buffer'), new Map())).toEqual([]);
  }, TIMEOUT);

  it('N-43 B (n43b-s60, offsetFace): s60 (39315, 37634) → (38156, 43687), which the S1 – S3 router committed 2 711 cm off, commits within 2 · √2 · attractCm', () => {
    expect(replay(load('n43b-s60'), new Map())).toEqual([]);
  }, TIMEOUT);
});
