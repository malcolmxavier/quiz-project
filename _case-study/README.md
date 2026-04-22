# Case Study Research & Artifacts

This folder contains the raw research materials, advisor reviews, sub-agent
definitions, and scenario brief that produced the prototype in this repo and
the narrative at [`/case-study`](https://github.com/malcolmxavier/quiz-project)
on the deployed site.

If you want the **story**, read the Case Study page on the deployed site.
If you want the **receipts**, this is where they live.

---

## Navigation

### The scenario
- **[`SCENARIO.md`](./SCENARIO.md)** — full PM brief: the role, the program's
  numbers, the stakeholders, the brand voice, the 90-day gate.
- **[`company-context/`](./company-context/)** — background material on the
  fictional Basecamp Coffee scenario and its brand.

### The inherited chaos (raw inputs)
- **[`inherited-chaos/`](./inherited-chaos/)** — the messy corpus inherited
  from the outgoing manager: member CSV, advisor emails, failed campaign
  post-mortems, customer feedback by month, competitor research. This is what
  Claude was pointed at in Beat 1.

### The synthesis (organized outputs)
- **[`organized/feedback-synthesis.md`](./organized/feedback-synthesis.md)** —
  cleaned customer-voice summary where the "fine but forgettable" phrase and
  the NPS divergence first surfaced as load-bearing.
- **[`analysis/comprehensive-research-synthesis.md`](./analysis/comprehensive-research-synthesis.md)** —
  the key diagnosis doc: member data + competitor analysis + customer voice +
  market whitespace triangulated into one direction. Referenced in Beats 1–4.

### The pressure test (advisor reviews)
- **[`reviews/synthesis-feedback.md`](./reviews/synthesis-feedback.md)** —
  the three advisor sub-agents pressure-testing the synthesis from their
  respective lenses. Referenced in Beat 3.
- **[`agents/`](./agents/)** — the sub-agent definitions themselves
  (Exec, Product Designer, Barista Lead, growth-product-strategist).

---

## How this folder maps to the Case Study beats

| Beat | Title | Where the material lives |
|---|---|---|
| 01 | The Signal | `inherited-chaos/`, `organized/feedback-synthesis.md` |
| 02 | The Data | `inherited-chaos/` (member CSV), `analysis/comprehensive-research-synthesis.md` |
| 03 | The Triangulation | `analysis/`, `reviews/synthesis-feedback.md`, `agents/` |
| 04 | The Bet | `analysis/comprehensive-research-synthesis.md` |
| 05 | The Experiment | `SCENARIO.md` (90-day gate + success criteria) |
| 06 | The Artifact | The rest of this repo (`app/`, `lib/`, `_design/REQUIREMENTS.md`) |
| 07 | How This Was Built | `agents/`, `CLAUDE.md` (repo root), and this folder itself |

---

## Disclaimer

**The scenario is fictional.** Basecamp Coffee is a practice scenario from the
[Claude Code for Everyone](https://ccforeveryone.com) course, used here as the
test material for demonstrating a Growth PM workflow with Claude Code. The
numbers, stakeholders, and customer quotes are synthetic but internally
consistent. The thinking, structure, and artifacts are real.

---

Not in this folder: the Next.js code (`app/`, `lib/`), the product spec
([`_design/REQUIREMENTS.md`](../_design/REQUIREMENTS.md)), or the
agent-facing context ([`CLAUDE.md`](../CLAUDE.md)).
