#!/usr/bin/env python3
"""hidden-ways/file-x: build draft-x.md and draft-x.fragments.json (items 976-982) from the five targets as they stand.
Every old is read from the target and must occur once; the V13 lines the host document cites are computed by applying
the V13 fragments to a copy. Usage: build_x.py ROOT"""
import hashlib, json, sys
ROOT = sys.argv[1]
V = f'{ROOT}/docs/validation/hidden-ways-2026-10-18'
V13, HRQ, IDX, SUM = ('docs/volumes/V13-world.md', 'docs/HOST-REQUIREMENTS-2026-10-18.md',
                      'docs/volumes/INDEX.md', 'docs/volumes/SUMMARY.md')
T = {f: open(f'{ROOT}/{f}', encoding='utf-8', newline='').read() for f in (V13, HRQ, IDX, SUM)}
M = {f: hashlib.md5(t.encode('utf-8')).hexdigest() for f, t in T.items()}
def line_of(f, s):
    t = T[f]; assert t.count(s) == 1, (f, t.count(s), s[:80]); return t[:t.index(s)].count('\n') + 1

# ---- V13 fragments first (the host document cites V13 lines as file x leaves them) ----
REV_OLD = "> patrols lenses' notes; D-V13.8), §6, §7 (T-V13-57, 59 – 61), §8.2, §8.5 H32, §9 J-V13.114 – 133, §11 Q2 and Q5."
REV_NEW = REV_OLD + """
>
> **Owner's word x — 2026-10-19** (`docs/AMENDMENTS-2026-10-18x.md`, items 976–982; the owner's answer to §11 Q5, given
> 2026-10-19: "i follow your recommendations", J421 — the price accepted, M-W2 at 10 pw and the staged row at 39–47, and
> M-W2 named; the host's stand-in from `routeFacts`' stretches meanwhile; the trod record a product of the simulator
> feed). Changed: §9 J-V13.116's closing clause records the answer; §10's BCR-V13-37 carries file w's 2 pw into §16's
> world line (39–47)."""
J116_OLD = "so this reading of the door is put to the owner in Q5 (vetoable) |"
J116_NEW = ("so this reading of the door is put to the owner in Q5, answered on 2026-10-19 (J421): the owner followed the "
            "session's recommendations, this reading among them |")
B1_OLD = "M-W5 reads 37–45 pw (M-W2"
B1_NEW = "M-W5 reads 39–47 pw (M-W2"
B2_OLD = "widened by 2 pw for the sway, the patrols and the windows; M-W5 the lenses, 7 pw; V13 §8.2), and the staged"
B2_NEW = ("widened by 2 pw for the sway, the patrols and the windows, and by 2 pw more by file w — ≈ 1 for the trods and ≈ 1 "
          "for the junction ends and the fork rule the owner's word of 2026-10-19 asked for, the price the owner accepted "
          "on 2026-10-19 (§11 Q5, J421); M-W5 the lenses, 7 pw; V13 §8.2), and the staged")
B3_OLD = "milestones' total moves by 9 pw at both ends (2 for the sway, 7 for the lenses);"
B3_NEW = ("milestones' total moves by 11 pw at both ends (2 for the sway, 7 for the lenses, 2 for file w's trods and "
          "junction ends; 9 before file w, which §16's world line took as 37–45 by file o item 877, so that line moves "
          "2 pw more, to 39–47);")
v13copy = T[V13]
for o, n in ((REV_OLD, REV_NEW), (J116_OLD, J116_NEW), (B1_OLD, B1_NEW), (B2_OLD, B2_NEW), (B3_OLD, B3_NEW)):
    assert v13copy.count(o) == 1; v13copy = v13copy.replace(o, n, 1)
def after_line(s):
    assert v13copy.count(s) == 1; return v13copy[:v13copy.index(s)].count('\n') + 1
MW2_ROW = after_line('| **M-W2 routes, polity, siting stage 2**')
STAGED = after_line('The volume states no total of its own (§16')
MW2_BEFORE = line_of(V13, '| **M-W2 routes, polity, siting stage 2**')
STAGED_BEFORE = line_of(V13, 'The volume states no total of its own (§16')
SHIFT = REV_NEW.count('\n')

H1_OLD = "the territory, sway, occupation, fighting, patrol and event layers; 8 person-weeks (V13 §8.2, line 3677). |"
H1_NEW = ("the territory, sway, occupation, fighting, patrol and event layers; the trods — the hidden ways — with their "
          "junctions, the trods layer and the DM's reveal, the port's trod record and `routeFacts`' ordered stretches, and "
          "routes that end at a junction on another route with the fork rule (file w; the owner's word of 2026-10-19); "
          f"10 person-weeks, 8 before file w, the price the owner accepted on 2026-10-19, J421 (V13 §8.2, line {MW2_ROW}). |")
H2_OLD = "M-W0 to M-W5 together are one staged row of 37 to 45 person-weeks (lines 3682–3683). |"
H2_NEW = ("M-W0 to M-W5 together are one staged row of 39 to 47 person-weeks, 37 to 45 before file w's two person-weeks on "
          f"M-W2 (lines {STAGED}–{STAGED + 1}). |")
H3_OLD = "(V13 §11 Q5, open for the owner with the price and the bodies chain's order)"
H3_NEW = ("(V13 §11 Q5, answered by the owner on 2026-10-19, J421, following the map's recommendations: the price accepted "
          "and M-W2 named, the host's bodies chain building its stand-in cover graph from `routeFacts`' stretches meanwhile "
          "and retiring it when the trod record lands, and this product reading confirmed)")
I1_OLD = "J407, J415, J416), applied by the lane its status line names."
I1_NEW = ("J407, J415, J416), applied by the lane its status line names, and file x (`docs/AMENDMENTS-2026-10-18x.md`, "
          "items 976–982: file w's figures carried into the totals, BCR-V13-37 and the host document's milestone table, and "
          "the owner's answer to V13 §11 Q5 carried into the volumes, J421, 2026-10-19), applied by the lane its status "
          "line names.")
I2_OLD = "file w, with its recommendation)"
I2_NEW = ("file w, with its recommendation, the owner answering it on 2026-10-19 by following the recommendation: the price "
          "accepted, the stand-in meanwhile, the product as proposed, J421)")
I3_OLD = "| accept the price and name M-W2; the stand-in meanwhile; the product as proposed (recommended; vetoable) |"
I3_NEW = ("| accept the price and name M-W2; the stand-in meanwhile; the product as proposed — the owner's own answer, given "
          "2026-10-19 (J421: \"i follow your recommendations\"): the price accepted (M-W2 10 pw, the staged row 39–47) and "
          "M-W2 named, the host's stand-in from `routeFacts`' stretches meanwhile, and the trod record a product of the "
          "simulator feed, not a canon slot (answered by the owner) |")
I4_OLD = "37–45 and 25.75–36.25 pw among them, PLAUSIBLE until their spikes report)"
I4_NEW = ("39–47 (37–45 before file w's two person-weeks on M-W2, the price the owner accepted on 2026-10-19, J421) and "
          "25.75–36.25 pw among them, PLAUSIBLE until their spikes report)")
S1_OLD = "about **455–620 person-weeks** (the earlier 392–539 plus the two"
S1_NEW = "about **457–622 person-weeks** (455–620 before the hidden ways' two weeks; the earlier 392–539 plus the two"
S2_OLD = "the two volumes' cost (37–45 and 25.75–36.25 person-weeks);"
S2_NEW = ("the two volumes' cost (37–45 and 25.75–36.25 person-weeks; the world's 39–47 since you accepted the hidden "
          "ways' two weeks on 19 October);")
S3_OLD = "— which proceeds on its recommendation;"
S3_NEW = ("— that you answered on 19 October by following the recommendations (the price accepted and the routes milestone "
          "named, your host's stand-in from the roads' ground stretches meanwhile, and the hidden ways' record as proposed);")
S4_OLD = "the answer (file w, pending your look)"
S4_NEW = ("the answer (file w, which you accepted on 19 October by following its recommendations — the price, your host's "
          "stand-in meanwhile and the record as proposed)")
S5_OLD = "(one question, put to you on 18 October by the map's answer to your host's request): the price"
S5_NEW = ("(one question, put to you on 18 October by the map's answer to your host's request, and answered by you on 19 "
          "October): the price")
S6_OLD = "  host build its stand-in meanwhile, and the record as proposed."
S6_NEW = ("  host build its stand-in meanwhile, and the record as proposed. You followed the recommendations on 19 October: "
          "the price accepted with the routes milestone named, your host's stand-in meanwhile, and the record as proposed; "
          "the design reads it so.")
S7_OLD = "the ten decisions above (eight proceed on their recommendation until you"
S7_NEW = "the ten decisions above (seven proceed on their recommendation until you"
S8_OLD = "say otherwise; two you answered on 18 October),"
S8_NEW = "say otherwise; two you answered on 18 October and one on 19 October),"

L = {}
def frag(fid, f, old, new, loc, ev):
    return dict(id=fid, file=f, line=line_of(f, old), md5=M[f], old=old, new=new, _loc=loc, _ev=ev)
lS136 = line_of(SUM, S1_OLD)
F = []
# 976 F1
F.append(frag('976 (a)', SUM, S1_OLD, S1_NEW, "The summary — *How big the whole program is*, the whole-program line (edit)",
  f"the line sums \"the earlier 392–539 plus the two lines above\" (SUMMARY:{lS136}–{lS136+1}); the two lines above are "
  f"the world's 39–47 (SUMMARY:{line_of(SUM, '- **The world (volume 13):** about **39–47')}, file w item 969 (j)) and the "
  f"sites' 25.75–36.25 (SUMMARY:{line_of(SUM, 'about **25.75–36.25 person-weeks**')}). Low end 392 + 39 + 25.75 = 456.75 ≈ "
  "457; high end 539 + 47 + 36.25 = 622.25 ≈ 622. The same rule (each end to the nearest whole week) reproduces the old "
  "figure from the old world line: 392 + 37 + 25.75 = 454.75 ≈ 455, 539 + 45 + 36.25 = 620.25 ≈ 620; the difference is "
  "file w's 2 pw at both ends (457 − 455 = 622 − 620 = 2). `confirm-consistency.md` F1."))
# 977 F2
F.append(frag('977 (a)', IDX, I4_OLD, I4_NEW, "The index — §7, *PLAUSIBLE (reasoned, not executed)*, the prices of §1 (edit)",
  f"INDEX:{line_of(IDX, I4_OLD)} still gives V13's price as 37–45 against the V13 row's 39–47 "
  f"(INDEX:{line_of(IDX, '| 39–47 as one staged row')}, file w item 969 (c)) and V13 §8.2's staged row "
  f"(V13:{STAGED_BEFORE + 1}, file w item 964 (b): 37 + 2 = 39, 45 + 2 = 47, the 2 pw the trods ≈ 1 and the junction ends "
  "and the fork rule ≈ 1); the cause named is file w's price, which the owner accepted (J421, 2026-10-19 07:12Z: \"i "
  "follow your recommendations\"; V13 §11 Q5). `confirm-consistency.md` F2."))
# 978 F3
lS218 = line_of(SUM, S2_OLD)
F.append(frag('978 (a)', SUM, S2_OLD, S2_NEW, "The summary — *Decisions that are yours*, the world and the sites (the deferred decisions of 16 October), the cost (edit)",
  f"SUMMARY:{lS218} records the 16 October recommendation \"accept the two volumes' cost\" with V13's cost 37–45, which no "
  f"longer holds (SUMMARY:{line_of(SUM, '- **The world (volume 13):** about **39–47')}: 39–47; 37 + 2 = 39, 45 + 2 = 47). The "
  "recommendation as recorded is kept (it was the figure of 16 October) and the figure in force since file w added, with "
  "its cause: the owner accepting the hidden ways' price on 19 October (J421). `confirm-consistency.md` F3."))
# 979 F4
lB = line_of(V13, B1_OLD)
F.append(frag('979 (a)', V13, B1_OLD, B1_NEW, "Volume 13 — §10 BCR-V13-37 (§16: the world's estimate), the staged row's range (edit)",
  f"BCR-V13-37 (V13:{lB}–{lB+4}) is the request that carries V13's figure into base §16; it read 37–45 against V13 §8.2's "
  f"39–47 (V13:{STAGED_BEFORE + 1}), and no BCR-V13 request carried the +2 pw (the heads end at BCR-V13-40). 37 + 2 = 39, "
  "45 + 2 = 47. `confirm-consistency.md` F4."))
F.append(frag('979 (b)', V13, B2_OLD, B2_NEW, "Volume 13 — §10 BCR-V13-37, M-W2's widening (edit)",
  f"V13 §8.2's M-W2 row (V13:{MW2_BEFORE}) gives the 2 pw: \"file w's trods ≈ 1 pw … and its junction ends and fork rule "
  "≈ 1 pw\" (8 → 10 pw); V13 §11 Q5's answer (J421) accepts the price; the request's form (what moves, by how much, why) "
  "kept."))
F.append(frag('979 (c)', V13, B3_OLD, B3_NEW, "Volume 13 — §10 BCR-V13-37, the staged milestones' move (edit)",
  f"BCR-V13-19 recorded the world row at 28–36 pw (V13:{line_of(V13, 'the world milestones M-W0 – M-W4 (V13 §8: 28–36 pw as one staged row)')}); "
  "BCR-V13-37's move was 9 at both ends (28 + 9 = 37, 36 + 9 = 45), and with file w's 2 it is 11 (9 + 2 = 11; 28 + 11 = "
  "39, 36 + 11 = 47). File o item 877 applied the request to base §16 at 37–45 (`docs/AMENDMENTS-2026-10-17o.md:1134`; "
  "`docs/ARCHITECTURE.md:21765`), so §16's world line moves by the remaining 2 (37 + 2 = 39, 45 + 2 = 47). The base is "
  "not a target of this file (see *For the session*)."))
# 980 F5
F.append(frag('980 (a)', HRQ, H1_OLD, H1_NEW, "The host document — *The milestones named above*, the M-W2 row (edit)",
  f"HRQ:{line_of(HRQ, H1_OLD)} gave M-W2 at 8 person-weeks against V13 §8.2's M-W2 row (V13:{MW2_BEFORE}: \"10 pw\", file w "
  "item 964 (a): 8 + 1 for the trods + 1 for the junction ends and the fork rule = 10) and the same document's HRQ:"
  f"{line_of(HRQ, H3_OLD)} (\"M-W2 is 10 pw\"); the row's contents gain what file w put in M-W2, in this document's voice. "
  f"The cited line is V13's M-W2 row as file x leaves it ({MW2_BEFORE} + {SHIFT}, item 982 (a)'s {SHIFT} lines = "
  f"{MW2_ROW}; it read 3677, stale before file w). `confirm-consistency.md` F5."))
F.append(frag('980 (b)', HRQ, H2_OLD, H2_NEW, "The host document — *The milestones named above*, the M-W4 row, the staged row (edit)",
  f"HRQ:{line_of(HRQ, H2_OLD)} gave the staged row as 37 to 45 against V13 §8.2 (V13:{STAGED_BEFORE + 1}: 39–47; 37 + 2 = "
  f"39, 45 + 2 = 47) and HRQ:{line_of(HRQ, H3_OLD)}; the cited lines are V13 §8.2's staged-row sentence as file x leaves it "
  f"({STAGED_BEFORE} + {SHIFT} = {STAGED}, {STAGED + 1}; they read 3682–3683, stale before file w). The table's other "
  "rows' V13 line cites are left (see *Not items*). `confirm-consistency.md` F5."))
# 981 F6
F.append(frag('981 (a)', V13, J116_OLD, J116_NEW, "Volume 13 — §9 J-V13.116 (the trod record's door), its closing clause (edit)",
  f"J-V13.116 (V13:{line_of(V13, J116_OLD)}) put the product reading to the owner in Q5 as vetoable; the owner answered Q5 "
  f"(V13:{line_of(V13, '**Answered 2026-10-19 (J421):**')}) by following the recommendations, the product reading among "
  "them — file v item 954 (b)'s form for J-V14.57. File w's *For the session* names this clause (965 (a)); "
  "`confirm-consistency.md` §4 counted it history, but its \"(vetoable)\" now misstates the reading's standing."))
F.append(frag('981 (b)', HRQ, H3_OLD, H3_NEW, "The host document — *Open points*, the hidden ways (edit)",
  f"HRQ:{line_of(HRQ, H3_OLD)} said Q5 was \"open for the owner\"; J421 (2026-10-19 07:12Z, \"i follow your "
  "recommendations\") answered it with V13 §11 Q5's three recommendations (V13:"
  f"{line_of(V13, '*Recommendation:* accept the price and name M-W2')}–{line_of(V13, '**Answered 2026-10-19 (J421):**') + 2}), "
  "said here in the host side's terms (its bodies chain, its stand-in cover graph). `confirm-consistency.md` F6."))
F.append(frag('981 (c)', IDX, I2_OLD, I2_NEW, "The index — §6 Owner questions with recommendations, the opening paragraph (V13 Q5) (edit)",
  f"INDEX:{line_of(IDX, I2_OLD)} counts V13 Q5 among the questions carrying a recommendation, as file v item 954 (e) did "
  "for V14 Q5 before its answer was written in; the paragraph's \"of the others … each stands as recommended; vetoable "
  "until the owner rules\" must not read Q5 as one of them. Added for coherence with (d)."))
F.append(frag('981 (d)', IDX, I3_OLD, I3_NEW, "The index — §6, the V13 Q5 row's answer column (edit)",
  f"INDEX:{line_of(IDX, I3_OLD)} carried the recommendation only, \"(recommended; vetoable)\"; it now carries the owner's "
  "answer in the form of the V13 Q4 and V14 Q5 rows (\"the owner's own answer, given … (answered by the owner)\", "
  f"INDEX:{line_of(IDX, '| V13 | Q4 —')}, :{line_of(IDX, '| V14 | Q5 —')}; file v item 954 (f)). `confirm-consistency.md` F6."))
F.append(frag('981 (e)', SUM, S3_OLD, S3_NEW, "The summary — *In one paragraph* (the decisions that are yours), the hidden ways (edit)",
  f"SUMMARY:{line_of(SUM, S3_OLD)} counted the hidden ways among the decisions that proceed on their recommendation; you "
  "answered it (J421); file v item 954 (g)'s form. `confirm-consistency.md` F6."))
F.append(frag('981 (f)', SUM, S4_OLD, S4_NEW, "The summary — *How the checking went*, the hidden ways' sentence (edit)",
  f"SUMMARY:{line_of(SUM, S4_OLD)} said the answer waited on the owner's look; J421 gave it and file w was applied the same "
  "morning (`docs/AMENDMENTS-2026-10-18w.md`, its status line). `confirm-consistency.md` F6."))
F.append(frag('981 (g)', SUM, S5_OLD, S5_NEW, "The summary — *Decisions that are yours*, the hidden ways (its head) (edit)",
  f"SUMMARY:{line_of(SUM, S5_OLD)}–{line_of(SUM, S6_OLD)} gave the question and the recommendation only; file v item 954 "
  "(h)'s form (\"… and answered by you the same day\"). `confirm-consistency.md` F6."))
F.append(frag('981 (h)', SUM, S6_OLD, S6_NEW, "The summary — *Decisions that are yours*, the hidden ways (the answer) (edit)",
  f"SUMMARY:{line_of(SUM, S6_OLD)} ends on the recommendation; the answer follows it, as the sites-and-roads bullet's "
  f"\"You said yes on 18 October; the design reads it so\" (SUMMARY:{line_of(SUM, 'You said yes on 18 October; the design reads it so.')})."))
F.append(frag('981 (i)', SUM, S7_OLD, S7_NEW, "The summary — *What the two new volumes ask of you*, the count (edit)",
  f"SUMMARY:{line_of(SUM, S7_OLD)}: of the ten decisions, eight proceeded on their recommendation (the seven deferred on 16 "
  "October and the hidden ways) and two were answered on 18 October (V13 Q4, V14 Q5); with the hidden ways answered, 8 − 1 "
  "= 7 proceed and 2 + 1 = 3 are answered (7 + 3 = 10). File v item 954 (i)'s form. Added for coherence with (e)–(h)."))
F.append(frag('981 (j)', SUM, S8_OLD, S8_NEW, "The summary — *What the two new volumes ask of you*, the count (the answered) (edit)",
  f"SUMMARY:{line_of(SUM, S8_OLD)}: the third answered decision, on 19 October (J421); see (i)."))
# 982 the record
F.append(frag('982 (a)', V13, REV_OLD, REV_NEW, "Volume 13 — the revision notes under the title (a note for file x, after file w's block) (insertion)",
  f"the volume's revision notes record every amendment file that changes it (V13:{line_of(V13, '> **Owner' + chr(39) + 's word r')}, "
  f"{line_of(V13, '> **Owner' + chr(39) + 's word t')}, {line_of(V13, '> **Owner' + chr(39) + 's word u')}, "
  f"{line_of(V13, '> **The host' + chr(39) + 's request w')}; file v item 954 (a) for V14); joined to file w's block by "
  f"a bare `>` as file w's was to file u's. It adds {SHIFT} lines, which item 980's V13 line cites count."))
F.append(frag('982 (b)', IDX, I1_OLD, I1_NEW, "The index — the preamble (*What this file is*: the amendment files' state), after file w's clause (edit)",
  "INDEX:14 names every amendment file applied to the volumes (file v item 954 (d), file w item 969 (a)); file x is now "
  "one."))

# ---- the machine copy ----
recs = [{k: r[k] for k in ('id', 'file', 'line', 'md5', 'old', 'new')} for r in F]
json.dump(recs, open(f'{V}/draft-x.fragments.json', 'w', encoding='utf-8'), indent=1, ensure_ascii=False)

# ---- the draft ----
def bq(s):
    return '\n'.join('>' if x == '' else '> ' + x for x in s.split('\n'))
ITEMS = {
 '976': "**976.** **The whole program's total with file w's two person-weeks: about 457–622 person-weeks (SUMMARY).**",
 '977': "**977.** **The index's PLAUSIBLE paragraph: volume 13's price 39–47 (file w, J421).**",
 '978': "**978.** **The summary's 16 October cost decision: the world's 39–47 since the owner accepted the hidden ways' price (file w, J421).**",
 '979': "**979.** **BCR-V13-37 carries file w's 2 pw: the staged row 39–47, the move 11 pw at both ends, §16's world line 2 more.**",
 '980': "**980.** **The host document's milestone table: M-W2 10 person-weeks with what file w put in it; the staged row 39 to 47.**",
 '981': "**981.** **The owner's answer to V13 §11 Q5 (J421) at every place the question still read open.**",
 '982': "**982.** **The record: V13's revision note for file x; the index's state line names file x.**",
}
INTRO = {
 '981': ("*The question as put* (V13 §11 Q5, by file w item 966 (c)): the hidden ways' price (M-W2 8 → 10 pw, the staged "
         "row 37–45 → 39–47), whether the host's bodies chain waits on M-W2 or builds its stand-in cover graph from "
         "`routeFacts`' stretches meanwhile, and whether the trod record reaches the host as the simulator feed's third "
         "optional product rather than a canon slot. *Recommendation (as put):* accept the price and name M-W2; the stand-in "
         "meanwhile; confirm the product reading.\n\n*The owner's answer* (2026-10-19 07:12Z, J421): \"i follow your "
         "recommendations\".\n\n*Its meaning*, as V13 §11 Q5 records it (file w item 966 (c)): the price accepted (M-W2 10 pw, "
         "the staged row 39–47) and M-W2 named; the host's stand-in from `routeFacts`' stretches meanwhile; the trod record a "
         "product of the simulator feed. Nothing in the design changes; only the texts that still said the question waits."),
}
out = []
for r in F:
    it = r['id'][:3]
    if not out or out[-1][0] != it:
        out.append((it, []))
    out[-1][1].append(r)
body = []
for it, rs in out:
    body.append(ITEMS[it]); body.append('')
    if it in INTRO: body.append(INTRO[it]); body.append('')
    for r in rs:
        body.append(f"**{r['id']}.** {r['_loc']}. Target: `{r['file']}`, line {r['line']} (md5 `{r['md5'][:8]}…`) as it stands now.")
        body.append('*Current text (as it stands now):*')
        body.append(bq(r['old']))
        body.append('*New text:*')
        body.append(bq(r['new']))
        body.append(f"*Evidence:* {r['_ev']}")
        body.append('')
items_text = '\n'.join(body).rstrip('\n') + '\n'
open(f'{V}/draft-x.items.md', 'w', encoding='utf-8', newline='').write(items_text)
print('fragments', len(recs), 'V13 shift', SHIFT, 'M-W2 row', MW2_BEFORE, '->', MW2_ROW, 'staged', STAGED_BEFORE, '->', STAGED)
for f in M: print(f, M[f][:8])
