#!/usr/bin/env python3
"""The gate's list of SOURCE-READING tests (tools/session/gates/gate2.sh, the step 'scans@1000'; J812), one path per
line, sorted; run in plat/. `vitest related` selects a test by what it imports, so a test that READS source files from
disk — a type-checked scan, a census of a package's sources, a text check of a source file — is invisible to it: site's
one-door scan was broken by the eighty-fourth landing and no gate saw it. A test is on this list when it uses the file
system or the TypeScript compiler AND, outside its import lines, builds a path into a src folder. Tests that read only
fixtures, goldens or registers of their own folder are not on it: their folder's NEAR run covers them. Read by text; a
file wrongly on the list costs seconds, a file wrongly off it is a scan no gate runs — so the reading leans to
inclusion (53 of the tree's 105 disk-reading tests on 2026-11-13)."""
import os
import re

FS = re.compile(r"createProgram|readdirSync|readFileSync")
IMPORT_LINE = re.compile(r"^\s*(import|export)\b.*$", re.M)
SRC_PATH = re.compile(
    r"""(createProgram|new URL\(\s*['"`][^'"`]*\bsrc\b[^'"`]*['"`]\s*,\s*import\.meta\.url\s*\)|(join|resolve)\([^()]*['"`]src['"`]"""
    r"""|['"`](\.\./)+src(/[^'"`]*)?['"`]\s*[,)]|packages/[a-z]+/src|bench/src|SRC_DIR|_SRC\b|\bSRC\b)""")
out = []
for root in ('packages', 'bench', 'tools'):
    for dp, dn, fn in os.walk(root):
        dn[:] = [d for d in dn if d not in ('node_modules', 'dist', '.turbo')]
        for f in fn:
            if not f.endswith('.test.ts'):
                continue
            p = os.path.join(dp, f)
            s = open(p, encoding='utf-8', errors='ignore').read()
            if FS.search(s) and SRC_PATH.search(IMPORT_LINE.sub('', s)):
                out.append(p)
print('\n'.join(sorted(out)))
