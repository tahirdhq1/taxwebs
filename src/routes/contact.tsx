import { createFileRoute, Link } from "@tanstack/react-router";

const CONTACT_EMAIL = "consulttoday123@gmail.com";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Filer Tax PK" },
      {
        name: "description",
        content:
          "Get in touch with Filer Tax PK about rate corrections, feedback, content suggestions or partnership enquiries.",
      },
      { property: "og:title", content: "Contact Us — Filer Tax PK" },
      {
        property: "og:description",
        content: "Email Filer Tax PK with corrections, feedback or partnership enquiries.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Contact us</h1>
      <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
        We read every message. Whether you have spotted a wrong rate, want a new calculator, or have
        a partnership idea, email is the fastest way to reach us.
      </p>

      <div className="surface-card mt-8 p-6">
        <p className="text-sm font-semibold text-ink">Email</p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-1 block break-all font-display text-xl font-bold text-primary underline"
        >
          {CONTACT_EMAIL}
        </a>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          We usually reply within 2–3 working days.
        </p>
      </div>

      <div className="mt-6 grid gap-5">
        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-bold text-ink">Reporting a rate error</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Please include the calculator name, the section number (for example 236C or 231AB), the
            figure you expected and, if possible, a link to the FBR document that supports it. That
            lets us verify and fix it quickly.
          </p>
        </section>

        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-bold text-ink">What we cannot help with</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            We cannot file your return, check your ATL status on your behalf, resolve an FBR notice,
            or give advice on your personal tax position. For those, contact FBR directly or a
            registered tax practitioner. See our{" "}
            <Link to="/disclaimer" className="text-primary underline">
              disclaimer
            </Link>
            .
          </p>
        </section>

        <section className="surface-card p-6">
          <h2 className="font-display text-lg font-bold text-ink">Privacy</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Please do not send your CNIC, NTN or other sensitive personal details by email. Read how
            we handle data in our{" "}
            <Link to="/privacy-policy" className="text-primary underline">
              privacy policy
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
