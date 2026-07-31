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
  SelectInput,
  SingleResult,
} from "@/components/site/calc-ui";
import { electricityTax, formatPKR, rates, type ElectricityConsumer } from "@/lib/taxRates";

export const Route = createFileRoute("/electricity-bill-tax-calculator")({
  head: () => ({
    meta: [
      { title: "Electricity Bill Tax Calculator Pakistan (Section 235)" },
      {
        name: "description",
        content:
          "Calculate the Section 235 advance tax on your monthly electricity bill in Pakistan for domestic, commercial and industrial connections.",
      },
      { property: "og:title", content: "Electricity Bill Tax Calculator (235)" },
      {
        property: "og:description",
        content:
          "Non-filer domestic bills of Rs. 25,000 or more carry 7.5% advance tax. Check yours.",
      },
      { property: "og:url", content: "/electricity-bill-tax-calculator" },
    ],
    links: [{ rel: "canonical", href: "/electricity-bill-tax-calculator" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Electricity Bill Tax Calculator (235)",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" },
        }),
      },
    ],
  }),
  component: ElectricityCalculator,
});

function ElectricityCalculator() {
  const [bill, setBill] = useState<number | "">(30000);
  const [consumer, setConsumer] = useState<ElectricityConsumer>("domestic");

  const value = bill === "" ? 0 : bill;
  const filerTax = electricityTax(value, consumer, "filer");
  const nonFilerTax = electricityTax(value, consumer, "non-filer");
  const e = rates.electricity;

  return (
    <CalculatorShell currentPath="/electricity-bill-tax-calculator">
      <PageHeader
        eyebrow="Section 235"
        title="Electricity Bill Tax Calculator"
        intro="Advance income tax charged on your monthly electricity bill. Domestic consumers are only affected if they are not on the ATL; commercial and industrial connections pay on a tiered scale regardless."
      />

      <CalcCard title="Your connection">
        <Field label="Consumer type">
          <SelectInput
            value={consumer}
            onChange={setConsumer}
            options={[
              { value: "domestic", label: "Domestic (home)" },
              { value: "commercial", label: "Commercial" },
              { value: "industrial", label: "Industrial" },
            ]}
          />
        </Field>

        <Field label="Monthly bill amount">
          <AmountInput value={bill} onChange={setBill} />
        </Field>

        {consumer === "domestic" ? (
          <ComparisonResult
            filerAmount={filerTax}
            nonFilerAmount={nonFilerTax}
            filerNote="Not applicable to domestic consumers on the ATL."
            nonFilerNote={
              value >= e.domesticNonFiler.exemptUnder
                ? `${e.domesticNonFiler.rate}% flat of the full bill.`
                : `Bills under ${formatPKR(e.domesticNonFiler.exemptUnder)} are exempt.`
            }
            caption={`Charged every month — that is ${formatPKR(nonFilerTax * 12)} a year at this bill level.`}
            copyText={`Electricity advance tax (Section 235) on a ${formatPKR(value)} domestic bill: Filer ${formatPKR(filerTax)} vs Non-Filer ${formatPKR(nonFilerTax)}. Calculated on Filer Tax PK.`}
          />
        ) : (
          <SingleResult
            label={`Advance tax on a ${consumer} bill`}
            amount={nonFilerTax}
            caption={`Tiered calculation applied: nothing up to ${formatPKR(e.business.exemptUpTo)}, ${e.business.midRate}% up to ${formatPKR(e.business.midUpperLimit)}, then ${formatPKR(e.business.upperFixed)} plus ${consumer === "commercial" ? e.business.upperRateCommercial : e.business.upperRateIndustrial}% of the excess. Filer status does not change this tier.`}
            copyText={`Electricity advance tax (Section 235) on a ${formatPKR(value)} ${consumer} bill = ${formatPKR(nonFilerTax)}. Calculated on Filer Tax PK.`}
          />
        )}
      </CalcCard>

      <ExplainerGrid
        items={[
          {
            q: "What is this tax?",
            a: "Advance income tax collected by your electricity distribution company and shown as a line item on the bill.",
          },
          {
            q: "Who pays it?",
            a: "Commercial and industrial consumers on every bill above Rs. 500, and domestic consumers only when they are not on the ATL.",
          },
          {
            q: "How much more do non-filers pay?",
            a: `A domestic non-filer with a ${formatPKR(30000)} monthly bill pays ${formatPKR(electricityTax(30000, "domestic", "non-filer"))} a month — around ${formatPKR(electricityTax(30000, "domestic", "non-filer") * 12)} a year that a filer simply does not pay.`,
          },
        ]}
      />

      <div className="min-w-0">
        <h2 className="mb-3 font-display text-lg font-bold text-ink">
          Section 235 rate table (FY {rates.year})
        </h2>
        <RateTable
          columns={["Bill amount", "Domestic (non-ATL)", "Commercial", "Industrial"]}
          rows={[
            [`Up to ${formatPKR(e.business.exemptUpTo)}`, "0%", "0%", "0%"],
            [
              `${formatPKR(e.business.exemptUpTo)} – ${formatPKR(e.business.midUpperLimit)}`,
              `0% (below ${formatPKR(e.domesticNonFiler.exemptUnder)})`,
              `${e.business.midRate}%`,
              `${e.business.midRate}%`,
            ],
            [
              `Above ${formatPKR(e.business.midUpperLimit)}`,
              `${e.domesticNonFiler.rate}% flat`,
              `${formatPKR(e.business.upperFixed)} + ${e.business.upperRateCommercial}% of excess`,
              `${formatPKR(e.business.upperFixed)} + ${e.business.upperRateIndustrial}% of excess`,
            ],
          ]}
          caption={`Domestic consumers on the ATL are not charged. Domestic non-ATL bills of ${formatPKR(e.domesticNonFiler.exemptUnder)} or more are taxed at ${e.domesticNonFiler.rate}% flat.`}
        />
      </div>

      <Callout title="Why this one adds up fastest">
        <p>
          Unlike property or vehicle tax, this hits every single month. It is often the largest
          recurring non-filer penalty for an ordinary household.
        </p>
      </Callout>
    </CalculatorShell>
  );
}
