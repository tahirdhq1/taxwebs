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
} from "@/components/site/calc-ui";
import { formatPKR, investmentTax, rates } from "@/lib/taxRates";

export const Route = createFileRoute("/bank-profit-tax-calculator")({
  head: () => ({
    meta: [
      { title: "Bank Profit & Dividend Tax Calculator Pakistan (151 / 150)" },
      {
        name: "description",
        content:
          "Calculate withholding tax on bank profit, company dividends and mutual fund income in Pakistan. Non-filers pay double the filer rate.",
      },
      { property: "og:title", content: "Bank Profit & Dividend Tax Calculator (151 / 150)" },
      {
        property: "og:description",
        content: "Filers pay 20% on bank profit, non-filers pay 40%. See your exact deduction.",
      },
      { property: "og:url", content: "/bank-profit-tax-calculator" },
    ],
    links: [{ rel: "canonical", href: "/bank-profit-tax-calculator" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Bank Profit & Dividend Tax Calculator",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" },
        }),
      },
    ],
  }),
  component: BankProfitCalculator,
});

function BankProfitCalculator() {
  const [amount, setAmount] = useState<number | "">(200000);
  const [categoryId, setCategoryId] = useState(rates.investment.categories[0].id);

  const value = amount === "" ? 0 : amount;
  const { cat, filer, nonFiler } = investmentTax(value, categoryId);

  return (
    <CalculatorShell currentPath="/bank-profit-tax-calculator">
      <PageHeader
        eyebrow="Sections 151 & 150"
        title="Bank Profit & Dividend Tax Calculator"
        intro="Whenever a bank credits profit to your account or a company pays you a dividend, tax is withheld before the money reaches you. Non-filers are charged at double the filer rate."
      />

      <CalcCard title="Your income">
        <Field label="Income type">
          <SelectInput
            value={categoryId}
            onChange={setCategoryId}
            options={rates.investment.categories.map((c) => ({ value: c.id, label: c.label }))}
          />
        </Field>

        <Field label="Profit / dividend amount received (before tax)">
          <AmountInput value={amount} onChange={setAmount} />
        </Field>

        <ComparisonResult
          filerAmount={filer}
          nonFilerAmount={nonFiler}
          filerNote={`${cat.filer}% under Section ${cat.section}`}
          nonFilerNote={`${cat.nonFiler}% under Section ${cat.section}`}
          caption={cat.note}
          copyText={`${cat.label}: on ${formatPKR(value)}, a filer pays ${formatPKR(filer)} tax and a non-filer pays ${formatPKR(nonFiler)} — ${formatPKR(nonFiler - filer)} extra. Calculated on Filer Tax PK.`}
        />
      </CalcCard>

      <ExplainerGrid
        items={[
          {
            q: "What is this tax?",
            a: "Withholding tax deducted at source on profit on debt (Section 151) and on dividends (Section 150) before the amount is credited to you.",
          },
          {
            q: "Who pays it?",
            a: "Anyone earning bank profit, dividends or mutual fund income in Pakistan. Your bank or the paying company deducts and deposits it with FBR.",
          },
          {
            q: "How much more do non-filers pay?",
            a: "Exactly double at every category — 40% instead of 20% on bank profit, 30% instead of 15% on a general dividend.",
          },
        ]}
      />

      <div className="min-w-0">
        <h2 className="mb-3 font-display text-lg font-bold text-ink">
          Rate table (FY {rates.year})
        </h2>
        <RateTable
          columns={["Income type", "Section", "Filer", "Non-Filer"]}
          rows={rates.investment.categories.map((c) => [
            c.label,
            c.section,
            `${c.filer}%`,
            `${c.nonFiler}%`,
          ])}
        />
      </div>

      <Callout title="Dividends are not all the same">
        <p>
          The calculator defaults to the general dividend rate. Dividends from Independent Power
          Purchasers and from debt-heavy mutual funds are taxed differently — pick the matching
          income type above.
        </p>
      </Callout>
    </CalculatorShell>
  );
}
