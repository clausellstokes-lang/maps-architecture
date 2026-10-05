// M0-d-08: what the bars compare "bit for bit" (C-0199 (1)): a commit's outcome is its record (created / changed faces
// by canonical key, in the record's order), the five level digests and the arena print. These tests pin that the
// outcome print — and its digest, which the harnesses compare first — sees each part alone: an arena change that the
// record and the level digests do not see, and a change to the record's created / changed lists (content or order)
// on an unchanged arena. Without them a kernel slot dependence visible only in the arena, or only in the record's
// dirty-face lists, would pass every bar (check M0-d-08 B-2).
import { describe, expect, it } from 'vitest';
import { isFaceLive, isVertexLive, type CommitRecord, type Committed, type KernelResult, type Plat } from '@plat/kernel';
import { arenaPrint, determinismDigestText, levelDigestsHex, outcomePrint, recordPrint, runBatch } from '@plat/testkit';
import { KERNEL_SEQUENCES } from './support.js';

type Result = KernelResult<Committed<unknown>>;

/** The grid fixture run up to batch `k`, then batch `k` itself: the arena and its committed result. */
function committed(k: number): { p: Plat; r: Result; record: CommitRecord } {
  const s = KERNEL_SEQUENCES[0];
  const p = s.arena();
  for (const b of s.batches.slice(0, k)) runBatch(p, b.build(p));
  const r = runBatch(p, s.batches[k].build(p));
  if (!r.ok || r.value.record === null) throw new Error(`support: batch ${k} of the grid fixture did not commit`);
  return { p, r, record: r.value.record };
}

/** The same result carrying another record. */
function withRecord(r: Result, record: CommitRecord): Result {
  if (!r.ok) throw new Error('support: a refusal has no record');
  return { ...r, value: { ...r.value, record } };
}

/** The record with one level's dirty-face lists replaced. */
function editFaces(record: CommitRecord, level: number, edit: (created: number[], changed: number[]) => [number[], number[]]): CommitRecord {
  return {
    ...record,
    faces: record.faces.map((d) => {
      if (d.level !== level) return d;
      const [created, changed] = edit([...d.created], [...d.changed]);
      return { ...d, created, changed };
    }),
  };
}

describe('outcomePrint: a commit is its record, its level digests and its arena — each seen alone', () => {
  it('an arena change neither the record nor the level digests see (a vertex flag, a face\'s stage rank) changes the print and its digest', () => {
    const edits: [string, (p: Plat, named: Set<string>) => void][] = [
      ['vertex flag', (p) => {
        let v = 0;
        while (!isVertexLive(p, v)) v++;
        p.vertices.flags[v] ^= 1;
      }],
      ['stage of an L1 face the record does not name', (p, named) => {
        let f = 0;
        while (!isFaceLive(p, 1, f) || named.has(`1:${f}`)) f++;
        p.faces[1].stage[f] += 1;
      }],
    ];
    for (const [what, edit] of edits) {
      const { p, r, record } = committed(2);
      const named = new Set(record.faces.flatMap((d) => [...d.created, ...d.changed].map((f) => `${d.level}:${f}`)));
      const base = outcomePrint(p, r);
      const rec = recordPrint(p, record);
      const digests = levelDigestsHex(p).join(' ');
      const arena = arenaPrint(p);
      edit(p, named);
      // the precondition: only the arena print sees the edit
      expect(recordPrint(p, record), what).toBe(rec);
      expect(levelDigestsHex(p).join(' '), what).toBe(digests);
      expect(arenaPrint(p), what).not.toBe(arena);
      // so the outcome must carry the arena to see it
      const after = outcomePrint(p, r);
      expect(after, what).not.toBe(base);
      expect(determinismDigestText(after), what).not.toBe(determinismDigestText(base));
    }
  });

  it('the record\'s created list: its order and its content (a face moved to changed) change the print and its digest; the arena unchanged', () => {
    const { p, r, record } = committed(2);
    const l2 = record.faces.find((d) => d.level === 2);
    expect(l2?.created.length).toBeGreaterThanOrEqual(2);
    const arena = arenaPrint(p);
    const base = outcomePrint(p, r);
    const variants: [string, CommitRecord][] = [
      ['created reversed', editFaces(record, 2, (c, ch) => [c.slice().reverse(), ch])],
      ['created rotated', editFaces(record, 2, (c, ch) => [[...c.slice(1), c[0]], ch])],
      ['one created face moved to changed', editFaces(record, 2, (c, ch) => [c.slice(1), [...ch, c[0]]])],
      ['one created face dropped', editFaces(record, 2, (c, ch) => [c.slice(1), ch])],
    ];
    for (const [what, rec] of variants) {
      expect(recordPrint(p, rec), what).not.toBe(recordPrint(p, record));
      const after = outcomePrint(p, withRecord(r, rec));
      expect(after, what).not.toBe(base);
      expect(determinismDigestText(after), what).not.toBe(determinismDigestText(base));
    }
    expect(arenaPrint(p)).toBe(arena);
    // the unedited copy prints the same (the edit, not the copying, is what is seen)
    expect(outcomePrint(p, withRecord(r, editFaces(record, 2, (c, ch) => [c, ch])))).toBe(base);
  });

  it('the record\'s changed list: its order and its content change the print and its digest', () => {
    const { p, r, record } = committed(1);
    const l1 = record.faces.find((d) => d.level === 1);
    expect(l1?.changed.length).toBeGreaterThanOrEqual(2);
    const base = outcomePrint(p, r);
    const variants: [string, CommitRecord][] = [
      ['changed reversed', editFaces(record, 1, (c, ch) => [c, ch.slice().reverse()])],
      ['two changed faces swapped', editFaces(record, 1, (c, ch) => [c, [ch[1], ch[0], ...ch.slice(2)]])],
      ['one changed face moved to created', editFaces(record, 1, (c, ch) => [[...c, ch[0]], ch.slice(1)])],
      ['one changed face dropped', editFaces(record, 1, (c, ch) => [c, ch.slice(1)])],
    ];
    for (const [what, rec] of variants) {
      const after = outcomePrint(p, withRecord(r, rec));
      expect(after, what).not.toBe(base);
      expect(determinismDigestText(after), what).not.toBe(determinismDigestText(base));
    }
  });
});
