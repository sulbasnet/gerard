# Gérard Fauré — Design System
## Visual specification (v1 — spec only, no code)

Derived from the reference mockup. Everything below is a decision, not a suggestion —
if something needs to change, change it here first so the site stays coherent.

---

## 1. Design principles

1. **The page alternates dark and paper.** *Revised 23 Aug 2026 — this previously read "no light mode; the site is one continuous night."* The second mockup interleaves cream bands between the dark ones, and it is the better design: unbroken darkness across a full home page flattens into one long smear, and the cream bands give the eye somewhere to rest and make each section legible as a distinct chapter. Dark still opens and closes the page — hero and footer — so the first and last impressions are unchanged. This is **not** a light mode: there is no theme toggle and no `prefers-color-scheme` response. The bands are fixed editorial choices, the same for every visitor.
2. **Gold is punctuation, never paint.** It marks, underlines, points. If gold covers more than ~5% of any screen, something has gone wrong.
3. **Space before decoration.** Generous margins do the work that borders and boxes would do on a lesser site. Almost nothing has a background panel.
4. **The photography carries the emotion.** The layout stays still so the portraits can speak. No tilts, no overlaps, no collage.
5. **Motion is a whisper.** Fades and small rises. Nothing bounces, spins, or parallaxes.

---

## 2. Color

### Tokens

| Token | Hex | Role |
|-------|-----|------|
| `--bg` | `#0B0B0B` | Page background, hero |
| `--bg-alt` | `#171614` | Alternating section bands, cards |
| `--bg-raised` | `#211F1C` | Hover state on cards, modal surface |
| `--gold` | `#C9A465` | Accent: rules, arrows, active nav, primary button |
| `--gold-bright` | `#E0C892` | Gold hover / focus |
| `--gold-dim` | `#8A7043` | Inactive gold, disabled |
| `--cream` | `#F2ECE1` | Headings, primary text |
| `--text` | `#A9A29A` | Body paragraphs, secondary text |
| `--text-faint` | `#857E76` | Metadata, captions, timestamps |
| `--border` | `rgba(242,236,225,0.14)` | Outlined buttons, dividers |
| `--border-strong` | `rgba(242,236,225,0.28)` | Input borders, card outlines |
| `--overlay` | `rgba(11,11,11,0.72)` | Image scrims, modal backdrop |

### Light-band tokens

| Token | Hex | Role |
|-------|-----|------|
| `--paper` | `#F4EFE4` | Cream band background |
| `--paper-alt` | `#EDE6D8` | Raised surface on paper |
| `--ink` | `#1A1714` | Headings on paper |
| `--ink-soft` | `#574F46` | Body text on paper |
| `--ink-faint` | `#6F675E` | Metadata on paper |
| `--gold-ink` | `#8A6524` | **Gold text on paper** — see the warning below |

### The gold trap

`--gold` (`#C9A465`) is calibrated for dark backgrounds, where it hits 8.4:1. **On paper it collapses to about 2:1** — far below the 4.5:1 needed for text. The reference mockup sets its cream-band eyebrows and arrow links in exactly this gold, so copying it directly would have shipped unreadable text on two of the five home-page sections.

`--gold-ink` (`#8A6524`) is the fix: a darker, warmer gold measuring ~4.6:1 on paper. **Any gold that must be read on a cream band uses `--gold-ink`.** Plain `--gold` remains correct for gold on dark, and for purely decorative marks.

### Contextual roles

Components never reference the raw palette. They read seven role tokens — `--surface`, `--heading`, `--body-text`, `--muted`, `--accent`, `--accent-text`, `--rule` — which default to the dark values. Adding `.band--light` to a section overrides those seven, and everything inside inverts correctly with no component-level changes.

This is what makes the alternating bands cheap: a section switches context by changing class, not by restyling its contents. It also removes the main risk of a two-surface design, which is a component that looks right in one band and illegible in the other.

The split between `--accent` (decorative) and `--accent-text` (must be readable) exists solely because of the gold trap above.

### Contrast (WCAG, against `--bg`)

| Pair | Ratio | Verdict |
|------|-------|---------|
| cream on bg | ~17:1 | AAA |
| text on bg | ~7.8:1 | AAA for body |
| gold on bg | ~8.4:1 | AAA |
| bg on gold (button label) | ~8.4:1 | AAA |
| text-faint on bg | ~4.9:1 | AA — *raised 23 Aug 2026 from #6E6862, which measured 3.6:1 and failed at the 11-13px sizes the footer uses it at* |

Both faint tokens were originally too light and failed AA at the small sizes they are actually used at — 11px footer column titles, 13px captions. They were raised on 23 Aug 2026 so every text token now passes on its own surface. The lesson is recorded rather than the exception: a token restricted by a written rule will eventually be used outside it, so the safer fix was to make the token itself safe.

### Contrast on paper (against `--paper`)

| Pair | Ratio | Verdict |
|------|-------|---------|
| ink on paper | ~15.8:1 | AAA |
| ink-soft on paper | ~7.1:1 | AAA for body |
| gold-ink on paper | ~4.6:1 | AA — use for all readable gold on cream |
| ink-faint on paper | ~4.9:1 | AA |
| **gold on paper** | **~2.0:1** | **Fails. Never use for text.** |

### Rules

- Gold is never a background for large areas — only for buttons and the 2px section rules.
- Never place gold text on `--bg-alt` at sizes below 14px; the warmth muddies at small scale.
- All full-bleed photography gets a scrim. No exceptions, or text lands on a face.

---

## 3. Typography

### Families

**Decided 23 Aug 2026: Cormorant Garamond for display, Manrope for everything else.**

| Role | Font | Fallback stack |
|------|------|----------------|
| Hero name, banner titles, section titles, timeline years, pull quotes | **Cormorant Garamond** (300, 400) | `'Cormorant Garamond', 'Times New Roman', serif` |
| Nav, buttons, labels, meta, body | **Manrope** (400, 500) | `Manrope, -apple-system, 'Segoe UI', Roboto, sans-serif` |

Manrope covers both body and small labels rather than splitting them across two sans faces. Two families, four files — a third would cost load time and gain nothing, since labels and body never sit close enough to need telling apart.

**Inter remains a drop-in alternative for body only.** It is the more neutral reading face, and the biography is the one page with sustained long-form text. If that page ever feels tiring, changing `--font-sans` is the entire fix. Manrope is the default because its slightly geometric warmth sits better against Cormorant, and consistency between labels and body is worth more than a marginal reading-comfort gain at this volume of text.

### Why this pairing, and why not the alternatives

**Cormorant Garamond wins the hero.** It is the closest free typeface to the mockup's headline — high stroke contrast, sharp serifs, generous proportions, unmistakably literary. At `clamp(3.5rem, 10vw, 9rem)` its fine hairlines are thick enough to render cleanly, and that refinement is exactly what makes the name look like a book jacket rather than a business card.

**But Cormorant must not go near small text on this site, and that is not a style opinion — it is a rendering problem.** Two effects compound:

1. Cormorant is a high-contrast face; its thin strokes are genuinely hairline-thin by design.
2. Light text on a dark background *optically thins* — a phenomenon called irradiation. The bright background bleeds into the letterform edges, and strokes read lighter than the same text would on white.

Put Cormorant at 12px uppercase in cream on `#0B0B0B` — which is exactly what the nav, buttons and labels are — and the hairlines fall to sub-pixel width. They shimmer during scroll, disappear entirely on standard-density displays, and go patchy in Windows' greyscale antialiasing. The site would look broken on a large share of visitors' screens, and it would look *fine* on the retina Mac it was designed on. That's the worst kind of bug.

**So the small text goes to Manrope**, uppercase at `0.18em` letter-spacing. This is a deliberate editorial pairing, not a compromise: a literary serif for the voice, a clean modern sans for the furniture. At 12px with wide tracking the two are barely distinguishable anyway — letter-spaced caps flatten most of a typeface's personality — so you keep all the elegance where it's visible and all the legibility where it's needed.

**Why not Playfair Display for everything?** Playfair is the safer single-family answer — higher x-height, sturdier strokes, survives small sizes. But it is noticeably heavier and more Victorian, and at hero size it reads closer to a magazine masthead than a book jacket. Given that Manrope is handling the small text regardless, Cormorant's fragility stops being a liability and its refinement is pure gain. Playfair remains the fallback if you see the hero rendered and find Cormorant too delicate.

**Loading:** four files total — Cormorant Garamond 300/400, Manrope 400/500 — each with the **`latin-ext` subset**. Without `latin-ext`, Spanish `ñ` and French `ç`/`œ` fall back to a different face mid-word. Use `font-display: swap`, self-host or preconnect, and preload only the Cormorant weight used by the hero.

### Scale

| Style | Size | Line height | Letter-spacing | Transform |
|-------|------|-------------|----------------|-----------|
| Hero name | `clamp(3.5rem, 10vw, 9rem)` | 0.92 | `0.02em` | uppercase |
| Page banner title | `clamp(2.25rem, 6vw, 4rem)` | 1.0 | `0.04em` | uppercase |
| Section title (H2) | `clamp(1.5rem, 2.6vw, 2rem)` | 1.15 | `0.06em` | uppercase |
| Card title (H3) | `1.25rem` | 1.3 | `0.02em` | none |
| Keyword line | `0.9375rem` | 1.4 | `0.22em` | uppercase |
| Body | `1.0625rem` | 1.7 | `0` | none |
| Body large (intro) | `1.1875rem` | 1.65 | `0` | none |
| Nav item | `0.75rem` | 1 | `0.18em` | uppercase |
| Button label | `0.75rem` | 1 | `0.18em` | uppercase |
| Meta / caption | `0.8125rem` | 1.5 | `0.1em` | uppercase |

**Family per row:** hero name, page banner title, section title, pull quote and timeline year are **Cormorant Garamond**. Everything else — card titles, keyword line, body, nav, buttons, meta — is **Manrope**. The dividing line is roughly 32px: above it, serif; below it, sans.

Body copy maxes out at **68 characters per line** (`max-width: 34em`). The bio page is the only place with long-form reading and it must not run edge to edge.

---

## 4. Layout

- **Container:** `max-width: 1440px`, centered.
- **Gutters:** 20px mobile → 32px tablet → 64px desktop → 80px at ≥1440px.
- **Grid:** 12 columns, 24px gap desktop / 16px mobile.
- **Vertical rhythm:** sections are `120px` tall in padding on desktop, `80px` tablet, `56px` mobile. The hero is the exception at `100vh` (use `100dvh` so mobile browser chrome doesn't crop the scroll indicator).
- **Spacing scale (4px base):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 120, 160.

### Breakpoints

| Name | Width | Layout shift |
|------|-------|--------------|
| `sm` | 480px | Single column, social rail hidden |
| `md` | 768px | Two-column bands, hamburger nav still on |
| `lg` | 1024px | **Full nav appears (EN only — see §9)**, three-column band |
| `xl` | 1280px | Full nav all languages, social rail appears |
| `2xl` | 1536px | Container caps, gutters grow |

---

## 5. Components

### Button — primary
Gold fill `--gold`, label in `--bg`, padding `18px 32px`, **square corners** (radius 0 — the mockup has no rounding anywhere and it's part of the character), label style per §3.
- **Hover:** background `--gold-bright`, `translateY(-1px)`, 180ms ease-out.
- **Focus-visible:** 2px `--cream` outline at 3px offset.
- **Active:** `translateY(0)`, background `--gold-dim`.

### Button — ghost
Transparent, 1px `--border-strong`, label `--cream`, same padding and label style.
- **Hover:** border `--gold`, label `--gold`.

### Arrow link
Uppercase gold label + `→` set 8px after it.
- **Hover:** arrow translates `6px` right, 200ms ease-out. Label does not move.
- This is the site's most-repeated interaction. It must feel identical everywhere.

### Section title
Uppercase heading, then a **2px × 48px gold rule** 16px beneath it, left-aligned to the heading. Centered variant only in the newsletter bar.

### Book card
Cover image (2:3 ratio), title, year in `--text-faint`, one-line synopsis, arrow link.
- **Hover:** cover scales `1.0 → 1.04` over 400ms, a soft gold glow (`0 0 40px rgba(201,164,101,0.18)`) fades in behind it. Card background lifts to `--bg-raised`.
- Covers keep their own artwork colors — they are the one place besides the hero where color is allowed.

### Video card
16:9 thumbnail, centered play triangle in a 56px circle with `--overlay` behind it, title below, channel + date in meta style.
- **Hover:** play circle fills `--gold` with a `--bg` triangle; thumbnail brightens from 85% to 100%.
- **Click:** opens `VideoModal`. The YouTube iframe is created at that moment and never before.

### Timeline item
Year in gold display type, 1px vertical rule running the column, an 8px gold dot on the rule, content offset 32px right.
- Rule stops at the last dot — it never dangles past the final entry.

### Newsletter bar
Full-width `--bg-alt` band. Envelope icon, heading, then input + button as one flush horizontal unit (no gap between them — they read as a single control). Input: transparent, 1px `--border-strong`, `--cream` text, `--text-faint` placeholder. GDPR line in meta style beneath, privacy link underlined in gold.
- Stacks vertically below `md`.

**Inline variant** (book detail pages): same input + button pairing, but no full-width band and no envelope icon. Sits in the right-hand column where a buy button would normally go, introduced by one line of copy — *"Be notified when this book is available."* Constrained to the column width, stacked rather than side by side. It should read as a quiet offer, not a marketing interruption: no box, no background fill, just the section rule above it and the field below.

### Language switcher
Boxed control top-right, showing the current locale + chevron: `FR ⌄`. Opens a 3-item dropdown.
- Items show **native names**: `Français`, `Español`, `English` — never flags. Flags represent countries, not languages, and there is no flag that correctly means "Spanish" for both Spain and Latin America.
- The current locale is marked with a gold dot, not by being hidden.
- Switching preserves the current page: `/es/libros` ↔ `/fr/livres` ↔ `/en/books`.

### Social rail — **removed 23 Aug 2026**

The first mockup had a fixed rail on the left edge; the second moves the social icons into the footer, and that is the version built. The reason is technical as well as editorial: a fixed rail floats above whatever band is behind it, so it would have to recolour itself as the page scrolls past cream sections — or go invisible on them. Footer placement removes the problem and declutters the hero. The spec below is kept only in case the rail is revived.

Fixed to the left edge, vertically centered, 24px icons in `--text`, 28px apart.
- **Hover:** icon turns `--gold`, scales 1.1.
- Hidden below `xl`. On mobile the same icons live in the footer.

### Header
Height 88px, transparent over the hero. After 80px of scroll: background `--bg` at 96% opacity with a `backdrop-filter: blur(8px)`, height shrinks to 68px, 240ms transition.
- Active nav item: `--cream` label with a 1px gold underline 6px below.
- Inactive: `--text`, hover to `--cream`.

---

## 6. Imagery

- **Hero portrait:** the only full-color image on the site *by default*. Anchored right, `object-position: center right`. A left-to-right gradient (`--bg` at 100% → transparent at 60% width) keeps the headline readable.
- **Author page sticky portrait — second exception, decided 24 Aug 2026 at the user's request.** Kept in color rather than converted to B&W. Everything else on that page (the two archive photographs) stays grayscale.
- **Everything else:** black and white. Apply `grayscale(100%)` plus `contrast(1.05)` so converted images don't go flat.
- **Ratios:** hero 16:9 minimum source; bio portraits 3:4; book covers 2:3; video thumbs 16:9; banners 21:9.
- **Scrims:** every image carrying text gets `--overlay` or a gradient. Test with the *lightest* photo in the set, not the darkest.
- **Loading:** hero eager and `priority`; everything else lazy with a `--bg-alt` placeholder block, never a spinner.

---

## 7. Motion

| Interaction | Change | Duration | Easing |
|-------------|--------|----------|--------|
| Scroll reveal | opacity 0→1, `translateY(20px→0)` | 600ms | `cubic-bezier(0.16,1,0.3,1)` |
| Arrow link | arrow `translateX(6px)` | 200ms | ease-out |
| Image hover | `scale(1.04)` | 400ms | ease-out |
| Button hover | color + `translateY(-1px)` | 180ms | ease-out |
| Header compress | height + background | 240ms | ease |
| Modal open | backdrop fade + content `scale(0.98→1)` | 260ms | ease-out |
| Scroll cue | arrow bobs 6px, loop | 1800ms | ease-in-out |

Reveals stagger by **80ms** between siblings, capped at 4 items — beyond that the last card arrives late enough to feel broken.

**`prefers-reduced-motion: reduce` kills all of it.** Content appears at full opacity immediately; hovers become instant color changes only. This is not optional.

---

## 8. Accessibility

- Every interactive element has a visible `focus-visible` ring: 2px `--cream`, 3px offset. Never `outline: none` without a replacement.
- Focus order follows visual order. The language dropdown is keyboard-operable (arrows, Enter, Escape).
- The video modal traps focus, closes on Escape, and returns focus to the thumbnail that opened it.
- All images carry `alt` text **in the current locale** — alt text is content and needs translating like everything else. Decorative images get `alt=""`.
- `<html lang>` is set per locale. Screen readers pronounce the page wrong without it.
- Icon-only controls (social rail, carousel arrows, play buttons) need `aria-label`s, translated.
- Body text never drops below 16px. The keyword line and nav sit at 12–15px but are uppercase labels, not reading text.
- Target size: 44×44px minimum for anything tappable, including the small social icons.

---

## 9. Designing for three languages

The layout must survive text that changes length by 25%.

- **Never fix a button's width.** `DISCOVER HIS STORY` / `DÉCOUVRIR SON HISTOIRE` / `DESCUBRIR SU HISTORIA` differ by ~30%. Buttons hug their content; the two hero buttons wrap to a second row rather than shrinking their padding.
- **The nav breakpoint is per-locale.** With `0.18em` letter-spacing, five Spanish items (`INICIO EL AUTOR LIBROS VÍDEOS CONTACTO`) are meaningfully wider than five English ones. Show the full nav at `lg` for EN, but hold FR and ES on the hamburger until `xl`. Simplest robust version: use the hamburger below `xl` for all locales.
- **Hero name:** "GÉRARD FAURÉ" is identical in all three languages — the largest element on the site needs no localization at all. Convenient.
- **Accents need headroom.** `É` at hero size clips against a tight line-height. `0.92` was chosen with the accent already accounted for; don't lower it.
- **Spanish opens with `¿` and `¡`.** They must not be orphaned at a line end — worth a check on the contact form's helper text and any question in the copy.
- **Section titles wrap.** `A LIFE OUT OF THE ORDINARY` is one line in EN, two in FR (`UNE VIE HORS DU COMMUN`), two in ES. Reserve two lines of height in the three-column band so the columns' arrow links stay aligned across locales.
- **Dates and numbers localize.** `23/08/2026` (FR/ES) vs `August 23, 2026` (EN). Use the platform's locale formatter; don't hand-write date strings.

---

## 10. Do / Don't

| Do | Don't |
|----|-------|
| Let gold mark and point | Fill large areas with gold |
| Square corners everywhere | Add border-radius "to soften it" |
| Black-and-white photography | Mix color photos into the grids |
| One accent color, total | Introduce a second accent for "variety" |
| Wide letter-spacing on small caps | Letter-space body copy |
| Generous empty space | Fill gaps with borders, boxes, or texture |
| Fade and rise | Parallax, slide-ins, counters, typewriter effects |
| Native language names in the switcher | Flag icons |

---

## 11. Open design questions

1. ~~Cormorant Garamond or Playfair Display?~~ **Settled 23 Aug 2026** — Cormorant for display, Manrope for body and small text. See §3.
2. **Does the hero portrait stay in color?** Making it black-and-white too would be more severe and arguably stronger, but loses the mockup's focal warmth. I'd keep the color.
3. **The pull-quote section** is my addition, not in the mockup. Confirm you want it before it gets built.
4. **Language note on books (ES/EN locales only).** All books are French editions shown in all three languages, so the ES and EN book pages need a short "in French" note. Treatment options: a small outlined gold pill, or plain meta-style text under the title. I'd take the **meta-style text** — a gold pill draws the eye to a limitation, which is exactly backwards. Set it in `--text-faint` at meta size; present, findable, not shouting.
