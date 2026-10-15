"use client";

import { useTheme } from "@/modules/theme/context";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-1 text-sm">
      <button
        type="button"
        onClick={() => setTheme("light")}
        className={`rounded-md px-3 py-1 transition ${
          theme === "light"
            ? "bg-foreground text-background"
            : "hover:bg-accent"
        }`}
      >
        Claro
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        className={`rounded-md px-3 py-1 transition ${
          theme === "dark"
            ? "bg-foreground text-background"
            : "hover:bg-accent"
        }`}
      >
        Oscuro
      </button>
      <button
        type="button"
        onClick={() => setTheme("system")}
        className={`rounded-md px-3 py-1 transition ${
          theme === "system"
            ? "bg-foreground text-background"
            : "hover:bg-accent"
        }`}
      >
        Sistema
      </button>
      <span className="px-2 text-xs text-muted-foreground">
        ({resolvedTheme})
      </span>
    </div>
  );
}
