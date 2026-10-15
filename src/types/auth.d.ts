import { TenantRole, TenantStatus } from "@/generated/prisma/enums";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      tenants: Array<{
        tenantId: string;
        role: TenantRole;
        name: string;
        slug: string;
        status: TenantStatus;
      }>;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub?: string;
    email?: string | null;
    name?: string | null;
  }
}
