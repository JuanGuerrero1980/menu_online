import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Bienvenido al panel</h2>
      <p className="text-muted-foreground">
        Desde acá vas a poder administrar negocios, cartas, productos y
        categorías.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin"
          className="rounded-lg border border-border p-4 hover:bg-accent"
        >
          <h3 className="font-medium">Cartas</h3>
          <p className="text-sm text-muted-foreground">Próximamente</p>
        </Link>
        <Link
          href="/admin"
          className="rounded-lg border border-border p-4 hover:bg-accent"
        >
          <h3 className="font-medium">Productos</h3>
          <p className="text-sm text-muted-foreground">Próximamente</p>
        </Link>
      </div>
    </div>
  );
}
