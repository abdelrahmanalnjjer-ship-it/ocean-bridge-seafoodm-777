/* ============================================================================
 * INSIGHTS
 *
 * Five articles written for Ocean Bridge Trade's buyer audience — processors,
 * importers and distributors. Each one answers a question a buyer actually
 * asks before placing a first order, and demonstrates the compliance knowledge
 * the company sells.
 *
 * These are drafts written by an assistant, not published trade journalism.
 * Have someone with direct GACC / EU / FDA filing experience read them before
 * they go live: regulatory detail changes, and a wrong specific on a
 * compliance-led site costs more credibility than having no blog at all.
 * ========================================================================= */

export interface Article {
  slug: string;
  title: string;
  standfirst: string;
  topic: string;
  date: string; // ISO
  dateLabel: string;
  readingMinutes: number;
  image: string;
  imageAlt: string;
  body: string[]; // paragraphs; a leading "## " marks a subheading
}

export const ARTICLES: Article[] = [
  {
    slug: "gacc-decree-248-what-cifer-registration-actually-requires",
    title: "GACC Decree 248: what CIFER registration actually requires",
    standfirst:
      "Most first-time exporters to China discover the registration requirement after the cargo is packed. Here is the sequence, and where it usually stalls.",
    topic: "China",
    date: "2026-07-28",
    dateLabel: "28 July 2026",
    readingMinutes: 6,
    image: "/website-images/port-cranes.webp",
    imageAlt: "Container cranes at an export terminal",
    body: [
      "China's Decree 248 changed the question a Chinese importer asks a new supplier. It is no longer whether the product meets specification. It is whether the establishment that produced it appears on the General Administration of Customs list, under the correct product category, with a registration that has not lapsed.",
      "That distinction catches people out. A processor can be excellent, fully HACCP-compliant, and still be unable to ship a single carton to Qingdao because its CIFER record covers a category that does not include the product in the container.",
      "## Registration sits with the establishment, not the trader",
      "The registration belongs to the processing facility. A trading company cannot hold it on a processor's behalf, and it does not transfer when a buyer changes supplier. If you are sourcing from a new plant, you are starting from that plant's registration status — not from your own history in the market.",
      "This is why we verify the CIFER record before quoting rather than after. A price built on an establishment that cannot legally ship is not a price, it is a delay with a number attached.",
      "## The three failure points we see most",
      "First, category mismatch. The establishment is registered, but for a category that does not cover the specific product. Frozen whole fish and frozen fillet can sit in different places depending on how the original application was written.",
      "Second, expiry. Registrations run for a fixed term and renewal is not automatic. A record that was valid when the relationship started may not be valid when the season comes round again.",
      "Third, Field 519. The declaration has to carry the registration number in the right field, formatted correctly. A valid registration declared wrongly produces the same outcome as no registration: the consignment stops.",
      "## What a buyer should ask for",
      "Ask for the establishment's registration number, the category it covers, and the expiry date — in writing, before the offer is accepted. Any supplier who cannot produce those three things quickly is telling you something about how they operate.",
      "We provide them as part of the offer, alongside the specification. Not because it is generous, but because a shipment that clears is worth more than a shipment that was cheap.",
    ],
  },
  {
    slug: "available-versus-in-season-reading-an-oman-catch-calendar",
    title: "Available, or in season? Reading an Oman catch calendar",
    standfirst:
      "Two words that look interchangeable on a product list and mean very different things to your production schedule.",
    topic: "Sourcing",
    date: "2026-07-14",
    dateLabel: "14 July 2026",
    readingMinutes: 5,
    image: "/website-images/fishermen.webp",
    imageAlt: "Omani fishermen landing the day's catch",
    body: [
      "Every line in our catalogue carries a season window and a status. Buyers tend to read the status and skip the window. It should be the other way round.",
      "## What the two fields mean",
      "'Available' means the species lands in commercially useful volume across most of the year, and a reasonable order can usually be filled without waiting for a specific window. 'Seasonal' means it cannot.",
      "The season window is the more important number, because it tells you when the fish is at its best rather than merely present. Silver pomfret is technically obtainable outside October to March. It is not the same fish.",
      "## Why the Arabian Sea is not a single season",
      "Oman's coastline runs roughly two thousand kilometres, from the Musandam peninsula down past Muscat to the Dhofar coast near Salalah. The southwest monsoon — the khareef — pushes cool, nutrient-rich water up along the southern coast between roughly June and September. That upwelling drives the small pelagic run and makes parts of the coast very hard to fish at the same time.",
      "The practical consequence is that a species can be in season in the south and unavailable in the north in the same month. A calendar that gives you one national window per species is a simplification, and we will tell you where it is hiding something that matters to your order.",
      "## Planning against it",
      "If your production is fixed to a calendar, work backwards from the season window and build in the freezing method. Super-frozen tuna held at −60°C gives you a completely different planning horizon from IQF sardine.",
      "If your production is flexible, tell us. A buyer who can shift a run by three weeks can often buy better fish at a better price, simply by landing inside the window instead of at the edge of it.",
    ],
  },
  {
    slug: "the-eu-iuu-catch-certificate-end-to-end",
    title: "The EU IUU catch certificate, end to end",
    standfirst:
      "The document that stops more Arabian Sea consignments at European borders than any specification failure.",
    topic: "European Union",
    date: "2026-06-30",
    dateLabel: "30 June 2026",
    readingMinutes: 7,
    image: "/website-images/harbor-boats.webp",
    imageAlt: "Fishing vessels moored in an Omani harbour",
    body: [
      "The European Union's regulation on illegal, unreported and unregulated fishing requires that every consignment of marine catch entering the EU arrives with a validated catch certificate traceable to the vessel that caught it. Not the processor. The vessel.",
      "## Why this is harder in a small-boat fishery",
      "Oman's catch comes substantially from artisanal vessels. That is a quality advantage — day boats, short trips, fish that has not sat in a hold for a fortnight — and a documentation burden, because a single container may aggregate catch from many landings.",
      "Each of those landings has to be traceable. The certificate is only as good as the chain beneath it, and the chain is built at the landing site, not in an office afterwards.",
      "## The sequence",
      "The catch is recorded at landing against the vessel. The competent authority in the flag state validates the certificate. The consignment is then declared into the EU with the certificate attached, and the importer submits it through the relevant national system.",
      "Where consignments are split or re-exported, a processing statement has to accompany the original certificate and account for yield. A twelve-tonne certificate cannot support fourteen tonnes of product, and border control posts do the arithmetic.",
      "## Where it goes wrong",
      "Aggregation without traceability is the usual failure. A processor buys from several sources, mixes the raw material, and then cannot demonstrate which certificate covers which portion of the finished lot.",
      "The second is timing. Validation takes time, and a certificate chased after the container has sailed is a certificate that will not arrive before the vessel does.",
      "## What we do about it",
      "We build the catch documentation alongside the commercial file rather than after it, and we decline consignments where the chain to vessel cannot be demonstrated. That occasionally costs a sale. It has never cost a buyer a detained container.",
    ],
  },
  {
    slug: "where-oman-origin-cold-chain-actually-fails",
    title: "Where an Oman-origin cold chain actually fails",
    standfirst:
      "Not in the freezer. In the ninety minutes between the boat and it, and in the two hours at the port.",
    topic: "Cold chain",
    date: "2026-06-16",
    dateLabel: "16 June 2026",
    readingMinutes: 6,
    image: "/website-images/harbor-dusk.webp",
    imageAlt: "Omani harbour at dusk",
    body: [
      "Buyers audit freezers. Freezers are easy to audit — they have a temperature readout and a chart, and they are almost never the problem.",
      "The failures happen in the gaps: the open boat in forty-degree air, the pickup with no insulation, the pallet standing on a quay waiting for a reefer plug that is already occupied.",
      "## The first gap: landing to first chill",
      "Quality is decided here and cannot be recovered later. Freezing a fish that has already spent two hours warm produces a frozen fish that has already spent two hours warm. The histamine risk in scombroid species — tuna, mackerel, kingfish — is set in this window, and no amount of downstream cold fixes it.",
      "What matters is ice ratio at the boat and time to first chill. Both are observable if you are standing there, and invisible in a document.",
      "## The second gap: plant to port",
      "The transfer to the terminal is where temperature is most often lost, because it is the step nobody owns. The processor's responsibility ends at the gate, the freight forwarder's begins at the terminal, and the truck in between belongs to whoever was available.",
      "Ask who owns the truck. If the answer takes more than one sentence, that is your weak link.",
      "## The third gap: the reefer plug",
      "A container that arrives at a busy terminal and waits for a plug is a container warming up. Pre-booking the plug is unglamorous, cheap, and the single highest-return thing in the chain.",
      "## Why we insist on being there",
      "None of the three gaps is visible from a remote document audit. They are visible from the quay, which is the argument for having people in Muscat rather than a database in another time zone.",
    ],
  },
  {
    slug: "choosing-incoterms-for-frozen-seafood-fob-versus-cfr",
    title: "Choosing Incoterms for frozen seafood: FOB or CFR",
    standfirst:
      "The clause that decides who owns the problem when a reefer container loses power mid-ocean.",
    topic: "Commercial",
    date: "2026-05-29",
    dateLabel: "29 May 2026",
    readingMinutes: 5,
    image: "/website-images/port-cranes.webp",
    imageAlt: "Container terminal at night",
    body: [
      "Most seafood moves on FOB or CFR. The choice looks like a question about who books the ship. It is really a question about who carries the risk during the leg where the most value can be destroyed.",
      "## What each term actually does",
      "Under FOB, the seller's obligation ends when the goods are on board at the named port of shipment. Risk passes there. The buyer arranges and pays for carriage, and carries the risk of the sea leg.",
      "Under CFR, the seller arranges and pays for carriage to the named destination port — but risk still passes on loading at origin. That surprises people. Paying for the freight does not mean carrying the risk of it.",
      "Neither term includes insurance. If you want the seller carrying insurance on the sea leg, you are asking for CIF, and you should say so.",
      "## Why it matters more for reefer than for dry cargo",
      "A dry container that is delayed arrives late. A reefer container that loses power arrives worthless. The value at risk during the sea leg is close to the full value of the consignment, which makes the location of risk transfer a commercial decision rather than a formality.",
      "## A practical default",
      "If you have an established forwarder with reefer experience on the route, FOB Salalah or FOB Sohar gives you control of the carrier and usually a better rate.",
      "If you do not, CFR to your destination port moves the booking to the party who does this route regularly. Just be clear that the risk still sat with you from the moment the container was loaded, and insure accordingly.",
      "## What we put in the offer",
      "Every offer we issue names the Incoterm, the edition, the named port, and the validity window. An offer that says only 'CFR' without a port is not a commercial term, it is an invitation to argue later.",
    ],
  },
];

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug);
