import sys; sys.path.insert(0,'scripts')
from ed import Ed
e=Ed('parts/10-s3-10-14.md')
e.R("""| "{quarter} is declared a {kind} quarter but holds no {class} yet." |""","""| "{quarter} is declared {a kind} quarter but holds no {class} yet." |""")
e.R("""me why**, a `why` of the row's page (the list ends every `refuse.*` row with it; V9 XV-V9-30 (g)); beside them **Ask again** (the card's""",
    """me why**, a `why` of the row's page (the list ends every `refuse.*` row with it); beside them **Ask again** (the card's""")
e.R("""1. **Reads are filtered at the source, as at the city band.** Every `query` runs under the session's effective key (V10 §2.3; passed as
   `admitAs` in V10 §2.3's form, item 572; §11.2's *Knowledge*) with the admission of the city band, whatever the view's zoom:""",
"""1. **Reads are filtered at the source, as at the city band.** Every `query` runs under the session's effective key (V10 §2.3; passed as
   `admitAs` in V10 §2.3's form, item 572; §11.2's *Knowledge*) through §9.2's one admission function at the city band,
   whatever the view's zoom:""")
e.R("""   with `admitAs` the effective key in V10 §2.3's form (item 470, item 572): fates, renames, conflict actions, closest options, bend lines (`MsgRef`s whose address arguments render
   under the key, item 463), created addresses and the effects list""","""   with `admitAs` the effective key in V10 §2.3's form (items 470, 572), admitted by the same §9.2 function: fates, renames,
   conflict actions, closest options, bend lines (`MsgRef`s whose address arguments render under the key, item 463),
   created addresses and the effects list""")
e.R("""   * **SettlementForge.** A sentence that names SettlementForge or the dossier must link at least one `[dossier]` entity
     or state a `settlement` field of the brief (name, tier word, population); otherwise *unsupported*.""",
"""   * **SettlementForge.** A sentence that names SettlementForge or the dossier must link at least one `[dossier]` entity
     or state a `settlement` field of the brief (name, tier word, population); otherwise *unsupported*.
   * **The past** (item 113; V10 §3.9b). A population or a year of the town's past must equal a value the brief's history
     line or a `past` row of this segment gave — a `derived` population said with "about", within its two-significant-
     figure rounding; otherwise *unverified* (`why: 'number'`). A population stated for a `symbolic` basis is
     *unsupported* (`why: 'claim'`): no row carries one.""")
e.R("""     event after `<seq>` among the entries this segment read (V09 §4.10's condition for **Re-run from here**): `{ kind:
     'fork' | 'rerun', seq, label }`, labelled `clerk.alt.history.fork`, "Open a copy from here", and
     `clerk.alt.history.rerun`, "Re-run from here" — V09 §3.9's words;
   * `[[do:undo]]` — the session's last accepted clerk proposal, while its group is not undone: `{ kind: 'undo', group:
     accepted.group, label }`, labelled `clerk.alt.history.undo`, "Undo";""","""     event after `<seq>` among the entries this segment read (V09 §4.10's condition for **Re-run from here**), and an
     event inside the recorded past (a replay epoch) takes neither (prompt rule 17): `{ kind: 'fork' | 'rerun', seq,
     label }`, labelled by V09 §4.9's shared row `button.openCopy`, "Open a copy from here", and by
     `clerk.alt.history.rerun`, "Re-run from here" — V09 §3.9's words;
   * `[[do:undo]]` — the session's last accepted clerk proposal, while its group is not undone: `{ kind: 'undo', group:
     accepted.group, label }`, labelled by V09 §4.9's shared row `button.undo`, "Undo";""")
e.R("""brewhouse" is `shape { merge }`; "stop the bakery buying from the far mill" is `shape { link: { op: 'avoid' } }`, or
  `cut` where `avoid` is not in the table; "undo that" is""","""brewhouse" is `shape { merge }`; "stop the bakery buying from the far mill" is `shape { link: { op: 'avoid' } }` (the
  next nearest mill serving; `cut` stops the good at the bakery altogether, V11 §4.2); "undo that" is""")
e.save()
