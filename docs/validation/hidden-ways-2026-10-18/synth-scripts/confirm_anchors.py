# confirm-anchors: confirm-only check of file w as applied (hidden-ways/confirm-anchors, 2026-10-19).
# Run: python3 -I confirm_anchors.py   — reads only; writes nothing but stdout.
import json, hashlib, re, copy, sys
R = '/home/user/maps-architecture/'
D = R + 'docs/validation/hidden-ways-2026-10-18/'
frags = json.load(open(D + 'draft-w.fragments.json', encoding='utf-8'))
run = json.load(open(D + 'apply-run.json', encoding='utf-8'))
AMD = open(R + 'docs/AMENDMENTS-2026-10-18w.md', encoding='utf-8').read()
EXPECT_AFTER = {  # the apply seat's report, point 2
    'docs/volumes/V13-world.md': '81b3a003', 'docs/volumes/V14-sites.md': '1fcdce8e',
    'docs/HOST-REQUIREMENTS-2026-10-18.md': '7ff6f944', 'docs/volumes/INDEX.md': '1f988c2d',
    'docs/volumes/SUMMARY.md': '7de28faa'}
TOKENS = ['way_known', 'way_rung', 'way_forgotten', 'settlementId', 'wayId', '.js', '.ts', 'research/sf',
          'HRQ:', 'FPI:', 'TRD:', 'FTH:', 'FPS:', 'FRR:', 'PLG:', 'LNS:', 'src/']  # critic-3.md:34

checks = 0; fails = []; notes = []
def chk(cond, msg):
    global checks
    checks += 1
    if not cond: fails.append(msg)
def lineof(t, pos): return t.count('\n', 0, pos) + 1

files = sorted(set(x['file'] for x in frags))
raw = {f: open(R + f, 'rb').read() for f in files}
after = {f: raw[f].decode('utf-8') for f in files}

# ---- A. md5s as applied --------------------------------------------------------------------
for f in files:
    h = hashlib.md5(raw[f]).hexdigest()
    chk(h.startswith(EXPECT_AFTER[f]), f'A: {f} md5 {h[:8]} != apply seat {EXPECT_AFTER[f]}')
    chk(run['after'].get(f, '').startswith(h[:8]) if isinstance(run.get('after'), dict) else True,
        f'A: apply-run.json after[{f}] != live {h[:8]}')

# ---- B. new once, old zero (or old inside new) ----------------------------------------------
def check_new_old(texts, frs, tag=''):
    F = []
    for x in frs:
        t = texts[x['file']]; new = x['new']; old = x['old']
        cn = t.count(new)
        if cn != 1: F.append(f"B{tag}: {x['id']}: new occurs {cn}x in {x['file']}")
        co = t.count(old)
        if old in new:
            exp = new.count(old)
            if co != exp: F.append(f"B{tag}: {x['id']}: old (inside new) occurs {co}x, expected {exp} from new's content")
            if cn == 1:
                cut = t[:t.index(new)] + '\x00' + t[t.index(new) + len(new):]
                if cut.count(old) != 0: F.append(f"B{tag}: {x['id']}: old occurs {cut.count(old)}x outside its own new text")
        else:
            if co != 0: F.append(f"B{tag}: {x['id']}: old occurs {co}x (not a substring of new; expected 0)")
    return F
nsub = sum(1 for x in frags if x['old'] in x['new'])
F = check_new_old(after, frags); checks += 3 * len(frags) + nsub; fails += F

# final line of each new vs apply.md's table; apply-run.json's final counts
APM = open(D + 'apply.md', encoding='utf-8').read()
tab = {m.group(1): (int(m.group(2)), int(m.group(3)), int(m.group(4))) for m in re.finditer(r'^\| (\d{3} \([a-z]+\)) \| \w+ \| (\d+) \| (\d+) \| (\d+) \| ok', APM, re.M)}
chk(len(tab) == len(frags), f'B: apply.md table has {len(tab)} ok rows')
final_counts = {r['id']: r for r in run.get('final', [])}
for x in frags:
    t = after[x['file']]
    if t.count(x['new']) == 1 and x['id'] in tab:
        L = lineof(t, t.index(x['new']))
        chk(L == tab[x['id']][2], f"B: {x['id']}: new at line {L}, apply.md final {tab[x['id']][2]}")
        chk(tab[x['id']][0] == x['line'], f"B: {x['id']}: apply.md stated {tab[x['id']][0]} != JSON line {x['line']}")
    fc = final_counts.get(x['id'])
    chk(fc is not None and fc.get('newCount') == 1 and fc.get('oldOutsideNew') == 0, f"B: {x['id']}: apply-run.json final {fc}")

# ---- C. reverse to the pre-apply texts; stated md5s must come back ---------------------------
before = dict(after)
for x in reversed(frags):
    t = before[x['file']]
    chk(t.count(x['new']) == 1, f"C: reverse {x['id']}: new {t.count(x['new'])}x")
    before[x['file']] = t.replace(x['new'], x['old'], 1)
for f in files:
    h = hashlib.md5(before[f].encode('utf-8')).hexdigest()
    st = {x['md5'] for x in frags if x['file'] == f}
    chk(len(st) == 1 and h.startswith(next(iter(st)).rstrip('.…')), f'C: reversed {f} md5 {h[:8]} != stated {st}')
    chk(before[f].count('\n') + (0 if before[f].endswith('\n') else 1) == run['lines'][f]['before'] if isinstance(run.get('lines'), dict) and f in run['lines'] and isinstance(run['lines'][f], dict) else True,
        f'C: reversed {f} line count != apply-run.json before')

# forward replay from the reversed texts: landed line per fragment vs apply-run.json rows and apply.md
rows = {r['id']: r for r in run.get('rows', [])}
cur = dict(before)
for x in frags:
    t = cur[x['file']]
    chk(t.count(x['old']) == 1, f"C: replay {x['id']}: old {t.count(x['old'])}x")
    if t.count(x['old']) != 1: continue
    L = lineof(t, t.index(x['old']))
    r = rows.get(x['id'], {})
    chk(r.get('line') == L and r.get('stated') == x['line'] and r.get('ok') == 'ok', f"C: replay {x['id']}: landed {L}, apply-run.json row {r}")
    chk(tab.get(x['id'], (0, 0, 0))[1] == L, f"C: replay {x['id']}: landed {L}, apply.md landed {tab.get(x['id'])}")
    cur[x['file']] = t.replace(x['old'], x['new'], 1)
for f in files:
    chk(cur[f] == after[f], f'C: replay of {f} != live text')
    chk(run['lines'].get(f) == after[f].count('\n') + (0 if after[f].endswith('\n') else 1), f'C: apply-run.json lines[{f}] != wc -l')

# ---- D. amendments file: items and blockquotes by id ---------------------------------------
def unquote(lines):
    out = []
    for l in lines:
        if l == '>': out.append('')
        elif l.startswith('> '): out.append(l[2:])
        else: raise ValueError(l)
    return '\n'.join(out)
alines = AMD.split('\n')
hdr = re.compile(r'^\*\*(\d{3} \([a-z]+\))\.\*\* ')
items = {}; order = []
i = 0
while i < len(alines):
    m = hdr.match(alines[i])
    if m:
        id_ = m.group(1); order.append(id_)
        j = i + 1
        rec = {'head': alines[i]}
        for lab in ('*Current text (as it stands now):*', '*New text:*'):
            if j < len(alines) and alines[j] == lab:
                j += 1; q = []
                while j < len(alines) and alines[j].startswith('>'):
                    q.append(alines[j]); j += 1
                rec[lab] = q
        items[id_] = rec; i = j
    else: i += 1
jids = [x['id'] for x in frags]
chk(order == jids, f'D: amendments item order/ids != JSON ({len(order)} vs {len(jids)})')
for x in frags:
    rec = items.get(x['id'])
    if rec is None: chk(False, f"D: {x['id']} not in the amendments file"); continue
    for lab, key in (('*Current text (as it stands now):*', 'old'), ('*New text:*', 'new')):
        q = rec.get(lab)
        if q is None: chk(False, f"D: {x['id']} has no {lab} blockquote"); continue
        try: txt = unquote(q)
        except ValueError as e: chk(False, f"D: {x['id']} {lab} line not a blockquote line: {e}"); continue
        chk(txt == x[key], f"D: {x['id']} {lab} blockquote != JSON {key}")
    # the locator names the file and the line
    chk(f"`{x['file']}`" in rec['head'] and f"line {x['line']} " in rec['head'] and x['md5'][:8] in rec['head'],
        f"D: {x['id']} head does not name file/line/md5 as the JSON")
heads = re.findall(r'^\*\*(\d{3})\.\*\* ', AMD, re.M)
chk(heads == [str(n) for n in range(955, 976)], f'D: item headings {heads[:3]}…{heads[-3:]} != 955–975')
chk('Numbered from **955** (file v ended at 954); items 955–975.' in AMD, 'D: Numbered-from line')
chk('**APPLIED** by lane hidden-ways/apply on 2026-10-19' in AMD and '"i\nfollow your recommendations"' in AMD, 'D: APPLIED line / J421 verbatim')
# the items section byte for byte from draft-w.md
DW = open(D + 'draft-w.md', encoding='utf-8').read()
a_items = AMD[AMD.index('## The items'):AMD.index('## For the session (not items)')].rstrip('\n')
chk(a_items.endswith('\n\n---'), 'D: items section is not followed by a --- separator before For the session')
a_items = a_items[:-len('\n\n---')].rstrip('\n') if a_items.endswith('\n\n---') else a_items
d_items = DW[DW.index('## The items'):].rstrip('\n')
chk(a_items == d_items, 'D: items section != draft-w.md from "## The items"')

# ---- E. structure around every anchor, before vs after ---------------------------------------
CODE = re.compile(r'`[^`]*`')
def cells(line):
    s = CODE.sub('', line).replace('\\|', '')
    return s.count('|')
def table_block(lines, i):
    """the contiguous '|' block containing line i (0-based); None if line i is not a table row"""
    if not lines[i].lstrip().startswith('|'): return None
    a = i
    while a > 0 and lines[a - 1].lstrip().startswith('|'): a -= 1
    b = i
    while b + 1 < len(lines) and lines[b + 1].lstrip().startswith('|'): b += 1
    return a, b
def table_issues(lines, a, b):
    out = []
    if b - a < 1 or not re.match(r'^\s*\|?\s*:?-{3,}', lines[a + 1]): out.append(f'no separator row at {a + 2}')
    n = cells(lines[a])
    for k in range(a, b + 1):
        if cells(lines[k]) != n: out.append(f'row {k + 1} has {cells(lines[k])} pipes, header {n}')
    return out
NUM = re.compile(r'^(\s*)(\d+)\.\s')
def numlist_block(lines, i):
    m = NUM.match(lines[i])
    if not m: return None
    ind = m.group(1); a = i
    while a > 0 and NUM.match(lines[a - 1]) and NUM.match(lines[a - 1]).group(1) == ind: a -= 1
    b = i
    while b + 1 < len(lines) and NUM.match(lines[b + 1]) and NUM.match(lines[b + 1]).group(1) == ind: b += 1
    return a, b
def numlist_issue(lines, a, b):
    nums = [int(NUM.match(lines[k]).group(2)) for k in range(a, b + 1)]
    return None if nums == list(range(nums[0], nums[0] + len(nums))) else f'numbers {nums} at {a + 1}–{b + 1}'
def fences(lines):
    """list of (open_line, close_line, lang); fails on a stray or unclosed fence"""
    out = []; op = None; bad = []
    for k, l in enumerate(lines):
        if l.startswith('```'):
            if op is None:
                if l == '```': bad.append(f'bare ``` opens at {k + 1}')
                op = (k, l[3:])
            else:
                if l != '```': bad.append(f'close with tag at {k + 1}')
                out.append((op[0], k, op[1])); op = None
    if op is not None: bad.append(f'unclosed fence from {op[0] + 1}')
    return out, bad
def strip_ts(src):
    src = re.sub(r'/\*.*?\*/', '', src, flags=re.S)
    src = re.sub(r'//[^\n]*', '', src)
    src = re.sub(r"'(?:\\.|[^'\\\n])*'|\"(?:\\.|[^\"\\\n])*\"", "''", src)
    return src
def brace_balance(lines, a, b):
    s = strip_ts('\n'.join(lines[a + 1:b]))
    return s.count('{') - s.count('}'), s.count('(') - s.count(')'), s.count('[') - s.count(']')

tables_seen = 0; lists_seen = 0; fenced_frags = 0
for f in files:
    A = after[f].split('\n'); B = before[f].split('\n')
    fa, bada = fences(A); fb, badb = fences(B)
    chk(not bada, f'E: {f} fences after: {bada}')
    chk(len(fa) == len(fb), f'E: {f} fence count {len(fb)} → {len(fa)}')
    for (oa, ca, la), (ob, cb, lb) in zip(fa, fb):
        chk(la == lb, f'E: {f} fence tag {lb!r} → {la!r} at {oa + 1}')
        if la.strip() == 'ts':
            chk(brace_balance(A, oa, ca) == brace_balance(B, ob, cb),
                f'E: {f} ts block at {oa + 1}–{ca + 1} brace/paren/bracket balance {brace_balance(B, ob, cb)} → {brace_balance(A, oa, ca)}')
    for x in frags:
        if x['file'] != f: continue
        t = after[f]
        if t.count(x['new']) != 1: continue
        p = t.index(x['new']); L0 = lineof(t, p) - 1; L1 = lineof(t, p + len(x['new'])) - 1
        tb = before[f]; pb = tb.index(x['old']) if tb.count(x['old']) == 1 else None
        M0 = lineof(tb, pb) - 1 if pb is not None else None
        # a fragment inside a fence must keep the fence: no line of the new text starts a fence,
        # and the new sits inside a fence iff the old did
        in_after = any(oa <= L0 and L1 <= ca for oa, ca, _ in fa)
        in_before = (any(ob <= M0 <= cb for ob, cb, _ in fb)) if M0 is not None else in_after
        chk(in_after == in_before, f"E: {x['id']}: inside a fence before={in_before} after={in_after}")
        chk(not any(l.startswith('```') for l in x['new'].split('\n')), f"E: {x['id']}: new text carries a fence line")
        if in_after: fenced_frags += 1
        # tables: every row the new text touches (and its whole table) keeps the header's cell count
        done = set()
        for k in range(max(0, L0 - 1), min(len(A), L1 + 2)):
            tbk = table_block(A, k)
            if tbk and tbk not in done:
                done.add(tbk); tables_seen += 1
                iss = table_issues(A, *tbk)
                # pre-existing irregularity? the same table before (by its header line)
                pre = None
                if tbk[0] < len(A):
                    hl = A[tbk[0]]
                    for kk, l in enumerate(B):
                        if l == hl:
                            tbb = table_block(B, kk)
                            if tbb: pre = table_issues(B, *tbb)
                            break
                if iss and pre and set(pre) >= set(iss):
                    notes.append(f"E: {x['id']}: table at {tbk[0] + 1}–{tbk[1] + 1} irregular before and after alike: {iss[:2]}")
                    checks += 1
                else:
                    chk(not iss, f"E: {x['id']}: table at {tbk[0] + 1}–{tbk[1] + 1}: {iss[:3]}")
            nb = numlist_block(A, k)
            if nb and ('L', nb) not in done:
                done.add(('L', nb)); lists_seen += 1
                chk(numlist_issue(A, *nb) is None, f"E: {x['id']}: numbered list {numlist_issue(A, *nb)}")
        # a blockquote block stays a blockquote: every line of a new text whose first line is '> ' starts with '>'
        nl = x['new'].split('\n')
        if nl[0].startswith('>'):
            chk(all(l.startswith('>') for l in nl), f"E: {x['id']}: blockquote new text has a line without '>'")
        # a bullet insertion keeps its list: the line before an inserted '* ' or '- ' line is a list line or its continuation
        # (reported as notes only — the volumes mix bullets and indented continuations)
# §2.2's interface blocks: every `interface`/`type` line of V13 §2.2 inside a ts fence
V = after['docs/volumes/V13-world.md'].split('\n')
fa, _ = fences(V)
s22 = next(k for k, l in enumerate(V) if l.startswith('### 2.2 ')); e22 = next(k for k, l in enumerate(V) if k > s22 and l.startswith('### 2.3'))
iface = [k for k in range(s22, e22) if re.match(r'^(export )?(interface|type) ', V[k])]
for k in iface:
    chk(any(oa < k < ca and la.strip() == 'ts' for oa, ca, la in fa), f'E: V13 §2.2 line {k + 1} ({V[k][:40]!r}) not inside a ts fence')
newifaces = [k for k in iface if any(V[k] in x['new'] for x in frags if x['file'] == 'docs/volumes/V13-world.md')]

# ---- F. V13 §11 Q5 reads as answered ------------------------------------------------------
q5s = next(k for k, l in enumerate(V) if l.startswith('**Q5 — '))
q5e = q5s
while q5e + 1 < len(V) and V[q5e + 1].strip(): q5e += 1
q5 = '\n'.join(V[q5s:q5e + 1])
chk('**Answered 2026-10-19 (J421):**' in q5, 'F: V13 §11 Q5 has no "Answered 2026-10-19 (J421)"')
for ph in ('the price accepted', 'M-W2 10 pw', 'staged row 39–47', 'M-W2 named', "stand-in from `routeFacts`' stretches", 'a product of the simulator feed'):
    chk(ph in q5, f'F: Q5 answer lacks {ph!r}')
chk(q5.count('**Q5 — ') == 1 and sum(1 for l in V if l.startswith('**Q5 — ')) == 1, 'F: Q5 heading not exactly once')
# the 966 (c) fragment is the one that carries it
c966 = next(x for x in frags if x['id'] == '966 (c)')
chk('**Answered 2026-10-19 (J421):**' in c966['new'] and q5 in c966['new'] and c966['new'].startswith(c966['old']), 'F: 966 (c) new text does not carry the Q5 paragraph (an insertion after Q4\'s last lines)')
# residue: other applied texts still calling Q5 open (recorded, not failed — outside this step per the apply seat)
for x in frags:
    if x['id'] == '966 (c)': continue
    t = after[x['file']]
    if t.count(x['new']) == 1:
        L = lineof(t, t.index(x['new']))
        seg = x['new']
        for ph in ('put to the owner in Q5 (vetoable)', 'open for the owner', '(recommended; vetoable)', 'pending your look'):
            if ph in seg: notes.append(f"F: residue {x['id']} at {x['file']}:{L} still says {ph!r}")

# ---- G. clean room over V13/V14 new texts --------------------------------------------------
for x in frags:
    if x['file'].startswith('docs/volumes/V1'):
        for tok in TOKENS:
            chk(tok not in x['new'], f"G: {x['id']}: clean-room token {tok!r} in a V13/V14 new text")

# ---- H. negative controls on copies --------------------------------------------------------
neg = []
m = copy.deepcopy(frags); m[17]['new'] = m[17]['new'][:-1] + ('X' if m[17]['new'][-1] != 'X' else 'Y')
neg.append(('new altered', m[17]['id'], len(check_new_old(after, m))))
t2 = dict(after); x = frags[40]; t2[x['file']] = t2[x['file']] + '\n' + x['old']
neg.append(('old re-added', x['id'], len(check_new_old(t2, frags))))
it = items[frags[5]['id']]['*New text:*']; bad = it[:]; bad[0] = bad[0] + 'x'
neg.append(('amendments blockquote altered', frags[5]['id'], unquote(bad) != frags[5]['new']))
A2 = after['docs/volumes/INDEX.md'].split('\n'); k = next(k for k, l in enumerate(A2) if l.startswith('|') and 'Q5' in l)
A2[k] = A2[k].rstrip('|') ; tb = table_block(A2, k)
neg.append(('table cell dropped', f'INDEX.md:{k + 1}', len(table_issues(A2, *tb)) > 0))
fb2 = fences(V[:686] + V[687:])[1]  # drop V13's first fence line (line 687)
neg.append(('fence line removed', 'V13:687', len(fb2) > 0))

print(f'fragments {len(frags)} (old inside new: {nsub}); targets {len(files)}; items in amendments {len(order)}')
print(f'tables checked around anchors {tables_seen}; numbered lists {lists_seen}; fragments inside fences {fenced_frags}; §2.2 interface/type lines {len(iface)} ({len(newifaces)} touched by file w)')
print('checks', checks, 'failures', len(fails))
for f_ in fails: print(' FAIL', f_)
for n_ in notes: print(' NOTE', n_)
for n_ in neg: print(' NEG', n_)
