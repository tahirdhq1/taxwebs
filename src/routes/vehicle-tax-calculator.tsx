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
  OptionGroup,
  PageHeader,
  RateTable,
  SelectInput,
} from "@/components/site/calc-ui";
import { formatPKR, rates, vehicleRegistrationTax } from "@/lib/taxRates";

export const Route = createFileRoute("/vehicle-tax-calculator")({
  head: () => ({
    meta: [
      { title: "Vehicle Registration & Transfer Tax Calculator Pakistan (231B)" },
      {
        name: "description",
        content:
          "Calculate Section 231B withholding tax on registering or transferring a car in Pakistan. Compare filer vs non-filer rates by engine capacity.",
      },
      { property: "og:title", content: "Vehicle Registration & Transfer Tax Calculator (231B)" },
      {
        property: "og:description",
        content:
          "Non-filers pay up to three times more when registering a vehicle. See your exact amount.",
      },
      { property: "og:url", content: "/vehicle-tax-calculator" },
    ],
    links: [{ rel: "canonical", href: "/vehicle-tax-calculator" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Vehicle Registration & Transfer Tax Calculator",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" },
        }),
      },
    ],
  }),
  component: VehicleCalculator,
});

const provinces = [
  { value: "punjab", label: "Punjab" },
  { value: "sindh", label: "Sindh" },
  { value: "kpk", label: "Khyber Pakhtunkhwa" },
  { value: "balochistan", label: "Balochistan" },
  { value: "islamabad", label: "Islamabad Capital Territory" },
] as const;

type Province = (typeof provinces)[number]["value"];

function VehicleCalculator() {
  const [cc, setCc] = useState<number | "">(1300);
  const [value, setValue] = useState<number | "">(3500000);
  const [type, setType] = useState<"new" | "transfer">("new");
  const [province, setProvince] = useState<Province>("punjab");

  const engine = cc === "" ? 0 : cc;
  const price = value === "" ? 0 : value;
  const { slab, filer, nonFiler } = vehicleRegistrationTax(price, engine);

  return (
    <CalculatorShell currentPath="/vehicle-tax-calculator">
      <PageHeader
        eyebrow="Section 231B"
        title="Vehicle Registration & Transfer Tax Calculator"
        intro="The one-off advance tax collected by the excise department when a vehicle is registered in your name or transferred to you. Charged as a percentage of the vehicle's value, based on engine capacity."
      />

      <CalcCard title="Your vehicle">
        <Field label="Transaction type">
          <OptionGroup
            value={type}
            onChange={setType}
            options={[
              { value: "new", label: "New registration" },
              { value: "transfer", label: "Transfer of ownership" },
            ]}
          />
        </Field>

        <Field label="Engine capacity (cc)">
          <AmountInput value={cc} onChange={setCc} prefix="cc" placeholder="1300" />
        </Field>

        <Field label="Vehicle value (PKR)" hint="Invoice value for new vehicles, or assessed value for a transfer.">
          <AmountInput value={value} onChange={setValue} />
        </Field>

        <Field
          label="Province / territory"
          hint="Section 231B is federal, so the rate is the same nationwide. Province is captured because provincial registration fees and token taxes are charged separately."
        >
          <SelectInput value={province} onChange={setProvince} options={[...provinces]} />
        </Field>

        <ComparisonResult
          filerAmount={filer}
          nonFilerAmount={nonFiler}
          filerNote={`${slab.filer}% of vehicle value (${slab.label})`}
          nonFilerNote={`${slab.nonFiler}% of vehicle value (${slab.label})`}
          caption={`On a ${slab.label} vehicle worth ${formatPKR(price)}, at ${type === "new" ? "first registration" : "transfer"}.`}
          copyText={`Section 231B vehicle tax on a ${slab.label} car worth ${formatPKR(price)}: Filer ${formatPKR(filer)} vs Non-Filer ${formatPKR(nonFiler)} — a non-filer pays ${formatPKR(nonFiler - filer)} extra. Calculated on Filer Tax PK.`}
        />
      </CalcCard>

      <ExplainerGrid
        items={[
          {
            q: "What is this tax?",
            a: "Advance income tax under Section 231B, collected once at registration or transfer — separate from the annual token tax.",
          },
          {
            q: "Who pays it?",
            a: "The person in whose name the vehicle is being registered or transferred. It is adjustable against your annual tax if you file a return.",
          },
          {
            q: "How much more do non-filers pay?",
            a: "Exactly three times the filer rate at every engine slab — for example 6% instead of 2% on a 1300–1600cc car.",
          },
        ]}
      />

      <div className="min-w-0">
        <h2 className="mb-3 font-display text-lg font-bold text-ink">
          Section 231B rate table (FY {rates.year})
        </h2>
        <RateTable
          columns={["Engine capacity", "Filer", "Non-Filer"]}
          rows={rates.vehicleRegistration.slabs.map((s) => [
            s.label,
            `${s.filer.toFixed(2)}%`,
            `${s.nonFiler.toFixed(2)}%`,
          ])}
          caption="Rates are a percentage of vehicle value. Edit src/lib/taxRates.ts to update these for a new fiscal year."
        />
      </div>

      <Callout tone="warn" title="Don't confuse this with the annual token tax">
        <p>
          Section 231B is a one-time tax at registration or transfer. The yearly tax you pay with
          your token falls under Section 234 and is a fixed rupee amount by engine size.
        </p>
      </Callout>
    </CalculatorShell>
  );
}
