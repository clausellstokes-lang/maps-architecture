from lib import *
t = extract(2138, 2322)
R = [
("successors with the same names (C6-35); a person is shown dead", "successors with the same names; a person is shown dead"),
("`wallManned` at a neglect lifted by renewed threat (V06 §3.7.5; TU-02);", "`wallManned` at a neglect lifted by renewed threat (V06 §3.7.5);"),
("struck or repaired (V06 §3.19). Entries are ordered by week, then kind order, then address.",
 "struck or repaired (V06 §3.19); `springFailed`, `springRecovered` and `springDried` per spring (V06 §3.12.1); and, on a replay\nepoch, `destroyed`, `refounded` and `buried` (V06 §3.20.5). Entries are ordered by week, then kind order, then address."),
("""**3.15.2 Frames — the town at any week.** `locate(w)` (J-V6.36): for `w` after the last epoch's week, the current model;
for `w` at or before the creation week, the creation prefix's model (on a rebased document, the rebase point's, V06
§3.15.5); otherwise""",
 """**3.15.2 Frames — the town at any week.** `locate(w)` (J-V6.36): for `w` after the last epoch's week, the current model;
for `w` at or before the creation week, the creation prefix's model (on a rebased document, the rebase point's, V06
§3.15.5) — or, on a document generated from its history, the model after the first coarse replay epoch whose week is at
least `w` (the creation prefix folded to it; before the first, generation's start model; V06 §3.20.6); otherwise"""),
("so a scrub never draws a change before it happened (C6-16).", "so a scrub never draws a change before it happened."),
("""**3.15.4 The timeline bar's reading.** The bar spans the creation week to the current week (and, for a standalone
document, the planned trajectory's end as a dashed tail);""",
 """**3.15.4 The timeline bar's reading.** The bar spans the creation week to the current week (and, for a standalone
document, the planned trajectory's end as a dashed tail; for a document generated from its history, the replayed past
before the creation week as a read-only range of coarse epochs, which scrubs and compares but offers no fork or re-run
inside it, the creation being one event, V06 §3.20.6);"""),
("**3.15.5 History across a rebase and an upgrade** (§2.9's `Base`, §7.4's epoch row, §7.5; C6-15).", "**3.15.5 History across a rebase and an upgrade** (§2.9's `Base`, §7.4's epoch row, §7.5)."),
("`forkAt` and `rerunFrom` at an earlier seq **bend**\n  (J-VI.4; ST-35) to the earliest seq", "`forkAt` and `rerunFrom` at an earlier seq **bend**\n  (J-VI.4) to the earliest seq"),
("reason key — the *Identity* bullet below; SCC-R1C-6), in item 342's order.", "reason key — the *Identity* bullet below), in item 342's order."),
("`VS8` for `village.pins` (V07 §3.12; it runs VS8's\n  pin rows; TV-03) — and their draws use that id, their table reads\n  recorded under it (V11 §3.1's *Readers*, T-V11-1 (b); SCC-R2C-11).",
 "`VS8` for `village.pins` (V07 §3.12; it runs VS8's\n  pin rows) — and their draws use that id, their table reads\n  recorded under it (V11 §3.1's *Readers*, T-V11-1 (b))."),
("its span starts at the week of the next epoch\n  after that event (C6-25).", "its span starts at the week of the next epoch\n  after that event."),
("(V07 J-V7.129;\n  TW-01). Town-level draws", "(V07 J-V7.129).\n  **A replay epoch** (item 113) keys every draw as a live epoch does, its epoch component `0x8000 + r` (§6.1's replay\n  range), so no replay draw equals a live epoch's and one seed and one history replay byte for byte. Town-level draws"),
("(the key order of the departure matching and the lottery, 105 (f)'s order", "(the key order of the departure matching and the strike pool, 105 (f)'s order"),
("**The exception: a generated raised way** (item 110 (b); C6-39; J-V6.84).", "**The exception: a generated raised way** (item 110 (b); J-V6.84)."),
("the use phase's re-scored uses,\n   the lottery's candidates,", "the use phase's re-scored uses,\n   the strike pool's candidates,"),
("""Until the base's raised-way solver and operator land, the
   pass is absent and reported, as the underground participants are before V04's U5 (V06 §8, risk 8).""",
 """A build that lacks the base's raised-way solver and operator
   runs no pass and reports it, as the underground participants are absent before V04's U5 (V06 §8).
10. **The history replay** (V06 §3.20.7): a replay epoch fails as a live one does, by (1)–(9); a history the plan cannot
   read replays nothing and is reported; the budget's bend coarsens the epochs, never drops one."""),
]
t = apply(t, R)
t = strip_narr_ids(t)
save('11-s3f.md', t)
print(words(t))
