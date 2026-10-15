export function TenantPageSkeleton() {
  return (
    <main className="min-h-screen px-4 py-8">
      <div className="mx-auto max-w-2xl space-y-6 text-center">
        <div className="mx-auto h-[120px] w-[120px] animate-pulse rounded-full bg-muted" />
        <div className="mx-auto h-10 w-64 animate-pulse rounded-md bg-muted" />
        <div className="mx-auto h-6 w-48 animate-pulse rounded-md bg-muted" />
        <div className="grid gap-4 pt-4">
          <div className="h-24 animate-pulse rounded-xl bg-muted" />
          <div className="h-24 animate-pulse rounded-xl bg-muted" />
        </div>
      </div>
    </main>
  );
}
