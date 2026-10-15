import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Resto Menu Online
      </h1>
      <p className="mt-6 max-w-xl text-lg text-muted-foreground">
        Cartas digitales para negocios gastronómicos. Creá tu catálogo,
        publicá cartas y recibí pedidos por WhatsApp.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/login"
          className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background"
        >
          Panel de administración
        </Link>
        <Link
          href="/la-esquina"
          className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground"
        >
          Ver carta de ejemplo
        </Link>
      </div>
    </main>
  );
}
