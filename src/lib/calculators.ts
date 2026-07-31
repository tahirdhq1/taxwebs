import {
  Banknote,
  Building2,
  Car,
  CircleDollarSign,
  Gauge,
  Landmark,
  Lightbulb,
  Smartphone,
  Sigma,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface CalculatorEntry {
  to: string;
  title: string;
  short: string;
  section: string;
  icon: LucideIcon;
}

export const calculators: CalculatorEntry[] = [
  {
    to: "/property-tax-calculator",
    title: "Property Purchase & Sale Tax",
    short: "Work out 236C and 236K on any property deal.",
    section: "236C / 236K",
    icon: Building2,
  },
  {
    to: "/vehicle-tax-calculator",
    title: "Vehicle Registration & Transfer Tax",
    short: "Tax charged when you register or transfer a car.",
    section: "231B",
    icon: Car,
  },
  {
    to: "/cash-withdrawal-tax-calculator",
    title: "Cash Withdrawal Tax",
    short: "0.8% hits non-filers above the daily limit.",
    section: "231AB",
    icon: Banknote,
  },
  {
    to: "/bank-profit-tax-calculator",
    title: "Bank Profit & Dividend Tax",
    short: "Non-filers pay double on savings and dividends.",
    section: "151 / 150",
    icon: CircleDollarSign,
  },
  {
    to: "/annual-vehicle-tax-calculator",
    title: "Annual Motor Vehicle Tax",
    short: "The yearly tax collected with your token.",
    section: "234",
    icon: Gauge,
  },
  {
    to: "/mobile-bill-tax-calculator",
    title: "Mobile & Internet Bill Tax",
    short: "15% advance tax on every top-up and bill.",
    section: "236",
    icon: Smartphone,
  },
  {
    to: "/electricity-bill-tax-calculator",
    title: "Electricity Bill Tax",
    short: "Monthly advance tax on domestic and business bills.",
    section: "235",
    icon: Lightbulb,
  },
  {
    to: "/savings-summary",
    title: "Yearly Non-Filer Cost Summary",
    short: "Add up everything you overpay in a year.",
    section: "All sections",
    icon: Sigma,
  },
  {
    to: "/filer-status-checker",
    title: "Check My Filer (ATL) Status",
    short: "Step-by-step guide to the official FBR check.",
    section: "ATL",
    icon: Landmark,
  },
];
