#!/usr/bin/env python3
"""apply-blocks.py — the BLOCK PROTOCOL applier (lane amendments-b/assemble-r0, 2026-09-27; reused by later rounds).

Mechanical, stdlib only, run from anywhere. It never edits in place: it reads the architecture document and its
rationale companion, applies the block files, and writes the results and a JSON log to the paths given; installing the
outputs over the live files is a separate, checked step of the lane that runs it.

usage:
  python3 apply-blocks.py --doc docs/ARCHITECTURE.md --rationale docs/ARCHITECTURE-RATIONALE.md \
      --out-doc OUT.md --out-rationale OUT-R.md --log LOG.json BLOCKFILE [BLOCKFILE ...]
  Block files are applied in NAME order (sorted by basename), whatever order the command line gives.
  --parse-only   parse the block files and print their inventory; apply nothing.

THE BLOCK PROTOCOL (workflows/09-amendments-b.js). Text before a file's first "=== " line is ignored. Block kinds:
  "=== REPLACE <exact heading line> ==="  the complete new text of that heading's subsection, heading line first; a
                                          subsection ends at the next heading of the same or higher level (headings
                                          inside fenced code are not headings)
  "=== INSERT AFTER <exact heading line> ==="       text placed directly after the heading line
  "=== APPEND TO SECTION <exact heading line> ==="  text placed at the end of that subsection
  "=== J-ROWS ==="       rows for the judgment index table (| J-A… | the choice | §where |), appended after the last row
                         of the index table of the document's "# Judgment calls" section
  "=== RATIONALE-A ==="  full entries (rows of Part A's "| id | call |" table) appended to the end of Part A of the
                         rationale file, directly after its table's last row, before "## Part B"
  "=== END ==="          closes the last block
  Files in name order, blocks in file order; every block is located on the document AS IT STANDS after the blocks
  before it. Two REPLACEs of one heading: both applied in order and reported. A block naming a missing (or ambiguous)
  heading: skipped and reported. A file whose last block is not closed by "=== END ===" (or followed by another block
  header) is TRUNCATED: its complete blocks are applied, the truncated tail is skipped and reported. A line starting
  "=== " that is no valid header is MALFORMED: it closes the block before it, and its own text is skipped and reported.

SPACING (this script's rules, stated so a later round reproduces them). A block body is taken without its leading and
trailing blank lines. REPLACE keeps the replaced range's trailing blank lines. APPEND TO SECTION puts one blank line and
the body after the subsection's last non-blank line (the subsection's trailing blank lines stay after it; when none
existed and a heading follows, one blank line is added). INSERT AFTER puts one blank line and the body after the
heading line (and one blank line after the body when the next line is not blank). J-ROWS and RATIONALE-A rows go
directly after their table's last row, with no blank line. A REPLACE whose body opens with a different heading line of
the same level retitles the heading (reported); a body that does not open with a heading of the target's level is
skipped.

AUDIT (in the log). After all blocks: every applied section block's body is searched in the output as a contiguous run
of lines — an APPEND / INSERT body must occur exactly once (a later REPLACE of its heading that carries it verbatim is
reported CARRIED; one that drops it, LOST), a REPLACE body once unless a later REPLACE of the same heading superseded it
(a body interleaved by later blocks' text is checked as an ordered subsequence); every J-ROWS and RATIONALE-A row once;
the J-ROWS ids against the RATIONALE-A ids; duplicate ids in both tables; headings, code fences, the title block.
"""
import argparse, glob, hashlib, json, os, re, sys

FENCE = re.compile(r'^\s*(```|~~~)')
HEAD = re.compile(r'^(#{1,6})\s+\S')
SECTION_HDR = re.compile(r'^=== (REPLACE|INSERT AFTER|APPEND TO SECTION) (.+?) ===\s*$')
PLAIN_HDR = re.compile(r'^=== (J-ROWS|RATIONALE-A|END) ===\s*$')
ROW_ID = re.compile(r'^\|\s*([^|]+?)\s*\|')


def sha(s):
    return hashlib.sha256(s.encode('utf-8')).hexdigest()


def headings(lines):
    """[(index, level, line)] of the headings outside fenced code, and whether every fence closed."""
    out, fence = [], None
    for i, l in enumerate(lines):
        m = FENCE.match(l)
        if m:
            if fence is None:
                fence = m.group(1)
            elif m.group(1) == fence:
                fence = None
            continue
        if fence is None and HEAD.match(l):
            out.append((i, len(l) - len(l.lstrip('#')), l))
    return out, fence is None


def level(line):
    return len(line) - len(line.lstrip('#'))


def section_range(lines, heads, k):
    i, lvl, _ = heads[k]
    return i, next((h[0] for h in heads[k + 1:] if h[1] <= lvl), len(lines))


def strip_blank(body):
    b = list(body)
    while b and not b[0].strip():
        b.pop(0)
    while b and not b[-1].strip():
        b.pop()
    return b


def trailing_blank(seq):
    n = 0
    for l in reversed(seq):
        if l.strip():
            break
        n += 1
    return n


def find_heading(lines, target):
    """Indices into headings() of the heading lines equal to target (exact, then trailing-space-normalised)."""
    heads, _ = headings(lines)
    ks = [k for k, h in enumerate(heads) if h[2] == target]
    if ks:
        return heads, ks, 'exact'
    ks = [k for k, h in enumerate(heads) if h[2].rstrip() == target.rstrip()]
    return heads, ks, 'normalised'


def parse_blocks(path):
    """The blocks of one file, in file order, with their closure state; plus file-level issues."""
    text = open(path, encoding='utf-8').read()
    fl = text.split('\n')
    blocks, issues, cur, seen_header, after_end = [], [], None, False, False
    for n, l in enumerate(fl):
        if l.startswith('=== ') or l.rstrip() == '===':
            m1, m2 = SECTION_HDR.match(l), PLAIN_HDR.match(l)
            if cur is not None:
                cur['closed'] = True
            seen_header = True
            if m2 and m2.group(1) == 'END':
                cur, after_end = None, True
                continue
            after_end = False
            if m1:
                cur = dict(file=os.path.basename(path), line=n + 1, kind=m1.group(1), target=m1.group(2), body=[], closed=False)
            elif m2:
                cur = dict(file=os.path.basename(path), line=n + 1, kind=m2.group(1), target='', body=[], closed=False)
            else:
                cur = dict(file=os.path.basename(path), line=n + 1, kind='MALFORMED', target=l, body=[], closed=False)
            blocks.append(cur)
        elif cur is not None:
            cur['body'].append(l)
        elif seen_header and l.strip():
            issues.append(f'l. {n + 1}: text outside any block ignored ({"after an END line" if after_end else "stray"}): {l[:80]!r}')
    for i, b in enumerate(blocks):
        b['index'] = i + 1
    return dict(file=os.path.basename(path), path=path, sha256=hashlib.sha256(open(path, 'rb').read()).hexdigest(),
                lines=text.count('\n') + (0 if text.endswith('\n') else 1), blocks=blocks, issues=issues)


def table_bounds(lines, s, e, header_rx):
    """(header index, last row index) of the first table in [s, e) whose header row matches header_rx (fences respected)."""
    fence = None
    i = s
    while i < e:
        l = lines[i]
        m = FENCE.match(l)
        if m:
            if fence is None:
                fence = m.group(1)
            elif m.group(1) == fence:
                fence = None
            i += 1
            continue
        if fence is None and header_rx.match(l) and i + 1 < e and re.match(r'^\|\s*:?-{3,}', lines[i + 1]):
            j = i + 1
            while j + 1 < e and lines[j + 1].startswith('|'):
                j += 1
            return i, j
        i += 1
    return None, None


def row_ids(lines, h, last):
    return [m.group(1) for l in lines[h + 2:last + 1] for m in [ROW_ID.match(l)] if m]


def count_runs(hay, needle):
    """Start indices where the list `needle` occurs contiguously in the list `hay`."""
    if not needle:
        return []
    first, n = needle[0], len(needle)
    return [i for i, l in enumerate(hay) if l == first and hay[i:i + n] == needle]


def subsequence_in(hay, needle, start=0):
    j = 0
    for i in range(start, len(hay)):
        if j < len(needle) and hay[i] == needle[j]:
            j += 1
            if j == len(needle):
                return True
    return j == len(needle)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--doc', default='docs/ARCHITECTURE.md')
    ap.add_argument('--rationale', default='docs/ARCHITECTURE-RATIONALE.md')
    ap.add_argument('--out-doc')
    ap.add_argument('--out-rationale')
    ap.add_argument('--log')
    ap.add_argument('--parse-only', action='store_true')
    ap.add_argument('--judgment-heading', default='Judgment calls', help='text a level-1 heading starts with')
    ap.add_argument('--part-a-heading', default='Part A', help='text the rationale file\'s level-2 Part A heading starts with')
    ap.add_argument('blockfiles', nargs='+')
    a = ap.parse_args()

    files = sorted(dict.fromkeys(a.blockfiles), key=lambda p: os.path.basename(p))
    parsed = [parse_blocks(f) for f in files]
    if a.parse_only:
        for pf in parsed:
            print(f"{pf['file']}: {len(pf['blocks'])} blocks, {pf['lines']} lines, sha256 {pf['sha256'][:16]}…")
            for b in pf['blocks']:
                rows = sum(1 for l in b['body'] if l.startswith('|'))
                print(f"   #{b['index']:<2} l.{b['line']:>5} {b['kind']:<18} {'' if b['closed'] else 'UNCLOSED '}{b['target'][:90]}"
                      f"  ({len(strip_blank(b['body']))} lines{', %d rows' % rows if b['kind'] in ('J-ROWS', 'RATIONALE-A') else ''})")
            for i in pf['issues']:
                print('   ISSUE', i)
        return
    if not (a.out_doc and a.out_rationale and a.log):
        sys.exit('--out-doc, --out-rationale and --log are required unless --parse-only')
    for p in (a.out_doc, a.out_rationale):
        if os.path.abspath(p) in (os.path.abspath(a.doc), os.path.abspath(a.rationale)):
            sys.exit('STOP — this script never writes in place; give new output paths')

    doc_text = open(a.doc, encoding='utf-8').read()
    rat_text = open(a.rationale, encoding='utf-8').read()
    doc = doc_text.split('\n')
    rat = rat_text.split('\n')
    heads0, bal0 = headings(doc)
    if not bal0:
        sys.exit('STOP — the input document has an unclosed code fence')
    log = dict(input_doc=a.doc, input_doc_sha256=sha(doc_text), input_rationale=a.rationale, input_rationale_sha256=sha(rat_text),
               files=[dict(file=pf['file'], sha256=pf['sha256'], lines=pf['lines'], blocks=len(pf['blocks']), issues=pf['issues'])
                      for pf in parsed],
               applied=[], skipped=[], notes=[], audit={}, checks={})

    replaced = {}      # heading text -> tag of the REPLACE that produced it last
    seq = 0
    for pf in parsed:
        blocks = pf['blocks']
        for b in blocks:
            tag = f"{b['file']} #{b['index']} (l. {b['line']}) {b['kind']}{(' ' + b['target'][:100]) if b['target'] else ''}"
            b['tag'] = tag
            if b['kind'] == 'MALFORMED':
                log['skipped'].append(dict(block=tag, file=b['file'], line=b['line'], kind=b['kind'], reason='malformed "=== " header line; its text skipped'))
                continue
            if not b['closed']:
                log['skipped'].append(dict(block=tag, file=b['file'], line=b['line'], kind=b['kind'],
                                           reason='TRUNCATED — the file\'s last block is not closed by "=== END ==="; skipped for the repair round'))
                continue
            body = strip_blank(b['body'])
            seq += 1
            rec = dict(seq=seq, block=tag, file=b['file'], index=b['index'], line=b['line'], kind=b['kind'], heading=b['target'],
                       body_lines=len(body), body_sha256=sha('\n'.join(body)))

            if b['kind'] in ('J-ROWS', 'RATIONALE-A'):
                lines = doc if b['kind'] == 'J-ROWS' else rat
                heads, _ = headings(lines)
                if b['kind'] == 'J-ROWS':
                    ks = [k for k, h in enumerate(heads) if h[1] == 1 and h[2].lstrip('#').strip().startswith(a.judgment_heading)]
                    hdr_rx = re.compile(r'^\|\s*id\s*\|\s*the choice\s*\|\s*where\s*\|\s*$')
                else:
                    ks = [k for k, h in enumerate(heads) if h[1] == 2 and h[2].lstrip('#').strip().startswith(a.part_a_heading)]
                    hdr_rx = re.compile(r'^\|\s*id\s*\|\s*call\s*\|\s*$')
                if len(ks) != 1:
                    seq -= 1
                    log['skipped'].append(dict(block=tag, file=b['file'], line=b['line'], kind=b['kind'], reason=f'target section found {len(ks)} times'))
                    continue
                s, e = section_range(lines, heads, ks[0])
                h, last = table_bounds(lines, s, e, hdr_rx)
                if h is None:
                    seq -= 1
                    log['skipped'].append(dict(block=tag, file=b['file'], line=b['line'], kind=b['kind'], reason='index table not found in the target section'))
                    continue
                ncols = len(re.split(r'(?<!\\)\|', lines[h].rstrip())) - 2
                existing = set(row_ids(lines, h, last))
                existing_rows = set(lines[h + 2:last + 1])
                rows, bad, dup_same, dup_id, cells_bad = [], [], [], [], []
                for l in body:
                    if not l.strip():
                        continue
                    if not (l.startswith('|') and l.rstrip().endswith('|')):
                        bad.append(l[:80]); continue
                    if l in existing_rows:
                        dup_same.append(ROW_ID.match(l).group(1)); continue
                    rid = ROW_ID.match(l).group(1)
                    if rid in existing:
                        dup_id.append(rid)
                    c = len(re.split(r'(?<!\\)\|', l.rstrip())) - 2
                    if c != ncols:
                        cells_bad.append(f'{rid}: {c} cells against {ncols}')
                    rows.append(l); existing.add(rid)
                lines[last + 1:last + 1] = rows
                rec.update(target_table=f'{"document" if b["kind"] == "J-ROWS" else "rationale"} l. {h + 1} (header {lines[h][:40]!r})',
                           inserted_after_line=last + 1, rows_inserted=len(rows), row_ids=[ROW_ID.match(r).group(1) for r in rows])
                for what, lst in (('non-row line skipped', bad), ('row already present verbatim, not repeated', dup_same),
                                  ('DUPLICATE ID inserted (an id the table already holds)', dup_id), ('cell count differs from the header', cells_bad)):
                    if lst:
                        log['notes'].append(dict(block=tag, note=what, items=lst))
                log['applied'].append(rec)
                continue

            heads, ks, how = find_heading(doc, b['target'])
            if len(ks) != 1:
                seq -= 1
                log['skipped'].append(dict(block=tag, file=b['file'], line=b['line'], kind=b['kind'],
                                           reason=f"heading found {len(ks)} times in the document as it stands" + (' (after the blocks before it)' if log['applied'] else '')))
                continue
            if how != 'exact':
                log['notes'].append(dict(block=tag, note='heading matched only after trailing-whitespace normalisation'))
            k = ks[0]
            s, e = section_range(doc, heads, k)
            tl = heads[k][1]
            bh, bbal = headings(body)
            if not bbal:
                seq -= 1
                log['skipped'].append(dict(block=tag, file=b['file'], line=b['line'], kind=b['kind'], reason='block text has an unclosed code fence'))
                continue
            rec.update(target_line=s + 1, section_old=f'{s + 1}–{e}', section_old_n=e - s)
            if b['kind'] == 'REPLACE':
                first = body[0] if body else ''
                if not HEAD.match(first) or level(first) != tl:
                    seq -= 1
                    log['skipped'].append(dict(block=tag, file=b['file'], line=b['line'], kind=b['kind'],
                                               reason=f'block text begins {first[:80]!r}, not a heading of level {tl}'))
                    continue
                if first != doc[s]:
                    rec['retitled_to'] = first
                    log['notes'].append(dict(block=tag, note='REPLACE retitles the heading', old=doc[s], new=first))
                sib = [h[2] for h in bh[1:] if h[1] <= tl]
                if sib:
                    rec['adds_same_or_higher_headings'] = sib
                    log['notes'].append(dict(block=tag, note='REPLACE body holds heading(s) of the target level or higher after its first line', items=sib))
                if b['target'] in replaced or doc[s] in replaced:
                    prev = replaced.get(b['target']) or replaced.get(doc[s])
                    rec['second_replace_of'] = prev
                    log['notes'].append(dict(block=tag, note='SECOND REPLACE of one heading — applied in order', earlier=prev))
                old = doc[s:e]
                new = body + [''] * trailing_blank(old)
                doc[s:e] = new
                replaced[b['target']] = tag
                replaced[first] = tag
                rec.update(section_new_n=len(new), new_headings=[h[2] for h in bh])
            elif b['kind'] == 'APPEND TO SECTION':
                kk = e - 1
                while kk > s and not doc[kk].strip():
                    kk -= 1
                ins = [''] + body + ([''] if kk + 1 == e and e < len(doc) else [])
                doc[kk + 1:kk + 1] = ins
                sib = [h[2] for h in bh if h[1] <= tl]
                if sib:
                    log['notes'].append(dict(block=tag, note='APPEND body holds heading(s) of the target level or higher', items=sib))
                rec.update(inserted_at_line=kk + 2, lines_inserted=len(ins), new_headings=[h[2] for h in bh])
            elif b['kind'] == 'INSERT AFTER':
                ins = [''] + body + ([''] if s + 1 < len(doc) and doc[s + 1].strip() else [])
                doc[s + 1:s + 1] = ins
                rec.update(inserted_at_line=s + 2, lines_inserted=len(ins), new_headings=[h[2] for h in bh])
            b['applied_body'] = body
            log['applied'].append(rec)

    # ---------------- audit
    out_doc = '\n'.join(doc)
    out_rat = '\n'.join(rat)
    heads1, bal1 = headings(doc)
    blocks_by_tag = {b['tag']: b for pf in parsed for b in pf['blocks'] if 'tag' in b}
    applied = log['applied']
    audit = []
    for r in applied:
        b = blocks_by_tag[r['block']]
        if r['kind'] in ('J-ROWS', 'RATIONALE-A'):
            hay = doc if r['kind'] == 'J-ROWS' else rat
            rows = [l for l in strip_blank(b['body']) if l.startswith('|')]
            counts = [len(count_runs(hay, [l])) for l in rows]
            bad = [(ROW_ID.match(l).group(1), c) for l, c in zip(rows, counts) if c != 1]
            audit.append(dict(block=r['block'], state='OK' if not bad else 'ROW COUNT ≠ 1', rows=len(rows), rows_not_once=bad))
            continue
        body = b['applied_body']
        n = len(count_runs(doc, body))
        later = [x for x in applied if x['seq'] > r['seq'] and x['kind'] == 'REPLACE' and
                 (x['heading'] == r['heading'] or x['heading'] == r.get('retitled_to'))]
        if n == 1:
            state = 'CARRIED by a later REPLACE of its heading (present once, byte-identical)' if (later and r['kind'] != 'REPLACE') else 'OK (present once)'
        elif n == 0:
            if later and r['kind'] == 'REPLACE':
                state = 'SUPERSEDED by a later REPLACE of the same heading'
            elif later:
                state = 'LOST — overwritten by a later REPLACE that does not carry it'
            elif subsequence_in(doc, body):
                state = 'OK (present as an ordered subsequence: later blocks inserted text inside it)'
            else:
                state = 'MISSING — not found in the output'
        else:
            state = f'DUPLICATED ({n} occurrences)'
        audit.append(dict(block=r['block'], kind=r['kind'], heading=r['heading'], occurrences=n, later_replaces=[x['block'] for x in later], state=state))
    log['audit']['blocks'] = audit
    # J ids against Part A ids
    jr = {}
    ra = {}
    for r in applied:
        if r['kind'] == 'J-ROWS':
            for i in r['row_ids']:
                jr.setdefault(i, []).append(r['file'])
        if r['kind'] == 'RATIONALE-A':
            for i in r['row_ids']:
                ra.setdefault(i, []).append(r['file'])
    log['audit']['j_rows_without_part_a'] = sorted(set(jr) - set(ra))
    log['audit']['part_a_without_j_rows'] = sorted(set(ra) - set(jr))
    log['audit']['j_ids_in_two_blocks'] = {i: f for i, f in jr.items() if len(f) > 1}
    for name, lines, hrx in (('document index', doc, re.compile(r'^\|\s*id\s*\|\s*the choice\s*\|\s*where\s*\|\s*$')),
                             ('Part A', rat, re.compile(r'^\|\s*id\s*\|\s*call\s*\|\s*$'))):
        h, last = table_bounds(lines, 0, len(lines), hrx)
        ids = row_ids(lines, h, last) if h is not None else []
        dups = sorted({i for i in ids if ids.count(i) > 1})
        log['audit'][f'{name} rows'] = len(ids)
        log['audit'][f'{name} duplicate ids'] = dups
    title_end = next((h[0] for h in heads0[1:]), 0)
    log['checks'] = dict(
        headings_before=len(heads0), headings_after=len(heads1),
        headings_added=[h[2] for h in heads1 if h[2] not in {x[2] for x in heads0}],
        headings_removed=[h[2] for h in heads0 if h[2] not in {x[2] for x in heads1}],
        fences_balanced=bal1, fence_lines_before=sum(1 for l in doc_text.split('\n') if FENCE.match(l)),
        fence_lines_after=sum(1 for l in doc if FENCE.match(l)),
        title_block_unchanged=doc_text.split('\n')[:title_end] == doc[:title_end],
        pending_fable_review_lines_before=sum(1 for l in doc_text.split('\n') if 'PENDING FABLE REVIEW' in l),
        pending_fable_review_lines_after=sum(1 for l in doc if 'PENDING FABLE REVIEW' in l),
        doc_bytes_before=len(doc_text.encode()), doc_bytes_after=len(out_doc.encode()),
        doc_lines_before=doc_text.count('\n'), doc_lines_after=out_doc.count('\n'),
        rationale_bytes_before=len(rat_text.encode()), rationale_bytes_after=len(out_rat.encode()),
        rationale_lines_before=rat_text.count('\n'), rationale_lines_after=out_rat.count('\n'),
        blocks_total=sum(len(pf['blocks']) for pf in parsed), blocks_applied=len(applied), blocks_skipped=len(log['skipped']),
        output_doc_sha256=sha(out_doc), output_rationale_sha256=sha(out_rat))
    open(a.out_doc, 'w', encoding='utf-8').write(out_doc)
    open(a.out_rationale, 'w', encoding='utf-8').write(out_rat)
    json.dump(log, open(a.log, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)

    c = log['checks']
    print(f"files {len(parsed)}; blocks {c['blocks_total']} found, {c['blocks_applied']} applied, {c['blocks_skipped']} skipped")
    for pf in log['files']:
        for i in pf['issues']:
            print(f"  FILE ISSUE {pf['file']}: {i}")
    for s in log['skipped']:
        print(f"  SKIPPED {s['block']} — {s['reason']}")
    for nt in log['notes']:
        print(f"  NOTE {nt['block']} — {nt['note']}" + (f": {nt.get('items') or ''}" if nt.get('items') else '') +
              (f" [{nt.get('old', '')[:60]!r} -> {nt.get('new', '')[:60]!r}]" if 'old' in nt else '') +
              (f" (earlier: {nt['earlier']})" if 'earlier' in nt else ''))
    bad = [x for x in audit if not x['state'].startswith('OK') and not x['state'].startswith('CARRIED') and not x['state'].startswith('SUPERSEDED')]
    print(f"audit: {len(audit)} blocks; not OK: {len(bad)}")
    for x in audit:
        if not x['state'].startswith('OK'):
            print(f"  AUDIT {x['block'][:110]} — {x['state']}")
    for k in ('j_rows_without_part_a', 'part_a_without_j_rows', 'j_ids_in_two_blocks', 'document index rows', 'document index duplicate ids',
              'Part A rows', 'Part A duplicate ids'):
        print(f"  {k}: {log['audit'][k]}")
    print(f"headings {c['headings_before']} -> {c['headings_after']} (+{len(c['headings_added'])} / -{len(c['headings_removed'])}); "
          f"fences balanced {c['fences_balanced']} ({c['fence_lines_before']} -> {c['fence_lines_after']} fence lines); "
          f"title block unchanged {c['title_block_unchanged']}; PENDING FABLE REVIEW lines {c['pending_fable_review_lines_before']} -> {c['pending_fable_review_lines_after']}")
    print(f"document {c['doc_bytes_before']} -> {c['doc_bytes_after']} bytes, {c['doc_lines_before']} -> {c['doc_lines_after']} lines, sha256 {c['output_doc_sha256']}")
    print(f"rationale {c['rationale_bytes_before']} -> {c['rationale_bytes_after']} bytes, {c['rationale_lines_before']} -> {c['rationale_lines_after']} lines, sha256 {c['output_rationale_sha256']}")


if __name__ == '__main__':
    main()
