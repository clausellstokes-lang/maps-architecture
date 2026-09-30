# Volume 1 — Stage 2: the city composed of neighbourhoods (NG-class close-ups on the base)

> PENDING FABLE REVIEW — written by opus stand-ins for the Fable seat (volumes/V1-neighbourhoods, its revision, reconciliation and coherence lanes); covered by the whole-design retrovalidation (J84).

**Citations.** `§n` and `II.n` are sections of the base design, `docs/ARCHITECTURE.md`, with files f and g applied
(`docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md`); `Vnn §n` is a section of a design volume, this one
included; `item n` is an amendment item (its home is §0.2's landing row); `J-VI.n` is a volumes-integration decision
(`docs/volumes/_integrate.md`), cited and never restated; research files are named by file and section only.

## 0 In plain words

Stage 2 makes every part of a town open up into a detailed neighbourhood, the way watabou's Neighbourhood generator
draws one — rows of houses with hatched roofs, courts behind them, wells, fountains and big trees, small squares, street
names — except that ours is a close-up of a real part of a real town, so its streets are the town's streets and its
edges fit its neighbours exactly.

**How it feels to use.** You click a district; the view glides in and the district becomes a neighbourhood: hand-inked
roof hatching, every lane named, each court with its well or tree, the little squares with a cross, a statue or a trough,
and the district's name in the emptiest corner like a title. Nothing about the town changes — the houses are the same
houses, drawn closer — so closing and reopening a district never alters the town. A small panel shows the
neighbourhood's name, what it has become (a craftsmen's, merchants' or religious quarter …) and a row of layout cards:
**Organic** (the town's own lanes), **Main street**, **Square**, **Rings**, and the ones the place suggests
(**Quayside** by the water, **Wall-side** under the wall, **Crossroads** at a busy junction, **Around the church** where
a church stands, **Bridgehead** at a bridge, **Green** round a park). Picking a card shows a faint preview with what
would change; accepting it re-lays that one district and leaves the neighbours exactly as they were. **New look** gives
the same layout with a new seed; locks keep what you like. Everything is undoable, and every change made inside the
close-up is saved with the town. Nothing you ask for is refused unless the dossier or a lock forbids it: a layout that
does not fit, a value past its range, or a square where the neighbours are already full is bent to the nearest thing
that works, and one line says what happened ("14 households move to the Weavers' quarter").

**The town itself is made of neighbourhoods.** At generation each district chooses its layout from what it will hold
and where it lies — a trading quarter on a through-road may get a main street, a quarter round a great church rings, a
harbour quarter a quay street; most keep the organic lanes. Its blocks then get their character: most are ordinary rows
of houses round courts; some small ones become squares — before a church, at a crossroads, at a bridgehead — some
greens, and in rich quarters a few whole blocks go to one great house with its yard. How many squares and greens a
district gets follows how many people live there and how well off they are. Before any street is drawn the town sets
aside the land each chosen layout needs — the square, the ring roads, the main street — so nobody loses a home to a
square: households that no longer fit move to a district with room, as the allocation already moves them.

**A standalone neighbourhood document.** From the start screen you can make a neighbourhood on its own, as Neighbourhood does:
pick a shape (or draw one), a size (small, medium or large — about 85, 700 or 1 050 houses, Neighbourhood's own sizes),
what kind of place it is, and whether it is leafy or has no church; one click gives a finished neighbourhood with no town
around it. Its outline follows its layout: a main-street neighbourhood is a long strip round its street, a square
neighbourhood sits round its square. It has no floating islands, sewers or undercity, no old quarry, no generated vaults
and no buried older town; a cave or ruin may lie under it, with a few squatters once someone has dug a way down, and at
most one catacomb. Floating islands use the same machinery: each island volume 5 builds is laid out as one to three
neighbourhoods on its own land, every landing reached by a street, with no roads in or out. A **Neighbourhood** preset
reproduces watabou's own rules exactly, so the side-by-side comparison compares like with like.

**The owner's rules (file g items 102–109), street by street.** Sunlight matters a little: a quarter in shadow — under a
cliff, behind the wall, under a floating island all morning — is a little less often laid out as a grand square or
rings, and its great houses take the sunnier blocks, so cheaper lodging and workshops gather in the shade. Everyday
services spread out: the neighbourhood you open is the unit the siting rules count, so "one apothecary per neighbourhood"
means one per district you can click, and a great house or a green is never put beside a tannery or a midden. Trades that
supply each other sit close at street scale; a trade whose steps cannot stand each other stretches along its road, the
smelly steps at the edge; a street full of one trade takes that trade's name — but no neighbourhood is ever assigned to a
trade: a quarter is named for it only when enough of it gathers there, or when the SettlementForge dossier or you say
so. When the dossier says "the smiths' quarter" or "the weavers' guild", the close-up shows that record's buildings, here
and elsewhere in town, each counted once. Where the wall ends on a cliff, a gorge, a marsh or the sea, the neighbourhood
treats that edge as a cliff or a shore, not as a wall. Cave mouths, sinkholes, collapsed shafts and the doors of ancient
ruins become small named places with a symbol; a cellar that broke into a cave shows its stair in the house's floor plan
— and a stair dug in a yard as a mark on the plot — only to those who know of it; a cave nobody has reached shows nothing
on the street. Catacomb doors appear only in cemeteries — a churchyard, a burial ground, a monastery's graves, a cemetery
outside the walls (opened by drawing round it) or, in a city, the surface head of an old quarry turned ossuary. Churches,
and always the cathedral, keep crypts in their basements, with no entrance of their own on the street: you go down from
inside the church. A great temple built solid in tiers is entered at its foot by its own door — straight into the crypt,
or into a cellar beside it and on into the crypt — drawn with the building; where a storeyed annex stands beside such a
temple, the way down is through the annex, into the cellar under it and through one door into the crypt (V03 §3.7.4).
Rebuilding a district never moves the cemetery a catacomb grows under.

**Terraces, arches and houses on the water (item 110).** On a hill a quarter can be laid in terraces: streets along the
slope a double row of houses apart, stairs climbing between them, and a retaining wall wherever the quarter's edge
stands well above the land below; a quarter over a dry ravine is terraced on both sides with a stepped path down the
middle. A city may carry a road over a valley on arches, join two high quarters by a raised road, or bring water in on an
aqueduct; in a close-up you see the arches, the streets passing under them and no house beneath, and from the
neighbourhood's panel you can remove one the generator raised (it stays removed) or draw your own. Houses and shops on a
bridge, a mole or a jetty, and the towers and forts on a harbour mole, appear in the close-up of the quarter the bridge
or mole starts from. A stepped temple is drawn tier on tier, each tier casting its own shadow on the one below. In a
standalone neighbourhood document the Terraces card lays its streets on a hillside, so it always gives terraces.

**The look.** The hatched family (Neighbourhood's look, in our own colours) can draw the whole town: at city zoom simple
masses on warm paper; closer in, two-tone roofs; at neighbourhood zoom the full hatching, shadows, trees and cobbles; at
building zoom each roof face hatched and, once stage 3 exists, the plans. Once stage 3 draws the real roofs — valleys,
hips, towers — the hatching follows each roof face and stops at its edges.

