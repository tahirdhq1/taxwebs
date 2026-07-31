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
} from "@/components/site/calc-ui";
import { cashWithdrawalTax, formatPKR, rates } from "@/lib/taxRates";

export const Route = createFileRoute("/cash-withdrawal-tax-calculator")({
  head: () => ({
    meta: [
      { title: "Cash Withdrawal Tax Calculator Pakistan (Section 231AB)" },
      {
        name: "description",
        content:
          "Calculate the 0.8% cash withdrawal withholding tax non-filers pay in Pakistan under Section 231AB, including the daily aggregate threshold.",
      },
      { property: "og:title", content: "Cash Withdrawal Tax Calculator (231AB)" },
      {
        property: "og:description",
        content: "Non-filers pay 0.8% on cash withdrawn above the daily limit. Filers pay nothing.",
      },
      { property: "og:url", content: "/cash-withdrawal-tax-calculator" },
    ],
    links: [{ rel: "canonical", href: "/cash-withdrawal-tax-calculator" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Cash Withdrawal Tax Calculator (231AB)",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" },
        }),
      },
    ],
  }),
  component: CashCalculator,
});

function CashCalculator() {
  const [amount, setAmount] = useState<number | "">(150000);
  const value = amount === "" ? 0 : amount;

  const filer = cashWithdrawalTax(value, "filer");
  const nonFiler = cashWithdrawalTax(value, "non-filer");
  const threshold = rates.cashWithdrawal.dailyThreshold;

  return (
    <CalculatorShell currentPath="/cash-withdrawal-tax-calculator">
      <PageHeader
        eyebrow="Section 231AB"
        title="Cash Withdrawal Tax Calculator"
        intro="Banks deduct advance tax from non-filers who take out cash above a daily limit. Enter what you withdraw in a single day (or the total across several withdrawals from the same bank on one day)."
      />

      <CalcCard title="Your withdrawal">
        <Field
          label="Cash withdrawn in one day"
          hint={`Add up all cash withdrawals from the same bank on the same day. Tax only applies to the amount above ${formatPKR(threshold)}.`}
        >
          <AmountInput value={amount} onChange={setAmount} />
        </Field>

        <ComparisonResult
          filerAmount={filer.tax}
          nonFilerAmount={nonFiler.tax}
          filerNote="ATL persons are not subject to Section 231AB."
          nonFilerNote={`${nonFiler.rate}% of ${formatPKR(nonFiler.taxable)} (the amount above the daily threshold).`}
          caption={
            value <= threshold
              ? `Below the ${formatPKR(threshold)} daily threshold — no tax is deducted from anyone.`
              : `Deducted straight from your account balance at the time of withdrawal.`
          }
          copyText={`Cash withdrawal tax (231AB) on ${formatPKR(value)} in one day: Filer ${formatPKR(filer.tax)} vs Non-Filer ${formatPKR(nonFiler.tax)}. Calculated on Filer Tax PK.`}
        />
      </CalcCard>

      <Callout title="How the threshold works">
        <p>
          The tax applies to the daily aggregate — if you withdraw {formatPKR(30000)} in the morning
          and {formatPKR(40000)} in the afternoon from the same bank, the bank treats it as{" "}
          {formatPKR(70000)} for the day and charges 0.8% on the portion above{" "}
          {formatPKR(threshold)}.
        </p>
      </Callout>

      <ExplainerGrid
        items={[
          {
            q: "What is this tax?",
            a: "An advance income tax banks collect from persons not on the Active Taxpayer List when they withdraw cash.",
          },
          {
            q: "Who pays it?",
            a: "Only non-filers. If your name appears on the ATL on the day of withdrawal, the bank should not deduct anything.",
          },
          {
            q: "How much more do non-filers pay?",
            a: `0.8% of the amount above ${formatPKR(threshold)} per day — a regular ${formatPKR(200000)} withdrawal costs a non-filer ${formatPKR(cashWithdrawalTax(200000, "non-filer").tax)} each time.`,
          },
        ]}
      />
    </CalculatorShell>
  );
}
