# Progreso del proyecto

> Estado de las fases de implementación. Actualizar al finalizar cada fase.

## Resumen

| Fase | Estado | Última actualización |
|------|--------|----------------------|
| Fase 0 — Normalización del plan y documentación de seguimiento | Completada | 2026-10-14 |
| Fase 1 — Fundación técnica | Completada | 2026-10-14 |
| Fase 2 — Multitenancy y autenticación | Pendiente | — |
| Fase 3 — Administración de cartas y catálogo | Pendiente | — |
| Fase 4 — Carta pública | Pendiente | — |
| Fase 5 — Carrito y WhatsApp | Pendiente | — |
| Fase 6 — Calidad y lanzamiento | Pendiente | — |

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
- [x] Despliegue exitoso: https://menuonline-nzi605ofu-juanjo-guerrero.vercel.app/

**Estado:** Completada.

---

## Fase 2 — Multitenancy y autenticación

**Objetivo:** Implementar el modelo de tenants, usuarios, autenticación y autorización.

**Estado:** Pendiente.

---

## Fase 3 — Administración de cartas y catálogo

**Objetivo:** Construir la administración de productos, categorías, cartas e ítems.

**Estado:** Pendiente.

---

## Fase 4 — Carta pública

**Objetivo:** Mostrar la carta pública del negocio con SEO y temas.

**Estado:** Pendiente.

---

## Fase 5 — Carrito y WhatsApp

**Objetivo:** Permitir armar un pedido y enviarlo por WhatsApp con precios validados.

**Estado:** Pendiente.

---

## Fase 6 — Calidad y lanzamiento

**Objetivo:** Completar pruebas, revisar seguridad y lanzar el MVP.

**Estado:** Pendiente.
