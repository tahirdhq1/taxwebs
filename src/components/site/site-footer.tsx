import { Link } from "@tanstack/react-router";
import { calculators } from "@/lib/calculators";
import { DISCLAIMER, FBR_HOME_URL, LAST_UPDATED } from "@/lib/taxRates";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-base font-bold text-ink">Filer Tax PK</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Free, privacy-friendly withholding tax calculators for Pakistan. No signup, no data
            stored — everything runs in your browser.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Calculators</p>
          <ul className="mt-3 grid gap-2">
            {calculators.slice(0, 5).map((c) => (
              <li key={c.to}>
                <Link to={c.to} className="text-sm text-muted-foreground hover:text-primary">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">More tools</p>
          <ul className="mt-3 grid gap-2">
            {calculators.slice(5).map((c) => (
              <li key={c.to}>
                <Link to={c.to} className="text-sm text-muted-foreground hover:text-primary">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Learn</p>
          <ul className="mt-3 grid gap-2">
            <li>
              <Link to="/guides" className="text-sm text-muted-foreground hover:text-primary">
                Guides &amp; articles
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary">
                About &amp; disclaimer
              </Link>
            </li>
            <li>
              <a
                href={FBR_HOME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                FBR official website
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-4 py-6">
        <nav className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-2">
          <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary">
            Privacy Policy
          </Link>
          <Link
            to="/terms-and-conditions"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Terms &amp; Conditions
          </Link>
          <Link to="/disclaimer" className="text-sm text-muted-foreground hover:text-primary">
            Disclaimer
          </Link>
          <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary">
            Contact Us
          </Link>
        </nav>
      </div>



      <div className="border-t border-border px-4 py-6">
        <div className="mx-auto max-w-6xl text-xs leading-relaxed text-muted-foreground">
          <p>{DISCLAIMER}</p>
          <p className="mt-2">
            Rates last reviewed {LAST_UPDATED}. Estimation tool only — not tax or legal advice. ©{" "}
            {new Date().getFullYear()} Filer Tax PK.
          </p>
        </div>
      </div>
    </footer>
  );
}
