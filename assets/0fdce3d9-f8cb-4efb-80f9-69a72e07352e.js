/* PlatePixel — small interaction layer
   - sticky nav scroll state
   - reveal-on-scroll
   - mobile menu toggle
   - footer year
*/

(function() {
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const year = document.getElementById('year');

  if (year) year.textContent = new Date().getFullYear();

  // Nav scroll state
  const onScroll = () => {
    if (window.scrollY > 16) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('menu-open');
    });
    // close on link tap
    nav.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => nav.classList.remove('menu-open'));
    });
  }

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    // stagger reveal slightly for sibling items within a group
    const parent = el.parentElement;
    const siblings = parent ? Array.from(parent.children).filter(c => c.classList.contains('reveal')) : [];
    const idx = siblings.indexOf(el);
    if (idx > -1) {
      el.style.transitionDelay = (Math.min(idx, 5) * 60) + 'ms';
    }
    io.observe(el);
  });

  // Smooth-scroll offset for sticky nav
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length < 2) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navHeight = nav.getBoundingClientRect().height;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // Subtle parallax on hero cards
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual && window.matchMedia('(min-width: 1081px)').matches) {
    const cards = heroVisual.querySelectorAll('.hero-card');
    heroVisual.addEventListener('mousemove', (e) => {
      const r = heroVisual.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cards.forEach((c, i) => {
        const depth = i === 0 ? 12 : 8;
        c.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
      });
    });
    heroVisual.addEventListener('mouseleave', () => {
      cards.forEach(c => { c.style.transform = ''; });
    });
  }
})();


/* PlatePixel Copilot — live AI curator
   Calls window.claude.complete with a system prompt that returns a
   structured curated stack. Falls back gracefully on parse failure.
*/
(function () {
  const root = document.getElementById('curator');
  if (!root) return;

  const input        = document.getElementById('curator-input');
  const submitBtn    = document.getElementById('curatorSubmit');
  const resetBtn     = document.getElementById('curatorReset');
  const retryBtn     = document.getElementById('curatorRetry');
  const readEl       = document.getElementById('resultRead');
  const stackEl      = document.getElementById('resultStack');
  const estimateEl   = document.getElementById('resultEstimate');
  const firstEl      = document.getElementById('resultFirst');
  const loadingSteps = root.querySelectorAll('.loading-step');
  const chips        = root.querySelectorAll('.chip');

  /* ---------- chip presets ---------- */
  const CHIP_PRESETS = {
    cafe: "We run a 30-seat café in Bandra. Strong Instagram (12k), no website, no real menu — diners message us for hours and the menu lives in a screenshot. We do brunch and small plates. Just one outlet.",
    restaurant: "We run a North-Indian restaurant with three outlets in Mumbai. Solid Zomato but very few direct bookings. POS is a mix of two old systems, inventory is on Excel. Opening a fourth outlet in three months.",
    cloud: "We run a cloud kitchen with four brands operating out of one Bengaluru kitchen. Heavy aggregator dependency — Swiggy + Zomato take 28%. We want our own ordering site and better forecasting because wastage is killing margins.",
    retail: "We run a boutique skincare store in Pune with two locations. Selling online via Instagram DMs, no real website or catalog. POS is a basic Zoho setup, inventory is mostly in someone's head.",
    bakery: "We run a small patisserie with one storefront and a strong wholesale business to cafés. We do custom-order birthday cakes online via WhatsApp. Cream costs are killing us; we suspect our supplier markup but can't prove it."
  };

  chips.forEach(c => {
    c.addEventListener('click', () => {
      const key = c.dataset.chip;
      if (CHIP_PRESETS[key]) {
        input.value = CHIP_PRESETS[key];
        input.focus();
      }
    });
  });

  /* ---------- state ---------- */
  function setState(s) { root.setAttribute('data-state', s); }

  /* ---------- loading step cycler ---------- */
  let stepTimer = null;
  function cycleSteps() {
    loadingSteps.forEach(s => s.classList.remove('show'));
    if (!loadingSteps[0]) return;
    loadingSteps[0].classList.add('show');
    let i = 0;
    stepTimer = setInterval(() => {
      loadingSteps[i].classList.remove('show');
      i = (i + 1) % loadingSteps.length;
      loadingSteps[i].classList.add('show');
    }, 1400);
  }
  function stopSteps() {
    if (stepTimer) clearInterval(stepTimer);
    stepTimer = null;
  }

  /* ---------- the prompt ---------- */
  const SYSTEM_PROMPT = `You are PlatePixel's AI Curator. PlatePixel is an Indian studio + platform serving restaurants today and retail next. We build the full digital stack — Brand, Website, Menu/Catalog, POS, ERP/Inventory, and an AI Copilot for forecasting/marketing.

A business owner has just described their business. Recommend a CURATED stack — only what they need now and next, not everything. Be opinionated and specific to their situation. Most businesses should start with 2–4 services, not 6.

Available services (with rough INR ranges):
- Brand Identity (₹40k–₹1.2L): logos, type system, photography direction
- Website (₹24k–₹1.5L): premium custom restaurant/retail sites with bookings
- Digital Menu / Catalog (₹12k–₹40k): QR-loadable, phone-editable menus or catalogs
- POS System (₹80k–₹3L): point-of-sale, KOTs, payments, multi-outlet
- ERP / Inventory (₹1.5L–₹6L): stock, recipes, suppliers, staff, GST, finance
- AI Copilot (₹15k–₹35k per month): forecasting, menu engineering, marketing automation, customer retention

Respond with ONLY a JSON object — no markdown, no preamble, no commentary. Exact shape:
{
  "read": "One-sentence honest read on what they need most urgently. Max 140 chars. Concrete, no jargon.",
  "stack": [
    {
      "name": "Service name from the list above",
      "why": "Why THIS service for THEIR specific situation. Max 130 chars. Reference their numbers / their words.",
      "when": "Now" | "Next" | "Later"
    }
  ],
  "estimate": "₹X — ₹Y total (one-time) [+ optional ₹Z/mo recurring]",
  "first_step": "One specific action they should take this week. Max 110 chars. Imperative voice."
}

Pick 2–5 services, ordered by priority. Use the exact service names from the list. Be specific, never generic.`;

  /* ---------- fallback (used if Claude unavailable or JSON fails) ---------- */
  function fallbackProposal(text) {
    const t = (text || '').toLowerCase();
    const hasMulti  = /(multi|outlet|chain|stores?|locations?|three|four|five)/i.test(t);
    const hasRetail = /(retail|store|boutique|catalog|product)/i.test(t);
    const hasAggreg = /(swiggy|zomato|aggregator|deliver)/i.test(t);
    const hasInv    = /(inventory|stock|supplier|wastage|margin|cost)/i.test(t);
    const hasBrand  = /(no website|instagram|brand|logo|fresh|new)/i.test(t);

    const stack = [];
    stack.push({ name: "Website",            why: "You're trusting Instagram for discovery — Google decides bookings. A site is the home Google sends people to.", when: "Now" });
    stack.push({ name: "Digital Menu / Catalog", why: hasRetail ? "A live product catalog beats DM-by-DM ordering." : "A QR-loadable menu beats a screenshot, every time.", when: "Now" });
    if (hasBrand)  stack.push({ name: "Brand Identity",  why: "If the front-of-house is the pitch, the brand has to land in one second.", when: "Next" });
    if (hasMulti || hasAggreg) stack.push({ name: "POS System", why: "Multi-outlet ops without unified POS leak orders and margins daily.", when: hasMulti ? "Next" : "Later" });
    if (hasInv)    stack.push({ name: "AI Copilot",      why: "Suspect supplier markups + wastage? Copilot watches both, every night.", when: "Next" });
    if (hasMulti && hasInv) stack.push({ name: "ERP / Inventory", why: "At this scale, Excel is hiding the margin problem.", when: "Later" });

    return {
      read: hasMulti
        ? "You're a multi-outlet operation running on disconnected tools — discovery and ops need to be unified."
        : "You're discovered on Instagram but losing the decision to your website — fix the home Google sends people to.",
      stack: stack.slice(0, 5),
      estimate: hasMulti ? "₹2.4L — ₹6L total + ₹15k–35k/mo" : "₹48,000 — ₹1.2L total",
      first_step: "Book a 45-minute curate call this week — we'll lock the stack and start the concept."
    };
  }

  /* ---------- renderer ---------- */
  function render(data) {
    readEl.textContent = data.read || '—';
    estimateEl.textContent = data.estimate || '—';
    firstEl.textContent = data.first_step || '—';

    stackEl.innerHTML = '';
    (data.stack || []).forEach((item, i) => {
      const when = (item.when || 'Now').toString().toLowerCase();
      const num = String(i + 1).padStart(2, '0');
      const div = document.createElement('div');
      div.className = 'result-item';
      div.innerHTML = `
        <div class="result-item-num">${num}</div>
        <div class="result-item-body">
          <div class="result-item-name">${escapeHtml(item.name || '—')}</div>
          <div class="result-item-why">${escapeHtml(item.why || '')}</div>
        </div>
        <div class="result-item-when when-${when}">${escapeHtml(item.when || 'Now')}</div>
      `;
      // gentle stagger reveal
      div.style.opacity = '0';
      div.style.transform = 'translateY(6px)';
      div.style.transition = 'opacity .45s ease, transform .45s ease';
      stackEl.appendChild(div);
      setTimeout(() => {
        div.style.opacity = '1';
        div.style.transform = 'translateY(0)';
      }, 80 + i * 90);
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ---------- parse JSON robustly ---------- */
  function tryParse(text) {
    if (!text) return null;
    // strip markdown fences if present
    let cleaned = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '');
    // grab from first { to last }
    const first = cleaned.indexOf('{');
    const last  = cleaned.lastIndexOf('}');
    if (first < 0 || last < 0) return null;
    try { return JSON.parse(cleaned.slice(first, last + 1)); } catch (_) { return null; }
  }

  /* ---------- submit ---------- */
  async function submit() {
    const text = (input.value || '').trim();
    if (text.length < 40) {
      input.focus();
      input.style.borderColor = 'var(--copper)';
      setTimeout(() => { input.style.borderColor = ''; }, 1200);
      return;
    }

    setState('loading');
    cycleSteps();

    const t0 = Date.now();
    let data = null;

    try {
      if (window.claude && typeof window.claude.complete === 'function') {
        const reply = await window.claude.complete({
          messages: [
            { role: 'user', content: `${SYSTEM_PROMPT}\n\nBusiness:\n"""${text}"""\n\nReturn ONLY the JSON object.` }
          ]
        });
        data = tryParse(reply);
      }
    } catch (err) {
      console.warn('Curator call failed:', err);
    }

    // floor a bit of loading time so the cycling steps land
    const elapsed = Date.now() - t0;
    if (elapsed < 2400) await new Promise(r => setTimeout(r, 2400 - elapsed));

    stopSteps();

    if (!data || !Array.isArray(data.stack) || data.stack.length === 0) {
      data = fallbackProposal(text);
    }

    render(data);
    setState('result');

    // scroll the result into a comfortable view
    requestAnimationFrame(() => {
      const top = root.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  }

  function reset() {
    setState('idle');
    input.focus();
  }

  /* ---------- bind ---------- */
  submitBtn.addEventListener('click', submit);
  resetBtn.addEventListener('click', reset);
  retryBtn && retryBtn.addEventListener('click', reset);

  // Cmd/Ctrl+Enter to submit
  input.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      submit();
    }
  });
})();
