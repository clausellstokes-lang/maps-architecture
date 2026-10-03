#!/usr/bin/env python3
"""after.py (coherence/assemble-r7y, P7, new) — the sha256, bytes, words and lines of every live file this seat may write,
after every step (install, the three G-cite fixes, the checks and the bundle), each checked byte-identical to its final copy
(scratch final/), against the snapshot's 'before'. Writes after.json."""
import hashlib, json, os
ROOT = '/home/user/maps-architecture'; os.chdir(ROOT)
W = 'docs/validation/coherence/work/assemble-r7y'
FIN = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm7y/final'
snap = json.load(open(f'{W}/snapshot.json')); inst = {x['path']: x for x in json.load(open(f'{W}/install.json'))}
out = []
for f in snap['files']:
    b = open(f['path'], 'rb').read(); h = hashlib.sha256(b).hexdigest()
    same = b == open(os.path.join(FIN, f['path']), 'rb').read()
    out.append(dict(path=f['path'], sha256_before=f['sha256'], sha256_installed=inst[f['path']]['sha256_after'], sha256_after=h,
                    changed=h != f['sha256'], equals_final_copy=same, bytes=[f['bytes'], len(b)], words=[f['words'], len(b.decode().split())],
                    lines=[None, b.count(b'\n')]))
    print(f"{f['path']:<38} {'CHANGED' if h != f['sha256'] else 'same   '} {f['sha256'][:16]} -> {h[:16]} (installed {inst[f['path']]['sha256_after'][:16]}) final-copy-equal {same}")
json.dump(out, open(f'{W}/after.json', 'w'), indent=1)
print('all equal to final copies:', all(x['equals_final_copy'] for x in out))
