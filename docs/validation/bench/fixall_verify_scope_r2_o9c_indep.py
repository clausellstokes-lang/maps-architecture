# usage: python3 fixall_verify_scope_r2_o9c_indep.py <H0 campaigns> <H1 campaigns> <n scopes per campaign> [seed]   (lane fixall/verify-scope-r2, 2026-09-25; stdlib only)
# Independent re-implementation of the O9 (c) rank campaign from ARCHITECTURE §13.2 / §7.3 (iv) text (not from the drafts' scripts).
# Written from the architecture text, not from the draft's script. stdlib only; seed differs from the drafts'.
import random, math, sys
rng = random.Random(int(sys.argv[4]) if len(sys.argv) > 4 else 777001)
def reg_upper_gamma(a, x):
    # Q(a,x) via series / continued fraction (Numerical Recipes form, own code)
    if x <= 0: return 1.0
    gl = math.lgamma(a)
    if x < a + 1.0:
        term = 1.0 / a; total = term; n = a
        while True:
            n += 1.0; term *= x / n; total += term
            if abs(term) < abs(total) * 1e-14: break
        return max(0.0, 1.0 - total * math.exp(-x + a * math.log(x) - gl))
    b = x + 1.0 - a; c = 1.0 / 1e-300; d = 1.0 / b; h = d; i = 0
    while True:
        i += 1; an = -i * (i - a); b += 2.0
        d = an * d + b; d = 1e-300 if abs(d) < 1e-300 else d
        c = b + an / c; c = 1e-300 if abs(c) < 1e-300 else c
        d = 1.0 / d; delta = d * c; h *= delta
        if abs(delta - 1.0) < 1e-14 or i > 1000: break
    return math.exp(-x + a * math.log(x) - gl) * h
K, N = 50, int(sys.argv[3])
BIN = [ (r * 10) // (K + 1) for r in range(K + 1) ]
W = [BIN.count(b) for b in range(10)]
def rank(x, refs):
    lo = sum(1 for v in refs if v < x); eq = sum(1 for v in refs if v == x)
    return lo + rng.randint(0, eq)
def campaign(gen4):
    # gen4() -> (regenerated values[4], references[K][4]) for one scope
    hist = [[0]*10 for _ in range(4)]
    for _ in range(N):
        x, refs = gen4()
        for s in range(4):
            hist[s][BIN[rank(x[s], [r[s] for r in refs])]] += 1
    ps = []
    for s in range(4):
        chi = sum((hist[s][b] - N*W[b]/(K+1))**2 / (N*W[b]/(K+1)) for b in range(10))
        ps.append(reg_upper_gamma(4.5, chi/2))
    return min(ps) < 0.01/4
def corr4(rho, scale=1.0, shift=0.0):
    def one(sc=1.0, sh=0.0):
        z = rng.gauss(0,1)
        return [sh + sc*(math.sqrt(rho)*z + math.sqrt(1-rho)*rng.gauss(0,1)) for _ in range(4)]
    return lambda: (one(scale, shift), [one() for _ in range(K)])
def tied4():
    # scope-dependent discrete statistics: each scope has its own plot count m in 3..12 and share p
    m = rng.randint(3, 12); p = rng.uniform(0.3, 0.9)
    f = lambda: [sum(1 for _ in range(m) if rng.random() < p) / m for _ in range(4)]
    return f(), [f() for _ in range(K)]
cases = [("H0 correlated rho=0.8 continuous", corr4(0.8), int(sys.argv[1])),
         ("H0 scope-varying discrete (ties)", tied4, int(sys.argv[1])),
         ("H1 bias +0.25 sd, rho=0.8", corr4(0.8, 1.0, 0.25), int(sys.argv[2])),
         ("H1 snug 0.8x, rho=0.8", corr4(0.8, 0.8, 0.0), int(sys.argv[2]))]
print(f"K={K} N={N} widths={W}")
for lab, g, reps in [c for c in cases if c[2] > 0]:
    f = sum(campaign(g) for _ in range(reps))
    print(f"{lab:36s}: {f}/{reps} = {f/reps:.4f}", flush=True)
