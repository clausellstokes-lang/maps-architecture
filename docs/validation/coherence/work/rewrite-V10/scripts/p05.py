import sys; sys.path.insert(0,'scripts')
from ed import Ed
e=Ed('parts/05-s2-12.md')
e.R("""  advance?: { years: number; shape?: 'grow'|'reach'|'decline'|'hold'|'timeline'; to?: number; hazards?: 'none'|'minor'|'full' };   // V06 §4.1
  events?: RawEvent[] }""","""  advance?: { years: number; shape?: 'grow'|'reach'|'decline'|'hold'|'timeline'; to?: number; hazards?: 'none'|'minor'|'full' };   // V06 §4.1
  oasis?: 'auto'|'on'|'off' /* item 111 (a): the blueprint's oasis toggle (§4.2 S0), offered on an arid climate row only (V09 §4.21 (2)); an oasis by hand is ground's lake with spring */;
  history?: { once: string /* a rung word above the present rung */; peakPopulation?: number; foundedYearsAgo: number; peakYearsAgo?: number;
    rebuiltYearsAgo?: number /* destroyed and built again then */ } | null /* item 113: the blueprint's history option, encoded as V09 §4.22 (2)'s HistoryHint; null takes the past away */;
  events?: RawEvent[] }""")
e.R("""  at?: Anchor; depthM?: number /* lake: its depth at its point, default 3 */; source?: Anchor; mouth?: Anchor; shore?: Anchor; sizeM2?: number;""",
    """  at?: Anchor; depthM?: number /* lake: its depth at its point, default 3 */;
  spring?: boolean /* lake: a spring-fed pond or lake with its grove and gardens — an oasis (item 111 (a); §7.1's PointsForm.spring); only when the user asks for an oasis or a spring */;
  source?: Anchor; mouth?: Anchor; shore?: Anchor; sizeM2?: number;""")
e.R("""  link?: { good: string; op: 'pin'|'avoid'|'cut'|'release'; provider?: Ref } /* item 105 (j): target is the consumer use; 'avoid' only where V11's siting.linkEdits carries the cell (V09 XV-V9-2) */;""",
    """  link?: { good: string; op: 'pin'|'avoid'|'cut'|'release'; provider?: Ref } /* item 105 (j): target is the consumer use; pin, avoid and cut write V11 §4.2's siting.linkEdits cells bindTo, avoid and cut; release removes the row */;""")
e.R("""    weights?: Partial<Record<'nuisance'|'need'|'clientele'|'supply'|'alignment'|'competition'|'coverage'|'sun' /* V11 §2.4's eight families */, 0 | 0.5 | 1 | 2 | 3>>
      /* SS-27: V09 §2.6's family multipliers — Ignore, Less, Normal, More, Much more; a hard need is never scaled; absent is 1 */ }
    /* item 104 (a) (1): target is a custom or catalogue element; the author's map-side declaration for its kind */;""",
    """    weights?: Partial<Record<'nuisance'|'need'|'clientele'|'supply'|'alignment'|'competition'|'coverage'|'sun' /* V11 §2.4's eight families */, 0 | 0.5 | 1 | 2 | 3>>
      /* V09 §2.6's family multipliers, written into V11 §4.2's familyWeights cell */ }
    /* item 104 (a) (1): target is a custom or catalogue element; the author's map-side declaration for its kind, in V11 §4.2's declared cells */;""")
e.save()
