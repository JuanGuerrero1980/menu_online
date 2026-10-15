import { Suspense } from "react";
import { requireAuth } from "@/lib/tenant/tenant";
import { redirect } from "next/navigation";
import { LoginForm } from "./login-form";

export const instant = false;

export default async function LoginPage() {
  const user = await requireAuth();
  if (user) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-center text-2xl font-semibold">
          Panel de administración
        </h1>
        <Suspense fallback={<p className="text-sm text-muted-foreground">Cargando...</p>}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
