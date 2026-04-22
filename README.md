# Coffee Personality Quiz — Basecamp Coffee

A live-recommender coffee quiz. Answer six short questions, land on one of 16 drinks from a full PNW craft-coffee menu, then tune your taste profile in real time to explore the full space.

Built as the Module 2 portfolio artifact of the [Claude Code for Everyone](https://ccforeveryone.com) course, extended well beyond the course default with a full product spec, a coverage-audited recommender, a custom design system, and documented production architecture notes.

## What it is

**The scenario:** Basecamp Coffee is a regional PNW chain with a struggling loyalty program. Program NPS collapsed from 34 → 12 in six months even while brand NPS held steady at 67—a classic "members still love the brand but actively dislike the program" pattern. Diagnosis from the research phase: the program has no personality. Members drift away indifferent.

**The fix:** a Coffee Personality Quiz that maps users to a drink archetype with an editable post-quiz taste profile. The quiz is the *cold-start* onboarding for a persistent profile, not a one-shot BuzzFeed quiz.

**How it works:**
1. Quiz → 6 questions (with one conditional follow-up) → derived facet state
2. Recommender → scores all 16 drinks against the facet state → picks a winner
3. Result surface → archetype + enriched drink card (bean, roast, notes) + session-scoped discount code + share CTAs
4. Taste profile editor → user can mutate any facet, preview in a draft state, hit "Find my new ritual" to re-match
5. Discount code stays stable across re-matches and re-takes so the code itself acts as an analytics instrument (`code archetype` vs. `drink redeemed` = recommendation-accuracy signal)

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind 4** + a custom "Liquid Glass" design system (CSS custom properties in `globals.css`)
- **Pure-function recommender** (no framework coupling, fully testable)
- **Deterministic coverage audit** via `scripts/analyze-coverage.ts`—enumerates all 7,168 possible quiz paths and verifies all 16 drinks are reachable

## Running locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Architecture at a glance

Full spec lives in [`_design/REQUIREMENTS.md`](./_design/REQUIREMENTS.md)—vision, facet system, 16-drink menu, 16 archetypes, design tokens, known unknowns, production architecture notes, and the recommender coverage matrix.

Visual references (the canonical design for the quiz card + result surface):
- [`_design/style-preview-5-remix.html`](./_design/style-preview-5-remix.html)
- [`_design/result-preview-1.html`](./_design/result-preview-1.html)

Agent-facing context (for Claude Code/other AI tools working in this repo): [`CLAUDE.md`](./CLAUDE.md).

## The case-study research

All the research, advisor reviews, and sub-agent definitions that produced
this prototype live in [`_case-study/`](./_case-study/)—raw inherited corpus,
the synthesis docs, pressure-test output, and the agent configs. See
[`_case-study/README.md`](./_case-study/README.md) for a guided tour that
maps each folder to the beats of the deployed Case Study page.

## Coverage audit

```bash
npx tsx scripts/analyze-coverage.ts
```

Outputs the drink win-count distribution across all 7,168 quiz paths. Re-run anytime after changes to `lib/data/` or `lib/recommender.ts` to confirm no drink has been shadowed.

## Design decisions worth calling out

- **Pure recommender + editable taste profile.** The quiz and the editor both flow through the same pure function. Editor mutations don't thrash the result—a deliberate draft/commit split.
- **Discount code as an analytics instrument.** Session-locked, archetype-scoped—designed so that "code's archetype vs. drink purchased" yields a recommendation-accuracy signal in production.
- **Facet-space coverage audit caught a content gap late.** 3 drinks were initially unreachable via the quiz; fixed at the quiz layer (Q3 branching + Style refactor), not by tweaking scoring weights.
- **Obliqueness as a design principle.** Answer text never names the facet being probed. Ritual metaphors do the mapping.
- **Production architecture notes.** Every MVP shortcut is documented with the production architecture you'd swap in—copy-to-clipboard → order-flow integration; in-memory session → `sessionStorage` → server-minted codes; Web Share API fallback → dedicated social share targets with per-archetype OG cards.
