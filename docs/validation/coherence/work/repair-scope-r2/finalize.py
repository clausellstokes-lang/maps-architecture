#!/usr/bin/env python3
"""finalize.py — writes docs/validation/coherence/repair-r2-scope.md: header.txt, the ALLOW rows (allow.txt, each
prefixed '# ALLOW '), then the blocks build.py renders. Prints the file's sha256."""
import hashlib, os, subprocess
W = os.path.dirname(os.path.abspath(__file__)); ROOT = '/home/user/maps-architecture'
OUT = os.path.join(ROOT, 'docs/validation/coherence/repair-r2-scope.md')
tmp = os.path.join(W, 'blocks.out.md')
subprocess.run(['python3', os.path.join(W, 'build.py'), '--out', tmp], check=True, capture_output=True)
head = open(os.path.join(W, 'header.txt'), encoding='utf-8').read().rstrip('\n') + '\n'
allow = ''.join('# ALLOW ' + l + '\n' for l in open(os.path.join(W, 'allow.txt'), encoding='utf-8').read().split('\n') if l.strip())
txt = head + allow + '\n' + open(tmp, encoding='utf-8').read()
open(OUT, 'w', encoding='utf-8').write(txt)
os.remove(tmp)
print(OUT, hashlib.sha256(txt.encode()).hexdigest())
