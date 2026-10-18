---
name: patreon-public-api-access
description: How Patreon posts/collections/comments were read without a login, and which browser routes are blocked
metadata:
  type: reference
---

The built-in Browser pane refuses patreon.com ("not allowed due to safety restrictions") and Claude in Chrome was not connected (2026-09-21). Public content is fully readable through Patreon's JSON:API with a browser User-Agent and no auth:
- `https://www.patreon.com/api/collection/<id>` → `post_ids`
- `https://www.patreon.com/api/posts/<id>` → body lives in `attributes.content_json_string` (ProseMirror JSON; `content` is often empty); patron-only posts have `current_user_can_view=false`
- `https://www.patreon.com/api/posts/<id>/comments?include=commenter,replies,replies.commenter`
- `https://www.patreon.com/api/posts?filter[campaign_id]=<id>&sort=-published_at` (meta.pagination.total; follow links.next)
Campaign ids: watabou 2599946, FTG 8079427. Media with `state: expired` 404s — stale re-uploads, not missing content. Implemented in `tools/patreon_scrape.py`. See [[maps-project-state]].
