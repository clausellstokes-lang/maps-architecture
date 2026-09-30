# The design volumes — a plain-language summary for the owner

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/_finalize; covered by the whole-design retrovalidation (J84).

**In one paragraph.** You asked for every part of the system to be designed out in full now, so that later work is
building, not deciding. That is done. The base design (`docs/ARCHITECTURE.md`) already described the town and city
generator in full; twelve design volumes now describe, to the same depth, every later stage of your roadmap — from
neighbourhoods and buildings to floor plans, the underground, floating islands, towns changing over time, villages, the
SettlementForge connection, the app, the built-in assistant, the content tables and the calibration. The volumes were
checked against each other in seven rounds; the last round's fourteen serious problems were fixed in this final pass.
What remains are small wording and bookkeeping items, listed below, which do not change how anything would be built.
There are twenty-five decisions that are yours by rule; each already has a recommendation, and the work proceeds on the
recommendation until you say otherwise.

## What each volume makes possible, and what it will feel like

1. **Neighbourhoods (volume 1).** Zoom into a district and it has a character of its own: a main street, a square, rings
   of houses round a church, a quayside, terraced streets climbing a hill. Each place has its own name and small details
   (wells, crosses, market stalls). Click a district and open a close-up of it; change its layout and only that district
   changes.
2. **Buildings (volume 2).** Every building gets a real shape: wings, courtyards, towers, roofs, stepped temples, terraced
   palaces, tiered towers, houses on jetties and bridges, a workshop with its shop on the street. A cathedral always has
   its crypt, raised above wet ground where it must be.
3. **Floor plans (volume 3).** Click any building and see its rooms, stairs and doors, storey by storey, down to the cellar
   and the crypt. Plans stay the same when you come back, and redraw only when you change the building.
4. **The underground (volume 4).** Turn on the underground and see sewers under the streets, caverns in the rock, the
   ruins of an older town below the current one, catacombs under cemeteries and crypts under churches, and — where a way
   down exists — the people who live below. Most ruins lie sealed until someone digs into them.
5. **Floating islands (volume 5).** A fantasy option: islands in the sky with their own houses, bridges and stairs, casting
   shadows shaped by their thickness onto the town below, under a fixed sun, a moving sun or your cursor.
6. **Towns over time (volume 6).** Press "advance" and the town lives through the years: streets fall out of use and come
   back, trades move, walls are built on cliffs and rivers, churches become cathedrals, catacombs grow, aqueducts rise. You
   can scrub a timeline, compare then and now, and branch a "what if" copy.
7. **Villages (volume 7).** Thorps, hamlets and villages made the way real villages grew: a green, tofts, open fields, a
   palisade that uses the river as a wall, a church that replaces a wayside shrine. A village that grows past about 1 500
   people becomes a town, and a town that shrinks becomes a village again.
8. **SettlementForge (volume 8).** Inside SettlementForge, each settlement gets a Map tab. The dossier stays the one
   truth: whatever it says exists is on the map, and the map fills every gap by its own rules. The players can see
   pictures of what their characters know.
9. **The app (volume 9).** The editor you and your users work in: every tool on the canvas, clear messages that always
   offer a next step, the timeline, the layers, paste-in lists of places ("The Golden Anvil — smithy — by the ford"), and
   exports.
10. **The assistant (volume 10).** Ask in plain words ("put a tannery downstream", "why is the market here?") and the
    assistant proposes a change you can preview, accept or drop, and explains its reasons from the map's own records.
11. **The content (volume 11).** The tables behind everything: about 180 kinds of building with where each likes to be
    (near its customers, away from smells, by water), supply chains from raw goods to the market, wall defences, custom
    content from SettlementForge, and names.
12. **Calibration (volume 12).** How every number is checked: against captures of the reference generators, by statistics
    across hundreds of towns, and by your own side-by-side sittings. No number stays a guess without a record of how it
    will be confirmed.

## The order they would be built in

First the base, as already planned: calibration and spikes, a viewable town, editing, parity, then neighbourhoods (stage 2,
volume 1). Then, as recommended (each step is yours to order):

1. **As soon as the base's parity milestone lands (M4, "the city mastered"), alongside the neighbourhoods:** the village product and the evolution engine. Floor plans can start on the base's simple buildings here too. (The built-in assistant comes earlier still, alongside the app's screens.)
2. **After the neighbourhoods:** the full buildings, and the underground (in parallel if a second pair of builders is
   free).
3. **Then:** the rest of the floor plans (on the full buildings) and the floating islands (after the underground).
4. **Then:** the big calibration against the reference corpus.
5. **Last:** the SettlementForge connection (its first steps can begin earlier).

## How big the whole program is

Estimated in expert **person-weeks** (one skilled builder for one week), each volume's own estimate:

- **The base with neighbourhoods:** about **222–301 person-weeks** (the base's 185.5–248.5, plus 36–52 the volumes add to
  it — mainly the neighbourhoods at full depth, the app's screens and the calibration rig).
- **Every later stage together:** about **171–239 person-weeks** (the largest: the underground 28–39, the village 27–37,
  the evolution engine 25–36, the buildings 21–30).
- **The whole program:** about **392–539 person-weeks**. With several builder pairs working in parallel, the calendar
  time is much shorter than that; the order above lets up to four lanes run at once after the parity milestone.

These are estimates until the milestones run; the final figures are computed once when the design's pending changes are
applied to the base.

## How the checking went

After the volumes were written, they were checked against each other in **seven rounds** (six rounds of fixes in between),
by six checkers each reading one "seam" where volumes meet — for example neighbourhoods, buildings and floor plans
together, or the village, SettlementForge and the content tables together. The serious problems found fell round by
round: **129 → 44 → 28 → 24 → 15 → 19 → 14**, and the blocking ones (7 in the first round, 1 in the second) were gone from the third round on.
What the later rounds found were edges exposed by the previous fixes, for example:

- a church crypt on flooded ground that could end up overlapping the ground floor of a building beside it;
- a village growing over time before the evolution engine exists — what happens in the meantime is now written down;
- a market that closes in the dossier: the map now closes it too, instead of keeping its stalls;
- when a wayside shrine is promoted to a parish church, which record points at the new church;
- the paste-in reader mistaking a town smithy for a village smithy;
- the assistant's card losing the "try another spot" buttons when a proposal held several changes;
- a few calibration records that named the wrong checking step.

**This final pass fixed all fourteen serious problems from the last round**, plus eleven of its small ones in full and four in part, where they sat in the same passages.

## What was left for later, and why it does not matter now

Fourteen small items from the last round, and parts of four more, are listed in `docs/volumes/INDEX.md` §7. They are
wording (a plain-words paragraph that does not mention one case), out-of-date status lines ("pending" where the other
side has since landed), a missing cost row for an edit whose cost another row already covers, a test clause that
restates what the design already fixes, and similar. None of them changes how anything would be built, and none leaves a
part unconnected in a way that would stop a builder. As you said, "if we need to fix anything [we] just do it down the
line": they go to the next amendment round.

## Decisions that are yours

Twenty-five questions, each with a recommendation the work follows until you rule. The ones that shape the program most:

- **The order of the later stages** (eight questions). Recommended: village and evolution engine alongside the
  neighbourhoods; floor plans early on the simple buildings; underground right after the neighbourhoods, then the
  floating islands; the built-in assistant alongside the app; the SettlementForge connection after the big calibration;
  the default map shows neighbourhoods once they exist.
- **Money and hosting.** Approve the underground's cost; host the map module on a SettlementForge subdomain; a private
  preview of the editor for testers first; users bring their own AI key (no relay for now); about US$1 200 of your AI
  budget for testing the assistant; do not buy FTG's premium month; testers invited unpaid (a small thank-you only if
  too few agree).
- **Your time.** Sit seven short review sessions at the main milestones (up to about 45 minutes each) and four very short
  ones; if you cannot, the build continues and those checks stay marked as not yet rated.
- **What crosses into SettlementForge.** Buildings' shapes stay the map's own for now; SettlementForge's own assistant
  drives the map inside SettlementForge; players get pictures, not a live map, for now; the export bundle may carry the
  map's scene files once you allow it; sensitive dossier kinds are shown as the dossier states them but hidden by default.
- **Identity and defaults.** Keep "PLAT" as the working name until a public release; historical looks become a default
  only where your before-and-after sitting approves them.

Every recommendation with its reason is in `docs/volumes/INDEX.md` §6, and each question's full text is in its volume's
section 11.
