import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { guides } from "@/content/guides";

export const Route = createFileRoute("/guides/")({
  head: () => ({
    meta: [
      { title: "Pakistan Tax Guides — Filer Status, ATL & Withholding Tax Explained" },
      {
        name: "description",
        content:
          "Plain-English guides on becoming a tax filer in Pakistan, the FBR ATL list, sections 236C and 236K, and cash withdrawal tax.",
      },
      { property: "og:title", content: "Pakistan Tax Guides — Filer Tax PK" },
      {
        property: "og:description",
        content: "Guides on filer status, ATL, property tax sections and withholding tax rules.",
      },
      { property: "og:url", content: "/guides" },
    ],
    links: [{ rel: "canonical", href: "/guides" }],
  }),
  component: GuidesIndex,
});

function GuidesIndex() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Guides</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Short, practical explainers on filer status and the withholding taxes that come with it —
        written for people who are not accountants.
      </p>

      <div className="mt-8 grid gap-4">
        {guides.map((g) => (
          <Link
            key={g.slug}
            to="/guides/$slug"
            params={{ slug: g.slug }}
            className="surface-card block p-6 transition-shadow hover:shadow-[var(--shadow-lift)]"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              {g.readingTime} · Updated {g.updated}
            </p>
            <h2 className="mt-2 font-display text-lg font-bold text-ink">{g.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.intro}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
              Read guide <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
