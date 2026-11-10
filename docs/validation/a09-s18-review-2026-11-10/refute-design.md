# Refuter seat on lens "design" (lens-design.md): verdicts

Read on the working tree at 74302a47. The cited code is unchanged since dba306ef for these paths. Nothing was executed:
every verdict below comes from reading the code and the draft's own words (spec-a09-s18.json S18 / S19, the memo, and
working-notes.md).

| id | verdict | in one line |
|---|---|---|
| DESIGN-1 | confirmed | The key sees neither the `through` set nor junction flags nor route beyond F's vertices. Stale entries follow, and no bar re-judges a kept entry. |
| DESIGN-2 | confirmed | In a stage run no caller reaches the state read, and the shadow "reads the store only". LINE 6's gates are 0 / 0. |
| DESIGN-3 | confirmed | `before` must compute a key made of half-widths, and splitFace has no widths. The draft states both facts and never joins them. |
| DESIGN-4 | partly | Inherited root attraction breaks oracle (i) and the "equal rings" relation on a correct build: verified. The T-vertex 1 cm mechanism is plausible but not verified. |
| DESIGN-5 | partly | The generation facts are true. The §3.7 harm needs DESIGN-1's incomplete key. What remains is history dependence within the bound. |
| DESIGN-6 | partly | The contract change is real. But the draft does plan a §3.7 paragraph at 2B. What it misses is §3.3's bullet, :5359-5362, :5636, and a test that can see it. |
| DESIGN-7 | confirmed | writeOutlines' up-front state read keeps the entry before offRead (:602) runs. The "entry retired" pin cannot be arranged. |
| DESIGN-8 | confirmed | No S19 line gates on the CITY diagnostic on the switched trajectory, and nothing judges kept entries. |
| DESIGN-9 | partly | The three conditions, the LINE 5 / LINE 3 contradiction and the misdescribed T-end pin are all true. The cap-mutant reasoning and the proposed pin set need correcting. |
| DESIGN-10 | confirmed (stronger) | Stored spines in splitsOn are wrong at the child's FIRST derivation, at the lane's own T. |
| DESIGN-12 | partly | X(F) is a sound measurement. But it shares LINE 3's clip, so it does not replace oracle (i). Successive rounding may exceed 1 cm. |

## DESIGN-1: confirmed

- **The key.** S18 LINE 1's key is the vertexContacts flag, the route rings with straight-through vertices dropped, "per
  route edge its spine keys", and "per spine its half-widths sampled at the kept route vertices and its declared ends".
  None of these names the vertex-only set.
- **The vertex-only set.** readFace collects that set (`through`) at kerb.ts:399-425 from route edges leaving F's route
  vertices. censusRead adds the reaching ones to the read's spines at kerb.ts:1735-1739.
- **Even read generously,** taking "per spine" to include the `through` spines, the key would still miss two things:
  - the junction flags. junctionEnd (kerb.ts:303-324) returns false as soon as a same-role chain has count 1 at the
    vertex (:321). So a lane ending at an existing junction keeps its round cap, and it flips an existing way's end there
    from flat to capped.
  - the route beyond F's own vertices. spineParts keeps every segment within `2·hw + SAGITTA + 4` of F's box
    (kerb.ts:562-565).
- **The flat end.** A flat end stops on the line through the end vertex, square to the last segment (kerb.ts:595-597,
  :697-699; support.ts:695-699). kerbEndsSquare admits a kerb end within 85–95° (ladder.ts:751-769; cut.json
  portalArrivalCdeg [8500, 9500]). So a corner can reach up to about 0.087·hw past a zero-width line.
- **The continuation.** continuationVerdict (ladder.ts:777-783) admits a continuation only where
  rank(spine) ≤ rank(cut), so the lane is of the same or a higher class.
- **No bar re-judges a kept entry.** LINE 5 judges "every derived kerb ring"; LINE 4's shadow runs only where the read
  "would DERIVE"; S19 LINE 1's oracle runs "beside every DERIVED read".
- **Correction to the wording.** Pin (c) on its own fixture (a crossed spine at least as wide as the lane, square) is
  correct to serve. What makes stale serving required is the key rule, not pin (c). The proposed (c1) / (c2) split says
  exactly this.

## DESIGN-2: confirmed

- **What the draft says.** LINE 1: "In THIS round only the STATE READ (line 4) fills or serves the store". LINE 4: the
  shadow "writes nothing, reads the store only". LINE 3 derives only where "its parent's key has an entry (or itself
  derives first …)", and a root has no entry.
- **Who reads in a stage run.** Every stage read is kerb() or readKerb: bentCutFabric.ts:653, :729, :924 and
  measure.ts:572 (the harness's L1 read batch). LINE 4's own evidence: no package imports kernel internals.
- **No answer in the notes.** working-notes.md never addresses who fills the store in a stage run (grep "fills", "feeds",
  "reads the store": only the generator line).
- **The proposed feed is right.** A debug-only feed from served constructions keeps LINE 7's prod-bundle counts. Note
  that DESIGN-3 still has to be solved before the feed can find a parent.

## DESIGN-3: confirmed

- **The two facts.** LINE 2's evidence says "splitFace takes no widths", yet its required_change says "`before`
  computes the parent's content key (line 1)".
- **What the key needs.** The key needs half-widths. straightRun's drop reads hw (kerb.ts:517). readFace drops a chain
  whose widths answer is null (kerb.ts:375-379).
- **What the observer gets.** splitFace and connectHole get rows only (split.ts:171-174, :204-207). The widths are a
  closure made per read (bentCutFabric.ts:653 `spineWidthsOf(this.ctx.widths)`).
- **The re-mint sub-point is accurate.** mintOne('way', cellHash, run.counters[cell]) at :820; `counters[cell] += 1` only
  after the floor at :864; takeOut / forget pop at :788, :824.
- **But its hazard is weak.** A stale lineage record matters only if a later face reproduces that child's exact content
  key. The proposed "lane no longer where placed" pin is cheap insurance, not a blocker.
- **Another fix exists.** The two-key change is one valid fix. Alternatively the state module could hand the observer
  the widths of the last state read on that Plat. The draft must pick one.

## DESIGN-4: partly

- **Verified:**
  - every lineage root is a kept construction (S18 LINE 3; S19 LINE 1);
  - a construction may move a boundary point by up to DRY_MOVE_CM = 2·√2·attractCm + SAGITTA_CM (kerb.ts:671-679);
  - region(parent) ∩ side − buffer(lane) keeps that stretch.
- **So two bars fail on a correct build:**
  - LINE 5 (i) (1 cm + SAGITTA_CM, 0 misses; a 20 cm grid);
  - LINE 5 (ii)'s "equal canonical rings where the construction moved no part". Its `attracted` flag is the child's own
    (LINE 4), and its escape clause needs (i) to pass.
- **Not in the draft.** Neither the draft nor the notes treat ancestor attraction. The only inheritance class is the
  spine "no longer incident" one (Q4).
- **Unverified.** Point 3 (the T-vertex rounded ≤ HOT_PIXEL_CM = 0.71, index/items.ts:32, making the child's corner
  differ by 1 cm) is a plausible mechanism. It may be absorbed or amplified by the construction's own snapping and
  attraction near T. It has to be measured before it is used to size the gate.
- **Correction to the change.** The (false, false) ≤ 1 cm row must exclude DESIGN-9's classes ('inherited', 'contact',
  'end-changed'). Otherwise it fails on cases the draft already means to count.

## DESIGN-5: partly

- **The code facts are confirmed:**
  - the generation moves only when p.version ≠ image.version (savepoint.ts:252; comment :209-210);
  - reject restores the batch image (tx.ts:136-139);
  - a batch that wrote nothing restores at the same version (tx.ts:590-594);
  - S8 runs one batch per district with onFail 'reject' (bentCutFabric.ts:1596);
  - a refused district is recorded and the stage goes on (stage.ts:126-129);
  - the runner rolls back only arenas whose version moved (runner.ts:218);
  - cells are cut depth-first (bentCutFabric.ts:1616-1628);
  - the harness commits corridorUnion for every district id (measure.ts:552, :589-595).
- **What the draft intends.** S18 LINE 1 intends this: "a rejected batch restores the arena and the restored face's
  content selects its entry again". That is sound exactly when an entry is a function of its key.
- **Where the harm comes from.** The §3.7 harm the finding describes (cell 1's uncommitted lane reaching cell 2's root,
  then removed by the reject) is DESIGN-1's incomplete key. With DESIGN-1's key, F2's key changes and the entry is not
  served.
- **What remains.** A construction also depends on arena content outside any face key: the dry-run lays parts on the
  real arena, and attraction reaches nearby vertices. So an entry made in a rejected or read-only batch can differ from a
  fresh construction, within DRY_MOVE_CM. That is history dependence (DESIGN-6), not a §3.7 breach.
- **"A read changes a later commit"** holds only through that context difference.
- **Severity.** It is a blocker only together with DESIGN-1.
- **The ruling it collides with.** The "kept state is made by a commit" rule is a clean remedy, but it needs a tx/ signal
  and so collides with ruling (e)'s "no … tx/ file changes". The session must choose between:
  - a complete key plus the declared history dependence; or
  - widening scope to tx/.

## DESIGN-6: partly

- **The contract change is real.** ARCHITECTURE.md:4640-4643 (§3.3 slot-renumbering bullet), :5359-5362 ("the same
  function on the same inputs") and :5636 ("a regeneration from the same inputs yields the same arena") all assume kerb
  is a function of the arena. Under ruling (e) the store is not carried by encode or decode, so it is not.
- **The draft does name some design text.** The finding says the draft never names design text. In fact the S18 session
  text asks the seat to "Write in your notes, verbatim-ready, the paragraph 986 (c) proposes for §3.7 … and the one
  sentence kerb.ts's module comment (:115-122) narrows …: the session applies them with 2B's switch". So the draft does
  plan design text through the session.
- **What it misses** is §3.3's bullet, the :5359-5362 sentence and the :5636 row.
- **representation.test.ts will not go red as it stands.** testkit/test/kernel/arr-bands/representation.test.ts runs
  kerb then corridorUnion on fixtures with no splitFace (:78-92). Every first read is a construction on both the original
  and the decoded copy. So the test needs the S8-like case the finding proposes in (c), or it cannot see the change.
- **Unverified.** Flows 2–4 (the M1 pool, M1's S9, M2a redo) concern code that is not on this tree.

## DESIGN-7: confirmed

- **The order of reads.** corridorUnion passes vertexContacts true (corridorUnion.ts:50). writeOutlines reads every face
  up front through readOn → readKerb (bandUnion.ts:584-586, :627-632). offRead then reads again in the same batch
  (:602).
- **Under S19 LINE 1** the up-front read keeps its construction. The op's L2 writes leave an L1 key unchanged
  (readFace's route filter at kerb.ts:357, rows at :370).
- **So both of the draft's offRead pins fail:**
  - "entry retired → offRead as before" cannot be set up within one op;
  - on a loaded copy a later L1 read is a construction that offRead never pinned for.
- **The proposed change is right:** offRead always reads by the construction read.

## DESIGN-8: confirmed

- **Where the debug oracle lands.** S19 LINE 1 says the debug oracle is "recorded … (never thrown; derived.test.ts and
  the CITY probe judge it)".
- **No S19 line runs that probe with a failing bar on the derived kerbs.** Lines 7 and 10 use "S18's probe form" only to
  measure tips and RL6. LINE 3 (2) holds only derived.test.ts's bars on the switched tree.
- **Folder check.** agreement-corridor.test.ts exists (:1-5), and no file in either bands folder calls splitFace.

## DESIGN-9: partly

- **Confirmed:**
  - the three conditions of the algebra;
  - condition 2 fails through laziness plus DESIGN-1's key, since a later lane's T is straight-through and its chain is
    in `through`;
  - condition 3 fails through junctionEnd's flip;
  - LINE 5 (i) ("in no spine's buffer … 0 misses") contradicts LINE 3's "inherited … counted";
  - LINE 3's pin text ("the band ends square on that spine's band edge") misdescribes the code, which ends on the line
    through the end vertex square to the last segment (kerb.ts:593-597; support.ts:695-699).
- **The holes example** is the draft's own 'inherited' class (LINE 3), not a new gap.
- **The cap-mutant reasoning is incomplete.** For a lane square to the crossed spine, the cap lies wholly beyond the end
  line. That line is the child's boundary there, and the derivation clips to the child's rings. So the mutant changes
  no child kerb whatever the widths.
- **The proposed pin set must change accordingly.** It must be OBLIQUE (say 60°) with hw_lane·|cos θ| > hw_crossed, for
  example onto a zero-width chain. The proposed "lane WIDER … square" pin does not kill the mutant on a derived child.

## DESIGN-10: confirmed, and stronger than stated

- **The code.** Spine.hwAt is Map<VertexId, number> (kerb.ts:183, :279-281). junctionsOf reads `hwAt.get(v) ?? 0`
  (:2361). bandCore skips a read with no spine (bandUnion.ts:635).
- **Wrong at the first derivation.** The lane's own T-vertex on the crossed spine S is made by the cut, so S's stored
  hwAt from the parent's read has no entry for T. At the child's junction at T (ein = [S], eout = [lane], not shared),
  hwIn reads 0. So a stored-spines splitsOn is wrong at the child's FIRST derivation, not only after a neighbour's later
  T.
- **The draft is ambiguous.** LINE 1 keeps "the spines it was read against"; LINE 3 uses "the parent's spines still
  incident"; memo risk 7 proposes keeping spines.
- **The pins should state that** the served `spines`, `census` and `warnings` are defined.

## DESIGN-12: partly

- **The measurement is cheap and worth having.** It is REPORTED only.
- **X is not independent of the clip.** X is LINE 3's clip looped over every spine, so it shares that clip's defects.
  X against the derived region classifies lineage effects (DESIGN-4, DESIGN-9). It cannot stand in for oracle (i) or
  the grid against the clip itself.
- **The "≤ 1 cm" expectation is not guaranteed.** A loop of clips rounds new vertices after each spine, and successive
  rounding can exceed 1 cm.
- **Serving X moves more than the draft's shift.** Every attracted ROOT read would move too, a larger shift than 2B's
  "≈ 3–8 %". 986 (c) and ruling (e) would need re-ruling, as the finding concedes.
- **Minor cite.** The draft cites dryrun.test.ts:79. The assertion is at :80 (bits at :75), as the finding says.

## Missed

- **DESIGN-11 is not in the findings array.** The lens summary counts twelve findings and a minor DESIGN-11; the array
  carries eleven.
- **No line says how the key's straight-through drop applies to a face's ROUTE RINGS.** straightRun's rule is written
  for a spine line with one half-width per vertex. A ring vertex can lie on several spines with different widths, or on
  none, so the key's drop rule there is undefined.
- **Gap between the construction and the key.** The construction lays the UNREDUCED lines (spineParts uses straightRun
  only when faithful, kerb.ts:554). Two routes that differ by a straight-through vertex therefore share a key while
  their constructions differ by snapping. That is the draft's own LINE 6 (ii) exact-share risk at every T, and it is
  not separated from DESIGN-4's root class.
