# Agent Notes — Resto Menu Online

> Compact repo guide. Read this and `docs/IMPLEMENTATION_PLAN.md` before writing code.

## Project state

- Pre-MVP. Repository currently contains only planning docs under `docs/`.
- Product: multitenant SaaS of digital menus with WhatsApp orders.
- Master plan (source of truth): `docs/IMPLEMENTATION_PLAN.md`.

## Mandatory workflow

1. Read `docs/IMPLEMENTATION_PLAN.md` completely.
2. Read `docs/PROGRESS.md` and `docs/DECISIONS.md` if they exist.
3. Inspect the repo before creating files.
4. Work one phase at a time; present a concrete plan before implementing.
5. Run checks/tests after changes; do not declare success if checks fail or were not run.
6. Update `docs/PROGRESS.md`, `docs/DECISIONS.md`, and `README.md` when a phase or decision changes.

## Stack and architecture (locked)

- Next.js with App Router, React, TypeScript strict, Tailwind CSS.
- Backend inside Next.js: Route Handlers + services + repositories. No separate backend (FastAPI/Laravel/etc.).
- Prisma ORM + PostgreSQL (managed in Neon).
- Auth.js with credentials session as the preferred auth solution; Argon2id for passwords.
- Vercel for hosting; Cloudinary or equivalent behind a storage abstraction.
- Monolithic modular structure under `src/` (see plan section 5).

## Non-negotiable constraints

- **Multitenancy:** shared PostgreSQL database, logical isolation by `tenantId`.
- **Never trust a `tenantId` sent by the client** for authorization.
- All admin operations must authenticate and verify tenant membership server-side.
- No public admin registration in MVP.
- Server Components by default; Client Components only for real interactivity.
- Use `Decimal` for money, UUIDs for identifiers, no `float` for money.
- Do not implement future features early; keep each phase minimal and verifiable.
- No microservices, no Kubernetes, no production data in tests, no secrets in repo.

## Documentation that must be kept current

- `README.md`
- `docs/IMPLEMENTATION_PLAN.md`
- `docs/PROGRESS.md`
- `docs/DECISIONS.md`
- `docs/DATABASE.md`
- `docs/DEPLOYMENT.md`
- `docs/SECURITY.md`
- `docs/TESTING.md`

## When the repo is still empty

If no Next.js project exists yet, the first session must normalize the plan and create the tracking docs (`PROGRESS.md`, `DECISIONS.md`) before implementing Phase 1. Only implement Phase 1 after inspection and plan presentation.
