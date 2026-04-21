import Image from 'next/image';
import { SiteChrome } from '../components/SiteChrome';
import { Footer } from '../components/Footer';

export const metadata = {
  title: 'About · Basecamp Coffee',
  description: 'The story behind Basecamp Coffee.',
};

export default function AboutPage() {
  return (
    <>
      <SiteChrome />
      <div className="flex-1">
        <section className="mx-auto max-w-[560px] px-7 pt-9 pb-12 md:max-w-[880px] md:px-10 md:pt-12 md:pb-20 lg:max-w-[1024px]">
          <h1 className="m-0 mb-8 md:mb-10 font-medium text-[54px] md:text-[72px] lg:text-[84px] leading-none tracking-[-0.035em] text-[var(--cream)]">
            About
          </h1>

          <div className="md:grid md:grid-cols-[280px_1fr] md:gap-10 lg:grid-cols-[320px_1fr] lg:gap-12 md:items-start">
            {/* Portrait */}
            <div className="mb-8 md:mb-0 aspect-square w-full max-w-[280px] md:max-w-none rounded-[24px] overflow-hidden border border-[rgba(245,230,208,0.12)] relative">
              <Image
                src="/malcolm-headshot.jpg"
                alt="Malcolm Xavier"
                fill
                priority
                sizes="(min-width: 1024px) 320px, (min-width: 768px) 280px, 280px"
                className="object-cover scale-[1.35]"
                style={{ objectPosition: '50% 18%' }}
              />
            </div>

            {/* Body + links */}
            <div>
              {/* Mobile: stacked list with coffee-cup bullets */}
              <ul
                className="md:hidden m-0 mb-6 p-0 list-none space-y-2.5"
                style={{ fontFamily: 'var(--font-fraunces), serif', fontStyle: 'italic' }}
              >
                {[
                  'Senior Product Manager',
                  'Growth and Experimentation',
                  'Media, Publishing, and Streaming',
                  'AI-Native',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[19px] leading-[1.4] tracking-[-0.005em] text-[var(--cream)]"
                  >
                    <CoffeeIcon className="mt-[5px] flex-shrink-0 text-[var(--gold)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Tablet/desktop: inline pipe-separated */}
              <p
                className="hidden md:block m-0 mb-6 text-[19px] leading-[1.4] tracking-[-0.005em] text-[var(--cream)]"
                style={{ fontFamily: 'var(--font-fraunces), serif', fontStyle: 'italic' }}
              >
                Senior Product Manager <span className="text-[var(--cream-dim)] not-italic">|</span>{' '}
                Growth and Experimentation
                <br />
                Media, Publishing, and Streaming{' '}
                <span className="text-[var(--cream-dim)] not-italic">|</span> AI-Native
              </p>
              <p className="m-0 mb-5 text-[17px] leading-[1.6] text-[var(--cream-muted)]">
                Senior Product Manager with 7+ years scaling growth, experimentation, and data
                platforms across consumer and B2B SaaS products. Built and operated growth
                infrastructure for 22M+ users across 40+ brands at America&apos;s largest
                publisher, driving 33% YoY email revenue growth and establishing a $2.2M+ annual
                revenue channel.
              </p>
              <p className="m-0 mb-5 text-[17px] leading-[1.6] text-[var(--cream-muted)]">
                Previously led content platform scaling at Muck Rack, increasing daily article
                ingestion by 350% and managing AI/ML model training to reduce model parsing
                errors by 45% YoY. I blend technical depth (data architecture, SQL, ETL, LLM/RAG
                workflows, etc.) and legal fluency (MS in Law, Northwestern, with focus on
                Privacy Law and IP Strategy) to navigate data governance, consumer privacy
                compliance, partnership contract negotiations, product decisions, and
                cross-functional stakeholder dynamics in a more hands-on way compared to other
                PMs.
              </p>
              <p className="m-0 mb-8 text-[17px] leading-[1.6] text-[var(--cream-muted)]">
                Currently open to Senior PM roles in media and streaming. If you&apos;re building
                a growth or platform team and want someone who can own outcomes end-to-end,
                let&apos;s talk:{' '}
                <a
                  href="mailto:malcolm.x.evans@gmail.com"
                  className="text-[var(--cream)] underline decoration-[var(--line-bright)] underline-offset-[3px] hover:decoration-[var(--gold)] hover:text-[var(--gold-bright)] transition-colors"
                >
                  malcolm.x.evans@gmail.com
                </a>
              </p>

              <div className="flex flex-col gap-3">
                <SocialLink
                  href="https://www.linkedin.com/in/malxavi/"
                  label="LinkedIn"
                  handle="malxavi"
                  icon={<LinkedInIcon />}
                />
                <SocialLink
                  href="https://github.com/malcolmxavier"
                  label="GitHub"
                  handle="malcolmxavier"
                  icon={<GitHubIcon />}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

function SocialLink({
  href,
  label,
  handle,
  icon,
}: {
  href: string;
  label: string;
  handle: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 text-[var(--cream-muted)] hover:text-[var(--cream)] transition-colors w-fit"
    >
      <span className="flex items-center justify-center w-9 h-9 rounded-[10px] border border-[rgba(245,230,208,0.12)] bg-[rgba(245,230,208,0.04)] group-hover:border-[var(--gold)] group-hover:bg-[rgba(212,165,116,0.08)] transition-colors">
        {icon}
      </span>
      <span className="flex flex-col">
        <span
          className="text-[10px] uppercase tracking-[0.22em] text-[var(--cream-dim)] group-hover:text-[var(--gold)] transition-colors"
          style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
        >
          {label}
        </span>
        <span
          className="text-[14px] tracking-[0.02em]"
          style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
        >
          {handle}
        </span>
      </span>
    </a>
  );
}

function CoffeeIcon({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <path d="M6 2v2" />
      <path d="M10 2v2" />
      <path d="M14 2v2" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}
