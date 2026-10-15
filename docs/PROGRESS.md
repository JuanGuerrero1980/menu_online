# Progreso del proyecto

> Estado de las fases de implementación. Actualizar al finalizar cada fase.

## Resumen

| Fase | Estado | Última actualización |
|------|--------|----------------------|
| Fase 0 — Normalización del plan y documentación de seguimiento | Completada | 2026-10-14 |
| Fase 1 — Fundación técnica | Completada | 2026-10-14 |
| Fase 2 — Multitenancy y autenticación | Completada | 2026-10-15 |
| Fase 3 — Administración de cartas y catálogo | Completada | 2026-10-15 |
| Fase 4 — Carta pública | Completada | 2026-10-15 |
| Fase 5 — Carrito y WhatsApp | Completada | 2026-10-15 |
| Fase 6 — Calidad y lanzamiento | Completada | 2026-10-15 |

---

## Fase 0 — Normalización del plan y documentación de seguimiento

**Objetivo:** Confirmar el plan maestro y crear los documentos mínimos de seguimiento antes de escribir código.

- [x] Leer `docs/IMPLEMENTATION_PLAN.md`.
- [x] Crear `AGENTS.md`.
- [x] Crear `docs/PROGRESS.md`.
- [x] Crear `docs/DECISIONS.md`.
- [x] Presentar plan de Fase 1.

**Criterios de aceptación:**

- [x] El plan maestro está disponible y completo.
- [x] Existen documentos de progreso y decisiones.
- [x] La Fase 1 está planificada y lista para revisión.

---

## Fase 1 — Fundación técnica

**Objetivo:** Tener un proyecto Next.js funcional, conectado a Neon y desplegable en Vercel.

**Tareas completadas:**

- [x] Inicializar Next.js 16 con App Router, TypeScript, Tailwind CSS 4 y directorio `src/`.
- [x] Configurar TypeScript en modo estricto.
- [x] Configurar ESLint.
- [x] Instalar y configurar Prisma 7 con PostgreSQL.
- [x] Configurar `@prisma/adapter-neon` para conexión con Neon.
- [x] Crear `src/lib/db/prisma.ts` (singleton del cliente).
- [x] Crear `.env.example` y `.env` con placeholders.
- [x] Crear página inicial (`src/app/page.tsx`).
- [x] Agregar scripts de calidad: `lint`, `typecheck`, `prisma:generate`, etc.
- [x] Actualizar `.gitignore` para excluir secretos y cliente generado.
- [x] Actualizar `README.md`.
- [x] Crear `docs/DEPLOYMENT.md` básico.

**Verificaciones ejecutadas:**

- [x] `npm run lint` pasa.
- [x] `npm run typecheck` pasa.
- [x] `npm run build` compila exitosamente.
- [x] `npx prisma generate` genera el cliente sin errores.

**Verificaciones ejecutadas con credenciales reales:**

- [x] `npx prisma db pull` conecta correctamente a Neon.
- [x] `npx prisma migrate dev --name init` sincroniza sin errores.

**Criterios de aceptación:**

- [x] El proyecto se ejecuta localmente.
- [x] La conexión a Neon funciona.
- [x] No hay secretos en el repositorio.
- [x] La compilación y las comprobaciones pasan.

**Nota sobre Vercel:**

- [x] Código pushado a `https://github.com/JuanGuerrero1980/menu_online.git`.
- [x] Repositorio cambiado a público para compatibilidad con el plan Hobby de Vercel.
- [x] Vercel está conectado al repositorio.
- [x] Despliegue exitoso: https://menuonline-chi.vercel.app/

**Estado:** Completada.

---

## Fase 2 — Multitenancy y autenticación

**Objetivo:** Implementar el modelo de tenants, usuarios, autenticación y autorización.

**Tareas completadas:**

- [x] Modelos `Tenant`, `User`, `TenantUser` y `TenantSettings` en `prisma/schema.prisma`.
- [x] Migración `multitenancy_auth` aplicada en Neon.
- [x] Configuración de Auth.js v5 en `src/auth.ts` con credentials provider.
- [x] Hashing de contraseñas con `bcryptjs`.
- [x] Página de login en `src/app/(auth)/login/page.tsx`.
- [x] Server action `loginAction` en `src/modules/auth/actions.ts`.
- [x] Layout protegido para `/admin` en `src/app/admin/layout.tsx`.
- [x] Helpers de tenant y autorización en `src/lib/tenant/tenant.ts`.
- [x] Seed de prueba en `prisma/seed.ts` (dos tenants + usuario admin).
- [x] Tipos extendidos de Auth.js en `src/types/auth.d.ts`.

**Verificaciones ejecutadas:**

- [x] `npm run lint` pasa.
- [x] `npm run typecheck` pasa.
- [x] `npm run build` compila exitosamente.
- [x] `npx prisma db seed` crea datos de prueba en Neon.

**Datos de prueba:**

- Email: `admin@example.com`
- Contraseña: `Admin1234!`
- Tenants: `la-esquina` (Cande), `el-rincon`

**Criterios de aceptación:**

- [x] Modelo multitenancy creado y migrado en Neon.
- [x] Login funciona con credenciales válidas.
- [x] Rutas `/admin/*` redirigen a login si no hay sesión.
- [x] El servidor nunca usa `tenantId` enviado por el cliente para autorizar.
- [x] Seeds crean datos de prueba aislados.
- [x] `lint`, `typecheck` y `build` pasan.
- [x] Despliegue en Vercel verificado.
- [x] Login funciona en producción con credenciales de prueba.

**Estado:** Completada.

---

## Fase 3 — Administración de cartas y catálogo

**Objetivo:** Construir la administración de productos, categorías, cartas e ítems.

### Fase 3a — Productos y categorías

**Estado:** Completada.

**Tareas completadas:**

- [x] Actualizar `prisma/schema.prisma` con modelos `Product`, `Category` y `ProductImage`.
- [x] Crear migración `products_categories`.
- [x] Crear servicios `src/modules/products/service.ts` y `src/modules/categories/service.ts`.
- [x] Crear páginas admin:
  - `/admin/products`
  - `/admin/products/[id]`
  - `/admin/categories`
  - `/admin/menus` (placeholder)
- [x] Actualizar layout de admin con navegación y tenant activo.
- [x] Actualizar seed con categorías y productos de ejemplo.

**Criterios de aceptación:**

- [x] Un admin puede crear, editar y archivar productos.
- [x] Un admin puede crear y eliminar categorías.
- [x] Las operaciones validan pertenencia al tenant server-side.
- [x] No es posible cruzar relaciones entre tenants.
- [x] `lint`, `typecheck` y `build` pasan.

### Fase 3b — Cartas y MenuItem

**Estado:** Completada.

**Tareas completadas:**

- [x] Modelos `MenuCategory` y `MenuItem` en el schema.
- [x] Migración `menu_items` aplicada en Neon.
- [x] Servicios de cartas en `src/modules/menus/service.ts`.
- [x] Editor de carta en `/admin/menus/[id]`.
- [x] Precios específicos por `MenuItem` (`priceOverride`).
- [x] Disponibilidad por ítem (`isAvailable`).
- [x] Seed con carta "Carta principal" publicada.

### Fase 3c — Imágenes con Cloudinary

**Estado:** Completada.

**Tareas completadas:**

- [x] Instalar `cloudinary` y configurar variables de entorno (`CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`).
- [x] Crear abstracción de almacenamiento en `src/lib/storage/service.ts`.
- [x] Crear helpers de Cloudinary en `src/lib/storage/cloudinary.ts`.
- [x] Agregar `addProductImage` y `removeProductImage` en `src/modules/products/service.ts`.
- [x] Crear server actions `createProductAction`, `updateProductAction` y `removeProductImageAction` en `src/modules/products/actions.ts`.
- [x] Actualizar formulario de productos (`/admin/products`) para soportar imagen y alt text.
- [x] Actualizar listado de productos para mostrar thumbnail.
- [x] Actualizar editor de producto (`/admin/products/[id]`) para agregar/eliminar imágenes.
- [x] Configurar `next.config.ts` con `images.remotePatterns` para `res.cloudinary.com`.
- [x] Ejecutar `lint`, `typecheck` y `build` exitosamente.
- [x] Commit y push a `main`; despliegue en Vercel verificado.

**Criterios de aceptación:**

- [x] Un admin puede subir una imagen al crear/editar un producto.
- [x] Las imágenes se almacenan en Cloudinary y su URL se guarda en `ProductImage`.
- [x] Un admin puede eliminar imágenes existentes.
- [x] Las operaciones validan pertenencia al tenant server-side.
- [x] `lint`, `typecheck` y `build` pasan.

**Estado general:** Fase 3 completada.

---

## Fase 4 — Carta pública

**Objetivo:** Mostrar la carta pública del negocio con SEO y temas.

**Estado:** Completada.

**Tareas completadas:**

- [x] Crear servicios públicos en `src/modules/public/service.ts`:
  - `getPublicTenantBySlug`
  - `getPublicMenusByTenantId`
  - `getPublicMenuBySlug` (solo cartas `PUBLISHED`, productos activos y disponibles)
- [x] Crear layout y rutas públicas bajo `src/app/(public)/[tenantSlug]/`:
  - Página del negocio (`page.tsx`)
  - Página de carta (`menu/[menuSlug]/page.tsx`)
- [x] Mostrar nombre, logo, descripción y cartas publicadas del negocio.
- [x] Mostrar categorías ordenadas con productos, imágenes, descripciones y precios.
- [x] Aplicar tema básico desde `TenantSettings` (colores y tipografía).
- [x] Implementar `generateMetadata` para SEO en ambas páginas.
- [x] Agregar `src/app/robots.ts` para no indexar `/admin` y `/login`.
- [x] Agregar enlace "Ver carta pública" en el panel de administración.
- [x] Ejecutar `lint`, `typecheck` y `build` exitosamente.

**Criterios de aceptación:**

- [x] Las cartas publicadas se muestran correctamente.
- [x] Las cartas en borrador no se muestran públicamente.
- [x] El slug identifica al negocio correcto.
- [x] Las páginas son accesibles directamente mediante URL.
- [x] El contenido principal está disponible para indexación.
- [x] No se exponen datos administrativos.

---

## Fase 5 — Carrito y WhatsApp

**Objetivo:** Permitir armar un pedido y enviarlo por WhatsApp con precios validados.

**Estado:** Completada.

**Tareas completadas:**

- [x] Crear tipos del carrito en `src/modules/cart/types.ts`.
- [x] Crear contexto del carrito en `src/modules/cart/context.tsx` (React Context + `useState`):
  - Agregar, eliminar y actualizar cantidades.
  - Agregar observaciones por producto.
  - Calcular total y cantidad de ítems.
- [x] Integrar `CartProvider` en el layout de rutas públicas.
- [x] Crear componente `AddToCartButton` en `src/components/public-menu/add-to-cart-button.tsx`.
- [x] Crear componente `CartDrawer` en `src/components/public-menu/cart-drawer.tsx` con listado, cantidades, observaciones y total.
- [x] Actualizar página de carta pública para mostrar botón "Agregar" en cada producto y el carrito flotante.
- [x] Crear server action `validateCartAndGenerateMessage` en `src/modules/whatsapp/actions.ts`:
  - Verificar negocio activo, carta publicada y productos disponibles.
  - Validar que los precios coincidan con la configuración actual.
  - Generar mensaje de WhatsApp con cantidades, precios y observaciones.
  - Crear enlace `https://wa.me/{telefono}?text={mensaje}`.
- [x] Ejecutar `lint`, `typecheck` y `build` exitosamente.

**Criterios de aceptación:**

- [x] El total corresponde a los productos seleccionados.
- [x] Los precios se validan antes de generar el mensaje.
- [x] Los productos no disponibles no pueden agregarse (no se muestran) ni enviarse.
- [x] El mensaje contiene cantidades, precios y observaciones correctos.
- [x] El enlace abre WhatsApp con el número del negocio.
- [x] No se afirma que el pedido quedó confirmado.

---


## Fase 6 — Calidad y lanzamiento

**Objetivo:** Completar pruebas, revisar seguridad y lanzar el MVP.

**Estado:** Completada.

**Tareas completadas:**

- [x] Configurar Vitest para tests unitarios e integración.
- [x] Agregar script `npm run test`.
- [x] Escribir tests para:
  - Formato de precios (`src/lib/format.test.ts`).
  - Generación de mensaje de WhatsApp (`src/modules/whatsapp/format.test.ts`).
  - Construcción del enlace `wa.me`.
  - Lógica del carrito (`src/modules/cart/context.test.tsx`).
  - Autorización de tenant (`src/lib/tenant/access.test.ts`).
- [x] Extraer función pura `hasTenantAccess` a `src/lib/tenant/access.ts` para facilitar tests.
- [x] Extraer formato de moneda y generación de mensaje de WhatsApp a funciones puras testeables.
- [x] Crear `docs/TESTING.md` con estrategia y comandos de pruebas.
- [x] Crear/actualizar `docs/SECURITY.md` con reglas de autenticación, autorización, multitenancy y subida de archivos.
- [x] Ejecutar `lint`, `typecheck`, `test` y `build` exitosamente.
- [x] Commit y push a `main`.

**Criterios de aceptación:**

- [x] Tests críticos pasan.
- [x] No hay errores de compilación.
- [x] No hay secretos en el repositorio.
- [x] La documentación de seguridad y testing está actualizada.
- [x] La aplicación está desplegada en Vercel.

**Estado general del MVP:** Completado.
