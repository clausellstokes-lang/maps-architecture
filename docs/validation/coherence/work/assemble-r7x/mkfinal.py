#!/usr/bin/env python3
"""mkfinal.py (coherence/assemble-r7x, P3c) — the final texts (scratch final/): every live file's untouched copy (before/),
overlaid by apply.py's outputs (out/: the base, its rationale output, each volume a block routes to). No ASSEMBLE NOTE,
swap or restated row is to apply (section 2.5 of the report), so final/ is apply.py's output. Never writes a live file."""
import hashlib, json, os, shutil
SCR = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm7x'
W = '/home/user/maps-architecture/docs/validation/coherence/work/assemble-r7x'
snap = json.load(open(f'{W}/snapshot.json'))
if os.path.exists(f'{SCR}/final'): shutil.rmtree(f'{SCR}/final')
h = lambda p: hashlib.sha256(open(p, 'rb').read()).hexdigest()
for f in snap['files']:
    p = f['path']; dst = f'{SCR}/final/{p}'; os.makedirs(os.path.dirname(dst), exist_ok=True)
    src = f'{SCR}/out/{p}' if os.path.exists(f'{SCR}/out/{p}') else f'{SCR}/before/{p}'
    shutil.copyfile(src, dst)
    print(f"{p:<40} from {'out   ' if 'out/' in src else 'before'} {f['sha256'][:16]} -> {h(dst)[:16]}")
