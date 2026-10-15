# Testing

> Estrategia y comandos de pruebas del proyecto.

## Stack de pruebas

- **Vitest** para tests unitarios e integración.
- **@testing-library/react** para tests de React hooks y componentes.
- **jsdom** como entorno de DOM para tests.

## Comandos

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar en modo watch (desarrollo)
npx vitest

# Lint, tipos y build
npm run lint
npm run typecheck
npm run build
```

## Estructura

Los tests viven junto al código que prueban, con la extensión `.test.ts` o `.test.tsx`.

Ejemplos:

- `src/lib/format.test.ts`
- `src/lib/tenant/access.test.ts`
- `src/modules/cart/context.test.tsx`
- `src/modules/whatsapp/format.test.ts`

## Cobertura actual

- Formato de precios.
- Generación del mensaje de WhatsApp.
- Construcción del enlace `wa.me`.
- Lógica del carrito (agregar, incrementar, actualizar cantidad, observaciones, limpiar).
- Autorización de tenant (aislamiento entre negocios).

## Tests manuales recomendados

Antes de cada release, verificar:

1. Login con credenciales válidas.
2. Crear/editar/archivar productos.
3. Subir imágenes a productos.
4. Crear/editar/publicar cartas.
5. Abrir URL pública de una carta publicada.
6. Agregar productos al carrito desde la carta pública.
7. Enviar pedido por WhatsApp y verificar el mensaje.
8. Intentar acceder a recursos de otro tenant y confirmar que falla.

## Tests end-to-end

Por el momento no hay tests E2E automatizados. Se recomienda ejecutar los flujos manuales arriba indicados. En una etapa posterior se puede incorporar Playwright.
