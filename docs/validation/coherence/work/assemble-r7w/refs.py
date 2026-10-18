# coherence/assemble-r7w (as assemble-r1): assemble-r0's refs.py unchanged but for ROOT, read from REFS_ROOT (a mirror tree of the set).
# Lane coherence/assemble-r0, step (a): resolve every reference in the base, the volumes and INDEX.md against the
# headings and ids that now exist. Read-only over the live files. Usage: refs.py OUT.json
#
# Citation forms (canon S7, G-cite): a bare '§x.y' is the base's; a volume's section is 'Vnn §x.y' everywhere, self-
# references and every item of a list included; 'INDEX §n' is INDEX.md's. Lines are read joined (a reference wrapped
# across a line break — "V06\n§2.13", "volume\n12 §3.6b" — is one reference).
# Targets:
#   base      numbered headings (§n, n.m, II.n, II.n.m, PART n); D-n from '**D-n —'; J-ids from the judgment index's rows
#             '| J-… |'; bars Tn-m from '(Tn-m)' in §13 (and '(Tn-a – Tn-b)'); T-RIG-n likewise; T-ER-nn from first table
#             cells.
#   volume n  numbered headings (n, n.m, n.m.k, letter suffixes) and bold-numbered paragraph labels ('**3.5.2 Title');
#             T-Vn-m and J-Vn.m from first table cells or bold list items ('* **T-V2-1 …'), ranges expanded.
#   J-VI.n    first table cells of docs/volumes/_integrate.md.
#   external  a § reference whose list head is another document (a file name, IMPROVEMENTS, RFC n, …); a J-id of a family
#             the set does not define (J-RF, J-Fsf, J-M, J-SS) found in the repository's other records.
# Classes of a bare '§x' (L = the volume heading its comma list, if any — a 'Vnn §' reference earlier in the open list, or
# a parenthesis opened right after a volume's name, "reads from V11 (§3.18, …"; U = the citing unit):
#   in a volume list L: in L only → FIX (prefix 'Vnn ', G-cite); in the base only → resolved (base); in both → resolved,
#   listed as ambiguous-form; in neither → BROKEN.  No list: in the base → resolved; else in U's own volume → FIX (prefix
#   'Vnn ', G-cite self-reference); else BROKEN.  Refined: a bare '§x' in no base heading and in no open volume list is
#   FIXED to the one volume among {the citing volume} ∪ {the volumes the clause names before it} that has §x, and BROKEN
#   when none or several do; "each volume's §x" is a generic reference, resolved when every volume has §x.
import glob, json, os, re, subprocess, sys
from collections import Counter
ROOT = os.environ.get('REFS_ROOT', '/home/user/maps-architecture')  # assemble-r1, -r2, -r3: the tree to resolve (a mirror)
os.chdir(ROOT)
rd = lambda p: open(p, encoding='utf-8').read()
UNITS = [('base', 'docs/ARCHITECTURE.md')] + [(os.path.basename(f)[:3], f) for f in sorted(glob.glob('docs/volumes/V*.md'))] + [('INDEX', 'docs/volumes/INDEX.md')]
texts = {u: rd(p) for u, p in UNITS}
NUM = r'\d+[a-z]?(?:\.\d+[a-z]?)*'

def heading_nums(text, vol):
    s = set(); fence = False
    for l in text.split('\n'):
        if l.lstrip().startswith('```'): fence = not fence; continue
        if fence: continue
        m = re.match(r'#+\s+(?:§)?((?:II|III)\.' + NUM + '|' + NUM + r')\b', l)
        if m: s.add(m.group(1))
        m = re.match(r'#+\s+PART\s+([IVX]+)\b', l)
        if m: s.add(m.group(1))
        if vol:
            for m in re.finditer(r'\*\*(\d+[a-z]?(?:\.\d+[a-z]?)+)[ .:*]', l): s.add(m.group(1))
    return s
heads = {u: heading_nums(t, u.startswith('V')) for u, t in texts.items()}

def expand_range(a, b):
    pa, na = re.match(r'(.*?)(\d+)$', a).groups(); pb, nb = re.match(r'(.*?)(\d+)$', b).groups()
    if pa != pb or int(nb) < int(na) or int(nb) - int(na) > 400: return [a, b]
    w = len(na) if na.startswith('0') else 0
    return [f'{pa}{str(n).zfill(w)}' for n in range(int(na), int(nb) + 1)]

DASH = r'\s*[–-]\s*'
defs = set()
base = texts['base']; bl = base.split('\n')
s13 = next(i for i, l in enumerate(bl) if l.startswith('## §13 ')); s14 = next(i for i, l in enumerate(bl) if l.startswith('## §14 '))
jc = next(i for i, l in enumerate(bl) if l.startswith('# Judgment calls')); st = next(i for i, l in enumerate(bl) if l.startswith('# Staged by'))
sec13 = '\n'.join(bl[s13:s14])
for m in re.finditer(r'\((T\d+-\d+|T-RIG-\d+)(?:' + DASH + r'(T\d+-\d+|T-RIG-\d+))?\)', sec13):
    defs.update(expand_range(m.group(1), m.group(2)) if m.group(2) else [m.group(1)])
for l in bl[jc:st]:
    m = re.match(r'\|\s*(J-[A-Za-z]+-?\d+(?:\.\d+)?)\s*\|', l)
    if m: defs.add(m.group(1))
for m in re.finditer(r'^\*\*(D-\d+)\b', base, re.M): defs.add(m.group(1))
IDF = r'((?:T-ER|T-V\d+|J-V\d+|J-VI)[-.]\d+)'
FIRSTCELL = re.compile(r'^\|\s*(?:\*\*)?' + IDF + r'(?:\*\*)?(?:' + DASH + r'(?:\*\*)?' + IDF + r'(?:\*\*)?)?\s*\|', re.M)
BULLET = re.compile(r'^\s*(?:[*-] )?\*\*' + IDF + r'(?:' + DASH + IDF + r')?\b', re.M)
def firstcells(t):
    out = set()
    for rx in (FIRSTCELL, BULLET):
        for m in rx.finditer(t): out.update(expand_range(m.group(1), m.group(2)) if m.group(2) else [m.group(1)])
    return out
defs |= {d for d in firstcells(base) if d.startswith('T-ER')}
for u, t in texts.items():
    if u.startswith('V'):
        n = str(int(u[1:]))
        defs |= {d for d in firstcells(t) if d.startswith(f'T-V{n}-') or d.startswith(f'J-V{n}.')}
defs |= {d for d in firstcells(rd('docs/volumes/_integrate.md')) if d.startswith('J-VI')}
EXTSRC = ['docs/AMENDMENTS-2026-09-28f.md', 'docs/AMENDMENTS-2026-09-28g.md'] + glob.glob('research/**/*.md', recursive=True) + glob.glob('docs/volumes/critique/**/*.md', recursive=True)
extcorpus = '\n'.join(rd(f) for f in EXTSRC if os.path.isfile(f))

EXT = re.compile(r'(\.md|\.json|\.tsv|\.js|\.ts|\.py|\.csv|IMPROVEMENTS|CONFIDENCE|DEFINITION|OWNER-INSTRUCTIONS|OWNER-DECISIONS|'
                 r'AMENDMENTS|RFC \d+|ISO[ \d-]*|canon|README|SUMMARY|critique|proposal|findings?|tool-survey|_integrate|'
                 r'VALIDATION|RATIONALE)[`\'’s)]*\s*$', re.I)
UNITTAIL = re.compile(r'^\s*(?:m|cm|mm|km|ms|s|pw|px|%|°|h|ha|kg|t|MB|KB|GB|dB|min|m²)\b')

def flatten(t):
    """Join wrapped lines: a newline (plus indentation) between two non-blank lines becomes one space. Returns the flat
    text and, per flat index, the original index."""
    out = []; pos = []
    L = t.split('\n'); off = 0
    for k, l in enumerate(L):
        if k > 0:
            if L[k - 1].strip() and l.strip() and not l.lstrip().startswith(('|', '#', '```')) and not L[k - 1].rstrip().endswith('|'):
                s = len(l) - len(l.lstrip())
                out.append(' '); pos.append(off - 1)
                out.extend(l[s:]); pos.extend(range(off + s, off + len(l)))
                off += len(l) + 1; continue
            out.append('\n'); pos.append(off - 1)
        out.extend(l); pos.extend(range(off, off + len(l)))
        off += len(l) + 1
    return ''.join(out), pos

VOLREF = re.compile(r'(?<![A-Za-z0-9_\-])(?:V(\d{1,2})|[Vv]olume (\d{1,2}))(?:\'s)? ?§ ?(' + NUM + r')')
BAREREF = re.compile(r'(?<![A-Za-z0-9_§])§ ?((?:II|III)\.' + NUM + '|' + NUM + r')')
IDXREF = re.compile(r'INDEX(?:\.md`?)?(?:\'s)? §(' + NUM + r')')
CONT = re.compile(r'(?:\s*(?:,|–|-|/|and|or|to)\s*)(\d+[a-z]?(?:\.\d+[a-z]?)+)(?![\d.]*\d)')
BREAK = re.compile(r'[;|\n]|\.\s+(?=[A-Z*`(])')
GENERIC = re.compile(r"(?:[Ee]ach|[Ee]very) volume's (?:\*\*)?$")   # "each volume's §1b": every volume's own section
BASEWORD = re.compile(r"(?:the base's|base|the base) $")
vol_unit = lambda n: f'V{int(n):02d}'
refs = []; fixes = []
for u, t in texts.items():
    flat, pos = flatten(t)
    lineof = lambda i: t.count('\n', 0, pos[i]) + 1
    items = []   # (start, end, kind, unit-target, num)
    for m in IDXREF.finditer(flat): items.append([m.start(), m.end(), 'index', 'INDEX', m.group(1)])
    for m in VOLREF.finditer(flat):
        if any(a <= m.start() < b for a, b, *_ in items): continue
        vu = vol_unit(m.group(1) or m.group(2))
        form = 'short' if (m.group(1) and len(m.group(1)) == 1) else ('volume-word' if m.group(2) else 'canon')
        items.append([m.start(), m.end(), 'vol', vu, m.group(3).rstrip('.'), form])
        p = m.end()
        while True:
            c = CONT.match(flat, p)
            if not c or UNITTAIL.match(flat[c.end():]): break
            items.append([c.start(1), c.end(), 'vol-cont', vu, c.group(1)]); p = c.end()
    for m in BAREREF.finditer(flat):
        if any(a <= m.start() < b for a, b, *_ in items): continue
        items.append([m.start(), m.end(), 'bare', None, m.group(1).rstrip('.')])
        p = m.end()
        while True:
            c = CONT.match(flat, p)
            if not c or UNITTAIL.match(flat[c.end():]): break
            items.append([c.start(1), c.end(), 'bare-cont', None, c.group(1)]); p = c.end()
    items.sort(key=lambda x: x[0])
    # list heads: the nearest earlier reference in the same clause, not closed off by a parenthesis
    head = {}   # index in items -> ('vol', Vnn) | ('ext',) | ('base',)
    for k, it in enumerate(items):
        s = it[0]
        seg0 = max([mm.end() for mm in BREAK.finditer(flat, max(0, s - 400), s)] or [max(0, s - 400)])
        pre = flat[seg0:s]
        own = None
        if it[2] in ('vol', 'index'): own = ('vol', it[3]) if it[2] == 'vol' else ('index',)
        elif EXT.search(pre): own = ('ext',)
        elif BASEWORD.search(pre): own = ('base',)
        else:
            j = k - 1
            while j >= 0 and items[j][1] > seg0:
                if items[j][0] >= seg0:
                    between = flat[items[j][1]:s]; depth = 0; closed = False
                    for ch in between:
                        depth += (ch == '(') - (ch == ')')
                        if depth < 0: closed = True; break
                    if not closed: own = head.get(j)
                    break
                j -= 1
        if own is None:
            # a list opened by a parenthesis right after a volume's name: "reads from V11 (§3.18, …", "V11's cells … (§2.3, …"
            mv = re.search(r"(?<![A-Za-z0-9_\-])(?:V(\d{2})|[Vv]olume (\d{1,2}))(?:'s)?(?![ ]?§)[^§;|()]{0,40}\(\s*$", pre)
            if mv: own = ('vol', vol_unit(mv.group(1) or mv.group(2)))
        head[k] = own or ('base',)
        if it[2] in ('bare-cont', 'vol-cont'): head[k] = head.get(k - 1, head[k]) if it[2] == 'bare-cont' else ('vol', it[3])
    for k, it in enumerate(items):
        s, e, kind, tgt, num = it[:5]
        h = head[k]
        rec = dict(unit=u, line=lineof(s), kind=kind, ref=flat[s:e], num=num, head=h[0] + (':' + h[1] if len(h) > 1 else ''),
                   ctx=flat[max(0, s - 90):e + 40])
        if kind == 'index':
            rec['cls'] = 'resolved' if num in heads['INDEX'] else 'BROKEN'
        elif kind in ('vol', 'vol-cont'):
            if tgt not in heads: rec['cls'] = 'BROKEN'
            elif num in heads[tgt]: rec['cls'] = 'resolved' if (kind == 'vol-cont' or it[5] == 'canon') else 'resolved-form'
            elif kind == 'vol-cont' and num in heads['base'] and '§' in flat[s - 3:s]: rec['cls'] = 'resolved'
            else: rec['cls'] = 'BROKEN'
        else:
            if h[0] == 'ext': rec['cls'] = 'external'
            elif h[0] == 'index': rec['cls'] = 'resolved' if num in heads['INDEX'] else 'BROKEN'
            else:
                inB = num in heads['base']
                L = h[1] if h[0] == 'vol' else None
                inL = bool(L) and num in heads[L]
                if L and inL and not inB: rec['cls'] = 'FIX'; rec['fix_unit'] = L; rec['why'] = f'continues the {L} list'
                elif inB and not inL: rec['cls'] = 'resolved'
                elif inB and inL: rec['cls'] = 'ambiguous'; rec['alt'] = L
                elif GENERIC.search(flat[max(0, s - 20):s]) and all(num in heads[v] for v in heads if v.startswith('V')):
                    rec['cls'] = 'resolved-generic'
                else:
                    # candidates: the citing volume and every volume the clause names before the reference
                    seg0 = max([mm.end() for mm in BREAK.finditer(flat, max(0, s - 400), s)] or [max(0, s - 400)])
                    named = {vol_unit(a or b) for a, b in re.findall(r'(?<![A-Za-z0-9_\-])(?:V(\d{2})|[Vv]olume (\d{1,2}))\b', flat[seg0:s])}
                    cands = sorted(({u} if u.startswith('V') else set()) | named)
                    hit = [v for v in cands if v in heads and num in heads[v]]
                    rec['candidates'] = cands
                    if len(hit) == 1:
                        rec['cls'] = 'FIX'; rec['fix_unit'] = hit[0]
                        rec['why'] = 'self-reference' if hit[0] == u and not (named - {u}) else f'the one resolving volume among {cands}'
                    else: rec['cls'] = 'BROKEN'
        if rec['cls'] == 'FIX':
            # insert 'Vnn ' before the '§' (bare) or before the number (a continuation written without '§')
            at = s if flat[s] == '§' else s
            rec['fix'] = dict(orig_index=pos[at], insert=rec['fix_unit'] + ' ' + ('' if flat[s] == '§' else '§'))
        refs.append(rec)
    # ids
    for rx, kind in ((r'(?<![A-Za-z0-9_\-`.])(D-\d+)(?![\d])', 'D'),
                     (r'(?<![A-Za-z0-9_\-`.])(J-[A-Za-z]+-?\d+(?:\.\d+)?|J-T)(?![\w])(?!\.[a-z])', 'J'),
                     (r'(?<![A-Za-z0-9_\-`.])(T\d+-\d+|T-RIG-\d+|T-ER-\d+|T-V\d+-\d+)(?![\w.]*\d)(?!\.[a-z*])', 'T')):
        for m in re.finditer(rx, flat):
            i = m.group(1)
            if i in defs: cls = 'resolved'
            elif kind == 'J' and re.search(r'(?<![\w-])' + re.escape(i) + r'(?![\w])', extcorpus): cls = 'external'
            else: cls = 'BROKEN'
            refs.append(dict(unit=u, line=lineof(m.start()), kind=kind, ref=i, cls=cls, ctx=flat[max(0, m.start() - 90):m.end() + 40]))
    for m in re.finditer(r'(?<![A-Za-z0-9_§.\-`])((?:II|III)\.\d+(?:\.\d+)*)(?![\d])', flat):   # PART II / III without '§'
        n = m.group(1).rstrip('.')
        refs.append(dict(unit=u, line=lineof(m.start()), kind='II', ref=n, cls='resolved' if n in heads['base'] else 'BROKEN',
                         ctx=flat[max(0, m.start() - 90):m.end() + 40]))
    for m in re.finditer(r'(?<![A-Za-z0-9_\-`])V\d-\d+(?:\.\d+)+', flat):
        refs.append(dict(unit=u, line=lineof(m.start()), kind='vol-oldform', ref=m.group(0), cls='BROKEN', ctx=flat[max(0, m.start() - 90):m.end() + 40]))
res = dict(heads={u: len(h) for u, h in heads.items()}, defs=len(defs), counts={}, refs=refs)
c = Counter((r['unit'], r['cls']) for r in refs)
res['counts'] = {f'{a}/{b}': n for (a, b), n in sorted(c.items())}
json.dump(res, open(sys.argv[1], 'w'), ensure_ascii=False, indent=0)
print('headings', res['heads'], 'ids defined', len(defs))
tot = Counter(r['cls'] for r in refs); print('all references by class', dict(tot))
for u, _ in UNITS:
    print(f"{u:<6}", {k: n for (uu, k), n in sorted(c.items()) if uu == u})
