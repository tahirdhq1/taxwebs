import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getGuide, type Guide } from "@/content/guides";
import { DISCLAIMER } from "@/lib/taxRates";

export const Route = createFileRoute("/guides/$slug")({
  loader: ({ params }): { guide: Guide } => {
    const guide = getGuide(params.slug);
    if (!guide) throw notFound();
    return { guide };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Guide not found — Filer Tax PK" }, { name: "robots", content: "noindex" }],
      };
    }
    const g = loaderData.guide;
    return {
      meta: [
        { title: g.metaTitle },
        { name: "description", content: g.metaDescription },
        { property: "og:title", content: g.metaTitle },
        { property: "og:description", content: g.metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/guides/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/guides/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: g.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: g.title,
            description: g.metaDescription,
            dateModified: g.updated,
          }),
        },
      ],
    };
  },
  notFoundComponent: GuideNotFound,
  component: GuideArticle,
});

function GuideNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 text-center">
      <h1 className="font-display text-2xl font-bold text-ink">Guide not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        That article doesn&apos;t exist or has been moved.
      </p>
      <Link
        to="/guides"
        className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
      >
        Browse all guides
      </Link>
    </main>
  );
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function GuideArticle() {
  const { guide } = Route.useLoaderData() as { guide: Guide };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <nav className="text-xs text-muted-foreground">
        <Link to="/guides" className="hover:text-primary">
          Guides
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{guide.title}</span>
      </nav>

      <h1 className="mt-4 font-display text-2xl font-bold leading-tight text-ink sm:text-4xl">
        {guide.title}
      </h1>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-primary">
        {guide.readingTime} · Updated {guide.updated}
      </p>
      <p className="mt-5 text-base leading-relaxed text-muted-foreground">{guide.intro}</p>

      <div className="surface-card mt-8 p-5">
        <p className="text-sm font-bold text-ink">On this page</p>
        <ul className="mt-3 grid gap-2">
          {guide.sections.map((s) => (
            <li key={s.heading}>
              <a
                href={`#${slugify(s.heading)}`}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {s.heading}
              </a>
            </li>
          ))}
          <li>
            <a href="#faq" className="text-sm text-muted-foreground hover:text-primary">
              Frequently asked questions
            </a>
          </li>
        </ul>
      </div>

      <article className="mt-10 grid gap-9">
        {guide.sections.map((s) => (
          <section key={s.heading} id={slugify(s.heading)} className="scroll-mt-32">
            <h2 className="font-display text-xl font-bold text-ink">{s.heading}</h2>
            {s.paragraphs.map((p) => (
              <p key={p} className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
            {s.bullets ? (
              <ul className="mt-4 grid gap-2">
                {s.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 rounded-xl bg-secondary px-4 py-3 text-sm text-ink"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </article>

      <section id="faq" className="mt-12 scroll-mt-32">
        <h2 className="font-display text-xl font-bold text-ink">Frequently asked questions</h2>
        <Accordion type="single" collapsible className="mt-4">
          {guide.faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left text-sm font-semibold text-ink">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <Link
        to={guide.cta.to as "/calculators"}
        className="mt-12 flex items-center justify-between gap-4 rounded-2xl gradient-deep p-6 text-primary-foreground"
      >
        <span className="min-w-0">
          <span className="block font-display text-base font-bold">{guide.cta.label}</span>
          <span className="mt-1 block text-sm opacity-85">{guide.cta.blurb}</span>
        </span>
        <ArrowRight size={20} className="shrink-0 text-gold" />
      </Link>

      <p className="mt-10 rounded-2xl border border-border bg-secondary p-5 text-xs leading-relaxed text-muted-foreground">
        {DISCLAIMER}
      </p>
    </main>
  );
}
