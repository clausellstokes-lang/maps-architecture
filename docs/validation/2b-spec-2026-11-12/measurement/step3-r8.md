# Step 3 addendum — the review's R-8 census at CITY fusion seed 3 (the managing session's request)

Command: `scripts/s9-run.sh P fusion 3 city` and `scripts/s9-run.sh B fusion 3 city` (probes/s9b.ts on probeP / probeB with
the inert counters of scripts/instr.py: in the readKerb wrapper, per ok read, the served KERB's rings — a component = an
outer ring (positive area); "narrow" = 2·area ⁄ perimeter < 26 cm; "small" = area < 4 m²; a short edge < 25 cm (minEdge);
in bentCutFabric.ts, each 'needle' refusal and whether one of its tips is a vertex of a narrow or small component).
Logs/JSON: results/step3b/P-fusion-3-city.{log,json}, B-fusion-3-city.{log,json} (counters.s8 = S8's own reads in derive;
counters.harnessReads = the harness's L1 reads per block seed).

| fusion 3 CITY, S8's own reads | P (X served) | BASE (construction) |
|---|---|---|
| reads (ok) | 2 767 (2 767) | 2 764 (2 764) |
| kerb rings served | 2 807 | 2 799 |
| reads holding a component narrower than 26 cm | 12 | 7 |
| reads holding a component under 4 m² | 19 | 7 |
| reads holding either (a) | **19** (0.69 %) | 7 |
| narrow components / small components | 12 / 19 | 7 / 7 |
| reads holding an edge shorter than 25 cm (b) | **2 604 (94 %)** | **0** |
| edges shorter than 25 cm, in all | **35 619** (12.9 a read) | 0 |
| S8's 'needle' refusals | 3 | 3 |
| … of them with a tip on a narrow or small component | **0** | 1 |
The harness's per-seed reads (1 254 P / 1 239 BASE): either-class 4 / 1; short-edge reads 1 150 / 0 (11 579 short edges / 0).

Reading: islands and thin parts are RARE under P (19 reads of 2 767) and never caused a needle refusal at this seed; but
SHORT EDGES are UBIQUITOUS — almost every served kerb has edges under minEdge (12.9 a read), where the construction's had
none (its arrangement merged them). They are exact X's rounded arc chords and crossing vertices (exactRegion keeps every
snapped vertex; e.g. step 5's X rings with vertex pairs 1 – 2 cm apart along every strip edge). S8 plans on them; S9's
commit merges them (part of the thin differences of step 3).
