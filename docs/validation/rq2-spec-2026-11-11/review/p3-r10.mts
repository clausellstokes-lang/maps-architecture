// Probe 3 (R10): P16 on today's code; the "+1" collision sequence emulated; G-LATE's observability (a maintained digest
// state keyed on another generation is silently rebuilt on read, so a digest-equality pin cannot see it).
const W = '/home/user/maps-scratch/gates-a11s6/plat/packages/kernel';
const TX = await import(`${W}/src/tx/index.ts`);
const IO = await import(`${W}/src/io/index.ts`);
const RS = await import(`${W}/src/arena/resolve.ts`);
const DG = await import(`${W}/src/digest/index.ts`);
const IC = await import(`${W}/src/insert/insertChain.ts`);
const S = await import(`${W}/test/insert/step3-5/support.ts`);
const T = await import(`${W}/test/tx/support.ts`);
const log = (...a: unknown[]) => console.log(...a);
const env = { onCommit: DG.updateLevelDigests };
function chain(p: any, y: number, e: string) {
  const r = TX.tx(p, T.spec(2), (o: any) => IC.insertChain(o, [S.pt(500, y), S.pt(3500, y)], [{ role: 'invisible', entity: e }], 'mandatory'), env);
  if (!r.ok) throw new Error(`${r.code} ${r.detail}`);
}
const p = S.framed(4000);
DG.attachLevelDigests(p);
const sp0 = TX.takeSavepoint(p);
chain(p, 1000, 'c:1');
log('P16 compact: isCurrent(compactSlots(p), stamp(p)) =', RS.isCurrent(IO.compactSlots(p), RS.stamp(p)), 'at version', p.version);
const dec = IO.decodeArena(IO.encodeArena(p), p.key);
log('P16 load:    isCurrent(decode(encode(p)), stamp(p)) =', dec.ok && RS.isCurrent(dec.value, RS.stamp(p)), '(load version', dec.ok ? dec.value.version : '-', ')');

// The "+1" collision, emulated with today's means: q = compactSlots(p) then q's generation moved to 1 by a restore on q
// (what "+1" would give it at once); p restores across committed batches (generation 1) and commits back to q's version.
const q = IO.compactSlots(p);
const sq = TX.takeSavepoint(q);
chain(q, 1500, 'q:1');
TX.restoreSavepoint(sq);
log('q: generation', TX.restoreGeneration(q), 'version', q.version);
TX.restoreSavepoint(sp0);
chain(p, 3000, 'p:3');
log('p: generation', TX.restoreGeneration(p), 'version', p.version, '— content differs from q:', S.contentPrint(p) !== S.contentPrint(q));
log('COLLISION: isCurrent(q, stamp(p)) =', RS.isCurrent(q, RS.stamp(p)));

// G-LATE: digests attached on a copy BEFORE its generation moves. Emulated: the copy's state built at generation 0, then
// the generation moved (a restore on the copy). Read: equal to the recomputation, by a silent rebuild.
const c = IO.compactSlots(p);
log('copy: has digests', DG.hasLevelDigests(c), 'builds', DG.levelDigestBuilds(c));
const sc = TX.takeSavepoint(c);
chain(c, 2500, 'c:2');
TX.restoreSavepoint(sc);
const eq = [0, 1, 2, 3, 4].every((l) => JSON.stringify(Array.from(DG.levelDigest(c, l) as ArrayLike<number>)) === JSON.stringify(Array.from(DG.recomputeLevelDigest(c, l) as ArrayLike<number>)));
log('after the generation moved under an attached state: levelDigest == recompute at every level:', eq, '; builds now', DG.levelDigestBuilds(c));
