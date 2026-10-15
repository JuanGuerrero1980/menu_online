# Resto Menu Online

SaaS multitenant de cartas digitales gastronómicas con pedidos por WhatsApp.

## Producción

- URL: https://menuonline-chi.vercel.app/
- Ejemplo de carta pública: https://menuonline-chi.vercel.app/la-esquina/menu/principal

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript (modo estricto)
- Tailwind CSS 4
- Prisma 7 + PostgreSQL (Neon)
- Auth.js v5
- Cloudinary (imágenes)
- Vercel

## Funcionalidades del MVP

- Panel administrativo protegido.
- Gestión de productos, categorías y cartas.
- Subida de imágenes a productos.
- Publicación de cartas digitales.
- Carta pública por negocio con URL amigable.
- Carrito de compras en el navegador.
- Envío de pedidos por WhatsApp.
- Aislamiento multitenant por negocio.

## Requisitos

- Node.js LTS (>= 20)
- npm
- Cuenta en [Neon](https://neon.tech) (base de datos)
- Cuenta en [Vercel](https://vercel.com) (despliegue)
- Cuenta en [Cloudinary](https://cloudinary.com) (imágenes)

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
npm run test         # Tests con Vitest
npx prisma generate  # Regenerar cliente de Prisma
npx prisma migrate dev --name <nombre>  # Crear/aplicar migración
npx prisma studio    # Explorar la base de datos
```

Orden recomendado de verificación:

```bash
npm run lint && npm run typecheck && npm run test && npm run build
```

## Variables de entorno

Ver `.env.example`. Se necesitan como mínimo:

- `DATABASE_URL`: URL con pooling de Neon para la aplicación.
- `DIRECT_URL`: URL directa de Neon para migraciones de Prisma.
- `AUTH_SECRET`: secreto para Auth.js.
- `APP_URL`: URL pública de la aplicación.
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## Estructura

```text
src/
├── app/            # Rutas y páginas (App Router)
├── components/     # Componentes reutilizables
├── lib/            # Utilidades, db, auth, storage, tenant, formatos
├── modules/        # Reglas de negocio (auth, products, menus, cart, whatsapp)
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

MVP completado. Todas las fases del plan están finalizadas. Ver `docs/PROGRESS.md`.
