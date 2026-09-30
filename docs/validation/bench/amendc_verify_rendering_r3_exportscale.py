# PENDING FABLE REVIEW — receipt of amendments-c/verify-rendering-r3 (opus stand-in verifier). Our own code, stdlib only.
# VRC3-04: one lit export tile's window (§8.8's print paragraph: "≤ 30 MB whatever R", a 16-MB block cache) at export
# scales finer than the 1:500 / 300 dpi case the repair's receipt (3) measured. §8.7 lets PNG and print render "at any
# DPI" at the export's own scale. The partition and the block memory are the repair receipt's own functions
# (amendc_repair_rendering_r3_blocks.py, imported unchanged, its printout suppressed); the window is its receipt (3)'s
# sum: the tile's float32 surface 3 MB + pyramid 1/3 MB, its first ring 8 x (1 + 1/3) MB, its blocks at 4 B per cell.
import math, random, importlib.util, io, contextlib, os
HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location('blk', os.path.join(HERE, 'amendc_repair_rendering_r3_blocks.py'))
blk = importlib.util.module_from_spec(spec)
with contextlib.redirect_stdout(io.StringIO()):
    spec.loader.exec_module(blk)
MB = 1048576.0
print('one lit export tile\'s window, the window reaching the whole frame, 64 placements (the repair receipt (3)\'s method)')
for flabel, fw, fh in (('CITY (5.0 km + margins)', 5000 * 1.6, 5000 * 1.6),
                       ('the cap, square (12.4 km + margins)', 12400 * 1.6, 12400 * 1.6)):
    for dpi, scale in ((300, 500), (600, 500), (300, 250), (300, 100), (600, 100)):
        S_e = 512 * 0.0254 / dpi * scale
        ntx = math.ceil(fw / S_e); nty = math.ceil(fh / S_e)
        doc = (0, 0, ntx - 1, nty - 1)
        rnd = random.Random(11); worst = (0, {}, 0.0)
        for _ in range(64):
            Vv = (rnd.randrange(ntx), rnd.randrange(nty), 1, 1)
            blk.CELLS[0] = blk.CELLS[1] = 0.0
            first, per = blk.held(Vv, max(ntx, nty), doc)
            if blk.CELLS[0] > worst[2]: worst = (first, per, blk.CELLS[0])
        first, per, cells = worst; nb = sum(per.values())
        blocks_mb = 4 * cells / MB
        win = 3.0 + 1 / 3 + first * (1 + 1 / 3) + blocks_mb
        print(f'  {flabel:36s} {dpi} dpi at 1:{scale:<4d} (export tile side {S_e:6.2f} m): {nb:3d} blocks over orders '
              f'0-{max(per):2d}, blocks {blocks_mb:5.2f} MB ({"within" if blocks_mb <= 16 else "OVER"} the 16-MB cache); '
              f'window {win:5.2f} MB ({"<= 30" if win <= 30 else "> 30"})')
