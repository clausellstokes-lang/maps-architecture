# Step 4 — THE B-FUZZ BANDS POPULATION under P (partial: P done; BASE at the same seed queued)

P: the suite's chunk 001 (results/step2/P/001.log; `PLAT_FUZZ_SEED=20261112 corepack pnpm exec vitest run --maxWorkers=1 ...bands/*` from tree/plat, PR size 10^4).
bfuzz.test.ts GREEN on P (3/3 tests, 246 s). No throw out of exactRegion (no `check` failure: the file is green and no
E_INVARIANT / 'exactRegion:' message appears in the log).

P census lines (verbatim):
    B-FUZZ bands: 10000 networks, 9985 committed; refusals per operation {"kerb":{"insertChain":0,"own":0},"corridorUnion":{"insertChain":15,"own":0},"bandUnion":{"insertChain":29,"own":0}} ...; by cause {"bandUnion":{"replays":29},"corridorUnion":{"replays":15}}; closings {"chord":0,"along":27,"pinned":2,"folded":2,"longestChordCm":0}
    B-FUZZ bands (widened): 2000 networks, 1999 committed, 732 faces with a hole; refusals per operation {"kerb":{"insertChain":0,"own":0},"corridorUnion":{"insertChain":0,"own":1},"bandUnion":{"insertChain":0,"own":0}} ...; by cause {"corridorUnion":{"own":1}}; closings {"chord":0,"along":5,"pinned":0,"folded":18,"longestChordCm":0}
The REFUSAL lines (45): 29 bandUnion insertChain, 15 corridorUnion insertChain (all E_INVARIANT 'insert: no route from … keeps
clearance (§3.10) within the fidelity bound (N-43)', cause 'replays'), and 1 corridorUnion OWN refusal in the widened family:
    E_INVARIANT outline: piece 0 of the face 3 ends on a dangling tip at (1149, 2640), off the face's boundary (N-57 (2)) INPUT [{"kind":"dead","a":4198,"b":3263,"x":1149,"y":2640,"w":1274,"h":649,"hw":1,"knots":null,"ends":"square"},{"kind":"bent","a":1192,"b":15606,"x":2755,"y":1725,"w":1363,"h":780,"hw":25,"knots":[96,176],"ends":"round"}]
S20's BASE lines (row 207, a different seed): kerb insertChain 4, corridorUnion 8, bandUnion 4; widened kerb 6, corridorUnion 6, bandUnion 0, own 0.

## BASE at the same seed (done)
Command: `scripts/bfuzz-base.sh` = from base/plat, `PLAT_FUZZ_SEED=20261112 corepack pnpm exec vitest run --maxWorkers=1 --silent=false --project kernel packages/kernel/test/arr/bands/bfuzz.test.ts`; log results/step4/bfuzz-B.log; 3/3 green.
    B-FUZZ bands: 10000 networks, 9984 committed; refusals per operation {"kerb":{"insertChain":11,"own":0},"corridorUnion":{"insertChain":16,"own":0},"bandUnion":{"insertChain":5,"own":0}} ...; by cause {"kerb":{"no-route":2,"displaced":7,"merged":2},"corridorUnion":{"no-route":2,"replays":5,"displaced":7,"merged":2},"bandUnion":{"displaced":3,"no-route":1,"replays":1}}; closings {"chord":0,"along":6,"pinned":0,"folded":0,...}
    B-FUZZ bands (widened): 2000 networks, 1987 committed, 732 faces with a hole; refusals per operation {"kerb":{"insertChain":12,"own":0},"corridorUnion":{"insertChain":12,"own":1},"bandUnion":{"insertChain":0,"own":0}} ...; by cause {"kerb":{"no-route":11,"displaced":1},"corridorUnion":{"no-route":11,"own":1,"displaced":1}}
REFUSAL lines: BASE 57 (kerb 23, corridorUnion 28 + own 1, bandUnion 5); P 45 (kerb 0, corridorUnion 15 + own 1, bandUnion 29).

## P against BASE, per operation and class (same seed 20261112, PR size)
| family / operation | cause | BASE | P |
|---|---|---|---|
| main / kerb | no-route, displaced, merged | 2 / 7 / 2 (11) | 0 |
| main / corridorUnion | no-route, displaced, merged | 2 / 7 / 2 | 0 |
| main / corridorUnion | **replays** | 5 | **15** |
| main / bandUnion | displaced, no-route | 3 / 1 | 0 |
| main / bandUnion | **replays** | 1 | **29** |
| widened / kerb | no-route, displaced | 11 / 1 (12) | 0 |
| widened / corridorUnion | no-route, displaced | 11 / 1 | 0 |
| widened / corridorUnion | own (a dangling tip, N-57 (2)) | 1 | 1 (another network) |
| committed networks | main / widened | 9 984 / 1 987 | 9 985 / 1 999 |
**Two classes RISE under P** (the bar "no class may rise" fails): corridorUnion's insertChain 'replays' 5 → 15 and
bandUnion's 'replays' 1 → **29** — the door refusing to lay X's outline ("insert: no route from … keeps clearance (§3.10)
within the fidelity bound (N-43)"). All kerb-read refusals vanish (the read no longer inserts), and the dry run's
no-route / displaced / merged classes go with them. No throw out of exactRegion (both files green; no check message).
Committed networks: P 9 985 + 1 999 against BASE 9 984 + 1 987 (P commits 13 more in all).
