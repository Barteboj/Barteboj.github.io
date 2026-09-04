# Bartosz Bojda — portfolio

A hand-built static portfolio site. No build step, no dependencies, no framework —
just HTML, CSS and a little vanilla JavaScript.

## Files

```
index.html          the whole page
css/styles.css      design tokens, layout, responsive rules
js/main.js          mobile nav, scroll-spy, reveal-on-scroll, project toggles
assets/img/         portrait + game key art
```

## Preview it locally

Any static file server works. With Python:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.

You can also just double-click `index.html` — everything is relative paths, so it
works straight off the filesystem.

## Editing content

Everything lives in `index.html` as plain markup; there is no CMS or data file to
learn. The parts you'll most likely change:

- **Adding a project** — copy an existing `<article class="project">` block. If the
  new project has a "show all contributions" toggle, give its `.project__more` list a
  unique `id` and point the button's `aria-controls` at that same `id`.
- **Colours and spacing** — the `:root` block at the top of `css/styles.css`. Changing
  `--accent` re-themes the whole site.
- **A project with no key art** — use `<div class="project__thumb project__thumb--none">`
  with a short `<span>` label instead of an `<img>`, as Skydive VR does.

## Deploying

The site is plain static files, so any host works:

- **GitHub Pages** — push this folder to a repo, then Settings → Pages → deploy from
  branch root.
- **Netlify / Vercel / Cloudflare Pages** — drag the folder onto the dashboard, or
  connect the repo. No build command; publish directory is the repo root.

If you point a custom domain at it, update the `og:image` and `<link rel="canonical">`
URLs in `index.html` to absolute URLs on that domain so link previews render properly.

## Notes

- Images came from the previous Canva site. `Last Order: Blackwood Project` and
  `Skydive VR` have no surviving key art, so they use a styled fallback tile.
- Store links were verified against live Steam and Meta store pages.
- The design is dark-only by intent, matching the previous site. It respects
  `prefers-reduced-motion` and includes a print stylesheet that expands every
  collapsed project section.
