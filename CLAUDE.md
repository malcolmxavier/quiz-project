@AGENTS.md

# Coffee Personality Quiz — Basecamp Coffee

Portfolio build from the Claude Code for Everyone course (Module 2). A
live-recommender quiz that maps users to one of 16 drinks from a PNW craft-coffee
menu, with an editable post-quiz taste profile and a session-scoped discount code.

## Canonical spec

**[`_design/REQUIREMENTS.md`](./_design/REQUIREMENTS.md)** is the source of truth
for vision, facet system, menu, archetypes, design tokens, known unknowns, and
production architecture notes. Read that for the WHY behind decisions below.

## Core architecture

- **Pure recommender** (`lib/recommender.ts`). Given a full `FacetState`, returns
  `{ drink, archetype, enrichment }`. No React, no DOM, no network. Fully testable.
- **Two-state orchestration** (`app/page.tsx`):
  - `committedState` drives the *displayed* recommendation. Stable between
    explicit Apply / Re-take actions.
  - `draftState` is what the facet editor mutates. Doesn't affect the
    recommendation card until the user clicks **"Find my new ritual."**
- **Session-scoped discount code** (`lib/session.ts`). Minted once on the first
  quiz completion per pageview. Preserved across facet edits AND re-takes — it's
  an analytics instrument, not a marketing lever: `code archetype` vs. `drink
  actually redeemed` is the recommendation-accuracy signal.

## Where things live

```
app/
├── page.tsx                  # orchestrator (quiz ↔ result state)
├── layout.tsx                # fonts (Fraunces, Space Grotesk, JetBrains Mono)
├── globals.css               # design tokens + Liquid Glass primitive
└── components/
    ├── Quiz.tsx              # quiz flow; Q3 branching + dynamic progress
    ├── QuizQuestion.tsx      # single question renderer
    ├── Result.tsx            # hero + drink + gift + share + editor
    ├── FacetEditor.tsx       # reusable module; takes state + slots
    ├── Header.tsx
    └── ProgressBar.tsx

lib/
├── types.ts                  # FacetState, Drink, Archetype, Question, Answer
├── recommender.ts            # pure scoring function
├── session.ts                # discount code generator
└── data/
    ├── menu.ts               # 16 drinks + facet attributes
    ├── archetypes.ts         # 16 archetypes, 1-to-1 with drinks
    ├── questions.ts          # 6 main questions + Q3 follow-up branches
    └── mappings.ts           # flavor note → bean/leaf + default roast

scripts/
└── analyze-coverage.ts       # deterministic audit; run after data changes

_design/
├── REQUIREMENTS.md           # read first for product context
├── style-preview-5-remix.html   # canonical quiz card visual
└── result-preview-1.html        # canonical result surface visual
```

## Conventions to preserve

- **Recommender is pure.** Any scoring / data change → re-run
  `npx tsx scripts/analyze-coverage.ts` to verify all 16 drinks remain reachable
  and the distribution is reasonable. The audit matrix lives in
  `_design/REQUIREMENTS.md` under "Iterations — Lesson 2.3."
- **Obliqueness in quiz copy.** Answer text never names the facet being probed
  (*"Strength"*, *"Flavor"*, etc.). Prompts use ritual / sensory framing
  (*"Striking a match"*, *"Drawing a bath"*). This is deliberate — directly
  naming facets calibrates user answers and undermines the taste profile.
- **Design system is in `globals.css`.** Colors, typography, and the Liquid
  Glass primitive (`.glass`, `.answer-card`, `.section-divider`,
  `.progress-*`) are CSS custom properties + utility classes. Avoid inline
  hex codes in components.
- **`Drink.family` === `FacetState.style`** — same four-value enum:
  `espresso-based`, `brewed`, `cold-brewed`, `tea-based`. The user-facing editor
  relabels to **Espresso · Drip · Cold brew · Tea**; raw enum values stay internal.

## MVP scope — deliberately NOT here (production notes in REQUIREMENTS.md)

- No persistence (in-session only)
- No auth / user accounts
- No POS / order-flow integration (the "Copy code" CTA is a deliberate MVP
  shortcut; see REQUIREMENTS.md for the order-flow integration note)
- No analytics instrumentation yet (hooks documented for production)
- No bespoke illustrations (spec says skip for MVP)

## Dev commands

- `npm run dev` — dev server at `http://localhost:3000`
- `npm run build` — production build
- `npx tsx scripts/analyze-coverage.ts` — deterministic recommender coverage audit
