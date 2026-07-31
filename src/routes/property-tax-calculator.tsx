import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalculatorShell } from "@/components/site/calculator-shell";
import {
  AmountInput,
  CalcCard,
  Callout,
  ExplainerGrid,
  Field,
  OptionGroup,
  PageHeader,
  RateTable,
  SingleResult,
} from "@/components/site/calc-ui";
import { formatPKR, pct, rates } from "@/lib/taxRates";

export const Route = createFileRoute("/property-tax-calculator")({
  head: () => ({
    meta: [
      { title: "Property Tax Calculator Pakistan 2026 (236C & 236K) — Filer Tax PK" },
      {
        name: "description",
        content:
          "Calculate withholding tax on buying or selling property in Pakistan. Finance Act 2026: 236K is 1.25% and 236C is 2.75% flat, with no non-filer penalty.",
      },
      { property: "og:title", content: "Property Purchase & Sale Tax Calculator (236C / 236K)" },
      {
        property: "og:description",
        content:
          "Flat 2.75% seller and 1.25% buyer withholding tax under Finance Act 2026 — calculate your amount instantly.",
      },
      { property: "og:url", content: "/property-tax-calculator" },
    ],
    links: [{ rel: "canonical", href: "/property-tax-calculator" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Property Purchase & Sale Tax Calculator (236C / 236K)",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" },
        }),
      },
    ],
  }),
  component: PropertyCalculator,
});

function PropertyCalculator() {
  const [type, setType] = useState<"buy" | "sell">("buy");
  const [value, setValue] = useState<number | "">(10000000);

  const amount = value === "" ? 0 : value;
  const rate = type === "buy" ? rates.property.buyRate : rates.property.sellRate;
  const section = type === "buy" ? rates.property.buySection : rates.property.sellSection;
  const tax = pct(amount, rate);

  return (
    <CalculatorShell showToggle={false} currentPath="/property-tax-calculator">
      <PageHeader
        eyebrow={`Section ${rates.property.buySection} / ${rates.property.sellSection}`}
        title="Property Purchase & Sale Tax Calculator (236C / 236K)"
        intro="Work out the advance withholding tax collected at the moment a property is transferred — paid by the buyer under 236K and by the seller under 236C."
      />

      <Callout tone="good" title="Good news for non-filers">
        <p>
          As of the Finance Act 2026, property transfer tax no longer penalises non-filers. Both
          236C and 236K are now flat rates regardless of filer status, and the old
          &ldquo;Late Filer&rdquo; tier has been abolished entirely.
        </p>
      </Callout>

      <CalcCard title="Your transaction">
        <Field label="Are you buying or selling?">
          <OptionGroup
            value={type}
            onChange={setType}
            options={[
              { value: "buy", label: "Buying (236K)" },
              { value: "sell", label: "Selling (236C)" },
            ]}
          />
        </Field>

        <Field
          label={type === "buy" ? "Fair market value of the property" : "Gross sale consideration"}
          hint="Enter the value the transfer will be recorded at."
        >
          <AmountInput value={value} onChange={setValue} />
        </Field>

        <SingleResult
          label={`Withholding tax under Section ${section}`}
          amount={tax}
          caption={`${rate}% flat of ${formatPKR(amount)} — the same whether or not you are on the ATL.`}
          copyText={`Section ${section} property tax on ${formatPKR(amount)} = ${formatPKR(tax)} (${rate}% flat, Finance Act 2026). Calculated on Filer Tax PK.`}
        />

        <Field label="Property location (optional)" hint="Recorded for your own notes only — the 2026 flat rates do not vary by urban or rural location.">
          <OptionGroup
            value={"na" as "na"}
            onChange={() => {}}
            options={[{ value: "na", label: "Rate is the same nationwide" }]}
            columns={1}
          />
        </Field>
      </CalcCard>

      <ExplainerGrid
        items={[
          {
            q: "What is this tax?",
            a: "An advance income tax collected by the registering authority when a property changes hands. It is adjustable against your annual income tax liability if you file a return.",
          },
          {
            q: "Who pays it?",
            a: "The buyer pays 236K on the fair market value. The seller pays 236C on the gross consideration received. On a normal sale, both are charged on the same deal.",
          },
          {
            q: "How much more do non-filers pay?",
            a: "Nothing extra, as of Finance Act 2026. Before this change non-filers paid up to 18.5% on purchases; the slab and filer-based structure has now been replaced by flat rates.",
          },
        ]}
      />

      <div className="min-w-0">
        <RateTable
        columns={["Section", "Who pays", "Charged on", "Rate (FY 2026-27)"]}
        rows={[
          ["236K", "Buyer", "Fair market value", `${rates.property.buyRate}% flat`],
          ["236C", "Seller", "Gross consideration", `${rates.property.sellRate}% flat`],
        ]}
        caption="Finance Act 2026 removed Rule 1A of the Tenth Schedule, ending the Late Filer category for property transactions."
        />
      </div>
    </CalculatorShell>
  );
}
