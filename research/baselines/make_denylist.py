#!/usr/bin/env python3
"""make_denylist.py — the hashed content deny-list of docs/ARCHITECTURE.md §17.1 (5) (M-1 items W-16, W-16b; research side only).

  python3 research/baselines/make_denylist.py build [--format research|m0] [--refmap-names FILE] [--record JSON]
                                                    [--date ISO|now] [--as-of ISO|now]
  python3 research/baselines/make_denylist.py scan FILE... [--list research|m0|PATH] [--allow TSV ...] [--show]
  python3 research/baselines/make_denylist.py selftest [--lists research,m0] [--report JSON] [--unreviewed TSV]
                                                       [--refmap-names FILE]

Run from the project root; stdlib only (Python 3.9). Written by lane m1/W-16 (Opus, 2026-10-03); extended by lane m1/W-16b
(Opus, 2026-10-04: M0's format, normalisation 1 for both lists, doc_checks.py's corpus rules read from doc_checks.py itself).
Its record is docs/calibration/E16-denylist.md (W-16b: section 9).

What it builds. research/baselines/denylist/denylist.v1.json.gz (the research list) and, with --format m0, beside it
research/baselines/denylist/denylist.json (the crossing candidate in M0's format, plan §7c, R-17, attachment C of
docs/calibration/handoff-M0.md) and generation-record.json (the CLEAN-ROOM.md §4 G-row's cells: date, opaque source labels,
counts). Both lists come from ONE read of the corpus, so their shared classes digest the same items. Salted digests only,
never a token. The corpus is the clean-room re-check's (every source of doc_checks.py's C1–C4) plus that record's two blind
spots (the capture bodies with unquoted keys; the reference prose C3 never reads), the image and texture bytes, the Foundry
module's message and field names, the provenance table's class citations (research/findings/code-impact.md §(d)), and the
reference maps' names (transcribed by the research seat, held outside the project; digests only).
The corpus rule is doc_checks.py's, read from doc_checks.py's own source at run time (never repeated here): its OWN_TREES
(research/sf/, research/baselines/) and its M-1 capture records (README, facts, plan, check, index and probe files of a
capture folder dated on or after M1_FIRST_CAPTURE_DAY, outside the recordings) leave the corpus (R-30); an M-1 folder's
stats.json is read for its string values only, its keys forming no 3-gram, no list and no token (R-38).

Normalisation 1 (C-0101; attachment C; both lists, R-17: "the research twin's [a-z0-9_] is changed to match"): Unicode NFKD,
every code point of general category M removed, Unicode default lower-casing; a token is a maximal run of code points of
general categories L and N (an underscore splits); a 3-gram item is three consecutive tokens joined by one U+0020; a
word (the list class) is a maximal run of category L, members of four or more letters.
Digests. Research list: hex(SHA-256(salt ‖ tag ‖ 0x1F ‖ payload))[:16], payload UTF-8 (a file's raw bytes for tag `file`).
M0 list: hex(SHA-256(salt ‖ item))[:16] (attachment C: the salt's 32 bytes, the item's UTF-8 bytes or a file's raw bytes;
the header's digestHexDigits names the truncation). The salt is 32 random bytes generated once (salt.hex) and never
regenerated while a list exists.
Classes (research tag / M0 field — what is digested — how the scanner hits):
  tok  / tokens    single tokens not in the spell list (below) — an equal token (M0: and its digest not in `spell`)
  id   / —         case-kept identifiers (doc_checks.py's C1 names, the Foundry field names, the provenance table's class
                   citations) — any identifier run [A-Za-z0-9_]+(.[A-Za-z0-9_]+)* whose dotted sub-sequence equals one
                   (C1's whole-word, case-sensitive rule); research list only (R-17: version 2 would add it)
  tri  / trigrams  token 3-grams in list order — a run of >= 3 consecutive listed 3-grams (C3's rule, §17.1 (2) (iii),
                   which the hashed scan replaces)
  col  / colours   six-digit colour values written as colours in the corpus — a #rrggbb / 0xrrggbb literal
  file / files     file bytes — an identical file
  phr  / —         multi-token reference-map names (2 to the longest name's length) — the same token sequence; research only
  word / lists     per list, its one-word members of >= 4 letters (check (vi)'s index) — >= 5 distinct words of one list on
                   one line, or among the one-word cells of one table column (C4's rule and J-S36)
  —    / spell     the spell-check exclusion set (web2's words as normalised tokens, plus the supplement)
Spell list (tok only): /usr/share/dict/words (Webster's 2nd, web2), with English inflections and British spellings
reduced to it, plus research/baselines/denylist/spell-supplement.txt (our own list of modern, technical and generic words
and the references' own names, which §17.1 (6)'s provenance cites).
The tokens of the corpus are held in memory only while the script runs; nothing but digests and counts is written.
"""
import argparse, ast, datetime, glob, gzip, hashlib, html, io, json, os, re, secrets, shutil, subprocess, sys, tempfile, unicodedata
from collections import Counter, defaultdict

ROOT_OUT = 'research/baselines/denylist'
LIST_PATH = ROOT_OUT + '/denylist.v1.json.gz'
M0_PATH = ROOT_OUT + '/denylist.json'
GEN_RECORD = ROOT_OUT + '/generation-record.json'
SALT_PATH = ROOT_OUT + '/salt.hex'
SUPPLEMENT = ROOT_OUT + '/spell-supplement.txt'
REFMAP_DIGESTS = ROOT_OUT + '/refmap-names.digests'
DESIGN_ALLOW = ROOT_OUT + '/design-allow.tsv'
DOC_ALLOW = 'docs/validation/doc-checks-allow.tsv'
DOC_CHECKS = 'docs/validation/bench/doc_checks.py'
DICT = '/usr/share/dict/words'
FORMAT = 'plat.denylist/1'             # the research list's own format id (gzipped, tagged digests, seven classes)
M0_SCHEMA = 'plat.denylist/1'          # M0's schema constant (attachment C); the two are told apart by the key: format / schema
NORMALISATION_VERSION = 1
DIGEST_HEX = 16
# The corpus cut: W-16's list read the clean-room record's corpus (07:25 EDT on 2026-10-03); W-16b's exit list is built
# with --as-of now. A list states its cut, and its self-test re-reads the corpus at that cut.
CUT_DEFAULT = '2026-10-03T07:25:59-04:00'
TRI_RUN, SET_MIN, WORD_MIN, PHR_MAX = 3, 5, 4, 8
NOT_COLOURS = {'000000', 'ffffff'}           # black and white: not creative content (recorded in E16)
IMAGE_EXT = {'png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'ico', 'svg', 'tif', 'tiff', 'avif'}
CODE_EXT = {'js', 'mjs', 'cjs', 'wasm'}      # program bundles: never opened (the M-1 brief; §17.1 (1))
FONT_MAGIC = (b'wOFF', b'wOF2', b'\x00\x01\x00\x00', b'OTTO', b'true', b'ttcf')
CODE_MAGIC = (b'\x00asm',)
DESIGN_SET = ['docs/ARCHITECTURE.md'] + sorted(glob.glob('docs/volumes/V*.md')) + ['docs/volumes/INDEX.md', 'docs/volumes/SUMMARY.md']
PROSE_PATTERNS = ('research/devlogs/**/*.md', 'research/ftg-docs/**/*.md', 'research/patreon/**/*.md',
                  'research/external/**/*.txt', 'research/external/**/*.html')
C2_EXT = ('md', 'txt', 'json', 'js', 'ts', 'tsv', 'csv', 'html', 'htm', 'svg', 'css', 'log', 'hx', 'xml', 'yaml', 'yml')
SNAKE = re.compile(r'[A-Za-z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)+')
COLOUR_LIT = re.compile(rb'(?:#|0[xX])([0-9a-fA-F]{6})(?![0-9a-fA-F])')
COLOUR_QUOTED = re.compile(rb'["\']([0-9a-fA-F]{6})["\']')
DOC_COLOUR = re.compile(r'(?:#|0x)([0-9a-fA-F]{6})(?![0-9a-fA-F])')
IDENT_RUN = re.compile(r'[A-Za-z0-9_]+(?:\.[A-Za-z0-9_]+)*')
# opaque source labels for the CLEAN-ROOM.md §4 G-row (implementer seats read the row; E16 §9 maps each label research-side)
SOURCE_LABELS = ['S01 research findings', 'S02 structured capture records', 'S03 leniently parsed capture bodies',
                 'S04 reference prose', 'S05 module field names', 'S06 provenance citations', 'S07 image and body bytes',
                 'S08 study-map names (transcribed research-side)', 'S09 spell exclusion (web2 and our supplement)']

# ---------------------------------------------------------------- normalisation 1 (C-0101; attachment C)
def _category_class(firsts):
    """A regex character class body holding every code point whose general category starts with one of `firsts`."""
    out, start = [], None
    for cp in range(0x110000):
        hit = unicodedata.category(chr(cp))[0] in firsts
        if hit and start is None: start = cp
        elif not hit and start is not None: out.append((start, cp - 1)); start = None
    if start is not None: out.append((start, 0x10FFFF))
    esc = lambda c: '\\U%08x' % c
    return ''.join(esc(a) if a == b else esc(a) + '-' + esc(b) for a, b in out)
MARKS = re.compile('[' + _category_class('M') + ']+')
TOKEN = re.compile('[' + _category_class('LN') + ']+')
LETTERS = re.compile('[' + _category_class('L') + ']+')
def strip_marks(s): return MARKS.sub('', unicodedata.normalize('NFKD', s))
def norm(s): return strip_marks(s).lower()
def toks(s): return TOKEN.findall(norm(s))
def letter_words(s): return LETTERS.findall(norm(s))
def is_word(w): return len(w) >= WORD_MIN and LETTERS.fullmatch(w) is not None
def list_words(fs):
    """A list's indexed words, as check (vi) indexes them: each member that is one word of four or more letters
    (a member of several words is not split — the 3-gram and token classes carry those)."""
    return sorted({norm(m) for m in fs if is_word(norm(m))})

# ---------------------------------------------------------------- doc_checks.py's corpus rule, read from its own source
_RULE_NAMES = ('OWN_TREES', 'M1_FIRST_CAPTURE_DAY', 'OWN_RECORD', 'VALUES_ONLY', 'RECORDING', 'PROFILER', 'member')
def doc_checks_rules(path=DOC_CHECKS):
    """The corpus rule's constants and m1_capture_record(), compiled from doc_checks.py's own statements, so the two
    checkers read one corpus (R-38: "make_denylist.py's rebuild at the exit adopts the same two rules")."""
    tree = ast.parse(open(path, encoding='utf-8').read(), path)
    keep = []
    for node in tree.body:
        if isinstance(node, ast.Assign) and any(isinstance(t, ast.Name) and t.id in _RULE_NAMES for t in node.targets): keep.append(node)
        elif isinstance(node, ast.FunctionDef) and node.name == 'm1_capture_record': keep.append(node)
    ns = {'re': re, 'os': os}
    exec(compile(ast.Module(body=keep, type_ignores=[]), path, 'exec'), ns)
    missing = [n for n in _RULE_NAMES + ('m1_capture_record',) if n not in ns]
    if missing: sys.exit(f'refusing: {path} no longer defines {missing} — the corpus rule cannot be read')
    return ns
RULES = doc_checks_rules()
PROFILER = RULES['PROFILER']; MEMBER = RULES['member']; EXCLUDE = RULES['OWN_TREES']
def own_output(p):
    """doc_checks.reference()'s negation: our own outputs, which leave the corpus (R-30)."""
    p = p.replace(os.sep, '/')
    return p.startswith(RULES['OWN_TREES']) or bool(RULES['m1_capture_record'](p) and RULES['OWN_RECORD'].search(p))
def values_only(p):
    """doc_checks.values_only(): an M-1 folder's stats.json, read for its string values only (R-38)."""
    p = p.replace(os.sep, '/')
    return bool(RULES['m1_capture_record'](p) and RULES['VALUES_ONLY'].search(p))

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
        _D = set()
        for w in open(DICT, encoding='utf-8', errors='replace'): _D.update(toks(w))      # web2's words as normalised tokens
        _SUP = set()
        if os.path.exists(SUPPLEMENT):
            for l in open(SUPPLEMENT, encoding='utf-8'): _SUP.update(toks(l.split('#', 1)[0]))
def spell_items():
    """The spell class of M0's list (plan §7c: web2 plus the supplement), as normalised tokens."""
    _load_spell(); return _D | _SUP
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
    """A token worth a digest: 3 to 40 letters (no digit), not ordinary vocabulary."""
    return 3 <= len(t) <= 40 and LETTERS.fullmatch(t) is not None and not known(t)
def carriable_m0(text):
    """True when M0's version-1 classes can catch the text on its own: one of its tokens is a token candidate, or it is
    long enough for a 3-gram run (five tokens). Otherwise only the research list's id / phr classes hold it (R-17)."""
    t = toks(text)
    return any(tok_candidate(x) for x in t) or len(t) >= TRI_RUN + 2

# ---------------------------------------------------------------- digests
class Hasher:
    def __init__(self, salt_hex, hexdigits=DIGEST_HEX, memo=True):
        self.salt = bytes.fromhex(salt_hex); self.k = hexdigits; self.memo = {}; self.memo0 = {}; self.memo_on = memo
    def d(self, tag, payload):
        """The research list's tagged digest."""
        k = (tag, payload)
        v = self.memo.get(k)
        if v is None:
            b = payload.encode('utf-8') if isinstance(payload, str) else payload
            v = hashlib.sha256(self.salt + tag.encode() + b'\x1f' + b).hexdigest()[:16]
            if self.memo_on:
                self.memo[k] = v
                if len(self.memo) > 4000000: self.memo.clear()
        return v
    def d0(self, item):
        """M0's digest (attachment C): SHA-256 over the salt's 32 bytes then the item's bytes, first k hex digits."""
        v = self.memo0.get(item)
        if v is None:
            b = item.encode('utf-8') if isinstance(item, str) else item
            v = hashlib.sha256(self.salt + b).hexdigest()[:self.k]
            if self.memo_on:
                self.memo0[item] = v
                if len(self.memo0) > 4000000: self.memo0.clear()
        return v
    def _file(self, path, prefix):
        h = hashlib.sha256(prefix)
        with open(path, 'rb') as fh:
            for chunk in iter(lambda: fh.read(1 << 20), b''): h.update(chunk)
        return h.hexdigest()
    def file(self, path): return self._file(path, self.salt + b'file\x1f')[:16]
    def file0(self, path): return self._file(path, self.salt)[:self.k]

def get_salt(create):
    if os.path.exists(SALT_PATH):
        s = open(SALT_PATH).read().strip()
        assert re.fullmatch(r'[0-9a-f]{64}', s), 'salt.hex is malformed'
        return s
    if os.path.exists(LIST_PATH) or os.path.exists(M0_PATH):
        sys.exit('refusing: a list exists but salt.hex is missing — the salt is generated once and kept with the list')
    if not create: sys.exit('no salt yet: run build first')
    s = secrets.token_hex(32)
    os.makedirs(ROOT_OUT, exist_ok=True)
    open(SALT_PATH, 'w').write(s + '\n')
    return s

# ---------------------------------------------------------------- the corpus, read as doc_checks.py reads it
def stamp(v):
    if v == 'now': return datetime.datetime.now().astimezone().replace(microsecond=0).isoformat()
    t = datetime.datetime.fromisoformat(v)
    if t.tzinfo is None: t = t.astimezone()
    return t.isoformat()
def cut_epoch(v): return datetime.datetime.fromisoformat(v).timestamp()
def lenient_json(raw):
    t = re.sub(r'([{,]\s*)([A-Za-z_]\w*)\s*:', r'\1"\2":', raw); t = re.sub(r',(\s*[}\]])', r'\1', t)
    return json.loads(t)

class Corpus:
    """Collects the plaintext sets in memory (never written): the C3 3-grams, the C4 lists, the token and identifier
    candidates, the colour values, the files to digest, the names — each with per-source counts for the record."""
    def __init__(self, cut):
        self.cut = cut; self.cut_t = cut_epoch(cut); self.after = Counter()
        self.tri = set(); self.lists = {}; self.tok = set(); self.ident = set(); self.col = set(); self.phr = set()
        self.files = []; self.counts = Counter(); self.c1 = []; self.c4_lists = set(); self.bare6 = set()
        self.list_src = Counter(); self.own_left_out = set(); self.own_values_only = set(); self.chars = set()

    def _text(self, s):
        if not s.isascii(): self.chars.update(c for c in s if ord(c) > 127)
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
    def walk_json(self, d, want_lists, src, want_keys=True):
        """doc_checks.py's walk: document-order tokens of keys and string values (purely numeric tokens dropped), a
        dict's keys as a list, an array of strings, one field's values across records; want_keys False (R-38) keeps
        the keys out of the stream, the lists and the token candidates."""
        stream = []
        def snake(s):
            # an identifier-shaped string (snake case) is a token source: its tokens (the underscore splits) that are
            # not ordinary vocabulary
            if isinstance(s, str) and len(s) <= 50 and SNAKE.fullmatch(s):
                for t in toks(s):
                    if tok_candidate(t): self.tok.add(t)
        def walk(x):
            if isinstance(x, str):
                self._text(x)
                stream.extend(t for t in toks(x) if not t.isdigit())
                if want_lists: snake(x)
            elif isinstance(x, dict):
                for k, v in x.items():
                    if want_keys:
                        self._text(k)
                        stream.extend(t for t in toks(k) if not t.isdigit())
                        if want_lists: snake(k)
                    walk(v)
                if want_lists:
                    if want_keys: self._add_list(list(x.keys()), src)
                    self._records(list(x.values()), src)
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

    def ok(self, f):
        """In the corpus: inside research/ or captures/, reference material by doc_checks.py's rule (R-30), and not
        modified after the cut."""
        if own_output(f): self.own_left_out.add(f.replace(os.sep, '/')); return False
        try: t = os.path.getmtime(f)
        except OSError: return False
        if t > self.cut_t:
            self.after['/'.join(f.split('/')[:3])] += 1
            return False
        return True

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
        # (4) the JSON corpus (C3 and C4), research/ and captures/, by doc_checks.py's corpus rule
        jf_all = sorted(set(glob.glob('research/**/*.json', recursive=True) + glob.glob('captures/**/*.json', recursive=True)))
        jf = [f for f in jf_all if self.ok(f)]
        self.counts['json_files_all'] = len(jf_all); self.counts['json_files_in_scope'] = len(jf)
        self.counts['json_files_own_outputs'] = sum(1 for f in jf_all if own_output(f))
        self.counts['json_files_after_cut'] = len(jf_all) - len(jf) - self.counts['json_files_own_outputs']
        unread = []
        for f in jf:
            try: d = json.load(open(f, encoding='utf-8', errors='replace'))
            except (OSError, ValueError): unread.append(f); continue
            vo = values_only(f)
            if vo: self.own_values_only.add(f.replace(os.sep, '/'))
            self.walk_json(d, not PROFILER.search(f), 'json', want_keys=not vo)
        self.counts['json_unparsed'] = len(unread)
        self.counts['json_values_only'] = len(self.own_values_only)
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
        fm = sorted(f for f in glob.glob('research/findings/*.md') if self.ok(f))
        self.counts['findings_md'] = len(fm); n = 0
        for f in fm:
            txt = open(f, encoding='utf-8', errors='replace').read(); self._text(txt)
            t = toks(txt); self.tri.update(zip(t, t[1:], t[2:]))
            for arr in re.findall(r'\[\s*((?:"[^"\n]{1,60}"|\'[^\'\n]{1,60}\')(?:\s*,\s*(?:"[^"\n]{1,60}"|\'[^\'\n]{1,60}\')){2,})\s*\]', txt):
                self._add_list([x[1:-1] for x in re.findall(r'"[^"\n]*"|\'[^\'\n]*\'', arr)], 'findings'); n += 1
        self.counts['findings_quoted_arrays'] = n
        # (7) blind spot 2: the reference prose (C3's rule, digits kept; HTML without its tags)
        pf = sorted(set(f for p in PROSE_PATTERNS for f in glob.glob(p, recursive=True) if self.ok(f)))
        self.counts['prose_files'] = len(pf)
        for f in pf:
            t = open(f, encoding='utf-8', errors='replace').read()
            if f.endswith('.html'): t = html.unescape(re.sub(r'<script.*?</script>|<style.*?</style>|<[^>]+>', ' ', t, flags=re.S))
            self._text(t)
            tt = toks(t); self.tri.update(zip(tt, tt[1:], tt[2:]))
        # (8) colours: doc_checks.py's C2 files (reference material) plus captures' SVG, read for values written as colours
        cf = [f for f in glob.glob('research/**/*', recursive=True) if os.path.isfile(f) and f.rsplit('.', 1)[-1].lower() in C2_EXT]
        cf += glob.glob('captures/**/README*.md', recursive=True) + glob.glob('captures/**/*.json', recursive=True)
        dc_files = list(dict.fromkeys(cf))                           # doc_checks.py's three corpus globs, for the parity count
        self.counts['doc_checks_own_outputs_left_out'] = sum(1 for f in dc_files if own_output(f))
        cf += glob.glob('docs/confidence/**/*', recursive=True) + glob.glob('docs/improvements/**/*', recursive=True)
        cf += ['docs/CONFIDENCE.md', 'docs/IMPROVEMENTS.md'] + glob.glob('captures/**/*.svg', recursive=True)
        cf = [f for f in dict.fromkeys(cf) if os.path.isfile(f) and f.rsplit('.', 1)[-1].lower() not in CODE_EXT
              and (not f.startswith(('research/', 'captures/')) or self.ok(f))]
        self.counts['colour_files'] = len(cf)
        for f in cf:
            try: self.colours_from_bytes(open(f, 'rb').read())
            except OSError: pass
        self.col -= NOT_COLOURS
        # (9) file bytes: every image and texture of research/ and captures/, and every captured body but code and fonts
        ff = []
        for base in ('research', 'captures'):
            for f in glob.glob(base + '/**/*', recursive=True):
                if not os.path.isfile(f) or not self.ok(f): continue
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
        self.counts['own_outputs_left_out_all_sources'] = len(self.own_left_out)
        self.counts['corpus_cut'] = self.cut
        self.counts['files_after_cut_by_folder'] = dict(self.after)

def items(C):
    """The plaintext items of every class, from one corpus read; both lists digest exactly these."""
    I = {'tok': set(C.tok), 'tri': set(C.tri), 'col': set(C.col), 'id': set(C.ident), 'phr': set(), 'files': list(C.files)}
    lists = set(); dropped = 0
    for fs in C.lists:
        ws = tuple(list_words(fs))
        if len(ws) < SET_MIN: dropped += 1; continue
        lists.add(ws)
    phrmax = 2; per_map = defaultdict(set); I['refmap_counts'] = Counter()
    for mp, name in (C.refmap or []):
        t = toks(name); I['refmap_counts']['names_' + mp] += 1
        I['tok'].update(x for x in t if tok_candidate(x))
        if 2 <= len(t) <= PHR_MAX: I['phr'].add(' '.join(t)); phrmax = max(phrmax, len(t))
        I['tri'].update(zip(t, t[1:], t[2:]))
        if is_word(norm(name)): per_map[mp].add(norm(name))                  # check (vi)'s index rule
    for mp, ws in per_map.items():
        if len(ws) >= SET_MIN: lists.add(tuple(sorted(ws)))
    I['lists'] = lists; I['lists_dropped'] = dropped; I['phrmax'] = phrmax; I['per_map'] = per_map
    return I

def _gz_json(doc):
    buf = io.BytesIO()
    with gzip.GzipFile(fileobj=buf, mode='wb', mtime=0, compresslevel=9, filename='') as gz:
        gz.write(json.dumps(doc, separators=(',', ':'), sort_keys=True).encode('utf-8'))
    return buf.getvalue()

def build(a):
    salt = get_salt(create=True); H = Hasher(salt, memo=False)   # bulk digests: every item once, no memo
    if a.format == 'm0' and not a.refmap_names:
        sys.exit('refusing: --format m0 needs --refmap-names (the M0 list digests the names from their plaintext, which '
                 'is held outside the project; the research-side digests file cannot be re-digested)')
    built = stamp(a.date)
    C = Corpus(stamp(a.as_of)); C.read(a.refmap_names)
    I = items(C)
    # -- the research list
    out = {'tok': {H.d('tok', t) for t in I['tok']}, 'id': {H.d('id', i) for i in I['id']},
           'tri': {H.d('tri', ' '.join(g)) for g in I['tri']}, 'col': {H.d('col', c) for c in I['col']},
           'file': {H.file(f) for f in I['files']}, 'phr': {H.d('phr', p) for p in I['phr']}}
    sets = {tuple(sorted(H.d('word', w) for w in ws)) for ws in I['lists']}
    rm = Counter(); phrmax = I['phrmax']
    if C.refmap is not None:
        # rewrite the persistent research-side digests file from the transcription (digests and counts only)
        rows = set()
        for mp, name in C.refmap:
            t = toks(name)
            rows |= {('tok', mp, H.d('tok', x)) for x in t if tok_candidate(x)}
            if 2 <= len(t) <= PHR_MAX: rows.add(('phr', mp, H.d('phr', ' '.join(t))))
            rows |= {('tri', mp, H.d('tri', ' '.join(g))) for g in zip(t, t[1:], t[2:])}
        for mp, ws in sorted(I['per_map'].items()):
            rows |= {('word', mp, H.d('word', w)) for w in ws}
        with open(REFMAP_DIGESTS, 'w') as fh:
            fh.write('# reference-map names, transcribed by a research seat (lane m1/W-16, 2026-10-03; re-digested under normalisation 1 by lane m1/W-16b, 2026-10-04): salted digests only\n')
            fh.write('# class\tmap\tdigest (meta rows: the longest name in tokens and the name count per map)\n')
            fh.write(f'meta\tphrmax\t{phrmax}\n')
            for mp, n in sorted(Counter(mp for mp, _ in C.refmap).items()): fh.write(f'meta\tnames_{mp}\t{n}\n')
            for c, mp, d in sorted(rows): fh.write(f'{c}\t{mp}\t{d}\n')
        rm = Counter(c for c, _, _ in rows); rm.update(I['refmap_counts'])
    elif os.path.exists(REFMAP_DIGESTS):
        # research-only build without the transcription: merge the digests file as it stands
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
        'normalisationVersion': NORMALISATION_VERSION,
        'generated': built,
        'corpusAsOf': C.cut,
        'salt': salt,
        'hash': 'first 16 hex digits of SHA-256(salt bytes, then the tag in ASCII, then 0x1F, then the payload in UTF-8; for tag file the raw bytes)',
        'normalise': 'normalisation 1: Unicode NFKD, every code point of general category M removed, default lower-casing; a token is a maximal run of general categories L and N (an underscore splits); a word is a maximal run of category L of at least 4 letters',
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
    gz = _gz_json(doc)
    os.makedirs(ROOT_OUT, exist_ok=True)
    open(LIST_PATH, 'wb').write(gz)
    counts = dict(C.counts)
    counts.update({'digests_' + k: len(doc[k]) for k in ('tok', 'id', 'tri', 'col', 'file', 'phr')})
    counts['digests_sets'] = len(doc['sets']); counts['set_word_digests'] = sum(len(s) for s in doc['sets'])
    counts['lists_read'] = len(C.lists); counts['lists_under_five_words'] = I['lists_dropped']
    counts['lists_by_source'] = dict(C.list_src)
    counts['c4_lists_in_scope'] = len(C.c4_lists)
    counts['colour_values'] = len(C.col); counts['bare_six_hex_runs'] = len(C.bare6)
    counts['refmap'] = dict(rm)
    counts['list_bytes'] = len(gz)
    counts['list_sha256'] = hashlib.sha256(gz).hexdigest()
    counts['dict_sha256'] = hashlib.sha256(open(DICT, 'rb').read()).hexdigest()
    counts['dict_tokens'] = len(_D)
    counts['supplement_tokens'] = len(_SUP)
    counts['supplement_sha256'] = hashlib.sha256(open(SUPPLEMENT, 'rb').read()).hexdigest() if os.path.exists(SUPPLEMENT) else None
    counts['non_ascii_characters_seen'] = len(C.chars)
    counts['built'] = built
    # -- M0's list (plan §7c; attachment C), from the same items
    if a.format == 'm0':
        spell = spell_items()
        m0_lists = sorted(sorted(H.d0(w) for w in ws) for ws in I['lists'])
        m0 = {'schema': M0_SCHEMA, 'normalisationVersion': NORMALISATION_VERSION, 'digestHexDigits': DIGEST_HEX,
              'date': built, 'corpusCut': C.cut, 'salt': salt, 'counts': {},
              'tokens': sorted({H.d0(t) for t in I['tok']}),
              'trigrams': sorted({H.d0(' '.join(g)) for g in I['tri']}),
              'colours': sorted({H.d0(c) for c in I['col']}),
              'files': sorted({H.file0(f) for f in I['files']}),
              'lists': [{'id': i + 1, 'words': ws} for i, ws in enumerate(m0_lists)],
              'spell': sorted({H.d0(w) for w in spell})}
        m0['counts'] = {'tokens': len(m0['tokens']), 'trigrams': len(m0['trigrams']), 'colours': len(m0['colours']),
                        'files': len(m0['files']), 'lists': len(m0['lists']), 'listWords': sum(len(l['words']) for l in m0['lists']),
                        'spell': len(m0['spell'])}
        raw = (json.dumps(m0, separators=(',', ':'), ensure_ascii=True) + '\n').encode('ascii')
        open(M0_PATH, 'wb').write(raw)
        sha = hashlib.sha256(raw).hexdigest()
        gen = {'record': 'the CLEAN-ROOM.md section 4 G-row cells for this candidate (entered by the deny-list seat when it crosses at W-20; never the tokens)',
               'id': 'G-nnnn, assigned under the id rule (C-0104) when the row is entered',
               'date': built, 'seat': 'built by m1/W-16b (Opus); the row is entered by the deny-list seat at W-20',
               'file': 'packages/testkit/baselines/denylist.json', 'fileSha256': sha, 'bytes': len(raw),
               'normalisationVersion': NORMALISATION_VERSION, 'digestHexDigits': DIGEST_HEX, 'corpusCut': C.cut,
               'sources': SOURCE_LABELS, 'counts': m0['counts'],
               'notes': 'salted SHA-256 digests truncated to 16 hex digits (digestHexDigits 16); the file carries its salt as the format requires, and the salt file itself stays research-side, generated once and never regenerated; the research twin of the scanner and its self-test ran on this file before it was proposed'}
        open(GEN_RECORD, 'w').write(json.dumps(gen, indent=1) + '\n')
        counts['m0'] = {'path': M0_PATH, 'bytes': len(raw), 'sha256': sha, 'counts': m0['counts'],
                        'tokens_in_spell': len(set(m0['tokens']) & set(m0['spell']))}
    print(json.dumps(counts, indent=1, sort_keys=True))
    if a.record:
        open(a.record, 'w').write(json.dumps(counts, indent=1, sort_keys=True) + '\n')

# ---------------------------------------------------------------- the scanner's research-side twin (both formats)
class Refusal(Exception): pass
RESEARCH_TAG = {'TOK': 'tok', 'ID': 'id', 'TRI': 'tri', 'COL': 'col', 'PHR': 'phr', 'SET': 'word'}
class DenyList:
    """Loads the research list (format, gzipped) or M0's list (schema) and scans text by the research twin of the
    design's rules: the research list with its seven classes; M0's list with M0's five classes and the spell set
    (the twin of M0-k-06 as the design states it: §17.1 (5), C-0101, attachment C; the 3-gram run of §17.1 (2) (iii))."""
    def __init__(self, path=LIST_PATH):
        if path in ('research', 'm0'): path = {'research': LIST_PATH, 'm0': M0_PATH}[path]
        if not os.path.exists(path): raise Refusal(f'deny-list file missing: {path}')
        raw = open(path, 'rb').read()
        if raw[:2] == b'\x1f\x8b': raw = gzip.decompress(raw)
        doc = json.loads(raw); self.doc = doc; self.path = path
        if doc.get('schema') == M0_SCHEMA and 'format' not in doc: self.kind = 'm0'
        elif doc.get('format') == FORMAT: self.kind = 'research'
        else: raise Refusal(f'{path}: neither the research format nor M0 schema {M0_SCHEMA}')
        nv = doc.get('normalisationVersion')
        if nv != NORMALISATION_VERSION: raise Refusal(f'{path}: normalisationVersion {nv!r}, this scanner is version {NORMALISATION_VERSION}')
        k = doc.get('digestHexDigits', DIGEST_HEX if self.kind == 'research' else None)
        if k != DIGEST_HEX: raise Refusal(f'{path}: digestHexDigits {k!r}, this scanner truncates to {DIGEST_HEX}')
        self.H = Hasher(doc['salt'], k)
        if self.kind == 'research':
            self.sets = {'TOK': set(doc['tok']), 'ID': set(doc['id']), 'TRI': set(doc['tri']), 'COL': set(doc['col']),
                         'FILE': set(doc['file']), 'PHR': set(doc['phr'])}
            self.lists = doc['sets']; self.maxphr = doc['thresholds']['phrMaxTokens']; self.spell = set()
            self.cut = doc['corpusAsOf']
        else:
            self.sets = {'TOK': set(doc['tokens']), 'TRI': set(doc['trigrams']), 'COL': set(doc['colours']), 'FILE': set(doc['files'])}
            self.lists = [l['words'] for l in doc['lists']]; self.maxphr = 0; self.spell = set(doc['spell'])
            self.cut = doc['corpusCut']
        self.index = defaultdict(list)
        for li, s in enumerate(self.lists):
            for d in s: self.index[d].append(li)
    def dg(self, cls, item): return self.H.d0(item) if self.kind == 'm0' else self.H.d(RESEARCH_TAG[cls], item)
    def has(self, cls, item):
        if cls not in self.sets: return False
        d = self.dg(cls, item)
        if d not in self.sets[cls]: return False
        return not (cls == 'TOK' and d in self.spell)
    def file_hit(self, path):
        return (self.H.file0(path) if self.kind == 'm0' else self.H.file(path)) in self.sets['FILE']

    def _set_hit(self, ws):
        per = defaultdict(set)
        for w in set(ws):
            if len(w) < WORD_MIN: continue
            for li in self.index.get(self.dg('SET', w), ()): per[li].add(w)
        top = max((len(v) for v in per.values()), default=0)
        if top < SET_MIN: return None
        return min((v for v in per.values() if len(v) == top), key=lambda v: ' '.join(sorted(v)))

    def scan_text(self, text, stats=None):
        hits = []
        lines = text.split('\n')
        tl = []
        for n, l in enumerate(lines):
            for t in toks(l): tl.append((t, n + 1))
        tt = [t for t, _ in tl]
        for t, n in tl:
            if self.has('TOK', t): hits.append(('TOK', t, n))
        for n, l in enumerate(lines):
            if 'ID' in self.sets:
                for m in IDENT_RUN.finditer(strip_marks(l)):
                    parts = m.group(0).split('.')
                    for i in range(len(parts)):
                        for j in range(i + 1, len(parts) + 1):
                            s = '.'.join(parts[i:j])
                            if s and (s[0].isalpha() or s[0] == '_') and self.has('ID', s): hits.append(('ID', s, n + 1))
            for m in DOC_COLOUR.finditer(l):
                v = m.group(1).lower()
                if self.has('COL', v): hits.append(('COL', '#' + v, n + 1))
            best = self._set_hit(letter_words(l))
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
                            cell = letter_words(r[j])
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
            listed = gg is not None and self.has('TRI', ' '.join(gg))
            if listed and stats is not None:
                stats['single_trigrams'] += 1; stats['single_trigram_lines'].add(tl[k][1])
            if listed: run.append(k)
            else:
                if len(run) >= TRI_RUN: hits.append(('TRI', ' '.join(tt[run[0]:run[-1] + 3]), tl[run[0]][1]))
                run = []
        # names (research list only)
        for k in range(len(tt)):
            for L in range(2, self.maxphr + 1):
                if k + L > len(tt): break
                if self.has('PHR', ' '.join(tt[k:k + L])): hits.append(('PHR', ' '.join(tt[k:k + L]), tl[k][1]))
        return hits

    def scan_file(self, path, stats=None):
        hits = []
        if self.file_hit(path): hits.append(('FILE', os.path.basename(path), 0))
        try: text = open(path, encoding='utf-8').read()
        except (UnicodeDecodeError, OSError): return hits
        return hits + self.scan_text(text, stats)

CARRY = {'C1': 'ID', 'C2': 'COL', 'C3': 'TRI', 'C4': 'SET'}
class Allow:
    """Reviewed rows: doc_checks' rows carried (C1 → ID, C2 → COL, C3 → TRI, C4 → SET), and this list's own rows. A TRI
    row's text is re-tokenised by normalisation 1 (the reviewed text is unchanged; only its token boundaries moved when
    the underscore began to split, R-17), and a SET row's words likewise."""
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
                if c == 'TRI':
                    tn = ' '.join(toks(t)); self.exact.add((c, tn)); self.tri.append(' ' + tn + ' ')
                if c == 'SET':
                    ws = set(letter_words(t)); self.exact.add((c, ' '.join(sorted(ws)))); self.sets.append(ws)
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
    try: DL = DenyList(a.list)
    except Refusal as e: print('REFUSED', e); return 2
    AL = Allow(a.allow)
    total = Counter(); un = Counter(); rows = []
    for p in a.files:
        hs = DL.scan_file(p)
        for h in hs:
            total[h[0]] += 1
            if not AL.reviewed(h):
                un[h[0]] += 1; rows.append((p, h))
    print(f'list={DL.path} kind={DL.kind}')
    for c in ('TOK', 'ID', 'TRI', 'COL', 'SET', 'PHR', 'FILE'):
        if c in DL.sets or c == 'SET': print(f'{c}: {total[c]} hits, {un[c]} unreviewed')
    seen = set()
    for p, h in rows:
        key = (h[0], h[1])
        if a.show or key not in seen: print('UNREVIEWED', h[0], '|', h[1], '|', f'{p} l. {h[2]}')
        seen.add(key)
    return 1 if rows else 0

# ---------------------------------------------------------------- M0's format, checked research-side (attachment C)
ISO_DT = re.compile(r'^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$')
def validate_m0(doc, raw):
    """attachment C's field patterns and N-22's colour reading (a colour only inside a string value, a run of exactly six
    hex digits bounded by non-hex characters or the string's ends) — the checks baselines:check's deny-list kind will run."""
    bad = []
    keys = ['schema', 'normalisationVersion', 'digestHexDigits', 'date', 'corpusCut', 'salt', 'counts', 'tokens', 'trigrams', 'colours', 'files', 'lists', 'spell']
    if list(doc.keys()) != keys: bad.append(f'keys {list(doc.keys())}')
    if doc.get('schema') != M0_SCHEMA: bad.append('schema')
    if doc.get('normalisationVersion') != 1: bad.append('normalisationVersion')
    if doc.get('digestHexDigits') != DIGEST_HEX: bad.append('digestHexDigits')
    for f in ('date', 'corpusCut'):
        if not (isinstance(doc.get(f), str) and ISO_DT.match(doc[f])): bad.append(f)
    if not re.fullmatch(r'[0-9a-f]{64}', doc.get('salt', '')): bad.append('salt')
    dig = re.compile(r'[0-9a-f]{%d}' % DIGEST_HEX)
    def arr(name, a):
        if not all(isinstance(x, str) and dig.fullmatch(x) for x in a): bad.append(name + ': digest form')
        if any(a[i] >= a[i + 1] for i in range(len(a) - 1)): bad.append(name + ': not sorted ascending without repeat')
    for f in ('tokens', 'trigrams', 'colours', 'files', 'spell'): arr(f, doc.get(f, []))
    ids = []
    for l in doc.get('lists', []):
        if set(l) != {'id', 'words'} or not isinstance(l['id'], int) or isinstance(l['id'], bool): bad.append('lists: entry form'); break
        ids.append(l['id']); arr(f"lists[{l['id']}].words", l['words'])
    if len(ids) != len(set(ids)): bad.append('lists: repeated id')
    c = doc.get('counts', {})
    if not (isinstance(c, dict) and all(isinstance(v, int) and not isinstance(v, bool) for v in c.values())): bad.append('counts')
    # N-22's colour reading over every string value of the file
    strings = []
    def walk(x):
        if isinstance(x, str): strings.append(x)
        elif isinstance(x, dict):
            for k, v in x.items(): strings.append(k); walk(v)
        elif isinstance(x, list):
            for v in x: walk(v)
    walk(doc)
    col = re.compile(r'(?:^|[^0-9a-fA-F])(?:#|0x)?([0-9a-fA-F]{6})(?:$|[^0-9a-fA-F])')
    colour_strings = sum(1 for s in strings if col.search(s))
    return {'problems': bad, 'strings': len(strings), 'strings_holding_a_six_hex_run': colour_strings,
            'ascii_only': all(b < 128 for b in raw), 'bytes': len(raw)}

# ---------------------------------------------------------------- the construction's known answers (attachment C)
def known_answers():
    H = Hasher(bytes(range(32)).hex())
    rows = [('abc', '42fd4a8c529fdb40'), ('alpha beta gamma', '997eba001a17c8d3'), ('zebrum', '3ed08da5d2df31e8')]
    out = {'digests': [{'item': i, 'want': w, 'got': H.d0(i), 'ok': H.d0(i) == w} for i, w in rows]}
    wrong = hashlib.sha256(bytes(range(32)).hex().encode() + b'abc').hexdigest()[:16]
    out['salt_as_text'] = {'want': 'c053f380bd02c003', 'got': wrong, 'ok': wrong == 'c053f380bd02c003' and wrong != rows[0][1]}
    fd, p = tempfile.mkstemp(); os.write(fd, b'abc'); os.close(fd)
    out['file_abc'] = {'got': H.file0(p), 'ok': H.file0(p) == rows[0][1]}; os.unlink(p)
    cases = [('Zébrum_Plox', ['zebrum', 'plox']), ('ABC123def', ['abc123def']), ('x-ray 2x', ['x', 'ray', '2x']),
             ('ﬁle', ['file']), ('ALPHA  Beta\tgamma', ['alpha', 'beta', 'gamma'])]
    out['normalisation'] = [{'got': toks(i), 'ok': toks(i) == w} for i, w in cases]
    t = toks('ALPHA  Beta\tgamma'); out['trigram_case'] = {'ok': [' '.join(g) for g in zip(t, t[1:], t[2:])] == ['alpha beta gamma']}
    out['pass'] = all(r['ok'] for r in out['digests']) and out['salt_as_text']['ok'] and out['file_abc']['ok'] \
        and all(r['ok'] for r in out['normalisation']) and out['trigram_case']['ok']
    return out

def node_parity(chars):
    """Every distinct non-ASCII character the corpus holds, normalised and tokenised by this twin (Python's Unicode
    database) and by Node's (String.prototype.normalize, \\p{M}, toLowerCase, [\\p{L}\\p{N}]+): the scanner M0 builds runs on Node."""
    node = shutil.which('node')
    if not node: return {'skipped': 'node not found'}
    cs = sorted(chars)
    js = ("const cs=JSON.parse(require('fs').readFileSync(0,'utf8'));"
          "process.stdout.write(JSON.stringify(cs.map(c=>(c.normalize('NFKD').replace(/\\p{M}/gu,'').toLowerCase().match(/[\\p{L}\\p{N}]+/gu)||[]))));")
    r = subprocess.run([node, '-e', js], input=json.dumps(cs), capture_output=True, text=True)
    if r.returncode != 0: return {'skipped': 'node failed: ' + r.stderr[-200:]}
    theirs = json.loads(r.stdout)
    diff = [c for c, t in zip(cs, theirs) if toks(c) != t]
    ver = subprocess.run([node, '-e', 'process.stdout.write(process.versions.unicode)'], capture_output=True, text=True).stdout
    return {'characters': len(cs), 'differ': len(diff), 'differ_codepoints': ['U+%04X' % ord(c) for c in diff[:40]],
            'python_unicode': unicodedata.unidata_version, 'node_unicode': ver}

# ---------------------------------------------------------------- the self-test (W-16's and W-16b's checker column)
def run_checks(DL, C, refmap_names, common):
    """The eleven checks of E16 §4 on one list, through the research twin of that list's rules."""
    m0 = DL.kind == 'm0'
    R = {'list': DL.path, 'kind': DL.kind}
    def kinds(text): return {h[0] for h in DL.scan_text(text)}
    def gap(cand, hit_fn):
        """M0's list: a candidate its version-1 classes cannot carry is R-17's id / phr gap, counted, never a miss."""
        if not m0: return [x for x in cand if not hit_fn(x)], 0
        carr = [x for x in cand if carriable_m0(x)]
        return [x for x in carr if not hit_fn(x)], len(cand) - len(carr)
    # (1) every C1 identifier
    if m0: miss, g = gap(C.c1, lambda i: bool({'TOK', 'TRI'} & kinds('x ' + i + ' y')))
    else: miss, g = gap(C.c1, lambda i: any(h[0] == 'ID' and h[1] == i for h in DL.scan_text('x ' + i + ' y')))
    R['1_c1'] = {'identifiers': len(C.c1), 'missed': len(miss), 'format_gap_R17': g, 'pass': not miss}
    # (2) every corpus colour (as written as a colour)
    miss = [c for c in sorted(C.col) if 'COL' not in kinds('#' + c)]
    R['2_colours'] = {'values': len(C.col), 'missed': len(miss), 'bare_runs_not_listed': len(C.bare6 - C.col - NOT_COLOURS), 'pass': not miss}
    # (3) every check-(vi) list of the corpus that holds >= 5 indexable words
    miss = [ws for ws in common['c4h'] if 'SET' not in kinds(' '.join(ws))]
    R['3_c4_lists'] = {'lists': len(C.c4_lists), 'with_five_indexable_words': len(common['c4h']), 'missed': len(miss),
                       'under_five_never_a_c4_hit': common['c4_under'], 'pass': not miss}
    # (4) every list the build kept
    miss = [ws for ws in common['allw'] if 'SET' not in kinds(' '.join(ws))]
    R['4_all_lists'] = {'lists_with_five_words': len(common['allw']), 'missed': len(miss), 'pass': not miss}
    # (5) every token and identifier candidate
    miss = [t for t in C.tok if 'TOK' not in kinds(t)]
    if m0: imiss, g = gap(sorted(C.ident), lambda i: bool({'TOK', 'TRI'} & kinds('x ' + i + ' y')))
    else: imiss, g = gap(sorted(C.ident), lambda i: 'ID' in kinds('x ' + i + ' y'))
    R['5_tokens_identifiers'] = {'tokens': len(C.tok), 'tokens_missed': len(miss), 'identifiers': len(C.ident),
                                 'identifiers_missed': len(imiss), 'identifier_format_gap_R17': g, 'pass': not miss and not imiss}
    # (6) every source file's bytes
    miss = [f for f in C.files if not DL.file_hit(f)]
    R['6_files'] = {'files': len(C.files), 'missed': len(miss), 'pass': not miss}
    # (7) 3-grams, a fixed sample of the sorted set
    tri = common['tri_sorted']; step = max(1, len(tri) // 2000)
    miss = [g for g in tri[::step] if not DL.has('TRI', ' '.join(g))]
    R['7_trigrams_sampled'] = {'sampled': len(tri[::step]), 'of': len(tri), 'missed': len(miss), 'pass': not miss}
    # (8) planted leaks in a scratch copy of a design file, one per class of the list, 20 seeded trials each
    import random
    rnd = random.Random(20261003)
    base = common['base']; ref = Counter(h[0] for h in DL.scan_text(base))
    classes = ['TOK', 'TRI', 'SET', 'COL', 'FILE'] + (['ID', 'PHR'] if not m0 else [])
    planted = Counter(); trials = 20; tmp = tempfile.mkdtemp(prefix='w16b-plant-')
    toks_sorted = sorted(C.tok); ident_sorted = sorted(i for i in C.ident if '.' not in i)
    try:
        for n in range(trials):
            def caught(cls, text): return Counter(h[0] for h in DL.scan_text(base + '\n' + text + '\n'))[cls] > ref[cls]
            t = rnd.choice(common['jtok']); k = rnd.randrange(0, len(t) - 6)
            planted['TRI'] += caught('TRI', 'planted ' + ' '.join(t[k:k + 6]) + ' planted')
            planted['SET'] += caught('SET', ' '.join(sorted(rnd.choice(common['c4h']), reverse=True)[:SET_MIN]))
            planted['COL'] += caught('COL', 'fill #' + rnd.choice(sorted(C.col)).upper() + ';')
            planted['TOK'] += caught('TOK', 'the ' + rnd.choice(toks_sorted).upper() + ' value')
            f = rnd.choice(C.files); cp = os.path.join(tmp, 'copy-%d' % n + os.path.splitext(f)[1]); shutil.copyfile(f, cp)
            planted['FILE'] += DL.file_hit(cp); os.unlink(cp)
            if not m0:
                planted['ID'] += caught('ID', 'call ' + rnd.choice(ident_sorted) + '(x)')
                planted['PHR'] += caught('PHR', 'near ' + rnd.choice(common['phr_names']) + ' gate') if common['phr_names'] else 0
    finally: shutil.rmtree(tmp, ignore_errors=True)
    if not m0 and not common['phr_names']: classes.remove('PHR')
    R['8_planted'] = {'trials_each': trials, **{c: planted[c] for c in classes}, 'pass': all(planted[c] == trials for c in classes)}
    if m0:
        # the spell class: a planted spell word never hits, and no token digest is a spell digest
        sw = sorted(common['spell_sample'])
        R['8_planted']['spell_words_planted_hits'] = sum('TOK' in kinds('the ' + w + ' value') for w in sw)
        R['8_planted']['spell_words_planted'] = len(sw)
        R['8_planted']['tokens_in_spell'] = len(DL.sets['TOK'] & DL.spell)
        R['8_planted']['pass'] = R['8_planted']['pass'] and R['8_planted']['spell_words_planted_hits'] == 0 and R['8_planted']['tokens_in_spell'] == 0
    # (9) the reference maps' names (needs the transcription, held outside the project)
    if refmap_names:
        names = [l.rstrip('\n').split('\t', 1) for l in open(refmap_names, encoding='utf-8') if l.strip() and not l.startswith('#')]
        direct_kinds = {'TOK', 'TRI'} if m0 else {'TOK', 'PHR'}
        direct = [n for _, n in names if direct_kinds & kinds('x ' + n + ' y')]
        set_only = [n for _, n in names if n not in direct and is_word(norm(n))]
        rest = [n for _, n in names if n not in direct and n not in set_only]
        g = [n for n in rest if m0 and not carriable_m0(n)]
        mp_words = defaultdict(set)
        for mp, n in names:
            if is_word(norm(n)): mp_words[mp].add(norm(n))
        sets_hit = {mp: ('SET' in kinds(' '.join(sorted(ws)))) for mp, ws in mp_words.items() if len(ws) >= SET_MIN}
        R['9_refmap_names'] = {'names': len(names), 'direct_hit': len(direct), 'single_word_in_map_set_only': len(set_only),
                               'format_gap_R17': len(g), 'neither': len(rest) - len(g), 'map_sets_hit': sets_hit,
                               'pass': len(rest) - len(g) == 0 and all(sets_hit.values())}
    else: R['9_refmap_names'] = {'skipped': 'no transcription given', 'pass': False}
    # (10) salt, header and construction
    R['10_salt_header'] = {'salt_matches_file': DL.doc['salt'] == open(SALT_PATH).read().strip(),
                           'normalisationVersion': DL.doc.get('normalisationVersion'),
                           'digestHexDigits': DL.doc.get('digestHexDigits', DIGEST_HEX if not m0 else None)}
    if m0:
        raw = open(DL.path, 'rb').read(); R['10_salt_header']['format'] = validate_m0(DL.doc, raw)
        R['10_salt_header']['pass'] = R['10_salt_header']['salt_matches_file'] and not R['10_salt_header']['format']['problems'] \
            and R['10_salt_header']['format']['strings_holding_a_six_hex_run'] == 0 and R['10_salt_header']['format']['ascii_only']
    else: R['10_salt_header']['pass'] = R['10_salt_header']['salt_matches_file']
    # (11) the design set: 0 unreviewed hits with doc_checks' reviewed rows carried
    AL = common['allow']; per = {}; unrev = []; st = {'single_trigrams': 0, 'single_trigram_lines': set()}; single = {}
    for p in DESIGN_SET:
        tot = Counter(); un = Counter(); s1 = {'single_trigrams': 0, 'single_trigram_lines': set()}
        for h in DL.scan_file(p, s1):
            tot[h[0]] += 1
            if not AL.reviewed(h): un[h[0]] += 1; unrev.append((p, h))
        per[p] = {c: [tot[c], un[c]] for c in ('TOK', 'ID', 'TRI', 'COL', 'SET', 'PHR', 'FILE') if c in DL.sets or c == 'SET'}
        single[p] = [s1['single_trigrams'], len(s1['single_trigram_lines'])]
    R['11_design_set'] = {'per_document': per, 'unreviewed_total': len(unrev),
                          'unreviewed_distinct': len({(h[0], h[1]) for _, h in unrev}),
                          'single_listed_trigrams_positions_lines': [sum(v[0] for v in single.values()), sum(v[1] for v in single.values())],
                          'pass': not unrev}
    R['_unreviewed'] = unrev
    R['pass'] = all(v['pass'] for k, v in R.items() if k[:1].isdigit())
    return R

def selftest(a):
    which = [w.strip() for w in a.lists.split(',') if w.strip()]
    DLs = {}
    for w in which:
        try: DLs[w] = DenyList(w)
        except Refusal as e: print('REFUSED', e); return 2
    cuts = {DL.cut for DL in DLs.values()}
    if len(cuts) != 1: print('REFUSED the lists were built at different corpus cuts:', sorted(cuts)); return 2
    C = Corpus(cuts.pop()); C.read(a.refmap_names)
    import random
    c4 = [sorted(w for w in fs if re.fullmatch(r'[a-z]{4,}', w)) for fs in C.c4_lists]   # doc_checks' C4 index rule
    c4h = sorted(ws for ws in c4 if len(ws) >= SET_MIN)
    allw = sorted(ws for ws in (list_words(fs) for fs in C.lists) if len(ws) >= SET_MIN)
    jtok = []
    for f in sorted(glob.glob('research/findings/*.md')):
        t = toks(open(f, encoding='utf-8').read())
        if len(t) > 50: jtok.append(t)
    phr_names = []
    if a.refmap_names:
        phr_names = sorted(n for _, n in (l.rstrip('\n').split('\t', 1) for l in open(a.refmap_names, encoding='utf-8')
                                          if l.strip() and not l.startswith('#')) if 2 <= len(toks(n)) <= PHR_MAX)
    common = {'c4h': c4h, 'c4_under': len(c4) - len(c4h), 'allw': allw, 'tri_sorted': sorted(C.tri), 'jtok': jtok,
              'base': open('docs/volumes/INDEX.md', encoding='utf-8').read(), 'allow': Allow([DOC_ALLOW, DESIGN_ALLOW]),
              'phr_names': phr_names, 'spell_sample': random.Random(7).sample(sorted(w for w in spell_items() if len(w) >= 3), 20)}
    R = {'corpus_cut': C.cut, 'corpus': {k: v for k, v in C.counts.items() if k != 'files_after_cut_by_folder'},
         'files_after_cut_by_folder': C.counts['files_after_cut_by_folder'], 'lists': {}}
    unrev_all = []
    for w, DL in DLs.items():
        r = run_checks(DL, C, a.refmap_names, common)
        unrev_all += [(w, p, h) for p, h in r.pop('_unreviewed')]
        R['lists'][w] = r
    if {'research', 'm0'} <= set(DLs):
        d, m = DLs['research'].doc, DLs['m0'].doc
        pairs = {'tokens': (len(d['tok']), len(m['tokens'])), 'trigrams': (len(d['tri']), len(m['trigrams'])),
                 'colours': (len(d['col']), len(m['colours'])), 'files': (len(d['file']), len(m['files'])),
                 'lists': (len(d['sets']), len(m['lists'])),
                 'list_words': (sum(len(s) for s in d['sets']), sum(len(l['words']) for l in m['lists'])),
                 'salt': (d['salt'], m['salt']), 'corpus_cut': (d['corpusAsOf'], m['corpusCut'])}
        R['shared_classes'] = {k: {'research': v[0], 'm0': v[1], 'equal': v[0] == v[1]} for k, v in pairs.items()}
        R['shared_classes']['pass'] = all(v['equal'] for v in R['shared_classes'].values() if isinstance(v, dict))
    R['construction'] = known_answers()
    R['normalisation_parity'] = node_parity(C.chars)
    R['pass'] = all(r['pass'] for r in R['lists'].values()) and R.get('shared_classes', {'pass': True})['pass'] and R['construction']['pass'] \
        and R['normalisation_parity'].get('differ', 0) == 0
    print(json.dumps(R, indent=1))
    if a.report: open(a.report, 'w').write(json.dumps(R, indent=1) + '\n')
    if a.unreviewed:
        with open(a.unreviewed, 'w', encoding='utf-8') as fh:
            for w, p, h in unrev_all: fh.write(f'{w}\t{h[0]}\t{h[1]}\t{p} l. {h[2]}\n')
    return 0 if R['pass'] else 1

if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    sp = ap.add_subparsers(dest='cmd', required=True)
    b = sp.add_parser('build'); b.add_argument('--format', choices=('research', 'm0'), default='research', help='m0: also write M0\'s list beside the research list, from the same corpus read')
    b.add_argument('--refmap-names'); b.add_argument('--record')
    b.add_argument('--as-of', default=CUT_DEFAULT, help="corpus cut, ISO time or 'now'"); b.add_argument('--date', default='now', help="build time, ISO time or 'now'")
    s = sp.add_parser('scan'); s.add_argument('files', nargs='+'); s.add_argument('--list', default='research', help='research, m0 or a path')
    s.add_argument('--allow', nargs='*', default=[DOC_ALLOW, DESIGN_ALLOW]); s.add_argument('--show', action='store_true')
    t = sp.add_parser('selftest'); t.add_argument('--lists', default='research,m0'); t.add_argument('--report'); t.add_argument('--unreviewed'); t.add_argument('--refmap-names')
    a = ap.parse_args()
    sys.exit({'build': build, 'scan': scan, 'selftest': selftest}[a.cmd](a) or 0)
