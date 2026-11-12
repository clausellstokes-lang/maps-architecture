# Step 3 — S9 COMMITS X (draft F0-5 / F0-6)

## (b) The fusion harness: S8 ≡ S9, P against BASE

Two probes, both one process, source mode (tsx --conditions=plat-source), each a fresh derive:
- `probes/s9.ts` (results/step3/): derive + the harness's own `measure()` (its `s8s9`), with the inert counters.
- `probes/s9b.ts` (results/step3b/): derive, then measure.ts's `s8s9` REPLICATED step for step (its L1 `kerb()` reads per
  block seed, `corridorUnion` per district in one L2 batch each, `compareBoundaries` within S8S9_BOUND_SQ) so that every
  non-exact block's difference can be classified (working − S9 and S9 − working by exactRegion; each piece's area and
  thickness 2·area ⁄ perimeter; THIN = every piece thinner than attractCm 26 cm) and every far vertex (farther than the
  bound from the other boundary) located on F. VALIDATED: the replicate's figures equal measure()'s on every seed run both
  ways (B fusion 1 TEST exact 108/112 = 0.964, max 19.21; P fusion 1 TEST beyond 28, exact 0.066, max 201.81; P fusion 3
  CITY beyond 171, exact 75/1 254 = 0.0598, max 229.63), and the BASE roots equal S20's (fusion 1 5ca73bb6…, fusion 2
  5860f66d…, integrated 1 6770012c…, integrated 2 63a5d584…; fusion 3 CITY s8 reads 2 764 = S20 P7).
Commands: `scripts/s9-run.sh <P|B> <run> <seed> [test]` (from probeP/ or probeB/ plat/).

| run (seed, size) | mode | root | cuts / blocks | S8 refused | S9 refused | compared | exact-0 | exact share | within 1 cm | beyond (> 73.54) | max cm | p50 / p95 cm | seeds not on a face / sharing a face |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| fusion 1 TEST | BASE | 5ca73bb609c457f9cad5647edbf3df35 | 105 / 103 | 0 | 0 | 112 | 108 | 0.964 | 109 | 0 | 19.21 | 0 / 0 | 0 / 0 |
| fusion 1 TEST | P | ddacab3600ba544620c8f741a20ea571 | 99 / 100 | 0 | 0 | 106 | 7 | 0.066 | 41 | **28** | 201.81 | 1.98 / 176.15 | 0 / 0 |
| fusion 2 TEST | BASE | 5860f66d5dfad7d32f6257ab398ecf56 | 108 / 103 | 0 | 0 | 115 | 114 | 0.991 | 115 | 0 | 1.00 | 0 / 0 | 0 / 0 |
| fusion 2 TEST | P | 4cfb056381f57ea12f047413dbac2076 | 107 / 103 | 0 | 0 | 114 | 7 | 0.061 | 47 | **30** | 203.79 | 1.63 / 189.60 | 0 / 0 |
| integrated 1 TEST | BASE | 6770012c6f75a48734cbbe2dc736b251 | 170 / 176 | 0 | 0 | 181 | 174 | 0.961 | 179 | 0 | 18.44 | 0 / 0 | 0 / 0 |
| integrated 1 TEST | P | 7fed43e7ce81e9c1d173e36e3f7429e3 | 168 / 174 | 0 | 0 | 179 | 21 | 0.117 | 65 | **67** | 214.44 | 7.00 / 178.24 | 0 / 0 |
| integrated 2 TEST | BASE | 63a5d584d7d0f65c2a71daf9b7e62eef | 166 / 170 | 0 | 0 | 178 | 176 | 0.989 | 178 | 0 | 1.00 | 0 / 0 | 0 / 0 |
| integrated 2 TEST | P | 0699bc90a532951dd4db783a02f86956 | 163 / 164 | 0 | 0 | 175 | 17 | 0.097 | 77 | **66** | 216.59 | 1.53 / 188.15 | 0 / 0 |
| fusion 3 CITY | BASE | (s8 reads 2 764 = S20) | 1 207 / 1 057 | 0 | 0 | 1 239 | 1 223 | 0.987 | 1 232 | 0 | 28.94 | 0 / 0 | 0 / 0 |
| fusion 3 CITY | P | 06e1fcdc6305272df72ec31ba2785867 | 1 222 / 1 060 | 0 | 0 | 1 254 | 75 | **0.060** | 661 | **171** | 229.63 | 1.00 / 171.69 | 0 / 0 |
(roots from probes/s9.ts — the harness's record; the replicate's root field is mis-encoded and not quoted.)
Distribution P fusion 3 CITY (every compared block): 0: 75; (0,1]: 586; (1,5]: 286; (5,30]: 127; (30,73.54]: 9; > 73.54: 171.

### What the beyond blocks are
- **Every beyond block, every seed, is THIN** (P: 28/28, 30/30, 67/67, 66/66, CITY 171/171): every piece of the difference
  between the planned block (X's component) and the committed face is thinner than attractCm (largest 2A/P 13.4 cm at
  TEST); and every NON-exact block is thin too (CITY 1 179 / 1 179).
- **Every far vertex is a PLANNED vertex at an F ROUTE VERTEX** (CITY: 206 of 208; the other 2 on F's boundary; TEST
  fusion 1: 36/36): X reaches F's corner through a needle the door cannot hold (vertices within attractCm merge, minEdge
  25 cm), and the commit folds it onto F's boundary. Hausdorff = the needle's length (to 2.3 m); area a few hundred cm².
- Dissected (probes/block.ts, fusion 1 TEST block:fa420b3dbdn80): way:a41rz… (hw 173.16, both ends junction-flat) ends
  flat at F's vertex (22065, −14360) where F's next edge (to (21309, −16207)) carries no width; the flat end's line and
  that edge differ by ~1.3°, so X holds a needle 173 cm long, 4 cm wide at its base — by the definition with the S15 end
  rule it IS kerb (outside every buffer). The construction never served it (its dry run is attracted the same way the
  commit is); S9's commit splits F's edge at (21999, −14520) and folds the needle. Step 5 shows the same needle class also
  arises at sub-centimetre depth from rounding (where X is wrong by < 1 cm).
- So the **draft 2.5's "the arena holds X as the door laid it, within 2·√2·attractCm" is FALSE as a Hausdorff statement**:
  the door moves no vertex beyond the bound, but it deletes needles longer than the bound.

### More seeds (CITY integrated 4 and fusion 4; same probe)
| run | mode | cuts / blocks | S8 / S9 refused | compared | exact share | beyond | of them thin | max cm | p50 / p95 cm | far vertices |
|---|---|---|---|---|---|---|---|---|---|---|
| integrated 4 CITY | BASE | 1 373 / 1 310 | 0 / 0 | 1 423 | 0.989 | 0 | – | 25.46 | 0 / 0 | – |
| integrated 4 CITY | P | 1 393 / 1 340 | 0 / 0 | 1 443 | **0.057** | **318** | 315 | **4 279.06** | 1.31 / 170.13 | 394 at an F route vertex, 10 on F's boundary, 11 inside F |
| fusion 4 CITY | BASE | 1 190 / 1 048 | 0 / 0 | 1 226 | 0.990 | 0 | – | 16.11 | 0 / 0 | – |
| fusion 4 CITY | P | 1 215 / 1 061 | 0 / 0 | 1 251 | **0.052** | **175** | 174 | 888.58 | 1.00 / 166.89 | 202 / 4 / 4 |
Seeds: on a face and alone in it at every seed, both modes. offRead / pinned-first: 0 at every seed (bandCore = core runs).
THE NON-THIN BEYOND BLOCKS (4: integrated 4 three, fusion 4 one; results/step3b/P-integrated-4-city.json (v3, every
non-thin kept) and P-fusion-4-city.json): each is a NECK — X's component holding the seed is two lobes joined through a
neck narrower than attractCm (the ring passes itself within centimetres, e.g. integrated 4 block:28qehg6ax72w6 near
(6642, −67046) / (6600, −66964)); the commit closes the neck, so the seed's committed face is one lobe and the other lobe
(126 m² there; 19.3 m² at block:7m6kx6av890rr; 8.4 m² at block:2cwf67ksrx06c and fusion 4's block:6th6q0vnnepda) is
planned in the block and committed outside it. Hausdorff 42.8 m, 15.0 m, 8.9 m, 8.9 m. The same R-8 resolution class
(a part of X thinner than the arena's attraction), but it moves a whole lobe of a block, not a sliver.

### offRead and the pinned-first retry (counted in the mirror: bandCore runs, retries by cause)
P, every seed (TEST and CITY fusion 3): bandCore calls = core runs = districts (7 / 7 / 11 / 12; CITY 32 / 32); retries for a
closing (`retryWrite`), for `offRead` (`retryOffRead`) and for a cut split (`retryCut`): **0** each — offRead never fires
under P (the rulings-after-review R-3/R-4 reading confirmed by count). BASE likewise 0 at these seeds.
S9's L2 work under P (CITY f3): 7 244 insertChain in the S9 batches (BASE 42 141 including its reads' 34 532 dry-run ones).

### The R-8 census (served kerbs' thin / small components and short edges; S8's needle refusals) — see results/step3-r8.md (queued run)
