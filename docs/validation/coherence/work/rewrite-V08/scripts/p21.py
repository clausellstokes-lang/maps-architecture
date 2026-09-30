import sys; sys.path.insert(0,'scripts')
from ed import Ed
e=Ed('parts/15-s5.md')
e.R("""`host.status.failed` "The map could not start." with the button **Retry** |""","""`host.status.failed` "The map could not start." with the button `host.status.retry` "Retry" |""")
e.R("""shows a persistent strip "Showing what the players see" in its banner slot (`HostSlots.banner`), with the button "Show
everything" that switches it off,""","""shows a persistent strip `host.playersView` "Showing what the players see" in its banner slot (`HostSlots.banner`),
its row carrying `buttons: [button.showEverything app(viewAsOff)]` (V09 §2.9's `MsgButton`; the button's words "Show
everything"; in host mode the clear is the players'-view toggle's off, V08 §3.14 (5)),""")
e.save()
e=Ed('parts/12-s3-6-14.md')
e.R("""it is discarded with the notice "unsaved changes from an earlier
  version of this map were dropped".""","""it is discarded with the notice `host.mirror.dropped` "Unsaved changes from an
  earlier version of this map were dropped.\"""")
e.save()
e=Ed('parts/14-s4.md')
e.R("""
### 4.3 Locality, protection and the dossier's reach""","""
**The controls' words.** Each word the header draws is a `host.*` catalogue row, its `en` text written once here and
loaded by V09 §4.9 unchanged — a label `host.control.<action>`, an undo word `host.undo.<action>`, a dialog's line
`host.dialog.<action>`: `host.control.refresh` "Refresh now"; `host.control.upgrade` "Update the map engine" with
`host.dialog.upgrade` "Update the map engine? {summary}" (the §7.5 diff in words); `host.control.restore` "Restore
previous map" with `host.dialog.restore` "Restore the previous saved map? The changes made since it will be lost:
{edits}." and `host.undo.restore` "Restore again"; `host.control.newMap` "Make a new map from the record" with
`host.dialog.newMap` "Make a new map from SettlementForge's record? The current map is kept, and you can go back to it."
and `host.undo.newMap` "Go back to the old map"; `host.control.reveal` "Reveal to the party" with `host.undo.reveal`
"Hide again"; `host.control.hide` "Hide from the party" with `host.undo.hide` "Reveal again"; `host.control.partyTier`
"The party's base knowledge" with `host.undo.partyTier` "Undo"; `host.control.playersView` "See what the players see";
`host.control.assistantSettings` "Assistant settings". T-V8-14's walker checks that every word V08 §3.7, §4.2 and §5.1
quote has its key.

### 4.3 Locality, protection and the dossier's reach""")
e.save()
e=Ed('parts/17-s7.md')
e.R("""every `host.status.*`, `host.party.*`, `host.group.*`, `host.recovered.*` and `host.verify.*` key named here has its row (V08 §5.1, §4.6, §3.9),""",
    """every `host.status.*`, `host.party.*`, `host.group.*`, `host.recovered.*`, `host.verify.*`, `host.control.*`, `host.dialog.*`, `host.undo.*`, `host.playersView` and `host.mirror.dropped` key named here has its row and every word V08 §3.7, §4.2 and §5.1 quote has its key (V08 §5.1, §4.2, §4.6, §3.9),""")
e.save()
