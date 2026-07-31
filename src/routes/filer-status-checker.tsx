import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2, ExternalLink } from "lucide-react";
import { CalculatorShell } from "@/components/site/calculator-shell";
import { Callout, PageHeader, RateTable } from "@/components/site/calc-ui";
import { FBR_ATL_URL, formatPKR, rates } from "@/lib/taxRates";

export const Route = createFileRoute("/filer-status-checker")({
  head: () => ({
    meta: [
      { title: "Check Your FBR Filer / ATL Status — Step-by-Step Guide" },
      {
        name: "description",
        content:
          "How to check whether your CNIC is on FBR's Active Taxpayer List, using the official portal or SMS — plus what becoming a filer saves you.",
      },
      { property: "og:title", content: "Check My Filer (ATL) Status in Pakistan" },
      {
        property: "og:description",
        content: "A simple walkthrough of the official FBR ATL verification, plus the savings.",
      },
      { property: "og:url", content: "/filer-status-checker" },
    ],
    links: [{ rel: "canonical", href: "/filer-status-checker" }],
  }),
  component: FilerStatusChecker,
});

const steps = [
  {
    t: "Open FBR's official verification page",
    d: "Use the link below. Only use fbr.gov.pk domains — no third party can add you to the list or check it faster.",
  },
  {
    t: "Choose 'Active Taxpayer List (Income Tax)'",
    d: "Select the parameter type as CNIC for an individual, or NTN for a business.",
  },
  {
    t: "Enter your CNIC without dashes",
    d: "Then pick the relevant date — usually today — and complete the captcha.",
  },
  {
    t: "Read the result",
    d: "If your CNIC shows as 'Active', you are a filer for withholding purposes. If it shows 'Inactive' or returns no record, you are treated as a non-filer.",
  },
  {
    t: "Or check by SMS",
    d: "Type ATL, leave a space, then your 13-digit CNIC without dashes, and send it to FBR's ATL SMS service number.",
  },
];

function FilerStatusChecker() {
  const car = rates.vehicleRegistration.slabs.find((s) => s.label === "1301 – 1600cc")!;
  const token = rates.annualVehicle.slabs.find((s) => s.label === "1300 – 1499cc")!;
  const profit = rates.investment.categories[0];

  return (
    <CalculatorShell showToggle={false} currentPath="/filer-status-checker">
      <PageHeader
        eyebrow="ATL lookup guide"
        title="Check my filer (ATL) status"
        intro="We don't connect to FBR's systems — and neither should any site that asks for your CNIC. Here is how to check your status yourself on the official portal, in about a minute."
      />

      <a
        href={FBR_ATL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-4 rounded-2xl gradient-deep p-6 text-primary-foreground"
      >
        <span className="min-w-0">
          <span className="block font-display text-lg font-bold">
            Open the official FBR ATL checker
          </span>
          <span className="mt-1 block text-sm opacity-85">
            External link to e.fbr.gov.pk — the only place to verify your status
          </span>
        </span>
        <ExternalLink size={22} className="shrink-0 text-gold" />
      </a>

      <section>
        <h2 className="mb-4 font-display text-lg font-bold text-ink">Step by step</h2>
        <ol className="grid gap-3">
          {steps.map((s, i) => (
            <li key={s.t} className="surface-card flex gap-4 p-5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block font-semibold text-ink">{s.t}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                  {s.d}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <Callout tone="warn" title="A note on privacy">
        <p>
          Filer Tax PK never asks for your CNIC and does not call or scrape FBR systems. Everything
          on this site is calculated in your own browser.
        </p>
      </Callout>

      <section className="min-w-0">
        <h2 className="mb-3 font-display text-lg font-bold text-ink">
          Why becoming a filer matters
        </h2>
        <RateTable
          columns={["Tax", "Filer", "Non-Filer"]}
          rows={[
            [
              "Cash withdrawal (231AB)",
              "Not applicable",
              `${rates.cashWithdrawal.nonFilerRate}% above ${formatPKR(rates.cashWithdrawal.dailyThreshold)}/day`,
            ],
            [
              "Vehicle registration, 1301–1600cc (231B)",
              `${car.filer}% of value`,
              `${car.nonFiler}% of value`,
            ],
            [
              "Annual vehicle tax, 1300–1499cc (234)",
              formatPKR(token.filer),
              formatPKR(token.nonFiler),
            ],
            ["Bank profit (151)", `${profit.filer}%`, `${profit.nonFiler}%`],
            [
              "Domestic electricity (235)",
              "Not applicable",
              `${rates.electricity.domesticNonFiler.rate}% on bills ≥ ${formatPKR(rates.electricity.domesticNonFiler.exemptUnder)}`,
            ],
            [
              "Property purchase (236K)",
              `${rates.property.buyRate}% flat`,
              `${rates.property.buyRate}% flat`,
            ],
          ]}
          caption="Property tax is the one place where the gap has closed — Finance Act 2026 made 236C and 236K flat for everyone."
        />
      </section>

      <div className="surface-card flex flex-col gap-3 p-6">
        <p className="flex items-center gap-2 font-display text-base font-bold text-ink">
          <CheckCircle2 size={18} className="text-primary" />
          Found out you&apos;re not on the list?
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Filing a single return is usually enough to get listed, even if you owe no tax.
        </p>
        <Link
          to="/guides/$slug"
          params={{ slug: "how-to-become-a-tax-filer" }}
          className="inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
        >
          Read the filing guide
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </CalculatorShell>
  );
}
