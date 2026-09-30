# usage: python3 fixall_scope_r3_o9c_n800.py [campaign multiplier, default 1] (lane fixall/draft-scope-r3, 2026-09-25; stdlib only)
# PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/draft-scope-r3 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.
# Power and calibration of the O9 (c) rank campaign at n = 800 regenerated scopes (400 block + 400 district), K = 50,
# written from ARCHITECTURE §13.2 / §7.3 (iv) text (own code; seeds differ from every earlier script).
# Model: each generation (the regenerated scope or one of its K references) draws four statistics correlated at rho
# (a shared scope-level component plus an independent one); H1 regenerators are shifted (bias, in sd units) or scaled
# (snug < 1, loose > 1). Rank = references below + uniform draw over ties; 10 bins of floor(r*10/(K+1)) with expected
# counts proportional to the ranks each bin holds; chi-square (9 df) per statistic; Holm at family-wise 0.01 fails
# the campaign when the smallest p-value is below 0.0025. The fail-twice rule declares a defect when two campaigns in a
# row fail, so the per-night declaration probability is p^2 (campaigns are independent by construction).
import math, random, sys, time
from multiprocessing import Pool
K = 50
BIN = [(r * 10) // (K + 1) for r in range(K + 1)]
W = [BIN.count(b) for b in range(10)]
def q_upper(a, x):   # regularised upper incomplete gamma Q(a, x), own series / continued fraction
    if x <= 0: return 1.0
    gl = math.lgamma(a)
    if x < a + 1.0:
        term = 1.0 / a; total = term; n = a
        while True:
            n += 1.0; term *= x / n; total += term
            if abs(term) < abs(total) * 1e-15: break
        return max(0.0, 1.0 - total * math.exp(-x + a * math.log(x) - gl))
    b = x + 1.0 - a; c = 1e300; d = 1.0 / b; h = d; i = 0
    while True:
        i += 1; an = -i * (i - a); b += 2.0
        d = an * d + b; d = d if abs(d) > 1e-300 else 1e-300
        c = b + an / c; c = c if abs(c) > 1e-300 else 1e-300
        d = 1.0 / d; de = d * c; h *= de
        if abs(de - 1.0) < 1e-15 or i > 2000: break
    return math.exp(-x + a * math.log(x) - gl) * h
def campaign(args):
    kind, rho, scale, shift, n, seed = args
    rng = random.Random(seed); g = rng.gauss; rr = rng.random; ri = rng.randint
    a = math.sqrt(rho); b = math.sqrt(1.0 - rho)
    hist = [[0] * 10 for _ in range(4)]
    for _ in range(n):
        if kind == 'cont':
            z = g(0.0, 1.0); x = [shift + scale * (a * z + b * g(0.0, 1.0)) for _ in range(4)]
            refs = []
            for _ in range(K):
                z = g(0.0, 1.0); refs.append([a * z + b * g(0.0, 1.0) for _ in range(4)])
        else:   # scope-varying discrete statistics with heavy ties (plot counts 3..12, share p), correlated through a shared draw
            m = ri(3, 12); p = 0.3 + 0.6 * rr()
            def gen():
                base = [1 if rr() < p else 0 for _ in range(m)]
                out = []
                for s in range(4):
                    out.append(sum(bb if rr() < rho else (1 if rr() < p else 0) for bb in base) / m)
                return out
            x = gen(); refs = [gen() for _ in range(K)]
        for s in range(4):
            xs = x[s]; lo = 0; eq = 0
            for r in refs:
                v = r[s]
                if v < xs: lo += 1
                elif v == xs: eq += 1
            hist[s][BIN[lo + (ri(0, eq) if eq else 0)]] += 1
    pmin = 1.0
    for s in range(4):
        chi = sum((hist[s][k] - n * W[k] / (K + 1)) ** 2 / (n * W[k] / (K + 1)) for k in range(10))
        pmin = min(pmin, q_upper(4.5, chi / 2.0))
    return 1 if pmin < 0.01 / 4 else 0
def run(pool, label, kind, rho, scale, shift, n, reps, base):
    t = time.time()
    f = sum(pool.map(campaign, [(kind, rho, scale, shift, n, base + i) for i in range(reps)], chunksize=8))
    p = f / reps; se = math.sqrt(max(p * (1 - p), 1e-12) / reps)
    lo = wilson_lo(f, reps)
    print(f"{label:44s} n={n:4d}: {f:5d}/{reps:5d} = {p:.4f}  (95% Wilson lower {lo:.4f}; fail-twice per night {p*p:.4f})  [{time.time()-t:.0f}s]", flush=True)
def wilson_lo(f, n, z=1.959964):
    p = f / n; d = 1 + z * z / n
    return (p + z * z / (2 * n) - z * math.sqrt(p * (1 - p) / n + z * z / (4 * n * n))) / d
if __name__ == '__main__':
    m = float(sys.argv[1]) if len(sys.argv) > 1 else 1.0
    R = lambda k: max(50, int(k * m))
    print(f"K={K} bin widths={W}; Holm family-wise 0.01 over four statistics", flush=True)
    with Pool(8) as pool:
        run(pool, "H0 continuous rho=0.8", 'cont', 0.8, 1.0, 0.0, 800, R(3000), 91000000)
        run(pool, "H0 continuous rho=0.0", 'cont', 0.0, 1.0, 0.0, 800, R(1500), 92000000)
        run(pool, "H0 discrete, heavy ties, rho=0.8", 'tied', 0.8, 1.0, 0.0, 800, R(1000), 93000000)
        for rho in (0.0, 0.8, 1.0):
            run(pool, f"H1 bias +0.25 sd rho={rho}", 'cont', rho, 1.0, 0.25, 800, R(2000), 94000000 + int(rho * 10) * 100000)
            run(pool, f"H1 snug 0.8x rho={rho}", 'cont', rho, 0.8, 0.0, 800, R(2000), 95000000 + int(rho * 10) * 100000)
        run(pool, "H1 snug 0.6x rho=0.8", 'cont', 0.8, 0.6, 0.0, 800, R(500), 96000000)
        run(pool, "H1 loose 1.5x rho=0.8", 'cont', 0.8, 1.5, 0.0, 800, R(500), 97000000)
        run(pool, "H1 bias +0.25 sd rho=0.8 (n=400, reference)", 'cont', 0.8, 1.0, 0.25, 400, R(1000), 98000000)
        run(pool, "H1 snug 0.8x rho=0.8 (n=400, reference)", 'cont', 0.8, 0.8, 0.0, 400, R(1000), 99000000)
