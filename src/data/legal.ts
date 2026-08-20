/* ---------------------------------------------------------------------------
 * LEGAL AND POLICY CONTENT
 *
 * These four documents replace four <span> elements that sat in the footer
 * looking like links and going nowhere. On a business whose entire pitch is
 * "we hold the documentation and answer for it," four dead legal links were a
 * credibility problem, and a non-functional "Privacy and cookies" is an
 * exposure the moment a buyer in Rotterdam, Vigo or Piraeus opens the site.
 *
 * THESE ARE DRAFTS. They are accurate to what this site and this business
 * actually do — every factual claim below was checked against the code, and
 * the privacy notice in particular describes the real data flows rather than
 * boilerplate. They still need review by a qualified lawyer in Oman and,
 * because the company markets into the EU, by someone who can confirm the
 * GDPR position before you rely on them.
 *
 * Content lives here rather than in the route so a non-developer can edit it
 * without touching JSX.
 * ------------------------------------------------------------------------ */

export const LEGAL_UPDATED = "20 August 2026";

export type LegalBlock =
  | { kind: "p"; text: string }
  | { kind: "h"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "dl"; items: [string, string][] };

export type LegalDoc = {
  slug: string;
  title: string;
  standfirst: string;
  blocks: LegalBlock[];
};

const COMPANY = "Ocean Bridge Trade";
const EMAIL = "info@oceanbridge-trade.com";

export const LEGAL_DOCS: LegalDoc[] = [
  /* ------------------------------------------------------------------ */
  {
    slug: "privacy",
    title: "Privacy and cookies",
    standfirst:
      "What this website collects, why, and how long it is kept. It is a short document because the site collects very little.",
    blocks: [
      { kind: "h", text: "Who is responsible" },
      {
        kind: "p",
        text: `${COMPANY}, Muscat, Sultanate of Oman, is the controller of the personal data described here. Questions about anything on this page go to ${EMAIL}.`,
      },

      { kind: "h", text: "What this website collects" },
      {
        kind: "p",
        text: "There are exactly two places on this site where you can give us information, and one preference the site remembers for you.",
      },
      {
        kind: "dl",
        items: [
          [
            "Market notes sign-up",
            "Your email address, and a note of which page you subscribed from. Stored in our database and used only to send the market notes described next to the sign-up field.",
          ],
          [
            "Buyer inquiry form",
            "Nothing is transmitted to us by the form itself. When you submit it, your browser opens a draft email in your own mail client containing what you typed. Nothing reaches us until you press send in that client, and until then the information stays on your device.",
          ],
          [
            "Language preference",
            "If you switch the site to Arabic, that choice is saved in your browser's local storage under the key obt.locale so the site opens in the right language next time. It never leaves your device and we cannot read it.",
          ],
        ],
      },

      { kind: "h", text: "What this website does not do" },
      {
        kind: "ul",
        items: [
          "No advertising cookies, and no advertising networks of any kind.",
          "No analytics. There is no Google Analytics, no Meta pixel, and no third-party tracking script on any page.",
          "No profiling, no automated decision-making, and no sale or sharing of personal data with anyone for their own purposes.",
          "No cookie banner, because there are no cookies that would require consent.",
        ],
      },

      { kind: "h", text: "Server logs and hosting" },
      {
        kind: "p",
        text: "Like any website, ours is served by infrastructure that keeps short-lived technical logs — IP address, timestamp, requested URL, browser user agent — for security and to keep the service running. These are held by our hosting and database providers under contract, are not used to build any profile of you, and are not combined with anything else we hold.",
      },

      { kind: "h", text: "Correspondence" },
      {
        kind: "p",
        text: "When you email, call or message the trade desk, we keep that correspondence and any commercial details in it for as long as needed to deal with your inquiry and to meet our record-keeping obligations as an exporter and intermediary. Trade documentation is generally kept for the period required by the customs and food-safety regimes involved, which in most of our destination markets is between five and ten years.",
      },

      { kind: "h", text: "How long we keep things" },
      {
        kind: "dl",
        items: [
          [
            "Market notes subscription",
            "Until you unsubscribe. Every message contains a one-click unsubscribe link, and you can also just ask us.",
          ],
          [
            "Buyer inquiries and correspondence",
            "For the life of the commercial relationship, then for the retention period required by the applicable customs and food-safety rules.",
          ],
          ["Technical server logs", "A short rolling window held by our providers."],
        ],
      },

      { kind: "h", text: "Your rights" },
      {
        kind: "p",
        text: "You can ask us for a copy of what we hold about you, ask us to correct it, ask us to delete it, or object to a particular use. Write to us and we will respond within thirty days. If you are in the European Union or the United Kingdom, the rights available to you under the GDPR — access, rectification, erasure, restriction, portability, objection, and the right to complain to your national supervisory authority — apply to the processing described above.",
      },

      { kind: "h", text: "International transfers" },
      {
        kind: "p",
        text: "We are based in Oman and our buyers are in China, the European Union, the Gulf and the United States. Handling a shipment necessarily means moving commercial and contact details between those jurisdictions and to the certifying bodies and authorities that require them. Where a transfer involves personal data leaving the EEA, we rely on the transfer mechanisms recognised under the GDPR.",
      },

      { kind: "h", text: "Changes" },
      {
        kind: "p",
        text: `We will update this page if what the site does changes. The date at the top is the last revision.`,
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "terms",
    title: "Terms and conditions",
    standfirst:
      "The terms on which this website is provided. Individual shipments are governed by the written contract for that transaction, not by this page.",
    blocks: [
      { kind: "h", text: "This site is information, not an offer" },
      {
        kind: "p",
        text: "Everything on this website — the catalogue, the season windows, the size ranges, the grades, the HS codes and the market notes — is published for general information. None of it is an offer capable of acceptance, a guarantee of availability, or a quotation. Availability, specification, grade and price are confirmed per transaction, in writing, against live supply.",
      },

      { kind: "h", text: "What we do and what we do not do" },
      {
        kind: "p",
        text: `${COMPANY} is a sourcing and transaction-coordination company. We verify supply at origin, confirm that the certifications held by processing establishments are current and recognised in the destination market, prepare and review documentation, and coordinate the commercial workflow. We do not own fishing vessels, processing plants or cold stores, and we do not issue the certifications we verify — those are issued by the competent authorities and accredited bodies named in each case.`,
      },

      { kind: "h", text: "Accuracy" },
      {
        kind: "p",
        text: "We take care to keep the catalogue and the regulatory information on this site current, but food-safety and import rules change frequently and without notice. Nothing here should be relied on as a substitute for confirming the position with the competent authority in your own market at the time you intend to import. Where an article on this site describes a regulatory requirement, it describes our understanding at the date of publication.",
      },

      { kind: "h", text: "Contracts" },
      {
        kind: "p",
        text: "A transaction arises only when we and the buyer have agreed written terms covering specification, quantity, Incoterms, validity window and payment structure. Those terms govern the shipment. Nothing on this website varies them, and in the event of a conflict the written contract prevails.",
      },

      { kind: "h", text: "Intellectual property" },
      {
        kind: "p",
        text: "The text, photography, catalogue data and design of this website belong to us or are used under licence, except where a credit says otherwise. The terminal photography on the destination markets section is used under the Wikimedia Commons licences credited beneath it. You may read, print and share these pages; you may not republish the catalogue data or the articles as your own.",
      },

      { kind: "h", text: "Liability" },
      {
        kind: "p",
        text: "We do not exclude liability for fraud, for death or personal injury caused by negligence, or for anything else that cannot lawfully be excluded. Beyond that, and to the extent the law allows, we are not liable for loss arising from reliance on general information published on this website, as distinct from the written terms of a transaction we have entered into.",
      },

      { kind: "h", text: "Governing law" },
      {
        kind: "p",
        text: "These website terms are governed by the laws of the Sultanate of Oman. The law and dispute-resolution provisions applying to a shipment are those set out in the contract for that shipment.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "security",
    title: "Security and fraud awareness",
    standfirst:
      "Seafood trading attracts payment-diversion fraud. This page sets out how we communicate, so you can tell a real message from an impostor.",
    blocks: [
      { kind: "h", text: "Why this page exists" },
      {
        kind: "p",
        text: "Commodity trading is a standing target for business email compromise. The pattern is consistent: a buyer receives what appears to be a routine invoice or a note that the seller's banking details have changed, pays it, and discovers weeks later that the message came from a look-alike domain. The sums involved in a container of frozen seafood make it worth a fraudster's time.",
      },

      { kind: "h", text: "How to verify that a message is from us" },
      {
        kind: "dl",
        items: [
          [
            "Our only domain",
            "oceanbridge-trade.com. Every genuine email from us ends in @oceanbridge-trade.com. Check the full address, not the display name — a display name can say anything.",
          ],
          [
            "Look-alike domains",
            "Treat anything hyphenated, misspelled, or on a different suffix as hostile: oceanbridgetrade.com, ocean-bridgetrade.com, oceanbridge-trade.co, and similar. We do not use them.",
          ],
          [
            "Our telephone numbers",
            "+968 77 62 1857 (Oman) and +971 50 485 0309 (WhatsApp). These are published here so you have a reference copy that a fraudster cannot edit.",
          ],
        ],
      },

      { kind: "h", text: "Banking details" },
      {
        kind: "p",
        text: "We will never change our banking details mid-transaction. If you receive any communication that appears to come from us announcing new bank details, amended payment instructions, or an urgent change of beneficiary, treat it as fraudulent. Do not reply to it, do not act on it, and do not use any contact detail contained in it.",
      },
      {
        kind: "p",
        text: "Call the trade desk on a number you already hold — from this page, from a signed contract, or from an earlier verified exchange — and confirm before moving any funds. We would always rather take a call that turns out to be unnecessary.",
      },

      { kind: "h", text: "What we will never ask you for" },
      {
        kind: "ul",
        items: [
          "Payment to an account in a name other than the contracting entity named in your written contract.",
          "An urgent transfer outside the payment structure already agreed in writing.",
          "Your banking passwords, one-time codes or card details. We have no use for them.",
          "A fee to release, clear or expedite a consignment that is not provided for in your contract.",
        ],
      },

      { kind: "h", text: "Recruitment and agency approaches" },
      {
        kind: "p",
        text: "We do not charge candidates for job applications and we do not appoint agents or representatives who are entitled to collect money on our behalf without a signed agreement you can verify with us directly. If someone claims to represent us, ask us.",
      },

      { kind: "h", text: "If something looks wrong" },
      {
        kind: "p",
        text: `Forward the message to ${EMAIL} and call us. If you have already sent funds, contact your bank immediately and ask them to attempt a recall — the first few hours matter more than anything else you can do.`,
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    slug: "disclosures",
    title: "Regulatory disclosures",
    standfirst:
      "Our role in the regulatory chain, stated plainly: what we verify, what we do not issue, and who the actual authority is in each market.",
    blocks: [
      { kind: "h", text: "Our role" },
      {
        kind: "p",
        text: `${COMPANY} is an intermediary. We are not a competent authority, not an accredited certification body, and not an inspection agency. We do not issue certificates, health attestations, catch certificates or conformity marks, and nothing on this website should be read as us doing so.`,
      },
      {
        kind: "p",
        text: "What we do is confirm that the establishments in our vetted Oman network hold the approvals a given destination market requires, that those approvals are current, that the issuing body is recognised in that market, and that the documentation file is complete before a consignment moves.",
      },

      { kind: "h", text: "Who the authority actually is" },
      {
        kind: "dl",
        items: [
          [
            "Oman — origin",
            "The Ministry of Agriculture, Fisheries and Water Resources is the competent authority for fisheries and for the approval and listing of processing establishments.",
          ],
          [
            "China",
            "The General Administration of Customs of the People's Republic of China (GACC) operates facility registration under Decree 248 and the CIFER system. Registration is held by the establishment, not by us.",
          ],
          [
            "European Union",
            "Third-country establishment listing, TRACES health certification and IUU catch certificate validation are matters for the competent authority in the country of origin and the border control post in the member state of entry.",
          ],
          [
            "United States",
            "Seafood HACCP under 21 CFR Part 123 and the Foreign Supplier Verification Programme are obligations of the US importer of record under FDA rules. We prepare and supply the supporting file; the importer holds the obligation.",
          ],
          [
            "Gulf Cooperation Council",
            "The Saudi Food and Drug Authority and the GCC Standardization Organization set the applicable conformity requirements, with halal certification issued by bodies accredited for the destination market.",
          ],
        ],
      },

      { kind: "h", text: "Certification marks" },
      {
        kind: "p",
        text: "Where this site displays a regulatory mark or scheme name, it identifies a requirement we work to and, where stated, an approval held by an establishment in our network. It does not indicate that this company is certified, accredited or endorsed by that body.",
      },

      { kind: "h", text: "Catch legality" },
      {
        kind: "p",
        text: "We source only from licensed operators and require documentation sufficient to support the catch certification a destination market demands. Responsibility for the accuracy of a catch certificate rests with the vessel operator and the validating authority.",
      },

      { kind: "h", text: "Sanctions and trade controls" },
      {
        kind: "p",
        text: "We screen counterparties and do not knowingly transact where doing so would breach applicable sanctions or export controls. Buyers remain responsible for import licensing and for compliance in their own jurisdiction.",
      },

      { kind: "h", text: "Corrections" },
      {
        kind: "p",
        text: `If you believe anything stated on this site about a regulatory requirement is out of date or wrong, tell us at ${EMAIL} and we will check it and correct the page.`,
      },
    ],
  },
];

export const legalBySlug = (slug: string) => LEGAL_DOCS.find((d) => d.slug === slug);
