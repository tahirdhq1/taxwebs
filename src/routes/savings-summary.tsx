import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CalculatorShell } from "@/components/site/calculator-shell";
import {
  AmountInput,
  CalcCard,
  Callout,
  CopyResult,
  Field,
  PageHeader,
} from "@/components/site/calc-ui";
import {
  annualVehicleTax,
  cashWithdrawalTax,
  electricityTax,
  formatPKR,
  investmentTax,
  vehicleRegistrationTax,
} from "@/lib/taxRates";

export const Route = createFileRoute("/savings-summary")({
  head: () => ({
    meta: [
      { title: "How Much Does Being a Non-Filer Cost Me Per Year? — Filer Tax PK" },
      {
        name: "description",
        content:
          "Add up your yearly activity — car purchase, cash withdrawals, bank profit, electricity — and see the total extra withholding tax you pay as a non-filer in Pakistan.",
      },
      { property: "og:title", content: "Your Yearly Non-Filer Cost Summary" },
      {
        property: "og:description",
        content: "One combined estimate of everything you overpay by staying off the ATL.",
      },
      { property: "og:url", content: "/savings-summary" },
    ],
    links: [{ rel: "canonical", href: "/savings-summary" }],
  }),
  component: SavingsSummary,
});

function SavingsSummary() {
  const [carValue, setCarValue] = useState<number | "">(3500000);
  const [carCc, setCarCc] = useState<number | "">(1300);
  const [ownsCar, setOwnsCar] = useState<number | "">(1300);
  const [monthlyCash, setMonthlyCash] = useState<number | "">(200000);
  const [bankProfit, setBankProfit] = useState<number | "">(150000);
  const [electricityBill, setElectricityBill] = useState<number | "">(30000);

  const n = (v: number | "") => (v === "" ? 0 : v);

  const reg = vehicleRegistrationTax(n(carValue), n(carCc));
  const regExtra = n(carValue) > 0 ? reg.nonFiler - reg.filer : 0;

  const token = annualVehicleTax(n(ownsCar));
  const tokenExtra = n(ownsCar) > 0 ? token.nonFiler - token.filer : 0;

  const cashExtra =
    (cashWithdrawalTax(n(monthlyCash), "non-filer").tax -
      cashWithdrawalTax(n(monthlyCash), "filer").tax) *
    12;

  const profit = investmentTax(n(bankProfit), "bank-profit");
  const profitExtra = profit.nonFiler - profit.filer;

  const elecExtra =
    (electricityTax(n(electricityBill), "domestic", "non-filer") -
      electricityTax(n(electricityBill), "domestic", "filer")) *
    12;

  const lines = [
    { label: "Buying / registering a vehicle (231B)", amount: regExtra },
    { label: "Annual motor vehicle tax (234)", amount: tokenExtra },
    { label: "Cash withdrawals over the year (231AB)", amount: cashExtra },
    { label: "Bank profit withholding (151)", amount: profitExtra },
    { label: "Electricity bills over the year (235)", amount: elecExtra },
  ];

  const total = lines.reduce((s, l) => s + l.amount, 0);

  return (
    <CalculatorShell showToggle={false} currentPath="/savings-summary">
      <PageHeader
        eyebrow="Combined estimate"
        title="What does staying a non-filer cost you in a year?"
        intro="Enter your typical yearly activity below. We add up the extra withholding tax you pay purely because your name is not on the Active Taxpayer List."
      />

      <CalcCard title="Your year">
        <Field label="Vehicle you plan to buy or transfer this year" hint="Leave at 0 if none.">
          <AmountInput value={carValue} onChange={setCarValue} />
        </Field>
        <Field label="Engine capacity of that vehicle (cc)">
          <AmountInput value={carCc} onChange={setCarCc} prefix="cc" />
        </Field>
        <Field label="Engine capacity of the vehicle you already own (cc)" hint="For the annual token-time tax. Leave at 0 if none.">
          <AmountInput value={ownsCar} onChange={setOwnsCar} prefix="cc" />
        </Field>
        <Field label="Cash you withdraw in a typical day, once a month" hint="We assume one such withdrawal day per month.">
          <AmountInput value={monthlyCash} onChange={setMonthlyCash} />
        </Field>
        <Field label="Bank profit you expect this year">
          <AmountInput value={bankProfit} onChange={setBankProfit} />
        </Field>
        <Field label="Your typical monthly electricity bill">
          <AmountInput value={electricityBill} onChange={setElectricityBill} />
        </Field>
      </CalcCard>

      <div className="rounded-2xl gradient-deep p-6 text-primary-foreground">
        <p className="text-xs font-bold uppercase tracking-wider opacity-80">
          Extra tax you pay in a year as a non-filer
        </p>
        <p className="num mt-1 font-display text-4xl font-extrabold text-gold sm:text-5xl">
          {formatPKR(total)}
        </p>
        <ul className="mt-5 grid gap-2 border-t border-primary-foreground/15 pt-4">
          {lines.map((l) => (
            <li key={l.label} className="flex items-baseline justify-between gap-4 text-sm">
              <span className="min-w-0 opacity-85">{l.label}</span>
              <span className="num shrink-0 font-semibold">{formatPKR(l.amount)}</span>
            </li>
          ))}
        </ul>
      </div>

      <CopyResult
        text={`Being a non-filer costs me about ${formatPKR(total)} in extra withholding tax this year. Worked out on Filer Tax PK.`}
      />

      <Callout tone="good" title="The good news">
        <p>
          Filing one income tax return puts you on the ATL and most of this disappears. Our{" "}
          <Link
            to="/guides/$slug"
            params={{ slug: "how-to-become-a-tax-filer" }}
            className="font-semibold text-primary underline"
          >
            step-by-step filing guide
          </Link>{" "}
          walks through the process on FBR&apos;s IRIS portal.
        </p>
      </Callout>

      <Callout title="How we estimate">
        <p>
          Property tax is excluded because Finance Act 2026 made 236C and 236K flat for everyone, so
          it costs a non-filer nothing extra. Mobile and internet tax is also excluded for the same
          reason.
        </p>
      </Callout>
    </CalculatorShell>
  );
}
