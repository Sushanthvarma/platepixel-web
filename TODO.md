# PlatePixel — Pending Items Before Public Launch

## Critical (do not launch without)
- [ ] Real WhatsApp number (find all `data-placeholder="real-whatsapp"` in index.html)
- [ ] Real phone number on the contact line in footer
- [ ] Validate / replace case study names in Selected Work section (Blue Tokai legal risk)
- [ ] Decide curator backend path: smart-template-only (Path A) or real Anthropic API (Path B)
- [ ] If Path B: provision ANTHROPIC_API_KEY in Vercel, add Upstash rate limiting

## High
- [ ] Design favicon (16x16, 32x32, 180x180 apple-touch-icon)
- [ ] Create OG share image at `assets/og-image.jpg` (1200x630)
- [ ] Replace 5 vague case studies with 1 real, detailed case study (with permission)
- [ ] Add analytics (Plausible or Umami — privacy-friendly, GDPR-safe)
- [ ] Mobile breakpoint testing: 360px, 414px, 768px, 1024px, 1366px

## Medium
- [ ] Real testimonial quotes (currently has 3 — verify Rohan Kapoor, Ananya Rao, Sahej Bedi exist and gave permission)
- [ ] Privacy / Terms / Data / Sitemap pages (currently all link to `#`)
- [ ] Skip-to-main accessibility link at top of body
- [ ] Replace empty <textarea> placeholder when AI returns malformed JSON repeatedly

## Strategic (post-launch)
- [ ] Decide brand boundary: restaurants-first-then-retail OR generic SMB IT (current copy is muddled)
- [ ] One detailed case study page with real numbers, screenshots, permission
- [ ] "Built with" trust page (Anthropic Claude, Vercel, etc.)
- [ ] Domain consideration: platepixel.in vs platepixel.com if going beyond restaurants
