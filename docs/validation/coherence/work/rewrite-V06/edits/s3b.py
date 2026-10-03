from lib import *
t = extract(1227, 1426)
R = [
("counted `uses.heldByProtection` in the report (C6-30).", "counted `uses.heldByProtection` in the report."),
("""So an undefended suburb, a damp low quarter and the plot beside the tannery empty first, the market core last, and a core
house can still empty — the draw's `u` is the chance share (J-V6.9). **Which dwellings empty is decided by this matching;
the decline lottery strikes fabric only** (item 479 to §4.11 step (c), whose text had the lottery also decide whose
households leave).""",
 """So an undefended suburb, a damp low quarter and the plot beside the tannery empty first, the market core last, and a core
house can still empty — the draw's `u` is the chance share (J-V6.9). **Which dwellings empty is decided by this matching;
the strike pool strikes fabric only** (§4.11 step (c), item 479). Quarters whose prosperity fell — a newly shaded one
(V06 §3.4), one around a failing spring (V06 §3.12.1) — carry a higher `E(x)` by the base's low-prosperity driver, so they
empty first without a term of their own."""),
("""**3.5.2 The strike candidates (step (c), second half).** The base's lottery runs **once per district over one pool**
holding three layers' candidates, so the persistence rates set the layers' shares (§4.11's table). Each candidate's
weight is `w = E(x) · rate(layer) · u`, `u` its first draw on `stream(EVO_DECLINE, entity)` for the epoch; strikes are
taken **in descending `w`, ties by address, with no second draw** (the `u` inside `w` is the lottery's only chance),
until the district's `fabric` churn cap or the 2-plots-per-block bound stops it (C6-30):""",
 """**3.5.2 The strike candidates (step (c), second half).** The **strike pool** is the base's per-district decline draw
(§4.11 *The strike pool*), run **once per district over one pool** holding the layers' candidates, so the persistence rates
set the layers' shares (§4.11's table). Each candidate's weight is `w = E(x) · rate(layer) · u`, `u` its first draw on
`stream(EVO_DECLINE, entity)` for the epoch; strikes are taken **in descending `w`, ties by address, with no second draw**
(the `u` inside `w` is the pool's only chance), until the district's `fabric` churn cap or the 2-plots-per-block bound
stops it:"""),
("becomes the yard's garden instead of standing overgrown for ever (item 8 (a); C6-31); and", "becomes the yard's garden instead of standing overgrown for ever (item 8 (a)); and"),
("**The product's rows** (ST-26; `ProductEpochRows`, V06 §2.1).", "**The product's rows** (`ProductEpochRows`, V06 §2.1)."),
("(`retireWay` → `abandoned`, item 268; V07's `DeclineOp` members, ST-27) in place of `downgradeWay`.", "(`retireWay` → `abandoned`, item 268; V07's `DeclineOp` members) in place of `downgradeWay`."),
("**With `op: 'retireWay'` the test is stricter** (TR-03; J-V6.107), because a retired way leaves every router while a\ndowngraded one stays in the network:",
 "**With `op: 'retireWay'` the test is stricter** (J-V6.107), because a hollow way leaves every router while a\ndowngraded one stays in the network:"),
("a dossier-backed use's relocation (V06 §3.8.2; TT-01, TU-05). The candidates' keys, caps and", "a dossier-backed use's relocation (V06 §3.8.2). The candidates' keys, caps and"),
("— a deck whose crossing is dead and which carries no occupied plot (§3.19.5). Their rates are item 291's persistence rows.",
 "— a deck whose crossing is dead and which carries no occupied plot (§3.19.5). Their rates are item 291's persistence rows (§4.11's table)."),
("**landfall** (`rate` 0.08, the street's; ST-13; J-V6.99)", "**landfall** (`rate` 0.08, the street's; J-V6.99)"),
("**Every member leaves by the op that ends its cover** (TR-05; J-V6.108)", "**Every member leaves by the op that ends its cover** (J-V6.108)"),
("on item 244's support keys, which a re-derivation of the raised way keeps; TT-03):", "on item 244's support keys, which a re-derivation of the raised way keeps):"),
("**Accesses under the rubble** (TR-06; V04 §3.10 *Access closures*).", "**Accesses under the rubble** (V04 §3.10 *Access closures*)."),
("(V07's `epoch.rows.hinterland.slack`, 20 %; TT-06) in place of `dial.hysteresis`,", "(V07's `epoch.rows.hinterland.slack`) in place of `dial.hysteresis`,"),
("`hinterland.cap` (one great field's worth at most per epoch), the ops still `retypeLand`; ST-26):", "`hinterland.cap` (one great field's worth at most per epoch), the ops still `retypeLand`):"),
# §3.6
("is on), then **accessible** void clusters (at any rung of the base product, whether or not the town has sewers;\n   ST-19; the base's gate lifted for them by item 574, TR-09) only",
 "is on), then **accessible** void clusters (at any rung of the base product, whether or not the town has sewers;\n   the base's gate lifted for them by item 574) only"),
("backlog reaches the quantum, **whatever the cadence** (C6-10).", "backlog reaches the quantum, **whatever the cadence**."),
]
t = apply(t, R)
t = t.replace('on a plot a retired way serves', 'on a plot a hollow way serves')
t = strip_narr_ids(t)
save('07-s3b.md', t)
print(words(t))
