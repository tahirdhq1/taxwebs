import { createFileRoute, Link } from "@tanstack/react-router";
import { CURRENT_FISCAL_YEAR, DISCLAIMER, FBR_HOME_URL, LAST_UPDATED } from "@/lib/taxRates";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Disclaimer — Filer Tax PK" },
      {
        name: "description",
        content:
          "Who runs Filer Tax PK, where the tax rates come from, how your data is handled, and the limits of these estimates.",
      },
      { property: "og:title", content: "About & Disclaimer — Filer Tax PK" },
      {
        property: "og:description",
        content: "Rate sources, privacy approach and the disclaimer for our tax estimates.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">About &amp; disclaimer</h1>
      <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
        Filer Tax PK is a free set of calculators for the transaction-based withholding taxes
        Pakistanis actually pay — on property, vehicles, cash withdrawals, bank profit, phone bills
        and electricity. Most tax calculators only handle salary income tax, which leaves out the
        taxes that hit hardest if you are not on the Active Taxpayer List.
      </p>

      <div className="mt-8 grid gap-5">
        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-bold text-ink">This is an estimation tool</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Nothing on this site is tax, legal or financial advice. The calculators apply published
            rate cards to the numbers you enter; they do not account for exemptions, reduced-rate
            certificates, provincial variations in fees, or your individual circumstances. Before
            relying on any figure for a real transaction, confirm it with FBR or a qualified tax
            consultant.
          </p>
        </section>

        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-bold text-ink">Where the rates come from</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Rates are taken from FBR&apos;s official Withholding Tax Rate Card for the Finance Act
            2025, cross-checked against the Finance Act 2026 legal text. Sections 236C and 236K
            reflect the Finance Act 2026 amendments, which replaced the slab structure with flat
            rates and abolished the Late Filer category. All other sections listed were checked and
            confirmed unchanged.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Current fiscal year on site: {CURRENT_FISCAL_YEAR}. Rates last reviewed {LAST_UPDATED}.
            You can always verify at{" "}
            <a
              href={FBR_HOME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline"
            >
              fbr.gov.pk
            </a>
            .
          </p>
        </section>

        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-bold text-ink">Privacy</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            There is no signup and no account. Every calculation runs in your browser — the amounts
            you type are never sent to a server, and we never ask for your CNIC. Your chosen filer
            status is remembered locally on your own device so you don&apos;t have to reselect it on
            each calculator.
          </p>
        </section>

        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-bold text-ink">
            We do not connect to FBR systems
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Our{" "}
            <Link to="/filer-status-checker" className="font-semibold text-primary underline">
              filer status page
            </Link>{" "}
            is a guide to using FBR&apos;s own official verification service. We do not scrape,
            proxy or query FBR systems on your behalf.
          </p>
        </section>
      </div>

      <p className="mt-8 rounded-2xl border border-border bg-secondary p-5 text-xs leading-relaxed text-muted-foreground">
        {DISCLAIMER}
      </p>
    </main>
  );
}
