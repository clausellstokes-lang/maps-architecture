# Assemble the consistency-pass ARCHITECTURE.md from the six parts' section files (lane consistency/assemble-r0).
# Mechanical: order = the archived document's top-level (# / ##) heading order; each heading matched by exactly one file
# whose first line is byte-identical; separator = one blank line. Writes to argv[1]. Exit 2 (nothing written) on any
# unmatched heading or file.
import glob, os, re, sys
ROOT = '/Users/cstokes/Desktop/Maps'
ARCH = f'{ROOT}/docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md'
NEW = f'{ROOT}/docs/validation/consistency/new'
out_path = sys.argv[1]
def top_heads(text):
    fence = False; out = []
    for i, l in enumerate(text.split('\n')):
        if l.lstrip().startswith('```'): fence = not fence; continue
        if not fence and re.match(r'#{1,2} ', l): out.append((i + 1, l))
    return out
old = open(ARCH, encoding='utf-8').read()
heads = top_heads(old)
files = sorted(glob.glob(f'{NEW}/*/*.md'))
first = {}
problems = []
for f in files:
    t = open(f, encoding='utf-8').read()
    fl = t.split('\n', 1)[0]
    first.setdefault(fl, []).append(f)
    extra = [h for h in top_heads(t)[1:]]
    if extra: problems.append(f'file {os.path.relpath(f, ROOT)} holds more than one top-level heading: {extra[:3]}')
order = []
for ln, h in heads:
    fs = first.get(h, [])
    if len(fs) != 1: problems.append(f'archived heading l. {ln} {h[:80]!r} matched by {len(fs)} files: {fs}')
    else: order.append((ln, h, fs[0]))
used = {f for _, _, f in order}
for f in files:
    if f not in used: problems.append(f'file {os.path.relpath(f, ROOT)} has no archived heading: {open(f, encoding="utf-8").readline().strip()[:80]!r}')
if problems:
    print('STOP — placement problems:'); [print(' ', p) for p in problems]; sys.exit(2)
parts = [open(f, encoding='utf-8').read().rstrip('\n') for _, _, f in order]
doc = '\n\n'.join(parts) + '\n'
# Post-placement mechanical edits, each named in a rewrite report as the assembler's to make (exactly one match each).
POST = [
    # rewrite-pipeline.md §1 "Heading renames for the assembler (CF-PIPE-08)"
    ('## II.3 Block content dispatch, pins, local identities (S2 context features)\n',
     '## II.3 Block content dispatch, pins, local identities (stage-2 feature S2: context features)\n'),
    ("## II.4 The render tier, the workflow and the close-up's persistence status (S5, S6)\n",
     "## II.4 The render tier, the workflow and the close-up's persistence status (stage-2 features S5, S6)\n"),
]
for a, b in POST:
    n = doc.count(a)
    if n != 1: print(f'STOP — post edit matched {n} times: {a[:70]!r}'); sys.exit(2)
    doc = doc.replace(a, b); print(f'post edit applied: {b.strip()[:90]}')
open(out_path, 'w', encoding='utf-8').write(doc)
for ln, h, f in order: print(f'{ln:>6}  {os.path.relpath(f, NEW):<55} {h[:70]}')
print(f'placed {len(order)} of {len(heads)} headings from {len(files)} files; {len(doc.encode())} bytes, {doc.count(chr(10))} lines -> {out_path}')
