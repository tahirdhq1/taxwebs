import { createFileRoute, Link } from "@tanstack/react-router";
import { LAST_UPDATED } from "@/lib/taxRates";

const CONTACT_EMAIL = "consulttoday123@gmail.com";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Filer Tax PK" },
      {
        name: "description",
        content:
          "The terms of use for Filer Tax PK's free Pakistani withholding tax calculators and guides, including limits of liability.",
      },
      { property: "og:title", content: "Terms & Conditions — Filer Tax PK" },
      {
        property: "og:description",
        content: "Terms of use for the Filer Tax PK calculators and guide content.",
      },
      { property: "og:url", content: "/terms-and-conditions" },
    ],
    links: [{ rel: "canonical", href: "/terms-and-conditions" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Terms &amp; conditions</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated {LAST_UPDATED}.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
        By using Filer Tax PK you agree to the terms below. If you do not agree with them, please do
        not use the site.
      </p>

      <div className="mt-8 grid gap-5">
        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-bold text-ink">1. What this site is</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Filer Tax PK provides free educational calculators and articles about Pakistani
            withholding taxes. It is an information tool only. It is not a tax filing service, not a
            government portal, and it is not affiliated with, endorsed by, or operated by the Federal
            Board of Revenue.
          </p>
        </section>

        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-bold text-ink">2. Not professional advice</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Nothing published here is tax, legal, accounting or financial advice. Results are
            estimates produced by applying published rate cards to the numbers you enter. Always
            confirm figures with FBR or a qualified tax practitioner before acting on them.
          </p>
        </section>

        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-bold text-ink">3. Accuracy and changes</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Tax law in Pakistan changes frequently, including through mid-year amendments, SROs and
            circulars. We make reasonable efforts to keep rates current but do not warrant that every
            figure is accurate, complete or up to date. We may change, suspend or remove any tool or
            page at any time without notice.
          </p>
        </section>

        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-bold text-ink">4. Acceptable use</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            You may use the site for personal and business reference. You may not attempt to disrupt
            the site, scrape it at a scale that degrades service for others, or republish substantial
            portions of our content as your own.
          </p>
        </section>

        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-bold text-ink">5. Limitation of liability</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            To the fullest extent permitted by law, Filer Tax PK and its operators accept no
            liability for any loss, penalty, additional tax, or damage arising from reliance on the
            calculations, content or availability of this site. You use it at your own risk.
          </p>
        </section>

        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-bold text-ink">6. Intellectual property</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            The site design, written guides and calculator logic belong to Filer Tax PK. Statutory
            rates and legal provisions themselves are public information published by FBR.
          </p>
        </section>

        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-bold text-ink">7. Contact</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Questions about these terms? Email{" "}
            <a className="text-primary underline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>{" "}
            or use the{" "}
            <Link to="/contact" className="text-primary underline">
              contact page
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
