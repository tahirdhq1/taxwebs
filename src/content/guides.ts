export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  updated: string;
  readingTime: string;
  intro: string;
  sections: GuideSection[];
  faqs: { q: string; a: string }[];
  cta: { to: string; label: string; blurb: string };
}

export const guides: Guide[] = [
  {
    slug: "how-to-become-a-tax-filer",
    title: "How to become a tax filer in Pakistan",
    metaTitle: "How to Become a Tax Filer in Pakistan (2026 Step-by-Step Guide)",
    metaDescription:
      "A plain-English walkthrough of registering on FBR IRIS, getting your NTN and filing your first income tax return so your name appears on the Active Taxpayer List.",
    updated: "1 July 2026",
    readingTime: "6 min read",
    intro:
      "Becoming a filer means one thing in practice: filing your annual income tax return so FBR adds your name to the Active Taxpayer List. Here is the whole process, without the jargon.",
    sections: [
      {
        heading: "Step 1 — Register for an NTN on IRIS",
        paragraphs: [
          "For salaried individuals and most small business owners, your CNIC number is your NTN. You still need to create an account on FBR's IRIS portal to use it.",
          "Go to the IRIS portal, choose registration for an unregistered person, and enter your CNIC, mobile number registered in your own name, and email address. FBR sends separate verification codes to the phone and the email.",
        ],
      },
      {
        heading: "Step 2 — Complete your registration profile",
        paragraphs: [
          "Once logged in, complete the 181 form. You will be asked for your address, employer or business details, and bank account information.",
        ],
        bullets: [
          "Salaried: employer name and NTN, plus your annual salary",
          "Business: business name, address and principal activity",
          "Property income: address of the property being rented out",
        ],
      },
      {
        heading: "Step 3 — File your income tax return",
        paragraphs: [
          "The return itself has two parts: the return of income and the wealth statement. The wealth statement lists your assets and liabilities at year end, and the change from last year must be explained by your declared income.",
          "The normal deadline is 30 September for the tax year ending 30 June. File before the deadline to avoid landing in the late category or paying a penalty.",
        ],
      },
      {
        heading: "Step 4 — Check that you appear on the ATL",
        paragraphs: [
          "FBR publishes the Active Taxpayer List and updates it regularly. After your return is accepted, verify that your CNIC shows as active. Banks, excise offices and utilities read this list — not your return — when deciding what rate to deduct.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need to pay tax to become a filer?",
        a: "No. Filing a return and paying tax are separate things. If your income is below the taxable threshold you can still file a return with zero tax payable and appear on the ATL.",
      },
      {
        q: "How long before my name appears on the ATL?",
        a: "FBR updates the Active Taxpayer List regularly after returns are processed. Allow a few days after filing, then check with your CNIC.",
      },
      {
        q: "Can I file for previous years?",
        a: "Yes, returns for earlier tax years can be filed, though a surcharge may apply to be included in the current ATL. Check the current surcharge amount on FBR's portal.",
      },
    ],
    cta: {
      to: "/savings-summary",
      label: "See what non-filing costs you",
      blurb: "Add up the extra withholding tax you pay in a year by staying off the ATL.",
    },
  },
  {
    slug: "filer-vs-non-filer-guide",
    title: "Filer vs Non-Filer: the complete 2026 guide",
    metaTitle: "Filer vs Non-Filer in Pakistan: Complete 2026 Guide",
    metaDescription:
      "What filer and non-filer actually mean in Pakistan, every withholding tax where the rate differs, and what changed under the Finance Act 2026.",
    updated: "1 July 2026",
    readingTime: "8 min read",
    intro:
      "Pakistan does not have a legal category called 'non-filer' in the way most people imagine. What exists is the Active Taxpayer List — and whether you are on it decides the rate at which tax is deducted from your transactions.",
    sections: [
      {
        heading: "What the two words actually mean",
        paragraphs: [
          "A filer is a person whose name appears on FBR's Active Taxpayer List, which is published because they filed their income tax return for the relevant tax year. A non-filer is simply anyone who is not on that list.",
          "You are not on the list because you did not file — not because you earn too little or owe nothing.",
        ],
      },
      {
        heading: "Where the rate difference bites",
        paragraphs: [
          "The gap shows up in transaction taxes rather than salary tax. Salary tax is the same either way; what changes is what banks, excise offices and utilities deduct from you.",
        ],
        bullets: [
          "Cash withdrawal (231AB): 0.8% for non-filers, nothing for filers",
          "Vehicle registration (231B): three times the filer rate at every engine slab",
          "Annual motor vehicle tax (234): double the filer amount",
          "Bank profit (151): 40% instead of 20%",
          "Dividends (150): 30% instead of 15% on the general rate",
          "Domestic electricity (235): 7.5% on bills of Rs. 25,000 or more, filers exempt",
        ],
      },
      {
        heading: "What changed in the Finance Act 2026",
        paragraphs: [
          "The headline change is property. Sections 236C and 236K used to punish non-filers heavily — purchase tax reached 18.5%. The Finance Act 2026 replaced the whole slab structure with flat rates: 2.75% for the seller and 1.25% for the buyer, identical for everyone.",
          "The Late Filer category, introduced as a middle tier between filer and non-filer, has also been abolished for these sections with the removal of Rule 1A of the Tenth Schedule.",
        ],
      },
      {
        heading: "Is it still worth filing?",
        paragraphs: [
          "Yes, and for two reasons. First, the differential remains everywhere else — vehicles, cash, bank profit, dividends and electricity. Second, withholding tax paid by a filer is adjustable against annual liability and can be refunded; for a non-filer it is simply a cost.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is there still a 'late filer' category in 2026?",
        a: "Not for property transactions. Finance Act 2026 removed Rule 1A of the Tenth Schedule, which was the legal basis for the late-filer tier on sections 236C and 236K.",
      },
      {
        q: "Does filer status reduce my salary tax?",
        a: "No. Salary income tax slabs apply the same way to everyone. Filer status affects withholding tax on transactions.",
      },
      {
        q: "Can my ATL status change during the year?",
        a: "Yes. The list is updated as returns are filed and processed, so your status on the day of a transaction is what matters.",
      },
    ],
    cta: {
      to: "/calculators",
      label: "Compare the rates yourself",
      blurb: "Run any transaction through our calculators and see both rates side by side.",
    },
  },
  {
    slug: "fbr-atl-list-explained",
    title: "FBR ATL list: what it means and how it works",
    metaTitle: "FBR ATL List Explained: Active Taxpayer List in Pakistan",
    metaDescription:
      "What the FBR Active Taxpayer List is, when it is updated, how banks and excise offices use it, and how to check whether your CNIC is on it.",
    updated: "1 July 2026",
    readingTime: "5 min read",
    intro:
      "The Active Taxpayer List is the single database that decides your withholding tax rate on almost every transaction. Understanding how it is maintained explains most confusion around filer status.",
    sections: [
      {
        heading: "What the ATL is",
        paragraphs: [
          "The ATL is a published list of persons who filed their income tax return for the relevant tax year. It is maintained by FBR and is publicly searchable by CNIC or NTN.",
          "Every withholding agent — your bank, the excise office, your electricity company — is required to check this list before deducting tax.",
        ],
      },
      {
        heading: "When it is updated",
        paragraphs: [
          "A new ATL is published for each tax year and then updated on a rolling basis as returns are processed. If you file after the deadline, you may need to pay a surcharge to be added to the current year's list.",
        ],
      },
      {
        heading: "How to check your status",
        paragraphs: [
          "Use FBR's official online verification service and enter your CNIC without dashes. You can also send your CNIC by SMS to FBR's ATL service number. Never pay a third party to 'check' or 'add' your name.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is being on the ATL the same as having an NTN?",
        a: "No. An NTN means you are registered. Appearing on the ATL means you actually filed your return for the relevant year.",
      },
      {
        q: "What if my bank still deducts the non-filer rate?",
        a: "Show your ATL status and ask the branch to reverify. Withholding agents check the list on the date of the transaction.",
      },
    ],
    cta: {
      to: "/filer-status-checker",
      label: "Check your ATL status",
      blurb: "A step-by-step walkthrough of the official FBR verification page.",
    },
  },
  {
    slug: "section-236c-vs-236k",
    title: "Section 236C vs 236K explained",
    metaTitle: "Section 236C vs 236K Explained (Property Tax Pakistan 2026)",
    metaDescription:
      "The difference between 236C and 236K in plain English, who pays each, and the flat 2.75% and 1.25% rates introduced by the Finance Act 2026.",
    updated: "1 July 2026",
    readingTime: "5 min read",
    intro:
      "Two section numbers dominate every property transaction in Pakistan. They sound similar, they are charged on the same deal, and they are paid by opposite sides.",
    sections: [
      {
        heading: "236C — the seller's tax",
        paragraphs: [
          "Section 236C is advance tax on the disposal of immovable property, collected from the seller at the time of registering the transfer. It is charged on the gross consideration received.",
          "Under the Finance Act 2026 the rate is a flat 2.75% for everyone.",
        ],
      },
      {
        heading: "236K — the buyer's tax",
        paragraphs: [
          "Section 236K is advance tax on the purchase of immovable property, collected from the buyer on the fair market value of the property.",
          "Under the Finance Act 2026 the rate is a flat 1.25% for everyone.",
        ],
      },
      {
        heading: "What the 2026 change means",
        paragraphs: [
          "Before this change, both sections used a three-tier slab structure with separate filer, late-filer and non-filer rates — a non-filer buyer could face up to 18.5%. That structure is gone.",
          "For property specifically, filer status no longer changes what you pay. This does not extend to vehicles, cash withdrawals, bank profit or electricity, where the non-filer premium remains.",
        ],
      },
      {
        heading: "Both are adjustable",
        paragraphs: [
          "Advance tax under 236C and 236K is not a final tax for most people — it is adjustable against your annual income tax liability. To adjust or reclaim it, you have to file a return.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do buyer and seller both pay on the same transaction?",
        a: "Yes. The seller pays 236C on the consideration received and the buyer pays 236K on the fair market value of the same property.",
      },
      {
        q: "Is the rate different for non-filers in 2026?",
        a: "No. Both 236C and 236K are flat rates under the Finance Act 2026, with no filer or non-filer distinction and no late-filer tier.",
      },
      {
        q: "Is this tax refundable?",
        a: "It is adjustable against your annual liability, and any excess can be claimed as a refund — but only if you file a return.",
      },
    ],
    cta: {
      to: "/property-tax-calculator",
      label: "Calculate your property tax",
      blurb: "Enter your transaction value and get the 236C or 236K amount instantly.",
    },
  },
  {
    slug: "cash-withdrawal-tax-explained",
    title: "Cash withdrawal tax in Pakistan explained",
    metaTitle: "Cash Withdrawal Tax in Pakistan Explained (Section 231AB)",
    metaDescription:
      "How the 0.8% cash withdrawal tax under Section 231AB works, the daily aggregate threshold, who is exempt, and how much it costs a regular non-filer.",
    updated: "1 July 2026",
    readingTime: "4 min read",
    intro:
      "If your bank has ever deducted a few hundred rupees when you took out cash, this is why. Section 231AB applies only to people who are not on the Active Taxpayer List.",
    sections: [
      {
        heading: "How the deduction works",
        paragraphs: [
          "Banks are required to deduct 0.8% advance tax when a person not on the ATL withdraws cash above the daily aggregate threshold. It is taken directly from the account at the time of withdrawal.",
          "The threshold applies to the total withdrawn from the same bank on the same day, not to each individual transaction — splitting a withdrawal in two does not avoid it.",
        ],
      },
      {
        heading: "Who is exempt",
        paragraphs: [
          "Persons on the Active Taxpayer List are not subject to this deduction at all. Certain categories of account holders also have exemptions under the law; your bank can confirm whether yours applies.",
        ],
      },
      {
        heading: "What it costs in practice",
        paragraphs: [
          "For a business owner or landlord who regularly moves cash, this is often the most visible non-filer cost. A few large withdrawals a month add up to a meaningful annual figure — and unlike a filer, a non-filer cannot adjust it against anything.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does this apply to ATM withdrawals?",
        a: "Yes, cash withdrawn through any channel counts towards the daily aggregate from that bank.",
      },
      {
        q: "Can I get this tax back?",
        a: "Advance tax is adjustable against your annual income tax liability — but you must file a return to claim it, and filing also removes the deduction in the first place.",
      },
      {
        q: "Does splitting withdrawals across banks help?",
        a: "The threshold is applied per bank, but relying on that is impractical and does not change the underlying position — filing does.",
      },
    ],
    cta: {
      to: "/cash-withdrawal-tax-calculator",
      label: "Calculate your withdrawal tax",
      blurb: "Enter a daily withdrawal amount and see the exact deduction.",
    },
  },
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
