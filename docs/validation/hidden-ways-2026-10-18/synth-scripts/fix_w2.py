#!/usr/bin/env python3
"""hidden-ways/fix-2 (2026-10-19): applies the second critic's fixes G1-G8 (critic-2.md) to the pre-fix copies
draft-w-prefix2.md, draft-w-prefix2.fragments.json and reply-prefix2.md, writing the three live files (draft-w.md,
draft-w.fragments.json, docs/HOST-REPLY-HIDDEN-WAYS-2026-10-18.md). Every substitution must find its text exactly once;
a changed fragment's New blockquote in draft-w.md is swapped and its Evidence line gains a 'Fixed by hidden-ways/fix-2'
note. One new fragment (G6: 971 (g), V13:763) is added after 971 (f). Run with python3 -I; then check_json.py and
verify_w2.py re-check the machine copy against the live targets."""
import hashlib, json, re, sys
from collections import Counter
ROOT = '/home/user/maps-architecture'
DIR = f'{ROOT}/docs/validation/hidden-ways-2026-10-18'
REPLY = f'{ROOT}/docs/HOST-REPLY-HIDDEN-WAYS-2026-10-18.md'
V13 = 'docs/volumes/V13-world.md'; V14 = 'docs/volumes/V14-sites.md'
def md5b(b): return hashlib.md5(b).hexdigest()
EXPECT = {'draft-w-prefix2.md': 'fa20274cd5436da53d479b39e54341dc',
          'draft-w-prefix2.fragments.json': '47e054567da06f1ca2b849b6a327db53',
          'reply-prefix2.md': '1038a76492065b076780c8f7a59eb002'}
for k, v in EXPECT.items():
    if md5b(open(f'{DIR}/{k}', 'rb').read()) != v: sys.exit(f'input {k} is not the pre-fix copy')
F = json.load(open(f'{DIR}/draft-w-prefix2.fragments.json', encoding='utf-8'))
MD = open(f'{DIR}/draft-w-prefix2.md', encoding='utf-8').read()
RP = open(f'{DIR}/reply-prefix2.md', encoding='utf-8').read()
BY = {f['id']: f for f in F}
problems = []; CHANGED = {}
def bq(s): return '\n'.join(('> ' + l) if l else '>' for l in s.split('\n'))
def md5f(p): return md5b(open(f'{ROOT}/{p}', 'rb').read())

def sub(id_, pairs, gaps, note):
    global MD
    fr = BY[id_]; s0 = fr['new']; s = s0
    for o, n in pairs:
        c = s.count(o)
        if c != 1: problems.append(f"sub {id_} [{gaps}]: {o[:70]!r} occurs {c}x"); continue
        s = s.replace(o, n, 1)
    key = '*New text:*\n' + bq(s0) + '\n*Evidence:* '
    c = MD.count(key)
    if c != 1: problems.append(f"md {id_}: New block occurs {c}x"); return
    i = MD.index(key) + len(key); j = MD.index('\n', i)
    ev = MD[i:j] + f" Fixed by hidden-ways/fix-2 (2026-10-19; `fix-2.md` {gaps}): {note}"
    MD = MD[:MD.index(key)] + '*New text:*\n' + bq(s) + '\n*Evidence:* ' + ev + MD[j:]
    fr['new'] = s; CHANGED.setdefault(id_, []).append(gaps)

def mdsub(o, n, tag):
    global MD
    c = MD.count(o)
    if c != 1: problems.append(f"mdsub [{tag}]: {o[:70]!r} occurs {c}x"); return
    MD = MD.replace(o, n, 1)

def rsub(o, n, tag):
    global RP
    c = RP.count(o)
    if c != 1: problems.append(f"reply [{tag}]: {o[:70]!r} occurs {c}x"); return
    RP = RP.replace(o, n, 1)

# ============================================================ G1 the fork rule's orientation (970 (c), 975 (a), reply §6)
sub('970 (c)', [
 ("before an edge (s, t) of (3)'s selection is laid, one Dijkstra from\n   s to the route set in force",
  "before an edge (s, t) of (3)'s selection is laid — `s` the end not yet on a laid route: where neither end is, the edge\n   is laid in full as its own road (no fork test; c_net would be ∞); where exactly one is, the unrouted end is `s`; where\n   both are, `s` is the seat of the lower lineage key and the c_join = 0 case below applies —, one Dijkstra from\n   s to the route set in force"),
 ("where s already carries a public route (c_join = 0, j in s's own cells)",
  "where s already carries a public route (both ends routed: c_join = 0, j in s's own cells)"),
 ("a permuted seat order gives the same network.",
  "a permuted seat order, or the edge named (t, s) for (s, t), gives the same network (which end is `s` is read off the\n   route set in force, never off the selection's naming)."),
 ("a seat already routed: its own road or\n   the edge dropped, never a zero-length route or a junction at its seat;",
  "an edge with one routed end forks its unrouted end whichever the selection names first; an edge\n   whose two seats are both already routed: its own road or the edge dropped, never a zero-length route or a junction at\n   its seat;"),
 # G6 (the reader sentence names the record comment it now matches)
 ("the charter's road rows read `toward` for a\n   junction-ended route as for an approach road (V13 §2.2);",
  "the charter's road rows read `toward` for a\n   junction-ended route as for an approach road (V13 §2.2, the `roads` row's comment);"),
], 'G1, G6', "the orientation of (s, t) defined — `s` the end not yet on a laid route, the unrouted end where exactly one is routed, the lower lineage key where both are, no fork test where neither is — and both namings of an edge give one network; the *Edges* line forks the unrouted end whichever is named first; `toward`'s reading for a junction-ended route is also written into the record comment (971 (g)).")
sub('975 (a)', [
 ("a permuted seat order and two runs give byte-identical networks;",
  "a permuted seat order and two runs give byte-identical networks, and an edge named (s, t) and the same edge named (t, s) give one network — an edge with one routed end forks its unrouted end whichever the selection names first;"),
 ("(its pair laid in full or dropped, the drop in the landmass's reason)",
  "(a pair of two routed seats laid in full or dropped, the drop in the landmass's reason)"),
], 'G1', "both namings of an edge give one network; the one-routed-end edge forks its unrouted end; the laid-in-full-or-dropped case is the two-routed-seat pair.")
rsub("before a pair's\nroad is laid, one search from the seat to the routes in force",
     "before a pair's\nroad is laid, one search from the seat not yet on a road to the routes in force", 'G1')
rsub("else its own road (a seat already on a road gets its own road only when the way round by the network exceeds the bound,\nelse none: never a zero-length road);",
     "else its own road (a pair whose two seats are both already on roads gets its own road only when the way round by the\nnetwork exceeds the bound, else none: never a zero-length road; whichever seat the pair names first, the one not yet on\na road is the one that forks);", 'G1')

# ============================================================ G2 the part's state cue over the part; E1's band over the part
# G5 (the revealed hidden road's tint) and G8 (the player's hover) ride the same 961 (a) fragment
sub('961 (a)', [
 ("with V14 §5.1's state cue at its midpoint (a dashed ring",
  "with V14 §5.1's state cue at its midpoint — at the admitted part's midpoint where the party's admission names a part — (a dashed ring"),
 ("(where its admission names a part, that part only, with its near junction's tick only and no length) —",
  "(where its admission names a part, that part only, its state cue at the part's midpoint and never beyond its station, with its near junction's tick only and no length), a player's hover carrying the kind word only (never the grade word, the length or a junction's id) —"),
 ("(`style.world` rows `trod.goat`, `trod.drove`, `trod.broad`)",
  "(`style.world` rows `trod.goat`, `trod.drove`, `trod.broad`; a road the host grades hidden drawn by this layer takes `style.world` row `trod.road`, the `broad` tint)"),
], 'G2, G5, G8', "the state cue at the admitted part's midpoint, never beyond its station; a player's hover the kind word only; a revealed hidden road's tint the `trod.road` row.")
sub('963 (e)', [
 ("draws for the party with the open-ring cue, `discovered` reads `local`;",
  "draws for the party with the open-ring cue at its midpoint — at the admitted part's midpoint where the reveal names a part, never beyond its station —, `discovered` reads `local`;"),
 ("byte-identical whatever the trod's course beyond the station;",
  "byte-identical whatever the trod's course beyond the station; a player's hover on a revealed trod carries its kind word only, never the grade word, the length or a junction's id;"),
 ("then drawn by the `trods` layer as a trod at the first step (its toggle and export rule the layer's)",
  "then drawn by the `trods` layer as a trod at the first step in the `trod.road` tint (its toggle and export rule the layer's; a party export carries it as a `trod` row of kind `road` with no class or grade word, never as a routes row)"),
 ("V14's E1 crop lays a revealed trod's band and nothing for an unrevealed one in a party crop;",
  "V14's E1 crop lays a revealed trod's band (over the admitted part only, where the reveal names one) and nothing for an unrevealed one in a party crop;"),
], 'G2, G5, G8', "the party's open-ring cue at the admitted part's midpoint; the player's hover kind-only; the revealed hidden road's tint and export row; E1's band over the part.")
sub('967 (d)', [
 ("a band of its kind's `widthM` over its polyline (V13 §2.2 `Trod`; file w),",
  "a band of its kind's `widthM` over its polyline (the admitted part's only, where the admission names one; V13 §2.2 `Trod`; file w),"),
], 'G2', "E1's band over the admitted part's polyline only, as 967 (e) says.")
rsub("cut at the station and the near junction only, no far junction and no length or effort;",
     "cut at the station and the near junction only, the state cue at the part's midpoint, no far junction and no length or\neffort;", 'G2')

# ============================================================ G5 a revealed hidden road: its export row and the feed
sub('961 (c)', [
 ("with its kind word, its grade word and its junctions' ids",
  "with its kind word, its grade word (a DM export's only: a party export carries the kind word alone) and its junctions' ids"),
 ("no `lengthM` and no `effortM`; file w), junctions",
  "no `lengthM` and no `effortM`; a road the host grades hidden that a party's places admit is exported as a `trod` row with kind `road` and no class or grade word, never as a routes row; file w), junctions"),
], 'G5, G8', "a revealed hidden road a `trod` row of kind `road`, no class or grade word, never a routes row; a party export's trod row carries no grade word (the hover's rule).")
sub('961 (d)', [
 ("and a junction only with the arms admitted, only where one is; file w)",
  "and a junction only with the arms admitted, only where one is; a trod row's grade word a DM export's only; a road the host grades hidden that a party's places admit a `trod` row with kind `road` and no class or grade word, never a routes row; file w)"),
], 'G5, G8', "the CSV rows as the GeoJSON's: the revealed hidden road a `trod` row of kind `road`; the grade word a DM export's only.")
sub('960 (d)', [
 ("the trods' polylines and junction ticks keyed by trod id,",
  "the trods' polylines — a revealed hidden road's among them, as a trod keyed by its edge key — and junction ticks keyed by trod id,"),
], 'G5', "the player audience of `mapFeed` carries a revealed hidden road's polyline under the trods' clause.")
rsub("(the trod cue, never a road's; the layer's toggle and export rule)",
     "(the trod cue, never a road's, in the `broad` tint; the layer's toggle and export rule — a party export carries it as a\ntrod row of kind `road` with no class or grade word, never as a routes row)", 'G5')

# ============================================================ G4 the approach road's junction end on either world
sub('970 (b)', [
 ("and a junction an end only where the host names it (or, on a standalone world, (14)'s fork rule or (12)'s approach road lays it),",
  "and a junction an end only where the host names it, where the map's own approach road ((12)) ends at it on either world, or where (14)'s fork rule lays it on a standalone world,"),
], 'G4', "the approach road's junction end on both worlds (V13:1828), the fork rule's on a standalone world only.")

# ============================================================ G8 the reply's hover sentence
rsub("the grade\nword on hover, **never** the routes layer's",
     "the grade\nword on the DM's hover (a player's carries the kind word only — never the grade word, the length or a junction's\nid), **never** the routes layer's", 'G8')

# ============================================================ G7 a superseded trod's rows stand
rsub("and your rung rows for it closed by your\nown retraction (W7",
     "and your rung and knowledge rows for it stand as dated facts of a tombstoned trod (nothing to\nretract) (W7", 'G7')

# ============================================================ G6 the `toward` comment: a new fragment 971 (g) on V13:763
T13 = open(f'{ROOT}/{V13}', encoding='utf-8').read()
old = "on an approach road (V13 §3.8 (12)) the next host settlement along the route it joins from its junction"
new = "on an approach road (V13 §3.8 (12)), or a route ending at a junction (V13 §3.8 (14); file w), the next host settlement along the route it joins from its junction"
if T13.count(old) != 1: problems.append(f"971 (g): old occurs {T13.count(old)}x")
else:
    ln = T13[:T13.index(old)].count('\n') + 1; m = md5f(V13)
    rec = dict(id='971 (g)', file=V13, line=ln, md5=m, old=old, new=new)
    k = [r['id'] for r in F].index('971 (f)') + 1
    F.insert(k, rec)
    ev = ("the charter's `roads` row reads `toward` on an approach road from its junction (V13:763) [STATED]; 970 (c) (d) "
          "extends the reading to a junction-ended route, and the record's own comment now says so. From: new (`fix-2.md` G6, critic-2 G6).")
    block = (f"**971 (g).** Volume 13 — §2.2 the frame charter's `roads` row (`toward`'s comment: a junction-ended route) (edit). "
             f"Target: `{V13}`, line {ln} (md5 `{m[:8]}…`) as it stands now.\n*Current text (as it stands now):*\n{bq(old)}\n"
             f"*New text:*\n{bq(new)}\n*Evidence:* {ev}\n")
    anchor = "\n\n**972.** **"
    if MD.count(anchor) != 1: problems.append('972 anchor')
    else: MD = MD.replace(anchor, "\n" + block + anchor, 1)
mdsub("(the approach road's `join` superseded, and the three lines that named it); the route's identity by its ends' lineages.**",
      "(the approach road's `join` superseded, and the three lines that named it; `toward`'s comment read for a junction-ended route); the route's identity by its ends' lineages.**", 'G6')

# ============================================================ G3 the header's count (and the new total)
c = Counter(r['file'] for r in F); n = len(F)
mdsub("Twenty-one items, **113 fragments** — `docs/volumes/V13-world.md` 82, `docs/volumes/V14-sites.md` 6,",
      f"Twenty-one items, **{n} fragments** — `docs/volumes/V13-world.md` {c[V13]}, `docs/volumes/V14-sites.md` {c[V14]},", 'G3')
mdsub("(the same 110 fragments, texts unescaped,", f"(the same {n} fragments, texts unescaped,", 'G3')
mdsub("applied by `synth-scripts/fix_w.py` and re-checked by `synth-scripts/verify_w2.py`):",
      "applied by `synth-scripts/fix_w.py` and re-checked by `synth-scripts/verify_w2.py`; the second fix seat's, `fix-2.md`, applied by `synth-scripts/fix_w2.py` and re-checked by the same two scripts):", 'G3')
rsub("(items 955–975, 113 fragments; the machine copy `draft-w.fragments.json`)",
     f"(items 955–975, {n} fragments; the machine copy `draft-w.fragments.json`)", 'G3')

if problems:
    print('PROBLEMS:'); [print(' -', p) for p in problems]; sys.exit(1)
open(f'{DIR}/draft-w.fragments.json', 'w', encoding='utf-8').write(json.dumps(F, ensure_ascii=False, indent=1))
open(f'{DIR}/draft-w.md', 'w', encoding='utf-8').write(MD)
open(REPLY, 'w', encoding='utf-8').write(RP)
print('OK', n, 'fragments', dict(c)); print('changed', len(CHANGED), sorted(CHANGED))
