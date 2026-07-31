import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalculatorShell } from "@/components/site/calculator-shell";
import {
  AmountInput,
  CalcCard,
  Callout,
  ExplainerGrid,
  Field,
  PageHeader,
  SingleResult,
} from "@/components/site/calc-ui";
import { formatPKR, landlineBillTax, mobileBillTax, rates } from "@/lib/taxRates";

export const Route = createFileRoute("/mobile-bill-tax-calculator")({
  head: () => ({
    meta: [
      { title: "Mobile & Internet Bill Tax Calculator Pakistan (Section 236)" },
      {
        name: "description",
        content:
          "Work out the 15% advance tax deducted on mobile bills, prepaid top-ups and internet in Pakistan, plus the 10% landline rate above Rs. 1,000.",
      },
      { property: "og:title", content: "Mobile & Internet Bill Tax Calculator (236)" },
      {
        property: "og:description",
        content: "See exactly how much of your top-up or bill goes to withholding tax.",
      },
      { property: "og:url", content: "/mobile-bill-tax-calculator" },
    ],
    links: [{ rel: "canonical", href: "/mobile-bill-tax-calculator" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Mobile & Internet Bill Tax Calculator (236)",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" },
        }),
      },
    ],
  }),
  component: MobileBillCalculator,
});

function MobileBillCalculator() {
  const [bill, setBill] = useState<number | "">(2000);
  const [landline, setLandline] = useState<number | "">(2500);

  const billValue = bill === "" ? 0 : bill;
  const landlineValue = landline === "" ? 0 : landline;
  const mobileTax = mobileBillTax(billValue);
  const landTax = landlineBillTax(landlineValue);

  return (
    <CalculatorShell showToggle={false} currentPath="/mobile-bill-tax-calculator">
      <PageHeader
        eyebrow="Section 236"
        title="Mobile & Internet Bill Tax Calculator"
        intro="Every postpaid bill, prepaid card and internet package carries advance income tax. This is the deduction most Pakistanis pay most often — and rarely see broken out."
      />

      <Callout title="Filer status does not change this rate">
        <p>
          Under the current rate card there is no separate ATL and non-ATL rate for mobile and
          internet subscribers — everyone pays {rates.telecom.mobileRate}%. The value here is seeing
          the deduction clearly. If you file a return, this tax is adjustable against your annual
          liability; if you don&apos;t file, it is simply gone.
        </p>
      </Callout>

      <CalcCard title="Mobile / internet">
        <Field
          label="Monthly bill or prepaid card value"
          hint="Enter the bill amount or the face value of the top-up card."
        >
          <AmountInput value={bill} onChange={setBill} />
        </Field>

        <SingleResult
          label={`Advance tax withheld (${rates.telecom.mobileRate}%)`}
          amount={mobileTax}
          caption={`Deducted from ${formatPKR(billValue)}. Over a year that is ${formatPKR(mobileTax * 12)} if you spend the same every month.`}
          copyText={`Mobile/internet advance tax (Section 236) on ${formatPKR(billValue)} = ${formatPKR(mobileTax)} at ${rates.telecom.mobileRate}%. Calculated on Filer Tax PK.`}
        />
      </CalcCard>

      <CalcCard title="Landline (non-mobile) telephone">
        <Field
          label="Landline bill amount"
          hint={`Tax applies at ${rates.telecom.landlineRate}% only on the portion of the bill above ${formatPKR(rates.telecom.landlineThreshold)}.`}
        >
          <AmountInput value={landline} onChange={setLandline} />
        </Field>

        <SingleResult
          label={`Landline advance tax (${rates.telecom.landlineRate}% above ${formatPKR(rates.telecom.landlineThreshold)})`}
          amount={landTax}
          caption={
            landlineValue <= rates.telecom.landlineThreshold
              ? `Bills of ${formatPKR(rates.telecom.landlineThreshold)} or less carry no advance tax.`
              : `Charged on ${formatPKR(landlineValue - rates.telecom.landlineThreshold)} of the bill.`
          }
          copyText={`Landline advance tax (Section 236) on ${formatPKR(landlineValue)} = ${formatPKR(landTax)}. Calculated on Filer Tax PK.`}
        />
      </CalcCard>

      <ExplainerGrid
        items={[
          {
            q: "What is this tax?",
            a: "Advance income tax under Section 236, collected by your mobile operator or ISP at the point of billing or top-up.",
          },
          {
            q: "Who pays it?",
            a: "Every subscriber. It is deducted automatically, which is why a Rs. 100 card gives you less than Rs. 100 of balance.",
          },
          {
            q: "How much more do non-filers pay?",
            a: "Nothing extra on the rate itself — but filers can claim this deduction back against their annual tax when they file a return. Non-filers cannot.",
          },
        ]}
      />
    </CalculatorShell>
  );
}
