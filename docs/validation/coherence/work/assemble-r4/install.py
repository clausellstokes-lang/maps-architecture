#!/usr/bin/env python3
"""install.py (coherence/assemble-r4, P3c) — installs the final texts (scratch final/) over the live files, only if every
live file still has the sha256 snapshot.py recorded (no other writer since); verifies each written file byte-identical to
its final copy. Writes install.json (sha256 before and after of every live file this seat may write)."""
import hashlib, json, os, shutil, sys
ROOT = '/home/user/maps-architecture'; os.chdir(ROOT)
W = 'docs/validation/coherence/work/assemble-r4'
FIN = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm4/final'
snap = json.load(open(f'{W}/snapshot.json'))
h = lambda p: hashlib.sha256(open(p, 'rb').read()).hexdigest()
for f in snap['files']:
    if h(f['path']) != f['sha256']: sys.exit(f"STOP — {f['path']} changed since the snapshot")
out = []
for f in snap['files']:
    src = os.path.join(FIN, f['path'])
    new = h(src)
    changed = new != f['sha256']
    if changed:
        shutil.copyfile(src, f['path'])
        assert h(f['path']) == new
    b = open(f['path'], 'rb').read()
    out.append(dict(path=f['path'], sha256_before=f['sha256'], sha256_after=h(f['path']), changed=changed,
                    bytes_before=f['bytes'], bytes_after=len(b), words_before=f['words'], words_after=len(b.decode('utf-8').split())))
    print(f"{f['path']:<38} {'CHANGED' if changed else 'same   '} {f['sha256'][:16]} -> {h(f['path'])[:16]}")
json.dump(out, open(f'{W}/install.json', 'w'), indent=1)
