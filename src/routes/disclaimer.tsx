import { createFileRoute, Link } from "@tanstack/react-router";
import { DISCLAIMER, FBR_HOME_URL, LAST_UPDATED } from "@/lib/taxRates";

const CONTACT_EMAIL = "consulttoday123@gmail.com";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — Filer Tax PK" },
      {
        name: "description",
        content:
          "Filer Tax PK results are estimates, not tax advice. Read the limits of our withholding tax calculators before relying on any figure.",
      },
      { property: "og:title", content: "Disclaimer — Filer Tax PK" },
      {
        property: "og:description",
        content: "Estimates only — the limits of our Pakistani withholding tax calculators.",
      },
      { property: "og:url", content: "/disclaimer" },
    ],
    links: [{ rel: "canonical", href: "/disclaimer" }],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Disclaimer</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated {LAST_UPDATED}.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{DISCLAIMER}</p>

      <div className="mt-8 grid gap-5">
        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-bold text-ink">Estimates, not assessments</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Every number this site produces is an estimate based solely on the values you enter and
            the published rate card for the selected fiscal year. It is not an official assessment,
            challan, or determination of your tax liability. Only FBR can determine what you owe.
          </p>
        </section>

        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-bold text-ink">What the calculators do not cover</h2>
          <ul className="mt-2 grid gap-2 text-sm leading-relaxed text-muted-foreground">
            <li>• Exemption or reduced-rate certificates issued to you.</li>
            <li>• Provincial fees, stamp duty and CVT variations between provinces.</li>
            <li>• Special treatment for overseas Pakistanis, non-residents and exempt entities.</li>
            <li>• Adjustments, refunds or credits claimed in your annual return.</li>
            <li>• Penalties, surcharges or default surcharge for late payment.</li>
          </ul>
        </section>

        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-bold text-ink">No professional relationship</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Using this site does not create a client relationship with any tax adviser, lawyer or
            accountant. Nothing here should be treated as tax, legal or financial advice for your
            specific situation.
          </p>
        </section>

        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-bold text-ink">Not affiliated with FBR</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Filer Tax PK is an independent project. It is not affiliated with, endorsed by or
            operated by the Federal Board of Revenue or any government body. Verify everything at{" "}
            <a
              href={FBR_HOME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              fbr.gov.pk
            </a>
            .
          </p>
        </section>

        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-bold text-ink">Spotted an error?</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            If you believe a rate is wrong or out of date, please email{" "}
            <a className="text-primary underline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>{" "}
            with the section reference and we will review it. See also our{" "}
            <Link to="/terms-and-conditions" className="text-primary underline">
              terms and conditions
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
