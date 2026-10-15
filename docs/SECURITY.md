# Seguridad

> Reglas de seguridad y multitenancy del proyecto.

## Autenticación

- Autenticación mediante Auth.js v5 con credenciales.
- Contraseñas hasheadas con `bcryptjs`.
- Sesiones JWT de 24 horas.
- Sin registro público de administradores en el MVP.

## Autorización

- El servidor **nunca confía en un `tenantId` enviado por el cliente**.
- Toda operación administrativa obtiene el usuario de la sesión y verifica su membresía al tenant.
- La función `hasTenantAccess` comprueba que el usuario pertenezca al tenant solicitado.
- Las consultas a base de datos filtran por `tenantId` server-side.

## Multitenancy

- Base de datos PostgreSQL compartida con aislamiento lógico por `tenantId`.
- Todas las entidades principales (`Product`, `Category`, `Menu`, `MenuItem`, `ProductImage`) tienen `tenantId`.
- Las relaciones se validan para evitar cruces entre tenants.

## Datos públicos

- Las páginas públicas solo exponen negocios activos y cartas publicadas.
- Los productos archivados o no disponibles no aparecen en cartas públicas.
- No se exponen datos administrativos en las respuestas públicas.

## Subida de archivos

- Solo se aceptan imágenes (JPEG, PNG, WebP, GIF).
- Tamaño máximo: 5 MB.
- Las imágenes se almacenan en Cloudinary; el repositorio solo guarda la URL.
- Las credenciales de Cloudinary viven solo en variables de entorno del servidor.

## Variables de entorno

- Nunca commitear secretos, contraseñas, tokens ni cadenas de conexión.
- Usar `.env` local y variables de entorno de Vercel para producción.

## Recomendaciones futuras

- Incorporar Row-Level Security en PostgreSQL como refuerzo.
- Agregar rate limiting en server actions.
- Auditar dependencias regularmente.
- Implementar pruebas de seguridad automatizadas.
