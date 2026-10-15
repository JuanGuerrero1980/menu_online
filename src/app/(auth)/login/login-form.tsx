"use client";

import { useSearchParams } from "next/navigation";
import { loginAction } from "@/modules/auth/actions";

export function LoginForm() {
  const searchParams = useSearchParams();
  const hasError = searchParams.get("error") === "invalid";

  return (
    <form action={loginAction} className="space-y-4">
      {hasError && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          Credenciales inválidas. Intente nuevamente.
        </p>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
      >
        Ingresar
      </button>
    </form>
  );
}
