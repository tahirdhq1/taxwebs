import { createFileRoute, Link } from "@tanstack/react-router";
import { LAST_UPDATED } from "@/lib/taxRates";

const CONTACT_EMAIL = "consulttoday123@gmail.com";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Filer Tax PK" },
      {
        name: "description",
        content:
          "How Filer Tax PK handles your data: calculations run in your browser, no accounts, no tax figures stored on our servers.",
      },
      { property: "og:title", content: "Privacy Policy — Filer Tax PK" },
      {
        property: "og:description",
        content: "Our privacy approach: browser-only calculations, no signup, no stored tax data.",
      },
      { property: "og:url", content: "/privacy-policy" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Privacy policy</h1>
      <p className="mt-3 text-sm text-muted-foreground">Last updated {LAST_UPDATED}.</p>
      <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
        This page explains what information Filer Tax PK does and does not collect when you use the
        calculators and guides on this site.
      </p>

      <div className="mt-8 grid gap-5">
        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-bold text-ink">Calculations stay on your device</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Every calculator runs entirely in your browser using JavaScript. The amounts you type —
            property values, withdrawal amounts, salaries, bills — are never sent to us and are never
            written to a database. Close the tab and they are gone.
          </p>
        </section>

        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-bold text-ink">No accounts, no tracking profiles</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            You do not need to sign up or provide a name, CNIC, NTN, phone number or email to use any
            tool on this site. We do not build advertising profiles and we do not sell data.
          </p>
        </section>

        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-bold text-ink">Local storage</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Your selected filer / non-filer status is remembered using your browser&apos;s local
            storage so you do not have to re-pick it on every page. This stays on your own device and
            is not readable by us. Clearing your browser data removes it.
          </p>
        </section>

        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-bold text-ink">Hosting and basic logs</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Like any website, our hosting provider may record standard technical request information
            (such as IP address, browser type and the page requested) for security and reliability.
            We do not link this to any individual and do not use it to identify you.
          </p>
        </section>

        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-bold text-ink">External links</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            We link to FBR and other third-party websites. Once you follow such a link, that site&apos;s
            own privacy policy applies — we have no control over how they handle your data.
          </p>
        </section>

        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-bold text-ink">Questions or requests</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            If you have a privacy question, email us at{" "}
            <a className="text-primary underline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            . You can also read our{" "}
            <Link to="/terms-and-conditions" className="text-primary underline">
              terms and conditions
            </Link>{" "}
            and{" "}
            <Link to="/disclaimer" className="text-primary underline">
              disclaimer
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
