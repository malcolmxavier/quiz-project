# Basecamp Coffee — Loyalty Program Turnaround

## Who I Am

I'm the new manager at **Basecamp Coffee**, a 45-location regional coffee chain across the Pacific Northwest (Seattle, Portland, Boise). I was hired to tackle problems that have been piling up, and the most urgent one is a failing loyalty program called **Basecamp Rewards**.

Background on me: I'm a **Growth PM** by trade, so I naturally think in terms of acquisition, activation, retention, engagement loops, and experimentation. When a product idea surfaces, my next instinct is always "how do we get people into it?" — meet that instinct, don't cut it off.

## The Mission

Turn Basecamp Rewards around in **3 months**, or leadership will kill it.

- $40K has been invested (sunk cost — don't re-litigate it)
- CFO is skeptical and wants ROI
- CEO wants "innovation" but hasn't specified what that means
- Dana (Marketing Director, my manager) is supportive but under pressure from above

## The Problem

**The program has no personality. It's a transactional points tracker, and members don't engage because there's nothing to engage WITH.**

### The numbers

| Metric | 6 Months Ago | Now | Target | Trend |
|---|---|---|---|---|
| Signups | 1,850 | 4,120 (+123%) | 15,000 | ↑ but hollow |
| MAU | 1,200 | 480 (-60%) | 8,000 | ↓ catastrophic |
| 30-day retention | 45% | 27% | 60% | ↓ -40% |
| 90-day retention | 28% | 14% | — | ↓ halved |
| Days between visits | 4.2 | 10.4 (+148%) | — | ↓ disengaging |
| Cost per member | $8.50 | $14.50 (+71%) | <$11 | ↓ ugly unit econ |
| LTV | $47 | $29 (-38%) | — | ↓ |
| ROI | 1.8 | 0.5 | — | ↓ collapsing |
| Program NPS | 34 | 12 | 25+ | ↓ |
| Brand NPS | 67 | 67 | — | → stable ✅ |

**Most important insight:** Brand NPS is stable (67) while Program NPS collapsed (34 → 12). Customers still love Basecamp Coffee — they specifically dislike the loyalty program. This is an isolated program-design failure dragging down a healthy business.

### What's failing (and why)

- Members drift away **indifferent**, not angry — "fine but forgettable" is the dominant feedback
- Every failed campaign has a competitor who succeeded at the same mechanic (Starbucks Star Dash > Double Points Weekend; Dutch Bros stickers > Social Share; etc.)
- Customers are naming competitors by feature: *"Dutch Bros remembers my name. Starbucks at least has games."*
- Tiers (Trailblazer → Explorer → Summit) feel meaningless. 89% stuck at Trailblazer.
- The app is treated as a points viewer, not a utility — downloaded once, ignored

### Constraints

- No additional program budget (use what exists)
- Can update the mobile app (dev team has bandwidth)
- Can launch new campaigns/promotions
- Cannot change the fundamental points structure (legal/accounting)

## The Solution: Coffee Personality Quiz

**Three independent lines of evidence all converge on the same answer:**

1. **Member data** — members drift away indifferent; need a reason to re-engage
2. **Competitor analysis** — every winning competitor led with *identity*, then layered mechanics
3. **Customer feedback** — the question customers ask baristas most is *"What should I try?"* Nobody asks about points.
4. **Market whitespace** — "coffee self-knowledge / identity" is an unowned lane. Starbucks owns convenient, Dutch Bros owns fun, Peet's owns quality, Evergreen owns green, Roast & Co. owns craft. Basecamp can own *coffee identity*.

**The concept:** Quiz → archetype ("Espresso Explorer," "Midnight Wanderer") → matched drink recommendations → shareable identity artifact (pin, sticker) → barista recognition on return visit → new archetype unlocks.

The fix isn't more points. **The fix is personality.**

### Top 3 plays (in priority order)

1. **Coffee Personality / signature-drink discovery system** — quiz, taste profile, matched recs, shareable archetype. Medium effort, high ROI. Hits every failure mode at once.
2. **Barista memory & training program** — "regulars notebook" + Broista-style training. Low effort, no tech. Start Monday.
3. **Collectible identity markers** — pins / stickers / patches tied to the archetypes. Low-medium effort. Compounds with #1 and turns customers into walking ads.

### Exec's 90-day bar (this is the budget conversation)

- Pilot personality quiz + matched recs in **2 stores**, 60-day window, **$15K cap**
- Fund barista memory/training immediately (near-zero capex)
- **Success = hit ≥3 of 4:** MAU ≥800; 30-day retention ≥38%; cost-per-member <$11; program NPS >25
- Miss 2 of 4 → sunset the program, redirect spend to core brand

## Stakeholders

| Person / Group | Stance | What They Want |
|---|---|---|
| **Dana** (my manager, Marketing Director) | Supportive, under pressure | Wins she can show leadership |
| **CFO** | Skeptical | ROI, unit economics, a number to hang their hat on |
| **CEO** | Wants "innovation" | Something directionally bold they can tell the board |
| **Store Managers** | Frustrated with current program | Something baristas can actually talk about |
| **Baristas** | Already answering "what should I try?" all day | Tools that make real conversations easier |
| **Customers / Community** | "Fine but forgettable" | To feel seen, known, and part of something |

## Brand Voice (non-negotiable)

**We are:** Warm, authentic, community-focused. The local shop that knows your name.

**We are NOT:** Corporate, stiff, over-the-top excited (no ALL CAPS), preachy about sustainability, generic.

**Vocabulary:**
- Community (not customers)
- Baristas (not team members)
- Your local Basecamp (not our stores)
- Coffee ritual (not purchase behavior)
- Neighborhood (not market)

**Tone check:**
- ✅ "Your free drink is waiting! Pop in this week and we'll have it ready."
- ❌ "ALERT! You have a FREE REWARD! Don't miss out!"

## My Advisory Team (sub-agents in `.claude/agents/`)

When I ask for "advisor review" or similar, pull from:
- **(ಠ_ಠ) Exec** — ROI, unit economics, 90-day gate
- **(◠‿◠) Product Designer** — emotion, identity, UX, what members feel
- **(•‿•) Barista Lead** — ground truth, what customers actually say at the counter
- **growth-product-strategist** — my custom agent, growth lens (funnel, activation, loops)

## File Structure

```
cc4e-course/
├── company-context/       # background: scenario, program, brand voice
├── inherited-chaos/       # the mess: notes, CSV, feedback, competitor research, old campaigns
├── analysis/              # our synthesis + research outputs
│   └── comprehensive-research-synthesis.md    ← the key diagnosis doc
├── reviews/               # stakeholder review outputs
│   └── synthesis-feedback.md                  ← three advisors on the synthesis
├── organized/             # cleaned-up outputs
├── attachments/           # images, assets
├── templates/             # reusable doc templates
└── .claude/
    └── agents/            # my advisory sub-agents
```

## What's Been Done

- ✅ Explored inherited chaos, mapped the full landscape
- ✅ Synthesized member data, competitor research, customer feedback, and market whitespace into one diagnosis (`analysis/comprehensive-research-synthesis.md`)
- ✅ Pressure-tested the synthesis with three advisors (`reviews/synthesis-feedback.md`)
- ✅ Identified the Coffee Personality Quiz as the convergent solution
- ✅ Built out growth-product-strategist sub-agent for ongoing strategy reviews

## What's Next

- Build the Coffee Personality Quiz prototype (Module 2 of the course)
- Draft the pilot plan: 2 stores, 60 days, $15K, success criteria locked
- Draft the GTM / activation plan (acquisition channels, onboarding funnel, retention loop)
- Spin up the barista "regulars notebook" in parallel (no tech dependency)
