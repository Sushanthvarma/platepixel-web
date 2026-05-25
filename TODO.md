# PlatePixel — Pending Items Before Public Launch

## Critical (do not launch without)
- [ ] **Add a founder / "Why PlatePixel exists" section.** The GPT review flagged this as the single biggest missed opportunity. For service businesses, people buy founders before products. Needs: a short story (what you noticed, why restaurant tech is fragmented, why you built this), a real photo, and your name. I can wire it in once you give me the words.
- [ ] **Add 2–4 more real case studies.** Ozone Salon is the only one. The GPT review called this "the biggest single risk to conversion." Need: real client names you have permission to share, what you built, real metrics (or "in progress" if metrics aren't measurable yet), and 1–2 screenshots each.
- [ ] Optional: replace the stock salon photo (Unsplash, Benyamin Bohlouli — `assets/salon-hero.jpg`) with a real photo of your client's salon space once available.
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
- [x] ~~Curator placeholder still mentions "Bandra" (Mumbai) — update to Hyderabad~~ (Done — placeholder + chip presets now Hyderabad: Jubilee Hills, Banjara Hills, Gachibowli, Madhapur, Kondapur)

## Strategic (post-launch)
- [ ] Decide brand boundary: restaurants-first-then-retail OR generic SMB IT (current copy is muddled)
- [ ] One detailed case study page with real numbers, screenshots, permission
- [ ] "Built with" trust page (Anthropic Claude, Vercel, etc.)
- [ ] Domain consideration: platepixel.in vs platepixel.com if going beyond restaurants
