# PENDING FABLE REVIEW — receipt of amendments-c/verify-rendering-r2 (opus stand-in verifier). Our own code, stdlib only.
# Question: §8.8 holds the global light's rings of tile positions out to the window R of §8.4 (c) and states "every
# further ring together <= 3 MB whatever the window" (view) and a lit export tile's window "≈ 21 MB whatever R"; the
# repair's receipt (amendc_repair_rendering_r2_traversal.out (5)) summed the rings to k = 64 only. R = (Z - z) / (m - σ),
# Z - z the document's highest surface above the pixel — terrain field marks included (§8.4 (a), §8.8's pyramid) — and
# §4.2 S1 calls "a 3 000 m relief" ordinary. This receipt takes the text's own terms: the finest stop 1:500 (0.1323 m per
# CSS px), tile side S = 512 × 0.1323 ÷ d, ring j >= 2 held from level floor(log2(4 (j - 1))) capped at 9 (one cell per
# tile), 1/3 MB per level-0 position in one byte (view), 4 B per cell with 4/3 for the pyramid (export tile's window).
import math
SIG = math.tan(math.radians(0.27))
def lvl(j): return 0 if j == 1 else min(9, math.floor(math.log2(4 * (j - 1))))
def view_rings(a, b, k):
    first = 0.0; further = 0.0; pos = 0
    for j in range(1, k + 1):
        n = (a + 2 * j) * (b + 2 * j) - (a + 2 * j - 2) * (b + 2 * j - 2); pos += n
        c = n / 3 * 4 ** (-lvl(j))
        if j == 1: first = c
        else: further += c
    return first, further, pos
def export_window(k):
    MB = 1048576.0; first = 0.0; further = 0.0; pos = 0
    for j in range(1, k + 1):
        n = (1 + 2 * j) ** 2 - (2 * j - 1) ** 2; pos += n
        c = n * (512 * 512 * 4 / MB) * (4 / 3) * 4 ** (-lvl(j))
        if j == 1: first = c
        else: further += c
    return 3.0 + 1 / 3 + first + further, pos
print('reference view 1 440 x 900 CSS px, 1:500 stop; export tiles 512 px at 300 dpi 1:500 (S = 21.7 m)')
print(f'{"relief Z-z":>10} {"sun":>14} {"DPR":>4} {"R m":>8} {"k":>5} {"ring pos.":>10} {"further MB":>11} | {"exp k":>5} {"exp pos./tile":>13} {"exp window MB":>13}')
for relief in (30, 100, 300, 1000, 3000):
    for sun, alt in (('fixed 45°', 45.0), ('path 15°', 15.0), ('path <= 7.1°', 5.0)):
        m = max(math.tan(math.radians(alt)), 1 / 8)
        R = relief / (m - SIG)
        for d in (2,):
            S = 512 * 0.1323 / d
            a = math.ceil(1440 * d / 512) + 1; b = math.ceil(900 * d / 512) + 1
            k = math.ceil(R / S)
            first, further, pos = view_rings(a, b, k)
            Se = 512 * 0.0254 / 300 * 500
            ke = math.ceil(R / Se)
            ew, epos = export_window(ke)
            print(f'{relief:>10} {sun:>14} {d:>4} {R:8.0f} {k:5d} {pos:10d} {further:11.2f} | {ke:5d} {epos:13d} {ew:13.2f}')
