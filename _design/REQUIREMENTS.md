# Coffee Personality Quiz — Requirements

**Status:** Requirements-in-progress (Lesson 2.2).
**Remaining to spec:** visual style, images/icons decision.

---

## The Vision

Not a one-shot BuzzFeed quiz. The quiz is the **cold-start onboarding** for an editable, persistent **taste profile** the user owns.

**Flow:**
1. User takes quiz → answers derive a default facet profile → output is a drink recommendation + archetype framing
2. Post-result, user can **directly adjust any facet** in an editor panel
3. Recommendation re-computes in real time from the new facet state

**MVP scope:** State lives in-session only (in-memory, no persistence). Editable facet panel + real-time re-recommendation are **in scope for MVP**, not future work.

**Post-MVP:** Persist profile server-side, attach to Basecamp loyalty identity, feed retention loops.

---

## Architecture

- **Single source of truth:** a `facetState` object. The quiz populates it; the editor mutates it; the recommender reads it.
- **Pure recommender:** `facetState → rankedDrinks`. Not a quiz-answer lookup table.
- **Same function, both entry points.** Inputs must be structurally identical across quiz and editor — no per-surface branches.

---

## The Menu (16 drinks)

### Espresso drinks — hot by default; ★ iced available
1. Espresso
2. Macchiato
3. Cortado
4. Cappuccino
5. Latte ★
6. Mocha ★
7. Americano ★

### Brewed
8. Drip Coffee ★
9. Pour-Over (hot only)
10. Red Eye

### Cold-only
11. Cold Brew
12. Nitro Cold Brew

### Tea-based ★
13. Matcha Latte
14. Chai Latte

### Specialty
15. Affogato (hot dessert drink)
16. Cold Brew Tonic (cold only)

---

## Facets

### User-facing (quiz + editor)

| Facet | Options | Selection |
|---|---|---|
| **Coffee vs. non-coffee** | coffee / tea-based | single |
| **Temperature** | hot / iced | single |
| **Strength** | light / medium / bold / extra-bold | single |
| **Milk** | black / whole / 2% / oat / almond / soy | single |
| **Sweetness** | none / touch / sweet / indulgent | single |
| **Flavor note** | fruity / floral / chocolate / nutty / caramel / spicy / earthy | single (MVP) |
| **Roast / grade** | light / medium / dark | single; **editor only, not in quiz** |

> **Flavor note:** single-select everywhere in MVP (both quiz and editor) — keeps recommender inputs structurally identical across entry points. Multi-select is a post-MVP experiment, to be tested on the editor surface first before promoting to the quiz.
>
> **Roast / grade:** user-facing but quiz does NOT probe it. The quiz infers a sensible default from the flavor-note answer (see mapping below). Users who want to tune can adjust in the post-quiz editor. Respects "delightful cold start, not intake form."

### Backend / system-only (not user-facing)

| Attribute | Use |
|---|---|
| **Bean / leaf** (origin, varietal) | System-controlled. Like a real shop's "today's single-origin is Kenyan AA" — barista/system picks. Used to enrich recommendation output ("Kenyan AA pour-over, light roast, with fruity notes"). |

### Default mapping: flavor note → (bean family, default roast)

| Flavor | Bean/leaf family | Default roast |
|---|---|---|
| Fruity | East African single-origin (Ethiopian, Kenyan) | Light |
| Floral | East African washed process | Light |
| Chocolate | South American (Brazilian, Colombian) | Medium |
| Nutty | Central American blend / espresso blends | Medium |
| Caramel | South American / Central American | Medium–Dark |
| Spicy | Dark-roast blend or chai blend (if tea-based) | Dark |
| Earthy | Indonesian (Sumatran) / French roast | Dark |

User can override roast via editor; bean family follows flavor note automatically.

---

## Quiz (6 Questions)

Lifestyle-lean, oblique probes. Each question probes 1–2 facets. Roast is intentionally NOT probed.

### Q1. "Your coffee should wake you up like…" — *probes Strength*

| Answer | Maps to |
|---|---|
| A gentle nudge from a friend | Light |
| A good playlist | Medium |
| An alarm clock | Bold |
| A cold plunge | Extra-bold |

### Q2. "You're packing for a long weekend to…" — *probes Temperature*

| Answer | Maps to |
|---|---|
| Reykjavík in January | Hot |
| A cabin on the Olympic Peninsula, rain in the forecast | Hot |
| Palm Springs in July | Iced |
| A rooftop bar in Lisbon in August | Iced |

### Q3. "Step into a room. The air smells like…" — *probes Flavor note (rough)*

| Answer | Rough mapping |
|---|---|
| Citrus peel + white blossoms | Fruity / Floral |
| Warm cocoa + toasted almonds | Chocolate / Nutty |
| Cinnamon + caramelized sugar | Caramel / Spicy |
| Cedar, campfire, old leather | Earthy |

Editor lets user pick the exact note within the chosen pair; default in-quiz is the first of the pair (e.g., Fruity, Chocolate, Caramel, Earthy).

### Q4. "What's on the plate next to your drink?" — *probes Milk + allergen-aware*

| Answer | Safe for | Milk mapping |
|---|---|---|
| A square of 85% dark chocolate with almonds | No allergens OR vegan w/ nuts OK | Black (no milk) |
| A warm blueberry scone with butter | Nut allergy (dairy OK) | Whole / 2% |
| Almond butter on toast with banana | Vegan / dairy allergy (nuts OK) | Almond |
| Avocado toast on sourdough | Both allergies | Oat / Soy |

Each allergen profile has exactly one safe pick; editor resolves finer milk splits.

### Q5. "When you walk up to the counter, you…" — *probes Coffee vs. non-coffee*

| Answer | Maps to |
|---|---|
| Know exactly the coffee you want | Coffee |
| Try whatever today's single-origin is | Coffee |
| Have been deep in the matcha era lately | Tea-based |
| Always reach for the chai | Tea-based |

### Q6. "Sweet is…" — *probes Sweetness*

| Answer | Maps to |
|---|---|
| A flavor I earned — no thanks | None |
| A quiet accent, nothing loud | Touch |
| My happy place | Sweet |
| Dessert mode, activated | Indulgent |

### Coverage check

- Strength: Q1 ✓
- Temperature: Q2 ✓
- Flavor note: Q3 ✓ (rough)
- Milk: Q4 ✓ (rough, allergen-aware)
- Coffee vs. non-coffee: Q5 ✓
- Sweetness: Q6 ✓
- Roast: NOT probed (defaults from flavor note; editor-only)

---

## Visual Style (LOCKED)

**Direction:** Bold & Dark, elevated-craft aesthetic, with forest/pine green as secondary accent and Liquid Glass interaction surfaces. On-brand to Basecamp's guidelines (forest green, warm cream, natural wood tones) but scaled for dark mode and a "grown-up" loyalty-program relaunch.

**Tagline:** **"Find your ritual"** — positioned as a brand asset that fell out of the design work (works for the quiz, extends to broader brand application).

### Color tokens

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#120a06` | Primary background (deep espresso) |
| `--bg-2` | `#1f120b` | Secondary surface (not used with glass) |
| `--surface` | `#261610` | Elevated non-glass surfaces |
| `--cream` | `#f5e6d0` | Primary text |
| `--cream-muted` | `#c9b399` | Secondary text, tagline |
| `--gold` | `#d4a574` | Primary accent (coffee / interactive) |
| `--matcha` | `#009966` | Secondary accent (tea / "ritual" — 100% saturation pine) |
| `--matcha-deep` | `#00734d` | Deep variant |
| `--line` | `#3a241a` | Dividers |
| `--line-bright` | `#5a3a28` | Elevated dividers |

### Typography

| Face | Use |
|---|---|
| **Space Grotesk** (500/600/700) | Wordmark, primary headings, UI labels |
| **Fraunces italic** (400) | Tagline, answer text — the "personal/literary" voice |
| **JetBrains Mono** (400/500) | Metadata, question numbers, progress indicator |

### Surfaces — Liquid Glass

Answer cards and other interactive surfaces use a translucent glass treatment:

- Fill: `rgba(255,255,255,0.035)`, hover `0.065`
- Backdrop: `blur(22px) saturate(1.35)` (both `backdrop-filter` and `-webkit-backdrop-filter`)
- Border: `1px solid rgba(245,230,208,0.10)`, hover picks up gold `rgba(212,165,116,0.45)`
- Border radius: `22px`
- Inner highlight (top): `inset 0 1px 0 rgba(255,255,255,0.09)` — light pickup bevel
- Inner shadow (bottom): `inset 0 -1px 0 rgba(0,0,0,0.22)` — physical depth
- Drop shadow: `0 8px 24px -14px rgba(0,0,0,0.7)`
- Top sheen: thin pseudo-element gradient line at the very top edge
- Environmental color pickup on hover: subtle `gold → pine` gradient wash fades in from behind
- Hover lift: `translateY(-2px)`
- Transition: `cubic-bezier(.2,.8,.2,1)`, 300–350ms

### Gradient convention

Directional gradients run **gold (left) → pine (right)** — echoes the product's internal journey from coffee to tea/matcha. Used in:
- Progress bar
- Ambient body glows (gold glow bottom-left, pine glow top-right)
- Answer hover color-wash

### Canonical reference

`quiz-project/style-preview-5-remix.html` is the canonical visual spec — build phase references it directly.

### Brand-fit rationale (portfolio note)

- Stays inside the documented brand palette (forest green, warm cream, wood tones) — doesn't break brand equity.
- Evolves the *visual expression* for a relaunch moment: dark mode + glass surfaces signal that this is a modern, considered relaunch, not a redesign of the broader brand.
- Dual accents (gold + pine) carry the product's core duality (coffee + tea/matcha) visually, not just in copy.

---

## Result Display (TBD — next section)

Given the editable-profile architecture, the likely result surface is:

- **The archetype + drink recommendation** ("You're a Midnight Wanderer — try our Kenyan AA pour-over, light roast")
- **The enriched drink output**: base drink + bean/leaf + roast + milk + sweetness + flavor note
- **The editable facet panel** directly beneath — live re-recommendation on change
- Shareable archetype framing (pin/sticker/screenshot moment for the "artifact moment" from the research synthesis)

---

## Images & Icons (LOCKED)

- **Images:** skip for MVP. Brand guide calls for *"hand-drawn, organic illustrations, warm lighting"* — expensive to source well; stock would undermine the craft aesthetic. Plan bespoke illustrations post-MVP (ties into the "artifact moment" pins/stickers play from the research synthesis).
- **Icons on answer options:** skip. The mono numbers + italic serif text already carry the visual weight; icons/emoji would clutter the Liquid Glass aesthetic and pull against the literary voice.

## Archetypes (LOCKED for MVP)

**Naming system:** 1–3 words. Mostly adjective + noun. Some use "The" (identity-forward: "The Purist"), some don't (vibe-forward: "Warm Throws") — mixed rhythm avoids template-fatigue. Evocative, not literal — names hint at the drink without naming it. PNW-coded, craft-leaning. Grown-up, not twee. Screenshotable — each could live as a pin/sticker/profile badge (ties to the "artifact moment" from the research synthesis).

| # | Drink | Archetype | Who they are |
|---|---|---|---|
| 1 | Espresso | **The Purist** | Knows what they want before they walk in. No frills — just the shot, black and brilliant. |
| 2 | Macchiato | **The Margin Note** | Adds one small, perfect touch to everything. Quietly opinionated. |
| 3 | Cortado | **The Even Keel** | Thrives in balance. Equal parts, steady hands, steady taste. |
| 4 | Cappuccino | **The Old Soul** | Classics for a reason. Reads paper books. Knows the baristas by name. |
| 5 | Latte | **The Steady** | Reliable, warm, daily. The friend who shows up. |
| 6 | Mocha | **Warm Throws** | Comfort in a cup. Rainy afternoons, deep couches, chocolate that actually tastes like chocolate. |
| 7 | Americano | **The Long Walk** | Space to think. Wide open drinks, wide open hours. |
| 8 | Drip Coffee | **The Regular** | First one in, last to leave. The heartbeat of the shop. |
| 9 | Pour-Over | **The Ritualist** | Slow pours, careful counts, patient eyes. The drink is half the point; the moment is the other half. |
| 10 | Red Eye | **Second Wind** | Mission mode. Double-shot determination. Catches the sunrise on the way home sometimes. |
| 11 | Cold Brew | **The Slow Burn** | Quiet energy. Doesn't peak — just holds, all day long. |
| 12 | Nitro Cold Brew | **The Velvet** | Smooth before it's ordered. Creamy texture, cool confidence. |
| 13 | Cold Brew Tonic | **Sun Season** | Windows down, patio found. Citrusy, bubbly, a little unexpected. |
| 14 | Matcha Latte | **Still Water** | Grounded in ceremony. Mornings begin slow, green, and mindful. |
| 15 | Chai Latte | **Spice Keeper** | Warm-hearted, globally-rooted. Cardamom on their hands, stories in their bag. |
| 16 | Affogato | **Sweet Ceremony** | Dessert is a discipline. Special occasions on regular Tuesdays. |

## Known Unknowns — Post-MVP Validation

Decisions made on informed intuition that would get research validation before wide release in a real production context:

- **Archetype names and descriptors resonate with users.** Would validate via: unmoderated study or survey (e.g., UserTesting / Maze) — show users each archetype name + descriptor, ask (a) which one they'd pick as "them," (b) which one feels most/least flattering, (c) does the name feel "Basecamp." Target: ≥70% of respondents can self-identify with *at least one* archetype; no archetype scores as "off-brand" or "unflattering" with >20% of respondents.
- **Quiz question answer choices map correctly to facets.** Would validate via: 5–10 moderated interviews watching real users take the quiz and verbalize their thinking — are they picking answers for the reasons we assumed?
- **Flavor-note → bean/roast default mapping matches consumer mental models.** Would validate with: specialty coffee drinkers on unmoderated panel — does "chocolate" make them think "medium roast South American," or something else?
- **Taste-profile editor drives re-engagement** (the core retention hypothesis). Would validate via: in-product instrumentation + cohort analysis post-launch. Cold-start → revisit rate is the north-star metric.

## Result Surface (LAYOUT — to preview and lock)

Hybrid: mobile-first single column, framed like a dashboard. Data-dense enough that modern users (who think in data concepts) feel at home, narrative enough that the naming moment lands.

### Above-the-fold order
1. **Hero archetype** — big name + descriptor (the "naming moment")
2. **Drink card** — full enrichment (base drink + bean/leaf + roast + temp + milk + sweetness + flavor note). Treated as data display, not poster.
3. **Welcome gift / discount card** — session-scoped code, tied to the archetype
4. **Share** — copy link + share sheet
5. **Peek of facet editor** — section header + first facet row partially visible at the fold, signaling "more below"

### Below the fold
6. **Full facet editor** — all 7 facets as segmented controls. Live re-recommendation updates the hero as the user adjusts.

### Discount code spec

- **Format:** `RITUAL-{ARCHETYPE-SLUG}-{4-char-hash}` (e.g., `RITUAL-SLOWBURN-4K7P`)
- **MVP:** generated in-session, not persisted — fake for demo purposes. Production would mint real codes against a promo engine.
- **Portfolio rationale to capture in writeup:** real production codes would be shorter (POS-friendly), but this verbose format makes the data-mapping intent scannable at a glance — code ties to archetype, archetype ties to recommendation, enabling downstream analytics.
- **Offer:** "20% off your first drink — any drink, any location."
- **Why unrestricted (not limited to the recommended drink):** redemption data becomes a recommendation-accuracy signal. Match between code archetype and actual drink purchased = rec accuracy metric. Forcing the recommended drink would destroy that signal.

### Design notes

- Drink card uses a **labeled-row data display** (e.g., `BEAN · Brazilian Cerrado`) rather than prose — reinforces the dashboard framing and signals the rich editable state beneath.
- Discount card uses the same Liquid Glass treatment as the drink card for visual consistency, with a subtle accent difference to signal "action/gift" vs. "output/recommendation."
- Hero section uses a `min-height` that lets ~60–80px of the facet editor peek below the fold on most mobile viewports.

### Production architecture notes (portfolio — not in MVP scope)

These are notes for the portfolio writeup describing how this would extend in a real production context:

- **Every card's copy should be A/B-testable via staff controls.** The drink card, welcome-gift card, share CTA, and editor intro copy are all candidate surfaces for iterative optimization. Staff-facing CMS controls should expose copy variants + traffic allocation per card.
- **Facet editor is a reusable component** — lives on this quiz result page but *also* on the core user profile (post-auth). The quiz surface mounts it with a context-specific intro ("Not quite right?") — that intro copy is itself A/B-testable and should be injected based on host page (quiz result, profile settings, post-purchase prompt, etc.).
- **Implication for the build:** the editor should be structured as a pure UI component that takes (a) current facet state and (b) optional intro slot content as props, and emits facet-change events. This keeps the re-recommendation logic decoupled from the surrounding page context.
- **Redeem-friction / order-flow integration.** The current gift card ends with a "Copy" CTA — which *implies* the user must leave this surface and initiate an order elsewhere (walk-in, mobile app, separate online ordering flow). That's significant redemption friction and a core question for the production version. Considerations:
  - Direct route into an in-browser or in-app order flow would likely lift redemption rates substantially
  - Requires: POS / online-ordering API integration, session-scoped cart handoff (quiz session → cart session with code pre-applied), mobile deep-linking from web, analytics plumbing to measure funnel leakage at each handoff point
  - Copy-to-clipboard is the MVP fallback — portable across channels but leaves redemption on the user
  - Production A/B opportunity: "Copy Code" vs. "Claim at Checkout" (direct route) vs. "Add to Mobile Wallet" — measure activation + redemption rate per variant
- **Session-scoped discount code.** The code is minted on the user's *first* quiz completion within a pageview and stays stable for the rest of the session — across both Apply (facet edits → new archetype) AND Re-take-Quiz actions. The code's archetype slug preserves the user's ORIGINAL cold-start recommendation, which is the correct analytics surface: at redemption, we compare the code's archetype to the drink actually purchased, and the delta is the recommendation-accuracy signal. Constantly regenerating the code would destroy that signal and create an exploit where users refresh for "nicer" codes. Production considerations:
  - MVP holds sessionCode in React `useState` (scoped to the page load). In production, persist to `sessionStorage` so a refresh doesn't mint a new code within the same browser session.
  - Server-mint codes via a promo-engine API (with rate limiting and one-code-per-user enforcement against the identity graph) rather than client-generated — eliminates any client-side tampering surface.
  - Consider a TTL (e.g., 24h) on unused codes so analytics can distinguish "minted but never used" from "minted and redeemed later."
- **Share-ritual CTA should prioritize social channels.** The MVP uses `navigator.share()` (Web Share API), which opens the native share sheet on mobile — that naturally prioritizes social + messaging apps. On desktop, Web Share API support is spotty (Chrome only in specific contexts), so the MVP falls back to clipboard. For production:
  - Explicit social share targets as fallbacks on desktop (X, WhatsApp, Messenger, iMessage deeplink, LinkedIn) so social is the primary path, not clipboard
  - Pre-rendered OG / Twitter cards per archetype (16 variants) so shared links auto-expand into screenshotable cards in social feeds — directly honors the "artifact moment" from the research synthesis
  - Share analytics: capture which channel the user selected → feed into virality modeling (K-factor by archetype, by channel)
  - A/B test share copy variants — archetype name + descriptor makes excellent social copy and each phrasing should be measured

## Iterations — Lesson 2.3 (build phase)

Post-2.2 design changes that emerged during implementation + user review.

### Style facet (replaces `coffeeVsNon`)

- `coffeeVsNon` retired. New `style` facet has 4 values: **`espresso-based`**, **`brewed`**, **`cold-brewed`**, **`tea-based`**.
- Q5 reframed obliquely — *"Which ritual draws you in…"* with four ritual-flavored answers (*"The sharp pull of a shot"* / *"Water drawn slowly through grounds"* / *"An overnight steep"* / *"Leaves opening in hot water"*).
- Editor displays as "Style" with user-friendly labels: **Espresso · Drip · Cold brew · Tea** (raw enum values stay internal).
- **Reason:** The coffee-vs-tea binary was too coarse to differentiate Cold Brew / Nitro Cold Brew from Americano on iced preferences, leaving 3 drinks unreachable via the quiz. Style subsumes the binary while adding the brewing-method signal the recommender needed.

### Q3 branching

- Q3's first three answers each carry a two-flavor sensation (citrus+blossoms, cocoa+almonds, cinnamon+caramel). Each now branches into a follow-up question to disambiguate.
- Follow-up prompt is **generic and pair-agnostic** — *"Which half of that pulls you in?"* — with two abstract answers (**"The bolder side"** / **"The softer side"**) that map to the specific flavor per pair.
- Quiz total length is dynamic: **6** main questions, or **7** if any Q3 follow-up triggers.
- Header question counter removed to avoid visual jump when the total changes in-flight. Progress bar alone signals progress and rebalances when a follow-up is added.
- **Chapter labels** (e.g., "Strength," "Flavor") are **not rendered** in the UI — naming the facet being probed risks oversteering the user's answer. `chapter` remains on the Question data model for internal analytics.

### Family relabels

- **Affogato**: `specialty` → `espresso-based` (ice cream is an addition; espresso is the preparation base).
- **Cold Brew Tonic**: `specialty` → `cold-brewed` (tonic is an addition; cold brew is the preparation base).
- `specialty` as a preparation-method family retired entirely. It remains a valid *menu marketing* concept (seasonals, limited releases) but is not a recommender input.

### Recommender coverage matrix

Verified via deterministic audit (`scripts/analyze-coverage.ts`) across **all 7,168 possible quiz paths** (4 × 4 × 7 × 4 × 4 × 4, where the 7 Q3 outcomes come from 3 branched answers yielding 2 follow-up options each + 1 direct answer).

| Drink | Win count | Share |
|---|---:|---:|
| Drip Coffee | 1,544 | 21.5% |
| Matcha Latte | 1,056 | 14.7% |
| Cold Brew | 792 | 11.0% |
| Chai Latte | 736 | 10.3% |
| Nitro Cold Brew | 680 | 9.5% |
| Latte | 566 | 7.9% |
| Americano | 388 | 5.4% |
| Mocha | 372 | 5.2% |
| Cold Brew Tonic | 320 | 4.5% |
| Cortado | 198 | 2.8% |
| Espresso | 154 | 2.1% |
| Red Eye | 148 | 2.1% |
| Pour-Over | 100 | 1.4% |
| Cappuccino | 72 | 1.0% |
| Macchiato | 24 | 0.3% |
| Affogato | 18 | 0.3% |

**All 16 drinks reachable via at least one quiz path.** Re-run anytime with `npx tsx scripts/analyze-coverage.ts` to validate invariants after data changes.

**Distribution observations (portfolio + future analytics):**
- Drip Coffee leads at 21.5% — versatile across facet combinations; functionally the "default fallback." Worth A/B-testing whether this is desirable or whether more combinations should route to specialty drinks.
- Tea drinks (Matcha + Chai) combined = 25% of all quiz paths. Style's 4-way split allocates 25% to `tea-based`, but the tea side of the menu has only 2 SKUs so each individual tea drink wins more often than the 14 coffee-side SKUs.
- Niche drinks (Macchiato, Affogato) land at <0.5% each — reachable but narrow. These are expected to be rare via the quiz and are designed to be primary via the editor.
- **Production experimentation hook:** the quiz can be instrumented to capture which path each user took + which drink won + whether they redeemed the archetype's code for that drink or a different one. That's the rec-accuracy feedback loop proposed in the discount-code-as-analytics-instrument note. The audit matrix is the ground-truth distribution to A/B against.

## Still Open

- Result surface preview lock
