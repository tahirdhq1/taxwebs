import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { calculators } from "@/lib/calculators";
import { DisclaimerNote, FilerToggle } from "./calc-ui";

export function CalculatorShell({
  showToggle = true,
  currentPath,
  children,
}: {
  showToggle?: boolean;
  currentPath: string;
  children: ReactNode;
}) {
  const related = calculators.filter((c) => c.to !== currentPath).slice(0, 4);

  return (
    <>
      {showToggle ? <FilerToggle /> : null}
      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-8">{children}</div>

        <section className="mt-12">
          <h2 className="font-display text-lg font-bold text-ink">Other calculators</h2>
          <div className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2">
            {related.map((c) => (
              <Link
                key={c.to}
                to={c.to}
                className="surface-card flex min-w-0 items-center gap-3 p-4 transition-colors hover:bg-secondary"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <c.icon size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-ink">{c.title}</span>
                  <span className="block truncate text-xs text-muted-foreground">{c.short}</span>
                </span>
                <ArrowRight size={16} className="ml-auto shrink-0 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-10 rounded-2xl border border-border bg-secondary p-5">
          <DisclaimerNote />
        </div>
      </main>
    </>
  );
}
