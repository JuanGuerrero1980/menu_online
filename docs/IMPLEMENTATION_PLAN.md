# Plan maestro de implementación — Plataforma de Menús Digitales

**Versión:** 1.0  
**Estado:** Preparado para comenzar el desarrollo  
**Producto:** SaaS multitenant de cartas digitales gastronómicas con pedidos por WhatsApp  
**Objetivo inicial:** Implementar un MVP funcional para un negocio gastronómico, preparado para incorporar múltiples negocios sin reescribir la aplicación.

---

# 1. Instrucciones para OpenCode

OpenCode debe trabajar como un ingeniero de software responsable de implementar este producto de manera incremental.

## Reglas obligatorias

1. Leer este documento completo antes de modificar código.
2. Inspeccionar el repositorio existente antes de crear archivos o cambiar configuraciones.
3. Si el repositorio está vacío, inicializar el proyecto siguiendo el stack definido.
4. No implementar todas las fases en una única ejecución.
5. Trabajar una fase por vez, con tareas pequeñas y verificables.
6. Antes de implementar cada fase, presentar un breve plan de archivos y cambios.
7. Después de implementar, ejecutar las comprobaciones, pruebas y validaciones correspondientes.
8. No declarar una tarea terminada si las pruebas correspondientes fallan o no pudieron ejecutarse. Informar claramente cualquier limitación.
9. Actualizar `docs/IMPLEMENTATION_PLAN.md` y `docs/PROGRESS.md` al finalizar cada fase.
10. No modificar decisiones arquitectónicas importantes sin documentar el motivo y solicitar aprobación.
11. No instalar dependencias innecesarias ni introducir microservicios.
12. Nunca exponer secretos, contraseñas, tokens o cadenas de conexión.
13. No confiar en el frontend para aplicar permisos o aislamiento entre negocios.
14. No crear funcionalidades que estén fuera del alcance del MVP.
15. No utilizar datos de producción en pruebas automatizadas.

## Primera tarea de OpenCode

En la primera ejecución, OpenCode debe:

- Inspeccionar el repositorio.
- Leer este plan.
- Identificar las decisiones técnicas pendientes.
- Crear un documento `docs/IMPLEMENTATION_PLAN.md` con el plan normalizado.
- Crear `docs/PROGRESS.md` con las fases y su estado inicial.
- Crear `docs/DECISIONS.md` con las decisiones arquitectónicas confirmadas.
- Presentar el plan de la Fase 1.
- No comenzar las fases posteriores hasta que la Fase 1 esté terminada y verificada.

Si el usuario solicita explícitamente implementar la Fase 1 en esa misma ejecución, puede hacerlo después de completar la inspección y presentar el plan.

---

# 2. Visión del producto

La plataforma permitirá que negocios gastronómicos administren varias cartas digitales y reciban pedidos preparados desde la web, que el visitante enviará mediante WhatsApp.

Ejemplo de negocio:

**La Esquina**

- Carta de almuerzos.
- Carta de cenas.
- Carta de bebidas.
- Carta de promociones.

Cada carta tendrá una URL pública y podrá compartirse mediante un enlace o código QR.

El visitante podrá:

1. Abrir la página del negocio.
2. Elegir una carta.
3. Navegar por categorías y platos.
4. Agregar platos al carrito.
5. Modificar cantidades y agregar observaciones.
6. Revisar un total estimado.
7. Enviar el pedido por WhatsApp.

El negocio podrá:

1. Iniciar sesión en el panel administrativo.
2. Administrar su perfil.
3. Crear y publicar cartas.
4. Administrar categorías y productos.
5. Subir imágenes.
6. Cambiar precios y disponibilidad.
7. Configurar el número de WhatsApp.
8. Personalizar la apariencia básica de su carta.

## Objetivo comercial

Validar el producto con un primer cliente real, pero construir desde el principio una base multitenant que permita incorporar más negocios.

El producto no debe quedar acoplado al primer restaurante ni requerir una implementación diferente para cada cliente.

---

# 3. Alcance del MVP

## Incluido

- Aplicación web responsive.
- Carta pública por negocio.
- Múltiples cartas por negocio.
- Catálogo de productos reutilizables entre cartas.
- Categorías y ordenamiento.
- Imágenes de productos.
- Precios base y precios específicos por carta.
- Disponibilidad de productos.
- Publicación y despublicación de cartas.
- Panel administrativo protegido.
- Autenticación y autorización.
- Separación multitenant.
- Carrito de compras en el navegador.
- Observaciones por producto.
- Generación de mensajes para WhatsApp.
- Configuración del negocio.
- Personalización básica mediante logo, colores y tipografía.
- Pruebas automatizadas.
- Despliegue en Vercel.
- PostgreSQL administrado en Neon.

## Fuera del MVP

No implementar:

- Pagos online.
- Integración con la API oficial de WhatsApp.
- Confirmación automática de pedidos.
- Seguimiento de pedidos.
- Gestión de delivery.
- Gestión de caja.
- Facturación.
- Suscripciones o facturación SaaS.
- Aplicaciones móviles nativas.
- Gestión de sucursales.
- Múltiples idiomas.
- Inventario y stock.
- Variantes complejas, adicionales y combos.
- Editor visual de páginas.
- Diseños totalmente independientes por cliente.
- Microservicios.
- Infraestructura Kubernetes.

Las futuras funcionalidades no deben implementarse anticipadamente. La arquitectura debe permitir evolucionar sin complejidad innecesaria.

---

# 4. Stack tecnológico definitivo

## Frontend y aplicación

- Next.js con App Router.
- React.
- TypeScript con modo estricto.
- Tailwind CSS.
- Server Components por defecto.
- Client Components únicamente para las interacciones que los necesiten.
- React Hook Form y Zod para formularios y validación, cuando corresponda.

## Backend

El backend se implementará dentro de Next.js.

- Route Handlers para endpoints HTTP.
- Servicios para las reglas de negocio.
- Repositorios o funciones de acceso a datos con responsabilidades claras.
- Validaciones en el servidor.
- Autorización centralizada.
- Sin backend separado durante el MVP.

No implementar FastAPI, Laravel ni otro backend independiente.

## Base de datos

- PostgreSQL en Neon.
- Prisma ORM.
- Migraciones versionadas.
- UUID para identificadores.
- Tipos `Decimal` para importes monetarios.
- Restricciones e índices en base de datos.

## Autenticación

Implementar autenticación para administradores con una solución compatible con Next.js App Router y Prisma.

Preferencia inicial: Auth.js con autenticación mediante credenciales y sesiones seguras, si la versión elegida permite satisfacer correctamente los requisitos.

Requisitos:

- Contraseñas almacenadas mediante un algoritmo de hashing seguro, preferentemente Argon2id.
- Nunca almacenar contraseñas en texto plano.
- Validar las credenciales en el servidor.
- Protección de rutas administrativas.
- Sesiones seguras.
- Validación de la pertenencia del usuario al negocio.
- Cierre de sesión.
- Mensajes de error que no revelen si una cuenta existe.
- Sin registro público de administradores.

Si se selecciona una solución diferente, documentar por qué antes de implementarla.

## Despliegue

- GitHub para el repositorio.
- Vercel para Next.js.
- Neon para PostgreSQL.
- Cloudinary o almacenamiento equivalente para imágenes, detrás de una pequeña abstracción de almacenamiento.
- Variables de entorno separadas por entorno.

Los planes gratuitos se utilizarán inicialmente para desarrollo y pruebas, sujetos a sus límites y condiciones vigentes. Antes de operar comercialmente, verificar que cada proveedor permita ese uso.

---

# 5. Arquitectura de la aplicación

Utilizar un monolito modular.

No dividir la aplicación en servicios independientes.

Estructura inicial sugerida:

```text
src/
├── app/
│   ├── (public)/
│   │   └── [tenantSlug]/
│   │       ├── page.tsx
│   │       └── menu/
│   │           └── [menuSlug]/
│   │               └── page.tsx
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── menus/
│   │   ├── categories/
│   │   ├── products/
│   │   └── settings/
│   └── api/
│       ├── public/
│       └── admin/
├── components/
│   ├── ui/
│   ├── public-menu/
│   └── admin/
├── modules/
│   ├── auth/
│   ├── tenants/
│   ├── menus/
│   ├── categories/
│   ├── products/
│   ├── cart/
│   ├── settings/
│   └── whatsapp/
├── lib/
│   ├── db/
│   ├── auth/
│   ├── tenant/
│   ├── storage/
│   └── validation/
└── prisma/
    ├── schema.prisma
    └── migrations/
```

La estructura puede ajustarse a las convenciones de la versión de Next.js seleccionada. Evitar crear archivos vacíos sin una función concreta.

## Responsabilidades

- `app`: rutas, layouts y composición de páginas.
- `components`: componentes visuales reutilizables.
- `modules`: reglas y operaciones del negocio.
- `lib/db`: inicialización y acceso a Prisma.
- `lib/auth`: sesión y autenticación.
- `lib/tenant`: resolución y validación del tenant.
- `lib/storage`: almacenamiento de imágenes.
- `lib/validation`: esquemas compartidos cuando corresponda.

Las reglas de negocio no deben quedar duplicadas entre páginas, Server Actions y Route Handlers.

---

# 6. Arquitectura multitenant

## Estrategia

Una base de datos PostgreSQL compartida con separación lógica por `tenantId`.

Cada negocio tendrá su propio identificador UUID.

Todas las entidades pertenecientes a un negocio deben quedar asociadas al tenant correspondiente, directamente o mediante relaciones verificables.

## Resolución del tenant

Las páginas públicas resolverán el negocio por `tenantSlug`.

Ejemplos:

```text
/mi-restaurante
/mi-restaurante/menu/almuerzos
/mi-restaurante/menu/bebidas
```

El slug identifica al negocio, no es un mecanismo de autorización.

Los usuarios administrativos obtendrán su identidad desde la sesión. El servidor determinará a qué negocios tienen acceso y verificará sus roles.

Nunca aceptar un `tenantId` enviado por el cliente como prueba de autorización.

## Reglas obligatorias

1. Todas las operaciones administrativas deben validar autenticación y permisos.
2. Todas las consultas administrativas deben limitarse al tenant autorizado.
3. Todas las modificaciones deben verificar la pertenencia de las entidades al tenant.
4. Las relaciones entre productos, categorías, cartas e ítems no pueden cruzar negocios.
5. Las páginas públicas solo muestran negocios y cartas publicados.
6. Los productos no disponibles o archivados no pueden agregarse a un nuevo pedido.
7. Los errores no deben filtrar información de otros negocios.
8. Los identificadores UUID no reemplazan la autorización.
9. Los filtros multitenant deben aplicarse en el servidor.
10. Incorporar pruebas negativas que intenten acceder a recursos de otro negocio.

Evaluar Row-Level Security de PostgreSQL como refuerzo futuro. No es obligatorio para el MVP si la estrategia de acceso a datos garantiza aislamiento y está adecuadamente probada.

---

# 7. Modelo de datos

Implementar las siguientes entidades en Prisma.

## Tenant

Representa al negocio gastronómico.

Campos:

- `id`: UUID.
- `name`: nombre comercial.
- `slug`: identificador público único.
- `status`: estado del negocio.
- `createdAt`.
- `updatedAt`.

Estados iniciales: `ACTIVE`, `SUSPENDED`.

## User

Representa a una persona que puede administrar negocios.

Campos:

- `id`: UUID.
- `name`.
- `email`: único.
- `passwordHash`.
- `createdAt`.
- `updatedAt`.

No permitir registro público en el MVP.

## TenantUser

Relaciona usuarios y negocios.

Campos:

- `tenantId`.
- `userId`.
- `role`.
- `createdAt`.

Roles iniciales:

- `OWNER`: administración completa del negocio.
- `ADMIN`: administración operativa del negocio.

Crear una restricción única sobre `(tenantId, userId)`.

Las operaciones de administración de usuarios y asignación de roles quedan fuera del panel del MVP, pero el modelo debe admitirlas.

## TenantSettings

Configuración de presentación y contacto.

Campos:

- `id`.
- `tenantId`: único.
- `whatsappPhone`.
- `logoUrl`: opcional.
- `primaryColor`.
- `secondaryColor`.
- `fontFamily`.
- `currency`.
- `timezone`.
- `createdAt`.
- `updatedAt`.

Valores iniciales sugeridos:

- Moneda: `ARS`.
- Zona horaria: `America/Argentina/Cordoba`.

Validar los teléfonos y colores antes de utilizarlos.

## Menu

Campos:

- `id`.
- `tenantId`.
- `name`.
- `slug`.
- `description`.
- `status`.
- `sortOrder`.
- `createdAt`.
- `updatedAt`.

Estados: `DRAFT`, `PUBLISHED`, `ARCHIVED`.

Crear una restricción única para `(tenantId, slug)`.

Solo se publican cartas de negocios activos.

## Category

Categoría reutilizable dentro de un negocio.

Campos:

- `id`.
- `tenantId`.
- `name`.
- `description`.
- `createdAt`.
- `updatedAt`.

No permitir nombres vacíos.

## MenuCategory

Relación entre una carta y una categoría.

Campos:

- `id`.
- `menuId`.
- `categoryId`.
- `sortOrder`.

Crear una restricción única para `(menuId, categoryId)`.

Validar que la carta y la categoría pertenezcan al mismo tenant.

## Product

Producto del catálogo del negocio.

Campos:

- `id`.
- `tenantId`.
- `name`.
- `description`.
- `basePrice`: Decimal.
- `status`.
- `createdAt`.
- `updatedAt`.

Estados: `ACTIVE`, `ARCHIVED`.

El precio base debe ser no negativo.

## MenuItem

Representa un producto publicado en una categoría de una carta.

Campos:

- `id`.
- `menuCategoryId`.
- `productId`.
- `priceOverride`: Decimal opcional.
- `isAvailable`.
- `sortOrder`.
- `createdAt`.
- `updatedAt`.

Crear una restricción única para `(menuCategoryId, productId)`.

Reglas:

- Si existe `priceOverride`, ese es el precio publicado.
- En caso contrario, utilizar `Product.basePrice`.
- Un producto puede aparecer en distintas cartas.
- Un producto puede tener precios distintos en diferentes cartas.
- La disponibilidad efectiva requiere que el negocio, la carta y el producto estén activos y que el `MenuItem` esté disponible.
- Validar que la categoría, la carta y el producto correspondan al mismo tenant.

## ProductImage

Campos:

- `id`.
- `tenantId`.
- `productId`.
- `url`.
- `altText`.
- `sortOrder`.
- `createdAt`.

Las imágenes se almacenan fuera de PostgreSQL. La base de datos solo guarda referencias.

## Reglas de datos

- Utilizar UUID para identificadores.
- Utilizar `Decimal` para importes.
- Definir índices para las búsquedas frecuentes.
- Definir claves foráneas y restricciones únicas.
- No almacenar importes como `float`.
- No eliminar en cascada entidades que deban conservarse por integridad referencial.
- Preferir archivado lógico de productos.
- Definir explícitamente las políticas de borrado de cartas y categorías.
- No guardar pedidos en la base de datos durante el MVP.

---

# 8. Catálogo y gestión de cartas

## Flujo administrativo

1. Crear un producto.
2. Asignarlo a una categoría.
3. Crear una carta.
4. Incorporar categorías a la carta.
5. Agregar productos a las categorías mediante `MenuItem`.
6. Ordenar las categorías.
7. Ordenar los productos.
8. Publicar la carta.

El catálogo es independiente de las cartas.

Si se modifica el nombre o la imagen de un producto, el cambio se verá en todas las cartas donde esté publicado.

Si se modifica el precio base, afectará a todas las apariciones sin precio específico.

Si una carta tiene un precio específico, seguirá utilizando ese precio hasta que se modifique o se elimine el override.

La disponibilidad debe poder cambiarse desde la administración sin necesidad de borrar el producto.

## Operaciones mínimas

- Crear, editar y archivar productos.
- Crear y editar categorías.
- Crear, editar, publicar y archivar cartas.
- Incorporar categorías a cartas.
- Quitar categorías de cartas.
- Agregar productos a categorías de una carta.
- Quitar productos de una carta.
- Cambiar orden de categorías y productos.
- Configurar precios específicos.
- Cambiar disponibilidad.

---

# 9. Carta pública y experiencia del visitante

## Página del negocio

Ruta:

`/[tenantSlug]`

Debe mostrar:

- Nombre comercial.
- Logo, si existe.
- Descripción, si existe.
- Cartas publicadas.
- Acceso a cada carta.
- Diseño responsive.

Si el negocio está suspendido o no existe, mostrar una página adecuada sin revelar datos internos.

## Página de una carta

Ruta:

`/[tenantSlug]/menu/[menuSlug]`

Debe mostrar:

- Identidad visual del negocio.
- Nombre y descripción de la carta.
- Categorías ordenadas.
- Productos publicados.
- Fotografías.
- Descripciones.
- Precios.
- Disponibilidad.
- Acceso al carrito.

La página debe poder abrirse directamente desde una URL compartida.

## SEO

Utilizar las capacidades de Next.js para generar:

- Títulos específicos por negocio y carta.
- Descripciones.
- URLs canónicas cuando corresponda.
- Open Graph para compartir enlaces.
- Sitemap y robots cuando sean apropiados.
- Datos estructurados únicamente cuando los datos reales permitan generarlos correctamente.

Las cartas públicas deben renderizarse de forma que el contenido principal esté disponible sin depender exclusivamente de JavaScript en el navegador.

No indexar el panel administrativo, las páginas de login ni los recursos privados.

---

# 10. Carrito y pedido por WhatsApp

El carrito se implementará inicialmente en el cliente, sin persistencia de órdenes en el backend.

## Funcionalidades

- Agregar productos.
- Incrementar y reducir cantidades.
- Eliminar productos.
- Añadir observaciones por producto.
- Mostrar subtotal por línea.
- Mostrar total estimado.
- Limpiar carrito.
- Solicitar confirmación antes de abandonar un pedido si fuera necesario.

El carrito debe mantener la identidad de los productos y el contexto de la carta.

## Validación de precios

No confiar en los precios enviados por el navegador.

Antes de generar el mensaje, obtener o validar en el servidor:

- Que el negocio esté activo.
- Que la carta esté publicada.
- Que cada producto siga disponible.
- Que cada producto corresponda al negocio.
- Que las cantidades sean válidas.
- Que los precios correspondan a la configuración actual.

Si cambió un precio, informar al usuario y actualizar el carrito antes de continuar.

No hace falta crear una orden persistida, pero sí generar el mensaje a partir de datos verificados.

## Mensaje de WhatsApp

Ejemplo:

```text
Hola, quiero realizar este pedido:

2 x Hamburguesa clásica — $18.000
1 x Papas fritas — $4.000
2 x Gaseosa — $5.000

Total estimado: $27.000

Observaciones:
- Hamburguesa 1: sin cebolla

Nombre: Juan
Modalidad: Retiro por el local

¿Me confirman el pedido y el tiempo de demora?
```

Los importes son ilustrativos.

El número de WhatsApp se obtendrá de `TenantSettings`.

Generar un enlace compatible con `https://wa.me/` y codificar correctamente el mensaje.

Validar el número en formato internacional, utilizando los dígitos apropiados para el enlace.

El negocio deberá confirmar el pedido, su disponibilidad, el precio final y el tiempo de entrega o retiro.

No afirmar que el pedido fue recibido o confirmado por el negocio.

---

# 11. Panel administrativo

## Inicio

Mostrar accesos rápidos a:

- Cartas.
- Productos.
- Categorías.
- Configuración.
- Abrir carta pública.

No construir estadísticas de ventas porque no se registrarán pedidos.

## Formularios

Todos los formularios deben:

- Validarse en cliente y servidor.
- Mostrar errores comprensibles.
- Prevenir envíos duplicados.
- Mostrar estados de carga.
- Informar el resultado de la operación.
- Mantener valores cuando una validación falla.
- Evitar enviar información sensible.

## Imágenes

El administrador debe poder:

- Subir una imagen.
- Ver una previsualización.
- Cambiar texto alternativo.
- Ordenar imágenes.
- Eliminar o reemplazar imágenes.

Validar tipo MIME, tamaño y permisos. No confiar únicamente en la extensión del archivo.

Las claves de almacenamiento deben mantenerse exclusivamente en el servidor.

---

# 12. Diseño y experiencia de usuario

La interfaz debe ser moderna, simple y mobile-first.

## Carta pública

Prioridades:

- Fotografías claras.
- Tipografía legible.
- Navegación rápida entre categorías.
- Precios visibles.
- Botones grandes para agregar productos.
- Carrito accesible desde dispositivos móviles.
- Buen contraste.
- Estados claros para productos no disponibles.
- Buen rendimiento con conexiones móviles.

## Administración

Prioridades:

- Formularios claros.
- Navegación consistente.
- Tablas o listados fáciles de usar.
- Confirmaciones antes de operaciones destructivas.
- Estados vacíos con instrucciones.
- Mensajes de error útiles.
- Diseño usable desde computadora y tablet.

## Personalización

Usar una plantilla compartida con opciones configurables:

- Logo.
- Colores.
- Tipografía dentro de un conjunto permitido.
- Visibilidad de imágenes y descripciones.
- Estilo general de tarjetas.

No desarrollar múltiples frontends independientes.

La configuración debe aplicarse mediante variables de tema y componentes reutilizables.

---

# 13. Seguridad

La seguridad es una condición de aceptación, no una fase opcional.

## Requisitos

- Autenticación segura.
- Autorización del lado del servidor.
- Validación de pertenencia al tenant en todas las operaciones privadas.
- Validación de parámetros y payloads.
- Protección contra acceso directo a recursos ajenos.
- Hashing seguro de contraseñas.
- Cookies de sesión con configuración segura.
- Protección de endpoints administrativos.
- Límites razonables para subida de archivos.
- Manejo seguro de errores.
- Variables de entorno privadas.
- Dependencias actualizadas y revisadas.
- Protección frente a operaciones masivas no autorizadas.
- Política de borrado y archivado consistente.

No registrar contraseñas, tokens, cadenas de conexión ni datos sensibles en logs.

No utilizar `tenantId` enviado por el navegador como única fuente de autorización.

Las rutas públicas deben exponer solamente los campos necesarios para mostrar la carta.

Las pruebas de seguridad deben incluir intentos de acceso cruzado entre dos tenants.

---

# 14. Pruebas y calidad

## Pruebas unitarias

Probar:

- Resolución de precios.
- Validación de cantidades.
- Cálculo del total.
- Disponibilidad efectiva.
- Generación del mensaje de WhatsApp.
- Validación de slugs.
- Reglas de autorización.
- Validación de relaciones multitenant.

## Pruebas de integración

Probar:

- Crear y modificar cartas.
- Agregar categorías.
- Agregar productos.
- Aplicar precios específicos.
- Publicar y despublicar cartas.
- Consultar una carta pública.
- Intentar modificar recursos de otro negocio.
- Intentar asociar productos de distintos negocios.

## Pruebas end-to-end

Utilizar Playwright para verificar los flujos principales:

1. Acceso al panel.
2. Inicio de sesión.
3. Creación de una carta.
4. Creación de categorías y productos.
5. Publicación de la carta.
6. Apertura de la URL pública.
7. Armado del carrito.
8. Generación del mensaje de WhatsApp.
9. Acceso denegado a recursos ajenos.
10. Visualización correcta en un viewport móvil.

## Criterios de calidad

- TypeScript estricto.
- Linter y formato consistentes.
- Sin errores de compilación.
- Migraciones aplicables desde una base limpia.
- Pruebas críticas ejecutadas.
- Sin secretos en el repositorio.
- Sin errores de aislamiento multitenant.
- Sin dependencias innecesarias.

No marcar una fase como terminada si falla un criterio obligatorio.

---

# 15. Despliegue y ambientes

## Desarrollo local

Configurar:

- Node.js en una versión LTS compatible con la versión elegida de Next.js.
- npm como gestor de paquetes, salvo que el repositorio ya tenga otro definido.
- Variables de entorno locales.
- Base de datos de desarrollo en Neon o PostgreSQL local.
- Migraciones de Prisma.
- Scripts de desarrollo, lint, tipos y pruebas.

## Variables de entorno

Definir un archivo `.env.example` sin secretos reales.

Variables esperadas, según las soluciones elegidas:

```text
DATABASE_URL=
DIRECT_URL=
AUTH_SECRET=
APP_URL=
STORAGE_PROVIDER=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

`DIRECT_URL` solo debe existir si la configuración elegida de Prisma necesita una conexión directa separada para migraciones.

Los nombres y requisitos definitivos deben validarse con las versiones instaladas.

No incluir valores reales en `.env.example`.

## Neon

- Crear una base de desarrollo.
- Crear una base o entorno separado para producción.
- Configurar las conexiones apropiadas.
- Usar pooling cuando corresponda para la aplicación.
- Ejecutar migraciones de forma controlada.
- Verificar las políticas de retención y recuperación disponibles en el plan.
- Evitar ejecutar migraciones destructivas automáticamente al iniciar cada instancia de la aplicación.

## Vercel

- Conectar el repositorio de GitHub.
- Configurar variables por entorno.
- Habilitar previews para cambios.
- Configurar el dominio cuando corresponda.
- Verificar que los secretos no aparezcan en el bundle del cliente.
- Probar el flujo completo en el despliegue de preview antes de publicar.

## Almacenamiento

Elegir un proveedor compatible con el presupuesto inicial.

Antes de implementar, confirmar:

- Nivel gratuito vigente.
- Límites de almacenamiento y transferencia.
- Restricciones de uso comercial.
- Acceso desde Next.js.
- Eliminación de imágenes.
- Política de acceso público.
- Protección de credenciales.

---

# 16. Fases de implementación

## Fase 1 — Fundación técnica

Tareas:

- Inspeccionar el repositorio.
- Inicializar Next.js si es necesario.
- Configurar TypeScript y Tailwind.
- Configurar lint y formato.
- Configurar Prisma.
- Crear la conexión a Neon.
- Preparar variables de entorno.
- Crear una página inicial.
- Configurar GitHub y Vercel.
- Documentar los comandos del proyecto.

Criterios de aceptación:

- El proyecto se ejecuta localmente.
- La aplicación se despliega en Vercel.
- La conexión a Neon funciona.
- No hay secretos en el repositorio.
- La compilación y las comprobaciones pasan.

## Fase 2 — Multitenancy y autenticación

Tareas:

- Implementar `Tenant`, `User` y `TenantUser`.
- Implementar `TenantSettings`.
- Implementar autenticación.
- Crear el contexto de tenant.
- Crear la resolución por slug.
- Crear autorización centralizada.
- Crear fixtures o seeds para pruebas.
- Probar acceso cruzado.

Criterios de aceptación:

- Un usuario autenticado solo administra los negocios autorizados.
- El servidor nunca confía en el tenant enviado por el cliente.
- Dos negocios de prueba permanecen aislados.
- Los usuarios sin sesión no acceden a rutas privadas.
- Las pruebas de autorización pasan.

## Fase 3 — Administración de cartas y catálogo

Tareas:

- Implementar `Menu`.
- Implementar `Category`.
- Implementar `MenuCategory`.
- Implementar `Product`.
- Implementar `MenuItem`.
- Implementar `ProductImage`.
- Construir formularios y listados.
- Implementar subida de imágenes.
- Implementar precios específicos.
- Implementar ordenamiento y disponibilidad.

Criterios de aceptación:

- Un negocio administra sus cartas y productos.
- Un producto puede aparecer en varias cartas.
- Los precios específicos funcionan.
- No es posible cruzar relaciones entre tenants.
- Los cambios se reflejan en los datos públicos.

## Fase 4 — Carta pública

Tareas:

- Implementar página del negocio.
- Implementar página de carta.
- Implementar navegación por categorías.
- Implementar tarjetas de productos.
- Aplicar tema del negocio.
- Implementar metadatos y SEO.
- Optimizar imágenes.
- Probar responsive.

Criterios de aceptación:

- Las cartas publicadas se muestran correctamente.
- Las cartas en borrador no se muestran públicamente.
- El slug identifica al negocio correcto.
- Las páginas son accesibles directamente mediante URL.
- El contenido principal está disponible para indexación.
- No se exponen datos administrativos.

## Fase 5 — Carrito y WhatsApp

Tareas:

- Implementar estado del carrito.
- Agregar y quitar productos.
- Modificar cantidades.
- Incorporar observaciones.
- Calcular subtotales y total.
- Validar precios y disponibilidad.
- Generar mensaje.
- Crear enlace a WhatsApp.
- Mostrar errores si los precios cambiaron.

Criterios de aceptación:

- El total corresponde a los productos seleccionados.
- Los precios se validan antes de generar el mensaje.
- Los productos no disponibles no pueden agregarse.
- El mensaje contiene cantidades, precios y observaciones correctos.
- El enlace abre WhatsApp con el número del negocio.
- No se afirma que el pedido quedó confirmado.

## Fase 6 — Calidad y lanzamiento

Tareas:

- Completar pruebas unitarias.
- Completar pruebas de integración.
- Completar pruebas end-to-end.
- Revisar aislamiento multitenant.
- Revisar accesibilidad y responsive.
- Revisar variables y secretos.
- Configurar dominio y HTTPS.
- Validar imágenes y rendimiento.
- Ejecutar el flujo con el primer cliente.
- Documentar operación y mantenimiento.

Criterios de aceptación:

- Todos los flujos críticos funcionan.
- No hay fallos conocidos de aislamiento.
- Las migraciones funcionan.
- La aplicación está desplegada.
- El primer negocio puede administrar su menú sin intervención técnica cotidiana.
- Existe un procedimiento de recuperación acorde a los servicios contratados.

---

# 17. Documentación que debe mantenerse

Crear y mantener:

- `README.md`: descripción, instalación y comandos.
- `docs/IMPLEMENTATION_PLAN.md`: este plan normalizado.
- `docs/PROGRESS.md`: estado de fases y tareas.
- `docs/DECISIONS.md`: decisiones arquitectónicas y motivos.
- `docs/DATABASE.md`: entidades y relaciones.
- `docs/DEPLOYMENT.md`: configuración de Vercel y Neon.
- `docs/SECURITY.md`: reglas de seguridad y multitenancy.
- `docs/TESTING.md`: estrategia y comandos de pruebas.

Actualizar los documentos cuando cambien decisiones o se complete una fase.

No crear documentación extensa que duplique información sin necesidad.

---

# 18. Comandos y flujo de trabajo de OpenCode

Al inicio de una sesión de trabajo:

1. Leer `docs/IMPLEMENTATION_PLAN.md`.
2. Leer `docs/PROGRESS.md`.
3. Leer `docs/DECISIONS.md`.
4. Inspeccionar los archivos relacionados con la tarea.
5. Identificar la siguiente tarea pendiente.
6. Proponer un plan pequeño.
7. Implementar.
8. Ejecutar las pruebas.
9. Revisar los cambios.
10. Actualizar la documentación.

No asumir que el contexto de conversaciones anteriores está disponible. Los documentos del repositorio son la fuente de verdad.

## Prompt para comenzar

Utilizar este prompt con OpenCode:

> Leé las instrucciones del repositorio y el documento `docs/IMPLEMENTATION_PLAN.md` completo. Inspeccioná el estado actual del proyecto y revisá `docs/PROGRESS.md` y `docs/DECISIONS.md` si existen.
>
> No implementes toda la aplicación de una sola vez.
>
> Identificá la siguiente fase pendiente y sus dependencias. Presentá un plan concreto de los archivos que vas a crear o modificar y los criterios de aceptación.
>
> Si el repositorio está vacío y todavía no existe documentación, comenzá por normalizar el plan maestro y crear los documentos de seguimiento.
>
> Si la fase siguiente es la Fase 1, implementala solamente después de completar la inspección.
>
> Al terminar, ejecutá las comprobaciones pertinentes, informá los resultados reales y actualizá `docs/PROGRESS.md`, `docs/DECISIONS.md` y el README cuando corresponda.
>
> No declares pruebas exitosas si no fueron ejecutadas. No inventes credenciales, configuraciones ni resultados. No avances a fases posteriores sin completar la actual y verificar sus criterios de aceptación.

---

# 19. Definición de terminado del MVP

El MVP se considera terminado cuando:

1. Un administrador puede iniciar sesión.
2. Puede administrar un negocio.
3. Puede crear varias cartas.
4. Puede administrar productos y categorías.
5. Puede reutilizar productos entre cartas.
6. Puede configurar precios, imágenes y disponibilidad.
7. Puede publicar cartas accesibles mediante URL.
8. Los visitantes pueden armar un pedido.
9. El pedido se puede enviar mediante WhatsApp.
10. Las páginas funcionan en dispositivos móviles.
11. Los datos de los negocios están aislados.
12. Las pruebas críticas pasan.
13. La aplicación está desplegada en Vercel.
14. PostgreSQL funciona en Neon.
15. El primer cliente puede utilizar el sistema.

**Principio final:** priorizar una implementación pequeña, segura y verificable. Primero conseguir que un negocio pueda administrar sus cartas y recibir pedidos por WhatsApp; después validar las necesidades reales antes de ampliar el producto.