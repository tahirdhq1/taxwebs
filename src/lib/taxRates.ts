/**
 * ============================================================================
 * FILER TAX PK — CENTRAL TAX RATE CONFIGURATION
 * ============================================================================
 *
 * ALL withholding tax rates used anywhere in the app live in this file.
 * To update rates for a new fiscal year:
 *   1. Copy the `rates_2026_27` object below into a new `rates_2027_28`.
 *   2. Edit the numbers.
 *   3. Add it to `RATE_YEARS` and change `CURRENT_FISCAL_YEAR`.
 * No UI code needs to change.
 *
 * Sources: FBR Withholding Tax Rate Card (Finance Act 2025), cross-checked
 * against the Finance Act 2026 legal text (Directorate General of Withholding
 * Taxes, fbr.gov.pk).
 * ============================================================================
 */

export type FilerStatus = "filer" | "non-filer";

export const LAST_UPDATED = "1 July 2026";
export const CURRENT_FISCAL_YEAR = "2026-27";

export const DISCLAIMER =
  "Rates sourced from FBR's Finance Act 2025 and Finance Act 2026. Tax law can change — always verify current rates at fbr.gov.pk before relying on this for a real transaction.";

export const FBR_ATL_URL = "https://e.fbr.gov.pk/esbn/Verification";
export const FBR_HOME_URL = "https://www.fbr.gov.pk/";

/* -------------------------------------------------------------------------- */
/* Rate table types                                                            */
/* -------------------------------------------------------------------------- */

export interface EngineSlab {
  /** Inclusive lower bound in cc */
  minCc: number;
  /** Inclusive upper bound in cc; null = no upper limit */
  maxCc: number | null;
  label: string;
  filer: number;
  nonFiler: number;
}

export interface FiscalYearRates {
  year: string;
  label: string;

  /** Section 231AB — Cash withdrawal (percentages, e.g. 0.8 = 0.8%) */
  cashWithdrawal: {
    section: string;
    /** Daily aggregate threshold in PKR; tax applies on amount above this */
    dailyThreshold: number;
    filerRate: number;
    nonFilerRate: number;
  };

  /**
   * Section 236C (seller) & 236K (buyer) — property.
   * ⚡ Finance Act 2026: flat rates, NO filer/non-filer distinction,
   * "Late Filer" tier abolished (Rule 1A of the Tenth Schedule removed).
   */
  property: {
    sellSection: string;
    buySection: string;
    /** Flat % of gross consideration received (seller) */
    sellRate: number;
    /** Flat % of fair market value (buyer) */
    buyRate: number;
    flatForAll: true;
  };

  /** Section 231B(1)/(3) — vehicle registration / transfer, % of vehicle value */
  vehicleRegistration: {
    section: string;
    slabs: EngineSlab[];
  };

  /** Section 234 — annual motor vehicle tax, flat PKR by engine capacity */
  annualVehicle: {
    section: string;
    slabs: EngineSlab[];
  };

  /** Sections 151 & 150 — profit on debt and dividends (%) */
  investment: {
    categories: {
      id: string;
      label: string;
      section: string;
      note: string;
      filer: number;
      nonFiler: number;
    }[];
  };

  /** Section 236 — telephone / mobile / internet */
  telecom: {
    section: string;
    /** % of bill or prepaid card value — same for filers and non-filers */
    mobileRate: number;
    /** Landline: % of the amount of bill exceeding the threshold */
    landlineRate: number;
    landlineThreshold: number;
  };

  /** Section 235 — electricity bills */
  electricity: {
    section: string;
    /** Commercial & industrial tiers */
    business: {
      exemptUpTo: number;
      midRate: number;
      midUpperLimit: number;
      upperFixed: number;
      upperRateCommercial: number;
      upperRateIndustrial: number;
    };
    /** Domestic — applies to non-ATL consumers only */
    domesticNonFiler: {
      exemptUnder: number;
      rate: number;
    };
  };
}

/* -------------------------------------------------------------------------- */
/* FY 2026-27 (current)                                                        */
/* -------------------------------------------------------------------------- */

export const rates_2026_27: FiscalYearRates = {
  year: "2026-27",
  label: "Finance Act 2026",

  cashWithdrawal: {
    section: "231AB",
    dailyThreshold: 50000,
    filerRate: 0, // ATL persons are not subject to 231AB
    nonFilerRate: 0.8,
  },

  property: {
    sellSection: "236C",
    buySection: "236K",
    sellRate: 2.75, // ⚡ UPDATED — Finance Act 2026, flat for everyone
    buyRate: 1.25, // ⚡ UPDATED — Finance Act 2026, flat for everyone
    flatForAll: true,
  },

  vehicleRegistration: {
    section: "231B",
    slabs: [
      { minCc: 0, maxCc: 850, label: "Up to 850cc", filer: 0.5, nonFiler: 1.5 },
      { minCc: 851, maxCc: 1000, label: "851 – 1000cc", filer: 1.0, nonFiler: 3.0 },
      { minCc: 1001, maxCc: 1300, label: "1001 – 1300cc", filer: 1.5, nonFiler: 4.5 },
      { minCc: 1301, maxCc: 1600, label: "1301 – 1600cc", filer: 2.0, nonFiler: 6.0 },
      { minCc: 1601, maxCc: 1800, label: "1601 – 1800cc", filer: 3.0, nonFiler: 9.0 },
      { minCc: 1801, maxCc: 2000, label: "1801 – 2000cc", filer: 5.0, nonFiler: 15.0 },
      { minCc: 2001, maxCc: 2500, label: "2001 – 2500cc", filer: 7.0, nonFiler: 21.0 },
      { minCc: 2501, maxCc: 3000, label: "2501 – 3000cc", filer: 9.0, nonFiler: 27.0 },
      { minCc: 3001, maxCc: null, label: "Above 3000cc", filer: 12.0, nonFiler: 36.0 },
    ],
  },

  annualVehicle: {
    section: "234",
    slabs: [
      { minCc: 0, maxCc: 1000, label: "Up to 1000cc", filer: 800, nonFiler: 1600 },
      { minCc: 1001, maxCc: 1199, label: "1001 – 1199cc", filer: 1500, nonFiler: 3000 },
      { minCc: 1200, maxCc: 1299, label: "1200 – 1299cc", filer: 1750, nonFiler: 3500 },
      { minCc: 1300, maxCc: 1499, label: "1300 – 1499cc", filer: 2500, nonFiler: 5000 },
      { minCc: 1500, maxCc: 1599, label: "1500 – 1599cc", filer: 3750, nonFiler: 7500 },
      { minCc: 1600, maxCc: 1999, label: "1600 – 1999cc", filer: 4500, nonFiler: 9000 },
      { minCc: 2000, maxCc: null, label: "2000cc & above", filer: 10000, nonFiler: 20000 },
    ],
  },

  investment: {
    categories: [
      {
        id: "bank-profit",
        label: "Profit on bank deposit / savings account",
        section: "151",
        note: "Deducted by your bank when profit is credited.",
        filer: 20,
        nonFiler: 40,
      },
      {
        id: "profit-on-debt",
        label: "Other profit on debt (general)",
        section: "151",
        note: "Bonds, certificates and other debt instruments.",
        filer: 15,
        nonFiler: 30,
      },
      {
        id: "dividend-general",
        label: "Company dividend (general)",
        section: "150",
        note: "Default rate for most listed and unlisted companies.",
        filer: 15,
        nonFiler: 30,
      },
      {
        id: "dividend-ipp",
        label: "Dividend from Independent Power Purchasers (IPPs)",
        section: "150",
        note: "Concessional rate for power sector dividends.",
        filer: 7.5,
        nonFiler: 15,
      },
      {
        id: "mutual-fund-debt",
        label: "Mutual fund (50%+ income from profit on debt)",
        section: "150",
        note: "Debt-heavy money market and income funds.",
        filer: 25,
        nonFiler: 50,
      },
    ],
  },

  telecom: {
    section: "236",
    mobileRate: 15,
    landlineRate: 10,
    landlineThreshold: 1000,
  },

  electricity: {
    section: "235",
    business: {
      exemptUpTo: 500,
      midRate: 10,
      midUpperLimit: 20000,
      upperFixed: 1950,
      upperRateCommercial: 12,
      upperRateIndustrial: 5,
    },
    domesticNonFiler: {
      exemptUnder: 25000,
      rate: 7.5,
    },
  },
};

export const RATE_YEARS: Record<string, FiscalYearRates> = {
  "2026-27": rates_2026_27,
};

export const rates = rates_2026_27;

/* -------------------------------------------------------------------------- */
/* Calculation helpers (pure, client-side)                                     */
/* -------------------------------------------------------------------------- */

export const pct = (amount: number, rate: number) => (amount * rate) / 100;

export function findSlab(slabs: EngineSlab[], cc: number): EngineSlab {
  return (
    slabs.find((s) => cc >= s.minCc && (s.maxCc === null || cc <= s.maxCc)) ??
    slabs[slabs.length - 1]
  );
}

export function cashWithdrawalTax(amount: number, status: FilerStatus) {
  const { dailyThreshold, filerRate, nonFilerRate } = rates.cashWithdrawal;
  const rate = status === "filer" ? filerRate : nonFilerRate;
  const taxable = Math.max(0, amount - dailyThreshold);
  return { taxable, rate, tax: pct(taxable, rate) };
}

export function vehicleRegistrationTax(value: number, cc: number) {
  const slab = findSlab(rates.vehicleRegistration.slabs, cc);
  return { slab, filer: pct(value, slab.filer), nonFiler: pct(value, slab.nonFiler) };
}

export function annualVehicleTax(cc: number) {
  const slab = findSlab(rates.annualVehicle.slabs, cc);
  return { slab, filer: slab.filer, nonFiler: slab.nonFiler };
}

export function investmentTax(amount: number, categoryId: string) {
  const cat =
    rates.investment.categories.find((c) => c.id === categoryId) ?? rates.investment.categories[0];
  return { cat, filer: pct(amount, cat.filer), nonFiler: pct(amount, cat.nonFiler) };
}

export function mobileBillTax(amount: number) {
  return pct(amount, rates.telecom.mobileRate);
}

export function landlineBillTax(amount: number) {
  const { landlineRate, landlineThreshold } = rates.telecom;
  return pct(Math.max(0, amount - landlineThreshold), landlineRate);
}

export type ElectricityConsumer = "domestic" | "commercial" | "industrial";

export function electricityTax(
  bill: number,
  consumer: ElectricityConsumer,
  status: FilerStatus,
): number {
  const e = rates.electricity;
  if (consumer === "domestic") {
    if (status === "filer") return 0;
    return bill >= e.domesticNonFiler.exemptUnder ? pct(bill, e.domesticNonFiler.rate) : 0;
  }
  const b = e.business;
  if (bill <= b.exemptUpTo) return 0;
  if (bill <= b.midUpperLimit) return pct(bill, b.midRate);
  const upperRate = consumer === "commercial" ? b.upperRateCommercial : b.upperRateIndustrial;
  return b.upperFixed + pct(bill - b.midUpperLimit, upperRate);
}

/* -------------------------------------------------------------------------- */
/* Formatting                                                                  */
/* -------------------------------------------------------------------------- */

export function formatPKR(value: number, opts: { decimals?: boolean } = {}) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: opts.decimals ? 2 : 0,
    minimumFractionDigits: 0,
  })
    .format(Number.isFinite(value) ? value : 0)
    .replace("PKR", "Rs.");
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-PK", { maximumFractionDigits: 0 }).format(
    Number.isFinite(value) ? value : 0,
  );
}
