# Decisiones arquitectónicas

> Decisiones técnicas confirmadas del proyecto. Actualizar cuando cambie una decisión importante.

## DR-001: Stack base

- **Decisión:** Next.js con App Router, React, TypeScript en modo estricto y Tailwind CSS.
- **Motivo:** Productividad, SSR/SSG para SEO de cartas públicas, y un único código base para frontend y backend dentro de Next.js.
- **Fecha:** 2026-10-14.

## DR-002: Backend dentro de Next.js

- **Decisión:** Usar Route Handlers de Next.js + servicios + repositorios. Sin backend separado (FastAPI, Laravel, etc.).
- **Motivo:** Reducir complejidad operativa en el MVP y aprovechar la sesión/autenticación del mismo entorno.
- **Fecha:** 2026-10-14.

## DR-003: Base de datos y ORM

- **Decisión:** PostgreSQL administrado en Neon con Prisma ORM y migraciones versionadas.
- **Motivo:** Modelo relacional claro para el dominio, Prisma facilita tipos seguros y migraciones controladas, Neon ofrece PostgreSQL administrado con plan gratuito inicial.
- **Fecha:** 2026-10-14.

## DR-004: Identificadores y dinero

- **Decisión:** UUID para todos los identificadores y tipo `Decimal` para importes monetarios.
- **Motivo:** Evitar enumeración secuencial de recursos y eliminar errores de redondeo en precios.
- **Fecha:** 2026-10-14.

## DR-005: Estrategia multitenant

- **Decisión:** Base de datos PostgreSQL compartida con aislamiento lógico por `tenantId`.
- **Motivo:** Simplicidad operativa en el MVP, sin renunciar a la posibilidad futura de agregar Row-Level Security.
- **Fecha:** 2026-10-14.

## DR-006: Autenticación

- **Decisión:** Auth.js con sesión por credenciales. Hashing de contraseñas con Argon2id.
- **Motivo:** Solución compatible con Next.js App Router y Prisma. Sin registro público de administradores en el MVP.
- **Fecha:** 2026-10-14.

## DR-007: Resolución pública de negocio

- **Decisión:** Las páginas públicas resuelven el negocio mediante `tenantSlug` en la URL (`/[tenantSlug]` y `/[tenantSlug]/menu/[menuSlug]`).
- **Motivo:** URLs amigables y compartibles. El slug es identificación pública, no autorización.
- **Fecha:** 2026-10-14.

## DR-008: Autorización

- **Decisión:** El servidor nunca confía en un `tenantId` enviado por el cliente. Toda operación administrativa valida autenticación y pertenencia al tenant.
- **Motivo:** Garantizar aislamiento entre negocios y evitar acceso cruzado.
- **Fecha:** 2026-10-14.

## DR-009: Componentes

- **Decisión:** Server Components por defecto. Client Components solo cuando la interactividad lo requiera.
- **Motivo:** Menor JavaScript en el cliente, mejor rendimiento y SEO para cartas públicas.
- **Fecha:** 2026-10-14.

## DR-010: Almacenamiento de imágenes

- **Decisión:** Cloudinary o proveedor equivalente, detrás de una pequeña abstracción en `lib/storage`.
- **Motivo:** Evitar acoplar el código a un único proveedor y mantener credenciales solo en el servidor.
- **Fecha:** 2026-10-14.

## DR-011: Pedidos

- **Decisión:** El carrito vive en el navegador. No se persisten pedidos en el backend durante el MVP.
- **Motivo:** Reducir alcance del MVP; el negocio confirma el pedido directamente por WhatsApp.
- **Fecha:** 2026-10-14.

## DR-012: Infraestructura

- **Decisión:** Monolito modular desplegado en Vercel. Sin microservicios ni Kubernetes.
- **Motivo:** Simplicidad y costo controlado mientras se valida el producto.
- **Fecha:** 2026-10-14.

## DR-013: Cliente de Prisma y conexión a Neon

- **Decisión:** Usar Prisma 7 con el generador `prisma-client`, configuración de conexiones en `prisma7.config.ts`, y el driver adapter `@prisma/adapter-neon` para el cliente de aplicación.
- **Motivo:** Prisma 7 requiere que las URLs de conexión para migraciones vivan en `prisma7.config.ts` y que el cliente use un adapter. `@prisma/adapter-neon` es el adaptador oficial para Neon.
- **Fecha:** 2026-10-14.
