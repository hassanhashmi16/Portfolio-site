# Hassan Hashmi's portfolio

Existing live portfolio: https://hassanhashmi.vercel.app/

## Rebuild status

The redesign is in progress on the local branch `codex/portfolio-redesign`. The old site's design is not a reference. The first in-app pass replaces its home page with the new direction and is ready for visual feedback; it has not been deployed.

For continuity, read:

1. [AGENT_HANDOFF.md](AGENT_HANDOFF.md) — current implementation state and next steps.
2. [PORTFOLIO_PLAN.md](PORTFOLIO_PLAN.md) — decisions, user feedback, background, and open questions.
3. [PORTFOLIO_REBUILD_REFERENCE.md](PORTFOLIO_REBUILD_REFERENCE.md) — detailed project evidence; conversation overrides are at the top.

## Agreed direction

- AI engineer first, supported by full-stack development; showcase work and thinking rather than frame the site as a job application.
- Homepage: **Intro → About → Experience → Projects → Writing → Contact**. About and Experience are separate.
- Immersive scroll storytelling, readable blur-to-focus reveals, and an original black-and-white design with a light/dark switch.
- The private admin is a content manager, not a CRM. Hassan must create, edit, publish, and order projects without editing source files. Writing and other portfolio content should also be manageable.
- $0 ongoing budget; no owned domain; Resend is preferred, subject to resolving supported production delivery.
- Keep the live site untouched during local work. No push, merge, or deployment has been authorized.

## Current implementation

The actual repository is this nested `portfolio-site` directory, inside the outer `PORTFOLIO SITE` workspace. It uses Next.js App Router, JavaScript, React, and npm. Tailwind remains an installed dependency from the old site, but the rebuilt routes currently use authored CSS.

The home page now has the planned section order, a saved light/dark switch, responsive editorial styling, scroll-triggered blur/focus reveals with reduced-motion support, a standalone optimized portrait panel, editable-data-driven project and experience lists, and a writing empty state. Project and experience seed records are in `src/data/portfolio-projects.json` and `src/data/experience.json`; the visual layer maps records instead of defining project cards inline. **The durable CMS, admin sign-in, CRUD, ordering controls, image upload, writing editor, and contact delivery integration are still to be built.** JSON is currently only seed content, not an admin solution.

Local preview: http://127.0.0.1:3000/ (projects: `/projects`). Tailwind initially crashed while processing CSS; because the rebuilt routes don't use utility classes, its import was removed and the authored stylesheet now compiles.

The supplied enhanced portrait is optimized to `public/images/hassan-portrait.webp`. `.tmp-work/` contains a previous agent's disliked design exploration; preserve it for comparison and do not reuse its visual layout.

## Local development

```sh
npm run dev
```

Dependencies were installed with `npm ci` and the local dev server is running. Other existing scripts: `npm run build`, `npm run start`, `npm run lint`. Build/lint have not yet been run against this pass. Never disclose `.env` values.

## Git and deployment

The Git repository is nested here. Work is on `codex/portfolio-redesign`, branched from `main`; the remote is `https://github.com/hassanhashmi16/Portfolio-site.git`. Preserve existing history and user changes. Verify Vercel production settings before any deployment-related action. Do not push, merge, change hosting, or deploy without Hassan's direction.
