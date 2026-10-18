// M0-k-02's listed test "every §13.1 constructive bullet maps to at least one case id (a coverage table against the
// section's list, checked by the checker)": the hand-written table of §13.1 (2)'s clauses (and §3.11's row items, and
// the paragraphs after the list) against the set — every bullet has clauses, every clause has cases that exist, every
// case is some clause's, each in its bullet's class — and the table printed for the checker's walk.
import { describe, expect, it } from 'vitest';
import { CONSTRUCTIVE_BULLETS, CONSTRUCTIVE_CLASSES, CONSTRUCTIVE_COVERAGE, CONSTRUCTIVE_SET, constructiveCase, formatConstructiveCoverage, type ConstructiveClass } from '@plat/testkit';

/** The class a §13.1 bullet's cases carry (null: a row of another bullet's cases — §3.11's cross-references, the ladder inputs). */
const CLASS_OF_BULLET: Readonly<Record<string, ConstructiveClass | null>> = {
  'geometry classes': 'geometry',
  quantisation: 'quantisation',
  'attraction and moves': 'attraction-moves',
  'kept content, carves and water edits': 'kept-carves-water',
  'removals, profiles and neighbour steps': 'removals-profiles-neighbours',
  'stretch-state writes': 'stretch-state-writes',
  'indexes, slots and the pool': 'indexes-slots-pool',
  'straight-skeleton fixtures (M0)': 'skeleton-fixtures',
  'the kernel at its limits (§3.11)': null,
  'expectations (§3.3 Expectations)': 'expectations',
  "the kernel's further limits": 'further-limits',
  'fixtures of items 12 and 28': 'fixtures-items-12-28',
  'fixtures of items 45, 53 and 65': 'fixtures-items-45-53-65',
  'ladder coverage: one degenerate input of each kind per failure class (F-NUM, F-SKELETON kernel side)': null,
};

describe('the coverage table against §13.1 (2)', () => {
  it('lists §13.1 (2)’s eleven bullets in order, then the two fixture paragraphs and the ladder coverage’s inputs', () => {
    expect(CONSTRUCTIVE_BULLETS).toEqual(Object.keys(CLASS_OF_BULLET));
    expect(CONSTRUCTIVE_BULLETS).toHaveLength(14);
  });

  it('gives every bullet at least one clause, and every clause a known bullet', () => {
    for (const b of CONSTRUCTIVE_BULLETS) expect(CONSTRUCTIVE_COVERAGE.filter((r) => r.bullet === b).length, b).toBeGreaterThan(0);
    for (const r of CONSTRUCTIVE_COVERAGE) expect(CONSTRUCTIVE_BULLETS, r.clause).toContain(r.bullet);
  });

  it('maps every clause to at least one case id, and every id to a case of the set', () => {
    for (const r of CONSTRUCTIVE_COVERAGE) {
      expect(r.cases.length, r.clause).toBeGreaterThan(0);
      for (const id of r.cases) expect(constructiveCase(id), `${r.clause} → ${id}`).toBeDefined();
    }
  });

  it('lists every case of the set under some clause (no case outside the section)', () => {
    const listed = new Set(CONSTRUCTIVE_COVERAGE.flatMap((r) => r.cases));
    const unlisted = CONSTRUCTIVE_SET.map((c) => c.id).filter((id) => !listed.has(id));
    expect(unlisted).toEqual([]);
  });

  it('keeps each bullet’s cases in its class (§3.11 and the ladder inputs name other bullets’ cases)', () => {
    for (const r of CONSTRUCTIVE_COVERAGE) {
      const cls = CLASS_OF_BULLET[r.bullet];
      if (cls === null || cls === undefined) continue;
      for (const id of r.cases) expect(constructiveCase(id)?.class, `${r.bullet} → ${id}`).toBe(cls);
    }
    // §3.11's rows: every row of the table appears (§3.11 "Each item below is a case of §13.1's constructive set").
    const limits = CONSTRUCTIVE_COVERAGE.filter((r) => r.bullet === 'the kernel at its limits (§3.11)').map((r) => r.clause);
    for (const rowName of ['no input', 'one item', 'the caps', 'degenerate geometry', 'missing data', 'every rung', 'every toggle and preset', 'save, load', 'undo and redo', 'regenerate', 'declared shift', 'migrate']) {
      expect(limits.some((c) => c.includes(rowName)), rowName).toBe(true);
    }
  });

  it('gives every class of the set a case and every case a class of the list', () => {
    for (const k of CONSTRUCTIVE_CLASSES) expect(CONSTRUCTIVE_SET.some((c) => c.class === k), k).toBe(true);
    for (const c of CONSTRUCTIVE_SET) expect(CONSTRUCTIVE_CLASSES).toContain(c.class);
  });

  it('names every (failure class, kind) pair of the ladder coverage once, by the tagged case', () => {
    const rows = CONSTRUCTIVE_COVERAGE.filter((r) => r.bullet.startsWith('ladder coverage'));
    expect(rows).toHaveLength(10);
    for (const r of rows) {
      const [fc, kind] = r.clause.split(', ');
      expect(r.cases).toHaveLength(1);
      expect(constructiveCase(r.cases[0])?.ladder, r.clause).toEqual({ failureClass: fc, kind });
    }
    const tagged = CONSTRUCTIVE_SET.filter((c) => c.ladder !== undefined).map((c) => c.id).sort();
    expect(tagged).toEqual(rows.map((r) => r.cases[0]).sort());
  });

  it('prints the table with every case and its milestone, none missing (the checker walks it)', () => {
    const table = formatConstructiveCoverage((id) => constructiveCase(id)?.milestone);
    expect(table).not.toContain('MISSING');
    for (const c of CONSTRUCTIVE_SET) expect(table).toContain(`${c.id} (${c.milestone})`);
    expect(table.split('\n')).toHaveLength(CONSTRUCTIVE_COVERAGE.length + 2);
  });

  it('expects a refusal of every case under §3.11’s "zero-area or pinched face never commits", the pinched cut’s E_NOT_TWO_CROSSINGS (C-0187 (5))', () => {
    const rows = CONSTRUCTIVE_COVERAGE.filter((r) => r.clause.startsWith('degenerate geometry:') && r.clause.includes('face never commits'));
    expect(rows).toHaveLength(2);
    const ids = rows.flatMap((r) => r.cases);
    expect(ids).toContain('limit/degen-zero-area-face');
    expect(ids).toContain('limit/degen-pinched-face');
    for (const id of ids) expect(constructiveCase(id)?.expect.outcome, id).not.toBe('ok');
    const pinched = constructiveCase('limit/degen-pinched-face')?.expect;
    expect(pinched?.outcome).toBe('refused');
    expect(pinched?.code).toBe('E_NOT_TWO_CROSSINGS');
    expect(pinched?.holds).toContain('version-kept');
  });
});
