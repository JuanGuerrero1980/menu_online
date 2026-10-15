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

  // Seed sample categories and products for tenant A
  const categoryA = await prisma.category.upsert({
    where: { id: "00000000-0000-0000-0000-000000000001" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000001",
      tenantId: tenantA.id,
      name: "Hamburguesas",
      description: "Hamburguesas clásicas y especiales",
    },
  });

  const categoryB = await prisma.category.upsert({
    where: { id: "00000000-0000-0000-0000-000000000002" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000002",
      tenantId: tenantA.id,
      name: "Bebidas",
      description: "Gaseosas, aguas y cervezas",
    },
  });

  await prisma.product.upsert({
    where: { id: "00000000-0000-0000-0000-000000000003" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000003",
      tenantId: tenantA.id,
      name: "Hamburguesa clásica",
      description: "Carne, lechuga, tomate y queso",
      basePrice: 18000,
      status: "ACTIVE",
    },
  });

  await prisma.product.upsert({
    where: { id: "00000000-0000-0000-0000-000000000004" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000004",
      tenantId: tenantA.id,
      name: "Papas fritas",
      description: "Porción individual",
      basePrice: 4000,
      status: "ACTIVE",
    },
  });

  await prisma.product.upsert({
    where: { id: "00000000-0000-0000-0000-000000000005" },
    update: {},
    create: {
      id: "00000000-0000-0000-0000-000000000005",
      tenantId: tenantA.id,
      name: "Gaseosa",
      description: "500ml",
      basePrice: 2500,
      status: "ACTIVE",
    },
  });

  console.log("Seed completado:");
  console.log(`- Tenant A: ${tenantA.name} (${tenantA.slug})`);
  console.log(`- Tenant B: ${tenantB.name} (${tenantB.slug})`);
  console.log(`- Usuario: ${user.email} / Admin1234!`);
  console.log(`- Categorías: ${categoryA.name}, ${categoryB.name}`);
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
