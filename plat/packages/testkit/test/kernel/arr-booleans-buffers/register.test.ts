// M0-a-08's refusal register (N-44 (4); N-46 (5); fix round S1, C-0231) and the PENDING-S3 lines it clears (N-43, N-44:
// "M0-a-08's PENDING-S3 lines clear when line A no longer throws and line B either commits within the bound or is
// refused within the cap"). Each registered case — its operation and its whole input, from the PR-size measure of the
// round (`refused`) or from the repros the PENDING-S3 lines were classified on (`pending`) — is run through the same
// judge as the agreement runs, and must end one of two ways:
//  - refused, with a typed refusal (never a throw) that replays on insertChain alone (`classifyRefusal`) — insertChain's,
//    counted against the family's measured cap in the agreement runs; a refusal caused in arr/ cannot hide here;
//  - committed, and then judged against both oracles and passing (a later insertChain round that turns a refusal into a
//    commit passes too, as a commit within §3.7 (i)'s bars; its row then leaves the register).
import { readFileSync } from 'node:fs';
import { beforeAll, describe, expect, it } from 'vitest';
import { loadOracles } from '../../../src/oracles/index.js';
import {
  judgeBoolean,
  judgeBuffer,
  judgeInset,
  judgeOffset,
  newHarness,
  type BooleanCase,
  type BufferCase,
  type FaceCase,
  type Harness,
} from './support.js';

/** One registered case: its id, its operation, why it is here and its whole input (the judge's case). */
interface Registered {
  id: string;
  op: 'union' | 'intersection' | 'difference' | 'xor' | 'buffer' | 'offsetFace' | 'insetRing';
  note: string;
  input: unknown;
}

const REGISTER = JSON.parse(readFileSync(new URL('./register.json', import.meta.url), 'utf8')) as { pending: Registered[]; refused: Registered[] };

beforeAll(async () => {
  await loadOracles();
});

/** The case run through its judge: no throw; the harness after it. */
function rerun(c: Registered): Harness {
  const h = newHarness();
  expect(() => {
    if (c.op === 'buffer') judgeBuffer(h, c.input as BufferCase);
    else if (c.op === 'offsetFace') judgeOffset(h, c.input as FaceCase);
    else if (c.op === 'insetRing') judgeInset(h, c.input as FaceCase);
    else judgeBoolean(h, c.input as BooleanCase);
  }).not.toThrow();
  return h;
}

/** Refused as insertChain's, or committed and passing against both oracles. */
function cleanOutcome(c: Registered, h: Harness): 'refused' | 'committed' {
  const t = h.engineRefusals;
  expect(t.own, `${c.id}: a refusal that does not replay on insertChain alone — ${t.ownCases.join(' | ')}`).toBe(0);
  if (t.insertChain === 1) {
    expect(Object.keys(t.byCode).every((k) => k.startsWith('insertChain/')), `${c.id}: ${JSON.stringify(t.byCode)}`).toBe(true);
    return 'refused';
  }
  expect(t.insertChain).toBe(0);
  expect(h.failures, c.id).toEqual([]);
  expect(h.invalid, c.id).toEqual([]);
  const line = h.report.line(c.op);
  expect(line.draws, `${c.id}: judged against the oracles`).toBe(1);
  expect(line.unattractedPass + line.attractedPass).toBe(1);
  return 'committed';
}

describe('the PENDING-S3 lines (N-43 A and B; N-44): every repro refuses as insertChain’s or commits within the bars', () => {
  for (const c of REGISTER.pending) {
    it(`${c.id} (${c.op}): ${c.note}`, () => {
      const h = rerun(c);
      const outcome = cleanOutcome(c, h);
      console.info(`register ${c.id}: ${outcome} ${JSON.stringify(h.engineRefusals.byCode)}`);
    });
  }
});

describe('the refusal register (N-44 (4)): each case refuses cleanly as insertChain’s, or commits and agrees', () => {
  it('holds a case of every family that refused in the round’s measure', () => {
    expect(REGISTER.refused.length).toBeGreaterThan(0);
  });
  for (const c of REGISTER.refused) {
    it(`${c.id} (${c.op}): ${c.note}`, () => {
      cleanOutcome(c, rerun(c));
    });
  }
});
