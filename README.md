# Resto Menu Online

SaaS multitenant de cartas digitales gastronómicas con pedidos por WhatsApp.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript (modo estricto)
- Tailwind CSS 4
- Prisma 7 + PostgreSQL (Neon)
- Auth.js (próximamente)
- Vercel

## Requisitos

- Node.js LTS (>= 20)
- npm
- Cuenta en [Neon](https://neon.tech) (base de datos)
- Cuenta en [Vercel](https://vercel.com) (despliegue)

## Instalación local

```bash
npm install
```

Copiar variables de entorno y completar los valores:

```bash
cp .env.example .env
```

Generar el cliente de Prisma:

```bash
npx prisma generate
```

## Comandos

```bash
npm run dev          # Servidor de desarrollo con Turbopack
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # ESLint
npm run typecheck    # TypeScript sin emitir
npx prisma generate  # Regenerar cliente de Prisma
npx prisma migrate dev --name <nombre>  # Crear/aplicar migración
npx prisma studio    # Explorar la base de datos
```

Orden recomendado de verificación:

```bash
npm run lint && npm run typecheck && npm run build
```

## Variables de entorno

Ver `.env.example`. Se necesitan como mínimo:

- `DATABASE_URL`: URL con pooling de Neon para la aplicación.
- `DIRECT_URL`: URL directa de Neon para migraciones de Prisma.
- `AUTH_SECRET`: secreto para Auth.js.
- `APP_URL`: URL pública de la aplicación.

## Estructura

```text
src/
├── app/            # Rutas y páginas (App Router)
├── components/     # Componentes reutilizables
├── lib/            # Utilidades, db, auth, storage, tenant
├── modules/        # Reglas de negocio (futuro)
prisma/
├── schema.prisma   # Esquema de datos
└── migrations/     # Migraciones versionadas
```

## Documentación

- `docs/IMPLEMENTATION_PLAN.md`: plan maestro.
- `docs/PROGRESS.md`: estado de las fases.
- `docs/DECISIONS.md`: decisiones arquitectónicas.
- `docs/DEPLOYMENT.md`: guía de despliegue.
- `docs/SECURITY.md`: reglas de seguridad.
- `docs/TESTING.md`: estrategia de pruebas.
- `docs/DATABASE.md`: modelo de datos.

## Estado actual

Fase 1 — Fundación técnica completada. Ver `docs/PROGRESS.md`.
