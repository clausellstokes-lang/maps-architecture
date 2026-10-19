#!/usr/bin/env python3
"""synthesis-2 (the correction run, J415/J416): rebuilds draft-w.fragments.json and draft-w.md from the v1 JSON
(draft-w-v1.fragments.json, 96 records) plus this file's patches — substitutions on touched items' new texts, one
re-anchoring (959 (b)), and the new items 970–975 — and checks every fragment as build.py did: old found exactly once
in its target and starting on the stated line; no overlap per target; applied in order to copies each old found once at
its turn and each new once after; reversal restores the copies byte-for-byte. Locators and evidence lines of the
unchanged fragments are parsed from draft-w-v1.md."""
import hashlib, json, os, re, sys
from collections import Counter
ROOT = '/home/user/maps-architecture'
DIR = f'{ROOT}/docs/validation/hidden-ways-2026-10-18'
V13 = 'docs/volumes/V13-world.md'; V14 = 'docs/volumes/V14-sites.md'; HRQ = 'docs/HOST-REQUIREMENTS-2026-10-18.md'
INDEX = 'docs/volumes/INDEX.md'; SUMMARY = 'docs/volumes/SUMMARY.md'
TEXT = {}
def text(f):
    if f not in TEXT: TEXT[f] = open(f'{ROOT}/{f}', encoding='utf-8').read()
    return TEXT[f]
def lines(f): return text(f).split('\n')
def line(f, n): return lines(f)[n-1]
def md5(s): return hashlib.md5(s.encode('utf-8')).hexdigest()
problems = []

# ---------------------------------------------------------------- the v1 fragments and their locators/evidence
base = json.load(open(f'{DIR}/draft-w-v1.fragments.json', encoding='utf-8'))
FR = []
for r in base:
    m = re.match(r'(\d{3}) \(([a-z])\)', r['id'])
    FR.append(dict(item=int(m.group(1)), letter=m.group(2), file=r['file'], line=r['line'], old=r['old'], new=r['new'], locator=None, evidence=None))
BYID = {f"{fr['item']} ({fr['letter']})": fr for fr in FR}
old_md = open(f'{DIR}/draft-w-v1.md', encoding='utf-8').read().split('\n')
TITLES = {}
cur = None
for i, l in enumerate(old_md):
    m = re.match(r'^\*\*(\d{3})\.\*\* \*\*(.*)\*\*$', l)
    if m: TITLES[int(m.group(1))] = m.group(2); continue
    m = re.match(r'^\*\*(\d{3} \([a-z]\))\.\*\* (.*?) \((insertion|edit)\)\. Target:', l)
    if m: cur = m.group(1); BYID[cur]['locator'] = m.group(2); continue
    if l.startswith('*Evidence:* ') and cur: BYID[cur]['evidence'] = l[len('*Evidence:* '):]; cur = None
for k, fr in BYID.items():
    assert fr['locator'] and fr['evidence'], k

# ---------------------------------------------------------------- substitutions on touched new texts
REV = " Revised by the correction run (synthesis-2, 2026-10-19; `synthesis.md` §4): "
def sub(id_, pairs, note):
    fr = BYID[id_]; s = fr['new']
    for o, n in pairs:
        c = s.count(o)
        if c != 1: problems.append(f"sub {id_}: {o[:60]!r} occurs {c}×"); continue
        s = s.replace(o, n, 1)
    fr['new'] = s; fr['evidence'] += REV + note

sub('955 (a)', [
 ("file w, items 955–969; J407)", "file w, items 955–975; J407; the host's correction of the same evening and the owner's word of 2026-10-19, J415, J416)"),
 ("each joining two junctions on the overt network; the trod record as the", "each joining two junctions on the overt network — the one junction record, `WorldJunction`, by the owner's word of\n> 2026-10-19 an end a road may have too (roads that join, fork or diverge; W7 (14)) —; the trod record as the"),
 ("settlement by the host's dated event; no patrol cadence on a trod; a decayed road never a trod and no trod born where a\n> road dies. Changed:", "settlement by the host's dated events (learned, forgotten; whole or as far as a station); no patrol cadence on a trod;\n> one ladder: a trod carries the host's ladder word as its `grade`, moved only by the host and drawn by its step (for nobody\n> at the bottom), a road the host grades hidden is drawn under the trod rule on its own record, the map lays no road from a\n> word and mints no trod where a road dies. Changed:"),
 ("§2.2 (`Trod`, `TrodJunction`, `WorldWhere`, `WorldEvent`)", "§2.2 (`Trod`, `WorldJunction`, `WorldRoute`'s ends, `RouteGenesis`, `NetworkChange`, `TimeDeltaReceipt`, `WorldWhere`, `WorldEvent`)"),
 ("§2.3 (`world.trod`)", "§2.3 (`world.trod`, `world.routeLay`'s fork cells)"),
 ("§3.8 (13), §3.9", "§3.8 (5), (11), (12), (13), (14), §3.9"),
 ("§7 (T-V13-59, 60)", "§7 (T-V13-57, 59 – 61)"),
 ("J-V13.114 – 128", "J-V13.114 – 133"),
], "the block names the correction (one ladder, the three events, the part) and the owner's word of 2026-10-19 (the junction ends, W7 (14)); the section list extended.")

sub('955 (b)', [
 (" a trod is never promoted to a route and no trod is born where a road dies.", " a trod is never promoted, lit or retired by the map (the host's ladder word is its `grade`, moved only by the host's rung events, V13 §3.8 (13) (i)) and no trod is minted where a road dies: a road the host grades hidden is the same rung on its own record, drawn under the trod rule."),
], "the closing clause re-stated for the host's corrected §D (one ladder; the map gives the candidates, the host the life).")

sub('955 (c)', [
 ("*hidden* is the host's grade of an overt road only: a trod is never graded and a hidden road never a trod.", "*hidden* is the host's word for the bottom usable rung of its one road ladder, carried as a `grade` on a route and on a trod alike (the host's *rung* is the map's *grade*: *rung* is this volume's size, prosperity and ladder word), written only by the host; a hidden road is drawn under the trod rule and stays its own record; a road's end may be a *junction* too (the owner's word of 2026-10-19; W7 (14)), never a *fork* (the counterfactual fork's word)."),
], "law (9) re-stated: `hidden` the bottom usable grade on either record kind; `rung` TAKEN (V13:800, 1774, 1936, 3319, 3728), `fork` TAKEN (V13:3812, 3821).")

sub('955 (d)', [
 ("· way · hidden · trod (V13 §5.8 (6); file w: *way* is the settlement frame's `WayClass`, *trod* a hidden edge of the map's own, *hidden* the host's grade of an overt road only)", "· way · hidden · trod · rung · fork (V13 §5.8 (6); file w: *way* is the settlement frame's `WayClass`, *trod* a hidden edge of the map's own, *hidden* the host's bottom usable grade on a route or a trod, *rung* the size or prosperity rung — a trod's ladder word is its *grade* —, *fork* the counterfactual fork, never a junction)"),
], "two more collision words: `rung` and `fork` [OBSERVED counts in `synthesis.md` §4.0].")

sub('955 (e)', [
 ("*hidden* is the host's road grade only (a lens is *still*, a site's or a trod's secret *DM-only*), a hidden way a *trod* (never a *way*, the settlement frame's), its end a *junction* (file w);", "*hidden* is the host's bottom usable grade on a road or a trod (a lens is *still*, a site's or a trod's secret *DM-only*), a hidden way a *trod* (never a *way*, the settlement frame's), its end a *junction* — a road's end too, by the owner's word of 2026-10-19 —, a trod's ladder word its *grade* (never its *rung*, the size and prosperity word), *fork* the owner's prose only (file w);"),
], "the legend's collision prose gains `rung` and `fork`.")

sub('956 (a)', [
 ("a kind word, the party's secret state; `TrodJunction` its typed end — file w, W7 (13))", "a kind word, the host's ladder word as its `grade`, the party's secret state; `WorldJunction` its typed end, the one junction record a route's end may be too — file w, W7 (13), (14))"),
], "the wiring row names the grade and the shared junction record.")

sub('956 (c)', [
 ("for the DM every trod with V14 §5.1's state cue, for a player only a revealed or discovered one (V13 §5.1)", "for the DM every trod the host has lit with V14 §5.1's state cue at its grade's step, for a player only a revealed or discovered lit one; a candidate the host has not lit, or at its bottom word, for nobody (V13 §5.1)"),
 ("the DM's hover caption (its kind and length)", "the DM's hover caption (its kind, length and grade word)"),
], "the entity row draws by grade: a candidate for nobody.")

BYID['956 (e)']['new'] = """— read by the charter's `roads`, W8b (14)'s patrol source, the clerk and the view
interface Trod {                             // W7 (13); file w: a hidden edge of the map's own geography — never a WorldRoute, never a host edge (J-V13.115)
  id: Id; a: Id; b: Id /* its two ends: WorldJunction ids — each a point on a public land route's polyline, shared where another trod or a road ends there; never a seat id, never a host key */;
  kind: 'goat'|'drove'|'broad' /* the width/kind hint: world.trod's kind rows (V13 §2.3), the first the laid path's ground matches — goat: single file (the host's goat path and game trail), drove: beasts driven abreast (its drover's way), broad: cart-wide (its old road); the host derives its size band from the word, the row's widthM and the stretches' classes — the map records no band */;
  grade?: string /* bound: the host's ladder word for the trod — the same host fact a route's `grade` carries, mirrored, never computed — written only by the host's rung event of the events window (W7 (13) (i)) through the adapter folder's grade-ladder table (the host's words in ladder order, bottom first), never by a lay (a re-lay keeps it); a candidate the host has not lit reads as the host's bottom word and is drawn for nobody (V13 §5.1); absent on a standalone world, where every trod draws as the map's own; never in the trod record (no echo of a host fact) */;
  polyline: WorldPointCm[]; stations: Int32Array /* per vertex: cumulative effort-metres from `a` under the cost law's time terms — the unit a settlement's partial knowledge names (WorldWhere.asFarAs) */; vertexClass: Uint8Array /* per segment: the host's terrain class through the adapter folder's class table */;
  lengthM: number; effortM: number /* integers */; roughShare: number /* the share of its length in rough country (world.trod's rough rows), 0–1: the clerk's */; layVersion: number /* bumped by every re-lay; the former course kept as a version */;
  seedCell: number /* the fine cell of its first-laid course's midpoint vertex: its identity (V13 §2.5), which no re-join moves */; landmass: number;
  secret: SecretState /* V14 §2.3's three states, the record's only map-owned knowledge: dmOnly at birth; revealed by the DM's setAttr on trod/secret/state or the host's reveal through the party's places (the trod's id a place's address there, whole or with a part); discovered by the host's event or the DM's mark. A settlement's knowledge of a trod is never on the record and never changes this state: it is the host's dated events — learned and forgotten, whole or as far as a station — the latest per settlement and trod (V13 §3.8 (13)) */;
  reason: Id /* computed on demand (whyTrod, V13 §4.7) from its patch's record, never stored: a generated trod is rebuilt on load (V13 §2.7) */ }
interface WorldJunction { id: Id; at: WorldPointCm /* a point on the route's polyline */; route: { id: Id; hostKey?: string /* bound: the host's edge key */; stationM: number /* integer effort-metres from the route's `a` */ };   // file w: the one junction record — a trod's end, a route's end (W7 (14); the owner's word of 2026-10-19: roads that join, fork or diverge) or a crossing; the approach road's former `join`
  arms: { trod?: Id; route?: Id /* exactly one: the trod, or the route (a host edge with a junction end, a standalone fork, an approach road), that ends or crosses here */; stationM: number /* integer effort-metres from the arm's `a`: 0 or its effort at an end, between at a crossing */ }[] /* sorted by trod id, then route id */;
  kind: 'end'|'crossing' /* end: an arm's end on the route — a trod's, or a road's; crossing: a public route chartered later across a trod's course (W7 (13) (g)) */;
  nearSeat?: { placement: Id; hostKey?: string } /* the placed settlement whose frame's margin ring lies within world.trod's lay.gateBandM: "at its town gate" for placeOf and the hearing card, with no seat end and no frame point (door 1) */ }   // the hearing card's `junction` place (WorldWhere); nothing sight-related is on it; a seat end is a seat, never a junction"""
BYID['956 (e)']['evidence'] += REV + "`Trod.grade` added (the host's ladder word, the field and law of `WorldRoute.grade`, V13:788, 1811); `TrodJunction` renamed and generalized to `WorldJunction`, the one junction record a route's end may be (the owner's word of 2026-10-19, J416; 0 whole-word hits [OBSERVED]); the knowledge clause names the two events and the part."

sub('956 (f)', [
 ("placed at fold at the trod's midpoint vertex or the junction's point, likewise recorded;", "placed at fold at the trod's midpoint vertex — the known part's midpoint where `where.asFarAs` names one — or the junction's point, likewise recorded;"),
], "the part's midpoint (the host's c3).")

sub('956 (g)', [
 ("a trod's learning's (how a settlement came to know a trod, V13 §3.8 (13)) — by the adapter folder's vocabulary table, when sent */", "a trod's learning's (how a settlement came to know a trod — any of the host's how-words, a warden's office among them, V13 §3.8 (13)) — by the adapter folder's vocabulary table, when sent */; grade?: string /* file w: a trod's rung event — the host's ladder word the trod holds from this week, by the adapter folder's grade-ladder table, folded onto `Trod.grade` (V13 §3.8 (13) (i)); on no other kind */"),
], "the office how-word (REQ:33 c1) needs nothing but the table; `WorldEvent.grade` added for the rung event (REQ:35 `way_rung`).")

sub('956 (h)', [
 ("trod: a point along a trod (`trod` with `fraction`); junction: a trod's junction (`junction`) — W7 (13);", "trod: a point along a trod (`trod` with `fraction`), or the part of it a settlement knows (`asFarAs`); junction: a `WorldJunction`, a trod's or a road's (`junction`) — W7 (13), (14);"),
 ("seat?: string; edge?: string; trod?: Id; junction?: Id;", "seat?: string; edge?: string; trod?: Id; junction?: Id; asFarAs?: { from: 'a'|'b'; stationM: number } /* file w: the part of a trod (or of a road the host grades hidden) from the named end as far as the station, in integer effort-metres from `a` — the record's own unit: a settlement's partial knowledge, read against the lay in force at the event's week and drawn as that part only (V13 §3.8 (13), §5.1) */;"),
], "`asFarAs` for the host's c3 (REQ:33), in the record's station unit (`Trod.stations`); a junction place now a road's junction too.")

sub('956 (i)', [
 ("and a settlement's knowledge of one is the host's dated event, never the record's;", "and a settlement's knowledge of one is the host's dated events (learned and forgotten, whole or as far as a station), the latest per settlement and trod, never the record's, while the trod's `grade` is the host's ladder word mirrored as a route's grade is;"),
], "the lapse and the part (REQ:33 c2, c3); the grade as a host fact.")

sub('957 (b)', [
 ("the continent's coarser cell at most ≈ 7 200 in all) / 12 / 3 000 |", "the continent's coarser cell at most ≈ 7 200 in all; every trod laid is a candidate in the trod record, lit by the host's rung events, W7 (13) (i)) / 12 / 3 000 |"),
], "every candidate (REQ:35 Q8) is the asked count.")

sub('958 (a)', [
 ("| a trod junction (`TrodJunction`) | the world root | (`junction`, the joined route's lineage, its fine cell) — a re-lay of the route that keeps the cell keeps the junction; one that moves it re-joins within `rejoinM` keeping the id by the anchor below (V13 §3.8 (13) (g)) |", "| a junction (`WorldJunction`: a trod's end, a road's end by W7 (14), or a crossing) | the world root | (`junction`, the lineage of the route it sits on, its fine cell) — a re-lay of that route which keeps the cell keeps the junction; one that moves it re-joins the map's own arms within `rejoinM` keeping the id by the anchor below, and leaves a host route's arm where the host put it (V13 §3.8 (13) (g), (14) (c)) |"),
], "the one junction record's identity, shared by routes and trods.")

sub('958 (c)', [
 ("the former course a lay version; tombstoned `W_TROD_UNJOINED`, or by a road along its course", "the former course a lay version; its `grade` written only by the host's rung event, never by a lay (a re-lay keeps it); tombstoned `W_TROD_UNJOINED`, or by a road the host charters along its course between its two junctions"),
 ("**veil:** `dmOnly` at birth — absent from every party surface, never greyed; a settlement's knowledge the host's dated event |", "**veil:** `dmOnly` at birth — absent from every party surface, never greyed; drawn for nobody while the host has not lit it; a settlement's knowledge the host's dated events, the latest per settlement |"),
], "the grade in the lifecycle row; the candidate's veil.")

sub('958 (e)', [
 ("only a trod's secret state that is not `dmOnly` is a record (≈ 20 B), so 200–2 000 trods", "only a trod's secret state that is not `dmOnly` is a record (≈ 20 B) — the host's rung, knowledge and forgetting rows are events of the recorded events store, never on the rebuilt trod —, so 200–2 000 trods"),
], "the host's events are the events store's, not the trod's.")

sub('959 (a)', [
 ("| `WorldRoute`s (the approach roads among them), the `routes` layer | none | the world root | F-WORLD (no path) | \" |\n| W7c Trods", "| `WorldRoute`s (the approach roads and the junction-ended routes among them), the `WorldJunction`s of their junction ends (W7 (14); file w), the `routes` layer | none | the world root | F-WORLD (no path) | \" |\n| W7c Trods"),
 ("| `Trod`s, `TrodJunction`s, the `trods` raster layer |", "| `Trod`s, `WorldJunction`s, the `trods` raster layer |"),
], "W7b's row names the junction ends; the record renamed.")

# 959 (b): re-anchored at (12)'s last line (V13:1873) so that W7 (14) (item 970 (c)) can take the Output line
fr = BYID['959 (b)']
blk, outp = fr['new'].split('\n\n*Output:*', 1)
assert blk.startswith('13. **Trods')
for o, n in [
 ("a `TrodJunction` of kind `crossing` added", "a `WorldJunction` of kind `crossing` added"),
 ("when the trod is tombstoned: a road born supersedes a trod, never the reverse; a trod whose patch", "when the trod is tombstoned, its junctions kept as the road's ends and arms: a road the host charters along a trod\n   supersedes it — the host's one way of making a road of a worn trod, its two junctions lawful ends ((14)) and the\n   trod's course its `via` hint ((9)); a trod whose patch"),
 ("A demotion keeps the road's polyline ((9)), so a junction on a road graded hidden stays; the map never\n   promotes a trod (no `network` change word names one, and a trod has no class to edit), mints no trod where a road\n   dies (a road the host grades hidden is the host's own edge, the overgrown way its ledger describes, with its own key:\n   two records would name one thing; and a trod's law is cover, not history), and turns no decayed road into a trod.\n   Every other trod",
  "A demotion keeps the road's polyline ((9)), so a junction on a road graded hidden stays.\n   Every other trod"),
 ("**Knowledge:** a trod is `dmOnly` at birth — absent from every\n   party surface until the DM reveals it (`setAttr` on its secret state) or the host does through the party's places\n   (V14 §2.3; the three states the record's only map-owned knowledge); a settlement's knowledge of a trod is the\n   host's — a dated `WorldEvent` of the events window whose `where` is the trod, whose `seats` name the knowing seat and\n   whose `cause` is the host's how-word, with its resolved audience, retracted by the windowed replace — drawn by the\n   `events` layer as the knowing seat's pin where the trod draws for the audience (V13 §5.1), and never a change of\n   the trod's secret state. The map draws and never decides; no knowledge enters any simulator product.",
  "**Knowledge:** a trod is `dmOnly` at birth — absent from every\n   party surface until the DM reveals it (`setAttr` on its secret state) or the host does through the party's places\n   (V14 §2.3; the three states the record's only map-owned knowledge; a reveal may name a part of the trod, which is\n   then the part admitted); a settlement's knowledge of a trod is the host's — dated `WorldEvent`s of the events\n   window whose `where` is the trod (whole, or a part of it by `asFarAs`, in integer effort-metres from an end), whose\n   `seats` name the seat and whose `cause` is the host's how-word (any word of its vocabulary table, a warden's office\n   among them), with its resolved audience: a learning event, and a forgetting event when the knowledge lapses; the\n   settlement's knowledge at a week is the latest of the two per (seat, trod) at or before it, a fold over the recorded\n   events store (the windowed replace's retraction stays the host's undo and resume path, never the lapse) — drawn by\n   the `events` layer as the knowing seat's pin, from the learning event's week until a forgetting event's, where the\n   trod draws for the audience (V13 §5.1), and never a change of the trod's secret state; a part is read against the\n   lay version in force at the event's week and carried over a re-laid course by the share of the trod's effort it\n   covered until the host sends a fresh row. (i) **One ladder, the host's (the host's corrected request of 2026-10-18\n   evening):** a trod carries the host's ladder word as `grade` (V13 §2.2), written only by the host's rung event of the\n   events window (its `where` the trod, its `grade` the word, through the adapter folder's grade-ladder table — the\n   host's words in ladder order, bottom first) and folded as a route's grade is ((9)); a trod the host has not lit reads\n   as the bottom word; the map never promotes, demotes, lights or retires a trod (no `network` change word names one;\n   the refusal of a grade edit on a host route, (9), covers a trod's grade), lays no road from a word — a trod at any\n   word stays a trod, no public route to any reader of roads, drawn by its word's step (V13 §5.1: the bottom for nobody)\n   — and mints no trod where a road dies: a road the host grades hidden is the same rung on its own record (its key,\n   polyline and lay versions untouched), drawn under the trod rule (V13 §5.1: the host's knowledge events naming it by\n   its edge, its reveal through the party's places, its ghost the routes layer's), two records never naming one thing;\n   a trod's law is cover, not history; every trod laid is a candidate in the trod record, lit by its first rung event\n   and never minted anew; on a standalone world no host sends a word and `grade` is absent. The map draws and never\n   decides; no knowledge and no grade enters any simulator product."),
]:
    c = blk.count(o)
    if c != 1: problems.append(f"959 (b) block: {o[:60]!r} occurs {c}×")
    blk = blk.replace(o, n, 1)
fr['line'] = 1873; fr['old'] = line(V13, 1873); fr['new'] = fr['old'] + '\n' + blk
fr['locator'] = "Volume 13 — §3.8 W7 (insertion of item (13) after (12)'s last line; item (14) and the *Output* line are item 970 (c)'s)"
fr['evidence'] += REV + "re-anchored at (12)'s last line (V13:1873) so that W7 (14) takes the *Output* line (970 (c)); (g) re-written for one ladder (the trod superseded only by the host's charter along it; nothing minted where a road dies); the **Knowledge** paragraph gains the forgetting event, the part and the fold's rule; (i) added — the host's ladder word as `grade`, the map never moving it (REQ:35 d1–d5; V13:788, 1811, 1817)."

sub('959 (e)', [
 ("W7 (13)'s trods whose junction lies on it (file w)", "W7 (13)'s trods and W7 (14)'s junction-ended routes whose junction lies on it (file w)"),
], "the junction-ended routes among the consumers.")
sub('959 (f)', [
 ("its secret state kept where it survives (W7 (13) (g)) |", "its secret state and its grade kept where it survives (W7 (13) (g)); a host route ending at a junction on the removed route keeps its geometry and its junction's point, reported `W_ROUTE_JUNCTION_ORPHAN`, while a standalone fork re-joins as the approach road does (W7 (14) (c)) |"),
], "the lifecycle by origin (W7 (14) (c)).")
sub('959 (k)', [
 ("W7a, W7b ≤ Σ over edges of the search ellipse's cells; W7c ≤", "W7a, W7b ≤ Σ over edges of the search ellipse's cells + Σ over seats of the route set's cells ((14)'s fork test, the search (5)'s trail uses); W7c ≤"),
], "the fork test's work inside W7a/W7b's law.")

sub('960 (c)', [
 ("every trod in force at the log head — its id, its two junction ids, its kind word,", "every trod in force at the log head, lit or not (every candidate the density rule admits; the host's rungs are its own and never echoed back) — its id, its two junction ids, its kind word,"),
 ("the trods meeting there with their stations, and the host key", "the trods, and the host's routes, meeting there with their stations, and the host key"),
 ("no polyline (geometry rides the map feed), no knowledge, no raster index", "no polyline (geometry rides the map feed), no knowledge, no grade, no raster index"),
], "every candidate in the record (REQ:35 Q8), no grade (no echo of a host fact, V13:2437).")

sub('960 (d)', [
 ("each in the audience its secret state admits (a player audience only a revealed or discovered trod, the DM audience every trod with its state; V13 §5.1; file w)", "each in the audience its secret state and its grade admit (a player audience only a revealed or discovered trod the host has lit, the DM audience every lit trod with its state and grade word; a candidate the host has not lit in neither; V13 §5.1; file w)"),
], "the map feed draws by grade too.")

sub('960 (f)', [
 ("(a `trod` place by its kind word, the two routes its junctions sit on and the distance from one; a `junction` by its route and the distance from the nearer seat,", "(a `trod` place by its kind word, the two routes its junctions sit on and the distance from one — a part of it, where the `where` names one, by its stations —; a `junction` by its route, its arms (the trods, and the roads ending there by W7 (14)) and the distance from the nearer seat,"),
], "the part and the road's junction.")

sub('961 (a)', [
 ("`Trod`s at the network in force at the view's week by their secret state (V13 §5.8 (7)'s admission over the party's `places`): with the layer on the DM sees every trod with V14 §5.1's state cue at its midpoint", "`Trod`s at the network in force at the view's week by their secret state (V13 §5.8 (7)'s admission over the party's `places`) and by their `grade` — the host's ladder word, W7 (13) (i): a trod the host has not lit, or at its bottom word, is drawn for nobody, absent from the picture, the hover, the labels, the summary and every export, the DM's too, never greyed (it is in the trod record alone); with the layer on the DM sees every lit trod with V14 §5.1's state cue at its midpoint"),
 ("its junctions as ticks on the joined route and its kind and length on hover; a player only a `revealed` or `discovered` trod — an unknown trod absent", "its junctions as ticks on the joined route and its kind, length and grade word on hover; a player only a `revealed` or `discovered` lit trod — an unknown trod absent"),
 ("\"Trods show only where a settlement is known to use one or the game master has revealed one; others may exist.\"", "\"Trods show only where a settlement is known to use one or part of one, or the game master has revealed one; others may exist.\""),
 ("the knowing settlement's mark is the `events` layer's pin | 0.6 px dash-dot in the kind's tint (`style.world` rows `trod.goat`, `trod.drove`, `trod.broad`); the ring cues V14 §5.1's |", "the knowing settlement's mark is the `events` layer's pin, from its learning event's week until a forgetting event's; a part a settlement knows or the party is shown draws as that part only | dash-dot in the kind's tint (`style.world` rows `trod.goat`, `trod.drove`, `trod.broad`) at a width by the grade's step on the host's ladder — 0.6 px at the first step above the bottom, 0.8 at the second, 1.0 at the third and above, a standalone world's trods at 0.6 — never the `routes` row's cues; the ring cues V14 §5.1's |"),
], "the layer draws by grade (the bottom for nobody; the step's width, never a route's cue — O2), the lapse and the part; the legend sentence count-free still.")

sub('961 (b)', [
 ("pinned at its `at` only for an audience the trod draws for, captioned with the seat, the host's cause word and the week;", "pinned at its `at` (the known part's midpoint where `asFarAs` names one) only for an audience the trod draws for, captioned with the seat, the host's cause word, the week and the part; a settlement's knowledge drawn from its learning event's week until a later forgetting event's for the same seat and trod at or before `lensWeek` (the latest per seat and trod, never every past event); a rung event draws no pin (it moves the trod's grade, V13 §3.8 (13) (i));"),
], "the lapse (REQ:33 c2) read at `lensWeek` (V13:3149).")

sub('961 (c)', [
 ("trods (LineString, kind `trod`, with its kind word and its junctions' ids — under the export's admission: a party export carries none its places do not admit; file w)", "trods (LineString, kind `trod`, with its kind word, its grade word and its junctions' ids — under the export's admission and only lit: a party export carries none its places do not admit, no export a trod the host has not lit; file w), junctions (Point, kind `junction`, with its arms; file w)"),
], "a candidate in no export; the junction row.")

sub('962 (a)', [
 ("| 25 ms | 50 ms | 100 ms | ≤ 10 ns × fine cells + 8 ns × Σ ellipse cells over candidates", "| 30 ms | 60 ms | 120 ms | ≤ 10 ns × fine cells (the rough pass: ≈ 10 ms over the province rung's 1.02 × 10⁶ fine cells) + 8 ns × Σ ellipse cells over candidates"),
 ("2 000 trods ≈ 2 × 10⁶ cells ≈ 16 ms; PLAUSIBLE until SP-W7's rerun covers it) |", "2 000 trods ≈ 2 × 10⁶ cells ≈ 16 ms, ≈ 26 ms with the rough pass; the row bears ≈ 2 500 candidates at the province rung, the density rule asking ≈ 800; PLAUSIBLE until SP-W7's rerun covers it) |"),
 ("300 edges at the continent rung ≈ 6 × 10⁷ cells) |\n| W7c", "300 edges at the continent rung ≈ 6 × 10⁷ cells; W7 (14)'s fork test — one Dijkstra to the route set per seat, the trail rule's search — inside the row, file w) |\n| W7c"),
], "the rough pass counted (the delta reader's F35: 2 000 trods ≈ 26 ms, over the 25 ms cell): the row re-declared 30 / 60 / 120; the fork test inside W7a + W7b's row.")
sub('962 (b)', [
 ("**755 ms** (budget 600: **over** — the province row's budget is re-declared at 900 ms, V13 §2.3's cell is data; 730 before W7c, file w) | **2 950 ms** (budget 1 800: **over** — re-declared at 3 000 ms; 2 900 before W7c) | **6 800 ms** (budget 4 500: **over** — re-declared at 7 000 ms; 6 700 before W7c) |", "**760 ms** (budget 600: **over** — the province row's budget is re-declared at 900 ms, V13 §2.3's cell is data; 730 before W7c, file w) | **2 960 ms** (budget 1 800: **over** — re-declared at 3 000 ms; 2 900 before W7c) | **6 820 ms** (budget 4 500: **over** — re-declared at 7 000 ms; 6 700 before W7c) |"),
], "the totals with W7c at 30 / 60 / 120 ms.")
sub('962 (c)', [
 ("(25 / 50 / 100 ms)", "(30 / 60 / 120 ms)"),
], "the register row follows the §6 row.")

sub('963 (a)', [
 ("a route chartered across a trod adds a `crossing` junction and leaves the course byte-identical, one chartered along it tombstones it; a demotion to hidden moves nothing;", "a route chartered across a trod adds a `crossing` junction and leaves the course byte-identical, one chartered along it (its ends the trod's two junctions, its `via` the course) tombstones it and keeps both junctions as the road's ends; a demotion to hidden moves nothing; a rung event from the mock host writes the trod's `grade` and nothing else (polyline, stations, junctions and the record's version byte-identical), one naming a trod the map never laid is refused, no `network` change word moves a trod's grade, a trod at the host's bottom word is drawn for nobody and absent from every export while a lit one draws at its step's width, and a standalone world's trods carry no grade;"),
 ("the trod record (`trods`) is whole or refused, integer, keyless of prose and raster indices,", "the trod record (`trods`) is whole or refused, integer, keyless of prose, grades and raster indices, every candidate in it lit or not,"),
], "the rung cases (REQ:35) and every candidate.")

sub('963 (e)', [
 ("a knowledge event resolved public draws the knowing seat's pin at the trod for the DM and, for a party that does not know the trod, at the seat with the country's words and no line, changing no secret state — one resolved DM-only draws for the DM alone, and a retracted event removes the pin;", "a knowledge event resolved public draws the knowing seat's pin at the trod (at the known part's midpoint where it names one, the part marked on the DM's hover, the legend sentence unchanged) for the DM and, for a party that does not know the trod, at the seat with the country's words and no line, changing no secret state — one resolved DM-only draws for the DM alone; a later forgetting event for the same seat and trod removes the pin from its week on and a re-learning restores it, a scrub to a week between the two draws the pin and one after the forgetting none, and a retracted row removes it as before; a revealed trod the host has not lit draws for nobody and draws for the party once lit; a reveal through the party's places that names a part draws that part only, the rest absent;"),
], "the lapse, the part and the candidate (REQ:33 c2, c3; REQ:35).")

sub('963 (f)', [
 ("| `W_TROD_SPARSE` / `W_TROD_UNJOINED` / `W_TROD_CUT` | warning | W7 (13) (file w) | the patch, the trods asked and laid / the trod and the route its junction lost / the candidates dropped at the work limit |", "| `W_TROD_SPARSE` / `W_TROD_UNJOINED` / `W_TROD_CUT` | warning | W7 (13) (file w) | the patch, the trods asked and laid / the trod and the route its junction lost / the candidates dropped at the work limit |\n| `W_ROUTE_JUNCTION_ORPHAN` | warning | W7 (14) (file w; item 975) | the host route ending at a junction and the removed route its junction sat on |"),
], "the junction-ended route's report code (item 975 rides this line).")

sub('964 (a)', [
 ("W7 (13)'s trods with their junctions, the `trods` raster layer, the party's secret states and the DM's reveal, the port's `trods` record, `routeFacts`' ordered stretches, the `trod` and `junction` places, `hostOverlay`'s movers on trods and the knowledge events' fold (file w); standalone `setSeats` | T-V13-14, 16, 17, 38, 39, 41 – 43, 46, 57 – 60; the B-WORLD statistics bars | 9 pw (file w's trods ≈ 1 pw — W7 (13), the record, the layer, the secret states and T-V13-59 – 60 — on the row's whole-week resolution; J393's",
  "W7 (13)'s trods with their `WorldJunction`s, the `trods` raster layer, the party's secret states and the DM's reveal, the trods' grades folded from the host's rung events, the port's `trods` record (every candidate), `routeFacts`' ordered stretches, the `trod` and `junction` places with `asFarAs`, `hostOverlay`'s movers on trods and the fold of the host's knowledge, forgetting and rung events (file w); the route record's junction ends, the genesis's and charters' junction-end forms, W7 (14)'s fork rule and the routes layer's junction mark (file w; the owner's word of 2026-10-19); standalone `setSeats` | T-V13-14, 16, 17, 38, 39, 41 – 43, 46, 57 – 61; the B-WORLD statistics bars | 10 pw (file w's trods ≈ 1 pw — W7 (13), the record, the layer, the secret states, the three folds and T-V13-59 – 60 — and its junction ends and fork rule ≈ 1 pw — the record's ends, `WorldJunction` shared with the trods, the two port forms, W7 (14), the junction mark and T-V13-61 — on the row's whole-week resolution; J393's"),
], "M-W2 at 10 pw: the correction's folds inside the trods' week; the junction ends and the fork rule one more (h5).")
sub('964 (b)', [
 ("38–46 pw (37–45 before file w's trods, ≈ 1 pw on M-W2)", "39–47 pw (37–45 before file w, ≈ 2 pw on M-W2: the trods ≈ 1, the junction ends and the fork rule ≈ 1)"),
], "the staged row at 39–47.")
sub('964 (c)', [
 ("(a) its knowledge of a trod per settlement sent as a dated event of the events window — the knowing seat, the trod's id, its how-word through the adapter folder's vocabulary table, the week, the resolved audience (DM-only where unresolved) — and retracted by the windowed replace when its ledger forgets;", "(a) its knowledge of a trod per settlement sent as a dated event of the events window — the knowing seat, the trod's id (whole, or as far as a station from a named end), its how-word through the adapter folder's vocabulary table (any word, a warden's office among them), the week, the resolved audience (DM-only where unresolved) — and its lapse as a second dated event of the same window (the seat, the trod, the week), the map reading the latest of the two per settlement and trod;"),
 ("(f) its register rows for `trod`, `junction` and the kind words `goat`, `drove`, `broad`, `hidden` kept for its grade and `way` minted on neither side;", "(f) its register rows for `trod`, `junction` and the kind words `goat`, `drove`, `broad`, its ladder words kept as its grades and sent in order, bottom first, through the adapter folder's grade-ladder table with its bottom usable word named, `way` minted on neither side;"),
 ("(h) its reveal of a trod to the party through the party's places, as a site's |", "(h) its reveal of a trod to the party through the party's places, as a site's, whole or as far as a station; (i) each trod's rung as a third dated event of the events window (the trod, its ladder word, the week), a candidate the map laid lit by its first such event and nothing minted, a road it wants of a worn trod chartered between the trod's two junctions with the trod's course as the hint; (j) a junction end in its genesis edges and its charters — a point on one of its own edges by key and station, or a world point the map snaps within `routeToleranceM` — and forks derived where appropriate (the owner's word of 2026-10-19), a junction-ended edge composing no leg of its time receipt |"),
], "H32 extended by the lapse, the part, the office, the rung (i) and the junction ends (j).")

sub('965 (a)', [
 ("chose **a record of its own kind, `Trod` with `TrodJunction` ends**,", "chose **a record of its own kind, `Trod` with `WorldJunction` ends — the one junction record a route's end may be too (J-V13.130)**,"),
 ("on, the DM sees every trod with V14 §2.3's cue and a player only a revealed or discovered one; off, nothing**,", "on, the DM sees every trod the host has lit with V14 §2.3's cue at its grade's step and a player only a revealed or discovered lit one, a candidate the host has not lit for nobody (J-V13.129); off, nothing**,"),
 ("chose **knowledge per settlement as the host's dated event in the events window, drawn and never decided by the map,", "chose **knowledge per settlement as the host's dated events in the events window — a learning event and a forgetting event, the latest per settlement and trod the town's knowledge, whole or as far as a station —, drawn and never decided by the map,"),
 ("| J-V13.124 | **(file w.)** chose **a road born along a trod superseding it, a road chartered across it adding a `crossing` junction, a decayed road never becoming a trod, and no trod born where a road dies**, over a trod minted from a dead road, because the host has no such law and asks for none, the hidden-graded road already is the overgrown way with its own key, and a trod's law is cover, not history (vetoable) |",
  "| J-V13.124 | **(file w; the host's corrected request of 2026-10-18 evening.)** chose **one ladder: a trod's `grade` the host's ladder word, written only by the host's rung event and drawn by its step (the bottom for nobody), a trod a trod at every word, a road the host wants of a worn trod chartered between the trod's two junctions with its course as the hint and superseding it, a road chartered across it adding a `crossing` junction, a road the host grades hidden the same rung on its own record drawn under the trod rule, and no trod minted where a road dies**, over the map laying a route on a rung event (it would invent a host edge with no key and no leg, and a `trail` is a public route to every reader of roads), a trod minted beside a hidden road (two records naming one thing) or a trod never graded (the first reply's ruling, withdrawn with the host's corrected §D), because the host's corrected request wants the lifecycle as one ladder — the map giving the candidates, the host the life — and a trod's law is cover, not history (vetoable) |"),
 ("which way a body takes past a closure is the host's law (vetoable) |", "which way a body takes past a closure is the host's law (vetoable) |\n| J-V13.129 | **(file w; the host's corrected request of 2026-10-18 evening.)** chose **a trod's rung as `grade` — the host's ladder word, the field and the law a route's grade has, written only by the host's rung event of the events window and read through the adapter folder's grade-ladder table — drawn by the word's step (the bottom for nobody, the DM included; the trod's own dash-dot at 0.6 / 0.8 / 1.0 px) and absent on a standalone world**, over a field named `rung` (this volume's size, prosperity and ladder word), the routes layer's cues (each says \"public route\"), the DM seeing unlit candidates (the picture and the exports would disagree with the record, T-V13-50) or a map default word on a standalone world (a host word with no host), because the ladder is the host's and the map draws and never decides (vetoable) |\n| J-V13.130 | **(file w; the owner's word of 2026-10-19, J416.)** chose **one junction record, `WorldJunction`, for a trod's end, a road's end and a crossing, and a route's ends each a seat or a junction — a seat end never a junction, the gate station frame geometry behind door 1**, over a junction kind per owner (two records for one point), a route-end record of its own, or the gate station as a junction (frame geometry would leave the world), because the approach road's join already is this record's model and one id names the ambush point whoever ends there (vetoable) |\n| J-V13.131 | **(file w; J416.)** chose **junction ends on a host-bound world named only by the host (a genesis row or a charter: an edge key and a station, or a world point snapped within `routeToleranceM`) and derived by the map only on a standalone world, by the fork rule with its three cells of `world.routeLay`**, over the map deriving forks on a host-bound world (it would invent host edges, against (9)'s \"mirrored, never computed\") or a bound world forked at genesis by the map, because the organic path is the host's lived ledger — use and need — and \"appropriately\" on a standalone world is a bound the B-WORLD sweep can measure (vetoable) |\n| J-V13.132 | **(file w; J416.)** chose **the lifecycle by origin — a host route ending at a junction keeps its geometry and its junction when the joined route is demoted, removed or retracted (`W_ROUTE_JUNCTION_ORPHAN`), the map's own approach roads and forks re-joining as row 13 re-joins**, over one rule for both (re-joining a host edge would move a bound route silently; keeping a map road on a vanished route would leave a site's access to nothing), because (10) and (12) each already say what their routes do (vetoable) |\n| J-V13.133 | **(file w; the host's corrected request.)** chose **the host's three way events — known, forgotten, rung — as three kinds of the events window (H9), the rung word in `WorldEvent.grade`, a settlement's knowledge the latest of the first two per (settlement, trod), a known part named by `asFarAs` from an end in integer effort-metres (the record's station unit) and drawn as that part only**, over the rung in the network window (keyed by host key, which a trod lacks), the windowed replace's retraction as the lapse (it is the host's undo and resume path), a fraction for the part (a position, not an extent) or whole-only knowledge (the host offered it; the record can draw a part), because one channel carries every dated host fact about a way and the fold reads them at a week (vetoable) |"),
], "J-V13.115, 117, 118 re-worded for the correction; J-V13.124 re-decided (one ladder); J-V13.129 – 133 added (items 970–975's decisions ride this line).")

sub('966 (c)', [
 ("(≈ 1 pw more: 8 → 9\npw; the staged row 37–45 → 38–46)", "(≈ 2 pw more: 8 → 10\npw — the trods ≈ 1, the junction ends and the fork rule the owner's word of 2026-10-19 asked for ≈ 1; the staged row\n37–45 → 39–47)"),
], "the price re-figured (h5, h6).")

sub('967 (a)', [
 ("and a settlement's knowledge of one (a host event) never changes the state.", "and a settlement's knowledge of one (the host's dated events, learned and forgotten) never changes the state; a trod the host has not lit draws for nobody whatever its state, the state kept; a reveal may name a part of the trod (the place's address with its end and station), the part then the one admitted."),
], "the lapse, the candidate and the part.")
sub('967 (e)', [
 ("the party's `places` holding a trod's id as a place's (BCR-V14-19's key form)", "the party's `places` holding a trod's id as a place's (BCR-V14-19's key form; with an optional part — the end and the station — the host's partial reveal names, the admitted part drawn and the rest absent)"),
], "the partial reveal through the places key.")

sub('968 (b)', [
 ("Send a town's knowledge of a trod as an events-window row (H9): the knowing seat, the trod id, the how-word, the week, who may see it; a retraction is forgetting.", "Send a town's knowledge of a trod as an events-window row (H9): the knowing seat, the trod id (whole, or as far as a station from a named end), the how-word — any word, a warden's office among them —, the week, who may see it; send its lapse as a second row (`way_forgotten`): the map draws the latest of the two per town and trod. Send each trod's rung as a third row (`way_rung`): every trod in the record is a candidate the host lights by its first rung and may drop to its bottom word; the map draws a trod by its rung's step and never promotes, retires or lights one; a road the host wants of a worn trod is a charter between the trod's two junctions with the trod's course as the hint; a road graded hidden is drawn under the trod rule on its own record. Name a junction end in a genesis edge or a charter — a point on one of the host's own edges by key and station, or a world point snapped within `routeToleranceM` — and derive forks where appropriate (the owner's word of 2026-10-19: roads that join, fork or diverge)."),
 ("Register `trod`, `junction` and the kind words `goat`, `drove`, `broad` as the map's; keep `hidden` as the host's own grade on an overt edge; mint `way` on neither side.", "Register `trod`, `junction` and the kind words `goat`, `drove`, `broad` as the map's; keep `hidden` and the ladder's other words as the host's own grades, sent in order through the adapter's grade-ladder table with the bottom usable word named; mint `way` on neither side (`rung` is the map's size and prosperity word: the map calls the host's rung a grade)."),
 ("The map draws a trod for the players only where the DM or the host reveals it, draws a town's knowledge of one as a pin, names the place of every engagement on one, and the host's bodies path on the record.", "The map draws a lit trod for the players only where the DM or the host reveals it and a candidate for no one, draws a town's knowledge of one as a pin until it lapses, names the place of every engagement on one, lays a road the host charters along a worn trod or to a junction, and the host's bodies path on the record."),
], "the H32 row re-written for the correction (REQ:33 c1–c3, REQ:35) and the owner's word of 2026-10-19.")
sub('968 (c)', [
 ("send a town's knowledge of a trod as an events-window row;", "send a town's knowledge of a trod, its lapse and each trod's rung as events-window rows;"),
 ("register `trod`, `junction`, `goat`, `drove`, `broad`, keep `hidden` for the host's grade, mint `way` on neither side.", "name junction ends in genesis edges and charters and derive forks where appropriate; register `trod`, `junction`, `goat`, `drove`, `broad`, keep the ladder's words as the host's grades, mint `way` on neither side."),
], "the summary row follows H32.")
sub('968 (j)', [
 ("never a route class and never the host's `hidden` grade (which stays a decayed overt road, drawn DM-only)", "never a route class; the host's `hidden` grade is the bottom usable rung of one ladder, carried on a road and on a trod alike as the host's word, a hidden road drawn under the trod rule on its own record"),
 ("who knows, rides and fights on one is the host's, sent through the events window and the presentation messages (H32);", "who knows, forgets, rides, lights and fights on one is the host's, sent through the events window and the presentation messages (H32); every trod the map lays is a candidate the host lights by a rung event, and a worn trod becomes a road only by the host's charter between its junctions;"),
], "ENC-HL-12 re-read for one ladder.")
sub('968 (l)', [
 ("the host's `way_known` event is a `WorldEvent` kind of the events window with its how-word in `cause`.", "the host's `way_known`, `way_forgotten` and `way_rung` events are three `WorldEvent` kinds of the events window (the how-word in `cause`, the ladder word in `grade`, a known part in `where.asFarAs`); the trod's rung is the map's `grade`; by the owner's word of 2026-10-19 a route may end at a junction on another route (`WorldJunction`), named by the host in a genesis edge or a charter, and M-W2 is 10 pw (the staged row 39–47)."),
], "the open point names the correction and the owner's word.")

sub('969 (a)', [
 ("items 955–969: the host's hidden-ways request answered — the trods, 2026-10-18; J407)", "items 955–975: the host's hidden-ways request answered — the trods — and the owner's word on roads that join, fork or diverge, 2026-10-18 and 19; J407, J415, J416)"),
], "the item range and the two journal rows.")
sub('969 (b)', [
 ("unknown to every town until the host says a settlement knows one and drawn for the players only as revealed (W7 (13); file w)", "every one a candidate the host lights, unknown to every town until the host says a settlement knows one and forgotten again when it says so, drawn for the players only as revealed (W7 (13); file w); roads that end at a junction on another road (W7 (14); the owner's word of 2026-10-19)"),
], "the correction and the owner's word in the index row.")
sub('969 (c)', [
 ("38–46 as one staged row (M-W0h ≈ 4 inside it, the trods ≈ 1 on M-W2;", "39–47 as one staged row (M-W0h ≈ 4 inside it, the trods ≈ 1 and the junction ends ≈ 1 on M-W2;"),
], "the staged row at 39–47.")
sub('969 (g)', [
 ("their price (M-W2 8 → 9 pw, the staged row 38–46)", "their price (M-W2 8 → 10 pw with the junction ends the owner asked for on 2026-10-19, the staged row 39–47)"),
], "the price.")
sub('969 (i)', [
 ("unknown to every town until the campaign says one has learned it, and never drawn for the players\n    until you reveal one (the host's hidden-ways request of 18 October).", "unknown to every town until the campaign says one has learned it and forgotten again when it fades, every one a\n    candidate the campaign brings to life or lets go wild, and never drawn for the players until you reveal one (the\n    host's hidden-ways request of 18 October). Roads may now end where they meet another road, joining or forking as\n    you asked on 19 October."),
], "the correction and the owner's word in plain words.")
sub('969 (j)', [
 ("about **38–46 person-weeks** (the trods about 1 of them, with the routes;", "about **39–47 person-weeks** (the trods, and the roads that join or fork, about 2 of them, with the routes;"),
], "the estimate.")
sub('969 (k)', [
 ("ground, length and junctions as a record its simulation reads between turns; the word \"way\" stays the town's street.", "ground, length and junctions as a record its simulation reads between turns; your host gives each one its life — lit,\nworn, forgotten or lost — and the map draws what it says; the word \"way\" stays the town's street. On 19 October you\nasked for roads that join, fork or diverge: a road may now end where it meets another."),
], "the correction and the owner's word in plain words.")
sub('969 (l)', [
 ("the price\n  (about one more week on the routes milestone),", "the price\n  (about two more weeks on the routes milestone: one for the hidden ways, one for the roads that join or fork you asked\n  for on 19 October),"),
], "the price.")

# ---------------------------------------------------------------- new items 970–975
def frag(item, letter, file, ln, old, new, locator, evidence):
    FR.append(dict(item=item, letter=letter, file=file, line=ln, old=old, new=new, locator=locator, evidence=evidence))
def edit(item, letter, file, ln, pairs, locator, evidence, nlines=1):
    old = '\n'.join(lines(file)[ln-1:ln-1+nlines]); new = old
    for o, n in pairs:
        c = new.count(o)
        if c != 1: problems.append(f"{item} ({letter}) {file}:{ln}: {o[:60]!r} occurs {c}× in the target line(s)")
        new = new.replace(o, n, 1)
    frag(item, letter, file, ln, old, new, locator, evidence)

OWNER2 = ("* **The owner's word on roads that join, fork or diverge (2026-10-19; J416; file w item 970).** \"but i also want roads that connect other roads as well that join, fork, or diverge\" — \"apropriately and organically\". Obeyed by W7 (14) (V13 §3.8: a route's two ends each a settlement or a `WorldJunction` on another public route — on a host-bound world named by the host's genesis edges and charters, which the map lays as it lays an approach road and never derives, the host deriving its forks out of use and need in its lived network, a worn trod chartered between its two junctions among them; on a standalone world by the fork rule, a seat joining the nearest road at a junction when the way round costs within `fork.detourMax` of its own road), the one junction record shared with the trods (V13 §2.2 `WorldJunction`), the `routes` layer's junction mark (V13 §5.1) and the lifecycle by origin (a host road ending at a junction keeps its geometry whatever becomes of the joined road; the map's own approach roads and forks re-join); a site or a proposal is never an end, and a settlement's gate station stays frame geometry behind door 1.")
o365 = line(V13, 365)
frag(970, 'a', V13, 365, o365, OWNER2 + '\n' + o365,
 "Volume 13 — §1.3 The owner rules obeyed (insertion before the sites-and-roads bullet, newest first)",
 "the owner's words verbatim where the volume lists the owner rules obeyed, as file t did for J393 (V13:365–374) and 955 (b) does for the brigands' ways; the owner's word of 2026-10-19 02:31Z and 02:33Z (J416), quoted as spoken. From: new.")

edit(970, 'b', V13, 1827, [
 ("11. **Legs end at settlements.** On a host-bound world every host route ends at two host settlements; a site, a\n   proposal or a junction is a position along a route, never an end of a host route (the map's own approach road, (12), ends at it), so dropping or removing a site changes no route's",
  "11. **Legs end at settlements — or, by the owner's word of 2026-10-19, at junctions (file w).** On a host-bound world every host route ends at two host settlements, or at a `WorldJunction` on another public route where the host's genesis edge or charter names one ((14)); a site or a\n   proposal is a position along a route, never an end of any route, and a junction an end only where the host names it (or, on a standalone world, (14)'s fork rule or (12)'s approach road lays it), so dropping or removing a site changes no route's"),
], "Volume 13 — §3.8 W7 (11) Legs end at settlements (the law opened)",
 "the law as it stands (V13:1827–1829) [STATED]; the owner's word of 2026-10-19 (J416) opens it to junction ends; the sites' guarantee kept (V13:1828–1829). From: new.", nlines=2)

W14 = """14. **Junction ends and forks (file w: the owner's word of 2026-10-19 — "but i also want roads that connect other roads as
   well that join, fork, or diverge", "apropriately and organically"; J416).** A route's end is a seat or a `WorldJunction`
   (V13 §2.2) — (11) as opened: a road may end where it meets another road. (a) **A junction end on a host-bound world is
   the host's to name:** a genesis edge or a charter names it as a point on one of the host's own edges (its key and an
   integer station from that edge's `a`) or as a world point, which the map snaps to the nearest public land route's
   polyline within `routeToleranceM` and refuses (`refuse.world.junctionEnd`) where none lies within it; the map writes
   the `WorldJunction` (one already within half a fine cell shared, its `arms` gaining the route), lays the route to the
   junction's point as (12) (b) lays an approach road — the A\\* as (4)'s, the joined route byte-identical, never split —
   with the host's grade and key, the charter's `via` hint honoured ((9)); a junction-ended host route composes no leg of
   the time receipt (legs are seat pairs; the host prices its own network over it) and is otherwise a route to every
   reader of routes (`existingRoute`, siting, coherence, patrols, approaches, charter roads). The map derives no fork on a
   host-bound world: the host does, out of use and need in its lived network — a settlement joining the trunk road at a
   junction, a road along a worn trod between the trod's two junctions ((13) (g): the trod superseded). (b) **The fork
   rule on a standalone world**, run inside (4)'s pass: before an edge (s, t) of (3)'s selection is laid, one Dijkstra from
   s to the route set in force (the search (5)'s trail uses) finds the nearest junction point j on a public route and its
   cost c_join, and a search over the laid routes' cells from j to t gives c_net (∞ where t lies on no laid route); where
   c_join + c_net ≤ `fork.detourMax` × the pair's own A\\* cost and the join leg's straight length ≤ `fork.joinMaxM`, the
   edge is laid as s → j only — a route ending at a `WorldJunction` of kind `end` (one within `fork.junctionSpacingM`
   along the joined route shared), its class by (5), its cells in the `route` layer — else as its own road s → t; (5)'s
   trail is the same rule with no bound. "Appropriately" is the bound; "organically" is the rank order ((4): later roads
   ride earlier ones) and the cost surface. Deterministic: ties by (f, cell index), the route set read at its lay versions;
   a permuted seat order gives the same network. (c) **Identity and the lifecycle:** a junction's identity is (`junction`,
   the joined route's lineage, its fine cell) (V13 §2.5), shared by routes and trods; a host route ending at a junction
   keeps its geometry whatever becomes of the joined route — demoted, the junction stays (a hidden joined road a ghost,
   the fork's own grade its own); removed or retracted, the junction keeps its point on the last lay (kept as a version)
   and the route is reported `W_ROUTE_JUNCTION_ORPHAN` until the host charters otherwise — because nothing moves a bound
   route silently ((10)) and no host edge is the map's to re-lay ((9)); the map's own junction-ended routes — (12)'s
   approach roads and (b)'s forks — re-join as (12) and V13 §3.14.3 row 13 re-join an approach road. A site or a proposal
   is never an end ((11)); a settlement's gate station is frame geometry and never a junction ((11); `nearSeat` reads "at
   its town gate"). (d) **Readers:** the `routes` layer draws the route to its junction and the junction's mark (V13 §5.1);
   `placeOf` names a `junction` by its route, its arms and the nearer seat; the charter's road rows read `toward` for a
   junction-ended route as for an approach road (V13 §2.2); `routes(world)` lists a host edge's junction ends as the
   record holds them. *Edges:* a seat whose nearest route is not yet laid at its turn: its own road; a join leg that would
   cross water: none; two seats forking to one point within `fork.junctionSpacingM`: one junction with two arms; a
   genesis of the older form (seat keys only) folds as before."""
OUT_OLD = "*Output:* `WorldRoute`s (the approach roads among them) and the `route` layer; each site placement's approach is the derived `SiteApproach` read over them (V13 §2.2)."
assert text(V13).count(OUT_OLD) == 1 and line(V13, 1875).startswith(OUT_OLD)
frag(970, 'c', V13, 1875, OUT_OLD, W14 + "\n\n*Output:* `WorldRoute`s (the approach roads and the junction-ended routes among them), the `route` layer, the `WorldJunction`s, the `Trod`s with the `trods` raster layer (W7 (13), (14)); each site placement's approach is the derived `SiteApproach` read over them (V13 §2.2).",
 "Volume 13 — §3.8 W7 (insertion of item (14) before the *Output* line, which gains the junctions and the trods)",
 "W7's items (V13:1754–1877), (13) inserted after (12)'s last line by 959 (b); the approach road's lay reused (V13:1846–1852: no stretch split in V13 [OBSERVED]); the trail rule (V13:1792–1793) generalized; `routeToleranceM` (V13:1135); legs are seat pairs (V13:888); nothing moves a bound route silently (V13:1821–1826); `synthesis.md` §4.7–4.9. From: new.")

edit(970, 'd', V13, 1793, [
 ("nearest routed cell (one Dijkstra to the route set); water legs", "nearest routed cell (one Dijkstra to the route set) — its far end a `WorldJunction` on that route, (14)'s fork rule with no bound (file w); water legs"),
], "Volume 13 — §3.8 W7 (5) Classes (the trail's end typed)",
 "the unjoined seat's trail already ends at a routed cell, untyped (V13:1792–1793; read-v13-routes.md:35–38); the generalized end types it. From: new.")

edit(971, 'a', V13, 786, [
 ("a: Id; b: Id /* its two ends: seat ids (the glyphs' settlements); an approach road's (origin 'approach', V13 §3.8 (12)) `a` its site's placement and `b` the public route it joins */; join?: { route: Id; atCm: WorldPointCm } /* an approach road only: its junction — the joined route's polyline point it ends at */; hostKey?: string /* bound: the host's edge key, the pair and the mode */;",
  "a: Id; b: Id /* its two ends: each a seat's placement id (the glyphs' settlements) or — file w; the owner's word of 2026-10-19 — a `WorldJunction` id, a point on another public route's polyline (W7 (14): a host edge whose genesis row or charter names a junction end, a standalone fork; an approach road's `b`, origin 'approach', V13 §3.8 (12), its `a` its site's placement); the former `join` field is superseded by the junction record, which holds the joined route and the point */; hostKey?: string /* bound: the host's edge key, the pair (seats or junction ends) and the mode */;"),
], "Volume 13 — §2.2 `WorldRoute` (the two ends generalized; `join` superseded)",
 "the record's ends (V13:786) [STATED]; the approach road's `join` is the junction model (V13:786, 1850); the owner's word of 2026-10-19 (J416); `synthesis.md` §4.7. From: new.")

edit(971, 'b', V13, 1851, [
 ("(`a` the site's placement, `b` the\n   joined route, `join` the junction, `class` the row's `roadClass`, `mode` `land`, no host key)",
  "(`a` the site's placement, `b` its\n   `WorldJunction` on the joined route — the junction's `route` the joined route, its `at` the point, the approach road its arm; (14) —, `class` the row's `roadClass`, `mode` `land`, no host key)"),
], "Volume 13 — §3.8 W7 (12) (b) the approach road's written form",
 "the approach road's `b` and `join` (V13:1851–1852) [STATED] become the junction record. From: new.", nlines=2)

edit(971, 'c', V13, 1259, [
 ("(`route`, the two seats' lineages sorted, the mode `land`\\|`water`)", "(`route`, the two ends' lineages sorted — a seat's, or a `WorldJunction`'s by W7 (14), file w —, the mode `land`\\|`water`)"),
], "Volume 13 — §2.5 Identity (the `WorldRoute` row)",
 "identity by creation key (V13:1255–1260); a junction-ended route's key names its junction's lineage. From: new.")

edit(972, 'a', V13, 885, [
 ("edges: { hostKey: string; a: string; b: string; mode: 'land'|'water'; grade: string }[]; week: Week }",
  "edges: { hostKey: string; a: string | RouteEnd; b: string | RouteEnd; mode: 'land'|'water'; grade: string }[]; week: Week }   // file w (the owner's word of 2026-10-19; W7 (14)): an end is a host seat key, or a junction end — RouteEnd = { route: string /* the host's edge key */; stationM: number /* integer effort-metres from that edge's `a` */ } | { at: WorldPointCm /* snapped to the nearest public land route's polyline within routeToleranceM, else refuse.world.junctionEnd */ } — on a land edge only (a water edge ends at two port seats); lawVersion moves, and an older genesis (seat keys only) folds as before"),
], "Volume 13 — §2.2 `RouteGenesis` (a junction end)",
 "the genesis record's ends are host strings (V13:885) [STATED]; the junction-end form (`synthesis.md` §4.8, O7). From: new.")

edit(972, 'b', V13, 886, [
 ("via?: WorldPointCm[] /* a charter's course hint */; week: Week; window: AdvanceWindow }",
  "via?: WorldPointCm[] /* a charter's course hint */; ends?: { a: string | RouteEnd; b: string | RouteEnd } /* file w: a charter whose end is a junction (W7 (14)), in RouteGenesis's forms; absent, the pair is in the host key */; week: Week; window: AdvanceWindow }"),
], "Volume 13 — §2.2 `NetworkChange` (a charter's junction end)",
 "`NetworkChange` carries no end fields today — the pair is in the key (V13:786, 886) [STATED]; a charter between a trod's two junctions with the trod's course as `via` is the organic path (`synthesis.md` §4.1, §4.8). From: new.")

edit(972, 'c', V13, 888, [
 ("bandsCrossed: string[]; fragile: boolean }[]; causes: Id[] }",
  "bandsCrossed: string[]; fragile: boolean }[]; causes: Id[] }   // file w: legs are seat pairs; a junction-ended host route (W7 (14)) composes no leg — the host prices its own network over it"),
], "Volume 13 — §2.2 `TimeDeltaReceipt` (no leg for a junction-ended route)",
 "legs are seat pairs with the host's times (V13:888, 1797–1802) [STATED]. From: new.")

edit(973, 'a', V13, 1009, [
 ("routeToleranceM: number; maxCostFactor: number;", "routeToleranceM: number; maxCostFactor: number; fork: { detourMax: number /* standalone, W7 (14): a seat joins the nearest route at a junction when its join leg plus the way round by the network ≤ detourMax × its own road's cost */; joinMaxM: number /* the join leg's greatest straight length */; junctionSpacingM: number /* junctions on one route no closer than this: a fork within it shares the junction */ } /* file w */;"),
], "Volume 13 — §2.3 `RouteLayRule` (the fork cells)",
 "the lay rules of W7 (V13:1009–1010) [STATED]; the fork rule's bound and terms as rule-table cells (`synthesis.md` §4.8). From: new.")

o1136 = line(V13, 1136)
frag(973, 'b', V13, 1136, o1136, o1136 + "\n| `fork.detourMax` / `fork.joinMaxM` / `fork.junctionSpacingM` | 1.25 / 30 000 / 3 000 (standalone, W7 (14): a seat whose join leg to the nearest route plus the way round by the network costs ≤ 1.25 × its own road gets the join only, its road ending at a `WorldJunction`; a join leg no longer than 30 km straight; junctions on one route no closer than 3 km; every cell own, PLAUSIBLE until the B-WORLD sweep measures the fork share; file w) |",
 "Volume 13 — §2.3 the default tables (`routeLay`: the fork row, inserted after the `sea` row)",
 "every cell own, PLAUSIBLE until measured (V13:968–972); the `routeLay` defaults (V13:1131–1137). From: new.")

edit(974, 'a', V13, 3144, [
 ("a hidden host road a DM-only ghost, a hidden water lane a quiet-quay mark;", "a hidden host road a DM-only ghost (and, for a player the host's reveal through the party's places admits, drawn as a trod at the first step — the trod rule, V13 §3.8 (13) (i); file w), a hidden water lane a quiet-quay mark; a route ending at a `WorldJunction` (W7 (14); file w) drawn to its junction, the junction a small ring on the joined route (where a road, a trod or an approach road meets a road), the joined route unchanged;"),
 ("river (navigable) a darker water line |", "river (navigable) a darker water line; a junction a 3 px ring in the ink colour, the legend row \"junction\" |"),
], "Volume 13 — §5.1 the layer table (the `routes` row: the junction mark; the hidden road under the trod rule)",
 "the routes row draws no junction mark today (V13:3144) [OBSERVED]; the hidden road's drawing (V13:3144, 1815–1820) moved under the trod rule (`synthesis.md` §4.3, §4.9). From: new.")

T61 = "| T-V13-61 | junction ends and forks (W7 (14); file w; the owner's word of 2026-10-19): on the host-bound fixture a genesis edge and a charter whose `b` is `{ route, stationM }` on a mock host edge, and one whose `b` is `{ at }` 40 m off a public route, each lay a route ending at a `WorldJunction` on that route at that station (within a fine cell), the joined route byte-identical (polyline, stations, effort, lay version), the junction's `arms` naming the new route, `routes(world)` listing the edge with its junction end, `timeDelta` carrying no leg for it and `existingRoute` discounting its cells for a later route; an `{ at }` 200 m off every route is refused `refuse.world.junctionEnd`; two charters to one point within half a fine cell share one junction with two arms; a charter along a trod's course between its two junctions tombstones the trod and keeps both junctions as the road's ends; demoting the joined route to hidden moves nothing and keeps the junction, removing it keeps the junction-ended route and its junction's point and reports `W_ROUTE_JUNCTION_ORPHAN` once; a genesis of the older form (seat keys only) folds as before. On B-WORLD-lite standalone the fork rule lays at least one route ending at a junction (own bar: ≥ 10 % of seats fork), none whose join leg plus the way round exceeds `fork.detourMax` × the pair's own A\\* cost or whose join leg exceeds `fork.joinMaxM` straight, no two junctions on one route within `fork.junctionSpacingM`, every unjoined seat's trail ending at a `WorldJunction`; a permuted seat order and two runs give byte-identical networks; removing the joined route of a fork re-joins the fork as an approach road re-joins; the `routes` layer draws every junction's mark and the legend names it, a player picture carrying no junction of a trod it does not admit; W7a + W7b stays within its §6 row with the fork test counted | the world fixtures; a mock host |"
edit(975, 'a', V13, 3719, [
 ("ending at its `join` on the nearest public track-or-better route", "ending at its `WorldJunction` on the nearest public track-or-better route"),
], "Volume 13 — §7.3 T-V13-57 (`join` → the junction record) and T-V13-61 (insertion after it)",
 "§7.3's generation tests (V13:3716–3720); T-V13-57 names the approach road's `join` (V13:3719) [OBSERVED]; T-V13-61 is free (v1 dropped it with the ninth lens) [OBSERVED]; the fork rule's cases (`synthesis.md` §4.8–4.9). From: new.")
FR[-1]['new'] = FR[-1]['new'] + '\n' + T61

TITLES.update({
 970: "The owner's word of 2026-10-19 (J416): roads that join, fork or diverge — the law 'legs end at settlements' opened to junction ends; W7 (14) junction ends and forks; the trail's end typed.",
 971: "The record: `WorldRoute`'s two ends each a settlement or a `WorldJunction` (the approach road's `join` superseded); the route's identity by its ends' lineages.",
 972: "The port forms: a junction end in `RouteGenesis` and in a charter's `NetworkChange.ends`; no leg of the time receipt for a junction-ended route.",
 973: "The fork rule's cells in `world.routeLay`: `fork.detourMax`, `fork.joinMaxM`, `fork.junctionSpacingM`.",
 974: "The lens: the `routes` layer's junction mark and the legend row; a hidden road drawn under the trod rule.",
 975: "The tests, report code and decisions of the junction ends: T-V13-61 (and T-V13-57's `join`), `W_ROUTE_JUNCTION_ORPHAN` (in 963 (f)'s line), J-V13.129 – J-V13.133 (in 965 (a)'s line).",
})

# ---------------------------------------------------------------- md5s, checks
MD5 = {}
for fr in FR: fr['md5'] = MD5.setdefault(fr['file'], md5(text(fr['file'])))
spans = {}
for fr in FR:
    t = text(fr['file']); o = fr['old']; k = f"{fr['item']} ({fr['letter']})"
    n = t.count(o)
    if n != 1: problems.append(f"{k} {fr['file']}:{fr['line']}: old occurs {n} times"); continue
    i = t.index(o); ln = t[:i].count('\n') + 1
    if ln != fr['line']: problems.append(f"{k} {fr['file']}: old starts at line {ln}, stated {fr['line']}")
    spans.setdefault(fr['file'], []).append((i, i+len(o), k))
    if fr['new'].count(fr['old']) > 1: problems.append(f"{k}: new contains old more than once")
    if fr['old'] == fr['new']: problems.append(f"{k}: new equals old")
    if t.count(fr['new']) and fr['new'] != fr['old']: problems.append(f"{k}: new text already in the target")
for f, sp in spans.items():
    sp.sort()
    for a, b in zip(sp, sp[1:]):
        if a[1] > b[0]: problems.append(f"overlap in {f}: {a[2]} and {b[2]}")
work = {f: text(f) for f in TEXT}
for fr in FR:
    k = f"{fr['item']} ({fr['letter']})"; w = work[fr['file']]
    if w.count(fr['old']) != 1: problems.append(f"apply {k}: old occurs {w.count(fr['old'])} times at its turn"); continue
    w = w.replace(fr['old'], fr['new'], 1)
    if w.count(fr['new']) != 1: problems.append(f"apply {k}: new occurs {w.count(fr['new'])} times after")
    work[fr['file']] = w
after = dict(work)
for fr in reversed(FR):
    k = f"{fr['item']} ({fr['letter']})"; w = work[fr['file']]
    if w.count(fr['new']) != 1: problems.append(f"reverse {k}: new occurs {w.count(fr['new'])} times"); continue
    work[fr['file']] = w.replace(fr['new'], fr['old'], 1)
for f in TEXT:
    if work[f] != text(f): problems.append(f"reversal of {f} is not byte-identical")
# clean room: no host source file, function or identifier in V13/V14 new texts
for fr in FR:
    if fr['file'] in (V13, V14):
        for bad in ('.js', 'spatialDigest', 'routeLifecycleEnabled', 'computeRoadNetwork', 'DESIGN_ROUTE_LIFECYCLE', 'research/sf', 'HRQ:', 'fp-physical'):
            if bad in fr['new']: problems.append(f"clean room {fr['item']} ({fr['letter']}): {bad!r} in a volume text")
if problems:
    print('PROBLEMS:'); [print(' -', p) for p in problems]; sys.exit(1)

# ---------------------------------------------------------------- emit JSON
out = [dict(id=f"{fr['item']} ({fr['letter']})", file=fr['file'], line=fr['line'], md5=fr['md5'], old=fr['old'], new=fr['new']) for fr in FR]
json.dump(out, open(f"{DIR}/draft-w.fragments.json", 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
c = Counter(fr['file'] for fr in FR)
short = {V13: 'V13', V14: 'V14', HRQ: 'the host document', INDEX: 'INDEX', SUMMARY: 'SUMMARY'}
items = {}
for fr in FR: items.setdefault(fr['item'], Counter())[fr['file']] += 1

# ---------------------------------------------------------------- emit draft-w.md
def bq(s): return '\n'.join(('> ' + l) if l else '>' for l in s.split('\n'))
nfr = len(FR)
hdr = f"""# Amendments w — the hidden ways: the host side's request of 2026-10-18 and the map's answer, revised 2026-10-19 for the host's corrected request of the same evening and the owner's word on roads that join, fork or diverge

> Designed by the hidden-ways workflow (J407) under the owner's delegation (J404: "Decisions and judgment to you"); five readers, three designs, three judges, the synthesis (Fable/xhigh); revised by the correction run (J415) and for the owner's word of 2026-10-19 (J416) by the synthesis-2 seat; every ruling vetoable. The first draft is kept as `draft-w-v1.md` / `draft-w-v1.fragments.json` (96 fragments, items 955–969).

Numbered from **955** (file v ended at 954).

**PENDING APPLICATION** (draft; applied after the owner's look). Twenty-one items, **{nfr} fragments** — `docs/volumes/V13-world.md` {c[V13]}, `docs/volumes/V14-sites.md` {c[V14]}, `docs/HOST-REQUIREMENTS-2026-10-18.md` {c[HRQ]}, `docs/volumes/INDEX.md` {c[INDEX]}, `docs/volumes/SUMMARY.md` {c[SUMMARY]}; the base needs no change (no BCR: `ARCHITECTURE.md:15744`'s admission sentence is read as generic, and `:12903`'s port paragraph names no optional product, `routeFacts` and `patrolOffer` having entered V13 without a base change). Checked by script before this file was written (`synth-scripts/build2.py`, from the v1 machine copy and this run's patches; re-checked from the machine copy alone by `synth-scripts/check_json.py`): every current text occurs **exactly once** in its target as it stands now, starting at the line named; no two fragments of one target overlap; applied in this file's order (955 (a) first) to copies of the five targets each current text is found once at its turn and each new text once after; applying the new texts back to their current texts in reverse order restores every copy byte for byte. The machine copy is `docs/validation/hidden-ways-2026-10-18/draft-w.fragments.json` (the same {nfr} fragments, texts unescaped, in this order, records `{{id, file, line, md5, old, new}}`). Nothing here has been applied; the apply lane re-verifies every current text against the targets as they then stand, applies in this order, regenerates `docs/ARCHITECTURE-FULL.md` by `tools/bundle_architecture.py` (its `--check` to exit 0) and writes the status line. The targets as they stand now: V13 `{MD5[V13]}` ({len(lines(V13))} lines), V14 `{MD5[V14]}` ({len(lines(V14))}), the host document `{MD5[HRQ]}` ({len(lines(HRQ))}), INDEX `{MD5[INDEX]}` ({len(lines(INDEX))}), SUMMARY `{MD5[SUMMARY]}` ({len(lines(SUMMARY))}).

**Sources.** The host's request `docs/host-requests/2026-10-18-hidden-ways.md` as corrected the evening of 2026-10-18 (47 lines, md5 `{md5(text('docs/host-requests/2026-10-18-hidden-ways.md'))[:8]}…`; the first version `…-hidden-ways-v1.md`, md5 `251c96a9…`, differs in lines 33 and 35 only: §C's office, lapse and partial prefix; §D the lifecycle as one ladder — the map's candidates, the host's rungs, `way_rung`, question 8) and the map's reply `docs/HOST-REPLY-HIDDEN-WAYS-2026-10-18.md` (revised with this draft; the first reply kept as `reply-v1.md`); the owner's word of 2026-10-19 02:31Z / 02:33Z (J416), verbatim in item 970 (a): "but i also want roads that connect other roads as well that join, fork, or diverge" — "apropriately and organically". The five reader records of the lane and the correction's delta record (`read-correction.md`: the diff, the sentences contradicted or extended, the facts F1–F40 and G1–G17, the open points O1–O11), read whole; the three designs with their machine copies; the three judgments; the synthesis record `synthesis.md` (§1–§3 the first run, §4 the correction's decisions: one ladder with the host's ladder word as the trod's `grade` and `rung` TAKEN map-side, the demoted road under the trod rule, the three event kinds in H9 with the lapse read as the latest row per settlement and trod and the part in the record's station unit, every candidate in the record at the asked count with the W7c row re-declared for the rough pass, `WorldJunction` the one junction record a route's end may be, the host naming junction ends and deriving forks, the standalone fork rule with its three cells, the lifecycle by origin, M-W2 at 10 pw). Every target was read at the passage each fragment quotes, as it stands now, and re-hashed before this file was written. Host facts are cited only from `research/sf/*.md` and the host document (Fable-retrovalidated at J392); no host code was read or copied.

**How to read the items.** Item 955 is the owner's word and the words; items 956–966 carry the design into V13 in section order (the records, the rule table, identity and storage, the generation step, the port, the layer and the reveal, the budgets, the tests, the milestones and the host's track, the decisions, the owner questions); item 967 is V14's, 968 the host document's, 969 the index's and the summary's; items 970–975 carry the owner's word of 2026-10-19 (the owner-rule block and the opened law with W7 (14), the record's ends, the port's junction-end forms, the fork rule's cells, the lens's junction mark, the tests and the decisions). Where the correction's text had to land on a line an earlier item already edits, it rides that item's fragment and the later item says so (W7 (14) and the *Output* line: 970 (c), with (13) re-anchored at (12)'s last line; `W_ROUTE_JUNCTION_ORPHAN`: 963 (f); J-V13.129 – 133: 965 (a); `WorldEvent.grade`: 956 (g); `WorldWhere.asFarAs`: 956 (h)). Each item opens with what it does, then its lettered fragments (a), (b), … in file order and line order, each with its target, its line and the target's md5 as they stand now, the current text quoted **once** verbatim (a blockquote whose lines are the target's lines), the new text **in full** as a blockquote whose lines are the new lines (the `> ` prefix removed; a bare `>` an empty line), and an *Evidence* line naming the source lines and *From:* — the design fragment it comes from and what the synthesis changed in it, or "new" where no design wrote it, and, where the correction run changed it, a *Revised* note. An insertion quotes the line it follows and repeats it as its new text's first line. A reference written "file w" inside a new text is to this file. **Clean room:** every new text bound for V13 and V14 names host facts only by the port's field names and the adapter folder's tables; host document names, ruling ids and research citations stay in the Evidence lines. The order is the application order; because no two fragments of a target overlap, any order gives the same result.

---

## The items
"""
md = [hdr]
cur = None
for fr in FR:
    if fr['item'] != cur:
        cur = fr['item']; md.append(f"\n**{cur}.** **{TITLES[cur]}**\n")
    kind = '(insertion)' if fr['new'].startswith(fr['old']) and fr['new'] != fr['old'] else '(edit)'
    md.append(f"**{fr['item']} ({fr['letter']}).** {fr['locator']} {kind}. Target: `{fr['file']}`, line {fr['line']} (md5 `{fr['md5'][:8]}…`) as it stands now.")
    md.append("*Current text (as it stands now):*"); md.append(bq(fr['old']))
    md.append("*New text:*"); md.append(bq(fr['new']))
    md.append(f"*Evidence:* {fr['evidence']}\n")
open(f"{DIR}/draft-w.md", 'w', encoding='utf-8').write('\n'.join(md))
print('OK', nfr, 'fragments'); print({short[k]: v for k, v in c.items()})
for k in sorted(items): print(k, {short[f]: n for f, n in items[k].items()})
for f in MD5: print(short[f], MD5[f][:8], '->', md5(after[f])[:8], len(after[f].split('\n')), 'lines after')
