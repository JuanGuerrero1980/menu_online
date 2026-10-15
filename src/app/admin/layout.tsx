import { requireAuth } from "@/lib/tenant/tenant";
import { redirect } from "next/navigation";

export const instant = false;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAuth();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border px-6 py-4">
        <h1 className="text-lg font-semibold">Resto Menu Online — Admin</h1>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </header>
      <main className="flex-1 px-6 py-8">{children}</main>
    </div>
  );
}
