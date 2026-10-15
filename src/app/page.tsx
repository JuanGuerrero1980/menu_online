export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Resto Menu Online
      </h1>
      <p className="mt-6 max-w-xl text-lg text-muted-foreground">
        Cartas digitales para negocios gastronómicos. Próximamente: menús
        públicos, panel administrativo y pedidos por WhatsApp.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <span className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background">
          Fase 1 completada
        </span>
        <span className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground">
          Prisma + Next.js listos
        </span>
      </div>
    </main>
  );
}
