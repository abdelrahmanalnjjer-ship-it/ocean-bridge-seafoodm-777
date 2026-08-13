import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Check, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { LineReveal, Reveal } from "@/components/motion";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Trade desk — Ocean Bridge Trade" },
      {
        name: "description",
        content:
          "Send your specification, volume, destination market and Incoterms. Buyer inquiries reviewed within 48 business hours. Muscat, Sultanate of Oman.",
      },
      { property: "og:title", content: "Ocean Bridge Trade — trade desk" },
      { property: "og:description", content: "Start a buyer inquiry. Reviewed within 48 business hours." },
    ],
  }),
  component: ContactPage,
});

const WHAT_HAPPENS = [
  "We confirm whether the species and grade are running, and at what realistic volume.",
  "We map your destination market's requirements against the available establishments.",
  "You receive a written offer with specification, Incoterms, validity and payment structure.",
];

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div>
      {/* ---- Masthead ---- */}
      <section className="band-deep relative -mt-16 overflow-hidden">
        <div className="absolute inset-0 opacity-35">
          <img
            src="/website-images/harbor-dusk.jpg"
            alt=""
            aria-hidden
            className="h-full w-full object-cover object-[50%_40%]"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,20,25,0.82),rgba(8,20,25,0.97))]" />
        <div className="shell relative pb-24 pt-36">
          <div className="eyebrow mb-7">Trade desk</div>
          <h1 className="h-display h-display-xl max-w-[15ch]">
            <LineReveal immediate lines={["Tell us what", "you need to land."]} />
          </h1>
          <p className="lede lede-lg mt-8 max-w-2xl">
            For processors, importers and distributors sourcing Oman-origin seafood.
            Every inquiry is confidential and reviewed within 48 business hours.
          </p>
        </div>
      </section>

      {/* ---- Form + desk ---- */}
      <section className="band-paper">
        <div className="shell section-lg grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <Reveal>
            <div className="border border-border bg-card p-8 md:p-12">
              {sent ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <span className="grid size-14 place-items-center rounded-full bg-[color:var(--accent)] text-[color:var(--accent-foreground)]">
                    <Check className="size-6" />
                  </span>
                  <p className="h-display h-display-md mt-8">Inquiry received.</p>
                  <p className="lede mt-4 max-w-sm">
                    A member of the commercial desk will come back to you within 48
                    business hours — usually sooner if the species is in season.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="space-y-7"
                >
                  <div className="grid gap-7 md:grid-cols-2">
                    <Field label="Full name" name="name" required autoComplete="name" />
                    <Field label="Company" name="company" required autoComplete="organization" />
                    <Field label="Work email" name="email" type="email" required autoComplete="email" />
                    <Field label="Destination market" name="market" required placeholder="Qingdao, Rotterdam, Jeddah…" />
                  </div>
                  <Field
                    label="Species and specification"
                    name="species"
                    required
                    placeholder="Species, grade, size range, packing"
                  />
                  <div className="grid gap-7 md:grid-cols-2">
                    <Field label="Target volume" name="volume" required placeholder="MT per month" />
                    <Field label="Preferred Incoterms" name="incoterms" placeholder="FOB Salalah, CFR Qingdao…" />
                  </div>
                  <div>
                    <label htmlFor="notes" className="eyebrow-muted">
                      Anything else
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={5}
                      className="mt-3 w-full resize-none border-b border-border bg-transparent py-2.5 text-base text-foreground placeholder:text-fg-subtle transition-colors focus:border-[color:var(--accent)] focus:outline-none"
                      placeholder="Timelines, certification requirements, prior suppliers…"
                    />
                  </div>

                  <button type="submit" className="btn btn-solid group w-full sm:w-auto">
                    Submit buyer inquiry
                    <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
                  </button>

                  <p className="text-[13px] leading-relaxed text-fg-subtle">
                    We use these details only to respond to your inquiry. Nothing is
                    shared with a supplier before you approve it.
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
                    <div className="mt-1.5 text-[15px] text-muted-foreground">Sultanate of Oman</div>
                  </div>
                </div>

                <ul className="space-y-4 text-[15px]">
                  <li className="flex items-center gap-4">
                    <Phone className="size-4 shrink-0 text-fg-subtle" />
                    <a href="tel:+96877621857" className="num transition-colors hover:text-[color:var(--accent)]">
                      +968 77 62 1857
                    </a>
                    <span className="label-caps ms-auto">Oman</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <Phone className="size-4 shrink-0 text-fg-subtle" />
                    <a href="tel:+971504850309" className="num transition-colors hover:text-[color:var(--accent)]">
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
                      <span className="text-[15px] leading-[1.7] text-muted-foreground">{step}</span>
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
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
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
        /* 16px so iOS Safari does not zoom the viewport on focus. */
        className="mt-3 w-full border-b border-border bg-transparent py-2.5 text-base text-foreground placeholder:text-fg-subtle transition-colors focus:border-[color:var(--accent)] focus:outline-none"
      />
    </div>
  );
}
