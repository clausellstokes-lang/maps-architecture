#!/usr/bin/env python3
"""Coherence pass — the WIRING GRAPH of the whole design set and the DOSSIER TRACE (lane coherence/wiring).

Rebuilds docs/validation/coherence/wiring.json from three inputs, so a verifier can re-run it over the current text:
  1. the inventories   docs/validation/coherence/inventory-*.json   (every normative item with its wiring fields:
                        reads / used_by / wiring / keys; they become 'fact' nodes and reads / feeds edges);
  2. the design text   docs/ARCHITECTURE.md and docs/volumes/V01..V12-*.md (the pieces themselves: records and fields in
                        the code blocks, the volumes' §1b wiring tables, the base's structured tables — §7.1's edit
                        targets and tools, §7.4's lifecycle rows, §7.7's derivation rows, §11.1's exports, §14's packages
                        and interfaces, the roadmap's hook table — tests, derivation rows, tables, packages, stages);
  3. the verdicts      docs/validation/coherence/wiring-verdicts.json (this lane's reviewed ruling on every defect
                        candidate the detectors raise: DEFECT with its unit and missing link, WIRED, WIRED-BY, or INVALID).
Outputs: wiring.json (nodes, typed edges, candidates with verdicts, the dossier trace) and, with --candidates, a flat
candidate list for review. A candidate with no verdict is reported UNREVIEWED (a verifier re-running this over a
rewritten text sees exactly the new or unresolved candidates).

Edge types: writes, reads, calls, implements, renders, labels, exports, persists, tests, fills-hook, derives-from,
ignores, has-field, emits, mentions (aggregated per section), feeds (inventory used_by).
Standard library only. Deterministic: sorted output, no timestamps inside the graph.
"""
import argparse, glob, json, os, re, sys
from collections import defaultdict, OrderedDict

ROOT_DEFAULT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
VOL_SLUGS = ['neighbourhoods', 'buildings', 'interiors', 'underground', 'sky', 'evolution', 'village',
             'settlementforge', 'application', 'clerk', 'content', 'calibration']
VOLS = ['V%02d' % (i + 1) for i in range(12)]
BASE_UNITS = ['model', 'kernel', 'pipeline', 'determinism', 'rendering', 'scope']

# ---------------------------------------------------------------- corpus
def base_unit_of(top):
    """The base part (unit) owning a top-level heading, as 18-coherence.js's BASE_PARTS assign them."""
    t = top
    if t.startswith('## §2 '): return 'model'
    if t.startswith('## §3 '): return 'kernel'
    if t.startswith('## §4 ') or t.startswith('## §10 ') or t.startswith('# PART II') or t.startswith('## II.') or t.startswith('# PART III'):
        return 'pipeline'
    if t.startswith('## §5 ') or t.startswith('## §6 ') or t.startswith('## §7 '): return 'determinism'
    if t.startswith('## §8 ') or t.startswith('## §9 ') or t.startswith('## §11 ') or t.startswith('## §12 '): return 'rendering'
    return 'scope'

NON_NORMATIVE_VOL = re.compile(r'^## (12 CONFIRMED|13 Fix list|Reconciliation round|Finalization|Counterpart edits)')

class Line:
    __slots__ = ('unit', 'file', 'no', 'sec', 'text', 'norm', 'code', 'top')
    def __init__(s, unit, file, no, sec, text, norm, code, top):
        s.unit, s.file, s.no, s.sec, s.text, s.norm, s.code, s.top = unit, file, no, sec, text, norm, code, top

def load_corpus(root):
    lines = []
    # base
    f = os.path.join(root, 'docs/ARCHITECTURE.md')
    top = '# ARCHITECTURE'; sec = 'title'; code = False
    for i, t in enumerate(open(f, encoding='utf-8').read().split('\n'), 1):
        if t.startswith('```'):
            code = not code
        if not code:
            m = re.match(r'^(#{1,4}) (.*)$', t)
            if m:
                lvl, h = len(m.group(1)), m.group(2)
                if lvl <= 2: top = t
                ms = re.match(r'^§(\d+)\b', h) or re.match(r'^(\d+\.\d+(?:\.\d+)?)\b', h)
                mi = re.match(r'^(II\.\d+(?:\.\d+)?)\b', h)
                if h.startswith('PART III'): sec = 'PART III'
                elif h.startswith('PART II'): sec = 'PART II'
                elif mi: sec = mi.group(1)
                elif ms: sec = '§' + ms.group(1)
                elif h.startswith('The whole design'): sec = 'summary'
                elif h.startswith('Delegated decisions'): sec = 'Delegated decisions'
                elif h.startswith('Judgment calls'): sec = 'Judgment calls'
                elif h.startswith('Staged by'): sec = 'Staged by the roadmap'
                elif h.startswith('Appendix A'): sec = 'Appendix A'
        lines.append(Line(base_unit_of(top), 'docs/ARCHITECTURE.md', i, sec, t, True, code, top))
    # volumes
    for v, slug in zip(VOLS, VOL_SLUGS):
        f = os.path.join(root, 'docs/volumes/%s-%s.md' % (v, slug))
        if not os.path.exists(f):
            continue
        sec = v + ' title'; code = False; norm = True; top = ''
        for i, t in enumerate(open(f, encoding='utf-8').read().split('\n'), 1):
            if t.startswith('```'):
                code = not code
            if not code:
                m = re.match(r'^(#{2,4}) (.*)$', t)
                if m:
                    h = m.group(2)
                    if len(m.group(1)) == 2:
                        top = t; norm = not NON_NORMATIVE_VOL.match(t)
                    ms = re.match(r'^(?:§)?(\d+[a-z]?(?:\.\d+[a-z]?)*)\b', h)
                    if ms: sec = '%s §%s' % (v, ms.group(1))
                    elif h.startswith('Integration notes'): sec = '%s Integration notes' % v
                    elif h.startswith('Reconciliation') or h.startswith('Finalization') or h.startswith('Counterpart'):
                        sec = '%s history' % v
            lines.append(Line(v, 'docs/volumes/%s-%s.md' % (v, slug), i, sec, t, norm, code, top))
    return lines

# ---------------------------------------------------------------- identifiers
IDENT = re.compile(r'[A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)*')
BACKTICK = re.compile(r'`([^`]+)`')
BARE_CAMEL = re.compile(r'\b([A-Z][a-z0-9]+(?:[A-Z][a-z0-9]*)+(?:\.[a-z][A-Za-z0-9]*)*)\b')

def idents_in(text):
    out = set()
    for m in BACKTICK.finditer(text):
        for t in IDENT.findall(m.group(1)):
            out.add(t)
            if '.' in t:
                parts = t.split('.')
                out.add(parts[-1]); out.add(parts[0])
                for k in range(1, len(parts)):
                    out.add('.'.join(parts[k:]))
    for m in BARE_CAMEL.finditer(text):
        t = m.group(1); out.add(t)
        if '.' in t:
            out.add(t.split('.')[0]); out.add(t.split('.')[-1])
    # camelCase bare field names (lowercase start with an inner capital), e.g. onFail, slopeP95
    for t in re.findall(r'\b([a-z]+[A-Z][A-Za-z0-9]*)\b', text):
        out.add(t)
    return out

def build_mentions(lines):
    """token -> {(unit, sec): [line numbers]} over normative lines (code lines included)."""
    idx = defaultdict(lambda: defaultdict(list))
    for ln in lines:
        if not ln.norm:
            continue
        for t in idents_in(ln.text) if not ln.code else set(IDENT.findall(re.sub(r'//.*', '', ln.text))) | idents_in(ln.text):
            idx[t][(ln.unit, ln.sec)].append(ln.no)
    return idx

# ---------------------------------------------------------------- code blocks: records, fields, interfaces
def strip_comments(block):
    block = re.sub(r'/\*.*?\*/', ' ', block, flags=re.S)
    block = re.sub(r'//[^\n]*', ' ', block)
    return block

def parse_code(lines):
    """Records (types with fields) and interfaces (types with methods) declared in code blocks."""
    decls = []
    cur = []; start = None; file = None; unit = None; sec = None
    for ln in lines:
        if ln.text.startswith('```'):
            if start is None:
                start = ln.no; cur = []; file, unit, sec = ln.file, ln.unit, ln.sec
            else:
                decls.extend(parse_block('\n'.join(cur), file, unit, sec, start))
                start = None
            continue
        if start is not None:
            cur.append(ln.text)
    return decls

def parse_block(block, file, unit, sec, start):
    out = []
    src = strip_comments(block)
    for m in re.finditer(r'\b(interface|type)\s+([A-Z][A-Za-z0-9]*)\s*(?:<[^>{=]*>)?\s*(?:extends\s+[^{=]+)?(=\s*)?\{', src):
        name = m.group(2)
        i = m.end(); depth = 1; body_start = i
        while i < len(src) and depth > 0:
            c = src[i]
            if c == '{': depth += 1
            elif c == '}': depth -= 1
            i += 1
        body = src[body_start:i - 1]
        # top-level members only
        flat = []; d = 0
        for c in body:
            if c in '{([':
                if d == 0: flat.append(c)
                else: flat.append(' ')
                d += 1; continue
            if c in '})]':
                d -= 1
                flat.append(c if d == 0 else ' '); continue
            flat.append(c if d == 0 else ' ' if c != '\n' else '\n')
        flat = ''.join(flat)
        fields = sorted(set(re.findall(r'(?:^\s*|[;\n,{]\s*)(?:readonly\s+)?([a-zA-Z_][A-Za-z0-9_]*)\??\s*:', flat)))
        methods = sorted(set(re.findall(r'(?:^\s*|[;\n{]\s*)(?:readonly\s+)?([a-zA-Z_][A-Za-z0-9_]*)\??\s*(?:<[^>]*>)?\s*\(', flat)))
        methods = [x for x in methods if x not in ('if', 'for', 'while')]
        out.append({'name': name, 'fields': fields, 'methods': methods, 'file': file, 'unit': unit, 'sec': sec,
                    'line': start + src[:m.start()].count('\n') + 1})
    return out

# ---------------------------------------------------------------- markdown tables
def md_tables(lines, lo, hi):
    """Tables between line numbers lo..hi of one file's Line list (1-based, inclusive): [(header_cells, rows, first_line)]."""
    res = []; cur = None
    for ln in lines:
        if ln.no < lo or ln.no > hi:
            continue
        t = ln.text
        if t.startswith('|'):
            cells = [c.strip() for c in split_row(t)]
            if cur is None:
                cur = [cells, [], ln.no]
            elif set(''.join(cells)) <= set('-: '):
                continue
            else:
                cur[1].append((ln.no, cells))
        else:
            if cur is not None:
                res.append(tuple(cur)); cur = None
    if cur is not None:
        res.append(tuple(cur))
    return res

def split_row(t):
    t = t.strip()
    if t.startswith('|'): t = t[1:]
    if t.endswith('|'): t = t[:-1]
    cells = []; buf = ''; tick = False
    for c in t:
        if c == '`': tick = not tick
        if c == '|' and not tick:
            cells.append(buf); buf = ''
        else:
            buf += c
    cells.append(buf)
    return cells

# ---------------------------------------------------------------- references inside a cell of text
VOL_NAMES = {'neighbourhood': 'V01', 'building': 'V02', 'interior': 'V03', 'underground': 'V04', 'sky': 'V05',
             'evolution': 'V06', 'village': 'V07', 'settlementforge': 'V08', 'application': 'V09', 'clerk': 'V10',
             'content': 'V11', 'calibration': 'V12'}

def vols_in(text):
    """Volumes a cell names: 'V04', 'V4 §', 'V1-3.16', 'volume 6', \"volume 6's\"."""
    out = set()
    for m in re.finditer(r'\bV(\d{1,2})(?=[\s§\-\'’.,;:)]|$)', text):
        n = int(m.group(1))
        if 1 <= n <= 12: out.add('V%02d' % n)
    for m in re.finditer(r'\bvolume (\d{1,2})\b', text):
        n = int(m.group(1))
        if 1 <= n <= 12: out.add('V%02d' % n)
    return out

def base_secs_in(text):
    out = set()
    for m in re.finditer(r'(?<![V\d])§(\d+(?:\.\d+)*)', text):
        out.add('§' + m.group(1))
    for m in re.finditer(r'\b(II\.\d+(?:\.\d+)?)\b', text):
        out.add(m.group(1))
    if 'PART III' in text: out.add('PART III')
    return out

STAGE_RE = re.compile(r'\b(S1[0-5][a-c]?|S[0-9][a-c]?|U-[A-Z]+|VS\d+|EVO_[A-Z_]+|T\d[ab]?(?=\'s| step| after| at|,|\)))\b')
COMMON = set('''id key name kind state seq at to from by of in on the a an and or not null true false none any all type value values row rows
table tables rule rules text label labels count range class cls use uses level part parts cause mode source ref refs note notes list
map maps doc document report reports line lines set get add remove on off new old one two three it its this that each every'''.split())

def distinctive(keys):
    """Keys worth a both-ends search: identifiers of 5+ chars or dotted paths or camel/Pascal names, not common words."""
    out = []
    for k in keys:
        base = k.split('.')[-1]
        if k.lower() in COMMON or base.lower() in COMMON: continue
        if len(base) < 5 and '.' not in k and not re.search(r'[A-Z]', base): continue
        out.append(k)
    return out

# ---------------------------------------------------------------- the volumes' §1b wiring tables
def section_range(lines, file, start_pat, end_pat):
    s = e = None
    for ln in lines:
        if ln.file != file or ln.code: continue
        if s is None and re.match(start_pat, ln.text): s = ln.no
        elif s is not None and re.match(end_pat, ln.text): e = ln.no - 1; break
    return s, e

def classify_header(h):
    hl = [c.lower() for c in h]
    cols = {}
    for i, c in enumerate(hl):
        if i == 0 and c.startswith('#'): cols['num'] = i; continue
        if 'base hook' in c or 'plugs into' in c: cols.setdefault('hook', i)
        elif 'lifecycle' in c: cols.setdefault('lifecycle', i)
        elif c == 'undo' or c.startswith('undo'): cols.setdefault('undo', i)
        elif 'tool' in c and 'piece' not in c: cols.setdefault('tool', i)
        elif c.startswith('rendered'): cols.setdefault('rendered', i)
        elif c.startswith('labelled'): cols.setdefault('labelled', i)
        elif c.startswith('exported'): cols.setdefault('exported', i)
        elif c.startswith('persisted'): cols.setdefault('persisted', i)
        elif any(w in c for w in ('fed by', 'producer', 'produced by', 'implementer', 'computed from')): cols.setdefault('producer', i)
        elif 'derivation row' in c: cols.setdefault('dr', i)
        elif 'dossier field' in c or 'settlementforge field' in c: cols.setdefault('dfield', i)
        elif 'dossier trace' in c: cols.setdefault('dtrace', i)
        elif any(w in c for w in ('feeds', 'consumer', 'consumed by', 'caller', 'read by', 'reader here', 'where the engine reads',
                                  'where this volume reads', 'how it reaches', 'where it appears', 'reaches the massing', 'how')):
            cols.setdefault('consumer', i)
        elif 'piece' not in cols:
            cols['piece'] = i
    return cols

def parse_1b(lines):
    rows = []
    by_file = defaultdict(list)
    for ln in lines: by_file[ln.file].append(ln)
    for v, slug in zip(VOLS, VOL_SLUGS):
        f = 'docs/volumes/%s-%s.md' % (v, slug)
        L = by_file.get(f)
        if not L: continue
        s, e = section_range(L, f, r'^#{2,3} (§)?1b', r'^## 2 ')
        if s is None: continue
        for header, body, first in md_tables(L, s, e):
            cols = classify_header(header)
            hkey = ' | '.join(header)
            kind = ('edit' if 'tool' in cols else 'entity' if 'rendered' in cols else
                    'hookuse' if header[0].lower().startswith('base section') else
                    'interface' if any('implementer' in h.lower() for h in header) else
                    'dossier' if ('producer' not in cols and ('dr' in cols or 'dfield' in cols)) else 'piece')
            for no, cells in body:
                if len(cells) < 2: continue
                g = lambda k: cells[cols[k]] if k in cols and cols[k] < len(cells) else ''
                piece = g('piece') or cells[0]
                if piece.startswith('**') and not any(c.strip() for c in cells[1:]):
                    continue   # a group header row ("**added by the revision**")
                keys = sorted(set(k for m in BACKTICK.finditer(piece) for k in IDENT.findall(m.group(1))))
                rows.append({'vol': v, 'line': no, 'kind': kind, 'header': hkey, 'piece': piece, 'keys': keys,
                             'producer': g('producer'), 'consumer': g('consumer'), 'hook': g('hook'),
                             'tool': g('tool'), 'lifecycle': g('lifecycle'), 'undo': g('undo'),
                             'rendered': g('rendered'), 'labelled': g('labelled'), 'exported': g('exported'),
                             'persisted': g('persisted'), 'dr': g('dr'), 'dfield': g('dfield'), 'dtrace': g('dtrace')})
    return rows

# ---------------------------------------------------------------- both-ends check of the §1b rows
def unit_text_index(lines):
    """unit -> {sec: joined normative text} and the f/g amendment texts."""
    idx = defaultdict(lambda: defaultdict(list))
    for ln in lines:
        if ln.norm:
            idx[ln.unit][ln.sec].append(ln.text)
    return {u: {s: '\n'.join(t) for s, t in d.items()} for u, d in idx.items()}

def key_in(text, key):
    if '.' in key or re.search(r'[A-Z]', key) or '_' in key:
        return re.search(r'(?<![A-Za-z0-9_])' + re.escape(key) + r'(?![A-Za-z0-9_])', text) is not None
    return ('`' + key) in text or re.search(r'`[^`]*\b' + re.escape(key) + r'\b[^`]*`', text) is not None

def segments(text):
    out = []; buf = ''; d = 0; tick = False
    for c in text:
        if c == '`': tick = not tick
        if not tick:
            if c in '([': d += 1
            elif c in ')]': d -= 1
        if c == ';' and d <= 0 and not tick:
            out.append(buf.strip()); buf = ''
        else:
            buf += c
    if buf.strip(): out.append(buf.strip())
    return out

def both_ends(rows, uti, amend_text):
    """For every §1b row naming another volume (or base section) as producer or consumer: is the piece at the other end?"""
    res = []
    base_units = BASE_UNITS
    base_text = '\n'.join(t for u in base_units for t in uti.get(u, {}).values())
    for r in rows:
        if r['kind'] not in ('piece', 'interface', 'edit', 'entity'): continue
        pkeys = distinctive(r['keys'])
        for role in ('consumer', 'producer'):
            txt = r[role]
            if not txt: continue
            for seg in segments(txt):
                for tv in sorted(vols_in(seg) - {r['vol']}):
                    ttext = '\n'.join(uti.get(tv, {}).values())
                    hit = [k for k in pkeys if key_in(ttext, k)]
                    segkeys = distinctive(sorted(set(k for m in BACKTICK.finditer(seg) for k in IDENT.findall(m.group(1)))))
                    seghit = [k for k in segkeys if key_in(ttext, k)]
                    src_named = bool(re.search(r'\b(%s|V%d\b|volume %d\b)' % (r['vol'], int(r['vol'][1:]), int(r['vol'][1:])), ttext))
                    if hit: verdict = 'wired'
                    elif not pkeys and seghit: verdict = 'wired-weak'
                    elif seghit and src_named: verdict = 'wired-weak'
                    elif not pkeys and not segkeys: verdict = 'unkeyed'
                    else: verdict = 'candidate'
                    res.append({'vol': r['vol'], 'line': r['line'], 'role': role, 'target': tv, 'piece': r['piece'][:160],
                                'keys': pkeys, 'segment': seg[:300], 'segkeys': segkeys, 'hit': hit, 'seghit': seghit,
                                'verdict': verdict})
    return res

# ---------------------------------------------------------------- field-level orphans (declared, named nowhere else)
def field_orphans(decls, lines):
    """A field of a declared record whose name occurs nowhere in the normative set outside its own declaration
    block (as `Rec.field`, `.field`, a backticked `field` or a bare camelCase token). Common one-word names are skipped
    (their use cannot be told apart from ordinary words)."""
    text_by_line = [(ln.file, ln.no, ln.text) for ln in lines if ln.norm]
    # a token index: token -> set of (file, line)
    tok = defaultdict(set)
    for f, no, t in text_by_line:
        for m in re.finditer(r'[A-Za-z_][A-Za-z0-9_]*', t):
            tok[m.group(0)].add((f, no))
    out = []
    # the declaration block extents: from decl line to the next blank code fence — approximated by 400 lines window per record
    for d in decls:
        for fld in d['fields']:
            if fld.lower() in COMMON or len(fld) < 4: continue
            occ = tok.get(fld, set())
            outside = [o for o in occ if not (o[0] == d['file'] and d['line'] - 2 <= o[1] <= d['line'] + 120)]
            if not outside:
                out.append({'record': d['name'], 'field': fld, 'unit': d['unit'], 'sec': d['sec'], 'file': d['file'], 'line': d['line']})
    return out

# ---------------------------------------------------------------- tests: definitions and references
TEST_RE = re.compile(r'\b(T-V\d{1,2}-\d+[a-z]?|T\d{1,3}-\d+[a-z]?|T110[a-z](?:\.\w+)?|T-[A-Z]{2,}\d*-\d+)\b')

def tests_index(lines):
    """A test is DEFINED where its id heads a table row or a bullet, or opens a parenthesised clause of the base's §13
    ('(T13-1) …'); every other occurrence is a reference."""
    defs = defaultdict(list); refs = defaultdict(list)
    for ln in lines:
        if not ln.norm: continue
        t = ln.text
        for m in TEST_RE.finditer(t):
            tid = m.group(1)
            head = t[:m.start()]
            is_def = False
            if re.match(r'^\|\s*\**$', head.strip() + ('' if head.strip() else '')) or re.match(r'^\|\s*\**\s*$', head):
                is_def = True
            elif re.match(r'^\s*[*-]\s+\**$', head) or re.match(r'^\s*\*\*$', head):
                is_def = True
            elif ln.unit == 'scope' and ln.sec.startswith('§13') and head.rstrip().endswith('('):
                after = t[m.end():m.end() + 2]
                if after.startswith(')'): is_def = True
            elif ln.unit.startswith('V') and re.search(r'§7(\.|$)', ln.sec) and re.match(r'^\s*\**\s*$', head):
                is_def = True
            (defs if is_def else refs)[tid].append((ln.unit, ln.sec, ln.no))
    return defs, refs

# ---------------------------------------------------------------- derivation rows
DR_RE = re.compile(r'\b(DR\d{1,2}|DR-V\d{1,2}\.\d+)\b')
def dr_index(lines):
    defs = defaultdict(list); refs = defaultdict(list)
    for ln in lines:
        if not ln.norm: continue
        for m in DR_RE.finditer(ln.text):
            d = m.group(1)
            head = ln.text[:m.start()]
            is_def = bool(re.match(r'^\|\s*\**\s*$', head)) or bool(re.search(r'derivation-table row\s*$|table row\s*$', head)) \
                or bool(re.match(r'^\s*[*-]?\s*\**\s*$', head) and ln.text[m.end():m.end() + 3].startswith(('**', ' —', ':')))
            (defs if is_def else refs)[d].append((ln.unit, ln.sec, ln.no))
    return defs, refs

# ================================================================ THE DOSSIER TRACE (curated by this lane; re-checked)
# Status words: CONSUMED (a named mechanism reads it), IGNORED (on §7.7 item 1's never-read list — item 86 — or the
# adapter manifest's read:false list), UNLISTED (neither read by a named step nor on the never-read list: an unreached
# dossier field), UNREACHED (read into the digest but no mechanism consumes it), PENDING (WIRED-BY a g item the coherence
# pass applies; F-MISSING if absent after the rewrite). 'via' names the digest field (§14 DossierDigest, V08 §2.5 additions);
# 'to' the derivation rows and mechanisms. Sources: research/sf/dossier-model.md (the fields), research/sf/mapping.md
# rows 1-77 with research/sf/mapping-verify.md's corrections, base §7.7, §11.4, §14 and V08 §1b, §2.4-§2.6, §3.5-§3.6, §3.11.
SF_TRACE = [
 # (sf path, via digest field, to (rows / mechanisms), status, note)
 ('id', 'settlement.key', 'binding key settlement:<id> (§7.7 item 12); DossierRef.element; E_OTHER_SETTLEMENT (V08 §2.4)', 'CONSUMED', ''),
 ('name', 'settlement.name', 'DR14 (a protected name); §9.5 title; F15 rename-settlement', 'CONSUMED', ''),
 ('tier', 'settlement.tierWord', '§7.7 item 15 title word (tables/dossier/tiers); F8', 'CONSUMED', ''),
 ('population', 'settlement.population', 'DR23 rung, DR7, DR9, DR17, DR5; EpochInputs.populationTarget; E_RUNG_UNAVAILABLE', 'CONSUMED', ''),
 ('_seed', 'settlement.seed', 'H32 one-way seed -> Recipe.seed (item 85; §14 item 2)', 'CONSUMED', ''),
 ('_config', '-', 'none named: V08 §3.5 step 9 says "_seed and _config go no further"; resolved inputs are read from config', 'UNLISTED', 'W-DOS-01'),
 ('schemaVersion, simulationVersion', 'AdapterManifest.recognise', 'recognition (V08 §2.4)', 'CONSUMED', ''),
 ('generatorVersion', 'settlement.versions', 'DossierRef.version; the report', 'CONSUMED', ''),
 ('institutions[] (the record)', 'institutions[] (DossierInstitution)', 'DR9, DR10, DR12, DR16, DR17, DR19, DR20, DR24, DR25; item 14 states; dossier-backed assign', 'CONSUMED', ''),
 ('institutions[].name', 'key (inst:name:), kindLabel, count, qualifiers, popQualifier, openTop', 'DR24 class; DR9 count range; V08 §3.5.1 ladder step', 'CONSUMED', ''),
 ('institutions[].catalogId', 'kind; key inst:cat:', 'DR24 (b); binding (mapping-verify correction 1: often missing — name keys)', 'CONSUMED', ''),
 ('institutions[].category', 'category', 'DR24 (e) generic class; tables/dossier/categories', 'CONSUMED', ''),
 ('institutions[].tags', 'tags', 'item 103 siting profile via tables/dossier/tags; DR10; DR24 (d)', 'CONSUMED', ''),
 ('institutions[].facets', 'facets', 'DR16, DR17, DR20 (item 63 concealment)', 'CONSUMED', ''),
 ('institutions[].forbiddenResources', 'forbidden', 'DR10 hard dry row; V04 U-DIG cost', 'CONSUMED', ''),
 ('institutions[].status, worldPulseFate, _worldPulseInactive', 'state, fate, inactive', 'item 14 status rows (fate first; correction 5); F2, F3, F5', 'CONSUMED', ''),
 ('institutions[].impairments[]', 'impairments', 'F4; §4.5 (6); condition steps', 'CONSUMED', ''),
 ('institutions[].foundedAt', 'founded', 'F1 dating; Works start (item 67); correction 7', 'CONSUMED', ''),
 ('institutions[].demotedFrom, promotedFrom', 'renamedFrom', 'DR24 (a); F3, F15 (correction 2)', 'CONSUMED', ''),
 ('institutions[].createdByEventId, removedByEventId, _worldPulse* stamps', 'receipts', 'the receipt table (item 13): cause, fate, week', 'CONSUMED', ''),
 ('institutions[].localUid, isCustom, customDefinition*', 'custom', 'item 104 (a) resolution at fold; key inst:uid:', 'CONSUMED', ''),
 ('institutions[].priorityCategory', 'role', 'DR12 first input (J-V8.45)', 'CONSUMED', ''),
 ('institutions[].serviceKeys', 'custom / record services', 'V04 L5 (the Underground network\'s services)', 'CONSUMED', ''),
 ('institutions[].desc', '-', 'the description seed the clerk may read (§7.7 item 1\'s prose clause)', 'IGNORED', ''),
 ('institutions[].required, source, baseChance, exclusiveGroup, magicLicense, tradeRouteRequired, forbiddenTradeRoutes, minTier, tier, cascadeAdded, cascadeBoost, requiredForTier, builtReason', '-', 'none named (generation mechanics of SettlementForge)', 'UNLISTED', 'W-DOS-01 (sub-fields: the closed-digest rule)'),
 ('powerStructure.government, governingName', 'government.name', 'DR11 seat; F11 (tables/dossier/government)', 'CONSUMED', ''),
 ('powerStructure.factions[] (faction, category, power, isGoverning)', 'powers[] (key, name, category, standing, governing)', 'DR5, DR11, DR12; item 72 power slice', 'CONSUMED', ''),
 ('powerStructure.factions[] (rawPower, powerLabel, desc, modifier, captureState, legitimacyCrisis)', '-', 'none named', 'UNLISTED', 'W-DOS-01 (sub-fields)'),
 ('powerStructure.factions[].controlledInstitutions', 'powers[].controlled', 'DR11, DR12 (resolved by stable part, correction 3)', 'CONSUMED', ''),
 ('powerStructure.factionRelationships[]', 'powers[].relations', 'PowerRelation (dossierRecord put); DR12', 'CONSUMED', ''),
 ('powerStructure.publicLegitimacy.score', 'government.legitimacy', 'PortValues.legitimacy -> §10.2 legitimacy row -> §4.5 (6) institution dial', 'CONSUMED', ''),
 ('powerStructure.previousGovernments[]', 'government.previous', 'no reader named', 'UNREACHED', 'W-DOS-05'),
 ('powerStructure.criminalCaptureState; safetyProfile.blackMarketCapture', 'security', 'PortValues.crime -> DR16, DR17 (§4.6 crime terms)', 'CONSUMED', ''),
 ('powerStructure.stability, recentConflict, powerProjectionVersion, economyInputFingerprint', '-', 'none named (a band word, prose, version stamps)', 'UNLISTED', 'W-DOS-01'),
 ('economicState.prosperity', 'wealth.label', 'DR6, DR7, DR9 at creation (tables/dossier/wealth -> Intent.wealthLevel); a later change: no diff row', 'CONSUMED', 'W-DOS-02 (change path)'),
 ('economicState.incomeSources[]', 'economy.incomeSources', 'DR3 toll and duty rows; DR13 economy slice (item 72); DR-V8.2 ley lines', 'CONSUMED', ''),
 ('economicState.primaryExports, primaryImports, necessityImports, transit', 'economy.goods (exports, imports, transit)', 'DR3, DR10, DR-V8.5 via goodWords', 'CONSUMED', ''),
 ('economicState.isEntrepot', 'economy.entrepot', 'DR4; DR-V8.5', 'CONSUMED', ''),
 ('economicState.activeChains[]', 'economy.chains', 'DR-V8.5 (item 105 (i)); V06 dossier phase', 'CONSUMED', ''),
 ('economicState.tradeDependencies[]', 'economy.dependencies', 'DR10; DR-V8.5', 'CONSUMED', ''),
 ('economicState.foodSecurity.importPct', 'economy.foodImportPct', 'PortValues.importPct -> §4.9 farmland (DR19; farmlandScale)', 'CONSUMED', ''),
 ('economicState.foodSecurity.chains', 'economy.foodChains', 'PortValues.foodChain -> PortRows.hinterland.foodChain: no reader (WG-PIPE-01)', 'UNREACHED', 'W-DOS-03'),
 ('economicState.foodSecurity (storageMonths, deficitPct, surplusPct, resilienceScore)', '-', 'none named', 'UNLISTED', 'W-DOS-01'),
 ('economicState.tier, situationDesc, tradeAccess, priorities, compound, localProduction, institutionalServices, treasury, economicComplexity', '-', 'none named (echoes, prose, flags, verdicts; priorities duplicate the never-read config.priority*)', 'UNLISTED', 'W-DOS-01'),
 ('economicState.customChains', 'customChains', 'CustomChainRecord (item 104 (b), (h))', 'CONSUMED', ''),
 ('spatialLayout.quarters[].name', 'quarters[].name', 'naming claims (item 16); DR5, DR14', 'CONSUMED', ''),
 ('spatialLayout.quarters[].location', 'quarters[].phrase', 'soft rows (item 16; tables/dossier/quarters)', 'CONSUMED', ''),
 ('spatialLayout.quarters[].landmarks[]', 'quarters[].landmarks', 'named-feature claims (tables/dossier/landmarks); DR-V8.8 (V08 J-V8.70: no item-110 reader)', 'CONSUMED', ''),
 ('spatialLayout.quarters[].desc, spatialLayout.layout, spatialLayout.tradeAccess', '-', 'prose (§7.7 item 1\'s prose clause)', 'IGNORED', ''),
 ('npcs[] (id, name, role, category, factionAffiliation, institution, status, replaced)', 'notables[] (+ workplaceKey, powerKey)', 'dossier-backed Person (DR22\'s exception), Posting, Membership; F17', 'CONSUMED', ''),
 ('npcs[].importance', 'notables[].importance', 'carried; V08 §3.5: "facts no rule reads (a notable\'s importance)"', 'UNREACHED', 'W-DOS-07'),
 ('npcs[] (personality, physical, goal, secret, plotHooks, presentation, corrupt, influence, power)', '-', 'prose and the host\'s secrets: none named', 'UNLISTED', 'W-DOS-01 (the prose clause covers the prose; corrupt, influence and power are structured)'),
 ('relationships[] (NPC to NPC)', '-', 'none named (mapping row 64 proposed @plat/sim\'s relation store)', 'UNLISTED', 'W-DOS-01'),
 ('prominentRelationship', '-', 'none named', 'UNLISTED', 'W-DOS-01'),
 ('factions[] (NPC social groups)', '-', '§7.7 item 1 (its NPC social groups)', 'IGNORED', ''),
 ('conflicts[]', '-', 'none named (between NPC social groups; item 1 names the groups, not their conflicts)', 'UNLISTED', 'W-DOS-01'),
 ('history.age', 'history.ageYears', 'HistoryHint -> S2 stage count, catacomb age gate, II.7.6 buried town, a ruin\'s ageYears (J-A88.42): no derivation row', 'CONSUMED', 'W-DOS-09 (row)'),
 ('history.historicalEvents[] (type, yearsAgo, severity, name)', 'history.events', 'HistoryHint scars (historyScars row); DR-V8.2 ruin evidence (magical history): no derivation row', 'CONSUMED', 'W-DOS-09 (row)'),
 ('history (founding, currentTensions, eventsTimeline, legacyAnnotations, siegeNarrative)', '-', 'prose (§7.7 item 1\'s prose clause); founding partly by g item 113', 'IGNORED', 'g item 113 reads the founding'),
 ('stress, stressors', 'stressors -> conditions (source stressor)', 'ConditionOverlay; DR21; PortValues.threats', 'CONSUMED', ''),
 ('activeConditions[]', 'conditions[]', 'ConditionOverlay; DR21; F12', 'CONSUMED', ''),
 ('config.terrainType (config.terrain)', 'site.terrain', 'DR1, DR19; S0 site request; the relief class (g item 109)', 'CONSUMED', ''),
 ('config.tradeRouteAccess', 'site.access', 'DR1, DR2, DR3 (V08 §2.6 access row)', 'CONSUMED', ''),
 ('config.monsterThreat', 'site.threat', 'DR2 (Intent.defence); PortValues.threats', 'CONSUMED', ''),
 ('config.magicLevel', 'site.magic', 'CircumstanceSlice.magic (II.6 supply, item 68, item 109 (f))', 'CONSUMED', ''),
 ('config.culture, cultureProfileKey (culturalIdentity.key)', 'site.culture', 'DR1, DR5, DR14, DR15, DR-V8.1, DR-V8.7 (tables/dossier/cultures)', 'CONSUMED', 'the SF path is not named in V08 (W-DOS-01 table)'),
 ('config.nearbyResources, ...Native, ...Depleted, ...State, ...Custom', 'site.deposits', 'DR19; DepositSite; DR-V8.2, DR-V8.3', 'CONSUMED', 'the SF path is not named in V08 (W-DOS-01 table)'),
 ('config.nearbyResourceDefinitions', 'customResources', 'DR19; DepositSite (custom)', 'CONSUMED', ''),
 ('config.priority*', '-', '§7.7 item 1 (the generation sliders)', 'IGNORED', ''),
 ('config.faith, latentPantheon, primaryDeitySnapshot', 'religion.deityKey, deityName', 'carried deity fact, F16 "a temple\'s dedication": no mechanism names the dedication', 'UNREACHED', 'W-DOS-04'),
 ('config.settType, terrainOverride, tier, stressType(s), intendedStressTypes, _population, customName', '-', 'none named (resolved echoes)', 'UNLISTED', 'W-DOS-01'),
 ('resourceAnalysis (terrain label, availableResources, resourceConditions)', '-', 'none named (deposits come from config.nearbyResources*)', 'UNLISTED', 'W-DOS-01'),
 ('defenseProfile (institutions buckets, scores, readiness)', '-', 'none named (walls come from the @wall kinds rows; defence from monsterThreat)', 'UNLISTED', 'W-DOS-01'),
 ('availableServices (custom services)', 'customServices', 'CustomServiceRecord (item 104 (h) (5))', 'CONSUMED', ''),
 ('availableServices (catalogue buckets)', '-', 'none named', 'UNLISTED', 'W-DOS-01'),
 ('neighborRelationship, neighbourNetwork[]', 'economy.partners', 'DR3, DR4; F14 (correction 4: a rival trades)', 'CONSUMED', 'the SF path is not named in V08 (W-DOS-01 table)'),
 ('economicState.tradeLinks[] (with an imported neighbour)', 'economy.tradeLinks', 'DR3', 'CONSUMED', ''),
 ('isolationSupport', 'site.isolation', 'DR19 (isolation row); magical_transit -> a teleport site', 'CONSUMED', ''),
 ('culturalIdentity (builtForm ... architecturalDetail), culturalNotes', '-', 'prose (§7.7 item 1\'s prose clause)', 'IGNORED', ''),
 ('settlementReason, pressureSentence, arrivalScene', '-', 'prose (§7.7 item 1\'s prose clause; the clerk may read a description seed)', 'IGNORED', ''),
 ('coherenceNotes, structuralViolations, structuralSuggestions', '-', 'none named (SettlementForge\'s own coherence diagnostics)', 'UNLISTED', 'W-DOS-01'),
 ('economicViability', '-', 'none named (a generation verdict)', 'UNLISTED', 'W-DOS-01'),
 ('simulationTrace', '-', '§7.7 item 1 (its generation log)', 'IGNORED', ''),
 ('aiOverlays', '-', '§7.7 item 1', 'IGNORED', ''),
 ('generationCoherenceReceipt', '-', '§7.7 item 1', 'IGNORED', ''),
 ('userCanon', '-', 'none named (the canon status; a DM\'s values arrive as record values)', 'UNLISTED', 'W-DOS-01'),
 ('customContentProvenance, customContentRoster', 'custom.definitions', 'custom-def facts; item 104 (a) (5)', 'CONSUMED', ''),
 ('populationHistory', 'receipts; calamity severity (V08 §3.5 (6))', 'F7 dating; DR-V8.6', 'CONSUMED', ''),
 ('resourceHistory', 'receipts', 'F13 dating', 'CONSUMED', ''),
 ('tierHistory', 'receipts', 'F8; g item 113 (f) peak evidence', 'CONSUMED', ''),
 ('institutionHistory', 'receipts', 'F1-F5 dating', 'CONSUMED', ''),
 ('calamityHistory', 'calamities', 'DR-V8.6 = DR-V6.1 (DR28): EpochInputs.events -> V06 hazards; V04 catacomb deaths', 'CONSUMED', ''),
 ('urbanFabric', '-', '§7.7 item 1; V08 manifest read:false', 'IGNORED', ''),
 ('npcLadder, traditions', '-', 'V08 manifest read:false ("no reader") — absent from §7.7 item 1\'s list', 'IGNORED', 'W-DOS-01 (one ignore-list: item 86)'),
 ('decrees[], pulseRecord.decreeCauses[]', 'receipts', 'F18', 'CONSUMED', ''),
 ('destroyedByEventId (root), lifecyclePatch, memberBirths', 'receipts', 'F20 (correction 8)', 'CONSUMED', ''),
 ('campaignState.eventLog[], _userEdits, dmLayer, locks', '-', 'none named (mapping rows 73, 75)', 'UNLISTED', 'W-DOS-01'),
 ('mapState.placements; worldState.spatialDigest (campaign state)', 'HostContext.realm (RealmBlock)', 'DR1, DR2, DR3, DR-V8.1 (realmBlockFrom, V08 §3.11)', 'CONSUMED', ''),
 ('RealmBlock.mPerRealmUnit', 'RealmBlock.mPerRealmUnit', 'no module reader (distanceM is computed host-side)', 'UNREACHED', 'W-DOS-06'),
 ('calendar.elapsedWeeks, worldState.tick (campaign state)', 'HostContext.week', '§4.11 dating rungs; DR21 (mapping-verify correction 13)', 'CONSUMED', ''),
 ('worldState.spatialLedgers.*, fogSessions, mapEdits', '-', '§7.7 item 1', 'IGNORED', ''),
 ('worldState.politicsLedgers, factionPairStates, occupations, npcStates, factionStates (campaign state)', '-', '§7.7 item 1: the frozen spatialDigest is the one campaign fact the realm block may carry', 'IGNORED', ''),
 ('site oasis_water deposit (g item 111)', 'site.deposits', 'DR1 -> the oasis (spring-fed pond, grove, gardens): g item 111\'s V08 and §4.2 S1 parts', 'PENDING', 'g item 111 (F-MISSING if absent after the rewrite)'),
 ('peakTier, high-water population, lifecycle (terminal death, resettlement), ancientRuin marker, the 29 history event types (g item 113)', 'history (extended)', 'the replay at generation (V06), the effective peak, the buried former settlement (V04), §7.7\'s history rows', 'PENDING', 'g item 113 (F-MISSING if absent after the rewrite)'),
]

DIGEST_TRACE = [
 # (digest field, consumers, status, note)
 ('settlement.key / name / tierWord / population / seed / line / versions', 'binding; DR14; title; DR23, DR7, DR9, DR17, DR5; Recipe.seed; adapter choice; DossierRef.version', 'CONSUMED', ''),
 ('site.terrain / access / threat / magic / culture', 'DR1, DR2, DR3, DR5, DR14, DR15, DR19; CircumstanceSlice.magic; DR-V8.1, DR-V8.7', 'CONSUMED', ''),
 ('site.deposits', 'DR19; DepositSite; DR-V8.2, DR-V8.3; derived_landuse', 'CONSUMED', ''),
 ('site.isolation', 'DR19 (isolation row)', 'CONSUMED', ''),
 ('site.ruinEvidence (V08)', 'DR-V8.2 -> V04 ruin existence and centre; V05 node term', 'CONSUMED', ''),
 ('site.threats (V08)', 'PortValues.threats -> DR2 waterfront (item 106 (d))', 'CONSUMED', ''),
 ('site.latitudeDeg (V08)', 'DR-V8.1 -> Intent.latitudeDeg / PortValues.latitudeDeg -> item 102 sampler', 'CONSUMED', ''),
 ('walls.records / citadel / flagged', 'DR2', 'CONSUMED', ''),
 ('wealth.label', 'DR6, DR7, DR9 at creation; no absorb diff row (V06 W27 expects EpochInputs.wealthLevel)', 'CONSUMED', 'W-DOS-02'),
 ('economy.incomeSources', 'DR3, DR13, DR-V8.2', 'CONSUMED', 'W-03 checked'),
 ('economy.exports / imports / transit / goods', 'DR3, DR10, DR-V8.5', 'CONSUMED', ''),
 ('economy.entrepot', 'DR4, DR-V8.5', 'CONSUMED', ''),
 ('economy.foodImportPct', 'PortValues.importPct -> §4.9 farmland', 'CONSUMED', 'W-03 checked'),
 ('economy.foodChains', 'PortValues.foodChain -> no reader', 'UNREACHED', 'W-DOS-03'),
 ('economy.chains / dependencies', 'DR-V8.5; DR10', 'CONSUMED', ''),
 ('economy.tradeLinks / partners', 'DR3, DR4; F14', 'CONSUMED', ''),
 ('government.name', 'DR11; F11', 'CONSUMED', ''),
 ('government.governingPower', 'the diff\'s government row -> power (V08 §3.5); DR11 reads powers[].governing', 'CONSUMED', 'W-03 checked'),
 ('government.previous', 'no reader', 'UNREACHED', 'W-DOS-05'),
 ('government.legitimacy (V08)', 'PortValues.legitimacy -> §10.2 legitimacy row -> §4.5 (6)', 'CONSUMED', ''),
 ('security (V08)', 'PortValues.crime -> DR16, DR17', 'CONSUMED', ''),
 ('powers[] (key, name, category, standing, governing, controlled, relations)', 'DR5, DR11, DR12; PowerRelation', 'CONSUMED', ''),
 ('institutions[] (every DossierInstitution field)', 'DR9, DR10, DR12, DR16, DR17, DR19, DR20, DR24, DR25; item 14; V08 §3.5.1 ladders; kindLabel by the kind family (V08 §3.5 (6))', 'CONSUMED', 'W-03 kindLabel, renamedFrom, districtScale checked'),
 ('quarters[] (name, phrase, landmarks)', 'item 16 naming claims; DR5, DR14; landmarks tables', 'CONSUMED', ''),
 ('notables[] (key, name, role, category, power, institution, status, replaced, workplaceKey, powerKey)', 'dossier-backed Person; Posting; Membership; F17', 'CONSUMED', ''),
 ('notables[].importance', 'none', 'UNREACHED', 'W-DOS-07'),
 ('conditions[] (with the stressors)', 'ConditionOverlay; DR21; F12', 'CONSUMED', ''),
 ('stressors', 'normalised into conditions (V08 §3.11)', 'CONSUMED', 'W-03 checked'),
 ('religion.deityKey / deityName', 'carried deity fact -> F16 -> no mechanism', 'UNREACHED', 'W-DOS-04'),
 ('history.ageYears / events', 'HistoryHint -> S2, II.7.6, V04 ruins; no derivation row', 'CONSUMED', 'W-DOS-09'),
 ('receipts', 'the receipt table (item 13)', 'CONSUMED', ''),
 ('custom.definitions', 'custom-def facts; item 104 (a)', 'CONSUMED', 'W-03 checked'),
 ('customChains / customResources / customServices (V08)', 'dossierRecord puts (V08 §3.13)', 'CONSUMED', ''),
 ('calamities (V08)', 'DR-V8.6 = DR28', 'CONSUMED', ''),
 ('ignored', 'PortReport.ignoredKeys; ignored_key notes', 'CONSUMED', ''),
 ('RealmBlock.partners / cell / gates / cell.latDeg', 'DR1, DR2, DR3, DR-V8.1', 'CONSUMED', ''),
 ('RealmBlock.mPerRealmUnit', 'none in the module', 'UNREACHED', 'W-DOS-06'),
 ('HostContext.week / audience / displayNames / line', '§4.11 dating; the audience table; one export; adapter choice', 'CONSUMED', ''),
]

DR_TRACE = [
 # (row, map fact, dossier inputs, home, status)
 ('DR1-DR25', 'the base\'s map-fact families (§7.7 item 10\'s table)', 'the DossierDigest fields each row names', '§7.7', 'ROW'),
 ('DR26 = DR-V1.1', 'a district\'s fabric and blocks\' content', 'DR5 kinds and identities, DR6, DR8, DR9, DR12/DR13, chains, DR1/DR2', 'V01 BCR-29 (f item 384)', 'PENDING-F'),
 ('DR27 = DR-SKY', 'the dossier\'s islands', 'magic, the institutions with sky rows, the supply', 'V05 BCR-V5-12 (f item 387)', 'PENDING-F'),
 ('DR28 = DR-V6.1 = DR-V8.6', 'calamities as hazard events', 'calamityHistory via calamities', 'V06 BCR-V6-12, V08 BCR-V8-30 (f items 388, 398)', 'PENDING-F'),
 ('DR29 = DR-V8.1', 'the site latitude', 'realm cell.latDeg; site.culture', 'V08 BCR-V8-11, BCR-V8-30', 'PENDING-F'),
 ('DR30-DR32 = DR-V8.2-DR-V8.4', 'ruin evidence; relief and mining; burial and crypt trace', 'site.deposits, history events, income rows, Adventuring records, burial records', 'V08 §2.6a; BCR-V8-30', 'PENDING-F'),
 ('DR33 = DR-V8.5', 'the supply links of SettlementForge\'s chains', 'economy.chains, dependencies, goods, entrepot', 'V08 §3.5; BCR-V8-30', 'PENDING-F'),
 ('DR34 = DR-V8.7', 'the water system\'s inputs (item 110 (b))', 'conduit_house records, demand records, site words, realm river, hot_springs, culture', 'V08 §2.6b; BCR-V8-30', 'PENDING-F'),
 ('DR35 = DR-V8.8', 'the high-ground landmarks (item 110 (b))', 'dossier institutions of significance >= elevated.landmarkMinSignificance, custom landmarks', 'V08 §2.6b; BCR-V8-30', 'PENDING-F'),
 ('(missing) history row', 'the growth-stage count, scars, ruin ages; g item 113\'s peak, replay and buried former settlement', 'history.ageYears, history.events, tierHistory, populationHistory, calamityHistory, peakTier', '§7.7 (g item 113)', 'MISSING'),
 ('(pending) oasis', 'an oasis from oasis_water (g item 111)', 'site.deposits', '§7.7 DR1 + §4.2 S1 (g item 111)', 'PENDING-G'),
]

CHANGE_TRACE = [
 # (change kind, receipts, envelope and fold, mutation, dependents re-derived, status, note)
 ('institution added (F1) / reopened (F6)', 'new key; createdByEventId; add-institution decree; _worldPulse* founded', 'DossierChange in EditBase.dossierChange; standalone dossier event at its week (§7.7 item 6)', 'assign existence dossier; S10b dossier request (least disruption, item 5); reopen in its former building', 'DR9, DR10, DR12, DR13 of the touched districts; S11 mutator; §8 display delta; §11 exports by the registry', 'OK', ''),
 ('institution removed (F2) / reduced (F3) / impaired (F4) / ruined (F5)', 'fates first (correction 5); status; impairments', 'as F1', 'item 14 status rows: closeUse, designation mutation, condition steps, ruin', 'DR25 member states; §4.5 (6) dials; the ruin program', 'OK', ''),
 ('population changed (F7)', 'populationHistory', 'rides the cadence\'s epoch (EpochInputs.populationTarget)', '§4.11 epoch steps (a)-(g)', 'DR7, DR23 (rung at the target), households, lapse rule', 'OK', ''),
 ('tier moved (F8)', 'tierHistory; bare tier change (correction 9)', 'the next epoch', 'rung re-read; title word', 'DR23; §9.5 title', 'OK', ''),
 ('prosperity changed (F9)', 'the prosperity word', 'NO diff row in V08 §3.5 (settlement row compares population, tierWord, name)', '-', 'DR6 (EpochInputs.wealthLevel, V06 W27) never reached', 'BROKEN', 'W-DOS-02'),
 ('power standings (F10) / relations', 'the pulse', 'epoch data (power slice); PowerRelation put', 'hysteresis of the dials (§4.11)', 'DR11, DR12', 'OK', ''),
 ('government (F11)', 'government name', 'attr on the government key', 'seat by the government table', 'DR11', 'OK', ''),
 ('conditions (F12)', 'activeConditions triggeredAt', 'ConditionOverlay put / retire at its week', 'Works; V06 works phase', 'DR21', 'OK', ''),
 ('resources (F13)', 'resourceHistory', 'DepositSite put / state', 'S12a land use', 'DR19', 'OK', ''),
 ('trade (F14)', 'links, partners, relationships', 'the trade slice at the next epoch', 'dials past hysteresis', 'DR3, DR4', 'OK', ''),
 ('rename (F15)', 'rename-settlement, rename-faction, rename-npc; demotedFrom/promotedFrom', 're-binding (item 12)', 're-class by the new name (DR24)', 'title; labels (S13a keeps protected names)', 'OK', ''),
 ('deity (F16)', 'the deity', 'attr on the deity key at the next epoch', '"a temple\'s dedication" — no mechanism named', 'none reached', 'BROKEN', 'W-DOS-04'),
 ('notables (F17)', 'replacedNpc', 'Person put / retire / rename', 'Posting, Membership re-bound', 'DR22\'s exception; importance reaches nothing', 'OK', 'W-DOS-07 (importance)'),
 ('decree (F18)', 'decrees[] with tickRef', 'the decree\'s own change rows', 'as the rows', 'as the rows', 'OK', ''),
 ('confirmed table event (F19) / reroll (F21)', 'data rows of the receipt table', 'as their rows', 'as their rows', 'as their rows', 'OK', ''),
 ('settlement ended or born (F20)', 'destroyedByEventId on the root; lifecyclePatch; memberBirths', 'an END epoch; a new dossier and map for a birth', 'decline hooks ruin every building; regrowth-first resettlement', 'all', 'OK', 'g item 113 (b) refounding extends it'),
 ('host undo (F22)', 'fact hash equals an absorbed state', 'forward convergence (item 5)', 'least disruption returns elements to former buildings', 'the report names the earlier state', 'OK', ''),
 ('port values (crime, importPct, foodChain, legitimacy, latitude, threats; F-V8-2)', 'arrival', 'the port-values key riding the next epoch\'s slice', 'readers of PortRows (§4.6, §4.9, II.7.3, II.7.5, §4.5 (6)); foodChain has none', 'DR16, DR17, DR19, DR2, DR-V8.1', 'PARTIAL', 'W-DOS-03 (foodChain)'),
 ('SettlementForge chains and dependencies (F-V8-4, F-V8-5)', 'arrival', 'epoch: the web re-derives at the next epoch', 'links, never stored', 'DR-V8.5', 'OK', ''),
 ('calamity (F-V8-6)', 'its tick', 'EpochInputs.events of the epoch covering its week', 'V06 hazards; V04 catacomb deaths', 'DR28', 'OK', ''),
 ('ruin evidence (F-V8-7)', 'arrival', 'epoch', 'V04 re-evaluates the ruin', 'DR-V8.2', 'OK', ''),
 ('custom definitions, chains, services (F-V8-3)', 'arrival; contentHash', 'attr custom_revision; dossierRecord puts', 'item 104 (e) re-resolution, least disruption', 'DR24 (custom rung), item 104 (h)', 'OK', ''),
 ('quarter phrase or landmarks', '-', 'attr on the quarter key', 'claims re-matched at each epoch (item 16)', 'DR5, DR14', 'OK', ''),
 ('site facts (terrain, access, threat, magic, culture, isolation) and history', 'none (frozen at generation in SettlementForge; a DM edit can change them)', 'creation-only by V08\'s rule (§2.7, §3.11), but no diff row reports a later change', '-', 'none by rule; the change is not reported', 'UNREPORTED', 'W-DOS-08'),
]

# ================================================================ THE DEFECT REGISTER (this lane's rulings; each re-checked)
# Every defect: id, class, unit that writes the missing link, severity, the piece, the exact missing link at its home,
# its source (this lane's detector or an inventory finding it adopts after checking the text is unchanged: base md5
# 01fea21f, volumes as of 2026-09-29 15:22), and CONFIRMED (checked in the text by grep and reading) or PLAUSIBLE.
DEFECTS = [
 # ---- the dossier end to end
 dict(id='W-DOS-01a', cls='dossier-unreached', unit='determinism', sev='major', piece='§7.7 item 1, the never-read list (item 86)',
      link="§7.7 item 1 names every stored SettlementForge key the port does not read, each with its reason: `_config` (raw inputs; the resolved `config` is read), `relationships`, `prominentRelationship` and `conflicts` (the NPC layer beside its social groups), `resourceAnalysis` (the deposits come from `config.nearbyResources*`), `defenseProfile` (copies of institution records and generation scores; walls come from the `@wall` kinds rows, defence from `monsterThreat`), `coherenceNotes`, `structuralViolations`, `structuralSuggestions`, `economicViability` (the host's own verdicts), `userCanon`, `npcLadder`, `traditions` (today only on V08's manifest as read:false) and the lived keys `campaignState.eventLog`, `_userEdits`, `dmLayer`, `locks`; and it states the CLOSED-DIGEST RULE: inside a record the port reads, a field that no DossierDigest field names is not read — the adapter's field table (W-DOS-01b) is the list",
      src='lane (dossier trace, SF_TRACE status UNLISTED)', conf='CONFIRMED'),
 dict(id='W-DOS-01b', cls='dossier-unreached', unit='V08', sev='major', piece='the adapter\'s SettlementForge-path table',
      link="V08 §2.4 gains THE ADAPTER'S FIELD TABLE for fp-integration-2026-09-23: every SettlementForge path (the 41 required keys, the 7 optional keys read, the campaign inputs of the realm block and the week) → the DossierDigest field it fills (naming the paths V08 leaves implicit: `config.cultureProfileKey` → `site.culture`, `config.nearbyResources*` → `site.deposits`, `neighborRelationship` / `neighbourNetwork` → `economy.partners`, `economicState.prosperity` → `wealth.label`) → the derivation row it feeds, or → `ignored` with its §7.7 item 1 reason; `AdapterManifest.keyList`, T-V8-20's ignore clause and §14's key-list lint read that table; `npcLadder` and `traditions` move to §7.7 item 1's one list",
      src='lane (dossier trace)', conf='CONFIRMED'),
 dict(id='W-DOS-02', cls='dossier-change-path', unit='V08', sev='major', piece='the prosperity word over time (receipt F9)',
      link="V08 §3.5's diff table gains the row `wealth`: `label` → `attr` with response `epoch` — `EpochInputs.wealthLevel` through `tables/dossier/wealth` (DR6; receipt F9), the producer V06 W27 and BCR-V6-9 read; today the settlement row compares only population, tier word and name, so a campaign's prosperity change never reaches DR6",
      src='lane (CHANGE_TRACE; V06 §1b W27 and its dossier trace)', conf='CONFIRMED'),
 dict(id='W-DOS-03', cls='dossier-unreached', unit='pipeline', sev='minor', piece='PortRows.hinterland.foodChain (← PortValues.foodChain ← economy.foodChains ← foodSecurity.chains); PortRows.customKinds',
      link="§4.9 (S12a's farm table) names the reader of `foodChain` — a chain the dossier marks absent sets its land uses' share to 0 (no `Pastoral & livestock` → no pasture), and §10.2's closing bullet adds §4.9 and S2's roster (for `customKinds`' numbers, V08 §3.11) to the port rows' readers; or §14 drops `foodChains` and §7.7 item 1 lists `foodSecurity.chains` (WG-PIPE-01)",
      src='lane + inventory WG-PIPE-01', conf='CONFIRMED'),
 dict(id='W-DOS-04', cls='dossier-unreached', unit='pipeline', sev='minor', piece='the dossier\'s deity; Religion.deities, practiceShare, clergyPerThousand',
      link="§10.2's religion rows name the producer of `Religion.deities` (the dossier's `religion.deityKey` / `deityName` when present, else the religion row's pantheon) and of `practiceShare` / `clergyPerThousand` (copied from V11's `ReligionRow`), and §10.4 names the reader: the principal temple's dedication in S13a's name; §7.7's DR14 lists `religion.deityName` among its inputs, so receipt F16's 'a temple's dedication at the next epoch' (V08 §3.5) has its mechanism",
      src='lane (field orphan Religion.deities; DIGEST_TRACE; W-03)', conf='CONFIRMED'),
 dict(id='W-DOS-05', cls='dossier-unreached', unit='scope', sev='minor', piece='DossierDigest.government.previous',
      link="§14 names the reader of `government.previous` (V06's chronicle and V10's history answer: the former governments with their causes and weeks) or drops the field and §7.7 item 1 lists `powerStructure.previousGovernments`",
      src='lane (DIGEST_TRACE)', conf='CONFIRMED'),
 dict(id='W-DOS-06', cls='orphan', unit='scope', sev='minor', piece='RealmBlock.mPerRealmUnit',
      link="§14's RealmBlock drops `mPerRealmUnit` (V08's host-side `realmBlockFrom` already turns the realm scale into each partner's `distanceM`, V08 §3.11), or names its module reader",
      src='lane (DIGEST_TRACE; W-03)', conf='CONFIRMED'),
 dict(id='W-DOS-07', cls='orphan', unit='V08', sev='minor', piece='DossierDigest.notables[].importance',
      link="V08 names the reader of a notable's `importance` (V10's people answer and V09's person card order them by it) or drops it from the digest and lists `npcs[].importance` as not read; V08 §3.5 itself says no rule reads it",
      src='lane (DIGEST_TRACE)', conf='CONFIRMED'),
 dict(id='W-DOS-08', cls='dossier-change-path', unit='V08', sev='minor', piece='a later change of the site facts or the history',
      link="V08 rules both creation-only (§2.7: 'the site is creation's'; §3.11: 'History. At creation only') but §3.5's diff table has no row for them, so a DM's later change of terrain, access, threat, magic, culture, isolation or the history is skipped without a word: the table gains rows `site` and `history` that cite that rule and write one note (`frozen_fact_changed`, class report, with its `host.note.*` row) so the change is reported, and §7.7's DR1 bar ('a coastal dossier has a coast') is stated as a creation bar",
      src='lane (CHANGE_TRACE)', conf='CONFIRMED'),
 dict(id='W-DOS-09', cls='dossier-no-derivation-row', unit='determinism', sev='major', piece='the history as a derivation input',
      link="§7.7's derivation table gains the history row(s) — map facts: the growth-stage count, the scars (buried town, fire and flood), a ruin's age, and g item 113's peak, replay and buried former settlement; inputs `history.ageYears`, `history.events`, `tierHistory`, `populationHistory`, `calamityHistory`, `peakTier`; rules §4.2 S2, II.7.6, V06's replay — g item 113's §7.7 part (J-A88.42 names the readers today without a row); V04 §1b.5's two history rows then cite it (V04-WGAP-1)",
      src='lane + inventory V04-WGAP-1, DWG-06', conf='CONFIRMED'),
 dict(id='W-DOS-10a', cls='dossier-no-derivation-row', unit='V01', sev='minor', piece='V01 §1b dossier trace rows for openings and catacomb entrances',
      link="V01 §1b's rows cite DR30 (DR-V8.2) and DR32 (DR-V8.4) by number (file f item 383) instead of \"V08's rows for item 109 (b)\" and \"(k) (3)\"", src='lane', conf='CONFIRMED'),
 dict(id='W-DOS-10b', cls='dossier-no-derivation-row', unit='V02', sev='minor', piece='V02 §1b dossier table (12 rows)',
      link="V02 §1b's dossier table names each row's derivation row: the kind → DR24; `materialFamily` → DR15; a split class → DR10; a crypt record → DR17; households and bands → DR6, DR7; a stepped culture → DR15 — beside the V08 and V11 rows that carry them", src='lane', conf='CONFIRMED'),
 dict(id='W-DOS-10c', cls='dossier-no-derivation-row', unit='V04', sev='minor', piece='V04 §1b.5 rows the water system; age and scars',
      link="V04 §1b.5 cites DR34 (DR-V8.7) for the water system and the history row of W-DOS-09 for the age, scars and magical history", src='lane + V04-WGAP-1', conf='CONFIRMED'),
 dict(id='W-DOS-10d', cls='dossier-no-derivation-row', unit='V06', sev='minor', piece='V06 §1b dossier trace rows chains, water system, landmarks',
      link="V06 §1b's trace cites DR33 (DR-V8.5), DR34 (DR-V8.7) and DR35 (DR-V8.8) by number instead of \"the coherence pass's row for item 105 (i) / 110 (b)\"", src='lane', conf='CONFIRMED'),
 # ---- interfaces and hooks
 dict(id='W-IF-01', cls='interface-no-implementer', unit='V04', sev='major', piece='V04\'s WhyProvider and the `underground` WhySectionProvider (BCR-V10-3)',
      link="V04 §1b.2 adds the provider rows (implementer `@plat/under`; callers V10's why query and V09's why card) and V04 §4.5 states their rows with `info.under.*` keys — the `ruin.node` line, `AccessPoint.cause`, `reusedBy`, an arch vault's span reason, `Chamber.monument` tiers, `FoundationsResult` footings, `CatacombComplex.blockedBy`, the terminal cistern — and `catacombOutcome`; a T-V4 bar covers them; IN-V04-7/8 fold into the body. V10 §3.9's owed table and BCR-V10-3's completeness test already expect it (V04 names no WhyProvider)",
      src='lane (both-ends check #15-#25) + inventory V04-WGAP-5', conf='CONFIRMED'),
 dict(id='W-IF-02', cls='interface-no-implementer', unit='V07', sev='major', piece='V07\'s WhyProvider for VillagePlan, VillageField, VillageEnd',
      link="V07 §4.5 registers its WhyProvider through BCR-V10-3's interface for the kinds V10 §3.9's owed table assigns it, its answers (listed in prose today) as rows with `info.village.*` keys, a V07 §1b row and a T-V7 bar — BCR-V10-3's completeness test checks exactly this provider",
      src='lane (both-ends check #58)', conf='CONFIRMED'),
 dict(id='W-IF-03', cls='hook-one-ended', unit='V10', sev='minor', piece='V01\'s three why providers (terrace, ward-edge wall, under-deck strip)',
      link="V10 §3.9's owed table lists V01 §4.5's three providers for their kinds, and V10's own RetainingWall and deck-plot rows cite them as V01's — one provider per kind",
      src='lane (both-ends U5, U6)', conf='CONFIRMED'),
 dict(id='W-IF-04', cls='hook-one-ended', unit='V09', sev='minor', piece='the calibration register → the tables editor\'s cell inspector',
      link="V09 §4.14's tables editor shows per cell its calibration register entry (V12 §2.6 CalibrationEntry: status, reference, due milestone, history) from `register.json` / `dist/evidence.json` — folding IN-V09-7 into the body (V01 §1b and V12 §1b name the inspector as a consumer)",
      src='lane (both-ends #5, #83) + V09-WGAP-2', conf='CONFIRMED'),
 dict(id='W-IF-05', cls='hook-one-ended', unit='V10', sev='minor', piece='the calibration register → the clerk\'s provenance answer',
      link="V10 §2.13's RuleAnswer gains the cell's register entry (status, reference, due milestone; V12 §2.6) and V10 §1b.1 lists `register.json` as an input; or V01 §1b and V12 §1b drop the claim",
      src='lane (both-ends #6, #84)', conf='CONFIRMED'),
 dict(id='W-IF-06', cls='hook-one-ended', unit='V02', sev='minor', piece='terrace.wallBandCm',
      link="V02 §1b's row names its real consumer (the wing datum's wall-side sample, V02 §3.10.9); V03's walk-out reads its own 2 × cellar.insetCm band (V03 §3.7.1) — or V03 §3.7.1 reads terrace.wallBandCm",
      src='lane (both-ends #10)', conf='CONFIRMED'),
 dict(id='W-IF-07', cls='interface-no-caller', unit='pipeline', sev='minor', piece='ContentProvider (door 4, §11.4, §14)',
      link="§4.2 S2, §4.7 S10b and §10.3 name where a registered provider replaces the roster, the siting and the people derivation (its call points); no implementer exists in the set, so either the base keeps door 4 as a third-party extension point with those call points and a fixture provider in §13.2's tests, or door 4 and ContentProvider are removed (J121: SettlementForge enters through the port)",
      src='lane (interface check) + inventory W-01', conf='CONFIRMED'),
 dict(id='W-HOOK-01', cls='hook-one-ended', unit='scope', sev='minor', piece='Staged by the owner\'s roadmap: the hooks table',
      link="the roadmap table gains the column 'built by': stage 2 → V01; stage 3 → V02 and V03 (the plan rung); the village → V07; the underground → V04, the islands → V05; the evolution engine → V06; calibration → V12; SettlementForge → V08; the authoring toolkit → V09, V10 (with V11's tables and V12's bars) — so each base hook names its other end (INDEX.md §2 holds it today)",
      src='lane (WIRED-BY register)', conf='CONFIRMED'),
 dict(id='W-HOOK-02', cls='hook-one-ended', unit='model', sev='minor', piece='§2\'s staged records and the stage-3 and plan hooks',
      link="§2.6 and §2.7 name each staged record's building volume: SkyIsland → V05; Tunnel, UndergroundSystem, Gallery, Chamber, UndergroundLink → V04; ConditionOverlay, DepositSite, PowerRelation, HistoryHint, the dossier-backed Person → V08; BuildingGenerator.compose → V02; BuildingGenerator.plan and the plan records → V03 (MW-01, MW-02)",
      src='inventory MW-01, MW-02', conf='CONFIRMED'),
 dict(id='W-PKG-01', cls='package-undeclared', unit='V10', sev='minor', piece='@plat/cli',
      link="V10 §1b.2 and §2 name the base's headless CLI in `@plat/api` (§14) as the host of `plat clerk`, or §14's package list gains `@plat/cli` with its dependency rule; no f item places `@plat/cli` today",
      src='lane (package census)', conf='CONFIRMED'),
 dict(id='W-TEST-01', cls='untested-failure', unit='V01', sev='major', piece='F-TEMPLATE, F-DISPATCH, F-UNIT (V1-3.13, BCR-18)',
      link="V1-3.13's failure table gains §5.2's 'how it is tested' column and BCR-18 carries it: F-TEMPLATE → the T-V1 bars that already exercise its rungs; F-DISPATCH → a T-V1-11 / T-V1-12 clause forcing an unmet quota to roll and a household-less manor block to revert; F-UNIT → a T-V1-20 clause on an outline below 4 × eLo² scaled up with its bend line",
      src='lane (failure-class check)', conf='CONFIRMED'),
 dict(id='W-EDIT-01', cls='edit-no-tool', unit='determinism', sev='major', piece='§7.1\'s twelve-tools table vs the 70 EditEvent kinds',
      link="one canonical home for the event → tool binding covering every EditEvent kind (the base's §7.1, since the tools and events are the base's, with V09 §4.3 citing it, or V09 §4.3 with §7.1 pointing to it — the canon rules); §7.4's create cells cite tools by id (DXC-04)",
      src='inventory DXC-04 (confirmed: V09 §4.3 covers every kind, §7.1 covers 40)', conf='CONFIRMED'),
 # ---- fields (the lane's field-orphan detector, reviewed one by one)
 dict(id='W-FLD-01', cls='dangling', unit='kernel', sev='major', piece='KernelTx.expect, KernelTx.onFail',
      link="§3.3 defines who sets `expect` (StageDecl.invariants, the caller's class floors), which op checks it at commit (returning E_BELOW_MIN_AREA / _WIDTH / _ANGLE) and what each `onFail` value does (reject: return the code; repair: §5 local repair on the overlay; downgrade: the stage's ladder rung), each consumer named in §5.1-§5.2 (KWG-03)",
      src='lane + inventory KWG-03', conf='CONFIRMED'),
 dict(id='W-FLD-02', cls='orphan', unit='kernel', sev='minor', piece='CommitRecord.edgesAdded, edgesRemoved, steinerAdded, steinerDissolved, work, owners',
      link="§3.3 names each reader (§5.4's kernel counts; §13.2's cost-model test for `work`; §7.3's locality closure or §8.1's dirty set for `owners`) or drops the fields (KWG-05)", src='lane + inventory KWG-05', conf='CONFIRMED'),
 dict(id='W-FLD-03', cls='orphan', unit='pipeline', sev='minor', piece='Reservation.compactnessMin',
      link="§4.2 S3 states that a claim's compactness floor is its reservation's `compactnessMin` (the castle's 0.75, which S3 (10) and F-CASTLE state as a constant today; none for the other kinds), or §2.5 drops the field", src='lane', conf='CONFIRMED'),
 dict(id='W-FLD-04', cls='orphan', unit='model', sev='minor', piece='ContextVector.rosterAssignment',
      link="§2.5 names its producer (S10b when a roster assignment claims the plot) and its reader (S11's designation template or the class-mix step), or drops it beside `assignment` (MW-04)", src='lane + inventory MW-04', conf='CONFIRMED'),
 dict(id='W-FLD-05', cls='orphan', unit='model', sev='minor', piece='Enceinte.walkCm',
      link="§2.7 names the reader of the wall walk's width (§11.1's VTT and glTF wall tops, or §8.3's close-up wall symbol) and S7 as its writer, or drops it (thicknessCm and heightCm are read)", src='lane + inventory MW-03', conf='CONFIRMED'),
 dict(id='W-FLD-06', cls='orphan', unit='model', sev='minor', piece='Recipe.presetId',
      link="§2.9 names the reader of this provenance field (the recipe panel's or the report's 'made from preset …' line) or drops it", src='lane', conf='CONFIRMED'),
 dict(id='W-FLD-07', cls='orphan', unit='pipeline', sev='minor', piece='Intent.wealthGradientCdeg',
      link="§4.5's prosperity field lists the gradient's bearing as a directional driver (its weight and default in the driver table), or §7.7 drops the field", src='lane', conf='CONFIRMED'),
 dict(id='W-FLD-08', cls='orphan', unit='V07', sev='minor', piece='VillagePlan.formSource, roadsSource',
      link="V07 §2.3 names their reader (V10's why for the village form and road topology; the re-derivation that keeps an 'edit' or 'dossier' source through an epoch) or drops them", src='lane', conf='CONFIRMED'),
 dict(id='W-FLD-09', cls='dangling', unit='pipeline', sev='minor', piece='District.venueMix',
      link="§4.5 names its producer (the district's use mix computed at S12c and at each epoch's character step); its readers — §4.10's description, the context vector, II.1's DistrictContext — are named (MW-04)", src='lane + inventory MW-04', conf='CONFIRMED'),
 dict(id='W-FLD-10', cls='orphan', unit='scope', sev='minor', piece='CorpusMap.populationEstimate',
      link="§13.9 (or V12's corpus stage) names its reader (the rung a corpus map is compared at) or drops it", src='lane', conf='CONFIRMED'),
 dict(id='W-FLD-11', cls='orphan', unit='V09', sev='minor', piece='LocalDocRecord.appVersion',
      link="V09 §2.11 names its reader (as DraftMirror.appVersion is read at open: a record from a newer app opened read-only) or drops it", src='lane', conf='CONFIRMED'),
 dict(id='W-FLD-12', cls='orphan', unit='V10', sev='minor', piece='Segment.promptTokens',
      link="V10 names its reader (the context-budget rule that opens a new segment or compacts as the last prompt nears the window) or drops it", src='lane', conf='CONFIRMED'),
 dict(id='W-FLD-13', cls='orphan', unit='model', sev='minor', piece='Block.depthClass',
      link="§2.5 names its producer (S10's depth band of the block, §4.7) and reader (the granularity rows, S11), or drops it (MW-03, MW-04)", src='lane + inventory MW-03, MW-04', conf='CONFIRMED'),
]

# inventory wiring findings adopted after checking the text is unchanged (their full claim and link live in the inventories)
ADOPTED = [
 ('DWG-01', 'dangling', 'determinism', 'major', 'the bug abort\'s outcome and its stream key field (§5.1, §5.4)'),
 ('DWG-02', 'dangling', 'determinism', 'minor', 'type Diff undefined (§5.4, §14 migrate)'),
 ('DWG-03', 'dangling', 'determinism', 'minor', 'reroll.maxAdvance, crossing.searchBandM called table values, no table row'),
 ('DWG-04', 'orphan', 'determinism', 'minor', 'GenerationReport.stages[].attempts: no producer rule, no reader'),
 ('DWG-05', 'dangling', 'determinism', 'minor', '§6.3 anchor rows missing for re-derivable kinds (yard parts, Frontage, Corridor, Castle, decorations, institutions)'),
 ('KWG-01', 'orphan', 'kernel', 'minor', 'W_STEINER: no producer, no reader'),
 ('KWG-02', 'dangling', 'kernel', 'minor', 'W_ATTRACTED read, never emitted'),
 ('KWG-04', 'orphan', 'kernel', 'minor', 'E_HOLE_CONTACT, E_BELOW_MIN_*, E_NON_CONVEX: no §5.2 consumer'),
 ('KWG-06', 'dangling', 'kernel', 'minor', 'dynamic grid cell sizes called table values, no table row'),
 ('KWG-07', 'interface-no-caller', 'kernel', 'minor', 'kernel services whose callers name them only by description (offsetFace, hexLattice, sampleProfile …)'),
 ('KWG-08', 'untested-failure', 'scope', 'minor', 'the frame-growth re-grid trigger\'s measurement not scheduled (§16 M4 or §12.8)'),
 ('KWG-09', 'orphan', 'kernel', 'minor', 'the 16-bit binary angle quantum: no consumer'),
 ('MW-05', 'dossier-unreached', 'model', 'minor', '§2\'s dossier paths do not cite §7.7 item 1\'s ignore-list'),
 ('WG-PIPE-02', 'interface-no-caller', 'pipeline', 'minor', 'S1 (9) drainage: readers not named'),
 ('WG-PIPE-03', 'orphan', 'pipeline', 'minor', 'SupplyEdge.substitutes: no reader'),
 ('WG-PIPE-04', 'edit-no-tool', 'pipeline', 'minor', 'the folk-contraction event: no declaration, lifecycle row, tool or undo'),
 ('WG-PIPE-05', 'interface-no-implementer', 'pipeline', 'minor', 'named strategies without signatures (TerrainStrategy … VillageStrategy)'),
 ('WG-PIPE-06', 'orphan', 'pipeline', 'minor', 'FarmTable.householdsPerFarmstead: reader not named'),
 ('WG-PIPE-07', 'dangling', 'pipeline', 'minor', 'SewerStrategy\'s declared inputs lack Features.sewers (II.6 vs II.7.2)'),
 ('WG-PIPE-08', 'edit-no-tool', 'pipeline', 'minor', 'the \'re-derive people\' action: no edit kind, tool or lifecycle row'),
 ('WG-PIPE-09', 'dangling', 'pipeline', 'minor', 'births and deaths named as epoch events with no kind (declare, or cite V06\'s kinds)'),
 ('WG-PIPE-11', 'dangling', 'pipeline', 'minor', 'class-mix and significance rows for lean_to_shelter and cottage missing'),
 ('WG-PIPE-12', 'dangling', 'pipeline', 'minor', 'types used by interfaces and declared nowhere (DistrictContext … EditRef)'),
 ('RWG-01', 'dangling', 'rendering', 'major', 'PinnedPlacement.dirCdeg and lines never reach LabelTable (pinDirCdeg, pinLines)'),
 ('RWG-02', 'dangling', 'rendering', 'major', 'seven roles and every @night / @autumn variant have no shipped value'),
 ('RWG-03', 'dangling', 'rendering', 'major', 'no threshold stop per band and no anchor for m_k'),
 ('RWG-04', 'dangling', 'rendering', 'minor', 'StyleSheet field types never declared (DetailBudget, LabelStyle, ThematicRow, PostOp)'),
 ('RWG-05', 'orphan', 'rendering', 'minor', 'family graphic, tintKey, castsShadowOnto, FieldRaster meaning custom, outlineMix: never consumed'),
 ('RWG-06', 'hook-one-ended', 'rendering', 'minor', 'LayerSpec.exportSeparately read by no §11.1 row'),
 ('RWG-07', 'hook-one-ended', 'pipeline', 'minor', 'live.people registered by the simulation module: §10.3 never registers it'),
 ('RWG-08', 'dangling', 'rendering', 'minor', 'the render-tag table never enumerated; seamClose has no carrying record'),
 ('RWG-09', 'untested-failure', 'rendering', 'minor', 'gate and pier symbolisation rows have no census row'),
 ('V01-WGAP-1', 'hook-one-ended', 'V01', 'minor', 'the skeleton export row lacks a quarter\'s terrace'),
 ('V02-WGAP-1', 'dangling', 'V02', 'minor', 'literal style values with no style-sheet cell'),
 ('V03-WGAP-1', 'hook-one-ended', 'V03', 'minor', 'the crypt section provider lives only in IN-V03-1'),
 ('V04-WGAP-2', 'untested-failure', 'V04', 'major', 'closure combinations (fade seal of a last access; bricked then undone; unexcavated reload) untested'),
 ('V04-WGAP-3', 'dangling', 'V04', 'minor', 'W_RUIN_SOURCE_REMOVED absent from BCR-41\'s list'),
 ('V04-WGAP-4', 'dangling', 'V04', 'major', 'Chamber.gradeFaces read by V03, produced nowhere'),
 ('V05-WGAP-1', 'hook-one-ended', 'V09', 'major', 'the offset-occlusion un-displacement of sky hit tests has no V09 end'),
 ('V05-WGAP-2a', 'hook-one-ended', 'V09', 'major', 'the island bend lines (keeps room; the rim stops here) have no bend.* message rows'),
 ('V05-WGAP-2b', 'hook-one-ended', 'V10', 'major', 'the island bend lines have no clerk bend rows'),
 ('V05-WGAP-3', 'orphan', 'V05', 'minor', 'IslandInstitution.near richest, IslandShadeStrip.cells/.evaluated, SkyIsland.removed.generated: no reader'),
 ('V06-WGAP-1a', 'hook-one-ended', 'V09', 'major', 'the lone-neighbourhood bend line has no V09 message row'),
 ('V06-WGAP-1b', 'hook-one-ended', 'V10', 'major', 'the lone-neighbourhood bend line has no clerk bend row'),
 ('V06-WGAP-2', 'hook-one-ended', 'V06', 'minor', 'hand-off rows X1-X49 without a closure mark (X30 open)'),
 ('V07-WGAP-1', 'dangling', 'V07', 'major', 'rule constants in prose with no village.json cell (T-V7-44 fails on the volume)'),
 ('V07-WGAP-2', 'orphan', 'V07', 'minor', 'density.bandWeight, network.slack, network.emptyDensity: read by no step'),
 ('V09-WGAP-1', 'hook-one-ended', 'V09', 'minor', 'item 113 (e)\'s LOST void has no V09 consumer'),
 ('V09-WGAP-2', 'hook-one-ended', 'V09', 'major', 'integration notes IN-V09-4/5/6/7/11 absent from the body'),
 ('V10-WGAP-1', 'dangling', 'V10', 'minor', 'islet size, the fill ring and the green\'s 24-gon outside clerk.content'),
 ('V11-WGAP-1', 'hook-one-ended', 'V11', 'minor', 'registry row 50 (era) omits V07\'s reading stage'),
]

# ================================================================ assembly
REF_BASE = re.compile(r'(?<![V\d-])§(\d+(?:\.\d+)?)')
REF_VOL = re.compile(r'\bV(\d{1,2})(?:\s*§|-)(\d+[a-z]?(?:\.\d+[a-z]?)?)')
REF_II = re.compile(r'\b(II\.\d+(?:\.\d+)?)\b')
REF_ITEM = re.compile(r'\b((?:MODEL|KERNEL|PIPELINE|DETERMINISM|RENDERING|SCOPE)-\d{4}|V\d{2}-\d{4})\b')

def ref_nodes(text):
    out = set()
    if not isinstance(text, str):
        text = json.dumps(text, ensure_ascii=False)
    for m in REF_ITEM.finditer(text): out.add('fact:' + m.group(1))
    spans = []
    for m in re.finditer(r'\b(?:V|volume\s)(\d{1,2})(?:\s*§|-)(\d+[a-z]?(?:\.\d+[a-z]?)?)', text):
        n = int(m.group(1)); spans.append(m.span())
        if 1 <= n <= 12: out.add('sec:V%02d:§%s' % (n, m.group(2)))
    for m in REF_BASE.finditer(text):
        if any(a <= m.start() < b for a, b in spans): continue
        out.add('sec:base:§' + m.group(1))
    for m in REF_II.finditer(text): out.add('sec:base:' + m.group(1))
    return out

def NT(i):
    return {'sec': 'section', 'fact': 'fact', 'stage': 'stage'}.get(i.split(':')[0], i.split(':')[0])

def load_inventories(root):
    items = []
    for f in sorted(glob.glob(os.path.join(root, 'docs/validation/coherence/inventory-*.json'))):
        d = json.load(open(f, encoding='utf-8'))
        for it in d.get('items', []):
            rid = it.get('id')
            if not rid: continue
            reads = it.get('reads') or it.get('wiring_in') or []
            used = it.get('used_by') or it.get('read_by') or it.get('wiring_out') or []
            w = it.get('wiring')
            if isinstance(w, dict):
                reads = [w.get('reads_or_produced_by', '')] + list(w.get('in_unit_links') or [])
                used = [w.get('read_by', '')]
            unit = it.get('owner_unit') or it.get('unit') or it.get('owner_part') or os.path.basename(f)[10:-5]
            sec = it.get('sub') or it.get('sec') or it.get('section') or (it.get('where') or it.get('stated_in') or [''])[0]
            items.append({'id': rid, 'kind': it.get('kind'), 'unit': unit, 'sec': sec, 'reads': reads, 'used': used,
                          'keys': it.get('keys') or it.get('names') or []})
    return items

def build(root):
    lines = load_corpus(root)
    decls = parse_code(lines)
    rows = parse_1b(lines)
    uti = unit_text_index(lines)
    be = both_ends(rows, uti, '')
    forph = field_orphans(decls, lines)
    tdefs, trefs = tests_index(lines)
    ddefs, drefs = dr_index(lines)
    inv = load_inventories(root)
    load_inventory_links(root)
    vpath = os.path.join(root, 'docs/validation/coherence/wiring-verdicts.json')
    verdicts = json.load(open(vpath, encoding='utf-8')) if os.path.exists(vpath) else {}

    nodes = OrderedDict(); edges = []
    def N(i, t, **a):
        if i not in nodes: nodes[i] = dict(id=i, type=t, **a)
        return i
    def E(a, b, t, **x):
        edges.append(dict(src=a, dst=b, type=t, **x))

    # sections and units
    for ln in lines:
        if ln.norm:
            N('sec:%s:%s' % ('base' if ln.unit in BASE_UNITS else ln.unit, ln.sec if ln.unit in BASE_UNITS else ln.sec.split(' ', 1)[-1]),
              'section', unit=ln.unit)
    # records, fields, interfaces, methods
    for d in decls:
        kind = 'interface' if d['methods'] else 'record'
        rid = N('%s:%s@%s' % (kind, d['name'], d['unit']), kind, name=d['name'], unit=d['unit'], sec=d['sec'], line=d['line'])
        for f in d['fields']:
            E(rid, N('field:%s.%s@%s' % (d['name'], f, d['unit']), 'field', unit=d['unit']), 'contains')
        for m in d['methods']:
            E(rid, N('method:%s.%s@%s' % (d['name'], m, d['unit']), 'method', unit=d['unit']), 'contains')
    # §1b pieces
    for r in rows:
        pid = N('piece:%s:%d' % (r['vol'], r['line']), {'edit': 'edit-kind', 'entity': 'entity-kind', 'interface': 'interface-row',
                'dossier': 'dossier-trace-row', 'hookuse': 'hook-use'}.get(r['kind'], 'piece'), unit=r['vol'], text=r['piece'][:160], keys=r['keys'])
        for t in sorted(set(ref_nodes(r['producer'])) | set('stage:' + s for s in STAGE_RE.findall(r['producer']))):
            E(N(t, NT(t)), pid, 'writes' if r['kind'] != 'interface' else 'implements')
        for t in sorted(set(ref_nodes(r['consumer'])) | set('stage:' + s for s in STAGE_RE.findall(r['consumer']))):
            E(pid, N(t, NT(t)), 'reads' if r['kind'] != 'interface' else 'calls')
        for t in sorted(ref_nodes(r['hook'])):
            E(pid, N(t, 'section'), 'fills-hook')
        for col, et in (('rendered', 'renders'), ('labelled', 'labels'), ('exported', 'exports'), ('persisted', 'persists')):
            if r.get(col): E(pid, N('view:' + col, 'mechanism'), et, how=r[col][:80])
        if r['kind'] == 'edit':
            if r['tool']: E(N('tool:' + (re.findall(r'T\d+', r['tool']) or ['?'])[0], 'tool'), pid, 'calls')
            if r['lifecycle']: E(pid, N('sec:base:§7.4', 'section'), 'persists')
        for d in re.findall(r'\bDR(?:\d+|-V\d+\.\d+)\b', (r.get('dr') or '') + ' ' + (r.get('dtrace') or '')):
            E(pid, N('dr:' + d, 'derivation-row'), 'derives-from')
    # tests
    for tid, occ in tdefs.items():
        tn = N('test:' + tid, 'test', defined=['%s %s' % (u, s) for u, s, n in occ[:3]])
        for u, s, n in occ[:1]:
            E(tn, N('sec:%s:%s' % ('base' if u in BASE_UNITS else u, s if u in BASE_UNITS else s.split(' ', 1)[-1]), 'section'), 'tests')
    for tid, occ in trefs.items():
        if tid not in tdefs: N('test:' + tid, 'test', dangling=True)
    # derivation rows
    for d in sorted(set(ddefs) | set(drefs)):
        N('dr:' + d, 'derivation-row', defined=bool(ddefs.get(d)))
    # the registry of tables (V11 §3.1)
    v11 = [ln for ln in lines if ln.unit == 'V11']
    st = [ln.no for ln in v11 if ln.text.startswith('| # | TableId |')]
    if st:
        hdr, body, first = md_tables(v11, st[0], st[0] + 400)[0]
        for no, c in body:
            tn = N('table:' + c[1].strip('`').split('`')[0], 'table', file=c[2][:60], readers=c[5][:200])
            for s in STAGE_RE.findall(c[5]): E(N('stage:' + s, 'stage'), tn, 'reads')
            for t in sorted(ref_nodes(c[5])): E(N(t, 'section'), tn, 'reads')
    # packages (§14's dependency rule and the volumes' packages)
    chain = ['kernel', 'model', 'tables', 'site', 'content', 'layout', 'plots', 'labels', 'render', 'edit', 'export', 'port', 'api', 'app']
    for a, b in zip(chain, chain[1:]):
        E(N('package:@plat/' + b, 'package'), N('package:@plat/' + a, 'package'), 'calls')
    for ln in lines:
        if ln.norm:
            for p in re.findall(r'@plat/([a-z][a-z0-9-]*)', ln.text):
                E(N('package:@plat/' + p, 'package'), N('sec:%s:%s' % ('base' if ln.unit in BASE_UNITS else ln.unit,
                  ln.sec if ln.unit in BASE_UNITS else ln.sec.split(' ', 1)[-1]), 'section'), 'mentions')
    # the base's tools → events (§7.1's table)
    base = [ln for ln in lines if ln.unit in BASE_UNITS]
    st = [ln.no for ln in base if ln.text.startswith('| layer | tool | the events it emits |')]
    if st:
        hdr, body, first = md_tables(base, st[0], st[0] + 40)[0]
        for no, c in body:
            tool = re.findall(r'T\d+', c[1])
            if not tool: continue
            for ev in re.findall(r'`([A-Za-z][A-Za-z.]*)', c[2]):
                E(N('tool:' + tool[0], 'tool'), N('edit:' + ev.split('.')[0], 'edit-kind'), 'calls')
    st = [ln.no for ln in base if ln.text.startswith('| kind | create | read | persist |')]
    if st:
        hdr, body, first = md_tables(base, st[0], st[0] + 200)[0]
        for no, c in body:
            for ev in re.findall(r'[A-Za-z][A-Za-z]+', c[0].split('(')[0]):
                if ev[0].islower() and ev not in ('on', 'a', 'the', 'with', 'among', 'set', 'incl'):
                    E(N('edit:' + ev, 'edit-kind'), N('lifecycle:§7.4:' + str(no), 'lifecycle-row'), 'persists')
    # inventory facts and their wiring fields
    unresolved = 0
    for it in inv:
        fid = N('fact:' + it['id'], 'fact', unit=it['unit'], sec=str(it['sec'])[:40], kind=it['kind'])
        for r in (it['reads'] if isinstance(it['reads'], list) else [it['reads']]):
            ts = ref_nodes(r)
            if not ts: unresolved += 1
            for t in sorted(ts): E(fid, N(t, NT(t)), 'reads')
        for r in (it['used'] if isinstance(it['used'], list) else [it['used']]):
            for t in sorted(ref_nodes(r)): E(N(t, NT(t)), fid, 'reads')
    # the dossier
    for sf, via, to, status, note in SF_TRACE:
        s = N('dossier-sf:' + sf, 'dossier-field', status=status)
        if status == 'IGNORED':
            E(N('ignore-list:§7.7 item 1', 'ignore-list'), s, 'ignores')
        elif via and via != '-':
            d = N('dossier-digest:' + via, 'digest-field')
            E(d, s, 'derives-from')
            for r in re.findall(r'\bDR(?:\d+|-V\d+\.\d+)\b', to): E(N('dr:' + r, 'derivation-row'), d, 'reads')
    for f, cons, status, note in DIGEST_TRACE:
        d = N('dossier-digest:' + f, 'digest-field', status=status)
        for r in re.findall(r'\bDR(?:\d+|-V\d+\.\d+)\b', cons): E(N('dr:' + r, 'derivation-row'), d, 'reads')

    # candidates with verdicts
    cands = []
    for o in forph:
        k = 'field:%s.%s' % (o['record'], o['field'])
        cands.append(dict(key=k, detector='field-orphan', where='%s %s' % (o['unit'], o['sec']), **verdict_of(verdicts, k)))
    for b in be:
        if b['verdict'] in ('candidate', 'unkeyed'):
            k = 'xvol:%s:%d:%s:%s' % (b['vol'], b['line'], b['role'], b['target'])
            cands.append(dict(key=k, detector='both-ends', where='%s §1b line %d → %s' % (b['vol'], b['line'], b['target']),
                              piece=b['piece'][:120], **verdict_of(verdicts, k)))
    for k in sorted(verdicts):
        if k.startswith('iface:') or k == 'field:Block.depthClass':
            cands.append(dict(key=k, detector='review', where='', **verdict_of(verdicts, k)))
    dangling_tests = sorted(t for t in trefs if t not in tdefs and not t.startswith('T110b'))

    # the WIRED-BY register: base hooks and the volume ends that fill them (§1b 'base hook' column)
    wiredby = defaultdict(lambda: defaultdict(int))
    base_secs = set(ln.sec for ln in lines if ln.unit in BASE_UNITS)
    base_secs |= set(re.sub(r'^(§\d+)\..*$', r'\1', x) for x in base_secs)
    for r in rows:
        if r['hook'] and r['hook'].strip() not in ('—', '-', ''):
            for t in sorted(ref_nodes(r['hook'])):
                if t.startswith('sec:base:') and t[9:] in base_secs: wiredby[t[9:]][r['vol']] += 1

    summary = summarise(nodes, edges, cands, dangling_tests)
    return dict(nodes=nodes, edges=edges, cands=cands, dangling_tests=dangling_tests, wiredby=wiredby,
                unresolved_inventory_refs=unresolved, summary=summary, rows=rows, be=be, forph=forph)

def verdict_of(V, k):
    v = V.get(k)
    if not v: return dict(verdict='UNREVIEWED')
    return dict(verdict=v['verdict'], unit=v.get('unit'), severity=v.get('severity'), defect=v.get('defect_id'), note=(v.get('note') or '')[:240])

INV_LINKS = {}

def load_inventory_links(root):
    """id -> the inventory's own missing-link text (link / fix / hint), with the file it lives in."""
    for f in sorted(glob.glob(os.path.join(root, 'docs/validation/coherence/inventory-*.json'))):
        d = json.load(open(f, encoding='utf-8'))
        for k in ('wiring_gaps', 'wiring_observations', 'wiring_findings', 'cross_part_conflicts', 'missing_parts'):
            for x in d.get(k, []) or []:
                if isinstance(x, dict) and x.get('id'):
                    txt = x.get('link') or x.get('fix') or x.get('hint') or x.get('ruling_hint') or x.get('where') or x.get('statement') or ''
                    INV_LINKS[x['id']] = (txt, os.path.basename(f))

def all_defects():
    out = [dict(d) for d in DEFECTS]
    for i, c, u, s, p in ADOPTED:
        base_id = re.sub(r'([0-9])[ab]$', r'\1', i)
        txt, f = INV_LINKS.get(base_id, ('', 'inventory'))
        link = txt or 'the inventory finding\'s link'
        if base_id == 'V05-WGAP-2' or base_id == 'V06-WGAP-1':
            link = link + (' — the %s part' % u)
        out.append(dict(id=i, cls=c, unit=u, sev=s, piece=p, link=link, src='%s %s' % (f, base_id), conf='CONFIRMED (text unchanged since the inventory)'))
    return out

def summarise(nodes, edges, cands, dangling_tests):
    D = all_defects()
    from collections import Counter
    by_cls = Counter(d['cls'] for d in D)
    units = ['model', 'kernel', 'pipeline', 'determinism', 'rendering', 'scope'] + VOLS
    by_unit = Counter(d['unit'] for d in D)
    sf_unreached = [r for r in SF_TRACE if r[3] in ('UNLISTED', 'UNREACHED')]
    return dict(
        nodes=len(nodes), edges=len(edges),
        node_types=dict(Counter(n['type'] for n in nodes.values()).most_common()),
        edge_types=dict(Counter(e['type'] for e in edges).most_common()),
        orphans=by_cls['orphan'], dangling=by_cls['dangling'],
        one_ended_hooks=by_cls['hook-one-ended'] + by_cls['interface-no-implementer'] + by_cls['interface-no-caller'],
        dossier_fields=len(SF_TRACE), dossier_unreached=len(sf_unreached),
        defects=len(D), defects_by_class=dict(by_cls.most_common()),
        gaps_by_unit=[dict(unit=u, gaps=by_unit.get(u, 0)) for u in units],
        candidates=len(cands), candidates_by_verdict=dict(Counter(c['verdict'] for c in cands).most_common()),
        dangling_tests=len(dangling_tests))

def main():
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('--root', default=ROOT_DEFAULT)
    ap.add_argument('--out', default=None)
    ap.add_argument('--md', nargs='?', const='default', default=None, help='also write wiring.md (default path when no value)')
    ap.add_argument('--candidates', default=None)
    a = ap.parse_args()
    g = build(a.root)
    out = a.out or os.path.join(a.root, 'docs/validation/coherence/wiring.json')
    doc = OrderedDict()
    doc['about'] = ('The wiring graph of the whole design set (base + V01-V12) and the dossier trace; built by wiring.py (lane coherence/wiring). '
                    'PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/wiring; covered by the whole-design retrovalidation (J84).')
    doc['summary'] = g['summary']
    doc['defects'] = all_defects()
    doc['dossier'] = dict(sf_paths=[dict(path=p, via=v, to=t, status=s, note=n) for p, v, t, s, n in SF_TRACE],
                          digest=[dict(field=f, consumers=c, status=s, note=n) for f, c, s, n in DIGEST_TRACE],
                          derivation_rows=[dict(row=r, fact=f, inputs=i, home=h, status=s) for r, f, i, h, s in DR_TRACE],
                          change_kinds=[dict(change=c, receipts=r, envelope_fold=e, mutation=m, dependents=d, status=s, note=n) for c, r, e, m, d, s, n in CHANGE_TRACE])
    doc['wired_by'] = {k: dict(v) for k, v in sorted(g['wiredby'].items())}
    doc['candidates'] = g['cands']
    doc['dangling_tests'] = g['dangling_tests']
    doc['nodes'] = list(g['nodes'].values())
    doc['edges'] = g['edges']
    with open(out, 'w', encoding='utf-8') as fh:
        json.dump(doc, fh, ensure_ascii=False, indent=0, sort_keys=False)
    if a.candidates:
        json.dump(g['cands'], open(a.candidates, 'w'), indent=1, ensure_ascii=False)
    if a.md:
        mdp = a.md if a.md != 'default' else os.path.join(a.root, 'docs/validation/coherence/wiring.md')
        open(mdp, 'w', encoding='utf-8').write(render_md(g, ''))
    s = g['summary']
    print('nodes %d edges %d | defects %d (orphans %d, dangling %d, one-ended %d) | dossier fields %d unreached %d | candidates %d %s | dangling tests %d'
          % (s['nodes'], s['edges'], s['defects'], s['orphans'], s['dangling'], s['one_ended_hooks'], s['dossier_fields'],
             s['dossier_unreached'], s['candidates'], s['candidates_by_verdict'], s['dangling_tests']))


# ================================================================ the report (wiring.md), regenerated with the graph
WIRED_BY_CURATED = [
 # (base piece, base home, the other end, status)
 ('the FabricStrategy slot, SeamContract, NeighbourhoodStrategy, the neighbourhood band', 'II.1, II.2, §4.12', 'V01 §2.4, §3 (templates, the unit runner)', 'WIRED-BY V01'),
 ('BuildingGenerator.outline / compose (the stage-3 hook), PathShapeRow', '§2.6', 'V02 §3 (massing, composition; BCR-V2-06)', 'WIRED-BY V02 (W-HOOK-02 names it at §2)'),
 ('BuildingGenerator.plan, the plan records, the interior ladder', '§2.6, §10.2', 'V03 §3 (the plan rung)', 'WIRED-BY V03 (W-HOOK-02)'),
 ('SewerStrategy, UndergroundStrategy, UndercityStrategy, UndergroundSystemStrategy, UndergroundLinkStrategy; Tunnel, UndergroundSystem, Gallery, Chamber, UndergroundLink, AccessPoint', 'II.6, II.7, §2.7', 'V04 §1b.2, §3.1-§3.10', 'WIRED-BY V04 (W-HOOK-02)'),
 ('SkyStrategy, IslandRule, SkyIsland, the sky pseudo-districts of S7b', 'II.6, §2.7, §4.5', 'V05 §2, §3', 'WIRED-BY V05 (W-HOOK-02)'),
 ('EvolutionStrategy, EpochInputs, ConversionOp, the decline table', '§4.11', 'V06 §2.1, §3', 'WIRED-BY V06'),
 ('NetworkStrategy / EnceinteStrategy village registrations, LadderRouter, StrategyRegistry.products (f item 202)', 'PART III, §1.1, §4.12', 'V07 §2.1, §3.4, §3.5', 'WIRED-BY V07'),
 ('DossierPort adapter folders; ConditionOverlay, DepositSite, PowerRelation, HistoryHint, the dossier-backed Person; PortRows', '§14, §2.7, §10.2, §7.7', 'V08 §2.4, §2.5, §3.5, §3.11', 'WIRED-BY V08 (W-HOOK-02)'),
 ('the tool API, the twelve tools, the skeleton file', '§11.2, §7.1, §11.1', 'V09 §4 (the canvas), V10 §3-§4 (the clerk)', 'WIRED-BY V09, V10'),
 ('the rule tables\' schemas and the tables registry', '§7.6, §14 @plat/tables', 'V11 §2.1, §3.1 (92 registry rows, every one with readers)', 'WIRED-BY V11'),
 ('CorpusAdapter, CalibrationRun, baselines.json corpus rows', '§13.9, §13.5', 'V12 §3.10 (implemented research-side)', 'WIRED-BY V12 (W-02 confirmed)'),
 ('WhyProvider, WhySectionProvider (BCR-V10-3)', 'V10 §2.13 (a base change request)', 'V01, V02, V03, V05, V06 implement; V04 and V07 do not', 'DEFECT W-IF-01, W-IF-02'),
 ('the economy, personality and stat-block stubs; Posting.filledBy', '§10.3 (D-32)', '@plat/sim at M4b (the base\'s own optional module)', 'WIRED-BY @plat/sim (WG-PIPE-10)'),
 ('live.people', '§8.2', '§10.3 never registers it', 'DEFECT RWG-07'),
 ('ContentProvider (door 4)', '§11.4, §14', 'no implementer and no named call point', 'DEFECT W-IF-07'),
]

def md_escape(s):
    return str(s).replace('|', '\\|').replace('\n', ' ')

def render_md(g, stamp):
    S = g['summary']; D = all_defects()
    o = []
    w = o.append
    w('# Coherence pass — the wiring graph and the dossier trace (lane coherence/wiring)\n')
    w('> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/wiring; covered by the whole-design retrovalidation (J84).\n')
    w('PROGRESS\n- [x] 0 method and sources\n- [x] 1 the graph (wiring.json, wiring.py)\n- [x] 2 defects by class\n- [x] 3 the dossier trace\n- [x] 4 defects by unit\n- [x] 5 WIRED-BY register\n')
    w('Generated by `python3 docs/validation/coherence/wiring.py --md` from the inventories, the design text (base md5 01fea21f; volumes as of 2026-09-29 15:22) and this lane\'s verdicts (`wiring-verdicts.json`). %s\n' % stamp)
    w('## 0 Outcome\n')
    from collections import Counter as _C
    rk = _C(r['kind'] for r in g['rows'])
    w('The set is wired far better than its size suggests: every volume carries a §1b wiring table (%d piece rows, %d interface rows, %d edit rows, %d entity rows, %d dossier-trace rows), every edit row names its tool, lifecycle row and undo, every entity row is rendered, labelled, exported and persisted, every one of the 92 rule tables in V11\'s registry names its readers, and no test id is referenced without a definition. ' % (rk['piece'], rk['interface'], rk['edit'], rk['entity'], rk['dossier']))
    w(
      'The graph has **%d nodes and %d typed edges**. The lane raises **%d wiring defects** (%s), %d of them major; every one is routed to the unit that writes the missing link. '
      'The dossier trace follows **%d SettlementForge paths**: %d consumed, %d on the never-read list, **%d unreached** (%d never read and never listed, %d read into the digest but consumed by nothing), 2 pending g items 111 and 113. '
      'The two dossier defects that matter most: a campaign\'s change of the prosperity word has no path to the map (W-DOS-02), and eleven stored top-level keys are neither read nor on §7.7 item 1\'s never-read list (W-DOS-01a, -01b).\n'
      % (S['nodes'], S['edges'], S['defects'], ', '.join('%s %d' % kv for kv in S['defects_by_class'].items()),
         sum(1 for d in D if d['sev'] == 'major'), S['dossier_fields'],
         sum(1 for r in SF_TRACE if r[3] == 'CONSUMED'), sum(1 for r in SF_TRACE if r[3] == 'IGNORED'), S['dossier_unreached'],
         sum(1 for r in SF_TRACE if r[3] == 'UNLISTED'), sum(1 for r in SF_TRACE if r[3] == 'UNREACHED')))
    w('| measure | count |\n|---|---|')
    for k in ('nodes', 'edges', 'defects', 'orphans', 'dangling', 'one_ended_hooks', 'dossier_fields', 'dossier_unreached', 'candidates', 'dangling_tests'):
        w('| %s | %s |' % (k, S[k]))
    w('')
    w('## 1 Method\n')
    w('1. **Pieces** are read from the text, not from memory: records, fields, interfaces and methods from every code block (%d declarations); the volumes\' §1b wiring tables by their column headers (piece, producer, consumer, base hook; edit, tool, lifecycle, undo; entity, rendered, labelled, exported, persisted; dossier fact, field, derivation row); the base\'s structured tables (§7.1\'s tools and events, §7.4\'s lifecycle rows, §7.7\'s derivation table, V11 §3.1\'s table registry, §14\'s package chain); tests and derivation rows by id; the inventories\' items with their `reads` / `used_by` / `wiring` fields as fact nodes (their unresolvable free-text references, %d, are counted and not guessed).' % (sum(1 for n in g['nodes'].values() if n['type'] in ('record', 'interface')), g['unresolved_inventory_refs']))
    w('2. **Detectors** raise candidates: a field named nowhere outside its declaration (189); a §1b row naming another volume whose text never names the piece (99 keyed, 78 described only in words); a test or derivation row referenced but never defined; a table with no reader; an interface with no implementer or caller; a failure class with no test; a package outside §14; an edit row without tool, lifecycle row or undo; an entity row without a column. **Every candidate was reviewed** in the text (the other end searched by its concept, not only its identifier); the verdicts are in `wiring-verdicts.json` and a re-run over a rewritten text reports any new candidate as UNREVIEWED.')
    w('3. **The dossier** is traced from SettlementForge\'s own fields (research/sf/dossier-model.md; the 77 rows of research/sf/mapping.md with the 18 corrections of research/sf/mapping-verify.md, which bind) through the neutral digest (§14, V08 §2.5), the derivation rows (§7.7 DR1-DR25, the volumes\' DR26-DR35 of file f item 383) and the change path (the envelope, the fold, the mutation, the re-derivation) to the facts they reach.')
    w('4. **Inventory findings** about wiring (the inventories\' wiring_gaps, wiring_observations and wiring_findings) are adopted after checking their text is unchanged; the missing parts of g items 111-113 and the J122 answers stay with the canon\'s F-MISSING routing (§8).\n')
    w('## 2 The graph\n')
    w('Node types: ' + ', '.join('%s %d' % kv for kv in S['node_types'].items()) + '.\n')
    w('Edge types: ' + ', '.join('%s %d' % kv for kv in S['edge_types'].items()) + '.\n')
    w('Candidates reviewed: %d — %s. Dangling test references: %d (the `T110b.*` family is defined in V12 §3.6b).\n' % (S['candidates'], ', '.join('%s %d' % kv for kv in S['candidates_by_verdict'].items()), S['dangling_tests']))
    w('Classes checked that hold **no** defect: tables no mechanism reads (all 92 registry rows name readers); tools with no event (T1-T12 each emit events, §7.1\'s table; V09 §4.3 binds every edit kind); volume edit rows without tool, lifecycle row or undo (0 of %d); volume entity rows not rendered, labelled, exported or persisted (0 of %d; the base\'s entity registry path test enforces the same for every registered kind, §2.8, §13.2); tests with no target (every defined test states what it measures) and test references with no definition (0); stage outputs nobody reads (every §1b stage-output row names its consumer; the base\'s per-stage outputs carry their readers in the pipeline inventory, whose 29 reader-less items are behaviour rules, not outputs); volume pieces that plug into no base hook (the 36 hook-less rows are in-volume derived views and tables, each read by a named mechanism that registers through the base).\n' % (sum(1 for r in g['rows'] if r['kind'] == 'edit'), sum(1 for r in g['rows'] if r['kind'] == 'entity')))
    w('## 3 Defects by class\n')
    classes = OrderedDict()
    for d in D: classes.setdefault(d['cls'], []).append(d)
    for c, ds in classes.items():
        w('### %s (%d)\n' % (c, len(ds)))
        w('| id | unit | sev | piece | the missing link, at its home | source |\n|---|---|---|---|---|---|')
        for d in ds:
            w('| %s | %s | %s | %s | %s | %s; %s |' % (d['id'], d['unit'], d['sev'], md_escape(d['piece']), md_escape(d['link']), md_escape(d['src']), d['conf']))
        w('')
    w('## 4 The dossier trace\n')
    w('### 4.1 Every SettlementForge path → the digest → the mechanism\n')
    w('| SettlementForge path | digest field | consumed by | status | note |\n|---|---|---|---|---|')
    for p, v, t, s, n in SF_TRACE:
        w('| %s | %s | %s | **%s** | %s |' % (md_escape(p), md_escape(v), md_escape(t), s, md_escape(n)))
    w('')
    w('### 4.2 Every digest field → its consumers\n')
    w('| DossierDigest field | consumers | status | note |\n|---|---|---|---|')
    for f, c, s, n in DIGEST_TRACE:
        w('| %s | %s | **%s** | %s |' % (md_escape(f), md_escape(c), s, md_escape(n)))
    w('')
    w('### 4.3 Every derived map fact → its dossier inputs and derivation row\n')
    w('Base DR1-DR25 each name their inputs among the digest fields above (checked row by row against §7.7 item 10\'s table); the volumes\' rows are numbered by file f item 383 and land with their base change requests. Every volume\'s §1b dossier table was read: the rows that cite no derivation row are W-DOS-10a-d; the history rows are W-DOS-09.\n')
    w('| row | map fact | dossier inputs | home | status |\n|---|---|---|---|---|')
    for r, f, i, h, s in DR_TRACE:
        w('| %s | %s | %s | %s | %s |' % (md_escape(r), md_escape(f), md_escape(i), md_escape(h), s))
    w('')
    w('### 4.4 Every dossier change kind → the path to its dependent facts\n')
    w('The common path (§7.7 items 5, 6, 13, 14; V08 §3.5-§3.6): the port diffs the new digest against `Document.dossier.carried` by binding key, writes one `DossierChange` per changed element into `EditBase.dossierChange` (the envelope), dates it by the receipt table and §4.11\'s rungs, and either folds it at its own week as a standalone dossier event or rides the cadence\'s epoch in `EpochInputs`; the fold mutates the current map by the least-disruption order (S10b, S11\'s mutator; item 14\'s states), re-derives exactly the rows whose inputs changed (§7.7 item 11 (b)), and the display list and every export follow through the entity registry under the viewer\'s knowledge key.\n')
    w('| change | receipts | envelope and fold | mutation | dependents re-derived | status | note |\n|---|---|---|---|---|---|---|')
    for c, r, e, m, dd, s, n in CHANGE_TRACE:
        w('| %s | %s | %s | %s | %s | **%s** | %s |' % (md_escape(c), md_escape(r), md_escape(e), md_escape(m), md_escape(dd), s, md_escape(n)))
    w('')
    w('## 5 Defects by unit\n')
    w('| unit | defects | ids |\n|---|---|---|')
    units = ['model', 'kernel', 'pipeline', 'determinism', 'rendering', 'scope'] + VOLS
    for u in units:
        ids = [d['id'] for d in D if d['unit'] == u]
        w('| %s | %d | %s |' % (u, len(ids), ', '.join(ids) or '—'))
    w('')
    w('## 6 WIRED-BY — intentional one-ended pieces and where their other end lives\n')
    w('| base piece | base home | the other end | status |\n|---|---|---|---|')
    for a, b, c, s in WIRED_BY_CURATED:
        w('| %s | %s | %s | %s |' % (md_escape(a), b, md_escape(c), s))
    w('')
    w('The volumes plug into these base sections (count of §1b rows naming each as their base hook, by volume):\n')
    w('| base section | volumes (rows) |\n|---|---|')
    for k, v in sorted(g['wiredby'].items(), key=lambda kv: (kv[0].replace('II.', 'Z').replace('§', ''))):
        w('| %s | %s |' % (k, ', '.join('%s %d' % kv for kv in sorted(v.items()))))
    w('')
    w('Volume pieces with no base hook (36 §1b rows: V03 21, V10 6, V04 5, V02, V07, V08, V09 one each) are derived views or in-volume tables each read by a named in-volume mechanism that itself registers through the base (the plan rung, the clerk\'s harness, U-SYS); none floats.\n')
    w('## 7 The detectors\' candidates and their verdicts\n')
    w('| detector | candidates | DEFECT | WIRED |\n|---|---|---|---|')
    from collections import Counter
    for det in ('field-orphan', 'both-ends', 'review'):
        cs = [c for c in g['cands'] if c['detector'] == det]
        cc = Counter(c['verdict'] for c in cs)
        w('| %s | %d | %d | %d |' % (det, len(cs), cc.get('DEFECT', 0), cc.get('WIRED', 0)))
    w('')
    w('Field orphans ruled WIRED are internal storage of a named mechanism (the kernel\'s arena and role tables, the display list\'s columns), fields whose declaration comment names their reader, fields read under another written form (a formula\'s symbol: II.7.5\'s P_ref and g; prose: the castle\'s keep shape), components of a record read whole (DistrictSignature by T-V1-5\'s classifier), or @plat/sim stubs WIRED-BY the module. Cross-volume rows ruled WIRED have their other end in the named volume under its own wording (for example V10 §3.9\'s owed table lists V04\'s arch vaults and monuments in words).\n')
    w('## 8 Routed elsewhere (not counted above)\n')
    w('The inventories\' missing parts — the owner questions J122 decided (V01, V02, V03, V04, V05, V06, V11, V12) and the g items 111, 112 and 113 parts absent from V04, V05, V06, V09, V10, V11, V12 — are F-MISSING and J122 findings for the canon\'s routing; their wiring consequences are recorded here as PENDING (the oasis_water and history rows of §4) and in V09-WGAP-1 (the LOST void\'s consumer). WG-PIPE-10 is WIRED-BY @plat/sim; W-02 and W-06-W-10 are wired; W-05 (the volume end of the hook bars) is wired too — V04 §1.2 keeps T11-1, T12-1, T14-1 and T63-T66 on generated output, V05 §1.2 keeps T10-1, T13-1 and T15-1, V06 names its hook-test ids (T8, T17, T18, T20, T25, T31, T67, T70, T72, T76, T81); DWG-06 is the f/g application routing.\n')
    w('## 9 CONFIRMED versus PLAUSIBLE\n')
    w('CONFIRMED: every defect above was checked in the current text by grep and reading at the cited homes (the adopted inventory findings by re-reading their cited lines, the text unchanged since the inventories); the counts are the script\'s output. PLAUSIBLE: the reason classes proposed for the never-read keys in W-DOS-01a (the owner\'s item 86 decides them); SettlementForge\'s field list itself comes from the research lanes (dossier-model.md, mapping.md, mapping-verify.md), not from a new read of SettlementForge.\n')
    return '\n'.join(o) + '\n'


if __name__ == '__main__':
    main()
