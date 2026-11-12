# Step 6 — THE COST (informative only: a shared 4-core box, source mode; each run beside one other process of mine and
# other seats' runs)

Commands: `scripts/s9-run.sh P fusion 3 city` / `B fusion 3 city` (probes/s9b.ts; derive with the stage stamps of the
harness — `d.ins.stamps` — and the readKerb wrapper's own clock; P's phase clocks inside readKerb: readFace, the key
(exactKeyContentOfRead), the final exactRegion (exactRegionOfKey), splitsOn). Runs 2026-11-12 09:27 – 09:32 (both beside
the suite's one vitest worker). JSON: results/step3b/{P,B}-fusion-3-city.json (ms, counters.s8).

| fusion 3 CITY (source mode) | BASE (construction) | P (X) |
|---|---|---|
| S8 stage time (stamp) | 118 292 ms | 25 696 ms |
| S8 cuts (lanes) | 1 207 | 1 222 |
| **S8 ms a cut** | **98.0** | **21.0** |
| S8's reads / ms in reads | 2 764 / 107 236 | 2 767 / 13 203 |
| **ms a read** | **38.8** | **4.77** |
| insertChain calls inside reads | 102 936 | 0 |
| opSave inside reads | 2 778 | 0 |
Inside a P read (S8's 2 767): **readFace 0.34 ms** (945 ms), **the key 2.47 ms** (6 847), **the final exactRegion 1.81
ms** (5 002), **splitsOn 0.13 ms** (357); the rest (maps, census, copies) ≈ 0.02 ms. The harness's 1 254 reads: readFace
0.18, key 1.69, exactRegion 1.24, splitsOn 0.09 ms. So F0-2's untimed parts are small: readFace + splitsOn ≈ 0.47 ms of
4.77 (10 %); the key is 52 %, the final exactRegion 38 %. Earlier contended runs (results/step3/, step3b/*.v1): P S8 28.4 s
(23.2 ms a cut, 5.24 ms a read), BASE S8 135.8 s (112.5 ms a cut, 44.5 ms a read): the ratio holds at ≈ 8× a read and
≈ 4.7× a cut. (S20's prod figures for comparison: the construction 25.04 ms a read profiled, S8 53.38 ms a cut plain.)
