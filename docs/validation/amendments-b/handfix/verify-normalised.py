#!/usr/bin/env python3
"""verify-normalised.py — an independent check of handfix.py's output (lane handfix-b/apply, 2026-09-27; opus, PENDING
FABLE REVIEW). It re-applies handfix.py's rows by a second, simpler route — the line-level rows (insert_line,
append_entry, j_row, rat_a) on the original lines, then every replace / insert_after on the WHITESPACE-COLLAPSED text
(each quoted string collapsed the same way, counted exactly once) — and compares the result with the collapsed output.
Equal means the output differs from the input by exactly the rows and by whitespace (soft line breaks) alone.
It also reports the line structure: code-fence balance, heading lines, table rows' cell counts, and the lines whose
whitespace alone changed. usage: python3 verify-normalised.py ORIG_DOC ORIG_RAT OUT_DOC OUT_RAT"""
import importlib.util, os, re, sys

spec = importlib.util.spec_from_file_location('hf', os.path.join(os.path.dirname(os.path.abspath(__file__)), 'handfix.py'))
hf = importlib.util.module_from_spec(spec)
spec.loader.exec_module(hf)
od, orat, nd, nrat = (open(p, encoding='utf-8').read() for p in sys.argv[1:5])
norm = lambda s: re.sub(r'\s+', ' ', s)


def line_rows(text, rows):
    L = text.split('\n')
    for r in rows:
        if r['kind'] == 'insert_line':
            ix = [i for i, l in enumerate(L) if l.startswith(r['anchor'])]
            assert len(ix) == 1, r['anchor']
            L.insert(ix[0] + 1, r['text'])
        elif r['kind'] == 'append_entry':
            ix = [i for i, l in enumerate(L) if l.startswith('| ' + r['anchor'] + ' |')]
            assert len(ix) == 1, r['anchor']
            l = L[ix[0]].rstrip()
            assert l.endswith(' |')
            L[ix[0]] = l[:-2] + ' ' + r['text'] + ' |'
        elif r['kind'] in ('j_row', 'rat_a'):
            sec = '# Judgment calls' if r['kind'] == 'j_row' else '## Part A'
            hdr = re.compile(r'^\| id \| the choice \| where \|\s*$' if r['kind'] == 'j_row' else r'^\| id \| call \|\s*$')
            s = next(i for i, l in enumerate(L) if l.startswith(sec))
            h = next(i for i in range(s, len(L)) if hdr.match(L[i]))
            j = h + 1
            while j + 1 < len(L) and L[j + 1].startswith('|'):
                j += 1
            L.insert(j + 1, r['text'])
    return '\n'.join(L)


ok = True
for fkey, orig, out in (('doc', od, nd), ('rat', orat, nrat)):
    rows = [r for r in hf.R if r['file'] == fkey]
    t = norm(line_rows(orig, rows))
    for r in rows:
        if r['kind'] not in ('replace', 'insert_after'):
            continue
        a = norm(r['anchor'])
        c = t.count(a)
        if c != 1:
            print(f"{fkey}: row #{r['n']} {r['id']} {r['sub']}: collapsed anchor count {c}"); ok = False; continue
        t = t.replace(a, norm(r['text']) if r['kind'] == 'replace' else a + norm(r['text']))
    same = t == norm(out)
    ok &= same
    print(f"{fkey}: collapsed re-application equals the output: {same}")
    if not same:
        import difflib
        sm = difflib.SequenceMatcher(None, t, norm(out), autojunk=False)
        for tag, i1, i2, j1, j2 in sm.get_opcodes()[:10]:
            if tag != 'equal':
                print('  ', tag, repr(t[max(0, i1 - 60):i2 + 20]), '->', repr(norm(out)[max(0, j1 - 60):j2 + 20]))
    # structure
    for name, text in (('input', orig), ('output', out)):
        fence, heads, bad_rows = None, 0, []
        hdr_cells = None
        L = text.split('\n')
        for i, l in enumerate(L):
            m = re.match(r'^\s*(```|~~~)', l)
            if m:
                fence = m.group(1) if fence is None else (None if m.group(1) == fence else fence); continue
            if fence:
                continue
            if re.match(r'^#{1,6}\s+\S', l):
                heads += 1
            if l.startswith('|'):
                cells = len(re.split(r'(?<!\\)\|', l.rstrip())) - 2
                if i == 0 or not L[i - 1].startswith('|'):
                    hdr_cells = cells
                elif cells != hdr_cells:
                    bad_rows.append(i + 1)
                if not l.rstrip().endswith('|'):
                    bad_rows.append(i + 1)
        print(f"  {fkey} {name}: fences balanced {fence is None}, headings {heads}, table rows off their header's cell count {len(bad_rows)} {bad_rows[:8]}")
print('VERIFY', 'OK' if ok else 'FAILED')
sys.exit(0 if ok else 1)
