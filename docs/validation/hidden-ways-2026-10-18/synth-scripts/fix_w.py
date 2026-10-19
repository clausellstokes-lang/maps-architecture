#!/usr/bin/env python3
"""hidden-ways/fix (2026-10-19): applies the critic's fixes G1-G19 (critic.md) to the pre-fix copies of draft-w.md,
draft-w.fragments.json and the reply (kept as draft-w-prefix.md, draft-w-prefix.fragments.json, reply-prefix.md),
writing the three live files. Every substitution must find its text exactly once; the fragment's New blockquote in
draft-w.md is swapped with it and its Evidence line gains a 'Fixed' note. New fragments (G9) are added to item 971.
Run with python3 -I; then verify_w2.py re-checks the machine copy against the live targets."""
import hashlib, json, re, sys
ROOT = '/home/user/maps-architecture'
DIR = f'{ROOT}/docs/validation/hidden-ways-2026-10-18'
REPLY = f'{ROOT}/docs/HOST-REPLY-HIDDEN-WAYS-2026-10-18.md'
V13 = 'docs/volumes/V13-world.md'; V14 = 'docs/volumes/V14-sites.md'
F = json.load(open(f'{DIR}/draft-w-prefix.fragments.json', encoding='utf-8'))
MD = open(f'{DIR}/draft-w-prefix.md', encoding='utf-8').read()
RP = open(f'{DIR}/reply-prefix.md', encoding='utf-8').read()
BY = {f['id']: f for f in F}
problems = []
def bq(s): return '\n'.join(('> ' + l) if l else '>' for l in s.split('\n'))
def md5f(p): return hashlib.md5(open(f'{ROOT}/{p}', 'rb').read()).hexdigest()
CHANGED = {}

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
    ev = MD[i:j] + f" Fixed by hidden-ways/fix (2026-10-19; `fix.md` {gaps}): {note}"
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

# ======================================================================= G1 the step-0 rule: the bottom USABLE word
sub('955 (a)', [
 ("drawn by its step (for nobody\n> at the bottom)", "drawn by its step (for nobody\n> unlit or below the bottom usable word)"),
 # G4
 ("never *hidden*, the host's grade of an overt road)", "never *hidden*, the host's ladder word, a grade on a route or a trod)"),
], 'G1, G4', "the step-0 rule keyed on the bottom usable word; *hidden* a grade on either record (the v1 'overt road' reading withdrawn).")
sub('956 (c)', [
 ("a candidate the host has not lit, or at its bottom word, for nobody (V13 §5.1)",
  "a trod with no grade (a candidate the host has not lit) or at a word the grade-ladder table places below the host's bottom usable word for nobody (V13 §5.1)"),
], 'G1', "the step-0 rule keyed on the bottom usable word.")
sub('956 (e)', [
 ("(the host's words in ladder order, bottom first), never by a lay",
  "(the host's words in ladder order, bottom first, its bottom usable word named — the first step drawn), never by a lay"),
 ("a candidate the host has not lit reads as the host's bottom word and is drawn for nobody (V13 §5.1);",
  "a candidate the host has not lit has no grade (reads as unlit) and is drawn for nobody, as is a trod at a word the table places below the bottom usable word (V13 §5.1);"),
], 'G1', "an unlit candidate has no grade; nobody draws a trod with no grade or a word below the bottom usable one.")
sub('959 (b)', [
 # G1
 ("host's words in ladder order, bottom first) and folded as a route's grade is ((9)); a trod the host has not lit reads\n   as the bottom word;",
  "host's words in ladder order, bottom first, its bottom usable word named) and folded as a route's grade is ((9)); a trod\n   the host has not lit has no grade (reads as unlit);"),
 ("drawn by its word's step (V13 §5.1: the bottom for nobody)",
  "drawn by its word's step (V13 §5.1: no grade, or a word below the bottom usable one, for nobody; the bottom usable\n   word the first step)"),
 # G10
 ("(c) **Candidates:** per patch", "(c) **Candidate edges:** per patch"),
 ("an edge is a candidate when its straight length", "an edge is a candidate edge when its straight length"),
 ("trods and takes the candidates in rank order until that many are laid or the\n   candidates are spent.",
  "trods and takes the candidate edges in rank order until that many are laid or the\n   candidate edges are spent."),
 ("is a candidate junction site, thinned along each", "is a touch point (a possible junction), thinned along each"),
 ("its touch points, its candidates and the drops", "its touch points, its candidate edges and the drops"),
 # G10 + G11 (the work limit)
 ("≤ fine cells (the rough pass) + Σ over candidates of their ellipses' cells; a limit reached drops the remaining\n   candidates in rank order",
  "≤ the fine cells the rough pass reads + Σ over candidate edges searched of their ellipses' cells; a limit reached\n   drops the remaining candidate edges in rank order"),
 # G11 (the grid)
 ("over the coarse grid a cell is rough when its majority `landUse` is in\n   `rough.landUse` or its local relief (max − min `dem` within `reliefWindowM`) ≥ `reliefM`;",
  "over the fine grid (`landUse` and `dem` at their fine cells, V13 §2.2) a cell is rough when its `landUse` is\n   in `rough.landUse` or its local relief (max − min `dem` within `reliefWindowM`) ≥ `reliefM`;"),
], 'G1, G10, G11', "the step-0 rule keyed on the bottom usable word; the Urquhart edges 'candidate edges' and the touch points no 'candidates' (one word, one meaning: a candidate is a laid trod the host may light); the rough pass on the fine grid, where `landUse` and `dem` live (V13:713), and the work limit counting the fine cells it reads and every candidate edge searched.")
sub('961 (a)', [
 # G1
 ("a trod the host has not lit, or at its bottom word, is drawn for nobody",
  "a trod with no grade (one the host has not lit) or at a word the grade-ladder table places below the host's bottom usable word is drawn for nobody"),
 ("0.6 px at the first step above the bottom, 0.8 at the second, 1.0 at the third and above",
  "0.6 px at the host's bottom usable word (the first step), 0.8 at the next word up, 1.0 at the third and above"),
 # G2
 ("a player only a `revealed` or `discovered` lit trod —",
  "a player only a `revealed` or `discovered` lit trod (where its admission names a part, that part only, with its near junction's tick only and no length) —"),
 # G6
 ("a part a settlement knows or the party is shown draws as that part only |",
  "a part a settlement knows or the party is shown draws as that part only; a road the host grades hidden is drawn by this layer under the same rule once the party's places admit its edge key (V13 §2.2), as a trod at the first step, its DM ghost staying the `routes` row's |"),
], 'G1, G2, G6', "the step-0 rule and the widths keyed on the bottom usable word; a player's part with its near tick only and no length; the revealed hidden road drawn by this layer (its toggle and export rule).")
sub('963 (a)', [
 ("a trod at the host's bottom word is drawn for nobody and absent from every export while a lit one draws at its step's width",
  "a trod with no grade, or at a word the mock host's grade-ladder table places below its bottom usable word, is drawn for nobody and absent from every export, while one at the bottom usable word draws at the first step's 0.6 px and a higher word at its step's width"),
 # G3
 ("and a standalone world's trods carry no grade;",
  "and a standalone world's trods carry no grade; a candidate's junction draws no ring, lists no arm and is named by no `placeOf` for anyone, the DM included, while no admitted arm ends or crosses there;"),
], 'G1, G3', "the step-0 case keyed on the bottom usable word; the DM-candidate junction case.")
sub('965 (a)', [
 # G4
 ("with **`hidden` kept as the host's grade of an overt road only**",
  "with **`hidden` kept as the host's own ladder word — a grade on a route or on a trod, never a class or a kind of the map's**"),
 # G1
 ("drawn by its step (the bottom for nobody)", "drawn by its step (no grade or a word below the bottom usable one for nobody, the bottom usable word the first step)"),
 ("drawn by the word's step (the bottom for nobody, the DM included;",
  "drawn by the word's step (no grade, or a word below the host's bottom usable word, for nobody, the DM included; the bottom usable word the first step;"),
 # G17
 ("or a bound world forked at genesis by the map,", "or a bound world forked at genesis by the map, or a standalone junction-to-junction link (no seat asks for it),"),
], 'G1, G4, G17', "J-V13.114's v1 'overt road only' replaced by the one-ladder reading J-V13.124 and J-V13.129 hold; the step-0 rule on the bottom usable word; J-V13.131 names the junction-to-junction link the standalone selection does not mint.")
sub('968 (b)', [
 ("may drop to its bottom word;", "may drop to a word its table places below the bottom usable one (its `wild`, where its ladder carries one), drawn for nobody;"),
], 'G1', "unlighting is a word below the bottom usable one.")

# ======================================================================= G2 the part: no far end, no length
sub('960 (d)', [
 ("a candidate the host has not lit in neither; V13 §5.1; file w)",
  "a trod with no grade, or below the host's bottom usable word, in neither; where the admission names a part (`asFarAs`), that part only: the polyline cut at the station, the near junction's tick, the far junction's tick, id and arm withheld, no `lengthM` and no `effortM`; V13 §5.1; file w)"),
], 'G1, G2', "a part admitted crosses the feed as that part only.")
sub('961 (c)', [
 ("no export a trod the host has not lit; file w), junctions (Point, kind `junction`, with its arms; file w)",
  "no export a trod the host has not lit; where the admission names a part (`asFarAs`), that part only: the LineString cut at the station, the near junction's id alone, the far junction's tick, id and arm withheld, no `lengthM` and no `effortM`; file w), junctions (Point, kind `junction`, with the arms the export's admission admits, and only where one is admitted; file w)"),
], 'G2, G3', "a part exported as that part only; a junction exported with its admitted arms only, and only where one is admitted.")
sub('961 (d)', [
 ("routes, trods and junctions (under the export's admission)",
  "routes, trods and junctions (under the export's admission: a trod admitted in part its part only — no far junction, no `lengthM`, no `effortM` — and a junction only with the arms admitted, only where one is; file w)"),
], 'G2, G3', "the CSV rows cut as the GeoJSON's.")
sub('963 (e)', [
 ("a reveal through the party's places that names a part draws that part only, the rest absent;",
  "a reveal through the party's places that names a part draws that part only, the rest absent, and the player audience of `mapFeed`, the GeoJSON and CSV rows and the hover carry the admitted part only — no far junction, no length — byte-identical whatever the trod's course beyond the station; a junction where only an unknown trod (or an unlit candidate) meets a road draws no ring, no junctions row and no `placeOf` arm for the party, a road-to-road junction beside it drawing as before; a road the host grades hidden is undrawn for the party until the party's places admit its edge key, then drawn by the `trods` layer as a trod at the first step (its toggle and export rule the layer's), a part admitted by `asFarAs` only, the knowing seat's pin at it lapsing as a trod's, its DM ghost unchanged;"),
], 'G2, G3, G6', "the part's leak cases, the unknown trod's junction, the hidden road under the trod rule.")

# ======================================================================= G3 the junction mark by its admitted arms
sub('974 (a)', [
 ("the junction a small ring on the joined route (where a road, a trod or an approach road meets a road), the joined route unchanged",
  "the junction a small ring on the joined route (where a road, a trod or an approach road meets a road), drawn for an audience only where at least one arm that audience admits ends or crosses there (a road's or an approach road's arm admitted as the road is, a trod's by its secret state and its grade, a candidate's never), the joined route unchanged"),
 ("a junction a 3 px ring in the ink colour, the legend row \"junction\" |",
  "a junction a 3 px ring in the ink colour, the legend row \"junction\" only while one is drawn |"),
 # G6
 ("(and, for a player the host's reveal through the party's places admits, drawn as a trod at the first step — the trod rule, V13 §3.8 (13) (i); file w)",
  "(and, for a player the host's reveal through the party's places admits by its edge key, drawn by the `trods` layer — its toggle default off, its export rule — as a trod at the first step, never in this row: the trod rule, V13 §3.8 (13) (i); file w)"),
], 'G3, G6', "the ring drawn only by an admitted arm, the legend row only while one is drawn; the revealed hidden road drawn by the `trods` layer.")
sub('960 (f)', [
 ("a `junction` by its route, its arms (the trods, and the roads ending there by W7 (14)) and the distance from the nearer seat, or \"at its town gate\" where it carries `nearSeat`;",
  "a `junction` by its route and the arms the audience admits (the trods it admits, and the roads ending there by W7 (14)) and the distance from the nearer seat, or \"at its town gate\" where it carries `nearSeat` — for an audience that admits none of its trod arms, the roads ending there alone where any does, else only the country, as for an unknown trod;"),
], 'G3', "a junction's place words by its admitted arms.")
sub('975 (a)', [
 ("the `routes` layer draws every junction's mark and the legend names it, a player picture carrying no junction of a trod it does not admit;",
  "the `routes` layer draws the mark of every junction an admitted arm ends or crosses at and the legend names it while one is drawn, a player picture carrying no junction where only a trod it does not admit meets the road;"),
 # G5
 ("removing the joined route of a fork re-joins the fork as an approach road re-joins;",
  "removing the joined route of a fork re-joins the fork as an approach road re-joins; a seat already routed never gets a zero-length route or a junction at its seat (its pair laid in full or dropped, the drop in the landmass's reason); no standalone run lays a route whose two ends are both junctions;"),
], 'G3, G5, G17', "T-V13-61's junction-mark clause matches 974 (a)'s rule; the already-routed seat case; no standalone junction-to-junction route.")

# ======================================================================= G6 the hidden road's supporting rules
sub('956 (f)', [
 ("or the junction's point, likewise recorded; drawn for an audience that does not know the trod only",
  "or the junction's point — or when `where` names a road the host grades hidden with no `fraction`: at the road's midpoint vertex (the known part's midpoint where `asFarAs` names one); each likewise recorded; drawn for an audience that does not know the trod (or the hidden road) only"),
], 'G6', "a knowledge event naming a hidden road has its `at`.")
sub('961 (b)', [
 ("an event whose `where` is a trod or a junction (file w) —",
  "an event whose `where` is a trod, a junction, or a road the host grades hidden (file w; a hidden road's knowledge read per seat and edge by the same latest-row rule and drawn only for an audience the road draws for under the trod rule) —"),
 # G13
 ("captioned with the seat, the host's cause word, the week and the part;",
  "captioned with the seat, the host's cause word, the week and the part (\"from a as far as station n\" or \"from b back to station n\", the station from `a` in either case);"),
 # G14
 ("a rung event draws no pin (it moves the trod's grade, V13 §3.8 (13) (i));",
  "a rung event draws no pin (it moves the trod's grade, V13 §3.8 (13) (i)); a forgetting event draws no pin of its own: it ends the learning pin's span (the DM's hover of the trod reads \"forgotten by ⟨seat⟩, week n\");"),
], 'G6, G13, G14', "the events row covers a hidden road; the part's caption from `a`; the forgetting event ends the pin's span and draws none of its own.")
sub('956 (i)', [
 ("mirrored as a route's grade is; V14's",
  "mirrored as a route's grade is; a road the host grades hidden reads `secret` while hidden (V14 §2.3's `dmOnly`; its DM ghost the routes layer's) and is admitted for a party only by its edge key as a place's address in the party's `places` — revealed through the host's reveal or the DM's `setAttr`, drawn then by the `trods` layer as a trod at the first step (V13 §5.1) —, a revival restoring `public`; V14's"),
], 'G6', "the hidden road's party admission by its edge key; `secret` while hidden.")
sub('967 (a)', [
 ("the part then the one admitted.",
  "the part then the one admitted. A road the host grades hidden is admitted the same way while hidden, by its edge key as the place's address (V13 §2.2), and drawn then by V13's `trods` layer as a trod."),
], 'G6', "V14's precedent names the hidden road's admission.")
sub('967 (e)', [
 ("the party's `places` holding a trod's id as a place's (BCR-V14-19's key form;",
  "the party's `places` holding a trod's id, or a hidden road's edge key, as a place's (BCR-V14-19's key form;"),
], 'G6', "the party's places key a hidden road by its edge key.")

# ======================================================================= G4 968 (l)
sub('968 (l)', [
 ("`hidden` the host's grade only;", "`hidden` the host's grade only (on a road or a trod);"),
], 'G4', "the one-ladder reading.")

# ======================================================================= G5, G12, G17 the fork rule
sub('970 (c)', [
 ("its class by (5), its cells in the `route` layer — else as its own road s → t;",
  "its class by (5) read on its one seat's rank, never above the joined route's class, its cells in the `route` layer —\n   else as its own road s → t; where s already carries a public route (c_join = 0, j in s's own cells) the edge is laid\n   in full as its own road s → t when c_net exceeds `fork.detourMax` × the pair's own A\\* cost, else **dropped** — the\n   pair is served by the network, no route and no junction is written, the drop counted in the landmass's reason;"),
 ("\"Appropriately\" is the bound;",
  "The standalone fork rule lays seat-to-junction roads only: a junction-to-junction link is the host's charter (both ends\n   junctions, (a)) or a worn trod's road — the map's own selection mints none. \"Appropriately\" is the bound;"),
 ("*Edges:* a seat whose nearest route is not yet laid at its turn: its own road;",
  "*Edges:* a seat whose nearest route is not yet laid at its turn: its own road; a seat already routed: its own road or\n   the edge dropped, never a zero-length route or a junction at its seat;"),
], 'G5, G12, G17', "the already-routed seat (c_join = 0) laid in full or dropped; a one-seat edge's class; no standalone junction-to-junction link.")

# ======================================================================= G10, G11, G19 the budget rows and laws
sub('959 (k)', [
 ("+ Σ over seats of the route set's cells ((14)'s fork test, the search (5)'s trail uses); W7c ≤ fine cells (the rough pass) + Σ over candidate trods of their ellipses' cells",
  "+ Σ over seats of the cells the fork test's two searches touch ((14): the Dijkstra to the route set, the search (5)'s trail uses, and the search over the laid routes' cells); W7c ≤ the fine cells the rough pass reads + Σ over candidate edges searched of their ellipses' cells"),
], 'G10, G11, G19', "the work limits name the fork test's searches, the rough pass's fine cells and every candidate edge searched.")
sub('959 (l)', [
 ("(W7c the remaining candidates in rank order, `W_TROD_CUT`)", "(W7c the remaining candidate edges in rank order, `W_TROD_CUT`)"),
], 'G10', "candidate edges.")
sub('959 (g)', [
 ("every further candidate dropped for cost", "every further candidate edge dropped for cost"),
], 'G10', "candidate edges.")
sub('963 (f)', [
 ("the candidates dropped at the work limit", "the candidate edges dropped at the work limit"),
], 'G10', "candidate edges.")
sub('957 (a)', [
 ("junctionSpacingM: number /* candidate junctions along one route no closer than this */",
  "junctionSpacingM: number /* touch points (possible junctions) along one route no closer than this */"),
], 'G10', "the touch points are no 'candidates'.")
sub('962 (a)', [
 # G19
 ("| W7a + W7b | Σ over edges of the search ellipse's cells (A\\* , V13 §3.8; C13-36) | 60 ms | 200 ms | 520 ms |",
  "| W7a + W7b | Σ over edges of the search ellipse's cells (A\\* , V13 §3.8; C13-36) + Σ over seats of the cells W7 (14)'s fork test touches (file w) | 60 ms | 200 ms | 520 ms |"),
 ("W7 (14)'s fork test — one Dijkstra to the route set per seat, the trail rule's search — inside the row, file w) |",
  "+ 8 ns × Σ over seats of the cells the fork test's two searches touch (one Dijkstra to the route set, the trail rule's search, and one over the laid routes' cells; ≤ the landmass's fine cells per seat; file w); PLAUSIBLE until SP-W7's rerun counts the fork test) |"),
 # G10, G11
 ("| W7c | fine cells (the rough pass) + Σ over candidate trods of the search ellipse's cells (W7 (13); file w) |",
  "| W7c | the fine cells the rough pass reads + Σ over candidate edges searched of the search ellipse's cells (W7 (13); file w) |"),
 ("+ 8 ns × Σ ellipse cells over candidates (", "+ 8 ns × Σ ellipse cells over candidate edges searched ("),
 ("2 000 trods ≈ 2 × 10⁶ cells ≈ 16 ms", "2 000 searched ≈ 2 × 10⁶ cells ≈ 16 ms"),
 ("the row bears ≈ 2 500 candidates at the province rung, the density rule asking ≈ 800;",
  "the row bears ≈ 2 500 searched at the province rung, the density rule asking ≈ 800 laid;"),
], 'G10, G11, G19', "the fork test a term of the W7a + W7b row, PLAUSIBLE until SP-W7's rerun; the W7c law over the fine cells the rough pass reads and every candidate edge searched.")

# ======================================================================= G15 RouteEnd declared on its own
sub('972 (a)', [
 ("interface RouteGenesis { lawVersion: string; edges: { hostKey: string; a: string | RouteEnd; b: string | RouteEnd; mode: 'land'|'water'; grade: string }[]; week: Week }   // file w (the owner's word of 2026-10-19; W7 (14)): an end is a host seat key, or a junction end — RouteEnd = { route: string /* the host's edge key */; stationM: number /* integer effort-metres from that edge's `a` */ } | { at: WorldPointCm /* snapped to the nearest public land route's polyline within routeToleranceM, else refuse.world.junctionEnd */ } — on a land edge only (a water edge ends at two port seats); lawVersion moves, and an older genesis (seat keys only) folds as before",
  "type RouteEnd = { route: string /* the host's edge key */; stationM: number /* integer effort-metres from that edge's `a` */ } | { at: WorldPointCm /* snapped to the nearest public land route's polyline within routeToleranceM, else refuse.world.junctionEnd */ };   // file w (the owner's word of 2026-10-19; W7 (14)): a junction end, on a land edge only (a water edge ends at two port seats); read by RouteGenesis and NetworkChange.ends\ninterface RouteGenesis { lawVersion: string; edges: { hostKey: string; a: string | RouteEnd; b: string | RouteEnd; mode: 'land'|'water'; grade: string }[]; week: Week }   // file w: an end is a host seat key or a RouteEnd; lawVersion moves, and an older genesis (seat keys only) folds as before"),
], 'G15', "`RouteEnd` declared on a line of its own before `RouteGenesis`.")

# ======================================================================= G9 the join residues: new fragments on item 971
T13 = open(f'{ROOT}/{V13}', encoding='utf-8').read(); T14 = open(f'{ROOT}/{V14}', encoding='utf-8').read()
def lineof(t, o): return t[:t.index(o)].count('\n') + 1
NEW = [
 ('971 (d)', V13, "Volume 13 — §1b.1 Records, fields and tables (the `WorldRoute` row: the approach road's junction)",
  "origin `approach`, its junction in `join`, V13 §3.8 (12))",
  "origin `approach`, its junction a `WorldJunction` on the joined route, its `b`, file w; V13 §3.8 (12))",
  "the wiring row names the field 971 (a) supersedes (V13:493) [OBSERVED]. V13:124 (file t's §1.3 block, \"the junction `join`\") is left as it stands: the §1.3 blocks are dated records of what each amendment file did, and this file's own block (955 (a)) names the junction record. From: new (fix.md G9)."),
 ('971 (e)', V13, "Volume 13 — §9 Decisions, J-V13.110 (the approach road's junction field)",
  "its junction in a field of its own (`join`),",
  "its junction in a field of its own (`join`; superseded in its field by J-V13.130, file w: the approach road's `b` a `WorldJunction`),",
  "J-V13.110 names the field 971 (a) supersedes (V13:4025) [OBSERVED]; a decision row keeps its text and gains the superseding row's id, as the table's other superseded rows do. From: new (fix.md G9)."),
 ('971 (f)', V14, "Volume 14 — §10.2 Requests to V13, (18) (the approach road's junction field)",
  "with its junction in `WorldRoute.join`,",
  "with its junction in `WorldRoute.join` (file w: now a `WorldJunction`, the route's `b`),",
  "V14's request (18) names the field by its path (V14:3177) [OBSERVED]; the substring lies before 967 (e)'s on the same line and does not overlap it. From: new (fix.md G9)."),
]
blocks = []
for id_, f, loc, old, new, ev in NEW:
    t = T13 if f == V13 else T14
    if t.count(old) != 1: problems.append(f"{id_}: old occurs {t.count(old)}x in {f}"); continue
    ln = lineof(t, old); m = md5f(f)
    rec = dict(id=id_, file=f, line=ln, md5=m, old=old, new=new)
    F.append(rec)
    blocks.append(f"**{id_}.** {loc} (edit). Target: `{f}`, line {ln} (md5 `{m[:8]}…`) as it stands now.\n*Current text (as it stands now):*\n{bq(old)}\n*New text:*\n{bq(new)}\n*Evidence:* {ev}\n")
# order: keep item order — move the new records right after 971 (c)
ids = [r['id'] for r in F]
newrecs = [r for r in F if r['id'] in ('971 (d)', '971 (e)', '971 (f)')]
F = [r for r in F if r['id'] not in ('971 (d)', '971 (e)', '971 (f)')]
k = [r['id'] for r in F].index('971 (c)') + 1
F = F[:k] + newrecs + F[k:]
anchor = "\n\n**972.** **"
if MD.count(anchor) != 1: problems.append('972 anchor')
else: MD = MD.replace(anchor, "\n" + "\n".join(blocks) + anchor, 1)

# ======================================================================= G8 the heads, the header counts
mdsub("**956.** **The records: `Trod` and `TrodJunction` beside", "**956.** **The records: `Trod` and `WorldJunction` beside", 'G8')
mdsub("**962.** **The budgets: the W7c row 25 / 50 / 100 ms, the totals 755 / 2 950 / 6 800 ms,", "**962.** **The budgets: the W7c row 30 / 60 / 120 ms, the totals 760 / 2 960 / 6 820 ms,", 'G8')
mdsub("the total row sums the rows (V13:3594); W7c adds 25 / 50 / 100 ms,", "the total row sums the rows (V13:3594); W7c adds 30 / 60 / 120 ms,", 'G8')
mdsub("M-W2 at 9 pw carries A, B and C; the staged row 38–46;", "M-W2 at 10 pw carries A, B and C and the junction ends; the staged row 39–47;", 'G8')
mdsub("V13's row, the staged row 38–46, the V13 Q5 row", "V13's row, the staged row 39–47, the V13 Q5 row", 'G8')
mdsub("rough patches, touch points, Urquhart candidates, the lay,", "rough patches, touch points, Urquhart candidate edges, the lay,", 'G10')
mdsub("**971.** **The record: `WorldRoute`'s two ends each a settlement or a `WorldJunction` (the approach road's `join` superseded); the route's identity by its ends' lineages.**",
      "**971.** **The record: `WorldRoute`'s two ends each a settlement or a `WorldJunction` (the approach road's `join` superseded, and the three lines that named it); the route's identity by its ends' lineages.**", 'G9')
from collections import Counter
c = Counter(r['file'] for r in F); n = len(F)
mdsub("Twenty-one items, **110 fragments** — `docs/volumes/V13-world.md` 80, `docs/volumes/V14-sites.md` 5,",
      f"Twenty-one items, **{n} fragments** — `docs/volumes/V13-world.md` {c[V13]}, `docs/volumes/V14-sites.md` {c[V14]},", 'G9')
mdsub("Checked by script before this file was written (`synth-scripts/build2.py`, from the v1 machine copy and this run's patches; re-checked from the machine copy alone by `synth-scripts/check_json.py`):",
      "Checked by script before this file was written (`synth-scripts/build2.py`, from the v1 machine copy and this run's patches; re-checked from the machine copy alone by `synth-scripts/check_json.py`; the fix seat's corrections, `fix.md`, applied by `synth-scripts/fix_w.py` and re-checked by `synth-scripts/verify_w2.py`):", 'fix')
def wcl(p): return open(f'{ROOT}/{p}', 'rb').read().count(b'\n')
HRQ = 'docs/HOST-REQUIREMENTS-2026-10-18.md'; INDEX = 'docs/volumes/INDEX.md'; SUMMARY = 'docs/volumes/SUMMARY.md'
for p, w in ((V13, None), (V14, None), (HRQ, None), (INDEX, None), (SUMMARY, None)):
    m = md5f(p)
    pat = re.compile(re.escape(f"`{m}` (") + r"(\d+)" + re.escape(" lines)" if p == V13 else ")"))
    hits = pat.findall(MD)
    if len(hits) != 1: problems.append(f"header count {p}: {len(hits)} hits"); continue
    MD = pat.sub(f"`{m}` ({wcl(p)}" + (" lines)" if p == V13 else ")"), MD, count=1)
mdsub("The targets as they stand now:", "The targets as they stand now (line counts as `wc -l` gives them):", 'G8')

# ======================================================================= the reply
# G1
rsub("A candidate you have not lit, or one at your bottom word, is **drawn for\nnobody**",
     "A candidate you have not lit (no rung yet), or one at a word below your bottom usable one, is **drawn for\nnobody**", 'G1')
rsub("it draws your bottom word as \"not lit\" (§5).", "it draws a trod with no rung yet, or at a word below your bottom usable one, as \"not lit\" (§5).", 'G1')
rsub("words in order through the adapter folder's grade-ladder table, your bottom word first;",
     "words in order through the adapter folder's grade-ladder table, bottom first, your bottom usable word named;", 'G1')
rsub("with your bottom word implied until your first `way_rung` lights it;", "with no rung until your first `way_rung` lights it;", 'G1')
rsub("a trod you have not lit, or one at your bottom\nword, is drawn for nobody",
     "a trod you have not lit (no rung yet), or one at a word below your bottom\nusable one, is drawn for nobody", 'G1')
rsub("(0.6 px at the first step above the bottom — your `hidden` —, 0.8 at the second, 1.0 at the third and above)",
     "(0.6 px at your bottom usable word — your `hidden` —, 0.8 at the next word up, 1.0 at the third and above)", 'G1')
rsub("a revealed trod at your bottom word stays undrawn\nuntil you light it",
     "a revealed trod with no rung yet, or at a word below your bottom usable one, stays\nundrawn until you light it", 'G1')
rsub("The map draws by the word's step on that ladder (§5): step 0\ndrawn for nobody, step 1 the trod's thinnest cue, step 2 and 3+ heavier — never a road's cue.",
     "The map draws by the word's step on that ladder (§5): no rung yet,\nor a word your table places below your bottom usable one, drawn for nobody; your bottom usable word the trod's thinnest\ncue (0.6 px), the next word up 0.8 px, the third and above 1.0 px — never a road's cue. Under your recorded ladder that\nreads `hidden` 0.6, `track` 0.8, `road` and `highway` 1.0 [INFERRED from FPI:98]; for a way to be \"lost to the wild\"\nyour table needs a word below `hidden` (your `wild`), or the way stays at `hidden`.", 'G1')
rsub("Every trod W7 (13) lays is a candidate at your bottom word until you light it",
     "Every trod W7 (13) lays is a candidate with no rung until you light it", 'G1')
rsub("is your `way_rung` back to the bottom word:", "is your `way_rung` to a word below your bottom usable one (your `wild`):", 'G1')
rsub("your bottom word named, a candidate the map laid lit by its first rung", "your bottom usable word named, a candidate the map laid lit by its first rung", 'G1')
rsub("read as a rung\n   change to your bottom word, not a deletion", "read as a rung\n   change to a word below your bottom usable one, not a deletion", 'G1')
# G7
rsub("highway|road|track|hidden, FPI:98 [STATED], with neither `trail` nor `wild` in any note [OBSERVED]):",
     "highway|road|track|hidden, FPI:98 [STATED]; neither `trail` nor `wild` appears as a word of your recorded grade\nladder (FPI:98, 99; TRD:636) — `wild` in your notes is the map's unclaimed land, `trail` the map's class in your mapping\nrows [OBSERVED]):", 'G7')
rsub("`trail` and `wild` are in no recorded\n   note [OBSERVED] —",
     "neither `trail` nor `wild` appears as a word of\n   your recorded grade ladder (FPI:98, 99; TRD:636) — `wild` in your notes is the map's unclaimed land, `trail` the map's\n   class in your mapping rows [OBSERVED] —", 'G7')
# G13
rsub("the pin sits at the part's midpoint, captioned \"as far as n effort-metres from a\" (or b), and the part is",
     "the pin sits at the part's midpoint, captioned \"from a as far as station n\" or \"from b back to station n\" (the\nstation from `a` in either case), and the part is", 'G13')
# G2 (the reply's §5 part sentence)
rsub("and the\nparty then sees that part only — the rest absent, never greyed;",
     "and the\nparty then sees that part only — the rest absent, never greyed: its picture, `mapFeed` and exports carry the polyline\ncut at the station and the near junction only, no far junction and no length or effort;", 'G2')
# G3 (the reply's never-show list)
rsub("an unknown trod's line, name, length, junction tick or count;",
     "an unknown trod's line, name, length, junction tick or count; a junction ring, a junctions-export row or a\n`placeOf` arm where only an unknown or unlit trod meets a road;", 'G3')
# G6 (the reply's hidden road paragraph)
rsub("your reveal through the party's places (the edge key a place's address, V14:791–796) admits it for a player, drawn as a\ntrod at the first step (the trod cue, never a road's);",
     "your reveal through the party's places (the edge key a place's address, V14:791–796) admits it for a player, drawn by\nthe `trods` layer as a trod at the first step (the trod cue, never a road's; the layer's toggle and export rule) — the\nroad reads `secret` while hidden, a knowledge event naming it with no fraction is placed at its midpoint vertex, and a\nrevival restores `public` (items 956 (f), (i), 961 (a), (b), 974 (a));", 'G6')
# G16
rsub("Who may walk either is your stance rule (REQ:15), never a class word of the map's.",
     "Who may walk either is your stance rule (REQ:15), never a class word of the map's. Behaviour 1 (bodies by stance) needs\nnothing from the map beyond the record: no class word, no band, no stance field — your rule over your own facts.", 'G16')
# G17
rsub("else its own road; the unjoined seat's trail (V13:1792–1793) is the same rule with no bound, its far end typed at last.",
     "else its own road (a seat already on a road gets its own road only when the way round by the network exceeds the bound,\nelse none: never a zero-length road); the unjoined seat's trail (V13:1792–1793) is the same rule with no bound, its far\nend typed at last. The standalone fork rule lays seat-to-junction roads only: a junction-to-junction link is your charter\n(both ends junctions) or a worn trod's road — the map's own selection mints none.", 'G5, G17')
# G18
rsub("A trod is `dmOnly` at\nbirth; the DM reveals it by one `setAttr` on its secret state,",
     "A trod is `dmOnly` at\nbirth; the DM finds any trod's id — an unlit candidate's too, which no picture draws — in the trod record's listing\n(every candidate is there with its junctions and kind) and its reason by `whyTrod` [INFERRED from items 956 (e), 960\n(c)], and reveals it by one `setAttr` on its secret state,", 'G18')
# G19
rsub("plus a search over the laid routes' cells) stays inside the W7a + W7b row [INFERRED].",
     "plus a search over the laid routes' cells) is a term of the W7a + W7b row — 8 ns × the cells its searches touch per\nseat — the row's figures PLAUSIBLE until the spike's rerun counts it (item 962 (a)) [INFERRED].", 'G19')
# G10 (the reply's density table)
rsub("candidate junctions along one road no closer than 3 km", "touch points (possible junctions) along one road no closer than 3 km", 'G10')
# fragment count
rsub("(items 955–975, 110 fragments; the machine copy `draft-w.fragments.json`)", f"(items 955–975, {n} fragments; the machine copy `draft-w.fragments.json`)", 'G9')

if problems:
    print('PROBLEMS:'); [print(' -', p) for p in problems]; sys.exit(1)
json.dump(F, open(f'{DIR}/draft-w.fragments.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
open(f'{DIR}/draft-w.md', 'w', encoding='utf-8').write(MD)
open(REPLY, 'w', encoding='utf-8').write(RP)
print('OK', n, 'fragments', dict(c)); print('changed', len(CHANGED), sorted(CHANGED))
