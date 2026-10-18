---
name: statistical-bar-discrete-ties
description: Permutation/null-model bars on discrete share statistics need randomised-tie ranks or an exact pooled test; a z-score sign rule passes chance
metadata:
  type: project
---

A "shift against a random baseline" bar scored per town by z = (S_obs − mean S_k)/sd S_k and "z > 0 in ≥ 70 % of towns" is only calibrated for continuous statistics. On share statistics with few members (tanneries downstream, shops within r of the market) it passes pure chance 58–98 % of the time when the indicator's base share is high, and misses real pulls when it is low (executed 2026-09-28, docs/validation/bench/critique_v12_nullrule_discrete.py → .out, critique V12C-01).

**Why:** ties. The base's own O9 (c) faithfulness campaign (ARCHITECTURE §13.2) already uses a randomised tie-break rank ("without the randomised tie-break a perfect regenerator fails every campaign"), but V12 §3.6 dropped it.

**How to apply:** for any per-town permutation bar use u = (#{S_k<S_obs} + U·(#{S_k=S_obs}+1))/(K+1) with a named stream for U (critique_v12_nullrule_rank_power.out: size ≤ 0.5 %); for member-on-indicator counts prefer the pooled exact hypergeometric test (critique_v12_pooled_exact.out); refuse specs whose null share > 0.85 (no headroom). Check any new statistical bar on discrete fixtures, not only planted normal shifts. See [[maps-project-state]].
