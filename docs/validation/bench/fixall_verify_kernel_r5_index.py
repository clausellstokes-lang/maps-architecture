# fix-all round 5, kernel verifier (fixall/verify-kernel-r5). Our own arithmetic; no reference code.
# A model of Section 3.3's index maintenance as integrated in round 5 (VK4-5): static partitions per (level, district),
# one tombstone set per partition keyed by item key, a per-slot home column, one dynamic grid per level. Random
# sequences of item creations, deletions (slots freed and reused), level changes (promotion / demotion), in-place
# changes (a re-walk or a move) and partition rebuilds at random moments; after every step a level-n query's answer
# (the multiset of item keys it returns) is compared with the truth (each live item of level <= n exactly once).
#   rule 'r5'        : exactly the round-5 text - an item deleted, re-levelled or changed is tombstoned in its home
#                      partition and its successor inserted in the grid.
#   rule 'r5+move'   : the same, and an item whose partition changes without being deleted, re-levelled or changed
#                      (its L1 cell regrouped into another district, Section 7.3's S6 row) is treated as changed.
#   rule 'per-level' : r5+move, but one tombstone set per level instead of per partition (J-K34's rejected option).
# Each rule is run with and without district regroups (the S6 edit), to separate the two questions.
import random
LEVELS = (2, 3, 4); DISTRICTS = (0, 1, 2)

def run(rule, regroups, seed, steps=400):
    R = random.Random(seed)
    live = {}                      # key -> (level, district)
    free = []                      # freed slots available for reuse
    nxt = [0]
    static = {}                    # (lvl, d) -> set of keys held by its last build
    tomb = {}                      # (lvl, d) -> set of keys, or per level under 'per-level'
    grid = {l: set() for l in LEVELS}
    home = {}                      # key -> (lvl, d) or None
    for l in LEVELS:
        for d in DISTRICTS:
            static[(l, d)] = set(); tomb[(l, d)] = set()
        tomb[l] = set()
    def tset(p): return tomb[p[0]] if rule == 'per-level' else tomb[p]
    def unindex(k):                # the round-5 rule for a deleted / re-levelled / changed item
        p = home.get(k)
        if p is not None: tset(p).add(k); home[k] = None
        for l in LEVELS: grid[l].discard(k)
    def rebuild(p):
        l, d = p
        static[p] = {k for k, (kl, kd) in live.items() if kl == l and kd == d}
        for k in static[p]: home[k] = p; grid[l].discard(k)
        if rule == 'per-level':
            tomb[l] -= static[p]   # the only sound per-level variant: drop the tombstones of the items it re-indexed
        else:
            tomb[p] = set()
    def query(n):
        out = []
        for (l, d), s in static.items():
            if l <= n: out += [k for k in s if k not in tset((l, d))]
        for l in LEVELS:
            if l <= n: out += list(grid[l])
        return sorted(out)
    def truth(n): return sorted(k for k, (l, d) in live.items() if l <= n)
    for l in LEVELS:
        for d in DISTRICTS:
            for _ in range(4):
                k = nxt[0]; nxt[0] += 1; live[k] = (l, d); grid[l].add(k)
            rebuild((l, d))
    for step in range(steps):
        op = R.random()
        if op < 0.2:                                   # create (maybe reusing a freed slot, possibly in another district)
            k = free.pop(R.randrange(len(free))) if free and R.random() < 0.7 else nxt[0]
            if k == nxt[0]: nxt[0] += 1
            live[k] = (R.choice(LEVELS), R.choice(DISTRICTS)); home.setdefault(k, None); grid[live[k][0]].add(k)
        elif op < 0.35 and live:                       # delete, freeing the slot
            k = R.choice(sorted(live)); unindex(k); del live[k]; free.append(k)
        elif op < 0.55 and live:                       # promotion or demotion inside its district
            k = R.choice(sorted(live)); l, d = live[k]
            nl = R.choice([x for x in LEVELS if x != l]); unindex(k); live[k] = (nl, d); grid[nl].add(k)
        elif op < 0.7 and live:                        # an in-place change (re-walk, move)
            k = R.choice(sorted(live)); unindex(k); grid[live[k][0]].add(k)
        elif op < 0.8 and regroups and live:           # S6 regroup: every item of one district's cell moves to another
            d0 = R.choice(DISTRICTS); d1 = R.choice([x for x in DISTRICTS if x != d0])
            ks = [k for k, (l, d) in live.items() if d == d0 and R.random() < 0.5]
            for k in ks:
                l, _ = live[k]; live[k] = (l, d1)
                if rule in ('r5+move', 'per-level'): unindex(k); grid[l].add(k)
        else:                                          # a partition rebuild at an arbitrary moment (stage end, overflow)
            rebuild((R.choice(LEVELS), R.choice(DISTRICTS)))
        for n in LEVELS:
            if query(n) != truth(n): return step
    return None

print('== model of Section 3.3 index maintenance: first step at which a query answer differs from the truth ==')
print('   rule        regroups   sequences   sequences with a wrong answer')
for rule in ('r5', 'r5+move', 'per-level'):
    for regroups in (False, True):
        bad = sum(run(rule, regroups, 1000 * s + 7) is not None for s in range(2000))
        print('   %-10s  %-8s   %9d   %d' % (rule, regroups, 2000, bad))
