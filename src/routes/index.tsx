import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, ShieldCheck, Wallet } from "lucide-react";
import { calculators } from "@/lib/calculators";
import { LAST_UPDATED, formatPKR, rates } from "@/lib/taxRates";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Filer Tax PK — Filer vs Non-Filer Withholding Tax Calculators" },
      {
        name: "description",
        content:
          "Free Pakistan withholding tax calculators. See exactly how much extra tax you pay as a non-filer on property, vehicles, cash withdrawals, bank profit and bills.",
      },
      { property: "og:title", content: "Filer vs Non-Filer Tax Calculators for Pakistan" },
      {
        property: "og:description",
        content:
          "Work out property, vehicle, cash withdrawal, bank profit, mobile and electricity withholding tax — and the non-filer penalty.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const bigCar = rates.vehicleRegistration.slabs.find((s) => s.label === "1301 – 1600cc")!;

  return (
    <main>
      <section className="gradient-deep">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <p className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-semibold text-primary-foreground">
            <BadgeCheck size={14} className="text-gold" />
            Rates updated per FBR Finance Act 2026
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-3xl font-extrabold leading-tight text-primary-foreground sm:text-5xl">
            Are you paying too much tax because you&apos;re not a filer?
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-primary-foreground/85 sm:text-lg">
            In Pakistan, &ldquo;filer&rdquo; simply means your name appears on FBR&apos;s Active
            Taxpayer List (ATL) because you filed your last income tax return. A
            &ldquo;non-filer&rdquo; is anyone not on that list. The difference isn&apos;t just
            paperwork — banks, excise offices and utilities deduct withholding tax from non-filers
            at two to three times the filer rate. That extra money is deducted at the moment of the
            transaction, whether you notice it or not.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/filer-status-checker"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-4 text-sm font-bold text-gold-foreground transition-opacity hover:opacity-90"
            >
              Check my ATL / Filer status
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/savings-summary"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary-foreground/30 px-6 py-4 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              Estimate my yearly non-filer cost
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              {
                k: "0.8%",
                v: `Cash withdrawal tax non-filers pay above ${formatPKR(rates.cashWithdrawal.dailyThreshold)} a day`,
              },
              {
                k: `${bigCar.nonFiler}%`,
                v: "Vehicle registration tax on a 1300–1600cc car for non-filers, vs 2% for filers",
              },
              { k: "40%", v: "Withholding on bank profit for non-filers, vs 20% for filers" },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-5"
              >
                <p className="num font-display text-2xl font-bold text-gold">{s.k}</p>
                <p className="mt-1 text-xs leading-relaxed text-primary-foreground/80">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="font-display text-2xl font-bold text-ink">Pick a calculator</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Every tool is free, works in your browser and stores nothing. Section numbers are
          explained in plain English on each page.
        </p>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {calculators.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="surface-card group flex flex-col gap-3 p-5 transition-shadow hover:shadow-[var(--shadow-lift)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                <c.icon size={20} />
              </span>
              <span>
                <span className="block font-display text-base font-bold text-ink">{c.title}</span>
                <span className="mt-1 block text-xs font-semibold uppercase tracking-wider text-primary">
                  Section {c.section}
                </span>
              </span>
              <span className="text-sm leading-relaxed text-muted-foreground">{c.short}</span>
              <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-primary">
                Open calculator
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              t: "Sourced from FBR",
              d: `Rate cards from the Finance Act 2025 and Finance Act 2026, last reviewed ${LAST_UPDATED}.`,
            },
            {
              icon: Wallet,
              t: "No signup, no tracking",
              d: "Calculations run entirely in your browser. We never see or store your numbers.",
            },
            {
              icon: BadgeCheck,
              t: "Plain-English explanations",
              d: "Every section — 236C, 231AB, 234 — explained without legal jargon.",
            },
          ].map((f) => (
            <div key={f.t} className="flex gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                <f.icon size={18} />
              </span>
              <span className="min-w-0">
                <span className="block font-display text-sm font-bold text-ink">{f.t}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                  {f.d}
                </span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="rounded-3xl gradient-deep p-8 sm:p-12">
          <h2 className="font-display text-2xl font-bold text-primary-foreground sm:text-3xl">
            Not sure whether you&apos;re on the ATL?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/85">
            It takes about a minute to check on FBR&apos;s official portal with your CNIC. Our guide
            walks you through it step by step and shows what changes once you&apos;re listed.
          </p>
          <Link
            to="/filer-status-checker"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-4 text-sm font-bold text-gold-foreground"
          >
            Check my ATL / Filer status
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
