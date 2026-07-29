import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Mail, MapPin, Phone, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const HARBOR_DUSK_IMAGE = "/website-images/harbor-dusk.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Connect — Ocean Bridge Trade" },
      { name: "description", content: "Initiate a sourcing inquiry. Muscat, Oman headquarters. Global trade desk." },
      { property: "og:title", content: "Connect — Ocean Bridge Trade" },
      { property: "og:description", content: "Global trade desk. Initiate a sourcing inquiry." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0">
          <img src={HARBOR_DUSK_IMAGE} alt="" className="h-full w-full object-cover object-[50%_38%] opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/60 via-[#121212]/80 to-[#121212]" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12 pt-32 pb-20">
          <div className="eyebrow mb-6">Buyer Desk</div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="h-display h-display-xl max-w-3xl"
          >
            Initiate a buyer inquiry.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="mt-8 max-w-xl lede"
          >
            For international processors, importers, and distributors sourcing Oman-origin seafood. All inquiries are confidential and reviewed within 48 business hours.
          </motion.p>
        </div>
      </section>

      {/* Two-column: form + info */}
      <section>
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-24 grid md:grid-cols-[1.4fr_1fr] gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border border-border bg-card p-8 md:p-12"
          >
            {sent ? (
              <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
                <div className="font-display text-3xl mb-4 text-white">Inquiry received.</div>
                <p className="text-muted-foreground max-w-sm">A member of our commercial desk will respond within 48 business hours.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <Field label="Full Name" name="name" required />
                  <Field label="Company" name="company" required />
                  <Field label="Destination Market" name="market" required placeholder="e.g. Qingdao, Rotterdam, Jeddah" />
                  <Field label="Target Volume (MT / month)" name="volume" required />
                </div>
                <Field label="Product Requirements" name="species" required placeholder="Species, grade, size, packaging" />
                <Field label="Preferred Incoterms" name="incoterms" placeholder="e.g. FOB Salalah, CFR Qingdao" />
                <div>
                  <label className="eyebrow-muted">Additional Context</label>
                  <textarea rows={5} className="mt-2 w-full bg-transparent border-b border-border focus:border-[color:var(--color-brand-ocean)] outline-none py-2 text-sm resize-none transition-colors" />
                </div>
                <button type="submit" className="btn-primary group">
                  Submit Buyer Inquiry <ArrowUpRight className="size-4 group-hover:rotate-45 transition-transform" />
                </button>
              </form>
            )}
          </motion.div>

          {/* Info card */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="border border-border bg-card p-8 md:p-10 self-start"
          >
            <div className="eyebrow mb-6">Contact</div>
            <div className="flex items-start gap-3 mb-8">
              <MapPin className="size-4 mt-1 text-muted-foreground" />
              <div>
                <div className="font-display text-xl text-white">Muscat</div>
                <div className="text-sm text-muted-foreground">Sultanate of Oman</div>
              </div>
            </div>

            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3"><Phone className="size-4 text-muted-foreground" /><span className="font-mono">+968 77 62 1857</span><span className="text-[10px] uppercase tracking-widest text-muted-foreground">Oman</span></li>
              <li className="flex items-center gap-3"><Phone className="size-4 text-muted-foreground" /><span className="font-mono">+971 50 485 0309</span><span className="text-[10px] uppercase tracking-widest text-muted-foreground">WhatsApp</span></li>
              <li className="flex items-center gap-3"><Mail className="size-4 text-muted-foreground" /><a href="mailto:info@oceanbridge-trade.com" className="hover:text-white transition-colors">info@oceanbridge-trade.com</a></li>
              <li className="flex items-center gap-3"><Linkedin className="size-4 text-muted-foreground" /><a href="https://www.linkedin.com/company/oceanbridge-trade" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">/company/oceanbridge-trade</a></li>
            </ul>

            <div className="mt-10 pt-8 border-t border-border">
              <div className="eyebrow-muted mb-3">Response SLA</div>
              <div className="font-display text-2xl text-white">48 business hours</div>
            </div>
          </motion.aside>
        </div>
      </section>
    </div>
  );
}

function Field({ label, name, required, placeholder }: { label: string; name: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow-muted">{label}</label>
      <input
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full bg-transparent border-b border-border focus:border-[color:var(--color-brand-ocean)] outline-none py-2 text-sm transition-colors"
      />
    </div>
  );
}
