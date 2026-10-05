// M0-a-06's batch fixtures (fixtures/sequences.json), the inputs M0-d-08's determinism harness runs (§13.1's slot
// renumbering; §13.2's callback issue order and digests, wave 9). This item's own checks over them: every batch ends as
// its fixture expects; a sequence run twice gives identical arenas and commit records; a declared batch's ops issued in
// reverse give the same result; every committed arena passes the oracles.
import { describe, expect, it } from 'vitest';
import { runSequence, SEQUENCES } from './fixtures.js';
import { healthy } from './support.js';

describe('the batch fixtures', () => {
  for (const seq of SEQUENCES) {
    it(seq.name, () => {
      const a = runSequence(seq);
      const kinds = a.outcomes.map((o) => (o.startsWith('commit') ? 'commit' : o));
      expect(kinds).toEqual(seq.batches.map((b) => b.expect));
      healthy(a.p);
      const b = runSequence(seq);
      expect(b.outcomes).toEqual(a.outcomes);
      const c = runSequence(seq, true);
      expect(c.outcomes).toEqual(a.outcomes);
    });
  }
});
