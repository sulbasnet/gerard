# Gérard Fauré — Official Website
## Site Outline (v1 — planning only, no code)

> **Note on language:** this document and `DESIGN.md` are written in English for you.
> The *website itself* ships in **French, Spanish and English**. On-page copy shown in
> this document is quoted in French because that is the primary locale — the ES and EN
> equivalents are listed in the copy tables of section 3.

---

## At a glance — what ships at launch

**Domain:** `gerardfaure.fr` · **Languages:** French, Spanish, English (all at launch) · **Commerce:** none

**8 templates → ~30 URLs**

| In the navigation | | |
|---|---|---|
| **1. Home** | `/fr` · `/es` · `/en` | Hero, bio teaser, books, videos, quote, newsletter |
| **2. The Author** | `/auteur` · `/autor` · `/author` | Long biography + vertical timeline |
| **3. Books** | `/livres` · `/libros` · `/books` | Grid of covers |
| **4. Videos** | `/videos` · `/videos` · `/videos` | YouTube gallery + press & podcasts |
| **5. Contact** | `/contact` · `/contacto` · `/contact` | Form + press/booking details |

| Not in the navigation | | |
|---|---|---|
| **Book detail** | `/{books}/{slug}` | One per book — synopsis, excerpt, press quotes, newsletter capture |
| **Legal notice** | footer link | Publisher/owner identification (legally required in France) |
| **Privacy policy** | footer link | GDPR — required because of the newsletter and contact form |

Plus `/` → redirects to the visitor's language, defaulting to French.

**Deliberately not built at launch:** News/blog · Interviews as a separate page · Shop, cart or prices · Media kit · Any purchase link.

---

## 1. Goals

An author showcase site — dark, restrained, premium. Three jobs, in priority order:

1. **Capture the audience** → newsletter signup + social (YouTube, Instagram, TikTok, Facebook).
2. **Tell the man's story** → biography, timeline, testimony.
3. **Present the work** → the books, what they're about, who he is as a writer.

> **Priorities changed on 23 Aug 2026.** Selling was originally job #1, but with no digital
> editions available yet there is nothing to link a purchase to (§10.4). Until that changes,
> the newsletter *is* the conversion — it's how the audience built now gets reached on the
> day the books become available. Every design decision should be read in that light: an
> email address is currently worth more than a click.

Audience: French readers 30–70, Spanish-speaking readers (Spain + Latin America), journalists and podcasters looking to book him, and curious visitors arriving from YouTube/TikTok.

---

## 2. Sitemap

### Phase 1 — launch (5 pages × 3 languages)

All paths below are relative to `https://gerardfaure.fr`.

| # | Page | FR | ES | EN | Purpose |
|---|------|----|----|----|---------|
| 1 | Home | `/fr` | `/es` | `/en` | Showcase, summarizes the whole site |
| 2 | The Author | `/fr/auteur` | `/es/autor` | `/en/author` | Long biography + timeline |
| 3 | Books | `/fr/livres` | `/es/libros` | `/en/books` | Grid of works + one page per book |
| 4 | Videos & Interviews | `/fr/videos` | `/es/videos` | `/en/videos` | YouTube gallery + media appearances |
| 5 | Contact | `/fr/contact` | `/es/contacto` | `/en/contact` | Form + press/booking details |

**Sub-page:** `/{lang}/{books-slug}/{book-slug}` — one detail page per book.
**Legal:** legal notice + privacy policy in each language, linked from the footer (GDPR requirement).

**Root behavior — revised, superseding the original design above.** French now owns the bare root: `/`, `/auteur`, `/livres`… with no `/fr` prefix at all. English and Spanish stay prefixed (`/es/…`, `/en/…`). `/fr` and `/fr/*` are deliberately made to return 404 rather than serve duplicate content — gerardfaure.fr was never published with `/fr` URLs, so there's no legacy traffic or search equity to protect, and serving the same French page at two URLs would only create duplicate-content risk. There is no Accept-Language auto-redirect: every visitor and crawler gets the canonical French homepage at `/`, and switches to ES/EN explicitly via the language menu. Implemented via `localePrefix()` in `src/i18n/config.ts` and an internal rewrite (not a redirect) in `middleware.ts`.

Any code that builds a locale URL must go through `path()`/`localePrefix()` — hand-rolling `/${locale}/...` silently breaks for French. Caught and fixed 25 Aug 2026 in three places that predated this redesign: the footer's language links, and the book detail page's `og:url` and JSON-LD `@id`/`url`.

That's **5 templates → 15 routed pages**, plus roughly 3 books × 3 languages = 9 book pages. Around 24 URLs at launch.

### Phase 2 — later

- **News** (`/actualites`, `/noticias`, `/news`) — blog, signings, releases.
- **Interviews** split out from Videos (written press, audio podcasts).
- **Shop** — signed copies (needs Stripe + shipping logistics).
- **Press / Media kit** — downloadable HD photos, short bio, agent contact.

> The mockup's menu shows 7 items. V1 ships **5**, and the menu keeps exactly the same
> treatment (weight, letter-spacing, gold underline on the active item) so the header
> doesn't look unbalanced.

---

## 3. The three languages

This is the biggest change from v1 of the outline, and it affects more than the text.

### Copy table — navigation

| FR | ES | EN |
|----|----|----|
| ACCUEIL | INICIO | HOME |
| L'AUTEUR | EL AUTOR | THE AUTHOR |
| LIVRES | LIBROS | BOOKS |
| VIDÉOS | VÍDEOS | VIDEOS |
| CONTACT | CONTACTO | CONTACT |

### Copy table — key calls to action

| FR | ES | EN |
|----|----|----|
| DÉCOUVRIR SON HISTOIRE | DESCUBRIR SU HISTORIA | DISCOVER HIS STORY |
| SES LIVRES | SUS LIBROS | HIS BOOKS |
| EN SAVOIR PLUS → | SABER MÁS → | LEARN MORE → |
| VOIR TOUS LES LIVRES → | VER TODOS LOS LIBROS → | VIEW ALL BOOKS → |
| S'INSCRIRE | SUSCRIBIRSE | SUBSCRIBE |

### What three languages actually costs

- **Layout:** Spanish and French run 15–25% longer than English. `DÉCOUVRIR SON HISTOIRE` and `DESCUBRIR SU HISTORIA` are both far wider than `DISCOVER HIS STORY`. Buttons must size to their content, never to a fixed width, and the desktop nav must collapse to a hamburger earlier in ES/FR than in EN. Details in `DESIGN.md` §9.
- **Typography:** Spanish adds `¿ ¡ ñ á í ó ú ü`, French adds `é è ê à ç ô î ë`. Both are covered by the chosen Google Fonts — but the fonts must be loaded with the Latin **Extended** subset, not just `latin`.
- **Content:** every biography, synopsis and quote is written three times. This is the real schedule driver, not the code.
- **Books:** no Spanish or English editions exist yet. All locales show the same French editions — settled, see §10.1.
- **Newsletter:** Brevo/Mailchimp needs three list segments so subscribers get emails in their own language.
- **SEO:** reciprocal `hreflang` tags across all three, plus `x-default` pointing at the FR home.

---

## 4. Art direction (summary)

Full specification lives in **`DESIGN.md`**. In one paragraph:

Near-black background, warm brass gold as the only accent, cream text. Cormorant Garamond for display headings; Manrope, uppercase and widely letter-spaced, for navigation, labels and body. A short gold rule under every section title. Photography black-and-white everywhere except the hero portrait. Dark gradient washes over full-bleed images so text stays readable. A fixed vertical social rail on the left edge. No light mode — the darkness *is* the identity.

---

## 5. Page-by-page structure

### 5.1 Home

1. **Header** — wordmark "GÉRARD FAURÉ", centered nav, boxed language switcher at right (now a 3-item dropdown: FR / ES / EN). Transparent on load, solid black after scrolling.
2. **Full-screen hero** — portrait anchored right, gradient fading to black on the left. Name on two lines, gold rule, keyword line, two-line tagline, two buttons (gold filled + outlined). "SCROLL" indicator bottom-center.
3. **Three-column band** (the dark grey block in the mockup):
   - *A life out of the ordinary* — 3 lines of bio + B&W photo + arrow link
   - *His books* — 3 covers in a row + arrow link
   - *Latest videos* — single-video carousel with ‹ › arrows, title, arrow link
   - Tablet: 2 columns. Mobile: stacked, carousel becomes a horizontal swipe.
4. **Full-width pull quote** *(my addition — not in the mockup)* — one strong line from Gérard over a darkened photo. The mockup jumps from the three-column band straight into the newsletter bar, which feels abrupt; this gives the page a breath.
5. **Newsletter bar** — envelope icon, heading, email field, gold subscribe button, GDPR line and privacy link beneath the field.
6. **Footer** — wordmark, mini nav, social icons, legal links, copyright.

### 5.2 The Author

1. Short banner (40vh): page title over a B&W photo.
2. Long biography in two asymmetric columns — text left (60%), sticky vertical portrait right (40%).
3. **Vertical timeline** — life milestones, year set in gold, vertical rule, dots. This is the strongest element on the page.
4. Pull quote block.
5. "His books" recap (3 covers) + CTA.

### 5.3 Books

1. Short banner.
2. Card grid: cover, title, year, one-line synopsis, arrow link. 3 across on desktop, 2 on tablet, 1 on mobile.
3. **Book detail page:** large cover left; right side carries title, publisher, year, page count, 3–4 paragraph synopsis, a pulled excerpt in a bordered box, and press quotes. **No purchase links** — see §10.4. "Other books" strip at the bottom.
   - **Where the buy button would have gone:** a compact newsletter block — *"Be notified when this book is available"* — with the email field inline. This is the page's only call to action, and it sits exactly at the moment of peak interest: someone has just read the synopsis and wants the book. Capturing that as an email is the single highest-value interaction on the site right now.
   - Tag those signups with the book slug so that when availability arrives, the announcement can go to the people who asked about *that* book rather than the whole list.

### 5.4 Videos & Interviews

1. Short banner.
2. Featured video: large thumbnail, plays in a modal — **no YouTube iframe loaded upfront**. It loads on click only, which is both a speed win and a GDPR win (no third-party cookies before consent).
3. Thumbnail grid: image, title, channel or show, date.
4. "Press & podcasts" section: outbound links (outlet, title, date).
5. Simple filters once the library passes ~20 items: All / Interviews / Podcasts / TV.

### 5.5 Contact

1. Short banner.
2. Two columns. Left: form — name, email, subject dropdown (*Press / Event–signing / Reader / Other*), message, GDPR consent checkbox. Right: direct contacts (press email, publisher, socials) and a note that reader mail is read but replies may take time.
3. Spam handling: honeypot field + rate limiting. No CAPTCHA.

---

## 6. Reusable components

`Header` · `LangSwitcher` · `SocialRail` · `Hero` · `SectionTitle` · `ArrowLink` · `Button` · `BookCard` · `VideoCard` · `VideoModal` · `Carousel` · `TimelineItem` · `QuoteBlock` · `NewsletterBar` · `Footer` · `PageBanner` · `Reveal`

About **17 components** for the entire site. V1 stays small because everything repeats.

---

## 7. Domain, hosting and email

**Domain: `gerardfaure.fr`** — registered 21 August 2026 through Hostinger, expires 21 August 2027. DNS is not configured yet and nothing is live, so this is a clean launch: no existing pages to redirect, no rankings to preserve.

### The one real catch: `.fr` is geo-targeted

Google treats a country-code domain like `.fr` as a strong signal that the site is *for France*. Unlike a `.com`, this **cannot be overridden** in Search Console — the international targeting setting is locked for ccTLDs.

Practically: the Spanish and English pages will be at a disadvantage in Spanish and English organic search results. It does not block them — `hreflang` still works, and anyone searching his name will find the site in any language — but for generic searches in Spain, Latin America, the UK or the US, `.fr` is a handicap.

**My recommendation:** keep `gerardfaure.fr` as the primary domain. His audience is overwhelmingly French, and the ES/EN traffic will mostly arrive from YouTube, TikTok and name searches rather than generic organic search — exactly the traffic the ccTLD doesn't hurt. Then:

- **Register `gerardfaure.com` now** (~€10/year) and 301-redirect it to `.fr`. This is defensive: it stops anyone else taking the name, and gives you a migration path.
- Consider `gerardfaure.es` for the same reason, though it matters less.
- If Spanish or English ever becomes commercially important, flip it: make `.com` canonical and redirect `.fr` to it. Doing that later is a real but manageable migration — much easier than recovering a squatted domain.

### DNS and hosting

The domain being at Hostinger does **not** commit you to hosting there — DNS can point anywhere.

Two workable paths:

1. **Vercel** (my recommendation): point the domain's nameservers or A/CNAME records at Vercel. Free tier is sufficient, deploys happen automatically from Git, HTTPS is automatic.
2. **Hostinger hosting** (if you already bought a plan with the domain): also fine. The site is fully static, so it exports to plain HTML/CSS/JS files and uploads to any shared host. No server runtime required.

The site being static is what keeps this door open — it deploys equally well either way, with no lock-in. If Hostinger hosting is already paid for, use it; there's no reason to pay twice.

Also configure: `www.gerardfaure.fr` → 301 redirect to the apex domain (pick one canonical form and stick to it), HTTPS enforced, and HSTS once you're confident.

### Email

Needed for the contact form and press enquiries:

- `contact@gerardfaure.fr` — reader and general mail
- `presse@gerardfaure.fr` — journalists and booking

Hostinger bundles mailboxes with most plans; Google Workspace or Zoho Mail are alternatives. Whichever you choose, the contact form's transactional sender needs **SPF, DKIM and DMARC records** on the domain, or form submissions land in spam. That's three DNS records, done once.

> **One housekeeping note:** `.fr` domains require the registrant to have an address in the
> EU/EEA (plus Switzerland, Norway, Iceland, Liechtenstein). Registration went through, so
> this is satisfied — just keep the registrant contact details accurate, since AFNIC can
> suspend domains with unverifiable ones.

---

## 8. Technical approach

**Recommended: Next.js (App Router) + Tailwind CSS + Markdown/MDX content files.**

Why: static rendering (instant pages, strong SEO), native i18n through a `[locale]` route segment, free hosting on Vercel, and no database to maintain for a dozen books and a few dozen videos.

- **Content structure:** `content/{fr|es|en}/books/*.md`. Same filenames across locales so the language switcher can map a page to its translation. If Gérard's team needs to publish without a developer later, plug in a light CMS (Sanity or Decap) without touching the front end.
- **Images:** `next/image`, AVIF/WebP, hero portrait marked `priority`.
- **Newsletter:** Brevo or Mailchimp (EU servers, simpler GDPR story), three language segments.
- **Contact form:** API route + Resend for delivery.
- **Analytics:** Plausible or Vercel Analytics — cookieless, so **no consent banner is needed at all**. That's a real win on a design this clean.
- **SEO:** per-page Open Graph, `sitemap.xml` covering all three locales, reciprocal `hreflang`, `Person` + `Book` structured data.

*Cheaper alternative:* hand-written HTML/CSS/JS. Visually identical, but every new book is coded by hand and three languages triples that work. Only worth it if the site will never change.

---

## 9. What I need before building

**Blocking:**
- [ ] Hero portrait at high resolution (the one in the mockup, ≥2400px wide)
- [ ] 3–5 black-and-white photos (bio, page banners, quote background)
- [ ] All book covers in HD + synopses + purchase links
- [ ] Long biography, 800–1200 words — **in all three languages**
- [ ] 2–3 strong quotes for the pull-quote blocks, translated
- [ ] Navigation and UI strings confirmed in ES (my table in §3 is a first draft, not a native translation)

**Wanted:**
- [ ] List of videos/interviews to feature (YouTube URLs)
- [ ] Press contact email
- [ ] Brevo or Mailchimp account
- [ ] Which books have Spanish or English editions, and their buy links

> **Worth checking: rights to the photos and covers.** Author portraits usually belong to
> the photographer, and cover art to the publisher. Confirm before going live.

---

## 10. Decisions

### Settled

1. **Books: French editions only, shown identically in all three languages** — *decided 23 Aug 2026*. There are no Spanish or English editions at present, so there is no per-book variation to model. Every locale shows the same books, the same covers and the same French buy links.
   - **Translated:** titles stay in French (they're the actual product name), but **synopses, excerpts and press quotes are translated** into ES and EN. A Spanish reader needs to understand what the book is about even when the book itself is French.
   - **Not built:** no per-book `editions` field, no conditional edition logic, no availability matrix. When a translated edition eventually exists, we add that book's data then — it's a small change against a real requirement rather than speculative scaffolding built today.
   - **A short "in French" note** on the ES and EN locales — `Libro en francés` / `Book in French`, meta style under the title. One string per locale file, not per-book data. My original reason for this (stopping someone buying a book they can't read) no longer applies now that nothing is purchasable, so it's purely informational context — but it still saves a Spanish reader from assuming a Spanish edition exists, and it costs nothing.
2. **Launch trilingual** — *decided 23 Aug 2026*. FR, ES and EN all go live together. This makes translated copy a **blocking** dependency, not a phase-2 task — see §9. It is now the critical path for the launch date.
3. **Typefaces: Cormorant Garamond for display, Manrope for body and small text** — *decided 23 Aug 2026*. Rationale in `DESIGN.md` §3.
4. **No purchase links anywhere on the site** — *decided 23 Aug 2026*. Digital editions aren't available yet, so books are presented for reading *about*, not for buying: cover, title, publisher, year, synopsis, excerpt, press quotes. No Amazon, no Fnac, no publisher links, no prices, no "buy" language.
   - Consequence: the site's primary goal shifts from selling to audience capture (§1), and the newsletter becomes the conversion on every page rather than a footer afterthought.
   - The book page's newsletter block is what makes this reversible at no cost — when editions do become available, you already have a list of people who asked about each specific book.
   - **Not built:** no cart, no prices, no stock or availability states, no shop scaffolding sitting dormant. Adding buy buttons later is a small, well-understood change.

### Still open

4. **News page at v1?** An empty blog hurts more than it helps. Only include it with content ready.
5. **Direct sales?** If yes, Stripe plus shipping logistics — a project of its own, not a checkbox.
6. **Who updates the site?** If it isn't a developer, budget for a CMS from the start. With three languages this matters more, not less.
7. **Register `gerardfaure.com` defensively?** ~€10/year, recommended in §7.
