/* ============================================================================
 * COMPLIANCE MARKS
 *
 * These are ORIGINAL marks drawn for Ocean Bridge Trade. They deliberately do
 * not reproduce the official GACC, FDA, TRACES, SFDA, ESMA, GSO or any halal
 * certification logo.
 *
 * Two reasons, and the second matters more than the first:
 *   1. Those logos are trademarks of government and certification bodies and
 *      are not licensed for use as decoration.
 *   2. Ocean Bridge Trade is an asset-light intermediary — it does not hold
 *      those accreditations. Displaying the official marks would imply
 *      accreditation the company does not have, which is exactly the kind of
 *      overstatement the About page promises never to make.
 *
 * So the section is framed as regimes CLEARED, not certifications HELD. Each
 * mark is a geometric monogram: a ring, a region glyph, and the code.
 * ========================================================================= */

export type ComplianceRegime = {
  code: string;
  regime: string;
  jurisdiction: string;
  detail: string;
  /** Which generated glyph to draw behind the monogram. */
  glyph: "grid" | "arc" | "wave" | "star" | "chevron" | "lattice";
};

export const REGIMES: ComplianceRegime[] = [
  {
    code: "GACC",
    regime: "Decree 248 / CIFER",
    jurisdiction: "China",
    detail: "Facility registration verified and Field 519 declarations prepared before the offer is issued.",
    glyph: "grid",
  },
  {
    code: "TRACES",
    regime: "EU health certification",
    jurisdiction: "European Union",
    detail: "Consignment documentation and third-country establishment listing checked against the current EU list.",
    glyph: "arc",
  },
  {
    code: "IUU",
    regime: "Catch certification",
    jurisdiction: "European Union",
    detail: "Catch certificates validated to origin vessel before any EU-bound consignment moves.",
    glyph: "wave",
  },
  {
    code: "HACCP",
    regime: "21 CFR Part 123",
    jurisdiction: "United States",
    detail: "Processor HACCP plans reviewed against the FDA seafood hazard guide.",
    glyph: "lattice",
  },
  {
    code: "FSVP",
    regime: "Foreign Supplier Verification",
    jurisdiction: "United States",
    detail: "Supplier verification records assembled so the US importer's FSVP file is complete on arrival.",
    glyph: "chevron",
  },
  {
    code: "SFDA",
    regime: "FASAH clearance",
    jurisdiction: "Saudi Arabia",
    detail: "Registration and clearance routing confirmed ahead of shipment.",
    glyph: "star",
  },
  {
    code: "GSO",
    regime: "Gulf standards",
    jurisdiction: "GCC",
    detail: "Labelling and conformity mapped to the applicable GSO standards.",
    glyph: "grid",
  },
  {
    code: "HALAL",
    regime: "Certification oversight",
    jurisdiction: "GCC / Global",
    detail: "Certificate validity and issuing-body recognition confirmed for the destination market.",
    glyph: "arc",
  },
];

/* Each glyph is drawn from primitives — no traced logos. */
function Glyph({ kind }: { kind: ComplianceRegime["glyph"] }) {
  const stroke = "currentColor";
  const common = { fill: "none", stroke, strokeWidth: 1, vectorEffect: "non-scaling-stroke" as const };

  switch (kind) {
    case "grid":
      return (
        <g opacity={0.55} {...common}>
          <path d="M18 30 H46 M18 38 H46 M18 46 H46 M26 22 V54 M32 22 V54 M38 22 V54" />
        </g>
      );
    case "arc":
      return (
        <g opacity={0.55} {...common}>
          <path d="M16 44 A16 16 0 0 1 48 44" />
          <path d="M22 44 A10 10 0 0 1 42 44" />
          <path d="M28 44 A4 4 0 0 1 36 44" />
        </g>
      );
    case "wave":
      return (
        <g opacity={0.55} {...common}>
          <path d="M14 34 q8 -6 16 0 t16 0 t16 0" />
          <path d="M14 40 q8 -6 16 0 t16 0 t16 0" />
          <path d="M14 46 q8 -6 16 0 t16 0 t16 0" />
        </g>
      );
    case "star":
      return (
        <g opacity={0.55} {...common}>
          <path d="M32 18 L36 28 L46 32 L36 36 L32 46 L28 36 L18 32 L28 28 Z" />
        </g>
      );
    case "chevron":
      return (
        <g opacity={0.55} {...common}>
          <path d="M20 26 L32 38 L44 26" />
          <path d="M20 36 L32 48 L44 36" />
        </g>
      );
    case "lattice":
      return (
        <g opacity={0.55} {...common}>
          <path d="M18 32 L32 18 L46 32 L32 46 Z" />
          <path d="M24 32 L32 24 L40 32 L32 40 Z" />
        </g>
      );
  }
}

/**
 * A single compliance mark. `size` drives the whole thing so it can sit in a
 * marquee at 72px or a detail grid at 96px without separate styling.
 */
export function ComplianceMark({
  regime,
  size = 88,
  className,
}: {
  regime: ComplianceRegime;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={`${regime.code} — ${regime.regime}, ${regime.jurisdiction}`}
      className={className}
    >
      {/* Outer ring + inner hairline. */}
      <circle cx="32" cy="32" r="30.5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <circle cx="32" cy="32" r="26" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.18" />
      <Glyph kind={regime.glyph} />
      {/* Tick marks at the quarters — a compass reference, since the whole
        * brand idiom is navigation. */}
      <g opacity={0.45} stroke="currentColor" strokeWidth="1">
        <path d="M32 1.5 V6" />
        <path d="M32 58 V62.5" />
        <path d="M1.5 32 H6" />
        <path d="M58 32 H62.5" />
      </g>
    </svg>
  );
}

/**
 * Mark plus code plus regime line. The unit used in the compliance grid.
 */
export function ComplianceCard({ regime }: { regime: ComplianceRegime }) {
  return (
    <div className="card-lift group flex h-full flex-col border border-border bg-card p-7">
      <div className="text-[color:var(--brand-teal)] transition-transform duration-700 group-hover:rotate-[8deg]">
        <ComplianceMark regime={regime} size={72} />
      </div>
      <div className="mt-6 font-display text-2xl leading-none text-foreground">{regime.code}</div>
      <div className="mt-2 text-[15px] text-muted-foreground">{regime.regime}</div>
      <div className="label-caps mt-4">{regime.jurisdiction}</div>
      <p className="mt-4 text-[14px] leading-[1.65] text-fg-subtle">{regime.detail}</p>
    </div>
  );
}
