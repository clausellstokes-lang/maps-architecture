# Does the corpus raise our confidence? A preliminary answer

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat corpus-preview/synthesis; PARTITIONED until the reconciliation stage.

Lane `corpus-preview/synthesis`, 2026-09-26. Written for the owner, in plain language. It sums up three read-only
surveys of SettlementForge's map corpus (`~/Desktop/settlement-engine/map-corpus`): `look.md` (the drawing style),
`plan.md` (street and building layout, plus the corpus's studies of the competitors) and `history.md` (the historical
research). It sets their findings against our ruled confidence (`docs/CONFIDENCE.md` §1–§2). **This file is not an input
to any current design document.** It stays in `partitioned/` until the reconciliation stage.

## The short answer

**None of the "matching" numbers moves.** The corpus holds no new measurement of any competitor. Its pictures are drawn
by an AI image model in a painted style that none of the five competitors uses. Its historical research proves only
that things *could* happen, never how often. So our chance of matching what the competitors' maps do (about 85 %), how
they look (about 70 %) and their speed and simplicity (about 65–70 %) all stay where they were, and so does the overall
chance of about two in three.

**It does help with "exceeding" them, but mostly by making "better" checkable, not by making it likelier.** It gives a
measuring stick for a hand-painted look. The flat competitors (MFCG, Neighbourhood, the Village Generator) measure far
outside it. Two others reach it with machine texture, so the stick needs an eye check beside it. It also gives a checklist of
the mistakes machine-drawn maps make, and independent historical support for the *shape* of our growth-and-decline model.
Against that, it shows three things. Our design does not yet contain any of the hand-drawn effects it measures. "Look
like MFCG" and "look like the corpus" pull in opposite directions in a few places. And five of our realism rules, as we
currently word them, are contradicted by its evidence. No figure for "exceeding" was stated before this look. My first
figure is **about 60 %** (PLAUSIBLE, a judgment).

**The partition held.** Nothing from the corpus is in the current design (checked in §4).

| question | before this look | after this look | what changed |
|---|---|---|---|
| we match what their maps **do** | about 85 % (ruled range 0.77–0.83) | about 85 % (0.77–0.83) | nothing |
| we match how they **look** | about 70 % (ruled range 0.78–0.83) | about 70 % (0.78–0.83) | nothing |
| we match their **speed and simplicity** | about 65–70 % | about 65–70 % for the design as it stands; roughly 60–65 % if the painted look became the default | nothing now; one conditional risk |
| we **exceed** them | no figure stated | about 60 % (first figure, not a revision) | "exceed" is now measurable for the look and has a checklist for realism |
| **overall** | about two chances in three | about two chances in three | nothing |
| (for completeness) we reproduce their actual **method** | 0.53–0.55 | 0.53–0.55 | nothing |
| (for completeness) same seed gives the same map | about 0 | about 0 | nothing |

The "before" figures are the ones given to this lane: the ruled ranges from `docs/CONFIDENCE.md` §1 and the manager's
plain estimates. The plain estimates and the ruled ranges are two different yardsticks. I keep both, and the corpus moves
neither. Every confidence figure in this file is a judgment (PLAUSIBLE). The facts behind them are marked CONFIRMED only
where a survey lane or I executed the check.

## 1. What the corpus is, and what it is not

The corpus is SettlementForge's reference library for drawing maps. It has three parts, plus SettlementForge's own map
design. We deliberately did not open that design: `GENERATION-SPEC.md` and `MORPHOLOGY-PLAN.md`, under the owner's
partition rule.

**1. Reference pictures ("plates"), with measurements.** The corpus's measurement table holds 313 plates. Fifty-three
are held back as a test set, so 260 are usable. The corpus calls the test set blind, but its own atlas says every plate
was viewed at some point while the corpus was made (plan §4.6). None of our lanes viewed or measured a held-back plate.
Every plate was drawn by an AI image model in one chosen style, a *painted surveyor's folio*: warm cream paper, watercolour washes and a thin, slightly
wavering brown ink line. The corpus has its own measuring tools for colour, ink darkness, paper texture, wash texture,
line weights, how busy the town fabric is, the street-junction mix and building shapes. It also keeps a list of twelve
"banned" habits that give a machine-drawn map away (look §1.1).

What the plates are **not**:
- They are not surveys of real towns.
- They are not the output of any competitor's generator.
- They are not evidence of how MFCG, the Village Generator, Neighbourhood, FTG or Fantasy Manor draw (look §3.1).
- They are not to scale. No plate converts to metres (plan §4.2).
- They are not clean examples. The corpus's own rules say AI pictures can teach a visual vocabulary but never
  historical fact, and that agreement between AI pictures is not corroboration (plan §4.1). The plates also often break
  their own banned habits. By eye, about 23 of the 64 plates viewed show machine-even spacing, and about 14 of 64 slip
  into side-view drawing (look §1.2).

**2. A historical registry.** It holds 32 short claims about 23 real European towns, each tied to a published source,
plus about 60 prose notes on villages and on how buildings change over time. Its rules are strict:
- Every entry proves only that something *could* happen, never how often (history §1.1, §4).
- No entry carries a usable measurement: no dimension, rate or count.
- No geometry may be copied. It is citation-only.
- The expansion that would add more cases has not started (history §3.1).

The registry passes its own integrity check, re-run on a copy (CONFIRMED, history §0).

**3. Three prior-art studies.** These are written studies of watabou's 2017 open-source ancestor of MFCG, of FTG's
public documentation and of FMG, the world-map tool that opens MFCG for its towns. The studies read code and documents.
They ran nothing (plan §1.5).

**How much of it was looked at** (sample sizes; nothing below is projected to the whole corpus):

| survey | what it covered |
|---|---|
| look | 64 of the 260 usable plates, viewed once each as small previews, chosen by type rather than at random; the corpus's measurements recomputed on all 260; 39 competitor screenshots measured with copies of the corpus's own tools |
| plan | the corpus's layout measurements on 31 whole-plate windows (village 3, town 17, city 7, metropolis 4); 5 plates viewed; the three prior-art studies read in full; our own MFCG exports and FTG data re-measured for comparison |
| history | all 32 registry records, the three research documents (towns, villages, buildings) and the expansion protocol read in full, and the registry's integrity check run on a copy; no plates viewed |

## 2. The confidence figures, before and after

How to read the ruled ranges: "0.77–0.83" means a 77–83 % chance. Section references such as "plan §1.5" point into the
three survey files next to this one.

### 2.1 Matching what the competitors' maps DO: about 85 % before, about 85 % after (ruled 0.77–0.83, unchanged)

The corpus changes nothing here, for four reasons:

- **It holds no new facts about the competitors.** Its three studies read the same 2017 source code and the same FTG
  documentation that we did. They agree with our reading on about twenty points (plan §1.5, §2.1–§2.2). Every one of
  those points was already confirmed line by line in our own checks. The agreement makes a shared misreading less likely,
  but it moves no number.
- **Where the studies disagree with us, our evidence wins every time.** That evidence is source lines we checked, maps we
  exported, and FTG data we decoded (plan §1.5, §2.3). This quietly supports the kinds of evidence CONFIDENCE.md rests on.
- **It cannot tune the rules we have to invent ourselves.** These are the rules the competitors never published: how
  blocks are cut, how districts grow, how wide lots are, and how dense a town is. The corpus has no scale and measures
  nothing at that level (plan §1.6, §3.1). That gap stays where CONFIDENCE.md §5–§6 put it. It will close through our own
  MFCG exports, Neighbourhood size sweeps and FTG captures.
- **Two small corrections to our own records turned up.** Neither moves a number, and both wait for reconciliation.
  - On the one FTG town we decoded, FTG's streets have about 0.39 crossroads for every T-junction. The FTG study claims
    FTG is T-junction-dominated. The decoded town says otherwise, but this is one town (plan §1.3, §3.3; CONFIRMED on
    that data).
  - FMG may use a newer population-to-size formula for MFCG than the one our MFCG row G2 cites. The weight is low (plan
    §1.5, §3.4; PLAUSIBLE).

Reproducing their actual method (0.53–0.55) and getting the same map from the same seed (about 0) are also unchanged
(plan §2, closing line).

### 2.2 Matching how they LOOK: about 70 % before, about 70 % after (ruled 0.78–0.83, unchanged)

- **The corpus's look is a different medium from every competitor's.** MFCG is a grey-buff monochrome print. Neighbourhood
  is flat graphics. The Village Generator is an illustrated colour plate. FTG is a lit web map, and Fantasy Manor is a lit
  roof plan (look §1.4). Distance from the corpus is therefore not distance from MFCG. For matching the competitors, our
  own captures of them remain the target (look §3.1).
- **In a few places the corpus draws differently from the competitors, and for matching, the competitors win.**
  - MFCG and FTG draw near-rectangular buildings; the corpus draws irregular ones (plan §1.3).
  - MFCG draws more gates than the corpus.
  - MFCG spaces its towers evenly, which the corpus counts as a machine tell (plan §3.2).
- **Our default colours already sit nearer the corpus than MFCG's do.** Our paper is about 238 on a 0–255 brightness
  scale, against MFCG's 198 (look §2.2, CONFIRMED arithmetic on the colour values; how a finished render measures is
  PLAUSIBLE). Those colours were our own choice, made before this look (the `docs/ARCHITECTURE.md` role table and
  decision D-1, "MFCG family"). They also show that nearer the corpus can mean further from MFCG's exact colours. For look
  parity, which asks for the same style class rather than the same pixels, that does not matter (my reading, PLAUSIBLE).

### 2.3 Matching their SPEED and simplicity: about 65–70 % before, about 65–70 % after for the design as it stands

- **The corpus says nothing about speed** (plan §1.4). The prior-art studies stress how small the competitors are. The
  2017 MFCG is about 4,400 lines. FTG's author reports about 70,000. That repeats a concern we already had and adds no new
  evidence (plan §3.5).
- **One new pressure, and only if the owner opts in.** The corpus's hand-painted look depends on six effects:
  - lines that waver;
  - line widths that swell and thin;
  - corners that overshoot;
  - washes printed slightly off their outlines;
  - washes that grade across each shape;
  - blemishes on the paper.

  None of these is in our design (look §3.4, CONFIRMED by search). MFCG's largest cities draw about 46,000 filled shapes,
  and applying effects shape by shape costs time. If the painted look became the default, my unmeasured guess is that
  speed-and-simplicity confidence drops by about five points, to roughly 60–65 %. If it stays an optional separate style,
  the effect is small. No render of our design exists yet, so this is PLAUSIBLE only.
- **The history findings could add parts, too.** Examples are a land-reclamation step and a second market that needs a
  cause (history §5.3). Each would be small, and each is the owner's call at reconciliation.

### 2.4 EXCEEDING them: no figure before, about 60 % after (a first figure, not a revision)

No number for "exceeding" was stated before this look. CONFIDENCE.md grades parity only. Its §1 says its numbers measure
parity, "not of product quality". So what follows is a first figure, and nobody should read it as the corpus having
moved something.

**What the corpus adds:**
- **A way to measure a better look.**
  - MFCG scores 0.00 on both the paper-texture and the wash-texture measures. Neighbourhood scores 0.00 on paper texture
    and a median of 0.0 on wash. The Village Generator sits well below both ranges. The plainest usable plates score 0.60
    and 0.74 (look §1.3, §2.1; CONFIRMED on 39 competitor screenshots).
  - Five of the seven measures give the same result at screen size as at full plate size, so they can grade our renders
    (look §1.3).
  - **A correction to the look survey's summary.** It says every competitor measures outside the target. That is too
    strong. I re-read its data file (`look-data/comp_measure.json`, CONFIRMED):
    - FTG's wash score falls inside the corpus's range on all six frames. The median is 3.36, against a corpus median of
      3.29.
    - FTG's paper texture falls inside the range on two of six frames.
    - Fantasy Manor's paper texture is 3.29, just above the top of the range (2.96). Its wash median is 4.5, just above
      the top (4.39).

    Both come from lit texture tiles and a repeated noise pattern, not from a hand. So the measures separate *flat* maps
    from textured ones. They do not separate painted texture from machine texture.
- **A checklist of mistakes.** The corpus bans twelve drawing habits, including machine-even spacing, drift toward
  concentric rings, empty blocks, side-view drawings slipping into a top-down map, and garbled lettering (look §2.4).
  The historical research adds 22 town and 22 village "forbidden inferences" (history §2.7). A generator that works by
  fixed rules already starts ahead on lettering and on a strict top-down view.
- **Independent support for the shape of our history model.**
  - Plots are cut from the street frontage.
  - Walls are dated projects fitted to roads and existing plots.
  - Gates face the approach roads.
  - Suburbs grow outside the walls, and later walls take them in.
  - Towns shrink as well as grow.
  - Buildings change part by part instead of being rebuilt.

  13 of the 28 rule rows on the history survey's scoreboard have at least one historical witness that they are possible.
  Three of those fit only loosely or rest on one case (history §1.2, §2.1–§2.5).

**What it complicates:**
- **None of the hand-painted effects exists in our design.** Adding them would be new capability, which is the owner's
  decision (look §3.4).
- **The measuring stick can be fooled.** FTG and Fantasy Manor reach or pass the texture ranges with machine texture, as
  shown above. Three plates drawn in the wrong projection still score high on the corpus's own style index (look §3.2).
  Meeting the numbers is necessary but not enough, so an eye check at full resolution remains essential.
- **"Match" and "exceed" pull apart** on building squareness, gate count, tower spacing (plan §3.2), FTG's crossroads
  (plan §3.3) and how finely the town fabric is drawn (look §3.5).
- **The two surveys disagree on fabric fineness at metropolis size.** I found this when comparing them. At town size both
  find MFCG coarser than the corpus: 29.5 and 37.5 against a corpus median of 54.5. At metropolis size they point in
  opposite directions. The look survey finds MFCG coarser (67 against 80–120). The plan survey finds it finer (108
  against 84).
  - They used different tools. The look survey ran the corpus's picture tool on one screenshot, with a hand-set window
    about two-fifths of the frame wide and buildings about 9 pixels across. The plan survey counted exported building
    shapes.
  - The look figure may undercount (PLAUSIBLE). Until someone re-measures, the question is open.
- **Our realism rules meet contradictions.**
  - Prosperity is the central lever of our plot model, and it has no historical witness at all.
  - Five of our rules, as we currently word them, are contradicted:
    - materials climb with wealth;
    - buildings grow taller with wealth;
    - terrain and water never change during decline;
    - a town has one market;
    - the cathedral and the market sit in the centre.
  - Our fixed order of decline is the kind the village research forbids (history §1.2, §3.2–§3.6).
  - The history survey marks its reading of our design on the two market rules as PLAUSIBLE. Our heights exist only to
    cast shadows, so the height rule bears on realism, not on the drawn map.

  Each rule can be reworded as a conditional rule (history §5.3), but only at reconciliation. The history offers no
  numbers, now or later (history §3.1).

**The figure.** I put the chance at **about 60 %** that SettlementForge ends up clearly better than the competitors on
the points our design already aims at:
- zooming in and out;
- seeds that reproduce a map, where FTG has none;
- real lots instead of MFCG's lots drawn as buildings;
- a real-world scale, which Neighbourhood lacks;
- a history of growth and decline.

CONFIDENCE.md §1 names three of these weaknesses: FTG's missing seed, MFCG's lots drawn as buildings and
Neighbourhood's missing scale. Our design's comparison table in `ARCHITECTURE.md` notes MFCG's lack of zoom. The history
of growth and decline is our own addition. The arithmetic is simple. Reaching parity first is about two in
three. Because these improvements are already in the design, I put the step from parity to "clearly better" at roughly
nine in ten. Two-thirds times nine-tenths is about 60 %.

For a painted, hand-made look beyond the competitors, the odds are **about even**, and that look is not yet in scope.
Nothing for it is designed. The measuring stick can be fooled. Most of the corpus's hand targets beyond texture rest on
one to three plates each (look §3.6).

All of this is PLAUSIBLE. **Honest net:** the corpus mostly makes "exceed" *checkable*. It does not make it *likelier*.

### 2.5 OVERALL: about two chances in three before, about two chances in three after

No part moves. The one new risk, painted effects slowing the biggest maps, applies only if the owner makes the painted
look the default. The corpus's real value to the overall chance comes later: at reconciliation it offers a second,
independent check on the look and on realism. That is worth having, but it is not evidence today.

## 3. What the corpus can and cannot do for us at the reconciliation stage

### What it can do

| use | what it gives | how far to trust it | source |
|---|---|---|---|
| grade our finished maps on colour, ink darkness and texture | five measures that hold at screen size; the corpus's own tools, which reproduce exactly when copied | good as a floor, not as proof of quality; it needs an eye check beside it | look §1.1, §1.3, §5.2–§5.3 |
| catch machine-drawn habits | 12 banned drawing habits, plus 22 town and 22 village "forbidden inferences", plus a list of building overclaims | good: these are checklists, not numbers | look §2.4, §5.4; history §2.7 |
| rough checks on how the town fabric reads | junction mix, dead-end share, block shape and block-size spread, how ordered the streets are, how finely the fabric is drawn per size | low to medium: no scale, hand-set windows; usable only by running the corpus's tools on our own renders | plan §1.2, §1.6, §5.1, §5.4 |
| building-shape check, if the painted look is chosen | how irregular building outlines are | medium, for villages and close-ups only | plan §1.3, §1.6 |
| historical sense-checks | witnesses that a rule is *possible*; rewordings of our contradicted rules as conditional rules; period tags that favour 1100–1500 cases | good for "is this possible?"; useless for "how often?" | history §1.2, §5.1, §5.3, §5.5 |
| corrections to our own records | FTG's crossroads-rich streets on the one decoded town; FMG's possibly newer size formula for MFCG; four errors in the corpus's MFCG study that we must not import | CONFIRMED for FTG on one town; the others PLAUSIBLE | plan §1.5, §5.6 |

### What it cannot do

- **Tell us anything new about how the competitors behave or look.** The pictures are AI-drawn in a medium no competitor
  uses (look §3.1; plan §4.1).
- **Tune the rules we must invent.** It cannot set block cutting, district growth, lot widths, density per hectare, the
  share of a town inside its walls, or district counts. It has no scale and measures nothing at those levels (plan §1.6,
  §3.1).
- **Supply any frequency or any number from history.** Every record proves possibility only. It says nothing about where
  wealth sat in a town, walls turning into ring roads, stone robbing, shrinking wall rings or where noxious trades went
  (history §3.1–§3.3).
- **Say anything about speed** (plan §1.4).
- **Turn hand counts into rules.** The corpus's own rules forbid it (plan §4.5).
- **Guarantee quality.** Meeting its numbers is necessary, not sufficient (look §3.2; §2.4 above).

### Decisions the owner will need to make at reconciliation (listed here, not decided)

1. **The painted look.** Should the corpus's painted targets apply to our default look, to a separate painted style
   only, or to neither (look §5.1)? This would be new capability, not a repair.
2. **Where MFCG and the corpus disagree, which wins?** The disagreements are building squareness, gate count, tower
   spacing and fabric fineness (plan §5.2).
3. **Our seeded variety.** Is it a product choice rather than a claim about historical frequency? This is needed because
   the corpus's rules forbid features switched on by chance (history §5.4).
4. **Our unwitnessed rules.** Should we commission documentary research for them (prosperity, walls into roads,
   noxious trades), or keep them as declared design choices (history §5.2)?

If the owner wants any single finding looked at before reconciliation, that is the owner's call. By default, all of this
waits.

### What the reviewing seat should re-check first

- **The texture correction in §2.4.** FTG's wash is inside the range, and Fantasy Manor is just above both ranges, where
  the look survey says "passes" and "every competitor ... outside".
- **The fabric-fineness disagreement at metropolis size** between the look and plan surveys (§2.4). It needs one
  re-measurement on the same MFCG map with both tools.
- **Nothing can be graded until our generator produces a map.** The corpus's layout tools need Python libraries
  (numpy, scipy, scikit-image) that this machine lacks. Running them on our maps is one lane's work (plan §5.1).
- **Items for the corpus's owner.**
  - One plate may be a side-view picture that was not flagged (hf16).
  - Fantasy Manor fools the texture tools.
  - The naming scrub list misses at least four plates with dates or real names (hf34, hf35, hf40, hf72). Treat all plate
    lettering as unusable.
  - Two published corpus figures include held-back plates and must be re-derived without them: the fabric-fineness
    ladder and one burgage-plot ratio (look §5.8; plan §4.6–§4.7, §5.7).

## 4. The partition: nothing from the corpus went into the current design

**Confirmed.** I ran these checks at 2026-09-26 00:42, just before writing this section. The output is saved in the
session scratchpad as `corpus/partition_check.out`.

- **The design documents contain no corpus material.** I searched the current design documents for anything the corpus
  would leave behind: the corpus path, plate numbers, the corpus's tool and record names, its measured figures, and this
  preview's own file names. The search found **0 hits** in each of these files:
  - `docs/ARCHITECTURE.md` and `docs/DEFINITION.md`;
  - both amendment files;
  - `docs/CONFIDENCE.md`, `docs/IMPROVEMENTS.md` and `docs/ARCHITECTURE-VALIDATION.md`;
  - the fix-all round-4 drafts written while this preview ran.

  Every other hit under `docs/` falls into one of three groups:
  - older instructions that *set up* the partition (`OWNER-INSTRUCTIONS`, `PLAN`, `HANDOFF`);
  - program ledgers that record this preview (`PROGRESS.md` judgment call J25 and its log, the review queue and the
    lane-event log);
  - one line in an earlier red-team audit (17:37 on 2026-09-25) that checked the design is standalone.
- **The design was not edited after the survey work began.** `docs/ARCHITECTURE.md` last changed at 2026-09-25 23:20,
  and `DEFINITION.md` and the amendments at 20:44. All of that is before the preview run started (2026-09-26 00:06) and
  before the first survey landed (00:20).
- **No other workflow reads the partition.** Only the preview's own workflow (`workflows/07-corpus-preview.js`) refers to
  `partitioned/`.
- **The corpus was left untouched.** No file in `map-corpus` has changed since 2026-09-26 00:00.
- **The corpus's other rules were kept.**
  - Every plate named in this file (hf16, hf34, hf35, hf40, hf72) was checked by script against the 53-plate held-back
    roster, and none is on it.
  - No plate lettering is reproduced.
  - No historical geometry or place name is used as design material.

**What the check cannot show.** A text search catches copied names and figures, not a paraphrased idea. A parallel
fix-all round is editing the design right now, so the partition also depends on those seats never opening
`partitioned/`. `partitioned/README.md` forbids it. I found no trace that any of them did, but I cannot prove what
another agent read.

**What this seat read.**
- The three surveys, in full.
- `docs/CONFIDENCE.md` §1–§2 and its heading list.
- Two targeted excerpts of our own design: the colour-role table and decision D-1. I needed them to judge the palette
  point in §2.2.
- MFCG's measured paper colour in `research/findings/visual-spec.md`.
- The look survey's copied colour tool and its data files in the scratchpad. I read them to check what "paper" and the
  texture figures mean, which led to the correction in §2.4.

I opened nothing inside the corpus except the file-date check above. I did not open `GENERATION-SPEC.md` or
`MORPHOLOGY-PLAN.md`.

**CONFIRMED vs PLAUSIBLE.**
- CONFIRMED by execution in this seat: the partition checks above; the held-back-roster check on every plate named here;
  and the texture figures quoted from `look-data/comp_measure.json` (FTG's wash median 3.36; Fantasy Manor's texture
  3.29 and wash median 4.5).
- The other facts are CONFIRMED only as far as each survey says it executed them.
- Every confidence figure, every "before and after" judgment, the 60 % and about-even figures for exceeding, the
  five-point speed guess and the reading of the metropolis fineness disagreement are PLAUSIBLE.

## Fable review (2026-09-27) — A-corpus-preview/synthesis

**Verdict: CORRECTED** — the conclusions stand; the labelling of the "before" figures did not. Reviewer: Fable 5.1, lane
fable-review/main/manager-corpus; full record docs/fable-review/main/manager-corpus.md; ledger rows docs/PROGRESS.md J81
and J83; docs/CONFIDENCE.md §10 carries the pointer.

- **No matching figure moves — CONFIRMED** against docs/CONFIDENCE.md §1 (unchanged; 0 corpus traces in the file). The
  corpus holds no measurement of any competitor and no metric scale; nothing in it bears on parity with a reference as
  recorded, which is what §1 grades.
- **The first "exceed" figure (about 60 %) — PLAUSIBLE**; 2/3 × 0.9 = 0.60. The 0.9 conditional is defensible because the
  five points are structural: once parity is reached they exist by construction — which is also why IMP-4/5/7 warned
  that such metrics are "true by construction" and the owner's eye (D-5) decides "clearly better". The −5-point
  conditional on a painted default look is an unmeasured guess and is labelled so.
- **The texture correction (§2.4) — re-derived to the decimal** from look-data/comp_measure.json: FTG wash inside the
  band on 6/6 frames, median 3.355; FM grain 3.29 against the band top 2.96 and wash median 4.51 against 4.39. look.md now
  carries the correction in its own review section.
- **The look-versus-plan disagreement at metropolis** — resolved toward the plan lane by an export-based re-derivation
  (buildings per scanline at MFCG size 130: 98–125 under two pooling rules, against the corpus's 84); the look lane's
  windowed raster count (67) undercounts. The file's "may undercount (PLAUSIBLE)" was the right reading.
- **§4 re-run on 2026-09-27:** 0 hits in docs/ARCHITECTURE.md, DEFINITION.md, AMENDMENTS-2026-09-25b.md, CONFIDENCE.md,
  ARCHITECTURE-RATIONALE.md, ARCHITECTURE-VALIDATION.md; 4 hits in docs/AMENDMENTS-2026-09-27c.md, all in item 69 — the
  owner-opened palette exception (J64; partitioned/README.md). The partition held; the one opening is the owner's.
- **CORRECTION — the two yardsticks.** "About 85 % (ruled range 0.77–0.83)" and "about 70 % (ruled range 0.78–0.83)" are
  different quantities and the table does not say so; for a plain reader that is a contradiction left standing. The
  ruled ranges are docs/CONFIDENCE.md §1's probabilities of parity with each reference as recorded, from the evidence
  classes; the plain figures (85 / 70 / 65–70 % / two in three) are the stand-in manager's product-level estimates for
  the fused base as designed, carried into workflows/07's brief from chat and never entered in the ledger (now J81) —
  PLAUSIBLE estimates, not rulings. Quote either only with its label; the figure of record for "how confident are we" is
  CONFIDENCE.md §1 with D-5's acceptance test (the owner's eye plus the parity numbers).
- **The FMG G2 note:** corpus content, PLAUSIBLE; not an input now (partition); re-examined at reconciliation.
