export function MenuPageSkeleton() {
  return (
    <main className="min-h-screen px-4 py-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="space-y-2 text-center">
          <div className="mx-auto h-4 w-32 animate-pulse rounded-md bg-muted" />
          <div className="mx-auto h-8 w-56 animate-pulse rounded-md bg-muted" />
          <div className="mx-auto h-4 w-72 animate-pulse rounded-md bg-muted" />
        </header>

        <div className="space-y-8">
          {[1, 2].map((category) => (
            <section key={category}>
              <div className="mb-4 h-6 w-40 animate-pulse rounded-md bg-muted" />
              <div className="grid gap-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex gap-4 rounded-xl border border-border p-4"
                  >
                    <div className="h-24 w-24 animate-pulse rounded-lg bg-muted" />
                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div className="space-y-2">
                        <div className="h-5 w-48 animate-pulse rounded-md bg-muted" />
                        <div className="h-4 w-full animate-pulse rounded-md bg-muted" />
                      </div>
                      <div className="h-5 w-20 animate-pulse rounded-md bg-muted" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
