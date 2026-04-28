# Directory submission scripts

Playwright-driven submission flows. Each script opens a real Chrome window,
auto-fills what it can, and pauses for human-only steps (login, captcha,
email verification, final submit).

## How to run

```bash
# AlternativeTo (Tier A)
npx tsx scripts/submissions/alternativeto.ts

# SaaSHub (Tier B)
npx tsx scripts/submissions/saashub.ts

# BetaList (Tier B; expect 1-2 week review)
npx tsx scripts/submissions/betalist.ts

# ProLinkDirectory (low-DA fitness directory)
npx tsx scripts/submissions/prolinkdirectory.ts

# SoMuch.com (low-DA general directory)
npx tsx scripts/submissions/somuch.ts
```

The browser opens visibly. The terminal prompts you when human action is
needed. Just type Enter to continue, or `skip` to abort.

## Site metadata

All copy lives in `packet.json`. Edit there once and every submission picks
up the change.

## Manual-only paths (no scripts)

These are worth doing but don't fit the form-fill model:

- **Product Hunt** — full launch event; coordinate hunter + launch day
- **Indie Hackers (Products)** — write a product post; sign in + post manually
- **RRCA cold-email outreach** — see `outreach-rrca.md`
- **marathonandbeyond.com cold-email outreach** — see `outreach-marathonandbeyond.md`

## Triage notes

Skipped from the original SEO action plan:

- All AI-tool directories (Toolify, There's An AI, Future Tools) — wrong niche
- DevHunt — wrong niche
- Calculator-aggregator outreach (Omni, Calculator.net, etc.) — they have their own VO2 calcs
- Org sites (RRCA outreach is the exception) — these aren't open directories
- Generic 100+/300+ free SEO directory lists — most are devalued by Google

The scripts here cover the realistic submission targets. Outreach drafts are
separate.
