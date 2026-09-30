---
name: web-research-hazards
description: Limits and reliable routes for web research lanes — the shared 200-query WebSearch cap, blocked sites, and the Steam/GitHub APIs that work without auth (measured by lane ux/tool-survey, 2026-09-27)
metadata:
  type: reference
---

Measured 2026-09-27 by lane ux/tool-survey (six Opus sub-surveyors plus the lane seat, one session):
- **WebSearch has a session-wide cap of 200 queries, shared by every subagent of the session.** It ran out at about 19:13 EDT
  after ~191 logged queries; later searches were refused. Plan fan-outs with a per-seat search budget, and do verification
  by direct fetch (curl) rather than search.
- **Reddit is unreachable**: curl on old.reddit.com returns a "Blocked" page, WebFetch says "unable to fetch", and the search
  tool refuses reddit.com as a domain. Treat Reddit as snippet-only.
- **Also refused every fetch that day**: helpx.adobe.com, canva.com, docs.midjourney.com, help.roll20.net / wiki.roll20.net
  (Cloudflare), worldanvil.com, fandom wikis (bot check), rpg.net, alternativeto.net.
- **Reliable primary routes with no auth**: Steam `api/storesearch`, `api/appdetails`, `appreviews/<id>?json=1` (add
  `day_range=9223372036854775807` with `filter=all` for all-time most-helpful reviews; `purchase_type=steam&language=english`
  matched the counts quoted from the store pages), `ISteamNews/GetNewsForApp/v2` (full patch notes), Workshop browse +
  `ISteamRemoteStorage/GetPublishedFileDetails` (mod subscriber counts); GitHub API and raw.githubusercontent.com; itch.io
  pages, devlogs and community boards (paginate with `community?before=<n>`); web.archive.org snapshots of script-rendered docs.

**Why:** the cap silently ended one seat's Reddit and YouTube angles; the Steam APIs gave dated, countable user evidence.
**How to apply:** give each research seat a search budget in its brief, route community evidence through Steam/itch/GitHub
first, and never count a blocked source as "not found". See [[patreon-public-api-access]], [[record-state-at-spawn-time]].
