import { hash } from "bcryptjs";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaNeon({
  connectionString: process.env.DIRECT_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await hash("Admin1234!", 12);

  const tenantA = await prisma.tenant.upsert({
    where: { slug: "la-esquina" },
    update: {},
    create: {
      name: "La Esquina",
      slug: "la-esquina",
      status: "ACTIVE",
      settings: {
        create: {
          whatsappPhone: "+5493512345678",
          currency: "ARS",
          timezone: "America/Argentina/Cordoba",
        },
      },
    },
  });

  const tenantB = await prisma.tenant.upsert({
    where: { slug: "el-rincon" },
    update: {},
    create: {
      name: "El Rincón",
      slug: "el-rincon",
      status: "ACTIVE",
      settings: {
        create: {
          whatsappPhone: "+5493518765432",
          currency: "ARS",
          timezone: "America/Argentina/Cordoba",
        },
      },
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: { passwordHash },
    create: {
      name: "Administrador",
      email: "admin@example.com",
      passwordHash,
    },
  });

  await prisma.tenantUser.upsert({
    where: {
      tenantId_userId: {
        tenantId: tenantA.id,
        userId: user.id,
      },
    },
    update: {},
    create: {
      tenantId: tenantA.id,
      userId: user.id,
      role: "OWNER",
    },
  });

  await prisma.tenantUser.upsert({
    where: {
      tenantId_userId: {
        tenantId: tenantB.id,
        userId: user.id,
      },
    },
    update: {},
    create: {
      tenantId: tenantB.id,
      userId: user.id,
      role: "ADMIN",
    },
  });

  console.log("Seed completado:");
  console.log(`- Tenant A: ${tenantA.name} (${tenantA.slug})`);
  console.log(`- Tenant B: ${tenantB.name} (${tenantB.slug})`);
  console.log(`- Usuario: ${user.email} / Admin1234!`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
