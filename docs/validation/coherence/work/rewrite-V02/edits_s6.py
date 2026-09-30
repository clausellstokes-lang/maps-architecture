E=[
("""measurements named below; each has its pre-decided fallback. The building counts are §1.1's (TOWN 1 200–1 500, CITY
4 500–6 000, METROPOLIS 12 000–15 000 at the rung targets; about 30 000–36 000 at the 120 000 cap, by §1.1's law of
the population). The mix""","""measurements named below; each has its pre-decided fallback. The building counts per rung and at the population cap are
§1.1's, the first-map times §12.5's; this section states only stage 3's added costs. The mix"""),
("""| rung (target) | added massing CPU | added first-map wall time (3 pool workers) | share of §12.5's first map |
|---|---|---|---|
| TOWN (5 000; 1 200–1 500 buildings) | ≈ 9 ms | ≈ 3 ms (≈ 9 ms single-threaded) | ≈ 2–6 % of 124–145 ms |
| CITY (20 000; 4 500–6 000) | ≈ 36 ms | ≈ 12 ms | ≈ 3 % of 0.33–0.42 s |
| METROPOLIS (50 000; 12 000–15 000) | ≈ 90 ms | ≈ 30 ms | ≈ 3 % of 0.86–1.05 s |
| the 120 000 cap (≈ 30 000–36 000) | ≈ 216 ms | ≈ 72 ms | ≈ 3 % of ≈ 2.3 s |""","""| rung (§1.1's building count) | added massing CPU | added first-map wall time (3 pool workers) | share of §12.5's first-map time |
|---|---|---|---|
| TOWN | ≈ 9 ms | ≈ 3 ms (≈ 9 ms single-threaded) | ≈ 2–6 % |
| CITY | ≈ 36 ms | ≈ 12 ms | ≈ 3 % |
| METROPOLIS | ≈ 90 ms | ≈ 30 ms | ≈ 3 % |
| the population cap | ≈ 216 ms | ≈ 72 ms | ≈ 3 % |
| THORP to VILLAGE | ≤ 2 ms (a few hundred buildings at most, rows and singles dominating) | ≤ 1 ms | below measurement noise |"""),
("""roofscape until each batch lands, reported (J-V2.53); a compose median over 0.2 ms: the porch's space test runs on the plot's ring only (the other
footprints ignored, the porch then clipped at draw)""","""roofscape until each batch lands, reported (J-V2.53); a compose median over 0.2 ms: the porch's space test runs on the
plot's ring only (the other footprints ignored, the porch then clipped at draw)"""),
("""* **Model:** per building ≈ 36 B for roles, keys, `nextWingKey` and `MassingRef` (with `segments`, `low` and `cupola`), and ≈ 50 B for the extra wings the
  composed massings carry""","""* **Model:** per building ≈ 36 B for roles, keys, `nextWingKey` and `MassingRef` (with `segments`, `low` and `cupola`),
  and ≈ 50 B for the extra wings the composed massings carry"""),
]
