from lib import *
t = extract(2899, 3061)
R = [
("""* **A lone neighbourhood document** (V01 J-V1.36; ST-41; J-V6.102). On a hood document — one district's close-up
  opened alone, with no S4–S5 growth route — the time card and "start small" are absent, the clerk's and the CLI's
  `advance` bend to none with the line "a neighbourhood alone has no history yet — open it in its town to advance
  time" (item 101 R2), and a skeleton file's `history` block is bent to none with that line; `forkAt`, the timeline
  bar over its existing events and the history panel still work. The gate lifts when volume 6 builds hood epochs
  (§13's fix list).""",
 """* **A standalone neighbourhood document** (V01 §3.10; J-V6.102). A standalone neighbourhood document — one district's
  close-up opened alone, with no S4–S5 growth route — has no clock: the time card and "start small" are absent, the
  clerk's and the CLI's `advance` bend to none with the line "a neighbourhood alone has no history yet — open it in its
  town to advance time" (item 101 R2; V09's bend message row and V10's bend category carry it), and a skeleton file's
  `history` block is bent to none with that line; `forkAt`, the timeline bar over its existing events and the history
  panel still work. This is the decided rule (T-V6-23 tests the bend)."""),
("""* **Undo** (§7.4). The group is one undo step while its last epoch is the latest live event: the undo **restores the
  checkpoint taken before the group's first epoch** (the base takes it) and truncates the group in an unshared document —
  so undoing a hundred-epoch group needs neither a hundred undo records nor §7.4's 64-event / 20 MB window. Per-epoch undo
  records are kept for the group's latest epoch only; after the group commits, its epochs' checkpoints are dropped except
  every `history.checkpointStride`-th, which become the history store's keyframes (V06 §3.15.2). An epoch that carried a
  dossier event is never an undo target (§7.4), so a dossier-bound history is undone only by the host.""",
 """* **Undo** (§7.4). The group is one undo step (`of` its first epoch) while its last epoch is the latest live event, and its
  undo leaves exactly the fold of the log without the group:
  1. *In the session that ran it*, in an unshared document: the undo **restores the checkpoint taken before the group's
     first epoch** (the base takes it) and truncates the group (§7.4 *Truncation*) — so undoing a hundred-epoch group needs
     neither a hundred undo records nor §7.4's 64-event / 20 MB window. Per-epoch undo records are kept for the group's
     latest epoch only; after the group commits, its epochs' checkpoints are dropped except every
     `history.checkpointStride`-th, which become the history store's keyframes (V06 §3.15.2).
  2. *After a save and a reload* (the checkpoint is memory, gone): the undo rebuilds the pre-group state by §7.4's
     rebuild-by-replay — from the nearest history-store keyframe before the group, else from the creation — shown with its
     progress as a slow undo, then truncates as in (1); the undo section's saved `redo` holds the group, so a redo after the
     reload re-appends it epoch by epoch from the stored `EpochInputs`, never re-expanding the trajectory.
  3. *In a shared document* (no truncation, §7.4): the undo is an `undo` event naming the group's first event, applied only
     when every later live event is independent of the group's union touched set (§7.4 *Independence*; otherwise the dry
     run names the dependants, and "re-run from before it", V06 §4.4, is offered); every client reaches the pre-group state
     by its checkpoint or by the same deterministic replay, and the group's epochs stay in the log, undone. A redo re-folds
     them from their stored inputs.
  An epoch that carried a dossier event is never an undo target (§7.4), so a dossier-bound history is undone only by the
  host; a replay epoch at generation is none either (V06 §3.20.6)."""),
("`convert` `repairWall` (with the gap's stretch; with no stretch, \"back in use\": the neglect lifted and the pathway cleared, V06 §2.8; TU-02) | the convert's undo (the former existence and pathway restored); on a dismantled stretch it bends to a new stretch drawn on its line (`drawWall`, \"its stone is gone; a new stretch is built here\"; J-VI.4, ST-35) |",
 "`convert` `repairWall` (with the gap's stretch; with no stretch, \"back in use\": the neglect lifted and the pathway cleared, V06 §2.8; on a ring with no neglect, a no-op with its line \"this wall is in use\") | the convert's undo (the former existence and pathway restored); on a dismantled stretch it bends to a new stretch drawn on its line (`drawWall`, \"its stone is gone; a new stretch is built here\"; J-VI.4) |"),
("| a field left fallow, taken back | T2 `ground`'s land-use chip on a hinterland face | `convert` `retypeLand` | the convert's undo |",
 """| a field left fallow, taken back | T2 `ground`'s land-use chip on a hinterland face | `convert` `retypeLand` | the convert's undo |
| a spring weakened or restored (item 111) | T2 `ground`'s spring form on an oasis: the flow slider | `setAttr` on `WaterBody.spring.flow` | the event's undo; a hand flow is held: the spring row never overwrites it (V06 §3.12.1 (2)) |
| a drought on the timeline | the timeline bar's "+ at this year": a drought of N years | the circumstance timeline's event of kind `drought` (V06 §2.4; §7.7) | the base's |
| a town's past (standalone; item 113) | the creation card's history option (V09; §4.2 S0's `Blueprint.history`) | at creation, part of the recipe — the replay runs inside the creation (V06 §3.20); later, an `adjust` of the history option, which re-derives the town from S0 with its new past and replays the log's edits over it (§7.1's Re-derive), said in one line | the adjust's undo, while it is the latest live event (a whole-town event, §7.4) |"""),
("| `delete`, carrying `detail.suppress` (item 260; ST-15) — the dry run: \"The city will not rebuild this aqueduct; undo brings it back\" (for a wall \"The town will not rebuild this terrace wall\", for a deck plot \"No house will be built on this spot of the bridge\"), with the fates of the vaults, the route and the terminal |",
 "| `delete`, carrying `detail.suppress` (item 260) — the dry run: V09's `info.remove.holds` line with its `{kind}` slot (a deck plot's wording V09's variant row of that key), with the fates of the vaults, the route and the terminal |"),
("`drawWall { kind: 'retaining' }`, `drawFootprint` on the deck (V09 §4.20.3 (4)'s rows; SR3-08) |", "`drawWall { kind: 'retaining' }`, `drawFootprint` on the deck (V09 §4.20.3 (4)'s rows) |"),
("through the hand operator (\"rebuilt as a new span\"; J-VI.4, ST-35) |", "through the hand operator (\"rebuilt as a new span\"; J-VI.4) |"),
("| `convert` `repairRetaining` (V06 §2.8; ST-10) |", "| `convert` `repairRetaining` (V06 §2.8) |"),
("original (T-V6-22; seam-surfaces-r5 SR5-09).", "original (T-V6-22)."),
("""year N was condensed; the copy starts at year N" (V06 §3.15.5; J-VI.4, ST-35).""",
 """year N was condensed; the copy starts at year N" (V06 §3.15.5; J-VI.4). Inside the replayed past of a document
  generated from its history (its creation prefix) both bend to the creation's last event with the line "the past before
  year N is the town's history; the copy starts at year N" (V06 §3.20.6)."""),
("a re-run when asked (V10 prompt rule 17; seam-surfaces-r5 SR5-03).", "a re-run when asked (V10's prompt rule 17)."),
("* **`district`**, path `prosperity`: the building-shade share epoch by epoch from the masks of the history frames — \"the\n  island's shade since year N\", \"the tall houses built to its south since year N\" — beside item 72's character and\n  pressures and item 102 (f)'s daylight share;",
 "* **`district`**, path `prosperity`: the building-shade share epoch by epoch from the masks of the history frames — \"the\n  island's shade since year N\", \"the tall houses built to its south since year N\" — and a spring's flow from its `setAttr`\n  events' why rows (\"the oasis has been failing since year N\", V06 §3.12.1), beside item 72's character and pressures,\n  item 102 (f)'s daylight share and item 111's water term;"),
("**Raised ways** are answered by volume 10's raised-way provider (it serves generated ways from M3a, before this engine\nexists; X17); over epochs this volume records what it reads:",
 "**Raised ways** are answered by V10's raised-way provider (it serves generated ways from M3a, before this engine\nexists); over epochs this volume records what it reads:"),
("\"carried\nfrom year N, when the town was a city (reason …)\" (critique-V7),", "\"carried\nfrom year N, when the town was a city (reason …)\","),
("volume 3's crypt rank). The clerk proposes", "V03's crypt rank). **The town's past** (item 113) is told by V10's history story from the replay record\n(`HistoryRecord`, §2.7, written by V06 §3.20.6) and the replay epochs' chronicle — \"the walls were built when this was a\ncity of twelve thousand\"; for a symbolic peak \"its exact size is not recorded\". The clerk proposes"),
]
t = apply(t, R)
t = strip_narr_ids(t)
save('14-s4.md', t)
print(words(t))
