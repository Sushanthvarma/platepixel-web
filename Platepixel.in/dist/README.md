# PlatePixel — production build

Three files. Drop them on any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3, Hostinger, plain Apache — anything).

```
index.html      — the page
styles.css      — all styles (brand + platform v2)
script.js       — nav, reveals, parallax, AI Curator
```

## Deploy

**Netlify / Vercel / Cloudflare Pages** — drag the `dist` folder onto their dashboard. Done.

**GitHub Pages** — commit these three files to a repo, enable Pages on `main`.

**Plain hosting (cPanel, Hostinger, etc.)** — upload the three files to `public_html` (or the document root).

**Custom domain** — point `platepixel.in` (A record or CNAME) at the host. Most hosts auto-provision SSL.

## The AI Curator

The hero curator calls a Claude API helper available in the Claude artifact runtime. **On your own domain, you'll need to wire it to a real backend.** Two options:

1. **Easiest** — point `curator.js`'s `claude.complete` call at your own server endpoint that proxies to Anthropic's API. About 20 lines of Node/Python.
2. **No-backend fallback** — the curator already falls back to a heuristic curator if the Claude helper isn't available, so the UI still works out of the box. It produces a sensible recommended stack based on keywords.

If you'd like, I can write the backend proxy (Vercel serverless function or a tiny Node/Express endpoint) — just say "wire up the curator backend."

## Things to swap before going live

- **Photography** — every image is currently from Unsplash. Replace with real shoots from your launched restaurants.
- **Client names** — the `BRAND · WEBSITE · MENU ·` marquee + work cards use placeholder restaurant names. Swap for real ones.
- **Contact** — `hello@platepixel.in`, `+91 99999 99999`, `@platepixelstudio` are placeholders. Update in `index.html` (footer + CTA section).
- **Pricing** — current numbers are illustrative. Tune to your real rates.
- **Stats** — `40+ stacks · 2.4× bookings · 22% wastage · 14d launch` are placeholders.

## Two versions

- `dist/` — production build (this folder)
- `PlatePixel v1 - Studio site.html` — the original studio-only positioning, preserved in case you want to fork that direction

Built with care.
