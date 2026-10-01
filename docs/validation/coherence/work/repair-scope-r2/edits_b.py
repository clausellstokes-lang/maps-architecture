# edits_b — §13.1 (VM-R0S-14) and §13.4 (G126-scope) (scope r2)
B = '/home/user/maps-architecture/docs/ARCHITECTURE.md'
S131 = '### 13.1 Kernel property tests (fast-check; B-FUZZ) and the ladder coverage test'
S134 = '### 13.4 Visual regression, B-ZOOM and the app harness'


def register(E):
    # VM-R0S-14: a bar for §2.2 rule 5's write inside an existing run
    E.add(B, S131,
          "     commits with no `E_INVARIANT`, and every index query whose box meets that vertex returns it;\n"
          "   * *indexes, slots and the pool:*",
          "     commits with no `E_INVARIANT`, and every index query whose box meets that vertex returns it;\n"
          "   * *stretch-state writes* (§2.2 rule 5's *Write*): random writes on open and closed chains that already carry a\n"
          "     profile — each `StretchRef` inside an existing run, across one or more existing knots, ending on an existing\n"
          "     knot's vertex, and over the whole chain — for `RetainingWall.state` and for an enceinte's three parallel profiles\n"
          "     (`condition`, `conditionMaterial`, `conditionEpoch`) written in one batch: after every write each profile's knot\n"
          "     rows lie on the chain in ordinal order from 0, no ordinal is held by two vertices at any step, no knot vertex\n"
          "     dissolves, the canonical form holds, §3.10's stored-reference row passes at stage end and at save, and the undo\n"
          "     restores every profile byte for byte; a negative control — the dropped knots stripped last — fails the bar;\n"
          "   * *indexes, slots and the pool:*", 1, 'VM-R0S-14')
    # G126-scope: §13.4's sessions on tablets and desktops only
    E.add(B, S134,
          "*touch editing* — two participants per session work on a tablet; every tool\n  takes touch,",
          "*touch editing* — two participants per session work on a tablet, and every session\n"
          "  runs on tablets and desktops only (item 126; §1.1); every tool takes touch,", 1, 'G126-scope §13.4')
