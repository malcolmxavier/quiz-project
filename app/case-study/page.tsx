import Link from 'next/link';
import type { ReactNode } from 'react';
import { SiteChrome } from '../components/SiteChrome';
import { Footer } from '../components/Footer';

export const metadata = {
  title: 'Case Study · Basecamp Coffee',
  description:
    'How I used Claude Code to diagnose a collapsing loyalty program and ship a working prototype — a Growth PM portfolio artifact.',
};

export default function CaseStudyPage() {
  return (
    <>
      <SiteChrome trackScroll />
      <main className="flex-1">
        <Hero />
        <hr className="section-divider" />
        <BeatSignal />
        <hr className="section-divider" />
        <BeatData />
        <hr className="section-divider" />
        <BeatTriangulation />
        <hr className="section-divider" />
        <BeatBet />
        <hr className="section-divider" />
        <BeatExperiment />
        <hr className="section-divider" />
        <BeatArtifact />
        <hr className="section-divider" />
        <BeatHowBuilt />
      </main>
      <Footer />
    </>
  );
}

// ─── Hero ────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="mx-auto max-w-[560px] px-7 pt-9 pb-6 md:max-w-[880px] md:px-10 md:pt-14 md:pb-8 lg:max-w-[1024px]">
      <p
        className="m-0 mb-3 text-[11px] uppercase tracking-[0.22em] text-[var(--gold)]"
        style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
      >
        Case Study
      </p>
      <h1 className="m-0 mb-6 md:mb-8 font-medium text-[54px] md:text-[72px] lg:text-[84px] leading-none tracking-[-0.035em] text-[var(--cream)]">
        Basecamp Rewards: A Turnaround
      </h1>
      <p
        className="m-0 text-[19px] md:text-[21px] leading-[1.4] tracking-[-0.005em] text-[var(--cream-muted)]"
        style={{ fontFamily: 'var(--font-fraunces), serif', fontStyle: 'italic' }}
      >
        This page is two things at once: a case study of a loyalty-program
        turnaround, and an exercise in using Claude Code as a thinking and
        build partner. The Basecamp Coffee scenario is the test material.{' '}
        <Link
          href="/"
          className="text-[var(--gold-bright)] underline decoration-[var(--gold)]/40 underline-offset-[5px] decoration-[1.5px] hover:decoration-[var(--gold)]"
        >
          The quiz in the nav
        </Link>{' '}
        is the prototype that came out of it. What follows is the story of how
        it got there.
      </p>
    </section>
  );
}

// ─── Beat 1 — The Signal ─────────────────────────────────────
function BeatSignal() {
  return (
    <Beat number="01" title="The Signal" claudeTag="file-tree exploration" headline="Brand healthy. Program on fire.">
      <Body>
        <p>
          The first number that told me what was actually broken: <Emph>Brand NPS 67, Program NPS 12.</Emph>{' '}
          Same customer base, same roasters — a 55-point gap between how people felt about Basecamp
          and how they felt about the rewards program.
        </p>
        <p>
          That divergence reframes the problem. If brand NPS had dropped with program NPS, this would
          be a brand crisis. It didn&apos;t. Customers still loved the coffee, the shops, the baristas. They
          specifically disliked the rewards program. An isolated program-design failure was dragging down
          a healthy business.
        </p>
      </Body>

      <StatRow>
        <Stat big="67" eyebrow="Brand NPS" caption="Basecamp Coffee overall. Stable across the decline window." />
        <Stat big="12" eyebrow="Program NPS" caption="Basecamp Rewards specifically. Down from 34 six months ago." />
      </StatRow>

      <ClaudeNote>
        First move: I pointed Claude at the <Code>inherited-chaos/</Code> directory and asked it
        to triage. Member data CSV, advisor emails, failed campaign post-mortems, customer feedback
        by month, competitor research — hundreds of pages from the outgoing manager. Claude built
        a mental map of the corpus; I asked it to highlight what was load-bearing. The NPS
        divergence surfaced from <Code>organized/feedback-synthesis.md</Code> almost immediately. Claude
        didn&apos;t pick the insight — it found the data point that let me pick it.
      </ClaudeNote>
    </Beat>
  );
}

// ─── Beat 2 — The Data ───────────────────────────────────────
function BeatData() {
  const rows: MetricRow[] = [
    { metric: 'Signups', was: '1,850', now: '4,120', target: '15,000', nowTone: 'muted' },
    { metric: 'MAU', was: '1,200', now: '480', target: '8,000', nowTone: 'down' },
    { metric: '30-day retention', was: '45%', now: '27%', target: '60%', nowTone: 'down' },
    { metric: 'Days between visits', was: '4.2', now: '10.4', target: '—', nowTone: 'down' },
    { metric: 'Cost per member', was: '$8.50', now: '$14.50', target: '< $11', nowTone: 'down' },
    { metric: 'LTV', was: '$47', now: '$29', target: '—', nowTone: 'down' },
    { metric: 'ROI', was: '1.8', now: '0.5', target: '—', nowTone: 'down' },
    { metric: 'Program NPS', was: '34', now: '12', target: '25+', nowTone: 'down' },
  ];

  return (
    <Beat number="02" title="The Data" claudeTag="data synthesis" headline="The signups were lying.">
      <Body>
        <p>Six months of metric movement. Three patterns mattered.</p>
      </Body>

      <div className="my-8 md:my-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <EvidenceCard eyebrow="Pattern 01" title="Hollow growth">
          Signups up 123%, MAU down 60%. That&apos;s not a growth curve — that&apos;s a leaky bucket
          with the tap turned up. Management pointed to signups as good news; it was the only number
          that didn&apos;t matter.
        </EvidenceCard>
        <EvidenceCard eyebrow="Pattern 02" title="Unit-econ inversion">
          LTV collapsed from $47 to $29 while cost-per-member climbed from $8.50 to $14.50. ROI went
          from 1.8 to 0.5. At the current slope, the program was one to two months from net-negative.
        </EvidenceCard>
        <EvidenceCard eyebrow="Pattern 03" title="Cadence rot">
          Average days between visits: 4.2 → 10.4. Cadence is the leading indicator; retention and
          LTV are lagging. Members who used to come in twice a week were coming in every other week.
          They weren&apos;t leaving angrily — they were forgetting.
        </EvidenceCard>
      </div>

      <MetricsTable rows={rows} />

      <ClaudeNote>
        I loaded the member-data CSV into context and asked Claude to extract what had actually moved.
        It surfaced the table above. I then asked it to separate <Emph>vanity metrics</Emph> from{' '}
        <Emph>load-bearing metrics</Emph> — what would a skeptical CFO say if I brought them the signup
        number alone? That reframe made the hollow-growth diagnosis unavoidable.
      </ClaudeNote>
    </Beat>
  );
}

// ─── Beat 3 — The Triangulation ──────────────────────────────
function BeatTriangulation() {
  return (
    <Beat
      number="03"
      title="The Triangulation"
      claudeTag="multi-agent review"
      headline="Four signals. One direction."
    >
      <Body>
        <p>
          When a system is failing, one bad signal is suggestive. Four independent signals
          pointing the same direction is a decision.
        </p>
      </Body>

      <EvidenceGrid>
        <EvidenceCard eyebrow="Signal 01" title="Member behavior">
          Cadence rotting, tier stagnation (89% stuck at Trailblazer), 23-second app sessions. Members
          weren&apos;t rage-quitting — they were drifting away indifferent. Worse than anger. It&apos;s{' '}
          <Emph>forgetting.</Emph>
        </EvidenceCard>
        <EvidenceCard eyebrow="Signal 02" title="Customer voice">
          &ldquo;Fine but forgettable&rdquo; showed up in customer feedback for three consecutive months.
          And: &ldquo;Your coffee has personality. Your rewards program doesn&apos;t.&rdquo;
        </EvidenceCard>
        <EvidenceCard eyebrow="Signal 03" title="Competitor-by-feature">
          Every failed Basecamp campaign had a competitor who won at the same mechanic. Double Points
          Weekend vs. Starbucks Star Dash. Social Share vs. Dutch Bros sticker culture. Pattern:
          winners led with <Emph>identity</Emph>, then layered mechanics.
        </EvidenceCard>
        <EvidenceCard eyebrow="Signal 04" title="Market whitespace">
          Starbucks owns <Emph>convenient</Emph>. Dutch Bros owns <Emph>fun</Emph>. Peet&apos;s owns{' '}
          <Emph>quality</Emph>. Roast &amp; Co. owns <Emph>craft</Emph>. Nobody in the PNW market owned{' '}
          <Emph>coffee identity</Emph>.
        </EvidenceCard>
      </EvidenceGrid>

      <Pullquote attribution="customer feedback, March">
        Dutch Bros remembers my name. Starbucks at least has games.
      </Pullquote>

      <ClaudeNote>
        I had Claude spin up three custom sub-agents: an <Emph>Exec</Emph> (ROI lens), a{' '}
        <Emph>Product Designer</Emph> (identity / emotion lens), a <Emph>Barista Lead</Emph> (ground-truth
        lens). Fed them the synthesis, asked for pressure-testing. They converged from different angles —
        Exec said &ldquo;numbers or kill it,&rdquo; Designer said &ldquo;identity vacuum, not loyalty
        problem,&rdquo; Barista said &ldquo;customers ask &lsquo;what should I try?&rsquo; ten times a day
        and we can&apos;t tell them.&rdquo; Then I built a fourth agent of my own: a{' '}
        <Emph>growth-product-strategist</Emph>, tuned for funnel / activation / retention-loop thinking.
        The three generalists told me whether the thesis held up from their angles; the growth agent stress-tested
        it as a growth play — does the quiz sit at the activation moment? does the archetype reveal close a
        retention loop? That&apos;s the lens that matters most in my day job, and codifying it as a reusable
        agent means I reach for it on the next project too. Output in <Code>reviews/synthesis-feedback.md</Code>.
        Cross-lens convergence is the difference between hunting confirmation and earning confidence.
      </ClaudeNote>

      <Pullquote attribution="Product Designer sub-agent">
        Basecamp doesn&apos;t have a loyalty problem. It has an identity vacuum.
      </Pullquote>
    </Beat>
  );
}

// ─── Beat 4 — The Bet ────────────────────────────────────────
function BeatBet() {
  return (
    <Beat number="04" title="The Bet" claudeTag="thinking partner" headline="Fix isn't more points. Fix is personality.">
      <Body>
        <p>
          The mechanics couldn&apos;t change — the points structure is legally locked (accounting
          reasons). That removed a tempting distraction. The question wasn&apos;t &ldquo;what mechanic
          should we invent?&rdquo; It was <Emph>what would make members want to come back independent
          of the mechanics?</Emph>
        </p>
        <p>
          <Emph>Hypothesis:</Emph> if we give members a coffee-identity artifact — an archetype they
          claim, a matched drink, something shareable — cadence recovers, retention follows, program NPS
          stops bleeding.
        </p>
        <p>
          That&apos;s testable. You can define what success looks like before you run it, which means
          you can define failure too. That&apos;s all I want from a bet — a thing that can be wrong.
        </p>
      </Body>

      <Pullquote attribution="Barista Lead sub-agent">
        People light up when we ask about their coffee preferences. The app doesn&apos;t capture any
        of that.
      </Pullquote>

      <ClaudeNote>
        The move from &ldquo;convergent evidence&rdquo; to &ldquo;specific hypothesis&rdquo; is where
        Claude earns its keep as a thinking partner. I iterated on what the evidence actually implied —
        not &ldquo;people want personality in general&rdquo; but specifically{' '}
        <Emph>a claimable archetype with a matched drink.</Emph> Decisions and open research questions
        went into project memory so I wouldn&apos;t re-litigate them tomorrow.
      </ClaudeNote>
    </Beat>
  );
}

// ─── Beat 5 — The Experiment ─────────────────────────────────
function BeatExperiment() {
  return (
    <Beat
      number="05"
      title="The Experiment"
      claudeTag="artifact drafting"
      headline="Bounded test. Explicit kill."
    >
      <Body>
        <p>The pilot:</p>
        <ul className="m-0 mb-6 pl-5 text-[17px] md:text-[19px] leading-[1.5] text-[var(--cream-muted)] list-disc marker:text-[var(--gold)]">
          <li><Emph>2 stores</Emph>, selected for representative member profiles</li>
          <li><Emph>60 days</Emph> of operation</li>
          <li><Emph>$15K capped spend</Emph>, including tech + comms</li>
          <li><Emph>3-of-4 success gate</Emph> — miss 2+ and we sunset the program</li>
        </ul>
        <p>
          A pilot without an explicit kill condition is a project, not an experiment. The kill
          condition is what makes it a test.
        </p>
      </Body>

      <SuccessGate>
        <GateCard metric="MAU" threshold="≥ 800" caption="from current 480" />
        <GateCard metric="30-day retention" threshold="≥ 38%" caption="from 27%" />
        <GateCard metric="Cost per member" threshold="< $11" caption="from $14.50" />
        <GateCard metric="Program NPS" threshold="> 25" caption="from 12" />
      </SuccessGate>

      <ClaudeNote>
        Claude drafted the pilot memo and the success-gate framing, stress-tested against the Exec
        sub-agent&apos;s &ldquo;show me a number&rdquo; critique, and tightened the kill conditions.
        The research debt — what we <Emph>don&apos;t</Emph> know but would need to validate post-pilot —
        lives in a memory file tagged &ldquo;known unknowns&rdquo; so it can&apos;t get lost.
      </ClaudeNote>
    </Beat>
  );
}

// ─── Beat 6 — The Artifact ───────────────────────────────────
function BeatArtifact() {
  return (
    <Beat
      number="06"
      title="The Artifact"
      claudeTag="claude code · build partner"
      claudeTagLiteral
      headline="The prototype is live."
    >
      <Body>
        <p>
          <Link
            href="/"
            className="text-[var(--gold-bright)] underline decoration-[var(--gold)]/40 underline-offset-[5px] decoration-[1.5px] hover:decoration-[var(--gold)]"
          >
            Take the quiz.
          </Link>{' '}
          Sixty seconds. It maps you to one of 16 archetypes, recommends a drink from the actual
          Basecamp menu, and mints a one-time discount code. The recommender is a pure function — facet
          state in, drink and archetype out. No AI call at runtime. The intelligence is in the facet
          system.
        </p>
        <p>
          <Emph>Deliberately not in the MVP:</Emph>
        </p>
        <ul className="m-0 mb-6 pl-5 text-[17px] md:text-[19px] leading-[1.5] text-[var(--cream-muted)] list-disc marker:text-[var(--gold)]">
          <li>Auth / user accounts (session-only)</li>
          <li>POS / order-flow integration (copy-code is an MVP shortcut)</li>
          <li>Analytics instrumentation (hooks documented, not wired)</li>
          <li>Persistence across sessions</li>
        </ul>
        <p>
          What you see is the prototype that answers <Emph>&ldquo;could a 60-second identity artifact
          drive a meaningful visit moment?&rdquo;</Emph> The production version wires the rest.
        </p>
        <p>
          A handful of design / growth / data / architecture decisions from the build are worth pulling
          up — short annotations on what we tried, what we chose, and what we gave up. Each one is
          present-tense enough to ship and future-minded enough to survive the production rewrite.
        </p>
      </Body>

      <IterationGrid>
        <IterationCard lens="Architecture" title="Pure recommender at runtime">
          Could have wired a model call per result — flexible, but expensive on latency, reliability,
          and cost. Chose a pure function in <Code>lib/recommender.ts</Code>: facet state in, drink and
          archetype out. Deterministic, zero-latency, testable. A coverage audit script verifies every
          one of the 16 drinks stays reachable after any scoring change.
        </IterationCard>
        <IterationCard lens="Architecture · Data" title="Facet mapping, not personality buckets">
          First instinct: map users directly to personality archetypes. The valid recommendation set
          is the actual menu, though — 16 real SKUs. Rewrote to decompose drinks into facets
          (temperature, strength, milk, sweetness, flavor, roast, style) and score. By construction,
          every archetype points at a drink a customer can order. Size is deliberately excluded.
        </IterationCard>
        <IterationCard lens="Design · Data" title="Oblique prompts, not direct facet questions">
          Early quiz asked &ldquo;how strong do you like your coffee?&rdquo; Users picked the category
          they thought they should, not the one they meant. Rewrote every prompt into sensory / ritual
          framing — <Emph>striking a match</Emph>, <Emph>drawing a bath</Emph>. Answer text never names
          the facet it probes. Lost some directness; gained honest taste signal.
        </IterationCard>
        <IterationCard lens="Architecture · UX" title="Committed vs. draft state">
          First cut updated the drink card live as the editor mutated. Too flickery — every toggle
          felt like the rug moving. Split state: <Code>committedState</Code> drives the displayed
          recommendation, <Code>draftState</Code> is what the editor mutates. The card re-computes
          only when the user hits &ldquo;Find my new ritual.&rdquo; Iteration, not chaos.
        </IterationCard>
        <IterationCard lens="Data · Growth" title="Session code as measurement">
          Initial draft re-minted the discount code on every Apply. That broke the instrument.
          Locked the code at first completion per pageview, preserved across edits AND re-takes. The
          real job: <Emph>(code archetype, drink actually redeemed)</Emph> is the recommendation-accuracy
          signal. An analytics lever masquerading as a marketing lever.
        </IterationCard>
        <IterationCard lens="Growth · UX" title="Editable profile, not one-shot">
          First cut ended at &ldquo;here&apos;s your drink, thanks.&rdquo; Added the editable taste
          profile as the MVP shape. A user who hits a wrong answer tweaks instead of re-taking; the
          quiz stops being a one-shot game and becomes a returnable utility. Sets up the cold-start
          pattern for a persistent profile in production.
        </IterationCard>
      </IterationGrid>

      <ClaudeNote>
        Next.js 16 app, built with Claude Code over a weekend. GitHub → Vercel on every push to{' '}
        <Code>main</Code>. Claude wrote most of the code; I wrote the spec, steered the architecture,
        reviewed diffs, and caught the half-dozen &ldquo;almost right&rdquo; decisions that matter.
        That ratio — human sets direction, Claude executes, human reviews — is what I think of as
        the PM-with-Claude workflow.
      </ClaudeNote>
    </Beat>
  );
}

// ─── Beat 7 — How This Was Built ─────────────────────────────
function BeatHowBuilt() {
  return (
    <Beat number="07" title="How This Was Built" headline="The Claude Code workflow.">
      <Body>
        <p>The harness features I leaned on, concretely:</p>
      </Body>

      <HarnessGrid>
        <HarnessFeature name="Project memory">
          A <Code>MEMORY.md</Code> index plus topic-scoped files (feedback rules, project state,
          references). Decisions and voice preferences persist across sessions. When I come back
          tomorrow, Claude already knows how I work.
        </HarnessFeature>
        <HarnessFeature name="Custom sub-agents">
          Three advisors (Exec / Product Designer / Barista Lead) plus a growth-product-strategist
          specialist. Invoke any for a lens-specific review without re-priming context.
        </HarnessFeature>
        <HarnessFeature name="Plan mode">
          For anything non-trivial. This very page was planned, reviewed, revised before a line of
          code was written. Plan mode forces alignment before commitment.
        </HarnessFeature>
        <HarnessFeature name="CLAUDE.md at the repo root">
          Durable working context — scenario, brand voice, stakeholders, what&apos;s been done, what&apos;s
          next. Claude reads it on every turn.
        </HarnessFeature>
        <HarnessFeature name="Skills and hooks">
          Recurring stuff: deploy, status, quick iterations. Less context switching, less re-explaining.
        </HarnessFeature>
        <HarnessFeature name="The human in the loop">
          Claude wrote the code and drafted the prose. I set direction, wrote the spec, caught the
          &ldquo;almost right&rdquo; calls, and owned the decisions. None of this works without that
          part.
        </HarnessFeature>
      </HarnessGrid>

      <Body>
        <p className="mt-8">
          These aren&apos;t novel tools on their own. The workflow is:{' '}
          <Emph>treat Claude like a smart junior who persists.</Emph> Give it durable context, lens
          specialization, and structured decision points. Then iterate fast, review everything, own
          the direction.
        </p>
        <p>
          Recursive detail: this case study was planned in plan mode, revised after my first draft
          missed the meta-frame entirely, written in ~500 lines of TSX with Claude doing the heavy
          typing, and shipped via a push to <Code>main</Code>. End-to-end, maybe two hours. That&apos;s the
          unlock.
        </p>
      </Body>
    </Beat>
  );
}

// ─────────────────────────────────────────────────────────────
// Composable primitives (in-file; specific to this page)
// ─────────────────────────────────────────────────────────────

interface BeatProps {
  number: string;
  title: string;
  headline: string;
  claudeTag?: string;
  /** When true, render the claudeTag string literally without the `claude · ` prefix. */
  claudeTagLiteral?: boolean;
  children: ReactNode;
}

function Beat({ number, title, headline, claudeTag, claudeTagLiteral, children }: BeatProps) {
  return (
    <section className="mx-auto max-w-[560px] px-7 pt-6 pb-6 md:max-w-[880px] md:px-10 md:pt-9 md:pb-9 lg:max-w-[1024px]">
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-6 mb-5 md:mb-6">
        <p
          className="m-0 text-[11px] uppercase tracking-[0.22em] text-[var(--gold)]"
          style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
        >
          {number} · {title}
        </p>
        {claudeTag && (
          <p
            className="m-0 text-[11px] uppercase tracking-[0.22em] text-[var(--matcha-bright)]"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            {claudeTagLiteral ? claudeTag : `claude · ${claudeTag}`}
          </p>
        )}
      </div>
      <h2 className="m-0 mb-6 md:mb-8 font-medium text-[40px] md:text-[52px] lg:text-[60px] leading-[1.05] tracking-[-0.02em] text-[var(--cream)]">
        {headline}
      </h2>
      {children}
    </section>
  );
}

function Body({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 text-[17px] md:text-[19px] leading-[1.55] text-[var(--cream-muted)] [&>p]:m-0">
      {children}
    </div>
  );
}

function Emph({ children }: { children: ReactNode }) {
  return <span className="text-[var(--cream)] font-medium">{children}</span>;
}

function Code({ children }: { children: ReactNode }) {
  return (
    <code
      className="text-[14px] md:text-[15px] px-1.5 py-0.5 rounded-[6px] bg-[rgba(245,230,208,0.06)] text-[var(--cream)]"
      style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
    >
      {children}
    </code>
  );
}

function StatRow({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 md:my-10 grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  );
}

function Stat({ big, eyebrow, caption }: { big: string; eyebrow: string; caption: string }) {
  return (
    <div className="glass flex flex-col gap-2">
      <p
        className="m-0 text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]"
        style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
      >
        {eyebrow}
      </p>
      <p className="m-0 text-[56px] md:text-[68px] lg:text-[80px] font-medium leading-none tracking-[-0.03em] text-[var(--gold-bright)]">
        {big}
      </p>
      <p className="m-0 text-[14px] leading-[1.5] text-[var(--cream-muted)]">{caption}</p>
    </div>
  );
}

function ClaudeNote({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 md:my-10 pl-4 md:pl-5 border-l-[2px] border-[var(--matcha-deep)]">
      <p
        className="m-0 mb-2 text-[10px] uppercase tracking-[0.22em] text-[var(--matcha-bright)]"
        style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
      >
        How I used Claude
      </p>
      <p className="m-0 text-[15px] md:text-[16px] leading-[1.55] text-[var(--cream-muted)]">{children}</p>
    </div>
  );
}

function Pullquote({ children, attribution }: { children: ReactNode; attribution: string }) {
  return (
    <figure className="my-10 md:my-12 max-w-[720px] pl-5 md:pl-6 border-l-[2px] border-[var(--gold)]/40">
      <blockquote
        className="m-0 text-[22px] md:text-[28px] leading-[1.3] tracking-[-0.005em] text-[var(--cream)]"
        style={{ fontFamily: 'var(--font-fraunces), serif', fontStyle: 'italic' }}
      >
        &ldquo;{children}&rdquo;
      </blockquote>
      <figcaption
        className="mt-3 text-[11px] uppercase tracking-[0.22em] text-[var(--cream-dim)]"
        style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
      >
        — {attribution}
      </figcaption>
    </figure>
  );
}

function EvidenceGrid({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 md:my-10 grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  );
}

function EvidenceCard({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <div className="glass flex flex-col gap-2">
      <p
        className="m-0 text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]"
        style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
      >
        {eyebrow}
      </p>
      <h3 className="m-0 text-[20px] font-semibold leading-[1.1] tracking-[-0.01em] text-[var(--cream)]">
        {title}
      </h3>
      <p className="m-0 text-[15px] leading-[1.5] text-[var(--cream-muted)]">{children}</p>
    </div>
  );
}

interface MetricRow {
  metric: string;
  was: string;
  now: string;
  target: string;
  nowTone?: 'down' | 'muted';
}

function MetricsTable({ rows }: { rows: MetricRow[] }) {
  return (
    <div className="my-8 md:my-10">
      {/* Tablet + desktop — proper table grid */}
      <div className="hidden md:block">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 pb-3 border-b border-[var(--line)]">
          <p className="m-0 text-[10px] uppercase tracking-[0.22em] text-[var(--cream-dim)]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>Metric</p>
          <p className="m-0 text-right text-[10px] uppercase tracking-[0.22em] text-[var(--cream-dim)]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>6mo ago</p>
          <p className="m-0 text-right text-[10px] uppercase tracking-[0.22em] text-[var(--cream-dim)]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>Now</p>
          <p className="m-0 text-right text-[10px] uppercase tracking-[0.22em] text-[var(--cream-dim)]" style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}>Target</p>
        </div>
        {rows.map((row) => (
          <div
            key={row.metric}
            className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-4 py-3 border-b border-[var(--line)] last:border-b-0"
          >
            <p className="m-0 text-[15px] text-[var(--cream)]">{row.metric}</p>
            <p className="m-0 text-right text-[15px] text-[var(--cream-dim)]">{row.was}</p>
            <p
              className={`m-0 text-right text-[15px] font-medium ${
                row.nowTone === 'down' ? 'text-[var(--cream)]' : 'text-[var(--cream-muted)]'
              }`}
            >
              {row.now}
            </p>
            <p className="m-0 text-right text-[15px] text-[var(--cream-muted)]">{row.target}</p>
          </div>
        ))}
      </div>

      {/* Mobile — stacked cards */}
      <div className="md:hidden flex flex-col gap-3">
        {rows.map((row) => (
          <div key={row.metric} className="px-4 py-3.5 rounded-xl border border-[var(--line)]">
            <p className="m-0 mb-2 text-[15px] font-medium text-[var(--cream)]">{row.metric}</p>
            <div className="grid grid-cols-3 gap-3">
              {(['was', 'now', 'target'] as const).map((k, i) => (
                <div key={k} className="flex flex-col gap-1">
                  <p
                    className="m-0 text-[9px] uppercase tracking-[0.18em] text-[var(--cream-dim)]"
                    style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                  >
                    {['6mo ago', 'Now', 'Target'][i]}
                  </p>
                  <p
                    className={`m-0 text-[14px] ${
                      k === 'now' ? 'font-medium text-[var(--cream)]' : 'text-[var(--cream-muted)]'
                    }`}
                  >
                    {row[k]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SuccessGate({ children }: { children: ReactNode }) {
  return <div className="my-8 md:my-10 grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>;
}

function GateCard({ metric, threshold, caption }: { metric: string; threshold: string; caption: string }) {
  return (
    <div className="glass flex flex-col gap-1.5">
      <p
        className="m-0 text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]"
        style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
      >
        {metric}
      </p>
      <p className="m-0 text-[32px] md:text-[36px] font-medium leading-none tracking-[-0.02em] text-[var(--cream)]">
        {threshold}
      </p>
      <p className="m-0 text-[13px] leading-[1.4] text-[var(--cream-dim)]">{caption}</p>
    </div>
  );
}

function HarnessGrid({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 md:my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{children}</div>
  );
}

function IterationGrid({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 md:my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{children}</div>
  );
}

function IterationCard({ lens, title, children }: { lens: string; title: string; children: ReactNode }) {
  return (
    <div className="glass flex flex-col gap-2">
      <p
        className="m-0 text-[10px] uppercase tracking-[0.22em] text-[var(--matcha-bright)]"
        style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
      >
        {lens}
      </p>
      <h3 className="m-0 text-[20px] font-semibold leading-[1.1] tracking-[-0.01em] text-[var(--cream)]">
        {title}
      </h3>
      <p className="m-0 text-[15px] leading-[1.5] text-[var(--cream-muted)]">{children}</p>
    </div>
  );
}

function HarnessFeature({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2 p-5 rounded-xl border border-[var(--line)] bg-[rgba(255,255,255,0.02)]">
      <h3 className="m-0 text-[16px] font-semibold leading-[1.2] text-[var(--cream)]">{name}</h3>
      <p className="m-0 text-[14px] leading-[1.55] text-[var(--cream-muted)]">{children}</p>
    </div>
  );
}
