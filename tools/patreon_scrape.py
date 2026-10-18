#!/usr/bin/env python3
"""Archive Patreon collections / campaign posts (public API, no auth) to disk.

Output layout (under research/patreon/<group>/<post_id>/):
  post.json      raw API response
  comments.json  all comment pages, merged (with replies + commenters)
  post.md        rendered text: title, meta, body, links, image list, comment thread
  images/        every image referenced by the post body / header

Usage: python3 tools/patreon_scrape.py                 # every group in GROUPS
       python3 tools/patreon_scrape.py watabou-manor   # only the named group(s)
index.json is merged: groups not processed by this run (e.g. watabou-extra, archived ad hoc) are kept.
"""
import json, os, re, sys, time, html, urllib.request, urllib.parse, urllib.error

ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "research", "patreon")
UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36")
DELAY = 0.6

GROUPS = {
    "watabou-city": {"collection": "244236"},
    "watabou-village": {"collection": "244214"},
    "ftg": {"campaign": "8079427"},
    # hand-selected posts of watabou's campaign 2599946: ids file under research/patreon/, rationale in research/manor/
    "watabou-manor": {"ids_file": "watabou-manor-ids.json",
                      "title": "Fantasy Manor + its building-generator lineage (Procgen Mansion, House Plan/Dwellings, "
                               "settlement-to-building integrations) — selected by title/tag/body keyword search, "
                               "see research/manor/selection.json"},
}


def get(url, binary=False, tries=4):
    last = None
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*" if binary else "application/json"})
            with urllib.request.urlopen(req, timeout=60) as r:
                data = r.read()
            time.sleep(DELAY)
            return data if binary else json.loads(data)
        except urllib.error.HTTPError as e:
            last = e
            if e.code in (403, 404):
                break
            time.sleep(2 + 3 * i)
        except Exception as e:  # noqa
            last = e
            time.sleep(2 + 3 * i)
    print(f"  !! failed {url[:120]}: {last}", file=sys.stderr)
    return None


def render_nodes(nodes, images, links, depth=0):
    out = []
    for n in nodes or []:
        t = n.get("type")
        if t == "text":
            s = n.get("text", "")
            for m in n.get("marks", []) or []:
                mt = m.get("type")
                if mt == "bold":
                    s = f"**{s}**"
                elif mt == "italic":
                    s = f"*{s}*"
                elif mt == "code":
                    s = f"`{s}`"
                elif mt == "link":
                    href = (m.get("attrs") or {}).get("href")
                    links.append(href)
                    s = f"[{s}]({href})"
            out.append(s)
        elif t == "image":
            a = n.get("attrs") or {}
            images.append(a.get("src"))
            cap = a.get("caption") or a.get("alt") or ""
            out.append(f"\n![IMAGE #{len(images)} {cap}]\n")
        elif t == "paragraph":
            out.append(render_nodes(n.get("content"), images, links, depth) + "\n\n")
        elif t == "heading":
            lvl = (n.get("attrs") or {}).get("level", 2)
            out.append("#" * lvl + " " + render_nodes(n.get("content"), images, links, depth) + "\n\n")
        elif t in ("bulletList", "bullet_list", "orderedList", "ordered_list"):
            for i, li in enumerate(n.get("content") or []):
                bullet = f"{i+1}." if t.startswith("ordered") else "-"
                out.append("  " * depth + f"{bullet} " + render_nodes(li.get("content"), images, links, depth + 1).strip() + "\n")
            out.append("\n")
        elif t in ("hardBreak", "hard_break"):
            out.append("\n")
        elif t == "blockquote":
            out.append("> " + render_nodes(n.get("content"), images, links, depth).strip().replace("\n", "\n> ") + "\n\n")
        elif t in ("codeBlock", "code_block"):
            out.append("```\n" + render_nodes(n.get("content"), images, links, depth) + "\n```\n\n")
        else:
            a = n.get("attrs") or {}
            for k in ("src", "href", "url"):
                if a.get(k):
                    links.append(a[k])
                    out.append(f"[{t}: {a[k]}]")
            out.append(render_nodes(n.get("content"), images, links, depth))
    return "".join(out)


def html_to_text(s, images, links):
    for m in re.finditer(r'<img[^>]+src="([^"]+)"', s):
        images.append(html.unescape(m.group(1)))
    for m in re.finditer(r'<a[^>]+href="([^"]+)"', s):
        links.append(html.unescape(m.group(1)))
    s = re.sub(r'<img[^>]*>', lambda m: "\n![IMAGE]\n", s)
    s = re.sub(r'<a[^>]+href="([^"]+)"[^>]*>(.*?)</a>', r'[\2](\1)', s, flags=re.S)
    s = re.sub(r'</(p|div|h\d|li|ul|ol)>|<br\s*/?>', "\n", s)
    s = re.sub(r'<li[^>]*>', "- ", s)
    s = re.sub(r'<[^>]+>', "", s)
    return html.unescape(re.sub(r'\n{3,}', "\n\n", s)).strip()


def fetch_comments(pid):
    url = (f"https://www.patreon.com/api/posts/{pid}/comments?include=commenter,replies,replies.commenter"
           "&fields%5Buser%5D=full_name&page%5Bcount%5D=50&sort=-created")
    data, included = [], []
    while url:
        j = get(url)
        if not j:
            break
        data += j.get("data", [])
        included += j.get("included", [])
        url = (j.get("links") or {}).get("next")
    return {"data": data, "included": included}


def render_comments(c):
    users = {i["id"]: (i.get("attributes") or {}).get("full_name", "?") for i in c["included"] if i["type"] == "user"}
    allc = {x["id"]: x for x in c["data"] + [i for i in c["included"] if i["type"] == "comment"]}
    kids = {}
    for x in allc.values():
        p = ((x["relationships"].get("parent") or {}).get("data") or {}).get("id")
        kids.setdefault(p, []).append(x)
    lines = []

    def walk(pid, depth):
        for x in sorted(kids.get(pid, []), key=lambda y: y["attributes"].get("created") or ""):
            a = x["attributes"]
            uid = ((x["relationships"].get("commenter") or {}).get("data") or {}).get("id")
            who = users.get(uid, uid) + (" [CREATOR]" if a.get("is_by_creator") else "")
            body = (a.get("body") or "").replace("\n", "\n" + "    " * depth + "  ")
            lines.append("    " * depth + f"- ({(a.get('created') or '')[:10]}) {who}: {body}")
            walk(x["id"], depth + 1)

    walk(None, 0)
    return "\n".join(lines), len(allc)


def archive_post(group, pid):
    d = os.path.join(ROOT, group, str(pid))
    os.makedirs(os.path.join(d, "images"), exist_ok=True)
    pj_path = os.path.join(d, "post.json")
    if os.path.exists(pj_path):
        post = json.load(open(pj_path))
    else:
        post = get(f"https://www.patreon.com/api/posts/{pid}?include=attachments_media,images,media,user_defined_tags,campaign")
        if not post:
            return None
        json.dump(post, open(pj_path, "w"))
    a = post["data"]["attributes"]
    images, links = [], []
    body = ""
    if a.get("content_json_string"):
        try:
            body = render_nodes(json.loads(a["content_json_string"]).get("content"), images, links)
        except Exception as e:  # noqa
            body = f"(content_json_string parse error: {e})"
    if not body.strip() and a.get("content"):
        body = html_to_text(a["content"], images, links)
    teaser = a.get("teaser_text") or ""
    header_img = (a.get("image") or {}).get("large_url") or (a.get("image") or {}).get("url")
    media = [i for i in post.get("included", []) if i["type"] == "media"]
    for m in media:
        ma = m.get("attributes") or {}
        u = (ma.get("image_urls") or {}).get("original") or ma.get("download_url")
        if u and u not in images:
            images.append(u)
    if header_img and not images:
        images.append(header_img)
    tags = [i["id"].split(";")[-1] for i in post.get("included", []) if i["type"] == "post_tag"]

    cj_path = os.path.join(d, "comments.json")
    if os.path.exists(cj_path):
        comments = json.load(open(cj_path))
    else:
        comments = fetch_comments(pid) if (a.get("comment_count") or 0) > 0 else {"data": [], "included": []}
        json.dump(comments, open(cj_path, "w"))
    ctext, ccount = render_comments(comments)

    saved = []
    for i, u in enumerate([x for x in images if x], 1):
        ext = os.path.splitext(urllib.parse.urlparse(u).path)[1].lower() or ".jpg"
        if ext not in (".png", ".jpg", ".jpeg", ".gif", ".webp"):
            ext = ".jpg"
        fp = os.path.join(d, "images", f"{i:02d}{ext}")
        if not os.path.exists(fp):
            b = get(u, binary=True)
            if b:
                open(fp, "wb").write(b)
        if os.path.exists(fp):
            saved.append(os.path.relpath(fp, d))

    embed = a.get("embed")
    md = [f"# {a.get('title')}", "",
          f"- post_id: {pid}", f"- url: {a.get('url')}", f"- published: {a.get('published_at')}",
          f"- post_type: {a.get('post_type')}", f"- tags: {', '.join(tags)}",
          f"- viewable_without_login: {a.get('current_user_can_view')}",
          f"- min_cents_to_view: {a.get('min_cents_pledged_to_view')}",
          f"- likes: {a.get('like_count')}  comments(api count): {a.get('comment_count')}  comments(archived): {ccount}",
          f"- embed: {json.dumps(embed) if embed else None}", "",
          "## Body", "", body.strip() or f"(no body visible) TEASER: {teaser}", "",
          "## Links", ""] + [f"- {l}" for l in dict.fromkeys(links) if l] + ["", "## Images (local files)", ""] + \
         [f"- {s}" for s in saved] + ["", "## Comments", "", ctext or "(none)", ""]
    open(os.path.join(d, "post.md"), "w").write("\n".join(md))
    return {"id": pid, "title": a.get("title"), "published": a.get("published_at"),
            "viewable": a.get("current_user_can_view"), "body_chars": len(body.strip()),
            "images": len(saved), "comments": ccount, "links": list(dict.fromkeys(l for l in links if l))}


def campaign_post_ids(cid):
    url = (f"https://www.patreon.com/api/posts?filter%5Bcampaign_id%5D={cid}&filter%5Bcontains_exclusive_posts%5D=true"
           "&filter%5Bis_draft%5D=false&sort=-published_at&page%5Bcount%5D=20&fields%5Bpost%5D=title,published_at")
    ids = []
    while url:
        j = get(url)
        if not j:
            break
        ids += [p["id"] for p in j.get("data", [])]
        url = (j.get("links") or {}).get("next")
    return ids


def main():
    only = [a for a in sys.argv[1:] if not a.startswith("-")]
    if set(only) - set(GROUPS):
        sys.exit(f"unknown group(s) {sorted(set(only) - set(GROUPS))}; known: {list(GROUPS)}")
    idx_path = os.path.join(ROOT, "index.json")
    index = json.load(open(idx_path)) if os.path.exists(idx_path) else {}
    for group, src in GROUPS.items():
        if only and group not in only:
            continue
        if "collection" in src:
            c = get(f"https://www.patreon.com/api/collection/{src['collection']}")
            ids = [str(x) for x in c["data"]["attributes"]["post_ids"]]
            title = c["data"]["attributes"]["title"]
        elif "ids_file" in src:
            ids = [str(x) for x in json.load(open(os.path.join(ROOT, src["ids_file"])))]
            title = src.get("title", group)
        else:
            ids = campaign_post_ids(src["campaign"])
            title = f"campaign {src['campaign']}"
        print(f"== {group}: {title}: {len(ids)} posts", flush=True)
        rows = []
        for pid in ids:
            r = archive_post(group, pid)
            if r:
                rows.append(r)
                print(f"  {pid} view={r['viewable']} body={r['body_chars']} img={r['images']} com={r['comments']} :: {r['title']}", flush=True)
            else:
                rows.append({"id": pid, "error": "fetch failed"})
                print(f"  {pid} FAILED", flush=True)
        index[group] = {"title": title, "posts": rows}
    json.dump(index, open(idx_path, "w"), indent=1)


if __name__ == "__main__":
    os.makedirs(ROOT, exist_ok=True)
    main()
