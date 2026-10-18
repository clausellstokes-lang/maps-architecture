# PART II — STAGE 2: the city composed of neighbourhoods (interface depth; built after the base)

*In plain words.* Any district of the base town can be opened as a detailed neighbourhood — like watabou's Neighbourhood
generator — with blocks, plots, courtyards, hatched roofs, wells and local street names. The base already draws every shared
street, wall and shore exactly once, so two neighbourhoods never disagree about their common edge; each district has its
own random stream, so re-rolling one neighbourhood never touches another; and the neighbourhood's look is just a closer
level of detail of the same picture. Neighbourhood's four templates become layout choices per district: `area` is the
base's own bent-cut fabric, and `street`, `square` and `ring` are template fabrics laid by the same engine that laid their
neighbours (II.2).
