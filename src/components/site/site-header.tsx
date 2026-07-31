import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { calculators } from "@/lib/calculators";

const navLinks = [
  { to: "/guides", label: "Guides" },
  { to: "/filer-status-checker", label: "Check ATL Status" },
  { to: "/about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:flex sm:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg gradient-deep font-display text-sm font-bold text-primary-foreground">
            FT
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-bold text-ink">
              Filer Tax PK
            </span>
            <span className="block truncate text-[11px] text-muted-foreground">
              Withholding tax calculators
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          <Link
            to="/calculators"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-ink"
            activeProps={{ className: "text-ink bg-secondary" }}
          >
            Calculators
          </Link>
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-ink"
              activeProps={{ className: "text-ink bg-secondary" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border text-ink sm:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-border bg-card px-4 py-3 sm:hidden">
          <div className="grid gap-1">
            {calculators.map((c) => (
              <Link
                key={c.to}
                to={c.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink hover:bg-secondary"
              >
                {c.title}
              </Link>
            ))}
            <div className="my-2 h-px bg-border" />
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
