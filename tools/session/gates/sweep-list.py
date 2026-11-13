#!/usr/bin/env python3
"""The seed sweep's default file list (tools/session/gates/sweep.sh), printed one path per line, sorted; run in plat/.
A test file is on the list when a fixed PLAT_FUZZ_SEED can change what it draws: it calls fast-check itself (an import
of 'fast-check', an fc runner, `fuzzParams(`), or reaches a module that does through its RELATIVE imports (a folder's
support.ts, a bench source that draws), or imports '@plat/testkit' and names one of the kit's fuzz entry points. Read
by text, not by a compiler: a file wrongly on the list costs a few seconds per seed; a file wrongly off it is a
property the sweep never reads — so the reading leans to inclusion."""
import os
import re

files = []
for root in ('packages', 'bench', 'tools'):
    for dp, _dn, fn in os.walk(root):
        if 'node_modules' in dp or '/dist' in dp:
            continue
        for f in fn:
            if f.endswith(('.ts', '.mts', '.mjs')):
                files.append(os.path.join(dp, f))
src = {f: open(f, encoding='utf-8', errors='ignore').read() for f in files}
IMPORT = re.compile(r"""(?:from|import)\s*\(?\s*['"]([^'"]+)['"]""")
DIRECT = re.compile(r"from 'fast-check'|\bfc\.(assert|property|check|asyncProperty|sample|statistics)\b|fuzzParams\(")
KIT = re.compile(r"\b(runFuzz|fuzz[A-Z]\w*|\w+Arb\b|arbitrar|seedFamily|replaySeed|fuzzRuns)")


def resolve(f, spec):
    if not spec.startswith('.'):
        return None
    base = os.path.normpath(os.path.join(os.path.dirname(f), spec))
    for c in (base, re.sub(r'\.js$', '.ts', base), re.sub(r'\.mjs$', '.mts', base), base + '.ts', os.path.join(base, 'index.ts')):
        if c in src:
            return c
    return None


direct = {f for f, s in src.items() if DIRECT.search(s)}
memo = {}


def reaches(f, seen):
    if f in memo:
        return memo[f]
    if f in seen:
        return False
    seen.add(f)
    r = f in direct
    if not r:
        for spec in IMPORT.findall(src[f]):
            g = resolve(f, spec)
            if g is not None and reaches(g, seen):
                r = True
                break
    memo[f] = r
    return r


out = []
for f in sorted(files):
    if not f.endswith('.test.ts'):
        continue
    if reaches(f, set()) or ("@plat/testkit" in src[f] and KIT.search(src[f])):
        out.append(f)
print('\n'.join(out))
