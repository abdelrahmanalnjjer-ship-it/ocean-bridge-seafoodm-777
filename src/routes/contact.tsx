import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Check, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { LineReveal, Reveal } from "@/components/motion";

/* Search params carried in from the catalogue. Every "Inquire about this
 * species" button on /products used to land here on an empty form that had
 * never heard of the fish the buyer just clicked, so the first thing the site
 * asked them to do was retype what they had already told it. */
type ContactSearch = {
  species?: string;
  hs?: string;
  market?: string;
};

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): ContactSearch => ({
    species: typeof search.species === "string" ? search.species : undefined,
    hs: typeof search.hs === "string" ? search.hs : undefined,
    market: typeof search.market === "string" ? search.market : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Trade desk — Ocean Bridge Trade" },
      {
        name: "description",
        content:
          "Send your specification, volume, destination market and Incoterms. Buyer inquiries reviewed within 48 business hours. Muscat, Sultanate of Oman.",
      },
      { property: "og:title", content: "Ocean Bridge Trade — trade desk" },
      {
        property: "og:description",
        content: "Start a buyer inquiry. Reviewed within 48 business hours.",
      },
    ],
  }),
  component: ContactPage,
});

const WHAT_HAPPENS = [
  "We confirm whether the species and grade are running, and at what realistic volume.",
  "We map your destination market's requirements against the available establishments.",
  "You receive a written offer with specification, Incoterms, validity and payment structure.",
];

/* THE FORM SENDS A REAL EMAIL. IT DOES NOT PRETEND.
 *
 * What used to be here was `e.preventDefault(); setSent(true)` and a panel
 * reading "Inquiry received — a member of the commercial desk will come back
 * to you within 48 business hours." There was no handler behind it and no
 * table to land in: the only table in the schema is newsletter_signups, which
 * is why the newsletter box worked and this did not. Every buyer who filled
 * this in was told they had been heard, and nothing was recorded.
 *
 * There is no backend for it yet by choice, so rather than fake a receipt the
 * submit button now composes the inquiry into a mailto: addressed to the
 * trade desk, with every field laid out in the body. The buyer's own mail
 * client sends it, the desk receives a real email, and the confirmation panel
 * describes what actually happened instead of inventing a commitment.
 *
 * When a backend does arrive, replace `composeMailto` with a Supabase insert
 * (mirror the newsletter pattern in routes/index.tsx) and only set `sent`
 * once the insert resolves. Keep the failure state — right now the one thing
 * that must never come back is a success message nobody earned. */
const DESK_EMAIL = "info@oceanbridge-trade.com";

type InquiryFields = Record<string, string>;

const FIELD_LABELS: [string, string][] = [
  ["name", "Full name"],
  ["company", "Company"],
  ["email", "Work email"],
  ["market", "Destination market"],
  ["species", "Species and specification"],
  ["volume", "Target volume"],
  ["incoterms", "Preferred Incoterms"],
  ["notes", "Anything else"],
];

function composeMailto(values: InquiryFields) {
  const subject = `Buyer inquiry — ${values.company || "new enquiry"}${
    values.market ? ` — ${values.market}` : ""
  }`;
  const body = FIELD_LABELS.map(([key, label]) => {
    const v = (values[key] ?? "").trim();
    return v ? `${label}:\n${v}` : null;
  })
    .filter(Boolean)
    .join("\n\n");

  return `mailto:${DESK_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

function ContactPage() {
  const search = Route.useSearch();
  const [sent, setSent] = useState(false);
  const [values, setValues] = useState<InquiryFields>({});

  /* A species arriving from the catalogue fills the specification line, with
   * its HS code appended so the desk can identify it unambiguously. */
  const prefill: InquiryFields = {
    name: "",
    company: "",
    email: "",
    market: search.market ?? "",
    species: search.species
      ? search.hs
        ? `${search.species} (HS ${search.hs})`
        : search.species
      : "",
    volume: "",
    incoterms: "",
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as InquiryFields;
    setValues(data);
    window.location.href = composeMailto(data);
    setSent(true);
  };

  return (
    <div>
      {/* ---- Masthead ---- */}
      <section className="band-deep relative -mt-16 overflow-hidden">
        <div className="absolute inset-0 opacity-35">
          <img
            src="/website-images/harbor-dusk.webp"
            alt=""
            aria-hidden
            className="h-full w-full object-cover object-[50%_40%]"
          />
        </div>
        <div className="scrim-masthead absolute inset-0" />
        <div className="shell relative pb-24 pt-36">
          <div className="eyebrow mb-7">Trade desk</div>
          <h1 className="h-display h-display-xl max-w-[15ch]">
            <LineReveal immediate lines={["Tell us what", "you need to land."]} />
          </h1>
          <p className="lede lede-lg mt-8 max-w-2xl">
            For processors, importers and distributors sourcing Oman-origin seafood. Every inquiry
            is confidential and reviewed within 48 business hours.
          </p>
        </div>
      </section>

      {/* ---- Form + desk ---- */}
      <section className="band-paper">
        <div className="shell section-lg grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <Reveal>
            <div className="border border-border bg-card p-8 md:p-12">
              {sent ? (
                /* Honest confirmation. It describes what happened — a draft
                 * was handed to the visitor's mail client — and gives them a
                 * way through if that client never opened. It does not claim
                 * receipt of something that may still be sitting unsent. */
                <div className="flex min-h-[420px] flex-col justify-center">
                  <span className="grid size-14 place-items-center rounded-full bg-[color:var(--accent)] text-[color:var(--accent-foreground)]">
                    <Check className="size-6" />
                  </span>
                  <p className="h-display h-display-md mt-8">Your inquiry is ready to send.</p>
                  <p className="lede mt-4">
                    We have opened a draft in your email client with everything you entered. Send it
                    and the trade desk will come back to you within 48 business hours — usually
                    sooner if the species is in season.
                  </p>
                  <p className="lede mt-4">
                    If no draft appeared, your browser may not have an email client configured. Copy
                    the details below, or write to us directly.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <a href={composeMailto(values)} className="btn btn-solid">
                      Open the draft again
                      <ArrowUpRight className="size-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        void navigator.clipboard?.writeText(
                          FIELD_LABELS.map(([k, label]) => {
                            const v = (values[k] ?? "").trim();
                            return v ? `${label}: ${v}` : null;
                          })
                            .filter(Boolean)
                            .join("\n"),
                        );
                      }}
                      className="btn btn-outline"
                    >
                      Copy my details
                    </button>
                  </div>

                  <p className="mt-6 text-[14px] text-muted-foreground">
                    Or email{" "}
                    <a
                      href={`mailto:${DESK_EMAIL}`}
                      className="text-[color:var(--accent)] underline underline-offset-4"
                    >
                      {DESK_EMAIL}
                    </a>{" "}
                    · WhatsApp{" "}
                    <a
                      href="https://wa.me/971504850309"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[color:var(--accent)] underline underline-offset-4"
                    >
                      +971 50 485 0309
                    </a>
                  </p>
                </div>
              ) : (
                /* SINGLE COLUMN, ALL THE WAY DOWN.
                 * Three of these rows used to be md:grid-cols-2. Paired
                 * fields make a form look shorter and measurably raise the
                 * error rate, because the eye has two possible next targets
                 * at every step instead of one. */
                <form onSubmit={submit} className="space-y-6">
                  <Field
                    label="Full name"
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    defaultValue={prefill.name}
                  />
                  <Field
                    label="Company"
                    name="company"
                    required
                    autoComplete="organization"
                    placeholder="Registered company name"
                    defaultValue={prefill.company}
                  />
                  <Field
                    label="Work email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="name@company.com"
                    defaultValue={prefill.email}
                  />
                  <Field
                    label="Destination market"
                    name="market"
                    required
                    placeholder="Qingdao, Rotterdam, Jeddah…"
                    defaultValue={prefill.market}
                  />
                  <Field
                    label="Species and specification"
                    name="species"
                    required
                    placeholder="Species, grade, size range, packing"
                    defaultValue={prefill.species}
                  />
                  <Field
                    label="Target volume"
                    name="volume"
                    required
                    placeholder="MT per month"
                    defaultValue={prefill.volume}
                  />
                  <Field
                    label="Preferred Incoterms"
                    name="incoterms"
                    placeholder="FOB Salalah, CFR Qingdao…"
                    defaultValue={prefill.incoterms}
                  />
                  <div>
                    <label htmlFor="notes" className="eyebrow-muted">
                      Anything else
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={5}
                      className="mt-3 w-full resize-none border border-border bg-background/40 px-4 py-3 text-base text-foreground placeholder:text-fg-subtle transition-colors focus:border-[color:var(--accent)] focus:outline-none"
                      placeholder="Timelines, certification requirements, prior suppliers…"
                    />
                  </div>

                  {/* Reassurance sits ABOVE the button, where it can still
                   * answer the hesitation, rather than below it where it can
                   * only reassure someone who has already clicked. */}
                  <p className="text-[14px] leading-relaxed text-muted-foreground">
                    We use these details only to respond to your inquiry. Nothing is shared with a
                    supplier before you approve it.
                  </p>

                  <button type="submit" className="btn btn-solid group w-full sm:w-auto">
                    Send buyer inquiry
                    <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
                  </button>

                  <p className="text-[13px] leading-relaxed text-fg-subtle">
                    Opens a pre-filled email to {DESK_EMAIL}. Reviewed within 48 business hours.
                  </p>
                </form>
              )}
            </div>
          </Reveal>

          <div className="space-y-10">
            <Reveal delay={0.08}>
              <div className="border border-border bg-card p-8">
                <div className="eyebrow mb-7">Direct</div>

                <div className="mb-8 flex items-start gap-4">
                  <MapPin className="mt-1 size-4 shrink-0 text-fg-subtle" />
                  <div>
                    <div className="font-display text-2xl leading-none text-foreground">Muscat</div>
                    <div className="mt-1.5 text-[15px] text-muted-foreground">
                      Sultanate of Oman
                    </div>
                  </div>
                </div>

                <ul className="space-y-4 text-[15px]">
                  <li className="flex items-center gap-4">
                    <Phone className="size-4 shrink-0 text-fg-subtle" />
                    <a
                      href="tel:+96877621857"
                      className="num transition-colors hover:text-[color:var(--accent)]"
                    >
                      +968 77 62 1857
                    </a>
                    <span className="label-caps ms-auto">Oman</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <Phone className="size-4 shrink-0 text-fg-subtle" />
                    <a
                      href="tel:+971504850309"
                      className="num transition-colors hover:text-[color:var(--accent)]"
                    >
                      +971 50 485 0309
                    </a>
                    <span className="label-caps ms-auto">WhatsApp</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <Mail className="size-4 shrink-0 text-fg-subtle" />
                    <a
                      href="mailto:info@oceanbridge-trade.com"
                      className="min-w-0 truncate transition-colors hover:text-[color:var(--accent)]"
                    >
                      info@oceanbridge-trade.com
                    </a>
                  </li>
                  <li className="flex items-center gap-4">
                    <Linkedin className="size-4 shrink-0 text-fg-subtle" />
                    <a
                      href="https://www.linkedin.com/company/oceanbridge-trade"
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-[color:var(--accent)]"
                    >
                      /company/oceanbridge-trade
                    </a>
                  </li>
                </ul>

                <div className="mt-9 border-t border-border pt-7">
                  <div className="label-caps mb-2">Response commitment</div>
                  <div className="font-display text-3xl leading-none text-foreground">
                    48 business hours
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="border border-border p-8">
                <div className="eyebrow mb-7">What happens next</div>
                <ol className="space-y-6">
                  {WHAT_HAPPENS.map((step, i) => (
                    <li key={step} className="flex gap-5">
                      <span className="num label-caps shrink-0 pt-1 text-[color:var(--brand-teal)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[15px] leading-[1.7] text-muted-foreground">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  required,
  placeholder,
  type = "text",
  autoComplete,
  defaultValue,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow-muted">
        {label}
        {required && <span className="ms-1 text-[color:var(--brand-teal)]">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        /* A real boundary, not a hairline.
         *
         * These were border-b only, on a transparent ground, and the two
         * fields without placeholders rendered as a label floating above
         * nothing — there was no visible target to click. A field has to
         * look like somewhere text goes.
         *
         * 16px (text-base) so iOS Safari does not zoom the viewport on
         * focus. */
        className="mt-3 w-full border border-border bg-background/40 px-4 py-3 text-base text-foreground placeholder:text-fg-subtle transition-colors focus:border-[color:var(--accent)] focus:outline-none"
      />
    </div>
  );
}
