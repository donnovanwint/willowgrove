# Willow Grove SDA Church — Research & Design Notes

## 1. What the old site contained (recovered from the Wayback Machine)

Snapshots exist from Feb 2025 – Feb 2026 (WordPress, Twenty Twenty-Five default theme + Spectra blocks). A May 2024 capture is only a parked-domain redirect. Only the homepage and Contact page were archived; `/beliefs`, `/history`, `/pathfinders`, `/sabbath-school` were never captured.

| Item | Recovered value |
|---|---|
| Name | Willow Grove SDA Church |
| Tagline | "A Community of Faith, Hope, and Love – Growing Together in Christ." |
| Service | Saturdays @ 11:00 am |
| Address | 1576 Fairview Ave, Willow Grove, PA 19090 |
| Phone | (215) 657-8364 |
| Nav | Beliefs · History · Pathfinders · Sabbath School · Contact Us |
| Ministries | Feeding Ministry (Community Services), Prison Ministry (Matt 25 quote), Adventist Giving |
| Giving | https://adventistgiving.org/donate/ANB4LG |
| Contact | Form: first name, last name, email, message + embedded Google Map |
| Logo | Black "W✝G" monogram (cross forms the middle of the W/G) — `assets/img/logo-original.png` |
| Photos | adventist_giving, feeding_ministry, Prison_ministry (not recovered; placeholders used) |

**Old-site problems:** default WP theme, no hero imagery, no visitor path, no events, no sermons, no clear CTA, black-on-white logo with no brand color, "Blog/Authors/Patterns/Themes" template junk in the footer, no social proof, no mobile-first design.

**Not recoverable / needs confirmation from the church:** pastor and staff names, Sabbath School time, Pathfinders schedule, social links, real photos, email, 28-beliefs copy. All of these are clearly marked as placeholders in the build.

## 2. Reference site review

### northsda.church — "It's only North from here"
**Doing well**
- "New here? Take your next step" utility bar — the visitor is the priority.
- Service time + location in the hero, no scrolling needed.
- Two CTAs only (Plan Your Visit / Watch Live) repeated consistently.
- Quick-info strip (When / Where / Online) right under the hero.
- "Start Here" 3-card path matching visitor intent (visit / watch / find your place).
- **"Before You Arrive" FAQ** (parking, transit, dress, kids) — removes first-visit anxiety.
- Strong brand voice and a closing CTA band.

**Weak**
- All-caps headings everywhere; shouty and slower to read.
- Contradictory hours in footer vs. hero; inconsistent link targets ("Plan Your Visit" → two destinations).
- Nav repeats Watch Live / Give several times (clutter).
- Images lack alt text; thin on worship style, people, testimonies, real stories.
- No social proof; no sermon/media preview on the home page.

### germantownsdachurch.com — "IGNITE Revival"
**Doing well**
- One cohesive campaign story with a memorable motif ("Carry the Fire").
- Specific details: dates, times, ages, costs, deadlines.
- Multiple ways in (in person, Zoom, phone, playlists); inclusive alternatives (non-food fast).
- Event/ministry cards with a consistent card pattern.

**Weak**
- Campaign takeover buries the church itself; a first-time visitor can't tell who/when/where.
- Critical info (schedule, speakers) baked into images — inaccessible, unsearchable.
- Over-stuffed nav (10+ items). Dead/unlinked items (Giving, Volunteer, Benevolence).
- Stale footer (© 2024), typos in newsletter prompt, duplicate sections, speaker photos with no names.
- Unattributed phone/passcode dumped in page copy; dense, text-heavy.

### Takeaways applied to Willow Grove
1. Keep northsda's visitor-first IA, drop the all-caps and contradictions.
2. Keep Germantown's specificity and campaign energy, but as a *featured event card*, never a takeover.
3. Real text, never text-in-images. Alt text on everything. One source of truth for service time.
4. ≤ 6 nav items, 1 persistent primary CTA ("Plan a Visit").
5. Add what both lack: social proof / stories, live "Sabbath countdown," sermon preview, a young-adult hook, and a first-visit "what to expect" timeline.

## 3. Design principles synthesized (Apple HIG, Material 3, Stripe, Refactoring UI, Laws of UX)

- **Hierarchy through scale and weight, not decoration** (Apple/Stripe): oversized display type, tight tracking, one clear focal point per viewport.
- **One accent, used with intent** (Stripe): Royal Blue is the brand; white is the canvas; one warm "sunrise gold" micro-accent is used sparingly for energy only (badges, highlights) — young-adult vibrancy without diluting the blue/white identity.
- **Blue psychology:** trust, calm, stability, faith; gradients from deep navy → royal → electric create depth and a modern "tech-native" feel. White space = peace + clarity.
- **8-pt spacing grid, fluid type with `clamp()`**, 60–75ch measure for reading text.
- **Elevation & glass:** soft, layered, blue-tinted shadows; blur/glass only on nav and overlays.
- **Motion:** springy hover/press, scroll-reveal with `IntersectionObserver`, transform/opacity only, `prefers-reduced-motion` honored. Sub-100ms feedback.
- **Hick's Law:** few choices → one primary CTA per section.
- **Fitts's Law / thumb zone:** large tap targets (≥ 48px), sticky mobile "Plan a Visit" bar at bottom.
- **Jakob's Law:** familiar patterns (top nav, hero, cards, accordion FAQ) in a fresh skin.
- **Social proof + specificity + risk reversal** ("Come as you are", what-to-expect, kid info) drive visit conversion.
- **Von Restorff / Peak-End:** one standout hero and a strong closing CTA band.
- **Accessibility as baseline:** WCAG 2.1 AA contrast (white on `#1D4ED8`+ ≥ 4.5:1), visible focus rings, skip link, semantic landmarks, reduced motion.
- **Performance:** no framework, one CSS file, ~4KB JS, lazy images with explicit sizes, `font-display: swap`.

## 4. Brand system

| Token | Value | Use |
|---|---|---|
| `--royal-600` | `#1E4FD8` | primary / buttons (white text 6.2:1) |
| `--royal-700` | `#1740B0` | hover |
| `--royal-900` | `#0B1B4D` | deep navy surfaces |
| `--royal-50`  | `#EFF4FF` | tinted sections |
| `--electric`  | `#4C8DFF` | gradient highlight, on-dark accents |
| `--sun`       | `#FFC24B` | sparing warm accent |
| `--white`     | `#FFFFFF` | canvas |
| Display font  | **Bricolage Grotesque** (expressive, young) | headings |
| Body font     | **Inter** | UI + text |

Logo: original black monogram recolored via CSS mask (royal blue on light, white on dark) until a vector is supplied.

## 5. Sitemap
Home · Plan a Visit (what to expect + FAQ) · About (who we are, beliefs, history, leadership) · Ministries (Feeding, Prison, Pathfinders, Sabbath School, Young Adults) · Events · Watch (sermons/live) · Give · Contact.
