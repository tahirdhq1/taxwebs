import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { calculators } from "@/lib/calculators";

export const Route = createFileRoute("/calculators")({
  head: () => ({
    meta: [
      { title: "All Pakistan Withholding Tax Calculators — Filer Tax PK" },
      {
        name: "description",
        content:
          "Every Filer Tax PK calculator in one place: property, vehicle, cash withdrawal, bank profit, mobile, electricity and annual vehicle tax.",
      },
      { property: "og:title", content: "All Pakistan Withholding Tax Calculators" },
      {
        property: "og:description",
        content: "Free filer vs non-filer withholding tax tools for Pakistan.",
      },
      { property: "og:url", content: "/calculators" },
    ],
    links: [{ rel: "canonical", href: "/calculators" }],
  }),
  component: CalculatorsIndex,
});

function CalculatorsIndex() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
        All withholding tax calculators
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Transaction-based taxes that generic salary calculators skip — each one shows what a filer
        pays versus a non-filer.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {calculators.map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="surface-card flex gap-4 p-5 transition-shadow hover:shadow-[var(--shadow-lift)]"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
              <c.icon size={20} />
            </span>
            <span className="min-w-0">
              <span className="block font-display text-base font-bold text-ink">{c.title}</span>
              <span className="mt-1 block text-xs font-semibold uppercase tracking-wider text-primary">
                Section {c.section}
              </span>
              <span className="mt-2 block text-sm text-muted-foreground">{c.short}</span>
            </span>
            <ArrowRight size={16} className="ml-auto mt-1 shrink-0 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </main>
  );
}
