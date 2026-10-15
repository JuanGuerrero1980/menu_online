# Despliegue

> Guía de despliegue para desarrollo y producción.

## Desarrollo local

1. Clonar el repositorio.
2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Copiar `.env.example` a `.env` y completar los valores.
4. Generar el cliente de Prisma:

   ```bash
   npx prisma generate
   ```

5. Ejecutar migraciones (requiere `DIRECT_URL` configurado):

   ```bash
   npx prisma migrate dev
   ```

6. Iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

## Neon (PostgreSQL)

1. Crear un proyecto en [Neon](https://neon.tech).
2. Crear dos bases o entornos: `development` y `production`.
3. Obtener dos connection strings por base:
   - **Pooled connection string** (para la aplicación) → `DATABASE_URL`
   - **Direct connection string** (para migraciones) → `DIRECT_URL`
4. Guardarlas en `.env` local y en los secrets de Vercel.

## Vercel

Producción actual: https://menuonline-nzi605ofu-juanjo-guerrero.vercel.app/

1. Importar el repositorio de GitHub en Vercel.
2. Configurar las variables de entorno del proyecto:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `AUTH_SECRET`
   - `APP_URL`
   - `STORAGE_PROVIDER`
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
3. Verificar que `BUILD_COMMAND` sea `npm run build` o el default.
4. Habilitar previews para pull requests.
5. Probar el flujo completo en el despliegue de preview antes de publicar a producción.

## Comandos de verificación antes de desplegar

```bash
npm run lint
npm run typecheck
npm run build
```

## Notas

- No incluir secretos en el repositorio.
- El cliente generado de Prisma (`src/generated/prisma`) está en `.gitignore`.
- Ejecutar migraciones de forma controlada; no correr `migrate dev` automáticamente en cada inicio.
