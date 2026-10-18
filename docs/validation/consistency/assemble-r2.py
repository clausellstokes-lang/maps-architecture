# Apply the consistency pass's round-2 repair blocks to docs/ARCHITECTURE.md (lane consistency/assemble-r2).
# PENDING FABLE REVIEW — Opus-produced (consistency/assemble-r2).
# Mechanical. Input: argv[1] (the document to repair), the six docs/validation/consistency/repair-r2-*.md files.
# Output: argv[2] (the repaired document) and a JSON log at argv[3].
# Block grammar (the lane brief; the same rules as assemble-r1.py): a block starts at a line
# "=== REPLACE <exact heading line> ===" or "=== INSERT AFTER <exact heading line> ===" and ends at the next line
# starting "===" or at end of file; text before a file's first "===" line is ignored. REPLACE replaces the heading's
# whole subsection — from the heading line up to the next heading of the same or a higher level (headings inside fenced
# code are not headings) — with the block's text, which begins with the heading line itself. The range's own trailing
# blank lines are kept, so the spacing between sections does not change. Every range is located on the input document
# before any block is applied; overlapping ranges stop the run; a heading found 0 or 2+ times, a malformed "===" line and
# INSERT AFTER blocks (none exist in round 2) are reported and skipped. No post-assembly edit: no repair-r2 lane named
# one for the assembler (docs/lane-events.log, 17:46–17:55; the rendering lane's §16 note is optional and addressed to
# scope — see assemble-r2.md §5).
import difflib, glob, hashlib, json, os, re, sys

ROOT = '/Users/cstokes/Desktop/Maps'
REPAIRS = sorted(glob.glob(f'{ROOT}/docs/validation/consistency/repair-r2-*.md'))
FENCE = re.compile(r'^\s*(```|~~~)')
HEAD = re.compile(r'^(#{1,6})\s+\S')
BLOCK = re.compile(r'^=== (REPLACE|INSERT AFTER) (.*) ===\s*$')


def headings(lines):
    out, fence = [], None
    for i, l in enumerate(lines):
        m = FENCE.match(l)
        if m:
            if fence is None: fence = m.group(1)
            elif m.group(1) == fence: fence = None
            continue
        if fence is None and HEAD.match(l):
            out.append((i, len(l) - len(l.lstrip('#')), l))
    return out, fence is None


def section_end(lines, heads, k):
    i, lvl, _ = heads[k]
    return next((h[0] for h in heads[k + 1:] if h[1] <= lvl), len(lines))


def trailing_blank(seq):
    n = 0
    for l in reversed(seq):
        if l.strip(): break
        n += 1
    return n


src_path, out_path, log_path = sys.argv[1], sys.argv[2], sys.argv[3]
text = open(src_path, encoding='utf-8').read()
lines = text.split('\n')
heads, balanced = headings(lines)
if not balanced: sys.exit('STOP — input document has an unclosed code fence')

blocks = []
for f in REPAIRS:
    fl = open(f, encoding='utf-8').read().split('\n')
    cur = None
    for n, l in enumerate(fl):
        if l.startswith('==='):
            m = BLOCK.match(l)
            if not m:
                blocks.append(dict(file=os.path.basename(f), line=n + 1, kind='MALFORMED', target=l, body=[]))
                cur = None; continue
            cur = dict(file=os.path.basename(f), line=n + 1, kind=m.group(1), target=m.group(2), body=[])
            blocks.append(cur)
        elif cur is not None:
            cur['body'].append(l)

log = dict(input=src_path, input_sha256=hashlib.sha256(text.encode()).hexdigest(),
           files=[os.path.basename(f) for f in REPAIRS],
           file_sha256={os.path.basename(f): hashlib.sha256(open(f, 'rb').read()).hexdigest() for f in REPAIRS},
           applied=[], skipped=[], post=[], checks={})
plan = []
for b in blocks:
    tag = f"{b['file']} l. {b['line']}: {b['kind']} {b['target'][:90]}"
    if b['kind'] != 'REPLACE':
        log['skipped'].append(dict(block=tag, reason=f"{b['kind']} block — not applied (no anchor rule for it in the brief)")); continue
    ks = [k for k, h in enumerate(heads) if h[2] == b['target']]
    if len(ks) != 1:
        log['skipped'].append(dict(block=tag, reason=f'heading found {len(ks)} times in the input document')); continue
    k = ks[0]
    s, e = heads[k][0], section_end(lines, heads, k)
    body = list(b['body'])
    while body and not body[0].strip(): body.pop(0)
    while body and not body[-1].strip(): body.pop()
    first = body[0] if body else ''
    bh, bbal = headings(body)
    lvl = heads[k][1]
    problems = []
    if first != b['target']: problems.append(f'block text begins {first[:80]!r}, not the target heading')
    if not bbal: problems.append('block text has an unclosed code fence')
    if any(h[1] <= lvl for h in bh[1:]): problems.append('block text holds a heading of the target level or higher after its first line')
    if problems:
        log['skipped'].append(dict(block=tag, reason='; '.join(problems))); continue
    plan.append(dict(tag=tag, file=b['file'], line=b['line'], target=b['target'], start=s, end=e, body=body))

plan.sort(key=lambda p: p['start'])
for a, b in zip(plan, plan[1:]):
    if b['start'] < a['end']:
        sys.exit(f"STOP — overlapping ranges: {a['tag']} (l. {a['start'] + 1}–{a['end']}) and {b['tag']} (l. {b['start'] + 1}–{b['end']})")

new = list(lines)
for p in sorted(plan, key=lambda p: -p['start']):
    old = lines[p['start']:p['end']]
    t = trailing_blank(old)
    repl = p['body'] + [''] * t
    oh = [h[2] for h in headings(old)[0]]
    nh = [h[2] for h in headings(p['body'])[0]]
    sm = difflib.SequenceMatcher(None, old, repl, autojunk=False)
    ops = [op for op in sm.get_opcodes() if op[0] != 'equal']
    changed_old = sum(i2 - i1 for tag, i1, i2, j1, j2 in ops)
    changed_new = sum(j2 - j1 for tag, i1, i2, j1, j2 in ops)
    hunks = [dict(doc_lines=f"{p['start'] + i1 + 1}–{p['start'] + i2}" if i2 > i1 else f"after {p['start'] + i1}",
                  old=old[i1:i2], new=repl[j1:j2]) for tag, i1, i2, j1, j2 in ops]
    new[p['start']:p['end']] = repl
    log['applied'].append(dict(block=p['tag'], file=p['file'], block_line=p['line'], heading=p['target'],
                               old_lines=f"{p['start'] + 1}–{p['end']}", old_n=len(old), new_n=len(repl),
                               old_bytes=len('\n'.join(old).encode()), new_bytes=len('\n'.join(repl).encode()),
                               lines_changed_old=changed_old, lines_changed_new=changed_new, hunks=len(ops),
                               identical=(old == repl), subheadings_same=(oh == nh),
                               subheadings_old=oh[1:], subheadings_new=nh[1:], hunk_text=hunks))
log['applied'].sort(key=lambda a: (a['file'], a['block_line']))
out = '\n'.join(new)

# Checks on the output.
ol = out.split('\n')
oh, obal = headings(ol)
log['checks'] = dict(
    fences_balanced=obal,
    fence_lines=sum(1 for l in ol if FENCE.match(l)),
    pending_fable_review_lines=[i + 1 for i, l in enumerate(ol) if 'PENDING FABLE REVIEW' in l],
    engine_id_occurrences=[i + 1 for i, l in enumerate(ol) if 'plat-arrangement@' in l],
    headings_before=len(heads), headings_after=len(oh),
    heading_lines_same=[h[2] for h in heads] == [h[2] for h in oh],
    blocks_total=len(blocks), blocks_applied=len(log['applied']), blocks_skipped=len(log['skipped']),
    bytes_before=len(text.encode()), bytes_after=len(out.encode()),
    lines_before=text.count('\n'), lines_after=out.count('\n'),
    output_sha256=hashlib.sha256(out.encode()).hexdigest())
open(out_path, 'w', encoding='utf-8').write(out)
json.dump(log, open(log_path, 'w'), ensure_ascii=False, indent=1)
c = log['checks']
print(f"blocks: {c['blocks_total']} found, {c['blocks_applied']} applied, {c['blocks_skipped']} skipped")
for s in log['skipped']: print('  SKIPPED', s['block'], '—', s['reason'])
for a in log['applied']:
    print(f"  {a['file']:<26} l.{a['block_line']:>5}  doc l. {a['old_lines']:<12} {a['old_n']:>4} -> {a['new_n']:>4} lines, "
          f"{a['hunks']} hunk(s), changed {a['lines_changed_old']:>3}/{a['lines_changed_new']:>3}{'  IDENTICAL' if a['identical'] else ''}"
          f"{'' if a['subheadings_same'] else '  SUBHEADINGS DIFFER'}  {a['heading'][:60]}")
print(f"fences balanced {c['fences_balanced']} ({c['fence_lines']} fence lines); PENDING FABLE REVIEW lines {c['pending_fable_review_lines']}; "
      f"engine id lines {c['engine_id_occurrences']}; headings {c['headings_before']} -> {c['headings_after']} (same lines: {c['heading_lines_same']})")
print(f"{c['bytes_before']} -> {c['bytes_after']} bytes; {c['lines_before']} -> {c['lines_after']} lines; sha256 {c['output_sha256']}")
