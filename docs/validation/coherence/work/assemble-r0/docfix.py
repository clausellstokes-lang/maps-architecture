# Lane coherence/assemble-r0, step (b): the mechanical corrections of document-check hits in docs/ARCHITECTURE.md (exact
# replacements, each matching exactly once). Run once; a second run finds nothing to replace and stops.
#   S1 (l. 14088, §11.1's export table, the 3-D row): a code span holding two unescaped pipes split the row into 5 cells
#      against the header's 3 (GitHub-flavoured Markdown truncates the row); the pipes are escaped as '\|', S1's own rule.
import os, sys
os.chdir('/home/user/maps-architecture')
P = 'docs/ARCHITECTURE.md'
FIXES = [("`compositions: 'asDrawn' | 'derive' | 'none'`", "`compositions: 'asDrawn' \\| 'derive' \\| 'none'`")]
t = open(P, encoding='utf-8').read()
for a, b in FIXES:
    n = t.count(a)
    if n != 1: print(f'STOP: {a!r} matched {n} times'); sys.exit(2)
    t = t.replace(a, b); print('fixed:', b)
open(P, 'w', encoding='utf-8').write(t)
