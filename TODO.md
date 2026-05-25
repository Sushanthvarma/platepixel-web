# PlatePixel — Pending Items Before Public Launch

## Critical (do not launch without)
- [ ] Real WhatsApp number (find all `data-placeholder="real-whatsapp"` in index.html)
- [ ] Real phone number on the contact line in footer
- [ ] **Testimonials section now references businesses we removed from Selected Work** (Fire & Stone, Saffron House, Olive Café). Decide: remove section, replace with real Ozone Salon client quotes, or rewrite as anonymized.
- [ ] Replace placeholder photo on the Ozone Salon work-card hero (currently using a bar interior JPG). Take a real salon photo or design a clean abstract.
- [ ] Decide curator backend path: smart-template-only (Path A) or real Anthropic API (Path B)
- [ ] If Path B: provision ANTHROPIC_API_KEY in Vercel, add Upstash rate limiting

## High
- [ ] Design favicon (16x16, 32x32, 180x180 apple-touch-icon)
- [ ] Create OG share image at `assets/og-image.jpg` (1200x630)
- [ ] Take real screenshots of the Salon POS demo (login, counter, admin dashboard, P&L, appointments) and embed them in the work-card or add a small gallery
- [ ] Add analytics (Plausible or Umami — privacy-friendly, GDPR-safe)
- [ ] Mobile breakpoint testing: 360px, 414px, 768px, 1024px, 1366px

## Medium
- [ ] Privacy / Terms / Data / Sitemap pages (currently all link to `#`)
- [ ] Skip-to-main accessibility link at top of body
- [ ] Replace empty <textarea> placeholder when AI returns malformed JSON repeatedly
- [ ] Curator placeholder still mentions "Bandra" (Mumbai) — update to Hyderabad-relevant example to match new positioning

## Strategic (post-launch)
- [ ] Decide brand boundary: restaurants-first-then-retail OR generic SMB IT (current copy is muddled)
- [ ] One detailed case study page with real numbers, screenshots, permission
- [ ] "Built with" trust page (Anthropic Claude, Vercel, etc.)
- [ ] Domain consideration: platepixel.in vs platepixel.com if going beyond restaurants
