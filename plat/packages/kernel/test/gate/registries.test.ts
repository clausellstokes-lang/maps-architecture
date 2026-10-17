// The M0 close gate, row K6 (check/M0-world-sites-gate; docs/build/M0-world-sites-gate.md): the concern and stage
// registries are append-only without renumbering, and a stream keyed by a new concern and stage is independent of
// every existing stream. The registries are loaded once (registry/index.ts), so the append is shown on copies through
// the generator the committed ids.ts is held to (test/rng/gen-registry.ts): every existing constant keeps its id and
// the new rows take the next ids. The stream side reads the mixer: a stream key is one bijective finaliser round over
// the entity key and the packed (stage, concern, …) words (rng/mixer.ts), so for one entity key every registered
// (stage, concern) gives a distinct stream key, and the packed words of a (stage, concern) not yet registered give
// one distinct from them all — while `packComponents` refuses those ids today (the guard), so the only way such a
// stream comes to exist is an append, which moves no existing id and so no existing key.
import { describe, expect, it } from 'vitest';
import { CONCERN_COUNT, CONCERN_REGISTRY, CONCERNS, STAGE_COUNT, STAGE_REGISTRY, STAGE_VIEW, STAGES } from '../../src/registry/index.js';
import { mixInto, packComponents, seedKey, streamKey } from '../../src/rng/index.js';
import type { Hash128 } from '../../src/hash/index.js';
import type { ConcernId, StageId, StreamOpts } from '../../src/types/index.js';
import { readRegistry, REGISTRY_DIR, renderIds } from '../rng/gen-registry.js';

const OPTS: StreamOpts = { reroll: 0, attempt: 0, epoch: 0, salt: 0 };
const hex = (h: ArrayLike<number>): string => Array.from(h, (w) => (w >>> 0).toString(16).padStart(8, '0')).join('');

describe('K6: the concern and stage registries append without renumbering', () => {
  it('appending a concern and a stage keeps every existing constant at its id; the new rows take the next ids', () => {
    const concerns = readRegistry('concerns', REGISTRY_DIR);
    const stages = readRegistry('stages', REGISTRY_DIR);
    const more = {
      concerns: { ...concerns, version: concerns.version + 1, rows: [...concerns.rows, { id: concerns.rows.length, name: 'site.world' }] },
      stages: { ...stages, version: stages.version + 1, rows: [...stages.rows, { id: stages.rows.length, name: 'SITE' }] },
    };
    const before = renderIds(concerns, stages);
    const after = renderIds(more.concerns, more.stages);
    expect(after).not.toBe(before);
    for (const row of CONCERN_REGISTRY.rows) {
      const line = `'${row.name}': ${String(row.id)} as ConcernId,`;
      expect(before).toContain(line);
      expect(after).toContain(line);
    }
    for (const row of STAGE_REGISTRY.rows) {
      const line = `'${row.name}': ${String(row.id)} as StageId,`;
      expect(before).toContain(line);
      expect(after).toContain(line);
    }
    expect(after).toContain(`'site.world': ${String(CONCERN_COUNT)} as ConcernId,`);
    expect(after).toContain(`'SITE': ${String(STAGE_COUNT)} as StageId,`);
    // A row removed (ids no longer dense in row order) is refused by the generator; an insertion that shifts the ids
    // stays dense and so passes the generator, but moves every existing constant — what the committed snapshot test
    // (test/rng/registry.test.ts, C-0020) refuses: the append-only rule is the snapshot's, not the loader's.
    expect(() => renderIds({ ...concerns, rows: concerns.rows.slice(1) }, stages)).toThrow(/dense/);
    const shifted = renderIds({ ...concerns, rows: [{ id: 0, name: 'site.world' }, ...concerns.rows.map((r) => ({ ...r, id: r.id + 1 }))] }, stages);
    expect(shifted).not.toContain(`'terrain.noise': 0 as ConcernId,`);
    expect(shifted).toContain(`'terrain.noise': 1 as ConcernId,`);
  });

  it('STAGE_VIEW stays outside the table: an appended stage takes STAGE_COUNT, never 0xffff', () => {
    expect(STAGE_VIEW).toBe(0xffff);
    expect(STAGE_COUNT).toBeLessThan(STAGE_VIEW);
    expect(STAGE_REGISTRY.rows.length).toBe(STAGE_COUNT);
    expect(Object.keys(STAGES).length).toBe(STAGE_COUNT);
    expect(Object.keys(CONCERNS).length).toBe(CONCERN_COUNT);
  });
});

describe('K6: a stream keyed by a new (stage, concern) is independent of every existing stream', () => {
  it('for one entity key, every registered (stage, concern) gives a distinct stream key, and an unregistered pair one distinct from them all', () => {
    const entity = seedKey(0x5eed) as Readonly<Hash128>;
    const seen = new Map<string, string>();
    for (let s = 0; s < STAGE_COUNT; s++) {
      for (let c = 0; c < CONCERN_COUNT; c++) {
        if (CONCERN_REGISTRY.rows[c].retired) continue; // a retired id is refused by the guard (T41-1)
        const k = hex(streamKey(entity, s as StageId, c as ConcernId, OPTS));
        expect(seen.has(k), `stage ${String(s)} concern ${String(c)} collides with ${seen.get(k) ?? ''}`).toBe(false);
        seen.set(k, `stage ${String(s)} concern ${String(c)}`);
      }
    }
    // The next ids on both registries: refused by the guard today …
    const stage = STAGE_COUNT as StageId;
    const concern = CONCERN_COUNT as ConcernId;
    expect(() => packComponents(stage, concern, OPTS)).toThrow();
    // … and, packed as the mixer packs a registered pair (stage ≪ 16 | concern, reroll ≪ 16 | salt, epoch, attempt),
    // their stream key is distinct from every registered one: the round is a bijection on the packed words.
    const packed: Hash128 = [((stage << 16) | concern) >>> 0, 0, 0, 0];
    const out: Hash128 = [0, 0, 0, 0];
    mixInto(out, entity, packed);
    expect(seen.has(hex(out))).toBe(false);
    // A registered pair packed by hand gives the mixer's own key: the key is a pure function of the ids, nothing else.
    const check: Hash128 = [0, 0, 0, 0];
    mixInto(check, entity, [((STAGES.S1 << 16) | CONCERNS['water.river']) >>> 0, 0, 0, 0]);
    expect(hex(check)).toBe(hex(streamKey(entity, STAGES.S1, CONCERNS['water.river'], OPTS)));
  });
});
