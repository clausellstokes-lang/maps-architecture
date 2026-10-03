#!/usr/bin/env python3
"""prices.py (coherence/repair-scope-r2) — §16's figures computed once (file f item 568; R2-06 (b)).

Inputs: each volume's §8 total as its round-2 repair file states it in its first lines ("§8 total: a–b pw (was c–d)"),
every volume seat of round 2 having logged LANDED (V01–V12) before this ran; the base's lines as round 1 left them
(live §16), widened only by the itemised base parts of items 121, 122 and 124 (§16's rule) and narrowed by item 126.
Every figure is a (low, high) pair in person-weeks. Prints every line, row and total and asserts the identities."""
from fractions import Fraction as F

def r(a, b): return (F(str(a)), F(str(b)))
def add(*xs): return (sum(x[0] for x in xs), sum(x[1] for x in xs))
def sub(x, y): return (x[0] - y[0], x[1] - y[1])
def fmt(x):
    def f(v):
        s = f'{float(v):.2f}'.rstrip('0').rstrip('.')
        return s
    return f'{f(x[0])}–{f(x[1])}'

# ---- the volumes' §8 totals as round 2 leaves them (where each was read: the round-2 repair file's first lines) ----
V = {
    'V01': r(27.5, 36.75),   # repair-r2-V01.md l.5 (was 27.25–36.25)
    'V02': r(23, 33.5),      # repair-r2-V02.md l.5 (was 22.5–32.5); M6 18.75–28.5 + spikes 2.25; 2–2.75 at M3a
    'V03': r(19, 26),        # repair-r2-V03.md l.5 (was 18.5–25.25); M6-P 18.25–25; PE 0.75–1
    'V04': r(28.5, 39.5),    # repair-r2-V04.md (LANDED line; was 28.25–39.25)
    'V05': r(18, 24.75),     # repair-r2-V05.md l.5 (unchanged)
    'V06': r(31, 44),        # repair-r2-V06.md l.5 (was 29.75–42.25)
    'V07': r(30.5, 43),      # repair-r2-V07.md l.5 (was 30.25–42.5)
    'V08': r(18.5, 25.25),   # repair-r2-V08.md l.5 (was 18–24.5), map side
    'V09': r(23.75, 34.75),  # repair-r2-V09.md (LANDED line; was 21.5–31.75): base line 16.0–23.5, staged 3.25–5.0, AP11 4.5–6.25
    'V10': r(14.75, 20.25),  # repair-r2-V10.md l.5 (was 14.5–20): M3c 11.25–15; C1 + transcript 3.5–5.25
    'V11': r(13.6, 19.1),    # repair-r2-V11.md l.5 (was 13.0–18.25): first-total share 11.75–16.5; staged 1.85–2.6
    'V12': r(7.25, 11),      # repair-r2-V12.md l.5 (was 6.75–10.25) base side: W1–W6 6–9, W7 1.25–2; M-CAL 4.75–8 staged
}
V02_M3A, V03_PE = r(2, 2.75), r(0.75, 1)
V09_BASE, V09_STAGED, V09_AP11 = r(16.0, 23.5), r(3.25, 5.0), r(4.5, 6.25)
AP11_BASE = add(r(1.25, 1.75), r(1.25, 1.75), r(0.25, 0.5), r(0.5, 0.75), r(0.25, 0.25))  # 111–119, Find, resolution, crisis screens, weather switch
AP11_STAGED = add(r(0.75, 1), r(0.25, 0.25))                                              # 111–119 staged, damage lines
assert add(AP11_BASE, AP11_STAGED) == V09_AP11 and add(V09_BASE, V09_STAGED, V09_AP11) == V['V09']
V10_M3C, V10_C1T = r(11.25, 15), r(3.5, 5.25)
assert add(V10_M3C, V10_C1T) == V['V10']
V11_FIRST, V11_STAGED = r(11.75, 16.5), r(1.85, 2.6)
V11_C2G, V11_C4A, V11_C3B, V11_C9 = r(1.0, 2.0), r(0.5, 0.5), r(0.75, 1.25), r(1.25, 2.0)
assert add(V11_FIRST, V11_STAGED) == V['V11']
V12_W16, V12_W7, V12_MCAL = r(6, 9), r(1.25, 2), r(4.75, 8)
assert add(V12_W16, V12_W7) == V['V12']

# ---- the base's effort lines (round 1's, live §16) and this round's changes ----
L1 = {
    'parity': r(64, 74), 'O1': r(4, 6), 'O9': r(12, 16.5), 'O12': r(8.5, 13), 'O11': r(12.5, 17.25), 'O17': r(15.75, 23.75),
    'O10': r(10, 14.5), 'should': r(4, 6), 'content': r(13.75, 19.75), 'sim': r(8, 14), 'app': r(17.5, 25.75),
    'rig': r(16.25, 23.25), 'mech': r(12, 17),
}
assert add(*L1.values()) == r(198.25, 270.75)
I121, I122, I124 = r(0.75, 1.25), r(0.75, 1.25), r(0.75, 1.25)   # the itemised O12 widenings (item 122's includes V01's campLand ≈ 0.25)
L = dict(L1)
L['O12'] = add(L1['O12'], I121, I122, I124)
# the content line: round 1 priced file g's 2.5–4 (C2's g share 1.75–2.75 + C3b 0.75–1.25) and C9 0.75–1.25; now V11 §8's
# C2 g share 1.0–2.0, C4a 0.5, C3b 0.75–1.25 and C9 1.25–2.0 (C4b moved to the staged line, VV1112-r1-01)
CONTENT_NON_G = sub(L1['content'], add(r(2.5, 4), r(0.75, 1.25)))
L['content'] = add(CONTENT_NON_G, V11_C2G, V11_C4A, V11_C3B, V11_C9)
L['app'] = add(V09_BASE, AP11_BASE)
L['rig'] = add(sub(L1['rig'], r(0.75, 1.25)), V12_W7)
BASE = add(*L.values())
STAGE2 = V['V01']
FIRST = add(BASE, STAGE2)

# ---- milestone rows (round 1's) and their changes ----
R1 = {'M-1': r(2.5, 4), 'M0': r(9, 12), 'M1': r(40.25, 52.25), 'M2a': r(10, 13.5), 'M2b': r(46, 61.25), 'M3a': r(35.25, 47.25),
      'M3b': r(19.5, 26), 'M4': r(17, 24.25), 'M4b': r(8, 14), 'carried': r(10.75, 16.25), 'M5': r(27.25, 36.25)}
assert add(*R1.values()) == r(225.5, 307)
R = dict(R1)
R['M2b'] = add(sub(R1['M2b'], r(1.75, 2.75)), V11_C2G, V11_C4A)       # C2's g share 1.75–2.75 -> 1.0–2.0, plus C4a 0.5
R['M3b'] = add(R1['M3b'], I122, I124)                                   # items 122 and 124's base parts
R['M4'] = add(R1['M4'], I121)                                           # item 121's base parts
CARRIED_V09 = sub(r(7.75, 11.5), sub(r(16.25, 24.0), V09_BASE))         # volume 9's out-of-row share, narrowed by item 126
CARRIED = add(CARRIED_V09, AP11_BASE, V11_C9, r(0.25, 0.5), V12_W7)     # V09; AP11's base parts; C9; W6; W7
R['carried'] = CARRIED
R['M5'] = V['V01']
ROWS = add(*R.values())
assert ROWS == FIRST, (fmt(ROWS), fmt(FIRST))

# ---- the staged lines ----
S = {
    'stage 3 (V02)': sub(V['V02'], V02_M3A), 'the plan rung (V03)': sub(V['V03'], V03_PE), 'the underground (V04)': V['V04'],
    'the sky (V05)': V['V05'], 'the evolution engine (V06)': V['V06'], 'the village (V07)': V['V07'],
    'the SettlementForge connection (V08)': V['V08'], 'the built-in clerk (V10, M3c)': V10_M3C, 'corpus (V12, M-CAL)': V12_MCAL,
    "the application's staged screens (V09)": add(V09_STAGED, AP11_STAGED), "the content's staged rows (V11)": V11_STAGED,
}
STAGED = add(*S.values())
WHOLE = add(FIRST, STAGED)
CUTS = add(r(8, 14), r(3, 5), r(2, 3), r(4, 6))
CAL = (round(float(FIRST[0]) / 2), round(float(FIRST[1]) / 2))

if __name__ == '__main__':
    for k, v in L.items():
        print(f'line {k:10} {fmt(L1[k]):>14} -> {fmt(v)}')
    print('base subtotal', fmt(BASE), '; stage 2', fmt(STAGE2), '; FIRST', fmt(FIRST))
    for k, v in R.items():
        print(f'row  {k:8} {fmt(R1[k]):>14} -> {fmt(v)}')
    print('rows sum', fmt(ROWS))
    print('carried parts: V09', fmt(CARRIED_V09), 'AP11 base', fmt(AP11_BASE), 'C9', fmt(V11_C9), 'W6 0.25–0.5', 'W7', fmt(V12_W7))
    for k, v in S.items():
        print(f'staged {k:40} {fmt(v)}')
    print('STAGED', fmt(STAGED), '; WHOLE', fmt(WHOLE), '; cuts leave', fmt(sub(FIRST, CUTS)), '; calendar', CAL)
    print('AP11 staged', fmt(AP11_STAGED), '; staged screens', fmt(add(V09_STAGED, AP11_STAGED)))
    print('content non-g', fmt(CONTENT_NON_G), '; V11 first share check', fmt(add(CONTENT_NON_G, V11_C2G, V11_C4A, V11_C3B, V11_C9)))
