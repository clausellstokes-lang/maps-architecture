// A fixture's state that stands (M0-x-06; C-0278 (2)): the first of a seed's deterministic states whose preparation
// stands is run; a problem is never retried; no state standing fails naming each; and the states the checker's
// 1 000-seed run found missing their homes (checks/M0-x-06.md B3) now reach them.
import { describe, expect, it } from 'vitest';
import { EDGE_FIXTURES, judgeEdgeOutcome } from '../../src/edge/index.js';
import { firstStanding, STANDING_TRIES, standingSeed, type Attempt } from '../../src/edge/standing.js';
import type { EdgeOutcome } from '../../src/edge/types.js';

const good: EdgeOutcome = { handling: 'defined', rung: 'r', problems: [], facts: { x: 1 } };

describe('firstStanding', () => {
  it('runs the seed itself first, then H32 states, deterministically and distinct', () => {
    expect(standingSeed(42, 0)).toBe(42);
    const states = Array.from({ length: STANDING_TRIES }, (_, j) => standingSeed(42, j));
    expect(new Set(states).size).toBe(STANDING_TRIES);
    expect(states).toEqual(Array.from({ length: STANDING_TRIES }, (_, j) => standingSeed(42, j)));
    expect(standingSeed(43, 1)).not.toBe(standingSeed(42, 1));
    expect(() => standingSeed(42, STANDING_TRIES)).toThrow(RangeError);
    expect(() => standingSeed(42, -1)).toThrow(RangeError);
  });

  it('returns the first state that stands, its seed and try count in the facts', () => {
    const seen: number[] = [];
    const o = firstStanding(7, (s): Attempt => {
      seen.push(s);
      return { outcome: good, unmet: seen.length < 3 ? ['the plant never fired'] : [] };
    });
    expect(seen).toEqual([0, 1, 2].map((j) => standingSeed(7, j)));
    expect(o.problems).toEqual([]);
    expect(o.facts).toEqual({ x: 1, stateSeed: standingSeed(7, 2), tries: 3 });
  });

  it('never retries a problem: an attempt with one is returned at once, whatever its preparation', () => {
    let n = 0;
    const o = firstStanding(7, (): Attempt => {
      n += 1;
      return { outcome: { ...good, problems: ['the arena fails x'] }, unmet: ['the prepared state did not stand'] };
    });
    expect(n).toBe(1);
    expect(o.problems).toEqual(['the arena fails x']);
  });

  it('never catches a throw', () => {
    expect(() => firstStanding(7, () => { throw new Error('boom'); })).toThrow('boom');
  });

  it('carries every lawful-input refusal of every attempt, each with the state that replays it (J264, C-NEWROW (2))', () => {
    let n = 0;
    const o = firstStanding(11, (): Attempt => {
      n += 1;
      return { outcome: good, unmet: n < 3 ? ['the prepared state did not stand: S4 refused E_INVARIANT'] : [], lawful: n < 3 ? [{ stage: 'S4', code: 'E_INVARIANT', where: 'preparation', detail: `try ${String(n)}` }] : [] };
    });
    expect(o.lawful).toEqual([1, 2].map((t) => ({ stateSeed: standingSeed(11, t - 1), stage: 'S4', code: 'E_INVARIANT', where: 'preparation', detail: `try ${String(t)}` })));
    const none = firstStanding(12, (): Attempt => ({ outcome: good, unmet: ['x'], lawful: [{ stage: 'S1', code: 'E_INVARIANT', where: 'preparation', detail: 'd' }] }));
    expect(none.lawful).toHaveLength(STANDING_TRIES);
    expect(firstStanding(13, (): Attempt => ({ outcome: good, unmet: [] })).lawful).toEqual([]);
  });

  it('fails naming every state when none stands', () => {
    const o = firstStanding(9, (s): Attempt => ({ outcome: good, unmet: [`miss ${String(s)}`] }));
    expect(o.problems).toHaveLength(1);
    expect(o.problems[0]).toMatch(new RegExp(`^no state of ${String(STANDING_TRIES)} stood — `));
    for (let j = 0; j < STANDING_TRIES; j += 1) expect(o.problems[0]).toContain(`miss ${String(standingSeed(9, j))}`);
    expect(o.facts.tries).toBe(STANDING_TRIES);
  });
});

// One replay seed per cause the checker's 1 000-seed run found (checks/M0-x-06.md (8), B3): the fixture's first state
// misses its home there, so the run passes only by taking a later state that stands. (River × frame's 1595424233 — S1
// refusing the river unplanted — left this list in round 2: M0-e-03 s1 commits that river, so its first state stands;
// repins.test.ts pins the committed outcome, N-56 (6).)
const MISSED: readonly [string, number, string][] = [
  ['EP-05/S5d', 3370761151, 'no face whose reserves cover its land'],
  ['EP-01/S5b/zero-area', 4289703501, 'no main road at stage 2'],
  ['EP-04/S5b', 2606651115, 'no stage k ≥ 2 with N_k ≤ c'],
  ['cell/bridge×frame', 430280188, 'no crossing site beyond the frame'],
];

describe('the states the 1 000-seed run found missing their homes now reach them (B3)', () => {
  for (const [id, seed, why] of MISSED) {
    it(`${id} at seed ${String(seed)} (${why})`, { timeout: 600_000 }, () => {
      const f = EDGE_FIXTURES.find((x) => x.id === id);
      expect(f).toBeDefined();
      if (f === undefined) return;
      const o = f.run(seed);
      expect(judgeEdgeOutcome(f, seed, o)).toBeNull();
      expect(o.facts.tries).toBeGreaterThan(1);
      expect(o.facts.stateSeed).not.toBe(seed);
    });
  }
});
