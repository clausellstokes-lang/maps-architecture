#!/usr/bin/env python3
"""make_denylist.py — the hashed content deny-list of docs/ARCHITECTURE.md §17.1 (5) (M-1 item W-16; research side only).

  python3 research/baselines/make_denylist.py build [--refmap-names FILE] [--record JSON] [--date YYYY-MM-DD]
  python3 research/baselines/make_denylist.py scan FILE... [--allow TSV ...] [--show]
  python3 research/baselines/make_denylist.py selftest [--report JSON] [--unreviewed TSV] [--refmap-names FILE]

Run from the project root; stdlib only (Python 3.9). Written by lane m1/W-16 (Opus, 2026-10-03). Its record is
docs/calibration/E16-denylist.md.

What it builds. research/baselines/denylist/denylist.v1.json.gz — salted digests only, never a token — from the corpus the
clean-room re-check of 2026-10-03 used (docs/validation/clean-room-mac-2026-10-03.md: every source of doc_checks.py's C1–C4)
plus that record's two blind spots (the capture bodies with unquoted keys; the reference prose C3 never reads), the image
and texture bytes, the Foundry module's message and field names, the provenance table's class citations
(research/findings/code-impact.md §(d)), and the reference maps' names (transcribed by the research seat; digests only).
Two trees are left out by rule: research/sf/ (SettlementForge, the owner's own program, not a reference — §17.1 (3), (6))
and research/baselines/ (M-1's own numbers-only outputs, which cross into plat/ by §17.1 (4), this list among them).

Digest. hex(SHA-256(salt ‖ tag ‖ 0x1F ‖ payload))[:16], payload UTF-8 (a file's raw bytes for tag `file`); the salt is 32
random bytes generated once (salt.hex beside the list) and never regenerated while a list exists.
Normalisation. Unicode NFKD, combining marks dropped, lower-cased; a token is a maximal run of [a-z0-9_].
Classes (tag — what is digested — how the scanner hits):
  tok   single tokens not in the spell list (below) — any equal token
  id    case-kept identifiers (doc_checks.py's C1 names, the Foundry field names, the provenance table's class
        citations) — any identifier run [A-Za-z0-9_]+(.[A-Za-z0-9_]+)* whose dotted sub-sequence equals one (C1's
        whole-word, case-sensitive rule)
  tri   token 3-grams in list order — a run of >= 3 consecutive listed 3-grams (C3's rule)
  col   six-digit colour values written as colours in the corpus — a #rrggbb / 0xrrggbb literal of the scanned text
  file  file bytes — an identical file
  phr   multi-token reference-map names (2 to the longest name's length) — the same token sequence
  word  per list, the set of its one-word members of >= 4 letters (check (vi)'s index) — >= 5 distinct words of one
        set on one line, or among the one-word cells of one table column (C4's rule and J-S36)
The reference maps' names: --refmap-names reads the research seat's transcription (map<TAB>name per line, kept outside
the project) and rewrites refmap-names.digests (salted digests and two counts only); without it the digests file is
merged as it stands.
Spell list (tok only): /usr/share/dict/words (Webster's 2nd, web2), with English inflections and British spellings
reduced to it, plus research/baselines/denylist/spell-supplement.txt (our own list of modern, technical and generic words
and the references' own names, which §17.1 (6)'s provenance cites).
The tokens of the corpus are held in memory only while the script runs; nothing but digests and counts is written.
"""
import argparse, glob, gzip, hashlib, html, io, json, os, re, secrets, sys, unicodedata
from collections import Counter, defaultdict

ROOT_OUT = 'research/baselines/denylist'
LIST_PATH = ROOT_OUT + '/denylist.v1.json.gz'
SALT_PATH = ROOT_OUT + '/salt.hex'
SUPPLEMENT = ROOT_OUT + '/spell-supplement.txt'
REFMAP_DIGESTS = ROOT_OUT + '/refmap-names.digests'
DESIGN_ALLOW = ROOT_OUT + '/design-allow.tsv'
DOC_ALLOW = 'docs/validation/doc-checks-allow.tsv'
DICT = '/usr/share/dict/words'
EXCLUDE = ('research/sf/', 'research/baselines/')
FORMAT = 'plat.denylist/1'
TRI_RUN, SET_MIN, WORD_MIN, PHR_MAX = 3, 5, 4, 8
NOT_COLOURS = {'000000', 'ffffff'}           # black and white: not creative content (recorded in E16)
IMAGE_EXT = {'png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'ico', 'svg', 'tif', 'tiff', 'avif'}
CODE_EXT = {'js', 'mjs', 'cjs', 'wasm'}      # program bundles: never opened (the M-1 brief; §17.1 (1))
FONT_MAGIC = (b'wOFF', b'wOF2', b'\x00\x01\x00\x00', b'OTTO', b'true', b'ttcf')
CODE_MAGIC = (b'\x00asm',)
DESIGN_SET = ['docs/ARCHITECTURE.md'] + sorted(glob.glob('docs/volumes/V*.md')) + ['docs/volumes/INDEX.md', 'docs/volumes/SUMMARY.md']
PROSE_PATTERNS = ('research/devlogs/**/*.md', 'research/ftg-docs/**/*.md', 'research/patreon/**/*.md',
                  'research/external/**/*.txt', 'research/external/**/*.html')
# doc_checks.py's own constants, repeated so its corpus is read exactly as it reads it
PROFILER = re.compile(r'(\.calls[^/]*\.json|\.coverage\.json|\.idle\.json|\.trace\.json|\.draw\.json|\.paths\.json|/report\.json|/meta\.json|/session\.json|/index\.json)$')
MEMBER = re.compile(r"[A-Za-z][A-Za-z '\-]{2,40}")
C2_EXT = ('md', 'txt', 'json', 'js', 'ts', 'tsv', 'csv', 'html', 'htm', 'svg', 'css', 'log', 'hx', 'xml', 'yaml', 'yml')
SNAKE = re.compile(r'[A-Za-z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)+')
COLOUR_LIT = re.compile(rb'(?:#|0[xX])([0-9a-fA-F]{6})(?![0-9a-fA-F])')
COLOUR_QUOTED = re.compile(rb'["\']([0-9a-fA-F]{6})["\']')
DOC_COLOUR = re.compile(r'(?:#|0x)([0-9a-fA-F]{6})(?![0-9a-fA-F])')
IDENT_RUN = re.compile(r'[A-Za-z0-9_]+(?:\.[A-Za-z0-9_]+)*')

def strip_marks(s): return ''.join(c for c in unicodedata.normalize('NFKD', s) if not unicodedata.combining(c))
def norm(s): return strip_marks(s).lower()
def toks(s): return re.findall(r'[a-z0-9_]+', norm(s))
def words(s): return [w for w in re.findall(r'[a-z]+', norm(s)) if len(w) >= WORD_MIN]
def list_words(fs):
    """A list's indexed words, as check (vi) indexes them: each member that is one word of four or more letters
    (a member of several words is not split — the 3-gram and token classes carry those)."""
    return sorted({norm(m) for m in fs if re.fullmatch(r'[a-z]{%d,}' % WORD_MIN, norm(m))})

# ---------------------------------------------------------------- spell list
_D = None; _SUP = None
BRIT_ANY = [('our', 'or'), ('ae', 'e')]                       # colour, harbour; mediaeval
BRIT_END = [('re', 'er'), ('ise', 'ize'), ('isation', 'ization'), ('yse', 'yze'), ('llery', 'lry'), ('ogue', 'og'),
            ('ey', 'y')]                                      # centre, organise, analyse, jewellery, catalogue, storey
SUFFIX = (('ies', ['y']), ('es', ['', 'e']), ('s', ['']), ('ied', ['y']), ('ed', ['', 'e']), ('ing', ['', 'e']),
          ('iest', ['y']), ('ier', ['y']), ('est', ['', 'e']), ('ers', ['', 'e']), ('er', ['', 'e']), ('ily', ['y']),
          ('ly', ['', 'le']))
def _load_spell():
    global _D, _SUP
    if _D is None:
        _D = set(w.strip().lower() for w in open(DICT, encoding='utf-8', errors='replace') if w.strip())
        _SUP = set()
        if os.path.exists(SUPPLEMENT):
            for l in open(SUPPLEMENT, encoding='utf-8'):
                _SUP.update(w.lower() for w in l.split('#', 1)[0].split())
def _stems(t):
    out = {t}
    for suf, reps in SUFFIX:
        if t.endswith(suf) and len(t) - len(suf) >= 2:
            b = t[:-len(suf)]
            for r in reps: out.add(b + r)
            if len(b) >= 3 and b[-1] == b[-2]: out.add(b[:-1])
    return out
def known(t):
    """True when the token is ordinary vocabulary: the dictionary (with inflections and British spellings), or the
    supplement (its words and their inflections)."""
    _load_spell()
    if t in _D or t in _SUP: return True
    vs = {t}
    for a, b in BRIT_ANY:
        if a in t: vs.add(t.replace(a, b))
    for v in list(vs):
        for s in _stems(v):
            for w in [s] + [s[:-len(a)] + b for a, b in BRIT_END if s.endswith(a)]:
                if w in _D or w in _SUP: return True
    return False
def ident_candidate(x):
    """An identifier worth a case-kept digest: four or more characters, and a compound (a lower-to-upper case step or an
    inner underscore) or not ordinary vocabulary — a single capitalised or upper-case dictionary word is left to the
    list class, as a case-kept digest of it would hit every sentence that starts with the word."""
    return len(x) >= 4 and bool(re.search(r'[a-z][A-Z]', x) or '_' in x.strip('_') or not known(x.lower()))
def tok_candidate(t):
    return 3 <= len(t) <= 40 and re.search(r'[a-z]', t) and not re.search(r'[0-9]', t) and not known(t)

# ---------------------------------------------------------------- digests
class Hasher:
    def __init__(self, salt_hex): self.salt = bytes.fromhex(salt_hex); self.memo = {}
    def d(self, tag, payload):
        k = (tag, payload)
        v = self.memo.get(k)
        if v is None:
            b = payload.encode('utf-8') if isinstance(payload, str) else payload
            v = self.memo[k] = hashlib.sha256(self.salt + tag.encode() + b'\x1f' + b).hexdigest()[:16]
            if len(self.memo) > 4000000: self.memo.clear()
        return v
    def file(self, path):
        h = hashlib.sha256(self.salt + b'file\x1f')
        with open(path, 'rb') as fh:
            for chunk in iter(lambda: fh.read(1 << 20), b''): h.update(chunk)
        return h.hexdigest()[:16]

def get_salt(create):
    if os.path.exists(SALT_PATH):
        s = open(SALT_PATH).read().strip()
        assert re.fullmatch(r'[0-9a-f]{64}', s), 'salt.hex is malformed'
        return s
    if os.path.exists(LIST_PATH):
        sys.exit('refusing: the list exists but salt.hex is missing — the salt is generated once and kept with the list')
    if not create: sys.exit('no salt yet: run build first')
    s = secrets.token_hex(32)
    os.makedirs(ROOT_OUT, exist_ok=True)
    open(SALT_PATH, 'w').write(s + '\n')
    return s

# ---------------------------------------------------------------- the corpus, read as doc_checks.py reads it
def in_scope(p): return not p.startswith(EXCLUDE)
def lenient_json(raw):
    t = re.sub(r'([{,]\s*)([A-Za-z_]\w*)\s*:', r'\1"\2":', raw); t = re.sub(r',(\s*[}\]])', r'\1', t)
    return json.loads(t)

class Corpus:
    """Collects the plaintext sets in memory (never written): the C3 3-grams, the C4 lists, the token and identifier
    candidates, the colour values, the files to digest, the names — each with per-source counts for the record."""
    def __init__(self):
        self.tri = set(); self.lists = {}; self.tok = set(); self.ident = set(); self.col = set(); self.phr = set()
        self.files = []; self.counts = Counter(); self.c1 = []; self.c4_lists = set(); self.bare6 = set()
        self.list_src = Counter()

    # -- lists (C4 rules) and token candidates from one JSON value
    def _add_list(self, seq, src):
        m = [s for s in seq if isinstance(s, str) and MEMBER.fullmatch(s)]
        fs = frozenset(s.lower() for s in m)
        if len(fs) >= 3:
            if src == 'json': self.c4_lists.add(fs)
            if fs not in self.lists: self.lists[fs] = src; self.list_src[src] += 1
            for s in m:
                for t in toks(s):
                    if tok_candidate(t): self.tok.add(t)
    def _records(self, vals, src):
        if not vals: return
        if all(isinstance(v, str) for v in vals): self._add_list(vals, src); return
        recs = [v for v in vals if isinstance(v, dict)]
        if len(recs) >= 3:
            for k in dict.fromkeys(k for r in recs for k in r):
                seq = []
                for r in recs:
                    v = r.get(k)
                    if isinstance(v, str): seq.append(v)
                    elif isinstance(v, list): seq.extend(e for e in v if isinstance(e, str))
                self._add_list(seq, src)
    def walk_json(self, d, want_lists, src):
        stream = []
        def snake(s):
            if isinstance(s, str) and len(s) <= 50 and SNAKE.fullmatch(s):
                t = norm(s)
                if re.search(r'[a-z]', t) and not re.search(r'[0-9]', t) and not known(t): self.tok.add(t)
        def walk(x):
            if isinstance(x, str):
                stream.extend(t for t in toks(x) if not t.isdigit())
                if want_lists: snake(x)
            elif isinstance(x, dict):
                for k, v in x.items():
                    stream.extend(t for t in toks(k) if not t.isdigit())
                    if want_lists: snake(k)
                    walk(v)
                if want_lists: self._add_list(list(x.keys()), src); self._records(list(x.values()), src)
            elif isinstance(x, list):
                for v in x: walk(v)
                if want_lists: self._records(x, src)
        walk(d)
        self.tri.update(zip(stream, stream[1:], stream[2:]))

    def colours_from_bytes(self, data):
        for m in COLOUR_LIT.finditer(data): self.col.add(m.group(1).decode().lower())
        for m in COLOUR_QUOTED.finditer(data):
            v = m.group(1).decode().lower()
            if re.search(r'[a-f]', v): self.col.add(v)
        for m in re.finditer(rb'(?<![0-9a-fA-F])([0-9a-fA-F]{6})(?![0-9a-fA-F])', data): self.bare6.add(m.group(1).decode().lower())

    def read(self, refmap_file=None):
        sys.setrecursionlimit(100000)
        # (1) C1 identifiers, exactly as doc_checks.py reads them
        src = open('research/findings/ftg-payload-visual.md', encoding='utf-8').read().split('\n')
        s0 = next(i for i, l in enumerate(src) if l.startswith('### 7.2'))
        s1 = next(i for i in range(s0 + 1, len(src)) if src[i].startswith('### ') or src[i].startswith('## '))
        self.c1 = sorted(set(re.findall(r'`([A-Za-z_][A-Za-z0-9_.]*)`', '\n'.join(src[s0:s1]))) | {'SET_TIME'})
        for i in self.c1:
            self.ident.add(i)
            for t in toks(i):
                if tok_candidate(t): self.tok.add(t)
        self.counts['c1_identifiers'] = len(self.c1)
        # (2) the Foundry module's field names (payload-visual §7.3) — identifiers, and one list per entity
        s2 = next(i for i, l in enumerate(src) if l.startswith('### 7.3'))
        s3 = next(i for i in range(s2 + 1, len(src)) if src[i].startswith('### ') or src[i].startswith('## '))
        n = 0
        for para in '\n'.join(src[s2:s3]).split('\n\n'):
            names = []
            for span in re.findall(r'`([^`]+)`', para):
                names += re.findall(r'[A-Za-z_][A-Za-z0-9_]*', span)
            names = [x for x in dict.fromkeys(names) if not re.fullmatch(r'(src|handlebars|hbs|js|md)', x)]
            for x in names:
                if ident_candidate(x):
                    self.ident.add(x); n += 1
                    for t in toks(x):
                        if tok_candidate(t): self.tok.add(t)
            if len(names) >= 3: self._add_list(names, 'foundry')
        self.counts['foundry_identifiers'] = n
        # (3) the provenance table's class citations (code-impact.md §(d), column 4: citation only, never carried)
        ci = open('research/findings/code-impact.md', encoding='utf-8').read().split('\n')
        d0 = next(i for i, l in enumerate(ci) if l.startswith('## (d)'))
        d1 = next(i for i in range(d0 + 1, len(ci)) if ci[i].startswith('## '))
        n = 0
        for l in ci[d0:d1]:
            cells = [c.strip() for c in re.split(r'(?<!\\)\|', l)]
            if len(cells) < 6 or not re.match(r'[PD]\d+$', cells[1]): continue
            for span in re.findall(r'`([^`]+)`', cells[4]):
                for run in re.findall(r'[A-Za-z_][A-Za-z0-9_]*(?:\.[A-Za-z_][A-Za-z0-9_]*)*', span):
                    parts = run.split('.')
                    for p in parts:
                        if ident_candidate(p):
                            self.ident.add(p); n += 1
                            for t in toks(p):
                                if tok_candidate(t): self.tok.add(t)
                    if len(parts) > 1: self.ident.add(run); n += 1
        self.counts['provenance_class_identifiers'] = n
        # (4) the JSON corpus (C3 and C4), research/ and captures/, the two excluded trees left out
        jf_all = sorted(set(glob.glob('research/**/*.json', recursive=True) + glob.glob('captures/**/*.json', recursive=True)))
        jf = [f for f in jf_all if in_scope(f)]
        self.counts['json_files_doc_checks'] = len(jf_all); self.counts['json_files_in_scope'] = len(jf)
        self.counts['json_files_excluded'] = len(jf_all) - len(jf)
        unread = []
        for f in jf:
            try: d = json.load(open(f, encoding='utf-8', errors='replace'))
            except (OSError, ValueError): unread.append(f); continue
            self.walk_json(d, not PROFILER.search(f), 'json')
        self.counts['json_unparsed'] = len(unread)
        # (5) blind spot 1: the bodies with unquoted keys, parsed leniently (one walk per distinct body)
        seen = set(); ok = 0; still = 0
        for f in unread:
            raw = open(f, encoding='utf-8', errors='replace').read()
            if raw in seen: continue
            seen.add(raw)
            try: d = lenient_json(raw)
            except ValueError: still += 1; continue
            ok += 1
            self.walk_json(d, True, 'lenient')
            self.colours_from_bytes(raw.encode('utf-8'))
        self.counts['lenient_distinct_bodies'] = ok; self.counts['lenient_unparsed'] = still
        # (6) the findings: C3's Markdown 3-grams (digits kept) and the string arrays a finding quotes
        fm = sorted(glob.glob('research/findings/*.md'))
        self.counts['findings_md'] = len(fm); n = 0
        for f in fm:
            txt = open(f, encoding='utf-8', errors='replace').read()
            t = toks(txt); self.tri.update(zip(t, t[1:], t[2:]))
            for arr in re.findall(r'\[\s*((?:"[^"\n]{1,60}"|\'[^\'\n]{1,60}\')(?:\s*,\s*(?:"[^"\n]{1,60}"|\'[^\'\n]{1,60}\')){2,})\s*\]', txt):
                self._add_list([x[1:-1] for x in re.findall(r'"[^"\n]*"|\'[^\'\n]*\'', arr)], 'findings'); n += 1
        self.counts['findings_quoted_arrays'] = n
        # (7) blind spot 2: the reference prose (C3's rule, digits kept; HTML without its tags)
        pf = sorted(set(f for p in PROSE_PATTERNS for f in glob.glob(p, recursive=True)))
        self.counts['prose_files'] = len(pf)
        for f in pf:
            t = open(f, encoding='utf-8', errors='replace').read()
            if f.endswith('.html'): t = html.unescape(re.sub(r'<script.*?</script>|<style.*?</style>|<[^>]+>', ' ', t, flags=re.S))
            tt = toks(t); self.tri.update(zip(tt, tt[1:], tt[2:]))
        # (8) colours: doc_checks.py's C2 files (in scope) plus captures' SVG, read for values written as colours
        cf = [f for f in glob.glob('research/**/*', recursive=True) if os.path.isfile(f) and f.rsplit('.', 1)[-1].lower() in C2_EXT]
        cf += glob.glob('captures/**/README*.md', recursive=True) + glob.glob('captures/**/*.json', recursive=True)
        cf += glob.glob('docs/confidence/**/*', recursive=True) + glob.glob('docs/improvements/**/*', recursive=True)
        cf += ['docs/CONFIDENCE.md', 'docs/IMPROVEMENTS.md'] + glob.glob('captures/**/*.svg', recursive=True)
        cf = [f for f in dict.fromkeys(cf) if in_scope(f) and os.path.isfile(f) and f.rsplit('.', 1)[-1].lower() not in CODE_EXT]
        self.counts['colour_files'] = len(cf)
        for f in cf:
            try: self.colours_from_bytes(open(f, 'rb').read())
            except OSError: pass
        self.col -= NOT_COLOURS
        # (9) file bytes: every image and texture of research/ and captures/, and every captured body but code and fonts
        ff = []
        for base in ('research', 'captures'):
            for f in glob.glob(base + '/**/*', recursive=True):
                if not os.path.isfile(f) or not in_scope(f): continue
                ext = f.rsplit('.', 1)[-1].lower() if '.' in f.rsplit('/', 1)[-1] else ''
                if ext in CODE_EXT: continue
                if ext in IMAGE_EXT or '/network/bodies/' in f:
                    with open(f, 'rb') as fh: head = fh.read(4)
                    if head.startswith(FONT_MAGIC) or head.startswith(CODE_MAGIC): self.counts['files_skipped_font_or_code'] += 1; continue
                    ff.append(f)
        self.files = sorted(ff); self.counts['files'] = len(self.files)
        # (10) the reference maps' names (the research seat's transcription; plaintext never stored in the project)
        if refmap_file:
            self.refmap = []
            for l in open(refmap_file, encoding='utf-8'):
                l = l.rstrip('\n')
                if not l.strip() or l.startswith('#'): continue
                mp, name = l.split('\t', 1)
                self.refmap.append((mp, name.strip()))
        else: self.refmap = None

def build(a):
    salt = get_salt(create=True); H = Hasher(salt)
    C = Corpus(); C.read(a.refmap_names)
    out = {'tok': set(), 'id': set(), 'tri': set(), 'col': set(), 'file': set(), 'phr': set()}
    out['tok'] = {H.d('tok', t) for t in C.tok}
    out['id'] = {H.d('id', i) for i in C.ident}
    out['tri'] = {H.d('tri', ' '.join(g)) for g in C.tri}
    out['col'] = {H.d('col', c) for c in C.col}
    out['file'] = {H.file(f) for f in C.files}
    sets = set()
    dropped = 0
    for fs in C.lists:
        ws = list_words(fs)
        if len(ws) < SET_MIN: dropped += 1; continue
        sets.add(tuple(sorted(H.d('word', w) for w in ws)))
    # the reference maps: digests merged from the persistent digest file; rebuilt from a transcription when given one
    rm = Counter(); phrmax = 2
    if C.refmap is not None:
        lines = []
        per_map = defaultdict(set)
        for mp, name in C.refmap:
            t = toks(name)
            lines += [('tok', mp, H.d('tok', x)) for x in t if tok_candidate(x)]
            if 2 <= len(t) <= PHR_MAX: lines.append(('phr', mp, H.d('phr', ' '.join(t)))); phrmax = max(phrmax, len(t))
            lines += [('tri', mp, H.d('tri', ' '.join(g))) for g in zip(t, t[1:], t[2:])]
            if re.fullmatch(r'[a-z]{%d,}' % WORD_MIN, norm(name)): per_map[mp].add(norm(name))   # check (vi)'s index rule
        for mp, ws in sorted(per_map.items()):
            for w in sorted(ws): lines.append(('word', mp, H.d('word', w)))
        with open(REFMAP_DIGESTS, 'w') as fh:
            fh.write('# reference-map names, transcribed by the research seat (lane m1/W-16, 2026-10-03): salted digests only\n')
            fh.write('# class\tmap\tdigest (meta rows: the longest name in tokens and the name count per map)\n')
            fh.write(f'meta\tphrmax\t{phrmax}\n')
            for mp, n in sorted(Counter(mp for mp, _ in C.refmap).items()): fh.write(f'meta\tnames_{mp}\t{n}\n')
            for c, mp, d in sorted(set(lines)): fh.write(f'{c}\t{mp}\t{d}\n')
    if os.path.exists(REFMAP_DIGESTS):
        per_map = defaultdict(set)
        for l in open(REFMAP_DIGESTS):
            if l.startswith('#') or not l.strip(): continue
            c, mp, d = l.rstrip('\n').split('\t')
            if c == 'meta':
                if mp == 'phrmax': phrmax = int(d)
                else: rm[mp] = int(d)
                continue
            if c == 'word': per_map[mp].add(d)
            else: out[c].add(d)
            rm[c] += 1
        for mp, ds in per_map.items():
            if len(ds) >= SET_MIN: sets.add(tuple(sorted(ds)))
    doc = {
        'format': FORMAT,
        'generated': a.date,
        'salt': salt,
        'hash': 'first 16 hex digits of SHA-256(salt bytes, then the tag in ASCII, then 0x1F, then the payload in UTF-8; for tag file the raw bytes)',
        'normalise': 'Unicode NFKD, combining marks dropped, lower-cased; a token is a maximal run of [a-z0-9_]; a word is a maximal run of [a-z] of at least 4 letters',
        'rules': {
            'tok': 'tag tok: a token of the scanned text whose digest is listed is a hit',
            'id': 'tag id: case kept, no lower-casing; every run [A-Za-z0-9_]+(.[A-Za-z0-9_]+)* is split at its dots and every contiguous dotted sub-sequence is digested; a listed one is a hit',
            'tri': 'tag tri: the payload is three consecutive tokens joined by one space; a run of at least 3 consecutive listed 3-grams is a hit',
            'col': 'tag col: the payload is six lower-case hex digits; each #rrggbb or 0xrrggbb literal of the scanned text not followed by a further hex digit is digested',
            'file': 'tag file: an identical file is a hit',
            'phr': 'tag phr: the payload is 2 to phrMaxTokens consecutive tokens joined by one space; a listed one is a hit',
            'word': 'tag word: each entry of sets is one list as the sorted digests of its one-word members of at least 4 letters; a line holding at least 5 distinct words of one set is a hit, and so is a table column (the values of one field across records) whose one-word cells hold at least 5 distinct words of one set',
        },
        'thresholds': {'triRun': TRI_RUN, 'setWords': SET_MIN, 'wordLetters': WORD_MIN, 'phrMaxTokens': phrmax},
    }
    for k in ('tok', 'id', 'tri', 'col', 'file', 'phr'): doc[k] = sorted(out[k])
    doc['sets'] = sorted(list(s) for s in sets)
    buf = io.BytesIO()
    with gzip.GzipFile(fileobj=buf, mode='wb', mtime=0, compresslevel=9, filename='') as gz:
        gz.write(json.dumps(doc, separators=(',', ':'), sort_keys=True).encode('utf-8'))
    os.makedirs(ROOT_OUT, exist_ok=True)
    open(LIST_PATH, 'wb').write(buf.getvalue())
    counts = dict(C.counts)
    counts.update({'digests_' + k: len(doc[k]) for k in ('tok', 'id', 'tri', 'col', 'file', 'phr')})
    counts['digests_sets'] = len(doc['sets']); counts['set_word_digests'] = sum(len(s) for s in doc['sets'])
    counts['lists_read'] = len(C.lists); counts['lists_under_five_words'] = dropped
    counts['lists_by_source'] = dict(C.list_src)
    counts['c4_lists_in_scope'] = len(C.c4_lists)
    counts['colour_values'] = len(C.col); counts['bare_six_hex_runs'] = len(C.bare6)
    counts['refmap'] = dict(rm)
    counts['list_bytes'] = len(buf.getvalue())
    counts['list_sha256'] = hashlib.sha256(buf.getvalue()).hexdigest()
    counts['dict_sha256'] = hashlib.sha256(open(DICT, 'rb').read()).hexdigest()
    counts['dict_words'] = len(_D)
    counts['supplement_words'] = len(_SUP)
    counts['supplement_sha256'] = hashlib.sha256(open(SUPPLEMENT, 'rb').read()).hexdigest() if os.path.exists(SUPPLEMENT) else None
    print(json.dumps(counts, indent=1, sort_keys=True))
    if a.record:
        open(a.record, 'w').write(json.dumps(counts, indent=1, sort_keys=True) + '\n')

# ---------------------------------------------------------------- the scanner's research-side twin
class DenyList:
    def __init__(self, path=LIST_PATH):
        doc = json.loads(gzip.open(path).read())
        assert doc['format'] == FORMAT
        self.H = Hasher(doc['salt']); self.doc = doc
        self.sets = {k: set(doc[k]) for k in ('tok', 'id', 'tri', 'col', 'file', 'phr')}
        self.index = defaultdict(list)
        for li, s in enumerate(doc['sets']):
            for d in s: self.index[d].append(li)
        self.maxphr = doc['thresholds']['phrMaxTokens']

    def _set_hit(self, ws):
        per = defaultdict(set)
        for w in set(ws):
            for li in self.index.get(self.H.d('word', w), ()): per[li].add(w)
        top = max((len(v) for v in per.values()), default=0)
        if top < SET_MIN: return None
        return min((v for v in per.values() if len(v) == top), key=lambda v: ' '.join(sorted(v)))

    def scan_text(self, text):
        hits = []
        lines = text.split('\n')
        # tokens with their lines
        tl = []
        for n, l in enumerate(lines):
            for t in toks(l): tl.append((t, n + 1))
        tt = [t for t, _ in tl]
        for t, n in tl:
            if self.H.d('tok', t) in self.sets['tok']: hits.append(('TOK', t, n))
        for n, l in enumerate(lines):
            for m in IDENT_RUN.finditer(strip_marks(l)):
                parts = m.group(0).split('.')
                for i in range(len(parts)):
                    for j in range(i + 1, len(parts) + 1):
                        s = '.'.join(parts[i:j])
                        if s and (s[0].isalpha() or s[0] == '_') and self.H.d('id', s) in self.sets['id']: hits.append(('ID', s, n + 1))
            for m in DOC_COLOUR.finditer(l):
                v = m.group(1).lower()
                if self.H.d('col', v) in self.sets['col']: hits.append(('COL', '#' + v, n + 1))
            best = self._set_hit(re.findall(r'[a-z]+', norm(l)))
            if best: hits.append(('SET', ' '.join(sorted(best)), n + 1))
        # tables: one column at a time (J-S36)
        fence = False; block = []
        def flush():
            if len(block) >= 3:
                rows = [(n, [c for c in re.split(r'(?<!\\)\|', s)[1:-1]]) for n, s in block]
                rows = [(n, r) for n, r in rows if not all(re.fullmatch(r'\s*:?-{3,}:?\s*', c) for c in r)]
                ncol = max((len(r) for _, r in rows), default=0)
                for j in range(ncol):
                    # a column is read as a list: its cells that are one word each (markup and punctuation dropped)
                    ws = []
                    for _, r in rows:
                        if j < len(r):
                            cell = re.findall(r'[a-z]+', norm(r[j]))
                            if len(cell) == 1: ws += cell
                    best = self._set_hit(ws)
                    if best: hits.append(('SET', ' '.join(sorted(best)), block[0][0]))
            block.clear()
        for n, l in enumerate(lines):
            if l.lstrip().startswith('```'): fence = not fence; flush(); continue
            s = l.rstrip()
            if not fence and s.startswith('|'): block.append((n + 1, s))
            else: flush()
        flush()
        # 3-gram runs (C3's rule)
        g = list(zip(tt, tt[1:], tt[2:])); run = []
        for k, gg in enumerate(g + [None]):
            if gg is not None and self.H.d('tri', ' '.join(gg)) in self.sets['tri']: run.append(k)
            else:
                if len(run) >= TRI_RUN: hits.append(('TRI', ' '.join(tt[run[0]:run[-1] + 3]), tl[run[0]][1]))
                run = []
        # names
        for k in range(len(tt)):
            for L in range(2, self.maxphr + 1):
                if k + L > len(tt): break
                if self.H.d('phr', ' '.join(tt[k:k + L])) in self.sets['phr']: hits.append(('PHR', ' '.join(tt[k:k + L]), tl[k][1]))
        return hits

    def scan_file(self, path):
        hits = []
        if self.H.file(path) in self.sets['file']: hits.append(('FILE', os.path.basename(path), 0))
        try: text = open(path, encoding='utf-8').read()
        except (UnicodeDecodeError, OSError): return hits
        return hits + self.scan_text(text)

CARRY = {'C1': 'ID', 'C2': 'COL', 'C3': 'TRI', 'C4': 'SET'}
class Allow:
    """Reviewed rows: doc_checks' rows carried (C1 → ID, C2 → COL, C3 → TRI, C4 → SET), and this list's own rows."""
    def __init__(self, paths):
        self.exact = set(); self.tri = []; self.sets = []
        for p in paths:
            if not os.path.exists(p): continue
            for ln in open(p, encoding='utf-8'):
                if not ln.strip() or ln.startswith('#'): continue
                parts = ln.rstrip('\n').split('\t')
                if len(parts) < 3 or not parts[2].strip(): continue
                c = CARRY.get(parts[0], parts[0]); t = parts[1]
                self.exact.add((c, t))
                if c == 'TRI': self.tri.append(' ' + t + ' ')
                if c == 'SET': self.sets.append(set(t.split()))
        self.trijoined = '\x00'.join(self.tri)
    def reviewed(self, h):
        c, t = h[0], h[1]
        if (c, t) in self.exact: return True
        if c == 'TRI' and (' ' + t + ' ') in self.trijoined: return True      # a sub-run of a reviewed run
        if c == 'SET':
            ws = set(t.split())
            if any(ws <= s for s in self.sets): return True                     # a subset of a reviewed word set
        return False

def scan(a):
    DL = DenyList(); AL = Allow(a.allow)
    total = Counter(); un = Counter(); rows = []
    for p in a.files:
        hs = DL.scan_file(p)
        for h in hs:
            total[h[0]] += 1
            if not AL.reviewed(h):
                un[h[0]] += 1; rows.append((p, h))
    for c in ('TOK', 'ID', 'TRI', 'COL', 'SET', 'PHR', 'FILE'): print(f'{c}: {total[c]} hits, {un[c]} unreviewed')
    seen = set()
    for p, h in rows:
        key = (h[0], h[1])
        if a.show or key not in seen: print('UNREVIEWED', h[0], '|', h[1], '|', f'{p} l. {h[2]}')
        seen.add(key)
    return 1 if rows else 0

# ---------------------------------------------------------------- the self-test (W-16's checker column)
def selftest(a):
    DL = DenyList(); C = Corpus(); C.read(None); R = {}
    def hit_kinds(text): return {h[0] for h in DL.scan_text(text)}
    # (1) every C1 identifier
    miss = [i for i in C.c1 if not any(h[0] == 'ID' and h[1] == i for h in DL.scan_text('x ' + i + ' y'))]
    R['c1'] = {'identifiers': len(C.c1), 'hit': len(C.c1) - len(miss), 'missed': len(miss)}
    # (2) every corpus colour (as written as a colour), and how many bare six-hex runs the literal rule leaves out
    miss = [c for c in sorted(C.col) if 'COL' not in hit_kinds('#' + c)]
    R['colours'] = {'values': len(C.col), 'hit': len(C.col) - len(miss), 'missed': len(miss),
                    'bare_runs_not_listed': len(C.bare6 - C.col - NOT_COLOURS), 'excluded_black_white': len(NOT_COLOURS)}
    # (3) every check-(vi) list of the in-scope corpus that holds >= 5 indexable words (C4's index: whole members
    #     of >= 4 letters); every other list the build kept, by its words
    c4 = [sorted(w for w in fs if re.fullmatch(r'[a-z]{4,}', w)) for fs in C.c4_lists]
    c4h = [ws for ws in c4 if len(ws) >= SET_MIN]
    miss = [ws for ws in c4h if 'SET' not in hit_kinds(' '.join(ws))]
    R['c4_lists'] = {'lists': len(C.c4_lists), 'with_five_indexable_words': len(c4h), 'hit': len(c4h) - len(miss), 'missed': len(miss),
                     'under_five_never_a_c4_hit': len(c4) - len(c4h)}
    allw = [list_words(fs) for fs in C.lists]
    allw = [ws for ws in allw if len(ws) >= SET_MIN]
    miss = [ws for ws in allw if 'SET' not in hit_kinds(' '.join(ws))]
    R['all_lists'] = {'lists_with_five_words': len(allw), 'hit': len(allw) - len(miss), 'missed': len(miss)}
    # (4) every token and identifier candidate, every file, a sample of 3-grams
    miss = [t for t in C.tok if 'TOK' not in hit_kinds(t)]
    R['tokens'] = {'tokens': len(C.tok), 'hit': len(C.tok) - len(miss), 'missed': len(miss)}
    miss = [i for i in C.ident if 'ID' not in hit_kinds('x ' + i + ' y')]
    R['identifiers'] = {'identifiers': len(C.ident), 'hit': len(C.ident) - len(miss), 'missed': len(miss)}
    miss = [f for f in C.files if DL.H.file(f) not in DL.sets['file']]
    R['files'] = {'files': len(C.files), 'hit': len(C.files) - len(miss), 'missed': len(miss)}
    tri = sorted(C.tri); step = max(1, len(tri) // 2000)
    miss = [g for g in tri[::step] if DL.H.d('tri', ' '.join(g)) not in DL.sets['tri']]
    R['trigrams_sampled'] = {'sampled': len(tri[::step]), 'of': len(tri), 'missed': len(miss)}
    # (5) planted leaks in a scratch copy of a design file: a five-token corpus run, an alphabetised list, a colour
    import random
    rnd = random.Random(20261003)
    base = open('docs/volumes/INDEX.md', encoding='utf-8').read()
    planted = {'TRI': 0, 'SET': 0, 'COL': 0}; trials = 20
    jtok = []
    for f in sorted(glob.glob('research/findings/*.md')):
        t = toks(open(f, encoding='utf-8').read())
        if len(t) > 50: jtok.append(t)
    ref = Counter(h[0] for h in DL.scan_text(base))
    for _ in range(trials):
        t = rnd.choice(jtok); k = rnd.randrange(0, len(t) - 6)
        hs = Counter(h[0] for h in DL.scan_text(base + '\nplanted ' + ' '.join(t[k:k + 6]) + ' planted\n'))
        if hs['TRI'] > ref['TRI']: planted['TRI'] += 1
        ws = rnd.choice(c4h); hs = Counter(h[0] for h in DL.scan_text(base + '\n' + ' '.join(sorted(ws, reverse=True)[:SET_MIN]) + '\n'))
        if hs['SET'] > ref['SET']: planted['SET'] += 1
        c = rnd.choice(sorted(C.col)); hs = Counter(h[0] for h in DL.scan_text(base + '\nfill #' + c.upper() + ';\n'))
        if hs['COL'] > ref['COL']: planted['COL'] += 1
    R['planted'] = {'trials_each': trials, **planted}
    # (6) the design set: 0 unreviewed hits with doc_checks' reviewed rows carried
    AL = Allow([DOC_ALLOW, DESIGN_ALLOW]); per = {}; unrev = []
    for p in DESIGN_SET:
        tot = Counter(); un = Counter()
        for h in DL.scan_file(p):
            tot[h[0]] += 1
            if not AL.reviewed(h): un[h[0]] += 1; unrev.append((p, h))
        per[p] = {c: [tot[c], un[c]] for c in ('TOK', 'ID', 'TRI', 'COL', 'SET', 'PHR', 'FILE')}
    R['design_set'] = per
    R['design_unreviewed_total'] = len(unrev)
    R['design_unreviewed_distinct'] = len({(h[0], h[1]) for _, h in unrev})
    R['salt_matches_file'] = DL.doc['salt'] == open(SALT_PATH).read().strip()
    # (7) the reference maps' names (needs the transcription, held outside the project)
    if a.refmap_names:
        names = [l.rstrip('\n').split('\t', 1) for l in open(a.refmap_names, encoding='utf-8') if l.strip() and not l.startswith('#')]
        direct = [n for _, n in names if {'TOK', 'PHR'} & hit_kinds('x ' + n + ' y')]
        set_only = [n for _, n in names if n not in direct and re.fullmatch(r'[a-z]{%d,}' % WORD_MIN, norm(n))]
        R['refmap_names'] = {'names': len(names), 'direct_hit': len(direct), 'single_dictionary_word_in_map_set_only': len(set_only),
                             'neither': len(names) - len(direct) - len(set_only)}
        mp_words = defaultdict(list)
        for mp, n in names:
            if n in set_only or re.fullmatch(r'[a-z]{%d,}' % WORD_MIN, norm(n)): mp_words[mp].append(norm(n))
        R['refmap_sets'] = {mp: ('SET' in hit_kinds(' '.join(ws))) for mp, ws in mp_words.items() if len(set(ws)) >= SET_MIN}
    ok = (R['c1']['missed'] == 0 and R['colours']['missed'] == 0 and R['c4_lists']['missed'] == 0 and R['all_lists']['missed'] == 0
          and R['tokens']['missed'] == 0 and R['identifiers']['missed'] == 0 and R['files']['missed'] == 0
          and R['trigrams_sampled']['missed'] == 0 and R['design_unreviewed_total'] == 0 and R['salt_matches_file']
          and all(v == trials for v in planted.values())
          and R.get('refmap_names', {}).get('neither', 0) == 0 and all(R.get('refmap_sets', {}).values()))
    R['pass'] = ok
    print(json.dumps(R, indent=1))
    if a.report: open(a.report, 'w').write(json.dumps(R, indent=1) + '\n')
    if a.unreviewed:
        with open(a.unreviewed, 'w', encoding='utf-8') as fh:
            for p, h in unrev: fh.write(f'{h[0]}\t{h[1]}\t{p} l. {h[2]}\n')
    return 0 if ok else 1

if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    sp = ap.add_subparsers(dest='cmd', required=True)
    b = sp.add_parser('build'); b.add_argument('--refmap-names'); b.add_argument('--record'); b.add_argument('--date', default=__import__('datetime').date.today().isoformat())
    s = sp.add_parser('scan'); s.add_argument('files', nargs='+'); s.add_argument('--allow', nargs='*', default=[DOC_ALLOW, DESIGN_ALLOW]); s.add_argument('--show', action='store_true')
    t = sp.add_parser('selftest'); t.add_argument('--report'); t.add_argument('--unreviewed'); t.add_argument('--refmap-names')
    a = ap.parse_args()
    sys.exit({'build': build, 'scan': scan, 'selftest': selftest}[a.cmd](a) or 0)
