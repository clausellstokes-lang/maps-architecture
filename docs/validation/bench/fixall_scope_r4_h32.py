# usage: python3 fixall_scope_r4_h32.py   (lane fixall/draft-scope-r4, 2026-09-26; stdlib only; run from docs/validation/bench/ or the project root)
# PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/draft-scope-r4 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.
# The check vectors of ARCHITECTURE §13.6 (2)'s round-4 seed formulas (VS3-6), computed with the committed H32 of
# fixall_scope_r3_h32.py (our own MurmurHash3 port, which reproduces SMHasher's verification values).
import importlib.util, os
here = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location('h32', os.path.join(here, 'fixall_scope_r3_h32.py')); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m)
print(f"SMHasher verification MurmurHash3_x86_128 = 0x{m.verification(m.mmh3_x86_128, 16):08X} (published 0xB3ECE62A)")
for s in ['d5-ng/M5/area/0', 'd5-ng/M5/ring/4']:
    h = m.H32(s); print(f"H32({s!r}) = {h}; NG seed 1 + (H32 mod 2147483646) = {1 + h % 2147483646}")
for s in ['d5/M5/area/0/0', 'd5-ftg/M2b/TOWN/2026-09-21T05-08-07']:  # the second id is illustrative only (an existing capture folder name), not a panel choice
    h = m.H32(s); print(f"H32({s!r}) = {h} (a PLAT Seed)")
