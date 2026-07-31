import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalculatorShell } from "@/components/site/calculator-shell";
import {
  AmountInput,
  CalcCard,
  Callout,
  ComparisonResult,
  ExplainerGrid,
  Field,
  PageHeader,
  RateTable,
} from "@/components/site/calc-ui";
import { annualVehicleTax, formatPKR, rates } from "@/lib/taxRates";

export const Route = createFileRoute("/annual-vehicle-tax-calculator")({
  head: () => ({
    meta: [
      { title: "Annual Motor Vehicle Tax Calculator Pakistan (Section 234)" },
      {
        name: "description",
        content:
          "Calculate the yearly Section 234 motor vehicle advance tax by engine capacity in Pakistan. Non-filers pay double the filer amount.",
      },
      { property: "og:title", content: "Annual Motor Vehicle Tax Calculator (234)" },
      {
        property: "og:description",
        content: "The yearly tax collected with your token — filer vs non-filer amounts by cc.",
      },
      { property: "og:url", content: "/annual-vehicle-tax-calculator" },
    ],
    links: [{ rel: "canonical", href: "/annual-vehicle-tax-calculator" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Annual Motor Vehicle Tax Calculator (234)",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" },
        }),
      },
    ],
  }),
  component: AnnualVehicleCalculator,
});

function AnnualVehicleCalculator() {
  const [cc, setCc] = useState<number | "">(1300);
  const engine = cc === "" ? 0 : cc;
  const { slab, filer, nonFiler } = annualVehicleTax(engine);

  return (
    <CalculatorShell currentPath="/annual-vehicle-tax-calculator">
      <PageHeader
        eyebrow="Section 234"
        title="Annual Motor Vehicle Tax Calculator"
        intro="A fixed rupee amount of advance income tax collected every year alongside your motor vehicle token. It depends only on engine capacity and your filer status — not on the car's value."
      />

      <CalcCard title="Your vehicle">
        <Field label="Engine capacity (cc)">
          <AmountInput value={cc} onChange={setCc} prefix="cc" placeholder="1300" />
        </Field>

        <ComparisonResult
          filerAmount={filer}
          nonFilerAmount={nonFiler}
          filerNote={`Fixed amount for ${slab.label}`}
          nonFilerNote={`Fixed amount for ${slab.label}`}
          caption="Charged once a year, usually collected with your token tax at the excise office or online."
          copyText={`Annual motor vehicle tax (Section 234) for a ${slab.label} car: Filer ${formatPKR(filer)} vs Non-Filer ${formatPKR(nonFiler)}. Calculated on Filer Tax PK.`}
        />
      </CalcCard>

      <Callout tone="warn" title="This is not the registration tax">
        <p>
          Section 234 is the recurring yearly tax. The one-off percentage charged when a car is
          registered or transferred is Section 231B — people mix these two up constantly.
        </p>
      </Callout>

      <ExplainerGrid
        items={[
          {
            q: "What is this tax?",
            a: "Advance income tax on motor vehicles, collected annually as a flat rupee amount per engine capacity slab.",
          },
          {
            q: "Who pays it?",
            a: "The registered owner of the vehicle, at the time of paying the annual token.",
          },
          {
            q: "How much more do non-filers pay?",
            a: "Exactly double at every slab — for example Rs. 5,000 instead of Rs. 2,500 on a 1300–1499cc car, every single year.",
          },
        ]}
      />

      <div className="min-w-0">
        <h2 className="mb-3 font-display text-lg font-bold text-ink">
          Section 234 rate table (FY {rates.year})
        </h2>
        <RateTable
          columns={["Engine capacity", "Filer", "Non-Filer"]}
          rows={rates.annualVehicle.slabs.map((s) => [
            s.label,
            formatPKR(s.filer),
            formatPKR(s.nonFiler),
          ])}
          caption="Fixed annual rupee amounts. Edit src/lib/taxRates.ts to update these for a new fiscal year."
        />
      </div>
    </CalculatorShell>
  );
}
