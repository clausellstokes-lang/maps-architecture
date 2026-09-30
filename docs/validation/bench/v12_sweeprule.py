# Calibration of the sweep-bar pass rules (V12 §3.6b): a trend over ordered levels, a stratified with-versus-without
# comparison, presence at every level, and a rate against a table value. Stdlib only; seeded; our own code.
# PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/V12-calibration (2026-09-28).
import math, random
random.seed(109)
Z99 = 2.3263478740408408          # one-sided alpha 0.01
def ca_z(ys, ns):                  # Cochran-Armitage trend z, scores 0..L-1
    N = sum(ns); pbar = sum(ys) / N
    if pbar in (0.0, 1.0): return 0.0
    xs = range(len(ns))
    T = sum(x * (y - n * pbar) for x, y, n in zip(xs, ys, ns))
    V = pbar * (1 - pbar) * (sum(n * x * x for x, n in zip(xs, ns)) - sum(n * x for x, n in zip(xs, ns)) ** 2 / N)
    return T / math.sqrt(V) if V > 0 else 0.0
def adj(y, n): return (y + 0.5) / (n + 1)
def no_reversal(ys, ns, k=2.0):
    for l in range(len(ns) - 1):
        a, b = adj(ys[l], ns[l]), adj(ys[l + 1], ns[l + 1])
        se = math.sqrt(a * (1 - a) / (ns[l] + 1) + b * (1 - b) / (ns[l + 1] + 1))
        if b - a < -k * se: return False
    return True
def trend_pass(ps, ns):
    ys = [sum(random.random() < p for _ in range(n)) for p, n in zip(ps, ns)]
    return ca_z(ys, ns) >= Z99 and no_reversal(ys, ns), no_reversal(ys, ns)
def rate(ps, ns, reps=2000):
    ok = rev = 0
    for _ in range(reps):
        a, b = trend_pass(ps, ns); ok += a; rev += (not b)
    return round(ok / reps, 4), round(rev / reps, 4)
def cmh_z(cells):                  # cells: [(y_with, n_with, y_without, n_without)] per stratum
    num = var = 0.0
    for y1, n1, y0, n0 in cells:
        N = n1 + n0; m = y1 + y0
        if N < 2 or m in (0, N): continue
        num += y1 - n1 * m / N
        var += n1 * n0 * m * (N - m) / (N * N * (N - 1))
    return num / math.sqrt(var) if var > 0 else 0.0
def higher_with(p_with, p_without, n, reps=2000):
    ok = rev = 0
    for _ in range(reps):
        cells = []; good = True
        for pw, po in zip(p_with, p_without):
            y1 = sum(random.random() < pw for _ in range(n)); y0 = sum(random.random() < po for _ in range(n))
            cells.append((y1, n, y0, n))
            a, b = adj(y0, n), adj(y1, n)
            se = math.sqrt(a * (1 - a) / (n + 1) + b * (1 - b) / (n + 1))
            if b - a < -2 * se: good = False
        ok += (cmh_z(cells) >= Z99 and good); rev += (not good)
    return round(ok / reps, 4), round(rev / reps, 4)
# item 109 (a)'s relief rows, independence approximation: P(cavern) = P(soluble) 0.7 + P(volcanic) 0.4
sol = [0.10, 0.20, 0.30, 0.45]; vol = [0.0, 0.02, 0.05, 0.15]
pc = [round(s * 0.7 + v * 0.4, 4) for s, v in zip(sol, vol)]
print('P(cavern) by relief plain/rolling/hilly/mountainous (item 109 (a)):', pc)
for n in (30, 50, 100):
    print(f' relief trend, {n} towns per level: pass, reversal-clause fail =', rate(pc, [n] * 4))
print(' no effect (flat 0.20), 50 per level: pass, reversal fail =', rate([0.2] * 4, [50] * 4))
print(' no effect (flat 0.20), 100 per level: pass, reversal fail =', rate([0.2] * 4, [100] * 4))
print(' true trend with one flat step (0.20, 0.20, 0.30, 0.40), 100 per level:', rate([0.2, 0.2, 0.3, 0.4], [100] * 4))
boost = [min(0.9, p * 1.4) for p in pc]
print('P(cavern) with mining, boost 1.4 capped 0.9:', [round(b, 4) for b in boost])
for n in (50, 100, 200):
    print(f' mining higher-with, {n} towns per cell (4 relief strata): pass, reversal fail =', higher_with(boost, pc, n))
print(' no boost, 100 per cell: pass, reversal fail =', higher_with(pc, pc, 100))
# item 109 (j) (3): access by buildings over the void, q per building draw, o a public opening
bins = [0, 1.5, 4, 8, 15, 30]      # representative counts of the bins 0, 1-2, 3-5, 6-10, 11-20, 21+
for q, o in ((0.03, 0.02), (0.05, 0.05)):
    pa = [round(1 - (1 - o) * (1 - q) ** k, 4) for k in bins]
    for n in (20, 40):
        print(f' access by buildings-over (q {q}, o {o}) {pa}, {n} voids per bin: pass, reversal fail =', rate(pa, [n] * 6))
print(' access, no effect (flat 0.10), 40 per bin: pass, reversal fail =', rate([0.1] * 6, [40] * 6))
# presence at every level: N = min(500, ceil(5 / p)) towns per level; P(no occurrence) = (1 - p)^N
for p in (0.01, 0.02, 0.05, 0.1, 0.3):
    N = min(500, math.ceil(5 / p)); print(f' presence, p {p}: N {N}, P(zero at a level) {round((1 - p) ** N, 4)}')
# a rate against a table value: two-sided exact binomial p >= 0.01 -> false fail <= 0.01 by construction
def binom_two_sided(y, n, p):
    pmf = [math.comb(n, i) * p ** i * (1 - p) ** (n - i) for i in range(n + 1)]
    return min(1.0, sum(v for v in pmf if v <= pmf[y] * (1 + 1e-9)))
def rate_bar(p_true, p_table, n, reps=2000):
    f = 0
    for _ in range(reps):
        y = sum(random.random() < p_true for _ in range(n)); f += binom_two_sided(y, n, p_table) < 0.01
    return round(f / reps, 4)
for n in (100, 200):
    print(f' rate bar, {n} units: fail when right (0.30 v 0.30) {rate_bar(0.3, 0.3, n)}; when off by half (0.15 v 0.30) {rate_bar(0.15, 0.3, n)}; off by a third (0.20 v 0.30) {rate_bar(0.2, 0.3, n)}')

# 'most' (V12 §3.6b): pooled instance share >= 2/3 over >= n instances (independent-instance approximation), exact binomial
def most_pass(p, n):
    k0 = math.ceil(2 * n / 3)
    return round(sum(math.comb(n, k) * p ** k * (1 - p) ** (n - k) for k in range(k0, n + 1)), 4)
for n in (100, 200):
    print(f' most rule, {n} instances: P(pass) at true share ' + ', '.join(f'{p}: {most_pass(p, n)}' for p in (0.55, 0.6, 0.667, 0.7, 0.75, 0.8)))
# 'floor' (V12 §3.6b): fail only when the one-sided exact binomial P(Y <= y | floor) < 0.01
def floor_fail(p, f, n):
    cdf = 0.0; tot = 0.0
    for y in range(n + 1):
        cdf += math.comb(n, y) * f ** y * (1 - f) ** (n - y)
        if cdf < 0.01: tot += math.comb(n, y) * p ** y * (1 - p) ** (n - y)
    return round(tot, 4)
for n in (100, 200):
    print(f' floor rule (floor 0.30), {n} units: P(fail) at true share ' + ', '.join(f'{p}: {floor_fail(p, 0.3, n)}' for p in (0.3, 0.25, 0.2, 0.15)))
