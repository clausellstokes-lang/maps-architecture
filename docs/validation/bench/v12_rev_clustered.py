# Revision receipt for V12 §3.6b (critique V12C-08): the `most` and `floor` rules when instances of one town are
# correlated (a town effect with intraclass correlation rho). Stdlib only; seeded; our own code.
# PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/revise-V12 (2026-09-28).
import math, random
rng = random.Random(1090805)
def beta_draw(mu, rho):
    if rho <= 0: return mu
    s = 1.0 / rho - 1.0
    return rng.betavariate(mu * s, (1 - mu) * s)
def town_counts(mu, rho, m):
    p = beta_draw(mu, rho)
    return sum(rng.random() < p for _ in range(m))
# ---- most: pooled share >= 2/3 over >= 100 instances from >= 20 towns; the revised rule adds the town clause
def most_bar(mu, rho, towns, m, town_clause):
    ys = [town_counts(mu, rho, m) for _ in range(towns)]
    pooled = sum(ys) / (towns * m) >= 2 / 3
    if not town_clause: return pooled
    share_towns = sum(1 for y in ys if y / m >= 0.5) / towns
    return pooled and share_towns >= 0.70
R = 4000
print("most rule: pass rate at true mean share mu; towns x instances per town; rho = intraclass correlation")
for towns, m in ((20, 5), (40, 5), (25, 8)):
    for rho in (0.0, 0.3):
        for clause in (False, True):
            row = []
            for mu in (0.55, 0.6, 0.667, 0.75, 0.8, 0.85):
                row.append(f"{mu}: {sum(most_bar(mu, rho, towns, m, clause) for _ in range(R)) / R:.3f}")
            print(f" {towns} towns x {m}, rho {rho}, town clause {'on ' if clause else 'off'}: " + ", ".join(row))
# ---- floor: one-sided exact binomial at 0.01 against the floor; units = deep voids, <= 3 per town
def binom_cdf(y, n, p):
    return sum(math.comb(n, i) * p ** i * (1 - p) ** (n - i) for i in range(y + 1))
def icc_anova(groups):
    # one-way ANOVA estimator of the intraclass correlation for binary data; groups: list of (y, m)
    k = len(groups); N = sum(m for _, m in groups)
    if k < 2 or N <= k: return 0.0
    pbar = sum(y for y, _ in groups) / N
    msb = sum(m * (y / m - pbar) ** 2 for y, m in groups) / (k - 1)
    msw = sum(y - y * y / m for y, m in groups) / (N - k)
    m0 = (N - sum(m * m for _, m in groups) / N) / (k - 1)
    den = msb + (m0 - 1) * msw
    return 0.0 if den <= 0 else max(0.0, (msb - msw) / den)
def floor_bar(ftrue, floor, rho, towns, correct):
    groups = []
    for _ in range(towns):
        m = rng.choice((1, 2, 3))            # deep voids a town contributes, capped at 3
        groups.append((town_counts(ftrue, rho, m), m))
    y = sum(g[0] for g in groups); n = sum(g[1] for g in groups)
    if correct:
        mbar = n / len(groups); deff = 1 + (mbar - 1) * icc_anova(groups)
        y = int(round(y / deff)); n = max(1, int(round(n / deff)))
    return binom_cdf(y, n, floor) < 0.01      # True = fail
print("floor rule (floor 0.50), deep voids 1-3 per town (mean 2): fail rate at true sealed share")
for towns in (50, 70):
    for rho in (0.0, 0.3, 0.6):
        for correct in (False, True):
            row = []
            for f in (0.5, 0.45, 0.4, 0.35, 0.3):
                row.append(f"{f}: {sum(floor_bar(f, 0.5, rho, towns, correct) for _ in range(R)) / R:.3f}")
            print(f" {towns} towns, rho {rho}, design-effect correction {'on ' if correct else 'off'}: " + ", ".join(row))
