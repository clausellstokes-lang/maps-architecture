# Revision receipt for V12 §3.6 and §3.6b (critique V12C-07, V12C-08): (A) the rank rule with the confirmation stage
# (a failing bar re-runs once on a fresh family at twice the towns; the fallback fires only when both fail);
# (B) `most` with effective instances (the one-way ANOVA design effect) and the town clause restricted to towns holding
# >= 3 instances. Stdlib only; seeded; our own code.
# PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/revise-V12 (2026-09-29).
import random, statistics as st, math
rng = random.Random(29092026)
K = 20
def rank_u(obs, ks):
    lt = sum(1 for s in ks if s < obs); eq = sum(1 for s in ks if s == obs)
    return (lt + rng.random() * (eq + 1)) / (K + 1)
def rank_bar(delta, towns):
    us = []
    for _ in range(towns):
        ks = [rng.gauss(0, 1) for _ in range(K)]
        us.append(rank_u(rng.gauss(delta, 1), ks))
    return sum(1 for u in us if u > 0.5) >= 0.70 * towns and st.median(us) >= 0.60
R = 2000
print("(A) rank rule, normal statistic, planted shift in sd; run 1 = 50 towns, confirmation = a fresh family of 100 towns")
for d in (0.0, 0.3, 0.5, 0.8, 1.0):
    p1 = f1f2 = 0
    for _ in range(R):
        a = rank_bar(d, 50)
        if a: p1 += 1
        else:
            b = rank_bar(d, 100)
            if not b: f1f2 += 1
    pass_final = 1 - f1f2 / R
    print(f"  shift {d:.1f}: run-1 pass {p1/R:.4f}; final pass (run 1 or the confirmation) {pass_final:.4f}; "
          f"fallback fired (both fail) {f1f2/R:.4f}; expected false fallbacks over 40 such bars {40*f1f2/R:.3f}")
# ---- (B) most, effective instances, town clause on towns with >= 3 instances
def beta_draw(mu, rho):
    if rho <= 0: return mu
    s = 1.0 / rho - 1.0
    return rng.betavariate(mu * s, (1 - mu) * s)
def icc_anova(groups):
    k = len(groups); N = sum(m for _, m in groups)
    if k < 2 or N <= k: return 0.0
    pbar = sum(y for y, _ in groups) / N
    msb = sum(m * (y / m - pbar) ** 2 for y, m in groups) / (k - 1)
    msw = sum(y - y * y / m for y, m in groups) / (N - k)
    m0 = (N - sum(m * m for _, m in groups) / N) / (k - 1)
    den = msb + (m0 - 1) * msw
    return 0.0 if den <= 0 else min(1.0, max(0.0, (msb - msw) / den))
def most_bar(mu, rho, share=2/3, clause=True):
    groups = []
    while True:
        for _ in range(50):
            m = rng.randint(1, 8)
            p = beta_draw(mu, rho)
            groups.append((sum(rng.random() < p for _ in range(m)), m))
        n = sum(m for _, m in groups); mbar = n / len(groups)
        neff = n / (1 + (mbar - 1) * icc_anova(groups))
        if (neff >= 100 and len(groups) >= 20) or len(groups) >= 300: break
    if neff < 100: return None
    pooled = sum(y for y, _ in groups) / n >= share
    if not clause: return pooled
    big = [(y, m) for y, m in groups if m >= 3]
    if len(big) < 10: return pooled
    return pooled and sum(1 for y, m in big if y / m >= 0.5) / len(big) >= 0.70
R2 = 3000
print("(B) most at 2/3: pass rate at the true mean share mu; 1-8 instances per town; towns in steps of 50 until 100 effective instances")
for rho in (0.0, 0.3, 0.6):
    for clause in (False, True):
        row = []
        for mu in (0.55, 0.6, 0.667, 0.75, 0.8):
            res = [most_bar(mu, rho, clause=clause) for _ in range(R2)]
            ok = [r for r in res if r is not None]
            row.append(f"{mu}: {sum(ok)/len(ok):.3f}")
        print(f"  rho {rho}, town clause {'on ' if clause else 'off'}: " + ", ".join(row))
